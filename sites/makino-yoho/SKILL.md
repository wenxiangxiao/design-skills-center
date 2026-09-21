---
name: makie-sprinkled-lacquer
description: Japanese maki-e lacquer decoration as a web visual language — tone made only of metal-powder grain size and areal density, motifs suspended in a translucent amber ground, relief lit by a real specular light, and a polish-through reveal.
---

# 漆器蒔繪 Maki-e — 蒔かれた粉の風格規格書

> 這份文件描述的是**日本漆藝的蒔絵**：在未乾的漆上「蒔く」（撒）金銀粉，塗漆埋起來，再用炭研磨把粉研出來。
> 它不是「黑底加金色」。深底鎏金是 Art Deco 的公式；蒔絵的本體是**粒**。
> 一個從沒看過 Demo 的 AI，只讀這份文件就應該能做出風格一致的新站。

---

## 〇. 本風格的 5 個不可省略特徵

這五項每一項都是「拿掉它就不是蒔絵了」。五項全部要在畫面上看得見。

### 特徵 1／調子只能由「粒の号数 × 面密度」做出來

蒔絵師手上沒有色階，只有一格一格的粉。丸粉分**一号（最細）到十五号（最粗）**；三号以下用在平蒔絵，八号以上用在研出蒔絵。要讓一塊地看起來濃，只有兩個辦法：換粗一號的粉，或者蒔密一點。**禁止漸層、禁止半透明、禁止 filter blur 做陰影。**

```js
/* 粒度階梯：号数 → 一粒の辺（viewBox 単位）。この一行が風格の根です */
function gou(n){ return 0.85 + n * 0.30; }   // 一号 1.15 … 十五号 5.35

/* 層化ジッター散布。格子ではないので、拡大しても網点になりません */
function build(seed, w, h, n, g, dens){
  var r = prng(seed),
      cols = Math.ceil(Math.sqrt(n * w / h)), rows = Math.ceil(n / cols),
      cw = w / cols, ch = h / rows, o = ["","","",""], i, j, x, y, z, s;
  for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
    x = (i + r()) * cw; y = (j + r()) * ch;
    if (r() > dens(x / w, y / h)) continue;      // ← 密度がそのまま調子
    z = (r() * 4) | 0;                           // ← 埋まっている深さ
    s = g * (0.60 + 0.80 * r()) * (1 - 0.15 * z);// ← 深いほど小さく見える
    o[z] += "M" + x.toFixed(1) + " " + y.toFixed(1)
          + "h" + s.toFixed(1) + "v" + s.toFixed(1) + "h-" + s.toFixed(1) + "z";
  }
  return o;                                      // 深さ四層の path d
}
```

判準：放大任何一張圖，**每一個明度差都要能解析成數得出來的離散粒**；找不到任何連續的明度變化，也找不到任何規則的網點格子。

### 特徵 2／形是密度的落差，不是輪廓線

蒔絵沒有描線。花瓣的邊是「這裡蒔得密、那裡蒔得疏」的交界。**全站 `stroke` 作為圖像一律零**（唯一例外是無障礙要求的 `:focus-visible` outline）。

```js
/* 形＝密度関数。線は一本も書きません */
function disc(cx, cy, rx, ry, a){
  return function(u, v){
    var x = (u - cx) / rx, y = (v - cy) / ry, t = Math.sqrt(x * x + y * y);
    return t > 1 ? 0.012 : a * (1 - 0.66 * t * t);   // 外側は「地の粉」だけ残す
  };
}
function blossom(k, a){            // k 弁の花。極座標の閾値だけで形になる
  return function(u, v){
    var x = (u - .5) / .40, y = (v - .5) / .40,
        t = Math.sqrt(x * x + y * y), th = Math.atan2(y, x),
        R = 0.52 + 0.40 * Math.abs(Math.cos(th * k / 2));
    return t < 0.16 ? a : (t < R ? a * 0.92 : 0.012);
  };
}
```

