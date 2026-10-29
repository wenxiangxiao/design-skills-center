---
name: space-age-panton-tunnel
description: Space Age interior graphics after Verner Panton's Visiona 2 (1970) — warm concentric colour-ring tunnels, zero sharp corners, wide Eurostile-style caps, injection-moulded plastic gloss with one crisp highlight, portholes and orbits.
---

# 太空時代・Panton 視覺環境半身 Space Age · Panton Visiona

範例站：`sites/goo-tiam`（五點剪髮室，臺北的幾何剪髮室）。本規格書不綁產業：任何想要「1960 年代末的未來」——熱、圓、亮、會把人包起來——的品牌都能用。

## 設計哲學

太空時代（約 1957 Sputnik 到 1972 最後一次阿波羅登月）有兩張臉。一張是白色無塵室：Courrèges 的白、Kubrick〈2001〉太空站的白、國際橘只標示正在發生的事（本館 `changfeng` 是這一半）。另一張是**把人包起來的暖色洞穴**：Verner Panton 1970 年替 Bayer 在科隆家具展做的 Visiona 2（後由 Vitra 以〈Phantasy Landscape〉重建），從紅、橘、粉到紫的軟墊一層層圍成洞；Eero Aarnio 1963 年的球椅把人裝進一顆玻璃纖維球；Joe Colombo、Olivier Mourgue 的家具沒有一個尖角。字是 Aldo Novarese 的 Microgramma（1952，與 Alessandro Butti，只有大寫）與 Eurostile（1962，Nebiolo）：寬、方中帶圓，像儀表板。

這個半身的規則來自當時的**材料**：ABS 與玻璃纖維一體成型，所以沒有接縫、沒有尖角；表面是高光澤的單色漆，所以只有一塊鏡面高光，沒有紋理；燈光是環形燈與嵌燈，所以空間是同心的。網頁版把這三件事翻譯成：膠囊與圓、硬停的同心色環、一塊銳利高光。

**三句話**：從外往內是一條暖色隧道；隧道盡頭是一扇舷窗；舷窗裡的東西是光亮的塑料做的。

## 本風格的 5 個不可省略特徵

拿掉其中任何一個，它就變成「普通的復古粉彩站」。

### ① 零尖角：膠囊、圓、舷窗
所有容器的圓角 ≥ 自身高度的一半；長方塊用 `999px`，大區塊用不等的大圓角（`220px 220px 60px 220px`）；沒有任何 90° 角露在畫面上（含輸入框、表格列、頁尾頂緣）。

```css
.pill{border-radius:999px;padding:.55em 1.4em}
.panel{border-radius:220px 220px 60px 220px}
.foot{border-radius:120px 120px 0 0}
.pod{border-radius:46% 46% 42% 42% / 40% 40% 38% 38%} /* 頭盔／吹風罩形 */
```

### ② 同心色環：暖色階、硬停、零平滑漸層
色環一律用**硬停**（相鄰色標同位置），順序永遠是同一條暖色階：莓紫→洋紅→朱→橘→琥珀→（回頭）。大面積的環用多個圓盤疊（可個別動），小面積用 `repeating-radial-gradient`。

```css
:root{--ring:repeating-radial-gradient(circle at var(--cx,50%) var(--cy,50%),
 #5C1043 0 22px,#B5174F 22px 44px,#E8432A 44px 66px,#FF7F1F 66px 88px,
 #FFB52E 88px 110px,#FF7F1F 110px 132px,#E8432A 132px 154px,#B5174F 154px 176px)}
.rings{background:var(--ring)}
.addr{background:var(--ring);--cx:20%;--cy:120%} /* 圓心可放到元素外，只露出弧 */
```

### ③ 寬體大寫 Latin＋拉寬的粗黑中文
Latin 一律 **Michroma**（Vernon Adams 依 Microgramma／Eurostile Extended 重繪的 OFL 字型）全大寫、字距 .08–.24em；中文 **Noto Sans TC 900**，以 `scaleX(1.16–1.18)` 拉寬去對齊寬體的氣質。不用襯線、不用等寬、不用手寫。

