import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// relative
import { submitRole } from "../backend-utils/user-utils";

// styles
import classes from "../styles/selectRole.module.css";

// antd
import { Input, Button, Radio, Steps, Alert, message } from "antd";

const { TextArea } = Input;
const { Step } = Steps;

// components
import CenterContent from "../components/CenterContent";

export default function SelectRole() {
  const router = useRouter();
  // ! step state
  const [current, setCurrent] = useState(0);

  const [loggingIn, setLoggingIn] = useState(false);
  const [err, setErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [obj, setObj] = useState({
    role: "2",
    problem: "",
    collaboration: "0",
  });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const submit = () => {
    setLoggingIn(true);
    setErr("");
    setShowAlert(false);
    submitRole(obj.role, obj.problem, obj.collaboration)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.role === "1") router.replace("/auth/signin");
          if (data.role === "2") router.replace("/my-activity/dashboard");
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
    <CenterContent>
      <div className={classes.wrapper}>
        <Steps current={current}>
          <Step key={1} title={"Step 1 of 2"} />
          <Step key={2} title={"Step 2 of 2"} />
        </Steps>

        <h5 className={classes.header}>
          We'll tune up Digital features for your account with this information
        </h5>

        {/* content */}
        <div className={classes.content}>{steps[current](obj, setObj)}</div>

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
            <Button loading={loggingIn} type="primary" onClick={submit}>
              Finish
            </Button>
          )}
        </div>
        {showAlert && <Alert message={err} type="error" />}
      </div>
    </CenterContent>
  );
}

const steps = [
  function ChooseRole(obj: any, setObj: Function) {
    const options = [
      { label: "Brand", value: "2" },
      { label: "Influencer", value: "1" },
    ];
    const [value, setValue] = useState("2");
    const onChange = (e: any) => {
      setValue(e.target.value);
      setObj({ ...obj, role: e.target.value });
    };
    return (
      <>
        <h5 className={classes.label}>What do you represent?</h5>

        <Radio.Group
          options={options}
          onChange={onChange}
          value={value}
          optionType="button"
        />
      </>
    );
  },

  function StepTwo(obj: any, setObj: Function) {
    // ! useless state. still here b/c react is bitching with less state was found
    const [value, setValue] = useState();
    // !
    return (
      <>
        {obj.role == "influencer" ? (
          <InfluencerStepTwo obj={obj} setObj={setObj} />
        ) : (
          <BrandStepTwo obj={obj} setObj={setObj} />
        )}
      </>
    );
  },
];
function Problem(props: any) {
  // ! useless state. still here b/c react is bitching with less state was found
  const [value, setValue] = useState();
  // !
  const { obj, setObj } = props;
  return (
    <>
      <h5 className={classes.label}>
        Problem you are trying to solve? (optional)
      </h5>
      <TextArea
        rows={5}
        maxLength={200}
        showCount={true}
        onChange={(e) => setObj({ ...obj, problem: e.target.value })}
        placeholder="Please leave some words for us to understand your interest. How are you connected with influence marketing?"
      />
    </>
  );
}

function InfluencerStepTwo(props: any) {
  const { obj, setObj } = props;
  const options = [
    { label: "0", value: "0" },
    { label: "1-9", value: "1-9" },
    { label: "10-29", value: "10-29" },
    { label: "30+", value: "30+" },
  ];
  const [value, setValue] = useState("0");
  const onChange = (e: any) => {
    setValue(e.target.value);
    setObj({ ...obj, collaboration: e.target.value });
  };
  return (
    <>
      <h5 className={classes.label}>
        How many ADS with brands have you launched in the last 90 days?
      </h5>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
      />

      <Problem obj={obj} setObj={setObj} />
    </>
  );
}

function BrandStepTwo(props: any) {
  const { obj, setObj } = props;
  const options = [
    { label: "0", value: "0" },
    { label: "1-9", value: "1-9" },
    { label: "10-29", value: "10-29" },
    { label: "30+", value: "30+" },
  ];
  const [value, setValue] = useState("0");
  const onChange = (e: any) => {
    setValue(e.target.value);
    setObj({ ...obj, collaboration: e.target.value });
  };
  return (
    <>
      <h5 className={classes.label}>
        How many ADS with influencers have you launched in the last 90 days?
      </h5>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
      />
      <Problem obj={obj} setObj={setObj} />
    </>
  );
}
