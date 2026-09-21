---
name: ansi-art-bbs
description: ANSi Art — the colour text-mode art of the 1990s BBS scene (ACiD / iCE): an 80-column character-cell canvas, one foreground and one background colour per cell, CP437 half-blocks and a four-step shade ramp as the only source of tone, and the hard-wired IBM EGA sixteen-colour palette.
---

# ANSi Art — BBS 場景的 ANSI 藝術

> 型錄歸屬：「數位與螢幕原生」類「ASCII/ANSI Art」條目。全館第 1 站。
> 範例站：種板堂（箱根 畑宿の寄木細工工房）

---

## 這個流派是什麼

1990–1997 年，北美的撥接電子佈告欄（BBS）上長出來的一種彩色文字畫。畫家用 TheDraw、ACiDDraw、PabloDraw 在 IBM PC 的文字模式裡逐格擺字元，存成 `.ANS` 檔；檔案本身是一串 ANSI 跳脫序列（`ESC [ ... m`），所以**下載的時候它會在你眼前一格一格自己畫出來**。

兩個最大的團體是 **ACiD Productions**（1990 年成立）與 **iCE Advertisements**（1991 年），兩家每個月出一次「artpack」——把該月所有畫家的作品打包成一個壓縮檔流出去。1994 年 Olivier Reubens 訂出 **SAUCE**（Standard Architecture for Universal Comment Extensions）規格：在檔尾附 128 位元組的記錄，寫作者、團體、日期與欄寬。署名是這個流派的一部分，不是附加物。

### 與四個近親的分界（這四個常被混為一談）

| 流派 | 欄數 | 色 | 圖形原語 | 屬性的代價 |
|---|---|---|---|---|
| **ANSi Art（本條目）** | 80 | 前景 16／背景 8 | 半塊 `▀▄▌▐` ＋ 四階濃淡 `░▒▓█` | 零——屬性不佔格 |
| Teletext／Ceefax | 40 | 7，**沒有高亮位** | 2×3 六格馬賽克 | **佔掉一整格**，所以換色要花版面 |
| 8-bit 像素 | — | 每個精靈自己的子色盤 | 自由的像素畫布 | — |
| 復古終端機／CRT 磷光 | — | 單色磷光 | 掃描線、輝光、弧面 | — |

- 與 **Teletext** 的分界最要緊：那是廣播端的規格，顏色要付版面的代價，所以 Teletext 的畫面稀疏；ANSi 的顏色不花錢，所以 ANSi 的畫面是滿的。
- 與 **8-bit 像素** 的分界：ANSi 沒有比半格更小的筆畫，而且一格只准兩個顏色。
- 與 **CRT 磷光** 的分界：那些是**顯示裝置的瑕疵**（輝光、掃描線、弧面）。ANSi 的限制來自**檔案格式**。真正的 ANSi 畫面上沒有輝光、沒有掃描線、沒有弧面——加上去就不是這個流派了。
- 與 **純 ASCII art** 的分界：那是單色的、用字母的形狀當濃淡；ANSi 的濃淡來自 `░▒▓█` 四階，而顏色是它一半的語言。

---

## 本風格的 5 個不可省略特徵

### 特徵 1 ── 字元格是唯一的畫布單位，而且它是長方的

沒有任何東西可以落在格與格之間。一格的比例約 **1 : 1.67**（VGA 文字模式的實際點陣是 9×16）。

```css
pre.art{
  font-family: ui-monospace,"DejaVu Sans Mono","Liberation Mono",Menlo,Consolas,monospace;
  line-height: 1;          /* 必須是 1。大於 1 就會在相鄰兩列的半塊之間留下髮絲縫 */
  white-space: pre;
  letter-spacing: 0;       /* 任何字距都會撕開格線 */
  font-variant-ligatures: none;
}
```

列高還必須落在**整數像素**上，否則半塊之間一樣會有縫：

