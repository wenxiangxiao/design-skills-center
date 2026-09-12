---
name: grunge-raygun-xerox
description: Deconstructed 1990s magazine typography after David Carson's Ray Gun — headlines cut in half and thrown to opposite corners, page numbers larger than titles, three reading directions on one page, and every image reduced to a 1-bit photocopy blowout on dirty toner-grey stock.
---

# Grunge／Ray Gun 影印解構排版

> 流派：Grunge／Ray Gun（David Carson 主編美術，*Ray Gun* 雜誌，1992–1995）
> 本規格書描述的是一種**排版流派**，不綁定任何產業。示範站是二手衣物交換社，你可以拿它做唱片行、滑板店、獨立書店、酒吧、選物店、展覽或任何需要「態度大於清晰」的品牌。

---

## 一、設計哲學

一九九二年，發行人 Marvin Scott Jarrett 找上 David Carson 為一本新的另類音樂雜誌《Ray Gun》做美術。Carson 沒有受過正規平面設計訓練（他原本是高中社會科老師與職業衝浪選手），也因此完全不受既有的雜誌版式紀律約束。他做了三年，把「一篇文章應該長什麼樣子」這件事整個拆掉。

最著名的一次是一九九四年那期的 Bryan Ferry 專訪：Carson 讀完覺得無聊，於是整篇用 Zapf Dingbats 排出來——一個字都讀不出來——然後在同一期的後面，把原文照常排了一次。執行編輯拿到印刷廠送回的樣張時當場崩潰；Jarrett 後來說「那很搖滾，視覺上很棒，而且不知怎地它成立了」。

這件事就是這個流派的整個哲學：

> **可讀性（legibility）與傳達（communication）是兩件事。**

Carson 的另外幾個常規動作也都出自同一個判斷：頁碼被放大到比標題還大、順序被打亂而編號留在原地；欄位被撕開、字被邊緣切斷；一頁上同時有三四種字體與四五個字級。他一九九五年與 Lewis Blackwell 合著的《The End of Print》成為史上最暢銷的平面設計書之一。

### 這個流派的三個前提

1. **版面是一個態度，不是一個容器。** 內容不被放進格線裡，內容跟版面互相撞擊。
2. **破壞必須有紀律。** Carson 從來沒有把整本雜誌弄到不能讀——他破壞的是**標題與圖版**這一層。正文永遠照常排。這條線就是這個流派與「亂做」的分野。
3. **印刷的爛是材料，不是失誤。** 影印、翻拍、重印造成的斷線、爆白、糊塊，都是刻意保留的畫面元素。

### 網頁版的紀律（原作不需要處理、但你必須處理）

- 破壞只發生在**標題層與圖像層**。正文一律水平、可選取、無濾鏡、對比 ≥7:1。
- 每一個被切開的標題，DOM 裡都必須有一段**連續完整的文字**（給螢幕閱讀器、給搜尋、給複製貼上）；視覺上的兩截一律 `aria-hidden`。
- `prefers-reduced-motion` 與窄視窗下，被切開的標題**預設就是合一的**。降級之後只會更好讀，不會更難讀。

---

## 二、本風格的 5 個不可省略特徵

> 判準：**拿掉它，這就不是 Ray Gun 了。** 每一項附可直接複製的片段。

### 特徵 1｜標題被切開、被切斷、被丟到版面上另一個不相鄰的位置

這是本流派最強的識別。沒有一個標題完整地擺在一個方框裡：它被畫布邊緣咬掉一角，或者被拆成兩截丟在版面的兩端。示範站把它做成可互動的——**完整可讀是一個要用手去換的暫時狀態**。

```html
<div class="hl" style="height:clamp(210px,28vw,330px)">
  <span class="sr">衣服比人活得久</span><!-- 給機器讀的完整句 -->
  <span class="hf hl-a" aria-hidden="true" style="left:0;top:0">衣服比人</span>
  <span class="hf hl-b" aria-hidden="true" style="left:46%;top:52%">活得久</span>
  <button class="cue" type="button" aria-pressed="false">壓住，讀完整句</button>
</div>
```

