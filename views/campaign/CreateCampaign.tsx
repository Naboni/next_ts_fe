import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// styles
import classes from "./createCampaign.module.css";

// relative
import { createCampaign } from "../../backend-utils/campaign-util";

// antd
import {
  Input,
  Form,
  DatePicker,
  Select,
  Upload,
  Button,
  Space,
  Radio,
  Divider,
  message,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

export default function CreateCampaign() {
  const router = useRouter();

  // ! submit state
  const [loggingIn, setLoggingIn] = useState(false);

  // ! Radio state
  const options = [
    { label: "Negotiate with creator (recommended)", value: "1" },
    { label: "Set a price", value: "2" },
  ];
  const [value, setValue] = useState("1");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  // ! range-select(campaign duration) state
  const rangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Please select campaign duration!",
      },
    ],
  };

  // ! final form value
  const onFinish = (values: any) => {
    setLoggingIn(true);
    const rangeValue = values["campaignDuration"];
    const result = {
      ...values,
      campaignDuration: [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    createCampaign(
      result.brandIndustry,
      result.brandName,
      result.brandWebsite,
      result.campaignDuration,
      result.campaignGoal,
      result.campaignName,
      result.campaignPrice,
      result.campaignPriceType,
      result.contactName,
      result.email,
      result.message,
      result.negotiationType,
      result.otherSocialMedia,
      result.phone,
      result.productName
    )
      .then((res) => {
        if (res.ok) {
          message.success(`Successfully created a campaign`);
        } else {
          message.error("Something went wrong!");
        }
      })
      .catch((e) => message.error("Something went wrong!"))
      .finally(() => setLoggingIn(false));
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h4>Create campaign</h4>
        <p>
          All of the following information will be shown to creators once you
          create the campaign
        </p>
      </div>
      <div className={classes.form_container}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            campaignPriceType: "birr",
            negotiationType: "1",
          }}
        >
          <div className={classes.form}>
            <p>Campaign</p>
            <div className={classes.form_inputs}>
              <Form.Item
                label="Campaign name"
                name="campaignName"
                rules={[
                  {
                    required: true,
                    message: "Please input your campaign name!",
                    max: 50,
                  },
                ]}
              >
                <Input placeholder="Enter campaign name" />
              </Form.Item>

              <Form.Item
                label="What is your main goal for this campaign?"
                name="campaignGoal"
                rules={[
                  {
                    required: true,
                    message: "Please select your campaign goal!",
                    max: 50,
                  },
                ]}
              >
                <Select placeholder="Select">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="campaignDuration"
                label="Campaign duration"
                {...rangeConfig}
              >
                <RangePicker
                  dateRender={(current) => {
                    const style = {};
                    if (current.date() === 1) {
                      (style as any).border = "1px solid #1890ff";
                      (style as any).borderRadius = "50%";
                    }
                    return (
                      <div className="ant-picker-cell-inner" style={style}>
                        {current.date()}
                      </div>
                    );
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Campaign price"
                name="negotiationType"
                required={true}
              >
                <Radio.Group
                  options={options}
                  onChange={onChange}
                  value={value}
                />
              </Form.Item>

              {value === "2" && (
                <Form.Item>
                  <Input.Group compact style={{ display: "flex" }}>
                    <Form.Item name="campaignPriceType" noStyle>
                      <Select style={{ width: 100 }}>
                        <Option value="birr">Birr</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="campaignPrice"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input a price!",
                          max: 10,
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              )}

              <Form.Item
                label="Message to creators"
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Please input your message to creators!",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  maxLength={800}
                  showCount
                  placeholder="Describe more about the campaign and the product to be advertised"
                />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className={classes.form}>
            <p>Brand</p>
            <div className={classes.form_inputs}>
              <Form.Item
                label="Brand name"
                name="brandName"
                rules={[
                  {
                    required: true,
                    message: "Please input your brand name!",
                    max: 50,
                  },
                ]}
              >
                <Input placeholder="Enter brand name" />
              </Form.Item>

              <Form.Item
                label="Brand website"
                name="brandWebsite"
                rules={[
                  {
                    required: true,
                    message: "Please input your brand website!",
                    max: 50,
                  },
                ]}
              >
                <Input placeholder="Enter brand website" />
              </Form.Item>

              <Form.Item label="Brand logo">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload image</Button>
                  <h6 style={{ marginTop: "5px", color: "grey" }}>
                    Logos must be PNG or JPG and less than 5 MB
                  </h6>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Brand industry"
                name="brandIndustry"
                rules={[
                  {
                    required: true,
                    message: "Please select your brand industry!",
                  },
                ]}
              >
                <Select placeholder="Select">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Product name"
                name="productName"
                rules={[
                  {
                    required: true,
                    message: "Please input the product name!",
                    max: 50,
                  },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className={classes.form}>
            <p>Contact info</p>
            <div className={classes.form_inputs}>
              <Form.Item
                label="Contact name"
                name="contactName"
                rules={[
                  {
                    required: true,
                    message: "Please input your contact name!",
                    max: 50,
                  },
                ]}
              >
                <Input placeholder="Digital media" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { type: "email" },
                  {
                    required: true,
                    message: "Please input your email!",
                    max: 100,
                  },
                ]}
              >
                <Input placeholder="Enter email address" />
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
                <Input placeholder="Enter phone number" type="number" />
              </Form.Item>

              <p>Other social media</p>
              <Form.List name="otherSocialMedia">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          noStyle
                          style={{ margin: 0 }}
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.area !== curValues.area ||
                            prevValues.sights !== curValues.sights
                          }
                        >
                          {() => (
                            <Form.Item
                              {...field}
                              name={[field.name, "media"]}
                              fieldKey={[field.fieldKey, "media"]}
                              rules={[
                                { required: true, message: "Missing media" },
                              ]}
                            >
                              <Select
                                style={{ width: 130 }}
                                placeholder="Select"
                              >
                                {["Email", "Telegram"].map((item) => (
                                  <Option key={item} value={item}>
                                    {item}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "handle"]}
                          fieldKey={[field.fieldKey, "handle"]}
                          rules={[
                            { required: true, message: "Missing handle" },
                          ]}
                        >
                          <Input placeholder="Enter social media handle" />
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
                        Add social media
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>{" "}
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loggingIn}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
