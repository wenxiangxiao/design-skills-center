---
name: beardsley-line-block
description: Fin-de-siecle black-and-white line block — two inks only, huge solid masses against an open void, constant-weight contours, one dense cluster, a ruled double border.
---

# 比亞茲萊黑白裝飾 · 鋅版線描 Beardsley Line Block

> 一八九三至一八九八年，Aubrey Beardsley 為《Salome》《The Yellow Book》《The Savoy》
> 所作的插圖，全部經由**鋅版線描（photomechanical line block）**製版。這種製版法只認得一件事：
> 這一點吃不吃墨。沒有灰、沒有網屏、沒有濃淡。整個風格是從這條技術限制長出來的——
> 既然中間調終究會被製版廠殺掉，畫家索性自己先決定哪裡全黑、哪裡全空，
> 然後把全部力氣花在**黑塊的形狀**與**留白的走向**上。
>
> 本規格書把這件事寫成可驗算的規則。它不綁定產業：藏書票、劇場節目單、詩集、
> 香水、殯儀、書店、獨立唱片，任何需要「近距離、小尺寸、要被記住」的東西都適用。

---

## 一、設計哲學

1. **顏料架上只有兩格。** 一格是墨，一格是紙。任何需要表達「程度」的地方
   （hover、停用、進度、強弱、數量），都不准用灰、不准用半透明、不准用漸層，
   一律翻譯成「整塊塗黑」或「整塊留空」的離散分配。
2. **線不承擔明暗。** 線只負責「這裡有一條邊」。一根線若一頭粗一頭細，它就在偷偷表達光源，
   那是素描的做法。本風格的線等寬，只在端點鼓成一個實心圓點。
3. **密與空必須直接接壤。** 沒有過渡帶。畫面的張力來自「最密的那一小塊」緊貼著「最大的那一片空」，
   中間不放任何中間密度的東西來緩衝。
4. **留白是骨，不是背景。** 空必須通出版外；被墨圍住的白會被眼睛讀成一個「亮的形狀」，
   於是它變成第二個主體，跟黑塊打架。
5. **畫面是印刷品，不是圖。** 雙線版框與角落的作者記號不是裝飾，它們宣告「這是一塊版印出來的東西」。

**這個風格的成立條件是可以量的。** 見第二章的四條律——它們不是品味，是四個數。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1　只有兩種顏料，沒有任何中間調

拿掉它就不是這個風格了：一旦出現灰、網點、半透明或漸層，畫面立刻變成插畫或素描。

```css
:root{ --pa:#EFE9DA; --ik:#0C0C0E; }        /* 全站只有這兩個值可以當面積 */
/* 明文禁止：任何 opacity 介於 0 與 1、任何 gradient、任何 filter:blur、任何灰階中間色 */
*{ box-shadow:none; text-shadow:none; border-radius:0; }
/* 狀態變化一律是整塊翻面，不是變淡 */
.btn         { background:var(--pa); color:var(--ik); border:.8px solid var(--ik); }
.btn:hover,
.btn:focus-visible{ background:var(--ik); color:var(--pa); }   /* 反白，不是加深 */
.tag.on      { background:var(--ik); color:var(--pa); }
.item[disabled]{ background:var(--pa); color:var(--ik); border-style:dashed; } /* 不用灰表示停用 */
```

### 特徵 2　巨大的實心黑塊，對著同樣巨大、且通出版外的留白

四條律（可直接搬去驗你自己的版面或插圖）：

| 律 | 內容 | 為什麼 |
|---|---|---|
| 一 | 墨率（黑面積 ÷ 版面）落在 **26%–42%** | 輕於 26% 就沒有重量，小尺寸一遠看就消失；過 42% 翻成黑地白畫，那是木刻 |
| 二 | 最大的一塊連通黑 ÷ 全部黑 ≥ **62%** | 黑是一件衣服，不是一地斑點；散黑在遠處會互相平均成灰 |
| 三 | 最大的一塊連通白 ÷ 版面 ≥ **24%** | 沒有一整片空，密就沒有對手 |
| 四 | 那片白至少通到版框的 **兩個邊** | 被圍住的白是一個洞；洞是形狀，空不是 |

