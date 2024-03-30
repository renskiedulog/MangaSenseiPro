import React from "react";

const page = ({ params }: { params: any }) => {
  return <div className="text-white">{params.id}</div>;
};

export default page;
