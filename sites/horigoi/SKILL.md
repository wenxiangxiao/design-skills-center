---
name: ukiyoe-keyblock
description: A Japanese ukiyo-e nishiki-e skin built the way the printers built it — one sumi key block whose line swells and tapers, flat colour blocks that sit a fixed distance off register, gradation permitted to the indigo alone, a hairline frame with a vertical cartouche, and rain drawn straight through everything on the page.
---

# 浮世繪（錦絵）Ukiyo-e Keyblock — 設計規格書

> 對應流派：**浮世繪 Ukiyo-e／錦絵 nishiki-e**（1765 鈴木春信以降的江戶多色木版畫；1830 年代普魯士藍 ベロ藍 進口後的藍摺絵一脈）。
> 外部參照：鈴木春信《座敷八景》(1765)／葛飾北斎《富嶽三十六景》(1831)／歌川広重《名所江戸百景》(1856–58)／歌川国芳《通俗水滸伝豪傑百八人》(1827)。
> 本規格書不綁定產業。示範站是東京谷中的刺青彫物所，但這套語言原本就用在演員海報、旅遊指南、商品目錄、小說插圖上——它是一套**印刷工序**，不是一種題材。

---

## 一、設計哲學

浮世繪不是「日本風的插畫」，它是一條**分工的生產線**：繪師畫版下、彫師把版下貼在山櫻木上刻出主版、摺師用不同的版一色一色摺上去。畫面上你看到的每一個特徵，都是這條生產線留下的痕跡：

- 線會粗細不均，因為那是**小刀**刻出來的，不是筆畫出來的，起刀深、收刀淺。
- 顏色會對不準，因為**每一個顏色是一塊獨立的木頭**，見当（對位榫）只能對到那麼準。
- 只有一個顏色有濃淡，因為濃淡是**拿濕布擦版木**做出來的，而那道工序太貴，只捨得用在主色上。
- 畫面上一定有一塊長方形的縱書題簽、角落一定有落款和改印，因為**這張紙是商品**，要標題、要署名、要通過檢閱才能賣。

所以照抄「櫻花、波浪、紅配藍」做不出浮世繪，只會做出土產店的包裝紙。**要做的是把工序抄進去。**一旦你的網頁裡「輪廓是一塊版、顏色是另外幾塊版、它們對不準」這件事成立，即使畫的是資料儀表板，它也會是浮世繪。

---

## 二、本風格的 5 個不可省略特徵

以下五項，**拿掉任何一項就不是這個風格了**。每一項都附可直接複製的片段。

### 特徵一　主版の抑揚線（一塊墨版，線有粗細）

全站所有形狀的輪廓來自**同一塊墨版**，而那條線**不是等寬的**：起筆 3–6 單位，收筆收到 0.7–1.2 單位，收得越快越像刻的。

**做法：不要用 `stroke`。** `stroke-width` 只能給一個值，畫出來是製圖不是版畫。要把中心線**膨脹成一個有寬度變化的填色路徑**：

```js
// 中心線 pts → 有抑揚的封閉填色路徑
function keyline(pts, w0 = 4.2, w1 = 0.8, pow = 1.5) {
  const n = pts.length, A = [], B = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1];
    const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    const t = i / (n - 1);
    const w = (w0 + (w1 - w0) * Math.pow(t, pow)) / 2;   // ← 抑揚はここ
    A.push([pts[i][0] - dy * w, pts[i][1] + dx * w]);
    B.push([pts[i][0] + dy * w, pts[i][1] - dx * w]);
  }
  const f = p => p.map(q => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  return 'M ' + f(A) + ' L ' + f(B.reverse()) + ' Z';
}
// <path d="{keyline(pts)}" fill="#14120F"/>   ← fill であって stroke ではない
```

自我檢查：把圖放大，任何一條曲線上都要找得到「這裡比那裡粗」。找不到就是圖面，不是版畫。

（唯一的例外是**印章與界線**：改印的丸印、角印，以及版面的界線與格線，本來就是一次壓下去的等寬痕跡，這些可以用 `stroke`。圖裡的任何一條輪廓不行。）

### 特徵二　色版の見当ずれ（顏色一定對不準，而且錯的方向全站一致）

每一個顏色是一塊獨立的版，位移向量**每塊版固定、全站相同**（建議 1.2–3.4 單位）。所以一塊色永遠是一邊溢出輪廓、另一邊露出紙。

