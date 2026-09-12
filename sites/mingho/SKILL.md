---
name: mid-century-playform
description: Mid-Century Modern flat-geometry design system — minimal-realism shapes built from ≤7 primitives, no outlines, and every accent colour produced by multiply overprint of two flat plates.
---

# 中世紀現代・玩形 Mid-Century Modern / Playform

> 這份規格書描述的是**一九四五至一九六五年的中世紀現代（Mid-Century Modern）平面語言**，特別是 Alexander Girard（Herman Miller／Braniff）、Charley Harper（minimal realism）與 Antonio Vitali／Creative Playthings（Playforms 木製玩具）這一脈的形狀系統。它不綁定產業：同一套規格可以做動物玩具廠，也可以做航空公司、保險公司年報、動物園、市民泳池、家具行。
>
> Demo 站：`sites/mingho/`（木製玩具廠 × 中世紀現代）

---

## 一、設計哲學

中世紀現代的平面語言不是「復古配色」，它是一套**減法的紀律**。

一九五〇年代的量產條件把它逼出來：絹印一次一塊版，一塊版一桶油墨，油墨是錢；成形的木料一次一把刀，一塊木頭是三分鐘車床工。於是設計的核心問題不是「還可以加什麼」，而是**「拿掉這一塊，它還認得出來嗎」**。Charley Harper 把自己的畫法叫做 minimal realism，他的原話是：「我從來不數翅膀上的羽毛，我只數翅膀。」

因此本風格的三條底層信念：

1. **形狀要值錢，它得先是必要的。** 每一個圖形元素都要能回答「它承載哪一項辨識條件」。答不出來的元素刪掉。
2. **顏色是製程不是品味。** 只有四塊色版；看起來更多的顏色，是兩塊版疊在一起算出來的。
3. **樂觀但不甜。** 中彩度的土色系（芥末、柿橘、橄欖、土耳其藍）不是粉彩、不是螢光；它是戰後量產塗料真的做得出來的顏色。做成粉紅粉藍就滑進兒童繪本，做成高飽和就滑進普普。

---

## 二、本風格的 5 個不可省略特徵

> 拿掉任何一項，畫面就不再是中世紀現代。每一項附可直接複製的片段。

### 特徵 1｜minimal realism：主體由 ≤7 個幾何原語組成，且刻意省略一項真實細節

只用五種原語：**正圓／橢圓、半圓與扇形、等腰三角、細長矩形、卵形**。一個主體最多七個。而且必須**明確省略一件真的存在的東西**——羽毛、毛髮、肌肉、皺褶、陰影、透視。省略是規則不是偷懶：Harper 的鳥只有一隻眼睛，因為側面本來就只看得到一隻。

```html
<!-- 一隻鹿 = 軀幹 + 頸 + 頭 + 耳 + 前腿 + 後腿 + 眼 = 七個形 -->
<svg viewBox="0 0 200 160">
  <g fill="#D8A22C">
    <ellipse cx="100" cy="85" rx="42" ry="20"/>          <!-- 軀幹：一個橢圓，沒有肌肉 -->
    <rect x="70" y="94" width="6" height="52"/><rect x="77" y="93" width="6" height="53"/>
    <rect x="116" y="93" width="6" height="53"/><rect x="123" y="94" width="6" height="52"/>
  </g>
  <g fill="#2C7F87" style="mix-blend-mode:multiply">
    <polygon points="75,78 61,49 50,55 66,83"/>          <!-- 頸：一個四邊形 -->
    <ellipse cx="50" cy="42" rx="21" ry="16"/>           <!-- 頭：一個橢圓，沒有嘴 -->
    <polygon points="47,29 37,2 56,26"/>                 <!-- 耳 -->
  </g>
  <circle cx="46" cy="39" r="2.5" fill="#2A2622"/>       <!-- 眼：只有一隻 -->
</svg>
```

**自我檢查**：把顏色全部改成單一灰色，主體還認得出是什麼嗎？認得出，才算通過。

### 特徵 2｜形與形之間沒有描邊，靠明度差咬合

