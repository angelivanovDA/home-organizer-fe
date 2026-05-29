import { http, HttpResponse } from "msw";

import { getUserFromRequest, unauthorizedResponse } from "@/mocks/utils/auth";

export const userHandlers = [
  http.get("/api/user/status", ({ request }) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }
    return HttpResponse.json({ status: user.status });
  }),

  http.patch("/api/user/status", async ({ request }) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = (await request.json()) as { status?: string };
    if (typeof body.status !== "string") {
      return HttpResponse.json({ message: "Invalid status." }, { status: 422 });
    }

    user.status = body.status;
    return HttpResponse.json({ status: user.status });
  }),
];
