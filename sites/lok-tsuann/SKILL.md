---
name: byzantine-gold-mosaic
description: Byzantine mosaic (opus musivum) web style — every image is built from hand-cut glass tesserae with visible grout, on a gold ground whose tiles are set at varied angles so they glint as the light (pointer or device tilt) moves; tiles follow the contours of each figure (andamento) behind a row of dark outline stones, volumes are stepped flat bands, and compositions sit in apses, lunettes and roundels framed by jewelled pearl-and-gem bands with spaced capital inscriptions.
---

# 拜占庭鑲嵌 Byzantine Mosaic —— 風格規格書

> 範例站：鹿泉湯（北投溫泉路的街坊公共浴場，大池上方的圓頂鋪成金地）。本規格書與產業無關：飯店大廳、珠寶與金工、教堂與婚禮場地、甜點與巧克力、地中海餐廳、博物館、泳池與溫泉、高級茶館、任何「光在表面上移動」的品牌都能套用。

## 設計哲學

拜占庭鑲嵌（4–15 世紀；代表作：拉文納 Galla Placidia 陵墓 c.425–450 的星空穹頂與雙鹿飲泉半月壁、San Vitale 547 年的查士丁尼與狄奧多拉、Sant'Apollinare Nuovo 的聖女行列、伊斯坦堡 Hagia Sophia 的 Deësis c.1261）是為**油燈與斜射光**做的藝術。它長成這樣有三個製作上的理由：

1. **材料是一公分見方的玻璃 smalti**，金片是把金箔夾在兩層玻璃之間燒成。所以畫面永遠由小方塊拼成，灰縫是畫面的一部分，沒有連續的色面。
2. **金片斜著按進濕灰泥**（Otto Demus《Byzantine Mosaic Decoration》1948 論金地與觀者位置；American Mosaics／Gold ground 條目皆記載金片以不同角度嵌入以「吸光與拒光」）。人一走動，金地就閃——這是空間，不是背景色。
3. **工序決定圖形**：先鋪每個形狀的深色輪廓列，再由外往內一排一排填，排與排的走向（andamento）順著輪廓彎；背景金地最後鋪，先繞形兩排，其餘橫向成排。

所以這個風格在網頁上的核心不是「金色＋紫色」，而是：**畫面是被鋪出來的，而且會隨著光改變。** 靜態的金色漸層只是 Art Deco 的鍍金，不是鑲嵌。

## 本風格的 5 個不可省略特徵

### 1. 一切都是鑲嵌石，灰縫看得見

沒有任何連續色面：每塊顏色都由略不規則的四邊形組成（尺寸 ±7%、轉角 ±7%、旋轉 ±4°），之間露出暖灰色灰縫 `#5b5247`。HTML 的平面（按鈕、帶狀、轉場幕）也用 CSS 模擬灰縫網格。

```css
.tess{background-color:#C99A2E;background-image:
 linear-gradient(90deg,#5b5247 0 1.5px,transparent 1.5px),
 linear-gradient(#5b5247 0 1.5px,transparent 1.5px),
 linear-gradient(90deg,rgba(255,240,180,.35) 0 4px,transparent 4px 9px,rgba(80,58,14,.25) 9px 12px);
 background-size:12px 12px,12px 12px,36px 12px}
```
```js
// 每一片是一個抖動過的四邊形
for(j=0;j<4;j++){const a=ang+j*Math.PI/2+Math.PI/4;
  Q[j*2]=x+Math.cos(a)*1.414*sz+(R()-.5)*.16*sz; Q[j*2+1]=y+Math.sin(a)*1.414*sz+(R()-.5)*.16*sz;}
```

### 2. 金地是會反光的：每片金有自己的傾角

金片不是一個顏色，是一個**法向量**。亮度＝漫射＋窄鏡面：`b = 0.2 + 0.22·jitter + 0.26·max(0,1−|n−L|/0.85) + 0.72·exp(−|n−L|²/0.0085)`，量化成 24 階金色色階（`#463412 → #966F24 → #CDA03E → #EECB70 → #FFF0BA`）。光向 L 由游標、觸控、手機傾斜或方向鍵決定，永遠在動（油燈搖曳 ±0.03）。

