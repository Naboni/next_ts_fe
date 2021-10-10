import React, { ReactChild, ReactChildren } from "react";
// antd
import { Layout } from "antd";
const { Content } = Layout;
interface IProps {
  children: ReactChild | ReactChildren;
}
export default function CenterContent({ children }: IProps) {
  return (
    <Content
      className="site-layout"
      style={{ padding: "0 18%", marginTop: 50, position: "relative" }}
    >
      {children}
    </Content>
  );
}
