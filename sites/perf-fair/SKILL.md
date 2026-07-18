---
name: philatelic-postmark
description: A pastel postal design language of perforated tiles, engraved stipple vignettes, double-ring cancellation marks and denomination numerals, where zoom level is the information hierarchy.
---

# 郵票郵戳美學（Philatelic Postmark）

這套語言來自郵票、郵戳與集郵冊：一枚郵票是一格被齒孔框住的微型版面，上面同時擠著面額、國名、年份、雕刻圖與齒孔——**極小的面積、極高的資訊密度、極嚴格的邊界**。郵戳則是蓋在它上面的第二層：雙環、波狀銷線、地名與日期，帶著隨機的偏轉角與壓力不均。

它的核心信念是：**資訊有距離。** 郵票這種東西，離遠了只看得見色塊與面額，湊近了才讀得到雕刻線。版面應該誠實地複製這件事——不是把所有資訊同時攤平給使用者，而是**讓資訊隨著鏡頭推近長出來**。

適用於任何「有大量同構單元、每個單元都有代碼與分類」的產業：展會、票務、目錄、收藏、檔案、地方誌、圖書館、物流、公共服務、資料庫型網站。

## 設計哲學

1. **齒孔即邊界。** 每個內容單元都被一圈咬出來的孔位框住。孔不是裝飾邊框，是「這裡可以被撕下來、單獨存在」的宣告。不要用圓角卡片與模糊陰影，用齒孔。
2. **面額是最大的字。** 一枚郵票上最醒目的永遠是數字。把價格、編號、數量做成 Bodoni 這類高對比襯線體的大數字，讓數字承擔視覺重量，標題退到 15–19px。
3. **縮放是資訊層級，不是尺寸。** 遠景給分類與量體，中景給名稱，近景給細節。同一份資料在不同距離是四份不同的內容。
4. **蓋戳是承諾。** 使用者的每一次選取都應該留下一枚物理性的痕跡：偏轉角、壓印感、覆蓋在內容之上。選取不是加亮邊框。
5. **公文腔的幽默。** 文案一本正經地用郵政／行政語彙描述業務（郵區、資費、投遞、窗口、銷戳），幽默來自比喻的貫徹到底，不來自語助詞。

## 色彩系統

**結構色（占 90%）**

| 用途 | 色票 | 比例 |
|------|------|------|
| 頁底 郵政淡青 `bg` | `#C7DBD4` | 約 45% |
| 深一階底 `bg2`（縮放舞台） | `#B6CFC7` | 約 8% |
| 版面／小全張紙 `sheet` | `#F7F4EC` | 約 25% |
| 郵簡杏（次層面板、表頭、票根） `paper` | `#F0E6D2` | 約 12% |
| 郵戳墨 `ink`（文字、實線、底部櫃台） | `#23292B` | 文字與線 |
| 次文字 `ink2` | `#4A5457` | 說明文字 |
| 分隔線 `line` | `#9DB4AC` | 1px 細線 |

**郵區強調色（占 10%，一律成組出現）**

| 分類 | 色票 | 對應 tint（郵票底） |
|------|------|------|
| 100 朱 | `#C8503F` | `#F3DDD7` / `#EED2CA` |
| 220 航空藍 | `#4A6FA5` | `#DCE4EF` / `#D0DCEB` |
| 330 郵綠 | `#3E7A63` | `#D9E7DF` / `#CCE0D5` |
| 440 芥末 | `#B98B2E` | `#F0E5CB` / `#EADCB9` |
| 點綴 淡粉 `blush` | `#E3B3A6` | 僅用於底欄當前頁與小標 |

規則：

- 每個分類先被指派一組「主色 + 兩階 tint」，之後在郵票底、卡片邊、圖表、平面圖區塊全站貫徹，使用者最終靠顏色導航。
- **兩階 tint 交錯使用**（依索引奇偶），模擬 se-tenant 連刷小全張上同一組票的深淺差。這是這套語言最容易被忽略、卻最像真郵票的一步。
- 主色只用在文字、細框與小面積實心；**大面積實心色塊會立刻破壞 pastel 底的空氣感**。
- 底部導覽與表頭是全站唯二的大面積墨黑，用來壓住整體的輕。

