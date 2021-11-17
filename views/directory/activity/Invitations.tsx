import React, { useState } from "react";
import { useSession } from "next-auth/client";

// styles
import classes from "./invitations.module.css";

// components
import InvitationItem from "@/components/directory/activity/InvitationItem";
// antd
import { List, Empty, Select } from "antd";
const { Option } = Select;

export default function Invitations() {
  const [session, _] = useSession();
  const user = session?.user as any;

  const invitationTypes = [
    "Accepted Invitations",
    "Pending Invitations",
    "Rejected Invitations",
  ];
  const [invitationType, setInvitationType] = useState(1);

  function handleChange(value: number) {
    setInvitationType(value);
  }

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.headerContainer}>
          <h3>
            {invitationTypes[invitationType]}
            <span className={classes.count}>
              {getCount(invitationType, user)}
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
        {user.pendingInvitations.length > 0 ? (
          <List
            pagination={{
              pageSize: 5,
            }}
            dataSource={getInvitationData(invitationType, user)}
            renderItem={(item: any) => (
              <List.Item>
                <InvitationItem
                  companyName={item.companyName}
                  campaignId={item.campaignId}
                  createdAt={item.createdAt}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty
            description="Invitations will appear here when you get invited to a campaign."
            style={{
              color: "grey",
              height: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
      </header>
    </div>
  );
}

function getCount(invitationType: number, user: any) {
  switch (invitationType) {
    case 0:
      return user.acceptedInvitations.length;
    case 1:
      return user.pendingInvitations.length;
    case 2:
      return user.rejectedInvitations.length;
    default:
      break;
  }
}

function getInvitationData(invitationType: number, user: any) {
  switch (invitationType) {
    case 0:
      return user.acceptedInvitations;
    case 1:
      return user.pendingInvitations;
    case 2:
      return user.rejectedInvitations;
    default:
      break;
  }
}
