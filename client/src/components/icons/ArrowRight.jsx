const ArrowRight = ({ className = "w-6 h-6" }) => {
  return (
    <div
      className="border border-white rounded-lg p-1.5 cursor-pointer 
              hover:border-purple-500 hover:bg-purple-500/20 
              transition duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    </div>
  );
};

export default ArrowRight;
