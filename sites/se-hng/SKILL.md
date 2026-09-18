---
name: watercolour-wash
description: Transparent watercolour rendering — the white is reserved paper and never paint, value is an integer count of dried washes, every shape carries one wet edge and one dry edge, back-runs and granulation are the medium speaking, and nothing can be undone.
---

# 水彩渲染 Watercolour Wash（透明疊洗）

> 十八世紀末的英國，水彩本來是軍事測繪的工具：Paul Sandby（1731–1809）在陸軍製圖處把地形畫成可讀的圖，後來這套「先鋪一層淡的、乾了再鋪第二層」的做法被 Thomas Girtin 與早期的 Turner 拿去畫風景，成了英國水彩傳統。
> 同一時間在巴黎，美術學院把它變成建築的表達語言——*lavis* 與 *rendu*：一張還沒蓋的房子，用透明的洗一層一層鋪出它的量體與陰影。這套畫法一直是建築與造園提案的標準交付物，直到一九九〇年代被電腦渲染取代。
> 它的全部規矩來自一件事：**透明水彩沒有白色**。顏料只能讓紙變暗，不能讓紙變亮。所以這個流派不是一種畫風，是一種**先決定、後下筆、不能反悔**的秩序。

---

## 一、設計哲學

1. **紙是最亮的顏料。** 畫面上每一塊白都是一塊沒有被碰過的紙。它必須在第一筆之前決定，並在之後的每一道洗裡被保護。這件事決定了整個流派的性格：所有的規劃都在前面，所有的動作都不可逆。
2. **明度是可以數的。** 深不是調出來的，是同一道洗疊了幾次。所以這個流派沒有連續調——它的明度階是整數：〇、一、二、三、四。
3. **透明即是有厚度。** 蓋上去的顏色不會蓋掉下面那一道，兩道都還在。看得見底下那一層，是這個流派唯一的「材質感」，它不靠紋理貼圖。
4. **邊界是時間的產物。** 一個形的邊是硬的還是糊的，取決於它旁邊那一塊乾了沒有。所以邊不是造型決定的，是次序決定的。
5. **意外必須被安排。** 回流花、顆粒沉澱、筆觸跳過的乾筆白，都不是用畫的，是用時間點出來的——但它們出現的位置仍然要事先決定。「隨機」在這裡不是藉口。
6. **拒絕補救。** 白顏料、廣告顏料、刀刮、海綿吸、事後加高光、電腦調亮——這六件事在別的媒材是技術，在這裡是承認你事前沒想清楚。介面設計上這條同樣成立：**這個流派的產品不該提供「復原」。**

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，畫出來的就不再是渲染，而是一張塗了顏色的圖。

### 特徵 1｜白是紙，不是顏料（reserved whites）

畫面上每一處高光都必須是「洗的形當中挖掉的一塊」，而且那一塊的邊緣是**硬而不規則**的（那是筆繞過去留下的痕跡），絕不是柔和的漸層。實作上用遮罩把洞挖出來，不要用白色蓋。

```html
<svg viewBox="0 0 220 140">
  <mask id="reserve">
    <rect width="220" height="140" fill="#fff"/>
    <!-- 這一塊是「不洗」的：留白 -->
    <path d="M110 44 132 48 150 62 148 86 128 98 104 100 82 92 70 74 78 54Z" fill="#000"/>
  </mask>
  <g mask="url(#reserve)">
    <path d="M10 12 210 14 208 128 12 126Z" fill="#2E4A8C" fill-opacity=".30"/>
    <path d="M10 12 210 14 208 128 12 126Z" fill="#2E4A8C" fill-opacity=".30"/>
  </g>
</svg>
```

```css
/* 錯：用白色把亮處蓋出來 */
.highlight{ background:#fff; }            /* ✗ 這個流派沒有白顏料 */
/* 對：亮處是底紙露出來 */
.wash{ -webkit-mask-image:var(--reserve); mask-image:var(--reserve); }  /* ✓ */
```

### 特徵 2｜濃淡＝洗數（integer value steps）

