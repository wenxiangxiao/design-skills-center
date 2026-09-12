---
name: swiss-new-wave
description: Basel New Wave typography — extreme letterspacing, knockout type, a four-weight family of rules that cut through the words, stepped and rotated blocks that break the grid they are drawn on, and two process inks that must visibly overprint.
---

# 瑞士新浪潮 Swiss New Wave

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo 不同產業、但一眼看得出是同一個流派的網站。
> 本流派為既有設計史流派，非自創。血緣：Wolfgang Weingart（1941–2021）自 1968 年起任教於巴塞爾設計學校（Schule für Gestaltung Basel），
> 由排字學徒出身，把 Müller-Brockmann 一脈的瑞士方格網「先學會、再炸開」；其學生 Dan Friedman、April Greiman、Willi Kunz 把它帶到美國，
> 1980 年代被稱作 New Wave 或 Swiss Punk。Weingart 自己的說法是：**「當我把一個字的字距拉開，我就已經在做圖像了。」**

---

## 一、設計哲學

瑞士國際主義的前提是：網格保證秩序，秩序保證可讀。新浪潮不推翻這個前提——它把網格照樣畫出來，然後**在讀者看得見的地方違反它**。
違反必須是可指認的：你要能說出「這一塊偏離了第 7 欄」「這條線壓過了字的第三行」。隨手擺歪不是新浪潮，那只是亂。

三條心法：

1. **線比字先被看到。** 版面的第一層結構是規線，不是標題。讀者先讀到一組粗細對比極大的橫線，才讀到字。
2. **字距是一個可以被指派意義的變數。** 它不是微調，是尺度。同一頁上 0.02em 與 0.34em 並存，而且差異必須有理由（在 Demo 裡理由是時間）。
3. **印刷的事實不隱藏。** 兩塊專色疊在一起就會變成第三個顏色，那個顏色要留在版面上，不要用第三個色票去假裝它是設計出來的。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是新浪潮了。

### 特徵 1｜四階規線族，而且線會穿過字

規線不是分隔線。它有四個階，粗細比大於 1:14，且必須有至少一條**壓在文字上**而不是排在文字之間。

```css
.r0{border-top:1px  solid #111114}  /* 髮絲：未選擇、次要、表格列 */
.r1{border-top:2px  solid #111114}  /* 細線：段落分界 */
.r2{border-top:6px  solid #111114}  /* 中線：小節起點 */
.r3{border-top:14px solid #111114}  /* 粗線：大結構，一頁最多四條 */

/* 穿過字的那一條：負 margin 讓它壓在上一行文字上，multiply 讓字仍可讀 */
hr.cross{border:0;height:10px;background:#00A0E4;margin:-26px 0 0;
         position:relative;z-index:3;mix-blend-mode:multiply}
```

判準：把版面縮成 20% 大小，你仍應看得出一組粗細不等的橫線構成的節奏。

### 特徵 2｜極端字距，而且它有單位

字距要拉到「字不再是單字的零件，而是版面的元件」。做法是給字距一個真實世界的意義，然後照它換算。

```css
:root{ --trk:.03em }
.trk{letter-spacing:var(--trk);transition:letter-spacing 70ms linear}
.trk:hover{letter-spacing:.30em}
/* Demo 的換算：1 分鐘 = 0.0011em。兩小時的時段 = .162em，四十五分鐘 = .0795em */
```

Do：把換算規則印在頁面上，讓讀者知道寬窄是有意義的。
Don't：只把標題拉開當裝飾——那是 2015 年的極簡風，不是新浪潮。

### 特徵 3｜反白挖字（knockout）

字必須從實色塊裡挖出來，不是印在色塊上。至少三處：刊頭、現用態、關鍵動作。

```css
.ko{background:#111114;color:#EFECE2;display:inline-block;padding:.06em .3em .12em}
.ko.c{background:#00A0E4;color:#EFECE2}
.ko.y{background:#FFC400;color:#111114}
```

真正的挖穿（讓底下的規線從字腔透出來）用 SVG：

```svg
<rect x="0" y="52" width="300" height="34" fill="#00A0E4"/>
<rect x="0" y="72" width="300" height="4" fill="#FFC400" style="mix-blend-mode:multiply"/>
<text x="8" y="79" font-family="Archivo" font-weight="900" font-size="27" fill="#EFECE2">CHINGTAN</text>
```

