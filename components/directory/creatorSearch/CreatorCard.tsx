import React from "react";

import { useRouter } from "next/router";

import { BiMailSend } from "react-icons/bi";
import { BsBookmarkPlus } from "react-icons/bs";

// styles
import classes from "./creatorCard.module.css";

// antd
import { Button } from "antd";

let abbreviate = require("number-abbreviate");

interface IProps {
  item: {
    bio: string;
    followers: string;
    handle: string;
    name: string;
    trend: string[];
    userId: string;
    view: string;
  };
}
export default function CreatorCard({ item }: IProps) {
  const router = useRouter();
  // ! for now pushing creator data from props, change to url/:id when getList stops returning whole data in z beginning
  return (
    <div
      className={classes.card}
      onClick={() => router.push(`/creator/${item.userId}`)}
    >
      <div className={classes.avatar}>
        <img
          className={classes.avatarImg}
          alt="profile"
          src="https://www.irishtimes.com/polopoly_fs/1.4026833.1569190266!/image/image.jpg_gen/derivatives/box_620_330/image.jpg"
          // src={item.tiktok.user.avatarMedium}
        />
      </div>
      <div className={classes.header}>
        <img
          style={{ width: "100%" }}
          alt="profile picture"
          src="https://www.irishtimes.com/polopoly_fs/1.4026833.1569190266!/image/image.jpg_gen/derivatives/box_620_330/image.jpg"
        />
      </div>
      {/* body of card */}
      <div style={{ padding: "26px" }}>
        <div className={classes.addToList}>
          <BsBookmarkPlus />
        </div>

        <h1 className={classes.fullName}>{`${item.name}`}</h1>
        <p className={classes.tiktokUsername}>{`@${item.handle}`}</p>

        {/* <p className={classes.bio}>{`${item.bio}`}</p> */}

        <div className={classes.topics}>
          {item.trend.map((el: any, index: number) => {
            return (
              <div className={classes.topic} key={index}>
                <h4>{el}</h4>
              </div>
            );
          })}
        </div>

        <div className={classes.status}>
          <div style={{ marginRight: "40px" }}>
            <h1
              style={{
                fontWeight: 700,
                fontSize: "17px",
                marginBottom: "0px",
              }}
            >
              {abbreviate(item.followers, 1)}
            </h1>
            <p>Followers</p>
          </div>
          <div>
            <h1
              style={{
                fontWeight: 700,
                fontSize: "17px",
                marginBottom: "0px",
              }}
            >
              {abbreviate(item.view, 1)}
            </h1>
            <p>Average view</p>
          </div>
        </div>

        <div className={classes.footer}>
          <Button style={{ flex: "1" }} icon={<BiMailSend />} size={"middle"} />
          <Button
            type="primary"
            style={{ flex: 5, width: "100%", marginLeft: "15px" }}
          >
            Add to campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
