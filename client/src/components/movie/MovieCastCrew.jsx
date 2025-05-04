import React from "react";

const MovieCastCrew = ({ cast = [], director = [] }) => (
  <div className="text-sm text-white space-y-4">
    <div className="flex items-center gap-x-2">
      <span className="font-semibold text-white">Cast:</span>
      <div className="flex flex-wrap gap-2 mt-1">
        {cast.map((actor, index) => (
          <span
            key={index}
            className="bg-slate-700 px-2 py-1 rounded-full text-xs"
          >
            {actor}
          </span>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-x-2">
      <span className="font-semibold text-white">Director:</span>
      <div className="flex flex-wrap gap-2 mt-1">
        {director.map((director, index) => (
          <span
            key={index}
            className="bg-slate-700 px-2 py-1 rounded-full text-xs"
          >
            {director}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default MovieCastCrew;
