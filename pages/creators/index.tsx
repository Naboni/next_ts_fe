import React from "react";
import useSWR from "swr";

// widgets
import Filter from "../../components/directory/creatorSearch/Filter";
import CreatorList from "../../components/directory/creatorSearch/CreatorList";
import Loading from "../../components/directory/creatorSearch/Loading";
import CenterContent from "../../components/CenterContent";
import VerifyEmail from "../../components/verify/VerifyEmail";
// relative
import { getInfluencers } from "../../backend-utils/user-utils";

export default function CreatorSearch() {
  const { data, error } = useSWR("/users/influencer", getInfluencers);

  if (error) {
    return <h1>SOMETHING WENT WRONG</h1>;
  }
  return (
    <div>
      <div className="marginTop">
        <CenterContent>
          <VerifyEmail colored={false} padded={undefined}/>
        </CenterContent>
        <Filter />
        <CenterContent>
          <div style={{ padding: 0 }}>
            {!data && !error ? <Loading /> : <CreatorList data={data} />}
          </div>
        </CenterContent>
      </div>
    </div>
  );
}
