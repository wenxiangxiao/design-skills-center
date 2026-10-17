---
name: mixteca-puebla-codex
description: Mesoamerican screenfold-codex style (Codex Zouche-Nuttall / Borgia Group) — constant-width black frame lines around flat mineral colors on gesso white, red guide lines that are both ground and reading order, calendar names written as 1–13 dots plus one of twenty day signs, modular big-headed profile figures, hill place-signs and footprint trails.
---

# 米斯特克—普埃布拉古抄本風格 Mixteca-Puebla Codex Style

## 設計哲學

這個流派來自 14–16 世紀墨西哥中南部（普埃布拉—特拉斯卡拉—西瓦哈卡）的摺頁古抄本：鹿皮塗一層白石膏，摺成屏風，正反兩面畫。歷史抄本（米斯特克的《Codex Zouche-Nuttall》《Vindobonensis》）記家譜、婚約、征戰；Borgia 組（Borgia、Cospi、Fejérváry-Mayer、Laud、Vaticanus B）記 260 日曆與占卜。Henry B. Nicholson 1960 年把這一整套共通的圖像語法命名為「Mixteca-Puebla 風格」。

它長成這樣，是因為**它不是插畫，是一種書寫**：

- 畫師（米斯特克語稱 *tay huisi tacu*）先用黑線勾出每個形，再平塗礦物與植物顏料。線要讓人「讀」得出是哪一個符，所以線寬恆定、不表現光影。
- 人與地都用**名字**來畫：人旁邊用一條細線牽著他的日名（「八鹿」＝八個點＋鹿頭），地方是一座鐘形的山裡面放著能唸出地名的東西。
- 讀序靠**紅色導讀線**：紅線同時是人物站的地面，線在一側斷開，就從那一側往下一列讀（boustrophedon）。
- 動作是約定：腳印＝走路、嘴前一道捲＝說話、兩人面對面坐在蓆上＝婚約。

所以這個風格的網站，要把資訊**寫成符號**，而不是畫成場景：日期是點與符、地址是山、路線是足印、按鈕在紅線上。不要寫實、不要立體、不要光。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是古抄本，而會變成「扁平插畫」或「民俗風圖案」。

### ① 恆寬黑框線（línea marco）——同一條線，不論大小

每一塊顏色都被同一條粗細的黑線圍住；22px 的小日符與 600px 的大圖版，線寬一樣。線寬恆定是它被當成文字的證據。

```css
.cx path:not(.tk), .cx rect, .cx circle, .cx ellipse, .cx polygon{
  stroke:#1C1612; stroke-width:2.2px;
  vector-effect:non-scaling-stroke;          /* 縮放時線寬不變 */
  stroke-linejoin:round; stroke-linecap:round;
}
.cx .nb{ stroke:none }      /* 瞳孔、數點中的實心小點等不描邊 */
.cx path.hair{ stroke-width:1px }  /* 牽名細線、蓆紋 */
.cx .tk{ vector-effect:none }      /* 「以粗筆畫當身體」的蛇身等，刻意隨比例縮放 */
```

### ② 石膏白底＋礦物平塗——零漸層、零陰影、零光源

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 石膏白 gesso | `#EFE6D2` | 底、每一頁 | 45% |
| 摺頁背 gesso 2 | `#E5D9BF` | 偶數摺頁、表頭 | 12% |
| 碳黑 | `#1C1612` | 框線、文字、頭髮 | 10% |
| 胭脂紅 cochineal | `#B02A1F` | 導讀線、主要衣色、強調 | 9% |
| 瑪雅藍 | `#3B8A8F` | 水、衣色、focus | 7% |
| 赭黃 | `#E2A52C` | 蓆、地名符底帶、女性膚色 | 7% |
| 草綠 | `#6C8A3B` | 山、植物 | 5% |
| 可可棕 | `#7E4426` | 杯、樹幹、可可豆 | 3% |
| 膚橙 | `#D47A4A` | 男性膚色 | 1% |
| 貝白 | `#FAF6EC` | 眼白、牙、泡沫、卡片底 | 1% |
| 註記墨 gloss | `#6B3A1E` | 殖民時期式的旁註文字 | — |

