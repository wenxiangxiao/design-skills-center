---
name: czech-cubism-prism
description: Czech Cubism (Prague, 1911-1914) rebuilt as a web system - every surface is broken into solved prismatic facets, shaded in exactly three hard-edged steps, bounded by zigzag cornices and chamfered corners, and re-fractured by a site-wide load direction.
---

# 稜柱與金字塔 — 捷克立體主義（Czech Cubism）網頁規格書

> 讀完這份文件，你應該能在**任何產業**上做出一個一眼看得出是捷克立體主義的網站，而且不需要看過示範站。
> 示範站：晶合製冰廠（基隆和平島・製冰廠）。風格與內容分離——這份規格書不綁定製冰業。

---

## 一、設計哲學

一九一一年，一群從 Mánes 藝術家協會出走的布拉格建築師（Pavel Janák、Josef Gočár、Josef Chochol、Vlastislav Hofman、Otakar Novotný）成立了 Skupina výtvarných umělců（造形藝術家群）。他們讀了巴黎的立體主義繪畫，卻做出了完全不同的東西：巴黎人把物體拆開重組在畫布上，布拉格人把立體主義做成**真的可以蓋起來的房子、可以坐的椅子、可以喝咖啡的杯子**。世界上只有這裡把立體主義變成了建築與工藝。

Janák 一九一一年的文章〈稜柱與金字塔〉（Hranol a pyramida）給了這個流派唯一的一條理論：**平面（矩形、水平、垂直）是惰性的、是重力妥協的結果；斜面才是有生命的，因為材料在受力時本來就會沿著斜面破裂。** 所以形式不是造形偏好，是「這塊東西被壓的時候會怎麼裂」的結果。捷克立體主義的房子因此長成一堆稜柱：陽台是三稜錐、窗框是斜切的、簷口是連續的三角鋸齒、門廊的天花板像一塊被敲開的水晶。

把這條理論搬到網頁上，只需要接受一件事：

> **畫面上不應該存在一個完整的矩形平面。每一個面都要被斜稜切開，而斜稜的走向來自一個共用的受力方向。**

這也給了這個流派在網頁上唯一正確的互動：讓使用者改變那個受力方向，然後看著整頁重新破裂——**位置、內容、顏色、外框一個都不動，只有面的分割變了**。這不是特效，這是這個流派的本體。

一九一四年戰爭開始，這個流派只活了三年。戰後它變成 Rondokubismus（圓弧國家風格），加上了紅白色與半圓，那已經是另一件事——本規格書不做 Rondo。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是捷克立體主義了。這五項在示範站的每一頁上都找得到。

### 特徵 1 — 稜柱破面（prismatic faceting）：沒有一個平面是完整的

每一個容器的底不是 `background-color`，是**一組解出來的多邊形面**，每一面有自己的朝向、因此有自己的明度。作法：把容器的邊界寫成一組「往內升起」的斜面，取它們的**下包絡（lower envelope）**——這正是屋頂的作法，也正是一塊冰被敲開後的樣子。

