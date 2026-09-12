---
name: rinpa-gold-ground
description: Rinpa (琳派) gold-leaf screen aesthetic — a visible gold-leaf field with leaf seams, outline-free flat mineral colour, tarashikomi pooled-ink clouds, motifs cropped by the frame, and sparse broken gold linework.
---

# 琳派 Rinpa — 金地・溜込・断ち切り

> 江戶前期の京都、本阿弥光悦と俵屋宗達に始まり、尾形光琳、酒井抱一へ受け継がれた金地障屏画の視覚言語を、そのまま網頁の規格書にしたもの。
> 產業は問わない。地が金であり、色に輪郭がなく、母題が縁で断たれてゐれば、それは琳派である。

---

## 一、設計哲學

琳派は流派ではなく**私淑**で繋がった系譜である。光琳は宗達を直接には知らず、抱一は光琳を直接には知らない。それぞれが百年ごしに前の絵を見て、真似ではなく規則だけを取り出して継いだ。つまり琳派とは初めから「**再現可能な規格**」として存在した——本館の SKILL.md にもっとも近い性質の流派であり、それがこの流派をここへ入れる理由である。

規格の中身は三つに要約できる。

1. **地は描かれない、貼られる。** 金箔は一枚ずつ並べて貼るので、必ず継ぎ目（箔足）が残り、一枚ごとに色が違う。均一に光る金は金ではなく、金色である。
2. **形は線ではなく境目で決まる。** 溜込（たらしこみ）は、乾ききらぬ色の上に別の色を落として滲ませる技法で、輪郭線を引かずに形を出す。線で囲った瞬間にこの流派ではなくなる。
3. **画面は世界の一部を切り取ったものである。** 母題は必ず縁で断たれ、構図の重心は片側へ寄る。全部入っている絵は説明図であり、断たれた絵は外へ続く。

網頁に移すときの追加規律（原作には無い、こちらで足すもの）：

- 長文は必ず「紙」の上に置き、金の上に直接置かない（金地の明度は約 62%、その上の墨は対比 5:1 前後にしかならない）。紙（胡粉 `#EFE7D2`）の上なら 12:1 以上になる。
- 溜込は**装飾ではなく状態表示に使える**。滲みの広がりは連続量なので、量を伝える表現に転用できる（例：本 demo では紙の潤みを表す）。
- 縦組みは見出し・品書・証書に限り、説明文は横組みにする。縦組みの中の数字は二桁なら縦中横、三桁以上なら横倒し。

---

## 二、本風格の 5 つの不可省略特徴

**この五つのうち一つでも外すと、金を敷いても琳派にはならない。**

### 特徴 1｜金地（箔足の見える金の地）

金は「背景色」ではなく「材料」である。必ず (a) 四角い箔の継ぎ目が規則格子として見え、(b) 一枚ごとに色が違い、(c) 光の帯が面を移動する。この三つが揃って初めて「貼ってある」ように見える。**平坦な `#D4AF37` は金ではない。**

```css
:root{ --kin:#B9932F; --leaf:108px; }        /* 三号箔＝109mm 角に由来 */
body{
  background-color:var(--kin);
  /* 箔足：暗い継ぎ目 1.2px ＋ 明るい返し 1.4px を縦横に */
  background-image:
    repeating-linear-gradient(90deg,rgba(255,243,201,.42) 0 1.2px,rgba(94,68,16,.34) 1.2px 2.6px,transparent 2.6px var(--leaf)),
    repeating-linear-gradient(0deg, rgba(255,243,201,.42) 0 1.2px,rgba(94,68,16,.34) 1.2px 2.6px,transparent 2.6px var(--leaf)),
    url("data:image/svg+xml,…");             /* 一枚ごとの濃淡（下記） */
}
/* 照り＝面を移動する反射帯。これが無いと金は紙になる */
.teri{position:fixed;inset:-30% -40%;pointer-events:none;
  background:linear-gradient(104deg,rgba(255,246,214,0) 32%,rgba(255,246,214,.5) 44%,
             rgba(255,255,242,.86) 50%,rgba(255,246,214,.46) 56%,rgba(255,246,214,0) 68%);
  mix-blend-mode:soft-light;animation:teri 26s linear infinite}
@keyframes teri{from{transform:translate3d(-44%,0,0)}to{transform:translate3d(44%,0,0)}}
```

