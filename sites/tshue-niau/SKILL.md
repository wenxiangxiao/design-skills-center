---
name: pc98-adventure-pixel
description: NEC PC-98 era Japanese adventure-game pixel art for the web — sixteen 4-bit palette registers shared by canvas and CSS, Bayer-dithered gradients, the three-window ADV layout (scene / command menu / typewriter message) and palette-cycled animation.
---

# PC-98 ADV 像素畫 PC-98 Adventure Pixel Art

> 示範站：揣貓事務所 TSHUĒ-NIÂU（臺北萬華・走失貓協尋）。三頁：`index.html` 事務所／`irai.html` 委託／`jikenbo.html` 事件簿。

## 設計哲學

1982 年 NEC 推出 PC-9801，640×400 的高解析度在當時領先，但早期只有 8 色；1985–86 年起（PC-9801-24「16 色グラフィックボード」擴充卡、PC-9801VX 起標配）可以從 4096 色（每通道 4 位元）中選 **16 色同時顯示**。整個 1980 年代末到 1990 年代中期，日本的冒險遊戲（ADV）與美少女遊戲都在這個限制下長出來：16 個顏色要畫出黃昏、霓虹、雨夜與人的皮膚，於是

- 漸層一律用**有序抖動**（Bayer 矩陣交錯兩色）假裝出來；
- 畫面被切成**三個視窗**：上方場景、旁邊指令選單（見る・話す・調べる…），下方逐字出現的訊息窗；
- 要讓畫面動，最便宜的方法不是重畫，而是**改調色盤暫存器**：雨、水面、霓虹、窗燈靠「調色盤循環」動；換成夜晚，是把同一批像素的 16 個暫存器值換掉。
- 1994 年 Konami 在 PC-9821 推出〈Policenauts〉，過場仍是手繪點陣而非動畫影片。今日的 PC-98 復興（Lospec 的 pc98 調色盤標籤、Psiweapon 等人以 12-bit RGB 16 色的創作、《VA-11 HALL-A》的參照）延續的都是這套限制。

本風格的核心不是「復古」也不是「像素」，而是**限制即規則**：只有 16 個格子，所有氣氛都由「哪 16 格」與「怎麼交錯它們」決定。網頁版的翻譯是：整站（canvas＋HTML 介面）共用同一組 16 個 CSS 自訂屬性，換氣氛＝改暫存器。

## 本風格的 5 個不可省略特徵

拿掉任何一項，就不是 PC-98 ADV 了。

### ① 16 個 4-bit 調色盤暫存器（canvas 與 CSS 共用）

畫面上同時最多 16 色，每通道只能是 `0x00, 0x11 … 0xFF`（#RGB 每位數重複兩次）。介面文字、框線、背景也只能用這 16 個變數。

```css
:root{ /* 黃昏組（dusk）— 0 墨 1–6 天空 7 燈 8 紙白 9 霓虹 10–11 水泥 12–13 青 14–15 磚 */
 --c0:#110022;--c1:#220044;--c2:#442266;--c3:#664488;--c4:#AA4488;--c5:#EE6688;--c6:#FF9966;--c7:#FFDD88;
 --c8:#FFFFEE;--c9:#FF5599;--c10:#9988AA;--c11:#554466;--c12:#226666;--c13:#44CCAA;--c14:#884433;--c15:#CC8855}
body{background:var(--c1);color:var(--c8)}
```
```js
// 夜組只改「天空與牆」那幾格；燈 7、紙白 8、霓虹 9、青 13 在三組裡不變，所以夜裡窗燈會更亮
const night=['#110022','#111133','#220044','#331155','#442266','#553366','#664477','#FFDD88',
             '#FFFFEE','#FF5599','#556688','#333355','#224455','#44CCAA','#552233','#775544'];
function regs(tab){tab.forEach((h,i)=>document.documentElement.style.setProperty('--c'+i,h));}
```
色票比例（黃昏）：紫系 1–4 約 55%（底與天空）、墨 0 約 15%（視窗內底、剪影）、紙白 8 約 10%（文字與外框）、水泥 10–11 約 10%、燈 7／霓虹 9／青 13 合計 ≤8%（只當重點）、磚 14–15 ≤2%。

### ② 有序抖動取代所有漸層

