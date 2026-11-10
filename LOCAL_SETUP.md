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
- `portfolio-nextjs/content/portfolio.ts`: nội dung chi tiết, bảng và sản phẩm của sáu bài; công bố AI và tổng kết.
- `components/assignment-content.tsx`: các ví dụ tham khảo cũ, không dùng làm bài nộp trên trang chi tiết.
- `app/conclusion/page.tsx`: trình bày tổng kết từ hồ sơ nguồn; sinh viên tự xác nhận phần phản tư.
- `app/globals.css`: token màu, font thống nhất, bố cục và responsive.

Nội dung sáu bài và tổng kết đã được tích hợp từ `portfolio-nextjs/content/portfolio.ts`. Danh mục và trang chi tiết dùng chung nguồn; `src/data/learning-connections.ts` bổ sung phân tích lựa chọn, giới hạn và liên hệ giữa các bài. Chỉ xác nhận kết quả thực hành sau khi đối chiếu minh chứng thật.

Chạy `npm run prepare:submission` để cập nhật danh sách còn thiếu và bản Word nháp trong `submission/`. Bản nháp có định dạng theo đề và trường mục lục tự động, cần mở bằng Word để cập nhật trường, bổ sung ảnh và kiểm tra phân trang. Đề có mâu thuẫn 10–15 / 6–9 trang nội dung; cần chốt với giảng viên.

- `/du-an`, `/du-an/bai-1`…`/du-an/bai-6`, `/tong-ket` cùng hiển thị các trang đã tích hợp.
- Tệp khai báo trong gói nguồn đặt tại `public/bai-tap/bai-N/`; tên cụ thể ở `submission/DOI-CHIEU-DE-THI.md`.
- Các minh chứng hiện chưa được cung cấp: website hiển thị khung chờ thay vì tải ảnh hỏng.
- Phần cảm nhận và tự đánh giá trong hồ sơ cần sinh viên tự rà soát, chỉnh sửa và xác nhận theo IV.3 của đề.

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
- Bài 6 có sáu tình huống đèn giao thông, chọn đáp án và nhận giải thích; trạng thái chỉ giữ trong phiên trang hiện tại.
- Trang bài tập hỗ trợ ảnh, PDF, video và link từ hồ sơ nguồn; tự kiểm tra sự tồn tại của tệp local trước khi nhúng.

## Giới hạn hiện tại

Không tải được mã/ảnh của bốn màn hình Stitch từ các ID được cung cấp; chưa đối chiếu trực quan với bản gốc. Không có URL xuất HTML/ảnh trong dữ liệu nhận được.

Bản local dùng Be Vietnam Pro hỗ trợ tiếng Việt, được đóng gói cùng dự án qua Fontsource (400/500/600/700), hình đại dương cầm SVG dựng riêng và hiệu ứng phối cảnh CSS. Chưa tích hợp Three.js/React Three Fiber/Drei, GSAP, Motion, Embla hoặc mô hình GLB. Các tương tác cơ bản được triển khai bằng React và trình duyệt; đây là phương án nhẹ, chưa phải cảnh 3D quang thực theo phần nâng cao của README.

Chưa xác nhận tên khoa, công cụ AI thực hành và phản tư cá nhân; còn thiếu 26 ảnh/tệp/link đã khai báo. Có bản Word nháp trong `submission/`, cần sinh viên hoàn thiện trước khi nộp. Website chưa được xuất bản công khai trong lần cập nhật này.

Phiên làm việc không có công cụ trình duyệt để xác minh trực quan hoặc thao tác tự động trên thiết bị; kiểm tra build, TypeScript, lint và phản hồi HTTP riêng. Nên xem lại trên điện thoại và trình duyệt trước khi nộp.

## Bài làm local và Gemini

Mỗi trang bài 1–6 có mục **Bài làm & trợ giảng**. Chạy `npm run dev`, mở qua `http://localhost:3000`, mở khối **Ghi chú & bài làm cá nhân** cuối trang để thêm câu trả lời, import PDF/DOCX/TXT (tối đa 10 MB) và hỏi Gemini. Dữ liệu workspace cá nhân không tự trở thành minh chứng công khai; muốn nộp cần đưa tệp đã chọn vào thư mục public hoặc link chia sẻ trong nội dung bài.

