"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BtnLoader from "./BtnLoader";
import Link from "next/link";
import { setPassword } from "@/app/util/api";
import { useRouter } from "next/navigation";
import Feedback from "./Feedback";

function ResetPassword({ token }: { token: string }) {
  const [loginLoader, setLoginLoader] = useState(false);
  const [passSetted, setPassSetted] = useState(false);
  const router = useRouter();
  const [isPassMatched, setIsPassMatched] = useState<{
    isMatch: boolean;
    start: boolean;
  }>({ isMatch: false, start: false });
  const [credential, setCredential] = useState({
    password: "",
    re_password: "",
  });

  useEffect(() => {
    console.log("senhas");
    console.log(credential);

    if (credential.re_password.length >= 1) {
      setIsPassMatched((prev) => ({ ...prev, ["start"]: true }));

      if (credential.password == credential.re_password) {
        setIsPassMatched((prev) => ({ ...prev, ["isMatch"]: true }));
      } else {
        setIsPassMatched((prev) => ({ ...prev, ["isMatch"]: false }));
      }
    }

    if (credential.re_password.length == 0) {
      setIsPassMatched((prev) => ({ ...prev, ["start"]: false }));
    }
  }, [credential]);

  const passwordSetter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoader(true);

    console.log("token em reset");
    console.log(token);

    setPassword(token, credential.password)
      .then((resp) => {
        console.log("resp");
        console.log(resp);
        if (resp) {
          setPassSetted(true);
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        router.push("/login");
      });
  };

  if (passSetted) return <Feedback />;

  return (
    <div className="bg-darkLight p-0 m-0">
      <div className=" grid place-items-center w-9/12 m-auto ">
        <form onSubmit={submitHandle} action="" className=" w-full ">
          <div className="w-3/5 m-auto gap-x-10  my-10 p-10 grid col-span-1 border shadow-md bg-white">
            <label htmlFor="">Nova senha</label>
            <input
              value={credential.password}
              onChange={passwordSetter}
              placeholder="Nova sennha"
              className="input mb-5"
              type="password"
              required
              name="password"
            />
            <label htmlFor="">Repetir a senha</label>

            <input
              name="re_password"
              onChange={passwordSetter}
              value={credential.re_password}
              placeholder="Repetir a senha"
              className={`input `}
              type="password"
              required
            />

            {isPassMatched.start && (
              <p
                className={`my-2 ${
                  isPassMatched.isMatch ? "text-green-600" : "text-basicRed"
                } font-light text-sm ml-2`}
              >
                {isPassMatched.isMatch
                  ? "As senhas batem"
                  : "As senhas não batem"}
              </p>
            )}

            {loginLoader ? (
              <div className="mt-4 px-4 py-3 bg-basicRed text-white rounded">
                <BtnLoader height={18} width={18} color="white" />
              </div>
            ) : (
              <button
                disabled={credential.password != credential.re_password}
                className={`px-4 py-3 ${
                  credential.password == credential.re_password
                    ? "bg-basicRed"
                    : "bg-slate-400"
                } text-white rounded my-4`}
                type="submit"
              >
                Alterar a senha
              </button>
            )}

            <div className="flex justify-end my-2">
              <Link href="/password-recovery">
                <p className="underline underline-offset-2 font-light text-xs my-1 mr-1">
                  Esqueceu a senha
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
