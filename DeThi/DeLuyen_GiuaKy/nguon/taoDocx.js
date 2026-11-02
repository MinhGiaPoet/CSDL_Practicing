// Dựng bản Word cho một đề thi thử, từ dữ liệu taoDe.py sinh ra (DeLuyen.json).
//   node taoDocx.js <DeLuyen.json> <SoDoER.png> <file .docx ra>
// Bố cục giống bản Word của đề thật mã 104 (../../GiuaKy_MaDe104/nguon/taoDocx.js).
// Cần pandoc: công thức LaTeX được đổi sang Equation (OMML) của Word.
// Cú pháp đánh dấu trong chuỗi: **đậm**, *nghiêng*, `máy chữ`, ~gạch chân~, $công thức$.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
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

const [, , JSON_IN, PNG_IN, OUT] = process.argv;
const de = JSON.parse(fs.readFileSync(JSON_IN, 'utf8'));
const MA = de.made;

const SERIF = 'Times New Roman';
const MONO = 'Courier New';
const SZ = { foot: 18, small: 20, normal: 22, large: 24, Large: 29, LARGE: 34 };
const TEXT_W = 9752;
const L = AlignmentType.LEFT;
const CEN = AlignmentType.CENTER;

// ---------------------------------------------------------------- chữ và công thức
const maths = [];
function mathRun(tex, size) {
  const id = maths.length;
  // dấu + của bao đóng viết dạng chữ để mọi trình xem hiển thị đúng
  maths.push({ tex: tex.replace(/\^\+/g, '^{\\text{+}}'), size: size || SZ.normal });
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
    s instanceof Paragraph ? s : para(s, { size: o.size, bold: o.bold, align: o.align || CEN }));
  return new TableCell({
    children: ps, width: { size: w, type: WidthType.DXA }, borders: o.borders || ALL,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: o.pad ?? 30, bottom: o.pad ?? 30, left: 60, right: 60 },
  });
}
function grid(rows, widths, o = {}) {
  const total = widths.reduce((a, c) => a + c, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    alignment: CEN,
    rows: rows.map((r, ri) => new TableRow({
      height: o.height ? { value: o.height, rule: HeightRule.ATLEAST } : undefined,
      children: r.map((c, ci) => cell(c, widths[ci], {
        bold: (o.boldRow0 && ri === 0) || (o.boldCol0 && ci === 0),
        size: o.size, pad: o.pad,
        align: o.aligns ? o.aligns[ci] : CEN,
        borders: o.borders ? o.borders(ri, ci, rows.length) : ALL,
      })),
    })),
  });
}

// ---------------------------------------------------------------- khối nội dung
const H = [];
const phan = (letter, title, pts, extra = '') =>
  H.push(para(`**PHẦN ${letter}.  ${title}** *(${pts})*${extra}`, { size: SZ.large, before: 180, after: 60, keepNext: true }));
const ghichu = (s, before = 40) => H.push(para(s, { size: SZ.foot, before, after: 40 }));
const tenO = (p) => 'abcdefgh'.split('').map((x) => p + x);

// ================================================================= đề
H.push(para('Học Viện Công Nghệ Bưu Chính Viễn Thông — Khoa Trí Tuệ Nhân Tạo', { align: CEN, smallCaps: true, after: 40 }));
H.push(para('**ĐỀ THI THỬ GIỮA KỲ — CƠ SỞ DỮ LIỆU (INT1313)**', { align: CEN, size: SZ.Large, before: 20, after: 40 }));
H.push(para([...runs('Lớp tài năng ngành An toàn thông tin — '),
  new TextRun({ text: `Mã đề ${MA}`, bold: true, smallCaps: true, font: SERIF })], { align: CEN }));
H.push(para('**Thời gian: 90 phút | Không sử dụng tài liệu | Thang điểm 10**', { align: CEN }));
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

