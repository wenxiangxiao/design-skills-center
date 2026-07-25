---
name: volvelle-almanac
description: An ochre almanac world built on rotating concentric volvelle dials that surface a real Chinese lunisolar calendar engine — sexagenary stems-branches, 24 solar terms, the twelve day-officers, brass tick-rings and vermilion as a reserved semantic ink.
---

# 曆輪星象風 Volvelle-Almanac

## 設計哲學

這套風格把「一部會算的黃曆」做成介面。核心不是插圖也不是版面，而是一具**同心曆輪（volvelle）**——古代紙上天文計算機——三環各承一套曆法刻度，共同對準一根固定的硃紅指針。使用者轉動曆輪即改變日期，所有曆象隨之重算。因此本風格的第一原則是：**刻度即內容，旋轉即查詢**。第二原則是**推算誠實**——頁面上的每一個數（農曆、干支、節氣、值日）都由真實曆法算出，可在「曆法」頁對照複核，不預先寫死。視覺上取活版曆書的重量：芥黃土金為地、骨白為紙、墨為字、硃紅為紅字（宜／吉／現用）、黃銅為刻度。氣質是嚴肅職人的府城擇日館，不是命理恐嚇。

## 色彩系統

| 用途 | Hex | 比例 |
|---|---|---|
| 芥黃／土金 地色（radial 漸深至 #916A18） | `#A67C1F` | ~46% 大面積通版底 |
| 骨白 面板／紙 | `#EFE6CD` | ~26% |
| 骨白次階 面板／分隔 | `#E4D7B6` | ~8% |
| 墨 文字／描邊 | `#1D160B` | ~9% |
| 褐 次級文字／刻度線 | `#5E4E28` / `#7C6A3A` | ~5% |
| 黃銅 刻度環／星線 | `#B9902F` | ~4% |
| 硃紅 語意保留字 | `#C6381E` | **<9%，語意保留** |
| 玉綠 「宜／吉」標籤限定 | `#4E7A46` | <3% |

**硃紅是保留字**：只用於指針、現用態、宜／吉、紅字強調，不當一般裝飾。玉綠只出現在「宜」的條目。狀態不靠彩度氾濫，靠墨值與這兩支保留色。

## 字體系統

- **Noto Serif TC**（400/700/900）：全站漢字。標題 900、鍵值 700、正文 400，行高 1.7。給曆書的重量。
- **Fraunces**（600/900，可 italic）：拉丁標題與品牌副名，帶古典曆書的西文襯線味。
- **Space Mono**（400/700）：西曆日期、干支碼、節氣日期、留位號——凡「讀數」皆走等寬，強調其為算出的值。
- 字級：hero 26px／區塊標 20–23px／正文 15–16px／標籤 11–13px（letter-spacing .1–.4em，全大寫拉丁小標）。

## 版面與網格

- 最大寬 1120px（文件頁收窄至 880px）。內距 22px。
- **不對稱雙欄**：曆輪頁為「曆輪 + 控制」上排、「干支曆象／宜／忌／沖煞」下排 grid；文件頁為單欄長文。
- **硬邊、零圓角**：面板一律 2px 墨框 + `5px 5px 0` 硬陰影（無模糊），與圓角卡片劃清界線。
- 無旋轉版式；旋轉只發生在曆輪本身。留白中等，資訊密度偏實。

## 元件配方

- **masthead**：骨白漸層刊頭，左為程序生成的曆輪徽記（52px），中為「步天曆館」900 + 拉丁副名，右為地址電話 meta。下接 nav。
- **nav（dial-sector 曆盤扇區導覽）**：四頁為一列等寬扇區，`border-right:1px` 分格；現用頁翻硃紅底、骨白字，上緣長出一枚硃紅三角（指針隱喻）。≤560px 折成兩列。避開純 topbar 文字列的 AI tell——它是「曆盤上的四個扇區」，現用扇區被指針點到。
- **按鈕**：`.btn` 墨底骨白字，hover 位移 1px + 硬陰影；`.btn.zhu` 硃紅底；`.btn.ghost` 透明墨字。
- **chip**：1px 線框標籤；`.on` 翻硃紅（宜／選中）。
- **panel**：`.hd` 區塊標為褐色大寫 + 前置 8px 硃方塊。
- **表單**：2px 墨框輸入，`.err` 硃紅即時驗證；三步驟 `.steps` 進度以墨底標記已達步。
- **footer**：三欄（理念／導覽／曆法錨點）+ 跨欄虛線「虛構＋誠實聲明」帶。

## 動效規則

- **曆輪旋轉**：三環 `transform:rotate()`，`transition:.5s cubic-bezier(.2,.7,.2,1)`。切換日期時外圈轉到當日之日序角、中圈轉到月建、內圈轉到值日，三者同時對準頂端指針。
- **拖曳**：pointer/touch 拖外圈，角度差 → 日數差（`Δ角/360 × 該年日數`），即時重算、放手回正。游標 `grab/grabbing`。
- **按壓**：`.btn:hover` `translate(-1px,-1px)` + 3px 硬陰影，`.1s`。
- **prefers-reduced-motion**：全站 `transition/animation:none`；曆輪改為瞬間對位（無旋轉補間），內容完全等值。
- 不使用：淡入揭示當 signature、數字計數、模糊陰影、marquee。

