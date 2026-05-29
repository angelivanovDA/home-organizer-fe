import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";

import { db } from "@/mocks/db";
import { server } from "@/mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));

afterEach(() => {
  server.resetHandlers();
  db.reset();
});

afterAll(() => server.close());