// ---- Phần A
phan('A', 'Trắc nghiệm', '1,8 điểm', ' **— 12 câu, mỗi câu 0,15**');
ghichu('Mỗi câu có ba phương án; chọn một và điền vào phiếu trả lời.', 0);
de.A.forEach((q) => {
  H.push(para(`**${q.n}.** ${q.text}`, { keepNext: true }));
  if (q.inline) {
    H.push(para(q.opts.map((t, k) => `${'ABC'[k]}. ${t}`).join('  '), { size: SZ.small, left: 460 }));
  } else {
    q.opts.forEach((t, k) => H.push(para(`${'ABC'[k]}.\t${t}`, {
      size: SZ.small, left: 700, hanging: 330, before: k === 0 ? 170 : 0,
      tabs: [{ type: TabStopType.LEFT, position: 700 }], keepNext: k < 2,
    })));
  }
});

// ---- Phần B
const B = de.B;
phan('B', 'Phụ thuộc hàm', '2,8 điểm');
H.push(para(`Cho $R(A,B,C,D,E,G)$ và $${B.F}$`, { after: 60 }));
H.push(para(`**B1. Bao đóng** *(0,8 điểm)* — tính và điền vào phiếu: ${B.B1.map((x) => `$\\{${x}\\}^+$`).join(',  ')} (lần lượt là ô B1a, B1b, B1c, B1d).`, { after: 60 }));
H.push(para('**B2. Phân loại** *(1,2 điểm)* — với mỗi tập, điền **K** (là khóa ứng viên) / **S** (là siêu khóa nhưng không tối thiểu) / **N** (không phải siêu khóa):', { after: 100 }));
H.push(grid([['Ô', ...tenO('B2')], ['Tập', ...B.B2.map((x) => `$${x}$`)]], [620, ...Array(8).fill(900)], { boldRow0: true, boldCol0: true }));
ghichu('*Tính điểm:* đúng cả 8 = 1,2; sai 1–2 ô = 0,6; sai từ 3 ô = 0.');
H.push(para('**B3. Phủ tối thiểu** *(0,8 điểm)* — khoanh vào phiếu những số thuộc phủ tối thiểu của $F$. *(Với tập $F$ này phủ tối thiểu là duy nhất.)*', { before: 60, after: 100 }));
const RULE_H = { style: BorderStyle.SINGLE, size: 8, color: '000000' };
const b3 = B.B3.map((x, k) => `${k + 1}. $${x}$`);
H.push(grid([b3.filter((_, k) => k % 2 === 0), b3.filter((_, k) => k % 2 === 1)], Array(5).fill(1400), {
  aligns: Array(5).fill(L),
  borders: (ri, ci, n) => ({ top: ri === 0 ? RULE_H : NONE, bottom: ri === n - 1 ? RULE_H : NONE, left: NONE, right: NONE }),
}));
ghichu('*Lưu ý:* trong danh sách có phụ thuộc *suy diễn được* từ $F$ nhưng *không* thuộc phủ tối thiểu, và có cả phụ thuộc không suy diễn được từ $F$. *Tính điểm:* đúng hoàn toàn = 0,8; mỗi số thừa hoặc thiếu trừ 0,2; tối thiểu 0.');

// ---- Phần C
const C1 = de.C1, C2 = de.C2;
const C1_ROWS = C1.dec.map((x, k) => [`C1${'abcd'[k]}`, `$${x}$`]);
phan('C', 'Phân rã', '2,0 điểm');
H.push(para(`**C1** *(1,2 điểm)* — Cho $R(A,B,C,D)$ và $${C1.F}$. Với mỗi phép phân rã, điền **Đ/S** cho hai câu hỏi độc lập:`, { after: 100 }));
H.push(grid([['Ô', 'Phép phân rã', 'Không mất mát?', 'Bảo toàn phụ thuộc?'], ...C1_ROWS.map((r) => [...r, '', ''])],
  [560, 2000, 2280, 2620], { boldRow0: true, aligns: [L, L, L, L] }));
