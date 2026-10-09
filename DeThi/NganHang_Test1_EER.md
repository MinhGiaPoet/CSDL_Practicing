# Ngân hàng đề Test 1: "Chương 1 và Mô hình EER" (55 câu)

Chép tóm tắt từ 32 ảnh trong `FirstTestCSDL.7z` (không có đủ 55 câu). Đáp án do Claude tự giải.
Gần như toàn bộ là dạng **"Cho lược đồ ER (hình vẽ), ánh xạ nào sang mô hình quan hệ là đúng?"**.
Đáp án viết dạng `TABLE(Col PK, Col FK→REF NOT NULL UNIQUE, …, PK(a,b))`.

## Nhận xét cách ra đề
- Đáp án đúng thường là **đáp án đầy đủ nhất**: có `FK→BẢNG`, `NOT NULL` khi bên đó vẽ nét đôi (tham gia toàn phần),
  `UNIQUE` cho 1:1, `PK(...)` đủ thành phần.
- Đáp án nhiễu điển hình: FK đặt sai phía; M:N không có bảng trung gian; PK bảng trung gian sai (chỉ 1 cột, hoặc là thuộc tính liên kết);
  đa trị lưu thành `TEXT`, `Phone1/2/3`, hoặc bảng riêng thiếu FK; gộp mọi thứ vào một bảng; ISA bỏ bảng cha hoặc con dùng PK riêng;
  thực thể yếu thiếu PK của bảng chủ; thuộc tính phức hợp giữ nguyên tên cha thay vì tách cột con.
