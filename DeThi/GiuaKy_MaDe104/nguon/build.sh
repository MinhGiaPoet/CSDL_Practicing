#!/bin/sh
# Dựng lại bản PDF và Word của đề giữa kỳ mã 104 từ nguồn.
# Cần: xelatex (TeX Live có tikz, font Latin Modern), pdftoppm (poppler), pandoc, node + gói docx.
set -e
cd "$(dirname "$0")"
T=$(mktemp -d)
xelatex -interaction=nonstopmode -halt-on-error -output-directory="$T" DeGiuaKy_CSDL_MaDe104.tex >/dev/null
cp "$T/DeGiuaKy_CSDL_MaDe104.pdf" ../
xelatex -interaction=nonstopmode -halt-on-error -output-directory="$T" SoDoER_standalone.tex >/dev/null
pdftoppm -r 450 -png -singlefile "$T/SoDoER_standalone.pdf" SoDoER
node taoDocx.js .
rm -rf "$T"
echo "Xong: ../DeGiuaKy_CSDL_MaDe104.pdf, ../DeGiuaKy_CSDL_MaDe104.docx"