```css
:root{ --fs: clamp(12px,1.34vw,16px); }
@supports (width: round(down,10px,1px)){
  :root{ --fs: round(down, clamp(12px,1.34vw,16px), 1px); }
}
html{ font-size: var(--fs); }
```

**拿掉它會怎樣**：只要有一個元素用了 `padding: 6px` 這種非整格的值，整面畫就從「文字模式」掉回「網頁」。本範例站全站的垂直間距只有 `1em`（＝一列）與 `2em`（＝兩列）兩種值，水平間距只有 `1ch`。

### 特徵 2 ── 一格只有一個前景色與一個背景色，所以斜邊只能用半塊切

這是 ANSi 的「反鋸齒」：把一格切成上下兩個色域。

```js
// 上半 t、下半 u（皆為 0–15 的色號，0 視為地）
function cell(t,u){
  if(t===u)   return {g: t? '█':' ', fg:t, bg:0};   // █ 或空白
  if(u===0)   return {g:'▀', fg:t, bg:0};           // ▀ 上半塊
  if(t===0)   return {g:'▄', fg:u, bg:0};           // ▄ 下半塊
  return        {g:'▀', fg:t, bg:u};                // ▀ ＋ 背景色補下半
}
```

橫向要切就用 `▌`（左半）與 `▐`（右半）。**不准用第五種切法**——三分之一、四分之一的塊字元（`▁▂▃`）是後來 Unicode 才有的，CP437 沒有，用了就穿幫。

### 特徵 3 ── 階調只有五階，而且是四個塊字元給的

```
（空白）  ░ 25%   ▒ 50%   ▓ 75%   █ 100%
```

```css
/* 明文禁止清單 —— 這五項出現任何一項，就不是 ANSi 了 */
/*  ✗ linear-gradient / radial-gradient / conic-gradient
    ✗ opacity: 任何非 1 的值
    ✗ rgba() / hsla() 的第四位
    ✗ filter: blur|brightness|drop-shadow
    ✗ box-shadow / text-shadow                              */
```

要更多階？沒有。要表現中間調，只能**把兩色細細交錯排**，讓觀者自己在眼睛裡混（這正是寄木細工唯一的混色法）。

### 特徵 4 ── IBM EGA 十六色定盤；高亮是一個位元，不是一個亮度旋鈕

這十六個色碼不是設計者挑的，是 1984 年燒進 EGA 基板的。**樣式表裡不得出現第十七個色碼。**

```css
:root{
  --c0:#000000; --c1:#0000AA; --c2:#00AA00; --c3:#00AAAA;
  --c4:#AA0000; --c5:#AA00AA; --c6:#AA5500; /* 褐色——這一格是硬體特例，不是 #AAAA00 */
  --c7:#AAAAAA;
  --c8:#555555; --c9:#5555FF; --cA:#55FF55; --cB:#55FFFF;
  --cC:#FF5555; --cD:#FF55FF; --cE:#FFFF55; --cF:#FFFFFF;
}
```

兩條硬規則：

1. **高亮位（第 3 位元）是開或關，中間什麼都沒有。** `#AA0000` 與 `#FF5555` 之間不存在任何一個合法的紅。
2. **背景只能用低八色。** 屬性位元組的高位元在文字模式裡是**閃爍位**，不是背景亮度位——所以 `#FFFF55` 可以當字，不能當底。

### 特徵 5 ── 零反鋸齒、零圓角、零陰影；而且每一幅畫都署名

```css
*{ border-radius: 0 }                 /* 文字模式裡沒有圓角這種東西 */
svg{ shape-rendering: crispEdges }    /* logo／favicon 也一樣 */
img,canvas{ image-rendering: pixelated }
```

署名是格式的一部分。每一幅畫的下方要有一列 **SAUCE 記錄**的等價物：作者／團體／日期／欄寬。

```html
<figcaption>
  麻の葉 ─ TANEITA-DŌ ─ 2026-09 ─ 40 cols
</figcaption>
```

**拿掉它會怎樣**：ANSi 是一種「有落款的量產品」文化——月刊、包裹、團體名。把署名拿掉，畫還在，但那個文化沒了，看起來就只是「用方塊拼的圖」。

