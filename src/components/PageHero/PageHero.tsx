import { Typography } from "antd";
import type { PageHeroProps } from "@/components/PageHero/types";

function PageHero({ title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200/60 bg-white">
      <div className="page-container py-10 sm:py-14 lg:py-16">
        <div className="max-w-2xl">
          <Typography.Title
            level={1}
            className="!mb-3 !text-3xl sm:!text-4xl"
          >
            {title}
          </Typography.Title>
          <Typography.Paragraph className="!mb-0 text-base text-slate-500 sm:text-lg">
            {description}
          </Typography.Paragraph>
          {children ? <div className="mt-6 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
