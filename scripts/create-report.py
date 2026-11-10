# -*- coding: utf-8 -*-
"""Generate an editable OOXML report draft using only the Python standard library."""
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
data = json.loads((root / 'submission/noi-dung.json').read_text())
profile = data['thongTin']
body = []
def clean(text):
    return text.replace('**', '').replace('`', '')
def p(text='', style=None, bold=False):
    props = f'<w:pStyle w:val="{style}"/>' if style else ''
    body.append(f'<w:p><w:pPr>{props}</w:pPr><w:r>{"<w:rPr><w:b/></w:rPr>" if bold else ""}<w:t xml:space="preserve">{escape(clean(text))}</w:t></w:r></w:p>')
def title(text): p(text, 'Heading1')
def h(text): p(text, 'Heading2')
def page(): body.append('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
def field(instruction, label):
    body.append(f'<w:p><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> {escape(instruction)} </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>{escape(label)}</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>')

p('TRƯỜNG ĐẠI HỌC SƯ PHẠM NGHỆ THUẬT TRUNG ƯƠNG', 'Title')
p('KHOA GIÁO DỤC ĐẠI CƯƠNG', 'Subtitle')
p('BÁO CÁO THỰC HIỆN PORTFOLIO', 'Title')
p('Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo — INF2501', 'Subtitle')
p(f"Họ và tên: {profile['hoTen']}")
p(f"Mã sinh viên: {profile['maSV']} · Lớp: {profile['lop']}")
p(f"Ngành học: {profile['nganhHoc']}")
p(f"Giảng viên hướng dẫn: Thầy {profile['giangVien']}")
p('URL Portfolio: [BỔ SUNG URL CÔNG KHAI SAU KHI TRIỂN KHAI]')
p('BẢN NHÁP BIÊN TẬP — cần bổ sung ảnh, xác nhận kết quả và tự viết phần cảm nhận trước khi nộp.', bold=True)
page()
title('MỤC LỤC')
field('TOC \\o "1-2" \\h \\z \\u', 'Mở bằng Microsoft Word và cập nhật trường để tạo mục lục tự động.')
p('Lưu ý về độ dài: Câu 4 quy định 10–15 trang nội dung, nhưng bảng chấm và mô tả xếp loại ghi 6–9 trang. Bản nháp chia thành 12 trang nội dung theo Câu 4; cần hỏi giảng viên trước khi chốt. Số trang thực tế có thể thay đổi sau khi thêm ảnh.')
page()
title('PHẦN 1. GIỚI THIỆU')
h('1.1. Thông tin cá nhân')
p(f"{profile['hoTen']}, mã sinh viên {profile['maSV']}, lớp {profile['lop']}, sinh viên ngành {profile['nganhHoc']}, {profile['truong']}. Năm sinh: {profile['namSinh']}. Sở thích: {', '.join(profile['soThich'])}. Email liên hệ công khai: {profile['email']}. Ảnh chân dung do người dùng cung cấp.")
h('1.2. Mục tiêu học tập và định hướng')
p(profile['mucTieuHocTap'])
for direction in profile['dinhHuong']: p(direction)
h('1.3. Mục tiêu của Portfolio')
p(profile['mucTieuPortfolio'])
p('Mỗi bài được trình bày theo mục tiêu, quá trình và sản phẩm, giúp người đọc theo dõi kết quả, cách lựa chọn công cụ và cách xử lý khó khăn.')
p('Cần bổ sung: ảnh chụp trang Giới thiệu sau khi triển khai và xác nhận tên khoa của sinh viên. Khoa Giáo dục Đại cương ở trang bìa là đơn vị được yêu cầu trong đề thi; không mặc nhiên coi đó là khoa quản lý ngành học.')
page()
title('PHẦN 2. XÂY DỰNG PORTFOLIO')
h('2.1. Nền tảng và lý do lựa chọn')
p('Website được xây dựng trên dự án Next.js hiện có, sử dụng App Router, React và TypeScript. Sáu bài được tổ chức bằng một route động, dữ liệu dùng chung cho danh mục và trang chi tiết. Cấu trúc này giúp giảm tình trạng tên bài, mục tiêu hoặc nội dung tóm tắt không khớp giữa các trang.')
p('Giao diện Piano / Prelude kết nối hình ảnh âm nhạc với chuyên ngành của sinh viên. Thiết kế giữ hệ thống màu, kiểu chữ và điều hướng nhất quán. Bản nội dung được cung cấp được tích hợp vào giao diện sẵn có, thay cho các hướng dẫn minh họa chung.')
h('2.2. Vai trò của công nghệ và AI')
p('Codex (OpenAI) hỗ trợ đọc yêu cầu, tổ chức mã nguồn, biên tập cách trình bày và kiểm tra kỹ thuật. Gói nội dung được cung cấp khai báo Claude (Anthropic) hỗ trợ bản nháp. Những công cụ thực hành khác chưa có tên xác nhận được giữ ở trạng thái cần bổ sung. Công bố AI không thay thế trách nhiệm kiểm chứng nội dung của sinh viên.')
h('2.3. Phạm vi đã xác minh')
p('Kiểm tra biên dịch và phản hồi HTTP giúp đánh giá hoạt động kỹ thuật của website. Các phép kiểm tra này không xác minh rằng sinh viên đã thực hiện đầy đủ thao tác trong bài tập, không thay việc thử trên thiết bị thật và không chứng minh các liên kết đám mây đã được mở công khai.')
p('Cần bổ sung: URL công khai và ảnh chụp giao diện máy tính, điện thoại.')
page()
title('2.4. Sơ đồ cấu trúc và điều hướng')
for text in ['Trang Giới thiệu: / — thông tin cá nhân, ảnh, mục tiêu, định hướng và mục đích portfolio.', 'Trang Dự án: /projects — danh mục sáu bài và liên kết tới từng bài.', 'Sáu trang con: /projects/bai-1 đến /projects/bai-6.', 'Trang Tổng kết: /conclusion — trải nghiệm, kỹ năng, điểm tâm đắc, thách thức và công bố AI.', 'Các đường dẫn tiếng Việt /du-an, /du-an/bai-N và /tong-ket cùng hiển thị nội dung đã tích hợp.']:
    p(text)
p('Hình 2.1. Sơ đồ thông tin: Giới thiệu → Dự án → Bài 1…6 → Tổng kết. Đây là sơ đồ mô tả, cần bổ sung hình chụp giao diện thực tế trong bản nộp.')
h('2.5. Cấu trúc bên trong một bài tập')
p('a) Mục tiêu nêu yêu cầu và kỹ năng được rèn luyện. b) Quá trình gồm các bước, công cụ, mục đích dùng AI, khó khăn và giải pháp. c) Sản phẩm gồm các bảng, đoạn nội dung, so sánh hoặc quy tắc của bài; danh mục tệp minh chứng nằm ngay sau đó. Phần phân tích tìm hiểu và vận dụng kết nối nội dung với một bài liên quan.')
p('Menu chung dẫn đến Giới thiệu, Dự án, Tổng kết và sáu bài. Trang chi tiết có mục lục, nút về danh mục, bài trước và bài tiếp theo. Chân trang ghi họ tên, mã sinh viên, lớp và tên học phần theo đề.')
page()
title('2.6. Quy trình tích hợp và kiểm tra')
for text in ['Bước 1 — Đọc đề thi và đối chiếu tên bài, chương, mục giáo trình, nội dung sản phẩm và thang điểm.', 'Bước 2 — Đưa nội dung sáu bài vào dữ liệu chung để danh mục và trang chi tiết sử dụng cùng một nguồn.', 'Bước 3 — Trình bày lại quy trình, bảng công cụ và khó khăn – cách giải quyết; giữ thông tin cần xác nhận ở trạng thái rõ ràng.', 'Bước 4 — Tích hợp các sản phẩm dạng văn bản, bảng, prompt so sánh và tình huống tương tác. Không tạo ảnh chụp thao tác để thay minh chứng thật.', 'Bước 5 — Kiểm tra tệp local trước khi nhúng; tệp chưa có được thay bằng khung chờ để tránh ảnh hỏng.', 'Bước 6 — Chạy kiểm tra TypeScript, build production và kiểm tra HTTP cho các trang. Sau đó cần mở website trên điện thoại, bổ sung minh chứng và triển khai công khai.']:
    p(text)
h('2.7. Những giới hạn cần xử lý')
p('Checkout hiện tại có 26 tệp hoặc liên kết được khai báo nhưng chưa được cung cấp. Bản tổng kết và một số tự đánh giá vẫn cần được sinh viên rà soát theo mục IV.3. Bảng điểm đánh giá nguồn và điểm đầu ra prompt cần đối chiếu với dữ liệu gốc; phần nhận xét chưa thay thế được đầu ra AI nguyên văn.')
p('Cần bổ sung ảnh chụp từng bước xây dựng, có đánh số và chú thích; không ghi ảnh dự kiến là minh chứng đã thực hiện.')
for b in data['baiTap']:
    page()
    title(f"PHẦN 3. BÀI {b['so']}: {b['ten']}")
    p(f"{b['chuong']} — {b['mucGiaoTrinh']}")
    p(f"Đường dẫn: [URL_PORTFOLIO]/projects/{b['slug']}")
    h('Mục tiêu')
    p(b['mucTieu']['yeuCau'])
    h('Công cụ và quy trình trong hồ sơ')
    p('; '.join(c['ten'] for c in b['quaTrinh']['congCu']))
    p(' → '.join(step['ten'] for step in b['quaTrinh']['cacBuoc']))
    h('Kết quả được trình bày')
    p(b['sanPham']['gioiThieu'])
    h('Khó khăn và cách giải quyết')
    k=b['quaTrinh']['khoKhan'][0]
    p(k['khoKhan']+' '+k['cachGiaiQuyet'])
    h('Minh chứng cần đối chiếu')
    p('; '.join(f['tieuDe'] for f in b['sanPham']['tep']))
    p('Những mô tả trên được tóm tắt từ hồ sơ cung cấp, chưa xác nhận thay sinh viên kết quả thực hành. Cần bổ sung ảnh hoặc tệp thật, đầu ra gốc nếu có và khai báo đúng tên công cụ AI đã sử dụng.')
page()
title('PHẦN 4. TỔNG KẾT VÀ TỰ ĐÁNH GIÁ')
p('PHẦN SINH VIÊN TỰ VIẾT: đề thi mục IV.3 yêu cầu cảm nhận và tự đánh giá phải do sinh viên tự viết. Các câu hỏi dưới đây chỉ là khung hoàn thiện, không phải nội dung để nộp nguyên văn.', bold=True)
for heading, text in [('4.1. Trải nghiệm', 'Chọn một tình huống cụ thể trong quá trình làm bài: mục tiêu ban đầu là gì, đã gặp trở ngại nào, thay đổi cách làm ra sao? Dẫn tới một sản phẩm hoặc ảnh minh chứng thật.'), ('4.2. Kiến thức và kỹ năng', 'Chọn những kỹ năng tiến bộ rõ nhất. Với mỗi kỹ năng, so sánh cách làm trước và sau học phần; nêu bài tập và chi tiết cụ thể làm căn cứ.'), ('4.3. Điểm tâm đắc', 'Chọn một sản phẩm có ý nghĩa với chuyên ngành Sư phạm âm nhạc; giải thích đóng góp của bản thân và điều còn muốn cải thiện.'), ('4.4. Thách thức và giải pháp', 'Nêu một khó khăn đã thực sự xảy ra. Trình bày phương án đã thử, kết quả quan sát và bài học cho lần thực hiện tiếp theo.'), ('4.5. Định hướng phát triển', 'Nêu hành động tiếp theo, thời điểm dự kiến và tiêu chí tự theo dõi. Tránh chỉ ghi một mục tiêu chung không có cách kiểm tra.')]:
    h(heading); p(text)
page()
title('4.6. Bảng kê AI và điều kiện hoàn thiện')
for c in data['tongKet']['congCuAI']:
    p(c['congCu']+' — '+c['mucDich']+' Phạm vi: '+c['dungO'])
h('4.7. Kiểm tra trước khi nộp')
for text in ['Đọc lại toàn bộ nội dung và thay các mục cần bổ sung bằng thông tin đã kiểm tra; tự viết cảm nhận và tự đánh giá.', 'Thêm ảnh minh chứng và tệp thật cho sáu bài; ghi nguồn tài nguyên và công bố AI chính xác.', 'Triển khai website công khai không cần đăng nhập; thử link website và link tài liệu đám mây bằng cửa sổ ẩn danh.', 'Thay [URL_PORTFOLIO] trong báo cáo bằng tên miền thật; cập nhật mục lục, số trang, chú thích hình và bảng trong Word.', 'Xác nhận yêu cầu số trang với giảng viên do đề có hai mức không thống nhất; duy trì website đến lúc công bố điểm và không sửa sau hạn nộp.']:
    p(text)
page()
title('TÀI LIỆU THAM KHẢO')
p('Danh mục dưới đây lấy từ hồ sơ nguồn, cần sinh viên mở bản gốc và đối chiếu trước khi trích dẫn trong bản nộp. Không coi việc hiển thị ở đây là xác nhận đã đọc tài liệu.')
refs=[]
for b in data['baiTap']:
    for block in b['sanPham']['khoi']:
        if block['kieu']=='danhSach':
            for item in block['muc']:
                if re.match(r'^(Bộ Giáo dục|Kasneci,|Miao,|Zawacki-Richter,|Cotton,)',item) and item not in refs: refs.append(item)
for i,r in enumerate(refs,1): p(f'[{i}] {r}')
p('Tài liệu Next.js đi kèm phiên bản cài đặt: Layouts and Pages. Dùng để đối chiếu cấu trúc App Router khi tích hợp nội dung.')
p('Đề thi chính thức học phần INF2501: dùng làm căn cứ cấu trúc và yêu cầu báo cáo.')
page()
title('PHỤ LỤC. DANH MỤC MINH CHỨNG')
for b in data['baiTap']:
    h(f"Bài {b['so']}")
    for f in b['sanPham']['tep']: p('□ '+f['tieuDe'])

styles='''<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="26"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="312" w:lineRule="auto"/><w:jc w:val="both"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:outlineLvl w:val="0"/><w:spacing w:before="200" w:after="160"/></w:pPr><w:rPr><w:b/><w:sz w:val="30"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:pPr><w:jc w:val="center"/><w:spacing w:before="400" w:after="300"/></w:pPr><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:pPr><w:jc w:val="center"/></w:pPr></w:style></w:styles>'''
ns='http://schemas.openxmlformats.org/wordprocessingml/2006/main'
document=f'''<w:document xmlns:w="{ns}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>{''.join(body)}<w:sectPr><w:footerReference w:type="default" r:id="rId3"/><w:titlePg/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1701" w:header="567" w:footer="567"/></w:sectPr></w:body></w:document>'''
footer=f'''<w:ftr xmlns:w="{ns}"><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText>PAGE</w:instrText></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>'''
files={
'[Content_Types].xml':'''<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/></Types>''',
'_rels/.rels':'''<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>''',
'word/_rels/document.xml.rels':'''<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>''',
'word/document.xml':document,'word/styles.xml':styles,'word/footer1.xml':footer,
'word/settings.xml':f'<w:settings xmlns:w="{ns}"><w:updateFields w:val="true"/></w:settings>'}
out=root/'submission/2552210313_DinhQuangPhong_BaoCao_BanNhap.docx'
with ZipFile(out,'w',ZIP_DEFLATED) as z:
    for name, value in files.items(): z.writestr(name, '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+value)
print(f'Đã tạo {out.name}: bản nháp với 12 phần trang nội dung, cần kiểm tra phân trang trong Word.')