## 插畫與圖像風格（volvelle-astral 曆輪星象構成）

全站無一張外部圖片、無一張「畫」的插圖。所有圖像由兩種程序原語構成：

1. **同心曆輪**：一組同心圓 + 24 格刻度線 + 沿環貼字（`textPath`/旋轉 `<text>`）+ 硃紅指針三角。徽記、favicon、預約印記皆為此原語的不同尺寸與內容。
2. **星官連線**：以《步天歌》傳統形貌，把星子（節點圓）依名連綴成官（黃銅連線）。北斗七星為徽記母題；「曆法」頁列九組星官連線圖鑑（示意，非精確天球座標）。預約印記的散星由留位號雜湊（FNV-like → xorshift）決定性生成，同碼恆得同印。

分工不可對調：**節點圓為骨白／黃銅、連線為黃銅、指針為硃紅、底為墨**。星圖一律深墨底（夜空），曆輪一律骨白底（紙）。

## Logo 與 Favicon 設計指南

- **母題**：同心曆輪 + 北斗七星 + 頂端硃紅指針。外圈 24 刻度（奇偶不等長）、內一道黃銅環、中心一枚北斗（七星以連線串成，主星略大）、頂端一枚硃紅三角指針落在墨心上。
- **favicon**：同一 `dialSVG(64,true)` 以 `encodeURIComponent` 內嵌為 `data:image/svg+xml` URI 寫於 `<head>`，零外部請求。
- 縮到 16px 仍須辨識：靠「骨白圓 + 硃紅指針三角」的高反差輪廓，不靠細節。

## Do & Don't

**Do**
- 讓旋轉只發生在曆輪；其餘介面保持靜態硬邊。
- 每一個顯示的數都要能在「曆法」頁被推算複核；標明近似與誠實聲明。
- 硃紅嚴格保留給指針／現用／宜吉／紅字；黃銅嚴格給刻度與星線。
- 敏感題材（曆法擇日近命理）須標「文化參考、非命理定論、資訊虛構」。

**Don't（含去AI化禁令）**
- 不用紫藍漸層、不用「置中大標＋兩顆按鈕＋三張圓角卡」。
- 不用 emoji 當 icon（icon 一律自繪 SVG 曆輪／星官）。
- 不用模糊陰影圓角卡（一律 2px 硬框 + 硬陰影）。
- 不把曆象寫死；不把吉凶講成恐嚇。
- 不用 marquee／數字計數／揭示淡入當動效主打。
- 不引入第二地色相污染芥黃×黃銅×硃紅的三色語意。

## 頁面骨架範例

```html
<header class="top"><div class="wrap"><div class="mast">
  <span class="emblem"><!-- dialSVG(52,true) --></span>
  <div class="brand"><h1>步天曆館</h1><div class="en lat">Bùtiān · Almanac</div></div>
  <div class="meta">授時曆算所…</div>
</div>
<nav class="sect">
  <a href="index.html" aria-current="page">今日曆象<span class="n">TODAY</span></a>
  <a href="zeri.html">擇吉<span class="n">CHOOSE</span></a>
  <a href="fa.html">曆法<span class="n">METHOD</span></a>
  <a href="yue.html">預約<span class="n">BOOK</span></a>
</nav></div></header>

<!-- 曆輪：三環 <g id="ring1/2/3"> + 頂端硃紅指針 + 中心 hub 文字 -->
<svg id="dial" viewBox="0 0 440 440">
  <g id="ring1"><!-- 24 節氣刻度＋沿環貼字 --></g>
  <g id="ring2"><!-- 12 月建地支 --></g>
  <g id="ring3"><!-- 12 建除十二神 --></g>
  <path d="M220 4 l11 26 l-22 0 z" fill="#C6381E"/><!-- 指針 -->
</svg>

<!-- 曆象面板：kv 鍵值＋宜(chip.on)／忌(chip)／沖煞 -->
<div class="panel"><div class="hd zhu">宜　SUITABLE</div>
  <div class="pad"><span class="chip on">嫁娶</span> …</div></div>
```

推算引擎（`window.BT`）提供 `reading(y,m,d)` 回傳 `{lunarText, dayGZ, yearGZ, monthGZ, jianchu, yi[], ji[], chongSx, sha, curTerm, nextTerm}`，以及 `solar2lunar / solarTermDate / dayGZ / jianchu / chongSha / addDays`。一個從未看過本 Demo 的 AI，只讀本檔即可用同一套色彩、字體、曆輪原語與推算引擎，做出風格一致的全新曆館。

---

*本 SKILL 由 Claude Opus 4.8 撰寫（2026-07-25，排程 Agent）。*
