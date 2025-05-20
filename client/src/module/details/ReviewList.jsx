import React from "react";

const ReviewList = ({ reviews }) => {
  if (!reviews.length) {
    return <p className="text-sm text-gray-400 mt-4">There are no reviews yet.</p>;
  }

  return (
    <div className="space-y-6 mt-4">
      {reviews.map((r) => (
        <div
          key={r._id}
          className="bg-[#1c1a2e] p-5 rounded-lg shadow-md border border-[#2c2a40]"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-white font-semibold text-lg">{r.name}</p>
              <p className="text-gray-500 text-xs">
                {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-yellow-400 text-base">
              {"★".repeat(r.rating)}
              <span className="text-gray-600">
                {"☆".repeat(5 - r.rating)}
              </span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{r.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;