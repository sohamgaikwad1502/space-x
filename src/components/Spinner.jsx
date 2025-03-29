import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
