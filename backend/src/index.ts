import fs, { existsSync } from "fs";
import fsPromises from "fs/promises";
import path from "path";
import express from "express";
import cors from "cors";
import type { PoolClient } from "pg";
import { appConfig } from "./config";
import { pool } from "./db";
import {
  COMPANY_CONTEXT,
  DEFAULT_PORTFOLIO_WORKS,
  DEFAULT_PRICING_PLANS,
  DEFAULT_SERVICES,
  GENERAL_FAQS,
  type FaqSeed,
  type PortfolioWorkSeed,
  type PricingPlanSeed,
  type ServiceSeed,
} from "./site-data";

type ChatRole = "user" | "assistant" | "system";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface PricingPlanRecord {
  id?: number;
  name: string;
  price: string;
  description: string;
  timeline: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
}

interface ServiceRecord {
  slug: string;
  title: string;
  summary: string;
  description: string;
  startingAt: string;
  timeline: string;
  support: string;
  includes: string[];
  bestFor: string[];
  optionalExtras: string[];
  faqs: Array<{ question: string; answer: string }>;
}

interface PortfolioRecord {
  id?: number;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  imageUrl: string;
  link: string;
  tag: string;
}

interface FaqRecord {
  id?: number;
  category: string;
  question: string;
  answer: string;
}

interface SiteKnowledge {
  pricingPlans: PricingPlanRecord[];
  services: ServiceRecord[];
  portfolioWorks: PortfolioRecord[];
  faqs: FaqRecord[];
}

const OFF_TOPIC_PATTERNS = [
  /\bpresident\b/i,
  /\bprime minister\b/i,
  /\bcapital of\b/i,
  /\bweather\b/i,
  /\bstock\b/i,
  /\bbitcoin\b/i,
  /\bcrypto\b/i,
  /\bmovie\b/i,
  /\bsong\b/i,
  /\brecipe\b/i,
  /\bsports?\b/i,
  /\bmatch score\b/i,
  /\bcelebrity\b/i,
  /\belection\b/i,
  /\bpopulation\b/i,
  /\bmath\b/i,
  /\bhomework\b/i,
];

const ALLOWED_TOPIC_PATTERNS = [
  /\bloopingon\b/i,
  /\bservice(s)?\b/i,
  /\bwebsite(s)?\b/i,
  /\bweb app\b/i,
  /\bsoftware\b/i,
  /\be-commerce\b/i,
  /\bbusiness website\b/i,
  /\bportfolio\b/i,
  /\blanding page\b/i,
  /\bmaintenance\b/i,
  /\bpricing\b/i,
  /\bprice\b/i,
  /\bcost\b/i,
  /\bquote\b/i,
  /\bcontact\b/i,
  /\bwhatsapp\b/i,
  /\bemail\b/i,
  /\bphone\b/i,
  /\btimeline\b/i,
  /\bdelivery\b/i,
  /\bsupport\b/i,
  /\bseo\b/i,
  /\bhosting\b/i,
  /\bproject(s)?\b/i,
  /\bteam\b/i,
  /\babout\b/i,
  /\bcustom\b/i,
  /\breact\b/i,
  /\bnext\.?js\b/i,
  /\bshopify\b/i,
  /\bpostgres\b/i,
  /\bdatabase\b/i,
  /\bapi\b/i,
];

const SOFT_IN_SCOPE_PATTERNS = [
  /^\s*(hi|hello|hey|thanks|thank you|good morning|good evening)\b/i,
  /\bwhat do you do\b/i,
  /\bwho are you\b/i,
  /\bcan you help\b/i,
];

const SCOPE_MESSAGE =
  "I can help with Loopingon's services, pricing, timelines, portfolio samples, process, support, and how to start your project. I can't answer general world questions outside that scope.";

const app = express();

app.use(
  cors({
    origin: appConfig.corsOrigin === "*" ? true : appConfig.corsOrigin.split(",").map((origin) => origin.trim()),
  }),
);
app.use(express.json({ limit: "1mb" }));

let knowledgeCache: { expiresAt: number; value: SiteKnowledge } | null = null;

const asStringArray = (value: unknown) => (Array.isArray(value) ? value.map((item) => String(item)) : []);

const asFaqArray = (value: unknown) =>
  Array.isArray(value)
    ? value
        .map((item) => {
          if (!item || typeof item !== "object") {
            return null;
          }

          const question = "question" in item ? String(item.question) : "";
          const answer = "answer" in item ? String(item.answer) : "";
          return question && answer ? { question, answer } : null;
        })
        .filter((item): item is { question: string; answer: string } => Boolean(item))
    : [];

