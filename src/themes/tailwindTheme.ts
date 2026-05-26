import { colors } from "./colors";

/** Tailwind theme extension — values are sourced from `colors.ts`. */
export const tailwindTheme = {
  colors: {
    brand: {
      500: colors.primary,
      600: colors.primaryDark,
    },
    danger: colors.danger,
  },
  fontFamily: {
    sans: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ],
  },
} as const;