```css
:root{--g:#EFE6D2;--g2:#E5D9BF;--k:#1C1612;--r:#B02A1F;--b:#3B8A8F;--y:#E2A52C;--gr:#6C8A3B;--br:#7E4426;--fl:#D47A4A;--w:#FAF6EC;--gloss:#6B3A1E}
body{background:var(--g)}          /* 平塗：沒有紙紋、沒有暈影 */
/* 禁止：linear-gradient 上色、box-shadow 模糊、filter:drop-shadow、opacity 調淺色 */
```

### ③ 紅色導讀線＋摺頁屏——紅線是地面也是讀序

人物站在紅線上；紅線在一側斷開 16%，就從那一側接到下一張（或下一列）。整卷是一條橫向的摺頁屏，窄螢幕改直排，紅線改在左右交替斷開。

```html
<!-- 圖版：viewBox 400×260，地面在 y=232 -->
<path class="gl" d="M0 232 L336 232"/>   <!-- 奇數張：右側斷開 -->
<path class="gl" d="M64 232 L400 232"/>  <!-- 偶數張：左側斷開 -->
```
```css
.cx path.gl{ stroke:#B02A1F; stroke-width:3px; fill:none }
.strip-wrap{ container-type:inline-size; container-name:strip }
.strip{ display:flex; overflow-x:auto; scroll-snap-type:x mandatory }
.leaf{ flex:0 0 46cqi; scroll-snap-align:start; border:2.2px solid #1C1612; border-left-width:0 }
.leaf:nth-child(even){ background:#E5D9BF }
@container strip (max-width:640px){
  .strip{ flex-direction:column; overflow:visible }
  .leaf{ width:100% }
  .leaf::after{ content:""; position:absolute; bottom:-3px; width:16%; height:3px; background:#EFE6D2 }
  .leaf:nth-child(odd)::after{ right:0 } .leaf:nth-child(even)::after{ left:0 }
}
```

### ④ 曆名＝點數＋日符——數字只有點，名字用細線牽著

點數 1–13，**只用點、不用槓**（槓是馬雅寫法），顏色紅黃藍紅綠輪替、每列最多 7 顆；點在上，二十日符之一在下。人物的名字用一條 1px 細線從頭部牽到日名。

```js
function dots(n,x,y,r){let s='';const C=['#B02A1F','#E2A52C','#3B8A8F','#B02A1F','#6C8A3B'];
  for(let i=0;i<n;i++){const row=Math.floor(i/7),col=i%7;
    s+=`<circle cx="${x+col*r*2.6}" cy="${y+row*r*2.6}" r="${r}" fill="${C[i%5]}"/>`;}return s;}
// 日名：上點下符；名字細線
`<path class="hair" d="M${glyphX} ${glyphY} L${headX} ${headY}" fill="none"/>`
```
二十日符（面向左，100×100）：鱷 Cipactli、風 Ehecatl、屋 Calli、蜥 Cuetzpalin、蛇 Coatl、死 Miquiztli、鹿 Mazatl、兔 Tochtli、水 Atl、犬 Itzcuintli、猴 Ozomatli、草 Malinalli、蘆 Acatl、美洲豹 Ocelotl、鷹 Cuauhtli、禿鷲 Cozcacuauhtli、運動 Ollin、燧石刀 Tecpatl、雨 Quiahuitl、花 Xochitl。每個都由 3–8 個平塗形＋一隻標準眼組成。

### ⑤ 部件化的側面人物、山形地名、足印與說話捲

人物一律側面、頭約佔身高一半、眼睛是「杏形白底＋黑瞳」的標準件；身體是兩種固定姿勢（披肩屈膝坐、裙衫跪坐）換顏色。地名是鐘形山＋頂端捲鬚＋底部分格帶。行走一律畫成一串左右交錯的足印；說話是嘴前一道藍捲。

