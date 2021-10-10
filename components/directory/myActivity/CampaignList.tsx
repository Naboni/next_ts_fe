import React from "react";

// components
import CampaignItem from "./CampaignItem";

// antd
import { List, Space } from "antd";

// styles
import classes from "./campaignList.module.css";
export default function CampaignList() {
  const listData = [
    {
      campaignId: 1,
      creationTime: "9/27/2021",
      campaignTitle: "Professor",
      totalViews: 699,
      totalLikes: 922,
      totalComments: 696,
      totalShares: 503,
      averageEngagementRate: 91.58,
      numberOfVideos: 3,
      numberOfCreators: 9,
    },
    {
      campaignId: 2,
      creationTime: "3/20/2021",
      campaignTitle: "VP Sales",
      totalViews: 180,
      totalLikes: 230,
      totalComments: 299,
      totalShares: 343,
      averageEngagementRate: 54.18,
      numberOfVideos: 3,
      numberOfCreators: 2,
    },
    {
      campaignId: 3,
      creationTime: "8/10/2021",
      campaignTitle: "Assistant Media Planner",
      totalViews: 957,
      totalLikes: 537,
      totalComments: 422,
      totalShares: 627,
      averageEngagementRate: 70.86,
      numberOfVideos: 3,
      numberOfCreators: 9,
    },
    {
      campaignId: 4,
      creationTime: "6/5/2021",
      campaignTitle: "Dental Hygienist",
      totalViews: 805,
      totalLikes: 854,
      totalComments: 415,
      totalShares: 552,
      averageEngagementRate: 51.98,
      numberOfVideos: 3,
      numberOfCreators: 4,
    },
    {
      campaignId: 5,
      creationTime: "4/10/2021",
      campaignTitle: "Financial Analyst",
      totalViews: 932,
      totalLikes: 776,
      totalComments: 527,
      totalShares: 560,
      averageEngagementRate: 28.88,
      numberOfVideos: 1,
      numberOfCreators: 2,
    },
    {
      campaignId: 6,
      creationTime: "4/15/2021",
      campaignTitle: "VP Product Management",
      totalViews: 750,
      totalLikes: 283,
      totalComments: 702,
      totalShares: 921,
      averageEngagementRate: 79.48,
      numberOfVideos: 5,
      numberOfCreators: 4,
    },
    {
      campaignId: 7,
      creationTime: "1/22/2021",
      campaignTitle: "Business Systems Development Analyst",
      totalViews: 339,
      totalLikes: 292,
      totalComments: 760,
      totalShares: 394,
      averageEngagementRate: 34.16,
      numberOfVideos: 2,
      numberOfCreators: 8,
    },
    {
      campaignId: 8,
      creationTime: "7/20/2021",
      campaignTitle: "Help Desk Technician",
      totalViews: 934,
      totalLikes: 125,
      totalComments: 794,
      totalShares: 933,
      averageEngagementRate: 82.04,
      numberOfVideos: 3,
      numberOfCreators: 5,
    },
    {
      campaignId: 9,
      creationTime: "11/17/2020",
      campaignTitle: "Geological Engineer",
      totalViews: 887,
      totalLikes: 822,
      totalComments: 169,
      totalShares: 592,
      averageEngagementRate: 68.21,
      numberOfVideos: 2,
      numberOfCreators: 1,
    },
    {
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
    },
  ];
  return (
    <div className={classes.container}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
        //   onChange: (page) => {},
          pageSize: 5,
        }}
        dataSource={listData}
        renderItem={(item) => <CampaignItem data={item}/>}
      />
    </div>
  );
}