ghichu('Mỗi ô 0,15 điểm (8 ô). Hai cột chấm độc lập — phải điền cả hai cột cho mỗi phép phân rã; bỏ trống tính sai.');
H.push(para(`**C2** *(0,8 điểm)* — Quay lại lược đồ $R(A,B,C,D,E,G)$ ở Phần B. Xét phép chiếu $\\pi_{${C2.S}}(F)$. Với mỗi phụ thuộc dưới đây, điền **Đ** nếu nó *suy diễn được* từ $F$ (tức thuộc $\\pi_{${C2.S}}(F)$), **S** nếu không:`, { before: 60, after: 100 }));
H.push(grid([['Ô', ...tenO('C2')], ['FD', ...C2.fds.map((x) => `$${x}$`)]], [620, ...Array(8).fill(1080)], { boldRow0: true, boldCol0: true }));
ghichu('Mỗi ô 0,1 điểm; bỏ trống tính sai.');
H.push(pageBreak());

// ---- Phần D
phan('D', 'Mô hình thực thể — liên kết', '1,2 điểm');
const png = fs.readFileSync(PNG_IN);
const pw = png.readUInt32BE(16), ph = png.readUInt32BE(20); // kích thước PNG (450 dpi)
const wpx = Math.round(pw / 450 * 96);
H.push(new Paragraph({
  alignment: CEN, spacing: { before: 60, after: 60, line: 240, lineRule: LineRuleType.AUTO },
  children: [new ImageRun({ type: 'png', data: png, transformation: { width: wpx, height: Math.round(wpx * ph / pw) },
    altText: { title: 'Sơ đồ ER', description: 'Sơ đồ thực thể liên kết Phần D', name: 'SoDoER' } })],
}));
ghichu(de.D.chuThich, 0);
H.push(para(de.D.quyUoc, { size: SZ.foot, after: 40 }));
H.push(para('Dưới đây là 8 quan hệ ứng viên. Điền **Đ** nếu quan hệ thuộc lược đồ đúng, **S** nếu không; nếu **Đ** thì ghi thêm **khóa chính**.', { after: 100 }));
const HEAVY = { style: BorderStyle.SINGLE, size: 8, color: '000000' };
const THIN = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
H.push(grid([['Ô', 'Quan hệ ứng viên'], ...de.D.rels.map((r, k) => [`D${k + 1}`, `\`${r}\``])], [620, 8250], {
  boldRow0: true, size: SZ.small, aligns: [L, L], pad: 0,
  borders: (ri, ci, n) => ({ top: ri === 0 ? HEAVY : (ri === 1 ? THIN : NONE), bottom: ri === n - 1 ? HEAVY : NONE, left: NONE, right: NONE }),
}));
ghichu('Mỗi ô đúng cả Đ/S và khóa chính = 0,15 điểm.');

// ---- Phần E
const E = de.E;
phan('E', 'Đại số quan hệ', '1,0 điểm');
H.push(para('Dùng ba quan hệ:'));
E.bang.forEach((t) => H.push(para(t, { size: SZ.small, numbering: { reference: 'cham', level: 0 } })));
const dong = (tex) => H.push(para(`$${tex}$`, { align: CEN, before: 60, after: 60 }));
H.push(para(`**E1–E3.** ${E.q123}`, { before: 40 }));
dong(E.f123);
H.push(para(`**E4.** ${E.q4}`));
dong(E.f4);
H.push(para(`**E5.** ${E.q5}`));
dong(E.f5);
ghichu('*Mỗi ô 0,2 điểm.* Ô E1–E3 điền danh sách thuộc tính hoặc điều kiện; ô E4, E5 điền *một toán tử*.', 0);

// ---- Phần F
phan('F', 'Tự luận ngắn', '1,2 điểm');
H.push(para(`Vẫn dùng $R(A,B,C,D)$ với $${de.F.F}$ ở Phần C.`, { after: 60 }));
H.push(para('**F1** *(0,6 điểm)* Chứng minh $R$ **đạt 3NF**. Yêu cầu: nêu đủ các khóa ứng viên, tập thuộc tính khóa, rồi xét từng phụ thuộc hàm. *(Tối đa 3 dòng)*', { after: 60 }));
H.push(para('**F2** *(0,6 điểm)* $R$ có đạt BCNF không? Nếu không, hãy làm đủ ba việc: **(a)** chỉ rõ các phụ thuộc vi phạm; **(b)** phân rã $R$ về BCNF và viết các lược đồ con thu được; **(c)** chỉ rõ phụ thuộc hàm nào *bị mất* sau phân rã. *(Tối đa 4 dòng)*'));
H.push(pageBreak());

