import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source = fs.readFileSync('portfolio-nextjs/content/portfolio.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const studentCompiled = ts.transpileModule(fs.readFileSync('src/config/student.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const studentContext = { exports: {} };
vm.runInNewContext(studentCompiled, studentContext);
const context = {
  exports: {},
  require: (name) => {
    if (name === '@/src/config/student') return studentContext.exports;
    throw new Error(`Unsupported report import: ${name}`);
  },
};
vm.runInNewContext(compiled, context);
const { baiTap, tongKet, thongTin } = context.exports;
fs.mkdirSync('submission', { recursive: true });
fs.writeFileSync(
  'submission/noi-dung.json',
  JSON.stringify({ baiTap, tongKet, thongTin }, null, 2),
);
const counts = [];
const lines = [
  '# Đối chiếu đề thi INF2501',
  '',
  'Đây là danh sách chuẩn bị nộp, không phải xác nhận bài đã đủ điều kiện chấm điểm.',
  '',
  '| Tiêu chí | Đã triển khai | Cần hoàn thiện |',
  '| --- | --- | --- |',
  '| Giới thiệu · 1,5 điểm | Trang chủ có giới thiệu, ảnh, sở thích, mục tiêu, định hướng và mục tiêu portfolio | Xác nhận tên khoa |',
  '| Dự án · 4,0 điểm | Danh mục liên kết 6 bài; đủ mục tiêu, quá trình, sản phẩm | Bổ sung ảnh, link và đầu ra thực tế theo bảng bên dưới |',
  '| Tổng kết · 1,5 điểm | Trải nghiệm, kỹ năng, tâm đắc, thách thức, hướng phát triển, bảng kê AI | Sinh viên tự rà soát, viết lại và xác nhận cảm nhận |',
  '| Thẩm mỹ, kỹ thuật · 1,0 điểm | Giao diện piano, menu, responsive, điều hướng, tương tác Bài 6 | Xem lại trên điện thoại và công bố URL không cần đăng nhập |',
  '| Word · 2,0 điểm | Có bản nháp A4, Times New Roman 13, giãn dòng 1,3, lề theo đề, số trang và trường mục lục | Thêm URL công khai, ảnh thực tế; cập nhật mục lục và kiểm tra số trang trong Word |',
  '',
  '## Minh chứng còn thiếu',
  '',
];
for (const b of baiTap) {
  const missing = b.sanPham.tep.filter(
    (f) => f.url.startsWith('[') || (f.url.startsWith('/') && !fs.existsSync(`public${f.url}`)),
  );
  counts.push(missing.length);
  lines.push(
    `### Bài ${b.so} — ${b.ten}`,
    '',
    `Trang: /projects/${b.slug}. ${b.chuong}; ${b.mucGiaoTrinh}.`,
    '',
  );
  for (const f of missing)
    lines.push(
      `- ${f.tieuDe}${f.url.startsWith('/') ? ` → public${f.url}` : ': cần đường liên kết chia sẻ thực tế'}.`,
    );
  lines.push('');
}
lines.push(
  '## Thông tin cần xác nhận trong nội dung',
  '',
  ...[...new Set(source.match(/\[ĐIỀN:[^\]]+\]/g) ?? [])].map((value) => `- ${value}`),
  '',
  '## Trước khi nộp',
  '',
  '- Đề mâu thuẫn về số trang Word: Câu 4 ghi 10–15 trang, bảng chấm và mô tả xếp loại ghi 6–9 trang. Bản nháp hướng theo cấu trúc 12 trang nội dung của Câu 4; hỏi giảng viên để chốt yêu cầu.',
  '- Mở tài liệu bằng Word, cập nhật toàn bộ trường (Ctrl+A, F9; trên Mac có thể cần Fn+F9), kiểm tra mục lục và số trang thực tế. Ngắt trang trong bản nháp chưa bảo đảm số trang sau khi bổ sung ảnh.',
  '- Điền URL website sau khi triển khai công khai. Thử truy cập website và từng link Drive/Trello trong cửa sổ ẩn danh.',
  '- Phần nhận xét đầu ra ở Bài 3 chưa thay cho đầu ra AI nguyên văn; cần thêm ảnh hoặc nhật ký chạy thử.',
  '- Bảng điểm CRAAP và điểm so sánh prompt lấy từ hồ sơ cung cấp; sinh viên đối chiếu lại với nguồn và kết quả thật.',
  '- Các nội dung có chú thích mẫu trong file nguồn cần được rà soát theo việc đã làm; không coi là nhật ký đã xác minh.',
  '- Phần cảm nhận và tự đánh giá phải do sinh viên tự viết theo IV.3; bản nháp không thay bước này.',
  '- Không chỉnh sửa website sau thời hạn nộp; giữ hoạt động đến lúc công bố điểm.',
  '- Tên tệp nộp cuối: 2552210313_DinhQuangPhong_BaoCao.docx.',
  '',
  `Tổng cộng: ${counts.reduce((a, b) => a + b, 0)} tệp/liên kết được khai báo nhưng chưa được cung cấp trong checkout hiện tại.`,
  '',
);
fs.writeFileSync('submission/DOI-CHIEU-DE-THI.md', lines.join('\n'));
console.log(
  `Đã tạo dữ liệu báo cáo và danh sách ${counts.reduce((a, b) => a + b, 0)} minh chứng cần bổ sung.`,
);