全站只允許**一個**單洗不透明度。深的地方是同一個 `d` 疊 n 次。不准出現第二個透明度數值、不准用 `filter: brightness()`、不准用調淡的色碼。

```css
:root{ --wash:.30; }                      /* 全站唯一的單洗不透明度 */
.w1{ fill-opacity:var(--wash) }           /* 一道 */
/* 二道、三道、四道 = 同一個 path 畫 2、3、4 次 */
```

```js
// 一道洗 = 一個 <path>；要更深就再 append 一個一模一樣的
function wash(d, ink, n){
  let s = '';
  for (let i = 0; i < n; i++) s += `<path d="${d}" fill="var(--${ink})" fill-opacity="var(--wash)"/>`;
  return s;
}
```

驗收方法：把輸出的 SVG 裡所有 `fill-opacity` 列舉出來，只准有一個值。

### 特徵 3｜每個形都有一道濕邊、一道乾邊，而且乾邊會沉一圈

顏料乾的時候往邊緣跑，所以**乾掉的洗邊緣一定比中間深**。這一圈深邊是渲染最好認的特徵。作法是同一個 `d` 再描一次邊。

```css
/* 乾邊：硬停，而且沉了一圈 */
.wash-dry{ stroke:var(--ink-colour); stroke-opacity:.26; stroke-width:2.2; fill:none;
           stroke-linejoin:round; }
/* 濕邊：接在還沒乾的鄰居上，化開 */
.wash-wet{ stroke:var(--ink-colour); stroke-opacity:.05; stroke-width:9; fill:none; }
```

規矩：**一個形至少要有一道濕邊和一道乾邊**。四邊都糊會浮起來不著地；四邊都硬會變成剪紙。禁止用 `filter:blur()`、`box-shadow`、漸層去做柔邊——那是三種不一樣的東西。

### 特徵 4｜回流花 back-run（cauliflower）

快乾時再滴一點水，水把還沒固定的顏料往外推，推到停下來的地方留下一圈毛毛的、樹枝狀的**硬**邊。它的中心比周圍淺，邊比周圍深。這個形狀沒有人畫得出來——所以它必須用「抖動很大的多邊形」產生，不能用圓、不能用模糊。

```html
<!-- 底下一塊洗，中間被水推開，邊緣沉一圈 -->
<path d="{BLOB}"       fill="var(--ochre)" fill-opacity=".30"/>
<path d="{BLOB}"       fill="var(--ochre)" fill-opacity=".30"/>
<path d="{BACKRUN}"    fill="var(--paper)" fill-opacity=".55"/>
<path d="{BACKRUN}"    fill="none" stroke="var(--ochre)" stroke-opacity=".5" stroke-width="3"/>
```

### 特徵 5｜顆粒沉澱 granulation

礦物顏料（法國紺青、天藍、生赭、培恩灰）顆粒重，會沉進冷壓紙的凹處，所以一片洗**近看是一顆一顆的**。實作用一個小 `<pattern>` 的散點，疊在洗上面、用同一個顏色——關鍵是：顆粒不是蓋在顏色上的一層東西，它**就是**那個顏色不均勻地待在紙上，所以它只能用同色、不能用灰、不能用雜訊濾鏡。

```html
<pattern id="gran-ultra" width="24" height="24" patternUnits="userSpaceOnUse">
  <g fill="var(--ultra)" fill-opacity=".20">
    <circle cx="3.1" cy="5.4" r="1.1"/><circle cx="14.8" cy="2.2" r=".7"/>
    <circle cx="9.2" cy="17.6" r="1.3"/><circle cx="20.4" cy="12.9" r=".8"/>
    <!-- …每個 pattern 20–30 顆，半徑 0.5–1.4，位置用固定亂數種子 -->
  </g>
</pattern>
<path d="{WASH}" fill="url(#gran-ultra)"/>
```

紙的紋理則用**兩層極淡的斜向硬停點條紋交叉**產生，不用圖片、不用 `feTurbulence`：

