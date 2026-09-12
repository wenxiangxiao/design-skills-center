---
name: beardsley-line-block
description: Aubrey Beardsley's 1890s pen-and-ink decadence rebuilt for the browser — pure black against pure white with no grey anywhere, one enormous ink mass answered by an equally enormous void, uniform hairline contours, imagery that crosses the frame rule, and texture made only by swapping figure and ground.
---

# 比亞茲萊黑白裝飾　Beardsley Black-and-White（線塊版 line block）

> 本規格書描述的是一個**既有的、可查證的設計流派**：一八九〇年代英國插畫家
> Aubrey Beardsley（1872–1898）在《Salome》《The Yellow Book》《The Savoy》上
> 定型的鋼筆黑白裝飾語言，以及它賴以成立的製版條件——線塊版（line block／
> photo-zincography）。這種製版只能印「有墨」與「沒墨」兩種狀態，印不出灰。
> Beardsley 不是忍受這個限制，他把它當成畫法本身。
>
> 本規格書不綁定產業。範例站是一間假面工坊，但同一套語言可以用在出版社、
> 劇場、香水、律師事務所或任何需要「銳利、冷、極端不對稱」的品牌上。

---

## 一、設計哲學

### 1.1 這個流派在解一個什麼問題

一八九三年，Beardsley 為 J. M. Dent 的《Le Morte d'Arthur》與 John Lane 的
《Salome》作畫時，印刷廠用的是線塊版：原稿被相機翻拍成高反差負片、曬到鋅版上、
腐蝕出凸版。這種版**沒有中間調**。當時多數插畫家的對策是畫滿交叉排線（cross-
hatching）去「假裝」灰階；Beardsley 反過來——他把畫面拆成大塊的實心黑與大塊的
空白，讓限制變成風格的骨架。

因此這個流派的第一性原理是一句話：

> **畫面上的每一個點只有兩種身分：墨，或者紙。中間什麼都沒有。**

一旦接受這件事，其餘四個特徵就是它的必然後果：
沒有灰 → 明暗做不出來 → 只能靠**面積**（大黑對大白）；
沒有灰 → 邊界不能靠漸層 → 只能靠**等寬的線**；
沒有灰 → 材質不能靠明度 → 只能靠**圖地對調**；
畫面被壓成純平面 → 空間感只剩**構圖**，於是留白與越框成為主要手段。

### 1.2 給 AI 的一句話摘要

做這個風格時，你不是在「選一個黑白配色」。你是在接受一條規則：
**任何會產生中間調的手法都不准用**——沒有 opacity、沒有 gradient、沒有
box-shadow、沒有 blur、沒有半透明疊層、沒有網點、沒有 hover 淡化。
每次你想用透明度解決一個問題，請改用「這塊要不要整塊翻成黑」來解決它。

### 1.3 三個常見的誤解

| 誤解 | 更正 |
|---|---|
| 「黑白風＝極簡」 | 相反。這個流派是**裝飾性**的：孔雀羽、玫瑰、燭台、蔓草，母題密度可以很高，只是它們全部是實心色塊與髮絲線做的。 |
| 「線要有筆意」 | 不要。Beardsley 的線是等寬的、一次畫成的、不修飾的。加了粗細變化就滑向新藝術或水墨。 |
| 「留白＝乾淨」 | 留白在這裡是**構圖元素**，不是呼吸。它必須大到不合理（≥50%），而且要被推到畫面的一側，不是均勻分佈的 padding。 |

---

## 二、本風格的 5 個不可省略特徵

> 判準：**拿掉它，做出來的就不是這個流派了。**每一項都附可直接複製的片段。

### 特徵 1｜紙上不准有灰（no grey, anywhere）

只有 `#0A0A0A` 與 `#FFFFFF` 兩個值。禁止 opacity、gradient、box-shadow、
filter: blur、半透明 border、CSS 的 `color-mix()`、以及任何會被抗鋸齒糊成灰的
裝飾層。**灰是這個流派的失敗狀態，不是它的中間值。**

如果你的畫面裡有一個必須是連續的東西（例如一個生成的背景場），不要把它畫成灰，
把它**硬砍成兩階**：

