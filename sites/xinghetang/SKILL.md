---
name: herbal-stipple
description: A warm paper natural-organic style for traditional apothecary and wellness brands, built on stipple (dotted engraving) botanical illustration, seal-red accents, Ming serif, a side-rail nav and a seasonal dial as its signature interaction.
---

# 本草點描・自然有機風（Herbal Stipple）

一套為中醫、藥草、養生、天然保養等品牌設計的視覺語言。核心不是綠色 = 天然的刻板配色，而是**紙的溫度＋點描的手感＋節氣的時間感**。畫面像一本翻舊的植物譜：密點堆出藥草，朱砂印章壓角，明體直落。

## 設計哲學

1. **順時**：內容圍繞「當令」組織——節氣、季節、時段表。介面的主角常是一個「時間工具」（轉盤、時刻表），而非大標語。
2. **點的手感**：所有插畫用密點（stipple）堆疊而成，拒絕平滑向量填色與細線線描。點的疏密即明暗，越靠邊越密。
3. **留白如宣紙**：大量米色留白，配 radial-dot 顆粒疊底，讓螢幕有紙感。
4. **克制的紅**：朱砂紅只用在印章、當前狀態、少量強調——像藥籤上的一枚印，不濫用。

## 色彩系統

| 用途 | Hex | 比例 |
|------|-----|------|
| 底色・紙白 | `#F1E9D8` | 60% |
| 次底・淺赭紙 | `#E7DCC4` / `#F7F1E3` | 15% |
| 墨黑（文字・框線） | `#26221C` | 12% |
| 艾綠（葉・輔助） | `#5E6B4F` | 7% |
| 朱砂（印章・當前・強調） | `#A6472E` | 4% |
| 藥黃（花・點綴） | `#C79A3F` | 2% |
| 分格線 | `#C9BB9E` | — |

紙感疊底：`background-image:radial-gradient(#C9BB9E .5px,transparent .5px);background-size:7px 7px;mix-blend-mode:multiply;opacity:.5`，固定於 `body::before`。

## 字體系統

- 標題／引言／logo：**Noto Serif TC**（明體），字重 900（大標）、700（小標／標籤）、400（引言）。
- 內文：**Noto Sans TC** 300，`line-height:1.85`，行距寬鬆。
- 字級 scale：H1 `clamp(2.1rem,5.6vw,4rem)`、H2 `clamp(1.6rem,3.4vw,2.5rem)`、body `1rem`、標籤 `.72rem`。
- 標籤（kick）：明體 700，`letter-spacing:.42em`，朱砂色，全大寫感。
- 可用直排點綴：`writing-mode:vertical-rl;letter-spacing:.5em`（側欄印訓）。

## 版面與網格

- **導覽採 side-rail**：固定左側 216px 垂直欄，含 logo、直落選單、聯絡資訊、直排標語；內容區 `margin-left:216px`。窄於 760px 時側欄收合為頂部橫列 + ☰ 展開選單。
- 分格用 **2px 實線**（外框）與 1px `#C9BB9E`（內格），**一律無圓角、無模糊陰影**。
- section 之間以 2px 墨線分隔，`padding-block:clamp(48px,7vw,96px)`。
- 卡片用「連格」而非漂浮：`border-right/border-bottom` 拼成表格狀，hover 只換底色不加陰影位移。
- 首字放大（drop cap）：引言段落 `float:left` 的明體 900 朱砂大字。

## 元件配方

- **nav（side-rail）**：每項下 1px 分隔線，hover 時文字轉朱砂、左移 14px，並在左緣長出一段 2px 朱砂短線（`::before` width 0→20px）。
- **按鈕**：明體、`border:1.5px solid` 墨黑、無圓角；hover 反色（底墨字紙）。
- **時刻表**：`border-collapse`，表頭與列首用淺赭底明體；營業格艾綠、休診格淡灰 `—`；格內副標（醫師/科別）用朱砂小字。
- **卡片（科別）**：連格編號制，`.no` 用藥黃明體序號「科・一」。
- **details FAQ**：`summary` 明體 700，下邊 1px 線。
- **footer**：整條墨黑底、紙白字，左品牌名（明體 letter-spacing .14em）、中連結、右虛構聲明淺灰小字。

