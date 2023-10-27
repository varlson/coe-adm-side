import React from "react";
import { LineWave } from "react-loader-spinner";

function ImageLoader() {
  return (
    <div>
      <LineWave
        height="100"
        width="100"
        color="red"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
}

export default ImageLoader;
