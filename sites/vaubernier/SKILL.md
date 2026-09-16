---
name: intaglio-security-engraving
description: Intaglio line-engraving and rose-engine guilloché — the visual language of banknotes, share certificates and 19th-century wine labels, rebuilt for the web with no fills, no gradients and no shadows.
---

# 凹版雕刻鈔券風 Intaglio Line-Engraving & Guilloché

> 一種只用線的印刷語言。1800 年代的鈔票、股票、債券、船票、酒標與血統書全部長這樣，原因很實際：**線刻得出來，但畫不出來**——凹版的線由刀在鋼版上切出，等寬、等深、連續不斷，仿造者用木刻或石版做不到。所以「難以複製」就是這個風格的全部美學來源。

---

## 一、設計哲學

1. **裝飾是功能。** 這個風格裡沒有一條線是為了好看而存在的：玫瑰紋是防偽、微縮文字是防偽、四角重複的面額是驗裁切、兩層疊印是驗刮改。做這個風格時，每加一個母題都要先回答「它在防什麼」。答不出來就不要加。
2. **墨是滿的，紙是白的，中間沒有東西。** 沒有 50% 灰。明暗只能靠線與線之間留多少白。這一條決定了整套做法。
3. **對稱到近乎機械，但不完全對稱。** 版面左右對稱、四角重複，可是主雕（vignette 裡的圖）永遠是不對稱的——對稱的是制度，不對稱的是內容。
4. **文字是版面的裝飾之一。** 弧排、小型大寫、極大字距、微縮文字：字在這個風格裡同時是資訊與花飾。
5. **這個風格拒絕「現代網頁的柔軟」。** 沒有圓角、沒有陰影、沒有漸層、沒有半透明卡片、沒有無襯線體。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 I — 車床玫瑰紋 guilloché（形狀語彙）

一條等寬、連續、不填色的線，由兩個圓周運動疊加而成（hypotrochoid／epitrochoid）。同一條線繞行 9–15 圈，圈與圈之間極小的相位差在紙面上長出莫列波紋。**拿掉它，這就只是一張古典印刷品，不是有價證券。**

```js
// x = (R-r)·cos t + d·cos(k t + φ) + A·cos(L t)·cos t
// y = (R-r)·sin t − d·sin(k t + φ) + A·sin(L t)·sin t ，k = (R−r)/r
function rosePath(P, turns){
  var k=(P.R-P.r)/P.r, dd=P.d*P.r, step=Math.PI/60, T=turns*2*Math.PI, s='', t, rad, x, y;
  for(t=0; t<=T; t+=step){
    rad = P.A*Math.cos(P.L*t);
    x = (P.R-P.r)*Math.cos(t) + dd*Math.cos(k*t+P.ph) + rad*Math.cos(t);
    y = (P.R-P.r)*Math.sin(t) - dd*Math.sin(k*t+P.ph) + rad*Math.sin(t);
    s += (s?'L':'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return s;
}
// 參考取值：R 96–140／r 21–46／d 0.34–0.86·r／L 3–15／A 1.5–7／圈數 9–15
```

```css
.rose{ fill:none; stroke:currentColor; stroke-width:.5;
       stroke-linejoin:round; vector-effect:non-scaling-stroke }
```

複寫張數（`<use>` 旋轉縮放 5–9 份，每份轉 4°–32°、縮 0.966–0.988）是莫列紋的主要來源；只畫一份會太空。

### 特徵 II — 沒有灰階，只有疏密（色彩規則）

四個明度階完全靠**間距**做出來，線寬幾乎不動（0.34–0.42px）。禁止 `fill` 色塊、禁止任何 `gradient`、禁止 `filter: drop-shadow`、禁止 `opacity` 當調子用。

