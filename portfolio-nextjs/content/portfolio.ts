import { student } from '@/src/config/student';

// Nội dung chữ của Portfolio — học phần INF2501 "Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo".
// Gồm: 6 trang bài tập (Câu 2 của đề) + trang Tổng kết (Câu 3) + thông tin chân trang.
//
// Trước khi nộp:
//   1. Tìm "[ĐIỀN" và thay bằng thông tin thật của bạn (trên web, các chỗ này hiện nền vàng để dễ thấy).
//   2. Dòng có chú thích ✏️ là chi tiết mẫu: sửa cho khớp với việc bạn đã làm thật.
//      Đề mục IV.4: giảng viên có thể gọi vấn đáp để kiểm tra bạn có tự làm hay không.
//   3. Chỗ có chú thích ⚠️ TỰ VIẾT là phần cảm nhận / tự đánh giá. Đề mục IV.3 bắt buộc sinh viên tự viết,
//      nên chỉ coi đó là khung gợi ý, hãy viết lại bằng trải nghiệm và giọng văn của bạn.
//   4. Ảnh minh chứng đặt vào thư mục public/ đúng đường dẫn ghi ở `url` (vd public/bai-tap/bai-1/sau.png).
//      Link Google Drive / Trello… phải mở quyền "Bất kỳ ai có đường liên kết đều xem được".

// ───────────────────────────── Kiểu dữ liệu ─────────────────────────────

export type MauDen = 'xanh' | 'vang' | 'do';

export type TepSanPham = {
  loai: 'anh' | 'pdf' | 'video' | 'lienKet';
  tieuDe: string;
  /** ảnh: đường dẫn trong public/ ("/bai-tap/bai-1/sau.png").
   *  pdf / video / liên kết: dán nguyên link chia sẻ Google Drive, YouTube, Trello… (tự đổi sang dạng nhúng). */
  url: string;
  moTa?: string;
};

/** Các khối nội dung dùng trong phần "Sản phẩm cuối cùng". Trong chuỗi: **đậm**, `mã`. */
export type Khoi =
  | { kieu: 'doan'; noiDung: string }
  | { kieu: 'tieuDe'; noiDung: string }
  | { kieu: 'danhSach'; muc: string[]; danhSo?: boolean }
  | { kieu: 'bang'; cot: string[]; dong: string[][]; chuThich?: string }
  | { kieu: 'ma'; noiDung: string; chuThich?: string }
  | { kieu: 'trichDan'; noiDung: string; chuThich?: string }
  | { kieu: 'soSanh'; cot: { nhan: string; prompt: string; ketQua: string }[] }
  | { kieu: 'luoiThe'; the: { nhan?: string; tieuDe: string; noiDung: string; mau?: MauDen }[] }
  | { kieu: 'tinhHuong'; cau: { tinhHuong: string; dapAn: MauDen; giaiThich: string }[] };

export type BaiTap = {
  slug: string;
  so: number;
  chuong: string;
  mucGiaoTrinh: string;
  ten: string;
  tomTat: string;
  mucTieu: { yeuCau: string; kyNang: string[] };
  quaTrinh: {
    cacBuoc: { ten: string; moTa: string }[];
    congCu: { ten: string; mucDich: string }[];
    suDungAI: { congCu: string; mucDich: string }[];
    khoKhan: { khoKhan: string; cachGiaiQuyet: string }[];
  };
  sanPham: { gioiThieu: string; khoi: Khoi[]; tep: TepSanPham[] };
};

export type TongKet = {
  moDau: string;
  traiNghiem: string[];
  kienThuc: { slug?: string; noiDung: string }[];
  tamDac: string[];
  thachThuc: { thachThuc: string; cachVuotQua: string }[];
  congCuAI: { congCu: string; mucDich: string; dungO: string }[];
  huongTiepTheo: string[];
  loiKet: string[];
  khauHieu: string;
  loiCamOn: string;
};

// ───────────────────────────── Thông tin chung ─────────────────────────────

export const thongTin = {
  hoTen: student.name,
  maSV: student.studentId,
  lop: student.className,
  hocPhan: `${student.courseName} (${student.courseCode})`,
  truong: student.university,
  khoa: student.faculty,
  nganhHoc: student.major,
  soThich: student.hobbies,
  namSinh: student.birthYear,
  email: student.email,
  giangVien: student.supervisor,
  mucTieuHocTap: student.learningGoals,
  dinhHuong: student.careerDirection,
  mucTieuPortfolio: student.portfolioPurpose,
  anhDaiDien: student.avatar,
};

// Dòng khai báo AI dùng chung cho mọi trang — giữ nguyên nếu bạn dùng Claude để soạn nội dung này.
const AI_BIEN_TAP = {
  congCu: 'Claude (Anthropic)',
  mucDich:
    'Hỗ trợ soạn bản nháp phần mô tả và gợi ý bố cục trình bày trang; tôi rà soát, chỉnh sửa cho đúng với quá trình mình đã thực hiện.',
};

export const gioiThieuDuAn =
  'Sáu bài tập dưới đây được biên tập lại từ sáu chương của học phần. Mỗi trang trình bày mục tiêu bài tập, quá trình thực hiện (công cụ, cách sử dụng AI, khó khăn và cách giải quyết) và sản phẩm cuối cùng. Các bài nối tiếp nhau: quy tắc đặt tên ở Bài 1 được dùng lại cho kho tài liệu nhóm ở Bài 4, cách thẩm định nguồn ở Bài 2 trở thành một nguyên tắc ở Bài 6.';

// ───────────────────────────── 6 bài tập ─────────────────────────────

