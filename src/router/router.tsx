import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";

import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Login/Login";
import SignupPage from "@/pages/Signup/Signup";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import SinglePostPage from "@/pages/SinglePost/SinglePost";

import { ROUTES } from "@/constants/routesConstants";
import type { AuthRouteContext } from "@/types";

/** The public route configuration. */
/** @param ctx - The authentication context. */
const publicRouteConfig = (ctx: AuthRouteContext): RouteObject[] => [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage onLogin={ctx.onLogin} loading={ctx.authLoading} />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage onSignup={ctx.onSignup} loading={ctx.authLoading} />,
  },
];

/** The private route configuration. */
/** @param ctx - The authentication context. */
const privateRouteConfig = (ctx: AuthRouteContext): RouteObject[] => [
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage userId={ctx.userId!} token={ctx.token!} />,
  },
  {
    path: ROUTES.POST,
    element: <SinglePostPage userId={ctx.userId!} token={ctx.token!} />,
  },
];

/** The route configuration. */
/** @param ctx - The authentication context. */
const getRouteConfig = (ctx: AuthRouteContext): RouteObject[] => {
  const isAuthenticated = Boolean(ctx.isAuth && ctx.token && ctx.userId);
  return isAuthenticated ? privateRouteConfig(ctx) : publicRouteConfig(ctx);
};

/** The AppRoutes component. */
/** @param props - The authentication context. */
export function AppRoutes(props: AuthRouteContext) {
  return useRoutes(getRouteConfig(props));
}

export default AppRoutes;
