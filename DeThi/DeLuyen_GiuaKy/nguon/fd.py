from itertools import combinations
def S(x): return frozenset(x)
def closure(X,F):
    X=set(X); ch=True
    while ch:
        ch=False
        for l,r in F:
            if set(l)<=X and not set(r)<=X: X|=set(r); ch=True
    return frozenset(X)
def keys(R,F):
    R=S(R); out=[]
    for k in range(1,len(R)+1):
        for c in combinations(sorted(R),k):
            c=S(c)
            if closure(c,F)==R and not any(o<=c for o in out): out.append(c)
    return out
def implies(F,l,r): return set(r)<=closure(l,F)
def split(F): return [(S(l),S(a)) for l,r in F for a in r]
def mincover(F):
    G=split(F)
    G2=[]
    for l,r in G:
        l=set(l)
        for a in sorted(l):
            if len(l)>1 and r<=closure(l-{a},G): l-={a}
        G2.append((S(l),r))
    G=list(dict.fromkeys(G2))
    i=0
    while i<len(G):
        rest=G[:i]+G[i+1:]
        if implies(rest,*G[i]): G=rest
        else: i+=1
    return G
def equiv(F,G): return all(implies(G,l,r) for l,r in F) and all(implies(F,l,r) for l,r in G)
def all_mincovers(F,R,maxsize=None):
    R=sorted(R); cands=[]
    for k in range(1,len(R)):
        for X in combinations(R,k):
            X=S(X); cl=closure(X,F)
            for a in R:
                if a in X or a not in cl: continue
                if any(a in closure(X-{b},F) for b in X): continue
                cands.append((X,S(a)))
    m=len(mincover(F)); res=[]
    for size in range(1,(maxsize or m+1)+1):
        for sub in combinations(cands,size):
            if not all(implies(sub,l,r) for l,r in F): continue
            if any(implies(sub[:i]+sub[i+1:],*sub[i]) for i in range(len(sub))): continue
            res.append(sub)
    return res
def proj(F,Ssub):
    out=[]
    for k in range(1,len(Ssub)):
        for X in combinations(sorted(Ssub),k):
            cl=closure(X,F)&S(Ssub)
            for a in sorted(cl-S(X)): out.append((S(X),S(a)))
    return out
def preserves(F,dec):
    G=[fd for Ri in dec for fd in proj(F,Ri)]
    return all(implies(G,l,r) for l,r in F)
def lossless(R,F,dec):
    # chase
    R=sorted(R); rows=[{a:(('a',a) if a in Ri else ('b',i,a)) for a in R} for i,Ri in enumerate(dec)]
    ch=True
    while ch:
        ch=False
        for l,r in split(F):
            for i in range(len(rows)):
                for j in range(i+1,len(rows)):
                    if all(rows[i][x]==rows[j][x] for x in l):
                        for a in r:
                            u,v=rows[i][a],rows[j][a]
                            if u!=v:
                                new=u if u[0]=='a' else v; old=v if new==u else u
                                for row in rows:
                                    for x in R:
                                        if row[x]==old: row[x]=new
                                ch=True
    return any(all(row[a][0]=='a' for a in R) for row in rows)
def fs(x): return ''.join(sorted(x))
def P(F): return ', '.join(f"{fs(l)}→{fs(r)}" for l,r in F)
def parse(s): return [tuple(p.split('>')) for p in s.split()]
