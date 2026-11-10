---
name: neo-geo-cells-and-conduits
description: Neo-Geo as a web style, after Peter Halley's 1980s cell/prison/conduit paintings — every image is an orthogonal diagram of flat rectangular "cells" linked by straight equal-width "conduits" that run off the edge of the frame; Day-Glo fluorescent colour (wide-gamut display-p3 where available) set hard against flat umber and black grounds; a stucco Roll-a-Tex relief only on the cells; barred "prison" windows; and a ground line with conduits running underground.
---

# Neo-Geo 格與管 Cells & Conduits — 規格書

> 範例站：〈通格有線 THONG-KEH CATV〉（`sites/thong-keh`，嘉義東區有線電視與弱電配線工程行，虛構）。本規格不綁定產業：凡是「東西被分成一格一格、再用線接起來」的行業都合用——水電、物流、倉儲、公寓管理、網路服務、醫院分流、共享辦公室、捷運、學校排課、銀行分行。

## 設計哲學

**Neo-Geo（Neo-Geometric Conceptualism）**是 1980 年代中期紐約東村的一個標籤，被貼在 Peter Halley（1953–）、Ashley Bickerton、Jeff Koons、Meyer Vaisman、Haim Steinbach 等人身上，指的是「回到幾何抽象，但不再相信它是純粹的」。本規格取其中視覺最鮮明、最可以被指名的一支：**Halley 的格與管（cells, prisons, conduits）**。

- 1981 年起 Halley 開始用 **Day-Glo 螢光壓克力**與 **Roll-a-Tex**（一種摻進油漆、讓汽車旅館與郊區住宅天花板起顆粒的灰泥添加物）。東京都現代美術館藏〈Rectangular Cell with Underground Conduit〉（1986）的材料欄就是：acrylic, Day-Glo acrylic, Roll-a-Tex on canvas。
- 1984 年他在《Arts Magazine》（vol. 58 no. 10）發表〈The Crisis in Geometry〉，以 Foucault《規訓與懲罰》與 Baudrillard《擬像》重讀幾何：工業社會把空間切成格、以幾何安排監禁與流動。
- 1990 年〈Geometry and the Social〉：幾何是「管理專業階層的語言……公司與流程圖的語言，都市計畫與通訊的語言」。2023 年盧森堡 Mudam 回顧展〈Conduits: Paintings from the 1980s〉把這套系統總結為「以 prisons、cells、conduits 畫出社會主體的圖解式繪畫」，題目是隔絕、監禁與連線。

所以這個風格長這樣，是因為它**本來就是一張圖解**：方格＝公寓、辦公隔間、牢房；直管＝水電、電話、有線電視、網路；螢光色＝人造的、廣告與招牌的光；灰泥肌理＝郊區建築的表面。它不是「好看的幾何」，它是**把連線本身當主題的幾何**。

網頁版的三個轉譯原則：

1. **畫面就是線路圖**：每個區塊都是一格，每條關係都是一根管。管不是裝飾線，它真的表示「這格接到那格」。
2. **顏色表示通不通**：Day-Glo 是「接上了」，灰泥是「沒接上」。顏色是網路的屬性，不是元件的屬性。
3. **畫框外面還有網路**：管一定伸出畫框，暗示這張圖只是更大系統的一角。

## 本風格的 5 個不可省略特徵

### ① 格與管（形狀語彙）：只有矩形與等寬直條

- 格＝實心矩形，**零圓角**；管＝固定寬度（本站 14 單位）的直條，**只有水平與垂直**，轉角永遠 90°，**零斜線、零曲線、零箭頭**。
- 管一定接在格上或伸出畫框，不允許懸空線頭。管從格的邊緣「鑽進」格裡（被格蓋住），不畫接頭。
- 拿掉它：變成一般的扁平色塊插畫或流程圖 UI。

```css
.cell{position:relative;background:var(--c)}   /* 不准 border-radius */
.cd{position:absolute;background:var(--yl)}    /* 管＝div 直條 */
.cd.h{height:14px}.cd.v{width:14px}            /* 管寬全站唯一 */
```
```svg
<!-- 管的長度兩端各多半個管寬，轉角自然補成直角 -->
<rect x="303" y="463" width="14" height="92" fill="#F3EE00"/>    <!-- 豎管 -->
<rect x="-37" y="541" width="1274" height="14" fill="#F3EE00"/>  <!-- 地下幹線，左右都出框 -->
```

