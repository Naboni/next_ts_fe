import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import useSWR from "swr";
import { Helmet } from "react-helmet";
// relative
import { getCreator } from "../../backend-utils/user-utils";
// widgets
import CreatorCardFull from "../../components/directory/creatorSearch/CreatorCardFull";
import CenterContent from "../../components/CenterContent";
import { Empty } from "antd";
import CenterLoading from "../../components/CenterLoading";
// styles
import classes from "../../styles/creatorDetail.module.css";

// antd
import { Row, Col, Divider } from "antd";

const CreatorDetail: NextPage = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    `/users/influencer/${router.query.cid}`,
    getCreator
  );

  const isLoading = !data && !error;
  Helmet;
  // ! trigger error boundary
  if (error) {
    return <>ERRORRORORORORORORRORRRR</>;
  }

  return (
    <div className="marginTop">
      <CenterContent>
        {isLoading ? (
          <CenterLoading width={"100%"} height={"90vh"} bg={undefined} />
        ) : (
          <Row>
            <Col span={7}>
              <CreatorCardFull item={data} />
            </Col>
            <Col span={16}>
              {/* Nav header */}
              <div className={classes.headerNav}>
                <nav></nav>
              </div>
              {/* core metrics */}
              <div className={classes.coreMetrics}>
                <div className={classes.coreMetricsHeader}>
                  <h3>Core Metrics</h3>
                  <p>Average performance of the recent 3 videos</p>
                </div>
                <div className={classes.metricsRow}>
                  <Metric label={"Average Views"} icon={""} value={""} />
                  <Metric label={"Likes"} icon={""} value={""} />
                  <Metric label={"Comments"} icon={""} value={""} />
                  <Metric label={"Shares"} icon={""} value={""} />
                  <Divider style={{ height: "60px" }} type="vertical" />
                  <Metric label={"Engagement Rate"} icon={""} value={""} />
                </div>
              </div>
              {/* sample video */}
              <div className={classes.sampleVideo}>
                <div className={classes.coreMetricsHeader}>
                  <h3>Sample Videos</h3>
                </div>
                <div className={classes.sampleVideoBody}>
                  <Empty />
                  <blockquote
                    className="tiktok-embed"
                    cite="https://www.tiktok.com/@mingweirocks/video/7004490297895931137"
                    data-video-id="7004490297895931137"
                    style={{ maxWidth: "325px" , maxHeight: "500px"}}
                  >
                    {" "}
                    <section>
                      {" "}
                      <a
                        target="_blank"
                        title="@mingweirocks"
                        href="https://www.tiktok.com/@mingweirocks"
                      >
                        @mingweirocks
                      </a>{" "}
                      <p>
                        My dad TRIED to trick me, and… 😩{" "}
                        <a
                          title="funny"
                          target="_blank"
                          href="https://www.tiktok.com/tag/funny"
                        >
                          #funny
                        </a>{" "}
                        <a
                          title="comedy"
                          target="_blank"
                          href="https://www.tiktok.com/tag/comedy"
                        >
                          #comedy
                        </a>{" "}
                        <a
                          title="fyp"
                          target="_blank"
                          href="https://www.tiktok.com/tag/fyp"
                        >
                          #fyp
                        </a>{" "}
                        <a
                          title="foryou"
                          target="_blank"
                          href="https://www.tiktok.com/tag/foryou"
                        >
                          #foryou
                        </a>{" "}
                        <a
                          title="viral"
                          target="_blank"
                          href="https://www.tiktok.com/tag/viral"
                        >
                          #viral
                        </a>
                      </p>{" "}
                      <a
                        target="_blank"
                        title="♬ original sound  - MING 🦁"
                        href="https://www.tiktok.com/music/original-sound-MING-🦁-7004490248835173122"
                      >
                        ♬ original sound - MING 🦁
                      </a>{" "}
                    </section>{" "}
                  </blockquote>{" "}
                  <Helmet>
                    <script
                      async
                      src="https://www.tiktok.com/embed.js"
                    ></script>
                  </Helmet>
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
        )}
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
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className={classes.metric}>
      <h2>♥</h2>
      <h1>0</h1>
      <p>{label}</p>
    </div>
  );
}
