---
name: anatomical-atlas-plate
description: A natural-history engraving aesthetic — charcoal plates, brass hairlines, isometric exploded diagrams and Plate/Fig. Latin captions — for technical, precision, repair-oriented brands.
---

# 解剖圖鑑／博物學圖版風（Anatomical Atlas Plate）

把網站當成一本十九世紀的博物學／機械圖鑑：炭黑的紙、黃銅色的細刻線、等角的爆炸解剖圖，每張圖都有 `Plate` 與 `Fig.` 的拉丁圖說。適合任何「講精密、講拆解、講工序」的產業——鐘錶維修、儀器、樂器、機械、標本、模型。核心是把產品或流程「解剖」給人看。

## 設計哲學

- **解剖，而非展示**：不放漂亮成品照，改畫「爆炸圖」「剖面圖」，把內部零件與工序攤開標號。資訊即插畫。
- **圖版邏輯**：每個區塊是一張「圖版（Plate）」，有編號、有拉丁圖說（`Fig. 2 — …`），像翻圖鑑。
- **暗版刻線**：底是炭黑，不是紙白；線是黃銅髮線，不是黑墨。營造銅版蝕刻的暗調質感。
- **職人克制**：文案不誇飾，像技術說明；留白給圖，字給規格。
- **功能是主角**：把一個真實流程（維修進度、組裝步驟）做成可操作、可追蹤的介面，而非靜態海報。

## 色彩系統

| 用途 | Hex | 說明 | 比例 |
|---|---|---|---|
| 夾板底 plate | `#1B1815` | 主背景，炭黑帶暖 | 60% |
| 圖版底 plate2 | `#231F1A` | 卡片／側欄／footer | 16% |
| 象牙字 ivory | `#E7DFCE` | 主要文字 | 10% |
| 次階字 ivory2 | `#B9B09B` | 說明、圖說 | 6% |
| 黃銅 brass | `#C79A4B` | 主線條、標題重點、連結 | 5% |
| 黃銅暗 brass2 | `#8C7331` | 邊框、分隔、次線 | 2% |
| 朱紅 oxblood | `#8C3A2B` | 寶石／樞紐／「目前位置」焦點 | 1% |
| 鋼藍 steel | `#7E8A90` | 工具、鑷子等冷色細節 | <1% |

規則：底永遠是炭黑，黃銅只用在線與重點，朱紅是唯一的「熱點」色（一頁不超過幾處）。禁止大面積填色，圖靠線與網點成形。

## 字體系統

- **中文標題／內文**：Noto Serif TC（900 標題、600 小標、400 內文）。
- **拉丁圖說／斜體 caption**：Spectral（italic 400／600），承接圖鑑的古典襯線調。
- **技術標籤／編號／工單號**：IBM Plex Mono（400/500/600），字距 `.14em–.28em`、常大寫。
- 字級：H1 `clamp(34px,5.4vw,62px)`、H2 `clamp(26px,3.6vw,40px)`、內文 15–17px、圖說 13px、mono 標籤 10–12px。行高內文 1.75、標題 1.1。

## 版面與網格

- **side-rail**：左固定側欄 96px，直排 logo + 直書導覽（`writing-mode:vertical-rl`）+ 羅馬數字圓圈編號 + 底部方位字串；主內容 `margin-left:96px`。手機（≤820px）側欄轉為 sticky 頂欄。
- **圖版框**：內容區塊或插圖包在 `1px solid brass2` 的框裡，右上角放 mono 的 `PL. II · Fig. 2`，底部置中放 Spectral 斜體圖說。
- **form-first hero**：左欄放查詢 console + 結果，右欄放主圖版（等角爆炸圖）；`grid 1.02fr .98fr`，手機時圖版 `order:-1` 移到上方。
- 留白中等：section 直距 `clamp(40px,5vw,72px)`；圖多字少，禁止密集卡片牆。
- **刻線紋理**：`body::before` 疊一層 `repeating-linear-gradient(0deg, transparent 0 27px, rgba(brass,.045) 27px 28px)`，模擬圖鑑的細橫刻線（opacity .5）。

## 元件配方

- **nav（side-rail）**：直書連結，hover／current 由 ivory2 轉 brass；每項前置 `18px` 圓圈羅馬數字（mono）。
- **按鈕**：實心黃銅底 + `#14110D` 深字（主要動作）；或透明底 + brass2 框 + brass 字（次要），hover 反相成黃銅實心。全部無圓角、無陰影。
- **輸入框**：深底 `#14110D` + brass2 框 + mono 字；focus 時 border 轉 brass 並加 `0 0 0 1px brass` 外光。
- **卡片／spec**：`1px solid brass2` 框，內含 mono 小標（法則／編號）+ 襯線標題 + ivory2 說明。不用圓角與模糊陰影。
- **時間軸（timeline）**：`border-left` 一條 brass2 線，每項左側圓點：待處理=空心、已完成=實心黃銅、目前=朱紅實心 + 外圈光暈；待處理項 `opacity:.42`。
- **表格**：表頭 mono 大寫黃銅 + brass2 底線；列以 `1px dashed rgba(brass,.24)` 分隔；價格欄 mono 黃銅。手機轉為堆疊卡片（`display:block`）。
- **footer**：plate2 底、三欄（品牌／門市／索引）、底列 mono 版權 + 「皆為虛構示意」。

