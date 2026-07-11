---
name: swiss-international
description: Swiss International Typographic Style — strict column grids, flush-left ragged-right neo-grotesque type, objective red-black-white palette, and geometric composition instead of decoration.
---

# 瑞士國際主義排版風格（Swiss International Style）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「美術館」這個題材。RASTER 當代美術館只是它的一次示範。

---

## 一、設計哲學

國際主義排版風格（又稱瑞士風格）誕生於 1950 年代的蘇黎世與巴塞爾，核心信念是**客觀、清晰、系統**。設計師不是自我表現，而是替內容服務：用數學化的網格安排資訊，用中性無襯線體讓文字「隱形」，用最少的色彩製造最強的秩序感。

三個不可動搖的原則：

1. **網格即結構**：頁面先有欄位系統，內容再依附其上。留白是刻意計算的，不是填不滿。
2. **齊左、不齊右（flush-left, ragged-right）**：文字左邊對齊一條硬線，右邊自然參差。幾乎不用置中。
3. **客觀勝於裝飾**：不用漸層、陰影、圓角、擬物。要視覺重量時，用實色塊、粗線、幾何形，而非特效。

設計的情緒是「冷靜、精確、可信」，適合美術館、建築、出版、金融、科技、政府開放資料、學術等需要權威感的題材。

## 二、色彩系統

極度克制。**白底、黑字、單一強調色**是這個風格的靈魂。

| 色票 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 白 Paper | `#FFFFFF` | 主背景、負空間 | 60% |
| 近黑 Ink | `#0A0A0A` | 文字、分隔線、footer 底 | 28% |
| 瑞士紅 Red | `#E1140A` | 唯一強調色：編號、現正狀態、關鍵線條 | 6% |
| 中性灰 Grey | `#8C887E` | 次要文字、標籤、metadata | 4% |
| 淺灰 Pale | `#F1EFEA` | hover 底、幾何塊淡色、分格 | 2% |

規則：

- **只用一個強調色**（此處為紅）。想換題材可把紅換成國際藍 `#0033A0` 或郵政橘 `#FF5100`，但**永遠只留一個**。
- 紅色是「重音」不是「背景」：一個畫面裡紅色出現 1–3 次即可，出現太多就失效。
- 禁止任何漸層（尤其紫藍漸層）。需要層次時用黑／灰／淺灰的實色階。

## 三、字體系統

- **拉丁字**：`Archivo`（Google Fonts）作為近似 Akzidenz-Grotesk／Helvetica 的中性無襯線體。字重 400／500／600／700／800。
- **中文字**：`Noto Sans TC`，字重 400／500／700／900。中文大標用 900，保持與拉丁 800 相稱的力量。
- 標籤、編號、metadata、按鈕一律用 Archivo，`text-transform:uppercase` + `letter-spacing:.12em–.22em`。中文內文用 Noto Sans TC，正常字距。

字級 scale（clamp 響應）：

```
巨型標題 clamp(2.4rem, 6.4vw, 5.4rem)  font-weight 900  line-height .98  letter-spacing -.02em
區塊標題 clamp(1.4rem, 3vw, 2.1rem)    font-weight 900
小標 h3   1.15–1.7rem                   font-weight 700  line-height 1.2
內文      15–17px                        font-weight 400  line-height 1.5–1.7
標籤/編號 10–12px                        font-weight 600  大寫 + 寬字距
```

行高規則：大標壓到 `.98–1.05` 讓字塊結實；內文放到 `1.5–1.7` 保持可讀。標題**齊左**，絕不置中。

## 四、版面與網格

- **12 欄網格**是骨架：`display:grid;grid-template-columns:repeat(12,1fr);gap:24px`。所有主要區塊用 `grid-column` 明確指定跨欄（例：標題 `1 / 8`、幾何圖 `8 / 13`）。
- **不對稱**：內容偏左、留白偏右，或反之。避免任何東西置中對稱。
- **硬分隔線**：`1.5px solid #0A0A0A` 的實線切分區塊，無圓角、無陰影。線是這個風格的骨頭。
- **編號系統**：每個區塊給一個編號（`01 / 02 / 03`），編號用紅色 Archivo。這是瑞士風格的招牌。
- **留白**：section 上下 padding 約 52px；卡片內距 22–40px。留白要「看起來被計算過」，寬度成整數比例。
- **旋轉角度**：本風格**幾乎不旋轉元素**（與孟菲斯／野獸派相反）。唯一允許的斜線是幾何構成裡的對角線（45° 或連接網格交點的直線）。文字一律水平。

