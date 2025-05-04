import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({ className = "", onClick = () => {}, children, to = "", type="button" }) => {
  return (
    <NavLink to={to}>
      <button
        type={type}
        className={`px-4 w-[170px] font-semibold rounded-lg bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 shadow-lg hover:opacity-90 transitio ${className || "h-full"}`}
        onClick={onClick}
      >
        {children}
      </button>
    </NavLink>
  );
};

export default Button;
