#!/bin/sh
# Sinh lại mọi đề thi thử trong cacDe.py (PDF + Word) và file đáp án.
# Thêm đề mới: thêm một mục vào DE trong cacDe.py rồi chạy lại script này.
# Cần: python3, xelatex (TeX Live có tikz, lastpage, font Latin Modern), pdftoppm, pandoc, node + gói docx.
set -e
cd "$(dirname "$0")"
T=$(mktemp -d)
python3 -B taoDe.py "$T"
for d in "$T"/*/; do
  m=$(basename "$d")
  (
    cd "$T/$m"
    xelatex -interaction=nonstopmode -halt-on-error DeLuyen.tex >/dev/null
    xelatex -interaction=nonstopmode -halt-on-error DeLuyen.tex >/dev/null  # lần 2 để có tổng số trang
    xelatex -interaction=nonstopmode -halt-on-error SoDoER_standalone.tex >/dev/null
    pdftoppm -r 450 -png -singlefile SoDoER_standalone.pdf SoDoER
  )
  cp "$T/$m/DeLuyen.pdf" "../DeLuyen_GiuaKy_MaDe$m.pdf"
  node taoDocx.js "$T/$m/DeLuyen.json" "$T/$m/SoDoER.png" "../DeLuyen_GiuaKy_MaDe$m.docx"
done
rm -rf "$T"
echo "Xong: các file ../DeLuyen_GiuaKy_MaDe*.pdf, .docx và ../DapAn_DeLuyen_GiuaKy.md"