全站**零 `stroke`**。相鄰的兩塊顏色直接相接，中間不放黑線、不放白線、不放漸層、不放陰影。這是本風格與印度卡車藝術、與版印民俗、與大部分「扁平插畫」最好認的分水嶺——那些風格靠線條把形分開，本風格靠明度差。

```css
/* 圖像層：任何一個 SVG 圖形都不准有 stroke */
svg :is(path,polygon,rect,circle,ellipse){ stroke:none }
/* 版面層：卡片沒有外框、沒有圓角、沒有模糊陰影 */
.card{ border-radius:0; box-shadow:none; border:0 }
```

> 兩個例外：**版面的欄線**（Nelson／Herman Miller 型錄的 1–2px 墨線）是本風格的本體；**星芒與迴力鏢母題**本身就是線構成的（原子時代的星芒是線不是面），它們用 `<line>` 畫，而不是把一個面描起來。禁的是「把圖形描起來」。

### 特徵 3｜第三個顏色由兩塊平塗相疊產生（multiply 疊印）

色票只有四塊。畫面上出現的第五、第六、第七個顏色，一律是兩塊版相疊由瀏覽器算出來的。**狀態色（hover／現用／選中）也照這條規矩**——不要另外寫一個 `--accent-hover`。

```css
:root{ --cream:#EFE4CE; --per:#C8502A; --mus:#D8A22C; --oli:#6D7A3C; --tea:#2C7F87; --ink:#2A2622 }
/* 第二塊版壓在第一塊版上，重疊處自己變深 */
.plate2{ mix-blend-mode:multiply }
/* 套不準是特徵不是瑕疵：hover 時整塊版平移 3px，疊印區跟著變 */
.stage .plate2{ transition:transform .09s linear }
.stage:hover .plate2{ transform:translate(3px,-2px) }
```

芥末 × 土耳其藍 → 深橄欖；芥末 × 柿橘 → 磚紅；土耳其藍 × 橄欖 → 墨綠。這三個顏色**不准直接寫進色票**。

### 特徵 4｜細到不合理的支撐件

家具腳、鳥腿、桌腳、天線、分隔線——一律 **1.5–3px**，相對於主體約 1/12–1/16，永遠比它撐住的東西看起來需要的還細，而且經常外八斜插。這是 Eames／原子時代的視覺簽名。

```css
.leg{ width:3px; background:var(--ink) }           /* 絕不加粗、絕不加圓角 */
hr.rule{ border:0; border-top:2px solid var(--ink) } /* 版面線可以 2px，支撐件不行 */
```

### 特徵 5｜原子星芒與迴力鏢母題，只當版面裝置不當插圖

八芒星（長短交替）、boomerang、amoeba／腎形。它們的職責是**分節與填隙**，永遠出現在段落之間、角落、留白處，**永遠不參與敘事**。一旦拿它們去表達內容，風格就垮成裝飾風。

```html
<svg viewBox="0 0 60 60" width="52" height="52" aria-hidden="true">
  <!-- 八芒：偶數芒長 26、奇數芒長 18 -->
  <g stroke="#2A2622" stroke-width="2.4">
    <line x1="36" y1="30" x2="56" y2="30"/><line x1="24" y1="30" x2="4" y2="30"/>
    <line x1="30" y1="36" x2="30" y2="56"/><line x1="30" y1="24" x2="30" y2="4"/>
    <line x1="34.2" y1="34.2" x2="42.7" y2="42.7"/><line x1="25.8" y1="25.8" x2="17.3" y2="17.3"/>
    <line x1="34.2" y1="25.8" x2="42.7" y2="17.3"/><line x1="25.8" y1="34.2" x2="17.3" y2="42.7"/>
  </g>
  <circle cx="30" cy="30" r="6.4" fill="#C8502A"/>
</svg>
<svg viewBox="0 0 120 46" width="120" height="46" aria-hidden="true">
  <path d="M4 40 C 26 4, 94 4, 116 40 L 100 40 C 82 16, 38 16, 20 40 Z" fill="#6D7A3C"/>
</svg>
```

---

## 三、色彩系統

