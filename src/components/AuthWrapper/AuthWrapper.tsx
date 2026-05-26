import { Card } from "antd";

import type { AuthWrapperProps } from "@/components/AuthWrapper/types";
import PageHero from "@/components/PageHero/PageHero";

function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <>
      <PageHero title={title} description={subtitle} />
      <section className="page-container py-8 lg:py-10">
        <Card variant="borderless" className="mx-auto max-w-md shadow-sm">
          {children}
        </Card>
      </section>
    </>
  );
}

export default AuthWrapper;