```html
<!-- 這是本流派唯一允許「連續」存在的方式：連續的東西進去，兩階的東西出來 -->
<svg viewBox="0 0 600 200" aria-hidden="true">
  <defs>
    <filter id="hardcut" color-interpolation-filters="sRGB"
            x="0" y="0" width="100%" height="100%">
      <!-- 先砍 alpha：抗鋸齒與半透明疊層在這裡被消滅 -->
      <feComponentTransfer><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>
      <!-- 再砍色：任何中間調被推到全黑或全白 -->
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0 1"/>
        <feFuncG type="discrete" tableValues="0 1"/>
        <feFuncB type="discrete" tableValues="0 1"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <!-- 兩片各自太淡、根本不算墨的雲；只有互相疊到的地方才過門檻 -->
  <g filter="url(#hardcut)">
    <ellipse cx="180" cy="100" rx="170" ry="72" fill="#0A0A0A" fill-opacity=".34"/>
    <ellipse cx="380" cy="82"  rx="150" ry="60" fill="#0A0A0A" fill-opacity=".34"/>
  </g>
</svg>
```

`tableValues="0 1"` 的意思是把 [0,1) 分成兩段：<0.5 → 0，≥0.5 → 1。
單層 0.34 的 alpha 落在 0 那一段（消失），兩層疊起來 1−0.66² = 0.564 落在 1 那一段
（變成純黑）。**畫面上因此只有兩個值，即使它底下的資料是連續的。**

```css
/* 全域鐵律：把會產生灰的東西一次關掉 */
*{ text-shadow:none; box-shadow:none; }
:root{ --ink:#0A0A0A; --paper:#FFFFFF; }
/* 禁止用 opacity 表示狀態，狀態一律用整塊反黑表示 */
.state-off{ opacity:1; }          /* ← 不要寫 .5 */
.state-on { background:var(--ink); color:var(--paper); }
```

### 特徵 2｜一塊大墨，對著一片大白（one dominant mass, one enormous void）

黑的面積要落在整幅的 **22%–38%**，而且必須**集中在一塊或少數幾塊**：
同樣三成的墨，一塊大的和十塊碎的是兩件完全不同的東西——後者遠看是一片灰，
也就是回到了特徵 1 的失敗狀態。

可驗算的量（範例站直接把它做成驗收條件）：

* `ratio = 黑面積 / 總面積`，須 0.22 ≤ ratio ≤ 0.38
* `dominance = 最大一塊黑 / 全部黑`，一等品 ≥ 0.34
* 留白 ≥ 50%，且留白必須**偏在一側**，不是四周均勻的 padding

```css
/* 版面層級的落實：主體推到一側，另一側是刻意的空 */
.stage{
  display:grid;
  grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr); /* 絕不 1fr 1fr */
  gap:60px; align-items:start;                            /* 絕不 center */
}
.void{ height:clamp(70px,13vh,150px) }  /* 段落之間的空，是內容的一部分 */
```

```html
<!-- 一塊「不講理」的黑：它的外形本身就是圖，不需要任何裝飾 -->
<svg viewBox="0 0 300 420" aria-hidden="true">
  <path d="M150 8C64 8 20 66 20 150c0 118 66 262 130 262s130-144 130-262C280 66 236 8 150 8z"
        fill="#0A0A0A"/>
</svg>
```

### 特徵 3｜線只有一種粗細（uniform hairline, 1.3px, no modulation）

全站所有的線——分隔線、表格線、外框、圖裡的輪廓——都是同一個值。
本規格書用 **1.3px**（小於 1px 在多數螢幕會被抗鋸齒糊成灰，違反特徵 1；
大於 2px 會變成野獸派的粗黑框）。

線與墨塊之間**沒有過渡**：線碰到黑，就直接被黑吃掉，不加白邊、不加描邊。

```css
:root{ --r:1.3px }
hr.rule{ border:0; border-top:var(--r) solid var(--ink); margin:0 }
th,td{ border-top:var(--r) solid var(--ink) }
.box{ border:var(--r) solid var(--ink) }
a{ border-bottom:var(--r) solid var(--ink) }   /* 連結＝一條同粗的線，不是顏色 */
```

