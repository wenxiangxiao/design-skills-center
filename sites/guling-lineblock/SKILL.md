---
name: beardsley-line-block
description: Aubrey Beardsley's 1893–1898 black-and-white decadence as a web style — one-bit ink on paper or yellow cloth, solid black masses against hairlines with nothing in between, rows of dots as the only tone, a heavy-plus-hairline double frame with vast empty ground and a tiny cartouche, and whiplash drapery, peacock eyes, roses and candle flames as the motif vocabulary.
---

# 比亞茲萊黑白裝飾 Beardsley Black-and-White — 為線版而畫的頹廢派

## 設計哲學

一八九〇年代的倫敦，照相凸版「線版 line block」剛成熟：墨線稿翻拍成高反差底片，曬上鋅版，硝酸把沒線的地方咬掉。它便宜、快，但**不會印灰**——鉛筆的濃淡、水墨的暈、照片的中間調，在底片上全被判成全黑或全白。Aubrey Beardsley（1872–1898）是最早專門為這個限制而畫的人：《亞瑟之死 Le Morte Darthur》（J. M. Dent，1893–94）、王爾德《莎樂美 Salome》英文版（John Lane／Elkin Mathews，1894）、季刊《黃面志 The Yellow Book》（1894–95，前四卷由他任美術編輯並畫封面）、《The Savoy》（1896）。他把限制變成語法：大塊實黑對極細髮絲線、以點列代替灰、日本浮世繪與 Whistler 孔雀廳帶來的非對稱留白。

本風格的一句話：**畫面上每一個像素，不是墨就是地。** 要淡，就畫點；要暖，就換地（紙白或黃布），不准換墨。

本 SKILL 以 Demo「牯嶺鋅版 Guling Line Block」（臺北牯嶺街的藏書票線版製版所）示範。

## 本風格的 5 個不可省略特徵

### 1　一位元：只有墨與地

零灰、零 `opacity`、零漸層、零陰影、零模糊。全站只有兩個值：墨 `#0B0A09` 與「地」（紙白 `#FAF7EE` 或黃布 `#EFC11A`）。地可以換，墨永遠只有一種。調子只能靠點與線的疏密產生。連轉場都是一位元：舊頁用 `steps(1)` 一格翻黑，不經過灰。

```css
:root{--ink:#0B0A09;--paper:#FAF7EE;--cloth:#EFC11A;--ground:var(--paper)}
/* 任何「淺一點」的需求：改用點列，不准 opacity */
.tone{background-image:radial-gradient(circle,var(--ink) 0 .9px,transparent 1px);background-size:4px 4px}
/* 一位元轉場：舊頁一格翻黑 */
@keyframes vt-ink{to{filter:brightness(0)}}
::view-transition-old(root){animation:vt-ink 300ms steps(1,start) both}
```

拿掉它：出現任何一塊灰或半透明，就只是「黑白插畫」，不是線版。

### 2　兩種重量：大塊實黑 × 髮絲線，中間不存在

線寬只有兩級（雙線框與點列不計）：實心黑面，與 0.6–0.8px 的髮絲線（`vector-effect:non-scaling-stroke`，放大也不變粗）。沒有 2px、3px 的「中等線」。黑塊必須**偏心**（壓在一側或一角，絕不置中），且至少一塊**碰到框**，像從畫面外伸進來的帷幕。

```css
.pl .rg{fill:var(--ground);stroke:var(--ink);stroke-width:.75;vector-effect:non-scaling-stroke}
.pl .rg.inked{fill:var(--ink)}
```
```svg
<!-- 碰框、偏心的帷幕：從左上框角進場，S 形邊緣，落回左下框 -->
<path d="M16 16L118 16C96 90 132 170 84 240C60 280 70 312 96 336L16 336Z" fill="#0B0A09"/>
```

拿掉它：線寬一旦出現中間值，畫面就變成普通的線稿插圖；黑一旦置中，就變成印章。

