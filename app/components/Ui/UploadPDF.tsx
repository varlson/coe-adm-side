import { PostTypes, UploadIMGTypeProps } from "@/types/types";
import React from "react";

function UploadPDF({
  role,
  isImageUploaded,
  file,
  postType,
  changeFileHandle,
  removeHandler,
}: UploadIMGTypeProps) {
  return (
    <div>
      <p className="">{`Adicione PDF do Edital`}</p>

      {!file && (
        <div className={`grid ${isImageUploaded == false ? "relative" : ""}`}>
          {isImageUploaded == false && (
            <div className="absolute text-basicRed text-center text-2xl centering-abs ">
              Adicione uma imagem
            </div>
          )}
          <label
            htmlFor="upload"
            className="flex items-center justify-center cursor-pointer"
          >
            <img className="" src="/images/menus/pdf_light.png" alt="" />
          </label>
          <input
            accept="application/pdf"
            name=""
            onChange={changeFileHandle}
            id="upload"
            type="file"
            className="hidden"
          />
        </div>
      )}
      {file && (
        <div className="grid my-1 w-full">
          <img
            onClick={removeHandler}
            className="h-10 cursor-pointer"
            src="/images/menus/delete.png"
            alt=""
          />
          <img
            className="justify-self-center object- h-16 w-16"
            src="/images/menus/pdf.png"
            alt=""
          />
          <p className="justify-self-center my-2">{role}</p>
        </div>
      )}
    </div>
  );
}

export default UploadPDF;
