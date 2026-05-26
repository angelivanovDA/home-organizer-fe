import type { LoginAuthData } from "@/types";

export interface LoginProps {
  onLogin: (authData: LoginAuthData) => void;
  loading: boolean;
}
