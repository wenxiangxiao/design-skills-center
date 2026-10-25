---
name: chicha-dayglo-poster
description: Peruvian chicha poster style — hand-lettered rounded block letters stretched edge to edge, one fluorescent two-ink squeegee gradient per line, stacked horror-vacui bands on black paper, pasted ten-up on a wall.
---

# Chicha 螢光海報 Cartel Chicha（利馬・1980s– ）

> 範例站：`sites/tian-kong`（電光三太子團，高雄鳳山的電音三太子陣頭）。本文件可單獨使用——不看 Demo，只讀這份就能做出同風格的新網站。

## 0. 本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是 chicha 海報，只是「暗底螢光字」。

### ① 黑紙地＋五罐螢光墨，零灰零白零透明

chicha 海報是在黑紙上絹印螢光墨（也有反過來：螢光紙上印黑字）。黑占畫面 ≥50%；墨只有五罐：粉、黃、橘、綠、天藍。沒有灰、沒有白、沒有半透明；淺一點的顏色＝換一罐墨，不是降 opacity。零發光（它是印刷品，不是霓虹管）。

```css
:root{--ink:#0B0B0D;--pk:#FF2E97;--ye:#F5F500;--or:#FF6B1A;--gr:#2BF57A;--bl:#2EC7FF}
body{background:var(--ink)}               /* 永遠是黑紙 */
/* 禁止：opacity<1 的字、box-shadow 模糊、text-shadow 發光、#FFF、任何灰 */
```

### ② 每一行撐滿版寬＋圓頭粗字

每一行字都被手繪師傅「撐」到左右版緣——字級不是設計出來的，是那一行字數決定的。字形粗壯、轉角圓（Monky 的 playfully rounded letterforms）。網頁上：拉丁字用可變字型 `wdth` 軸＋量寬換算字級；中文沒有 wdth 軸，用平體／長體（每格寬 f·1em、字身 scaleX(f)）。圓頭由 SVG 濾鏡做：模糊後把 alpha 拉回硬邊，凸角就被磨圓。

```html
<svg width="0" height="0" style="position:absolute"><filter id="goo" x="-3%" y="-35%" width="106%" height="170%" color-interpolation-filters="sRGB">
 <feGaussianBlur stdDeviation="1.6"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 -6.4"/></filter></svg>
<style>
.row{display:block;white-space:nowrap;line-height:.94;text-align:center;font-weight:900;filter:url(#goo)}
.row.lat{font-family:"Anybody",sans-serif;text-transform:uppercase}
.g{display:inline-block;width:calc(var(--f,1)*1em)} .g>b{display:inline-block;transform:scaleX(var(--f,1))}
</style>
<script>/* 拉丁：100px 量一次，再等比換字級 */
function fitLat(row){row.style.fontSize='100px';const m=row.firstElementChild.getBoundingClientRect().width;row.style.fontSize=(100*row.clientWidth/m*.995)+'px';}
/* 中文：總寬 = Σf·fs，直接算 */
function fitCjk(row,fs=[]){const S=fs.reduce((a,b)=>a+b,0);row.style.fontSize=(row.clientWidth/S*.995)+'px';}</script>
```

字級 >84px 改用 σ=4 的濾鏡（`#goo-l`），<40px 關掉濾鏡（細筆畫會被磨掉）。

### ③ 一行一色組，行內是刮刀漸層（degradé）

把兩罐墨並排倒在網框裡，刮刀一拉就是一條漸層——所以漸層**只沿刮刀方向（由上往下）**、只有兩色、而且兩色都是螢光。相鄰兩行不得同色組。

```css
.d1{--a:#F5F500;--b:#FF6B1A}.d2{--a:#FF2E97;--b:#FF6B1A}.d3{--a:#2BF57A;--b:#F5F500}
.d4{--a:#2EC7FF;--b:#2BF57A}.d5{--a:#FF2E97;--b:#F5F500}.d6{--a:#2EC7FF;--b:#FF2E97}
.ink{background:linear-gradient(180deg,var(--a) 8%,var(--b) 92%);-webkit-background-clip:text;background-clip:text;color:transparent}
/* 禁止：水平或斜向漸層、三色以上漸層、螢光漸到黑 */
```

