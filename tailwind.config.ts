import type { Config } from "tailwindcss";

import { tailwindTheme } from "./src/themes/tailwindTheme";

export default {
  theme: {
    extend: tailwindTheme,
  },
} satisfies Config;
