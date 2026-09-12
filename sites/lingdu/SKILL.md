---
name: mid-century-facet-fauna
description: Mid-century modern flat-facet illustration system — cream ground, four saturated fields meeting without outlines, atomic-age motifs, and living subjects reduced to the fewest possible painted shapes.
---

# 中世紀現代・幾何面構成 Mid-Century Modern (Facet Fauna)

> 這份規格書描述的是一九五〇至六〇年代美國平面設計裡那一支「用最少的平塗面畫活的東西」的作法：Charley Harper 稱之為 *minimal realism*，Alexander Girard 把民俗母題壓成幾何色塊，原子時代的星芒與迴力鏢形則來自當時的印刷與工業設計語彙。它不是北歐簡約、不是瑞士國際主義、也不是扁平化 UI——判準是後面第一章那五項，五項同時成立才是這個風格。

---

## 一、本風格的 5 個不可省略特徵

### 特徵 1　主體由少量硬邊平塗面構成，零漸層、零明暗、零描邊

生物、器物、風景全部拆成可數的幾塊多邊形。**面與面之間不畫線**——分界完全靠色差。拿掉這一條，它就變成一般的扁平插畫。

```css
/* 圖版的絕對紀律 */
.facet{ fill: var(--teal); stroke: none; }   /* 永遠 stroke:none */
svg *{ filter: none; }                        /* 不准有陰影、模糊、質感濾鏡 */
```

```svg
<!-- 一隻鳥的最小骨架：身 → 翼 → 初級飛羽 → 頭 → 喙 → 眼，六面 -->
<svg viewBox="0 0 200 150">
  <path d="M136 62L129 90L106 105L79 98L69 74L79 51L106 44L129 50Z" fill="#0E5F63"/>
  <path d="M110 45L143 74L82 88Z" fill="#15171B"/>
  <path d="M73 45a13 12 0 1 0 26 0a13 12 0 1 0-26 0Z" fill="#0E5F63"/>
  <path d="M62 41L34 44L34 48L62 52Z" fill="#15171B"/>
  <circle cx="70" cy="41" r="2.6" fill="#15171B"/>
</svg>
```

多邊形一律用 **7–10 個頂點**的圓周取樣，不要 40 邊形（那會變成貝茲曲線的偽裝）：

```js
const facet=(cx,cy,rx,ry,n=9,rot=.3)=>Array.from({length:n},(_,i)=>{
  const t=rot+i/n*Math.PI*2; return [cx+rx*Math.cos(t), cy+ry*Math.sin(t)];});
```

### 特徵 2　原子時代母題：星芒・迴力鏢・變形蟲・分子

裝飾一律從這四種原語長出來，不可用線框圖示、不可用 emoji、不可用 icon font。它們是程序生成的，不是畫的。

```js
function starburst(cx,cy,r,n,col){let s='';
 for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=r*(0.62+((i*37)%38)/100);
  const x=cx+Math.cos(a)*k,y=cy+Math.sin(a)*k;
  s+=`<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${col}" stroke-width="1.4"/>`
   + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9" fill="${col}"/>`;}
 return s+`<circle cx="${cx}" cy="${cy}" r="3.4" fill="${col}"/>`;}
function boomerang(cx,cy,w,h,rot,col){
 const p=[[-w/2,h*.5],[0,-h*.5],[w/2,h*.5],[w*.34,h*.62],[0,-h*.02],[-w*.34,h*.62]];
 const c=Math.cos(rot),s=Math.sin(rot);
 return `<path d="${p.map((q,i)=>(i?'L':'M')+(cx+q[0]*c-q[1]*s).toFixed(1)+' '+(cy+q[0]*s+q[1]*c).toFixed(1)).join('')}Z" fill="${col}"/>`;}
