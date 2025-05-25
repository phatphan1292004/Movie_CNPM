const express = require("express");
const router = express.Router();
const WatchHistory = require("../models/WatchHistory");
const auth = require("../middleware/auth");

// Lấy lịch sử xem của user
router.get("/", auth, async (req, res) => {
  try {
    const history = await WatchHistory.find({ userId: req.user._id })
      .sort({ lastWatchedAt: -1 })
      .limit(20);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lưu lịch sử xem
router.post("/", auth, async (req, res) => {
  try {
    const { movieId, movieSlug, currentTime, duration, completed } = req.body;
    
    let history = await WatchHistory.findOne({
      userId: req.user._id,
      movieId,
    });

    if (history) {
      history.currentTime = currentTime;
      history.duration = duration;
      history.completed = completed;
      history.lastWatchedAt = new Date();
    } else {
      history = new WatchHistory({
        userId: req.user._id,
        movieId,
        movieSlug,
        currentTime,
        duration,
        completed,
      });
    }

    await history.save();
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa lịch sử xem
router.delete("/:id", auth, async (req, res) => {
  try {
    const history = await WatchHistory.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    
    if (!history) {
      return res.status(404).json({ message: "Không tìm thấy lịch sử xem" });
    }
    
    res.json({ message: "Đã xóa lịch sử xem" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 