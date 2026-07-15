---
name: showa-kissaten
description: A warm Showa-era Japanese bathhouse-and-cafe aesthetic — toned melamine cream ground, moss-green tile and vermillion noren, chunky retro display type, a swaying-noren nav and an operable soroban-abacus configurator.
---

# 昭和喫茶風（Showa Kissaten）

## 設計哲學

回到昭和末期的巷角錢湯與喫茶店：暖簾的錆朱、磁磚牆的苔綠、老冰櫃裡玻璃瓶牛乳的琥珀。這不是冷冽的日式極簡，而是**溫、舊、手作**——melamine 桌面的暖黃、硬邊木牌的位移陰影、そろばん撥珠的觸感。基調溫柔療癒，招呼你慢下來。適合湯屋、喫茶、食堂、老鋪、昭和主題餐飲與零售。

**關鍵：底色不是純白紙感，而是「調過的奶油黃」中間調（melamine cream）。** 大面積使用苔綠與錆朱的深色面板，讓整站是有顏色的、暖的。

## 色彩系統

| 色 | Hex | 用途 | 比例 |
|---|---|---|---|
| melamine 奶油黃 | `#E7CF92` / `#EFDCA8` | 頁面底、卡片底 | 42% |
| 墨褐 | `#26201A` | 文字、粗描邊、footer | 20% |
| 苔綠磁磚 | `#2F5A4E` / `#3E7D6E` | 深色面板、暖簾、水面 | 16% |
| 錆朱 | `#C8452C` | 導覽列、招牌、強調 | 14% |
| 琥珀黃 | `#E0A32B` | CTA、高亮、數字、算盤天珠 | 6% |
| 暖褐線 | `#B89A5E` / `#8C7238` | 分隔、算盤木框 | 2% |

底層可疊一層極淡的 `repeating-linear-gradient`（每 40px 一條 5% 褐線）當作「紙／磁磚縫」質感，再加 1–2 個暖色 `radial-gradient`。

## 字體系統

- 招牌／品牌／數字／標籤：**Reggae One**（圓潤厚重的昭和海報體，覆蓋假名＋基本漢字＋拉丁），用在 logo、價格、區塊小標「メイン湯」等。
- 標題：**Noto Serif TC** 900（繁中明體黑度），承擔中文大標。
- 內文：**Noto Sans TC** 400/500/700。
- 日文假名點綴（のれん、そろばん、ゆ、ごゆっくり）增添 locale，但主體維持繁中可讀。
- 字級：hero `clamp(26px,4.6vw,50px)`、h2 `clamp(23px,3.4vw,38px)`、內文 14–16px、Reggae 數字 15–34px。

## 版面與網格

- 置中 `max-width:1120px`。
- **catalog-first 開場**：首頁不是大標 hero，而是一面「菜單牌」——`grid-template-columns:repeat(4,1fr)` 的商品磚，可穿插 `grid-column:span 2` 的寬磚（深苔綠底）製造節奏。每張磚是 `2.5px solid 墨褐` 圓角小框 + 原創 SVG 小圖 + Reggae 價格。
- 深色橫幅（苔綠）與淺色區段交錯，`border-top/bottom:3px solid 墨褐` 硬分隔。
- 硬位移陰影：hover `box-shadow:5px 7px 0 墨褐` + `translateY(-3px)`；按壓 CTA 時陰影縮小、位移反向（觸感回饋）。

## 元件配方

- **nav（topbar・暖簾のれん）**：錆朱橫條，底 `3px solid 墨褐`。每個連結上方掛一片 `clip-path` 裁出下緣開衩的「布簾」（`.cloth`），`transform-origin:top center`；hover 時 `transform:rotate(-4deg) translateY(2px)` 像被風掀起。相鄰布簾交替苔綠／琥珀。行動版收合為簡單文字列。
- **按鈕／CTA**：錆朱或琥珀底、墨褐粗框、硬位移陰影；hover 上浮、active 下沉吃陰影。
- **商品磚**：奶油底、墨褐 2.5px 框、圓角 4px，右上可貼旋轉 3° 的「名物」小標籤。
- **配置器選項**：單選 `.opt` 選中變苔綠底＋琥珀價；複選 `.add` 用手繪勾勾方框。
- **soroban 帳台**：墨褐深底面板，木框 SVG 算盤 + Reggae 大字總額 + 虛線收據 + 整理券。

