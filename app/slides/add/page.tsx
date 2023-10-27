import AddItem from "@/app/components/Partials/AddItem";
import React from "react";
function add() {
  return (
    <div className="">
      <div className="w-9/12 m-auto p-2">
        <AddItem role="Slides" postType={1} />
      </div>
    </div>
  );
}

export default add;
