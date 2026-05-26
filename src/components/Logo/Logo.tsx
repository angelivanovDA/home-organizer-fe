import { Link } from "react-router-dom";
import { Typography } from "antd";
import LogoImage from "@/components/Logo/LogoImage";
import type { LogoProps } from "@/components/Logo/types";
import { ROUTES } from "@/constants/routesConstants";

function Logo({ showTitle = true, isAuth = false }: LogoProps) {
  const homeLink = isAuth ? ROUTES.DASHBOARD : ROUTES.HOME;

  return (
    <Link
      to={homeLink}
      className="flex items-center gap-2 text-inherit no-underline transition-opacity hover:opacity-80"
      aria-label="Home Organizer home"
    >
      <LogoImage decorative={showTitle} />
      {showTitle && (
        <Typography.Title level={4} className="!mb-0 hidden sm:block">
          Home Organizer
        </Typography.Title>
      )}
    </Link>
  );
}

export default Logo;