## 字體系統

全部來自 Google Fonts：

```html
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,700;6..96,900&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Serif+TC:wght@400;600;900&display=swap" rel="stylesheet">
```

| 角色 | 字體 | 用法 |
|------|------|------|
| 面額／統計數字 | **Bodoni Moda 900**（`--num`） | 郵票面額、讀數、序號。高對比襯線＝雕刻凹版的印刷感，字距 `-.02em` |
| 代碼／標籤／英文小標 | **IBM Plex Mono 400–600**（`--mono`） | 郵區代碼、攤位號、`L2 ×1.48`、`PF-261017-113`。字距一律 `.10–.30em`，字級 9–11px |
| 中文標題與內文 | **Noto Serif TC 400/600/900**（`--han`） | 標題 900、小標 600、內文 400。行高 1.75 |

字級 scale（桌機）：`clamp(24px,3vw,34px)` 頁面標題 → 19px 區塊標題 → 15px 面板標題 → 14px 內文 → 13px 次要 → 11px 說明 → 10px mono 標籤 → 9px mono 微標。**除了面額與讀數，全站沒有大於 40px 的字。**

## 版面與網格

- **邊紙 selvage 刊頭**：頁首是一條 `#F7F4EC` 橫帶，底部以 `radial-gradient` 打出一排 16px 間距的底色圓孔（`bottom:-9px`），視覺上整張頁面是從一版郵票上撕下來的。刊頭右側是一列以 1px 直線分隔的 mono meta（屆數／日期／場地／攤數）。
- **小全張網格**：`grid-template-columns:repeat(8,108px); gap:11px`，郵票 108×140px。手機降為 4 欄，**不縮小郵票尺寸**——郵票是實體，實體不會因為螢幕變小而變小，讓它超出畫面由平移解決。
- **不對稱**：主要內容區採 `1.05fr .95fr`（郵路頁）或 `1.35fr 1fr`（首頁導言），左重右輕；篩選列以不等寬 `.fcell` 用 1px 直線切格，刻意不對齊成整齊的三欄。
- **零圓角**：全站 `border-radius:0`。所有邊框 1px（細線）、1.5px（可互動元件）或 2px（面板）三種寬度，沒有第四種。
- **留白規則**：面板內距 13–16px，區塊間距 18–20px，section 間距 26px。密度取「極密」——寧可多一列資訊，不要多一段空白。
- **底欄佔位**：`body{padding-bottom:86px}` 為固定櫃台留位，sticky 元素貼在 `bottom:88px`。

## 元件配方

### 齒孔（本語言的核心零件）

```css
.stamp{position:relative;overflow:visible;background:var(--tint)}
.stamp::after{
  content:"";position:absolute;inset:-5.5px;pointer-events:none;z-index:4;
  background:
    radial-gradient(circle 5px at 5.5px 5.5px,var(--sheet) 97%,transparent 100%) 0 0/11px 11px repeat-x,
    radial-gradient(circle 5px at 5.5px 5.5px,var(--sheet) 97%,transparent 100%) 0 100%/11px 11px repeat-x,
    radial-gradient(circle 5px at 5.5px 5.5px,var(--sheet) 97%,transparent 100%) 0 0/11px 11px repeat-y,
    radial-gradient(circle 5px at 5.5px 5.5px,var(--sheet) 97%,transparent 100%) 100% 0/11px 11px repeat-y;
}
```

四層漸層分別以 `repeat-x`／`repeat-y` 只鋪一排，圓點顏色＝**背後那張紙的顏色**（不是白色）。`inset` 取負值讓孔心落在邊界線上，孔才會「跨在邊上」。**元素必須 `overflow:visible`，否則 `::after` 會被裁掉。** 縮小版（卡片縮圖、章樣）改用 8px 網格、3.6px 半徑。