```

母題帶（`motifBand`）是本風格的分節工具：一條 44–52px 高的橫帶，星芒／迴力鏢／變形蟲／分子以決定性亂數交替排列，用來取代「一條分隔線」。

### 特徵 3　暖米地＋三塊高飽和色域，色與色直接咬合

四塊顏色都是「地」，沒有主色與背景色之分。**兩塊色域之間永遠不放描邊、不放白邊、不放陰影、不放圓角**——這一點正好與描邊系統（如印度卡車藝術）相反，也是它與 neubrutalism 的分界。

```css
:root{
  --cream:#EFE2C4;  /* 亞麻米・約 32%，它是一塊顏色，不是留白 */
  --teal:#0E5F63;   /* 鴨綠・約 20% */
  --orange:#DC4B1E; /* 朱橘・約 14%，動作與現用態 */
  --mustard:#E3A21A;/* 芥末・約 10% */
  --ink:#15171B;    /* 墨・約 18%，文字、眼睛、細線母題 */
  --shell:#FDF8EC;  /* 蛋殼白・約 6% */
}
*{border-radius:0}
.field{background:var(--teal);color:var(--shell)}      /* 滿版色域，直接接下一塊 */
.field + .field{border:0;margin:0}                      /* 中間什麼都不放 */
```

輔助色（灰藍 `#7C99A0`、苔綠 `#6E7F3A`、沙 `#C9A97A`）只給圖版內部，不給介面。

### 特徵 4　幾何無襯線的極端字幅對比

同一屏上必須同時有「極大的細數字」與「極小的寬字距全大寫標籤」。字體用 Futura 系（Google Fonts 取 **Jost**），中文用 Noto Sans TC 900 並拉開 0.05em 以上的字距。**不准出現襯線體、不准出現圓體、不准出現等寬字。**

```css
.num{font-family:"Jost",sans-serif;font-weight:300;font-size:clamp(52px,11vw,132px);
     line-height:.86;font-variant-numeric:tabular-nums}
.lab{font-family:"Jost",sans-serif;font-weight:500;font-size:11px;
     letter-spacing:.24em;text-transform:uppercase}
h1,h2,h3{font-family:"Noto Sans TC",sans-serif;font-weight:900;letter-spacing:.05em}
```

### 特徵 5　無透視的水平分層構圖

畫面由整幅的水平色帶疊成：天／堤／水／灘／前景。物件只在色帶上左右排列，**永遠不投影、不透視、不縮小表示遠近**；重疊處直接以硬邊互相遮蓋。

```css
.scene{display:block}                       /* 整幅色帶，不留邊 */
.band{padding:64px 0}                       /* 頁面本身也是一疊色帶 */
.band + .band{margin:0}
```

```svg
<rect y="0"   width="2400" height="120" fill="#BFD3CE"/><!-- 天 -->
<rect y="120" width="2400" height="58"  fill="#DCE3D6"/>
<rect y="202" width="2400" height="14"  fill="#1E2E30"/><!-- 堤 -->
<rect y="216" width="2400" height="164" fill="#C9A97A"/><!-- 灘 -->
<rect y="216" width="2400" height="46"  fill="#0E5F63"/><!-- 水，蓋在灘上 -->
```

---

## 二、設計哲學

**多畫的部分不會讓人認得比較快。** 這個流派誕生於絹印與平版的年代：一塊色就是一塊版、一次上機、一筆錢。因此「少畫一面」不是美學潔癖，是製作成本。設計者的工作不是往白紙上加東西，而是從一張什麼都有的稿子上**拿**：拿掉這一面，它還是它嗎？

由此推出三條可操作的判準（本風格的驗收就是它們）：

1. **輪廓**——剩下的面聯集，是否仍覆蓋原輪廓的 92% 以上。
2. **診斷面**——那一兩塊「拿掉就會認錯」的面是否還在，且顏色與吃掉它的鄰面不同。
3. **明暗**——剩下的相鄰面裡，是否還有一對的 CIE L\* 差 ≥ 34。全部一樣亮，在小尺寸下就是一團。

畫面上的一切（介面、插圖、logo、印記）都服從同一支引擎與同一組面，因此「換一個題材」＝「換一組參數」，不是換一套素材。

---

## 三、色彩系統

| 色票 | hex | 用途 | 面積比例 |
|---|---|---|---|
| 亞麻米 | `#EFE2C4` | 頁面地色、紙、圖版淺底 | 32% |
| 鴨綠 | `#0E5F63` | 滿版色域、水、footer 上緣 | 20% |
| 墨 | `#15171B` | 正文、眼睛、細線母題、木檯 | 18% |
| 朱橘 | `#DC4B1E` | 現用態、連結、主要動作、退件 | 14% |
| 芥末 | `#E3A21A` | 第二色域、標籤、腳與喙 | 10% |
| 蛋殼白 | `#FDF8EC` | 卡片、反白文字 | 6% |
| 深鴨綠 | `#0A4448` | footer、圖版深底 | — |
| 灰藍 / 苔綠 / 沙 | `#7C99A0` `#6E7F3A` `#C9A97A` | 只用於圖版內部 | — |

