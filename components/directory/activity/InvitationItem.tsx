import React from "react";

import { useRouter } from "next/router";
import { format, formatDistance, parseISO } from "date-fns";

// styles
import classes from "./invitationItem.module.css";

interface IProps {
  companyName: string;
  campaignId: string;
  createdAt: string;
}

export default function InvitationItem(campaignInfo: IProps) {
  const router = useRouter();
  return (
    <div
      className={classes.container}
      onClick={() =>
        router.push(`/notification/invitation/${campaignInfo.campaignId}`)
      }
    >
      <h3>Invitation call by <span className={classes.companyName}>{campaignInfo.companyName}</span></h3>
      <div className={classes.bodyContainer}>
        <p>You have been invited to participate in a campaign.</p>
        <p>
          {format(parseISO(campaignInfo.createdAt), "PPpp")}{" "}
          <span className={classes.distance}>
            {formatDistance(parseISO(campaignInfo.createdAt), new Date(), {
              addSuffix: true,
            })}
          </span>
        </p>
      </div>
    </div>
  );
}
