# Buổi Thứ 6, 23/10/2026: phân rã BCNF, tổng hợp 3NF, chữa bài tập

Nguồn: 18 ảnh trong `Anh/`, gồm slide cô chiếu và các bảng phấn chữa bài. Ba ảnh tên `IMG_…` được chụp từ một máy khác.

Hôm nay cô chiếu **bản slide mới, 55 trang**. Đây là bản mở rộng của `BaiGiang/Chuong3_PhuThuocHam/09_ChuanHoa_CacDangChuan.pdf`
(file đó có 34 trang): slide 32–34 của file 09 là ví dụ R(A,B,C,D,E), và slide 37 của bản mới làm tiếp đúng ví dụ ấy.
**Cập nhật 29/10:** cô gửi PDF bản 50 trang, lưu ở `BaiGiang/Chuong3_PhuThuocHam/10_ChuanHoa_PhanRa_BCNF_3NF.pdf`
(slide 35–48 trùng số với bản chiếu trên lớp, nhưng không có các slide lời giải 50–53). Trước đó repo chỉ có ảnh. Ảnh chỉ chụp được các slide 36, 37, 39, 40, 44, 48, 50, 51, 53.

Quy ước giống `LoTrinhHoc.md`:
- **📄 Slide nói**: nội dung trên slide hoặc trên bảng của lớp, chép đúng ý.
- **💡 Giải thích thêm** và mọi chỗ ghi **(bổ sung)**: do Claude thêm vào. Tất cả đáp số đã được kiểm tra lại bằng chương trình tính bao đóng.

---

## 0. Ảnh nào chứa gì

| Ảnh | Nội dung |
|---|---|
| `20261023_092221.jpg` | Slide 36/55: Thuật toán phân rã BCNF |
| `20261023_093150.jpg` | Slide 37: Áp dụng phân rã BCNF cho R(A,B,C,D,E) |
| `20261023_093711.jpg`, `_093939`, `_095620` | Slide 39: Thuật toán tổng hợp 3NF (chụp 3 lần) |
| `20261023_094403.jpg` | Slide 40: Ví dụ 3NF (1), đề bài |
| `IMG_20261023_100628.jpg` | Slide 44: Ví dụ 3NF (2), kiểm tra dạng chuẩn |
| `IMG_20261023_100627.jpg`, `20261023_100117`, `_100056` | Slide 48: Bài tập 11 lược đồ (ảnh `IMG_` nét nhất; ảnh `_100056` bị cô đứng che) |
| `20261023_100913.jpg` | Bảng phấn: yêu cầu trình bày khi lên bảng chữa bài |
| `20261023_103809.jpg`, `_103814` | Bốn tấm bảng: lời giải bài 1 (bạn Ba), bài 2 (bạn Chính), bài 3 (bạn Hiếu), bài 4 (bạn Tuấn Hưng) |
| `20261023_103933.jpg` | Slide 48 và mép bảng bài 2, 3 |
| `20261023_110633.jpg` | Bảng: bài 6–7 (bị cắt mép trái) và bài 8 (bạn Thắng) |
| `IMG_20261023_111335.jpg` | Slide 50: Lời giải bài 1, phân rã BCNF |
| `20261023_104500.jpg` | Slide 51: Lời giải bài 3, bẫy "trông có vẻ vi phạm" |
| `20261023_111648.jpg` | Slide 53: Lời giải bài 11, 3NF nhưng không BCNF |

---

## 1. Thuật toán phân rã BCNF (slide 36)

### 📄 Slide nói

- **Đầu vào:** quan hệ R với tập FD F. **Đầu ra:** phân rã BCNF của R, kết nối không mất mát.
- **Phương pháp** (đệ quy trên từng quan hệ con):
  1. Tính các FD **chiếu** lên quan hệ con hiện tại, rồi tìm khóa của nó.
  2. Nếu không còn FD vi phạm: dừng, quan hệ con đã ở BCNF.
  3. Ngược lại, chọn một FD vi phạm X → Y và tách thành hai:
     - R₁ = {X}⁺ (bao đóng tính *trong* quan hệ con hiện tại)
     - R₂ = X ∪ (R \ {X}⁺)
  4. Lặp lại bước 1 cho R₁ và R₂.
- **Chú ý:**
  1. Bao đóng phải tính trong quan hệ con, không phải trong R gốc. Tập FD chiếu có thể chứa FD *không nằm* trong F ban đầu.
  2. R₁ ∩ R₂ = X và X → R₁, nên mỗi bước tách đều không mất mát. Do đó toàn bộ phân rã không mất mát.

### 💡 Giải thích thêm

- FD vi phạm X → Y nghĩa là X quyết định được một nhóm thuộc tính nhưng X không phải siêu khóa, nên nhóm đó bị lặp lại mỗi khi
  giá trị X lặp lại. Cách sửa là đưa X cùng mọi thứ X quyết định (tức X⁺) ra một bảng riêng R₁, ở đó X là khóa. Bảng còn lại
  giữ X làm cầu nối (khóa ngoại).
- Công thức dễ nhớ: **R₁ = X⁺, R₂ = R − (X⁺ − X)**. Viết kiểu này hay kiểu X ∪ (R \ X⁺) đều ra cùng một kết quả.
- Kết quả **không duy nhất**: chọn FD vi phạm khác nhau có thể ra lược đồ khác nhau, đều đúng (xem mục 2).
- (bổ sung) Quan hệ chỉ có 2 thuộc tính luôn ở BCNF. Tách đến bảng 2 cột là dừng được.

