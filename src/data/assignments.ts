export interface Deliverable {
  title: string;
  kind: 'image' | 'pdf' | 'video' | 'link';
  url: string;
}
export interface Assignment {
  id: number;
  slug: string;
  chapter: string;
  title: string;
  shortTitle: string;
  description: string;
  objectives: string[];
  skills: string[];
  implementationSteps: string[];
  toolsUsed: string[];
  aiUsage: string;
  challenges: string;
  solutions: string;
  deliverables: Deliverable[];
  references: {
    title: string;
    url: string;
  }[];
  images: string[];
  status: string;
}
const entries = [
  {
    title: 'Thao tác cơ bản với tệp tin và thư mục',
    shortTitle: 'Trật tự từ những điều nhỏ nhất.',
    description:
      'Tổ chức không gian học tập số, quản trị tệp tin và xây dựng một hệ thống lưu trữ có chủ đích.',
    skills: ['Quản lý tệp tin', 'Tổ chức dữ liệu', 'Sao lưu'],
    objectives: [
      'Thực hành tạo, đổi tên, sao chép và di chuyển tệp tin, thư mục.',
      'Xây dựng cấu trúc lưu trữ dễ tìm kiếm, nhất quán và có bản sao lưu.',
    ],
    implementationSteps: [
      'Lập danh mục tài liệu và chia thư mục theo học phần.',
      'Đặt tên tệp theo ngày, nội dung và phiên bản.',
      'Thực hành sao chép, di chuyển và kiểm tra bản sao lưu.',
      'Chụp màn hình thao tác và đối chiếu yêu cầu bài tập.',
    ],
    toolsUsed: ['File Explorer / Finder', 'Ổ lưu trữ dự phòng'],
  },
  {
    title: 'Tìm kiếm và đánh giá thông tin học thuật',
    shortTitle: 'Đi tìm những nguồn tin có giá trị.',
    description:
      'Từ một câu hỏi nghiên cứu đến nguồn tài liệu đáng tin cậy: tìm kiếm, đối chiếu và thẩm định.',
    skills: ['Tìm kiếm học thuật', 'Thẩm định nguồn', 'Trích dẫn'],
    objectives: [
      'Xây dựng từ khóa và sử dụng toán tử tìm kiếm phù hợp.',
      'Đánh giá tác giả, thời điểm, bằng chứng và mục đích của nguồn tin.',
    ],
    implementationSteps: [
      'Xác định câu hỏi và từ khóa về giáo dục âm nhạc.',
      'Tìm tài liệu bằng các truy vấn cụ thể.',
      'Đối chiếu tác giả, năm xuất bản và phương pháp nghiên cứu.',
      'Ghi lại trích dẫn và lưu bằng chứng tìm kiếm.',
    ],
    toolsUsed: ['Google Scholar', 'Google Search', 'Bảng đánh giá nguồn'],
  },
  {
    title: 'Viết Prompt hiệu quả cho các tác vụ học tập',
    shortTitle: 'Một câu hỏi tốt. Một khởi đầu mới.',
    description:
      'Rèn cách giao tiếp với AI bằng ngữ cảnh rõ ràng, yêu cầu cụ thể và tiêu chí kiểm chứng.',
    skills: ['Thiết kế prompt', 'Tư duy phản biện', 'Đánh giá đầu ra'],
    objectives: [
      'Phân biệt yêu cầu mơ hồ và prompt có ngữ cảnh.',
      'Thực hành cải tiến prompt và kiểm tra chất lượng phản hồi.',
    ],
    implementationSteps: [
      'Chọn một tác vụ học tập cụ thể.',
      'Viết prompt ban đầu và lưu phản hồi.',
      'Bổ sung vai trò, bối cảnh, định dạng và tiêu chí.',
      'So sánh kết quả và tự kiểm chứng thông tin.',
    ],
    toolsUsed: ['Công cụ AI do sinh viên lựa chọn', 'Trình soạn thảo'],
  },
  {
    title: 'Sử dụng công cụ hợp tác trực tuyến cho dự án nhóm',
    shortTitle: 'Cùng nhau tạo nên một hòa âm.',
    description:
      'Phân công rõ ràng, kết nối ý tưởng và phối hợp trong một không gian làm việc chung.',
    skills: ['Làm việc nhóm', 'Quản lý tiến độ', 'Giao tiếp'],
    objectives: [
      'Thiết kế quy trình cộng tác và phân công nhiệm vụ.',
      'Theo dõi tiến độ, phản hồi và quản lý phiên bản tài liệu.',
    ],
    implementationSteps: [
      'Thống nhất mục tiêu, thành viên và vai trò.',
      'Tạo không gian tài liệu chung, phân quyền phù hợp.',
      'Lập danh sách công việc, thời hạn và người phụ trách.',
      'Tổng hợp phản hồi và ghi lại lịch sử chỉnh sửa.',
    ],
    toolsUsed: ['Google Docs (gợi ý)', 'Trello (gợi ý)', 'Google Meet (gợi ý)'],
  },
  {
    title: 'Sử dụng AI tạo sinh để hỗ trợ sáng tạo nội dung',
    shortTitle: 'Khi ý tưởng tìm thấy hình hài.',
    description:
      'Khám phá khả năng sáng tạo cùng AI, từ ý tưởng ban đầu đến một sản phẩm có dấu ấn cá nhân.',
    skills: ['Sáng tạo nội dung', 'Biên tập', 'Công bố AI'],
    objectives: [
      'Xây dựng ý tưởng nội dung gắn với âm nhạc.',
      'Ghi lại prompt, công cụ và đóng góp biên tập của bản thân.',
    ],
    implementationSteps: [
      'Xây dựng brief cho một nội dung giáo dục âm nhạc.',
      'Viết prompt, lựa chọn công cụ và ghi phiên bản.',
      'Biên tập, kiểm tra quyền sử dụng và độ chính xác.',
      'Xuất sản phẩm, lưu bản gốc và công bố vai trò AI.',
    ],
    toolsUsed: ['Công cụ AI tạo sinh do sinh viên lựa chọn', 'Phần mềm biên tập'],
  },
  {
    title: 'Sử dụng AI có trách nhiệm trong học tập và nghiên cứu',
    shortTitle: 'Sáng tạo đi cùng trách nhiệm.',
    description:
      'Xây dựng nguyên tắc sử dụng AI minh bạch, tôn trọng bản quyền và trung thực trong học thuật.',
    skills: ['Đạo đức AI', 'Bảo vệ dữ liệu', 'Liêm chính học thuật'],
    objectives: [
      'Nhận biết thông tin sai lệch, thiên lệch và rủi ro riêng tư.',
      'Thực hành kiểm chứng nguồn và công bố việc sử dụng AI.',
    ],
    implementationSteps: [
      'Xác định các tình huống rủi ro trong học tập.',
      'Đối chiếu quy định học phần và hướng dẫn giảng viên.',
      'Lập checklist kiểm chứng, trích dẫn và quyền riêng tư.',
      'Viết cam kết sử dụng AI bằng trải nghiệm cá nhân.',
    ],
    toolsUsed: ['Checklist tự đánh giá', 'Quy định của học phần'],
  },
];
export const assignments: Assignment[] = entries.map((entry, i) => ({
  ...entry,
  id: i + 1,
  slug: `bai-${i + 1}`,
  chapter: `Chương ${String(i + 1).padStart(2, '0')}`,
  aiUsage:
    'Chưa có nhật ký sử dụng AI của sinh viên. Cần ghi rõ công cụ, mục đích, prompt và phần tự biên tập trước khi nộp.',
  challenges: 'Chưa bổ sung trải nghiệm thực tế.',
  solutions: 'Chưa bổ sung cách giải quyết của sinh viên.',
  deliverables: [],
  references: [],
  images: [],
  status: 'Chờ bổ sung minh chứng',
}));
