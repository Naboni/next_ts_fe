import { format, formatDistance, parseISO } from "date-fns";
import Link from "next/link";

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

    key: "tiktokHandle",
    width: 150,
    render: (record: any) => (
      <span
        style={{
          borderRadius: "1px",
          padding: "2px 10px 5px",
          backgroundColor: "#ececec",
        }}
      >
        @{record?.tiktokHandle}
      </span>
    ),
  },
  { title: "Paste Code", dataIndex: "pasteCode", key: "pasteCode" },
  { title: "User ID", dataIndex: "userId", key: "userId" },
  {
    title: "Created At",
    key: "createdAt",
    render: (record: any) => (
      <div>
        {format(parseISO(record?.createdAt as string), "PPpp")}{" "}
        <span
          style={{
            borderRadius: "1px",
            padding: "2px 10px",
            backgroundColor: "#ececec",
          }}
        >
          {formatDistance(parseISO(record?.createdAt as string), new Date(), {
            addSuffix: true,
          })}
        </span>
      </div>
    ),
  },
];

interface User {
  id: string;
  username: string;
  profileVerification: string;
  createdAt: string;
  claims: any;
}

export const setUpProfileColumn = [
  {
    title: "Username",
    key: "username",
    dataIndex: "username",
  },

  {
    title: "TikTok handle",
    key: "tiktokHandle",
    width: 150,
    render: (record: User) => (
      <span
        style={{
          borderRadius: "1px",
          padding: "2px 10px 5px",
          backgroundColor: "#ececec",
        }}
      >
        @{record.claims[0].tiktokHandle}
      </span>
    ),
  },
  {
    title: "Profile Verification",
    key: "profileVerification",
    dataIndex: "profileVerification",
  },
  {
    title: "Created At",
    key: "createdAt",
    render: (record: User) => (
      <div>
        {format(parseISO(record.createdAt), "PPpp")}{" "}
        <span
          style={{
            borderRadius: "1px",
            padding: "2px 10px",
            backgroundColor: "#ececec",
            marginLeft: "15px",
          }}
        >
          {formatDistance(parseISO(record?.createdAt as string), new Date(), {
            addSuffix: true,
          })}
        </span>
      </div>
    ),
  },
  {
    title: "",
    key: "id",
    width: "150px",
    render: (record: User) => (
      <div
        style={{
          borderRadius: "1px",
          padding: "2px 10px",
          backgroundColor: "#ececec",
          marginLeft: "15px",
        }}
      >
        <Link href={`/admin/setup-profile/${record.id}`}>Setup Profile</Link>
      </div>
    ),
  },
];
