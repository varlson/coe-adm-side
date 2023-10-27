import { IPost, PostTypes, btnTypes } from "@/types/types";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../Ui/Button";
import { useRouter } from "next/navigation";

import {
  AiFillCloseCircle,
  AiOutlineCloudUpload,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { userUserContext } from "@/app/contextProvider/store";
import { postEditer } from "@/app/util/api";
import BtnLoader from "../Ui/BtnLoader";
import { updateOnePost } from "@/app/util/apiConsumption";
import { getSession } from "next-auth/react";
import Link from "next/link";
function EditPost({ post }: { post: IPost }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [editPost, setEditPost] = useState<IPost>({
    ...post,
  });
  const role =
    editPost.postType == PostTypes.NEWS
      ? "/posts"
      : editPost.postType == PostTypes.SLIDE
      ? "/slides"
      : "/editais";

  const setPost = async (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditPost((prev) => ({ ...prev, [name]: value }));
  };

  const [image, setImage] = useState(editPost.img);
  const [imageBlob, setImageBlob] = useState<File>();
  const [fileName, setFileName] = useState<string>("");

  const setEditPostHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name as string);
    setImageBlob(file);
    const blobUrl = URL.createObjectURL(file as File);
    setImage(blobUrl);
  };

  const goBackHandle = () => {
    router.back();
  };

  const [change, setChange] = useState(true);

  useEffect(() => {
    textAreaHeigth();
  }, []);

  const { user } = userUserContext();

  const textAreaHeigth = () => {
    const textArea = document.getElementById("textarea") as HTMLTextAreaElement;
    textArea.style.height = textArea.scrollHeight + "px";
  };

  const editHandle = async () => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    setIsLoading(true);
    console.log("user");
    console.log(user);
    const data = new FormData();
    data.set("body", editPost.body);
    data.set("title", editPost.title);
    data.set("userUpdateId", user?._id as string);
    data.append("file", imageBlob as any);
    updateOnePost(data, token, editPost._id as string)
      .then((resp) => {
        console.log("edited");
        console.log(resp);
        router.push(role);
      })
      .catch((error) => {
        console.log("edited");
        console.log(error);
      });
  };

  return (
    <div className=" w-9/12 m-auto px-4 py-10">
      <div className="border p-2">
        <label className="font-bold" htmlFor="title">
          Título:
        </label>
        <input
          onChange={setPost}
          className="input my-1"
          value={editPost.title}
          type="text"
          name="title"
          id="title"
        />
        <label className="font-bold" htmlFor="texto">
          Texto:
        </label>
        <textarea
          name="body"
          id="textarea"
          onChange={(e) => {
            textAreaHeigth();
            setPost(e);
          }}
          className="text-justify w-full my-1 p-2  h-auto"
        >
          {editPost.body}
        </textarea>
      </div>

      <div className="border p-2 rouded shadow my-2 relative bg-slate-100">
        {!image && (
          <div className="flex text-6xl h-80 w-full justify-center items-center ">
            <label htmlFor="input">
              <div className="cursor-pointer">
                <AiOutlineCloudUpload />
              </div>
              <input
                onChange={imageChange}
                id="input"
                hidden
                accept={
                  editPost.postType == PostTypes.NOTICE
                    ? "application/pdf"
                    : "image/*"
                }
                type="file"
              />
            </label>
          </div>
        )}
        {image && (
          <div
            onClick={() => {
              setImage("");
              setFileName("");
            }}
            className="cursor-pointer absolute text-basicRed right-2 top-2 text-4xl"
          >
            <MdDeleteForever />
          </div>
        )}
        {image && (
          <>
            <img
              className={`rounded ${
                editPost.postType == PostTypes.NOTICE
                  ? "w-16 h-16 m-auto"
                  : " h-80 object-cover w-full"
              }`}
              src={
                editPost.postType == PostTypes.NOTICE
                  ? "/images/menus/pdf.png"
                  : image
              }
              alt=""
            />
            {editPost.postType == PostTypes.NOTICE && (
              <Link href={editPost.img}>
                <p>{fileName || editPost.img}</p>
              </Link>
            )}
          </>
        )}
      </div>
      <div className=" my-4">
        {isLoading ? (
          <div className="bg-basicRed h-10 flex items-center justify-center rounded">
            <BtnLoader color="white" height={70} width={70} />
          </div>
        ) : (
          <button
            className="w-full px-10 rounded-md py-2 bg-basicRed text-white"
            onClick={editHandle}
          >
            Salvar Alterações
          </button>
        )}
      </div>
    </div>
  );
}

export default EditPost;