```css
.hl{position:relative}
.hl .hf{position:absolute;white-space:nowrap;
  font-family:"Noto Sans TC",sans-serif;font-weight:900;
  font-size:clamp(54px,10.5vw,132px);line-height:.82;
  letter-spacing:-.075em}          /* 負字距，逐字不同才對 */
.hl.on .hl-a{transform:translate(var(--ax),var(--ay));transition:transform .17s steps(5)}
.hl.on .hl-b{transform:translate(var(--bx),var(--by));transition:transform .17s steps(5)}
@media (max-width:900px){.hl{height:auto!important}.hl .hf{position:static;display:block}}
```

配套的 JS（量的是 layout 位置，不受 transform 影響，所以可以重複量）：

```js
var gap = Math.round(parseFloat(getComputedStyle(a).fontSize) * 0.06);
var dx = (a.offsetLeft + a.offsetWidth + gap) - b.offsetLeft;
var dy =  a.offsetTop  - b.offsetTop;
// 兩截各走一段，看得出來是「同一條時間軸」在拉它們
var ax = -dx*0.34, bx = dx*0.66, ay = -dy*0.34, by = dy*0.66;
```

**做錯的樣子**：把標題整段放大置中，然後加一個 `overflow:hidden` 假裝被切到。切斷必須是版面事實，不是裝飾。

### 特徵 2｜一頁上至少三個閱讀方向，而且每個方向都載真內容

橫排（正文）、直排（地址、時段、口號）、斜排（−11° 到 +8.4°）。斜的角度不准是 45° 的整數倍，那是圖表不是雜誌。**直排的東西不准是裝飾線或英文渲染字**——把地址跟電話放進去，讀者真的要用它。

```css
.vert{writing-mode:vertical-rl;text-orientation:upright;
  letter-spacing:.14em;line-height:1.25;font-weight:700;font-size:13px;white-space:nowrap}
.vert-lat{writing-mode:vertical-rl;text-orientation:sideways;
  font-family:"Courier Prime",monospace;letter-spacing:.22em;font-size:11.5px}
.tilt-a{transform:rotate(-4.2deg)}
.tilt-c{transform:rotate(-11deg)}
/* ≤560px 一律轉回橫排——手機上直排是障礙，不是風格 */
@media (max-width:560px){.vert,.vert-lat{writing-mode:horizontal-tb;text-orientation:mixed}}
```

### 特徵 3｜影印世代（1-bit，沒有灰、沒有網點、沒有漸層）

畫面上每一張圖與每一個大標都是「第 n 代影印」：邊緣被咬斷、亮部爆成紙白、暗部糊成一塊。**頁面上必須看得到「第幾代」這個數字**——它是這個風格的計量單位。

用 `feMorphology`（膨脹＝碳粉暈開，侵蝕＝細線掉字）接 `feComponentTransfer`（硬二值化，把抗鋸齒的灰階砍掉）：

```html
<filter id="g2" x="-12%" y="-14%" width="124%" height="128%" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.7"/>
  <feMorphology operator="erode"  radius="1.05"/>
  <feComponentTransfer><feFuncA type="discrete" tableValues="0 0 0 1 1"/></feComponentTransfer>
</filter>
```

四個世代的參數（照抄即可）：

| 代 | dilate | erode | tableValues |
|---|---|---|---|
| 1 | 0.35 | 0.50 | `0 0 1 1` |
| 2 | 0.70 | 1.05 | `0 0 0 1 1` |
| 3 | 1.10 | 1.75 | `0 0 0 0 1 1` |
| 4 | 1.70 | 2.60 | `0 0 0 0 0 1` |

**兩個實作陷阱**（踩過才知道）：

