"use client";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import MenuItem from "./components/Ui/MenuItem";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { GetMe } from "./util/api";
import { setLocalStorage } from "./util/utilClientSide";
import { IQuery, userType } from "@/types/types";
import { userUserContext } from "./contextProvider/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loader from "./components/Ui/Loader";
export default function Home() {
  const { setUser, user } = userUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const token = session.data?.user.user.access_token;
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);
  return (
    <main className="bg-darkLight">
      {!isLoading ? (
        <div className="m-auto w-9/12 p-2 grid place-items-center">
          <div className="self-center grid grid-cols-4 gap-10 bg-white shadow-md p-5">
            <MenuItem
              isClickable={true}
              label="Slides"
              link="/slides"
              img="slide.png"
            />
            <MenuItem
              isClickable={user?.premissionRole == 1 ? true : false}
              bgColor={`${user?.premissionRole == 2 ? "bg-slate-300" : ""}`}
              label="Usuarios"
              link="/users"
              img="account.png"
            />
            <MenuItem
              isClickable={true}
              label="Posts"
              link="posts"
              img="post.png"
            />
            <MenuItem
              isClickable={true}
              label="Editais"
              link="/editais"
              img="edital.png"
            />
          </div>
        </div>
      ) : (
        <div className="m-auto w-9/12 p-2 grid place-items-center">
          <Loader size="80" color="red" />
        </div>
      )}
    </main>
  );
}
