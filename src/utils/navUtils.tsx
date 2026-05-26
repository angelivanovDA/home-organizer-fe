import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

import { NAV_ICONS, navItems } from "@/constants/navConstants";
import { ROUTES } from "@/constants/routesConstants";

/** Builds the navigation menu items based on the authentication status.
 * @param isAuth - The authentication status.
 * @returns The navigation menu items.
 */
export function buildNavMenuItems(isAuth: boolean): MenuProps["items"] {
  const items: NonNullable<MenuProps["items"]> = navItems
    .filter((item) => item.auth === isAuth)
    .map((item) => ({
      key: item.link,
      icon: NAV_ICONS[item.icon],
      label: <Link to={item.link}> {item.text} </Link>,
    }));

  if (isAuth) {
    items.push({
      key: "logout",
      icon: NAV_ICONS.logout,
      label: "Logout",
      danger: true,
    });
  }

  return items;
}

/** Returns the selected navigation key based on the pathname and authentication status.
 * @param pathname - The pathname.
 * @param isAuth - The authentication status.
 * @returns The selected navigation key.
 */
export function getSelectedNavKey(pathname: string, isAuth: boolean): string {
  if (!isAuth) {
    if (pathname === ROUTES.SIGNUP) {
      return ROUTES.SIGNUP;
    }
    if (pathname === ROUTES.LOGIN) {
      return ROUTES.LOGIN;
    }
    return ROUTES.HOME;
  }

  return ROUTES.DASHBOARD;
}
