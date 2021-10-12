import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import Image from "next/image";
// relative
import apollo from "../public/images/apollo.png";
import space from "../public/images/space.png";
import corey from "../public/images/corey.png";
// components
import CenterContent from "../components/CenterContent";
// styles
import classes from "../styles/index.module.css";
// antd
import { Form, Input, Button, Checkbox, Col, Space } from "antd";
const Home: NextPage = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [current, setCurrent] = useState(0);
  const delay = 5000;
  const creators = [
    {
      picture: apollo,
      name: "Apollo",
    },
    {
      picture: space,
      name: "Space ",
    }
  ];
  useEffect(() => {
    let timer = setInterval(() => {
      setCurrent(prevCount => prevCount + 1);
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, []);

  let currentlyDisplayedCreator = creators[current % creators.length];
  return (
    <div style={{ marginTop: "10%" }}>
      <CenterContent>
        <div className={classes.contactContainer}>
          <div className={classes.imageContainer}>
            <Image src={currentlyDisplayedCreator.picture} alt="" className={classes.image} />
          </div>
          <div className={classes.contactFormContainer}>
            <div>
              <div className={classes.header}>
                <h3>Start your creator journey like</h3>
                <h1>{currentlyDisplayedCreator.name}</h1>
              </div>
              <div className={classes.form}>
                <Form
                  layout="vertical"
                  initialValues={{ sendMail: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="TikTok Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter you TikTok username" />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                        max: 10,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your phone number  0912..."
                      type="number"
                    />
                  </Form.Item>
                  <p style={{ color: "grey" }}>
                    We will contact you using your phone number.
                  </p>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ float: "left", width: "150px" }}
                    >
                      Let's go!
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </CenterContent>
    </div>
  );
};

export default Home;