```css
body::before{
  content:"";position:fixed;inset:0;pointer-events:none;opacity:.5;
  background:
    repeating-linear-gradient(64deg, rgba(110,106,98,.055) 0 1px, transparent 1px 7px),
    repeating-linear-gradient(-58deg, rgba(110,106,98,.045) 0 1px, transparent 1px 9px);
}
```

---

## 三、色彩系統

顏料表只有六色，四十年不換——這是流派的一部分，不是省事。所有其他顏色都必須由這六色疊出來。

| 變數 | 色碼 | 顆粒 | 用途 | 面積 |
|---|---|---|---|---|
| `--paper` | `#F3EDE0` | — | 冷壓紙，唯一的大面積底色，也是最亮的值 | 約 40% |
| `--paper-hi` | `#FBF7EE` | — | 上板後繃平的紙面（圖版、卡片） | 約 14% |
| `--paper-lo` | `#E4DAC6` | — | 紙背、紙的暗處 | 約 3% |
| `--sky` | `#8FA6B8` | 輕 | 第一道天光 | ≤10% |
| `--ochre` | `#C69A5E` | 中 | 土黃：洗石子、碎石、穀 | ≤8% |
| `--sienna` | `#A8552F` | 輕 | 焦赭：磚、瓦、木、土 | ≤12% |
| `--ultra` | `#2E4A8C` | **重** | 法國紺青：天、水、所有陰影的底 | ≤10% |
| `--payne` | `#4A5A6B` | 重 | 培恩灰：第四道，背光那一側；亦為次級文字 | ≤10% |
| `--sap` | `#6B7F3A` | 輕 | 樹綠：草木，只在第二道 | ≤8% |
| `--morocco` | `#8E2B22` | — | 摩洛哥羊皮：只用在書脊、現用態、警示、focus | ≤3% |
| `--pencil` | `#6E6A62` | — | 2H 描稿線，只在 0.7px 細線 | ≤2% |
| `--ink` | `#2A2B28` | — | 全部正文 | — |

**硬規則**

- **零純白**（最亮是 `#F3EDE0`）、**零純黑**（最暗是 `#2A2B28`）。
- **零白色顏料**：任何「把東西變亮」的宣告都不合法，亮只能來自沒被蓋住的底。
- **零彩色漸層**：唯一合法的 `linear-gradient` 是紙紋那兩道硬停點條紋與書脊。
- **零 `filter: blur`、零模糊陰影、零發光、零金屬**。厚度用 `box-shadow:2px 2px 0` 的硬邊實色。
- **圓角上限 2px**（紙沒有圓角）。
- **零等寬體、零 mono 數字**。
- 暗部不是黑的：暗一律是紺青 + 焦赭（互補色）疊出來的有溫度的灰，而且因為兩者顆粒輕重不同，它們在紙上會自己分層。這件事調不出來，只能讓它發生。
- 可讀性：正文一律坐在紙上（`#2A2B28` 對 `#F3EDE0` 為 12.6:1）。明文禁止把長文放在兩道以上的洗上面。

---

## 四、字體系統

渲染圖上的字是製圖員寫的，不是排版排的：**人文主義的舊式數字襯線體**，字級小、字距寬、字重輕。

```css
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif+TC:wght@400;500;600&display=swap');

body{
  font-family:"Noto Serif TC","EB Garamond",serif;
  font-size:17px; line-height:1.85;
  font-feature-settings:"onum" 1,"pnum" 1;   /* 舊式數字：這個流派沒有等高數字 */
}
.lat{ font-family:"EB Garamond",serif; letter-spacing:.08em }
.sc{  font-family:"EB Garamond",serif; text-transform:uppercase;
      letter-spacing:.18em; font-size:.72rem; color:var(--payne) }   /* 圖版標籤 */
h1{ font-size:clamp(1.5rem,3vw,2.1rem); font-weight:500; letter-spacing:.04em; line-height:1.28 }
```