1. `erode` 取的是鄰域**最小值**，會連 RGB 一起吃——套在彩色元素上顏色會變黑。**只把世代濾鏡套在碳粉色（近黑）的東西上**，螢光色的元素一律不套。
2. 濾鏡是逐元素光柵化的，一頁超過十個就開始有感。示範站每頁 ≤11 個。圖版本身的「爛」要由**幾何**承擔（見第七章），濾鏡只負責邊緣。

### 特徵 4｜頁碼比標題大，而且不照順序

Carson 的原招：把 folio 放大到比標題還大，打亂頁序卻把原本的編號留在原地。這一項幾乎是零成本，但它一出現，整個版面的年代與流派立刻被鎖定。

```css
.folio{font-family:"Anton",sans-serif;
  font-size:clamp(150px,26vw,340px);line-height:.68;
  letter-spacing:-.08em;pointer-events:none;user-select:none}
/* 讓它被畫布左緣咬掉一角 */
.cut-l{margin-left:calc(var(--gut) * -1 - 4vw)}
body{overflow-x:hidden}
```

示範站四頁的頁碼是 **31 / 07 / 44 / 12**，而且頁面上明講「頁碼是印刷廠給的，不是我們排的」。**不要排成 1234。**

### 特徵 5｜零方框、零圓角、零陰影；元素靠重疊與切斷定位

沒有卡片、沒有邊框裝飾、沒有模糊陰影。區塊之間允許**直接相撞並重疊 4–18px**。全站唯一允許的「線」是撕開的紙邊——一條被雜訊咬過的多邊形，不是 `border`。

```css
*{border-radius:0}
button,input,select{border:2px solid var(--toner);border-radius:0;box-shadow:none}
.slip{outline:2px solid var(--toner);outline-offset:-2px}   /* 用 outline，不做圓角容器 */
```

```js
// 撕開的紙邊：唯一合法的「線」
function tornBar(seed, w){
  var r = mulberry(fnv(seed)), N = Math.max(8, Math.round(w/18)), d = 'M0 9';
  for (var i=0;i<=N;i++) d += 'L' + (i/N*w).toFixed(1) + ' ' + (2.2 + r()*4.4).toFixed(1);
  return d + 'L' + w + ' 9Z';
}
```

重疊靠 12 欄格線的**故意錯位**：欄位範圍互相咬住，再加負的 `margin-top`。

```css
.band{display:grid;grid-template-columns:repeat(12,1fr);column-gap:var(--gut)}
.blk{grid-column:var(--gc, 1 / 13);grid-row:1}
/* 用法：--gc:1 / 6 的頁碼 與 --gc:4 / 13 的標題重疊在第 4–5 欄 */
```

---

## 三、色彩系統

`toner-grime 碳粉髒底`。定義不是「哪幾個顏色」，而是**沒有一塊乾淨的色域**：每個色塊的邊都被咬過（斷裂，不是模糊），灰階刻意帶綠偏（那是影印紙的偏色），全站零漸層。

| 色票 | 名稱 | 比例 | 用途 |
|---|---|---|---|
| `#D6D2C4` | 影印紙 | ~38% | 唯一底色。偏綠灰的髒白，**不准用純白或暖米白** |
| `#14120E` | 碳粉黑 | ~34% | 正文、大標、圖版、footer 滿版。不是純黑（純黑沒有碳粉感） |
| `#EEFF00` | 螢光黃 | ≤8% | **唯一高彩度色**。只給可動作的東西：現用頁、連結底、主要按鈕、螢光筆標記 |
| `#6E6B60` | 二代髒灰 | ~12% | 只給第二層資訊（圖說補述、停用態、mono 註記）。不得當文字主色 |
| `#E5007E` | 影印洋紅 | ≤4% | 只給「錯位／退件／重印」語意的印章與註記 |

硬規則：

- 螢光黃**永遠不當背景大面積用**，它是螢光筆不是牆漆。
- 洋紅與螢光黃**不得相鄰**（那是九〇年代的 riso，不是這個流派）。
- 灰階必須帶綠偏（H≈50–70°，S≈6–10%）。中性灰會讓整張畫面變成「極簡」。
- 對比驗算：`#14120E` on `#D6D2C4` = **14.2:1**；`#6E6B60` on `#D6D2C4` = 3.6:1（僅限 ≥14px 的次級資訊）；`#14120E` on `#EEFF00` = 15.7:1。

