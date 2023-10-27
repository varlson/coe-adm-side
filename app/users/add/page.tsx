"use client";
import Button from "@/app/components/Ui/Button";
import { userUserContext } from "@/app/contextProvider/store";
import { createUser } from "@/app/util/api";
import { setLocalStorage } from "@/app/util/utilClientSide";
import { btnTypes, userType } from "@/types/types";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";

function addUser() {
  const [createLoading, setCreateLoading] = useState(false);

  const router = useRouter();
  const getToken = async () => {
    const session = await getSession();
    const access_token = session?.user.user.access_token;
    return access_token;
  };

  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<userType>({
    name: "",
    username: "",
    password: "",
    premissionRole: 2,
  });

  const setDates = (
    e: ChangeEvent<HTMLInputElement> | ChangeEventHandler<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getToken();
    createUser(user, token)
      .then((resp) => {
        console.log(resp);
        router.refresh();
        router.push("/users");
      })
      .catch((error) => {
        console.log("catch");
        setError(error);
        console.log(error);
      });
    console.log(user);
  };

  return (
    <div className="w-9/12 m-auto  grid">
      <form
        onSubmit={submitHandle}
        className="gap-x-4 gap-y-2 border px-5 py-2 grid grid-cols-6 justify-self-center bg-blue-300"
      >
        <label htmlFor="name">Nome:</label>
        <input
          onChange={setDates}
          placeholder="Nome"
          className="col-span-6 input"
          type="text"
          name="name"
          value={user.name}
          required
        />
        <label className="col-span-3" htmlFor="name">
          Email:
        </label>

        <label className="col-span-3" htmlFor="name">
          Senha:
        </label>

        <input
          onChange={setDates}
          placeholder="exemplo@email.com"
          className="col-span-3 input"
          type="email"
          name="username"
          required
          value={user.username}
        />
        <input
          onChange={setDates}
          placeholder="senha"
          className="col-span-3 input"
          type="password"
          name="password"
          id="password"
          required
          value={user.password}
        />

        <div className="col-span-6">Nível de acesso:</div>
        <div className="col-span-3 ">
          <select
            onChange={setDates}
            value={user.premissionRole}
            className="w-full p-2 rounded"
            name="premissionRole"
            id=""
          >
            <option value={2}>Admin</option>
            <option value={1}>Super-Admin</option>
          </select>
        </div>
        <div className="col-span-6 my-1">
          {createLoading ? (
            <Button btnType={btnTypes.btnDanger} isLoading={true} />
          ) : (
            <button
              type="submit"
              className="px-4 w-full text-white py-2 bg-basicRed rounded"
            >
              Criar Usuário
            </button>
          )}
        </div>
        {error && (
          <div className="col-span-6">
            <p className="text-basicRed font-light  my-1 ">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default addUser;
