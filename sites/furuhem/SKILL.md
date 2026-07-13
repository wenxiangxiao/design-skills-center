---
name: nordic-woodcraft
description: A warm Nordic-minimal style for furniture makers, homeware, ceramics and slow-craft brands — bone-paper backgrounds with restrained oak/sage/clay accents, spacious whitespace, Jost uppercase letter-spacing over Fraunces italics and Noto Serif TC product names, opening straight into a product catalog grid rather than a hero and using the thinnest sticky topbar, with dimension-annotation lines that draw on hover, procedurally generated wood-grain swatches and a slowly drifting natural-light wash as the motion signature.
---

# 北歐簡約（Nordic Woodcraft）

> 本 SKILL 定義一整套視覺語言。任何 AI 讀完即可替**任意產業**做出同風格網站——風格不綁定「家具」這個題材。FURUHEM 只是一次示範；同一套語言也能做陶器、選物店、文具、保養品、咖啡器具或民宿。
>
> **核心心法**：安靜、暖、留白。讓產品自己說話——首屏直接是**目錄網格**，不是大標與按鈕。細節藏在互動裡（滑過才畫出的尺寸線），質感來自材料（木紋、亞麻、植物油），而不是特效。

---

## 設計哲學

1. **留白即奢侈**：大量空白、寬鬆行距（body 1.85）、克制的分格線（1px 淺線）。版面呼吸，不塞滿。
2. **暖而非冷**：底色是帶暖的骨白（非純白），文字是柔黑（非純黑）。整體像午後灑進工坊的自然光。
3. **產品優先**：catalog-first——首頁第一屏就是單品網格，資訊層級是「看物件 → 看尺寸 → 看價格」。
4. **克制的色**：木色、苔綠、陶土三個點綴色合計極少量，其餘交給紙白與柔黑。
5. **材料的誠實**：木紋、尺寸、木種都攤開講。尺寸用毫米、可換木種、保養方式都寫清楚——安靜但不含糊。

## 色彩系統

| 變數 | Hex | 用途 | 大致比例 |
|---|---|---|---|
| `--paper` | `#F4F1EA` | 主背景（暖骨白） | 66% |
| `--birch` | `#EAE4D7` | 卡片 hover、次面板、CTA 底 | 12% |
| `--sand` | `#DED6C4` | 更深的分區底 | 4% |
| `--ink` | `#26241E` | 主要文字、線稿（柔黑） | 文字 |
| `--mute` | `#8C8677` | 次文字、caption、單位 | 文字 |
| `--wood` | `#C7A97B` | 木色點綴（logo 線、favicon 桌面） | 3% |
| `--sage` | `#8E9C86` | 苔綠：英文品名、次強調、選字底 | 3% |
| `--clay` | `#B4795A` | 陶土：標籤、尺寸線、hover 底線 | 2% |
| `--line` | `#D8D0BF` | 分隔線、格線 | 線條 |

原則：畫面近乎「紙＋柔黑」，木色／苔綠／陶土只當標點。避免高飽和、避免純黑純白、避免多彩並置。

## 字體系統

- 來源：Google Fonts。`Jost`（300/400/500，幾何無襯線，作導覽／標籤／數字，一律大寫＋`letter-spacing:.2–.34em`）、`Fraunces`（italic opsz，作詩意副標與圖說，斜體襯線帶手感）、`Noto Serif TC`（400/500/700，中文品名與標題）、`Noto Sans TC`（300/400/500，中文內文，字重偏細）。
- 級距（clamp）：頁面標 `clamp(1.8rem,4vw,2.8rem)`／區塊標 1.5rem／品名 1.14–1.32rem／內文 .92–1rem／Jost 標籤 .56–.68rem。
- 手法：Jost 全大寫、字距大，承擔「系統／標籤」語氣；Fraunces 斜體承擔「情感／手感」語氣；兩者交替使用製造安靜的節奏。內文用細字重（300）維持輕盈。

## 版面與網格

- **置頂列（topbar）**：最細的 sticky nav，半透明＋`backdrop-filter:blur`，字距拉開的 Jost 小字，底部 1px 淺線。
- **目錄網格**：`grid-template-columns:repeat(3,1fr)`，卡片間用 1px `--line` 當縫（`gap:1px;background:var(--line)`），呈現安靜的方格牆；≤900px 轉兩欄、≤600px 單欄。
- **尺寸表**：全系列頁用 `border-collapse`＋每列底線的表格；≤640px 表頭隱藏、每列轉堆疊卡片。
- 留白規則：區塊上下 40–44px；卡片內距 22–24px；hero 類區塊左右欄 gap 30–40px。
- 對齊：以左對齊為主，價格與尺寸右對齊；不做傾斜或不對稱破格，靠留白與比例製造層次。

## 元件配方

