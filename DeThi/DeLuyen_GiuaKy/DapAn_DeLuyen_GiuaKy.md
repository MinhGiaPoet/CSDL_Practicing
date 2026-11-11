# Đáp án các đề thi thử giữa kỳ (mã 201–210)

Sinh tự động bởi `nguon/taoDe.py`; mọi đáp án Phần B, C, F được tính bằng `nguon/fd.py`.
Khung đề giống đề thật mã 104 (`../NganHang_GiuaKy_MaDe104.md`). Ký hiệu: K khóa ứng viên, S siêu khóa không tối thiểu,
N không phải siêu khóa.

## Mã đề 201 — Bệnh viện

**Phần A.** 1C · 2B · 3C · 4C · 5A · 6C · 7A · 8B · 9A · 10B · 11B · 12A

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **C** $Y\subseteq X$. | Định nghĩa: vế phải nằm trong vế trái thì luôn đúng. |
| 2 | **B** bảng của thực thể phía N | Mỗi bộ phía N chỉ tham chiếu một bộ phía 1, nên khóa ngoại đặt ở phía N. |
| 3 | **C** có thể thừa bộ so với quan hệ ban đầu | Kết nối luôn chứa quan hệ ban đầu; "mất mát" là mất thông tin do sinh thêm bộ giả. |
| 4 | **C** đạt 3NF nhưng không đạt BCNF. | Khóa $AB$, $AC$; $B$ là thuộc tính khóa nên $C\to B$ không vi phạm 3NF, nhưng $C$ không là siêu khóa. |
| 5 | **A** thuộc ít nhất một khóa ứng viên. | Định nghĩa thuộc tính khóa dùng trong 2NF, 3NF. |
| 6 | **C** có thể chứa phụ thuộc không xuất hiện trong $F$ | $\pi_S(F)$ lấy từ $F^+$, ví dụ $A\to B, B\to C$ chiếu lên $AC$ được $A\to C$. |
| 7 | **A** luôn đạt 2NF. | Không thể có phụ thuộc vào một phần của khóa; phụ thuộc bắc cầu vẫn có thể có. |
| 8 | **B** $R_1\cap R_2$ là siêu khóa của ít nhất một quan hệ con | Định lý Heath. |
| 9 | **A** không thuộc khóa ứng viên nào | Bỏ $H$ khỏi một siêu khóa thì bao đóng vẫn suy ra lại được $H$. |
| 10 | **B** nếu $X\to Y$ và $WY\to Z$ thì $WX\to Z$ | Quy tắc giả bắc cầu: tăng trưởng $X\to Y$ thành $WX\to WY$ rồi bắc cầu. |
| 11 | **B** cả kết nối không mất mát và bảo toàn phụ thuộc | Mỗi phụ thuộc của phủ thành một lược đồ (bảo toàn), lược đồ chứa khóa bảo đảm không mất mát. |
| 12 | **A** $X$ là siêu khóa hoặc $A$ là thuộc tính khóa | Phương án "$X$ là siêu khóa" là điều kiện BCNF. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,AD\to C,\quad C\to A,\quad CE\to G,\quad G\to CE\,\}$. $D$ chỉ ở vế trái, $B$ không xuất hiện → mọi khóa chứa $BD$. **Khóa ứng viên: $BDG$, $ABDE$, $BCDE$.**

- B1: B1a $\{G\}^+=ACEG$ · B1b $\{BC\}^+=ABC$ · B1c $\{BDG\}^+=ABCDEG$ · B1d $\{ADE\}^+=ACDEG$
- B2: B2a ABDE: **K** · B2b BDEG: **S** · B2c ACDE: **N** · B2d BCDE: **K** · B2e BDE: **N** · B2f ABDG: **S** · B2g BDG: **K** · B2h ABCE: **N**
- B3: phủ tối thiểu = **2, 5, 6, 8, 10**. Suy diễn được nhưng thừa: 1 ($G\to CE$), 3 ($CD\to A$), 9 ($DG\to A$); không suy diễn được: 4 ($E\to G$), 7 ($A\to C$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,C\to A,\quad AB\to C\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {AC, BCD} | **Đ** | **S** |
| C1b | {AC, BD} | **S** | **S** |
| C1c | {ABC, BCD} | **Đ** | **Đ** |
| C1d | {CD, ABC} | **S** | **Đ** |

**Phần C2** (chiếu lên $ADEG$): C2a $G\to A$ **Đ** · C2b $A\to E$ **S** · C2c $ADE\to G$ **Đ** · C2d $E\to G$ **S** · C2e $G\to E$ **Đ** · C2f $D\to A$ **S** · C2g $DG\to E$ **Đ** · C2h $AE\to G$ **S**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `Thuoc(MaThuoc, TenThuoc, NhomThuoc, MaBN, NgayKe, TrangThai)` | **S**: KeDon là M:N, phải thành bảng riêng, không gộp vào Thuoc |
| D2 | `ChungChi(SoCC, NgayCap, MaBS)` | **Đ**, khóa SoCC |
| D3 | `KeDon(MaBN, MaThuoc, NgayKe, TrangThai)` | **Đ**, khóa (MaBN, MaThuoc) |
| D4 | `LoThuoc(SoLo, HanDung)` | **S**: thực thể yếu thiếu khóa MaThuoc của thực thể chủ Thuoc |
| D5 | `BenhNhan_SoDienThoai(MaBN, SoDienThoai)` | **Đ**, khóa (MaBN, SoDienThoai) |
| D6 | `Thuoc(MaThuoc, TenThuoc, NhomThuoc)` | **Đ**, khóa MaThuoc |
| D7 | `BacSi(MaBS, HoTen, ChuyenKhoa)` | **S**: thiếu khóa ngoại MaBSHuongDan của liên kết đệ quy HuongDan |
| D8 | `BenhNhan(MaBN, TenBN, NgaySinh, MaBSDieuTri)` | **Đ**, khóa MaBN |

**Phần E.** E1 = `TenBN` · E2 = `TrangThai='DANG_DUNG'` · E3 = `NhomThuoc='KHANG_SINH'` · E4 = **−** · E5 = **÷** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $D$ không xuất hiện trong $F$, $B$ chỉ ở vế trái → mọi khóa chứa $BD$. Khóa: $ABD$, $BCD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $C\to A$ ($C^+=AC$), $AB\to C$ ($AB^+=ABC$). (b) Phân rã: $AC$, $BCD$. (c) Mất: $AB\to C$.

## Mã đề 202 — Thương mại điện tử

**Phần A.** 1B · 2A · 3C · 4A · 5C · 6B · 7A · 8A · 9C · 10B · 11C · 12B

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **B** chưa kết luận được gì. | Phụ thuộc hàm là ràng buộc trên mọi thể hiện, một thể hiện không chứng minh được. |
| 2 | **A** $X$ chứa ít nhất một khóa ứng viên | Bỏ dần thuộc tính thừa khỏi $X$ sẽ được một khóa ứng viên. |
| 3 | **C** bảng mới $(K, T)$ với khóa chính $KT$ | Một thực thể có nhiều giá trị $T$ và một giá trị $T$ có thể thuộc nhiều thực thể, nên khóa là $KT$. |
| 4 | **A** hợp các phép chiếu $\pi_{R_i}(F)$ tương đương với $F$ | Điều kiện "nằm gọn" chỉ là điều kiện đủ. |
| 5 | **C** không đạt 2NF. | Khóa $AB$; $B\to D$ là phụ thuộc bộ phận. |
| 6 | **B** $F^+=G^+$. | Tương đương nghĩa là suy ra được cùng một tập phụ thuộc. |
| 7 | **A** chỉ kết nối không mất mát. | Phân rã BCNF có thể làm mất phụ thuộc. |
| 8 | **A** thuộc mọi khóa ứng viên | Không phụ thuộc nào suy ra được $H$. |
| 9 | **C** luôn đạt 3NF. | Vế phải luôn là thuộc tính khóa; BCNF thì chưa chắc (ví dụ $AB\to C, C\to B$). |
| 10 | **B** $Y\nrightarrow X$ và $Z\notin X\cup Y$ | Định nghĩa phụ thuộc bắc cầu trong slide chuẩn hóa. |
| 11 | **C** chưa kết luận được gì về bảo toàn phụ thuộc | Hai tính chất độc lập nhau. |
| 12 | **B** $X$ là siêu khóa | Chỉ cần siêu khóa, không cần tối thiểu. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,BG\to D,\quad BD\to G,\quad DE\to A,\quad A\to EG\,\}$. $B$ chỉ ở vế trái, $C$ không xuất hiện → mọi khóa chứa $BC$. **Khóa ứng viên: $ABC$, $BCDE$, $BCEG$.**

