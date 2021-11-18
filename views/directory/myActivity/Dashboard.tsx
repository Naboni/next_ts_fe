import React from "react";
import { useSession } from "next-auth/client";

// styles
import classes from "./dashboard.module.css";

export default function Dashboard() {
  const [session, _] = useSession();
  const user = session?.user as any;
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.headerName}>
          <img
            height="35"
            width="35"
            src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
            alt=""
          />
          <h3>Hi, {user.username}</h3>
        </div>
      </header>
    </div>
  );
}
