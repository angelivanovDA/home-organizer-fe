import { Form, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import type { FilePickerProps } from "@/components/FormElements/FilePicker/types";

const { Dragger } = Upload;

function FilePicker({
  id,
  label,
  valid = true,
  touched,
  onChange,
  dragger = false,
}: FilePickerProps) {
  const showError = touched && !valid;

  const uploadProps = {
    accept: "image/png,image/jpeg,image/jpg",
    maxCount: 1 as const,
    beforeUpload: (file: File) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      onChange(id, file.name, dataTransfer.files);
      return false;
    },
    onRemove: () => {
      onChange(id, "", null);
    },
  };

  return (
    <Form.Item
      label={label}
      validateStatus={showError ? "error" : undefined}
      className="!mb-4"
    >
      {dragger ? (
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to upload</p>
        </Dragger>
      ) : (
        <Upload {...uploadProps}>
          <span>
            <UploadOutlined /> Select file
          </span>
        </Upload>
      )}
    </Form.Item>
  );
}

export default FilePicker;