- B1: B1a $\{A\}^+=AEG$ · B1b $\{BD\}^+=BDG$ · B1c $\{ABC\}^+=ABCDEG$ · B1d $\{CDE\}^+=ACDEG$
- B2: B2a BCD: **N** · B2b ABCG: **S** · B2c BCEG: **K** · B2d ACDE: **N** · B2e ABC: **K** · B2f BDEG: **N** · B2g BCDE: **K** · B2h ABCD: **S**
- B3: phủ tối thiểu = **1, 3, 7, 8, 9**. Suy diễn được nhưng thừa: 2 ($DE\to G$), 5 ($A\to EG$), 10 ($AB\to G$); không suy diễn được: 4 ($B\to D$), 6 ($G\to A$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,AB\to C,\quad C\to B\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {ABC, ACD} | **Đ** | **Đ** |
| C1b | {BC, AD} | **S** | **S** |
| C1c | {CD, ABC} | **S** | **Đ** |
| C1d | {BC, ACD} | **Đ** | **S** |

**Phần C2** (chiếu lên $ABDE$): C2a $AB\to D$ **Đ** · C2b $D\to A$ **S** · C2c $A\to E$ **Đ** · C2d $B\to D$ **S** · C2e $DE\to A$ **Đ** · C2f $E\to A$ **S** · C2g $AD\to E$ **Đ** · C2h $AD\to B$ **S**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `NhanVien(MaNV, HoTen, Email, MaNVQuanLy)` | **Đ**, khóa MaNV |
| D2 | `NhanVien(MaNV, HoTen, Email, MaNVQuanLy, MaTB, LoaiTB)` | **S**: CapPhat là 1:N nên khóa ngoại MaNV nằm ở ThietBi; không gộp ThietBi vào NhanVien |
| D3 | `KhachHang_SoDienThoai(MaKH, SoDienThoai)` | **Đ**, khóa (MaKH, SoDienThoai) |
| D4 | `PhienBan(MaSP, SoPB, MauSac)` | **Đ**, khóa (MaSP, SoPB) |
| D5 | `KhachHang(MaKH, TenKH, DiaChi, SoDienThoai, MaNVChamSoc)` | **S**: SoDienThoai đa trị phải tách thành bảng riêng |
| D6 | `DatMua(MaKH, MaSP, NgayMua, TrangThai)` | **Đ**, khóa (MaKH, MaSP) |
| D7 | `ThietBi(MaTB, LoaiTB)` | **S**: thiếu khóa ngoại MaNV của liên kết CapPhat (1:N) |
| D8 | `SanPham(MaSP, TenSP, DanhMuc)` | **Đ**, khóa MaSP |

**Phần E.** E1 = `DiaChi` · E2 = `TrangThai='DA_GIAO'` · E3 = `DanhMuc='DIEN_TU'` · E4 = **÷** · E5 = **−** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $D$ không xuất hiện trong $F$, $A$ chỉ ở vế trái → mọi khóa chứa $AD$. Khóa: $ABD$, $ACD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $AB\to C$ ($AB^+=ABC$), $C\to B$ ($C^+=BC$). (b) Phân rã: $BC$, $ACD$. (c) Mất: $AB\to C$.

## Mã đề 203 — Đề tài nghiên cứu ở trường đại học

**Phần A.** 1C · 2C · 3B · 4C · 5A · 6B · 7B · 8C · 9A · 10B · 11A · 12A

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **C** không tập con *thực sự* nào của $K$ là siêu khóa | Phương án "không tập con nào" sai vì chính $K$ là tập con của $K$. |
| 2 | **C** có vế phải một thuộc tính, vế trái không thừa và không suy ra được từ các phụ thuộc còn lại | Ba điều kiện của phủ tối thiểu. |
| 3 | **B** đạt 2NF nhưng không đạt 3NF. | Khóa $A$ một thuộc tính nên không có phụ thuộc bộ phận; $B\to C$ bắc cầu. |
| 4 | **C** có thể thừa bộ so với quan hệ ban đầu | Kết nối luôn chứa quan hệ ban đầu; "mất mát" là mất thông tin do sinh thêm bộ giả. |
| 5 | **A** khóa của thực thể chủ hợp với khóa bộ phận | Khóa bộ phận chỉ phân biệt các thực thể yếu thuộc cùng một thực thể chủ. |
| 6 | **B** luôn đạt BCNF. | Mọi phụ thuộc không tầm thường có vế trái là khóa. |
| 7 | **B** nếu $XY\to Z$ thì $X\to Z$ | Bỏ bớt vế trái không được; hai quy tắc còn lại là bắc cầu và tách. |
| 8 | **C** $R_1\cap R_2$ là siêu khóa của ít nhất một quan hệ con | Định lý Heath. |
| 9 | **A** không thuộc khóa ứng viên nào | Bỏ $H$ khỏi một siêu khóa thì bao đóng vẫn suy ra lại được $H$. |
| 10 | **B** luôn đạt 2NF. | Không thể có phụ thuộc vào một phần của khóa; phụ thuộc bắc cầu vẫn có thể có. |
| 11 | **A** có thể chứa phụ thuộc không xuất hiện trong $F$ | $\pi_S(F)$ lấy từ $F^+$, ví dụ $A\to B, B\to C$ chiếu lên $AC$ được $A\to C$. |
| 12 | **A** cả kết nối không mất mát và bảo toàn phụ thuộc | Mỗi phụ thuộc của phủ thành một lược đồ (bảo toàn), lược đồ chứa khóa bảo đảm không mất mát. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,AD\to B,\quad AG\to E,\quad BE\to G,\quad G\to BD\,\}$. $A$ chỉ ở vế trái, $C$ không xuất hiện → mọi khóa chứa $AC$. **Khóa ứng viên: $ACG$, $ABCE$, $ACDE$.**