```html
<!-- SVG 裡也一樣：stroke-width 全站同一個數，且 fill 一律 none 或純色 -->
<path d="…" fill="none" stroke="#0A0A0A" stroke-width="1.3"/>
<!-- 禁止：stroke-linecap="round"（會產生圓潤的筆意）、可變 stroke-width、
     stroke-opacity、以及任何 filter 造成的柔邊 -->
```

**進階（本範例站的核心做法）**：不要把線當成「畫上去的東西」，
把它當成**兩塊區域意見不合時剩下來的東西**。同色相鄰時線就該消失：

```js
// 一條邊只有在「兩側都是白」時才存在。黑碰黑，那條線本來就沒有用。
const visible = !isInk(left) && !isInk(right);
edge.setAttribute('stroke-dasharray', visible ? '50 0 50' : '0 100 0'); // pathLength="100"
```

### 特徵 4｜圖要越過框線（imagery overruns the rule）

每一頁有一條細框（`--r`）圍住版面。**字守框，圖不守。**
羽尖、髮梢、藤鬚、蔓草必須有東西跨出去，框才有意義；同時構圖絕不置中。

```css
.frame{ position:fixed; inset:15px; border:var(--r) solid var(--ink);
        pointer-events:none; z-index:40 }
/* 允許越框的元素：不要給祖先 overflow:hidden */
.orn{ position:relative; overflow:visible }
.orn svg{ position:absolute; left:-46px; overflow:visible }  /* 負值伸出框外 */
```

```html
<!-- 孔雀羽眼母題：本流派最常見的裝飾，且天生適合當「越框」的那個東西 -->
<svg viewBox="0 0 190 114" aria-hidden="true" style="overflow:visible">
  <ellipse cx="120" cy="57" rx="52" ry="42" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="1.3"/>
  <ellipse cx="120" cy="57" rx="34" ry="27" fill="#0A0A0A"/>
  <ellipse cx="120" cy="57" rx="15" ry="12" fill="#FFFFFF"/>
  <path d="M120 57 C 88 46 46 40 -30 44" fill="none" stroke="#0A0A0A" stroke-width="1.3"/>
  <path d="M120 57 C 90 62 48 66 -26 62" fill="none" stroke="#0A0A0A" stroke-width="1.3"/>
</svg>
```

### 特徵 5｜材質只用一招：圖地對調（texture by figure–ground reversal only）

沒有灰就沒有明暗，要表現「這塊布跟那塊布不一樣」，只剩一個辦法：
**同一組點，一次是白地黑點，一次是黑地白點。**
點的直徑與間距一格也不准動，變的只有誰是地。這是 Beardsley 表現裙擺、
羽毛、地毯的唯一手段（見〈The Peacock Skirt〉〈The Black Cape〉）。

```html
<svg class="lat" viewBox="0 0 600 200">
  <rect class="g" width="600" height="200"/>
  <g class="dots">
    <!-- 等徑、等距，r 與 step 全站固定 -->
    <circle class="d" cx="16" cy="16" r="4.6"/><!-- …重複 -->
  </g>
</svg>
```

```css
.lat .g{ fill:#0A0A0A }               /* 地：黑 */
.lat .d{ fill:#FFFFFF }               /* 點：白 */
.lat.inv .g{ fill:#FFFFFF; stroke:#0A0A0A; stroke-width:1.3 }  /* 對調 */
.lat.inv .d{ fill:#0A0A0A }
/* 半調網點（大小隨明度變）是另一個流派的語言，這裡明文禁止 */
```

---

## 三、色彩系統

全站只有三個色票，且第三個嚴格限量。

| 色票 | Hex | 用途 | 面積 |
|---|---|---|---|
| 紙 paper | `#FFFFFF` | 底、留白、白區、反白文字 | 約 66% |
| 墨 ink | `#0A0A0A` | 文字、線、實心黑塊 | 約 32% |
| 鉻黃 chrome | `#E8C300` | **只給「可動作」與「現用態」**：hover 預覽、focus ring、現用頁記號、退件提示的左邊條、主要按鈕的底線 | **≤ 2%** |

規則：

1. 紙必須是純白 `#FFFFFF`，**不加米白、不加紙紋、不加顆粒**。這個流派的紙面是
   平滑的線塊版印刷紙，任何材質模擬都會把它推向里索或活版。
