import React from "react";
import { useRouter } from "next/router";

import SetUpProfile from "@/views/admin/SetUpProfile";
import CenterContent from "@/components/CenterContent";

export default function DetailSetup() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div className="marginTop">
      <CenterContent>
        <SetUpProfile userId={router.query?.uid as string} />
      </CenterContent>
    </div>
  );
}
