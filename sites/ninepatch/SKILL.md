---
name: amish-quilt-plain
description: Lancaster-County Amish quilt design language — few enormous geometric shapes in matte jewel wool on a dark plain ground, 1px pieced seams with no outlines, and a single dense hand-quilting line that crosses every seam.
---

# 阿米什拼布 Amish Quilt（Lancaster County, 1880–1940）

## 設計哲學

一八八〇年前後，蘭開斯特郡的阿米什人開始做被子。教規禁止印花布、禁止寫實圖案、禁止裝飾性的花邊，
所以他們手上只剩下三樣東西：**素色的羊毛、直邊的裁片、和一根針**。他們用這三樣東西做出了
二十世紀最像現代抽象繪畫的一批物件——而且比 Rothko 早了六十年，做的人從沒進過美術館。

這個風格的本體是一句工藝上的事實：**拼是各家的事，壓線是整床被的事。**
拼布層（piecing）決定色塊怎麼切、接縫落在哪裡；壓線層（quilting）是一條連續的手縫線，
它畫的是羽毛圈、繩紋、菱格，而它**完全不理會底下的接縫**——一朵羽毛可以壓過三塊布。
兩層各有各的幾何，疊在一起才是一床被。網頁照做：版面是拼布層，裝飾是壓線層，
壓線錨定在頁面而不是元件上，元件重排時它不動。

第二句事實是關於「少」。阿米什被子的裁片極少而極大——一床 Center Diamond 只有二十幾片，
中央那顆菱形的邊長超過整幅的三分之一。它不是簡約風的少，是**不能多**：教規不准。
所以這個風格禁得起放大，也只有放大才成立。把它做成一堆小卡片就死了。

第三句是關於「暗」。它的底色是瓶綠、深茄紫、藏青這一類中低明度的飽和色，
而且必須是**羊毛的啞光**——沒有光澤、沒有漸層、沒有模糊投影、沒有紙紋顆粒。
畫面上唯一的層次來自 1px 的接縫暗線與縫份被壓向哪一側造成的一線明暗。

---

## 本風格的 5 個不可省略特徵

> 判準：拿掉任何一項，它就不是阿米什拼布了。

### 1. 深色純素色地 × 寶石色塊，零印花零圖案

底色不是黑也不是灰，是**染出來的深色**：瓶綠、茄紫、藏青。上面放的是同一個彩度層級的寶石色。
不准出現任何印花、任何寫實圖案、任何漸層、任何光澤。同一塊色布之間允許（並且應該有）
**染缸色差**——同一批色在不同缸次下差半階明度。

```css
:root{
  --bottle:#17402F; /* 瓶綠：大面積地，約 30% */
  --plum:#3B2340;   /* 茄紫：約 16% */
  --navy:#1C2A4A;   /* 藏青：約 14% */
  --red:#A8202C;    /* 正紅：約 10%，只給中心窄框、focus 與被拒絕的事 */
  --gold:#B8912B;   /* 芥黃：≤6%，只給四角方塊、現用態與落款 */
  --blue:#7E9BB5;   /* 粉藍：約 8% */
  --muslin:#D9D2C2; /* 素坯：約 12%，唯一放長文的地方 */
  --ink:#14120F;    /* 墨：≤5% */
}
/* 染缸色差：同一塊色在不同片上各自偏移，不必手寫六十個 hex */
.pt{background:var(--base)}
@supports (color: rgb(from white r g b)){
  .pt{background:oklch(from var(--base) calc(l + var(--dye,0)) c calc(h + var(--dyeh,0)))}
}
.pt:nth-child(4n+1){--dye:.014;--dyeh:1.4}
.pt:nth-child(4n+2){--dye:-.011;--dyeh:-1.1}
.pt:nth-child(4n+3){--dye:.007;--dyeh:-2.0}
.pt:nth-child(5n){--dye:-.006;--dyeh:2.2}
```

### 2. 極少而極大的幾何單元 ＋ 三層同心邊框與四角方塊

版面的骨架永遠是同心的：**寬外框 → 四角方塊 → 內窄框 → 中心大單元**。
中心單元（菱形／條被／日與影／九拼）的邊長不得小於整幅的三分之一。
四個角落一定是另一個顏色的正方形——它是接框角的工法遺跡，不是裝飾。

