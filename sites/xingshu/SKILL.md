---
name: midcentury-shape-count
description: Mid-century modern serigraph style built on minimal-realism primitives, area-conserving shape merges and a printed shape count.
---

# 形數 — 中世紀現代（Charley Harper 極簡寫實 × Alexander Girard 民藝幾何）

## 一、設計哲學

一九五〇到七〇年代的美國中世紀現代平面設計，有一條被 Charley Harper 說得最清楚的原則：**「我不數羽毛，我數翅膀。」**（I don't count the feathers in the wings. I just count the wings.）他把這種做法叫做**極簡寫實 minimal realism**——不是把寫實的東西簡化，而是一開始就只畫「數得出來的東西」：一隻鳥有幾個可辨識的部件，就用幾個幾何形。

這個做法不是品味，是絹印的直接後果。一個顏色一塊網版，一塊網版過機一次；顏色數等於成本，形狀數等於對位次數。所以「畫少一點」在這個年代是一個財務決定，而不是一個美學姿態。同時期的 Alexander Girard 在 Herman Miller 與 Braniff 航空做的事是同一件事的另一半：他把民間藝術的符號壓平成幾何色塊，再排成等距的窄帶，用來當版面的分隔線。

**本風格的核心主張：形狀的顆數是一個可以被印在成品上的規格。**版面上的每一張圖都必須說得出「我用了幾個形」，而減少形數的方法不是擦掉，是**把兩個形併成一個，併完的面積等於原來兩個的和**。這條規則使得「化約」在視覺上讀起來不是損失，而是合併——墨一克都沒有少。

適用場域：自然解說、動物園與博物館、兒童科普、食品與家用品包裝、農產品牌、教育機構、公共資訊系統。不適用：需要質感、材料感、光影或攝影的題材（本風格明文禁止一切漸層與陰影，硬套會變成沒有內容的扁平圖）。

---

## 二、本風格的 5 個不可省略特徵

> 這五項每一項都是「拿掉它就不是這個風格了」。做完一個站，把首屏截圖遮掉全部文字，一個懂設計的人要能在三秒內說出「這是中世紀現代／Charley Harper 那一路」。做不到就是這五項有缺。

### 特徵 1：白隙不是描邊——它是與地同色的描邊

兩塊顏色之間永遠有一道等寬的地色縫。這道縫不是畫上去的線，是絹印時兩塊網版之間刻意留下的、沒有印到的紙。**絕不使用黑色勾邊**：一勾邊，平塗就變成著色本。

```css
/* 白隙的正確做法：給每一個形一圈「與地同色」的描邊 */
.fig > * {
  stroke: var(--gap);      /* 地色，不是黑 */
  stroke-width: 2;         /* SVG 使用者單位；A2 實牌上約 1.2mm */
}
/* 進到第二色域時，白隙自己跟著換色——這是它不是描邊的證明 */
.teal { --gap: #1E9E9B; }
.ink  { --gap: #17211F; }
```

它的機制是：描邊先吃掉自己一點點，再蓋掉排在它後面那個形一點點，於是兩形之間出現一道等寬的地色縫。因此**形的堆疊順序就是白隙的走向**，順序不可任意調換。

### 特徵 2：只用四種形，而且把形數印出來

正圓、膠囊（stadium）、等腰三角、由兩個同心圓構成的眼。**膠囊與圓是同一個東西**：一個左右各一個半圓、中間一段等寬矩形的形；當中段長度 L = 0，它就退化成正圓。所以整套系統只需要三個參數：半徑 r、中段長 L、角度 a。

```html
<!-- 膠囊：rx 永遠等於高的一半 -->
<rect x="{x - L/2 - r}" y="{y - r}"
      width="{L + 2*r}" height="{2*r}"
      rx="{r}" transform="rotate({a} {x} {y})" fill="{color}"/>
<!-- L = 0 時，同一段程式畫出來就是正圓 -->
```

