import {
  IPost,
  createPostResponse,
  getMeReqType,
  loginResponseType,
  userType,
} from "@/types/types";
import {
  getWithNonCredentialOptions,
  getWithCredentialOptions,
  postWithCredentialOptions,
  postWithNonCredentialOptions,
} from "./../constants/requestHeader";

export const listPosts = async (postType: number, token: string) => {
  const fetchOptions = getWithCredentialOptions(token);
  return new Promise<IPost[] | string>(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/posts/lists/${postType}`,
        fetchOptions
      );

      const resp = await promResp.json();
      if (resp.success) {
        resolve(resp.posts);
      }

      reject(resp.msg);
    } catch (error: any) {
      reject(
        error.message || "Houve um erro interno, post nao pode ser listado"
      );
    }
  });
};

export const listOnePost = async (id: string, token: string) => {
  const fetchOptions = getWithCredentialOptions(token);
  return new Promise(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/posts/${id}`,
        fetchOptions
      );

      const resp = await promResp.json();
      if (resp.success) {
        resolve(resp.post);
      }

      reject(resp.msg);
    } catch (error: any) {
      reject(
        error.message || "Houve um erro interno, item não pode ser listado"
      );
    }
  });
};

export const deleteOnePost = async (id: string, token: string) => {
  const fetchOptions = getWithCredentialOptions(token);
  return new Promise(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/posts/delete/${id}`,
        fetchOptions
      );

      const resp = await promResp.json();
      if (resp.success) {
        resolve(resp.msg);
      }

      reject(resp.msg);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateOnePost = async (
  content: FormData,
  token: string,
  id: string
) => {
  const fetchOptions = postWithCredentialOptions(token, content);
  return new Promise<{ success: boolean; msg: string; error?: any }>(
    async (resolve, reject) => {
      try {
        const promResp = await fetch(
          `http://localhost:3222/api/posts/update/${id}`,
          fetchOptions
        );

        const resp = await promResp.json();
        if (resp.success) {
          resolve(resp);
        }

        reject(resp);
      } catch (error) {
        reject(error);
      }
    }
  );
};

export const login = async (content: {
  username: string;
  password: string;
}) => {
  const fetchOptions = postWithNonCredentialOptions(content);
  return new Promise<loginResponseType>(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/login`,
        fetchOptions
      );

      const resp = await promResp.json();
      if (resp.success) {
        resolve(resp);
      }

      reject(resp);
    } catch (error) {
      reject(error);
    }
  });
};

export const getMe = async (token: string) => {
  const fetchOptions = getWithCredentialOptions(token);

  return new Promise<getMeReqType>(async (resolve, reject) => {
    try {
      const promisseResp = await fetch(
        `http://localhost:3222/api/auth/me`,
        fetchOptions
      );

      const resp = await promisseResp.json();

      if (resp.success) {
        resolve(resp.user);
      } else {
        reject(resp.msg);
      }
    } catch (error: any) {
      reject(error.msg || "Ocorreu um erro interno");
    }
  });
};

export const createPost = async (content: FormData, token: string) => {
  const fetchOptions = postWithCredentialOptions(token, content);
  return new Promise<createPostResponse>(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/posts/create`,
        fetchOptions
      );

      const resp = await promResp.json();
      if (resp.success) {
        resolve(resp);
      }

      reject(resp);
    } catch (error) {
      reject(error);
    }
  });
};

type listUserReqType = {
  [key: string]: userType | string;
};
export const listUser = async (id: string, token: string) => {
  const fetchOptions = getWithCredentialOptions(token);
  return new Promise<listUserReqType>(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/auth/user/${id}`,
        fetchOptions
      );

      const resp = await promResp.json();
      if (resp.success) {
        resolve(resp.user);
      }

      reject(resp.msg);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = async (token: string, content: FormData) => {
  const fetchOptions = postWithCredentialOptions(token, content);

  return new Promise(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/auth/user/${id}`,
        fetchOptions
      );

      const resp = await promResp.json();
      if (resp.success) {
        resolve(resp.user);
      }

      reject(resp.msg);
    } catch (error) {
      reject(error);
    }
  });
};
