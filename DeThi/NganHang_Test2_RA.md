# Ngân hàng đề Test 2: "RA - ATTT" (9/10/2026, 74 câu)

Chép lại từ ảnh trong `TestRA_CSDL_9thg10.rar`. Đáp án do Claude tự giải (đề thật không hiện đáp án),
câu nào có vấn đề thì ghi chú. Ký hiệu: `π_{…}`, `σ_{…}`, `⋈` (kết tự nhiên), `⋈_{θ}` (kết theta), `ρ`, `<>` = khác.

**Lược đồ U (dùng chung, viết tắt S = STUDENT, C = COURSE, E = ENROLL):**
STUDENT(SID, Name, Major, GPA) · COURSE(CID, Title, Dept, Credits) · ENROLL(SID, CID, Semester, Grade) ·
CLUB(ClubID, ClubName) · MEMBER(SID, ClubID) · INSTRUCTOR(IID, IName, Dept) · TEACH(IID, CID, Semester) ·
ADVISE(SID, IID) · PREREQ(CID, PreCID) · ROOM(Room, Building, Capacity).
Trong đề, mỗi câu đều liệt kê lại các bảng cần dùng kèm câu "X tham chiếu tới X của …".

Cột "Lỗi nhiễu" dùng mã kiểu lỗi D1–D14 trong `HUONG_DAN_RA_DE.md` mục 4.

---

**1.** (S, CLUB, MEMBER; ClubName duy nhất) Lấy Name của SV có GPA ≥ 3.5 và là thành viên CLB 'AI'.
A. `π_{Name}(σ_{GPA≥3.5 ∧ ClubName='AI'}(STUDENT))` B. `π_{Name}(σ_{ClubName='AI'}(MEMBER ⋈ CLUB)) − π_{Name}(σ_{GPA≥3.5}(STUDENT))`
C. `π_{Name}(σ_{GPA≥3.5}(STUDENT) ⋈ MEMBER ⋈ σ_{ClubName='AI'}(CLUB))` D. `σ_{GPA≥3.5}(π_{Name}(STUDENT ⋈ MEMBER ⋈ CLUB))`
**Đáp án: C.** Nhiễu: A D2, B D5+D2, D D1.

**2.** (S, C, E) Lấy CID của các môn Dept='CS' hoặc 'SE' mà KHÔNG có đăng ký trong '2025_Fall'.
A. `π_{CID}(σ_{Semester='2025_Fall'}(E)) − π_{CID}(σ_{Dept='CS'∨Dept='SE'}(C))`
B. `π_{CID}(σ_{Dept='CS'∨Dept='SE'}(C)) − π_{CID}(σ_{Semester='2025_Fall' ∧ (Dept='CS'∨Dept='SE')}(C ⋈ E))`
C. `π_{CID}(σ_{Dept='CS'∨Dept='SE'}(C)) ∩ π_{CID}(σ_{Semester<>'2025_Fall'}(E))`
D. `π_{CID}(σ_{Dept='CS'∨Dept='SE'}(C ⋈ E)) − π_{CID}(σ_{Semester='2025_Fall'}(E))`
**Đáp án: B.** Nhiễu: A D6, C D5 (môn có đăng ký cả kỳ khác lẫn Fall vẫn lọt), D D7 (mất môn chưa có đăng ký nào).

**3.** (S, C, E) Lấy CID các môn Dept='CS' có đăng ký '2025_Fall' nhưng KHÔNG có đăng ký '2025_Spring'.
A. `π_{CID}(σ_{Dept='CS' ∧ Semester='2025_Fall'}(C ⋈ E)) − π_{CID}(σ_{Dept='CS' ∧ Semester='2025_Spring'}(C ⋈ E))`
B. `π_{CID}(σ_{Dept='CS'}(C)) − π_{CID}(σ_{Semester='2025_Spring'}(E))` C. `π_{CID}(σ_{Semester='2025_Fall'}(E)) − π_{CID}(σ_{Dept='CS'}(C))`
D. như A nhưng dùng ∩.
**Đáp án: A.** Nhiễu: B thiếu điều kiện Fall, C D6, D D5.

**4.** (C, S, CLUB, MEMBER, E) Lấy Name của SV vừa là thành viên CLB nào đó vừa có đăng ký kỳ '2025_Fall'.
A. `π_{Name}(STUDENT ⋈ (π_{ClubID}(MEMBER) ∩ π_{SID}(σ_{Semester='2025_Fall'}(E))))` B. `π_{Name}(σ_{Semester='2025_Fall'}(STUDENT ⋈ MEMBER))`
C. `π_{Name}(STUDENT) − π_{Name}(STUDENT ⋈ π_{SID}(MEMBER))` D. `π_{Name}(STUDENT ⋈ (π_{SID}(MEMBER) ∩ π_{SID}(σ_{Semester='2025_Fall'}(E))))`
**Đáp án: D.** Nhiễu: A D8, B D2, C D5.

**5.** Cho R(A,B), S(B,C), `π_{A,C}(R ⋈ S)` tương đương với?
A. `π_{A,C}((π_{A,B}R) ⋈ (π_{B,C}S))` B. `(π_A R) ⋈ (π_C S)` C. `(π_A R) × (π_C S)` D. `π_{A,C}(R × S) = …`
**Đáp án: A.** (B, C mất cột B dùng để nối.)

