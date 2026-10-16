---
name: showa-gekiga-screentone
description: Shōwa-era gekiga and manga screentone style (Osaka kashihon rental-book gekiga from 1957, Garo-era alternative manga, 1960s–80s tankōbon printing) — every grey is an amplitude-modulated dot screen with knife-scraped highlights, emphasis and motion are ruled tapered focus lines and speed lines, solid black masses and pen strokes that swell and taper, an irregular right-to-left panel grid with white gutters and slanted cuts, vertical dialogue in oval balloons with typeset narration boxes and hand-lettered katakana sound effects, printed in one ink on tinted newsprint.
---

# 昭和劇畫・網點紙風 Shōwa Gekiga & Screentone

> 範例站：一刀租書 TSI̍T-TO（新北三重，1975 年起的漫畫租書店）。本規格不綁定產業：任何「晚上才開門、靠一個人的手藝撐著」的題材都合——深夜食堂、拳擊館、修錶舖、二手唱片行、夜間計程車行、偵探社、居酒屋、刺青店都適用。

## 1. 設計哲學

**劇畫（gekiga）** 是 1957 年前後在大阪的**貸本**（租書）市場裡長出來的。那時日本的漫畫很多不是買來的，而是向租書店一天一天租的；日の丸文庫等出版社為租書店出版精裝短篇集（如《影》），辰巳嘉裕（辰巳ヨシヒロ）等一批年輕畫家不想再畫給小孩看的東西，替自己畫的作品取了新名字「劇畫」：寫實、電影式的分格、陰影很重、常常在下雨、沒有笑點。1964 年《ガロ》創刊後，劇畫與另類漫畫在雜誌上延續；1960–80 年代的單行本與週刊把它的語法印到極廉價的再生紙上——**只有一色墨，灰色只能靠網點紙**。

這個風格的所有特徵都來自當時的製作限制：

- **只有黑與紙**。印刷是單色、網點製版成本高、紙很粗，所以灰要用預先印好的**網點紙**（screentone，美國 Zip-A-Tone 1937、Letraset 的 Letratone 1966）貼上去、用筆刀削出形狀；亮部是**削出來的**，不是畫出來的。
- **速度與情緒用線畫**。沒有動態模糊、沒有漸層，所以速度是平行的**流線**，衝擊與注目是向一點收束的**集中線**，全部用尺與 G 筆一條一條拉。
- **閱讀方向是右開**。日文直排，一頁從右上讀到左下，格子的順序就是時間；台灣代理版沿用右開與直排對白，**擬聲字常保留片假名原畫、旁邊加一個小小的中文註**——本規格把這個在地習慣也收進來。

一句話：**這是一個只准用一支筆、一把刀、一種墨的風格。看起來豐富，是因為網點與線把灰階全部承擔了。**

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--ink` | `#1B1A1C` | 唯一的墨：線、ベタ（實黑）、網點、字 | 30–45% |
| `--zara` | `#ECE4D0` | 再生ザラ紙（灰米），故事／正文頁 | 依章 |
| `--momo` | `#F0D5CC` | 色上質紙・桃（第 1 話） | 依章 |
| `--lemon` | `#EEE2A0` | 色上質紙・檸檬（第 2 話） | 依章 |
| `--mizu` | `#CFE1E3` | 色上質紙・水色（第 4 話） | 依章 |
| `--shu` | `#D7372B` | 二色刷的朱：印章、店內標記、強調按鈕的實色位移影 | ≤4% |
| `--desk` | `#3B3936` | 書本之外的桌面（帶 8px 墨點網） | 外框 |

規則：
- **一頁只有一種紙色＋一種墨**。紙色換頁不換頁內；週刊漫畫的彩色紙段落就是這樣印的。
- **灰不准是 hex 灰**。任何中間調都必須是網點（見特徵①）。`#888` 只允許出現在「餵給網點濾鏡的灰階來源」裡，永遠不會直接上螢幕。
- **朱只給「蓋上去的東西」**：印章、店內限定、借出態。不給標題、不給背景大面積。
- **沒有純白**：白就是紙色；對白框的「白」也是紙色。