```svg
<!-- 標準眼 -->
<path d="M71 45 Q78 39 85 45 Q78 51 71 45Z" fill="#FAF6EC"/><circle cx="78" cy="45" r="1.9" fill="#1C1612" class="nb"/>
<!-- 山（地名）：底部中心 (x,y)、寬 w -->
<path d="M{x-w/2} {y} Q... {x} {y-1.07w} ... {x+w/2} {y}Z" fill="#6C8A3B"/>
<rect x="{x-w/2}" y="{y-.17w}" width="{w}" height="{.17w}" fill="#E2A52C"/>  <!-- 底帶，四格各一紅點 -->
<!-- 足印：鞋底＋五趾，沿路徑左右交錯 ±4.2，間距 17–18 -->
<path d="M0 8 Q-3 8 -3 3 Q-3.4 -2 -4.2 -5.5 Q-4 -10 0 -10 Q4 -10 4.2 -5.5 Q3.4 -2 3 3 Q3 8 0 8Z" fill="#1C1612"/>
<!-- 說話捲 -->
<path d="M0 0 Q14 -2 18 -12 Q20 -22 12 -22 Q6 -20 8 -14 Q10 -10 14 -12" stroke="#3B8A8F" stroke-width="4" fill="none"/>
```

## 色彩系統

見特徵②的色票表。規則：

- 任何兩塊顏色之間一定有一條黑線；同色相鄰也要描線。
- 紅色有兩個身分：導讀線（3px 純紅、無描邊）與衣色（有描邊）。按鈕主色用紅，hover 變碳黑。
- 膚色是約定不是寫實：男性膚橙、女性赭黃（古抄本的慣例），網站上把它做成「穿著」選項而非性別選項。
- 文字永遠是碳黑或註記墨，不用彩色字。

## 字體系統

| 角色 | 字體 | 字重 | 字級 |
|---|---|---|---|
| 標題 | Noto Serif TC | 900 | h1 clamp(26px,3.4vw,44px)／h2 clamp(24px,3.2vw,38px)／h3 clamp(17px,5cqi,26px) |
| 內文 | LXGW WenKai TC | 400／700 | 15–16px，行高 1.7–1.75 |
| 西文旁註 | IM Fell English Italic | 400 | 12–17px，色 `#6B3A1E` |

旁註模仿殖民時期抄本上的西班牙文註記（如「siete venado」），一律斜體、褐墨色，只放在圖旁或標題下。古抄本本身沒有字——**所有能用符號說的都用符號，文字只當旁註與正文。** 不用等寬字、不用大寫追蹤字距。

## 版面與網格

- 單位是「一張摺頁」：圖版 400×260（約 3:2，接近 Nuttall 的 19×25 cm 橫幅），下方 3px 紅線接正文。
- 摺頁屏桌機每張寬 46cqi（露出兩張多一點，暗示還有下一摺），窄於 640px 改直排。
- 圖版內只有一條地面（y=232），人物腳底對齊地面；日名放在人物上方角落，用細線牽。
- 版面一律直角、零圓角；區塊用 2.2px 黑框相接，不留卡片間距、不浮起。
- 無旋轉角度；唯一的斜線是蓆紋（45°）與足印的方向。
- 留白：區塊間 40px；圖版內留白不是空，是石膏底。

## 元件配方

**導覽（足跡道）**：右上一條 440×96 的 SVG：四座地名山 x=55/165/275/385、紅色地面 y=94；現用頁那座山塗紅，足印從左緣走到它跟前停住。標籤在山下 HTML。≤760px 改為固定底部四格，每格前面一個小山形。

```css
.trailnav{position:relative;width:440px;height:120px}
.trailnav svg{position:absolute;top:0;left:0;width:100%;height:96px}
.trailnav li{position:absolute;bottom:0;width:100px;margin-left:-50px;text-align:center}
.trailnav a[aria-current] span{color:#B02A1F;font-weight:700}
```

**按鈕**：`background:#B02A1F;color:#FAF6EC;border:2.2px solid #1C1612;padding:11px 18px;font:900 15px "Noto Serif TC"`，hover 變 `#1C1612`；次要鈕赭黃底黑字、hover 瑪雅藍。零圓角、零陰影。

**卡片／區塊**：沒有浮起的卡片。用「格」：`border:2.2px solid #1C1612`，相鄰格共用一條框線，偶數格 `#E5D9BF`。