三角只給喙、角、耳、鰭、山、光芒，且**不參與合併**——它會先被磨成等效的膠囊，再被吸收。眼永遠是兩個同心圓（外圈亮、內圈墨），且它的位置刻意偏離頭的幾何中心。

每一張圖的角落必須印出它用了幾個形（`形數 4`）。這是本風格與所有「扁平插畫」的分水嶺：形數是規格，不是結果。

### 特徵 3：色票固定六色、比例固定、地色不承擔意義

奶白只是地；真正說話的是第二塊大色域。比例是硬的，偏離超過 ±4 個百分點就會失去這個年代的味道。

```css
:root{
  --paper:#F4EFE1;  /* 奶白  地      34%  零質感、零紙紋、零顆粒 */
  --teal :#1E9E9B;  /* 湖青  棲地    24%  第二塊大色域，承擔語意 */
  --red  :#D9482B;  /* 柿紅  動作    15%  主要動作、拒絕、警示 */
  --yel  :#E9B02A;  /* 芥黃  現用態  12%  被選中的事 */
  --ink  :#17211F;  /* 墨綠黑 線與字 11%  略帶綠的黑，不用純黑 */
  --pink :#E9B4A4;  /* 灰粉  皮膚    ≤4%  裸露的肉、臉、掌 */
}
```

**奶白不是「米白紙感」**：它是印上去的一塊實色，不鋪紙紋、不加顆粒、不加 noise。這是本風格與里索／活版／水彩等紙感流派最容易被搞混、也最不能混的一點。

### 特徵 4：平塗到底

不准漸層、不准陰影、不准柔邊、不准模糊、不准描邊字、不准圓角矩形當卡片。**允許的深度只有一種：一塊顏色蓋住另一塊顏色。**

```css
*             { box-shadow: none; filter: none; }
.card         { border-radius: 0; border-left: 3px solid var(--ink); }
.tag, .btn    { border-radius: 0; }
/* 圓角只屬於「形」（rx = 高/2），不屬於版面元件 */
```

分隔一律用實線：3px 為結構線（區段、卡片、導覽），1.5px 為列線（表格、清單）。沒有 2px，沒有 1px，沒有虛線。

### 特徵 5：字與形同格，整排必須對齊到同一條列線

圖不繞排、不置中、不壓字。圖與字掛在同一組列上：名稱一列、圖一列、梯一列、規格一列、註一列；整排卡片的同一列必須對齊到同一條線，內容再長也不許把自己那一格撐歪別人。

```css
.atlas { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); }
.pcard {
  grid-row: span 5;
  display: grid;
  grid-template-rows: subgrid;   /* 借用外層的五列 */
}
@supports not (grid-template-rows: subgrid) {
  .pcard        { display: flex; flex-direction: column; }
  .pcard header { min-height: 5.2em; }   /* 退回固定列高，對齊仍成立 */
}
```

外加 Girard 的**母題帶**：12–20 個由同一組原語構成的扁平民藝符號，等距排成一條窄帶，當作版面的分隔線而不是裝飾點綴。母題帶永遠橫貫整個寬度、上下各壓一條 3px 實線。

---

## 三、色彩系統

| 色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 奶白 paper | `#F4EFE1` | 地、白隙、深色域上的文字 | 34% |
| 湖青 teal | `#1E9E9B` | 第二大色域（本站＝棲地）、主要色塊區段 | 24% |
| 柿紅 red | `#D9482B` | 動作、拒絕、警示、hover 態 | 15% |
| 芥黃 yel | `#E9B02A` | 現用態、被選中、focus ring、引言塊 | 12% |
| 墨綠黑 ink | `#17211F` | 全部線、正文、眼、腳、觸角 | 11% |
| 灰粉 pink | `#E9B4A4` | 皮膚、臉、掌，僅小面積 | ≤4% |