export const baiTap: BaiTap[] = [
  // ═══════════════ BÀI 1 ═══════════════
  {
    slug: 'bai-1',
    so: 1,
    chuong: 'Chương 1: Máy tính và các thiết bị ngoại vi',
    mucGiaoTrinh: 'Bài tập 1 (mục 1.4)',
    ten: 'Thao tác cơ bản với tệp tin và thư mục',
    tomTat:
      'Sắp xếp toàn bộ tài liệu học tập vào một cây thư mục thống nhất, kèm bộ quy tắc đặt tên tệp và thói quen sao lưu 3-2-1.',
    mucTieu: {
      yeuCau:
        'Thiết lập một hệ thống thư mục khoa học để lưu trữ toàn bộ tài liệu của học phần; xây dựng và áp dụng quy tắc đặt tên tệp thống nhất; thực hành đầy đủ các thao tác cơ bản với tệp và thư mục (tạo, đổi tên, sao chép, di chuyển, xoá và khôi phục, tìm kiếm, nén và giải nén) và sao lưu dữ liệu lên đám mây.',
      kyNang: [
        'Quản lý tệp và thư mục bằng File Explorer trên Windows, dùng phím tắt để thao tác nhanh.',
        'Tư duy tổ chức thông tin theo cấp bậc: từ tổng quát đến chi tiết, không quá 4 cấp.',
        'Đặt tên tệp nhất quán để tìm kiếm, sắp xếp và chia sẻ không gặp lỗi.',
        'Bảo vệ dữ liệu cá nhân bằng thói quen sao lưu theo nguyên tắc 3-2-1.',
      ],
    },
    quaTrinh: {
      cacBuoc: [
        {
          ten: 'Khảo sát hiện trạng',
          // ✏️ mô tả đúng tình trạng máy của bạn trước khi sắp xếp
          moTa: 'Rà soát mọi nơi đang chứa tài liệu học tập: Desktop, Downloads, thư mục nhận tệp của Zalo và Google Drive. Các vấn đề ghi nhận được: tệp nằm rải rác, nhiều bản trùng kiểu `baitap (1).docx` hay `baocao-final-final.docx`, tên có dấu và khoảng trắng, không biết đâu là bản mới nhất.',
        },
        {
          ten: 'Thiết kế cây thư mục trên giấy',
          moTa: 'Phác thảo cấu trúc theo nguyên tắc “từ chung đến riêng”: Năm học → Học phần → Chương → Loại tài liệu. Mỗi chương dùng lại cùng một bộ thư mục con (Bài giảng, Bài tập, Tài liệu tham khảo) để ở đâu cũng tìm theo cùng một thói quen.',
        },
        {
          ten: 'Xây dựng quy tắc đặt tên',
          moTa: 'Thống nhất mẫu `NgayThang_MaHocPhan_NoiDung_PhienBan.duoi`, viết không dấu, không khoảng trắng (chi tiết ở Bảng 1.1).',
        },
        {
          ten: 'Thực hiện trên máy',
          moTa: 'Tạo thư mục (**Ctrl + Shift + N**), đổi tên (**F2**), di chuyển (**Ctrl + X** rồi **Ctrl + V**), sao chép (**Ctrl + C** rồi **Ctrl + V**), xoá và khôi phục tệp từ Thùng rác. Bật hiển thị phần mở rộng tệp (View → Show → File name extensions) để không nhầm định dạng và nhận ra tệp giả mạo kiểu `taiLieu.pdf.exe`.',
        },
        {
          ten: 'Tìm kiếm và nén tệp',
          moTa: 'Dùng ô tìm kiếm của File Explorer với ký tự đại diện (`*.pdf`) và bộ lọc Ngày sửa đổi để tìm nhanh tài liệu; nén thư mục bài tập thành tệp .zip (chuột phải → Compress to ZIP file) trước khi gửi qua email.',
        },
        {
          ten: 'Sao lưu theo nguyên tắc 3-2-1',
          moTa: 'Giữ 3 bản sao dữ liệu, trên 2 loại thiết bị khác nhau, trong đó 1 bản nằm ngoài máy: ổ cứng máy tính, USB và Google Drive (đồng bộ tự động bằng Google Drive for desktop).',
        },
        {
          ten: 'Chụp minh chứng',
          moTa: 'Chụp ảnh thư mục trước và sau khi sắp xếp (**Win + Shift + S**), xuất sơ đồ cây bằng lệnh `tree /f` trong Command Prompt.',
        },
      ],
      congCu: [
        {
          ten: 'File Explorer (Windows 11)',
          mucDich: 'Tạo, đổi tên, di chuyển, tìm kiếm, nén tệp và thư mục.',
        },
        { ten: 'Command Prompt (lệnh tree /f)', mucDich: 'Xuất sơ đồ cây thư mục dạng văn bản.' },
        {
          ten: 'Google Drive for desktop',
          mucDich: 'Đồng bộ thư mục học tập lên đám mây làm bản sao lưu ngoài máy.',
        },
        { ten: 'Snipping Tool', mucDich: 'Chụp ảnh màn hình minh chứng.' },
      ],
      suDungAI: [AI_BIEN_TAP],
      khoKhan: [
        {
          khoKhan:
            'Tên tệp có dấu tiếng Việt bị lỗi ký tự khi giải nén tệp .zip trên máy khác hoặc khi tải lên một số hệ thống.',
          cachGiaiQuyet:
            'Quy định đặt tên không dấu, không khoảng trắng; dấu gạch dưới (_) ngăn các phần, gạch ngang (-) nối các từ.',
        },
        {
          khoKhan: 'Không phân biệt được đâu là bản mới nhất giữa nhiều tệp tên gần giống nhau.',
          cachGiaiQuyet:
            'Đặt ngày dạng NămThángNgày ở đầu tên để tệp tự xếp theo thời gian; thêm hậu tố phiên bản v01, v02… và bỏ hẳn chữ “final”.',
        },
        {
          khoKhan: 'Tệp tải về luôn rơi vào Downloads, chỉ vài ngày sau lại lộn xộn.',
          cachGiaiQuyet:
            'Tạo thư mục `00_ChoXuLy` làm “hộp thư đến” và dành 5 phút tối Chủ nhật hằng tuần để phân loại.',
        },
        {
          khoKhan: 'Thư mục lồng quá sâu, mở mất nhiều bước.',
          cachGiaiQuyet:
            'Giới hạn tối đa 4 cấp; ghim thư mục học phần vào Quick access của File Explorer.',
        },
      ],
    },
    sanPham: {
      gioiThieu:
        'Sản phẩm gồm cây thư mục tối ưu cho học phần, bộ quy tắc đặt tên tệp, bảng phím tắt đã dùng và ảnh chụp trước, sau khi sắp xếp.',
      khoi: [
        { kieu: 'tieuDe', noiDung: '1. Cấu trúc thư mục tối ưu' },
        {
          kieu: 'ma',
          chuThich: 'Hình 1.1. Sơ đồ cây thư mục học phần (xuất bằng lệnh tree /f, đã rút gọn)',
          // ✏️ đổi năm học / học kỳ cho đúng
          noiDung: `D:\\HocTap\\2026-2027_HK1
└── INF2501_NhapMonCNS-AI
    ├── 00_ChoXuLy                   ← “hộp thư đến”: tệp mới tải về, dọn mỗi Chủ nhật
    ├── 01_Chuong1_MayTinh-ThietBi
    │   ├── BaiGiang
    │   ├── BaiTap
    │   │   └── 20261015_INF2501_C1-BaiTap-1-4_v02.docx
    │   └── TaiLieuThamKhao
    ├── 02_Chuong2_DuLieu-ThongTin   (mỗi chương có 3 thư mục con như Chương 1)
    ├── 03_Chuong3_TriTueNhanTao
    ├── 04_Chuong4_GiaoTiep-HopTac
    ├── 05_Chuong5_SangTaoNoiDung
    ├── 06_Chuong6_AnToan-LiemChinh
    ├── 07_Portfolio
    │   ├── HinhAnh
    │   └── MinhChung
    ├── 08_BaoCaoCuoiKy
    ├── 09_DeCuong-QuyDinh
    └── 99_LuuTru                    ← bản cũ, bản đã nộp (không xoá ngay)`,
        },
        {
          kieu: 'danhSach',
          muc: [
            'Tiền tố 2 chữ số (00–99) giữ thứ tự hiển thị giống nhau trên mọi máy, trên Google Drive và trong tệp nén.',
            'Mỗi chương dùng chung 3 thư mục con, nên chỉ cần nhớ một thói quen tìm kiếm duy nhất.',
            '`00_ChoXuLy` hứng mọi tệp mới, `99_LuuTru` giữ bản cũ: các thư mục còn lại luôn gọn gàng.',
            'Giữ cấu trúc ngắn gọn; đường dẫn tới bài tập có thể sâu hơn các nhánh tài liệu chung. Kiểm tra lại số cấp sau khi thêm thư mục.',
          ],
        },
        { kieu: 'tieuDe', noiDung: '2. Quy tắc đặt tên tệp' },
        {
          kieu: 'bang',
          cot: ['Quy tắc', 'Ví dụ đúng', 'Ví dụ cần tránh'],
          dong: [
            [
              'Ngày đứng đầu, dạng NămThángNgày (YYYYMMDD) để tệp tự xếp theo thời gian',
              '`20261015_...`',
              '`15-10_...`, `ngay15thang10_...`',
            ],
            [
              'Không dấu, không khoảng trắng; `_` ngăn các phần, `-` nối các từ',
              '`BaoCao-Nhom2`',
              '`Báo cáo nhóm 2`',
            ],
            ['Có mã học phần để lọc nhanh khi tìm kiếm', '`INF2501`', '(không ghi môn học)'],
            [
              'Phần nội dung ngắn gọn, đúng trọng tâm, dưới 40 ký tự',
              '`C2-BangDanhGiaNguon`',
              '`tai-lieu-moi-tai-ve-hom-qua`',
            ],
            ['Phiên bản 2 chữ số, không dùng “final”', '`_v03`', '`_final`, `_final-final`, `(1)`'],
            [
              'Tệp nộp bài theo đúng mẫu giảng viên quy định',
              '`MaSV_HoTen_BaoCao.docx`',
              '`baocao.docx`',
            ],
          ],
          chuThich:
            'Bảng 1.1. Quy tắc đặt tên tệp. Mẫu chung: NgayThang_MaHocPhan_NoiDung_PhienBan.duoi',
        },
        {
          kieu: 'ma',
          chuThich: 'Một số tệp đặt tên theo quy tắc',
          // ✏️ thay bằng tên tệp thật của bạn
          noiDung: `20261015_INF2501_C1-BaiTap-1-4_v02.docx
20261022_INF2501_C2-BangDanhGiaNguon_v01.xlsx
20261029_INF2501_C3-SoSanhPrompt_v01.pdf
YYYYMMDD_INF2501_C5-Poster-AI_v03.png`,
        },
        { kieu: 'tieuDe', noiDung: '3. Phím tắt đã sử dụng' },
        {
          kieu: 'bang',
          cot: ['Phím tắt', 'Chức năng'],
          dong: [
            ['Win + E', 'Mở File Explorer'],
            ['Ctrl + Shift + N', 'Tạo thư mục mới'],
            ['F2', 'Đổi tên tệp, thư mục'],
            ['Ctrl + C / Ctrl + X / Ctrl + V', 'Sao chép / Cắt / Dán'],
            ['Ctrl + Z', 'Hoàn tác thao tác vừa làm'],
            ['Delete / Shift + Delete', 'Xoá vào Thùng rác / Xoá vĩnh viễn (cần cẩn thận)'],
            ['Win + Shift + S', 'Chụp một vùng màn hình'],
          ],
          chuThich: 'Bảng 1.2. Phím tắt quản lý tệp trên Windows',
        },

        // Bổ sung chọn lọc từ tài liệu người dùng gửi; diễn giải, không ghi nhận là thực nghiệm mới.
        { kieu: 'tieuDe', noiDung: 'Tìm hiểu thêm: thiết bị và bản chất thao tác tệp' },
        {
          kieu: 'bang',
          cot: ['Nhóm thiết bị', 'Ví dụ gần với việc học âm nhạc', 'Vai trò'],
          dong: [
            [
              'Đầu vào',
              'Bàn phím, chuột, micro',
              'Nhập lệnh, thao tác và thu âm để đưa dữ liệu vào máy tính.',
            ],
            [
              'Đầu ra',
              'Màn hình, loa, tai nghe',
              'Hiển thị tài liệu, nghe lại bản thu hoặc kết quả xử lý âm thanh.',
            ],
            [
              'Lưu trữ ngoài',
              'USB, ổ SSD di động',
              'Lưu và chuyển tài liệu, bản thu; có thể dùng làm một nơi giữ bản sao dự phòng.',
            ],
          ],
          chuThich: 'Bảng 1.3. Liên hệ thiết bị với hoạt động học tập chuyên ngành.',
        },
        {
          kieu: 'bang',
          cot: ['Thao tác', 'Bản chất', 'Điều cần kiểm tra'],
          dong: [
            [
              'Sao chép',
              'Tạo bản sao ở vị trí đích, giữ tệp tại vị trí nguồn.',
              'Mở thử bản sao; tránh nhầm hai tệp cùng tên nhưng khác phiên bản.',
            ],
            [
              'Di chuyển',
              'Chuyển tệp sang vị trí khác.',
              'Kiểm tra đúng thư mục đích trước khi dọn vị trí cũ.',
            ],
            [
              'Xóa và khôi phục',
              'Tệp bị xóa có thể được khôi phục từ Thùng rác nếu còn ở đó.',
              'Không mặc định mọi thao tác xóa đều qua Thùng rác; kiểm tra bản sao trước khi xóa.',
            ],
            [
              'Nén ZIP',
              'Gom tệp và thư mục thành một gói thuận tiện để chia sẻ.',
              'ZIP thông thường không tự bảo mật dữ liệu; giải nén thử và mở các tệp trước khi nộp.',
            ],
          ],
          chuThich:
            'Bảng 1.4. Phân biệt thao tác và cách kiểm tra kết quả; dùng làm hướng dẫn đối chiếu, không thay ảnh thực hành.',
        },
      ],
      tep: [
        {
          loai: 'anh',
          tieuDe: 'Hình 1.2. Thư mục Downloads trước khi sắp xếp',
          url: '/bai-tap/bai-1/truoc.png',
        },
        {
          loai: 'anh',
          tieuDe: 'Hình 1.3. Cây thư mục học phần sau khi sắp xếp',
          url: '/bai-tap/bai-1/sau.png',
        },
        {
          loai: 'lienKet',
          tieuDe: 'Thư mục mẫu trên Google Drive',
          url: '[ĐIỀN: link thư mục Google Drive, quyền xem công khai]',
          moTa: 'Chỉ chia sẻ thư mục mẫu, không chia sẻ tệp có thông tin cá nhân.',
        },
      ],
    },
  },

  // ═══════════════ BÀI 2 ═══════════════
  {
    slug: 'bai-2',
    so: 2,
    chuong: 'Chương 2: Khai thác dữ liệu và thông tin',
    mucGiaoTrinh: 'Bài tập 2 (mục 2.4)',
    ten: 'Tìm kiếm và đánh giá thông tin học thuật',
    tomTat:
      'Tìm tài liệu về AI tạo sinh trong giáo dục nghệ thuật bằng 8 câu lệnh tìm kiếm nâng cao, chấm 6 nguồn theo tiêu chí CRAAP và trích dẫn theo APA 7.',
    mucTieu: {
      yeuCau:
        'Chọn một chủ đề học thuật gắn với ngành học, xây dựng chiến lược tìm kiếm bằng các toán tử nâng cao trên Google và Google Scholar; chọn lọc các nguồn tiêu biểu, đánh giá độ tin cậy của từng nguồn theo bộ tiêu chí CRAAP và trích dẫn theo chuẩn APA (ấn bản thứ 7).',
      kyNang: [
        'Xác định nhu cầu thông tin, chuyển câu hỏi thành từ khoá tiếng Việt và tiếng Anh.',
        'Dùng toán tử tìm kiếm nâng cao: dấu ngoặc kép, OR, dấu trừ, site:, filetype:, allintitle:, author:.',
        'Tư duy phản biện khi đánh giá nguồn tin theo tiêu chí CRAAP và kỹ thuật “đọc ngang” (lateral reading).',
        'Quản lý tài liệu tham khảo và trích dẫn tự động bằng Zotero.',
      ],
    },
    quaTrinh: {
      cacBuoc: [
        {
          ten: 'Xác định chủ đề và câu hỏi tìm kiếm',
          // ✏️ đổi nếu bạn chọn chủ đề khác
          moTa: 'Chủ đề: **Ứng dụng AI tạo sinh trong giáo dục nghệ thuật**. Câu hỏi: AI tạo sinh đang được dùng như thế nào trong dạy và học nghệ thuật, và người học cần lưu ý gì về đạo đức, liêm chính học thuật?',
        },
        {
          ten: 'Lập bảng từ khoá',
          moTa: 'Tách câu hỏi thành 3 nhóm khái niệm (AI tạo sinh, giáo dục nghệ thuật, đạo đức và liêm chính); mỗi nhóm có từ đồng nghĩa tiếng Việt và tiếng Anh (Bảng 2.1).',
        },
        {
          ten: 'Tìm kiếm với toán tử nâng cao',
          moTa: 'Chạy lần lượt 8 câu lệnh ở Bảng 2.2, đi từ rộng đến hẹp; sau mỗi lần thu hẹp ghi lại số kết quả và nhận xét mức độ liên quan.',
        },
        {
          ten: 'Sàng lọc',
          moTa: 'Đọc tiêu đề và phần tóm tắt (abstract) để chọn 6 nguồn tiêu biểu thuộc nhiều loại khác nhau: văn bản pháp quy, báo cáo của tổ chức quốc tế, bài báo khoa học, bách khoa mở và mạng xã hội.',
        },
        {
          ten: 'Đánh giá theo CRAAP',
          moTa: 'Chấm từng nguồn theo 5 tiêu chí, thang 1–5: Currency (tính thời sự), Relevance (mức độ liên quan), Authority (thẩm quyền), Accuracy (độ chính xác), Purpose (mục đích). Kết hợp “đọc ngang”: mở tab mới để xem tác giả, tạp chí, tổ chức phát hành được các nguồn khác đánh giá thế nào.',
        },
        {
          ten: 'Lưu và trích dẫn',
          moTa: 'Lưu các nguồn đạt yêu cầu vào Zotero bằng tiện ích Zotero Connector, xuất danh mục tài liệu tham khảo theo APA 7.',
        },
      ],
      congCu: [
        {
          ten: 'Google Search',
          mucDich: 'Tìm văn bản chính thống, tài liệu PDF trên các trang .gov.vn, .edu.vn.',
        },
        {
          ten: 'Google Scholar',
          mucDich:
            'Tìm bài báo khoa học, xem số trích dẫn, tìm bản toàn văn qua mục “Tất cả các phiên bản”.',
        },
        { ten: 'Zotero + Zotero Connector', mucDich: 'Lưu nguồn, tạo trích dẫn APA 7 tự động.' },
        { ten: 'Google Sheets', mucDich: 'Lập bảng chấm điểm CRAAP.' },
        {
          ten: 'Scimago Journal Rank, DOAJ',
          mucDich: 'Kiểm tra tạp chí có uy tín và có bình duyệt.',
        },
      ],
      suDungAI: [
        {
          congCu: '[ĐIỀN: ChatGPT / Gemini / Copilot]',
          mucDich:
            'Gợi ý từ đồng nghĩa tiếng Anh cho bảng từ khoá. Tôi không dùng AI để tìm tài liệu: mọi nguồn trong bảng đều do tôi tự tìm và mở đọc trên Google, Google Scholar.',
        },
        AI_BIEN_TAP,
      ],
      khoKhan: [
        {
          khoKhan: 'Quá nhiều kết quả, lẫn quảng cáo khoá học và bài bán hàng.',
          cachGiaiQuyet:
            'Dùng dấu ngoặc kép cho cụm từ chính xác, dấu trừ để loại từ nhiễu, `site:` để giới hạn trong các trang .gov.vn, .edu.vn.',
        },
        {
          khoKhan: 'Nguồn chất lượng chủ yếu bằng tiếng Anh, nhiều thuật ngữ khó.',
          cachGiaiQuyet:
            'Lập bảng từ khoá song ngữ; đọc phần tóm tắt trước, chỉ đọc kỹ những bài thật sự liên quan; khi trích dẫn luôn dựa vào bản gốc, không dựa vào bản dịch máy.',
        },
        {
          khoKhan: 'Nhiều bài báo yêu cầu trả phí.',
          cachGiaiQuyet:
            'Bấm “Tất cả các phiên bản” trên Google Scholar để tìm bản toàn văn được phép chia sẻ (kho lưu trữ của trường, trang cá nhân của tác giả); ưu tiên tài liệu truy cập mở.',
        },
        {
          khoKhan:
            'Chatbot AI có thể đưa ra tên bài báo nghe rất thật nhưng không tồn tại (hiện tượng “ảo giác”).',
          cachGiaiQuyet:
            'Quy tắc: không trích dẫn tài liệu nào tôi chưa tự tìm thấy và mở đọc; kiểm tra mã DOI trên doi.org.',
        },
      ],
    },
    sanPham: {
      gioiThieu:
        'Sản phẩm gồm bảng từ khoá, bảng câu lệnh tìm kiếm nâng cao kèm ảnh chụp kết quả, bảng đánh giá 6 nguồn theo CRAAP và danh mục tài liệu tham khảo chuẩn APA 7.',
      khoi: [
        { kieu: 'tieuDe', noiDung: '1. Bảng từ khoá song ngữ' },
        {
          kieu: 'bang',
          cot: ['Nhóm khái niệm', 'Tiếng Việt', 'Tiếng Anh'],
          dong: [
            [
              'AI tạo sinh',
              'trí tuệ nhân tạo, AI tạo sinh, ChatGPT',
              'artificial intelligence, generative AI, large language model',
            ],
            [
              'Giáo dục nghệ thuật',
              'giáo dục nghệ thuật, sư phạm mỹ thuật, sư phạm âm nhạc',
              'art education, music education, arts higher education',
            ],
            [
              'Đạo đức, liêm chính',
              'liêm chính học thuật, đạo văn, sử dụng có trách nhiệm',
              'academic integrity, plagiarism, responsible use',
            ],
          ],
          chuThich: 'Bảng 2.1. Từ khoá theo nhóm khái niệm',
        },
        { kieu: 'tieuDe', noiDung: '2. Câu lệnh tìm kiếm nâng cao' },
        {
          kieu: 'bang',
          cot: ['#', 'Câu lệnh', 'Công cụ', 'Toán tử và tác dụng'],
          dong: [
            [
              '1',
              '`"trí tuệ nhân tạo" "giáo dục nghệ thuật"`',
              'Google',
              'Ngoặc kép: tìm đúng cụm từ, không tách rời từng chữ',
            ],
            [
              '2',
              '`"generative AI" ("art education" OR "music education")`',
              'Google Scholar',
              '`OR`: chấp nhận một trong hai cụm từ, mở rộng kết quả',
            ],
            [
              '3',
              '`allintitle: "generative AI" education`',
              'Google Scholar',
              '`allintitle:`: mọi từ khoá phải nằm trong tiêu đề bài báo',
            ],
            [
              '4',
              '`"AI tạo sinh" "giáo dục" -"khóa học" -"học phí"`',
              'Google',
              'Dấu trừ: loại các trang quảng cáo khoá học',
            ],
            [
              '5',
              '`"trí tuệ nhân tạo" "giáo dục" site:edu.vn filetype:pdf`',
              'Google',
              '`site:` và `filetype:`: chỉ lấy tài liệu PDF trên trang giáo dục Việt Nam',
            ],
            [
              '6',
              '`"khung năng lực số" site:moet.gov.vn`',
              'Google',
              '`site:`: tìm văn bản gốc trên cổng thông tin của Bộ GD&ĐT',
            ],
            [
              '7',
              '`author:"W Holmes" "artificial intelligence"`',
              'Google Scholar',
              '`author:`: tìm theo một tác giả có nhiều công trình về AI trong giáo dục',
            ],
            [
              '8',
              '`"academic integrity" ChatGPT` (lọc thời gian từ 2023)',
              'Google Scholar',
              'Bộ lọc thời gian: chỉ lấy nghiên cứu từ khi AI tạo sinh trở nên phổ biến',
            ],
          ],
          chuThich: 'Bảng 2.2. Các câu lệnh đã dùng, sắp xếp từ rộng đến hẹp',
        },
        {
          kieu: 'doan',
          noiDung:
            'Nhận xét: các toán tử giới hạn phạm vi có thể giúp giảm kết quả nhiễu; toán tử OR mở rộng tập kết quả. Mức độ liên quan cần được kiểm tra trên từng truy vấn. [ĐIỀN: số kết quả trước và sau khi thu hẹp, đọc từ ảnh chụp của bạn]',
        },
        { kieu: 'tieuDe', noiDung: '3. Bảng đánh giá nguồn tin theo CRAAP' },
        {
          kieu: 'bang',
          cot: [
            'Nguồn',
            'Loại',
            'Thời sự',
            'Liên quan',
            'Thẩm quyền',
            'Chính xác',
            'Mục đích',
            'Tổng /25',
            'Kết luận',
          ],
          // ✏️ điểm là đánh giá của bạn: chấm lại sau khi tự đọc từng nguồn
          dong: [
            [
              'Miao & Holmes (2023), Guidance for generative AI in education and research, UNESCO',
              'Báo cáo của tổ chức quốc tế',
              '5',
              '5',
              '5',
              '4',
              '5',
              '**24**',
              'Dùng, nguồn chính',
            ],
            [
              'Thông tư 02/2025/TT-BGDĐT quy định Khung năng lực số cho người học',
              'Văn bản pháp quy',
              '5',
              '4',
              '5',
              '5',
              '5',
              '**24**',
              'Dùng, căn cứ pháp lý',
            ],
            [
              'Kasneci và cộng sự (2023), Learning and Individual Differences',
              'Bài báo khoa học có bình duyệt',
              '5',
              '4',
              '5',
              '4',
              '5',
              '**23**',
              'Dùng',
            ],
            [
              'Zawacki-Richter và cộng sự (2019), International Journal of Educational Technology in Higher Education',
              'Tổng quan hệ thống có bình duyệt',
              '3',
              '4',
              '5',
              '5',
              '5',
              '**22**',
              'Dùng có chọn lọc (viết trước làn sóng AI tạo sinh)',
            ],
            [
              'Bài viết Wikipedia về AI tạo sinh',
              'Bách khoa mở',
              '4',
              '3',
              '2',
              '3',
              '4',
              '**16**',
              'Chỉ để làm quen chủ đề và lần theo nguồn gốc; không trích dẫn',
            ],
            [
              'Bài đăng mạng xã hội “Top công cụ AI viết luận không bị phát hiện”, không rõ tác giả',
              'Mạng xã hội, quảng cáo',
              '4',
              '2',
              '1',
              '1',
              '1',
              '**9**',
              'Loại: mục đích thương mại, cổ suý vi phạm liêm chính',
            ],
          ],
          chuThich:
            'Bảng 2.3. Đánh giá nguồn theo CRAAP (thang 1–5 mỗi tiêu chí). Ngưỡng: từ 20 điểm thì dùng; 15–19 dùng thận trọng, phải đối chiếu thêm; dưới 15 thì loại.',
        },
        { kieu: 'tieuDe', noiDung: '4. Bài học về thẩm định nguồn' },
        {
          kieu: 'danhSach',
          muc: [
            'Một nguồn đáng tin phải trả lời được bốn câu: Ai viết? Viết khi nào? Dựa trên bằng chứng nào? Viết để làm gì?',
            'Wikipedia hữu ích để làm quen chủ đề và lần theo tài liệu gốc ở phần chú thích, nhưng không dùng làm nguồn trích dẫn.',
            'Số lượt trích dẫn trên Google Scholar cho biết mức độ ảnh hưởng, không bảo đảm nội dung đúng: vẫn phải đọc và đối chiếu.',
            'Gặp tạp chí lạ thì tra trên Scimago Journal Rank hoặc DOAJ để tránh tạp chí “săn mồi” (predatory journal).',
          ],
        },
        { kieu: 'tieuDe', noiDung: '5. Danh mục tài liệu tham khảo (APA 7)' },
        {
          kieu: 'danhSach',
          // ✏️ nên xuất lại danh mục này từ Zotero để chắc chắn đúng chuẩn APA 7
          muc: [
            'Bộ Giáo dục và Đào tạo. (2025). Thông tư số 02/2025/TT-BGDĐT quy định Khung năng lực số cho người học.',
            'Kasneci, E., Seßler, K., Küchemann, S., Bannert, M., Dementieva, D., Fischer, F., Gasser, U., Groh, G., Günnemann, S., Hüllermeier, E., Krusche, S., Kutyniok, G., Michaeli, T., Nerdel, C., Pfeffer, J., Poquet, O., Sailer, M., Schmidt, A., Seidel, T., … Kasneci, G. (2023). ChatGPT for good? On opportunities and challenges of large language models for education. Learning and Individual Differences, 103, 102274. https://doi.org/10.1016/j.lindif.2023.102274',
            'Miao, F., & Holmes, W. (2023). Guidance for generative AI in education and research. UNESCO.',
            'Zawacki-Richter, O., Marín, V. I., Bond, M., & Gouverneur, F. (2019). Systematic review of research on artificial intelligence applications in higher education – where are the educators? International Journal of Educational Technology in Higher Education, 16(1), Article 39. https://doi.org/10.1186/s41239-019-0171-0',
          ],
        },

        // Bổ sung chọn lọc từ tài liệu người dùng gửi; diễn giải, không ghi nhận là thực nghiệm mới.
        { kieu: 'tieuDe', noiDung: 'Tìm hiểu thêm: từ kết quả tìm kiếm đến hồ sơ nguồn' },
        {
          kieu: 'doan',
          noiDung:
            'Một kết quả có đuôi PDF hoặc nằm trên tên miền giáo dục vẫn cần được đọc và đánh giá. Toán tử tìm kiếm giúp chọn phạm vi; độ tin cậy phải được xem xét qua tác giả, nội dung, phương pháp và mục đích. Mức độ mới cần phù hợp với câu hỏi: nghiên cứu về AI tạo sinh cần cập nhật, còn tài liệu nền tảng có thể vẫn hữu ích dù xuất bản sớm hơn.',
        },
        {
          kieu: 'bang',
          cot: ['Thông tin cần ghi', 'Cách đối chiếu'],
          dong: [
            [
              'Câu lệnh, công cụ và ngày tìm',
              'Lưu nguyên truy vấn và ảnh chụp; phân biệt kết quả trên Google Search với Google Scholar.',
            ],
            [
              'Tên tài liệu, tác giả, năm và nơi xuất bản',
              'Đọc trên bản gốc; không dùng tên tài liệu hoặc học hàm do AI tự đề xuất làm bằng chứng.',
            ],
            [
              'Đường dẫn bản gốc hoặc DOI nếu có',
              'Mở lại liên kết, đối chiếu tiêu đề và tác giả; thông tin định danh không thay thế việc đọc nội dung.',
            ],
            [
              'Đánh giá đủ năm tiêu chí CRAAP',
              'Ghi nhận cả tính thời sự, mức độ liên quan, thẩm quyền, độ chính xác và mục đích; giải thích lý do chấm.',
            ],
            [
              'Quyết định dùng hoặc loại',
              'Nêu tài liệu giúp trả lời phần nào của câu hỏi nghiên cứu và giới hạn khi vận dụng vào giáo dục nghệ thuật.',
            ],
          ],
          chuThich:
            'Bảng 2.4. Khung ghi nhận nguồn thực tế, bổ trợ bảng chấm CRAAP; chưa phải danh sách tài liệu đã tìm thêm.',
        },
      ],
      tep: [
        {
          loai: 'anh',
          tieuDe: 'Hình 2.1. Kết quả câu lệnh 2 trên Google Scholar',
          url: '/bai-tap/bai-2/scholar.png',
        },
        {
          loai: 'anh',
          tieuDe: 'Hình 2.2. Kết quả câu lệnh 5 với site: và filetype:',
          url: '/bai-tap/bai-2/google-site.png',
        },
        {
          loai: 'anh',
          tieuDe: 'Hình 2.3. Thư viện nguồn trong Zotero',
          url: '/bai-tap/bai-2/zotero.png',
        },
        {
          loai: 'lienKet',
          tieuDe: 'Bảng chấm CRAAP đầy đủ (Google Sheets)',
          url: '[ĐIỀN: link Google Sheets]',
        },
      ],
    },
  },

  // ═══════════════ BÀI 3 ═══════════════
  {
    slug: 'bai-3',
    so: 3,
    chuong: 'Chương 3: Tổng quan về trí tuệ nhân tạo',
    mucGiaoTrinh: 'Bài tập 2 (mục 3.4)',
    ten: 'Viết Prompt hiệu quả cho các tác vụ học tập',
    tomTat:
      'So sánh prompt ban đầu và prompt cải tiến trên 2 tác vụ học tập thật, rút ra công thức 5 thành phần và một thư viện prompt mẫu dùng lại được.',
    mucTieu: {
      yeuCau:
        'Chọn các tác vụ học tập có thật; viết prompt ban đầu và ghi nhận hạn chế của câu trả lời; cải tiến prompt theo một cấu trúc rõ ràng; so sánh kết quả đầu ra trước và sau theo cùng một bộ tiêu chí; rút ra nguyên tắc viết prompt và cách kiểm chứng kết quả của AI.',
      kyNang: [
        'Hiểu vì sao mô hình ngôn ngữ lớn (LLM) trả lời tốt hơn khi được cho biết vai trò, bối cảnh và yêu cầu cụ thể.',
        'Viết prompt theo cấu trúc 5 thành phần: Vai trò, Bối cảnh, Nhiệm vụ, Định dạng, Ràng buộc.',
        'Lặp và tinh chỉnh prompt dựa trên kết quả thực tế.',
        'Đánh giá phản biện câu trả lời của AI, nhận diện thông tin sai hoặc “ảo giác”.',
      ],
    },
    quaTrinh: {
      cacBuoc: [
        {
          ten: 'Chọn 2 tác vụ học tập thật',
          moTa: 'Tác vụ 1: hiểu một khái niệm khó của Chương 3 (học máy). Tác vụ 2: lập kế hoạch ôn tập trước bài kiểm tra giữa kỳ.',
        },
        {
          ten: 'Viết prompt ban đầu theo thói quen cũ',
          moTa: 'Hỏi ngắn như khi tra Google, lưu lại toàn bộ câu trả lời.',
        },
        {
          ten: 'Phân tích hạn chế',
          moTa: 'Chấm câu trả lời theo 4 tiêu chí: đúng trọng tâm, phù hợp với người học, dùng được ngay, dễ kiểm chứng.',
        },
        {
          ten: 'Cải tiến theo công thức 5 thành phần',
          moTa: 'Bổ sung vai trò, bối cảnh, nhiệm vụ chia nhỏ thành các yêu cầu đánh số, định dạng đầu ra và ràng buộc; yêu cầu AI nói rõ chỗ nó không chắc chắn.',
        },
        {
          ten: 'Chạy lại và so sánh',
          moTa: 'Mỗi prompt chạy 2 lần trong 2 cuộc trò chuyện mới để giảm ảnh hưởng của tính ngẫu nhiên, rồi so sánh theo cùng bộ tiêu chí.',
        },
        {
          ten: 'Kiểm chứng',
          moTa: 'Đối chiếu nội dung AI đưa ra với bài giảng Chương 3 trước khi chép vào sổ ôn tập.',
        },
        {
          ten: 'Đóng gói thành thư viện prompt mẫu',
          moTa: 'Tổng hợp 5 mẫu prompt dùng lại được cho các tác vụ học tập thường gặp (Bảng 3.3).',
        },
      ],
      congCu: [
        {
          ten: '[ĐIỀN: ChatGPT / Gemini / Copilot, ghi rõ phiên bản]',
          mucDich: 'Công cụ AI để chạy thử các prompt.',
        },
        { ten: 'Google Docs', mucDich: 'Ghi nhật ký prompt và kết quả.' },
        { ten: 'Snipping Tool', mucDich: 'Chụp màn hình các cuộc trò chuyện.' },
      ],
      suDungAI: [
        {
          congCu: '[ĐIỀN: tên công cụ AI đã dùng]',
          mucDich:
            'Là đối tượng thực hành của bài tập: chạy các prompt ban đầu và prompt cải tiến. Toàn bộ nhận xét và đánh giá so sánh do tôi tự thực hiện.',
        },
        AI_BIEN_TAP,
      ],
      khoKhan: [
        {
          khoKhan: 'Cùng một prompt nhưng mỗi lần chạy lại cho câu trả lời khác nhau.',
          cachGiaiQuyet:
            'Chạy mỗi prompt 2 lần, so sánh theo bộ tiêu chí cố định thay vì theo cảm tính.',
        },
        {
          khoKhan: 'Prompt dài thì AI bỏ sót một vài yêu cầu.',
          cachGiaiQuyet:
            'Đánh số từng yêu cầu, đặt yêu cầu quan trọng nhất lên đầu và đối chiếu kết quả với danh sách yêu cầu.',
        },
        {
          khoKhan: 'AI trả lời rất tự tin kể cả khi chưa chính xác.',
          cachGiaiQuyet:
            'Yêu cầu AI ghi chú chỗ không chắc chắn; luôn đối chiếu với giáo trình và nguồn uy tín.',
        },
        {
          khoKhan: 'Dễ vô tình dán thông tin cá nhân vào cuộc trò chuyện.',
          cachGiaiQuyet:
            'Chỉ mô tả bối cảnh chung (năm học, ngành học); không nhập họ tên, mã sinh viên hay tài liệu chưa công bố.',
        },
      ],
    },
    sanPham: {
      gioiThieu:
        'Sản phẩm gồm công thức viết prompt, 2 cặp so sánh prompt ban đầu và prompt cải tiến kèm nhận xét kết quả đầu ra, bảng tự đánh giá và thư viện prompt mẫu.',
      khoi: [
        { kieu: 'tieuDe', noiDung: '1. Công thức 5 thành phần' },
        {
          kieu: 'bang',
          cot: ['Thành phần', 'Câu hỏi tự đặt', 'Ví dụ'],
          dong: [
            ['**Vai trò**', 'AI nên đóng vai ai?', 'Bạn là giảng viên Tin học đại cương'],
            [
              '**Bối cảnh**',
              'Tôi là ai, đang ở tình huống nào?',
              'Sinh viên năm nhất ngành nghệ thuật, chưa học lập trình',
            ],
            [
              '**Nhiệm vụ**',
              'Cụ thể tôi cần gì, chia thành mấy bước?',
              'Định nghĩa, so sánh, ví dụ, câu hỏi tự kiểm tra',
            ],
            [
              '**Định dạng**',
              'Kết quả trình bày ra sao?',
              'Có tiêu đề, bảng, gạch đầu dòng, tối đa 400 từ',
            ],
            [
              '**Ràng buộc**',
              'Giới hạn và điều kiện là gì?',
              'Dùng từ phổ thông; nêu rõ chỗ không chắc chắn',
            ],
          ],
          chuThich: 'Bảng 3.1. Công thức viết prompt được áp dụng',
        },
        { kieu: 'tieuDe', noiDung: '2. Tác vụ 1: hiểu khái niệm “học máy”' },
        {
          kieu: 'soSanh',
          cot: [
            {
              nhan: 'Prompt ban đầu',
              prompt: 'Học máy là gì?',
              // ✏️ mô tả đúng kết quả AI trả về cho bạn
              ketQua:
                'Câu trả lời đúng nhưng chung chung, dùng nhiều thuật ngữ chưa được giải thích (thuật toán, mô hình, dữ liệu huấn luyện); ví dụ xa với ngành học của tôi (tài chính, xe tự lái); không có cấu trúc để ôn tập.',
            },
            {
              nhan: 'Prompt cải tiến',
              prompt: `Bạn là giảng viên Tin học đại cương, giỏi giải thích cho người không chuyên. Tôi là sinh viên năm nhất ngành nghệ thuật, chưa học lập trình, đang ôn tập Chương 3 về trí tuệ nhân tạo.
Hãy giải thích khái niệm “học máy” (machine learning):
1. Định nghĩa trong 2–3 câu, dùng từ ngữ phổ thông.
2. Bảng so sánh học máy với lập trình truyền thống theo 3 tiêu chí.
3. Ba ví dụ ứng dụng gần với âm nhạc, mỹ thuật hoặc thiết kế.
4. Ba câu hỏi tự kiểm tra, đáp án đặt ở cuối.
Định dạng: có tiêu đề, gạch đầu dòng, tối đa 400 từ. Nếu có thông tin bạn không chắc chắn, hãy ghi chú rõ để tôi kiểm chứng.`,
              // ✏️
              ketQua:
                'Câu trả lời đủ 4 phần; định nghĩa ngắn, dễ hiểu; bảng so sánh rõ ràng; ví dụ gần gũi với ngành học (gợi ý bài hát trên ứng dụng nghe nhạc, phân loại tranh ảnh, nhận dạng nhạc cụ từ âm thanh); có câu hỏi tự kiểm tra để ôn ngay. Tôi đối chiếu định nghĩa với bài giảng Chương 3 trước khi chép vào sổ ôn tập.',
            },
          ],
        },
        { kieu: 'tieuDe', noiDung: '3. Tác vụ 2: lập kế hoạch ôn tập' },
        {
          kieu: 'soSanh',
          cot: [
            {
              nhan: 'Prompt ban đầu',
              prompt: 'Lập kế hoạch ôn thi cho tôi.',
              // ✏️
              ketQua:
                'Kế hoạch chung chung (học đều mỗi ngày, ngủ đủ giấc, làm đề thử), không gắn với môn học, quỹ thời gian hay điểm yếu của tôi nên không áp dụng được.',
            },
            {
              nhan: 'Prompt cải tiến',
              prompt: `Hãy đóng vai cố vấn học tập. Tôi là sinh viên năm nhất, còn 14 ngày nữa đến bài kiểm tra giữa kỳ học phần “Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo” (Chương 1–3). Mỗi tối tôi có 90 phút, Chủ nhật có 3 giờ. Tôi còn yếu ở Chương 2 (tìm kiếm thông tin học thuật) và Chương 3 (viết prompt).
Hãy lập kế hoạch dạng bảng với các cột: Ngày | Nội dung | Hoạt động cụ thể | Sản phẩm cuối ngày.
Yêu cầu: ưu tiên phần yếu trước; có 2 ngày dự phòng; 2 ngày cuối chỉ ôn tổng hợp và làm đề tự luyện. Chỉ dựa trên thông tin tôi cung cấp; thiếu thông tin thì hỏi lại tôi trước.`,
              // ✏️
              ketQua:
                'Bảng kế hoạch 14 ngày, mỗi ngày có sản phẩm cụ thể, ưu tiên Chương 2 và 3, có ngày dự phòng. Tôi chỉ cần điều chỉnh vài buổi cho khớp lịch học trên lớp là dùng được ngay.',
            },
          ],
        },
        { kieu: 'tieuDe', noiDung: '4. Tự đánh giá kết quả đầu ra' },
        {
          kieu: 'bang',
          cot: ['Tiêu chí', 'Prompt ban đầu', 'Prompt cải tiến'],
          // ✏️ chấm theo kết quả thật của bạn
          dong: [
            ['Đúng trọng tâm nhu cầu', '2/5', '5/5'],
            ['Phù hợp với trình độ, ngành học', '2/5', '5/5'],
            ['Dùng được ngay', '1/5', '4/5'],
            ['Dễ kiểm chứng', '2/5', '4/5'],
          ],
          chuThich: 'Bảng 3.2. Tự đánh giá kết quả đầu ra (trung bình của 2 tác vụ, thang 5)',
        },
        { kieu: 'tieuDe', noiDung: '5. Thư viện prompt mẫu cho việc học' },
        {
          kieu: 'bang',
          cot: ['Mục đích', 'Mẫu prompt (thay phần trong ngoặc vuông)'],
          dong: [
            [
              'Hiểu khái niệm',
              'Giải thích [khái niệm] cho sinh viên năm nhất ngành [ngành học] bằng 1 định nghĩa ngắn, 1 phép so sánh đời thường và 2 ví dụ trong lĩnh vực [lĩnh vực].',
            ],
            [
              'Tóm tắt tài liệu',
              'Tóm tắt đoạn văn dưới đây thành 5 ý chính, mỗi ý không quá 20 từ, giữ nguyên thuật ngữ chuyên môn: [dán đoạn văn].',
            ],
            [
              'Tự kiểm tra',
              'Tạo 10 câu hỏi trắc nghiệm 4 lựa chọn về [chủ đề], từ dễ đến khó; đáp án và giải thích đặt ở cuối.',
            ],
            [
              'Góp ý bài viết (không viết hộ)',
              'Đọc bài viết của tôi và chỉ ra 3 điểm cần cải thiện về lập luận và diễn đạt. Không viết lại thay tôi: [dán bài viết].',
            ],
            [
              'Lập kế hoạch',
              'Lập kế hoạch [số] ngày để hoàn thành [việc]; mỗi ngày tôi có [thời gian]. Trình bày dạng bảng: Ngày | Việc cần làm | Sản phẩm.',
            ],
          ],
          chuThich: 'Bảng 3.3. Năm mẫu prompt dùng lại được',
        },
        { kieu: 'tieuDe', noiDung: '6. Bài học rút ra' },
        {
          kieu: 'danhSach',
          danhSo: true,
          muc: [
            'Hỏi mơ hồ thì nhận câu trả lời mơ hồ: chất lượng đầu ra phụ thuộc trực tiếp vào độ cụ thể của prompt.',
            'Cho AI biết “tôi là ai” quan trọng không kém “tôi cần gì”.',
            'Chia nhiệm vụ thành các yêu cầu đánh số giúp AI ít bỏ sót và giúp tôi dễ kiểm tra.',
            'Viết prompt là một vòng lặp: viết, đọc kết quả, chỉnh lại.',
            'AI hỗ trợ việc học chứ không thay việc học: mọi kết quả đều phải được kiểm chứng.',
          ],
        },

        // Bổ sung chọn lọc từ tài liệu người dùng gửi; diễn giải, không ghi nhận là thực nghiệm mới.
        { kieu: 'tieuDe', noiDung: 'Tìm hiểu thêm: đối chiếu khung R–C–T–C–O' },
        {
          kieu: 'doan',
          noiDung:
            'Tài liệu bổ sung gọi năm thành phần là Role – Context – Task – Constraints – Output Format. Đây là cách ghi nhớ tương ứng với khung đang dùng trong bài; thứ tự đặt ràng buộc và định dạng có thể thay đổi. Điều cần kiểm tra là yêu cầu có rõ và đầu ra có đáp ứng nhu cầu hay không.',
        },
        {
          kieu: 'bang',
          cot: ['Thành phần', 'Cách áp dụng vào hai tác vụ của bài'],
          dong: [
            [
              'Role — Vai trò',
              'Chọn vai trò giảng viên khi giải thích học máy, cố vấn học tập khi lập kế hoạch.',
            ],
            [
              'Context — Bối cảnh',
              'Nêu trình độ năm nhất, ngành nghệ thuật, chương đang học hoặc quỹ thời gian thực tế.',
            ],
            [
              'Task — Nhiệm vụ',
              'Chia yêu cầu thành định nghĩa, so sánh, ví dụ và tự kiểm tra; hoặc từng ngày ôn tập.',
            ],
            [
              'Constraints — Ràng buộc',
              'Giới hạn độ dài, dùng từ phù hợp và yêu cầu chỉ rõ thông tin cần kiểm chứng.',
            ],
            [
              'Output Format — Định dạng',
              'Chọn bảng, danh sách hoặc các phần có tiêu đề để dễ đối chiếu.',
            ],
          ],
          chuThich: 'Bảng 3.4. Liên hệ thuật ngữ với các prompt đã trình bày trong bài.',
        },
        {
          kieu: 'doan',
          noiDung:
            'Prompt có cấu trúc không bảo đảm câu trả lời đúng. Khi so sánh, cần lưu đầu ra nguyên văn và chỉ ra một chi tiết đáp ứng hoặc chưa đáp ứng ở mỗi tiêu chí; không kết luận “vượt trội” chỉ từ hình thức trình bày.',
        },
      ],
      tep: [
        {
          loai: 'anh',
          tieuDe: 'Hình 3.1. Tác vụ 1: kết quả của prompt ban đầu',
          url: '/bai-tap/bai-3/tac-vu-1-truoc.png',
        },
        {
          loai: 'anh',
          tieuDe: 'Hình 3.2. Tác vụ 1: kết quả của prompt cải tiến',
          url: '/bai-tap/bai-3/tac-vu-1-sau.png',
        },
        {
          loai: 'anh',
          tieuDe: 'Hình 3.3. Tác vụ 2: kết quả của prompt cải tiến',
          url: '/bai-tap/bai-3/tac-vu-2-sau.png',
        },
        {
          loai: 'pdf',
          tieuDe: 'Nhật ký prompt đầy đủ (PDF)',
          url: '[ĐIỀN: link Google Drive của tệp PDF]',
        },
        {
          loai: 'lienKet',
          tieuDe: 'Liên kết chia sẻ cuộc trò chuyện với AI',
          url: '[ĐIỀN: link chia sẻ cuộc trò chuyện]',
        },
      ],
    },
  },

  // ═══════════════ BÀI 4 ═══════════════
  {
    slug: 'bai-4',
    so: 4,
    chuong: 'Chương 4: Giao tiếp và hợp tác trong môi trường số',
    mucGiaoTrinh: 'Bài tập 3 (mục 4.4)',
    ten: 'Sử dụng công cụ hợp tác trực tuyến cho dự án nhóm',
    tomTat:
      'Điều phối một dự án nhóm hoàn toàn trực tuyến bằng bảng Kanban trên Trello, kho tài liệu chung trên Google Drive, đồng soạn thảo và họp tuần có biên bản.',
    mucTieu: {
      yeuCau:
        'Lựa chọn và sử dụng các công cụ trực tuyến để lập kế hoạch, phân công, theo dõi tiến độ và cùng soạn thảo sản phẩm của một dự án nhóm; lưu lại minh chứng về quá trình phối hợp và tự đánh giá hiệu quả làm việc nhóm trong môi trường số.',
      kyNang: [
        'Quản lý công việc nhóm theo phương pháp Kanban trên Trello.',
        'Cùng soạn thảo theo thời gian thực; góp ý bằng bình luận và chế độ Đề xuất trên Google Docs.',
        'Phân quyền truy cập tệp chia sẻ đúng mục đích (người chỉnh sửa, người nhận xét, người xem).',
        'Giao tiếp trực tuyến rõ ràng, văn minh (netiquette); tổ chức họp trực tuyến có biên bản.',
      ],
    },
    quaTrinh: {
      cacBuoc: [
        {
          ten: 'Họp khởi động trên Google Meet',
          moTa: 'Nhóm [ĐIỀN: số] thành viên thực hiện dự án “[ĐIỀN: tên dự án nhóm]” trong [ĐIỀN: số] tuần; tôi phụ trách [ĐIỀN: vai trò của bạn]. Buổi họp đầu tiên thống nhất mục tiêu, sản phẩm cuối, hạn chót và quy tắc làm việc nhóm.',
        },
        {
          ten: 'Chia nhỏ công việc trên Trello',
          moTa: 'Tách dự án thành các thẻ công việc; mỗi thẻ có một người chịu trách nhiệm chính, hạn chót, danh sách kiểm (checklist) và nhãn màu theo hạng mục. Bảng gồm 4 cột: Cần làm → Đang làm → Chờ duyệt → Hoàn thành.',
        },
        {
          ten: 'Dựng kho tài liệu chung',
          moTa: 'Tạo thư mục dùng chung trên Google Drive theo đúng quy tắc đặt tên ở Bài 1; thành viên có quyền chỉnh sửa, giảng viên có quyền xem.',
        },
        {
          ten: 'Cùng soạn thảo',
          moTa: 'Mỗi thành viên viết phần của mình trên cùng một tệp Google Docs; góp ý cho nhau bằng bình luận gắn tên (@) và chế độ Đề xuất thay vì sửa thẳng vào phần của người khác.',
        },
        {
          ten: 'Theo dõi tiến độ',
          moTa: 'Mọi người cập nhật thẻ Trello trước 21 giờ hằng ngày; mỗi tuần họp nhanh 30 phút theo 3 câu hỏi: đã làm gì, sẽ làm gì, đang vướng gì. Biên bản họp ghi ngay trên Google Docs.',
        },
        {
          ten: 'Rà soát chéo và hoàn thiện',
          moTa: 'Thành viên đọc chéo phần của nhau, xử lý hết bình luận rồi mới chuyển thẻ sang Hoàn thành; xuất sản phẩm cuối và nộp.',
        },
        {
          ten: 'Họp rút kinh nghiệm',
          moTa: 'Cả nhóm cùng trả lời: điều gì làm tốt, điều gì cần cải thiện, lần sau sẽ làm khác đi thế nào.',
        },
      ],
      congCu: [
        { ten: 'Trello', mucDich: 'Bảng Kanban để phân công và theo dõi tiến độ.' },
        { ten: 'Google Drive', mucDich: 'Kho tài liệu chung, phân quyền truy cập.' },
        {
          ten: 'Google Docs, Google Slides',
          mucDich: 'Cùng soạn thảo, bình luận, chế độ Đề xuất, Lịch sử phiên bản.',
        },
        { ten: 'Google Meet', mucDich: 'Họp trực tuyến hằng tuần.' },
        { ten: 'Google Calendar', mucDich: 'Lịch họp, hạn chót và nhắc việc tự động.' },
        {
          ten: 'Zalo (nhóm chat)',
          mucDich: 'Nhắc việc nhanh; quyết định quan trọng luôn được ghi vào biên bản và Trello.',
        },
      ],
      // ✏️ nếu nhóm có dùng AI (vd. gợi ý chia nhỏ công việc) thì thêm một dòng ghi rõ công cụ và mục đích
      suDungAI: [AI_BIEN_TAP],
      khoKhan: [
        {
          khoKhan: 'Một số thành viên quên cập nhật Trello nên bảng không phản ánh đúng tiến độ.',
          cachGiaiQuyet:
            'Thống nhất giờ cập nhật trước 21 giờ, bật thông báo hạn chót của Trello; đầu mỗi buổi họp tuần cả nhóm cùng rà bảng.',
        },
        {
          khoKhan: 'Thông tin quan trọng bị trôi giữa hàng trăm tin nhắn Zalo.',
          cachGiaiQuyet:
            'Tách kênh: Zalo chỉ để nhắc nhanh; mọi quyết định được ghi vào biên bản họp và thẻ Trello tương ứng.',
        },
        {
          khoKhan: 'Hai người cùng sửa một đoạn văn gây chồng chéo, mất nội dung.',
          cachGiaiQuyet:
            'Mỗi người phụ trách một mục; góp ý bằng chế độ Đề xuất; dùng Lịch sử phiên bản để khôi phục khi cần.',
        },
        {
          khoKhan: 'Lịch học khác nhau, khó chọn giờ họp chung.',
          cachGiaiQuyet:
            'Dùng Google Calendar để tìm khung giờ trống chung; ai vắng thì đọc biên bản và phản hồi bằng bình luận trong ngày.',
        },
      ],
    },
    sanPham: {
      gioiThieu:
        'Minh chứng gồm bảng Trello của nhóm, lịch sử phiên bản và bình luận trên Google Docs, biên bản họp và sản phẩm cuối cùng của dự án. Thông tin cá nhân của thành viên (số điện thoại, email) đã được che; ảnh có tên hoặc khuôn mặt thành viên chỉ đăng khi đã xin phép.',
      khoi: [
        { kieu: 'tieuDe', noiDung: '1. Mô hình phối hợp của nhóm' },
        {
          kieu: 'ma',
          chuThich: 'Hình 4.1. Luồng phối hợp trực tuyến của nhóm',
          noiDung: `Google Meet: họp tuần 30 phút
   │  quyết định → biên bản trên Google Docs
   ▼
Trello: Cần làm → Đang làm → Chờ duyệt → Hoàn thành
   │  mỗi thẻ: người phụ trách · hạn chót · checklist
   ▼
Google Drive + Docs: cùng soạn thảo · bình luận @ · chế độ Đề xuất
   │
   ▼
Rà soát chéo → Sản phẩm cuối → Họp rút kinh nghiệm`,
        },
        { kieu: 'tieuDe', noiDung: '2. Quy tắc giao tiếp của nhóm (netiquette)' },
        {
          kieu: 'danhSach',
          muc: [
            'Phản hồi tin nhắn nhóm trong vòng 12 giờ.',
            'Tin nhắn giao việc luôn nêu đủ: việc gì, ai làm, hạn khi nào.',
            'Góp ý vào nội dung, không nhắm vào con người; dùng ngôn ngữ lịch sự.',
            'Không chia sẻ tài liệu của nhóm ra ngoài khi chưa thống nhất.',
            'Xin phép trước khi đăng ảnh có tên hoặc khuôn mặt thành viên.',
          ],
        },
        { kieu: 'tieuDe', noiDung: '3. Tự đánh giá hiệu quả phối hợp' },
        {
          kieu: 'bang',
          cot: ['', 'Nội dung'],
          // ⚠️ TỰ VIẾT: đây là phần tự đánh giá, viết lại theo đúng trải nghiệm của nhóm bạn
          dong: [
            [
              '**Làm tốt**',
              'Tiến độ minh bạch nhờ bảng Kanban; không mất dữ liệu nhờ kho tài liệu chung và lịch sử phiên bản.',
            ],
            [
              '**Cần cải thiện**',
              'Phân công ban đầu chưa đều; lần sau nên ước lượng khối lượng từng thẻ ngay từ buổi khởi động.',
            ],
            [
              '**Bài học**',
              'Công cụ chỉ phát huy tác dụng khi cả nhóm thống nhất cách dùng ngay từ đầu.',
            ],
          ],
          chuThich: 'Bảng 4.1. Kết quả buổi họp rút kinh nghiệm',
        },

        // Bổ sung chọn lọc từ tài liệu người dùng gửi; diễn giải, không ghi nhận là thực nghiệm mới.
        { kieu: 'tieuDe', noiDung: 'Tìm hiểu thêm: chia sẻ tài liệu theo vai trò' },
        {
          kieu: 'bang',
          cot: ['Đối tượng', 'Quyền phù hợp với nhiệm vụ', 'Mục đích'],
          dong: [
            [
              'Thành viên trực tiếp viết nội dung',
              'Chỉnh sửa trong không gian làm việc của nhóm',
              'Đóng góp vào mục được phân công; dùng lịch sử phiên bản để đối chiếu thay đổi.',
            ],
            [
              'Người góp ý',
              'Nhận xét khi chỉ cần phản hồi',
              'Bình luận vào nội dung cần trao đổi, tránh sửa đè phần người khác.',
            ],
            [
              'Người xem portfolio và giảng viên qua link minh chứng công khai',
              'Chỉ xem đối với bản minh chứng đã chọn',
              'Kiểm tra sản phẩm mà không làm thay đổi bản nộp.',
            ],
          ],
          chuThich:
            'Bảng 4.2. Quyền truy cập theo mục đích; không mặc định mở quyền chỉnh sửa hoặc nhận xét cho mọi người có liên kết.',
        },
        {
          kieu: 'doan',
          noiDung:
            'Trước khi công khai, nên tạo bản minh chứng đã lược thông tin không cần thiết và được các thành viên đồng ý chia sẻ. Mở link bằng cửa sổ ẩn danh để kiểm tra người ngoài nhóm có xem được hay không; không coi việc đã sao chép đường link là đã cấp quyền thành công.',
        },
      ],
      tep: [
        { loai: 'anh', tieuDe: 'Hình 4.2. Bảng Trello của nhóm', url: '/bai-tap/bai-4/trello.png' },
        {
          loai: 'anh',
          tieuDe: 'Hình 4.3. Chi tiết một thẻ công việc: người phụ trách, hạn chót, checklist',
          url: '/bai-tap/bai-4/trello-the.png',
        },
        {
          loai: 'anh',
          tieuDe: 'Hình 4.4. Lịch sử phiên bản và bình luận trên Google Docs',
          url: '/bai-tap/bai-4/docs-lich-su.png',
        },
        {
          loai: 'pdf',
          tieuDe: 'Biên bản các buổi họp nhóm',
          url: '[ĐIỀN: link Google Drive của biên bản]',
        },
        {
          loai: 'lienKet',
          tieuDe: 'Bảng Trello của nhóm (chế độ công khai)',
          url: '[ĐIỀN: link Trello]',
        },
        {
          loai: 'lienKet',
          tieuDe: 'Sản phẩm cuối cùng của dự án nhóm',
          url: '[ĐIỀN: link sản phẩm nhóm]',
        },
      ],
    },
  },

  // ═══════════════ BÀI 5 ═══════════════
  {
    slug: 'bai-5',
    so: 5,
    chuong: 'Chương 5: Sáng tạo nội dung số',
    mucGiaoTrinh: 'Bài tập 2 (mục 5.4)',
    // ✏️ nếu sản phẩm thật của bạn khác (video, bài viết…) thì đổi tên, quy trình và nhật ký prompt cho khớp
    ten: 'Sử dụng AI tạo sinh để hỗ trợ sáng tạo nội dung',
    tomTat:
      'Poster truyền thông “AI là trợ lý – Bạn là tác giả” kèm bài đăng mạng xã hội: người lên ý tưởng và dẫn dắt, AI tạo bản nháp hình ảnh, mọi phần việc đều được ghi nhãn.',
    mucTieu: {
      yeuCau:
        'Tạo một sản phẩm nội dung số hoàn chỉnh có sự hỗ trợ của AI tạo sinh: poster truyền thông kèm bài đăng mạng xã hội với thông điệp “AI là trợ lý – Bạn là tác giả”, hướng tới sinh viên năm nhất. Ghi lại toàn bộ quy trình và nhật ký prompt; biên tập thủ công để sản phẩm mang dấu ấn cá nhân; ghi nhãn việc sử dụng AI minh bạch.',
      kyNang: [
        'Tư duy thiết kế: xác định yêu cầu (brief), phác thảo, tạo bản nháp, biên tập, hoàn thiện.',
        'Viết prompt tạo ảnh: chủ thể, bối cảnh, phong cách, màu sắc, bố cục, điều cần tránh.',
        'Phối hợp người và máy (human-in-the-loop): AI tạo bản nháp, con người chọn lọc và quyết định.',
        'Nhận thức về bản quyền, ghi nhãn nội dung có AI hỗ trợ và nguy cơ định kiến trong ảnh do AI tạo.',
      ],
    },
    quaTrinh: {
      cacBuoc: [
        {
          ten: 'Xác định brief',
          moTa: 'Mục tiêu: nhắc sinh viên dùng AI có trách nhiệm. Đối tượng: sinh viên năm nhất. Kênh: trang mạng xã hội của lớp. Kích thước: 1080 × 1350 px (tỉ lệ 4:5) và bản A3 để in.',
        },
        {
          ten: 'Phác thảo bằng tay',
          moTa: 'Tự vẽ 3 phương án bố cục trên giấy trước khi mở công cụ AI. Phương án được chọn: nhân vật sinh viên ở trung tâm, một trợ lý robot nhỏ cầm đèn soi sáng trang giấy, khoảng trống phía trên dành cho tiêu đề.',
        },
        {
          ten: 'Lên khẩu hiệu',
          moTa: 'Nhờ AI gợi ý 10 khẩu hiệu, sau đó tự chọn lọc và viết lại thành “AI là trợ lý – Bạn là tác giả” cho ngắn, dễ nhớ và đúng thông điệp.',
        },
        {
          ten: 'Tạo ảnh minh hoạ qua 4 vòng prompt',
          moTa: 'Mỗi vòng ghi lại prompt, nhận xét kết quả và điều chỉnh (Bảng 5.1). Prompt viết bằng tiếng Anh vì nhiều công cụ tạo ảnh hiểu mô tả tiếng Anh chính xác hơn.',
        },
        {
          ten: 'Biên tập ảnh',
          moTa: 'Chọn ảnh tốt nhất, sửa các chi tiết lỗi (bàn tay, vật thể thừa) và cân lại màu theo bảng màu đã chọn.',
        },
        {
          ten: 'Dàn trang, thêm chữ thủ công',
          moTa: 'Đưa ảnh vào Canva, tự đặt tiêu đề và nội dung bằng phông chữ hỗ trợ đầy đủ tiếng Việt (Be Vietnam Pro), căn chỉnh theo lưới.',
        },
        {
          ten: 'Xin góp ý và hoàn thiện',
          moTa: 'Gửi bản nháp cho 2–3 bạn cùng lớp xem trên điện thoại, chỉnh lại theo góp ý cho dễ đọc.',
        },
        {
          ten: 'Ghi nhãn và xuất bản',
          moTa: 'Gắn dòng ghi nhãn sử dụng AI ở chân poster, viết bài đăng đi kèm, xuất PNG cho mạng xã hội và PDF cho bản in.',
        },
      ],
      congCu: [
        {
          ten: '[ĐIỀN: ChatGPT / Gemini]',
          mucDich: 'Gợi ý khẩu hiệu ban đầu, soát chính tả bài đăng.',
        },
        {
          ten: '[ĐIỀN: Microsoft Designer / Adobe Firefly / Canva Magic Media]',
          mucDich: 'Tạo ảnh minh hoạ nền.',
        },
        { ten: 'Canva', mucDich: 'Dàn trang, đặt chữ, chỉnh màu, xuất tệp.' },
        { ten: 'Giấy, bút chì', mucDich: 'Phác thảo bố cục ban đầu.' },
      ],
      suDungAI: [
        {
          congCu: '[ĐIỀN: công cụ tạo ảnh]',
          mucDich:
            'Tạo ảnh minh hoạ nền theo bố cục tôi đã phác thảo; tôi chọn lọc, sửa lỗi và tự thiết kế toàn bộ phần chữ.',
        },
        {
          congCu: '[ĐIỀN: ChatGPT / Gemini]',
          mucDich:
            'Gợi ý 10 khẩu hiệu ban đầu và soát chính tả; khẩu hiệu cuối cùng và bài đăng do tôi viết.',
        },
        AI_BIEN_TAP,
      ],
      khoKhan: [
        {
          khoKhan: 'AI viết sai chữ tiếng Việt trong ảnh (mất dấu, chữ vô nghĩa).',
          cachGiaiQuyet:
            'Thêm “no text, no letters” vào prompt để ảnh không có chữ; toàn bộ chữ được đặt thủ công trong Canva.',
        },
        {
          khoKhan: 'Chi tiết bàn tay, ngón tay bị biến dạng.',
          cachGiaiQuyet:
            'Tạo lại nhiều lần, chọn ảnh tốt nhất; sửa cục bộ phần lỗi hoặc cắt khung hình để che bớt.',
        },
        {
          khoKhan: 'Mỗi lần tạo ra một phong cách khác nhau, khó thống nhất.',
          cachGiaiQuyet:
            'Cố định cụm mô tả phong cách và bảng màu trong mọi prompt, chỉ thay phần mô tả nội dung.',
        },
        {
          khoKhan: 'Băn khoăn về bản quyền và đạo đức khi dùng ảnh do AI tạo.',
          cachGiaiQuyet:
            'Không đưa tên hoạ sĩ hay thương hiệu vào prompt; đọc điều khoản sử dụng của công cụ; ghi nhãn rõ phần AI tạo và phần tôi tự làm.',
        },
      ],
    },
    sanPham: {
      gioiThieu:
        'Sản phẩm cuối cùng là poster “AI là trợ lý – Bạn là tác giả” và bài đăng truyền thông đi kèm, cùng nhật ký prompt và hình ảnh từng giai đoạn từ phác thảo đến bản hoàn thiện.',
      khoi: [
        { kieu: 'tieuDe', noiDung: '1. Nhật ký prompt tạo ảnh' },
        {
          kieu: 'bang',
          cot: ['Vòng', 'Prompt', 'Kết quả', 'Điều chỉnh tiếp theo'],
          // ✏️ thay bằng nhật ký prompt thật của bạn
          dong: [
            [
              '1',
              '`student and robot, poster`',
              'Chung chung, robot trông đáng sợ, nền có chữ vô nghĩa.',
              'Mô tả cụ thể chủ thể, cảm xúc, phong cách.',
            ],
            [
              '2',
              '`flat illustration of a Vietnamese art student sketching at a desk, a small friendly robot assistant holding a desk lamp beside the student, warm pastel colors`',
              'Đúng ý hơn nhưng vẫn có chữ lỗi, không chừa chỗ cho tiêu đề.',
              'Thêm yêu cầu về bố cục, cấm chữ.',
            ],
            [
              '3',
              'Prompt vòng 2 + `empty space at the top for a headline, no text, no letters, clean composition, soft lighting`',
              'Có khoảng trống cho tiêu đề, hết chữ lỗi; vài ảnh bị lỗi bàn tay.',
              'Mô tả tư thế tay, đơn giản hoá hình khối.',
            ],
            [
              '4',
              'Prompt vòng 3 + `hands resting naturally on the paper, simple shapes`',
              'Chọn được ảnh nền đạt yêu cầu, chỉ cần sửa vài chi tiết nhỏ.',
              'Đưa vào Canva để dàn trang.',
            ],
          ],
          chuThich: 'Bảng 5.1. Nhật ký prompt tạo ảnh (rút gọn; bản đầy đủ ở tệp đính kèm)',
        },
        { kieu: 'tieuDe', noiDung: '2. Bài đăng truyền thông đi kèm' },
        {
          kieu: 'trichDan',
          chuThich: 'Bài đăng kèm poster trên trang mạng xã hội của lớp',
          noiDung: `AI LÀ TRỢ LÝ – BẠN LÀ TÁC GIẢ ✍️

AI có thể gợi ý hàng chục ý tưởng trong vài giây, nhưng chỉ bạn mới biết điều mình thật sự muốn nói.

Trước khi dùng AI cho bài tập, hãy tự hỏi 3 câu:
1️⃣ Mình đã tự suy nghĩ trước chưa?
2️⃣ Mình đã kiểm chứng điều AI nói chưa?
3️⃣ Mình đã ghi rõ công cụ và mục đích dùng AI chưa?

Dùng AI để học nhanh hơn, không phải để nghĩ thay mình.

#AICoTrachNhiem #LiemChinhHocThuat #KyNangSo
Ảnh minh hoạ tạo với sự hỗ trợ của [ĐIỀN: công cụ AI]; ý tưởng, bố cục, chữ và biên tập: Đinh Quang Phong.`,
        },
        { kieu: 'tieuDe', noiDung: '3. Phân định phần việc giữa người và AI' },
        {
          kieu: 'bang',
          cot: ['Hạng mục', 'Tôi tự làm', 'AI hỗ trợ'],
          dong: [
            ['Ý tưởng, thông điệp', 'Toàn bộ', 'Không'],
            ['Phác thảo bố cục', 'Toàn bộ (vẽ tay)', 'Không'],
            ['Khẩu hiệu', 'Chọn lọc, viết lại bản cuối', 'Gợi ý 10 phương án ban đầu'],
            ['Ảnh minh hoạ nền', 'Viết prompt, chọn lọc, sửa lỗi, chỉnh màu', 'Tạo ảnh'],
            ['Chữ, dàn trang, màu sắc', 'Toàn bộ', 'Không'],
            ['Bài đăng', 'Tự viết', 'Soát chính tả'],
          ],
          chuThich: 'Bảng 5.2. Phần đóng góp của con người và của AI',
        },
        { kieu: 'tieuDe', noiDung: '4. Nguyên tắc bản quyền và đạo đức đã áp dụng' },
        {
          kieu: 'danhSach',
          muc: [
            'Không đưa tên hoạ sĩ, nhà thiết kế hay thương hiệu cụ thể vào prompt để bắt chước phong cách của người khác.',
            'Đọc điều khoản sử dụng của công cụ tạo ảnh trước khi đăng sản phẩm công khai.',
            'Ghi nhãn rõ ràng: ảnh nền do AI hỗ trợ tạo; ý tưởng, bố cục, chữ và biên tập do tôi thực hiện.',
            'Rà soát định kiến: bảo đảm nhân vật không bị khắc hoạ theo khuôn mẫu về giới tính, ngoại hình hay văn hoá.',
            'Phông chữ Be Vietnam Pro lấy từ Google Fonts, dùng miễn phí theo giấy phép SIL Open Font License.',
          ],
        },

        // Bổ sung chọn lọc từ tài liệu người dùng gửi; diễn giải, không ghi nhận là thực nghiệm mới.
        { kieu: 'tieuDe', noiDung: 'Tìm hiểu thêm: biên tập để thông điệp tự nhiên và dễ đọc' },
        {
          kieu: 'doan',
          noiDung:
            'Với poster hiện tại, có thể dùng cách đọc thành tiếng từ quy trình biên tập kịch bản để rà bài đăng đi kèm: mỗi câu nên truyền tải một ý, bỏ từ lặp và ưu tiên động từ cụ thể. Sau đó đối chiếu lại với brief để bảo đảm câu chữ vẫn hướng tới sinh viên năm nhất và không hứa hẹn quá mức về AI.',
        },
        {
          kieu: 'bang',
          cot: ['Vấn đề cần rà', 'Hướng chỉnh sửa', 'Cách đối chiếu'],
          dong: [
            [
              'Câu dài hoặc nhiều thuật ngữ',
              'Chia câu, giải thích từ cần thiết, bỏ phần không phục vụ thông điệp.',
              'Đọc thành tiếng để phát hiện câu khó hiểu; giữ đúng ý khi rút gọn.',
            ],
            [
              'Khẩu hiệu lấn át nội dung',
              'Giữ một thông điệp chính; dùng phân cấp tiêu đề và phần giải thích.',
              'Xem ở kích thước hiển thị trên điện thoại, kiểm tra khả năng đọc.',
            ],
            [
              'Không rõ vai trò người và AI',
              'Ghi phần AI hỗ trợ và phần người lựa chọn, sửa, dàn trang.',
              'Đối chiếu với nhật ký prompt và các phiên bản có thật.',
            ],
          ],
          chuThich: 'Bảng 5.3. Gợi ý biên tập bổ sung, chưa phải kết quả một vòng thử nghiệm mới.',
        },
        {
          kieu: 'doan',
          noiDung:
            'Hướng phát triển tùy chọn: chuyển thông điệp của poster thành video ngắn với ba phần — tình huống sử dụng AI, ba câu hỏi tự kiểm tra và lời nhắc công bố AI. Nếu thực hiện, cần lập bảng phân cảnh gồm thời lượng, hình ảnh, lời đọc và nguồn tư liệu; đọc thử để chỉnh thời lượng. Hiện hồ sơ chưa có video nên không ghi CapCut hoặc công cụ tạo kịch bản vào danh sách công cụ đã sử dụng.',
        },
      ],
      tep: [
        {
          loai: 'anh',
          tieuDe: 'Hình 5.1. Poster hoàn thiện “AI là trợ lý – Bạn là tác giả”',
          url: '/bai-tap/bai-5/poster.png',
        },
        {
          loai: 'anh',
          tieuDe: 'Hình 5.2. Phác thảo bố cục bằng tay',
          url: '/bai-tap/bai-5/phac-thao.jpg',
        },
        {
          loai: 'anh',
          tieuDe: 'Hình 5.3. Các bản nháp do AI tạo qua 4 vòng prompt',
          url: '/bai-tap/bai-5/ban-nhap-ai.png',
        },
        {
          loai: 'pdf',
          tieuDe: 'Poster bản in A3 (PDF)',
          url: '[ĐIỀN: link Google Drive của poster PDF]',
        },
        {
          loai: 'pdf',
          tieuDe: 'Nhật ký prompt đầy đủ',
          url: '[ĐIỀN: link Google Drive của nhật ký prompt]',
        },
        // Có video timelapse quá trình thiết kế thì thêm: { loai: "video", tieuDe: "...", url: "link YouTube hoặc Google Drive" },
      ],
    },
  },

  // ═══════════════ BÀI 6 ═══════════════
  {
    slug: 'bai-6',
    so: 6,
    chuong: 'Chương 6: An toàn và liêm chính học thuật trong môi trường số',
    mucGiaoTrinh: 'Bài tập 4 (mục 6.4)',
    ten: 'Sử dụng AI có trách nhiệm trong học tập và nghiên cứu',
    tomTat:
      'Từ 5 nguồn nghiên cứu, xây dựng bộ nguyên tắc cá nhân “5T”, đèn giao thông AI và danh sách kiểm 6 câu hỏi trước khi nộp bài, áp dụng ngay vào Portfolio này.',
    mucTieu: {
      yeuCau:
        'Tìm hiểu các hướng dẫn, quy định và nghiên cứu về sử dụng AI trong giáo dục; phân tích các rủi ro khi dùng AI trong học tập và nghiên cứu (đạo văn, thông tin sai, thiên kiến, lộ dữ liệu cá nhân, vi phạm bản quyền); từ đó xây dựng bộ nguyên tắc cá nhân về sử dụng AI có trách nhiệm và áp dụng ngay vào chính Portfolio này.',
      kyNang: [
        'Đọc hiểu và tổng hợp tài liệu hướng dẫn, văn bản quy định, bài báo khoa học.',
        'Nhận diện rủi ro đạo đức và pháp lý khi sử dụng AI tạo sinh.',
        'Xây dựng quy tắc hành động cá nhân cụ thể, có thể tự kiểm tra.',
        'Tự giám sát và sẵn sàng giải trình việc sử dụng AI của bản thân.',
      ],
    },
    quaTrinh: {
      cacBuoc: [
        {
          ten: 'Nghiên cứu tài liệu',
          moTa: 'Đọc và ghi chú 5 nguồn: hướng dẫn của UNESCO (2023) về AI tạo sinh trong giáo dục và nghiên cứu; Thông tư 02/2025/TT-BGDĐT về Khung năng lực số cho người học; nghiên cứu của Kasneci và cộng sự (2023); nghiên cứu của Cotton và cộng sự (2024) về liêm chính học thuật thời ChatGPT; quy định sử dụng AI trong đề thi của chính học phần này.',
        },
        {
          ten: 'Rà soát cách mình đang dùng AI',
          moTa: 'Xem lại nhật ký dùng AI ở Bài 2 đến Bài 5 để thấy chỗ nào AI thật sự giúp ích, chỗ nào có rủi ro.',
        },
        {
          ten: 'Phân tích rủi ro',
          moTa: 'Lập danh sách 5 rủi ro chính (đạo văn, thông tin sai, thiên kiến, lộ dữ liệu cá nhân, vi phạm bản quyền) và cách phòng tránh tương ứng.',
        },
        {
          ten: 'Soạn bộ nguyên tắc',
          moTa: 'Viết bộ nguyên tắc ngắn gọn, dễ nhớ (5T), kèm “đèn giao thông” phân loại mức độ được phép.',
        },
        {
          ten: 'Kiểm nghiệm bằng tình huống',
          moTa: 'Áp bộ nguyên tắc vào các tình huống gặp thật khi làm Portfolio để sửa những điểm còn mơ hồ.',
        },
        {
          ten: 'Thiết kế và cam kết',
          moTa: 'Thiết kế bộ nguyên tắc thành infographic một trang và ký cam kết áp dụng cho các học phần tiếp theo.',
        },
      ],
      congCu: [
        { ten: 'Google Scholar, Zotero', mucDich: 'Tìm và quản lý tài liệu nghiên cứu.' },
        { ten: 'Google Docs', mucDich: 'Ghi chú tổng hợp tài liệu.' },
        { ten: 'Canva', mucDich: 'Thiết kế infographic bộ nguyên tắc.' },
      ],
      suDungAI: [
        {
          congCu: 'Claude (Anthropic)',
          mucDich:
            'Gợi ý cấu trúc bộ nguyên tắc và biên tập câu chữ; tôi đối chiếu với tài liệu gốc và điều chỉnh theo trải nghiệm của mình.',
        },
      ],
      khoKhan: [
        {
          khoKhan: 'Tài liệu nhiều, phần lớn bằng tiếng Anh.',
          cachGiaiQuyet:
            'Đọc phần tóm tắt và khuyến nghị trước; ghi chú theo bảng ba cột: nguồn, ý chính, điều tôi áp dụng.',
        },
        {
          khoKhan: 'Ranh giới giữa “AI hỗ trợ” và “AI làm thay” khá mơ hồ.',
          cachGiaiQuyet:
            'Dùng câu hỏi kiểm tra: nếu bỏ AI đi, tôi có tự giải thích và làm lại được phần này không? Nếu không, đó là AI làm thay.',
        },
        {
          khoKhan: 'Nguyên tắc dễ viết nhưng khó giữ.',
          cachGiaiQuyet:
            'Biến nguyên tắc thành danh sách kiểm 6 câu hỏi, rà trước mỗi lần nộp bài.',
        },
      ],
    },
    sanPham: {
      gioiThieu:
        'Sản phẩm là bộ nguyên tắc cá nhân “5T” về sử dụng AI có trách nhiệm, kèm đèn giao thông phân loại mức độ, danh sách kiểm trước khi nộp bài, phần thử thách tương tác và cơ sở nghiên cứu.',
      khoi: [
        { kieu: 'tieuDe', noiDung: '1. Cơ sở nghiên cứu' },
        {
          kieu: 'bang',
          cot: ['Nguồn', 'Ý chính', 'Điều tôi rút ra'],
          dong: [
            [
              'UNESCO, Miao & Holmes (2023)',
              'Đề cao cách tiếp cận lấy con người làm trung tâm, bảo vệ quyền riêng tư dữ liệu; đề xuất độ tuổi tối thiểu 13 khi sử dụng AI tạo sinh trong lớp học.',
              'AI phục vụ người học, không thay thế tư duy và quyền quyết định của người học.',
            ],
            [
              'Thông tư 02/2025/TT-BGDĐT',
              'Đưa “Ứng dụng trí tuệ nhân tạo” thành một miền năng lực trong Khung năng lực số cho người học.',
              'Dùng AI đúng cách là một năng lực cần rèn luyện, không phải điều cấm kỵ.',
            ],
            [
              'Kasneci và cộng sự (2023)',
              'Mô hình ngôn ngữ lớn mở ra cơ hội cá nhân hoá việc học nhưng kéo theo rủi ro: phụ thuộc quá mức, thiên kiến, bản quyền, quyền riêng tư.',
              'Cần kỹ năng tư duy phản biện và kiểm chứng thông tin.',
            ],
            [
              'Cotton và cộng sự (2024)',
              'Cảnh báo nguy cơ gian lận, đạo văn khi sinh viên dùng ChatGPT và đề xuất các cách để nhà trường bảo đảm liêm chính học thuật.',
              'Luôn ghi rõ công cụ, mục đích và phần việc AI hỗ trợ.',
            ],
            [
              'Đề thi học phần INF2501, mục IV.3',
              'AI chỉ được dùng để hỗ trợ và phải ghi rõ công cụ, mục đích; phần cảm nhận, tự đánh giá do sinh viên tự viết; không đăng thông tin cá nhân nhạy cảm.',
              'Quy định cụ thể, áp dụng ngay cho Portfolio này.',
            ],
          ],
          chuThich: 'Bảng 6.1. Tổng hợp tài liệu nghiên cứu',
        },
        { kieu: 'tieuDe', noiDung: '2. Bộ nguyên tắc 5T' },
        {
          kieu: 'luoiThe',
          the: [
            {
              nhan: 'T1',
              tieuDe: 'Trung thực',
              noiDung:
                'Minh bạch mọi lần dùng AI: ghi rõ công cụ, mục đích và phần việc AI hỗ trợ. Không bao giờ nhận nội dung do AI tạo là của mình.',
            },
            {
              nhan: 'T2',
              tieuDe: 'Tự chủ',
              noiDung:
                'Nghĩ trước, hỏi sau: tự làm bản nháp trước khi hỏi AI. Dùng AI như một gia sư để hỏi đáp, không để AI viết thay. Phần cảm nhận và tự đánh giá luôn do tôi tự viết.',
            },
            {
              nhan: 'T3',
              tieuDe: 'Thẩm định',
              noiDung:
                'Kiểm chứng thông tin AI đưa ra với ít nhất 2 nguồn uy tín. Không trích dẫn tài liệu tôi chưa tự tìm thấy và mở đọc.',
            },
            {
              nhan: 'T4',
              tieuDe: 'Tôn trọng',
              noiDung:
                'Không nhập thông tin cá nhân nhạy cảm (số căn cước, địa chỉ, tài khoản ngân hàng), dữ liệu của người khác hay tài liệu chưa công bố vào AI. Không bắt chước phong cách của nghệ sĩ cụ thể; ghi nguồn đầy đủ.',
            },
            {
              nhan: 'T5',
              tieuDe: 'Trách nhiệm',
              noiDung:
                'Tôi chịu trách nhiệm cuối cùng về sản phẩm của mình: rà soát thiên kiến trong kết quả AI, tuân thủ quy định của giảng viên và nhà trường, sẵn sàng giải trình quá trình làm bài.',
            },
          ],
        },
        { kieu: 'tieuDe', noiDung: '3. Đèn giao thông AI' },
        {
          kieu: 'luoiThe',
          the: [
            {
              mau: 'xanh',
              tieuDe: 'Xanh: được dùng',
              noiDung:
                'Giải thích khái niệm, gợi ý từ khoá tìm kiếm, kiểm tra chính tả và ngữ pháp, tạo câu hỏi ôn tập, gợi ý bố cục. Vẫn ghi vào bảng kê công cụ AI (T1).',
            },
            {
              mau: 'vang',
              tieuDe: 'Vàng: dùng có điều kiện',
              noiDung:
                'Tóm tắt tài liệu, dịch thuật, tạo hình minh hoạ, góp ý dàn ý. Điều kiện: kiểm chứng kỹ kết quả và ghi nhãn ngay tại chỗ dùng (chú thích dưới hình, ghi chú trong bài).',
            },
            {
              mau: 'do',
              tieuDe: 'Đỏ: không dùng',
              noiDung:
                'Viết hộ toàn bộ bài tập hay báo cáo; bịa số liệu, trích dẫn; viết phần cảm nhận, tự đánh giá; dùng AI trong bài thi khi không được phép; nhập dữ liệu cá nhân của người khác.',
            },
          ],
        },
        { kieu: 'tieuDe', noiDung: '4. Danh sách kiểm trước khi nộp bài' },
        {
          kieu: 'danhSach',
          danhSo: true,
          muc: [
            'Tôi đã tự suy nghĩ và làm bản nháp trước khi dùng AI chưa?',
            'Mọi thông tin, số liệu, trích dẫn có từ AI đã được kiểm chứng chưa?',
            'Tôi đã ghi rõ công cụ AI và mục đích sử dụng chưa?',
            'Có thông tin cá nhân hay dữ liệu nhạy cảm nào bị đưa vào AI hoặc đăng công khai không?',
            'Hình ảnh, tư liệu của người khác đã ghi nguồn và đúng quyền sử dụng chưa?',
            'Nếu giảng viên hỏi, tôi có tự giải thích được từng phần mình đã làm không?',
          ],
        },
        { kieu: 'tieuDe', noiDung: '5. Thử thách: tình huống này đèn gì?' },
        {
          kieu: 'doan',
          noiDung: 'Chọn màu đèn cho từng tình huống để xem bộ nguyên tắc 5T xử lý thế nào.',
        },
        {
          kieu: 'tinhHuong',
          cau: [
            {
              tinhHuong:
                'Nhờ AI giải thích lại khái niệm “dữ liệu huấn luyện” mà mình chưa hiểu trên lớp.',
              dapAn: 'xanh',
              giaiThich:
                'Dùng AI như gia sư là hợp lệ (T2), miễn là đối chiếu lại với bài giảng (T3).',
            },
            {
              tinhHuong:
                'Nhờ AI liệt kê 5 bài báo khoa học để đưa thẳng vào danh mục tài liệu tham khảo.',
              dapAn: 'vang',
              giaiThich:
                'AI có thể bịa ra tài liệu không tồn tại. Chỉ coi đó là gợi ý, sau đó tự tìm và mở từng bài trên Google Scholar (T3).',
            },
            {
              tinhHuong: 'Dùng AI tạo hình minh hoạ cho poster của bài tập.',
              dapAn: 'vang',
              giaiThich:
                'Được phép nếu ghi nhãn công cụ và mục đích (T1) và không bắt chước phong cách của nghệ sĩ cụ thể (T4).',
            },
            {
              tinhHuong: 'Nhờ AI viết đoạn cảm nhận cá nhân cho trang Tổng kết.',
              dapAn: 'do',
              giaiThich:
                'Đề thi quy định phần cảm nhận, tự đánh giá phải do sinh viên tự viết (T2). Chỉ được nhờ AI soát chính tả sau khi đã tự viết xong.',
            },
            {
              tinhHuong: 'Chụp căn cước công dân gửi cho chatbot để nhờ điền hộ một biểu mẫu.',
              dapAn: 'do',
              giaiThich: 'Không đưa thông tin cá nhân nhạy cảm vào công cụ AI (T4).',
            },
            {
              tinhHuong: 'Nhờ AI kiểm tra chính tả bài báo cáo mình đã tự viết xong.',
              dapAn: 'xanh',
              giaiThich:
                'Hỗ trợ ngôn ngữ là mức được phép; nội dung vẫn là của bạn. Nhớ ghi vào bảng kê công cụ AI (T1).',
            },
          ],
        },
        { kieu: 'tieuDe', noiDung: '6. Áp dụng ngay trong Portfolio này' },
        {
          kieu: 'danhSach',
          muc: [
            'Mỗi trang bài tập có mục “Sử dụng AI” ghi rõ công cụ và mục đích.',
            'Trang Tổng kết có bảng kê toàn bộ công cụ AI đã dùng.',
            'Ảnh có AI hỗ trợ đều có dòng ghi nhãn; Portfolio không đăng thông tin cá nhân nhạy cảm nào.',
          ],
        },
        { kieu: 'tieuDe', noiDung: '7. Tài liệu tham khảo' },
        {
          kieu: 'danhSach',
          // ✏️ kiểm tra lại từng nguồn (mở bản gốc, đối chiếu DOI) trước khi nộp — đúng tinh thần nguyên tắc T3
          muc: [
            'Bộ Giáo dục và Đào tạo. (2025). Thông tư số 02/2025/TT-BGDĐT quy định Khung năng lực số cho người học.',
            'Cotton, D. R. E., Cotton, P. A., & Shipway, J. R. (2024). Chatting and cheating: Ensuring academic integrity in the era of ChatGPT. Innovations in Education and Teaching International, 61(2), 228–239. https://doi.org/10.1080/14703297.2023.2190148',
            'Kasneci, E., Seßler, K., Küchemann, S., Bannert, M., Dementieva, D., Fischer, F., Gasser, U., Groh, G., Günnemann, S., Hüllermeier, E., Krusche, S., Kutyniok, G., Michaeli, T., Nerdel, C., Pfeffer, J., Poquet, O., Sailer, M., Schmidt, A., Seidel, T., … Kasneci, G. (2023). ChatGPT for good? On opportunities and challenges of large language models for education. Learning and Individual Differences, 103, 102274. https://doi.org/10.1016/j.lindif.2023.102274',
            'Miao, F., & Holmes, W. (2023). Guidance for generative AI in education and research. UNESCO.',
          ],
        },

        // Bổ sung chọn lọc từ tài liệu người dùng gửi; diễn giải, không ghi nhận là thực nghiệm mới.
        {
          kieu: 'tieuDe',
          noiDung: 'Tìm hiểu thêm: biến công bố AI thành thông tin có thể đối chiếu',
        },
        {
          kieu: 'bang',
          cot: ['Điều cần làm rõ', 'Nội dung cần ghi'],
          dong: [
            [
              'Công cụ và phạm vi',
              'Tên công cụ thực sự đã dùng; bài tập, tác vụ và phần nội dung được hỗ trợ.',
            ],
            [
              'Dữ liệu đầu vào',
              'Tóm tắt prompt và tài liệu cung cấp; loại bỏ dữ liệu cá nhân hoặc nội dung chưa được phép chia sẻ.',
            ],
            [
              'Phần việc của người học',
              'Lựa chọn, kiểm chứng, biên tập và quyết định cuối cùng; dẫn phiên bản hoặc sản phẩm có thật nếu có.',
            ],
            [
              'Cách kiểm chứng',
              'Nguồn gốc đã đối chiếu, nội dung phải sửa và điểm chưa đủ căn cứ để sử dụng.',
            ],
            [
              'Trách nhiệm và giới hạn',
              'Tuân thủ hướng dẫn học phần; tự viết cảm nhận, tự đánh giá và chỉ xác nhận việc đã làm.',
            ],
          ],
          chuThich:
            'Bảng 6.2. Khung công bố AI bổ trợ bộ nguyên tắc 5T; không phải cam kết cá nhân đã được ký xác nhận.',
        },
        {
          kieu: 'doan',
          noiDung:
            'Một lời cam kết chung không thay thế nhật ký và bằng chứng kiểm chứng. Khi hoàn thiện cam kết cá nhân, sinh viên cần nêu được việc đã làm, giới hạn đã tuân thủ và nội dung còn cần xác minh; tránh khẳng định toàn bộ sản phẩm là tư duy độc lập nếu có phần AI hỗ trợ chưa được công bố.',
        },
      ],
      tep: [
        {
          loai: 'anh',
          tieuDe: 'Hình 6.1. Infographic bộ nguyên tắc 5T',
          url: '/bai-tap/bai-6/infographic-5t.png',
        },
        {
          loai: 'pdf',
          tieuDe: 'Bản cam kết sử dụng AI có trách nhiệm',
          url: '[ĐIỀN: link Google Drive của bản cam kết]',
        },
        {
          loai: 'pdf',
          tieuDe: 'Ghi chú tổng hợp tài liệu',
          url: '[ĐIỀN: link Google Drive của ghi chú]',
        },
      ],
    },
  },
];

