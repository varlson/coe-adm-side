"use client";
import React, { FormEvent, useState } from "react";
import BtnLoader from "../components/Ui/BtnLoader";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { userUserContext } from "../contextProvider/store";
import { resetPassword } from "../util/api";

function PasswordREcovery() {
  const getToken = async () => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    return token;
  };

  const [loginLoader, setLoginLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState<{
    success: boolean;
    msg: string;
  } | null>(null);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoader(true);
    const token = await getToken();
    resetPassword(username, token)
      .then((resp) => {
        console.log(resp);
        setFeedbackMsg({ success: true, msg: resp });
        setLoginLoader(false);
      })
      .catch((error) => {
        console.log("catch");
        console.log(error);
        setFeedbackMsg({ success: false, msg: error });
        setLoginLoader(false);
      });
  };

  return (
    <div className="bg-darkLight p-0 m-0">
      <div className=" grid place-items-center w-9/12 m-auto ">
        <form onSubmit={submitHandler} action="" className=" w-full ">
          <div className="w-3/5 m-auto gap-x-10  my-10 p-10 grid col-span-1 border shadow-md bg-white">
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="exemplo@email.com"
              className="input mb-3"
              type="email"
              required
              name="username"
            />

            {feedbackMsg && (
              <p
                className={`font-light mb-2 text-sm ml-3 p-2 ${
                  feedbackMsg?.success ? "text-green-400" : "text-red-400"
                }`}
              >
                {feedbackMsg.msg}
              </p>
            )}

            {loginLoader ? (
              <div className="px-4 py-3 bg-basicRed text-white rounded">
                <BtnLoader height={18} width={18} color="white" />
              </div>
            ) : (
              <button
                className="px-4 py-3 bg-basicRed text-white rounded"
                type="submit"
              >
                Recuperar a senha
              </button>
            )}

            <div className="flex justify-end ">
              <Link href="/login">
                <p className=" font-light text-sm my-1 mr-1">Entrar</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordREcovery;