## 動效規則

- **節氣轉盤（招牌互動）**：SVG 圓盤，24 節氣沿環擺放（各自 `rotate` 對齊切線），固定頂部朱砂三角指針。旋轉整個 `#ring` 群組 `rotate(-(idx/24)*360)`；當前節氣字轉 900 朱砂並同步中心字與下方養生建議。支援滑鼠／觸控拖曳（`atan2` 計算角差換算節數）與前後按鈕。`duration` 走 CSS 預設過場即可，重點在即時對位。
- **點描逐點浮現**：插畫的每個 `<circle>` 依序 `opacity 0→1`、`transition:.5s`，以 `setTimeout` 每點錯開約 4ms；`prefers-reduced-motion` 時全部直接顯示。
- 一般 hover：`.25s ease`，僅位移／換色，禁止彈跳與縮放。

## 插畫與圖像風格

- **技法：點描（stipple）**。以密點堆疊藥草（葉、根、果、花），疏密表現明暗——中心稀、邊緣密。
- 產生法（可直接用）：對每片葉／果做橢圓的**拒絕取樣**，`u²+v²>1` 捨棄，並用 `rnd()>0.3+0.65*edge` 疏化內部；莖用沿線抖動點串。用**種子亂數**（LCG）確保每次構圖一致。
- 配色：葉艾綠、果朱砂、花藥黃、莖墨黑。單色為主、每株最多三色。
- 全站零外部圖片，插畫與 logo 皆 inline SVG。

## Logo 與 Favicon 設計指南

- Logo：**朱砂印章方框** + 點描杏果（用 `<use>` 複製點簇）+ 艾綠莖葉 + 明體 900 字標與 letter-spacing 副標。
- Favicon：同印章縮影，inline SVG data URI 寫進 `<head>`（方框朱砂描邊、內置一顆點描果、艾綠葉）。
- 印章語彙可延伸為「當前狀態」的視覺記號。

## Do & Don't

**Do**：紙白留白＋顆粒疊底；明體直落；點描藥草；side-rail 導覽；朱砂克制點綴；節氣／時段等「時間工具」當主角；2px 實線分格。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋三張圓角卡片 ❌ emoji 當 icon ❌ 圓角模糊陰影浮卡 ❌ 平滑向量填色或細線幾何線描（本風格用點描）❌ 螢光高飽和 ❌ Lorem ipsum 或 AI 腔（「在當今快節奏的時代」）。

## 頁面骨架範例

```html
<aside class="rail">
  <a class="brand" href="index.html"><img src="assets/logo.svg" alt="品牌"></a>
  <nav>
    <a href="index.html" aria-current="page">應診時刻</a>
    <a href="treatments.html">診療科別</a>
    <a href="about.html">堂號淵源</a>
  </nav>
  <div class="info"><b>大稻埕・迪化街</b>地址…電話…時間…</div>
  <div class="vseal">扶正・固本・調息</div>
</aside>
<main class="wrap">
  <section class="hero pad">
    <span class="kick">標籤・明體大寫感</span>
    <h1>時間工具開場<span class="sm">副標・寬字距</span></h1>
    <div class="hgrid"><!-- 左：時刻表　右：節氣轉盤 SVG --></div>
  </section>
  <section class="pad">
    <div class="two">
      <p class="lead"><span class="drop">首</span>字放大引言…</p>
      <svg class="herb" viewBox="0 0 300 320"><!-- JS 生成點描藥草 --></svg>
    </div>
  </section>
</main>
```

節氣轉盤核心（可直接移植）：

```js
// 旋轉環群組，指針固定頂部
ring.setAttribute("transform","rotate("+(-(idx/N)*360)+" 120 120)");
// 拖曳：以 atan2 角差換算節數
var stepN = Math.round((pointAngle(ev)-startAng)/(2*Math.PI)*N);
idx = (startIdx + stepN + N*4) % N;
```