```js
const GOLD=['#463412', /* …24 階… */ '#FFF0BA'];
const dx=n[0]-L[0], dy=n[1]-L[1], dd=dx*dx+dy*dy;
const b=0.2+0.22*j+0.26*Math.max(0,1-Math.sqrt(dd)/0.85)+0.72*Math.exp(-dd/0.0085);
ctx.fillStyle=GOLD[Math.round(Math.min(1,b)*23)];   // 按亮度分桶，一桶一次 fill
```
法向量取圓盤均勻分布（`r = 0.04 + 0.58·√rand`），這樣任何光向下都只有約 2% 的金片閃，閃得像真的金地而不是亮片。

### 3. Andamento：石子排的走向順著形狀

每個形狀外圍是一圈一圈的平行列，像等高線；背景金地先繞形兩排，再橫向成排，上下排的縫錯開。做法：對「圖層邊界」算歐氏距離場 D，在 `frac(D/S)≈0.5` 的帶上依 D 由小到大貪婪擺放，方向取距離場梯度的切線。

```js
// 候選點：落在第 k 排中心帶上
if(Math.abs((D[i]/S)%1-.5)<.22) cand.push(D[i], x, y, Math.atan2(D[i+W]-D[i-W], D[i+1]-D[i-1])+Math.PI/2);
// 由輪廓往內依序擺，與鄰石距離 ≥ 0.94S 才放
cand.sort(byDistance); for(c of cand) if(free(c.x,c.y,(0.94*S)**2)) put(c);
// 背景：橫排、寬度 0.9–1.12S 隨機，縫不對齊
for(r=0;(r+.5)*S<H;r++){let x=R()*S; while(x<W){ put(x,(r+.5)*S,0); x+=S*(0.9+R()*0.22); }}
```

### 4. 暗色輪廓列＋分階平塗，不漸層

每個人物、動物、器物的最外一排是深色石（褐 `#3A2212`、墨藍 `#0F1C4A`、灰藍 `#2A2B3D`）；往內每 1.2–1.5 排換一個顏色，2–3 階，像等高線。**禁止任何漸層與陰影**，體積只靠階。

```js
color = d < S ? layer.contour
      : layer.colors[Math.min(layer.colors.length-1, Math.floor((d-S)/(S*1.5)))];
// 例：鹿 colors ['#9B5A2B','#BF7E45','#DDB07A'] contour '#3A2212'
```

### 5. 拱形框、寶石珍珠帶與碑銘大寫

構圖放在半穹（apse）、半月壁（lunette）或圓章（clipeus）裡，外框是帝王紫帶上交替的白珍珠與寶石；題字用加字距的羅馬大寫（Cinzel），鋪在青金色帶上。網頁上的分隔線就是這條寶石帶。

```css
.jewel{position:relative;height:22px;background-color:#5E2147;
 background-image:radial-gradient(circle at 11px 11px,#F3EFE6 0 4.5px,transparent 5px);background-size:44px 22px;
 border-top:2px solid #C99A2E;border-bottom:2px solid #C99A2E}
.jewel::after{content:"";position:absolute;inset:0;
 background:repeating-linear-gradient(90deg,transparent 0 27px,#2E7356 27px 39px,transparent 39px 44px);
 mask:linear-gradient(transparent 5px,#000 5px 15px,transparent 15px)}
canvas.apse{aspect-ratio:1000/880;border-radius:50% 50% 0 0/56.8% 56.8% 0 0}   /* 半穹 */
canvas.lunette{aspect-ratio:1000/540;border-radius:50% 50% 0 0/92.6% 92.6% 0 0}
.clipeus{border-radius:50%;box-shadow:0 0 0 2px #F3EFE6,0 0 0 5px #5E2147}
```