### ④ 橫帶堆疊，horror vacui

海報＝一條條橫帶由上往下堆：喊聲（¡HOY! / ¡Kim-àm!）→ 團名（最大）→ 內容行 → 日期地點 → 價錢。帶與帶之間只有一條 3px 螢光細線或黑縫；置中、對稱、零留白。網頁的區塊分隔也一律用 3px 螢光實線，不用卡片、不用圓角、不用陰影。

```css
.poster{background:var(--ink);padding:clamp(14px,2.4vw,30px)}
.rule{height:3px;margin:.45em 0;background:var(--pk)}   /* 另有 --gr --bl --ye --or 版 */
section+section{border-top:3px solid var(--gr)}
```

### ⑤ 同一張連貼成一面牆

chicha 海報是夜裡貼在街上的：同一張連貼十張、彼此壓疊、新的一層蓋在舊的上面，天亮清潔隊撕掉再貼。網站上至少要有一處「牆」：同一張海報重複排列、微旋轉、撕角、漿糊皺。

```html
<filter id="paste"><feTurbulence type="fractalNoise" baseFrequency=".011 .019" numOctaves="2" seed="7"/>
 <feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
<style>
.wall{display:grid;grid-template-columns:repeat(5,1fr);padding:10px}
.bill{margin:-4px;aspect-ratio:3/4;filter:url(#paste);clip-path:polygon(0 3%,40% 0,100% 0,100% 100%,0 100%);transform:rotate(-.6deg)}
.bill.fresh{animation:slap .5s steps(5) both}@keyframes slap{from{clip-path:inset(0 0 100% 0)}}
</style>
```

## 1. 設計哲學

1960–70 年代安地斯山區移民大量湧入利馬，把 huayno 和電吉他、cumbia 混成 chicha 音樂（Los Shapis、Chacalón）。1980 年代為了宣傳舞會，Pedro「Monky」Rojas Meza 等人用絹印在黑紙上刷螢光墨、手畫圓胖字，一晚刷幾百張、趁夜貼滿整條街，早上被市府清掉再貼——所以海報越做越大、越亮、資訊越塞越滿。顏色來自 Huanca（萬卡約）huaylarsh 舞服的刺繡色。它曾被叫作 huachafo（俗氣），2010 年代末由 Elliot Túpac 等新一代翻轉成「cholo power」的自我認同。

所以這個風格的三條理由是物理的：**黑紙＝在沒有路燈的街上也看得見；螢光墨＝便宜又最亮；每行撐滿＝在一張紙上塞進最多資訊。**做網站時任何一個決定都回到這三句話。

## 2. 色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 黑紙 Negro | `#0B0B0D` | 唯一的地、按鈕上的字 | ≥50% |
| 螢光粉 Rosado | `#FF2E97` | 喊聲、主按鈕、分隔線 | ~12% |
| 螢光黃 Amarillo | `#F5F500` | 內文、帶狀底、按鈕 | ~14% |
| 螢光橘 Naranja | `#FF6B1A` | 只當漸層下半與錯誤訊息 | ~6% |
| 螢光綠 Verde | `#2BF57A` | 次要內文、分隔線、成功狀態 | ~10% |
| 螢光天藍 Celeste | `#2EC7FF` | 連結、聚焦框、第三層資訊 | ~8% |

規則：漸層色組只用 d1–d6 六組；內文單色（黃或綠）；同一畫面相鄰兩行不同組；零灰、零白、零透明、零發光。

## 3. 字體系統

