import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";

import Image from "next/image";

import SignSvg from "public/svg/sign.svg";

// components
import CenterLoading from "../../components/CenterLoading";
// views
import SignIn from "../../views/auth/signIn";
export default function SignInPage() {
  // !redirect if session exists
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        // ! window.location resets the whole app state
        window.location.href = "/";
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <CenterLoading height={"100vh"} width={"100vw"} bg={"white"} />;
  }

  return (
    <div className="signLayout">
      <div className="signLayoutLeft">
        <Image src={SignSvg} />
        <h1>BETOPIA</h1>
        <h2>CREATOR MARKETPLACE</h2>
      </div>
      <div className="marginTop" style={{ width: "100%" }}>
        <SignIn />
      </div>
    </div>
  );
}
