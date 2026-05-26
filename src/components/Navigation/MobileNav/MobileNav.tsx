import { Drawer, Menu } from "antd";
import type { MobileNavProps } from "@/components/Navigation/MobileNav/types";
import { buildNavMenuItems } from "@/utils/navUtils";

function MobileNav({
  open,
  isAuth,
  selectedKey,
  onClose,
  onMenuClick,
}: MobileNavProps) {
  const handleClick = (info: { key: string }) => {
    onMenuClick(info);
    onClose();
  };

  return (
    <Drawer
      title="Menu"
      placement="left"
      onClose={onClose}
      open={open}
      className="lg:hidden"
      size="default"
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={buildNavMenuItems(isAuth)}
        onClick={handleClick}
        style={{ borderRight: "none" }}
        disabledOverflow
      />
    </Drawer>
  );
}

export default MobileNav;
