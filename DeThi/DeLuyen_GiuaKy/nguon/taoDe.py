#!/usr/bin/env python3
"""Sinh các đề thi thử giữa kỳ trong cacDe.py (mã 201–210) theo khung đề thật mã 104.

    python3 taoDe.py <thư mục build>

Với mỗi mã đề, ghi vào <build>/<mã>/:
  DeLuyen.tex, SoDoER.tex, SoDoER_standalone.tex  (bản PDF, biên dịch bằng xelatex)
  DeLuyen.json                                     (dữ liệu cho taoDocx.js dựng bản Word)
và ghi file đáp án ../DapAn_DeLuyen_GiuaKy.md. Mọi đáp án đều do fd.py tính, đồng thời kiểm tra
các ràng buộc của khung đề (3 khóa ứng viên, phủ tối thiểu duy nhất, C1 đủ 4 tổ hợp Đ/S...).
"""
import json
import os
import random
import sys

from fd import S, closure, keys, mincover, all_mincovers, implies, split, proj, preserves, lossless, parse, fs
from cacDe import DE
from nganHangA import CAU

HERE = os.path.dirname(os.path.abspath(__file__))
RB = 'ABCDEG'
RC = 'ABCD'
ABC = 'ABC'


# ------------------------------------------------------------------ tiện ích
def F_of(s):
    return [(S(l), S(r)) for l, r in parse(s)]


def fdtex(s):
    l, r = s.split('>')
    return f'{l}\\to {r}'


def Ftex(s):
    return 'F=\\{\\,' + ',\\quad '.join(fdtex(x) for x in s.split()) + '\\,\\}'


def esc(c):
    return {'_': '\\_', '%': '\\%', '&': '\\&', '#': '\\#'}.get(c, c)


OPEN = {'b': '\\textbf{', 'i': '\\textit{', 't': '\\texttt{', 'u': '\\underline{'}


def md2tex(s):
    """**đậm** *nghiêng* `máy chữ` ~gạch chân~ $toán$  ->  LaTeX"""
    out, stack, i = [], [], 0
    while i < len(s):
        c = s[i]
        if c == '$':
            j = s.index('$', i + 1)
            out.append(s[i:j + 1])
            i = j + 1
            continue
        if s.startswith('**', i):
            tok, i = 'b', i + 2
        elif c in '*`~':
            tok, i = {'*': 'i', '`': 't', '~': 'u'}[c], i + 1
        else:
            out.append(esc(c))
            i += 1
            continue
        if tok in stack:
            reopen = []
            while stack[-1] != tok:
                reopen.append(stack.pop())
                out.append('}')
            stack.pop()
            out.append('}')
            for t in reversed(reopen):
                stack.append(t)
                out.append(OPEN[t])
        else:
            stack.append(tok)
            out.append(OPEN[tok])
    assert not stack, s
    return ''.join(out)


def check(cond, msg):
    if not cond:
        raise SystemExit('LỖI: ' + msg)


# ------------------------------------------------------------------ Phần A
def lam_A(ma, de):
    rnd = random.Random(int(ma))
    vitri = [0] * 4 + [1] * 4 + [2] * 4
    rnd.shuffle(vitri)
    out = []
    for n, (cid, p) in enumerate(zip(de['A'], vitri), 1):
        text, opts, ngang, lydo = CAU[cid]
        nhieu = opts[1:]
        rnd.shuffle(nhieu)
        o = nhieu[:p] + [opts[0]] + nhieu[p:]
        out.append(dict(n=n, id=cid, text=text, opts=o, inline=ngang, dap=ABC[p], lydo=lydo))
    check(len(set(de['A'])) == 12, f'{ma}: Phần A phải có 12 câu khác nhau')
    return out


# ------------------------------------------------------------------ Phần B
def lam_B(ma, b):
    F = F_of(b['F'])
    ks = keys(RB, F)
    check(len(ks) == 3, f'{ma}: Phần B cần đúng 3 khóa ứng viên, có {len(ks)}')
    phu = mincover(F)
    check(len(all_mincovers(F, RB, len(phu) + 1)) == 1, f'{ma}: phủ tối thiểu không duy nhất')
    B1 = [(x, fs(closure(x, F))) for x in b['B1']]
    B2 = []
    for x in b['B2']:
        if S(x) in ks:
            B2.append((x, 'K'))
        elif closure(x, F) == S(RB):
            B2.append((x, 'S'))
        else:
            B2.append((x, 'N'))
    dem = {t: sum(1 for _, v in B2 if v == t) for t in 'KSN'}
    check(dem == {'K': 3, 'S': 2, 'N': 3}, f'{ma}: B2 cần 3 K, 2 S, 3 N, đang có {dem}')
    B3 = []
    for k, x in enumerate(b['B3'], 1):
        l, r = x.split('>')
        if (S(l), S(r)) in phu:
            loai = 'phu'
        elif implies(F, l, r):
            loai = 'thua'
        else:
            loai = 'khong'
        B3.append((k, x, loai))
    check(sum(1 for *_, t in B3 if t == 'phu') == len(phu), f'{ma}: B3 thiếu phụ thuộc của phủ tối thiểu')
    trai = set(''.join(l for l, _ in parse(b['F'])))
    phai = set(''.join(r for _, r in parse(b['F'])))
    return dict(F=F, keys=[fs(k) for k in ks], phu=phu, B1=B1, B2=B2, B3=B3,
                L=''.join(sorted(trai - phai)), N=''.join(sorted(set(RB) - trai - phai)))


# ------------------------------------------------------------------ Phần C, F
def lam_C1(ma, c):
    F = F_of(c['F'])
    rows = []
    for d in c['dec']:
        rows.append((d, 'Đ' if lossless(RC, F, d) else 'S', 'Đ' if preserves(F, d) else 'S'))
    check(len({(a, b) for _, a, b in rows}) == 4, f'{ma}: C1 phải phủ đủ 4 tổ hợp Đ/S')
    return rows