```js
/* 完整可用的引擎（約 40 行）。輸入矩形與受力方向，輸出面與法線。 */
function clipHalf(poly,a,b,c){ // 保留 ax+by+c <= 0 的部分
  const out=[];
  for(let i=0;i<poly.length;i++){
    const P=poly[i],Q=poly[(i+1)%poly.length];
    const fp=a*P[0]+b*P[1]+c, fq=a*Q[0]+b*Q[1]+c;
    if(fp<=1e-9)out.push(P);
    if((fp<-1e-9&&fq>1e-9)||(fp>1e-9&&fq<-1e-9)){
      const t=fp/(fp-fq);out.push([P[0]+(Q[0]-P[0])*t,P[1]+(Q[1]-P[1])*t]);}}
  return out;}
function area(p){let s=0;for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length];
  s+=a[0]*b[1]-b[0]*a[1];}return Math.abs(s)/2;}

function prism(x,y,w,h,theta,o={}){
  const base=o.base??0.30, amp=o.amp??0.85, cham=o.chamfer??1.0, S=Math.min(w,h), pl=[];
  const slope=phi=>base+amp*(0.62*(0.5+0.5*Math.cos(2*(phi-theta)))    // 剪切項：±45° 破裂
                           +0.38*(0.5+0.5*Math.cos(phi-theta)));      // 正壓項：讓八個方向都不一樣
  const add=(nx,ny,px,py,s)=>pl.push({a:s*nx,b:s*ny,c:-s*(px*nx+py*ny)});
  [[0,1,x,y],[-1,0,x+w,y],[0,-1,x,y+h],[1,0,x,y]]                 // 四條邊，法線朝內
    .forEach(e=>add(e[0],e[1],e[2],e[3],slope(Math.atan2(e[1],e[0]))));
  if(cham>0){const r=Math.SQRT1_2;                                 // 四個削角面
    [[1,1,x,y],[-1,1,x+w,y],[-1,-1,x+w,y+h],[1,-1,x,y+h]].forEach(c=>{
      const nx=c[0]*r,ny=c[1]*r;add(nx,ny,c[2],c[3],slope(Math.atan2(ny,nx))*cham);});}
  const rect=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]], faces=[];
  for(let i=0;i<pl.length;i++){let q=rect;const P=pl[i];
    for(let j=0;j<pl.length&&q.length>2;j++){if(j===i)continue;const Q=pl[j];
      q=clipHalf(q,P.a-Q.a,P.b-Q.b,P.c-Q.c);}                      // 只留「我最低」的區域
    if(q.length>2&&area(q)>S*S*0.0022){
      const N=[-P.a,-P.b,1],L=Math.hypot(...N);
      faces.push({p:q,n:N.map(v=>v/L)});}}
  return faces;}
```

大面積（整個首屏）時再對最大的三個面各裂一次（同一支引擎、輸入改成該面的多邊形、受力方向偏轉 1.35 弧度），得到層級化的稜柱——這就是立體主義立面上「大稜柱上長小稜柱」的作法。一個 1280×780 的首屏在八個受力檔位上分別得 12～16 個面，八檔各不相同（剪切項的週期是 π，所以必須加一個週期 2π 的正壓項，否則 0° 與 180° 會解出同一張臉）。建議參數：`{base:0.30, amp:1.25, chamfer:0.75, skew:0.30}`。

渲染成不隨容器縮放變形的背景：

```html
<div class="pan"><svg class="pf" viewBox="0 0 1280 780"
     preserveAspectRatio="xMidYMid slice" aria-hidden="true"> …paths… </svg>
  <div class="wrap">…內容…</div></div>
```
```css
.pan{position:relative;isolation:isolate;background:var(--ice)}
.pf{position:absolute;inset:0;width:100%;height:100%;z-index:-1;display:block}
.pf .f{stroke:var(--ink);stroke-width:1.6;stroke-linejoin:miter;vector-effect:non-scaling-stroke}
```
`stroke-linejoin:miter` 與 `vector-effect:non-scaling-stroke` 兩條都不能省：前者保證稜線交會處是尖角（`round` 會把水晶變成鵝卵石），後者保證線寬不隨縮放變胖。

### 特徵 2 — 三階明度、硬邊、零漸層

立體感只准由**同一色相的三階平塗**造出來。三階由面的法線與一個固定光向的內積量化而得——不是設計師挑的顏色，是算出來的。

```js
const LIGHT=(v=>{const m=Math.hypot(...v);return v.map(x=>x/m);})([-0.50,-0.64,0.58]);
function step(n){const d=n[0]*LIGHT[0]+n[1]*LIGHT[1]+n[2]*LIGHT[2];
  return d>0.74?0:(d>0.46?1:2);}   // 0 迎光 / 1 中 / 2 背光，永遠沒有第四個值
```
```css
.pf .s0{fill:var(--lit)}  /* #E8EEEF */
.pf .s1{fill:var(--ice)}  /* #C9D1D3 */
.pf .s2{fill:var(--dim)}  /* #8FA0A5 */
```

**禁止**：`linear-gradient` 產生的任何中間色、`box-shadow` 的模糊、`opacity` 漸變、`filter:blur`、任何紙紋／顆粒／noise 貼圖。需要「投影」時用**實心位移色塊**（`box-shadow:6px 6px 0 var(--ink)`，`0` 模糊半徑）。硬停止的 `linear-gradient`（兩個色標相差 ≤0.5%）可用，因為它不產生中間色。