### 3　點列：唯一的「灰」與唯一的裝飾

沿著輪廓走的一排圓點、繞羽眼的點環、垂掛的珠串。點以 SVG **零長度虛線＋圓端點**產生——每個點都是一個端點帽，所以點距精準、沿任意曲線等距。點列落在黑塊上時**反白**（改用地色），這是 Beardsley 黑地白點的招牌。

```css
.orn{fill:none;stroke:var(--ink);stroke-width:2.3;stroke-linecap:round;stroke-dasharray:0 5.4}
/* 點落在已上墨的塊上 → 反白（:has 狀態機，見技術章） */
.plate:has(.cb-3:checked) .o-3{stroke:var(--ground)}
```
```svg
<circle cx="220" cy="302" r="16" fill="none" stroke="#0B0A09" stroke-width="2.3" stroke-linecap="round" stroke-dasharray="0 5.4"/>
```

拿掉它：沒有點列，就只剩黑白色塊，像剪紙或 ISOTYPE。

### 4　雙線框、大片留白、角落的小方框字

每一幅圖（和每一個資訊區塊）都裝在「粗線＋髮絲線」的雙線框裡（粗 1.6–2.2、髮絲 0.6，間距 4–6）。框內留白至少 40%。文字不上圖，縮進角落或底部的小方框 cartouche：Caslon 大寫、字距 0.3–0.46em、字級小。標題不做巨字。

```css
.box{border:.6px solid var(--ink);outline:1.6px solid var(--ink);outline-offset:4px;padding:16px 18px}
.caps{font:400 .7rem/1.6 "Libre Caslon Text",serif;letter-spacing:.28em;text-transform:uppercase}
.rule{height:7px;border-top:1.6px solid var(--ink);border-bottom:.6px solid var(--ink)}
```

拿掉它：沒有框的黑白圖會變成海報或刺青稿；大字標題會變成瑞士或野獸派。

### 5　母題與鞭形曲線

只用具名的母題：**孔雀羽眼**（實心圓＋地色圓＋點環）、**玫瑰**（同心圓瓣）、**燭火**（杏仁形）、**帷幕與流蘇**、**月**。所有非圓的輪廓都是長 S 形的鞭形曲線（一條三次貝茲的兩個控制點落在弦的兩側），沒有直角折線人物、沒有幾何裝飾格。

```svg
<!-- 羽眼 -->
<g><circle cx="82" cy="44" r="14" fill="#0B0A09"/><circle cx="82" cy="44" r="5" fill="#FAF7EE"/>
<circle cx="82" cy="44" r="22" fill="none" stroke="#0B0A09" stroke-width="4" stroke-linecap="round" stroke-dasharray="0 9"/></g>
<!-- 鞭形：控制點在弦兩側 -->
<path d="M108 16C86 90 122 170 74 240" fill="none" stroke="#0B0A09" stroke-width=".7"/>
```

## 色彩系統

| 色 | hex | 用途 | 面積比例 |
|---|---|---|---|
| 印度墨 Ink | `#0B0A09` | 唯一的墨：黑塊、髮絲線、點、字 | 30–60%（每一幅圖都要落在這個區間） |
| 紙白 Paper | `#FAF7EE` | 內頁的地 | 其餘 |
| 黃布 Cloth | `#EFC11A` | 只當「地」：封面／首屏／favicon，致敬《黃面志》黃布封面 | 首屏 100% 的地 |

規則：黃只能是地，永不當墨；沒有第四色；沒有任何色的淡版。互動狀態（hover、選取）一律用「點列」或「反白」表現，不用色。

## 字體系統

