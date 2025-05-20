const Review = require("../models/Review");

exports.getReviewsBySlug = async (req, res) => {
  try {
    const { slug } = req.body;
    const reviews = await Review.find({ slug }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy bình luận" });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { userId, name, slug, rating, content } = req.body;

    const newReview = new Review({ userId, name, slug, rating, content });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm bình luận" });
  }
};