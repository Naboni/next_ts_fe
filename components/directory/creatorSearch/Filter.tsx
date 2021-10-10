import React, { useState } from "react";

import { SearchOutlined } from "@ant-design/icons";

// styles
import classes from "./filter.module.css";
// antd
import { Input, Dropdown, Menu, Space, Button } from "antd";
const { Search } = Input;

const prefix = (
  <SearchOutlined
    style={{
      color: "grey",
    }}
  />
);

export default function Filter() {
  function handleFollowerMenuClick(e: any) {
    if (e.key == 5) {
    }
  }
  function handleAvgViewMenuClick(e: any) {
    if (e.key == 5) {
    }
  }
  //   filter hover menu
  const followers = (
    <div className={classes.filterDropdown}>
      <Menu
        onClick={handleFollowerMenuClick}
        style={{ display: "flex", border: "none" }}
      >
        <Menu.Item key="0">
          <Button type="text">All</Button>
        </Menu.Item>
        <Menu.Item key="1">
          <Button type="text">0 - 10K</Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button type="text">10K - 50K</Button>
        </Menu.Item>
      </Menu>
    </div>
  );
  const avgView = (
    <div className={classes.filterDropdown}>
      <Menu
        onClick={handleAvgViewMenuClick}
        style={{ display: "flex", border: "none" }}
      >
        {/* <Space direction="horizontal" size="small"> */}
        <Menu.Item key="0">
          <Button type="text">All</Button>
        </Menu.Item>
        <Menu.Item key="1">
          <Button type="text">0 - 10K</Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button type="text">10K - 50K</Button>
        </Menu.Item>
        {/* </Space> */}
      </Menu>
    </div>
  );
  return (
    <div className={classes.container}>
      <div style={{ width: "500px" }}>
        <Search
          prefix={prefix}
          placeholder="Search by Name, Topic..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={() => {}}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Space direction="horizontal" size="small">
          {/* Followers Filter */}
          <Dropdown overlay={followers} trigger={["click"]}>
            <Button style={{ height: "100%" }} type="ghost">
              Followers
            </Button>
          </Dropdown>
          {/* AvgView Filter */}
          <Dropdown overlay={avgView} trigger={["click"]}>
            <Button style={{ height: "100%" }} type="ghost">
              Average View
            </Button>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
}
