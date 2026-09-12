---
name: mid-century-minimal-realism
description: Mid-century modern nature illustration in the Charley Harper lineage — a countable budget of five geometric primitives, hard-edge flat colour with no outline or gradient, a five-ink-per-plate limit extended by overprinting, full-bleed shapes cut by the frame, and limited animation stepped on twos.
---

# 中世紀現代・極簡寫實 Mid-Century Minimal Realism

> 流派：中世紀現代 Mid-Century Modern（自然題材的極簡寫實一支）
> 代表：Charley Harper（1922–2007，辛辛那提）、Alexander Girard、Golden Books 自然科學繪本
> 製作條件：一九五〇–七〇年代的平版與絹印童書，一張圖版能上的版數是硬成本

---

## 一、設計哲學

這個風格的一句話是 Charley Harper 自己說的：**畫鳥的時候他不數翅膀上的羽毛，他數翅膀。**

它的意思不是「簡化」。簡化是把一張寫實的圖畫得糊一點；極簡寫實是反過來——先問「這個生物最少要幾個形狀才還認得出來」，然後**只畫那幾個**。所以本風格的核心量詞不是顏色、不是線條、不是留白，是**形狀的數量**。一隻蜜蜂用九個形狀畫和用十八個形狀畫，不是同一張圖的兩種完成度，是兩個不同的決定。

三條由此長出來的紀律：

1. **形狀可以被數。** 每一張圖都要說得出它用了幾個形狀。說不出來，就表示你在描外形，不在做這個風格。
2. **設計是減法。** 先畫滿，再一個一個拿掉，拿到再拿就不認得為止，退回一格。那一格就是定稿。
3. **成本是真的。** 一張圖版最多五色，因為印房只有五塊版。這條在螢幕上不會自動消失——它是這個風格看起來像這個風格的原因，不是懷舊裝飾。

**不要做的事**：不要把它做成「扁平插畫風」。扁平插畫允許任意多的形狀、任意多的顏色、圓角、投影與漸層；本風格四樣都禁止，而且要求你把形數印在畫面上。

---

## 二、色彩系統

八個墨。**全站不出現純白，也不出現純黑**——最亮的是蛋殼 `#F4EDDC`，最暗的是墨綠 `#1E2A23`。

| 色號 | 名稱 | HEX | 用途 | 全站面積比 |
|---|---|---|---|---|
| 01 | 陶土 CLAY | `#E9A98C` | 頁面地色（唯一大面積底） | 約 34% |
| 02 | 蛋殼 SHELL | `#F4EDDC` | 紙／面板／長文底 | 約 17% |
| 03 | 墨綠 INK | `#1E2A23` | 文字、暗部、深色帶、頁尾 | 約 16% |
| 04 | 鴨綠 TEAL | `#17726B` | 第二地色、連結、結構 | 約 12% |
| 05 | 芥末 OCHRE | `#E3A11C` | 現用態、hover、被選中的事 | 約 9% |
| 06 | 苔綠 MOSS | `#6E8C3A` | 葉、莖、生物 | 約 6% |
| 07 | 朱紅 VERM | `#D8462E` | 拒絕、退件、警示、羽色 | ≤4% |
| 08 | 天青 SKY | `#7FB2C4` | 天、水、翅 | ≤2% |

### 硬規則

- **一張圖版連地色最多五色。** 第六塊版要再過一次機，不划算。這條規則同時是視覺紀律與功能驗收條件。
- **不得新增第九個色號。** 需要更多顏色時用**疊印**：兩塊墨相疊即得第九、第十…個顏色，共 36 個不重複的二階色，沒有一個有自己的 hex。

```css
/* 疊印：濕壓濕的透墨。上面那塊乘下去，不是半透明覆蓋 */
.ovcell{position:relative;isolation:isolate;aspect-ratio:1/1}
.ovcell i{position:absolute;inset:0;display:block}
.ovcell i+i{mix-blend-mode:multiply}
@supports not (mix-blend-mode:multiply){.ovcell i+i{opacity:.5}}
```