---

## 設計哲學

**限制不是風格，限制是材料。** ANSi 畫家不是「選擇」用方塊畫圖，是文字模式只給他方塊。所以做這個風格時，正確的問法不是「怎樣看起來像 ANSi」，而是「如果我只有 2000 個格子、十六個色碼和五階濃淡，我要怎麼把這件事講完」。

三條推論：

1. **版面是可數的。** 一屏就是欄數 × 列數，是整數。資訊超出就換屏，不是縮小字級。
2. **階層不靠級數。** 文字模式只有一個字級、一個字重。標題不比正文大。階層只能用**顏色**、**反白**（SGR 7）與**框線字元**表示。
3. **沒有補間。** 位移是整格的跳。0.5 格的位置不存在，所以也不該用 transition 假裝它存在。

---

## 色彩系統

| 番 | 色碼 | 名 | 用途 | 佔比（本範例站） |
|---|---|---|---|---|
| 0 | `#000000` | 黑 | 全站地色 | 62% |
| 7 | `#AAAAAA` | 淡灰 | 正文 | 18% |
| 8 | `#555555` | 暗灰 | 次要文字、框線、說明 | 7% |
| 15 | `#FFFFFF` | 白 | 強調的字、畫面最亮階 | 4% |
| 14 | `#FFFF55` | 明黃 | 一級標題、現用狀態 | 3% |
| 10 | `#55FF55` | 明綠 | 二級標題 | 2% |
| 6 | `#AA5500` | 褐 | 三級標題、圖面主色 | 2% |
| 4 · 2 · 5 | `#AA0000` `#00AA00` `#AA00AA` | 暗紅／暗綠／暗洋紅 | 圖面 | 2% |
| 1 · 3 · 9 · 11 · 12 · 13 | 六個青／洋紅系 | — | **保留給「機器在講話」**：框線、提示、合わせ口 | <1% |

**配色的訣竅**：不要平均分配十六色。**選十六色裡的五到七色當主力，其餘只在圖裡出現。**本範例站的做法是把十六格分成「木做得出來的十格」與「木做不出來的六格」，後者只給介面用——這條規則同時解決了配色與語意。

`::selection` 用最單純的反白：

```css
::selection{ background:#AAAAAA; color:#000000 }
```

---

## 字體系統

- **字級只有一級。** `html{font-size:var(--fs)}`，其餘一律 `1rem`。標題、正文、按鈕、表格全部同級。
- **字重只有一種。** `font-weight:400`。文字模式沒有粗體——ANSi 裡的「粗體」其實是高亮位元，也就是**換一個顏色**。所以 `strong{font-weight:400;color:#FFFFFF}`。
- **行高兩種。** 圖 `line-height:1`（＝一列）；正文 `line-height:2`（＝兩列）。文字模式的正文一定要跳一列，否則黏成一塊。
- **兩套等寬字，各司其職**（因為兩者的字寬比例不同，混在同一段會撕開格線）：

```css
--art: ui-monospace,"DejaVu Sans Mono","Liberation Mono",Menlo,Consolas,monospace; /* 圖：要塊字元的完整覆蓋 */
--ui : "M PLUS 1 Code",ui-monospace,Menlo,Consolas,monospace;                       /* 介面：要 CJK */
```

CJK 在等寬字裡是雙寬，**這是對的**——終端機裡的漢字本來就佔兩格。

---

## 版面與網格

- **屏（screenful）**：`max-width:80ch`，置中。80 欄是 ANSi 的本位。
- **圖一律作在 ≤40 欄**，這樣手機（≤560px）不必橫捲也放得下。
- **垂直只有兩個值**：`1em`（一列）、`2em`（兩列）。不准出現 `1.5em`、`18px`、`0.75rem`。
- **水平只有一個值**：`1ch`。
- **旋轉角度：零。** 文字模式不能轉。任何 `transform: rotate()` 都是穿幫。
- **留白**：用真的空白格，不用 margin。需要一列空白就空一列。