- 西文：**Libre Caslon Display**（標題）、**Libre Caslon Text** 400／400 italic（內文與 caps 小標）——《黃面志》內文正是 Caslon Old Face。Google Fonts。
- 中文：**Noto Serif TC** 400（600 只給極少數強調）。細明體的細橫畫與髮絲線同一語氣。
- 字級：caps 小標 0.56–0.72rem（字距 .26–.46em）；內文 16px／1.85；h3 1.05–1.1rem；h2 clamp(1.5rem,3vw,2.1rem)；h1 最大 2.8rem，字距 .34–.4em。**不做巨字 hero。**
- 數字用 `font-variant-numeric: oldstyle-nums`；序號用斜體羅馬數字（`counter(step, upper-roman)`）。

## 版面與網格

- 內容寬 ≤1120px，文字欄 ≤40em；區塊間距 96–120px（留白是黑的對手）。
- 非對稱兩欄（1.2fr : .8fr 或 .7 : 1.3），偶數項往下錯 44–88px，像日本版畫的錯落。零置中三卡片。
- 首屏：地色滿版，左側一塊直立的版（300:420 藏書票比例），右下一窄欄小字——大片空地是構圖的一部分。
- **黑塊先到、字後到**：文字以 `shape-outside` 貼著黑塊的鞭形邊緣排（見技術章）。
- 旋轉只給「印章」（−6°），其他零旋轉。

## 元件配方

- **導覽（流蘇 tassel nav）**：頂部粗＋髮絲雙線，四條流蘇從線上垂下：點列珠串（`stroke-dasharray:0 5`）＋水滴墜；現頁墜子實黑，其他地色；hover 時珠串 90ms 內連成一條髮絲線。
- **按鈕**：1.6px 實線框、零圓角、字距 .3em；hover 反白（墨底地字），`.solid` 反之。
- **卡片**：`.box` 雙線框；零陰影、零圓角。
- **表格**：髮絲橫線，表頭下 1.6px；價錢右對齊舊式數字。
- **表單**：只有底線 1.6px，focus 用 0.6px 點線 outline。
- **勾選**：12px 髮絲方框，勾上就填滿實黑（不打勾）。
- **footer**：點列垂弧（swag）＋雙線，三欄小字。

## 動效規則

| 類型 | 本站實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 流蘇擺動（±3.2°）；燭火 skew＋scaleY；孔雀冠羽擺；燭光點環 48s 自轉 | 無需輸入 | 4.1–5.6s ease-in-out alternate；燭火 1.7s；點環 48s linear | 靜止，形狀與資訊不變 |
| input 輸入 | 導覽珠串連成實線；版上 hover 的塊預覽為點網；墨格清單 hover 方框出點；票主名即打即印進方框 | hover／focus／輸入 | 90ms linear；即時 | 直接切換狀態 |
| transition 轉場 | 跨頁 View Transition：舊頁 `steps(1)` 一格翻黑（上墨），新頁從左上角以圓形 clip-path 揭開（印出）；換版與曬版用同一套（同文件 `startViewTransition`） | 換頁／換版／曬版 | 300ms steps(1)＋620ms cubic-bezier(.7,0,.2,1) | 不註冊 @view-transition，立即換頁 |
| signature 簽名 | **落墨浸開 the blot**：點哪裡，墨就從那一點以硬邊圓形浸開，被該塊的輪廓剪裁；再點一次，墨從外往點收回（洗版）。落定後才寫入狀態，點列同時反白 | 點擊版上任一塊，或用鍵盤勾墨格 | 上墨 440ms、洗 360ms，cubic-out | 立即變黑／變白，結果相同 |

自我限制：本風格禁用淡入淡出（opacity 是灰）、禁用模糊與陰影動畫、禁用 stroke-dashoffset 描線動畫（線版的線是一次曬出來的，不是畫出來的）。

## 插畫與圖像風格

- 技法「一位元線版構成 line-block-1bit」：每幅圖＝一組以三次貝茲定義的**封閉塊**（每塊只有兩種狀態：地或墨）＋一組**點列**（開放路徑，零長度虛線）＋雙線框＋底部 cartouche。
- 塊與塊之間以 0.75px 髮絲線分界；上墨後髮絲線仍在，所以相鄰黑塊之間看得到一條極細的分界（線版上也是）。
- 構圖比例：黑 30–60%、黑塊重心偏離中心 ≥8%、至少一塊碰框。
- 零照片、零外部圖片、零 emoji、零 icon font。

