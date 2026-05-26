import { useEffect, useState } from "react";
import { Form } from "antd";

import FilePicker from "@/components/FormElements/FilePicker/FilePicker";
import Input from "@/components/FormElements/Input/Input";
import Image from "@/components/Image/Image";
import Modal from "@/components/Modal/Modal";
import { required, length } from "@/utils/formUtils";
import { generateBase64FromImage } from "@/utils/imageUtils";
import type { EditPostFormValues, EditPostProps } from "@/pages/EditPost/types";
import { apiUrl } from "@/utils/apiUtils";

function EditPost({
  editing,
  selectedPost,
  loading,
  onCancelEdit,
  onFinishEdit,
}: EditPostProps) {
  const [form] = Form.useForm<EditPostFormValues>();
  const [imageFile, setImageFile] = useState<File | string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageTouched, setImageTouched] = useState(false);

  const isEditMode = Boolean(selectedPost);

  useEffect(() => {
    if (!editing) {
      return;
    }

    if (selectedPost) {
      form.setFieldsValue({
        title: selectedPost.title,
        content: selectedPost.content,
      });
      const existing = selectedPost.imagePath ?? selectedPost.imageUrl;
      setImageFile(existing);
      setImagePreview(apiUrl(existing));
      setImageTouched(true);
      return;
    }

    form.resetFields();
    setImageFile(null);
    setImagePreview(null);
    setImageTouched(false);
  }, [editing, selectedPost, form]);

  const handleCancel = () => {
    form.resetFields();
    setImageFile(null);
    setImagePreview(null);
    setImageTouched(false);
    onCancelEdit();
  };

  const handleFinish = (values: EditPostFormValues) => {
    if (!imageFile) {
      setImageTouched(true);
      return;
    }

    onFinishEdit({
      title: values.title,
      content: values.content,
      image: imageFile,
    });

    form.resetFields();
    setImageFile(null);
    setImagePreview(null);
    setImageTouched(false);
  };

  const handleImageChange = (
    _id: string,
    _value: string,
    files?: FileList | null,
  ) => {
    setImageTouched(true);
    if (files?.[0]) {
      const file = files[0];
      setImageFile(file);
      generateBase64FromImage(file)
        .then((b64) => {
          if (typeof b64 === "string") {
            setImagePreview(b64);
          }
        })
        .catch(() => setImagePreview(null));
      return;
    }

    if (selectedPost) {
      const existing = selectedPost.imagePath ?? selectedPost.imageUrl;
      setImageFile(existing);
      setImagePreview(apiUrl(existing));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const imageIsValid = Boolean(imageFile);

  return (
    <Modal
      title={isEditMode ? "Edit post" : "Create new post"}
      open={editing}
      acceptEnabled={imageIsValid}
      onCancelModal={handleCancel}
      onAcceptModal={() => form.submit()}
      isLoading={loading}
      okText={isEditMode ? "Save changes" : "Publish"}
      width={640}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
        className="mt-2"
      >
        <Input
          id="title"
          label="Title"
          placeholder="Post title"
          rules={[
            { required: true, message: "Title is required" },
            {
              validator: (_, value) =>
                length({ min: 5 })(value ?? "")
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Title must be at least 5 characters"),
                    ),
            },
          ]}
        />

        <FilePicker
          id="image"
          label="Image"
          dragger
          valid={imageIsValid}
          touched={imageTouched}
          onChange={handleImageChange}
        />

        {imagePreview && (
          <div className="mb-4 overflow-hidden rounded-lg border border-slate-200">
            <Image
              imageUrl={imagePreview}
              alt="Preview"
              contain
              className="max-h-48"
            />
          </div>
        )}

        <Input
          id="content"
          label="Content"
          type="textarea"
          rows={5}
          placeholder="Write your post content..."
          rules={[
            { required: true, message: "Content is required" },
            {
              validator: (_, value) =>
                required(value ?? "") && length({ min: 5 })(value ?? "")
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Content must be at least 5 characters"),
                    ),
            },
          ]}
        />
      </Form>
    </Modal>
  );
}

export default EditPost;
