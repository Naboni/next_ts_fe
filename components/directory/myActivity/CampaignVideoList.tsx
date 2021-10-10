import React from "react";

// antd
import { Table } from "antd";

// components
import { column } from "../../../constants/data";
export default function CampaignVideoList() {
  interface Record {
    key: string;
    videoId: string;
    creationTime: string;
    author: string;
    totalViews: number;
    videoUrl: string;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    averageEngagementRate: number;
    ageRange: string;
    gender: string;
  }
  const dataSource: Record[] = [
    {
      key: "1",
      videoId: "1",
      creationTime: "9/27/2021",
      author: "Yeabsira Fitsum 💕",
      videoUrl:
      "https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/4888abc44d494c2398cac5210b762686_1629829646?x-expires=1633921200&x-signature=HGrweOBN01kxjdUteKEJDolv0Y4%3D",
      totalViews: 699,
      totalLikes: 922,
      totalComments: 696,
      totalShares: 503,
      averageEngagementRate: 91.58,
      ageRange: '30-50',
      gender: 'male',
    },
    
    {
      key: "2",
      videoId: "10",
      creationTime: "9/21/2021",
      author: "Man yoni",
      totalViews: 841,
      videoUrl:
      "https://www.irishtimes.com/polopoly_fs/1.4026833.1569190266!/image/image.jpg_gen/derivatives/box_620_330/image.jpg",
      totalLikes: 828,
      totalComments: 800,
      totalShares: 104,
      averageEngagementRate: 51.73,
      ageRange: '30-5',
      gender: 'female'
    },
];

return (
    <Table
    dataSource={dataSource}
    columns={column}
      scroll={{ x: 1300}}
    />
  );
}
