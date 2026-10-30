# Bảng tra cứu SQL: truy vấn cơ bản (file 11)

Lọc từ `11_SQL_TruyVanCoBan.pdf` (50 slide, cô Đỗ Thanh Hà), chỉ giữ những gì cần để **viết được câu SELECT**.
Bỏ phần lịch sử SQL, các phiên bản chuẩn, các nhóm DDL/DML/DCL. Số trong ngoặc là số slide.
Chỗ nào Claude tự thêm ngoài slide ghi **(bổ sung)**.

Chưa có trong file này (slide 49 hẹn phần sau): truy vấn con, `COUNT/SUM/AVG`, `GROUP BY`, `HAVING`.

---

## 1. Khung câu lệnh và thứ tự chạy

```sql
SELECT   [DISTINCT] cot1, bieu_thuc AS bi_danh, ...   -- 3. tính cột, đặt bí danh   4. bỏ trùng
FROM     bang1 b1
         [INNER | LEFT | RIGHT | FULL] JOIN bang2 b2
         ON b1.khoa = b2.khoa                          -- 1. lấy dữ liệu
WHERE    dieu_kien_loc_hang                            -- 2. lọc hàng
ORDER BY cot [ASC | DESC], ...                         -- 5. sắp xếp
[OFFSET m ROWS] [FETCH FIRST n ROWS ONLY];             -- 6. cắt số dòng
```

**Viết** theo thứ tự trên, nhưng **chạy** theo: `FROM → WHERE → SELECT → DISTINCT → ORDER BY` (10).

| Hệ quả | Đúng / Sai | Ví dụ (11) |
|---|---|---|
| Bí danh cột **không** dùng được trong `WHERE` (WHERE chạy trước SELECT) | ❌ | `SELECT price*23000 AS vnd FROM Products WHERE vnd > 1000000;` → lỗi |
| Sửa: lặp lại biểu thức trong WHERE | ✅ | `... WHERE price*23000 > 1000000;` |
| Bí danh cột **dùng được** trong `ORDER BY` | ✅ | `... ORDER BY vnd DESC;` |
| ORDER BY theo số thứ tự cột (được, nhưng dễ hỏng khi sửa danh sách cột) | ⚠️ | `ORDER BY 2 DESC` |

**Gỡ lỗi (13):** thiếu/thừa **hàng** → xem `FROM`/`WHERE`; sai/thiếu **cột** → xem `SELECT`.

---

## 2. Mệnh đề SELECT (phép chiếu)

| Muốn | Cú pháp | Ghi chú |
|---|---|---|
| Lấy mọi cột | `SELECT * FROM Persons;` | Chỉ dùng khi thử. Trong chương trình nên liệt kê cột (14) |
| Lấy vài cột | `SELECT LastName, FirstName FROM Persons;` | |
| Đổi tên cột | `SELECT Name AS "Product's Name"` | Bí danh có dấu cách/ký tự lạ → bọc `"..."` (15) |
| Cột tính toán | `SELECT Price*23000 AS "Price in VND"` | Chỉ tồn tại trong kết quả, không thêm vào bảng (16) |
| Bỏ hàng trùng | `SELECT DISTINCT City FROM Persons;` | Mặc định là `ALL` (giữ trùng). DISTINCT coi các NULL là **trùng nhau** → còn 1 NULL (12, 17) |

**Nháy đơn và nháy kép (15), lỗi rất hay gặp:**

| Ký hiệu | Nghĩa | Ví dụ |
|---|---|---|
| `'...'` | **giá trị chuỗi** | `WHERE City = 'Sandnes'` |
| `"..."` | **tên đối tượng** (cột, bí danh) | `AS "Price in VND"` |
| `` `...` `` | tên đối tượng trong [MySQL] | |
| `[...]` | tên đối tượng trong [T-SQL] | |

---

## 3. Mệnh đề WHERE (phép chọn σ)

WHERE chỉ giữ hàng cho kết quả **TRUE**. Hàng cho FALSE **hoặc UNKNOWN** đều bị loại (18).