規則：
1. 色域相接處**永遠有白隙**，且白隙的顏色 = 較外層那一塊的顏色。
2. 柿紅與芥黃**不得直接相鄰於同一條邊界**（兩個都是動作色，相鄰會互相搶）。
3. 灰粉只用在「肉」上，不當品牌色、不當底色。
4. 墨綠黑不是純黑 `#000`——它偏綠一點點，這是絹印黑墨在奶白紙上的實際樣子；用純黑會讓畫面變成數位介面。
5. 深色域內的地色反轉：`.teal{--gap:#1E9E9B}`、`.ink{--gap:#17211F}`，白隙自動跟著換。

---

## 四、字體系統

- 拉丁與數字：**Jost**（Futura 的開源近親；中世紀現代的本體字）400／500／700。
- 中文：**Noto Sans TC** 400／500／700。
- 等寬（只給程式碼）：`ui-monospace, SFMono-Regular, Menlo, monospace`。

```css
body { font-family:"Jost","Noto Sans TC",system-ui,sans-serif;
       font-size:16px; line-height:1.62; letter-spacing:.01em; }
h2   { font-size: clamp(26px, 3.4vw, 40px); font-weight:700; line-height:1.12; letter-spacing:-.005em; }
h3   { font-size:20px; font-weight:700; }
.lat { font-family:"Jost"; font-size:12px; font-weight:500;
       letter-spacing:.14em; text-transform:uppercase; }   /* 拉丁標籤 */
.num { font-family:"Jost"; font-variant-numeric: tabular-nums; font-weight:500; }
```

字級階梯：11 / 12.5 / 13.5 / 14 / 15 / 16 / 20 / clamp(26,3.4vw,40)。**只有兩種字重在畫面上同時存在**（400 正文、500 標籤與數字），700 只給標題。標題不加字距、不做描邊、不做外框字。

拉丁小標一律大寫加 `.14em` 字距——這是這個年代所有型錄、包裝與解說牌上的那一行小字。中文不套字距。

---

## 五、版面與網格

- 容器 `max-width:1180px`，左右 padding 桌機 24px、手機 14px。
- 主結構線 **3px 實線**；列線 **1.5px 實線**。沒有其他線寬。
- **不對稱**：兩欄一律 `1.45fr / 1fr` 或 `44% / 56%`，禁止 `1fr 1fr` 的對稱兩欄與置中三卡片。
- 卡片列刻意不等寬：`grid-template-columns: 1.25fr 1fr 1fr 1.15fr`。
- 區段之間**不留空白間距**：一律用 3px 實線與整塊色域切開（色塊直接貼著色塊）。這是本風格與「留白極簡」最大的差別——中世紀現代靠色塊分區，不靠空氣。
- 首屏不設大標 hero：把資訊掛在一個結構物上（本站掛在化約梯的七階上），標題只是一行小標籤。
- RWD 斷點：900px（兩欄攤平、卡片變兩欄）、640px（導覽換行、卡片單欄）、560px（梯格縮小）。

---

## 六、元件配方

```css
/* 導覽：形數導覽——現用頁不是被標亮，是它被畫得比別人多幾個形 */
.nv a            { border-left:3px solid var(--ink); padding:9px 15px 8px; }
.nv a .n5,.nv a .n3 { display:none }          /* 5 形 / 3 形 */
.nv a:hover .n2  { display:none } .nv a:hover .n3 { display:block }
.nv a[aria-current] .n2,.nv a[aria-current] .n3 { display:none }
.nv a[aria-current] .n5 { display:block; }
.nv a[aria-current] { background:var(--yel); }

/* 按鈕：直角、實色、hover 換色不換位（不做位移、不做陰影） */
.btn { background:var(--ink); color:var(--paper); border:0; padding:11px 20px;
       font-size:14px; font-weight:500; letter-spacing:.04em; border-radius:0; }
.btn:hover { background:var(--red); }

/* 標籤 */
.tag { background:var(--ink); color:var(--paper); padding:3px 9px 2px;
       font-size:11px; letter-spacing:.14em; text-transform:uppercase; }

/* 表格：表頭 3px 底線，列 1.5px */
th { border-bottom:3px solid var(--ink); font-size:11.5px;
     letter-spacing:.12em; text-transform:uppercase; font-weight:500; }
td { border-bottom:1.5px solid var(--ink); padding:8px 10px; }

/* 表單：直角輸入框，focus 用芥黃實心外框（不是發光） */
input,select { border:1.5px solid var(--ink); border-radius:0;
               background:var(--paper); padding:7px 9px; }
input:focus  { outline:3px solid var(--yel); outline-offset:0; }
.row.bad input { border-color:var(--red); }

/* footer：3px 上線 + 四欄資訊，欄名為大寫拉丁小標 */
.foot { border-top:3px solid var(--ink); padding:34px 0 46px; font-size:13.5px; }
.foot b { font-size:11px; letter-spacing:.14em; text-transform:uppercase; }
```

