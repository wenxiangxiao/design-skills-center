---
name: swiss-cartographic
description: A Swiss International Style system built around maps, grids and precision — bone-white paper backgrounds, ink black and a single signal red, 2px hairline module dividers with zero border-radius, Archivo grotesque uppercase labels riding a baseline over Inter body and Noto Sans TC, opening straight into an interactive schematic map rather than a hero and using a numbered vertical side-rail instead of a topbar, with pins that bidirectionally highlight a modular listing grid, a dashed crosshair readout and rolling-count numerals as the motion signature.
---

# 瑞士國際主義・製圖版（Swiss Cartographic）

> 本 SKILL 定義一整套視覺語言。任何 AI 讀完即可替**任意產業**做出同風格網站——風格不綁定「房地產」這個題材。MERIDIAN 只是一次示範；同一套語言也能做交通、資料入口、美術館、物流、旅遊路線或研究機構。
>
> **核心心法**：秩序、精確、克制。用格線與留白說話，資訊像地圖一樣「一眼定位」。首屏是一張**可互動的圖／索引**，不是大標與按鈕。只用一個紅色當訊號，其餘全交給黑白與網格。

---

## 設計哲學

瑞士國際主義（International Typographic Style）相信：好的設計是把資訊組織清楚，而不是加裝飾。本版把這個信念推到「製圖」的極端——版面是一張測量圖，每個模組都對齊隱形網格，每條分隔線都是實際的 2px 黑線。情緒來自秩序本身：當一切都對齊、留白慷慨、只有一個紅點在動，畫面就有了張力。禁止一切「柔化」手段（圓角、陰影、漸層），因為它們會削弱網格的權威感。

## 色彩系統

- `#F0EDE6` 紙白／頁面背景，佔 ~68%。帶暖灰的米白，取代刺眼純白。
- `#14110D` 墨黑／文字、2px 分隔線、side-rail、footer 反白區塊，佔 ~24%。
- `#DA2B1F` 國際紅／唯一強調色：logo 指北三角、hover 高亮、十字準星、關鍵數字、編號，佔 ~6%。**一個畫面同時出現的紅不超過 2–3 處**。
- `#8F8B80` 中灰／次要標籤、單位、說明文字，佔 ~2%。
- `#e7e3d9`／`#d3cec2` 紙白的兩階陰影，用於 hover 底色與細分隔線（非陰影，是實色）。

比例原則：黑白紙為主體，紅只當「訊號」。若紅超過 8% 就過頭了。

## 字體系統

- 顯示／標籤／數字：**Archivo**（700／900）。字重拉滿、字距 `-.01em`（大標）到 `.22em`（大寫小標籤）。所有 `.lbl` 一律大寫 + 寬字距。
- 內文：**Inter**（400／500／600），行高 1.5–1.55，段落寬 ≤52ch。
- 中文：**Noto Sans TC**（400／500／700）與上述並列。
- 字級 scale：大標 `clamp(30px,5-6vw,58-72px)`；區塊標題 24–38px；卡片標題 17–22px；內文 14–15px；標籤 11px；單位 10–12px。
- 數字是主角：坪數、價格、統計一律用 Archivo 900，字級明顯大於周圍文字。

## 版面與網格

- **2px 實線網格**：所有區塊用 `border:2px solid` 切分，形成看得見的模組。無圓角（`border-radius:0`），無陰影。
- 12 欄基準的模組化配置：首頁 `1.35fr / 1fr`（地圖／清單）、目錄 3 欄、服務 2 欄。RWD 逐級塌陷成 2 欄 → 1 欄。
- **side-rail**：左側固定 236px 垂直導覽，編號 01/02/03，是版面的一部分而非漂浮元件。
- 留白規則：模組內 padding `clamp(16px,2.4vw,30px)`；大標區上下留白慷慨；標籤與內容之間至少 10–14px。
- 對齊優先於置中：標題靠左、數字靠右、標籤壓在模組左上或格線上。避免整頁置中。

## 元件配方

- **nav（side-rail）**：`position:fixed;width:236px;height:100vh;border-right:2px solid`；連結為 `display:flex` 編號＋名稱，每項 `border-bottom:2px`，hover 轉紅。≤900px 變 `position:sticky` 橫向細列、編號隱藏。
- **按鈕／篩選**：方形，`border:2px solid`，無圓角；`aria-pressed="true"` 時反色（黑底白字）。相鄰按鈕共用邊線（`border-left-width:0` 疊合）。
- **卡片**：無圓角無陰影，靠 `border-bottom:2px` 與網格切分；hover 換 `#e7e3d9` 實色底，不用陰影浮起。
- **表格**：`border-collapse`，`th` 用 Archivo 大寫小標籤 + 灰色，`td` 底線 1px。
- **footer**：紙白底 + 2px 上邊線，兩欄；最底附一條墨黑反白 disclaimer 條（大寫寬字距）。