| Nhóm | Toán tử | Ví dụ | Lưu ý |
|---|---|---|---|
| So sánh | `= <> < > <= >=` | `salary >= 10000` | `<>` là chuẩn; `!=` chỉ là bí danh |
| Khoảng | `BETWEEN a AND b` | `salary BETWEEN 2500 AND 3500` | **Gồm cả hai đầu mút** |
| Tập hợp | `IN (v1, v2, ...)` | `job_id NOT IN ('IT_PROG','SA_REP')` | Cẩn thận khi danh sách có NULL (mục 6) |
| Mẫu | `LIKE` | `job_id LIKE '%MAN%'` | Xem mục 4 |
| Rỗng | `IS NULL`, `IS NOT NULL` | `manager_id IS NULL` | **Không** viết `= NULL` |
| Logic | `AND OR NOT` | | Logic **ba** giá trị (mục 6) |

---

## 4. Chuỗi và khớp mẫu LIKE

| Ký tự | Khớp | Ví dụ (20) |
|---|---|---|
| `%` | 0 hoặc nhiều ký tự bất kỳ | `'Star%'` khớp *Star*, *Star Wars* |
| `_` | đúng 1 ký tự bất kỳ | `'_____'` khớp mọi chuỗi đúng 5 ký tự |

```sql
SELECT title FROM Movies WHERE title LIKE 'Star %';               -- bắt đầu bằng 'Star' và 1 dấu cách
SELECT title FROM Movies WHERE title LIKE '%100\%%' ESCAPE '\';   -- tìm đúng chuỗi '100%'
SELECT title FROM Movies WHERE title LIKE 'S%' OR title LIKE 'G%'; -- bắt đầu bằng S hoặc G (21)
```

| Quy tắc | Slide |
|---|---|
| `'Star%'` khớp cả chính chữ *Star* (vì `%` khớp chuỗi rỗng) | 20 |
| Có phân biệt hoa thường hay không là do **collation** của CSDL, không do LIKE. [PostgreSQL] có `ILIKE` để không phân biệt | 9, 20 |
| `LIKE '[SG]%'` **chỉ chạy trên [T-SQL]**. Viết chuẩn: `LIKE 'S%' OR LIKE 'G%'`. Đừng viết `[S,G]`: dấu phẩy cũng bị tính là một ký tự | 21 |
| Mẫu bắt đầu bằng `%` không dùng được chỉ mục → quét cả bảng, chậm | 20 |
| Chuỗi tiếng Việt: `N'Bình Chánh'` (chữ N **trước** dấu nháy). [T-SQL] bắt buộc khi so với cột `NVARCHAR` | 19 |
| `CHAR(10)` có `'abc'` so với `'abc   '`: kết quả tùy collation (PAD SPACE / NO PAD), không do CHAR hay VARCHAR | 19 |

---

## 5. Ngày giờ

| Kiểu | Viết chuẩn (ISO 8601) | Slide |
|---|---|---|
| `DATE` | `DATE '1948-05-14'` | 22 |
| `TIME` | `TIME '15:00:02'` | 22 |
| `TIMESTAMP` | `TIMESTAMP '1948-05-14 12:00:02'` | 22 |

**Luôn viết `YYYY-MM-DD`.** `'03/04/2024'` là 3/4 hay 4/3 tùy cài đặt máy.

Lọc theo **tháng**: dùng khoảng nửa mở `>= đầu tháng AND < đầu tháng sau` (22):

```sql
SELECT * FROM Orders
WHERE OrderDate >= DATE '2000-05-01'
  AND OrderDate <  DATE '2000-06-01';
```

(bổ sung) Lý do không dùng `BETWEEN '2000-05-01' AND '2000-05-31'`: nếu cột là TIMESTAMP thì `'2000-05-31 15:00'` lớn hơn
`'2000-05-31'` và bị sót.

---

## 6. NULL và logic ba giá trị (phần dễ mất điểm nhất)

NULL là **ký hiệu "không có giá trị"**, không phải một giá trị (23).

