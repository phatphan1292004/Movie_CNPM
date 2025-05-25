const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // không trùng email
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Số điện thoại không hợp lệ"]
    },
    address: {
      type: String,
      trim: true
    },
    birthDate: {
      type: Date
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    collection: "users", 
  }
);

module.exports = mongoose.model("User", userSchema);