字級 scale：`.72rem`（標籤／小字）→ `.88rem`（表格與註）→ `1rem`（正文）→ `1.12rem`（引言）→ `clamp(1.5rem,3vw,2.1rem)`（標題）。**字重只有 400／500／600，不用 700 以上**——這個流派沒有粗體，強調靠大小、間距與位置。羅馬數字（I、II、MMXXIV）用在圖版編號與年份。

---

## 五、版面與網格

版面的隱喻是**一本攤開的書**與**一張上了板的紙**，不是網格系統。

- 最大寬 1060px，左右留白 `clamp(16px,3.4vw,40px)`。
- 對開：`grid-template-columns:1fr 1fr`，中間一條 14px 的書脊。≤900px 時上下堆疊、書脊消失。
- 每一張圖版四邊各有一條水膠帶（`.gum`）——這是上板的痕跡，不是裝飾框。
- 卡片用 `box-shadow:0 0 0 1.2px rgba(74,90,107,.4), 3px 4px 0 rgba(74,90,107,.13)`：一條硬邊線加一塊硬邊的影，**不用模糊陰影**。
- 分隔線一律 1.4px 實線 `rgba(74,90,107,.4)`。
- 不對稱：正文欄 `1.25fr` 對側欄 `.75fr`。

```css
.leaf{ background:var(--paper-hi);
       box-shadow:0 0 0 1.2px rgba(74,90,107,.42), 3px 4px 0 rgba(74,90,107,.14) }
.gum{ position:absolute; background:#D9CDA6; opacity:.85;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.5) }
.gum.t{ top:-6px; left:9%; right:9%; height:13px }
```

---

## 六、元件配方

### 導覽（撕膠 frisket-off）

四個頁籤上原本都蓋著一層留白膠（灰黃、有膠光、邊緣硬而不規則）；**現用頁那一塊膠已經撕掉了**，露出從頭到尾沒被碰過的紙。

```css
.nav a{ position:relative; padding:.85em .95em .8em; text-decoration:none; color:var(--ink) }
.nav a::before{                       /* 還蓋著留白膠 */
  content:""; position:absolute; inset:4px 2px; z-index:-1;
  background:#C9BE97; opacity:.62;
  clip-path:polygon(3% 8%,26% 2%,52% 9%,78% 1%,98% 7%,96% 42%,99% 78%,
                    74% 96%,49% 89%,22% 98%,2% 91%,5% 54%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.5);
}
.nav a[aria-current="page"]::before{  /* 膠撕掉了，底下是紙 */
  background:var(--paper-hi); opacity:1; box-shadow:0 0 0 1.4px rgba(74,90,107,.5);
}
```

差異對輔助科技不可見，所以現用項**必須**同時帶 `aria-current="page"`。

### 按鈕

```css
.btn{ font:inherit; background:var(--paper-hi); color:var(--ink);
      border:1.5px solid var(--payne); padding:.5em 1.1em; border-radius:0;
      box-shadow:2px 2px 0 rgba(74,90,107,.3); cursor:pointer }
.btn:hover{ transform:translate(1px,1px); box-shadow:1px 1px 0 rgba(74,90,107,.3) }
.btn.pri{ background:var(--morocco); color:#F7F0E4; border-color:var(--morocco) }
:focus-visible{ outline:2.5px solid var(--morocco); outline-offset:3px }
```

### 表格與定義列

無外框、無斑馬紋，只有 1px 底線。欄頭用 `.sc`（小型大寫、字距 .14em、培恩灰）。

### 圖說（錨點定位）

圖上一顆 11px 的小圓點，hover/focus 時在旁邊長出一張小籤。**不支援錨點定位或沒有 JavaScript 時，圖說就是圖旁邊的一段字**，資訊零損失。

```css
.tip{ position:static; margin:.35em 0 0;            /* 保底：就是一段字 */
      background:var(--paper-hi); border:1px solid rgba(74,90,107,.55);
      padding:.42em .7em; font-size:.78rem;
      box-shadow:2px 2px 0 rgba(74,90,107,.22) }
@supports (anchor-name:--a){
  .js .anch{ display:block; anchor-name:var(--an) }
  .js .tip{ position:absolute; max-width:15rem; margin:0 0 8px;
            position-anchor:var(--an);
            position-area:block-start span-inline-end;
            position-try-fallbacks:flip-block, flip-inline }
}
```

