---
name: op-art-retinal-field
description: Hard-edge black-and-white Op Art — a repeating unit progressively deformed by a continuous scalar field, bleeding off every edge, with figure-ground inversion as the only interface state.
---

# 歐普藝術 · 視網膜場 Op Art / Retinal Field

> 這份規格書描述的是 1960 年代歐普藝術（Op Art）的網頁化做法。
> 它不綁定產業：範例站是視知覺訓練教具製造所，同一套語言也能做唱片行、體育館、印刷廠、字型公司。
> 判準只有一個——**遮掉全部文字，懂設計的人要能在三秒內說出「這是歐普」。**

---

## 一、設計哲學

歐普藝術是 1964 年《時代》雜誌記者造的詞，1965 年因紐約現代美術館「The Responsive Eye」展（策展人 William C. Seitz）成為運動。它的核心主張只有一句：

**畫面本身是靜止的，所有的動都發生在觀看者的視覺系統裡。**

這句話有三個直接的設計後果：

1. **作者要消失。** 筆觸、手感、材質、隨機抖動全部是雜訊——只要觀者讀得出「這是誰畫的」，他就不會讓自己的眼睛去動。Bridget Riley 的大幅作品由助手依她的準備稿上色，正是為了這個。做網頁時等價於：不要噪聲貼圖、不要手繪感、不要 feTurbulence。
2. **形要可被計算。** Vasarely 1955 年〈黃色宣言〉提出「單元造形」（unité plastique）：一個正方格裡放一個幾何形，格與形兩色互換，換色換形即生全部變化。歐普從一開始就是參數化的，所以它天生適合寫成 code——**不要畫圖，要寫場函數。**
3. **效果來自生理，不來自比喻。** 側抑制、同時對比、方向選擇性適應、馬赫帶、圖地組織——這些是可被引用、可被自證的機制。做這個風格時，每一個視覺決定都應該答得出「它在利用哪一條」。

**不要做的事**：把歐普當「酷炫背景」。歐普不是裝飾層，它是版面本身。如果你的版面拿掉背景圖案還是一個正常網站，那你做的不是歐普。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一條，做出來的東西就不是歐普藝術了。每一條附可直接複製的片段。

### 特徵 1 — 一個重複單元，被一個連續函數漸進變形

單元排在**嚴格的整數格**上，每一格的形變參數由連續純量場 `f(u,v)` 決定。函數必須連續、單調可讀：你要能指著畫面說「這裡變得比較快」。隨機、雜訊、手繪抖動一律退回裝飾圖樣。

```js
// 五個場函數。u,v ∈ [0,1] 為格心的正規化座標，回傳 t ∈ [0,1] 為該格的形變量。
const TAU = Math.PI * 2;
const FIELDS = {
  // 摺：欄寬向一條看不見的摺線壓縮（Riley《Movement in Squares》1961）
  fold:    (u,v,p) => 0.5 + 0.5*Math.cos(TAU*(u + p.a*Math.sin(Math.PI*u))*p.k),
  // 波：橫向相位被第二個正弦調變（Riley《Current》1964）
  wave:    (u,v,p) => 0.5 + 0.5*Math.sin(TAU*(v*p.k + p.a*Math.sin(TAU*(u-p.cx)))),
  // 脹：徑向膨脹（Vasarely Vega 系列）
  bulge:   (u,v,p) => { const dx=(u-p.cx)*1.6, dy=v-p.cy, r=Math.hypot(dx,dy);
                        return 0.5 + 0.5*Math.cos(TAU*p.k*r/(1+p.a*r*r)); },
  // 扭：雙線性剪切，四角旋向相反
  torsion: (u,v,p) => 0.5 + 0.5*Math.sin(TAU*(u*p.k + p.a*8*(u-p.cx)*(v-p.cy))),
  // 尖：以中軸鏡射的人字折返
  chevron: (u,v,p) => 0.5 + 0.5*Math.sin(TAU*(Math.abs(u-p.cx)*p.k*2 + v*p.a*3)),
  // 平：退化情形（赫曼方格、咖啡牆這類等距圖版就是 k=0 的極限）
  flat:    (u,v,p) => p.a
};
```

