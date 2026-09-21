---
name: kalighat-pat
description: Kalighat Pat — the single-sheet Calcutta bazaar painting style: one swelling brush contour per form, a continuous wash modelled from the form's own thickest point, bare paper instead of background, and tin as the only flat colour.
---

# কালীঘাট পট — 卡利加特單張畫

> 一八三〇年代起，孟加拉鄉下畫卷軸的 **পটুয়া**（patua）畫師家族遷進加爾各答，在卡利女神廟（Kalighat）門口賣給香客一種新東西：**單張**。不是卷軸、不裱、不裝框，一張廉價機製紙，一個人物，幾分鐘畫完，幾個派薩一張。
>
> 外部參照：倫敦 V&A 博物館 Kalighat 收藏；加爾各答 Gurusaday Museum；W. G. Archer《Kalighat Paintings》(HMSO for the Victoria and Albert Museum, 1971)；一九二〇–三〇年代 Jamini Roy 對此傳統的現代轉譯。
>
> 與相鄰傳統的分界：**與卷軸 পট 的分界**——那是一長條連續敘事、邊唱邊捲；本風格是一張獨立的、當場買走的畫。**與浮世繪的分界**——那是套版木刻、色是平的、輪廓等寬；本風格是手繪、色一定有連續階調、輪廓一定會漲縮。**與新藝術石版的分界**——那是一色一石所以物理上印不出中間調、明文禁漸層；本風格恰好相反，**沒有暈就不是這個風格**。**與里索／絹印的分界**——那的識別性在套印與顆粒；本風格沒有套印這回事。

---

## 一、設計哲學

三句話：

1. **形由一條會漲縮的線決定，不由第二條線加強。** 畫師手上只有一枝筆，筆按下去線就粗，提起來就細，走到盡頭就沒了。等寬的線是尺畫的，不是筆畫的。
2. **暈是必須的，不是效果。** 這個傳統向十九世紀的歐洲版畫學到一件事：形裡面給一層連續的明暗，形就有了體積。所以本風格**明文禁止平塗**——只有一個例外（錫）。
3. **背景是紙。** 沒有景、沒有地平線、沒有框、沒有裝飾邊。畫師一天要畫幾十張，沒有人有時間畫背景；而且紙本身就是最便宜的顏色。**留白不是設計手法，是產業事實。**

由此推出本風格的版面法則：**版面沒有格、沒有欄、沒有框。每一則資訊的階層由「它離那張畫多遠」決定。**

---

## 二、本風格的 5 個不可省略特徵

> 拿掉任何一項，畫出來的就不是卡利加特單張畫。每一項附可直接複製的片段。

### 特徵 1｜脹縮輪廓（swelling contour）— 一個形只有一條線，而且它的寬度一路在變

線寬沿著形的周長連續變化（最細處可以到 0，那就是筆被提起來的地方），而且**每一個形只有一條輪廓**：沒有內描、沒有 keyline、沒有第二層描邊。

實作上的硬性要求：**不得使用 `stroke`**。`stroke-width` 是常數，常數寬度的線不是毛筆。輪廓必須是一個**填充的環**——把邊界往外偏移 w(t)/2、往內偏移 w(t)/2，兩條迴圈接成一個 `fill-rule:evenodd` 的路徑。

```js
// 邊界 B（點陣列）＋寬度包絡 env(t) → 填充環
function ringPath(B, env){
  const N=B.length, o=[], i2=[];
  for(let i=0;i<N;i++){
    const a=B[(i-1+N)%N], b=B[(i+1)%N];
    let tx=b[0]-a[0], ty=b[1]-a[1]; const l=Math.hypot(tx,ty)||1; tx/=l; ty/=l;
    const nx=ty, ny=-tx, w=env(i/N)/2;               // 外法線
    o.push([B[i][0]+nx*w, B[i][1]+ny*w]);
    i2.push([B[i][0]-nx*w, B[i][1]-ny*w]);
  }
  const d=a=>a.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('')+'Z';
  return d(o)+d(i2.reverse());                        // 兩條子路徑 = 一個環
}
// 一個形一個起落：t=0 與 t=1 是同一點，所以只有一個「筆提起來」的位置
const env = t => 0 + 17.5*Math.pow(Math.abs(Math.sin(Math.PI*t)), 1.12);
```

