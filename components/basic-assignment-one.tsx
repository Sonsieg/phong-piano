export function BasicAssignmentOne() {
  const steps = [
    {
      title: 'Mở This PC để xem các ổ đĩa',
      text: 'Nhìn ra màn hình chính (Desktop) của máy tính → Nhấp đúp chuột trái (2 lần liên tiếp nhanh tay) vào biểu tượng hình máy tính có chữ This PC (hoặc Computer) → Cửa sổ hiện ra sẽ hiển thị các ổ đĩa (C:, D:, E:).',
    },
    {
      title: 'Cách tạo thư mục mới (New Folder) để cất bài tập',
      text: 'Nhấp đúp vào ổ đĩa D: → Nhấp chuột phải vào một khoảng trống màu trắng bất kỳ → Rà chuột vào chữ New → Nhấp chuột trái vào chữ Folder → Gõ tên thư mục (ví dụ: BaiTapCongNgheSo) rồi bấm phím Enter trên bàn phím.',
    },
    {
      title: 'Cách đổi tên tệp (Rename)',
      text: 'Nhấp chuột phải vào tệp tin cần đổi tên → Nhấp chọn chữ Rename (hoặc bấm phím F2 trên bàn phím) → Gõ tên mới rồi bấm Enter.',
    },
    {
      title: 'Cách sao chép tệp (Copy & Paste)',
      text: 'Nhấp chuột phải vào tệp cần sao → Nhấp chọn biểu tượng hai tờ giấy chồng lên nhau (Copy) → Bấm mở thư mục muốn lưu đến → Nhấp chuột phải vào chỗ trống → Nhấp chọn biểu tượng bảng kẹp giấy (Paste) để tạo ra bản sao y hệt.',
    },
    {
      title: 'Cách di chuyển tệp (Cut & Paste)',
      text: 'Nhấp chuột phải vào tệp → Chọn hình cái kéo (Cut) → Mở thư mục mới → Nhấp chuột phải chọn Paste. Thao tác này giống như bốc nguyên cái file đi chỗ khác, không để lại bản cũ.',
    },
    {
      title: 'Cách xóa tệp và lấy lại khi lỡ tay xóa nhầm',
      text: 'Nhấp chọn tệp cần vứt → Bấm phím Delete trên bàn phím.',
      extra:
        'Lỡ xóa nhầm thì làm sao? Ra màn hình chính (Desktop), nhấp đúp chuột trái (2 lần) vào biểu tượng thùng rác (Recycle Bin) → Tìm đến tệp vừa xóa, nhấp chuột phải vào nó → Chọn Restore để tệp tự động bay về chỗ cũ.',
    },
    {
      title: 'Cách nén tệp gửi bài',
      text: 'Nhấp chuột phải vào thư mục bài tập → Chọn Compress to ZIP file để gom lại thành 1 file gọn gàng cho dễ nộp.',
    },
  ];

  return (
    <>
      <section id="basic-process">
        <p className="eyebrow">BÀI TẬP 1 / CÂU TRẢ LỜI CHÍNH</p>
        <h2>Thao tác cơ bản với tệp tin và thư mục.</h2>
        <ol className="process-list">
          {steps.map((step) => (
            <li key={step.title}>
              <div className="process-step">
                <h3>{step.title}</h3>
                <p>
                  <strong>Thao tác:</strong> {step.text}
                </p>
                {step.extra && <p>{step.extra}</p>}
              </div>
            </li>
          ))}
        </ol>
        <h3>Khó khăn gặp phải & cách giải quyết</h3>
        <p>
          <strong>Khó khăn:</strong> Mới đầu dùng máy hay cắm nhầm cổng USB hoặc lưu bài bừa bãi
          không tìm thấy.
        </p>
        <p>
          <strong>Cách giải quyết:</strong> Nhớ kỹ các cổng hình chữ nhật ở thân máy là cắm USB hoặc
          chuột, và luôn tạo một thư mục riêng trong ổ đĩa D: để lưu mọi bài tập cho ngăn nắp.
        </p>
      </section>
      <section id="basic-product">
        <p className="eyebrow">c / SẢN PHẨM CUỐI CÙNG</p>
        <h2>Hình chụp màn hình thực tế.</h2>
        <p>
          Hình chụp màn hình thực tế khi mở giao diện This PC và cắm thiết bị ngoại vi / tạo thư mục
          trên máy tính của bạn.
        </p>
      </section>
    </>
  );
}