```css
/* 色版：位移量は版ごとの定数、--zure は「見当を合わせる」倍率（1=ずれたまま／0=合う） */
.ban-iro > *{
  transform: translate(calc(var(--ox) * var(--zure,1)), calc(var(--oy) * var(--zure,1)));
  transition: transform 90ms linear;
}
.zu{ --zure:1 }
.zu:hover, .zu:focus-within{ --zure:0 }      /* 指を置くと見当が合う */
@property --zure{ syntax:"<number>"; inherits:true; initial-value:1 }
```

```html
<g class="ban-iro">
  <path d="…" fill="#BE3B33" style="--ox:3.4px;--oy:2.0px"/><!-- 紅版 -->
  <path d="…" fill="#2F5E93" style="--ox:-2.6px;--oy:1.5px"/><!-- 藍版 -->
</g>
<g class="ban-sumi" fill="#14120F"><path d="…"/></g><!-- 主版はいつでも正位置 -->
```

固定一張對照表，全站共用：

| 版 | 位移 (x, y) |
|---|---|
| 藍（濃） | −2.6, +1.5 |
| 藍（中） | +1.9, −2.2 |
| 藍（淡） | −1.2, −3.0 |
| 紅 | +3.4, +2.0 |
| 黄土 | −3.1, −1.4 |
| 草 | +2.3, −1.0 |
| 鼠 | +1.3, +2.8 |
| 白（胡粉） | −1.8, +2.4 |

**主版永遠不位移。** 位移的是顏色，不是線。

### 特徵三　ぼかしは藍にだけ（畫面上唯一有濃淡的顏色）

`ぼかし` 是摺師拿濕布擦版木做出來的漸層。規則三條，缺一不可：

1. **恰好兩個 stop**，第二個 stop 落在 30–40%，其後是平色 → 平色面積 ≥50%。
2. **一定是直線的、從一個邊進來**。禁止 radial、禁止 conic、禁止三段以上。
3. **只有藍可以用。** 其餘每個顏色在全站只有一個值。

```html
<linearGradient id="bokashi-ai" x1="50%" y1="0%" x2="50%" y2="100%">
  <stop offset="0"    stop-color="#1B3A63"/>  <!-- 拭き始め -->
  <stop offset="0.32" stop-color="#3E6E9E"/>  <!-- ここから下は平色 -->
</linearGradient>
```

```css
/* 他の色に濃淡を持たせない。平塗り一値のみ。 */
.beni{ background:#BE3B33 } .odo{ background:#C8953C } .kusa{ background:#4E6B45 }
```

自我檢查：在畫面上找有濃淡的東西，它必須全部是藍的。找到一塊有濃淡的紅，這條就破了。

實作上的紀律：直接掃描產出的 SVG，把所有 `<linearGradient>` 的 `stop-color` 列出來——**每一個值都必須落在藍的色域內**。這是一條可以寫成測試的規則。

### 特徵四　界線・余白・縦の題簽（這張紙是商品）

畫**不能出血**。必有一條髮絲界線圍住，界線外留紙；畫內必有一塊縱書的長方形題簽，角落必有落款，下方必有改印。

```css
.waku{ border:1px solid #14120F; background:#DED0AC; position:relative }
.daisen{                          /* 題簽：縦書きの細長い枠 */
  position:absolute; top:10px; right:10px; z-index:3;
  writing-mode: vertical-rl;      /* ← 横に寝ていたら錦絵ではない */
  font-family:"Zen Antique", serif; font-size:15px; letter-spacing:.2em;
  background:#EADFC4; border:1px solid #14120F; padding:10px 6px; line-height:1.2;
}
.rakkan{ position:absolute; left:10px; bottom:12px; writing-mode:vertical-rl;
         font-size:10.5px; letter-spacing:.24em; color:#453B2D }
.tcy{ text-combine-upright:all }  /* 縦中横：縦書きの中の算用数字 */
```

改印（檢閱通過的印）＝一個實心圓印＋一個年月角印；未通過＝只有空的圓與空的方。