def lam_C2(ma, c, FB):
    out = []
    for x in c['fds']:
        l, r = x.split('>')
        check(set(l + r) <= set(c['S']), f'{ma}: C2 {x} không nằm trong {c["S"]}')
        out.append((x, 'Đ' if implies(FB, l, r) else 'S'))
    return out


def bcnf(R, F):
    """Phân rã BCNF theo slide; ưu tiên phụ thuộc vi phạm có vế trái ngắn nhất."""
    viec, xong = [fs(R)], []
    while viec:
        Ri = viec.pop(0)
        G = proj(F, Ri)
        vp = sorted([(l, r) for l, r in G if closure(l, G) != S(Ri)], key=lambda t: (len(t[0]), fs(t[0])))
        if not vp:
            xong.append(Ri)
            continue
        X = vp[0][0]
        Xp = closure(X, G) & S(Ri)
        viec += [fs(Xp), fs(S(Ri) - (Xp - X))]
    return xong


def lam_F(ma, c):
    F = F_of(c['F'])
    ks = keys(RC, F)
    thuoctinhkhoa = set(''.join(fs(k) for k in ks))
    check(all(set(r) <= thuoctinhkhoa for _, r in parse(c['F'])), f'{ma}: lược đồ Phần F không đạt 3NF')
    vipham = [x for x in c['F'].split() if closure(x.split('>')[0], F) != S(RC)]
    check(vipham, f'{ma}: lược đồ Phần F đã đạt BCNF')
    con = bcnf(RC, F)
    G = [fd for Ri in con for fd in proj(F, Ri)]
    mat = [x for x in c['F'].split() if not implies(G, *x.split('>'))]
    trai = set(''.join(l for l, _ in parse(c['F'])))
    phai = set(''.join(r for _, r in parse(c['F'])))
    return dict(keys=[fs(k) for k in ks], tk=''.join(sorted(thuoctinhkhoa)), vipham=vipham, con=con, mat=mat,
                L=''.join(sorted(trai - phai)), N=''.join(sorted(set(RC) - trai - phai)),
                bd={x: fs(closure(x.split('>')[0], F)) for x in vipham})


# ------------------------------------------------------------------ Phần D
def quan_he(d):
    """Các quan hệ ứng viên: mã -> (chuỗi quan hệ, đúng?, khóa chính hoặc lý do sai)."""
    k1, k2, k3, k4 = d['k1'], d['k2'], d['k3'], d['k4']
    return {
        'E1': (f"{d['E1']}({k1}, {d['a1']}, {d['a2']}, {d['fkRec']})", True, k1),
        'E2': (f"{d['E2']}({k2}, {d['b1']}, {k1})", True, k2),
        'E3': (f"{d['E3']}({k3}, {d['c1']}, {d['c2']}, {d['fkPt']})", True, k3),
        'MV': (f"{d['E3']}_{d['mv']}({k3}, {d['mv']})", True, f"({k3}, {d['mv']})"),
        'PH': (f"{d['ph']}({k3}, {k4}, {d['d1']}, TrangThai)", True, f"({k3}, {k4})"),
        'E4': (f"{d['E4']}({k4}, {d['e1']}, {d['e2']})", True, k4),
        'E5': (f"{d['E5']}({k4}, {d['p5']}, {d['f1']})", True, f"({k4}, {d['p5']})"),
        'W1': (f"{d['E1']}({k1}, {d['a1']}, {d['a2']}, {d['fkRec']}, {k2}, {d['b1']})", False,
               f"{d['sh']} là 1:N nên khóa ngoại {k1} nằm ở {d['E2']}; không gộp {d['E2']} vào {d['E1']}"),
        'W2': (f"{d['E5']}({d['p5']}, {d['f1']})", False,
               f"thực thể yếu thiếu khóa {k4} của thực thể chủ {d['E4']}"),
        'W3': (f"{d['E3']}({k3}, {d['c1']}, {d['c2']}, {d['mv']}, {d['fkPt']})", False,
               f"{d['mv']} đa trị phải tách thành bảng riêng"),
        'W5': (f"{d['E1']}({k1}, {d['a1']}, {d['a2']})", False,
               f"thiếu khóa ngoại {d['fkRec']} của liên kết đệ quy {d['rec']}"),
        'W6': (f"{d['E4']}({k4}, {d['e1']}, {d['e2']}, {k3}, {d['d1']}, TrangThai)", False,
               f"{d['ph']} là M:N, phải thành bảng riêng, không gộp vào {d['E4']}"),
        'W7': (f"{d['E2']}({k2}, {d['b1']})", False,
               f"thiếu khóa ngoại {k1} của liên kết {d['sh']} (1:N)"),
        'W9': (f"{d['ph']}({k3}, {d['d1']}, TrangThai)", False,
               f"bảng của liên kết M:N {d['ph']} thiếu khóa ngoại {k4}"),
    }


def lam_D(ma, d):
    qh = quan_he(d)
    ds = [qh[c] for c in d['ds']]
    dung = sum(1 for _, ok, _ in ds if ok)
    check(len(ds) == 8 and dung == 5, f'{ma}: Phần D cần 8 quan hệ, 5 đúng 3 sai')
    return ds


# sơ đồ ER: toạ độ của mã 104 (đơn vị: pixel ảnh gốc), cỡ hình tính theo độ dài tên
def w_att(t):
    return max(1.15, 0.2 * len(t) + 0.45)


def w_rel(t):
    return max(1.15, 0.2 * len(t) + 0.6)


def w_ent(t):
    return max(1.85, 0.17 * len(t) + 0.35)


PX = 0.01323  # cm (trước khi thu nhỏ) cho một đơn vị toạ độ


