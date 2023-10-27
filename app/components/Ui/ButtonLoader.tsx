import React from "react";

function ButtonLoader({ children }: { children: React.ReactNode }) {
  return (
    <div className="btnLoader bg-basicRed flex justify-center"> {children}</div>
  );
}

export default ButtonLoader;
