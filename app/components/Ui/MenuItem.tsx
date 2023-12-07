import { IQuery } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import Loader from "./Loader";

type menuItemProps = {
  label: string;
  link: string | IQuery;
  img: string;
  bgColor?: string;
  isClickable: boolean;
  isLoading: boolean;
};

function MenuItem({ label, link, img, bgColor, isClickable }: menuItemProps) {
  const [isCliked, setIsCliked] = useState(false);
  if (isCliked) return <Loader color="red" size="75" />;
  if (!isClickable) {
    return (
      <div
        className={`${
          bgColor ? bgColor : "bg-darkRed500"
        } text-white px-3 rounded-md shadow-md`}
      >
        <div className="flex flex-col items-center">
          <img className="h-16" src={`/images/menus/${img}`} alt="" />
          <p>{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={(e) => setIsCliked(true)}
      className={`${
        bgColor ? bgColor : "bg-darkRed500"
      } text-white px-3 rounded-md shadow-md`}
    >
      <Link href={link}>
        <div className="flex flex-col items-center">
          <img className="h-16" src={`/images/menus/${img}`} alt="" />
          <p>{label}</p>
        </div>
      </Link>
    </div>
  );
}

export default MenuItem;