```html
<svg width="34" height="50" viewBox="0 0 34 50" aria-hidden="true">
  <circle cx="17" cy="16" r="14" fill="#BE3B33"/>
  <text x="17" y="23" text-anchor="middle" font-size="18" fill="#EADFC4">極</text>
  <rect x="5" y="34" width="24" height="14" fill="#BE3B33"/>
  <rect x="9" y="37" width="16" height="2.4" fill="#EADFC4"/>
  <rect x="9" y="42" width="16" height="2.4" fill="#EADFC4"/>
</svg>
```

### 特徵五　雨・波・雲の線条（地是線群，不是材質）

背景不用材質、不用噪點、不用濾鏡。用**線的群**：

- **雨**＝單一角度的直線，從版面一端拉到另一端，**壓過所有東西**（人、字、框都不避讓）。
- **波**＝爪形，一定往行進方向捲進去，爪尖前面散著幾顆分離的飛沫。
- **雲**＝有輪廓的帶，由幾個大圓耳連成，兩端捲成渦。

```css
/* 雨は画面全部を横切る。要素の上に置く。 */
.ame{ position:fixed; inset:-14vh -16vw; z-index:40; pointer-events:none;
      mix-blend-mode:multiply }
.ame g{ animation: ame 22s linear infinite }
@keyframes ame{ to{ transform: translate(159.3px, 640px) } } /* 640×tan14° = 159.3 */
```

```js
// 雨脚：一つの角度の髪の毛のような直線群（長さだけ不揃い）
for (let x = -H*Math.tan(rad) - 20; x < W + 20; x += 26) { … }
```

---

## 三、色彩系統

底是**奉書紙**（楮紙），不是白色。藍是唯一有階的顏色，而且它有五階。

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 奉書紙 | `#EADFC4` | 唯一大面積底色（永遠帶簀の目與繊維，不存在平塗） | 32% |
| 紙の陰 | `#DED0AC` | 次階の面、枠の中、表頭 | 9% |
| 紙の暗 | `#CDB98F` | 頁の外側、影 | 4% |
| 墨 | `#14120F` | 主版・正文・2px 規線（**全站唯一的黑**） | 20% |
| 淡墨 | `#453B2D` | 次級文字 | 5% |
| ベロ藍（濃） | `#1B3A63` | ぼかしの拭き始め、連結、按鈕 | 9% |
| ベロ藍（中） | `#2F5E93` | 平色の藍、hover | 7% |
| ベロ藍（淡） | `#7FA6C9` | 遠景、薄い面 | 4% |
| ベロ藍（極淡） | `#C3D6E6` | 最も薄い拭き終わり | 2% |
| 紅（紅花） | `#BE3B33` | 落款・改印・現用の印・警示 | 5% |
| 褪せ紅 | `#BE8C63` | 紅の褪色先（**動效專用，不得單獨承載資訊**） | — |
| 黄土 | `#C8953C` | focus ring、強調、角・稲妻 | 4% |
| 草 | `#4E6B45` | 葉・蛇。用量最少 | 2% |
| 版木（山桜） | `#8E5F3C` | 奥付の帯（年輪） | 2% |

硬規則：

- **零純白**（最亮 `#EADFC4`）、**零純黑**（最暗 `#14120F`）。
- **零色彩漸層**，唯一例外是藍的 ぼかし（特徵三）。
- **零 `filter: blur`**、**零模糊陰影**。要厚度就用硬邊實色 `box-shadow: 3px 3px 0 rgba(20,18,15,.3)`。
- 圓角上限 3px。
- 長文一律坐在奉書紙或紙の陰上（對墨 ≥ 11:1）。**禁止讓正文坐在藍色面上**（`#2F5E93` 對墨只有 2.3:1）。

### 紅は褪せる、藍は褪せない

紅花（beni）是有機染料，會褪成黃褐；ベロ藍是無機顏料，兩百年不變。這件事可以直接寫進 CSS，成為全站唯一的簽名動效：

```css
@property --beni-live{ syntax:"<color>"; inherits:true; initial-value:#BE3B33 }
html{ animation: beniyake 46s ease-in-out infinite }
@keyframes beniyake{
  0%,7%{ --beni-live:#BE3B33 } 60%{ --beni-live:#BE8C63 } 100%{ --beni-live:#BE3B33 }
}
/* 使う側は fill="var(--beni-live)" / background:var(--beni-live) */
```

**前提：紅不得單獨承載任何資訊。**現用狀態要用「有沒有印」這種形狀差異表示，不能用「紅或不紅」。

---

