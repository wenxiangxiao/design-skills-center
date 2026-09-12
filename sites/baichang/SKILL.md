---
name: suprematist-white-field
description: Malevich-lineage Suprematism for the web — an infinite white field, five flat primitives, one diagonal axis of movement, five colours in wildly unequal shares, and depth expressed only by overlap.
---

# 至上主義・白場 Suprematist White Field

> 流派：至上主義 Suprematism（Kazimir Malevich，1915 年彼得格勒《0,10》展 → UNOVIS 維捷布斯克 → 1920 年代 Suetin／Chashnik 的應用設計）
> 視覺家族：F4 幾何構成
> 本規格書把該流派整理成可直接套用到任何產業的網頁語言。風格與內容分離：換掉文案就是另一個品牌。

---

## 一、設計哲學

至上主義不是「幾何裝飾」，是一套**取消**的紀律。Malevich 取消的東西比他加上去的多得多：取消地平線、取消透視、取消光源、取消材質、取消再現。剩下的只有形、形的相對位置、以及形所在的那片白。

三句話講完這個風格的內在邏輯：

1. **白不是背景，是空間本身。** 在這個語言裡，「留白」這個詞是錯的——白場沒有被留下，它是畫面的主體，形只是暫時懸在裡面。所以不要在白場上加紋理、加漸層、加陰影、加分隔線、加容器邊框：任何一樣加上去，白就退回成「背景」，這個風格就關掉了。
2. **形之間只有兩種關係：間距，與誰壓著誰。** 沒有透視、沒有陰影，深度只能靠疊壓表達。這也是為什麼在網頁上，介面的「現用態」最好用「疊到最上面」表達，而不是換顏色或加外框。
3. **斜是動勢，不是活潑。** 版面上的斜角必須全部來自同一組角度。一個畫面裡出現第二組角度，動勢就互相抵銷，畫面立刻變成 1980 年代的孟菲斯或 1990 年代的解構排版——那是別的流派。

歷史脈絡值得記住的三件事：(a) 1915 年《0,10》展上，《黑方塊》被掛在展場的**牆角高處**——那是俄國家庭掛聖像的位置，Malevich 是刻意的；(b) 這個流派的製作條件是**油彩平塗於畫布**與後來的**平版印刷**，所以沒有一個效果是靠筆觸或材質做的；(c) UNOVIS 時期它被拿去做瓷器、布料、海報與講義封面——**至上主義從一開始就準備好被應用**，這正是它適合當網頁風格規格書的原因。

## 二、色彩系統

五個顏色，比例懸殊是規則的一部分。顏色在這裡不表達材質、不表達光，只表達**身分**。

| 色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 白場 White | `#FFFFFF` | 空間本身。純白，不可換成米白、灰白或紙感色 | 約 72% |
| 墨 Black | `#0B0B0B` | 正文、主要形、頁尾實色塊 | 約 12% |
| 朱紅 Vermilion | `#D8321E` | 動作與現用態：主要按鈕、被選中的形、「手」的記號 | 約 8% |
| 群青 Ultramarine | `#1B3FCF` | 資料與連結：超連結、數值、focus ring | ≤ 5% |
| 鉻黃 Chrome Yellow | `#F2C200` | 阻擋與提醒：駁回訊息塊、警示（永遠是黃底黑字，不當文字色） | ≤ 3% |

硬規則：

- **零漸層、零陰影、零圓角、零外框線。** 需要「分隔」時，用空白或一塊實心色條，不要用 1px 線。
- 朱紅與群青**不得同時大面積出現**；它們是兩種語意（動作／資料），不是配色。
- 鉻黃只做底色。`#F2C200` 當文字色對白底只有 1.6:1，是不合格的。
- 灰只允許兩階：`#5A5A5A`（次要文字）與 `#F1F1F1`（表單欄位底）。不要有第三階灰，那是往「一般極簡網站」滑走的第一步。

```css
:root{--w:#fff;--k:#0B0B0B;--r:#D8321E;--b:#1B3FCF;--y:#F2C200;--th:33deg}
body{background:var(--w);color:var(--k)}
a{color:var(--b)}                 /* 連結＝資料 */
.btn{background:var(--k);color:#fff}
.btn:hover{background:var(--r)}   /* hover＝動作 */
.reject{background:var(--y);color:var(--k)}
```

## 三、字體系統