const toPricingRecord = (plan: PricingPlanSeed): PricingPlanRecord => ({
  name: plan.name,
  price: plan.price,
  description: plan.description,
  timeline: plan.timeline,
  features: plan.features,
  isPopular: plan.isPopular,
  buttonText: plan.buttonText,
});

const toServiceRecord = (service: ServiceSeed): ServiceRecord => ({
  slug: service.slug,
  title: service.title,
  summary: service.summary,
  description: service.description,
  startingAt: service.startingAt,
  timeline: service.timeline,
  support: service.support,
  includes: service.includes,
  bestFor: service.bestFor,
  optionalExtras: service.optionalExtras,
  faqs: service.faqs,
});

const toPortfolioRecord = (work: PortfolioWorkSeed): PortfolioRecord => ({
  title: work.title,
  category: work.category,
  summary: work.summary,
  stack: work.stack,
  imageUrl: work.imageUrl,
  link: work.link,
  tag: work.tag,
});

const toFaqRecord = (faq: FaqSeed): FaqRecord => ({
  category: faq.category,
  question: faq.question,
  answer: faq.answer,
});

const getFallbackKnowledge = (): SiteKnowledge => ({
  pricingPlans: DEFAULT_PRICING_PLANS.map(toPricingRecord),
  services: DEFAULT_SERVICES.map(toServiceRecord),
  portfolioWorks: DEFAULT_PORTFOLIO_WORKS.map(toPortfolioRecord),
  faqs: GENERAL_FAQS.map(toFaqRecord),
});

const loadSchema = async () => {
  const schemaPath = path.resolve(__dirname, "../schema.sql");
  return fsPromises.readFile(schemaPath, "utf8");
};

const ensureSchema = async () => {
  const schema = await loadSchema();
  await pool.query(schema);
};

const seedPricingPlans = async (client: PoolClient) => {
  for (const plan of DEFAULT_PRICING_PLANS) {
    const updateResult = await client.query(
      `UPDATE pricing_plans
       SET price = $2,
           description = $3,
           features = $4::jsonb,
           timeline = $5,
           is_popular = $6,
           button_text = $7
       WHERE name = $1`,
      [
        plan.name,
        plan.price,
        plan.description,
        JSON.stringify(plan.features),
        plan.timeline,
        plan.isPopular,
        plan.buttonText,
      ],
    );

    if (updateResult.rowCount === 0) {
      await client.query(
        `INSERT INTO pricing_plans (name, price, description, features, timeline, is_popular, button_text)
         VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7)`,
        [
          plan.name,
          plan.price,
          plan.description,
          JSON.stringify(plan.features),
          plan.timeline,
          plan.isPopular,
          plan.buttonText,
        ],
      );
    }
  }
};

const seedServices = async (client: PoolClient) => {
  for (const service of DEFAULT_SERVICES) {
    await client.query(
      `INSERT INTO service_offerings
        (slug, title, summary, description, starting_at, timeline, support, includes, best_for, optional_extras, faqs)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb)
       ON CONFLICT (slug)
       DO UPDATE SET
         title = EXCLUDED.title,
         summary = EXCLUDED.summary,
         description = EXCLUDED.description,
         starting_at = EXCLUDED.starting_at,
         timeline = EXCLUDED.timeline,
         support = EXCLUDED.support,
         includes = EXCLUDED.includes,
         best_for = EXCLUDED.best_for,
         optional_extras = EXCLUDED.optional_extras,
         faqs = EXCLUDED.faqs`,
      [
        service.slug,
        service.title,
        service.summary,
        service.description,
        service.startingAt,
        service.timeline,
        service.support,
        JSON.stringify(service.includes),
        JSON.stringify(service.bestFor),
        JSON.stringify(service.optionalExtras),
        JSON.stringify(service.faqs),
      ],
    );
  }
};

const seedPortfolioWorks = async (client: PoolClient) => {
  for (const work of DEFAULT_PORTFOLIO_WORKS) {
    const updateResult = await client.query(
      `UPDATE portfolio_works
       SET category = $2,
           summary = $3,
           stack = $4::jsonb,
           image_url = $5,
           link = $6,
           tag = $7
       WHERE title = $1`,
      [work.title, work.category, work.summary, JSON.stringify(work.stack), work.imageUrl, work.link, work.tag],
    );

    if (updateResult.rowCount === 0) {
      await client.query(
        `INSERT INTO portfolio_works (title, category, summary, stack, image_url, link, tag)
         VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7)`,
        [work.title, work.category, work.summary, JSON.stringify(work.stack), work.imageUrl, work.link, work.tag],
      );
    }
  }
};

