import React from "react";

export type userType = {
  name: string;
  username: string;
  _id?: string;
  avatar?: string;
  premissionRole?: number | string;
  activityStatus?: boolean;
  password?: string;
};

export type slideType = {
  title: string;
  body: string;
  author: string;
  img: string;
  date: string;
  id: string;
};

export enum btnTypes {
  btnPrimary,
  btnWarning,
  btnDanger,
}

export type IQuery = {
  pathname: string;
  query: {
    name: string;
  };
};

// export type IPost = {
//   title: string;
//   body: string;
//   author: string;
//   createdAt: string;
//   _id: string;
//   img: string;
//   isSlide: boolean;
// };

export type IPost = {
  noticeNumber?: string;
  _id?: string;
  title: string;
  img: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
  postType: number;
  author: any;
  edit_by?: any;
};

export enum PostTypes {
  SLIDE = 1,
  NEWS,
  NOTICE,
}

export type loginReturnInfoType = {
  accessToken: string;
  id: string;
  username: string;
  name: string;
};

export type loginResponseType = {
  success: boolean;
  msg?: string;
  user: loginReturnInfoType;
};

export type getMeReqType = {
  msg: string;
  success: boolean;
  user: {
    username: string;
    name: string;
    avatar: string;
    _id: string;
    premissionRole: number;
  };
};

export type createPostResponse = {
  success: boolean;
  msg: string;
  content?: any;
};

export type blobType = string | null;
export type UploadIMGTypeProps = {
  role: string;
  isImageUploaded: boolean | null;
  file: blobType;
  postType: PostTypes;
  changeFileHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeHandler: () => void;
};
