import React from "react";

// widgets
import CreatorCardFull from "./CreatorCardFull";

// antd
import { List } from "antd";

interface IData {
  bio: string;
  followers: string;
  handle: string;
  name: string;
  trend: string[];
  userId: string;
  view: string;
}

interface IProps {
  data: IData[];
}
export default function CreatorList({ data }: IProps) {
  return (
    <div>
      <List
        grid={{ gutter: 20, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <CreatorCardFull item={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