- B1: B1a $\{G\}^+=BDG$ · B1b $\{AD\}^+=ABD$ · B1c $\{ACG\}^+=ABCDEG$ · B1d $\{BCE\}^+=BCDEG$
- B2: B2a ABCE: **K** · B2b ACE: **N** · B2c ACEG: **S** · B2d ABCD: **N** · B2e ACG: **K** · B2f BCDE: **N** · B2g ACDE: **K** · B2h ABCG: **S**
- B3: phủ tối thiểu = **1, 4, 6, 9, 10**. Suy diễn được nhưng thừa: 2 ($EG\to B$), 3 ($G\to BD$), 7 ($AG\to B$); không suy diễn được: 5 ($B\to G$), 8 ($D\to B$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,D\to B,\quad BC\to D\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {AD, BCD} | **S** | **Đ** |
| C1b | {BD, ACD} | **Đ** | **S** |
| C1c | {BCD, ACD} | **Đ** | **Đ** |
| C1d | {BD, AC} | **S** | **S** |

**Phần C2** (chiếu lên $BDEG$): C2a $G\to B$ **Đ** · C2b $B\to G$ **S** · C2c $BE\to D$ **Đ** · C2d $D\to B$ **S** · C2e $EG\to D$ **Đ** · C2f $E\to G$ **S** · C2g $BD\to G$ **S** · C2h $BE\to G$ **Đ**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `SinhVien_KyNang(MaSV, KyNang)` | **Đ**, khóa (MaSV, KyNang) |
| D2 | `SinhVien(MaSV, TenSV, Lop, KyNang, MaGVHuongDan)` | **S**: KyNang đa trị phải tách thành bảng riêng |
| D3 | `PhongLab(MaPhong, ViTri, MaGV)` | **Đ**, khóa MaPhong |
| D4 | `ThamGia(MaSV, NgayBatDau, TrangThai)` | **S**: bảng của liên kết M:N ThamGia thiếu khóa ngoại MaDT |
| D5 | `GiangVien(MaGV, HoTen, HocVi, MaGVDanDat)` | **Đ**, khóa MaGV |
| D6 | `DeTai(MaDT, TenDT, LinhVuc, MaSV, NgayBatDau, TrangThai)` | **S**: ThamGia là M:N, phải thành bảng riêng, không gộp vào DeTai |
| D7 | `BaoCao(MaDT, SoBC, NgayNop)` | **Đ**, khóa (MaDT, SoBC) |
| D8 | `DeTai(MaDT, TenDT, LinhVuc)` | **Đ**, khóa MaDT |

**Phần E.** E1 = `Lop` · E2 = `TrangThai='DANG_LAM'` · E3 = `LinhVuc='AI'` · E4 = **−** · E5 = **÷** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $A$ không xuất hiện trong $F$, $C$ chỉ ở vế trái → mọi khóa chứa $AC$. Khóa: $ABC$, $ACD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $D\to B$ ($D^+=BD$), $BC\to D$ ($BC^+=BCD$). (b) Phân rã: $BD$, $ACD$. (c) Mất: $BC\to D$.

## Mã đề 204 — Ngân hàng

**Phần A.** 1C · 2B · 3B · 4A · 5B · 6C · 7C · 8A · 9A · 10C · 11A · 12B

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **C** $F^+=G^+$. | Tương đương nghĩa là suy ra được cùng một tập phụ thuộc. |
| 2 | **B** đạt 3NF nhưng không đạt BCNF. | Khóa $AB$, $AC$; $B$ là thuộc tính khóa nên $C\to B$ không vi phạm 3NF, nhưng $C$ không là siêu khóa. |
| 3 | **B** chưa kết luận được gì về bảo toàn phụ thuộc | Hai tính chất độc lập nhau. |
| 4 | **A** thuộc ít nhất một khóa ứng viên. | Định nghĩa thuộc tính khóa dùng trong 2NF, 3NF. |
| 5 | **B** thêm vào bảng $E$ một khóa ngoại tham chiếu chính $E$ | Như liên kết 1:N thường, khóa ngoại đặt ở phía N, mà phía N cũng chính là $E$. |
| 6 | **C** chỉ kết nối không mất mát. | Phân rã BCNF có thể làm mất phụ thuộc. |
| 7 | **C** nếu $X\to Y$ và $WY\to Z$ thì $WX\to Z$ | Quy tắc giả bắc cầu: tăng trưởng $X\to Y$ thành $WX\to WY$ rồi bắc cầu. |
| 8 | **A** luôn đạt 3NF. | Vế phải luôn là thuộc tính khóa; BCNF thì chưa chắc (ví dụ $AB\to C, C\to B$). |
| 9 | **A** $X$ chứa ít nhất một khóa ứng viên | Bỏ dần thuộc tính thừa khỏi $X$ sẽ được một khóa ứng viên. |
| 10 | **C** hợp các phép chiếu $\pi_{R_i}(F)$ tương đương với $F$ | Điều kiện "nằm gọn" chỉ là điều kiện đủ. |
| 11 | **A** chưa kết luận được gì. | Phụ thuộc hàm là ràng buộc trên mọi thể hiện, một thể hiện không chứng minh được. |
| 12 | **B** $X$ là siêu khóa hoặc $A$ là thuộc tính khóa | Phương án "$X$ là siêu khóa" là điều kiện BCNF. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,A\to B,\quad AC\to E,\quad BD\to A,\quad E\to BC\,\}$. $D$ chỉ ở vế trái, $G$ không xuất hiện → mọi khóa chứa $DG$. **Khóa ứng viên: $DEG$, $ACDG$, $BCDG$.**