- Có câu song ngữ ("Given the following ERD, which relational mapping is correct? (Cho lược đồ ERD, ánh xạ đúng sang mô hình quan hệ là:)").
- Ký hiệu ERD dùng trong đề: chữ nhật đôi = thực thể yếu, thoi đôi = liên kết định danh, elip đôi = đa trị,
  elip có nhánh con = phức hợp, gạch chân nét đứt = khóa bộ phận, nét đôi = tham gia toàn phần, `0..1`, `1`, `N`, `M`,
  chân chim (crow's foot), mũi tên chỉ phía "một", tam giác ISA (có ghi Overlapping / nét đôi = toàn bộ).

## Các câu đã thấy và đáp án

| Câu | Nội dung ERD | Đáp án đúng (tóm tắt) |
|---|---|---|
| 2 | Employee —Works_On (phức hợp Assignment: StartDate, Role, EndDate)— Project (M:N); Project —located_in— Office (N:1, Project toàn phần) | **D**: PROJECT(…, OfficeID FK→OFFICE NOT NULL); WORKS_ON(EmpID FK, ProjectID FK, StartDate, EndDate, Role, PK(EmpID, ProjectID)) |
| 3 | Professor `0..1` —chairs— `1` Department (Department nét đôi) | **C**: DEPARTMENT(DeptID PK, DeptName, ChairProfID FK→PROFESSOR NOT NULL UNIQUE) |
| 5 | Citizen `0..1` —owns(IssueDate)— `1` Passport (Passport nét đôi) | **B**: PASSPORT(PassportNo PK, IssueDate, CID FK→CITIZEN NOT NULL UNIQUE) |
| 8 | Department ← manages — Project (nhiều Project, một Department) | **B**: PROJECT(ProjectID PK, DeptID FK REFERENCES DEPARTMENT, …) |
| 17 | COURSE(CID, Title, đa trị Topic), PREREQ đệ quy M:N có MinGrade | **C**: COURSE(CID PK, Title); COURSE_TOPIC(CID FK, Topic, PK(CID,Topic)); PREREQ(CID FK, PreCID FK, MinGrade, PK(CID,PreCID)) |
| 18 | Customer `1` —owns— `N` Account (Account nét đôi), Account có phức hợp Period(OpenDate, CloseDate) | **C**: ACCOUNT(AccNo PK, CustID FK→CUSTOMER NOT NULL, OpenDate, CloseDate) |
| 19, 28 | Vendor N —signs(SignDate)— M Contract; Contract N (nét đôi) —belongs_to— 1 Country | **D** (câu 19) / **C** (câu 28): CONTRACT(…, CountryID FK→COUNTRY NOT NULL); SIGNS(VID FK, ConID FK, SignDate, PK(VID, ConID)) |
| 20 | Thuộc tính đa trị Phone của Employee | **D**: EMP_PHONE(EID, Phone), PK(EID, Phone), EID FK→EMPLOYEE |
| 21 | Doctor N —treats(VisitDate, DiagnosisNote)— M Patient | **C** theo quy tắc M:N chuẩn (PK(DID, PID)). D đưa VisitDate vào PK để một bác sĩ khám một bệnh nhân nhiều lần; nếu đề muốn mô hình nhiều lần khám thì D. Ghi chú: chưa chắc giảng viên chọn đáp án nào |
| 22 | Student 1 —Has— N Transcript (yếu, khóa bộ phận Term), Transcript có đa trị NoteNo | **A**: TRANSCRIPT(SID FK, Term, GPA, PK(SID, Term)); TRANSCRIPT_NOTE(SID, Term, NoteNo, PK(SID, Term, NoteNo)) |
| 23 | Product có đa trị Tag | **C**: PRODUCT_TAG(PID FK, Tag, PK(PID, Tag)) |
| 24 | Library —registers— Member (Member toàn phần, N:1); Member —borrows— Book (M:N) | **A**: MEMBER(…, LibraryID FK→LIBRARY NOT NULL); BORROWS(MemberID FK, BookID FK, PK(MemberID, BookID)) |
| 26 | Employee —has— Dependent (thực thể yếu) | **C**: DEP(EID FK, DepName, BirthDate, PK(EID, DepName)) |
| 27 | Student —enrolls(EnrollmentDate)— Course | **B**: ENROLL(SID FK, CID FK, EnrollmentDate, PK(SID, CID)) |
| 31 | ISA Overlapping: Person(PID, Name, DOB) → Student(Major), Teacher(Salary) | **A**: PERSON; STUDENT(PID PK/FK→PERSON, Major); TEACHER(PID PK/FK→PERSON, Salary) |
| 33 | Tam phân prescribes (Dose, Date) giữa Doctor, Patient, Medication | **D**: PRESC(DoctorID FK, PatientID FK, MedID FK, Dose, Date, PK(DoctorID, PatientID, MedID, Date)) |
| 34 | Tam phân Supply(Price) giữa Farmer, Crop, Market; Market có đa trị phức hợp ContactPhone(PhoneType, PhoneNumber) | **A**: MARKET_PHONE(MarketID FK, PhoneType, PhoneNumber, PK(MarketID, PhoneNumber)); SUPPLY(FarmerID FK, CropID FK, MarketID FK, Price, PK(FarmerID, CropID, MarketID)) |
| 35 | Company —employs— Employee (yếu), Employee —has— Dependent (yếu), Dependent —enrolls— Insurance (yếu) | **C**: khóa lan dần: EMPLOYEE PK(CompID, EmpID); DEPENDENT PK(CompID, EmpID, DepName); INSURANCE PK(CompID, EmpID, DepName, InsuranceType), FK đầy đủ |
| 36 | ISA toàn bộ (nét đôi): Person → Student, Staff | **C**: PERSON; STUDENT(PID PK/FK→PERSON); STAFF(PID PK/FK→PERSON) |
| 40 | Thuộc tính dẫn xuất xử lý thế nào? | **B**: bỏ qua, tính bằng view / truy vấn khi cần |
| 41 | NHANVIEN —THAMGIA(VAITRO)— DUAN | **B**: THAMGIA(NVID FK, DID FK, VaiTro, PK(NVID, DID)) |
| 42 | Hospital —admits— Patient (Patient toàn phần); Patient —diagnosed_with— Disease (M:N) | **D**: PATIENT(…, HospitalID FK→HOSPITAL NOT NULL); DIAGNOSED_WITH(PatientID FK, DiseaseID FK, PK(PatientID, DiseaseID)) |
| 44 | Team —participates(Result)— Tournament (M:N) | **C**: PARTICIPATE(TID FK, TrID FK, Result, PK(TID, TrID)) |
| 45 | Airline —Operates(Date)— Flight; Flight —Lands(Time)/Departs(Time)— Airport | **C**: có bảng DEPARTS, LANDS, OPERATES riêng với FK đầy đủ |
| 47 | Hotel 1 —has— N Room (yếu, khóa bộ phận RoomNo); Room N —reserved_by(ResvDate)— M Guest | **A**: ROOM(HotelID FK, RoomNo, Type, PK(HotelID, RoomNo)); RESERVATION(HotelID, RoomNo, GuestID, ResvDate, PK(HotelID, RoomNo, GuestID, ResvDate)) |
| 48 | Thuộc tính đa trị biểu diễn bằng? | **D**: hình elip đôi |
| 49 | Building có phức hợp Address(Street, City, ZIPcode) và đa trị FacilityName | **C**: BUILDING(BuildingID PK, Street, City, Zip); BUILDING_FACILITY(BuildingID FK, FacilityName, PK(BuildingID, FacilityName)) |
| 50 | ISA: Vehicle(VID) → Car(Seats), Truck(Capacity) | **A**: CAR(VID PK/FK→VEHICLE, Seats); TRUCK(VID PK/FK→VEHICLE, Capacity) |
| 51 | ISA toàn bộ: Animal(AID) → Dog(Breed), Cat(Color) | **D**: ANIMAL; DOG(AID PK/FK→ANIMAL, Breed); CAT(AID PK/FK→ANIMAL, Color) |
| 54 | Customer đệ quy refers (N — 0..1) | **D**: CUSTOMER(CustID PK, Name, ReferrerID FK→CUSTOMER NULL) |
| 55 | Supplier —supplies(Price)— Part | **D**: SUPPLY(SID FK, PID FK, Price, PK(SID, PID)) |
