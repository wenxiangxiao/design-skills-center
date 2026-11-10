---
name: portolan-chart-vellum
description: Medieval Mediterranean portolan chart as a web style — a single irregular vellum skin with a tapering neck instead of a rectangular frame; a rhumb-line network radiating 32 directions from sixteen roses on a hidden circle plus a centre rose (black main winds, green half-winds, red quarter-winds) drawn across everything; place-names written at right angles to the coast on the land side, major ports in red; islands flat-painted red, gold or blue, rocks as black crosses and shoals as red dots; a gold-leaf compass rose with a fleur-de-lis north and a red cross east, city banners, and a scale of leagues.
---

# Portolan 海圖・一張皮 — 規格書

> 範例站：〈八風號船釣 PAT-HONG〉（`sites/pat-hong`，宜蘭頭城烏石港的船釣船家，虛構）。本規格不綁定產業：凡是「從一個點出發、照方向與距離到另一個點」的行業都合用——船家、渡輪、快遞與貨運、登山嚮導、導航 App、旅行社、外送、物流倉儲、潛水店、救難隊、甚至是「從 A 牌到 B 牌」的課程地圖。

## 設計哲學

**Portolan chart（波特蘭型海圖）**是 13 世紀末到 17 世紀地中海與黑海水手用的手繪航海圖。現存最早的〈Carta Pisana〉約 1275 年；最早有署名與年份的是熱那亞人 Pietro Vesconte 1311 年的海圖；馬約卡學派的 Angelino Dulcert（1339）與 Abraham Cresques《加泰隆尼亞地圖集》（1375）把它推到最華麗。它們有一套極穩定的作法：

- 畫在**一整張羊皮（vellum）**上，皮的一端收成「頸」，常被做成捲軸或黏在木板上；圖的邊就是皮的邊。
- 海上沒有經緯線，只有**恆向線網（rhumbline / windrose network）**：在海上畫一個看不見的大圓，圓周等分 16 點、加上圓心，每點向 32 個方向放線。主風線用墨（或金），半風用綠，四分風用紅。
- **地名一律垂直海岸、寫在陸地那一側**，一個接一個排滿，讓海岸線本身保持乾淨；重要的港寫紅、其餘寫黑。因為海圖攤在桌上大家圍著讀，每一段海岸都有字是倒的、躺的——讀的人要把圖轉過來。
- 黑點或十字是暗礁，紅點是沙洲淺灘；島嶼整塊平塗紅、金、藍、綠；內陸留白，最多畫幾座城堡與旗。
- 15 世紀後出現**裝飾風花**：北方一朵百合、東方一個十字（指向聖地），以及一根**浬尺（scale of leagues）**。

它長成這樣的原因全部來自使用方式：水手只關心「港、方向、距離」，所以海上什麼都不畫；平行尺要能從任何位置找到同向的線，所以線要多、要穿過整張皮；船上的人轉著讀，所以字可以朝任何方向。**本規格的核心是「方向即資訊」**：網頁的每一條線都要是一個可以被指名的方向。

## 本風格的 5 個不可省略特徵

### ① 恆向線網：十七朵風花、三十二向、墨綠紅三色

隱藏圓上 16 點＋圓心，各放 32 條線，畫到皮的邊緣為止，**連陸地都穿過去**（陸上壓淡）。主風（k%4==0）墨、半風（k%4==2）綠、四分風（奇數）紅；線寬 0.6–0.9px，不透明度 .4–.5。拿掉它，就只是一張舊地圖。