const seedFaqs = async (client: PoolClient) => {
  for (const faq of GENERAL_FAQS) {
    const updateResult = await client.query(
      `UPDATE site_faqs
       SET category = $2, answer = $3
       WHERE question = $1`,
      [faq.question, faq.category, faq.answer],
    );

    if (updateResult.rowCount === 0) {
      await client.query(
        `INSERT INTO site_faqs (category, question, answer) VALUES ($1, $2, $3)`,
        [faq.category, faq.question, faq.answer],
      );
    }
  }
};

const seedDatabase = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await seedPricingPlans(client);
    await seedServices(client);
    await seedPortfolioWorks(client);
    await seedFaqs(client);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const loadKnowledgeFromDatabase = async (): Promise<SiteKnowledge> => {
  const [pricingResult, servicesResult, portfolioResult, faqResult] = await Promise.all([
    pool.query(
      `SELECT id, name, price, description, timeline, features, is_popular, button_text
       FROM pricing_plans
       ORDER BY id ASC`,
    ),
    pool.query(
      `SELECT slug, title, summary, description, starting_at, timeline, support, includes, best_for, optional_extras, faqs
       FROM service_offerings
       ORDER BY title ASC`,
    ),
    pool.query(
      `SELECT id, title, category, summary, stack, image_url, link, tag
       FROM portfolio_works
       ORDER BY id ASC`,
    ),
    pool.query(
      `SELECT id, category, question, answer
       FROM site_faqs
       ORDER BY id ASC`,
    ),
  ]);

  return {
    pricingPlans: pricingResult.rows.map((row) => ({
      id: Number(row.id),
      name: String(row.name),
      price: String(row.price),
      description: String(row.description ?? ""),
      timeline: String(row.timeline ?? ""),
      features: asStringArray(row.features),
      isPopular: Boolean(row.is_popular),
      buttonText: String(row.button_text ?? "Choose Plan"),
    })),
    services: servicesResult.rows.map((row) => ({
      slug: String(row.slug),
      title: String(row.title),
      summary: String(row.summary),
      description: String(row.description),
      startingAt: String(row.starting_at),
      timeline: String(row.timeline),
      support: String(row.support),
      includes: asStringArray(row.includes),
      bestFor: asStringArray(row.best_for),
      optionalExtras: asStringArray(row.optional_extras),
      faqs: asFaqArray(row.faqs),
    })),
    portfolioWorks: portfolioResult.rows.map((row) => ({
      id: Number(row.id),
      title: String(row.title),
      category: String(row.category),
      summary: String(row.summary ?? ""),
      stack: asStringArray(row.stack),
      imageUrl: String(row.image_url),
      link: String(row.link ?? ""),
      tag: String(row.tag ?? ""),
    })),
    faqs: faqResult.rows.map((row) => ({
      id: Number(row.id),
      category: String(row.category),
      question: String(row.question),
      answer: String(row.answer),
    })),
  };
};

const getSiteKnowledge = async () => {
  if (knowledgeCache && knowledgeCache.expiresAt > Date.now()) {
    return knowledgeCache.value;
  }

  try {
    const knowledge = await loadKnowledgeFromDatabase();
    knowledgeCache = {
      value: knowledge,
      expiresAt: Date.now() + 60_000,
    };
    return knowledge;
  } catch (error) {
    console.error("Failed to load knowledge from PostgreSQL, using fallback context.", error);
    return getFallbackKnowledge();
  }
};

const isInScopeConversation = (messages: ChatMessage[]) => {
  const conversationText = messages.slice(-6).map((message) => message.content).join(" ");
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content || "";

  if (SOFT_IN_SCOPE_PATTERNS.some((pattern) => pattern.test(latestUserMessage))) {
    return true;
  }

  const hasAllowedTopic = ALLOWED_TOPIC_PATTERNS.some((pattern) => pattern.test(conversationText));
  const hasBlockedTopic = OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(latestUserMessage));

  if (hasBlockedTopic && !hasAllowedTopic) {
    return false;
  }

  return hasAllowedTopic;
};

const normalizeMessages = (payload: unknown): ChatMessage[] => {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .map((message) => {
      if (!message || typeof message !== "object") {
        return null;
      }

      const role = "role" in message ? String(message.role) : "";
      const content = "content" in message ? String(message.content).trim() : "";

      if (!content || !["user", "assistant", "system"].includes(role)) {
        return null;
      }

      return {
        role: role as ChatRole,
        content: content.slice(0, 4000),
      };
    })
    .filter((message): message is ChatMessage => Boolean(message))
    .slice(-12);
};