判準：把任何一個形放到最大，**找不到一條能沿著形走一圈的連續線**。

### 特徵 3／地は透明で、粉はその中に沈んでいる（梨子地・溜）

漆是半透明的琥珀色。粉不是印在紙上，是**泡在漆裡**，所以同一顆粉的顏色與大小由它埋得多深決定。這條也讓本風格成為少數**允許 `opacity`** 的流派——因為那層透明的漆是真的。

```css
/* 一つの金粉の五つの深さ。色を五つ持っているのではありません */
:root{
  --hikari:#DCC98B;  /* 深さ0：光が当たっている */
  --kin:   #C3A860;  /* 深さ1 */
  --naka:  #A98A46;  /* 深さ2 */
  --umore: #8A6A34;  /* 深さ3：いちばん沈んでいる */
  --shita: #6E5226;  /* まだ研ぎ出されていない（漆の下） */
}
.mk .z0{fill:var(--hikari)} .mk .z1{fill:var(--kin)}
.mk .z2{fill:var(--naka)}   .mk .z3{fill:var(--umore)}

/* 地蒔き（梨子地）：小さな粒を一面に。これが「余白」の正体で、白ではありません */
.nashi{ background:#7B4A19 }
```

判準：畫面上**沒有一處純粹的空白**。留白的地方是低密度的蒔地，不是紙也不是背景色。

### 特徵 4／高蒔絵は本当に高い——投影ではなく鏡面反射

盛り上げた紋樣會反光。這不能用 `box-shadow` 假裝，因為投影是「光被擋住」，而蒔絵的立體感是「粉的肩膀把光彈回來」。用 SVG 的照明濾鏡，以粒子場自身的 alpha 當凹凸圖。

```xml
<filter id="taka" x="-10%" y="-10%" width="120%" height="120%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="bump"/>
  <feSpecularLighting in="bump" surfaceScale="5" specularConstant="0.84"
                      specularExponent="18" lighting-color="#F6E9C4" result="sp">
    <fePointLight id="lp" x="440" y="180" z="58"/>
  </feSpecularLighting>
  <feComposite in="sp" in2="SourceAlpha" operator="in" result="sp2"/>
  <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="sp2"/></feMerge>
</filter>
```

```js
/* 光は指に付いてくる。rAF で 1 フレーム 1 回だけ書き換える */
ban.addEventListener("pointermove", function(e){
  var r = ban.getBoundingClientRect();
  var px = (e.clientX - r.left) / r.width * 880,
      py = (e.clientY - r.top)  / r.height * 620;
  if (!raf) raf = requestAnimationFrame(function(){
    raf = 0; lp.setAttribute("x", px.toFixed(0)); lp.setAttribute("y", py.toFixed(0));
  });
}, {passive:true});
```

**明文禁止**：`box-shadow` 的 blur、`filter: drop-shadow`、任何做舊／刮痕濾鏡、任何金屬漸層。

### 特徵 5／切金と螺鈿だけが直線・平面・非粒子

整個畫面只有兩種東西不是粒：**切金**（剪成小方塊的金箔）與**螺鈿**（貝片）。它們是唯一允許的硬邊、直線與平色，而且必須**稀疏**——它們是標點符號，不是段落。本風格的所有「分隔線」都由切金列承擔，因為畫面上不能有線。

```css
/* 罫線の代わり。硬停點の repeating-linear-gradient は階調ではなく方塊なので合法 */
.kiri{
  height:4px;
  background:repeating-linear-gradient(90deg, #C3A860 0 4px, transparent 4px 11px);
}
```

```xml
<!-- 螺鈿は面積 2% まで。文字を載せてはいけません -->
<rect x="26" y="14" width="6" height="6" fill="#4F93A6"/>
```

判準：切金與螺鈿加起來 **不超過畫面的 8%**；其餘 92% 找不到任何一條直邊。

---

## 一. 設計哲學

**「濃くする」＝「もう一度蒔く」。**

