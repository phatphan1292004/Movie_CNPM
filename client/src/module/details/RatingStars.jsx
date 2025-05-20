import { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingStars = ({ count = 5, value = 0, onChange = () => {} }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1 text-xl">
      {Array.from({ length: count }).map((_, i) => {
        const index = i + 1;
        return (
          <FaStar
            key={index}
            onClick={() => onChange(index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(0)}
            className={`cursor-pointer transition-colors ${
              index <= (hovered || value) ? "text-yellow-400" : "text-gray-400"
            }`}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;