### 郵戳（選取狀態）

雙環 + 三條虛線銷線 + 兩行 mono 文字的 inline SVG，套一個由代碼雜湊決定的 −11°～+11° 偏轉角：

```js
var rot=((code.charCodeAt(1)*7+code.charCodeAt(2)*13)%23)-11;
```

**永遠不要用隨機數**——同一個項目每次進站的戳角必須一樣，那才像實體。

### 底部櫃台導覽（bottom-dock）

`position:fixed` 墨黑橫條，`grid-template-columns:repeat(4,1fr)`，每格三行：`窗口 0X`（mono 9.5px，淡粉）／中文名（900, 14.5px）／英文名（mono 9.5px, opacity .55）。hover 整格反白為紙色，當前頁底色改為 `blush` 並在上緣加一條 3px 朱線。手機隱藏英文行、字級降到 12px。

### 表格

`border-collapse:collapse`，1px `line` 格線，表頭 `paper` 底、700 字重、`white-space:nowrap`，數字欄 `font-family:var(--mono);text-align:right`。資費表與票種表都用同一組，不做斑馬紋。

### 按鈕與表單

按鈕：2px 墨邊、墨底紙字，hover 換成朱底朱邊。次要按鈕 `.gh` 透明底墨字，hover 反相。膠囊篩選鈕 `.pill`：1.5px 邊、mono 11px、`aria-pressed="true"` 時填滿該分類主色。輸入框 2px 墨邊、`sheet` 底、focus 時 `outline:2px solid #C8503F`。

### footer

2px 墨線分隔，三欄 `1.4fr 1fr 1fr`：主辦資訊與虛構聲明／分類圖例／窗口連結。全部 12.5px，聯絡資料用 mono `<code>`。

## 動效規則

| 動作 | 觸發 | 值 |
|------|------|-----|
| **蓋戳落章** | 項目被選取 | `scale(2.1)→1`、`opacity 0→1`，`.22s cubic-bezier(.2,1.5,.45,1)`，同時套用該項目的固定偏轉角 |
| **層級切換** | 縮放跨過門檻 | 無過渡，**瞬間**顯隱。資訊的出現要像對焦成功，不是淡入 |
| **縮放** | 滾輪／滑桿／雙擊／捏合 | 直接寫入 `transform`，不加 `transition`（跟手才對） |
| **角色行進** | 路線播放 | 每段 `max(420, min(1500, 長度×22))` ms 線性，沿折線依累積長度插值 |
| hover 反白 | 導覽、卡片 | `.16–.18s ease` 的 `background`／`color` |

禁止：淡入式的進場揭示、數字滾動計數、按壓硬陰影位移、`stroke-dashoffset` 描繪。這套語言的動效重點只有兩個——**推近時資訊長出來，選取時戳蓋下去**。

`prefers-reduced-motion: reduce` 下：所有 animation/transition 壓到 0.001ms；行進動畫改為直接跳至終點；縮放與層級邏輯完全保留（那是資訊架構，不是動效）。

## 插畫與圖像風格（illust = intaglio-stipple 雕凹版點刻）

郵票的雕刻師用點的疏密造調子。做法是**程序生成**，不是手畫路徑：

1. 每個母題寫成一個隱函數 `f(x,y) → 0..1`（x、y 為 0..1 正規化座標），值即該處的墨量。六個母題已足夠一整場：郵筒、山與地平、圓形花草、書冊、燈塔光、羽毛筆。
2. 在 `size/3.1` × `size/3.1` 的網格上取樣，每點加 ±0.375 格的抖動（用 LCG 偽亂數，種子由項目代碼推出 → 同一項目每次生成完全一樣）。
3. `f<=0.06` 不畫；否則畫半徑 `min(1.42, f*1.55)` 的圓，填該分類主色。

