"use client";
import React, { useEffect, useState } from "react";
import Loader from "../components/Ui/Loader";
import { userUserContext } from "../contextProvider/store";
import Button from "../components/Ui/Button";
import { btnTypes } from "@/types/types";
import { AiOutlineCloudUpload } from "react-icons/ai";

function page() {
  const nameUpdate = async () => {};

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const { user } = userUserContext();
  useEffect(() => {
    // const listUser =
  }, []);

  if (isLoading)
    return (
      <div className="w-9/12 m-auto p-2">
        <div className="my-3 col-span-5 flex justify-center">
          <Loader size="75" color="red" />
        </div>
      </div>
    );

  return (
    <div className="flex justify-center text-center text-basicRed text-2xl">
      Em breve ...
    </div>
    // <div className="w-9/12 m-auto p-2">
    //   <div className="border grid grid-cols-5 p-4 my-2">
    //     <div className="col-span-2 ">
    //       <div className="w-36 h-36 relative bg-upload-avatar">
    //         <div className=" rounded cursor-pointer absolute text-3xl left-0 right-0 top-0 bottom-5 text-white flex items-end justify-center">
    //           <AiOutlineCloudUpload />
    //         </div>
    //         <img
    //           className=" w-36 object-cover"
    //           src={user?.avatar ? user?.avatar : "/images/user.png"}
    //           alt=""
    //         />
    //       </div>
    //     </div>

    //     <div className="col-span-3 self-center grid gap-y-3">
    //       <input value={user?.name} className="input" type="text" />
    //       <div className="justify-self-end">
    //         <Button
    //           isLoading={isUpdating}
    //           btnType={btnTypes.btnWarning}
    //           label="Atualizar"
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="border grid grid-cols-5 gap-3 p-4 my-3">
    //     <div className="font-bold self-center flex text-center">
    //       Alterear a senha:
    //     </div>
    //     <div className="col-span-4">
    //       <input placeholder="Senha atual" className="input my-2" type="text" />
    //       <input placeholder="Nova senha" className="input my-2" type="text" />
    //       <div className="my-3 p-1">
    //         <Button
    //           isLoading={isChanging}
    //           btnType={btnTypes.btnWarning}
    //           label="Alterar"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default page;