**6.** (S, INSTRUCTOR, ADVISE) Lấy SID của SV được cố vấn bởi giảng viên Dept='CS'.
A. `π_{IID}(ADVISE ⋈ σ_{Dept='CS'}(INSTRUCTOR))` B. `π_{SID}(ADVISE ⋈ σ_{Dept='CS'}(INSTRUCTOR))` C. `π_{SID}(σ_{Dept='CS'}(ADVISE))` D. `π_{SID}(ADVISE) − π_{SID}(σ_{Dept='CS'}(INSTRUCTOR))`
**Đáp án: B.** Nhiễu: A chiếu sai cột, C D2, D D5+D2.

**7.** Với R(A,B), S(B), biểu thức trả về các bộ của R không có B khớp trong S:
A. `π_A(R) − π_A(S)` B. `σ_{B∉S}(R)` C. `R − π_{A,B}(R ⋈ S)` D. `R ÷ S`
**Đáp án: C.** Nhiễu: A sai (S không có A), B D14, D sai nghĩa.

**8.** Ràng buộc toàn phần: mọi EMPLOYEE bắt buộc thuộc một DEPARTMENT. Thiết kế đúng cần?
A. Bảng phụ EMP_DEPT B. EMPID trong DEPARTMENT NOT NULL và là FK C. DEPTID trong DEPARTMENT phải NOT NULL D. Bảng EMP_DEPT
**Đề lỗi:** ý đúng phải là "DEPTID trong **EMPLOYEE** NOT NULL và là FK" (xem câu 74), không có lựa chọn nào ghi đúng.

**9.** (S, C, E; Title duy nhất) SID của SV đăng ký CHỈ MỘT TRONG HAI môn 'Database' hoặc 'AI'. Với S_DB, S_AI là tập SID đăng ký từng môn:
A. `(S_DB ∪ S_AI) ∩ (S_DB ∩ S_AI)` B. `(S_DB ∪ S_AI) − (S_DB ∩ S_AI)` C. `S_DB ∩ S_AI` D. `(S_DB ∩ S_AI) − (S_DB ∪ S_AI)`
**Đáp án: B.**

**10.** (C, INSTRUCTOR, TEACH) Lấy IName của giảng viên đã dạy ít nhất một môn Credits ≥ 4.
A. `σ_{Credits≥4}(π_{IName}(I ⋈ T ⋈ C))` B. `π_{IID}(σ_{Credits≥4}(I ⋈ T ⋈ C))` C. `π_{IName}(σ_{Credits≥4}(I ⋈ T ⋈ C))` D. `π_{IName}(I) − π_{IName}(σ_{Credits≥4}(T ⋈ C))`
**Đáp án: C.** Nhiễu: A D1, B chiếu sai cột, D D5.

**11.** (S, C, E) SID của SV CHỈ đăng ký các môn Dept='CS' (không đăng ký môn ngoài CS).
A. `π_{SID}(E) ∩ π_{SID}(E ⋈ σ_{Dept='CS'}(C))` B. `π_{SID}(E ⋈ σ_{Dept<>'CS'}(C)) − π_{SID}(E)` C. `π_{SID}(E ⋈ σ_{Dept='CS'}(C))` D. `π_{SID}(E) − π_{SID}(E ⋈ σ_{Dept<>'CS'}(C))`
**Đáp án: D.** Nhiễu: A, C chỉ là "có ít nhất một môn CS", B D6.

**12.** (C, E; song ngữ) CID các môn 'CS' có ít nhất một đăng ký '2025_Fall'.
A. `π_{CID}(σ_{Dept='CS'}(C)) − π_{CID}(σ_{Semester='2025_Fall'}(E))` B. `π_{CID}(σ_{Dept='CS'}(C)) ∩ π_{CID}(σ_{Semester='2025_Fall'}(E))`
C. `π_{CID}(σ_{Dept='CS' ∧ Semester='2025_Fall'}(C ⋈ E))` D. `π_{CID}(σ_{Semester='2025_Fall'}(C ⋈ E))`
**Đáp án: C. Lưu ý: B cũng cho cùng kết quả** (đề có hai đáp án tương đương).

**13.** (C, INSTRUCTOR, TEACH) Lấy IID của giảng viên KHÔNG dạy trong kỳ '2025_Spring'.
A. `π_{IID}(I ⋈ σ_{Semester='2025_Spring'}(T))` B. `π_{IName}(I) − π_{IName}(σ_{…}(T))` C. `π_{IID}(σ_{…}(T)) − π_{IID}(I)` D. `π_{IID}(I) − π_{IID}(σ_{Semester='2025_Spring'}(T))`
**Đáp án: D.** Nhiễu: A sai nghĩa, B D2 (TEACH không có IName), C D6.

**14.** (S, C, E) Title của các môn có ít nhất một đăng ký Grade='A' hoặc 'B'.
A. `π_{Title}(σ_{Grade='A' ∧ Grade='B'}(C ⋈ E))` B. `π_{Title}(C) − π_{Title}(σ_{Grade='A'∨Grade='B'}(E))` C. `π_{Title}(σ_{Grade='A' ∨ Grade='B'}(C ⋈ E))` D. `σ_{Grade='A'∨Grade='B'}(π_{Title}(C ⋈ E))`
**Đáp án: C.** Nhiễu: A D4, B D5+D2, D D1.

**15.** (S, C, E) SID của SV đã đăng ký cả hai môn CID='C001' và 'C002'.
A. `π_{CID}(σ_{SID='C001'}(E)) ∩ π_{CID}(σ_{SID='C002'}(E))` B. `π_{SID}(σ_{CID='C001'}(E)) ∪ π_{SID}(σ_{CID='C002'}(E))` C. `π_{SID}(σ_{CID='C001' ∧ CID='C002'}(E))` D. `π_{SID}(σ_{CID='C001'}(E)) ∩ π_{SID}(σ_{CID='C002'}(E))`
**Đáp án: D.** Nhiễu: A nhầm cột, B D5, C D3.

