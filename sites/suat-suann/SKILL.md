---
name: wpa-national-park-poster
description: WPA National Park Poster style (US Federal Art Project silkscreens for the National Park Service, 1938–1941) for the web — opaque flat silkscreen ink planes, hard-edged banded skies, an atmospheric-perspective value ladder of layered ridges, one monumental faceted peak framed by foreground conifer silhouettes, and a solid bottom caption band in heavy geometric sans capitals.
---

# WPA 國家公園絹印海報 WPA National Park Poster

> 示範站：雪山望遠鏡行 SUAT-SUANN BINOCULARS（臺中東勢的雙筒望遠鏡店，修鏡・租鏡・清晨大雪山鳥導，虛構）

## 一、設計哲學

1935 年羅斯福新政的公共事業振興署（WPA）成立聯邦藝術計畫（Federal Art Project），其中的海報部門用**絹印**大量印製公共服務海報——健康、劇場、圖書館、旅遊。1938–1941 年國家公園管理局委託 WPA 藝術家替國家公園做海報，戰爭開始前只完成 **14 款、13 座公園**（黃石兩款），每款約印 100 張，今日已知倖存約 40 張。C. Don Powell（WPA-FAP 海報部門首席設計）是唯一能以當時照片確認參與的人。1970 年代前公園巡山員 Doug Leen 在大提頓的倉庫裡找到一張，之後花數十年尋回、修復並重製整個系列，今天被叫作「國家公園海報風」的那種畫面，就是從這 14 張長出來的。

它長成這樣，是因為**絹印的限制**：一色一版、墨是不透明的膜、沒有網點、沒有漸層。於是：

- 天空的漸層只能拆成 3–4 條硬邊水平色帶；
- 遠近只能靠**明度階梯**（越遠越淡越接近天色）而不是模糊或細節；
- 山被簡化成 2–3 個平面（光面、陰面、雪），樹被簡化成三角形疊層；
- 公共服務海報要在遠處讀得到，所以底部一條實色字帶、粗幾何無襯線全大寫。

本風格的品質感來自**克制的墨數**（5–7 罐）和**一張圖只說一件事**（一座山、一條路、一隻鳥）。它不是插畫，是印刷品。

## 二、本風格的 5 個不可省略特徵

### ① 平塗不透明的絹印色面——零描邊、零漸層、零陰影

拿掉它就變成「扁平插畫」。每個形是一塊實色，邊是硬的；沒有 stroke、沒有 `linear-gradient`、沒有 `box-shadow` 模糊、沒有 `opacity` 疊色（唯一的例外是 UI 遮罩，例如望遠鏡外的暗場）。天空的「漸層」是 4 條硬邊色帶：

```html
<rect class="sky0" x="18" y="18"  width="564" height="864"/>
<rect class="sky1" x="18" y="110" width="564" height="772"/>
<rect class="sky2" x="18" y="202" width="564" height="680"/>
<rect class="sky3" x="18" y="294" width="564" height="588"/>
```
```css
.sky0{fill:var(--sky0)}.sky1{fill:var(--sky1)}.sky2{fill:var(--sky2)}.sky3{fill:var(--sky3)}
:root{--sky0:color-mix(in oklch,var(--sky) 100%,var(--glow));--sky1:color-mix(in oklch,var(--sky) 67%,var(--glow));
      --sky2:color-mix(in oklch,var(--sky) 33%,var(--glow));--sky3:var(--glow)}
svg *{stroke:none}
```

### ② 大氣透視的明度階梯——每遠一層，往地平線色混一階

拿掉它就沒有空間。由遠到近 5–6 層山稜，每一層的顏色＝「最近的墨」以固定百分比混進「地平線色」。全站只定三個基準色 `--sky / --glow / --ink`，其餘全部推導：

```css
:root{--sky:#E8BE5E;--glow:#F5E3AE;--ink:#1E3A2C;
 --r1:color-mix(in oklch,var(--ink) 16%,var(--glow));  /* 最遠的山 */
 --r2:color-mix(in oklch,var(--ink) 30%,var(--glow));  /* 主峰光面 */
 --r2s:color-mix(in oklch,var(--ink) 44%,var(--glow)); /* 主峰陰面 */
 --r3:color-mix(in oklch,var(--ink) 50%,var(--glow));
 --r4:color-mix(in oklch,var(--ink) 68%,var(--glow));
 --r5:color-mix(in oklch,var(--ink) 86%,var(--glow)); /* 最近的地面 */}
.r1{fill:var(--r1)}.r2{fill:var(--r2)}.r2s{fill:var(--r2s)}.r3{fill:var(--r3)}.r4{fill:var(--r4)}.r5{fill:var(--r5)}.ink{fill:var(--ink)}
```
換一組 `--sky/--glow/--ink` 就是另一個時辰的版（晨／晝／暮／夜），階梯自動成立。

