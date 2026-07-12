---
name: editorial-spread
description: A magazine editorial-spread style for studios, journals and slow craft brands — two-page spread grids with a dashed center gutter, high-contrast Fraunces display over Noto Serif TC, folio corners, drop caps and pull-quotes on warm bone paper with sage + terracotta accents, using a hero-less chapter-scroll opening, a running-head topbar, and stroke-drawn SVG line plans on scroll as the motion signature.
---

# 雜誌對開排版風（Editorial Magazine Spread）

> 本 SKILL 定義一整套視覺語言。任何 AI 讀完即可替**任意產業**做出同風格網站——風格不綁定「室內設計」這個題材。STRATA 只是一次示範；同一套語言也能做獨立書店、建築事務所、選物誌、餐廳品牌書、旅遊刊物或年報。
>
> **核心心法**：把網頁當成一本雜誌的跨頁來排。**中縫（gutter）是版面的主軸**，左右兩頁各自成立又互相呼應；頁碼、running head、drop cap、拉頁引言（pull-quote）與圖說（caption）是這套語言的標點。刻意避開「大標 hero 首屏」——改用逐節捲動的章節，像翻雜誌一頁一頁往下讀。

---

## 設計哲學

1. **中縫即結構**：主要版面用 `1fr 1px 1fr`（或 `1.28fr 1px .72fr` 不等寬），中間一條虛線落槽當書縫。內容先分左右頁，再談內部。
2. **無 hero，章節卷軸**：首頁不做置中大標＋按鈕。開場是一組「封面對開」（期號刊頭＋drop cap 開場文＋一張線稿），往下是編號章節 01/02/03 逐一捲出。
3. **層級靠排版不靠色塊**：drop cap 起段、pull-quote 拉大、caption 縮小加字距、folio 角標定位。顏色克制，紙感為底。
4. **圖是線稿不是照片**：所有視覺都是原創 SVG 線描（平面圖、肖像、地圖），維持刊物插畫的一致手感。
5. **紙的溫度**：底色是帶暖的骨白，不是純白；文字是帶暖的墨黑，不是純黑。

## 色彩系統

| 變數 | Hex | 用途 | 大致比例 |
|---|---|---|---|
| `--paper` | `#EDE9E1` | 主背景（骨白／灰泥） | 68% |
| `--paper2` | `#E5E0D6` | 圖框底、次面板 | 8% |
| `--ink` | `#1A1A18` | 文字、線條、分隔線 | 文字 |
| `--slate` | `#54574F` | 內文次色（冷灰） | 文字 |
| `--muted` | `#75716A` | caption／running head | 文字 |
| `--sage` | `#77836E` | 主強調（連結、填色、標籤） | 4% |
| `--terra` | `#B0533A` | 點綴強調（drop cap、引言邊、hover 底線） | 2% |

原則：整體近乎黑白紙感，苔綠承擔「安靜的強調」、陶紅只點在最關鍵處（drop cap 首字、pull-quote 左邊線、nav hover）。兩個彩色都取自自然材料色，維持室內／工藝的溫度。避免純黑純白。

## 字體系統

- 來源：Google Fonts。`Fraunces`（opsz 400/600/900，高對比編輯襯線，作大標與 drop cap／pull-quote）、`Archivo`（400/500/700，grotesque，作 running head／caption／nav／標籤）、`Noto Serif TC`（400/700/900，中文標題與內文襯線）、`Noto Sans TC`（300/400/500/700，中文內文）。
- 級距（clamp）：封面大標 `clamp(2.1rem,5.6vw,4rem)`／章節標題 `clamp(1.5rem,3.6vw,2.4rem)`／pull-quote `clamp(1.3rem,2.8vw,1.9rem)`／內文 1rem／caption .56–.62rem。
- drop cap：段落 `::first-letter` 放大約 3.4–3.6em、`float:left`、陶紅色。
- 字距：所有 Archivo 標籤 `letter-spacing:.14em–.32em`＋`text-transform:uppercase`（running head、caption、nav、folio 說明）。

