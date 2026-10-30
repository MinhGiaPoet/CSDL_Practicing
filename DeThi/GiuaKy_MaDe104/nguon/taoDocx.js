// Tạo bản Word (.docx) cho đề giữa kỳ CSDL — mã đề 104, cùng nội dung với bản LaTeX.
// Chạy trong thư mục nguon/:  node taoDocx.js <thư mục chứa SoDoER.png>
//   SoDoER.png: ảnh sơ đồ ER xuất từ SoDoER_standalone.pdf
//     (xelatex SoDoER_standalone.tex; pdftoppm -r 450 -png -singlefile SoDoER_standalone.pdf SoDoER)
// Cần pandoc: công thức viết bằng LaTeX được pandoc đổi sang Equation (OMML) của Word.
//
// Cú pháp đánh dấu trong chuỗi nội dung: **đậm**, *nghiêng*, `máy chữ`, ~gạch chân~, $công thức LaTeX$.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
// jszip đi kèm docx; nếu không cài riêng thì lấy bản nằm cạnh docx
const JSZip = (() => {
  try { return require('jszip'); } catch (e) {
    return require(require.resolve('jszip', { paths: [path.dirname(require.resolve('docx'))] }));
  }
})();
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, Header, Footer, PageNumber, TabStopType, ImageRun, LevelFormat, VerticalAlign,
  HeightRule, PageBreak, LineRuleType,
} = require('docx');

const FIG = path.resolve(process.argv[2] || __dirname);
const OUT = path.resolve(__dirname, '..', 'DeGiuaKy_CSDL_MaDe104.docx');

const SERIF = 'Times New Roman';
const MONO = 'Courier New';
// cỡ chữ (nửa point), tương ứng lớp article 11pt của bản LaTeX
const SZ = { foot: 18, small: 20, normal: 22, large: 24, Large: 29, LARGE: 34 };
const TEXT_W = 9752; // A4 trừ lề trái/phải 1,9 cm (twip)

// ---------------------------------------------------------------- chữ và công thức
const maths = [];
function mathRun(tex, size) {
  const id = maths.length;
  maths.push({ tex, size: size || SZ.normal });
  return new TextRun({ text: `@@M${id}@@`, size });
}

function runs(str, base = {}) {
  const out = [];
  let b = !!base.bold, i = !!base.italics, mono = false, u = false, buf = '';
  const flush = () => {
    if (!buf) return;
    out.push(new TextRun({
      text: buf, bold: b, italics: i, size: base.size, smallCaps: base.smallCaps,
      underline: u ? {} : undefined, font: mono ? MONO : SERIF,
    }));
    buf = '';
  };
  for (let k = 0; k < str.length; k++) {
    const c = str[k];
    if (c === '$') {
      flush();
      const e = str.indexOf('$', k + 1);
      out.push(mathRun(str.slice(k + 1, e), base.size));
      k = e;
    } else if (c === '*' && str[k + 1] === '*') { flush(); b = !b; k++; }
    else if (c === '*') { flush(); i = !i; }
    else if (c === '`') { flush(); mono = !mono; }
    else if (c === '~') { flush(); u = !u; }
    else buf += c;
  }
  flush();
  return out;
}

// đoạn văn: o = {size, bold, italics, align, before, after, left, hanging, keepNext, tabs, border}
function para(str, o = {}) {
  return new Paragraph({
    children: Array.isArray(str) ? str : runs(str, o),
    alignment: o.align,
    spacing: { before: o.before || 0, after: o.after || 0 },
    indent: (o.left || o.hanging) ? { left: o.left || 0, hanging: o.hanging } : undefined,
    keepNext: o.keepNext,
    tabStops: o.tabs,
    border: o.border,
    numbering: o.numbering,
  });
}
const rule = (before = 0, after = 60) => new Paragraph({
  children: [], spacing: { before, after },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 1 } },
});
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// ---------------------------------------------------------------- bảng
const LINE = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const ALL = { top: LINE, bottom: LINE, left: LINE, right: LINE };