| Biểu thức | Kết quả (23) |
|---|---|
| `NULL + 10` | `NULL` |
| `NULL = NULL` | **UNKNOWN** |
| `NULL <> 10` | **UNKNOWN** |
| `'abc' \|\| NULL` | `NULL` |
| `x IS NULL` | TRUE / FALSE (không bao giờ UNKNOWN) |

**Logic ba giá trị (24)**, chỉ cần nhớ 3 dòng:

| Quy tắc | Vì sao |
|---|---|
| `TRUE OR UNKNOWN = TRUE` | một vế đã TRUE thì OR chắc chắn TRUE |
| `FALSE AND UNKNOWN = FALSE` | một vế đã FALSE thì AND chắc chắn FALSE |
| `NOT UNKNOWN = UNKNOWN` | phủ định **không** cứu được hàng bị loại |

Còn lại: có UNKNOWN mà chưa quyết được thì kết quả là UNKNOWN (`TRUE AND U = U`, `FALSE OR U = U`).

**Ba cái bẫy:**

| Bẫy | Viết sai | Viết đúng | Slide |
|---|---|---|---|
| So sánh với NULL | `WHERE manager_id = NULL` → luôn 0 dòng | `WHERE manager_id IS NULL` | 23 |
| Điều kiện "bao trùm" vẫn sót hàng | `WHERE length <= 120 OR length > 120` → sót phim có length NULL | thêm `OR length IS NULL` | 25 |
| `NOT IN` gặp NULL | `5 NOT IN (SELECT x FROM J)` với J = {1, 2, NULL} → **0 dòng** | dùng `NOT EXISTS`, hoặc thêm `WHERE x IS NOT NULL` vào truy vấn con | 26 |

Hàm hữu ích (23): `COALESCE(x, gia_tri_mac_dinh)` thay NULL bằng giá trị mặc định;
`a IS [NOT] DISTINCT FROM b` so sánh mà coi hai NULL là bằng nhau.

Hai ngữ cảnh, hai quy tắc (17): trong `WHERE` hai NULL **không** bằng nhau; trong `DISTINCT`, `GROUP BY`, `UNION` hai NULL
được coi là **trùng**.

---

## 7. ORDER BY

```sql
ORDER BY bieu_thuc1 [ASC | DESC] [NULLS FIRST | NULLS LAST], bieu_thuc2 ...
```

| Quy tắc | Slide |
|---|---|
| Đứng **sau** mọi mệnh đề lọc; chỉ `OFFSET/FETCH` (hay `LIMIT`) được đứng sau nó | 27 |
| `ASC` là mặc định | 27 |
| Sắp theo: tên cột, **bí danh**, biểu thức, hoặc số thứ tự cột | 27 |
| Nhiều cột: sắp theo cột đầu; hàng bằng nhau ở cột đầu mới xét cột sau | 27 |
| **Không có ORDER BY thì không có thứ tự.** Đừng dựa vào thứ tự "tự nhiên" | 27 |

```sql
SELECT * FROM Movies ORDER BY length DESC, title ASC;
SELECT Name, Price*23000 AS vnd FROM Products ORDER BY vnd DESC;
```

NULL nằm đầu hay cuối **tùy hệ** (28):

| Hệ quản trị | `ASC` | `DESC` |
|---|---|---|
| PostgreSQL, Oracle | NULL ở **cuối** | NULL ở **đầu** |
| SQL Server, MySQL, SQLite | NULL ở **đầu** | NULL ở **cuối** |

Muốn chắc chắn: `ORDER BY x ASC NULLS LAST` (PostgreSQL, Oracle). [MySQL] [T-SQL] chưa có, phải viết
`ORDER BY CASE WHEN x IS NULL THEN 1 ELSE 0 END, x;`

---

## 8. Kết nối nhiều bảng (JOIN)

Dữ liệu ví dụ (33): CLASS có 4 lớp (201, 202 **chưa có sinh viên**); STUDENT có 8 sinh viên (E–H **chưa có lớp**, class_id NULL).
Ghép đúng được 4 cặp.