## 色彩系統

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 金 Oro（24 階） | `#C99A2E` 中值，`#463412`–`#FFF0BA` | 金地、圓章、轉場幕 | 約 40% |
| 灰縫 | `#5b5247` | 所有鑲嵌的縫、頁面最外底色 | 約 12% |
| 青金 Lapis | `#1D3A8F` / `#3E64B8` / `#A9C1EA` | 水、星空、題字帶、頁首 | 約 18% |
| 大理石白 | `#EEE8DC` / `#E2DACB` | 文字護壁石板 | 約 22% |
| 帝王紫 Porpora | `#5E2147` | 拱框、寶石帶、主要按鈕 | 約 5% |
| 翡翠 | `#2E7356` / `#4C9068` | 草地、寶石 | ≤3% |
| 朱／赭 | `#9E2A2F` / `#D9822B` | 花、彩虹帶、魚 | ≤2% |
| 墨 | `#24170F` | 內文 | — |

規則：金永遠以鑲嵌（或 CSS 灰縫網格）出現，**不得出現平塗金色大面積或金屬漸層**；文字只放在大理石護壁或青金帶上，不直接壓在金地上。

## 字體系統

- 標題與內文：Noto Serif TC（400／600／900），標題 900、字距 .14–.24em。
- 拉丁碑銘與小標：Cinzel（500／700／900），全大寫、字距 .14–.32em，12px 小標置於中文大標之上。
- 字級：h1 clamp(40px,8vw,84px)／h2 clamp(26px,4vw,40px)／h3 21px／內文 17px 行高 1.75／註 13–14px。
- 鋪進鑲嵌的字：筆畫寬度必須 ≥ 1 片石（中文用 900 字重再加 10–12 單位描邊），簡單字形優先；複雜中文字鋪不清楚時改用拉丁大寫。

## 版面與網格

- 上下兩層，照教堂牆面：**上層鑲嵌（半穹、半月、圓頂），下層大理石護壁**（文字區）。兩層之間用寶石帶分隔。
- 護壁採不對稱 1.1fr / .9fr 兩欄；石板（.slab）以金線＋大理石＋帝王紫三層框。
- 鑲嵌畫面置中且對稱（拜占庭構圖是對稱、正面、階序的），但頁面整體非對稱。
- 不旋轉任何元素；圓與拱是唯一的曲線。留白只在護壁上，鑲嵌裡零留白（金地就是「空」）。

## 元件配方

- **導覽（clipeus-band）**：青金帶（同樣有灰縫網格），右側四枚圓章，圓章外圈是 conic-gradient 金環，亮弧隨游標方向轉（`--a` 以 `@property` 註冊為 `<angle>`）；目前頁的圓章整枚金，字改帝王紫。
- **按鈕**：帝王紫底、內嵌三層框 `box-shadow: inset 0 0 0 2px gold, inset 0 0 0 4px porph, inset 0 0 0 5px pearl`，無圓角。
- **石板卡片**：`border:2px solid gold; box-shadow:0 0 0 4px marble,0 0 0 6px porph`。
- **大理石護壁**：兩組斜向細紋 linear-gradient，左右各佔 50% 並鏡射（book-matched）。
- **表格**：價格欄用 Cinzel 700 右對齊；分隔線 1px `#cfc4ad`。
- **頁尾**：寶石帶＋三欄大理石。
- **序號**：`counter(s, upper-roman)` 放在金圓章裡。

## 動效規則

| 類型 | 觸發 | 做法 | 時間 |
|---|---|---|---|
| ambient 油燈搖曳 | 永遠 | 光向加上 `sin(0.9t)·0.028 + sin(2.3t)·0.012`，金片持續微閃；首頁閒置 3.2s 後光沿 Lissajous 慢巡，藏字會週期性浮現 | 連續 |
| input 光向 | pointermove／pointerdown／方向鍵／deviceorientation | 目標光向每幀 lerp 0.45（≈3 幀到位，<60ms），整面金地同幀重算反光；圓章亮弧轉向游標 | 即時 |
| transition 鋪設 | 進頁 | 依工序順序逐片出現：輪廓列 → 身體分階 → 金地繞形 → 金地橫排 → 補洞；1.8s（鋪石頁 6.5s 並顯示工序字卡） | 線性 |
| transition 金幕 | 點內部連結 | 灰縫金幕 `clip-path: circle()` 從點擊處張開，430ms 後換頁 | cubic-bezier(.65,0,.25,1) |
| signature 傾角隱像 | 光向對上 | 一群法向一致的金片同時達到鏡面峰值，圖形整塊亮起；找到後描深色輪廓列並固定 | 即時 |