天空、光暈、陰影、牆上的污漬：一律兩色以 Bayer 8×8 交錯。零 CSS 平滑漸層、零透明疊色、零 blur、零模糊陰影。

```js
const B8=[0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,
          3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21];
// cols＝相鄰暫存器（例 [1,2,3,4,5,6]），fn 回傳 0–1；兩格之間用 Bayer 門檻決定
function ramp(S,x,y,w,h,cols,fn){const n=cols.length-1;for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++){
 const v=Math.min(.9999,Math.max(0,fn(i,j)))*n,k=v|0;S.p(i,j,(v-k)*64>B8[(j&7)*8+(i&7)]+.5?cols[k+1]:cols[k]);}}
```
```css
/* HTML 介面的「抖動」：2×2 硬棋盤（硬停點、不是平滑漸層） */
.dither{background-color:var(--c2);background-image:conic-gradient(var(--c3) 25%,transparent 0 50%,var(--c3) 0 75%,transparent 0);background-size:4px 4px}
```

### ③ ADV 三窗構圖＋雙框視窗

場景窗（約 448×280）＋右側指令選單（▶ 游標）＋下方訊息窗（逐字、等待時 ▼ 閃）。所有視窗：墨底、外框紙白 2px、內縮 6px 再一道紫 2px；標題是反白小條貼在左上角。零圓角。

```css
.win{background:var(--c0);border:2px solid var(--c8);outline:2px solid var(--c3);outline-offset:-6px;padding:14px 18px}
.win>.tt{display:inline-block;background:var(--c8);color:var(--c0);padding:0 8px;margin:-14px 0 8px -18px;line-height:32px}
.adv{display:grid;grid-template-columns:minmax(0,448fr) minmax(176px,192fr);grid-template-areas:'scene menu' 'msg msg';gap:12px}
.menu button::before{content:'▶';display:inline-block;width:20px;visibility:hidden;color:var(--c9)}
.menu button:hover::before,.menu button:focus-visible::before{visibility:visible;animation:blink .8s steps(1) infinite}
.msg.wait::after{content:'▼';position:absolute;right:18px;bottom:8px;color:var(--c7);animation:blink .8s steps(1) infinite}
@keyframes blink{50%{visibility:hidden}}
```

### ④ 點陣字與整數像素

字體：Google Fonts **DotGothic16**（Fontworks，16 點陣哥德；Adobe-Japan1 字集，部分繁體字會落到備援字）。字級只用 16 的倍數（16／24／32），行高 32px。畫布一律 `image-rendering:pixelated`，零反鋸齒。畫布裡的中文標題是把 16px 字畫在暫存 canvas、alpha ≥110 二值化後寫回索引緩衝——所以畫布字也只有 16 色、也是點陣。

```css
body{font:16px/32px "DotGothic16","Noto Sans TC",monospace;letter-spacing:.04em;-webkit-font-smoothing:none}
canvas{image-rendering:pixelated;image-rendering:crisp-edges}
```
```js
function text(S,str,x,y,c,px){const cv=document.createElement('canvas'),g=cv.getContext('2d');cv.width=px*str.length*1.1+8;cv.height=px*1.4;
 g.font=px+'px "DotGothic16",monospace';g.textBaseline='top';g.fillText(str,2,1);const d=g.getImageData(0,0,cv.width,cv.height).data;
 for(let j=0;j<cv.height;j++)for(let i=0;i<cv.width;i++)if(d[(j*cv.width+i)*4+3]>=110)S.p(x+i-2,y+j-1,c);}
```

### ⑤ 動的是調色盤，不是像素

雨、水窪、霓虹、窗燈、貓眼都畫成「邏輯色號」（16 以上），每 1/14 秒只改查表 `lut`，像素不動。換景（黃昏→深夜→天光）是 16 個暫存器在 1.6 秒內以 4-bit 為單位一格一格走過去。母題：夕暮都會、電線桿與垂線、屋頂水塔、亮燈的窗、販賣機、雨、貓。

