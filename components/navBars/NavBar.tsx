import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";

// styles
import classes from "./navBar.module.css";

// antd
import { Button } from "antd";

export default function NavBar() {
  const router = useRouter();

  const routes = [
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
      <nav className={classes.menu}>
        {routes.map((r, i) => (
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
      <div className={classes.toRight}>
        <Button type="primary" danger className={classes.createCampaign}>
          Create campaign
        </Button>
        {/* <RightMenu /> */}
      </div>
    </header>
  );
}
