import { seedPosts, seedUsers } from "@/mocks/data/seed";
import { registerSeedImages } from "@/mocks/utils/images";
import type { Post } from "@/types";

export type MockPost = Post;

export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  status: string;
}

/** In-memory store for uploaded images (served at /uploads/*). */
export const imageStore = new Map<string, string>();

class MockDatabase {
  users: MockUser[] = [];
  posts: MockPost[] = [];

  reset(): void {
    this.users = structuredClone(seedUsers);
    this.posts = structuredClone(seedPosts);
    imageStore.clear();
    registerSeedImages();
  }
}

export const db = new MockDatabase();
db.reset();
