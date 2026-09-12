---
name: rosta-window
description: Soviet ROSTA Windows (Okna ROSTA, 1919–1921) — hand-cut stencil bulletin design; a 4–14 panel narrative grid, flat spot-colour silhouettes with white stencil bridges, pictogram figures, and a rhymed caption bar in every panel.
---

# ROSTA 窗 Окна РОСТА — 型版分格布告風

> 這是一份風格規格書。讀完它，你應該能不看 Demo 就做出一個同風格的全新網站，
> 而且做出來的東西一眼就會被認出是「ROSTA 窗」，不是「某個紅黑配色的粗獷風網站」。

---

## 〇、這個流派是什麼

**Окна сатиры РОСТА（ROSTA 諷刺之窗），1919–1921，莫斯科。**

俄羅斯通訊社（РОСТА）的美術家把剛收到的電報，當天刻成型版、分成四到十四格、刷成一張連環布告，
貼在街上空著的店面玻璃裡。

- **起點**：1919 年 2 月，畫家兼諷刺漫畫家 **米哈伊爾・切列姆內赫（Mikhail Cheremnykh）**
  與記者 Nikolai Ivanov，把第一扇窗貼在一家歇業糖果店的空玻璃上。
  幾週後詩人 **弗拉基米爾・馬雅可夫斯基（Vladimir Mayakovsky）** 加入，
  負責把電報寫成押韻的短句——他自己估算畫過三千張草稿、寫過六千條句子。
  尖峰時期這個集體超過一百人，另有 Ivan Malyutin、Amshey Nurenberg、Rodchenko 等人。
- **製程**：不是印刷，是 **型版（трафарет，源自法國 pochoir）**。一個顏色一塊版，一塊版刷一遍。
  切列姆內赫回憶：刻版的人第一天刷二十五份、第二天再五十份，幾天內出完一版約三百份。
  快的時候，前線電報從送達到變成街上的彩色布告，只要 **四十分鐘到一小時**。
- **母型**：俄羅斯民間木刻版畫 **лубок（lubok）**——粗糙的圖文合體、給不識字的人看的東西。
- **為什麼長成這樣**：因為要快、要便宜、要讓不識字的人看得懂。
  型版逼出硬邊剪影，沒有網點、沒有交叉排線、沒有漸層；
  為了給文盲讀，他們發展出一套象形符號的文法，後來影響了 Isotype 與現代資訊圖表；
  為了讓路過三秒的人帶得走，句子必須押韻。
- **結束**：1921 年初 Kerzhentsev 離開後移交 Glavpolitprosvet（GPP），再一年結束。
  1960 年代經 Duvakin 專著的德譯本傳入西方，影響了歐洲的 agitprop 文化。

**用這個風格時請注意**：ROSTA 窗的歷史內容是革命時期的政治宣傳。
本規格書借用的是它的**形式語言**（分格、型版、專色、押韻、象形），不是它的政治內容。
拿它做公共衛生、防災、勞安、教學、公告、產品說明都非常合適——這些正是它形式上最擅長的事。

**外部參照**（可查證，寫網站文案時可引用）：
Wikipedia《ROSTA windows》／Melton Prior Institute, Alexander Roob《Graphic Journalism and the Avant-garde: The ROSTA Windows of the Bolshevik Art Army》（2014）／
Leah Dickerman《ROSTA: Bolshevik Placards 1919–1921》（New York, 1994）／V&A 館藏 Cheremnykh 海報。

---

## 一、本風格的 5 個不可省略特徵

拿掉其中任何一項，做出來的就不是 ROSTA 窗了。這五項在頁面上必須**全部看得見**。

### 特徵 1　分格敘事：一扇窗是 4–14 格的序列，不是一張圖

版面的骨架不是欄位，是**格**。由左而右、由上而下讀，格與格之間沒有補間——
時間發生在讀者的眼睛從第 3 格移到第 4 格的那一瞬間，不在動畫裡。
格線是**粗黑實線**（4–6px），不是留白間距。

