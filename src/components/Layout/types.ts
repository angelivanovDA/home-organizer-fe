import type { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  isAuth: boolean;
  onLogout: () => void;
  error: Error | null;
  onErrorDismiss: () => void;
}
