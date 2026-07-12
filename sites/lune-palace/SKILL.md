---
name: art-deco-palace
description: A 1930s Art Deco style for cinemas, festivals and luxury culture brands — symmetric geometry, stepped gold frames, sunburst rays and chevrons on a deep plum-black ground, high-contrast Cinzel/Poiret display over Noto Serif TC, with a fullbleed-poster opening, a centered masthead nav, and marquee bulb-chase framing plus fan-reveal on scroll as motion signatures.
---

# 裝飾藝術・戲院版（Art Deco — Palace & Marquee）

> 本 SKILL 定義一整套視覺語言。任何 AI 讀完即可替**任意產業**做出同風格網站——風格不綁定「電影影展」這個題材。月殿影展只是一次示範；同一套語言也能做劇院、爵士酒吧、老飯店、精品錶、香檳品牌或復古百貨。
>
> **核心心法**：Art Deco 不是「加金色漸層」。它是**對稱的幾何秩序＋機械時代的樂觀奢華**：所有元素向中軸對齊，用階梯狀邊框、扇形放射、V 形雪佛龍與細金線構成節奏；深色為底、金為光，紅為戲劇性。克制、挺拔、有儀式感。

---

## 設計哲學

1. **對稱是骨架**：主要區塊沿中軸對稱佈局（刊頭、海報、獎項面板）。不對稱只用在編輯性內文（簡介左右欄），讓對稱與破格形成張力。
2. **階梯與扇形是母題**：邊框做成雙線／階梯退縮；重點區用扇形放射（sunburst）作背景光。這兩者取代圓角卡片與模糊陰影。
3. **深底、金光、紅戲**：背景是近黑的深紫墨，不是純黑；金承擔線條與強調；牛血紅只點在關鍵動作與戲劇時刻。
4. **字是建築**：大寫襯線（Cinzel）挺立如戲院立面，加大字距；幾何無襯線（Poiret One）作日期與標籤。中文用 Noto Serif TC 900 撐起重量。
5. **儀式感的留白**：元素不塞滿；海報四周留黑，讓鎏金框像舞台上的一束光。

## 色彩系統

| 變數 | Hex | 用途 | 大致比例 |
|---|---|---|---|
| `--ink` | `#151019` | 主背景（深紫墨黑） | 60% |
| `--panel` | `#1E1728` | 面板／區塊底 | 14% |
| `--panel2` | `#241B32` | 次面板／hover 底 | 8% |
| `--gold` | `#C7A24B` | 線條、邊框、標籤主色 | 8% |
| `--gold2` | `#E7D294` | 標題強調、金光高光 | 4% |
| `--crim` | `#8E2233` | 戲劇性強調、主要按鈕 | 3% |
| `--cream` | `#F0E6CA` | 內文文字 | 文字 |
| `--muted` | `#B4A6C0` | 次要文字（帶紫調灰） | 文字 |
| `--blue` | `#20406E` | 第二強調（修復經典色標） | 1% |

原則：背景永遠是深色；金是「線與光」不是大色塊；紅出現得越少越貴。避免純黑 `#000` 與純白 `#fff`——都用帶調性的深紫墨與奶油色。

## 字體系統

- 來源：Google Fonts。`Cinzel`（500/700/900，Deco 大寫襯線）、`Poiret One`（幾何 Deco 無襯線）、`Noto Serif TC`（400/700/900，中文標題）、`Noto Sans TC`（300/400/500/700，中文內文）。
- 級距（clamp 流體）：巨標題 `clamp(3rem,11vw,6.6rem)`／區塊標題 `clamp(1.9rem,5vw,3.2rem)`／內文 1rem／標籤 .6–.72rem。
- 字重與行高：中文標題 900、內文 300（Deco 講求纖細對比粗金線）、行高內文 1.7–1.85。
- 字距：所有 Cinzel／Poiret 標籤加 `letter-spacing:.2em–.5em`、`text-transform:uppercase`；這是 Deco 的招牌。