至上主義本身沒有「官方字體」——當年是手繪與鉛字混用。網頁上要的是：**幾何無襯線、字重跨度大、沒有任何人文氣息**。

- 拉丁：`Archivo`（Google Fonts，400／600／800／900）。備選：`Chivo`、`Archivo Expanded`、`Inter Tight`。
- 中文：`Noto Sans TC`（400／700／900）。
- 等寬數字一律 `font-variant-numeric: tabular-nums`——這個風格的數字是量，不是字。

```css
body{font:400 16px/1.78 "Archivo","Noto Sans TC",sans-serif;letter-spacing:.005em}
h1{font-weight:900;font-size:clamp(26px,3.4vw,38px);line-height:1.12;letter-spacing:-.01em}
h2{font-weight:900;font-size:clamp(21px,2.4vw,27px)}
.lbl{font:800 11.5px/1.2 "Archivo",sans-serif;letter-spacing:.20em;text-transform:uppercase}
.num{font-weight:800;font-variant-numeric:tabular-nums}
```

字級階梯：`11.5 / 13.5 / 15 / 16 / 17 / 21–27 / 26–38`。**不要有 60px 以上的巨型標題**——巨型字是未來派與瑞士新浪潮的語彙；至上主義的主角是形，標題只是標籤。

排版紀律：**正文永遠水平、永遠可選取、對比 ≥ 4.5:1。** 只有 6 個字以內的標籤可以跟著動勢軸斜排。段落最寬 62ch。

## 四、版面與網格

12 欄網格，但**用法是反網格的**：欄只用來對齊，不用來製造對稱。

- 每一個區塊都要偏。`c5 + c4(off8)`、`c7 + c3(off9)`、`c4+c4+c4` 但三塊各自 `margin-top: 0 / 26px / 52px`。
- **不要置中三張等寬卡片。** 這是本風格最容易失手的地方。
- 桌機把導覽留在右側 230px 的側槽，內容欄靠右對齊、左邊留出一條不對稱的白：

```css
.field{max-width:1180px;margin:0 auto;padding:0 28px}
@media(min-width:901px){
  .field{width:min(1080px,calc(100vw - 320px));max-width:none;
         margin-left:auto;margin-right:230px;padding:0}
}
```

- 區塊之間的呼吸：`section{padding:86px 0}`（手機 52px）。白場需要面積才成立，捨不得留白就不要用這個風格。
- **動勢軸**：全站設一個 `--th`（建議 21°–57°，可用日期或內容決定）。所有斜元素只准用 `rotate(var(--th))`，以及由此衍生的 `±45°` 與 `+90°`。畫面上不得出現第二組角度。

## 五、本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是至上主義。

### 1｜白場是無限空間，不是背景

零紋理、零顆粒、零漸層、零陰影、零外框、零卡片容器。元素直接坐在白上。

```css
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff}
/* 全站禁用：*/
/* box-shadow / border / border-radius / background-image:linear-gradient / filter:blur */
.card{background:none;border:0;box-shadow:none;border-radius:0;padding:0}
```

### 2｜有限的形庫：正方、長方條、圓、三角、十字，全部實心平塗

沒有描邊、沒有圓角、沒有半透明。所有圖像——插圖、圖標、logo、favicon——都由這五種形組成。

```html
<svg viewBox="-60 -60 120 120" fill="#0B0B0B">
  <g transform="rotate(33)">
    <rect x="-34" y="-34" width="34" height="34"/>          <!-- 正方 -->
    <rect x="-10" y="14" width="68" height="9" fill="#D8321E"/> <!-- 長方條 -->
    <circle cx="30" cy="-26" r="11" fill="#1B3FCF"/>            <!-- 圓 -->
    <polygon points="46,10 26,20 26,0"/>                        <!-- 三角 -->
  </g>
</svg>
```

### 3｜單一動勢軸：所有斜角只落在 {θ, θ±45°, θ+90°}

做法上最可靠的保證是：**讓所有點都落在同一個旋轉過的方格點陣上**。任兩點之間的連線因此自動是 45° 的整數倍。

```js
/* 四個點只允許三種配置，任兩點的連線必為 45° 倍數 */
const LAYOUTS = {
  fang: [[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]],   // 方
  ling: [[0,1],[-1,0],[1,0],[0,-1]],             // 菱
  lie:  [[-1.5,0],[-.5,0],[.5,0],[1.5,0]]        // 列
};
const rot = (p,U,th)=>{const t=th*Math.PI/180,x=p[0]*U,y=p[1]*U;
  return [x*Math.cos(t)-y*Math.sin(t), x*Math.sin(t)+y*Math.cos(t)];};
```

