require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Streamvia" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // gửi lại chính mình để test
      subject: "✅ Kiểm tra gửi email",
      html: "<p>Đây là email test thành công từ nodemailer.</p>",
    });
    console.log("✅ Email đã được gửi thành công!");
  } catch (err) {
    console.error("❌ Lỗi gửi email:", err);
  }
}

sendTestEmail();
