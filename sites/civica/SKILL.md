---
name: swiss-international-data
description: A Swiss International Typographic web style tuned for data and civic products — strict grid, left-aligned Archivo grotesque, ink-black + international-blue on warm off-white, 2px hairline rules and no rounded corners, with a toc-first index homepage, a fixed side-rail nav, and original SVG charts that grow from a baseline on scroll with a crosshair readout as motion signatures.
---

# 瑞士國際主義 · 資料版（Swiss International — Data & Civic）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「政府開放資料」這個題材。CIVICA 只是它的一次示範；你可以拿它做研究機構、資料儀表板、金融報表、B2B SaaS 文件、法規資料庫或年報。
>
> **核心心法**：瑞士國際主義不是「用 Helvetica 加很多留白」。它是把資訊層級當成設計本身——網格決定一切、字級對比取代裝飾、每條線都有 2px 的理由。客觀、冷靜、可信；讓內容自己說話，設計退到後面。

---

## 設計哲學

1. **網格是骨架不是輔助線**：先畫網格再放內容。欄與列對齊到像素，側欄寬度、內距、行高都取自同一套模數。
2. **層級即版面**：不靠色塊與陰影分區，靠字級、字重、留白與 2px 實線。標題大、內文小、標籤更小且加字距。
3. **克制的訊號色**：全站近乎黑白，只留一個訊號色（此處國際藍）承擔連結、重點數字與圖表。訊號色出現得越少越有力。
4. **資料優先**：圖表是原創 SVG、齊左、有基線與格線；先給人看得懂的圖，再給下載鍵。不用花俏 3D 或漸層。

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 紙白 paper | `#F0EEE9` | 頁面底色（暖白，非純白，避免刺眼） | 基底 68% |
| 墨黑 ink | `#111111` | 文字、2px 分格線、反黑列 | 22% |
| 國際藍 blue | `#243FD6` | 唯一訊號色：連結、重點數字、圖表、當前頁 | 6% |
| 中性灰 gray | `#8C887E` | 次要文字、標籤、圖例 | 3% |
| 淺分隔 faint | `#DBD8D0` | 1px 細分隔線、圖表格線 | 1% |

**規則**：訊號色只有一個，不要同時用藍又用紅。反黑（hover 整列 `background:#111;color:#F0EEE9`）是主要的互動回饋，不用陰影。

## 字體系統

- **來源**：Google Fonts。標題／數字／標籤＝`Archivo`（grotesque，400–800）；內文＝`Noto Sans TC`（400／500／700）；程式碼／端點＝`Space Mono`。
- **字級 scale**：H1 `clamp(1.9rem,4.6vw,3.6rem)`（字距 -.02em）、H2 1.5–1.6rem、目錄標題 1.28rem、內文 1rem、標籤／編號 .66–.72rem（字距 .1–.26em + 大寫）。
- **字重/行高**：標題 800、行高 1.02；內文 400、行高 1.65–1.7。大標用負字距收緊，標籤用正字距撐開——這組對比是瑞士風的識別。

## 版面與網格

- **側欄 + 主欄**：左側固定 `--rail:232px` 側欄（2px 右分隔線），主欄 `margin-left:var(--rail)`，內容 `max-width:820–1000px` + 44px 內距。手機時側欄收合為頂部橫列。
- 所有分區用 **2px 實線**（大分隔）與 **1px faint 線**（列分隔），無圓角、無陰影。
- 統計／指標用等分格盒（`display:flex` 或 grid + 內部 1px 分隔），每格一個大數字 + 小標籤。
- 目錄列用 `grid-template-columns` 固定欄寬（編號 / 標題 / 計數 / 箭頭），對齊到基線。

## 元件配方

- **side-rail nav**：`position:fixed;height:100vh`，頂部 2px 方格 logo，中段編號式垂直連結（每條 1px 上分隔線、`.idx` 小編號 + 標題），底部 meta（更新日期 + 虛構聲明）。當前頁轉藍。
- **toc 目錄列（.tocrow）**：grid 對齊，`:hover` 整列反黑並左移 padding；編號用藍色 Archivo 800。這是首頁主體。
- **filter chip**：1.5px 黑框、無圓角、方形；`aria-pressed=true` 時反黑。
- **資料表**：`border-collapse`，表頭 2px 底線 + 大寫小字距標籤，欄位用 mono 呈現代號。
- **圖表卡**：格線 `stroke:#DBD8D0`、長條 `fill:#243FD6`、折線 `stroke:#243FD6`，含 `<text>` 軸標籤與 hover 十字準星。
- **footer**：2px 上分隔線、齊左品牌 + 連結欄 + 一段「虛構示意」免責聲明。

