---
name: neo-brutal-market
description: A loud neo-brutalist commerce aesthetic with thick black borders, hard offset shadows, high-chroma primaries, and bold SVG pattern-motif fills, tuned for marketplaces and product catalogs.
---

# Neo-Brutal Market — 新粗獷市集風格規格書

## 設計哲學

新粗獷主義（Neo-brutalism）把介面的骨架直接攤在陽光下：**厚黑邊、硬位移陰影（無模糊）、零圓角、飽和原色**。它不假裝精緻，反而用「粗」換來清楚、直接、好按。這套風格特別適合電商與目錄型產品——資訊密度高、需要強烈的可操作感（按鈕看起來就想按）。核心策略是**用結構取代裝飾**：邊框、陰影與圖樣織紋本身就是視覺，不需要照片與漸層。

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 紙白 Paper | `#FFFDF5` | 主背景、卡片底 | 46% |
| 油墨黑 Ink | `#0B0B0B` | 所有邊框、陰影、文字、深色區塊 | 24% |
| 螢光綠 Green | `#12C48B` | 主要行動（加入袋）、logo 底 | 8% |
| 警示橘 Orange | `#FF4B1F` | 強調、hover 反色、標籤 | 8% |
| 電光藍 Blue | `#2D5BFF` | 次要標籤、圖樣 | 7% |
| 鎘黃 Yellow | `#FFC93C` | hover 底、badge、圖樣 | 7% |

規則：原色只做**大膽的區塊**，不做漸層；黑色永遠是邊框與陰影，不當背景以外的裝飾。三到四色同框沒關係，但每個區塊給一個主色。

## 字體系統

- 來源：Google Fonts。`Archivo Black`（所有標題與品牌字，全大寫、`line-height:1`）；`Space Grotesk`（400/500/700，內文）；`Space Mono`（700，價格、標籤、數據、計數器——製造「終端／收據」的機能感）。
- 字級 scale：目錄大名 `clamp(22px,4vw,38px)`；頁面主標 `clamp(34px,7vw,64px)`；內文 18px（手機不縮太多）；標籤 11–14px。
- 標題常配 `text-transform:uppercase`；價格一律 Space Mono 加 `$` 前綴。

## 版面與網格

- 最大寬度 1120px，左右留白 22px。
- **一切用 3px 實線黑框分隔**：topbar、區塊、卡片、目錄列都以 `border:3px solid #0B0B0B` 界定，區塊之間用 `border-bottom:3px` 而非留白。
- **零圓角**（`border-radius:0`）。
- 硬陰影 token：`--sh:6px 6px 0 #0B0B0B`（右下、不模糊）。小元件用 `3px 3px 0`。
- 商品用等寬卡片網格（桌機 3–4 欄，平板 2 欄，手機 1 欄）。

## 元件配方

- **topbar 導覽**：`position:sticky;top:0`，紙白底、`border-bottom:3px`；左側 logo（螢光綠方塊 + Space Mono 字母 + Archivo Black 品牌字），右側連結 hover 加黑框與硬陰影黃底、current 反白為黑底。購物袋鈕橘底黑框硬陰影。
- **toc-first 開場**：不是 hero，而是一份「品類目錄」。每列 `grid` 四欄（編號 / 品類名 + 英文小字 / 件數黑籤 / 箭頭）；hover 時 `padding-left` 微移、箭頭右滑、並淡入一張**圖樣織紋**背景（見下）。這是本風格的招牌開場。
- **商品磚（card）**：3px 黑框 + `--sh` 硬陰影；hover `transform:translate(-3px,-3px)` 且陰影加深到 `9px 9px 0`（磚往左上浮、陰影變長）。內含圖樣織紋縮圖、Space Mono 標籤、大寫品名、賣家、價格與加入鈕。
- **按鈕**：3px 黑框、硬陰影；`:active` 時 `translate(3px,3px)` 且 `box-shadow:none`——**按下去真的會「吃掉」陰影下沉**，是關鍵手感。
- **篩選 chip**：Space Mono、黑框硬陰影，選中反白為黑底。
- **footer**：黑底、Space Mono 小節標為螢光綠。