- B1: B1a $\{E\}^+=BCE$ · B1b $\{AD\}^+=ABD$ · B1c $\{DEG\}^+=ABCDEG$ · B1d $\{ACG\}^+=ABCEG$
- B2: B2a ACDG: **K** · B2b CDEG: **S** · B2c ABDG: **N** · B2d DEG: **K** · B2e ACDE: **N** · B2f BCG: **N** · B2g BCDG: **K** · B2h ADEG: **S**
- B3: phủ tối thiểu = **2, 4, 6, 7, 10**. Suy diễn được nhưng thừa: 1 ($E\to BC$), 3 ($DE\to A$), 8 ($AE\to C$); không suy diễn được: 5 ($B\to A$), 9 ($C\to E$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,B\to A,\quad AD\to B\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {AB, CD} | **S** | **S** |
| C1b | {BC, ABD} | **S** | **Đ** |
| C1c | {AB, BCD} | **Đ** | **S** |
| C1d | {ABD, BCD} | **Đ** | **Đ** |

**Phần C2** (chiếu lên $ACDE$): C2a $DE\to A$ **Đ** · C2b $A\to C$ **S** · C2c $E\to C$ **Đ** · C2d $D\to A$ **S** · C2e $AC\to E$ **Đ** · C2f $AD\to E$ **S** · C2g $AE\to C$ **Đ** · C2h $C\to E$ **S**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `KyHan(SoKy, LaiSuat)` | **S**: thực thể yếu thiếu khóa MaGoi của thực thể chủ GoiDichVu |
| D2 | `KhachHang(MaKH, HoTen, CCCD, MaCNMoTai)` | **Đ**, khóa MaKH |
| D3 | `GoiDichVu(MaGoi, TenGoi, LoaiGoi)` | **Đ**, khóa MaGoi |
| D4 | `ChiNhanh(MaCN, TenCN, DiaChi, MaCNCapTren, MaATM, ViTri)` | **S**: QuanLy là 1:N nên khóa ngoại MaCN nằm ở ATM; không gộp ATM vào ChiNhanh |
| D5 | `DangKy(MaKH, MaGoi, NgayDangKy, TrangThai)` | **Đ**, khóa (MaKH, MaGoi) |
| D6 | `KhachHang_SoDienThoai(MaKH, SoDienThoai)` | **Đ**, khóa (MaKH, SoDienThoai) |
| D7 | `ATM(MaATM, ViTri, MaCN)` | **Đ**, khóa MaATM |
| D8 | `ChiNhanh(MaCN, TenCN, DiaChi)` | **S**: thiếu khóa ngoại MaCNCapTren của liên kết đệ quy TrucThuoc |

**Phần E.** E1 = `CCCD` · E2 = `TrangThai='HIEU_LUC'` · E3 = `LoaiGoi='TIET_KIEM'` · E4 = **÷** · E5 = **−** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $C$ không xuất hiện trong $F$, $D$ chỉ ở vế trái → mọi khóa chứa $CD$. Khóa: $ACD$, $BCD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $B\to A$ ($B^+=AB$), $AD\to B$ ($AD^+=ABD$). (b) Phân rã: $AB$, $BCD$. (c) Mất: $AD\to B$.

## Mã đề 205 — Kho vận

**Phần A.** 1C · 2A · 3A · 4B · 5C · 6B · 7A · 8C · 9C · 10A · 11B · 12B

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **C** không đạt 2NF. | Khóa $AB$; $B\to D$ là phụ thuộc bộ phận. |
| 2 | **A** thuộc mọi khóa ứng viên | Không phụ thuộc nào suy ra được $H$. |
| 3 | **A** $Y\nrightarrow X$ và $Z\notin X\cup Y$ | Định nghĩa phụ thuộc bắc cầu trong slide chuẩn hóa. |
| 4 | **B** $R_1\cap R_2$ là siêu khóa của ít nhất một quan hệ con | Định lý Heath. |
| 5 | **C** hợp của hai khóa ngoại | Thuộc tính riêng của liên kết không nằm trong khóa. |
| 6 | **B** $X$ là siêu khóa | Chỉ cần siêu khóa, không cần tối thiểu. |
| 7 | **A** cả kết nối không mất mát và bảo toàn phụ thuộc | Mỗi phụ thuộc của phủ thành một lược đồ (bảo toàn), lược đồ chứa khóa bảo đảm không mất mát. |
| 8 | **C** có vế phải một thuộc tính, vế trái không thừa và không suy ra được từ các phụ thuộc còn lại | Ba điều kiện của phủ tối thiểu. |
| 9 | **C** không tập con *thực sự* nào của $K$ là siêu khóa | Phương án "không tập con nào" sai vì chính $K$ là tập con của $K$. |
| 10 | **A** luôn đạt BCNF. | Mọi phụ thuộc không tầm thường có vế trái là khóa. |
| 11 | **B** có thể thừa bộ so với quan hệ ban đầu | Kết nối luôn chứa quan hệ ban đầu; "mất mát" là mất thông tin do sinh thêm bộ giả. |
| 12 | **B** $Y\subseteq X$. | Định nghĩa: vế phải nằm trong vế trái thì luôn đúng. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,A\to C,\quad BC\to A,\quad AE\to D,\quad D\to AE\,\}$. $B$ chỉ ở vế trái, $G$ không xuất hiện → mọi khóa chứa $BG$. **Khóa ứng viên: $BDG$, $ABEG$, $BCEG$.**

- B1: B1a $\{D\}^+=ACDE$ · B1b $\{AB\}^+=ABC$ · B1c $\{BDG\}^+=ABCDEG$ · B1d $\{AEG\}^+=ACDEG$
- B2: B2a BEG: **N** · B2b ABEG: **K** · B2c ABDG: **S** · B2d ACEG: **N** · B2e BDG: **K** · B2f ABCE: **N** · B2g BCDG: **S** · B2h BCEG: **K**
- B3: phủ tối thiểu = **2, 4, 6, 9, 10**. Suy diễn được nhưng thừa: 1 ($D\to AE$), 5 ($AB\to C$), 8 ($DG\to A$); không suy diễn được: 3 ($C\to A$), 7 ($E\to D$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,A\to D,\quad CD\to A\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {AD, ABC} | **Đ** | **S** |
| C1b | {ACD, ABC} | **Đ** | **Đ** |
| C1c | {AD, BC} | **S** | **S** |
| C1d | {AB, ACD} | **S** | **Đ** |

**Phần C2** (chiếu lên $BCDE$): C2a $D\to C$ **Đ** · C2b $E\to D$ **S** · C2c $BCE\to D$ **Đ** · C2d $B\to C$ **S** · C2e $D\to E$ **Đ** · C2f $CE\to D$ **S** · C2g $BD\to C$ **Đ** · C2h $C\to D$ **S**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `LuuTru(MaKho, MaMH, NgayNhap, TrangThai)` | **Đ**, khóa (MaKho, MaMH) |
| D2 | `MayQuet(MaMay, Model)` | **S**: thiếu khóa ngoại MaDPV của liên kết SuDung (1:N) |
| D3 | `DieuPhoiVien(MaDPV, HoTen, Email, MaDPVGiamSat)` | **Đ**, khóa MaDPV |
| D4 | `MatHang(MaMH, TenMH, PhanLoai, MaKho, NgayNhap, TrangThai)` | **S**: LuuTru là M:N, phải thành bảng riêng, không gộp vào MatHang |
| D5 | `LoHang(MaMH, SoLo, HanDung)` | **Đ**, khóa (MaMH, SoLo) |
| D6 | `Kho(MaKho, TenKho, DiaChi, SoDienThoai, MaDPVPhuTrach)` | **S**: SoDienThoai đa trị phải tách thành bảng riêng |
| D7 | `Kho(MaKho, TenKho, DiaChi, MaDPVPhuTrach)` | **Đ**, khóa MaKho |
| D8 | `Kho_SoDienThoai(MaKho, SoDienThoai)` | **Đ**, khóa (MaKho, SoDienThoai) |

**Phần E.** E1 = `TenKho` · E2 = `TrangThai='CON_HANG'` · E3 = `PhanLoai='DE_VO'` · E4 = **−** · E5 = **÷** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $B$ không xuất hiện trong $F$, $C$ chỉ ở vế trái → mọi khóa chứa $BC$. Khóa: $ABC$, $BCD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $A\to D$ ($A^+=AD$), $CD\to A$ ($CD^+=ACD$). (b) Phân rã: $AD$, $ABC$. (c) Mất: $CD\to A$.

## Mã đề 206 — Hàng không

**Phần A.** 1C · 2C · 3C · 4B · 5B · 6B · 7C · 8A · 9A · 10B · 11A · 12A

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **C** chưa kết luận được gì. | Phụ thuộc hàm là ràng buộc trên mọi thể hiện, một thể hiện không chứng minh được. |
| 2 | **C** $X$ là siêu khóa | Chỉ cần siêu khóa, không cần tối thiểu. |
| 3 | **C** khóa của thực thể chủ hợp với khóa bộ phận | Khóa bộ phận chỉ phân biệt các thực thể yếu thuộc cùng một thực thể chủ. |
| 4 | **B** chưa kết luận được gì về bảo toàn phụ thuộc | Hai tính chất độc lập nhau. |
| 5 | **B** thuộc mọi khóa ứng viên | Không phụ thuộc nào suy ra được $H$. |
| 6 | **B** có thể chứa phụ thuộc không xuất hiện trong $F$ | $\pi_S(F)$ lấy từ $F^+$, ví dụ $A\to B, B\to C$ chiếu lên $AC$ được $A\to C$. |
| 7 | **C** đạt 2NF nhưng không đạt 3NF. | Khóa $A$ một thuộc tính nên không có phụ thuộc bộ phận; $B\to C$ bắc cầu. |
| 8 | **A** chỉ kết nối không mất mát. | Phân rã BCNF có thể làm mất phụ thuộc. |
| 9 | **A** thuộc ít nhất một khóa ứng viên. | Định nghĩa thuộc tính khóa dùng trong 2NF, 3NF. |
| 10 | **B** luôn đạt 3NF. | Vế phải luôn là thuộc tính khóa; BCNF thì chưa chắc (ví dụ $AB\to C, C\to B$). |
| 11 | **A** nếu $XY\to Z$ thì $X\to Z$ | Bỏ bớt vế trái không được; hai quy tắc còn lại là bắc cầu và tách. |
| 12 | **A** hợp các phép chiếu $\pi_{R_i}(F)$ tương đương với $F$ | Điều kiện "nằm gọn" chỉ là điều kiện đủ. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,EG\to C,\quad BG\to A,\quad BC\to E,\quad AE\to BC\,\}$. $G$ chỉ ở vế trái, $D$ không xuất hiện → mọi khóa chứa $DG$. **Khóa ứng viên: $ADEG$, $BCDG$, $BDEG$.**