```css
.quilt{display:grid;--bw:clamp(96px,13vw,168px);
  grid-template-columns:var(--bw) repeat(10,minmax(0,1fr)) var(--bw);
  grid-template-rows:var(--bw) repeat(6,minmax(0,1fr)) var(--bw)}
.c1{grid-column:1;grid-row:1}   .c2{grid-column:12;grid-row:1}
.c3{grid-column:1;grid-row:8}   .c4{grid-column:12;grid-row:8}
/* 邊框帶與中心塊共用同一組軌道線：接縫必須對得起來 */
.bt{grid-column:2/12;grid-row:1;display:grid;grid-template-columns:subgrid}
.ctr{grid-column:2/12;grid-row:2/8;display:grid;grid-template-columns:subgrid}
.bt>.pt{grid-column:span 2}
```

```html
<!-- 中心菱形：只有直邊，全部平塗 -->
<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
  <rect width="400" height="400" fill="#1C2A4A"/>
  <rect x="14" y="14" width="372" height="372" fill="none" stroke="#A8202C" stroke-width="16"/>
  <polygon points="30,30 200,30 30,200" fill="#17402F"/>
  <polygon points="370,30 200,30 370,200" fill="#17402F"/>
  <polygon points="30,370 200,370 30,200" fill="#17402F"/>
  <polygon points="370,370 200,370 370,200" fill="#17402F"/>
  <polygon points="200,48 352,200 200,352 48,200" fill="#3B2340"/>
</svg>
```

### 3. 手縫壓線是全站唯一的曲線，而且它橫越所有接縫

拼布層沒有一條曲線——曲線全部由壓線承擔。壓線必須是**一針一針的短線段**，不是虛線、
不是描邊動畫：每針約 4px、針距 2.6–5px，沿路徑等距取樣，轉彎處針目自動縮短（真正手縫就是這樣）。
而且它**不認接縫**：一朵羽毛壓過三塊不同顏色的布是常態，不是失誤。

```js
// 沿任意 SVG 路徑生成手縫針目
function stitchAlong(pathEl, len, gap){
  const total = pathEl.getTotalLength(), out = [];
  for(let s = 0; s + len <= total; s += len + gap){
    const a = pathEl.getPointAtLength(s), b = pathEl.getPointAtLength(s + len);
    // 弦長明顯短於針長 = 這裡在轉彎，把針縮短
    const chord = Math.hypot(b.x - a.x, b.y - a.y);
    const e = chord < len * 0.965 ? pathEl.getPointAtLength(s + len * 0.72) : b;
    out.push(`M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${e.x.toFixed(1)} ${e.y.toFixed(1)}`);
  }
  return out.join('');       // 全部針目合成一個 <path>，不要每針一個 <line>
}
```

```css
.st{fill:none;stroke:#EFE8D6;stroke-width:1.5;stroke-linecap:butt;opacity:.72}
/* stroke-linecap 一定是 butt。針目是扎出來的，不是圓頭筆畫。 */
.chalk{fill:none;stroke:#8FA6B4;stroke-width:.9;opacity:.24;stroke-dasharray:1.5 3.5}
/* 還沒縫的地方畫粉筆記號——這是「未完成」的正確表現法，不是佔位符 */
```

密網底（菱格填空）用一塊 pattern 鋪滿整頁，它同樣錨定在頁面而不是元件：

```html
<pattern id="xh" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
  <g stroke="#EFE8D6" stroke-width="1.4" opacity=".30" stroke-linecap="butt">
    <path d="M17 0v4.6M17 7.2v4.6M17 14.4v4.6M17 21.6v4.6M17 28.8v4.6"/>
    <path d="M0 17h4.6M7.2 17h4.6M14.4 17h4.6M21.6 17h4.6M28.8 17h4.6"/>
  </g>
</pattern>
```

### 4. 1px 接縫暗線與縫份的單側明暗——沒有描邊、沒有間隙、沒有圓角

兩塊布相接，畫面上只會出現**一條線**：布邊那一線的暗。縫份被壓向其中一側，
所以另一側會多出極輕的一線亮。除此之外沒有任何邊界處理——不准描邊、不准留白縫、
不准圓角、不准模糊陰影。

