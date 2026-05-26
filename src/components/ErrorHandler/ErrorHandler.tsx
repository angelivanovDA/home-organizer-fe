import { Modal } from "antd";
import type { ErrorHandlerProps } from "@/components/ErrorHandler/types";

const ErrorHandler = ({ error, onHandle }: ErrorHandlerProps) => (
  <Modal
    title="Something went wrong"
    open={Boolean(error)}
    onOk={onHandle}
    onCancel={onHandle}
    okText="OK"
    cancelButtonProps={{ style: { display: "none" } }}
    centered
  >
    <p className="m-0 text-slate-600">{error?.message}</p>
  </Modal>
);

export default ErrorHandler;