**16.** (song ngữ) Title các môn Dept='CS' chưa có SV nào GPA > 3.5 đăng ký.
A. `π_{Title}(σ_{Dept='CS'}(C)) − π_{Title}(σ_{Dept='CS'}(σ_{GPA>3.5}(S) ⋈ E ⋈ C))` B. `σ_{Title}(π_{Dept='CS'}(C)) − …` (sai cú pháp)
C. `π_{Title}(σ_{Dept='CS'}(C)) − π_{Title}(σ_{GPA>3.5}(S) ⋈ E ⋈ C)` D. `σ_{Dept='CS'}(π_{Title}(C)) − π_{Title}(σ_{GPA>3.5}(S ⋈ E))`
**Đáp án: A.** Nhiễu: B D14, C sai khi Title không duy nhất, D D1+D2.

**17.** (song ngữ) Name của SV đăng ký môn có Title='Database'.
A. `σ_{Name}(π_{Title='Database'}(S ⋈ E ⋈ C))` B, C. dùng `σ_{CID∈π_{CID}(…)}` D. `π_{Name}(σ_{Title='Database'}(S ⋈ E ⋈ C))`
**Đáp án: D.** Nhiễu: A, B, C D14.

**18.** (Name có thể trùng) Name của SV Major<>'CS' nhưng đã đăng ký ít nhất một môn Dept='CS'.
A. `π_{Name}(σ_{Major<>'CS'}(S)) − π_{Name}(σ_{Dept='CS'}(C ⋈ E))` B. `π_{Name}(σ_{Major='CS' ∧ Dept='CS'}(S ⋈ E ⋈ C))`
C. `π_{Name}(σ_{Dept='CS'}(S ⋈ E ⋈ C)) − π_{Name}(σ_{Major='CS'}(S))` D. `π_{Name}(σ_{Major<>'CS' ∧ Dept='CS'}(S ⋈ E ⋈ C))`
**Đáp án: D.** Nhiễu: A D5+D2, B D9, C sai vì Name trùng (trừ theo Name loại nhầm người khác cùng tên).

**19.** (COURSE, PREREQ; Title duy nhất) Title của các môn là tiên quyết của môn 'Database'.
A. `π_{C2.Title}(ρ_{C1}(σ_{Title='Database'}(C)) ⋈_{C1.CID=PREREQ.CID} PREREQ ⋈_{PREREQ.PreCID=C2.CID} ρ_{C2}(C))`
B. `π_{Title}(σ_{Title='Database'}(C) ⋈_{CID=PreCID} PREREQ ⋈ C)` C. `π_{Title}(σ_{Title='Database'}(C) ⋈ PREREQ)` D. `π_{Title}(C) − π_{Title}(σ_{Title='Database'}(C))`
**Đáp án: A** (tự kết với hai bản sao COURSE). Nhiễu: B kết sai cột, C D13, D sai nghĩa.

**20.** (S, C, E) Title các môn Dept<>'CS' nhưng có ít nhất một SV Major='CS' đăng ký.
A. `π_{Title}(σ_{Major='CS' ∧ Dept<>'CS'}(S ⋈ E ⋈ C))` B. `π_{Title}(σ_{Major='CS'}(S)) ⋈ C` C. `π_{Title}(σ_{Dept<>'CS'}(C)) − π_{Title}(σ_{Major='CS'}(S ⋈ E ⋈ C))` D. `π_{Title}(σ_{Dept='CS' ∧ Major='CS'}(S ⋈ E ⋈ C))`
**Đáp án: A.** Nhiễu: B D1+D13, C D5, D D9.

**21.** (S, C, E) Title các môn Dept='CS' mà không có bất kỳ đăng ký nào.
A. `π_{Title}(σ_{Dept='CS'}(C)) − π_{Title}(σ_{Dept='CS'}(C ⋈ E))` B. `π_{Title}(σ_{Dept='CS'}(C)) − π_{Title}(C ⋈ E)` C. `π_{Title}(σ_{Dept='CS'}(C ⋈ E))` D. `π_{Title}(C) − π_{Title}(σ_{Dept='CS'}(C ⋈ E))`
**Đáp án: A.** Nhiễu: B sai khi Title trùng giữa các khoa, C sai nghĩa, D lấy cả môn ngoài CS.

**22.** (S, CLUB, MEMBER; ClubName duy nhất) Name của SV là thành viên CẢ HAI CLB 'AI' và 'Robotics'.
A. `π_{Name}(σ_{ClubName='AI' ∧ ClubName='Robotics'}(S ⋈ MEMBER ⋈ CLUB))`
B. `π_{Name}(S ⋈ (π_{SID}(MEMBER ⋈ σ_{ClubName='AI'}(CLUB)) ∩ π_{SID}(MEMBER ⋈ σ_{ClubName='Robotics'}(CLUB))))`
C. như B nhưng dùng ∪ D. `π_{Name}(S) − π_{Name}(S ⋈ MEMBER ⋈ σ_{ClubName='AI'}(CLUB))`
**Đáp án: B.** Nhiễu: A D3, C D5, D sai nghĩa.

**23.** Đẳng thức nào luôn đúng? A. `σ_θ(R) = R` B. `π_X(π_Y(R)) = π_Y(R)` C. `σ_θ(σ_θ(R)) = σ_θ(R)` D. `π_X(R) = R`
**Đáp án: C.**

