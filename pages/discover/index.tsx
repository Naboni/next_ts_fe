import React from "react";
import { useRouter } from "next/router";
// components
import CenterContent from "../../components/CenterContent";
// styles
import classes from "../../styles/discover.module.css";

// antd
import { Col, Row, Collapse } from "antd";
const { Panel } = Collapse;

export default function index() {
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
  const router = useRouter();
  return (
    <div className="marginTop" style={{backgroundColor: "#fff"}}>
      <CenterContent>
        <Row gutter={20}>
          <Col span={5}>
            <Collapse accordion ghost expandIconPosition="right">
              <Panel header="This is panel header 1" key="1" style={{fontWeight:600, fontSize:'16px'}}>
                <p>{'text'}</p>
              </Panel>
              <Panel header="This is panel header 2" key="2" style={{fontWeight:600, fontSize:'16px'}}>
                <p>{'text'}</p>
              </Panel>
              <Panel header="This is panel header 3" key="3" style={{fontWeight:600, fontSize:'16px'}}>
                <p>{'text'}</p>
              </Panel>
            </Collapse>
          </Col>
          <Col span={18}>
            {router.query["pid"] === "dashboard" && "<Dashboard />"}
            {router.query["pid"] === "campaign-report" && "<CampaignReport />"}
          </Col>
        </Row>
      </CenterContent>
    </div>
  );
}