## 3. 字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 對白（吹き出し） | Noto Serif TC | 700 | 直排明體，台灣代理版的對白感；`letter-spacing:.06em`、`line-height:1.55` |
| 旁白框・UI | Noto Sans TC | 500 / 700 / 900 | 直排黑體，`line-height:1.75` |
| 章名・書名 | Noto Serif TC | 900 | 直排，字級跳到正文 3 倍以上 |
| 擬聲字（描き文字） | Dela Gothic One | 400（本身極粗） | 只用片假名；SVG `<text>` 加紙色描邊 16px、`paint-order:stroke` |
| 擬聲中文註 | Noto Sans TC | 900 | 34px（頁面座標），用〔〕括起，緊貼擬聲字 |

字級（頁面內以 `cqi` 為單位，頁寬 = 100cqi）：章名 9cqi／大對白 4.6cqi／對白 3.5cqi／小對白 2.8cqi／旁白 2.7cqi／ノンブル 2.1cqi。頁面外的 UI 用 px：章名 26–40px、正文 14–15px。
直排內的數字一律 `text-combine-upright:all`（縦中横），兩位數一組：`<span class="tcy">19</span><span class="tcy">75</span>`。

## 4. 版面與網格

- **頁是單位**。頁面固定 B6 單行本比例 `aspect-ratio:1280/1820`，內容在 1280×1820 的 SVG 座標系裡排；外邊距 70。
- **見開き（跨頁）**：`.spread{flex-direction:row-reverse}` 讓 DOM 第一頁（右頁）出現在右邊；中間的「のど」以 4.5% 寬的網點帶表示，**不用陰影**。
- **コマ割り**：格與格之間的白溝（gutter）**橫向 24–30、縱向 30–40**（橫溝比縱溝窄是日漫慣例）；每頁至少一條**斜切溝**（8–14° 的斜邊）；格線 7px 實墨、直角接合（`stroke-linejoin:miter`）。
- **閱讀順序＝時間**：右上 → 左上 → 右下 → 左下。DOM 順序必須就是這個順序（讀屏器照著讀）。
- **旁白框貼右上**，對白框落在說話者的頭側；一格最多兩個框。
- **≤760px**：跨頁拆成單頁直落（右頁先），頁內座標全部以百分比與 cqi 縮放，不重排。
- 留白規則：一頁至少一格「沒有字」的格子（純圖、或只有擬聲字）。

## 5. 元件配方

