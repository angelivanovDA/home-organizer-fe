import type { ReactNode } from "react";

export interface PaginatorProps {
  children: ReactNode;
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  onChange: (page: number) => void;
  /** @deprecated Use onChange with totalItems instead */
  lastPage?: number;
  /** @deprecated Use onChange instead */
  onPrevious?: () => void;
  /** @deprecated Use onChange instead */
  onNext?: () => void;
}
