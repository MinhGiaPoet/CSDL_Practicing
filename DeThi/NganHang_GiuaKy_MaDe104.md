# Đề giữa kỳ CSDL (INT1313), lớp tài năng ATTT — mã đề 104

Chép lại từ 7 ảnh chụp đề in (gửi ngày 30/10/2026), nén trong `AnhGoc/GiuaKy_MaDe104.7z`.
Ảnh `04_MaDe103_Trang3.jpg` là trang 3 của **mã đề 103** (xem mục cuối). Đáp án do Claude tự giải.

**Bản dựng lại** (chữ bôi đen được): `GiuaKy_MaDe104/DeGiuaKy_CSDL_MaDe104.pdf` và `.docx`.
Nguồn trong `GiuaKy_MaDe104/nguon/` (LaTeX cho PDF, `taoDocx.js` cho Word, `build.sh` dựng lại cả hai).

- Trang 1–3 chép đúng nội dung và kiểu chữ trên ảnh. Bản gốc có lỗi dàn trang: bảng C1, C2 và bảng Phần D đè lên
  dòng chữ ngay trên; bản dựng lại đặt bảng xuống dưới dòng chữ.
- Trang 4–7 **không có ảnh**. Theo quy định "Chỉ PHIẾU TRẢ LỜI (2 trang cuối, in 2 mặt) được chấm", trang 6–7 được dựng
  thành phiếu trả lời có đủ ô A1–F2; trang 4–5 để làm giấy nháp. Hai phần này là phỏng đoán, không phải bản của cô.

## Cấu trúc (90 phút, thang 10, không dùng tài liệu)

| Phần | Nội dung | Điểm |
|---|---|---|
| A | 12 câu trắc nghiệm 3 phương án (FD, khóa, chuẩn hóa, phân rã, 1 câu ánh xạ ER) | 1,8 (0,15/câu) |
| B | Lược đồ 6 thuộc tính: B1 bao đóng 4 tập, B2 phân loại K/S/N 8 tập, B3 khoanh phủ tối thiểu trong 10 FD | 0,8 + 1,2 + 0,8 |
| C | C1: 4 phép phân rã × (không mất mát?, bảo toàn?); C2: 8 FD Đ/S thuộc phép chiếu $\pi_{ABDE}(F)$ | 1,2 + 0,8 |
| D | Sơ đồ ER → 8 quan hệ ứng viên, điền Đ/S và khóa chính | 1,2 (0,15/ô) |
| E | Điền ô trống trong biểu thức đại số quan hệ (E1–E3 điều kiện/thuộc tính, E4–E5 một toán tử) | 1,0 (0,2/ô) |
| F | F1 chứng minh 3NF (≤ 3 dòng), F2 xét BCNF, phân rã, FD bị mất (≤ 4 dòng) | 0,6 + 0,6 |

---

## Phần A. Trắc nghiệm

| Câu | Nội dung (rút gọn) | Đáp án | Lý do |
|---|---|---|---|
| 1 | Liên kết M:N có thuộc tính riêng → khóa chính của bảng liên kết | **B** hợp hai khóa ngoại | Thuộc tính riêng không vào khóa (trừ khi đề nói lặp nhiều lần) |
| 2 | Thuật toán phân rã BCNF bảo đảm | **C** chỉ kết nối không mất mát | BCNF có thể làm mất FD |
| 3 | $Z$ phụ thuộc bắc cầu vào $X$ khi $X\to Y$, $Y\to Z$ và | **B** $Y\nrightarrow X$ và $Z\notin X\cup Y$ | Định nghĩa trong slide chuẩn hóa |
| 4 | $K$ là khóa ứng viên khi $\{K\}^+=R$ và | **C** không tập con *thực sự* nào là siêu khóa | B sai vì chính $K$ là tập con của $K$ |
| 5 | $R(A,B,C)$, $F=\{A\to B, B\to C\}$ | **A** đạt 2NF, không đạt 3NF | Khóa $A$ một thuộc tính nên không có phụ thuộc bộ phận; $B\to C$ bắc cầu |
| 6 | Quy tắc **KHÔNG** đúng | **A** $XY\to Z \Rightarrow X\to Z$ | B là bắc cầu, C là tách |
| 7 | Lược đồ chỉ có hai thuộc tính | **B** luôn đạt BCNF | Mọi FD không tầm thường có vế trái là khóa |
| 8 | Phân rã $R_1,R_2$ không mất mát khi và chỉ khi | **B** $R_1\cap R_2$ là siêu khóa của ít nhất một quan hệ con | Định lý Heath |
| 9 | Phân rã nhị phân không mất mát thì | **C** chưa kết luận được về bảo toàn phụ thuộc | Hai tính chất độc lập |
| 10 | Một thể hiện thỏa $X\to Y$ | **A** chưa kết luận được gì | FD là ràng buộc trên lược đồ, một thể hiện không chứng minh được |
| 11 | Phép chiếu $\pi_S(F)$ | **A** có thể chứa FD không có trong $F$ | $\pi_S(F)$ lấy từ $F^+$; ví dụ $A\to B, B\to C$ chiếu lên $AC$ được $A\to C$ |
| 12 | Thuộc tính $H$ không có mặt trong FD nào | **C** thuộc mọi khóa ứng viên | Không FD nào suy ra được $H$ |

