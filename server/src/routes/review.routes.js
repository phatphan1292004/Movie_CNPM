
  const express = require("express");
  const router = express.Router();
  const {
    addReview,
    getReviewsBySlug,
  } = require("../controllers/reviewController");

  router.post("/add-review", addReview);
  router.post("/get-review-slug", getReviewsBySlug);

  module.exports = router;
