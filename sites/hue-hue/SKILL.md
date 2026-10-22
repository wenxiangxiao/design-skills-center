---
name: petrykivka-decorative-painting
description: Ukrainian Petrykivka folk decorative painting — every leaf and petal is one pressure-shaped brush stroke (comb, seed, nut, two-colour transitional), painted straight onto a limewashed white wall with no outline and no underdrawing, organised as kvity pot-bouquets and bihuntsi runners along door and window frames, with fingertip-dotted berries.
---

# Petrykivka 裝飾畫 Петриківський розпис — 風格規格書

> 範例站：`sites/hue-hue`（花灰行，彰化王功的蚵殼灰粉刷行）。本文件與產業無關：照著做，任何網站都會長成 Petrykivka。

## 設計哲學

Petrykivka（彼得里夫卡）是烏克蘭第聶伯河畔、今第聶伯羅附近的一個村子。十九世紀起，村裡的人在**剛刷白的灶、正牆、門框與窗框**上畫花；需求變大後，畫師把同樣的花畫在紙上拿去市集賣，叫 **мальовки**，買回家貼在牆上。1936 年村裡設立了專門的畫藝學校；2013 年列入 UNESCO 人類非物質文化遺產代表作名錄。

它長成這樣，有三個製作上的原因：

1. **畫在白灰牆上**：底色就是石灰水刷過的白牆。顏料是白堊、本地黏土、煤灰與植物色，用蛋黃、牛奶或櫻桃樹膠調和——所以顏色是**不透明、霧面、飽和**的，沒有亮光與陰影。
2. **貓毛筆、不打草稿**：畫師直接下筆。整張畫只由**四種筆觸**組成——形狀就是筆壓的軌跡，所以**沒有輪廓線**，每片葉、每片瓣都是「一筆」。
3. **兩種構圖**：**квіти（kvity，盆花／花束）**——一個盆、一條中軸莖往上長、頂上一朵大花；**бігунці（bihuntsi，花帶／帶飾）**——一條波浪莖沿門框、窗框、牆腳走，每個波峰一朵花。

網頁上要做到的是：**白灰當紙；所有圖都是一筆一筆長出來的；花框住內容，而不是框線框住內容。**

## 本風格的 5 個不可省略特徵

### 1. 形狀＝筆壓：四筆，零輪廓（形狀語彙）

拿掉它就變成一般的扁平花卉插畫。每一個圖形都必須是「中心線＋寬度曲線」生成的單筆外輪廓，不准用 `stroke`、不准描邊、不准畫填色多邊形假裝成葉子。四種筆（Encyclopedia of Ukraine 的定義）：

| 筆 | 烏克蘭名 | 寬度曲線 w(t)（t：0＝落筆，1＝收筆） | 用途 |
|---|---|---|---|
| 梳筆 | гребінчик hrebinchyk | 落筆即滿，收成一縷：`(1-t)^1.25` | 圓瓣、草、一排並列成「梳」 |
| 籽筆 | зернятко zerniatko | 輕落、越走越重、圓頭收：`sin(t·π/2)^1.7` | 鋸齒邊的葉 |
| 核筆 | горішок horishok | 梳筆的短版：圓肚、短尾 | 花蕊、花苞 |
| 雙色過渡筆 | перехідний мазок | 形同梳筆，一筆內由 A 色轉 B 色 | 花瓣明暗 |

```js
// 中心線 S（等弧長取樣）＋寬度 w(t) → 一筆的外輪廓（筆尖與筆根以半圓收）
function outline(S, W, prof){ const L=[],R=[];
  S.forEach((p,i)=>{ const a=S[Math.max(0,i-1)], b=S[Math.min(S.length-1,i+1)];
    const h=Math.hypot(b[0]-a[0],b[1]-a[1])||1, nx=-(b[1]-a[1])/h, ny=(b[0]-a[0])/h;
    const w=Math.max(.25, prof(i/(S.length-1))*W/2);
    L.push([p[0]+nx*w,p[1]+ny*w]); R.push([p[0]-nx*w,p[1]-ny*w]); });
  const n=L.length-1, rE=Math.hypot(L[n][0]-S[n][0],L[n][1]-S[n][1]), r0=Math.hypot(L[0][0]-S[0][0],L[0][1]-S[0][1]);
  return 'M'+L.map(p=>p.join(' ')).join('L')+`A${rE} ${rE} 0 0 1 ${R[n].join(' ')}`
       +'L'+R.reverse().map(p=>p.join(' ')).join('L')+`A${r0} ${r0} 0 0 1 ${L[0].join(' ')}Z`; }
const PROF={ comb:t=>Math.pow(1-t,1.25)*(1-.35*t)+.012,
             seed:t=>.07+.93*Math.pow(Math.sin(Math.min(1,t*1.1)*Math.PI/2),1.7),
             nut:t=>Math.pow(1-t,.9)+.02 };
```