```css
.ct{ fill:#16120E; fill-rule:evenodd; }   /* 輪廓是填充的，不是描的 */
```

### 特徵 2｜暈（bhangi）— 形內一層連續的階調，亮核落在形最厚的地方

每一個形內部只有**一個**徑向漸層。它的圓心不是外接矩形中心，也不是質心——弧形與新月形的質心根本落在形的外面。圓心必須是**最大內接圓的圓心（pole of inaccessibility）**，半徑取該內接圓半徑的 2.0 倍。

```js
// 多邊形有號距離場 → 網格粗掃 → 八鄰反覆下降
function pole(P, step){
  let best={x:0,y:0,d:-1e9}, bb=bbox(P);
  for(let x=bb.x0;x<=bb.x1;x+=step) for(let y=bb.y0;y<=bb.y1;y+=step){
    const d=sdf(P,x,y); if(d>best.d) best={x,y,d};
  }
  let s=step;
  for(let k=0;k<7;k++){ s/=2; let moved=true;
    while(moved){ moved=false;
      for(const c of [[s,0],[-s,0],[0,s],[0,-s],[s,s],[-s,-s],[s,-s],[-s,s]]){
        const d=sdf(P,best.x+c[0],best.y+c[1]);
        if(d>best.d){ best={x:best.x+c[0],y:best.y+c[1],d}; moved=true; }}}}
  return best;   // {x,y,d}：d 就是內接圓半徑
}
```

```svg
<radialGradient id="w7" gradientUnits="userSpaceOnUse"
                cx="234" cy="336" r="118">   <!-- cx,cy = pole；r = pole.d * 2.02 -->
  <stop offset="0"   stop-color="#E39478"/>  <!-- 亮核：顏料調向紙 -->
  <stop offset=".46" stop-color="#C0381C"/>  <!-- 顏料本色 -->
  <stop offset="1"   stop-color="#8E1F08"/>  <!-- 靠輪廓的深處 -->
</radialGradient>
```

**禁止用網點、排線、交叉線、抖色（dither）做灰。**灰只有一種來源：連續漸層。

### 特徵 3｜暈是乘在紙上的（wash multiplies the paper）

水彩洗在紙上是**相乘**，不是蓋上去。所以每一層暈都要與紙色做一次算術相乘，紙的溫度才會從每一個顏色裡透出來。

```svg
<filter id="mul" x="-8%" y="-8%" width="116%" height="116%"
        color-interpolation-filters="sRGB">   <!-- 必寫，預設 linearRGB 會整體偏亮 -->
  <feFlood flood-color="#E5D8B6" result="paper"/>
  <feComposite in="SourceGraphic" in2="paper"
               operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
</filter>
```
```css
.wa{ filter:url(#mul); }   /* 掛在每一塊暈上，不掛在輪廓與錫上 */
```
`result = k1·i1·i2 + k2·i1 + k3·i2 + k4`；取 k1=1 其餘 0，就是逐像素相乘。濾鏡在預乘 alpha 上運算，所以透明處仍然透明。

### 特徵 4｜空紙即版面（the bare ground is the layout）

**畫面上不准出現背景、景物、地平線、裝飾邊、框線、欄線、格線、卡片、圓角、陰影。**紙是唯一的地。

資訊的階層由**它離那張畫多遠**決定，而且那個距離要印在它自己下面（本站用 **আঙুল**，一指寬 ≈ ১৯ মিমি）。因此首屏不能用 grid，也不能用 flex：

```css
.sheet{position:relative}                    /* 唯一的定位參考是那張畫 */
.void {position:absolute; max-width:200px}   /* 每一則字：left/top 自己指定 */
.void em{font-size:.62rem; letter-spacing:.2em; color:#1D5644}  /* 印出距離 */
@media (max-width:900px){                    /* 窄屏才退成靜態流 */
  .void{position:static; border-left:2.6px solid #16120E; padding-left:16px}
}
```

