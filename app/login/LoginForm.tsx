"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import BtnLoader from "../components/Ui/BtnLoader";
import Link from "next/link";
import { Login } from "../util/api";
import { getSession } from "next-auth/react";
import Loader from "../components/Ui/Loader";
import { login } from "../util/apiConsumption";
import { caching } from "../util/utilClientSide";

type Props = {
  callbackUrl?: string;
  error?: string;
};

const _getSession = async () => {
  const session = await getSession();
  const token = session?.user.user.access_token;
  return token;
};

function LognForm(props: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);
  const pathName = usePathname();
  useEffect(() => {
    const checkAuthentication = async () => {
      const session = await getSession();
      if (session) {
        router.push("/");
      } else {
        setIsloading(false);
      }
    };

    checkAuthentication();
  }, []);

  const [loginLoader, setLoginLoader] = useState(false);
  const [errorHandler, setErrorHandler] = useState<string | null>(null);

  const [credential, setCredential] = useState({
    username: "mani@gmai.com",
    password: "pass123",
  });

  const credentialHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoader(true);

    try {
      setLoginLoader(true);
      login({ username: credential.username, password: credential.password })
        .then(async (resp) => {
          if (resp.success) {
            const res = await signIn("credentials", {
              redirect: false,
              email: credential.username,
              password: credential.password,
              callbackUrl: "/",
            })
              .then(async (resp) => {
                if (!resp?.error) {
                  setLoginLoader(false);
                  setIsLoggedIn(true);
                  router.push(props.callbackUrl ?? "http://localhost:3000");
                }
              })
              .catch((error) => {
                console.log("faild login");
                console.log(error);
                setErrorHandler(error.message || "Houve uma flha interna");
                setLoginLoader(false);
              });
          } else {
            setErrorHandler(resp.msg || "Houve uma flha interna");
            setLoginLoader(false);
          }
        })
        .catch((error) => {
          console.log(error.msg);
          setErrorHandler(error.msg || "Houve uma flha interna");
          setLoginLoader(false);
        });
    } catch (error) {
      setErrorHandler(error.msg || error || "Houve uma flha interna");
      setLoginLoader(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-9/12 m-auto flex justify-center">
        <Loader color="red" size="100" />
      </div>
    );
  }

  return (
    <div className="bg-darkLight p-0 m-0">
      <div className=" grid place-items-center w-9/12 m-auto ">
        <form onSubmit={submitHandler} action="" className=" w-full ">
          <div className="w-3/5 m-auto gap-x-10  my-10 p-10 grid col-span-1 border shadow-md bg-white">
            <input
              value={credential.username}
              onChange={credentialHandle}
              placeholder="exemplo@email.com"
              className="input mb-10"
              type="email"
              required
              name="username"
            />
            <input
              name="password"
              onChange={credentialHandle}
              value={credential.password}
              placeholder="**************"
              className={`input ${!errorHandler ? "mb-4" : "mb-0"}`}
              type="password"
              required
            />
            {errorHandler && (
              <p className="text-basicRed mb-4 font-extralight text-xs mt-1 ml-4 ">
                {errorHandler}
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
                Entrar
              </button>
            )}

            <div className="flex justify-end ">
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

export default LognForm;