## 四、字體系統

一套明朝體撐全場，另加一套較有裝飾性的明朝當標題／題簽。

```css
:root{
  --men: "Shippori Mincho B1", "Hiragino Mincho ProN", "Noto Serif JP", serif;
  --kaku:"Zen Antique", "Shippori Mincho B1", serif;   /* 題簽・見出し */
}
```

| 用途 | family | size | weight | letter-spacing | line-height |
|---|---|---|---|---|---|
| 屋号（刊頭） | `--kaku` | 34px | 400 | .14em | 1 |
| 丁の題（h1/h2） | `--kaku` | 20–23px | 400 | .18–.20em | 1.5 |
| 小見出し（h3） | `--kaku` | 19px | 400 | .16em | 1.5 |
| 正文 | `--men` | 16px | 400 | 0 | 1.95 |
| 表・注記 | `--men` | 13–14px | 400 | .08em | 1.8 |
| 標籤・ラベル | `--men` | 10.5–12px | 400 | .2–.34em | 1.6 |
| 題簽（縦） | `--kaku` | 15px | 400 | .2em | 1.2 |

規則：

- **標題不用粗體。**這個流派沒有 bold——字是刻的，要強調就換大小、換方向、加框，不是加粗。（`--men` 的 700/800 只留給表頭 `th` 這種需要區隔的地方。）
- 縱書處一律 `writing-mode: vertical-rl`；縱書中的算用數字用 `text-combine-upright: all` 包成縱中横。
- 漢字讀音用 `<ruby>` + `<rt>`，`rt` 字級 .46em、字重 400。
- **禁止等寬體與 mono 數字。**一出現 mono 就滑進工程製圖風。

---

## 五、版面與網格

- 內容寬上限 **1040px**，左右 padding 20px。
- 分節之間 `margin-bottom: 34px`；節標題 `border-bottom: 2px solid 墨`，padding-bottom 7px。
- 主要二欄用 `1.35fr / 1fr`（文字重、圖輕），gap 26px。≤860px 收成一欄。
- **三枚続**：`direction: rtl` + `grid-template-columns: repeat(3,1fr)`，gap **0**（三張紙是並排貼著的，中間只有一條界線）。子元素 `direction: ltr` 還原文字方向。

```css
.sanmai{ direction:rtl; display:grid; grid-template-columns:repeat(3,1fr); gap:0 }
.mai{ direction:ltr; border:1px solid #14120F; border-left-width:0; position:relative }
.mai:last-child{ border-left-width:1px }
@media (max-width:640px){                /* 狭いときは絵が一枚に減る。字は減らさない */
  .sanmai{ grid-template-columns:1fr }
  .mai:not(.naka) .e{ display:none }
}
```

- 表格：`border-collapse: collapse`，1px 實線格線，`th` 底 `紙の陰`。**不要斑馬紋。**
- 留白不是設計語言——這個流派的版面是**滿的**，空的地方是紙，紙上有簀の目。

---

## 六、元件配方

### 導覽（改印式）

四個等寬的札並排。現用頁的札上**捺了改印**（實心圓＋角印），其餘只有空的圓與空的方。大小、顏色、亮度、方向四者完全相同。

```css
.fuda{ position:relative; display:block; background:#DED0AC;
       border:1.5px solid #14120F; padding:10px 12px 9px; min-height:72px;
       box-shadow:3px 3px 0 rgba(20,18,15,.18); text-decoration:none; color:#14120F }
.fuda[aria-current="page"]{ background:#EADFC4; box-shadow:3px 3px 0 rgba(20,18,15,.34) }
.fuda .in{ position:absolute; right:8px; top:7px }
```

無障礙：這種差異對輔助科技不可見，**現用項必須同時帶 `aria-current="page"`**。

### 按鈕

```css
button{ font-family:var(--men); font-size:15px; letter-spacing:.14em; padding:10px 22px;
        background:#1B3A63; color:#EADFC4; border:1.5px solid #14120F;
        box-shadow:3px 3px 0 rgba(20,18,15,.4); cursor:pointer }
button:hover{ background:#2F5E93 }
button:active{ transform:translate(2px,2px); box-shadow:1px 1px 0 rgba(20,18,15,.4) }
button.sub{ background:#DED0AC; color:#14120F }
```

### 卡片（一枚絵）