### ② Day-Glo 對撞色（色彩規則）：螢光平塗 vs 暗色平塗

- 四個螢光：橘 `#FF5A14`、粉 `#FF3D9B`、黃 `#F3EE00`、綠 `#3CF03A`；廣色域螢幕改用 `color(display-p3 …)`——**螢光漆本來就超出印刷色域**。
- 對面是平塗暗地：棕 `#3B332E`（地上）、近黑 `#1B1716`（地下）。
- **一塊一色**：零漸層、零陰影、零發光（不用 `box-shadow`／`text-shadow`／`shadowBlur`），螢光感只來自顏色本身。
- 拿掉它：變成包浩斯或風格派（原色＋白底），不是 Neo-Geo。

```css
:root{--or:#FF5A14;--pk:#FF3D9B;--yl:#F3EE00;--gr:#3CF03A;--field:#3B332E;--under:#1B1716}
@supports (color:color(display-p3 1 0 0)){@media (color-gamut:p3){:root{
 --or:color(display-p3 1 .34 .02);--pk:color(display-p3 1 .2 .62);
 --yl:color(display-p3 .96 .95 0);--gr:color(display-p3 .32 .98 .16)}}}
```

### ③ 字住在格裡（字體選擇）：Archivo Black＋Archivo Narrow 大寫標籤

- 標題用 **Archivo Black**（中文 Noto Sans TC 900）：粗、寬、沒有個性曲線，像公司招牌與流程圖方塊上的字。
- 標籤用 **Archivo Narrow 600** 全大寫、字距 .14–.2em：`UNDERGROUND CONDUIT`、`PLANS & PRICES`——圖解上的圖例文字。
- **大字永遠放在一格裡**（格的底色就是字的底），暗地上只放小標籤與正文。
- 拿掉它：換成襯線或手寫字，畫面立刻變成藝廊海報，失去「流程圖」的冷。

```css
h1,h2,h3{font-family:"Archivo Black","Noto Sans TC",sans-serif;font-weight:400;line-height:1.05}
.lab{font:600 11px/1.3 "Archivo Narrow","Noto Sans TC",sans-serif;letter-spacing:.16em;text-transform:uppercase}
```

### ④ 地平線＋出框（版面手法）：上面是格、下面是地下管

- 畫面被一條**水平地平線**切成上下：上方（棕）放格，下方（黑）走**地下幹線**（Halley 的 Underground Conduit）。格從底部接一根豎管鑽進地下。
- 至少一根管**從畫框左外進來、從右外出去**——本站首屏幹線 `x=-30→1230`、頂上循環管 `x=500→1230`。
- 格的大小與高低不等、間距不等，但所有格的**底邊都站在同一條線上**。
- 拿掉它：格會漂在空中，像 UI 卡片牆。

```css
/* 兩段硬色標＝一條地平線，不是漸層過渡 */
.painting{background:linear-gradient(var(--field) 0 68%,var(--under) 68% 100%)}
```

### ⑤ Roll-a-Tex 灰泥＋監獄窗（裝飾母題）

- **只有格有質感**：格面是顆粒浮雕，管與地永遠光滑平塗。這個「質感 vs 平滑」的對比是 Halley 作品的指紋。
- 格的上部有一個方形「窗」，裡面 3–5 根**等距垂直窗櫺**（prison）；窗櫺黑色、寬約窗寬 11%。
- 拿掉它：格就只是色塊；加錯地方（管也起顆粒）就變成粗糙的復古紋理風。

```css
/* 一張預烤的 Roll-a-Tex 磚（feTurbulence → feDiffuseLighting），multiply 疊在格的底色上 */
.cell{background-image:var(--rat0);background-size:120px 120px;background-blend-mode:multiply}
.bars{position:absolute;display:flex;justify-content:space-between}
.bars i{width:12%;height:100%;background:#15110F}
```
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
 <filter id="f" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".62" numOctaves="3" seed="19" stitchTiles="stitch" result="n"/>
  <feDiffuseLighting in="n" surfaceScale="3.4" diffuseConstant="1.12" lighting-color="#fff">
   <feDistantLight azimuth="315" elevation="62"/></feDiffuseLighting></filter>
 <rect width="120" height="120" filter="url(#f)"/></svg>
