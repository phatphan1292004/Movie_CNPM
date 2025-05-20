# 🎮 Movie\_CNPM

**Movie\_CNPM** là một hệ thống web xem phim được xây dựng nhằm phục vụ mục tiêu học phần Công Nghệ Phần Mềm (CNPM). Dự án gồm 2 phần chính: frontend (ReactJS) và backend (Node.js + ExpressJS), sử dụng MongoDB Atlas làm hệ quản trị cơ sở dữ liệu.

## 🚀 Tính năng

* Hiển thị danh sách phim mới, phim lẻ, phim bộ, anime,...
* Chi tiết phim với thông tin đầy đủ và danh sách tập phim.
* Tìm kiếm phim theo tên hoặc thể loại.
* Tạo và quản lý bộ sưu tập phim yêu thích.
* Hệ thống backend hỗ trợ API cho toàn bộ dữ liệu phim và người dùng.

## 🛠️ Công nghệ sử dụng

| Phần     | Công nghệ                                         |
| -------- | ------------------------------------------------- |
| Frontend | ReactJS, TailwindCSS, Axios                       |
| Backend  | Node.js, ExpressJS, MongoDB Atlas                 |
| Khác     | Vite, Vercel (frontend), Render (backend), GitHub |

## 📁 Cấu trúc thư mục

```
Movie_CNPM/
│
├── client/         # Giao diện người dùng (frontend)
│   └── ...         
│
├── server/         # API backend (Node.js + Express)
│   └── ...
```

## ⚙️ Cài đặt và chạy dự án

### Backend (`server`)

```bash
cd server
npm install
npm start
```

### Frontend (`client`)

```bash
cd client
npm install
npm run dev
```

## 🌐 Triển khai

* Frontend: [Vercel](https://vercel.com/)
* Backend: [Render](https://render.com/)
