import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Empty, Form, Space, Typography } from "antd";
import Input from "@/components/FormElements/Input/Input";
import { PlusOutlined, SendOutlined } from "@ant-design/icons";

import PostCard from "@/components/PostCard/PostCard";
import EditPost from "@/pages/EditPost";
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";
import Loader from "@/components/Loader/Loader";
import Paginator from "@/components/Paginator/Paginator";
import type { DashboardProps } from "@/pages/Dashboard/types";
import { apiUrl } from "@/utils/apiUtils";
import { subscribeToPosts } from "@/utils/socketUtils";
import type { Post as PostType, PostFormData } from "@/types";

function Dashboard({ token }: DashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [editPost, setEditPost] = useState<PostType | null>(null);
  const [status, setStatus] = useState("");
  const [postPage, setPostPage] = useState(1);
  const [postsLoading, setPostsLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const postPageRef = useRef(postPage);
  postPageRef.current = postPage;

  const catchError = useCallback((err: Error) => {
    setError(err);
  }, []);

  const loadPosts = useCallback(
    (targetPage?: number) => {
      const page = targetPage ?? postPageRef.current;

      if (targetPage !== undefined) {
        setPostsLoading(true);
        setPosts([]);
        setPostPage(page);
      }

      fetch(apiUrl(`/api/feed/posts?page=${page}`), {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to fetch posts.");
          }
          return res.json() as Promise<{
            posts: PostType[];
            totalItems: number;
          }>;
        })
        .then((resData) => {
          setPosts(
            resData.posts.map((post) => ({
              ...post,
              imagePath: post.imageUrl,
            })),
          );
          setTotalPosts(resData.totalItems);
          setPostsLoading(false);
        })
        .catch(catchError);
    },
    [token, catchError],
  );

  const addPost = useCallback((post: PostType) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      if (postPageRef.current === 1) {
        if (prevPosts.length >= 2) {
          updatedPosts.pop();
        }
        updatedPosts.unshift(post);
      }
      return updatedPosts;
    });
    setTotalPosts((prev) => prev + 1);
  }, []);

  const deletePost = useCallback(
    (postId: string) => {
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((p) => p._id !== postId);
        if (updatedPosts.length === 0 && postPageRef.current > 1) {
          loadPosts(postPageRef.current - 1);
        }
        return updatedPosts;
      });
      setTotalPosts((prev) => prev - 1);
    },
    [loadPosts],
  );

  useEffect(() => {
    fetch(apiUrl("/api/user/status"), {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch user status.");
        }
        return res.json() as Promise<{ status: string }>;
      })
      .then((resData) => {
        setStatus(resData.status);
      })
      .catch(catchError);
  }, [token, catchError]);

  useEffect(() => {
    loadPosts();

    subscribeToPosts((data) => {
      if (data.action === "create" && data.post) {
        addPost(data.post);
      }
      if (data.action === "delete" && data.postId) {
        deletePost(data.postId);
      }
    });
  }, [loadPosts, addPost, deletePost]);

  const statusUpdateHandler = (values: { status: string }) => {
    fetch(apiUrl("/api/user/status"), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ status: values.status }),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Can't update status!");
        }
        return res.json();
      })
      .catch(catchError);
  };

  const startEditPostHandler = (postId: string) => {
    const loadedPost = { ...posts.find((p) => p._id === postId)! };
    setIsEditing(true);
    setEditPost(loadedPost);
  };

  const finishEditHandler = (postData: PostFormData) => {
    setEditLoading(true);

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    if (postData.image instanceof File) {
      formData.append("image", postData.image);
    } else {
      formData.append("image", postData.image);
    }

    let url = apiUrl("/api/feed/post");
    let method = "POST";
    const headers: Record<string, string> = {
      Authorization: "Bearer " + token,
    };

    if (editPost) {
      url = apiUrl(`/api/feed/post/${editPost._id}`);
      method = "PUT";
    }

    fetch(url, {
      method: method,
      headers: headers,
      body: formData,
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json() as Promise<{ post: PostType }>;
      })
      .then((resData) => {
        const post: PostType = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          imageUrl: resData.post.imageUrl,
          creator: resData.post.creator,
          createdAt: resData.post.createdAt,
        };
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          if (editPost) {
            const postIndex = prevPosts.findIndex(
              (p) => p._id === editPost._id,
            );
            updatedPosts[postIndex] = post;
          }
          return updatedPosts;
        });
        setIsEditing(false);
        setEditPost(null);
        setEditLoading(false);
      })
      .catch((err: Error) => {
        setIsEditing(false);
        setEditPost(null);
        setEditLoading(false);
        setError(err);
      });
  };

  const deletePostHandler = (postId: string) => {
    setPostsLoading(true);
    fetch(apiUrl(`/api/feed/post/${postId}`), {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a post failed!");
        }
        return res.json();
      })
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
        setPostsLoading(false);
      })
      .catch(() => {
        setPostsLoading(false);
      });
  };

  return (
    <Fragment>
      <ErrorHandler error={error} onHandle={() => setError(null)} />
      <EditPost
        editing={isEditing}
        selectedPost={editPost}
        loading={editLoading}
        onCancelEdit={() => {
          setIsEditing(false);
          setEditPost(null);
        }}
        onFinishEdit={finishEditHandler}
      />

      <div className="page-container flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography.Title level={2} className="!mb-1">
              Dashboard
            </Typography.Title>
            <Typography.Text type="secondary">
              Share updates and browse posts from the community
            </Typography.Text>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setIsEditing(true)}
          >
            New post
          </Button>
        </div>

        <Card variant="borderless" className="mx-2 shadow-sm">
          <Form
            layout="inline"
            onFinish={statusUpdateHandler}
            className="flex flex-wrap gap-3"
          >
            <Input
              id="status"
              placeholder="Update your status..."
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="!mb-0 min-w-[220px] flex-1"
              initialValue={status}
            />
            <Form.Item className="!mb-0">
              <Button
                type="default"
                htmlType="submit"
                icon={<SendOutlined />}
                size="large"
              >
                Update status
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {postsLoading ? (
          <Loader tip="Loading posts..." />
        ) : posts.length === 0 ? (
          <Card variant="borderless" className="shadow-sm">
            <Empty description="No posts yet. Create your first post!" />
          </Card>
        ) : (
          <Paginator
            currentPage={postPage}
            totalItems={totalPosts}
            pageSize={2}
            onChange={(page) => loadPosts(page)}
          >
            <Space orientation="vertical" size="middle" className="w-full">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  author={post.creator.name}
                  date={new Date(post.createdAt).toLocaleDateString("en-US")}
                  title={post.title}
                  content={post.content}
                  onStartEdit={() => startEditPostHandler(post._id)}
                  onDelete={() => deletePostHandler(post._id)}
                />
              ))}
            </Space>
          </Paginator>
        )}
      </div>
    </Fragment>
  );
}

export default Dashboard;