---

## 元件配方

### 導覽（cursor-parked 游標停駐）

四頁 ＝ 四行選單。四行的大小、位置、外形、字、明暗結構**完全一樣**；變的只有「反白停在哪一行」。

```css
nav a{ color:#AAAAAA; background:#000000; padding:0 1ch; text-decoration:none }
nav a::before{ content:"  "; white-space:pre }
nav a[aria-current]{ color:#000000; background:#AAAAAA }        /* SGR 7 反顯 */
nav a[aria-current]::before{ content:"\25BA "; animation:blk 456ms linear infinite }
```

### 標題

```css
h1,h2,h3{ font-size:1rem; font-weight:400; line-height:2 }
h1{ color:#FFFF55 }
h2{ color:#55FF55 } h2::before{ content:"\2500\2500 "; color:#555555 }
h3{ color:#AA5500 } h3::before{ content:"\2502 ";      color:#555555 }
```

### 按鈕

```css
button{ font:inherit; color:#AAAAAA; background:#000000; border:1px solid #555555; padding:0 1ch }
button:hover:not(:disabled){ color:#000000; background:#AAAAAA }   /* 反白，不是變色 */
button[data-on]{ color:#000000; background:#FFFF55 }
button:disabled{ color:#555555 }
```

### 框

只用框線字元或 1px 實線，永遠沒有陰影、沒有圓角。

```css
.box{ border:1px solid #555555; padding:0 1ch }
```

### footer

一條 `border-top:1px solid #555555`，內容全用 `#555555`。

---

## 動效規則

**四種，缺一不可。** 文字模式的動效不是裝飾，是這個媒介唯一的時間感。

| 種類 | 是什麼 | 觸發 | 時值／曲線 |
|---|---|---|---|
| ambient 環境 | **閃爍位**（屬性位元組的第 7 位元） | 不需輸入，持續 | `456ms linear infinite`，硬切無補間 |
| input-driven 輸入 | **重放**（按一下任何一幅畫，它就從頭再流一次）＋**整格跳位**（板滑） | 點擊／Enter／空白鍵 | 重放 1440 字元／秒；跳位每格 `90ms`，**沒有中間位置** |
| transition 轉場 | **清屏重畫**（跨文件 View Transitions） | 換頁 | `240ms linear`，`clip-path` 由上往下 |
| signature 簽名 | **〈屬性流〉** | 指標／方向鍵落在圖上 | 即時（<16ms），零 transition |

閃爍的節拍有出處：VGA 文字模式的字元閃爍是每 **32** 個垂直掃描一循環，70.086 Hz ÷ 32 ≈ 2.19 Hz ⇒ **456 ms**。

```css
@keyframes blk{ 0%,49.9%{color:inherit} 50%,100%{color:#000000} }  /* 硬切。不准用 ease */
```

```css
/* 轉場：舊屏由上往下被清掉，新屏由上往下畫回來 */
@view-transition{ navigation:auto }
@keyframes scr-out{ from{clip-path:inset(0 0 0 0)}   to{clip-path:inset(100% 0 0 0)} }
@keyframes scr-in { from{clip-path:inset(0 0 100% 0)} to{clip-path:inset(0 0 0 0)} }
::view-transition-old(root){ animation:scr-out 240ms linear both }
::view-transition-new(root){ animation:scr-in  240ms linear both }
```

**降級（四種都必須有，且資訊零損失）：**

```css
@media (prefers-reduced-motion:reduce){
  ::view-transition-old(root),::view-transition-new(root){ animation:none }  /* 直接換頁 */
  .blink,nav a[aria-current]::before{ animation:none }                        /* 停在「亮」的那一半 */
}
```
- 重畫開場：`prefers-reduced-motion` 時整屏一次到位（見下節）。
- 重放與整格跳位：重放在 `prefers-reduced-motion` 時直接一次到位；跳位本來就是離散的，降級後仍然跳。
- 〈屬性流〉：它是**資訊**不是動畫，降級後照常顯示。

