import { basicSteps } from '@/src/data/basic-assignment-one';

export function BasicAssignmentOne() {
  return (
    <>
      <section id="basic-process">
        <p className="eyebrow">BÀI TẬP 1 / CÂU TRẢ LỜI CHÍNH</p>
        <h2>Thao tác cơ bản với tệp tin và thư mục.</h2>
        <ol className="process-list">
          {basicSteps.map((step) => (
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
