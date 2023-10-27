import { IPost, userType } from "@/types/types";

export const postWithCredentialOptions = (token: string, body: FormData) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  };

  return fetchOptions;
};

export const getWithCredentialOptions = (token: string) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetchOptions;
};

export const postWithNonCredentialOptions = (
  content: FormData | userType | IPost | { username: string; password: string }
) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  };

  return fetchOptions;
};

export const getWithNonCredentialOptions = () => {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchOptions;
};