蒔絵師不調色。一罐金粉、一罐銀粉、一層透明的漆，畫面上所有的深淺都是「蒔了幾次、用了幾號、埋得多深」三件事的結果。這個限制產生三個設計後果，任何用本風格做的站都必須接受：

1. **階層不是靠字級，是靠地の濃さ。** 重要的資訊不必用更大的字，讓它腳下的粉更密就好——而那個密度應該是資料本身（數量、金額、時長），不是設計師的偏好。
2. **余白不是白。** 蒔絵沒有「沒做事的地方」，只有「蒔得疏的地方」。任何一塊看起來空的地方都要有地蒔き。
3. **完成不是加上去，是減下來。** 研出蒔絵的最後一步是磨掉上面的漆。所以本風格的「揭示」不是淡入，是**上面的東西變少**。

---

## 二. 色彩系統

架上只有六個塗り，加上一個金粉的五個深さ。**沒有第七個顏色，也沒有任何一個顏色的淡版。**

| 名 | hex | 面積 | 用途 | 硬規則 |
|---|---|---|---|---|
| 溜塗 tame | `#42260F` | 42% | 唯一的大面積地色 | — |
| 飴 ame | `#7B4A19` | 16% | 第二の地（面板・頁尾・蓋・図版の下地） | 上に本文を置けるのは蜜白だけ |
| 蜜白 shiro | `#F1E5C7` | 12% | 本文・見出し | — |
| 銀鼠 gin | `#9BA29C` | 7% | 標籤・caption・英数副題 | 飴の上に置かない（2.84:1） |
| 赤金 aka | `#C9682C` | 5% | 現用態・不可逆動作・focus | **永不承載本文** |
| 螺鈿 raden | `#4F93A6` | 2% | 嵌めもののみ | **永不承載文字** |

金粉（同一種材料の五つの深さ。塗りではないので面積配額を持ちません）：
`#DCC98B` 光金 ／ `#C3A860` 青金 ／ `#A98A46` 中金 ／ `#8A6A34` 埋没金 ／ `#6E5226` 漆下（未研出）

**可讀性実測（WCAG 2.1）**：蜜白/溜 11.07・青金/溜 6.00・銀鼠/溜 5.31・蜜白/飴 5.91・赤金/溜 3.63（UI 専用）・螺鈿/溜 4.00（UI 専用）。

**その他の硬規則**：零 `#000`・零 `#FFF`・零灰階色碼・零真漸層（唯一合法的 `linear-gradient` 是硬停點的切金列與罫の代わり）・零 `filter: blur`・零 `box-shadow` の blur・零発光・零玻璃擬態・零紋理圖・零噪聲・圓角一律 0。
`opacity` は**漆の層としてだけ**使えます（平たい半透明の琥珀色の面）。色を薄くするために使ってはいけません——薄くしたければ粉を疎に蒔きます。

---

## 三. 字體系統

| 役 | 字體 | 字重 | 特性 |
|---|---|---|---|
| 商號・見出し・本文 | `Shippori Mincho B1` | 400 / 600 / 800 | 縦画の強い明朝。漆の面に彫ったように見える |
| 標籤・数字・英数副題 | `Zen Kaku Gothic New` | 400 / 500 | `font-feature-settings:"tnum"` で数字を等幅に |

```css
body{ font-family:"Shippori Mincho B1",serif; font-size:16px;
      line-height:1.92; letter-spacing:.045em }
.lab{ font-family:"Zen Kaku Gothic New",sans-serif; font-weight:500;
      font-size:.6rem; letter-spacing:.24em; color:var(--gin) }
```

字級 scale（比 1.22）：`.6 / .72 / .83 / .9 / 1.02 / 1.14 / 1.5rem`。
**本風格に hero はありません。** 画面でいちばん大きいものは粉の面であって字ではないので、**見出しの上限は 1.5rem**、商號は一行 1.14rem。大字を使いたくなったら、字を大きくするのではなく粉を密に蒔いてください。

