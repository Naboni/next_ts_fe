import React from "react";

import { Skeleton, Divider } from "antd";

export default function Loading() {
  return (
    <div>
      <Skeleton active={true} avatar title={false} paragraph={{ rows: 2 }} />
      <Divider />
      <Skeleton active={true} avatar title={false} paragraph={{ rows: 2 }} />
      <Divider />
      <Skeleton active={true} avatar title={false} paragraph={{ rows: 2 }} />
      <Divider />
      <Skeleton active={true} avatar title={false} paragraph={{ rows: 2 }} />
      <Divider />
      <Skeleton active={true} avatar title={false} paragraph={{ rows: 2 }} />
      <Divider />
      <Skeleton active={true} avatar title={false} paragraph={{ rows: 2 }} />
      <Divider />
      <Skeleton active={true} avatar title={false} paragraph={{ rows: 2 }} />
    </div>
  );
}