**24.** Mục đích chính của ρ trong kết tự nhiên? A. Loại bộ trùng B. Xóa thuộc tính C. Sắp xếp D. Tránh đụng tên thuộc tính trước khi join
**Đáp án: D.**

**25.** (Name duy nhất) Name của SV KHÔNG đăng ký trong '2025_Spring'.
A. `π_{Name}(S) − π_{Name}(S ⋈ σ_{Semester='2025_Spring'}(E))` B. `π_{Name}(σ_{…}(S ⋈ E))` C. như A nhưng ∩ D. `π_{Name}(S ⋈ σ_{…}(E))`
**Đáp án: A.**

**26.** (COURSE, PREREQ) Title các môn Dept='CS' có ít nhất một môn tiên quyết.
A. `π_{Title}(σ_{Dept='CS'}(C)) ∩ π_{Title}(PREREQ)` B. `π_{Title}(σ_{Dept='CS'}(C ⋈ PREREQ))` C. `π_{Title}(σ_{Dept='CS'}(C ⋈ σ_{PreCID IS NULL}(PREREQ)))` D. `π_{Title}(σ_{Dept='CS'}(C)) − π_{Title}(σ_{Dept='CS'}(C ⋈ PREREQ))`
**Đáp án: B.** Nhiễu: A D2 (PREREQ không có Title), C D12, D ngược nghĩa.

**27.** (C, S, CLUB, MEMBER, E) CID của các môn được đăng ký bởi SV là thành viên CLB 'AI'.
A. `π_{CID}(σ_{ClubName='AI'}(CLUB))` B. `π_{CID}(E) ∩ π_{SID}(MEMBER ⋈ σ_{ClubName='AI'}(CLUB))` C. `π_{CID}(E ⋈ π_{SID}(MEMBER ⋈ σ_{ClubName='AI'}(CLUB)))` D. `π_{CID}(σ_{ClubName='AI'}(E ⋈ MEMBER))`
**Đáp án: C.** Nhiễu: A D2, B D8, D D2.

**28.** (S, C, E) CID các môn không thuộc Dept='CS' nhưng có ít nhất một đăng ký '2025_Spring'.
A. `π_{CID}(σ_{Semester='2025_Spring'}(C ⋈ E))` B. `π_{CID}(σ_{Dept<>'CS'}(C)) ∪ π_{CID}(σ_{…}(E))` C. `π_{CID}(σ_{Dept='CS' ∧ Semester='2025_Spring'}(C ⋈ E))` D. `π_{CID}(σ_{Dept<>'CS' ∧ Semester='2025_Spring'}(C ⋈ E))`
**Đáp án: D.** (Lặp lại ở câu 71.)

**29.** (S, C, E) SID của SV đã đăng ký ít nhất một môn Dept='CS' và ít nhất một môn Dept='IS'.
A. `π_{SID}(E) − π_{SID}(E ⋈ σ_{Dept='IS'}(C))` B. `π_{SID}(σ_{Dept='CS' ∧ Dept='IS'}(E ⋈ C))` C. ∪ của hai tập D. `π_{SID}(E ⋈ σ_{Dept='CS'}(C)) ∩ π_{SID}(E ⋈ σ_{Dept='IS'}(C))`
**Đáp án: D.**

**30.** (INSTRUCTOR, TEACH(IID, CID, Semester, Room), ROOM(Room, Building, Capacity), COURSE) Title các môn dạy tại Building='A' trong '2025_Fall'.
A. `π_{Title}(σ_{Building='A' ∧ Semester='2025_Fall'}(TEACH ⋈ ROOM ⋈ COURSE))` B. `σ_{…}(π_{Title}(TEACH ⋈ ROOM ⋈ COURSE))` C. `π_{Title}(σ_{Semester='2025_Fall'}(TEACH ⋈ COURSE)) − π_{Title}(σ_{Building='A'}(ROOM))` D. (ảnh bị cắt)
**Đáp án: A.**

**31.** (Title duy nhất) Name của SV đã đăng ký 'Database' nhưng KHÔNG đăng ký 'AI'.
A. `π_{Name}(S ⋈ (π_{SID}(E ⋈ σ_{Title='Database'}(C)) ∪ π_{SID}(E ⋈ σ_{Title='AI'}(C))))` B. `π_{Name}(S) − π_{Name}(S ⋈ π_{SID}(E ⋈ σ_{Title='Database'}(C)))`
C. như A nhưng ∩ D. `π_{Name}(S ⋈ (π_{SID}(E ⋈ σ_{Title='Database'}(C)) − π_{SID}(E ⋈ σ_{Title='AI'}(C))))`
**Đáp án: D.**

**32.** Tính phân phối của σ trên phép hợp: A. Không có B. `σ_θ(R∪S) = σ_θ(R) × σ_θ(S)` C. `σ_θ(R∪S) = σ_θ(R) ∪ σ_θ(S)` D. `… = σ_θ(R) ∩ σ_θ(S)`
**Đáp án: C.**

**33.** (S, C, E) Lấy cặp (SID, CID) của SV có GPA > 3.0.
A. `σ_{GPA>3.0}(π_{SID,CID}(S ⋈ E))` B. `π_{SID,CID}(σ_{GPA>3.0}(E))` C. `π_{SID,CID}(σ_{GPA>3.0}(S ⋈ E))` D. `π_{SID,CID}(S)`
**Đáp án: C.** Nhiễu: A D1, B D2, D D2. (Lặp lại ở câu 66.)

