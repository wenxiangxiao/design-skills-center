---
name: crouwel-gridnik-module-type
description: Dutch grid modernism after Wim Crouwel / Total Design (1963–1975) — letters built only from square grid modules with horizontal and vertical strokes and 45° half-module bend cuts, the layout grid printed visibly on white, one signal colour per page.
---

# 格網主義・Crouwel／Total Design 模組字 Gridnik Module Type

> 範例站：方格門牌所 BÛN-PÂI GRID SIGNWORKS（臺中綠川東街，門牌副牌與燈箱字）。本規格書不綁產業：任何「字要被機器做出來」的品牌（招牌、號碼、交通、印刷、電子看板、郵務）都適用。

## 設計哲學

1963 年 Wim Crouwel 與 Benno Wissing、Friso Kramer、Dick 與 Paul Schwarz 在阿姆斯特丹成立 Total Design；1964 年起 Crouwel 為 Stedelijk 市立美術館做海報、目錄與展覽。1967 年的 New Alphabet 是為映像管排字機畫的——機器只畫得出水平與垂直線，他就讓字只有水平與垂直線；1968 年〈Vormgevers〉展海報則把排版格線直接印在紙上。這個流派的兩個信念：

1. **字是格子組成的**——不是先有字形再對齊格子，而是格子本身長成字。
2. **格子要被看見**——網格不是藏在版面背後的工具，它就是畫面的裝飾母題。

延伸：所有尺寸都是一個模組 m 的整數倍；介面上的一切變化都是「格子換位置」，而不是淡入淡出或曲線運動。

## 本風格的 5 個不可省略特徵

拿掉任何一項就不是這個風格。

### ① 印出來的模組格網（版面手法＋裝飾母題）

整頁鋪滿 1px 的方格線，每 5 格一個「+」十字標；文字、圖、按鈕的邊全部落在格線上。格線顏色＝信號色與白的固定混合（全站唯一的淡色），格子大小由容器寬度推出。

```css
.sheet{container-type:inline-size;container-name:sheet}
.in{--cols:48;--m:calc(100cqi / var(--cols));position:relative}
@container sheet (max-width:1100px){.in{--cols:36}}
@container sheet (max-width:760px){.in{--cols:24}}
@container sheet (max-width:520px){.in{--cols:16}}
.grid{position:absolute;inset:0;pointer-events:none;
 background-image:linear-gradient(90deg,var(--line) 1px,transparent 1px),
                  linear-gradient(180deg,var(--line) 1px,transparent 1px);
 background-size:var(--m) var(--m)}
.grid::after{content:"";position:absolute;inset:0;background-size:calc(var(--m)*5) calc(var(--m)*5);
 background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath d='M0 -1.4V1.4M-1.4 0H1.4M10 8.6V11.4M8.6 10H11.4M0 8.6V11.4M-1.4 10H1.4M10 -1.4V1.4M8.6 0H11.4' stroke='%23121212' stroke-width='.18'/%3E%3C/svg%3E")}
```

### ② 字只由整格模組組成：只有橫直，外轉角切半格 45°（形狀語彙）

字身 5 × 9（上伸 2、x 字高 5、下伸 2；數字與漢字高 7）。一筆＝1 格寬。**斜切只發生在「轉彎的外角」**——兩個正交鄰格都空、另兩個都在；筆畫頭尾一律方頭。只靠斜角相碰的兩格不算相連。

```js
// 每一格一個 polygon；k = 0.5（半格）
function pts(set,x,y,k=.5){const h=(a,b)=>set[(x+a)+','+(y+b)];
 const N=h(0,-1),S=h(0,1),W=h(-1,0),E=h(1,0),p=[];
 if(!N&&!W&&E&&S)p.push([x,y+k],[x+k,y]);else p.push([x,y]);
 if(!N&&!E&&W&&S)p.push([x+1-k,y],[x+1,y+k]);else p.push([x+1,y]);
 if(!S&&!E&&W&&N)p.push([x+1,y+1-k],[x+1-k,y+1]);else p.push([x+1,y+1]);
 if(!S&&!W&&E&&N)p.push([x+k,y+1],[x,y+1-k]);else p.push([x,y+1]);
 return p.map(q=>q.join(',')).join(' ');}
```
```svg
<!-- 「7」的上三列：左上不切（筆頭）、右上切（轉角） -->
<svg viewBox="0 0 5 7"><g fill="#121212" stroke="#121212" stroke-width=".035">
<polygon points="0,0 1,0 1,1 0,1"/><polygon points="1,0 2,0 2,1 1,1"/><polygon points="2,0 3,0 3,1 2,1"/><polygon points="3,0 4,0 4,1 3,1"/>
<polygon points="4,0 4.5,0 5,0.5 5,1 4,1"/><polygon points="4,1 5,1 5,2 4,2"/><polygon points="4,2 5,2 5,3 4,3"/></g></svg>
```