def so_do(d):
    # hàng dưới: thuộc tính đa trị, hai thuộc tính của liên kết M:N — đẩy sang trái cho khỏi chồng nhau
    w_hv, w_nph, w_tt = (w_att(d['mv']) / PX, w_att(d['d1']) / PX, w_att('TrangThai') / PX)
    x_tt = min(1345, 1445 - w_tt / 2)
    x_nph = min(1162, x_tt - w_tt / 2 - 12 - w_nph / 2)
    x_hv = min(1003, x_nph - w_nph / 2 - 12 - w_hv / 2)
    check(x_hv > 880, f'sơ đồ {d["E3"]}: hàng thuộc tính dưới quá dài')

    def ent(name, xy, t, h=0.66, extra=''):
        return (f"\\node[ent{extra},minimum width={w_ent(t):.2f}cm,minimum height={h:.2f}cm] ({name}) at ({xy}) {{{t}}};")

    def rel(name, xy, t, extra=''):
        w = w_rel(t)
        return (f"\\node[rel{extra},minimum width={w:.2f}cm,minimum height={w / 2.05:.2f}cm,shape aspect=2.05,"
                f"label={{[font=\\fontsize{{9}}{{10}}\\selectfont]center:{t}}}] ({name}) at ({xy}) {{}};")

    def att(name, xy, t, hien=None, extra=''):
        return (f"\\node[att{extra},minimum width={w_att(t):.2f}cm,label={{center:{hien or t}}}] ({name}) at ({xy}) {{}};")

    u = lambda t: f'\\underline{{{t}}}'
    L = [
        r"% Sinh tự động bởi taoDe.py (bố cục giống sơ đồ đề thật mã 104)",
        r"\scalebox{0.65}{\begin{tikzpicture}[x=0.01323cm,y=-0.01323cm,font=\fontsize{9.6}{11}\selectfont,",
        r"  ent/.style={draw,thick,fill=black!13,inner sep=0pt},",
        r"  rel/.style={draw,diamond,fill=white,inner sep=0pt},",
        r"  att/.style={draw,ellipse,fill=white,inner sep=0pt,minimum height=0.39cm},",
        r"  every label/.style={font=\fontsize{8.6}{10}\selectfont,inner sep=0pt},",
        r"  card/.style={font=\fontsize{8}{9}\selectfont,inner sep=1pt}]",
        ent('cv', '513,300', d['E1']),
        rel('tn', '510,157', d['rec']),
        att('macv', '287,255', d['k1'], u(d['k1'])),
        att('hoten', '287,317', d['a1']),
        att('email', '287,377', d['a2']),
        r"\draw (macv) -- (cv); \draw (hoten) -- (cv); \draw (email) -- (cv);",
        r"\draw (cv.north west) .. controls (395,250) and (390,175) .. (tn.west);",
        r"\draw (cv.north east) .. controls (630,250) and (630,175) .. (tn.east);",
        r"\node[card] at (390,233) {1};", r"\node[card] at (625,217) {N};",
        rel('sh', '515,420', d['sh']),
        ent('tk', '513,528', d['E2'], 0.68),
        r"\draw (cv) -- (sh); \draw (sh) -- (tk);",
        r"\node[card] at (506,360) {1};", r"\node[card] at (503,476) {N};",
        att('matk', '378,602', d['k2'], u(d['k2'])),
        att('tdn', '650,592', d['b1']),
        r"\draw (matk) -- (tk); \draw (tdn) -- (tk);",
        rel('pt', '757,286', d['pt']),
        ent('mth', '1000,265', d['E3'], 0.72),
        r"\draw (cv) -- (pt); \draw (pt) -- (mth);",
        r"\node[card] at (637,276) {1};", r"\node[card] at (873,260) {N};",
        att('mamau', '877,180', d['k3'], u(d['k3'])),
        att('tenmau', '993,122', d['c1']),
        att('mahash', '1120,158', d['c2']),
        r"\draw (mamau) -- (mth); \draw (tenmau) -- (mth); \draw (mahash) -- (mth);",
        att('hv', f'{x_hv:.0f},391', d['mv'], extra=',double,double distance=0.8pt'),
        r"\draw (mth) -- (hv);",
        rel('ph', '1245,248', d['ph']),
        ent('md', '1495,225', d['E4'], 0.77),
        r"\draw (mth) -- (ph); \draw (ph) -- (md);",
        r"\node[card] at (1127,240) {M};", r"\node[card] at (1367,222) {N};",
        att('nph', f'{x_nph:.0f},378', d['d1']),
        att('tt', f'{x_tt:.0f},368', 'TrangThai'),
        r"\draw (ph) -- (nph); \draw (ph) -- (tt);",
        att('maho', '1367,138', d['k4'], u(d['k4'])),
        att('dnh', '1488,75', d['e1']),
        att('pl', '1620,108', d['e2']),
        r"\draw (maho) -- (md); \draw (dnh) -- (md); \draw (pl) -- (md);",
        rel('co', '1500,353', d['co'], extra=',double,double distance=0.8pt'),
        ent('ck', '1508,475', d['E5'], 0.74, extra=',double,double distance=1.3pt'),
        r"\draw[double,double distance=0.9pt] (md) -- (co);",
        r"\draw[double,double distance=0.9pt] (co) -- (ck);",
        r"\node[card] at (1515,293) {1};", r"\node[card] at (1517,410) {N};",
        att('sohieu', '1742,410', d['p5'], u('\\textit{' + d['p5'] + '}')),
        att('ncn', '1748,492', d['f1']),
        r"\draw (ck) -- (sohieu); \draw (ck) -- (ncn);",
        r"\end{tikzpicture}}",
    ]
    return '\n'.join(L) + '\n'