## 動效規則

- **圖表進場（signature）**：`IntersectionObserver`（threshold .3–.35）加 `.seen`；長條 `transform-origin:bottom;scaleY(0→1)`，`transition:.8s cubic-bezier(.2,.7,.2,1)`，用 `nth-child` 遞增 `transition-delay` 做逐欄升起；折線用 `stroke-dasharray/offset` 描出；環圈用 `stroke-dashoffset` 展開。
- **十字準星讀值（signature）**：圖表 `:hover` 時顯示 `stroke-dasharray` 的十字準星線與 `<text class="readout">` 讀數（`opacity 0→1`）。
- **反黑回饋**：列與連結 hover 用 `background`/`color` 反轉，`transition .15s`，不位移、不放大。
- **降級**：`@media(prefers-reduced-motion:reduce)` 直接把圖表設為最終狀態（`scaleY(1)`、`dashoffset:0`），關閉所有 transition 與 hover 位移。

## 插畫與圖像風格

- 幾乎不用插畫；「圖像」就是資料圖表，全部原創 inline SVG（長條、折線、環圈、GeoJSON 風格圖層），零外部圖片、零圖表函式庫。
- 圖表配色只用 ink／blue／gray／faint；格線細、基線實。
- 標記與 logo 用 2px 方格幾何（棋盤格），不用漸層、不用擬真。

## Logo 與 Favicon

- **Logo**：2×2 棋盤方格（兩格藍、兩格白描邊黑框）＋右側 Archivo 800 大寫字標 `CIVICA` 與加字距的中文副名。方正、無圓角。
- **Favicon**：inline SVG data URI，黑底上同款 2×2 藍白棋盤格，16px 仍清晰。

## Do & Don't

- ✅ 先立網格再放內容；2px／1px 兩級實線分區。
- ✅ 只用一個訊號色；hover 用反黑而非陰影。
- ✅ 大標負字距 + 標籤正字距的對比；齊左、不置中。
- ✅ 原創 SVG 圖表，含基線、格線、軸標與 hover 讀值。
- ❌ 不用圓角、不用模糊陰影、不用漸層（尤其紫藍）。
- ❌ 不用置中大標＋三卡片模板、不用 emoji icon、不用跑馬燈。
- ❌ 不要同時用多個強調色；不要用裝飾插圖稀釋客觀感。

## 頁面骨架範例

```html
<style>
:root{--paper:#F0EEE9;--ink:#111;--blue:#243FD6;--faint:#DBD8D0;--rail:232px;
 --grot:'Archivo',sans-serif;--sans:'Noto Sans TC',sans-serif;}
.rail{position:fixed;left:0;top:0;width:var(--rail);height:100vh;border-right:2px solid var(--ink);padding:24px 22px}
main{margin-left:var(--rail)}
.tocrow{display:grid;grid-template-columns:56px 1fr 130px 30px;gap:18px;align-items:center;
 padding:20px 4px;border-bottom:1px solid var(--faint);text-decoration:none;transition:background .15s}
.tocrow:hover{background:var(--ink);color:var(--paper);padding-left:14px}
.tocrow .n{font-family:var(--grot);font-weight:800;font-size:1.5rem;color:var(--blue)}
</style>

<aside class="rail">…側欄 nav…</aside>
<main><div style="max-width:1000px;padding:0 44px">
  <a class="tocrow" href="#"><span class="n">01</span>
    <span><b>財政與預算</b><span>總預算、決算、標案</span></span>
    <span>52 資料集</span><span>↗</span></a>
</div></main>

<!-- 長條圖進場（IntersectionObserver 加 .seen） -->
<svg viewBox="0 0 240 96" preserveAspectRatio="none">
  <line x1="0" y1="60" x2="240" y2="60" stroke="#DBD8D0"/>
  <rect class="bar" x="6" y="40" width="24" height="56"/>
</svg>
<style>.bar{fill:#243FD6;transform-origin:bottom;transform:scaleY(0);transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.seen .bar{transform:scaleY(1)}</style>
```
