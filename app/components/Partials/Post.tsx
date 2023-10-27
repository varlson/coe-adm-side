import { IPost, btnTypes } from "@/types/types";
import React, { useEffect, useState } from "react";
import ImageLoader from "../Ui/ImageLoader";
import Button from "../Ui/Button";
import { dataFormater } from "@/app/util/api";
import { listUser } from "@/app/util/apiConsumption";
import { getSession } from "next-auth/react";
import Loader from "../Ui/Loader";

type PostProps = {
  post: IPost;
  deleteHandler: (id: string) => {};
  editHandler: (id: string) => {};
};
function Post({ post, deleteHandler, editHandler }: PostProps) {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authorName, setAuthorName] = useState("Desconhecido");
  const deleteBtn = async () => {
    setDeleteLoading(true);
    await deleteHandler(post._id);
    setDeleteLoading(false);
  };
  deleteLoading;
  const editBtn = async () => {
    setEditLoading(true);
    editHandler(post._id);
    setEditLoading(false);
  };

  const imageLoadingHandler = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    const getAuthorName = async () => {
      const session = await getSession();
      const token = session?.user.user.access_token;
      listUser(post.author, token)
        .then((user) => {
          setAuthorName(user.name);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("deu erro listando nome de uasurio");
          setIsLoading(false);
        });
    };

    getAuthorName();
  }, []);

  if (isLoading)
    return (
      <div className="w-9/12 m-auto flex justify-center">
        <Loader color="red" />
      </div>
    );

  return (
    <div className="border p-2 card-item">
      {imageLoading && <ImageLoader />}
      <img
        onLoad={imageLoadingHandler}
        className="rounded-md h-36 w-full object-fill"
        src={post.img}
        alt=""
      />
      <div className="flex gap-1 items-center py-1">
        <p className="text-black font-semibold text-xs text-justify">
          {post.title}
        </p>
      </div>
      <div className="flex text-xs mb-4 justify-end flex-col">
        <div className="flex flex-col items-end">
          <p>Criado por</p>
          <p className="font-semibold">{authorName}</p>
          <p className="font-thin text-sm text-black">
            {dataFormater(post?.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex gap-2 justify-around">
        <Button
          isLoading={editLoading}
          id={post._id}
          btnHandler={editBtn}
          btnType={btnTypes.btnWarning}
          label="Editar"
        />
        <Button
          isLoading={deleteLoading}
          id={post._id}
          btnHandler={deleteBtn}
          btnType={btnTypes.btnDanger}
          label="Deletar"
        />
      </div>
    </div>
  );
}

export default Post;