```js
/* 把版面切成 n 塊、每塊只有 0/1 兩態時，四條律就是四個純函數 */
function laws(areas, adj, side, ink){          // ink: [bool × n]
  const TOT = areas.reduce((a,b)=>a+b,0);
  const ia  = areas.reduce((s,a,k)=>s+(ink[k]?a:0),0);
  const grp = (set)=>{ const seen=set.map(()=>false), out=[];
    set.forEach((_,s)=>{ if(!set[s]||seen[s])return; const st=[s]; seen[s]=true; const g=[];
      while(st.length){ const v=st.pop(); g.push(v);
        adj[v].forEach(w=>{ if(set[w]&&!seen[w]){seen[w]=true;st.push(w);} }); } out.push(g); });
    return out; };
  const sum = g => g.reduce((s,k)=>s+areas[k],0);
  const maxI = Math.max(0,...grp(ink).map(sum));
  const voids = grp(ink.map(v=>!v));
  const big  = voids.sort((a,b)=>sum(b)-sum(a))[0] || [];
  const edges = ['L','R','T','B'].filter(s=>big.some(k=>side[k][s])).length;
  return [ ia/TOT>=.26 && ia/TOT<=.42,  ia>0 && maxI/ia>=.62,  sum(big)/TOT>=.24,  edges>=2 ];
}
```

### 特徵 3　等寬輪廓線，只在端點鼓成實心圓點

```css
.ct        { fill:none; stroke:var(--ik); stroke-width:1.15;
             stroke-linecap:butt; stroke-linejoin:round; }
.ct .sf    { fill:var(--ik); stroke:none; }      /* 實心點與水滴：唯一的填色 */
/* 明文禁止 */
.ct        { /* stroke-dasharray: 不用；線不是虛的 */ }
/* 禁止交叉排線（hatching）、半調網點（halftone）、點描濃淡（stipple as tone） */
```

端點鼓起（輸入動效，也是本風格唯一允許的「線變粗」）：

```css
a .term{ r:.6; transition:r .09s linear; }         /* SVG <circle class="term"> */
a:hover .term, a:focus-visible .term{ r:2.4; }
```

### 特徵 4　密只出現在一處，並且緊貼著那片空

```js
/* 唯一的密處：黃金角散佈的實心點叢，半徑 0.62–1.66，不作為調子、不平鋪 */
let s='';
for(let k=0;k<86;k++){
  const t=k*2.399963, r=Math.sqrt(k/86);
  s+=`<circle class="sf" cx="${(CX+Math.cos(t)*r*62).toFixed(1)}"
        cy="${(CY+Math.sin(t)*r*46).toFixed(1)}" r="${(0.62+((k*7)%5)*0.26).toFixed(2)}"/>`;
}
```

規則：**整個畫面只准有一叢**，而且它的重心必須落在最大留白之內或與之共邊。
兩叢以上，畫面就開始有「灰的分布」，特徵 1 立刻失效。

### 特徵 5　雙線版框與角落的作者記號

```html
<rect x="20" y="20" width="580" height="820" fill="none" stroke="var(--ik)" stroke-width="2.4"/>
<rect x="27" y="27" width="566" height="806" fill="none" stroke="var(--ik)" stroke-width="0.8"/>
```

粗細比固定 **3:1**、間距 7 單位。記號放在框內任一角、佔畫面 <1.5%，
必須是實心幾何（本站用三枝燭台，出自 Beardsley 自己的三燭簽名）。
沒有這兩層框，畫面會退回成「一張插圖」；有了它，它是一塊版印出來的東西。

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 紙 | `#EFE9DA` | 底、留白、反白字 | 約 62% |
| 墨 | `#0C0C0E` | 全部黑塊、全部線、全部正文 | 約 31% |
| 孔雀 | `#0F5C55` | **唯一的第三色**：連結、現用態、被選中、鏤空提示線 | ≤5% |

硬規則：

* 紙不是白（#FFF）也不是灰白，是帶黃的米——它必須看起來像紙，但**不准鋪紙紋、顆粒或 noise**。
* 墨不是純黑 #000，微偏藍紫（#0C0C0E）——印在暖紙上才不會發紫。
* 這三個值以外的顏色，全站不得出現。**警示、錯誤、退件一律用墨底反白**（`background:var(--ik);color:var(--pa)`），不准用紅。
* 對比：墨對紙約 15.6:1，孔雀對紙約 6.9:1（≥AA）。

---

