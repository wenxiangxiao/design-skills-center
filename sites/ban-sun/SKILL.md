---
name: anti-design-browser-default
description: Anti-design web style that treats the browser's default stylesheet as raw material — Times and blue links, gray default buttons, violent type-scale jumps, raw RGB clashes, overlapping tilted outlined boxes and crude mouse-drawn red marks, with an author stylesheet that can be unplugged live.
---

# Anti-design・瀏覽器預設即材料（Anti-design / Browser-Default Brutal）

> 示範站：萬順當舖 BAN-SUN PAWN（`sites/ban-sun/`）。本規格書讓任何 AI 不看 Demo 也能做出同風格的新網站。

## 設計哲學

Anti-design（反設計）是 2010 年代中後期開始、2019–2020 年前後被各家趨勢報告點名的網頁潮流：它拒絕「乾淨、對稱、留白、和諧配色」這套被模板化的品味，改用不對稱、撞色、刺眼的原色、粗暴的字級落差與疊在一起的元素。它不是亂，而是**故意讓人看見設計的材料與決定**。

本規格採其中最可辨識、也最適合拿來重現的一支——**「瀏覽器預設即材料」**。血緣：

- **Bloomberg Businessweek，Richard Turley 主導時期（2010–2014）**：財經週刊用超大字、手繪標註、MS Paint 般的粗糙圖表與撞色封面，把「嚴肅題材」做得很吵。示範了「粗糙是一種誠實的語氣」。
- **Brutalist Websites（Pascal Deville，2014 起蒐集）**：一整批刻意用瀏覽器預設樣式、Times、藍底線連結、灰按鈕與表格框線的網站。示範了「預設樣式本身就是一種美學」。
- **Balenciaga 官網改版（Bureau Mirko Borsche × Demna，2017 前後）**：精品品牌的網站做得像沒上樣式的線框稿。示範了「去裝潢也可以是品牌立場」。

與鄰近流派的分界：

| 鄰近流派 | 它是 | 本風格不是 |
|---|---|---|
| Neubrutalism 網頁新粗獷 | 粗黑框＋硬陰影＋粉彩平塗、元素對齊得很整齊 | 本風格**沒有硬陰影**、元素**故意不對齊**、色彩是螢幕原色不是粉彩 |
| Web 1.0 GeoCities | 平鋪背景圖、GIF、訪客計數器、懷舊 | 本風格**零背景圖零 GIF**、是當代的、要講立場 |
| Grunge／Ray Gun（David Carson） | 印刷品上的解構排版、照片疊印、字被撕碎 | 本風格的字是**乾淨的預設字**，混亂來自版面與字級，不來自字本身 |
| 普普 Lichtenstein | 網點、粗黑輪廓、對話框 | 本風格零網點，標記是**滑鼠畫的紅線**而不是印刷輪廓 |

一句話：**把瀏覽器本來就有的東西（Times、#0000EE、灰按鈕、1px 框線）當顏料，再用最粗暴的尺度與位置把它們貼在一起——並且讓使用者隨時能把作者樣式表拔掉，證明「裝潢是多出來的」。**

## 本風格的 5 個不可省略特徵

拿掉任何一項，就不再是這個風格。

### ① 瀏覽器預設當材料（Times／藍底線連結／紫色已造訪／灰色預設按鈕）

正文用 Times 系（Google Fonts 的 **Tinos** 是 Times New Roman 的度量相容字，可保證跨平台一致），中文用明體（Noto Serif TC，接近新細明體的預設感）。連結就是 `#0000EE` 加底線，已造訪就是 `#551A8B`。按鈕長得跟沒上樣式的 `<button>` 一樣。**這不是「沒設計」，是刻意選用**——所以字型要明確指定，不可落到系統字堆疊。

```css
:root{--link:#0000EE;--visited:#551A8B;--face:#EFEFEF;--edge:#767676;
 --serif:"Tinos","Noto Serif TC","Times New Roman",serif;--sans:"Arimo","Noto Sans TC",Arial,sans-serif}
body{font:17px/1.45 var(--serif);color:#000;background:#fff}
a{color:var(--link);text-decoration:underline;text-decoration-thickness:1px}
a:visited{color:var(--visited)}
button,.btn{font:700 17px/1.2 var(--sans);color:#000;background:var(--face);border:1px solid var(--edge);border-radius:3px;padding:7px 14px}
button:hover{background:#FFFF00}
```

### ② 字級暴力落差＋出框裁切（≥20:1）