**硬規則**

- 全站零漸層（`linear-gradient`／`radial-gradient` 一律禁用；`conic-gradient` 亦禁）。
- 全站零 `box-shadow`、零 `filter: drop-shadow`、零 `border-radius`。
- 色域之間不得有描邊、白邊、間隙。表格的 1.5px 墨線是排版元素，不是色域邊界，只准出現在文字表格裡。
- **圖版底色由圖版自己決定**：在 `#EFE2C4 / #C9A97A / #7C99A0 / #0A4448` 四塊候選中，取「與圖上所有面的明度差之最小值」最大的那一塊，並排除與任何一面同色者。小面（面積 <6%）的差值乘 1.9 再比。這條規則讓白鷺自動落在深底、黑水雞自動落在米底。

```js
const GROUNDS=["#EFE2C4","#C9A97A","#7C99A0","#0A4448"];
function ground(facets){/* facets: [{area, L, hex}] */
 let best=GROUNDS[0],bv=-1,A=facets.reduce((s,f)=>s+f.area,0);
 for(const g of GROUNDS){ const gl=L(g); let mn=1e9,dq=false;
  for(const f of facets){ if(f.hex.toUpperCase()===g){dq=true;break;}
   let d=Math.abs(gl-f.L); if(f.area/A<0.06)d*=1.9; mn=Math.min(mn,d);}
  if(!dq&&mn>bv){bv=mn;best=g;} }
 return best;}
```

---

## 四、字體系統

- 拉丁：**Jost**（Futura 替代）300 / 400 / 500 / 700。
- 中文：**Noto Sans TC** 400 / 700 / 900。
- 級距（rem 基準 16px）：
  - 巨數字 `clamp(52px,11vw,132px)` / weight 300 / line-height .86
  - h2 `clamp(26px,3.4vw,42px)` / weight 900 / letter-spacing .05em / line-height 1.18
  - h3 `clamp(19px,2vw,24px)` / weight 900
  - 內文 16px / line-height 1.85 / letter-spacing .02em / `max-width:60ch`
  - 標籤 `.lab` 11px / weight 500 / letter-spacing .24em / uppercase
  - 表格 14.5px，表頭 10.5px letter-spacing .2em uppercase 反白
- 字距是本風格的識別點：**標籤 ≥ .18em，標題 ≥ .05em**，正文不加字距以外的裝飾。
- 數字一律 `font-variant-numeric: tabular-nums`。

---

## 五、版面與網格

- 內容寬 `max-width:1180px`，左右 26px（≤560px 收 16px）。
- 頁面是**一疊滿版色帶**（`.band`，上下 padding 64px；≤900px 收 44px），色帶之間零間隙。
- 主要區塊採 1:1 或 1.35:1 的兩欄硬切（`.two{display:grid;grid-template-columns:1fr 1fr;gap:0}`），**gap 永遠是 0**——兩塊顏色要咬在一起。
- 卡片牆用 **subgrid** 對齊每張卡的內部橫線（見第九章）：

```css
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:0}
.card{display:flex;flex-direction:column}      /* fallback */
@supports (grid-template-rows:subgrid){
  .cards{grid-template-rows:auto}
  .card{display:grid;grid-row:span 6;grid-template-rows:subgrid;gap:0}
}
```

- 卡片之間不用 gap 分隔，用 `outline:2px solid var(--cream);outline-offset:-1px` 讓地色本身變成溝縫。
- 留白規則：色域內部 padding 22–34px；**不要用留白製造層級，用顏色**。

---

## 六、元件配方

**導覽（畫記湊組 tally-five）**：桌機固定右上，每頁一組四豎畫記；現用頁那一組多一筆斜劃、整格翻朱橘底。≤900px 落為墨底四格橫列。

```css
#nav{position:fixed;top:0;right:0;background:var(--cream);padding:16px 20px 14px}
#nav a{padding:8px 12px 9px;color:var(--ink)}
#nav a[aria-current=page]{background:var(--orange);color:var(--shell)}
#nav .b5{opacity:0}              /* 第五劃 */
#nav a[aria-current=page] .b5{opacity:1}
```

**按鈕**：方角、無陰影、11–12px 全大寫寬字距。