function cell(content, w, o = {}) {
  const ps = (Array.isArray(content) ? content : [content]).map((s) =>
    s instanceof Paragraph ? s : para(s, { size: o.size, bold: o.bold, align: o.align || AlignmentType.CENTER }));
  return new TableCell({
    children: ps, width: { size: w, type: WidthType.DXA }, borders: o.borders || ALL,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: o.pad ?? 30, bottom: o.pad ?? 30, left: 60, right: 60 },
  });
}
// rows: mảng các hàng, mỗi hàng là mảng chuỗi; o.boldRow0, o.boldCol0, o.height, o.aligns
function grid(rows, widths, o = {}) {
  const total = widths.reduce((a, c) => a + c, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    alignment: AlignmentType.CENTER,
    rows: rows.map((r, ri) => new TableRow({
      height: o.height ? { value: o.height, rule: HeightRule.ATLEAST } : undefined,
      children: r.map((c, ci) => cell(c, widths[ci], {
        bold: (o.boldRow0 && ri === 0) || (o.boldCol0 && ci === 0),
        size: o.size,
        pad: o.pad,
        align: o.aligns ? o.aligns[ci] : AlignmentType.CENTER,
        borders: o.borders ? o.borders(ri, ci, rows.length) : ALL,
      })),
    })),
  });
}

// ---------------------------------------------------------------- khối nội dung
const H = []; // các phần tử của thân văn bản

function phan(letter, title, pts, extra = '') {
  H.push(para(`**PHẦN ${letter}.  ${title}** *(${pts})*${extra}`, { size: SZ.large, before: 180, after: 60, keepNext: true }));
}
function cau(n, text) {
  H.push(para(`**${n}.** ${text}`, { keepNext: true }));
}
function phuongAn(items) {
  items.forEach((t, k) => H.push(para(`${'ABC'[k]}.\t${t}`, {
    size: SZ.small, left: 700, hanging: 330, before: k === 0 ? 170 : 0,
    tabs: [{ type: TabStopType.LEFT, position: 700 }], keepNext: k < items.length - 1,
  })));
}
function phuongAnNgang(items) {
  H.push(para(items.map((t, k) => `${'ABC'[k]}. ${t}`).join('  '), { size: SZ.small, left: 460 }));
}
const ghichu = (s, before = 40) => H.push(para(s, { size: SZ.foot, before, after: 40 }));
const center = (x) => H.push(x);

// ================================================================= TRANG 1
H.push(para('Học Viện Công Nghệ Bưu Chính Viễn Thông — Khoa Trí Tuệ Nhân Tạo', { align: AlignmentType.CENTER, smallCaps: true, after: 40 }));
H.push(para('**ĐỀ THI GIỮA KỲ — CƠ SỞ DỮ LIỆU (INT1313)**', { align: AlignmentType.CENTER, size: SZ.Large, before: 20, after: 40 }));
H.push(para([
  ...runs('Lớp tài năng ngành An toàn thông tin — '),
  new TextRun({ text: 'Mã đề 104', bold: true, smallCaps: true, font: SERIF }),
], { align: AlignmentType.CENTER }));
H.push(para('**Thời gian: 90 phút | Không sử dụng tài liệu | Thang điểm 10**', { align: AlignmentType.CENTER }));
H.push(rule(0, 120));

H.push(para('**QUY ĐỊNH TRÌNH BÀY**', { size: SZ.large, after: 60 }));
[
  '**Chỉ PHIẾU TRẢ LỜI (2 trang cuối, in 2 mặt) được chấm.** Đáp án viết trên phần đề hoặc giấy nháp không được tính điểm.',
  '**Tập thuộc tính viết liền, theo thứ tự bảng chữ cái:** viết ABCD, không viết $\\{B,A,D,C\\}$.',
  '**Mỗi ô một đáp án.** Ô có hai đáp án hoặc tẩy xóa không rõ tính là **sai**.',
  'Phần F trả lời trong khung: **F1 tối đa 3 dòng, F2 tối đa 4 dòng**; ngoài khung không chấm.',
  '**Không dùng bút chì** cho phiếu trả lời.',
].forEach((t, k) => H.push(para(`${k + 1}.\t${t}`, { left: 330, hanging: 330, after: 20, tabs: [{ type: TabStopType.LEFT, position: 330 }] })));
H.push(rule(0, 0));