- B1: B1a $\{AE\}^+=ABCE$ · B1b $\{EG\}^+=CEG$ · B1c $\{ADEG\}^+=ABCDEG$ · B1d $\{BCG\}^+=ABCEG$
- B2: B2a ABCDG: **S** · B2b ABE: **N** · B2c ADEG: **K** · B2d BDEG: **K** · B2e ACDEG: **S** · B2f BCEG: **N** · B2g ABC: **N** · B2h BCDG: **K**
- B3: phủ tối thiểu = **4, 6, 7, 9, 10**. Suy diễn được nhưng thừa: 1 ($BDG\to A$), 2 ($ABC\to E$), 5 ($AE\to BC$); không suy diễn được: 3 ($A\to B$), 8 ($B\to E$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,B\to C,\quad CD\to B\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {BC, ABD} | **Đ** | **S** |
| C1b | {BCD, ABD} | **Đ** | **Đ** |
| C1c | {BC, AD} | **S** | **S** |
| C1d | {AB, BCD} | **S** | **Đ** |

**Phần C2** (chiếu lên $ABCE$): C2a $B\to C$ **S** · C2b $BC\to E$ **Đ** · C2c $C\to B$ **S** · C2d $BE\to C$ **S** · C2e $C\to E$ **S** · C2f $AE\to C$ **Đ** · C2g $AE\to B$ **Đ** · C2h $A\to C$ **S**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `ChuyenBay(MaCB, NgayBay, DiemDen, MaPCLaiChinh)` | **Đ**, khóa MaCB |
| D2 | `HanhLy(SoTag, CanNang)` | **S**: thực thể yếu thiếu khóa MaHK của thực thể chủ HanhKhach |
| D3 | `ChuyenBay_DichVu(MaCB, DichVu)` | **Đ**, khóa (MaCB, DichVu) |
| D4 | `GiayPhep(SoGP, NgayHetHan)` | **S**: thiếu khóa ngoại MaPC của liên kết SoHuu (1:N) |
| D5 | `PhiCong(MaPC, HoTen, BangCap, MaPCKemCap)` | **Đ**, khóa MaPC |
| D6 | `DatCho(MaCB, MaHK, NgayDat, TrangThai)` | **Đ**, khóa (MaCB, MaHK) |
| D7 | `HanhKhach(MaHK, TenHK, LoaiKhach, MaCB, NgayDat, TrangThai)` | **S**: DatCho là M:N, phải thành bảng riêng, không gộp vào HanhKhach |
| D8 | `HanhKhach(MaHK, TenHK, LoaiKhach)` | **Đ**, khóa MaHK |

**Phần E.** E1 = `DiemDen` · E2 = `TrangThai='DA_CHECKIN'` · E3 = `LoaiKhach='VIP'` · E4 = **−** · E5 = **÷** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $A$ không xuất hiện trong $F$, $D$ chỉ ở vế trái → mọi khóa chứa $AD$. Khóa: $ABD$, $ACD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $B\to C$ ($B^+=BC$), $CD\to B$ ($CD^+=BCD$). (b) Phân rã: $BC$, $ABD$. (c) Mất: $CD\to B$.

## Mã đề 207 — Câu lạc bộ bóng đá

**Phần A.** 1B · 2C · 3B · 4A · 5B · 6B · 7A · 8A · 9A · 10C · 11C · 12C

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **B** không tập con *thực sự* nào của $K$ là siêu khóa | Phương án "không tập con nào" sai vì chính $K$ là tập con của $K$. |
| 2 | **C** có thể thừa bộ so với quan hệ ban đầu | Kết nối luôn chứa quan hệ ban đầu; "mất mát" là mất thông tin do sinh thêm bộ giả. |
| 3 | **B** nếu $X\to Y$ và $WY\to Z$ thì $WX\to Z$ | Quy tắc giả bắc cầu: tăng trưởng $X\to Y$ thành $WX\to WY$ rồi bắc cầu. |
| 4 | **A** đạt 3NF nhưng không đạt BCNF. | Khóa $AB$, $AC$; $B$ là thuộc tính khóa nên $C\to B$ không vi phạm 3NF, nhưng $C$ không là siêu khóa. |
| 5 | **B** bảng của thực thể phía N | Mỗi bộ phía N chỉ tham chiếu một bộ phía 1, nên khóa ngoại đặt ở phía N. |
| 6 | **B** $R_1\cap R_2$ là siêu khóa của ít nhất một quan hệ con | Định lý Heath. |
| 7 | **A** $F^+=G^+$. | Tương đương nghĩa là suy ra được cùng một tập phụ thuộc. |
| 8 | **A** $X$ là siêu khóa hoặc $A$ là thuộc tính khóa | Phương án "$X$ là siêu khóa" là điều kiện BCNF. |
| 9 | **A** $X$ chứa ít nhất một khóa ứng viên | Bỏ dần thuộc tính thừa khỏi $X$ sẽ được một khóa ứng viên. |
| 10 | **C** $Y\nrightarrow X$ và $Z\notin X\cup Y$ | Định nghĩa phụ thuộc bắc cầu trong slide chuẩn hóa. |
| 11 | **C** luôn đạt BCNF. | Mọi phụ thuộc không tầm thường có vế trái là khóa. |
| 12 | **C** cả kết nối không mất mát và bảo toàn phụ thuộc | Mỗi phụ thuộc của phủ thành một lược đồ (bảo toàn), lược đồ chứa khóa bảo đảm không mất mát. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,BD\to C,\quad BD\to G,\quad AB\to C,\quad CG\to BD\,\}$. $A$ chỉ ở vế trái, $E$ không xuất hiện → mọi khóa chứa $AE$. **Khóa ứng viên: $ABDE$, $ABEG$, $ACEG$.**

