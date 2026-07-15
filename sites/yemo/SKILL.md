---
name: copperplate-botanical-almanac
description: A copperplate botanical-almanac style for florists, farm shops, herbalists and seasonal craft brands, built from static copperplate-engraving cross-hatch illustration on a toned mid-tone ground, whose signature is an organic ink-bleed wash that blooms outward from each flower’s heart on hover (scale + soft blur), opened by a newspaper-style masthead front page and driven by a seasonal almanac that swaps featured subject and palette by solar term.
---

# 交叉排線花曆・自然有機（Hatching Almanac Organic）

一套為花店、農產直售、香草／中草藥、季節性手作品牌設計的視覺語言（屬版畫／復古印刷家族，非柔性極簡）。它把整個網站當成一本「銅版植物誌花曆」：所有圖像都是銅版蝕刻風的交叉排線——輪廓 key 線＋在 clipPath 內逐線「刻深」的排線陰影。開場是報頭前頁（masthead），招牌互動是**hover 時交叉排線一線一線描進、把陰影刻深**，模擬雕版上墨。溫暖、紙感、順著節氣。零外部圖片。

## 設計哲學

1. **當令即內容**：不追求「永遠盛開的完美花」。網站結構跟著季節翻頁——過期的美感是刻意的。
2. **線稿＋排線＋野墨**：輪廓 key 線與交叉排線陰影恆在（雕版本體）；互動時墨色由花心向外暈開滲入紙面（野墨），像墨滴落在濕紙上。動的是墨，不是線。
3. **toned 紙感勝過螢幕感**：調墨橄欖底（避開全館過載的米白）＋顆粒噪點＋2px 實線與 3px 雙線框＋drop cap＋無圓角。整體像印在有色紙上的植物圖鑑。
4. **一物一版**：每個主題（花／作物／藥材）對應一塊可重複使用的 SVG：輪廓 key＋clipPath＋交叉排線。

## 色彩系統

| 用途 | Hex | 比例 |
|------|-----|------|
| 調墨橄欖底（mid-tone 背景） | `#A7AE82` | 44% |
| 深橄欖（卡片 / 圖底） | `#9BA374` | 14% |
| 墨黑（key 輪廓 / 文字 / 框） | `#1E1A15` | 20% |
| 苔綠（次要 / footer / 深底） | `#445039` / `#33402D` | 10% |
| 茜紅（春 accent / 價格 / drop cap） | `#9E3D22` | 5% |
| 赭黃（夏 accent / 強調鈕） | `#B57414` | 3% |
| 米線（深底標籤 / 分隔） | `#DDD8C2` | 2% |
| 橄欖線 | `#7E855C` | 分隔線 |

**季節 accent 切換**：`--accent` 為 CSS 變數，四季各一色（春茜紅、夏赭黃、秋磚橘、冬松綠）。切季時同步改標籤色、選中態、排線顏色（`currentColor`）。

## 字體系統

- **顯示 / 英文 / 斜體標籤**：`Fraunces`（opsz 光學尺寸襯線）。頭條用 900、大字級 clamp(28px→88px)、字距 -.015em；斜體 500 用於 kicker、latin 學名、dateline、eyebrow。
- **中文本文與標題**：`Noto Serif TC` 400/600/700。標題 700 搭 Fraunces 大字（中英分行），本文 400 苔墨色、行高 1.85；前頁首段用 `::first-letter` drop cap（accent 色）。
- 中英混排時英文交給 Fraunces（`.en`），中文交給 Noto Serif TC（`.cjk`），常見於「In Season.（換行）當令，才上桌。」的雙語頭條。

## 版面與網格

- **masthead 刊頭＋報頭前頁開場**：頂端 top-bar（卷號＋地點斜體）→ 置中字標 Logo＋斜體 tagline → 置中 nav（`border-right` 分隔、current 反白）→ 3px 雙線分隔。緊接一個報頭「前頁」：dateline（節氣號／版次）＋左欄大頭條與 drop cap 導言、右欄一塊帶圖說（`Fig. 1 — …`）的排線標本圖。整體像報紙頭版，不是滿版大圖。
- 主內容 `max-width:1120px`。區塊之間 2px 墨線分段。卡片網格三欄（→ 手機單欄）。
- 紙張顆粒：`body` 疊一層 inline SVG `feTurbulence`（去飽和、opacity .05）。

## 元件配方

- **按鈕**：`.btn` 赭黃底＋墨字＋2px 墨框；`.btn.line` 透明＋墨框。hover 翻成墨底紙字。無圓角。
- **卡片 / 商品磚**：2px 墨框、深紙底；上圖下文；圖區疊細橫線（模擬印刷紙紋）。hover 觸發排線刻深。
- **季節花曆（招牌）**：`role="tablist"` 的季節橫列（選中態 accent 底）＋`.feature`（左排線 art、右文字卡）。切季用 JS 換文字＋`art.innerHTML=BLOOMS[key]`＋改 `--accent`。
- **深色理念帶（creed）**：墨黑底、紙色字、大 Fraunces 引言＋三欄理念，換色喘息。
- **footer**：苔綠深底、紙色字、三欄（品牌／到訪／連結）＋斜體 credit 尾註。