phan('A', 'Trắc nghiệm', '1,8 điểm', ' **— 12 câu, mỗi câu 0,15**');
ghichu('Mỗi câu có ba phương án; chọn một và điền vào phiếu trả lời.', 0);

cau(1, 'Khi chuyển liên kết M:N có thuộc tính riêng sang mô hình quan hệ, khóa chính là:');
phuongAn(['một trong hai khóa ngoại', 'hợp của hai khóa ngoại', 'hợp của hai khóa ngoại và các thuộc tính riêng']);
cau(2, 'Thuật toán phân rã BCNF bảo đảm tính chất nào?');
phuongAnNgang(['cả hai.', 'chỉ bảo toàn phụ thuộc.', 'chỉ kết nối không mất mát.']);
cau(3, '$Z$ phụ thuộc bắc cầu vào $X$ khi $X\\to Y, Y\\to Z$ và **thêm điều kiện**:');
phuongAn(['không cần thêm điều kiện nào', '$Y\\nrightarrow X$ và $Z\\notin X\\cup Y$', '$Y$ phải là thuộc tính khóa']);
cau(4, '$K$ là khóa ứng viên của $R$ khi $\\{K\\}^{\\text{+}}=R$ và:');
phuongAn(['$K$ là duy nhất', 'không tập con nào của $K$ là siêu khóa', 'không tập con *thực sự* nào của $K$ là siêu khóa']);
cau(5, 'Cho $R(A,B,C)$ với $F=\\{A\\to B,\\ B\\to C\\}$. Khi đó $R$:');
phuongAnNgang(['đạt 2NF nhưng không đạt 3NF.', 'đạt 3NF.', 'không đạt 2NF.']);
cau(6, 'Quy tắc suy diễn nào sau đây **KHÔNG** đúng?');
phuongAn(['nếu $XY\\to Z$ thì $X\\to Z$', 'nếu $X\\to Y$ và $Y\\to Z$ thì $X\\to Z$', 'nếu $X\\to YZ$ thì $X\\to Y$']);
cau(7, 'Mọi lược đồ quan hệ chỉ có **hai** thuộc tính thì:');
phuongAnNgang(['luôn đạt 3NF nhưng chưa chắc BCNF.', 'luôn đạt BCNF.', 'có thể không đạt 2NF.']);
cau(8, 'Phân rã $R$ thành $R_1, R_2$ là *không mất mát* khi và chỉ khi:');
phuongAn(['$R_1\\cap R_2$ là siêu khóa của cả hai quan hệ con', '$R_1\\cap R_2$ là siêu khóa của ít nhất một quan hệ con', '$R_1\\cap R_2\\neq\\emptyset$']);
cau(9, 'Nếu một phân rã nhị phân là không mất mát thì:');
phuongAn(['nó cũng bảo toàn phụ thuộc', 'nó chắc chắn không bảo toàn phụ thuộc', 'chưa kết luận được gì về bảo toàn phụ thuộc']);
H.push(pageBreak());

// ================================================================= TRANG 2
cau(10, 'Một thể hiện cụ thể của $R$ thỏa mãn $X\\to Y$. Kết luận đúng là:');
phuongAnNgang(['chưa kết luận được gì.', '$X$ là siêu khóa của $R$.', '$X\\to Y$ là phụ thuộc hàm của lược đồ.']);
cau(11, 'Phép chiếu tập phụ thuộc hàm $\\pi_S(F)$ xuống tập thuộc tính $S$:');
phuongAn(['có thể chứa phụ thuộc không xuất hiện trong $F$', 'chỉ gồm các phụ thuộc của $F$ có cả hai vế nằm trong $S$', 'luôn rỗng nếu $S$ không chứa khóa nào của $R$']);
cau(12, 'Trong một lược đồ quan hệ bất kỳ, thuộc tính $H$ không xuất hiện ở vế trái lẫn vế phải của phụ thuộc hàm nào. Khi đó $H$:');
phuongAn(['có thể thuộc hoặc không thuộc khóa, tùy vào $F$', 'không thuộc khóa ứng viên nào', 'thuộc mọi khóa ứng viên']);