# ------------------------------------------------------------------ Phần E
def bieu_thuc(d, e, kieu):
    """kieu='tex' cho LaTeX, 'docx' cho pandoc → Word."""
    tt = (lambda x: f'\\tn{{{x}}}') if kieu == 'tex' else (lambda x: f'\\texttt{{{x}}}')
    hop = (lambda x: f'\\hop{{{x}}}') if kieu == 'tex' else (lambda x: f'\\boxed{{\\text{{{x}}}}}')
    lo, ro = ('\\Bigl(', '\\Bigr)') if kieu == 'tex' else ('\\left(', '\\right)')
    blo, bro = ('\\bigl(', '\\bigr)') if kieu == 'tex' else ('\\left(', '\\right)')
    dk = tt(f"{d['e2']}=’{e['X']}’".replace('_', '\\_'))
    f123 = (f"\\pi_{{{hop('E1')}}}{lo}{tt(d['E3'])}\\bowtie{blo}\\sigma_{{{hop('E2')}}}({tt(d['ph'])})"
            f"\\bowtie\\sigma_{{{hop('E3')}}}({tt(d['E4'])}){bro}{ro}")

    def khong(o):
        return (f"\\pi_{{{tt(d['k3'])}}}{blo}{tt(d['E3'])}{bro}\\ \\ {hop(o)}\\ \\ "
                f"\\pi_{{{tt(d['k3'])}}}{blo}{tt(d['ph'])}\\bowtie\\sigma_{{{dk}}}({tt(d['E4'])}){bro}")

    def moi(o):
        return (f"\\pi_{{{tt(d['k3'] + ', ' + d['k4'])}}}{blo}{tt(d['ph'])}{bro}\\ \\ {hop(o)}\\ \\ "
                f"\\pi_{{{tt(d['k4'])}}}{blo}\\sigma_{{{dk}}}({tt(d['E4'])}){bro}")

    if e['hoanDoi']:
        return f123, (e['moi'], moi('E4'), '÷'), (e['khong'], khong('E5'), '−')
    return f123, (e['khong'], khong('E4'), '−'), (e['moi'], moi('E5'), '÷')


# ------------------------------------------------------------------ LaTeX
PREAMBLE = r"""% Sinh tự động bởi taoDe.py — đề thi thử giữa kỳ CSDL, mã đề @MA@ (khung giống đề thật mã 104)
\documentclass[11pt,a4paper]{article}
\usepackage[a4paper,top=2.1cm,bottom=2.0cm,left=1.9cm,right=1.9cm,headheight=13pt,headsep=12pt,footskip=26pt]{geometry}
\usepackage{amsmath}
\usepackage{fontspec}
\usepackage{unicode-math}
\setmainfont{Latin Modern Roman}[SmallCapsFont={Latin Modern Roman Caps}]
\setmonofont{Latin Modern Mono}
\setmathfont{Latin Modern Math}
\usepackage{fancyhdr,array,booktabs,enumitem,lastpage,tikz}
\usetikzlibrary{shapes.geometric,calc}
\hyphenpenalty=10000
\exhyphenpenalty=10000
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\pagestyle{fancy}
\fancyhf{}
\fancyhead[L]{\small CSDL INT1313\qquad Mã đề @MA@}
\fancyhead[R]{\small Thi thử giữa kỳ — Lớp tài năng ATTT}
\fancyfoot[C]{Trang \thepage/\pageref{LastPage} — Mã đề @MA@}
\renewcommand{\headrulewidth}{0.4pt}
\newcommand{\tn}[1]{\texttt{#1}}
\newcommand{\phan}[4][]{\par\bigskip{\large\textbf{PHẦN #2.\ \ #3} \textit{(#4)}#1}\par\smallskip}
\newcommand{\cau}[2]{\par\textbf{#1.} #2\par}
\newlist{pa}{enumerate}{1}
\setlist[pa]{label=\Alph*.,leftmargin=3.2em,labelsep=0.45em,itemsep=0pt,parsep=0pt,topsep=0pt,partopsep=0pt,before={\vspace{0.75\baselineskip}\small}}
\newcommand{\pangang}[1]{\par{\small\hspace*{2.1em}#1\par}}
\newcommand{\ghichu}[1]{\par{\footnotesize #1}\par}
\newcommand{\hop}[1]{\fbox{\normalsize\rmfamily #1}}
\newcommand{\dong}[1]{\makebox[#1]{\dotfill}}
\newcommand{\phieuphan}[2]{\par\medskip{\bfseries PHẦN #1.\ \ #2}\par\smallskip}
\newcommand{\khung}[1]{\par\noindent\begin{tikzpicture}
\draw[thick] (0,0) rectangle (\textwidth-0.8pt,-#1*0.85cm-0.25cm);
\foreach \i in {1,...,#1} \draw[gray!70,dotted] (0.2cm,-\i*0.85cm) -- (\textwidth-0.2cm,-\i*0.85cm);
\end{tikzpicture}\par}
\begin{document}
"""

QUY_DINH = r"""\begin{center}
\textsc{Học Viện Công Nghệ Bưu Chính Viễn Thông — Khoa Trí Tuệ Nhân Tạo}\\[1pt]
{\Large\bfseries ĐỀ THI THỬ GIỮA KỲ — CƠ SỞ DỮ LIỆU (INT1313)}\\[3pt]
Lớp tài năng ngành An toàn thông tin \quad — \quad \textbf{M{\small Ã} Đ{\small Ề} @MA@}\\[1pt]
\textbf{Thời gian: 90 phút\enspace|\enspace Không sử dụng tài liệu\enspace|\enspace Thang điểm 10}
\end{center}
\vspace{-4pt}
\rule{\textwidth}{0.6pt}\par\smallskip
{\large\bfseries QUY ĐỊNH TRÌNH BÀY}\par\smallskip
\begin{enumerate}[label=\arabic*.,leftmargin=*,itemsep=1pt,parsep=0pt,topsep=0pt]
\item \textbf{Chỉ PHIẾU TRẢ LỜI (2 trang cuối, in 2 mặt) được chấm.} Đáp án viết trên phần đề hoặc giấy nháp không được tính điểm.
\item \textbf{Tập thuộc tính viết liền, theo thứ tự bảng chữ cái:} viết {\small\textsf{ABCD}}, không viết $\{B,A,D,C\}$.
\item \textbf{Mỗi ô một đáp án.} Ô có hai đáp án hoặc tẩy xóa không rõ tính là \textbf{sai}.
\item Phần F trả lời trong khung: \textbf{F1 tối đa 3 dòng, F2 tối đa 4 dòng}; ngoài khung không chấm.
\item \textbf{Không dùng bút chì} cho phiếu trả lời.
\end{enumerate}
\vspace{2pt}
\rule{\textwidth}{0.6pt}
"""