```js
function stipple(mi,size,ink,seed){
  var n=Math.round(size/3.1),o='',s=seed||1,f=MOTIFS[mi%MOTIFS.length];
  function rnd(){s=(s*1664525+1013904223)%4294967296;return s/4294967296;}
  for(var i=0;i<n;i++)for(var j=0;j<n;j++){
    var jx=(i+.5+(rnd()-.5)*.75)/n, jy=(j+.5+(rnd()-.5)*.75)/n, v=f(jx,jy);
    if(v<=.06)continue;
    o+='<circle cx="'+(jx*size).toFixed(1)+'" cy="'+(jy*size).toFixed(1)+'" r="'+Math.min(1.42,v*1.55).toFixed(2)+'"/>';
  }
  return '<svg viewBox="0 0 '+size+' '+size+'"><g fill="'+ink+'">'+o+'</g></svg>';
}
```

**只在需要時生成**（進入 L2 才產、產完快取），一枚 76px 的圖約 300–500 個 `<circle>`，四十枚一次生成會卡住主執行緒。

功能性圖標（須知、規則）另走一套：52×52 viewBox、2px 墨線骨架 + 2.2px 該分類主色重點線，`stroke-linecap:round`，零填色。**絕不使用 emoji。**

## Logo 與 Favicon 設計指南

Logo 是「一枚郵票被一枚郵戳壓住」的定式，三個零件缺一不可：

1. **郵票**：`paper` 底、1.4px 墨邊的方塊，內縮 6px 再畫一圈 0.7px 細框；四邊以底色圓點咬出齒孔（間距 17px、半徑 4px）。中央放一個 Bodoni 900 的數字（屆數／面額），上方一行 mono 微標。
2. **郵戳**：偏轉 −9°、壓在郵票右上角並溢出邊界的雙環（外環 2px、內環 0.9px）＋三條 `stroke-dasharray="5 3.4"` 的銷線，環內上下兩行 mono 文字（地名／日期）。溢出是關鍵——戳不會乖乖蓋在框裡。
3. **字標**：Noto Serif TC 900、字距 4，下方 mono 英文全大寫、字距 5.2，再壓一條 1.6px 朱色底線。

Favicon 用同一構圖的極簡版：底色方塊 + 雙環 + 三條虛線銷線 + 中央朱色小方塊，寫成 inline SVG data URI。**不要縮小整個 Logo 當 favicon**，16px 下齒孔與字標會糊成一團。

## Do & Don't

**Do**

- 用齒孔框住每一個可獨立存在的單元；孔的顏色＝背後的紙。
- 讓數字（面額、編號、讀數）當視覺主角，標題退居其次。
- 兩階 tint 交錯，模擬連刷色差。
- 分類色一經指派就全站貫徹：郵票底、卡片邊、平面圖區塊、圖例、統計。
- 代碼系統要真：`A01`、`100`、`PF-261017-113`、`D10.C08.A12` 這種可讀可複製的短碼撐起整體的系統感。
- 文案用郵政／行政語彙貫徹到底，具體到人名、分機、截稿日、退費比例。

**Don't**

- ❌ 不要紫藍漸層、不要置中大標＋兩顆按鈕＋三張圓角卡。
- ❌ 不要圓角與模糊陰影。這套語言只有一種陰影：`4px 4px 0 rgba(35,41,43,.22)` 的硬位移，且僅用於浮在縮放舞台上的資訊窗。
- ❌ 不要 emoji 當圖標，圖標一律自繪 SVG。
- ❌ 不要用隨機數決定戳角、齒孔或點刻——全部由代碼雜湊決定，重載後必須一模一樣。
- ❌ 不要把 pastel 底配上大面積飽和實心色塊。
- ❌ 不要「在當今快節奏的世界」「把 X 變成 Y」「EST. 19XX」這類 AI 腔與陳套徽章。
- ❌ 不要因為手機小就把郵票縮小；縮小的是視窗，不是實體。