```js
// idx：每像素存邏輯色號；<16 直接是暫存器，≥16 經 lut 對到暫存器，255＝透出底下 under 的顏色
function blit(S){for(let i=0;i<S.idx.length;i++){const c=S.lut[S.idx[i]];S.d32[i]=S.pal32[c===255?S.under[i]:c];}S.ctx.putImageData(S.img,0,0);}
// 雨：每滴是 5 段斜線，相位 0–7 寫在邏輯色 16–23；每格只讓相位 0–1 亮（10），其他透出底色
function rain(S,t){const f=Math.floor(t*14);for(let k=0;k<8;k++)S.lut[16+k]=(((k-f)%8+8)%8)<2?10:255;}
// 換景：每通道在 0–15 階之間補間，四捨五入回 4-bit
function mix(a,b,t){return a.map((h,i)=>'#'+[1,3,5].map(o=>{const x=parseInt(h.substr(o,2),16)/17,y=parseInt(b[i].substr(o,2),16)/17;
 return (Math.round(x+(y-x)*t)*17).toString(16).padStart(2,'0');}).join('').toUpperCase());}
```

## 色彩系統

| 號 | 黃昏 dusk | 深夜 night | 天光 dawn | 用途 |
|---|---|---|---|---|
| 0 | #110022 | #110022 | #110022 | 墨：視窗底、剪影、輪廓 |
| 1 | #220044 | #111133 | #334477 | 頁面地色、天頂 |
| 2 | #442266 | #220044 | #556699 | 天空上段、暗面 |
| 3 | #664488 | #331155 | #7788BB | 天空、內框線、遠景樓 |
| 4 | #AA4488 | #442266 | #AA99CC | 天空中段（洋紅） |
| 5 | #EE6688 | #553366 | #DDBBCC | 地平線粉 |
| 6 | #FF9966 | #664477 | #FFDDBB | 夕陽橘、橘貓 |
| 7 | #FFDD88 | 同 | 同 | 燈、窗、強調數字 |
| 8 | #FFFFEE | 同 | 同 | 紙白：文字、外框 |
| 9 | #FF5599 | 同 | 同 | 霓虹：游標、按鈕、現用導覽 |
| 10 | #9988AA | #556688 | #AAAACC | 水泥亮面、次要文字 |
| 11 | #554466 | #333355 | #666688 | 水泥暗面、中景樓 |
| 12 | #226666 | #224455 | #447777 | 樹、暗青 |
| 13 | #44CCAA | 同 | 同 | 貓眼、狀態值 |
| 14 | #884433 | #552233 | #996655 | 磚、紅柱 |
| 15 | #CC8855 | #775544 | #DDAA77 | 紙箱、玳瑁、木 |

規則：7、8、9、13 是「不隨天色變的光」，其餘 12 格是「會被天色改寫的物」。新增顏色＝違規；要新氣氛，就寫一組新的 16 格。

## 字體系統

- 唯一字體：DotGothic16（Google Fonts）；備援 Noto Sans TC → monospace。
- 字級：32px（頁面標題、合計金額）／24px（行動版標題）／16px（內文、選單、訊息）。行高一律 32px（16px 字）或 40px（32px 字）。字重只有 400。
- 字距 .04em；數字與英數同字族（不另用等寬字）。
- 價目表用 `dt::after` 的「……」點線導引，金額右對齊、色 7。

## 版面與網格

- 最大寬 1312px，16px 外距。視窗之間 12px。零旋轉。
- 頂列：左＝像素貓頭＋店名＋狀態行；右＝「移動」指令視窗（導覽）。
- 首屏＝ADV 三窗（場景 448fr：選單 192fr）＋訊息窗；以下用 12 欄格放資訊視窗（7＋5、6＋6）。
- 場景畫布以 CSS `width:100%` 縮放，保持 448:280；手機（≤860px）三窗改直排、選單攤成一列。
- 留白很少：PC-98 的螢幕是滿的，空白處放「狀態」小表（時刻、天色、今晚、本月）。

## 元件配方