**明文禁用**：淡入、視差、緩動曲線（`ease`／`cubic-bezier`）、任何小於一格的位移、任何 `opacity` 過渡。

---

## 插畫與圖像風格

**全站零 `<img>`、零 `<canvas>`、零點陣圖、零外部圖檔。每一幅畫都是真的文字**（唯一的例外是頁首那個 logo：它是一個 inline `<svg>`，但也只是把同一套字元格寫成整數座標的矩形，見〈Logo 與 Favicon〉）——可以框選、可以複製、貼進純文字編輯器後顏色掉了但形還在。

作法是三段式：

```
像素緩衝（Int8Array，每格一個 0–15 的色號）
        ↓ 兩列併一列
字元格（{字, 前景, 背景}）
        ↓ 併相同屬性的連續格
一條字元流 ＋ 一串「屬性段」
        ↓ Range ＋ CSS Custom Highlight API
畫面
```

**只准三條原語，明文不允許第四條：**

1. 半塊 `▀ ▄ ▌ ▐`（切格）
2. 四階濃淡 `░ ▒ ▓ █`（階調）
3. 框線 `─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼ ═ ║ ╔ ╗ ╚ ╝`（框）

形狀一律由**多邊形掃描線填色**產生（三角、菱、六角、圓環），不手擺格子——手擺的圖改不動、也證明不了決定性。同一份參數永遠長出同一幅畫。

### 開場：逐格重畫（redraw-first）

首屏不是已經在那裡等你，是在你眼前**一格一格由左上往右下畫出來的**，而且順序不能改——因為 ANSi 檔是一條指令流，畫面的到達順序就是檔案的位元組順序。

速率取 **14400 bps ÷ 10 位元 ＝ 1440 字元／秒**（1994 年的常見數據機）。

```js
// 作法：先把整幅畫完整上色，再用一個最高優先度的「幕」蓋住還沒到的尾巴。
// 這樣不必反覆重建文字節點，Range 也不會失效。
const veil = new Highlight(); veil.priority = 50;
CSS.highlights.set('veil', veil);
// ::highlight(veil){ color:transparent; background-color:#000000 }
requestAnimationFrame(function step(t){
  const i = Math.min(N, Math.floor((t-t0)/1000*1440));
  veil.clear();
  if(i<N){ const r=document.createRange(); r.setStart(tn,i); r.setEnd(tn,N); veil.add(r); requestAnimationFrame(step); }
});
```

### 簽名動效〈屬性流〉

指標落在畫上，**亮起來的不是那個圖形，是「畫出它的那一段屬性」**——因為在 ANSi 檔裡顏色不掛在圖形上，是掛在一段連續的字元範圍上。那一段可能橫跨兩個不相干的形，也可能在一行中間斷掉，而且**屬性跨換行不中斷**。

> 高亮的邊界是**檔案**的邊界，不是**圖**的邊界。

```js
// 每一個 (前景,背景) 組合一個 Highlight 註冊項，就是一條 SGR 屬性
const name = 'a'+fg+'_'+bg;
sheet.insertRule(`::highlight(${name}){color:${EGA[fg]};background-color:${EGA[bg]}}`,0);
let h = CSS.highlights.get(name);
if(!h){ h = new Highlight(); h.priority = 1; CSS.highlights.set(name,h); }
const r = document.createRange(); r.setStart(textNode, run.start); r.setEnd(textNode, run.end);
h.add(r);
```

指標落在哪一格，用幾何算就好，不需要 `caretPositionFromPoint`：

```js
const rc = pre.getBoundingClientRect();
const col = Math.floor((x-rc.left)/(rc.width /cols));
const row = Math.floor((y-rc.top )/(rc.height/rows));
const index = row*(cols+1) + col;   // +1 是每列尾端的換行字元
```

---

## Logo 與 Favicon 設計指南

