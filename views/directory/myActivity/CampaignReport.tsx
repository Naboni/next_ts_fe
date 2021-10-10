import React from "react";
import { BsInfoCircle } from "react-icons/bs";

// components
import CampaignList from "../../../components/directory/myActivity/CampaignList";
// antd
import { Input, Select, Divider } from "antd";
const { Option } = Select;
// styles
import classes from "./campaignReport.module.css";
export default function CampaignReport() {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.headerName}>
          <h3>Campaign Reporting</h3>
          <h6>
            Updated as of 12/12/2021(gc). {<BsInfoCircle />}Data is updated
            daily
          </h6>
        </div>
        <Input.Group compact>
          <Select defaultValue="Campaign name">
            <Option value="1">Campaign name</Option>
            <Option value="2">Campaign type</Option>
          </Select>
          <Input style={{ width: "40%" }} placeholder="Search here" />
        </Input.Group>
      </header>
      <CampaignList/>
    </div>
  );
}
