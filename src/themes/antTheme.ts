import { theme, type ThemeConfig } from "antd";

import { colors } from "@/themes/colors";

export const appTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: colors.primary,
    colorInfo: colors.info,
    borderRadius: 10,
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    controlHeight: 40,
  },
  components: {
    Layout: {
      headerBg: colors.white,
      bodyBg: "transparent",
    },
    Card: {
      borderRadiusLG: 12,
    },
    Button: {
      controlHeight: 40,
    },
  },
};