## 五、元件配方

**Nav（masthead）**：`position:sticky;top:0`，白底，底部 `1.5px` 黑實線。左為 logo（SVG 方形標記 + 字標），右為大寫寬字距文字連結；當前頁用 `1.5px` 黑框標示（`[aria-current="page"]{border-color:#0A0A0A}`），hover 轉紅字。

**按鈕**：無圓角，`1.5px` 黑實框，Archivo 大寫寬字距。hover 反白（背景轉黑或紅、文字轉白）。主要 CTA 用紅底白字。

**卡片／列表**：不用陰影卡。改用**共用邊框的格子**——整個群組 `border-left+border-top`，每格補 `border-right+border-bottom`，形成連續網格。hover 只把底色換成 `#F1EFEA`，不縮放、不浮起。

**狀態標籤**：小的 `1.5px` 黑框方牌，大寫。「現正展出」用紅底白字，「即將登場」用黑底白字，其餘黑框透明。

**表單／輸入**：方框 `1.5px` 黑框，focus 時 `outline:2px solid 紅;outline-offset:-1px`。步進器（stepper）用三格並排：`−｜數字｜＋`，各格以黑線分隔。

**Footer**：整塊翻黑（`#0A0A0A` 底、白字），12 欄網格排列品牌區＋連結欄＋聯絡欄。連結 hover 轉紅。底部一條細灰線 + 大寫版權列。

## 六、動效規則

克制、機械、精確——動效服務於秩序感，不搶戲。

| 動畫 | 觸發 | duration | easing | 說明 |
| --- | --- | --- | --- | --- |
| 進場揭示 rv | IntersectionObserver 進入視窗 | .7s | `cubic-bezier(.2,.7,.2,1)` | `opacity 0→1` + `translateY(18px→0)`，一次性 |
| 跑馬燈 ticker | 常駐 | 32s linear infinite | linear | 展訊橫向捲動；內容需複製一份無縫接軌 |
| 幾何圓旋轉 | 常駐（海報內） | 26s linear infinite | linear | 只轉線框圓，速度極慢，近乎靜止 |
| 方塊漂移 | 常駐（海報內） | 9s ease-in-out alternate | ease-in-out | `translateY` ±14px，微幅 |
| hover 反色/換底 | :hover | .16–.18s | ease | nav/按鈕反色、卡片換淺灰底 |

原則：位移小、速度慢、無彈跳、無回彈曲線誇張化。**必附降級**：

```css
@media (prefers-reduced-motion: reduce){
  *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .rv{opacity:1;transform:none}
}
```

## 七、插畫與圖像風格

**零攝影、零外部圖片**。所有視覺用原創 inline SVG 幾何構成，語彙限定：

- 基本元素：正圓（實心或 `1.5–3px` 線框）、正方／長方色塊、對角直線、水平/垂直網格線、小圓點。
- 配色只用黑／紅／淺灰／白，比例呼應 §2。
- 構成邏輯：先畫一組網格線，再讓一個紅色塊與一個黑色圓在交點上「對話」，加一條對角線打破靜止。這就是一張瑞士海報。
- 縮圖（展覽卡）用同一套語彙的變體，維持家族感：有的黑底反白、有的紅塊當主角、有的純線框。
- 地圖／平面圖同理：用網格線代表街廓，紅色塊標示本館位置，黑點標示地標，Archivo 標註路名。

避免：漸層、光暈、擬真陰影、emoji、任何圖庫感的插畫。

## 八、Logo 與 Favicon 設計指南

**Logo**（`assets/logo.svg`）：一個「網格方塊」標記 + 無襯線字標。方塊做法——`1.5–3px` 黑框正方，用一條垂直線 + 一條水平線切成四格，其中一格填紅，另一角放一個線框圓。字標用 Archivo 800 大寫、寬字距，下方可疊中文名（Noto Sans TC 500，超寬字距）。標記本身就是「raster（網格）」的隱喻。

