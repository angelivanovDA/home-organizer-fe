import { Form, Input as AntInput } from "antd";
import type { InputProps } from "@/components/FormElements/Input/types";

const { TextArea } = AntInput;

function Input({
  id,
  label,
  rules,
  type = "text",
  placeholder,
  prefix,
  size = "large",
  rows = 5,
  className = "!mb-4",
  valid = true,
  touched,
  value,
  onChange,
  initialValue,
}: InputProps) {
  const showError = touched !== undefined && touched && !valid;

  const control =
    type === "password" ? (
      <AntInput.Password
        prefix={prefix}
        placeholder={placeholder}
        size={size}
        value={value}
        onChange={onChange}
      />
    ) : type === "textarea" ? (
      <TextArea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <AntInput
        prefix={prefix}
        placeholder={placeholder}
        size={size}
        type={type === "email" ? "email" : "text"}
        value={value}
        onChange={onChange}
      />
    );

  return (
    <Form.Item
      name={id}
      label={label}
      rules={rules}
      validateStatus={showError ? "error" : undefined}
      className={className}
      initialValue={initialValue}
    >
      {control}
    </Form.Item>
  );
}

export type {
  InputProps,
  InputType,
} from "@/components/FormElements/Input/types";
export default Input;
