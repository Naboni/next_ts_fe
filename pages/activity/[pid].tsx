// types
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/client";

// relative
import { Roles } from "@/constants/roles";

// components
import CenterContent from "@/components/CenterContent";
import SideMenu from "@/components/sideMenu/SideMenu";

// views
import Dashboard from "@/views/directory/activity/Dashboard";
import Invitations from "@/views/directory/activity/Invitations";
import CampaignReport from "@/views/directory/myActivity/CampaignReport";

// antd
import { Col, Row } from "antd";

export default function Activity() {
  const [session, _] = useSession();
  const user = session?.user as any;

  const router = useRouter();
  const routes = [
    {
      path: "/activity/dashboard",
      name: "Dashboard",
      query: "dashboard"
    },
    {
      path: "/activity/campaign-management",
      name: "Campaign Management",
      query: "campaign-management",
    },
    {
      path: "/activity/invitation",
      name: "Invitations",
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
            {router.query["pid"] === "invitation" && <Invitations />}
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
  if (!session || (session.user as any)?.role !== Roles.CREATOR) {
    // ! redirecting back to home b/c if a logged in user redirected to sign in, it will again redirect to home
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
