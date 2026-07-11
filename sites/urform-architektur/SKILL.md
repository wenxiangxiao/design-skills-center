---
name: bauhaus-primary
description: Bauhaus Primary — warm-white ground, thick black outlines, and pure red-blue-yellow blocks composed from circle, square, and triangle motifs with playful asymmetry and geometric assembly motion.
---

# 包浩斯三原色風格（Bauhaus Primary）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「建築事務所」這個題材。URFORM 原型建築只是它的一次示範。可換成書店、咖啡、教育、幼兒園、家具、設計工作室、活動、出版等任何需要明亮、幾何、有玩心又有秩序感的品牌。

---

## 一、設計哲學

包浩斯（Bauhaus）誕生於 1919 年的德國威瑪，是一所把藝術、工藝與工業結合的學校。它的平面語言在 1920 年代由 Herbert Bayer、László Moholy-Nagy、Josef Albers、Oskar Schlemmer 等人確立，核心信念是：**形隨機能、幾何即真理、色彩要純粹**。

三個不可動搖的原則：

1. **回到基本形**：圓、方、三角是萬物的原型。所有圖像都能被還原成這三個形，不需要裝飾與擬真。
2. **三原色 + 黑白**：紅、藍、黃是不可再分解的純色（呼應 Kandinsky 把三形對應三色的理論——黃三角、紅方、藍圓，或其變體）。用純色塊製造力量，不用漸層。
3. **理性中帶玩心**：構成是幾何的、對角的、不對稱的，但要有節奏與驚喜。這不是冷冰冰的極簡，而是「有玩心的秩序」。

情緒是「明亮、幾何、篤定、樂觀」。與瑞士國際主義的差異要刻意拉開：**瑞士極簡克制、幾乎不旋轉、只用單一強調色（多為紅黑白）；包浩斯用完整三原色、大量圓方三角、45° 旋轉與更活潑的構成**。做這個風格時如果畫面只剩紅黑白、又不旋轉，就是跑錯棚了。

## 二、色彩系統

主角是**三原色**，靠暖白與黑撐起結構。切忌把三原色調濁或加太多灰。

| 色票 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 暖白 Paper | `#F4F1E9` | 主背景、負空間、卡片底 | 58% |
| 黑 Ink | `#1A1A1A` | 文字、3px 分格線、footer 底、描邊 | 22% |
| 包浩斯紅 Red | `#E63329` | 圓／結構、主要 CTA、重音 | 8% |
| 包浩斯藍 Blue | `#1E4FA3` | 方／動線、次要色塊、focus 外框 | 7% |
| 包浩斯黃 Yellow | `#F5C518` | 三角／光、hover 底、highlight | 5% |

規則：

- **三原色同時在場**是這個風格的靈魂：一個海報級畫面裡紅、藍、黃最好都出現一次，形成三方平衡；但單一小區塊可只用其中一色。
- 三原色是「純色塊」不是背景漸變。**嚴禁任何漸層**，尤其紫藍漸層 hero。要層次時用黑／暖白的實色與粗線，不用陰影。
- 白＝暖白（`#F4F1E9`），不要用純白 `#FFF`（純白會失去包浩斯的紙感與溫度；卡片內部可用 `#FFF` 當微對比，但整頁底色用暖白）。
- 黑線是骨頭：分格、描邊一律 `2–4px solid #1A1A1A`，無圓角。

## 三、字體系統

- **拉丁字／標題／標籤**：`Poppins`（Google Fonts），字重 400／500／600／700。幾何無襯線，圓 O 呼應 Futura 與 1920s 幾何感。標籤、按鈕、metadata 用 `text-transform:uppercase` + `letter-spacing:.14em–.24em`。
- **中文字**：`Noto Sans TC`，字重 400／500／700／900。中文大標用 900，與拉丁 700 相稱。
- 中文內文正常字距、行高放鬆（1.6–1.85）；英文標籤寬字距、大寫。

字級 scale（clamp 響應）：

