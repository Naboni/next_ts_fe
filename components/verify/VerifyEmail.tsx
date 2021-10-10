import React, { useState } from "react";
import Image from "next/image";

// styles
import classes from "./verifyEmail.module.css";

// antd
import { Button } from "antd";

// relative

import verifyImg from "../../public/verify.svg";

interface IProps {
  colored: boolean | undefined,
  padded: boolean | undefined,
}
export default function VerifyEmail({ colored , padded} : IProps) {
  const [resent, setResent] = useState(false);

  return (
    <div className={`${classes.container} ${colored && classes.bg} ${padded && classes.padded}`}>
      <div className={classes.leftChild}>
        <h1>Verify your email</h1>
        <h3>Before you continue, you’ll need to verify your email.</h3>
        <Button
          style={{ maxWidth: "150px" }}
          type="primary"
          onClick={() => {
            if (!resent) {
              fetch(`http://localhost:3000/api/users/send-verification/${""}`, {
                method: "POST",
              });
              setResent(true);
            }
          }}
        >
          {!resent ? "Verify Email" : "Check your email"}
        </Button>
      </div>
      <div>
        <Image alt="" src={verifyImg} />
      </div>
    </div>
  );
}
