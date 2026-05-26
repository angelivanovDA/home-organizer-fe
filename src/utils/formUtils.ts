import type { LengthConfig, FormField } from "@/types/form";

/** Returns true when every form field in `fields` passes validation. */
export function computeFormIsValid<T extends string>(
  fields: Record<T, FormField>,
): boolean {
  return (Object.keys(fields) as T[]).every((key) => fields[key].valid);
}

/** Returns true when the value is not an empty string. */
export const required = (value: string): boolean => value.trim() !== "";

/** Returns true when the value has a length between `config.min` and `config.max`. */
export const length =
  (config: LengthConfig) =>
  (value: string): boolean => {
    let isValid = true;
    if (config.min) {
      isValid = isValid && value.trim().length >= config.min;
    }
    if (config.max) {
      isValid = isValid && value.trim().length <= config.max;
    }
    return isValid;
  };

/** Returns true when the value is a valid email address. */
export const email = (value: string): boolean =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value,
  );
