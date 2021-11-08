import React from "react";

// components
import CenterContent from "../../components/CenterContent";
import SetUpProfile from "../../views/admin/SetUpProfile";
// antd
import { Table, Empty, Button, Space, Popconfirm, notification } from "antd";

export default function SetupProfile() {
  return (
    <div className="marginTop">
      <CenterContent>
        <SetUpProfile />
      </CenterContent>
    </div>
  );
}
