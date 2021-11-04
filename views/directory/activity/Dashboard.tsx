import React from "react";

// components
import ClaimProfile from "../../../components/directory/activity/ClaimProfile";
// styles
import classes from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.headerName}>
          <h3>Hi, First Name</h3>
        </div>
      </header>

      <header className={classes.header} style={{marginTop: '20px'}}>
        <ClaimProfile />
      </header>
    </div>
  );
}