## 動效規則

克制是原則——只讓「紅點」動。

- **圖釘 hover**：`transition:all .18s`，圓點半徑 7→9、填色轉紅、對應清單卡加 `.on` 高亮。雙向：hover 卡片也會點亮圖釘。
- **十字準星**：兩條 `stroke-dasharray:3 3` 的紅色虛線，`opacity 0→1`，對位到圖釘座標（讀 `transform` 的 translate 值）。
- **數字滾動計數**：`requestAnimationFrame`，420ms，easeInOutQuad，從 0 滾到目標價。
- **篩選**：即時 `display` 切換，無過場動畫（保持利落）。
- `prefers-reduced-motion`：關閉計數與準星動畫，數字與高亮直接到位。全站 `transition/animation:none`。

## 插畫與圖像風格

全部原創 SVG，線稿風，與網格同語言：

- **街廓地圖**：灰色街道網（1px）＋灰框街廓矩形（1.4px）＋黑框圓形圖釘（hover 轉紅）。schematic，不追求擬真。
- **平面示意圖**：`viewBox 0 0 100 80`，黑色 1.6px 線稿隔間＋一個紅點標示入口／主臥。
- **人物肖像**：幾何化——圓形頭、弧線肩，單一紅色線條當識別特徵。
- 一律無填色照片、無外部圖片；材質感來自紙白底色與 2px 線，不靠貼圖。

## Logo 與 Favicon 設計指南

- **Logo**：一個測量／子午線標記——圓 + 十字線 + 紅色指北三角，右接 Archivo 900 大寫字標與寬字距中文副名。黑線 3px。
- **Favicon**：同標記的方形版，紙白底、黑圓黑十字、紅三角，寫成 inline SVG data URI 放 `<head>`。
- 命名邏輯：品牌名取「座標／方位／網格」意象（Meridian、Grid、Axis、Datum…）呼應製圖主題。

## Do & Don't

**Do**
- 首屏放「可互動的圖或索引」，讓使用者先定位再深入。
- 只用一個紅當訊號色，其餘黑白紙。
- 所有模組對齊 2px 網格，數字放大當主角。
- side-rail 或 masthead 等非 topbar 導覽，強化編排感。

**Don't（含去AI化禁令）**
- ✗ 紫藍漸層 hero、置中大標＋三張圓角卡片模板。
- ✗ 圓角、模糊陰影、玻璃擬態——會瓦解瑞士網格。
- ✗ emoji 當 icon（一律線稿 SVG）。
- ✗ Lorem ipsum 與 AI 腔（「在當今快節奏」）；文案要有具體地址、電話、坪數、價格。
- ✗ 反射式套跑馬燈——本風格的動效簽名是「地圖連動＋數字計數」，不需要捲動橫幅。
- ✗ 紅色濫用（超過三處同框、大面積紅底）。

## 頁面骨架範例

```html
<aside class="rail">
  <a class="brand" href="index.html"><img src="assets/logo.svg" alt="品牌"></a>
  <nav>
    <a href="index.html" aria-current="page"><span class="n">01</span>選屋地圖</a>
    <a href="listings.html"><span class="n">02</span>物件目錄</a>
    <a href="about.html"><span class="n">03</span>關於</a>
  </nav>
  <div class="foot">地址・電話・證號</div>
</aside>
<main>
  <header class="masthd"><h1>大標靠左<br>兩行</h1><div class="meta">右側 meta 數字</div></header>
  <section class="mapgrid">
    <div class="mapcol"><!-- 街廓 SVG + 圖釘 + 十字準星 + 讀值 --></div>
    <div class="mapcol list"><!-- 模組化物件卡（與圖釘雙向連動） --></div>
  </section>
  <section class="facts"><!-- 4 欄統計，Archivo 900 大數字 --></section>
</main>
<div class="disclaimer">本站為設計示範・資料皆為虛構示意</div>
```

CSS 關鍵：`--paper:#F0EDE6;--ink:#14110D;--red:#DA2B1F`；所有分隔 `border:2px solid var(--ink);border-radius:0`；標籤 `.lbl{font-family:Archivo;text-transform:uppercase;letter-spacing:.22em}`。