字距は役割で決まります：商號 `.42em`、見出し `.34em`、標籤 `.24em`、本文 `.045em`。

---

## 四. 版面與網格

**網格はありません。** 蒔絵の板に罫は引かないからです。

- 首屏は「一面」。枠・欄・罫・格をすべて禁止し、資訊は面の上に**絶対配置**する。並べる順序ではなく、**足もとの粉密度**が階層。
- その密度は必ず**数の写像**であること。例：`密度 = 量 ÷ 最大量 × 76 + 10 (%)`。そしてその数を画面に印字する（「足もとの粉密度 86%・丸粉十三号」）。数を隠すと、ただの装飾に落ちます。
- **片身替り（かたみがわり）**：面を二つ／三つの区画に斜めに割り、区画ごとに号数と密度を変える。区画の幅も資料から出すこと。傾きは ±0.03（viewBox 幅に対する比）程度、左右交互。
- **吹き寄せ**：主題は画面の外へ抜けてよい。中央に置いて左右対称にするのは本風格ではありません。
- 段組みは `1.12fr .88fr` のような非対称な二欄を基本に。等幅二欄・中央三枚カードは禁止。
- 留白は「低密度の蒔地」。`background: var(--tame)` のままの矩形パネルを作らないこと。

RWD：
```css
@media(max-width:860px){ .two{grid-template-columns:1fr} }
@media(max-width:700px){                 /* 絶対配置を静的な流れに落とす */
  .makiji{display:flex;flex-direction:column-reverse;gap:16px}
  .fact{position:static !important;padding-left:11px;
        background:linear-gradient(180deg,var(--kin) 0 100%) no-repeat;background-size:3px 100%}
}
@media(max-width:560px){ body{font-size:15px} nav.kofun a{flex:1 1 44%} }
```
**粉密度は畫面幅が変わっても一つも変わりません。** 面が縮むだけです。

---

## 五. 元件配方

### nav（粉固め）
四つの項目は大小・位置・形・色がまったく同じ。変わるのは「粉が固まっているかどうか」だけ。現用頁の粉は輪郭に固着して縁が切れ、他の三つは未固着で少しずれており、hover するともう少し流れます。

```css
nav.kofun{display:flex;flex-wrap:wrap}
nav.kofun a{flex:1 1 0;min-width:110px;padding:12px 10px 11px;text-decoration:none;color:var(--shiro)}
nav.kofun a+a{box-shadow:inset 1px 0 0 rgba(241,229,199,.13)}   /* 罫ではなく段差 */
nav.kofun .loose{transition:transform .13s linear}
nav.kofun a:hover .loose{transform:translate(1.7px,1.2px)}
nav.kofun a[aria-current="page"] .nm{font-weight:800;color:var(--aka)}
```
未固着の層は生成時に層ごとに `translate(±1, ∓1)` させ、色は全部 `--umore` にする（沈んだまま）。固着した現用項だけが四つの深さ色を持ちます。
**無障礙**：粉が固まっているかどうかは輔助科技に見えないので、必ず `aria-current="page"` と赤金の頁名を併用すること。

### ボタン
`appearance:none; border:0; background:transparent;` が基本。**枠線で押せることを示さない**——押せるものは hover で地が飴に変わり、選ばれたものは名が赤金になります。選べないものは `disabled` ではなく `aria-disabled="true"` にし、押したら**なぜ選べないかを言う**（`role="status"` の一行に）。

### 表
罫線は引きません。行の区切りは**切金の列**です。
```css
th,td{padding:9px 10px 9px 0;
  background-image:linear-gradient(90deg,var(--umore) 0 3px,transparent 3px 9px);
  background-repeat:repeat-x;background-position:0 100%;background-size:auto 1px}
```
可能なら、表の一列に「その行のデータそのものを蒔いた粉見本」を置くこと。表が見本帳になります。

### footer
飴の面。上に境界線は引かず、色が変わることで分かれます。

---

## 六. 動效規則

**四種類・触发源はすべて別。安静は未完成です。**

