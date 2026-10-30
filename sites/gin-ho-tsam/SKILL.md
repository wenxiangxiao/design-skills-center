---
name: web1-area51-starfield
description: Late-1990s "Area 51" personal homepage — black tiled starfield, 216 web-safe neon, frameset layout, animated-GIF overload played as stepped sprite sheets, burning WordArt title, marquee, hit counter and visited-link colour as navigation.
---

# Web 1.0 GeoCities・Area 51 黑底星空半身

繁體中文規格書。這是「Web 1.0 GeoCities」流派的第二個半身（第一個半身見 `sites/jiaolin-beetle`：銀底小磚、640px 白框表格、整齊的 Heartland 式個人頁）。本半身是同一個年代的**另一張臉**：黑底星空、霓虹安全色、框架頁、動畫 GIF 塞滿每個角落、站名在燒——1996–2001 年 GeoCities 的 Area51（科幻）、Hollywood（影迷）、SiliconValley（電腦）鄰里，以及台灣蕃薯藤、奇摩、HiNet 個人網頁空間上那一大批「我的星空小站」。

範例站：〈銀河站網咖 GALAXY STATION〉臺中一中街二十四小時網咖，1999 年開站，首頁二十七年沒改版。

---

## 設計哲學

**熱鬧是那個年代的禮貌。** 1999 年做個人首頁的人，第一次擁有一塊全世界都看得到的地方；他們把手上所有的東西都放上去——會轉的地球、會燒的字、會眨眼的外星人、會跳的計數器——不是因為不懂設計，是因為**每一個會動的東西都在說「這裡有人」**。

但熱鬧有它的規則，而且規則全部來自限制：

| 限制 | 長出來的視覺 |
|---|---|
| 256 色顯示卡、跨平台調色盤只保證 216 色 | 霓虹平色：`#00FF00`、`#FF00FF`、`#FFFF00`、`#00FFFF` 在黑底上 |
| 56k 數據機（約 5.6 KB/s） | 背景只能是一塊小磚重複；動畫只能是幾格的小 GIF |
| GIF 動畫只有逐格、沒有補間 | **所有東西都一格一格地動**，零 easing |
| HTML 3.2＋`<frameset>` | 上框放站名、左框放導覽、主框捲動 |
| Office 97 的 WordArt、FrontPage 98 | 站名是有漸層、有黑邊、會燒的字——**這是整頁唯一的漸層** |
| 沒有 CSS 圓角、沒有陰影、沒有模糊 | 所有立體感來自 Windows 98 的 2px 凸起／凹陷框線 |

三條做人原則：

1. **每個會動的東西都必須像 GIF 一樣動**——幾格、固定幀率、`steps()`，從不平滑。平滑的動畫一出現，時代就穿幫了。
2. **熱鬧，但每一區都有自己的框**。框架頁、ridge 框、表格框把熱鬧收進格子裡；格子外面只有星空。
3. **站務家具是內容**：訪客計數器、跑馬燈、施工中、NEW!、寫信給站長、最佳瀏覽解析度、背景音樂開關。拿掉它們，它就只是一個黑色網頁。

---

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 Area 51 黑底星空首頁了。

### 1. 216 網頁安全色，黑底霓虹

每一個平色都只能來自 `00/33/66/99/CC/FF` 六階組成的 216 色（Lynda Weinman《Coloring Web Graphics》1996 推廣的 browser-safe palette）。底是純黑 `#000000`，正文螢光綠 `#00FF00`，標題黃 `#FFFF00`，連結青 `#00FFFF`，已造訪洋紅 `#FF00FF`。注意 Windows 系統灰 `#C0C0C0` **不是**安全色——框線用 `#CCCCCC`。

```css
:root{--k:#000000;--lime:#00FF00;--yel:#FFFF00;--cyan:#00FFFF;--mag:#FF00FF;--red:#FF0000;
 --g:#CCCCCC;--gd:#999999;--gdd:#666666;--navy:#000099;--purp:#330066}
/* 檢查：任何 hex 都必須符合 */
/* /^#([0369CF])\1([0369CF])\2([0369CF])\3$/i */
```

