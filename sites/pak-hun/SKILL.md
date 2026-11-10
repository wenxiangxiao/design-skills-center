---
name: central-asian-abrbandi-ikat
description: Central Asian warp ikat (abrbandi, "cloud binding", Bukhara / Margilan, 19th-century adras and khan-atlas) as a web style — everything built from vertical warp strands, colours computed only from which dye baths (yellow, madder red, indigo) a segment went through, every edge feathered by per-bundle, per-bath misregistration, large mirror-symmetric motifs repeating down the warp, and narrow loom-width panels sewn side by side; rendered here as a swaying bead curtain whose motif edges blur further as strands move.
---

# 中亞縛雲 ikat Abrbandi — 規格書

> 範例站：〈縛雲珠簾 PA̍K-HÛN〉（`sites/pak-hun`，彰化和美管珠門簾行）。本規格不綁定產業：任何「東西先排好再掛上去、掛上去才看得見圖」的行業都合用——布行、地毯、窗簾、髮辮、編織、香氛、市集、旅行社、茶。

## 設計哲學

ikat 在烏茲別克與塔吉克叫 **abrbandi**——*abr* 是雲、*band* 是綁：「把雲綁起來」。染匠先把經線一束一束用線紮緊，下黃缸；拆一部分、重紮，下紅缸；再拆再紮，下靛缸。紮住的地方不吃色。三缸的紮線不可能剛好疊合，上機時一束線又會被拉偏，於是每一塊顏色的邊都像被風吹開——這種糊不是瑕疵，是整個流派的身分證。19 世紀布哈拉是高峰：靛缸與紅黃缸由不同的染坊分工，做成長袍 chapan 與壁掛；馬爾吉蘭至今仍有數百位師傅織絲經棉緯的 adras，2017 年列入 UNESCO 優良保護實踐名冊。

所以這套風格的三個信條：

1. **圖只存在於直線上。** 一切圖像由垂直的「經線」組成，沒有橫線、沒有輪廓。
2. **顏色是算出來的，不是調出來的。** 三個缸，八種組合，就是全部色票。
3. **邊永遠要錯。** 對齊到一顆不差，就是印花布，不是縛雲。

## 本風格的 5 個不可省略特徵

拿掉任何一項，畫面就會滑回「普通的民族風印花」。

### ① 雲邊 abr：每一缸各自錯位、一束一束地錯

每條經線屬於一束（3–6 條），整束偏 ±1–2 單位，束內約三成的線再多偏 1。**三缸各自獨立錯一次**——所以黃邊、紅邊、靛邊糊的位置都不同，黃滲進紅變橙、黃滲進靛變綠。這是唯一允許的「模糊」；禁止 CSS blur、禁止漸層羽化。

```js
/* 每一缸一組錯位：一束同偏，束內再抖 */
function abr(n,seed,amp){var r=xs(seed),o=[0,0,0].map(()=>new Int8Array(n));
 for(var k=0;k<3;k++){var i=0;while(i<n){var sz=3+Math.floor(r()*4),v=Math.round((r()+r()+r()-1.5)*1.6*amp);
  for(var j=0;j<sz&&i<n;j++,i++)o[k][i]=v+(r()<.3?(r()<.5?-1:1):0);}}return o;}
/* 一條線的第 r 顆：分別用三缸各自的錯位取樣，再合成 */
for(var k=0;k<3;k++){var yy=(r+off[k][i]+.5)/rows;if(bitsAt(motif,x,yy)&(1<<k))v|=1<<k;}
```

### ② 經向條理：一條線一個元素，只有直的

畫面由等距的垂直條（經線／管珠線）組成，條與條之間露出 2px 的底（門後的暗）。每條上有細細的「珠縫」橫刻——那是唯一的橫向元素，且屬於材質不屬於圖。母題因此都是**縱向拉長**的。

```css
.cur{display:flex;background:#2A1622}
.cur i{width:5px;margin-right:2px;height:100%;transform-origin:50% 0;
 background-image:
  linear-gradient(90deg,rgba(255,255,255,.24),rgba(255,255,255,0) 45%,rgba(0,0,0,.2)), /* 絲光 */
  repeating-linear-gradient(180deg,transparent 0 8px,rgba(26,20,16,.42) 8px 9px),      /* 珠縫 */
  var(--g0);                                                                            /* 染缸色 */
 background-size:100% 100%,100% 9px,100% var(--unit);background-repeat:no-repeat,repeat-y,repeat-y;
 background-position:0 0,0 var(--sy,0px),0 var(--sy,0px)}
```

