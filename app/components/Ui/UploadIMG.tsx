import { PostTypes, UploadIMGTypeProps, blobType } from "@/types/types";
import React from "react";

function UploadIMG({
  role,
  isImageUploaded,
  file,
  postType,
  changeFileHandle,
  removeHandler,
}: UploadIMGTypeProps) {
  return (
    <div>
      <p className="">{`Adicione uma Imagem para ${role}`}</p>

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
            <img className="" src="/images/menus/upload.png" alt="" />
          </label>
          <input
            accept="image/*"
            name=""
            onChange={changeFileHandle}
            id="upload"
            type="file"
            className="hidden"
          />
        </div>
      )}
      {file && (
        <div className="my-1 w-full">
          <img
            onClick={removeHandler}
            className="h-10 cursor-pointer"
            src="/images/menus/delete.png"
            alt=""
          />
          <img className="object-cover h-72 w-full" src={file} alt="" />
        </div>
      )}
    </div>
  );
}

export default UploadIMG;