### 2. 平鋪的星空磚，接縫看得見

背景是一塊 64×64 的星空小磚以 2 倍整數放大重複，`image-rendering:pixelated`；磚的底緣故意留一排虛點，平鋪後就是一道道看得見的接縫——那是「這是一塊磚」的證據。不准用漸層或大圖假裝星空。

```css
.tile-stars{background:#000 url(data:image/png;base64,…64×64…) 0 0/128px 128px;image-rendering:pixelated}
```

### 3. 動畫 GIF 語彙：精靈表＋`steps()`

所有小圖都是「幾格就好」的動畫：轉的星星（6 格）、轉的地球（8 格）、火（4 格）、開合的信封（4 格）、紅黃互換的 NEW!（2 格）、施工柵欄（4 格）、飛碟邊燈（4 格）、跳動螢幕的電腦（2 格）、眨眼外星人（2 格）、愛心（2 格）。每張都是一條橫排精靈表，CSS 以 `steps(n)` 推 `background-position`。**只准逐格，不准補間。**

```css
.gif{display:inline-block;background-repeat:no-repeat;image-rendering:pixelated}
.gif.g-globe{width:calc(16px*var(--z,2));height:calc(16px*var(--z,2));
 background-image:url(globe-sheet.png);background-size:calc(128px*var(--z,2)) 100%;
 animation:gif-globe .8s steps(8) infinite}
@keyframes gif-globe{to{background-position-x:calc(-128px*var(--z,2))}}
```

### 4. 燒起來的 WordArt 站名

站名是一行粗黑體，**黃→橙→紅的垂直漸層＋1px 黑邊＋往右下 1px 的黑影**（WordArt 樣式 #14 的味道），而且真的在燒：字的每一個像素都是火源，火往上竄、隨機冷卻、受游標左右揮動的風吹偏。這是全頁唯一允許出現漸層的地方。無 JS 時用 `background-clip:text` 的靜態版。

```css
.wordart{font:900 64px/1 "Arial Black",Impact,sans-serif;
 background:linear-gradient(#FFFF00,#FF9900 55%,#FF0000);-webkit-background-clip:text;background-clip:text;
 -webkit-text-fill-color:transparent;-webkit-text-stroke:1px #000}
```

### 5. 框架頁＋站務家具

版面是 `<frameset rows="*,1*"><frameset cols="200,*">` 的樣子：上框站名＋跑馬燈、左框導覽與計數器、主框捲動；框與框之間是 6px 的系統灰，每一框以 2px 凹陷線收邊。主框裡一定有：訪客計數器（7 位、等寬、每一位一格）、跑馬燈（`scrollamount=6 scrolldelay=85` 的步進）、88×31 小按鈕、彩虹分隔線、施工中、寫信給站長、最後更新、背景音樂開關。

```css
.fs{display:grid;grid-template-columns:212px 1fr;grid-template-rows:auto 1fr;gap:6px;height:100dvh;background:#CCCCCC}
.frame{overflow:auto;background:#000;box-shadow:inset 2px 2px #666666,inset -2px -2px #FFFFFF}
.f-top{grid-column:1/3}
```

---

## 色彩系統

| 角色 | Hex | 用途 | 約略面積 |
|---|---|---|---|
| 夜 | `#000000` | 所有框的底、星空磚底 | 60% |
| 系統灰 | `#CCCCCC`／`#999999`／`#666666`／`#FFFFFF` | 框架縫、按鈕、對話窗 | 12% |
| 螢光綠 | `#00FF00` | 正文、計數器數字、外星人 | 10% |
| 黃 | `#FFFF00` | 標題、價錢、強調 | 6% |
| 青 | `#00FFFF` | 未造訪連結、副標 | 4% |
| 洋紅 | `#FF00FF` | 已造訪連結（＝現用頁）、使用中狀態 | 3% |
| 深藍 | `#000099` | 表頭、視窗標題列、跑馬燈底 | 3% |
| 紫 | `#330066` | 左框棋盤磚的亮格 | 1% |
| 紅／橙 | `#FF0000`／`#FF9900` | NEW!、火、WordArt 漸層 | ≤1% |