一枚ごとの濃淡タイル（6×6 枚＝648px 角、決定性乱数で `rgb(146–176, 118–144, 38–62)`）：

```js
// 同じ seed なら必ず同じ地になる
for(let y=0;y<6;y++)for(let x=0;x<6;x++){
  const l=146+r()*30, a=118+r()*26, b=38+r()*24;
  rects+=`<rect x="${x*108}" y="${y*108}" width="108" height="108" fill="rgb(${l|0},${a|0},${b|0})"/>`;
}
```

### 特徴 2｜溜込（輪郭線を持たない滲みの縁）

先に置いた色が乾ききらぬうちに次の色を落とし、二色の境目を筆ではなく水に決めさせる。**網頁では SVG filter で再現する**——ぼかし → 乱流で変位 → アルファを段階化、の三段。ぼかしだけでは「ぼやけた円」にしかならず、変位を通して初めて雲になる。

```html
<filter id="tarashi" x="-70%" y="-70%" width="240%" height="240%" color-interpolation-filters="sRGB">
  <feGaussianBlur stdDeviation="5.8" result="b"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.024" numOctaves="3" seed="11" result="n"/>
  <feDisplacementMap in="b" in2="n" scale="30" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feComponentTransfer in="d">           <!-- これが無いと霧になる。縁を立て直す -->
    <feFuncA type="table" tableValues="0 0.05 0.5 0.9 1"/>
  </feComponentTransfer>
</filter>
<!-- 滲みは必ず「濡れてゐる面」の内側で止まる＝親の形で clip する -->
<clipPath id="wet"><path d="…花弁…"/></clipPath>
<path d="…花弁…" fill="#1F3D7A"/>
<g clip-path="url(#wet)"><path d="…雲…" fill="#BFD8C7" filter="url(#tarashi)"/></g>
```

三つの数字がこの技法の全部である（w は 0–1 の潤み）：

| 量 | 式 | 意味 |
|---|---|---|
| 雲の径 | `r = r₀(0.34 + 1.55w)` | 濡れてゐるほど遠くまで走る |
| 縁のぼけ | `σ = 13·w^1.35` | `feGaussianBlur` の `stdDeviation` |
| 縁の崩れ | `D = 30(1 − |w−0.55| / 0.55)` | `feDisplacementMap` の `scale`。**w=0.55 で最大** |

`D` が中間で最大になるのが要点である。濡れすぎれば境目ごと溶けて一色に化け、乾きすぎれば境目は動かず硬い縁が残る。**雲は、湿りの中間でしか生まれない。**

### 特徴 3｜断ち切り（母題は画面の縁で切られる）

母題を画面内に収めてはならない。実装は「大きく描いて枠で切る」であって「枠に合わせて小さく描く」ではない。

```html
<clipPath id="ban"><rect x="0" y="0" width="480" height="300"/></clipPath>
<g clip-path="url(#ban)">
  <ellipse cx="18"  cy="52"  rx="140" ry="86" fill="#2E6E5B"/>  <!-- 左へ出る -->
  <ellipse cx="470" cy="288" rx="170" ry="98" fill="#1F3D7A"/>  <!-- 右下へ出る -->
  <ellipse cx="240" cy="-12" rx="106" ry="66" fill="#6B4A8E"/>  <!-- 上へ出る -->
</g>
```

判定式：**外へはみ出した母題の面積 ÷ 母題の総面積 ≥ 0.30**。これを下回ると画面は途端に説明図の顔になる。重心も中央に置かない（画面中心からの偏心 ≥ 0.075·対角長）。

### 特徴 4｜平塗（陰影・遠近・グラデーションが一切ない）

同じ形をいくつも並べ、大小と位置だけで前後を言う。**`box-shadow` のぼかし、`filter:drop-shadow`、色のグラデーション、角丸、いずれも禁止。** 唯一許される連続階調は溜込の縁と金の照りだけ。

