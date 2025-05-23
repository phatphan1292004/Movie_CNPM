const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 5000;
const app = express();
const User = require("./src/models/User");

app.use(cors());
app.use(express.json());

//Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Kết nối MongoDB Atlas thành công"))
  .catch((err) => console.error("Kết nối MongoDB thất bại:", err));

// Route test


const authRoutes = require("./src/routes/auth.routes");
const otpRoutes = require("./src/routes/otp.routes")
const movieRoutes = require("./src/routes/movie.routes");
const favoriteRoutes = require("./src/routes/favorite.routes");

app.use("/api", authRoutes);
app.use("/api", otpRoutes)
app.use("/api", movieRoutes);
app.use("/api/favorites", favoriteRoutes);
app.listen(PORT, () => {});
