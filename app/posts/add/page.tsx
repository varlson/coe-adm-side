import AddItem from "@/app/components/Partials/AddItem";
import React from "react";

function page() {
  return (
    <div className="w-9/12 m-auto p-3">
      <AddItem role="Posts" postType={2} />
    </div>
  );
}

export default page;
