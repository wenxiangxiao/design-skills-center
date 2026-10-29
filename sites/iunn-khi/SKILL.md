---
name: cyanotype-atkins-photogram
description: Anna Atkins-style cyanotype photograms (1843) — one Prussian-blue hue on cream paper, white soft-edged plant silhouettes with sun-direction penumbra, hand-brushed emulsion edges, specimen-plate layout with sun-printed italic Latin labels, and the yellow-green-to-blue wash development as the signature motion.
---

# 藍曬・Atkins 光圖半身 Cyanotype Photogram after Anna Atkins

> 範例站：`sites/iunn-khi`（羊齒園 IÛNN-KHÍ FERNERY，新北石碇蕨類苗圃）。
> 型錄條目「印刷與製程｜藍晒圖 Cyanotype」的第 2 站。第 1 站 `celeste` 是**天文負片線描半身**（深藍滿版地、白色細線星圖、Spectral＋Space Mono）；本站是 **Atkins 光圖半身**（奶油紙留邊、刷出來的藍塊、柔邊剪影、Fell 斜體學名）。兩半是同一個流派，合計已達全館 2 站上限。

## 設計哲學

1842 年 John Herschel 發明藍曬：檸檬酸鐵銨＋赤血鹽刷在紙上，曬到光的鐵被還原，水洗後成為不溶的普魯士藍；沒曬到的鹽被水沖走、留下紙白。1843 年 10 月 Anna Atkins 把海藻直接放在這種紙上曬，自費出版《Photographs of British Algae: Cyanotype Impressions》——第一本以照片為插圖的書（1843–1853 共三冊，約 389 張光圖）；1853 年她與 Anne Dixon 再曬了一冊蕨。

這個流派長成這樣，全是製程的限制：

- **只有一種顏色**：普魯士藍是唯一的成色物，深淺只來自曬了多久。沒有第二個色相、沒有黑。
- **圖是負片**：物件擋住光的地方是白的。不畫線、不畫明暗——形狀只由「擋不擋光」決定，薄葉透一點光就是淡藍。
- **紙是刷出來的**：感光液用刷子刷，所以藍色區塊永遠有刷痕、毛邊、沒刷滿的角，四周留著沒上藥的紙白。
- **字也是曬出來的**：Atkins 把學名寫在描圖紙上一起曬，所以標籤是白色斜體，跟植物同一層。
- **時間看得見**：未洗的紙是黃綠色、曬過變灰古銅，進水那一刻藍才綻開。

一句話：**用光和水做出來的圖，網頁上的每個藍都要能回答「它曬了多久」。**

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「藍色網站」而不是藍曬。

### ① 單一普魯士藍色相＋紙白負片

全站只有普魯士藍的深淺與紙色。白＝擋光處，不是「白色的東西」。禁止第二個色相（唯一例外：製程中的感光液黃綠 `#CCC778`，只出現在「還沒洗」的狀態）。

```css
:root{
  --paper:#EFE9D9;  /* 沒上藥的紙，最大面積 */
  --pr:#0B2350;     /* 正曝的普魯士藍 */
  --pr2:#16336A; --mid:#2E5A92; --pale:#A9BCD3; /* 欠曝的階：只能是同一個藍 + 紙的混合 */
  --wht:#EEF1F4;    /* 藍上的白（擋光處、曬進去的字） */
  --sens:#CCC778;   /* 未洗感光液，只給製程狀態 */
}
.cy{background:var(--pr);color:var(--wht)}
```

### ② 光圖剪影：零描線、零明暗、柔邊半影

物件只以「擋光的輪廓」出現。貼紙的部分邊緣銳利；離紙的部分（捲起的葉尖、厚莖）有半影，而且半影偏向太陽的反方向。薄葉片半透明 → 淡藍。

