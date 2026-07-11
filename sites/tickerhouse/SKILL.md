---
name: retro-terminal-style
description: Build retro CRT terminal-styled websites with phosphor green/amber palettes, monospace type, ASCII panel borders, scanline overlays, typewriter animations, and canvas-drawn financial charts.
---

# 復古終端機風格（Retro Terminal / CRT Style）

本技能檔以 TickerHouse 示範站為藍本，完整記錄「1980 年代 CRT 磷光終端機」
網頁風格的可重現規格。任何 AI 或設計師只憑本檔即可重建同樣質感的網站。

---

## 1. 設計哲學

- **內容即介面**：整個頁面假裝是一台開著的終端機。導覽是指令、標題是輸出、
  按鈕是鍵盤按鍵提示。文案要像老練操作員打出來的：短、乾、帶點自嘲，
  絕不用行銷腔（禁止 "unlock your potential"、"seamless" 這類詞）。
- **單色發光層級**：不用色塊區分層級，而用「亮度」——最亮的磷光綠是焦點，
  暗綠是輔助資訊，琥珀色專門留給「系統標籤、警示、可按的東西」。
  就像真 CRT：重要的東西比較亮，不是比較彩色。
- **粗糙是特徵**：1px 實線框、點狀分隔線、方塊游標、硬切換的 steps() 動畫。
  不要圓角超過 0、不要柔和陰影、不要 ease-in-out 的滑順感——
  所有動效都應該有「數位的顆粒感」。
- **誠實的假資料**：demo 資料一律虛構，並在頁腳與文案中明白聲明。
  這本身就是風格的一部分（終端機文化重視 disclosure）。

## 2. 色彩系統（hex）

| 變數 | 值 | 用途 |
|------|-----|------|
| `--bg` | `#040703` | 頁面底色（近黑、極微綠偏） |
| `--panel` | `#060c07` | 面板底色 |
| `--panel2` | `#081108` | 面板 hover / 選中底 |
| `--green` | `#37ff70` | 磷光綠主色：標題、焦點數字、上漲 |
| `--green-dim` | `#1e9c4d` | 暗綠：邊角符號、次要框線 |
| `--ink` | `#9fe8b4` | 內文（柔化的綠白，不用純白） |
| `--ink-dim` | `#5a9a6e` | 次要文字、時間戳 |
| `--grid` | `#16452b` | 框線、表頭底線、分隔 |
| `--amber` | `#ffb000` | 琥珀輔色：面板標題、按鈕、警示、系統標籤 |
| `--amber-dim` | `#8f6a12` | 琥珀框線 / 按鍵編號 |
| `--red` | `#ff5b45` | 下跌 / 錯誤（帶橘的紅，避免純 #f00） |

發光：`--glow: 0 0 8px rgba(55,255,112,.35)`、`--glow-a: 0 0 8px rgba(255,176,0,.35)`。
規則：**綠是內容、琥珀是系統、紅只給負值**。純白、藍、紫一律禁用。

## 3. 字體系統

- 全站唯一字族：`"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`
  （Google Fonts 載入 400 / 500 / 700 三個字重；JetBrains Mono 可互換）。
- 字階（桌面）：內文 15px / 行高 1.55；表格 13px；表頭與標籤 11–12px
  加 `letter-spacing:.12em ~ .18em`；面板數字 22px/700；
  H1 用 `clamp(22px, 3.4vw, 32px)`，首頁 hero 可到 `clamp(26px,4.6vw,46px)`。
- 大寫用於：導覽、面板標題、表頭、按鈕、狀態標籤。內文維持正常大小寫。
- 重點文字加 `text-shadow: var(--glow)` 模擬磷光暈開；小字（<13px）不加，會糊。

## 4. 版面與網格

- 主欄 `max-width:1180px; margin:0 auto; padding:26px 22px`。
- 由上而下固定順序：**跑馬燈（36px canvas）→ header（logo+導覽+狀態列）→
  pagehead（假指令列 + H1 + 一行說明）→ 面板區 → footer**。三頁共用 header/footer。
- 面板網格：`display:grid; gap:18px`，欄數 c2/c3/c4；
  斷點 920px（c4→2 欄、c3/c2→1 欄）、560px（全部單欄、隱藏 header 狀態列、
  字級降 1px）。
- 區塊分隔優先用 `border-bottom:1px dashed var(--grid)`，不用留白堆疊。

## 5. 元件配方

### 5.1 跑馬燈（ticker tape）
- 置頂 `<canvas height="36">`，寬度 100%，下緣 1px `--grid` 框線。
- 資料為 `[代號, 價格, 漲跌%]` 陣列；繪製格式
  `SYM 412.88 +3.42%   ║   `，代號+價用 `--ink-dim`、漲跌依正負用綠/紅、
  分隔符 `║` 用 `--grid`。
- 每幀左移 `0.6px`（requestAnimationFrame），總寬取模無縫循環；
  處理 devicePixelRatio、resize 時重建。

