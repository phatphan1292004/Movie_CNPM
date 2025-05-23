import React, { useState } from "react";
import RatingStars from "./RatingStars";
import Button2 from "../../components/button/Button2";
import axios from "axios";
import { toast } from "react-toastify";
import axiosClient from "../../axios/axiosClient";

const ReviewForm = ({slug}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id || !slug || rating === 0 || content.trim() === "") {
      toast.warn("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await axiosClient.post("/review/add-review", {
        userId: user.id,
        name: user.name,
        slug,
        rating,
        content,
      });

      toast.success("✅ Gửi bình luận thành công!");
      setRating(0);
      setContent("");
    } catch (err) {
      toast.error("❌ Gửi bình luận thất bại!");
      console.error("Lỗi gửi bình luận:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-2xl font-semibold mb-2 text-white">
        Your rating
      </label>
      <RatingStars value={rating} onChange={setRating} />

      <div className="mb-4 mt-5">
        <label htmlFor="review" className="block mb-1 text-white">
          Your review *
        </label>
        <textarea
          id="review"
          rows="4"
          className="w-full p-2 rounded bg-[#1c1a2e] text-white focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <Button2 type="submit" className="h-[60px]">
        Submit
      </Button2>
    </form>
  );
};

export default ReviewForm;