```css
.grid8{
  display:grid; grid-template-columns:repeat(4,1fr);
  gap:8px; background:#16130D; padding:4px;   /* 間隙就是黑格線 */
}
.cell{position:relative;background:#E0D7BE;overflow:hidden}
@media (max-width:560px){ .grid8{grid-template-columns:repeat(2,1fr)} }
```

**判準**：把整頁翻成灰階、遮住所有文字，你仍然數得出來這是幾格、讀得出來從哪一格讀到哪一格。

### 特徵 2　型版剪影：硬邊、平塗、一色一版，畫面上沒有一條曲線是漸變的

所有圖形都是**刀切出來的多邊形**：直邊、折角、零漸層、零網點、零交叉排線、零圓角、零模糊陰影。
陰影一律是**實心位移色塊**。每一個顏色是一塊獨立的版。

```css
/* 投影＝另一塊實心版，不是 blur */
.paper{ background:#E0D7BE; box-shadow:5px 5px 0 #4A4638; border-radius:0 }
```

```js
/* 一枚象形字＝若干個多邊形，每個多邊形指定它屬於哪一塊版 */
const PLATE = {k:'#16130D', o:'#D2952A', b:'#2D4A8E', r:'#CE2A1A'};
const PORDER = ['k','o','b','r'];          // 刷版順序：紅永遠最後，它最會吃別的顏色
```

**明文禁用**：`border-radius`、`filter:blur`、`linear-gradient`、`opacity` 造成的半透明疊色、
`stroke-linecap:round`、任何貝茲曲線構成的「插畫感」線條。

### 特徵 3　白橋：被圍起來的內島必須用紙色的橋連回外框

這是「刻出來的」與「印出來的」之間唯一的鐵證。
型版是一張挖了洞的紙，「口」字中間那塊四邊都被切開就會掉下來，
所以要留兩條窄橋把它連回外框；刷完，那兩條橋就是**紙的顏色**，留在字上、留在圖上。

```js
/* 任何內島（ring/counter）都這樣長：外形 → 內縮的紙色內島 → 兩條紙色橋 */
function ring(pts, color, paper='#E0D7BE'){
  const P = pts.split(' ').map(s => s.split(',').map(Number));
  const cx = P.reduce((a,p)=>a+p[0],0)/P.length, cy = P.reduce((a,p)=>a+p[1],0)/P.length;
  const inner = P.map(p => `${(cx+(p[0]-cx)*0.58).toFixed(1)},${(cy+(p[1]-cy)*0.58).toFixed(1)}`).join(' ');
  const xs=P.map(p=>p[0]), ys=P.map(p=>p[1]);
  const x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys), h=y1-y0;
  return `<polygon points="${pts}" fill="${color}"/>`
       + `<polygon points="${inner}" fill="${paper}"/>`
       + `<rect x="${x0-3}" y="${(y0+h*0.30).toFixed(1)}" width="${x1-x0+6}" height="4.6" fill="${paper}"/>`
       + `<rect x="${x0-3}" y="${(y0+h*0.68).toFixed(1)}" width="${x1-x0+6}" height="4.6" fill="${paper}"/>`;
}
```

白橋也要出現在**介面**上，不只在插圖裡。導覽的現用態、標籤、按鈕都可以帶橋：

```css
/* 現用頁＝油墨透過洞落到紙上，橋留在上面 */
.nav a[aria-current="page"]{position:relative;background:#CE2A1A;color:#E0D7BE}
.nav a[aria-current="page"]::before,
.nav a[aria-current="page"]::after{
  content:"";position:absolute;left:0;right:0;height:4px;background:#E0D7BE}
.nav a[aria-current="page"]::before{top:34%}
.nav a[aria-current="page"]::after {top:66%}
```

### 特徵 4　套版錯位：四塊版永遠對不準，且每塊版有固定的偏移方向

