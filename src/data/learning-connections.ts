// Phân tích biên tập từ nội dung hồ sơ, không thay cho lời tự đánh giá của sinh viên.
export const learningConnections = [
  {
    title: 'Tổ chức để tìm lại, sao lưu để khôi phục.',
    reasoning:
      'Cây thư mục giải quyết vị trí lưu; quy tắc đặt tên giải quyết việc nhận diện và sắp xếp. Hai lớp này bổ trợ nhau: một tệp rời khỏi thư mục vẫn có thể được nhận diện nhờ mã học phần, nội dung và phiên bản trong tên.',
    limit:
      'Đồng bộ đám mây có thể lan truyền thao tác xóa nhầm. Vì vậy, có bản đồng bộ chưa đủ để chứng minh khả năng khôi phục; cần thử mở bản sao và ghi lại kết quả. Số cấp thư mục nên phù hợp với cách tìm tài liệu thực tế.',
    application:
      'Quy tắc đặt tên được dùng tiếp cho kho tài liệu nhóm ở Bài 4, giúp các thành viên phân biệt bản đang chỉnh sửa và bản bàn giao.',
    related: 4,
  },
  {
    title: 'Tìm thấy thông tin chưa đồng nghĩa với kiểm chứng.',
    reasoning:
      'Bảng từ khóa song ngữ giúp mở rộng phạm vi tìm kiếm. Các toán tử giới hạn phạm vi giúp lọc nhiễu, còn bảng CRAAP buộc người đọc giải thích vì sao chọn hoặc loại một nguồn, thay vì chỉ dựa vào thứ hạng tìm kiếm.',
    limit:
      'Tổng điểm CRAAP là công cụ hỗ trợ phán đoán, không phải chứng nhận nguồn luôn đúng. Một báo cáo tổng quan có thể đáng tin nhưng chưa trực tiếp trả lời câu hỏi về giáo dục âm nhạc. Cần đọc nội dung, đối chiếu phạm vi và ghi rõ giới hạn sử dụng.',
    application:
      'Cách đối chiếu tác giả, bản gốc và bằng chứng trở thành cơ sở cho nguyên tắc Thẩm định ở Bài 6.',
    related: 6,
  },
  {
    title: 'Cải tiến prompt bằng tiêu chí, không bằng độ dài.',
    reasoning:
      'Hai cặp prompt được tổ chức theo cùng một logic: xác định người học, chia nhỏ nhiệm vụ, quy định định dạng và đặt ràng buộc. So sánh theo bốn tiêu chí giúp thấy phần cải tiến nào thực sự phục vụ nhu cầu học tập.',
    limit:
      'Đầu ra khác nhau có thể do cả prompt lẫn tính ngẫu nhiên của mô hình. Hai lần chạy chỉ là quan sát quy mô nhỏ; chưa đủ để khái quát hiệu quả. Cần lưu đầu ra nguyên văn, tên công cụ và thời điểm thử để người đọc đối chiếu với nhận xét.',
    application:
      'Vòng lặp viết – đọc – điều chỉnh được vận dụng vào nhật ký prompt sáng tạo nội dung ở Bài 5.',
    related: 5,
  },
  {
    title: 'Công cụ chung cần đi cùng quy ước chung.',
    reasoning:
      'Trello trả lời việc gì, ai phụ trách và hạn khi nào; Google Docs lưu nội dung và phản hồi; biên bản ghi quyết định. Phân vai từng công cụ giúp giảm việc thông tin quan trọng bị trôi trong nhóm chat.',
    limit:
      'Số thẻ hoàn thành chưa phản ánh toàn bộ đóng góp của từng người. Cần đọc cả lịch sử chỉnh sửa, bình luận và biên bản; việc công khai minh chứng phải đi kèm phân quyền phù hợp và sự đồng ý của thành viên.',
    application:
      'Kho tài liệu chung kế thừa cách tổ chức dữ liệu ở Bài 1, còn quy tắc chia sẻ gắn với trách nhiệm dữ liệu ở Bài 6.',
    related: 1,
  },
  {
    title: 'Nhật ký chỉnh sửa làm rõ vai trò của người sáng tạo.',
    reasoning:
      'Brief xác định đối tượng và thông điệp trước khi tạo ảnh. Nhật ký bốn vòng prompt chỉ ra vấn đề của từng bản và lý do điều chỉnh. Tách tạo hình nền khỏi đặt chữ giúp kiểm soát nội dung tiếng Việt và bố cục.',
    limit:
      'Ảnh đẹp chưa đủ để kết luận sản phẩm đạt yêu cầu. Cần đối chiếu với brief, kiểm tra chữ trên điện thoại, rà lỗi hình ảnh và quyền sử dụng tài nguyên. Nhật ký mô tả phải đi kèm bản nháp và sản phẩm thực tế.',
    application:
      'Phân định phần người làm và phần AI hỗ trợ là cách áp dụng trực tiếp yêu cầu minh bạch của Bài 6.',
    related: 6,
  },
  {
    title: 'Biến nguyên tắc thành quyết định cụ thể.',
    reasoning:
      'Bộ nguyên tắc 5T đặt cạnh các tình huống đèn giao thông và danh sách kiểm trước khi nộp. Cách trình bày này giúp chuyển một cam kết chung thành câu hỏi có thể áp dụng: nguồn đã được kiểm tra chưa, dữ liệu có được phép chia sẻ không, vai trò AI đã được công bố chưa?',
    limit:
      'Màu đèn là khung hỗ trợ suy nghĩ; quy định cụ thể của học phần và sự cho phép của giảng viên vẫn cần được đối chiếu. Công bố AI không thay thế việc tự làm, kiểm chứng và chịu trách nhiệm về nội dung.',
    application:
      'Nguyên tắc Thẩm định quay lại phương pháp đánh giá nguồn ở Bài 2, tạo thành một quy trình học tập có kiểm tra thay vì chỉ thu thập thông tin.',
    related: 2,
  },
];
