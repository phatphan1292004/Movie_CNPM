import BackgroundWithOverlay from "../module/details/BackgroundWithOverlay";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from "react";
import PosterMovie from "../module/details/PosterMovie";
import MovieInfo from "../module/details/MovieInfo";
import RecommendList from "../module/details/RecommendList";
import ReviewForm from "../module/details/ReviewForm";
import { useParams } from "react-router-dom";
import { getMovieDetailBySlug, getRelatedMovies } from "../axios/movieapi";
import EpisodeList from "../module/details/EpisodeList";

const MovieDetail = () => {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    let isMounted = true;
    setIsLoading(true); 
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetailBySlug(slug);
        if (isMounted) {
          setMovie(data?.movie || null);
          setEpisodes(data?.episodes || []);
          console.log("✅ Movie data:", data);

          const categorySlug = data?.movie?.category?.[0]?.slug;
          if (categorySlug) {
            const related = await getRelatedMovies(categorySlug, slug);
            setRelatedMovies(related);
          }
          setIsLoading(false); 
        }
      } catch (err) {
        setIsLoading(false); 
        console.error("❌ Error loading movie from phimapi.com:", err);
      }
    };

    fetchMovie();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Hàm thêm/xoá slug khỏi localStorage
  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = isFavorite
      ? saved.filter((s) => s !== slug)
      : [...saved, slug];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(saved.includes(slug));
  }, [slug]);  

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[9999] flex flex-col items-center justify-center text-primary">
        <div className="w-10 h-10 border-4 border-t-transparent border-primary rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold opacity-80">Đang tải dữ liệu phim...</p>
      </div>
    );
  }
  
  return (
    <>
      {movie && (
        <Layout>
          <div className="relative w-full mt-[90px]">
            <BackgroundWithOverlay height="600px" imageUrl={movie.poster_url} />

            <PosterMovie
              leftOffset="400px"
              posterUrl={movie.thumb_url}
              isFavorite={isFavorite}
              onFavoriteToggle={toggleFavorite}
            />
          </div>

          <div className="mt-[250px] text-white container">
            <div className="ml-[70px]">
              <MovieInfo {...movie}></MovieInfo>
              <EpisodeList episodes={episodes?.[0]?.server_data} />
              <div className="mt-20">
                {relatedMovies.length > 0 && (
                  <RecommendList items={relatedMovies} />
                )}

                <div className="mb-4 mt-20">
                  <ReviewForm></ReviewForm>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default MovieDetail;