```css
.lat{font-family:"Michroma","Noto Sans TC",sans-serif;text-transform:uppercase;letter-spacing:.08em}
h1 .wide,h2 .wide{display:inline-block;transform:scaleX(1.16);transform-origin:left center;font-weight:900}
```

### ④ 射出成型光澤：一塊銳利高光＋一道下緣暗弧
每個圓形或膠囊物件只有**一塊**奶白（或純白）橢圓高光，左上、旋轉 −14° 到 −35°，**零模糊**；下緣一道不模糊的暗弧。高光可跟著游標滑動（像轉動一顆塑料球）。禁止 `blur()`、`box-shadow` 的模糊半徑、發光。

```css
.gl{position:relative;overflow:hidden;isolation:isolate}
.gl::before{content:"";position:absolute;z-index:-1;left:calc(var(--gx,22%) - 16%);top:calc(var(--gy,18%) - 14%);
 width:32%;height:30%;border-radius:50%;background:#FFF0DC;transform:rotate(-14deg)}
.gl::after{content:"";position:absolute;z-index:-1;left:8%;right:8%;bottom:-38%;height:60%;border-radius:50%;
 box-shadow:inset 0 -5px 0 rgba(26,6,20,.28)}
```
```svg
<circle cx="110" cy="120" r="62" fill="#FFF0DC" stroke="#1A0614" stroke-width="5"/>
<ellipse cx="80" cy="86" rx="15" ry="8" fill="#FFFFFF" transform="rotate(-35 80 86)"/>
```

### ⑤ 舷窗與軌道母題
主角永遠在一扇**舷窗**裡（奶白粗框＋墨色內唇），周圍有 1.5px 奶白的**橢圓軌道**與沿軌道走的小衛星；球椅、吹風罩、圓盤耳環、頭盔形容器是本風格的物件詞彙。

```css
.porthole{border-radius:50%;background:#FFF0DC;box-shadow:0 0 0 12px #FFF0DC,0 0 0 18px #1A0614,inset 0 0 0 6px #1A0614}
.track{border-radius:50%;border:1.5px solid #FFF0DC}
@keyframes sat{from{transform:scaleY(.25) rotate(0) translateX(147px) rotate(0) scaleY(4)}
 to{transform:scaleY(.25) rotate(360deg) translateX(147px) rotate(-360deg) scaleY(4)}} /* 橢圓軌道公轉 */
```

## 色彩系統

| 名 | hex | 用途 | 比例 |
|---|---|---|---|
| 茄底 aubergine | `#2A0A22` | 頁面地、隧道最外圈 | ~38% |
| 莓紫 plum | `#5C1043` | 膠囊底、外環 | ~14% |
| 洋紅 magenta | `#B5174F` | 環、hover、強調 | ~10% |
| 朱 vermilion | `#E8432A` | 環、主按鈕、洋裝 | ~10% |
| 橘 orange | `#FF7F1F` | 環 | ~7% |
| 琥珀 amber | `#FFB52E` | 環最亮處、現用頁、命中、價目 | ~8% |
| 奶白 plastic cream | `#FFF0DC` | 舷窗、高光、正文 | ~10% |
| 墨 ink | `#1A0614` | 字底膠囊、舷窗內唇、頭髮 | ~3% |

規則：**沒有冷色**（藍、綠、灰都不進場；唯一例外是營業中的小綠點）。環的順序不可打亂；同一畫面不出現兩條方向相反的色階。

## 字體系統

- Google Fonts：`Michroma`（400）、`Noto Sans TC`（500／700／900）。
- Scale：h1 `clamp(34px,6.4vw,88px)`／h2 `clamp(30px,4.6vw,58px)`／lead 17px／內文 15px／標籤 10–13px。
- 行高：標題 1.05–1.15，內文 1.7。Latin 標籤字距 .16–.24em。
- 中文標題一律 900＋`scaleX(1.16)`；正文 500。

## 版面與網格