單元本身只需要五種，形變量 `t` 控制它的**大小**（或明度）：

```js
function unit(kind,x,y,cw,ch,t,ink){
  if(kind==='bar'){ const w=cw*t;  return w<0.4?'' :
    `<rect x="${x+(cw-w)/2}" y="${y}" width="${w}" height="${ch}" fill="${ink}"/>`; }
  if(kind==='row'){ const h=ch*t;  return h<0.4?'' :
    `<rect x="${x}" y="${y+(ch-h)/2}" width="${cw}" height="${h}" fill="${ink}"/>`; }
  if(kind==='disc'){const r=Math.min(cw,ch)*0.5*t; return r<0.3?'' :
    `<circle cx="${x+cw/2}" cy="${y+ch/2}" r="${r}" fill="${ink}"/>`; }
  if(kind==='sq'){  const s=Math.min(cw,ch)*t; return s<0.4?'' :
    `<rect x="${x+(cw-s)/2}" y="${y+(ch-s)/2}" width="${s}" height="${s}" fill="${ink}"/>`; }
  if(kind==='dia'){ const s=Math.min(cw,ch)*0.5*t, mx=x+cw/2, my=y+ch/2; return s<0.3?'' :
    `<path d="M${mx} ${my-s}L${mx+s} ${my}L${mx} ${my+s}L${mx-s} ${my}Z" fill="${ink}"/>`; }
  return '';
}
```

### 特徵 2 — 硬邊：零漸層、零陰影、零圓角、零材質

邊界必須是零寬度的躍變。柔邊會抹掉側抑制的訊號，效果直接掉一半。這也是為什麼原作用遮蔽膠帶平塗而不是筆觸。

```css
*{ border-radius:0 !important; }
svg{ shape-rendering:crispEdges; }          /* 關掉幾何邊的反鋸齒柔化 */
/* 全域禁令：以下四種在本風格中一律不得出現 */
/*  box-shadow / text-shadow / filter:blur() / linear-gradient 作為色彩過渡 */
```

漸層只允許一種用途：`repeating-linear-gradient` 當**圖樣**（色標間距為 0，即硬邊條紋），不得當柔和過渡。

```css
.stripe{ background:repeating-linear-gradient(90deg,#101014 0 9px,#F2F1EC 9px 18px); }
```

### 特徵 3 — 沒有中心的全幅場，被畫布四邊切斷

不留白框、不置中、沒有焦點；圖案在邊緣被切斷，暗示它繼續長出去。一旦加了外框留白，它就變成一張「掛在牆上的圖」而不是一片場。

實作上這是硬需求：格數必須隨容器尺寸重算，永遠是整數格且左右各多畫一格讓它溢出。

```js
const ro = new ResizeObserver(() => {
  const r = box.getBoundingClientRect();
  const cols = Math.max(6, Math.round(r.width / CELL));   // 整數格
  const rows = Math.max(4, Math.round(r.height / CELL));
  box.innerHTML = plate({cols, rows, w:r.width, h:r.height});  // 迴圈跑 i = -1 … cols+1
});
ro.observe(box);
```

```css
.fieldbox{ overflow:hidden; }                     /* 切斷，不是縮小 */
.fieldbox svg{ width:100%; height:100%; }         /* preserveAspectRatio="xMidYMid slice" */
```

### 特徵 4 — 消色差為本體，色彩只當標記

黑與白就是全部。色彩若出現，只能當**標記**（量測工具、注視點、焦點框），面積 ≤3%，而且不得用明暗建立階層。多一個顏色，就少一分視網膜效應。

```css
:root{
  --ink:#101014;    /* 45% ─ 場的墨 */
  --paper:#F2F1EC;  /* 45% ─ 場的地。刻意不是純白 #FFF：純白刺眼，反射率 82–86% 才對 */
  --grey:#8C8C88;   /* 7%  ─ 只給中灰量測用（同時對比板、咖啡牆的磚縫） */
  --mark:#2233E0;   /* ≤3% ─ 唯一的彩色，只給量測工具：直尺、注視點、focus ring */
}
```

