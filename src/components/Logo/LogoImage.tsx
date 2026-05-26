import type { LogoImageProps } from "@/components/Logo/types";

function LogoImage({
  className = "size-8 shrink-0",
  decorative = false,
}: LogoImageProps) {
  return (
    <img
      src="/favicon.svg"
      alt={decorative ? "" : "MessageNode"}
      width={32}
      height={32}
      className={className}
    />
  );
}

export default LogoImage;