// ================================================================= giấy nháp
for (let k = 0; k < 2; k++) {
  H.push(para('**GIẤY NHÁP**', { align: CEN, size: SZ.large }));
  H.push(para('*Phần viết ở đây không được chấm.*', { align: CEN, size: SZ.small }));
  H.push(pageBreak());
}

// ================================================================= phiếu trả lời
const phieuPhan = (s) => H.push(para(s, { before: 200, after: 80, keepNext: true }));
const nhan = (s) => H.push(para(s, { before: 60, after: 80, keepNext: true }));
const ROW_H = 400;
H.push(para('**PHIẾU TRẢ LỜI**', { align: CEN, size: SZ.LARGE }));
H.push(para([...runs('Đề thi thử giữa kỳ — Cơ sở dữ liệu (INT1313) — '),
  new TextRun({ text: `Mã đề ${MA}`, bold: true, smallCaps: true, font: SERIF })], { align: CEN, after: 160 }));
H.push(para('Họ và tên: \t  Mã sinh viên: \t  Lớp: \t', {
  tabs: [
    { type: TabStopType.LEFT, position: 4700, leader: 'dot' },
    { type: TabStopType.LEFT, position: 7700, leader: 'dot' },
    { type: TabStopType.RIGHT, position: TEXT_W, leader: 'dot' },
  ],
}));
H.push(rule(0, 0));
phieuPhan('**PHẦN A.  Trắc nghiệm** *(1,8 điểm) — ghi A, B hoặc C*');
H.push(grid([['Câu', ...Array.from({ length: 12 }, (_, k) => `${k + 1}`)], ['Đáp án', ...Array(12).fill('')]],
  [1100, ...Array(12).fill(640)], { boldRow0: true, boldCol0: true, height: ROW_H }));
phieuPhan('**PHẦN B.  Phụ thuộc hàm** *(2,8 điểm)*');
nhan('**B1. Bao đóng**');
H.push(grid([
  [`**B1a**  $\\{${B.B1[0]}\\}^+$`, '', `**B1b**  $\\{${B.B1[1]}\\}^+$`, ''],
  [`**B1c**  $\\{${B.B1[2]}\\}^+$`, '', `**B1d**  $\\{${B.B1[3]}\\}^+$`, ''],
], [1700, 2100, 1700, 2100], { height: ROW_H }));
nhan('**B2. Phân loại** *(ghi K / S / N)*');
H.push(grid([['Ô', ...tenO('B2')], ['Tập', ...B.B2.map((x) => `$${x}$`)], ['K/S/N', ...Array(8).fill('')]],
  [900, ...Array(8).fill(900)], { boldRow0: true, boldCol0: true, height: ROW_H }));
nhan('**B3. Phủ tối thiểu** *(khoanh tròn các số thuộc phủ tối thiểu của $F$)*');
H.push(para(Array.from({ length: 10 }, (_, k) => `${k + 1}`).join('   '), { align: CEN, size: 28, before: 80 }));
phieuPhan('**PHẦN C.  Phân rã** *(2,0 điểm) — ghi Đ hoặc S*');
nhan('**C1**');
H.push(grid([['Ô', 'Phép phân rã', 'Không mất mát?', 'Bảo toàn phụ thuộc?'], ...C1_ROWS.map((r) => [...r, '', ''])],
  [560, 2000, 2280, 2620], { boldRow0: true, aligns: [L, L, CEN, CEN], height: ROW_H }));
nhan('**C2**');
H.push(grid([['Ô', ...tenO('C2')], ['FD', ...C2.fds.map((x) => `$${x}$`)], ['Đ/S', ...Array(8).fill('')]],
  [700, ...Array(8).fill(1080)], { boldRow0: true, boldCol0: true, height: ROW_H }));
