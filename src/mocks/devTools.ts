import { db, imageStore } from "@/mocks/db";

declare global {
  interface Window {
    /** In-memory mock users & posts (dev + mocks only). */
    __mockDb: typeof db;
    /** Uploaded / seed images keyed by filename. */
    __mockImageStore: typeof imageStore;
  }
}

/** Exposes mock state on `window` so you can inspect it in DevTools. */
export function exposeMockDbInDev(): void {
  if (!import.meta.env.DEV) {
    return;
  }
  if (import.meta.env.VITE_ENABLE_MOCK_API !== "true") {
    return;
  }

  window.__mockDb = db;
  window.__mockImageStore = imageStore;

  console.info(
    "[mock] Inspect in console: __mockDb.users, __mockDb.posts, __mockImageStore",
  );
}