### 2. 白灰地＋五罐蛋彩，唯一的漸層在一筆之內（色彩規則）

拿掉它就變成北歐花卉或墨西哥民藝。底永遠是白灰（不是紙白、不是米白卡片）；花只用不透明飽和色平塗；**任何漸層只准出現在「雙色過渡筆」那一筆裡面**，而且是沿筆的方向、中段硬轉。

```html
<linearGradient id="t1" gradientUnits="userSpaceOnUse" x1="筆根x" y1="筆根y" x2="筆尖x" y2="筆尖y">
  <stop offset=".36" stop-color="#C8312A"/><stop offset=".68" stop-color="#E8A317"/>
</linearGradient>
<path d="（一筆的外輪廓）" fill="url(#t1)"/>
```

### 3. 字讓花：楷書標題、拉丁用 Cyrillic 民藝風（字體選擇）

畫師不寫字，所以字不能搶花：中文標題用毛筆楷書（霞鶩文楷 LXGW WenKai TC 700），**直接寫在白灰上、零底塊零外框**；拉丁與數字用帶 Cyrillic 骨架的 Ruslan Display；內文才用 Noto Sans TC。字色只准墨 `#1E1A17` 與朱 `#C8312A`。

```css
h1,h2,h3{font-family:"LXGW WenKai TC","Kaiti TC",serif;font-weight:700;color:#1E1A17}
.lat{font-family:"Ruslan Display","LXGW WenKai TC",serif;letter-spacing:.06em}
```

### 4. 盆花 kvity 與花帶 bihuntsi（版面手法）

拿掉它就只是一堆散花。畫面要嘛是一盆（中軸莖＋左右交錯側莖＋頂花＋盆），要嘛是一條沿邊走的花帶（正弦莖、波峰一朵、波谷一串莓）。**花帶取代框線**：導覽是門框（垂直花帶）、分隔是一條花帶、估價圖是一扇被花帶框住的門。

```js
// 花帶：len×h，正弦莖，每半波一朵，交替 rosette / tulip / berries
for(let i=0;i<=waves*4;i++) stem.push([i*wl/4, h/2+Math.sin(i*Math.PI/2)*h*.2]);
```

### 5. 指尖點的紅莓（裝飾母題）

拿掉它就少了 Petrykivka 最可愛的節奏。莢蒾（калина）紅果一串 5–8 顆，用指腹點出的圓，再補一顆白灰色的小反光點；它是整套畫裡唯一的「圓」。

```js
function berries(x,y,n,s){ for(let i=0;i<n;i++){ const a=rnd()*Math.PI*2, d=Math.sqrt(rnd())*s;
  dot(x+Math.cos(a)*d, y+Math.sin(a)*d*.8, s*.36, '#C8312A');
  dot(x+Math.cos(a)*d-s*.12, y+Math.sin(a)*d*.8-s*.12, s*.08, '#F3EFE4'); } }
```

## 色彩系統

| 名稱 | hex | 用途 | 比例 |
|---|---|---|---|
| 白灰 lime | `#F3EFE4` | 頁面地、卡片地、按鈕字 | 約 68% |
| 灰影 lime2 | `#E7E0CD` | 刷牆痕、袋子、換頁的灰水 | 4% |
| 棉紙 | `#FBF8F1` | мальовки 紙畫與畫板 | 6% |
| 墨 | `#1E1A17` | 文字、花蕊核筆、盆口 | 8% |
| 朱 | `#C8312A` | 大花、紅莓、主按鈕、現用頁 | 5% |
| 黃 | `#E8A317` | 花心、雙色筆的第二色、指點 | 3% |
| 橘 | `#E0661F` | 內圈瓣、花苞 | 2% |
| 葉綠 / 深綠 | `#2E7D3A` / `#1F4D2B` | 葉、莖、導覽框線 | 3% |
| 群青 | `#2C4F9E` | 盆、側花、海 | 1% |
| 桃 | `#D9667A` | 至多一朵側花 | <1% |