### ③ 染缸位元色：八色，全由「進過哪幾缸」決定

黃缸＝1、紅缸＝2、靛缸＝4。顏色查表，**不另外調色、不用透明度、不用漸層填色**。

```css
:root{
 --c0:#EFE4C8; /* 生絲（沒下缸）   */ --c1:#E8B21A; /* 黃               */
 --c2:#B3202E; /* 茜紅             */ --c3:#D0491F; /* 黃＋紅＝橙       */
 --c4:#26387A; /* 靛               */ --c5:#2F7A45; /* 黃＋靛＝綠       */
 --c6:#5B1F4A; /* 紅＋靛＝茄紫     */ --c7:#2A1622; /* 三缸＝墨         */
}
```

```js
/* 硬色標漸層：同色連續合併成一段，% 表示，任何高度都準 */
function grad(col){var s=[],a=0,n=col.length;for(var r=1;r<=n;r++)if(r===n||col[r]!==col[a]){
 s.push(COL[col[a]]+' '+(a/n*100)+'% '+(r/n*100)+'%');a=r;}return 'linear-gradient('+s.join(',')+')';}
```

### ④ 大型對稱母題，沿經線一直往下重複

母題大到佔滿一整幅布寬、**左右鏡像**、上下重複；母題外常圍一圈不同缸的「暈」（halo），暈與芯也各自錯位。六個基本母題：羊角 qoʻchqor shoxi、梳花 shona gul、鬱金香 lola gul、手鼓 doira gul、石榴 anor、護身符 tumor。以 SDF 定義，x 取絕對值即鏡像：

```js
/* 一個母題＝底色＋數層「形＋外暈」：[sdf, 芯色位元, 暈寬, 暈色位元]，後層蓋前層 */
qochqor:{g:4,L:[
 [(x,y)=>{var X=Math.abs(x);return Math.min(arc(X,y,.2,.34,.15,.045,-.3,4.2),circ(X,y,.2,.34,.05));},2,.05,1], // 羊角：紅芯黃暈
 [(x,y)=>dia(x,y,0,.7,.14,.24),6,.045,1],                                                               // 茄紫菱
 [(x,y)=>dia(x,y,0,.7,.05,.1),1,0,0]]}
```

### ⑤ 窄幅拼接＋布邊條

整面由 2–3 幅「窄布」並排，幅與幅之間是 8px 的接縫；每幅最外兩條是單色布邊（紅、黃），隔幅半錯（half-drop）讓花不會橫向對齊。掛起來的上方永遠有一根木桿。

```css
.cur .pan+.pan{margin-left:8px}             /* 接縫 */
.rod{height:16px;background:#6B3A1E;border-bottom:3px solid #4A2614}
.rod::before,.rod::after{content:"";position:absolute;top:-4px;width:22px;height:24px;background:#4A2614}
```

```html
<!-- 一面簾＝桿＋三幅；每幅一組母題、各自 half-drop -->
<div class="rod"></div>
<div class="cur" id="hero"></div>
<script>new PKU.Curtain(hero,{panels:[{m:['qochqor','anor'],drop:0},{m:['shonegul','lola'],drop:.5},{m:['tumor','daira'],drop:.2}],rows:56});</script>
```

## 色彩系統

| 色 | hex | 缸 | 用途 | 比例（範例站） |
|---|---|---|---|---|
| 生絲 | `#EFE4C8` | — | 首頁地、文字底、緯線 | 首頁 55% |
| 番紅黃 | `#E8B21A` | 1 | 暈、強調、按鈕（深底頁） | 8% |
| 茜紅 | `#B3202E` | 2 | 母題芯、hover | 10% |
| 橙 | `#D0491F` | 1+2 | 錯位滲色 | 3% |
| 靛 | `#26387A` | 4 | 母題地、資訊塊 | 10% |
| 綠 | `#2F7A45` | 1+4 | 莖、葉、錯位滲色 | 3% |
| 茄紫 | `#5B1F4A` | 2+4 | 母題芯 | 3% |
| 墨 | `#2A1622` | 1+2+4 | 門後暗、線縫 | 6% |
| 文字墨 | `#1A1410` | — | 內文 | 必要 |
| 桿 | `#6B3A1E`／`#4A2614` | — | 木桿 | 1% |

