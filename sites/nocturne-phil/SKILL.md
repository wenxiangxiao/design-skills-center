---
name: staff-notation-nocturne
description: A dark, spacious ink-on-staff-paper design system for a contemporary European symphony orchestra, using five-line musical staves as layout structure, solid-ink clefs and notes, halftone dot-screen illustration, and a scroll-driven playhead plus baton-trail signature.
---

# Staff-Notation Nocturne｜夜鳴愛樂設計系統

一套為當代歐陸交響樂團打造的「深夜刻版節目單」視覺系統。核心比喻：整個頁面是一張攤開的五線譜，讀者的捲動就是被演奏的過程。看不見 demo 的 AI，只要照本文即可重建。

## 設計哲學

- **五線譜即版面**：五條 ivory 細線是全站的節奏骨架——作分隔線、作結構、作圖形底。內容坐落於「線與線之間」，如音符落在譜上。
- **墨水的職人感**：譜號、音符、休止符、小節線一律為**實心墨形**（solid ink shape），不是描邊線稿。朱批紅（conductor's red）像老師在譜上的批註，只點在最關鍵處。
- **極疏 = 尊嚴**：大量留白讓每一句文案、每一個音符都能被單獨聆聽。密度極疏是刻意的安靜，不是空洞。
- **嚴肅職人語氣**：文案用繁體中文＋義大利術語（Allegro／Adagio／attacca／Op.），像指揮寫給樂手的話，不誇張、不營銷腔、不 emoji。
- **深夜而非華麗**：靛藍與墨黑的夜色，拒絕金色 Art-Deco 的富麗。這是音樂會開演前那一刻的暗。

## 色彩系統

| 名稱 | Hex | 用途 | 約略比例 |
| --- | --- | --- | --- |
| Ink Black | `#0A0E1A` | 頁面主底 `body` | 55% |
| Midnight Indigo | `#121A2E` | side-rail／footer／卡片與框底 | 25% |
| Staff Ivory | `#E9E3D2` | 五線譜、主文字、音符墨形 | 14% |
| Steel Blue | `#6E8BB0` | 義大利術語、次級標籤、半調點陣 | 4% |
| Conductor's Red 朱批 | `#D6452F` | 讀譜線、hover、重點、委創／首演標記 | 2% |

規則：紅只作 accent，總面積 ≤ 3%；文字主色永遠 ivory 或其半透明（`rgba(233,227,210,.55)`）；分隔線用 `rgba(233,227,210,.14)`。**禁白底、禁米色底、禁金色。**

## 字體系統

- **來源**：Google Fonts。Display serif = `Cormorant Garamond`（400/500/600＋italic）；CJK 內文 = `Noto Serif TC`（300/400/500/600）。無系統預設 stack 兜底作主字體。
- **CSS 變數**：`--serif:'Cormorant Garamond',Georgia,'Noto Serif TC',serif;` 用於西文標題、義大利術語、數字、羅馬數字；`--cjk:'Noto Serif TC','Cormorant Garamond',serif;` 用於中文內文。
- **字級 scale（clamp 流體）**：
  - h1 `clamp(2.4rem,6vw,4.6rem)`／h2 `clamp(2rem,4.6vw,3.4rem)`
  - lead `clamp(1.05rem,1.7vw,1.32rem)`／body `1rem–1.06rem`
  - kicker／標籤 `.68–.82rem`，`letter-spacing:3–6px`，`text-transform:uppercase`
- **字重行高**：內文 `font-weight:300; line-height:1.85`（極疏呼吸感）；serif 標題 `font-weight:500; line-height:1.06–1.1`。義大利術語一律 `font-style:italic` 且用 steel 或 red。

## 版面與網格

- **五線譜作為版面節奏**：每個大段落之間插入一條 `.staff`（`<svg viewBox="0 0 1000 64" preserveAspectRatio="none">` 內含五條 `<line>`，`stroke:ivory; opacity:.42`）。它同時是視覺分隔與「翻頁」動效載體。
- **主容器**：`.shell{margin-left:var(--rail); max-width:1120px; padding:0 clamp(24px,6vw,96px)}`。左側恆留 side-rail 寬度。
- **留白規則**：段落 `min-height:88vh` 級的整屏樂章；`padding:11vh 0`；文字欄寬 `max-width:46–56ch` 絕不鋪滿。留白是主角。
- **極疏密度**：一屏只講一件事（一個樂章＝一個訊息）。避免多欄塞滿；grid 之間用 `1px` 的 ivory-faint 縫線代替粗邊框。
- **斷點**：`≤920px` 多欄轉單欄、facts 轉 2 欄；`≤560px` side-rail 收頂列、`--rail:0`、`body{padding-top:56px}`。