## 頁面骨架範例

```html
<header class="selvage">
  <div class="selv-in">
    <a class="mark" href="index.html">
      <svg width="34" height="34" viewBox="0 0 34 34"><!-- 郵票+郵戳 --></svg>
      <span><b>齒孔祭</b><i>PERFORATION FAIR</i></span>
    </a>
    <div class="selv-meta">
      <span>第九屆・秋季場</span><span>2026.10.17 — 10.18</span><span>攤位 40</span>
    </div>
  </div>
</header>

<main>
  <section class="wrap pgtop">
    <h1><small>DIRECTORY　窗口 02</small>攤位名冊</h1>
    <p>一段用郵政語彙寫成、具體到數字的說明。</p>
  </section>

  <section class="wrap">
    <div class="plate">
      <div class="plate-hd"><h2>區塊標題</h2><span>SECTION LABEL</span></div>
      <div class="plate-bd">…</div>
    </div>
  </section>
</main>

<nav class="dock"><div class="dock-in">
  <a class="win" href="index.html"><kbd>窗口 01</kbd><strong>小全張</strong><em>SOUVENIR SHEET</em></a>
  …四格…
</div></nav>
```

一枚郵票的內部結構（層級 class `l1`/`l2`/`l3` 見下一章）：

```html
<button class="stamp" data-b="A01" aria-pressed="false" style="--tint:#F3DDD7;--zc:#C8503F">
  <span class="frame"></span>
  <span class="zc">100</span>
  <span class="cty l2">原創小說</span>
  <span class="engslot l2" data-b="A01"></span>
  <span class="denom"><sup>$</sup>280</span>
  <span class="foot2">
    <span class="bcode l1">A01</span>
    <span class="cname l1">白鴿通信社</span>
    <span class="pub l2">《海線寄信人》</span>
    <span class="more l3">簡介…<br>出攤：兩日　<b>新刊</b></span>
  </span>
  <span class="pm"></span>
</button>
```

## 第五章・首創技術實作配方：語意縮放導覽（Semantic Zoom）

**目標**：讓「縮放」取代選單成為主要導覽動作，且縮放改變的是**資訊量**而不是像素尺寸。任何有大量同構單元的資料集都能套用。

### 1. 結構

```
.stage   ← 視窗：position:relative; overflow:hidden; touch-action:none; tabindex=0
  .sheet ← 平面：position:absolute; transform-origin:0 0; data-lv="0..3"
    .grid → 單元 ×N（真實 DOM，不是 canvas，才有無障礙與 noscript 可讀性）
  .hud   ← 浮動資訊窗（絕對定位，不隨平面縮放）
```

### 2. 三個狀態變數

`z`（倍率）、`px`/`py`（平移）。所有互動最後都只寫這三個值，再統一 `apply()`：

```js
function apply(){
  clampPan();
  sheet.style.transform='translate('+px+'px,'+py+'px) scale('+z+')';
  var i=lvOf(z);
  if(sheet.dataset.lv!==String(i)){ sheet.dataset.lv=String(i); if(i>=2) drawEngravings(); measure(); }
}
```

**層級只在跨門檻時寫一次 dataset**，避免每幀觸發 reflow。層級改變後重新 `measure()`，因為單元高度可能隨層級變化。

### 3. 層級門檻與顯隱

```js
var LV=[{min:0,c:'L0',d:'只看得見分類色與數字。'},
        {min:.86,c:'L1',d:'代碼與名稱浮現。'},
        {min:1.35,c:'L2',d:'圖與次要欄位出現。'},
        {min:2.0,c:'L3',d:'全部細節展開。'}];
function lvOf(v){var i=0;for(var k=0;k<LV.length;k++)if(v>=LV[k].min)i=k;return i;}
```

