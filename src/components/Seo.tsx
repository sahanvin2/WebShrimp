import { useEffect } from "react";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

interface SeoProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
}

const ensureMeta = (selector: string, attrName: "name" | "property", attrValue: string) => {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  return meta;
};

const ensureLink = (selector: string, rel: string) => {
  let link = document.head.querySelector<HTMLLinkElement>(selector);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  return link;
};

const ensureScript = (id: string) => {
  let script = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  return script;
};

const Seo = ({
  title,
  description = siteConfig.description,
  path = typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/",
  image = siteConfig.ogImagePath,
  type = "website",
  noIndex = false,
  publishedTime,
}: SeoProps) => {
  useEffect(() => {
    const fullTitle = title.includes(siteConfig.brandName) ? title : `${title} | ${siteConfig.brandName}`;
    const canonicalUrl = getAbsoluteUrl(path);
    const imageUrl = getAbsoluteUrl(image);
    const robotsValue = noIndex ? "noindex, nofollow" : "index, follow";

    document.title = fullTitle;
    document.documentElement.lang = "en";

    ensureMeta('meta[name="description"]', "name", "description").content = description;
    ensureMeta('meta[name="author"]', "name", "author").content = siteConfig.brandName;
    ensureMeta('meta[name="robots"]', "name", "robots").content = robotsValue;
    ensureMeta('meta[name="theme-color"]', "name", "theme-color").content = "#1a6bff";

    ensureMeta('meta[property="og:title"]', "property", "og:title").content = fullTitle;
    ensureMeta('meta[property="og:description"]', "property", "og:description").content = description;
    ensureMeta('meta[property="og:type"]', "property", "og:type").content = type;
    ensureMeta('meta[property="og:image"]', "property", "og:image").content = imageUrl;
    ensureMeta('meta[property="og:site_name"]', "property", "og:site_name").content = siteConfig.brandName;
    ensureMeta('meta[property="og:locale"]', "property", "og:locale").content = "en_LK";
    if (canonicalUrl) {
      ensureMeta('meta[property="og:url"]', "property", "og:url").content = canonicalUrl;
    }

    ensureMeta('meta[name="twitter:card"]', "name", "twitter:card").content = "summary_large_image";
    ensureMeta('meta[name="twitter:site"]', "name", "twitter:site").content = siteConfig.twitterHandle;
    ensureMeta('meta[name="twitter:title"]', "name", "twitter:title").content = fullTitle;
    ensureMeta('meta[name="twitter:description"]', "name", "twitter:description").content = description;
    ensureMeta('meta[name="twitter:image"]', "name", "twitter:image").content = imageUrl;

    const canonical = ensureLink('link[rel="canonical"]', "canonical");
    if (canonicalUrl) {
      canonical.href = canonicalUrl;
    }

    if (publishedTime) {
      ensureMeta('meta[property="article:published_time"]', "property", "article:published_time").content =
        publishedTime;
    }

    const structuredData = type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          image: imageUrl ? [imageUrl] : undefined,
          author: {
            "@type": "Organization",
            name: siteConfig.brandName,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.brandName,
            logo: imageUrl
              ? {
                  "@type": "ImageObject",
                  url: imageUrl,
                }
              : undefined,
          },
          mainEntityOfPage: canonicalUrl || undefined,
          datePublished: publishedTime || undefined,
        }
      : {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: siteConfig.brandName,
          description,
          areaServed: "Sri Lanka",
          image: imageUrl || undefined,
          url: canonicalUrl || undefined,
          email: siteConfig.email,
          telephone: siteConfig.phoneDisplay,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rambukkana",
            addressCountry: "LK",
          },
        };

    ensureScript("loopingon-structured-data").textContent = JSON.stringify(structuredData);
  }, [description, image, noIndex, path, publishedTime, title, type]);

  return null;
};

export default Seo;
