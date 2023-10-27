"use client";
import { deleteOnePost, listPosts } from "@/app/util/apiConsumption";
import { IPost, PostTypes } from "@/types/types";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import MenuItem from "../Ui/MenuItem";
import Loader from "../Ui/Loader";

function ListPosts({ post_types }: { post_types: PostTypes }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const deleteHandler = async (id: string) => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    await deleteOnePost(id, token);
    await getPosts();
  };
  const editHandler = async (id: string) => {
    router.push(`/edit-item/${id}`);
  };

  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = async () => {
    const session = await getSession();
    const token = session?.user.user.access_token;
    listPosts(post_types, token)
      .then((_posts) => {
        const postLists = _posts as IPost[];
        setPosts(postLists);
        setIsLoading(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    console.log("efect in posts ");
    console.log();
    const list_post = async () => {
      await getPosts();
    };
    list_post();
  }, []);

  if (isLoading) {
    return (
      <div className="w-9/12 m-auto p-3 grid grid-cols-4">
        <div className="my-1 col-span-4 flex justify-center">
          <Loader color="red" size="100" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-9/12 m-auto p-3 grid grid-cols-4">
      <div className=" justify-self-start mt-2 mb-4 col-span-4">
        <MenuItem
          label=""
          link={
            post_types == PostTypes.NEWS
              ? "posts/add"
              : post_types == PostTypes.NOTICE
              ? "/editais/add"
              : "/slides/add"
          }
          img="add.png"
          bgColor="red"
          isClickable={true}
        />
      </div>
      {posts?.length ? (
        posts.map((post, indexs) => (
          <div key={indexs}>
            <Post
              editHandler={editHandler}
              deleteHandler={deleteHandler}
              post={post}
            />
          </div>
        ))
      ) : (
        <p className="col-span-4 text-center">
          Ainda Não foram adicionados posts
        </p>
      )}
    </div>
  );
}

export default ListPosts;