- **導覽（adv-command-nav）**：一個 `.win` 標題「移動」，三個連結橫排；現用頁前面固定 ▶ 且字色 9；hover／focus 時 ▶ 移到該項並以 `steps(1)` 閃，原本的 ▶ 消失（`.cmd:hover a[aria-current]:not(:hover)::before{visibility:hidden}`）。↑↓ 鍵在選單內移動焦點。
- **按鈕**：`.btn{background:var(--c9);color:var(--c0);border:2px solid var(--c8);line-height:36px;padding:0 14px}`，hover 改底色 7。按鈕文字前可加 ▶。
- **卡片＝視窗**：只有 `.win` 一種容器，標題用反白小條。
- **表單**：輸入框墨紫底 `var(--c1)`、2px 紙白框、高 36px、零圓角；單選項是「▶ 文字」清單（`label:has(input:checked)::before{content:'▶'}`），花色選項是 40×36 的像素頭像小畫布。
- **訊息窗**：說話者名字用色 13，台詞用「」；逐字 26ms／字；點擊、Enter、空白鍵先補完、再翻下一句；`.ms`（視覺隱藏、`aria-live=polite`）放整句給讀屏，`.mt` 逐字顯示並 `aria-hidden`。
- **頁尾**：「調色盤暫存器 0–F」視窗，16 格色塊＋十六進位值，換景時即時改寫。

## 動效規則

四種動效都是本站自製，motion-library 元件是額外加上的。

| 種類 | 實作 | 觸發 | 時間 |
|---|---|---|---|
| ambient 環境 | 調色盤循環：雨（8 相位）、水窪反光、販賣機燈管閃、窗燈一扇扇亮、直立招牌五字逐字亮、貓眼眨 | 自動，畫面在視窗內才算 | 14 Hz 逐格，`lut` 改寫後一次 `putImageData`（約 0.5ms） |
| input 輸入 | 游標移到場景物件上→螞蟻線框（邏輯色 49–56，相位＝(x+y)/2）＋名稱標籤；▶ 游標跟 hover／焦點走 | pointermove／focus | 0ms（同一幀），框線本身也是循環 |
| transition 轉場 | 百葉窗換頁：`@property --bl` 讓 `mask` 條寬由 0 補到 16px，`steps(8)` 每格 2px；新頁由 16px 收回 0 | 點站內連結 | 關 440ms、開 440ms |
| signature 簽名 | **調色盤暫存器換景**：16 個暫存器在 1.6 秒內 15 步、每步四捨五入回 4-bit，同時寫進 canvas 的 `pal32` 與整頁 `--c0…--c15`；畫面零像素重畫。首頁「時刻」切黃昏／深夜，委託成立時換成天光 | 指令／委託 | 15×107ms |

自我限制：不淡入、不視差、不縮放、不用 ease 曲線（全部 steps 或逐格）。

`prefers-reduced-motion`：循環停在 t＝1.3 秒那一格；換景瞬間完成；逐字直接整句；百葉窗不出現；motion-library 背景 `seek(.35)`、文字 `seek(1)`。資訊零損失。

### motion-library 元件表（PLAYBOOK §2.8）