- 開場＝一條**同心色環隧道**（6 層圓盤，尺寸是舷窗的 5.2／4.2／3.4／2.75／2.2／1.72 倍），舷窗置中；標題放進左下一顆墨色大膠囊，行動按鈕在右下排成一列膠囊。
- 內容區：兩欄不對稱（1fr : 1.25fr），列表一律是**橫向膠囊列**，每列以 `margin-left:calc(var(--o)*1px)` 沿弧線錯位（0 → 34 → 58 → 34 → 0），像沿著圓走。
- 沒有直角網格線、沒有表格框線；分隔靠色塊。
- ≤560px：舷窗 74vw、導覽收成底部一條墨色膠囊、膠囊列改 40–60px 圓角。

## 元件配方

- **導覽（衛星軌道）**：右上 330×118 容器；1.5px 奶白橢圓軌道＋中央 logo hub；三個膠囊用 CSS `cos()`／`sin()` 放在軌道上，現用頁在 90°（正前方、琥珀底、放大 1.12），其餘在 210°、330°。`translate:calc(-50% + cos(var(--a))*147px) calc(-50% + sin(var(--a))*37px)`。
- **按鈕**：`.pill.hot`（朱底奶白字）、`.pill.solid`（琥珀底墨字）、`.pill.line`（2px 奶白內框）；全部加 `.gl` 光澤。
- **價目列**：膠囊列，底色依序琥珀／橘／朱／洋紅／奶白／莓紫循環，右端一顆 96px 墨色圓放價格。
- **表單**：radio 做成膠囊（日期做成 74px 圓），選中＝琥珀底＋scale 1.04；輸入框 999px 圓角奶白底。
- **票證**：大膠囊，左端一顆圓形存根（號碼印在墨色圓心）。
- **頁尾**：墨色、頂緣 120px 大圓角、連結是 `.pill.line`。

## 動效規則

| 種類 | 實作 | 觸發 | duration／easing |
|---|---|---|---|
| ambient | 色環圓盤呼吸 `scale 1→1.04` 錯相；環形字自轉；衛星公轉 | 載入即開始 | 3.4s ease-in-out alternate、delay −.45s×i；80s linear；9s linear |
| input | 色環視差：每層 `translate = 游標偏移 × f`（f 由外 .02 到內 .11）；光澤高光追游標；頭追游標 | pointermove | 即時（<16ms） |
| transition | 舷窗光圈換頁：`clip-path: circle()` 由點擊處長到蓋滿 → 換頁 → 由中心縮回 | 點內部連結 | 480ms `cubic-bezier(.7,0,.3,1)`；560ms `cubic-bezier(.6,0,.2,1)` |
| signature | 彈簧鮑伯：兩個阻尼彈簧 θ''=−58θ−4.6θ'−0.05a、θ₂''=−90θ₂−6θ₂'−0.03a 驅動髮束偏移 κ·d | 頭部加速度、每一刀的衝量 | 連續（rAF） |

hover 的放大一律用回彈 `cubic-bezier(.3,1.6,.5,1)`（塑料的彈性）。`prefers-reduced-motion`：圓盤與環形字停止、彈簧角固定為 0、換頁直接切、所有資訊不變。

### motion-library 元件表（PLAYBOOK §2.8）