```css
.axbar{height:9px;background:var(--k);transform:rotate(var(--th));transform-origin:0 50%}
```

### 4｜五色平塗且面積懸殊，顏色只表達身分

見第二章的比例表。實作上把顏色綁在語意類別上，不要綁在元件上：

```css
.is-action{background:var(--r);color:#fff}   /* 動作 */
.is-data{color:var(--b)}                      /* 資料 */
.is-block{background:var(--y);color:var(--k)} /* 阻擋 */
```

### 5｜疊壓即層級——現用態是「疊到最上面」，不是「被高亮」

沒有陰影也沒有透視，唯一能表達深度的是遮擋。因此導覽、分頁、篩選鈕的現用態，一律用 z-order 與負邊距做，不要用底色高亮。

```css
.nav li + li{margin-top:-9px}          /* 每一塊壓住上一塊的一角 */
.nav li:nth-child(1){z-index:4}
.nav li:nth-child(2){z-index:3}
.nav li:nth-child(3){z-index:2}
.nav li:nth-child(4){z-index:1}
.nav li.on{z-index:9}                  /* 現用頁＝完整不被壓住 */
.nav a{display:block;background:var(--k);color:#fff;padding:9px 20px 9px 14px}
.filters button{margin-right:-4px}     /* 同一個語法用在按鈕列 */
.filters button[aria-pressed=true]{z-index:5;background:var(--r)}
```

## 六、元件配方

**導覽（疊壓次序）**：四塊實心黑牌直排（桌機固定於右上）、彼此壓住 9px，現用頁 `z-index` 最高並在右緣加一枚 11px 朱紅小方。`≤900px` 攤成橫列（改用 `margin-left:-9px`），頁尾另備完整文字連結。務必同時給 `aria-current="page"`。

**按鈕**：黑底白字、無圓角、`padding:15px 26px`、`letter-spacing:.06em`；hover 換成朱紅（`transition:background .1s linear`，不要位移、不要陰影）。停用態 `#B9B9B9`。

**卡片**：本風格沒有卡片。要分組就用「一條 9px 的實色條 + 標題 + 文字」，色條的顏色即該組的身分。

```html
<div>
  <div style="height:9px;background:var(--r)"></div>
  <h3 style="margin-top:16px">紀微</h3>
  <p class="sm">編隊教練・2 880 跳</p>
</div>
```

**表單**：欄位無邊框，底色 `#F1F1F1`，`border-radius:0`，`appearance:none`；label 用 `.lbl`（11.5px、字距 .14em、大寫）。錯誤訊息集中成一塊鉻黃區塊，逐條點名是哪一欄、為什麼——不要在欄位旁掛紅色小字。

**表格**：無框線、無斑馬紋。表頭用 `.lbl`，欄距靠 `padding-right` 拉開。

**頁尾**：整塊 `#0B0B0B`，白字，連結加底線（`text-underline-offset:3px`），hover 轉鉻黃。頁尾是全站唯一可以有大面積黑的地方。

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可；四種都要有 `prefers-reduced-motion` 降級且資訊零損失。

| 類型 | 觸發 | 做法 | duration / easing |
|---|---|---|---|
| ambient 環境 | 真實時刻 | 一塊小的實色條沿動勢軸緩慢移動，位置由 `new Date()` 換算 | 每秒重算一次，`linear`；reduced-motion 下照樣顯示當下位置，只是不再連續移動 |
| input 輸入 | hover / focus | 形群的「手」與連桿在 90ms 內轉朱紅；導覽牌 `translateX(-9px)` | `.09s linear` / `.12s linear` |
| transition 轉場 | 進入視窗（IntersectionObserver） | 區塊沿動勢軸從軸外 116px 滑入。**不要淡入**——至上主義的形不會半透明 | `.28s cubic-bezier(.2,.85,.25,1)` |
| signature 簽名 | 狀態改變 | 見下 | 指數趨近，τ≈70ms |

```css
.enter{transform:none;transition:transform .28s cubic-bezier(.2,.85,.25,1)}
.enter.pre{transform:translate(calc(cos(var(--th))*-116px),calc(sin(var(--th))*-116px));transition:none}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  .enter,.enter.pre{transform:none}
}
```

