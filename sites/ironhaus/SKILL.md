---
name: industrial-workshop
description: A raw industrial-workshop style for gyms, workshops, hardware and maker brands — bare concrete charcoal surfaces, safety-hazard yellow and rust-orange accents, condensed uppercase Oswald over Space Mono serial numbers, hairline iron grids and hazard-stripe meters, opening on a usable schedule/timetable instead of a hero and navigating from a fixed vertical side-rail, with plate-loading counters as the motion signature.
---

# 工業風（Industrial Workshop）

> 本 SKILL 定義一整套視覺語言。任何 AI 讀完即可替**任意產業**做出同風格網站——風格不綁定「健身房」這個題材。IRONHAUS 只是一次示範；同一套語言也能做金工工作室、五金選物、機車行、咖啡烘焙廠、livehouse 或硬體新創。
>
> **核心心法**：把網頁當成一座**工廠的操作面板**。資訊是被「配置、計量、標號」的：序號、噸位、荷重、時段、工號。介面裸露不修飾——水泥灰的底、鑄鐵色的線、安全黃的警示、鏽橙的重點。**用班表／規格表／量表承擔首屏**，而不是置中大標＋兩顆按鈕。

---

## 設計哲學

1. **裸露而非裝潢**：深炭灰底、實心細線分格、無圓角、無模糊陰影。陰影只用硬投影（`box-shadow:4px 4px 0`），像鋼板疊放。
2. **一切皆可計量**：關鍵數字用等寬字（Space Mono）＋`tabular-nums`，配序號（TC-04）、工號（CT-01）、荷重（1.2T）。數字是這套語言的裝飾。
3. **安全色語彙**：安全黃（hazard）＝警示與重點動作；鏽橙（rust）＝次強調與危險等級；兩者刻意少量，其餘近乎無彩。
4. **開場是功能不是標語**：首屏放真正有用的東西（班表、規格、配重），讓使用者第一眼就能「讀資料」。避開大標 hero。
5. **側欄如機台面板**：導覽走固定垂直側欄，帶工號與營業時間，像機器側面的銘牌。

## 色彩系統

| 變數 | Hex | 用途 | 大致比例 |
|---|---|---|---|
| `--steel` | `#16181A` | 主背景（炭黑水泥） | 60% |
| `--steel2` | `#1D2023` | 側欄、面板、次背景 | 18% |
| `--concrete` | `#26292D` | 卡片內襯、表頭、SVG 底 | 8% |
| `--iron` | `#33373C` | 邊框、分隔線、格線 | 線條 |
| `--bone` | `#E8E4DC` | 主要文字（暖白，非純白） | 文字 |
| `--mute` | `#8A9096` | 次文字、caption、單位 | 文字 |
| `--hazard` | `#F2C200` | 安全黃：重點數字、hover、CTA、警示帶 | 6% |
| `--rust` | `#C4471F` | 鏽橙：危險等級、序號、次強調 | 3% |

原則：整體幾乎無彩（炭灰＋暖白），只靠安全黃與鏽橙點燃重點。**危險條紋**是招牌質感：`repeating-linear-gradient(45deg,#F2C200 0 11px,#000 11px 22px)`，用於 CTA 外框與強度量表。避免任何純黑純白與柔和粉彩。

## 字體系統

- 來源：Google Fonts。`Oswald`（400/500/600/700，condensed grotesque，作所有標題與導覽，一律 `text-transform:uppercase` 加 `letter-spacing:.02–.16em`）、`Space Mono`（400/700，等寬，作序號／數字／標籤／caption）、`Noto Sans TC`（400/500/700/900，中文標題與內文）。
- 級距（clamp）：主標 `clamp(2.2rem,6vw,4rem)`／區塊標 `clamp(1.5rem,3.6vw,2.3rem)`／大數字 `clamp(3rem,8vw,5.6rem)`／內文 1rem／mono 標籤 .5–.66rem。
- 標題永遠大寫、字重 600–700；中文標題用 Noto Sans TC 700–900 補重量。內文行高 1.7–1.8。

## 版面與網格

- **側欄 + 主欄**：左側 `116px` 固定側欄（`position:fixed`），主內容 `margin-left:116px`；內容區 `max-width:1080px` 置中。
- **運轉狀態條（board）**：主欄頂端一條 mono 小字狀態列（在場人數、序號、荷重），像機台跑馬儀表但為靜態資訊列。
- **硬格線**：表格、規格條、資訊卡全用 `1px solid var(--iron)` 實線分格，`border-collapse:collapse`，無圓角。
- 留白克制：區塊間距 26–44px；卡片內距 16–20px。整體偏緊湊、資訊密度高，符合「工廠面板」感。
- 旋轉角度：僅危險條紋用 45°；其餘一律正交，不做傾斜版面。

## 元件配方