## 動效規則（簽名）

- **磚體位移**：`transition:transform .12s,box-shadow .12s`；hover 上浮陰影加深、active 下沉陰影歸零。
- **目錄圖樣揭示**：目錄列 `.pat` 絕對定位、`opacity:0`，hover `.25s` 淡入該品類的圖樣織紋。
- **加入袋計數**：Space Mono 數字直接遞增（無數字補間動畫，硬跳），袋鈕短暫上移 `120ms`，底部吐司 `translateY` 滑入停留約 1.3s。
- **無緩動哲學**：位移用短 `.1–.12s`、線性感；不使用彈跳 easing 或長淡入。
- `@media (prefers-reduced-motion:reduce)` 下 `*{transition:none!important}` 全數關閉位移。

## 插畫與圖像風格（pattern-motif 圖樣織紋）

- **零外部圖片**，全部原創 inline SVG `<pattern>`。
- 提供四種可換色的織紋作為品類與商品的識別底：
  - `check` 棋盤格（20×20，半格填黑）
  - `zig` 鋸齒橫紋（24×16，黑色 zigzag 描線）
  - `dot` 大圓點（18×18，黑點）
  - `stripe` 45° 粗斜條（16 寬，半寬填黑）
- 每個 pattern 給隨機 id 避免衝突；底色帶入品類主色，圖形恆為油墨黑。用 `preserveAspectRatio="slice"` 鋪滿縮圖。
- icon 一律自繪 SVG（勾、箭頭、星），粗 `stroke-width:5`、方頭，配色塊底。

## Logo 與 Favicon 設計指南

- **Logo**：螢光綠方塊 + 3px 黑框 + 位移的第二層黑框（雙層錯位），內嵌以路徑畫的「S」；右側 Archivo Black 品牌字，底部橘色條內置 Space Mono `SELECT MARKET`。
- **Favicon**：inline SVG data URI，螢光綠底、3px 黑框、Space Mono 粗體 `S`。

## Do & Don't

**Do**：3px 黑框無圓角、硬位移陰影（右下不模糊）、按下吃陰影、高彩度原色區塊、Space Mono 數據感、圖樣織紋當識別。

**Don't**：
- ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片模板
- ✗ 圓角 + 模糊柔陰影（與本風格完全相反）
- ✗ emoji 當 icon（自繪粗描邊 SVG）
- ✗ 無限捲動 / 演算法推薦式首頁——本風格用 toc-first 目錄開場作為識別
- ✗ Lorem ipsum 與 AI 腔文案
- ✗ 低對比灰階、細襯線；跑馬燈反射式套用

## 頁面骨架範例

```html
<header class="topbar"><div class="tb-in">
  <a class="tb-logo"><span class="tb-mark">S</span><span class="tb-name">BRAND</span></a>
  <nav class="tb-nav"><a aria-current="page">品類</a><a>選物</a>
    <button class="bag">袋 [<span id="bagn">0</span>]</button></nav>
</div></header>

<div class="toc-row">
  <div class="pat"><!-- svg pattern --></div>
  <span class="toc-num">01</span>
  <span class="toc-name">文具紙品<small>Stationery</small></span>
  <span class="toc-count">48 件</span><span class="toc-arrow">→</span>
</div>
```

```css
:root{--ink:#0B0B0B;--sh:6px 6px 0 var(--ink)}
.card{border:3px solid var(--ink);box-shadow:var(--sh);border-radius:0;
  transition:transform .12s,box-shadow .12s}
.card:hover{transform:translate(-3px,-3px);box-shadow:9px 9px 0 var(--ink)}
.add:active{transform:translate(3px,3px);box-shadow:none}  /* 按下吃陰影 */
```