同一個畫面裡，最大字與最小字的比例至少 20:1（例：774px 的「當」旁邊放 11px 的說明）。巨字一定被視窗邊緣裁掉一部分。拉丁巨字用 `text-box` 把盒子修到大寫字高，再畫 1px 外框——外框緊貼字頂字底，像除錯模式。

```css
.g-dang{position:absolute;left:-6vw;top:-11vh;font:900 min(72vw,86vh)/1 "Noto Sans TC";color:#FF0000}
.trim{text-box:trim-both cap alphabetic;outline:1px solid #000}
@supports not (text-box:trim-both cap alphabetic){.trim{line-height:.74;padding-top:.05em}}
.mini{font:11px/1.35 var(--sans)}
```

### ③ 螢幕原色撞色（純 RGB、平塗、零漸層零模糊陰影）

只用螢幕原色與預設灰：紅 `#FF0000`、黃 `#FFFF00`、綠 `#00FF00`、藍 `#0000EE`、黑、白、按鈕灰。每一塊顏色都是平的；**沒有漸層、沒有 box-shadow、沒有 blur、沒有透明疊色**。一個區塊最多兩種彩色。

```css
.box{background:#fff;border:1px solid #000;padding:12px 14px}
.hl{background:#FFFF00}          /* 螢光筆 */
.sticker{background:#FFFF00;border:1px solid #000;font:900 15px "Noto Sans TC";transform:rotate(-6deg)}
.sticker.red{background:#FF0000;color:#fff}
.sticker.green{background:#00FF00}
```

### ④ 疊壓＋歪斜＋1px 框（破格網格）

用 12 欄網格，但**故意讓相鄰元素的欄位重疊一欄**、同一列明確指定 `grid-row` 讓它們真的疊在一起；每個盒子 1px 黑框、各自旋轉 ±1–6°、z-index 不規則。hover 時把該盒子提到最上層。

```css
.items{display:grid;grid-template-columns:repeat(12,minmax(0,1fr))}
.item{border:1px solid #000;background:#fff;transform:rotate(var(--r));margin-right:-14px}
.item:nth-child(-n+3){grid-row:1}.item:nth-child(n+4){grid-row:2}
.item:nth-child(1){grid-column:1/6}.item:nth-child(2){grid-column:5/9;margin-top:60px}
.item:nth-child(3){grid-column:8/13}
.item:hover{z-index:9;background:#FFFF00}
```

### ⑤ 滑鼠手繪的紅筆標記（直線段、方頭、會抖）

所有插圖與標註都像用滑鼠在小畫家裡畫的：**只有直線段**（每 7–10 單位一段、垂直方向 ±1.5 抖動）、方頭筆尖、3–4px 黑線；填色像油漆桶漏色一樣**偏離輪廓 2–4px**。紅筆圈一定畫超過一圈（1.1 圈）而且收尾往下飄。

```js
function jit(pts,closed,r,amp=1.5,step=8){const out=[],P=closed?[...pts,pts[0]]:pts;
 for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy),n=Math.max(1,Math.round(L/step)),nx=-dy/L,ny=dx/L;
  for(let k=0;k<n;k++){const t=k/n,o=(r()-.5)*2*amp;out.push([a[0]+dx*t+nx*o,a[1]+dy*t+ny*o]);}}
 if(!closed)out.push(P[P.length-1]);return out;}
```
```svg
<!-- 填色偏移＋獨立抖動輪廓 -->
<path d="M44 115L68 76…Z" fill="#FF0000"/>
<path d="M42 112L66 74…Z" fill="none" stroke="#000" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"/>
```

## 色彩系統

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 預設白 | `#FFFFFF` | 頁面、盒子底 | ~55% |
| 預設黑 | `#000000` | 正文、1px 框、插圖輪廓 | ~20% |
| 螢光黃 | `#FFFF00` | 螢光筆、貼紙、hover、選取中 | ~8% |
| 當舖紅 | `#FF0000` | 巨字、紅筆圈、價錢斜線、焦點框 | ~8% |
| 連結藍 | `#0000EE` | 連結（含導覽） | ~5% |
| 已造訪紫 | `#551A8B` | 已造訪／目前頁 | ≤1% |
| 原色綠 | `#00FF00` | 金價框、註記、當票印章底 | ≤2% |
| 按鈕灰 | `#EFEFEF`／`#767676` | 預設按鈕面與邊 | ~2% |
| 電線桿灰 | `#D4D4D4` | `body` 背景——頁面像一張貼在柱子上的傳單 | 只在換頁時看得到 |