## Phần B. $R(A,B,C,D,E,G)$, $F=\{AD\to B,\ B\to D,\ BG\to E,\ E\to DG\}$

Phân nhóm: $A$ chỉ ở vế trái, $C$ không xuất hiện → mọi khóa chứa $AC$; $\{AC\}^+=AC$.
Thử thêm: $ACE^+=ABCDEG$; thêm hai thuộc tính (không có $E$): $ABCG^+$ và $ACDG^+$ đều bằng $R$, $ABCD^+=ABCD$.
**Khóa ứng viên: $ACE$, $ABCG$, $ACDG$.**

**B1.** B1a $\{B\}^+=BD$ · B1b $\{AB\}^+=ABD$ · B1c $\{ACE\}^+=ABCDEG$ · B1d $\{ABC\}^+=ABCD$.

**B2.**

| B2a | B2b | B2c | B2d | B2e | B2f | B2g | B2h |
|---|---|---|---|---|---|---|---|
| ABCE: **S** | ACE: **K** | ABCD: **N** | ABCG: **K** | ABC: **N** | ABD: **N** | ACDG: **K** | ACDE: **S** |

**B3.** Tách vế phải: $AD\to B, B\to D, BG\to E, E\to D, E\to G$. Không vế trái nào rút gọn được ($A^+=A$, $D^+=D$,
$B^+=BD$, $G^+=G$), không FD nào thừa. Phủ tối thiểu = **2, 5, 7, 8, 10**.
Bẫy: 1 ($E\to DG$ chưa tách), 3 ($AB\to D$) và 4 ($AE\to B$) suy diễn được nhưng thừa; 6 ($G\to B$), 9 ($G\to C$) không suy diễn được.

## Phần C