**柱（hashira）導覽**——週刊漫畫頁邊那一欄直排小字。桌機右緣固定 58px 直欄，四話直排，現用話反成實墨；≤760px 退為底部四格。
```css
.hashira{position:fixed;top:0;right:0;bottom:0;width:58px;background:var(--paper);border-left:3px solid var(--ink);display:flex;flex-direction:column}
.hashira li a{writing-mode:vertical-rl;display:flex;gap:.5em;padding:12px 0;font-weight:700;font-size:14px;letter-spacing:.12em}
.hashira a[aria-current]{background:var(--ink);color:var(--paper)}
.hashira a:hover{background:radial-gradient(circle,var(--ink) 0 1.3px,transparent 1.8px) 0 0/6px 6px}
```
**吹き出し（對白框）**：橢圓、墨框、紙色底、尖尾。
```css
.bal{writing-mode:vertical-rl;font:700 3.5cqi/1.55 "Noto Serif TC",serif;background:var(--paper);border:.55cqi solid var(--ink);border-radius:50%;padding:2.6cqi 2cqi;position:relative}
.bal::before,.bal::after{content:"";position:absolute;bottom:-3.4cqi;left:42%;width:3.4cqi;height:4cqi;background:var(--ink);clip-path:polygon(0 0,100% 0,25% 100%)}
.bal::after{bottom:-2.3cqi;left:calc(42% + .55cqi);width:2.3cqi;height:2.9cqi;background:var(--paper)}
```
**旁白框**：直角矩形，`.nar.ink` 為反白版（實墨底紙色字），用在時間跳躍與店家資訊。
**按鈕**：主按鈕是一塊ベタ（實墨底紙色字、Noto Serif TC 900、30px），**唯一的陰影是朱色實色位移** `box-shadow:6px 6px 0 var(--shu)`；按下時位移減半。停用態：透明底＋3px 虛線框。
**卡片**：沒有卡片——只有「格」（`.koma{border:3px solid var(--ink)}`），零圓角、零陰影。
**表單**：3px 墨框、白底、零圓角；label 在上方（橫排，可讀性優先）。
**奧付（footer）**：單行本最後一頁的版權頁——書名、發行日、發行所、營業、網點作者，下方是全站連結與「次回」預告。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 種類 | 內容 | 觸發 | 時間 / easing | 降級 |
|---|---|---|---|---|
| ambient 環境 | **集中線沸騰**：三組種子輪替重算楔形，像手繪動畫的線在「抖」 | 自動，150ms 一格（steps，非補間） | `setInterval 150ms`；分頁隱藏時暫停 | 停在第一組，靜態 |
| input 輸入 | **集中線消失點追游標**；書背 hover 抽出 10px | pointermove（rAF 節流）／hover | 單幀；書背 `.14s cubic-bezier(.2,1.4,.4,1)` | 消失點固定；抽出改為即時 |
| transition 轉場 | **コマ送り**：每格的紙色遮罩依閱讀順序由右往左收（scaleX→0），對白框在格開之後以 `@starting-style` 彈出；四格結果用 `clip-path: inset(0 0 0 100%) → inset(0)` 由右往左揭 | 頁面進入視窗（IO 18%）／借書後 | 每格 `.5s cubic-bezier(.7,0,.2,1)`、格間 160ms；對白 `scale .38s cubic-bezier(.3,1.7,.45,1)` | 全部直接顯示 |
| signature 簽名 | **ドン砸格**：借出的封面從上方 1.8 倍砸進第一格、集中線從 2.2 倍收束、擬聲「ドン〔咚〕」彈入，接著整頁**逐格震三下**（steps(1)，非補間） | 按「借」 | 砸 `.46s cubic-bezier(.2,1.5,.4,1)`；震 `.27s steps(1)` | 無動畫，直接呈現最後一幀 |

自我限制：**本風格禁用淡入淡出、模糊、視差與緩動補間的晃動**——漫畫裡沒有這些；所有「震」與「抖」都必須是離散的格（steps）。

## 7. 插畫與圖像風格（gekiga-ink-tone）

- 圖像分兩層：**灰階來源層**（任何 `#000–#fff` 的平塗與漸層，放進 `<g filter="url(#tone)">`，由濾鏡轉成網點）＋**墨層**（純 `#000` 的ベタ、入り抜き筆畫、格線，與純 `#fff` 的削り線，放在濾鏡外保持銳利）。
- 光源永遠是**畫面裡的一盞燈**（店門、燈箱、檯燈）：用 `radialGradient` 白心餵給網點，就會得到「網點越靠近燈越小」的真實貼網效果。
- 人物以**局部特寫**為主（眼、手），劇畫的寫實感來自陰影與比例，不來自可愛化；**不畫任何既有作品的角色**。
- 物件：書背、書堆、拉門、筆刀、檯燈、印章、紙箱、空椅子——都是靜物，靠網點與集中線給情緒。
- 每頁至少一格出現**放大的網點本身**（大圓點陣，左密右疏），讓讀者看見這個風格的材料。

## 8. Logo 與 Favicon

- Logo：120×120 實墨方塊，左上直排白框「一刀」，整面是由左下往右上漸疏的網點，被一道白色斜削口（筆刀一刀）切開，右下一個朱色三角（刀尖）。
- Favicon：32×32 inline SVG data URI：墨底、桃色網點七顆、白色斜削口、朱色刀尖。
- 原則：Logo 必須只用「墨＋紙＋一個朱」，且包含網點與削口兩個母題。