**表單**：輸入框 `background:#FAF6EC;border:2.2px solid #1C1612;border-radius:0`；單選做成相接的分段鈕，選中＝碳黑底貝白字；色票是 34×30 的平色方塊。

**曆表**：14 欄 grid（日符欄＋13 欄），格內用 6px 小圓點表示點數；hover 十字準線、今天以 3px 紅色內框加「今」。

**頁尾**：上緣 3px 紅線，三欄（地址時間／四卷／讀法），最下一行褐墨小字聲明虛構。

## 動效規則

| 類型 | 做法 | 觸發 | 時間 | 降級 |
|---|---|---|---|---|
| ambient 環境 | 可可杯泡沫：氣泡 `translateY(8→-16px)` 淡出循環、泡頂 `scaleY(1.07)` 呼吸；頁首「今日日名」的點每 6.5s 依序閃一次，跨午夜自動換符 | 載入即開始；真實時刻 | 2.6–3.8s linear／ease-in-out | 靜止，氣泡停在原位 |
| input 輸入 | 人物 hover／點按→嘴前說話捲出現；曆表十字準線與右側即時換算；導覽山 hover 上浮 6px；地圖山 hover 變黃 | pointer／focus／鍵盤 | 80–90ms ease-out | 說話捲常駐；其餘無過渡 |
| transition 轉場 | 摺頁屏收合：七條直幅以交替的 transform-origin（左／右）`scaleX(0→1)` 蓋上，新頁再反向展開 | 站內連結 | 收 .36s、展 .42s，每條延遲 35–40ms，`cubic-bezier(.6,0,.4,1)` | 直接換頁 |
| signature 簽名 | **足印行走**：一串足印 `steps(1)` 一個一個蓋上（70ms／步），從目前那座山走到目的地才摺卷；取日名時點數 85ms／顆數進來、日符落定、足印走到座位 | 換頁、選地圖的山、改生日 | 每步 60–85ms | 足印與點全部直接出現 |

規則：足印只能「蓋上」（`steps(1)` 不透明度切換），不能滑動、不能淡入——古抄本裡的足印是一次落定的符號，不是動畫軌跡。不要用視差、不要用模糊、不要用彈簧。

## 插畫與圖像風格

**codex-frame-line 恆寬框線部件化平塗**：圖像不是畫出來的場景，而是由固定部件拼出來的句子——人物（2 姿勢 × 換色）、二十日符、數點、山、杯、蓆／豹皮、可可樹（果莢長在樹幹上）、檳榔、石磨、發酵箱、水帶、足印、說話捲。每個部件是一個回傳 SVG 字串的函式，在建置期烘成靜態 SVG（無 JS 也看得到），互動頁在前端重組。

- 每個形 3–8 個平塗面，一隻標準眼。
- 人物頭佔身高一半，側面，手伸向對方或物件。
- 物件與人同大小比例無所謂——重要的東西畫大。
- 地方一律用山符表示，不畫地圖比例尺。

## Logo 與 Favicon 設計指南

Logo 是創辦人的日名「7 鹿」：七顆輪色點＋鹿頭符，右邊一杯起泡的可可，兩者站在同一條紅色地面上（viewBox 190×128）。Favicon 只保留杯子（棕杯身、赭黃帶、貝白泡沫、紅杯腳，3px 黑框），64×64 inline SVG data URI。任何縮小版本都保留黑框線，不做單色剪影。

## Do & Don't

**Do**
- 把日期寫成點＋符，把地址寫成山，把路線寫成足印。
- 讓紅線同時當地面和讀序；斷開的位置要交替。
- 每一塊顏色都描黑框，線寬固定。
- 在圖旁加褐墨斜體西文旁註。
- 如實寫出曆法換算依據（本站用 Caso 相關式）並承認學界有不同相關式。

**Don't**
- 不要漸層、陰影、高光、模糊、透明疊色、圓角卡片。
- 不要寫實人物或立體透視；不要用「阿茲特克太陽石」那種裝飾性大圓盤當背景。
- 不要用槓表示 5（那是馬雅）。
- 不要把日名包裝成星座運勢；它是命名，不是預言。
- 去AI化禁令：禁紫藍漸層、置中大標＋三卡片、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、「在當今快節奏的世界」式文案。

