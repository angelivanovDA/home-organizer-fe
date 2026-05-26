import type { ButtonProps as AntButtonProps } from "antd";
import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  link?: string;
  design?: "accent" | "danger" | string;
  mode?: "flat" | "raised" | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  size?: AntButtonProps["size"];
  icon?: AntButtonProps["icon"];
}
