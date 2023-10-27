import React from "react";
import Slides from "../components/Partials/Slides";
import { getSlides } from "../util/api";
import { PostTypes, slideType } from "@/types/types";
import { useParams } from "next/navigation";
import ListPosts from "../components/Partials/ListPosts";

async function page() {
  return <ListPosts post_types={PostTypes.SLIDE} />;
}

export default page;