規則：零淡版、零透明疊色；同一個語意永遠同一色（洋紅永遠是「去過／正在用」）。

## 字體系統

本流派的字體個性**就是**1999 年的預設字型，請精確指定堆疊，不要換成現代字體：

| 角色 | 堆疊 | 字級 |
|---|---|---|
| 正文 | `"Times New Roman",Times,"PMingLiU","新細明體","MingLiU",serif` | 15–16px，行高 1.45 |
| 標題 | `Arial,Helvetica,"PMingLiU",sans-serif` bold | 17／22px |
| 站長的話 | `"Comic Neue"（Google Fonts）,"Comic Sans MS",cursive` | 16px |
| 計數器、價錢 | `"Courier New",Courier,monospace` bold | 13–26px |
| WordArt | `"Arial Black",Impact,"Microsoft JhengHei",sans-serif` 900 | 依框寬自動求 |

中文在台灣 1999 年就是新細明體 12px 點陣；放大後用系統明體即可。

## 版面與網格

- 桌機：框架頁 `212px | 1fr` 兩欄＋上框；主框內再用 `1fr 1fr` 或 `1.3fr 1fr` 兩欄放表格與 ridge 框。
- 一切置中或靠左，**不准不對稱的現代雜誌版面**；但每一個盒子都要有框（ridge 3px、凸起表格、Win98 視窗）。
- 0° 旋轉；零圓角；零陰影。
- 留白只存在於框裡；框外就是星空。
- ≤760px：框架頁攤平成上下三段，左框導覽變成一列橫排、徽章與圖例隱藏；≤560px 機台格改 6 欄。

## 元件配方

**導覽（已造訪連結色導覽）**：左框一個無符號清單；連結照 HTML 3.2 的 `LINK／VLINK／ALINK` 協定上色——青＝沒去過、洋紅＝去過、黃＝滑鼠在上面、紅＝按下去。現用頁用 `aria-current` 強制成洋紅，前面掛一隻 2 格動畫的指著它的手。左框附一個圖例說明這個協定。

```css
a{color:#00FFFF}a:visited{color:#FF00FF}a:hover{color:#FFFF00}a:active{color:#FF0000}
.vnav a[aria-current]{color:#FF00FF}
```

**按鈕（Win98 凸起）**：

```css
.btn{background:#CCCCCC;color:#000;border:0;padding:7px 14px;font:bold 14px Arial;
 box-shadow:inset -1px -1px #000,inset 1px 1px #FFF,inset -2px -2px #666,inset 2px 2px #CCC}
.btn:active{box-shadow:inset 1px 1px #000,inset -1px -1px #FFF,inset 2px 2px #666}
```

**表格**：`border-spacing:2px`，外框凸起、儲存格凹陷，表頭 `#000099` 底黃字，數字欄 Courier 黃色靠右。

**卡片 → ridge 框**：`border:3px ridge #999999;background:#000`。

**視窗（對話框）**：灰底 Win98 視窗，`#000099` 標題列白字，右上角 `_ □ ×`。

**88×31 小按鈕**：四色版本（深藍黃字、黑底綠框、洋紅白字、紅底黃字），hover 立刻反色（onMouseOver 換圖，不淡入）。

**計數器**：7 位，每一位一格黑底綠字，外框凹陷。

**跑馬燈**：深藍底黃字，上下凹凸線。

**Footer**：彩虹分隔線（8 色硬停條紋 `steps(8)` 流動）、信封 GIF＋寫信給站長、背景音樂按鈕、最後更新、版權、最佳瀏覽解析度。

## 動效規則

全部逐格。共同參數：GIF 6–12 fps、`steps(n)`、無 easing。

