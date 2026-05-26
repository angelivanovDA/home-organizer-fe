import type { ReactNode } from "react";

export interface ModalProps {
  title: string;
  open?: boolean;
  acceptEnabled?: boolean;
  onCancelModal: () => void;
  onAcceptModal: () => void;
  isLoading?: boolean;
  okText?: string;
  cancelText?: string;
  children: ReactNode;
  width?: number;
}