```
巨型標題 clamp(2.8rem, 8vw, 6rem)     font-weight 900  line-height .96  letter-spacing -.01em
區塊標題 clamp(1.6rem, 3.4vw, 2.4rem)  font-weight 900  line-height 1.1
小標 h3   1.15–1.3rem                   font-weight 700  line-height 1.3
內文      14.5–17px                      font-weight 400  line-height 1.6–1.85
標籤/編號 10–12px                        font-weight 600  大寫 + .14–.24em 字距 (Poppins)
```

行高規則：中文大標壓到 `.96–1.05` 讓字塊結實；內文放到 `1.6–1.85` 保持可讀。標題可齊左，也允許不對稱擺放。英文副標常置於中文大標下方當「注音」。

## 四、版面與網格

- **12 欄網格**是骨架：`grid-template-columns:repeat(12,1fr);gap:22px`。主要區塊用 `grid-column` 明確跨欄，刻意**不對稱**（文字 `1/7`、幾何 `7/13`）。
- **粗黑實線分格**：`3px solid #1A1A1A` 切分區塊與卡片群，共用邊框形成連續網格，無圓角、無陰影。線寬（3px）明顯比瑞士（1.5px）粗，是辨識點。
- **編號系統**：區塊給 `01 / 02 / 03` 編號，用 Poppins；可做成黑底白字小牌（`.label .n{background:#1A1A1A;color:#F4F1E9;padding:1px 7px}`）。
- **45° 對角**：允許且鼓勵斜元素——一條貫穿 hero 的對角黑線、旋轉 45° 的方塊、傾斜的三角。這與瑞士（幾乎不旋轉）明確區隔。旋轉角度優先用 45°／30°／24° 等整數。
- **留白**：section 上下 padding 約 52–56px；卡片內距 18–26px。留白要看起來被計算過。
- **三原色頂帶／底帶**：頁面頂端與 footer 頂端放一條 `10px` 高、紅／藍／黃三等分的色帶，當作全站識別簽名（取代跑馬燈）。

## 五、元件配方

**Nav（masthead）**：`position:sticky;top:0`，暖白底，底部 `3px solid #1A1A1A`。左為 logo（圓方三角三色標記 + Poppins 700 字標 + 中文超寬字距副標），右為大寫寬字距連結。當前頁 `border:3px solid #1A1A1A`；hover 整顆換成黃底（`background:#F5C518`）——即「色塊翻轉」。行動版收成漢堡選單。

**三原色頂帶**：`.band{display:grid;grid-template-columns:1fr 1fr 1fr;height:10px}`，三格分別紅／藍／黃。放在 `<body>` 最上方與 footer 頂。

**按鈕**：無圓角，`3px solid #1A1A1A`，Poppins 大寫寬字距。預設暖白底黑字，hover 翻成黑底白字；主要 CTA 用紅底白字，hover 翻黑。禁圓角與陰影。

**卡片／列表**：不用浮起陰影卡。用**共用粗黑邊框的格子**——群組 `border-left+border-top`，每格補 `border-right+border-bottom`。卡片內含一張原創幾何縮圖（圓方三角三色構成），底部放編號＋標題＋metadata。hover 只把 body 換成 `#FFF` 微亮，不縮放、不浮起。

**規格表**：`2×N` 的粗黑格子表，每格 `key`（Poppins 大寫小字灰）+ `value`（700 黑）。用於作品的地點／年份／類型／坪數。

**狀態／獎項標籤**：`3px` 黑框小牌，大寫。可填紅／藍／黃底（`.tag.red{background:#E63329;color:#fff}` 等）。

**表單／輸入**：白底 `3px solid #1A1A1A` 方框，`focus` 時 `outline:3px solid #1E4FA3;outline-offset:-1px`（藍色 focus）。label 用 Poppins 大寫寬字距。送出鈕用紅底白字。前端做基本驗證與友善回覆訊息（具名、有人味）。

**Footer**：整塊翻黑（`#1A1A1A` 底、暖白字），頂端一條三原色帶。12 欄排品牌區＋連結欄＋聯絡欄＋營業資訊。連結 hover 轉黃。底部細灰線 + 大寫版權列。

## 六、動效規則

明亮但沉穩：以「幾何進場組裝」與「緩慢旋轉」為主，位移小、不彈跳。動效簽名是**構成的重組**與**色塊翻轉**，不用跑馬燈。

