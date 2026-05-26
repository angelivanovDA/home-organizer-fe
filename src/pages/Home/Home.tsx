import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Typography } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  MessageOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import PageHero from "@/components/PageHero/PageHero";
import { ROUTES } from "@/constants/routesConstants";

const features = [
  {
    icon: <HomeOutlined className="text-xl text-indigo-600" />,
    title: "Organize your home",
    description:
      "Keep notes, updates, and reminders in one place so everyone in the household stays aligned.",
  },
  {
    icon: <MessageOutlined className="text-xl text-indigo-600" />,
    title: "Share posts and messages",
    description:
      "Publish posts to your feed and exchange messages with others in your home network.",
  },
  {
    icon: <UserAddOutlined className="text-xl text-indigo-600" />,
    title: "Built for households",
    description:
      "Create an account, invite family members, and collaborate on day-to-day home tasks.",
  },
] as const;

function Home() {
  return (
    <>
      <PageHero
        title="Home Organizer"
        description="A simple space for your household to share updates, coordinate chores, and stay in sync—whether you are planning groceries or tracking who is home."
      >
        <Link to={ROUTES.LOGIN}>
          <Button type="primary" size="large" icon={<LoginOutlined />}>
            Login
          </Button>
        </Link>
        <Link to={ROUTES.SIGNUP}>
          <Button size="large" icon={<UserAddOutlined />}>
            Create account
          </Button>
        </Link>
      </PageHero>

      <section className="page-container space-y-6 py-8 lg:py-10">
        <div>
          <Typography.Title level={2} className="!mb-1">
            What you can do
          </Typography.Title>
          <Typography.Text type="secondary">
            Everything you need to keep your household organized and connected
          </Typography.Text>
        </div>

        <Row gutter={[16, 16]}>
          {features.map((feature) => (
            <Col key={feature.title} xs={24} md={8}>
              <Card variant="borderless" className="h-full shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  {feature.icon}
                </div>
                <Typography.Title level={4} className="!mb-2">
                  {feature.title}
                </Typography.Title>
                <Typography.Paragraph className="!mb-0 text-slate-500">
                  {feature.description}
                </Typography.Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}

export default Home;
