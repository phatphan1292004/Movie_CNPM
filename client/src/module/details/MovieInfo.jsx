import React from "react";
import MovieTitle from "../../components/movie/MovieTitle";
import MovieMeta from "../../components/movie/MovieMeta";
import MovieGenres from "../../components/movie/MovieGenres";
import MovieDescription from "../../components/movie/MovieDescription";
import MovieCastCrew from "../../components/movie/MovieCastCrew";

const MovieInfo = ({name, content, view, year, time, type, actor = [], director = [], category = [], tmdb}) => {
  const genreText = category.map((c) => c.name).join(" · "); 
  return (
    <div>
      <MovieTitle title={name} />
      <MovieMeta
        rating={tmdb.vote_average}
        views={view}
        year={year} 
        duration={time}
        type={type}
      />
      <MovieGenres genres={genreText} />
      <MovieDescription
        description={content}
      />
      <MovieCastCrew
        cast={actor}
        director={director}
      />
    </div>
  );
};

export default MovieInfo;
