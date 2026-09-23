---
name: cross-stitch-sampler
description: The English counted cross-stitch sampler (c.1700–1850) as a web style — every image is a grid of two-legged crosses with all top legs facing one way, the linen ground always showing through, counted 5×7 marking alphabets, banded and mirror-symmetric layout inside a turned border, colour existing only as thread, and a back-of-work that is computed from the real stitch order.
---

# 十字繡樣本繡 Cross-stitch Sampler — 生麻與褪色絲線

> 從未看過 Demo 的 AI，讀完本文件應能做出風格一致的新網站。範例站：荷林斯種子借閱所（Low Hollins Seed Library，英格蘭坎布里亞郡 Staveley，虛構）。

## 設計哲學

「sampler」一詞來自拉丁文 *exemplum*：十六世紀它是繡工自己的圖樣存底；十七世紀分成**散點樣本繡**（spot sampler：花、鳥、果子一個個散在布上）與**帶狀樣本繡**（band sampler：一排排重複紋帶）；十八世紀定型為可以掛牆的方形——**字母、數字、邊框、一棟房子和它的院子、一段格言、署名與年份**；十九世紀的英國幾乎只用十字繡，成了女學校的必修作業，女孩子用它學在床單內衣上繡記號（marking），洗衣日後才分得回來。

這個風格的所有特徵都來自一個物理限制：**針只能從布的孔進出。**所以畫面只能是格子；所以曲線只能是台階；所以字母必須被重新設計成點陣；所以顏色只能是線的顏色、不能調淡；所以布永遠露在線與線之間。本風格要求網頁接受同樣的限制，並把「背面」當作設計的一部分：正面每個人都繡得出來，背面才看得出你下針前有沒有想過順序。

**語氣**：安靜、具體、有數字、像一個在閱覽室值班的人講話。沒有「探索」「打造」「質感生活」。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是樣本繡。

### 1　十字是唯一的像素：兩條腿，先「／」後「＼」，全畫面同向

每一個圖像單位都是一格裡的一個十字，由兩條斜線組成；底腳「／」先繡，面腳「＼」蓋在上面，**整個畫面沒有例外**——這就是為什麼真品上的絲光全朝同一個方向。曲線一律是台階；不准任意角度的線、不准圓、不准填色的面。每一條腿是**兩股線**：深色底線＋兩股本色＋每股一條細高光，高光只准在線的內部。

```js
/* one leg = two strands; sheen stays inside the thread */
function leg(ctx,x1,y1,x2,y2,col,s){
  const L=Math.hypot(x2-x1,y2-y1),nx=-(y2-y1)/L,ny=(x2-x1)/L;ctx.lineCap='round';
  ctx.strokeStyle=shade(col,-.42);ctx.lineWidth=s*.36;line(x1,y1,x2,y2);           // shadow body
  for(const j of[-1,1]){const ox=nx*s*.075*j,oy=ny*s*.075*j;
    ctx.strokeStyle=col;ctx.lineWidth=s*.15;line(x1+ox,y1+oy,x2+ox,y2+oy);          // strand
    ctx.strokeStyle=shade(col,.3);ctx.lineWidth=s*.045;line(x1+ox*1.5,y1+oy*1.5,x2+ox*1.5,y2+oy*1.5);} // sheen
}
/* cell (x,y), size S: bottom leg then top leg — never the other way */
leg(ctx,x*S+i,(y+1)*S-i,(x+1)*S-i,y*S+i,col,S);   // "/"
leg(ctx,x*S+i,y*S+i,(x+1)*S-i,(y+1)*S-i,col,S);   // "\"  (i = S*.17)
```

CSS 小圖示用兩條硬停點的斜向漸層畫十字（不是 emoji、不是 ×字元）：

```css
.x{width:14px;height:14px;
 background:linear-gradient(45deg,transparent 42%,var(--g) 42% 58%,transparent 58%),
            linear-gradient(-45deg,transparent 42%,var(--r) 42% 58%,transparent 58%)}  /* 第二層＝面腳 */
```

### 2　布要露出來：麻布的格與孔就是版面

底是一塊有織紋的生麻布：每格中間兩條淺色緯紗、每個格點一個深色孔。**不准純色底、不准紙白、不准把布整面蓋滿**。十字與十字之間、字與字之間看得到孔。網頁的 body 背景本身就是這塊布（一格 12px）：

