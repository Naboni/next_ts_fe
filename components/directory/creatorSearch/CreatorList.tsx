import React from "react";

// widgets
import CreatorCard from "./CreatorCard";

// antd
import { List } from "antd";
interface IProps {
  data: {
    bio: string;
    followers: string;
    handle: string;
    name: string;
    trend: string[];
    userId: string;
    view: string;
  }[];
}

export default function CreatorList({ data }: IProps) {
  return (
    <div>
      <List
        grid={{ gutter: 20, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <CreatorCard item={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
