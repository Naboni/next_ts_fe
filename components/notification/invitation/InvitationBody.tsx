import React from "react";

import { BsTelegram } from "react-icons/bs";

import { format, formatDistance, parseISO } from "date-fns";

// styles
import classes from "./invitationBody.module.css";

// antd
import { Button, Divider, Space } from "antd";

export default function InvitationBody({ campaign }: any) {
  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerTop}>
          <h3>
            Invitation call by{" "}
            <span className={classes.companyName}>{campaign.brandName}</span>
          </h3>
          <Space direction="horizontal">
            <Button type="primary" ghost>
              Accept
            </Button>
            <Button type="primary" ghost danger>
              Reject
            </Button>
          </Space>
        </div>
        <p className={classes.date}>
          Campaign created at: {format(parseISO(campaign.createdAt), "PPpp")}
          <span className={classes.distance}>
            {formatDistance(parseISO(campaign.createdAt), new Date(), {
              addSuffix: true,
            })}
          </span>
        </p>
      </div>

      <div className={classes.header} style={{ marginTop: "20px" }}>
        <div className={classes.description}>
          <div className={classes.descriptionBody}>
            <h4>Brand details</h4>
            <div className={classes.details}>
              <h5>Brand name</h5>
              <p>{campaign.brandName}</p>
            </div>
            <div className={classes.details}>
              <h5>Brand industry</h5>
              <p>{campaign.brandIndustry}</p>
            </div>
            <div className={classes.details}>
              <h5>Brand website</h5>
              <a target="_blank" href={campaign.brandWebsite}>
                {campaign.brandWebsite}
              </a>
            </div>
            <div className={classes.details}>
              <h5>Brand message</h5>
              <p>{campaign.message}</p>
            </div>
          </div>
          <Divider type="vertical" style={{ height: "30vh" }} />
          <div className={classes.descriptionBody}>
            <h4>Campaign details</h4>
            <div className={classes.details}>
              <h5>Product name</h5>
              <p>{campaign.productName}</p>
            </div>
            <div className={classes.details}>
              <h5>Campaign name</h5>
              <p>{campaign.campaignName}</p>
            </div>
            <div className={classes.details}>
              <h5>Campaign price</h5>
              <p>
                {campaign.negotiationType === "2"
                  ? `${
                      campaign.campaignPrice
                    } ${campaign.campaignPriceType.toUpperCase()}`
                  : "Negotiable"}
              </p>
            </div>
            <div className={classes.details}>
              <h5>Campaign goal</h5>
              <p>{campaign.campaignGoal}</p>
            </div>
            <div className={classes.details}>
              <h5>Campaign duration</h5>
              <p>{`${campaign.campaignDuration[0]} -- ${campaign.campaignDuration[1]}`}</p>
            </div>
          </div>
        </div>
        <div>
          <h4>Contact details for more information</h4>
          <div className={classes.details}>
            <h5>Contact name</h5>
            <p>{campaign.contactName}</p>
          </div>
          <div className={classes.details}>
            <h5>Email</h5>
            <p>{campaign.email}</p>
          </div>
          <div className={classes.details}>
            <h5>Phone number</h5>
            <p>{campaign.phone}</p>
          </div>
          <div className={classes.details}>
            {campaign.otherSocialMedia.length > 0 &&
              campaign.otherSocialMedia.map((el: any, i: any) => (
                <p key={i}>{`${el.media} ${el.handle}`}</p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
