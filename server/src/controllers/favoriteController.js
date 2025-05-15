const Favorite = require("../models/Favorite");

const addCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const rawName = req.body.name;

    if (!rawName || !rawName.trim()) {
      return res.status(400).json({ message: "Tên bộ sưu tập không hợp lệ" });
    }

    const name = rawName.trim();

    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      favorite = new Favorite({
        userId,
        collections: [{ name, movies: [] }],
      });
    } else {
      const exists = favorite.collections.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      if (exists) {
        return res.status(400).json({ message: "Collection đã tồn tại" });
      }

      favorite.collections.push({ name, movies: [] });
    }

    await favorite.save();
    res.status(200).json({ message: "Đã thêm bộ sưu tập", favorite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

const getCollections = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId" });
    }

    const favorite = await Favorite.findOne({ userId });
    res.status(200).json({ collections: favorite.collections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

const addMovieToCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, movie } = req.body;

    if (!userId || !name || !movie?.slug) {
      return res.status(400).json({ message: "Thiếu thông tin đầu vào." });
    }

    const favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      return res.status(404).json({ message: "Không tìm thấy user." });
    }

    // Tìm collection theo tên
    const collection = favorite.collections.find(
      (c) => c.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (!collection) {
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập." });
    }

    // Kiểm tra nếu phim đã tồn tại trong collection
    const exists = collection.movies.some((m) => m.slug === movie.slug);
    if (exists) {
      return res.status(400).json({ message: "Phim đã có trong bộ sưu tập." });
    }

    // Thêm phim mới
    collection.movies.push({
      title: movie.title,
      slug: movie.slug,
      img: movie.img,
    });

    await favorite.save();

    return res.status(200).json({ message: "Đã thêm phim vào bộ sưu tập." });
  } catch (err) {
    console.error("❌ Lỗi addMovieToCollection:", err);
    return res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = { addCollection, getCollections, addMovieToCollection };
