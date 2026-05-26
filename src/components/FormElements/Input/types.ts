import type { ChangeEvent, ReactNode } from "react";
import type { InputProps as AntInputProps } from "antd";
import type { Rule } from "antd/es/form";

export type InputType = "text" | "password" | "textarea" | "email";

export interface InputProps {
  id: string;
  label?: string;
  rules?: Rule[];
  type?: InputType;
  placeholder?: string;
  prefix?: ReactNode;
  size?: AntInputProps["size"];
  rows?: number;
  className?: string;
  valid?: boolean;
  touched?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  initialValue?: unknown;
}