**34.** `σ_{age>30}(σ_{dept='IT'}(E))` = ? A. `σ_{age>30}(E) × σ_{dept='IT'}(E)` B. `π_{age,dept}(E)` C. `σ_{age>30 ∧ dept='IT'}(E)` D. `σ_{age>30}(E) ∪ σ_{dept='IT'}(E)`
**Đáp án: C.**

**35.** Order và Customer: mỗi đơn thuộc đúng 1 khách, 1 khách nhiều đơn. Kiểu quan hệ và cách triển khai?
A. 1–1, FK hai chiều B. 1–N từ Order sang Customer, OrderID (FK) vào Customer C. N–N, bảng trung gian D. 1–N từ Customer sang Order, CustomerID (FK) vào Order
**Đáp án: D.** (Câu ER.)

**36.** (song ngữ; COURSE(CID, Title), ENROLL(SID, CID); Title duy nhất) SID của SV đăng ký CẢ HAI 'Database' và 'AI'.
A. `σ_{Title='Database' ∧ Title='AI'}` B. ∪ C. `π_{SID}(E ⋈ σ_{Title='Database'}(C)) ∩ π_{SID}(E ⋈ σ_{Title='AI'}(C))` D. `π_{SID}(E) − (… ∩ …)`
**Đáp án: C.**

**37.** RA dùng ngữ nghĩa tập hợp. Phép SQL tương ứng với hợp? A. UNION B. INTERSECT C. EXCEPT D. UNION ALL
**Đáp án: A.**

**38.** SID của SV có đăng ký cả hai kỳ '2025_Spring' và '2025_Fall'.
A. ∪ B. `π_{SID}(σ_{Semester='2025_Spring'}(E)) ∩ π_{SID}(σ_{Semester='2025_Fall'}(E))` C. `π_{SID}(E) − π_{SID}(σ_{…Fall}(E))` D. `σ_{Semester='2025_Spring' ∧ Semester='2025_Fall'}`
**Đáp án: B.**

**39.** Title các môn chưa có SV nào đăng ký.
A. `π_{Title}(C ⋈ E)` B. `π_{Title}(C) − π_{Title}(E)` C. `π_{Title}(E) − π_{Title}(C)` D. `π_{Title}(C) − π_{Title}(C ⋈ E)`
**Đáp án: D.** Nhiễu: B, C D2 (ENROLL không có Title).

**40.** Định nghĩa đúng của theta-join `R ⋈_θ S`? A. `σ_θ(R × S)` B. `σ_θ(R) ∪ σ_θ(S)` C. `σ_θ(R) × S` D. `π_θ(R × S)`
**Đáp án: A.**

**41.** SID của SV có đăng ký '2025_Spring' nhưng KHÔNG đăng ký '2025_Fall'.
A. ∩ B. `Fall − Spring` C. ∪ D. `π_{SID}(σ_{…Spring}(E)) − π_{SID}(σ_{…Fall}(E))`
**Đáp án: D.**

**42.** ISA có giao thoa: PERSON có STUDENT và EMPLOYEE. Thiết kế hỗ trợ giao thoa tốt?
A. Chỉ 2 bảng con B. Một bảng PERSON với cờ IsStudent/IsEmployee, không lưu thuộc tính riêng C. PERSON + STUDENT + EMPLOYEE, bảng con PK/FK về PERSON D. Một bảng PERSON với cột Type một giá trị
**Đáp án: C.** (Câu ER; lặp lại ở câu 68.)

**43.** Về FK: bảng CHILD có FK trỏ đến PARENT. Phát biểu đúng?
A. FK tham chiếu bất kỳ cột nào B. FK phải tham chiếu cột (tập cột) là PK hoặc UNIQUE của PARENT C. FK không thể NULL D. FK luôn là PK của CHILD
**Đáp án: B.**

**44.** ENROLL có PK(SID, CID). Phát biểu đúng?
A. (SID,CID) là khóa chính; SID hoặc CID riêng lẻ không định danh duy nhất bản ghi B. PK chỉ nên 1 thuộc tính C. SID và CID đều là siêu khóa riêng lẻ D. CID là FK nên không được nằm trong PK
**Đáp án: A.**

**45.** (SID, Name) của SV đăng ký môn có Credits ≥ 4 trong '2025_Fall'.
A. `π_{SID,Name}(σ_{GPA≥4 ∧ Semester='2025_Fall'}(S ⋈ E ⋈ C))` B. `σ_{…}(π_{SID,Name}(…))` C. `π_{SID,Name}(σ_{Credits≥4 ∧ Semester='2025_Fall'}(S ⋈ E ⋈ C))` D. `π_{SID,Name}(σ_{Credits≥4}(S) ⋈ σ_{Semester='2025_Fall'}(E))`
**Đáp án: C.** Nhiễu: A D9, B D1, D D2.

**46.** (song ngữ) Name của SV ngành 'CS' đã đăng ký ít nhất một môn Dept='CS'.
A. `π_{Name}(σ_{Major='CS'}(S)) − π_{Name}(σ_{Dept='CS'}(C ⋈ E ⋈ S))` B. `π_{Name}(σ_{Major='CS' ∧ Dept='CS'}(S ⋈ E ⋈ C))` C. `π_{Name}(σ_{Major='CS'}(S))` D. `π_{Name}(σ_{Dept='CS'}(C ⋈ E))`
**Đáp án: B.**

