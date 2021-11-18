import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

// styles
import classes from "./invitations.module.css";
// relative
import { getInvitations } from "backend-utils/notification-util";
// components
import InvitationItem from "@/components/directory/activity/InvitationItem";
import CenterLoading from "@/components/CenterLoading";
// antd
import { List, Empty, Select, message } from "antd";
const { Option } = Select;

export default function Invitations() {
  const [session, _] = useSession();
  const user = session?.user as any;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    getInvitations()
      .then(async (res) => {
        if (res.ok) {
          var resp = await res.json();
          setData(resp.response);
        } else {
          message.error("Something went wrong!");
          setData([]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const invitationTypes = [
    "Accepted Invitations",
    "Pending Invitations",
    "Rejected Invitations",
  ];
  const [invitationType, setInvitationType] = useState(1);

  function handleChange(value: number) {
    setInvitationType(value);
  }

  if (loading) return <CenterLoading height="50vh" width="100%" bg="white" />;

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.headerContainer}>
          <h3>
            {invitationTypes[invitationType]}
            <span className={classes.count}>
              {getCount(invitationType, data!)}
            </span>
          </h3>

          <Select
            defaultValue={1}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value={0}>Accepted</Option>
            <Option value={1}>Pending</Option>
            <Option value={2}>Rejected</Option>
          </Select>
        </div>
      </header>

      <header className={classes.header} style={{ marginTop: "20px" }}>
        <List
          pagination={{
            pageSize: 5,
          }}
          dataSource={getInvitationData(invitationType, data!)}
          renderItem={(item: any) => (
            <List.Item>
              <InvitationItem
                companyName={item.brandName}
                campaignId={item.campaignId}
                createdAt={item.createdAt}
              />
            </List.Item>
          )}
        />
      </header>
    </div>
  );
}

function getCount(invitationType: number, data: any[]) {
  switch (invitationType) {
    case 0:
      return data.filter((e) => e.status === "ACCEPTED").length;
    case 1:
      return data.filter((e) => e.status === "PENDING").length;
    case 2:
      return data.filter((e) => e.status === "REJECTED").length;
    default:
      break;
  }
}

function getInvitationData(invitationType: number, data: any) {
  switch (invitationType) {
    case 0:
      return data.filter((e: any) => e.status === "ACCEPTED");
    case 1:
      return data.filter((e: any) => e.status === "PENDING");
    case 2:
      return data.filter((e: any) => e.status === "REJECTED");
    default:
      break;
  }
}
