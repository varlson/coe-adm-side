import { IPost, loginResponseType, slideType, userType } from "@/types/types";
type credProps = {
  username: string;
  password: string;
};

export const Login = async ({ username, password }: credProps) => {
  const data = {
    username: username,
    password: password,
  };

  return new Promise<loginResponseType>(async (resolve, reject) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      "http://localhost:3222/api/auth/login",
      requestOptions
    );
    const res = await response.json();

    if (res.success) {
      resolve(res);
    } else {
      reject(res);
    }
  });
};

export const GetMe = async (token: string) => {
  return new Promise(async (resolve, reject) => {
    const fetchOptions = {
      method: "GET",
      // credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const resp = await fetch(
        "http://localhost:3222/api/auth/me",
        fetchOptions
      );
      const done = await resp.json();
      if (done.success) {
        resolve(done);
      } else {
        reject(done);
      }
    } catch (error) {
      console.log("um erro interno" + error);
      reject(error);
    }
  });
};

export const getSlides = async () => {
  return new Promise(async (resolve, reject) => {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${"token"}`,
      },
    };

    const resp = await fetch("http://localhost:3222/api/slides", fetchOptions);
    const done = await resp.json();

    if (done.success) {
      const dados = done.slides as slideType[];
      resolve(dados);
    } else {
      reject(done);
    }
  });
};
export const postItems = async (body: FormData) => {
  return new Promise(async (resolve, reject) => {
    const fetchOptions = {
      method: "POST",
      // credentials: "include",
      headers: {
        Authorization: `Bearer ${"token"}`,
      },
      body: body,
    };

    const resp = await fetch("http://localhost:3222/api/posts", fetchOptions);
    const done = await resp.json();

    if (done.success) {
      resolve(done);
    } else {
      reject(done);
    }
  });
};

export const deleteSlide = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    const fetchOptions = {
      method: "GET",
      // credentials: "include",
      headers: {
        Authorization: `Bearer ${"token"}`,
      },
    };

    const resp = await fetch(
      `http://localhost:3222/api/delete-slide/${id}`,
      fetchOptions
    );

    const done = await resp.json();

    if (done.success) {
      resolve(done);
    } else {
      reject(done);
    }
  });
};

export const dataFormater = (date: string) => {
  if (!date) return;
  const data = new Date(date);
  const opcoes = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dataFormatada = data.toLocaleDateString("pt-BR", opcoes as never);

  return dataFormatada;
};

export const getPost = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    const fetchOptions = {
      method: "GET",
    };

    const resp = await fetch(
      `http://localhost:3222/api/posts/${id}`,
      fetchOptions
    ); // const { params } = useRouter();

    const done = await resp.json();

    if (done.success) {
      resolve(done);
    } else {
      reject(done);
    }
  });
};

type listUsersType = {
  users: userType[];
};
type listUsersMsgType = {
  msg: string;
};

export const listUsers = async (token: string) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise<listUsersType | listUsersMsgType>(
    async (resolve, reject) => {
      try {
        const promResp = await fetch(
          `http://localhost:3222/api/auth/users`,
          fetchOptions
        );

        const resp = await promResp.json();
        if (resp.success) {
          resolve(resp.users);
        }
        reject(resp.msg || "Houve um erro, usuarios não podem ser listados");
      } catch (error) {
        reject(
          error.message || "Houve um erro, usuarios não podem ser listados"
        );
      }
    }
  );
};

export const deleteUser = async (token: string, id: string) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/auth/delete-user/${id}`,
        fetchOptions
      );

      const resp = await promResp.json();

      if (resp.success) {
        resolve(resp.msg);
      } else {
        reject(resp.success);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const userUpate = async (user: userType, token: string) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user: user }),
  };

  return new Promise(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/auth/update-user`,
        fetchOptions
      );

      if (!promResp.ok) {
        const errorData = await promResp.json();
        const errorMessage = errorData.error || "Erro na solicitação da API.";
        reject(new Error(errorMessage));
        return;
      }

      const resp = await promResp.json();

      if (resp.success) {
        resolve(resp.msg);
      } else {
        reject(new Error(resp.msg || "Erro desconhecido na resposta da API."));
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Create User
export const createUser = async (user: userType, token: string) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  };

  return new Promise(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/auth/create-user`,
        fetchOptions
      );

      const resp = await promResp.json();

      if (resp.success) {
        resolve(resp.msg);
      } else {
        reject(resp.msg || "Erro desconhecido na resposta da API.");
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const resetPassword = async (username: string, token: string) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ dest_email: username }),
  };

  return new Promise(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/auth/reset-password`,
        fetchOptions
      );

      const resp = await promResp.json();

      if (resp.success) {
        resolve(resp.msg);
      } else {
        reject(resp.msg || "Erro desconhecido na resposta da API.");
      }
    } catch (error) {
      reject(error || error?.msg || "Erro desconhecido na resposta da API.");
    }
  });
};

export const setPassword = async (token: string, newPassword: string) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword: newPassword, token: token }),
  };

  type thenRespType = {
    success: boolean;
    token: string | null;
  };

  return new Promise(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/auth//set-password/`,
        fetchOptions
      );

      const resp = await promResp.json();

      if (resp.success) {
        console.log("success");
        console.log(resp);
        resolve(true);
      } else {
        console.log("false");
        console.log(resp);

        reject(false);
      }
    } catch (error) {
      console.log("catch");
      console.log(error);
      reject(false);
    }
  });
};

export const verifyToken = async (token: string) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  type thenRespType = {
    success: boolean;
    token: string | null;
  };

  return new Promise<thenRespType>(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/auth/set-password/${token}`,
        fetchOptions
      );

      const resp = await promResp.json();

      if (resp.success) {
        console.log("success");
        console.log(resp);
        resolve({ success: true, token: resp.token });
      } else {
        console.log("false");
        console.log(resp);

        reject({ success: false, token: null });
      }
    } catch (error) {
      console.log("catch");
      console.log(error);

      reject({ success: false, token: null });
    }
  });
};

export const postEditer = async (post: FormData, _id: string) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${"token"}`,
    },
    body: post,
  };

  type thenRespType = {
    success: boolean;
    token: string | null;
  };

  return new Promise<thenRespType>(async (resolve, reject) => {
    try {
      const promResp = await fetch(
        `http://localhost:3222/api/edit-post/${_id}`,
        fetchOptions
      );

      const resp = await promResp.json();

      if (resp.success) {
        console.log("success");
        console.log(resp);
        resolve({ success: true, token: resp.token });
      } else {
        console.log("false");
        console.log(resp);

        reject({ success: false, token: null });
      }
    } catch (error) {
      console.log("catch");
      console.log(error);

      reject({ success: false, token: null });
    }
  });
};
