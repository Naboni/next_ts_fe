import React from "react";

// styles
import classes from "../../../../styles/campaignDetail.module.css";

// components
import CampaignItem from "../CampaignItem";

// antd
import { Empty, List } from "antd";

interface Body {
  creators: string[];
}

export default function Creators({ creators }: Body) {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        //   onChange: (page) => {},
        pageSize: 5,
      }}
      dataSource={creators}
      // ! change this with z appropriate component
      renderItem={(item) => <CampaignItem data={item} />}
    />
  );
}