```css
.flat{ background:#1F3D7A; border-radius:0; box-shadow:none; }
/* 立体感は「重ね順」と「大きさ」だけで作る */
.mae{ /* 手前 */ transform:scale(1.0) }
.oku{ /* 奥   */ transform:scale(.72) }   /* 遠近法ではなく寸法差 */
```

色の割り（面積比を守ること。金が 45% を切ると、金が「地」ではなく「隙間」に見える）：

| 色 | hex | 割 | 置く場所 |
|---|---|---|---|
| 金（箔） | `#B9932F` | 45% | 地。全面。箔足が必ず見えること |
| 群青 | `#1F3D7A` | 16% | 花・波の地色 |
| 緑青 | `#2E6E5B` | 12% | 葉・茎 |
| 白緑 | `#BFD8C7` | 7% | **溜込にのみ。**輪郭には使わない |
| 墨 | `#1A1710` | 12% | 文字と外枠。絵の輪郭には使わない |
| 朱 | `#C0392B` | ≤4% | 印、要（かなめ）、現在地。ほかに使わない |

### 特徴 5｜付描（最後に置く、途切れた極細の金線）

すべてが済んだあとに、極細（1.0–1.2px）の金線を**一部だけ**置く。全周を囲ってはならない——囲った瞬間に輪郭線になり、特徴 2 を殺す。切れ目の長さは不規則にする。

```js
// 決定性の破線パターン：3–25px の線、7–37px の空き、を八組
let a=[]; for(let i=0;i<8;i++){ a.push(3+r()*22, 7+r()*30); }
path.setAttribute('stroke-dasharray', a.map(n=>n.toFixed(1)).join(' '));
```
```css
.tsukegaki{ fill:none; stroke:#8C6C1E; stroke-width:1.1; opacity:.8 }
```

---

## 三、色彩系統

| 役 | hex | 用途 | 比 |
|---|---|---|---|
| 金地 | `#B9932F` | 全ページの地。単色ではなく箔タイル＋照り | 45% |
| 箔の高み | `#D8B860` | 箔足の返し、footer のリンク | — |
| 箔の陰 | `#8C6C1E` | 箔足の谷、付描の金線 | — |
| 青金 | `#A79E52` | **現在地の箔一枚だけ**（四号色に相当） | ≤2% |
| 群青 | `#1F3D7A` | 花・波、リンク文字（`#12306A`） | 16% |
| 緑青 | `#2E6E5B` | 葉・茎 | 12% |
| 白緑 | `#BFD8C7` | 溜込の色。輪郭・文字には使わない | 7% |
| 墨 | `#1A1710` | 本文、外枠、footer 地 | 12% |
| 胡粉（紙） | `#EFE7D2` | 長文の下敷き。金の上に長文を置かない | — |
| 朱 | `#C0392B` | 印、要、警告、拒否。**それ以外禁止** | ≤4% |

禁：紫青グラデーション、ネオン、金以外のグラデーション、半透明のぼかし板（glassmorphism）、`#D4AF37`（いわゆる「ゴールド」）。

---

## 四、字體系統

```css
font-family:"Noto Serif TC","Zen Old Mincho",serif;   /* 明朝のみ。ゴシック禁止 */
```

| 役 | 字級 | 字重 | 行高 |
|---|---|---|---|
| 扇面／主標題 | 26–41px | 900 | 1.35 |
| 節標題 | 20–24px | 900 | 1.4 |
| 本文 | 15.4–16px | 400 | 1.85 |
| 縦組み（品書・証書） | 15.4–16.5px | 400/900 | 1.9 |
| 標籤 `.lbl` | 12.5px | 400・字間 .3em | — |

**等幅（monospace）は使わない。** 数字にも明朝を使う。これは重要で、mono の数字が入った瞬間に画面は「計測機器」の顔になり、この流派から離れる。

縦組みの数字：

```css
.tate{ writing-mode:vertical-rl; text-orientation:upright }
.tate .num { text-combine-upright:all; text-orientation:mixed }  /* 二桁＝縦中横 */
.tate .yoko{ text-orientation:sideways; text-combine-upright:none } /* 三桁以上＝横倒し */
```

