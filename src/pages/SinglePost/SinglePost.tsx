import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Skeleton, Space, Typography } from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";

import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import { ROUTES } from "@/constants/routesConstants";
import type { SinglePostProps } from "@/pages/SinglePost/types";
import { apiUrl } from "@/utils/apiUtils";

function SinglePost({ token }: SinglePostProps) {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!postId) {
      return;
    }

    setLoading(true);
    fetch(apiUrl(`/api/feed/post/${postId}`), {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch post");
        }
        return res.json() as Promise<{
          post: {
            title: string;
            content: string;
            imageUrl: string;
            createdAt: string;
            creator: { name: string };
          };
        }>;
      })
      .then((resData) => {
        setTitle(resData.post.title);
        setAuthor(resData.post.creator.name);
        setImage(apiUrl(resData.post.imageUrl));
        setDate(new Date(resData.post.createdAt).toLocaleDateString("en-US"));
        setContent(resData.post.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [postId, token]);

  return (
    <div className="page-container">
      <Link to={ROUTES.DASHBOARD} className="mb-4 inline-block">
        <Button mode="flat" icon={<ArrowLeftOutlined />}>
          Back
        </Button>
      </Link>
      <Card variant="borderless" className="overflow-hidden shadow-md">
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <Space orientation="vertical" size="large" className="w-full">
            <div>
              <Typography.Title level={2} className="!mb-2">
                {title}
              </Typography.Title>
              <Typography.Text
                type="secondary"
                className="flex items-center gap-1"
              >
                <UserOutlined />
                Created by {author} on {date}
              </Typography.Text>
            </div>

            <div className="overflow-hidden rounded-xl bg-slate-100 p-2">
              <Image
                imageUrl={image}
                alt={title}
                contain
                className="max-h-[420px] w-full"
              />
            </div>

            <Typography.Paragraph className="!mb-0 whitespace-pre-wrap text-base leading-relaxed text-slate-700">
              {content}
            </Typography.Paragraph>
          </Space>
        )}
      </Card>
    </div>
  );
}

export default SinglePost;