上半是畫（帶界線、題簽、落款），下半是詞書，底下一行改印。**不要圓角卡片、不要模糊陰影。**

```css
.fuda-e{ background:#EADFC4; border:1px solid #14120F;
         box-shadow:4px 4px 0 rgba(20,18,15,.2); display:flex; flex-direction:column }
.fuda-e .waku{ position:relative; border-bottom:1px solid #14120F; background:#DED0AC }
```

### 列表

項目符號用 **45° 的實心方塊**（紅），不是圓點、不是 emoji。

```css
ul.yaku li{ position:relative; padding:6px 0 6px 20px;
            border-bottom:1px dotted rgba(20,18,15,.4) }
ul.yaku li::before{ content:""; position:absolute; left:2px; top:15px;
  width:8px; height:8px; background:var(--beni-live); transform:rotate(45deg) }
```

### 番号

用 `counter(x, cjk-ideographic)` 出「一二三」，關在一個 1.5px 的方框裡。

### 奥付（footer）

跨頁的版木帶（年輪），三欄：版元／他の丁／縦書きの刻銘。

---

## 七、動效規則

四種，性質與觸發源都不同，缺一不可。**安靜不是這個風格的特徵。**

| 種類 | 名 | 觸發 | 時間 | easing |
|---|---|---|---|---|
| ambient | **雨脚通し** 貫穿全頁的雨線群，壓在所有東西之上、持續平移 | 無（時間） | 22s 循環 | `linear` |
| input-driven | **見当合わせ** 指／游標放上圖，色版歸位，ずれ消失 | pointer / focus | **90ms** | `linear` |
| transition | **ばれん摺り** 開丁時版面被斜向掃進來 | 頁面進入（`@starting-style`） | 480ms | `cubic-bezier(.2,.72,.3,1)` |
| signature | **紅の褪せ** 全站的紅緩緩褪向黃褐再被「摺り直し」，藍永不變 | 無（時間） | 46s 循環 | `ease-in-out` |

```css
/* ばれん摺り：頁面進入時的斜掃 */
.sheet{
  clip-path: polygon(-40% -8%, 142% -8%, 142% 108%, -40% 108%); opacity:1;
  transition: clip-path 480ms cubic-bezier(.2,.72,.3,1), opacity 300ms ease-out;
}
@starting-style{
  .sheet{ clip-path: polygon(-40% -8%, -33% -8%, -25% 108%, -40% 108%); opacity:.5 }
}
/* 離散的な出入り（display を含む）は allow-discrete で */
.tsuge{ display:none; opacity:0;
        transition: opacity 240ms, transform 240ms, display 240ms allow-discrete }
.tsuge.deru{ display:block; opacity:1 }
@starting-style{ .tsuge.deru{ opacity:0 } }
```

降級（資訊零損失）：

```css
@media (prefers-reduced-motion: reduce){
  html, .ame g{ animation:none }      /* 雨は消えず「止まる」。紅は最初の色で固定 */
  .sheet{ transition:none; clip-path:none }
  .zu, .zu *{ transition:none }       /* 見当は即座に合う／合わない */
}
```

**禁止**：淡入捲動揭示（scroll reveal）、視差、彈跳、模糊轉場、發光。這些都不是木版印刷會發生的事。

---

## 八、插畫與圖像風格

技法名 **`keyblock-bokashi`（主版と暈しの構成）**。全站零外部圖片，所有圖由三個原語組成，**不允許第四種**：

1. **主版線** — `keyline()` 出來的、有抑揚的填色路徑（特徵一）。
2. **色版** — 平色或藍的 ぼかし，帶固定位移（特徵二、三）。
3. **毛彫り** — 沿著曲線生出來的細短線群，用來做陰影、質感、頭髮、葉脈。

```js
// 毛彫り：曲線に沿って片側へ生やす、先の細る短い線
function hatch(pts, n, len, side) {
  let out = '', step = Math.max(1, Math.floor(pts.length / n));
  for (let i = 0; i < pts.length - step; i += step) {
    const a = pts[i], b = pts[i + step];
    let dx = b[0]-a[0], dy = b[1]-a[1]; const l = Math.hypot(dx,dy)||1; dx/=l; dy/=l;
    const c = [];
    for (let k = 0; k <= 4; k++) { const t = k/4;
      c.push([a[0] - dy*side*len*t + dx*len*t*0.34, a[1] + dx*side*len*t + dy*len*t*0.34]); }
    out += `<path d="${keyline(c, 1.9, 0.25)}"/>`;
  }
  return out;
}
```

