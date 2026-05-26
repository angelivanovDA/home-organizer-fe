import type { ReactNode } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { ROUTES } from "@/constants/routesConstants";
import type { NavIconKey, NavItemConfig } from "@/types/nav";

/** The navigation icons. */
export const NAV_ICONS: Record<NavIconKey, ReactNode> = {
  home: <HomeOutlined />,
  dashboard: <MessageOutlined />,
  login: <LoginOutlined />,
  signup: <UserAddOutlined />,
  logout: <LogoutOutlined />,
};

/** The navigation items. */
export const navItems: NavItemConfig[] = [
  {
    id: "home",
    text: "Home",
    link: ROUTES.HOME,
    auth: false,
    icon: "home",
  },
  {
    id: "dashboard",
    text: "Dashboard",
    link: ROUTES.DASHBOARD,
    auth: true,
    icon: "dashboard",
  },
  {
    id: "login",
    text: "Login",
    link: ROUTES.LOGIN,
    auth: false,
    icon: "login",
  },
  {
    id: "signup",
    text: "Sign up",
    link: ROUTES.SIGNUP,
    auth: false,
    icon: "signup",
  },
];
