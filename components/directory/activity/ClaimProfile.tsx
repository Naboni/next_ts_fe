import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// relative
import tiktokLogo from "../../../public/tiktok.svg";
// antd
import { Button } from "antd";

export default function ClaimProfile() {
  const router = useRouter();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image src={tiktokLogo} width="100px" height="100px" />
      <div style={{ marginLeft: "20px" }}>
        <h3>Claim Your Profile</h3>
        <h4 style={{ color: "grey", fontWeight: 400 }}>
          Claim your profile, start editing your details and get yourself
          noticed by campaign managers.
        </h4>
        <Button type="primary" onClick={() => router.push("/claim-profile")}>
          Claim Profile
        </Button>
      </div>
    </div>
  );
}