### 特徵 3 — 鋸齒稜帶（zigzag cornice）：所有的邊界都是三角折線

簷口、腰帶、分隔線、表格橫線、下拉選單的箭頭、頁尾上緣——**一律是連續等腰三角，不是直線**。這是 Janák 的稜柱理論最直接的產物，也是三秒辨識的最大功臣。用一枚 32×16 的 SVG data URI 磚，45° 角，`repeat-x`：

```css
.zig{height:16px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16' viewBox='0 0 32 16'%3E%3Cpath d='M0 16L16 0L32 16Z' fill='%231B2429'/%3E%3C/svg%3E") repeat-x 0 0/32px 16px}

/* 表格橫線／清單分隔線：把同一枚磚縮成 24×8 貼在下緣 */
tbody tr{background:url("…same…") repeat-x 0 100%/24px 8px}
tbody tr:last-child{background-image:none}
```

### 特徵 4 — ±45°／±60° 的結構斜軸，水平垂直只留給文字

版面的分割線、構圖軸、按鈕的切角、印記、箭頭，角度只允許 0°、90°、±45°、±60°。**沒有任何一個角度是隨手歪的。**段落文字一律水平（傾斜的是承載它的面，不是字）——這是本流派上網後必須加的一條紀律，原作是印刷品與建築，不需要處理長文可讀性。

### 特徵 5 — 削角（chamfer）：沒有一個圓角，也沒有一個完整的直角

所有矩形的角都要被切掉。全站 `border-radius` 出現次數必須是 **0**。

```css
/* 兩角削（不對稱，優先用這個） */
.oct{clip-path:polygon(16px 0,100% 0,100% calc(100% - 16px),
     calc(100% - 16px) 100%,0 100%,0 16px)}
/* 四角削 */
.oct4{clip-path:polygon(13px 0,calc(100% - 13px) 0,100% 13px,100% calc(100% - 13px),
      calc(100% - 13px) 100%,13px 100%,0 calc(100% - 13px),0 13px)}
/* 按鈕 */
.btn{clip-path:polygon(11px 0,100% 0,100% calc(100% - 11px),calc(100% - 11px) 100%,0 100%,0 11px)}
/* 六角形樞紐（方向盤中心、徽記） */
.hub{clip-path:polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)}
```

---

## 三、色彩系統

本流派的原始材料是**未上色的水泥、白灰泥、黑鐵件與土色**（Grand Café Orient 一九一二年的深綠鐵件是唯一的彩色）。因此配色的主體不是「色」，是「同一色相的三階」。

| 用途 | Hex | 比例 | 說明 |
|---|---|---|---|
| 迎光階 `--lit` | `#E8EEEF` | 約 22% | 面向光的稜面；也給「工具」類的次要面板底 |
| 中階（地色）`--ice` | `#C9D1D3` | 約 34% | 全站底色。它是三階的**中間**那一階，所以它上下都有 |
| 背光階 `--dim` | `#8FA0A5` | 約 20% | 背光稜面。墨字在其上對比 5.8:1，長文可直接落上去 |
| 墨 `--ink` | `#1B2429` | 約 12% | 所有稜線、外框、正文、鑄鐵件。線寬 1.6–2.5px |
| 朱紅 `--kerf` | `#B4472A` | ≤ 7% | **唯一的暖色**，只給四種語意：刀口／現用態／被認領的東西／被拒絕的事 |
| 鑄鐵綠 `--iron` | `#2F5F55` | ≤ 4% | 連結與次要標記（Grand Café Orient 的綠鐵件）；也給液體 |
| 紙 `--paper` | `#F6F9F9` | ≤ 8% | **只給「這是一張紙」的語意**：價目表、單據、表單欄位 |
| 深階 `--deep` | `#5E7178` | 約 3% | 冰以外的世界：頁尾。它不是第四階稜面色，不得用在稜面上 |

**硬規則**

1. 稜面只准用 `--lit` / `--ice` / `--dim` 三階，永遠不得出現第四個明度。
2. 需要第二個色域時（例如「被認領的冰塊」），做法是給那個色**它自己的三階**，而不是加一個新顏色：朱紅三階 `#EFDED6` / `#D6AE9D` / `#B4785F`。
3. 兩塊面之間永遠有一條 1.6px 以上的墨線，永不直接相接、永不用陰影分隔。
4. 全站零質感：不鋪紙紋、不鋪顆粒、不鋪 noise、不用 `backdrop-filter`。**冰不是紙。**

