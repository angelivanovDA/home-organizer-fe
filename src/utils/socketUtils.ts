import openSocket from "socket.io-client";
import type { PostsSocketData } from "@/types/post";

const socketUrl = import.meta.env.VITE_API_URL || undefined;

const socket = openSocket(socketUrl);

export const subscribeToPosts = (cb: (data: PostsSocketData) => void): void => {
  socket.on("posts", (data: PostsSocketData) => cb(data));
};

export const unsubscribeFromPosts = (
  cb: (data: PostsSocketData) => void,
): void => {
  socket.off("posts", (data: PostsSocketData) => cb(data));
};
