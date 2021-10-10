import React from "react";

import { useRouter } from "next/router";

import { BsInfoCircle } from "react-icons/bs";
import { BsPlay } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { TiArrowForwardOutline } from "react-icons/ti";
import { FiRefreshCw } from "react-icons/fi";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";

// antd
import { Tabs, Space, Divider } from "antd";
const { TabPane } = Tabs;

// components
import CenterContent from "../../components/CenterContent";
import CampaignVideoList from "../../components/directory/myActivity/CampaignVideoList";
// styles
import classes from "../../styles/campaignDetail.module.css";
export default function CampaignDetails() {
  const data = {
    campaignId: 10,
    creationTime: "9/21/2021",
    campaignTitle: "Account Executive",
    totalViews: 841,
    totalLikes: 828,
    totalComments: 800,
    totalShares: 104,
    averageEngagementRate: 51.73,
    numberOfVideos: 2,
    numberOfCreators: 7,
  };
  // ! query for search
  //   const router = useRouter();
  //   console.log(router.query);

  function callback(key: any) {
    // console.log(key);
  }
  return (
    <div className="marginTop">
      <CenterContent>
        <header className={classes.header}>
          <div className={classes.headerName}>
            <h3>Campaign Reporting</h3>
            <h6>
              Updated as of {data.creationTime}. {<BsInfoCircle />}Data is
              updated daily
            </h6>
          </div>
          <div className={classes.headerBottom}>
            <h5>Campaign title: {data.campaignTitle}</h5>
            <h5>Campaign ID: {data.campaignId}</h5>
            <h5>Creation time: {data.creationTime}</h5>
          </div>
          <div className={classes.metricsRow}>
            <div className={classes.metricsColumnLeft}>
              <Space size="middle">
                <BsPlay
                  style={{ height: "35px", width: "35px", color: "#23dada" }}
                />
                <Space
                  direction="vertical"
                  size="small"
                  className={classes.metricsItem}
                >
                  <h1 className={classes.metricHeaderNumber}>
                    {data.totalViews}
                  </h1>
                  <h2 className={classes.metricHeaderTitle}>Total views</h2>
                </Space>
              </Space>
              <Space size="middle">
                <FiHeart
                  style={{ height: "25px", width: "25px", color: "#ff4b4b" }}
                />
                <Space
                  direction="vertical"
                  size="small"
                  className={classes.metricsItem}
                >
                  <h1 className={classes.metricHeaderNumber}>
                    {data.totalLikes}
                  </h1>
                  <h2 className={classes.metricHeaderTitle}>Likes</h2>
                </Space>
              </Space>
              <Space size="middle">
                <FaRegCommentDots
                  style={{ height: "25px", width: "25px", color: "#6161ee" }}
                />
                <Space
                  direction="vertical"
                  size="small"
                  className={classes.metricsItem}
                >
                  <h1 className={classes.metricHeaderNumber}>
                    {data.totalComments}
                  </h1>
                  <h2 className={classes.metricHeaderTitle}>Comment</h2>
                </Space>
              </Space>
              <Space size="middle">
                <TiArrowForwardOutline
                  style={{ height: "30px", width: "30px", color: "#f9c646" }}
                />
                <Space
                  direction="vertical"
                  size="small"
                  className={classes.metricsItem}
                >
                  <h1 className={classes.metricHeaderNumber}>
                    {data.totalShares}
                  </h1>
                  <h2 className={classes.metricHeaderTitle}>Share</h2>
                </Space>
              </Space>
              <Space size="middle">
                <FiRefreshCw
                  style={{ height: "25px", width: "25px", color: "#6161ee" }}
                />
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
              </Space>
            </div>
            <Divider type="vertical" style={{ height: "70px" }} />
            <div className={classes.metricsColumnRight}>
              <Space className={classes.metricsItem} size="middle">
                <AiOutlineVideoCamera
                  style={{ height: "25px", width: "25px", color: "#9b9ba5" }}
                />
                <Space direction="vertical" size="small">
                  <h1 className={classes.metricHeaderNumber}>
                    {data.numberOfVideos}
                  </h1>
                  <h2 className={classes.metricHeaderTitle}>
                    Number of videos
                  </h2>
                </Space>
              </Space>
              <Space className={classes.metricsItem} size="middle">
                <BsPersonCheck
                  style={{ height: "25px", width: "25px", color: "#9b9ba5" }}
                />
                <Space direction="vertical" size="small">
                  <h1 className={classes.metricHeaderNumber}>
                    {data.numberOfCreators}
                  </h1>
                  <h2 className={classes.metricHeaderTitle}>
                    Number of creators
                  </h2>
                </Space>
              </Space>
            </div>
          </div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Videos" key="1">
              <CampaignVideoList />
            </TabPane>
            <TabPane tab="Creators" key="2">
              ctors
            </TabPane>
          </Tabs>
        </header>
      </CenterContent>
    </div>
  );
}
