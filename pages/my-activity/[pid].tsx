import React from "react";
import { useRouter } from "next/router";

// widgets
import CenterContent from "../../components/CenterContent";
import SideMenu from "../../components/sideMenu/SideMenu";

// views
import Dashboard from "../../views/directory/myActivity/Dashboard";

// antd
import { Col, Row } from "antd";
export default function MyActivity() {
  const router = useRouter();
  const routes = [
    { path: "/my-activity/dashboard", name: "Dashboard", query: "dashboard" },
    {
      path: "/my-activity/campaign-management",
      name: "Campaign Management",
      query: "campaign-management",
    },
    {
      path: "/my-activity/campaign-report",
      name: "Campaign Reporting",
      query: "campaign-report",
    },
  ];
  return (
    <div className="marginTop">
      <CenterContent>
        <Row gutter={20}>
          <Col span={5}>
            <SideMenu routes={routes} />
          </Col>
          <Col span={18}>
            {router.query["pid"] === "dashboard" && <Dashboard />}
          </Col>
        </Row>
      </CenterContent>
    </div>
  );
}