```js
// 遮罩雙通道：R＝貼紙、G＝離紙；lighter 疊加讓重疊的葉更不透光
ctx.globalCompositeOperation='lighter';
ctx.fillStyle = lifted ? 'rgba(0,255,0,'+a+')' : 'rgba(255,0,0,'+a+')'; // a＝葉的不透光度，薄葉 .7
```
```glsl
// 片段著色器：離紙層沿太陽方向偏移、16 點黃金角圓盤取樣＝半影
for(int i=0;i<16;i++){float fi=float(i),a=fi*2.39996,rr=sqrt((fi+.5)/16.)*uBl;
  g+=texture2D(uM,q+uSun+vec2(cos(a),sin(a))*rr*uPx).g;}
```
靜態版（無 JS）：白色 path 直接疊在藍塊上，薄葉 `opacity=".72"`。

### ③ 刷塗乳劑邊

藍塊永遠不是乾淨的矩形：左右是橫向刷痕的毛邊與乾刷縫，四周留紙白。

```css
:root{--brush:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' preserveAspectRatio='none'%3E%3Cfilter id='b' x='-5%25' y='-5%25' width='110%25' height='110%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.003 .11' numOctaves='3' seed='4'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='46' xChannelSelector='R' yChannelSelector='G'/%3E%3C/filter%3E%3Crect x='26' y='22' width='948' height='956' filter='url(%23b)'/%3E%3C/svg%3E")}
.brush{-webkit-mask:var(--brush) center/100% 100% no-repeat;mask:var(--brush) center/100% 100% no-repeat}
```
（`baseFrequency` 的 x 很低、y 很高＝橫向條紋＝刷子是橫著刷的。）WebGL 版在著色器裡做：`coat=smoothstep(-.004,.006,d+(fbm(x*2.6,y*70)-.5)*.05)`，邊緣 5% 內再以 `step(noise,…)` 挖出乾刷縫。

### ④ Atkins 標本頁

一頁一株、置中、四周留紙；下方是**曬進去的**白色斜體拉丁學名與小號 `Pl.` 編號；中文說明放在版外。

```html
<figure class="table">
  <div class="plate-wrap"><canvas …></canvas></div>
  <figcaption><span class="sc">Pl. I</span> <i>Nephrolepis cordifolia</i> 腎蕨</figcaption>
</figure>
```
```js
// 學名畫進遮罩的 R 通道 → 跟葉子一起擋光、一起變白
x.font='italic '+W*.052+'px "IM Fell English"';x.fillText('Nephrolepis cordifolia',W/2,H*.855);
x.font=W*.03+'px "IM Fell English SC"';x.fillText('Pl. I',W/2,H*.9);
```

### ⑤ 曝光層次與水洗顯影

藍的深淺＝曝光量（1 − e^(−k·E)）；未洗是黃綠→灰古銅，進水的那條前沿過後才變藍。整站的節奏（試條導覽、欠曝／正曝／過曝評語、首頁曬台、換頁）都從這條時間線來。

```glsl
float Dn=1.-exp(-uK*E*sens);                         // 曝光 → 密度
vec3 un=mix(sensC,unw,smoothstep(0.,.9,Dn));          // 未洗：黃綠 → 灰
vec3 wa=mix(paper,pr,Dn);                             // 洗後：紙 → 普魯士藍
float f=uWash*1.6-(.62*q.x+.38*(1.-q.y))+(fbm(q*5.)-.5)*.16; // 斜向水流前沿＋水痕
col=mix(un,wa,smoothstep(0.,.03,f));
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 紙 | `#EFE9D9` | 頁面地、圖版留邊、正文底 | ~55% |
| 紙影 | `#E4DCC6` | 圖版未載入時的底、次級面 | ~4% |
| 普魯士藍（正曝） | `#0B2350` | 藍塊、正文字、按鈕、現用導覽 | ~28% |
| 藍二 | `#16336A` | hover、水盆 | ~4% |
| 中藍（欠曝） | `#2E5A92` | 次要文字、kicker | ~3% |
| 淡藍（嚴重欠曝） | `#A9BCD3` | 分隔虛線、薄葉 | ~3% |
| 藍上白 | `#EEF1F4` | 藍上的字與剪影 | ~3% |
| 感光液黃綠 | `#CCC778` | 只給「未洗」狀態與「按住曬」按鈕 | ≤1% |

