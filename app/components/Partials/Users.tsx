"use client";
import { userUserContext } from "@/app/contextProvider/store";
import { setLocalStorage } from "@/app/util/utilClientSide";
import { btnTypes, userType } from "@/types/types";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Switcher from "../Ui/Switcher";
import Button from "../Ui/Button";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { deleteUser, userUpate } from "@/app/util/api";
import { useRouter } from "next/navigation";

type UserTypeProps = {
  user: userType;
  deleteHandler: (id: string) => {};
  resetHandler: (id: string) => {};
};

function Users({ user, deleteHandler, resetHandler }: UserTypeProps) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const { username, name, _id, avatar, premissionRole, activityStatus } = user;
  const getsession = async () => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    return token;
  };
  const router = useRouter();

  const premissionRoleChange = async () => {
    const newRole = premissionRole == 1 ? 2 : 1;
    user.premissionRole = newRole;
    const token = await getsession();
    userUpate(user, token)
      .then((success) => {
        console.log(success);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        router.refresh();
      });
  };

  const statusActivityChange = async () => {
    const newStatus = !activityStatus;
    user.activityStatus = newStatus;
    const token = await getsession();
    userUpate(user, token)
      .then((success) => {
        console.log(success);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        router.refresh();
      });
  };

  const deleteBtn = async () => {
    setDeleteLoading(true);
    await deleteHandler(_id as string);
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const setUserPremissions = () => {
    console.log(isAdmin);
    setIsAdmin(!isAdmin);
  };

  const image = avatar ? avatar : "/images/user.png";
  const label = premissionRole == 1 ? "Tornar Adm-simples" : "Tornar Super-Adm";
  const label1 = activityStatus ? "Desabilitar Usuario" : "Habilitar Usuario";
  const user_type = premissionRole == 1 ? "Super ADMIN" : "ADMIN";
  return (
    <div className="grid grid-cols-5 bg-blue-400 w-9/12 m-auto my-2 gap-4 p-3">
      <div className="col-span-3 grid grid-cols-6 rounded">
        <img className="col-span-2" src={image} alt="" />
        <div className="col-span-4 grid grid-cols-2">
          <p className="font-bold text-2xl uppercase text-center col-span-2">
            {name}
          </p>

          <div className="text-center flex items-center">
            <div className="mx-1 font-light">Nível:</div>
            <div className="mx-1 font-bold">{user_type}</div>
          </div>

          <div className="text-center flex">
            <div className="self-center  mx-1 font-light">Status:</div>
            <div className="self-center  mx-1 font-bold">
              {activityStatus ? "Ativo" : "Inativo"}
            </div>

            <div
              className={`self-center w-4 h-4  ${
                activityStatus ? "bg-green-700" : "bg-basicRed"
              } rounded-full`}
            ></div>
          </div>
          <div className="flex col-span-2 gap-2">
            <p>Email:</p>
            <p>{username}</p>
          </div>
        </div>
      </div>

      <div className="col-span-2 grid grid-cols-2 items-center gap-2">
        <Switcher
          changeHandle={premissionRoleChange}
          label={label}
          switcher={premissionRole == 1 ? true : false}
        />
        <Switcher
          changeHandle={statusActivityChange}
          label={label1}
          switcher={activityStatus ? true : false}
        />
        <div className="col-span-1 ">
          <Button
            isLoading={resetLoading}
            btnHandler={deleteBtn}
            btnType={btnTypes.btnWarning}
            label="Resetar senha"
          />
        </div>

        <div className="col-span-1 ">
          <Button
            isLoading={deleteLoading}
            btnHandler={deleteBtn}
            btnType={btnTypes.btnDanger}
            label="Deletar Usuário"
          />
        </div>
      </div>
    </div>
  );
}

export default Users;