- **拉丁展示字**：Anybody（Etcetera Type，Google Fonts，可變軸 `wdth`＋`wght`），900，全大寫。**一律透過撐滿求解器決定字級**，不寫死 px。
- **中文展示字**：Noto Sans TC 900，平體／長體由求解器算（f 0.62–1.42）。
- **內文**：Noto Sans TC 700，14–17px，行高 1.6；不用細字。
- **motion-library 文字元件**：元件庫內建字族為 `"Unbounded","Noto Sans TC"`——Unbounded 800 是寬圓的展示字，與 chicha 字感相容，所以一併載入。
- 字級 scale 不存在——展示字的字級是「這行有幾個字」的結果。只有兩條上限：`data-max`（一行最大字級）與 <40px 關圓頭濾鏡。
- 字距 0。不加 letter-spacing 去「撐」，撐要靠字寬。

```html
<link href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,400..900&family=Noto+Sans+TC:wght@700;900&family=Unbounded:wght@800&display=swap" rel="stylesheet">
```

## 4. 版面與網格

- 全站零旋轉（只有牆上的海報 ±0.8°）。
- 版面是「海報欄」：桌機首屏 1.75fr（主海報）＋1fr（副海報），≤980px 疊成一欄。所有區塊都是 `.poster`（黑地＋內距）並以 3px 螢光實線分隔。
- 留白規則：**沒有留白**。區塊內距 clamp(14px,2.4vw,30px)，區塊之間 0 間距、只有線。
- 卡片式並列（五尊、方案）改成「等寬直欄＋3px 豎線」，像一張被分欄的海報，不是浮起的卡。
- RWD：≤560px 每行仍撐滿（字級自然變小），導覽三格各占 1/3；牆改 3 欄。

## 5. 元件配方

- **導覽「寬拍」wide-beat**：三格外框 3px、各一罐墨色；非現用頁 `wdth 50`（窄體＝休止），現用頁 `wdth 150`＋滿底色（寬體＝正拍），hover `wdth 105`，`steps(3)` 過渡。
```css
nav.beat a{border:3px solid currentColor;font-variation-settings:'wdth' 50;transition:font-variation-settings .12s steps(3)}
nav.beat a:hover{font-variation-settings:'wdth' 105}
nav.beat a[aria-current=page]{font-variation-settings:'wdth' 150;background:currentColor}
nav.beat a[aria-current=page] span{color:#0B0B0D}
```
- **按鈕**：螢光平色塊＋黑字，零圓角零陰影，hover 時字寬 80→140（像被刮刀擠開）。外框版用 `box-shadow:inset 0 0 0 3px`（硬邊，不是模糊）。
- **表單**：黑地輸入框、3px 黃色內框、聚焦換粉；選項是「色框格」，選中時整格塗滿墨色、字變黑。
- **footer**：3px 綠線開頭，三欄小字，最後一行粉色虛構聲明。
- **營業狀態**：實心圓點（粉＝休、綠＝開）＋一句話。

## 6. 動效規則

全站動效都是「印刷的節奏」：`steps()` 為主，少用平滑 ease；零淡入。

| 種類 | 本站實作 | 觸發 | 時間 |
|---|---|---|---|
| ambient | 海報牆每 6.5 秒有一張被新的一層「拍」上去（clip-path 由上往下 steps(5)） | 真實時間（離屏暫停） | 500ms |
| input | 拉丁行魚眼：游標掃過的字母 wdth 往 150 推、其他回原值，整行即時重新撐滿 | pointermove（rAF 一幀內） | <16ms |
| transition | 貼覆 paste-over：五條漸層帶由左長出、整張黑紙由上往下刮下來蓋住舊頁；到站後由下往上撕走 | 站內連結 | 340ms＋420ms，steps(6/7) |
| signature | **字寬脈動**：鼓打到的那一拍，該格字 f 瞬間 +0.95、同行其他字被等比擠窄，總寬不變（字級不跳），每 1/30 秒衰減 ×0.55 | Web Audio 時鐘排定的拍點 | 約 6 格 |

降低動態（`prefers-reduced-motion`）：牆不再換貼、轉場關閉、魚眼仍即時但無過渡；字寬脈動改為「當拍那一格換成單色黑底字」＋拍格指示條離散跳格——節奏資訊零損失。