**47.** (song ngữ) SID của SV Major='CS' chưa đăng ký bất kỳ môn nào có Credits ≥ 4.
A. `π_{SID}(σ_{Major='CS'}(S) ⋈ E) − π_{SID}(σ_{Major='CS'}(S) ⋈ E ⋈ σ_{Credits≥4}(C))`
B. `π_{SID}(σ_{Major='CS'}(S)) − π_{SID}(σ_{Major='CS'}(S) ⋈ σ_{Credits≥4}(E))`
C. `π_{SID}(σ_{Major='CS'}(S) ⋈ C) − π_{SID}(σ_{Major='CS'}(S) ⋈ E ⋈ σ_{Credits≥4}(C))`
D. `π_{SID}(σ_{Major='CS'}(S)) − π_{SID}(π_{Major='CS'}(S) ⋈ E ⋈ π_{Credits≥4}(C))`
**Đề có vấn đề.** Biểu thức chuẩn là `π_{SID}(σ_{Major='CS'}(S)) − π_{SID}(σ_{Major='CS'}(S) ⋈ E ⋈ σ_{Credits≥4}(C))`, không trùng hẳn lựa chọn nào.
A bỏ sót SV chưa đăng ký môn nào (D7); B D2; D đúng hình dạng nhưng viết π thay σ (D14);
C cho kết quả đúng (S ⋈ C không có cột chung nên thành ×, π_SID ra mọi SV ngành CS) nhưng là cách viết "vô tình đúng". Nghiêng về **C**.

**48.** (song ngữ) Employee có nhiều Skill, Skill thuộc nhiều Employee. Thiết kế hợp lý nhất?
A. `EMP(EID PK, Name, Skills TEXT)` B. `EMP(EID PK, Name); EMP_SKILL(EID FK, Skill, PK(EID,Skill))` C. `EMP(…, Skill1, Skill2, Skill3)` D. `SKILL(Skill PK); EMP(EID PK, Name, Skill FK→SKILL)`
**Đáp án: B.**

**49.** (song ngữ; câu ER dài) Supplier có thuộc tính đa trị ContactPhone(PhoneType, PhoneNumber); quan hệ tam phân Supplies giữa Supplier, Part, Warehouse có thuộc tính đa trị ShipmentRecord(ShipDate, Quantity, TransportMethod). Ánh xạ đúng?
**Đáp án: B**: `SUPPLIER(SupplierID PK, Name); SUPPLIER_PHONE(SupplierID FK, PhoneType, PhoneNumber, PK(SupplierID, PhoneNumber)); PART(PartID PK, PartName); WAREHOUSE(WarehouseID PK, Location); SUPPLIES(SupplierID FK, PartID FK, WarehouseID FK, PK(SupplierID, PartID, WarehouseID)); SHIPMENT(SupplierID FK, PartID FK, WarehouseID FK, ShipDate, Quantity, TransportMethod, FK(SupplierID, PartID, WarehouseID)→SUPPLIES, PK(SupplierID, PartID, WarehouseID, ShipDate))`.
Nhiễu: PK của bảng điện thoại thiếu SupplierID; SHIPMENT có PK(ShipDate); lưu đa trị thành TEXT.

**50.** Tính chất kết hợp của natural join: A. `(R⋈S)×T = R⋈(S×T)` B. `(R⋈S)⋈T = R⋈(S⋈T)` C. `(R×S)⋈T = R×(S⋈T)` D. Không có
**Đáp án: B.**

**51.** SID của SV đã đăng ký ít nhất 2 môn khác nhau trong '2025_Fall'.
A. `π_{CID}(ρ_{E1}(σ_{…}(E)) ⋈_{E1.SID=E2.SID} ρ_{E2}(σ_{…}(E)))` B. `π_{SID}(ρ_{E1}(…) ⋈_{E1.CID=E2.CID} ρ_{E2}(…))` C. `π_{SID}(σ_{Semester='2025_Fall'}(E))`
D. `π_{E1.SID}(ρ_{E1}(σ_{Semester='2025_Fall'}(E)) ⋈_{E1.SID=E2.SID ∧ E1.CID≠E2.CID} ρ_{E2}(σ_{Semester='2025_Fall'}(E)))`
**Đáp án: D.** Nhiễu: A, B D11, C chỉ là "ít nhất 1".

**52.** SID của SV đã đăng ký môn Dept='CS' nhưng KHÔNG đăng ký môn Dept='IS'.
A. `π_{SID}(E ⋈ σ_{Dept='CS'}(C)) − π_{SID}(E ⋈ σ_{Dept='IS'}(C))` B. `π_{SID}(E) − π_{SID}(E ⋈ σ_{Dept='CS'}(C))` C. hiệu đảo chiều D. ∩
**Đáp án: A.**

**53.** Title các môn được SV Major='CS' đăng ký trong '2025_Fall'.
A. `π_{Title}(σ_{Major='CS' ∧ Semester='2025_Fall'}(S ⋈ E ⋈ C))` B. `π_{Title}(σ_{Major='CS'}(S)) ∩ π_{Title}(σ_{…}(C ⋈ E))` C. `π_{Title}(σ_{Dept='CS' ∧ Semester='2025_Fall'}(…))` D. `σ_{…}(π_{Title}(C))`
**Đáp án: A.**

**54.** CID của các môn có SV Major='CS' đăng ký trong '2025_Spring'.
A. `π_{CID}(σ_{Major='CS' ∧ Semester='2025_Spring'}(S ⋈ E))` B. `π_{CID}(σ_{Major='CS'}(S)) ∩ π_{CID}(σ_{…}(E))` C. `π_{CID}(σ_{Major='CS'}(E))` D. `π_{CID}(σ_{Semester='2025_Spring'}(S)) ⋈ E`
**Đáp án: A.**