元件庫 1.22.0 @33746389，每頁以 `tools/ml-embed.js` 抽子集 inline 為第一個 `<script>`，`tools/ml-smoke.js` 皆 smoke ok。掛載包裝 `TU.ml`：等 `document.fonts.ready`、離屏 `destroy()`、回視窗重掛、一次性元件 `loop:false`＋之後 `seek(1)`、canvas `aria-hidden`、容器保留 `.ml-fb` HTML 標題。**本站加一步**：掛在 1/4 寬的內層，掛載時暫時把 `window.devicePixelRatio` 設為 1，再以 `transform:scale(4)`＋`pixelated` 放大——元件因此也是粗像素，符合特徵④。顏色只用三組不隨天色變的暫存器（0、7、8、9），換景時元件不必重設。出處：`MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| TXT-B-27 | Pixel Dissolve | index | text「揣貓事務所」、primary #FF5599、secondary #FFDD88、bg #110022、duration 2.6、loop:false、seed 7 | 標題畫面：店名由方格一格格溶出＝PC-98 遊戲的標題 logo；只用 fillRect，零圓角零發光（transition） |
| BG-B-22 | Stripe Twist | index | primary #FF5599、secondary #110022、bg #110022、duration 6、intensity .7、density .8、seed 3 | 「今晚出勤」橫帶：正弦錯位的硬邊條紋＝光柵中斷式的 raster bar；純 fillRect（ambient） |
| TXT-A-27 | Typewriter | irai | text「IRAI 委託受付」、primary #FF5599、bg #110022、duration 2.2、loop:false、seed 4 | 委託頁標題逐字打出＋方塊游標＝ADV 訊息窗的逐字；（transition） |
| TXT-B-13 | Scramble Decode | jikenbo | text「事件簿 1,284」、primary #FF5599、bg #110022、duration 2.4、loop:false、seed 9 | 事件簿標題由亂碼解出＝讀取存檔時的資料載入（transition） |
| BG-A-32 | Shock Lines | jikenbo | primary #FFDD88、secondary #FF5599、bg #110022、duration 3、intensity .8、density .7、seed 5 | 「結果」窗裡「第 N 晚」背後的集中線＝ADV 揭曉時的驚嘆格；每讀一件重播（input） |

元件字色由元件依 bg 亮度自動決定（暗底→近白），是全站唯一不在 16 格內的顏色，只出現在元件畫布裡。同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

- 全部程序生成，零圖檔：場景寫進 448×280 的 `Uint8Array` 索引緩衝；形狀只有 rect、Bresenham 線、掃描線多邊形、橢圓；天空與光暈是 `ramp`／`dith`；雲與污漬是自寫 value noise＋fbm 過門檻再抖動。
- 前中遠三層：遠景樓（色 3、無窗）→中景樓（色 11、窗＝邏輯色）→前景剪影（色 0）。電線是 `sin` 垂線，一律 1px 墨。
- 貓：正面頭像 40×36 格（頭橢圓＋兩耳三角＋肩），側坐 24×24 格；毛色是函式（橘虎＝sin 條紋、三花＝fbm 兩門檻、玳瑁＝細 fbm）；輪廓由「格內且鄰格在外」自動求出，黑貓的輪廓改用 11 才看得見。
- 人物不出現，只出現在訊息窗的名字裡——PC-98 ADV 的立繪另成一類，這裡以「物件會說話」代替。

## Logo 與 Favicon 設計指南

- Logo：40×36 格像素橘虎頭（`shape-rendering:crispEdges`，同列同色合併為一個 rect）＋ DotGothic16「揣貓事務所」＋粉紅小字 TSHUĒ-NIÂU；外框同 `.win` 雙框。檔案 `assets/logo.svg`。
- Favicon：同一顆頭以 2 格取 1 縮成 20×18，墨紫底，inline SVG data URI。
- 禁止向量平滑的貓臉、禁止 emoji。

## Do & Don't

**Do**
- 先寫 16 格暫存器，再畫畫；任何新顏色都先問「是哪一格的另一組值？」
- 讓循環承擔動態：雨、水、燈、霓虹都畫成邏輯色。
- 把訊息窗當主要文案載體：每個可點物件都有一句話。
- 鍵盤可完成全部流程（選單 ↑↓、Enter 翻頁、場景熱點有 `<select>` 替代）。

**Don't**
- 不用 CSS 平滑漸層、透明度、blur、模糊陰影、圓角。
- 不用 `ease` 補間；不淡入。
- 不把畫布以非像素化方式縮放。
- 不放「● REC」「掃描線 CRT 濾鏡」湊復古——PC-98 ADV 的質感來自調色盤與抖動，不是螢幕髒污。
- 去AI化禁令：禁紫藍漸層 hero（本風格的紫是抖動出來的天空，不是漸層）、禁置中大標＋三卡片、禁 emoji icon、禁 Lorem ipsum、禁 EST. 19xx 徽章。

## 頁面骨架範例

```html
<div class="blinds" aria-hidden="true"></div>
<header class="top">
 <a class="brand" href="index.html"><svg viewBox="-1 -1 22 20" shape-rendering="crispEdges" aria-hidden="true">…</svg><span><b>店名</b><small>副標</small></span></a>
 <nav class="cmd win" aria-label="移動" data-menu><span class="tt">移動</span>
  <a href="index.html" aria-current="page">首頁</a><a href="b.html">第二頁</a><a href="c.html">第三頁</a></nav>
</header>
<section class="adv" aria-label="場景">
 <div class="scene win"><canvas id="sc" width="448" height="280" role="img" aria-label="場景描述"></canvas></div>
 <div class="menu win" data-menu role="group" aria-label="指令"><span class="tt">指令</span>
  <button type="button">看</button><button type="button">問</button><button type="button">查</button></div>
 <div class="msg win" tabindex="0"><span class="ms vh" aria-live="polite"></span><span class="mt" aria-hidden="true"><span class="who">名字</span>「第一句。」</span></div>