| 動畫 | 觸發 | duration | easing | 說明 |
| --- | --- | --- | --- | --- |
| 進場揭示 rv | IntersectionObserver 進入視窗 | .7s | `cubic-bezier(.2,.7,.2,1)` | `opacity 0→1` + `translateY(22px→0)` + `scale(.985→1)`，像幾何塊組裝就位，一次性 |
| 幾何圓旋轉 spin | 常駐（海報／裝飾內） | 30–34s linear infinite | linear | 只轉線框圓，極慢近乎靜止 |
| 構成器重組 | 使用者點按（換色／旋轉/重組） | .5s | `cubic-bezier(.2,.75,.2,1)` | SVG `transform`（rotate 45°）與 `fill` 過渡；重排圓方三角位置與三原色指派 |
| hover 色塊翻轉 | :hover | .16s | ease | nav 換黃底、按鈕反黑、卡片換白底 |
| fill 過渡 | 換色時 | .35s | ease | 形狀 `fill` 在紅／藍／黃間平滑切換 |

原則：無彈跳、無誇張回彈、無視差滾動。**必附降級**：

```css
@media (prefers-reduced-motion: reduce){
  *{animation:none!important;scroll-behavior:auto!important}
  .rv{opacity:1;transform:none;transition:none}
  .spin{animation:none}
}
```

## 七、插畫與圖像風格

**零攝影、零外部圖片**。所有視覺用原創 inline SVG 幾何構成，語彙限定在**圓、方、三角**三母題：

- 基本元素：實心或線框的正圓、正方／長方色塊、等腰／直角三角、對角直線、水平/垂直網格線、小圓點。
- 配色只用紅／藍／黃／黑／暖白，比例呼應 §2；形狀一律 `2–4px` 黑描邊（`stroke-linejoin:round` 讓三角轉角俐落）。
- 構成邏輯：先鋪一組黑色網格線，放一個大線框圓當「舞台」，再讓紅方、藍圓、黃三角在網格上「對話」，加一條 45° 對角線打破靜止。這就是一張包浩斯海報。
- 產業抽象化：建築平面→方塊＋圓天井＋三角屋頂；書店→書背色塊＋圓標；甜點→圓＋三角；教育→三色量體。維持家族感——縮圖用同一套語彙的變體，有的黑底反白、有的三色齊發、有的純線框。
- 地圖／平面圖：黑網格線代表街廓，紅色塊標本址，藍點／黃三角標地標，Poppins 標路名。

避免：漸層、光暈、擬真陰影、emoji、圖庫感插畫、超過三種基本形的複雜圖形。

## 八、Logo 與 Favicon 設計指南

**Logo**（`assets/logo.svg`）：一個「三母題三色」標記 + 無襯線字標。標記做法——並置一個**紅色圓**、一個**藍色方**、一個**黃色三角**，全部 `3–3.5px` 黑描邊、`stroke-linejoin:round`，可略微重疊或錯位營造構成感。字標用 Poppins 700 大寫、寬字距（`URFORM`），下方疊中文名（Noto Sans TC 500，超寬 `.5em+` 字距），中間可加一條 `2px` 黑分隔線。標記本身就是「原型＝三個基本形」的隱喻。

