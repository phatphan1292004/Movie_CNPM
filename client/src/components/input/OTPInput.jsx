import React, { useRef, useState } from "react";

const OTPInput = ({ length = 6, onChange }) => {
  const inputs = Array.from({ length }, () => useRef(null));
  const [values, setValues] = useState(Array(length).fill(""));

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange(newValues.join(""));

    if (value && index < length - 1) {
      inputs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 mb-6">
      {inputs.map((ref, i) => (
        <input
          key={i}
          ref={ref}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={values[i]}
          className="w-12 h-12 text-center text-xl font-semibold border border-gray-400 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