## 版面與網格

- 對開：`.spread{display:grid;grid-template-columns:1fr 1px 1fr;gap:clamp(24px,4vw,56px)}`；中縫 `.gutter` 用 `repeating-linear-gradient` 做虛線、`opacity:.4`。
- 封面對開可不等寬（`1.28fr 1px .72fr`），大標與 drop cap 在寬頁、線稿在窄頁。
- 期號刊頭：頂部 `justify-content:space-between` 的一行（左：刊物名／單元；右：期號日期），下壓 2px 實線。
- 章節：每節 `border-top:1px solid`，章號 `.chno` 用超大 Fraunces 900＋`-webkit-text-stroke`（描邊空心字）＋章名並排。
- folio 角標：卡片右上 `position:absolute` 的頁碼（如「— 041」），Fraunces 900、苔綠。
- 留白：區塊上下 `clamp(48px,8vw,96px)`；欄內行高 1.8–1.95。
- 無圓角、無陰影分區；分區一律靠 1–2px 實線與虛線中縫。

## 元件配方

- **topbar（含 running head）**：兩層——上層 running head（刊物名／期號，Archivo 大寫加字距、極小）＋下層 logo 與 nav。sticky、底部 1px 實線。nav 連結 hover 時 `border-bottom` 轉陶紅；CTA 為 1px 方框、hover 反黑。
- **drop cap 段落**：`p.drop::first-letter{font-size:3.6em;float:left;color:var(--terra)}`。
- **pull-quote**：Fraunces 900、左邊 2px 陶紅線、`padding-left:20px`。
- **平面線框**：`.planframe` 1px 墨框＋`paper2` 底＋內距；下方 `figcaption` 兩端對齊（圖名／比例尺）。
- **服務／規格清單**：`grid-template-columns:auto 1fr auto`（編號／名稱＋副說明／費用），列間 1px 淡線。
- **材料色票列**：`.sw` 34×34 方塊（1px 墨框）＋下方 Archivo 小字材料名。
- **團隊卡**：`repeat(auto-fit,minmax(210px,1fr))`＋`gap:2px` 露出墨線；肖像為原創 SVG 線描（圓頭＋肩線＋一筆表情）。
- **footer**：頂 2px 實線；一行三段 Archivo 大寫小字（刊名／地址或連結／虛構聲明）。

## 動效規則

- **平面線稿描繪（signature）**：SVG path 設 `stroke-dasharray:var(--len);stroke-dashoffset:var(--len)`，進場加 `.drawn` 後 `stroke-dashoffset:0`，`transition:stroke-dashoffset 2–2.2s ease`。`--len` 依路徑長度估給（矩形周長、線段長）。房間填色 `.plfill` 延遲 `.opacity` 淡入至 .14。
- **章節揭示**：`IntersectionObserver`（threshold .14–.16）為 `.rv` 加 `.in`，位移 22px＋淡入 .7s。同一個 observer 也給 `.planframe` 加 `.drawn` 觸發描繪。
- **hover**：nav／連結底線轉陶紅；卡片內線稿與色票靜態，克制不浮動（編輯感重穩定）。
- **降級**：`@media (prefers-reduced-motion:reduce)`——`.pl{stroke-dashoffset:0}`（直接顯示完成線稿）、`.plfill{opacity:.14}`、`.rv` 直接顯示、`scroll-behavior:auto`。
- 全站動效只有兩種：捲動淡入與線稿描繪。不用視差、不用自動輪播、不放捲動文字 ticker——編輯排版本身就是重點。

## 插畫與圖像風格

- 一律原創 SVG 線描：住宅平面（牆線 1.4px、房名 Archivo 小字、比例尺）、人物肖像（單線圓頭＋肩弧＋一筆眉眼）、位置示意地圖（街廓格線＋苔綠街廓＋陶紅定位點）。
- 顏色只用調色盤內的墨黑線、苔綠淡填、陶紅點；材料色票可用自然材料色（木、石、藤、鏽鐵）。
- 禁止外部點陣圖與照片；需要「材質」時用 1px 線與淡填，不用漸層。

