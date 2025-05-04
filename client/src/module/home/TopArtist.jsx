import CategoryHeading from "../../module/category/CategoryHeading";
import React from "react";

const TopArtist = ({ nameArtist = "", imgUrl = "" }) => {
  return (
    <div className="container mt-20">
      <CategoryHeading className="font-semibold text-2xl">Top Artist</CategoryHeading>
      <div className="flex flex-col gap-5 w-[200px] mt-10 py-5 transition-transform duration-300 hover:-translate-y-2">
        <div className="rounded-full w-[200px] h-[200px] overflow-hidden border-2 border-primary ">
          <img src={imgUrl} alt="" />
        </div>
        <span className="text-lg font-semibold text-center">{nameArtist}</span>
      </div>
    </div>
  );
};

export default TopArtist;