### 特徵 5 — 單元造形（unité plastique）：格與形兩色互換，且它就是唯一的狀態語法

正方格內置一個幾何形，格色與形色永遠相反。這條同時是**互動語法**：現用頁、選中、hover、active——全部用圖地反轉表示，永遠不加色、不加框、不加光暈、不加陰影。**整個網站沒有一個「高亮」。**

```html
<!-- 單元造形：2×2 即可當 logo、favicon、導覽格、清單項目 -->
<svg viewBox="0 0 140 140" shape-rendering="crispEdges">
  <rect x="0"  y="0"  width="70" height="70" fill="#101014"/><circle cx="35"  cy="35"  r="22" fill="#F2F1EC"/>
  <rect x="70" y="0"  width="70" height="70" fill="#F2F1EC"/><circle cx="105" cy="35"  r="22" fill="#101014"/>
  <rect x="0"  y="70" width="70" height="70" fill="#F2F1EC"/><circle cx="35"  cy="105" r="22" fill="#101014"/>
  <rect x="70" y="70" width="70" height="70" fill="#101014"/><circle cx="105" cy="105" r="22" fill="#F2F1EC"/>
</svg>
```

```css
/* 反轉波前：全站唯一的狀態表達。白色 difference 疊層＝完全反相，
   由 mask-position 從右往左掃過，steps(4) 讓波前是硬邊的、機械的。 */
.rv{ position:relative; isolation:isolate; background:var(--paper); color:var(--ink); }
.rv::after{
  content:""; position:absolute; inset:0; background:#fff; mix-blend-mode:difference;
  -webkit-mask-image:linear-gradient(90deg,#000 0 50%,transparent 50%);
          mask-image:linear-gradient(90deg,#000 0 50%,transparent 50%);
  -webkit-mask-size:200% 100%;         mask-size:200% 100%;
  -webkit-mask-repeat:no-repeat;       mask-repeat:no-repeat;
  -webkit-mask-position:100% 0;        mask-position:100% 0;
  transition:-webkit-mask-position 90ms steps(4), mask-position 90ms steps(4);
}
.rv:hover::after,.rv:focus-visible::after,.rv[aria-current]::after{
  -webkit-mask-position:0 0; mask-position:0 0;
}
```

---

## 三、色彩系統

| 角色 | Hex | 面積 | 用途 |
|---|---|---|---|
| 墨 ink | `#101014` | ~45% | 場的實體、區塊底、表頭、footer。反射率 ≤5%，灰掉的黑會壓死高頻圖案 |
| 地 paper | `#F2F1EC` | ~45% | 場的空、頁面底、卡片底。**不要用 `#FFFFFF`**：純白在高頻條紋下刺眼 |
| 中灰 grey | `#8C8C88` | ~7% | 只給量測用的中間明度：同時對比的測試方、咖啡牆的磚縫、停用態文字 |
| 標記 mark | `#2233E0` | ≤3% | 唯一彩色。只給「量測工具」語意：直尺、注視點、focus ring、進行中格的外框 |

**規則**
- 墨與地的比例應接近 1:1。歐普的畫面沒有「主色與背景色」，只有兩塊互相咬合的區域。
- `--mark` 絕對不能拿去做按鈕底色、標題色、連結色。它一旦變成品牌色，特徵 4 就破了。
- 需要中間調時，用 `mix(ink,paper,t)` 算出來的階梯（見馬赫帶配方），不要另外引入色相。
- **若一定要用彩色**：只准成對出現且**等明度**（相對亮度差 <0.01），因為明度差會自動建立階層、把場壓成前後景。例：`#E0452F` (Y=0.2031) 與 `#008F52` (Y=0.2025)。用之前先算 `Y = 0.2126R+0.7152G+0.0722B`（線性化後）。

---

## 四、字體系統