O = 'abcdefgh'


def bang_ngang(nhan0, nhan, hang2, hang3=None, rong='1.25cm'):
    L = [r'\begin{center}', r'\renewcommand{\arraystretch}{%s}' % ('1.6' if hang3 else '1.15'),
         r'\begin{tabular}{|>{\bfseries}c|*{8}{w{c}{%s}|}}' % rong, r'\hline',
         ' & '.join(['Ô'] + [r'\textbf{%s}' % x for x in nhan]) + r'\\\hline',
         ' & '.join([nhan0] + hang2) + r'\\\hline']
    if hang3:
        L.append(' & '.join([hang3] + [''] * 8) + r'\\\hline')
    L += [r'\end{tabular}', r'\end{center}']
    return '\n'.join(L)


def tex_de(ma, de, A, b, c1, d, e):
    D, E = de['D'], de['E']
    f123, (q4, f4, _), (q5, f5, _) = bieu_thuc(D, E, 'tex')
    o = [PREAMBLE.replace('@MA@', ma), QUY_DINH.replace('@MA@', ma)]
    o.append(r'\phan[\ \textbf{— 12 câu, mỗi câu 0,15}]{A}{Trắc nghiệm}{1,8 điểm}')
    o.append(r'\ghichu{Mỗi câu có ba phương án; chọn một và điền vào phiếu trả lời.}')
    for q in A:
        o.append(r'\cau{%d}{%s}' % (q['n'], md2tex(q['text'])))
        if q['inline']:
            o.append(r'\pangang{' + r'\qquad '.join(f'{ABC[k]}.~{md2tex(x)}' for k, x in enumerate(q['opts'])) + '}')
        else:
            o.append(r'\begin{pa}' + ''.join(r'\item ' + md2tex(x) + '\n' for x in q['opts']) + r'\end{pa}')
    # Phần B
    B = de['B']
    o.append(r'\phan{B}{Phụ thuộc hàm}{2,8 điểm}')
    o.append(r'Cho $R(A,B,C,D,E,G)$ và $%s$\par\smallskip' % Ftex(B['F']))
    b1 = ',\\ \\ '.join(f'$\\{{{x}\\}}^+$' for x in B['B1'])
    o.append(r'\textbf{B1. Bao đóng} \textit{(0,8 điểm)} — tính và điền vào phiếu: %s (lần lượt là ô B1a, B1b, B1c, B1d).\par\smallskip' % b1)
    o.append(r'\textbf{B2. Phân loại} \textit{(1,2 điểm)} — với mỗi tập, điền \textbf{K} (là khóa ứng viên) / \textbf{S} (là siêu khóa nhưng không tối thiểu) / \textbf{N} (không phải siêu khóa):\par\smallskip')
    o.append(bang_ngang(r'\textbf{Tập}', [f'B2{x}' for x in O], [f'${x}$' for x in B['B2']]))
    o.append(r'\vspace{-6pt}\ghichu{\textit{Tính điểm:} đúng cả $8=1{,}2$; sai 1–2 ô $=0{,}6$; sai từ 3 ô $=0$.}\smallskip')
    o.append(r'\textbf{B3. Phủ tối thiểu} \textit{(0,8 điểm)} — khoanh vào phiếu những số thuộc phủ tối thiểu của $F$. \textit{(Với tập $F$ này phủ tối thiểu là duy nhất.)}\par')
    cot = [f'{k}. ${fdtex(x)}$' for k, x in enumerate(B['B3'], 1)]
    o.append(r'\begin{center}\begin{tabular}{lllll}\toprule' + '\n' +
             ' & '.join(cot[0::2]) + r'\\' + '\n' + ' & '.join(cot[1::2]) + r'\\' + '\n' + r'\bottomrule\end{tabular}\end{center}')
    o.append(r'\vspace{-6pt}\ghichu{\textit{Lưu ý:} trong danh sách có phụ thuộc \textit{suy diễn được} từ $F$ nhưng \textit{không} thuộc phủ tối thiểu, và có cả phụ thuộc không suy diễn được từ $F$. \textit{Tính điểm:} đúng hoàn toàn $=0{,}8$; mỗi số thừa hoặc thiếu trừ $0{,}2$; tối thiểu 0.}')
    # Phần C
    C1, C2 = de['C1'], de['C2']
    o.append(r'\phan{C}{Phân rã}{2,0 điểm}')
    o.append(r'\textbf{C1} \textit{(1,2 điểm)} — Cho $R(A,B,C,D)$ và $%s$. Với mỗi phép phân rã, điền \textbf{Đ/S} cho hai câu hỏi độc lập:\par' % Ftex(C1['F']))
    rows = '\n'.join(f'C1{O[k]} & $\\{{{x},\\ {y}\\}}$ & & \\\\\\hline' for k, (x, y) in enumerate(C1['dec']))
    o.append(r'\begin{center}\renewcommand{\arraystretch}{1.15}\begin{tabular}{|l|p{3.1cm}|p{3.6cm}|p{4.2cm}|}\hline' + '\n' +
             r'\textbf{Ô} & \textbf{Phép phân rã} & \textbf{Không mất mát?} & \textbf{Bảo toàn phụ thuộc?}\\\hline' + '\n' +
             rows + '\n' + r'\end{tabular}\end{center}')
    o.append(r'\vspace{-6pt}\ghichu{Mỗi ô 0,15 điểm (8 ô). Hai cột chấm độc lập — phải điền cả hai cột cho mỗi phép phân rã; bỏ trống tính sai.}\smallskip')
    Sx = C2['S']
    o.append(r'\textbf{C2} \textit{(0,8 điểm)} — Quay lại lược đồ $R(A,B,C,D,E,G)$ ở Phần B. Xét phép chiếu $\pi_{%s}(F)$. Với mỗi phụ thuộc dưới đây, điền \textbf{Đ} nếu nó \textit{suy diễn được} từ $F$ (tức thuộc $\pi_{%s}(F)$), \textbf{S} nếu không:\par' % (Sx, Sx))
    o.append(bang_ngang(r'\textbf{FD}', [f'C2{x}' for x in O], [f'${fdtex(x)}$' for x in C2['fds']], rong='1.55cm'))
    o.append(r'\vspace{-6pt}\ghichu{Mỗi ô 0,1 điểm; bỏ trống tính sai.}')
    # Phần D
    o.append(r'\newpage')
    o.append(r'\phan{D}{Mô hình thực thể — liên kết}{1,2 điểm}')
    o.append(r'\begin{center}\input{SoDoER.tex}\end{center}\vspace{-2pt}')
    o.append(r'{\footnotesize ' + md2tex(chu_thich(D)) + r'\par' + md2tex(quy_uoc(D)) + r'\par}')
    o.append(r'Dưới đây là 8 quan hệ ứng viên. Điền \textbf{Đ} nếu quan hệ thuộc lược đồ đúng, \textbf{S} nếu không; nếu \textbf{Đ} thì ghi thêm \textbf{khóa chính}.\par')
    rows = '\n'.join(f'D{k} & \\tn{{{md2tex(x)}}}\\\\' for k, (x, _, _) in enumerate(d, 1))
    o.append(r'\begin{center}\small\begin{tabular}{ll}\toprule\textbf{Ô} & \textbf{Quan hệ ứng viên}\\\midrule' + '\n' + rows + '\n' + r'\bottomrule\end{tabular}\end{center}')
    o.append(r'\vspace{-6pt}\ghichu{Mỗi ô đúng cả Đ/S và khóa chính $=0{,}15$ điểm.}')
    # Phần E
    o.append(r'\phan{E}{Đại số quan hệ}{1,0 điểm}')
    o.append(r'Dùng ba quan hệ:\par')
    o.append(r'\begin{itemize}[leftmargin=2.2em,itemsep=0pt,parsep=0pt,topsep=0pt,label=\textbullet]\small' + '\n' +
             '\n'.join(r'\item ' + md2tex(x) for x in bang_E(D, E)) + '\n' + r'\end{itemize}')
    o.append(r'\textbf{E1–E3.} ' + md2tex(E['q123']))
    o.append(r'\[' + f123 + r'\]')
    o.append(r'\textbf{E4.} ' + md2tex(q4))
    o.append(r'\[' + f4 + r'\]')
    o.append(r'\textbf{E5.} ' + md2tex(q5))
    o.append(r'\[' + f5 + r'\]')
    o.append(r'\ghichu{\textit{Mỗi ô 0,2 điểm.} Ô E1–E3 điền danh sách thuộc tính hoặc điều kiện; ô E4, E5 điền \textit{một toán tử}.}')
    # Phần F
    o.append(r'\phan{F}{Tự luận ngắn}{1,2 điểm}')
    o.append(r'Vẫn dùng $R(A,B,C,D)$ với $%s$ ở Phần C.\par\smallskip' % Ftex(C1['F']))
    o.append(r'\textbf{F1} \textit{(0,6 điểm)} Chứng minh $R$ \textbf{đạt 3NF}. Yêu cầu: nêu đủ các khóa ứng viên, tập thuộc tính khóa, rồi xét từng phụ thuộc hàm. \textit{(Tối đa 3 dòng)}\par\smallskip')
    o.append(r'\textbf{F2} \textit{(0,6 điểm)} $R$ có đạt BCNF không? Nếu không, hãy làm đủ ba việc: \textbf{(a)} chỉ rõ các phụ thuộc vi phạm; \textbf{(b)} phân rã $R$ về BCNF và viết các lược đồ con thu được; \textbf{(c)} chỉ rõ phụ thuộc hàm nào \textit{bị mất} sau phân rã. \textit{(Tối đa 4 dòng)}')
    # giấy nháp
    o.append(r'\newpage')
    for _ in range(2):
        o.append(r'\begin{center}{\large\bfseries GIẤY NHÁP}\\[2pt]{\small\itshape Phần viết ở đây không được chấm.}\end{center}\null\newpage')
    o.append(phieu(ma, de))
    o.append(r'\end{document}')
    return '\n'.join(o) + '\n'


