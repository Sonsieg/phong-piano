# Portfolio INF2501: 6 trang bài tập + trang Tổng kết (Next.js)

## Trong gói có gì

| Tệp | Nội dung |
|---|---|
| `content/portfolio.ts` | **Toàn bộ nội dung chữ**: 6 bài tập (Câu 2 của đề), trang Tổng kết (Câu 3), thông tin chân trang |
| `app/du-an/page.tsx` | Trang Dự án: danh mục 6 bài tập có liên kết |
| `app/du-an/[slug]/page.tsx` | 6 trang bài tập `/du-an/bai-1` … `/du-an/bai-6`: đủ 3 phần a) Mục tiêu, b) Quá trình, c) Sản phẩm; nút Bài trước / Về trang Dự án / Bài tiếp |
| `app/tong-ket/page.tsx` | Trang Tổng kết |
| `components/` | Khối hiển thị, CSS, thử thách tương tác “đèn giao thông AI” ở Bài 6 |

Đã build thử bằng Next.js 16 (App Router, TypeScript): không lỗi, xuất tĩnh được.

## Cách gắn vào dự án

1. Chép `app/`, `components/`, `content/` vào gốc dự án Next.js (App Router). Dự án dùng thư mục `src/` thì chép vào `src/`.
   Đã có `app/` thì chỉ cần thêm `app/du-an` và `app/tong-ket`. Không cần cài thêm thư viện nào.
2. Thêm chân trang vào `app/layout.tsx` (đề bắt buộc ghi họ tên, mã SV, lớp, học phần):
   ```tsx
   import { ChanTrang } from "../components/portfolio-ui";
   // ... trong <body>:
   {children}
   <ChanTrang />
   ```
3. Ảnh minh chứng đặt vào `public/bai-tap/bai-N/…`, đúng tên ghi trong `content/portfolio.ts` (vd `public/bai-tap/bai-1/sau.png`).
4. `npm run dev` rồi mở `/du-an`.

## Trước khi nộp (bắt buộc)

- Tìm `[ĐIỀN` (33 chỗ) và thay bằng thông tin thật. Trên web các chỗ này hiện nền vàng; link chưa điền hiện khung chờ.
- 17 dòng có ✏️ là chi tiết mẫu: sửa cho khớp với việc bạn đã làm thật. Đề mục IV.4: giảng viên có thể gọi vấn đáp.
- 7 chỗ có ⚠️ TỰ VIẾT (cảm nhận ở trang Tổng kết, tự đánh giá ở Bài 4): đề mục IV.3 bắt buộc sinh viên tự viết.
  Dùng bản có sẵn làm khung, viết lại bằng trải nghiệm của bạn.
- Mục “Sử dụng AI” mỗi trang đã ghi “Claude (Anthropic)”: giữ nguyên, vì đề bắt buộc ghi rõ công cụ và mục đích.
- Link Google Drive / Trello: mở quyền “Bất kỳ ai có đường liên kết”, rồi thử mở bằng cửa sổ ẩn danh.
- Tài liệu tham khảo: mở bản gốc, đối chiếu DOI; nên xuất lại danh mục bằng Zotero.

## Đề còn yêu cầu nhưng gói này chưa có

- Trang Giới thiệu – About Me (Câu 1).
- Menu điều hướng Giới thiệu · Dự án (có menu con tới 6 bài) · Tổng kết.
- Báo cáo Word 10–15 trang (Câu 4).
