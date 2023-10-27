import React, { useState } from "react";

type SwitcherType = {
  switcher: boolean;
  label: string;
  changeHandle?: () => void;
};
function Switcher({ switcher, label, changeHandle }: SwitcherType) {
  return (
    <div className="flex gap-2">
      <p className="font-light text-sm">{label}</p>
      <div
        onClick={changeHandle}
        className={`p-1 w-10 rounded grid ${
          switcher ? "bg-basicRed" : "bg-slate-300"
        } cursor-pointer`}
      >
        <div
          className={` ${
            switcher ? "justify-self-end" : "justify-self-start"
          } w-5 h-4 bg-slate-500 `}
        ></div>
      </div>
    </div>
  );
}

export default Switcher;