| Loại | Cú pháp | Giữ hàng treo của | Số hàng (37) |
|---|---|---|---|
| Tích Đề-các | `FROM A, B` (không điều kiện) hoặc `CROSS JOIN` | | mọi cặp: 6 × 7 = 42 (31) |
| Inner join | `A [INNER] JOIN B ON A.k = B.k` | không bên nào | **4** |
| Left join | `A LEFT [OUTER] JOIN B ON ...` | bảng **trái** (A) | **6** = 4 + 2 lớp trống |
| Right join | `A RIGHT [OUTER] JOIN B ON ...` | bảng **phải** (B) | **8** = 4 + 4 SV chưa có lớp |
| Full join | `A FULL [OUTER] JOIN B ON ...` | cả hai | **10** = 4 + 2 + 4 |

*Hàng treo* = hàng không tìm được đối tác ở bảng kia. Outer join giữ nó lại và điền NULL vào phần thiếu (37, 38).

**Hai cách viết inner join (34), nên dùng cách 2:**

```sql
-- Cách 1 (SQL-86)                        -- Cách 2 (SQL-92), nên dùng
SELECT *                                  SELECT *
FROM   Class A, Student B                 FROM   Class A
WHERE  A.class_id = B.class_id;                  INNER JOIN Student B ON A.class_id = B.class_id;
```

Cách 2 tách **điều kiện nối** (ON) khỏi **điều kiện lọc** (WHERE), và **bắt buộc** khi dùng outer join.

| Quy tắc JOIN | Slide |
|---|---|
| Nối `n` bảng cần ít nhất `n − 1` điều kiện nối; thiếu là ra tích Đề-các (không báo lỗi, chỉ chạy lâu và ra rất nhiều hàng) | 32 |
| Nối sai cột thì không hệ nào phát hiện được | 32 |
| `A LEFT JOIN B` ≡ `B RIGHT JOIN A`. Thực tế gần như chỉ dùng LEFT JOIN, bảng "chính" đứng trước | 39 |
| Câu hỏi có ý "mọi lớp, kể cả lớp trống" → LEFT JOIN, không phải INNER JOIN | 49 |
| NULL do outer join sinh ra khác NULL có sẵn trong dữ liệu | 38 |

(bổ sung) Mẫu tìm **hàng treo** ("lớp chưa có sinh viên nào"):

```sql
SELECT A.class_id, A.class_name
FROM   Class A LEFT JOIN Student B ON A.class_id = B.class_id
WHERE  B.id IS NULL;
```

### Theta join: nối bằng điều kiện khác dấu `=` (35, 36)

```sql
SELECT A.id, A.marks, B.grade
FROM   Student A
       JOIN Ranking B ON A.marks BETWEEN B.min AND B.max;
```

Khi nối theo **khoảng**, luôn kiểm tra hai câu hỏi (36):

1. Có giá trị nào **lọt ra ngoài** mọi khoảng không? (VD: dùng `< max` thì điểm 10 không được xếp loại.)
2. Có giá trị nào **rơi vào hai khoảng** không? (VD: khoảng `[5,8]` và `[8,10]` dùng `<=` → điểm 8 vừa B vừa A.)

Sửa ở **dữ liệu** (các khoảng rời nhau, phủ kín), không sửa ở truy vấn. Điểm số thực thì dùng khoảng nửa mở `[mn, mx)`.

---

## 9. Tên trùng và biến bộ (bí danh bảng)

| Tình huống | Cách viết | Slide |
|---|---|---|
| Hai bảng có cột cùng tên | Ghi `Bang.cot`: `MovieStar.name`, `MovieExec.name` | 41 |
| Kết quả có hai cột cùng tên | Đặt bí danh: `MovieStar.name AS star_name` | 41 |
| Truy vấn nhiều bảng | **Nên** ghi tiền tố cho mọi cột, kể cả khi không trùng | 41 |
| Bí danh bảng | `FROM Movie M1` hoặc `FROM Movie AS M1`. [Oracle] **không** nhận `AS` cho bí danh bảng | 42 |
| Nối bảng với chính nó (self-join) | **Bắt buộc** đặt hai biến bộ khác nhau | 42 |