### ③ 紀念碑式主峰＋前景冷杉框景＋低地平線，直式 2:3

拿掉它就變成風景桌布。一張海報一座主角山：比例誇張地高、兩坡近乎直線、只切成光面與陰面兩塊（＋一塊雪）。畫面左右邊緣各一叢最深色的冷杉剪影把觀者「框」在路邊；地平線壓在下 1/3。

```svg
<!-- 主峰：中點位移稜線＋疊上一個尖峰；陰面從峰頂切到右下 -->
<path class="r2"  d="M18,760 L18,470 … L330,250 … L582,500 L582,760Z"/>
<path class="r2s" d="M330,250 L360,280 … L528,430 L362,760Z"/>
<path class="snow" d="M330,248 L364,284 L344,288 L322,276 L304,252Z"/>
<!-- 冷杉：三層三角＋幹，最深的墨 -->
<path class="ink" d="M34,510 L80,635 L-12,635Z M34,580 L92,705 L-24,705Z M34,650 L104,760 L-36,760Z"/>
```

### ④ 底部實色字帶：粗幾何無襯線全大寫＋粗黑中文

拿掉它就不是海報。畫面下方 15% 是一條最深墨的實色帶，上面一行小字地名（太陽色、字距 0.2em）、一行巨大標語、一行署名。

```css
.band{fill:var(--ink)}
.bt-top{font:700 14px/1 "League Spartan",sans-serif;letter-spacing:.2em;fill:var(--sun)}
.bt-big{font:800 84px/1 "League Spartan","Noto Sans TC",sans-serif;letter-spacing:.02em;fill:var(--paper)}
.bt-sm {font:700 15px/1 "League Spartan",sans-serif;letter-spacing:.12em;fill:var(--paper)}
```
```svg
<rect class="band" x="18" y="742" width="564" height="140"/>
<text class="bt-top" x="300" y="770" text-anchor="middle">臺中東勢 ・ 大雪山林道 23K－50K</text>
<text class="bt-big" x="300" y="826" text-anchor="middle">SEE 大雪山</text>
<text class="bt-sm"  x="300" y="860" text-anchor="middle">雪山望遠鏡行 ・ SUAT-SUANN BINOCULARS</text>
```

### ⑤ 紙白留邊、紙纖維、實心圓太陽與平底硬邊雲

拿掉它就是螢幕圖。海報四周留 18/600（3%）未印的紙；頁面底是帶纖維的紙色；太陽（或月亮）是一枚沒有光暈的實心圓；雲是平底、上緣三段弧的剪形。

```css
body{background:#EFE4C8 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='4'/%3E%3CfeColorMatrix values='0 0 0 0 .36 0 0 0 0 .27 0 0 0 0 .12 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E")}
```
```svg
<rect class="paper" width="600" height="900"/>          <!-- 紙邊 -->
<circle class="sun" cx="410" cy="250" r="52"/>
<path class="cloud" d="M80,210h170a34,34 0 0 0-41-26a45,45 0 0 0-61-19a37,37 0 0 0-51,21a22,22 0 0 0-17,24Z"/>
```

## 三、色彩系統

三個基準色決定一切，另有三個點色。四個版次：

| 版 | 時段（臺北） | --sky | --glow（地平線） | --ink | --sun |
|---|---|---|---|---|---|
| 晝 | 09–16 | `#E8BE5E` 麥稈 | `#F5E3AE` | `#1E3A2C` 雲杉 | `#D45A27` |
| 晨 | 05–09 | `#E39A72` 杏 | `#F6D8AE` | `#29344A` 岩板 | `#F0BE48` |
| 暮 | 16–19 | `#C24E36` 磚 | `#EFA457` | `#2C2230` 茄墨 | `#F5D266` |
| 夜 | 19–05 | `#152E37` | `#2E5663` | `#0A161B` | `#EFE4C8`（月） |