| 色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 溫暖米白 cream | `#EFE4CE` | 版面留白。**無紙紋、無顆粒、無 noise、無漸層** | 約 34% |
| 柿橘 persimmon | `#C8502A` | 色版一。主要動作、強調段落底 | 約 17% |
| 芥末 mustard | `#D8A22C` | 色版二。hover 底、章節底 | 約 16% |
| 橄欖 olive | `#6D7A3C` | 色版三。次級標籤、小字 | 約 13% |
| 土耳其藍 teal | `#2C7F87` | 色版四。成功狀態、深色章節底 | 約 12% |
| 墨 ink | `#2A2622` | 正文、欄線、支撐件。**不是純黑** | 約 8% |

**硬規則**

1. 四塊彩色**等權**——沒有一塊是「品牌主色」，也沒有一塊是「強調色」。誰當底色由章節決定，不由品牌決定。
2. **不准新增第七個色票。** 需要別的顏色時疊版（特徵 3）。
3. 米白是留白不是材質：不鋪紙紋、不鋪 noise、不加 `filter`。
4. 墨不是 `#000`：純黑在這個色域裡會把畫面壓成海報，中世紀現代是室內的、印在紙上的。
5. 深色章節（`--tea` / `--oli` 底）上的文字用 cream，不用白。

---

## 四、字體系統

**幾何無襯線是本風格的本體**——Futura（1927）在戰後美國廣告界是預設，Paul Rand、Girard、Herman Miller 型錄全用它。網頁替代品：

```css
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap');
body{ font-family:'Jost','Noto Sans TC',system-ui,sans-serif; font-size:16px; line-height:1.62; letter-spacing:.01em }
```

| 角色 | 字級 | 字重 | 字距 | 備註 |
|---|---|---|---|---|
| 巨數字（塊數、價格、統計） | `clamp(38px,11vw,120px)` | 700 | −.02em | `font-variant-numeric:tabular-nums` |
| h1 | `clamp(30px,5.4vw,50px)` | 700 | .005em | 行高 1.18 |
| h2 | `clamp(21px,2.7vw,29px)` | 700 | — | — |
| kicker 眉標 | 11px | 600 | **.30em** | 全大寫、橄欖色。**這是本風格最好認的一條字級規則** |
| 內文 | 16px | 400 | .01em | 行高 1.62 |
| 註記 | 11.5px | 400 | — | `#6b6558` |

**規則**：只用兩個字重（400／700）＋一個 600 專給 kicker。中間字重（500）只在需要區別中日文與拉丁時使用。不用襯線、不用手寫體、不用 Futura 的斜體（Futura Oblique 是幾何斜切，網頁上做不出來，寧可不做）。

---

## 五、版面與網格

- **12 欄模矩網格**，gap 22px，最大寬 1140px。
- 分節用 **2px 墨線**（不是 1px，不是虛線）；表格列間用 1px。
- **非對稱**：主欄 7–8 欄、次欄 4–5 欄；不要 6/6。
- **滿版色域**：章節底色以 `margin:0 -26px; padding:38px 26px` 出血到視窗邊，讓色塊被畫布切斷。
- **卡片內的基線必須跨卡對齊**——這是 Nelson 型錄的規格，用 `subgrid` 實作：

```css
.cards{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); border-top:2px solid var(--ink) }
.card{ grid-row:span 4; display:grid; grid-template-rows:subgrid; row-gap:0;
       border-left:1px solid var(--ink); border-bottom:1px solid var(--ink) }
@supports not (grid-template-rows:subgrid){ .card{ grid-row:auto; display:block } }
```

- **零圓角、零模糊陰影**。需要層次時用實心位移色塊或換一塊色域，不要 `box-shadow`。
- 留白率約 30–40%：比普普少、比極簡多。畫面不填滿，但也不空曠。

---

## 六、元件配方

**導覽（車細 turned-down）**：四頁＝四段同一根木料。現用頁那一段被車細成 40% 直徑並留兩道車刀環——**現用態的語意是「它比別人少」**。

```css
nav.rail a .stock i{ width:36px; background:var(--mus); transition:width .22s cubic-bezier(.2,.8,.2,1) }
nav.rail a[aria-current] .stock i{ width:15px; background:var(--oli) }
nav.rail a[aria-current] .stock::before,
nav.rail a[aria-current] .stock::after{ content:""; position:absolute; width:30px; height:3px; background:var(--ink) }
```