```
（elevation 62°、diffuseConstant 1.12 讓平坦處亮度≈1，multiply 後螢光色不變暗，只有顆粒背光面變暗。）

## 色彩系統

| 色 | hex（sRGB） | display-p3 | 用途 | 約佔比 |
|---|---|---|---|---|
| 棕地 field | `#3B332E` | — | 地上的地、導覽欄 | 35% |
| 地下 under | `#1B1716` | — | 地平線以下、說明欄、footer | 20% |
| 灰泥 stucco | `#D9D3C5` | — | 文字格、價目格、暗地上的正文字色 | 15% |
| 螢光橘 | `#FF5A14` | `1 .34 .02` | 主角格（店、你家）、首屏大格 | 10% |
| 螢光黃 | `#F3EE00` | `.96 .95 0` | **管**的預設色、按鈕 | 8% |
| 螢光粉 | `#FF3D9B` | `1 .2 .62` | 追線（hover 路徑）、斷點、警示 | 5% |
| 螢光綠 | `#3CF03A` | `.32 .98 .16` | 訂戶格、營業中燈、弱電室 | 4% |
| 墨 | `#15110F` | — | 窗櫺、螢光格上的字 | 2% |
| 斷電灰 | `#6F6962`／`#4C4540` | — | 沒接上的格／管 | 依狀態 |

規則：螢光色只用在格與管上，不當暗地上的文字色（例外：小標籤可用黃）。相鄰兩格不同色。灰＝沒有訊號，不是「次要」。

## 字體系統

- 來源：Google Fonts `Archivo:wght@400;600;800`、`Archivo Black`、`Archivo Narrow:wght@600`、`Noto Sans TC:wght@400;500;900`。
- 字級：H1 首屏 6.6cqw（約 88px）／H2 `clamp(28px,4.2vw,54px)`／H3 17–40px／正文 15–16px 行高 1.7／標籤 11px 字距 .16em。
- 字重：標題只用 Black；正文 400／500。唯一的斜體是作品名（仿美術館牆標，Archivo 600 italic）。

## 版面與網格

- 首屏＝一張畫。寬高比固定 1200:760（`width:min(100%, 100vh*1200/760)`），HTML 文字以百分比座標疊在 SVG 上，字級用 `cqw` 跟畫一起縮放。
- 地平線在畫高約 68%；格的底邊對齊地平線上方 50 單位，豎管從格底鑽進地下。
- 內容區 12 欄，格的跨欄數刻意不等（5／3／4／3…），偶爾上下錯 28px——格大小不一，但永遠正交。
- 全站 0° 旋轉，沒有任何 `rotate`。
- 區塊之間用暗地分隔（10px 墨色粗線或 6px 底色縫），不用白邊。
- ≤560px：首屏畫維持比例縮小，資訊格脫離畫面、改為畫下方的一般流；〈颱風夜〉的線路圖放進可橫向捲動的容器（最小 760px），報修單在下方提供大按鈕。

## 元件配方

- **導覽（cell-riser-nav）**：左側固定 96px 棕欄，一根 10px 墨色豎管貫穿上下出框；三格 54×54 灰格掛在管上、各三根窗櫺；現用頁那格灌滿該頁螢光色（`transform:scaleY(1)`，原點在下緣）；hover 灌一半（`steps(6)`）。≤560px 變成底部橫管＋三格。
- **按鈕**：就是一格——螢光底、墨字、左邊一個 12px 墨方塊；hover 變灰泥。深色版為墨底灰泥字。
- **卡片＝格**：`.cell` 帶 Roll-a-Tex 與右上窗櫺（窗櫺數可表示數量，例如出線口數）。不用邊框、不用陰影。
- **選擇器**：分段按鈕是並排的格，選中＝螢光橘，未選＝深灰泥 `#BDB6A7`。
- **年表**：一根水平黃管橫過版面並伸出右側，年份格各吊一根豎管、上下錯落。
- **footer**：地下色 `#1B1716`＋上緣一根 10px 黃管。