def phieu(ma, de):
    B, C1, C2 = de['B'], de['C1'], de['C2']
    so = ''.join(r' & \textbf{%d}' % k for k in range(1, 13))
    o = [r'\renewcommand{\arraystretch}{1.6}',
         r'\begin{center}{\LARGE\bfseries PHIẾU TRẢ LỜI}\\[2pt]Đề thi thử giữa kỳ — Cơ sở dữ liệu (INT1313) \quad — \quad \textbf{M{\small Ã} Đ{\small Ề} %s}\end{center}' % ma,
         r'Họ và tên: \dong{6.0cm}\quad Mã sinh viên: \dong{3.0cm}\quad Lớp: \dong{2.0cm}\par\vspace{2pt}\rule{\textwidth}{0.6pt}',
         r'\phieuphan{A}{Trắc nghiệm \textmd{\textit{(1,8 điểm) — ghi A, B hoặc C}}}',
         r'\begin{center}\begin{tabular}{|>{\bfseries}c|*{12}{>{\centering\arraybackslash}p{0.82cm}|}}\hline Câu' + so + r'\\\hline Đáp án' + ' &' * 12 + r'\\\hline\end{tabular}\end{center}',
         r'\phieuphan{B}{Phụ thuộc hàm \textmd{\textit{(2,8 điểm)}}}',
         r'\textbf{B1. Bao đóng}\par\smallskip',
         r'\begin{center}\begin{tabular}{|c|p{3.25cm}|c|p{3.25cm}|}\hline',
         r'\textbf{B1a}\ \ $\{%s\}^+$ & & \textbf{B1b}\ \ $\{%s\}^+$ & \\\hline' % (B['B1'][0], B['B1'][1]),
         r'\textbf{B1c}\ \ $\{%s\}^+$ & & \textbf{B1d}\ \ $\{%s\}^+$ & \\\hline' % (B['B1'][2], B['B1'][3]),
         r'\end{tabular}\end{center}',
         r'\textbf{B2. Phân loại} \textit{(ghi K / S / N)}\par\smallskip',
         bang_ngang('Tập', [f'B2{x}' for x in O], [f'${x}$' for x in B['B2']], 'K/S/N'),
         r'\textbf{B3. Phủ tối thiểu} \textit{(khoanh tròn các số thuộc phủ tối thiểu của $F$)}\par\smallskip',
         r'\begin{center}\Large 1\qquad 2\qquad 3\qquad 4\qquad 5\qquad 6\qquad 7\qquad 8\qquad 9\qquad 10\end{center}',
         r'\phieuphan{C}{Phân rã \textmd{\textit{(2,0 điểm) — ghi Đ hoặc S}}}',
         r'\textbf{C1}\par\smallskip',
         r'\begin{center}\begin{tabular}{|l|p{3.1cm}|>{\centering\arraybackslash}p{3.6cm}|>{\centering\arraybackslash}p{4.2cm}|}\hline',
         r'\textbf{Ô} & \textbf{Phép phân rã} & \textbf{Không mất mát?} & \textbf{Bảo toàn phụ thuộc?}\\\hline',
         '\n'.join(f'C1{O[k]} & $\\{{{x},\\ {y}\\}}$ & & \\\\\\hline' for k, (x, y) in enumerate(C1['dec'])),
         r'\end{tabular}\end{center}',
         r'\textbf{C2}\par\smallskip',
         bang_ngang('FD', [f'C2{x}' for x in O], [f'${fdtex(x)}$' for x in C2['fds']], 'Đ/S', rong='1.55cm'),
         r'\newpage',
         r'\phieuphan{D}{Mô hình thực thể — liên kết \textmd{\textit{(1,2 điểm)}}}',
         r'\begin{center}\begin{tabular}{|c|>{\centering\arraybackslash}p{1.6cm}|p{10.5cm}|}\hline',
         r'\textbf{Ô} & \textbf{Đ/S} & \textbf{Khóa chính (nếu Đ)}\\\hline',
         '\n'.join(f'D{k} & & \\\\\\hline' for k in range(1, 9)),
         r'\end{tabular}\end{center}',
         r'\phieuphan{E}{Đại số quan hệ \textmd{\textit{(1,0 điểm)}}}',
         r'\begin{center}\begin{tabular}{|c|p{13.5cm}|}\hline\textbf{E1} & \\\hline\textbf{E2} & \\\hline\textbf{E3} & \\\hline\end{tabular}\\[6pt]',
         r'\begin{tabular}{|c|p{3cm}|c|p{3cm}|}\hline\textbf{E4} & & \textbf{E5} & \\\hline\end{tabular}\end{center}',
         r'\phieuphan{F}{Tự luận ngắn \textmd{\textit{(1,2 điểm)}}}',
         r'\textbf{F1} \textit{(tối đa 3 dòng)}\par\smallskip\khung{3}\medskip',
         r'\textbf{F2} \textit{(tối đa 4 dòng)}\par\smallskip\khung{4}']
    return '\n'.join(o)


