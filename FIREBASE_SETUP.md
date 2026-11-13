# Test bài làm 1–6 bằng Firestore

Ứng dụng chỉ dùng Firestore, không dùng Authentication, Storage hoặc Realtime Database. Cấu hình Web đã có trong `.env.local`. Bất kỳ ai truy cập website cũng có thể sửa và xóa bài trong phạm vi sáu dự án khi Rules cho phép.

## Test ngay

Chạy `npm run dev`, mở `/projects/bai-1` đến `/projects/bai-6` hoặc các đường dẫn `/du-an/bai-N`. Mỗi bài đã có đầy đủ nội dung gốc chuyển sang định dạng soạn thảo: chọn **Sửa bài làm**, chỉnh văn bản, thêm ảnh rồi **Lưu & hiển thị**. Bài 1 gồm phần thao tác cơ bản và nội dung nâng cao. Các bảng dữ liệu gốc chuyển thành đoạn có nhãn từng cột để giữ đầy đủ nội dung và sửa trực tiếp được.

Giao diện hiển thị rõ nơi lưu:

- **Firestore đã kết nối**: lưu bài và ảnh vào document `projectAnswers/bai-N`.
- **Chế độ test trên trình duyệt**: khi chưa đọc được Firestore, bài vẫn sửa được, lưu vào localStorage của trình duyệt hiện tại. Đây không phải đồng bộ online. Dữ liệu test không tự ghi đè dữ liệu cloud khi kết nối trở lại.

Nội dung tham khảo cũ vẫn nằm trong mục thu gọn bên dưới. Sửa trong trình soạn thảo chỉ cập nhật bài đã lưu, không chỉnh file nguồn tham khảo.

## Kết nối database trên tài khoản Firebase

Cấu hình ứng dụng Web không có quyền tạo database, bật dịch vụ hoặc thay Security Rules. Các thao tác này cần phiên quản lý Firebase/Google Cloud; môi trường hiện tại chưa có phiên CLI quản lý.

1. Trong Firebase Console, chọn project đang dùng → Firestore Database → Create database, chọn database mặc định `(default)` nếu chưa tạo.
2. Firestore → Rules: dán toàn bộ `firestore.rules` trong dự án và Publish. Không cần bật Authentication hoặc Storage.
3. Chạy `npm run seed:firestore`. Script tự tạo sáu đáp án còn thiếu, giữ nguyên bài đã tồn tại. Nếu chưa có quyền, script báo lỗi và không giả lập ghi thành công.
4. Tải lại trang: trạng thái phải chuyển thành **Firestore đã kết nối**. Có thể sửa bài và lưu trực tiếp. Nếu chưa chạy seed, trang vẫn có nội dung gốc để sửa và tạo document ở lần lưu đầu tiên.
5. Nếu đã có Firebase CLI đăng nhập tài khoản quản lý project, có thể áp dụng Rules và cấu hình bỏ index cho trường lớn bằng `firebase deploy --only firestore --project test-login-309308`.

## Ảnh phục vụ thử nghiệm

Ảnh đầu vào tối đa 5 MB được thu nhỏ tối đa 1000 px và chuyển thành JPEG base64, lưu trực tiếp trong document cùng câu trả lời. GIF chỉ giữ khung hình đầu, nền trong suốt chuyển thành trắng. Toàn bài giới hạn 800 KB UTF-8 và 20 ảnh để nằm dưới giới hạn document Firestore. Nếu vượt, giao diện giữ nguyên bản nháp và yêu cầu bớt ảnh. Xóa bài có xác nhận và ghi nội dung rỗng với revision mới để ngăn bản sửa cũ ghi đè.

Kiểm tra tự động: `npm run test:answers`, `npm run lint`, `npm run build`.