手刷不可能對準。對不準留下的那一圈紙色邊，就是這種窗的樣子；**對得太準反而像機器印的。**
偏移量 1–2px，方向**固定**（紅版永遠往右下、赭版往左上），不是隨機抖動。

```css
:root{ --misK:0px; --misR:0px }              /* 由 rAF 極慢驅動的呼吸，±0.6px */
.cell .pl-k{transform:translate(var(--misK),0)}
.cell .pl-o{transform:translate(calc(-1.1px + var(--misK)),-0.8px)}
.cell .pl-b{transform:translate(calc( 0.7px - var(--misR)),-1.3px)}
.cell .pl-r{transform:translate(calc( 1.4px + var(--misR)), 1px)}
```

```html
<!-- 油墨脹出＋刀口內縮：feMorphology dilate → erode -->
<svg width="0" height="0"><filter id="inkspread" x="-15%" y="-15%" width="130%" height="130%">
  <feMorphology operator="dilate" radius="0.55" in="SourceGraphic" result="spread"/>
  <feMorphology operator="erode"  radius="0.28" in="spread"/>
</filter></svg>
```

### 特徵 5　圖與韻文同格：每一格底部一條實心字帶，字塞滿它

文字不是圖說，它和圖是同一格的兩半。字帶是**滿版實心黑條**，字是粗黑體、字距拉開、置中、塞滿。
字帶留白就是刻壞了。整組文案是**押韻的對句**——這是這個流派唯一的文案格式。

```css
.cell .cap{
  display:block; background:#16130D; color:#E0D7BE;
  font-weight:900; font-size:clamp(15px,2.3vw,21px);
  letter-spacing:.22em; text-align:center; padding:5px 2px 6px; line-height:1.2;
}
```

中文的押韻用**十三轍**（傳統曲藝／快板／順口溜的韻部）：
發花、梭波、乜斜、一七、姑蘇、懷來、灰堆、遙條、由求、言前、人辰、江陽、中東。
兩句同轍即可，不論聲調。英文／俄文用尾韻對句（couplet）。

---

## 二、色彩系統

ROSTA 只有 2–4 塊專色，因為每多一色就要多刻一塊版、多刷一遍。**顏色是成本，不是選擇。**

| 色 | Hex | 角色 | 面積 |
|---|---|---|---|
| 型版卡（地） | `#6F6A58` | 上了油的厚馬糞紙型版。霧面、無反光帶、無拉絲、無漸層。畫面上「還沒印的那一面」 | ~32% |
| 刀口／暗部 | `#4A4638` | 型版的切口、實心投影、表格框、分隔條 | ~8% |
| 粗紙 | `#E0D7BE` | **只出現在「已經印出來的東西」上**。所有長文一律在紙上，不在型版卡上 | ~26% |
| 紙的壓痕 | `#D2C8AC` | 表格偶數列、次級紙面 | ~4% |
| 黑版 | `#16130D` | 第一塊版：輪廓、字帶、正文、格線 | ~18% |
| 赭版 | `#D2952A` | 第二塊版：物件的量體、木與紙製品、次要標記 | ~7% |
| 青版 | `#2D4A8E` | 第三塊版：**只給水與夜**。用得極省，它出現就代表「水」 | ~2% |
| 紅版 | `#CE2A1A` | 第四塊版（最後刷）：火、危險、現用態、可動作、連結 | ~13% |

**硬規則**

1. 四塊版**永不漸層過渡**，永遠硬邊相接。
2. 刷版順序固定 **黑 → 赭 → 青 → 紅**，紅永遠最後。這個順序決定了誰蓋住誰。
3. 需要「留白」的地方不是加白色，是**挖掉**（knockout）——讓紙自己露出來。
4. 型版卡（地色）上**不放長文**。長文必須在一塊紙上，紙一定帶實心投影。
5. 青版每頁面積不得超過 3%。它一多就變成瑞士國際主義。

