import React from 'react';

const RatingStars = ({ count = 5 }) => (
  <div className="flex gap-1 text-yellow-400 text-xl">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i}>★</span>
    ))}
  </div>
);

export default RatingStars;
