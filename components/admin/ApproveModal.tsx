import React, { useEffect, useState } from "react";

// relative
import { verify } from "../../lib/auth";
// styles
import classes from "./modal.module.css";
// antd
import { Modal, Button, Alert } from "antd";

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
    console.log("hiiii");
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
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div>
        <div className={classes.flex}>
          <h3>Requested by: </h3>
          <h4>{claim?.userId}</h4>
        </div>
        <div className={classes.flex}>
          <h3>At: </h3>
          <h4>{claim?.createdAt}</h4>
        </div>
        <div className={classes.flex} style={{ marginTop: "20px" }}>
          <h3 className={classes.handle}>{claim?.tiktokHandle}</h3>
          <h5 style={{ marginLeft: "10px" }}>{claim?.pasteCode}</h5>
        </div>
        <Button
          type="primary"
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