---

## 三、字體系統

型版工是**用刀切字**的，所以字是重的、方的、字腔小的。

```css
/* Google Fonts：Noto Sans TC 400/500/900 + Roboto Mono 500 */
h1,h2,h3,.cut{font-family:"Noto Sans TC","PingFang TC",sans-serif;font-weight:900;letter-spacing:.04em}
.num,.mono{font-family:"Roboto Mono",monospace;font-weight:500;letter-spacing:.02em}
body{font-family:"Noto Sans TC","PingFang TC",sans-serif;font-size:16px;line-height:1.75}
```

- 標題與字帶：**900，不用 700**。ROSTA 的字是刻的，沒有中間重量。
- 字帶字距 `.22em`——刻字的人會把字撐開塞滿字帶。
- 編號、日期、數量一律等寬字（`Roboto Mono` 500），與粗黑體形成硬對比。
- 字級 scale：`11 / 12.5 / 14 / 15 / 16 / 19 / 22 / 26`。不要連續縮放，階梯要看得出來。
- **不用襯線體**。ROSTA 沒有襯線。
- 英文副標一律**全大寫 + 字距 .3em**，只用在 mono 上。

---

## 四、版面與網格

- 最大寬 `1180px`，外距 `clamp(14px,4vw,52px)`。
- **不對稱**：左側窄欄（240–330px，放電報條／說明／表格）＋ 右側大區（主體那扇窗）。
  永遠不要做等寬雙欄或置中三卡片。
- 骨架用類別而非 inline style，才過得了 900px 斷點：

```css
.split-a{display:grid;gap:20px;grid-template-columns:minmax(0,300px) minmax(0,1fr)}
.split-b{display:grid;gap:18px;grid-template-columns:minmax(0,1fr) minmax(0,330px)}
.stack {display:grid;gap:15px;align-content:start}
.cols  {display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(268px,1fr))}
@media (max-width:900px){ .split-a,.split-b{grid-template-columns:minmax(0,1fr)} }
```

- **零圓角、零模糊陰影**，全站 `border-radius:0`。
- 分隔線是 `3px` 實心，重點分隔線是 `5px` 紅。
- 旋轉角度：**不要旋轉**。型版是壓下去的，不是貼歪的。（這一點與龐克剪貼、迷幻海報相反。）

---

## 五、元件配方

### 導覽（型版鏤空 stencil-cut）

四頁＝型版卡上的四個鏤空字窗。未上墨的格是**洞**（看得見底下的紙白），
現用頁那一格是**油墨已經透過洞落到紙上**（紅底＋白橋）。

```css
.stencil-nav{display:flex;border:3px solid #4A4638;background:#4A4638}
.stencil-nav a{
  position:relative;display:block;width:86px;padding:9px 0 10px;text-align:center;
  border-right:3px solid #4A4638;background:#E0D7BE;color:#6F6A58;
  font-weight:900;font-size:15px;letter-spacing:.1em;text-decoration:none;
  box-shadow:inset 0 0 0 3px #6F6A58;      /* 洞的厚度 */
}
.stencil-nav a[aria-current="page"]{background:#CE2A1A;color:#E0D7BE;filter:url(#inkspread)}
```

### 按鈕（切出來的牌子）

```css
.btn{display:inline-block;background:#CE2A1A;color:#E0D7BE;font-weight:900;font-size:15px;
  letter-spacing:.14em;padding:11px 22px;border:3px solid #16130D;box-shadow:4px 4px 0 #16130D;cursor:pointer}
.btn:hover{background:#16130D;color:#E0D7BE;border-color:#CE2A1A}   /* 反色，不是變亮 */
.btn[disabled]{background:#4A4638;color:#9A9480;cursor:not-allowed}
```

**不要**做 hover 位移＋陰影縮短的「按壓」效果——那是新粗獷主義的語彙，不是型版的。

