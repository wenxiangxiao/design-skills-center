---
name: bento-grid
description: Bento Grid web style — a single gap-less rectangle of rounded tiles on one integer grid, one idea per tile with an oversized numeral or object, a near-black canvas with one accent per tile, tight heavy grotesk type, and hero objects that bleed past the tile and get cropped by its corners; tiles re-pack (not reflow) at every breakpoint.
---

# Bento Grid 便當格 —— 風格規格書

> 範例站：幕間屋 MAKUAI（臺北劇場中場外送的幕の内便當）。本規格書與產業無關：產品發表頁、年度回顧、個人作品集、SaaS 功能總覽、餐廳菜單、活動資訊頁，只要內容能拆成「一格講一件事」，都能套用。

## 設計哲學

Bento Grid（便當格、Bento UI）是 2020 年代最可辨識的網頁版面流派之一，名字來自日本的分格便當盒。

- **血緣上游**：日本幕の内弁当（江戶後期芝居茶屋在歌舞伎「幕と幕の間」送進客席的便當，俵型小飯糰撒黑胡麻、一格一菜）；Microsoft Metro／Windows Phone 7 的動態磚 Live Tiles（2010，一磚一資訊、磚本身會更新）。
- **成形**：Apple 自 2010 年代後期起在產品頁與發表會用「功能總結格」收尾；WWDC 2023 的 macOS／iOS 功能回顧投影片被設計圈大量截圖、逆向，「bento」一詞隨之成為通用名詞，Google、Microsoft、Spotify、大量新創的功能區塊跟進（參 freeCodeCamp〈Bento Grids in Web Design〉、uxdesign.cc〈Web design trend: bento box〉、Banani〈What is a Bento Grid?〉）。
- **它為什麼長這樣**：發表會投影片要在一張 16:9 裡交代十幾個功能，又要讓觀眾 3 秒內抓到重點——於是每個功能被壓成一格、一格只放一個巨大數字或一張產品特寫，格子大小就是重要性。便當盒則是同一個問題的食物版：一個固定容器，裝滿，不留縫，每格一種味道。

本流派最容易被做壞的方式，是把它當成「一堆圓角卡片」。真正的 Bento 是**一個被裝滿的矩形**：格子之間沒有任何洞，溝寬全站一致，外框圓角與內格圓角同心。版面的工作不是排卡片，而是**裝箱**。

## 本風格的 5 個不可省略特徵

### 1. 零空洞的矩形：所有格在同一張整數網格上，拼滿一個矩形，溝寬一致、圓角同心

格子只能跨整數欄列（1×1、2×1、2×2、3×1、4×2…），全部拼起來必須是**完整矩形**，任何位置都不能露出底色空洞。溝寬（gap）全站只有一個值；外容器圓角＝內格圓角＋溝寬（同心圓角，Apple 硬體與 UI 的同一條規則）。

```css
:root{ --r:22px; --gap:10px; --outer:calc(var(--r) + var(--gap)); }
.bento{ display:grid; grid-template-columns:repeat(var(--cols,6),minmax(0,1fr));
        grid-auto-rows:clamp(150px,14.5vw,196px); gap:var(--gap); }
.tile{ border-radius:var(--r); }
.box { border-radius:var(--outer); padding:var(--gap); }   /* 外框同心 */
```

`grid-auto-flow:dense` **不夠**：它會在斷點切換時留下洞。範例站用精確覆蓋裝箱器（見〈技術實作〉）在每個欄數重新求解，必要時用 1×1 的「葉蘭」裝飾格補齊（便當裡那條綠色鋸齒隔板），保證永遠是矩形。

### 2. 一格一事：主角佔格面 ≥40%，標籤小而在左上，格內內容隨格子大小變形

每格只講一件事：一個數字、一個物件、一句話。標籤 11px 全大寫、字距 .16em、灰色、貼左上；主角在左下或滿版。同一份內容在 1×1、2×1、2×2 會顯示不同密度——這靠 container queries，不靠視窗寬度。

```css
.tile{ container:tile/size; padding:20px 22px; display:flex; flex-direction:column; }
.lbl{ font:800 11px/1.2 "Inter Tight",sans-serif; letter-spacing:.16em; text-transform:uppercase; color:#8C857D; }
.big{ margin-top:auto; font:800 clamp(34px,26cqi,128px)/.88 "Inter Tight",sans-serif; letter-spacing:-.045em; }
@container tile (max-width:220px){ .sub{display:none} }
@container tile (aspect-ratio > 2.6){ .tile-row{display:flex;align-items:flex-end;gap:20px} }
```

