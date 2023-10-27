import React from "react";
import { ThreeDots } from "react-loader-spinner";

function BtnLoader({
  color,
  height,
  width,
}: {
  color: string;
  width: number;
  height: number;
}) {
  return (
    <div className="btn py-1 flex items-center justify-center">
      <ThreeDots height={height} width={width} color={color ? color : "red"} />
    </div>
  );
}

export default BtnLoader;
