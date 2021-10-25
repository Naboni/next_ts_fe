import React, { useState } from "react";

// styles
import classes from "../styles/selectRole.module.css";

// antd
import { Form, Button, Radio, Steps, message } from "antd";

const { Step } = Steps;
// components
import CenterContent from "../components/CenterContent";

export default function SelectRole() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <CenterContent>
      <div className={classes.wrapper}>
        <Steps current={current}>
          <Step key={1} title={"Create account. Step 1 of 2"} />
          <Step key={2} title={"Create account. Step 2 of 2"} />
        </Steps>
        <div className={classes.content}>{steps[current]()}</div>
        <div className={classes.button}>
          {current > 0 && (
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => prev()}
              type="text"
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    </CenterContent>
  );
}

const steps = [
  function ChooseRole() {
    const onFinish = (values: any) => {};

    return (
      <Form
        layout="vertical"
        initialValues={{ role: "a" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h5 className={classes.header}>
          We'll tune up Digital features for your account with this information
        </h5>

        <h5 className={classes.lable}>What do you represent?</h5>

        <Form.Item name="role">
          <Radio.Group>
            <Radio value="influencer">Influencer</Radio>
            <Radio value="brand">Brand</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  },
  function InfluencerStepTwo() {
    return <div>2</div>;
  },
  function BrandStepTwo() {
    return <div>3</div>;
  },
];