phan('B', 'Phụ thuộc hàm', '2,8 điểm');
H.push(para('Cho $R(A,B,C,D,E,G)$ và $F=\\{\\,AD\\to B,\\quad B\\to D,\\quad BG\\to E,\\quad E\\to DG\\,\\}$', { after: 60 }));
H.push(para('**B1. Bao đóng** *(0,8 điểm)* — tính và điền vào phiếu: $\\{B\\}^{\\text{+}}$,  $\\{AB\\}^{\\text{+}}$,  $\\{ACE\\}^{\\text{+}}$,  $\\{ABC\\}^{\\text{+}}$ (lần lượt là ô B1a, B1b, B1c, B1d).', { after: 60 }));
H.push(para('**B2. Phân loại** *(1,2 điểm)* — với mỗi tập, điền **K** (là khóa ứng viên) / **S** (là siêu khóa nhưng không tối thiểu) / **N** (không phải siêu khóa):', { after: 100 }));
const B2_SETS = ['ABCE', 'ACE', 'ABCD', 'ABCG', 'ABC', 'ABD', 'ACDG', 'ACDE'];
const tenO = (p, n) => Array.from({ length: n }, (_, k) => `${p}${'abcdefgh'[k]}`);
center(grid([['Ô', ...tenO('B2', 8)], ['Tập', ...B2_SETS.map((x) => `$${x}$`)]],
  [620, ...Array(8).fill(900)], { boldRow0: true, boldCol0: true }));
ghichu('*Tính điểm:* đúng cả 8 = 1,2; sai 1–2 ô = 0,6; sai từ 3 ô = 0.');
H.push(para('**B3. Phủ tối thiểu** *(0,8 điểm)* — khoanh vào phiếu những số thuộc phủ tối thiểu của $F$. *(Với tập $F$ này phủ tối thiểu là duy nhất.)*', { before: 60, after: 100 }));
const RULE_H = { style: BorderStyle.SINGLE, size: 8, color: '000000' };
center(grid([
  ['1. $E\\to DG$', '3. $AB\\to D$', '5. $B\\to D$', '7. $BG\\to E$', '9. $G\\to C$'],
  ['2. $AD\\to B$', '4. $AE\\to B$', '6. $G\\to B$', '8. $E\\to D$', '10. $E\\to G$'],
], Array(5).fill(1320), {
  aligns: Array(5).fill(AlignmentType.LEFT),
  borders: (ri, ci, n) => ({ top: ri === 0 ? RULE_H : NONE, bottom: ri === n - 1 ? RULE_H : NONE, left: NONE, right: NONE }),
}));
ghichu('*Lưu ý:* trong danh sách có phụ thuộc *suy diễn được* từ $F$ nhưng *không* thuộc phủ tối thiểu, và có cả phụ thuộc không suy diễn được từ $F$. *Tính điểm:* đúng hoàn toàn = 0,8; mỗi số thừa hoặc thiếu trừ 0,2; tối thiểu 0.');

phan('C', 'Phân rã', '2,0 điểm');
H.push(para('**C1** *(1,2 điểm)* — Cho $R(A,B,C,D)$ và $F=\\{\\,A\\to B,\\quad BD\\to A\\,\\}$. Với mỗi phép phân rã, điền **Đ/S** cho hai câu hỏi độc lập:', { after: 100 }));
const C1_ROWS = [['C1a', '$\\{ABD,\\ ACD\\}$'], ['C1b', '$\\{AB,\\ ACD\\}$'], ['C1c', '$\\{AC,\\ ABD\\}$'], ['C1d', '$\\{AB,\\ CD\\}$']];
const L = AlignmentType.LEFT;
center(grid([['Ô', 'Phép phân rã', 'Không mất mát?', 'Bảo toàn phụ thuộc?'], ...C1_ROWS.map((r) => [...r, '', ''])],
  [560, 2000, 2280, 2620], { boldRow0: true, aligns: [L, L, L, L] }));