歐普的同代字體是新怪誕體（Helvetica 1957／Univers 1957）。Google Fonts 對應：

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800;900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
```

| 用途 | 家族 / 字重 | 字級 | 行高 / 字距 |
|---|---|---|---|
| 大標 | Archivo 900 + Noto Sans TC 900 | `clamp(26px,4.2vw,46px)` | 1.02 / `-0.015em` |
| 節標 | Archivo 900 | `clamp(21px,3vw,31px)` | 1.1 / 0 |
| 小標 | Archivo 900 | 19px / 16.5px | 1.2 / `.02em` |
| 內文 | Noto Sans TC 400 | 16px（lead 17.5px） | 1.62 / 0 |
| 資料標籤 mono | Archivo 600，`text-transform:uppercase` | 11.5px | `.09em`，`font-variant-numeric:tabular-nums` |

**字的三條規則**
1. 一律 `font-variant-numeric: tabular-nums`。歐普的數字是規格，不是內文。
2. 標籤用「白字壓在實心墨塊上」，不要用邊框或色塊圓角。這是版面上唯一允許的「徽章」形式。
3. **大字要服從場**：display 尺寸的字用 SVG `<mask>` 從場裡挖出來（knockout），不要讓字浮在圖案上面。

```html
<svg viewBox="0 0 800 300" shape-rendering="crispEdges">
  <defs><mask id="kn">
    <rect width="800" height="300" fill="#fff"/>
    <text x="400" y="150" text-anchor="middle" dominant-baseline="middle"
          font-family="Archivo" font-weight="900" font-size="150" fill="#000">FIELD</text>
  </mask></defs>
  <rect width="800" height="300" fill="#F2F1EC"/>
  <g mask="url(#kn)"><!-- 這裡塞場的 <rect> 們 --></g>
</svg>
```

---

## 五、版面與網格

- **主欄寬 1180px，左右 padding 26px。** 內容欄是實心紙色，場在欄外的左右留白處露出來——場永遠在後面繼續跑。
- **分隔一律 3px 實線。** 不用 1px（在高頻圖案旁邊會被吃掉）、不用 2px 以下的淡灰線、不用陰影分層。
- **不對稱：** 兩欄比例用 `1.25fr / 1fr` 或 `1fr / 1.1fr`，不要 1:1。
- **卡片＝ 3px 描邊的矩形，表頭是實心墨塊。** 沒有圓角、沒有陰影、沒有內距漸變。
- **旋轉角度：** 本風格不旋轉元素。歐普的斜是由格子裡的形變產生的，不是把方塊轉 3 度。唯一的例外是莫列疊層（見下）。
- **留白規則：** 區塊上下 44px，區塊之間夾 3px 全寬橫線。場永不留白框。

### 全幅莫列背景（版面骨架的一部分，不是裝飾）

兩層角度略異的高頻條紋相疊，交疊處自然長出低頻的干涉帶。這是歐普的核心語彙之一（Soto、Cruz-Diez）。

```css
.moire{ position:fixed; inset:-30vmax; z-index:0; pointer-events:none; opacity:.17; }
.moire i{ position:absolute; inset:0;
  background:repeating-linear-gradient(90deg,var(--ink) 0 3px,transparent 3px 6px); }
.moire i.b{ transform:rotate(1.6deg); }   /* 差 1.6° 即產生可見干涉帶 */
```

---

## 六、元件配方

### 導覽 — reversal-cell 圖地反轉格
四個 46px 方格橫排、3px 描邊分隔，每格是一個單元造形（圓／菱／田／半圓）。現用頁那一格**整格黑白對調**，不是加底色。

```css
.nav{ position:fixed; top:18px; right:18px; display:grid; grid-template-columns:repeat(4,46px);
      border:3px solid var(--ink); background:var(--paper); }
.nav a{ width:46px; height:46px; border-left:3px solid var(--ink); isolation:isolate; }
.nav a:first-child{ border-left:0; }
.nav a .u-g{ fill:var(--paper); } .nav a .u-f{ fill:var(--ink); }
.nav a[aria-current="page"] .u-g{ fill:var(--ink); }
.nav a[aria-current="page"] .u-f{ fill:var(--paper); }
@media(max-width:900px){ .nav{ top:auto; bottom:0; left:0; right:0;
  grid-template-columns:repeat(4,1fr); border:0; border-top:3px solid var(--ink); } }
