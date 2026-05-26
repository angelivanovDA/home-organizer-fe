import { Card, Space, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Button from "@/components/Button/Button";
import type { PostCardProps } from "@/components/PostCard/types";
import { postPath } from "@/utils/routesUtils";

function PostCard({
  id,
  author,
  date,
  title,
  content,
  onStartEdit,
  onDelete,
}: PostCardProps) {
  return (
    <Card
      className="shadow-sm transition-shadow duration-200 hover:shadow-md"
      bordered={false}
    >
      <Space direction="vertical" size="small" className="w-full">
        <Typography.Text type="secondary" className="flex items-center gap-1">
          <UserOutlined />
          {author} · {date}
        </Typography.Text>
        <Typography.Title level={4} className="!mb-1">
          {title}
        </Typography.Title>
        <Typography.Paragraph
          className="!mb-0 text-slate-600"
          ellipsis={{ rows: 2 }}
        >
          {content}
        </Typography.Paragraph>
        <Space wrap className="pt-2">
          <Button link={postPath(id)} mode="flat" icon={<EyeOutlined />}>
            View
          </Button>
          <Button mode="flat" icon={<EditOutlined />} onClick={onStartEdit}>
            Edit
          </Button>
          <Button
            mode="flat"
            design="danger"
            icon={<DeleteOutlined />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Space>
      </Space>
    </Card>
  );
}

export default PostCard;
