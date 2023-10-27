"use client";
import React from "react";
function Logo() {
  return (
    <div className="text-white">
      <div className="p-2 flex items-center">
        <img className="h-20 " src="/images/Logomarc.png" alt="" />
        <div className="text-center">
          <p className="text-lg">Colegiado do Curso de Engenharia Elétrica</p>
          <p className="text-sm font-extralight">
            ICEA - Campus João Monlevade - MG - Brasil
          </p>
        </div>
      </div>
    </div>
  );
}

export default Logo;