規則：零漸層、零模糊陰影、零 opacity 疊色；紅字不放在紅底上；長文一律白底黑字（21:1）。

## 字體系統

- 來源：Google Fonts — Tinos 400/700/italic、Arimo 400/700、Noto Serif TC 400/900、Noto Sans TC 900、Permanent Marker。
- 角色：正文 Tinos＋Noto Serif TC 17px/1.45；UI 與小字 Arimo＋Noto Sans TC 11–18px；中文巨字 Noto Sans TC 900；手寫註記 Permanent Marker（紅色，只寫短句：「可以喊！」「← 你在這」）。
- 字級 scale（刻意斷裂，不成等比）：11／13／15／17／23／30／46／54／70／104／156／290／774px。相鄰兩階跳躍越大越好。
- 字重只有 400 與 700/900 兩種，沒有中間值。拉丁巨字字距 −0.03 至 −0.04em。

## 版面與網格

- 12 欄網格是**被破壞的對象**：相鄰元素的欄位重疊 1 欄、明確 `grid-row` 讓它們疊上；負 margin −10 至 −60px。
- 每個盒子旋轉 −6°～+8°，任意兩個相鄰盒子的旋轉方向相反。
- 首屏：一個中文巨字（70vw 級）從左上出框、一個拉丁巨字（25vw 級）從右下出框，兩者之間夾一個 420px 的白底說明盒。
- 留白：不留「呼吸」，但必須留**一條可讀路徑**——長文盒子永遠在最上層、白底、不旋轉超過 2°。
- ≤560px：所有絕對定位改成直排流、旋轉保留、巨字縮到 96vw／32vw。

## 元件配方

- **導覽「藍連結堆」**：右上 `position:fixed` 的 `<ul>`，三個連結三種字級（如 52／30／18px）各自旋轉；目前頁＝已造訪紫＋手繪紅圈 SVG＋手寫「← 你在這」。≤560px 落為底部白條、黑上框。
- **按鈕**：見特徵①；主要動作也只用預設灰，hover 變黃，按下位移 1px。
- **卡片**：白底 1px 黑框、旋轉、右上角一張貼紙、價錢用 Tinos 700 巨字＋`.trim` 外框。
- **表格**：保留 `border="1"` 的感覺：`border-collapse:collapse`、1px 黑線、`th` 用按鈕灰、hover 列變黃。
- **表單**：預設 input 樣式（1px #767676、2px 圓角），整個表單放在一塊黃底 1px 黑框裡、歪 0.8°。
- **頁尾**：`<address>` 不改斜體以外的任何東西；法律小字 12px；一行紅色巨字重複店名直到被切掉。
- **插頭（簽名元件）**：右下 `position:fixed` 的 `<button aria-pressed>`，裡面是一個 SVG 插座＋電線＋寫著 `.css` 的插頭，旁邊黃標籤「拔掉 style.css」。

## 動效規則

本站四種動效各有自製實作，另外加 6 個 motion-library 元件。

| 類型 | 實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 貼紙「沸騰」`steps(1)` 三格抖動；「●」閃爍；金價每 6 秒跳 | 持續 | .54s steps(1)／1.06s steps(1) | 全部靜止、數字不跳 |
| input 輸入 | 紅筆層：`getCoalescedEvents()` 收集合併事件畫方頭紅線；滑過 `[data-circle]` 自動在價錢外畫 1.13 圈紅圈；捲動驅動的巨字對撞（`animation-timeline:scroll()`）與價錢砸進來（`view()`） | 指標／焦點／捲動 | 圈：230ms 線性；捲動：跟手 | 圈直接整圈出現；巨字停在初始位置 |
| transition 轉場 | 傳單撕貼：點站內連結，整頁以右上角為軸被撕下掉落（520ms），下一頁被「拍」上柱子（400ms 過衝） | 點連結 | `cubic-bezier(.55,0,.85,.35)`／`cubic-bezier(.3,0,.2,1)` | 直接換頁 |
| signature 簽名 | **樣式表拔插**：按插頭→畫面抖 4 格（210ms steps(4)）→`style#anti.sheet.disabled=true`，整站變回瀏覽器預設樣式；再按→插回，每個 `[data-throw]` 從亂飛位置以個別 `translate`/`rotate` 屬性撞回原本的歪位置（560ms，`cubic-bezier(.2,1.45,.42,1)`，每個延遲 26ms）。首頁第一次造訪先以預設樣式顯示並跑「正在載入 style.css …%」再插上 | 按鈕／任意鍵 | 見左 | 立即切換、不抖不飛 |