```css
body{background:#CDBF9E url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Crect width='12' height='12' fill='%23CDBF9E'/%3E%3Crect y='4' width='12' height='1' fill='%23D3C6A6'/%3E%3Crect y='8' width='12' height='1' fill='%23D3C6A6'/%3E%3Crect x='4' width='1' height='12' fill='%23D3C6A6'/%3E%3Crect x='8' width='1' height='12' fill='%23D3C6A6'/%3E%3Crect width='2' height='2' fill='%23B8A882'/%3E%3C/svg%3E") 0 0/12px 12px}
```

Canvas 上用一格大小的貼片 `createPattern` 鋪滿（見技術章）。

### 3　計數字母、數字與署名

字不是字型，是點陣：大字 **5 格寬 × 7 格高**、小字 **3 × 5**，字與字空 1 格。一塊樣本繡必有：A–Z 字母列（可以兩行、可以換色）、1–0 數字列、格言（小字）、**署名＋年份**。拿掉署名與年份，它就只是十字繡圖案，不是 sampler。

```js
const F5={A:["01110","10001","10001","11111","10001","10001","10001"], /* …B–Z, 0–9 */};
function text(g,str,x,y,k){for(const ch of str){F5[ch].forEach((row,r)=>[...row].forEach((b,q)=>b==='1'&&g.set(x+q,y+r,k)));x+=6;}}
text(g,"ABCDEFGHIJKLM",6,7,'R'); text(g,"NOPQRSTUVWXYZ",6,16,'G'); text(g,"1234567890",15,25,'B');
```

### 4　分帶、對稱軸、繞到底的邊框

版面由上到下是**一條條水平帶**：字母 → 數字 → 分隔小帶 → 中央場景 → 散點母題 → 文字 → 署名。中央場景（房子、樹、院子）坐在**垂直中軸**上，兩側母題**成對、左右鏡像**（鳥對鳥、蜂箱對蜂箱、草莓對草莓）。外圈一條連續的藤邊框（8×4 的單元重複）繞一整圈——**轉角對不齊是可以的**，真品的轉角常常收不好，那是手工的證據，不要修。

```js
const BORDER=["GGGGGGGG","..G...G.",".RRR.YGY","..R...Y."];            // 8×4 unit
for(let x=0;x<W;x++)for(let r=0;r<4;r++){const c=BORDER[r][x%8];if(c!=='.'){g.set(x,r,c);g.set(W-1-x,H-1-r,c);}}
motif(g,M.bird,6,y,false); motif(g,M.bird,W-15,y,true);          // mirrored pair
```

網頁的 HTML 部分也照這個邏輯：區塊用**虛線（平針 running stitch）**分帶，不用實線；列表項目左右交錯縮排像散點。

### 5　顏色只存在於線上，而且會褪

只有五色絲線＋布：茜草紅、褪綠、木犀草黃、靛、鐵黑（＋本色絲作點綴）。**任何一色都沒有淡版**——要淺就換一種線或留布；不准 opacity、不准漸層、不准把線色當大面積 UI 底色。「褪綠」偏藍，是因為老綠線是靛與木犀草黃套染的，黃褪得比藍快；鐵黑因鐵媒染而褪成褐。

```css
:root{--linen:#CDBF9E;--bleach:#E6DCC3;--hole:#A6966F;
 --r:#A33A2F;/*茜草紅*/ --g:#4C6E68;/*褪綠*/ --y:#C79A3A;/*木犀草黃*/ --b:#2F4A6B;/*靛*/ --k:#2E2520;/*鐵黑*/ --w:#EFE6D0;/*本色絲*/}
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 生麻 linen | `#CDBF9E` | 全站地色（布） | ~55% |
| 漂白麻 bleach | `#E6DCC3` | 縫上去的標籤、繡樣卡紙、表單底 | ~12% |
| 孔 hole | `#A6966F` | 布的格點孔（只在紋理裡） | 紋理 |
| 鐵黑 | `#2E2520` | 正文、框、平針分隔線、深色按鈕 | ~15% |
| 褪褐 | `#524539` | 次要文字 | ~5% |
| 茜草紅 | `#A33A2F` | 繡線；現用頁；≥24px 標題字 | ≤5% |
| 褪綠 | `#4C6E68` | 繡線；分隔平針 | ≤4% |
| 靛 | `#2F4A6B` | 繡線；連結 | ≤3% |
| 木犀草黃 | `#C79A3A` | 繡線；**永不承載文字**（對生麻 1.42:1） | ≤2% |
| 本色絲 | `#EFE6D0` | 繡線點綴、深底按鈕字 | ≤1% |

