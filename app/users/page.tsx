"use client";
import React, { useEffect, useState } from "react";
import Users from "../components/Partials/Users";
import { btnTypes, userType } from "@/types/types";
import { deleteUser, listUsers } from "../util/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Button from "../components/Ui/Button";
import Link from "next/link";
import Loader from "../components/Ui/Loader";
import { userUserContext } from "../contextProvider/store";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const deleteHandler = async (id: string) => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    if (token) {
      deleteUser(token, id)
        .then((resp) => {
          router.refresh();
        })
        .catch((error) => {
          router.refresh();
        });
    }
  };
  const resetHandler = async (id: string) => {};

  const [users, setUsers] = useState<userType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorListingUsers, setErrorListingUsers] = useState<null | string>(
    null
  );
  const { user } = userUserContext();
  useEffect(() => {
    const getUsers = async () => {
      const session = await getSession();
      const token = session?.user.user.access_token;

      listUsers(token)
        .then((resp) => {
          const filtred = (resp as userType[]).filter(
            (_user) => _user._id != session?.user.user.id
          );
          setUsers(filtred);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorListingUsers(error);
          setIsLoading(false);
        });
    };
    getUsers();
  }, [deleteHandler]);

  if (isLoading)
    return (
      <div className="w-9/12 m-auto justify-center flex">
        <Loader color="red" />
      </div>
    );

  if (errorListingUsers) {
    return (
      <div className="w-9/12 m-auto justify-center flex">
        <p className="text-basicRed text-centter font-bold">
          {errorListingUsers}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-9/12 m-auto">
        <Link href="/users/add">
          <img className="w-16" src="/images/menus/add.png" alt="" />
        </Link>
      </div>
      <div>
        {users.map((user, index) => (
          <Users
            deleteHandler={deleteHandler}
            resetHandler={resetHandler}
            key={index}
            user={user}
          />
        ))}
      </div>
    </>
  );
}

export default page;
