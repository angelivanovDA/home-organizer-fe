/**
 * A validator function that returns a boolean indicating whether the value is valid.
 * @param value - The value to validate.
 * @returns A boolean indicating whether the value is valid.
 */
export type Validator = (value: string) => boolean;

/**
 * Configuration for length validation.
 * @property min - The minimum length.
 * @property max - The maximum length.
 */
export interface LengthConfig {
  min?: number;
  max?: number;
}

/**
 * A form field.
 * @property value - The value of the field.
 * @property valid - Whether the field is valid.
 * @property touched - Whether the field has been touched.
 * @property validators - The validators for the field.
 */
export interface FormField {
  value: string;
  valid: boolean;
  touched: boolean;
  validators: Validator[];
}