2. 墨用 `#0A0A0A` 而非 `#000000`：純黑在大面積下與螢幕邊界過於同化，`#0A0A0A`
   在感知上仍是純黑但保留一絲版面深度。**這是全站唯一允許的偏離。**
3. 鉻黃的出處是《The Yellow Book》（1894，Beardsley 任美術編輯）的封面黃。
   它**不是品牌色，是狀態色**——絕不用於標題、插圖、大面積色塊。
4. 沒有第四個顏色。連結不變色（用底線），錯誤不變紅（用鉻黃左邊條加文字），
   停用態不變灰（用 `border-style:dotted`）。

```css
:root{ --ink:#0A0A0A; --paper:#FFFFFF; --y:#E8C300; --r:1.3px }
::selection{ background:var(--ink); color:var(--paper) }   /* 選取＝反黑，不是淡藍 */
a:hover{ background:var(--ink); color:var(--paper) }       /* hover＝整塊反黑 */
button[disabled]{ opacity:1; border-style:dotted }          /* 停用＝虛線，不是變淡 */
```

---

## 四、字體系統

Beardsley 的年代，內文用的是 old-style／didone 系的金屬活字，標題常是手繪。
網頁化的對應：

| 角色 | 字體 | 字重 | 用法 |
|---|---|---|---|
| 拉丁標題／編號 | **Playfair Display** | 900 / 400 italic | didone 的極端筆畫對比，是這個年代的聲音 |
| 中文標題 | **Noto Serif TC** | 900 | 與 Playfair 的粗細對比匹配 |
| 內文 | **Noto Serif TC** | 400 | 行高 1.95，寬鬆到接近書頁 |
| 標籤／小標 | **Playfair Display italic** | 400 | 全大寫、字距 `.34em`、10.5px |

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Noto+Serif+TC:wght@400;700;900&display=swap');

body{ font-family:"Noto Serif TC",serif; font-size:16.5px; line-height:1.95 }
.dsp{ font-family:"Playfair Display","Noto Serif TC",serif; font-weight:900;
      line-height:.94; letter-spacing:-.005em }
h1{ font-size:clamp(40px,7.4vw,96px) }
h2{ font-weight:900; font-size:clamp(25px,3.5vw,42px); line-height:1.2 }
.lab{ font-family:"Playfair Display",serif; font-style:italic; font-weight:400;
      letter-spacing:.34em; text-transform:uppercase; font-size:10.5px }
.num{ font-family:"Playfair Display",serif; font-variant-numeric:tabular-nums;
      letter-spacing:.06em }
p{ max-width:60ch }        /* 行長必須短。長行會把留白吃掉 */
.lede{ max-width:44ch; font-size:clamp(17px,1.5vw,20px) }
```

**禁止**：無襯線字（會變成瑞士國際主義）、等寬字（會變成工程製圖）、
字重 500–800 的中間值（這個流派只有極細與極粗兩種聲音）。

---

## 五、版面與網格

* **主軸永遠不對稱**：`.82fr / 1.18fr` 或 `1fr / 1.32fr`，絕不 `1fr 1fr`。
* **align-items 一律 start**，絕不 center。垂直置中會把畫面拉回「範本感」。
* **留白是段落**：段與段之間用 `clamp(70px,13vh,150px)` 的空，不是 32px 的 margin。
* **一切直角**：`border-radius: 0` 全站，沒有例外。
* **框在最外層**：`.frame{position:fixed;inset:15px}`，內容在框內，裝飾越框而出。
* **導覽貼在框上**：本範例站把四頁做成右緣一列 58×58 的方格，壓在框線上；
  現用頁那一格的裝飾**伸出格子外**（見特徵 4）。這是「越框」的語意化用法。

```css
.wrap{ max-width:1200px; margin:0 auto; padding:0 54px }
@media(max-width:900px){ .wrap{ padding:0 26px } }
.cols{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.32fr);
       gap:56px; align-items:start }
@media(max-width:900px){ .cols{ grid-template-columns:1fr; gap:34px } }
```

---

## 六、元件配方

```css
/* 導覽：方格 + 越框裝飾。現用態不是變色，是「有東西伸出來」 */
nav.rail{ position:fixed; right:15px; top:50%; transform:translateY(-50%);
          display:flex; flex-direction:column; z-index:60 }
