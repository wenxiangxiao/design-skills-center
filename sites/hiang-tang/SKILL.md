---
name: calder-mobile-sheet-and-wire
description: Alexander Calder's hanging-mobile language (1931 onward) — flat painted sheet-metal discs in red, black, yellow and blue plus unpainted brass, monoline black wire with hooked ends, asymmetric cantilever balance in open air, and a flat grey cast shadow on a white wall; everything hangs, everything turns, and nothing is gridded.
---

# Calder 吊件・剪片與鐵絲 Calder Mobile — Painted Sheet & Wire

> 範例站：`sites/hiang-tang`（響銅鑼仔・鹿港手錘銅鑼工坊）。本規格書不綁產業：任何「東西可以被掛起來、會動、會碰撞」的品牌都能用。

## 設計哲學

1930 年 10 月 Calder 參觀 Mondrian 的巴黎畫室，回去後開始做完全抽象的構成；1931 年他做出會動的雕塑，Marcel Duchamp 替它取名 **mobile**（法文同時是「運動」與「動機」），Jean Arp 則把不動的那些叫 **stabile**（Calder Foundation 年表）。1932 年起他放棄馬達，讓吊件只靠空氣流動。1940 年的〈Red Disc and Gong I〉與 1950 年的〈Red Gongs〉（The Met 55.181.1a–f：多段吊桿、12 片紅色形片、三片帶環的黃銅）把「碰撞發聲」納入作品——Calder Foundation 為此另立「Sound-making Work」類目。

它為什麼長成這樣：
- **材料決定形狀**：鋁片、鋼片用剪刀剪、用槌子敲平，所以形是剪出來的有機圓片——不是圓規圓，也不是方。
- **鐵絲決定線**：只有一種粗細的鋼絲，用鉗子彎；每個接點是一個小鉤或小環。線條本身就是素描（Calder 早年的鐵絲肖像被稱為「在空間裡畫畫」）。
- **重力決定構圖**：每根臂只有一個吊點，兩端力矩相等。重的靠近吊點、輕的伸遠——所以構圖必然不對稱，卻永遠是平衡的。
- **空氣決定時間**：吊件不需要觀眾操作也會慢慢轉；你走過去帶起的風，會讓它轉得快一點。
- **顏色是標記，不是光**：1930 年代的 Calder 受 Mondrian 影響，限用原色＋黑白，平塗、無光影。

網頁轉譯：**頁面是一面白牆，所有東西都是掛上去的**。區塊用一根線吊著、可以被風（游標）吹動；色彩只用三原色＋黑白＋一種不上漆的金屬；投影是平的灰色剪影，不是模糊陰影。

## 本風格的 5 個不可省略特徵

### ① 形狀：剪出來的有機平片（不是正圓、不是方塊）

每一片都是平塗的不透明形，輪廓略鼓略歪，像剪刀剪的。零描邊、零漸層、零模糊陰影。用 8 值 border-radius 做出「差一點就是圓」的形；同一支吊件裡每片的歪法不同。

```css
.disc{background:var(--red);border-radius:58% 42% 52% 48%/47% 55% 45% 53%}
.disc:nth-of-type(2){border-radius:46% 54% 60% 40%/55% 45% 55% 45%}
.disc:nth-of-type(3){border-radius:52% 48% 42% 58%/60% 40% 52% 48%}
```
```svg
<path d="M2 24c8-5 20-3 23 6s-5 19-15 18S-4 31 2 24z" fill="#D2301F"/>
```

### ② 色彩：Calder 紅為主，黑次之，黃藍各一小片，白牆；唯一不上漆的是黃銅

| 名稱 | hex | 比例 | 用途 |
|---|---|---|---|
| 白牆 | `#EFEDE6` | 60% | 頁面底＝畫廊牆，大面積留空氣 |
| 墨黑鐵絲 | `#141414` | 10% | 鐵絲、文字、黑片 |
| Calder 紅 | `#D2301F` | 12% | 最大那片、主按鈕、現用狀態 |
| 黃 | `#F1B70E` | 4% | 一小片，從不當底色 |
| 藍 | `#1F4E9C` | 4% | 一小片，從不當底色 |
| 黃銅 | `#B98A3E`／深 `#8F6A2C` | 6% | 唯一的金屬：鑼／發聲片，可有車紋 |
| 平影灰 | `#D6D1C5` | 4% | 吊件投在牆上的影子 |

