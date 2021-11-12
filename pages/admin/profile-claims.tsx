import React, { useEffect, useState } from "react";

// relative
import {
  getPendingVerifications,
  rejectVerification,
} from "backend-utils/admin-utils";
import { adminClaimProfileColumn } from "@/constants/data";

// components
import CenterLoading from "@/components/CenterLoading";
import CenterContent from "@/components/CenterContent";
import ApproveModal from "@/components/admin/ApproveModal";

// antd
import { Table, Empty, Button, Space, Popconfirm, notification } from "antd";

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
        if (!data.success) {
          setData([]);
          console.log(data);
        }

        setData(data.result);
      })
      .catch((e) => setData([]));
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
    return (
      <div className="marginTop">
        <CenterLoading width="100%" height="50vh" bg="transparent" />
      </div>
    );
  }

  let colData: any[] = [];

  if (data?.length > 0) {
    colData = data.map((el: any) => {
      el.key = el.userId;
      return el;
    });
  }

  // ! popconfirm func
  function confirm(claim: Claim) {
    rejectVerification(claim?.userId as string, claim?.id as string)
      .then((res) => {
        if (res.ok) {
          notification.success({
            message: "Success",
            description: "User rejection succeeded.",
            placement: "bottomLeft",
          });
        } else {
          notification.error({
            message: "Error",
            description: "User rejection failed.",
            placement: "bottomLeft",
          });
        }
      })
      .catch((e) =>
        notification.error({
          message: "Error",
          description: e,
          placement: "bottomLeft",
        })
      );
  }
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
            <Popconfirm
              placement="topLeft"
              title="Reject user?"
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Reject
              </Button>
            </Popconfirm>
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