nav.rail a{ width:58px; height:58px; border:var(--r) solid var(--ink);
            border-bottom:0; background:var(--paper); overflow:visible }
nav.rail a:last-child{ border-bottom:var(--r) solid var(--ink) }
nav.rail a .ov{ opacity:0 }                       /* 越框的那一筆 */
nav.rail a[aria-current="page"] .ov{ opacity:1 }

/* 按鈕：白底黑框，hover 整塊反黑。沒有圓角、沒有陰影、沒有 transform 位移 */
button{ font-family:"Noto Serif TC",serif; font-size:14.5px; font-weight:700;
        background:var(--paper); color:var(--ink);
        border:var(--r) solid var(--ink); padding:9px 18px; border-radius:0 }
button:hover{ background:var(--ink); color:var(--paper) }
button[disabled]{ border-style:dotted }
.btn-y{ border-bottom-width:4px; border-bottom-color:var(--y) }  /* 主要動作 */

/* 表單：只有下底線，沒有框、沒有底色、沒有圓角 */
input,select,textarea{ border:0; border-bottom:var(--r) solid var(--ink);
  background:var(--paper); border-radius:0; -webkit-appearance:none; appearance:none;
  padding:7px 2px; width:100% }

/* 卡片：不存在。用表格與規則線代替。真的需要一個框時： */
.box{ border:var(--r) solid var(--ink); padding:20px 22px }   /* 就這樣，沒了 */

/* 表格是本流派的主力元件（比卡片重要得多） */
table{ border-collapse:collapse; width:100%; font-size:14px }
th,td{ border-top:var(--r) solid var(--ink); padding:9px 12px 9px 0; text-align:left }
th{ font-family:"Playfair Display",serif; font-style:italic; font-weight:400;
    letter-spacing:.2em; text-transform:uppercase; font-size:10.5px }

/* 量尺／進度：實心黑條 + 鉻黃刻度，沒有圓角、沒有漸層 */
.gauge{ position:relative; height:26px; border:var(--r) solid var(--ink) }
.gauge i{ position:absolute; inset:0 auto 0 0; background:var(--ink); width:0 }
.gauge b{ position:absolute; top:-7px; bottom:-7px; width:2.6px; background:var(--y) }

/* footer：一條規則線 + 兩欄文字。不要 logo 牆、不要社群圖示 */
footer{ border-top:var(--r) solid var(--ink); padding:30px 0 66px }
```

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可；四種都要 `prefers-reduced-motion` 降級
且降級後資訊零損失。**這個流派的動效紀律是：不准淡入。**
opacity 的中間值就是灰，而這張紙上不准有灰——所有轉場一律是硬邊的位移、遮罩或
瞬切。

| 類型 | 名稱 | 觸發 | 值 |
|---|---|---|---|
| ambient 環境 | 墨潮 ink-tide | 無（持續） | 兩片 `fill-opacity:.34` 的墨雲各自 61s／47s 線性漂移，整組通過硬砍濾鏡；畫面上永遠只有兩個值，動的是黑塊的**輪廓** |
| input 輸入 | 落墨預覽 | hover／focus | 區域填 `--y`，`transition:fill 80ms linear`；同時會消失的線先轉成鉻黃示警（延遲 <100ms） |
| transition 轉場 | 上版 plate-wipe | 進頁 | `clip-path:inset(0 100% 0 0)` → `inset(0)`，`.52s steps(9,end)`；**steps 是必要的**，連續補間會產生一條柔邊 |
| signature 簽名 | 線的生滅 line-birth／death | 落墨當下 | 邊的 `stroke-dasharray` 由 `50 0 50` 補到 `0 100 0`（220ms `cubic-bezier(.3,.86,.34,1)`）——線的兩端不動，缺口從**中央往外**長；反向則從兩端長回中央 |

```css
main{ animation:wipe .52s steps(9,end) both }
@keyframes wipe{ from{ clip-path:inset(0 100% 0 0) } to{ clip-path:inset(0 0 0 0) } }

.plate .c{ transition:fill 80ms linear }
.plate .c.hov{ fill:var(--y) }
.plate .e{ transition:stroke-dasharray 220ms cubic-bezier(.3,.86,.34,1) }
.plate .e.warn{ stroke:var(--y) }