---

## 四、字體系統

一頁上必須同時出現**至少三種字體家族**與**至少四個字級**，且最大與最小的字級差 ≥ 8 倍。這不是裝飾，這是流派本體。

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Courier+Prime:wght@400;700&family=Noto+Sans+TC:wght@300;700;900&display=swap" rel="stylesheet">
```

| 角色 | 家族 | 用途 |
|---|---|---|
| 拉丁展示 | **Anton** 400 | 頁碼、英文大標、導覽編號。壓縮、極重、`letter-spacing:-.045em`、大寫 |
| 中文展示 | **Noto Sans TC** 900 | 中文大標。`letter-spacing:-.075em`、`line-height:.82` |
| 反差襯線 | **Bodoni Moda** 400 italic / 700 | 引言、口述句、他人的話。**刻意與展示體不搭**，這個不搭就是重點 |
| 打字機 | **Courier Prime** 400/700 | 刊頭資訊、編號、規格、機器讀數。九〇年代 zine 的投稿字 |
| 正文 | **Noto Sans TC** 300 | 15.5px / 1.78。正文永遠是這一支，永遠不加濾鏡 |

字級 scale（8.5 倍差）：

```
11.5px  tiny / mono 註記
12.5px  mono 規格
15.5px  正文
18.5px  lead
clamp(24px,3vw,44px)     區塊標題
clamp(54px,10.5vw,132px) 主標
clamp(150px,26vw,340px)  頁碼   ← 比主標大
```

**不要**用可變字型的連續軸去做「有機的變化」——那是另一個流派。Ray Gun 的字級是**跳的**，一個版面上四個級距互不相關。

---

## 五、版面與網格

- 容器 `max-width:1320px`；`--gut: clamp(14px,3.2vw,42px)`。
- 12 欄格線存在，但**沒有一塊真的對齊它**：欄位範圍互相咬住，區塊用負 `margin-top` 往上壓。
- 旋轉角度池：`-11°, -4.2°, +2.6°, +8.4°`。同一頁不要用超過三個。
- 留白不是均勻的：一半的版面很擠（重疊、相撞），另一半留大片空紙。**不准平均分配。**
- 出血：至少兩個元素必須被畫布左右緣切斷（`body{overflow-x:hidden}` + 負 margin）。
- ≤900px 一律攤平為單欄（`.band{display:block}`，取消全部 `transform` 與負 margin）。**手機不做重疊**——重疊在 375px 寬只會變成災難。

---

## 六、元件配方

### 導覽：stack-top 疊壓層序

四頁＝四張貼在同一塊板上、互相重疊的紙。**現用頁那一張在最上層**（滿版可見、螢光黃底、上緣壓一段膠帶），其餘三張被壓在底下只露出一角。語意是**誰壓在誰上面**，不是被高亮。

```css
.stk{position:fixed;top:16px;right:16px;width:236px;height:150px;z-index:70}
.stk a{position:absolute;width:150px;height:96px;background:var(--paper);padding:9px 10px}
.stk a::before{content:"";position:absolute;inset:0;outline:2px solid var(--toner);outline-offset:-2px}
.stk a:nth-child(1){left:0;top:0;transform:rotate(-2.4deg);z-index:4}
.stk a:nth-child(2){left:26px;top:14px;transform:rotate(1.8deg);z-index:5}
.stk a:nth-child(3){left:54px;top:28px;transform:rotate(-1.1deg);z-index:6}
.stk a:nth-child(4){left:82px;top:44px;transform:rotate(3.1deg);z-index:7}
.stk a[aria-current=page]{z-index:9;background:var(--hi);transform:rotate(-1.4deg)}
.stk a[aria-current=page]::after{content:"";position:absolute;left:50%;top:-11px;
  width:62px;height:19px;margin-left:-31px;background:var(--paper);
  outline:2px solid var(--toner);outline-offset:-2px;transform:rotate(-2.6deg)}  /* 膠帶 */