規則：中間色一律是「紙＋普魯士藍」的混合（`mix(paper, pr, D)`），不准另取一個比較好看的藍。零漸層（著色器裡的曝光梯度是物理結果，不是裝飾漸層）、零發光、零陰影色以外的色。試條導覽四格：`#D7DFE8 → #AFC0D5 → #7590B6 → #45679A`，現用＝`#0B2350`。

## 字體系統

- **IM Fell English**（Google Fonts，Igino Marini 重刻的 17 世紀 Fell 活字）italic：學名、數字、時刻——有手寫的不均勻，接近 Atkins 的學名標籤。
- **IM Fell English SC**：`Pl. I`、kicker、表頭，`letter-spacing:.04em`。
- **Noto Serif TC** 400／700／900：中文正文與標題。標題 900、行高 1.2；正文 400、16px、行高 1.85。
- 字級：h1 `clamp(64px,9vw,128px)`（首頁店名）／頁標 `clamp(44px,6vw,78px)`／h2 `clamp(26px,3.4vw,40px)`／h3 20–24px／學名 17–27px／註 13–14px。
- 禁止 mono 與無襯線（例外見 motion-library 文字元件，元件庫固定字族）。

## 版面與網格

- 左側 104px 固定**曝光試條**導覽；主內容 `max-width:1180px`，左右 `clamp(16px,4vw,48px)`。
- 首頁：`1.25fr 1fr`，左為 3:4 曬台（最大 560px），右為店名與今天的太陽（sticky）。
- 圖譜頁：12 欄不對稱錯落（`1/6`、`7/11 +90px`、`2/6`、`7/13 −40px`…），像標本冊攤在桌上，不是卡片牆。
- 藍塊（`.cy.brush`）只用在：圖版、今天的太陽、曬圖表、一條全寬的故事帶。其餘是紙。
- 零旋轉；圖版只在游標下做 ±7° 的 3D 微傾（把紙拿起來對光看）。
- ≤860px 單欄、試條移到底部；≤560px 隱藏試條拉丁小字。

## 元件配方

- **導覽（曝光試條）**：`<ol>` 四格由淺到深，現用頁＝`#0B2350` 加直排「正曝」框；hover 以 `steps(3)` 跳一階（曝光是一格一格加的）。
- **按鈕**：直角、2px `--pr` 框；`.solid` 藍底白字；hover 一律變 `--pr2`。「按住曬」是唯一用感光液黃綠的按鈕，按下變藍。
- **藍塊卡**：`.cy.brush`，內距 20–30px，白字；不加圓角、不加陰影。
- **價目**：`<dl>` 上 1px 藍線、每列 dotted `--pale` 分隔，金額用 Fell italic。
- **表格（曬圖表）**：藍塊裡白字，今天那列反白（紙底藍字）。
- **footer**：2px 藍線上三欄，虛構聲明用 `--mid`。

## 動效規則

| 種類 | 實作 | 觸發 | duration／easing |
|---|---|---|---|
| ambient | 首頁曬台自己跑：刷感光液 → 放葉 → 依石碇此刻真實太陽曝光（離紙葉尖隨微風擺動 `sin(t·.9+y·7)·.006`）→ 拿開 → 水洗 → 晾 → 換下一片；地平線下自動改「燈箱」較慢 | 載入、離屏暫停 | 一輪約 13–20 秒；刷紙 1.3s 線性；曝光到 E=1.08 |
| input | 首頁：游標＝手影（遮光，曝光時留下較淺的 dodging）；曬一冊：拖曳／方向鍵挪葉子（曝光中挪動會留下兩層影子）；圖譜：圖版 3D 微傾；導覽 hover 一階曝光 | pointermove／drag／keydown | 即時（每幀重算遮罩＋重繪，<16ms）；導覽 `.35s steps(3,end)` |
| transition | 塗布換頁：一道刷邊普魯士藍由左蓋滿 → 換頁 → 下一頁由左往右「洗」開；新紙「刷感光液」前沿 | 點站內連結；換紙 | 蓋 440ms `cubic-bezier(.7,0,.3,1)`；洗 620ms `cubic-bezier(.6,0,.25,1)` |
| signature | **水洗顯影 wash-bloom**：斜向水流前沿掃過，前沿前是黃綠／灰古銅的未洗紙，前沿後綻成普魯士藍、沒曬到的地方洗回紙白，前沿本身是一條較深的水痕 | 首頁每輪、「放進水盆沖水」 | 2.4s 線性推進（前沿 `uWash·1.6`） |

