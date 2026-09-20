# HOẠ ĐÈN ĐÓN TRĂNG — v5

Mini-game HTML5 Trung Thu với cơ chế **One-line Connect the Dots**.

## Cơ chế trò chơi
- Dots **không đánh số**.
- Người chơi có thể bắt đầu ở **bất kỳ chấm nào**.
- Người chơi **nhấn giữ và kéo liên tục** qua các chấm.
- Hệ thống tự **snap** điểm chạm vào dot gần nhất và tự vẽ đoạn thẳng từ dot trước sang dot mới.
- Không vẽ nét tự do: đường hiển thị luôn là **đường thẳng giữa hai dot**.
- Nếu rê nhanh qua nhiều dot, hệ thống dò toàn bộ đoạn di chuyển để không bỏ sót dot.
- Nhấc chuột/ngón tay trước khi đi qua hết dot sẽ tính là một lượt thất bại và reset lượt chơi.
- Chỉ khi **đi qua toàn bộ các dot trong một nét liên tục** thì level mới hoàn thành.

## 3 level theo ảnh người dùng cung cấp
1. **Level 1 — Mái Nhà Trăng Sáng**: 5 dots.
2. **Level 2 — Khối Đèn Lồng**: 7 dots.
3. **Level 3 — Bậc Thềm Ánh Trăng**: 11 dots.

Tọa độ được chuẩn hóa thành `[x, y]` từ 0–100 trong `app.js`, nên dễ chỉnh và không phụ thuộc kích thước màn hình.

## Cấu trúc
- `index.html` — UI
- `styles.css` — giao diện + responsive
- `app.js` — game logic + level data + fortune data
- `assets/reference-trungthu.jpg` — ảnh Trung Thu reference ban đầu
- `assets/level-1-house.png` — hình mẫu level 1 do người dùng cung cấp
- `assets/level-2-cube.png` — hình mẫu level 2 do người dùng cung cấp
- `assets/level-3-stairs.png` — hình mẫu level 3 do người dùng cung cấp

## Chạy
Mở `index.html` bằng trình duyệt hiện đại. Không cần build step.
