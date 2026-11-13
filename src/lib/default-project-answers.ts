import type { JSONContent } from '@tiptap/react';
import { baiTap, type Khoi } from '@/portfolio-nextjs/content/portfolio';
import { learningConnections } from '@/src/data/learning-connections';
import { basicSteps } from '@/src/data/basic-assignment-one';

function inline(text: string): JSONContent[] {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return { type: 'text', text: part.slice(2, -2), marks: [{ type: 'bold' }] };
      if (part.startsWith('`') && part.endsWith('`'))
        return { type: 'text', text: part.slice(1, -1), marks: [{ type: 'code' }] };
      return { type: 'text', text: part };
    });
}
const p = (text: string): JSONContent => ({ type: 'paragraph', content: inline(text) });
const h = (text: string): JSONContent => ({
  type: 'heading',
  attrs: { level: 3 },
  content: inline(text),
});
function blocks(block: Khoi): JSONContent[] {
  switch (block.kieu) {
    case 'doan':
      return [p(block.noiDung)];
    case 'tieuDe':
      return [h(block.noiDung)];
    case 'danhSach':
      return [
        {
          type: block.danhSo ? 'orderedList' : 'bulletList',
          content: block.muc.map((text) => ({ type: 'listItem', content: [p(text)] })),
        },
      ];
    case 'bang':
      return [
        ...block.dong.map((row) =>
          p(row.map((cell, i) => `${block.cot[i] ?? ''}: ${cell}`).join('\n')),
        ),
        ...(block.chuThich ? [p(block.chuThich)] : []),
      ];
    case 'ma':
      return [
        { type: 'codeBlock', content: [{ type: 'text', text: block.noiDung }] },
        ...(block.chuThich ? [p(block.chuThich)] : []),
      ];
    case 'trichDan':
      return [
        { type: 'blockquote', content: [p(block.noiDung)] },
        ...(block.chuThich ? [p(block.chuThich)] : []),
      ];
    case 'soSanh':
      return block.cot.flatMap((item) => [h(item.nhan), p(item.prompt), p(item.ketQua)]);
    case 'luoiThe':
      return block.the.flatMap((item) => [
        ...(item.nhan ? [p(item.nhan)] : []),
        h(item.tieuDe),
        p(item.noiDung),
      ]);
    case 'tinhHuong':
      return block.cau.flatMap((item) => [
        h(item.tinhHuong),
        p(`Đáp án: ${item.dapAn}`),
        p(item.giaiThich),
      ]);
  }
}
export function defaultProjectAnswer(id: number): string {
  const lesson = baiTap.find((item) => item.so === id);
  if (!lesson) throw new Error('Bài tập không hợp lệ.');
  const insight = learningConnections[id - 1];
  const content: JSONContent[] = [h(lesson.ten)];
  if (id === 1) {
    content.push(
      h('Thao tác cơ bản với tệp tin và thư mục'),
      ...basicSteps.flatMap((step) => [
        h(step.title),
        p(step.text),
        ...(step.extra ? [p(step.extra)] : []),
      ]),
      h('Khó khăn gặp phải & cách giải quyết'),
      p('Khó khăn: Mới đầu dùng máy hay cắm nhầm cổng USB hoặc lưu bài bừa bãi không tìm thấy.'),
      p(
        'Cách giải quyết: Nhớ kỹ các cổng hình chữ nhật ở thân máy là cắm USB hoặc chuột, và luôn tạo một thư mục riêng trong ổ đĩa D: để lưu mọi bài tập cho ngăn nắp.',
      ),
      h('Bài tập 1, theo cách nâng cao'),
    );
  }
  content.push(
    h('Mục tiêu & kỹ năng'),
    p(lesson.mucTieu.yeuCau),
    ...lesson.mucTieu.kyNang.map(p),
    h('Quá trình thực hiện'),
    ...lesson.quaTrinh.cacBuoc.flatMap((step) => [h(step.ten), p(step.moTa)]),
    h('Công cụ và mục đích sử dụng'),
    ...lesson.quaTrinh.congCu.map((tool) => p(`${tool.ten}: ${tool.mucDich}`)),
    h('Công bố sử dụng AI'),
    ...lesson.quaTrinh.suDungAI.map((tool) => p(`${tool.congCu}: ${tool.mucDich}`)),
    h('Khó khăn và cách giải quyết'),
    ...lesson.quaTrinh.khoKhan.flatMap((item) => [p(item.khoKhan), p(item.cachGiaiQuyet)]),
    h('Sản phẩm cuối cùng'),
    p(lesson.sanPham.gioiThieu),
    ...lesson.sanPham.khoi.flatMap(blocks),
    h('Minh chứng & tệp đính kèm'),
    ...lesson.sanPham.tep.map((file) =>
      p(`${file.tieuDe}${file.moTa ? ` — ${file.moTa}` : ''}\n${file.url}`),
    ),
    h(insight.title),
    p(insight.reasoning),
    h('Giới hạn cần nhận diện'),
    p(insight.limit),
    h('Kết nối với hành trình học tập'),
    p(insight.application),
  );
  return JSON.stringify({ type: 'doc', content });
}