ghichu('Mỗi ô 0,15 điểm (8 ô). Hai cột chấm độc lập — phải điền cả hai cột cho mỗi phép phân rã; bỏ trống tính sai.');
H.push(para('**C2** *(0,8 điểm)* — Quay lại lược đồ $R(A,B,C,D,E,G)$ ở Phần B. Xét phép chiếu $\\pi_{ABDE}(F)$. Với mỗi phụ thuộc dưới đây, điền **Đ** nếu nó *suy diễn được* từ $F$ (tức thuộc $\\pi_{ABDE}(F)$), **S** nếu không:', { before: 60, after: 100 }));
const C2_FD = ['A\\to E', 'AE\\to B', 'B\\to D', 'B\\to A', 'E\\to D', 'B\\to E', 'D\\to A', 'AB\\to D'];
center(grid([['Ô', ...tenO('C2', 8)], ['FD', ...C2_FD.map((x) => `$${x}$`)]],
  [620, ...Array(8).fill(975)], { boldRow0: true, boldCol0: true }));
ghichu('Mỗi ô 0,1 điểm; bỏ trống tính sai.');
H.push(pageBreak());

// ================================================================= TRANG 3
phan('D', 'Mô hình thực thể — liên kết', '1,2 điểm');
const png = fs.readFileSync(path.join(FIG, 'SoDoER.png'));
H.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60, line: 240, lineRule: LineRuleType.AUTO },
  children: [new ImageRun({
    type: 'png', data: png,
    transformation: { width: 535, height: 189 },
    altText: { title: 'Sơ đồ ER', description: 'Sơ đồ thực thể liên kết Phần D', name: 'SoDoER' },
  })],
}));
ghichu('Chữ nhật nét đôi = thực thể yếu; thoi nét đôi = liên kết định danh; bầu dục nét đôi = thuộc tính đa trị; gạch chân = khóa chính; gạch chân *nghiêng* = khóa bộ phận.', 0);
H.push(para('**Quy ước đặt tên khóa ngoại:** khóa ngoại sinh ra từ liên kết đệ quy `TruongNhom` đặt tên `MaTruongNhom`; khóa ngoại sinh ra từ liên kết `PhuTrach` đặt tên `MaCVPhuTrach`.', { size: SZ.foot, after: 40 }));
H.push(para('Dưới đây là 8 quan hệ ứng viên. Điền **Đ** nếu quan hệ thuộc lược đồ đúng, **S** nếu không; nếu **Đ** thì ghi thêm **khóa chính**.', { after: 100 }));
const D_REL = [
  'ChuyenVien(MaCV, HoTen, Email, MaTruongNhom, MaTK, TenDangNhap)',
  'ChuKy(SoHieu, NgayCapNhat)',
  'MauTinHieu_HanhVi(MaMau, HanhVi)',
  'ChuyenVien(MaCV, HoTen, Email, MaTruongNhom)',
  'PhatHien(MaMau, MaHo, NgayPhatHien, TrangThai)',
  'TaiKhoanPT(MaTK, TenDangNhap, MaCV)',
  'MaDoc(MaHo, DiemNguyHiem, PhanLoai)',
  'MauTinHieu(MaMau, TenMau, MaHash, HanhVi, MaCVPhuTrach)',
];
const HEAVY = { style: BorderStyle.SINGLE, size: 8, color: '000000' };
const THIN = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
center(grid([['Ô', 'Quan hệ ứng viên'], ...D_REL.map((r, k) => [`D${k + 1}`, `\`${r}\``])], [620, 8250], {
  boldRow0: true, size: SZ.small, aligns: [L, L], pad: 0,
  borders: (ri, ci, n) => ({ top: ri === 0 ? HEAVY : (ri === 1 ? THIN : NONE), bottom: ri === n - 1 ? HEAVY : NONE, left: NONE, right: NONE }),
}));
ghichu('Mỗi ô đúng cả Đ/S và khóa chính = 0,15 điểm.');

phan('E', 'Đại số quan hệ', '1,0 điểm');
H.push(para('Dùng ba quan hệ:'));
['`MauTinHieu(~MaMau~, ..., MaHash)`', '`MaDoc(~MaHo~, ..., PhanLoai)`', '`PhatHien(~*MaMau*~, ~*MaHo*~, TrangThai)`']
  .forEach((t) => H.push(para(t, { size: SZ.small, numbering: { reference: 'cham', level: 0 } })));