```css
*{border-radius:0}
.pt{box-shadow:
  inset -1px 0 0 rgba(10,8,6,.46),   /* 接縫暗線 */
  inset 0 -1px 0 rgba(10,8,6,.46),
  inset 1px 0 0 rgba(255,255,255,.055)} /* 縫份被壓向這一側 */
```

### 5. 樸素到底的字，而且長文一律在素坯布上；落款只有姓名縮寫與年份

阿米什被子上沒有字。唯一的例外是被角一枚十字繡的姓名縮寫與年份。
所以這個風格的排版紀律是：**字不畫在色布上，字縫在素坯布標上**。
字體只用一種無襯線（拉丁）＋一種黑體（漢字），字級階不超過五階，不用斜體、不用花體、
不用字重戲法、不用大寫字距當裝飾以外的東西。落款用十字繡畫出來，不是字型。

```css
body{font-family:"Archivo","Noto Sans TC",system-ui,sans-serif;font-weight:400;line-height:1.72}
.cloth{background:#D9D2C2;color:#241E15}        /* 所有長文都在這上面，對比 ≥ 11:1 */
.lbl{font-size:11px;letter-spacing:.30em;text-transform:uppercase;font-weight:600;opacity:.72}
h2{font-size:clamp(21px,2.6vw,30px);font-weight:600;line-height:1.24}
```

```js
// 十字繡落款：一格一個 X，5×7 點陣
const GLYPH={N:"10001,11001,10101,10011,10001,10001,10001", P:"11110,10001,10001,11110,10000,10000,10000",
             A:"01110,10001,10001,11111,10001,10001,10001"};
function crossText(str,x,y,c){let d="",cx=x;
  for(const ch of str){const g=GLYPH[ch]; if(!g){cx+=6*c;continue;}
    g.split(",").forEach((row,r)=>[...row].forEach((bit,k)=>{ if(bit==="1"){
      const px=cx+k*c, py=y+r*c;
      d+=`M${px} ${py}l${c} ${c}M${px+c} ${py}l${-c} ${c}`;}}));
    cx+=6*c;}
  return `<path d="${d}" fill="none" stroke="#B8912B" stroke-width="1.3"/>`;}
```

---

## 色彩系統

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 瓶綠 bottle | `#17402F` | 大面積地色、寬外框、被面的底 | ~30% |
| 茄紫 plum | `#3B2340` | 中心大單元、按鈕、導覽 | ~16% |
| 藏青 navy | `#1C2A4A` | 中心塊的地、次要區塊 | ~14% |
| 素坯 muslin | `#D9D2C2` | **唯一放長文的表面**、布標、卡片 | ~12% |
| 正紅 red | `#A8202C` | 內窄框、focus、被拒絕的事 | ~10% |
| 粉藍 blue | `#7E9BB5` | 第二寶石色、外來的錢 | ~8% |
| 芥黃 gold | `#B8912B` | 四角方塊、現用態、落款 | ≤6% |
| 墨 ink | `#14120F` | footer、法律級小字 | ≤5% |
| 深茄 plum-d | `#2A1830` | 牌面、未選中的選項 | 補色 |

**硬規則**

1. 深色地與深色地之間只隔 1px 接縫線，不加白線、不加描邊、不加間隙。
2. 芥黃只給「現在正在做的那一件事」與被角落款，永遠不當品牌色或連結色。
3. 正紅在中心窄框之外只准做兩件事：focus ring、被拒絕的事。
4. 任何漸層、任何 `filter: blur()`、任何 `box-shadow` 的模糊半徑 > 0，都不屬於這個風格。
5. 素坯不是「白色背景」，它是**另一塊布**：它有自己的接縫，也接在拼布裡。

---

## 字體系統

- 拉丁：**Archivo** 400 / 500 / 600 / 700（Google Fonts）。選它是因為它平、寬、沒有個性癖好，
  而且數字是等寬的。
- 漢字：**Noto Sans TC** 400 / 500 / 700。
- 字級階（只有五階）：11px 標籤 ／ 13px 註 ／ 16px 正文 ／ `clamp(21px,2.6vw,30px)` 節標 ／ `clamp(22px,2.8vw,32px)` 頁標。
- 行高：正文 1.72、標題 1.24。標籤 `letter-spacing:.30em` 全大寫；正文不加字距。
- 數字一律 `font-variant-numeric: tabular-nums`——攤額要對得起來。
- **不用**：斜體、細體（<400）、超粗（>700）、可變字型的花招、任何襯線體。

