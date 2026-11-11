---
name: whole-earth-catalog-newsprint
description: Whole Earth Catalog (1968–1971) style — single-ink newsprint, Windsor-like soft heavy serif heads over Univers-like sans body, italic signed reviews, dense multi-column entries split by hand-cut meandering lines, oval AM-halftone photos, thick dotted editor's boxes and a striped size-reference ball.
---

# 全地型錄・新聞紙單墨 Whole Earth Catalog Newsprint

> 範例站：土厝自學所 THÔO-TSHÙ（花蓮壽豐・自力造屋與樸門自學所）。本 SKILL 不綁產業：任何「把工具、課、書、人整理成一份有人簽名的清單」的品牌都適用——五金行、農具社、修理工作室、自學社群、出版社、戶外用品、種子圖書館。

## 設計哲學

《Whole Earth Catalog》1968 年秋由 Stewart Brand 在加州 Menlo Park 的 Portola Institute 出版，到 1971 年《The Last Whole Earth Catalog》（1972 年獲美國國家圖書獎）為止，口號是「access to tools」。它在形式上是郵購目錄（Brand 自己說是照 L.L. Bean 目錄做的），但每一則條目都是**一則有人簽名的評介**：品名、書摘、評介、門路（價格與地址）。

它長成這樣，是因為三個製作上的限制：

1. **錢**：11×14½ 吋的大開本新聞紙，比厚紙便宜得多——所以單墨、所以紙會黃、所以網點粗。
2. **工具**：內文用 IBM Selectric Composer 打字排版，照片多半是 Polaroid MP-3 翻拍；版面由人工剪貼（paste-up）完成，一則一則剪下來貼——所以每一頁都不一樣、像拼圖，條目間是剪刀剪出來的歪線，不是尺畫的直線。
3. **立場**：資訊優先於裝飾。按主題分類（Whole Systems／Land Use／Shelter／Industry／Craft／Community／Nomadics／Communications／Learning），不按字母、不按商品型號。

所以這個風格的核心是：**一切都是印出來的，一切都看得出是人貼上去的，一切都有人負責（簽名）**。它不是「復古紙感」，是一份工具書。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 Whole Earth Catalog 了。

### ① 新聞紙單墨：灰只能是網點

全站只有兩個印得出來的顏色：新聞紙與墨。**任何灰都必須由網點或排線構成**，不准用 #888 這種平灰、不准 opacity 墨、不准漸層。封面可以是一整塊實黑（1968 年封面就是黑底），內頁永遠是紙。

```css
:root{--paper:#E9E1CC;--ink:#1B1915;--cover:#0E0D0B}
html,body{background:var(--paper);color:var(--ink)}
/* 錯：color:#777; opacity:.6; linear-gradient(...)  對：網點（見⑤ 與「技術實作」） */
```

### ② 字體分工：Windsor 式軟襯線重標題＋Univers 式正文＋斜體評介＋縮寫署名

原作的正文大多是 Univers，評介用斜體，標題用 Windsor 這種軟胖的重襯線。Google Fonts 沒有 Windsor，用 **Fraunces** 把 `SOFT 100`、`WONK 1`、`wght 900` 拉滿最接近；正文用 **Hanken Grotesk**（Univers 的近親結構）。中文標題 Noto Serif TC 900、正文 Noto Sans TC。**評介一定是斜體、結尾一定有簽名縮寫**——沒有簽名的評介不准上版。

```css
.wh{font-family:"Fraunces","Noto Serif TC",serif;font-weight:900;
  font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 144;line-height:.92}
body{font:400 14.5px/1.5 "Hanken Grotesk","Noto Sans TC",sans-serif}
.rv{font-style:italic}.rv .sig{font-style:normal;font-weight:700}   /* —潘 */
```

### ③ 密排多欄，條目之間是剪刀剪出來的歪線

三欄（窄螢幕兩欄、手機一欄）密排，欄間**不畫直線 column-rule**；條目之間是一條 1px 左右、微微起伏的手剪分隔線（1968 年版尤其明顯，到 1971 年才變得比較規整）。