H.push(para('**E1–E3.** Giá trị `MaHash` của những mẫu tín hiệu có ít nhất một họ mã độc mức `’APT’` ở trạng thái `*’CHUA_CACH_LY’*`:', { before: 40 }));
const hop = (x) => `\\boxed{\\text{${x}}}`;
const tt = (x) => `\\texttt{${x}}`;
const dong = (tex) => H.push(para(`$${tex}$`, { align: AlignmentType.CENTER, before: 60, after: 60 }));
dong(`\\pi_{${hop('E1')}}\\left(${tt('MauTinHieu')}\\bowtie\\left(\\sigma_{${hop('E2')}}(${tt('PhatHien')})\\bowtie\\sigma_{${hop('E3')}}(${tt('MaDoc')})\\right)\\right)`);
H.push(para('**E4.** Mã những mẫu tín hiệu **không** có họ mã độc nào mức `’APT’`:'));
dong(`\\pi_{${tt('MaMau')}}(${tt('MauTinHieu')})\\ \\ ${hop('E4')}\\ \\ \\pi_{${tt('MaMau')}}\\left(${tt('PhatHien')}\\bowtie\\sigma_{${tt('PhanLoai=’APT’')}}(${tt('MaDoc')})\\right)`);
H.push(para('**E5.** Mã những mẫu tín hiệu bị ảnh hưởng bởi **mọi** họ mã độc mức `’APT’`:'));
dong(`\\pi_{${tt('MaMau, MaHo')}}(${tt('PhatHien')})\\ \\ ${hop('E5')}\\ \\ \\pi_{${tt('MaHo')}}\\left(\\sigma_{${tt('PhanLoai=’APT’')}}(${tt('MaDoc')})\\right)`);
ghichu('*Mỗi ô 0,2 điểm.* Ô E1–E3 điền danh sách thuộc tính hoặc điều kiện; ô E4, E5 điền *một toán tử*.', 0);

phan('F', 'Tự luận ngắn', '1,2 điểm');
H.push(para('Vẫn dùng $R(A,B,C,D)$ với $F=\\{\\,A\\to B,\\quad BD\\to A\\,\\}$ ở Phần C.', { after: 60 }));
H.push(para('**F1** *(0,6 điểm)* Chứng minh $R$ **đạt 3NF**. Yêu cầu: nêu đủ các khóa ứng viên, tập thuộc tính khóa, rồi xét từng phụ thuộc hàm. *(Tối đa 3 dòng)*', { after: 60 }));
H.push(para('**F2** *(0,6 điểm)* $R$ có đạt BCNF không? Nếu không, hãy làm đủ ba việc: **(a)** chỉ rõ các phụ thuộc vi phạm; **(b)** phân rã $R$ về BCNF và viết các lược đồ con thu được; **(c)** chỉ rõ phụ thuộc hàm nào *bị mất* sau phân rã. *(Tối đa 4 dòng)*'));
H.push(pageBreak());

// ================================================================= TRANG 4–5: GIẤY NHÁP
for (let k = 0; k < 2; k++) {
  H.push(para('**GIẤY NHÁP**', { align: AlignmentType.CENTER, size: SZ.large }));
  H.push(para('*Phần viết ở đây không được chấm.*', { align: AlignmentType.CENTER, size: SZ.small }));
  H.push(pageBreak());
}

// ================================================================= TRANG 6–7: PHIẾU TRẢ LỜI
const phieuPhan = (s) => H.push(para(s, { before: 200, after: 80, keepNext: true }));
const nhan = (s) => H.push(para(s, { before: 60, after: 80, keepNext: true }));
const ROW_H = 400;

H.push(para('**PHIẾU TRẢ LỜI**', { align: AlignmentType.CENTER, size: SZ.LARGE }));
H.push(para([
  ...runs('Đề thi giữa kỳ — Cơ sở dữ liệu (INT1313) — '),
  new TextRun({ text: 'Mã đề 104', bold: true, smallCaps: true, font: SERIF }),
], { align: AlignmentType.CENTER, after: 160 }));
H.push(para('Họ và tên: \t  Mã sinh viên: \t  Lớp: \t', {
  tabs: [
    { type: TabStopType.LEFT, position: 4700, leader: 'dot' },
    { type: TabStopType.LEFT, position: 7700, leader: 'dot' },
    { type: TabStopType.RIGHT, position: TEXT_W, leader: 'dot' },
  ],
}));
H.push(rule(0, 0));