```js
// 32 向：k=0 北、順時針；同一份資料同時給 SVG 與平行尺用
const dir=k=>{const a=k*Math.PI/16;return [Math.sin(a),-Math.cos(a)];};
const rank=k=>k%4===0?'m':(k%2===0?'h':'q');
const origins=(cx,cy,R)=>[[cx,cy],...Array.from({length:16},(_,k)=>{const a=k/16*Math.PI*2-Math.PI/2;return [cx+Math.cos(a)*R,cy+Math.sin(a)*R];})];
// 每個 origin 輸出三條 path（m/h/q），一條 path 32 段 M…L…
```
```css
.net path{fill:none;vector-effect:non-scaling-stroke}
.net .m{stroke:#2B1D14;stroke-width:.8;opacity:.42}
.net .h{stroke:#3E7B4F;stroke-width:.7;opacity:.5}
.net .q{stroke:#B5352A;stroke-width:.6;opacity:.42}
```

### ② 一張皮：不規則外緣、一端收頸、沒有矩形框

整張圖畫在一塊不規則的皮上，放在深色桌面（頁面底色）上；皮右端收窄成頸。頁面的區塊也是一片片皮，用多點 `clip-path` 做出不規則邊，**全站不出現矩形外框與圓角卡片**。

```css
body{background:#2E2117}            /* 桌面 */
.skin{background:radial-gradient(120% 90% at 40% 45%,#EEDDB6 0,#E8D6AE 60%,#CDB07A 100%)}
.skin.cut{clip-path:polygon(0 2.5%,4% .6%,18% 1.4%,33% 0,52% 1%,71% .2%,88% 1.3%,98% 0,100% 6%,99.2% 22%,100% 41%,99.3% 63%,100% 84%,98.6% 99%,82% 100%,64% 98.8%,45% 100%,27% 99%,9% 100%,.6% 97%,0 80%,.8% 58%,0 37%,.7% 15%)}
```
```svg
<!-- 海圖本體：皮的外形以 23 個控制點 Catmull-Rom 閉合，右側 x≈1594 收頸；網與島都 clip 在皮裡 -->
<clipPath id="skin"><path d="M40 62 C300 26 … 1594 500 … 24 240Z"/></clipPath>
```

### ③ 地名垂直海岸，寫在陸側，大港寫紅

每個地名錨在海岸點往陸地內縮 7 單位，旋轉到海岸的**向海法向量**方向，`text-anchor:end`——字從內陸往海岸讀、字尾貼著岸。北岸的字是直立往上讀，東岸是水平，岬角是斜的。大港紅色加粗，其餘墨色。

```js
// n_out：沿海岸取樣後，取前後 3 點切線的法向，測試哪一側不在陸地多邊形內
text.setAttribute('transform',`translate(${x-nx*7} ${y-ny*7}) rotate(${Math.atan2(ny,nx)*180/Math.PI})`);
text.setAttribute('text-anchor','end');
```
```css
.tp{font:500 15px "Noto Serif TC",serif;fill:#2B1D14;paint-order:stroke;stroke:#E8D6AE;stroke-width:3px}
.tp.r{fill:#B5352A;font-weight:900;font-size:17px}
```

### ④ 海岸一筆＋平塗島＋險礁記號，內陸留白

海岸是一條 2.2px 的連續墨線，沿法向加細碎抖動，岬角畫得比真的尖；島整塊平塗（紅、金、青）並描墨邊；暗礁＝墨十字，沙洲＝一串紅點。陸地內部除了城堡小旗什麼都不畫——**那一片留白就是放文字內容的地方**。

```svg
<path class="coast" d="M… " fill="none" stroke="#2B1D14" stroke-width="2.2" stroke-linejoin="round"/>
<path class="isle" d="…" fill="#B5352A" stroke="#2B1D14" stroke-width="1.6"/>
<path d="M-4 0H4M0 -4V4" stroke="#2B1D14" stroke-width="1.6"/>          <!-- 暗礁 -->
<g fill="#B5352A"><circle r="1.8"/><circle cx="4" cy="4" r="1.8"/></g>  <!-- 沙洲 -->
```

### ⑤ 金箔風花、百合北、紅十字東、旗與浬尺

主風花是 32 尖星：主風 8 尖最長（正方位金、斜方位青）、半風綠、四分風紅，每一尖分亮暗兩半平塗；正北頂上一朵金色百合，正東外側一個紅十字；八風首字 T G S O L P M 用哥德體。城堡小旗、黑白相間一格一浬的浬尺。