## 頁面骨架範例

```html
<header class="top">
  <a class="brand" href="index.html"><svg viewBox="0 0 190 128"><!-- 7 點＋鹿＋杯 --></svg><span><b>七鹿可可</b><i>Siete Venado</i></span></a>
  <div class="today" role="status"><!-- JS：今日日名 --></div>
  <nav class="trailnav" aria-label="四卷"><ul>
    <li style="left:12.5%"><a href="index.html" aria-current="page"><span>卷一・來歷</span></a></li>
    <li style="left:37.5%"><a href="twenty.html"><span>卷二・二十日</span></a></li>
    <li style="left:62.5%"><a href="naming.html"><span>卷三・取日名</span></a></li>
    <li style="left:87.5%"><a href="visit.html"><span>卷四・往老埤</span></a></li>
  </ul></nav>
</header>
<main>
  <div class="strip-wrap"><div class="strip" tabindex="0">
    <article class="leaf"><span class="lam">lám. 1</span>
      <svg class="pic cx" viewBox="0 0 400 260"><!-- 部件 --><path class="gl" d="M0 232 L336 232"/></svg>
      <div class="txt"><h3>標題</h3><span class="date">1968.6.2 ・ 7 鹿 <span class="es">siete venado</span></span>正文……</div>
    </article>
    <!-- 更多 .leaf -->
  </div></div>
</main>
<footer class="foot">…</footer>
```

## 技術實作與相容性

### 1. SVG 部件庫＋`vector-effect: non-scaling-stroke`（A 渲染層）——承載特徵①⑤

- **現況**：MDN 標示 `vector-effect` 為 Baseline「Widely available」（2020 年起各主流瀏覽器皆支援）；caniuse 顯示 Chrome 15+、Firefox 15+、Safari 5.1+、Edge 79+。規格中另外三個值（`non-scaling-size`、`non-rotation`、`fixed-position`）**沒有任何實作**，不要用。
- **查證來源**：MDN〈vector-effect〉https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect ；caniuse〈SVG vector-effect: non-scaling-stroke〉https://caniuse.com/vector-effect
- **注意**：CSS 規則會蓋過 SVG presentation attribute，所以「刻意隨比例縮放」的粗筆畫（蛇身、說話捲）要加 `.tk` 並以 `:not(.tk)` 排除；不要對帶有 `transform` 屬性的 `<g>` 做 CSS transform 動畫（會覆蓋原本的位移），本站的足印只動 `opacity`。
- **Fallback**：不支援時線寬隨縮放變化（大圖略粗、小圖略細），形狀與資訊不受影響。下載的 SVG 內嵌同一份 `<style>`。

### 2. Container queries＋`cqi` 單位（C 版面層）——承載特徵③

- **現況**：size container queries 與 container query units（cqw／cqh／cqi／cqb／cqmin／cqmax）於 2023 年進入 Baseline：Chrome／Edge 105、Firefox 110、Safari 16。規格狀態為 W3C Working Draft。
- **查證來源**：web.dev〈Baseline 2023〉https://web.dev/blog/baseline2023 ；caniuse〈CSS Container Query Units〉https://caniuse.com/css-container-query-units
- **用法**：`.strip-wrap` 是 `strip` 容器，摺頁寬 `46cqi`；每張 `.leaf` 自己也是容器，正文字級 `clamp(13px,3.3cqi,17px)` 跟著摺頁寬走；`@container strip (max-width:640px)` 讓摺頁屏改直排並交替斷開紅線。
- **Fallback**：舊瀏覽器忽略 `cqi` 與 `@container`：`.leaf` 退回內容寬度的橫向捲動列，字級落在 `clamp` 的下限；資訊完整。

### 3. 自寫 tonalpohualli 換算＋`Intl.DateTimeFormat` 多曆法（E 資料層）——承載特徵④與核心功能