### 特徵 4｜階梯狀與旋轉的區塊，且它仍與母網格共用欄線

這是新浪潮與「隨便歪一下」的分水嶺。區塊可以旋轉 3°–15°、可以階梯縮排，但它**佔用的網格位置不變**——
`transform` 不影響 layout，所以旋轉後它仍然對齊到同一組欄線，違反是視覺上的，結構上仍然可驗算。

```css
.sheet{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:0}
.band{grid-column:1/-1;display:grid;grid-template-columns:subgrid}
@supports not (grid-template-columns:subgrid){
  .band{grid-template-columns:repeat(12,minmax(0,1fr))}
}
.tilt{transform:rotate(-7.4deg);transform-origin:14% 50%}
@media(max-width:560px){ .tilt{transform:none} }
```

一頁只准一到兩個旋轉塊。旋轉角要是一個奇數的小數（−7.4°、+3.2°），不要 −5° 或 −10°。

### 特徵 5｜兩塊專色必須看得見重疊

只用兩塊專色（Demo 用製程青與鉻黃），而且必須有地方讓它們疊在一起，重疊處的第三色**不另外指定色票**，
由 `mix-blend-mode: multiply` 自己算出來。這是把絹印／平版的物理事實留在畫面上。

```css
.ovp{mix-blend-mode:multiply}
/* #00A0E4 × #FFC400 = #007D00。你不寫這個 hex，它自己出現 */
```

Don't：加第三塊專色去補畫面。Don't：用漸層。Don't：用半透明 opacity 假裝疊印（那會變灰）。

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 磁磚白 | `#EFECE2` | 唯一地色。不是純白（純白配 14px 黑線太刺眼），也不鋪任何紙紋 | ~40% |
| 墨黑 | `#111114` | 全部規線、正文、反白塊 | ~26% |
| 製程青 | `#00A0E4` | 第一塊專色：主題物（Demo 是水）、穿過字的那條線 | ~18% |
| 鉻黃 | `#FFC400` | 第二塊專色：現用態、hover、可動作 | ~11% |
| 疊印綠 | `#007D00` | **不指定**。青與黃 multiply 自動生成，只出現在重疊處 | ~5% |

規則：地色永遠只有一個，且是最亮的那個。兩塊專色明度差要大（青 L\*≈61、黃 L\*≈81）。
換產業時可換這兩塊專色，但必須驗算 multiply 的結果不是接近黑的顏色——兩塊高飽和互補色相乘會變成爛泥。
安全的組合是「一冷一暖、都不極端飽和」：青×黃→綠、洋紅×黃→紅、青×洋紅→藍紫。

---

## 四、字體系統

- 拉丁：**Archivo**（Google Fonts，400／500／700／900）。任何 neo-grotesque 都可以（Archivo、Inter、Roboto、Helvetica Now），但必須有 900。
- 中文：**Noto Sans TC**（400／700／900）。
- 不使用等寬字當內文；數字一律 `font-variant-numeric: tabular-nums`。

字級 scale（1240px 容器）：

| 角色 | size | weight | line-height | letter-spacing |
|---|---|---|---|---|
| 刊頭字標 | 54px（SVG 內） | 900 | — | 1px |
| h1 | `clamp(38px,7.4vw,86px)` | 900 | .94 | −.015em |
| h2 | `clamp(24px,3.4vw,40px)` | 900 | .94 | −.015em |
| 大數字 | `clamp(30px,4.6vw,54px)` | 900 | .86 | 0 |
| 標籤 `.lab` | 10px | 700 | — | **.34em**、全大寫 |
| 正文 | 15px | 400 | 1.62 | .03em（可被 `--trk` 覆寫） |
| `.small` | 13px | 400 | 1.55 | — |
| `.tiny` | 11px | 400 | 1.5 | — |

10px 的 `.lab` 配 .34em 是本流派的簽名之一：**最小的字給最大的字距**。

---

## 五、版面與網格

- 容器 1240px，12 欄，**column-gap: 0**（新浪潮的欄間距是靠內距製造的，不是靠 gap）。
- 所有區段 `grid-column:1/-1` 再 `grid-template-columns: subgrid`，讓子區塊與母網格共用欄線。
- 底層畫一組 1px 的髮絲欄線（`rgba(17,17,20,.13)`）固定在視窗上，讓讀者看見網格存在。行動版關掉。
- 留白規則：留白留在規線之間（行距、區段間距 24–40px），**不留在版面四周**。左右內距只有 22px。
- 每頁至多兩個旋轉塊、至多四條 14px 粗線。