```svg
<!-- 一尖＝兩個三角形（亮半／暗半）＋一條墨邊 -->
<path d="M0 0L-19 0L0 -118Z" fill="#C8A043"/><path d="M0 0L19 0L0 -118Z" fill="#9C7A2A"/>
<path class="fleur" d="M0 -38C9 -26 10 -12 4 0C14 -10 30 -10 34 2C28 0 20 4 18 12C12 8 6 10 4 16L10 22H-10L-4 16C-6 10 -12 8 -18 12C-20 4 -28 0 -34 2C-30 -10 -14 -10 -4 0C-10 -12 -9 -26 0 -38Z" fill="#C8A043" stroke="#2B1D14" stroke-width="3"/>
<path d="M-12 0H12M0 -12V12" stroke="#B5352A" stroke-width="5"/>   <!-- 東方十字 -->
```

## 色彩系統

| 名稱 | hex | 用途 | 比例 |
|---|---|---|---|
| 桌面胡桃 | `#2E2117`／`#241911` | 頁面底色、皮下的桌 | 30% |
| 皮 | `#E8D6AE`（亮 `#EEDDB6`、邊 `#CDB07A`、深 `#DCC79A`） | 海圖與所有內容片 | 55% |
| 墨 | `#2B1D14`（淡 `#5A4532`） | 海岸、主風線、文字 | 8% |
| 朱 | `#B5352A`（暗 `#7E2219`） | 大港地名、四分風線、龜山島、東方十字、按鈕 | 3% |
| 綠 | `#3E7B4F`（暗 `#24502F`） | 半風線、風花半尖 | 1.5% |
| 金箔 | `#C8A043`（暗 `#9C7A2A`、亮 `#E2C370`、尺 `#D9B45A`） | 風花、百合、平行尺、導覽 | 1.5% |
| 青金 | `#2E4E8F`（暗 `#1D3566`） | 斜向主風尖、提示高亮 | 1% |

規則：三種線色只用在恆向線與其衍生物（表格的雙線、圖例）；金只出現在風花、百合、尺；**不用任何其他彩色**。皮的明暗只來自邊緣變深的徑向漸層與淡斑點，顏料本身全部平塗。

## 字體系統

- **Noto Serif TC**（Google Fonts，400／500／700／900）：地名、標題、內文。portolan 的地名是手寫書體，中文以明體最接近「一筆一字寫上去」的感覺。標題 900、內文 400、地名 500、大港 900。
- **Grenze Gotisch**（Google Fonts，500／700）：八風首字、義大利文小標（Carta／Venti／Rotta）、年份。哥德體對應 14 世紀馬約卡與熱那亞的抄寫字。
- 字級：H1 `clamp(40px,4.4vw,72px)`、H2 `clamp(30px,3.2vw,46px)`、內文 17px／1.75、小標 13px 字距 .18em 大寫。
- 不用無襯線、不用等寬字——這不是儀表板。

## 版面與網格

- **首屏＝整張皮**：海圖 SVG 以 `aspect-ratio:16/10` 滿寬，`preserveAspectRatio:xMaxYMid slice`，內容區直接放在**陸地的留白**（左 3.2%、寬 31%），不加任何底板。≤900px 時圖在上、內容片在下；≤560px 圖改 1:1 只留海與風花。
- 內容區塊是一片片斜放的皮（`.skin.cut`），左右各留 2.5vw 讓桌面露出來。
- 雙欄比例 .8:1.2、.9:1.1 等不對稱；右側留 13vw 給固定的風花導覽。
- 線就是格線：表格用墨線＋下方一條綠細線（主風＋半風）；不用卡片、陰影、圓角。
- 旋轉角度：地名旋轉角由海岸法向決定；其餘元素一律 0°。

## 元件配方

