import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../axios/movieapi"; // Import hàm gọi API tìm kiếm phim

const SearchPage = () => {
  const [searchParams] = useSearchParams();              // Lấy object chứa các query param từ URL
  const keyword = searchParams.get("keyword");           // Lấy giá trị keyword từ URL, ví dụ: ?keyword=john
  const [results, setResults] = useState([]);            // State lưu kết quả phim trả về từ API

   useEffect(() => {
    const fetchData = async () => {
      if (keyword) {
        const res = await searchMovies(keyword);         // Gọi hàm tìm kiếm phim với từ khóa
        console.log("Kết quả tìm kiếm:", res);           // In ra kết quả trả về để debug
        console.log("👉 res.data.items:", res?.data?.items);
        setResults(res?.data?.items || []);              // Lưu kết quả vào state
      }
    };
    fetchData();                                         // Gọi hàm fetchData mỗi khi keyword thay đổi
  }, [keyword]);                                         // useEffect chỉ chạy lại khi keyword thay đổi

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kết quả cho: "{keyword}"</h1>
      <div className="grid grid-cols-4 gap-4">
        {results.map((movie) => (
          <div key={movie._id} className="rounded shadow p-2 bg-white">
            <img src={`https://phimimg.com/${movie.thumb_url}`} alt={movie.name} className="rounded mb-2" />
            <h2 className="text-sm font-semibold text-black">{movie.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