對比實測（WCAG 2.1）：鐵黑／生麻 8.23:1、鐵黑／漂白麻 10.98:1、靛／生麻 4.99:1、褪褐／漂白麻 5.9:1、茜草紅／生麻 3.6:1（只准大字）、茜草紅／漂白麻 4.8:1。零 #000、零 #FFF、零漸層（唯一例外是硬停點的十字小圖示）、零模糊陰影、零圓角（唯一的圓是繡樣卡上印的「●」符號）。

## 字體系統

- 內文與標題：**Noto Serif TC** 400／700（Google Fonts）——明體的橫細直粗接近針腳。
- 英文、標籤、斜體註記：**IM Fell English** 400／italic（Google Fonts）——十七世紀 Fell 活字的復刻，和 sampler 同時代的印刷字。
- 繡出來的字：不是字型，是 5×7／3×5 點陣（特徵 3）。
- 字級：h1 1.6–1.9rem／h2 1.45rem／h3 1.08rem／內文 16px（手機 15px）／註記 .82–.9rem。行高 1.8。大標不超過 1.9rem——畫面上最大的東西是那塊布，不是字。

## 版面與網格

- 基本單位 12px（布的一格）。區塊間距 80–90px；元件間距取 12 的倍數。
- 首頁首屏：**左邊一塊裱框的樣本繡（高度 ≈ 視窗高 −150px），右邊一張縫上去的標籤**寫營業資訊。≤980px 上下排；≤440px 容器寬時樣本繡改排 53 格寬的窄版（字母拆成四行）。
- 分帶：水平帶一條條往下，帶與帶之間是 2px 虛線（平針）。
- 散點：目錄頁用 12 欄網格，卡片跨 5–6 欄、左右交錯、上下錯位（margin-top −40～+60px），像散點樣本繡。**不准三張等寬卡片置中。**
- 旋轉：零。布是直的。

## 元件配方

- **導覽**：四個頁名用 3×5 點陣畫在小畫布上。現用頁＝**已經繡好**（茜草紅十字、布底）；其他頁＝**還是繡樣卡**（漂白麻紙＋格線＋每格一個印刷方塊）；hover／focus 時當場繡成褪綠。下方附中文頁名，`aria-current="page"`。
- **按鈕**：鐵黑底＋本色絲字＋內縮一圈 2px 本色線（`box-shadow:inset 0 0 0 3px var(--k),inset 0 0 0 5px var(--w)`）＝繡框。次要按鈕：透明底＋2px 虛線外框。
- **標籤卡**：漂白麻底，`outline:2px dashed var(--k);outline-offset:-2px`＝用平針縫在布上的布標。
- **表單**：輸入框是生麻底＋虛線框，字母輸入自動轉大寫（繡字只有大寫）。
- **表格**：只有下方 2px 虛線，沒有直線。
- **footer**：上方一條 2px 虛線，地址電話時間照寫。
- **裱框**：鐵黑 10px 實框＋一圈生麻＋一圈鐵黑細線——唯一允許的實心大塊鐵黑。

## 動效規則

| 類 | 名稱 | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient | 今天這一行＋針 | 真實時刻：布最下面一行從午夜到午夜繡滿，每 30 秒檢查一次；針在最後一格上下 9px 起落、線尾擺 7° | 1.9s `cubic-bezier(.5,0,.5,1)`／3.8s ease-in-out，無限 | 針不動，行照樣依時刻繡到正確格數 |
| input | 數格子 | 游標移到任何繡布上：該列與該欄出現虛線十字準線＋「第 n 列・第 m 格・色名」 | 同一幀，0ms | 無動畫可降，照常 |
| input | 導覽當場繡 | hover／focus 非現用頁 | 同一幀 | 照常 |
| transition | 翻面 | 按「翻過來」：整塊布沿垂直軸 `rotateY(180deg)` 翻到背面 | .95s `cubic-bezier(.62,0,.3,1)` | 瞬間切換，背面內容完全相同 |
| signature | 丹麥式往返繡 | 每一塊繡布載入或進入視窗時：每一排同色的一段，先由左到右鋪完所有「／」，再由右到左回來蓋上「＼」 | 首頁 2.4s、小圖 0.7–0.9s，線性依腳數 | 直接顯示繡好的樣子 |

