import { Menu } from "antd";

import Logo from "@/components/Logo/Logo";
import MobileToggle from "@/components/Navigation/MobileToggle/MobileToggle";
import type { MainNavProps } from "@/components/Navigation/MainNav/types";
import { buildNavMenuItems } from "@/utils/navUtils";

function MainNav({
  isAuth,
  selectedKey,
  onOpenMobileNav,
  onMenuClick,
}: MainNavProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <Logo isAuth={isAuth} />
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={buildNavMenuItems(isAuth)}
        onClick={onMenuClick}
        className="hidden min-w-0 flex-1 justify-end border-0 bg-transparent lg:flex"
        style={{ borderBottom: "none" }}
        disabledOverflow
      />
      <MobileToggle onOpen={onOpenMobileNav} />
    </div>
  );
}

export default MainNav;