**簽名動效：吸合與重心補正（settle & recentre）。** 每建立一組關係，就把相關的兩個形往彼此拉 C 像素，然後把整組的重心拉回原點。結果是「連一條線，整組會重新對心」——沒有彈跳、沒有回彈，因為這個風格裡沒有彈性。

```js
function settle(base, links, C){                 // links: [[i,j],...]
  const p = base.map(q => q.slice());
  links.forEach(([a,b])=>{
    const dx=base[b][0]-base[a][0], dy=base[b][1]-base[a][1];
    const d=Math.hypot(dx,dy)||1, ux=dx/d*C, uy=dy/d*C;
    p[a][0]+=ux; p[a][1]+=uy; p[b][0]-=ux; p[b][1]-=uy;
  });
  let cx=0, cy=0; p.forEach(q=>{cx+=q[0]/p.length; cy+=q[1]/p.length;});
  return p.map(q=>[q[0]-cx, q[1]-cy]);            // 重心補正
}
/* 每幀以指數趨近逼近目標，任何時候改變目標都不會打架 */
const k = 1 - Math.exp(-dt/70);
pos[i][c] += (tgt[i][c]-pos[i][c]) * k;
```

## 八、插畫與圖像風格

技法名稱：**formation-glyph 關係圖元構成**。

- 全站零外部圖片、零照片、零寫實描繪。所有圖像（插圖、圖標、logo、favicon、印記）都由第五章第 2 項的五種形，加上「連桿」與「端點小方」組成。
- 圖不描繪物件的外形，**它描繪一組關係**：誰連著誰、方向是哪一邊。判準是「拿掉全部文字，仍讀得出誰跟誰連著、朝哪個方向」。
- 連桿：`stroke-width:5`、方頭（不要 `stroke-linecap:round`）；方向以端點的一枚 5px 實心小方表示。
- 圖標一律自繪，只用水平線、垂直線、45° 斜線與正圓，線寬固定，`fill:none` 時線寬 4。**禁止 emoji、禁止 icon font。**
- 需要「很多張圖」時不要一張張畫：定義一個資料結構（一組節點與一組連結），寫一支函式把它畫出來，全站共用同一支。這也是這個流派的本體——它從一開始就是一套可生成的系統，不是一批插圖。

## 九、Logo 與 Favicon

Logo ＝ 一組轉了 `θ` 的形，右邊接品牌名（Noto Sans TC 900）與拉丁副名（Archivo 800，字距 2.4）。形之間必須有一次疊壓，否則失去這個風格的深度語彙。

```svg
<svg viewBox="0 0 240 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="96" fill="#FFFFFF"/>
  <g transform="rotate(33 60 48)">
    <rect x="32" y="20" width="34" height="34" fill="#0B0B0B"/>
    <rect x="20" y="62" width="76" height="9" fill="#D8321E"/>
    <circle cx="86" cy="30" r="11" fill="#1B3FCF"/>
    <polygon points="96,54 78,64 78,44" fill="#0B0B0B"/>
  </g>
</svg>
```