---

## 2. Ví dụ: phân rã BCNF cho R(A,B,C,D,E) (slide 37)

### 📄 Slide nói

F = {A → B, BC → E, ED → A}. Khóa: {A,C,D}, {B,C,D}, {C,D,E}. Ba khóa này đã tìm ở slide 32–34 của file 09, và ở đó kết luận
R đạt 3NF nhưng không đạt BCNF.

**Lần 1: tách theo A → B** ({A}⁺ = {A,B}):
- R₁ = {A,B}: khóa {A}, FD duy nhất A → B. **Đạt BCNF.**
- R₂ = {A} ∪ {C,D,E} = {A,C,D,E}.

**Kiểm tra R₂ = {A,C,D,E}:**
- FD chiếu: π_ACDE(F) ≡ {DE → A, **AC → E**}.
- AC → E xuất hiện dù không có trong F, vì {A,C}⁺_F = {A,B,C,E}. Phép chiếu FD sinh ra FD mới, nên phải tính chiếu, không được
  chỉ "lọc" lấy FD cũ.
- Khóa của R₂: {A,C,D} và {C,D,E}.
- DE → A: {D,E}⁺ trong R₂ = {A,D,E} ≠ R₂, nên **vi phạm BCNF**.

**Lần 2: tách R₂ theo DE → A:**
- R₂₁ = {A,D,E}: khóa {D,E}. **Đạt BCNF.**
- R₂₂ = {D,E} ∪ {C} = {C,D,E}: không có FD không tầm thường nào chiếu xuống được, khóa là cả ba thuộc tính. **Đạt BCNF.**

**Kết quả:** {R₁(A,B), R₂₁(A,D,E), R₂₂(C,D,E)}, kết nối không mất mát.

### 💡 Giải thích thêm (bổ sung)

- **Cách tính FD chiếu cho nhanh:** với mỗi tập con S của bảng con, tính S⁺ theo F gốc rồi lấy giao với bảng con.
  Ví dụ {A,C}⁺ = {A,B,C,E}, giao với ACDE được {A,C,E}, từ đó có AC → E.
- **Cái giá phải trả:** kết quả trên **mất BC → E**. Không bảng nào chứa đủ cả B, C, E, và từ A → B, DE → A không suy ra được
  BC → E. Vì R ban đầu đã ở 3NF, đây đúng là trường hợp nên "dừng ở 3NF" (ý cuối trong mục Nội dung, slide 2 của file 09).
  Nếu cần vừa 3NF vừa bảo toàn phụ thuộc thì cứ giữ nguyên R.
- Nếu ở lần 2 chọn AC → E thay vì DE → A, ta được R₂₁ = {A,C,E}, R₂₂ = {A,C,D}. Kết quả {AB, ACE, ACD} cũng BCNF và không mất
  mát, nhưng mất cả BC → E lẫn DE → A. Vậy thứ tự chọn FD vi phạm quyết định mất nhiều hay ít FD.

---

## 3. Thuật toán tổng hợp 3NF (slide 39)

### 📄 Slide nói

- **Đầu vào:** lược đồ R và tập FD F.
  **Đầu ra:** phân rã của R, mọi quan hệ ở 3NF, **không mất mát** và **bảo toàn phụ thuộc**.
- **Phương pháp:**
  1. Tìm **phủ tối thiểu** G của F (minimal cover / minimal basis).
  2. Với mỗi FD X → A trong G, tạo một quan hệ có lược đồ XA. Gộp các FD cùng vế trái: X → A₁, X → A₂ cho *một* quan hệ XA₁A₂.
  3. Nếu không lược đồ nào trong bước 2 là **siêu khóa của R**, thêm một quan hệ có lược đồ là một **khóa ứng viên** của R.
  4. (Tùy chọn) Loại bỏ mọi lược đồ là **tập con** của một lược đồ khác.
- **Chú ý bước 3:** điều kiện là "có một lược đồ Rᵢ mà {Rᵢ}⁺ = R", tức Rᵢ là siêu khóa. **Không phải** "Rᵢ chứa mọi thuộc tính
  của R". Một lược đồ 4 thuộc tính hoàn toàn có thể là siêu khóa của một quan hệ 6 thuộc tính.

### 💡 Giải thích thêm

- Mỗi FD trong phủ tối thiểu đều có một bảng chứa trọn nó, nên chắc chắn **bảo toàn phụ thuộc**.
- Bước 3 (thêm bảng chứa khóa) là thứ bảo đảm **không mất mát**. Quên bước này là lỗi rất hay gặp. Nó còn có thể làm rơi hẳn
  một thuộc tính không xuất hiện trong FD nào (thuộc tính E ở mục 5).
- Nhắc lại cách tìm phủ tối thiểu (file 08, slide 38–42):
  (a) tách vế phải thành từng thuộc tính đơn;
  (b) bỏ thuộc tính thừa ở vế trái: trong XB → A, B thừa nếu A ∈ X⁺;
  (c) bỏ FD thừa: X → A thừa nếu A ∈ X⁺ khi tính bằng các FD còn lại.