### 紙（所有內容卡片）

```css
.paper{background:#E0D7BE;color:#16130D;padding:clamp(16px,3vw,30px);box-shadow:5px 5px 0 #4A4638}
```

### 表格（帳冊）

```css
table{width:100%;border-collapse:collapse;background:#E0D7BE;color:#16130D;font-size:14px}
th,td{border:2px solid #16130D;padding:7px 9px;text-align:left;vertical-align:top}
th{background:#16130D;color:#E0D7BE;font-weight:900;font-size:12.5px;letter-spacing:.1em}
tbody tr:nth-child(even) td{background:#D2C8AC}
```

### 標籤

```css
.tag{display:inline-block;background:#16130D;color:#E0D7BE;font-family:"Roboto Mono",monospace;
  font-size:11px;letter-spacing:.18em;padding:3px 9px;margin:0 6px 6px 0}
.tag.r{background:#CE2A1A} .tag.o{background:#D2952A;color:#16130D} .tag.b{background:#2D4A8E}
```

### Footer

實心黑底 `#16130D`，文字 `#9A9480`，連結 `#D2952A`，`repeat(auto-fit,minmax(215px,1fr))` 四欄。
頂部 `2px solid #2F2B21` 分隔細則行。

---

## 六、動效規則

**四種動效缺一不可，全部都是硬切（`steps()`），不准補間。**
ROSTA 是離散的：型版壓下去、抬起來，中間沒有 0.5 塊版這種東西。

| 種類 | 做法 | 觸發 | 時值 |
|---|---|---|---|
| **ambient 環境** | 套版錯位漂移：四塊版的 `--mis*` 由 rAF 以 `sin(t/7.1)`、`sin(t/4.3)` 驅動 ±0.6px | 不需輸入 | 連續 |
| **ambient 環境二** | 補墨：每 6.5 秒隨機挑一格把紅版重壓一次（`filter:saturate(2.4) brightness(.82)`，`steps(2)`） | 計時器 | 520ms |
| **input 輸入** | 分版散開：hover／focus 一格，四塊色版各自往固定方向位移 5–9px，露出格線下的紙 | hover / focus-within | 60ms（`steps(2)`） |
| **transition 轉場** | 刷版擦除：`clip-path:inset(0 100% 0 0) → inset(0)`，`steps(8)`——刮刀一次刮過，八段硬切 | 進站／結果產生 | 440ms |
| **signature 簽名** | **逐版壓印 plate-pass**：捲到哪一格才刷哪一格的版；每格四塊版依 0 / .34 / .60 / .86s 硬切出現，並帶一次 4 幀的紙面震動 | IntersectionObserver | 每格 ~1.05s |

```css
/* 逐版壓印。預設是「已經刷好」——沒有 JavaScript 時整扇窗完整可見；
   只有 JS 加上 .stage 之後色版才先消失、再逐塊被刷出來。 */
.grid8.stage .cell .pl{opacity:0}
.grid8.stage .cell.pressed .pl{animation:pressplate .001s steps(1,jump-end) forwards}
.cell.pressed .pl-k{animation-delay:calc(var(--d,0s) + .00s)}
.cell.pressed .pl-o{animation-delay:calc(var(--d,0s) + .34s)}
.cell.pressed .pl-b{animation-delay:calc(var(--d,0s) + .60s)}
.cell.pressed .pl-r{animation-delay:calc(var(--d,0s) + .86s)}
@keyframes pressplate{from{opacity:0}to{opacity:1}}

.wipe{animation:wipe .44s steps(8,jump-none) both}
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
```

**降級（資訊零損失）**：`prefers-reduced-motion:reduce` 時，四塊版一律停在最終錯位位置、
不 stage、不壓印、不漂移、不補墨、不擦除；hover 的分版散開改為在格角標出「黑赭青紅」四個版名。
沒有 `IntersectionObserver` 時整扇窗直接是刷好的。

