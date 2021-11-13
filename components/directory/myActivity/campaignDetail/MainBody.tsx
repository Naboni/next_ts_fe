import React from "react";

import { format, formatDistance, parseISO } from "date-fns";

// styles
import classes from "@/styles/campaignDetail.module.css";

// antd
import { Button, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;

interface Body {
  campaignTitle: string;
  campaignId: string;
  creationTime: string;
  status: string;
}

export default function MainBody({
  campaignTitle,
  campaignId,
  creationTime,
  status,
}: Body) {
  return (
    <div>
      <div className={classes.headFlex}>
        <div className={classes.headFlexOne}>
          <div className={classes.headerName}>
            <h3>{campaignTitle}</h3>
            <div className={classes.status}>
              <span className={`${classes.badge}  ${status}`}></span> {status}
            </div>
          </div>
          <div className={classes.headerBottom}>
            <h5>Campaign ID: {campaignId}</h5>
            <h5>
              Creation time: {format(parseISO(creationTime), "PPpp")}
              {","}
              <span style={{ marginLeft: "5px" }}>
                {formatDistance(parseISO(creationTime), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </h5>
          </div>
        </div>
        <div>
          <Button type="primary" size="small">
            Invite Creators
          </Button>
          <Select
            placeholder="Select"
            size="small"
            defaultValue={status}
            style={{ marginLeft: "10px", width: "120px" }}
          >
            <Option value="ACTIVE">Active</Option>
            <Option value="PENDING">Pending</Option>
            <Option value="COMPLETED">Completed</Option>
            <Option value="CANCELED">Canceled</Option>
          </Select>
          <Button
            type="text"
            shape="circle"
            size="middle"
            style={{ marginLeft: "10px" }}
            icon={<EditOutlined />}
          />
        </div>
      </div>
      <br />
      <Button type="primary" size="small">
        Build Report
      </Button>
    </div>
  );
}