**C1.** $R(A,B,C,D)$, $F=\{A\to B, BD\to A\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {ABD, ACD} | **Đ** ($AD^+=ABD$) | **Đ** (cả hai FD nằm trong ABD) |
| C1b | {AB, ACD} | **Đ** ($A^+=AB$) | **S** (mất $BD\to A$) |
| C1c | {AC, ABD} | **S** ($A^+=AB$, không chứa $C$ cũng không chứa $BD$) | **Đ** (cả hai FD nằm trong ABD) |
| C1d | {AB, CD} | **S** (giao rỗng) | **S** (mất $BD\to A$) |

Bốn phép phân rã phủ đủ bốn tổ hợp (Đ,Đ), (Đ,S), (S,Đ), (S,S).

**C2.** Chiếu $F$ của Phần B lên $ABDE$:

| C2a $A\to E$ | C2b $AE\to B$ | C2c $B\to D$ | C2d $B\to A$ | C2e $E\to D$ | C2f $B\to E$ | C2g $D\to A$ | C2h $AB\to D$ |
|---|---|---|---|---|---|---|---|
| **S** | **Đ** ($AE^+\ni D$, rồi $AD\to B$) | **Đ** | **S** | **Đ** | **S** | **S** | **Đ** |

## Phần D. Sơ đồ ER (an ninh mạng)

Sơ đồ: ChuyenVien(MaCV, HoTen, Email) có liên kết đệ quy TruongNhom (1:N); ChuyenVien 1 —SoHuu— N TaiKhoanPT(MaTK, TenDangNhap);
ChuyenVien 1 —PhuTrach— N MauTinHieu(MaMau, TenMau, MaHash, HanhVi đa trị); MauTinHieu M —PhatHien(NgayPhatHien, TrangThai)— N MaDoc(MaHo, DiemNguyHiem, PhanLoai);
MaDoc 1 —Co (định danh)— N ChuKy (thực thể yếu, khóa bộ phận SoHieu, NgayCapNhat).

| Ô | Quan hệ ứng viên | Đáp án |
|---|---|---|
| D1 | ChuyenVien(MaCV, HoTen, Email, MaTruongNhom, MaTK, TenDangNhap) | **S**: SoHuu là 1:N nên khóa ngoại MaCV nằm ở TaiKhoanPT, không gộp tài khoản vào ChuyenVien |
| D2 | ChuKy(SoHieu, NgayCapNhat) | **S**: thực thể yếu thiếu khóa của thực thể chủ MaHo |
| D3 | MauTinHieu_HanhVi(MaMau, HanhVi) | **Đ**, khóa (MaMau, HanhVi) |
| D4 | ChuyenVien(MaCV, HoTen, Email, MaTruongNhom) | **Đ**, khóa MaCV |
| D5 | PhatHien(MaMau, MaHo, NgayPhatHien, TrangThai) | **Đ**, khóa (MaMau, MaHo) |
| D6 | TaiKhoanPT(MaTK, TenDangNhap, MaCV) | **Đ**, khóa MaTK |
| D7 | MaDoc(MaHo, DiemNguyHiem, PhanLoai) | **Đ**, khóa MaHo |
| D8 | MauTinHieu(MaMau, TenMau, MaHash, HanhVi, MaCVPhuTrach) | **S**: HanhVi đa trị phải tách bảng riêng |

Lược đồ đúng còn có ChuKy(MaHo, SoHieu, NgayCapNhat) khóa (MaHo, SoHieu) và MauTinHieu(MaMau, TenMau, MaHash, MaCVPhuTrach).

## Phần E

- **E1** = `MaHash` · **E2** = `TrangThai='CHUA_CACH_LY'` · **E3** = `PhanLoai='APT'`
- **E4** = $-$ (phép hiệu: tất cả mẫu trừ mẫu có họ APT)
- **E5** = $\div$ (phép chia: "bị ảnh hưởng bởi **mọi** họ APT")

## Phần F (đáp án mẫu, đúng giới hạn dòng)

**F1.** $C$ không xuất hiện trong $F$, $D$ chỉ ở vế trái → mọi khóa chứa $CD$; $CD^+=CD$, $ACD^+=BCD^+=ABCD$.
Khóa: $ACD$, $BCD$; thuộc tính khóa: $A,B,C,D$ (tất cả).
$A\to B$: $B$ là thuộc tính khóa; $BD\to A$: $A$ là thuộc tính khóa → mọi FD thỏa 3NF, $R$ đạt 3NF.

**F2.** Không đạt BCNF.
(a) Vi phạm: $A\to B$ ($A^+=AB$) và $BD\to A$ ($BD^+=ABD$), vế trái đều không phải siêu khóa.
(b) Tách theo $A\to B$: $R_1(A,B)$ khóa $A$; $R_2(A,C,D)$ khóa $ACD$, không còn FD không tầm thường → cả hai đạt BCNF.
(c) Mất $BD\to A$ (B và D không cùng nằm trong lược đồ con nào).

## Bài làm bằng bút chì trên ảnh

- Phần A: khoanh 1B, 2C, 3B, 4C, 5A, 6A, 7B, 8B, 9C, 12C, đều đúng. Câu 10, 11 chưa khoanh (đáp án A, A).
- C1: điền a Đ/Đ, b Đ/S, c Đ/Đ, d S/S. **Sai ô C1c cột "Không mất mát"**: giao là $A$ mà $A^+=AB$
  không chứa $C$ (để $A\to AC$) cũng không chứa $BD$ (để $A\to ABD$), nên phân rã bị mất mát.
- Phần D: S, S, Đ, Đ, Đ, Đ, Đ, S, đúng cả 8 ô Đ/S (còn phải ghi khóa chính cho các ô Đ).

---

## Biến thể: mã đề 103 (chỉ có ảnh trang 3)

Cùng khung với mã 104, đổi bối cảnh sang **phòng máy**. Sơ đồ ER trên ảnh bị che gần hết, chỉ thấy phần dưới:
TheTruyCap (MaThe, SoSeri) nối với thực thể phía trên bằng liên kết 1–N; NhatKy là thực thể yếu (SoThuTu, ThoiDiemGhi)
qua liên kết định danh. Chú thích: khóa ngoại từ liên kết đệ quy `PhuTrach` đặt tên `MaCapTren`; từ liên kết `QuanLy` đặt tên `MaQTVQuanLy`.

**Phần D (8 quan hệ ứng viên)**

| Ô | Quan hệ | Đáp án suy theo vai trò tương ứng ở mã 104 |
|---|---|---|
| D1 | DuocPhep(MaPhong, MaQuyen, NgayCap, TrangThai) | Đ, khóa (MaPhong, MaQuyen) — như PhatHien |
| D2 | TheTruyCap(MaThe, SoSeri, MaQTV) | Đ, khóa MaThe — như TaiKhoanPT |
| D3 | QuanTriVien(MaQTV, HoTen, Email, MaCapTren) | Đ, khóa MaQTV — như ChuyenVien |
| D4 | QuyenHan(MaQuyen, MucUuTien, LoaiQuyen) | Đ, khóa MaQuyen — như MaDoc |
| D5 | PhongMay(MaPhong, TenPhong, ViTri, CamBien, MaQTVQuanLy) | S, CamBien đa trị |
| D6 | NhatKy(SoThuTu, ThoiDiemGhi) | S, thực thể yếu thiếu khóa thực thể chủ |
| D7 | QuanTriVien(MaQTV, HoTen, Email, MaCapTren, MaThe, SoSeri) | S, gộp thẻ (phía N) vào quản trị viên |
| D8 | PhongMay_CamBien(MaPhong, CamBien) | Đ, khóa (MaPhong, CamBien) |

Vì không thấy đủ sơ đồ, cột đáp án là suy luận theo cấu trúc giống hệt mã 104; cần đối chiếu sơ đồ thật nếu có.

**Phần E.** Quan hệ: PhongMay(<u>MaPhong</u>, …, ViTri), QuyenHan(<u>MaQuyen</u>, …, LoaiQuyen), DuocPhep(<u>*MaPhong*</u>, <u>*MaQuyen*</u>, TrangThai).
- E1–E3: ViTri của phòng máy có ít nhất một quyền hạn mức 'TOAN_QUYEN' ở trạng thái 'CHUA_THU_HOI':
  $\pi_{E1}(\text{PhongMay} \bowtie (\sigma_{E2}(\text{DuocPhep}) \bowtie \sigma_{E3}(\text{QuyenHan})))$
  → E1 = `ViTri`, E2 = `TrangThai='CHUA_THU_HOI'`, E3 = `LoaiQuyen='TOAN_QUYEN'`.
- E4: mã phòng máy **không** có quyền hạn nào mức 'TOAN_QUYEN' → $-$.
- E5: mã phòng máy bị ảnh hưởng bởi **mọi** quyền hạn mức 'TOAN_QUYEN' → $\div$.

**Phần F.** $R(A,B,C,D)$, $F=\{A\to B,\ BC\to A\}$ (mã 104 là $BD\to A$).
Khóa: $ACD$, $BCD$ ($D$ không xuất hiện, $C$ chỉ ở vế trái); mọi thuộc tính là thuộc tính khóa → đạt 3NF.
Không đạt BCNF: $A\to B$ và $BC\to A$ đều vi phạm; tách được $R_1(A,B)$, $R_2(A,C,D)$; mất $BC\to A$.