## 9. Do & Don't

**Do**
- 所有灰都是網點；亮部用削出來的白線。
- 集中線外粗內尖、留缺口（約 18% 的線被跳過），消失點落在情緒中心。
- 擬聲字畫進圖裡（SVG text、旋轉 −5° 至 −12°、紙色粗描邊），旁邊加中文小註。
- 對白直排、數字縦中横、右開讀序、DOM 順序＝閱讀順序。
- 一頁一紙色；朱只給印章與限定標記。

**Don't**
- 不用 CSS 漸層／`opacity` 做灰；不用 `filter:blur`、`box-shadow` 模糊陰影。
- 不用圓角卡片、不用置中三卡片、不用紫藍漸層、不用 emoji icon、不寫 Lorem ipsum。
- 不畫既有漫畫角色、不模仿特定作品的封面或標題字。
- 不用淡入當主要動效；不用補間的晃動（震必須是 steps）。
- 擬聲字不要用中文取代片假名（那是台灣代理版的語感來源），但一定要加中文註，否則讀者看不懂。

## 10. 頁面骨架範例

```html
<body class="ch1">
<svg class="defs" width="0" height="0" aria-hidden="true"><defs>
  <radialGradient id="glow"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#c4c4c4"/><stop offset="1" stop-color="#3a3a3a"/></radialGradient>
  <!-- filter#tone 見特徵① -->
</defs></svg>
<main>
  <div class="spread">
    <section class="page r" aria-label="第1頁">
      <svg class="art" viewBox="0 0 1280 1820" role="img" aria-label="雨夜的店門">
        <clipPath id="c-p1"><polygon points="70,70 1210,70 1210,1000 70,1080"/></clipPath>
        <g class="k" style="--o:0">
          <g clip-path="url(#c-p1)">
            <g filter="url(#tone)"><rect width="1280" height="1100" fill="#6a6a6a"/><circle cx="640" cy="860" r="320" fill="url(#glow)"/></g>
            <path d="…ベタ與削り…"/>
          </g>
          <polygon class="kline" points="70,70 1210,70 1210,1000 70,1080"/>
          <polygon class="cv" points="70,70 1210,70 1210,1000 70,1080"/>
        </g>
      </svg>
      <div class="ov ar" style="right:7.8%;top:6.15%"><p class="nar">晚上十一點，<br>還亮著的只剩這一家。</p></div>
      <div class="ov" style="left:23%;top:65%;--o:2"><p class="bal">要借什麼？</p></div>
    </section>
    <section class="page l" aria-label="第2頁">…</section>
  </div>
</main>
<nav class="hashira">…</nav>
</body>
```

## 11. 本風格的 5 個不可省略特徵

### ① 網點紙——灰只能是網點，亮部是削出來的（拿掉它，就只是一張黑白插畫）

45° 網屏、點隨灰階放大縮小（AM 網點）；漸層＝點的大小漸變；亮部是削掉網點的白線。本站以 SVG 濾鏡把任何灰階**即時**網點化：