## Logo 與 Favicon 設計指南

- **Logo**：把品牌意象拆成「疊層」——數條左右錯落的墨色橫條（strata），旁一條陶紅細直線，再接 Fraunces 900 拉丁字與 Archivo 加字距中文。
- **Favicon**：inline SVG data URI，骨白底＋數條墨色橫條＋一條陶紅豎線；16–64px 皆可辨識。

## Do & Don't

**Do**
- 用中縫對開排版；drop cap 起段、pull-quote 拉大、folio 角標定位。
- 首頁走章節卷軸，逐節捲出，不做大標 hero 首屏。
- 平面／肖像／地圖全用原創 SVG 線描；紙感暖白、苔綠與陶紅點綴。

**Don't（含去AI化禁令）**
- ✗ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片的 hero 模板。
- ✗ 紫藍漸層、圓角＋模糊陰影卡片；改用實線與虛線中縫分區。
- ✗ emoji 當 icon、外部照片；一律原創 SVG 線描。
- ✗ 純黑純白與無個性系統字體；務必 Fraunces＋Archivo＋Noto Serif TC 並用 drop cap／pull-quote 建立層級。
- ✗ 捲動文字 ticker、自動輪播、視差；本風格靠排版與線稿描繪，不靠花俏動效。
- ✗ Lorem ipsum 或 AI 腔文案；用具體人名、地址、坪數、工期、材料、費用。

## 頁面骨架範例

```html
<!-- running-head topbar -->
<header class="top">
  <div class="runhead"><span>刊物名・單元</span><span>第 04 期 ・ 台北</span></div>
  <div class="top-in">
    <a class="logo" href="index.html"><b>STRATA</b><span>疊層</span></a>
    <nav><a href="index.html">首頁</a><a href="projects.html">作品</a>
      <a class="cta" href="#contact">預約諮詢</a></nav>
  </div>
</header>

<!-- 章節卷軸開場：封面對開 -->
<section class="cover wrap">
  <div class="issue"><span class="lbl">單元標籤</span><span class="date">第 04 期</span></div>
  <div class="coverspread">
    <div>
      <h1 class="headline">大標<em>強調</em></h1>
      <p class="drop">D 開頭 drop cap 的開場文……</p>
    </div>
    <div class="gutter"></div>
    <figure class="planframe">
      <svg viewBox="0 0 260 260">
        <path class="pl" d="M30 30 H230 V230 H30 Z" style="--len:900"/>
      </svg>
      <figcaption><span>圖版 A</span><span>1:100</span></figcaption>
    </figure>
  </div>
</section>
```

```css
:root{--paper:#EDE9E1;--ink:#1A1A18;--sage:#77836E;--terra:#B0533A}
.spread{display:grid;grid-template-columns:1fr 1px 1fr;gap:clamp(24px,4vw,56px)}
.gutter{background:repeating-linear-gradient(var(--ink) 0 4px,transparent 4px 9px);width:1px;opacity:.4}
.drop::first-letter{font-family:'Fraunces',serif;font-weight:900;font-size:3.6em;float:left;color:var(--terra)}
.pl{fill:none;stroke:var(--ink);stroke-width:1.4;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);transition:stroke-dashoffset 2.2s ease}
.drawn .pl{stroke-dashoffset:0}
@media(prefers-reduced-motion:reduce){.pl{stroke-dashoffset:0;transition:none}}
```

驗收標準：一個從未看過本 Demo 的 AI，只讀本檔即能做出中縫對開、drop cap／pull-quote／folio 齊備、平面線稿隨捲動描繪、暖白紙感的雜誌編輯排版網站——且首頁不落入大標 hero，不用捲動 ticker 或圓角三卡片模板。
