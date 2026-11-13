# Bài làm 1–6: chỉ dùng dữ liệu Firestore

Ứng dụng chỉ dùng Firestore, không dùng Authentication, Storage hoặc Realtime Database. Cấu hình Web ở `.env.local`. Khi Rules cho phép, bất kỳ ai truy cập website đều có thể sửa và xóa sáu bài.

## Cách hoạt động

Mở `/projects/bai-1` đến `/projects/bai-6` hoặc `/du-an/bai-N`. Trang đợi dữ liệu được xác nhận từ server trước khi hiển thị và cho sửa bài. Mỗi bài đọc duy nhất document `projectAnswers/bai-N`; không có đáp án mặc định, không đọc hoặc ghi localStorage và không dùng dữ liệu cache thay cho server. Document chưa tồn tại sẽ hiển thị câu trả lời và hình ảnh trống.

Bấm **Sửa bài làm**, chỉnh sửa rồi **Lưu & hiển thị**. Chỉ báo lưu thành công khi transaction Firestore được xác nhận. Các tab và thiết bị khác theo dõi document qua `onSnapshot`, tự cập nhật khi bài thay đổi. Nếu một bản nháp đang mở mà nơi khác sửa bài, lần lưu bản nháp cũ sẽ báo xung đột để tránh ghi đè.

Khi chưa tải được dữ liệu, trang hiển thị trạng thái tải hoặc lỗi với nút **Thử lại**, không cho lưu cục bộ. Các bản test từng lưu trên trình duyệt được bỏ qua và không tự đẩy lên cloud. Nội dung tham khảo trong mục thu gọn bên dưới vẫn là tài liệu tĩnh, tách biệt với bài làm.

## Thiết lập Firebase

1. Chọn project trong Firebase Console → Firestore Database; tạo database mặc định `(default)` nếu chưa có.
2. Firestore → Rules: dán `firestore.rules` rồi Publish.
3. Điền cấu hình Web trong `.env.local` (máy hiện tại đã có), khởi động lại `npm run dev`. Khi deploy, đặt các biến môi trường trước khi build.
4. Nếu có Firebase CLI đã đăng nhập tài khoản quản lý project, dùng `firebase deploy --only firestore --project test-login-309308` để áp dụng Rules và cấu hình bỏ index cho trường lớn.

Script `npm run seed:firestore` chỉ là công cụ nhập nội dung gốc một lần theo yêu cầu, không chạy tự động, không ảnh hưởng cách trang đọc dữ liệu và không ghi đè document đã tồn tại. Không chạy script này nếu muốn bài chưa có dữ liệu giữ nguyên trạng thái trống.

## Ảnh

Ảnh đầu vào tối đa 5 MB được thu nhỏ tối đa 1000 px thành JPEG base64 và lưu cùng câu trả lời trong document. Toàn bài tối đa 800 KB UTF-8, tối đa 20 ảnh. Xóa bài cần xác nhận, lưu nội dung rỗng cùng revision mới để ngăn bản nháp cũ ghi đè.

Kiểm tra: `npm run test:answers`, `npm run lint`, `npm run build`.

## Vercel: website không tải được bài dù máy local vẫn xem được

`.env.local` bị Git bỏ qua, nên Vercel không tự nhận cấu hình Firebase từ máy phát triển. Mở Vercel Dashboard → project → Settings → Environment Variables, thêm các biến `NEXT_PUBLIC_FIREBASE_*` từ `.env.local` cho Production (và Preview nếu cần), rồi Redeploy. Các biến public được đóng vào JavaScript lúc build; chỉ thêm biến mà không build lại sẽ chưa sửa được bản đang chạy.

Bản mã hiện tại chỉ yêu cầu API key, project ID và app ID để dùng Firestore. Với bản deploy cũ vẫn kiểm tra đủ cấu hình Web, có thể thêm toàn bộ sáu biến trong `.env.local` trước khi redeploy. Không đưa dữ liệu bài làm mặc định vào biến môi trường; nội dung vẫn chỉ đọc từ database.