造形法則：

- 曲線用**密取樣的自由曲線**（Catmull-Rom 取樣成折線），不是圓規弧——彫師用的是小刀，不是圓規。
- 花瓣、葉、爪一律是**兩條分開的邊界線**（左緣一刀、右緣一刀），不是一條封閉的等寬輪廓。
- 形的邊界是**線的邊界**，不是填色的邊界；顏色可以越界，線不會。
- 大面積平色上要看得見版木的木目（見第十二章）。

**明文禁用**：照片、半調網點、細線幾何線描（thin-lineart）、`feTurbulence` 當假質感貼在成品上、扁平化單色圖示、金屬漸層、任何發光、任何模糊陰影、任何把向量圖做舊的濾鏡。

---

## 九、Logo 與 Favicon

Logo＝**一個由主版線構成的圖記 ＋ 一塊位移的色版**，旁邊是縱或橫的屋号。不要文字商標、不要字母組合。

```html
<svg viewBox="0 0 62 62" aria-hidden="true">
  <!-- 色版：先に、ずれた位置で -->
  <path d="M 10 40 L 20 18 L 40 12 L 52 24 L 42 48 L 22 50 Z"
        fill="#BE3B33" transform="translate(3.4 2)"/>
  <!-- 主版：抑揚のある線、正位置 -->
  <g fill="#14120F">
    <path d="{keyline(頭の線, 5.0, 1.1)}"/>
    <path d="{keyline(顎の線, 4.4, 1.1)}"/>
    <path d="{keyline(波の線, 3.4, 1.2)}"/>
    <circle cx="40" cy="26" r="3.6"/>
  </g>
</svg>
```

Favicon＝16px 也看得懂的三件事：**暖色的紙地 ＋ 一條藍的波 ＋ 一顆紅印**，外加 3px 的墨框。全部寫成 inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23EADFC4'/%3E%3Cpath d='M4 44c9-7 15 3 24-4s16 3 24-5v29H4z' fill='%232F5E93'/%3E%3Cpath d='M4 44c9-7 15 3 24-4s16 3 24-5' fill='none' stroke='%2314120F' stroke-width='4' stroke-linecap='round'/%3E%3Ccircle cx='46' cy='18' r='9' fill='%23BE3B33'/%3E%3Crect x='2' y='2' width='60' height='60' fill='none' stroke='%2314120F' stroke-width='3'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定輪廓，再上色。輪廓沒決定好，上幾個顏色都不會好看。
- 每一塊色都給它一個固定的錯位向量，並且全站共用同一張表。
- 讓雨（或雲、或波）壓過介面元素——包含導覽和正文。
- 題簽、落款、改印三件一定要有，而且題簽一定是縱的。
- 大面積平色上留木目，大面積紙上留簀の目。
- 深色面上的字用紙色反白；長文永遠放在紙上。

**Don't**

- ❌ 用 `stroke-width` 畫輪廓（等寬線＝製圖）。
- ❌ 給紅色、黃土、綠色任何漸層（濃淡是藍的特權）。
- ❌ 用 radial-gradient、conic-gradient、box-shadow 的 blur、任何發光。
- ❌ 用 emoji 當 icon、用 Lorem ipsum、用紫藍漸層 hero。
- ❌ 把題簽橫過來排。
- ❌ 用 mono 字體排數字（→ 工程製圖風）。
- ❌ 用「EST. 19xx」徽章、置中大標＋兩顆按鈕＋三張圓角卡片。
- ❌ 讓色彩單獨承載狀態（紅會褪；狀態要靠形狀差異）。
- ❌ 用照片、半調網點、假紙紋濾鏡貼圖。

---

## 十一、頁面骨架範例

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>丁の名｜屋号</title>
<link rel="icon" href="data:image/svg+xml,…">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;700;800&family=Zen+Antique&display=swap">
<style>/* 第三〜七章の規則をすべてここに inline */</style>
</head>
<body>
<a class="skip" href="#hon">本文へ</a>

<!-- ① 雨脚通し：全部の上を横切る -->
<div class="ame" aria-hidden="true"><svg viewBox="0 0 1500 640" preserveAspectRatio="none">
  <g class="ame-nagare" opacity=".16"><g><!--雨--></g><g transform="translate(-159.3 -640)"><!--雨--></g></g>
