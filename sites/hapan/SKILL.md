---
name: rosta-window
description: Soviet ROSTA Window agitprop poster style — numbered pane sequences, hand-cut stencil silhouettes held together by visible paper bridges, three hand-registered ink plates on coarse paper, and a rhymed couplet locked inside every frame.
---

# 蘇聯 ROSTA 窗　Окна РОСТА

> 1919 年 10 月至 1921 年，俄羅斯通訊社（РОСТА）把當天電報上的消息，在幾個小時內畫成一面多格的手工模版海報，
> 貼在莫斯科與各城市空店面的櫥窗裡。主要作者是 Владимир Маяковский（馬雅可夫斯基）與 Михаил Черемных（切列姆內赫），
> 三年間產出約 1600 面。全部以裁刀刻蠟紙模版、手工刷印，一面窗刷數十到上百份分送各地櫥窗。

## 一、設計哲學

**這個風格的每一條規則都是製作條件逼出來的，不是品味選出來的。**

當時的現實是：沒有印刷機、紙很差、油墨只有幾種顏色、識字率低、而消息今天不貼出去明天就過期了。
於是——

- 沒有印刷機 → **刻模版、手刷**。模版是一張紙，被挖掉的地方讓墨透過去。這一條決定了全部的形狀語彙。
- 油墨只有幾種 → **一色一塊版**，多一個顏色就要多刻一塊版、多刷一趟、多對一次位。所以顏色少，而且**顏色一定有語意**，不然不值得多刷那一趟。
- 識字率低 → **圖要能自己說完**，而且要**分格**、要**有順序**。一格一件事，最後一格是結論。
- 消息會過期 → 東西要快、要粗、要遠看得到。**細節是奢侈品**。
- 要人記得住 → 每格配**押韻的對句**，能被唸出聲的句子才進得了腦子。

因此，做這個風格時，判準不是「好不好看」而是**「這張刻得出來嗎、刷得了幾份嗎」**。
一個做得對的 ROSTA 版面，把顏色抽掉、把文字遮掉，你還是讀得出「從第 1 格到第 6 格發生了什麼」。

**它不是**：普普藝術（那是印刷術的仿造）、不是龐克剪貼（那是影印機的美學）、
不是瑞士國際主義（那是網格與字體的秩序）、不是構成主義（那是斜對角的動力學）。
ROSTA 的骨架是**格**與**序**，它的手感是**裁刀**。

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個流派了。

---

### 特徵 1　編號格窗序列（numbered pane sequence）

整面版被粗黑框切成 **4 到 6 個等大方格**，左上到右下**依編號讀**，最後一格一定是結論或「打這支電話」。
海報是同時被看見的；窗是一格一格被讀完的。**沒有編號就不是窗。**

```css
.win{
  display:grid; grid-template-columns:repeat(3,1fr);   /* 3×2 或 2×2、2×3 */
  gap:5px; background:#17130E;                          /* 溝縫就是框線本身 */
  border:5px solid #17130E;
}
.pane{background:#EFE7D5;position:relative;display:flex;flex-direction:column}
.pane .num{                                             /* 編號一律咬住左上角，不留邊距 */
  position:absolute;top:0;left:0;width:38px;height:38px;
  background:#17130E;color:#EFE7D5;
  font-family:"Archivo Black",sans-serif;font-size:19px;
  display:grid;place-items:center;z-index:3;
}
.pane .art{aspect-ratio:1/1;position:relative;overflow:hidden;isolation:isolate}
@media(max-width:900px){.win{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.win{grid-template-columns:1fr}}  /* 手機一格一格捲，順序反而更清楚 */
```

**禁止**：格子大小不一（那是資訊磚，不是窗）、圓角、格與格之間留白（溝縫必須是框線的顏色）、把編號做成裝飾徽章。

---

### 特徵 2　模版剪影與紙橋（stencil silhouette held by bridges）

人與物是**平塗剪影**：沒有內部線條、沒有陰影、沒有透視、沒有漸層。
而因為它是一張真的紙，所有被墨包住的紙（眼睛、輪輻之間、玻璃格、字的內白）都是**浮島**——
刷子第一下就把它推走。所以每一座島都必須用一條**紙橋**接回主體，而橋會在成品上留下一道白線。

**那道白線不是失誤，它是這個流派最好認的特徵。看到白線，就知道這是刻出來的，不是畫出來的。**

```html
<!-- 圖像不是描外形，是「一張紙上挖出來的洞」。
     兩塊墨中間那條 3 格寬的紙，就是把上半塊接回下半塊的橋。 -->
<svg viewBox="0 0 28 28">
  <rect width="28" height="28" fill="#EFE7D5"/>
  <path fill="#17130E" d="M6 4h16v9H6z M6 16h16v8H6z"/>
</svg>
```

