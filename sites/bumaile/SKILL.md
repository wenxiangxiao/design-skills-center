---
name: punk-xerox
description: British 1976-78 punk fanzine photocopy aesthetic — ransom-note lettering, binarised toner, tape and torn edges, solid black slabs and a single fluorescent spot colour.
---

# 龐克剪貼 Punk Xerox — 影印機美學規格書

## 一、設計哲學

1976 年秋天，倫敦的樂團傳單不是設計出來的，是**做**出來的：從報紙上一個字一個字剪下來、用膠水貼在打字紙上、拿去影印店印五十份、用釘書機釘在電線桿上。Jamie Reid 給 Sex Pistols 的《Never Mind the Bollocks》與《God Save the Queen》、Mark Perry 用打字機打出來的 *Sniffin' Glue*（1976，第一期只印 50 份）、Linder Sterling 的剪貼拼組，共同的技術前提只有一個：**這套視覺是影印機、剪刀與膠帶的物理極限所決定的，不是品味決定的。**

因此本風格的三條根本原則：

1. **只有黑與白。** 影印機沒有灰階，只有碳粉或沒有碳粉。任何漸層、模糊陰影、半透明柔光都會立刻把這個風格關掉。
2. **每一個元素都是被貼上去的。** 沒有「排版」，只有「貼」。所以萬物歪斜、萬物有邊、萬物疊在別的東西上面。
3. **劣化是內容不是瑕疵。** 影本的影本更糊，這件事要被看見、被計數、被寫進資訊架構裡。乾淨等於沒有經手過。

它適合的題材：社群互助、二手與修理、地下場景、公告與規則、任何「拒絕消費」或「拒絕客套」的敘事。它不適合：高單價精品、醫療與金融的信任場景、需要大量長文久讀的內容。

---

## 二、本風格的 5 個不可省略特徵

> 判準：拿掉其中任何一項，它就不再是 Punk Xerox。每一項都附可直接複製的 CSS/SVG。

### 特徵 1｜勒索信字母（ransom-note lettering）

標題不是字型，是一堆從別處剪下來的字。每個**字元**是一塊獨立的紙：自己的字體、自己的底色、自己的角度、自己的字級。中文同理（換的是黑體／明體／打字機體，以及底色）。

```css
.rc{display:inline-block;font-weight:900;line-height:1;margin:0 .5px;
    font-size:var(--sz,1em);              /* 0.82em – 1.28em 隨機 */
    padding:var(--py,1px) var(--px,2px);  /* 每塊紙的裁切餘白不一樣 */
    transform:rotate(var(--rot,0deg)) translateY(var(--dy,0)); }
.ra{font-family:Anton,sans-serif}  .rb{font-family:"Archivo Black",sans-serif}
.rc.rc{font-family:"Special Elite",serif} .rd{font-family:"Noto Serif TC",serif}
.rk0{background:#FBFAF6;color:#0C0B0A}   /* 從白報紙剪的 */
.rk1{background:#0C0B0A;color:#EDEBE4}   /* 從反白標題剪的 */
.rk2{background:#FF2D6E;color:#0C0B0A}   /* 從螢光紙剪的 */
.rcut{box-shadow:inset 0 -3px 0 #57544E} /* 剪到下一行的殘字 */
```

