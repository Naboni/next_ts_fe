import React, { useEffect, useState } from "react";

// relative
import { getPendingVerifications } from "../../backend-utils/admin-utils";
import { adminClaimProfileColumn } from "../../constants/data";

// components
import CenterLoading from "../../components/CenterLoading";
import CenterContent from "../../components/CenterContent";
import ApproveModal from "../../components/admin/ApproveModal";

// antd
import { Table, Empty, Button, Space } from "antd";

interface Claim {
  createdAt: string;
  id: string;
  key: string;
  pasteCode: string;
  tiktokHandle: string;
  userId: string;
}
export default function ProfileClaims() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  // ! modal state
  const [of, setOf] = React.useState<Claim>();
  const [visibleApprove, setVisibleApprove] = React.useState(false);

  useEffect(() => {
    getPendingVerifications()
      .then((res) => res.json())
      .then((data) => {
        setData(data.result);
      });
  }, []);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  useEffect(() => {
    if (of !== undefined) {
      setVisibleApprove(true);
    }
  }, [of]);

  // ! to clear {of} state upon modal close
  useEffect(() => {
    if (!visibleApprove) {
      setTimeout(() => {
        setOf(undefined);
      }, 200);
    }
  }, [visibleApprove]);

  if (isLoading) {
    return <CenterLoading width="100%" height="50vh" bg="transparent" />;
  }

  const colData = data.map((el: any) => {
    el.key = el.userId;
    return el;
  });

  const col = [
    ...adminClaimProfileColumn,
    {
      key: "userId",
      render: (record: Claim) => {
        return (
          <Space direction="horizontal">
            <Button
              type="primary"
              onClick={() => {
                setOf(record);
              }}
            >
              Approve
            </Button>
            <Button type="primary" danger>
              Reject
            </Button>
          </Space>
        );
      },
    },
  ];

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
          columns={col}
        />
      </CenterContent>
      {visibleApprove && (
        <ApproveModal
          claim={of}
          visible={visibleApprove}
          setVisible={setVisibleApprove}
        />
      )}
    </div>
  );
}
