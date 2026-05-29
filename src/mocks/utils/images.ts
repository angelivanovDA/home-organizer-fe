import { imageStore } from "@/mocks/db";

const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
  <rect width="800" height="420" fill="#e2e8f0"/>
  <text x="400" y="210" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="24">Mock image</text>
</svg>`;

export function registerSeedImages(): void {
  const seeds = ["seed-post-1.jpg", "seed-post-2.jpg", "seed-post-3.jpg"];
  for (const filename of seeds) {
    if (!imageStore.has(filename)) {
      imageStore.set(
        filename,
        `data:image/svg+xml;charset=utf-8,${encodeURIComponent(PLACEHOLDER_SVG)}`,
      );
    }
  }
}

export async function persistUpload(
  filename: string,
  image: File | string,
): Promise<string> {
  if (typeof image === "string") {
    return image.startsWith("/") ? image : `/${image}`;
  }

  const buffer = await image.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  const mime = image.type || "image/jpeg";
  imageStore.set(filename, `data:${mime};base64,${base64}`);
  return `/uploads/${filename}`;
}