```html
<defs>
  <pattern id="h0" width="8.6" height="8.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
    <path fill="none" stroke="currentColor" stroke-width=".34" d="M0 0 V8.6"/></pattern>
  <pattern id="h1" width="5.4" height="5.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
    <path fill="none" stroke="currentColor" stroke-width=".38" d="M0 0 V5.4"/></pattern>
  <pattern id="h2" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
    <path fill="none" stroke="currentColor" stroke-width=".42" d="M0 0 V3.2"/></pattern>
  <pattern id="hx" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
    <path fill="none" stroke="currentColor" stroke-width=".42" d="M0 0 V3.4"/>
    <path fill="none" stroke="currentColor" stroke-width=".42" d="M0 0 H3.4"/></pattern>
  <pattern id="st" width="4" height="4" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r=".38" fill="currentColor"/><circle cx="3" cy="3" r=".3" fill="currentColor"/></pattern>
</defs>
<!-- 由亮到暗：h0 → h1 → h2 → hx（交叉排線）；柔和過渡用 st（點刻） -->
```

排線角度固定在 **-38°**（傳統雕版的「機械角」，與版面的水平垂直線都不平行，避免摩爾紋與視覺黏連）。

### 特徵 III — 兩層疊印：底紋 underprint ＋ 主雕 intaglio（版面手法）

畫面永遠是兩次上機。**底紋**滿版、低對比、明度 ≥ 80%、色相 A；**主雕**只在開窗與框飾裡、高對比、色相 B。兩層用 `multiply` 疊。少了底紋，券面會變成「白底黑線的插畫」，防刮改的整個前提消失。

```css
.under{ position:fixed; inset:-10vmax; z-index:0; pointer-events:none }
.under .u-a{ color:#CFDED4 }                       /* 底紋 A：淡青 */
.under .u-b{ color:#E7CFCB; mix-blend-mode:multiply } /* 底紋 B：淡玫瑰 */
.page{ position:relative; z-index:1 }
```

主雕的開窗一律是**橢圓 vignette**，外加兩到三圈間距遞減的細邊：

```html
<clipPath id="win"><ellipse cx="260" cy="180" rx="232" ry="158"/></clipPath>
<g clip-path="url(#win)"> …主雕… </g>
<ellipse cx="260" cy="180" rx="232"   ry="158"   fill="none" stroke="currentColor" stroke-width="1.3"/>
<ellipse cx="260" cy="180" rx="237"   ry="163"   fill="none" stroke="currentColor" stroke-width=".45"/>
<ellipse cx="260" cy="180" rx="240.5" ry="166.5" fill="none" stroke="currentColor" stroke-width=".45"/>
```

### 特徵 IV — 有價證券排版的四件套（字體選擇）

缺一不可：**(a) 弧排的機構名**（花體／copperplate，因為雕刀走曲線比走直線穩）；**(b) 四角重複的面額或編號**（用來驗裁切偏移）；**(c) 微縮文字 microtext**（肉眼是一條細線，放大才是句子）；**(d) 一條保證語窄欄**（最小號等寬襯線，左右各一條細線夾住）。

字體一律**襯線**。無襯線體在這個風格裡沒有位置。

```css
.sc   { font-variant-caps:all-small-caps; letter-spacing:.30em; font-weight:600 }
.script{ font-family:"Pinyon Script",cursive }          /* 弧排機構名 */
.ser  { font-family:"Cutive Mono",monospace; letter-spacing:.06em } /* 編號、面額、保證語 */
.micro{ font-size:2.2px; letter-spacing:.02em }          /* 微縮文字 */
```

```html
<!-- (a) 弧排 -->
<defs><path id="arc" d="M30 56 A200 130 0 0 1 390 56" fill="none"/></defs>
<text class="script" font-size="31"><textPath href="#arc" startOffset="50%" text-anchor="middle">Château Vaubernier</text></text>
<!-- (c) 微縮文字當細線 -->
<defs><path id="mic" d="M18 150 H302" fill="none"/></defs>
<text class="micro"><textPath href="#mic">TOUTE ALTÉRATION D'UN SEUL CARACTÈRE MODIFIE ENTIÈREMENT LE GUILLOCHÉ · </textPath></text>
```