- **導覽（rose-point-nav）**：右上固定 176px 方塊，中央一朵 88px 八尖風花；三個連結貼在北、東、南三個尖端外（海圖／讀圖／針路，各附義大利文小字）。現用頁那個尖染朱、標籤朱底。≤560px 變成底部四格列（三連結＋中央小風花）。
- **按鈕**：直角、2px 墨框、皮底；主按鈕朱底。hover 反色（墨底皮字）。不用圓角、不用陰影。
- **表格／清單**：上緣 2px 墨線，列間 1px 墨線，列下 3px 處再一條 60% 綠細線。左側方塊放八風首字（金底墨框）。
- **表單控制**：方向選擇是一朵 16 尖風花（每尖一個 `role=radio`），距離是一副分規（張角＝數值），按鈕旁 −／＋ 方鈕。
- **footer**：直接寫在桌面上（皮色字），三欄：地址電話、價目、這張圖的三條規矩。

## 動效規則

四種動效，各有本站自製實作，全部提供 `prefers-reduced-motion` 降級且資訊零損失：

| 種類 | 實作 | 觸發 | 時間 | reduced-motion |
|---|---|---|---|---|
| **ambient** 城旗飄動 | 每座城堡旗的 path 以 `flagD(x,y,w,h,ph+t/260)` 重算 | 只在海圖進入視窗時，約 24fps | 持續 | 停在初始形 |
| **input** 游標點亮最近的風花 | pointermove → 換算 SVG 座標 → 最近的 origin 加 `.on`（三條線不透明度 .95、加粗） | 滑鼠 | <16ms | 照常（使用者自己在動） |
| **input** 轉皮讀字 | Pointer Events 角度差旋轉＋阻尼 .93 慣性；←→ 一次 11.25° | 拖曳／鍵盤／手機指北 | 即時 | 無慣性、直接到位 |
| **transition** 捲皮換頁 | WAAPI `clip-path: inset(0 100% 0 0)→inset(0)` 蓋上一片印著恆向線的皮，下一頁 `inset(0)→inset(0 0 0 100%)` 捲走 | 站內連結 | 420ms／520ms `cubic-bezier(.6,0,.3,1)` | 直接換頁 |
| **signature** 平行尺 parallel-rule walk | 選一個方向，一副銅色平行尺沿該方向的垂直方向掃過整張皮，尺走過的地方，17 條同向恆向線全部加粗成該等級的顏色 | 點風花首字／針路選方向／首頁每 13 秒自走 | 1500ms（遊戲 900ms）ease-in-out，停留 3.8s 淡出 | 直接顯示全部同向線 |

自我限制：**不用淡入進場、不用 stroke-dashoffset 描線**——portolan 的線是一次畫滿的，動的只有尺、旗、皮與船。

### motion-library 元件（1.37.0 @b655b9d）