**按鈕**：實心柿橘、無圓角、無陰影、字距 .1em、hover 換成土耳其藍（換版，不是變亮）。

```css
.btn{ background:var(--per); color:var(--cream); border:0; border-radius:0; padding:11px 20px;
      font:600 14px/1 'Jost',sans-serif; letter-spacing:.1em; cursor:pointer }
.btn:hover{ background:var(--tea) }
```

**表格**：表頭 11px/.14em/橄欖色/2px 下框線；列 1px 下框線；`tr:hover td{background:var(--mus)}`——hover 是換一塊版蓋上去，不是加背景色。

**連結**：`border-bottom:2px solid var(--per)`；hover 時整行底色換成芥末（同樣是換版）。

**footer**：2px 上框線、無底色、資訊三欄不對齊置中。

---

## 七、動效規則（四種，缺一不可）

| 類 | 名稱 | 觸發 | 時長／曲線 | 降級 |
|---|---|---|---|---|
| ambient | **車床料在轉** | 無需輸入，持續 | `repeating-linear-gradient` 背景位移 4.4s linear infinite | `animation:none`，停在定格條紋 |
| input | **預抽 peek ＋ 套印偏移 slip** | hover／focus | 位移 16% 卸下方向，90–180ms；第二塊版同時 `translate(3px,-2px)` 90ms linear | 瞬時到位，狀態語意不變 |
| transition | **開盒 lid** | 進頁 | `clip-path: inset(0 50% 0 50%) → inset(0)`，420ms `cubic-bezier(.22,.86,.3,1)`，逐節 delay 40ms | 不播，直接是最終畫面 |
| signature | **卸形歸位 shape-shed** | 拆件 | 該塊沿自己固定的軸線滑出 180ms `cubic-bezier(.2,.85,.25,1)`；同幀剩下的每一塊平移到新重心 340ms `cubic-bezier(.2,.8,.2,1)` | 兩段皆瞬時，塊數與判定完全一致 |

```css
.pc{ transition:transform .18s cubic-bezier(.2,.85,.25,1),opacity .16s linear;
     transform-box:view-box; transform-origin:50% 50% }
.pc.off{ transform:translate(var(--sx),var(--sy)); opacity:0; pointer-events:none }
.pc.peek{ transform:translate(calc(var(--sx)*.16),calc(var(--sy)*.16)) }
.fitg{ transition:transform .34s cubic-bezier(.2,.8,.2,1); transform-box:view-box; transform-origin:0 0 }
@media (prefers-reduced-motion:reduce){ *{ transition-duration:0s !important } .lathe{animation:none} main>section{animation:none} }
```

**卸下方向不是隨機的**：每一塊有一個固定的 `--sx/--sy`，方向等於它在機台上被取下來的方向（旋轉體沿中軸、板料沿切線、腿往下）。同一塊每次都往同一邊走。

---

## 八、插畫與圖像風格（minimal-realism 幾何化約構成）

- **零外部圖片、零照片、零描邊、零漸層、零手繪筆觸、零紙紋濾鏡。**
- 所有圖像由同一支引擎輸出：一組造形參數 → 一組原語 → SVG。同一套語彙必須做得出整個產品線，不是一張一張畫。
- 每一個主體 ≤7 個形；每一個形都要能回答「它承載哪一項辨識條件」。
- **不准把兩個同色的形疊在一起**——它們會合成一塊，看起來像少了一個零件。相鄰的形要不同版，要不就分開。
- 需要「圖示」的地方放一個原語；需要「裝飾」的地方放星芒或迴力鏢；需要「資料」的地方放實心色塊，不要放折線圖。

---

## 九、Logo 與 Favicon

**配方**：一個圓（車床）＋一個三角（帶鋸）以 multiply 相疊，下面兩根細腿。三個原語，第三個顏色由疊印產生，logo 自己就是特徵 1、3、4 的證明。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <circle cx="19" cy="19" r="14" fill="#D8A22C"/>
  <polygon points="30,5 45,32 16,32" fill="#2C7F87" style="mix-blend-mode:multiply"/>
  <rect x="21" y="31" width="4.4" height="14" fill="#C8502A"/>
  <rect x="30" y="31" width="4.4" height="14" fill="#C8502A"/>