**Mẫu "tìm các cặp" (42, 46)**, rất hay ra đề:

```sql
-- Các cặp nhân viên cùng phòng và cùng lương
SELECT NV1.TenNV, NV2.TenNV
FROM   NhanVien NV1, NhanVien NV2
WHERE  NV1.TenPhong = NV2.TenPhong
  AND  NV1.Luong    = NV2.Luong
  AND  NV1.MaNV     < NV2.MaNV;      -- so trên KHÓA CHÍNH
```

| Điều kiện cuối | Tác dụng |
|---|---|
| `NV1.MaNV < NV2.MaNV` | Bỏ cặp (A, A) **và** bỏ cặp hoán vị (B, A) → mỗi cặp 1 lần |
| `<>` thay `<` | Mỗi cặp xuất hiện **2 lần** (A,B) và (B,A) |
| `<` trên `TenNV` thay vì `MaNV` | ❌ Hai người **trùng tên** bị loại oan (vì `TenNV < TenNV` là FALSE) |

---

## 10. Phép toán tập hợp

```sql
SELECT MSSV FROM SinhVien_Toan
UNION | UNION ALL | INTERSECT | EXCEPT
SELECT MSSV FROM SinhVien_Tin;
```

| Phép | Nghĩa | Bài 47 (Toán, Tin) |
|---|---|---|
| `UNION` | R ∪ S, **bỏ trùng** | giỏi ít nhất một môn |
| `UNION ALL` | R ∪ S, **giữ trùng**, nhanh hơn | gộp, ai giỏi cả hai xuất hiện 2 dòng |
| `INTERSECT` | R ∩ S | giỏi cả hai môn |
| `EXCEPT` | R − S (**không giao hoán**: R − S ≠ S − R) | giỏi Toán nhưng không giỏi Tin |

| Quy tắc | Slide |
|---|---|
| Hai vế phải **tương thích**: cùng số cột, cột tương ứng cùng kiểu | 43 |
| Mặc định **bỏ trùng**; thêm `ALL` để giữ | 43 |
| Tên cột kết quả lấy từ truy vấn **đầu tiên** | 44 |
| Dùng `UNION ALL` trừ khi thật sự cần bỏ trùng (UNION phải sắp xếp/băm cả kết quả) | 44 |
| [Oracle] gọi EXCEPT là `MINUS`. [MySQL] có INTERSECT/EXCEPT từ 8.0.31, không có MINUS | 45 |
| Hệ không có INTERSECT/EXCEPT → thay bằng `IN / NOT IN` hoặc `EXISTS / NOT EXISTS` (coi chừng NOT IN gặp NULL) | 47 |

**OR có giống UNION không? (48)** Không. `UNION` ngầm có `DISTINCT`, còn `OR` thì không.
Hai truy vấn chỉ cho cùng kết quả khi kết quả của bản OR vốn không có hàng trùng (VD: SELECT có khóa chính).
Muốn thay OR bằng UNION mà giữ đúng nghĩa thì dùng `UNION ALL`.

---

## 11. Khác biệt giữa các hệ quản trị

Viết theo chuẩn; chỗ nào không chuẩn thì ghi chú (49).

| Việc | Chuẩn SQL | [T-SQL] SQL Server | [MySQL] | [PostgreSQL] | [Oracle] |
|---|---|---|---|---|---|
| Lấy n dòng đầu (7, 12) | `FETCH FIRST n ROWS ONLY` | `SELECT TOP n ...` hoặc `ORDER BY ... OFFSET 0 ROWS FETCH FIRST n ROWS ONLY` (bắt buộc có ORDER BY + OFFSET) | `LIMIT n` | `LIMIT n` hoặc chuẩn | chuẩn (12c+) |
| Tên có dấu cách (15) | `"..."` | `[...]` | `` `...` `` | `"..."` | `"..."` |
| Chuỗi Unicode (19) | `N'...'` | **bắt buộc** `N'...'` với NVARCHAR | `'...'` đủ | `'...'` đủ | |
| LIKE nhiều ký tự (21) | `LIKE ... OR LIKE ...` / `SIMILAR TO '(S\|G)%'` | có `'[SG]%'` | | có `ILIKE` | |
| Thiếu `ON` trong `A JOIN B` (32) | lỗi cú pháp | lỗi cú pháp | **chạy được**, ra tích Đề-các | lỗi cú pháp | lỗi cú pháp |
| FULL OUTER JOIN (40) | có | có | **không có** → `LEFT JOIN ... UNION ... RIGHT JOIN` | có | có |
| EXCEPT (45) | `EXCEPT` | `EXCEPT` | từ 8.0.31 | `EXCEPT` | `MINUS` |
| `NULLS FIRST/LAST` (28) | có | không | không | có | có |
| `AS` cho bí danh bảng (42) | được | được | được | được | **không** |