- B1: B1a $\{AB\}^+=ABC$ · B1b $\{CG\}^+=BCDG$ · B1c $\{ABDE\}^+=ABCDEG$ · B1d $\{ACG\}^+=ABCDG$
- B2: B2a BCDG: **N** · B2b ABCG: **N** · B2c ACDEG: **S** · B2d ACEG: **K** · B2e CDEG: **N** · B2f ABEG: **K** · B2g ABCDE: **S** · B2h ABDE: **K**
- B3: phủ tối thiểu = **2, 3, 4, 7, 8**. Suy diễn được nhưng thừa: 1 ($CEG\to B$), 5 ($ACG\to D$), 6 ($CG\to BD$); không suy diễn được: 9 ($A\to C$), 10 ($D\to A$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,AC\to D,\quad D\to C\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {CD, AB} | **S** | **S** |
| C1b | {ACD, ABD} | **Đ** | **Đ** |
| C1c | {BD, ACD} | **S** | **Đ** |
| C1d | {CD, ABD} | **Đ** | **S** |

**Phần C2** (chiếu lên $BCDG$): C2a $BG\to D$ **S** · C2b $BD\to C$ **Đ** · C2c $D\to C$ **S** · C2d $CG\to D$ **Đ** · C2e $B\to G$ **S** · C2f $BD\to G$ **Đ** · C2g $CG\to B$ **Đ** · C2h $BG\to C$ **S**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `HuanLuyenVien(MaHLV, HoTen, QuocTich, MaHLVChinh, MaSan, DiaDiem)` | **S**: QuanLy là 1:N nên khóa ngoại MaHLV nằm ở SanTap; không gộp SanTap vào HuanLuyenVien |
| D2 | `BanThang(MaTD, SoThuTu, PhutGhi)` | **Đ**, khóa (MaTD, SoThuTu) |
| D3 | `SanTap(MaSan, DiaDiem, MaHLV)` | **Đ**, khóa MaSan |
| D4 | `CauThu(MaCT, TenCT, ViTri, NgonNgu, MaHLVHuanLuyen)` | **S**: NgonNgu đa trị phải tách thành bảng riêng |
| D5 | `TranDau(MaTD, NgayDau, GiaiDau)` | **Đ**, khóa MaTD |
| D6 | `ThamGia(MaCT, SoPhut, TrangThai)` | **S**: bảng của liên kết M:N ThamGia thiếu khóa ngoại MaTD |
| D7 | `ThamGia(MaCT, MaTD, SoPhut, TrangThai)` | **Đ**, khóa (MaCT, MaTD) |
| D8 | `HuanLuyenVien(MaHLV, HoTen, QuocTich, MaHLVChinh)` | **Đ**, khóa MaHLV |

**Phần E.** E1 = `ViTri` · E2 = `TrangThai='DA_RA_SAN'` · E3 = `GiaiDau='CUP_QG'` · E4 = **÷** · E5 = **−** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $B$ không xuất hiện trong $F$, $A$ chỉ ở vế trái → mọi khóa chứa $AB$. Khóa: $ABC$, $ABD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $AC\to D$ ($AC^+=ACD$), $D\to C$ ($D^+=CD$). (b) Phân rã: $CD$, $ABD$. (c) Mất: $AC\to D$.

## Mã đề 208 — Chuỗi khách sạn

**Phần A.** 1C · 2A · 3A · 4C · 5B · 6B · 7B · 8C · 9A · 10A · 11C · 12B

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **C** $Y\subseteq X$. | Định nghĩa: vế phải nằm trong vế trái thì luôn đúng. |
| 2 | **A** không đạt 2NF. | Khóa $AB$; $B\to D$ là phụ thuộc bộ phận. |
| 3 | **A** không thuộc khóa ứng viên nào | Bỏ $H$ khỏi một siêu khóa thì bao đóng vẫn suy ra lại được $H$. |
| 4 | **C** hợp các phép chiếu $\pi_{R_i}(F)$ tương đương với $F$ | Điều kiện "nằm gọn" chỉ là điều kiện đủ. |
| 5 | **B** thêm vào bảng $E$ một khóa ngoại tham chiếu chính $E$ | Như liên kết 1:N thường, khóa ngoại đặt ở phía N, mà phía N cũng chính là $E$. |
| 6 | **B** có vế phải một thuộc tính, vế trái không thừa và không suy ra được từ các phụ thuộc còn lại | Ba điều kiện của phủ tối thiểu. |
| 7 | **B** luôn đạt 2NF. | Không thể có phụ thuộc vào một phần của khóa; phụ thuộc bắc cầu vẫn có thể có. |
| 8 | **C** chỉ kết nối không mất mát. | Phân rã BCNF có thể làm mất phụ thuộc. |
| 9 | **A** thuộc mọi khóa ứng viên | Không phụ thuộc nào suy ra được $H$. |
| 10 | **A** chưa kết luận được gì. | Phụ thuộc hàm là ràng buộc trên mọi thể hiện, một thể hiện không chứng minh được. |
| 11 | **C** có thể thừa bộ so với quan hệ ban đầu | Kết nối luôn chứa quan hệ ban đầu; "mất mát" là mất thông tin do sinh thêm bộ giả. |
| 12 | **B** đạt 2NF nhưng không đạt 3NF. | Khóa $A$ một thuộc tính nên không có phụ thuộc bộ phận; $B\to C$ bắc cầu. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,AG\to C,\quad AG\to B,\quad CE\to G,\quad BC\to AG\,\}$. $E$ chỉ ở vế trái, $D$ không xuất hiện → mọi khóa chứa $DE$. **Khóa ứng viên: $ACDE$, $ADEG$, $BCDE$.**