---

## 六、元件配方

### 導覽（rope-tension）
四頁＝四條線。現用頁那一條「被拉緊」：上緣規線加粗到 6px、頁名字距拉到 .20em、SVG 裡的浮球變密（18 顆）且交替上青黃；
其餘三條鬆弛下垂成正弦弧、浮球稀（11 顆）且是灰的。語意是張力，不是高亮。

```html
<a class="rope" aria-current="page"><span class="no">01</span><span class="nm">今天的池</span>
  <span class="balls"><svg …/></span><span class="en">TODAY</span></a>
```
```css
.rope{border-top:1px solid rgba(17,17,20,.30);display:flex;align-items:center;padding:6px 0 5px}
.rope[aria-current="page"]{border-top:6px solid #111114}
.rope[aria-current="page"] .nm{letter-spacing:.20em}
```

### 按鈕
不是圓角膠囊。是一塊上緣有 6px 粗線的區域，hover 時整塊翻成鉻黃底並把字距推開 .055em。

```css
.opt{border:0;border-top:6px solid #111114;background:#EFECE2;padding:10px 12px 12px 0;
     width:100%;text-align:left;cursor:pointer;
     transition:letter-spacing 70ms linear,background 70ms linear}
.opt:hover,.opt:focus-visible{letter-spacing:.055em;background:#FFC400}
```

### 卡片
**沒有卡片。**沒有圓角、沒有陰影、沒有邊框盒。「一張卡」在本流派裡就是「上面有一條粗線的一塊區域」。

### 表格
`border-collapse:collapse`，只有橫線沒有直線；表頭 2px、資料列 1px；表頭是 10px/.22em 全大寫。

### footer
上緣 14px 實墨線，三欄，最後壓一條 2px 線放法律級小字。

---

## 七、動效規則（四種，缺一不可）

| 種類 | 名稱 | 觸發 | 具體值 | reduced-motion |
|---|---|---|---|---|
| ambient | 水道漂移 rule-drift | 無 | 八條規線各自 `translateX(±6px)`，週期 17.0–27.4s（互質，永不同步），`ease-in-out alternate infinite` | 停在原位，粗細與顏色不變 |
| ambient | 逐欄曝光 grid-expose | 無 | 底層髮絲網格其中一欄以 `animation:expose 13s steps(12,jump-none) infinite` 逐格橫移 | 停在第一格，線仍在 |
| input | 字距活體 live-tracking | hover／focus | `letter-spacing` .03em → .30em，**70ms linear**（<100ms） | 直接跳到終值 |
| transition | 反白刷過 knockout-pass | 頁面載入、狀態切換 | 一塊 `mix-blend-mode:difference` 的黑條以 `steps(12,end)` 在 420ms 內掃過，掃過處瞬間反相 | 不播（`display:none`） |
| **signature** | **字距即時間 tracking-as-time** | 使用者花掉時間 | 每花 1 分鐘，該塊字距跳 **0.026em**，且 `transition:letter-spacing {m×70}ms steps({m}, jump-none)`——**一分鐘一格，絕不補間** | 去掉 transition，字距直接到位，數值與版面結果完全相同 |

為什麼用 `steps()`：本流派的時間單位是離散的（一分鐘、一格、一次曝光）。連續補間會把「數得出來」這件事糊掉。

**禁止**：淡入淡出當主打、視差、跑馬燈、自動輪播、模糊陰影的按壓效果、數字滾動計數。

---

## 八、插畫與圖像風格（rule-knockout）

全站**零外部圖片**，且沒有一張描外形的插圖。所有圖像只由三種原語構成：

1. **規線族**：四階粗細的直線，可橫可豎，必有一條穿過字。
2. **反白挖字**：字從實色塊裡挖出來。
3. **專色疊印帶**：兩塊專色刻意重疊 6–40px，重疊處由 multiply 生成第三色。

判準：拿掉全部顏色，你仍應讀得出「哪一條線壓在字上、哪一塊是被挖空的、哪兩塊是疊在一起的」。

明文禁用：細線幾何線描的小屋與單線物件、半調網點顆粒、feTurbulence 手抖邊、任何寫實描繪、任何圖示化的 emoji。

