import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { BsPlay } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { TiArrowForwardOutline } from "react-icons/ti";
import { FiRefreshCw } from "react-icons/fi";

let abbreviate = require("number-abbreviate");

// relative
import { getCreatorById } from "backend-utils/creator-util";

// widgets
import CreatorCardFull from "@/components/directory/creatorSearch/CreatorCardFull";
import CenterContent from "@/components/CenterContent";
import CenterLoading from "@/components/CenterLoading";

// styles
import classes from "@/styles/creatorDetail.module.css";

// antd
import { Row, Col, Divider, Empty } from "antd";

const CreatorDetail = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (router.query.cid) {
      getCreatorById(router.query.cid as string)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) setData(data.response);
        });
    }
  }, [router.query.cid]);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return (
      <div className="marginTop">
        <CenterLoading width="100%" height="50vh" bg="transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="marginTop">
        <p>Error</p>
      </div>
    );
  }

  if (data == "No profile") {
    return (
      <div className="marginTop">
        <div style={{ marginTop: "15%" }}>
          <Empty
            children={
              <p>Your profile will be available after you get verified.</p>
            }
          />
        </div>
      </div>
    );
  }

  const d = data as any;

  return (
    <div className="marginTop">
      <CenterContent>
        {
          <Row>
            <Col span={7}>
              <CreatorCardFull item={d} />
            </Col>
            <Col span={16}>
              {/* Nav header */}
              {/* <div className={classes.headerNav}>
                <nav></nav>
              </div> */}
              {/* core metrics */}
              <div className={classes.coreMetrics}>
                <div className={classes.coreMetricsHeader}>
                  <h3>Core Metrics</h3>
                  <p>Average performance of the recent 5 videos</p>
                </div>
                <div className={classes.metricsRow}>
                  <Metric
                    label={"Average Views"}
                    icon={
                      <BsPlay
                        style={{
                          height: "35px",
                          width: "35px",
                          color: "#23dada",
                        }}
                      />
                    }
                    value={d.view}
                  />
                  <Metric
                    label={"Likes"}
                    icon={
                      <FiHeart
                        style={{
                          height: "25px",
                          width: "25px",
                          color: "#ff4b4b",
                        }}
                      />
                    }
                    value={d.like}
                  />
                  <Metric
                    label={"Comments"}
                    icon={
                      <FaRegCommentDots
                        style={{
                          height: "25px",
                          width: "25px",
                          color: "#6161ee",
                        }}
                      />
                    }
                    value={d.comment}
                  />
                  <Metric
                    label={"Shares"}
                    icon={
                      <TiArrowForwardOutline
                        style={{
                          height: "30px",
                          width: "30px",
                          color: "#f9c646",
                        }}
                      />
                    }
                    value={d.share}
                  />
                  <Divider style={{ height: "60px" }} type="vertical" />
                  <Metric
                    label={"Engagement Rate"}
                    icon={
                      <FiRefreshCw
                        style={{
                          height: "25px",
                          width: "25px",
                          color: "#6161ee",
                        }}
                      />
                    }
                    value={`${d.engagementRate}%`}
                  />
                </div>
              </div>
              {/* sample video */}
              <div className={classes.sampleVideo}>
                <div className={classes.coreMetricsHeader}>
                  <h3>Sample Videos</h3>
                </div>
                <div
                  className={`${
                    d.sampleVideos.length === 0 && classes.sampleVideoBody
                  }`}
                >
                  {d.sampleVideos.length === 0 ? (
                    <Empty />
                  ) : (
                    // ! build sample vid cards
                    <div className={classes.sampleContainer}>
                      {d.sampleVideos.map((el: any) => (
                        <SampleVideoCard el={el} key={el.title} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* performance Trend */}
              <div className={classes.sampleVideo}>
                <div className={classes.coreMetricsHeader}>
                  <h3>Performance Trend</h3>
                </div>
                <div className={classes.performanceTrendBody}>
                  <Empty />
                </div>
              </div>
            </Col>
          </Row>
        }
      </CenterContent>
    </div>
  );
};
export default CreatorDetail;

function Metric({
  icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <div className={classes.metric}>
      {icon}
      <h1>
        {!(label === "Engagement Rate")
          ? abbreviate(value, 1).toString()
          : value}
      </h1>
      <p>{label}</p>
    </div>
  );
}

function SampleVideoCard({ el }: { el: any }) {
  const title = el.title as string;
  const cleanTitle = title.split("#")[0];

  const html = el.html as string;
  const videoUrl = html.split("data-video-id")[1].split('"')[1];

  return (
    <a
      href={`${el.author_url + "/video/" + videoUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.linkWrapper}
    >
      <div className={classes.sampleWrapper}>
        <img src={el.thumbnail_url} />
        <div className={classes.textWrapper}>
          <p>{cleanTitle}</p>
        </div>
      </div>
    </a>
  );
}