phieuPhan('**PHẦN A.  Trắc nghiệm** *(1,8 điểm) — ghi A, B hoặc C*');
center(grid([['Câu', ...Array.from({ length: 12 }, (_, k) => `${k + 1}`)], ['Đáp án', ...Array(12).fill('')]],
  [1100, ...Array(12).fill(640)], { boldRow0: true, boldCol0: true, height: ROW_H }));

phieuPhan('**PHẦN B.  Phụ thuộc hàm** *(2,8 điểm)*');
nhan('**B1. Bao đóng**');
center(grid([
  ['**B1a**  $\\{B\\}^{\\text{+}}$', '', '**B1b**  $\\{AB\\}^{\\text{+}}$', ''],
  ['**B1c**  $\\{ACE\\}^{\\text{+}}$', '', '**B1d**  $\\{ABC\\}^{\\text{+}}$', ''],
], [1700, 2100, 1700, 2100], { height: ROW_H }));
nhan('**B2. Phân loại** *(ghi K / S / N)*');
center(grid([['Ô', ...tenO('B2', 8)], ['Tập', ...B2_SETS.map((x) => `$${x}$`)], ['K/S/N', ...Array(8).fill('')]],
  [900, ...Array(8).fill(900)], { boldRow0: true, boldCol0: true, height: ROW_H }));
nhan('**B3. Phủ tối thiểu** *(khoanh tròn các số thuộc phủ tối thiểu của $F$)*');
H.push(para(Array.from({ length: 10 }, (_, k) => `${k + 1}`).join('   '), { align: AlignmentType.CENTER, size: 28, before: 80 }));

phieuPhan('**PHẦN C.  Phân rã** *(2,0 điểm) — ghi Đ hoặc S*');
nhan('**C1**');
center(grid([['Ô', 'Phép phân rã', 'Không mất mát?', 'Bảo toàn phụ thuộc?'], ...C1_ROWS.map((r) => [...r, '', ''])],
  [560, 2000, 2280, 2620], { boldRow0: true, aligns: [L, L, AlignmentType.CENTER, AlignmentType.CENTER], height: ROW_H }));
nhan('**C2**');
center(grid([['Ô', ...tenO('C2', 8)], ['FD', ...C2_FD.map((x) => `$${x}$`)], ['Đ/S', ...Array(8).fill('')]],
  [700, ...Array(8).fill(975)], { boldRow0: true, boldCol0: true, height: ROW_H }));
H.push(pageBreak());

phieuPhan('**PHẦN D.  Mô hình thực thể — liên kết** *(1,2 điểm)*');
center(grid([['Ô', 'Đ/S', 'Khóa chính (nếu Đ)'], ...Array.from({ length: 8 }, (_, k) => [`D${k + 1}`, '', ''])],
  [700, 1150, 6400], { boldRow0: true, aligns: [AlignmentType.CENTER, AlignmentType.CENTER, L], height: ROW_H }));
phieuPhan('**PHẦN E.  Đại số quan hệ** *(1,0 điểm)*');
center(grid([['**E1**', ''], ['**E2**', ''], ['**E3**', '']], [700, 8300], { height: ROW_H }));
H.push(para('', { after: 80 }));
center(grid([['**E4**', '', '**E5**', '']], [700, 1900, 700, 1900], { height: ROW_H }));
phieuPhan('**PHẦN F.  Tự luận ngắn** *(1,2 điểm)*');
const DOT = { style: BorderStyle.DOTTED, size: 4, color: '808080' };
const OUTER = { style: BorderStyle.SINGLE, size: 8, color: '000000' };
function khung(n) {
  H.push(new Table({
    width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W], alignment: AlignmentType.CENTER,
    rows: Array.from({ length: n }, (_, r) => new TableRow({
      height: { value: 482, rule: HeightRule.EXACT },
      children: [new TableCell({
        children: [para('')], width: { size: TEXT_W, type: WidthType.DXA },
        borders: { top: r === 0 ? OUTER : DOT, bottom: r === n - 1 ? OUTER : DOT, left: OUTER, right: OUTER },
      })],
    })),
  }));
}
nhan('**F1** *(tối đa 3 dòng)*');
khung(3);
nhan('**F2** *(tối đa 4 dòng)*');
khung(4);

