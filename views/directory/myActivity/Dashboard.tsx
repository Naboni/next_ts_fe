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
          <h3>Hi, {user.username}</h3>
        </div>
      </header>
    </div>
  );
}