出處：`wenxiangxiao/motion-library` 1.23.2 @20fae83；參數說明見 `MotionLib.prompt(id)`。全部只用本站色票；以 `GT.ml()` 包裝掛載（等字型、離屏 destroy、一次性元件 loop:false、canvas aria-hidden、`.ml-fb` 保留 HTML 標題）。

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| BG-B-36 | Minimal Arcs | index | primary `#FF7F1F`・secondary `#B5174F`・bg `#5C1043`・duration 9・density 1.4・intensity 1.2・seed 1969・1:1 | 吹風罩舷窗的底：只有同心半弧與圓頭線帽，零尖角零發光，就是會轉的 Panton 環（ambient） |
| TXT-B-16 | Circle Text | index | text「球椅吹風罩 HOOD」・primary `#FFB52E`・secondary `#E8432A`・bg `#2A0A22`・2.2s・loop false・16:9 | 標題先繞成一個圓再攤平：字也走軌道（transition，一次） |
| SHP-34 | Circle Draw | cut | primary `#FFB52E`・secondary `#E8432A`・bg `#2A0A22`・1.6s・loop false・1:1 | 交卷時在分數外畫一圈：剪完一顆頭＝圓滿（transition） |
| TXT-A-22 | Orbit | book | text「預約 BOOK」・primary `#FFB52E`・secondary `#E8432A`・bg `#2A0A22`・2s・loop false・16:9 | 字沿橢圓軌道繞一圈落定，對應導覽的衛星軌道（transition） |
| BG-A-09 | Polar Grid | book | primary `#FFB52E`・secondary `#E8432A`・bg `#5C1043`・8s・density 1.2・seed 721・1:1 | 登艙證圓形存根的底：極座標同心圓＝舷窗裡看出去的雷達（ambient） |

不選的：帶 `rr()` 方角的 SHP-11、有漸層描邊的 SHP-38 Spirograph、會出現三角方塊的 BG-B-28——違反特徵①②。

## 插畫與圖像風格

**射出成型光澤組件 molded-gloss-kit**：所有圖由圓、橢圓、膠囊組成，平塗、1 塊白高光、必要時 5px 墨色外框。人物是 1960s mod 造型：幾何鮑伯、粗眼線＋下睫毛三筆、朱紅小唇、圓盤耳環、圓領洋裝。物件：球椅吹風罩（球殼＋內襯＋墨色底座）、頭盔、舷窗、衛星。零照片、零紋理、零透視消失點。

模特兒的頭髮是 Canvas 2D：72 根後髮＋24 根瀏海，每根有根部（頭蓋橢圓上）與長度；輪廓＝頭蓋弧＋所有髮尾連線，平塗；頭頂一道銳利高光弧。

## Logo 與 Favicon 設計指南

- Logo：五層同心色環（莓紫→洋紅→朱→橘→琥珀）＋奶白舷窗＋墨色內唇，舷窗裡一顆鮑伯頭，瀏海與兩鬢上各一個琥珀點（五點）。
- Favicon：同構簡化成四層環＋鮑伯剪影，inline SVG data URI。
- 字標：中文「五點剪髮室」900＋Latin「GOO-TIÁM」Michroma，放在奶白膠囊裡。

## Do & Don't

- Do：讓主角坐在舷窗裡；讓色環由外而內變亮；讓每個圓有一塊高光；讓列表沿弧線錯位。
- Do：hover 用回彈；動的東西是「轉」「繞」「甩」，不是「淡入」。
- Don't：直角卡片、細框線表格、冷色、灰色漸層、`blur()`、發光、玻璃擬態的毛玻璃。
- Don't：把同心環做成平滑漸層（那是 Y2K／Vaporwave）；把字做成 Orbitron 式的科幻字（那是 1990s）。
- 去AI化禁令：禁紫藍漸層 hero、置中三卡片、emoji icon、Lorem ipsum、EST. 徽章。

## 頁面骨架範例