### 特徵 5｜錫（রাং）— 全畫唯一的平色

首飾與金屬用錫箔／銀粉點上去，它是**平的、冷的、不接受任何明暗**。錫是整張畫上唯一一塊沒有暈的顏色，也正因為如此它才看起來是金屬。

```css
.tn{ fill:#9DA29B; }        /* 沒有 gradient、沒有 filter、沒有高光 */
```
**錫永遠不承載文字**（錫對紙 1.84:1）。錫也是全站唯一允許移動的顏色（見〈動效規則〉的環境動效）。

---

## 三、色彩系統

架上只有六罐，其中一罐是紙。**除了錫與輪廓黑之外，每一個顏色都只以「暈」的形式出現；樣式表裡不得出現任何一塊平塗的彩色面。**

| 角色 | 色票 | 面積 | 用途 | 對紙對比（WCAG 2.1） |
|---|---|---|---|---|
| মিলের কাগজ 機製紙 | `#E5D8B6` | ~41% | 唯一的地色，也是暈相乘的乘數 | — |
| কাজলকালি 燈煙黑 | `#16120E` | ~17% | 每一條輪廓、全部正文 | **13.16:1** |
| সিঁদুর 硃紅 | `#C0381C` | ≤14% | 鐲、罐、focus、錯答標記 | 3.88:1（**永不承載正文**） |
| গাঢ় সবুজ 濃綠 | `#1D5644` | ≤11% | 標籤、caption、對答標記、器物 | **6.01:1**（可承載小字） |
| হরিতাল 石黃 | `#C6942A` | ≤9% | 螺與木料 | 1.93:1（**永不承載文字**） |
| রাং 錫 | `#9DA29B` | ≤8% | 金屬，唯一平色 | 1.84:1（**永不承載文字**） |

每一個顏料的暈三停點（亮核 / 本色 / 深處）：

```css
.r-shell,.r-och{--c:#EBD5A0;--m:#C6942A;--e:#9C6B12}
.r-ver        {--c:#E39478;--m:#C0381C;--e:#8E1F08}
.r-grn        {--c:#83A99A;--m:#1D5644;--e:#0E3226}
```

硬規則：**零 `#000`、零 `#FFF`、零灰階色碼、零 `opacity` 調色、零 `rgba()` 第四位當淡色、零 `filter:blur`、零模糊陰影、零發光、零金屬漸層、零玻璃擬態、零紋理、零噪聲、零做舊、圓角一律 0。** 唯一合法的 `filter` 是特徵 3 的相乘；唯一合法的漸層是特徵 2 的暈。

**與 `paper-light` 米白紙感底的分界**：那是「底是米白的」而已；這裡的紙是六罐裡的一罐，**它有面積配額、它是每一個顏色的乘數**，所以紙一改，全站所有顏色跟著改。

---

## 四、字體系統

字是**後來寫上去的**。畫先畫好，字在剩下的紙上寫，所以字不對齊任何東西，也允許寫到一半沒地方。

| 用途 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 孟加拉文 | `Noto Serif Bengali` | 400 / 700 | 標題、名詞、數字（孟加拉數碼 ০–৯） |
| 拉丁與西文數字 | `Baskervville` | 400 | 十九世紀加爾各答印刷所的高對比舊體 |
| 漢字正文 | `Noto Serif TC` | 400 / 700 | 說明文 |

字級 scale（rem）：`.62 / .72 / .86 / 1 / 1.22 / 1.5 / 1.9`。
**標題上限 1.9rem，而且首屏不得有大標 hero**——畫面上最大的東西必須是畫。行高 1.62；標籤字距 `.14–.24em`。

---

## 五、版面與網格

