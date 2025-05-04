import React from "react";
import { Link } from "react-router-dom";

const Category = ({ heading = "", items = [] }) => {
  return (
    <div className="col-span-1">
      <h4 className="font-bold text-lg mb-2 text-primary">{heading}</h4>
      <ul className="space-y-4 text-sm">
        {items.map((item, index) => (
          <li key={index}>
            {typeof item === "string" ? (
              item // fallback nếu item là text thuần
            ) : (
              <Link
                to={item.to}
                className="text-black hover:text-primary transition"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