嵌入方式：`node tools/ml-embed.js <ml>/src/motion-lib.js TXT-B-36,BG-A-09,TXT-B-16,TXT-A-10,BG-B-39 b655b9d`，建置期把 `FAM.sans`／`FAM.tc` 換成 Noto Serif TC 後以 terser 壓縮，inline 成每頁第一個 `<script>`。掛載包裝照 `sites/ka-to` 的 `KT.ml`：等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `loop:false` 播一次、canvas `aria-hidden`、容器內保留 `.ml-fb` 原標題。各元件的開發 Prompt 見 `MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-36 | Ink Bleed | 海圖 | text「針路簿」, colors 墨／朱／皮, duration 2.4, loop:false, seed 1987, 16:9 | transition | 針路簿標題像墨水滲進羊皮——portolan 是墨寫在皮上的，元件只用色塊遮罩、無圓角無發光 |
| TXT-B-16 | Circle Text | 讀圖 | text「TGLSOLPM八風三十二向」, colors 墨／朱／皮, duration 2.2, loop:false, seed 32, 1:1 | transition | 八風首字從一圈風花的位置收成一行——字繞圓排列正是風花外圈首字的作法 |
| BG-A-09 | Polar Grid | 讀圖 | colors 綠／朱／桌面, duration 9, density .9, intensity .8, seed 16, 16:9 | ambient | 同心圓＋放射線緩慢轉動，旁邊的文字講「看不見的圓與十六朵風花」——就是 marteloio 的構造圖 |
| TXT-A-10 | Follow Path | 針路 | text「照針路走」, colors 墨／朱／皮, duration 2, loop:false, seed 4, 16:9 | transition | 字沿一條虛線航跡駛入後拉直——對應「沿恆向線走直線」 |
| BG-B-39 | Minimal Wave | 針路（結果） | colors 青金／綠／皮, duration 5, intensity .8, seed 3, 16:9 | ambient | 釣完回港的結果頁一道平緩的浪；portolan 海上不畫浪，所以只放在海圖以外的結果片上 |

同一畫面同時運轉 ≤2 個；元件不擔任 signature。

## 插畫與圖像風格

- 全站零圖檔：海圖由建置期 node 以同一份 `core.js` 產生（海岸 Catmull-Rom 取樣＋法向抖動、地名法向排字、恆向線網、32 尖風花、島、旗、浬尺），執行期再用同一份 core 做互動。
- 圖像只有五種東西：線（網）、岸（一筆）、字（地名）、平塗色塊（島、風花）、小記號（十字、紅點、城堡旗）。**沒有陰影、沒有立體、沒有寫實插圖**。
- 船只畫一艘 32×24 的剪影小帆船（墨船身、金主帆、朱前帆）。

## Logo 與 Favicon 設計指南

- 一個皮色圓盤：八尖風花（北尖金、其餘主風青、半風綠）、中心朱點、下方一道墨色船身、東方一個朱十字。
- Favicon 與 `assets/logo.svg` 同源（`logoSVG(64)` 轉 data URI）。
- 字標：「八風號」Noto Serif TC 900 字距 .06em，下接朱色小字「船釣」字距 .3em。

## Do & Don't

**Do**
- 讓每一條線都是一個可指名的方向；讓資訊放在陸地的留白裡。
- 地名一律垂直海岸，接受有些字是倒的——提供「轉過來讀」的方法。
- 島與風花平塗；皮的邊不規則。
- 文案從「港、方向、距離」長出來。

**Don't**
- 不畫經緯格線、等高線、海浪紋、海怪（那是後來的印刷地圖，不是 portolan）。
- 不用矩形框、圓角卡片、陰影、玻璃擬態、漸層按鈕。
- 不用紫藍漸層、置中大標＋三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- 不要把恆向線做成 dashoffset 描線動畫或淡入——線一次畫滿。
- 不要用地圖服務的圖磚：這是手繪海圖，不是導航畫面。

## 頁面骨架範例

```html
<body>
 <nav class="rnav" aria-label="主導覽"><svg><!-- 八尖風花 --></svg>
  <a class="n1" href="index.html" aria-current="page"><span class="go">CARTA</span>海圖</a>
  <a class="n2" href="rose.html"><span class="go">VENTI</span>讀圖</a>
  <a class="n3" href="course.html"><span class="go">ROTTA</span>針路</a></nav>
 <main id="main">
  <section class="hero">
   <div class="sheet"><svg class="chart" viewBox="0 0 1600 1000" preserveAspectRatio="xMaxYMid slice">
     <!-- 皮 → 網（clip 在皮內）→ 陸地壓淡 → 海岸 → 礁與沙洲 → 島 → 地名 → 城旗 → 風花 → 首字 → 浬尺 --></svg></div>
   <div class="inland"><p class="kick">Carta del …</p><h1>…</h1><p class="lead">…</p></div>
  </section>
  <section class="table skin cut"><div class="wrap two">…</div></section>
 </main>
 <footer class="foot">…</footer>
 <div class="roll" aria-hidden="true"></div>