| 種 | 触发 | 実装 | duration / easing |
|---|---|---|---|
| ambient | 時間 | 梨子地を三群に分け、`steps(1,end)` で順に光らせる | 5.4s、delay 0 / 1.8 / 3.6s |
| input | ポインタ | `fePointLight` の x/y を rAF で更新 | 遅延 <100ms（1 フレーム） |
| transition | 状態変化 | 飴の一刷けが `clip-path` で渡る | .62s linear |
| signature | スクロール | 研ぎ出し（下記） | view() 進捗に完全従属 |

### 署名動效：研ぎ出し

上に塗った漆が減って、埋まっていた粉が**深さの順**に出てきます。淡入ではありません——透明度は一切動かさず、粒の色が四段で切り替わります。

```css
.mk path{fill:var(--shita)}                       /* まだ漆の下 */
@keyframes t0{0%,10%{fill:var(--shita)}11%,100%{fill:var(--hikari)}}
@keyframes t1{0%,34%{fill:var(--shita)}35%,100%{fill:var(--kin)}}
@keyframes t2{0%,58%{fill:var(--shita)}59%,100%{fill:var(--naka)}}
@keyframes t3{0%,82%{fill:var(--shita)}83%,100%{fill:var(--umore)}}

@supports (animation-timeline: view()){
  .mk.togi path{animation-duration:1s;animation-timing-function:linear;
    animation-fill-mode:both;animation-timeline:view();animation-range:entry 4% cover 50%}
  .mk.togi .z0{animation-name:t0} .mk.togi .z1{animation-name:t1}
  .mk.togi .z2{animation-name:t2} .mk.togi .z3{animation-name:t3}
  .mk.togi-root path{animation-timeline:scroll(root block);animation-range:0 30vh}
}
@supports not (animation-timeline: view()){   /* 研ぎ上がった状態で静止 */
  .mk .z0{fill:var(--hikari)} .mk .z1{fill:var(--kin)}
  .mk .z2{fill:var(--naka)}   .mk .z3{fill:var(--umore)}
}
@media(prefers-reduced-motion:reduce){
  .mk path{animation:none !important}
  .mk .z0{fill:var(--hikari)} .mk .z1{fill:var(--kin)}
  .mk .z2{fill:var(--naka)}   .mk .z3{fill:var(--umore)}
}
```

**降級後の情報は零欠落**：研ぎ上がった面が最初から出ているだけです。文字は最初から最後まで一度も隠れません——研ぎ出しが変えるのは**飾りの深さ**であって、内容の可視性ではありません。これが「捲動揭示」と決定的に違う点です。

**禁止**：淡入を署名にすること、視差、数字のカウントアップ、`dashoffset` の描線（本風格に線はありません）、跑馬燈。

---

## 七. 插畫與圖像風格

原語は三つだけ。第四のものを足してはいけません。

1. **粒** — 一辺 `gou(n)` の正方形。回転させない（蒔いた粉は向きを持たない）。位置は層化ジッター散布。
2. **地** — 半透明の飴の面と、その中に沈んだ梨子地の粒。
3. **切金／螺鈿** — 唯一の硬邊・直線・平色。稀疏に。

明文禁用：照片、`<img>`、canvas、点陣图、半調網點、細線幾何線描、排線、交叉排線、`feTurbulence`／`feDisplacementMap` の偽質感、做舊・刮痕濾鏡、扁平化單色圖示庫、emoji 當 icon、金屬漸層、任何発光、任何模糊陰影、任何未被量化的漸層、任何圓角、圖像としての `stroke`。

密度関数のつくりかた（形を「書く」のではなく「どこが濃いか」を書く）：

