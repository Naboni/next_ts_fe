// types
import { GetServerSideProps } from "next";

import React, { useState, useEffect } from "react";

import { getSession } from "next-auth/client";
import { useSession } from "next-auth/client";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Image from "next/image";

// components
import CenterContent from "../components/CenterContent";

// relative
import { Pv, Roles } from "../constants/roles";
import tiktokLogo from "../public/tiktok.svg";
import {
  claimProfile as cp,
  verifyProfile,
} from "../backend-utils/profile-util";

// styles
import classes from "../styles/claimProfile.module.css";

// antd
import { Input, Button, Form, message, Alert } from "antd";

export default function claimProfile() {
  const [session, _] = useSession();
  const user = session?.user as any;

  const [loggingIn, setLoggingIn] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [err, setErr] = useState("");

  const [response, setResponse] =
    useState<{ success: boolean; tiktokHandle: string; pasteCode: string }>();
  const [received, setReceived] = useState(false);

  const onFinish = (values: any) => {
    setLoggingIn(true);
    setReceived(false);
    setErr("");
    cp(values.handle)
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
      })
      .catch((e) => setErr("Something went wrong!"))
      .finally(() => setLoggingIn(false));
  };

  const handleVerify = () => {
    setVerifying(true);
    setErr("");
    verifyProfile(response?.tiktokHandle!, response?.pasteCode!)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          message.success(data.message, 10);
        } else {
          message.error(data.message, 10);
        }
      })
      .catch((e) => setErr("Something went wrong!"))
      .finally(() => setVerifying(false));
  };

  useEffect(() => {
    if (response) {
      setReceived(true);
    }
  }, [response]);

  return (
    <div className="marginTop">
      <CenterContent>
        <div className={classes.wrapper}>
          <div style={{ width: "100%" }}>
            <div className={classes.header}>
              {user.profileVerification === Pv.PENDING && (
                <Alert
                  style={{ marginBottom: "20px" }}
                  type="warning"
                  message="Your account is already under verification. Please wait patiently."
                />
              )}

              {user.profileVerification === Pv.REJECTED && (
                <Alert
                  style={{ marginBottom: "20px" }}
                  type="error"
                  message="Your account failed the verification process. Please try again."
                />
              )}
              <div className={classes.headerInput}>
                <Image src={tiktokLogo} width="100px" height="100px" />
                <div style={{ marginLeft: "20px" }}>
                  <h4>Claim TikTok Profile</h4>
                  <h5 style={{ color: "grey", marginBottom: "15px" }}>
                    Enter your TikTok profile handle to claim your profile &
                    start your verification process.
                  </h5>
                  <Form onFinish={onFinish} autoComplete="off" layout="inline">
                    <Form.Item
                      name="handle"
                      rules={[
                        {
                          required: true,
                          message: "Please input your tiktok handle!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="TikTok handle"
                        style={{ width: "450px" }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        loading={loggingIn}
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "15px" }}
                      >
                        Get Code
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
            {received && (
              <div className={classes.header} style={{ marginTop: "20px" }}>
                <h3>Your custom verification code</h3>
                <h4 className={classes.pasteCode}>
                  {response?.pasteCode}{" "}
                  <CopyToClipboard
                    text={`${response?.pasteCode}`}
                    onCopy={() =>
                      message.info("Copied verification code to clipboard")
                    }
                  >
                    <span>copy code</span>
                  </CopyToClipboard>
                </h4>
                <h5 style={{ color: "grey" }}>
                  Comment the above code as a comment in the tiktok link given
                  below
                </h5>

                <br />
                <h3>Link to comment code</h3>
                <h4 className={classes.pasteCode}>
                  <a
                    href="https://www.tiktok.com/@semerkebu/video/7026725461887569154"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.tiktok.com/@semerkebu/video/7026725461887569154
                  </a>
                </h4>
                <Button
                  loading={verifying}
                  type="primary"
                  style={{ marginTop: "15px" }}
                  onClick={handleVerify}
                >
                  Verify
                </Button>
              </div>
            )}
          </div>
          <div className={classes.hint}>
            <h4>Verification steps</h4>
            <ul>
              <li>Enter your TikTok handle without the @ symbol.</li>
              <li>Press "Get Code"</li>
              <li>Copy the generated code to your clipboard.</li>
              <li>
                Go to the TikTok link mentioned, paste the code as a comment.
              </li>
              <li>After you’re done, return to this page and click "Verify"</li>
            </ul>
          </div>
        </div>
      </CenterContent>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (
    !session ||
    (session.user as any).role !== Roles.CREATOR ||
    (session.user as any).profileVerification === Pv.APPROVED
  ) {
    // ! redirecting back to home b/c if a logged in user redirected to signin, it will again redirect to home
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