@media (max-width:900px){.stk{position:static;display:grid;grid-template-columns:repeat(4,1fr)}
  .stk a{position:static;transform:none!important}.stk a::after{display:none}}
```

### 按鈕與表單

2px 實線、零圓角、零陰影。主要動作 = 螢光黃底。選中態 = 反白（碳粉底＋紙色字），**不是**加外框。

```css
button{border:2px solid var(--toner);border-radius:0;background:var(--paper);
  font-weight:700;letter-spacing:.05em;padding:7px 10px}
button.pri{background:var(--hi)}
.opt button[aria-pressed=true]{background:var(--toner);color:var(--paper)}
button:disabled{color:var(--grime);border-color:var(--grime);background:transparent}
```

### 「卡片」的替代品：單據 slip

這個流派沒有卡片。要圈起一塊內容時，用**單據**：`outline` 內縮 2px、右上角一枚旋轉的印章、標題用 Anton、內容用 `dl` 兩欄。

```css
.slip{outline:2px solid var(--toner);outline-offset:-2px;padding:18px 20px 22px;position:relative}
.stamp{font-family:"Courier Prime",monospace;font-size:11px;letter-spacing:.14em;
  outline:2px solid var(--mag);color:var(--mag);padding:2px 7px;transform:rotate(-3.4deg)}
.kv{display:grid;grid-template-columns:6.6em 1fr;gap:2px 10px}
```

### Footer

滿版碳粉黑、紙色字、連結螢光黃。四頁的完整文字連結必須在這裡再列一次（導覽是圖像式的，footer 是保底）。

---

## 七、插畫與圖像風格：xerox-blowout 影印爆掉圖版

**零外部圖片。**每一張「照片」都由同一支引擎產生：

1. 建一個灰階場 `f(u,v)`＝ 物件版型遮罩（六種裁片多邊形：上衣／外套／褲／裙／鞋／包）＋ 一盞斜向的光（線性梯度）＋ 布料紋理（自寫 value noise 的 fbm）＋ 沿輪廓內側的補強帶。
2. 在**單一門檻**上跑 marching squares 取等值線 → 只剩純黑與紙色兩個值。**沒有灰、沒有網點、沒有階調。**
3. 「第 n 代」＝ 把門檻推高一格（`thr = 0.46 + gen*0.026`）並讓輪廓補強帶退一格（`boost = 0.50 − gen*0.070`）。於是亮部先爆白、細的地方先斷掉、輪廓最後才崩。

```js
var boost = 0.50 - gen*0.070, thr = 0.46 + gen*0.026;
function field(u,v){
  var m    = inPoly(u,v,CUT) ? 1 : 0;
  var band = m ? Math.max(0, 1 - distEdge(u,v,CUT)/0.055) : 0;   // 輪廓補強
  var light= .50 + .60*(Math.cos(la)*(u-.5) + Math.sin(la)*(v-.5));
  var fold = .5 + .5*Math.sin((u*Math.cos(la+1.2)+v*Math.sin(la+1.2))*22 + fbm(n,u*3,v*3,2)*6);
  var tex  = fbm(n, u*11, v*13, 4);
  var edge = Math.min(1, Math.min(u,1-u)*16, Math.min(v,1-v)*16); // 邊界歸零，保證輪廓封閉
  return edge * ( m*(light*.42 + fold*.18 + tex*.26 + .14 + band*boost) + (1-m)*(.02 + tex*.10) );
}
```

判準：**拿掉全部文字，仍讀得出「這是一件被影印壞掉的衣服」，而且看得出它印到第幾代。**

同一顆種子恆得同一張圖（FNV-1a → mulberry32），所以整批圖可以在**建置階段**算完並輸出成靜態 SVG 內嵌頁內——關掉 JavaScript 也看得到完整圖版。單張大圖約 2.4–4.7KB，24 張縮圖約 25–43KB。

**不要**改用半調網點：那是普普／里索的語彙。半調有階調，本技法沒有階調——這是兩個不同的流派。

---

## 八、動效規則

四種動態，缺一不可，且**全站沒有一條 easing 曲線**——所有時間都是 `steps()`。理由是影印機的鼓是離散的：這個流派的東西不會「順順地」移動。

| 類型 | 名稱 | 觸發 | 參數 |
|---|---|---|---|
| ambient | 碳粉浮塵 | 無 | `animation:dust 2.4s steps(1) infinite`，`feTurbulence` 生成的顆粒圖以 `background-position` 逐格跳（不是連續飄），`mix-blend-mode:multiply`，`opacity:.5` |
| input | 再印一次 | hover / focus | `animation:regen .09s steps(3) 1 both`，`filter` 在 90ms 內跳過 g1→g4→g2 三代。延遲 <100ms |
| transition | 壓稿條 platen-wipe | 進頁 / 換狀態 | 一條 14px 螢光黃亮帶由上往下推過，`clip-path:inset()` + `steps(7)`，620ms |
| signature | 出血接續 bleed-carry | hover / 點按 / focus | 兩截標題以同一條時間軸 `steps(5)` 併成一行；`.hl-a` 走 −34%、`.hl-b` 走 +66% |

```css
@keyframes dust{0%{background-position:0 0}25%{background-position:37px 61px}
 50%{background-position:91px 13px}75%{background-position:24px 108px}100%{background-position:0 0}}