- Trước khi tổng hợp, **kiểm tra R đã 3NF chưa**. Nếu đã đạt thì không phân rã: đề slide 48 chỉ yêu cầu "nếu không đạt 3NF,
  hãy phân rã về 3NF".

---

## 4. Ví dụ 3NF (1) (slide 40)

### 📄 Slide nói (đề bài)

Xét lược đồ R(A,B,C,D,E,F) với tập phụ thuộc hàm 𝓕 = {A → BCE, B → DE, ABD → CF, AC → DE}. Tìm một phân rã 3NF của R theo 𝓕.

> **Chú ý ký hiệu:** F ở đây là *tên một thuộc tính* của R. Để tránh nhầm với tập phụ thuộc hàm, tập FD được ký hiệu là 𝓕.

### Lời giải (bổ sung, vì slide 41–43 không có ảnh)

**Khóa.** A không xuất hiện ở vế phải nào nên A thuộc mọi khóa. {A}⁺ = ABCDEF = R, nên khóa duy nhất là {A}.
Prime = {A}.

**Kiểm tra.** B → DE có {B}⁺ = {B,D,E} ≠ R, và D, E đều không phải thuộc tính khóa, nên R **vi phạm 3NF**. Cần phân rã.

**Bước 1: phủ tối thiểu.**
- (a) Tách vế phải: A→B, A→C, A→E, B→D, B→E, ABD→C, ABD→F, AC→D, AC→E.
- (b) Vì {A}⁺ = R, mọi vế trái chứa A đều rút về A: ABD→C thành A→C, ABD→F thành A→F, AC→D thành A→D, AC→E thành A→E.
  Còn lại: A→B, A→C, A→D, A→E, A→F, B→D, B→E.
- (c) A→D thừa (vì A→B, B→D). A→E thừa (vì A→B, B→E). Bỏ thêm FD nào nữa cũng mất thông tin.

  G = {A → B, A → C, A → F, B → D, B → E}.

**Bước 2: gộp cùng vế trái.** A → BCF cho R₁(A,B,C,F). B → DE cho R₂(B,D,E).

**Bước 3:** R₁ chứa khóa A, nên R₁ là siêu khóa. Không cần thêm bảng.

**Bước 4:** không lược đồ nào là tập con của lược đồ khác.

**Kết quả:** {R₁(A,B,C,F), R₂(B,D,E)}. Thực ra cả hai bảng đều đạt BCNF, vì mỗi bảng chỉ còn FD đi ra từ khóa của chính nó.
Không mất mát: R₁ ∩ R₂ = {B}, và B → DE nên {B} là siêu khóa của R₂.

---

## 5. Ví dụ 3NF (2) (slide 44)

### 📄 Slide nói

R gồm 5 thuộc tính A, B, C, D, E và F = {AB → C, C → B, A → D}. Đề bài nằm ở slide trước, không có ảnh. Số thuộc tính suy ra
từ bảng dưới: {A,B}⁺ = ABCD ≠ R, và tập prime có chứa E.

| FD | Vế trái siêu khóa? | Vế phải prime? | 3NF / BCNF |
|---|---|---|---|
| AB → C | {A,B}⁺ = ABCD ≠ R | C ∈ {A,C,E} ✓ | đạt / vi phạm |
| C → B | {C}⁺ = BC ≠ R | B ∈ {A,B,E} ✓ | đạt / vi phạm |
| A → D | {A}⁺ = AD ≠ R | D **không** prime | vi phạm / vi phạm |

- R **không đạt 3NF**, và thủ phạm duy nhất là A → D.
- **Lưu ý:** nói "AB → C vi phạm 3NF vì AB không là khóa" là **sai**. C là thuộc tính khóa nên FD này thỏa 3NF; nó chỉ vi phạm
  BCNF. Phân biệt được hai điều này chính là nội dung của bài.
- **Phủ tối thiểu:** F đã là phủ tối thiểu. Vế phải đều đơn. AB → C không rút gọn được vì {A}⁺ = AD và {B}⁺ = B. Bỏ FD nào cũng
  mất thông tin.

### 💡 Phần làm tiếp (bổ sung)

**Tìm khóa.** L = {A}, M = {B,C}, R = {D}, N = {E}. E không xuất hiện trong FD nào nên cũng phải có trong mọi khóa.
{A,E}⁺ = {A,D,E} chưa đủ. Thêm B: {A,B,E}⁺ = R. Thêm C: {A,C,E}⁺ = R.
Khóa: {A,B,E} và {A,C,E}, nên prime = {A,B,C,E}. Khớp với bảng trên.

**Tổng hợp 3NF.**
- Bước 2: AB → C cho (A,B,C). C → B cho (B,C). A → D cho (A,D).
- Bước 3: không lược đồ nào là siêu khóa (đều thiếu E), nên thêm (A,B,E). Chọn (A,C,E) cũng được.
- Bước 4: (B,C) ⊂ (A,B,C), bỏ đi.

**Kết quả:** {R₁(A,B,C), R₂(A,D), R₃(A,B,E)}.

**Nhận xét:**
- R₁(A,B,C) với AB → C, C → B đạt 3NF nhưng **không** đạt BCNF, vì C không phải siêu khóa của R₁. Vậy tổng hợp 3NF không hứa
  hẹn ra BCNF.
- Nếu quên bước 3, thuộc tính E biến mất khỏi CSDL.

---

