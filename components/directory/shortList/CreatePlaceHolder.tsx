import React from "react";

// styles
import classes from "./createPlaceHolder.module.css";

// antd
import { Button, Divider, Row, Col } from "antd";

export default function CreatePlaceHolder() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h4>{`Shortlist ${0}`}</h4>
        <Button
          type="primary"
          style={{ backgroundColor: "#eceef5", color: "black", border: "none" }}
        >
          + Create a new list
        </Button>
      </div>

      <Divider />

      <Row>
        <Col span={7} className={classes.left}>
          <div className={classes.leftContainer}>
            <h1>Use lists to track creators.</h1>
            <p>
              You can create list and enter notes for each creator. Use list to
              track potential collaborators with greater ease and efficiency.
            </p>
            <Button type="primary" danger style={{width: '150px'}}>
              Create a new list
            </Button>
          </div>
        </Col>
        <Col span={16}>
          <div className={classes.right}></div>
        </Col>
      </Row>
    </div>
  );
}
