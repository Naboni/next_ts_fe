import React, { useEffect, useState } from "react";

import { format, parseISO } from "date-fns";

// relative
import { verify } from "../../lib/auth";
import { approveVerification } from "../../backend-utils/admin-utils";

// styles
import classes from "./modal.module.css";
// antd
import { Modal, Button, Alert, notification } from "antd";

interface Claim {
  createdAt: string;
  id: string;
  key: string;
  pasteCode: string;
  tiktokHandle: string;
  userId: string;
}
export default function ApproveModal({
  visible,
  setVisible,
  claim,
}: {
  visible: boolean;
  setVisible: (x: boolean) => void;
  claim: Claim | undefined;
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState("");

  const handleOk = () => {
    setConfirmLoading(true);
    approveVerification(claim?.userId as string)
      .then((res) => {
        if (res.ok) {
          notification.success({
            message: "Success",
            description: "User approval succeeded.",
            placement: "bottomLeft",
          });
        } else {
          notification.error({
            message: "Error",
            description: "User approval failed.",
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
      )
      .finally(() => {
        setConfirmLoading(false);
        setVisible(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const checkIfValid = async () => {
    setShowAlert(false);
    const res = await verify(claim?.tiktokHandle!, claim?.pasteCode!);
    setAlert(res.toString());
  };

  useEffect(() => {
    if (alert != "") {
      setShowAlert(true);
    }
  }, [alert]);

  return (
    <Modal
      title="Approval request"
      visible={visible}
      okText="Approve"
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <div>
        <div className={classes.flex}>
          <h3>Requested by: </h3>
          <h4>{claim?.userId}</h4>
        </div>
        <div className={classes.flex}>
          <h3>At: </h3>
          <h4>{format(parseISO(claim?.createdAt as string), "PPpp")}</h4>
        </div>
        <div className={classes.flex} style={{ marginTop: "20px" }}>
          <h3 className={classes.handle}>{claim?.tiktokHandle}</h3>
          <h5 style={{ marginLeft: "10px" }}>{claim?.pasteCode}</h5>
        </div>
        <Button
          type="link"
          size="middle"
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onClick={checkIfValid}
        >
          Check validity
        </Button>
        {showAlert && (
          <Alert
            type={alert === "true" ? "success" : "error"}
            message={alert === "true" ? "Valid Code" : "Invalid Code"}
          />
        )}
      </div>
    </Modal>
  );
}