### 3. 單色畫布＋格面一階＋每格至多一個強調色；零邊框、零陰影

畫布近黑（或近白 #F5F5F7 的亮色版），格面只比畫布亮一階；格與格之間**只靠溝分開**，不畫框線、不加投影。每格最多一個強調色，而且只用在主角（數字或物件）上；全站允許一格整塊飽和色作為唯一行動格。

| 角色 | Hex | 比例 |
|---|---|---|
| 畫布 漆黑 | `#0B0A09` | 溝與背景 |
| 格面 | `#1A1817`（hover `#24211F`） | 約 80% |
| 主文字 | `#F4EFE8` | — |
| 次文字 | `#8C857D` | — |
| 唯一飽和格 朱 | `#C2361F` | 全頁 1–2 格 |
| 強調（每格擇一） | 玉子 `#F2C230`・鮭 `#F08A5D`・毛豆 `#8DBF4B`・梅 `#E04A2E` | 只上數字或物件 |

```css
body{ background:#0B0A09; }
.tile{ background:#1A1817; border:0; box-shadow:none; }
.tile .big{ color:var(--acc,#F4EFE8); }   /* 每格一個 --acc */
.tile.solid{ background:#C2361F; }        /* 全頁唯一行動格 */
```

### 4. 巨大、緊排、重磅的無襯線：主角與標籤字級比 ≥ 6:1

數字與拉丁字用重磅緊排的 grotesk（範例站 Inter Tight 800，SF Pro Display 的開源替身），字距 −0.045em、行高 .88；中文用 Noto Sans TC 900。主數字與標籤的字級比至少 6:1——這個落差就是 Bento 的節奏。數字一律 `tabular-nums`。

```css
.big{ font-family:"Inter Tight","Noto Sans TC",sans-serif; font-weight:800; letter-spacing:-.045em; line-height:.88; font-variant-numeric:tabular-nums; }
.big small{ font-size:.34em; letter-spacing:-.01em; }   /* 單位縮小貼在數字旁：4.5cm、−10分 */
.h{ font:900 clamp(20px,9cqi,46px)/1.08 "Noto Sans TC",sans-serif; letter-spacing:-.02em; }
```

### 5. 出血裁切的主物件：物件比格子大，被格子的圓角裁掉，像隔著窗看

主圖不是「放在卡片裡的插圖」，而是一個平滑漸層塑形的物件（產品渲染感：漸層體積、一道高光、柔軟接觸陰影、零描邊），尺寸大於格子、被 `overflow:hidden` 與圓角裁切。物件可以偏到一側讓出文字位。

```css
.tile{ position:relative; overflow:hidden; isolation:isolate; }
.tile .art{ position:absolute; inset:-10%; z-index:0; pointer-events:none; }
.tile .art.art-right{ inset:2% -10% 2% 40%; }                 /* 偏右讓出標題 */
.tile.rot .art{ inset:auto; left:50%; top:50%; width:calc(100cqh*1.2); height:calc(100cqw*1.2);
                transform:translate(-50%,-50%) rotate(90deg); } /* 2×1 物件放進 1×2 格 */
```

```svg
<!-- 物件配方：漸層體積＋高光＋接觸陰影，零描邊 -->
<radialGradient id="g-rice" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#F1ECE3"/><stop offset="1" stop-color="#CFC6B6"/></radialGradient>
<rect x="15" y="17" width="78" height="38" rx="19" fill="#000" opacity=".35"/>
<rect x="12" y="8"  width="78" height="38" rx="19" fill="url(#g-rice)"/>
<rect x="26" y="12" width="40" height="7"  rx="3.5" fill="url(#g-spec)"/>
```

## 色彩系統

見特徵 3 的色票表。補充：亮色版可改為畫布 `#F5F5F7`、格面 `#FFFFFF`、主文字 `#1D1D1F`，規則不變（格面一階、零框線、每格一強調）。米白 `#EFE8DC` 可作為「引言格」的反相格，全頁至多 1 格。

## 字體系統

- 來源：Google Fonts `Inter Tight`（500/700/800）＋`Noto Sans TC`（500/700/900）。
- Scale：標籤 11px／內文 13.5–15px／格標題 `clamp(20px,9cqi,46px)`／主數字 `clamp(34px,26cqi,128px)`；倒數這種 8 字元的數字改 `clamp(30px,16cqi,80px)`。
- 字重：數字 800、中文標題 900、內文 500。行高：數字 .88、標題 1.08、內文 1.55。