H.push(pageBreak());
phieuPhan('**PHẦN D.  Mô hình thực thể — liên kết** *(1,2 điểm)*');
H.push(grid([['Ô', 'Đ/S', 'Khóa chính (nếu Đ)'], ...Array.from({ length: 8 }, (_, k) => [`D${k + 1}`, '', ''])],
  [700, 1150, 6400], { boldRow0: true, aligns: [CEN, CEN, L], height: ROW_H }));
phieuPhan('**PHẦN E.  Đại số quan hệ** *(1,0 điểm)*');
H.push(grid([['**E1**', ''], ['**E2**', ''], ['**E3**', '']], [700, 8300], { height: ROW_H }));
H.push(para('', { after: 80 }));
H.push(grid([['**E4**', '', '**E5**', '']], [700, 1900, 700, 1900], { height: ROW_H }));
phieuPhan('**PHẦN F.  Tự luận ngắn** *(1,2 điểm)*');
const DOT = { style: BorderStyle.DOTTED, size: 4, color: '808080' };
const OUTER = { style: BorderStyle.SINGLE, size: 8, color: '000000' };
function khung(n) {
  H.push(new Table({
    width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W], alignment: CEN,
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
  title: `Đề thi thử giữa kỳ CSDL (INT1313) — Mã đề ${MA}`,
  styles: { default: { document: { run: { font: SERIF, size: SZ.normal }, paragraph: { spacing: { line: 245, lineRule: LineRuleType.AUTO } } } } },
  numbering: {
    config: [{
      reference: 'cham',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: L,
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
          children: [new TextRun({ text: `CSDL INT1313  Mã đề ${MA}\tThi thử giữa kỳ — Lớp tài năng ATTT`, size: SZ.small })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: CEN,
          children: [new TextRun({ children: ['Trang ', PageNumber.CURRENT, '/', PageNumber.TOTAL_PAGES, ` — Mã đề ${MA}`] })],
        })],
      }),
    },
    children: H,
  }],
});

// ---------------------------------------------------------------- LaTeX → OMML (qua pandoc)
async function omml() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'omml-'));
  const md = path.join(dir, 'm.md');
  fs.writeFileSync(md, maths.map((m) => `$${m.tex}$`).join('\n\n') + '\n');
  execFileSync('pandoc', [md, '-f', 'markdown', '-o', path.join(dir, 'm.docx')]);
  const xml = await (await JSZip.loadAsync(fs.readFileSync(path.join(dir, 'm.docx')))).file('word/document.xml').async('string');
  const list = xml.match(/<m:oMath>[\s\S]*?<\/m:oMath>/g) || [];
  if (list.length !== maths.length) throw new Error(`pandoc đổi được ${list.length}/${maths.length} công thức`);
  return list.map((x, k) => {
    const sz = maths[k].size;
    x = x.replace(/<m:r>(<m:rPr>[\s\S]*?<\/m:rPr>)?<m:t/g, (all, rpr = '') => {
      const nor = /<m:nor ?\/>/.test(rpr);
      const font = /monospace/.test(rpr) ? MONO : (nor ? SERIF : 'Cambria Math');
      if (nor) rpr = '<m:rPr><m:nor/></m:rPr>';
      return `<m:r>${rpr}<w:rPr><w:rFonts w:ascii="${font}" w:hAnsi="${font}" w:cs="${font}"/><w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr><m:t`;
    });
    return x.replace(/<m:dPr>([\s\S]*?)<\/m:dPr>/g, (all, inner) => {
      const pick = (tag) => (inner.match(new RegExp(`<m:${tag}[^>]*/>`)) || [''])[0];
      return `<m:dPr>${['begChr', 'sepChr', 'endChr', 'grow', 'shp'].map(pick).join('')}</m:dPr>`;
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
  zip.file('word/document.xml', xml);
  fs.writeFileSync(OUT, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  console.log(`Đã ghi ${OUT} (${maths.length} công thức)`);
})();