---

## 七、動效規則（四式，缺一不可）

| 類 | 名稱 | 觸發 | 參數 |
|---|---|---|---|
| ambient | 母題帶翻色 | 時間（9.6s 循環，每格延遲 −0.6s） | `steps(1,end)`，只換背景色，零位移、零淡入 |
| input | 梯格外推 | hover / focus（<100ms） | `transform:translateY(-3px)`，160ms，形自己不變 |
| transition | 分形進場 | 換頁 | 四條墨色直條依序 `translateY(-101%)`，340ms `steps(3)`，延遲 0/50/100/150ms |
| **signature** | **合形 shape-merge** | 形數改變（自動輪替、點擊、答題皆同一支） | 420ms `cubic-bezier(.4,0,.15,1)`，面積嚴格守恆 |

**合形是本風格的簽名動效**，規格如下：

```css
@property --x{syntax:"<number>";inherits:true;initial-value:0}
@property --y{syntax:"<number>";inherits:true;initial-value:0}
@property --r{syntax:"<number>";inherits:true;initial-value:1}
@property --L{syntax:"<number>";inherits:true;initial-value:0}
@property --a{syntax:"<number>";inherits:true;initial-value:0}

.live g { transform-box:view-box; transform-origin:0 0; }
.sh { transition:--x .42s cubic-bezier(.4,0,.15,1), --y .42s …, --r .42s …, --L .42s …, --a .42s …;
      transform: translate(calc(var(--x)*1px), calc(var(--y)*1px)) rotate(calc(var(--a)*1deg)); }
/* 一個膠囊 = 兩個單位圓 + 一段單位矩形，三者各自被縮放 */
.sh .c1 { transform: translate(calc(var(--L)*-.5px),0) scale(var(--r)); }
.sh .c2 { transform: translate(calc(var(--L)* .5px),0) scale(var(--r)); }
.sh .bar{ transform: scale(var(--L), var(--r)); }
/* 白隙層：同樣三件，半徑 +1.1，填地色，畫在自己的實色之前 */
.sh .h1 { transform: translate(calc(var(--L)*-.5px),0) scale(calc(var(--r) + 1.1)); }
.sh .h2 { transform: translate(calc(var(--L)* .5px),0) scale(calc(var(--r) + 1.1)); }
.sh .hb { transform: scale(var(--L), calc(var(--r) + 1.1)); }
```

被吸收的那一個形不是淡出：它**滑進吸收者的重心並把半徑收到 0**，同一時間吸收者長大接住它。因為 `--r`、`--L` 是被註冊過型別的自訂屬性，瀏覽器補間的是這兩個數，不是矩陣，所以膠囊在整段動畫裡都還是一個正確的膠囊。

`prefers-reduced-motion: reduce` 下四式全部 `duration: 1ms`，形直接到位，形數、顏色與資訊完全一致，零損失。

**明文禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、按壓硬陰影、`stroke-dashoffset` 描繪。理由一致：這個年代的圖是**印**上去的，不是畫上去的，也不是浮上來的。

---

## 八、插畫與圖像風格：hardedge-reduction 硬邊化約構成

全站零外部圖片。所有圖像（logo、favicon、圖鑑、母題帶、示範圖、成品）都由同一支引擎輸出，四種原語：正圓、膠囊、等腰三角、同心圓的眼。