固定色：紙 `#EFE4C8`（頁底、留邊）、紙二 `#E6D7B3`（交替列）、鏽紅 `#B5452B`（按鈕、價錢、焦點框）、酒紅 `#8A2E3E`（只在鳥）、雪 `#F8EFD6`、林道 `#E9D9B0`、內文墨 `#1C231E`。

比例（晝版首屏）：天空四帶 ≈35%、山稜階梯 ≈35%、最深墨（前景＋字帶）≈20%、紙 ≈7%、太陽 ≈3%。**禁止紫藍漸層**；夜版是深青平帶，不是漸層。

## 四、字體系統

- 拉丁：**League Spartan** 600／700／800（Google Fonts，Futura／Kabel 系幾何無襯線）；全大寫，標語字距 .02em、小字 .12–.24em。
- 中文：**Noto Sans TC** 900 標題、700 標籤、400 內文。
- 字級：海報標語 84/600 viewBox；頁面 H1 clamp(46px,7vw,96px)；H2 clamp(26px,3.4vw,42px)；內文 16px/1.75；標籤 12px/1.2 字距 .24em。
- 不用襯線、不用手寫、不用細字重。

## 五、版面與網格

- 每頁第一屏是一張 2:3 海報（或一張 3:1 全景），海報右下有 10px 實色硬影（`box-shadow:10px 10px 0 var(--ink)`，零模糊）。
- 右側 84px 墨色直條是「海報架」導覽；內容區右邊距＝gutter＋84px。
- 資訊用**實色字帶標題**（capband）＋粗 3–4px 實線分隔的列表，不用卡片。
- 零旋轉、零圓角（例外：太陽、雲弧、望遠鏡圓）。留白：區塊間 70–80px。

## 六、元件配方

- **字帶標題 capband**：`display:flex;background:var(--ink);color:var(--paper);padding:14px 20px 10px` ＋右側太陽色英文小字。
- **按鈕**：`font:800 15px/1 var(--sans);text-transform:uppercase;background:var(--rust);color:var(--paper);padding:14px 18px 12px;border:0`；hover 換成墨底；次要按鈕紙底＋`inset 0 0 0 3px var(--ink)`。
- **價目**：`dl` 兩欄 grid，價錢 League Spartan 800；三欄框 `border:4px solid var(--ink)`，欄間 4px 實線，一欄整塊太陽色。
- **導覽（海報架）**：四張 60×90 迷你海報直排；現用頁全彩＋3px 太陽色外框＋左側三角；其他頁是**單墨打樣**（全部填鏽紅與紙色），hover 轉全彩並左移 8px、轉 −2°。≤760px 變底部 76px 橫排。
- **頁尾**：墨底、紙字、太陽色小標，三欄。

## 七、動效規則（四種，缺一不可）

| 種類 | 觸發 | 規格 |
|---|---|---|
| ambient | 時間 | 雲 `translateX(0→60px)` 80s／110s linear alternate；太陽 `translateY` 依臺北時刻（|時−12.5|×14px，上限 150px，1.2s）；每 60 秒重算版次 |
| ambient | 換版 | `transition:fill .7s cubic-bezier(.3,.6,.2,1)`，延遲由遠而近：天 0s → 日雲 .1 → r1 .22 → r2 .34 → r3 .46 → r4 .58 → 前景 .7 → 字帶 .82（像一版一版重新刷墨） |
| input | pointermove | 海報各層 `translate(-x·k, -y·k·.4)`，k＝1/2/4/7/11px（遠→近），`transition:transform .12s linear` |
| transition | 點內部連結 | FLIP：海報縮回架上自己那一格（430ms `cubic-bezier(.6,0,.8,.4)`），下一頁海報從架上取下展開（640ms `cubic-bezier(.15,.75,.2,1)`） |
| signature | pointer／wheel／鍵盤 | 雙筒視野：兩圓相交 clip、倍率 2.3×／3×、逐層 `feGaussianBlur stdDeviation = min(4, d²·22 + d·3)`（d＝對焦與該層景深差）、鏡頭 60ms 指數追手、10× 手震 2.4 單位 |

自我限制：不做淡入揭示、不做視差捲動劫持、不做跑馬燈。`prefers-reduced-motion`：雲停、換版瞬間完成、無 FLIP、無手震；鏡頭仍跟手、可選「不計時」。

