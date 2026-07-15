---
name: cyanotype-atlas
description: A duotone Prussian-blue cyanotype aesthetic for science and archive sites — negative white line-art on deep blue, serif-plus-mono typography, a rotatable star-chart signature and an operable seat-picker.
---

# 藍晒圖鑑風（Cyanotype Atlas）

## 設計哲學

把整個網站當成一張「藍晒印樣」：普魯士藍是底，白是被光留下的線。這不是深色模式的黑底發光，而是**雙色域的顯影**——只有兩種墨。適合天文、檔案、博物、地圖、科學教育等需要「精確又古典」氣質的題材。克制、冷靜、資料導向；情緒藏在星點的微微閃爍與旋轉的星盤裡，而非煽情的大字與漸層。

## 色彩系統

只用兩支主墨，其餘皆為其明度階：

| 色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 最深藍 | `#08213F` | 星盤圓面、卡片內底、footer | 25% |
| 主底藍 | `#0E3568` | 頁面背景 | 40% |
| 中藍 | `#17539E` / `#2E6FBE` | 分隔、hover 底、次要圖形 | 8% |
| 藍晒米白 | `#EAF1F7` | 所有文字、線條、星點（負片白） | 20% |
| 微光青 | `#7FC0F0` | 互動高亮、CTA hover、選中狀態 | 5% |
| 暗調藍 | `#A9C4E0` / `#6E93BF` | 次級文字、標籤 | 2% |

**禁止**引入第三色相（紅、綠、黃）。所有分隔線用 `rgba(234,241,247,.22)` 這類白色低透明，而非新顏色。

## 字體系統

- 標題與內文：**Spectral**（襯線，300/500/700，可用義大利斜體做強調），像博物學圖鑑的正文。
- 數據、座標、導覽、標籤：**Space Mono**（等寬，`font-variant-numeric:tabular-nums`），承擔所有「赤經赤緯／恆星時／席位編號」。
- 字級 scale：hero `clamp(34px,6vw,66px)`、h2 `clamp(24px,3.4vw,40px)`、h3 22px、內文 15–18px、mono 標籤 11–13px（`letter-spacing:.2em–.32em`，常配 `text-transform:uppercase`）。
- 行高：標題 1.08–1.12，內文 1.65。

## 版面與網格

- 置中 `max-width:1180px` 容器；section 以 `1px solid rgba(255,255,255,.22)` 上緣分隔。
- **map-first**：首頁主角是一個圓形星盤（`aspect-ratio:1`），與文字左右分欄 `1.05fr .95fr`；行動版星盤移到最上（`order:-1`）。
- 12 欄不對稱區塊：特色卡用 `grid-column:span 7 / span 5` 交錯，並以 `margin-top` 錯開高度，避免整齊卡牆。
- 背景可疊 1–2 個極淡 `radial-gradient`（微光青 12–14%）當作「天光」，但不可形成紫藍漸層。

## 元件配方

- **nav（bottom-dock）**：`position:fixed;bottom:16px;left:50%;transform:translateX(-50%)`，半透明深藍 + `backdrop-filter:blur(9px)` + 白細框；連結為 Space Mono，`.on` 反白（白底藍字）。`body{padding-bottom:78px}` 留位。
- **按鈕／CTA**：白細框 + Space Mono 文字，hover 反白填滿（背景白、字轉最深藍）。不要圓角、不要模糊陰影。
- **卡片**：`1px solid rgba(255,255,255,.22)`，內距 24–26px，無圓角、無陰影；編號用 Space Mono 小字。
- **表格**：底線分隔（`border-bottom`），右欄數值用 mono + 微光青。
- **座位圖／星盤**：純 inline SVG，圓點為席位或星點；`stroke` 用低透明白畫同心圓與網格。
- **footer**：最深藍底，三欄（品牌敘事／時間／聯絡），mono 小字；結尾一行虛構聲明。

## 動效規則

- **星點閃爍（ambient）**：`@keyframes tw{0%,100%{opacity:.55}50%{opacity:1}}`，`4s ease-in-out infinite`，每顆隨機 `animation-delay`。這是氛圍，不是進場。
- **星盤旋轉（signature）**：以 SVG `<g transform="rotate(a 200 200)">` 包住星場，pointer/touch 拖曳外環計算角度差旋轉；同步更新恆星時與「正對子午線星座」讀值。核心是**旋轉**，不是描邊或計數。
- **hover**：座位 `transform:scale(1.18)`（`transform-box:fill-box`）、連結淡入反白，`.2s`。
- 一律提供 `@media(prefers-reduced-motion:reduce)`：關閉閃爍與過場，星點固定 `opacity:.85`。

## 插畫與圖像風格

全部原創 inline SVG，一律「負片白線」：白色 `stroke` 畫在藍底上，`fill:none`。母題包含圓頂剖面弧線、六分儀、星座連線、等角網格、藍晒風路線圖（虛線白路徑 + 白圓點站名）。避免使用實心大色塊；讓藍底透出來就是最好的第二色。**零外部圖片**，僅 Google Fonts。

## Logo 與 Favicon

- Logo：藍底方形內一個白線圓（代表圓頂／天球）+ 中央一顆白色五角星 + 十字準線。純線稿，可縮到 26px 仍清晰。
- Favicon：同母題簡化為 `viewBox 0 0 32 32` 的 inline SVG data URI，寫進 `<head>`；藍底、白圓、白星。

## Do & Don't

- **Do**：只用兩支墨；用 mono 承載所有數字；讓白線在藍底上「被光留下」；把首頁交給一個可操作的圖（星盤／地圖）。
- **Do**：每站至少一個真正可玩的功能（本風以「選位訂票」示範：選場次→點座位→即時結算→訂位代碼）。
- **Don't**：不要紫藍漸層 hero、不要置中大標＋三卡片、不要 emoji icon、不要圓角模糊陰影卡、不要 Lorem ipsum。
- **Don't**：不要把「淡入揭示／數字計數／描邊 dashoffset」當成招牌動效——本風的招牌是「旋轉」。
- **Don't**：不要加入第三種顏色破壞 duotone。

## 頁面骨架範例

```html
<div class="dock">
  <span class="brand"><svg>…白線圓+星…</svg><b>CELESTE</b></span>
  <nav><a class="on">星圖</a><a>節目・訂票</a><a>參觀</a></nav>
</div>
<section class="hero">
  <div class="lede">
    <span class="kick">北緯 25.0° · 藍晒天象館</span>
    <h1>今夜的星空，<em>印在一張藍晒紙上。</em></h1>
    <p>…冷靜理性的一段…</p>
  </div>
  <div class="sky"><svg viewBox="0 0 400 400">
    <circle r="196" fill="var(--b0)" stroke="rgba(255,255,255,.4)"/>
    <g id="field" transform="rotate(0 200 200)"><!-- 星點 + 連線 --></g>
    <g class="ring"><!-- 可拖曳外環 --></g>
  </svg></div>
</section>
```

CSS 變數起手式：

```css
:root{--b0:#08213F;--b1:#0E3568;--b2:#17539E;--paper:#EAF1F7;--glow:#7FC0F0;
  --line:rgba(234,241,247,.22);--line2:rgba(234,241,247,.4)}
body{background:var(--b1);color:var(--paper);font-family:'Spectral',serif}
.mono{font-family:'Space Mono',monospace;font-variant-numeric:tabular-nums}
```
