import { Link } from "react-router-dom";
import { Button, Form, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import AuthWrapper from "@/components/AuthWrapper/AuthWrapper";
import Input from "@/components/FormElements/Input/Input";
import { ROUTES } from "@/constants/routesConstants";
import type { LoginProps } from "@/pages/Login/types";
import type { LoginAuthData } from "@/types";

function Login({ onLogin, loading }: LoginProps) {
  const [form] = Form.useForm<LoginAuthData>();

  return (
    <AuthWrapper title="Login" subtitle="Sign in to continue to your account.">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onLogin}
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
          id="password"
          label="Password"
          type="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 5, message: "Password must be at least 5 characters" },
          ]}
          prefix={<LockOutlined className="text-slate-400" />}
          placeholder="Your password"
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
            Login
          </Button>
        </Form.Item>
      </Form>
      <Typography.Paragraph className="!mb-0 text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          to={ROUTES.SIGNUP}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up here.
        </Link>
      </Typography.Paragraph>
    </AuthWrapper>
  );
}

export default Login;