**55.** Name của SV (đăng ký ít nhất một môn Dept='CS') HOẶC (GPA ≥ 3.8), kể cả SV không có bản ghi đăng ký nào.
A. `π_{Name}(S ⋈ (π_{CID}(E ⋈ σ_{Dept='CS'}(C)) ∪ π_{SID}(σ_{GPA≥3.8}(S))))` B. `π_{Name}(S ⋈ (π_{SID}(E ⋈ σ_{Dept='CS'}(C)) ∪ π_{SID}(σ_{GPA≥3.8}(S))))`
C. `π_{Name}(σ_{Dept='CS' ∨ GPA≥3.8}(S ⋈ E ⋈ C))` D. `π_{Name}(π_{SID}(E ⋈ σ_{Dept='CS'}(C)) ∪ σ_{GPA≥3.8}(S))`
**Đáp án: B.** Nhiễu: A D8, C mất SV GPA cao chưa đăng ký môn nào (đúng ý câu "kể cả…"), D không khả hợp.

**56.** (Title duy nhất) (SID, Name) của SV GPA ≥ 3.0 và đã đăng ký môn Title='Database'.
A. `σ_{…}(π_{SID,Name}(…))` B. `π_{SID,Name}(σ_{GPA≥3.0 ∧ Title='Database'}(S ⋈ E ⋈ C))` C. `π_{SID,Name}(σ_{Title='Database'}(S ⋈ E))` D. `π_{SID,Name}(σ_{GPA≥3.0}(S) ⋈ σ_{Title='Database'}(C))`
**Đáp án: B.** Nhiễu: A D1, C D2, D D13 (thiếu ENROLL nên thành ×).

**57.** (Grade có thể NULL) CID các môn có ít nhất một đăng ký nhưng không có bản ghi nào Grade='F'.
A. `π_{CID}(σ_{Grade='F'}(E)) − π_{CID}(E)` B. `π_{CID}(E) ∩ π_{CID}(σ_{Grade<>'F'}(E))` C. `π_{CID}(σ_{Grade<>'F'}(E)) − π_{CID}(σ_{Grade='F'}(E))` D. `π_{CID}(E) − π_{CID}(σ_{Grade='F'}(E))`
**Đáp án: D.** Nhiễu: A D6, B giữ cả môn có F, C bỏ sót môn mà mọi Grade đều NULL (`NULL <> 'F'` không cho TRUE) — D12.

**58.** (song ngữ; STUDENT(SID, Major), COURSE(CID, Title, Dept), ENROLL(SID, CID)) Title các môn Dept='CS' không có SV Major='CS' nào đăng ký.
A. `π_{Title}(σ_{Dept='CS'}(C)) − π_{Title}(σ_{Dept='CS'}(σ_{Major='CS'}(S) ⋈ E ⋈ C))` B. `π_{Title}(σ_{Dept='CS'}(C)) − π_{Title}(σ_{Major='CS'}(S) ⋈ E ⋈ C)` C. `π_{Title}(σ_{Dept='CS'}(C ⋈ E)) − π_{Title}(σ_{Major='CS'}(S))` D. (ảnh bị che)
**Đáp án: A.**

**59.** (S, INSTRUCTOR, C, TEACH, ADVISE) IName của giảng viên dạy ít nhất một môn Dept='CS' trong '2025_Fall' VÀ cố vấn ít nhất một SV Major='CS'.
A. `π_{IName}(σ_{Dept='CS' ∧ Semester='2025_Fall' ∧ Major='CS'}(I ⋈ T ⋈ C ⋈ ADVISE ⋈ S))`
B. `π_{IName}(I ⋈ (π_{IID}(σ_{Dept='CS' ∧ Semester='2025_Fall'}(T ⋈ C)) ∩ π_{IID}(ADVISE ⋈ σ_{Major='CS'}(S))))`
C. như B nhưng ∪ và thiếu Semester D. `π_{IName}(I) − π_{IName}(π_{IID}(σ_{…}(T ⋈ C)))`
**Đáp án: B.**

**60.** SID của các SV đã đăng ký ít nhất một học phần thuộc khoa Dept='CS'.
A. `π_{SID}(E ⋈ C)` B. `π_{SID}(σ_{Dept='CS'}(E ⋈ C))` C. `π_{SID}(σ_{Dept='CS'}(C))` D. `π_{SID}(σ_{Dept='CS'}(S ⋈ E))`
**Đáp án: B.**

**61.** STUDENT có khóa ứng viên SID và Email không trùng lặp. Phát biểu đúng?
A. Email có thể UNIQUE nhưng không thể làm PK B. Email có thể là khóa ứng viên và cần ràng buộc UNIQUE C. UNIQUE và PK giống hệt nhau D. Email UNIQUE thì không cần SID
**Đáp án: B.**

**62.** (S, INSTRUCTOR, C, ADVISE, E) Title các môn được đăng ký bởi SV được cố vấn bởi giảng viên IID='I01'.
A. `π_{Title}((σ_{IID='I01'}(ADVISE)) ⋈ E ⋈ C)` B. `π_{Title}(ADVISE ⋈ σ_{IID='I01'}(E) ⋈ C)` C. `π_{Title}(σ_{IID='I01'}(C ⋈ E))` D. `π_{Title}(C) − π_{Title}(…)`
**Đáp án: A.** Nhiễu: B, C D2.

