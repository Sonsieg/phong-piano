import { baiTap } from '@/portfolio-nextjs/content/portfolio';

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
  chapterName: string;
  textbookSection: string;
  weight: string;
}
const shortTitles = [
  'Trật tự từ những điều nhỏ nhất.',
  'Đi tìm những nguồn tin có giá trị.',
  'Một câu hỏi tốt. Một khởi đầu mới.',
  'Cùng nhau tạo nên một hòa âm.',
  'Khi ý tưởng tìm thấy hình hài.',
  'Sáng tạo đi cùng trách nhiệm.',
];
const skills = [
  ['Quản lý tệp tin', 'Quy tắc đặt tên', 'Sao lưu 3-2-1'],
  ['Tìm kiếm nâng cao', 'CRAAP', 'Trích dẫn APA'],
  ['Prompt 5 thành phần', 'So sánh đầu ra', 'Kiểm chứng'],
  ['Kanban', 'Đồng soạn thảo', 'Phân quyền'],
  ['Brief sáng tạo', 'Nhật ký prompt', 'Biên tập'],
  ['Nguyên tắc 5T', 'Liêm chính', 'Trách nhiệm AI'],
];
// Nội dung bài nộp được dùng chung với gói nguồn, tránh lệch giữa danh mục và trang chi tiết.
export const assignments: Assignment[] = baiTap.map((b, i) => ({
  id: b.so,
  slug: b.slug,
  chapter: `Chương ${String(b.so).padStart(2, '0')}`,
  chapterName: b.chuong,
  textbookSection: b.mucGiaoTrinh,
  weight: ['0,5', '0,75', '0,75', '0,5', '1,0', '0,5'][i],
  title: b.ten,
  shortTitle: shortTitles[i],
  description: b.tomTat,
  skills: skills[i],
  objectives: [b.mucTieu.yeuCau, ...b.mucTieu.kyNang],
  implementationSteps: b.quaTrinh.cacBuoc.map((step) => `${step.ten}: ${step.moTa}`),
  toolsUsed: b.quaTrinh.congCu.map((tool) => tool.ten),
  aiUsage: b.quaTrinh.suDungAI.map((tool) => `${tool.congCu}: ${tool.mucDich}`).join(' '),
  challenges: b.quaTrinh.khoKhan.map((item) => item.khoKhan).join(' '),
  solutions: b.quaTrinh.khoKhan.map((item) => item.cachGiaiQuyet).join(' '),
  deliverables: [],
  references: [],
  images: [],
  status: 'Đã biên tập nội dung · Đang bổ sung minh chứng',
}));