</svg></div>

<!-- ② 刊頭＋改印導覧 -->
<header class="kanban">
  <div class="kanban-in">
    <a class="yago" href="index.html"><svg>…logo…</svg><span><b>屋号</b><i>ROMAJI</i></span></a>
    <p>業種／営業の一行</p>
  </div>
  <nav class="kaiin" aria-label="主な行き先（改印のあるものが今ご覧の丁）">
    <a class="fuda" href="index.html" aria-current="page"><svg class="in">…捺印…</svg>
      <span class="na">見世</span><span class="yo">MISE</span></a>
    <a class="fuda" href="b.html"><svg class="in">…空印…</svg>
      <span class="na">二丁</span><span class="yo">NI</span></a>
    …
  </nav>
</header>

<!-- ③ 本文：ばれん摺りで入ってくる -->
<main id="hon" class="sheet">
  <div class="zu"><div class="sanmai">
    <article class="mai"><span class="daisen">題簽</span><span class="rakkan">落款</span>
      <svg class="e" viewBox="600 0 300 400"><g style="--ox:1.8px;--oy:-1.2px;
        transform:translate(calc(var(--ox)*var(--zure,1)),calc(var(--oy)*var(--zure,1)))">
        <use href="#e-zu"/></g></svg>
      <div class="koto"><h1>屋号</h1><dl><dt>所</dt><dd>…</dd></dl></div>
    </article>
    …中・左…
  </div></div>

  <section class="dan"><h2>見出し</h2> … </section>
</main>

<!-- ④ 奥付（版木の年輪） -->
<footer class="okuduke"><div class="okuduke-in">
  <div><b>版元</b>…</div><div><b>他の丁</b><nav>…</nav></div>
  <p class="in-tate">刻銘（縦書き）</p>