頁面地色也照缸：首頁生絲、〈花樣〉靛 `#1E2B5E`、〈對雲〉暗茜 `#7E1A26`——「一頁一缸」。

## 字體系統

- 中文標題：**Noto Serif TC 900**（Google Fonts），字距 .02em，行高 1.15。
- 中文內文：Noto Sans TC 400／500，16px／1.75；導言用 Noto Serif TC 500 17px／1.85。
- 拉丁與數字：**Philosopher 700**（Jovanny Lemonad；有西里爾字，與中亞的拉丁／西里爾雙文字環境相合），小標 12px、字距 .18em、全大寫。
- 字級：12／14.5／16／17／26／34／clamp(34–60px)／clamp(56–104px)。
- 零斜體、零 mono。

## 版面與網格

- 首頁開場：左 1.5fr 掛一整面簾（滿高），右 .86fr 是店名與資訊；簾的上方是木桿。
- 所有圖都是直條；**版面的分隔也優先用直線**（店史每一年是一條往下垂、長度不同的色線）。
- 表格只有橫向 2px 線（價目「一行一條經線」的例外：這是文字，不是圖）。
- 零旋轉、零圓角、零陰影。留白：區塊間 110px。
- ≤900px 單欄；≤560px 線距 5px、珠高 7px，導覽落到底部。

## 元件配方

- **導覽（流蘇 tassel-nav）**：右上固定一根 10px 小桿，垂三條珠線，線尾流蘇＋生絲標籤；現用頁那條染成該頁的缸色、垂到 62px；hover 時那條擺一下（`@keyframes sway` 11°→−7°→4°→−2°）。≤560px 變成底部三等分墨色列。
- **按鈕**：墨底生絲字、Noto Serif 900、零圓角；hover 換茜紅。次要按鈕是 2px 內框。
- **單選（染缸切換）**：2px 外框的分段列，每段前面一條 8×22px 缸色條；選中反白。
- **價目表**：`th` 拉丁小標；數字 Philosopher 700 19px 靠右。
- **資訊塊**：靛底生絲字，標籤用黃。
- **頁尾**：上方 6px 實線；虛構聲明一律寫在這裡。

## 動效規則

| 種類 | 本站自製實作 | 觸發 | 參數 | 減少動態時 |
|---|---|---|---|---|
| ambient 環境 | **風**：每條線是一支阻尼擺，受兩層一維 value noise 風力（t·.23、t·1.1） | 自動、離屏停 | K=17、阻尼 2.3、鄰線耦合 7、風 .55 | 靜止；花與錯位照樣在 |
| input 輸入 | **撥簾**：游標／手指在簾內，附近的線被推開讓路（目標角＝(px±24−x₀)/py，彈簧 150） | pointermove／down，<16ms | 讓路半徑 24px、最大角 .7rad | 改成最近一條線提亮 1.2 |
| transition 轉場 | **落簾**：換頁時目的頁那一缸的色，24 條一束三條、束與束差 0–160ms 從上方落下（420ms），到站後再往下拉走（520ms）；〈花樣〉切缸時每條線由左而右依錯位延遲重染 | 點內部連結／切缸 | `cubic-bezier(.5,0,.75,0)` 落、`(.6,0,.3,1)` 收 | 直接換頁／一次重染 |
| signature 簽名 | **穿簾起雲 part-the-cloud**：線擺動時，角速度帶動 `background-position-y` 沿線滑移（滑移量＝ω×11px，上限 3 顆珠），珠子沿線滑、花的邊就再糊一次；停下來後彈回原本的錯位 | 撥簾、風、遊戲中拖線 | 滑移跟隨係數 .18／幀 | 不滑；靜態錯位就是答案 |

〈對雲〉遊戲另有：被吹亂時每條線 `rotate` 阻尼擺 900ms、拖完吸附到整顆珠（`background-position .32s cubic-bezier(.3,1.4,.5,1)`）。

