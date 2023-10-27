import React from "react";
import { ThreeDots } from "react-loader-spinner";

type LoaderType = {
  color: string;
  size?: string;
};
function Loader({ color, size }: LoaderType) {
  const _color = color ? color : "#cc0000";
  const _size = size ? size : "40";
  return (
    <div>
      <ThreeDots
        height={_size}
        width={_size}
        radius="9"
        color={_color}
        ariaLabel="three-dots-loading"
      ></ThreeDots>
    </div>
  );
}

export default Loader;