```js
/* 山の稜線：ピークのガウス和が高さになり、稜線の上は地だけ */
var RIDGE = (function(){
  var pk=[[.05,.52],[.18,.86],[.31,.44],[.44,.98],[.57,.50],[.70,.80],[.83,.40],[.95,.62]];
  return function(u,v){
    var h=.16,i,t;
    for(i=0;i<pk.length;i++){ t=(u-pk[i][0])/.072; h=Math.max(h,.16+pk[i][1]*Math.exp(-t*t)); }
    var top=1-h*.86;
    if(v<top-.035) return .012;      // 空は地蒔きだけ
    if(v<top+.018) return .62;       // 稜線がいちばん濃い
    return .14+.34*(v-top);          // 手前へ向かって少しずつ濃くなる
  };
})();

/* 部分図を面のどこに置くかは remap で。形の定義とレイアウトを混ぜないこと */
function remap(f,x0,y0,x1,y1){
  return function(u,v){
    if(!(u>=x0&&u<=x1&&v>=y0&&v<=y1)) return .012;
    return f((u-x0)/(x1-x0),(v-y0)/(y1-y0));
  };
}
```

---

## 八. Logo と Favicon

Logo も粒だけで組みます。輪郭線を一本も引かないこと。

- **構造**：一つの単純な幾何（六角・円・方）を、**縁だけ密（0.94）／内側は疎（0.06）／中心域は中（0.55）** の三段の密度で蒔く。形が三段の密度差として立ち上がります。
- **深さ**：四層すべてを出力し、外側の層から `#DCC98B → #C3A860 → #A98A46 → #8A6A34` の順に重ねる。
- **サイズ**：viewBox は正方形に近い縦長（例 120×132）。粒は約 1,400 個で 12 KB 程度に収まります。
- **Favicon**：同じ関数を 32×32・150 粒で回し、二つの path（浅い二層と深い二層）に畳んで inline SVG data URI にする（約 840 バイト）。座標は整数に丸めること。

```js
var L = build(seed, 120, 132, 1450, gou(5), hexring(.5,.5,.44));
var tone = ["#8A6A34","#A98A46","#C3A860","#DCC98B"];
var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 132">'
        + '<rect width="120" height="132" fill="#42260F"/>';
for (var z = 3; z >= 0; z--) svg += '<path d="' + L[z] + '" fill="' + tone[3-z] + '"/>';
svg += '</svg>';
```

---

## 九. Do & Don't

**Do**
- 階調の数字（密度と号数）を画面に印字する。資料から算出する。
- 余白を低密度の蒔地で埋める。
- 高蒔絵は本物の鏡面反射で立体にする。
- 分隔は切金の列。
- 選べない操作には理由を言わせる。
- `prefers-reduced-motion` で四種すべてを止め、研ぎ上がった状態で静止させる。

**Don't**
- ❌ 「黒地＋ゴールドのグラデーション」＝ Art Deco であって蒔絵ではない。**本風格の地は黒ではなく溜（暖かい半透明の茶）**。
- ❌ 網点・ドットパターンを規則的な格子に並べる（それはハーフトーンで、粉ではありません）。
- ❌ `box-shadow` で浮かせる、`drop-shadow` で影をつける。
- ❌ hero 大標、中央揃えの三枚カード、角丸、紫青グラデーション、emoji アイコン、Lorem ipsum、「EST. 19xx」バッジ。
- ❌ 粒を回転させる、粒に `stroke` を足す、粒を円と方で混ぜる。
- ❌ 密度を「見た目で」決める（それをやった瞬間、本風格は単なる金色の装飾に落ちます）。
- ❌ 跑馬燈／marquee。

---

## 十. 頁面骨架範例（そのまま使えます）