---

## 五、版面與網格

- **極座標を持つ版面を一つ置く。** 扇面（円環扇形）や屏風の折りは、この流派が持つ唯一の非直交レイアウトで、これがあるだけで画面は他と別物になる。要（かなめ）を原点に、各欄を `rotate(θ)` で放射状に並べる。
- 扇面の作り方：内半径 Ri、外半径 Ro、開き角 Θ（110–140°）。文字は一文字ずつ半径上に置き、各字を `rotate(θ)` する（`textPath` は基線を曲げるだけで字は立たない）。

```js
const px=(r,a)=>cx+r*Math.sin(a*Math.PI/180), py=(r,a)=>cy-r*Math.cos(a*Math.PI/180);
const sector=(ri,ro,a0,a1)=>`M${px(ri,a0)} ${py(ri,a0)}A${ri} ${ri} 0 0 1 ${px(ri,a1)} ${py(ri,a1)}`
  +`L${px(ro,a1)} ${py(ro,a1)}A${ro} ${ro} 0 0 0 ${px(ro,a0)} ${py(ro,a0)}Z`;
```

- 留白は「中央」に取る。両側に寄せて中を空ける。左右対称にしない。
- 角丸ゼロ。枠は 1.4–2.6px の墨実線。
- ≤900px：極座標の版面は残し、導覽と多欄構成だけ横一列へ落とす。≤560px：箔タイルを 432px 角に縮める（画面が小さいと箔が大きすぎて格子に見えなくなる）。

---

## 六、元件配方

### 導覽——箔足貼り直し（leaf-relaid）

現在地を「色を変えて目立たせる」のではなく、**箔の格子から一枚だけずれてゐる**ことで示す。

```css
.haku{position:absolute;top:18px;right:22px;display:flex}
.haku .lf{width:96px;height:96px;background:#BE9A34;border:1.2px solid rgba(94,68,16,.5);
  box-shadow:inset 1.2px 1.2px 0 rgba(255,243,201,.55);margin-left:-1.2px;
  display:flex;flex-direction:column;justify-content:flex-end;padding:0 9px 10px;text-decoration:none}
.haku .lf:hover{transform:translateY(-2px) rotate(-.5deg);background:#C7A33C;z-index:5}
.haku .lf[aria-current="page"]{                    /* ← 一枚だけ貼り直してある */
  transform:rotate(1.6deg) translate(-2px,-3px);
  background:#A79E52;                              /* 青金（別の号数の箔） */
  z-index:6;box-shadow:inset 1.2px 1.2px 0 rgba(255,250,222,.6),2px 3px 0 rgba(60,44,10,.24)}
```

### 紙（本文ブロック）

```css
.kami{background:#EFE7D2;border:1.4px solid #1A1710;padding:30px 34px;margin:0 0 26px}
/* 影を付けない。紙は金の「上」ではなく金と同じ平面に嵌まってゐる */
```

### 按鈕

```css
.btn{border:1.6px solid #1A1710;background:#EFE7D2;color:#1A1710;padding:10px 20px;
  font-weight:900;letter-spacing:.08em;transition:background-color .09s linear,color .09s linear}
.btn:hover,.btn:focus-visible{background:#1F3D7A;color:#EFE7D2;outline:none}  /* 反転のみ。沈まない */
```

### 選択肢（分割された一列）

```css
.opts{display:flex;border:1px solid rgba(26,23,16,.35)}
.opts label{flex:1;border-right:1px solid rgba(26,23,16,.28);padding:9px 10px;text-align:center}
.opts label:last-child{border-right:0}
.opts label.sel{background:#1F3D7A;color:#EFE7D2;font-weight:900}
.opts input{position:absolute;opacity:0;width:0;height:0}
.opts label:focus-within{outline:2.4px solid #C0392B;outline-offset:-2px}
```

### 印（決定性生成の朱印）

