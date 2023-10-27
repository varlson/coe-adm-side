"use client";
import { IPost, btnTypes, slideType } from "@/types/types";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ImageLoader from "./ImageLoader";
import { dataFormater, deleteSlide } from "@/app/util/api";
import { useRouter, redirect, useSearchParams } from "next/navigation";
import { userUserContext } from "@/app/contextProvider/store";
import { getSession } from "next-auth/react";
import { deleteOnePost } from "@/app/util/apiConsumption";

function Slide({ slide }: { slide: IPost }) {
  const { postItemChange, setPostItemChange } = userUserContext();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const imageLoadingHandler = () => {
    setImageLoading(false);
  };

  const btnDeleteHandler = async (id: string) => {
    setDeleteLoading(true);
    const session = await getSession();
    const token = session?.user.user.access_token;

    deleteOnePost(id, token)
      .then((resp) => {
        console.log(resp);
        setDeleteLoading(false);
        router.push("/posts");
      })
      .catch((error) => {
        console.log(error);
        setDeleteLoading(false);
        router.refresh();
      });
  };

  const btnEditHandler = async (id: string) => {
    router.push(`posts/edit/${id}`);
  };

  return (
    <div className="border p-2 card-item">
      {imageLoading && <ImageLoader />}
      <img
        onLoad={imageLoadingHandler}
        className="rounded-md h-36 w-full object-fill"
        src={slide.img}
        alt=""
      />
      <div className="flex gap-1 items-center py-1">
        <p className="text-black font-semibold text-xs text-justify">
          {slide.title}
        </p>
      </div>
      <div className="flex text-xs mb-4 justify-end flex-col">
        <div className="flex flex-col items-end">
          <p>Criado por</p>
          <p className="font-semibold">{slide.author}</p>
          <p className="font-thin text-sm text-black">
            {dataFormater(slide?.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex gap-2 justify-around">
        <Button
          id={slide._id}
          btnHandler={btnEditHandler.bind(null, slide._id)}
          btnType={btnTypes.btnWarning}
          label="Editar"
        />
        <Button
          isLoading={deleteLoading}
          id={slide._id}
          btnHandler={() => {
            btnDeleteHandler(slide._id || "");
          }}
          btnType={btnTypes.btnDanger}
          label="Deletar"
        />
      </div>
    </div>
  );
}

export default Slide;
