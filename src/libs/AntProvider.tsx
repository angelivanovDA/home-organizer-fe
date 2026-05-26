import type { ReactNode } from "react";
import { ConfigProvider } from "antd";

import { appTheme } from "@/themes/antTheme";

interface AntProviderProps {
  children: ReactNode;
}

function AntProvider({ children }: AntProviderProps) {
  return <ConfigProvider theme={appTheme}>{children}</ConfigProvider>;
}

export default AntProvider;
