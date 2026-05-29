import { authHandlers } from "@/mocks/handlers/auth.handlers";
import { feedHandlers } from "@/mocks/handlers/feed.handlers";
import { uploadsHandlers } from "@/mocks/handlers/uploads.handlers";
import { userHandlers } from "@/mocks/handlers/user.handlers";

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...feedHandlers,
  ...uploadsHandlers,
];
