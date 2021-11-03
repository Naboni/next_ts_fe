import React from "react";
// components
import CenterContent from "../../components/CenterContent";
import CreateCampaign from "../../views/campaign/CreateCampaign";
export default function create() {
  return (
    <div className="marginTop">
      <CenterContent>
        <CreateCampaign />
      </CenterContent>
    </div>
  );
}