自我限制：本風格**禁用淡入、滑入、縮放、彈跳**。東西只會「被繡上去」或「被翻過來」。

## 插畫與圖像風格

- 全部是 5 色十字點陣；母題以字元圖存：一個字元一格，`.` 是布。
- 母題詞彙：房子（磚紅牆、鐵黑屋頂、黃窗、靛門、煙囪）、果樹、蜂箱、藍鳥、草莓、石竹、豌豆莢、蠶豆花、香豌豆、洋蔥、甜菜、羽衣甘藍、矢車菊、心。每個 ≤17×17 格。
- 中央場景＋鏡像對；院子畫成一排排播種溝（像 1790 年 V&A 藏〈The Farm Called Arnolds〉那種田地配置圖）。
- **背面**也是插畫：同一組針序算出的背線，左右鏡像，布色略深。
- 明文禁用：照片、向量插畫、細線線描、漸層、陰影、任何非 45° 的線、任何不在格上的點。

```js
const M={strawberry:["..G.G..","GGGGGGG",".RGGGR.","RRRYRRR","RYRRRYR","RRRYRRR",".RYRRR.","..RRR..","...R..."]};
```

## Logo 與 Favicon 設計指南

- Logo：15×11 格的布，「L」茜草紅、「H」褪綠，5×7 點陣；四周一圈隔格的木犀草黃十字＝邊框。SVG 每一個十字是兩段 `stroke-linecap:round` 的斜線。
- Favicon：同一張圖去掉孔，inline SVG data URI。
- 禁：把 logo 做成字型文字、加圓框、加陰影。

## Do & Don't

**Do**
- 讓布露出來；讓字是點陣；讓每一個十字的面腳朝同一邊。
- 寫署名與年份、寫具體數字（格數、包數、日期、電話）。
- 把背面當成一個可以看的頁面狀態。
- 對稱要真的對稱：鏡像用 `mirror` 參數，不是再畫一次。

**Don't（含去AI化禁令）**
- 紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- 圓角、模糊陰影、玻璃擬態、任何發光。
- 線色的淡版、用 opacity 做淺色、把茜草紅當大面積底。
- 真的十字繡字型檔（它們的腿不分先後、沒有兩股線）。
- 用「cozy」「手作溫度」當文案；針線是技術，照技術寫。

## 頁面骨架範例

```html
<body data-page="sampler">
<header class="mast">
  <a class="brand" href="index.html"><svg><!-- stitched LH --></svg><span><b>荷林斯種子借閱所</b><i>Low Hollins Seed Library</i></span></a>
  <nav class="nav"><a href="index.html" data-p="sampler" data-w="SAMPLER" aria-current="page"><canvas aria-hidden="true"></canvas><span class="en">SAMPLER</span><span class="zh">樣本繡</span></a><!-- ×4 --></nav>
</header>
<hr class="run run-g">
<main>
 <section class="open">
  <figure class="frame"><div class="stage"><div class="flip" id="flip">
    <div class="face front cgh" id="host"><canvas id="samp" role="img" aria-label="樣本繡的文字描述"></canvas></div>
    <div class="face back"><canvas id="sampB" aria-hidden="true"></canvas></div>
  </div></div></figure>
  <div class="tag"><h1>館名</h1><dl class="facts"><dt>地址</dt><dd>…</dd></dl>
    <button class="btn" id="flipBtn" aria-pressed="false">翻過來看背面</button></div>
 </section>
</main>
<script>
const g=composeSampler(89), legs=ST.danishPatch(g);
ST.stitch(document.getElementById('samp'),g,{legs,dur:2400});
ST.flipper(flip,flipBtn,()=>ST.drawBack(sampB,g,legs));
</script>
</body>
```