> 微縮文字必須是**真的可讀的句子**，而且要在網站別處提供同一段文字的正常字級版本（本站放在保證語欄），否則是資訊損失。

### 特徵 V — 刀口白線（裝飾母題／觸感）

凹版的墨堆在紙面上，刀推開的那一點點紙在成品上是字與線周圍**極細的一圈白**。少了它，文字會黏進底紋，整張券從「雕刻品」掉回「印刷品」。做法是把描邊畫在填色**下面**。

```css
@supports (paint-order: stroke){
  .cut{ paint-order:stroke fill;
        stroke:var(--paper); stroke-width:3.4px; stroke-linejoin:round }
}
/* HTML 文字版（非 SVG）：用 ::before 疊一層純描邊 */
.relief{ position:relative; display:inline-block }
@supports (paint-order: stroke){
  .relief::before{ content:attr(data-t); position:absolute; inset:0; z-index:-1;
                   -webkit-text-stroke:3.2px var(--paper); color:transparent }
}
```

---

## 三、色彩系統

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 券紙 paper | `#F4F0E4` | 全站底色、刀口白線的白 | 44% |
| 底紋淡青 tint-a | `#CFDED4` | 底紋第一層（滿版） | 20% |
| 底紋淡玫瑰 tint-b | `#E7CFCB` | 底紋第二層（multiply 疊印） | 12% |
| 雕線墨綠 ink | `#1C4136` | 主雕、框飾、正文、導覽 | 18% |
| 雕線胭脂 carmine | `#8C2233` | 玫瑰紋、面額、編號、現用狀態 | 5% |
| 淡墨 faint | `#5C6B62` | 保證語、註記、次要資訊 | 1% |

**規則：**底紋兩色的明度必須 ≥ 80%，雕線兩色 ≤ 35%，而且底紋與雕線**不得同色相家族**。胭脂只給「號碼與紋」用——它是「這一張的身分」的顏色，不是強調色，不要拿去做按鈕底。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 字級 | 行高 |
|---|---|---|---|---|
| 機構名／署名 | Pinyon Script | 400 | 26–74px | .98–1.1 |
| 標題／正文 | Cormorant Garamond | 400 / 600 | 17–58px | 1.14（題）／1.62（文） |
| 中文 | Noto Serif TC | 400 / 600 | 同上 | 同上 |
| 編號／面額／保證語 | Cutive Mono | 400 | 8.5–26px | 1.75 |
| 小型大寫標籤 | Cormorant Garamond + `all-small-caps` | 600 | 11–16px，字距 .20–.42em | — |
| 微縮文字 | 任一等寬襯線 | 400 | 2.1–2.4px（SVG 單位） | — |

字級 scale：`8.5 / 10 / 11.5 / 13 / 15.5 / 17 / 19 / 22 / 26 / 34 / 50 / 74`。

---

## 五、版面與網格

- **外框**：頁面上下各一條 26px 高的橫飾條（`<pattern>` 平鋪的交織弧線＋菱形＋雙細線），`preserveAspectRatio="none"` 拉滿寬。
- **內容寬**：max 1120px，左右留白 `clamp(14px,3.4vw,40px)`。
- **主要分欄**：`1.02fr / .86fr` 或 `1.32fr / .9fr` 的兩欄，**永遠不對半分**；相鄰區塊左右交替（`:nth-child(even)` 換序）。
- **分隔**：只用 0.6px 實線（`--rule`），不用留白分隔、不用卡片。表格與規格清單直接用 `border-bottom`。
- **四角**：每個「券面」區塊的四角放同一組編號（面額／地塊號），`position:absolute`。
- **圓角**：0。**陰影**：無。**留白**：底紋是滿版的，所以「空白」在本風格中不存在——空的地方仍然有底紋。

---

## 六、元件配方

**導覽（版邊花牌 cartouche）**：導覽項目不是文字連結，是版框上的鏤空小花牌。現用頁不靠變色或底線標示，而是**把花牌內部刻滿排線**。