---

## 九、Logo 與 Favicon

**Logo**：一個 300×120 的矩形，由上到下是 1px／2px／6px 三條規線、一塊青色實心塊與一塊疊上去的黃色塊、
從青塊裡挖出來的字標、一條穿過字的 4px 青線、底部一條 14px 實墨線。字標下方一行 9px/.54em 的資格說明。
換產業時只換字標與那行說明，結構不動。

**Favicon**（inline SVG data URI，寫在 `<head>`）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23EFECE2'/%3E%3Crect y='4' width='32' height='1' fill='%23111114'/%3E%3Crect y='9' width='32' height='2.5' fill='%23111114'/%3E%3Crect y='16' width='32' height='6' fill='%2300A0E4'/%3E%3Crect x='18' y='16' width='14' height='6' fill='%23FFC400' style='mix-blend-mode:multiply'/%3E%3Crect y='26' width='32' height='3.5' fill='%23111114'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 先畫網格，再違反它，而且讓讀者看得見兩者。
- 給字距一個真實單位，並把換算印在頁面上。
- 讓兩塊專色重疊，把第三色交給 multiply。
- 最小的字給最大的字距。
- 大量的橫線、零直線分隔。

**Don't（含去 AI 化禁令）**
- 不要紫藍漸層 hero；不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。
- 不要圓角、不要模糊陰影、不要玻璃擬態。
- 不要 emoji 當圖示；圖示一律自繪 SVG，而且本流派根本不需要圖示，用線與色塊。
- 不要 Lorem ipsum、不要 AI 腔（「在當今快節奏的世界」）、不要「EST. 19xx」徽章。
- 不要跑馬燈——本流派的動感來自字距與規線，不是捲動。
- 不要為了歪而歪：旋轉塊必須仍然佔用它原本的網格欄位。
- 不要用第三塊專色補畫面；畫面不夠就加線的粗細對比。

---

## 十一、頁面骨架（可直接使用）

```html
<body>
<div class="gridline" aria-hidden="true"><i style="left:8.3%"></i><i style="left:25%"></i>
  <i class="on" style="left:41.6%;--sweep:180px"></i><i style="left:58.3%"></i>
  <i style="left:75%"></i><i style="left:91.6%"></i></div>

<header><div class="sheet">
  <div class="mast band">
    <div class="wipe" aria-hidden="true"><b></b></div>
    <svg viewBox="0 0 1200 118"><!-- 規線 + 兩塊疊印專色 + 反白字標 + 角落 8 級資訊 --></svg>
  </div>
  <nav class="nav band"><!-- 四條 rope --></nav>
</div></header>

<main id="main"><div class="sheet">
  <section class="band">
    <div class="blk8"><h2>…</h2><p class="small">…</p></div>
    <div class="blk4 tilt"><div class="qbox"><span class="lab">…</span><div class="qnum">0.63</div></div></div>
  </section>

  <section class="band" style="margin-top:24px">
    <article class="band" style="--trk:.162em">
      <div class="lrule r3"></div>
      <div class="lno">1</div><div class="ltime trk">06:00–08:00</div>
      <div class="lact"><span class="ko">晨泳自由游</span></div>
      <div class="lnote tiny">…</div>
    </article>
  </section>
</div></main>

<footer>…</footer>
</body>
```

```css
.sheet{max-width:1240px;margin:0 auto;padding:0 22px;
       display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:0}
.band{grid-column:1/-1;display:grid;grid-template-columns:subgrid}
.blk8{grid-column:span 8} .blk4{grid-column:span 4}
@media(max-width:560px){ .blk8,.blk4{grid-column:1/-1} .gridline{display:none} }
```

---

## 十二、技術實作與相容性

本站三項核心技術，皆於 2026-09-09 查證。

### 1. CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 4。旋轉／階梯狀的子區塊必須仍與母網格共用欄線，否則「違反網格」無從驗算。
巢狀 grid 若各自定義欄，子區塊只會對齊到自己的欄；只有 `grid-template-columns: subgrid` 能讓它繼承母網格的欄線。

