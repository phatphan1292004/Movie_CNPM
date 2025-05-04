import React from 'react';
import RatingStars from './RatingStars';
import Button from '../../components/button/Button';

const ReviewForm = () => (
  <div>
    <label className="block text-2xl font-semibold mb-2">Your rating</label>
    <RatingStars />
    <div className="mb-4 mt-5">
      <label htmlFor="review" className="block mb-1">Your review *</label>
      <textarea
        id="review"
        rows="4"
        className="w-full p-2 rounded bg-[#1c1a2e] text-white focus:outline-none"
      ></textarea>
    </div>
    <Button className="h-[60px]">Submit</Button>
    <p className="text-sm text-gray-400 mt-6">There are no reviews yet.</p>
  </div>
);


export default ReviewForm;