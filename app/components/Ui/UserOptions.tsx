"use client";

import { un_caching } from "@/app/util/utilClientSide";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
function UserOptions() {
  const logOutHandler = () => {
    signOut();
    un_caching();
  };
  return (
    <div className="p-2 bg-basicRed rounded px-3 text-white">
      <ul className="flex flex-col items-center divide-y">
        <li className=" op-item cursor-pointer my-1">Preferencias</li>
        <Link href="/my-account">
          <li className=" op-item curslogoutor-pointer my-1">Conta</li>
        </Link>
        <li onClick={logOutHandler} className=" op-item cursor-pointer my-1">
          Sair
        </li>
      </ul>
    </div>
  );
}

export default UserOptions;
