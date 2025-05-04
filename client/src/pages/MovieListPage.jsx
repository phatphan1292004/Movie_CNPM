import React, { useEffect, useState } from "react";
import { getMovieListByType } from "../axios/movieapi";
import MovieCardPopular from "../module/home/MovieCardPopular";
import Layout from "../components/layout/Layout";
import ReactPaginate from "react-paginate";
import MovieCardSkeleton from "../components/skeleton/MovieCardSkeleton";

const MovieListPage = ({ title, fetchType }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await getMovieListByType(fetchType, page);
        setMovies(res?.data?.items || []);
        setTotalPages(res?.data?.params?.pagination?.totalPages || 1);
      } catch (error) {
        console.error("❌ Failed to fetch movies:", error);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
      }
    };
    fetchMovies();
  }, [fetchType, page]);

  return (
    <Layout>
      <div className="container mt-[120px]">
        <h2 className="text-3xl font-bold mb-6 text-white">{title}</h2>

        {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                  <MovieCardSkeleton height={"h-[200px]"} />
              ))}
            </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCardPopular
                  key={movie.slug}
                  title={movie.name}
                  image={movie.thumb_url}
                  year={movie.year}
                  duration={movie.time}
                  rating={movie.rating || "N/A"}
                  slug={movie.slug}
                  genres={movie.category?.map((c) => c.name)}
                  trailer={movie.trailer_url}
                />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={({ selected }) => setPage(selected + 1)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={totalPages}
                forcePage={page - 1} // Giữ đúng page đang active
                previousLabel="< Prev"
                containerClassName="flex gap-2 text-white"
                pageClassName="px-3 py-1 bg-gray-700 rounded hover:bg-primary"
                activeClassName="bg-primary text-white"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MovieListPage;