**明文禁用**：淡入淡出、視差、彈簧回彈、`ease-in-out`、任何 `cubic-bezier`。
本風格的緩動函數只有 `steps()` 與 `linear`。

---

## 七、插畫與圖像風格（stencil-plate）

全站**零外部圖片**。所有圖像由同一支引擎輸出，原語只有四種：

1. **硬邊剪影多邊形**——刀切的，座標在 0–100 方格上，沒有一條貝茲曲線。
2. **白橋內島**——見特徵 3。
3. **分版錯位**——每個多邊形宣告它屬於哪一塊版，版帶固定位移。
4. **象形身份物**——一個物件定身份，**人不畫臉**。鋼盔＝隊員、無盔＝居民、禮帽＝老闆。
   （馬雅可夫斯基的人物就是這樣：接近象形符號的平面化造形。）

```js
/* 字典格式：key: [ [版, 種類, 點列], ... ]   種類 p=實心 h=內島 l=粗線段 */
const GL = {
  fire:[['r','p','50,8 60,30 70,20 68,46 82,40 76,64 88,62 76,84 24,84 12,62 24,64 18,40 32,46 30,20 40,30'],
        ['kn','p','50,30 59,54 65,47 63,90 37,90 35,47 41,54']],   // kn = 在紅版之後挖空，露出紙
  chain:[['k','h','6,32 30,32 30,70 6,70'],['k','h','28,32 52,32 52,70 28,70'],
         ['k','h','50,32 74,32 74,70 50,70'],['k','h','72,32 96,32 96,70 72,70']]
};
/* 粗線段：折線兩側法向外推成封閉多邊形——刀切的線也是面，不是 stroke */
function thickLine(pts,w){ /* 見 Demo core.js */ }
```

**判準**：把顏色全部拿掉，仍讀得出「這一塊是切掉的，還是留下來的」。

**明文禁用**：半調網點、交叉排線、`feTurbulence` 手抖濾鏡（那是迷幻海報／龐克的語彙）、
細線幾何線描、寫實描繪、任何 `stroke` 屬性（線也要是面）。

**一扇窗的圖版文法**（八格版）：
第 1–4 格＝「出了什麼事」（現象 → 現象 → 惡化 → 後果）；
第 5–8 格＝「你要做什麼」（東西 → 手／工具 → 動作的對象 → 結果）。
硬規則：**相鄰兩格不得長一樣**，撞到就從備位象形換一枚。

---

## 八、Logo 與 Favicon

Logo 就是一扇最小的窗：**型版卡 → 紙 → 火 → 兩條白橋**。四層，缺一不可。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#6F6A58"/>
  <rect x="5" y="5" width="54" height="54" fill="#E0D7BE"/>
  <polygon points="32,11 39,26 46,18 44,37 55,32 47,53 17,53 9,32 20,37 18,18 25,26" fill="#CE2A1A"/>
  <polygon points="32,30 37,42 41,38 40,53 24,53 23,38 27,42" fill="#D2952A"/>
  <rect x="7" y="27" width="50" height="4" fill="#E0D7BE"/>
  <rect x="7" y="43" width="50" height="4" fill="#E0D7BE"/>