- **換算**：以 Alfonso Caso 相關式為錨點——特諾奇提特蘭陷落日，儒略曆 1521-08-13＝1 Coatl（Sahagún 所記；azteccalendar.com 採同一相關式）。以儒略日數（JDN）計算：`d = JDN(公曆日) − JDN_儒略(1521,8,13)`；點數 `((d mod 13)+13) mod 13 + 1`；日符 `(4 + d) mod 20`（0＝Cipactli）。建站時以 azteccalendar.com 對照驗證：2021-09-08＝2 Calli、1805-08-02＝8 Acatl，皆吻合；2026-10-17＝8 Tochtli。
- **查證來源**：César Morlán Valle（academia.edu/10317188）述 1521-08-13 儒略曆＝1 Coatl 之通行相關；https://www.azteccalendar.com/date/2021/9/8（Correlation: Alfonso Caso）。米斯特克曆的年承載者與阿茲特克不同，本站只換算日名、不換算年名，並在頁面寫明只採一種相關式。
- **Intl**：`new Intl.DateTimeFormat('zh-TW-u-ca-roc',…)` 得「民國115年10月17日」；`'zh-TW-u-ca-chinese'` 以 `formatToParts` 取月與日，再自行轉成「初八」。MDN：`Intl.supportedValuesOf('calendar')` 含 `chinese`、`roc`，2022-03 起各瀏覽器可用。格式器建一次重用（每次 new 約 0.15ms，快取後 0.035ms）。門市營業狀態以 `timeZone:'Asia/Taipei'` 的 `formatToParts` 判斷。
- **Fallback**：`Intl` 例外時民國年以 `年−1911` 手算、農曆省略；無 JS 時曆表與換算不出現，`<noscript>` 改寫出換算規則與電話。所有圖版在建置期烘成靜態 SVG。

### 效能實測（建置當下）

| 頁面 | 檔案大小（含 inline CSS/JS/SVG） | 腳本執行（jsdom 量測，含 DOM 建置，上限值） |
|---|---|---|
| index.html | 約 115 KB | 35 ms |
| twenty.html | 約 65 KB | 50 ms（260 格曆表） |
| naming.html | 約 61 KB | 26 ms |
| visit.html | 約 67 KB | 14 ms |

- Node 量測：260 格曆表字串＋一次 `nextOf` 0.65 ms；婚約頁完整重繪 ×10 0.96 ms。
- 動畫只動 `opacity` 與 `transform`（泡沫、摺頁條），無 layout thrashing；全部有 `prefers-reduced-motion` 降級。
- 外部資源只有 Google Fonts；零圖片、零音檔。

## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-A-38` | Zigzag Energy | primary #B02A1F／secondary #1C1612／bg #EFE6D2、duration 8、density 1、intensity 1、seed 7 | ambient：胭脂紅與碳黑的鋸齒帶左右交錯推移——古抄本邊框的階梯回紋（xicalcoliuhqui）帶；斜接角、恆寬線、零透明。 |
| naming.html | `TXT-A-35` | Stripe Mask | primary #B02A1F／secondary #1C1612／bg #EFE6D2、text 取日名、duration 1.4、aspectRatio 16:9、seed 7（一次性，進視窗播放、點擊重播） | input：「取日名」被十四道硬邊直條一條一條印上、紅色刮線走過——像在石膏底上一格一格塗色；只有有色／無色，沒有半透明。 |
| twenty.html | `TXT-B-16` | Circle Text | primary #3B8A8F／secondary #1C1612／bg #EFE6D2、text 二十日符、duration 1.8、aspectRatio 16:9、seed 20（一次性，進視窗播放、點擊重播） | input：四個字先排成一圈、再展開成一行——260 日曆的日符本來就是繞著圈數的；開頭有約 0.1 秒的出現，其餘只有位移與旋轉。 |
| visit.html | `BG-B-02` | Halftone Wave | primary #1C1612／secondary #B02A1F／bg #EFE6D2、duration 9、density 1、intensity 0.9、seed 13 | ambient：一整片黑點隨波起伏變大變小——古抄本的數字就是點（1–13 個圓點），這裡把點數排成一片會呼吸的田；實心圓、零透明。 |