| 種類 | 本站實作（自製） | 觸發 | 時間 | 降級 |
|---|---|---|---|---|
| ambient 環境 | 13 張精靈 GIF 循環＋步進跑馬燈（6px／85ms）＋彩虹分隔線 | 一直在 | 2–12 fps，`steps(n)` | `animation:none` 停第一格；跑馬燈改成一般段落 |
| input-driven 輸入 | 游標閃光拖尾：每 40ms 掉一顆 4 格閃光，往下掉 26px 後消失（1999 年 DHTML cursor trail 腳本） | pointermove | 600ms，`steps(6)` | 不產生 |
| transition 轉場 | IE4 `revealTrans(Transition=10)` 棋盤格：10×8 黑格以棋盤錯半格的順序 `clip-path` 一格一格掀開；點站內連結時反向蓋上再換頁 | 頁面載入／點連結 | 每格 180ms、`steps(4)`、延遲 (欄＋列奇偶×0.5)×36ms | 不顯示遮罩，直接換頁 |
| signature 簽名 | **會燒的 WordArt 站名**：220×62 低解析度熱度緩衝，字的像素每格是火源，Doom 火焰演算法往上傳熱、隨機冷卻；火的 37 階色每一階先量化成網頁安全色；游標在字上揮動＝起風＋點火 | 一直在＋游標 | 20 fps（50ms 一步） | 先算 48 步後停在一格靜止的火 |

自我限制：**不准淡入、不准滑入、不准 ease**。一切「出現」都是下一格直接出現。

### motion-library 元件表（motion-library 1.25.4 @497923d9）

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 角色 |
|---|---|---|---|---|---|
| 首頁 | TXT-A-29 | Counter | `text:'0432xxx 位'`, colors `#FF00FF/#FFFF00/#000000`, duration 2.4, loop:false, 16:9, seed 1999 | 訪客計數器從 0 跑到今天的總數——計數器就是這個流派的家具；等寬數字、一條底線，零發光 | transition（一次） |
| 首頁 | BG-A-06 | Dizzy Stars | colors `#FFFF00/#FF00FF/#000000`, duration 6, density 1.4, 16:9, seed 312 | 〈本週夜衝〉上方一圈繞橢圓轉的五角星＋閃爍星點，正是 1999 年「轉圈星星」GIF 的放大版 | ambient |
| 機台與價目 | TXT-B-18 | Letter Bounce | `text:'機台與價目'`, colors `#FFFF00/#FF00FF/#000000`, duration 1.6, once | 標題字一個一個掉下來彈一下——1999 年 JavaScript「跳跳字」腳本的語彙 | transition（一次） |
| 做一頁首頁 | TXT-B-09 | Wave Letters | `text:'歡迎光臨我的首頁！'`, colors `#FF00FF/#00FFFF/#000000`, duration 3, once | 「歡迎光臨」波浪字，波峰那幾個字變洋紅——當年每一頁個人首頁的第一行 | transition（一次） |
| 做一頁首頁 | BG-B-30 | Confetti Fall | colors `#FF00FF/#FFFF00/#000000`, transparent:true, duration 3.2, density 1.2, 1:1, seed 56 | 上傳完成時蓋在預覽上 5.2 秒的平面紙花（只有矩形、無模糊），慶祝「你的首頁上線了」 | transition（事件） |

挑選與排除：`TXT-A-24 Extrude`（地面投影用 `filter:blur`）、`SHP-20 Confetti Burst`（近景層模糊＋放射漸層閃光）、`TXT-A-31 LED`（`shadowBlur` 發光）、`SHP-28 Bouncing Shapes`（`rr()` 圓角方塊）皆違反「零模糊、零發光、零圓角」而不用。BG-A-06 的星點以 `rgba` 明滅會產生非安全色的灰，屬唯一容許的偏差（它在模擬 CRT 上的閃爍）。元件的字型堆疊（Unbounded／Noto Sans TC）本站**刻意不載入**，於是退回系統 Arial／黑體——正是 1999 年。出處：`MotionLib.prompt(id)`。