規則：花色彼此直接相鄰，不加白邊；一朵花最多三色（外瓣雙色＋內瓣一色）；綠只給葉與莖。

## 字體系統

- 標題：LXGW WenKai TC 700（Google Fonts），h1 `clamp(64px,9vw,128px)`、h2 `clamp(34px,4.4vw,56px)`、h3 `20–28px`，行高 1.15，字距 .02–.06em。
- 拉丁／數字：Ruslan Display 400，年份 54px、標籤 15px。
- 內文：Noto Sans TC 400/700，16px／1.8；kicker 13px 700、字距 .22em、朱色。
- 文中長段敘事（故事、引言）可用楷書 18–20px／1.7。

## 版面與網格

- 左側 96px 門框導覽（垂直花帶），內容區最大 1180px、左右 40px（≤560px 為 16px）。
- 首屏 1.1 : 1 兩欄：左邊一盆畫、右邊店名與營業狀態；畫的比例 600×720。
- 不對稱：四筆卡片四欄錯落（`margin-top` 0／64／22／92px），三代年表三欄階梯下降。
- 零圓角、零陰影；卡片只有在「紙畫」時才換成棉紙色並旋轉 ±0.6–1.8°。

## 元件配方

- **導覽（門框花帶）**：`position:fixed` 左側 96px，右緣 3px 深綠莖；每頁一朵花，**現用頁畫滿、其他只有一顆深綠花苞**，hover／focus 時那朵當場長出來。≤760px 改為底部四格。
- **按鈕**：底是一筆梳筆的外輪廓（CSS `mask` 一張 SVG），朱／深綠／黃三色；hover 時那一筆拉長 6% 並轉 −1°。
```css
.btn::before{content:"";position:absolute;inset:0;z-index:-1;background:#C8312A;
 -webkit-mask:url("data:image/svg+xml,…一筆梳筆…") center/100% 100% no-repeat;mask:…}
```
- **表單**：只有底線（3px 墨），focus 換朱色；數字 20px 700。
- **列表／價目**：上緣 3px 深綠、每列 1px `#cfc6b0`。
- **對話框**：`<dialog>`，白灰地、無圓角，用 `@starting-style` 由下方「貼上牆」。
- **頁尾**：一條花帶（1100×120）＋三欄資訊。

## 動效規則

| 種類 | 本站自製 | 觸發 | 時長／曲線 |
|---|---|---|---|
| signature 逐筆生長 | 每一筆依自己的筆壓曲線由落筆長到收筆：籽筆減速（`1-(1-p)^2.2`，越收越重）、梳筆加速（`p^1.5`，一甩）、莖勻速；筆距 38ms | 進入視窗 | 籽 300、梳 220、核 170、雙色 340、莖 520–1250ms、指點 110ms 彈出 |
| input 葉子讓路 | 游標／手指 90px 內的葉以落筆點為軸轉開 ≤16°，離開回彈 | pointermove（rAF 節流） | `transition: transform .2s cubic-bezier(.3,1.4,.5,1)` |
| input 畫板 | 〈描一條花帶〉：觸控筆用 `pressure`，滑鼠／手指以速度換算（慢＝重） | pointer | 即時，<16ms |
| ambient 花頭搖 | 畫乾後每朵花繞花心 ±2.3° 搖，三種週期 6.4／7.5／9.1s | 時間 | ease-in-out alternate |
| transition 重刷白灰 | 換頁時三道帶毛邊（feTurbulence＋feDisplacementMap）的灰水由左刷過；到站時由左往右退去，然後畫重新長出來 | 點內部連結 | 380ms 進、460ms 出，`cubic-bezier(.6,0,.3,1)` |

**prefers-reduced-motion**：所有畫直接畫完（資訊零損失）；花不搖、葉不讓、換頁不刷灰；motion-library 背景停在 `seek(.35)`、文字停在最後一格；畫板照常可畫（使用者自己在動）。

**自我限制**：不准淡入整段內容、不准視差、不准跑馬燈；唯一的「進場」就是一筆一筆畫出來。

### motion-library 元件