- 沒有網格。首屏唯一的定位參考是那張畫（見特徵 4）。
- 內頁用單欄 `max-width:1040px`，段落 `max-width:62ch`，引言 `max-width:34ch`。
- 表格是唯一允許的「線」：`border-bottom:1.4px solid`（表頭 2.6px）。**沒有直線、沒有外框、沒有斑馬紋、沒有底色。**
- 分節之間的分隔只有 `2.6px` 的一條橫線，或什麼都沒有。

---

## 六、元件配方

```css
/* 導覽：同一條筆畫上的四個著力點（不是四個物件） */
nav{position:relative;padding-bottom:38px}
nav svg{display:block;width:100%;height:auto;aspect-ratio:1000/62}
nav .nv{fill:#16120E;display:none}      /* 四個變體，只顯示現用的那一個 */
nav .nv.on{display:inline}
nav li{position:absolute;bottom:0;transform:translateX(-50%)}
nav:has(a[data-i="2"]:hover) .nv{display:none}
nav:has(a[data-i="2"]:hover) .nv2{display:inline}

/* 按鈕：一條會變粗的邊，沒有底色、沒有圓角 */
.opts button{font:inherit;background:none;border:1.8px solid #16120E;padding:9px 12px}
.opts button:hover{border-width:3.4px;padding:7.4px 10.4px}   /* 總尺寸不變 */

/* focus：硃紅，2.5px，offset 3px（對紙 3.88:1，過 UI 元件 3:1 門檻） */
a:focus-visible,button:focus-visible{outline:2.5px solid #C0381C;outline-offset:3px}

/* footer：一條 2.6px 的橫線，沒有底色 */
footer{border-top:2.6px solid #16120E;padding-top:22px;font-size:.72rem}
```

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可；四種都必須有 `prefers-reduced-motion` 降級且**降級後資訊零損失**。

| 種類 | 名稱 | 觸發 | 值 | 降級 |
|---|---|---|---|---|
| ambient 環境 | 〈রাং ধরা〉錫上亮帶 | 不需輸入 | 硬邊 30px 亮帶 `#D3D7CE`，`13s linear infinite`，剪到錫的形狀裡 | `animation:none`（錫靜止，顏色不變） |
| input 輸入 | 〈আর এক পোঁচ〉再上一道 | hover／focus-within | 暈三停點整組換深（`transition:stop-color 70ms linear`）＋輪廓換成 1.42 倍寬的那一條（`display` 切換，**0ms**） | `transition:none`（仍然變深，只是不過渡） |
| transition 轉場 | 〈পাতা ওলটানো〉翻頁 | 換頁／換題 | 跨文件 `@view-transition{navigation:auto}`；題目切換 `clip-path:inset(0 100% 0 0)→inset(0)`，260ms | 不支援即為普通換頁；`navigation:none` |
| **signature 簽名** | **〈চার হাত〉四隻手** | 載入 | 畫分四層依序放上：রেখা 線（由左）→ ভাঙি 暈（由上）→ রং 色（由右）→ রাং 錫（由下）；每層 420ms `cubic-bezier(.2,.75,.25,1)`，間隔 180ms | 四層一次全部就位（`transform:translate(0,0)`；工序表仍然印在頁面上） |

簽名動效的語意是**生產分工**，不是「揭示」：畫面不是淡入、不是描繪（本風格明文禁用 `stroke-dashoffset` 描繪）、不是縮放，是**四隻手各把自己那一層放上去，而且順序不能換**。

```css
/* 四隻手＝四個 clipPath 裡的矩形各自從一個方向推進來 */
.hr{transition:transform .42s cubic-bezier(.2,.75,.25,1)}
.hr2{transition-delay:.18s}.hr3{transition-delay:.36s}.hr4{transition-delay:.54s}
html.js .hr1{transform:translateX(calc(var(--fw) * -1px))}
html.js .hr2{transform:translateY(calc(var(--fh) * -1px))}
html.js .hr3{transform:translateX(calc(var(--fw) *  1px))}
html.js .hr4{transform:translateY(calc(var(--fh) *  1px))}
html.js.painted .hr1,html.js.painted .hr2,
html.js.painted .hr3,html.js.painted .hr4{transform:translate(0,0)}
```
`.js` 由 `<head>` 裡一行 script 加上；沒有 JavaScript 時四層一開始就在位，**畫是完整的**。

