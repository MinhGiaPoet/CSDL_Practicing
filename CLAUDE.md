# CSDL_Practicing

Repo ôn tập môn Cơ sở dữ liệu (PTIT) của người dùng. Trao đổi bằng tiếng Việt. Cấu trúc thư mục xem `README.md`.

- `BaiGiang/`: slide bài giảng theo chương (file 01–06, 08, 09, 11).
  `BaiGiang/Chuong2_MoHinhDuLieu/11_SQL_TruyVanCoBan.pdf`: SQL truy vấn cơ bản (SELECT một bảng, NULL, ORDER BY, các
  loại JOIN, biến bộ, UNION/INTERSECT/EXCEPT). `11_SQL_TruyVanCoBan_BangTraCuu.md` cạnh đó là bảng cú pháp và quy tắc
  thực dụng rút từ file này; khi người dùng hỏi cú pháp SQL hoặc nhờ ra bài SQL thì dùng file đó.
  `BaiGiang/Chuong3_PhuThuocHam/08_PhuThuocHam.pdf` là Chương 3, Bài 6 "Phụ thuộc hàm": ôn RA và ràng buộc, định nghĩa FD,
  hệ tiên đề Armstrong, khóa và siêu khóa, bao đóng, thuật toán tìm mọi khóa, phủ tối thiểu, phép chiếu FD.
  Khi người dùng nhờ giảng lại bài này: giảng từng phần ngắn, có ví dụ và câu tự kiểm tra, bám theo slide.
  `BaiGiang/Chuong3_PhuThuocHam/09_ChuanHoa_CacDangChuan.pdf` (học 16/10/2026, slide ghi "Chương 2 — Các dạng chuẩn hóa"
  nhưng là phần tiếp của bài FD): bất thường, phân rã, kết nối không mất mát, bảo toàn phụ thuộc, 1NF/2NF/3NF/BCNF
  (ví dụ INVOICE, Movie). Giảng lại theo cùng cách như file 08.
- `BaiTap/RA_NangCao/`: bài tập nâng cao đại số quan hệ (file 07) và lời giải Word.
- `BuoiHoc/<ngày>_<chủ đề>/`: ghi hình buổi học và `GiaoBai.md` (bài được giao, nơi nộp, deadline).
  `BuoiHoc/2026-10-23_PhanRa_BCNF_3NF/`: buổi cô chiếu bản slide chuẩn hóa mới (55 trang, repo chưa có PDF, chỉ có ảnh
  slide 36–53 trong `Anh/`). `GhiChep.md` ở đó chép lại thuật toán phân rã BCNF, tổng hợp 3NF và giải đủ 11 bài slide 48;
  khi giảng giai đoạn F4–F6 của lộ trình thì dùng file này.
- `DeThi/`: hướng dẫn ra đề và ngân hàng câu hỏi chép lại từ hai bài kiểm tra; ảnh gốc nén trong `DeThi/AnhGoc/`.

**Học lại từ đầu (từ 16/10/2026):** người dùng đang học theo `LoTrinhHoc.md`. Đầu mỗi phiên đọc file đó để biết đang ở
bài nào; giảng theo phần "Cách học" trong file; học xong bài nào thì đổi trạng thái và ghi một dòng vào Nhật ký.

Khi thêm file mới: đặt đúng thư mục theo quy ước trong `README.md` và cập nhật cây thư mục ở đó.

**Khi người dùng nhờ tạo đề luyện / đề thi thử:** đọc `DeThi/HUONG_DAN_RA_DE.md` trước, xem vài câu mẫu trong
`DeThi/NganHang_Test2_RA.md` (đề RA) hoặc `DeThi/NganHang_Test1_EER.md` (đề ánh xạ ER), rồi ra đề đúng phong cách đó.
