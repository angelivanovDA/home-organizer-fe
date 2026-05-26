/** Shared palette for Ant Design (`antTheme.ts`) and Tailwind (`tailwindTheme.ts`). */
export const colors = {
  primary: "#4f46e5",
  primaryDark: "#4338ca",
  info: "#4f46e5",
  white: "#ffffff",
  danger: "#dc2626",
  slate: {
    50: "#f8fafc",
    900: "#0f172a",
  },
} as const;

export type AppColors = typeof colors;
