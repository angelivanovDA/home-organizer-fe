import { HttpResponse } from "msw";

import { db, type MockUser } from "@/mocks/db";

const TOKEN_PREFIX = "mock-token:";

export function createAuthToken(userId: string): string {
  return `${TOKEN_PREFIX}${userId}`;
}

export function unauthorizedResponse() {
  return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export function getUserFromRequest(request: Request): MockUser | null {
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  const token = header.slice("Bearer ".length);
  if (!token.startsWith(TOKEN_PREFIX)) {
    return null;
  }

  const userId = token.slice(TOKEN_PREFIX.length);
  return db.users.find((u) => u.id === userId) ?? null;
}