```html
<a class="cart" href="…" aria-current="page" aria-label="券面">
 <svg viewBox="0 0 132 44"><defs>
  <pattern id="ch1" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
   <path fill="none" stroke="currentColor" stroke-width=".5" d="M0 0 V3"/></pattern></defs>
  <path fill="none" stroke="currentColor" stroke-width=".8" d="M8 22 L14 6 H118 L124 22 L118 38 H14 Z"/>
  <path fill="none" stroke="currentColor" stroke-width=".45" d="M11.5 22 L16.6 9 H115.4 L120.5 22 L115.4 35 H16.6 Z"/>
  <path class="fillhatch" d="M11.5 22 L16.6 9 H115.4 L120.5 22 L115.4 35 H16.6 Z" fill="url(#ch1)"/>
  <path fill="none" stroke="currentColor" stroke-width=".45" d="M3 22 h4 M125 22 h4"/>
  <text x="66" y="21.5" text-anchor="middle" fill="currentColor" stroke="none"
        style="font-variant-caps:all-small-caps;letter-spacing:.2em;font-size:13.5px">券面</text>
 </svg></a>
```
```css
.cart .fillhatch{ opacity:0; transition:opacity .34s cubic-bezier(.4,0,.2,1) }
.cart:hover .fillhatch,.cart:focus-visible .fillhatch{ opacity:.55 }
.cart[aria-current="page"] .fillhatch{ opacity:1 }
.cart[aria-current="page"]{ color:#8C2233 }
```

**按鈕**：雙線框，內框 inset 2px、透明底。hover 只換顏色，不換底色、不位移、不加陰影。

```css
.btn{ background:transparent; border:.6px solid var(--ink); padding:9px 20px 10px;
      font-variant-caps:all-small-caps; letter-spacing:.24em; font-size:15px; font-weight:600;
      position:relative; cursor:pointer }
.btn::after{ content:""; position:absolute; inset:2px; border:.6px solid var(--ink); opacity:.5 }
.btn:hover,.btn:focus-visible{ color:var(--carmine); border-color:var(--carmine) }
.btn:hover::after{ border-color:var(--carmine) }
```

**表單**：沒有框，只有一條底線；label 用 10px 大字距的等寬襯線小標。focus 時底線換胭脂、底色墊一層淡青。`border-radius:0`（iOS 會自己加圓角）。

```css
.fld input{ width:100%; background:transparent; border:0; border-bottom:.6px solid var(--ink);
            padding:5px 2px; font-family:"Cutive Mono",monospace; font-size:14px; border-radius:0 }
.fld input:focus{ outline:0; border-bottom-color:var(--carmine); background:rgba(207,222,212,.35) }
```

**卡片**：本風格沒有卡片。要分組就用**共邊的格線**（相鄰格子共用一條 0.6px 線），不要各自獨立的盒子。

**footer**：`repeat(auto-fit,minmax(215px,1fr))` 的等寬欄，全部用 11.5px 等寬襯線；最後一條 0.6px 線之下是保證語／聲明段。

---

## 七、動效規則

| 類型 | 做什麼 | 觸發 | duration / easing |
|---|---|---|---|
| ambient 環境 | 兩層底紋反向緩轉，莫列波紋整天漂移 | 無，持續 | 244s／311s `linear` |
| input-driven 輸入 | 雕版放大鏡：鏡內 6× 才讀得出微縮文字 | pointermove／click／方向鍵 | 僅寫 CSS 變數，無 transition；opacity .16s |
| transition 轉場 | 券的開立與作廢（`display` 也一起轉場） | 按鈕 | .5s `cubic-bezier(.2,.8,.25,1)`／.34s ease |
| **signature 簽名** | **車紋 rose-engine turning**：玫瑰紋一圈一圈被「車」出來，每加一圈，整張的干涉圖樣重新解一次 | 開券、載入、再車 | 每圈 118ms，共 9–15 圈 |