def chu_thich(D):
    return ('Chữ nhật nét đôi = thực thể yếu; thoi nét đôi = liên kết định danh; bầu dục nét đôi = thuộc tính đa trị; '
            'gạch chân = khóa chính; gạch chân *nghiêng* = khóa bộ phận.')


def quy_uoc(D):
    return (f"**Quy ước đặt tên khóa ngoại:** khóa ngoại sinh ra từ liên kết đệ quy `{D['rec']}` đặt tên `{D['fkRec']}`; "
            f"khóa ngoại sinh ra từ liên kết `{D['pt']}` đặt tên `{D['fkPt']}`.")


def bang_E(D, E):
    return [f"`{D['E3']}(~{D['k3']}~, ..., {E['lay']})`",
            f"`{D['E4']}(~{D['k4']}~, ..., {D['e2']})`",
            f"`{D['ph']}(~*{D['k3']}*~, ~*{D['k4']}*~, TrangThai)`"]


STANDALONE = r"""% Xuất riêng sơ đồ ER (cho bản Word)
\documentclass[11pt,border=3pt]{standalone}
\usepackage{amsmath}
\usepackage{fontspec}
\usepackage{unicode-math}
\setmainfont{Latin Modern Roman}
\setmathfont{Latin Modern Math}
\usepackage{tikz}
\usetikzlibrary{shapes.geometric,calc}
\begin{document}
\input{SoDoER.tex}
\end{document}
"""


# ------------------------------------------------------------------ JSON cho bản Word
def json_de(ma, de, A, d):
    D, E, B, C1, C2 = de['D'], de['E'], de['B'], de['C1'], de['C2']
    f123, (q4, f4, _), (q5, f5, _) = bieu_thuc(D, E, 'docx')
    return dict(
        made=ma,
        A=[dict(n=q['n'], text=q['text'], opts=q['opts'], inline=q['inline']) for q in A],
        B=dict(F=Ftex(B['F']), B1=B['B1'], B2=B['B2'], B3=[fdtex(x) for x in B['B3']]),
        C1=dict(F=Ftex(C1['F']), dec=[f'\\{{{x},\\ {y}\\}}' for x, y in C1['dec']]),
        C2=dict(S=C2['S'], fds=[fdtex(x) for x in C2['fds']]),
        D=dict(chuThich=chu_thich(D), quyUoc=quy_uoc(D), rels=[x for x, _, _ in d]),
        E=dict(bang=bang_E(D, E), q123=E['q123'], f123=f123, q4=q4, f4=f4, q5=q5, f5=f5),
        F=dict(F=Ftex(C1['F'])),
    )