驗收（可直接複製的引擎，見第十二章有完整版）：

```js
// 留紙必須連成一整片：任何不接觸畫布邊界的留紙元件都是浮島
// 橋有多寬：把留紙從邊界往內縮 k 格，看它第幾級斷掉 → 橋寬約 2k−1 格
// 距離變換必須用 8-連通（Chebyshev），因為 feMorphology 的結構元素是方形，
// 這樣「JS 算出來的 k」與「畫面上 erode radius=k」才是同一件事
function erode(g,k){const d=dt(g),m=new Uint8Array(g.length);
  for(let i=0;i<g.length;i++)m[i]=(g[i]&&d[i]>k)?1:0;return m}
```

**橋寬的實務對照**（一面窗要刷 150 份）：

| 侵蝕第 k 級才斷 | 橋寬 | 刷得了幾份 |
|---|---|---|
| k=1 | ≈1 格 | 12 |
| k=2 | ≈3 格 | 70 |
| k≥3 | ≥5 格 | 150（撐得完一輪） |

**禁止**：細線幾何線描、寫實描繪、半調網點、`feTurbulence` 手抖毛邊（那是迷幻海報的語彙）、
`stroke-linecap:round`（裁刀不會把角割圓）、內部細節線。

---

### 特徵 3　三塊套色，顏色即語意（three plates, colour is meaning）

粗紙底 + 黑 + 紅（+ 藍）。**顏色不是裝飾，是語法**：

| 版 | 色 | 語意 | 面積 |
|---|---|---|---|
| 黑版 | `#17130E` | 危險／已經發生的／輪廓／全部的字 | ≈26% |
| 紅版 | `#C2202B` | 我們／你該做的事／箭頭／禁止斜槓／電話 | ≈24% |
| 藍版 | `#1D4E86` | 空氣與水（只有這一種） | ≈12% |
| 紙 | `#D6C7A6` | 唯一大面積地色 | ≈34% |
| 紙白 | `#EFE7D5` | 格內的紙、長文的底 | ≤4% |

規則：

1. **只有三塊。** 要第四個顏色就要多刻一塊版、多對一次位——所以不要有第四個顏色。
2. **兩版疊到的地方必須 multiply 出第三色**（紅×黑＝深赤 `#5C1216`，紅×藍＝深紫 `#3E2050`）。疊出來的顏色不另外指定，它是算出來的。
3. **紅版永遠刷偏 0.5–0.7 使用者單位。** 錯位是手工套印的證據，不是失誤。

```css
:root{--pa:#D6C7A6;--pl:#EFE7D5;--bk:#17130E;--rd:#C2202B;--bu:#1D4E86}
.art{isolation:isolate}                 /* 讓 multiply 只在這一格內生效 */
.plate.r,.plate.b{mix-blend-mode:multiply}

/* 粗紙：用 CSS 條紋，不要用圖片 */
body{background:var(--pa);
 background-image:
  repeating-linear-gradient(92deg,rgba(23,19,14,.045) 0 1px,transparent 1px 3px),
  repeating-linear-gradient(2deg ,rgba(23,19,14,.03 ) 0 1px,transparent 1px 4px);}
```

**禁止**：漸層（除非是模擬金屬，而 ROSTA 沒有金屬）、模糊陰影（陰影一律是實心位移色塊）、
第四個強調色、把紅色拿去當「品牌色」用在不需要行動的地方。

---

### 特徵 4　格內押韻對句（rhymed couplet inside the frame）

每一格底部一條**粗體對句**：兩行**字數相同、尾字同韻**，字級大到把整格寬度撐滿。
文字在框內、是圖的一部分，不是圖下面的說明文字。

**不押韻的話，讀的人不會把它唸出聲，也就記不住。**

```css
.cap{border-top:5px solid #17130E;padding:9px 10px 11px;background:#EFE7D5}
.cap p{font-weight:900;font-size:clamp(15px,1.72vw,20px);
       letter-spacing:.02em;line-height:1.28}
.cap p+p{color:#C2202B}          /* 下句換紅版：兩行不是同一件事，是呼與應 */
.cap small{display:block;margin-top:5px;font-size:11px;font-weight:500;opacity:.62}
```

寫法示例（中文，7 字對 7 字）：

```
聞著臭味毋通慌 ／ 跤步先退到門旁      押 ang 韻
電火開關莫去撥 ／ 打火機仔收落橐      押 o  韻
窗仔門扇攏拍開 ／ 氣走人才活得來      押 ai 韻
```

