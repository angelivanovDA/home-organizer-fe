import { http, HttpResponse } from "msw";

import { db } from "@/mocks/db";
import { emitPostsEvent } from "@/mocks/postsSocket";
import { getUserFromRequest, unauthorizedResponse } from "@/mocks/utils/auth";
import { persistUpload } from "@/mocks/utils/images";
import { FEED_PAGE_SIZE, paginate } from "@/mocks/utils/pagination";

async function parsePostForm(request: Request) {
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const image = formData.get("image");

  if (!title || !content) {
    return HttpResponse.json(
      { message: "Validation failed." },
      { status: 422 },
    );
  }

  return {
    title,
    content,
    image:
      image instanceof File ? image : typeof image === "string" ? image : "",
  };
}

export const feedHandlers = [
  http.get("/api/feed/posts", ({ request }) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const sorted = [...db.posts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    const { items, totalItems } = paginate(sorted, page, FEED_PAGE_SIZE);

    return HttpResponse.json({ posts: items, totalItems });
  }),

  http.get("/api/feed/post/:postId", ({ params, request }) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const post = db.posts.find((p) => p._id === params.postId);
    if (!post) {
      return HttpResponse.json({ message: "Post not found." }, { status: 404 });
    }

    return HttpResponse.json({ post });
  }),

  http.post("/api/feed/post", async ({ request }) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const parsed = await parsePostForm(request);
    if (parsed instanceof HttpResponse) {
      return parsed;
    }

    const postId = `post-${crypto.randomUUID()}`;
    const imageUrl = parsed.image
      ? await persistUpload(`mock-${postId}.jpg`, parsed.image)
      : "/uploads/seed-post-1.jpg";

    const post = {
      _id: postId,
      title: parsed.title,
      content: parsed.content,
      imageUrl,
      creator: { _id: user.id, name: user.name },
      createdAt: new Date().toISOString(),
    };

    db.posts.unshift(post);
    emitPostsEvent({ action: "create", post });

    return HttpResponse.json({ post }, { status: 201 });
  }),

  http.put("/api/feed/post/:postId", async ({ params, request }) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const existing = db.posts.find((p) => p._id === params.postId);
    if (!existing) {
      return HttpResponse.json({ message: "Post not found." }, { status: 404 });
    }

    const parsed = await parsePostForm(request);
    if (parsed instanceof HttpResponse) {
      return parsed;
    }

    let imageUrl = existing.imageUrl;
    if (parsed.image instanceof File) {
      imageUrl = await persistUpload(`mock-${existing._id}.jpg`, parsed.image);
    } else if (typeof parsed.image === "string" && parsed.image.length > 0) {
      imageUrl = parsed.image.startsWith("/")
        ? parsed.image
        : `/${parsed.image}`;
    }

    const updated = {
      ...existing,
      title: parsed.title,
      content: parsed.content,
      imageUrl,
    };

    const index = db.posts.findIndex((p) => p._id === existing._id);
    db.posts[index] = updated;

    return HttpResponse.json({ post: updated });
  }),

  http.delete("/api/feed/post/:postId", ({ params, request }) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const index = db.posts.findIndex((p) => p._id === params.postId);
    if (index === -1) {
      return HttpResponse.json({ message: "Post not found." }, { status: 404 });
    }

    db.posts.splice(index, 1);
    emitPostsEvent({ action: "delete", postId: params.postId as string });

    return HttpResponse.json({ message: "Post deleted." });
  }),
];
