import { Link } from "react-router-dom";
import Button from "../../components/button/Button";

const HoverCardPreview = ({
  videoSrc,
  title,
  year,
  duration,
  rating,
  alignRight = false,
  showPreview = false,
  genres,
  cardPosition,
  slug,
}) => {
  if (!cardPosition || !videoSrc) return null;

  const getEmbedAutoplayURL = (url) => {
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`;
  };
  console.log(slug);

  return (
    <div
      className={`fixed ${
        alignRight ? "right-0" : "left-0"
      } -translate-y-6 w-[500px] bg-black rounded-lg shadow-2xl z-50
        transition-opacity transition-transform duration-500 ease-in-out
        ${
          showPreview
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      style={{
        top: cardPosition.top - 100,
        left: cardPosition.left + cardPosition.width / 2 - 250,
      }}
    >
      <div className="relative w-full h-[250px] rounded-t-lg overflow-hidden">
        {showPreview && (
          <iframe
            src={getEmbedAutoplayURL(videoSrc)}
            className="w-full h-full inset-0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>

      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-2">
          {year} · {duration} · {rating}
        </p>
        {genres?.length > 0 && (
          <div className="flex gap-2 text-sm mt-3 flex-wrap">
            {genres.map((g, i) => (
              <span key={i} className="bg-white/10 px-2 py-1 rounded">
                {g}
              </span>
            ))}
          </div>
        )}
        <Button to={`/phim/${slug}`} className="mt-10 h-[56px]">View Details</Button>
      </div>
    </div>
  );
};

export default HoverCardPreview;