換到別的產業時，把冷灰藍換成該產業的材料色（水泥灰 `#CFCBC2`、赭土 `#C9A98C`、鑄鐵藍灰 `#9AA6AE` 都成立），但「單一色相的三階」這條結構不能換。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 拉丁展示字 | **Archivo Black** | 400 | 幾何、略窄、方角，最接近捷克立體主義的手繪大寫字。`text-transform:uppercase`，`letter-spacing:.06em` |
| 拉丁標籤／數字 | **Archivo** | 400/600/700 | `font-variant-numeric:tabular-nums` 必開——所有數字要對齊成一欄 |
| 中文 | **Noto Sans TC** | 400/500/700/900 | 標題 900、標籤 700、正文 400 |

字級階梯（clamp，桌機／手機）：

```css
h1.big { font-size:clamp(40px,7vw,86px); font-weight:900; line-height:.94; letter-spacing:.01em }
h2      { font-size:clamp(22px,3vw,34px); font-weight:900; line-height:1.06 }
.lbl    { font-size:11px; font-weight:700; letter-spacing:.22em; text-transform:uppercase }
body    { font-size:16px; line-height:1.75 }   /* ≤560px 時 15.5px */
.num    { font:400 30px/1 "Archivo Black"; font-variant-numeric:tabular-nums }
```

**不要用等寬字。** mono 會把畫面拉進「工程製圖／終端機」的語彙，那是另一個流派。數字的秩序靠 tabular-nums 與右對齊達成。

---

## 五、版面與網格

- 12 欄網格，`gap:14px`，最大寬 1180px，左右 padding 26px。欄寬因此是 81.2px。
- **不對稱跨欄**：7+5、8+4、4+5+3。永遠不要 6+6、也永遠不要三張等寬卡片。
- **首屏是一整面，不是一堆卡片。** 首屏用**一個**滿版的稜柱場，內容格直接落在上面、沒有自己的邊框與底色。把首屏切成六個各有邊框的方塊，會立刻變成 bento grid（那是 AI 味最重的版型之一）。
- 需要「這是一張紙」的地方才用 `.plate`（`--paper` 底 + 2px 墨框）。全站 plate 覆蓋面積建議 < 25%，否則稜面被蓋住，風格就消失了。
- 留白：稜面本身即是留白。段落最大寬度 34–42 個字，不要撐滿欄寬。
- 卡陣用 `subgrid` 讓每張卡的內部列跨卡對齊，鋸齒腰帶因此在整排上是同一條線（見第十二章）。

---

## 六、元件配方

### 導覽（示範站用的是「鋸口」語意，可換語意但不可換手法）
現用態**不准用高亮色塊表示**。要用一個「這個面被動過」的幾何事實表示——示範站的作法是一條冰磚上緣的四道鋸口，現用頁那一道被鋸得深 5 倍，並露出兩個新的稜面與一條朱紅刀痕。

```html
<nav class="kerf"><svg viewBox="0 0 212 54"> …磚的輪廓＋四道 V 形鋸口… </svg>
  <ul><li><a href="…" aria-current="page">斷面</a></li>…</ul></nav>
```
≤900px 時鋸口收起，改為四格等寬橫列，現用格朱紅底、左緣 `box-shadow:inset 6px 0 0 var(--ink)` 一道刀痕。

### 按鈕
```css
.btn{border:2px solid var(--ink);background:var(--lit);color:var(--ink);
  font:700 13px/1 "Noto Sans TC";letter-spacing:.1em;padding:13px 20px;
  clip-path:polygon(11px 0,100% 0,100% calc(100% - 11px),calc(100% - 11px) 100%,0 100%,0 11px);
  transition:background .09s steps(1,end),color .09s steps(1,end)}
.btn:hover,.btn[aria-pressed=true]{background:var(--kerf);color:var(--lit)}
```
`steps(1,end)` 不是裝飾——本流派禁止漸層，所以**連補間都不准有中間色**。

