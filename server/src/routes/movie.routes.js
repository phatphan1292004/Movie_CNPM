const express = require("express");
const router = express.Router();
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); 


const BASE_URL = "https://phimapi.com";

// GET /api/phim/:slug - lấy chi tiết phim theo slug
router.get("/phim/:slug", async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `detail-${slug}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    console.log("⚡ Trả chi tiết phim từ cache:", cacheKey);
    return res.json(cached);
  }

  try {
    const response = await axios.get(`${BASE_URL}/phim/${slug}`);
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Lỗi gọi phimapi (slug):", error.message);
    res.status(500).json({ error: "Lỗi server khi gọi phimapi (slug)" });
  }
});


// GET /api/danh-sach/:type?page=1 - danh sách phim theo thể loại
router.get("/danh-sach/:type", async (req, res) => {
  const { type } = req.params;
  const { page = 1 } = req.query;
  const cacheKey = `list-${type}-p${page}`;

  // 🔍 Nếu có trong cache thì trả luôn
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log("⚡ Trả từ cache:", cacheKey);
    return res.json(cached);
  }

  const isNewMovies = type === "phim-moi-cap-nhat";
  const targetURL = isNewMovies
    ? `${BASE_URL}/danh-sach/${type}`
    : `${BASE_URL}/v1/api/danh-sach/${type}`;

  try {
    const response = await axios.get(targetURL, {
      params: { page },
    });
    cache.set(cacheKey, response.data); // ✅ lưu vào cache
    res.json(response.data);
  } catch (error) {
    console.error("❌ Lỗi gọi phimapi (danh sách):", error.message);
    res.status(500).json({ error: "Lỗi server khi gọi phimapi (danh sách)" });
  }
});


// GET /api/tim-kiem?keyword= - tìm kiếm liên quan
router.get("/tim-kiem", async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await axios.get(`${BASE_URL}/v1/api/tim-kiem`, {
      params: { keyword },
    });
    res.json(response.data);
  } catch (error) {
    console.error("❌ Lỗi tìm kiếm phim:", error.message);
    res.status(500).json({ error: "Lỗi server khi tìm kiếm phim" });
  }
});

module.exports = router;
