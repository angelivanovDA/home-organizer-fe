import { Modal as AntModal } from "antd";
import type { ModalProps } from "@/components/Modal/types";

function Modal({
  title,
  open = true,
  acceptEnabled = true,
  onCancelModal,
  onAcceptModal,
  isLoading,
  okText = "Accept",
  cancelText = "Cancel",
  children,
  width = 520,
}: ModalProps) {
  return (
    <AntModal
      title={title}
      open={open}
      onCancel={onCancelModal}
      onOk={onAcceptModal}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={isLoading}
      okButtonProps={{ disabled: !acceptEnabled }}
      width={width}
      centered
      destroyOnClose
    >
      {children}
    </AntModal>
  );
}

export default Modal;
