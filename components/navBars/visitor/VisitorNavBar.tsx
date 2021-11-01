import React from "react";
import { useSession, signOut } from "next-auth/client";

import { useRouter } from "next/router";
import Link from "next/link";

// styles
import classes from "../navBar.module.css";

// antd
import { Button } from "antd";

// relative
import { Roles } from "../../../constants/roles";

// components
import Profile from "../../profile/ProfileDropDown";

interface User {
  id: null;
  username: string;
  email: string;
  password: null;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export default function VisitorNavBar() {
  const router = useRouter();
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut().finally(() => {
      window.location.href = "/";
    });
  }

  const brandRoutes = [
    { path: "/my-activity", name: "My activity" },
    // { path: "/discover", name: "Discover" },
    { path: "/creators", name: "Creators" },
    { path: "/short-list", name: "Shortlist" },
  ];

  return (
    <header className={classes.navbar}>
      <h1 className={classes.logo} onClick={() => router.push("/")}>
        DIGITAL
      </h1>
      {session && (session.user as User).role === Roles.BRAND && (
        <nav className={classes.menu}>
          {brandRoutes.map((r, i) => (
            <li
              key={r.path}
              className={`${classes.navitem} ${
                router.pathname.startsWith(r.path) && classes.activeNavitem
              }`}
            >
              <Link href={`${r.path}${i === 0 ? "/dashboard" : ""}`}>
                <a className={classes.navlink}>{r.name}</a>
              </Link>
            </li>
          ))}
        </nav>
      )}
      <div className={classes.toRight}>
        {/*  */}
        {session && (
          <Profile user={session.user} logoutHandler={logoutHandler} />
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