### 頁尾

1.4px 上框線，三欄（地址與人／價目／頁）。若題材涉及虛構商號，頁尾註明「本站為設計風格範例站，商號、人名、地址、電話與價目皆為虛構」。

---

## 七、動效規則

四種性質不同、觸發源不同的動態，一個都不能少。

| 種類 | 是什麼 | 觸發 | duration / easing |
|---|---|---|---|
| 環境 ambient | **回流花在走**：圖上那一朵 back-run 的硬邊緩慢地膨脹又收回，像紙還在乾 | 無需輸入，常駐 | `40s ease-in-out infinite`，幅度 `scale(1)→scale(1.055) translate(2px,-3px)` |
| 輸入 input-driven | **掀翼**：指標 x 座標直接寫進 `--fold`，紙翼即時跟著轉；鍵盤 ←→ 每次 8%（Shift 25%） | pointerdown/move、鍵盤、range | 無 transition，直接映射，延遲 < 16ms |
| 轉場 transition | **一道洗掃過**：頁面區塊載入時以 `clip-path:inset(0 100% 0 0)→inset(0)` 由左往右刷過；互動中新加的一道洗用 `@starting-style` 淡進來 | 載入／狀態改變 | `.9s cubic-bezier(.22,.7,.3,1)`；洗 `.75s ease` |
| 簽名 signature | **透背 soak-through**：紙翼掀過 90° 之後，看到的不是空白背面，而是**同一張紙的背面**——洗透過去的那幾道，左右相反、更淡、邊更糊，加上水膠帶的壓痕 | 掀翼 `--fold > .5` | 隨掀翼連續，`backface-visibility` 切換 |

```css
@keyframes washin{ from{ clip-path:inset(0 100% 0 0) } to{ clip-path:inset(0 0 0 0) } }
.washin{ animation:washin .9s cubic-bezier(.22,.7,.3,1) both }

@keyframes creep{ 0%,100%{ transform:scale(1) translate(0,0) }
                  50%    { transform:scale(1.055) translate(2px,-3px) } }
.bloom{ transform-box:fill-box; transform-origin:center;
        animation:creep 40s ease-in-out infinite }

/* 新加的一道洗：淡進來（漸進增強） */
.wl{ opacity:1; transition:opacity .75s ease }
@starting-style{ .wl{ opacity:0 } }

/* 透背 */
.flap{ transform-origin:left center; transform:rotateY(calc(var(--fold) * -172deg));
       transform-style:preserve-3d }
.face,.back{ position:absolute; inset:0; backface-visibility:hidden }
.back{ transform:rotateY(180deg); background:var(--paper-lo) }
.back .soak{ opacity:.42; filter:saturate(.55); transform:scaleX(-1) }
```

**降級（資訊零損失）**

```css
@media (prefers-reduced-motion:reduce){
  .washin{ animation:none }                       /* 直接就在那裡 */
  .bloom { animation:none; transform:scale(1.028) }/* 停在中段，回流花仍看得見 */
  .wl,.we,.frisk{ transition:none }               /* 洗直接出現 */
  *{ transition-duration:.001ms !important }
}
```

掀翼在降級下仍可拖、可用鍵盤——它是內容不是特效，只是不再有慣性。

---

## 八、插畫與圖像風格（疊洗構成 wash-stack）

全站零外部圖片。所有圖像只由**三個原語**產生，明文不允許第四種：

1. **抖動多邊形＝一道洗。** 取一個粗略的多邊形，遞迴插入中點並沿法線隨機位移，重複 4 次、變異量每層乘 0.6。這就是一塊洗的形。絕不用圓、絕不用貝茲曲線——水在紙上不走圓弧。
2. **乾邊＝同一個 `d` 再描一次。** `stroke-opacity:.26`、`stroke-width:2.2`、`stroke-linejoin:round`。
3. **顆粒＝同色散點 pattern 疊在洗上。**