## Logo 與 Favicon 設計指南

- Logo：3:4 直立藏書票——黃地、粗＋髮絲雙框、左側碰框的鞭形黑帷幕（邊緣一排反白點）、右上羽眼與點環、底部 cartouche 寫 GULING · LINE · BLOCK／牯嶺鋅版。
- Favicon（inline SVG data URI）：32px 黃地＋雙框＋左黑帷幕＋右上黑圓含黃心。在 16px 仍是「黃、黑、偏心」三件事。

## Do & Don't

**Do**：只用墨與地；讓黑碰框；用點代替灰；把字縮進角落方框；每一幅圖都有框；讓大片空地保持空。

**Don't**：灰、opacity、漸層、陰影、模糊、圓角；中等粗細的線；黑塊置中；巨字 hero；第二種墨色；把黃當墨用；紫藍漸層、置中三卡片、emoji icon、Lorem ipsum、EST. 年份徽章；stroke-dashoffset 描線動畫；把 Beardsley 的人物或作品直接臨摹上版（母題可以借，畫面必須原創）。

## 頁面骨架範例

```html
<header class="head" style="--ground:var(--cloth)">
  <div class="rule"></div>
  <div class="top">
    <a class="brand" href="index.html"><!-- logo svg --><span><b>店名</b><small>English Name</small></span></a>
    <nav class="tassels" aria-label="主導覽">
      <a href="index.html" aria-current="page"><svg viewBox="0 0 16 58"><path class="beads" d="M8 0V40"/><path class="drop" d="M8 40C3.5 47 3.5 53 8 56C12.5 53 12.5 47 8 40Z"/></svg><span>扉頁<i>Frontispiece</i></span></a>
      <!-- …其餘三條流蘇 -->
    </nav>
  </div>
</header>
<section class="cover" style="--ground:var(--cloth)">
  <div class="plate live"><!-- fieldset 墨格 + svg.pl 版 --></div>
  <div class="side"><p class="caps">The Yellow Plate · No. 1</p><h1>店名<span>English</span></h1><div class="box">一句話。</div></div>
</section>
<section class="intro"><div class="wrap">
  <div class="mass" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0L72 0C46 18 92 38 58 56C30 72 40 88 66 100L0 100Z"/></svg></div>
  <h2>標題</h2><p>文字貼著黑塊的邊走……</p>
</div></section>
```

## 技術實作與相容性

本站三項核心技術（ledger `tech`）：

### 1. SVG 零長度虛線點列（A 渲染層）——承載特徵 3

`stroke-dasharray: 0 d` ＋ `stroke-linecap: round`：每一段長度為零的「虛線」只剩兩個半圓端點帽，合起來是一顆圓點，沿任何路徑（貝茲、圓弧）等距排列。全站的點環、珠串、帷幕邊緣反白點、流蘇、footer 垂弧都是它；流蘇 hover 時把 dasharray 從 `0 5` 過渡到 `5 0`，點連成線。

- 支援：`stroke-dasharray`、`stroke-linecap` 為 SVG 1.1 起的屬性，MDN 標示 Baseline Widely available；零長度虛線配圓端點產生圓點在 MDN 範例與社群教學中皆有記載（MDN〈stroke-dasharray〉、MDN〈Fills and strokes〉教學；W3C SVG WG ISSUE-2305 討論零長度虛線的端點帽繪製）。`stroke-dasharray` 可 CSS transition（數值串列逐項內插）。
- Fallback：不支援時退化為實線髮絲線——資訊不損失，只少了裝飾。
- 注意：點距應 ≥ 線寬×2，否則點會黏成粗線（違反特徵 2）。

