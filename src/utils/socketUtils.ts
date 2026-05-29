import openSocket from "socket.io-client";

import {
  subscribeToPosts as mockSubscribe,
  unsubscribeFromPosts as mockUnsubscribe,
} from "@/mocks/postsSocket";
import type { PostsSocketData } from "@/types/post";

const useMockApi = import.meta.env.VITE_ENABLE_MOCK_API === "true";
const socketUrl = import.meta.env.VITE_API_URL || undefined;
const socket = useMockApi ? null : openSocket(socketUrl);

export const subscribeToPosts = (cb: (data: PostsSocketData) => void): void => {
  if (useMockApi) {
    mockSubscribe(cb);
    return;
  }
  socket!.on("posts", (data: PostsSocketData) => cb(data));
};

export const unsubscribeFromPosts = (
  cb: (data: PostsSocketData) => void,
): void => {
  if (useMockApi) {
    mockUnsubscribe(cb);
    return;
  }
  socket!.off("posts", (data: PostsSocketData) => cb(data));
};
