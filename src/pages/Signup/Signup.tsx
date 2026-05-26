import { Link } from "react-router-dom";
import { Button, Form, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTES } from "@/constants/routesConstants";
import AuthWrapper from "@/components/AuthWrapper/AuthWrapper";
import Input from "@/components/FormElements/Input/Input";
import type { SignupProps, SignupFormValues } from "@/pages/Signup/types";

function Signup({ onSignup, loading }: SignupProps) {
  const [form] = Form.useForm<SignupFormValues>();

  return (
    <AuthWrapper
      title="Create account"
      subtitle="Create an account to start sharing posts and messages."
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onSignup}
      >
        <Input
          id="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          prefix={<MailOutlined className="text-slate-400" />}
          placeholder="you@example.com"
        />
        <Input
          id="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
          prefix={<UserOutlined className="text-slate-400" />}
          placeholder="Your name"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 5, message: "Password must be at least 5 characters" },
          ]}
          prefix={<LockOutlined className="text-slate-400" />}
          placeholder="Create a password"
        />
        <Form.Item className="!mb-2">
          <Button
            className="mt-2"
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>

      <Typography.Paragraph className="!mb-0 text-slate-500">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login.
        </Link>
      </Typography.Paragraph>
    </AuthWrapper>
  );
}

export default Signup;