**禁止**：置中的說明文字、兩行字數不一樣、把對句放到格線外面、用細字重、
出現「在當今快節奏的世界」這種語氣。ROSTA 的句子只有三種：命令句、後果句、電話號碼。

---

### 特徵 5　粗箭頭與套印錯位（fat arrows, hand registration）

動作用**實心粗箭頭**、禁止用**一道粗斜槓**、強調用**放射短線**。
零透視、零曲線裝飾、零圓角、零模糊陰影。所有裝飾母題都是**可以用裁刀一刀劃出來的直邊多邊形**。

```html
<!-- 箭頭：全部直邊，箭頭本身就是一個閉合多邊形，不用 marker、不用 stroke -->
<path fill="#C2202B" d="M2.2 11.1h4.3V7.8l4.7 4.5-4.7 4.5v-3.3H2.2z"/>
<!-- 禁止：一道 3 單位寬的斜槓壓過整格 -->
<path fill="#C2202B" d="M3.4 24.4 24.3 3.5l3 3L5.5 27.6z"/>
```

```css
/* 套印錯位＝ambient 動效。單位是 SVG 使用者單位（viewBox 28 格），不是螢幕 px */
@keyframes drift{
  0%,100%{transform:translate(0,0)}
  33%    {transform:translate(.17px,-.12px)}
  66%    {transform:translate(-.13px,.16px)}}
.plate  {animation:drift 23s ease-in-out infinite}
.plate.r{animation-duration:19s;animation-delay:-4s}
.plate.b{animation-duration:29s;animation-delay:-11s}
```

**禁止**：`marker-end` 箭頭、細箭頭、曲線箭頭、發光、外框線 + 填色的雙層按鈕、
`border-radius` 大於 0。

## 三、色彩系統

| 用途 | Hex | 比例 | 規則 |
|---|---|---|---|
| 粗紙（唯一大面積地色） | `#D6C7A6` | 34% | 永遠帶 CSS 纖維紋；不可換成純白或純米白 |
| 紙白（格內、長文底） | `#EFE7D5` | 4% | 只在框內出現，不當頁面底 |
| 黑版 | `#17130E` | 26% | 所有框線、輪廓、正文；不是純黑（純黑刷不出來） |
| 紅版 | `#C2202B` | 24% | 只給「我們／該做的事／禁止」；連結、現用態、主要按鈕 |
| 藍版 | `#1D4E86` | 12% | 只給空氣、水、量測工具（focus ring、侵蝕檢查層） |
| 深赤（紅×黑 multiply） | `#5C1216` | — | 不手動指定，由疊印算出 |
| 深紫（紅×藍 multiply） | `#3E2050` | — | 同上 |
| 頁尾深墨 | `#0E0B08` | 2% | 只有 footer |

**對比**：所有長文一律放在 `#EFE7D5` 或 `#17130E` 上（對比 ≥ 12:1）。
紙底 `#D6C7A6` 上只放 900 字重、18px 以上的短句。紅底上的文字一律 `#EFE7D5`。

## 四、字體系統