另有兩個只准用在特定地方的元件：**描稿**（0.7px、`--pencil`、只在洗底下）與**乾筆**（開放折線、圓端點，用於枝幹與莖）。

判準是：「把任何一張圖放大，(a) 找不到任何一條**封閉的等寬輪廓線**在描形（乾邊是沉積不是輪廓，它跟著洗的形，洗沒到的地方它就沒有）；(b) 每一階明度都數得出它疊了幾層，沒有任何中間值；(c) 任何一塊洗的邊緣都比中間深。」

```js
// 抖動多邊形（建置期跑，輸出靜態 path data，執行期零生成）
function deform(pts, depth, variance, decay, rnd){
  for (let d = 0; d < depth; d++){
    const out = [];
    for (let i = 0; i < pts.length; i++){
      const a = pts[i], b = pts[(i+1) % pts.length];
      out.push(a);
      const dx = b[0]-a[0], dy = b[1]-a[1], len = Math.hypot(dx,dy) || 1e-6;
      const off = (rnd()*2-1) * variance * len;
      out.push([ (a[0]+b[0])/2 - dy/len*off, (a[1]+b[1])/2 + dx/len*off ]);
    }
    pts = out; variance *= decay;
  }
  return pts;
}
```

**明文禁用**：照片、半調網點、細線幾何線描、`feTurbulence` 假質感、任何做舊濾鏡、扁平化單色圖示、金屬漸層、任何發光、任何模糊陰影、以及用 `filter:blur()` 假裝濕邊。

---

## 九、Logo 與 Favicon

Logo 是**一片被掀起的紙翼，底下露出一道洗**：上半是一個略微變形的四邊形（紙，`#FBF7EE`，1.4px 培恩灰硬邊），沿它的下緣一條較粗的摺痕線；底下露出一塊紺青的兩道洗（帶乾邊），以及一道摩洛哥紅的乾筆。整個標誌必須只由本流派的三個原語組成——**不准出現正圓、不准出現字母造型、不准出現漸層**。

Favicon 用同一個構成縮到 32×32，寫成 inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F3EDE0'/%3E%3Cpath d='M6 20c3-7 8-9 12-7s6 6 7 9c-6 2-13 2-19-2z' fill='%232E4A8C' fill-opacity='.55'/%3E%3Cpath d='M5 5h22v13L5 13z' fill='%23F3EDE0' fill-opacity='.95' stroke='%234A5A6B' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定哪裡最亮，再決定其他任何事。版面、字級、互動全部在這個決定之後。
- 用洗數當明度階，並且讓使用者數得出來。
- 讓乾邊沉一圈，讓濕邊化開，而且同一個形兩者都要有。
- 把描稿留在洗底下，不要擦掉——它是這張圖的骨架，也是它是手畫的證據。
- 若產品有不可逆的動作，誠實地說「沒有復原」，並把決定的時機往前挪。

**Don't**

- ✗ 白色顏料、事後加高光、`filter:brightness()` 提亮。
- ✗ 第二個 `fill-opacity` 數值；連續調的明度。
- ✗ `filter:blur()`、模糊陰影、發光、玻璃擬態、金屬漸層。
- ✗ 圓與貝茲曲線當作洗的形；平滑的柔邊。
- ✗ `feTurbulence` 或雜訊貼圖假裝紙紋與顆粒。
- ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、等寬數字儀表板。
- ✗ 把長文放在兩道以上的洗上面。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif+TC:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--paper:#F3EDE0;--paper-hi:#FBF7EE;--paper-lo:#E4DAC6;--sky:#8FA6B8;--ochre:#C69A5E;
  --sienna:#A8552F;--ultra:#2E4A8C;--payne:#4A5A6B;--sap:#6B7F3A;--morocco:#8E2B22;
  --pencil:#6E6A62;--ink:#2A2B28;--wash:.30;--gut:clamp(16px,3.4vw,40px)}
body{margin:0;background:var(--paper);color:var(--ink);
  font-family:"Noto Serif TC","EB Garamond",serif;font-size:17px;line-height:1.85;
  font-feature-settings:"onum" 1}