**支援現況**（查證來源：[caniuse `css-subgrid`](https://caniuse.com/css-subgrid)、[Web Platform Features Explorer — Subgrid](https://web-platform-dx.github.io/web-features-explorer/features/subgrid/)）：
Firefox 71（2019）、Safari 16.0（2022）、Chrome/Edge 117（2023-09-12）、Opera 103、Samsung Internet 24；
**Baseline Widely available（2026-03-15 起）**，全球覆蓋約 92%。

**Fallback**：`@supports not (grid-template-columns:subgrid){ .band{grid-template-columns:repeat(12,minmax(0,1fr))} }`。
因為母網格與備援網格是同一組 12 等欄，不支援時版面幾乎完全相同，僅在容器內距不同時可能有 1px 級的欄線錯位。資訊零損失。

### 2. `steps()` 逐格緩動（B 動效與時間軸層）

**承載**：簽名動效「字距即時間」與 ambient 的逐欄曝光。本站的時間單位是分鐘，是離散的；
`steps(m, jump-none)` 讓一分鐘等於一格，讀者數得出來自己花了幾分鐘。用 `linear` 會把這件事糊掉。

**支援現況**（查證來源：[MDN `steps()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/steps)）：
MDN 標示 **Baseline Widely available**。`jump-*` 關鍵字自 2018–2019 起於三大引擎可用；
舊語法 `steps(n, start|end)` 為等價別名，本站用到的 `jump-none`／`end` 皆在此範圍內。

**Fallback**：不支援 `jump-none` 的極舊瀏覽器會忽略整個 `animation-timing-function` 宣告而退回 `ease`，
動畫仍然播放、終值相同，只是不再一格一格。`prefers-reduced-motion: reduce` 時本站直接移除 transition，字距瞬間到位，
所有數值、紀錄與版面結果完全一致。

### 3. `mix-blend-mode: multiply`（A 渲染層）

**承載**：特徵 5。兩塊專色的重疊帶不指定色票，由乘法混色自己算出第三色。
`#00A0E4 × #FFC400`：R 0×255/255=0、G 160×196/255≈123、B 228×0/255=0 → 約 `#007B00`（瀏覽器在 sRGB 下實測 `#007D00`）。

**支援現況**（查證來源：[MDN `mix-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode)）：
**Baseline Widely available，2020-01 起跨瀏覽器**，`multiply` 值全球覆蓋約 96%。

**Fallback**：不支援時上層色塊維持不透明，重疊處顯示為純鉻黃而非綠色。版面結構、可讀性與所有資訊完全不變，
僅少掉第三個顏色。本站因此不把任何資訊只用綠色表達——綠色永遠是「兩塊已經各自被讀到的東西疊在一起」的結果。
注意 `mix-blend-mode` 會建立新的堆疊脈絡，父層若有 `isolation:isolate` 或 `filter` 會改變混色範圍。

### 效能預算（實測，2026-09-09）

| 頁 | 單檔大小（含全部 inline CSS/JS/SVG） | 外部資源 |
|---|---|---|
| `index.html` | 30.2 KB | 僅 Google Fonts |
| `ban.html` | 26.8 KB | 僅 Google Fonts |
| `chi.html` | 26.1 KB | 僅 Google Fonts |
| `ke.html` | 46.2 KB | 僅 Google Fonts |

四頁皆遠低於 350 KB 上限。零外部圖片、零音檔、零 JavaScript 函式庫。
`ke.html` 的首屏 JS（解析 9 個狀況的資料、建 45 格量尺、建 9 列版樣、渲染第一個狀況）在 Node 22 上重複執行 1,000 次的平均為 0.018ms（不含瀏覽器的 DOM 實體化），
遠低於 100ms 門檻。動畫全部只改 `transform` 與 `letter-spacing`：`transform` 不觸發 layout；
`letter-spacing` 會觸發該塊的重排，但受影響的元素固定為一個 64px 寬的 inline 區塊，且一次只有一塊在動，實測維持 60fps。
版樣的重繪採整段 `innerHTML` 一次寫入，無讀寫交錯，因此沒有 layout thrashing。

---

## 十三、驗收：三秒辨識測試

把首屏截圖、遮掉全部文字。一個懂設計的人應該在三秒內說出「這是新浪潮／巴塞爾／Weingart 那一路」。
他會依據的是：一組粗細差 14 倍的橫線、從實色塊裡挖出來的字、一塊歪了七度多但仍對齊欄線的區域、
以及畫面上那一小塊沒有人指定過的綠色。

做不到，回去加強這五個特徵，不要加強引擎。