`prefers-reduced-motion: reduce`：關閉搖曳與巡光、鋪設直接完成、金幕停用；光仍跟隨輸入（那是操作，不是動畫）；尋光頁提供「直接列出六樣」，資訊零損失。

## 插畫與圖像風格

只有一種技法：**順勢鋪石（andamento-tesserae）**。所有圖形先畫成簡單的實心剪影（SVG path，正側面、平面化、無透視），交給鋪設引擎生成鑲嵌。母題取自拜占庭與早期基督教鑲嵌的通用語彙而非宗教圖像：雙鹿飲泉、噴泉器皿 kantharos、魚、鴿、扇貝、油燈、八角星、星空穹頂、彩虹帶。人物若要出現，必須正面、對稱、大眼、無陰影。

## Logo 與 Favicon 設計指南

- Logo：圓章（clipeus）——帝王紫外環、16 顆斜 45° 的白色方石珍珠、金地（以 6px 灰縫 pattern 表示鑲嵌），中央是深褐色站立鹿的剪影（帶角）與一道青金水波。
- Favicon：32px 圓章，灰縫底上幾片金方石＋一個青金拱，三片白方石；全部是方塊，沒有曲線細節。

## Do & Don't

**Do**
- 讓光可以被操作，金地才算數。
- 每個形狀外面一定有一排暗色輪廓石，金地頭兩排繞著它彎。
- 文字放在大理石或青金帶上。
- 鑲嵌裡的字要粗到至少一片石寬。

**Don't**
- 不用金屬漸層、鍍金質感、bevel 或陰影假裝金——那是 Art Deco／奢華風，不是鑲嵌。
- 不用完美方格平鋪（那是磁磚或像素畫）；拜占庭的縫永遠錯開、方向永遠順勢。
- 不畫宗教人物或聖像去裝飾商業品牌。
- 去 AI 化禁令：禁紫藍漸層 hero、禁置中三卡片、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章。

## 頁面骨架範例

```html
<header class="band"> <a class="brand">…</a>
  <nav class="clipei"><a href="index.html" aria-current="page"><span class="clipeus">穹</span><span class="lbl">半穹<small>APSE</small></span></a>…</nav>
</header><div class="jewel"></div>
<main>
  <section class="wall"><div class="mz-wrap">
    <canvas class="mz apse" tabindex="0" role="img" aria-label="…"></canvas>
    <noscript><svg>…同一組 path 的平塗版…</svg></noscript></div></section>
  <section class="sec marble"><div class="inner split"> <div>文字</div> <div class="slab">資訊</div> </div></section>
  <div class="jewel"></div>
</main>
<footer class="marble">…</footer><div class="wipe"></div>
<script type="text/plain" id="mz-core">/* edt + layout + build + draw */</script>
<script>/* MZ.mount(canvas, scene, {hidN, idle}) */</script>
```

場景格式（設計座標，任何尺寸都會重新鋪）：

```js
{vw:1000,vh:880,grout:'#5b5247',layers:[
  {d:'M…Z', rule:'evenodd', colors:['#5E2147']},                       // 拱框
  {circles:[[x,y,r],…], colors:['#F3EFE6']},                          // 珍珠
  {d:deerPath, colors:['#9B5A2B','#BF7E45','#DDB07A'], contour:'#3A2212'},
  {text:{s:'水自山來',x:500,y:270,gap:196,w:12,font:'900 160px "Noto Serif TC"'}, hid:1}, // 傾角隱像
  {d:'M0,760H1000V880H0Z', colors:['#1D3A8F'], ground:true}         // 青金題字帶，橫排
]}
```

## 技術實作與相容性

### 1. OffscreenCanvas `transferControlToOffscreen()` ＋ Worker（A 渲染層）