Logo **不是向量圖示**，是一張文字螢幕的截圖。作法：用同一支繪圖引擎產生格子，再把每一列的同色連續格併成一個 `<rect>` 寫出 SVG。

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 30" shape-rendering="crispEdges">
  <rect width="26" height="30" fill="#000000"/>
  <rect x="3" y="7" width="6" height="1" fill="#FFFFFF"/>
  <!-- ……每列一組矩形，座標永遠是整數 -->
</svg>
```

規則：

- `shape-rendering="crispEdges"`，永遠不反鋸齒。
- 座標一律整數，沒有小數、沒有曲線、沒有 `rx`。
- 色碼只能取自那十六個。
- Favicon 用同一個圖的 16×16 版，寫成 inline SVG data URI 放在 `<head>`；不外連檔案。

---

## Do & Don't

**Do**

- 先決定欄數與列數，再決定要講什麼——版面是預算。
- 顏色成對思考：一格是「前景 ＋ 背景」，不是「一個顏色」。
- 斜邊一律用半塊切，並且接受它是階梯狀的。
- 標題與正文同級，用顏色與反白做階層。
- 每幅畫署名（作者／團體／日期／欄寬）。
- 圖用真的文字做，讓人可以複製走。

**Don't**

- ✗ **不要加 CRT 輝光、掃描線、弧面、色散。**那是別的流派（復古終端機／CRT 磷光），而且是最常見的誤解。
- ✗ 不要用漸層、`opacity`、`rgba` 第四位、`filter`、`box-shadow`、`border-radius`。
- ✗ 不要用第十七個色碼——包括「看起來很像」的 `#111111`。
- ✗ 不要用 `▁▂▃▅▆▇` 這些 CP437 沒有的分數塊字元。
- ✗ 不要靠字級或字重做階層。
- ✗ 不要有小於一格的位移或任何補間。
- ✗ 不要用 `letter-spacing`／`text-align:justify`／`word-spacing`。
- ✗ 不要用 emoji 當圖示（它不在色盤裡，也不在格線上）。
- ✗ 不要用 Lorem ipsum、「EST. 19xx」徽章、置中三卡片、紫藍漸層。
- ✗ 不要把 ANSi 當「駭客感」的貼皮。它是一種**印刷限制**，不是一種氣氛。

---

## 技術實作與相容性

### (a) CSS Custom Highlight API — 本站所有顏色的唯一來源

- **API**：`CSS.highlights`（`HighlightRegistry`）、`Highlight`、`::highlight()`。
- **支援現況（查證於 MDN，2026-09）**：`::highlight()` 標示 **Baseline 2026 · Newly available**，「Since March 2026, this feature works across the latest devices and browser versions.」Firefox 於 140（2025-06）補齊，至此四大瀏覽器齊備。
  查證來源：MDN `::highlight()`（`developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::highlight`）、MDN `CSS Custom Highlight API`。
- **可用屬性（MDN 明列）**：`color`、`background-color`、`text-decoration` 及其相關屬性、`text-shadow`、`-webkit-text-stroke-color` / `-webkit-text-fill-color` / `-webkit-text-stroke-width`。**`background-image` 會被忽略**——這正好符合本流派「零漸層」的要求。
- **為什麼這個流派需要它**：ANSi 檔裡顏色不是掛在圖形上，是一段 SGR 屬性掛在一段連續字元上。Custom Highlight API 是網頁平台上唯一能「不包元素就替一段字上色」的機制，所以它不是替代方案，是**同構**。副產品：整幅圖的 DOM 底下只有一個純文字節點，可框選、可複製。
- **高亮矩形＝字元格**：highlight 虛擬元素的背景填滿該段文字的**行框矩形**（和 `::selection` 一樣），在 `line-height:1` 下恰好等於一格。半塊的下半永遠由背景色補滿，不靠字型把格子塞滿。
- **不支援時的 fallback（具體行為）**：偵測 `window.CSS && CSS.highlights && window.Highlight`；缺任一項就改走 `<span>` 包裝路徑，逐段套 inline `color` / `background-color`。**畫面完全相同，形與色零損失**，代價是 DOM 變髒、複製時會帶出換行、且簽名動效〈屬性流〉與開場重畫會停用（此時首屏直接完整呈現）。
- **優先度**：底層屬性段 `priority = 1`，〈屬性流〉`= 20`，開場的幕 `= 50`。重疊時高的蓋低的。