## 6. Bảng công thức cần thuộc

| Khái niệm | Điều kiện / công thức |
|---|---|
| Bao đóng X⁺ | Bắt đầu từ X. Lặp: nếu có L → R ∈ F mà L ⊆ X⁺ thì thêm R vào X⁺. Dừng khi không thêm được gì. |
| Siêu khóa | X⁺ = R |
| Khóa ứng viên | Siêu khóa tối tiểu: bỏ bất kỳ thuộc tính nào thì không còn là siêu khóa |
| Thuộc tính khóa (prime) | Nằm trong **ít nhất một** khóa ứng viên |
| Phân nhóm L/M/R/N | L (chỉ ở vế trái) và N (không xuất hiện) có mặt trong **mọi** khóa. R (chỉ ở vế phải) **không bao giờ** nằm trong khóa. M thì phải thử. |
| 2NF | Không thuộc tính không khóa nào phụ thuộc vào một **tập con thực sự** của một khóa |
| **3NF** | Mọi FD không tầm thường X → A: **X là siêu khóa HOẶC A là thuộc tính khóa** |
| **BCNF** | Mọi FD không tầm thường X → A: **X là siêu khóa** |
| Không mất mát (tách 2 bảng) | R₁ ∩ R₂ → R₁ **hoặc** R₁ ∩ R₂ → R₂ (phần giao là siêu khóa của một bảng con) |
| Bảo toàn phụ thuộc | (bổ sung) Với mỗi X → Y trong F: tính X⁺ chỉ bằng các FD chiếu lên các bảng con, xem có chứa Y không |
| Một bước tách BCNF | Với X → Y vi phạm: R₁ = X⁺, R₂ = X ∪ (R \ X⁺) |
| Tổng hợp 3NF | Phủ tối thiểu → mỗi vế trái một bảng → thêm bảng khóa nếu chưa bảng nào là siêu khóa → bỏ bảng con |

**So sánh hai thuật toán** (bổ sung, rút từ slide 36, 39, 50, 53):

| | Phân rã BCNF | Tổng hợp 3NF |
|---|---|---|
| Kết quả | Mọi bảng ở BCNF | Mọi bảng ở 3NF (có thể chưa BCNF, như ví dụ mục 5) |
| Không mất mát | Luôn luôn | Luôn luôn (nhờ bước 3) |
| Bảo toàn phụ thuộc | **Không bảo đảm** (ví dụ mục 2, bài 11) | Luôn luôn |
| Kết quả duy nhất? | Không: phụ thuộc thứ tự chọn FD vi phạm | Không: phụ thuộc phủ tối thiểu và khóa chọn ở bước 3 |

**Quy trình làm một câu** (bổ sung, theo đúng yêu cầu slide 48):
1. Phân nhóm L/M/R/N, tìm **hết** khóa, liệt kê thuộc tính khóa và thuộc tính không khóa.
2. Với từng FD: vế trái có là siêu khóa không (BCNF)? Nếu không, vế phải có là thuộc tính khóa không (3NF)?
3. Không đạt BCNF thì phân rã BCNF. Không đạt 3NF thì tổng hợp 3NF.
4. Kiểm tra không mất mát và ghi rõ FD nào bị mất (nếu có).

---

## 7. Bài tập slide 48 và lời giải

### 📄 Đề (slide 48)

**Với mỗi lược đồ: tìm mọi khóa, xét BCNF và 3NF.** Nếu không đạt BCNF, hãy phân rã về BCNF; nếu không đạt 3NF, hãy phân rã
về 3NF.

1. R(X,Y,Z,T,V): XY → Z, Y → T, Z → V
2. R(X,Y,Z,T): X → Y, Y → Z, Z → T
3. R(A,B,C): AB → C, B → A, C → B
4. R(A,B,C,D): BD → C, AB → D, AC → B, BD → A
5. R(A,B,C,D): AD → C, CD → B, BD → C
6. R(A,B,C,D): A → C, B → A, A → D, AD → C
7. R(A,B,C,D): A → D, C → A, D → B, AC → B
8. R(X,Y,Z,T): XY → Z, ZT → X, XZ → Y, XZ → T
9. R(X,Y,Z,T): XY → Z, XY → T, XZ → T, XZ → Y
10. R(X,Y,Z,T): YT → Z, XY → T, XZ → Y, YT → X
11. R(X,Y,Z,T): YZ → X, XT → Z, ZT → Y, YT → Z

*Nhắc:* bắt đầu bằng việc tìm thuộc tính không xuất hiện ở vế phải, và tìm *hết* khóa trước khi kết luận về 3NF.

**Cô ghi trên bảng cách trình bày khi lên chữa** (ảnh `_100913`):
"Với mỗi câu, xác định: 1) khóa | khóa ứng viên | không khóa; 2) có đạt BCNF/3NF không? Giải thích ngắn gọn tại sao."

**Góc bảng ghi tóm tắt** (ảnh `_103814`): BCNF: X → Y thì X là siêu khóa. 3NF: X → Y thì X là siêu khóa hoặc Y là prime.

### Đáp số nhanh