```html
<filter id="tone" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <!-- 16×16 灰階 PNG：S = 1 − .97 × ((cos 2π(x+y)/16 + cos 2π(x−y)/16)/4 + .5)，建置期產生 -->
  <feImage href="data:image/png;base64,…" x="0" y="0" width="16" height="16" preserveAspectRatio="none" result="cell"/>
  <feTile in="cell" result="scr"/>
  <feColorMatrix in="SourceGraphic" type="matrix" values=".2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  0 0 0 1 0" result="lum"/>
  <!-- L + S − 1 < 0 ⇒ 墨 -->
  <feComposite in="lum" in2="scr" operator="arithmetic" k2="1" k3="1" k4="-1" result="sum"/>
  <feComponentTransfer in="sum" result="bw"><feFuncR type="linear" slope="48"/><feFuncG type="linear" slope="48"/><feFuncB type="linear" slope="48"/><feFuncA type="linear" slope="0" intercept="1"/></feComponentTransfer>
  <!-- 白→透明、黑→墨色，讓紙色透出 -->
  <feColorMatrix in="bw" type="matrix" values="0 0 0 0 .106  0 0 0 0 .102  0 0 0 0 .110  -1 0 0 0 1" result="ink"/>
  <feComposite in="ink" in2="SourceAlpha" operator="in"/>
</filter>
```
產生網屏 PNG 的 Node 片段（零依賴）：
```js
function screenPNG(s){ /* 每列前置 filter byte 0，灰階 8-bit，zlib.deflateSync 後包 IHDR/IDAT/IEND */
  for(let y=0;y<s;y++) for(let x=0;x<s;x++){ const X=x+.5,Y=y+.5;
    const v=(Math.cos(2*Math.PI*(X+Y)/s)+Math.cos(2*Math.PI*(X-Y)/s))/4+.5; px=Math.round((1-v*.97)*255); } }
```
純 CSS 版（HTML 元件上的平網，例如書架底、空槽位）：
```css
.tone-css{background-image:radial-gradient(circle,var(--ink) 0 1.2px,transparent 1.7px),radial-gradient(circle,var(--ink) 0 1.2px,transparent 1.7px);background-size:7px 7px;background-position:0 0,3.5px 3.5px}
```
削り（白色入り抜き線）：`<path d="M640 900 Q840 860 1080 910 Q840 880 640 900Z" fill="#fff"/>`

### ② 集中線與流線（拿掉它，畫面就沒有聲音）

```js
// 楔形：外端在畫框外（寬）、內端收在消失點附近（尖）；約 18% 跳過留缺口
function focus(cx,cy,W,H,n,seed,inner){ const r=rng(seed),R=Math.hypot(W,H)*1.2; let d='';
  for(let i=0;i<n;i++){ if(r()<.18) continue; const a=(i+r()*.8)/n*Math.PI*2, w=.004+r()*.016, ri=inner*(.55+r()*.9);
    d+=`M${cx+Math.cos(a-w)*R} ${cy+Math.sin(a-w)*R}L${cx+Math.cos(a+w)*R} ${cy+Math.sin(a+w)*R}L${cx+Math.cos(a)*ri} ${cy+Math.sin(a)*ri}Z`; }
  return d; }
```
流線＝平行的雙二次曲線梭形（中段粗 0.6–3px、兩端尖），長度 25–85% 畫框寬。集中線與流線一律純墨、不透明度 ≥ .5、**絕不模糊**。

### ③ ベタ與 G 筆入り抜き線（拿掉它，就變成等寬線的美式線稿）

每格至少 25% 面積是實墨；所有描線都是「起筆尖、中段粗、收筆尖」：
```js
function stroke(x1,y1,cx,cy,x2,y2,w){ let nx=-(y2-y1),ny=x2-x1; const L=Math.hypot(nx,ny); nx/=L; ny/=L;
  return `M${x1} ${y1}Q${cx+nx*w} ${cy+ny*w} ${x2} ${y2}Q${cx-nx*w} ${cy-ny*w} ${x1} ${y1}Z`; } // fill="#000"
```
禁止 `stroke-width` 等寬描邊當輪廓（格線與器物結構線例外）。

### ④ 右開コマ割り＋斜切白溝（拿掉它，就是一般的圖文網頁）

```css
.spread{display:flex;flex-direction:row-reverse}        /* 右頁在 DOM 第一 */
.slots,.strip,.cvgrid{direction:rtl} .slots>*,.strip>*{direction:ltr} /* 格序右→左 */
.kline{fill:none;stroke:#000;stroke-width:7;stroke-linejoin:miter}
```
```html
<polygon class="kline" points="700,1080 1210,1036 1210,1750 650,1750"/> <!-- 斜切溝：上緣斜 5°、左緣斜 4° -->
```
鍵盤也右開：`←` 下一頁、`→` 上一頁（輸入框內不攔截）。