```html
<body>
<div class="wrap">
  <header class="kantou">
    <p class="yago">屋号</p>
    <p class="soe">所在・業種・創業年</p>
    <nav class="kofun" aria-label="ページ">
      <a href="a.html" aria-current="page"><span class="mon" data-mk="n1" data-fix="1"></span>
        <span class="nm">一頁目</span><span class="en">ONE</span></a>
      <a href="b.html"><span class="mon" data-mk="n2"></span>
        <span class="nm">二頁目</span><span class="en">TWO</span></a>
    </nav>
  </header>
</div>

<div class="wrap"><main>
  <div class="makiji">
    <svg class="ban nashi" viewBox="0 0 880 620" aria-hidden="true">
      <defs><!-- filter#taka はここ --></defs>
      <rect width="880" height="620" fill="#7B4A19"/>
      <g id="g-nashi"></g>                             <!-- 地蒔き -->
      <g class="mk togi togi-root" id="g-ji"></g>      <!-- 各則の足もと -->
      <g class="mk togi" id="g-motif" filter="url(#taka)"></g>  <!-- 高蒔絵 -->
      <g id="g-kiri"></g>                              <!-- 切金の列 -->
    </svg>
    <div class="fact-layer">
      <div class="fact big" style="left:3.6%;top:4%">
        <b>いちばん量の多い事実。</b><span class="lab">足もとの粉密度 86%・丸粉十三号</span>
      </div>
      <!-- 以下、数だけ変えて八則 -->
    </div>
  </div>

  <section>
    <h2>見出し</h2><span class="lab">LATIN SUBTITLE</span>
    <table><caption>算出規則をここに書く</caption>…</table>
  </section>
  <div class="kiri"></div>
</main></div>

<footer><div class="wrap">…</div></footer>
</body>
```

```js
/* 最小の組み立て */
function paint(el, seed, w, h, n, g, dens){
  var o = build(seed, w, h, n, g, dens), s = "", z;
  for (z = 3; z >= 0; z--) s += '<path class="z' + z + '" d="' + o[z] + '"/>';
  el.innerHTML = s;
}
paint(document.getElementById("g-motif"), 1601, 880, 620, 1500, gou(5),
      remap(MOTIF, .375, .03, .625, .44));
```

---

## 十一. 技術實作與相容性

### 1. SVG `feSpecularLighting` ＋ `fePointLight`（A 渲染層）

- **承擔**：高蒔絵の隆起。粒子場自身の alpha を `feGaussianBlur` でならしたものを凹凸図（bump map）として使うので、**粉が厚いところが本当に高くなります**。
- **支援現況**：`surfaceScale` / `specularExponent` は MDN の互換性表で「Widely available」、**2015 年 7 月から主要ブラウザ全てで利用可能**（出典：MDN `SVGFESpecularLightingElement.surfaceScale` / `SVGFESpotLightElement.specularExponent` のブラウザー互換性）。SVG 1.1 (Second Edition) Filter Effects の範囲内で、ベンダー接頭辞は不要。
- **fallback**：フィルタが解決できない環境では `filter` 属性が無視され、粒子場がそのまま平らに表示されます。**形も密度も情報も一切変わりません**（失われるのはハイライトだけ）。
- **注意**：フィルタ領域は要素の bbox に対する相対値なので、`x/y/width/height` を `-10% / 120%` 程度に広げないとハイライトが切れます。ポインタ追従で x/y を書き換えるときは、フィルタ領域を小さく保つこと（本 Demo では 1 グループあたり約 250×350 px）。`requestAnimationFrame` で 1 フレーム 1 回に間引き、大面積のグループには掛けないこと。

### 2. CSS scroll-driven animations（B 動效與時間軸層）

- **承擔**：署名動效「研ぎ出し」。スクロール進捗そのものが「炭で研いだ量」になります。
- **支援現況（2026-09 時点で確認）**：Chrome / Edge 115+（2023-07、無フラグ）、Safari 26+（2025-09 に実装、26.4 でスレッド化、26.5 で進捗精度の修正）、Firefox は 132 で実装されたものの **stable では `layout.css.scroll-driven-animations.enabled` の裏（Nightly は既定で有効）**。Baseline 入りは Firefox 待ちで、2026 年の Interop 優先項目。グローバル対応率は約 84%。
- **fallback**：`@supports not (animation-timeline: view())` で**研ぎ上がった最終状態**を静的に当てます。Firefox stable のユーザーには「完成した蒔絵」が最初から見えるだけで、**情報の欠落はゼロ**。`@supports` ガードを外してはいけません（外すと非対応環境で `--shita` のまま沈んだ面が残り、絵が見えなくなります）。
- **注意**：`animation-fill-mode: both` を必ず付けること。付けないと範囲外で初期値に戻ります。首屏のようにすでに画面内にある要素は `view()` では進捗が出にくいので、`scroll(root block)` ＋ `animation-range: 0 30vh` を使い分けます。