## 四、字體系統

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,300&family=Noto+Serif+TC:wght@300;500;700&display=swap" rel="stylesheet">
```

```css
body{ font-family:"Cormorant Garamond","Noto Serif TC",Georgia,serif;
      font-weight:300; font-size:17px; line-height:2.02; }
h1{ font-weight:300; font-size:clamp(38px,5.6vw,74px); line-height:1.24; letter-spacing:.02em; }
h2{ font-weight:300; font-size:clamp(25px,3vw,36px); }
h3,.lat{ font-weight:500; font-size:12px; letter-spacing:.24em; text-transform:uppercase; }
.num{ font-variant-numeric:tabular-nums; letter-spacing:.06em; }
.sm { font-size:12.5px; line-height:1.86; }
```

* 高對比的舊式襯線體（Cormorant Garamond ＝ Garamond 系）是這個年代印刷品的體感；**不得用無襯線**當正文。
* **字重只用 300 與 500/600 兩級**，不用 400——中間值就是灰。
* 拉丁小標一律**全大寫 ＋ .24em 字距**，這是 1890 年代書名頁的做法。
* 中文正文行高放到 **2.0** 以上。這個風格靠留白活著，段落之間的空是設計的一部分。

---

## 五、版面與網格

* **極不對稱。** 左側留 132px 只放一條 0.8px 的垂直細線與導覽；內容全部靠右，正文欄寬 ≤44em。
* **不置中。** 沒有 max-width + margin auto 的居中欄。
* **章節之間只用一條 0.8px 細線分隔**，上下留 74px 以上的空；不用卡片、不用底色塊、不用圓角。
* **表格只有橫線。** `border-collapse:collapse`，只留 `border-bottom:.8px solid var(--ik)`，無底色、無斑馬紋。
* 每一頁有一條「章程線」（見第七章導覽），它的 y 值每頁不同，因此每頁的標題起始高度不同——這是刻意的節奏。

```css
.wrap{ margin-left:132px; padding-right:clamp(20px,5vw,86px); max-width:1180px; }
.sec { padding-top:74px; }
.rule-top{ border-top:.8px solid var(--ik); padding-top:14px; }
.grid2{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px,4vw,64px); align-items:start; }
```

---

## 六、元件配方

**按鈕**（唯一狀態變化是整塊反白）

```css
.btn{ font:inherit; font-size:12.5px; letter-spacing:.2em; text-transform:uppercase;
      background:var(--pa); color:var(--ik); border:.8px solid var(--ik);
      padding:10px 20px; border-radius:0; cursor:pointer; }
.btn:hover,.btn:focus-visible{ background:var(--ik); color:var(--pa); }
.btn.solid{ background:var(--ik); color:var(--pa); }
.btn.solid:hover{ background:var(--pa); color:var(--ik); }
```

**表單**（只有下緣一條線；聚焦時線變 2px，不變色不發光）

```css
input,select,textarea{ font:inherit; font-weight:300; background:var(--pa); color:var(--ik);
  border:0; border-bottom:.8px solid var(--ik); border-radius:0; padding:7px 2px; width:100%; }
input:focus,textarea:focus{ outline:none; border-bottom-width:2px; }
label{ font-size:12px; letter-spacing:.16em; text-transform:uppercase; }
.err{ border-left:2px solid var(--ik); padding-left:9px; font-size:12.5px; }  /* 不用紅色 */
```

**卡片**——沒有卡片。用 `figure` ＋ 一條 `border-top` 的說明區塊代替。

**footer**：`border-top:2.4px solid var(--ik)`（與版框外線同粗），三欄，全部 12.5px。

---

## 七、動效規則

四種，缺一不可，全部有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 類 | 名稱 | 觸發 | 具體值 |
|---|---|---|---|
| 環境 ambient | **燭焰不定** | 無 | 三枚燭焰各自 `scaleY` 在 .86–1.13 之間跳動，週期 9.7s／11s／13.4s（互質，因此永不同步），`steps(1,end)` 逐格跳而非補間——因為連續補間會產生中間值，中間值就是灰的時間版本 |
| 環境 ambient | **塵的位移** | 無 | 那一叢點整體 `translate` ±3px，34s 一輪，`steps(1,end)` |
| 輸入 input | **端點鼓起／刻線浮現** | hover／focus | 導覽端點 `scale(1→1.9)` 90ms linear；版上區塊浮現 1.6px 孔雀色虛線刻線，延遲 <100ms |
| 轉場 transition | **刀口推移** | 進場／換版 | `clip-path:inset(var(--wipe) 0 0 0)`，`--wipe` 100%→0%，460ms `cubic-bezier(.7,0,.26,1)`，硬邊、無淡入 |
| 簽名 signature | **墨吞 mass-swallow** | hover／focus 任一黑塊 | 該黑塊沿自身輪廓法線外長 3.4%（340ms `cubic-bezier(.72,0,.24,1)`），**把緊鄰的髮線細節整根蓋掉**——細節不是淡出，是被覆蓋；放開後同一根線原封不動回來 |

```css
@property --s0{ syntax:'<number>'; inherits:false; initial-value:0 }
@property --wipe{ syntax:'<percentage>'; inherits:false; initial-value:100% }