.tide .fld { animation:drift  61s linear infinite }
.tide .fld2{ animation:drift2 47s linear infinite }
@keyframes drift { 0%,100%{ transform:translateX(-14%) } 50%{ transform:translateX(14%) } }
@keyframes drift2{ 0%,100%{ transform:translateX(11%) scaleY(1) }
                   50%{ transform:translateX(-13%) scaleY(1.34) } }

@media(prefers-reduced-motion:reduce){
  main{ animation:none }                      /* 直接是最終畫面 */
  .tide .fld,.tide .fld2{ animation:none }    /* 停在定格，仍是完整的兩階圖形 */
  .plate .e,.plate .c{ transition:none }      /* 線瞬間生滅，狀態語意完全一致 */
}
```

**明文禁令**（寫進本風格，不只是本站）：
禁用淡入式滾動揭示、視差、數字滾動、跑馬燈、按壓硬陰影位移、
`stroke-dashoffset` 描繪動畫（那是「畫線」，本流派的線是**被留下來的**不是被畫的）、
以及任何 `opacity` 在 0 與 1 之間停留超過一幀的動畫。

---

## 八、插畫與圖像風格

技法名稱：**region-assignment ink-mass　分區墨塊構成**。

全站零外部圖片。所有圖像由三種原語組成，缺一不可：

1. **分區實心墨塊**：一個被切成 N 塊的閉合平面，每塊只有兩種填色。塊與塊的邊界
   必須**精確共用**（同一組取樣點），否則相鄰兩塊之間會露出一條白縫——那條縫是灰
   的另一種形式。
2. **等寬髮絲線**：1.3px，**只出現在「兩側都是素」的邊界上**。
3. **反轉點陣**：等徑等距的圓，靠圖地對調表現不同材質（特徵 5）。

裝飾母題取自 Beardsley 的常用詞彙：孔雀羽眼（同心橢圓＋實心心＋兩條羽枝）、
玫瑰（螺旋閉合路徑）、燭與燭台、卵形、蔓草。母題全部由上述三種原語組成。

判準：**拿掉全部文字，仍讀得出哪一塊是墨、哪一條線是因為兩邊都素才存在的。**

```js
// 平面細分的最小可行做法：用同一個參數曲面取樣，共用邊自然精確
const S = (u,v,P) => [ CX + (u-.5)*2*halfWidth(v,P),
                       YTOP + H*v + bow(v,P)*Math.sin(Math.PI*u) ];