來源 `wenxiangxiao/motion-library` v1.10.0 @887bb23（`tools/ml-embed.js` 子集，每頁只嵌該頁元件；掛載照 `sites/ka-to` 的包裝：字型就緒才掛、離屏 `destroy()`、一次性文字 `loop:false`、canvas `aria-hidden`、容器保留 `.ml-fb` 原標題）。重現參數見 `MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-07 | Random Pop Dots | index | primary `#C8312A` secondary `#E0661F` bg `#F3EFE4`・duration 5・density 1.4・seed 1958・16:9 | ambient | 「指尖點」旁的試色板：朱與橘的圓點一顆顆彈出再收——就是特徵 5 的指腹點，純圓、平塗、零輪廓零發光，底色就是白灰 |
| BG-B-05 | Spiral Dots | walls | primary `#E8A317` secondary `#E0661F` bg `#1E1A17`・duration 9・seed 22・1:1 | ambient | 向日葵花心的螺旋籽盤（黃金角排列），外圈是本站自製的 22 片雙色籽瓣；向日葵是 Petrykivka 常見母題 |
| TXT-A-02 | Letter Sequence | lesson | primary `#C8312A` secondary `#2E7D3A` bg `#E7E0CD`・duration 1.6・once | transition | 灰袋標籤「一筆課」逐字落下——灰袋上的字本來就是印刷黑體，元件字型（Noto Sans TC 粗體）正好符合「袋子」而不冒充畫師的字 |
| TXT-B-09 | Wave Letters | lesson（結果單） | primary `#C8312A` secondary `#E8A317` bg `#F3EFE4`・duration 2.2・once | transition | 八筆畫完時「畫完了」像花帶的正弦莖一樣起伏再停正 |
| TXT-B-26 | Swing Letters | visit | primary `#C8312A` secondary `#2E7D3A` bg `#F3EFE4`・duration 2.4・once | transition | 店門口掛牌「今日有刷／今日休息」（依臺北時間）掛在一條線上擺盪後停住 |

選用原則：零圓角、零 `shadowBlur`、不用帶網格底（`softGrid`）的元件——Petrykivka 不打草稿，任何格線都會變成底稿。文字元件只放在「印刷品」語境（袋子、掛牌、結果單），不放在畫裡。

## 插畫與圖像風格

全站沒有一張手繪插畫，所有圖都由同一支「四筆引擎」生成：
- `rosette`：10 片雙色梳瓣（由外往花心，圓肚在外）＋7 片籽瓣＋5 根墨色核筆＋黃色指點花心。
- `tulip`：中間一根梳筆、兩側兩根雙色筆，向花托收攏。
- `seedLeaf`／`comb`：籽葉單片；梳葉是一條脊上排 5 根漸短的梳筆。
- `bud`、`curl`、`berries`：花苞（核筆）、捲鬚、紅莓。
- `vazon`：盆＋中軸＋6 條側莖＋頂花；`runner`：花帶（可轉 90° 當門框）。
- 同一個 seed 永遠長出同一盆（xorshift32）。白灰牆質地是 SVG `feTurbulence`；乾了的葉與莖套一層 `feDisplacementMap` 2.4px 的蛋彩毛邊。

## Logo 與 Favicon 設計指南

- Logo：一朵 rosette＋兩片籽葉＋一段莖（只用四筆），右側楷書「花灰行」與 Ruslan Display「HUE-HUE · 1958」。不加圓框、不加底色塊。
- Favicon：白灰底上三片籽葉（一紅兩綠）＋一顆黃色指點，inline SVG data URI。

## Do & Don't

**Do**：一筆就是一個形；讓花帶沿邊走；花色直接相鄰；底是白灰；讓畫在使用者面前長出來；紅莓用圓點。

**Don't**：
- 不准描邊（`stroke`）畫葉或瓣；不准畫輪廓再填色。
- 不准把漸層用在背景、按鈕或卡片——漸層只住在雙色筆裡。
- 不准圓角卡片、陰影、玻璃、霓虹、紫藍漸層、emoji icon、三張置中卡片、Lorem ipsum。
- 不准格線、方眼、底稿線（Petrykivka 不打草稿）。
- 不准把花畫成寫實（有光影、有透視）；也不准混入俄式 Khokhloma 的黑金漆底或墨西哥 Otomi 的單色刺繡剪影。

## 頁面骨架範例

