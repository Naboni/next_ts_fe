import React from "react";
import { BsPlay } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { TiArrowForwardOutline } from "react-icons/ti";
import { FiRefreshCw } from "react-icons/fi";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";

// styles
import classes from "../../../../styles/campaignDetail.module.css";

// antd
import { Tabs, Space, Divider } from "antd";
interface Body {
  totalViews: string;
  totalLikes: string;
  totalComments: string;
  totalShares: string;
  averageEngagementRate: string;
  numberOfCreators: string[];
  numberOfVideos: string[];
}

export default function Reporting({
  totalViews,
  totalLikes,
  totalComments,
  totalShares,
  averageEngagementRate,
  numberOfCreators,
  numberOfVideos,
}: Body) {
  return (
    <div>
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
              <h1 className={classes.metricHeaderNumber}>{totalViews}</h1>
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
              <h1 className={classes.metricHeaderNumber}>{totalLikes}</h1>
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
              <h1 className={classes.metricHeaderNumber}>{totalComments}</h1>
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
              <h1 className={classes.metricHeaderNumber}>{totalShares}</h1>
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
                {averageEngagementRate} %
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
                {numberOfVideos.length}
              </h1>
              <h2 className={classes.metricHeaderTitle}>Number of videos</h2>
            </Space>
          </Space>
          <Space className={classes.metricsItem} size="middle">
            <BsPersonCheck
              style={{ height: "25px", width: "25px", color: "#9b9ba5" }}
            />
            <Space direction="vertical" size="small">
              <h1 className={classes.metricHeaderNumber}>
                {numberOfCreators.length}
              </h1>
              <h2 className={classes.metricHeaderTitle}>Number of creators</h2>
            </Space>
          </Space>
        </div>
      </div>{" "}
    </div>
  );
}
