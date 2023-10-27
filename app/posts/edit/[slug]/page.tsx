"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IPost } from "@/types/types";
import { getPost } from "@/app/util/api";
import ErrorHandler from "@/app/components/Ui/ErrorHandler";
import { userUserContext } from "@/app/contextProvider/store";
import EditPost from "@/app/components/Partials/EditPost";

function page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<IPost | string>("");
  const { user } = userUserContext();

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const resp = await getPost(id);
        const data: IPost = resp.post;
        setPost(data);
      } catch (error) {
        // console.log("resp error");
        // console.log(error.msg);
        setPost(error.msg);
      }
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
