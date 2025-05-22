import React from "react";
import Layout from "../components/layout/Layout";
import Banner from "../components/banner-trailer/Banner";
import TrendingMovie from "../module/home/TrendingMovie";
import TVShow from "../module/home/TVShow";
import TopArtist from "../module/home/TopArtist";
import MovieListFetcher from "../module/home/MovieListFetcher";

const HomePage = () => {
  return (
    <>
      <Layout>
        <Banner></Banner>
        <TrendingMovie></TrendingMovie>
        <MovieListFetcher title="Phim Bộ" type="series" pages={[1, 2]} />
        <MovieListFetcher title="Phim Lẻ" type="single" pages={[1, 2]} />
        <MovieListFetcher title="Anime" type="anime" pages={[1, 2]} />
        <MovieListFetcher title="TV Shows" type="tv" pages={[1, 2]} />
        <TopArtist
          imgUrl="https://images.unsplash.com/photo-1741850821836-a0228e561406?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
          nameArtist="Alayla Ocheco"
        ></TopArtist>
      </Layout>
    </>
  );
};

export default HomePage;