### (b) 跨文件 View Transitions — 清屏轉場

- **API**：`@view-transition { navigation: auto }`、`::view-transition-old(root)` / `::view-transition-new(root)`。
- **支援現況（查證於 MDN，2026-09）**：MDN `@view-transition` 的狀態列明白寫著 **Limited availability · 「This feature is not Baseline because it does not work in some of the most widely-used browsers.」** 目前 Chromium 126+ 與 Safari 18.2+ 有，Firefox 仍在進行中。
  查證來源：MDN `@view-transition`（`developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition`）。
- **不支援時的 fallback（具體行為）**：`@view-transition` 是 at-rule，不認得就整條被忽略，導覽變成**一般的瞬間換頁**。資訊零損失，只是少一段 240ms 的清屏。這也是 `prefers-reduced-motion` 的降級行為。
- **為什麼這個流派需要它**：文字模式換屏就是清屏重畫，不是滑動也不是淡入。`clip-path: inset()` 由上往下正是 `ESC[2J` 之後游標回到左上角開始重畫的樣子。

### (c) CSS `round()` ＋ `ch`/`em` 字元格單位

- **支援現況（查證於 MDN／web.dev，2026-09）**：`round()`／`mod()`／`rem()` 這組 stepped-value 函式自 **2024 年 5 月起 Baseline**，Chrome／Firefox／Safari 皆有。
  查證來源：MDN `round()`、web.dev「The CSS stepped value math functions are now in Baseline 2024」。
- **為什麼這個流派需要它**：列高若落在非整數像素上，相鄰兩列的半塊之間會出現**一條髮絲縫**，整面畫就散了。`round(down, clamp(12px,1.34vw,16px), 1px)` 把根字級吸附到整數像素，列高（`line-height:1`）因而也是整數像素。
- **fallback**：包在 `@supports (width: round(down,10px,1px))` 裡；不支援就吃前一行的 `clamp()`，可能出現次像素縫，但版面與資訊完全不變。

### (d) 效能實測（本範例站，2026-09-21 建置期量測）

| 項目 | 實測 |
|---|---|
| 單頁大小（含 inline 全部 CSS/JS，未計 Google Fonts） | 24–26 KB／頁（預算 ≤350 KB） |
| 首屏繪圖（像素緩衝 → 字元格 → 屬性段），Node 實測 | 首頁 3 ms／文様頁 10 ms（12 幅）／木の色頁 1 ms／手順頁 2 ms（預算 ≤100 ms） |
| 屬性段（＝ Range）數量 | 首頁 298／文様頁 1,460（12 幅合計）／木の色頁 161／手順頁 178 |
| 開場重畫 | 901 字元 ÷ 1440 cps ≈ **0.63 s**，每幀只更新 1 個 Range |
| 秘密箱的板滑 | 每格重新光柵化一次，2 ms／次 × 2 次，間隔 90 ms |
| 外部資源 | 圖片 0、音檔 0、canvas 0、JS 函式庫 0；僅 Google Fonts 一支 |

**效能上的注意**：Range 的數量與「屬性切換次數」成正比，不是與面積成正比。圖越細碎屬性段越多。若一頁要放十張以上的圖，把單圖控制在 **32 欄 × 12 列以內**，屬性段大約落在 80–300 之間。

---