**判準：拿掉顏色，仍讀得出這是哪一種生物——因為輪廓由形狀的顆數與相對位置決定，不由描邊決定。**

化約梯（本風格的核心資產）：一個對象從 7 個形開始，每往下一階把「最像是同一個形的那一對」併成一個。

```js
// 合形：面積加權合併二次矩（平行軸定理），面積嚴格守恆
function merge(a, b) {
  const A  = a.A + b.A;                       // ← 面積直接相加，不多不少
  const cx = (a.A*a.cx + b.A*b.cx) / A;
  const cy = (a.A*a.cy + b.A*b.cy) / A;
  const dx = a.cx-cx, ex = b.cx-cx, dy = a.cy-cy, ey = b.cy-cy;
  return { A, cx, cy,
    mxx:(a.A*(a.mxx+dx*dx)+b.A*(b.mxx+ex*ex))/A,
    myy:(a.A*(a.myy+dy*dy)+b.A*(b.myy+ey*ey))/A,
    mxy:(a.A*(a.mxy+dx*dy)+b.A*(b.mxy+ex*ey))/A,
    col:(a.A>=b.A ? a.col : b.col) };         // 顏色跟著面積大的走
}
// 由二次矩還原成膠囊：特徵值比 → 長寬比 → 二分法解 q=半長/半徑；
// 再由 A = πr² + 4qr² 反解 r，面積因此被定死。
function costOf(a, b, Atot) {
  const ra = Math.sqrt(a.A/Math.PI), rb = Math.sqrt(b.A/Math.PI);
  const d  = Math.hypot(a.cx-b.cx, a.cy-b.cy)/(ra+rb) + 0.12;
  const colPen = (a.col === b.col) ? 1 : 1.9;   // 顏色不同要罰
  const small  = 1 + 3*Math.min(a.A,b.A)/Atot;  // 小的先被吃掉
  return d * colPen * a.keep * b.keep / small;  // keep：眼與白斑的保護係數 2.6–3.2
}
```

母題帶（Girard）：12–20 個符號（日、心、鳥、花、山、魚、眼、葉、屋、星、手、樹、浪、籽、格、殼），每個 28×28，只准用同一組原語，只准用同一組色。

---

## 九、Logo 與 Favicon

**Logo = 同一個記號的三個化約階並排**（5 形 → 3 形 → 1 形），底下用 Jost 標出形數。這是把品牌主張直接畫成商標：這家店賣的就是「減到剩幾個形」。

```
[ 5 形的鳥 ] 5    [ 3 形的鳥 ] 3    [ 1 形的膠囊 ] 1
```

**Favicon** 用 1:1 的原創 inline SVG data URI 寫在 `<head>`，取化約到 3 形的那一階（一個大膠囊 + 兩顆同心圓的眼），底色芥黃：

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'
  viewBox='0 0 120 100'><rect width='120' height='100' fill='%23E9B02A'/>
  <g stroke='%23E9B02A' stroke-width='3'>…三個形…</g></svg>">
```

favicon 在 16px 下必須仍讀得出是兩隻眼——這是「三個形就夠了」這個主張的最小尺寸驗證。

---

## 十、Do & Don't

**Do**
- 每一張圖都標形數；形數是規格，不是結果。
- 減形只用合併，且合併後面積不變。
- 白隙用「與地同色的描邊」，不用黑勾邊。
- 深色域內把 `--gap` 換成該色域的顏色。
- 用色塊切分區段，不用空白間距。
- 兩欄一律不對稱。
- 拉丁小標大寫 `.14em` 字距，中文不套。

**Don't**
- 純黑 `#000`（用略帶綠的 `#17211F`）。
- 任何 `box-shadow`、`filter: blur`、`linear-gradient`、`radial-gradient`。
- 圓角矩形卡片（圓角只屬於「形」）。
- 黑色勾邊、描邊字、外框字。
- 紙紋、顆粒、noise、做舊——奶白是印上去的實色，不是紙。
- 置中大標 + 副標 + 兩顆按鈕 + 三張卡片。
- 淡入揭示、視差、跑馬燈、數字滾動。
- emoji 當 icon（icon 一律用同一組原語自繪）。
- 「EST. 19xx」徽章、Lorem ipsum、AI 腔文案。
- 把這個風格用在需要質感或光影的題材上。