```js
// 決定性生成：同一個字串永遠得到同一組剪法
for (const ch of text){
  const f = FONTS[(r()*FONTS.length)|0];
  const k = (u=r()) < .58 ? 0 : u < .78 ? 1 : u < .90 ? 2 : 3;   // 底色權重
  html += `<span class="rc ${f} rk${k}" style="--rot:${((r()*2-1)*7.2).toFixed(2)}deg;
           --dy:${((r()*2-1)*3.4).toFixed(2)}px;--sz:${(.82+r()*.46).toFixed(3)}em">${ch}</span>`;
}
```

**參數硬規則**：旋轉 ±7.2°（超過 10° 就變成裝飾字而不是剪報）、垂直跳動 ±3.4px、字級 0.82–1.28em、底色分布約 白 58%／黑 20%／螢光 12%／膠帶黃 7%／灰 3%。**絕不**對整個字串套同一組參數。

### 特徵 2｜影印退化（generation loss）

二值化，而且是**可分級**的二值化。碳粉先外擴（`feMorphology operator="erode"` 在深色文字上就是變胖）、再模糊、再用線性轉換硬拉回黑白，高世代再加一次 `dilate` 把細筆畫打斷。影本比原稿白，所以濾鏡第一步是把整塊區域鋪成紙白。

```svg
<filter id="g3" x="-2%" y="-7%" width="104%" height="114%" color-interpolation-filters="sRGB">
  <feFlood flood-color="#FBFAF6" result="bg"/>
  <feComposite in="SourceGraphic" in2="bg" operator="over" result="flat"/>
  <feMorphology in="flat" operator="erode"  radius="0.30" result="thick"/>
  <feGaussianBlur in="thick" stdDeviation="0.66" result="bl"/>
  <feMorphology in="bl" operator="dilate" radius="0.14" result="br"/>
  <feComponentTransfer in="br">
    <feFuncR type="linear" slope="10" intercept="-4.2"/>
    <feFuncG type="linear" slope="10" intercept="-4.2"/>
    <feFuncB type="linear" slope="10" intercept="-4.2"/>
  </feComponentTransfer>
