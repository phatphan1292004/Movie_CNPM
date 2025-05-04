import React from "react";
import RecommendItem from "./RecommendItem";

const RecommendList = ({ items }) => {
  if (!items?.length) return;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Recommended For You
      </h2>
      <div className="flex gap-6 mb-8 overflow-x-auto">
        {items.map((item, index) => (
          <RecommendItem
            key={item.slug || index} 
            imageUrl={item.thumb_url}
            title={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendList;
