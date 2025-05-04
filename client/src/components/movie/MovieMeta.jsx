import React from "react";

const MovieMeta = ({ rating, views, year, duration, type }) => (
  <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
    <div className="flex items-center gap-1 text-yellow-400">
      <span>⭐</span>
      <span className="text-white font-semibold">{rating}</span>
    </div>
    <span>· {views} Views</span>
    <span>· {year}</span>
    <span>· {duration}</span>
    <span className="bg-gray-700 text-white px-2 py-1 rounded">{type}</span>
  </div>
);

export default MovieMeta;