---

## 版面與網格

- 外層 12 欄（兩側各一欄是邊框寬 `--bw`，中間十欄），八列（上下各一列是邊框）。
- 邊框帶與中心塊用 `grid-template-columns: subgrid` 共用同一組軌道線——
  這不是排版偏好，這是拼布的第一條工藝標準：**接縫必須對得起來**。
- 內容區用 12 欄的 `.strip`，區塊寬度只有 6 欄與 12 欄兩種。半欄、三分之一欄都不做。
- 沒有 gap。拼布沒有 gap，兩塊布是縫在一起的。
- 沒有卡片投影、沒有 hover 浮起、沒有 `transform: translateY(-2px)`。
- 旋轉角度：整個風格只有 **45°**（菱形與菱格壓線）。除此之外全部是 0° 與 90°。
- 留白規則：留白只出現在素坯布上（`padding: clamp(20px,3.4vw,44px)`）。色布上不留白，色布是實心的。

---

## 元件配方

### 導覽（繃圈張力）

現用態不是被標示、不是被高亮——**它是被繃緊的那一塊**：只有它上面有針目，
其餘三塊只有粉筆記號，並且整塊降到 30% 不透明。

```css
.nav{display:grid;grid-template-columns:repeat(4,1fr)}
.nav a{padding:13px 12px 15px;background:var(--base);color:var(--muslin);text-decoration:none;
  box-shadow:inset -1px 0 0 var(--seam),inset 0 -1px 0 var(--seam)}
.nav a.slack{opacity:.30}                 /* 沒繃緊的布是鬆的 */
.nav a[aria-current] .sub{opacity:.82;height:auto}  /* 繃緊的那一塊多說一句 */
```

```html
<!-- 現用頁那一塊：一只繃圈＋真的針目 -->
<svg viewBox="0 0 100 62" preserveAspectRatio="none">
  <ellipse cx="50" cy="34" rx="41" ry="24" fill="none" stroke="#6B5334" stroke-width="3.2"/>
  <ellipse cx="50" cy="34" rx="36" ry="20" fill="none" stroke="#8A6C43" stroke-width="1.4"/>
  <g class="st"><path d="…針目…"/></g>
</svg>
<!-- 其餘：只有粉線 -->
<svg viewBox="0 0 100 62" preserveAspectRatio="none">
  <path class="chalk" d="M 12 44 C 32 26, 68 26, 88 44"/>
</svg>
```

### 按鈕

按鈕是一塊布，不是膠囊。

```css
button,.btn{padding:10px 18px;border:none;color:#F1EADA;background:var(--plum);
  box-shadow:inset -1px 0 0 var(--seam),inset 0 -1px 0 var(--seam),inset 1px 0 0 var(--press)}
button:hover{background:var(--red)}
button.sel{background:var(--gold);color:#211A08}
button[disabled]{opacity:.42;background:#4B4238}
```

### 卡片 / 選項牌

```css
.pk{display:block;width:100%;text-align:left;background:var(--plum-d);color:#E7DFCC;
  padding:12px 14px;border:none;
  box-shadow:inset -1px 0 0 var(--seam),inset 0 -1px 0 var(--seam),inset 1px 0 0 var(--press)}
.pk[aria-pressed="true"]{background:var(--gold);color:#211A08}
```

### 表單

```css
input,select{padding:9px 11px;border:1.5px solid #6E6455;background:#EFE9DA;color:#241E15;width:100%}
input:focus,button:focus-visible,a:focus-visible{outline:2.5px solid var(--red);outline-offset:1px}
.err{color:#8E1620;font-size:13px;min-height:1.2em}
```

### Footer

墨色，一列布標：十字繡落款 ＋ 地址 ＋ 時刻 ＋ 頁目錄。沒有社群圖示、沒有電子報訂閱框。

### 木框（可選但推薦）

整個視窗被繃在一副框上：四條 16px 的胡桃木邊，上緣一排疏縫線。

```css
body{padding:16px;background:var(--bottle)} html{background:#33261C}
.rail i{position:fixed;background:#33261C}
.rail .tick{top:0;left:0;right:0;height:16px;
  background:repeating-linear-gradient(90deg,transparent 0 11px,rgba(239,232,214,.42) 11px 13px)}
```

