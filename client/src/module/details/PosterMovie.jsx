import React from "react";

const PosterMovie = ({ leftOffset, posterUrl, isFavorite, onFavoriteToggle }) => {
  return (
    <>
      <div
        className={`absolute bottom-0 left-[${leftOffset}] transform translate-x-[125px] translate-y-1/2 z-20 flex gap-10 items-end px-6`}
      >
        {/* Poster */}
        <div className="w-[500px]">
          <img
            src={posterUrl}
            alt="Movie Poster"
            className="w-full rounded-xl shadow-2xl"
          />

          <button
            //6.1.0 Click icon trái tim ở poster phim
            onClick={onFavoriteToggle}
            className="absolute top-3 right-10 text-xl p-2 bg-white/80 hover:bg-white text-red-600 rounded-full shadow-lg transition"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PosterMovie;
