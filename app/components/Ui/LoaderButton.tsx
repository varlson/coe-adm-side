import React from "react";
import { ThreeDots } from "react-loader-spinner";

function LoaderButton() {
  return (
    <div>
      <ThreeDots
        height="30"
        width="50"
        radius="9"
        color="white"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
}

export default LoaderButton;