**Favicon**：把 logo 的方塊標記簡化為 32×32 inline SVG data URI 寫在 `<head>`：白底 → `1.5–2px` 黑框正方 → 一垂一橫中線切四格 → 左上格填紅。範例：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FFFFFF'/%3E%3Crect x='4' y='4' width='24' height='24' fill='none' stroke='%230A0A0A' stroke-width='2'/%3E%3Cline x1='16' y1='4' x2='16' y2='28' stroke='%230A0A0A' stroke-width='2'/%3E%3Cline x1='4' y1='16' x2='28' y2='16' stroke='%230A0A0A' stroke-width='2'/%3E%3Crect x='4' y='4' width='12' height='12' fill='%23E1140A'/%3E%3C/svg%3E">
```

## 九、Do & Don't

**Do**

- 用 12 欄網格與硬實線建立結構；區塊給編號。
- 文字齊左不齊右；大標壓緊、內文放鬆。
- 只用一個強調色，全站紅色出現次數屈指可數。
- 圖像一律原創幾何 SVG，維持黑／紅／灰家族。
- 動效小而慢，必附 `prefers-reduced-motion`。

**Don't（含去 AI 化禁令）**

- ❌ 紫藍漸層 hero、任何漸層背景。
- ❌ 「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- ❌ 圓角（`border-radius`）與模糊陰影卡片——本風格一律直角硬邊。
- ❌ emoji 當 icon（icon 一律自繪 SVG）。
- ❌ Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）；文案要具體、有名字、有數字。
- ❌ 置中對稱版面、彩虹多色、擬真插畫或圖庫照片。

## 十、頁面骨架範例

可直接改寫使用的最小骨架：

```html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>品牌名｜一句定位</title>
<link rel="icon" href="data:image/svg+xml,...(見 §8)...">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{--paper:#FFFFFF;--ink:#0A0A0A;--red:#E1140A;--grey:#8C887E;--pale:#F1EFEA;--gut:24px;
--latin:'Archivo',Arial,sans-serif;--han:'Noto Sans TC',sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:var(--han);line-height:1.5}
.wrap{max-width:1360px;margin:0 auto;padding:0 var(--gut)}
.masthead{position:sticky;top:0;background:var(--paper);border-bottom:1.5px solid var(--ink)}
.label{font-family:var(--latin);font-weight:600;font-size:11px;letter-spacing:.22em;text-transform:uppercase}
.label .n{color:var(--red)}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:var(--gut)}
h1{font-weight:900;font-size:clamp(2.4rem,6.4vw,5.4rem);line-height:.98;letter-spacing:-.02em}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<header class="masthead"><div class="wrap" style="display:flex;justify-content:space-between;align-items:center;padding:14px 0">
  <a href="index.html"><!-- SVG 方塊標記 + 字標 --></a>
  <nav><!-- 大寫寬字距連結，當前頁加 1.5px 黑框 --></nav>
</div></header>

<main class="wrap">
  <section style="padding:56px 0;border-bottom:1.5px solid var(--ink)">
    <div class="grid" style="align-items:end">
      <div style="grid-column:1 / 8">
        <span class="label"><span class="n">01</span>區塊標籤 / SECTION</span>
        <h1>齊左的<br>巨型標題</h1>
      </div>
      <div style="grid-column:8 / 13;border-left:1.5px solid var(--ink);padding-left:var(--gut)">
        <svg viewBox="0 0 400 400"><!-- 網格線 + 紅色塊 + 黑圓 + 對角線 --></svg>
      </div>
    </div>
  </section>
</main>

<footer style="background:var(--ink);color:#fff;padding:52px 0"><div class="wrap">…</div></footer>
</body>
</html>
```

驗收標準：一個從未看過 RASTER Demo 的 AI，只讀本 SKILL.md，就能替任何產業做出「一眼認得出是瑞士國際主義」的全新網站——網格結實、齊左、紅黑白、幾何構成、零裝飾。
