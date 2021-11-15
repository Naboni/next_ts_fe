import React from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/client";

import { BiMailSend } from "react-icons/bi";
import { BsBookmarkPlus } from "react-icons/bs";

let abbreviate = require("number-abbreviate");

// components
import AddCampaignModal from "./AddCampaignModal";
// styles
import classes from "./creatorCard.module.css";

// antd
import { Button } from "antd";
import { Roles } from "@/constants/roles";

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

  const [session, _] = useSession();
  const user = session?.user as any;

  // ! modal state
  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  return (
    <div className={classes.card}>
      <div
        onClick={() => {
          router.push(`/creator/${item.userId}`);
        }}
      >
        <div className={classes.avatar}>
          <img
            className={classes.avatarImg}
            alt="profile"
            src="https://www.irishtimes.com/polopoly_fs/1.4026833.1569190266!/image/image.jpg_gen/derivatives/box_620_330/image.jpg"
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
        <div style={{ padding: "26px 26px 0" }}>
          <div className={classes.addToList}>
            <BsBookmarkPlus />
          </div>
          {/* <h1 className={classes.fullName}>{`${item.first_name} ${item.last_name}`}</h1>
                <p className={classes.tiktokUsername}>{item.tiktok.user.signature}</p> */}
          <h1 className={classes.fullName}>{`${item.name}`}</h1>
          <p className={classes.tiktokUsername}>{`@${item.handle}`}</p>

          <p className={classes.bio}>{`${item.bio}`}</p>

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
        </div>
      </div>

      <div style={{ padding: "0 26px 26px" }}>
        {user?.role === Roles.BRAND && (
          <div className={classes.footer}>
            <Button
              style={{ flex: "1" }}
              icon={<BiMailSend />}
              size={"middle"}
            />
            <Button
              onClick={showModal}
              type="primary"
              style={{ flex: 5, width: "100%", marginLeft: "15px" }}
            >
              Add to campaign
            </Button>
          </div>
        )}
      </div>
      {visible && (
        <AddCampaignModal
          creator={item}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </div>
  );
}