- B1: B1a $\{AG\}^+=ABCG$ · B1b $\{CE\}^+=CEG$ · B1c $\{ACDE\}^+=ABCDEG$ · B1d $\{AEG\}^+=ABCEG$
- B2: B2a CDEG: **N** · B2b BCDE: **K** · B2c ACDE: **K** · B2d CDE: **N** · B2e ADEG: **K** · B2f ABC: **N** · B2g ABCDE: **S** · B2h ACDEG: **S**
- B3: phủ tối thiểu = **1, 3, 5, 6, 7**. Suy diễn được nhưng thừa: 4 ($ADG\to B$), 8 ($BC\to AG$), 10 ($ABC\to G$); không suy diễn được: 2 ($B\to A$), 9 ($A\to E$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,A\to C,\quad BC\to A\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {AD, ABC} | **S** | **Đ** |
| C1b | {AC, BD} | **S** | **S** |
| C1c | {ABC, ABD} | **Đ** | **Đ** |
| C1d | {AC, ABD} | **Đ** | **S** |

**Phần C2** (chiếu lên $ABCG$): C2a $AG\to C$ **Đ** · C2b $BC\to G$ **Đ** · C2c $CG\to A$ **S** · C2d $B\to C$ **S** · C2e $AG\to B$ **Đ** · C2f $G\to A$ **S** · C2g $G\to B$ **S** · C2h $BC\to A$ **Đ**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `KhachSan_TienIch(MaKS, TienIch)` | **Đ**, khóa (MaKS, TienIch) |
| D2 | `QuanLyKS(MaQL, HoTen, CapBac)` | **S**: thiếu khóa ngoại MaQLCapTren của liên kết đệ quy BaoCao |
| D3 | `KhachSan(MaKS, TenKS, ThanhPho, MaQLPhuTrach)` | **Đ**, khóa MaKS |
| D4 | `DichVu(MaDV, TenDV, LoaiDV)` | **Đ**, khóa MaDV |
| D5 | `KhungGio(SoKhung, GioBatDau)` | **S**: thực thể yếu thiếu khóa MaDV của thực thể chủ DichVu |
| D6 | `TheTu(MaThe, NgayCap, MaQL)` | **Đ**, khóa MaThe |
| D7 | `DichVu(MaDV, TenDV, LoaiDV, MaKS, GiaBan, TrangThai)` | **S**: CungCap là M:N, phải thành bảng riêng, không gộp vào DichVu |
| D8 | `KhungGio(MaDV, SoKhung, GioBatDau)` | **Đ**, khóa (MaDV, SoKhung) |

**Phần E.** E1 = `ThanhPho` · E2 = `TrangThai='DANG_MO'` · E3 = `LoaiDV='SPA'` · E4 = **−** · E5 = **÷** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $D$ không xuất hiện trong $F$, $B$ chỉ ở vế trái → mọi khóa chứa $BD$. Khóa: $ABD$, $BCD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $A\to C$ ($A^+=AC$), $BC\to A$ ($BC^+=ABC$). (b) Phân rã: $AC$, $ABD$. (c) Mất: $BC\to A$.

## Mã đề 209 — Công ty phần mềm

**Phần A.** 1C · 2A · 3B · 4B · 5A · 6B · 7C · 8B · 9A · 10A · 11C · 12C

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **C** luôn đạt 3NF. | Vế phải luôn là thuộc tính khóa; BCNF thì chưa chắc (ví dụ $AB\to C, C\to B$). |
| 2 | **A** nếu $XY\to Z$ thì $X\to Z$ | Bỏ bớt vế trái không được; hai quy tắc còn lại là bắc cầu và tách. |
| 3 | **B** chưa kết luận được gì về bảo toàn phụ thuộc | Hai tính chất độc lập nhau. |
| 4 | **B** thuộc ít nhất một khóa ứng viên. | Định nghĩa thuộc tính khóa dùng trong 2NF, 3NF. |
| 5 | **A** bảng mới $(K, T)$ với khóa chính $KT$ | Một thực thể có nhiều giá trị $T$ và một giá trị $T$ có thể thuộc nhiều thực thể, nên khóa là $KT$. |
| 6 | **B** $X$ là siêu khóa | Chỉ cần siêu khóa, không cần tối thiểu. |
| 7 | **C** có thể chứa phụ thuộc không xuất hiện trong $F$ | $\pi_S(F)$ lấy từ $F^+$, ví dụ $A\to B, B\to C$ chiếu lên $AC$ được $A\to C$. |
| 8 | **B** $R_1\cap R_2$ là siêu khóa của ít nhất một quan hệ con | Định lý Heath. |
| 9 | **A** không tập con *thực sự* nào của $K$ là siêu khóa | Phương án "không tập con nào" sai vì chính $K$ là tập con của $K$. |
| 10 | **A** đạt 3NF nhưng không đạt BCNF. | Khóa $AB$, $AC$; $B$ là thuộc tính khóa nên $C\to B$ không vi phạm 3NF, nhưng $C$ không là siêu khóa. |
| 11 | **C** $F^+=G^+$. | Tương đương nghĩa là suy ra được cùng một tập phụ thuộc. |
| 12 | **C** cả kết nối không mất mát và bảo toàn phụ thuộc | Mỗi phụ thuộc của phủ thành một lược đồ (bảo toàn), lược đồ chứa khóa bảo đảm không mất mát. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,AD\to E,\quad AB\to E,\quad AD\to C,\quad CE\to AD\,\}$. $B$ chỉ ở vế trái, $G$ không xuất hiện → mọi khóa chứa $BG$. **Khóa ứng viên: $ABCG$, $ABDG$, $BCEG$.**

