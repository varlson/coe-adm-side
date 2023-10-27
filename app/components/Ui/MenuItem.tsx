import { IQuery } from "@/types/types";
import Link from "next/link";
import React from "react";

type menuItemProps = {
  label: string;
  link: string | IQuery;
  img: string;
  bgColor?: string;
  isClickable: boolean;
};

function MenuItem({ label, link, img, bgColor, isClickable }: menuItemProps) {
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