```css
.cols{column-count:3;column-gap:22px}
.cols>*{break-inside:avoid}
h2.sec{column-span:all}
svg.mx{display:block;width:100%;height:8px}
svg.mx path{fill:none;stroke:#1B1915;stroke-width:1.1;stroke-linecap:round}
```
```html
<svg class="mx" viewBox="0 0 300 8" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 4.2L9 3.6L18 4.9L27 4.1L36 3.3L45 4.4L54 5.0L63 4.0L72 3.7L81 4.6L90 4.3L99 3.5L108 4.8L117 4.2L126 3.9L135 4.5L144 4.1L153 3.4L162 4.7L171 4.4L180 3.8L189 4.2L198 5.1L207 4.0L216 3.6L225 4.5L234 4.3L243 3.7L252 4.6L261 4.2L270 3.9L279 4.8L288 4.1L300 3.8"/>
</svg>
```

### ④ 條目公式：品名 → 書摘 → 斜體評介＋簽名 → 門路區塊

每一則都是同一個四段結構，順序不可換。「門路」寫明價格、從哪裡來（FROM 地址）、能不能借；這是它和雜誌的根本差別。

```html
<article class="ent">
  <svg class="mx"></svg>
  <h3>夯土牆二日班<i>Rammed earth, two days ・ 房舍</i></h3>
  <p class="ex">「書摘用襯線小字、縮排……」</p>
  <p class="rv">評介是斜體，講用過的真實經驗。<span class="sig">—潘</span></p>
  <p class="acc"><b>NT$4,800</b> 含午餐<br><em>FROM</em> 土厝自學所・每月第二個週末</p>
</article>
```
```css
.ent h3{font:900 21px/1.02 "Fraunces",serif;font-variation-settings:"SOFT" 100,"WONK" 1}
.ex{font:400 12.5px/1.55 "Noto Serif TC",serif;margin-left:12px}
.acc{border-top:1px solid #1B1915;font:500 12px/1.45 "Hanken Grotesk",sans-serif}
.acc em{font-style:normal;font-weight:700;letter-spacing:.06em}
```

### ⑤ 製作痕跡：橢圓網點照、粗點線編者按、條紋球、頁角連載框

1968 年版的照片常放在**橢圓框**裡；編者按用**粗黑點線框**；1971 年版每則照片旁放一顆**條紋球**當尺寸參考，右頁右下角有一個圓角細線框的連載小說。這些是「這是一本被製作出來的書」的證據。

```css
.ov canvas{width:100%;aspect-ratio:4/3}              /* 內容由 AM 網點引擎畫，clip 成橢圓 */
.ed{border:4px dotted #1B1915;padding:10px 12px;font-style:italic}
.ball{display:inline-block;width:22px;height:22px;border-radius:50%;border:1.3px solid #1B1915;
  background:repeating-linear-gradient(90deg,#1B1915 0 3px,transparent 3px 6px)}
.serial{border:1px solid #1B1915;border-radius:0 0 18px 0;padding:10px 12px}
```

## 色彩系統

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 新聞紙 | `#E9E1CC` | 全部內頁底色；封面上的網點色 | ~70% |
| 墨 | `#1B1915` | 所有字、線、網點、點線框 | ~22% |
| 封面黑 | `#0E0D0B` | 封面板、現用頁拇指索引 | ~6% |
| 非複製藍 | `#8DBCD6` | **只在拼版台**：格線、欄框、行數讀數。印出後必須消失，不得承載任何會被印出的資訊 | ≤2% |
| 蠟／貼條紙 | `#9C8F72`／`#EFE9D8` | 只在拼版台：貼條的紙影與紙色 | ≤1% |

規則：內頁不得出現第三種墨。強調用「字重、斜體、反白黑塊」，不用顏色。

## 字體系統

- 來源：Google Fonts——Fraunces（ital, opsz, wght, SOFT, WONK）、Hanken Grotesk（ital, wght）、Noto Serif TC 400/900、Noto Sans TC 400/700。
- 字級 scale：封面 h1 64–118px／區段 h2 30–54px／條目 h3 21px／正文 14.5px／評介 14px 斜體／書摘 12.5px 襯線／門路 12px／書眉 11px 全大寫字距 .06em。
- 行高：標題 .92–1.02；正文 1.5；書摘 1.55。
- 中文斜體使用瀏覽器合成斜體即可（原作就是打字機斜體球，不是真斜體設計）。
- `text-wrap:pretty` 用在所有段落；英文片段加 `lang="en"` 讓 `hyphens:auto` 生效。