```css
.btn{font-family:"Jost";font-size:12px;letter-spacing:.2em;text-transform:uppercase;
 padding:13px 22px;border:0;background:var(--ink);color:var(--shell)}
.btn:hover{background:var(--orange)}
.btn.gh{background:transparent;color:inherit;box-shadow:inset 0 0 0 2px currentColor}
```

（`inset box-shadow` 是本風格唯一允許的 box-shadow 用法：它畫的是實線框，不是陰影。）

**卡片**：`background:var(--shell)`，`outline` 當溝縫，hover 整張翻芥末底；圖版區的底色由 `ground()` 決定，不繼承卡片色。

**表單**：輸入框無邊框、以 `outline:2px solid var(--ink);outline-offset:-2px` 代替 border，focus 換 3px 朱橘。錯誤訊息用朱橘粗體直接寫規則，不用 icon。

**footer**：深鴨綠底，頂端壓一條 46px 母題帶，四欄 `repeat(auto-fit,minmax(210px,1fr))`。

---

## 七、動效規則（四式，缺一不可）

| 類型 | 內容 | 觸發 | 時間／曲線 |
|---|---|---|---|
| ambient 環境 | **真實時刻的天光與潮位**：天空三條色帶、日／月位置、水緣高度由使用者當下的時刻與潮汐推算決定，每 60 秒重算；水光橫紋 26s 線性漂移 | 無 | 60s 輪詢／26s linear infinite |
| input 輸入 | 觀察窗左右搖攝（pointer 拖曳／方向鍵）；面 hover 上浮 2.5px 並在讀數列寫出它會被誰吃掉；卡片 hover 整張翻芥末 | 指標／鍵盤 | 120ms linear（延遲 <100ms） |
| transition 轉場 | **窗板推移**：進頁時各區塊以 `clip-path:inset(0 0 100% 0)` → `inset(0)` 由上而下推開，區塊間 stagger 60ms | 載入 | 500ms cubic-bezier(.2,.85,.3,1) |
| signature 簽名 | **併面 facet-merge**（見下） | 點擊／Enter | 300ms linear + 340ms 吞嚥 |

**併面 facet-merge**：拿掉一面時，它不會留下破洞——它的 `fill` 在 300ms 內補間成吸收者的顏色，同時它自己的舊色以 1.6px 描邊出現再淡出（那是分界線最後消失的一幕），吸收者則在 340ms 內脹到 1.022 倍再回穩（它剛吃下一塊）。

```css
.fct{transition:fill .30s linear, stroke-opacity .34s linear, transform .12s linear;
     transform-box:fill-box; transform-origin:center}
.fct:hover{transform:translate(0,-2.5px)}
.absorb{animation:absorb .3s cubic-bezier(.3,1.5,.5,1)}
@keyframes absorb{0%{transform:scale(1)}42%{transform:scale(1.022)}100%{transform:scale(1)}}
@media(prefers-reduced-motion:reduce){
  *{animation-duration:.001ms!important;transition-duration:.001ms!important}
  .slat{clip-path:none}
}
```

降級後：天光與潮位照樣依時刻換（只是不漂移）、拖曳照常（那是控制項不是動畫）、轉場瞬間到位、併面瞬間完成——**四式的資訊零損失**。

---

## 八、插畫與圖像風格（facet-fauna 幾何面禽鳥構成）

全站不得出現任何照片、任何外部圖片、任何線描圖示。所有圖像都是同一支引擎的輸出，資料結構只有一種：

```js
facet = { id, nm, ring:[[x,y]...], c:色票名, ab:吸收者id|'ground'|null, diag:bool }
```

- `ab` 指向這一面被拿掉時併入的鄰面；`ab:'ground'` 表示它在外緣（腳、冠羽），拿掉就消失、輪廓真的變少；`ab:null` 是根（身），不可拿掉。
- 繪製 = 依 z 序畫出每一面，顏色為「沿吸收鏈往上找到的第一個被保留的面」的顏色。**被拿掉的面不是不畫，是改用鄰面的顏色畫**——這就是「併面」在資料上的意思。
- 母題（星芒／迴力鏢／變形蟲／分子）與圖版共用同一組色票，並以 FNV-1a → mulberry32 決定性亂數生成，同輸入恆得同圖。

判準：**拿掉全部顏色，仍讀得出它是由幾塊面拼成的、哪一塊是喙。**