## 動效規則

- **野墨暈染（招牌）**：花材 SVG 分三層——`.wash`（花形色塊 `fill:currentColor`，底層，預設 `opacity:0; transform:scale(.2); filter:blur(2.6px)`）、`.hatch`（`clip-path` 花形內兩向平行線，墨色**靜態恆顯** `opacity:.34`）、`.key`（墨色輪廓，頂層恆顯）。hover（或 `.reveal`）→ `.wash` `opacity:.9; transform:scale(1)`，`transform-box:fill-box; transform-origin:center`，transition .65s cubic-bezier ease-out＝墨由花心向外暈開滲入。刻意避開全館過載的描線／計數／按壓動效。
- **季節翻頁**：切 tab 時 `art` 先移除再加回 `.reveal`（強制 reflow `void offsetWidth`），讓新花重新「刻一次」；同時所有文字欄位淡換。
- **前頁視差**：`mousemove` 讓前頁圖說框角落的排線葉叢 translate 極小量（-14px/-10px），輕搖。
- **降級**：`prefers-reduced-motion` 下野墨暈染直接定格（`opacity:.9; scale(1)`）、停用視差與所有 transition。

## 插畫與圖像風格

- 全部 **inline SVG 交叉排線雕版**：`.key`（墨色輪廓 `stroke-width:2.2`）＋`clipPath`（花形剪裁）＋`.hatch`（clipPath 內兩向 35°/-35° 平行線群，靜態墨色陰影）＋`.wash`（花形色塊，供野墨暈染動效）。
- 排線用程序生成的 `<line>` 群，靠 `clip-path` 限制在輪廓內，形成雕版陰影；深色場景（工作圖、肖像）則以墨／paper 線稿＋局部 clip 排線構成。
- 造型走雕版簡化：厚實花瓣輪廓、放射尖瓣（向日）、同心圓（大理花）、粗莖與蕨裂葉。避免細膩單線寫實描（那是 thin-lineart，別的風格）。

## Logo 與 Favicon 設計指南

- **Logo**：一枚銅版印章——碳黑方章內刻花＋排線刻痕，右側襯線字標「野墨花室 / Wild Ink Floral」（不放 EST 年份徽章）。
- **Favicon**：32×32 inline SVG data URI，墨底一朵輪廓花＋紅心（`stroke` 線稿呼應排線語彙）。

## Do & Don't

- ✅ 輪廓＋靜態排線恆在；hover 讓野墨由花心暈開上色（動的是墨不是線）。
- ✅ 用報頭前頁（masthead）開場，讓網站像一份會換季的印刷花曆。
- ✅ 紙感優先：手工紙底、顆粒、實線／雙線框、drop cap、襯線字、無圓角。
- ✅ 圖像全用 inline SVG 交叉排線；換產業時換「被刻的主題」（花→蔬果→藥草→麵包）。
- ❌ 不要照片、不要漸層、不要圓角模糊陰影卡、不要 emoji icon。
- ❌ 不要細線單線描（thin-lineart）——那會變成另一種風格；排線要成群、要有陰影密度。
- ❌ 不要 Lorem ipsum、不要 AI 腔文案；文案要具體（花名、學名、產季、價格、巷弄地址）。

## 頁面骨架範例

```html
<header class="masthead">
  <div class="top"><span class="en">Vol. 09</span><span class="en">城市 · 街區</span></div>
  <div class="name"><a href="index.html"><img src="assets/logo.svg" alt=""></a>
    <div class="tag">副標語</div></div>
  <nav><a href="index.html" aria-current="page">花曆</a><a href="bouquets.html">花禮</a></nav>
</header>
<section class="front">
  <div class="dateline"><span class="en">節氣號</span><span class="en">第一版 / 頭條</span></div>
  <div class="lead">
    <div><h1 class="en">In Season.<span class="cjk">當令，才上桌。</span></h1>
      <p class="cjk drop">導言首字放大…</p></div>
    <div class="plate"><svg class="bloom reveal" viewBox="0 0 120 120">
      <defs><clipPath id="cp"><!-- 花形 --></clipPath></defs>
      <g class="wash" fill="currentColor"><!-- 野墨色塊（暈染） --></g>
      <g class="hatch" clip-path="url(#cp)"><!-- 靜態交叉排線陰影 --></g>
      <g class="key"><!-- 輪廓，恆顯於頂 --></g>
    </svg></div>
  </div>
</section>
```

驗收：一個沒看過 Demo 的 AI，只讀本檔即能做出同為「交叉排線花曆」語言、但主題不同（例：小農蔬果直售、漢方藥草舖）的一致風格新站，且招牌的「野墨暈染」與「季節翻頁」互動齊備、鋪在 toned 中間調底上（非米白）。