## 版面與網格

- 桌面 6 欄、平板 4 欄、手機 2 欄；列高 `clamp(150px,14.5vw,196px)`，近似正方格。
- 每個斷點**重新裝箱**而不是讓格子自然換行：格子帶三組尺寸 `data-f6 / data-f4 / data-f2`，求解器重排並以 1×1 裝飾格補齊。
- 旋轉角度：0°。Bento 不旋轉、不傾斜、不重疊。
- 留白：格內 padding 20/22px；格與格之間只有 `--gap`；區段之間 40px 加一行區段標題。

## 元件配方

- **導覽（格條）**：導覽本身是一列格子 `grid-template-columns:2.2fr 1fr 1fr 1fr 1.5fr`，高 64px、圓角 18px；目前頁的格塗朱色。手機收成 3 欄、品牌格跨整列。
- **按鈕**：整格就是按鈕（`a.tile`），右下角 34px 圓形箭頭；按下 `scale(.985)`。另有長條主按鈕：朱底、圓角 16px、左字右價。
- **卡片**：沒有「卡片」，只有格。格內零邊框零陰影。
- **表單**：輸入框為格面再亮一階 `#24211F`、圓角 12px、無框；單選做成小格，選中反白（`label:has(input:checked)`）。
- **Footer**：同樣是一列格子，字 13px 灰。

## 動效規則

| 類型 | 觸發 | 做法 | 時間／曲線 |
|---|---|---|---|
| ambient 環境 | 無 | 熱菜格的蒸氣三縷上升淡出；倒數格依真實時間每秒更新 | 3.6s ease-in-out 無限、錯開 1.2s |
| input 輸入 | pointermove | 漆面光澤：游標位置的 300px 徑向高光跟手（rAF 節流，CSS 變數 `--mx/--my`） | <16ms；淡入 .25s |
| transition 轉場 | 跨頁導覽 | `@view-transition{navigation:auto}`：首頁「盛付」格與下一頁的便當盒共用 `view-transition-name:box`，倒數格共用 `countdown`，導覽格條 `navstrip` 不動 | .46s cubic-bezier(.22,.9,.24,1) |
| signature 簽名〈盛付〉 | 加一道菜 | 先把裝箱器的回溯嘗試畫成一閃而過的金框（可行）與朱框（碰撞），再以 `document.startViewTransition` 讓每道菜滑到解出的新位置，被點的菜從菜單格飛進盒子 | 每次嘗試 14ms 錯開、≤640ms；滑入 .46s |

`prefers-reduced-motion: reduce`：蒸氣靜止為 22% 不透明、倒數改每 30 秒更新且不顯示秒、光澤關閉、view transition 動畫全部歸零、回溯框不播；**所有資訊照常出現**（解出的盒、狀態文字、倒數時分）。

## 插畫與圖像風格

出血裁切渲染物件（bleed-render）：每個物件以 SVG 漸層建模，`<symbol>` 一格＝100 單位，2×1 的物件畫成 200×100。高光一律從左上來；接觸陰影是一個 `radialGradient` 黑色橢圓。不用描邊、不用材質貼圖、不用網點。物件放大 120% 後被格子裁切。

## Logo 與 Favicon 設計指南

Logo 本身就是一個 2×2 便當格：64×64、外圓角 16，內格圓角 10、內距 6（同心圓角）；左格直立白色俵飯撒黑芝麻、右上朱格、右下玉子黃格。字標「幕間屋」Noto Sans TC 900＋`MAKUAI · 幕の内弁当` Inter Tight 800 字距 3.4。Favicon 用同一個 64×64 標誌的 inline SVG data URI。

## Do & Don't

- Do：先決定矩形，再決定格；格子大小＝重要性。
- Do：每格一個 `--acc`；整頁只有一格飽和色。
- Do：斷點切換時重新裝箱，不要讓格子掉成單欄長條。
- Don't：格與格之間有洞、溝寬不一、外框圓角與內格圓角不同心。
- Don't：卡片加邊框或模糊陰影（rounded-2xl + shadow-lg 的通用卡片是本流派的仿冒品）。
- Don't：一格塞三個重點；把標題與內文都做成同一字級。
- Don't：紫藍漸層、emoji icon、置中大標＋三張卡、Lorem ipsum、「EST. 19xx」徽章。

## 頁面骨架範例

