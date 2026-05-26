import type { LoginAuthData } from "@/types/auth";

/**
 * The context for the authentication routes.
 * @property isAuth - Whether the user is authenticated.
 * @property token - The token of the user.
 * @property userId - The ID of the user.
 * @property authLoading - Whether the authentication is loading.
 * @property onLogin - The function to login the user.
 * @property onSignup - The function to signup the user.
 */
export interface AuthRouteContext {
  isAuth: boolean;
  token: string | null;
  userId: string | null;
  authLoading: boolean;
  onLogin: (authData: LoginAuthData) => void;
  onSignup: (values: { email: string; password: string; name: string }) => void;
}
