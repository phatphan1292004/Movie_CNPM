import React from "react";
import { useController } from "react-hook-form";

const InputField = ({
  label,
  id,
  name,
  control,
  defaultValue = "",
  type = "text",
  placeholder = "",
  className = "",
  ...props
}) => {
  const {
    field,
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm text-gray-300 block mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...field}
        {...props}
        className={`w-full px-4 py-3 
          bg-gray-700/50 text-white rounded-md
          backdrop-blur-sm
          focus:outline-none focus:ring-2 focus:ring-primary focus:bg-primary/20
          transition duration-200 placeholder-gray-400 
          `}
      />
    </div>
  );
};

export default InputField;
