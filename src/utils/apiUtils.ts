const apiBase = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

/** Builds an API or backend asset URL. Empty `VITE_API_URL` uses same-origin paths (Vite dev proxy). */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${apiBase}${normalized}`;
}