---

## 動效規則

四種性質不同、觸發源不同，缺一不可；四種都要有 `prefers-reduced-motion` 降級且資訊零損失。
**全站禁用：**淡入式滾動揭示、視差、數字滾動、跑馬燈、`stroke-dashoffset` 描繪動畫、
任何 `ease-in-out` 的柔軟緩動。針是扎進去的，沒有中間狀態。

| 種類 | 名稱 | 做法 | 降級 |
|---|---|---|---|
| ambient 環境 | **共縫**（the bee quilts on） | 沿著待縫的粉線，每 1.7 秒多落幾針（移動一個 `clipPath` 的矩形高度），走完整頁約 68 秒後從頭再來——那是別人的手，不是你的 | 直接把 clip 開到滿：全部針目都在，資訊相同 |
| input 輸入 | **繃圈之下**（under the hoop） | 游標落在被面上，以游標為心 86px 的圓形區域內，粉線變成真的針目（`clipPath` 的 `circle` 直接設 `cx/cy`，延遲 <16ms） | 繃圈是控制項不是動畫，照常運作 |
| transition 轉場 | **上框**（pinning on） | 內容以 `clip-path: inset()` 由上緣往下 `steps(3)` 落定，280ms——別針一根一根別 | 不播，直接是最終畫面 |
| signature 簽名 | **不認接縫的壓線**（seam-blind quilting） | 壓線層錨定在頁面座標而非元件；篩選、換頁、生成議定被時底下的拼片動了，壓線留在原地，重新橫越新的接縫 | `transition` 歸零＝瞬間到位，壓線位置與拼片結果完全相同 |

```css
.pin{animation:pinon .28s steps(3) both}
@keyframes pinon{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important}
}
```

**緩動值**：`steps(n)` 為主；必須連續時用 `cubic-bezier(.28,.92,.3,1)`，時長 180–320ms。超過 400ms 的都不對。

---

## 插畫與圖像風格：piecework-and-stitch 拼片與針目構成

零外部圖片、零照片、零寫實描繪。**所有圖像只由三種原語構成**：

1. **拼片**＝直邊多邊形（正方、長方、45° 三角、菱形），實心平塗，只有 1px 接縫線，沒有輪廓描邊。
2. **針目**＝沿路徑等距的短線段，長 3.4–4.6px、間隔 2.6–5.2px，與路徑相切。**它是全站唯一的曲線。**
3. **縫份明暗**＝接縫兩側各 1px 的加深／提亮。

判準：**拿掉全部顏色，仍讀得出哪裡是接縫、哪裡是針目；而且它可以被真的照做縫出來**
——每一塊都是可裁的直邊布片。

六種可程序生成的塊（同一個 seed 恆得同一塊）：

```js
const KINDS = ["diamond","bars","ninepatch","sunshine","oceanwaves","bearpaw"];
// diamond    菱心：地 → 內框 → 中心 45° 菱形 → 四角方塊
// bars       條被：五道等寬直條，兩色交替
// ninepatch  九拼：3×3 棋盤，中央那一格再細分成 3×3
// sunshine   日與影：同心菱形環，環色循環
// oceanwaves 浪紋：4×4 格，每格切成兩枚 45° 三角
// bearpaw    熊掌：四組「兩方塊＋兩三角」的爪
```

明文禁用：`feTurbulence` 手抖濾鏡、半調網點、細線幾何線描、寫實描繪、任何圓角、任何 `stroke-linecap:round`。

---

## Logo 與 Favicon 設計指南

- **Logo**：一枚九拼方塊（3×3，中央那格再細分成 3×3 的芥黃小格），四角壓紅方塊，
  上面壓一圈羽毛壓線——而且壓線**壓過所有接縫**。這就是整個風格的縮影：兩層幾何、互不理會。
- **Favicon**：9×9 的網格，五個芥黃方塊排成 X（九拼的最小可辨識形），底茄紫、內框藏青。
  16px 下不能有針目——針目在那個尺寸只會變成灰霧。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 9'%3E%3Crect width='9' height='9' fill='%233B2340'/%3E%3Crect x='1' y='1' width='7' height='7' fill='%231C2A4A'/%3E%3Cg fill='%23B8912B'%3E%3Crect x='1' y='1' width='2.34' height='2.34'/%3E%3Crect x='3.34' y='3.34' width='2.34' height='2.34'/%3E%3Crect x='5.66' y='1' width='2.34' height='2.34'/%3E%3Crect x='1' y='5.66' width='2.34' height='2.34'/%3E%3Crect x='5.66' y='5.66' width='2.34' height='2.34'/%3E%3C/g%3E%3C/svg%3E">
