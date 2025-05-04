import { useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import { getNewMovie, getMovieDetailBySlug } from "../../axios/movieapi";
import useMovieStore from "../../store/useMovieStore";

const TrendingMovie = () => {
  const setNewMovies = useMovieStore((state) => state.setNewMovies);
  const newMovies = useMovieStore((state) => state.newMovies);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getNewMovie();
  
      if (data?.items) {
        const moviesToFetch = data.items.slice(0, 20); // 👈 lấy 20 phim đầu
  
        const detailedMovies = await Promise.all(
          moviesToFetch.map(async (item) => {
            try {
              const detail = await getMovieDetailBySlug(item.slug);
              const movie = detail?.movie;
  
              return {
                title: movie?.name,
                image: movie?.thumb_url,
                year: movie?.year,
                duration: movie?.time,
                rating: movie?.rating,
                genres: movie?.category?.map((g) => g.name),
                trailer: movie?.trailer_url || movie?.trailer || null,
                slug: item.slug,
              };
            } catch (err) {
              console.warn("❌ Lỗi fetch chi tiết phim:", item.slug);
              return null;
            }
          })
        );
  
        setNewMovies(detailedMovies.filter(Boolean));
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <MovieSection
      title="Trending Movies"
      movies={newMovies}
      isLoading={isLoading}
    />
  );
};

export default TrendingMovie;