**簽名動效的關鍵：不是 `stroke-dashoffset` 描繪。** dashoffset 是最終圖樣早已固定、只是被遮起來慢慢露出；車紋是**路徑本身在變長**，所以每多一圈，圈與圈之間的莫列紋是新的——那正是真車床的行為。

```js
function turnRose(host,P,done){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){ fillRose(host,P,P.T); done&&done(); return; }
  var n=1,last=0;
  requestAnimationFrame(function step(ts){
    if(ts-last>=118){ last=ts; fillRose(host,P,n); n++; }
    n<=P.T ? requestAnimationFrame(step) : done&&done();
  });
}
```

**放大鏡（雙層 clip + transform-origin，不需要 canvas）：**

```css
.plate{ position:relative; touch-action:none }
.plate .loupe{ position:absolute; inset:0; pointer-events:none; opacity:0;
               clip-path:circle(54px at var(--lx,50%) var(--ly,50%)); transition:opacity .16s linear }
.plate.on .loupe{ opacity:1 }
.plate .loupe-in{ position:absolute; inset:0; background:var(--paper);
                  transform-origin:var(--lx,50%) var(--ly,50%); transform:scale(6) }
```
```html
<div class="plate" tabindex="0"> <svg>…<g id="body">…</g></svg>
  <div class="loupe"><div class="loupe-in"><svg><use href="#body"/></svg></div></div>
  <div class="ring"></div></div>
```
> `<use>` 指回同一個 `<g>`，放大層零額外位元組。

**降級（`prefers-reduced-motion: reduce`）**：底紋停在固定相位；放大鏡改為點擊定位（仍可用、仍看得到微縮文字）；車紋直接給最終圈數；券的轉場時間縮到 0.01ms。**四種降級後資訊皆零損失。**

---

## 八、插畫與圖像風格

- **技法**：線雕排線（line-engraved ruling）。所有圖像 = 輪廓線（1.3px／0.8px／0.45px 三級）＋ 排線 `<pattern>` 填調子。
- **沒有的東西**：色塊、漸層、陰影、模糊、任何點陣圖。
- **透視**：單點透視，消失點壓在畫面下三分之一（建築物永遠比視線高一點，這是十九世紀 vignette 的標準做法）。
- **天空**：水平排線，愈往上愈疏、線愈粗（愈上愈亮）。
- **地面**：往消失點收斂的放射線 ＋ 間距遞增的橫線。
- **資料圖表**：用排線密度編碼數值（例：石灰岩 61% → 間距 4.6px；6% → 11px），**密度本身就是圖例**，不另做 legend。
- **一定要有一張「開窗圖」**：橢圓 vignette 裡的建築／人物／器物，是整個風格的臉。

---

## 九、Logo 與 Favicon

- **Logo**：左為橢圓開窗（三圈細邊）＋窗內線雕建築＋一朵胭脂色小玫瑰紋；右為斜體花體字名、下方小型大寫副題與 0.5px 分線。**純線，零填色**（除了微小的點刻）。
- **Favicon**：16–32px 尺寸下排線會糊掉，所以只保留兩件事——**橢圓雙框 ＋ 一枚兩瓣的胭脂色紋**。inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F4F0E4'/%3E%3Cg fill='none' stroke='%231C4136' stroke-width='1'%3E%3Cellipse cx='16' cy='16' rx='13' ry='9'/%3E%3Cellipse cx='16' cy='16' rx='10.5' ry='6.8'/%3E%3C/g%3E%3Cg fill='none' stroke='%238C2233' stroke-width='.8'%3E%3Cpath d='M16 9.6 C22 12 22 20 16 22.4 C10 20 10 12 16 9.6Z'/%3E%3Cpath d='M9 16 C12 10.8 20 10.8 23 16 C20 21.2 12 21.2 9 16Z'/%3E%3C/g%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 每一個裝飾母題都要能回答「它在防什麼」。
- 明暗只用間距做。線寬變化留給**輪廓層級**（1.3／0.8／0.45），不要拿來做調子。
- 排線角度固定 -38°，全站一致。
- 四角重複編號；微縮文字放在肉眼看起來像細線的位置。
- 底紋滿版。頁面沒有真正的空白。
- 微縮文字與放大鏡的內容，一定要在別處有正常字級的等價文字。