掛載：子集 inline 為每頁第一個 `<script>`；`GH.ml()` 等 `document.fonts.ready`、離屏 `destroy()`、回視窗重掛；一次性文字 `loop:false` 播一次後 `seek(1)`；canvas `aria-hidden`；容器內保留 HTML 標題（`.ml-fb`）掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同畫面同時運轉 ≤2 個。

## 插畫與圖像風格

**逐格精靈 GIF（procedural GIF sprites）**：全站零圖檔，每一張小圖都在建置期以 node 逐像素算出（星星用 cos 壓扁 X 軸＝翻轉、地球以經度位移＋決定性陸地函數、火以熱度＋雜訊量化、信封與柵欄手排、外星人與愛心用隱函數），只准安全色，外圍描一圈 1px 深色輪廓，編成**索引色 PNG（有調色盤、像 GIF）**的橫排精靈表。尺寸一律 9–32px 原生、整數倍放大。

不准：向量平滑插畫、照片、陰影、漸層（WordArt 除外）、超過 16px×12 格的大動畫。

## Logo 與 Favicon 設計指南

- Logo（`assets/logo.svg`）：176×64 黑底、`shape-rendering:crispEdges` 的 1 單位方格飛碟（青圓頂、灰碟身、紅黃綠三燈、綠色牽引光）＋WordArt 站名（黃橙紅漸層、黑邊、深藍右下影）＋Courier 綠色 `GALAXY STATION · 1999`。
- Favicon：16×16 像素飛碟，SVG `rect` 拼成，inline data URI。

## Do & Don't

**Do**
- 每個動畫都 `steps()`；每個平色都在 216 色裡。
- 每一區都有框；框外是平鋪星空。
- 把站務家具做齊：計數器、跑馬燈、施工中、NEW!、寫信給站長、最佳瀏覽、背景音樂。
- 文案用站長口吻：「大家好～我是…」「請勿…」「有事打…」。

**Don't**
- 不准圓角、陰影、模糊、毛玻璃、淡入、緩動。
- 不准紫藍漸層 hero、置中三卡片、emoji icon（全部用精靈 GIF）。
- 不准把它做成「醜的惡搞頁」——資訊要在表格裡排整齊，價錢要對齊。
- 不准用 `#C0C0C0`（非安全色）、不准用現代 UI 字體。
- 不准自動播放聲音：背景音樂要使用者按了才響。
- 不准 EST. 徽章——要寫就寫「本站於 1999 年 3 月 12 日開站」。

## 頁面骨架範例

```html
<body>
<div class="rt" aria-hidden="true"></div>          <!-- 棋盤格換頁遮罩 -->
<div class="fs">
 <header class="frame f-top tile-stars">
  <p class="sub">★ 臺中一中街 ★ 二十四小時 ★</p>
  <div class="title-row">
   <span class="gif g-flame z4"></span>
   <div class="burn" id="burn"><p class="h1 wordart">銀河站網咖</p></div>
   <span class="gif g-flame z4"></span>
  </div>
  <div class="mq" role="marquee"><span>★ 夜衝 22:00–08:00 只要 NT$180 ★</span></div>
 </header>
 <nav class="frame f-left tile-check">
  <ul class="vnav">
   <li><span class="here"><span class="gif g-hand"></span></span><a href="index.html" aria-current="page">首頁</a></li>
   <li><span class="here"></span><a href="seats.html">機台與價目</a></li>
  </ul>
  <span class="odo" data-odo><i>0</i><i>4</i><i>3</i><i>2</i><i>9</i><i>1</i><i>6</i></span>
 </nav>
 <main class="frame f-main tile-stars">
  <div class="box"><h2>站長的話 <span class="gif g-new"></span></h2><p class="comic">大家好～</p></div>
  <table class="tbl"><tr><th>項目</th><th>價錢</th></tr><tr><td>一般區</td><td class="n">30</td></tr></table>
  <div class="rbhr"></div>
 </main>
</div>
</body>
```

