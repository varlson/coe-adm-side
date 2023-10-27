"use client";
import React, { useEffect, useState } from "react";
import { FakeData, deleteSlide, getSlides } from "@/app/util/api";
import Slide from "../Ui/Slide";
import MenuItem from "../Ui/MenuItem";
import { slideType } from "@/types/types";
import Loader from "../Ui/Loader";
import { userUserContext } from "@/app/contextProvider/store";

function Posts() {
  const [posts, setPosts] = useState<slideType[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const { postItemChange } = userUserContext();

  const btnHandler = async (id: string) => {
    const resp = await deleteSlide(id);
  };

  useEffect(() => {
    const getdata = async () => {
      const resp = await fetch("http://localhost:3222/api/posts");
      const done = await resp.json();
      return done.slides;
    };

    const setDates = async () => {
      const dados = await getdata();
      setPosts(dados);
      setIsloading(false);
    };

    setDates();
  }, [postItemChange]);

  if (isLoading || !posts)
    return (
      <div className="flex items-center justify-center">
        <Loader color="red" />
      </div>
    );

  return (
    <>
      <div className="my-2 flex">
        <MenuItem
          isClickable={true}
          bgColor="bg-white"
          link={"/posts/add"}
          img={"add.png"}
          label="Adicionar"
        />
      </div>
      {posts.length >= 1 ? (
        <div className="grid gap-2 grid-cols-4">
          {posts.map((item, index) => (
            <div className="p-1" key={index}>
              <Slide slide={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-darkRed p-3 rounded-md text-white justify-center items-center">
          <p className="font-bold text-center">Sem posts adicionados aindas</p>
        </div>
      )}
    </>
  );
}

export default Posts;
