const MovieCardSkeleton = ({ height = "h-[200px]" }) => (
  <div className="p-3 rounded-lg w-full animate-pulse">
    <div className={`bg-gray-700 rounded-lg mb-4 w-full ${height}`} />
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="flex items-center gap-4 text-sm">
      <div className="h-3 w-10 bg-gray-600 rounded"></div>
      <div className="h-3 w-12 bg-gray-600 rounded"></div>
      <div className="h-3 w-8 bg-gray-600 rounded"></div>
    </div>
  </div>
);

export default MovieCardSkeleton;