body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.5;
  background:repeating-linear-gradient(64deg,rgba(110,106,98,.055) 0 1px,transparent 1px 7px),
             repeating-linear-gradient(-58deg,rgba(110,106,98,.045) 0 1px,transparent 1px 9px)}
body>*{position:relative;z-index:1}
.wrap{max-width:1060px;margin:0 auto;padding:0 var(--gut)}
</style></head>
<body>
<script>document.documentElement.className+=' js';</script>

<header class="rail"><div class="wrap">
  <a class="brand" href="index.html"><svg viewBox="0 0 72 72" aria-hidden="true">…</svg>
    <span class="bn"><b>商號</b><span class="lat">Romanisation · Trade</span></span></a>
  <nav class="nav" aria-label="主導覽">
    <a href="index.html" aria-current="page">首頁<em>Home</em></a>
    <a href="b.html">第二頁<em>Two</em></a>
  </nav>
</div></header>

<main>
  <section class="book"><div class="wrap">
    <div class="spread washin">           <!-- 對開：左現況、右提案 -->
      <div class="spine" aria-hidden="true"></div>
      <div class="leaf left">
        <div class="leafhd"><b>現況</b><span class="sc">Plate I · As Found</span></div>
        <div class="plate">
          <span class="gum t"></span><span class="gum b"></span>
          <svg viewBox="0 0 620 400" role="img" aria-label="…">
            <defs><pattern id="gran-ultra">…</pattern></defs>
            <!-- 一道洗 = 一個 path；兩道 = 兩個一模一樣的 path -->
            <path d="{WASH}" fill="var(--ultra)" fill-opacity="var(--wash)"/>
            <path d="{WASH}" fill="var(--ultra)" fill-opacity="var(--wash)"/>
            <path d="{WASH}" fill="none" stroke="var(--ultra)" stroke-opacity=".26" stroke-width="2.2"/>
            <path d="{WASH}" fill="url(#gran-ultra)"/>
          </svg>
          <button class="anch" style="--an:--a1" aria-describedby="t1">&nbsp;</button>
          <p class="tip" id="t1" style="--an:--a1">圖說……</p>
        </div>
      </div>
      <div class="leaf">…掀翼…</div>
    </div>
  </div></section>
</main>

