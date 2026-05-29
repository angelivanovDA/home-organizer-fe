import { http, HttpResponse } from "msw";

import { db } from "@/mocks/db";
import { createAuthToken } from "@/mocks/utils/auth";

interface LoginBody {
  email?: string;
  password?: string;
}

interface SignupBody {
  email?: string;
  password?: string;
  name?: string;
}

export const authHandlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return HttpResponse.json(
        { message: "Validation failed." },
        { status: 422 },
      );
    }

    const user = db.users.find((u) => u.email === email);
    if (!user || user.password !== password) {
      return HttpResponse.json(
        { message: "Could not authenticate you!" },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      token: createAuthToken(user.id),
      userId: user.id,
    });
  }),

  http.put("/api/auth/signup", async ({ request }) => {
    const body = (await request.json()) as SignupBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const name = body.name?.trim();

    if (!email || !password || !name) {
      return HttpResponse.json(
        { message: "Validation failed." },
        { status: 422 },
      );
    }

    if (db.users.some((u) => u.email === email)) {
      return HttpResponse.json(
        { message: "Email already in use." },
        { status: 422 },
      );
    }

    const id = `user-${crypto.randomUUID()}`;
    db.users.push({
      id,
      email,
      password,
      name,
      status: "",
    });

    return HttpResponse.json(
      { message: "User created!", userId: id },
      { status: 201 },
    );
  }),
];