### motion-library 元件（1.37.0 @b655b9df）

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-19 | Text Flag | 簾 | text「縛雲珠簾」・primary `#B3202E`・secondary `#E8B21A`・bg `#EFE4C8`・duration 4・loop・intensity .8・seed 1984・16:9 | ambient | 店名像一幅掛著的布被風吹：逐字相位波、波幅隨時間收斂，正是簾的動法；生絲底使字自動取近黑 |
| BG-B-22 | Stripe Twist | 簾 | primary `#B3202E`・secondary `#E8B21A`・bg `#26387A`・duration 9・density 1.3・intensity .9・seed 73 | ambient | 頁尾一條 150px 布邊：一列 4px、每列橫移一點的紅黃條紋＝條紋 adras 的「火焰條」；全是 fillRect、零圓角零發光 |
| TXT-A-35 | Stripe Mask | 花樣 | text「六種花樣」・primary `#E8B21A`・bg `#1E2B5E`・duration 1.6・loop:false・seed 6 | transition | 標題被 14 條直條一條一條揭開＝經線一條一條掛上；靛底使字自動取近白 |
| BG-B-16 | Weave Grid | 花樣 | primary `#EFE4C8`（緯）・secondary `#B3202E`（經）・bg `#1E2B5E`・duration 8・density 1.4・intensity .8・seed 19・1:1 | ambient | adras「絲經棉緯」的平紋：生絲緯線不染、紅經線染色，配合「只染直的」段落 |
| TXT-B-34 | Jitter Settle | 對雲 | text「對雲」・primary／secondary `#E8B21A`・bg `#7E1A26`・duration 1.8・loop:false・seed 24 | transition | 字一開始亂抖、最後歸位＝錯位的線被對回來，也就是遊戲本身 |

開發 prompt 出處：`MotionLib.prompt(id)`。掛載規則：`document.fonts.ready` 後才掛、離屏 `destroy()`、一次性文字播一次後 `seek(1)`、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`。減少動態：背景 `seek(.35)` 停格、文字 `seek(1)`。未選：所有 SHP（底圖為 `softGrid` 方格紙，跟經線打架）、BG-A-30 Column Shift（`rr()` 圓角方塊，ikat 零圓角）。

## 插畫與圖像風格

技法代號 `abr-strand-raster` 簾線雲紋：全站零插畫檔。所有圖都是「一條線一個元素」的珠簾——六個母題各以數層 SDF 定義，建置期與執行期共用同一份 `core.js`。無 JS 時，每一面簾以同一套核心在建置期算出的低解析 PNG（一條線一像素、一顆珠一像素，`image-rendering:pixelated` 放大）當背景，畫面相同只是不會動。禁止任何 SVG 描邊插圖、禁止照片。

## Logo 與 Favicon 設計指南

- Logo（`assets/logo.svg`）：左邊七條直條排成一顆菱形——外黃（第一缸）、內紅（第二缸），而每條的紅芯上下錯開一點；上方一根木桿；右邊「縛雲珠簾」Noto Serif TC 900＋茜紅 Philosopher「PA̍K-HÛN · 1973」。
- Favicon：同一顆七條菱形放在靛底 32×32，inline SVG data URI。
- 任何縮小版本都保留「芯錯開」——那就是這個品牌。

## Do & Don't

**Do**
- 每一缸各自錯位；錯位以「束」為單位。
- 母題大、左右對稱、往下重複；幅與幅半錯。
- 顏色只從八色表取；要更多變化就加一缸，不要調色。
- 讓使用者碰得到「糊」：撥簾、拖線、切缸。

**Don't**
- 不要用 `filter: blur()`、漸層羽化或半透明去「做糊」——糊是錯位，不是模糊。
- 不要橫線、不要描邊輪廓、不要斜線。
- 不要把錯位做成每條線隨機——那是雜訊，不是束。
- 不要紫藍漸層、置中三卡、emoji、Lorem ipsum、「EST. 19xx」徽章。
- 不要把它做成「民族風拼貼素材」：沒有駱駝、沒有清真寺剪影、沒有沙漠。
- 與相近條目的分界：**銘仙ほぐし絣**（`thai-ping-ting`）是經線先印再織的大正和服，圖案西化、色偏粉彩；**蠟染 batik**（`phainn-kin`）是蠟防染在布面、裂紋是特徵；**荷蘭蠟印布**是滿版印花、無錯位；**Kente**是織出來的幾何條帶、無防染。本條目＝紮線防染＋多缸疊色＋經向錯位。

## 頁面骨架範例

```html
<nav class="tas" aria-label="主要">
 <a href="index.html" aria-current="page" style="--c:#EFE4C8"><span class="cd"></span><span class="ts"></span><span class="lb">簾<small>PARDA</small></span></a>
 <a href="hue-iunn.html" style="--c:#EFE4C8"><span class="cd"></span><span class="ts"></span><span class="lb">花樣<small>NAQSH</small></span></a>
