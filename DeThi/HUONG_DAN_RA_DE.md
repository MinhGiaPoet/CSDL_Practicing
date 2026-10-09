# Hướng dẫn ra đề luyện CSDL (rút ra từ 2 đề thật)

Tài liệu này mô tả cách giảng viên ra đề trắc nghiệm môn Cơ sở dữ liệu (PTIT, hệ thống `db.ptit.edu.vn`),
rút ra từ hai bài kiểm tra thật:

| Bài | Tên trên hệ thống | Số câu | Nguồn ảnh | Ngân hàng chép lại |
|---|---|---|---|---|
| Test 1 | "Chương 1 và Mô hình EER" | 55 | `AnhGoc/Test1_EER_FirstTestCSDL.7z` (32 ảnh) | `NganHang_Test1_EER.md` |
| Test 2 (9/10/2026) | "RA - ATTT" | 74, khoảng 70 phút | `AnhGoc/Test2_RA_2026-10-09.rar` (75 ảnh) | `NganHang_Test2_RA.md` |

Khi được nhờ tạo đề luyện: đọc file này, xem vài câu mẫu trong ngân hàng, rồi ra đề theo đúng các quy tắc dưới đây.

---

## 1. Hình thức chung

- **Trắc nghiệm, mỗi câu đúng 1 đáp án**, có 4 lựa chọn A–D. Nhãn câu: "Câu hỏi N · Một đáp án".
- Một số câu viết **song ngữ**: câu tiếng Anh trước, bản dịch tiếng Việt trong ngoặc
  ("Given … Which expression is correct? (Cho … Biểu thức đúng là:)").
- Thứ tự câu xáo trộn, không xếp theo chủ đề. Có câu **gần như lặp lại** với tên cột hoặc giá trị khác
  (ví dụ Test 2: câu 28 ≡ câu 71, câu 33 ≡ câu 66, câu 63 ≡ câu 70, câu 17 ≡ câu 69).
- Đáp án đúng **phân bố đều** A/B/C/D, không có quy luật vị trí.

## 2. Cách viết đề bài (Test RA)

### 2.1. Khung một câu "viết biểu thức"
```
TABLE1(cột1, cột2, …): Chứa thông tin …
TABLE2(…): Chứa thông tin …
TABLE3(…): Chứa thông tin … X tham chiếu tới X của TABLE1, Y tham chiếu tới Y của TABLE2.
[(Giả sử Title là duy nhất) / (Giả sử Name có thể trùng nhau, không phải khóa)]
Lấy <cột> của <đối tượng> <điều kiện bằng lời>.
```
- Luôn liệt kê lược đồ trước, câu cuối mới là yêu cầu.
- Câu ràng buộc khóa ngoại viết đúng mẫu "SID tham chiếu tới SID của STUDENT, CID tham chiếu tới CID của COURSE".
- **Giả thiết duy nhất** ("Giả sử Title/ClubName là duy nhất") được thêm khi đáp án đúng chọn hoặc lọc theo cột đó.
- **Từ khóa logic viết HOA** để nhấn mạnh: KHÔNG, CHỈ, CẢ HAI, ĐÚNG 1, HOẶC.
- Giá trị hằng trong nháy đơn: `'CS'`, `'2025_Fall'`, `'2025_Spring'`, `'Database'`, `'AI'`, `'I01'`, `'C001'`.
- Phép so sánh "khác" viết là `<>` (đôi khi `≠`).

### 2.2. Lược đồ hay dùng (lược đồ "trường đại học")
```
STUDENT(SID, Name, Major, GPA)
COURSE(CID, Title, Dept, Credits)          -- có câu bỏ Credits: COURSE(CID, Title, Dept)
ENROLL(SID, CID, Semester, Grade)          -- có câu rút gọn: ENROLL(SID, CID)
CLUB(ClubID, ClubName)
MEMBER(SID, ClubID)
INSTRUCTOR(IID, IName, Dept)
TEACH(IID, CID, Semester)                  -- biến thể: TEACH(IID, CID, Semester, Room)
ROOM(Room, Building, Capacity)
ADVISE(SID, IID)
PREREQ(CID, PreCID)                        -- CID khác PreCID, cả hai tham chiếu COURSE
```
Giá trị hay dùng: Major/Dept ∈ {'CS', 'IS', 'SE'}, Semester ∈ {'2025_Fall', '2025_Spring'}, GPA ngưỡng 2.0 / 3.0 / 3.5 / 3.8,
Credits ≥ 4, Grade ∈ {'A', 'B', 'F'}, Title ∈ {'Database', 'AI'}, ClubName ∈ {'AI', 'Robotics'}, Building = 'A', IID = 'I01'.

