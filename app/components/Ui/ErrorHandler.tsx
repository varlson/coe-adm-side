import React from "react";

function ErrorHandler({ error }: { error: string }) {
  return (
    <div className="rounded p-2 text-basicRed text-2xl text-center">
      {error}
    </div>
  );
}

export default ErrorHandler;
