import { useState, useRef } from "react";
import HoverCardPreview from "./HoverCardPreview";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

const MovieCardPopular = ({
  title,
  image,
  year,
  duration,
  rating,
  heightImg,
  genres = [],
  trailer,
  slug,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const [cardPosition, setCardPosition] = useState(null); // Lưu vị trí của card
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect(); // Lấy vị trí của card
        setCardPosition(rect); // Cập nhật vị trí của card
        const viewportWidth = window.innerWidth;
        const shouldAlignRight = rect.left + 700 > viewportWidth; // Tính toán để căn chỉnh nếu không vừa với viewport
        setAlignRight(shouldAlignRight);
      }
      setShowPreview(true);
    }, 1200);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowPreview(false);
    }, 200); // delay ẩn để tránh giật khi rê chuột qua lại nhanh
  };
  const imgUrl = image?.includes("https://phimimg.com/")
    ? image
    : `https://phimimg.com/${image}`;

  return (
    <div
      ref={cardRef}
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Movie Card */}
      <Link to={`/phim/${slug}`}>
        <div className="p-3 rounded-lg transition text-white cursor-pointer">
          <img
            src={imgUrl}
            alt=""
            className={`rounded-lg mb-4 object-cover w-full ${
              heightImg || "h-auto"
            }`}
          />
          <h3 className="text-lg font-medium truncate">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
            <span>{year}</span>
            <span>{duration}</span>
            <span>{rating}</span>
          </div>
        </div>
      </Link>

      {/* HoverCardPreview */}
      {showPreview &&
        ReactDOM.createPortal(
          <HoverCardPreview
            alignRight={alignRight}
            showPreview={showPreview}
            videoSrc={trailer}
            title={title}
            year={year}
            duration={duration}
            rating={rating}
            slug={slug}
            genres={genres}
            cardPosition={cardPosition} // Truyền vị trí vào HoverCardPreview
          />,
          document.body
        )}
    </div>
  );
};

export default MovieCardPopular;
