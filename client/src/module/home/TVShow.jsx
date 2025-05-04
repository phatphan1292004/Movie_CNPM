import MovieSection from "./MovieSection";

const trendingData = [
  {
    title: "John Wick 4",
    year: "2023",
    duration: "170 mins",
    rating: "4.5",
    image: "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
  },

  {
    title: "John Wick 4",
    year: "2023",
    duration: "170 mins",
    rating: "4.5",
    image: "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
  },

  {
    title: "John Wick 4",
    year: "2023",
    duration: "170 mins",
    rating: "4.5",
    image: "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
  },

  {
    title: "John Wick 4",
    year: "2023",
    duration: "170 mins",
    rating: "4.5",
    image: "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
  },
];

const TVShow = () => {
  return <MovieSection title="TV Show" movies={trendingData} layout={"xl:grid-cols-4"}/>;
};

export default TVShow;