// 每一格的四條邊都用 S 取樣 → 相鄰格共用的邊是同一串點 → 零白縫
```

**禁止**：feTurbulence 手抖濾鏡（迷幻海報的語彙）、半調網點（另一個流派）、
交叉排線陰影、寫實描繪、細線幾何線框小屋、任何 emoji 或 icon font。

---

## 九、Logo 與 Favicon 設計指南

* Logo ＝ **一枚實心黑白標記 ＋ 用 stroke 建構的字母骨架**。字母不要依賴字型檔：
  用固定 `stroke-width` 的路徑畫出來，這樣它與特徵 3 是同一套規則。
* 標記本身要示範特徵 5：同一個形狀，一半黑一半白（左右分割），左眼是白的挖空，
  右眼是白底黑線——**一個標記裡就把圖地對調演一遍**。
* Favicon 用 inline SVG data URI，只有黑白，不用第三色。16px 下要能讀出來，
  所以只保留剪影與一枚眼睛。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23fff'/%3E%3Cpath d='M16 2C9 2 5 7 5 14c0 8 5 16 11 16s11-8 11-16C27 7 23 2 16 2z' fill='%230A0A0A'/%3E%3Cpath d='M9 13c1.6-2.4 5-2.4 6.6 0-1.6 2.4-5 2.4-6.6 0z' fill='%23fff'/%3E%3Ccircle cx='12.3' cy='13' r='1.9' fill='%230A0A0A'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

* 讓一塊黑大到讓人不舒服，然後把同樣大的空白放在它旁邊。
* 把狀態全部改寫成「整塊反黑」或「有東西伸出框外」。
* 用表格與規則線組織資訊；表格在這個流派裡比卡片高貴。
* 讓圖越過框，讓字守著框。
* 行長壓在 60ch 以內，段落之間留到看起來像漏排。

**Don't**

* 不要灰、不要 opacity 中間值、不要漸層、不要陰影、不要模糊。
* 不要圓角，一個都不要。
* 不要無襯線字、不要等寬字、不要 emoji icon。
* 不要置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
* 不要粗細變化的線、不要 `stroke-linecap:round`。
* 不要把鉻黃當品牌色用；它只標「可動作」與「現在在哪」。
* 不要紙紋、顆粒、noise——這個流派的紙是平滑的。
* 不要用 Beardsley 常被聯想的情色題材去做品牌內容；本規格書取的是他的
  **製版邏輯與構成語言**，不是題材。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名　品牌</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--ink:#0A0A0A;--paper:#FFFFFF;--y:#E8C300;--r:1.3px}
*{box-sizing:border-box;margin:0;padding:0;border-radius:0}
body{background:var(--paper);color:var(--ink);font-family:"Noto Serif TC",serif;
     font-size:16.5px;line-height:1.95;overflow-x:hidden}
.frame{position:fixed;inset:15px;border:var(--r) solid var(--ink);pointer-events:none;z-index:40}
.wrap{max-width:1200px;margin:0 auto;padding:0 54px}
.lab{font-family:"Playfair Display",serif;font-style:italic;letter-spacing:.34em;
     text-transform:uppercase;font-size:10.5px}
.cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.32fr);gap:56px;align-items:start}
.void{height:clamp(70px,13vh,150px)}
hr.rule{border:0;border-top:var(--r) solid var(--ink)}
main{animation:wipe .52s steps(9,end) both}
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@media(max-width:900px){.wrap{padding:0 26px}.cols{grid-template-columns:1fr;gap:34px}}
@media(prefers-reduced-motion:reduce){main{animation:none}}
</style>
</head>
<body>
<div class="frame" aria-hidden="true"></div>

<!-- 導覽：方格列，現用頁的裝飾伸出格子（越框） -->
<nav class="rail" aria-label="全站導覽">…</nav>

<!-- ambient：唯一允許「連續」的地方，且它進硬砍濾鏡 -->
<svg class="tide" viewBox="0 0 1200 96" preserveAspectRatio="none" aria-hidden="true">…</svg>

<main>
<div class="wrap">
  <header>
    <div class="lab">BRAND — SUBTITLE · CITY</div>
    <h1 class="dsp" style="font-size:clamp(40px,7.4vw,96px)">標題</h1>
    <hr class="rule" style="margin-top:26px">
  </header>

  <div class="void"></div>

  <section class="cols">
    <div>
      <p style="max-width:44ch;font-size:19px">一句把限制講出來的話。不要價值主張，講規則。</p>
    </div>
    <div><!-- 這裡放那塊大黑 --></div>
  </section>

  <div class="void"></div>
  <hr class="rule">

  <section style="padding-top:34px">
    <div class="lab">II — 章節</div>
    <table>…</table>
  </section>
</div>
</main>

<footer style="border-top:var(--r) solid var(--ink);padding:30px 0 66px">
  <div class="wrap">…</div>
</footer>
</body>
</html>
```

---

## 十二、技術實作與相容性

範例站用三項核心技術，分屬三個不同的層（A 渲染／C 版面與樣式／E 資料與生成）。

### 12.1 SVG `feComponentTransfer` + `type="discrete"` 硬砍（A 渲染層）

**它在本站承載什麼**：特徵 1「紙上不准有灰」。任何連續的東西（環境動效的墨雲、
抗鋸齒邊緣、疊層 alpha）進到這個濾鏡都只會輸出兩個值。這是**唯一**能讓「連續的
資料」與「兩階的畫面」同時成立的做法——沒有它，動起來的背景一定是灰的。

**支援現況與查證來源**（2026-08-14 查證）：
MDN《`<feComponentTransfer>`》標示 **Baseline Widely available**，
原文為「This feature is well established and works across many devices and browser
versions. It's been available across browsers since July 2015.」；
`type="discrete"` 與 `tableValues` 是 MDN 該頁範例中直接示範的用法
（Filter Effects Module Level 1 把 discrete 定義為把 [0,1) 切成 n 段的階梯函數）。
來源：https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComponentTransfer

