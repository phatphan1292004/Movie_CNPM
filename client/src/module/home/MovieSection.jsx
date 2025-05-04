import React, { useRef } from "react";
import ArrowLeft from "../../components/icons/ArrowLeft";
import ArrowRight from "../../components/icons/ArrowRight";
import CategoryHeading from "../../module/category/CategoryHeading";
import MovieCardPopular from "./MovieCardPopular";
import MovieCardSkeleton from "../../components/skeleton/MovieCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles

const MovieSection = ({ title, layout, movies = [], isLoading }) => {
  const swiperRef = useRef(null); 

  {console.log(movies)}
  return (
    <div className="container">
      <div className="w-full mt-20 flex justify-between items-center">
        <CategoryHeading className="font-semibold text-2xl">{title}</CategoryHeading>
        <div className="flex items-center gap-5">
          {/* Custom ArrowLeft */}
          <button onClick={() => swiperRef.current?.swiper.slidePrev()}>
            <ArrowLeft />
          </button>
          {/* Custom ArrowRight */}
          <button onClick={() => swiperRef.current?.swiper.slideNext()}>
            <ArrowRight />
          </button>
        </div>
      </div>
      
      {/* Swiper container */}
      <Swiper
        ref={swiperRef}
        spaceBetween={16}
        slidesPerView={5}
        breakpoints={{
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 2,
          },
        }}
        loop={true}
        navigation={false} 
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index}>
                <MovieCardSkeleton height={"h-[200px]"} />
              </SwiperSlide>
            ))
          : movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieCardPopular {...movie} heightImg={"h-[200px]"} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default MovieSection;
