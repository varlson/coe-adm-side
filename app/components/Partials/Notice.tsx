"use client";
import { IPost, btnTypes } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../Ui/Button";
import { dataFormater } from "@/app/util/api";
import { listUser } from "@/app/util/apiConsumption";
import { getSession } from "next-auth/react";

type noticeType = {
  notice: IPost;
  deleteHandler: (id: string) => Promise<void>;
  EditeHandler: (id: string) => void;
};

function Notice({ notice, deleteHandler, EditeHandler }: noticeType) {
  const { title, body, img, author, createdAt } = notice;
  const [authorName, setAuthorName] = useState("Desconhecido");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const deleteBtn = async () => {
    setDeleteLoading(true);
    await deleteHandler(notice._id as string);
  };
  const editBtn = async () => {
    setEditLoading(true);
    EditeHandler(notice._id as string);
  };

  useEffect(() => {
    const setName = async () => {
      const session = await getSession();
      const token = session?.user.user.access_token;
      listUser(author, token)
        .then((user) => {
          setAuthorName(user.name);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("deu erro listando nome de uasurio");
          setIsLoading(false);
        });
    };
    setName();
  }, []);

  return (
    <div className=" p-2">
      <p className="font-bold text-basicRed py-1 my-1">{title}</p>
      <div className=" text-xs flex gap-x-2">
        <p className="font-bold">Criado em:</p>
        <p className="font-light">{`${dataFormater(createdAt)}, por`}</p>
        {!isLoading && <p className="font-bold">{`${authorName}`}</p>}
      </div>
      <p className=" text-basicRed py-1 my-1 text-justify">{body}</p>

      <Link href={img} target="black">
        <div className="flex items-center  my-2">
          <p>Acesse o edital </p>
          <img
            className="mt-2 mb-1 w-6 object-cover"
            src="/images//menus/pdf.png"
            alt=""
          />
        </div>
      </Link>
      <div className="flex gap-x-4 justify-end">
        <Button
          isLoading={deleteLoading}
          btnHandler={deleteBtn}
          btnType={btnTypes.btnDanger}
          label="Deletar"
        />
        <Button
          isLoading={editLoading}
          btnHandler={editBtn}
          btnType={btnTypes.btnWarning}
          label="Editar"
        />
      </div>
    </div>
  );
}

export default Notice;