/* 墨吞：黑塊與遮罩裡的同一塊，共用一個變數，所以線描的圖地邊界跟著長 */
.plate .pn[data-k="0"], .plate mask use.k0{
  transform-origin:112.4px 168.9px;                 /* 該塊自己的重心，避免依賴 transform-box */
  transform:scale(calc(1 + .034*var(--s0,0)));
  transition:--s0 .34s cubic-bezier(.72,0,.24,1);
}
/* 刀口推移 */
.wipe{ clip-path:inset(var(--wipe) 0 0 0); animation:wp .46s cubic-bezier(.7,0,.26,1) both; }
@keyframes wp{ from{--wipe:100%} to{--wipe:0%} }

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation:none!important; transition:none!important; }
  .wipe{ clip-path:none; }               /* 直接是最終畫面 */
  .plate .pn,.plate mask use{ transform:none; }
}
```

**明文禁用**：淡入式滾動揭示、視差、數字滾動、跑馬燈、模糊陰影、彈跳 easing、
任何用 `opacity` 表達狀態的動畫（那是把灰動起來）。

---

## 八、插畫與圖像風格（massvoid-hairline 墨塊與髮線二元構成）

**一張圖只由兩層組成，而且兩層永遠是同一份幾何的兩種讀法：**

1. **墨塊層**：把畫面切成 n 塊（本站 n=12）的封閉區域，每塊只有「填墨」或「不填」兩態，**永遠不描邊**——它的剪影就是全部資訊。
2. **髮線層**：一份**固定不變**的等寬輪廓線描，畫兩次：一次墨色、遮罩在留白區；一次紙色、遮罩在墨塊區。
   於是黑塊長到哪裡，線就在哪裡被吞掉；黑塊退開，同一根線原封不動地回來。

```html
<!-- 兩層的核心：同一份 #figdef 畫兩次，只差在遮罩 -->
<mask id="mi"><rect width="620" height="860" fill="#000"/>
  <use class="k3" href="#p3" fill="#fff"/><use class="k7" href="#p7" fill="#fff"/></mask>
<mask id="mb"><rect width="620" height="860" fill="#fff"/>
  <use class="k3" href="#p3" fill="#000"/><use class="k7" href="#p7" fill="#000"/></mask>