自我限制：不用淡入當主打；不用跑馬燈；不用 hover 放大卡片（改用「提到最上層＋變黃」）。

### motion-library 元件表（`wenxiangxiao/motion-library` 1.1.0 @eb4d70c）

| 頁 | ID | 名稱 | 參數 | 類型 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| 首頁 | TXT-A-38 | Marker | text「今天流當 14 件」、colors `#FF0000/#FFFF00/#FFFFFF`、duration 1.6、loop false、seed 14、16:9 | transition（一次性） | 一支黃色螢光筆劃過標題——就是特徵③的 `.hl`，Anti-design 的「直接標重點」 |
| 首頁 | BG-A-12 | Broken Grid | colors `#000000/#FF0000/#FFFFFF`、duration 6、density .8、intensity 1.1、seed 1979、16:9 | ambient | 一格一格錯位亂跑的 1px 框格，正是特徵④「被破壞的網格」的動態版；放在假監視器框裡 |
| 喊價 | SHP-33 | Squiggle Draw | colors `#FF0000/#0000EE/#FFFFFF`、duration .9、loop false、seed 7、16:9 | input（每次出價重播） | 玉姨在紙上算價的一條紅筆亂線，延續特徵⑤的紅筆語彙 |
| 喊價 | TXT-B-08 | Number Slam | text＝成交價數字、colors `#FF0000/#000000/#FFFFFF`、duration 1.2、loop false、intensity 1.2、16:9 | transition（成交時） | 成交價「砸」在收據上——特徵②的字級暴力用在結果上 |
| 來當 | TXT-A-04 | Punch Zoom | text「帶身分證來」、colors `#FF0000/#FFFF00/#FFFFFF`、duration 1.1、loop false、seed 11、16:9 | transition（一次性） | 最重要的一句話用最大的音量打出來，紅色描邊＝紅筆 |
| 來當 | BG-A-24 | Barcode | colors `#000000/#FF0000/#FFFFFF`、duration 9、density .9、intensity .8、seed 4827、16:9 | ambient | 當票上的條碼慢慢流動；純黑平塗直條＋一根紅條，零漸層 |

掛載：子集由 `tools/ml-embed.js` 產生並 inline 成每頁第一個 `<script>`；包裝 `BS.ml` 照 `sites/ka-to` 的 `KT.ml`——等 `document.fonts.ready`、離屏 `destroy()`、回到視窗重掛、一次性元件 `loop:false` 播一次後 `seek(1)`、canvas `aria-hidden`、容器內保留 `.ml-fb` 原 HTML、reduced-motion 時背景 `seek(.35)` 文字 `seek(1)`。各元件的原始開發 Prompt 可用 `MotionLib.prompt(id)` 取得。同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

- 技法：**滑鼠手繪粗線**——建置期以程式把簡單幾何（橢圓、多邊形、折線）切成 7–10 單位的直線段並垂直抖動 ±1.5，黑 3px 方頭描線；填色另一份抖動、整體偏移 (2–4, 1.5–3.5)px 露出白縫。
- 色彩只能用色票裡的原色；一張圖最多兩種彩色＋黑白灰。
- 題材畫「東西」本身（項鍊、機車、筆電、吉他、相機、手鐲），正面、無透視、無陰影、無背景。
- 標註一律是紅筆：圈、叉、箭頭、底線。

## Logo 與 Favicon 設計指南

- Logo：一塊手繪抖動的黃色紙片（1px→2px 黑框），上面 Noto Serif TC 900 店名，其中一個字是紅色並被紅筆圈起來；下方 Arimo 11px 英文與年份。紙片四角不方正。
- Favicon：inline SVG data URI；黃底抖動方塊＋黑色粗線字形（方頭）＋紅筆圈。64×64 下線寬 ≥3。

## Do & Don't

**Do**
- 用預設的藍／紫／灰當設計語彙，並明確指定字型（Tinos／Arimo）。
- 讓巨字被裁掉、讓盒子疊在一起，但保證長文在最上層可讀。
- 讓作者樣式表可被拔掉，拔掉後所有資訊與功能仍在（這是本風格的可用性保證）。
- 紅筆標記一律直線段、方頭、超過一圈。
- 文案講實話、短、口語，從產業自己長出來。

