const express = require("express");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

//Login
router.post("/login", async (req, res) => {
  const { username, password, recaptchaToken } = req.body;
  const secretKey = "6LewmRcrAAAAAHj5V2zeo7LxP96_KNfnrh6D6vs4";
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;
  try {
    const verifyRes = await axios.post(verifyURL, null, {
      params: {
        secret: secretKey,
        response: recaptchaToken,
      },
    });

    if (!verifyRes.data.success) {
      return res.status(403).json({ message: "CAPTCHA không hợp lệ" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    return res.status(200).json({
      message: "Đăng nhập thành công.",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
});

//Signup
router.post("/sign-up", async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const existUsername = await User.findOne({ username });
    const existEmail = await User.findOne({ email });

    if (existUsername)
      return res.status(400).json({ message: "Username đã tồn tại" });
    if (existEmail)
      return res.status(400).json({ message: "Email đã được đăng ký" });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 là salt rounds

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(200).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
});

module.exports = router;