Favicon 用同一組形壓縮到 32×32，寫成 inline data URI（白底、一塊黑方、一條朱紅、一顆群青圓）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23fff'/%3E%3Cg transform='rotate(33 16 16)'%3E%3Crect x='6' y='9' width='13' height='13' fill='%230B0B0B'/%3E%3Crect x='9' y='23' width='18' height='3.4' fill='%23D8321E'/%3E%3Ccircle cx='24' cy='11' r='3.2' fill='%231B3FCF'/%3E%3C/g%3E%3C/svg%3E">
```

## 十、Do & Don't

**Do**

- 先決定 `θ`，再排版面。角度是骨架，不是裝飾。
- 讓白場占到七成以上。不夠白就刪東西，不要縮小字。
- 現用態用疊壓表達；顏色留給語意。
- 圖用資料生成，全站共用一支渲染函式。
- 正文水平、可選取、對比 ≥4.5:1；斜的只有形與 6 字內的標籤。

**Don't**

- ❌ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片（本風格的直接反面）
- ❌ 任何 `box-shadow`、`border-radius`、`border:1px solid`、`filter:blur`
- ❌ 米白紙感底、紙纖紋理、噪點——那是里索與活版，不是至上主義
- ❌ 第二組斜角、隨機旋轉的裝飾、抖動線條
- ❌ 巨型標題當主視覺（那是未來派／瑞士新浪潮）
- ❌ 淡入式滾動揭示、視差、數字滾動、跑馬燈
- ❌ emoji 當 icon、icon font、外部圖片、Lorem ipsum
- ❌ 用「EST. 19xx」徽章或「把 X 變成 Y」句型寫文案

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>品牌名｜頁名</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800;900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--w:#fff;--k:#0B0B0B;--r:#D8321E;--b:#1B3FCF;--y:#F2C200;--th:33deg}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--w);color:var(--k);font:400 16px/1.78 "Archivo","Noto Sans TC",sans-serif;overflow-x:hidden}
.field{max-width:1180px;margin:0 auto;padding:0 28px;position:relative}
@media(min-width:901px){.field{width:min(1080px,calc(100vw - 320px));max-width:none;margin-left:auto;margin-right:230px;padding:0}}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:26px}
.c4{grid-column:span 4}.c5{grid-column:span 5}.c7{grid-column:span 7}
.off8{grid-column-start:9}
section{padding:86px 0}
.lbl{font:800 11.5px/1.2 "Archivo",sans-serif;letter-spacing:.2em;text-transform:uppercase}
.nav{position:fixed;top:22px;right:24px;z-index:60}
.nav ul{list-style:none}.nav li+li{margin-top:-9px}
.nav a{display:block;background:var(--k);color:#fff;padding:9px 20px 9px 14px;font:800 13px/1.25 "Archivo","Noto Sans TC",sans-serif;min-width:168px}
.nav li:nth-child(1){z-index:4}.nav li:nth-child(2){z-index:3}
.nav li:nth-child(3){z-index:2}.nav li:nth-child(4){z-index:1}
.nav li.on{z-index:9}
.btn{display:inline-block;background:var(--k);color:#fff;padding:15px 26px;border:0;font:800 14px/1 "Archivo","Noto Sans TC",sans-serif;cursor:pointer}
.btn:hover{background:var(--r)}
footer{background:var(--k);color:#fff;padding:64px 0 46px}
@media(max-width:900px){.nav{position:static;padding:16px 20px 0}.nav ul{display:flex}
 .nav li+li{margin-top:0;margin-left:-9px}.c4,.c5,.c7{grid-column:span 12}.off8{grid-column-start:auto}
 section{padding:52px 0}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<nav class="nav" aria-label="主導覽"><ul>
 <li class="on"><a href="index.html" aria-current="page"><b>01</b>頁名</a></li>
 <li><a href="b.html"><b>02</b>頁名</a></li>
 <li><a href="c.html"><b>03</b>頁名</a></li>
 <li><a href="d.html"><b>04</b>頁名</a></li>
</ul></nav>
<main><div class="field">
 <header style="padding:104px 0 60px"><div class="grid">
   <div class="c7">
     <h1 style="font-size:0"><span class="lbl" style="font-size:11.5px">品牌名　所在地</span></h1>
     <div class="lbl" style="margin-top:44px;color:var(--r)">本頁在說什麼</div>
     <!-- 首屏的主體是一組形，不是一個大標題 -->
   </div>
   <div class="c4 off8">…</div>
 </div></header>
</div>
<section><div class="field"><div class="grid">
  <div class="c5"><h2>區塊標題</h2><p>…</p></div>
  <div class="c4 off8">…</div>
</div></div></section>
</main>
<footer><div class="field">…</div></footer>
</body>
</html>
```

## 十二、技術實作與相容性

本風格不需要重量級技術。實作範例站（白場編隊跳傘隊）用了三項，各自承載一件事，且皆有降級路徑。

### 1｜IntersectionObserver（D 輸入與感測層）

承載**轉場動效「入軸」**與**高度計讀數**：區塊進入視窗時移除 `.pre` 讓它沿動勢軸滑入，同時把該區塊 `data-alt` 的高度寫到左下角讀數。

- 支援現況（2026-08-31 查證 MDN《IntersectionObserver》與 caniuse `intersectionobserver`）：**Baseline Widely available，2019 年 3 月起跨瀏覽器**（Chrome 51+／Edge 15+／Firefox 55+／Safari 12.1+）。
- Fallback：`if(!('IntersectionObserver' in window)) return;` ——`.pre` 從一開始就不會被加上，所有區塊直接呈現在最終位置，高度計停在 HTML 內的靜態值 `4 000`。資訊零損失。
- 效能：只在第一次進入時處理並 `unobserve`；讀數用第二個 observer，`rootMargin:'-38% 0px -38% 0px'`，不讀取任何幾何屬性，無 layout thrashing。

