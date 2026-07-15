---
name: relief-brutalist
description: A web-brutalist system for a contemporary relief-print (woodcut) museum — raw concrete panels, heavy black rules, oversized display type and ink-red accents, opening on a fullbleed woodcut poster and navigated by a numbered anchor-index, with original inline-SVG relief prints and hand-pulled colour-misregistration interactions.
---

# 版畫野獸派 · Relief Brutalist

> 一套「粗、黑、印」的視覺語言。骨架不靠 hero 大標＋按鈕，而是讓**一張滿版原創木刻海報**壓印上場；導覽是**編號錨點索引**；識別性由原創凸版版畫（黑主版塊＋雙套色、刀痕、對版）與「套色錯位」互動承擔。適合美術館、版房、印刷工坊、獨立出版、展演空間。

## 設計哲學

1. **媒材即介面**：這是版畫館，網頁就該像一張版畫——粗黑線是刻痕，色塊是套色，噪點是墨粒。設計語言直接複製品牌的製版工序。
2. **滿版開場（fullbleed-art）**：首屏放邊到邊的原創木刻海報，不用「大標＋副標＋兩顆按鈕」。海報自己就是主張。
3. **暴露結構**：格線、分隔、編號、狀態全部攤開。用 2–4px 黑實線切割版面，無圓角、無柔陰影（硬偏移陰影可）。
4. **不能重來**：刀痕是一次性的決定。文案克制、直接、有重量，不寫 AI 腔的形容詞堆疊。

## 色彩系統

| 色票 | Hex | 用途 | 建議比例 |
|---|---|---|---|
| 生宣白 Paper | `#E7E2D6` | 全站背景 | 58% |
| 水泥灰 Panel | `#CFC9BE` | 面板、縮圖底、地圖 | 14% |
| 墨黑 Ink | `#171410` | 線、字、footer、主版塊 | 18% |
| 版畫朱 Red | `#C23A24` | 主套色、強調、狀態、hover | 6% |
| 靛藍 Blue | `#23405B` | 次套色、編號、mono 標籤 | 4% |

**禁止**：純白 `#FFFFFF` 背景（改用生宣白）、紫藍漸層 hero、任何柔焦漸層。

## 字體系統

- **超大顯示字**：`Anton`（400，配 `text-transform:uppercase`，`letter-spacing:.01em`）——英文品牌、footer 大字、鏤空描邊字（`-webkit-text-stroke:2px ink;color:transparent`）。
- **中文標題**：`Noto Serif TC`（700/900），`line-height:1.02–1.03`，海報與展名用 900。
- **標籤／數字／英文小字**：`Space Mono`（400/700），`letter-spacing:.5–3px`，會期、費用、編號一律 mono 對齊。
- **內文**：`Noto Sans TC`（400/700），`line-height:1.65`，段落 ≤48ch。
- 字級：hero 中文標 `clamp(38px,6.4vw,86px)`／頁標 `clamp(40px,8vw,110px)`／H2 `clamp(24px,4vw,52px)`／body `14–18px`／標籤 `11–13px`。

## 版面與網格

- **anchor-index + 內容**：固定左側 `--rail:220px` 錨點索引；右側 `margin-left:var(--rail)`。≤560px 時 rail 變 sticky 頂列、`.idx` 橫向 flex-wrap。
- 區塊之間 `3px solid ink` 實線分隔；多欄用 `display:grid` + `gap:3px` + `background:ink`，靠縫隙露出黑線做「拼版」感。
- **不對稱**：文字欄常偏左並帶 `.kick` 標籤盒，圖／海報偏右或滿版。硬偏移陰影 `box-shadow:12px 12px 0 ink`（絕不模糊）。
- section padding `clamp(24px,4vw,60px)`。表格列 grid 欄寬用固定 px + 1fr 混合。

## 元件配方

- **anchor-index nav**：品牌 mark＋字標置頂（下 `3px` 黑線）；`.idx a` 每列 `編號 n + 標題 t`，`border-bottom:2px`；hover 反黑、`.on` 反朱（捲動高亮）。下方 `.ext` 為外部頁連結（檔期總表／工作坊），當前頁 `.cur` 反靛藍。
- **fullbleed 海報**：`.poster` 寬 100%、高 `clamp(420px,72vh,760px)`，內含 `preserveAspectRatio="xMidYMid slice"` 的 SVG 木刻；底部 `.band` 黑條放會期／票價，`3px` 朱線壓頂。
- **作品格 .art**：`figure` 3px 黑框，內 SVG 分 `.spot`（主版）／`.spot-r`／`.spot-b`（套色層）；hover 時朱層 `translate(-4px,3px)`、靛層 `translate(4px,-3px)` 製造錯位。
- **表格列 .ex/.course/.prow**：grid 欄，`head` 反黑或反灰，`3px` 底線；hover 換水泥灰底；狀態 `.tag` 用 mono 小框，現展／額滿反朱。
- **按鈕**：`3px solid ink`、mono 700、`box-shadow:6px 6px 0 ink|red`，hover 位移 `translate(2px,2px)` 縮陰影。無圓角。
- **footer**：墨底，`Anton` 巨型 `WILDFIRE PRESS`（FIRE 反朱）、三欄索引、底部 mono 版權與 `作品與資料皆為虛構示意` 免責。

