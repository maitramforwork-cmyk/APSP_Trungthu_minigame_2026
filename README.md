# Trăng Rằm Tỏa Sáng — Nối Điểm Đón Quẻ

Mini-game HTML5 thuần JavaScript, responsive Desktop/Mobile, dùng Canvas API.

## Cấu trúc
- `index.html`: khung ứng dụng.
- `styles.css`: giao diện Trung Thu, animation, responsive.
- `app.js`: game loop, Canvas, state, level data, fortune data.
- `assets/reference.jpg`: ảnh reference người dùng cung cấp.

## Chạy
Mở `index.html` trực tiếp bằng trình duyệt hiện đại. Không cần build tool.

## Chỉnh level
Đi tới `LEVELS` trong `app.js`. Mỗi level có:
- `id`
- `title`
- `subtitle`
- `difficulty`
- `points`: mảng `[x, y]` theo tỷ lệ 0–100.

## Chỉnh quẻ
Đi tới `FORTUNES` để thêm danh mục hoặc mẫu câu. Hệ thống tự random một trong 16 nguyên tắc ở `PRINCIPLES`.
