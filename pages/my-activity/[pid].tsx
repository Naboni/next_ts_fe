import { useRouter } from "next/router";

// components
import CenterContent from "../../components/CenterContent";
import SideMenu from "../../components/sideMenu/SideMenu";

// views
import Dashboard from "../../views/directory/myActivity/Dashboard";
import CampaignReport from "../../views/directory/myActivity/CampaignReport";

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
            {router.query["pid"] === "campaign-report" && <CampaignReport />}
          </Col>
        </Row>
      </CenterContent>
    </div>
  );
}

MyActivity.auth = true;
