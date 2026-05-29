import type { PostsSocketData } from "@/types/post";

type PostsListener = (data: PostsSocketData) => void;

const listeners = new Set<PostsListener>();

/** Mirrors socket.io `posts` events when the mock API is enabled. */
export function emitPostsEvent(data: PostsSocketData): void {
  listeners.forEach((listener) => listener(data));
}

export function subscribeToPosts(cb: PostsListener): void {
  listeners.add(cb);
}

export function unsubscribeFromPosts(cb: PostsListener): void {
  listeners.delete(cb);
}