</div></footer>
</body>
</html>
```

---

## 十二、技術實作與相容性

本風格用三項技術承載視覺，各屬不同層。三項都**不是為了炫技**，而是因為這個流派的特徵需要它們。

### (A 渲染層) CSS Painting API — `paintWorklet`

**承載**：奉書紙的簀の目・糸目・楮の繊維，與奥付那條版木的年輪。用它的理由是：木目在一塊大面積平色上必須**連續且與元素同大小**，而且每一塊版木的木目要不一樣——用固定的 `repeating-linear-gradient` 只能得到週期一致的假紋，換一塊版就穿幫。

```js
const src = `
registerPaint('hangi', class{
  static get inputProperties(){ return ['--w-seed','--w-ink','--w-base'] }
  paint(c,g,p){
    const w=g.width,h=g.height;
    let s=(parseFloat(p.get('--w-seed'))*2654435761)>>>0||1;
    const r=()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296};
    c.fillStyle=(p.get('--w-base')+'').trim(); c.fillRect(0,0,w,h);
    c.strokeStyle=(p.get('--w-ink')+'').trim(); c.lineWidth=1.1;
    const cx=-w*0.55, cy=h*0.42;                       // 年輪の中心は枠の外
    for(let rad=8; rad<w*2.6; rad+=6+r()*9){
      c.beginPath(); let f=1;
      for(let y=-2;y<=h+2;y+=4){ const dy=y-cy,q=rad*rad-dy*dy; if(q<0){f=1;continue;}
        const x=cx+Math.sqrt(q)+Math.sin(y*0.045+rad*0.08)*2.2;
        f?(c.moveTo(x,y),f=0):c.lineTo(x,y); }
      c.globalAlpha=.12+r()*.22; c.stroke();
    }
  }
});`;
// 外部ファイル無しで登録する（全站零外部檔案の制約下での定石）
if (typeof CSS !== 'undefined' && CSS.paintWorklet) {
  const u = URL.createObjectURL(new Blob([src], {type:'text/javascript'}));
  CSS.paintWorklet.addModule(u)
    .then(() => document.documentElement.classList.add('paint-ok'))
    .catch(() => {});
}
```

```css
/* 既定は fallback。worklet が本当に載ったときだけ差し替える。 */
.okuduke{
  background-color:#DED0AC;
  background-image:
    repeating-linear-gradient(92deg, rgba(142,95,60,.15) 0 2px, transparent 2px 9px),
    repeating-linear-gradient(92deg, rgba(142,95,60,.09) 0 1px, transparent 1px 23px);
}
.paint-ok .okuduke{ background-image: paint(hangi); --w-seed:11; --w-ink:#8E5F3C; --w-base:#DED0AC }
```

**查證（caniuse.com「CSS Painting API」，2026-09 取得）**：全球可用率 **78.01%**。Chrome 65+／Edge 79+／Opera 52+／Chrome for Android／Samsung Internet 支援；**Safari 3.1–27.1 皆為「既定關閉」**、**Firefox 至 159 皆未支援**、iOS Safari 未支援。
**fallback 具體行為**：不支援（或 worklet 載入失敗、或 JS 關閉）時 `paint-ok` 這個 class 永遠不會被加上，畫面停在上面那組 `repeating-linear-gradient`——同樣是暖色紙／木色帶，明度與對比一致，**沒有任何文字或資訊依賴 worklet**。
**注意**：`@supports (background: paint(x))` 在 Chrome 會回報 true，即使模組尚未載入。所以判斷要用 `addModule().then()` 加 class，不要用 `@supports`。

### (B 動效與時間軸層) `@starting-style` ＋ `transition-behavior: allow-discrete`

**承載**：開丁時的「ばれん摺り」斜掃轉場，與告げ札（狀態訊息）的離散出入。用它的理由是：摺り是**一次過去就結束**的動作，不是循環動畫；而 `@starting-style` 正好只在元素進場時觸發一次，**不需要任何 JavaScript**，所以關掉 JS 轉場照樣成立。

**查證**：`transition-behavior: allow-discrete` 與 `@starting-style` 自 **Chrome 117 / Safari 17.5 / Firefox 129** 起可用，2024 年 8 月成為 Baseline（MDN / caniuse）。已知問題：**Firefox 目前不會轉場 `display`**（mdn/browser-compat-data #26155），即使 `transition-behavior` 本身回報支援。
**fallback 具體行為**：不支援時元素**直接出現在最終狀態**——版面立刻完整、告げ札立刻可見，沒有任何內容延後或隱藏。Firefox 的 display 問題同理：淡入被跳過，內容照常。

### (C 版面與樣式層) `writing-mode: vertical-rl` ＋ `text-combine-upright`

**承載**：題簽、落款、双六のマス名、奥付の刻銘的縱書，以及縱書中算用數字的縱中横。用它的理由是特徵四——**題簽橫過來排，這張紙就不是錦絵了**。

**查證**：`writing-mode` 的縱書值為全瀏覽器支援（十年以上）。`text-combine-upright: all` 自 **2022 年 3 月**起為 Baseline（MDN）；但 **`digits` 值支援面窄，本規格明文不使用**，一律用 `all` 配 `<span class="tcy">` 明確包住要合成的數字。
**fallback 具體行為**：極舊環境下數字改成一位一行直排，**完全可讀**，只是佔的行高變長。

### 附註（非核心技術）

- `@property` 註冊 `--beni-live`（`<color>`）與 `--zure`（`<number>`），讓自訂屬性可以補間。未支援時紅色停在初始值、見当直接跳位；兩者都不承載資訊，零損失。
- `:has()` 用於「見当を合わせる」的核取方塊（純 CSS 狀態機，鍵盤可操作）。

### 效能預算（實測）

| 項目 | 值 | 上限 |
|---|---|---|
| 單頁大小（含 inline SVG／CSS／JS，不含 webfont） | 71–228 KB | ≤350 KB |
| 首屏 JS 執行 | 僅 `addModule()` 一次呼叫（< 5ms），其餘 0 | ≤100ms |
| 動畫合成 | 四種動效全部只動 `transform` / `opacity` / `clip-path` / 已註冊自訂屬性 | 60fps |
| layout thrashing | 無（JS 不讀取 layout 屬性） | 無 |

**做法上的紀律**：所有 SVG 在**建置階段**用 Node 產生成靜態字串寫進 HTML，執行時不生成任何幾何。因此關掉 JavaScript，圖、字、表、導覽、價目全部在場——只有雨不流動、賽不能擲、見当只能用核取方塊合。

---

*本規格書由 **Claude Opus 5**（排程 Agent）於 2026-09-16 撰寫，示範站：`sites/horigoi/`。*