```

---

## Do & Don't

**Do**

- 讓中心單元大到令人不安：邊長 ≥ 整幅的 1/3。
- 讓壓線壓過接縫。這是整個風格最容易被漏掉、也最不能漏的一件事。
- 讓同一塊色布有半階的染缸差。完全一致的顏色是印刷品，不是染出來的布。
- 把長文放在素坯布上，並且讓那塊素坯布也是拼布的一片（它有接縫）。
- 用「未完成」表達狀態：還沒縫的地方畫粉筆記號，不要用骨架佔位符或旋轉圖示。
- 落款只寫姓名縮寫與年份，縫在角落，小到幾乎看不見。

**Don't**

- ❌ 紫藍漸層、任何漸層、任何模糊陰影、任何圓角、任何玻璃感。
- ❌ 置中大標＋副標＋兩顆按鈕＋三張卡片。這個風格沒有「主視覺」，整頁就是那一床被。
- ❌ emoji 當 icon。這裡連 icon 都幾乎不該有——需要圖示的地方多半是需要一塊布。
- ❌ 印花、寫實插畫、照片、材質貼圖、紙紋顆粒。羊毛是啞光的，不是紙。
- ❌ 把壓線做成 `stroke-dasharray` 虛線或 `dashoffset` 描繪動畫。那是畫線，不是縫。
- ❌ 把塊做成一堆等大的小卡片牆。少而大是教規，不是風格選擇。
- ❌ `EST. 18xx` 徽章。年份寫在落款裡，或寫在正文裡。
- ❌ 用 emoji、驚嘆號、行銷腔。這個社群的語氣是「補不滿就是補不滿」。

---

## 頁面骨架範例

```html
<body>
  <div class="rail" aria-hidden="true"><i class="rt"></i><i class="rb"></i><i class="rl"></i><i class="rr"></i><i class="tick"></i></div>
  <div class="pagewrap">
    <!-- 壓線層由 JS 插在這裡：position:absolute; inset:0; z-index:3 -->

    <nav class="nav">
      <a class="pt b-plum" href="index.html" aria-current="page"><!--繃圈 svg-->
        <span class="n">01 · THE FRAME</span><span class="t">被架</span><span class="sub">今年縫到哪裡了</span></a>
      <a class="pt b-navy slack" href="cases.html"><!--粉線 svg-->
        <span class="n">02 · THE CASES</span><span class="t">本年的案</span></a>
    </nav>

    <section class="quilt" data-hero>          <!-- z-index:1，壓線層蓋在它上面 -->
      <div class="pt b-gold cor c1"><!--十字繡角字--></div>
      <div class="band bt">
        <div class="pt b-bottle"><div class="lab"><span class="k">SOCIETY</span><h1>九拼互助社</h1></div></div>
        <!-- …共五片，每片 span 2 條軌道 -->
      </div>
      <div class="pt b-gold cor c2"></div>
      <div class="band bl"><!-- 三片，各 span 2 列 --></div>
      <div class="ctr pt b-bottle"><div class="sq"><!--中心菱形 svg--></div></div>
      <div class="band br"></div>
      <div class="pt b-gold cor c3"></div>
      <div class="band bb"></div>
      <div class="pt b-gold cor c4"></div>
    </section>

    <div class="strip">                        <!-- 12 欄；只有 s6 與 s12 兩種寬 -->
      <div class="cloth pad s6"><h2>節標</h2><p>長文一律在素坯布上。</p></div>
      <div class="cloth pad s6" style="background:#C8C0AC"><table>…</table></div>
    </div>

    <footer class="cloth foot pad"><!--十字繡落款＋地址＋時刻--></footer>
  </div>