**Favicon**：把標記簡化為 32×32 inline SVG data URI 寫在每頁 `<head>`：暖白底 → `2px` 黑框正方 → 左上紅圓、右上藍方、底部黃三角。範例：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F4F1E9'/%3E%3Crect x='2' y='2' width='28' height='28' fill='none' stroke='%231A1A1A' stroke-width='2'/%3E%3Ccircle cx='10' cy='10' r='6' fill='%23E63329'/%3E%3Crect x='17' y='3' width='12' height='12' fill='%231E4FA3'/%3E%3Cpolygon points='6,29 16,15 26,29' fill='%23F5C518'/%3E%3C/svg%3E">
```

## 九、Do & Don't

**Do**

- 三原色（紅藍黃）＋黑同時登場，暖白打底；用純色塊製造力量。
- 圓／方／三角三母題貫穿全站，母題對應語意（圓＝結構、方＝動線、三角＝光，可依產業改對應）。
- `3px` 黑實線分格、無圓角；不對稱 12 欄構成，允許 45° 對角與旋轉方塊。
- 標題 Poppins/Noto Sans TC 900、標籤大寫寬字距；三原色頂帶當識別簽名。
- 動效以幾何進場、緩慢旋轉、色塊翻轉為主，必附 `prefers-reduced-motion`。

**Don't（含去 AI 化禁令）**

- ❌ 紫藍漸層 hero、任何漸層背景（三原色要純、要平塗）。
- ❌ 「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- ❌ 圓角（`border-radius`）與模糊陰影卡片——本風格一律直角硬邊、粗黑描邊。
- ❌ emoji 當 icon（icon 一律自繪 SVG，語彙限圓方三角）。
- ❌ 跑馬燈／ticker 當作反射動作——本風格用三原色帶＋幾何進場＋構成器承擔動效簽名。
- ❌ 只用紅黑白又不旋轉（那是瑞士國際主義，不是包浩斯）。
- ❌ Lorem ipsum 與 AI 腔；文案要具體、有名字、有數字、有地址。

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
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--paper:#F4F1E9;--ink:#1A1A1A;--red:#E63329;--blue:#1E4FA3;--yellow:#F5C518;--gut:22px;
--geo:'Poppins',Arial,sans-serif;--han:'Noto Sans TC',sans-serif}
body{background:var(--paper);color:var(--ink);font-family:var(--han);line-height:1.6}
.wrap{max-width:1280px;margin:0 auto;padding:0 var(--gut)}
.band{display:grid;grid-template-columns:1fr 1fr 1fr;height:10px}
.band i:nth-child(1){background:var(--red)}.band i:nth-child(2){background:var(--blue)}.band i:nth-child(3){background:var(--yellow)}
.masthead{position:sticky;top:0;background:var(--paper);border-bottom:3px solid var(--ink)}
.label{font-family:var(--geo);font-weight:600;font-size:11px;letter-spacing:.24em;text-transform:uppercase}
.label .n{background:var(--ink);color:var(--paper);padding:1px 7px;margin-right:.7em}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:var(--gut)}
h1{font-family:var(--han);font-weight:900;font-size:clamp(2.8rem,8vw,6rem);line-height:.96;letter-spacing:-.01em}
.btn{font-family:var(--geo);font-weight:600;text-transform:uppercase;letter-spacing:.14em;border:3px solid var(--ink);background:var(--red);color:#fff;padding:12px 20px}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<div class="band" aria-hidden="true"><i></i><i></i><i></i></div>
<header class="masthead"><div class="wrap" style="display:flex;justify-content:space-between;align-items:center;padding:14px 0">
  <a href="index.html"><!-- 圓紅+方藍+三角黃 SVG 標記 + Poppins 字標 --></a>
  <nav><!-- 大寫寬字距連結；hover 換黃底；當前頁 3px 黑框 --></nav>
</div></header>

<main class="wrap">
  <section style="padding:52px 0;border-bottom:3px solid var(--ink);position:relative">
    <span style="position:absolute;top:0;right:38%;width:3px;height:120%;background:var(--ink);transform:rotate(24deg)"></span>
    <div class="grid" style="align-items:center">
      <div style="grid-column:1 / 7">
        <span class="label"><span class="n">原</span>EN LABEL</span>
        <h1>不對稱的<br>巨型標題</h1>
      </div>
      <div style="grid-column:7 / 13;border:3px solid var(--ink);background:#fff">
        <svg viewBox="0 0 360 440"><!-- 網格線 + 線框圓 + 紅方 + 藍圓 + 黃三角 + 45°對角 --></svg>
      </div>
    </div>
  </section>
</main>

<footer style="background:var(--ink);color:var(--paper)">
  <div class="band" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="wrap" style="padding:48px 0">…</div>
</footer>
</body>
</html>
```

驗收標準：一個從未看過 URFORM Demo 的 AI，只讀本 SKILL.md，就能替任何產業做出「一眼認得出是包浩斯」的全新網站——三原色齊發、圓方三角、粗黑分格、不對稱、45° 對角、幾何進場，明亮而沉穩，且明確有別於瑞士國際主義。