## 版面與網格

- 頁面最大寬 1240px，右側保留 96px 給拇指索引。
- 首頁＝「型錄跨頁」：左 .9fr 黑封面（4:5），右 1.1fr 用法頁（兩欄）。
- 內頁＝三欄 `column-count`，欄距 22px，區段標題 `column-span:all`。
- 書眉：左刊名＋期數、中說明、右頁碼（Fraunces 800 22px），下方 1.5px 墨線。
- **零旋轉**——印出來的頁是正的；只有拼版台上的貼條允許 ±1.2° 的人手誤差（而且拍版後保留，因為它真的被貼歪了）。
- 留白：條目上下 10–12px，區段之間 26px。密，是這個風格的本體。

## 元件配方

- **導覽（拇指索引 thumb index）**：右緣固定一疊 56px 寬的黑色直書頁籤（目錄／門路／拼一頁），像大開本工具書切口上印的索引；現用頁那一格更寬（72px）、貼齊頁緣；hover 往外抽 10px。≤560px 落成底部三等分黑條。
- **按鈕**：2px 墨框、紙底、Fraunces 800；主要按鈕實黑反白；hover 反色。零圓角零陰影。
- **卡片**：沒有卡片。只有條目（④）和點線框編者按（⑤）。
- **表單**：本風格用「剪下寄回」的邏輯——欄位是底線，不是框。
- **Footer**：1.5px 墨線之上，一行一行列出名稱、地址、電話、營業時間、評介縮寫對照表與「虛構示意」聲明。

## 動效規則

本風格的動效原則：**每一個動態都要是「印刷或拼版」這件事的某個環節**，不加無來由的淡入。

| 類別 | 實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 網點地球：每 66ms 以 AM 網點重畫一格（15fps，經度 +0.012rad），網點本來就不連續 | 載入，離屏即停 | 無限 | 停在第一格 |
| ambient | 蜿蜒分隔線：每條線的 value noise 相位每 83ms 漂移（ts/9000） | 進視窗 | 無限 | 靜止的歪線 |
| input | 6× 布紋放大鏡：游標在網點照上時，以同一解析函式 6 倍重新取樣，網點真的變大 | pointermove（滑鼠），<16ms | 即時 | 照常（使用者自己在動） |
| input | 拖曳貼條：Pointer Events＋setPointerCapture，跟手；放下時 `slap` 220ms `cubic-bezier(.2,.9,.3,1.3)` scale 1.06→1；塞不下就左右抖 300ms 退回 | pointer／鍵盤 1・2・3 | 220ms | 無動畫，直接貼上 |
| transition | 翻報紙：舊頁以左緣為軸 rotateY(−78°) 380ms `cubic-bezier(.55,0,.8,.4)`；新頁 rotateY(62°)→0 460ms `cubic-bezier(.2,.7,.3,1)` | 站內連結 | 380＋460ms | 直接換頁 |
| signature | **拍版 camera-ready dropout**：閃光 500ms → 非複製藍格線、欄框、行數讀數以 `steps(4)` 從「底片」上掉光 → 貼條的紙影與紙色在 0.5s 後消失、只剩黑字與歪著的長條 → 蓋「付印」章、印出報名單 | 按「拍版」 | ~1.15s | 一次切到印好狀態 |

自我限制：本站禁用通用淡入與滾動揭示；所有出現都是「貼上」或「印出」。

### motion-library 元件表（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` 1.39.0 @bafd6002，`tools/ml-embed.js` 依頁產生子集 inline 為每頁第一個 `<script>`；掛載走站內 `TS.ml()`（fonts.ready 後掛、離屏 destroy、一次性文字 loop:false＋seek(1)、reduced-motion 背景 seek(.35)）。元件 Prompt 可由 `MotionLib.prompt(id)` 取得。