---

## 十一、頁面骨架範例

```html
<header class="top"><div class="topin">
  <a class="brand" href="index.html"><!-- logo：5形/3形/1形 --><span><b>品牌</b><span>ROMAN SUBTITLE</span></span></a>
  <nav class="nv">
    <a href="index.html" aria-current="page"><!--5形--><!--3形--><!--2形--><b>首頁</b><i>HOME</i></a>
    <a href="b.html"><!--…--><b>第二頁</b><i>SECOND</i></a>
  </nav>
</div></header>

<main>
  <!-- 首屏：資訊掛在一個結構物上，不做大標 hero -->
  <section class="hero"><div class="wrap heroin">
    <div class="hero-l"><!-- 44%，湖青色域，放那張會合形的大圖 -->
      <h1 class="lat">小標籤，不是標語</h1>
      <div class="stagebox"><svg class="fig" viewBox="0 0 120 100">…</svg></div>
      <div class="stagemeta"><span class="tag">形數 7</span><span class="num">面積不變：4,150</span></div>
    </div>
    <div class="hero-r"><ol class="ladinfo"><!-- 56%，七階，每階掛一行真資訊 -->
      <li><button class="rung" style="--k:7"><span><!--圖--></span><b>7</b></button>
          <div class="lin"><b>地址那一行</b><span>補述那一行</span></div></li>
      …
    </ol></div>
  </div></section>

  <div class="band"><!-- 16 個 28×28 母題 --></div>

  <section class="wrap sec"><div class="two"><div>正文欄 1.45fr</div><div>表格欄 1fr</div></div></section>

  <section class="teal secw"><div class="wrap">
    <span class="tag">區段標籤</span><h2>色域區段直接貼上來，中間不留空白</h2>
    <div class="cards"><article class="card">…</article>…</div>
  </div></section>
</main>

<footer class="foot"><div class="wrap"><div class="grid">…四欄…</div></div></footer>
```

---

## 十二、技術實作與相容性

本風格的三項核心技術，皆於 2026-08-29 查證後才寫入。

### 1. CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 5「字與形同格」。圖鑑的十二張卡片各自 `grid-row: span 5` 並 `grid-template-rows: subgrid`，直接借用外層網格的五列；於是名稱／圖／梯／規格／註在整排卡片上對齊到同一條線，任何一張卡的註文再長也撐不歪別人。這件事用 flex 或固定高度都做不到（前者不跨卡對齊，後者會截斷內容）。

**支援現況（查證：Web Platform Features Explorer／caniuse／各家 release notes）**：Firefox 71（2019-12）、Safari 16（2022-09）、Chrome/Edge 117（2023-09）、Opera 103、Samsung Internet 24；三引擎齊備後於 **2026-03-15 升為 Baseline Widely available**，全球覆蓋 >92%。

**Fallback**：`@supports not (grid-template-rows: subgrid)` 時卡片改 flex 直排並給 header／規格／註設 `min-height`，欄內順序與內容完全不變，只是跨卡對齊改由固定列高近似——資訊零損失。

### 2. CSS `@property` 型別化自訂屬性補間（B 動效與時間軸層）

**承載**：簽名動效「合形」。把 `--x --y --r --L --a` 註冊成 `<number>`，瀏覽器才會在轉場時補間**這五個數**而不是補間最終的變換矩陣。差別是看得見的：矩陣補間會讓一個膠囊在中途變成被剪切過的平行四邊形；數值補間讓它在每一幀都還是一個正確的膠囊（兩個半圓 + 一段等寬矩形）。