**Fallback 的具體行為**：濾鏡不被支援時，`filter` 屬性整個被忽略，
`<g>` 照常繪製 → 那條裝飾帶會顯示成**兩片淡灰的雲**。這是本站唯一會出現灰的地方，
而它正好就是本站要示範的東西——所以〈落墨法〉那一頁直接放了一顆開關讓使用者主動
關掉硬砍去看那個灰。內容與可讀性完全不變（那條帶子是純裝飾，已標 `role="img"`
與說明文字）。

**本地驗證的限制（誠實揭露）**：建置環境內沒有瀏覽器，無法對濾鏡輸出做像素級
比對；本站以 (a) MDN 的 Baseline 狀態、(b) 規格中 discrete 函數的定義、
(c) 在 Node 內以相同數學重算（單層 alpha 0.34 → 0；雙層 1−0.66²=0.564 → 1）
三者交叉確認行為，並把它設計成**純增強**：即使濾鏡完全失效，版面、資訊與互動
一律不受影響。

### 12.2 `stroke-dasharray` 中央開口作為狀態機（C 版面與樣式層）

**它在本站承載什麼**：簽名動效「線的生滅」與特徵 3 的核心主張——線不是畫上去的，
是兩塊區域意見不合時剩下來的。做法是把每條邊設 `pathLength="100"`，
在 `50 0 50`（整條可見）與 `0 100 0`（整條不可見）之間補間，中間值如 `25 50 25`
即為「兩端各留 25、中央開一個 50 的口」。

選它而不是 `stroke-dashoffset` 描繪，是因為 dashoffset 是**畫線**的語彙
（線從一端長到另一端），而本流派的線是**被留下來**的；中央開口在視覺上是
「被吃掉」而不是「被畫出來」。也不用 `opacity`，因為淡出的中間值就是灰。

**支援現況與查證來源**：`stroke-dasharray` 與 `pathLength` 屬 SVG 1.1，
現行瀏覽器全數支援（MDN 皆標 Baseline Widely available）；CSS transition 對
`stroke-dasharray`（可插值的數字列）的補間為 CSS Transitions 標準行為。
無支援缺口。`prefers-reduced-motion` 下 `transition:none`，線瞬間生滅，
狀態語意零損失。

### 12.3 平面區域鄰接圖 ＋ 獨立集列舉（E 資料與生成層）

**它在本站承載什麼**：核心功能「落墨」的規則與驗收，以及〈落墨法〉頁的三張對照
範例。把「兩塊墨不能相鄰」寫成圖論語言就是——**上墨的區域必須構成鄰接圖上的一個
獨立集（independent set）**，再加上面積比 22–38% 與五官可讀性兩條約束。
純 JavaScript，無瀏覽器 API 依賴，故無相容性問題。

搭配 FNV-1a → mulberry32 決定性偽亂數：同一個面型種子恆得同一副坯，
同一個面號恆得同一張面，因此 `?m=&t=` 分享碼可完整還原。

**效能實測值**（Node 22，建置環境）：

| 量測 | 值 |
|---|---|
| 25 區、深度優先枚舉全部獨立集 | 55,447 個，**4 ms** |
| 其中同時滿足三條規則的合格解 | 4,996 個（〈長面〉種子），佔獨立集 9.0% |
| 隨機亂點（每格 30% 機率上墨）的通過率 | 0.42%——規則不是裝飾，是真的擋人 |
| 每次點擊的重算（判定＋25 格＋60 條邊改寫） | < 1 ms，零 `getBoundingClientRect`，不觸發 layout |
| 單頁大小（含全部 inline CSS/JS/SVG） | index 46.9 KB／其餘三頁 32–33 KB（預算 350 KB） |
| 外部資源 | 只有 Google Fonts；零圖片、零音檔 |

**無 JavaScript 時的行為**：首頁內嵌一張建置階段就算好的靜態素坯 SVG（未落墨，
髮絲線完整），四頁全部營業資訊、價目、工序、材料與面錄二十四筆資料皆為可選取的
一般 HTML 文字（面錄以 `<noscript>` 提供完整表格）。落墨台是純粹的增強。