### 3. 自作 粒子場エンジン（E 資料與生成層）

- **承擔**：全站の画像。依存ゼロ・ビルド工程ゼロ・ES5・約 90 行。
- **決定論**：`mulberry32`（seed → 同じ面）。同じ資料からは何度でも同じ絵が出ます。
- **效能實測**（Chrome 140 / Apple M2 / 1440×900）：
  - 候補 15,700／採用 6,400 粒で、生成 **8–14 ms**、`innerHTML` 込みの首屏 JS 実行 **14–19 ms**（予算 100 ms）。
  - ページ実容量 **21.3 KB**（inline CSS/JS 込み・外部画像ゼロ／予算 350 KB）。粒子の path 文字列は実行時にだけ存在するので、転送量には乗りません。
  - スクロール中 **60 fps**。研ぎ出しが動かすのは `fill` だけで、レイアウトもコンポジット層も変わりません（layout thrashing ゼロ）。
  - ポインタ追従は rAF で 1 フレーム 1 回、実測 1 フレーム（<17 ms）。
- **上限の目安**：1 ページ 8,000 粒まで。超えるときは地蒔きを `<pattern>` のタイルに逃がすか、候補数を減らしてください。座標は `toFixed(1)`、粒の辺も `toFixed(1)` に丸めると path 文字列が約 1 割縮みます。
- **`noscript`**：粒子は実行時生成なので、JS を切った環境には CSS の `radial-gradient` 二枚重ねで梨子地相当の地を敷きます（これは規則格子なので**あくまで保底**であり、本番の絵ではありません）。**文字・表・営業事実はすべて靜的 HTML に置き、JS が無くても一字も欠けないようにすること。**

```css
.no-js .ban{
  background-color:#7B4A19;
  background-image:radial-gradient(#C3A860 20%,transparent 22%),
                   radial-gradient(#8A6A34 16%,transparent 18%);
  background-size:12px 12px,19px 19px;background-position:0 0,6px 5px;
}
```

---

## 十二. 参考（外部參照）

- 研出蒔絵・平蒔絵・高蒔絵の工程分類、および丸粉の号数（1 号＝細、15 号＝粗。3 号以下は平蒔絵、8 号以上は研出蒔絵）、梨子地粉が平目粉をさらに薄く延ばして反らせた粉であること：日本の漆芸解説（コトバンク「研出蒔絵」、Wikipedia「蒔絵」、Namiki「研出高蒔絵」ほか）
- 浄法寺漆（岩手県二戸市）が国産漆の主産地であり、文化財修理に用いられること
- 日本蜜蜂の重箱式巣箱（内寸約 22 cm 角の枡を積み、年に一度最上段だけを切る）

**他の流派との分界**
- **泰式廟宇金漆 ลายรดน้ำ**：あれは金**箔**を黒地に貼り、平たいシルエットで画面を埋め尽くす。本風格は金**粉**で、調子が連続的に変わり、余白（低密度の蒔地）が構図の一部。
- **Art Deco**：「深底＋鎏金＋セリフのエンブレム」は本風格ではありません。本風格の地は黒ではなく溜で、対称でもなく、エンブレムもありません。
- **ハーフトーン／点描**：あれは規則格子か、大きさの等しい点。本風格の粒は格子に乗らず、大きさが号数と深さで決まります。
- **8-bit ピクセル**：あれは自由なピクセル格子。本風格には格子そのものがありません。

---

*漆器蒔繪 Maki-e スキル。Demo：`sites/makino-yoho/`（蒔野養蜂園）。*
