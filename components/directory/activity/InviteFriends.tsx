import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/client";

import { CopyToClipboard } from "react-copy-to-clipboard";

// antd
import { Button, message } from "antd";

// styles
import classes from "./inviteFriends.module.css";

// relative

var crypto = require("crypto");

export default function InviteFriends() {
  const [session, _] = useSession();
  const user = session?.user as any;

  const [received, setReceived] = useState(false);
  const [code, setCode] = useState("");

  var salt = crypto.randomBytes(5).toString("hex");
  var salt2 = crypto.randomBytes(5).toString("hex");

  const onCopy = () => {
    setCode((salt + user.username + salt2).toLowerCase());
  };

  useEffect(() => {
    if (code !== "") {
      setReceived(true);
    }
  }, [code]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.leftChild}>
          <h1>Invite your friends</h1>
          <h3>
            Invite your friends and get bonuses. Every time you invite a friend,
            you will get 5 birr mobile card credit.{" "}
            <span className={classes.spanChild}>
              Copy your invitation link and send it to your friends
            </span>
          </h3>

          <Button type="primary" style={{ width: "140px" }} onClick={onCopy}>
            Get Link
          </Button>

          <h5>You can claim your bonus on every 15 invitations.</h5>
        </div>
        <div className={classes.rightChild}>
          <div className={classes.body}>
            <h3>
              Currently invited friends: <span>{0}</span>
            </h3>
            <Button type="link">Claim</Button>
          </div>
        </div>
      </div>
      {received && (
        <div className={classes.copy}>
          <CopyToClipboard
            text={`http://localhost:3000/auth/signup?referrer=${code}`}
            onCopy={() => message.info("Copied referral code to clipboard")}
          >
            <div className={classes.copyMssg}>
              <h4>http://localhost:3000/auth/signup?referrer={code}</h4>
              <h3>Copy</h3>
            </div>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
}