**明文禁用**：淡入當主要進場、`stroke-dashoffset` 描繪、視差、數字計數、彈跳、模糊轉場、跑馬燈／ticker。

---

## 八、插畫與圖像風格

技法名稱：**脹縮輪廓與暈染構成（swell-and-wash）**。全站零外部圖片、零照片、零 `<img>`、零 canvas、零點陣圖。只有三條原語，**不允許第四條**：

1. **脹縮輪廓**（特徵 1）——每一個形恰好一條，寬度沿周長連續變化，可以收到 0。
2. **暈**（特徵 2）——每一個形恰好一個徑向漸層，圓心是最大內接圓的圓心。
3. **錫**（特徵 5）——唯一的平色，只給金屬。

判準（放大任何一張圖）：
- (a) 每一條輪廓的寬度都在變，找得到它最厚的肩膀與最細的收尾；
- (b) 除了錫，每一塊顏色都有連續階調，找不到任何一塊平塗的彩色面；
- (c) 任何一個形上找不到第二條線——沒有內描、沒有 keyline、沒有排線、沒有網點、沒有點描；
- (d) 找不到背景、景物、框線或裝飾邊。

造形規則：**形要指認得出是什麼東西**。畫海螺就要有螺塔、螺層縫、螺口與水管溝；畫貓就要有貓的蹲姿比例。畫「一般的形狀」即不合格。

---

## 九、Logo 與 Favicon

