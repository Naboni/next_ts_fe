import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

// styles
import classes from "./addCampaign.module.css";

// relative
import { getAllCampaigns } from "backend-utils/campaign-util";
import { addCreatorsToCampaign } from "backend-utils/creator-util";
import { addToCampaignColumn } from "@/constants/data";

// components
import CenterLoading from "@/components/CenterLoading";

// antd
import { Modal, Input, Button, Table, Empty, message } from "antd";
const { Search } = Input;

interface IProps {
  bio: string;
  followers: string;
  handle: string;
  name: string;
  trend: string[];
  userId: string;
  view: string;
}

export default function AddCampaignModal({
  visible,
  setVisible,
  creator,
}: {
  visible: boolean;
  setVisible: (x: boolean) => void;
  creator: IProps;
}) {
  const router = useRouter();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string[]>([]);

  const handleOk = () => {
    if (selectedCampaign.length === 0) {
      message.error("No campaign selected!", 5);
    } else {
      setConfirmLoading(true);

      addCreatorsToCampaign(creator.userId, selectedCampaign)
        .then((res) => {
          if (res.ok) {
            message.success(
              `Successfully sent an invitation to ${creator.handle}`
            );
          } else {
            message.error("Something went wrong!");
          }
        })
        .catch((e) => message.error("Something went wrong!"))
        .finally(() => {
          setConfirmLoading(false);
          setVisible(false);
        });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // ! search
  const onSearch = (value: string) => console.log(value);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    getAllCampaigns()
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

  let colData: any[] = [];

  if (data?.length > 0) {
    colData = data.map((el: any) => {
      el.key = el.id;
      return el;
    });
  }

  return (
    <Modal
      title="Add to campaign"
      visible={visible}
      okText="Add"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <div>
        <div className={classes.bar}>
          <Search
            allowClear
            placeholder="Campaign name"
            onSearch={onSearch}
            enterButton
            style={{ width: "68%" }}
          />

          <Button
            type="primary"
            onClick={() => router.push("/campaign/create")}
          >
            Create campaign
          </Button>
        </div>
        <h3>Adding: @{creator.handle}</h3>
        <div>
          {isLoading ? (
            <CenterLoading width="90%" height="2vh" bg="transparent" />
          ) : (
            <Table
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowId) =>
                  setSelectedCampaign([...(selectedRowId as string[])]),
              }}
              showHeader={false}
              pagination={{
                pageSize: 10,
              }}
              size="small"
              locale={{
                emptyText: (
                  <Empty
                    imageStyle={{
                      height: "100px",
                    }}
                    style={{
                      height: "20vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                ),
              }}
              dataSource={colData}
              columns={addToCampaignColumn}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
