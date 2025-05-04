import React from "react";

const MovieGenres = ({ genres = "" }) => {
  const genreList = genres.split(" · ").filter(Boolean);

  return (
    <div className="flex flex-wrap gap-2 text-sm text-white mb-4">
      {genreList.map((genre, index) => (
        <span
          key={index}
          className="bg-[#4b5563] px-3 py-1 rounded-full text-xs" // giống cast badge
        >
          {genre}
        </span>
      ))}
    </div>
  );
};

export default MovieGenres;