### 5.2 資料表格
```css
table{width:100%;border-collapse:collapse;font-size:13px}
th{color:var(--amber);font-weight:500;letter-spacing:.12em;font-size:11px;
   border-bottom:1px solid var(--grid);padding:6px 8px;text-align:left}
td{padding:6px 8px;border-bottom:1px dotted #0e2c1b}
tr:hover td{background:#0a1a0e}
```
數字欄右對齊；代號欄 `color:var(--green);font-weight:700`；
表格外包 `.tbl-scroll{overflow-x:auto}` 保行動端可用。

### 5.3 ASCII 邊框面板
1px 實線框 + 四個角落用 box-drawing 字元蓋在框線上，標題嵌進上框線：
```html
<section class="panel"><b class="cx"></b>
  <span class="pt">MARKET OVERVIEW</span>
  <span class="psub">SIM FEED</span>
  ...content...
</section>
```
```css
.panel{position:relative;border:1px solid var(--grid);background:var(--panel);
       padding:22px 18px 16px}
.panel::before,.panel::after,.panel .cx::before,.panel .cx::after{
  position:absolute;color:var(--green-dim);font-size:15px;background:var(--bg)}
.panel::before{content:"\250C";top:-8px;left:-5px}   /* ┌ */
.panel::after{content:"\2510";top:-8px;right:-5px}   /* ┐ */
.panel .cx::before{content:"\2514";bottom:-8px;left:-5px} /* └ */
.panel .cx::after{content:"\2518";bottom:-8px;right:-5px} /* ┘ */
.pt{position:absolute;top:-11px;left:14px;background:var(--bg);padding:0 8px;
    color:var(--amber);font-size:12px;letter-spacing:.18em}
.pt::before{content:"[ "} .pt::after{content:" ]"}
```

### 5.4 鍵盤提示按鈕
```html
<a class="kbtn g" href="markets.html"><b>[ENTER]</b> OPEN MARKETS</a>
```
```css
.kbtn{color:var(--amber);border:1px solid var(--amber-dim);background:#0a0902;
  padding:9px 16px;font-size:14px;letter-spacing:.08em;text-decoration:none;
  box-shadow:inset 0 -3px 0 rgba(255,176,0,.14)}  /* 底部内陰影=鍵帽厚度 */
.kbtn:hover{background:var(--amber);color:#140d00} /* hover 反白，不做透明度漸變 */
.kbtn.g{color:var(--green);border-color:var(--green-dim);background:#031006}
```
按鍵編號寫進中括號（`[1]`、`[Q]`、`[ENTER]`），且 JS 真的綁定該按鍵——
提示必須是真的，否則就是裝飾貼紙。

### 5.5 Footer
固定四行結構：ASCII 橫線（`+----+` 字串、`overflow:hidden;white-space:nowrap`）→
站名 + 三頁連結 → 琥珀色虛線框的**虛構資料免責聲明**（必備）→
版權行結尾放一個閃爍方塊游標。

## 6. 動效規則

| 動效 | 實作參數 |
|------|----------|
| 閃爍游標 | `<span class="cur">▮</span>`；`width:.6em;background:var(--green);color:transparent`；`animation:blink 1s steps(1) infinite`，`50%{opacity:0}`。必須 `steps(1)`，禁止淡入淡出。 |
| 打字機 | JS 逐字 `textContent = txt.slice(0,i)`；標題速度 60–70ms/字（前 3 字放慢到 120ms 更像手打）；系統回覆快打 12–16ms/字。游標為獨立元素緊跟其後。 |
| 掃描線 | 固定滿版疊層 `repeating-linear-gradient(0deg, rgba(0,0,0,.24) 0 1px, transparent 1px 3px)`，`position:fixed;pointer-events:none;z-index:9000`。週期 3px、暗度 .18–.24。 |
| 螢幕閃爍 | 另一層 radial 暗角（`transparent 55% → rgba(0,0,0,.5)`）配 `animation:flick 7s infinite steps(1)`，在 94%/97% 兩幀降 opacity 至 .86/.92——偶發、不規律、幅度小。 |
| 開機序列 | 滿版 `position:fixed` 黑幕 + `<pre>` 逐行輸出（每行間隔 150–300ms），行內 `OK` 綠色、警示琥珀色；結束顯示 "PRESS ANY KEY"，2.6s 後自動關閉；任意鍵/點擊可跳過；`sessionStorage` 記錄已播放，同工作階段不重播。關閉用 `transition:opacity .45s steps(4)`。 |
| 通用原則 | 一律 `steps()` 或線性；任何柔和 easing、彈跳、視差都會毀掉質感。 |

## 7. 圖表風格（canvas 畫法要點）

- **通則**：所有圖表用 canvas 手繪虛構資料。每次繪製先按
  `devicePixelRatio` 重設 `canvas.width/height` 並 `setTransform(dpr,0,0,dpr,0,0)`；
  監聽 resize 重繪。格線用 `#0c2415` + `setLineDash([2,4])`；
  座標文字 10px 等寬、`--ink-dim`。
- **Sparkline**：折線 `--green` 1.5px + `shadowBlur:6` 同色發光；
  線下填 `col+"1a"`（10% 透明度）；最後一點畫 4×4 實心方塊（不是圓點）；
  可加基準虛線。約 20 個數據點、高 46px。