Câu lý thuyết dùng quan hệ trừu tượng: `R(A,B)`, `S(B,C)`, `S(B)`, `E(age, dept)`, `R, S, T`.

**Lưu ý về cột trùng tên:** `INSTRUCTOR.Dept` và `COURSE.Dept` trùng tên, nên về lý thuyết
`INSTRUCTOR ⋈ TEACH ⋈ COURSE` tự bắt Dept bằng nhau. Giảng viên **không xét** chi tiết này: đáp án đúng
của câu 10 và câu 59 vẫn dùng kết tự nhiên như vậy. Khi ra đề luyện, hoặc tránh đặt hai cột trùng tên,
hoặc ghi rõ "kết theo khóa ngoại".
`STUDENT.Major` khác `COURSE.Dept` → câu "Major = 'CS' và Dept = 'CS'" phải viết đủ hai điều kiện.

**Đề thật có vài câu lỗi** (hai đáp án cùng đúng hoặc không đáp án nào chuẩn): câu 8, 12, 47.
Khi ra đề luyện phải tránh các lỗi này (xem bước tự kiểm tra ở mục 7).

### 2.3. Ký hiệu trong đáp án
- Phần lớn đáp án hiển thị dạng công thức đẹp: `π_{Name}(σ_{GPA≥3.5}(STUDENT) ⋈ MEMBER ⋈ σ_{ClubName='AI'}(CLUB))`.
- Câu lý thuyết thì viết dạng chữ thường: `π_{A,C}(R ⋈ S)`, `σ_θ(R × S)`.
- Kết theta viết `⋈_{C1.CID=PREREQ.CID}`; đổi tên viết `ρ_{C1}(COURSE)`, `ρ_{CID}(π_{PreCID}(PREREQ))`.

## 3. Phân bố chủ đề (Test 2 RA, 74 câu)

| Nhóm | Số câu (ước lượng) | Ví dụ |
|---|---|---|
| Chọn + chiếu + kết đơn giản ("Lấy X của Y có Z") | ~25 | 1, 6, 10, 12, 17, 45, 53, 63 |
| Phép hiệu: KHÔNG / CHƯA / nhưng KHÔNG / CHỈ | ~17 | 2, 3, 11, 13, 16, 21, 25, 47, 57, 73 |
| Phép giao: CẢ HAI / vừa … vừa … | ~7 | 4, 15, 22, 29, 36, 38, 59 |
| Hợp, "đúng 1 trong 2", "ít nhất 2", tự kết với ρ | ~5 | 9, 19, 51, 55, 73 |
| Lý thuyết RA: tương đương, tính chất, SQL tương ứng | ~9 | 5, 7, 23, 24, 32, 34, 37, 40, 50 |
| **Kiến thức chương trước** (ánh xạ ER, khóa, ràng buộc) | ~11 (~15%) | 8, 35, 42, 43, 44, 48, 49, 61, 64, 68, 74 |

→ Đề RA **có trộn khoảng 15% câu ánh xạ ER / khóa** từ bài trước. Đề luyện nên giữ tỉ lệ này.

## 4. Các kiểu đáp án nhiễu (quan trọng nhất)

Mỗi câu có 1 đáp án đúng và 3 đáp án nhiễu, mỗi đáp án nhiễu dính **đúng một lỗi** từ danh sách dưới đây.
Đáp án nhiễu nhìn rất giống đáp án đúng (cùng bảng, cùng ký hiệu), chỉ khác một chi tiết.

