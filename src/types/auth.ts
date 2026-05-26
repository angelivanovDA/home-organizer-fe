import type { FormField } from "@/types/form";

/**
 * The authentication data for the login form.
 * @property email - The email of the user.
 * @property password - The password of the user.
 */
export interface LoginAuthData {
  email: string;
  password: string;
}

/**
 * The state of the signup form.
 * @property email - The email field.
 * @property password - The password field.
 * @property name - The name field.
 * @property formIsValid - Whether the form is valid.
 */
export interface SignupFormState {
  email: FormField;
  password: FormField;
  name: FormField;
  formIsValid: boolean;
}

/**
 * The field names for the login form.
 * @property email - The email field.
 * @property password - The password field.
 */
export type LoginFieldName = "email" | "password";

/**
 * The field names for the signup form.
 * @property email - The email field.
 * @property password - The password field.
 * @property name - The name field.
 */
export type SignupFieldName = "email" | "password" | "name";
