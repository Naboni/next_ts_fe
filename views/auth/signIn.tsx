import React from "react";
import Link from "next/link";
// antd
import { Form, Input, Button, Checkbox, Col, Space } from "antd";
// styles
import classes from "./signUp.module.css";

export default function signIn() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return ( 
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h3>Log in to your account</h3>
          <p>
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <a>Sign up</a>
            </Link>{" "}
            here
          </p>
        </div>
        <br />
        <Form
          layout="vertical"
          initialValues={{ sendMail: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email" },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
