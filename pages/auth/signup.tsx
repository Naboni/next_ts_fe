import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";

import Image from "next/image";

// components
import CenterLoading from "../../components/CenterLoading";

// views
import SignUp from "../../views/auth/signUp";

import SignSvg from "public/svg/sign.svg";

export default function SignUpPage() {
  // !redirect if session exists
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
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
        <SignUp />
      </div>
    </div>
  );
}
