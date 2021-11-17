import React from "react";
import { useRouter } from "next/router";
// antd
import { Divider, Space } from "antd";
// styles
import classes from "./campaignItem.module.css";
interface IProps {
  data: {
    id: number;
    campaignName: string;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    averageEngagementRate: number;
    videos: String[];
    creators: String[];
    createdAt: string;
  };
}
export default function CampaignItem({ data }: any) {
  const router = useRouter();
  return (
    <div
      className={classes.container}
      onClick={() => router.push(`/campaign/${data.id}`)}
    >
      <div className={classes.boxHeader}>
        <h4>{data.campaignName}</h4>
        <div className={classes.boxHeaderRightContent}>
          <h3>{`Campaign ID: ${data.id}`}</h3>
          <h3>{`${data.createdAt}`}</h3>
        </div>
      </div>
      <Divider style={{ marginTop: "5px", marginBottom: "10px" }} />
      <div className={classes.metricsRow}>
        <div className={classes.metricsColumnLeft}>
          <Space
            direction="vertical"
            size="small"
            className={classes.metricsItem}
          >
            <h1 className={classes.metricHeaderNumber}>{data.totalViews}</h1>
            <h2 className={classes.metricHeaderTitle}>Total views</h2>
          </Space>
          <Space
            direction="vertical"
            size="small"
            className={classes.metricsItem}
          >
            <h1 className={classes.metricHeaderNumber}>{data.totalLikes}</h1>
            <h2 className={classes.metricHeaderTitle}>Likes</h2>
          </Space>
          <Space
            direction="vertical"
            size="small"
            className={classes.metricsItem}
          >
            <h1 className={classes.metricHeaderNumber}>{data.totalComments}</h1>
            <h2 className={classes.metricHeaderTitle}>Comment</h2>
          </Space>
          <Space
            direction="vertical"
            size="small"
            className={classes.metricsItem}
          >
            <h1 className={classes.metricHeaderNumber}>{data.totalShares}</h1>
            <h2 className={classes.metricHeaderTitle}>Share</h2>
          </Space>
          <Space
            direction="vertical"
            size="small"
            className={classes.metricsItem}
          >
            <h1 className={classes.metricHeaderNumber}>
              {data.averageEngagementRate} %
            </h1>
            <h2 className={classes.metricHeaderTitle}>
              Average engagement rate
            </h2>
          </Space>
        </div>
        <div className={classes.metricsColumnRight}>
          <Space>
            <Space
              direction="vertical"
              size="small"
              className={classes.metricsItem}
            >
              <h1 className={classes.metricHeaderNumber}>
                {data.videos.length}
              </h1>
              <h2 className={classes.metricHeaderTitle}>Number of videos</h2>
            </Space>
          </Space>
          <Space>
            <Space
              direction="vertical"
              size="small"
              className={classes.metricsItem}
            >
              <h1 className={classes.metricHeaderNumber}>{0}</h1>
              <h2 className={classes.metricHeaderTitle}>Number of creators</h2>
            </Space>
          </Space>
        </div>
      </div>
    </div>
  );
}
