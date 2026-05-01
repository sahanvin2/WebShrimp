import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const backendRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(backendRoot, "..");

const envCandidates = [
  path.join(backendRoot, ".env.local"),
  path.join(projectRoot, ".env.local"),
  path.join(backendRoot, ".env"),
  path.join(projectRoot, ".env"),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, quiet: true });
  }
}

const parsePort = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const appConfig = {
  port: parsePort(process.env.PORT, 3000),
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:8080",
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/loopingon",
  openRouterApiKey: process.env.OPENROUTER_API_KEY || "",
  openRouterModel: process.env.OPENROUTER_MODEL || "x-ai/grok-4.1-fast",
  openRouterApiUrl: process.env.OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions",
  openRouterSiteUrl: process.env.OPENROUTER_SITE_URL || "http://localhost:8080",
  openRouterSiteName: process.env.OPENROUTER_SITE_NAME || "Loopingon",
};