## 元件配方

- **side-rail（左直排導覽）**：`position:fixed; width:132px; background:indigo; border-right:1px solid ivory-faint`。連結用 `writing-mode:vertical-rl`，前置羅馬數字 `.rn`（italic、steel，current 時 red）。頂為 clef-on-staff 標記，底為 `VERHOLM · MMXXVI` 直排。`≤560px` 改 `flex-direction:row` 的頂 bar，連結轉 `writing-mode:horizontal-tb`。
- **按鈕**：方角（**禁圓角**），`border:1px solid ivory; background:transparent; letter-spacing:2px; padding:15px 34px`，serif 字。hover 填 red。ghost 變體用 steel 邊框。無陰影。
- **曲目卡（programme card）**：`grid-template-columns:200px 1fr`，左欄 meta（`op` italic red／`date` serif 2.6rem／`when`／`venue`），右欄標題＋斜體副題＋曲目 `<ul class="repertoire">`（`border-left:2px ivory-faint`，每列 `comp`／`work`／`op` 三段）。卡片以 `border-top:1px ivory-faint` 分隔，**無卡片投影、無圓角**。
- **五線譜分隔線**：見上；`preserveAspectRatio="none"` 讓五線隨寬度拉伸；進場時由 `translateX(-24px); opacity:.2` 過渡到 0／1，模擬翻頁。
- **表單／售票條**：以 `book` grid（4 欄票價，`1px` 縫線）＋ `.callbar`（`tel:` 按鈕＋說明文）呈現；輸入框（若有）用 `background:indigo; border:1px solid ivory-faint; color:ivory`，focus 邊框轉 red，方角。
- **footer**：`margin-left:rail; background:indigo; border-top:1px ivory-faint`。三欄（品牌／樂章索引／售票）＋ `.foot__meta` 一列小字，含紅色斜體免責 `設計示範，虛構樂團。`、建置聲明、版權。

## 動效規則（signature）

1. **playhead（scroll-driven 讀譜線）**：
   - 於 hero 建一張 `<svg viewBox="0 0 1000 200" preserveAspectRatio="none">`：JS 生成 5 條 staff line、3 條 bar line、一列 `note`（`<ellipse>`＋`stem`）。
   - 一條 `#playline`（red，`drop-shadow`）為讀譜線。捲動時計算舞台區進度 `p = (innerHeight - rect.top) / (innerHeight + rect.height)`，clamp 0–1；`x = 40 + p*(W-80)`。
   - 用 `requestAnimationFrame` 節流（`ticking` 旗標）。讀譜線 x 超過某音符 cx 時，該音符 `classList.add('lit','hit')`，220ms 後移除 `hit`（`transform:scale(1.85)` 回落），`lit` 保持 red；倒退捲動則復位。
2. **baton trail（指揮棒游標拖尾）**：hero 上覆一張透明 `<canvas>`（`pointer-events:none`）。`pointermove` 推入座標點，陣列上限 ~14；每幀 `life -= .045` 並過濾，逐段畫線 `lineWidth = 1+5*life`、`strokeStyle = rgba(214,69,47, .55*life)`、`lineCap:round`——一次運弓的衰減。
3. **樂章翻頁位移**：`IntersectionObserver`（threshold .4）令 `.staff` 由 `translateX(-24px)/opacity:.2` 滑回 `0/1`，`transition:.7s cubic-bezier(.2,.8,.2,1)`；卡片可用 `translateY(26px)` 進場。
4. **reduced-motion 降級**：`@media (prefers-reduced-motion:reduce)`：讀譜線凍結在 50% 靜止位置、`canvas{display:none}`、取消翻頁位移與 `scroll-behavior`。JS 開頭讀 `matchMedia('(prefers-reduced-motion: reduce)').matches` 分支。

**主打不可用**：數字 count-up、press-hard 陰影、stroke-dashoffset 描線、通用 fade-in。identity 必須由 playhead＋baton-trail 承載。

## 插畫與圖像風格（halftone 半調網點）

