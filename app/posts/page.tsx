"use client";
import React, { useEffect, useState } from "react";
import Slides from "../components/Partials/Slides";
import Posts from "../components/Partials/Posts";
import { deleteOnePost, listPosts } from "../util/apiConsumption";
import { getSession } from "next-auth/react";
import { IPost, PostTypes } from "@/types/types";
import Post from "../components/Partials/Post";
import { useRouter } from "next/navigation";
import ListPosts from "../components/Partials/ListPosts";
function page() {
  return <ListPosts post_types={PostTypes.NEWS} />;
}

export default page;