| Bài | Khóa ứng viên | Không khóa | BCNF | 3NF | Phân rã BCNF | Phân rã 3NF | Nguồn đối chiếu |
|---|---|---|---|---|---|---|---|
| 1 | XY | Z, T, V | ✗ | ✗ | (Y,T), (Z,V), (X,Y,Z) | (X,Y,Z), (Y,T), (Z,V) | slide 50, bảng bạn Ba |
| 2 | X | Y, Z, T | ✗ | ✗ | (X,Y), (Y,Z), (Z,T) | (X,Y), (Y,Z), (Z,T) | bảng bạn Chính |
| 3 | B, C | A | ✓ | ✓ | không cần | không cần | slide 51, bảng bạn Hiếu |
| 4 | AB, AC, BD | ∅ | ✓ | ✓ | không cần | không cần | bảng bạn Tuấn Hưng |
| 5 | AD | B, C | ✗ | ✗ | (B,C,D), (A,C,D) | (A,C,D), (B,C,D) | (bổ sung) |
| 6 | B | A, C, D | ✗ | ✗ | (A,C,D), (A,B) | (A,C,D), (A,B) | (bổ sung), bảng bị cắt |
| 7 | C | A, B, D | ✗ | ✗ | (B,D), (A,D), (A,C) | (A,D), (A,C), (B,D) | bảng đọc được một phần |
| 8 | XY, XZ, ZT | ∅ | ✓ | ✓ | không cần | không cần | bảng bạn Thắng |
| 9 | XY, XZ | T | ✓ | ✓ | không cần | không cần | (bổ sung) |
| 10 | XY, XZ, YT | ∅ | ✓ | ✓ | không cần | không cần | (bổ sung) |
| 11 | XT, YT, ZT | ∅ | ✗ | ✓ | (X,Y,Z), (Y,Z,T), **mất XT → Z** | không cần (đã 3NF) | slide 53 |

### Lời giải chi tiết

#### Bài 1. R(X,Y,Z,T,V), F = {XY → Z, Y → T, Z → V}
*Slide 50 và bảng bạn Ba.*

- **Khóa.** L = {X,Y}, M = {Z}, R = {T,V}. X và Y không ở vế phải nào nên thuộc mọi khóa.
  {X,Y}⁺ = XYZTV = R, nên **khóa duy nhất {X,Y}**. Prime = {X,Y}. Không khóa = {Z,T,V}.
- **Kiểm tra:**
  - XY → Z: vế trái là khóa, **đạt** cả hai.
  - Y → T: {Y}⁺ = {Y,T} ≠ R, T không prime, **vi phạm cả 3NF lẫn BCNF**. (Đây là phụ thuộc bộ phận vì Y ⊂ khóa.)
  - Z → V: {Z}⁺ = {Z,V} ≠ R, V không prime, **vi phạm cả hai**. (Đây là bắc cầu XY → Z → V.)
- **Phân rã BCNF (slide 50):**
  - Tách theo Y → T: R₁ = {Y,T}, R₂ = {Y} ∪ {X,Z,V} = {X,Y,Z,V}.
  - Trong R₂ (F₂ = {XY → Z, Z → V}, khóa {X,Y}), Z → V vi phạm.
  - Tách tiếp: R₂ₐ = {Z,V}, R₂ᵦ = {Z} ∪ {X,Y} = {X,Y,Z}.
  - Kết quả ρ = {R(Y,T), R(Z,V), R(X,Y,Z)}, không mất mát và **bảo toàn cả ba FD**.
- **Phân rã 3NF (bảng bạn Ba):** F đã là phủ tối thiểu, cho R₁(X,Y,Z) khóa XY, R₂(Y,T) khóa Y, R₃(Z,V) khóa Z. R₁ chứa khóa XY
  nên không cần thêm bảng ở bước 3. Kết quả trùng với BCNF. Slide 50 nói: "ở đây BCNF không phải trả giá gì; thuật toán tổng
  hợp 3NF cho đúng ba lược đồ này".

#### Bài 2. R(X,Y,Z,T), F = {X → Y, Y → Z, Z → T}
*Bảng bạn Chính.*

- **Khóa.** L = {X}, M = {Y,Z}, R = {T}. {X}⁺ = XYZT = R, nên **khóa duy nhất {X}**. Prime = {X}. Không khóa = {Y,Z,T}.
- **Kiểm tra.** X → Y đạt. Y → Z và Z → T có vế trái không phải siêu khóa (vi phạm BCNF) và vế phải không phải thuộc tính khóa
  (vi phạm 3NF). Đây là chuỗi bắc cầu X → Y → Z → T.
- **Phân rã BCNF:**
  - Tách theo Y → Z: R₁ = {Y}⁺ = {Y,Z,T}, R₁' = {Y} ∪ (R − R₁) = {X,Y}.
  - R₁ vẫn vi phạm vì Z → T, nên tách tiếp: R₂ = {Z}⁺ = {Z,T}, R₂' = {Z} ∪ (R₁ − R₂) = {Y,Z}.
  - Kết quả: {(X,Y), (Y,Z), (Z,T)}.
- **Phân rã 3NF:** G = F. X → Y cho (X,Y), Y → Z cho (Y,Z), Z → T cho (Z,T). (X,Y) chứa khóa X. Không có lược đồ con.
  Kết quả {R₁(X,Y), R₂(Y,Z), R₃(Z,T)}.
- 💡 Trên bảng ghi "B3: loại bỏ tập con trùng lặp". Theo slide 39 đó là **bước 4**. Bước 3 (kiểm tra có bảng chứa khóa) nên
  viết ra một dòng: "R₁(X,Y) chứa khóa X nên không cần thêm bảng".