// ================================================================= dựng tài liệu
const doc = new Document({
  creator: 'CSDL_Practicing',
  title: 'Đề thi giữa kỳ CSDL (INT1313) — Mã đề 104',
  styles: {
    default: { document: { run: { font: SERIF, size: SZ.normal }, paragraph: { spacing: { line: 245, lineRule: LineRuleType.AUTO } } } },
  },
  numbering: {
    config: [{
      reference: 'cham',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 640, hanging: 260 } } } }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1190, bottom: 1134, left: 1077, right: 1077, header: 680, footer: 570 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '000000', space: 1 } },
          children: [new TextRun({ text: 'CSDL INT1313  Mã đề 104\tGiữa kỳ — Lớp tài năng ATTT', size: SZ.small })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: ['Trang ', PageNumber.CURRENT, '/', PageNumber.TOTAL_PAGES, ' — Mã đề 104'] })],
        })],
      }),
    },
    children: H,
  }],
});

// ---------------------------------------------------------------- LaTeX → OMML (qua pandoc)
function omml() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'omml-'));
  const md = path.join(dir, 'm.md');
  fs.writeFileSync(md, maths.map((m) => `$${m.tex}$`).join('\n\n') + '\n');
  execFileSync('pandoc', [md, '-f', 'markdown', '-o', path.join(dir, 'm.docx')]);
  return JSZip.loadAsync(fs.readFileSync(path.join(dir, 'm.docx')))
    .then((z) => z.file('word/document.xml').async('string'))
    .then((xml) => {
      const list = xml.match(/<m:oMath>[\s\S]*?<\/m:oMath>/g) || [];
      if (list.length !== maths.length) throw new Error(`pandoc đổi được ${list.length}/${maths.length} công thức`);
      return list.map((x, k) => {
        const sz = maths[k].size;
        // gắn font + cỡ chữ cho từng m:r; chữ thường (m:nor) không được kèm m:sty/m:scr theo lược đồ OMML
        x = x.replace(/<m:r>(<m:rPr>[\s\S]*?<\/m:rPr>)?<m:t/g, (all, rpr = '') => {
          const nor = /<m:nor ?\/>/.test(rpr);
          const font = /monospace/.test(rpr) ? MONO : (nor ? SERIF : 'Cambria Math');
          if (nor) rpr = '<m:rPr><m:nor/></m:rPr>';
          return `<m:r>${rpr}<w:rPr><w:rFonts w:ascii="${font}" w:hAnsi="${font}" w:cs="${font}"/><w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr><m:t`;
        });
        // m:dPr phải theo thứ tự begChr, sepChr, endChr, grow, shp
        return x.replace(/<m:dPr>([\s\S]*?)<\/m:dPr>/g, (all, inner) => {
          const pick = (tag) => (inner.match(new RegExp(`<m:${tag}[^>]*/>`)) || [''])[0];
          return `<m:dPr>${['begChr', 'sepChr', 'endChr', 'grow', 'shp'].map(pick).join('')}</m:dPr>`;
        });
      });
    });
}

(async () => {
  const xmlMath = await omml();
  const zip = await JSZip.loadAsync(await Packer.toBuffer(doc));
  let xml = await zip.file('word/document.xml').async('string');
  let n = 0;
  xml = xml.replace(/<w:r>(?:<w:rPr>(?:(?!<\/w:rPr>).)*<\/w:rPr>)?<w:t[^>]*>@@M(\d+)@@<\/w:t><\/w:r>/g, (_, id) => { n++; return xmlMath[+id]; });
  if (n !== maths.length) throw new Error(`chỉ thay được ${n}/${maths.length} công thức`);
  if (!/xmlns:m=/.test(xml)) xml = xml.replace('<w:document ', '<w:document xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" ');
  zip.file('word/document.xml', xml);
  fs.writeFileSync(OUT, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  console.log(`Đã ghi ${OUT} (${maths.length} công thức)`);
})();
