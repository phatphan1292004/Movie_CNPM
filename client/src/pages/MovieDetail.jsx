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
import { toast } from "react-toastify";
import axios from "axios";
import ReviewList from "../module/details/ReviewList";
import SelectCollectionModal from "../modal/SelectCollectionModal";
import axiosClient from "../axios/axiosClient";
import useUserStore from "../store/useUserStore";

const MovieDetail = () => {
  const [reviews, setReviews] = useState([]);
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetailBySlug(slug);
        if (isMounted) {
          setMovie(data?.movie || null);
          setEpisodes(data?.episodes || []);
          console.log("Movie data:", data);

          const categorySlug = data?.movie?.category?.[0]?.slug;
          if (categorySlug) {
            const related = await getRelatedMovies(categorySlug, slug);
            setRelatedMovies(related);
          }
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.error("Error loading movie from phimapi.com:", err);
      }
    };

    fetchMovie();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  //6.1.1 Mở Popup SelectionCollectionModal
  const toggleFavorite = () => {
    if (!user) {
      toast.error("Bạn chưa đăng nhập vào hệ thống");
      return;
    } else {
      setShowModal(true); 
    }
  };

  useEffect(() => {
    const checkInCollections = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id || !slug) return;

      try {
        const res = await axiosClient.get(`/favorites/${user.id}/collections`);
        const collections = res.data.collections || [];

        const exists = collections.some((c) =>
          c.movies.some((m) => m.slug === slug)
        );

        setIsFavorite(exists);
      } catch (err) {
        console.error("Lỗi khi kiểm tra yêu thích:", err);
      }
    };

    checkInCollections();
  }, [slug]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosClient.post("/review/get-review-slug", { slug });
        setReviews(res.data);
      } catch (err) {
        console.error("❌ Lỗi lấy bình luận:", err);
      }
    };
    if (slug) fetchReviews();
  }, [slug]);
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[9999] flex flex-col items-center justify-center text-primary">
        <div className="w-10 h-10 border-4 border-t-transparent border-primary rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold opacity-80">
          Đang tải dữ liệu phim...
        </p>
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
                  <ReviewForm slug={slug}></ReviewForm>
                  <ReviewList reviews={reviews} />
                </div>
              </div>
            </div>
          </div>
          {/*  Modal chọn bộ sưu tập */}
          <SelectCollectionModal
            show={showModal}
            setShow={setShowModal}
            slug={slug}
            movieInfo={{
              title: movie.name,
              img: movie.thumb_url,
              slug: slug,
            }}
            setIsFavorite={setIsFavorite}
          />
        </Layout>
      )}
    </>
  );
};

export default MovieDetail;