```html
<section class="tunnel" style="--P:min(46vmin,430px)">
  <div class="disc" style="--s:5.2;--i:0;background:#5C1043" data-f=".02"></div>
  <div class="disc" style="--s:4.2;--i:1;background:#B5174F" data-f=".035"></div>
  <div class="disc" style="--s:3.4;--i:2;background:#E8432A" data-f=".05"></div>
  <div class="disc" style="--s:2.75;--i:3;background:#FF7F1F" data-f=".065"></div>
  <div class="disc" style="--s:2.2;--i:4;background:#FFB52E" data-f=".08"></div>
  <div class="hole porthole"><canvas id="hero"></canvas></div>
  <div class="hero-title"><h1><span class="wide">品牌名</span></h1><p class="lat">BRAND · SINCE 1969</p></div>
  <div class="hero-side"><a class="pill hot gl" href="#">主要行動 →</a></div>
</section>
<ul class="menu">
  <li style="--o:0"><span class="n">項目<small class="lat">ITEM</small></span><span class="d">說明</span><span class="p">1,680</span></li>
</ul>
```
```css
.disc{position:absolute;left:50%;top:50%;width:calc(var(--P)*var(--s));aspect-ratio:1;
 margin:calc(var(--P)*var(--s)/-2) 0 0 calc(var(--P)*var(--s)/-2);border-radius:50%;
 animation:breathe 3.4s ease-in-out infinite alternate;animation-delay:calc(var(--i)*-.45s)}
@keyframes breathe{from{scale:1}to{scale:1.04}}
```
```js
tunnel.addEventListener('pointermove',e=>{const b=tunnel.getBoundingClientRect(),dx=e.clientX-b.left-b.width/2,dy=e.clientY-b.top-b.height/2;
 discs.forEach(d=>d.style.translate=`${dx*d.dataset.f}px ${dy*d.dataset.f}px`);},{passive:true});
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況與查證 | fallback |
|---|---|---|---|---|
| `repeating-radial-gradient` 硬停色環＋多層圓盤（`translate`／`scale` 個別屬性） | A 渲染 | 特徵②、開場隧道、ambient 與 input | MDN〈repeating-radial-gradient()〉標示 Baseline Widely available（MDN 快取頁：2015-07 起跨瀏覽器）；caniuse〈CSS Repeating Gradients〉全綠；個別 transform 屬性 `translate`／`scale` 為 Baseline 2022 | 不支援時退成單色底（`background` 先寫純色）；圓盤不動 |
| rAF 阻尼彈簧積分（半隱式 Euler，dt 上限 50ms） | B 動效 | signature 彈簧鮑伯、每一刀的衝量 | 純 JS，無相容性問題；node 原型實測 300 步 0.41ms，5 秒內收斂到 2.8e-8 | reduced-motion：θ 固定 0；離屏以 IntersectionObserver 暫停 |
| Web Audio：白噪 `AudioBufferSourceNode`→`BiquadFilterNode` 帶通（剪刀聲兩響）＋`OscillatorNode` 和弦（交卷） | D 輸入感測 | func 的回饋 | MDN〈BaseAudioContext〉Baseline Widely available（2021-04）；〈BiquadFilterNode〉Baseline Widely available；只在第一次 pointerdown 後建立 AudioContext | 無 AudioContext 時靜音；另有「剪刀聲：關」 |
| 附：CSS `cos()`／`sin()` | C 版面 | 衛星軌道導覽的定位 | Baseline 2023 | ≤560px 改為一般 flex 膠囊列 |

**效能實測**（headless Chromium，無 GPU 軟體繪製，1280×800）：

- 單頁大小：index 265.5KB、cut 259.4KB、book 259.7KB（含 motion-library 子集 ~221KB）——皆 ≤350KB。
- 載入期 JS（CDP `ScriptDuration`）：index 56.5ms、cut 21.0ms、book 69.3ms——皆 ≤100ms。
- 彈簧頭每幀 step＋draw：0.03–0.11ms（剪髮台大畫布 0.34ms）。
- 幀率：reduced-motion 下 59–60fps；全動效在**無 GPU 的軟體繪製**環境 22–37fps，瓶頸是 6 層 2000px 級圓盤的 `scale` 重繪與 ML 畫布——在有 GPU 合成的瀏覽器中這些是合成層，不經主執行緒。若目標裝置弱，先把圓盤減到 4 層、ML 改 `seek(.35)` 停格。

查證來源：MDN〈repeating-radial-gradient()〉、caniuse〈css-repeating-gradients〉、MDN〈BaseAudioContext〉、MDN〈BiquadFilterNode〉、Fontsource〈Michroma〉（Vernon Adams，依 Eurostile Extended／Microgramma）、Wikipedia〈Eurostile〉〈Microgramma〉、domus〈Visiona 1970〉、Vitra〈Panton Fantasy Landscape〉。
