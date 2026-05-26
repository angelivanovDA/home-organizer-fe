import { Image as AntImage } from "antd";
import type { ImageProps } from "@/components/Image/types";

function Image({ imageUrl, contain, left, alt = "", className }: ImageProps) {
  return (
    <AntImage
      src={imageUrl}
      alt={alt}
      className={className}
      style={{
        objectFit: contain ? "contain" : "cover",
        objectPosition: left ? "left" : "center",
      }}
      preview={Boolean(imageUrl)}
    />
  );
}

export default Image;