</body>
```

## 技術實作與相容性

### 1. 海岸法向排字與恆向線網（E 資料與生成層「程序化生成」；最近 6 站未出現）

- 海岸 32 個經緯度控制點 → Catmull-Rom 每 4 單位取樣（473 點）→ 前後 3 點切線求法向、以 point-in-polygon 判斷哪側是海 → 每個地名取鄰近 9 點平均法向排字。網為 17 個 origin × 32 向，每 origin 三條 path（墨／綠／紅），共 51 條 path。
- **建置期 node 與執行期共用同一份 core.js**：HTML 內的 SVG 在無 JS 時完整可讀；執行期只多做一次取樣（遊戲要算陸地碰撞）。
- 實測（node 22）：取樣＋法向＋網 8.5ms；瀏覽器端首屏 JS 只有綁事件與 rose 頁的一次 apply()，遠低於 100ms。

### 2. Web Animations API＋CSS Motion Path（B 動效與時間軸層「Web Animations API」；最近 6 站未出現）

- 船：`boat.style.offsetPath='path("M…L…")'`、`offset-rotate:auto`、`offset-anchor:50% 50%`，`boat.animate([{offsetDistance:'0%'},{offsetDistance:'100%'}])`，以 `animation.finished` 串接「擱淺→搖晃→倒退」；結束後把位置寫回 transform 並 `cancel()`。
- 換頁：同一套 WAAPI 對 `clip-path: inset()` 補間。
- 查證：MDN `offset` 簡寫 Baseline Widely available（2022-09）；caniuse「offset-path: path()」各主流瀏覽器支援；`Element.animate()` 與 `Animation.finished` 為 Baseline。
- Fallback：`CSS.supports('offset-path','path("M0 0L1 1")')` 為 false 時改用 WAAPI 對 `transform: translate() rotate()` 補間；沒有 `Element.animate` 時直接放到終點。換頁不支援 clip-path 動畫時直接跳頁。

### 3. Pointer Events 旋轉＋DeviceOrientation 指北（D 輸入與感測層「DeviceOrientation（附桌機游標替代）」；最近 6 站未出現）

- 〈讀圖〉轉皮：`setPointerCapture`、以 `atan2` 算相對圓心角度差，放手後速度 ×0.93 阻尼滑行；鍵盤 ←→ 每次 11.25°（四分之一個風）。字的螢幕角＝字的法向角＋皮的旋轉，|角|<28° 判定為「站起來」。
- 手機「指北」：iOS Safari 需在點擊手勢內呼叫 `DeviceOrientationEvent.requestPermission()`，讀 `webkitCompassHeading`（磁北、非標準）；Chrome／Firefox Android 監聽 `deviceorientationabsolute`，以 `360 − alpha` 為航向。查證：MDN `requestPermission()` 標示實驗性、非 Baseline；MDN `deviceorientationabsolute` Limited availability、僅限安全來源、Safari 不支援；W3C public-geolocation 2024-01 討論建議 Safari 改讀 `webkitCompassHeading`。
- Fallback：沒有觸控或沒有 `DeviceOrientationEvent` 時不顯示「指北」按鈕；權限被拒時顯示文字提示，拖曳與鍵盤照常。

### 效能預算實測

| 頁 | 大小（含 inline motion-library 子集約 120KB） |
|---|---|
| index.html | 約 256KB |
| rose.html | 約 259KB |
| course.html | 約 253KB |

主要動畫只動 transform、clip-path、offset-distance 與一條 path 的 `d`（旗 24fps、尺 60fps）；平行尺用 SVG `clipPath` 內一個 rect 的 transform 做掃描帶，不重算網。

### 查證來源

- Wikipedia〈Portolan chart〉〈Rhumbline network〉
- University of Minnesota James Ford Bell Library〈Portolan Charts: Characteristics in Common — Rhumb Lines〉
- Royal Museums Greenwich〈All about portolans〉
- MDN〈offset〉〈offset-path〉〈Element.animate()〉〈DeviceOrientationEvent.requestPermission()〉〈Window: deviceorientationabsolute event〉；caniuse〈offset-path: path()〉