```

### 按鈕
3px 墨邊 + 紙底 + 900 字重。狀態一律靠 `.rv::after` 的反轉波前，不換底色、不位移、不加陰影。

```css
button.b{ border:3px solid var(--ink); background:var(--paper); color:var(--ink);
  padding:9px 16px; font-weight:800; letter-spacing:.06em; position:relative; isolation:isolate; }
/* ::after 同特徵 5 的 .rv::after */
button.b:disabled{ color:var(--grey); border-color:var(--grey); }
```

### 選項 / 核取
不要用系統 checkbox。用一個 22px 的單元造形：外框方格，內嵌方形，選中時內嵌形出現（`opacity:0 → 1`），整列同時反轉。

### 表單 / 滑桿
`accent-color: var(--mark)` — 這是 `--mark` 唯二的正當用途之一（另一個是 focus ring）。

### 表格
`border-collapse:collapse`，格線 2px 墨，表頭是實心墨塊 + 11.5px 大寫字距 `.14em`。

### Footer
整塊實心墨，紙色字。三欄 `1.4fr 1fr 1fr`。這是全站唯一大面積反相的區域，收尾就是把整張紙翻過來。

---

## 七、動效規則

歐普的動不是位移，是**參數在變**。四種各司其職，缺一不可。

| 類型 | 做法 | duration / easing |
|---|---|---|
| ambient 環境（全站） | 莫列下層以**一個完整條紋週期**（6px）無限橫移 → 干涉帶持續緩慢爬行。位移量等於週期故循環無縫 | `26s linear infinite` |
| ambient 環境（首屏） | CSS 3D 圓柱（`preserve-3d` + 每片 `rotateY(θ) translateZ(R)`），容器無限 `rotateY`。GPU 合成，零逐幀 JS | `10s linear infinite`（= 36°/秒） |
| input-driven 輸入 | 游標位置 → 場的形變中心 `cx,cy`；rAF 節流，只重算 SVG 字串 | <100ms，無 easing |
| transition 轉場 | `clip-path` 對角推移；`steps(6)` 讓推移是硬邊的 | `.30s steps(6)` |
| signature 簽名 | **反轉波前**：白色 difference 疊層由 `mask-position` 掃過，元件整塊反相 | `90ms steps(4)` |

**兩條硬規則**
1. **所有時間函數用 `steps()` 或 `linear`。** `ease-in-out` 有加速度，加速度是有機的，歐普是機械的。
2. **不做淡入、不做位移彈跳、不做視差。** 場的參數可以變，場的位置不可以飄。

```css
@keyframes moireCreep{ from{transform:translateX(0)} to{transform:translateX(6px)} }  /* 6px = 條紋週期 */
.moire i.a{ animation:moireCreep 26s linear infinite; }

@keyframes wipeIn{
  from{ clip-path:polygon(0 0,0 0,-30% 100%,-30% 100%); }
  to  { clip-path:polygon(0 0,130% 0,100% 100%,-30% 100%); } }
.wipe{ animation:wipeIn .30s steps(6) both; }