**支援現況（查證：MDN《@property》、web.dev〈@property: Next-gen CSS variables〉）**：Chrome/Edge 85（2020-08）、Safari 16.4（2023-03）、Firefox 128（2024-07-09）；**Baseline newly available 2024-07-09**。

**Fallback**：未註冊時 `--r` 是字串，瀏覽器不補間自訂屬性，但 `transform` 本身仍是可轉場屬性，因此動畫照跑、只是走矩陣補間（中途形狀略有剪切感）；形數、位置與顏色的終點完全相同，資訊零損失。

### 3. CSS 數學函式 `sqrt()`（C 版面與樣式層）

**承載**：化約梯本身的一條規矩——**梯格的面積正比於它代表的形數**。邊長取 `√(k/7)`，於是七個格子的面積比恰好是 7:6:5:4:3:2:1，梯子自己也遵守「面積守恆」這條規則。

```css
.rung { --s: calc(var(--k)/7); }                              /* 退路：線性 */
@supports (width: calc(sqrt(4)*1px)) {
  .rung { --s: calc(sqrt(var(--k)/7)); }                      /* 正解：面積正比 */
}
.rung svg { width: calc(var(--s) * 104px); }
```

**支援現況（查證：MDN《sqrt()》／《pow()》、web-features explorer）**：Safari 15.4（2022-03）、Firefox 118（2023-09）、Chrome/Edge 120（2023-12）；**Baseline newly available 2023-12**，並於 **2026-06-07 升為 Widely available**。

**Fallback**：`@supports` 外層先給線性版本 `k/7`，不支援 `sqrt()` 的瀏覽器得到的是「邊長正比於形數」的梯子——梯子仍然由大到小、順序與標籤完全一致，只是面積比不精確。資訊零損失。

### 4. 建置期求解與無 JavaScript 保底

化約梯（十二種 × 七階 = 84 張圖）在**建置階段**就由貪心合併求解器算完並輸出成靜態 SVG 寫進 HTML。因此：

- 關掉 JavaScript：首頁的梯、圖鑑十二條完整的梯（含每一階的圖與形數）、製牌準則、色版工序、價目表、footer 全部資訊都在，且可選取；只有「點一階看它合形」與少形測需要 JavaScript，且頁面上有 `<noscript>` 明講並指向靜態的圖鑑頁。
- 求解器本身是純 JavaScript 幾何（格點取樣求二次矩 + 二分法解膠囊長寬比），無任何瀏覽器 API 依賴。

### 5. 效能實測（2026-08-29，Node 22 / jsdom 量測）

| 頁 | 單頁大小（含 inline 全部 CSS/JS/SVG） | 首屏 JS |
|---|---|---|
| index.html | 64.4 KB | 建立 7 個形節點（42 個 SVG 元素），< 5 ms |
| pu.html | 113.3 KB | 建立 84 個形節點，< 40 ms |
| zhun.html | 42.1 KB | 只有表單驗證，< 2 ms |
| ce.html | 59.2 KB | 建立 7 個形節點，< 5 ms |

全部遠低於 350 KB 上限。合形動畫每幀只改 5 個自訂屬性、由合成器消化 `transform`，不讀取 `getBoundingClientRect`、不觸發 layout，無 layout thrashing。零外部圖片、零外部音檔；外部資源只有 Google Fonts（Jost + Noto Sans TC）。

---

## 十三、外部參照

- Charley Harper，《Birds & Words》(1974)、《The Golden Book of Biology》(1961)、Ford Times 系列、辛辛那提動物園壁畫——「極簡寫實 minimal realism」與「不數羽毛，數翅膀」。
- Alexander Girard，Herman Miller Textiles & Objects（1961）、La Fonda del Sol 餐廳（1960）、Braniff International Airways 全面識別（1965）——民藝符號的幾何化與母題帶。
- 絹印（serigraph）的製作條件：一色一版、一版一次過機，故顏色數與對位次數即成本。
- Paul Rand 與 Saul Bass 同期的商標與片頭：以最少的幾何形承載辨識。
