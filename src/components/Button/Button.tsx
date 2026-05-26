import { Link } from "react-router-dom";
import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import type { ButtonProps } from "@/components/Button/types";

function mapButtonType(
  design?: string,
  mode?: string,
): Pick<AntButtonProps, "type" | "danger" | "ghost"> {
  if (design === "danger") {
    return { danger: true, type: mode === "flat" ? "text" : "primary" };
  }
  if (mode === "flat") {
    return { type: "text" };
  }
  if (design === "accent" || mode === "raised") {
    return { type: "primary" };
  }
  return { type: "default" };
}

function Button({
  link,
  design,
  mode,
  onClick,
  disabled,
  loading,
  type = "button",
  children,
  size,
  icon,
}: ButtonProps) {
  const antType = mapButtonType(design, mode);

  if (link) {
    return (
      <Link to={link}>
        <AntButton {...antType} size={size} icon={icon}>
          {children}
        </AntButton>
      </Link>
    );
  }

  return (
    <AntButton
      {...antType}
      htmlType={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      size={size}
      icon={icon}
    >
      {children}
    </AntButton>
  );
}

export default Button;