明文禁用：`feTurbulence` 手抖濾鏡、半調網點、交叉排線、細線幾何線描、任何描外形的寫實插畫、任何 `stroke-linecap:round`。

---

## 九、Logo 與 Favicon

- Logo = 一塊 `104px` 寬的實色方塊 + 一隻六面的鳥 + Jost 700 全大寫寬字距字標 + 兩條不等長的色條 + 一枚星芒。方角、無描邊。
- Favicon 用同一支引擎輸出成 34×34 的 inline SVG data URI（不得外連檔案）：

```html
<link rel="icon" href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34"><rect width="34" height="34" fill="%23EFE2C4"/><path d="M31 17L28.1 24.5L20.5 29L13 26.5L10 19L13 11.5L20.5 7L28.1 11.5Z" fill="%230E5F63"/><path d="M3 15L16 12L16 22L3 19Z" fill="%2315171B"/><path d="M14 20L30 18L29 30L15 29Z" fill="%23DC4B1E"/></svg>'>
```

---

## 十、Do & Don't

**Do**

- 先問「這一面拿掉還認得出來嗎」，再決定畫幾面。
- 讓兩塊顏色直接咬在一起，中間什麼都不放。
- 用巨大的細數字與極小的寬字距標籤製造層級。
- 讓介面本身遵守同一條規則（例如「大小＝資訊密度」「圖地反轉」——本風格是「少即是可辨識」，所以導覽的現用態用**多一筆畫記**表示，而不是加顏色以外的裝飾）。
- 圖版底色交給演算法決定，不要每張手挑。

**Don't**

- 不要漸層、不要陰影、不要圓角、不要模糊、不要玻璃、不要 3D 打光。
- 不要在色域之間畫線或留白邊。
- 不要用線框 icon、emoji、icon font。
- 不要為了「有機感」加手抖濾鏡或紙紋——這個流派的紙是平的。
- 不要用襯線體、圓體或等寬字。
- 不要 Lorem ipsum、不要「EST. 19xx」徽章、不要「把 X 變成 Y」句式標題。
- 不要把米色當「留白」——它是四塊顏色裡的一塊，該有東西壓在上面。

---

## 十一、頁面骨架範例

```html
<body>
<nav id="nav" aria-label="主導覽"><ul>
  <li><a href="a.html" aria-current="page">
    <svg class="tl" viewBox="0 0 44 20" aria-hidden="true"><g stroke="currentColor" stroke-width="2.6">
      <line x1="6" y1="3" x2="6" y2="17"/><line x1="13" y1="3" x2="13" y2="17"/>
      <line x1="20" y1="3" x2="20" y2="17"/><line x1="27" y1="3" x2="27" y2="17"/>
      <line class="b5" x1="3" y1="17.5" x2="31" y2="2.5" stroke-width="3.2"/>
    </g></svg>
    <span class="nm lat">OBSERVATION</span><span class="zh">觀察窗</span></a></li>
</ul></nav>

<header class="wrap mast"><svg class="logo" viewBox="0 0 100 100">…</svg>
  <div><div class="tt">站名</div><div class="en">LATIN NAME　·　章節</div></div></header>

<main>
  <!-- 滿版色帶 1：一整幅無透視分層構圖 -->
  <section class="wrap slat"><div class="hide">
    <div class="slit"><svg viewBox="0 0 1600 380">…水平色帶＋幾何面主體…</svg></div>
    <div class="ledge">
      <div><div class="lab">此刻</div><span class="num" style="font-size:34px">07:20</span></div>
      <div><div class="lab">讀數</div><span class="num" style="font-size:34px">2.86</span> <span class="tag">公尺</span></div>
    </div>
  </div></section>

  <!-- 滿版色帶 2：翻鴨綠 -->
  <section class="band t-teal"><div class="wrap">
    <div class="kick">小節標</div><h2>一句話的主張。</h2>
    <div class="two"><div class="pad">…</div><div class="pad" style="background:#0A4448">…</div></div>
  </div></section>

  <!-- 滿版色帶 3：subgrid 卡片牆 -->
  <section><div class="wrap"><div class="cards">
    <article class="card">
      <div class="fig" style="background:#0A4448"><svg viewBox="…">…</svg></div>
      <div class="idn"><span class="lab lat">NO.01</span></div>
      <div class="zh">名稱</div><div class="lab lat">latin</div>
      <div><span class="chip">標籤</span></div><div class="dgs">…</div>
    </article>
  </div></div></section>
</main>

<footer><div class="wrap">
  <svg class="motif" viewBox="0 0 1180 46">…母題帶…</svg>
  <div class="cols">…</div>
</div></footer>
</body>
```

