import React from "react";

const loading = () => {
  return (
    <div className="h-screen w-full loading-icon flex items-center justify-center">
      <div>
        <div className="loader book">
          <figure className="page"></figure>
          <figure className="page"></figure>
          <figure className="page"></figure>
        </div>

        <h1>Loading</h1>
      </div>
    </div>
  );
};

export default loading;