- **承載**：特徵 1、2——鋪設計算（距離場＋擺放，約 7,700 片）與每幀金片反光繪製都在 Worker 裡，主執行緒只負責把場景圖層點陣化、轉送光向。
- **支援**：`HTMLCanvasElement.transferControlToOffscreen()` Chrome 69、Firefox 105、Safari 16.4（MDN 相容表）。Safari 16.4 先只支援 2D context（WebKit Bugzilla 253431／Safari 16.4 beta notes：「Added support for 2D-only OffscreenCanvas」），Safari 17 才加 WebGL——本站只用 2D，所以 16.4 即可。
- **Worker 來源**：核心程式放在 `<script type="text/plain" id="mz-core">`，以 Blob URL 建 Worker，維持單檔 HTML。
- **Fallback**：沒有 `transferControlToOffscreen` 或建 Worker 失敗時，同一份核心以 `new Function` 在主執行緒執行，畫面完全相同（只是鋪設那 ~130ms 在主執行緒）。完全沒有 JavaScript 時，`<noscript>` 顯示由同一組 path 生成的平塗 SVG。
- **幀同步**：主執行緒 rAF 每幀送 `{L,p}`，Worker 畫完回 `drawn` 才送下一幀，不堆積訊息；鋪設完成後靜態石子快取成一張 OffscreenCanvas，之後每幀只畫金片。

### 2. 歐氏距離場 ＋ 空間雜湊貪婪擺放（E 資料與生成層）

- **承載**：特徵 3、4——andamento、輪廓列、分階色帶全部來自同一張距離場。
- **演算法**：Felzenszwalb & Huttenlocher（2004/2012）〈Distance Transforms of Sampled Functions〉一維下包絡拋物線法，兩趟可分離，O(n)；擺放用 S×S 格的空間雜湊查最小間距。隱藏圖形在算距離場時被視為金地，所以 andamento 不會洩漏它的輪廓。
- **決定性**：mulberry32 以 seed 決定所有抖動與傾角；尋光頁 seed＝當天日期（可用 `?seed=` 指定），同一天每個人看到同一個金頂。
- **實測**（Node 22＋Skia 2D，代表性的單執行緒數字；本輪無法在建站環境啟動實體瀏覽器）：首頁半穹 1000px 寬，點陣化 19 個圖層 ≈ 32–46ms（主執行緒，含腳本解析），鋪設 7,711 片 ≈ 125–145ms（Worker），每幀反光繪製 4.8–5.9ms；圓頂 8,882 片每幀 4.8ms；手機 360px 寬約 2,000 片。整站四頁 44–141KB（首頁含三枚建置時鋪好的靜態 SVG 圓章），皆 <350KB。

### 3. DeviceOrientation ＋ Pointer ＋ 鍵盤作為光向（D 輸入與感測層）

- **承載**：特徵 2 與簽名〈傾角隱像〉——光從哪裡來由使用者的手決定。手機上傾斜手機，就像泡在池子裡換位置抬頭。
- **支援**：`DeviceOrientationEvent.requestPermission()` 只在 iOS Safari（14.5+ 起於相容表列為支援；iOS 13 起即需要權限），需 HTTPS 且必須在使用者手勢內呼叫（MDN：requires transient activation）。其他瀏覽器直接監聽 `deviceorientation`。
- **Fallback**：按鈕只在 `(pointer:coarse)` 且有 `DeviceOrientationEvent` 時出現；被拒或不支援時文字改為「請用手指拖」，觸控拖曳（圓頂設 `touch-action:none`）一樣能玩；桌機用游標；鍵盤用方向鍵（Shift 加速），canvas 可聚焦。
- **偵測**：主執行緒以同一個光向計算每個藏圖的鏡面強度 `exp(−|n_k−L|²/0.0085)`，>0.72 持續 0.45 秒即算找到，再通知 Worker 把那群金片改鋪成固定亮金＋深色輪廓。

### 查證來源

- MDN〈HTMLCanvasElement: transferControlToOffscreen() method〉相容表
- WebKit Bugzilla 253431；Safari 16.4 release notes（2D-only OffscreenCanvas）
- MDN〈DeviceOrientationEvent: requestPermission() static method〉；caniuse `mdn-api_deviceorientationevent_requestpermission_static`
- Wikipedia〈Gold ground〉；American Mosaics〈Journeying to Light – the Essential Nature of the Mosaic Medium〉（金片以不同角度嵌入）
- Otto Demus, *Byzantine Mosaic Decoration*, London 1948
- P. Felzenszwalb & D. Huttenlocher, *Distance Transforms of Sampled Functions*, Theory of Computing 8 (2012)