</svg>
```

Favicon 用同一組幾何寫成 inline SVG data URI（`<link rel="icon" href="data:image/svg+xml,...">`），
在 16px 下要仍讀得出「一個框、裡面一團紅、兩條橫的白線」。
換產業時只換中間那枚象形字，四層結構不動。

---

## 九、Do & Don't

**Do**

- 先決定「這一頁要叫人做什麼」，再決定分幾格。格數服務敘事。
- 文案寫成押韻對句。中文用十三轍，兩句同轍。
- 每一格都要能只看圖讀完。
- 顏色不夠用時**減格**，不要加版。
- 所有長文放在紙上，紙帶實心投影。
- 象形符號自己畫，並且重複使用——一套符號用久了才變成文法。
- 錯位留著。刻壞的痕跡是這個風格的價值。

**Don't（去 AI 化禁令）**

- ✗ 紫藍漸層、任何漸層
- ✗ 圓角卡片、模糊陰影、玻璃擬態
- ✗ 置中大標＋副標＋兩顆按鈕＋三張卡片
- ✗ emoji 當 icon（icon 一律自繪 SVG 多邊形）
- ✗ Lorem ipsum、「在當今快節奏的世界」、「把 X 變成 Y」句式標題
- ✗ `EST. 19xx` 徽章
- ✗ 淡入、滾動視差、彈簧動效
- ✗ 跑馬燈（marquee）——ROSTA 的資訊是靜止的，動的是讀者的眼睛
- ✗ 把格子做成等價的品項網格（那是 catalog，不是敘事）
- ✗ 用這個風格包裝與革命政治宣傳有關的實際內容

---

## 十、頁面骨架範例（可直接使用）

```html
<body>
  <!-- 油墨脹出／刀口內縮：靜態寫在 HTML 裡（filter 引用不到會整個元素不畫） -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="inkspread" x="-15%" y="-15%" width="130%" height="130%">
      <feMorphology operator="dilate" radius="0.55" in="SourceGraphic" result="spread"/>
      <feMorphology operator="erode" radius="0.28" in="spread"/>
    </filter>
  </svg>

  <header class="masthead">
    <a class="wordmark" href="index.html"><!-- logo svg --><span><b>站　名</b>
      <span>ROMANISED SUBTITLE</span></span></a>
    <nav class="stencil-nav" aria-label="主導覽">
      <a href="index.html" aria-current="page"><span class="no">一</span>第一頁</a>
      <a href="b.html"><span class="no">二</span>第二頁</a>
      <a href="c.html"><span class="no">三</span>第三頁</a>
      <a href="d.html"><span class="no">四</span>第四頁</a>
    </nav>
  </header>

  <main class="wrap wipe">
    <section class="stack">
      <div class="split-a">
        <div class="stack">
          <div class="tele"><span class="num">電報　編號　日期　時刻</span>
            <p>這一則是什麼、為什麼要緊。</p></div>
          <div class="paper"><h3>說明</h3><p>長文永遠在紙上。</p></div>
        </div>
        <div>
          <div class="window">
            <div class="window-head"><b>標題</b><span class="num">八格／四版</span></div>
            <div class="grid8">
              <div class="cell" data-i="0" tabindex="0"><span class="idx">1</span>
                <svg class="art" viewBox="-4 -4 108 108" role="img" aria-label="第 1 格：說明">
                  <rect x="-4" y="-4" width="108" height="108" fill="#E0D7BE"/>
                  <g class="pl pl-k" filter="url(#inkspread)"><!-- 黑版多邊形 --></g>
                  <g class="pl pl-o" filter="url(#inkspread)"><!-- 赭版多邊形 --></g>
                  <g class="pl pl-b" filter="url(#inkspread)"><!-- 青版多邊形 --></g>
                  <g class="pl pl-r" filter="url(#inkspread)"><!-- 紅版多邊形 --></g>
                </svg>
                <span class="cap">兩字</span>
              </div>
              <!-- …其餘七格… -->
            </div>
            <p><b>上句七字／下句七字</b></p>
          </div>
        </div>
      </div>
    </section>
    <div class="rule red"></div>
    <section class="cols"><!-- 三塊紙 --></section>
  </main>

  <footer><div class="fw"><!-- 四欄 --></div></footer>
