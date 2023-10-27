"use client";

import { userType } from "@/types/types";
import { GetMe } from "./api";
import { userUserContext } from "../contextProvider/store";
import { useSession } from "next-auth/react";
import CryptoJS from "crypto-js";

export const setLocalStorage = async (token: string) => {
  const currentUser = await localStorage.getItem("user");
  let user: userType;

  if (!currentUser) {
    const resp = await GetMe(token);
    if (resp.success) {
      user = resp.user;
      const parser = JSON.stringify(user);
      localStorage.setItem("user", parser);
      return user;
    }
  } else {
    user = JSON.parse(currentUser);
    return user;
  }
};

// export const getSession = async () => {
//   const session = useSession();
//   const token = session.data?.user.user.access_token;
//   return token;
// };

export const caching = async (token: string) => {
  const KEY = process.env.NEXT_PUBLIC_USER_CRYPTO_KEY;

  return new Promise(async (resolve, reject) => {
    if (!KEY) {
      reject("A chave para criptografia nao pode ser acessada");
      return;
    }
    const ciphered_user = localStorage.getItem("cache");

    if (ciphered_user) {
      const user_bytes = CryptoJS.AES.decrypt(ciphered_user, KEY);
      const decryted = user_bytes.toString(CryptoJS.enc.Utf8);
      const user = JSON.parse(decryted);
      resolve(user);
    }

    try {
      const resp = await GetMe(token);

      if (resp?.success) {
        const user = await resp.user;
        const user_stringfied = JSON.stringify(user);

        const cyphered_user = await CryptoJS.AES.encrypt(
          user_stringfied,
          KEY
        ).toString();
        localStorage.setItem("cache", cyphered_user);

        resolve(user);
      } else {
        reject(resp?.msg || "Alguma coisa deu errado");
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const un_caching = () => {
  try {
    localStorage.removeItem("cache");
  } catch (error) {}
};