---

## 12. Checklist trước khi nộp một câu truy vấn

1. **FROM**: đủ bảng chưa? Nối `n` bảng có đủ `n − 1` điều kiện chưa? Đúng cột chưa?
2. **Loại JOIN**: đề có ý "kể cả … chưa có …" không? Có → LEFT JOIN.
3. **WHERE**: có so `= NULL` không? Có `NOT IN` với cột có thể NULL không? Điều kiện "bao trùm" đã tính hàng NULL chưa?
4. **WHERE**: có dùng bí danh cột không? (không được)
5. **Chuỗi**: giá trị dùng `'...'`, tên dùng `"..."`; tiếng Việt thêm `N`; ngày viết `DATE 'YYYY-MM-DD'`.
6. **Self-join tìm cặp**: đã đặt hai biến bộ, có `<` trên **khóa chính** chưa?
7. **Tập hợp**: hai vế cùng số cột, cùng kiểu? Cần `UNION` hay `UNION ALL`? `EXCEPT` đúng chiều chưa?
8. **ORDER BY**: đặt cuối cùng; cần thứ tự thì phải có ORDER BY.

---

## 13. Tự kiểm tra (bổ sung)

Dùng bảng `Customers(CustomerID, Name, Address, Phone, Email)` và `Orders(OrderID, OrderDate, CustomerID)` (30).

1. Câu `SELECT Name, Phone*1 AS p FROM Customers WHERE p IS NULL;` chạy được không? Vì sao?
2. Liệt kê **mọi** khách hàng và mã đơn của họ, kể cả khách chưa có đơn.
3. Liệt kê khách hàng **chưa có** đơn hàng nào.
4. Khách hàng ở 'Tân Bình' **hoặc** chưa có email.
5. Các cặp khách hàng có cùng số điện thoại (mỗi cặp một lần).

<details>
<summary>Đáp án</summary>

1. Không. WHERE chạy trước SELECT nên `p` chưa tồn tại. Sửa: `WHERE Phone IS NULL`.
2. ```sql
   SELECT C.CustomerID, C.Name, O.OrderID
   FROM   Customers C LEFT JOIN Orders O ON C.CustomerID = O.CustomerID;
   ```
3. ```sql
   SELECT C.CustomerID, C.Name
   FROM   Customers C LEFT JOIN Orders O ON C.CustomerID = O.CustomerID
   WHERE  O.OrderID IS NULL;
   -- hoặc
   SELECT CustomerID FROM Customers
   EXCEPT
   SELECT CustomerID FROM Orders;
   ```
   Với dữ liệu slide 31: C05, C06.
4. ```sql
   SELECT * FROM Customers
   WHERE  Address = N'Tân Bình' OR Email IS NULL;
   ```
5. ```sql
   SELECT C1.Name, C2.Name, C1.Phone
   FROM   Customers C1 JOIN Customers C2 ON C1.Phone = C2.Phone
   WHERE  C1.CustomerID < C2.CustomerID;
   ```
   Với dữ liệu slide 31: (Nguyễn Thị Bé, Trần Thị Chiêu), cùng số 08457895. Khách có Phone NULL không bị ghép
   (NULL = NULL là UNKNOWN), đúng ý đề.

</details>