@media (prefers-reduced-motion: reduce){
  *{ animation-duration:.001ms!important; animation-iteration-count:1!important;
     transition-duration:.001ms!important; }
  .drum{ animation:none!important; transform:rotateY(-9deg); }   /* 鼓停在可讀的角度 */
  .moire i.a{ animation:none!important; transform:none; }
  .moire i.b{ animation:none!important; transform:rotate(1.6deg); }
}
```

降級後**資訊零損失**：鼓停止但條紋寬度、條數、角速度讀數照樣印在旁邊；波前變成瞬間反轉；轉場變成瞬間出現；游標場停在中心。

---

## 八、插畫與圖像風格 — unit-modulation 單元調變場

**這個風格不畫插圖。** 沒有一張圖是在描物件的外形。所有圖像——主視覺、產品縮圖、logo、favicon、結果單——都是同一支場引擎在不同參數下的輸出。

判準：**每一張圖都要讀得出「場在哪裡變得比較快」。** 讀不出來，就是退化成裝飾圖樣了。

```js
function plate(o){
  const {w:W,h:H,cols,rows} = o, cw=W/cols, ch=H/rows;
  const f = FIELDS[o.field], p = {k:o.k, a:o.a, cx:o.cx??0.5, cy:o.cy??0.5};
  const out = [`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"
                 xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`,
               `<rect width="${W}" height="${H}" fill="${o.paper}"/><g>`];
  for(let j=0;j<rows;j++)
    for(let i=-1;i<cols+1;i++){                       // 左右各多一格 → 必定被邊緣切斷
      const t = f((i+0.5)/cols,(j+0.5)/rows,p);
      if(o.unite){                                    // Vasarely 單元造形模式
        const dark = ((i+j)%2===0);
        out.push(`<rect x="${i*cw}" y="${j*ch}" width="${cw+0.5}" height="${ch+0.5}"
                        fill="${dark?o.ink:o.paper}"/>`);
        out.push(unit(o.unit, i*cw, j*ch, cw, ch, t, dark?o.paper:o.ink));
      } else {
        out.push(unit(o.unit, i*cw, j*ch, cw, ch, t, o.ink));
      }
    }
  return out.join('')+'</g></svg>';
}
```

三個常用擴充（都是同一支引擎的選項，不是另一套畫法）：

- `parity: 1|2` — 只畫奇數格／棋盤格。做**咖啡牆**、棋盤場用。
- `rowShift: 0.5` — 每列橫移半格。配 `parity:1` + 3px 中灰 `mortar` 即咖啡牆錯覺。
- `tone: n` — 單元的**填色**也被場調變：`fill = mix(ink,paper, (i%n)/(n-1)*0.72+0.14)`。做**馬赫帶階梯**用。

---

## 九、Logo 與 Favicon

**Logo = 2×2 單元造形 + 實心字 + 摺場字帶。**

字在版面上要從場裡挖出來（特徵 4 的 knockout），但 **logo 例外**：小尺寸下 knockout 會糊，所以 logo 的字用實心墨，把場降級成字底下 26px 的一條摺場橫帶。這是為了可讀性做的唯一讓步，寫在這裡以免被當成違規。

**Favicon = 五道不等寬直條 + 一顆同心圓。** 不等寬直條就是 `fold` 場的最小可辨識樣本（16px 下仍讀得出「這裡變得比較快」），中間的同心圓是單元造形的殘影。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F2F1EC'/%3E%3Crect x='0' y='0' width='4' height='32' fill='%23101014'/%3E%3Crect x='7' y='0' width='3' height='32' fill='%23101014'/%3E%3Crect x='13' y='0' width='2.4' height='32' fill='%23101014'/%3E%3Crect x='18' y='0' width='3' height='32' fill='%23101014'/%3E%3Crect x='24.5' y='0' width='4' height='32' fill='%23101014'/%3E%3Ccircle cx='16' cy='16' r='7' fill='%23F2F1EC'/%3E%3Ccircle cx='16' cy='16' r='3.4' fill='%23101014'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 讓場溢出容器邊緣，永遠。
- 用 3px 實線分格，用實心墨塊當標籤。
- 每一個狀態都用黑白對調表示。
- 把參數（k、a、格數）印在畫面上——歐普的作品名字本來就常常是參數。
- 引用真實的知覺機制，並在有爭議時說明有爭議（例：赫曼方格的側抑制解釋近年受到挑戰）。
- 提供停止鍵。高對比高頻圖案會讓人不舒服，這是這個風格的已知代價，要當一等公民處理。

**Don't（含去 AI 化禁令）**
- ✗ 紫藍漸層、任何 hero 漸層。
- ✗ 圓角卡片、模糊陰影、玻璃擬態。
- ✗ 置中大標＋副標＋兩顆按鈕＋三張卡片。
- ✗ emoji 當 icon（icon 一律是單元造形的變體）。
- ✗ Lorem ipsum、「在當今快節奏的世界」、「把 X 變成 Y」句式、「EST. 19xx」徽章。
- ✗ 用 `--mark` 當品牌色或連結色。
- ✗ 手繪抖動、紙紋、噪聲、feTurbulence——本風格的表面必須是無物質的。
- ✗ `ease-in-out`、淡入、視差、位移彈跳。
- ✗ 把場當背景圖鋪在正常網站後面。場是版面，不是桌布。
- ✗ 高頻閃爍動畫（>3Hz）。光敏性癲癇風險，且歐普原作全部是靜止的。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>—</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800;900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--ink:#101014;--paper:#F2F1EC;--grey:#8C8C88;--mark:#2233E0;--t-front:90ms}
*{margin:0;padding:0;box-sizing:border-box;border-radius:0!important}
body{font-family:"Archivo","Noto Sans TC",sans-serif;color:var(--ink);background:var(--paper);
     line-height:1.62;font-variant-numeric:tabular-nums;overflow-x:hidden}
.moire{position:fixed;inset:-30vmax;z-index:0;pointer-events:none;opacity:.17}
.moire i{position:absolute;inset:0;background:repeating-linear-gradient(90deg,var(--ink) 0 3px,transparent 3px 6px)}
.moire i.b{transform:rotate(1.6deg)}
main,header,footer{position:relative;z-index:1}
.wrap{max-width:1180px;margin:0 auto;padding:0 26px}
.sect{background:var(--paper);padding:44px 0}
.rule{border-top:3px solid var(--ink)}
.tag{display:inline-block;background:var(--ink);color:var(--paper);font-weight:800;
     font-size:11px;letter-spacing:.2em;padding:3px 8px}
h2{font-weight:900;font-size:clamp(26px,4.2vw,46px);line-height:1.02;letter-spacing:-.015em}
.fieldbox{position:relative;overflow:hidden;border:3px solid var(--ink)}
.fieldbox svg{display:block;width:100%;height:100%}
</style></head><body>
<div class="moire" aria-hidden="true"><i class="a"></i><i class="b"></i></div>

<!-- 開場：不是 hero。首屏直接是場本身 + 一組讀數 + 一組控制 -->
<header class="fieldbox" style="height:min(52vh,380px);border-left:0;border-right:0">
  <div class="fx" data-field='{"field":"fold","unit":"bar","k":13,"a":0.34,"cell":21}'></div>
  <div class="no">場：摺 FOLD　k=13　a=0.34</div>
  <div class="cnt"></div>
  <noscript><div style="position:absolute;inset:0;
    background:repeating-linear-gradient(90deg,var(--ink) 0 9px,var(--paper) 9px 18px)"></div></noscript>
</header>

<section class="sect"><div class="wrap">
  <div class="tag">標籤</div>
  <h2 style="margin-top:14px">兩行的標題<br>第二行比第一行長</h2>
  <p style="margin-top:14px;max-width:64ch">內文。</p>
</div></section>
<div class="rule"></div>
</body></html>
```