### 卡片（用 subgrid 讓腰帶跨卡連續）
```css
.rack{display:grid;grid-template-columns:repeat(auto-fill,minmax(226px,1fr));gap:0 14px}
.card{grid-row:span 5;display:grid;grid-template-rows:subgrid;
      border:2px solid var(--ink);background:var(--lit);margin-bottom:14px}
.card .r4{background:url("…zig…") repeat-x 0 0/32px 16px;padding-top:22px}
@supports not (grid-template-rows:subgrid){
  .card{grid-row:auto;display:block}
  .card .r1{min-height:74px}.card .r2,.card .r3{min-height:42px}.card .r4{min-height:64px}}
```

### 表單
欄位是紙（`--paper` 底、2px 墨框、削角），標籤是 11px/`.18em` 的大寫標籤，下拉選單的箭頭用**鋸齒磚**而不是三角形 caret。
```css
.fld input,.fld select,.fld textarea{background:var(--paper);border:2px solid var(--ink);
  padding:10px 12px;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),
  calc(100% - 10px) 100%,0 100%,0 10px)}
.fld select{appearance:none;background-image:url("…zig…");background-repeat:no-repeat;
  background-position:right 12px center;background-size:16px 8px;padding-right:38px}
```

### 頁尾
`--deep` 底、`--lit` 字，上緣壓一條 `.zig` 鋸齒稜帶。頁尾**不做稜面**——它是冰以外的世界。

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可。**所有時間函數一律 `steps()`：本流派禁止漸層，所以也禁止連續補間。**

| 種類 | 名稱 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 融水滴階 | 時間（4.6s 週期） | `animation:fall 4.6s steps(6,end) infinite`；水位每滴升一階，12 階滿了歸零 | 水滴不落，水位靜態顯示為「已融 7／12 階」 |
| input 輸入 | 面燈 facet lift | `pointerover` 稜面 | 該面升一階，**同一朝向（同 `data-s`）的面一起升**，`transition:fill .09s steps(1,end)`，延遲 <100ms | 保留（僅換色，不是動畫），或改為朱紅稜線描邊 |
| transition 轉場 | 鋸口推移 kerf wipe | 狀態切換／新內容出現 | `clip-path` 由 60° 斜口從右上推到左下，`.32s steps(5,end)` | 不推移，直接是最終畫面 |
| **signature 簽名** | **受力重裂 load-refracture** | 受力方向盤（8 檔，滑鼠或方向鍵） | 逐格四次、每格 84ms，每一格都把 `theta` 代進引擎重解一次下包絡 | 不逐格，直接跳到新解 |

```js
function setTheta(i){                 // 簽名動效的全部程式碼
  const from=cur, to=i*Math.PI/4; let d=to-from;
  while(d> Math.PI)d-=Math.PI*2; while(d<-Math.PI)d+=Math.PI*2;
  if(reduced()){solve(to);cur=to;return;}
  let k=1;(function tick(){ solve(from+d*k/4); if(k++<4)setTimeout(tick,84); })();
  cur=to;}
```

**明文禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、模糊陰影的按壓動畫、`stroke-dashoffset` 描繪、任何 `ease-in-out` 的連續補間。冰不是慢慢變形的，它是一格一格裂開的。

---

## 八、插畫與圖像風格

**plane-envelope 平面下包絡稜柱構成**。全站不得有任何一張外部圖片，也不得有任何一張「描外形」的插圖。所有圖像只由三種原語構成：

1. **稜柱面** — 下包絡解出的多邊形 + 三階明度之一 + 1.6px 墨稜線。
2. **鋸齒稜帶** — 等腰三角折線，用於邊界、腰帶、分隔、箭頭。
3. **削角矩形** — 八邊形（或兩角削），用於一切卡片、按鈕、印記、徽記。

判準：**拿掉全部顏色，仍讀得出每一面朝哪裡**（因為稜線的交會方式決定了脊與谷）。示範站的 logo、favicon、切割圖上的每一塊冰、回執印記、導覽的鋸口，全部出自同一支引擎。

「資料視覺化」在這個流派裡的作法是：**把資料變成幾何分割，然後讓它自己裂。**（示範站的切割圖就是一棵二元切割樹的直接渲染——每一塊冰都是一個稜柱。）

