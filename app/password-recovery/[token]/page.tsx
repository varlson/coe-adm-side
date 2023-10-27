"use client";
import Loader from "@/app/components/Ui/Loader";
import ResetPassword from "@/app/components/Ui/ResetPassword";
import { userUserContext } from "@/app/contextProvider/store";
import { verifyToken } from "@/app/util/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [isPprocessing, setIsPprocessing] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [token, setToken] = useState("");

  verifyToken(params.token as string)
    .then((resp) => {
      if (resp.success) {
        setToken(resp?.token as string);
        setIsTokenValid(true);
        setIsPprocessing(false);
      } else {
        setIsPprocessing(false);
      }
    })
    .catch((error) => {
      setIsPprocessing(false);
    });

  if (isPprocessing)
    return (
      <div className="flex justify-center w-9/12 m-auto">
        <Loader size="150" color="red" />
      </div>
    );

  if (isTokenValid) return <ResetPassword token={token} />;

  return (
    <div className="w-9/12 m-auto">
      <div className="my-2 flex justify-center">
        <img src="/images/expired.png" alt="" />
      </div>
      <p className="text-basicRed font-2xl text-center ">
        O link que você visitou expirou, tente novamente
      </p>
    </div>
  );
}

export default page;
