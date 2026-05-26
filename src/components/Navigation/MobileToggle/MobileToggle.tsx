import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import type { MobileToggleProps } from "@/components/Navigation/MobileToggle/types";

function MobileToggle({ onOpen }: MobileToggleProps) {
  return (
    <Button
      type="text"
      icon={<MenuOutlined />}
      className="ml-auto shrink-0 lg:!hidden"
      onClick={onOpen}
      aria-label="Open menu"
    />
  );
}

export default MobileToggle;