**Don't（含去AI化禁令）**
- 不要紫藍漸層、不要置中大標＋三張圓角卡片、不要 emoji icon、不要 Lorem ipsum。
- 不要硬陰影（那是 Neubrutalism）、不要粉彩、不要模糊、不要漸層、不要毛玻璃。
- 不要用系統預設字堆疊冒充「預設感」——要指定度量相容字。
- 不要讓混亂吃掉資訊：電話、地址、價錢永遠是可選取的文字。
- 不要跑馬燈、不要「EST. 19xx」徽章。

## 頁面骨架範例

```html
<!doctype html><html lang="zh-Hant-TW"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&family=Noto+Sans+TC:wght@900&family=Noto+Serif+TC:wght@400;900&family=Permanent+Marker&family=Tinos:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style id="base">#pen{position:fixed;left:0;top:0;pointer-events:none}</style>
<style id="anti">/* 全部的作者樣式（特徵①–⑤）都寫在這裡，才能一次拔掉 */</style>
</head><body>
<div id="page">
 <a class="brand" href="index.html">…logo svg…</a>
 <nav><ul class="links"><li><a href="index.html" aria-current="page" style="--fs:52px;--r:-5deg">流當品</a></li>…</ul></nav>
 <main>
  <section class="hero">
   <div class="g-dang" aria-hidden="true">當</div>
   <div class="g-pawn trim" aria-hidden="true">PAWN</div>
   <div class="box tilt" style="--r:-1.6deg" data-throw><h1>店名</h1><p>…</p><a class="btn" href="…">主要動作 →</a></div>
  </section>
 </main>
</div>
<canvas id="pen" aria-hidden="true"></canvas>
<button id="plug" aria-pressed="false">…插頭 svg…<span class="pl-t">拔掉 style.css</span></button>
<script>
document.getElementById('plug').onclick=function(){var s=document.getElementById('anti').sheet;s.disabled=!s.disabled;this.setAttribute('aria-pressed',s.disabled);};
</script>
</body></html>
```

## 技術實作與相容性

| 技術 | 本站承載什麼 | 支援現況（查證來源） | 不支援時 |
|---|---|---|---|
| **CSS 捲動驅動動畫** `animation-timeline: scroll()／view()` | 首頁兩個巨字隨捲動對撞（特徵②）、價錢進入視窗時從 2.2 倍砸回原位 | Chrome／Edge 115+、Safari 26+；Firefox 穩定版仍在偏好設定旗標後（Chrome for Developers〈Scroll-driven animations〉與 2026 年社群整理文章；caniuse 本身未能直接讀取，已據此保守處理） | `@supports (animation-timeline:scroll())` 包住，不支援就停在初始的疊壓位置——資訊不變 |
| **CSS `text-box: trim-both cap alphabetic`** | 拉丁巨字與價錢的盒子修到大寫字高，1px 外框緊貼字頂字底（特徵②④） | Chrome 133+、Safari 18.2+；Firefox 154 起支援（web.dev 2026 年 8 月平台新功能整理；MDN 仍標示 Limited availability） | `@supports not` 時改 `line-height:.74` 近似；外框略鬆，但字與版面一致 |
| **Pointer Events `getCoalescedEvents()`＋Canvas 2D** | 紅筆層：快速移動時取回被合併的中間點，方頭紅線不會斷成折角（特徵⑤） | Chrome、Firefox 長期支援；Safari 18.2 起（MDN 仍標示非 Baseline；Flutter engine 指出 Safari 的合併事件缺 `pointerId`／`target`——本站只讀 `clientX/Y`，不受影響） | 方法不存在或回傳空陣列時改用事件本身的座標；線段稍疏但可畫 |

其他實作：`HTMLStyleElement.sheet.disabled` 切換作者樣式表（所有現行瀏覽器）；個別變形屬性 `translate`／`rotate` 讓 WAAPI 的 crash-in 不覆蓋元素原本的 `transform: rotate()`（Chrome 104+／Safari 14.1+／Firefox 72+）。

效能預算（建置後實測檔案大小）：index 98KB、haggle 104KB、visit 77KB（皆含 36KB motion-library 子集與全部 inline SVG），遠低於 350KB；首屏 JS 只有子集定義、事件綁定與兩個元件掛載，沒有大型迴圈；紅筆層只在捲動或描線時以 rAF 重畫可視範圍；同一畫面同時運轉的 motion-library 元件 ≤2。