const buildPromptContext = (knowledge: SiteKnowledge) => {
  const pricing = knowledge.pricingPlans
    .map(
      (plan) =>
        `- ${plan.name}: ${plan.price}. Timeline: ${plan.timeline}. Includes: ${plan.features.join(", ")}. Description: ${plan.description}`,
    )
    .join("\n");

  const services = knowledge.services
    .map(
      (service) =>
        `- ${service.title}: ${service.summary} Starting at ${service.startingAt}. Timeline: ${service.timeline}. Includes: ${service.includes.join(", ")}. Best for: ${service.bestFor.join(", ")}.`,
    )
    .join("\n");

  const portfolio = knowledge.portfolioWorks
    .map(
      (work) =>
        `- ${work.title} (${work.category}): ${work.summary}. Stack: ${work.stack.join(", ")}. Demo path: ${work.link}`,
    )
    .join("\n");

  const faqs = knowledge.faqs.map((faq) => `- ${faq.question}: ${faq.answer}`).join("\n");

  return [
    `Brand: ${COMPANY_CONTEXT.brandName}`,
    `Description: ${COMPANY_CONTEXT.description}`,
    `Location: ${COMPANY_CONTEXT.location}`,
    `Contact: WhatsApp ${COMPANY_CONTEXT.phoneDisplay}, Email ${COMPANY_CONTEXT.email}`,
    `Support hours: ${COMPANY_CONTEXT.supportHours}`,
    `Team: ${COMPANY_CONTEXT.team.map((member) => `${member.name} (${member.role})`).join(", ")}`,
    `Core process: ${COMPANY_CONTEXT.process.join(" -> ")}`,
    `Technologies: ${COMPANY_CONTEXT.technologies.join(", ")}`,
    "Pricing plans:",
    pricing,
    "Services:",
    services,
    "Portfolio samples:",
    portfolio,
    "Frequently asked questions:",
    faqs,
  ].join("\n");
};

const buildSystemPrompt = (knowledge: SiteKnowledge) => `You are the official website assistant for ${COMPANY_CONTEXT.brandName}, a Sri Lankan web and software agency.

Your job is to help visitors understand ${COMPANY_CONTEXT.brandName}'s services, pricing, timelines, process, portfolio samples, support, and contact options.

Rules:
- Only answer questions about ${COMPANY_CONTEXT.brandName}, its services, projects, pricing, process, tech stack, support, or how to start a project.
- If a question is outside that scope, politely refuse and redirect the user back to ${COMPANY_CONTEXT.brandName}-related topics.
- Never invent prices, guarantees, timelines, or project facts that are not in the context.
- If the exact answer is not available, say that briefly and suggest the closest next step, like requesting a quote or contacting the team on WhatsApp.
- Keep replies concise, clear, and helpful.
- Use plain text only. Do not use markdown tables, bold text, or headings.
- Prefer LKR pricing when discussing packages.
- When a user is ready to buy or asks for a quote, invite them to contact the team on WhatsApp at ${COMPANY_CONTEXT.phoneDisplay} or by email at ${COMPANY_CONTEXT.email}.

Business context:
${buildPromptContext(knowledge)}`;

const buildFallbackReply = (userMessage: string, knowledge: SiteKnowledge) => {
  const normalized = userMessage.toLowerCase();

  if (normalized.includes("price") || normalized.includes("pricing") || normalized.includes("cost") || normalized.includes("budget")) {
    const pricingSummary = knowledge.pricingPlans
      .map((plan) => `${plan.name}: ${plan.price}${plan.timeline ? ` (${plan.timeline})` : ""}`)
      .join(" | ");
    return `Here are our main pricing options: ${pricingSummary}. If you want, I can also help you choose the best fit for your project type.`;
  }

  if (normalized.includes("service") || normalized.includes("build") || normalized.includes("offer")) {
    const services = knowledge.services.map((service) => service.title).join(", ");
    return `We currently offer ${services}. If you tell me what you want to build, I can point you to the closest service and rough budget range.`;
  }

  if (normalized.includes("project") || normalized.includes("portfolio") || normalized.includes("sample")) {
    const projects = knowledge.portfolioWorks.slice(0, 4).map((work) => work.title).join(", ");
    return `Some portfolio samples you can mention are ${projects}. We cover business websites, e-commerce, landing pages, portfolios, and custom software experiences.`;
  }

  if (normalized.includes("contact") || normalized.includes("whatsapp") || normalized.includes("phone") || normalized.includes("email")) {
    return `You can reach Loopingon on WhatsApp at ${COMPANY_CONTEXT.phoneDisplay} or by email at ${COMPANY_CONTEXT.email}.`;
  }

  if (normalized.includes("time") || normalized.includes("timeline") || normalized.includes("how long")) {
    const timelineSummary = knowledge.pricingPlans
      .filter((plan) => plan.price !== "Contact Us")
      .map((plan) => `${plan.name}: ${plan.timeline}`)
      .join(" | ");
    return `Typical timelines are ${timelineSummary}. Custom software timelines depend on scope, so we usually confirm that after a quick discovery chat.`;
  }

  return `I can help with services, pricing, timelines, portfolio samples, and how to start your project with Loopingon. You can also contact the team on WhatsApp at ${COMPANY_CONTEXT.phoneDisplay}.`;
};