</body>
```

---

## 技術實作與相容性

本站的三項核心技術，各自承載上面某一個不可省略特徵。支援度於 **2026-08-29** 查證。

### 1. `SVGGeometryElement.getPointAtLength()` / `getTotalLength()`（A 渲染層）

**承載特徵 3**：沿任意壓線路徑等距生成每一針的位置與方向，並在轉彎處縮短針目。
不用 `stroke-dasharray` 是因為 dash 的長度不隨曲率變化、轉角處會斷在錯的地方，
而且每一針無法有自己的角度與長度——那看起來會是虛線，不是手縫。

- **支援**：MDN 標示 `SVGGeometryElement` 為 **Baseline Widely available**，自 2020 年 1 月起跨瀏覽器。
  caniuse（`mdn-api_svggeometryelement_getpointatlength`，資料日期 2026-07）全球覆蓋 **96.69%**；
  Chrome 56+、Firefox 61+、Safari 12+、Edge 79+。
- **Fallback**：本站另備一份純 JavaScript 的路徑扁平化器（M/L/C/Z → 折線 → 弧長參數化），
  建置階段用它把首頁中心菱形的羽毛壓線算好、直接寫進 HTML，因此**關掉 JavaScript 仍看得到壓線**。
  執行階段才改用瀏覽器原生 API（更準）。兩者輸出同一種 `<path>`。
- **效能**：整頁的壓線（羽毛圈 ×2、繩紋帶 ×2、螺旋 ×7，共 3,338 針）生成一次 **1.90ms**
  （Node 22 單執行緒，30 次平均）；二十四塊拼布方塊 0.30ms。全部針目合成**單一個 `<path>`**
  而不是每針一個 `<line>`：整層壓線只有 32 個 DOM 節點（若用 `<line>` 是 4,085 個）。

### 2. CSS Grid `subgrid`（C 版面與樣式層）

**承載特徵 2**：邊框帶的內部接縫與中心塊的內部接縫必須落在同一組軌道線上。
媒體查詢與巢狀 grid 都做不到——巢狀 grid 的子軌道與母軌道無關，接縫就會錯開一兩個像素，
而拼布的第一條工藝標準就是接縫要對得起來。

- **支援**：Firefox 71（2019）、Safari 16（2022）、Chrome / Edge 117（2023-09）。
  2023 年 9 月起四大引擎齊備，**2026-03-15 正式列為 Baseline Widely available**。
- **Fallback**：`@supports not (grid-template-columns: subgrid)` 時退回
  `repeat(5, minmax(0,1fr))` 的獨立 grid——版面完全成立，只是邊框帶與中心塊的接縫不再對齊。
  資訊零損失。

### 3. CSS 相對顏色語法 `oklch(from …)`（C 版面與樣式層）

**承載特徵 1 的「染缸色差」**：同一塊色布在不同片上有半階明度與一兩度色相的差。
用相對顏色語法可以由九個基色推出全站每一片的實際顏色，而不必手寫六十個 hex，
也保證色差永遠是「同一缸的偏移」而不是另一個顏色。

- **支援**：Safari 16.4、Chrome / Edge 119、Firefox 128（2024-07）。
  **Baseline 2024（newly available）**，自 2024 年 9 月起跨瀏覽器可用。
- **Fallback**：整段包在 `@supports (color: rgb(from white r g b))` 內；不支援時每一片
  直接吃 `--base` 的純色，畫面是九個乾淨的色域——那也是一床合格的被子，只是同一缸染得比較勻。
  資訊零損失。

### 支援性技術（非核心，但一併記錄）

- **SVG `<pattern>` + `patternTransform`**：菱格填空壓線鋪滿整頁。SVG 1.1，現行瀏覽器全支援。
- **`clipPath` + `<use>`**：ambient 的「共縫」與 input 的「繃圈」共用同一份針目 `<path>`，
  各自套一個 clip。`clipPath` 為 Baseline Widely available。
- **`localStorage`**：議定被跨頁生效。全部讀寫包在 `try/catch` 內，失敗時介面照實說明，
  被號與分享碼仍然有效。

### 效能預算實測

| 項 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS／JS／SVG） | 36–116 KB | ≤350 KB |
| 首屏 JS 生成（壓線＋拼塊） | ~2.2 ms | ≤100 ms |
| 壓線層 DOM 節點 | 32 | — |
| 主要動畫 | 只改 `clipPath` 的 `height` 與 `circle` 的 `cx/cy`，不觸發 layout | 60fps |