### ③ 小寫、單一字重、旗左（字體選擇）

大字一律是格網字，而且只排小寫（大寫會多兩列格子）。內文一種 grotesk（Archivo 400／500／600＋Noto Sans TC），**行高恰好 1m**，旗左不齊右，無斜體、無 700 以上的內文字重。標籤用小寫英文＋座標（a12、c40）。

```css
body{font-family:"Archivo","Noto Sans TC",system-ui,sans-serif;font-weight:400}
p,li,td{font-size:calc(var(--m)*.54);line-height:var(--m)}
.cap{font-size:calc(var(--m)*.42);line-height:var(--m);letter-spacing:.08em;text-transform:lowercase;font-weight:500}
```

### ④ 白底＋墨＋每頁一個信號色（色彩規則）

紙白 `#F6F6F2` 為地、墨 `#121212` 為字；每一頁只准一個純信號色（不調淡、不漸層、不陰影、不發光），格線用它的固定淡版。換頁＝換信號色。

```css
:root{--paper:#F6F6F2;--ink:#121212;--spot:#E4007C;--line:#F5C0DC}
body.p-plate{--spot:#1C4FA0;--line:#C6D3E7}
body.p-signs{--spot:#00A39A;--line:#BFE8E5}
body.p-about{--spot:#D8E600;--line:#E9EF9A}
```

### ⑤ 座標與墨帶（裝飾母題＋資訊層級）

區塊標題是一條 1m 高的墨帶，左端寫該區塊在格網上的座標；現用頁、選取態以「一格信號色方塊」表示。沒有卡片、沒有圓角、沒有陰影，分隔只有墨帶與 2px 內框。

```css
.band{background:var(--ink);color:var(--paper);height:var(--m);display:flex;align-items:center;gap:var(--m);padding:0 var(--m)}
.coord{background:var(--spot);color:#fff;font-weight:500;font-size:calc(var(--m)*.38);line-height:calc(var(--m)*.62);padding:0 .35em}
.box{box-shadow:inset 0 0 0 2px var(--ink)} /* 用 inset 才不會多出 2px 破壞行格 */
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 紙白 | `#F6F6F2` | 地色 | ~70% |
| 墨 | `#121212` | 內文、墨帶、內框、導覽 | ~18% |
| 洋紅（首頁） | `#E4007C` | 店名、座標、現用格 | ≤8% |
| 門牌藍（排一塊） | `#1C4FA0` | 琺瑯牌面、現用格 | ≤8% |
| 青綠（燈箱字） | `#00A39A` | 夜間燈色、步驟編號 | ≤8% |
| 萊姆（本所） | `#D8E600` | 座標、標題馬賽克（配墨字） | ≤8% |
| 格線淡版 | 各頁 `--line` | 1px 格線、掃描列 | 線條 |
| 灰 | `#8C8C86` | 導覽英文副標 | 極少 |

規則：一頁一信號色；全站唯一的淡色是格線；零漸層（格線的硬停 linear-gradient 除外）、零陰影、零發光、零透明疊色（掃描列以 multiply 疊同一個 --line，不算新色）。

## 字體系統

- 格網字：自繪 5×9 模組，49 字（0–9、a–z、中川三田工日山王口十土上門）＋「- : .」。大小一律是 m 的整數倍或 1/2 倍。
- 內文：Google Fonts `Archivo` 400/500/600，中文 `Noto Sans TC` 400/500/700。
- 字級（以 m 為單位）：導語 .74m／行高 1.5m；h2 1.08m／2m；h3 .62m／1m；內文 .54m／1m；標籤 .42m／1m。
- 不准：大寫格網字、斜體、置中段落、對齊字距調整（justify）。

## 版面與網格

- 容器查詢推出模組：≥1100px 48 欄、760–1100 36 欄、520–760 24 欄、<520 16 欄（m ≈ 22–32px）。
- 版心左側留 6m（4m 是導覽尺），右側 2m；區塊之間 2m 空格。
- 欄寬用 `grid-template-columns:repeat(auto-fill,var(--m))`＋`span n`；所有高度用 m 的倍數，邊框一律 inset box-shadow。
- 非對稱：主欄 20–24 格、副欄 12–14 格、中間空 1 格；零旋轉。

## 元件配方