```css
.sheet[data-lv="0"] .l1,.sheet[data-lv="0"] .l2,.sheet[data-lv="0"] .l3{display:none}
.sheet[data-lv="1"] .l2,.sheet[data-lv="1"] .l3{display:none}
.sheet[data-lv="2"] .l3{display:none}
.sheet[data-lv="2"] .denom,.sheet[data-lv="3"] .denom{top:30%;font-size:19px}
.sheet[data-lv="3"] .stamp{height:170px}
```

關鍵設計決定：**進入 L2 時主角色（大數字）主動縮小讓位**。若資訊只增不減，L3 會變成一團擁擠的字。每一層都要有東西「退場」。

### 4. 以游標為錨點縮放

```js
function zoomAt(nz,cx,cy){
  nz=Math.max(.45,Math.min(3,nz));
  var r=nz/z; px=cx-(cx-px)*r; py=cy-(cy-py)*r; z=nz; apply();
}
stage.addEventListener('wheel',function(e){
  e.preventDefault();
  var r=stage.getBoundingClientRect();
  zoomAt(z*(e.deltaY<0?1.14:1/1.14), e.clientX-r.left, e.clientY-r.top);
},{passive:false});
```

### 5. 平移邊界

平面小於視窗時**置中**，大於視窗時夾在 12px 邊界內。沒有這段，使用者會把平面推出畫面外而以為網站壞了：

```js
function clampPan(){
  var vw=stage.clientWidth,vh=stage.clientHeight,w=SW*z,h=SH*z;
  px = w<=vw ? (vw-w)/2 : Math.min(12,Math.max(vw-w-12,px));
  py = h<=vh ? (vh-h)/2 : Math.min(12,Math.max(vh-h-12,py));
}
```

### 6. 指標事件：拖曳、捏合、與「這是點擊還是拖曳」

用一個 `moved` 累計位移量判定；超過 7px 視為拖曳，click 事件直接放行不觸發選取：

```js
stage.addEventListener('pointermove',function(e){ … moved+=Math.abs(dx)+Math.abs(dy); … });
sheet.addEventListener('click',function(e){
  var s=e.target.closest('.stamp'); if(!s) return;
  if(moved>7){moved=0;return;}
  select(s.dataset.b);
});
```

雙指時記錄初始間距 `pinch0` 與初始倍率 `pz0`，之後 `zoomAt(pz0*(d/pinch0), 中點)`。`.stage{touch-action:none}` 必要，否則瀏覽器會搶走手勢。

### 7. 無障礙（不可省）

- 單元一律是真的 `<button aria-pressed>`，Tab 走得到、Enter 按得下。
- `focusin` 時把聚焦單元推進視野（比對 `getBoundingClientRect` 調整 `px`/`py`）——否則鍵盤使用者會聚焦在畫面外的元素。
- 舞台 `role="application"` 並在 `aria-label` 寫明「方向鍵移動、加減號縮放、Tab 逐單元」。
- 提供**滑桿**與 ±／「整張」按鈕：滾輪不是每個人都有，滑桿也讓「現在在第幾層」變成可見狀態。
- 滑桿旁固定顯示 `L2 ×1.48` 與**該層在回答什麼問題**的一句話。這句話是整個範式能不能被理解的關鍵。
- 所有內容照樣寫在 HTML 裡（不是 JS 生成），未啟用 JS 時仍是一份可讀的清單。

### 8. 效能

- 只在 `dataset.lv>=2` 時生成插圖，並以 `{code:1}` 表快取。
- `transform` 走 GPU；不要在縮放時改 `width`/`font-size` 這類觸發 layout 的屬性（層級切換除外，那一幀的成本可以接受，因為不常發生）。
- 字體載入完成後補一次 `measure()`：`document.fonts&&document.fonts.ready&&document.fonts.ready.then(...)`。

### 9. 判準

做完問自己一句：**「把縮放鎖死在某一級，這個站會少掉什麼？」** 如果答案是「只是字變小」，那就只是縮放圖片，不是語意縮放——回去讓每一層各自回答一個不同的問題。
