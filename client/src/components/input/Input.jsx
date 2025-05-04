import React from "react";
import { FiSearch } from "react-icons/fi";

const Input = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  icon = <FiSearch size={20} className="text-gray-500" />,
  inputClass = "",
  ...props
}) => {
  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-4 pr-10 py-3 bg-transparent border border-gray-300 rounded-lg
          focus:outline-none focus:border-primary focus:backdrop-blur-lg
          transition all ease-in-out
          ${inputClass}`}
        {...props}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        {icon}
      </div>
    </div>
  );
};

export default Input;