## 動效規則

- **暖簾擺盪（signature）**：hover 使布簾 `rotate(-4deg)`，`transition .5s cubic-bezier(.34,1.3,.5,1)` 帶彈性。
- **磁磚水面漣漪（ambient）**：壁畫下緣 `@keyframes rip{from{scale(.2);opacity:.8}to{scale(9);opacity:0}}`，多個錯開 `animation-delay`，5s 無限。
- **そろばん撥珠（signature）**：算盤珠是 SVG `<ellipse class="bead">`，`transition:transform .42s cubic-bezier(.34,1.25,.5,1)`；用 `translateY` 把珠子撥到對應位置。把總額轉成 5 位數字，逐 rod 計算天珠（≥5）與地珠（d%5）位置。**這是「撥珠」不是「滾動數字計數器」**——用物理位移呈現數字。
- 一律提供 `@media(prefers-reduced-motion:reduce)`：關閉漣漪、暖簾擺盪與撥珠過場。

## 插畫與圖像風格

主母題是**磁磚馬賽克壁畫**：用 JS 以 `repeat` 產生數十列 × 數十行的 2px 見方小方塊 `<rect>`，依座標判斷天空／富士山／雪冠／太陽／水面上色，拼出一面錢湯富士山壁畫。其餘圖示（檜木湯、藥湯、牛乳、算盤、暖簾）皆為原創厚描邊 flat-color SVG。**零外部圖片，僅 Google Fonts。**

## Logo 與 Favicon

- Logo：奶油黃圓角方內，三筆錆朱「湯氣」曲線 + 底部一塊錆朱色帶（可放「ゆ」字）。
- Favicon：同母題簡化為 `viewBox 0 0 32 32` inline SVG data URI，錆朱底、奶油白湯氣。

## Do & Don't

- **Do**：底色用調過的奶油黃中間調，不用純白；大面積苔綠與錆朱面板；Reggae One 撐起昭和招牌感；用一個真正可玩的功能（本風以「泡湯套餐配置器＋算盤結算」示範）。
- **Don't**：不要紫藍漸層、不要置中大標＋三卡片、不要 emoji icon（湯氣、算盤都自繪 SVG）、不要 Lorem ipsum。
- **Don't**：不要用「EST. 19xx」年份徽章、不要「把 X 變成 Y」句式標題；創業年份寫進敘事即可。
- **Don't**：不要把「數字滾動計數／描邊揭示」當招牌——本風的招牌是「暖簾擺盪、水面漣漪、算盤撥珠」。

## 頁面骨架範例

```html
<div class="norenbar"><div class="in">
  <a class="brand"><svg>…湯氣 logo…</svg><span class="nm"><b>朝日湯</b><span>ASAHI-YU</span></span></a>
  <div class="noren">
    <a class="on"><span class="cloth"></span><span class="txt">湯品</span></a>
    <a><span class="cloth"></span><span class="txt">泡湯套餐</span></a>
  </div>
</div></div>

<section class="board">
  <div class="head"><h1>掀開暖簾，<em>今天想泡哪一池？</em></h1></div>
  <div class="grid">
    <div class="tile"><span class="tag">名物</span><span class="ico"><svg>…</svg></span>
      <span class="jp">ひのき湯</span><span class="nm">檜木大浴池</span><span class="pr">¥480</span></div>
  </div>
</section>
```

CSS 變數起手式：

```css
:root{--cream:#E7CF92;--cream2:#EFDCA8;--ink:#26201A;--moss:#2F5A4E;--verm:#C8452C;--amber:#E0A32B;--line:#B89A5E}
body{background:var(--cream);color:var(--ink);font-family:'Noto Sans TC',sans-serif}
h1,h2,h3{font-family:'Noto Serif TC',serif;font-weight:900}
.reg{font-family:'Reggae One',cursive}
```