---

## 十二、技術實作與相容性

本風格用三項技術承載三個不同的不可省略特徵，分屬三層（渲染 / 時間軸 / 感測），不集中於同一層。

### 12.1 CSS scroll-driven animations（`animation-timeline: scroll()`）

**承載**：特徵 1 的「連續參數」。莫列上層的角度由 0.35° 連續轉到 3.6°，參數就是讀者自己的捲動位置——Riley 的畫要觀者移動才會動，這是它在瀏覽器裡最直接的對應。

- **支援現況（2026-08-09 查證）**：Chrome 115+（2023-07-18）、Edge 115+、Safari 26+（2025-09-15）、**Firefox 尚未支援**（standards-position 為 positive，bug 1324602／1676779）。web-features 標為 **Limited availability**，Baseline 自 2025-09 起被 Firefox 阻擋；已列入 Interop 2026。
- **查證來源**：web-features explorer `scroll-driven-animations`（<https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations/>）、MDN《CSS scroll-driven animations》。
- **fallback 具體行為**：整段包在 `@supports (animation-timeline: scroll())` 內。不支援時上層停在 `transform:rotate(1.6deg)` 的靜態莫列——**畫面仍然是完整的歐普，只是干涉帶不隨捲動變化**，沒有任何內容或功能損失。`prefers-reduced-motion` 走同一條路徑。