---

## 九、Logo 與 Favicon

Logo ＝ 一個正方形被同一支引擎解成 6–9 個稜面，加**一道 ±60° 的朱紅斜線**（在示範站是鋸痕，在別的產業可以是折線、裂縫、刻痕——重點是它是唯一的暖色，而且它斜著穿過整個標記）。

```html
<svg viewBox="0 0 120 120" role="img" aria-label="…">
  …由 prism(0,0,120,120,0.95,{chamfer:1.1}) 產生的 path，fill 用三階、stroke 2.2px 墨…
  <path d="M14.4 103.2L105.6 28.8" stroke="#B4472A" stroke-width="9" fill="none"/>
</svg>
```

Favicon 用同一支引擎縮到 32×32（面數會自然變少），寫成 inline SVG data URI 放進 `<head>`：`<link rel="icon" href="data:image/svg+xml,%3Csvg…">`。**不要用 `<style>` 區塊寫 favicon 的顏色**——把 `fill`／`stroke` 直接寫在每個 `path` 上，因為部分環境不套用 SVG 內的 CSS。

---

## 十、Do & Don't

**Do**
- 先解幾何，再放內容。內容落在哪一面上是結果，不是排版決定。
- 讓正文直接落在稜面上（三階對墨字都 ≥5.8:1），紙板只留給「這真的是一張紙」的東西。
- 每一個「現用／選中／完成」狀態都用幾何事實表達（切得比較深、被削掉一角、多一個面），而不是換一個亮色。
- 數字用 tabular-nums 並右對齊；標籤用 11px/`.22em` 的大寫小標。
- 文案用具體的量：尺寸、公斤、刀數、元、時刻。這個流派的說服力來自「可驗算」。

**Don't**
- ❌ 任何 `border-radius`。一個都不行。
- ❌ 任何模糊陰影、任何可見漸層、任何紙紋／噪點／材質貼圖。
- ❌ 等寬字、掃描線、圖號角標、量表刻度盤（那是工程製圖流派，不是立體主義）。
- ❌ 置中大標＋副標＋兩顆按鈕＋三張卡片。
- ❌ 把首屏切成六個各有邊框的方塊（bento grid）。
- ❌ 紫藍漸層、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、「把 X 變成 Y」句式標題。
- ❌ 半圓、圓弧、圓形裝飾（那是一九二〇年代的 Rondokubismus，是另一個流派）。
- ❌ 把稜面當裝飾貼在角落。它必須是**底**，而且必須滿版。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg…稜柱…%3E">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600;700&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{--lit:#E8EEEF;--ice:#C9D1D3;--dim:#8FA0A5;--deep:#5E7178;
      --ink:#1B2429;--kerf:#B4472A;--iron:#2F5F55;--paper:#F6F9F9}
body{background:var(--ice);color:var(--ink);font:400 16px/1.75 "Noto Sans TC",sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:0 26px}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:14px}
.pan{position:relative;isolation:isolate}
.pf{position:absolute;inset:0;width:100%;height:100%;z-index:-1}
.pf .f{stroke:var(--ink);stroke-width:1.6;stroke-linejoin:miter;vector-effect:non-scaling-stroke;
       transition:fill .09s steps(1,end)}