## 動效規則

| 動效 | 觸發 | duration / easing |
|---|---|---|
| 海報「木版壓印」揭幕 | 載入 | `clip-path:inset(50%…)→inset(0)`，`1s cubic-bezier(.22,.61,.15,1)` |
| 作品套色錯位（misregistration） | hover / focus-within | `.35s cubic-bezier(.2,.7,.2,1)`，朱靛層反向位移 3–4px |
| 錨點索引 active 高亮連動 | 捲動（IntersectionObserver, `rootMargin:-45% 0 -45%`） | 即時 class 切換 |
| 墨粒噪點 | 常駐 | `feTurbulence` fixed overlay，`opacity:.16;mix-blend-mode:multiply` |

全部包在 `@media(prefers-reduced-motion:reduce)`：關閉 animation／transition，海報直接顯示 `inset(0)` 完成套準狀態、套色層 `transform:none`。

## 插畫與圖像風格（woodcut 版畫）

- 一律**凸版木刻風**：黑色主版塊（key-block）為主，疊 1–2 個 spot 色（朱 `#C23A24` / 靛 `#23405B`），刻意留白處露生宣白底。
- **粗**，不用細線稿：形以大色塊切出；細節用 `stroke-width:2–6px` 的白色或黑色 chatter（碎刀痕）刻畫，非流暢曲線。
- **對版感**：角落畫 `#23405B` 對版十字、色塊間允許輕微錯位；hover 時放大錯位。
- 題材取自品牌真實母題：野火山景、負火者、夜鴉、抽象裂版、群像、新芽、活字。全部手寫 inline SVG，`overflow:hidden` 於 `figure`。
- 縮圖版可套 `filter:grayscale(1)` 表示過往展。

## Logo 與 Favicon 設計指南

- **Logo**（`assets/logo.svg`）：方框內火焰主版塊（黑）＋內層朱色火焰略微出格、碎刀痕與角落靛藍對版十字；右側 `Noto Serif TC 900` 的「野火」＋朱色橫槓＋`Space Mono` 的 `WILDFIRE PRESS`。
- **Favicon**：生宣白底方塊、`3px` 黑外框、黑色火焰＋朱色內焰的迷你木刻 mark，inline SVG data URI 寫在每頁 `<head>`（`%23` 編碼 `#`）。

## Do & Don't

**Do**：滿版木刻海報開場、編號錨點索引、粗黑實線分割、原創凸版版畫、套色錯位互動、mono 數字對齊、硬偏移陰影、克制有重量的文案、墨粒噪點。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋兩顆按鈕＋三張圓角卡 ❌ emoji 當 icon（只用手繪 SVG）❌ 圓角 2xl 模糊陰影卡 ❌ 純白背景 ❌ 細線稿插畫 ❌ Lorem ipsum 或 AI 腔文案。

## 頁面骨架範例

```html
<div class="grain"><svg><filter id="gr"><feTurbulence baseFrequency=".9"/></filter><rect filter="url(#gr)"/></svg></div>
<aside class="rail">
  <a class="brand"><svg>…火焰木刻 mark…</svg><b>野火</b></a>
  <nav class="idx">
    <a href="#now"><span class="n">00</span><span class="t">現展</span></a>
    <a href="#program"><span class="n">01</span><span class="t">檔期</span></a>
    <a href="#types"><span class="n">02</span><span class="t">版種</span></a>
    <a href="#visit"><span class="n">03</span><span class="t">參觀</span></a>
  </nav>
  <div class="ext"><a href="exhibitions.html">檔期總表</a><a href="workshop.html">工作坊</a></div>
</aside>
<main class="wrap">
  <section class="hero"><div class="poster press"><svg preserveAspectRatio="xMidYMid slice">…滿版木刻海報…</svg></div></section>
  <section id="now" class="now">…現展＋《作品》side…</section>
  <section class="wall">….art（.spot / .spot-r / .spot-b 套色錯位）…</section>
  <section id="types">…四版種…</section>
  <section id="program">…檔期表…</section>
  <section id="visit" class="visit">…參觀資訊＋地圖…</section>
</main>
<footer>…Anton 巨字＋三欄＋作品與資料皆為虛構示意…</footer>
```

配色、字體、粗黑格線比例照上表即可產出風格一致的全新網站——換產業（獨立出版、印刷工坊、展演空間）只需替換文案與 woodcut 母題，骨架不動。