#### Bài 3. R(A,B,C), F = {AB → C, B → A, C → B}
*Slide 51 "bẫy trông có vẻ vi phạm" và bảng bạn Hiếu.*

- **Bước 1: tính bao đóng cho cẩn thận.** Mọi thuộc tính đều thuộc nhóm M.
  - {B}⁺: B →(B→A) AB →(AB→C) ABC = R, nên B là khóa.
  - {C}⁺: C →(C→B) BC →(B→A) ABC = R, nên C là khóa.
  - {A}⁺ = {A}, nên A không là khóa.
  - **Khóa: {B} và {C}.** Prime = {B,C}. Không khóa = {A}.
- **Bước 2: kiểm tra BCNF.**
  - AB → C: {A,B}⁺ = R (vì đã chứa B), nên vế trái là siêu khóa. **Đạt.**
  - B → A: B là khóa. **Đạt.**
  - C → B: C là khóa. **Đạt.**
- **Kết luận: R đã ở BCNF** (nên cũng ở 3NF), không phân rã gì cả.
- **Hai sai lầm hay gặp** (slide 51):
  1. Tính {B}⁺ = {B}, tức quên mất B → A có trong F.
  2. Thấy AB không phải khóa *ứng viên* rồi kết luận vi phạm. Điều kiện BCNF là **siêu khóa**, không phải khóa tối tiểu.
     AB là siêu khóa vì nó chứa khóa B.

#### Bài 4. R(A,B,C,D), F = {BD → C, AB → D, AC → B, BD → A}
*Bảng bạn Tuấn Hưng.*

- **Khóa.** Mọi thuộc tính vừa ở vế trái vừa ở vế phải (nhóm M). Không thuộc tính đơn nào là khóa, vì bao đóng của mỗi thuộc
  tính chỉ là chính nó.
  - {B,D}⁺: BD → C và BD → A cho ABCD, nên là khóa.
  - {A,B}⁺: AB → D cho ABD, rồi BD → C cho ABCD, nên là khóa.
  - {A,C}⁺: AC → B cho ABC, rồi AB → D cho ABCD, nên là khóa.
  - (bổ sung) {A,D}⁺ = AD, {B,C}⁺ = BC, {C,D}⁺ = CD nên không phải khóa. Mọi bộ ba đều chứa một trong ba khóa trên, nên không
    còn khóa nào khác.
- **Khóa: {A,B}, {A,C}, {B,D}.** Prime = {A,B,C,D}. Không có thuộc tính không khóa.
- **Kết luận.** Vế trái của cả 4 FD (BD, AB, AC, BD) đều là khóa, nên **đạt BCNF** và do đó đạt 3NF. Không phân rã.

#### Bài 5. R(A,B,C,D), F = {AD → C, CD → B, BD → C} (bổ sung)

- **Khóa.** L = {A,D}, M = {B,C}. {A,D}⁺: AD → C cho ACD, rồi CD → B cho ABCD = R. Vậy **khóa duy nhất {A,D}**.
  Prime = {A,D}. Không khóa = {B,C}.
- **Kiểm tra.**
  - AD → C: đạt.
  - CD → B: {C,D}⁺ = BCD ≠ R, B không prime. **Vi phạm cả hai.**
  - BD → C: {B,D}⁺ = BCD ≠ R, C không prime. **Vi phạm cả hai.**
- **Phân rã BCNF.** Tách theo CD → B: R₁ = {C,D}⁺ = {B,C,D}, R₂ = {C,D} ∪ {A} = {A,C,D}.
  - R₁ có FD chiếu CD → B, BD → C, khóa {C,D} và {B,D}. Đạt BCNF.
  - R₂ có FD chiếu AD → C, khóa {A,D}. Đạt BCNF.
  - Kết quả {(B,C,D), (A,C,D)}, bảo toàn cả 3 FD. Nếu tách theo BD → C trước thì được {(B,C,D), (A,B,D)}, cũng đúng.
- **Phân rã 3NF.** F đã là phủ tối thiểu: mỗi thuộc tính đơn chỉ suy ra chính nó nên không rút gọn được vế trái nào, và bỏ FD
  nào cũng mất. Ba FD cho các lược đồ (A,C,D), (B,C,D), (B,C,D). Gộp lại còn {(A,C,D), (B,C,D)}. (A,C,D) chứa khóa AD.
  Kết quả trùng với BCNF.

#### Bài 6. R(A,B,C,D), F = {A → C, B → A, A → D, AD → C} (bổ sung, ảnh bảng bị cắt)

- **Khóa.** L = {B}, M = {A,D}, R = {C}. {B}⁺: B → A cho AB, rồi A → C, A → D cho ABCD = R. Vậy **khóa duy nhất {B}**.
  Prime = {B}. Không khóa = {A,C,D}.
- **Kiểm tra.**
  - B → A: đạt.
  - A → C và A → D: {A}⁺ = ACD ≠ R, vế phải không prime. **Vi phạm cả hai.**
  - AD → C: {A,D}⁺ = ACD ≠ R. **Vi phạm cả hai.**
- **Phân rã BCNF.** Tách theo A → C: R₁ = {A}⁺ = {A,C,D}, R₂ = {A} ∪ {B} = {A,B}. R₁ có khóa A (FD A → C, A → D), đạt BCNF.
  R₂ có khóa B, đạt BCNF. Kết quả {(A,C,D), (A,B)}.