**Don't（含去 AI 化禁令）**
- ❌ 任何 `linear-gradient` / `radial-gradient` 當調子（`conic`/`repeating-*` 拿去做排線也不行，用 `<pattern>`）
- ❌ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片
- ❌ `border-radius` > 0、`box-shadow`、`filter: blur/drop-shadow`
- ❌ 無襯線體、系統字體堆疊
- ❌ emoji 當 icon（icon 一律自繪線雕 SVG）
- ❌ 「EST. 18xx」徽章（本風格的年份寫在保證語與編號裡，不做徽章）
- ❌ 把玫瑰紋當背景裝飾隨便鋪——它必須對應某個具體的資料
- ❌ 用 `stroke-dashoffset` 描繪玫瑰紋（那是「露出」不是「車出」，看得出來的）
- ❌ 金色。鈔券雕刻是墨的工藝，不是燙金的工藝；一加金就變成 Art Deco 了。

---

## 十一、頁面骨架範例

```html
<body>
  <div class="under" aria-hidden="true">
    <svg class="u-a" viewBox="-130 -130 260 260"><defs><path id="up" class="rose" d="…"/></defs>
      <g class="spin-a"><g transform="scale(.94)"><use href="#up"/></g></g></svg>
    <svg class="u-b" viewBox="-130 -130 260 260">
      <g class="spin-b"><g transform="scale(.88)"><use href="#up"/></g></g></svg>
  </div>

  <div class="page">
    <header class="plate-frame">
      <svg class="rail" viewBox="0 0 48 26" preserveAspectRatio="none">…橫飾條 pattern…</svg>
      <nav><ul class="cart-nav"><!-- 版邊花牌 × 4 --></ul></nav>
    </header>

    <main class="plate-frame">
      <section class="opening">
        <span class="op-corner tl">03</span><span class="op-corner tr">07</span>
        <span class="op-corner bl">11</span><span class="op-corner br">19</span>
        <div class="op-grid">
          <div class="plate" tabindex="0"><!-- 橢圓開窗主雕 + 放大鏡 --></div>
          <div>
            <h1 class="op-name">Château<br>Vaubernier</h1>
            <p class="op-sub">小型大寫副題</p>
            <svg class="op-rose">…車床玫瑰紋…</svg>
            <p class="guar">保證語（等寬襯線 11px）</p>
          </div>
        </div>
        <div class="denom-row"><span class="denom">03 · CROUPE DU NORD</span>…</div>
      </section>

      <section class="band two">…1.02fr / .86fr 兩欄，相鄰區塊左右交替…</section>
    </main>

    <footer class="plate-frame">
      <svg class="rail rail-b" viewBox="0 0 48 26" preserveAspectRatio="none">…</svg>
      <div class="foot-grid">…四欄等寬…</div>
      <p class="disc">聲明段</p>
    </footer>
  </div>
</body>
```

---

## 十二、技術實作與相容性

### 1. SHA-256（Web Crypto ＋ 純 JS 備援）— 承載特徵 I 與本站首創

**做什麼**：把券面五個欄位串成一條字串，取 SHA-256 得到 32 個位元組，再切成車床參數（R／r／刀距／相位／圈數／瓣數／複寫張數／旋轉差／縮率／線寬）。於是**紋樣就是那份資料的簽章**：同樣的欄位在任何機器上車出同一朵紋；改一個字元，整朵紋完全不同。

**支援現況（查證：MDN `Crypto.subtle`；W3C WebCrypto issue #170 與 Mozilla bug 1333140 關於 SecureContext 的決議）**：`crypto.subtle` 標記為 `[SecureContext]`，**只在 https 與 localhost 可用**；`file://` 不是安全脈絡，`crypto.subtle` 會是 `undefined`。