- **Logo**：就是本風格本身的一次示範——一枚螺（脹縮輪廓＋暈，暈乘在紙上）加一塊錫。`assets/logo.svg`，`viewBox="60 50 440 320"`，內含同一個 `feComposite arithmetic` 濾鏡。**Logo 不得是字標，不得有外框，不得有標語。**
- **Favicon**：原創 inline SVG data URI 寫在 `<head>`，紙底 ＋ 一個徑向漸層的螺 ＋ 一條 `fill-rule:evenodd` 的脹縮輪廓環。不得用 emoji、不得用外部檔。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg ... %3E">
```

---

## 十、Do & Don't

**Do**
- 一個形一條線，線的寬度一路在變，收尾可以收到沒有。
- 每一塊顏色都是暈，而且暈乘在紙上。
- 亮核由形自己解出來（最大內接圓），不是設計者放的。
- 錫平、冷、不反光、不寫字。
- 版面靠距離，不靠格線。
- 首屏最大的東西是畫，不是字。

**Don't**
- ✕ 用 `stroke` 畫輪廓（等寬線＝尺，不是筆）。
- ✕ 平塗任何彩色面（錫除外）。
- ✕ 用網點、排線、點描或抖色做灰。
- ✕ 加背景、景物、地平線、裝飾邊、框線、卡片、圓角、模糊陰影。
- ✕ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、跑馬燈。
- ✕ 把石黃或錫拿來寫字（1.93:1 / 1.84:1）。
- ✕ 用 `stroke-dashoffset` 描繪當進場。

---

## 十一、頁面骨架範例

```html
<style>
:root{--paper:#E5D8B6;--ink:#16120E;--ver:#C0381C;--grn:#1D5644;--och:#C6942A;--tin:#9DA29B}
body{background:var(--paper);color:var(--ink);font-family:"Noto Serif TC",serif;line-height:1.62}
.wrap{max-width:1040px;margin:0 auto;padding:0 26px 90px}
.ct{fill:var(--ink);fill-rule:evenodd}
.wa{filter:url(#mul)}
.tn{fill:var(--tin)}
.sheet{position:relative}
.void{position:absolute;max-width:200px}
</style>

<svg width="0" height="0" style="position:absolute">
  <filter id="mul" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
    <feFlood flood-color="#E5D8B6" result="paper"/>
    <feComposite in="SourceGraphic" in2="paper" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
  </filter>
</svg>

<div class="wrap">
  <header><h1>商號<small>ROMAN · 一行副標</small></h1></header>
  <nav>…同一條筆畫上的四個著力點…</nav>

  <section class="sheet">
    <svg class="fig" viewBox="0 0 1000 530" role="img" aria-label="畫的內容">
      <g class="fm r-shell">
        <radialGradient id="w1" gradientUnits="userSpaceOnUse" cx="234" cy="336" r="118">
          <stop offset="0" stop-color="#EBD5A0"/><stop offset=".46" stop-color="#C6942A"/>
          <stop offset="1" stop-color="#9C6B12"/>
        </radialGradient>
        <path class="wa" d="…形…" fill="url(#w1)"/>
        <path class="ct" d="…脹縮輪廓環…"/>
      </g>
      <path class="tn" d="…錫…"/>
    </svg>
    <div class="void" style="left:56%;top:3%">
      <b>一則事實</b><i>說明</i><em>২ আঙুল</em>
    </div>
  </section>
</div>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，選擇理由一律是「這個流派的視覺特徵需要它」。

### 12.1（E 資料與生成層）自寫「脹縮輪廓 ＋ 形自解光心」雙輸出引擎

**承載**：特徵 1 與特徵 2。輸入一組閉合控制點，輸出兩樣東西——(a) 變寬的填充輪廓環（Catmull-Rom 重取樣 → 逐點外法線 → ±w(t)/2 偏移 → `fill-rule:evenodd` 雙子路徑），(b) 該形的最大內接圓（多邊形有號距離場，網格粗掃 step 1.4–6 → 七輪對半的八鄰反覆下降），作為暈的圓心與半徑。

**為什麼非它不可**：`stroke-width` 是常數，畫不出會漲縮的筆畫；而暈的亮核若取外接矩形中心或質心，對弧形與新月形（本站的螺鐲、刻紋帶）會落在形的**外面**，暈整個是錯的。最大內接圓的圓心必定在形內，而且必定在形最厚的地方——那正是「顏料最薄、紙最亮」的位置。

**決定性**：無 PRNG、無時間、無隨機；同一組控制點永遠得到同一條路徑。全部在**建置期**（Node）跑完並寫死成靜態 SVG，所以瀏覽器端零幾何計算。

**實測（Node 22）**：全站 101 個形（主圖 35 ＋ 名紋帶 66）加四條導覽筆畫，一次完整產生 **122 ms**；最重的一組（首屏螺身 105 個邊界點 ＋ 螺口 ＋ 四道螺層縫 ＋ 鐲 ＋ 兩塊錫，共 8 個形）**13.9 ms**。頁面端幾何計算成本 **0 ms**。

**相容性**：輸出只有 `<path d>`、`<radialGradient>`、`fill-rule="evenodd"`——全部是 SVG 1.1 核心，無相容性風險。

### 12.2（A 渲染層）SVG `feComposite operator="arithmetic"`

**承載**：特徵 3（暈乘在紙上）。`result = k1·i1·i2 + k2·i1 + k3·i2 + k4`，取 `k1=1` 其餘 0，即逐像素相乘；`i2` 由 `feFlood` 灌入紙色。

**查證（2026-09-21）**：MDN《`<feComposite>`》與其 `k1`–`k4` 屬性頁——`k3` 標示 **Baseline Widely available，自 2015 年 7 月起跨瀏覽器可用**；`k2` 標示 **Baseline Widely available，自 2020 年 1 月起**。`operator="arithmetic"` 屬 SVG 1.1 濾鏡核心。

**必寫 `color-interpolation-filters="sRGB"`**：MDN 明載濾鏡預設在 linearRGB 運算，不指定的話相乘會在線性空間進行，輸出整體偏亮且暈的落差被壓平。

**Fallback 具體行為**：濾鏡若被忽略（`filter` 解析失敗或使用者停用），`.wa` 的漸層照樣完整畫出來，只是不再乘上紙色——顏色略冷略亮，**形、階調結構、版面與全部資訊完全不變**。

**效能**：濾鏡掛在每一塊暈上（首屏 8 塊），區域 116%；`feFlood`+`feComposite` 是兩個 O(面積) 的通道，無 blur、無迴旋，不隨動效逐幀重算（暈的動只改 `stop-color`，濾鏡輸入變、成本不變）。

### 12.3（B 動效與時間軸層）跨文件 View Transitions（`@view-transition { navigation: auto }`）

**承載**：轉場動效——四頁之間的換頁是「同一張紙被帶到下一張工作檯」，不是四份文件各自重載。

**查證（2026-09-21）**：MDN《View Transition API》與《`@view-transition`》——跨文件轉場在 **Chrome／Edge 126+、Safari 18.2+**（macOS 與 iOS）可用；**Firefox 尚未在穩定版預設開啟**（Nightly 為旗標後的部分支援）。同文件轉場已是 Baseline newly available。

**Fallback 具體行為**：`@view-transition` 是不認得就整條忽略的 at-rule——Firefox／舊 Safari 得到一次普通導覽，無錯誤、無需 polyfill、**資訊零損失**。本站不把任何內容或狀態放在轉場裡，轉場只是動畫。

**降級**：`@media (prefers-reduced-motion:reduce){ @view-transition{navigation:none} }`。

### 12.4 其餘實作與已知陷阱

- **`:has()` 導覽**：四條筆畫變體以 `nav:has(a[data-i="N"]:hover) .nvN{display:inline}` 切換。`:has()` 為 Baseline（Chrome 105+／Safari 15.4+／Firefox 121+）。不支援時現用頁那一條仍然顯示（`.on` 是靜態 class），只是沒有 hover 預覽——**導覽本身是原生 `<a href>`，完全可用**。
- **`clipPath` 子元素上的 CSS transform**：簽名動效靠四個 `clipPathUnits="userSpaceOnUse"` 的 `<rect>` 各自 translate。偏移量用 `calc(var(--fw) * -1px)`，`--fw`／`--fh` 以**無單位數**寫在該 `<svg>` 的 `style` 上並向下繼承。若某引擎不動畫 clipPath 子元素的 transform，最終計算值仍是 `translate(0,0)`，**畫完整顯示**，只是沒有那段動畫。
- **`<stop>` 上的 `var()`**：三個停點寫成 `style="stop-color:var(--c,#EBD5A0)"`，自訂屬性由該形的 `<g class="fm r-ver">` 繼承——**漸層必須放在那個 `<g>` 裡面**，放進共用 `<defs>` 就繼承不到（`<defs>` 的子元素繼承自 `<svg>`）。三個停點都寫了 fallback 值，`var()` 不生效時顏色仍然正確，只是 hover 不再變深。
- **`nav svg` 不可用 `preserveAspectRatio="none"`**：橫向壓縮會把「著力點」壓成針。用 `height:auto; aspect-ratio:1000/62` 讓它等比縮。
- **效能預算實測**：單頁（含全部 inline CSS／JS／SVG）**index 46.4KB／khodai 48.1KB／naksha 147.6KB／dokan 42.0KB**，全部 ≤350KB。首屏 JavaScript 只有兩行（加一個 class、下一幀再加一個 class），`naksha` 的功能腳本在 DOM 就緒後才建第一題。動效全部是 `transform` 與 `stop-color`，無 layout thrashing。
- **無障礙**：現用頁同時帶 `aria-current="page"`（筆壓對輔助科技不可見）；功能檯的選項是真的 `<button>`，判定寫在 `role="status" aria-live="polite"` 裡；`<noscript>` 明說十二個名紋的圖與說明就在下面的靜態圖鑑。所有正文為燈煙黑對紙 **13.16:1**，標籤為濃綠 **6.01:1**；硃紅（3.88:1）、石黃（1.93:1）、錫（1.84:1）一律不承載文字。
- **RWD**：≤900px 時首屏的九則事實由絕對定位退成靜態流（距離照印，一則不少）；≤560px 收單欄、字級 scale 下調、導覽下緣加高。四頁全部關掉 JavaScript 後內容一字不少。