```js
// 同じ番号なら必ず同じ印。8–13 の不規則な多角形を Catmull–Rom で閉じ、白抜きの棒を四本
const r=mulberry(fnv('seal'+no)), n=8+((r()*6)|0), pts=[];
for(let i=0;i<n;i++){const a=i/n*Math.PI*2, rr=17*(0.72+0.4*r());
  pts.push([26+Math.cos(a)*rr, 26+Math.sin(a)*rr]);}
// fill:#C0392B、内側に <rect fill="#EFE7D2"> を四本
```

### footer

墨地（`#171308`）に 3px の墨線、リンクは箔の高み `#D8B860`。金地とのあいだにグラデーションを入れない。

---

## 七、動效規則（四種すべて必須）

| 種 | 何 | 具体値 |
|---|---|---|
| **ambient** | 照り（金地を移動する反射帯） | `26s linear infinite`、`mix-blend-mode:soft-light`、±44% を平行移動 |
| **input** | 雲の再滲み（hover） | `stdDeviation +2.2`／`scale +7` へ **90ms** で寄せ、離れたら 160ms で戻す |
| **transition** | 扇を繰る（要を軸にした扇形ワイプ） | 頂角 102° の楔を要中心に `0° → −104° → −140°`、620ms、`cubic-bezier(.32,.86,.3,1)`、終端で opacity 0 |
| **signature** | **溜込前線** | 滴下から `700 + 1500w` ms、`σ: 0.5→13w^1.35`、`scale: 0→30(1−|w−.55|/.55)`、雲は `scale .30→1.0`（要素中心ではなく滴下点を原点にした translate–scale–translate）、`1−(1−k)^2.4` |

**降級（`prefers-reduced-motion: reduce`）**

- ambient：帯を中央で停止（金は静止するが箔足と濃淡は残るので「貼ってある」ことは伝わる）
- input：即時に最終値
- transition：ワイプ要素そのものを生成しない
- signature：滲みは**最終形で即座に現れる**（過程だけを省く。形・径・縁はまったく同じ）
- 乾き（本 demo の潤みの減衰）は**止めない**——これはアニメーションではなく操作対象そのものであり、止めると機能が消える

**禁止**：淡入式スクロール揭示、視差、数字のカウントアップ、跑馬燈、`stroke-dashoffset` の描線（線を「描く」動きは特徴 2 と真っ向から矛盾する）、押下時の硬い影。

---

## 八、插畫與圖像風格

技法名：**溜込雲形構成（tarashi-cloud）**。原語は四つだけ。

1. **平塗の閉形**——輪郭線を持たない閉じたパス。葉は「背骨＋幅プロファイル」を左右に法線オフセットして閉じる。花弁は「向き＋長さ＋幅＋反り」から同様に作る。点列は Catmull–Rom で三次ベジエへ変換する（多角形のままだと角が立ち、平塗の柔らかさが出ない）。
2. **溜込雲**——8–9 個の放射ローブを半径ジッタで散らして閉じた形。必ず親の形で clip する。
3. **箔足格子**——画像の中にも 108px 格子が透けてゐること。
4. **付描**——特徴 5。最後に、一部だけ。

```js
function closedSpline(p){                        // 全ての形の共通経路
  const n=p.length; let d=`M${p[0][0]} ${p[0][1]}`;
  for(let i=0;i<n;i++){
    const p0=p[(i-1+n)%n],p1=p[i],p2=p[(i+1)%n],p3=p[(i+2)%n];
    d+=`C${p1[0]+(p2[0]-p0[0])/6} ${p1[1]+(p2[1]-p0[1])/6} `
      +`${p2[0]-(p3[0]-p1[0])/6} ${p2[1]-(p3[1]-p1[1])/6} ${p2[0]} ${p2[1]}`;
  }
  return d+'Z';
}
```

判定基準：**色を全部抜いても「どちらが先に置かれた色で、どちらが後から溜込んだ色か」が読める**こと。読めなければ滲みが足りないか、clip を忘れてゐる。

禁止：写実描写、細線幾何線描（thin-lineart）、半調網点、`feTurbulence` による全面の手ぶれ（これは迷幻海報の語彙であり、字の縁を潰す）、外部画像。

