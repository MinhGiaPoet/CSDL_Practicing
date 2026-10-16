# Lộ trình học lại CSDL từ đầu

Bắt đầu: 16/10/2026. Học chậm, hiểu chắc, không còn ôn chống cháy.

## Cách học

- Mỗi lần **một bài**, khoảng 20–30 phút. Mỗi bài chia vài mục ngắn, có ví dụ đời thường và **câu tự kiểm tra** ở cuối.
- Bám theo slide của cô Đỗ Thanh Hà, ghi rõ số slide. Phần Claude tự thêm ngoài slide được đánh dấu **(bổ sung)**.
- Trả lời câu tự kiểm tra trước khi gõ **"tiếp"**. Chỗ nào chưa hiểu thì hỏi lại ngay, Claude giảng lại bằng cách khác
  (ví dụ nhỏ hơn, có hình), không nhắc lại y nguyên.
- Bảng ví dụ giữ nhỏ (3–4 hàng). Bảng to thì đi từng bước.
- Cuối mỗi giai đoạn có một bài luyện tập theo kiểu đề thật trong `DeThi/`.

Ký hiệu trạng thái: ⬜ chưa học · 🟨 đang học · ✅ xong.

## Giai đoạn A. Chương 1: Khái niệm cơ bản (file 01, 02)

| # | Bài | Slide | |
|---|---|---|---|
| A1 | CSDL là gì, vì sao không lưu bằng tệp thường | 01: 3–18, 22–23 | 🟨 |
| A2 | Hệ quản trị CSDL (DBMS): 5 chức năng, hệ CSDL gồm 4 thành phần | 01: 19–20 | ⬜ |
| A3 | Các mô hình CSDL qua thời gian: tệp, phân cấp, mạng, quan hệ, hướng đối tượng, NoSQL | 01: 21–28 | ⬜ |
| A4 | Bên trong DBMS: lưu trữ và siêu dữ liệu, bộ quản lý lưu trữ, bộ xử lý truy vấn, giao dịch ACID | 01: 35–41 · 02: 3–8 | ⬜ |
| A5 | Dữ liệu và thông tin; dữ liệu lưu trữ và dữ liệu dẫn xuất | 01: 42–45 · 02: 9–13 | ⬜ |
| A6 | Con người và triển khai: DA, DBA, người dùng; ưu nhược của DBMS; On-Premise và Cloud | 02: 14–25 | ⬜ |
| A7 | Kiến trúc 3 mức, lược đồ và thể hiện, ánh xạ giữa các mức | 02: 26–36 | ⬜ |

## Giai đoạn B. Mô hình thực thể liên kết ER và EER (file 03, 04)

| # | Bài | Slide | |
|---|---|---|---|
| B1 | Mô hình dữ liệu: 3 thành phần, phân loại, quy trình thiết kế CSDL | 03: 3–9 | ⬜ |
| B2 | Bài toán "Công ty"; thực thể, tập thực thể, các loại thuộc tính | 03: 10–18 | ⬜ |
| B3 | Liên kết, bản số (min, max), 1:1 / 1:N / M:N, ràng buộc tham gia | 03: 19–30 | ⬜ |
| B4 | Thực thể yếu: thực thể định danh, khóa bộ phận | 03: 31–32 · 04: 25–28 | ⬜ |
| B5 | Tỉ lệ lực lượng ảnh hưởng tới khóa; đặt thuộc tính của liên kết ở đâu | 04: 5–19 | ⬜ |
| B6 | Tinh chỉnh lược đồ: thực thể hay thuộc tính, liên kết hay thực thể | 04: 20–24 | ⬜ |
| B7 | ER mở rộng: cụ thể hóa, tổng quát hóa, kế thừa, 3 loại ràng buộc | 04: 29–39 | ⬜ |
| B8 | Kết hợp, liên kết nhiều ngôi, ER và UML, toàn vẹn tham chiếu | 04: 40–61 | ⬜ |
| B9 | Tổng kết và luyện vẽ ER từ đề bài | 04: 62–66 · 03: 33 | ⬜ |