const requestModelReply = async (messages: ChatMessage[], knowledge: SiteKnowledge, sessionId?: string) => {
  if (!appConfig.openRouterApiKey) {
    return buildFallbackReply(messages[messages.length - 1]?.content || "", knowledge);
  }

  const response = await fetch(appConfig.openRouterApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${appConfig.openRouterApiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": appConfig.openRouterSiteUrl,
      "X-Title": appConfig.openRouterSiteName,
    },
    body: JSON.stringify({
      model: appConfig.openRouterModel,
      temperature: 0.35,
      max_tokens: 450,
      user: sessionId,
      messages: [{ role: "system", content: buildSystemPrompt(knowledge) }, ...messages],
    }),
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new Error(errorPayload?.error?.message || `OpenRouter request failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return content.replace(/\*\*/g, "");
};

const logChatExchange = async (sessionId: string | undefined, userMessage: string, assistantMessage: string) => {
  if (!sessionId) {
    return;
  }

  try {
    await pool.query(
      `INSERT INTO chat_sessions (id, last_user_message, updated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT (id)
       DO UPDATE SET last_user_message = EXCLUDED.last_user_message, updated_at = CURRENT_TIMESTAMP`,
      [sessionId, userMessage],
    );

    await pool.query(
      `INSERT INTO chat_messages (session_id, role, content)
       VALUES ($1, 'user', $2), ($1, 'assistant', $3)`,
      [sessionId, userMessage, assistantMessage],
    );
  } catch (error) {
    console.error("Failed to log chat exchange.", error);
  }
};

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      ok: true,
      database: "connected",
      model: appConfig.openRouterModel,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/api/content", async (_req, res) => {
  try {
    const knowledge = await getSiteKnowledge();
    res.json(knowledge);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to load content.",
    });
  }
});

app.post("/api/contact", async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const phone = String(req.body?.phone || "").trim();
  const service = String(req.body?.service || "").trim();
  const budget = String(req.body?.budget || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, service, budget, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, email, phone || null, service || null, budget || null, message],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to save contact.",
    });
  }
});

app.post("/api/chat", async (req, res) => {
  const sessionId = typeof req.body?.sessionId === "string" ? req.body.sessionId.slice(0, 100) : undefined;
  const messages = normalizeMessages(req.body?.messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    res.status(400).json({ error: "A user message is required." });
    return;
  }

  if (!isInScopeConversation(messages)) {
    if (sessionId) {
      await logChatExchange(sessionId, latestUserMessage.content, SCOPE_MESSAGE);
    }

    res.json({
      message: SCOPE_MESSAGE,
      scoped: true,
    });
    return;
  }

  const knowledge = await getSiteKnowledge();

  try {
    const reply = await requestModelReply(messages, knowledge, sessionId);
    await logChatExchange(sessionId, latestUserMessage.content, reply);
    res.json({
      message: reply,
      model: appConfig.openRouterModel,
    });
  } catch (error) {
    console.error("Chat completion failed, using fallback reply.", error);
    const fallbackReply = buildFallbackReply(latestUserMessage.content, knowledge);
    await logChatExchange(sessionId, latestUserMessage.content, fallbackReply);
    res.json({
      message: fallbackReply,
      fallback: true,
    });
  }
});

const frontendDistPath = path.resolve(__dirname, "../../dist");

if (existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

const startServer = async () => {
  await ensureSchema();
  await seedDatabase();

  app.listen(appConfig.port, () => {
    console.log(`Loopingon backend listening on port ${appConfig.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start backend.", error);
  process.exit(1);
});
