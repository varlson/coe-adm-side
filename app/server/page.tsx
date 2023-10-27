import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const serverSide = async () => {
  return (
    <div>
      <p>Authenticated user </p>
    </div>
  );
};

export default serverSide;
