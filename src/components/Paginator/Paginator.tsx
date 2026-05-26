import { Flex, Pagination } from "antd";
import type { PaginatorProps } from "@/components/Paginator/types";

function Paginator({
  children,
  currentPage,
  totalItems,
  pageSize = 2,
  onChange,
  lastPage,
  onPrevious,
  onNext,
}: PaginatorProps) {
  const handleChange = (page: number) => {
    if (onPrevious && page < currentPage) {
      onPrevious();
      return;
    }
    if (onNext && page > currentPage) {
      onNext();
      return;
    }
    onChange(page);
  };

  const total = lastPage ? lastPage * pageSize : totalItems;

  return (
    <Flex vertical gap="large" className="w-full">
      {children}
      {total > 0 && (
        <Flex justify="center" className="pt-2">
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={handleChange}
          />
        </Flex>
      )}
    </Flex>
  );
}

export default Paginator;
