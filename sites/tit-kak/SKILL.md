---
name: die-neue-typographie-tschichold
description: Weimar-era New Typography (Tschichold's Elementare Typographie 1925 / Die neue Typographie 1928) as a web style — everything hangs off one flush-left axis and nothing is centred, sans-serif only with all-lowercase Latin, black plus exactly one red, heavy bars and circles used as working parts rather than ornament, and DIN A-series √2 sheets where white space is one deliberate block.
---

# Die neue Typographie 新活版術（Tschichold 1925／1928）

> 範例站：直角水電 tit-kak（高雄前鎮水電行）。風格不綁產業：任何需要「讓人一眼找到要緊資訊」的品牌都適用——工廠、診所、交通、公部門、工具型產品。

**歷史座標**：1925 年 10 月，23 歲的 Jan Tschichold 在萊比錫印刷工會刊物《Typographische Mitteilungen》編了一期 24 頁特刊〈Elementare Typographie〉，紅黑兩色印刷，收入 Lissitzky、Moholy-Nagy、Bayer、Schwitters、Burchartz 的作品與他自己的十條原則；當時德國印刷界主流仍是中軸對稱與 Textura 黑體字，特刊引起轟動。1928 年他在柏林出版《Die neue Typographie》（德國印刷工教育協會，240 頁，紅黑套印），把規則系統化：無襯線字、齊左不齊右、不對稱版面、以攝影取代手繪裝飾、留白是構圖元素，並推廣 DIN 476 紙張規格與 DIN 676 標準商業信函。同期 Schwitters 1927 年組「ring neue werbegestalter」（Zwart、Baumeister、Domela、Dexel、Trump、Michel、Burchartz、Vordemberge-Gildewart、Tschichold）。1933 年 Tschichold 被納粹逮捕後流亡巴塞爾，1935《Typographische Gestaltung》、晚年轉向古典對稱，英譯《Asymmetric Typography》1967。

**為什麼長這樣**：它是印刷工人的工具，不是畫家的風格。字盒裡現成的材料只有鉛字、鉛條（粗細線）、圓點與方塊——所以圖形就是黑條與圓；雙色印刷只要兩塊版——所以只有黑和一個紅；商業單據要大量、快、清楚——所以全部齊一條軸、不對稱、不裝飾；德國標準化運動要求紙張與信函規格化——所以版面服從 DIN 比例。

---

## 1. 設計哲學

1. **功能就是形式**：每一個元素都要回答「它在做什麼事」。答不出來就刪。
2. **反中軸**：中軸對稱是為了紙的平衡；新活版術為讀的人排——眼睛只要回到同一條左邊。
3. **對比取代裝飾**：大與小、黑與白、滿與空、水平與垂直。版面的生命來自反差，不是花邊。
4. **一張紙只有一個最要緊的地方**：紅色只標它。
5. **標準化是美德**：A 系列紙、固定欄寬、固定字級階梯、全小寫，減少決策。

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--paper` | `#EDEFEA` | 頁面底：偏冷的白報紙，不是米白 | ~70% |
| `--sheet` | `#F7F8F4` | 「紙張」物件（a5 傳單、地圖）比頁面更白一階 | ~8% |
| `--ink` | `#121212` | 全部文字、黑條、圓、icon | ~19% |
| `--red` | `#EE3A1C` | **唯一強調色**（HKS 13／朱紅系）：每個視口最多 1–2 處——現用頁、最要緊的數字、警告、焦點框 | ≤3% |
| `--grey` | `#8C918F` | 只給「尚未成立」的讀數（例：未亮的規則說明） | <1% |

硬規則：零漸層（唯一例外是轉場遮罩上的硬停點紅帶）、零陰影、零圓角（圓只以「圓形零件」出現，不做圓角矩形）、零透明疊色、零第三彩色。

## 3. 字體系統

- **拉丁**：Jost（Google Fonts，Futura 系幾何無襯線，300/400/500/700/900）。**全小寫**：`text-transform:lowercase`，包括標籤、按鈕、導覽。數字用 tabular。
- **中文**：Noto Sans TC 400/500/700/900。標題一律 900，內文 400。
- **對照用舊式**：Noto Serif TC（只在「1971 舊版」中出現，用來被淘汰）。
- **字級階梯（極端反差）**：11（標籤，letter-spacing .14em）／13–15（內文）／18–30（項目）／34–72（區塊標題）／72–190（展示級時鐘、店名）。同屏最大÷最小 ≥ 5。
- **行高**：標題 .86–1.05、內文 1.5–1.6。齊左不齊右，永不兩端對齊、永不置中。
- `text-box: trim-both cap alphabetic`（漸進增強）讓大字的字頭字腳貼齊黑條。

## 4. 版面與網格

- **一條軸**：全站內容左緣 = `--ax: clamp(150px,16vw,240px)`；所有區塊標題、列表、表格、頁尾都從這條線起頭。軸左側只放折線記號導覽。
- **兩欄不等寬**：4/8、3/9、5/7、7/5；永不 6/6。
- **水平分隔**：2px 黑線分列、14px 黑條分大區（頁尾上緣、表格頂端）。
- **留白是形狀**：區塊間距 96–140px，留成整塊，不平均撒在四周。
- **紙張物件一律 √2**：`aspect-ratio:1/1.4142`；24×24 網格（欄寬 100/24%，列高 141.42/24 cqi）。
- **旋轉**：本站不用斜角（保留給構成主義近親）；若要對角線，只用 Lissitzky 式 −12°～−15° 單一斜軸。

## 5. 元件配方

- **導覽 falzmarke**：左緣固定四根短橫線，位置是 DIN 676 信紙的折線與打孔記號（105／148.5／210 mm ÷ 297 → 35.35%／50%／70.71%，第四根 86%）。`i{width:18px;height:2px}`，現用頁 `width:52px;height:5px;background:var(--red)`。≤900px 攤成底部四格。
- **頁首**：logo（直角 L 形黑條＋紅圓）＋中文店名 900＋小寫拉丁副名；下方一條 6px 黑「導線」，一顆紅點沿線流動（環境動效）。
- **按鈕**：2px 黑框方塊、無圓角；主要按鈕實心黑底紙色字；`:disabled` 透明度 .35。
- **列（row）**：`grid-template-columns:56px 3fr 5fr auto`，2px 黑線分隔；hover 時上緣一道 6px 紅條由左向右長出（scaleX，120ms）。
- **表單／勾選**：圓形勾選＝空心黑圓 → 實心黑圓內含紅點（圓是開關零件）。
- **頁尾**：上緣 14px 黑條、四欄、標籤為紅色小寫 11px、最末一行 imprint（小寫）。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 做法 | 參數 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 頁首黑導線上一顆 56px 紅「電流」持續流動；時鐘與出勤狀態依台北真實時刻每 15–20 s 更新 | `translateX` 3.6s linear infinite | 紅點靜止於左端；時刻文字照常更新 |
| input 輸入 | 列 hover 上緣紅條 scaleX；〈排一張〉拖曳以網格吸附、即時重判五條規則、錨定標註跟著元件走 | 120ms `cubic-bezier(.2,.8,.2,1)`；判讀 <1ms | 無過渡，直接切換 |
| transition 轉場 | 換頁：黑底遮罩以 −14° 斜邊 `clip-path` 由左推入（含一道紅帶），新頁再由左向右退出 | 340ms／380ms `cubic-bezier(.7,0,.2,1)` | 直接換頁 |
| signature 簽名 | **中軸解除**：首頁 1971 置中傳單隨捲動一行一行滑向左軸、明體淡出換無襯線、花框散開、紅條長出、右上黑條垂下 | `animation-timeline: --reset`，range contain 8%→62%（行）、55%→80%（紅條） | 直接呈現新版，按鈕可切回 1971 |

自我限制：不用淡入揭示當主打、不用視差、不用彈跳。

## 7. 插畫與圖像風格（elementar-bausteine 字盒元件構圖）

圖像只准用三種「字盒裡找得到的」原語：**黑條（矩形）／圓／三角箭頭**，單色黑，每張圖最多一個紅零件。48×48 viewBox、條寬 5–7。範例：抓漏＝橫管＋直管＋紅色水滴圓；配電盤＝三根直條其中一根紅＋底條；抽水馬達＝圓＋橫條＋紅三角。地圖＝街道是粗細不同的黑條、店是紅圓、北方是條加三角。年表的長度條＝年數。禁止描邊線稿、禁止曲線外框、禁止陰影。

## 8. Logo 與 Favicon

Logo 是一個直角：12 單位寬的黑直條＋同寬黑橫條在左下相接成 L，右上空出的象限放一顆紅圓（r=11/64）。favicon 同圖、inline SVG data URI、背景 `#EDEFEA`。字標：中文 900＋小寫拉丁 500，永不置中於 logo 下方——靠 logo 右側底線對齊。

## 9. Do & Don't

- ✅ 所有文字齊左、靠同一條軸；❌ 任何置中（包括按鈕文字以外的標題、頁尾、卡片）
- ✅ 拉丁全小寫；❌ 全大寫標題、Title Case
- ✅ 一屏一道紅；❌ 紅色大面積底、紅字段落、兩種紅
- ✅ 黑條做分隔與重量；❌ 花框、花飾 ❖、口號、徽章、EST. 年份章
- ✅ 字級極端反差；❌ 平均的 16/20/24 階梯
- ✅ √2 紙張物件；❌ 16:9 卡片、圓角卡片、模糊陰影
- ❌ 去AI化禁令：紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡、emoji icon、Lorem ipsum、「在當今快節奏的世界」

## 10. 頁面骨架範例

```html
<nav class="falz" aria-label="頁面">
  <a href="index.html" style="--y:35.35%" aria-current="page"><i></i><b>01</b><span>首頁 start</span></a>
  <a href="rates.html" style="--y:50%"><i></i><b>02</b><span>價目 tarif</span></a>
  <a href="set.html" style="--y:70.71%"><i></i><b>03</b><span>排一張 setzen</span></a>
  <a href="about.html" style="--y:86%"><i></i><b>04</b><span>店史 über uns</span></a>
</nav>
<header class="hd"><a class="brand" href="index.html"><svg>…</svg><div><b>直角水電</b><span>tit-kak · since 1971</span></div></a></header>
<div class="wire"></div>
<main style="padding-left:var(--ax)">
  <section class="two"><!-- 4/8 -->
    <h2>修什麼</h2>
    <div><a class="row"><svg><use href="#i-leak"/></svg><h3>抓漏</h3><p>…</p><span class="pr">2,500</span></a></div>
  </section>
</main>
<footer class="ft">…</footer>
```

---

## 11. 本風格的 5 個不可省略特徵

### ① 一條軸，零置中（拿掉它就是一般的極簡網站）

所有文字從同一條左緣起頭；任何段落、標題、頁尾都不准置中。軸左側只能放記號。

```css
:root{--ax:clamp(150px,16vw,240px)}
main,.ft,.hd{padding-left:var(--ax)}
h1,h2,h3,p,li{text-align:left}            /* 沒有任何 text-align:center */
.two{display:grid;grid-template-columns:4fr 8fr}  /* 永不 6fr 6fr */
```

### ② 無襯線＋拉丁全小寫（拿掉它就變成瑞士國際主義或一般企業風）

```css
body{font-family:"Jost","Noto Sans TC",sans-serif}
.k,nav,button,.label{text-transform:lowercase;letter-spacing:.14em;font-weight:700;font-size:11px}
h1,h2{font-family:"Noto Sans TC";font-weight:900;line-height:.9}
```

### ③ 黑＋唯一一道紅（拿掉它就是單色極簡；多一色就是包浩斯）

```css
:root{--ink:#121212;--red:#EE3A1C;--paper:#EDEFEA}
.mark{background:var(--red)}               /* 每個視口 1–2 處 */
[aria-current=page] i{background:var(--red)}
:focus-visible{outline:3px solid var(--red)}
```

### ④ 粗條與圓是零件（拿掉它版面就沒有重量與方向）

```html
<svg viewBox="0 0 48 48"><rect x="2" y="12" width="44" height="7"/><rect x="29" y="12" width="7" height="18"/><circle cx="32.5" cy="39" r="5" fill="#EE3A1C"/></svg>
```
```css
.ft{border-top:14px solid var(--ink)}       /* 大區分隔＝粗條 */
.row{border-top:2px solid var(--ink)}       /* 列分隔＝細條 */
.wire{height:6px;background:var(--ink)}     /* 導線 */
```

### ⑤ DIN √2 紙張＋整塊留白（拿掉它就沒有「規格」的氣質）

```css
.sheet{aspect-ratio:1/1.4142;container-type:inline-size;background:#F7F8F4}
.sheet h1{font-size:17.5cqi}               /* 字級以紙寬計，任何尺寸構圖一致 */
section+section{margin-top:clamp(96px,12vw,140px)}  /* 白留成整塊 */
@page{size:A5;margin:0}
```

---

## 12. 技術實作與相容性

### A. CSS scroll-driven animations（B 動效與時間軸層）— 承載簽名「中軸解除」

- 寫法：`.reset{height:290vh;view-timeline:--reset block}`，sticky 內層；各行 `animation:k-ln linear both; animation-timeline:--reset; animation-range:contain 8% contain 62%`，`@keyframes k-ln{0%{translate:var(--dx) 0}100%{translate:0 0}}`。`--dx` 由 JS 量測（(內框寬 − 舊版行寬)/2）並以 ResizeObserver 與 `document.fonts.ready` 重算——這是唯一的 JS；動畫本身在合成器上跑。
- 支援（查證：Chrome for Developers〈Animate elements on scroll with Scroll-driven animations〉之 MDN 相容表，2026-10）：Chrome／Edge 115、Safari 26；Firefox 僅 Technology Preview。
- Fallback：`@supports (animation-timeline:view())` 不成立或 reduced-motion 時，區塊高度回到自然高度、直接呈現新版；「1971 中軸／2026 一條軸」按鈕改以 class 切換＋CSS transition（reduced-motion 下無過渡）。資訊零損失：兩版文字內容相同，且「為什麼長這樣」段落完整列出差異。

### B. CSS anchor positioning（C 版面與樣式層）— 承載〈排一張〉的規則標註

- 每個版面元件 `anchor-name:--b-<id>`；被選取者另加 `--sel`（`anchor-name` 可列多個名字）。標註以 `left:anchor(--b-h left); top:anchor(--b-h top)` 拴住；**紅色軸線同時用 `top:anchor(--b-<最上> top)` 與 `bottom:anchor(--b-<最下> bottom)` 拴在兩個不同元件上**，元件被拖動時線段自動伸縮；浮動工具列 `bottom:anchor(--sel top)` ＋ `position-try-fallbacks:flip-block`。標註容器用 `display:contents`，確保標註的包含塊與元件相同、且在樹順序上位於元件之後（anchor 可接受性條件）。
- 支援（查證：MDN `anchor()` 標示 Baseline 2026 Newly available；Chrome／Edge 125、Safari 26、Firefox 147〔2026-01〕）。注意：caniuse 指出 Firefox 對「transform 後定位」子特性仍不支援——本站元件只改 `left/top`、不用 transform，避開此差異；避免使用單值 `position-anchor`（Firefox 曾有回報 bug），一律寫明 `anchor(--name side)`。
- Fallback：`CSS.supports('anchor-name','--a')` 為否時，同一份 spec 由 JS 以 `offsetLeft/offsetTop` 換算 px 寫入，視覺一致。

### C. 規則引擎＋最大空矩形（E 資料與生成層）— 承載 func 本體

- 24×24 佔用格；五條規則：中線偏差 <0.75 欄即判「置中」、同左緣欄 ≥3 件＝軸、紅件數 =1、文字最大÷最小 ≥5、零裝飾＋零重疊＋最大空矩形（直方圖單調堆疊法，O(行×欄)）≥22%。
- 實測（node 22，6–7 件元件）：每次判讀約 0.1 ms；拖曳只在吸附格變動時重判。
- 不依賴任何瀏覽器 API；無 JS 時 `<noscript>` 給出完整規則文字。

### 其他（非主技術）

- `text-box: trim-both cap alphabetic`：Chrome 133／Safari 18.2，Firefox 未支援（MDN：limited availability）；不支援時僅字頭留白略多，無功能影響。
- 換頁轉場：WAAPI 驅動 `clip-path: polygon()` 斜邊遮罩；sessionStorage 旗標決定新頁是否播退場（try/catch）。

### 效能

- 單頁 21–34 KB（含 inline CSS/JS/SVG），遠低於 350 KB；無外部圖片音檔，字體僅 Google Fonts。
- 首屏 JS：量測 8 行寬＋時鐘，<5 ms（jsdom 下 4 頁無錯誤）；主要動畫皆為 `translate`／`transform`／`opacity`，可合成，無 layout thrashing。

## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-B-18` | Horizontal Lines | primary #121212／secondary #EE3A1C／bg #EDEFEA、duration 9、density 0.7、intensity 1、seed 1971 | ambient：一疊全寬黑條粗細緩慢起伏、往下推移，每六條才一道紅——鉛條（粗細線）本來就是字盒裡的零件，特徵④的粗條當作重量；元件只用 fillRect 直角矩形、零圓角零漸層，帶子從左軸 --ax 起頭，不置中。 |
| rates.html | `TXT-A-08` | Slide Text | primary #EE3A1C／secondary #121212／bg #EDEFEA、text 工資 明碼、duration 1.2、aspectRatio 16:9、seed 4（一次性，進視窗播放、點擊重播） | input：字一個一個從左邊滑進來、下方一道紅條由左向右長出——正是本站列 hover 的紅條 scaleX 與簽名「中軸解除」行滑向左軸的同一個動作；拉丁全小寫、紙底黑字、一道紅。 |
| set.html | `TXT-A-27` | Typewriter | primary #EE3A1C／secondary #121212／bg #EDEFEA、text 排一張 setzen、duration 1.8、aspectRatio 16:9、seed 8（一次性，進視窗播放、點擊重播） | input：〈排一張〉就是排字：字一格一格落進排字盒，紅色方塊游標（實心矩形）在行尾閃——活版術的工作過程本身；無透明、無圓角，單一紅零件。 |
| about.html | `SHP-34` | Circle Draw | primary #121212／secondary #EE3A1C／bg #EDEFEA、duration 2、intensity 1、scroll true、aspectRatio 1:1、seed 2（捲動驅動） | input：捲動店史時，一個黑圓隨捲動進度被畫滿、前端一顆紅點跟著走——圓是零件不是裝飾（特徵④），紅點就是頁首導線那顆『電流』；以捲動 seek，等於讀到哪、圓就閉合到哪。 |