**63.** (SID, Name) của SV Major='CS'.
A. `π_{SID,Name}(S)` B. `σ_{Major='CS'}(S)` C. `σ_{Major='CS'}(π_{SID,Name}(S))` D. `π_{SID,Name}(σ_{Major='CS'}(S))`
**Đáp án: D.** (Lặp lại ở câu 70, đáp án C.)

**64.** Đặt FK trong bảng A trỏ sang B, cần gì để đảm bảo quan hệ 1–1?
A. FK NOT NULL là đủ B. Không cần gì C. Chỉ cần INDEX trên FK D. FK phải UNIQUE (và thêm NOT NULL nếu A tham gia toàn phần)
**Đáp án: D.**

**65.** CID các môn Dept='CS' mà có ít nhất một SV GPA < 2.0 đăng ký.
A. `π_{CID}(σ_{Dept='CS' ∧ GPA<2.0}(C ⋈ E))` B. `π_{CID}(σ_{GPA<2.0}(S))` C. `π_{CID}(σ_{Dept='CS' ∧ GPA<2.0}(S ⋈ E ⋈ C))` D. `π_{CID}(σ_{Dept='CS'}(C)) − π_{CID}(σ_{GPA<2.0}(S ⋈ E))`
**Đáp án: C.** Nhiễu: A D2 (C ⋈ E không có GPA), B D2+D13, D ngược nghĩa.

**66.** (song ngữ) Giống câu 33. **Đáp án: C** `π_{SID,CID}(σ_{GPA>3.0}(S ⋈ E))`.

**67.** Name của SV Major='IS' nhưng KHÔNG đăng ký bất kỳ môn nào thuộc Dept='IS'.
A. `π_{Name}(σ_{Dept='IS'}(S ⋈ E ⋈ C)) − π_{Name}(σ_{Major='IS'}(S))` B. ∩ C. `π_{Name}(σ_{Major='IS' ∧ Dept='IS'}(…))`
D. `π_{Name}(σ_{Major='IS'}(S)) − π_{Name}(σ_{Major='IS' ∧ Dept='IS'}(S ⋈ E ⋈ C))`
**Đáp án: D.**

**68.** PERSON có thể vừa STUDENT vừa EMPLOYEE (chồng lấp). Thiết kế hỗ trợ chồng lấp tốt? **Đáp án: A** (PERSON + STUDENT + EMPLOYEE, bảng con PK/FK về PERSON).

**69.** Tên SV đăng ký môn có Title='Database'.
A. `π_{Name}(σ_{Title='Database'}(S ⋈ E ⋈ C))` B. `π_{Name}(σ_{…}(E ⋈ C))` C. `π_{Name}(S ⋈ E)` D. `π_{Name}(σ_{Title='Database'}(S))`
**Đáp án: A.**

**70.** (song ngữ) Giống câu 63. **Đáp án: C** `π_{SID,Name}(σ_{Major='CS'}(S))`.

**71.** Giống câu 28. **Đáp án: B** `π_{CID}(σ_{Dept<>'CS' ∧ Semester='2025_Spring'}(C ⋈ E))`.

**72.** (S, INSTRUCTOR, ADVISE) IName của giảng viên cố vấn ít nhất một SV có GPA < 2.0.
A. `π_{IName}(I ⋈ ADVISE) − π_{IName}(σ_{GPA<2.0}(S))` B. `σ_{GPA<2.0}(π_{IName}(…))` C. `π_{IName}(I) − π_{IName}(σ_{GPA<2.0}(ADVISE ⋈ S))` D. `π_{IName}(σ_{GPA<2.0}(I ⋈ ADVISE ⋈ S))`
**Đáp án: D.**

**73.** (S, C, PREREQ, E) CID các môn có ít nhất một đăng ký và không phải là môn tiên quyết của bất kỳ môn nào.
A. `π_{CID}(E) ∩ ρ_{CID}(π_{PreCID}(PREREQ))` B. ∪ C. `π_{CID}(E) − ρ_{CID}(π_{PreCID}(PREREQ))` D. `π_{CID}(E) − π_{PreCID}(PREREQ)`
**Đáp án: C.** Nhiễu: D D10 (thiếu ρ nên tên cột không khớp).

**74.** Nếu mọi EMP bắt buộc thuộc một DEPT, thiết kế cần gì?
A. Không biểu diễn được B. DEPTID trong EMP phải NOT NULL và là FK C. Cần bảng phụ EMP_DEPT D. DEPTID trong DEPT phải NOT NULL
**Đáp án: B.**

---

## Bảng đáp án nhanh
| 1 C | 2 B | 3 A | 4 D | 5 A | 6 B | 7 C | 8 (lỗi) | 9 B | 10 C |
|---|---|---|---|---|---|---|---|---|---|
| 11 D | 12 C (B tương đương) | 13 D | 14 C | 15 D | 16 A | 17 D | 18 D | 19 A | 20 A |
| 21 A | 22 B | 23 C | 24 D | 25 A | 26 B | 27 C | 28 D | 29 D | 30 A |
| 31 D | 32 C | 33 C | 34 C | 35 D | 36 C | 37 A | 38 B | 39 D | 40 A |
| 41 D | 42 C | 43 B | 44 A | 45 C | 46 B | 47 C (đề có vấn đề) | 48 B | 49 B | 50 B |
| 51 D | 52 A | 53 A | 54 A | 55 B | 56 B | 57 D | 58 A | 59 B | 60 B |
| 61 B | 62 A | 63 D | 64 D | 65 C | 66 C | 67 D | 68 A | 69 A | 70 C |
| 71 B | 72 D | 73 C | 74 B | | | | | | |
