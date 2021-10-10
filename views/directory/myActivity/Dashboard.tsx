import React from "react";

import VerifyEmail from "../../../components/verify/VerifyEmail";
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
      <VerifyEmail colored={true} padded={true} />
    </div>
  );
}