</svg>
```

Favicon 用同一組形，寫成 inline data URI（`<link rel="icon" href="data:image/svg+xml,...">`），底色鋪 cream——16px 下透明底會讓疊印失效。

---

## 十、Do & Don't

**Do**
- 先寫下「這個東西之所以是這個東西」的判準清單，再開始畫。
- 顏色不夠用時疊版，不要開新色票。
- 讓色域被畫布邊緣切斷。
- 支撐件細到你覺得不安為止。
- kicker 用 .30em 字距——這一條比任何配色都更快讓人認出風格。

**Don't**
- ❌ 不要描邊。加了 2px 黑框就變成印度卡車藝術或版印民俗。
- ❌ 不要粉彩化。芥末變鵝黃、柿橘變珊瑚粉，就掉進兒童繪本風。
- ❌ 不要高飽和螢光。那是普普與孟菲斯。
- ❌ 不要圓角卡片、模糊陰影、玻璃擬態、紫藍漸層 hero。
- ❌ 不要 emoji 當 icon、不要 Lorem ipsum、不要「EST. 19xx」徽章、不要置中三卡片。
- ❌ 不要用襯線字做標題。中世紀現代的標題是幾何無襯線，例外只有 Girard 的手寫招牌字，而那是招牌不是版面。
- ❌ 不要加紙紋、噪點、feTurbulence 手抖濾鏡。那是里索與迷幻海報的語彙，會把平塗糊掉。
- ❌ 不要把星芒與迴力鏢拿去表達內容。

---

## 十一、頁面骨架範例

```html
<body>
<div class="wrap"><header class="top">
  <a class="brand" href="index.html"><span><!-- logo svg --></span>
    <span class="bt">品牌名<small>BRAND・地點</small></span></a>
  <nav class="rail">
    <a href="a.html" aria-current="page"><span class="stock"><i></i></span><b>頁一</b><em>ONE</em></a>
    <a href="b.html"><span class="stock"><i></i></span><b>頁二</b><em>TWO</em></a>
  </nav>
</header></div>

<main>
  <section>
    <div class="wrap">
      <div class="kicker">眉標・.30em 字距</div>
      <h1>一句從產業本身長出來的話</h1>
      <p style="max-width:66ch">內文最寬 66 個字。</p>
    </div>
  </section>

  <section class="field">            <!-- 滿版芥末色域，出血到視窗邊 -->
    <div class="wrap">
      <h2>章節</h2>
      <div class="cards">            <!-- subgrid：卡內四條基線跨卡對齊 -->
        <article class="card">
          <div class="ttl"><b>品名</b><span>NAME</span></div>
          <div class="art"><!-- 圖：≤7 個原語 --></div>
          <div class="spec">規格</div>
          <div class="price"><span>說明</span><b class="num">NT$96</b></div>
        </article>
      </div>
    </div>
  </section>
</main>