| # | Kiểu lỗi | Ví dụ trong đề thật |
|---|---|---|
| D1 | **Đảo thứ tự σ và π**: σ ở ngoài lọc trên cột mà π bên trong đã bỏ | `σ_{GPA>3.0}(π_{SID,CID}(…))` (câu 33, 66); `σ_{Credits≥4}(π_{IName}(…))` (câu 10) |
| D2 | **σ trên bảng không có cột đó** | `σ_{GPA≥3.5 ∧ ClubName='AI'}(STUDENT)` (1A); `σ_{Dept='CS'}(ADVISE)` (6C); `σ_{GPA>3.0}(ENROLL)` (33B); `σ_{Major='CS'}(ENROLL)` (54C); `σ_{Credits≥4}(ENROLL)` (47B) |
| D3 | **∧ trên cùng một cột cho câu "cả hai"** (luôn rỗng) | `σ_{CID='C001' ∧ CID='C002'}` (15C); `σ_{ClubName='AI' ∧ ClubName='Robotics'}` (22A); `σ_{Semester=… ∧ Semester=…}` (38D) |
| D4 | **∧ thay cho ∨** khi đề nói "hoặc" | `σ_{Grade='A' ∧ Grade='B'}` (14A) |
| D5 | **Nhầm ∪ / ∩ / −** | ∪ thay ∩ (15B, 22C, 29C, 36B, 38A); ∩ thay − (3D, 41A, 25C) |
| D6 | **Phép hiệu đảo chiều** | `π(ENROLL Spring) − π(COURSE CS)` (2A, 3C); `π(…Fall) − π(…Spring)` (41B); `π(Grade='F') − π(ENROLL)` (57A) |
| D7 | **Phép hiệu trừ từ tập quá hẹp**: lấy "tất cả" từ bảng kết (COURSE ⋈ ENROLL) nên mất đối tượng chưa có bản ghi nào | 2D, 47A (bỏ sót sinh viên chưa đăng ký môn nào) |
| D8 | **Phép tập hợp giữa hai thuộc tính khác loại** (không khả hợp về nghĩa) | `π_{ClubID}(MEMBER) ∩ π_{SID}(…)` (4A); `π_{CID}(ENROLL) ∩ π_{SID}(…)` (27B); `π_{CID}(…) ∪ π_{SID}(…)` (55A) |
| D9 | **Đổi điều kiện**: `=` thành `<>`, Dept thành Major, thiếu một điều kiện | 20D (Dept='CS' thay vì <>'CS'); 53C (Dept thay Major); 18B; 28C |
| D10 | **Thiếu ρ / sai tên thuộc tính khi hợp-hiệu** | `π_{CID}(ENROLL) − π_{PreCID}(PREREQ)` thiếu ρ (73D) |
| D11 | **Tự kết thiếu điều kiện khác nhau** | `⋈_{E1.SID=E2.SID}` thiếu `E1.CID≠E2.CID` (51A, 51B) |
| D12 | **Bẫy NULL** | `σ_{PreCID IS NULL}(PREREQ)` cho câu "có ít nhất một môn tiên quyết" (26C) |
| D13 | **Đáp án quá ngắn, bỏ bảng**: thiếu một phép kết cần thiết | `π_{Title}(σ_{Title='Database'}(COURSE) ⋈ PREREQ)` (19C); `π_{CID}(σ_{GPA<2.0}(STUDENT))` (65B) |
| D14 | **Cú pháp sai**: đặt điều kiện vào π, hoặc dùng "∈", "∉" | `π_{Credits≥4}(COURSE)` (47D); `σ_{B∉S}(R)` (7B); `σ_{CID∈π…}` (17B,C) |

### Mẫu đáp án đúng theo từng loại câu
- **"Lấy X của Y có điều kiện"**: `π_X(σ_cond(T1 ⋈ T2 ⋈ T3))`. Đáp án đúng gần như luôn **σ trước, π sau**.
- **"KHÔNG / CHƯA"**: `π_X(tất cả) − π_X(σ(… ⋈ …))`, trong đó "tất cả" lấy từ **bảng gốc của đối tượng** (COURSE, STUDENT, INSTRUCTOR), không lấy từ bảng kết.
- **"CHỈ … (không … ngoài)"**: `π_X(ENROLL) − π_X(ENROLL ⋈ σ_{Dept<>'CS'}(COURSE))` (câu 11).
- **"CẢ HAI A và B"**: `π_X(… A …) ∩ π_X(… B …)`, rồi kết lại với bảng để lấy tên (câu 22, 4, 59).
- **"ĐÚNG 1 trong 2"**: `(S_A ∪ S_B) − (S_A ∩ S_B)` (câu 9).
- **"ít nhất 2"**: tự kết `ρ_{E1}(…) ⋈_{E1.SID=E2.SID ∧ E1.CID≠E2.CID} ρ_{E2}(…)` (câu 51).
- **Quan hệ đệ quy (PREREQ)**: dùng hai bản sao `ρ_{C1}(COURSE)`, `ρ_{C2}(COURSE)` và kết theta (câu 19).

