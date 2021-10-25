import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Cookies from "js-cookie";
// relative
import { signin } from "../../backend-utils/user-utils";

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
    signin(values.email, values.password)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Cookies.set("x-access-token", data.accessToken);

          // router.replace("/auth/signin");
        } else {
          setErr(data.message);
        }
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoggingIn(false));
  };
  const onFinishFailed = (errorInfo: any) => {};

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
