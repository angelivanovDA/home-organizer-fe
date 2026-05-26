import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout as AntLayout, theme } from "antd";

import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";
import type { LayoutProps } from "@/components/Layout/types";
import MainNav from "@/components/Navigation/MainNav/MainNav";
import MobileNav from "@/components/Navigation/MobileNav/MobileNav";
import { getSelectedNavKey } from "@/utils/navUtils";

const { Header, Content } = AntLayout;

function Layout({
  children,
  isAuth,
  onLogout,
  error,
  onErrorDismiss,
}: LayoutProps) {
  const location = useLocation();
  const { token: antToken } = theme.useToken();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const selectedKey = getSelectedNavKey(location.pathname, isAuth);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      onLogout();
    }
    setMobileNavOpen(false);
  };

  return (
    <AntLayout className="min-h-screen bg-slate-50">
      <Header
        className="sticky top-0 z-50 flex h-auto items-center border-b border-slate-200/60 !px-2 py-0 shadow-sm sm:!px-3 lg:!px-4"
        style={{ background: antToken.colorBgContainer, lineHeight: "80px" }}
      >
        <MainNav
          isAuth={isAuth}
          selectedKey={selectedKey}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onMenuClick={handleMenuClick}
        />
      </Header>
      <Content>
        <MobileNav
          open={mobileNavOpen}
          isAuth={isAuth}
          selectedKey={selectedKey}
          onClose={() => setMobileNavOpen(false)}
          onMenuClick={handleMenuClick}
        />
        <ErrorHandler error={error} onHandle={onErrorDismiss} />
        {children}
      </Content>
    </AntLayout>
  );
}

export default Layout;
