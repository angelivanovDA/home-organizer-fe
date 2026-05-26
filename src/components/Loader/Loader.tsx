import { Flex, Spin } from "antd";
import type { LoaderProps } from "@/components/Loader/types";

function Loader({
  tip = "Loading...",
  size = "large",
  fullPage = false,
}: LoaderProps) {
  return (
    <Flex
      align="center"
      justify="center"
      className={fullPage ? "min-h-[240px] w-full" : "w-full py-8"}
    >
      <Spin description={tip} size={size} />
    </Flex>
  );
}

export default Loader;