**fallback 具體行為**：本站內建一支約 40 行的純 JavaScript SHA-256，與 Web Crypto **輸出逐位元相同**（已對 NIST 標準向量核對：空字串 `e3b0c442…b855`、`"abc"` → `ba7816bf…15ad`，並與 Node 的 `crypto.subtle` 逐位元比對通過）。判斷式：

```js
var HAS = !!(window.crypto && window.crypto.subtle && window.crypto.subtle.digest && window.isSecureContext);
function digest(str){
  var b = new TextEncoder().encode(str);
  return HAS ? crypto.subtle.digest("SHA-256", b).then(r=>new Uint8Array(r)).catch(()=>sha256js(b))
             : Promise.resolve(sha256js(b));
}
```
因此**離線（file://）複驗與線上複驗結果一致**；券面左下會標明本次走的是哪一條路徑。

### 2. `paint-order` — 承載特徵 V（刀口白線）

**支援現況（查證：MDN `paint-order`；caniuse `mdn-css_properties_paint-order`，2026-09 資料）**：Baseline 2024 年 3 月；全球 97.02%。Chrome／Edge 123+、Firefox 60+、Safari 11+ 完整支援；Chrome 35–122、Edge 79–122、Safari 8–10.1 為部分支援（僅認 SVG 呈現屬性，不認 CSS 屬性）。

**fallback 具體行為**：整段規則包在 `@supports (paint-order: stroke)` 內。不支援時**完全不加白色描邊**（而不是讓白邊蓋住字），文字仍為墨綠實心、仍然清楚可讀，只少一層凸版觸感。

### 3. `@starting-style` ＋ `transition-behavior: allow-discrete` — 承載轉場動效

**支援現況（查證：MDN `@starting-style` 與 `transition-behavior`；web.dev "Now in Baseline: animating entry effects"）**：Baseline Newly available，2024 年 8 月 6 日（Chrome 117+／Safari 17.5+／Firefox 129+ 起兩者齊備）。

**fallback 具體行為**：不支援時，`display` 的切換立即生效——券直接出現、直接消失，狀態與資訊完全相同，只是沒有那 0.5 秒的進場。不需要 JS polyfill，也不需要雙 `requestAnimationFrame` 的老把戲。

```css
.warrant.shown{ opacity:1; transform:none; transition:opacity .5s ease, transform .5s cubic-bezier(.2,.8,.25,1) }
@starting-style{ .warrant.shown{ opacity:0; transform:translateY(16px) scale(.985) } }
.warrant.gone{ opacity:0; display:none;
               transition:opacity .34s ease, display .34s allow-discrete }
```

### 4. 效能預算（實測值）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁最大大小（含全部 inline 資源） | **114 KB**（四塊地頁；其餘 60–89 KB） | ≤ 350 KB |
| 首屏 JS 執行（不含字型下載） | **< 100 ms**（SHA-256 一次 + 一次 path 生成 ≈ 5 ms） | ≤ 100 ms |
| 主要動畫 | 底紋僅 `transform:rotate`（合成層）；車紋每 118ms 改一次 `d`，共 9–15 次 | 60 fps |
| Layout thrashing | 無：放大鏡只寫 CSS 自訂屬性，`getBoundingClientRect` 每次事件讀一次且不交錯寫入 | 無 |

**節省位元組的關鍵做法**：放大鏡的放大層與底紋的第二層都用 `<use href="#id">` 指回同一個 `<g>`／`<path>`，不複製路徑資料。單一玫瑰紋路徑約 10–18 KB；複寫 5–9 份靠 `<use>` + transform，零額外成本。

---

*規格書版本 1.0（2026-09-16）。本 SKILL.md 不綁定產業：把「窖單」換成門票、會員證、獎狀、血統書、債券、保證卡，整套語言原樣可用。*
