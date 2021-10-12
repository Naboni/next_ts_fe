import React from "react";
// antd

// components
import CenterContent from "../../components/CenterContent";
// views
import SignUp from "../../views/auth/signUp";
export default function SignUpPage() {
  return (
    <div className="marginTop" style={{ backgroundColor: "#fff" }}>
      <CenterContent>
        <SignUp />
      </CenterContent>
    </div>
  );
}
