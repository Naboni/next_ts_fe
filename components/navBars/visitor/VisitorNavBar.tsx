import React from "react";
import { useSession, signOut } from "next-auth/client";
import { IoMdNotificationsOutline } from "react-icons/io";

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
  id: string;
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

  const creatorRoutes = [
    { href: "/activity", path: "/activity", name: "My activity" },
    {
      href: "/creator",
      path: `/creator/${(session?.user as User)?.id}`,
      name: "Profile",
    },
    { href: "/learn", path: "/learn", name: "Learn" },
  ];

  const adminRoutes = [
    { path: "/admin ", name: "Dashboard" },
    { path: "/admin/profile-claims", name: "Profile claims" },
    { path: "/admin/setup-profile", name: "Setup profile" },
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

      {session && (session.user as User).role === Roles.CREATOR && (
        <nav className={classes.menu}>
          {creatorRoutes.map((r, i) => (
            <li
              key={r.path}
              className={`${classes.navitem} ${
                router.pathname.startsWith(r.href) && classes.activeNavitem
              }`}
            >
              <Link href={`${r.path}${i === 0 ? "/dashboard" : ""}`}>
                <a className={classes.navlink}>{r.name}</a>
              </Link>
            </li>
          ))}
        </nav>
      )}

      {session && (session.user as User).role === Roles.ADMIN && (
        <nav className={classes.menu}>
          {adminRoutes.map((r, i) => (
            <li
              key={r.path}
              className={`${classes.navitem} ${
                router.pathname === r.path && classes.activeNavitem
              }`}
            >
              <Link href={`${r.path}`}>
                <a className={classes.navlink}>{r.name}</a>
              </Link>
            </li>
          ))}
        </nav>
      )}

      {/* components floating to the right */}
      <div className={classes.toRight}>
        {session && (session.user as User).role === Roles.BRAND && (
          <Button
            type="primary"
            danger
            className={classes.createCampaign}
            onClick={() => router.push("/campaign/create")}
          >
            Create campaign
          </Button>
        )}
        {/*  */}
        {session && (
          <>
            {/* <div style={{border: "1px solid grey", borderRadius: "50%", padding: "3px 7px", marginLeft:'5px'}}> */}
            {/* <IoMdNotificationsOutline /> */}
            {/* </div> */}
            <Profile user={session.user} logoutHandler={logoutHandler} />
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