## 動效規則

四種動效都由「網路是否接通」驅動，全部有 `prefers-reduced-motion` 降級（直接到終態，資訊零損失）。

| 種類 | 本站自製實作 | 觸發 | 時長／easing |
|---|---|---|---|
| ambient | **封包**：8×8 灰泥方塊沿通電的管從畫框外流進某一格（首屏 6 顆，300 單位/秒，離屏即停）；〈颱風夜〉的雨＝只有垂直短條的 mask 以 `steps(4)` 下移，雨量隨颱風強度 | 無需輸入 | 持續 |
| input-driven | **追線**：指著／鍵盤聚焦一格，它從畫框外接進來的每段管立刻轉粉，並報出幾段、幾公尺；〈颱風夜〉指著斷點，被它切斷的格描粉框；游標所在象限換 Roll-a-Tex 光向 | pointer／focus | <16ms，無過渡 |
| transition | **管射出→長成整面格**：點導覽，一條 14px 管自該格往右射出，再長成全螢幕的該頁螢光色（360ms `cubic-bezier(.6,0,.3,1)`）；下一頁由整面格以 `clip-path:inset()` 收回到它的導覽格（380ms `cubic-bezier(.7,0,.2,1)`） | click | 360＋380ms |
| signature | **訊號灌色 signal pour**：自訊號源或剛接好的那段管往下游，每段管以上游端為原點由 0 長到全長（時長＝管長÷700–900 單位/秒、延遲＝累計管長），每一格從管接進來的下緣往上灌滿（`steps(8)`）；斷線時反向——顏色退回上游、格沉回下緣（0.3s）。用在首屏開機、〈颱風夜〉每修好一段、〈申裝〉換房型 | 網路狀態改變 | 依網路長度 |

自我限制：**不用淡入**（顏色只能被灌進來，不能浮現）、**不用 `stroke-dashoffset` 描線**（管是有寬度的色塊，用 `scaleX/scaleY` 長出來）、不旋轉。

### motion-library 元件（1.37.0 @b655b9df）

子集由 `tools/ml-embed.js` 產生，建置期只做一處字族替換（`FAM.sans`→`"Archivo Black","Noto Sans TC"`），再以 terser 壓縮後 inline 為每頁第一個 `<script>`。掛載走 `TK.ml`（等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `once`、reduced-motion 背景 `seek(.35)`／文字 `seek(1)`）。各元件原始開發 prompt 見 `MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-01 | Grid Fill | 機房 | `primary #F3EE00`、`secondary #FF5A14`、`bg #3B332E`、duration 6、density .55、intensity 1、seed 1984、9:16 | ambient | 首屏右側公寓格裡的「夜窗」——一格一格亮起又熄滅的電視；元件只畫正交方格與 `fillRect`，零圓角零發光，等於格中格 |
| TXT-A-19 | Gate | 機房 | text「線是直的」、`primary #F3EE00`、`secondary #FF5A14`、`bg #FF3D9B`、1.6s、once、16:9（容器裁成 16:4.2） | transition | 年表標題：兩扇平塗色門左右拉開露出字＝兩格分開、讓出一條路；只有矩形 |
| TXT-A-08 | Slide Text | 申裝 | text「申裝與價目」、`primary #FF5A14`、`secondary #15110F`、`bg #D9D3C5`、1.4s、once | transition | 字逐字滑入，底下長出一根橘色直條——一根管把標題接起來；灰泥亮底→元件自動用近黑字 |
| TXT-B-13 | Scramble Decode | 颱風夜 | text「颱風夜 TYPHOON」、`primary #FF3D9B`、`secondary #F3EE00`、`bg #1B1716`、1.6s、once、seed 11 | transition | 亂碼逐字解出＝電視訊號從雜訊中鎖台；地下黑底→元件自動用近白字 |
| BG-A-12 | Broken Grid | 颱風夜 | `primary #D9D3C5`、`secondary #FF3D9B`、`bg #3B332E`、duration 8、density 2.2、intensity .7、seed 1993 | ambient | 標題下一條 56px 帶：一格一格被風搖晃、少數格亮粉——被颱風搖的格；只畫 `strokeRect`／`fillRect`，零圓角零旋轉 |

