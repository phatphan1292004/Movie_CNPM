import React from "react";

const RecommendItem = ({ imageUrl, title }) => {
  return (
    <div className="max-w-[300px] flex-shrink-0">
      <img src={imageUrl} alt={title} className="rounded-lg mb-2" />
      <p className="text-sm font-semibold">{title}</p>
    </div>
  );
};

export default RecommendItem;
