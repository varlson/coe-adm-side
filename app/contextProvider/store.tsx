"use client";

import { userType } from "@/types/types";
import React, { createContext, useContext, useState } from "react";

type userContextType = {
  user: userType | null;
  setUser: ({ name, username, _id }: userType) => void;
  postItemChange: boolean;
  setPostItemChange: (current: boolean) => void;
  token: string | null;
  setToken: (token: string) => void;
};

const initiaUserState: userType = {
  name: "",
  username: "",
  _id: "",
};

const UserContext = createContext<userContextType>({
  user: null,
  setUser: () => {},
  postItemChange: false,
  setPostItemChange: () => {},
  token: null,
  setToken: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setUser] = useState<userType | null>(null);
  const [postIChange, setPostIChange] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const setAuthUser = ({ name, username, _id, premissionRole }: userType) => {
    const _user: userType = {
      name,
      username,
      _id,
      premissionRole,
    };
    setUser(_user);
  };

  const value: userContextType = {
    user: authUser,
    setUser: setAuthUser,
    postItemChange: postIChange,
    setPostItemChange: setPostIChange,
    token,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const userUserContext = () => useContext(UserContext);
