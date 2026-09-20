# HOẠ ĐÈN ĐÓN TRĂNG

Mini-game HTML5 Trung Thu với cơ chế **One-line Connect the Dots**.

## Cơ chế đúng của trò chơi
- Dots **không đánh số**.
- Người chơi có thể bắt đầu ở bất kỳ dot nào.
- Chỉ được vẽ **một nét liên tục**, không nhấc chuột/ngón tay.
- Mục tiêu là đi qua toàn bộ dots trong một lượt vẽ.
- Nếu nhấc tay trước khi chạm đủ, lượt đó kết thúc và có thể bấm **Vẽ lại**.
- Hit-test dùng toàn bộ đoạn di chuyển và bán kính đủ lớn cho cả desktop lẫn mobile.

## Thiết kế đề bài
4 level lấy cảm hứng trực tiếp từ các họa tiết/nhân vật trong ảnh reference Trung Thu:
1. Mặt Trăng Rằm
2. Đèn Lồng Sum Vầy
3. Đôi Bạn Đón Trăng
4. Rồng Trăng Rằm — 50 dots

Ảnh reference được dùng làm lớp gợi ý rất mờ trong bàn chơi và làm artwork nền.

## Cấu trúc
- `index.html` — UI
- `styles.css` — giao diện và responsive
- `app.js` — logic game + dữ liệu level + dữ liệu quẻ
- `assets/reference.jpg` — ảnh reference

## Chỉnh sửa dots
Trong `app.js`, dữ liệu nằm trong `LEVELS`. Mỗi điểm có dạng `[x, y]` theo phần trăm 0–100 nên không phụ thuộc kích thước màn hình.

## Chạy
Mở `index.html` bằng trình duyệt hiện đại. Không cần build step.
