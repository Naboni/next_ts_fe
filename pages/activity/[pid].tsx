// types
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

// relative
import { Roles } from "../../constants/roles";

// components
import CenterContent from "../../components/CenterContent";
import SideMenu from "../../components/sideMenu/SideMenu";

// views
import Dashboard from "../../views/directory/activity/Dashboard";
import CampaignReport from "../../views/directory/myActivity/CampaignReport";

// antd
import { Col, Row } from "antd";

export default function Activity() {
  const router = useRouter();
  const routes = [
    { path: "/activity/dashboard", name: "Dashboard", query: "dashboard" },
    {
      path: "/activity/campaign-management",
      name: "Campaign Management",
      query: "campaign-management",
    },
    {
      path: "/activity/invitation",
      name: "Invitation",
      query: "invitation",
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
            {router.query["pid"] === "invitation" && <Dashboard />}
            {router.query["pid"] === "campaign-management" && (
              <CampaignReport />
            )}
          </Col>
        </Row>
      </CenterContent>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session || session.user?.role !== Roles.CREATOR) {
    // ! redirecting back to home b/c if a logged in user redirected to signin, it will again redirect to home
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

Activity.auth = true;
