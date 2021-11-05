import React from "react";
import { useSession } from "next-auth/client";
// components
import ClaimProfile from "../../../components/directory/activity/ClaimProfile";
// styles
import classes from "./dashboard.module.css";
import { Pv } from "../../../constants/roles";

export default function Dashboard() {
  const [session, loading] = useSession();
  const user = session?.user as any;
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.headerName}>
          <h3>Hi, {user.username}</h3>
        </div>
      </header>
      {(user?.profileVerification === Pv.INITIAL ||
        user?.profileVerification === Pv.PENDING) && (
        <header className={classes.header} style={{ marginTop: "20px" }}>
          <ClaimProfile />
        </header>
      )}
    </div>
  );
}
