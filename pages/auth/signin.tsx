import React from "react";
// antd

// components
import CenterContent from "../../components/CenterContent";
// views
import SignIn from "../../views/auth/signIn";
export default function SignInPage() {
  return (
    <div className="marginTop" style={{ backgroundColor: "#fff" }}>
      <CenterContent>
        <SignIn />
      </CenterContent>
    </div>
  );
}