`prefers-reduced-motion`：曬台直接顯示洗好的成品、「下一片」切換；刷紙與水洗瞬間完成；換頁直接切；微風停止；motion-library 背景停在 `seek(.35)`、文字停在 `seek(1)`。資訊零損失（太陽數值、評語、冊子照常）。

### motion-library 元件表（PLAYBOOK §2.8）

出處：`wenxiangxiao/motion-library` 1.24.0 @26ae4dc1；參數說明見 `MotionLib.prompt(id)`。每頁 inline 該頁的子集（`tools/ml-embed.js`，`tools/ml-smoke.js` 全部 smoke ok）。以 `IK.ml()` 掛載（照 `sites/ka-to` 的 `KT.ml`：等字型、離屏 destroy、一次性元件 loop:false、canvas aria-hidden、`.ml-fb` 保留 HTML 標題）。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-36 | Ink Bleed | index | text「曬出來的藍」・primary `#2E5A92`・secondary `#A9BCD3`・bg `#0B2350`・2.6s・loop false・16:9 | transition | 字由一團團暈開的斑塊長出來——像藍曬泡進水裡、從濕的地方先顯影；暗底得白字＝曬進去的白 |
| TXT-B-40 | Float Drift | ferns | text「六片葉・六張藍」・primary `#A9BCD3`・secondary `#2E5A92`・bg `#0B2350`・2.4s・loop false・16:9 | transition | 字從下方漂上來、左右微擺後落定：葉子放進水盆時的漂浮 |
| BG-B-21 | Ripple Rings | sunprint | primary `#A9BCD3`・secondary `#EFE9D9`・bg `#16336A`・4.5s・density .9・seed 1843・1:1 | ambient（沖水時 replay＝input） | 水盆：同心漣漪只用線、零填色零發光；按「沖水」時重播 |
| TXT-A-37 | Liquid Text | visit | text「來園曬一張」・primary `#A9BCD3`・secondary `#EFE9D9`・bg `#0B2350`・2.2s・loop false・16:9 | transition | 字像在水裡晃、最後靜止——沖洗後拿起來的那張紙 |
| BG-B-20 | Wave Lines | visit | primary `#A9BCD3`・secondary `#16336A`・bg `#0B2350`・14s・density .8・intensity .7・seed 1853・16:9（容器 160px 裁切） | ambient | 頁尾的石碇山稜：一層層「紙＋藍」混合的平塗帶，相當於曬圖試條的明度階 |

不選的：半調網點類（BG-A-14、BG-B-01…，網點是印刷不是光化學）、帶 `shadowBlur` 的發光字、SHP-33 Squiggle Draw（描線，違反特徵②）。已知妥協：文字元件的字族固定為元件庫的無襯線（`Unbounded`→系統黑體），只用在一條藍帶裡，且容器內保留 Noto Serif TC 的 HTML 標題給無 canvas 環境。

## 插畫與圖像風格

**photogram-lsystem 光圖 L-system**：全站零圖檔。六種蕨由參數式 L-system 長出（模組帶參數、規則是函式，改寫至無非終結符）：

| 物種 | 文法要點 | 圖元 |
|---|---|---|
| 腎蕨 *Nephrolepis cordifolia* | `R(i) → F [+P] F [−P] +bend R(i+1)`，羽片長＝`58·sin(π(.1+.86t))^.75` | 145 |
| 過貓捲芽 *Diplazium esculentum* | `C(i)` 轉角在 t>.34 後線性加大＝對數螺旋，t>.5 標為離紙 | 202 |
| 鐵線蕨 *Adiantum capillus-veneris* | 二回羽狀，小羽片為楔形扇（`al:.7` 薄） | 392 |
| 山蘇 *Asplenium nidus* | 三片帶狀全緣葉＋中肋 | 48 |
| 筆筒樹 *Cyathea lepifera* | `R → F[+B][−B]R`，`B` 再生半裂片 | 1,069 |
| 芒萁 *Dicranopteris linearis* | 假二叉 `D(n) → F[+K D(n−1)][−K D(n−1)]`，`K` 梳齒裂片 | 566 |