### motion-library 元件表（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` v1.3.0 @21a3e11，以 `tools/ml-embed.js` 逐頁抽子集，`MotionLib.prompt(id)` 可取得各元件開發 Prompt。顏色一律取當前版次色票（`SS.inks()`）。

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| BG-B-18 | Horizontal Lines | index | colors{primary:--glow, secondary:--sun, bg:--ink}, duration 9, density .7, intensity .8, seed 23, 16:9 裁成 120px 高條 | 晨霧帶：粗細起伏的水平色帶往上退＝WPA 天空的硬邊色帶在動；只有 fillRect |
| TXT-A-36 | Long Shadow | index | text「本週鳥況」, colors{primary:--rust, secondary:--ink, bg:#EFE4C8}, duration 1.6, loop:false, seed 5 | 1930 年代海報的實色斜向厚影字；影色是紙與鏽紅的平塗混色 |
| TXT-A-03 | Stamp In | spot | text＝鳥名／「N／8 種」, colors{primary:--rust, secondary:--ink, bg:#EFE4C8}, duration 1.1, loop:false, seed 9 | 國家公園護照戳：每記一種鳥砸一次 |
| TXT-B-12 | Magnifier Lens | gear | text「看清楚」, colors{primary:--rust, secondary:--ink, bg:#EFE4C8}, duration 2.2, loop:false, seed 4 | 鏡頁標題被一枚鏡片掃過放大 |
| SHP-37 | Path Follow | visit | colors{primary:--rust, secondary:--ink, bg:#E6D7B3}, duration 3.2, loop, seed 50 | 之字形林道被箭頭走完 |

掛載：等 `document.fonts.ready`；IntersectionObserver 離屏 `destroy()`、回到視窗重掛；一次性文字 `loop:false` 播一次後 `seek(1)`；canvas `aria-hidden`；容器內保留 HTML 標題 `.ml-fb`，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。元件不得擔任 signature。

## 八、插畫與圖像風格：絹印稜線階 silkscreen-ridge-ladder

- 山稜：1D 中點位移（`rough .5–.55`、2⁶–2⁷ 段）＋疊加尖峰函數 `y -= h·(1-d)²` 做出紀念碑主峰；決定性 PRNG（mulberry32），同 seed 同山。
- 陰面：從峰頂沿右坡取 2.2×lean 寬，再直線切到底部——一刀，兩個平面。
- 樹：三層等腰三角＋矩形幹；中景樹用 r3d、前景用最深墨。
- 鳥：橢圓身＋圓頭＋多邊形尾＋三角喙，2–3 色；長尾雉加紙色橫斑。
- 只用 `<path>/<rect>/<circle>/<ellipse>` 的 `fill`；不用 stroke（唯一例外：望遠鏡準星）。

## 九、Logo 與 Favicon

Logo 是一張 120×180 的迷你 WPA 海報：紙邊、兩帶天空、太陽、帶雪的主峰（光／陰兩面）、兩叢冷杉、底部墨帶上一副雙筒望遠鏡（兩個紙色圓環）與 `SUAT-SUANN`。Favicon 是 32×48 同構圖的四色簡化版（data URI inline SVG）。

## 十、Do & Don't

**Do**：三個基準色推導全站；每張圖一個主角；字帶必有；紙邊必留；換版要由遠而近。
**Don't**：漸層（含天空）、描邊插圖、模糊陰影、半透明疊色、細字、圓角卡片、置中三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章、紫藍漸層、把 WPA 當成「復古濾鏡」加顆粒雜訊就交差。

## 十一、頁面骨架（可直接使用）

```html
<html lang="zh-Hant" data-ed="day">
<body>
<nav class="rack" aria-label="海報系列">
  <a href="index.html" aria-current="page"><svg viewBox="0 0 60 90">…迷你海報…</svg><span class="lbl">Nº1<b>大雪山</b></span></a>
  <a href="spot.html"><svg viewBox="0 0 60 90">…</svg><span class="lbl">Nº2<b>帝雉在哪</b></span></a>
</nav>
<main>
 <section class="hero">
  <div data-hero data-parallax><svg class="poster" viewBox="0 0 600 900">
   <rect class="paper" width="600" height="900"/>
   <g class="print">…sky0–3…<circle class="sun"/>…<g class="L L1"><path class="r1"/></g>…<g class="L L5"><path class="ink"/></g></g>
   <rect class="band" x="18" y="742" width="564" height="140"/><text class="bt-big" x="300" y="826" text-anchor="middle">SEE 大雪山</text>
  </svg></div>
  <div class="intro"><h1>店名<span class="en">English Name</span></h1><p class="lede">…</p></div>
 </section>
 <p class="capband"><span>大雪山林道 ・ 本週鳥況</span><span class="en">Weekly bird report</span></p>
</main>
</body></html>
```

## 十二、技術實作與相容性

### A. CSS `color-mix(in oklch, …)` 大氣透視階梯（C 版面與樣式層）——承載特徵①②與四個版次
- 現況：MDN 標為 **Baseline Widely available**（自 2023-05 起跨瀏覽器）；Chrome／Edge 111、Firefox 113、Safari 16.2。
- fallback：建置期先以 sRGB 線性混色算好十二個 hex 寫成一般宣告，再用 `@supports (color:color-mix(in oklch,red,blue))` 覆寫為 `color-mix()`。不支援的瀏覽器看到的是 sRGB 階梯（中間調略灰），結構完全相同。
- 為什麼需要它：絹印的空間感只來自明度階梯；把階梯寫成「ink 的百分比」，四個版次只需改三個變數，且 OKLCH 混色在暖色天空下不會像 sRGB 那樣混出灰泥。

### B. `Intl.DateTimeFormat({timeZone:'Asia/Taipei', hourCycle:'h23'})` 時刻驅動版次（B 動效與時間軸層）——承載 ambient
- `formatToParts` 取臺北時與分 → 晨 05–09／晝 09–16／暮 16–19／夜 19–05，寫入 `html[data-ed]`；每 60 秒重算。`sessionStorage` 記住手動選的版（try/catch 包住）。
- `Intl.DateTimeFormat` 與 `timeZone` 為 Baseline Widely available；例外時退回本機時間。
- 換版的「一版一版重新上墨」是純 CSS `transition:fill` ＋逐層 `transition-delay`，SVG `fill` 可補間。

### C. SVG `<use>` 放大鏡像＋`<clipPath>` 雙圓＋逐層 `<feGaussianBlur>`（A 渲染層）——承載 signature 與〈帝雉在哪〉
- 全景每一層山稜是一個 `<g id="L1…L5">`；視野層用六個 `<use href="#Ln" filter="url(#fbn)">` 疊回去，整組套 `translate(c) scale(z) translate(-c)`，再以兩個 `<circle>` 組成的 `<clipPath>` 切出雙筒視野；暗場是 `<mask>` 挖兩個洞的墨色矩形。
- 對焦：每幀依 `d=|focus−depth|` 設各層 `stdDeviation`；鳥在視野中心（距離 < r·.42/z+6）且 d<.12 持續 0.8s 即記錄。
- 查證：MDN `<feGaussianBlur>` **Baseline Widely available**（自 2018-10；Chrome 5、Firefox 3、Safari 6）；`stdDeviation` 不可為負，0 等於不模糊。`<use href>`（無 xlink）各現代瀏覽器皆支援。
- fallback：無 JS 時全景仍是完整海報，下方列出八種鳥與位置；`<noscript>` 說明。

### 預算（建置輸出實測）
- 單頁：index 93KB、spot 112KB、gear 119KB、visit 86KB（含 inline motion-library 子集約 49.5KB），皆 ≤350KB。
- 首屏 JS：只有版次計算、視差與 ML 掛載（等字型後），無大型同步運算；全景與海報於建置期生成為靜態 SVG。
- 動畫：雲為 CSS transform；視野每幀只改 6 個屬性＋1 個 transform；同畫面運轉元件 ≤2 個。

### 參考來源
- Saturday Evening Post〈WPA Poster Project: Promoting Our Parks〉；Journal of Antiques and Collectibles〈The Significance and Nostalgia of the WPA National Park Posters〉；The Pursuit of History〈National Parks Posters from the WPA Era〉；Black Hills Parks〈Ranger Doug WPA Park Posters〉
- MDN `color-mix()`；Chrome for Developers〈CSS color-mix()〉；MDN `<feGaussianBlur>`、`stdDeviation`

## 十三、驗收：三秒辨識測試

遮掉全部文字看首屏：一張直式海報、紙白留邊、四條硬邊色帶的天、一枚實心太陽、一座切成光暗兩面的雪峰、往前一層比一層深的山稜、兩側深色冷杉、底部一條實色帶——懂設計的人會說「國家公園海報／WPA poster」。