</filter>
```

五個世代的建議參數（erode／blur／dilate／slope，門檻恆為 `-0.42×slope`）：

| 世代 | erode | blur | dilate | slope |
|---|---|---|---|---|
| g1 | 0.15 | 0.25 | — | 14 |
| g2 | 0.24 | 0.42 | — | 12 |
| g3 | 0.30 | 0.66 | 0.14 | 10 |
| g4 | 0.40 | 0.95 | 0.24 | 8.5 |
| g5 | 0.50 | 1.30 | 0.38 | 7 |

**注意**：門檻要作用在 R/G/B（亮度），不是 alpha。對 alpha 做門檻只在透明底元素上有效，對有底色的區塊完全無效——這是實作這個特徵最常見的錯誤。

### 特徵 3｜剪貼疊層：兩種邊、膠帶、實心投影

紙塊只有兩種邊：**剪刀的直邊**與**手撕的毛邊**。投影一律是實心位移色塊，模糊陰影是另一個時代的東西。

```css
.sheet{background:#FBFAF6;border:3px solid #0C0B0A;box-shadow:7px 7px 0 #0C0B0A;padding:18px 20px}
.sheet.tilt{transform:rotate(-.7deg)}      /* 貼歪 0.5–1.2°，永遠不要貼正 */
.tp{position:absolute;height:26px;background:#D9C86F;opacity:.82;   /* 膠帶 */
    border-top:1px solid #F2E7A8;border-bottom:1px solid #A79646}
```

```js
// 手撕邊：把矩形的每一條邊換成有雜訊的折線（決定性）
function tornPoly(w,h,seed,amp=2.6){
  const r=mul32(fnv1a(seed)),p=[],n=9;
  for(let i=0;i<=n;i++)p.push([i*w/n,(r()*2-1)*amp]);          // 上緣
  for(let i=1;i<=n;i++)p.push([w+(r()*2-1)*amp,i*h/n]);        // 右緣
  for(let i=n-1;i>=0;i--)p.push([i*w/n,h+(r()*2-1)*amp]);      // 下緣
  for(let i=n-1;i>=1;i--)p.push([(r()*2-1)*amp,i*h/n]);        // 左緣
  return p.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ');
}
```

### 特徵 4｜打字機正文 + 大面積實黑塊

正文用打字機體（拉丁 `Special Elite`／`Courier Prime`，中文落回黑體並加 `letter-spacing:.01em`），行長刻意短。畫面上必須有**大面積 100% 實黑區塊反白字**，佔比 30–42%——它同時是影印機蓋子沒關的黑邊、也是版面的骨架。

```css
body{font:16px/1.62 "Noto Sans TC","Special Elite",sans-serif;background:#EDEBE4;color:#0C0B0A}
.blk{background:#0C0B0A;color:#EDEBE4;padding:18px 20px;border:3px solid #0C0B0A}
.blk a{color:#FF2D6E}
th{background:#0C0B0A;color:#EDEBE4;font-family:"Archivo Black",sans-serif;font-size:12px;letter-spacing:.04em}
/* 全域禁令 */
*{border-radius:0}
```

### 特徵 5｜單一螢光專色，且它永遠不是底色

黑白之外只准有**一個**顏色，而且只給三種語意：**現在**（現用態、focus）、**拒絕**（錯誤、退件、警告）、**可動作**（按鈕陰影、連結）。面積上限 14%，永不當大面積底色、永不做漸層、永不與另一個彩色相鄰。

```css
:root{--paper:#EDEBE4;--white:#FBFAF6;--ink:#0C0B0A;--ink2:#57544E;--gray:#A9A69E;
      --fluo:#FF2D6E;--tape:#D9C86F}
.btn{background:var(--ink);color:var(--paper);border:3px solid var(--ink);
     box-shadow:5px 5px 0 var(--fluo)}          /* 螢光只在陰影裡 */
.err{background:var(--fluo);color:var(--ink);border:3px solid var(--ink);font-weight:900}
:focus-visible{outline:3px solid var(--fluo);outline-offset:2px}
```

---

## 三、色彩系統

| 色票 | Hex | 用途 | 目標比例 |
|---|---|---|---|
| 影印紙 | `#EDEBE4` | 頁面底色（零紙紋，只有抖動點污） | 34% |
| 碳粉黑 | `#0C0B0A` | 實黑塊、邊框、正文、所有輪廓 | 38% |
| 白影本 | `#FBFAF6` | 被貼上去的紙塊、被影印過的區域（**比底色白**） | 12% |
| 螢光粉 | `#FF2D6E` | 現在／拒絕／可動作 | ≤14% |
| 膠帶黃 | `#D9C86F` | 膠帶、少數剪報字底 | ≤5% |
| 糊灰 | `#57544E` / `#A9A69E` | 高世代影本的字、停用態、次要註記 | ≤7% |

規則：**黑必須是最大或第二大的色塊**；紙白（`--white`）永遠比底色（`--paper`）亮，因為影本比原稿白；螢光色與膠帶黃不得相鄰；任何兩色之間不得有漸層過渡。

---

## 四、字體系統

外部只用 Google Fonts：`Anton`、`Archivo Black`、`Special Elite`、`Noto Sans TC (400/900)`、`Noto Serif TC (700/900)`。

| 角色 | 字體 | 級數 | 備註 |
|---|---|---|---|
| 剪貼標題 | 五種混用，逐字換 | `clamp(26px,4.6vw,44px)`，特大標到 68px | 見特徵 1 |
| 區塊標題 h3 | Archivo Black + Noto Sans TC 900 | 19px | `letter-spacing:.04em` |
| 正文 | Noto Sans TC 400 | 16px / 行高 1.62 | 手機 15px |
| 機器打字（館藏號、日期、數字） | Special Elite | 13px / 行高 1.5 | 一律 `.mono` |
| 手寫（卡背留言） | Special Elite + 逐字 ±5.5° 抖動 | 14.5px | 見 `scrawl()` |

字級階梯：10 / 12 / 13 / 14.5 / 16 / 19 / 24 / clamp(26–44) / clamp(34–68)。**不要**建立勻稱的模距系統——這個風格的字級來自「剪到的那塊剛好多大」。

---

## 五、版面與網格

- 內容寬 1180px，欄位刻意不對稱：主要用 `1.55fr / 1fr` 兩欄（紙塊欄 + 黑塊欄）。
- 每一塊紙旋轉 −1.2°–+1.1°，同一頁不得有兩塊角度相同。
- **留白率 <18%**：空白處補公告、補小字、補膠帶。這個風格沒有呼吸感。
- 邊界不整齊：紙塊允許 −26px 溢出容器（膠帶尤其要壓出邊界）。
- 行動版（≤560px）：兩欄塌成一欄，卡袋牆 6 欄→2 欄，導覽的英文副標隱藏，紙塊投影 7px→5px，但**旋轉角度與膠帶不得取消**——取消了就變成一般的響應式卡片。

---

## 六、元件配方

**導覽（generation-clarity 世代清晰度導覽）**：四頁四格橫排，現用頁是「原稿」（純白底、螢光內框、零濾鏡），其餘依與現用頁的距離套 `filter:url(#g2/#g4/#g5)`——離現在越遠，被影印的次數越多、越糊。副標直接寫「第 N 次影印」。這是把風格的核心規則交給導覽自己遵守。

```css
.gnav a{min-width:86px;padding:7px 10px 8px;background:#FBFAF6;color:#0C0B0A;
        border:2px solid #0C0B0A;border-left-width:0;font:900 14px/1.15 sans-serif}
.gnav a:first-child{border-left-width:2px}
.gnav a[data-g="1"]{filter:url(#g2)} .gnav a[data-g="2"]{filter:url(#g4)}
.gnav a[data-g="3"]{filter:url(#g5)}
.gnav a[aria-current="page"]{filter:none;box-shadow:0 0 0 3px #FF2D6E inset}
```

**按鈕**：實黑底 + 3px 黑框 + 5px 螢光實心位移陰影；hover 位移 2px 並把陰影縮到 3px（＝紙被按下去）。停用態換成灰底無陰影。

**卡片／紙塊**：見特徵 3。卡片內不得再有卡片（不做巢狀圓角卡片牆）。

**表單**：`input` 是 3px 黑框 + 打字機字；label 一律小字直述句；錯誤訊息用螢光粉整條 `.err`，並且**要指名規則第幾條**——這個風格的語氣是規則本身，不是客服。

**表格**：黑底反白表頭、2px 黑格線、偶數列 `#E4E1D9`。表格是這個風格的好朋友（fanzine 全是價目與清單）。

**頁尾**：整塊實黑，上緣 6px 螢光實線；三欄小字打字機體。

---

## 七、動效規則

四種必備，全部只動 `transform` / `filter` / `opacity`：

| 類型 | 內容 | 參數 |
|---|---|---|
| ambient 環境 | 頁首的影印掃描光帶：一條 120px 白色 `opacity:.10`、`skewX(-12deg)` 的帶子橫掃刊頭 | `7.5s linear infinite`，只改 `transform` |
| input-driven 輸入 | 圈選即剪貼（見第八節）、紙塊 hover 上浮 7px、按鈕按壓位移 | 全部 <100ms 起動；hover 用 `transform`，不用 `top/left` |
| transition 轉場 | 進紙：新內容以 `clip-path:inset(100% 0 0 0)` 由下緣送入 | `.42s cubic-bezier(.2,.75,.25,1)` |
| signature 簽名 | **generation-loss 影印世代退化**：白色掃描條由上往下掃過卡片，掃到哪一行、那一行的濾鏡世代就 +1 | 掃描 `.95s linear`；每行的觸發時間 = `(row.offsetTop+10)/cardHeight × 950ms`；掃完 0.55s 後整卡轉正 `gen×0.45°`、黑邊加厚、加一條膠帶 |

```css
@keyframes sweep{0%{transform:translateX(-200px) skewX(-12deg)}100%{transform:translateX(120vw) skewX(-12deg)}}
@keyframes feed{from{clip-path:inset(100% 0 0 0);transform:translateY(16px)}to{clip-path:inset(0 0 0 0);transform:none}}
@media (prefers-reduced-motion:reduce){
  .scan{animation:none;opacity:.06}   /* 光帶停在原地，仍是一道靜態亮痕 */
  .feed{animation:none}               /* 內容直接就位 */
  .pk:hover .card,.btn:hover{transform:none}
  /* 簽名動效：跳過掃描條，直接套用最終世代——劣化本身是狀態，一格都不會少 */
}
```

**禁止**：淡入淡出當主要語彙、視差、彈跳 easing、任何超過 1.3s 的動畫、跑馬燈。

---

## 八、圈選即剪貼（Selection API 互動範式）

本風格獨有的輸入方式：使用者圈選頁面上任何一段文字，放開的瞬間，那段字被「剪下來」貼到剪貼台上（原文一個字都不動——剪的是影本）。

```js
document.addEventListener('pointerup', () => setTimeout(onCut, 10));
function onCut(){
  const sel = getSelection();
  if(!sel || sel.isCollapsed || !sel.rangeCount) return;
  const txt = sel.toString().replace(/\s+/g,' ').trim(); if(!txt) return;
  const rg = sel.getRangeAt(0);
  let host = rg.commonAncestorContainer;
  if(host.nodeType === 3) host = host.parentNode;
  if(!host.closest('[data-cut]') || host.closest('input,textarea,.cutboard')) return;
  const rects = rg.getClientRects();
  const r0 = rects.length ? rects[0] : rg.getBoundingClientRect();  // 飛行動畫的起點
  for(const ch of [...txt.replace(/ /g,'')].slice(0,24)) CUT.push(ch);
  render(); fly(r0);
}
```

要點：(1) 用 `pointerup` 而不是 `selectionchange`，否則拖曳過程中會連續觸發；(2) `getClientRects()[0]` 取的是選取的第一行，跨行選取時飛行動畫才不會從一個橫跨半頁的巨大矩形出發；(3) 一律檢查 `closest('[data-cut]')`，把表單與剪貼台自己排除；(4) **不要**改動原始 DOM（`surroundContents` 會在跨節點選取時丟例外，也會破壞可存取性）。

---

## 九、插畫與圖像風格：`ransom-collage` 剪報勒索字構成

零外部圖片。所有圖像由四種原語構成，判準是**拿掉文字仍讀得出「這是被剪下來貼上去的」**：

1. **二值化剪影**：物件只用直邊多邊形與矩形畫，`fill:currentColor`，不畫輪廓線、不畫細線。影印機印不出漸層與細線。
2. **網點面**：陰影面用 4px 一格、1.7px 實心方塊的 `<pattern>` 填充，不用灰色。
   ```svg
   <pattern id="pdot" width="4" height="4" patternUnits="userSpaceOnUse">
     <rect x="0" y="0" width="1.7" height="1.7" fill="#0C0B0A"/></pattern>
   ```
3. **白色挖空**：高光是直接挖掉的白色方塊，不是漸層。
4. **碳粉髒污**：整頁鋪一層由 Bayer 8×8 有序抖動生成的點污（見第十一節），覆蓋率 6–9%，`mix-blend-mode:multiply`。

**禁止**：細線幾何線描、寫實描繪、`feTurbulence` 手抖濾鏡（那是迷幻海報的語彙）、半調圓網點（那是普普的語彙，本風格用方點）、任何 emoji 或圖示字型。

---

## 十、Logo 與 Favicon

Logo 是一塊被撕下來的紙（`tornPoly` 生成）、上緣一條實黑帶、中間一個二值化工具剪影、壓一條螢光粉膠帶與一條膠帶黃，底部一塊網點。純幾何、無文字——因為文字要用勒索信字母在頁面上現拼。

Favicon 用 inline SVG data URI，32×32 只放三件事：純黑底、白色剪影、一條螢光橫條。**不要**把 logo 縮小當 favicon，撕邊在 16px 下會變成雜訊。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230C0B0A'/%3E%3Crect x='2' y='13' width='19' height='6' fill='%23EDEBE4'/%3E%3Cpolygon points='20,8 29,8 29,14 25,14 25,18 29,18 29,24 20,24' fill='%23EDEBE4'/%3E%3Crect x='1' y='3' width='16' height='5' fill='%23FF2D6E'/%3E%3C/svg%3E">
```

---

## 十一、Do & Don't

**Do**

- 每一個字元都是獨立的一塊紙（標題），正文用打字機體。
- 黑要多。實黑塊佔 30–42%，而且是 `#0C0B0A` 不是 `#111` 的柔和黑。
- 所有東西貼歪，投影一律實心位移。
- 錯誤訊息指名規則第幾條，用命令句。
- 讓劣化被看見，並且**計數**——把「被影印過幾次」寫進資訊架構。
- 文案具體：價目、時間、地址、人名、數量。fanzine 的可信度來自細節。

**Don't**

- ❌ 漸層（尤其紫藍）、模糊陰影、圓角、玻璃擬態。
- ❌ 灰階柔和過渡——只有黑、白，與被抖動網點模擬出來的「假灰」。
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ❌ 用 emoji 當 icon；所有圖示自繪 SVG。
- ❌ Lorem ipsum、「在當今快節奏的世界」、「EST. 19xx」徽章。
- ❌ 兩個以上的彩色。第二個彩色一出現，這個風格就變成 Memphis 或 Neo-brutalism。
- ❌ 把 ransom 字用在正文——那會變成無法閱讀的裝置藝術。標題與 ≤24 字的短句而已。
- ❌ 跑馬燈。這個風格是釘在牆上的紙，紙不會捲動。

---

## 十二、頁面骨架範例

```html
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <pattern id="pdot" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="1.7" height="1.7" fill="#0C0B0A"/></pattern>
  <!-- g1…g5：見特徵 2 -->
</defs></svg>

<header class="top">
  <div class="scan"></div>                      <!-- ambient 掃描光帶 -->
  <div class="wrap">
    <a class="mark" href="index.html"><svg …/><b>不買了</b><span class="en">BUMAILE</span></a>
    <p class="tmeta">地址 · 電話 · 開放時間 · 一行講完</p>
    <nav class="gnav" aria-label="主導覽">
      <a href="a.html" aria-current="page"><b>卡袋牆</b><i>WALL · 原稿</i></a>
      <a href="b.html" data-g="1"><b>工具圖鑑</b><i>TOOLS · 第 1 次影印</i></a>
      <a href="c.html" data-g="2"><b>借還檯</b><i>DESK · 第 2 次影印</i></a>
    </nav>
  </div>
</header>

<main data-cut>                                 <!-- data-cut = 這一區的字可以被剪 -->
  <section class="wrap">
    <div class="cols">
      <div class="sheet tilt">
        <div class="tp" style="left:-22px;top:-15px;width:130px;transform:rotate(-9deg)"></div>
        <h2><!-- ransom('牆上的規矩') --></h2>
        <ol class="rules"><li><b>一次一件。</b><br><span class="small">你不會同時用兩把電鑽。</span></li></ol>
      </div>
      <div class="blk"><h3>錢的部分，一次講完</h3><table>…</table></div>
    </div>
  </section>
</main>

<aside class="cutboard"><h4>剪貼台 ／ 剪下來的字 <span id="cutn">0</span></h4>
  <div class="bin" id="cutbin" aria-live="polite"></div></aside>

<footer><div class="wrap cols3">…</div></footer>
</body>
```

---

## 十三、技術實作與相容性

### 13.1 所用 API 與支援現況（2026-08-23 查證）

| API | 狀態 | 查證來源 |
|---|---|---|
| `<feMorphology>`（`operator` / `radius`） | **Baseline Widely available**，2015-07 起跨瀏覽器 | MDN《`<feMorphology>`》頁面 Baseline 標記；caniuse `mdn-svg_elements_femorphology` |
| `<feComponentTransfer>` / `<feFuncR·G·B type="linear">`、`<feFlood>`、`<feComposite>`、`<feGaussianBlur>` | Baseline Widely available，同屬 Filter Effects Level 1，2015-07 起跨瀏覽器 | MDN SVG filter 元素頁；caniuse `svg-filters` |
| `Window.getSelection()` / `Selection` / `Range.getClientRects()` | **Baseline Widely available**，2015-07 起跨瀏覽器 | MDN《Selection》《Range.getClientRects()》Baseline 標記；caniuse `mdn-api_range_getclientrects` |
| `CanvasRenderingContext2D.createImageData()` / `putImageData()` / `HTMLCanvasElement.toDataURL()` | Baseline Widely available，2015-07 起跨瀏覽器 | MDN《createImageData》《putImageData》Baseline 標記 |
| `localStorage`、`URLSearchParams`、`Element.closest()`、`matchMedia` | Baseline Widely available | MDN 各 API 頁 |

未使用任何 Limited availability 或需要旗標的 API。**沒有任何一項是憑印象宣稱支援的**：上表五列在建置當天逐一查過 MDN 的 Baseline 標記。

### 13.2 fallback 的具體行為

| 情境 | 發生什麼 | 資訊損失 |
|---|---|---|
| SVG 濾鏡被停用或不支援 | 所有 `filter:url(#gN)` 被忽略，字**完全清晰**。世代資訊仍由四個非濾鏡通道承載：卡片旋轉角（`gen×0.45°`）、黑邊厚度（`3px+gen×2px`）、膠帶條數（gen≥2 一條、≥4 兩條、≥6 三條）、以及每一處明寫的「第 N 次影印／N ／6」文字 | 零 |
| Canvas 不可用或 `toDataURL` 拋例外（隱私模式） | `makeDirt()` 回傳 `null`，`--dirt` 不被設定，`background-image:none`，頁面只是乾淨一點 | 零 |
| `localStorage` 不可用 | `loadState()` 回傳 `{}`、`saveState()` 靜默失敗，借還檯每一輪仍可完整跑完，只是不跨頁記憶；`?c=` 分享碼仍可還原任何一張卡 | 零（僅失去跨頁記憶） |
| JavaScript 全關 | 卡袋牆的 24 格是 `<a>`，直接連到〈工具圖鑑〉對應的完整那一筆（含押金、借期、狀態、卡背留言，全部是建置階段輸出的靜態 HTML）；借還檯的 `<noscript>` 印出全部規則與數字 | 零（僅失去互動） |
| `prefers-reduced-motion: reduce` | 掃描光帶停止（保留一道靜態亮痕）、進紙轉場關閉、hover 位移關閉；簽名動效跳過掃描條，**直接套用最終世代** | 零 |

### 13.3 效能預算實測

| 項目 | 值 | 量測方式 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | index 53.3KB／tools 111.2KB／borrow 44.3KB／zine 35.1KB | 建置後 `wc -c`，皆遠低於 350KB 上限 |
| 外部請求 | 1（Google Fonts CSS，5 個字族；零圖片、零音檔、零函式庫） | 原始碼檢查 |
| 首屏 JS：髒污底紋生成 | 96×96 = 9,216 像素，每像素 4 次雜湊雜訊取樣；Node 22 實測 20 次全圖取樣 11ms → 單次約 0.55ms，加上 `putImageData` 與 `toDataURL` 估 <6ms | Node 22 單執行緒實測（無瀏覽器環境，故 canvas 兩支 API 為估計值） |
| 髒污覆蓋率 | 7.88%（設計目標 6–9%） | Node 實測，逐像素統計同一支演算法 |
| 首屏 JS 其餘部分 | 24 件工具的 SVG 由建置階段輸出為靜態 HTML，執行階段不重繪；勒索信引擎只在使用者互動時執行，單次 24 字元約 24 次雜湊 | 原始碼檢查 |
| 動畫成本 | 掃描光帶與進紙只改 `transform`／`clip-path`，不觸發 layout；簽名動效每行只改一次 `filter` 字串，共 ≤6 次寫入；全程零 `getBoundingClientRect` 迴圈、無 layout thrashing | 原始碼檢查 |

**注意（濾鏡的真實成本）**：`feMorphology` + `feGaussianBlur` 是逐像素的，套在**大面積**元素上會掉幀。本站的做法是只套在小元素（導覽格 86×40、留言行、卡片），**絕不對 `body` 或整個 `main` 套濾鏡**，也絕不對濾鏡做 `transition`（濾鏡參數補間會每幀重跑整條濾鏡鏈）——世代切換是離散跳變，這剛好也是正確的美學：影印不是漸變的，是一次一張。

### 13.4 實作陷阱

1. **對 alpha 做門檻只在透明底元素上有效。** 有底色的區塊要對 R/G/B 做（見特徵 2）。
2. **`feMorphology` 的 `erode` 在深色文字上是「變胖」**，不是變瘦——它取鄰域最小值，深色會吃掉淺色。想模擬碳粉不足要用 `dilate`。
3. **`color-interpolation-filters="sRGB"` 一定要寫。** 預設的 linearRGB 會讓門檻位置整個偏掉，中灰變成幾乎全白。
4. **濾鏡會建立包含區塊**：被套濾鏡的元素內部的 `position:fixed` 子孫會相對它定位。剪貼台之類的固定元件務必放在濾鏡元素之外。
5. **`Range.surroundContents()` 在跨節點選取時會丟 `InvalidStateError`。** 要「剪下」文字就複製字串，不要改 DOM。

---

*規格書版本 1.0／2026-08-23／建置模型 Claude Opus 5（排程 Agent）*
