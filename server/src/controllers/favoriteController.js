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

//6.1.3Truy vấn tất cả các bộ sưu tập theo userId
const getCollections = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId" });
    }

    const favorite = await Favorite.findOne({ userId });
    //6. Trả về danh sách bộ sưu tập
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
    const favorite = await Favorite.findOne({ userId });

    // Tìm collection theo tên
    const collection = favorite.collections.find(
      (c) => c.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (!collection) {
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập." });
    }

    //6.1.6 Kiểm tra phim đã tồn tại trong collection hay chưa
    const exists = collection.movies.some((m) => m.slug === movie.slug);
    if (exists) {
      //6.1.7 Trả lỗi 400 "Phim đã tồn tại trong collection"
      return res.status(400).json({ message: "Phim đã có trong bộ sưu tập." });
    }

    // Thêm phim mới
    collection.movies.push({
      title: movie.title,
      slug: movie.slug,
      img: movie.img,
    });
    //6.1.8 Thêm phim vào collection, lưu vào db
    await favorite.save();
    
    //6.1.9 Trả thông báo thêm phim vào collection thành công
    return res.status(200).json({ message: "Đã thêm phim vào bộ sưu tập." });
  } catch (err) {
    console.error("❌ Lỗi addMovieToCollection:", err);
    return res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = { addCollection, getCollections, addMovieToCollection };
