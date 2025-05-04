const nodemailer = require("nodemailer");
const otpStore = new Map();
require("dotenv").config(); 
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email là bắt buộc" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore.set(email, otp);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    console.log("Sending OTP to:", email);
    console.log("From email:", process.env.MAIL_USER);

    await transporter.sendMail({
      from: `"Hệ thống Streamvia 🎬" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Mã xác thực OTP",
      html: `<h3>Mã OTP của bạn là: <b>${otp}</b></h3>`,
    });

    res.json({ message: "OTP đã gửi về email" });
  } catch (err) {
    res.status(500).json({ message: "Gửi email thất bại", error: err.message });
  }
};

exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (parseInt(otp) === stored) {
    otpStore.delete(email);
    return res.json({ message: "Xác thực OTP thành công" });
  }

  return res.status(400).json({ message: "OTP không hợp lệ" });
};
