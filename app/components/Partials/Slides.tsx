"use client";
import React, { useEffect, useState } from "react";
import { deleteSlide, getSlides } from "@/app/util/api";
import Slide from "../Ui/Slide";
import MenuItem from "../Ui/MenuItem";
import { slideType } from "@/types/types";
import Loader from "../Ui/Loader";
import { userUserContext } from "@/app/contextProvider/store";
import { getSession, useSession } from "next-auth/react";
import { deleteOnePost } from "@/app/util/apiConsumption";
import { useRouter } from "next/navigation";

function Slides() {
  const { user } = userUserContext();
  const router = useRouter();
  const [dad, setDad] = useState<slideType[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const { postItemChange } = userUserContext();

  const btnHandler = async (id: string) => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    deleteOnePost(id, token)
      .then((resp) => {
        router.refresh();
      })
      .catch((error) => {
        router.refresh();
      });
  };

  useEffect(() => {
    const getdata = async () => {
      const resp = await fetch("http://localhost:3222/api/slides");
      const done = await resp.json();
      return done.slides;
    };

    const setDates = async () => {
      const dados = await getdata();
      setDad(dados);
      setIsloading(false);
    };

    setDates();
  }, [postItemChange]);

  if (isLoading || !dad)
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
          link={`${dad.length >= 5 ? "" : "/slides/add"}`}
          img={`${dad.length >= 5 ? "add_disable.png" : "add.png"}`}
          label="Adicionar"
        />
      </div>
      {dad.length >= 1 ? (
        <div className="grid gap-3 grid-cols-4">
          {dad.map((item, index) => (
            <div className="p-1" key={index}>
              <Slide slide={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-darkRed p-3 rounded-md text-white justify-center items-center">
          <p className="font-bold text-center">Sem slides adicionados aindas</p>
        </div>
      )}
    </>
  );
}

export default Slides;
