import {
  getMovieDetailBySlug,
} from "../axios/movieapi";

export const enrichMovieList = async (items) => {
  const movies = await Promise.all(
    items.map(async (item) => {
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

  return movies.filter(Boolean);
};