規則：一個畫面同時出現的黃與藍各 ≤1 片；不准出現第二種灰、粉色、漸層填色。黃銅是「材料本色」，只用在會發聲或承重的東西上。

```css
:root{--wall:#EFEDE6;--ink:#141414;--red:#D2301F;--yel:#F1B70E;--blu:#1F4E9C;--brass:#B98A3E;--brd:#8F6A2C;--sh:#D6D1C5}
```

### ③ 字體：鐵絲單線字——同一粗細、圓頭、細

標題用細字重（300）的幾何無襯線，像鉗子彎出來的一根鐵絲；品牌標誌與圖示一律用 SVG 圓頭描邊（`stroke-linecap:round`），粗細與吊件鐵絲相同。禁止粗黑標題、禁止襯線、禁止字距緊縮。

```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;500&family=Noto+Sans+TC:wght@300;400;700&display=swap" rel="stylesheet">
```
```css
h1,h2,h3{font-family:"Noto Sans TC",sans-serif;font-weight:300;letter-spacing:.04em}
.lat{font-family:"Jost",sans-serif;font-weight:300;letter-spacing:.3em}
```

### ④ 版面：所有區塊都「掛」著——單一吊點、不對稱、可被吹動

每個內容區塊上方有一根垂直鐵絲與小環，吊點故意偏離中心（`--hx`），左右交替；hover 時以吊點為軸微微轉動。整頁沒有網格線、沒有卡片框、沒有左右對齊的欄位。

```css
.hang{position:relative;margin-top:46px;transform-origin:50% -46px;transition:transform .5s cubic-bezier(.3,1.6,.5,1)}
.hang::before{content:"";position:absolute;left:var(--hx,32%);top:-46px;width:1.5px;height:40px;background:var(--ink)}
.hang::after{content:"";position:absolute;left:calc(var(--hx,32%) - 4px);top:-9px;width:7px;height:7px;border:1.5px solid var(--ink);border-radius:50%}
.hang:hover{transform:rotate(-1.2deg)}
.hang.r{--hx:72%}
```

### ⑤ 裝飾：鐵絲彎鉤與小環＋牆上的平面投影

每根臂兩端彎一個小環；吊件在牆上投出一個完全相同、偏移的灰色剪影（不模糊、不透明度變化）。投影跟著吊件轉。

```css
.bar{position:absolute;height:2px;background:var(--ink)}
.bar::before,.bar::after{content:"";position:absolute;top:-4px;width:7px;height:7px;border:1.5px solid var(--ink);border-radius:50%}
.bar::before{left:-8px}.bar::after{right:-8px}
.shw{transform:translate(38px,26px)}          /* 同一棵 DOM 再建一次 */
.shw .disc,.shw .gong{background:var(--sh)}  /* 影子＝同形、單一平灰 */
```

## 色彩系統

見特徵②。頁面主調永遠是白牆＋黑線，紅色是全頁最大的色面，但面積不超過 15%。按鈕：主要＝紅片、次要＝黑片、切換＝黃片、確認＝藍片，形狀與吊件色片相同。

## 字體系統

| 層級 | 字級 | 字重 | 行高 |
|---|---|---|---|
| 首頁店名 | clamp(46px,6vw,86px) | 300 | 1.2 |
| H2 | 36–48px | 300 | 1.2 |
| 導言 | 19px | 400 | 1.75 |
| 內文 | 16px | 400 | 1.8 |
| 標籤 kicker | 12px Jost 500，字距 .32em，大寫 | | |
| 數字與價格 | Jost 300，字距 .06em | | |

## 版面與網格