<use class="pn on" data-k="3" href="#p3"/>              <!-- 墨塊層 -->
<g class="ct ink" mask="url(#mb)"><use href="#figdef"/></g>   <!-- 線，墨色 -->
<g class="ct pap" mask="url(#mi)"><use href="#figdef"/></g>   <!-- 同一份線，紙色 -->
```

只准用三種原語：

| 原語 | 用途 | 禁止 |
|---|---|---|
| 等寬輪廓 | 唯一的線，界定邊 | 不得中途變粗、不得虛線、不得描邊填色並用 |
| 實心點 | 母題的心、密叢 | 不得當網點、不得平鋪、不得表達濃淡 |
| 水滴形 | 燭焰、花瓣、羽眼 | 不得加內部漸層或第二色 |

**判準**：拿掉全部顏色與文字，仍讀得出「哪一塊是不可分割的黑，哪一條線不承擔明暗」。

母題庫（可直接抄）：孔雀羽眼（水滴＋兩枚同心橢圓＋實心心）、薔薇（四條螺線弧＋實心心）、
燭焰（單一水滴，實心）、葉（兩段對稱三次貝茲）、塵叢（黃金角散點）。

---

## 九、Logo 與 Favicon

* Logo：**雙線框 ＋ 一組實心幾何記號 ＋ 全大寫寬字距拉丁小標**。記號用同一套原語（矩形＋水滴），不得用線描。
* Favicon：把記號縮到 32×32，只留**實心矩形與水滴**，線一律去掉——16px 下等寬線會消失，實心塊不會。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23EFE9DA'/%3E%3Cg fill='%230C0C0E'%3E%3Crect x='4.6' y='12' width='2.6' height='12'/%3E%3Crect x='2.2' y='24' width='7.4' height='2'/%3E%3Cpath d='M5.9 5.4c1.9 2 2 4 0 5.6c-2-1.6-1.9-3.6 0-5.6z'/%3E%3Crect x='14.7' y='8' width='2.6' height='16'/%3E%3Crect x='12.3' y='24' width='7.4' height='2'/%3E%3Cpath d='M16 1.4c1.9 2 2 4 0 5.6c-2-1.6-1.9-3.6 0-5.6z'/%3E%3Crect x='24.8' y='12' width='2.6' height='12'/%3E%3Crect x='22.4' y='24' width='7.4' height='2'/%3E%3Cpath d='M26.1 5.4c1.9 2 2 4 0 5.6c-2-1.6-1.9-3.6 0-5.6z'/%3E%3C/g%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

* 先決定黑塊放哪裡，再決定線畫什麼。黑塊是構圖，線是說明。
* 讓最大的那片白通出版外，通得越徹底越好。
* 把「程度」翻譯成「數量」：三顆實心點比一個 30% 的灰有力，也才合規。
* 每一頁只留一叢密。想再密一次，換一頁。
* 錯誤與警示用墨底反白。這個風格的「紅」就是黑。

**Don't**

* 不要灰、不要網點、不要交叉排線、不要 `opacity:.5`、不要 `blur`。
* 不要圓角、不要陰影、不要卡片牆、不要置中大標＋副標＋兩顆按鈕。
* 不要把線畫成一頭粗一頭細（那是素描），也不要用 `stroke-dasharray` 當裝飾。
* 不要在同一畫面放兩叢以上的密。
* 不要用紫藍漸層、emoji icon、Lorem ipsum、「EST. 19xx」徽章、「把 X 變成 Y」句式標題。
* 不要因為畫面「太空」就補東西。**空是做完的狀態，不是還沒做完。**

---

## 十一、頁面骨架範例（可直接使用）

```html
<body style="--rule:200px">
  <svg id="lib" width="0" height="0" aria-hidden="true"><defs>
    <path id="p0" d="…"/><!-- …n 塊區域… -->
    <g id="figdef"><!-- 固定的等寬線描 --></g>
  </defs></svg>

  <nav class="rail" aria-label="主導覽"><span class="stem"></span>
    <a href="a.html" style="top:150px"><span class="stub"></span><span class="dot"></span><span class="lb">一　空白</span></a>
    <a href="b.html" style="top:200px" aria-current="page"><span class="stub"></span><span class="lb">二　定黑</span></a>
  </nav>
  <span class="crossing"></span>   <!-- 現用頁那條線越過整個版面，成為內容的上框 -->

  <div class="wrap">
    <div class="head"><h1>定黑</h1><p class="lat">SET THE BLACK</p></div>

    <section class="sec">
      <div class="rule-top"><p class="lat">章節 ／ SECTION</p></div>
      <div class="grid2">
        <div class="wipe"><!-- 圖版 --></div>
        <div class="wipe d1"><p>正文…</p></div>
      </div>
    </section>

    <footer>
      <div class="cols">…</div>
    </footer>
  </div>
</body>
```

導覽（**未斷線 unbroken-rule**）的語意：四頁掛在同一條垂直細線上，
非現用頁的支線走 34px 後**收在一個實心菱點**上；現用頁那一條**不收尾**——
它一路走出導覽區、橫過整個版面，變成內容的上框線。
現用態不是被標示、不是被反相、不是變大變小，而是**它不再是一個導覽項目，它就是這一頁的框**。
≤900px 時攤平為頂部四格橫列（現用格墨底反白），頁尾另備完整文字連結保底。

---

## 十二、技術實作與相容性

### 1. CSS `clip-path` ＋ SVG `<mask>` 遮罩幾何（A 渲染層）

**承載**：特徵 1 與特徵 2 的圖地互換。同一份線描（`#figdef`）只寫一次，
用兩個互補遮罩畫兩次，因此「黑塊吃掉細節」不是另外畫一套圖，而是遮罩邊界移動的必然結果。
轉場「刀口推移」用 `clip-path:inset()`。