- **Phân rã 3NF.** Phủ tối thiểu: AD → C thừa vì đã có A → C, nên G = {A → C, A → D, B → A}. Gộp được (A,C,D) và (A,B).
  (A,B) chứa khóa B. Kết quả {(A,C,D), (A,B)}.

#### Bài 7. R(A,B,C,D), F = {A → D, C → A, D → B, AC → B}
*Bảng đọc được một phần.*

- **Khóa.** L = {C}, M = {A,D}, R = {B}. {C}⁺: C → A cho AC, A → D cho ACD, D → B cho ABCD. Vậy **khóa duy nhất {C}**.
  Prime = {C}. Không khóa = {A,B,D}.
- **Kiểm tra.**
  - C → A và AC → B: vế trái chứa khóa C, đạt.
  - A → D: {A}⁺ = ABD ≠ R, D không prime. **Vi phạm cả hai.**
  - D → B: {D}⁺ = BD ≠ R. **Vi phạm cả hai.**
- **Phân rã BCNF.**
  - Tách theo A → D: R₁ = {A}⁺ = {A,B,D}, R₂ = {A} ∪ {C} = {A,C}.
  - R₁ (khóa A) còn D → B vi phạm, nên tách tiếp: R₁₁ = {D}⁺ = {B,D}, R₁₂ = {D} ∪ {A} = {A,D}.
  - Kết quả {(B,D), (A,D), (A,C)}.
- **Phân rã 3NF.** Phủ tối thiểu: AC → B rút gọn thành C → B (vì {C}⁺ chứa B), rồi C → B lại thừa (vì C → A → D → B).
  G = {A → D, C → A, D → B}. Lược đồ (A,D), (A,C), (B,D). (A,C) chứa khóa C. Kết quả {(A,D), (A,C), (B,D)}.
- Trên bảng đọc được: "C là khóa duy nhất", "A, B, D là các thuộc tính không khóa", A → D và D → B "vi phạm BCNF và 3NF",
  AC → B "rút gọn: C → B", "C → A có C là khóa nên thỏa mãn BCNF".

#### Bài 8. R(X,Y,Z,T), F = {XY → Z, ZT → X, XZ → Y, XZ → T}
*Bảng bạn Thắng.*

- **Khóa.** Mọi thuộc tính thuộc nhóm M.
  - {X,Y}⁺ = XYZ, rồi XZ → T cho R.
  - {Z,T}⁺ = XZT, rồi XZ → Y cho R.
  - {X,Z}⁺ = XYZT = R.
  - (bổ sung) {X,T}⁺, {Y,Z}⁺, {Y,T}⁺ chỉ là chính nó.
- **Khóa {X,Y}, {Z,T}, {X,Z}.** Thuộc tính khóa {X,Y,Z,T}. Không khóa ∅.
- **Kết luận.** Vế trái mọi FD (XY, ZT, XZ) đều là siêu khóa, nên **đạt BCNF**, do đó **đạt 3NF**.

#### Bài 9. R(X,Y,Z,T), F = {XY → Z, XY → T, XZ → T, XZ → Y} (bổ sung)

- **Khóa.** L = {X}, M = {Y,Z}, R = {T}. {X}⁺ = X. Thêm Y: {X,Y}⁺ = XYZT = R. Thêm Z: {X,Z}⁺ = XZTY = R.
  T thuộc nhóm R nên không bao giờ nằm trong khóa.
- **Khóa {X,Y}, {X,Z}.** Prime {X,Y,Z}. Không khóa {T}.
- **Kết luận.** Mọi vế trái là XY hoặc XZ, đều là khóa, nên **đạt BCNF** và 3NF. Phủ tối thiểu có XY → T là thừa, nhưng điều đó
  không ảnh hưởng kết luận.

#### Bài 10. R(X,Y,Z,T), F = {YT → Z, XY → T, XZ → Y, YT → X} (bổ sung)

- **Khóa.** Mọi thuộc tính thuộc nhóm M.
  - {Y,T}⁺ = YTZX = R.
  - {X,Y}⁺ = XYT, rồi YT → Z cho R.
  - {X,Z}⁺ = XZY, rồi XY → T cho R.
  - {X,T}⁺, {Y,Z}⁺, {Z,T}⁺ chỉ là chính nó.
- **Khóa {X,Y}, {X,Z}, {Y,T}.** Prime cả 4 thuộc tính. Không khóa ∅.
- **Kết luận.** Vế trái YT, XY, XZ đều là khóa, nên **đạt BCNF** và 3NF.

#### Bài 11. R(X,Y,Z,T), F = {YZ → X, XT → Z, ZT → Y, YT → Z}
*Slide 53 "3NF nhưng không BCNF".*

- **Khóa.** T không xuất hiện ở vế phải nào nên T thuộc mọi khóa.
  - {X,T}⁺ = XT →(XT→Z) XZT →(ZT→Y) R: khóa.
  - {Y,T}⁺ = YT →(YT→Z) YZT →(YZ→X) R: khóa.
  - {Z,T}⁺ = ZT →(ZT→Y) YZT →(YZ→X) R: khóa.