<footer>…（地址、電話、時間、人名、價目、虛構聲明）…</footer>
<noscript><p>…關掉 JavaScript 之後看得到什麼，明講…</p></noscript>
</body></html>
```

---

## 十二、技術實作與相容性

本風格的三項核心技術、查證來源、fallback 與實測值。

### (1) 抖動多邊形疊洗引擎（E 資料與生成層，自寫）

承載特徵 1–4 的全部。中點位移遞迴：起始多邊形 7–10 點、`depth 4`、`variance .18–.30`、`decay .6`，輸出 112–160 點的封閉折線。**在建置期執行，把 path data 寫死進 HTML，執行期零生成**——這同時解決了效能與 noscript：關掉 JavaScript，畫還在。

- 路徑編碼用 SVG 的隱含 `lineto`（`M x y x y x y …Z`），座標取整數；一塊洗約 680 bytes，一整張 89 塊洗的對開圖約 60 KB。
- 亂數用 `mulberry32` 固定種子，**同一個種子永遠輸出同一張圖**——這很重要：紙翼正面與底下那一張必須是同一張畫的兩個狀態，種子一致才對得起來。
- 實測：本站四頁 `index 169.4 KB / gardens 160.8 KB / wash 96.4 KB / reserve 67.5 KB`，全部含 inline CSS 與 JS，**單頁 ≤ 350 KB 的硬門檻通過**（最大一頁佔 48%）。首屏 JS 只有掀翼的事件綁定，執行 < 5 ms。

### (2) CSS 錨點定位 Anchor Positioning（C 版面與樣式層）

`anchor-name` / `position-anchor` / `position-area` / `position-try-fallbacks`，用來把圖說釘在圖上的指定位置，並在靠近視窗邊緣時自動翻面。

- **支援現況（2026-09 查證）**：CSS Anchor Positioning 為 **Baseline 2026**——Chrome / Edge 125（2024）、Safari 26（2025）、Firefox 147（2026 年初，最後一個實作，也是它讓此功能進入 Baseline）；Safari 18.2 起支援 `anchor()` 與 `position-anchor`，`@position-try` 需 Safari 18.4 以上。全球覆蓋率約 91%。查證來源：[caniuse — CSS Anchor Positioning](https://caniuse.com/css-anchor-positioning)、[web-features 的 Baseline 討論串](https://github.com/web-platform-dx/web-features/issues/3558)、[OddBird：Anchor Positioning Updates for Fall 2025](https://www.oddbird.net/2025/10/13/anchor-position-area-update/)。
- **Fallback 具體行為**：整段浮動樣式包在 `@supports (anchor-name:--a)` 裡，而且再加一層 `.js` 前綴。所以：**不支援錨點定位，或使用者關掉 JavaScript** → `.anch` 小圓點 `display:none`，`.tip` 維持 `position:static`，就是圖底下的三段說明文字，全部同時可見。沒有任何一個字消失，沒有任何一個功能失效。
- 為什麼不用 JS 定位庫：圖說要跟著 SVG 圖版一起縮放與換行，用 JS 量測會在 resize 時抖動；錨點定位是瀏覽器在版面階段解的，零 layout thrashing。

### (3) `@starting-style` ＋ `transition-behavior: allow-discrete`（B 動效與時間軸層）

用來讓「新加的一道洗」淡進來——因為洗是在使用者按下按鈕時才被 append 進 DOM 的，傳統上必須用 JS 雙 rAF 才能觸發進場 transition。

- **支援現況（2026-09 查證）**：`@starting-style` 與 `transition-behavior: allow-discrete` 於 Chrome 117+／Edge 117+／Safari 17.4+／Firefox 129+ 穩定；隨 Firefox 129 發布成為 **Baseline Newly available**，預計 2027-02-06 進入 Widely available，覆蓋率約 85–90%。已知限制：**Firefox 目前不支援從 `display:none` 開始的動畫**；Safari 尚未支援 `overlay` 的 `allow-discrete`。查證來源：[MDN `@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)、[MDN `transition-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior)、[web.dev：Now in Baseline — animating entry effects](https://web.dev/blog/baseline-entry-animations)。
- **Fallback 具體行為**：不支援時，新加的洗**直接出現**（`opacity:1` 是它的正常狀態，`@starting-style` 只是給它一個更早的起點）。顏色、層數、判定結果一模一樣，只是少了 0.75 秒的淡入。因為這條限制，本站刻意不讓任何資訊依賴 `display` 的離散轉場——Firefox 的限制因此完全無害。

### 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部資源） | ≤ 350 KB | 最大 169.4 KB |
| 外部請求 | 僅 Google Fonts | 1 組（字體），零圖片、零音檔、零函式庫 |
| 首屏 JS 執行 | ≤ 100 ms | < 5 ms（僅事件綁定；繪圖全在建置期完成） |
| 主要動畫 | 60 fps | 掀翼只改 `transform`（合成層）；回流花只改 `transform`；`.washin` 只改 `clip-path`。無一觸發 layout 或 paint 迴圈 |
| layout thrashing | 無 | JS 全程不讀取 `offsetWidth` 類屬性，唯一的量測是 `getBoundingClientRect()`，且只在 pointer 事件內讀一次 |

### 一件要注意的事

`--wash:.30` 疊四次的結果是 `1-(1-.3)^4 = 76%` 不透明度。這代表**第四道以後再疊已經幾乎看不出差別**——這不是缺陷，這正是真實水彩四道以上會發濁的原因，兩邊的上限剛好對上。如果你把 `--wash` 調高到 .5，三道就滿了，畫面會失去透明感；調低到 .2 則需要六道才夠暗，紙會起毛。**.28–.34 是這個流派唯一合理的區間。**
