import type { MockPost, MockUser } from "@/mocks/db";

export const DEMO_PASSWORD = "12345";

export const seedUsers: MockUser[] = [
  {
    id: "user-test",
    email: "test@test.com",
    password: DEMO_PASSWORD,
    name: "Test User",
    status: "Building the frontend with mock API",
  },
];

export const seedPosts: MockPost[] = [
  {
    _id: "post-1",
    title: "Welcome to Home Organizer",
    content:
      "This feed is powered by MSW. You can develop the UI without a running backend.",
    imageUrl: "/uploads/seed-post-1.jpg",
    creator: { _id: "user-test", name: "Test User" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    _id: "post-2",
    title: "Mock API tips",
    content:
      "Handlers live in src/mocks/handlers. Adjust seed data or add routes as your contract evolves.",
    imageUrl: "/uploads/seed-post-2.jpg",
    creator: { _id: "user-test", name: "Test User" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    _id: "post-3",
    title: "Third post for pagination",
    content: "The dashboard shows two posts per page — try the paginator.",
    imageUrl: "/uploads/seed-post-3.jpg",
    creator: { _id: "user-test", name: "Test User" },
    createdAt: new Date().toISOString(),
  },
];