- **Prime = {X,Y,Z,T}**, tức tất cả. Không có thuộc tính không khóa nào.
- **3NF:** vế phải của mọi FD đều là thuộc tính khóa, nên **đạt ngay lập tức**.
- **BCNF:** YZ → X có {Y,Z}⁺ = {X,Y,Z} ≠ R, nên **vi phạm**. Ba FD còn lại đều có vế trái là khóa.
- **Nếu cố đi lên BCNF:** tách theo YZ → X được R₁ = {X,Y,Z}, R₂ = {Y,Z,T}. Cả hai đều ở BCNF, và phép tách không mất mát
  (R₁ ∩ R₂ = {Y,Z}, YZ → X). **Nhưng XT → Z bị mất**, vì không bảng nào chứa đồng thời X và T.
- 💡 Vì R đã ở 3NF nên theo đề **không cần** phân rã 3NF. Đây đúng là tình huống "dừng ở 3NF": muốn có BCNF thì phải hy sinh
  XT → Z.

---

## 8. Lỗi hay gặp (gom từ slide và bảng)

1. **Bỏ sót khóa**, khiến tập prime nhỏ đi và kết luận "vi phạm 3NF" bị sai (slide 26, 34 của file 09; lời nhắc slide 48).
2. **Tính bao đóng ẩu**, ví dụ ra {B}⁺ = {B} ở bài 3 (slide 51).
3. **Nhầm siêu khóa với khóa ứng viên.** AB → C ở bài 3 vẫn đạt BCNF vì AB chứa khóa B (slide 51).
4. **Kết luận vi phạm 3NF chỉ vì vế trái không là khóa**, quên xét vế phải có prime không (AB → C ở slide 44).
5. **Phân rã BCNF sai cách:** tính bao đóng trong R gốc thay vì trong quan hệ con, hoặc chỉ lọc FD cũ thay vì chiếu, nên bỏ
   sót FD mới kiểu AC → E (slide 36–37).
6. **Tổng hợp 3NF sai bước 3:** hiểu nhầm điều kiện là "chứa mọi thuộc tính" thay vì "là siêu khóa" (slide 39), hoặc quên hẳn
   bước 3.
7. **Đã đạt chuẩn vẫn phân rã.** Đề chỉ yêu cầu phân rã khi không đạt (bài 3, 4, 8, 9, 10). Bài 11 không cần phân rã 3NF.

---

## 9. Câu tự kiểm tra (bổ sung)

**Câu 1.** R(A,B,C,D), F = {A → B, B → C}. Tìm khóa, xét 3NF và BCNF, phân rã nếu cần.

<details><summary>Đáp án</summary>

L = {A}, M = {B}, R = {C}, N = {D}. Khóa duy nhất {A,D}.
A → B (A là tập con thực sự của khóa, B không prime) và B → C đều vi phạm cả hai.

- BCNF: tách theo A → B được R₁ = {A}⁺ = ABC, R₂ = AD. R₁ còn B → C vi phạm, tách tiếp thành BC và AB.
  Kết quả {AB, BC, AD}.
- 3NF: AB, BC, rồi thêm bảng khóa AD. Kết quả {AB, BC, AD}.
</details>

**Câu 2.** Đúng hay sai: "Quan hệ chỉ có hai thuộc tính luôn ở BCNF."

<details><summary>Đáp án</summary>

Đúng. FD không tầm thường chỉ có thể là A → B hoặc B → A, và khi FD đó đúng thì vế trái chính là khóa.
</details>

**Câu 3.** R(A,B,C), F = {AB → C, C → B}. R có đạt 3NF không? BCNF không? Nếu tách lên BCNF thì mất gì?

<details><summary>Đáp án</summary>

Khóa {A,B} và {A,C}, nên cả 3 thuộc tính đều prime. C → B có C không phải siêu khóa nhưng B prime, nên R đạt 3NF mà không đạt
BCNF. Tách theo C → B được (B,C) và (A,C), và mất AB → C.
</details>

**Câu 4.** Vì sao phân rã BCNF luôn không mất mát, còn tổng hợp 3NF lại cần bước 3?

<details><summary>Đáp án</summary>

Mỗi bước tách BCNF có R₁ ∩ R₂ = X và X → R₁, nên thỏa định lý kết nối không mất mát. Tổng hợp 3NF dựng các bảng từ những FD rời
nhau, không có gì bảo đảm phần giao là siêu khóa. Bảng chứa khóa đóng vai trò "trục" để ghép lại đúng R.
</details>

**Câu 5.** R(A,B,C,D), F = {A → B, C → D}. Phân rã 3NF.

<details><summary>Đáp án</summary>

Khóa {A,C}. G = F cho (A,B) và (C,D). Không bảng nào là siêu khóa, nên thêm (A,C). Kết quả {AB, CD, AC}.
</details>

---

## 10. Còn thiếu

- PDF bản 50 trang (file 10) đã có. Đối chiếu: slide 41–42 (ví dụ 3NF (1)) và 45 (ví dụ 3NF (2)) khớp với lời giải bổ sung ở
  mục 4, 5. Bản PDF không có slide lời giải bài 1, 3, 11 (slide 50, 51, 53 bản chiếu trên lớp); các bài 2, 4–10 vẫn chỉ có
  lời giải bổ sung và ảnh bảng phấn.
- Ảnh không cho biết cô có giao bài về nhà hay không, và hạn nộp là khi nào.