# ------------------------------------------------------------------ đáp án
def dap_an(ma, de, A, b, c1, c2, d, f):
    D, E, B, C1 = de['D'], de['E'], de['B'], de['C1']
    _, (q4, _, op4), (q5, _, op5) = bieu_thuc(D, E, 'tex')
    o = [f"## Mã đề {ma} — {de['boiCanh']}", '']
    o += ['**Phần A.** ' + ' · '.join(f"{q['n']}{q['dap']}" for q in A), '']
    o += ['| Câu | Đáp án | Lý do |', '|---|---|---|']
    o += [f"| {q['n']} | **{q['dap']}** {q['opts'][ABC.index(q['dap'])]} | {q['lydo']} |" for q in A]
    o += ['', f"**Phần B.** $R(A,B,C,D,E,G)$, ${Ftex(B['F'])}$. "
          f"${b['L']}$ chỉ ở vế trái, ${b['N']}$ không xuất hiện → mọi khóa chứa ${''.join(sorted(b['L'] + b['N']))}$. "
          f"**Khóa ứng viên: {', '.join('$' + k + '$' for k in b['keys'])}.**", '']
    o += ['- B1: ' + ' · '.join(f"B1{O[k]} $\\{{{x}\\}}^+={cl}$" for k, (x, cl) in enumerate(b['B1']))]
    o += ['- B2: ' + ' · '.join(f"B2{O[k]} {x}: **{v}**" for k, (x, v) in enumerate(b['B2']))]
    phu = [str(k) for k, _, t in b['B3'] if t == 'phu']
    thua = [f"{k} (${fdtex(x)}$)" for k, x, t in b['B3'] if t == 'thua']
    khong = [f"{k} (${fdtex(x)}$)" for k, x, t in b['B3'] if t == 'khong']
    o += [f"- B3: phủ tối thiểu = **{', '.join(phu)}**. Suy diễn được nhưng thừa: {', '.join(thua)}; "
          f"không suy diễn được: {', '.join(khong)}."]
    o += ['', f"**Phần C1.** $R(A,B,C,D)$, ${Ftex(C1['F'])}$.", '',
          '| Ô | Phân rã | Không mất mát? | Bảo toàn phụ thuộc? |', '|---|---|---|---|']
    o += [f"| C1{O[k]} | {{{x}, {y}}} | **{l}** | **{p}** |" for k, ((x, y), l, p) in enumerate(c1)]
    o += ['', f"**Phần C2** (chiếu lên ${de['C2']['S']}$): " +
          ' · '.join(f"C2{O[k]} ${fdtex(x)}$ **{v}**" for k, (x, v) in enumerate(c2))]
    o += ['', '**Phần D.**', '', '| Ô | Quan hệ | Đáp án |', '|---|---|---|']
    o += [f"| D{k} | `{x}` | " + (f"**Đ**, khóa {g}" if ok else f"**S**: {g}") + ' |' for k, (x, ok, g) in enumerate(d, 1)]
    o += ['', f"**Phần E.** E1 = `{E['lay']}` · E2 = `TrangThai='{E['Y']}'` · E3 = `{D['e2']}='{E['X']}'` · "
          f"E4 = **{op4}** · E5 = **{op5}** (câu \"mọi\" dùng phép chia, câu \"không/chưa\" dùng phép hiệu)."]
    nl = f"${f['N']}$ không xuất hiện trong $F$, ${f['L']}$ chỉ ở vế trái"
    o += ['', f"**Phần F.** F1: {nl} → mọi khóa chứa ${''.join(sorted(f['L'] + f['N']))}$. "
          f"Khóa: {', '.join('$' + k + '$' for k in f['keys'])}; thuộc tính khóa: ${f['tk']}$ (tất cả). "
          f"Vế phải của mọi phụ thuộc đều là thuộc tính khóa → đạt 3NF.",
          f"F2: không đạt BCNF. (a) Vi phạm: " +
          ', '.join(f"${fdtex(x)}$ (${x.split('>')[0]}^+={f['bd'][x]}$)" for x in f['vipham']) +
          f". (b) Phân rã: {', '.join('$' + r + '$' for r in f['con'])}. (c) Mất: " +
          ', '.join(f"${fdtex(x)}$" for x in f['mat']) + '.', '']
    return '\n'.join(o)


# ------------------------------------------------------------------ chạy
def main():
    build = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'build'))
    md = ['# Đáp án các đề thi thử giữa kỳ (mã 201–210)', '',
          'Sinh tự động bởi `nguon/taoDe.py`; mọi đáp án Phần B, C, F được tính bằng `nguon/fd.py`.',
          'Khung đề giống đề thật mã 104 (`../NganHang_GiuaKy_MaDe104.md`). Ký hiệu: K khóa ứng viên, S siêu khóa không tối thiểu,',
          'N không phải siêu khóa.', '']
    for ma, de in DE.items():
        A = lam_A(ma, de)
        b = lam_B(ma, de['B'])
        c1 = lam_C1(ma, de['C1'])
        c2 = lam_C2(ma, de['C2'], b['F'])
        d = lam_D(ma, de['D'])
        f = lam_F(ma, de['C1'])
        out = os.path.join(build, ma)
        os.makedirs(out, exist_ok=True)
        open(os.path.join(out, 'DeLuyen.tex'), 'w', encoding='utf-8').write(tex_de(ma, de, A, b, c1, d, de['E']))
        open(os.path.join(out, 'SoDoER.tex'), 'w', encoding='utf-8').write(so_do(de['D']))
        open(os.path.join(out, 'SoDoER_standalone.tex'), 'w', encoding='utf-8').write(STANDALONE)
        json.dump(json_de(ma, de, A, d), open(os.path.join(out, 'DeLuyen.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        md.append(dap_an(ma, de, A, b, c1, c2, d, f))
        print(f'{ma}: A={"".join(q["dap"] for q in A)}  khóa B={b["keys"]}  C1={[(l, p) for _, l, p in c1]}')
    open(os.path.join(HERE, '..', 'DapAn_DeLuyen_GiuaKy.md'), 'w', encoding='utf-8').write('\n'.join(md))


if __name__ == '__main__':
    main()