## Giai đoạn C. Mô hình quan hệ và ánh xạ ER → quan hệ (file 05)

| # | Bài | Slide | |
|---|---|---|---|
| C1 | Quan hệ: định nghĩa, thuật ngữ, đặc tính, khác bảng SQL, lược đồ và thể hiện | 05: 3–15 | ⬜ |
| C2 | Khóa; 3 ràng buộc toàn vẹn; xử lý khi vi phạm tham chiếu | 05: 16–18 | ⬜ |
| C3 | Ánh xạ bước 1–3: thực thể mạnh, thực thể yếu, liên kết nhị phân | 05: 19–33 | ⬜ |
| C4 | Ánh xạ bước 4–7: thực thể kết hợp, đệ quy, nhiều ngôi, lớp cha/lớp con | 05: 34–51 | ⬜ |
| C5 | Áp dụng cho bài Công ty + luyện đề kiểu Test 1 (EER) | 05: 52–58 · `DeThi/NganHang_Test1_EER.md` | ⬜ |

## Giai đoạn D. SQL, đại số quan hệ, ràng buộc (file 06, 07)

| # | Bài | Slide | |
|---|---|---|---|
| D1 | Phát hiện lỗi thiết kế (ví dụ ngân hàng); SQL tạo bảng, PRIMARY KEY, UNIQUE, NULL | 06: 3–21 | ⬜ |
| D2 | Vì sao cần RA; σ (chọn) và π (chiếu) | 06: 22–24, 29–31 | ⬜ |
| D3 | Khả hợp; ∪, ∩, − | 06: 25–28 | ⬜ |
| D4 | × (tích), ⋈ (kết tự nhiên), ⋈θ, ρ (đổi tên) | 06: 32–36 | ⬜ |
| D5 | Cây biểu thức, đối chiếu với SQL, đếm số bộ của kết quả | 06: 37–39 (+ bổ sung) | ⬜ |
| D6 | Phép chia ÷, các câu "tất cả", "chưa từng" | 07 (+ bổ sung) | ⬜ |
| D7 | Bài tập Product/PC/Laptop/Printer và bài tập file 07 | 06: 40–41 · 07 | ⬜ |
| D8 | Ràng buộc bằng RA ("tập vi phạm rỗng") + luyện đề kiểu Test 2 (RA) | 06: 42–52 · `DeThi/NganHang_Test2_RA.md` | ⬜ |

## Giai đoạn E. Phụ thuộc hàm (file 08)

| # | Bài | Slide | |
|---|---|---|---|
| E1 | Vì sao cần FD; định nghĩa; FD tầm thường | 08: 11–17 | ⬜ |
| E2 | Hệ tiên đề Armstrong và quy tắc suy diễn | 08: 18–22 | ⬜ |
| E3 | Khóa, siêu khóa, thuộc tính khóa | 08: 23–26 | ⬜ |
| E4 | Bao đóng của tập thuộc tính | 08: 27–31 | ⬜ |
| E5 | Thuật toán tìm mọi khóa (nhóm L/M/R/N) | 08: 32–37 | ⬜ |
| E6 | Phủ tối thiểu, phép chiếu FD + bài tập slide 44 | 08: 38–45 | ⬜ |

## Giai đoạn F. Chuẩn hóa (file 09)

| # | Bài | Slide | |
|---|---|---|---|
| F1 | Bất thường; phân rã; kết nối không mất mát; bảo toàn phụ thuộc | 09: 4–12 | ⬜ |
| F2 | 1NF và 2NF (ví dụ hóa đơn INVOICE) | 09: 13–24 | ⬜ |
| F3 | 3NF và BCNF; khi nào 3NF khác BCNF | 09: 25–34 | ⬜ |

Khi cô phát slide tiếp (thuật toán phân rã BCNF, tổng hợp 3NF…), thêm bài vào giai đoạn F.

## Nhật ký

- 16/10/2026: lập lộ trình, bắt đầu A1.