.pf .s0{fill:var(--lit)}.pf .s1{fill:var(--ice)}.pf .s2{fill:var(--dim)}
.pf .lift.s1{fill:var(--lit)}.pf .lift.s2{fill:var(--ice)}
.zig{height:16px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16' viewBox='0 0 32 16'%3E%3Cpath d='M0 16L16 0L32 16Z' fill='%231B2429'/%3E%3C/svg%3E") repeat-x 0 0/32px 16px}
</style></head>
<body>
<a class="skip" href="#main">跳到主要內容</a>
<header class="mast"><div class="wrap"> …鋸口導覽＋標記… </div></header>

<main id="main">
  <!-- 首屏：一整面稜柱場，內容直接落在面上 -->
  <section class="face">
    <div class="pan" data-field="3">
      <svg class="pf" viewBox="0 0 1280 780" preserveAspectRatio="xMidYMid slice" aria-hidden="true">…</svg>
      <div class="wrap"><div class="grid">
        <div style="grid-column:span 7"><h1 class="big">品牌名</h1>…</div>
        <div style="grid-column:span 5">…讀數…</div>
        <div style="grid-column:span 8">…行動呼籲…</div>
        <div style="grid-column:span 4">…物件（有框）…</div>
      </div></div>
    </div>
  </section>

  <div class="zig"></div>
  <section class="sec"><div class="wrap">…內容…</div></section>
</main>

<div class="zig"></div>
<footer>…</footer>
<script>/* 引擎 + 受力方向盤 + 面燈 */</script>
</body></html>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，選它們的理由都是「這個流派的視覺特徵需要它」，不是「它很酷」。

### 1. CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 3 的鋸齒腰帶。冰品頁九張規格卡各有五列（品名／尺寸／公斤／單價／用途），內容長度都不一樣。用 `grid-template-rows:subgrid` 讓每張卡吃整排卡陣共用的同一組列軌，於是「單價」那一列的鋸齒腰帶在整排卡片上是**同一條線**——沒有 subgrid 時它會隨每張卡自己的內容高度上下錯開，腰帶就不成立。

- **查證（2026-08-24）**：MDN《Subgrid》與 caniuse `css-subgrid`。**Baseline Widely available，2026-03-15 達成**。Firefox 71+（2019）、Safari 16+（2022）、Chrome 117+／Edge 117+（2023-09）、Opera 103+、Samsung Internet 24+。
- **Fallback**：`@supports not (grid-template-rows:subgrid)` 時卡片改 `grid-row:auto;display:block` 並給前四列固定 `min-height`。腰帶改為每張卡各自閉合，**九種規格的全部文字與數字完全不變**，資訊零損失。

### 2. `steps()` 逐格補間（B 動效與時間軸層）

**承載**：特徵 2。本流派禁止漸層，因此**補間也不准連續**——畫面上任何時刻都不能出現第四個明度。全站所有 `transition-timing-function` 與 `animation-timing-function` 都是 `steps()`：hover 換階 `steps(1,end)`（＝瞬間跳階）、轉場 `steps(5,end)`、滴水 `steps(6,end)`、簽名動效以四次 `setTimeout` 手動分格。

- **查證（2026-08-24）**：MDN《steps()》。**Baseline Widely available，2015-07 起跨瀏覽器。**
- **Fallback**：無支援缺口。`prefers-reduced-motion:reduce` 時全站 `animation-duration`／`transition-duration` 壓到 0.001ms，等於直接到終態，狀態語意零損失。

### 3. 平面下包絡幾何引擎（E 資料與生成層）

**承載**：特徵 1、4 與簽名動效。純 JavaScript，無任何瀏覽器 API 依賴，因此沒有相容性問題；沒有 JavaScript 時，所有稜柱在**建置階段就以同一支引擎解好並內嵌成靜態 SVG**，畫面是完整的（只是受力方向固定在 180°）。

- **效能實測（Node 22 單執行緒）**：單一容器 `prism()` 0.0127ms／次（3000 次 38ms）；滿版 `field()`（解一次再對最大三面各裂一次，1280×780 得 12 面）0.035ms／次（500 次 17.6ms）。簽名動效一次重解全頁約 20 個容器＝約 0.3ms，遠低於一幀 16.7ms。
- **無 layout thrashing**：`solve()` 先一次讀完所有容器的 `getBoundingClientRect()`，再一次寫完所有 `innerHTML`，讀寫不交錯。
- **頁面預算**：四頁 inline 全部資源後為 33.6／37.0／43.6／36.1 KB，皆遠低於 350KB 上限；零外部圖片、零外部指令碼，外部資源僅 Google Fonts。

### 其他用到但非核心的 API

`clip-path:polygon()`（削角、鋸口推移）Baseline Widely available；`localStorage`（受力方向與出冰紀錄跨頁生效）Baseline；`Pointer Events`（切冰台的選塊與鋸位）Baseline Widely available——切冰台另備完整鍵盤操作（`←→` 換塊、`↑↓` 移鋸位、`V`／`H` 換方向、`Enter` 下刀），無指標裝置時功能完整。

---

*規格書版本 1.0．示範站：晶合製冰廠（2026-08-24）．建置模型：Claude Opus 5 · 排程 Agent*