- B1: B1a $\{AB\}^+=ABE$ · B1b $\{CE\}^+=ACDE$ · B1c $\{ABCG\}^+=ABCDEG$ · B1d $\{ADG\}^+=ACDEG$
- B2: B2a ABDG: **K** · B2b ABDEG: **S** · B2c ABCEG: **S** · B2d ABDE: **N** · B2e ABCG: **K** · B2f BCEG: **K** · B2g CDE: **N** · B2h ACDG: **N**
- B3: phủ tối thiểu = **4, 6, 7, 8, 9**. Suy diễn được nhưng thừa: 3 ($CE\to AD$), 5 ($ACE\to D$), 10 ($CDE\to A$); không suy diễn được: 1 ($D\to B$), 2 ($C\to E$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,D\to A,\quad AB\to D\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {AD, BC} | **S** | **S** |
| C1b | {ABD, BCD} | **Đ** | **Đ** |
| C1c | {CD, ABD} | **S** | **Đ** |
| C1d | {AD, BCD} | **Đ** | **S** |

**Phần C2** (chiếu lên $ACDE$): C2a $C\to D$ **S** · C2b $D\to C$ **S** · C2c $A\to C$ **S** · C2d $CE\to A$ **Đ** · C2e $AD\to E$ **Đ** · C2f $C\to E$ **S** · C2g $AD\to C$ **Đ** · C2h $CE\to D$ **Đ**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `TrienKhai(MaDA, MaMC, NgayTrienKhai, TrangThai)` | **Đ**, khóa (MaDA, MaMC) |
| D2 | `DuAn(MaDA, TenDA, NganSach, CongNghe, MaKSSoHuu)` | **S**: CongNghe đa trị phải tách thành bảng riêng |
| D3 | `KySu(MaKS, HoTen, Email, MaKSMentor)` | **Đ**, khóa MaKS |
| D4 | `Laptop(MaLT, CauHinh)` | **S**: thiếu khóa ngoại MaKS của liên kết CapPhat (1:N) |
| D5 | `DuAn_CongNghe(MaDA, CongNghe)` | **Đ**, khóa (MaDA, CongNghe) |
| D6 | `NhatKyLoi(MaMC, SoLoi, MucDo)` | **Đ**, khóa (MaMC, SoLoi) |
| D7 | `KySu(MaKS, HoTen, Email, MaKSMentor, MaLT, CauHinh)` | **S**: CapPhat là 1:N nên khóa ngoại MaKS nằm ở Laptop; không gộp Laptop vào KySu |
| D8 | `DuAn(MaDA, TenDA, NganSach, MaKSSoHuu)` | **Đ**, khóa MaDA |

**Phần E.** E1 = `NganSach` · E2 = `TrangThai='DANG_CHAY'` · E3 = `MoiTruong='PRODUCTION'` · E4 = **÷** · E5 = **−** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $C$ không xuất hiện trong $F$, $B$ chỉ ở vế trái → mọi khóa chứa $BC$. Khóa: $ABC$, $BCD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $D\to A$ ($D^+=AD$), $AB\to D$ ($AB^+=ABD$). (b) Phân rã: $AD$, $BCD$. (c) Mất: $AB\to D$.

## Mã đề 210 — Thư viện

**Phần A.** 1B · 2A · 3C · 4B · 5A · 6C · 7B · 8C · 9A · 10C · 11A · 12B

| Câu | Đáp án | Lý do |
|---|---|---|
| 1 | **B** chỉ kết nối không mất mát. | Phân rã BCNF có thể làm mất phụ thuộc. |
| 2 | **A** $X$ chứa ít nhất một khóa ứng viên | Bỏ dần thuộc tính thừa khỏi $X$ sẽ được một khóa ứng viên. |
| 3 | **C** $X$ là siêu khóa hoặc $A$ là thuộc tính khóa | Phương án "$X$ là siêu khóa" là điều kiện BCNF. |
| 4 | **B** $Y\nrightarrow X$ và $Z\notin X\cup Y$ | Định nghĩa phụ thuộc bắc cầu trong slide chuẩn hóa. |
| 5 | **A** hợp của hai khóa ngoại | Thuộc tính riêng của liên kết không nằm trong khóa. |
| 6 | **C** hợp các phép chiếu $\pi_{R_i}(F)$ tương đương với $F$ | Điều kiện "nằm gọn" chỉ là điều kiện đủ. |
| 7 | **B** luôn đạt BCNF. | Mọi phụ thuộc không tầm thường có vế trái là khóa. |
| 8 | **C** nếu $X\to Y$ và $WY\to Z$ thì $WX\to Z$ | Quy tắc giả bắc cầu: tăng trưởng $X\to Y$ thành $WX\to WY$ rồi bắc cầu. |
| 9 | **A** không thuộc khóa ứng viên nào | Bỏ $H$ khỏi một siêu khóa thì bao đóng vẫn suy ra lại được $H$. |
| 10 | **C** chưa kết luận được gì về bảo toàn phụ thuộc | Hai tính chất độc lập nhau. |
| 11 | **A** có vế phải một thuộc tính, vế trái không thừa và không suy ra được từ các phụ thuộc còn lại | Ba điều kiện của phủ tối thiểu. |
| 12 | **B** luôn đạt 2NF. | Không thể có phụ thuộc vào một phần của khóa; phụ thuộc bắc cầu vẫn có thể có. |

**Phần B.** $R(A,B,C,D,E,G)$, $F=\{\,AD\to E,\quad EG\to C,\quad AC\to D,\quad CD\to EG\,\}$. $A$ chỉ ở vế trái, $B$ không xuất hiện → mọi khóa chứa $AB$. **Khóa ứng viên: $ABC$, $ABDG$, $ABEG$.**

- B1: B1a $\{AD\}^+=ADE$ · B1b $\{EG\}^+=CEG$ · B1c $\{ABC\}^+=ABCDEG$ · B1d $\{ADG\}^+=ACDEG$
- B2: B2a ABCE: **S** · B2b BCDE: **N** · B2c ABC: **K** · B2d ACE: **N** · B2e ABD: **N** · B2f ABCG: **S** · B2g ABEG: **K** · B2h ABDG: **K**
- B3: phủ tối thiểu = **1, 2, 5, 8, 9**. Suy diễn được nhưng thừa: 3 ($BCD\to G$), 4 ($ADG\to E$), 10 ($CD\to EG$); không suy diễn được: 6 ($B\to G$), 7 ($G\to C$).

**Phần C1.** $R(A,B,C,D)$, $F=\{\,C\to D,\quad BD\to C\,\}$.

| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |
|---|---|---|---|
| C1a | {AC, BCD} | **S** | **Đ** |
| C1b | {CD, AB} | **S** | **S** |
| C1c | {CD, ABC} | **Đ** | **S** |
| C1d | {BCD, ABC} | **Đ** | **Đ** |

**Phần C2** (chiếu lên $ACEG$): C2a $E\to C$ **S** · C2b $EG\to C$ **Đ** · C2c $AC\to G$ **Đ** · C2d $AG\to C$ **S** · C2e $C\to G$ **S** · C2f $AG\to E$ **S** · C2g $C\to A$ **S** · C2h $AC\to E$ **Đ**

**Phần D.**

| Ô | Quan hệ | Đáp án |
|---|---|---|
| D1 | `MayTinh(MaMT, ViTri, MaTT)` | **Đ**, khóa MaMT |
| D2 | `Muon(MaDG, NgayMuon, TrangThai)` | **S**: bảng của liên kết M:N Muon thiếu khóa ngoại MaSach |
| D3 | `Sach(MaSach, TenSach, TheLoai)` | **Đ**, khóa MaSach |
| D4 | `ThuThu(MaTT, HoTen, CaLam)` | **S**: thiếu khóa ngoại MaTTGiamSat của liên kết đệ quy GiamSat |
| D5 | `DocGia(MaDG, TenDG, NgheNghiep, MaTTQuanLy)` | **Đ**, khóa MaDG |
| D6 | `DocGia_Email(MaDG, Email)` | **Đ**, khóa (MaDG, Email) |
| D7 | `DocGia(MaDG, TenDG, NgheNghiep, Email, MaTTQuanLy)` | **S**: Email đa trị phải tách thành bảng riêng |
| D8 | `ThuThu(MaTT, HoTen, CaLam, MaTTGiamSat)` | **Đ**, khóa MaTT |

**Phần E.** E1 = `NgheNghiep` · E2 = `TrangThai='QUA_HAN'` · E3 = `TheLoai='KHOA_HOC'` · E4 = **−** · E5 = **÷** (câu "mọi" dùng phép chia, câu "không/chưa" dùng phép hiệu).

**Phần F.** F1: $A$ không xuất hiện trong $F$, $B$ chỉ ở vế trái → mọi khóa chứa $AB$. Khóa: $ABC$, $ABD$; thuộc tính khóa: $ABCD$ (tất cả). Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.
F2: không đạt BCNF. (a) Vi phạm: $C\to D$ ($C^+=CD$), $BD\to C$ ($BD^+=BCD$). (b) Phân rã: $CD$, $ABC$. (c) Mất: $BD\to C$.
