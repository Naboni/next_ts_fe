import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

// antd
import { Tabs } from "antd";
const { TabPane } = Tabs;

// components
import CenterContent from "../../components/CenterContent";
import CenterLoading from "../../components/CenterLoading";

import Header from "../../components/directory/myActivity/campaignDetail/Header";
import MainBody from "../../components/directory/myActivity/campaignDetail/MainBody";
import Creators from "../../components/directory/myActivity/campaignDetail/Creators";
import Progress from "../../components/directory/myActivity/campaignDetail/Progress";
import CampaignVideoList from "../../components/directory/myActivity/CampaignVideoList";
import Calendar from "../../components/directory/myActivity/campaignDetail/Calendar";
import Reporting from "../../components/directory/myActivity/campaignDetail/Reporting";
import Payments from "../../components/directory/myActivity/campaignDetail/Payments";

// styles
import classes from "../../styles/campaignDetail.module.css";

// relative
import { getCampaignById } from "../../backend-utils/campaign-util";

export default function CampaignDetails() {
  const router = useRouter();
  let campaignId = router.query?.cid as string;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (campaignId) {
      getCampaignById(campaignId)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((e) => console.log(e));
    }
  }, [campaignId]);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  function callback(key: any) {
    // console.log(key);
  }

  if (isLoading) {
    return <CenterLoading width="100%" height="50vh" bg="transparent" />;
  }

  // const datsa = {
  //   brandIndustry: "jack"
  //   brandName: "Barclays"
  //   brandWebsite: "www.barcelona.com"

  //   campaignDuration: (2) ['2021-11-11', '2021-12-23']
  //   campaignGoal: "lucy"
  //   campaignName: "Promote Barcelona's new T-Shirt"
  //   campaignPrice: "10000"
  //   campaignPriceType: "birr"
  //   createdAt: "2021-11-03T11:53:25.546Z"
  //   creators: []

  //   contactName: "Yonatan Merkebu"
  //   email: "se.yonatan.merkebu@gmail.com"
  //   id: "22cf24a5-57fb-400d-9e41-d3d0fe28f626"
  //   message: "We are delighted to announce that we brought a whole new design to our team's T-Shit. Come and shop from out store at shop.barcelona.com"
  //   negotiationType: "2"
  //   otherSocialMedia: [{…}]
  //   phone: "967657294"
  //   productName: "New  T-Shirt"
  //   totalComments: 0
  //   averageEngagementRate: 0
  //   totalLikes: 0
  //   totalShares: 0
  //   totalViews: 0
  //   updatedAt: "2021-11-03T11:53:25.546Z"
  //   userId: "1989008e-24e5-4ac4-b9f4-b9d014425dcd"
  //   videos: []

  // };

  return (
    <div className="marginTop">
      <CenterContent>
        <>
          <Header campaignName={data.campaignName} />
          <header className={classes.header}>
            <MainBody
              campaignId={data.id}
              campaignTitle={data.campaignName}
              creationTime={data.createdAt}
              status={data.status}
            />

            <br />
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Creators" key="1">
                <Creators creators={data.creators} />
              </TabPane>

              <TabPane tab="Progress" key="2">
                <Progress />
              </TabPane>

              <TabPane tab="Videos" key="3">
                <CampaignVideoList />
              </TabPane>

              <TabPane tab="Calendar" key="4">
                <Calendar />
              </TabPane>

              <TabPane tab="Reporting" key="5">
                <Reporting
                  numberOfCreators={data.creators}
                  numberOfVideos={data.videos}
                  averageEngagementRate={data.averageEngagementRate}
                  totalComments={data.totalComments}
                  totalLikes={data.totalLikes}
                  totalShares={data.totalShares}
                  totalViews={data.totalViews}
                />
              </TabPane>

              <TabPane tab="Payments" key="6">
                <Payments />
              </TabPane>
            </Tabs>
          </header>
        </>
      </CenterContent>
    </div>
  );
}