---

## 十二、技術實作與相容性

本站的視覺由三項技術承載，每一項都在建站當日（2026-09-01）查證過支援現況。

### 12.1 CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 5 的模矩紀律——圖鑑卡牆上每一張卡的內部六列（圖版／編號／中名／學名／標籤／診斷面）共用同一列的軌道高度，所以整排卡片的橫線是連通的。媒體查詢與 flex 都做不到這件事，因為每張卡的文字長度不同。

**支援**：Baseline **Newly available（2023-09-15）**，三引擎齊備——Chrome/Edge 117+、Firefox 71+、Safari 16+、Opera 103+、Samsung Internet 24+（查證：caniuse `css-subgrid`、web.dev《Baseline 2023》）。

**Fallback**：`.card` 預設 `display:flex;flex-direction:column`，整段 subgrid 包在 `@supports (grid-template-rows:subgrid)` 內。不支援時卡片仍完整、可讀、可篩選，只是橫線不對齊——資訊零損失。

### 12.2 `matchMedia` + 真實時刻驅動（B 動效與時間軸層）

**承載**：ambient 動效——首屏天空三條色帶、日／月的水平位置、水緣高度與「此刻在灘上」的名單，全部是使用者當下時刻與一份兩分潮（M2 12.4206h、S2 12h）簡化調和推算的函數，每 60 秒重算。`window.matchMedia('(prefers-reduced-motion: reduce)')` 與其 `change` 事件用來即時切換水光漂移。

**支援**：`MediaQueryList` 的 `change` 事件為 **Baseline Widely available**，自 2020-09 起跨瀏覽器（查證：MDN《MediaQueryList: change event》）。`Date`、`setInterval` 無支援問題。

**Fallback**：關閉 JavaScript 時，頁面內嵌的是建置階段算好的靜態場景（10 月 4 日 07:20），並在窗下明寫這件事；四頁全部文字、表格、圖版與 24 張圖鑑皆為靜態 HTML/SVG，完整可讀。`prefers-reduced-motion` 下水光停止漂移，但天光與潮位照常依時刻更新——那是資訊不是動畫。

### 12.3 窮舉式規則引擎（E 資料與生成層）

**承載**：三條驗收與「最少面數」。狀態空間是「保留哪些面」的子集合；根面不可刪，故 12 面的鳥有 2^11 = 2048 種取捨。引擎對每一個子集合計算：

- **輪廓**：把圖版打成 1.8 單位的方格，逐格由上往下找第一個「解析後不為 null」的面；覆蓋格數／總格數。
- **診斷面**：每一枚診斷面必須可見，且其解析色 ≠ 吸收者的解析色。
- **明暗**：由格陣的四鄰接關係求出面與面的相鄰表，取相鄰且異色者的 CIE L\* 差最大值。

**效能實測（Node 22，本站 24 種鳥）**：`analyse()`（1.8 單位格陣、約 1,100 格）平均 **18 ms**；`enumerate()` 2048 個子集合平均 **31 ms**。頁面上 `analyse` 在換鳥時執行一次，`enumerate` 延後 60 ms 於閒置時執行，兩者都不在首屏關鍵路徑上。單頁大小：首頁 113 KB、圖鑑 77 KB、減面台 74 KB、報名頁 77 KB（全部資源 inline，僅外連 Google Fonts），皆遠低於 350 KB。逐格計算只讀取純陣列、不觸碰 DOM；動畫只改 `fill`、`stroke-opacity` 與 `transform`，不觸發 layout。

**無支援缺口**：純 JavaScript 陣列運算，無瀏覽器 API 依賴。關閉 JavaScript 時，減面台仍顯示完整的十二面圖版與三條驗收的文字說明。

### 12.4 其他

- `localStorage`（跨頁保存「你減的那一版」）包在 try/catch，失敗時介面明寫「這個瀏覽器不讓存」。
- 下載向量檔用 `Blob` + `URL.createObjectURL`（Baseline Widely available），輸出的是同一支引擎的 SVG 後端，不是螢幕截圖。
- 全站無外部圖片、無音檔；唯一外部資源是 Google Fonts。
