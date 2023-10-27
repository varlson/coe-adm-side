"use client";

import React, { useEffect } from "react";
import Logo from "../Ui/Logo";
import User from "../Ui/User";
import Button from "../Ui/Button";
import ClientSide from "./ClientSide";
import { btnTypes, userType } from "@/types/types";
import { userUserContext } from "@/app/contextProvider/store";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import {
  caching,
  setLocalStorage,
  un_caching,
} from "@/app/util/utilClientSide";
function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, setUser, setToken } = userUserContext();
  useEffect(() => {
    const getsession = async () => {
      const session = await getSession();
      const token = session?.user.user.access_token;
      if (token) {
        const _user = (await caching(token)) as userType;
        setUser(_user);
        setToken(token);
      } else {
        un_caching();
        // router.push("/login");
      }
    };

    if (!user) {
      getsession();
    }
  }, [pathname, searchParams]);

  return (
    <div className="bg-dark800 ">
      {user && (
        <div className="flex p-2 m-auto w-9/12 justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>
          <User />
        </div>
      )}
    </div>
  );
}

export default Navbar;