### 2｜matchMedia + 真實時刻驅動（B 動效與時間軸層）

承載**環境動效**（班機沿動勢軸移動，位置由 `new Date()` 換算的班次進度決定）與**即時降級**：使用者在系統設定裡打開「減少動態」時，畫面**不必重新整理**就會停止所有補間。

- 支援現況（2026-08-31 查證 caniuse `mdn-api_mediaquerylist_change_event`，統計期 2026 年 7 月）：`MediaQueryList` 的 `change` 事件**全球覆蓋 96.18%**，Chrome 39+／Edge 79+／Firefox 55+／**Safari 14+**（iOS Safari 亦為 14+）。
- Fallback：Safari 13 以下需改用已被標為過時的 `addListener()`，因此程式碼兩者都掛：

```js
var RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
function rm(){ return !!(RM && RM.matches); }
function onRM(fn){ if(!RM) return;
  if (RM.addEventListener) RM.addEventListener('change', fn);
  else if (RM.addListener) RM.addListener(fn);        /* Safari 13 以下 */
}
```
  完全沒有 `matchMedia` 時 `rm()` 恆為 `false`，動效照跑，但 CSS 的 `@media (prefers-reduced-motion:reduce)` 仍然生效，所有 `transition` 一樣會被關掉。

### 3｜圖同構判定（E 資料與生成層，純 JavaScript）

承載**核心功能的判定**與**全部圖像的生成**：畫面上的每一張圖都是一組「節點—連結」資料的渲染結果，而「使用者做對了沒有」這個問題被定義成**兩個有向圖是否同構**——把四個節點重新編號 24 次（4! 種），只要有一次對得上就算對。

```js
const PERMS = /* 4! = 24 種編號 */;
const ekey = e => e.map(([a,b]) => a*4+b).sort((x,y)=>x-y).join(',');
const canon = e => PERMS.map(p => ekey(e.map(([a,b]) => [p[a],p[b]]))).sort()[0];
const iso = (a,b) => a.length===b.length && canon(a)===canon(b);
```

- 支援現況：只用到 `Array.prototype.map/sort`、`Math.imul`（FNV-1a 雜湊用），皆為 ES5／ES2015 等級，無瀏覽器 API 依賴，故無相容性缺口。
- 效能實測（Node 22，單執行緒）：`canon()` 200 000 次 = **1 097 ms，即每次 5.5 微秒**。實際只在使用者改變關係時呼叫一次，成本可忽略。
- 為什麼要同構而不是比對座標：因為這個風格的主張就是「位置不是本質，關係才是」。判定方式與美學主張同一件事，這是本規格書最想傳達的一點。

### 效能預算（實測）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline CSS/JS/SVG） | ≤ 350 KB | 36–63 KB |
| 外部資源 | 僅 Google Fonts | 僅 Google Fonts（零圖片、零音檔、零函式庫） |
| 首屏 JS 執行 | ≤ 100 ms | 主要成本為 24 個編隊圖的字串組裝，< 6 ms |
| 主要動畫 | 60 fps | 每幀重寫一個約 14 節點的 SVG 子樹，只改 `transform` 之外的 `x/y`，無 `getBoundingClientRect`、無 layout thrashing |

### 無障礙

- 焦點環用群青 `outline:3px solid var(--b); outline-offset:3px`——這是全站唯一被允許的「框」，因為它是狀態不是裝飾。
- 疊壓次序做的現用態必須同時給 `aria-current="page"`；被壓住的只有一角，不得壓到文字。
- 每一個以形表達的資訊，都要有等價的文字（SVG 給 `role="img"` 與 `aria-label`，功能性互動另備按鈕與鍵盤路徑）。
- 白底上的朱紅 `#D8321E` 對比 4.8:1、群青 `#1B3FCF` 對比 7.9:1，皆通過 AA。鉻黃只當底色。

---

*本 SKILL.md 由 Claude Opus 5（排程 Agent）於 2026-08-31 撰寫，隨範例站「白場編隊跳傘隊」一併交付。*
