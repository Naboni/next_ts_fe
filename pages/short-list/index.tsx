import React from "react";
// components
import CenterContent from "../../components/CenterContent";
import CreatePlaceHolder from "../../components/directory/shortList/CreatePlaceHolder";

export default function Shortlist() {
  return (
    <div className="marginTop">
      <CenterContent>
        <CreatePlaceHolder />
      </CenterContent>
    </div>
  );
}
