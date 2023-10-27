"use client";
import React, { useEffect, useState } from "react";
import EditPost from "../../components/Partials/EditPost";
import { useRouter } from "next/navigation";
import { IPost } from "@/types/types";
import { getPost } from "@/app/util/api";
import ErrorHandler from "@/app/components/Ui/ErrorHandler";
import { userUserContext } from "@/app/contextProvider/store";
import { listOnePost } from "@/app/util/apiConsumption";
import { getSession } from "next-auth/react";

function page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<IPost | string>("");
  const { user } = userUserContext();

  useEffect(() => {
    const fetchData = async (id: string) => {
      const session = await getSession();
      const token = session?.user.user.access_token;
      listOnePost(id, token)
        .then((resp) => {
          const data: IPost = resp;
          setPost(data);
        })
        .catch((error) => {
          setPost(error);
        });
    };

    fetchData(params.slug);
  }, []);

  return (
    <div className="bg-darkLight w-full">
      <div className=" w-9/12 m-auto">
        {typeof post === "string" ? (
          <ErrorHandler error={post} />
        ) : (
          <EditPost post={post} />
        )}
      </div>
    </div>
  );
}

export default page;