---

## 技術實作與相容性

### 1. CSS `steps()` 逐格精靈（B 動效與時間軸層）
- **承載**：特徵 3 的全部動畫 GIF、跑馬燈 6px 步進、彩虹分隔線、換頁棋盤格、游標拖尾——本站所有運動都是一格一格的。
- **支援**：`steps()` 為 `<easing-function>` 的一部分，MDN 標 Baseline Widely available；Chrome 8／Firefox 4／Safari 5.1 起支援。`image-rendering: pixelated`：Chrome 41、Firefox 93 起；MDN 標 Baseline Widely available。查證來源：MDN〈steps()〉https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/steps 、caniuse〈image-rendering: pixelated〉https://caniuse.com/mdn-css_properties_image-rendering_pixelated 。
- **fallback**：精靈表是建置期產生的 data: PNG 寫在 CSS 裡，**關掉 JavaScript 照樣會動**；不支援 `pixelated` 時圖會稍微糊，不影響資訊；`prefers-reduced-motion` 停在第一格。
- **實測**：13 張精靈＋4 塊背景磚的索引色 PNG 合計約 3.8KB（CSS 8.5KB 含 base64 與 keyframes）。

### 2. Canvas 2D `ImageData` 熱度緩衝（A 渲染層）
- **承載**：特徵 4 的燒字（簽名動效）與〈做一頁首頁〉預覽的火焰／彩虹／鉻銀三種 WordArt。
- **作法**：以 `fillText` 在離屏畫布畫字、`getImageData` 取 alpha>110 為火源遮罩；每步把字的像素設為熱度 33，再自下而上以 Doom 火焰演算法（Fabien Sanglard 2018〈How DOOM fire was done〉所解析的 PSX Doom 版本）把熱往上一列傳、隨機左右偏、每列冷卻 0–2 階；37 階調色盤先量化成網頁安全色再寫入 `Uint8ClampedArray`，`putImageData` 後再以 `fillText` 疊漸層字。
- **支援**：`putImageData()` MDN 標 Baseline Widely available（2015 年 7 月起跨瀏覽器）。查證來源：MDN〈CanvasRenderingContext2D: putImageData()〉https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData 。
- **fallback**：無 canvas／無 JS 時顯示 `background-clip:text` 的靜態 WordArt（特徵 4 的 CSS 片段）。離屏（IntersectionObserver）或分頁隱藏時不算。
- **效能**：220×62＝13,640 格／步，20 fps；node 實測一步約 0.2ms，首屏 JS（含計數器、機台燈號、遮罩建立）遠低於 100ms 預算。

### 3. `localStorage` 跨頁狀態（E 資料與生成層）
- **承載**：左框的訪客計數器（開站日數×31＋你在三頁之間每一次載入）、〈做一頁首頁〉上傳後掛進首頁〈本店會員首頁〉表格、`#~帳號` 從首頁點回去重新載入那一頁。
- **支援**：Web Storage 全面支援；但在 `file:`／沙箱 iframe／部分無痕模式下取用可能丟 `SecurityError`，WebKit 則給 session 範圍的儲存。查證來源：MDN〈Window: localStorage〉（w3cub 鏡像 https://docs.w3cub.com/dom/window/localstorage ）、Mozilla Bugzilla #1611196。
- **fallback**：所有讀寫包在 `try/catch`；失敗時計數器仍顯示底數、會員首頁只顯示三個虛構會員，〈做一頁首頁〉照常上傳與顯示原始碼，只是回首頁看不到。

### 4. 其他
- 背景音樂：Web Audio 方波（旋律）＋三角波（低音）合成〈卡農〉與〈給愛麗絲〉（皆為公有領域曲目），按鈕觸發，不自動播放。
- 單頁大小：首頁 ~269KB、機台與價目 ~269KB、做一頁首頁 ~278KB（其中 motion-library 子集 227KB），皆 ≤350KB。
- 外部資源：僅 Google Fonts Comic Neue；零外部圖片、零音檔。