- 不用網格；用「吊點」。首屏左 60% 是一支真的吊件（舞台），右 40% 是一串掛著的資訊塊。
- 每個區塊上方留 46px 給鐵絲；吊點位置 `--hx` 在 6%–90% 之間變化，相鄰兩塊一左一右。
- 旋轉角：hover ±1.2°；按鈕 hover −4°；導覽橫桿 ±8°。
- 留白：區塊之間 90–120px；吊件舞台四周不放任何東西——空氣是構圖的一部分。

## 元件配方

- **導覽（天秤導覽 balance-beam-nav）**：右上一根鐵絲吊著一根橫桿，三頁是三片掛在桿上的小片；現用頁那片最大、塗紅，橫桿因此往那一邊傾斜（`--t:-8deg/0/8deg`）；hover 哪一片橫桿就往哪邊倒。≤560px 改為底部橫條，邏輯相同。
- **按鈕**：色片形 `border-radius:58% 42% 52% 48%/47% 55% 45% 53%`，白字或黑字（黃底用黑字），hover `rotate(-4deg) translateY(2px)`。
- **卡片**：沒有框。一段文字＋上方一根鐵絲＝一張卡。
- **價目列**：每列下方 2px 黑線＝一根橫桿；列首一片依尺寸縮放的小片當圖示；列與列之間左右錯位。
- **表單／選項**：選中＝底線 2px 黑＋名稱轉紅；色彩選擇＝點色片循環四色。
- **footer**：上方一根 2px 黑橫線橫越全頁，三欄文字掛在下面。

## 動效規則

| 類型 | 實作 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 吊件每根臂受「空氣」扭矩：`.22·(sin(.37t+1.9i)+.6sin(.91t+4.3i)+.35sin(1.7t+i))`，扭轉回復 .55、阻尼 .32；鑼譜頁七面鑼各自 `sway` 2.6–4.8s alternate ±1.4° | 不需輸入 | rAF、dt ≤33ms | 停在靜止角度，不跑迴圈 |
| input 輸入 | 游標水平速度＝風：`ω += vx·0.011·距離權重`；掛著的區塊 hover 以吊點轉 ±1.2°；點鑼＝敲 | pointermove／hover／click／鍵盤 1–7 | 同幀生效（<16ms） | 點鑼仍出聲並出現一圈靜止圓 |
| transition 轉場 | 點導覽：橫桿先往目的地那一頁傾斜、整個 main 往上提 40px 並轉 ±1.2°（380ms），再換頁；新頁每個 section 從 −18px、−1.4° 掛下來（900ms，彈性 `cubic-bezier(.3,1.5,.5,1)`，逐段延遲 80ms） | 換頁 | | 直接換頁、無進場 |
| signature 簽名 | **聲響吊件**：巢狀 CSS 3D `rotateY` 的階層吊件在 3D 空間碰撞——色片撞到鑼的那一幀，鑼抖一下、牆上冒出紅黑交替三圈平面同心圈、WebAudio 合成那面鑼的非諧波分音 | 空氣或游標造成的碰撞 | 碰撞門檻 0.86×半徑和、冷卻 260ms | 「吹一口」改為依序敲每面鑼一次 |

本站自我限制：不使用淡入作為主要動效；所有動態都必須有物理理由（風、重量、碰撞）。

### motion-library 元件表

來源：motion-library v1.38.0 @e1382805（private）；`tools/ml-embed.js` 逐頁抽子集 inline 成第一個 `<script>`；`tools/ml-smoke.js` smoke ok。掛載照 `sites/ka-to` 的包裝：`document.fonts.ready` 後掛、離屏 `destroy()`、一次性文字 `loop:false` 只播一次、canvas `aria-hidden`、容器保留 `.ml-fb` HTML 標題；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。`MotionLib.prompt(id)` 可查原始開發 Prompt。