## 版面與網格

- 中軸對稱：海報、刊頭、獎項面板置中；`display:grid;place-items:center`。
- 編輯破格：簡介用 `1.15fr .85fr` 不等寬雙欄，標題齊左、事實卡靠右。
- 單元格：`repeat(auto-fit,minmax(230px,1fr))`，格線用 2px 金色間隙（父層底金、子層底深色，靠 `gap:2px` 露出金線）。
- 留白：區塊上下 `clamp(60px,9vw,110px)`；海報四周留黑至少 8vh。
- 無圓角（`border-radius:0`）、無模糊陰影作為分區；分區靠 1–2px 金線與深淺面板。

## 元件配方

- **刊頭 nav（masthead）**：`position:sticky`；上下各一組「2px 金實線＋1px 細線」；中列 `justify-content:center`，戲院名置中、選單左右分列、左端擺 emblem。hover 時 `border-bottom` 轉牛血紅。
- **海報開場（fullbleed-art）**：`min-height:92vh;display:grid;place-items:center`；背景 `repeating-conic-gradient` 做放射光、`radial-gradient` 做暈邊聚光；中央鎏金階梯框 + 燈泡框。
- **燈泡框**：框的 `::before/::after` 用 `radial-gradient` 圓點鋪成一排燈泡，`background-size:22px 14px`，以 `@keyframes chase` 平移 `background-position-x` 做追逐光；兩側用 `.bside` 元素同法直向鋪。
- **按鈕**：方角、1.5px 金框、`letter-spacing:.2em` 大寫；主要動作填牛血紅、hover 轉金底黑字。
- **票根卡**：直式，中段一條 `dashed` 撕票線，兩端用兩個 `border-radius:50%` 的背景色圓形挖出孔洞；hover 上浮 + 金色光暈陰影。
- **時刻表列**：`grid-template-columns:96px 1fr 130px`（時間／片名資訊／影廳），列間 1px 金線，hover 換面板底；單元色標用不同邊色的 `.pill`。
- **footer**：頂 2px 金線；`1.4fr 1fr 1fr` 三欄；標題 Cinzel 大寫加字距、金色。

## 動效規則

- **燈泡追逐光（signature）**：`@keyframes chase{0%{background-position-x:0}100%{background-position-x:22px}}`，`animation:chase 1.1s steps(2) infinite`。用 `steps()` 讓燈泡「一格一格」跳，像真的戲院跑馬燈，而非平滑滑動。
- **扇形／円月進場揭示（signature）**：元素初始 `clip-path:polygon(50% 100%,50% 100%,50% 100%)`（收攏成一點），進場加 `.in` 後展開成完整矩形，`transition:clip-path .9s cubic-bezier(.2,.7,.2,1)`——像扇子／幕布展開。
- **放射光緩轉**：海報 sunburst `animation:spin 90s linear infinite`，極慢，只作氛圍。
- **捲動揭示**：`IntersectionObserver`（threshold .14）為 `.rv` 加 `.in`，位移 26px + 淡入 .7s。
- **hover**：卡片上浮 6px；列與格換底色 .25s；按鈕反色 .25s。
- **降級**：`@media (prefers-reduced-motion:reduce)` 一律關閉 spin／chase／clip 與位移，直接顯示終態，`scroll-behavior:auto`。
- 動效克制：整站同時運動的元素少，重點是「一束光在動」而非滿屏動。

## 插畫與圖像風格

- 全部原創 SVG／CSS：月相（crescent）、扇形放射、階梯框、雪佛龍、票根孔洞、戲院平面圖。
- 電影劇照用「幾何海報化」處理：以三角、圓、色塊構成抽象片格，配色取自調色盤，切忌照片感。
- 平面圖用細金線 + 深面板 + 牛血紅座標，維持 Deco 製圖感。
- 禁止外部點陣圖；需要質感時用 conic/radial gradient 與 1px 線。

## Logo 與 Favicon 設計指南

