import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// relative
import { getInvitationById } from "backend-utils/notification-util";
// components
import CenterLoading from "@/components/CenterLoading";
import CenterContent from "@/components/CenterContent";
import InvitationBody from "@/components/notification/invitation/InvitationBody";
export default function Invitation() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (router.query.iid) {
      getInvitationById(router.query.iid as string)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [router.query.iid]);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return (
      <div className="marginTop">
        <CenterLoading width="100%" height="50vh" bg="transparent" />
      </div>
    );
  }

  if (!data.success) {
    return (
      <div className="marginTop">
        <CenterContent>Error</CenterContent>
      </div>
    );
  }
  return (
    <div className="marginTop">
      <CenterContent>
        <InvitationBody campaign={data.response} />
      </CenterContent>
    </div>
  );
}
