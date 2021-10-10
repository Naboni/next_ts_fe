import React from "react";

import { useRouter } from "next/router";

import { BiMailSend } from "react-icons/bi";
import { BsBookmarkPlus } from "react-icons/bs";

// styles
import classes from "./creatorCard.module.css";

// antd
import { Button } from "antd";
interface IProps {
  item: {
    _id: string,
    first_name : string,
    last_name : string,
    tiktokUserName: string,
  };
}
export default function CreatorCard({ item }: IProps) {

  const router = useRouter();
  // ! for now pushing creator data from props, change to url/:id when getlist stops returning whole data in z beginning
  return (
    <div
      className={classes.card}
      onClick={() => router.push(`/creator/${item._id}`)}
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
        {/* <h1 className={classes.fullName}>{`${item.first_name} ${item.last_name}`}</h1>
                <p className={classes.tiktokUsername}>{item.tiktok.user.signature}</p> */}
        <h1 className={classes.fullName}>{`${
          item.first_name + " " + item.last_name
        }`}</h1>
        <p className={classes.tiktokUsername}>{`@${item.tiktokUserName}`}</p>

        <div className={classes.topics}>
          <div className={classes.topic}>
            <h4>Computer</h4>
          </div>
          <div className={classes.topic}>
            <h4>Book</h4>
          </div>
          <div className={classes.topic}>
            <h4>Travel</h4>
          </div>
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
              10m
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
              10m
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