```html
<nav class="navstrip">
  <a class="brand" href="index.html"><svg>…</svg><span><b>品牌</b><small>TAGLINE</small></span></a>
  <a href="index.html" aria-current="page"><span class="k">01 · Home</span><span class="v">首頁</span></a>
  <a href="order.html"><span class="k">02</span><span class="v">訂購</span></a>
</nav>
<div class="bento" data-pack>
  <article class="tile" data-f6="4,2" data-f4="4,2" data-f2="2,2">
    <div class="art art-right"><svg><use href="#hero" width="100%" height="100%"/></svg></div>
    <p class="lbl">產品 · 2026</p><h1 class="h">一句話，<br><em>重點上色。</em></h1>
  </article>
  <article class="tile" data-f6="1,1" style="--acc:#F2C230"><p class="lbl">單位</p><p class="big">4.5<small>cm</small></p></article>
  <a class="tile solid" data-f6="2,1" href="order.html"><p class="lbl">行動</p><p class="h">自己裝一盒。</p></a>
  <article class="tile garnish" data-f6="1,1" aria-hidden="true">…補洞用的裝飾格…</article>
</div>
```

## 技術實作與相容性

### 採用技術（三層）

1. **CSS Container Queries（size）＋ 容器單位 `cqi/cqw/cqh`**（C 版面與樣式層）——承載特徵 2 與 5：每格 `container:tile/size`，同一份內容在 1×1／2×1／2×2／3×1 自動換密度；主數字 `26cqi` 隨格寬縮放；2×1 物件放進 1×2 格時以 `100cqh × 100cqw` 對調尺寸再旋轉 90°。
   查證：web.dev〈Container queries land in stable browsers〉——size queries 與容器單位於 Chrome/Edge 105、Safari 16、Firefox 110 穩定（2023 起 Baseline）。
   Fallback：不支援時 `cqi` 退回視窗單位，格內文字略大但不破版；`.sub` 不隱藏、資訊更多而非更少。
2. **精確覆蓋裝箱器（Algorithm X 式回溯，選最左上空格為約束欄）**（E 資料與生成層）——承載特徵 1：同一支約 40 行的求解器 (a) 在建置時排出無 JS 備援的 6 欄版面、(b) 在瀏覽器每個斷點（6／4／2 欄）重解首頁與時刻表的格陣並以葉蘭格補齊、(c) 在〈盛付〉裡把使用者點的菜＋空格裝進 4×3／4×4／6×4 盒，並回傳嘗試軌跡給簽名動效。相同尺寸同類的菜視為可互換以剪枝；200,000 節點上限。
   實測（Node 22，建站當下）：首頁 19 格 6 欄求解 0.03ms、2 欄 0.02ms；6×4 全本盒 12 道菜 0.01ms；刻意構造的不可解 6×4 案例 79 節點 0.24ms 判定失敗。
   Fallback：無 JS 時版面用建置時預解的 `grid-column/grid-row` 內聯樣式；平板／手機以 `--w4/--h4/--w2/--h2` 搭配 `grid-auto-flow:dense`（可能留洞，但內容完整）。
3. **View Transition API：同文件 `document.startViewTransition()` ＋ 跨文件 `@view-transition{navigation:auto}`**（B 動效與時間軸層）——承載簽名〈盛付〉（每道菜一個 `view-transition-name:p<uid>`，重排時各自滑到新位置；被點的菜單格暫借同名從菜單飛入）與跨頁轉場（`box`、`countdown`、`navstrip` 共用名）。
   查證：web.dev〈Same-document view transitions are now Baseline Newly available〉（2025-10-16，Firefox 144 補齊）；Chrome for Developers〈Smooth transitions with the View Transition API〉——跨文件 Chrome/Edge 126+、Safari 18.2+、Firefox 尚未支援。
   Fallback：`MK.vt()` 偵測 `document.startViewTransition`，不存在或 reduced-motion 時直接同步更新 DOM；跨文件在 Firefox 為一般換頁。

### 效能實測（建站當下）

- 單頁大小（含 inline CSS/JS/SVG）：index 82KB、order 93KB、interval 73KB（預算 350KB）。
- 首屏 JS：裝箱 <0.1ms，倒數與光澤綁定為常數時間；主要成本是解析 inline SVG。
- 動畫：蒸氣與光澤只動 `transform/opacity` 與 CSS 變數上的 `background`；view transition 由合成層執行。pointermove 以 rAF 節流，每幀至多寫一個元素的三個變數。