* **查證（2026-08-30）**：MDN《clip-path》與《polygon()》標示 **Baseline Widely available，自 2020-01 起跨瀏覽器**。
  SVG `<mask>` 元素為 SVG 1.1 內容，現行瀏覽器全數支援，無支援缺口。
* **實作要點**：遮罩內以 `<use href="#pN">` 參照同一批 `<path>`，
  因此對 `<use>` 施加的 `transform` 會同時作用在「黑塊」與「遮罩」上，兩者永遠對齊——
  這是簽名動效能成立的前提。若改用 `<clipPath>`，其子元素在部分實作中不吃 CSS `transform`，會脫鉤。
* **Fallback**：遮罩若不生效，`<g class="ct ink">` 會整份畫在最上層，
  畫面退化為「線描完整、黑塊在下」——所有線仍可見，資訊零損失，只是失去被吞噬的效果。
  SVG 全被停用時，頁面上的文字、表格、律文、讀數皆為一般 HTML，可完整閱讀。

### 2. CSS `@property` 型別化自訂屬性補間（B 動效與時間軸層）

**承載**：簽名動效「墨吞」與轉場「刀口推移」。
`--s0…--s11`（`<number>`）與 `--wipe`（`<percentage>`）若不註冊型別，
瀏覽器會把它們當字串，`transition` 只能離散跳值——黑塊會瞬間變大、刀口會瞬間切完，
兩個動效都不成立。這是**必須**用 @property 的地方，不是拿它來炫技。

* **查證（2026-08-30）**：web.dev《@property: Next-gen CSS variables now with universal browser support》
  與 caniuse `mdn-css_at-rules_property`：**Baseline Newly available，2024-07-09**
  三大引擎齊備（Chrome/Edge 85+、Safari 16.4+、Firefox 128）。
* **Fallback**：CSS 內一律寫 `var(--s0,0)` 與 `inset(var(--wipe,0%) …)`。
  不支援 @property 時 `var()` 取到 fallback，`scale()` 恆為 1、`inset()` 恆為 0%——
  黑塊不長、內容直接是最終畫面，版面與資訊完全一致。
* **降級**：`prefers-reduced-motion:reduce` 下兩者皆停用（`transform:none`、`clip-path:none`），
  版況、讀數、律文與圖版內容不變。

### 3. 規則引擎 ＋ 設計空間窮舉（E 資料與生成層）

**承載**：四條律的裁定、票籍的收錄門檻、「離最近的合律版差幾塊」的漢明距離搜尋。
關鍵是**同一支 `judge()` 同時用於三個方向**：裁定使用者當下這一版、
窮舉全部 2¹²＝4,096 種塗法算出通過的 494 種（12.06%）、
以及對 494 個合律版做漢明距離最小化。沒有隱藏真值、沒有評分、沒有滑桿——
規則全部印在頁面上，使用者可以自己驗算。

* **技術面**：純 JavaScript（陣列、位元運算、DFS 連通分量），無瀏覽器 API 依賴，無相容性問題。
  決定性亂數為 FNV-1a → mulberry32，同輸入恆得同結果，故 `?p=` 版碼可完整還原。
* **實測（Node 22，單執行緒）**：4,096 次裁定 **6.9 ms**；
  對 494 個合律版做 200 次最近距離搜尋 **2.4 ms**。頁面載入時當場跑一次並把毫秒數印在頁面上。

### 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（inline 全部 CSS/JS/SVG） | ≤350KB | 53.5 / 60.1 / 61.2 / 99.5 KB |
| 首屏 JS 執行 | ≤100ms | 窮舉 4,096 約 7ms ＋ 13 張圖版字串組裝，遠低於門檻 |
| 主要動畫 | 60fps | 每次 hover 只寫一個 CSS 自訂屬性；動畫只改 `transform` 與 `clip-path`，不觸發 layout |
| 外部資源 | 僅 Google Fonts | 零外部圖片、零音檔、零函式庫 |

---

*本規格書描述的是一種製版限制長出來的視覺語言。它最適合小尺寸、近距離、需要被記住的東西：
藏書票、書名頁、節目單、詩集封面、香水標籤、獨立唱片內頁。
它最不適合的是需要表達「程度」的介面——因為它沒有灰可以用。*