同一份圖元可以輸出成 WebGL 遮罩、Canvas 2D 白剪影、建置期 SVG（無 JS 備援與 logo）。禁止：線稿、陰影、立體感、寫實葉脈紋理、任何「綠色的葉子」。

## Logo 與 Favicon 設計指南

- Logo：刷邊藍方塊（隨機但決定性的 ragged rect）上一枝白色過貓捲芽光圖（`assets/logo.svg` 由同一支 L-system 建置）。導覽列內嵌的是 2KB 簡化版：一條對數螺旋＋莖＋四枚小羽片。
- Favicon：紙色底、四邊微斜的藍塊、白色螺旋＋莖，4px 圓頭線。
- 字標用 Noto Serif TC 900「羊齒園」＋ IM Fell English SC「Iûnn-khí Fernery」。

## Do & Don't

**Do**
- 每一個藍都能回答「曬了多久」：深淺用同一個藍和紙混出來。
- 讓白色是「被擋住的光」：剪影、曬進去的字、沒刷到的紙邊。
- 讓製程可見：黃綠未洗 → 水洗 → 藍；欠曝／正曝／過曝用文字說明，不用量表。
- 保留紙：頁面主體是紙，藍是被刷上去的一塊一塊。

**Don't**
- 不要第二個色相（不要綠葉、不要金、不要「點綴色」）。
- 不要線稿描邊（那是工程藍圖，另一半的流派，而且是 F1 暫禁的家族）。
- 不要乾淨的矩形藍塊、圓角卡片、模糊投影卡片。
- 不要半調網點、不要 glow、不要紫藍漸層 hero、不要 emoji icon、不要 Lorem ipsum、不要「EST. 19xx」徽章。
- 不要把藍做成滿版深色主題（那是 celeste 的天文負片半身）。

## 頁面骨架範例