### 2. `:has()` × checkbox 的 CSS 狀態機＋CSS counters（E 資料與生成層）——承載落墨功能與特徵 3 的反白

每塊版的「墨／地」狀態存在一個隱藏的 `<input type=checkbox>`，繪製完全交給 CSS：

```css
.plate:has(.cb-3:checked) .rg-3{fill:var(--ink)}          /* 塊上墨 */
.plate:has(.cb-3:checked) .o-3{stroke:var(--ground)}       /* 落在它上面的點列反白 */
.legend{counter-reset:ink}.legend .cb:checked+label{counter-increment:ink}
.inkcount::after{content:"落墨 " counter(ink) " 塊"}        /* 零 JS 計數 */
```

JS 只負責「浸開」動畫與規矩審查；**沒有 JS 時，墨格清單仍能落墨、計數仍會更新**。

- 支援：`:has()` Baseline 2023（Firefox 121 於 2023-12-19 補齊；查證 web.dev〈Baseline 2023〉、MDN〈:has()〉、caniuse css-has）。CSS counters Baseline Widely available。
- Fallback：不支援 `:has()` 的舊瀏覽器，塊不會變黑——但 JS 版會讀 checkbox 狀態產生校樣（校樣以 inline style 上色，不依賴 `:has()`），流程仍可走完。

### 3. 同一份貝茲資料 → SVG 路徑／clipPath／覆蓋格／`shape-outside: polygon()`（C 版面與樣式層）

每塊版的形狀只寫一次（三次貝茲指令陣列）。同一份資料：(a) 產生 `<path d>`；(b) 產生同形 `<clipPath>`，讓「浸開」的圓被該塊輪廓剪裁；(c) 以 14 段/曲線攤平成多邊形，在 4 單位網格上做射線法點內判定，算出每格「最上層是哪一塊」→ 黑白比、黑塊重心、是否碰框三條規矩；(d) 首頁黑帷幕以同一套攤平函式（建置時）輸出 `shape-outside: polygon(…%)`，文字貼著鞭形邊緣排。

- 支援：`shape-outside` 與 `shape-margin` Baseline Widely available（MDN〈shape-outside〉）；`clip-path` 的 SVG `<clipPath>` 參照為 SVG 1.1 能力。
- Fallback：`shape-outside` 不支援時文字以矩形繞排，黑塊仍在左側；resize 時多邊形以百分比表示，無需重算。

### 其他使用到的 API

- 跨文件 View Transitions（`@view-transition{navigation:auto}`）：MDN 標示 Limited availability（Chromium 與 Safari 18.2+，Firefox 尚在旗標後）——純漸進增強，只包在 `prefers-reduced-motion: no-preference` 內。同文件轉場以 `document.startViewTransition` 偵測後使用，否則直接執行。
- `URLSearchParams`：校樣分享連結 `?t=rosa&m=10&n=…` 還原版型、落墨遮罩與票主名。
- FNV-1a 32-bit 雜湊：版號 `GL-XXXX`（同版型＋同遮罩＋同名＝同版號）。

### 效能實測（建置時 Node 22 量測）

- 覆蓋格建立：孔雀 8.7ms、玫瑰 3.8ms、燭台 2.0ms（每次換版一次）；之後每次落墨的量測 <0.2ms。
- 頁面大小（含全部 inline CSS/JS/SVG）：index 約 41KB、exlibris 約 38KB、inks 約 19KB、visit 約 18KB，遠低於 350KB。
- 動畫：只動 `transform`（流蘇、燭火、冠羽、點環）與 SVG `r` 屬性（浸開，單一元素）；無 layout thrashing。

### 查證來源

- King's College London Special Collections〈Beardsley and the line block〉；V&A〈Aubrey Beardsley – decadence & desire〉；Yale Center for British Art《The Yellow Book》Vol. II 封面館藏紀錄
- MDN：stroke-dasharray、:has()、shape-outside、@view-transition、View Transition API；web.dev〈Baseline 2023〉；caniuse css-has