元件不擔任 signature；同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

**全站零插畫。**所有圖像都是格管圖：矩形格（帶窗櫺與 Roll-a-Tex）、等寬直管、地平線。人、物、房子都不描繪——透天厝是三格疊起來、老公寓是十格掛在一根豎管兩側、大樓是二十四格串在水平管上、地下室弱電室是一格綠色。要表示「很多」就多畫幾格；要表示「重要」就把格放大、塗橘。

## Logo 與 Favicon 設計指南

- Logo（`assets/logo.svg`）：一格橘（100×96）＋三根窗櫺，一根黃管從格底鑽進地下、往右出框；右側 Archivo Black「通格有線」與 Narrow 大寫 `THONG-KEH CATV · 1984`。棕地＋黑地下帶。
- Favicon：64×64 inline SVG data URI，同一個構成去掉字：橘格四窗櫺＋黃管 L 形出框。
- 禁止：圓形徽章、斜線、漸層、陰影、「EST.」字樣。

## Do & Don't

**Do**
- 每一根管都「有接到東西」或伸出畫框。
- 用顏色表示狀態（通／不通），讓使用者的動作改變顏色。
- 格大小不一、底邊對齊；大字放在格裡。
- 廣色域螢幕給 display-p3 螢光，其他螢幕給 sRGB 近似值。

**Don't**
- 不要圓角、斜線、曲線、箭頭、虛線。
- 不要漸層填色、陰影、發光、玻璃擬態；不要紫藍漸層 hero。
- 不要讓管也起顆粒（質感只給格）。
- 不要「置中大標＋三張卡片」；格是畫，不是卡片牆。
- 不要 emoji 或圖示庫；需要圖示就畫一格。
- 不要 Lorem ipsum；文案從產業的「線」長出來（幾戶、幾段、幾公尺）。

## 頁面骨架範例

```html
<nav class="nav"><div class="riser"></div><ul>
 <li><a href="index.html" aria-current="page" style="--c:var(--or)"><span class="nc"><b></b><span class="bars"><i></i><i></i><i></i></span></span><span class="nt">機房</span></a></li>
 <li><a href="plans.html" style="--c:var(--yl)"><span class="nc"><b></b><span class="bars"><i></i><i></i><i></i></span></span><span class="nt">申裝</span></a></li>
</ul></nav>
<main>
 <section class="hero">
  <svg viewBox="0 0 1200 760" role="img" aria-label="格與管的畫">
   <rect width="1200" height="520" fill="var(--field)"/><rect y="520" width="1200" height="240" fill="var(--under)"/>
   <rect x="-37" y="541" width="1274" height="14" fill="var(--yl)"/>   <!-- 地下幹線出框 -->
   <rect x="303" y="463" width="14" height="92" fill="var(--yl)"/>     <!-- 豎管 -->
   <rect x="120" y="90" width="380" height="380" fill="var(--or)"/>    <!-- 主格 -->
   <rect x="120" y="90" width="380" height="380" fill="url(#rat0)" style="mix-blend-mode:multiply"/>
   <g fill="#15110F"><rect x="372" y="112" width="12" height="150"/><rect x="396" y="112" width="12" height="150"/><rect x="420" y="112" width="12" height="150"/></g>
  </svg>
  <div class="ov" style="left:10%;top:11.8%;width:31.7%;height:50%"><h1>店名</h1></div>
 </section>
 <section class="wrap"><div class="cell c-st"><span class="lab">LABEL</span><h2>一格一件事</h2><p>…</p></div></section>
</main>
```

## 技術實作與相容性

### 1. SVG `feTurbulence`＋`feDiffuseLighting` 預烤 Roll-a-Tex 磚（A 渲染層「SVG filter」）

