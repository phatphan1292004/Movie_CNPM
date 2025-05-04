import { useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import { enrichMovieList } from "../../utils/movieHelper";
import {
  getSeriesMovies,
  getSingleMovies,
  getAnimeMovies,
  getTVShowMovies,
} from "../../axios/movieapi";

const MovieListFetcher = ({
  title = "Danh sách phim",
  type = "series", // "single", "anime", "tv"
  pages = [1],
}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiMap = {
          series: getSeriesMovies,
          single: getSingleMovies,
          anime: getAnimeMovies,
          tv: getTVShowMovies,
        };

        const apiFn = apiMap[type];
        if (!apiFn) {
          throw new Error(`Unknown movie type: ${type}`);
        }

        const results = await Promise.all(pages.map((p) => apiFn(p)));
        const allItems = results.flatMap((r) => r?.data?.items || []);
        const enriched = await enrichMovieList(allItems);

        setMovies(enriched);
      } catch (error) {
        console.error(`❌ Error fetching ${type} movies:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, pages]);

  return (
    <MovieSection title={title} movies={movies} isLoading={isLoading} />
  );
};

export default MovieListFetcher;