## 頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>〇〇 ｜ ANSi</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%23000000'/%3E%3Crect x='3' y='4' width='10' height='8' fill='%23FFFF55'/%3E%3C/svg%3E">
<style>
:root{
  --c0:#000000;--c7:#AAAAAA;--c8:#555555;--cE:#FFFF55;--cA:#55FF55;--cF:#FFFFFF;
  --fs:clamp(12px,1.34vw,16px);
  --art:ui-monospace,"DejaVu Sans Mono",Menlo,Consolas,monospace;
  --ui:"M PLUS 1 Code",ui-monospace,Menlo,Consolas,monospace;
}
@supports (width:round(down,10px,1px)){:root{--fs:round(down,clamp(12px,1.34vw,16px),1px)}}
*{margin:0;padding:0;box-sizing:border-box;border-radius:0}
html{font-size:var(--fs);background:var(--c0)}
body{background:var(--c0);color:var(--c7);font-family:var(--ui);font-weight:400;line-height:2}
.scr{max-width:80ch;margin:0 auto;padding:1em .75em 3em}
h1,h2,h3{font-size:1rem;font-weight:400;line-height:2}
h1{color:var(--cE)} h2{color:var(--cA)} h2::before{content:"\2500\2500 ";color:var(--c8)}
strong{font-weight:400;color:var(--cF)}
nav ul{list-style:none;display:flex;flex-wrap:wrap}
nav a{color:var(--c7);background:var(--c0);text-decoration:none;padding:0 1ch}
nav a::before{content:"  ";white-space:pre}
nav a[aria-current]{color:var(--c0);background:var(--c7)}
nav a[aria-current]::before{content:"\25BA ";animation:blk 456ms linear infinite}
pre.art{font-family:var(--art);line-height:1;white-space:pre;letter-spacing:0;
  font-variant-ligatures:none;max-width:100%;overflow-x:auto;margin:0 0 1em}
@keyframes blk{0%,49.9%{color:inherit}50%,100%{color:var(--c0)}}
@view-transition{navigation:auto}
@keyframes scr-out{from{clip-path:inset(0 0 0 0)}to{clip-path:inset(100% 0 0 0)}}
@keyframes scr-in{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
::view-transition-old(root){animation:scr-out 240ms linear both}
::view-transition-new(root){animation:scr-in 240ms linear both}
@media (prefers-reduced-motion:reduce){
  ::view-transition-old(root),::view-transition-new(root){animation:none}
  nav a[aria-current]::before{animation:none}
}
</style>
</head>
<body>
<div class="scr">
  <p style="color:var(--c8)"><span style="color:var(--cE)">▓▒░</span> 屋号 ── 業種</p>
  <nav><ul>
    <li><a href="index.html" aria-current="page">一</a></li>
    <li><a href="b.html">二</a></li>
    <li><a href="c.html">三</a></li>
    <li><a href="d.html">四</a></li>
  </ul></nav>

  <h1>見出し</h1>
  <noscript><p style="color:#FF5555">［ JavaScript が切れています。絵は描かれませんが、内容はすべて本文と表にあります。］</p></noscript>

  <figure>
    <pre class="art" id="a1" role="img" aria-label="絵の内容をことばで書く"></pre>
    <div id="bar"></div>
    <figcaption>題 ─ 作者 ─ 団体 ─ 2026-09 ─ 40 cols</figcaption>
  </figure>

  <h2>本文</h2>
  <p>……</p>
</div>
<script>
/* ① Int8Array の画素緩衝に多角形を塗る → ② 二列を一列の字元格にまとめる（半塊）
   → ③ 同じ属性の連続格を「属性段」にまとめる → ④ Range ＋ Custom Highlight API で色を掛ける */
</script>
</body>
</html>
```

---

## 驗收：三秒辨識測試

把首屏截圖遮掉全部文字。懂設計的人要能在三秒內說出「這是 ANSi／文字模式的畫」。判準：

1. 畫面上找得到明顯的**階梯狀斜邊**（半塊切格的痕跡）嗎？
2. 顏色是不是**十六個定色**、而且**一格一色**、完全沒有漸層？
3. 有沒有**任何一個圓角、陰影、輝光、掃描線**？（有就不合格）
4. 標題跟正文是不是**同一個字級同一個字重**？
5. 每一幅畫下面有沒有**署名列**？

五項全過才算完成。過不了就回去加強視覺特徵，不要加引擎。
