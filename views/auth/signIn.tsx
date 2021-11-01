import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn as si } from "next-auth/client";
import Link from "next/link";

// antd
import { Form, Input, Button, Alert } from "antd";
// styles
import classes from "./signUp.module.css";

export default function signIn() {
  const router = useRouter();

  const [loggingIn, setLoggingIn] = useState(false);
  const [err, setErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const onFinish = (values: any) => {
    setLoggingIn(true);
    setErr("");
    setShowAlert(false);
    si("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
      .then((data) => {
        if (data?.error) setErr(data.error);
        else router.replace("/main");
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoggingIn(false));
  };

  useEffect(() => {
    if (err != "") {
      setShowAlert(true);
    }
  }, [err]);

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
            <Button
              loading={loggingIn}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
        {showAlert && <Alert message={err} type="error" />}
      </div>
    </div>
  );
}
