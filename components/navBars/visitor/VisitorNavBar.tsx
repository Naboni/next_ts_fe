import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";

// styles
import classes from "../navBar.module.css";

// antd
import { Button } from "antd";

export default function VisitorNavBar() {
  const router = useRouter();

  return (
    <header className={classes.navbar}>
      <h1 className={classes.logo} onClick={() => router.push("/")}>
        FOCAL ADDIS
      </h1>
      <div className={classes.toRight}>
        <Button
          type="text"
          className={classes.createCampaign}
          onClick={() => router.push("/auth/signin")}
        >
          Log in
        </Button>
        <Button
          type="primary"
          danger
          className={classes.createCampaign}
          onClick={() => router.push("/auth/signup")}
        >
          Sign up
        </Button>
        {/* <RightMenu /> */}
      </div>
    </header>
  );
}