- **K 線圖**：上漲畫**空心綠框**、下跌畫**實心紅塊**（`#ff5b45`），影線 1px 同色；
  蠟燭身寬 = 格寬×0.64。底部 16% 高度畫半透明量能柱（`.28` alpha）。
  最新收盤價畫琥珀色 `[5,4]` 虛線 + 右側 `> 412.88` 標籤。
  滑鼠移入畫琥珀 `[3,3]` 虛線十字線，並在圖下方輸出一行
  `O H L C V` 讀數（不做浮動 tooltip，終端機用讀數行）。
- **假資料**：短序列直接硬編碼；長序列（如 120 根 K 線）用固定種子的
  mulberry32 PRNG 生成，保證每次載入相同。禁止 `Math.random()`。

## 8. Logo 與 Favicon 設計指南

- **構圖**：方形 CRT 螢幕外框（3px 磷光綠描邊）內放 3 根上升柱狀圖
  （第一根琥珀、其餘綠）+ 一條淺綠折線，螢幕內疊 4px 週期掃描線 pattern；
  右側等寬字標準字 `TICKER`（綠）`HOUSE`（琥珀），字距 3px，
  結尾放閃爍方塊游標（SVG `<animate>` opacity 方波）。
- **Favicon**：同柱狀圖母題極簡化為 32×32 行內 SVG data URI：黑底、
  2px 綠框、三根柱（琥珀+綠+綠）。data URI 中 `#` 需寫成 `%23`。
- 禁止：漸層填色、圓角矩形 app icon 外形、立體效果。發光只在 HTML 端
  用 CSS text-shadow 補，SVG 本體保持平面純色。

## 9. Do & Don't

**Do**
- 黑底 + 磷光綠 + 琥珀，三色打天下；亮度分層級。
- 全站等寬字體；標籤大寫 + 寬字距。
- 導覽/按鈕標按鍵並真的綁定鍵盤事件。
- 面板標題嵌在框線上、四角放 box-drawing 字元。
- 動效用 steps()；游標用方塊；資料聲明「全屬虛構」。
- 文案寫得像操作日誌：短句、數字、冷面幽默。

**Don't**
- 紫色/藍紫漸層、玻璃擬態、大圓角卡片陣列（一眼 AI 模板感）。
- emoji 當圖示；要圖示就用 ASCII/box-drawing 字元或小 SVG。
- 柔和 ease 動畫、彈跳、視差捲動。
- 純白 `#fff` 內文、細灰陰影、淺色模式。
- 外部圖片、圖表函式庫；一切 canvas/SVG 手繪。
- 行銷廢話（"empower"、"seamless"、"revolutionize"）。

## 10. 頁面骨架範例（HTML snippets）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SITENAME // Screen</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg ...%3E"><!-- 行內 SVG favicon -->
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>/* :root 變數 + 全部樣式內嵌（單檔頁面） */</style>
</head>
<body>
  <div class="crt-glow"></div>          <!-- 暗角 + 閃爍 -->
  <div class="crt-scan"></div>          <!-- 掃描線疊層 -->

  <div id="boot">...</div>              <!-- 僅首頁：開機序列 -->

  <div id="tapewrap"><canvas id="tape" height="36"></canvas></div>

  <header>
    <a class="logo" href="index.html"><svg>...</svg><b>TICKER<i>HOUSE</i></b></a>
    <nav>
      <a class="on" href="index.html"><b>[1]</b> DASH</a>
      <a href="markets.html"><b>[2]</b> MARKETS</a>
      <a href="research.html"><b>[3]</b> RESEARCH</a>
    </nav>
    <div class="hstat">FEED: <span class="lv">SIMULATED</span> ...</div>
  </header>

  <main>
    <div class="pagehead">
      <div class="bc"><em>guest@host</em>:~$ run dashboard</div>
      <h1>SCREEN TITLE<span class="cur">▮</span></h1>
    </div>

    <section class="panel"><b class="cx"></b>
      <span class="pt">PANEL TITLE</span><span class="psub">META</span>
      <!-- table / canvas / list -->
    </section>
  </main>

  <footer>
    <div class="fin">
      <div class="rule">+------------------------------------------+</div>
      <div class="frow"><span>SITENAME // tagline</span> <a href="...">[1] page</a></div>
      <div class="disc">* ALL DATA FICTIONAL. NOT INVESTMENT ADVICE. *</div>
      <div class="cop">© 2026 ... <span class="cur">▮</span></div>
    </div>
  </footer>

  <script>
    /* 順序：共用資料陣列 → 開機序列(僅首頁) → 時鐘 → 跑馬燈 canvas
       → 頁面專屬圖表 → 鍵盤導覽(1/2/3) */
  </script>
</body>
</html>
```

重建檢查清單：黑底磷光綠 ✓ 掃描線 ✓ 方塊游標閃爍 ✓ 跑馬燈滾動 ✓
面板四角 ┌┐└┘ ✓ 按鈕帶 [KEY] 且鍵盤可用 ✓ 圖表 canvas 手繪 ✓
footer 虛構聲明 ✓ ——八項全中即符合本風格。
