# PIANO / PRELUDE — Chạy và cập nhật nội dung

## Khởi chạy

```sh
npm install
npm run dev
```

Truy cập http://localhost:3000. Kiểm tra bản production bằng `npm run build` rồi `npm run start`.

## Cập nhật nội dung

- `src/config/student.ts`: thông tin cá nhân, mục tiêu, giảng viên và ảnh chân dung.
- `src/data/assignments.ts`: sáu chương, mục tiêu, quy trình, công cụ, tự đánh giá, nguồn và sản phẩm.
- `components/assignment-content.tsx`: ví dụ thực hành riêng cho từng chương.
- `app/conclusion/page.tsx`: thay các lời nhắc bằng phản tư thật của sinh viên.
- `app/globals.css`: token màu, font thống nhất, bố cục và responsive.

Các bước thực hành đang là **kế hoạch minh họa**, không phải công việc đã hoàn thành. Không đổi trạng thái trước khi bổ sung và kiểm tra minh chứng thật.

## Thêm minh chứng

Lưu ảnh trong `public/evidence/bai-1/`, PDF trong `public/documents/`, video trong `public/videos/`. Tạo thư mục theo nhu cầu, sau đó thêm vào `deliverables` của bài tương ứng:

```ts
{ title: 'Ảnh cấu trúc thư mục', kind: 'image', url: '/evidence/bai-1/thu-muc.jpg' }
{ title: 'Báo cáo bài 1', kind: 'pdf', url: '/documents/bai-1.pdf' }
{ title: 'Video thao tác', kind: 'video', url: '/videos/bai-1.mp4' }
{ title: 'Sản phẩm trực tuyến', kind: 'link', url: 'https://example.com/san-pham' }
```

Chỉ thêm URL khi tệp thực sự tồn tại. Không thêm tệp cá nhân không định công khai. Mỗi tài liệu tham khảo dùng `{ title, url }` trong `references`.

## Các đường dẫn

- `/`: trang chủ và phần giới thiệu cá nhân `/#about`.
- `/projects`: mục lục sáu chương.
- `/projects/bai-1` đến `/projects/bai-6`: chi tiết bài tập.
- `/conclusion`: tổng kết và công bố nguồn, AI.

Có trang 404, robots và sitemap. Khi triển khai lên tên miền thật, có thể đặt `SITE_URL=https://ten-mien-cua-ban` để sitemap xuất URL đúng. Local không yêu cầu biến môi trường.

## Tương tác

- Hero có ba slide, nút trước/sau, chọn slide, vuốt và phím mũi tên khi vùng hero được chọn.
- Tự chuyển slide mặc định bật, mỗi 5 giây; có nút tạm dừng và tự dừng khi hover/focus/tab ẩn. Tôn trọng chế độ giảm chuyển động.
- Danh sách dự án cuộn ngang bằng cảm ứng, bàn phím và nút điều hướng.
- Piano: âm thanh sẵn sàng ngay khi bấm phím; bấm phím hoặc chọn bàn phím và dùng A S D F G H J K. Các phím thăng dùng W E T Y U. Âm thanh được tổng hợp bằng Web Audio, không phải mẫu âm piano thật.
- Prompt có nút sao chép; checklist tự đánh giá chỉ giữ trong phiên trang hiện tại.
- Media viewer hỗ trợ ảnh, PDF, video local và link; chưa có minh chứng được cung cấp.

## Giới hạn hiện tại

Không tải được mã/ảnh của bốn màn hình Stitch từ các ID được cung cấp; chưa đối chiếu trực quan với bản gốc. Không có URL xuất HTML/ảnh trong dữ liệu nhận được.

Bản local dùng Be Vietnam Pro hỗ trợ tiếng Việt, được đóng gói cùng dự án qua Fontsource (400/500/600/700), hình đại dương cầm SVG dựng riêng và hiệu ứng phối cảnh CSS. Chưa tích hợp Three.js/React Three Fiber/Drei, GSAP, Motion, Embla hoặc mô hình GLB. Các tương tác cơ bản được triển khai bằng React và trình duyệt; đây là phương án nhẹ, chưa phải cảnh 3D quang thực theo phần nâng cao của README.

Chưa có thông tin khoa, minh chứng sáu bài, video giới thiệu hoặc phản tư cá nhân. Báo cáo Word cần làm riêng.

Phiên làm việc không có công cụ trình duyệt để xác minh trực quan hoặc thao tác tự động trên thiết bị; kiểm tra build, TypeScript, lint và phản hồi HTTP riêng. Nên xem lại trên điện thoại và trình duyệt trước khi nộp.