```css
.stage{perspective:1800px}
.flip{position:relative;transform-style:preserve-3d;transition:transform .95s cubic-bezier(.62,0,.3,1)}
.flip.on{transform:rotateY(180deg)}
.face{backface-visibility:hidden;-webkit-backface-visibility:hidden}
.face.back{position:absolute;inset:0;transform:rotateY(180deg)}
@media (prefers-reduced-motion:reduce){.flip{transition:none}}
```

## 技術實作與相容性

### A 渲染層　Canvas 2D 精靈貼圖（`drawImage` ＋ `createPattern`）

每一種「色 × 方向 × 格大小」的腿只畫一次到離屏 canvas，之後每一條腿都是一次 `drawImage`；布是一格大小的貼片 `createPattern(tile,'repeat')` 一次鋪滿。首頁 89×132 格、3,296 個十字＝6,592 條腿。
- 支援：`CanvasRenderingContext2D.drawImage()`、`createPattern()` 皆為 MDN Baseline「Widely available」。
- Fallback：無 JS 時所有 canvas 以 `html:not(.js) canvas{display:none}` 隱藏；首頁顯示同文字內容的靜態樣本（`.static-sampler`），所有營業資訊本來就是 HTML。
- 高 DPI：格大小取 `floor(cell × devicePixelRatio)`（上限 2），整數像素對齊，十字不糊。

### B 動效層（轉場）　CSS 3D：`transform-style: preserve-3d` ＋ `backface-visibility: hidden`

翻面是兩個面疊在一起、背面預先 `rotateY(180deg)`，容器轉 180°。背面 canvas 的內容**預先左右鏡像繪製**（x → W−x），所以翻過來之後看到的位置和真的把布翻過來一致。
- 支援：`backface-visibility` 為 MDN Baseline「Widely available」（自 2022-03 起各主流瀏覽器一致）；Safari 舊版需 `-webkit-` 前綴，已同時寫。來源：MDN〈backface-visibility〉、caniuse `mdn-css_properties_backface-visibility`。
- Fallback：`prefers-reduced-motion` 時 `transition:none`，瞬間切換；內容不變。

### E 資料與生成層　IndexedDB（跨頁持久化）＋ 由針序推算背面

- 〈一方繡〉完成、背面判讀後，縫進歸還卷的那一方（姓名縮寫、年份、每一格的座標與色、跳線數、線頭數）以 `indexedDB.open('low-hollins-roll',1)` 存入 object store `roll`（autoIncrement），〈歸還卷〉頁以 `getAll()` 讀回、排在卷首並重新繡出。支援：IndexedDB 為 Baseline「Widely available」（自 2015-07），`getAll()` 屬 IndexedDB 2.0（W3C Recommendation 2018-01-30）。來源：MDN〈Window: indexedDB property〉、caniuse `indexeddb`／`indexeddb2`。
- Fallback：`indexedDB` 不存在或 `open` 失敗（部分隱私模式）時退回記憶體陣列，頁面明講「只留到你關掉這一頁」。
- **背面演算法**：每一條腿有兩個孔；依實際下針順序，對每一條腿選「離上一條腿出針點較近」的那個孔入針，上一條的出針點到這一條的入針點就是一段背線。長度 > 2.9 格＝跳線；> 6 格或換色＝收線重起（多一個線頭）。首頁樣本以「同色相連區塊內的丹麥式往返」為順序，所以背面是一排排整齊的短直線；〈一方繡〉的背面則完全由使用者的點擊順序決定。

### 效能預算實測（本站）

| 項 | 值 |
|---|---|
| 各頁單檔大小（含全部 inline CSS/JS、logo、favicon） | index 45.6KB／seeds 48.2KB／stitch 50.9KB／return 42.7KB（上限 350KB） |
| 首屏 JS：組版＋區塊丹麥序＋背面推算 | 1.7ms＋5.1ms＋7.8ms（Node 22 同一段程式碼實測；背面只在按下翻面時算） |
| 一次畫完 6,592 條腿（reduced-motion 路徑） | 14.8ms |
| 簽名動畫 | rAF 每幀畫 ≈ 6,592 / (2.4s×60) ≈ 46 次 `drawImage`，遠低於一幀預算 |
| 外部資源 | 只有 Google Fonts；零圖片、零音檔、零函式庫 |
