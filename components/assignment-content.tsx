import { CopyPrompt, IntegrityChecklist } from './interactions';
const improved =
  'Bạn là trợ giảng Sư phạm âm nhạc. Hãy đề xuất kế hoạch tự học nhạc lý cơ bản trong 7 ngày cho sinh viên năm nhất. Mỗi ngày gồm: mục tiêu, bài tập 30 phút và tiêu chí tự đánh giá. Trình bày dạng bảng, dùng tiếng Việt. Đánh dấu thông tin cần đối chiếu giáo trình; không tự tạo nguồn tham khảo.';
export function AssignmentContent({ id }: { id: number }) {
  switch (id) {
    case 1:
      return (
        <>
          <h3>Một cấu trúc, nhiều khả năng.</h3>
          <p className="note">
            Cấu trúc minh họa để thực hành, chưa phải ảnh chụp thư mục của sinh viên.
          </p>
          <pre className="folder-tree">{`2552210313_DinhQuangPhong/
├── 01_TaiLieu/
│   ├── GiaoTrinh/
│   └── ThamKhao/
├── 02_BaiTap/
│   ├── Bai01/
│   └── Bai02/
├── 03_MinhChung/
└── 04_BanNop/`}</pre>
          <div className="two-col">
            <div>
              <h4>Quy tắc đặt tên đề xuất</h4>
              <p>
                <code>YYYYMMDD_Bai01_NoiDung_v01.ext</code>
              </p>
              <p>
                Ví dụ: <code>20261106_Bai01_BaoCao_v01.docx</code>. Dùng phiên bản tăng dần, không
                ghi đè bản gốc.
              </p>
            </div>
            <div>
              <h4>Nguyên tắc lưu trữ</h4>
              <p>
                Tách tài liệu gốc, bản đang làm và bản nộp. Sao lưu một bản ở thiết bị khác và kiểm
                tra khả năng khôi phục.
              </p>
            </div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <h3>Tìm đúng. Đọc kỹ. Đối chiếu.</h3>
          <p>
            Các truy vấn minh họa cho chủ đề giáo dục âm nhạc; chưa có kết quả nghiên cứu được xác
            nhận.
          </p>
          <div className="search-examples">
            <code>{'"music education" "piano"'}</code>
            <code>{'site:edu.vn "giáo dục âm nhạc"'}</code>
            <code>{'"piano pedagogy" filetype:pdf'}</code>
          </div>
          <h4>Bảng tiêu chí thẩm định nguồn</h4>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Tiêu chí</th>
                  <th>Câu hỏi cần kiểm tra</th>
                  <th>Kết quả thực tế</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tác giả', 'Tác giả có chuyên môn và đơn vị công tác rõ ràng không?'],
                  ['Thời điểm', 'Năm xuất bản có phù hợp câu hỏi nghiên cứu không?'],
                  ['Bằng chứng', 'Có phương pháp, dữ liệu và tài liệu tham khảo không?'],
                  ['Mục đích', 'Nguồn nhằm nghiên cứu, quảng bá hay bày tỏ ý kiến?'],
                ].map(([a, b]) => (
                  <tr key={a}>
                    <td>{a}</td>
                    <td>{b}</td>
                    <td>Chưa đánh giá</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="reference-placeholder">
            <h4>Hồ sơ kết quả tìm kiếm</h4>
            <p>
              Chưa bổ sung tên tài liệu, tác giả, năm, đường dẫn, ngày truy cập và lý do lựa chọn.
              Cần đối chiếu bản gốc trước khi trích dẫn.
            </p>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <h3>Rõ yêu cầu, sâu kết quả.</h3>
          <p className="note">
            Ví dụ prompt tham khảo. Chưa chạy thử và chưa có đầu ra AI thực tế để so sánh.
          </p>
          <div className="prompt-comparison">
            <div>
              <p className="eyebrow">01 / PROMPT BAN ĐẦU</p>
              <blockquote>Hãy giúp tôi học nhạc lý.</blockquote>
              <p>Chưa có đối tượng, thời lượng, định dạng và tiêu chí đánh giá.</p>
              <CopyPrompt text="Hãy giúp tôi học nhạc lý." />
            </div>
            <div>
              <p className="eyebrow">02 / PROMPT CẢI TIẾN</p>
              <blockquote>{improved}</blockquote>
              <CopyPrompt text={improved} />
            </div>
          </div>
          <h4>Điều gì đã thay đổi?</h4>
          <p>
            Prompt cải tiến bổ sung vai trò, trình độ người học, thời gian, đầu ra dạng bảng và yêu
            cầu kiểm chứng nguồn. Chất lượng thực tế cần được đánh giá dựa trên phản hồi được lưu
            lại.
          </p>
          <div className="two-col">
            <div>
              <h4>Đầu ra ban đầu</h4>
              <p>Chưa bổ sung phản hồi AI.</p>
            </div>
            <div>
              <h4>Đầu ra sau cải tiến</h4>
              <p>Chưa bổ sung phản hồi AI và nhận xét cá nhân.</p>
            </div>
          </div>
        </>
      );
    case 4:
      return (
        <>
          <h3>Một nhóm, cùng một nhịp.</h3>
          <p className="note">
            Quy trình đề xuất; chưa có thông tin thành viên hoặc minh chứng hoạt động nhóm.
          </p>
          <div className="collab-flow">
            {[
              'Thống nhất mục tiêu',
              'Phân công nhiệm vụ',
              'Phản hồi chéo',
              'Tổng hợp & bàn giao',
            ].map((s, i) => (
              <div key={s}>
                <span>0{i + 1}</span>
                <h4>{s}</h4>
                <p>
                  {
                    [
                      'Xác định sản phẩm, tiêu chí và thời hạn.',
                      'Ghi người phụ trách và đầu ra của từng việc.',
                      'Dùng bình luận, theo dõi phiên bản tài liệu.',
                      'Kiểm tra quyền truy cập và hoàn thiện bản nộp.',
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
          <h4>Công cụ gợi ý</h4>
          <p>
            Google Docs để cùng biên tập; Trello để theo dõi công việc; Google Meet để trao đổi. Cần
            bổ sung công cụ thực sự đã sử dụng, link chia sẻ và ảnh lịch sử cộng tác.
          </p>
        </>
      );
    case 5:
      return (
        <>
          <h3>Từ ý tưởng đến bản thảo.</h3>
          <p className="note">Brief minh họa. Chưa có sản phẩm AI do sinh viên thực hiện.</p>
          <div className="creative-brief">
            <p className="eyebrow">CREATIVE BRIEF / GIÁO DỤC ÂM NHẠC</p>
            <h4>Một poster giới thiệu buổi học nhạc lý dành cho người mới bắt đầu.</h4>
            <p>
              Đối tượng: người mới học. Thông điệp: khởi đầu từ những điều đơn giản. Yêu cầu: chữ
              tiếng Việt rõ ràng, hình ảnh hợp lệ và nội dung âm nhạc được kiểm chứng.
            </p>
          </div>
          <h4>Nhật ký sáng tạo cần bổ sung</h4>
          <p>
            Ghi công cụ và phiên bản, prompt đầy đủ, kết quả thô, phần chỉnh sửa cá nhân và quyền sử
            dụng tài nguyên. Đính kèm ảnh hoặc video hoàn thiện tại khu vực minh chứng bên dưới.
          </p>
        </>
      );
    case 6:
      return (
        <>
          <h3>Để AI hỗ trợ, để mình làm chủ.</h3>
          <p>
            Không dùng phản hồi AI như nguồn chứng cứ duy nhất. Luôn đối chiếu tài liệu gốc, tôn
            trọng tác quyền và tuân thủ hướng dẫn của giảng viên.
          </p>
          <IntegrityChecklist />
          <h4>Khung cam kết cá nhân</h4>
          <p>
            Chưa bổ sung cam kết do sinh viên tự viết. Cần mô tả giới hạn sử dụng AI, cách kiểm
            chứng thông tin và trách nhiệm với sản phẩm nộp.
          </p>
        </>
      );
    default:
      return null;
  }
}
