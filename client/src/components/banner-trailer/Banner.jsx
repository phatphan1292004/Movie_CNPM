import React from "react";
import Button from "../button/Button";

const Banner = ({
  title = "John Wick 4",
  subTitle = "Action, Crime, Thriller",
  description = "Enjoy exclusive Amazon Originals as well as popular movies and TV shows.",
  videoSrc = "/banner.mp4",
}) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover scale-125"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
      <div className="absolute top-1/2 pl-20 -translate-y-1/2 z-20">
        <div className="relative text-white">
          <h2 className="text-sm uppercase text-purple-400 font-bold tracking-wide mb-3">
            {subTitle}
          </h2>
          <h1 className="text-7xl font-bold mb-4">{title}</h1>
          <p className="text-base max-w-xl mb-6">
            {description}
          </p>
          <Button className="h-[60px]">Play Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