```html
<nav class="strip" aria-label="主要頁面（曝光試條）">
  <a class="logo" href="index.html">…</a>
  <ol>
    <li><a href="index.html" data-s="1" aria-current="page"><b>園</b><i>Hortus</i></a></li>
    <li><a href="ferns.html" data-s="2"><b>圖譜</b><i>Plates</i></a></li>
    <li><a href="sunprint.html" data-s="3"><b>曬</b><i>Expose</i></a></li>
    <li><a href="visit.html" data-s="4"><b>來園</b><i>Visit</i></a></li>
  </ol>
</nav>
<main id="main">
  <section class="hero wrap">
    <figure class="table">
      <div class="plate-wrap"><svg class="plate-fb">…建置期光圖…</svg><canvas id="plate"></canvas></div>
      <figcaption><span class="sc">Pl. I</span> <i>Nephrolepis cordifolia</i> 腎蕨</figcaption>
    </figure>
    <div class="mast">
      <p class="kicker sc">Iûnn-khí Fernery · Shí-tīng · since 1978</p>
      <h1>羊齒園</h1><p class="sub la">Cyanotypes of Taiwanese Ferns</p>
      <section class="today cy brush"><h2>今天石碇的太陽</h2>…</section>
    </div>
  </section>
</main>
```
```js
var Sh=new CY.Sheet(canvas);             // 無 WebGL → Sh.ok=false，保留 SVG 備援
Sh.setMask(function(x,W,H){CY.draw(x,CY.fern('nephrolepis',23),[W*.16,H*.1,W*.68,H*.66],'mask');});
Sh.setSun(CY.sun(),1);                    // 真實太陽 → 半影方向與寬度
Sh.expose(dt*CY.sun().rate*k);            // 每幀累積曝光
Sh.st.wash=…;Sh.render();                 // 0→1.25 推進水洗前沿
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況與查證 | fallback |
|---|---|---|---|---|
| 原生 WebGL 片段著色器（無函式庫）：曝光累積以 16-bit 打包在 RGBA8 ping-pong 紋理（`hi=floor(e·255)/255, lo=fract(e·255)`），輸出 pass 做刷邊、紙纖、未洗/洗後兩組色、水洗前沿 | A 渲染 | 特徵②③⑤、signature 水洗顯影、首頁曬台、曬一冊 | web-platform-dx〈WebGL〉：Baseline **Widely available（2018-01-29 起）**，Chrome 9／Edge 12／Firefox 4／Safari 5.1／iOS Safari 8；caniuse〈webgl〉註明依 GPU 而定。highp 以 `GL_FRAGMENT_PRECISION_HIGH` 判斷，不支援時退 mediump（精度降低但仍可曬）。著色器以 `@shaderfrog/glsl-parser` 做 GLSL ES 語法檢查通過；外觀以 numpy 逐像素移植同一公式驗證 | `getContext('webgl')` 失敗或編譯失敗 → `Sheet.ok=false`：首頁保留建置期 SVG 光圖、圖譜改 Canvas 2D 白剪影、曬一冊顯示「需要 WebGL」並停用按鈕 |
| 真實時刻驅動：NOAA GMD〈General Solar Position Calculations〉求石碇（24.991°N, 121.659°E, UTC+8）太陽高度、方位、日出日落；`matchMedia` 判斷 reduced-motion | B 動效時間軸 | 曝光速率（`sin(el)^.85`，地平線下 4° 改 UV 燈箱 .32）、半影方向（方位角）與寬度（`cot(el)`）、首頁「今天的太陽」、來園頁七日曬圖表 | 純 JS（`Date`、`Math`），無相容性問題。驗算：2026-10-30 日出 05:59、日落 17:15、正午 11:37、正午高度 51°，12:00 方位 189°（午後偏西南）。注意 NOAA 的方位公式需取 `acos((sin δ − sin φ cos z)/(cos φ sin z))`，下午 `360−az` | 無 |
| 參數式 L-system（決定性 xorshift32 種子） | E 資料與生成 | 全站所有圖像（六種蕨、logo、無 JS 備援 SVG） | 純 JS；node 實測生成 0.4–11ms／種，Canvas 2D 遮罩繪製 0.2–10ms／種 | 建置期已輸出 SVG |
| 附：CSS `mask` + SVG `feTurbulence`／`feDisplacementMap` | A 渲染 | 特徵③ 刷邊藍塊、換頁 | `mask` 為 Baseline 2023（舊 Safari 讀 `-webkit-mask`）；SVG-as-image 內的濾鏡各引擎皆支援 | 不支援 mask 時退回乾淨的藍矩形（資訊不受影響） |

**效能實測**（本輪沙盒沒有可用的瀏覽器，以下是能誠實量到的部分）：

- 單頁大小：index 299.0KB、ferns 265.8KB、sunprint 272.8KB、visit 263.2KB（含 motion-library 子集 ~221KB）——皆 ≤350KB。
- node（V8）實測：`cy.js` 解析 1.9ms；motion-library 子集 eval 11.2ms；首頁首屏 JS（子集＋cy＋腎蕨生成＋遮罩）估計 ≈25ms + 著色器編譯，在 100ms 預算內。`CY.sun()` 每次 0.003ms。
- GPU 負載：每幀兩個全螢幕 pass（曝光累積＋輸出），每像素約 40 次取樣；首頁畫布上限 560×747 CSS px × DPR 1.5。離屏或分頁隱藏時暫停 rAF。
- jsdom＋假 WebGL／Canvas 的無頭流程測試：四頁 × {一般、reduced-motion、無 WebGL} 皆零錯誤，曬一冊完成一輪（放葉→曬→沖水→收進冊子）。

查證來源：web-platform-dx〈WebGL〉；caniuse〈webgl〉；NOAA GMD〈General Solar Position Calculations〉(gml.noaa.gov/grad/solcalc/solareqns.PDF)；Wikipedia〈Anna Atkins〉；The Met〈Photographs of British Algae: Cyanotype Impressions〉；NYPL Digital Collections；Atlas Obscura〈These Beautiful Images of Algae Were the First Photos to Illustrate Any Book〉。