| ID | 名稱 | 頁 | 角色 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-04 | Halftone Sweep | 目錄 | ambient | primary `#E9E1CC`・secondary `#1B1915`・bg `#0E0D0B`・duration 9・density 1.1・intensity .32・seed 1968・4:5 | 封面黑底上一道斜向掃過的網點光帶——黑封面本身就是一塊網屏；元件只畫圓點、零漸層零 shadowBlur，符合特徵① |
| TXT-B-10 | Stop Motion | 目錄 | transition | primary `#E9E1CC`・bg `#0E0D0B`・duration 1.6・loop false・seed 31・16:9 | 「工具與門路」逐字以 12 格定格抖進來——像一個字一個字剪下來貼上；暗底→字色自動近白 |
| SHP-33 | Squiggle Draw | 門路 | ambient | primary／secondary `#1B1915`・bg `#E9E1CC`・duration 3.2・intensity .8・seed 7・16:9（容器裁切 200px） | 一條圓頭黑線被慢慢畫出的起伏線＝特徵③那條剪刀線的放大版，當門路頁的開章；底層 softGrid 6% 細格線視為版面格，是唯一妥協 |
| SHP-36 | Dash March | 拼一頁 | ambient | primary／secondary `#8DBCD6`・bg `#E9E1CC`・duration 4・intensity .6・seed 4・16:9（容器裁切 84px） | 虛線框裡套一個虛線圓、虛線緩慢行進＝拼版台上的「照片待補 FPO」位置框；只用非複製藍，拍版後不存在 |
| TXT-A-03 | Stamp In | 拼一頁 | transition | text「付印」・primary `#1B1915`・bg `#E9E1CC`・duration 1.1・loop false・16:9 | 拍版完成後蓋下的「付印」章，印刷廠 OK-to-print 的那一下；元件框角 r=10 的小圓角與 1971 年版圓角連載框同語彙，平面零光暈；亮底→字色自動近黑 |

規則：同一畫面同時運轉的元件 ≤2（目錄頁封面 2 個；拼一頁 FPO＋付印章，章是一次性）。元件不擔任 signature。

## 插畫與圖像風格

全站零圖檔。所有「照片」都是 **AM 網點照**：一個 (x,y)→墨量 的解析函式（夯土牆分層、土窯、竹構、穹頂、等高線淺溝、種子罐、竹鋸、太陽能板、手與土、地球），經 45° 網角、每格一顆圓點、半徑 ∝ √墨量 的網點引擎畫成，再 clip 成橢圓並加 1.4px 墨框。規則：

- 不准用平灰塊或漸層畫陰影——陰影就是網點變大。
- 網格 4–5px（模擬 65 線報紙網屏在螢幕上的視覺密度）。
- 照片旁的圖說是斜體 11px，常附一顆條紋球。
- 線圖（連載框的小動物）用 1.2–1.4px 單線、無填色。

## Logo 與 Favicon 設計指南

- Logo：左邊一個 80×80 實黑方塊，裡面是新聞紙色的網點地球（同一支網點演算法預算成 SVG circles）；右邊 Fraunces 900「土厝目錄」，下面一條手剪歪線，再下面 10px 全大寫字距 3 的「THÔO-TSHÙ CATALOG · 1996」。
- Favicon：32×32 黑底，一個新聞紙色細圈＋七顆大小不一的網點（inline SVG data URI）。
- 禁止：地球加藍色、加光暈、加軌道環。

## Do & Don't

**Do**

- 每一則都簽名；每一則都寫價格與 FROM。
- 讓版面密，讓每頁長得不一樣。
- 灰用網點，強調用字重。
- 寫真實可信的內容：課程天數、人數、月份、地址、電話、逾期規則。

**Don't**

- 紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡片、emoji icon、模糊陰影卡片、Lorem ipsum。
- EST. 19xx 徽章；「在當今快節奏的世界」之類的 AI 腔。
- 直線 column-rule、平灰底塊、第三種墨。
- 把它做成「懷舊紙感 + 打字機字體」——Whole Earth 的正文是 Univers 無襯線，不是 Courier。
- 印出來的頁面上出現非複製藍。

## 頁面骨架範例

```html
<nav class="thumb" aria-label="拇指索引">
  <a href="index.html" aria-current="page">目錄<small>CATALOG</small></a>
  <a href="access.html">門路<small>ACCESS</small></a>
  <a href="pasteup.html">拼一頁<small>PASTE-UP</small></a>
</nav>
<main class="sheet">
  <header class="rh"><span><b>土厝目錄</b> 第 31 期</span><span>新聞紙 11×14½ 吋</span><span class="pg">2</span></header>
  <div class="cols">
    <h2 class="sec" id="shelter">房舍<small>Shelter</small></h2>
    <article class="ent"> … 見特徵④ … </article>
    <div class="ed"><b>編者按</b>……— 璇</div>
  </div>
  <footer class="foot">……</footer>
</main>
```

