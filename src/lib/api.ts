const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const configuredBase = import.meta.env.VITE_API_URL as string | undefined;

  if (typeof window !== "undefined") {
    const { hostname, port, protocol } = window.location;
    const isLocalHost = LOCAL_HOSTS.has(hostname);

    if (configuredBase) {
      const normalizedBase = normalizeBaseUrl(configuredBase);

      // In local development, prefer the backend port directly when the env is a
      // same-origin placeholder and the frontend is running on another port.
      if (normalizedBase === "/api" && isLocalHost && port && port !== "3000") {
        return `${protocol}//${hostname}:3000/api`;
      }

      return normalizedBase;
    }

    if (isLocalHost && port && port !== "3000") {
      return `${protocol}//${hostname}:3000/api`;
    }
  }

  return configuredBase ? normalizeBaseUrl(configuredBase) : "/api";
};
