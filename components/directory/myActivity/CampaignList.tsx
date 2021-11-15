import React, { useState, useEffect } from "react";

// components
import CampaignItem from "./CampaignItem";

// antd
import { List } from "antd";

// styles
import classes from "./campaignList.module.css";

// relative
import { getAllCampaigns } from "backend-utils/campaign-util";

// components
import CenterLoading from "../../CenterLoading";

export default function CampaignList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    getAllCampaigns()
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setData([]);
        }
        setData(data.result);
      });
  }, []);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return <CenterLoading width="100%" height="50vh" bg="transparent" />;
  }

  return (
    <div className={classes.container}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          //   onChange: (page) => {},
          pageSize: 5,
        }}
        dataSource={data}
        renderItem={(item) => <CampaignItem data={item} />}
      />
    </div>
  );
}