```html
<body>
  <svg class="wall" aria-hidden="true"><!-- feTurbulence 白灰 --></svg>
  <nav class="rail" aria-label="主選單">
    <a href="index.html" aria-current="page"><svg viewBox="0 0 60 60"><circle class="bud" cx="30" cy="30" r="7"/><g class="fw"></g></svg><span>白灰牆</span></a>
    <!-- 其餘頁：只有花苞，hover 時長出一朵 -->
  </nav>
  <main>
    <section class="hero">
      <svg class="hero-art" viewBox="0 0 600 720"><g id="hero-g"><!-- 建置期烘好的盆花＋門楣花帶（無 JS 也在） --></g></svg>
      <div class="brand"><p class="kick">…</p><h1>花<i>灰</i>行</h1><p class="sub">…</p>
        <a class="btn" href="lesson.html">來畫一條花帶</a></div>
    </section>
  </main>
  <footer><svg class="band" viewBox="0 0 1100 120"><g></g></svg>…</footer>
  <script>/* PK 四筆引擎＋PC 構圖＋HH.paint 逐筆生長 */</script>
</body>
```

## 技術實作與相容性

### 1. SVG filter：feTurbulence＋feDisplacementMap（A 渲染層）

- 用途：白灰牆的兩層質地（低頻刷痕 `.004 .02`＋高頻石灰粒 `.8`，經 `feColorMatrix` 轉成只有少量 alpha 的斑點）；乾了的葉與莖的蛋彩毛邊（`scale 2.4`）；換頁灰水的鬃毛邊（`baseFrequency .06 2.2`、`scale 7`）。
- 支援：`feTurbulence`、`feDisplacementMap` 為 MDN Baseline Widely available（各大瀏覽器 2015 年起）。
- 效能：牆是 `position:fixed` 的一張靜態濾鏡圖，只算一次；毛邊濾鏡**只套在不會動的單一 path 上**（`.dry>path`），搖擺中的花朵群組不套，避免每幀重算濾鏡。
- fallback：濾鏡失效時就是乾淨的白灰平面與銳利筆形，資訊不變。

### 2. Pointer Events：pressure＋getCoalescedEvents＋setPointerCapture（D 輸入與感測層）

- 用途：〈描一條花帶〉。觸控筆（`pointerType==='pen'`）直接用 `pressure` 當筆壓；滑鼠與手指沒有可靠壓力，改以速度換算 `p = clamp(1.12 − v·0.62)`（v：每毫秒移動的 SVG 單位），再以 0.3 的係數平滑——慢＝重，正是毛筆的手感。`getCoalescedEvents()` 取回被合併的中間點，快速一甩的梳筆也不會斷成折線。
- 支援（MDN 查證）：PointerEvent 與 `pressure` 為 Baseline Widely available（2020-07）；`getCoalescedEvents()` Chrome／Edge 58+、Firefox 59+、Safari 18.2+。
- fallback：不支援 `getCoalescedEvents` 時只用 `pointermove` 本身的點；無指標裝置（鍵盤）按 Enter 由師傅示範該筆，1–5 換色、Backspace 擦掉上一筆。
- 判分：該筆每個取樣點的寬度與「走到第幾成」的 Pearson 相關係數 r——籽筆要 r>0、其他三筆要 r<0（55 分）；長度 25 分；方向往外 20 分。

### 3. `@starting-style`＋`transition-behavior: allow-discrete`（B 動效與時間軸層）

- 用途：мальовки 紙畫與一筆課結果單的 `<dialog>`：從 `display:none` 進場時由下方 26px、轉 −2°、縮 .96「貼上牆」，backdrop 同步變暗；關閉時反向，`display` 與 `overlay` 以 allow-discrete 參與轉場，所以退場也有動畫。不需要任何 JS 計時。
- 支援（web.dev〈Now in Baseline: animating entry effects〉／MDN）：Chrome／Edge 117+、Safari 17.4（allow-discrete）／17.5（`@starting-style`）、Firefox 129+，Baseline 2024 Newly available。
- fallback：不支援時對話框直接出現／消失；不支援 `showModal()` 時改加 `open` 屬性。

### 效能預算（實測：jsdom＋node 計時，非真機）

| 頁 | 檔案大小 | 其中 motion-library 子集 |
|---|---|---|
| index | 約 225 KB | 92 KB |
| walls | 約 154 KB | 92 KB |
| lesson | 約 147 KB | 92 KB |
| visit | 約 136 KB | 92 KB |

- 首頁盆花＋門楣花帶共 345 筆（含指點），建置期烘成靜態 SVG（座標取整數）；JS 以同一 seed 重算構圖約 13ms（node 冷啟動實測），之後逐筆重長，每幀只更新「正在長」的 4–10 條 path（一條 outline 計算 0.018ms）。首屏 JS 遠低於 100ms 預算。
- 同一畫面同時運轉的 motion-library 元件 ≤1；離屏即 `destroy()`。