</section>
<footer class="win"><span class="tt">調色盤暫存器 0–F</span><ul class="regs"></ul></footer>
```
```css
@property --bl{syntax:'<length>';inherits:false;initial-value:0px}
.blinds{position:fixed;inset:0;z-index:50;pointer-events:none;background:var(--c0);--bl:0px;
 mask:repeating-linear-gradient(180deg,#000 0 var(--bl),transparent var(--bl) 16px)}
.blinds.close{animation:blc .44s steps(8,end) forwards}@keyframes blc{from{--bl:0px}to{--bl:16px}}
.blinds.open{animation:blo .44s steps(8,end) forwards}@keyframes blo{from{--bl:16px}to{--bl:0px}}
```

## 技術實作與相容性

### 1. Canvas 2D 索引色幀緩衝＋調色盤循環（A 渲染層）
- `Uint8Array idx`（邏輯色）＋`Uint8Array under`（底色）＋`Uint8Array lut[256]`＋`Uint32Array pal32[16]`，輸出到 `ImageData` 後 `putImageData`。`pal32` 由 `Uint8Array` 視圖逐位元組寫入 RGBA，不假設位元組序。
- 支援：`ImageData`／`putImageData`／`Uint32Array` 為所有現行瀏覽器長期支援（MDN CanvasRenderingContext2D.putImageData）。`image-rendering:pixelated` 於 Chrome、Edge、Safari、Firefox 現行版可用，另寫 `crisp-edges` 作備援。
- 效能實測（headless Chromium 141，1280×900）：首頁場景生成 27–35ms（Node 量測同值），單次 blit 448×280 約 0.5ms；循環 14Hz，只在畫面內才算；首頁 longtask 合計 0–122ms 之間浮動（多數量測為 0），DOMContentLoaded 處理 <1ms。
- Fallback：無 canvas／無 JS 時，`<canvas>` 的 `aria-label` 與 `<noscript>` 說明＋下方所有資訊視窗都是 HTML 文字；訊息窗預設有第一句台詞。

### 2. 自寫 value noise＋fbm＋Bayer 8×8 有序抖動（E 資料與生成層）
- 雜湊：`Math.imul` 整數雜湊 → 0–1；value noise 以 smoothstep 雙線性插值；fbm 3 階。用於雲、牆面污漬、樹冠、香煙。純計算、無相容性問題（`Math.imul` 為 ES2015）。
- 所有「漸層」由 Bayer 門檻決定兩相鄰暫存器，結果仍是 16 色。

### 3. CSS `@property` 型別化自訂屬性補間（B 動效與時間軸層）
- `--bl` 註冊為 `<length>` 後，`@keyframes` 才能補間它，`mask` 的條寬因此能動。
- 支援現況（查證：web-platform-dx Web Features Explorer〈Registered custom properties〉、caniuse〈CSS at-rule: @property〉、web.dev〈New to the web platform in July 2024〉）：Chrome 85、Safari 16.4、Firefox 128（2024-07-09）起支援，Baseline Newly available 2024-07-09，預計 2027-01-09 Widely available。
- Fallback：不支援時 `--bl` 不會補間，動畫在 50% 處直接跳成全遮或全開——換頁仍成立，只是少了逐條關上的過程；`prefers-reduced-motion` 時整個 `.blinds` 不顯示。
- 另：本站同時寫 `-webkit-mask` 與 `mask`。

### 頁面預算
三頁皆 ≤296KB（其中 motion-library 子集約 222KB）。Google Fonts 為唯一外部資源；字型載入失敗時落到 Noto Sans TC／monospace，畫布字的二值化在 `document.fonts.ready` 前後都能畫（只是字形不同）。

### 查證來源
- Hackaday〈The Strange World Of Japan's PC-98 Computer Ecosystem〉2023-12-26：16 色可從 4096 色中改調色盤。
- necretro.org〈PC-9801-24〉：16 色グラフィックボード；PC-9801VX（1986）640×400 從 4096 色選 16 色標配。
- Wikipedia〈Policenauts〉：1994-07-29 PC-9821 首發，點陣過場。
- Lospec〈pc98〉調色盤標籤；PixelJoint Psiweapon（Schuldigun）16 色 12-bit RGB 作品。