```css
@supports (animation-timeline: scroll()){
  @keyframes moireTurn{ from{transform:rotate(.35deg)} to{transform:rotate(3.6deg)} }
  .moire i.b{ animation:moireTurn linear both; animation-timeline:scroll(root block); }
}
```

### 12.2 CSS `mask-image` / SVG `<mask>` 幾何遮罩

**承載**：特徵 5 的反轉波前（`mask-position` 掃過的白色 difference 疊層）、以及特徵 4 的 knockout 大字（SVG `<mask>` 把字從場裡挖掉）。

- **支援現況（2026-08-09 查證）**：`mask-image` 為 **Baseline 2023**（自 2023-12 起跨瀏覽器可用）；Chrome/Edge 120+、Firefox 53+、Safari 15.4+。SVG `<mask>` 元素支援更早。
- **查證來源**：MDN `mask-image`、caniuse `mdn-css_properties_mask-image` / `css-masks`。
- **fallback 具體行為**：仍保留 `-webkit-` 前綴一併宣告。若 `mask-image` 完全不生效，`::after` 的白色 difference 疊層會**永遠覆蓋整個元件**——為避免這種「整站反相」的破圖，疊層預設 `mask-position:100% 0`（即完全遮蔽）；因此不支援時的正確退化是把它包進 `@supports (mask-image:linear-gradient(#000,#000))`，不支援即改用 `aria-current` 直接切換 `background`/`color` 兩個變數，狀態仍然是圖地反轉，只是沒有波前掃過的過程。

```css
@supports not (mask-image: linear-gradient(#000,#000)){
  .rv::after{ display:none; }
  .rv[aria-current],.rv:hover{ background:var(--ink); color:var(--paper); }
}
```

### 12.3 `ResizeObserver`

**承載**：特徵 3 的「整數格 + 被四邊切斷」。任何視窗寬度下都必須重算格數，否則場會被拉伸（破壞硬邊）或留白（破壞全幅）。

- **支援現況（2026-08-09 查證）**：**Baseline Widely available**，自 2020-07 起跨瀏覽器可用。
- **查證來源**：MDN `ResizeObserver`。
- **fallback 具體行為**：`if(window.ResizeObserver){…} else { window.addEventListener('resize', draw) }`，行為相同、只是不會回應容器（非視窗）尺寸變化。

### 12.4 效能預算實測（範例站，2026-08-09）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline CSS/JS，不含 Google Fonts） | 28.5–44.6 KB | ≤350 KB |
| 場引擎生成一張 48×30 格（1,328 個 `<rect>`）| 0.85 ms／張 | — |
| 首屏 JS 執行（首頁：鼓 14 片 + 6 張場圖） | < 10 ms | ≤100 ms |
| 主要動畫 | 鼓與莫列皆為 GPU 合成的 `transform`，零逐幀 JS | 60 fps |
| 外部資源 | 僅 Google Fonts 兩個家族 | 零外部圖片／音檔 |

**效能守則**：場圖是字串拼接後一次 `innerHTML`，不要逐格 `createElement`；游標驅動的場用 rAF 節流並只重畫標了 `data-live` 的容器；縮圖格數壓在 24×14 以內；不要對 `<rect>` 逐個掛 transition。

### 12.5 可及性與安全

- 高對比高頻條紋可能引發不適、頭暈或（罕見地）光敏性反應。**必備**：常駐可達的「靜止」控制、`prefers-reduced-motion` 全面降級、不做 >3Hz 的閃爍、在使用說明處寫明風險。
- `--mark` 是唯一彩色，因此 focus ring 必須用它（`outline:3px solid var(--mark); outline-offset:2px`），不能只靠圖地反轉——反轉在高對比畫面裡不足以標示鍵盤焦點。
- 圖地反轉作為狀態時，務必同時給 `aria-current` / `aria-pressed`；螢幕閱讀器讀不到「黑白對調」。
- 每一張 `plate()` 產生的 SVG 都要有 `role="img"` 與 `aria-label`，說明它是什麼場。

---

*本規格書隨 Design Skills Center 範例站「視動社 OPTOKIN LAB」發行。範例站的品牌、人名、價格為虛構；所引用的作品、人物、年代與知覺現象出處為真實公開資料。*