### motion-library 元件（motion-library 1.17.2 @3df0c80，`tools/ml-embed.js` 子集 inline 為每頁第一個 `<script>`）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 類別 |
|---|---|---|---|---|---|
| TXT-A-06 | Stretch Pop | 出陣 index | text「五尊出陣」、colors {primary #0B0B0D, secondary #FF2E97, bg #F5F500}、duration 1.4、loop false、seed 2003、16:9 裁成橫帶 | 字從 0.2 寬被「撐」到滿——就是特徵②的動態版；黃底讓元件自動選近黑字，等於「螢光紙印黑字」的反向 chicha | transition（一次性） |
| TXT-B-25 | Karaoke Ball | 編鼓 pai | text「編一段起鼓」、colors {#0B0B0D, #2EC7FF, bg #FF2E97}、duration 2.2、loop false、seed 5 | 點歌機的跳球一拍一字落下——預告這頁「一個字＝一拍」的規則；粉底→黑字、天藍球 | transition（一次性） |
| BG-A-27 | Sound Wave | 編鼓 pai | colors {#F5F500, #FF2E97, bg #0B0B0D}、duration 6、density 1.1、intensity .9、seed 128 | 圓頭音柱＋上下兩色的刮刀式漸層，當作鼓陣的喇叭；圓角與漸層方向都符合特徵②③ | ambient |
| BG-B-18 | Horizontal Lines | 請陣 tsut-tin | colors {#FF2E97, #F5F500, bg #0B0B0D}、duration 8、density 1、seed 26 | 粉與黃的橫帶一條條往下走——特徵④「橫帶堆疊」的骨架本身 | ambient |
| SHP-20 | Confetti Burst | 請陣 tsut-tin | colors {#FF2E97, #2BF57A, bg #0B0B0D}、duration 1.6、manual（送出請陣單時才掛）、seed 9 | 舞會的彩紙，只在請陣單送出那一刻炸一次，播完即 destroy | transition（回饋） |

挑選紀錄：排除所有帶 `shadowBlur` 的元件（違反特徵①零發光）；文字元件一律放在螢光底上，讓元件自動選近黑字。開發 Prompt 出處：`MotionLib.prompt('<ID>')`。掛載包裝照 `sites/ka-to` 的 `KT.ml`：等 `document.fonts.ready`、離屏 `destroy()`、一次性 `loop:false` 播一次後 `seek(1)`、canvas `aria-hidden`、容器保留 `.ml-fb` 原 HTML 標題、降低動態時背景 `seek(.35)`／文字 `seek(1)`。

## 7. 插畫與圖像風格

- **零圖檔**。插畫只有兩種：圓頭撐滿字（本身就是圖），以及**螢光平塗剪影**——圓、圓角矩形、粗圓頭線，每個形一色或一組刮刀漸層，黑色只用來挖洞（墨鏡、嘴）。
- 角色正面、對稱、頭大身小（陣頭大頭偶本來就是這個比例）。
- 禁止：細線描、陰影、立體感、寫實比例。

## 8. Logo 與 Favicon

- 標誌＝大頭剪影（兩個髮髻圓＋漸層臉＋黑墨鏡＋粉腮紅）置於黑方塊；字標以圓頭粗筆畫畫成 TIAN，下方一條「寬窄交替」的螢光條碼＝一段鼓譜。
- Favicon 用同一個大頭（inline SVG data URI），16px 下仍看得出墨鏡。

## 9. Do & Don't

**Do**：每行撐滿；一行一組漸層；黑占一半以上；用 3px 線分區；讓字寬承載狀態（現用頁＝寬體）；同一張連貼成牆。

**Don't**：霓虹發光（那是港式霓虹，不是 chicha）；白字；灰色說明文字；圓角卡片＋模糊陰影；紫藍漸層 hero；置中大標＋兩顆按鈕＋三張卡；emoji icon；Lorem ipsum；「EST. 19xx」徽章；水平漸層；用 letter-spacing 撐行；字級寫死。

## 10. 頁面骨架範例

```html
<header class="top"><a class="brand" href="index.html">…</a>
 <nav class="beat"><a href="index.html" aria-current="page"><span>SALIDA</span><small>出陣</small></a><a href="pai.html"><span>KHÍ-KÓO</span><small>編鼓</small></a></nav></header>
<main>
 <section class="poster">
  <p class="row lat d1" data-t="¡Kim-àm tshut-tīn!" data-w="120"></p>
  <div class="rule r1"></div>
  <p class="row cjk d2" data-t="電光三太子今夜出陣鳳山大東路口！"></p>
  <p class="row cjk d3" data-t="每週六晚七點半大東文化藝術中心前"></p>
  <div class="rule r3"></div>
  <p class="row lat d6" data-t="Tiān-kong Sam-thài-tsú" data-w="95"></p>
 </section>
 <section class="wall">…同一張 .bill ×10…</section>
</main>
<footer class="foot">…</footer>
```

## 11. 技術實作與相容性

**(a) API 現況與查證（2026-10-25）**

- `font-variation-settings`（CSS 屬性）：MDN 標為 Baseline Widely available（2018-09 起）。注意 `@font-face` 描述子版與 `FontFace.variationSettings` JS API 並非 Baseline——本站只用 CSS 屬性。來源：MDN〈font-variation-settings〉、caniuse〈mdn-css_at-rules_font-face_font-variation-settings〉。
- Anybody 字型：Fontsource 套件說明列 Axes `[wdth,wght]`（Etcetera Type, OFL）。wdth 範圍以 Google Fonts CSS2 API 請求 `50..150`；求解器不假設範圍，**每次都實際量寬**，所以即使軸範圍不同也只會影響寬窄對比，不會破版。
- SVG 濾鏡 `feGaussianBlur`＋`feColorMatrix`（alpha 閾值「gooey」配方，Codrops〈Creative Gooey Effects〉2015）、`feTurbulence`＋`feDisplacementMap`：SVG 1.1 濾鏡原語，所有現行瀏覽器支援；以 CSS `filter:url(#id)` 套在 HTML 元素上。
- Web Audio `AudioContext`：MDN Baseline Widely available（2021-04）。僅在使用者按「起鼓」或點字時建立，符合自動播放政策；lookahead 排程（25ms 計時器、排 120ms 內的拍）把音與畫面都掛在 `ctx.currentTime` 上。
- `:has()`（請陣單選中格塗滿）：Chrome 105、Safari 15.4、Firefox 121。
- Web Animations `Element.animate`（轉場與出陣單刮出）。

**(b) fallback 具體行為**

- 無 JS：每一行以原始文字顯示（可換行、字級 clamp、單色墨），濾鏡關閉；編鼓頁顯示電話；motion-library 容器內的 HTML 標題照常可見。
- 無 Web Audio：鼓機改用 `performance.now()` 只跑畫面——字寬脈動照跳，只是沒聲音。
- 無 ResizeObserver：改聽 `resize` 重新撐滿。
- 無 `:has()`：方案格選中時不塗滿，但 radio 本身仍可選、價格照算。
- 無 canvas：`TK.ml` 直接回傳 null，HTML 標題留著。

**(c) 效能實測**

- 三頁檔案大小：index 約 228KB、pai 約 226KB、tsut-tin 約 225KB（其中 motion-library 子集 187.5KB），皆 ≤350KB。
- 撐滿求解器：中文行為純算術（不量 DOM）；拉丁行每行一次量寬。jsdom 中三頁初始化（含建 64 個拍格、10 張牆、5 尊剪影）無錯誤；真機首屏 JS 預算以「不在載入時量中文行」與「字型就緒才量一次」控制。
- 字寬脈動每 1/30 秒只改有脈動的那幾行的 `--f`；同一畫面同時運轉的 motion-library 元件 ≤2。
- 牆的換貼離屏與分頁隱藏時停止。
