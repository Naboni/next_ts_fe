import React, { useEffect, useState } from "react";

import useSWR from "swr";

// components
import Filter from "@/components/directory/creatorSearch/Filter";
import CreatorList from "@/components/directory/creatorSearch/CreatorList";
import CenterContent from "@/components/CenterContent";
import VerifyEmail from "@/components/verify/VerifyEmail";
import CenterLoading from "@/components/CenterLoading";

// relative
import { getCreators } from "backend-utils/creator-util";

export default function CreatorSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    getCreators()
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setData([]);
        }
        setData(data.result);
      });
  }, []);

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

  return (
    <div>
      <div className="marginTop">
        <CenterContent>
          <VerifyEmail colored={false} padded={undefined} />
        </CenterContent>
        <Filter />
        <CenterContent>
          <div style={{ padding: 0 }}>
            <CreatorList data={data} />
          </div>
        </CenterContent>
      </div>
    </div>
  );
}
