/**
 * The navigation icon keys.
 * @property home - The home icon.
 * @property dashboard - The dashboard icon.
 * @property login - The login icon.
 * @property signup - The signup icon.
 * @property logout - The logout icon.
 */
export type NavIconKey = "home" | "dashboard" | "login" | "signup" | "logout";

/** The navigation item configuration.
 * @property id - The id of the navigation item.
 * @property text - The text of the navigation item.
 * @property link - The link of the navigation item.
 * @property auth - Whether the navigation item is only visible for authenticated users.
 * @property icon - The icon of the navigation item.
 */
export interface NavItemConfig {
  id: string;
  text: string;
  link: string;
  auth: boolean;
  icon: NavIconKey;
}
