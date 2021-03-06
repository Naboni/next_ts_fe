import React from "react";

import { useRouter } from "next/router";

// relative
import { Roles } from "../../constants/roles";

// antd
import { Avatar, Button, Dropdown, message, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function ProfileDropDown({ user, logoutHandler }: any) {
  const router = useRouter();

  function handleMenuClick(e: any) {
    if (e.key == 1) {
      router.push("/settings/manage-account");
    }
    if (e.key == 5) {
      logoutHandler();
    }
  }


  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Settings</Menu.Item>
      <Menu.Item key="5">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={["hover"]} placement="bottomRight">
        <Button style={{ height: "100%" }} type="text">
          {/* <Avatar size={35} icon={<UserOutlined />} />{" "} */}
          <img
            height="35"
            width="35"
            src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
            alt=""
          />
          <span style={{ margin: "0 5px", padding: 0, fontWeight: 500 }}>
            {user.username}
          </span>
        </Button>
      </Dropdown>
    </div>
  );
}
