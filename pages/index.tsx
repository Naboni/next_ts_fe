import React from "react";

import type { NextPage } from "next";
// components
import CenterContent from "../components/CenterContent";
// styles
import classes from "../styles/index.module.css";

// antd
import { Form, Input, Button, Checkbox, Col, Space } from "antd";
const Home: NextPage = () => {
  return (
    <div style={{ marginTop: "10%" }}>
      <CenterContent>
        <p>HOME?</p>
      </CenterContent>
    </div>
  );
};

export default Home;
