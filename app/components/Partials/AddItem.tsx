"use client";
import { IPost, PostTypes, blobType, slideType, userType } from "@/types/types";
import { FormEvent, useEffect, useState } from "react";
import Loader from "../Ui/Loader";
import ButtonLoader from "../Ui/ButtonLoader";
import { useRouter } from "next/navigation";
import { postItems } from "@/app/util/api";
import { userUserContext } from "@/app/contextProvider/store";
import { setLocalStorage } from "@/app/util/utilClientSide";
import { useSession } from "next-auth/react";
import BtnLoader from "../Ui/BtnLoader";
import { initialPost } from "@/app/constants/constants";
import { createPost } from "@/app/util/apiConsumption";
import UploadIMG from "../Ui/UploadIMG";
import UploadPDF from "../Ui/UploadPDF";

function AddItem({ postType, role }: { postType: PostTypes; role: string }) {
  const _postType =
    PostTypes.SLIDE == postType ? 1 : PostTypes.NEWS == postType ? 2 : 3;
  const session = useSession();
  const token = session.data?.user.user.access_token;

  const linkto =
    postType == PostTypes.SLIDE
      ? "/slides"
      : postType == PostTypes.NEWS
      ? "/posts"
      : "/editais";

  const { user, setUser } = userUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<blobType>(null);
  const [currentfile, setCurrentFile] = useState<any>(null);
  const [slide, setSlide] = useState<IPost>(initialPost);
  const [isImageUploaded, setIsImageUploaded] = useState<boolean | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const changeFileHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _file = e.target.files?.[0];
    setFileName(e.target.files?.[0].name || "sem nome");
    setCurrentFile(_file);
    const blobUrl = URL.createObjectURL(_file as File);
    setFile(blobUrl);
    // setCurrentFile(null);
    setIsImageUploaded(null);
  };

  const removeHandler = () => {
    setFile(null);
  };

  const setSlideField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSlide((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("submit");
    console.log(currentfile);

    setIsLoading(true);

    if (!currentfile) {
      setIsImageUploaded(false);
      setIsLoading(false);
      return;
    }

    if (!user) {
      const _user: userType = (await setLocalStorage(token)) as userType;
      setUser(_user);
    }

    const data = new FormData();
    data.set("body", slide.body);
    data.set("title", slide.title);
    data.set("resumo", slide.resumo);
    data.set("postType", _postType.toString());
    data.set("author", user?._id as string);
    data.append("file", currentfile);

    if (postType == PostTypes.NOTICE) {
      data.set(
        "noticeNumber",
        `${new Date().getFullYear()}/${slide.noticeNumber}`
      );
    }

    createPost(data, token)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);
        router.push(linkto);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        router.push(linkto);
      });
  };

  return (
    <div className="w-9/12 m-auto p-2 ">
      <form onSubmit={submitHandle} className=" border-basicRed  shadow-md p-2">
        <p className="font-bold my-1 font-Jura text-center border-b border-darkRed pb-2">
          {`Adicione ${role}`}
        </p>
        <div className=" m-auto grid">
          <div className="grid w-full gap-2">
            {postType == PostTypes.NOTICE && (
              <div className="grid gap-x-2">
                <p className="font-bold">Identificação do Edital</p>
                <div className="flex">
                  <div className="flex gap-x-10">
                    <div className="flex flex-col">
                      <label htmlFor="">Ano:</label>
                      <input
                        value={new Date().getFullYear()}
                        className="input"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="">Edital Nº:</label>
                      <input
                        value={slide.noticeNumber}
                        onChange={setSlideField}
                        name="noticeNumber"
                        className="input"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="my-1">
              <p className="">{`Título de ${role}`}</p>
              <input
                className="placeholder-style w-full bg-darkRed text-white font-Jura rounded h-10 px-4 text-center"
                type="type"
                name="title"
                value={slide.title}
                onChange={setSlideField}
                maxLength={55}
                required
                placeholder="Título do post"
              />
            </div>
            <div className="my-1">
              <label htmlFor="resumo">
                <p className="">{`Resumo do ${role}`}</p>
              </label>
              <textarea
                maxLength={100}
                placeholder="Resumo do post"
                required
                name="resumo"
                value={slide.resumo}
                rows={3}
                className="placeholder-style  text-justify text-sm text-white font-Jura rounded  p-4 bg-darkRed w-full"
                onChange={setSlideField}
              />
            </div>
            <div className="my-1">
              <p className="">{`Sobre ${role}`}</p>
              <textarea
                placeholder="O corpo do texto"
                required
                name="body"
                value={slide.body}
                rows={15}
                className="placeholder-style  text-justify text-sm text-white font-Jura rounded  p-4 bg-darkRed w-full"
                onChange={setSlideField}
              />
            </div>
          </div>
          <div className="my-2 ">
            {postType == PostTypes.NOTICE ? (
              <UploadPDF
                role={fileName as string}
                isImageUploaded={isImageUploaded}
                file={file}
                postType={postType}
                changeFileHandle={changeFileHandle}
                removeHandler={removeHandler}
              />
            ) : (
              <UploadIMG
                role={role}
                isImageUploaded={isImageUploaded}
                file={file}
                postType={postType}
                changeFileHandle={changeFileHandle}
                removeHandler={removeHandler}
              />
            )}
          </div>
          {isLoading ? (
            <div className="justify-self-end px-4 bg-basicRed my-2 rounded text-white">
              <BtnLoader color="white" width={30} height={30} />
            </div>
          ) : (
            <button
              type="submit"
              className="justify-self-end px-4 bg-basicRed py-1 rounded text-white my-3"
            >
              {`Criar ${role}`}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddItem;
