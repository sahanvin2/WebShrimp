export const siteConfig = {
  brandName: "Loopingon",
  tagline: "Loopingon Agency",
  description: "Loopingon - Premium Web & Software Agency",
  ogImagePath: "/loopingon-og.png",
  twitterHandle: "@loopingon",
  email: "sahannawarathne2004@gmail.com",
  phoneDisplay: "+94 70 303 1636",
  heroLabel: "Web Design & Development Agency",
};

const cdnBaseUrl = (import.meta.env.NEXT_PUBLIC_CDN_URL as string | undefined)?.replace(/\/+$/, "");
const appBaseUrl =
  (import.meta.env.VITE_APP_URL as string | undefined)?.replace(/\/+$/, "") ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:8080");

export const getPublicAssetUrl = (path: string) => {
  if (!path) {
    return path;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return cdnBaseUrl ? `${cdnBaseUrl}${normalizedPath}` : normalizedPath;
};

export const getAbsoluteUrl = (path: string) => {
  if (!path) {
    return path;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(path, `${appBaseUrl}/`).toString();
};
