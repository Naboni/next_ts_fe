import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
// antd

// components
import CenterContent from "../../components/CenterContent";
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
    <div className="marginTop" style={{ backgroundColor: "#fff" }}>
      <CenterContent>
        <SignIn />
      </CenterContent>
    </div>
  );
}
