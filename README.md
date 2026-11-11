# CSDL_Practicing

Tài liệu ôn tập môn **Cơ sở dữ liệu** (PTIT, cô Đỗ Thanh Hà).

## Cấu trúc

```
LoTrinhHoc.md                     Lộ trình học lại từ đầu (từ 16/10/2026), có đánh dấu tiến độ
BaiGiang/                         Slide bài giảng, xếp theo chương
├── Chuong1_KhaiNiemCoBan/
│   ├── 01_KhaiNiemCoBan_Phan1.pdf
│   └── 02_KhaiNiemCoBan_Phan2.pdf
├── Chuong2_MoHinhDuLieu/
│   ├── 03_MoHinhThucTheLienKet_ER.pdf
│   ├── 04_ER_TinhChinh_EER.pdf
│   ├── 05_MoHinhQuanHe_AnhXaER.pdf
│   └── 06_SQL_DaiSoQuanHe_RangBuoc.pdf
└── Chuong3_PhuThuocHam/
    ├── 08_PhuThuocHam.pdf         Bài 6: phụ thuộc hàm (9/10/2026)
    └── 09_ChuanHoa_CacDangChuan.pdf  Chuẩn hóa: 1NF, 2NF, 3NF, BCNF (16/10/2026)
BaiTap/
└── RA_NangCao/
    ├── 07_BaiTapNangCao_DaiSoQuanHe.pdf
    └── LoiGiai_07_DaiSoQuanHe.docx
BuoiHoc/                          Ghi hình và ghi chú từng buổi (YYYY-MM-DD_ChuDe)
├── 2026-10-09_PhuThuocHam/
│   ├── GhiHinh_19h13.mp4
│   └── GiaoBai.md                 Bài cô giao, nộp Classroom, hạn 12h đêm thứ 2 (12/10)
└── 2026-10-23_PhanRa_BCNF_3NF/
    ├── Anh/                       18 ảnh: slide 36–53 (bản 55 trang) và bảng phấn chữa bài
    └── GhiChep.md                 Phân rã BCNF, tổng hợp 3NF, lời giải 11 bài slide 48
DeThi/
├── HUONG_DAN_RA_DE.md            Phong cách ra đề, rút từ 3 đề thật (mục 8: đề giữa kỳ trên giấy)
├── NganHang_Test1_EER.md
├── NganHang_Test2_RA.md
├── NganHang_GiuaKy_MaDe104.md    Đề giữa kỳ mã 104: đáp án, nhận xét bài làm, biến thể mã 103
├── GiuaKy_MaDe104/               Đề giữa kỳ dựng lại từ ảnh, chữ bôi đen được
│   ├── DeGiuaKy_CSDL_MaDe104.pdf
│   ├── DeGiuaKy_CSDL_MaDe104.docx
│   └── nguon/                     LaTeX (PDF), taoDocx.js (Word), build.sh dựng lại cả hai
├── DeLuyen_GiuaKy/               10 đề thi thử mã 201–210, cùng khung với mã 104
│   ├── DeLuyen_GiuaKy_MaDe201.pdf, .docx … DeLuyen_GiuaKy_MaDe210.pdf, .docx
│   ├── DapAn_DeLuyen_GiuaKy.md    Đáp án 10 đề (tính tự động, có lý do)
│   └── nguon/                     cacDe.py (đặc tả đề), nganHangA.py (câu trắc nghiệm), taoDe.py, taoDocx.js, build.sh
└── AnhGoc/                       Ảnh chụp đề thật (nén)
    ├── Test1_EER_FirstTestCSDL.7z
    ├── Test2_RA_2026-10-09.rar
    └── GiuaKy_MaDe104.7z          7 ảnh đề giữa kỳ (ảnh 04 là trang 3 mã đề 103)
```

## Quy ước

- Slide đánh số `NN_` theo thứ tự cô phát, tên file mô tả nội dung (không dấu, không khoảng trắng).
- Mỗi buổi học có thư mục riêng trong `BuoiHoc/`, tên bắt đầu bằng ngày.
- Bài tập không gắn với buổi học cụ thể để trong `BaiTap/`; lời giải để cạnh đề.