- 承載特徵⑤與 input。四張 120×120 磚（光向 azimuth 315／45／135／225，elevation 62°），以 data URI 存成 CSS 變數 `--rat0…3` 與 SVG `<pattern>`；HTML 格用 `background-blend-mode:multiply`、SVG 格用一層 `fill:url(#ratN)` 的 `mix-blend-mode:multiply` 矩形疊在底色上。游標所在象限換一張磚（`body.l1/l2/l3`）＝光跟著游標從四個方向來。
- 為什麼預烤而不即時打光：本館帳本記錄過「每幀改 `fePointLight` 座標會讓濾鏡每幀重算，640×470 的面掉到 10–20fps」。預烤後瀏覽器只解碼一次圖片，換光向只是換圖。
- 查證：MDN〈fePointLight〉Baseline Widely available（2015-07 起）；`feDiffuseLighting`／`feTurbulence` 同屬 Filter Effects Module Level 1；MDN〈<blend-mode>〉（`mix-blend-mode`、`background-blend-mode` 共用）Baseline Widely available（2020-01 起）。
- fallback：不支援 SVG 圖片濾鏡時磚為空白 → 格變成純色平塗，形狀與資訊不變。共用 `<pattern>` 放在一個 0×0、永遠渲染的 `<svg>` 裡——**不要放進會被 `hidden` 的 SVG**，Chrome 不畫 display:none 容器裡的 pattern。

### 2. CSS Color 4 `color(display-p3 …)`＋`@media (color-gamut:p3)`（A 渲染層延伸：廣色域；最近 6 站未出現）

- 承載特徵②。`@supports (color:color(display-p3 1 0 0))` 且 `@media (color-gamut:p3)` 同時成立時，四個螢光變數改為 p3 值；SVG `fill` 與 HTML `background` 讀同一組變數，整張畫一起變亮。
- 查證：web-platform-dx web-features explorer〈color()〉Baseline Widely available（2025-11-09；Chrome／Edge 111、Firefox 113）；MDN〈@media/color-gamut〉Baseline Widely available；caniuse〈color-gamut〉Firefox 110+、Chrome 58+；WebKit〈Wide Gamut 2D Graphics using HTML Canvas〉建議以 `matchMedia("(color-gamut: p3)")` 偵測。
- fallback：舊瀏覽器或 sRGB 螢幕用 sRGB hex，畫面相同只是沒那麼刺眼。motion-library 的 canvas 元件一律傳 sRGB hex。

### 3. 圖論：BFS 連通＋Dijkstra 最短路＋灌色次序（E 資料與生成層「圖論與最短路」）

- 承載 signature、input 與 func。`graph.js`（約 3KB）把網路存成「節點＋只准水平／垂直的邊」（建圖遇到斜邊直接拋錯——特徵①由程式保證）。
  - `live()`：自訊號源 BFS，斷的邊不通 → 每格每管是螢光還是灰。
  - `route()`：Dijkstra，起終點可以是「某段管的中點」；師傅走的是管溝，斷管也能走。
  - `flood()`：自某節點往下游，回傳每段管的延遲（累計管長÷速度）與時長（管長÷速度）、每一格的延遲——CSS transition 只負責播。
  - `structure()`：算出每段管的上游端（決定 `transform-origin`）與下游戶數（斷點上的數字、報修單排序）。
- 同一份 `graph.js` 在建置期（node）輸出靜態 SVG，所以無 JS 時看到的就是完整、全亮的畫。
- 實測（node 22）：`live()` 24 邊 0.006ms／次、`route()` 0.015ms／次；jsdom 以 16ms 步進跑完整 90 秒颱風夜（5,700 格）無錯誤。

### 效能

- 單頁大小：機房 ≈220KB、申裝 ≈242KB、颱風夜 ≈236KB（含 motion-library 子集 ≈170KB），皆 ≤350KB。
- 每幀工作：首屏 6 顆封包各改 2 個屬性；颱風夜每幀一次 BFS（0.006ms）＋兩位師傅位移；灌色全部交給 CSS transform transition（不觸發 layout）。
- 本輪建置環境沒有可用的無頭瀏覽器，**未量到實機 fps 與首屏 JS 毫秒數**；上列為 node／jsdom 實測，瀏覽器端請以 DevTools Performance 面板複核。
