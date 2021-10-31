import React from "react";
import { useSession, signOut } from "next-auth/client";

import { useRouter } from "next/router";
import Link from "next/link";

// styles
import classes from "../navBar.module.css";

// antd
import { Button } from "antd";

export default function VisitorNavBar() {
  const router = useRouter();
  const [session, loading] = useSession();

  return (
    <header className={classes.navbar}>
      <h1 className={classes.logo} onClick={() => router.push("/")}>
        DIGITAL
      </h1>
      <div className={classes.toRight}>
        {/*  */}
        {session && (
          <>
            {session.user?.email}
            {"        "}
            <Button
              type="primary"
              danger
              className={classes.createCampaign}
              onClick={() => signOut()}
            >
              Log out
            </Button>
          </>
        )}

        {/* show auth btns only if there is no session */}
        {!session && !loading && (
          <>
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
          </>
        )}
        {/* <RightMenu /> */}
      </div>
    </header>
  );
}