- Câu trả lời và tài liệu nằm trong `.local/bai-1/` đến `.local/bai-6/`. Mỗi lần lưu tạo tệp mới và metadata, không ghi đè bài cũ. Sao lưu cả thư mục `.local` để giữ dữ liệu.
- Cấu hình Gemini đặt trong `.local/gemini.json`: `{ "apiKey": "YOUR_KEY", "model": "gemini-2.5-flash" }`. Đây là cấu hình phía server, không cần env. Thư mục `.local` không được commit. Máy mới cần tạo lại cấu hình này.
- TXT được hiển thị nguyên văn. Word DOCX được trích xuất văn bản, không giữ hình/bố cục; DOC cũ cần đổi sang DOCX. PDF dùng trình xem tích hợp của trình duyệt, có liên kết mở riêng.
- Bot nhận yêu cầu bài, lịch sử hội thoại hiện tại và nội dung TXT/DOCX đang chọn (tối đa 30.000 ký tự). PDF chưa được phân tích. Chỉ khi bấm gửi, dữ liệu đó mới gửi tới Google. Chat không tự lưu sau khi rời trang; dùng **Dùng làm bản nháp** rồi **Lưu & hiển thị** để giữ kết quả.
- Lưu file dùng Route Handler ngay trong Next.js, không cần dịch vụ backend/database riêng. File được lưu trên máy chạy Next.js, không phải máy của khách truy cập từ xa. Các thao tác ghi và gọi Gemini chỉ được bật qua hostname localhost/127.0.0.1. Đây là chế độ cá nhân local; trước khi triển khai công khai cần xác thực, giới hạn sử dụng và kho lưu trữ bền vững. Hosting serverless không bảo đảm giữ file local.

## Trải nghiệm piano và nhạc nền

- Nút **Bật âm nhạc** ở hero và góc dưới trang chỉ phát sau thao tác người dùng. Bộ phát được đặt trong root layout nên tiếp tục khi chuyển route bằng liên kết nội bộ; tải lại trang luôn bắt đầu ở trạng thái tắt.
- Menu `⋯` có chỉnh âm lượng, tắt tiếng và bài tiếp (chỉ bật khi playlist có nhiều bài). Âm lượng/tắt tiếng được lưu localStorage nếu trình duyệt cho phép. Visualizer dùng AnalyserNode với tín hiệu phát thật.
- Bản nhạc nền mặc định là **Piano Concerto No.21**, dùng tệp do người dùng cung cấp tại `public/audio/piano-concerto-no-21.mp3`. Các bài Suno vẫn nằm trong danh sách chọn. Cấu hình tại `src/config/playlist.ts`. Bản tổng hợp cũ `prelude-original.wav` vẫn được giữ cùng nguồn tạo và giấy phép riêng trong `public/audio/README.md`; giấy phép đó không áp dụng cho tệp nhạc nền mới.
- Desktop có Three.js với ánh sáng/khuông nhạc/hạt sáng phản ứng nhẹ theo âm nhạc và vị trí cuộn. Chưa có model piano GLB được cấp phép trong dự án: đặt model tự chứa tại `public/models/grand-piano.glb` nếu muốn thay minh hoạ SVG. Có fallback khi model không tồn tại hoặc WebGL lỗi. Mobile dùng minh hoạ SVG; chế độ giảm chuyển động tắt chuyển động trang trí.
- Hiệu ứng reveal dùng Motion và tôn trọng `prefers-reduced-motion`; không thay đổi hành vi cuộn native. Thanh trên cùng biểu thị tiến trình đọc trang.

## Trợ lý AI trên Header

- Nút **Trợ lý AI** bật/tắt khung chat Gemini trên mọi trang, có câu hỏi gợi ý, gửi bằng Enter, xuống dòng bằng Shift+Enter, dừng và xóa hội thoại.
- Dùng cấu hình Gemini phía server sẵn có trong `.local/gemini.json`; API key không đưa vào mã client. Endpoint `/api/assistant` hiện chỉ dùng trên localhost như workspace cá nhân.
- Chỉ gửi câu hỏi, tối đa 12 tin nhắn gần nhất và phần giới thiệu học phần công khai tới Gemini khi người dùng bấm Gửi. Không gửi bài làm local, tài liệu hoặc khóa API trong nội dung hội thoại. Lịch sử nằm trong bộ nhớ của trang, không lưu lên đĩa hay localStorage.
- Kết nối sử dụng REST `generateContent`: https://ai.google.dev/api/generate-content?hl=en.

## Track Player và tua nhạc

Trang `/am-nhac` có Track Player dùng chung trạng thái với bộ phát góc trang: thời gian hiện tại/tổng thời lượng, thanh tua, trước/tiếp, phát/tạm dừng, lặp một bài, âm lượng và danh sách chọn bài. Thời lượng từng tệp được ghi trong `src/config/playlist.ts`; khi tải bài, bộ phát dùng thời lượng thực do trình duyệt đọc. Thanh tua hoạt động sau khi metadata đã tải, kể cả khi đang tạm dừng. Đổi bài khi tạm dừng giữ trạng thái dừng. Menu `⋯` của bộ phát góc trang cũng có thanh tua và các nút điều khiển.