| 頁 | ID | 名稱 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| index | TXT-A-22 | Orbit | colors `#D2301F/#141414/#EFEDE6`、duration 2.4、loop false、seed 1964、16:9 | transition | 「一間會自己響的店」的字先繞一圈橢圓軌道再落定——像吊件轉一圈停下來；純平面字、無光暈 |
| index | BG-B-36 | Minimal Arcs | 同色票、duration 10、density .9、intensity .8、seed 7、1:1 | ambient | 紅黑圓頭弧線以不同速度旋轉，等於一組鐵絲臂在轉；`lineCap:'round'` 與本站鐵絲同語彙 |
| gongs | TXT-B-16 | Circle Text | 同色票、duration 2、loop false、seed 7、1:1 | transition | 「七面鑼」三字先圍成一面圓鑼再排直 |
| gongs | SHP-15 | Ring Expand | 同色票、duration 3.2、seed 42、1:1 | ambient | 紅黑同心圈一圈圈往外擴＝鑼聲；與本站撞擊圈同形。底有 6% 細格線，是唯一妥協，面積小可接受 |
| hang | BG-B-34 | Minimal Circle | 同色票、duration 8、seed 21、1:1 | ambient | 吊鑼單的「印章」：一片紅圓、一段黑弧、一個挖空小圓繞著轉——就是一片 Calder 色片 |

挑選時排除：帶 `rr()` 圓角方塊與星形的 Floating Shapes、帶 `shadowBlur`／立體球漸層的 Swing Letters、Pendulum Swing、Bubble Dots（違反特徵①②⑤）。

## 插畫與圖像風格

全站零點陣圖：吊件由 HTML 元素組成（`.bar` 橫桿、`.w` 垂直鐵絲、`.disc` 色片、`.gong` 黃銅），平影是同一棵 DOM 的灰色複本。黃銅表面：

```css
.gong{border-radius:50%;border:2px solid #8F6A2C;background:
 radial-gradient(circle,#8F6A2C 0 6%,#CBA35A 6.5% 13%,transparent 13.5%),      /* 鑼臍 */
 repeating-radial-gradient(circle,transparent 0 5px,rgba(96,64,20,.11) 5px 6px), /* 錘痕圈 */
 repeating-conic-gradient(from 12deg,#B98A3E 0 5deg,#CFA65E 5deg 8deg,#A77A33 8deg 13deg)} /* 車紋光澤 */
```

## Logo 與 Favicon 設計指南

Logo＝一支最小的吊件：一根橫桿（兩端小環）、左邊一片紅、右邊一面帶鑼臍的黃銅、往下再吊一根小臂。全部 2.5px 圓頭線。字標用 Jost 300 加大字距。Favicon 32×32 保留「橫桿＋紅片＋黃銅」三件。

## Do & Don't

- Do：讓每個東西都有吊點；讓重的靠近吊點；讓投影是平的。
- Do：大面積留白牆；一次只用一片黃、一片藍。
- Do：讓靜止也像在動——θ 不歸零，吊件永遠微微偏著。
- Don't：網格、卡片框、對齊成欄、置中三卡片。
- Don't：漸層填色、模糊陰影、光暈、玻璃擬態、紫藍漸層、emoji icon。
- Don't：粗黑標題、襯線字。
- Don't：正圓＋正方的幾何包浩斯拼貼——那是 Bauhaus／De Stijl，不是 Calder。
- 與鄰近流派的分界：**De Stijl**＝正交網格與矩形色塊，本流派零網格、有機片、會動；**Matisse 剪紙**＝紙、貼平、無鐵絲無運動；**中世紀現代**＝迴力鏢紋樣與家具，本流派的吊件是構圖系統本身；**硬邊抽象 Kelly**＝單一大色板；**米羅**＝繪畫筆觸與星形符號。

## 頁面骨架範例