</nav>
<section class="hero">
 <div class="hang">
  <div class="rod" aria-hidden="true"></div>
  <div class="cur" id="hero-cur" role="img" aria-label="一面三幅的 ikat 珠簾">
   <div class="door"><b>工作間</b><span>今天在染：二缸 茜紅</span></div>
  </div>
 </div>
 <div class="aside">
  <span class="k">彰化和美・管珠門簾</span>
  <h1>縛雲珠簾</h1>
  <p class="lead">花樣先排在每一條線上，掛起來才看得見——每一束線都故意錯一兩顆珠。</p>
  <a class="btn" href="hue-iunn.html">看六種花樣</a>
 </div>
</section>
<script>
new PKU.Curtain(document.getElementById('hero-cur'),{panels:[{m:['qochqor','anor']},{m:['shonegul','lola'],drop:.5}],rows:56,seed:1984,amp:1});
</script>
```

## 技術實作與相容性

### 1. 硬色標 `linear-gradient()` 程序化經線（A 渲染層「conic/radial gradient 程序化圖樣」）

每條線是一個 `<i>`，它的 `--g0` 是一串同色合併的硬色標（雙位置色標 `#B3202E 30% 38.333%`），`background-size:100% var(--unit)`＋`repeat-y` 讓一個母題單位一直往下重複；珠縫是第二層 `repeating-linear-gradient`。
- 支援：MDN `<gradient>` Baseline Widely available（2015-07 起）；同位置兩色標＝硬邊。雙位置色標寫法 Firefox 64+／Chrome 71+／Safari 12.1+（caniuse「linear-gradient double-position」）；更舊的瀏覽器整條 `background-image` 失效 → 該條線只剩底色，但無 JS／舊瀏覽器另有 PNG 備援。
- 實測（node 22，冷啟動含 JIT）：首頁 120 條線取樣＋產生漸層合計 12.7ms，每條漸層字串平均 0.43KB。

### 2. requestAnimationFrame 阻尼擺＋鄰線耦合＋滑移（B 動效與時間軸層「rAF 物理積分」）

每幀兩個半步的半隱式 Euler：`F=-K·a-C·ω+KC·(左右鄰角差)+風+撥簾`，ω·dt≈0.1 穩定。只在角度變化 >.0004rad 時寫 `transform`、滑移變化 >.35px 時寫 `--sy`；離屏（IntersectionObserver）與分頁隱藏時整個迴圈停。
- 支援：`requestAnimationFrame`、Pointer Events、IntersectionObserver 皆 Baseline Widely available。
- 減少動態：不啟動迴圈；撥簾改成最近一條線 `filter:brightness(1.2)`。
- 實測（node 模擬 120 條 × 2 半步 × 600 幀）：物理本身 0.012ms／幀；瀏覽器主要成本是 120 個 `transform` 合成，無版面重排（只動 transform 與 background-position）。

### 3. URL 狀態序列化＋決定性偽隨機（E 資料與生成層）

〈對雲〉的整副簾＝`?m=<母題>&s=<seed>&o=<24 個 base36 字元>`（每字元＝錯位＋12）。xorshift32 由 seed 決定每束 abr 與吹亂量，同一個網址在任何裝置得到同一副簾；贏了以 `history.replaceState` 寫回網址，可複製分享，打開即唯讀顯示「別人對好的一副」。
- 支援：`URLSearchParams`、`History.replaceState()` Baseline Widely available（MDN；replaceState 自 2015-07）。`navigator.clipboard` 不可用時退回 `execCommand('copy')`，再不行就讓使用者自己選取輸入框。

### 效能

| 頁 | 大小（含 motion-library 子集 171KB） | 首屏 JS（建線＋掛載） |
|---|---|---|
| index.html | 205KB | 建線 ≈13ms＋元件掛載（等字型後） |
| hue-iunn.html | 207KB | 6 面簾約 150 條，與首頁同級 |
| tui-hun.html | 203KB | 24 條＋96px 樣本，<5ms |

查證來源：MDN〈`<gradient>`〉〈linear-gradient()〉、caniuse〈linear-gradient double-position color stops〉、MDN〈History: replaceState()〉、web-features explorer〈History〉。