<footer><div class="wrap">…</div></footer>
</body>
```

```css
.wrap{max-width:1140px;margin:0 auto;padding:0 26px}
.field{background:var(--mus);margin:0 -26px;padding:38px 26px}
.kicker{font-size:11px;letter-spacing:.30em;font-weight:600;color:var(--oli);text-transform:uppercase}
.num{font-variant-numeric:tabular-nums}
@media(max-width:560px){.wrap{padding:0 16px}.field{margin:0 -16px;padding:28px 16px}}
```

---

## 十二、技術實作與相容性

本站的三項核心技術，各自承載一個不可省略的特徵。支援度於 **2026-08-12** 查證。

### 1. `mix-blend-mode: multiply`（A 渲染層）— 承載特徵 3

第三個顏色不是選出來的，是兩塊平塗版相疊由瀏覽器算出來的；套印偏移（hover 時第二塊版位移 3px）也由它承擔。線性漸層或半透明疊色都做不到——半透明疊出來的是「摻了白的顏色」，油墨疊出來的不是。

- **支援現況**：MDN 標示 **Baseline Widely available**，自 2020 年 1 月起跨瀏覽器可用；Chrome 41+／Edge 79+／Firefox 32+／Safari 7.1+。（查證來源：MDN《mix-blend-mode》、caniuse `mdn-css_properties_mix-blend-mode`）
- **已知限制**：Safari 對非分離式混色模式（hue／saturation／color／luminosity）有色度差異；本站只用 `multiply`（分離式），不受影響。
- **Fallback**：不支援時第二塊版直接蓋在第一塊上，圖形結構、塊數、判定與所有文字完全不變，只是少了那個由疊印生出的第三色。**資訊零損失。**
- **實作注意**：`mix-blend-mode` 下在群組上時，群組是被隔離的——**同一個群組裡的兄弟元素彼此不會相乘**，只有群組整體對背景相乘。所以要讓兩塊版互相疊色，必須把它們放進兩個不同的群組。（本站第一版就是栽在這裡：頭與頸同版同色疊在一起，合成一塊，看起來整隻動物沒有頭。）

### 2. `CSS Grid subgrid`（C 版面與樣式層）— 承載特徵 4／版面模矩

型錄卡片內的四條基線（品名列、圖、規格、價目）必須跨卡對齊，而每張卡的內容長度不同。這件事 flex 做不到、`grid-auto-rows` 做不到、媒體查詢更做不到——只有讓卡片把外層網格的列接管過來才行。

- **支援現況**：**Baseline Widely available，2026-03-15 起**；Chrome 117+／Edge 117+／Firefox 71+／Safari 16+／Opera 103+／Samsung Internet 24+，全球覆蓋約 97%。（查證來源：caniuse `css-subgrid`、web-platform-dx features explorer、web.dev 2026-03 Baseline digest）
- **Fallback**：`@supports not (grid-template-rows:subgrid)` 時卡片退回 `display:block`，四段內容仍依序完整呈現，只是跨卡基線不對齊。**資訊零損失。**

### 3. 位元遮罩窮舉的約束求解（E 資料與生成層）— 承載核心功能的判定

十四條辨識判準寫成 14 位元遮罩，九種動物各一個遮罩。判定規則只有一條：**剩下的判準集合 S，若存在另一種動物的遮罩 ⊇ S，它就不再唯一。** 「理論最少塊數」是把每一種可拆組合窮舉一遍算出來的（每種動物 2⁴–2⁶ 個子集），沒有隱藏真值、沒有評分模型，使用者可以拿頁面上印的那張表自己驗算。

- 純 JavaScript 位元運算，無瀏覽器 API 依賴，故無相容性問題。
- **效能實測**：九種動物全部窮舉一遍 **4.2 ms**（Node 22 單執行緒）；頁面上是建置階段就算完寫進靜態表格，執行階段只做單次遮罩比對（<0.01 ms）。
- 判定結果在建置階段也寫進 `index.html` 與 `catalog.html` 的靜態表格，**關掉 JavaScript 仍讀得到全部九件產品的原塊數、理論最少塊數、合法解數與那一組木塊**。

### 效能預算實測

| 頁 | 大小（含 inline 全部 CSS/JS/SVG） | 首屏 JS |
|---|---|---|
| `index.html` | 35.0 KB | 0（僅一段 localStorage 讀取） |
| `catalog.html` | 28.1 KB | 0 |
| `bench.html` | 59.6 KB | 初始化 `draw()` < 3 ms |
| `works.html` | 16.9 KB | 0 |

單頁上限 350 KB，最大頁 59.6 KB。外部資源只有 Google Fonts（Jost + Noto Sans TC），**零外部圖片、零音檔**。動畫只改 `transform` 與 `opacity`，不觸發 layout；每次拆件只做一次 `style.transform` 寫入，無 `getBoundingClientRect`、無 layout thrashing。

---

## 十三、可用性保底

- 四頁的全部資訊（規格表、判準表、年表、地址電話）都是可選取的一般 HTML 文字。
- 打樣台的每一塊木頭同時是 `tabindex=0` 的 `role="button"`，Enter／Space 可拆；右側清單提供完全等價的第二條操作路徑。
- `<noscript>` 明講打樣台需要 JavaScript，並指出同樣的資料在另外兩頁是完整的靜態表格。
- 深色色域上的文字對比 ≥ 4.5:1；正文（`#2A2622` on `#EFE4CE`）對比約 11:1。