## 動效規則

- **爆炸圖組裝（signature）**：每個零件 `<g class="part upN">` 初始有 `translateY(-8~-62px)` 的爆炸位移；加上 `.seated` 類別即 `translateY(0)`。過場 `transform 1.05s cubic-bezier(.2,.8,.2,1)`。由「功能狀態」驅動 seat 的數量，不是捲動淡入。
- **擺輪擺動**：達組裝階段後給容器加 `.osc`，`.balance` 以 `transform-origin` 為軸做 `rotate(-16deg↔16deg)`，`1.6s ease-in-out infinite`。
- **放大鏡緩旋**：裝飾性 SVG 元件可 `rotate 360deg / 26s linear infinite`，極慢、無存在感。
- **流程播放**：`setInterval` 每 ~1.15s 前進一格，同步更新 timeline 狀態與爆炸圖 seat 數，到底回落實際狀態。
- 全站 `@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`。
- **禁止**：通用淡入當主打、數字 count-up、按壓硬陰影、dashoffset 描繪當招牌（這些在本館已過載）。

## 插畫與圖像風格

- **等角（isometric）爆炸圖**：以「上下堆疊 + 輕微橢圓透視」偽等角。齒輪＝`ellipse`/`circle` 加粗 `stroke` + `stroke-dasharray`（如 `2 4`）造出輪齒；夾板＝暗填色橢圓/曲線多邊形 + brass 描邊；寶石＝朱紅小圓點；工具＝brass 直線 + 朱紅柄。
- 全 SVG，**零外部圖片**；線條為主、填色極少，靠 dash 與疊層成形。
- 每張圖務必配拉丁圖說（Spectral italic）與 `Fig. N` 編號。

## Logo 與 Favicon 設計指南

- **Logo**：以「擺輪／機芯俯視」為母題——同心圓 + 四向輻條 + 中心朱紅寶石，外圈用 `stroke-dasharray` 造刻度。黃銅線於透明底，可直接壓在炭黑上。
- **Favicon**：32×32 炭黑底方塊 + 黃銅同心圓 + 十字輻條 + 朱紅中心點，寫成 inline SVG data URI 放 `<head>`。

## Do & Don't

- **Do**：把流程／內部結構解剖成圖；用 Plate/Fig. 圖說編號；黃銅線 + 炭黑底 + 一點朱紅；把核心功能做成可操作介面。
- **Don't**：紫藍漸層、置中大標三卡模板、emoji icon、圓角模糊陰影、紙白底、Lorem ipsum、AI 腔、「把 X 變成 Y」標題、「EST. 19xx」徽章、成品美照堆疊。

## 頁面骨架範例

```html
<aside class="rail">
  <img class="mk" src="assets/logo.svg" alt="">
  <nav>
    <a href="index.html" aria-current="page"><span class="num">I</span>維修進度</a>
    <a href="services.html"><span class="num">II</span>服務項目</a>
  </nav>
  <span class="cardinal">HENGJUN · 台北 25.06°N</span>
</aside>

<section class="hero">
  <div class="lead">
    <span class="kick">Fig. 1 — 查詢台</span>
    <h1>你的錶此刻走到哪裡了</h1>
    <div class="console">
      <label>工單號 · TICKET №</label>
      <div class="qrow"><input class="mono" placeholder="HJ-260712-041"><button>查詢</button></div>
    </div>
    <div id="result"></div>
  </div>
  <figure class="plate">
    <span class="fig">PL. II · Fig. 2</span>
    <svg viewBox="0 0 200 200">
      <g class="part up3 seated"><ellipse cx="60" cy="88" rx="30" ry="14"
        fill="none" stroke="#C79A4B" stroke-width="2"/></g>
    </svg>
    <figcaption class="cap">Fig. 2 — 自動機芯・等角爆炸圖</figcaption>
  </figure>
</section>
```

```css
.part{transition:transform 1.05s cubic-bezier(.2,.8,.2,1)}
.part.up3{transform:translateY(-8px)} .part.seated{transform:translateY(0)}
.osc .balance{animation:osc 1.6s ease-in-out infinite;transform-origin:60px 116px}
@keyframes osc{0%,100%{transform:rotate(-16deg)}50%{transform:rotate(16deg)}}
```