// ───────────────────────────── Trang Tổng kết ─────────────────────────────
// ⚠️ TỰ VIẾT: traiNghiem, tamDac, thachThuc, loiKet là phần cảm nhận / tự đánh giá.
// Đề mục IV.3 yêu cầu sinh viên tự viết. Hãy dùng các đoạn dưới đây làm khung,
// rồi viết lại bằng trải nghiệm thật và giọng văn của bạn.

export const tongKet: TongKet = {
  moDau:
    'Chín trang Portfolio này là hành trình một học kỳ của tôi với học phần Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo: bắt đầu từ việc sắp xếp lại một thư mục máy tính, kết thúc bằng việc tự đặt ra nguyên tắc cho chính mình khi làm việc cùng AI.',

  // ⚠️ TỰ VIẾT
  traiNghiem: [
    'Khi mới bắt đầu học phần, tôi nghĩ “công nghệ số” chỉ là dùng máy tính và điện thoại thành thạo. Làm Portfolio cho tôi thấy điều ngược lại: kỹ năng số không nằm ở chỗ biết bấm nút nào, mà ở cách mình tổ chức, chọn lọc, hợp tác, sáng tạo và chịu trách nhiệm với những gì mình đưa lên môi trường số.',
    'Việc khó nhất không phải là làm lại sáu bài tập, mà là kể lại chúng một cách trung thực: vì sao tôi chọn cách làm đó, tôi đã vấp ở đâu và đã sửa thế nào. [ĐIỀN: một khoảnh khắc cụ thể của bạn, ví dụ buổi tối loay hoay với một liên kết hỏng, hay lần đầu thấy prompt cải tiến cho kết quả khác hẳn.] Chính lúc viết lại, tôi mới thật sự hiểu bài.',
    'Tôi cũng thay đổi cách nhìn về AI. Ban đầu tôi coi AI như một cỗ máy trả lời; giờ tôi xem nó như một cộng sự nhanh nhẹn nhưng hay tự tin quá mức: rất hữu ích khi được hỏi đúng cách, và luôn cần được kiểm chứng.',
  ],

  kienThuc: [
    {
      slug: 'bai-1',
      noiDung:
        '**Tổ chức dữ liệu cá nhân**: cây thư mục rõ ràng và quy tắc đặt tên nhất quán giúp tiết kiệm thời gian mỗi ngày; sao lưu 3-2-1 giúp giảm nguy cơ mất bài.',
    },
    {
      slug: 'bai-2',
      noiDung:
        '**Tìm kiếm và thẩm định thông tin**: toán tử tìm kiếm giúp tìm đúng; tiêu chí CRAAP và kỹ thuật đọc ngang giúp tin đúng.',
    },
    {
      slug: 'bai-3',
      noiDung:
        '**Giao tiếp với AI**: prompt 5 thành phần, lặp và tinh chỉnh, luôn kiểm chứng câu trả lời.',
    },
    {
      slug: 'bai-4',
      noiDung:
        '**Hợp tác trực tuyến**: bảng Kanban, đồng soạn thảo, biên bản họp và quy tắc giao tiếp giúp cả nhóm làm việc minh bạch.',
    },
    {
      slug: 'bai-5',
      noiDung:
        '**Sáng tạo với AI tạo sinh**: con người dẫn dắt ý tưởng, AI hỗ trợ bản nháp; ghi nhãn rõ ràng và tôn trọng bản quyền.',
    },
    {
      slug: 'bai-6',
      noiDung:
        '**Liêm chính học thuật**: bộ nguyên tắc 5T và danh sách kiểm 6 câu hỏi trước khi nộp bài.',
    },
    // ✏️ đổi nếu bạn dựng Portfolio bằng cách khác
    {
      noiDung:
        '**Xây dựng website**: tự dựng Portfolio bằng Next.js, tổ chức điều hướng nhiều cấp, hiển thị tốt trên điện thoại và xuất bản công khai.',
    },
  ],

  // ⚠️ TỰ VIẾT
  tamDac: [
    'Điều tôi tâm đắc nhất là poster “AI là trợ lý – Bạn là tác giả” ở Bài 5. Lần đầu tiên tôi thấy AI giống một cây cọ mới trong hộp màu: nó vẽ rất nhanh, nhưng vẽ gì, giữ lại nét nào và bỏ đi nét nào vẫn là quyết định của tôi.',
    'Tôi cũng vui vì Portfolio liền mạch từ đầu đến cuối: quy tắc đặt tên ở Bài 1 được dùng lại cho kho tài liệu nhóm ở Bài 4, cách thẩm định nguồn ở Bài 2 trở thành nguyên tắc “Thẩm định” ở Bài 6.',
  ],

  // ⚠️ TỰ VIẾT
  thachThuc: [
    {
      thachThuc:
        'Tự xây dựng website bằng Next.js khi mới làm quen: tổ chức các trang, điều hướng nhiều cấp, hiển thị trên điện thoại.',
      cachVuotQua:
        'Chia nhỏ việc theo từng trang, kiểm tra trên cả máy tính lẫn điện thoại sau mỗi lần sửa, đọc tài liệu chính thức của Next.js.',
    },
    {
      thachThuc: 'Liên kết Google Drive bị chặn vì quên mở quyền xem công khai.',
      cachVuotQua: 'Mở thử từng liên kết bằng cửa sổ ẩn danh (không đăng nhập) trước khi nộp.',
    },
    {
      thachThuc: 'Cân bằng giữa dùng AI cho nhanh và tự làm để hiểu.',
      cachVuotQua:
        'Áp dụng đèn giao thông AI của Bài 6: AI hỗ trợ trình bày, còn phần cảm nhận ở trang này do tôi tự viết.',
    },
    {
      thachThuc: 'Quản lý thời gian khi phải làm song song nhiều môn.',
      cachVuotQua: 'Dùng kế hoạch ôn tập lập ở Bài 3 và một bảng Trello cá nhân.',
    },
  ],

  congCuAI: [
    {
      congCu: 'Gemini (Google)',
      mucDich:
        'Cung cấp phản hồi hỏi đáp trong khung Trợ lý AI, mở bằng nút trên Header. Người dùng chủ động gửi câu hỏi; câu trả lời cần được kiểm chứng.',
      dungO: 'Trợ lý AI trên website',
    },
    {
      congCu: 'Suno AI và AI hỗ trợ viết lời',
      mucDich:
        'AI hỗ trợ viết lời; Suno AI tạo các bản nhạc thử nghiệm để khám phá những phong cách phù hợp với sở thích và cá tính. Tên công cụ hỗ trợ viết lời chưa được cung cấp.',
      dungO: 'Mục Âm nhạc — thử nghiệm sáng tạo',
    },
    {
      congCu: 'Codex (OpenAI)',
      mucDich:
        'Đối chiếu đề thi, tích hợp nội dung được cung cấp vào website Next.js, biên tập cách trình bày và kiểm tra kỹ thuật. Không xác nhận thay sinh viên các thao tác thực hành hoặc kết quả chưa có minh chứng.',
      dungO: 'Website và tài liệu chuẩn bị nộp',
    },
    {
      congCu: 'Claude (Anthropic)',
      mucDich:
        'Hỗ trợ soạn bản nháp phần mô tả, gợi ý bố cục trang và cấu trúc bộ nguyên tắc; tôi rà soát, chỉnh sửa theo quá trình thực tế.',
      dungO: 'Bản nội dung được cung cấp',
    },
    {
      congCu: '[ĐIỀN: ChatGPT / Gemini / Copilot]',
      mucDich: 'Gợi ý từ khoá tiếng Anh; đối tượng thực hành viết prompt; gợi ý khẩu hiệu.',
      dungO: 'Bài 2, 3, 5',
    },
    {
      congCu: '[ĐIỀN: công cụ tạo ảnh]',
      mucDich: 'Tạo ảnh minh hoạ nền cho poster.',
      dungO: 'Bài 5',
    },
  ],

  huongTiepTheo: [
    'Cập nhật Portfolio sau mỗi học kỳ bằng sản phẩm chuyên ngành mới, để nó trở thành hồ sơ năng lực khi đi thực tập và xin việc.',
    'Học sâu hơn về sáng tạo với công cụ số và AI tạo sinh, luôn giữ bộ nguyên tắc 5T.',
    'Gắn tên miền riêng và bổ sung video giới thiệu bản thân cho Portfolio.',
  ],

  // ⚠️ TỰ VIẾT
  loiKet: [
    'Nếu mỗi bài tập là một nét vẽ, thì Portfolio này là bức phác thảo đầu tiên của tôi trong vai một người học nghệ thuật ở thời đại số: chưa hoàn hảo, nhưng trung thực và là của chính tôi.',
    'Điều tôi mang theo sau học phần là thế này: máy có thể gợi ý hàng nghìn phương án trong vài giây, nhưng chọn phương án nào, kiểm chứng nó ra sao và chịu trách nhiệm với nó thế nào vẫn là việc của con người. Công cụ sẽ còn thay đổi mỗi năm; cách học thì ở lại: biết đặt câu hỏi, biết nghi ngờ, biết ghi nguồn.',
    'Portfolio này không dừng lại ở ngày nộp bài. Nó là trang đầu tiên của cuốn sổ nghề mà tôi sẽ còn viết tiếp.',
  ],

  khauHieu: 'AI là trợ lý. Tôi là tác giả.',

  loiCamOn: 'Cảm ơn thầy Vũ Việt Hoàng đã đồng hành cùng tôi trong học phần này.',
};