## 5. Câu lý thuyết RA hay hỏi
- Định nghĩa kết theta: `R ⋈_θ S = σ_θ(R × S)` (câu 40).
- `σ_θ(σ_θ(R)) = σ_θ(R)` (câu 23); `σ_{a}(σ_{b}(E)) = σ_{a ∧ b}(E)` (câu 34).
- σ phân phối qua ∪: `σ_θ(R ∪ S) = σ_θ(R) ∪ σ_θ(S)` (câu 32).
- Tính kết hợp của kết tự nhiên: `(R ⋈ S) ⋈ T = R ⋈ (S ⋈ T)` (câu 50).
- `π_{A,C}(R ⋈ S) = π_{A,C}((π_{A,B}R) ⋈ (π_{B,C}S))` (câu 5).
- "Các bộ của R không có B khớp trong S": `R − π_{A,B}(R ⋈ S)` (câu 7).
- SQL tương ứng phép hợp (ngữ nghĩa tập hợp) là `UNION`, không phải `UNION ALL` (câu 37).
- Mục đích của ρ trong kết tự nhiên: tránh đụng tên thuộc tính (câu 24).

## 6. Câu ánh xạ ER / khóa (Test 1 và phần trộn trong Test 2)
- **Dạng chủ đạo của Test 1**: cho hình ERD, hỏi "ánh xạ nào phù hợp". Đáp án viết dạng
  `TABLE(Col PK, Col FK→REF NOT NULL UNIQUE, …, PK(a,b))`.
- Đáp án đúng thường là đáp án **đầy đủ nhất**: ghi rõ `FK→BẢNG`, `NOT NULL` (khi tham gia toàn phần, nét đôi),
  `UNIQUE` (cho 1:1), `PK(...)` gồm đủ thành phần.
- Đáp án nhiễu: đặt FK sai phía (1:N đặt ở bên 1), thiếu bảng trung gian cho M:N, PK của bảng M:N sai,
  đa trị lưu thành `TEXT` hoặc `Phone1, Phone2, Phone3`, gộp mọi thứ vào một bảng, ISA bỏ bảng cha,
  thực thể yếu thiếu PK của bảng chủ.
- Câu lý thuyết ngắn: ký hiệu ERD (đa trị = elip đôi), thuộc tính dẫn xuất (không lưu, tính bằng view/truy vấn),
  1:1 cần FK `UNIQUE` (+ `NOT NULL` nếu tham gia toàn phần), tham gia toàn phần cần FK `NOT NULL`,
  ISA chồng lấp → bảng cha + bảng con PK/FK→cha, FK phải tham chiếu PK hoặc UNIQUE, khóa ứng viên cần UNIQUE.

## 7. Quy trình tạo một đề luyện
1. Hỏi (hoặc mặc định) số câu; mặc định 30 câu, ~70% RA, ~15% lý thuyết RA, ~15% ER/khóa.
2. Dùng lược đồ ở mục 2.2; có thể thêm một lược đồ mới cùng phong cách (ví dụ thư viện, bệnh viện)
   để tránh học vẹt, nhưng giữ cách viết "TABLE(...): Chứa thông tin ...".
3. Với mỗi câu RA: viết đáp án đúng trước, rồi tạo 3 đáp án nhiễu, **mỗi cái dính một lỗi khác nhau** từ bảng mục 4.
4. Xáo vị trí đáp án đúng cho đều A–D.
5. **Tự kiểm tra từng câu**: đáp án đúng phải đúng cả khi có đối tượng không có bản ghi nào (lỗi D7),
   khi tên không duy nhất, và các đáp án nhiễu phải thực sự sai (không có hai đáp án cùng đúng).
6. Xuất đề và đáp án tách riêng (đề trước, bảng đáp án + giải thích ngắn ở cuối hoặc file riêng).