## 技術實作與相容性

### 1. CSS Multi-column＋`text-wrap: pretty`＋`hyphens: auto`（C 版面層）

承載特徵③：三欄密排、`break-inside: avoid` 讓條目不被切斷、`column-span: all` 讓區段標題橫跨。

- `column-count`／`column-gap`／`column-span`／`break-inside` 在 Chrome、Edge、Firefox、Safari 現行版本皆支援（caniuse「CSS3 Multiple column layout」與 MDN BCD `break-inside` multicol context：Chrome 50+、Firefox 65+、Safari 10+）。注意：caniuse 註記 Firefox 在 multicol 內對 `break-inside: avoid` 的支援曾有落差，本站因此每個條目同時是 `display:block` 的完整 article，即使被切斷也只是欄底多一段，不會遺失內容。
- `text-wrap: pretty`：MDN BCD 記 Chrome／Edge 117+ 支援，Firefox 尚未支援（web-features explorer 標「limited availability」）。**fallback**：不支援的瀏覽器照一般斷行，資訊零損失。MDN 提醒 pretty 有效能成本，本站只用在段落。
- `hyphens: auto` 需要 `lang` 屬性；本站只對 `lang="en"` 片段生效，中文不受影響。
- 查證來源：MDN `text-wrap-style`、caniuse `mdn-css_properties_text-wrap_pretty`、caniuse `mdn-css_properties_break-inside_multicol_context`、web-platform-dx features explorer `text-wrap-pretty`。

### 2. Pointer Events＋`setPointerCapture` 拖曳貼條（D 輸入層）

承載 func〈拼一頁〉與 signature 前段：pointerdown 時 capture，pointermove 以 `position:fixed` 跟手，pointerup 以三欄的 `getBoundingClientRect()` 判定落點，`touch-action:none` 讓手機拖曳不捲頁。

- Pointer Events：web-platform-dx 標「Widely available」（2023-01 起；Chrome 55、Firefox 59、Safari 13、Edge 12）。
- **fallback**：完整鍵盤操作——Tab 到條目、Enter 選取、1／2／3 貼進該欄、Esc 取消、Enter 撕下；點選後再點欄也可。無 JS 時 `<noscript>` 指向門路頁與電話。

### 3. AM 網點引擎＋決定性偽隨機 xorshift32（E 資料與生成層）

承載特徵①⑤與 input「布紋放大鏡」：解析亮度函式（value noise fbm 由 xorshift32 seed 1968 生成 512 格雜湊表）→ 45° 旋轉網格 → 每格 `arc()` 半徑 0.62·cell·√d，一次 `fill()`。同 seed 同結果，每次載入照片長一樣；放大鏡用同一函式以 6× 重新取樣，看到的是真的網點結構。

- Canvas 2D `arc`／`ellipse`／`clip` 全瀏覽器支援；`getContext` 失敗（無 canvas）時引擎直接 return，圖說文字仍在。
- 效能實測（node 22 以假 context 計時、不含光柵化）：一張 300×225 夯土牆照 4,068 點、函式求值 1.3ms／張；封面地球 380×380 共 4,194 點、1.05ms／格，以 15fps 跑每秒約 16ms 計算；首屏三張照片＋地球合計 <10ms 計算。離屏與分頁隱藏即停。（本輪未能在真瀏覽器量光柵化時間，arc 光柵化成本需在實機以 Performance 面板補測。）
- 單頁大小（含 motion-library 子集 ~288KB）：目錄 ~325KB、門路 ~328KB、拼一頁 ~332KB，皆 ≤350KB。首屏同時運轉的 motion-library 元件 ≤2。

### Reduced motion

`prefers-reduced-motion: reduce` 時：網點地球停在第一格、分隔線不漂、翻頁轉場取消、貼條無 slap、拍版直接切到印好狀態、motion-library 背景停在 seek(.35)、文字停在 seek(1)。所有資訊與操作完整保留。
