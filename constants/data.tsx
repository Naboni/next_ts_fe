// antd
import { Avatar, Image, Space, Tag, Button } from "antd";
// styles
import classes from "./column.module.css";
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
}
export const column = [
  {
    title: "Video",
    key: "videoUrl",
    width: 60,
    fixed: true,
    sticky: "left",

    render: (record: Record) => {
      return (
        <img
          className={classes.embedded}
          src={record.videoUrl}
          height="100px"
          width="100px"
        />
      );
    },
  },
  {
    title: "Published date",
    key: "creationTime",
    width: 100,
    fixed: true,
    sticky: "left",

    render: (record: Record) => {
      return (
        <div className={classes.meta}>
          <div className={classes.author}>
            <img className={classes.avatar} src={record.videoUrl} />
            <h1>{record.author}</h1>
          </div>
          <p>{record.creationTime}</p>
        </div>
      );
    },
  },

  {
    title: "Total views",
    width: 60,
    dataIndex: "totalViews",
    key: "totalViews",
  },
  {
    title: "Likes",
    width: 60,
    dataIndex: "totalLikes",
    key: "totalLikes",
  },
  {
    title: "Comments",
    width: 60,
    dataIndex: "totalComments",
    key: "totalComments",
  },
  {
    title: "Average engagement rate",
    width: 100,
    key: "averageEngagementRate",
    render: (record: Record) => `${record.averageEngagementRate}%`,
  },
  {
    title: "Top gender",
    width: 60,
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Top age range",
    width: 60,
    dataIndex: "ageRange",
    key: "ageRange",
  },
];

export const adminClaimProfileColumn = [
  {
    title: "TikTok Handle",
    dataIndex: "tiktokHandle",
    key: "tiktokHandle",
    width: 150,
  },
  { title: "Paste Code", dataIndex: "pasteCode", key: "pasteCode" },
  { title: "User ID", dataIndex: "userId", key: "userId" },
  { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
];
