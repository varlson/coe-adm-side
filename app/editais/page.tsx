"use client";
import React, { useEffect, useState } from "react";
import { deleteOnePost, listPosts } from "../util/apiConsumption";
import { getSession } from "next-auth/react";
import { IPost } from "@/types/types";
import Loader from "../components/Ui/Loader";
import Notice from "../components/Partials/Notice";
import MenuItem from "../components/Ui/MenuItem";
import { useRouter } from "next/navigation";
function page() {
  const [notices, setNotices] = useState<IPost[]>([]);
  const [noticesListMsg, setNoticesListMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getPosts = async () => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    listPosts(3, session?.user.user.access_token)
      .then((resp) => {
        setNotices(resp as IPost[]);
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        setNoticesListMsg(error);
        setIsLoading(false);
        return;
      });
  };

  const deleteHandler = async (id: string) => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    await deleteOnePost(id, token);
    // router.refresh();
  };

  const EditeHandler = (id: string) => {
    router.push(`/edit-item/${id}`);
  };

  useEffect(() => {
    const listNotices = async () => {
      await getPosts();
    };
    listNotices();
  }, [deleteHandler]);

  if (isLoading)
    return (
      <div className="w-9/12 m-auto flex justify-center">
        <Loader color="red" />
      </div>
    );

  if (noticesListMsg)
    return (
      <div className="w-9/12 m-auto">
        <p className="text-basicRed font-bold text-center">{noticesListMsg}</p>
      </div>
    );

  return (
    <div className="w-9/12 m-auto">
      <div className="flex">
        <div className=" justify-self-start mt-2 mb-4 col-span-4">
          <MenuItem
            label=""
            link="/editais/add"
            img="add.png"
            bgColor="red"
            isClickable={true}
          />
        </div>
      </div>

      {notices.map((notice, key) => (
        <div key={key} className="my-1 shadow bg-slate-50 p-2 border">
          <Notice
            EditeHandler={EditeHandler}
            deleteHandler={deleteHandler}
            notice={notice}
          />
        </div>
      ))}
    </div>
  );
}

export default page;
