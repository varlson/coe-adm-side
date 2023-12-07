import { btnTypes } from "@/types/types";
import React from "react";
import ButtonLoader from "./ButtonLoader";
import LoaderButton from "./LoaderButton";
type btnProps = {
  setBtnLoader?: () => void;
  label?: string;
  btnType?: btnTypes;
  btnHandler?: (id?: string) => {};
  isLoading?: boolean;
  [key: string]: any;
};

function Button({
  isLoading,
  id,
  btnType,
  label,
  btnHandler,
  setBtnLoader,
}: btnProps) {
  const clickHandler = async () => {
    if (btnHandler) btnHandler(id);
  };
  const bgColor =
    btnType === btnTypes.btnPrimary
      ? "bg-basicBlack"
      : btnType === btnTypes.btnWarning
      ? "bg-yellow-600"
      : btnType === btnTypes.btnDanger
      ? "bg-basicRed"
      : "bg-basicDark";

  if (isLoading)
    return (
      <div
        className={`${bgColor} flex justify-center cursor-pointer btn text-center py-1 rounded text-white`}
      >
        <LoaderButton />
      </div>
    );

  return (
    <div
      onClick={() => {
        clickHandler();
        if (setBtnLoader) {
          setBtnLoader();
        }
      }}
      className={`${bgColor} px-2 cursor-pointer btn text-center py-1 rounded text-white`}
    >
      {label}
    </div>
  );
}

export default Button;