- **側欄 nav**：`.rail` flex 直向；每個連結大寫 Oswald＋底下一行 mono 英文小標；hover／current 反白為安全黃底黑字，current 左緣加 4px 鏽橙條。行動裝置（≤820px）轉為可橫向捲動的頂欄。
- **按鈕**：`.btn` 安全黃底、黑字、大寫 Oswald、無圓角，硬投影 `4px 4px 0 var(--rust)`；hover 位移 `translate(-2px,-2px)` 陰影加大，active 壓回。次要按鈕為透明描邊（`.ghost`）。
- **卡片**：`--steel2` 底、`1px solid var(--iron)` 邊、直角；底部用 `border-top:1px dashed var(--iron)` 分出價格／容量列。
- **量表（meter）**：外框 `1px solid var(--iron)`、內填危險條紋，寬度用 JS 進場動畫填充。
- **表格**：表頭 `--concrete` 底、Oswald 大寫；格線 iron；有課的格子加 `.hi` 深底，hover 轉安全黃。
- **footer**：`border-top:2px solid var(--iron)`；三欄（品牌大字 slogan／導覽／時間），底部 mono fine print 含序號與虛構聲明。

## 動效規則

- **槓片配重計數器（signature）**：噸位數字以 `requestAnimationFrame` 於 1.9s ease-out 滾動；同時 SVG 槓片由槓中心以 `transform:scale(1 0)→1`、`cubic-bezier(.2,1.4,.4,1)` 逐片彈性「裝載」，每片延遲 130ms。用 `IntersectionObserver`（threshold .4）進場觸發。
- **強度量表填充**：`.track i` 寬 0→目標%，`1.1s cubic-bezier(.3,1,.4,1)`，進場觸發。
- **hover**：nav／表格格子 .16–.18s 顏色切換；按鈕 .12s 位移。
- **狀態點**：`board` 的紅點 `pulse` 1.6s 呼吸，暗示「運轉中」。
- **降級**：`@media(prefers-reduced-motion:reduce)` 關閉所有動畫與 transition，計數器與量表直接顯示終值。

## 插畫與圖像風格

- 全為原創 SVG，工程製圖語彙：平面配置以細線框＋安全黃／鏽橙標註區塊，附 `1:120`、`DWG.` 圖號與 mono 圖說。
- 人物（教練）為極簡幾何肖像：`--concrete` 底＋圓頭＋肩線，用一個代表專項的符號（槓片、圓環、十字）點題，不畫五官。
- 地圖為非等比示意：粗 iron 街道線＋方形定位標（安全黃方塊＋鏽橙底座），標名用 mono。
- 零外部點陣圖片；質感全靠 CSS（危險條紋、硬投影、實線格）。

## Logo 與 Favicon 設計指南

- **Logo**：橫式。左為槓鈴標記（暖白槓身＋兩端安全黃外片、鏽橙內片，正交矩形堆疊）；右為 Oswald 700 大寫字標，下附 mono 標語與危險條紋底線。
- **Favicon**：64×64 炭黑底，置中一根安全黃槓、兩端暖白套筒與鏽橙配片，寫成 inline SVG data URI 放 `<head>`。
- 通則：logo 只用矩形與直角構成，維持「機械零件」感；不加漸層、不加圓角。

## Do & Don't

**Do**
- 用班表／規格表／量表當首屏；讓數字（序號、噸位、荷重）成為視覺主角。
- 危險條紋與硬投影少量而精準地點在 CTA 與量表。
- 保持近乎無彩的炭灰底，安全黃與鏽橙合計不超過畫面 10%。

**Don't（含去AI化禁令）**
- 不用紫藍漸層 hero、不用「置中大標＋副標＋兩顆按鈕＋三張圓角卡」模板。
- 不用圓角卡片＋模糊陰影；本風格一律直角＋硬投影。
- 不用 emoji 當 icon（一律自繪 SVG）；不用 Lorem ipsum 或 AI 腔文案。
- 跑馬燈非必要：狀態資訊用靜態 mono 列承擔，不做捲動橫幅。
- 安全色不可濫用到整片黃或整片橘；克制才有工業感。

## 頁面骨架範例

```html
<aside class="rail">
  <a class="brand" href="index.html"><svg><!-- barbell mark --></svg><b>IRONHAUS</b><span>鐵廠・EST.2016</span></a>
  <nav>
    <a href="index.html" aria-current="page">班表<small>SCHEDULE</small></a>
    <a href="classes.html">課程<small>CLASSES</small></a>
    <a href="about.html">廠區<small>THE HAUS</small></a>
  </nav>
  <div class="rail-foot">台中市西區<br><b>06:00–23:00</b><br>SER. TC-04</div>
</aside>
<main>
  <div class="board"><div class="board-in"><span>廠區運轉中 · 37 人在場</span><span>序號 TC-04 · 荷重 1.2T</span></div></div>
  <div class="wrap">
    <section class="sched">
      <div class="sched-head"><h1>本週<em>班表</em></h1></div>
      <table class="grid"><!-- 週 × 時段 --></table>
    </section>
    <div class="tonnage"><div class="num"><span id="tnum">0</span><small>公噸</small></div>
      <svg id="platebar"><!-- 逐片裝載 --></svg></div>
  </div>
</main>
```

驗收標準：一個從未看過 IRONHAUS 的 AI，只讀本 SKILL.md，就能做出以班表／規格開場、側欄導覽、危險條紋量表、炭灰＋安全黃配色、Oswald＋Space Mono 字體的全新工業風網站——即使產業換成金工、五金或硬體品牌。