```html
<nav class="bn" style="--t:-8deg"><div class="bn-arm">
  <a href="index.html" aria-current="page"><i></i>首頁</a><a href="b.html"><i></i>第二頁</a><a href="c.html"><i></i>第三頁</a>
</div></nav>
<main>
 <section class="hero">
  <div class="stage" id="stage" role="group" aria-label="吊件，游標掠過會吹動"></div>
  <div class="side">
   <div class="hang"><h1>品牌名<span class="lat">BRAND</span></h1></div>
   <div class="hang r"><p class="lead">一句話。</p></div>
   <div class="hang" style="--hx:80%"><a class="btn" href="c.html">主要動作</a><a class="btn k" href="b.html">次要</a></div>
  </div>
 </section>
</main>
<script>/* HT.balance(list) 由下往上算每片色片大小與吊點；HT.mobile(stage,levels) 建 DOM＋平影＋物理 */</script>
```

## 技術實作與相容性

### 1. Web Audio API 非諧波分音合成（D 輸入與感測層）— 鑼聲

每面鑼＝7 個 `OscillatorNode`（sine），頻率比 1 : 1.483 : 1.932 : 2.546 : 3.17 : 4.07 : 5.36（膜類非諧波分音的近似），各自指數衰減（大鑼 T≈5.3s、響盞 T≈1.8s）；小鑼 `exponentialRampToValueAtTime` 往上滑 6%（戲曲小鑼的上揚）、北管大鑼往下沉 6%；起音另加 80ms 白噪經 `BiquadFilterNode` bandpass（2.6×基頻、Q 1.3）做錘擊；全部經 `DynamicsCompressorNode`。AudioContext 只在使用者按「讓鑼出聲」時建立；跨頁以 sessionStorage 記住意願，新頁第一次點擊時恢復。
- 查證：MDN `BiquadFilterNode` Baseline Widely available（2021-04 起跨瀏覽器；Chrome 55／Firefox 53／Safari 14.1）；Mozilla Web Audio rollout：OscillatorNode Firefox 25 起完成。
- Fallback：無 AudioContext 時按鈕顯示「這台瀏覽器沒有聲音」，撞擊仍有抖動與同心圈，資訊零損失。

### 2. requestAnimationFrame 扭擺物理＋巢狀 CSS 3D rotateY（B 動效與時間軸層）— 吊件本體

每根臂一個相對扭轉角 θᵢ 與角速度 ωᵢ，半隱式 Euler 積分；DOM 為巢狀 `.arm`，`transform:translate3d(bᵢ₋₁,Hᵢ₋₁,0) rotateY(θᵢ)`、`transform-style:preserve-3d`，舞台 `perspective:1500px`——色片轉到側面時自然變成一條線。碰撞在 JS 以同一套世界座標（φ=Σθ、u=(cosφ,−sinφ)）計算色片與鑼的 3D 距離，距離遞減且小於 0.86×半徑和才算撞；撞後 ω 反向 ×0.45。平影是第二棵 DOM 同步寫 transform。離屏以 IntersectionObserver 停止 rAF；重建時 `AbortController` 一次移除舊監聽。
- 查證：CSS transforms 3D／`transform-style` 為 Baseline Widely available；`AbortController` 作為 addEventListener signal Baseline 2021。
- Fallback：reduced-motion 不跑迴圈、停在靜止角；無 JS 顯示 `<noscript>` 靜態 SVG 吊件。

### 3. repeating-conic-gradient＋repeating-radial-gradient 程序化黃銅（A 渲染層）— 唯一的金屬

三層背景疊出鑼臍、錘痕圈與車床光澤；不用任何圖檔。
- 查證：MDN `conic-gradient()` Baseline Widely available，自 2020-11（Firefox 83 加入支援）跨瀏覽器。
- Fallback：不支援 conic 時退為 `#B98A3E` 平色＋錘痕圈。

### 效能預算（實測）

| 項目 | 值 |
|---|---|
| index.html | 約 321 KB（含 motion-library 子集約 285 KB） |
| gongs.html | 約 315 KB |
| hang.html | 約 322 KB |
| 平衡求解 `HT.balance`（4 面鑼） | node 22：約 0.004 ms |
| 每幀物理＋碰撞（4 臂、24 組距離） | node 22：約 0.003 ms；DOM 寫入 8 個 transform |
| 同畫面同時運轉的 motion-library 元件 | ≤2 |
