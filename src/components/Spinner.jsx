import React from "react";

const Spinner = () => {
  return (
    <div className="col-span-full flex justify-center items-center h-40">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="ml-2"> Loading...</div>
    </div>
  );
};

export default Spinner;
