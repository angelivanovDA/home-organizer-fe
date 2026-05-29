import { http, HttpResponse } from "msw";

import { imageStore } from "@/mocks/db";

function dataUrlToResponse(dataUrl: string) {
  const commaIndex = dataUrl.indexOf(",");
  const meta = dataUrl.slice(0, commaIndex);
  const data = dataUrl.slice(commaIndex + 1);
  const mime = meta.match(/^data:([^;,]+)/)?.[1] ?? "application/octet-stream";
  const isBase64 = meta.includes(";base64");

  const body = isBase64
    ? Uint8Array.from(atob(data), (char) => char.charCodeAt(0))
    : new TextEncoder().encode(decodeURIComponent(data));

  return new HttpResponse(body, {
    headers: { "Content-Type": mime },
  });
}

export const uploadsHandlers = [
  http.get("/uploads/:filename", ({ params }) => {
    const filename = params.filename as string;
    const src = imageStore.get(filename);

    if (!src) {
      return new HttpResponse(null, { status: 404 });
    }

    if (src.startsWith("data:")) {
      return dataUrlToResponse(src);
    }

    return HttpResponse.text(src, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }),
];