- **導覽（座標尺）**：左側 4m 寬固定尺，四頁是四列（01 首頁／02 排一塊／03 燈箱字／04 本所），每列 3m 高；現用頁一格 .5m 信號色方塊（`view-transition-name:here`，換頁時沿尺垂直移動）。≤760px 落為底部 4 等分 dock。
- **按鈕**：高 1m、墨底紙字、hover 換信號色；次要按鈕為 2px inset 墨框。零圓角。
- **卡片**：不做卡片。用「墨帶標題＋表格」或「2px 內框盒」。
- **表單**：輸入框高 1.5m、2px inset 墨框、零圓角；單選用原生 radio＋accent-color 墨。5×7 自刻格：35 個 1m 方格按鈕，按下填墨，違規（斜角相碰）填洋紅。
- **表格**：每列 1m、下緣 1px 格線色；數字欄 tabular-nums 右齊。
- **footer**：上緣 2px 墨線、四欄資訊、全部小字。

## 動效規則

全部動效只准「沿格線、一格一格」：水平或垂直、`steps()` 或到位即停；不准淡入、不准曲線路徑、不准縮放彈跳。

| 種類 | 本站自製實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 掃描列：一列 1m 高的格線色帶以 `steps(24)` 每秒往下跳一格（New Alphabet 是為映像管畫的字）；首頁時間門牌每分鐘換字 | 時間 | 24s 循環、steps(24) | 隱藏掃描列；時間門牌仍更新，但直接換字 |
| input 輸入 | 游標吸附：滑鼠所在格出現 2px 墨框並報座標（k12）；字樣牆 hover 即在檢視器重排該字 | pointermove／hover／focus | 即時（<16ms） | 照常（使用者自己在動） |
| transition 轉場 | 跨文件 `@view-transition`：新頁由左至右以 `steps(6)` 切入、導覽方塊沿尺移動；不支援時 12 欄信號色帷幕 `steps(4)` 蓋下；同頁狀態（材質、顏色、開燈）走 `startViewTransition` | 換頁、切換 | 360ms steps(6)／300ms steps(5) | 直接換頁、直接換狀態 |
| signature 簽名 | **模組搬家**：換字時同一批格子不重畫——逐一配對到曼哈頓距離最近的新位置，沿 L 形路徑（先橫後直）走過去；多出的往左出格、不夠的從右緣進格 | 改字、換時間、看年表 | 160ms＋26ms／格（上限 900ms），cubic-bezier(.7,0,.3,1)，逐格延遲 9ms | 直接到位 |

### motion-library 元件表（PLAYBOOK §2.8；版本 1.25.0 @9b3a7ba8）

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 角色 |
|---|---|---|---|---|---|
| 首頁 | BG-B-10 | Grid Zoom | primary `#E4007C`、secondary `#121212`、bg `#F6F6F2`、duration 6、loop、density 1、intensity 1、seed 1962、16:9 | 〈一格是多大〉旁：同一張格在三層之間無限縮放，說明「換材質＝換格的實際尺寸」；元件只畫正交格線與一點，與特徵①同構 | ambient |
| 首頁 | SHP-32 | Stairs Rise | primary＝secondary＝`#E4007C`、bg `#F6F6F2`、duration 1.6、loop:false、seed 3、1:1 | 〈三種門牌〉旁：七根直角色柱一階一階升起＝尺寸由小到大；只有 fillRect、零圓角 | transition（進視窗播一次） |
| 排一塊 | SHP-12 | Split & Merge | primary `#1C4FA0`、secondary `#121212`、bg `#F6F6F2`、duration 1.4、loop、seed 38、1:1 | 工期旁的「打樣中」：四個正方模組分開又合起；每次改材質或字數就重播 | input（重播）＋ambient |
| 燈箱字 | TXT-A-33 | Slice Text | text「燈箱字」、primary `#00A39A`、secondary `#121212`、bg `#F6F6F2`、duration 1.3、loop:false、seed 5、16:9 | 頁標：字被切成六條水平帶左右滑入——像燈條一排一排接上；只有水平位移 | transition（一次） |
| 本所 | TXT-B-38 | Text Mosaic | text「本所 1962」、primary `#D8E600`、secondary `#121212`、bg `#F6F6F2`、duration 1.6、loop:false、seed 21、16:9 | 頁標：字先被量化成大方格再逐步變細＝「字由格子組成」的反向演示 | transition（一次） |

