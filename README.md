# Trăng Rằm Tỏa Sáng — Một Nét Đón Quẻ

Mini-game HTML5 Canvas chủ đề Trung Thu, gồm thử thách One-line Connect the Dots và Gieo Quẻ.

## Luật chơi đã triển khai

- Các chấm **không có số**.
- Người chơi có thể bắt đầu từ **bất kỳ chấm nào**.
- Phải dùng **một lần vẽ liên tục** (mouse/touch) để đi qua tất cả các chấm.
- Không được nhấc chuột/ngón tay trước khi chạm đủ mọi chấm.
- Không bắt buộc theo một thứ tự cố định; hệ thống chỉ kiểm tra một nét vẽ có đi qua toàn bộ dots hay chưa.
- Có hỗ trợ phát hiện dot ngay cả khi pointer di chuyển nhanh qua dot nhờ kiểm tra khoảng cách từ dot đến đoạn chuyển động.

## Cấu trúc

```text
trung-thu-one-line-connect/
├── index.html
├── styles.css
├── app.js
├── assets/
│   └── reference.jpg
└── README.md
```

## Dữ liệu Level

Tọa độ nằm trong mảng `LEVELS` ở `app.js`, dùng hệ tọa độ 0–100 để dễ chỉnh sửa.

Mỗi level chỉ cần sửa:

```js
points: [
  [x, y],
  [x, y],
  ...
]
```

Không có trường số thứ tự cho người chơi.

## Chạy

Mở `index.html` bằng trình duyệt hiện đại. Không cần build step hoặc thư viện ngoài.