---

## 九、Logo 與 Favicon 設計指南

- 形は**扇形**（円環扇形または半円扇）。要に朱の点を一つ。
- 中身は本文と同じ引擎で作る——葉二枚と花一輪、そこに溜込雲を一つ、必ず clip して入れる。ロゴだけ別の描き方をしない。
- 外周のみ 2.2px の墨線。内部の形には輪郭線を付けない（特徴 2）。
- favicon は 32×32 の inline SVG data URI。扇形＋骨三本＋群青の楕円＋白緑の楕円、それだけ。16px でも「扇の形」と「金／青／白緑」が判れば足りる。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=...%3E">
```

---

## 十、Do & Don't

**Do**

- 金は必ず「貼った」ものとして扱う（箔足・濃淡・照りの三点セット）
- 溜込は必ず親の形で clip する（滲みが濡れた面から出た瞬間に嘘になる）
- 母題は縁で断つ。三割以上外へ出す
- 長文は紙の上に置く
- 朱は印と現在地だけに使う
- 明朝だけを使う

**Don't**

- ❌ 平坦な金色一色の背景（`#D4AF37` のべた塗り）
- ❌ 絵の輪郭線（墨でも金でも、全周を囲った時点で失格）
- ❌ 陰影・遠近・グラデーション・角丸・ぼかし影
- ❌ 等幅数字、量表（ゲージ）、図番号の角標——この流派を計測機器に見せる
- ❌ 中央揃えの大見出し＋副題＋ボタン二つ＋角丸カード三枚
- ❌ 紫青グラデーション、emoji アイコン、Lorem ipsum、「EST. 19xx」徽章
- ❌ 跑馬燈、視差、スクロール揭示、数字カウントアップ
- ❌ 溜込を「ぼかし」だけで作ること（変位が無い滲みはただの霧）

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Zen+Old+Mincho:wght@400;700;900&display=swap" rel="stylesheet">
<style>
 body{margin:0;font-family:"Noto Serif TC","Zen Old Mincho",serif;color:#1A1710;background-color:#B9932F;
  background-image:repeating-linear-gradient(90deg,rgba(255,243,201,.42) 0 1.2px,rgba(94,68,16,.34) 1.2px 2.6px,transparent 2.6px 108px),
                   repeating-linear-gradient(0deg,rgba(255,243,201,.42) 0 1.2px,rgba(94,68,16,.34) 1.2px 2.6px,transparent 2.6px 108px),
                   url("data:image/svg+xml,…箔タイル…");line-height:1.85}
 .wrap{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:0 22px}
 .kami{background:#EFE7D2;border:1.4px solid #1A1710;padding:30px 34px;margin:0 0 26px}
</style></head><body>
<div class="teri" aria-hidden="true"></div>            <!-- ambient：照り -->
<div class="wrap">
  <nav class="haku" aria-label="頁">                   <!-- 現在地＝貼り直された一枚 -->
    <a class="lf" href="index.html" aria-current="page"><b>見世</b><i>一</i></a>
    <a class="lf" href="two.html"><b>次の頁</b><i>二</i></a>
  </nav>
  <main>
    <div class="fan"><svg viewBox="0 0 1000 566"><!-- 極座標の版面。文字は一字ずつ rotate --></svg></div>
    <section class="kami"><h2>紙の上に長文を置く</h2><p>…</p></section>
  </main>
</div>
<footer>…墨地・箔の高みのリンク…</footer>
</body></html>
```

---

## 十二、技術實作與相容性

本 demo が採用した三層の技術と、2026-09-02 時点の実測・査証。

### (1) SVG filter：`feGaussianBlur` → `feTurbulence` → `feDisplacementMap` → `feComponentTransfer`（A 渲染層）

**承載**：特徴 2（溜込）と簽名動效「溜込前線」。潤み w がそのまま `stdDeviation` と `scale` に書き込まれる。

**支援**：MDN／caniuse（`mdn-svg_elements_fedisplacementmap`）で **Baseline Widely available、2015-07 から全ブラウザ**。`feTurbulence`／`feGaussianBlur`／`feComponentTransfer` も同世代。`color-interpolation-filters="sRGB"` を明示すること（既定の linearRGB では白緑が飛ぶ）。

**Fallback**：フィルタが無視された場合、雲は「輪郭のはっきりした閉形」として残る。形・色・位置・面積はすべて同じで、失われるのは縁の柔らかさだけ。潤みの数値は極書に文字で書かれてゐるため**情報の損失はゼロ**。

**実測**：滲み一つあたりのフィルタ適用領域は約 120×120px、同時にアニメーションするのは常に一つだけ。1 フレームあたりの DOM 書き込みは属性 2 個（`stdDeviation`／`scale`）と `transform` 1 個で、`getBoundingClientRect` 呼び出しゼロ、レイアウト再計算なし（layout thrashing なし）。

### (2) `writing-mode: vertical-rl` ＋ `text-orientation` ＋ `text-combine-upright`（C 版面與樣式層）

**承載**：品書・図式索引・極書・請書の縦組み。この流派の版面は縦組みを前提に成立してゐる（横組みの品書は琳派に見えない）。

**支援**（2026-09-02 査証）：
- `writing-mode` — MDN：**Baseline Widely available、2017-03 から**
- `text-orientation` — MDN：**Baseline Widely available、2020-09 から**
- `text-combine-upright` — MDN：**Baseline Widely available、2022-03 から**（Chrome 48+／Edge 79+／Safari 15.4+／iOS Safari 15.4+／Opera 35+／Samsung Internet 5+）

**Fallback**：`text-combine-upright` が効かない場合、二桁の数字は一字ずつ縦に並ぶだけで、値は変わらない。三桁以上には `text-orientation:sideways`（横倒し）を使い分けてゐる——`text-combine-upright:all` は一文字分の幅に押し込む指定なので、五桁の金額に使うと潰れる。**これは互換性の話ではなく組版の話で、対応環境でも守るべき使い分けである。**

### (3) 決定性擬似乱数（FNV-1a → mulberry32）＋ 乾燥場（E 資料與生成層）

**承載**：母題・雲・印・扇番号のすべて。同じ入力からは必ず同じ絵が出るため、`?ogi=` の共有コードで一枚を完全に再現できる。乾燥は `w = e^(−t/τ)`、τ は面の大きさで 3.40／2.60／2.00／1.60 秒。

**支援**：純 JavaScript（`Math.imul`）のみ。ブラウザ API 依存なし。`performance.now()`／`requestAnimationFrame`／`DOMPoint.matrixTransform` はいずれも Baseline Widely available。

**実測**（Node 22 単スレッド）：母題一式（平塗地＋四つの溜込面＋装飾）の生成が **0.515ms**、雲一つの経路生成が **5.2µs**。首屏の JavaScript 実行は母題一式＋SVG 組み立てで 10ms 未満（予算 100ms）。

### 效能預算（実測）

| 頁 | 大きさ（inline 全込み） | 予算 |
|---|---|---|
| `index.html` | 57.7 KB | ≤350 KB ✓ |
| `tarashi.html` | 64.4 KB | ✓ |
| `zushiki.html` | 90.2 KB | ✓ |
| `atsurae.html` | 32.0 KB | ✓ |

外部資源は Google Fonts のみ。外部画像・音声ファイルはゼロ。

### 無 JavaScript 時の挙動

- 扇面・二十四図・料の表・断ち切りの見本・溜込の見本（潤み 0.90 / 0.72 / 0.55 / 0.38 / 0.15 の五段）は**すべて静的 SVG**として書き出されてをり、完全に見える。
- 縦組み・箔地・照り（CSS アニメーション）も動く。
- 止まるのは「間合ひ」（時刻の計測）と誂への自動計算の二つだけで、どちらも同じ数値と同じ可否が頁に文字で全部書いてある。

---

*本規格書は範例站「照葉扇舖」（`sites/teriha/`）から抽出したもので、產業には依存しない。金地・溜込・断ち切り・平塗・付描の五つを守れば、酒舖でも診療所でも琳派になる。*
