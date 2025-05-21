import axios from "axios";

const BASE_URL = "https://phimapi.com";
const TMDB_API_KEY = "1ddcfbfdf5ba5f0ad55f5714fab7fa0f";


export const getNewMovie = async (page = 1) => {
  try {
    const res = await axios.get(`/api/danh-sach/phim-moi-cap-nhat`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getSeriesMovies = async (page = 1) => {
  try {
    const res = await axios.get(`/api/danh-sach/phim-bo`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getSeriesMovies error:", error);
    return null;
  }
};

export const getSingleMovies = async (page = 1) => {
  try {
    const res = await axios.get(`/api/danh-sach/phim-le`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getSingleMovies error:", error);
    return null;
  }
};

export const getAnimeMovies = async (page = 1) => {
  try {
    const res = await axios.get(`/api/danh-sach/hoat-hinh`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getAnimeMovies error:", error);
    return null;
  }
};


export const getTVShowMovies = async (page = 1) => {
  try {
    const res = await axios.get(`/api/danh-sach/tv-shows`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getTVShowMovies error:", error);
    return null;
  }
};

export const getMovieDetailBySlug = async (slug) => {
  try {
    const res = await axios.get(`/api/phim/${slug}`);
    return res.data;
  } catch (error) {
    console.error("❌ getMovieDetailBySlug error:", error);
    return null;
  }
};

export const getRelatedMovies = async (categorySlug, currentMovieSlug) => {
  try {
    const res = await axios.get(`/api/tim-kiem`, {
      params: { keyword: categorySlug },
    });

    const movies = res.data?.data?.items || [];
    return movies.filter((movie) => movie.slug !== currentMovieSlug);
  } catch (err) {
    console.error("❌ Related movies error:", err);
    return [];
  }
};


export const getMovieListByType = async (type, page = 1) => {
  try {
    const res = await axios.get(`/api/danh-sach/${type}`, {
      params: { page },
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error loading movie list:", err);
    return null;
  }
};

// gọi dữ liệu từ API https://phimapi.com, bạn có thể tạo một hàm searchMovies sử dụng endpoint
export const searchMovies = async (keyword, page = 1) => {
  try {
    const res = await axios.get(`/api/tim-kiem`, {
      params: {
        keyword,
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ searchMovies error:", error);
    return null;
  }
};



