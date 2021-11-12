import React, { useEffect, useState } from "react";

// relative
import { getApprovedProfiles } from "backend-utils/admin-utils";
import { setUpProfileColumn } from "@/constants/data";

// components
import CenterLoading from "@/components/CenterLoading";
import CenterContent from "@/components/CenterContent";

// antd
import { Table, Empty } from "antd";

export default function SetupProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    getApprovedProfiles()
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

  let colData: any[] = [];

  if (data?.length > 0) {
    colData = data.map((el: any) => {
      el.key = el.id;
      return el;
    });
  }

  return (
    <div className="marginTop">
      <CenterContent>
        <Table
          pagination={{
            pageSize: 10,
          }}
          locale={{
            emptyText: (
              <Empty
                style={{
                  height: "50vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            ),
          }}
          dataSource={colData}
          columns={setUpProfileColumn}
        />
      </CenterContent>
    </div>

    // <div className="marginTop">
    //   <CenterContent>
    //     <SetUpProfile />
    //   </CenterContent>
    // </div>
  );
}
