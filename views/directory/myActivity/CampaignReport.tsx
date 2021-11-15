import React from "react";
import { BsInfoCircle } from "react-icons/bs";

// components
import CampaignList from "@/components/directory/myActivity/CampaignList";
// antd
import { Input } from "antd";
const { Search } = Input;
// styles
import classes from "./campaignReport.module.css";
export default function CampaignReport() {
  const onSearch = (value: string) => console.log(value);
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.headerName}>
          <h3>Campaign Management</h3>
          <h6>
            Updated as of 12/12/2021(gc). {<BsInfoCircle />}Data is updated
            daily
          </h6>
        </div>
        <Search
          allowClear
          placeholder="Campaign name"
          onSearch={onSearch}
          enterButton
          style={{ width: "40%" }}
        />
      </header>
      <CampaignList />
    </div>
  );
}