掛載方式：子集由 `tools/ml-embed.js` 產生並 inline 為每頁第一個 `<script>`；`BP.ml()` 等 `document.fonts.ready` 才掛、離屏 `destroy()`、回視窗重掛、一次性元件之後直接 `seek(1)`；canvas `aria-hidden`；容器內 `.ml-fb` 保留原 HTML 標題，掛載成功才視覺隱藏；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。開發 Prompt 出處：`MotionLib.prompt(id)`。不選用的理由：BG-A-30／SHP-30／SHP-14 用 `rr()` 圓角、TXT-A-31 用 `shadowBlur`、BG-A-13 用漸層帶——都違反特徵②④。

## 插畫與圖像風格

本流派沒有插畫。需要「圖」的地方只有三種：格網字本身（店名、號碼、年份）、由 1×1 模組矩形組成的示意圖（地圖的街道是 1 格寬的墨條、河是 1 格寬的青綠條），以及實際尺寸的牌面預覽。禁止照片、圖示庫、手繪線條、曲線。

## Logo 與 Favicon 設計指南

Logo＝11 × 11 格的門牌：門牌藍底、四角各切 1 格、0.18 格白框、中間 7 × 7 的格網字「門」。favicon 用同一份 SVG 的 data URI。不加字標、不加陰影、不改圓角。

## Do & Don't

**Do**：讓格線可見；所有尺寸取 m 的倍數；每頁只用一個信號色；字只用小寫格網字；轉場用 steps。
**Don't**：圓角、斜筆、曲線、漸層、陰影、發光、淡入淡出、置中大標＋兩顆按鈕＋三張卡片、紫藍漸層、emoji icon、Lorem ipsum、「EST. 19xx」徽章；不要把格網字當 logo 字體「套用」在任意字形上——字必須在格上重畫。

## 頁面骨架範例

```html
<body class="p-plate"><div class="sheet"><div class="in">
 <div class="grid" aria-hidden="true"></div><div class="scan" aria-hidden="true"></div>
 <nav class="rail"><ol><li><a href="index.html"><span class="n">01</span><span class="l">首頁</span><i class="sq"></i></a></li>…</ol></nav>
 <main class="wrap">
  <div class="row"><p class="s20 cap"><span class="coord">c3</span> 排一塊 make a plate</p></div>
  <h1 aria-label="plate"><svg class="gw gw-m" viewBox="0 0 26 9" style="--w:26;--h:9">…polygons…</svg></h1>
  <div class="band"><span class="cap">c40</span><h2 class="cap">估價 estimate</h2></div>
  <table>…</table>
 </main>
</div></div></body>
```

## 技術實作與相容性

| 技術 | 本站承載 | 支援現況（查證日 2026-10-30） | fallback |
|---|---|---|---|
| container query units（`cqi`）＋ container queries | 特徵①：整站唯一單位 `--m = 100cqi / --cols`，欄數由 `@container` 切換 | caniuse〈Container query length units〉：Chrome／Edge 105+、Firefox 110+、Safari 16+，全球約 96% | 無容器時 cqi 依規格退回小視窗單位 svi，版面仍成立 |
| View Transitions API（同文件 `startViewTransition`＋跨文件 `@view-transition{navigation:auto}`） | transition：換頁 steps 切入、導覽方塊沿尺移動；同頁換材質／開燈 | web.dev 2025-10-16：同文件 VT 在 Firefox 144 後成為 Baseline Newly available；caniuse〈View Transitions (cross-document)〉：Chrome／Edge 126+、Safari 18.2+，Firefox 144 起為 partial | 以 `'CSSViewTransitionRule' in window` 判定；不支援跨文件時 JS 以 12 欄帷幕 steps 蓋下再換頁；無 `startViewTransition` 時直接換狀態 |
| URL 狀態序列化（URLSearchParams＋BigInt base36） | 〈排一塊〉：號碼、小字、材質、顏色、取件與 35 bit 自刻字寫進 `?n=&a=&m=&c=&i=&g=`，同一連結永遠排出同一塊牌 | URLSearchParams、`history.replaceState`、BigInt 皆為 Baseline Widely available | 舊瀏覽器無 BigInt 時自刻字不寫入網址，其餘照常 |
| 自寫「模組搬家」配對器＋斜切規則（Web Animations API） | signature 與全部格網字 | WAAPI `element.animate` Baseline Widely available | 無 WAAPI 時字直接到位 |

效能實測（Node 22 ＋ jsdom，無 GPU；以腳本計時代替真瀏覽器）：每頁約 271–282 KB（其中 motion-library 子集 226 KB）；`G.layout`＋`G.match` 排一個 8 字門牌（約 120 格）配對每次約 0.04 ms；首頁站內腳本（建字樣牆 49 個 SVG＋時間門牌）於 jsdom 執行約 49 ms、motion-library 子集載入約 4 ms。同一畫面同時運轉的 canvas 元件 ≤ 2 個。