</body>
```

---

## 十一、技術實作與相容性

本站的三項核心技術，各承載一個不可省略特徵。查證日期 **2026-09-10**。

### A 渲染層｜SVG `feMorphology`（dilate + erode）

- **承載**：特徵 2 的型版切邊與特徵 4 的油墨脹出。
  `dilate 0.55` 讓每一塊色版的邊緣長出油墨滲出（真實型版的邊一定會滲），
  隨後 `erode 0.28` 收回一點形成刀口——兩步串接的結果是「邊緣糊、內部實」，
  這是純幾何多邊形做不出來的。
- **支援現況**：MDN《`<feMorphology>`》標示 **Baseline · Widely available**，2015-07 起跨瀏覽器
  （Chrome/Edge、Firefox、Safari 全支援；caniuse `mdn-svg_elements_femorphology`）。
- **fallback**：不支援時濾鏡整個被忽略，多邊形照常以硬邊渲染——版面、色彩、可讀性完全不變。
  **重要**：filter 必須靜態寫在 HTML 裡，不能等 JS 注入——SVG 的 `filter` 屬性引用不到目標時，
  該元素會**整個不被繪製**。
- **效能**：濾鏡套在 `<g>` 層而非每個多邊形，八格窗共 32 次濾鏡取樣，實測無可見成本。

### B 動效與時間軸層｜`steps()` 逐格時間函數

- **承載**：特徵 1 與簽名動效。ROSTA 的敘事與製程都是離散的——
  用 `ease` 或 `linear` 會把「壓版」變成「淡入」，那就是另一個流派了。
  全站只有兩種緩動：`steps(n, jump-*)` 與 `linear`。
- **支援現況**：MDN《`steps()`》標示 **Baseline · Widely available**，2015-07 起跨瀏覽器。
  `jump-start` / `jump-end` / `jump-none` / `jump-both` 關鍵字同屬 Baseline；
  舊寫法 `steps(n, start|end)` 等同 `jump-start|jump-end`。
- **fallback**：無支援缺口。若整個 CSS 動畫被停用，色版停在最終狀態（見下方 `.stage` 設計），
  資訊零損失。
- **效能**：`steps(1)` 的 `opacity` 切換只觸發合成，不觸發 layout 或 paint。

### D 輸入與感測層｜`IntersectionObserver`

- **承載**：特徵 1 的「讀序即內容」。**捲到哪一格，才刷哪一格的版**——
  格的順序因此是不可跳過的時間，而不是一次全部湧出的裝飾動畫。
  `threshold: 0.35`，每格觸發後即 `unobserve`（一扇窗只刷一次，就像真的一樣）。
- **支援現況**：MDN《IntersectionObserver》標示 **Baseline · Widely available**，2019-03 起跨瀏覽器。
- **fallback**：`if(!('IntersectionObserver' in window))` 時直接把所有格加上 `.pressed`，
  整扇窗立即完整；`prefers-reduced-motion:reduce` 時走同一條路。
- **關鍵設計**：預設樣式是「已經刷好」，只有 JS 主動加上 `.grid8.stage` 之後色版才會先消失。
  這樣**關掉 JavaScript 的人看到的是一扇完整的窗**，而不是一片空白的紙。

### 效能預算（實測）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | ≤350KB | 36.2 / 44.4 / 46.2 / 86.0 KB（窗庫頁 24×4 = 96 枚 inline SVG 最重） |
| 首屏 JS 執行 | ≤100ms | 型版引擎產生 8 格 ×4 版 ≈ 0.9ms（Node 22 量測同一段程式碼）；日期輪替與 DOM 寫入一次完成 |
| 主要動畫 | 60fps | ambient 每幀只做 2 次 `setProperty`，零 `getBoundingClientRect`，只改 `transform`/`opacity`，無 layout thrashing |
| 外部資源 | 僅 Google Fonts | 零外部圖片、零音檔、零函式庫 |

### 其他相依

- `clip-path: inset()`、CSS 自訂屬性於 `calc()` 中、`aspect-ratio`、CSS Grid、`:focus-visible`
  皆為 Baseline Widely available，無 fallback 需求。
- 未使用 `@property`、容器查詢、View Transitions、Houdini——本風格不需要它們，
  加進來只會讓規格書變重。
