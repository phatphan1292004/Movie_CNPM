import React from "react";

const BackgroundWithOverlay = ({ height, imageUrl }) => {
  return (
    <>
      <div className={`w-full h-[${height}]`}>
        <img
          src={imageUrl}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-black bg-opacity-50 z-10" />
    </>
  );
};

export default BackgroundWithOverlay;
