import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

// relative
import { setupProfile } from "../../backend-utils/admin-utils";

// styles
import classes from "../campaign/createCampaign.module.css";

// antd
import {
  Input,
  Form,
  Select,
  Button,
  Space,
  message,
  Divider,
  Alert,
} from "antd";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [
  {
    label: `Long Label: A`,
    value: "AAAA",
  },
  {
    label: `Long Label: B`,
    value: "BBBB",
  },
];

export default function SetUpProfile() {
  const router = useRouter();

  // ! submit state
  const [loggingIn, setLoggingIn] = useState(false);
  const [err, setErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // ! multi-select state
  const [value, setValue] = React.useState<string[]>([]);

  const selectProps = {
    mode: "multiple" as const,
    style: { width: "100%" },
    value,
    options,
    onChange: (newValue: string[]) => {
      setValue(newValue);
    },
    placeholder: "Select Item...",
    maxTagCount: "responsive" as const,
  };

  // ! final form value
  const onFinish = (values: any) => {
    // if (
    //   !values.videoData ||
    //   values.videoData?.length !== 5 ||
    //   !values.sampleVideos ||
    //   values.sampleVideos?.length !== 5
    // ) {
    //   message.error("Number of videos must be 5!", 5);
    //   return;
    // }

    setLoggingIn(true);
    setErr("");
    setShowAlert(false);

    setupProfile(
      "9fe4b547-edd2-48ff-97d4-9b790fa594dd",
      values.creatorName,
      values.creatorProfileUrl,
      values.creatorFollowers,
      values.creatorTrends,
      values.bio,
      values.videoData,
      values.sampleVideos,
      values.sponsoredVideos
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          message.success("Successfully finished setting up profile.", 5);
        } else {
          setErr(data.message);
        }
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
      <div className={classes.header}>
        <h4>Setup profile</h4>
      </div>
      <br />
      <div>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            campaignPriceType: "birr",
            negotiationType: "1",
          }}
        >
          <div className={classes.form}>
            <p>General</p>
            <div className={classes.form_inputs}>
              <Form.Item
                label="Creator name"
                name="creatorName"
                rules={[
                  {
                    required: true,
                    message: "Please input the creator's name!",
                    max: 50,
                  },
                ]}
              >
                <Input placeholder="Enter creator's name" />
              </Form.Item>

              <Form.Item
                label="Creator profile url"
                name="creatorProfileUrl"
                rules={[
                  {
                    required: true,
                    message: "Please input the creator's picture url!",
                    max: 500,
                  },
                ]}
              >
                <Input placeholder="Enter creator's picture url" />
              </Form.Item>

              <Form.Item
                label="Creator followers"
                name="creatorFollowers"
                rules={[
                  {
                    required: true,
                    message: "Please input creator's picture url!",
                    max: 10,
                  },
                ]}
              >
                <Input type="number" placeholder="Enter creator's followers" />
              </Form.Item>

              <Form.Item
                label="Creator trends"
                name="creatorTrends"
                rules={[
                  {
                    required: true,
                    message: "Please select creator's trends!",
                  },
                ]}
              >
                <Select {...selectProps} allowClear />
              </Form.Item>
              <Form.Item
                label="Bio"
                name="bio"
                rules={[
                  {
                    required: true,
                    message: "Please input creator's bio!",
                  },
                ]}
              >
                <TextArea rows={4} maxLength={500} showCount />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className={classes.form}>
            <p>Video stat</p>
            <div className={classes.form_inputs}>
              <p>Add for 5 videos</p>
              <Form.List name="videoData">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          {...field}
                          name={[field.name, "views"]}
                          fieldKey={[field.fieldKey, "views"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing views",
                              max: 10,
                            },
                          ]}
                        >
                          <Input placeholder="Video views" type="number" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "likes"]}
                          fieldKey={[field.fieldKey, "likes"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing likes",
                              max: 10,
                            },
                          ]}
                        >
                          <Input placeholder="Video likes" type="number" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "shares"]}
                          fieldKey={[field.fieldKey, "shares"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing shares",
                              max: 10,
                            },
                          ]}
                        >
                          <Input placeholder="Video shares" type="number" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "comments"]}
                          fieldKey={[field.fieldKey, "comments"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing comments",
                              max: 10,
                            },
                          ]}
                        >
                          <Input placeholder="Video comments" type="number" />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add a video
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
          <div className={classes.form}>
            <p>Sample videos</p>
            <div className={classes.form_inputs}>
              <p>Add 5 video links</p>
              <Form.List name="sampleVideos">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        align="baseline"
                        style={{ width: "100%" }}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "link"]}
                          fieldKey={[field.fieldKey, "link"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing link",
                              max: 200,
                            },
                          ]}
                        >
                          <Input placeholder="Video link" />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add a sample video link
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>

          <div className={classes.form}>
            <p>Sponsored videos</p>
            <div className={classes.form_inputs}>
              <p>Add video links</p>
              <Form.List name="sponsoredVideos">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        align="baseline"
                        style={{ width: "100%" }}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "link"]}
                          fieldKey={[field.fieldKey, "link"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing link",
                              max: 200,
                            },
                          ]}
                        >
                          <Input placeholder="Video link" />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add a sponsored video link
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loggingIn}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        {showAlert && <Alert message={err} type="error" />}
      </div>
    </div>
  );
}
