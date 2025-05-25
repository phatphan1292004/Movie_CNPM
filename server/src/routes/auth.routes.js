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
        phone: user.phone,
        address: user.address,
        birthDate: user.birthDate,
        gender: user.gender,
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

// Get user profile
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

// Update user profile
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, phone, address, birthDate, gender } = req.body;
    
    // Kiểm tra email đã tồn tại chưa (nếu email thay đổi)
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã được sử dụng bởi tài khoản khác" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, birthDate, gender },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

// Change password
router.put("/users/:id/password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

module.exports = router;