- **零漸層、零模糊陰影、零圓角。** 投影若真的需要，一律是實心位移色塊。

```css
*{border-radius:0!important;box-shadow:none!important}
```

- **對比**：墨綠／陶土 7.7:1、墨綠／蛋殼 13.2:1、蛋殼／鴨綠 5.0:1、墨綠／芥末 6.9:1。**苔綠不可作為長文底**（墨綠壓上去只有 4.0:1）；苔綠只給圖，不給文字帶。

---

## 三、字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 拉丁標題／數字／學名 | **Jost** | 300–600 | Futura 的自由近親。這個年代的美國童書封面幾乎都是幾何無襯線 |
| 中文全部 | **Noto Sans TC** | 400／500／700 | 與 Jost 的幾何骨架搭得起來 |

```html
<link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

字級 scale（1180px 容器）：

```css
body{font-size:16px;line-height:1.75;letter-spacing:.01em}
h1{font-size:clamp(34px,5.6vw,60px);font-weight:700;line-height:1.05}
h2{font-size:clamp(24px,3.4vw,38px);font-weight:700;line-height:1.2}
h3{font-size:19px;font-weight:700}
.lede{font-size:clamp(16px,1.5vw,18.5px)}
.note{font-size:12.5px}
/* 數字一律 Jost＋表格數字，因為形數會即時改變，字寬不能跳 */
.num{font-family:"Jost",system-ui,sans-serif;font-variant-numeric:tabular-nums;font-weight:500;letter-spacing:.06em}
/* 英文小標：全大寫、寬字距，當標籤用，永不當標題 */
.lat{font-family:"Jost";letter-spacing:.14em;text-transform:uppercase;font-size:11.5px}
/* 學名一律義大利體，且一律鴨綠或墨綠，不用第三個顏色 */
.sci{font-family:"Jost",serif;font-style:italic;font-size:15px;color:#17726B;letter-spacing:.03em}
```

**大字的用法**：形數是這個風格唯一該放大的東西。標題可以大，但它不是主角；`clamp(46px,8vw,78px)` 的位置留給那個數字。

---

## 四、版面與網格

- 容器 `max-width:1180px`，左右 `--gut: clamp(18px,3.4vw,44px)`。
- **色帶分段**：整頁由上到下是一條一條滿版的色帶（陶土地／蛋殼／墨綠／鴨綠），色帶之間**直接相接，不放分隔線、不放陰影、不放漸層**。這是把「兩塊顏色直接咬合」的規則從插畫放大到版面。
- **不留外框**：首屏的圖版滿版貼齊畫布邊，被邊切斷。圖不是貼紙。
- **零旋轉版面**：本風格的版面是正的。旋轉留給形狀內部（旋轉在出圖前算進座標，見第十二章）。

### 目錄：跨卡連續基線（subgrid）

圖鑑目錄的紀律是「不管中名幾個字、學名多長，所有卡片的圖／名／學名／形數四列都落在同一條橫線上」。這件事媒體查詢與 flex 都做不到，要 subgrid：

```css
.plates{display:grid;grid-template-columns:repeat(auto-fill,minmax(212px,1fr));gap:44px 18px}
.card{display:grid;grid-row:span 4;grid-template-rows:subgrid;background:#F4EDDC}
.card .fig{display:block;aspect-ratio:1/1}
.card .nm{align-self:end}      /* 中名靠列底，兩行與一行的卡片仍對齊 */
.card .sc{align-self:start}
.card .mt{align-self:end;border-top:2px solid #E9A98C}
@supports not (grid-template-rows:subgrid){
  .plates{align-items:start}.card{grid-row:auto;display:block}
}
```

---

## 五、元件配方

### 導覽（one-less 少一形）

現用頁不是被高亮，是**它的圖示比別人少一個形狀**，並在下面印出形數。這是把本流派的規則交給介面自己遵守。

```css
nav.one{display:flex;gap:4px}
nav.one a{width:82px;padding:7px 9px 6px;background:#141c17;color:#F4EDDC;
  text-decoration:none;border-top:4px solid #1E2A23}
nav.one a[aria-current=page]{border-top-color:#E3A11C}
nav.one a[aria-current=page] .ct{color:#E3A11C}
nav.one a:hover{background:#17726B}
```

```js
// 圖示以同一支引擎畫；現用頁丟掉重要度最低的那一個形狀
icon(shapes, isCurrent ? shapes.length - 1 : shapes.length)
```

### 按鈕

```css
.btn{display:inline-block;background:#1E2A23;color:#F4EDDC;border:0;padding:11px 20px;
  font-weight:700;letter-spacing:.04em;text-decoration:none;cursor:pointer}
.btn:hover{background:#D8462E}
.btn2{background:#E3A11C;color:#1E2A23}
.btn[disabled]{background:#E9A98C;color:#7a5c4c;cursor:not-allowed}
```
沒有圓角、沒有陰影、沒有 transition 曲線。狀態切換是硬切。

### 卡片

```css
.card{background:#F4EDDC;color:#1E2A23;text-decoration:none}
.card:hover{background:#E3A11C}     /* 整塊換底色，不位移、不放大、不加陰影 */
```

### 連結

地色是陶土，鴨綠壓上去只有 2.9:1，所以**連結在陶土上一律用墨綠，靠一條朱紅粗底線識別**；到了蛋殼帶才用鴨綠。

```css
a{color:#1E2A23;text-decoration:underline;text-decoration-color:#D8462E;
  text-decoration-thickness:2px;text-underline-offset:3px}
a:hover{background:#E3A11C;color:#1E2A23;text-decoration-color:#1E2A23}
.band-shell a{color:#17726B;text-decoration-color:#17726B}
.band-ink a{color:#E3A11C}
.band-teal a{color:#F4EDDC;text-decoration-color:#E3A11C}
```

### 表單

```css
form.order{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
form.order .full{grid-column:1/-1}
form.order input,form.order select{width:100%;background:#F4EDDC;border:2px solid #1E2A23;padding:9px 10px}
form.order .err{color:#D8462E;font-size:12px;min-height:1.2em;display:block}
fieldset{border:2px solid #1E2A23;padding:12px 14px}
:focus-visible{outline:4px solid #E3A11C;outline-offset:2px}
```

### 頁尾

墨綠底、蛋殼字、芥末連結、四欄自適應，最後一條芥末細線壓一行版權說明。**不要用鴨綠當頁尾底**——陶土與芥末壓在鴨綠上都不到 3:1。

---

## 六、動效規則

**這個風格的動作是一格一格拍的。**一九五〇–六〇年代的商業動畫（UPA 那一路）是有限動畫：沒有中間格、沒有加減速、關鍵動作之間直接跳。所以本風格**全站禁用貝茲曲線的 easing、禁用淡入、禁用視差、禁用位移彈跳**，一律 `steps()`。

四種動態，缺一不可：

| 種類 | 內容 | 參數 |
|---|---|---|
| ambient 環境 | **落形**：主圖版自己一形一形減下去，減到八形回到滿形重來 | 每 3400ms 減一形，`steps(1)` 硬切，無過渡 |
| input 輸入 | hover／focus 任一圖版，**下一個會被拿掉的形狀立刻翻成芥末色**；定稿台上滑過清單即在圖上點名該形 | 即時重繪（<2ms），無 transition |
| transition 轉場 | 換頁、換形數、換圖版時內容以 clip-path 六格橫向推移 | `animation:wipe .36s steps(6,jump-end) both` |
| signature 簽名 | **形數旋鈕**：整站所有圖像共用一個整數，按下去二十張圖版同時以那個形數重畫，跨頁持續 | 離散整數 8–19＋「定稿」，無滑桿 |

```css
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.wipe{animation:wipe .36s steps(6,jump-end) both}
@media(prefers-reduced-motion:reduce){.wipe{animation:none}}
```

**降級**：`prefers-reduced-motion:reduce` 時，落形停在定稿形數並改印一行說明；轉場歸零；輸入回饋改為瞬時換色（本來就是瞬時）；形數旋鈕照常可用——它是控制項，不是動畫。四種降級後資訊零損失。

```js
function RM(){try{return !!(window.matchMedia&&
  window.matchMedia("(prefers-reduced-motion:reduce)").matches)}catch(e){return false}}
```

---

## 七、插畫與圖像風格

**技法名稱：形數削減構成（shape-count reduction）。**全站沒有一張外部圖片、沒有一條描外形的線、沒有一個圓角框。所有圖像——圖版、圖示、logo、favicon、原語示範——都是同一支引擎的輸出。

### 五種原語，沒有第六種

```js
// [種類, 墨, 重要度 0–100, 是否識別關鍵, ...幾何]
['E', ink, imp, key, cx, cy, rx, ry, rot]        // 橢圓：身體、頭、複眼、果實
['R', ink, imp, key, x, y, w, h, rot]            // 矩形：腳、莖、色帶
['P', ink, imp, key, [x1,y1,x2,y2,...]]          // 多邊形：喙、尾、蒴果、背嵴
['L', ink, imp, key, x1, y1, x2, y2, bulge]      // 梭形：翅、葉、花瓣（兩段二次貝茲對咬）
['S', ink, imp, key, cx, cy, r, a0, a1]          // 弓形：胸腹分界、下顎、花喉
```

### 重要度就是設計

每一個形狀帶一個重要度。渲染時取重要度最高的前 n 個，**照原本的疊序畫**（重要度決定誰被留下，不決定誰壓在誰上面）。

```js
function solve(plate, n, cap){                     // cap = 5（含地色）
  var ord = plate.s.map((p,i)=>[p[2],i])
              .sort((a,b)=> b[0]-a[0] || a[1]-b[1]).map(o=>o[1]);
  var keep={}, cnt=0, inks={}; inks[plate.g]=1;
  plate.kx.forEach(i=>{keep[i]=1; cnt++; inks[plate.s[i][1]]=1});   // 先留四個識別關鍵
  for (var k=0; k<ord.length && cnt<n; k++){
    var i=ord[k]; if(keep[i]) continue;
    var t=Object.assign({}, inks); t[plate.s[i][1]]=1;
    if (Object.keys(t).length > cap) continue;                       // 碰到第六塊墨就跳過
    keep[i]=1; inks=t; cnt++;
  }
  return keep;
}
```

### 補漏白（trapping）

相鄰兩塊顏色之間會因為套印誤差露白；在螢幕上則是抗鋸齒的白縫。兩者同一個解法：**每塊墨以自己的顏色往外描 0.7**。

```js
'<path d="'+d+'" fill="'+c+'" stroke="'+c+'" stroke-width=".7"/>'
```

### 旋轉不進檔案

SVG 檔裡**不寫 `transform`**：矩形轉成四個已旋轉的角，橢圓轉成四段三次貝茲。理由是不同的 SVG 光柵器對 `rotate(a cx cy)` 的處理不一致（本站在建置期實測過一個會把旋轉矩形丟到畫布另一端的光柵器），而本風格沒有描邊，半個像素就是一條白縫。

```js
function rot(x,y,cx,cy,a){var s=Math.sin(a*Math.PI/180),c=Math.cos(a*Math.PI/180),
  dx=x-cx,dy=y-cy;return[cx+dx*c-dy*s, cy+dx*s+dy*c]}
```

### 判準

一張圖畫完，遮住全部文字，要能回答兩個問題：**它是什麼生物？它用了幾個形狀？**第二個答不出來就不是這個風格。

---

## 八、Logo 與 Favicon

Logo 是這個風格的極限測試：**它就是一張形數最少的圖版。**

```
五形：身（橢圓・苔綠）＋頭（橢圓・芥末）＋喙（多邊形・墨綠）＋眼（橢圓・墨綠）＋枝（矩形・墨綠）
畫框 128×128，地色陶土滿版，主體被下緣的枝切斷。
```

- **不要做字標。** 這個風格的識別是形狀，不是字型。
- **favicon 用同一份幾何**，直接以 inline SVG data URI 寫進 `<head>`，不另存檔案：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=...%3E">
```

- 16px 下仍要看得出是一隻鳥：所以五形裡有四形是「頭在右上、身在左下、喙戳出去」這個剪影，第五形（枝）只負責把它釘在畫布上。

---

## 九、Do & Don't

**Do**

- 把形數印在畫面上，當成規格而不是彩蛋。
- 讓地色是一塊形狀：它要有名字、有色號、有面積比例。
- 讓主體被畫布切斷。
- 給每個形狀一個重要度，並讓介面能照它削減。
- 顏色不夠時去疊印，不要去調第九個色號。
- 動畫一律跳格。

**Don't**

- ❌ 不要漸層、模糊陰影、圓角、玻璃、發光。
- ❌ 不要描邊線稿（outline + fill 是另一個風格，細線幾何線描更是）。
- ❌ 不要純白 `#FFF` 與純黑 `#000`。
- ❌ 不要用 easing 曲線與淡入——這兩樣會立刻把它變成一般的現代網頁。
- ❌ 不要置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ❌ 不要 emoji 當 icon；圖示與圖版同一支引擎。
- ❌ 不要 Lorem ipsum、不要「EST. 19xx」徽章、不要「把 X 變成 Y」句式標題。
- ❌ 不要在苔綠上放長文。
- ❌ 不要把它當「扁平插畫風」：那個風格允許無限的形狀與顏色，本風格不允許。

---

## 十、頁面骨架範例

```html
<body>
<header class="top"><div class="topin">
  <a class="mark" href="index.html">[五形 logo SVG]<span><b>社名</b><span class="lat">Latin・副標</span></span></a>
  <nav class="one" aria-label="主要導覽">
    <a href="index.html" aria-current="page">[圖示・少一形]<span class="lb">首頁</span><span class="ct num">4 形</span></a>
    <a href="plates.html">[圖示・滿形]<span class="lb">圖版總目</span><span class="ct num">5 形</span></a>
  </nav>
</div></header>

<!-- 簽名：形數旋鈕。離散整數，沒有滑桿 -->
<div class="knob" id="knobwrap" hidden><div class="knobin">
  <span class="kl">本社定稿形數</span>
  <div class="ks" role="group" aria-label="全站形數">
    <button data-n="0" aria-pressed="true">定稿</button>
    <button data-n="8">8</button><!-- …至 19 -->
  </div>
  <span class="kh">挑一個數字，全站圖版立刻以那個形數重畫。</span>
</div></div>

<main>
  <!-- 開場：削減直開場。滿版圖版＋形數，沒有大標＋副標＋按鈕組 -->
  <section class="hero"><div class="herogrid">
    <div class="heroplate" data-card>[滿版 1:1 圖版 SVG]</div>
    <div class="herotext">
      <p class="lat">今天的圖版　Plate of the day</p>
      <h1>八色鳥</h1><p class="sci">Pitta nympha</p>
      <div class="count"><b class="num" id="hn">11</b><span>形</span></div>
      <p>一句從產業本身長出來的話。</p>
      <address>地址・電話・營業時間</address>
    </div>
  </div></section>

  <section class="band-shell"><div class="wrap">
    <h2><span class="lat">Section label</span>中文小節標題</h2><div class="rule"></div>
    <div class="grid3">…</div>
  </div></section>

  <section class="band-ink"><div class="wrap">…深色帶：疊印色表…</div></section>
</main>

<footer>…墨綠底、四欄、芥末線…</footer>
</body>
```

---

## 十一、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是中世紀現代極簡寫實了。

### 特徵 1｜形狀預算：圖像由**可數**的幾何原語構成，數量本身是設計決策

不是「畫得簡單」，是「畫了幾個」。每一張圖都要印出它的形數，而且要能在別的形數下被重新畫出來。

```js
// 每個形狀帶重要度；渲染＝取前 n 個，照原疊序畫
const order = shapes.map((p,i)=>[p[2],i]).sort((a,b)=>b[0]-a[0]||a[1]-b[1]);
const keep  = new Set(order.slice(0,n).map(o=>o[1]));
const svg   = shapes.filter((_,i)=>keep.has(i)).map(draw).join('');
```

```html
<figcaption>八色鳥 <span class="num">11 形</span>（滿形 17）</figcaption>
```

### 特徵 2｜硬邊平塗：兩塊顏色直接相鄰，沒有線、沒有縫、沒有陰影

零描邊輪廓、零漸層、零投影。唯一允許的「邊」是與填色**同色**的 0.7 補漏白。

```js
// 每一塊墨往外撐 0.7：印刷是 trapping，螢幕是消除抗鋸齒白縫
`<path d="${d}" fill="${c}" stroke="${c}" stroke-width=".7"/>`
```

```css
svg *{shape-rendering:geometricPrecision}
*{border-radius:0!important;box-shadow:none!important}
.band-shell{background:#F4EDDC}   /* 色帶之間直接相接，不放分隔線 */
.band-ink{background:#1E2A23;color:#F4EDDC}
```

### 特徵 3｜限定墨數＋疊印：一張圖版連地色最多五色，額外的顏色一律疊出來

沒有第九個色號。這條規則要被**執行**，不是被宣告——引擎在挑形狀時就會跳過會用到第六塊墨的那一個。

```js
var t = Object.assign({}, inks); t[shape[1]] = 1;
if (Object.keys(t).length > 5) continue;   // 第六塊墨：跳過這個形狀
```

```css
/* 第 9–36 個顏色：兩塊墨相乘，不是半透明覆蓋 */
.ovcell{position:relative;isolation:isolate}
.ovcell i{position:absolute;inset:0;display:block}
.ovcell i+i{mix-blend-mode:multiply}
```

### 特徵 4｜滿版與切斷：地色是一塊形狀，主體被畫框切掉

主體不是浮在留白裡的貼紙。畫框四邊要切到東西——翅膀出框、枝條貫穿、尾巴被裁掉。

```html
<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
  <path d="M0 0H200V200H0Z" fill="#E9A98C"/>   <!-- 地色：有色號、有面積比 -->
  <path d="M-4 154H208V163H-4Z" fill="#1E2A23"/> <!-- 枝：刻意超出畫框 -->
</svg>
```

```css
.hero{padding:0}                    /* 圖版貼齊畫布邊，不留外框 */
.heroplate svg{width:100%;height:100%;aspect-ratio:1/1}
.card .fig{display:block;aspect-ratio:1/1}
```

### 特徵 5｜有限動畫：所有動作跳格，沒有補間

這個年代的動作是一格一格拍出來的。任何一條加減速曲線都會把它變成現代 UI。

```css
/* 唯一允許的時間函數 */
.wipe{animation:wipe .36s steps(6,jump-end) both}
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.card,.btn,nav.one a{transition:none}     /* 換底色是硬切 */
@media(prefers-reduced-motion:reduce){.wipe{animation:none}}
```

```js
// 環境動效也是跳格：整整 3400ms 不動，然後一次少一形
setInterval(function(){ n--; if(n<8) n=full; render(n); }, 3400);
```

---

## 十二、技術實作與相容性

本站三項核心技術，全部在 2026-09-06 查證 MDN／caniuse／web.dev。

### 1. CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 4 的目錄紀律——二十張卡片的圖／中名／學名／形數四列跨卡對齊成連續橫線。中名一行或兩行、學名長短不一時，只有 subgrid 能讓四列共用父格線。

**支援現況**（caniuse `css-subgrid`／MDN《Subgrid》／web.dev《Baseline 2023》）：Baseline **newly available 2023-09-15**，現已 widely available；Chrome/Edge 117+、Firefox 71+、Safari 16+、Opera 103+、Samsung Internet 24+，全球覆蓋 >92%。

**Fallback**：

```css
@supports not (grid-template-rows:subgrid){
  .plates{align-items:start}
  .card{grid-row:auto;display:block}
}
```
卡片內容一字不少，只是各自堆疊、跨卡不對齊。資訊零損失。

### 2. `mix-blend-mode:multiply` ＋ `isolation`（A 渲染層）

**承載**：特徵 3 的疊印——八塊墨印出 36 個二階色，畫面上沒有第九個色號。線性漸層或半透明覆蓋做不到這件事：透明疊色會把下層洗淡，乘法才是油墨。

**支援現況**（MDN《mix-blend-mode》《isolation》／caniuse）：兩者皆 Baseline **widely available，2020-01 起跨瀏覽器**。`isolation:isolate` 用來把混合脈絡關在色表容器裡，避免疊印穿透到頁面地色。

**Fallback**：

```css
@supports not (mix-blend-mode:multiply){.ovcell i+i{opacity:.5}}
```
色相相同、彩度略低；色表的結構與說明文字不變。

### 3. `steps()` 逐格時間函數（B 動效與時間軸層）

**承載**：特徵 5 的有限動畫。這是唯一被允許的時間函數，也是本風格與「現代扁平網頁」的分水嶺。

**支援現況**（MDN《steps()》《easing-function》）：Baseline **widely available，2015-07 起跨瀏覽器**；`jump-start／jump-end／jump-none／jump-both` 為同一函數的 step-position 參數，支援範圍相同。

**Fallback**：無支援缺口。極舊環境若整段 `animation` 失效，元素直接停在最終狀態（`both` 的效果），版面完整。

### 4. 其他相依 API

| API | 現況 | 不支援時 |
|---|---|---|
| `Element.innerHTML`（含 SVG 元素） | Baseline widely available | 無替代路徑；但頁面上的圖版在出檔時已烘成靜態 SVG，關掉 JavaScript 仍是完整的圖 |
| `localStorage` | Baseline widely available | 全部讀寫包在 try/catch，失敗時形數退回「定稿」，其餘功能不受影響 |
| `matchMedia` | Baseline widely available | 以 `RM()` 包住，取不到即視為「不要求減少動態」 |
| `Element.closest` | Baseline widely available | 事件委派前先判 `e.target.closest` 是否存在 |

### 5. 效能預算實測（2026-09-06，Node 22 單執行緒）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（inline 全部 CSS/JS/SVG，不含 Google Fonts） | index 55.2KB／plates 84.4KB／desk 58.3KB／press 61.1KB | ≤350KB ✅ |
| 一次全站重繪（20 張圖版、約 290 個形狀） | **1.28 ms** | 首屏 JS ≤100ms ✅ |
| 墨蓋率取樣（44×44 網格 × 15 形的內點測試） | 9.31 ms／次，僅在使用者按下一次時計算，不進動畫迴圈 | 不阻塞 60fps ✅ |
| 動畫成本 | 只有 `clip-path` 與 `background-color` 兩個屬性，零 `getBoundingClientRect`、零 layout thrashing | 60fps ✅ |

### 6. 無 JavaScript 時的行為

所有圖版在**出檔階段**就以同一支引擎算好並直接寫成 inline SVG。建置期輸出與執行期輸出經逐字比對，**290 個形狀的路徑字串完全相同**（差異 0），所以關掉 JavaScript 看到的不是降級版，是同一張圖。JavaScript 只多兩件事：形數旋鈕，與定稿台的削減操作；後者在 `<noscript>` 裡說明，且同一份「上限／識別關鍵」資料以表格印在頁面上。

---

*本規格書描述的是流派，不綁定產業。八色鳥出版社只是它的第一個範例站。*
