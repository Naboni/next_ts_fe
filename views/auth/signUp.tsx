import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// relative
import { signup } from "../../backend-utils/user-utils";
// antd
import { Form, Input, Button, Checkbox, Alert, Radio } from "antd";
// styles
import classes from "./signUp.module.css";
export default function SignUp() {
  const router = useRouter();

  const [loggingIn, setLoggingIn] = useState(false);
  const [err, setErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [passwordLength, setPasswordLength] = useState(0);

  // ! Radio state
  const options = [
    // { label: "Brand", value: "BRAND" },
    { label: "Creator", value: "CREATOR" },
  ];
  const [value, setValue] = useState("CREATOR");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onFinish = (values: any) => {
    setLoggingIn(true);
    setErr("");
    setShowAlert(false);
    signup(
      values.username,
      values.password,
      values.email,
      value,
      (router.query.referrer as string) ?? ""
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.replace("/auth/signin");
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
          <h3>Create your account</h3>
          <p>
            Already have an account?{" "}
            <Link href="/auth/signin">
              <a>Log in</a>
            </Link>{" "}
            to Digital
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
          <Form.Item label="What do you represent?" required={true}>
            <Radio.Group
              options={options}
              onChange={onChange}
              value={value}
              optionType="button"
            />
          </Form.Item>

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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter password"
              onChange={(e) => setPasswordLength(e.target.value.length)}
            />
          </Form.Item>

          <div className={classes.strength}>
            <span
              className={`${classes.box} ${
                passwordLength >= 2 && classes.strong
              }`}
            ></span>
            <span
              className={`${classes.box} ${
                passwordLength >= 4 && classes.strong
              }`}
            ></span>
            <span
              className={`${classes.box} ${
                passwordLength >= 6 && classes.strong
              }`}
            ></span>
            <span
              className={`${classes.box} ${
                passwordLength >= 8 && classes.strong
              }`}
            ></span>
          </div>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("You should accept our terms & policies")
                      ),
              },
            ]}
          >
            <Checkbox>
              I have read and agreed to the <a href="">{"terms & policies"}</a>
            </Checkbox>
          </Form.Item>

          <Form.Item name="sendMail" valuePropName="checked">
            <Checkbox className={classes.mssg}>
              Digital may send you emails and messages with news, events,
              promotional information, and updates. You may opt out at any time
              in your user settings.
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loggingIn}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
        {showAlert && <Alert message={err} type="error" />}
      </div>
    </div>
  );
}