- **Logo**：階梯雙線外框內置「扇形放射 + 円月 + 大寫片名（Cinzel 900，字距 .3–.4em）」，金色描線於深底；底部左右各一個雪佛龍。
- **Favicon**：inline SVG data URI，深底方塊 + 金色戲院立面框 + 中央金色月相；線寬 2，於 16–64px 皆可辨識。
- 金色可用 `linearGradient`（上 `#E7D294` → 下 `#C7A24B`）模擬鎏金。

## Do & Don't

**Do**
- 中軸對稱、階梯邊框、扇形放射、細金線、大寫加字距。
- 深紫墨底＋鎏金線＋牛血紅點綴；纖細內文對比粗金線。
- 讓「一束光」動起來（燈泡／放射／幕布），其餘保持靜止儀式感。

**Don't（含去AI化禁令）**
- ✗ 紫藍漸層 hero、置中大標＋三張圓角卡片模板。
- ✗ 圓角 + 模糊陰影卡片；改用方角 + 金線分區。
- ✗ emoji 當 icon；一律自繪 SVG。
- ✗ 純黑純白、預設無個性字體；務必用 Cinzel/Poiret + Noto Serif TC 並加字距。
- ✗ 濫用跑馬燈：本風格的「燈泡追逐」是戲院語彙的一部分才成立；不要再加一條捲動文字 ticker，避免反射式套用。
- ✗ Lorem ipsum 或 AI 腔文案；用具體片名、導演、國別、片長、票價。

## 頁面骨架範例

```html
<!-- 刊頭導覽 masthead -->
<header class="mast">
  <div class="rule"></div><div class="rule thin"></div>
  <div class="mrow">
    <a class="emblem" href="index.html"><!-- inline svg 月相框 --></a>
    <a class="link" href="index.html">影展</a>
    <a class="link" href="programme.html">節目</a>
    <div class="mtitle"><b>品牌名</b><em>Latin Name</em></div>
    <a class="link" href="tickets.html">售票</a>
    <a class="link" href="#about">關於</a>
  </div>
  <div class="rule thin"></div><div class="rule"></div>
</header>

<!-- 滿版海報開場 fullbleed-art -->
<div class="poster">
  <div class="sunburst" aria-hidden="true"></div>
  <div class="poster-inner">
    <div class="frame">
      <span class="bside l"></span><span class="bside r"></span>
      <p class="edition">第七屆 ・ Seventh Edition</p>
      <svg class="moon" viewBox="0 0 60 60"><path d="M30 6a24 24 0 1 0 14 43A19 19 0 1 1 30 6z" fill="#E7D294"/></svg>
      <h1 class="pt">品牌名<span class="en">LATIN</span></h1>
      <p class="pdate">日期</p>
      <div class="cta"><a class="btn" href="#">次要</a><a class="btn solid" href="#">主要</a></div>
    </div>
  </div>
</div>
```

```css
:root{--ink:#151019;--gold:#C7A24B;--gold2:#E7D294;--crim:#8E2233;--cream:#F0E6CA}
.frame::before{content:"";position:absolute;top:-16px;left:-2px;right:-2px;height:14px;
 background:radial-gradient(circle,var(--gold2) 0 34%,transparent 38%);
 background-size:22px 14px;background-repeat:repeat-x;animation:chase 1.1s steps(2) infinite}
@keyframes chase{to{background-position-x:22px}}
.fanrv{clip-path:polygon(50% 100%,50% 100%,50% 100%);transition:clip-path .9s cubic-bezier(.2,.7,.2,1)}
.fanrv.in{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}
@media(prefers-reduced-motion:reduce){.frame::before{animation:none}.fanrv{clip-path:none}}
```

驗收標準：一個從未看過本 Demo 的 AI，只讀本檔即能做出對稱、鎏金、有燈泡追逐與扇形揭示、深紫墨底的 Art Deco 網站——且不落入圓角三卡片模板、不濫用跑馬燈。
