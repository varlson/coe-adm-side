"use client";
import React, { useContext } from "react";
import UserOptions from "./UserOptions";
import { userUserContext } from "@/app/contextProvider/store";
import { MdOutlineExpandMore } from "react-icons/md";
import Button from "./Button";
function User() {
  const userOptionsHandle = () => {
    const userOptions = document.querySelector(
      "#userOptions"
    ) as HTMLAnchorElement;

    console.log("userOptions.style.maxHeight");
    console.log(userOptions.style.maxHeight);

    if (userOptions.style.maxHeight === "0px" || !userOptions.style.maxHeight) {
      userOptions.style.maxHeight = userOptions.scrollHeight + "px";
    } else {
      userOptions.style.maxHeight = "0px";
    }
  };
  const { user } = userUserContext();

  return (
    <div className="text-white">
      <div className="items-center flex gap-2">
        <div className="bg-basicRed rounded-full p-1 ">
          <img className=" h-8 w-8" src="/images/Account.png" alt="" />
        </div>
        {user ? (
          <div
            onClick={userOptionsHandle}
            className="username cursor-pointer flex gap-1 items-center border relative border-darkRed px-2 py-1 rounded-md"
          >
            <p className=" text-sm">{user?.name.split(" ")[0]}</p>
            <img
              className="object-contain h-4 w-4 mx-1"
              src="/images/expand_arrow.png"
              alt=""
            />
            <div
              id="userOptions"
              className="w-full absolute user-options left-1"
            >
              <UserOptions />
            </div>
          </div>
        ) : (
          <Button isLoading={true} />
        )}
      </div>
    </div>
  );
}

export default User;
