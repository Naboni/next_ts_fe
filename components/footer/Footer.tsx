import React from "react";
// components
import CenterContent from "../CenterContent";
// styles
import classes from "./footer.module.css";
export default function Footer() {
  return (
    <CenterContent>
      <footer className={classes.footer}>
        <div></div>
        <h1 className={classes.logo}>DIGITAL</h1>
      </footer>
    </CenterContent>
  );
}