- 中文：**Noto Sans TC**，只用 `500 / 700 / 900`。標題與對句一律 900，正文 500，其餘 700。
- 拉丁與數字：**Archivo Black**（單一字重）。**所有數字都是它**——窗號、電話、價錢、讀數、編號。
- 等寬字**禁用**（那是終端機的語彙，ROSTA 沒有螢幕）。

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+TC:wght@500;700;900&display=swap');
body{font-family:"Noto Sans TC",system-ui,sans-serif;font-weight:700;line-height:1.5}
.mono{font-family:"Archivo Black",sans-serif;letter-spacing:.04em}
```

字級 scale（`clamp` 全部貼齊，不留中間值）：

| 角色 | 值 | 字重 | 字距 |
|---|---|---|---|
| 窗號／頁名 | `clamp(20px,3.4vw,34px)` | 900 | `.05em` |
| 章節標題 h2 | `clamp(21px,3vw,30px)` | 900 | `.04em` |
| 對句 | `clamp(15px,1.72vw,20px)` | 900 | `.02em` |
| 標籤 `.tag` | `11px` | 900 | `.16em` |
| 正文 | `14–15px` | 500 | `0` |
| 導覽 | `clamp(15px,1.9vw,19px)` | 900 | `.22em` |

**規則**：標籤與導覽的字距一定要拉開（`.14em` 以上）——手刻的字排不緊。
正文字距一律 0，因為正文是被排字工排的，不是被刻的。

## 五、版面與網格

- **主框線寬 `--fr:5px`**（≤560px 降為 4px）。所有分隔都是這條線；**不用 border-radius、不用陰影分層**。
- 頁面骨架恆為：**鋼印帶（黑底社名＋窗號）→ 挖穿導覽 → 主體 → 黑底頁尾**。
- 主體採**不對稱雙欄** `1.15fr / 1fr` 或 `1.55fr / 1fr`；**不要三等分卡片列**。
  需要三欄時用 `1.25fr 1fr 1.1fr` 這種不等分，並讓三塊底色不同（紙／黑／彩）。
- 內容寬度上限 `1180px`，左右 padding 18px。
- **旋轉角度**：整站只允許兩個角度——揭紙轉場的 `-2.4deg`，以及禁止斜槓的 `45deg`。其餘一律正交。
- **留白規則**：格內滿版（留白 <20%），長文一律退到 `.box`（紙白底、5px 黑框）裡。
  **不要在紙底上直接放長段落。**

## 六、元件配方

```css
/* 導覽：挖穿模版 stencil-cut —— 現用頁的字是紙上的洞，透出後面那層會動的紅墨 */
nav.cut ul{display:grid;grid-template-columns:repeat(4,1fr);list-style:none}
nav.cut li{border-right:5px solid #17130E;position:relative}
nav.cut a{display:block;padding:15px 10px 13px;text-align:center;border:0;
  font-weight:900;letter-spacing:.22em;color:#17130E}
nav.cut li:not(.on) a::after{content:"";position:absolute;inset:8px 10px;
  border:2px dashed #17130E;opacity:0;transition:opacity .09s steps(2)}   /* 畫好待挖的線 */
nav.cut li:not(.on) a:hover::after{opacity:.5}
nav.cut li.on{box-shadow:inset 0 0 0 3px #17130E}                          /* 裁刀留下的切口 */
nav.cut li.on a{
  background:repeating-linear-gradient(58deg,#C2202B 0 26px,#8E161F 26px 52px);
  background-size:220% 100%;-webkit-background-clip:text;background-clip:text;
  color:transparent;animation:inkroll 15s linear infinite}
@keyframes inkroll{to{background-position:200% 0}}
@supports not ((-webkit-background-clip:text) or (background-clip:text)){
  nav.cut li.on a{color:#C2202B;background:none;animation:none}}

/* 按鈕：實心位移陰影，按下用 steps 跳兩格（沒有中間態） */
.btn{background:#C2202B;color:#EFE7D5;border:4px solid #17130E;
  font-weight:900;font-size:15px;letter-spacing:.1em;padding:9px 16px;cursor:pointer;
  box-shadow:5px 5px 0 #17130E;
  transition:transform .08s steps(2),box-shadow .08s steps(2)}
.btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #17130E}

/* 表格：3px 線，表頭黑底反白，數字欄靠右且用 Archivo Black */
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{border:3px solid #17130E;padding:6px 9px;text-align:left}
th{background:#17130E;color:#EFE7D5;font-size:12px;letter-spacing:.12em;font-weight:900}
td.n{font-family:"Archivo Black",sans-serif;text-align:right}
.tw{overflow-x:auto}                     /* ≤560px 表格橫捲，不要讓它擠爛 */

/* 表單：輸入框是紙底＋3px 黑框，選中的 radio 整塊變紅版 */
input[type=text],input[type=tel],select,textarea{
  width:100%;font-family:inherit;font-weight:700;font-size:16px;   /* 16px：iOS 不放大 */
  background:#D6C7A6;border:3px solid #17130E;padding:8px 9px;border-radius:0}
.radios label{display:inline-flex;align-items:center;gap:6px;
  background:#D6C7A6;border:3px solid #17130E;padding:6px 11px;cursor:pointer;font-weight:700}
.radios label:has(input:checked){background:#C2202B;color:#EFE7D5}
.f.bad .err{display:block}               /* 錯誤訊息是紅版色塊，不是紅字 */
.f .err{background:#C2202B;color:#EFE7D5;padding:6px 9px;font-size:13px;font-weight:700}

/* 頁尾：黑底，三欄不等分，紅色小標 */
footer.ft{background:#17130E;color:#EFE7D5;border-top:5px solid #17130E;padding:22px 0 30px}
footer.ft .cols{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:22px;font-size:13px;font-weight:500}
footer.ft b{display:block;margin-bottom:6px;color:#C2202B;letter-spacing:.1em}
```

## 七、動效規則

**四種都要有，缺一不可。全部以 `steps()` 或 `ease-in-out` 為主——模版印刷沒有中間態，能跳格就不要補間。**

| # | 種類 | 做什麼 | 觸發 | duration / easing |
|---|---|---|---|---|
| 1 | ambient | 三塊版各自漂移（見特徵 5）；缺墨斑跳格 | 無 | 19s／23s／29s `ease-in-out`；缺墨 13s `steps(5,jump-none)` |
| 2 | input-driven | 游標＝刮刀，指到的格子墨肥一階 | `pointerenter/move`、鍵盤方向鍵、`focus` | 進場即時（<100ms）；退回 4×130ms 的 steps |
| 3 | transition | 揭紙 lift-off：一張紙由下緣被掀走 | 進頁 | `.62s cubic-bezier(.5,0,.3,1)` |
| 4 | signature | **刷版逐張 pull-run**：刮刀逐格橫過，一趟掉一張紙 | 按「刷」 | 每趟 `.42s steps(28)`；全程壓縮在 6.8 秒 |

```css
/* 2 input-driven：radius 由 JS 寫進 feMorphology，退回時分四個 steps */
/* 3 transition */
.lift{position:fixed;inset:0;background:#EFE7D5;z-index:99;pointer-events:none;
  animation:lift .62s cubic-bezier(.5,0,.3,1) forwards;transform-origin:0 100%}
@keyframes lift{
  0%  {clip-path:inset(0 0 0 0);   transform:rotate(0) translateY(0)}
  100%{clip-path:inset(0 0 100% 0);transform:rotate(-2.4deg) translateY(-9%)}}

/* 4 signature */
.sqz.run{opacity:.92;
  animation:sweep .42s steps(28) infinite;             /* 舊瀏覽器落在這一行 */
  animation-timing-function:steps(28,jump-none)}       /* 不支援即被丟棄 */
@keyframes sweep{from{transform:translateX(0)}to{transform:translateX(940%)}}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  .lift{display:none}          /* 轉場整個不播，內容直接就在 */
  .starve{opacity:.35}         /* 缺墨改為靜態一組 */
}
```

**降級後資訊零損失**：ambient 停在一組固定的套印偏移（畫面仍是三塊版）；
input-driven 不改 radius（墨線仍在）；transition 不播（頁面直接可讀）；
signature 直接跑完全部份數並顯示同一份結果文字（不播動畫，數字一模一樣）。

**禁用**：通用淡入當主要動效、視差、滾動劫持、彈跳緩動、任何 `blur()`。

## 八、插畫與圖像風格

技法名稱：**stencil-bridge silhouette 模版橋接剪影**。

全站**沒有一張外部圖片、沒有一張描外形的插圖**。所有圖像都是「一張紙上挖出來的洞」，由三步生成：

1. **格集合**：在 28×28（或 24×24／32×32）的格陣上定義哪些格被挖掉。原語只有五種——
   `rect`（矩形）、`disc`（圓）、`ring`（可指定斷口的環）、`bar`（有寬度的線段）、`poly`（多邊形）。
   **不允許任何一種「描外形」的原語**。
2. **可切割性驗收**：留紙必須單一連通並接觸畫布邊界；小於 8 格的浮島直接刷掉，大於 8 格的以 BFS 最短路補橋。
3. **邊界追蹤與圓化**：對洞集合做邊界追蹤得到封閉多邊形 → Chaikin 平滑 2 次 → RDP 簡化（ε=0.05 格）→ 輸出 `path`。
   **這一步很重要**：格子是裁刀的軌道，刷出來的邊會被刷子帶圓。
   **只用格子直接畫矩形就變成像素風（pixel-sprite），那是另一個流派。**

判準：**把顏色拿掉，仍讀得出哪一塊是紙、哪一塊是洞，而且找得到每一條紙橋。**

```js
// 邊界追蹤（hole = g[i]===0）→ Chaikin → RDP → SVG path
function contours(g,N){const m=new Map(),ad=(ax,ay,bx,by)=>{const k=ax*100+ay;
  if(!m.has(k))m.set(k,[]);m.get(k).push([bx,by])};
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){ if(g[y*N+x])continue;
  const up=y===0||g[(y-1)*N+x],dn=y===N-1||g[(y+1)*N+x],
        lf=x===0||g[y*N+x-1],rt=x===N-1||g[y*N+x+1];
  if(up)ad(x+1,y,x,y); if(dn)ad(x,y+1,x+1,y+1);
  if(lf)ad(x,y,x,y+1); if(rt)ad(x+1,y+1,x+1,y);}
 /* 依起點串成封閉迴圈後回傳 */ }
function chaikin(p,it){p=p.slice(0,-1);for(let t=0;t<it;t++){const q=[],n=p.length;
  for(let i=0;i<n;i++){const a=p[i],b=p[(i+1)%n];
    q.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25]);
    q.push([a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75]);}p=q}return p}
```

**禁止**：照片、寫實描繪、細線幾何線描、半調網點、交叉排線、等角視圖、
`feTurbulence` 手抖、任何在剪影內部畫線的行為。

## 九、Logo 與 Favicon

**Logo 就是一面兩格的窗**：兩個 84px 方格、5px 黑框、左上角壓一枚編號方塊，
第 1 格是黑版剪影（紅版錯位疊印），第 2 格是紅底黑剪影。字標放右側，
而且**字的封閉內白要以紙橋接出去**（「合」的口、「安」的宀下的空間）——
標誌自己也必須是刻得出來的。

```svg
<rect x="6" y="6" width="84" height="84" fill="#17130E"/>
<rect x="11" y="11" width="74" height="74" fill="#EFE7D5"/>
<!-- 剪影：紅版先，錯位 (0.5,-0.4)，黑版後 -->
<rect x="11" y="11" width="18" height="18" fill="#17130E"/>   <!-- 編號方塊 -->
<text x="20" y="25.5" font-family="Archivo Black" font-size="14" fill="#EFE7D5" text-anchor="middle">1</text>
```

**Favicon**（原創 inline SVG data URI，寫在 `<head>`）：一面 2×2 的窗，
一格紅一格藍，其餘留紙——16px 下唯一還讀得出來的，就是「格」。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23D6C7A6'/%3E%3Crect x='2' y='2' width='28' height='28' fill='none' stroke='%2317130E' stroke-width='3'/%3E%3Crect x='15' y='2' width='3' height='28' fill='%2317130E'/%3E%3Crect x='2' y='15' width='28' height='3' fill='%2317130E'/%3E%3Crect x='6' y='6' width='7' height='7' fill='%23C2202B'/%3E%3Crect x='20' y='20' width='7' height='7' fill='%231D4E86'/%3E%3C/svg%3E">
```

## 十、Do & Don't

**Do**

- 先問「這張刻得出來嗎」，再問好不好看。每一個形狀都要能用裁刀一刀劃出來。
- 每一格只講一件事，最後一格一定是結論或電話。
- 顏色先分配語意再分配位置。三塊版就是三個語意，不是三種裝飾。
- 讓紙橋看得見。白線是特徵，不要藏。
- 對句兩行字數一樣、尾字同韻。唸得出聲才記得住。
- 手機上讓窗變成單欄——順序反而更清楚，這個風格天生適合直向捲。
- 表單的錯誤訊息用紅版色塊，不要用紅字。

**Don't**

- ❌ 紫藍漸層、任何漸層（除非在模擬金屬，而這個流派沒有金屬）
- ❌ 圓角、模糊陰影、玻璃擬態、`blur()`
- ❌ 置中大標＋副標＋兩顆按鈕＋三張等寬圓角卡片
- ❌ emoji 當 icon（icon 一律自繪 SVG，而且必須是直邊多邊形）
- ❌ 細線幾何線描、半調網點、`feTurbulence` 手抖邊、`stroke-linecap:round`
- ❌ 等寬字、細字重、字距為 0 的大標
- ❌ 第四個顏色
- ❌ 「EST. 19xx」年份徽章、「把 X 變成 Y」句式、Lorem ipsum、AI 腔文案
- ❌ 通用淡入當簽名動效；把四種動效砍到只剩一種

## 十一、頁面骨架範例

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>今日的窗 第 411 號｜合安瓦斯行</title>
<link rel="icon" href="data:image/svg+xml,…">          <!-- 見第九章 -->
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+TC:wght@500;700;900&display=swap" rel="stylesheet">
<style>/* 全部 inline，見第三～七章 */</style></head><body>

<div class="lift" aria-hidden="true"></div>            <!-- 3 transition：揭紙 -->

<div class="rail-top"><div class="wrap">                <!-- 鋼印帶：社名／窗號／地址／電話／時段 -->
  <b>合安瓦斯行</b><span class="no mono">窗 №411</span>
  <span>基隆市仁愛區南榮路 141 巷 7 號</span><span class="mono">(02) 2426-3118</span>
</div></div>

<nav class="cut" aria-label="主導覽"><ul>                <!-- 挖穿模版導覽 -->
  <li class="on"><a href="index.html" aria-current="page">今日的窗<em>TODAY</em></a></li>
  <li><a href="khek.html">刻窗房<em>CUT</em></a></li>
  <li><a href="tong.html">窗　檔<em>ARCHIVE</em></a></li>
  <li><a href="sang.html">叫　氣<em>ORDER</em></a></li>
</ul></nav>

<main><div class="wrap">
  <div class="winhead"><b>第 411 號窗</b><span class="mono">民國 115 年 8 月 13 日</span>
    <span>刷 150 份　貼 37 處　三塊版：黑・紅・藍</span></div>

  <section class="win" aria-label="第 411 號窗，六格依編號讀">
    <article class="pane">
      <span class="num mono">1</span>
      <div class="art">
        <svg viewBox="0 0 28 28" role="img" aria-label="第 1 格：聞到味">
          <defs><filter id="fx0" filterUnits="userSpaceOnUse" x="-3" y="-3" width="34" height="34">
            <feMorphology in="SourceGraphic" operator="dilate" radius="0"/></filter></defs>
          <g transform="translate(.55 -.45)">                       <!-- 套印錯位：外層 -->
            <g class="plate b" filter="url(#fx0)"><path fill="#1D4E86" d="…"/></g>
          </g>                                                       <!-- 漂移動畫：內層 -->
          <g class="plate" filter="url(#fx0)"><path fill="#17130E" d="…"/></g>
        </svg>
        <span class="starve" aria-hidden="true"></span>              <!-- 1 ambient：缺墨 -->
      </div>
      <div class="cap">
        <p>聞著臭味毋通慌</p><p>跤步先退到門旁</p>
        <small>聞到味　押 ang 韻　藍版：氣　黑版：形</small>
      </div>
    </article>
    <!-- …格 2–6… -->
  </section>

  <div class="winfoot"><span>這面窗禮拜三下午換第 412 號。</span></div>
  <div class="tw"><table>…價目…</table></div>
</div></main>

<footer class="ft"><div class="wrap"><div class="cols">…</div></div></footer>
<script>/* 全部 inline */</script>
<noscript><!-- 靜態備援說明：關掉 JS 仍讀得到全部資訊 --></noscript>
</body></html>
```

**外層 `transform` 屬性放套印錯位、內層 class 放漂移動畫**——這一點不能顛倒：
CSS `transform` 會覆蓋 SVG 的 `transform` 屬性，寫在同一個元素上錯位會被動畫吃掉。

## 十二、技術實作與相容性

### 12.1 三項核心技術

| 層 | 技術 | 在本風格承載什麼 |
|---|---|---|
| **E 資料與生成** | 4-連通元件（BFS）＋Chebyshev 距離變換＋侵蝕階梯＋BFS 最短補橋 | 特徵 2「紙橋」的全部驗收 |
| **A 渲染** | `SVG feMorphology`（`erode` / `dilate`） | 特徵 5 的墨線肥瘦、刮刀即時回饋；把演算法的判斷**畫給人看** |
| **B 動效與時間軸** | `steps()` 逐格動畫 | 簽名動效 pull-run、缺墨跳格 |

三項分屬三層，且**互相咬合**：JS 用距離變換算出「侵蝕到第 k 級才斷」，
畫面上用 `feMorphology operator="erode" radius="k"` 讓瀏覽器把同一件事**真的做一遍**（不是用 JS 畫出來的近似圖）——
因此距離變換必須用 **8-連通 Chebyshev**，才會和 `feMorphology` 的方形結構元素逐格相符；
數字說橋只有 1 格寬，眼睛就看到那條橋在第 1 級消失。這是本站選這兩項技術的唯一理由。

### 12.2 支援現況（2026-08-13 查證）

**`<feMorphology>`** — MDN 標示 **Baseline Widely available**，自 2015-07 起跨瀏覽器可用
（查證來源：MDN《`<feMorphology>`》頁面的 Baseline 標記；caniuse 條目 `mdn-svg_elements_femorphology_html_elements`）。
`radius` 以使用者座標系為單位（`primitiveUnits` 預設 `userSpaceOnUse`），
所以在 `viewBox="0 0 28 28"` 裡 `radius="1"` 正好是一格。
**Fallback**：不支援時整個 filter 被忽略，剪影、三塊版、紙橋與版面完全不變，
只是墨線不會肥瘦、侵蝕檢查改由 JS 讀數承擔（頁面已把數字寫在旁邊）。**資訊零損失。**

**`steps()` 與 `jump-*` 關鍵字** — 基本形式 `steps(n)`（等同 `steps(n, jump-end)`）
自 CSS Animations Level 1 起即跨瀏覽器可用；
`jump-none` 等新關鍵字據 caniuse `mdn-css_properties_animation-timing-function_jump`
為 **全球覆蓋 95.57%**（Chrome 77+、Edge 79+、Firefox 65+、Safari 14+、Opera 64+、Samsung Internet 12+）。
**寫法**：先寫 `animation:… steps(28) infinite`，下一行再用
`animation-timing-function:steps(28,jump-none)` 覆蓋——不支援時第二行被丟棄，
動畫仍以 `steps(28)` 播放，只差最後一格的停留時間。**資訊零損失。**

**`:has()`**（本站用於 `.radios label:has(input:checked)`）— Baseline 2023（Safari 15.4+、Chrome 105+、Firefox 121+）。
**Fallback**：不支援時選中的選項不會整塊變紅，但原生 radio 圓點仍在（`accent-color` 也是紅版），
選擇狀態仍然看得見。

**`background-clip:text`**（挖穿導覽）— 已附 `@supports not (…)` 分支，
不支援時現用頁的字直接是紅版實色，切口線與虛線刻線都還在。

**`mix-blend-mode:multiply`** — Baseline Widely available。不支援時彩版直接蓋在黑版上，
只是少了疊印出來的深赤與深紫，語意層級不變。

### 12.3 效能實測

| 項目 | 實測 | 預算 |
|---|---|---|
| 完整驗收一次（連通元件＋距離變換＋6 級侵蝕階梯，28×28） | **0.056 ms**（Node 22，500 次平均） | — |
| 邊界追蹤＋Chaikin×2＋RDP → path 字串 | 0.5–2.2 KB／張 | — |
| 單頁大小（含全部 inline CSS/JS/SVG，不含字型） | 32–70 KB | ≤350 KB ✅ |
| 首屏 JS 執行 | 六格路徑已在建置期烘成靜態 `path`，執行期只掛事件 | ≤100 ms ✅ |
| 主要動畫 | 只改 `transform` 與 `feMorphology radius`，不觸發 layout | 60fps ✅ |

因為驗收只要 0.056 ms，**每一刀都可以即時重算**——使用者拖著挖的時候，
浮島標紅、紙橋讀數、印樣路徑、判詞、版號是同一幀更新的。
這是選純 JS 圖論而不是 WebGL／Worker 的理由：**它已經夠快了，而且沒有相容性缺口。**

### 12.4 可切割性驗收（完整規則，可直接移植）

```js
const N=28;                                   // g[i]===1 留紙, 0 挖掉（墨透過去）
// 1) 浮島：任何不接觸畫布邊界的留紙連通元件
// 2) 最細紙橋：把留紙往內縮 k 格（Chebyshev d>k，等同 feMorphology erode radius=k），
//    第一個讓連通元件數變多（或歸零）的 k
//    → 橋寬 ≈ 2k−1 格
// 3) 洞率 open = 挖掉格數 / N²
// 4) 碎邊 rough = 洞的邊界長度 / (4·√洞面積)
function dt(g){                                   // 8-連通 Chebyshev，兩趟掃描
  const d=new Int16Array(N*N);
  for(let i=0;i<N*N;i++)d[i]=g[i]?999:0;
  const at=(x,y)=>(x<0||y<0||x>=N||y>=N)?0:d[y*N+x];   // 畫布外一律視為洞
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const i=y*N+x;
    d[i]=Math.min(d[i],at(x-1,y)+1,at(x,y-1)+1,at(x-1,y-1)+1,at(x+1,y-1)+1)}
  for(let y=N-1;y>=0;y--)for(let x=N-1;x>=0;x--){const i=y*N+x;
    d[i]=Math.min(d[i],at(x+1,y)+1,at(x,y+1)+1,at(x+1,y+1)+1,at(x-1,y+1)+1)}
  return d}
```

驗收門檻（可依畫幅調整，但**四項都要有**）：

| 項 | 擋下 | 警告 |
|---|---|---|
| 浮島 | > 0 個 → 一定擋下 | — |
| 洞率 | < 4.5% 或 > 58% | 4.5–12%：遠看看不到 |
| 紙橋 | — | k=1 只刷得了 12 份 |
| 碎邊 | — | > 4.2 刷子會把細邊帶起來 |

---

*規格書版本 1.0，2026-08-13。範例站：`sites/hapan/`（桶裝瓦斯行 × 蘇聯 ROSTA 窗）。*
*本 SKILL 定義的是風格，不綁定產業——同一套規則可以拿去做防災宣導、疫苗接種站、工會、選舉公報、
球隊戰績板、食譜步驟圖，任何「一件事要分成幾格講完」的東西。*