- **產品卡**：`--paper` 底、hover 轉 `--birch`（.4s）；上方 `.stage` 放線稿 SVG＋隱藏的尺寸群組；下方品名（Noto Serif TC）＋英文斜體（Fraunces）＋材料說明＋底線分出價格／尺寸列。
- **尺寸標註（signature）**：SVG `.dims` 群組預設 `opacity:0`；卡片 hover 時 opacity→1，內部 `line/path` 以 `stroke-dashoffset` 由 `--len`→0 描繪（.7s ease），數字 `text` 延遲 .35s 淡入。用 `vector-effect:non-scaling-stroke` 保持線寬。
- **木紋色票**：canvas 程序生成——底填木種中間色，疊 20+ 條正弦擾動的紋理線（深淺交錯、不同 alpha），加一兩個橢圓「節眼」。完全無外部圖片。
- **按鈕**：描邊 `1px solid var(--ink)`、Jost 大寫字距、無填色；hover 反轉為墨底紙字（.3s）。不用圓角膠囊、不用陰影。
- **自然光暈**：`position:fixed` 的 `radial-gradient` 疊層，`mix-blend-mode:screen`，`drift` 22–26s ease 漂移，營造光線緩移。
- **footer**：1px 淺線分隔；三欄（品牌＋Fraunces 斜體 slogan／導覽／時間），底部 Jost 大寫 fine print 含虛構聲明。

## 動效規則

- **hover 尺寸線**：`.dims` 描繪 .7s ease、數字 .3s ease（延遲 .35s）；卡片背景 .4s。
- **自然光暈**：`@keyframes drift` 22–26s ease-in-out alternate，位移數個百分點，極慢極淡。
- **nav / 按鈕**：.25–.3s 顏色與邊框過渡。
- **降級**：`@media(prefers-reduced-motion:reduce)` 關閉光暈漂移與過渡，尺寸線與數字直接顯示完成狀態（`opacity:1`、`stroke-dashoffset:0`）。

## 插畫與圖像風格

- 產品為單色線稿（`stroke:var(--ink)` 1.6px，無填色），保留家具輪廓的簡潔幾何；尺寸線與標註用陶土色。
- 職人肖像為極簡幾何：圓頭＋肩線，用一個代表角色的符號（微笑弧、方框、橫線）點題，不畫五官。
- 位置圖／剖面圖為淺線示意，苔綠虛線表動線、陶土三角標定位，字用 Jost／Fraunces。
- 木紋一律 canvas 程序生成，零外部點陣圖。

## Logo 與 Favicon 設計指南

- **Logo**：橫式。左為極簡桌子標記（柔黑線框＋一條木色桌面線＋一條苔綠短線），右為 Jost 500 大寫字標＋Fraunces 斜體副標，下加一條淺分隔線。
- **Favicon**：64×64 暖白底，一張線稿小桌（柔黑框＋木色桌面線），寫成 inline SVG data URI 放 `<head>`。
- 通則：只用線、留白與一點木色；不加漸層、不加陰影、不填色塊。

## Do & Don't

**Do**
- 用產品目錄網格開場；讓留白與比例做主要層級。
- 把尺寸、木種、保養誠實攤開；互動細節（hover 尺寸線）藏在其中。
- 木色／苔綠／陶土合計不超過畫面 10%，其餘交給紙白與柔黑。

**Don't（含去AI化禁令）**
- 不用紫藍漸層 hero、不用「置中大標＋副標＋兩顆按鈕＋三張圓角卡」模板。
- 不用圓角膠囊按鈕與模糊陰影卡片；本風格用細線分格與純描邊。
- 不用 emoji 當 icon（一律自繪 SVG／canvas）；不用 Lorem ipsum 或 AI 腔文案。
- 不放跑馬燈：安靜是重點，資訊用靜態網格與表格承擔。
- 不用高飽和色與純黑純白；暖與克制是這套語言的底線。

## 頁面骨架範例

```html
<div class="lightwash" aria-hidden="true"></div>
<header class="top"><div class="top-in">
  <a class="brand" href="index.html"><b>FURUHEM</b><span>松紋家居</span></a>
  <nav><a href="index.html" aria-current="page">本季系列</a><a href="collection.html">全系列</a><a href="story.html">工坊</a></nav>
</div></header>
<main class="wrap">
  <section class="intro"><div class="lbl">Collection No.07</div><h1>把木頭的<em>紋理</em>搬進家裡</h1></section>
  <section class="catalog">
    <article class="card">
      <div class="stage"><svg class="piece" viewBox="0 0 260 190">
        <g class="piece" stroke="var(--ink)" fill="none"><!-- 家具線稿 --></g>
        <g class="dims"><line style="--len:180"/><text>1600 mm</text></g>
      </svg></div>
      <h3>Sävne 餐桌</h3><div class="en">Solid Oak Dining</div>
      <div class="row"><span class="pr">NT$ 38,800</span><span class="dim">1600×900×740</span></div>
    </article>
  </section>
</main>
```

驗收標準：一個從未看過 FURUHEM 的 AI，只讀本 SKILL.md，就能做出以目錄網格開場、細頂欄導覽、hover 尺寸標註線、暖骨白＋木色／苔綠／陶土配色、Jost＋Fraunces＋Noto Serif TC 字體的全新北歐簡約網站——即使產業換成陶器、選物或保養品牌。