### ⑤ 直排吹き出し＋描き文字擬聲（拿掉它，就看不出是漫畫）

```css
.bal{writing-mode:vertical-rl;border-radius:50%} .tcy{text-combine-upright:all}
.sfx{font-family:"Dela Gothic One";fill:#000;stroke:#fff;stroke-width:16px;paint-order:stroke fill;stroke-linejoin:round}
```
```html
<text class="sfx" x="690" y="1690" font-size="132" transform="rotate(-5 690 1690)">ガラッ</text>
<text class="gloss" x="700" y="1740">〔喀啦〕</text>
```

## 12. 技術實作與相容性

### (a) 核心技術與查證

1. **SVG 濾鏡 AM 網點化**（feImage＋feTile＋feComposite arithmetic＋feComponentTransfer＋feColorMatrix）——承載特徵①：全站所有中間調都由同一支濾鏡從灰階即時轉成 45° 網點。`feComponentTransfer`／`feComposite`／`feTile`／`feColorMatrix` 皆為 SVG 1.1 以來長期支援的濾鏡原語（MDN〈feComponentTransfer〉）；`feImage` 以 `href` 載入 data URI PNG，避免 Firefox 不支援 `feImage` 參照文件內元素的問題。
2. **writing-mode: vertical-rl＋text-combine-upright**——承載特徵④⑤：對白、旁白、章名、書背、借書卡、柱全部直排，數字縦中横。MDN〈text-combine-upright〉標示 Baseline Widely available（2022-03 起；Safari 15.4 完整支援，`digits` 值支援較少故本站只用 `all`）；caniuse `mdn-css_properties_text-combine-upright`。
3. **@starting-style＋transition-behavior: allow-discrete**——承載轉場：對白框從 `display:none` 直接以 CSS 彈出（不需 JS 計時），借書結果每次重新觸發。web.dev〈Now in Baseline: animating entry effects〉：Baseline Newly available 2024-08（Chrome/Edge 117、Firefox 129、Safari 17.5；allow-discrete 為 Safari 17.4）；MDN〈transition-behavior〉。

### (b) Fallback 具體行為

- **feImage 無法載入**：`scr` 為全透明，`k1·k2·k3·k4` 算出 alpha=0，灰階層整片透明 → 只剩濾鏡外的ベタ、筆畫、格線與文字，頁面仍可讀（退化成純線稿）。
- **整支濾鏡不支援**：瀏覽器直接顯示灰階來源（平滑灰），資訊零損失。
- **不支援 @starting-style**：對白框依然在格開後出現，只是沒有彈出動畫。
- **無 JS**：`.js` class 不存在 → 格子遮罩、對白、集中線全部直接可見；集中線為建置期烘好的靜態 path；書牆功能顯示 `<noscript>` 指向第 2 話書目與租金表。
- **prefers-reduced-motion**：集中線停在第一組、消失點固定、コマ送り與砸格／震動全部取消，直接呈現最終狀態。
- **localStorage 不可用**（無痕、封鎖）：借書卡上你那一行只在本次顯示，不保存；功能完整。

### (c) 效能實測（建置環境 Node 22；本輪環境無瀏覽器，以下為可在 Node 重現的數字）

- 單頁大小（含 inline 全部 CSS/JS/SVG/網屏 PNG）：index 101.9KB／shelf 49.5KB／story 90.0KB／visit 41.9KB，全部 ≤ 350KB。
- `ART.focus()` 150 條集中線：平均 0.14ms／次（Node 22，100 次平均）；12 張封面 SVG 字串生成 0.012ms。首屏 JS 只做 IO 註冊與一次集中線計算，遠低於 100ms 預算。
- 動畫只動 `transform`／`translate`／`clip-path`／`opacity`；集中線放在**獨立的覆蓋 SVG**（`.fx`，`will-change:transform`），每 150ms 換 path 時不會讓下方的網點濾鏡重新計算。濾鏡群組本身從不動畫。
- 網屏 PNG：16×16 與 6×6 各一張，base64 共約 0.5KB。