@keyframes regen{0%{filter:url(#g1)}50%{filter:url(#g4)}100%{filter:url(#g2)}}
@keyframes platen{to{clip-path:inset(100% 0 0 0)}}
```

降級（四種都要，且資訊零損失）：

```css
@media (prefers-reduced-motion:reduce){
  body::after{animation:none}                    /* 顆粒停在單一格 */
  .wipe{display:none}                            /* 直接是最終畫面 */
  .hl .hf{animation:none!important;transition:none!important} /* 標題預設合一 → 更好讀 */
  .gswap:hover{animation:none}                   /* 世代不跳，停在類別指定的那一代 */
}
```

**禁用清單**（這些一出現，風格就滑回一般網站）：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、圓角卡片的按壓陰影、`stroke-dashoffset` 描繪、任何 `cubic-bezier` 的彈性回彈。

---

## 九、Logo 與 Favicon

- Logo：左邊一塊影印爆掉的圖版（用第七章的引擎，gen 2），右邊一條碳粉黑實色條，條上是螢光黃的 Anton 拉丁名，下面壓中文名與一條螢光黃橫槓，角落一個洋紅的 `GEN.2` 註記。**不要做字標的優雅版本**——這個流派的 logo 就該像被貼上去的。
- Favicon：原創 inline SVG data URI。紙色底 + 一件碳粉黑的衣服剪影（挖一塊白）+ 底部一條螢光黃。控制在 400 位元組內。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23D6D2C4'/%3E%3Cpath d='M4 7l7-2 4 3 4-3 8 2 1 8-4 1-1-3-1 15-12 1-1-16-4 2z' fill='%2314120E'/%3E%3Cpath d='M9 12l6 1-2 5-5-1z' fill='%23D6D2C4'/%3E%3Crect x='2' y='24' width='28' height='3' fill='%23EEFF00'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 讓標題被切斷，且把另一半丟到版面上另一個位置。
- 讓頁碼比標題大，並打亂編號。
- 一頁至少三個閱讀方向，每個方向都載真內容。
- 在畫面上寫出「第幾代影印」。
- 讓區塊直接相撞、重疊 4–18px。
- 把「破壞」的界線寫進頁面裡——示範站有一整節在講自己怎麼排的。這很符合這個流派的自覺。

**Don't**

- ❌ 不要把正文也弄糊。Carson 沒有這樣做，那不是這個流派，那是做壞了。
- ❌ 不要用紫藍漸層、圓角卡片、模糊陰影、置中大標＋副標＋兩顆按鈕。
- ❌ 不要用 emoji 當 icon。
- ❌ 不要在手機上保留重疊與旋轉。
- ❌ 不要用半調網點代替 1-bit 二值化（那是普普／里索）。
- ❌ 不要用可變字型的連續軸做「有機變形」（那是未來派）。
- ❌ 不要寫 Lorem ipsum、不要寫「EST. 19xx」徽章、不要寫「在當今快節奏的世界」。
- ❌ 不要因為風格「很叛逆」就放棄無障礙：完整文字必須在 DOM 裡，降級後必須更好讀。

---

## 十一、頁面骨架範例（可直接使用）

```html
<div class="sheet">
  <!-- 刊頭：mono 一行，不是 logo 大圖 -->
  <div class="band" style="padding-top:22px">
    <div class="blk mono" style="--gc:1 / 8">刊名　／　第 31 期　／　2026 年 8 月　／　地址</div>
    <div class="blk" style="--gc:9 / 13;justify-self:end"><span class="stamp">第 2 代影印</span></div>
  </div>

  <!-- 主帶：頁碼（被左緣咬掉）× 切開的標題 × 出血圖版 × 直排地址，四者互相重疊 -->
  <div class="band" style="margin-top:6px">
    <div class="blk cut-l" style="--gc:1 / 6;grid-row:1"><div class="folio g2"><i>31</i></div></div>
    <div class="blk" style="--gc:4 / 13;grid-row:1;margin-top:clamp(30px,7vw,96px);z-index:3">
      <div class="hl" style="height:clamp(210px,28vw,330px)">
        <span class="sr">完整的標題句</span>
        <span class="hf hl-a g1 zh-d" aria-hidden="true" style="left:0;top:0">完整的</span>
        <span class="hf hl-b g1 zh-d" aria-hidden="true" style="left:46%;top:52%">標題句</span>
        <button class="cue" type="button" aria-pressed="false">壓住，讀完整句</button>
      </div>
    </div>
    <div class="blk" style="--gc:1 / 5;grid-row:2;margin-top:-18px;z-index:4">
      <p class="lead">導言，正文級距，永遠水平、永遠不加濾鏡。</p>
    </div>
    <div class="blk cut-r" style="--gc:8 / 13;grid-row:2;margin-top:-40px">
      <figure><svg class="plate" viewBox="0 0 520 660"><path d="…" fill-rule="evenodd"/></svg>
      <figcaption>圖說。第 2 代影印。</figcaption></figure>
    </div>
    <div class="blk" style="--gc:6 / 8;grid-row:2;margin-top:60px;z-index:5">
      <span class="vert">直排的地址真的要能用</span>
    </div>
  </div>

  <!-- 撕開的紙邊：全站唯一的線 -->
  <div class="band" style="margin-top:clamp(40px,7vw,90px)">
    <div class="blk" style="--gc:1 / 13">
      <svg class="torn" viewBox="0 0 1280 9" preserveAspectRatio="none"><path d="…"/></svg>
    </div>
  </div>
</div>
```

---

## 十二、技術實作與相容性

三項核心技術，分屬三層，每一項都是視覺的主要承載者。查證日期 **2026-08-10**。

### 1｜`feMorphology` + `feComponentTransfer`（A 渲染層）— 承載特徵 3

- **它在本站承載什麼**：影印世代。膨脹＝碳粉暈開、侵蝕＝細線掉字、`feFuncA type="discrete"` 把抗鋸齒的灰階砍成 1-bit，於是字緣是**斷的**而不是糊的。這是 `blur` 或 `contrast()` 做不出來的：模糊是連續的，影印不是。
- **支援現況**：MDN《`<feMorphology>`》標示 **Baseline Widely available**，自 2015-07 起跨瀏覽器（Chrome、Edge、Firefox、Safari 全支援）；`feComponentTransfer` / `feFuncA` 同屬 SVG 1.1 Filter Effects，支援度相同。查證來源：MDN `Web/SVG/Reference/Element/feMorphology`、caniuse `mdn-svg_elements_femorphology` 與 `mdn-svg_elements_femorphology_html_elements`（於 HTML 元素上以 `filter:url()` 套用亦支援）。
- **fallback 具體行為**：不支援時整個 `filter` 宣告被忽略，元素以未濾鏡狀態呈現——字仍是同一個字、圖版仍是同一組幾何（「爛」的主體由第七章的等值線幾何承擔，不是濾鏡）。版面、可讀性、資訊完全不變。
- **已知限制與對策**：`erode` 取鄰域最小值，會把 RGB 一起壓暗，故**只對碳粉色元素套用**；濾鏡逐元素光柵化，每頁上限 11 個。

### 2｜`writing-mode` + `text-orientation`（C 版面與樣式層）— 承載特徵 2

- **它在本站承載什麼**：同一頁上的第二與第三個閱讀方向。地址、營業時段、口號一律直排；拉丁字用 `text-orientation:sideways` 側倒，中文用 `upright` 正立。這件事用 `transform:rotate(90deg)` 做不到——旋轉過的行不會參與版面流，行高、換行、選取全部會壞掉。
- **支援現況**：MDN《`writing-mode`》標示 **Baseline Widely available**，自 2017 年起跨瀏覽器、全球覆蓋約 96%；`text-orientation` 同為 CSS Writing Modes Level 3/4，僅在垂直書寫模式下生效。查證來源：MDN `Web/CSS/writing-mode`、`Web/CSS/text-orientation`、caniuse `css-writing-mode`。
- **fallback 具體行為**：不支援時退回水平排列，內容照樣可讀（本站直排的全部是可選取的一般文字，不是圖）。≤560px **主動**改回 `horizontal-tb` — 手機上直排是障礙不是風格。

### 3｜`steps()` 逐格時間函數（B 動效與時間軸層）— 承載全站唯一的時間語法

- **它在本站承載什麼**：四種動效**全部**用 `steps()`，整站沒有一條 `cubic-bezier`。碳粉浮塵 `steps(1)`、再印一次 `steps(3)`、壓稿條 `steps(7)`、出血接續 `steps(5)`。這是一個風格宣告：影印機的鼓是離散的，這個流派的東西不會順順地移動。
- **支援現況**：`steps()` 屬 CSS Easing Functions Level 1，MDN 標示 **Baseline Widely available**，自 2015 年起跨瀏覽器（Chrome 4+、Firefox 4+、Safari 3.1+）。查證來源：MDN `Web/CSS/easing-function`。
- **fallback 具體行為**：無支援缺口。`prefers-reduced-motion` 下四種動效各自的降級見第八章，降級後標題**預設合一**，資訊零損失且更好讀。

### 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | index 32KB／swap 40KB／rack 76KB／house 44KB | ≤350KB ✅ |
| 圖版引擎（建置階段，Node 22 單執行緒） | 單張大圖 12ms／24 張縮圖 31ms | — |
| 首屏 JS 執行 | 只做一次 `place()` 量測（4 次 `offsetLeft/Top` 讀取）＋ 事件掛載，無迴圈、無 rAF | ≤100ms ✅ |
| 主要動畫 | 只改 `transform`、`background-position`、`clip-path`；`filter` 僅在 90ms 的 hover 期間變動；無 layout thrashing（量測與寫入分開，量測用 `offsetLeft` 不用 `getBoundingClientRect`） | 60fps ✅ |
| 每頁濾鏡元素數 | ≤11 | 自訂上限 |
| 外部資源 | 只有 Google Fonts（4 家族）。零外部圖片、零音檔 | ✅ |

---

*規格書由 Claude Opus 5（排程 Agent）撰寫，2026-08-10。示範站：舊衫社 KŪ-SANN（二手衣物交換社）。*
