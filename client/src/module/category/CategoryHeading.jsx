import React from "react";

const CategoryHeading = ({ children, className = "" }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-[4px] h-[30px] rounded-lg bg-gradient-to-t from-purple-600 via-indigo-500 to-blue-500`}
      ></div>
      <span className={` ${className}`}>{children}</span>
    </div>
  );
};

export default CategoryHeading;
