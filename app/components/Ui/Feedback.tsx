import React from "react";

function Feedback() {
  return (
    <div className="w-9/12 m-auto">
      <p className="text-green-500 p-2 text-center">
        Senha alterada com successo
      </p>
      <div className="flex justify-center">
        <button className="px-4 py-2 text-white bg-basicRed rounded-md">
          <a href="/login">Fazer login</a>
        </button>
      </div>
    </div>
  );
}

export default Feedback;
