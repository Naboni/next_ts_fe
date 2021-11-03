import React from "react";
// styles
import classes from "../../../../styles/campaignDetail.module.css";

// antd
import { Button } from "antd";

export default function Header({ campaignName }: { campaignName: string }) {
  return (
    <div className={classes.container}>
      <h3>Campaign Management /</h3>
      <h3 style={{ fontWeight: 400 }}>{campaignName}</h3>
      <div style={{ marginLeft: "auto" }}>
        <Button type="primary" ghost size="small">
          Tiktok UTM link
        </Button>
      </div>
    </div>
  );
}
