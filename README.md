# Trăng Rằm Tỏa Sáng · Nối Điểm Đón Quẻ

Mini game HTML5 Canvas thuần HTML/CSS/JavaScript, responsive Desktop + Mobile.

## Chạy nhanh

Mở `index.html` bằng trình duyệt hoặc upload nguyên thư mục lên hosting tĩnh (Netlify, Vercel, GitHub Pages, Cloudflare Pages...). Không cần build step.

## Cấu trúc

```text
midautumn-one-line-game/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── game-data.js   # dữ liệu level + tọa độ + quẻ
│   └── game.js        # logic Canvas / pointer / modal / gieo quẻ
└── assets/
    ├── background.jpg
    ├── mooncake-reference.jpg
    ├── fish-lantern-reference.jpg
    ├── rabbit-reference.jpg
    ├── chang-e-reference.jpg
    └── kids-reference.jpg
```

## Tuỳ chỉnh 4 level

Trong `js/game-data.js`, mỗi level có `points: [[x,y], ...]` theo hệ tọa độ 1000 x 625. Chỉ cần sửa mảng điểm để đổi hình.

## Tuỳ chỉnh quẻ

`CULTURE_BEHAVIORS` chứa đúng 16 hành vi văn hóa. `FORTUNE_DATA` chứa các câu quẻ theo 4 nhóm: Sự nghiệp, Gia đình, Tình cảm, Tiền bạc. Có thể thêm/xóa câu mà không cần sửa logic game.

## Logic chơi

- Mỗi level yêu cầu kéo từ số kế tiếp đến đúng số.
- Nối sai bị tính lỗi và đường preview bị hủy.
- Hoàn thành điểm cuối, game tự đóng nét về điểm 1 để tạo cảm giác hình hoàn chỉnh.
- Level 1–4 lần lượt có 20 / 30 / 40 / 50 điểm.
- Hoàn thành Level 4 mở đúng 1 lần gieo quẻ.
- Gieo quẻ chọn danh mục → hiệu ứng lắc ống quẻ → random câu + random 1 trong 16 hành vi văn hóa.

## Lưu ý

Các hình tham chiếu trong `assets/` được dùng như lớp guide mờ. Level 3 không cần asset riêng vì hình ngôi sao được vẽ trang trí trực tiếp trên Canvas.


### Hiển thị điểm nối
Các chấm trên Canvas **không hiển thị số**. Thứ tự vẫn được lưu trong `points`; điểm cần nối tiếp theo được nhận diện bằng vòng sáng/pulse.