- **半調生成**：以 JS 迴圈鋪 `cols×rows` 的 `<circle>` 網格。每點半徑依到一個「明度中心」的距離遞減：`rad = max(0.4, 4.2*(1-min(dist,1)) + random*0.6)`，`dist = 距離/spread`；opacity 同理由中心向外遞減。顏色用 ivory 或 steel。
- **成形**：用 `<clipPath>` 把點陣裁進樂器／人物輪廓（大提琴、指揮、肖像圓）。點陣是**主插畫技法**——**禁 thin lineart、禁單色實心塊當主圖**。
- **座位圖**：五線作底（低 opacity），同心弧為座位排，各聲部以隨機散點 patch 表示（`patch(cx,cy,n,spread,color)`），紅點標指揮位。
- **譜號／音符實心墨形**：treble clef 以單一 `<path fill>` 的實心形（見 logo.svg）；音符為 `<ellipse rx≈9 ry≈6.5>` 旋轉 `-18°`＋直 `stem` 線；小節線／休止符同為實心 ivory。

## Logo 與 Favicon 設計指南

- **Logo（`assets/logo.svg`）**：indigo 底、五線譜、實心 treble clef（ivory）＋三個朱紅實心音符與 ivory 符桿，右側 serif 字標 `NOCTURNE / PHILHARMONIC · VERHOLM`。設定 `viewBox`，無外部引用、無點陣。
- **Favicon**：`<head>` 內以 inline SVG data URI 呈現——32×32 indigo 底、五條 staff line、實心 treble clef、一枚朱紅音符。ivory on indigo，與 logo 同語彙。**禁 emoji icon、禁外部 .ico。**

## Do & Don't

**Do**
- 五線譜作結構；音符／譜號用實心墨形。
- 深底＋極疏留白；一屏一訊息。
- serif 標題＋義大利術語斜體；繁中內文 300 字重。
- 半調點陣作插畫；紅只點題。
- 方角、細縫線、`prefers-reduced-motion` 降級。

**Don't（去 AI 化禁令）**
- 禁白底／米色頁面底。
- 禁金色 Art-Deco 華麗調。
- 禁圓角軟卡（rounded soft cards）。
- 禁模糊投影（box-shadow blur）當裝飾。
- 禁 thin lineart 作主插畫。
- 禁 emoji icon。
- 禁 Lorem ipsum 與 AI 陳腔（「賦能」「一站式」「打造」等）。
- 禁 count-up 跳動計數當主打動效。

## 頁面骨架範例（可直接複用）

```html
<!-- side-rail -->
<nav class="rail" aria-label="樂章與段落導覽">
  <a href="index.html" class="rail__mark"><!-- clef-on-staff SVG --></a>
  <div class="rail__nav">
    <a class="rail__link" href="index.html"><span class="rn">I</span>樂團 · 序曲</a>
    <a class="rail__link" href="season.html"><span class="rn">II</span>樂季 · 曲目</a>
    <a class="rail__link" href="ensemble.html"><span class="rn">III</span>編制 · 樂手</a>
  </div>
  <div class="rail__foot">VERHOLM · MMXXVI</div>
</nav>

<!-- staff divider -->
<svg class="staff" viewBox="0 0 1000 64" preserveAspectRatio="none" aria-hidden="true">
  <line x1="0" y1="8" x2="1000" y2="8"/><line x1="0" y1="24" x2="1000" y2="24"/>
  <line x1="0" y1="40" x2="1000" y2="40"/><line x1="0" y1="56" x2="1000" y2="56"/>
  <line x1="0" y1="64" x2="1000" y2="64"/>
</svg>

<!-- movement -->
<section class="mv">
  <div class="mv__no"><b>II</b>第二樂章 · Il carattere della stagione</div>
  <h2>標題 <span class="ital">斜體強調。</span></h2>
  <p class="body">嚴肅職人語氣的繁中內文，點綴 Allegro / Op. 43。</p>
  <a class="btn" href="season.html">閱讀樂季曲目 →</a>
</section>

<!-- footer -->
<footer class="foot">
  <!-- 三欄：品牌 / 樂章索引 / 售票 -->
  <div class="foot__meta">
    <span class="disc">設計示範，虛構樂團。</span>
    <span>本站由 Claude Opus 4.8（排程 Agent 自動執行）建置。</span>
  </div>
</footer>
```

```js
/* playhead 核心 */
var p = Math.max(0, Math.min(1, (innerHeight - rect.top)/(innerHeight + rect.height)));
var x = 40 + p*(W-80);
playline.setAttribute("x1", x); playline.setAttribute("x2", x);
/* 音符點亮：x >= note.cx → add('lit','hit')，220ms 後移除 'hit' */
```
