---
name: suminagashi-nested-rings
description: Japanese suminagashi marbling as an interface language — one ink, one breath, a family of nested closed curves that never cross, and information ordered by radius instead of rows.
---

# 墨流し Suminagashi ── 巢狀環（日本半身）

> 本 SKILL 描述的是**日本的墨流し**，不是西洋／土耳其的 ebru 大理石紋（館內 `moxi` 是那一半身）。兩者常被混為一談，但它們是兩種工藝：
> - **ebru／西洋大理石紋**：水裡加膠礬（carrageenan / 牛膽汁），墨會停在表面不擴散，可以用**梳耙**拉出羽狀、孔雀、平流花紋，多色。
> - **墨流し（本 SKILL）**：**清水**，不加任何膠。墨與松脂交替滴在**同一點**上，形成一族同心環；唯一的變形手段是**一次氣流**（吹氣或扇）。沒有梳、沒有耙、沒有多色——只有墨（有時加藍靛）。
>
> 外部參照：《後撰和歌集》與平安時代的料紙裝飾；福井縣越前的墨流し傳承（越前和紙）；Einen Miura《Suminagashi: The Japanese Art of Marbling》；Anne Chambers《The Practical Guide to Marbling Paper》中對 suminagashi 與 Turkish ebru 的工序分辨。

---

## 一、本風格的 5 個不可省略特徵

**判準：拿掉任何一項，畫面就不再是墨流し。** 每一項都附可直接複製的片段。

### 特徵 1 ── 一族「互不相交」的巢狀封閉曲線，而且它們全部來自同一個落點

墨是一滴一滴落在**同一點**上的。後落的墨把先落的環往外推，所以環**只會增加、不會減少、永遠不相交**。畫面上看到的每一條線，都是一條閉合的、把平面分成內外兩塊的曲線。

不相交是可以證明也可以驗算的。環 k 在角 θ 的距離：

```
r_k(θ) = R_k + a · w(R_k) · Σ A_i · sin(n_i·θ + φ_i)
R_k    = R_max · √((k+1)/N)        ← 面積守恆：外側的環越擠越密
w(R)   = (R / R_max)^1.15          ← 外側的環被推得久，歪得多
```

位移場 `{A_i, n_i, φ_i}` **全族共用**（因為氣流只來過一次）。只要 `w` 對 `R` 單調、且 `a·|w′(R)|` 小於相鄰環的間距，任兩環就不相交。

```js
// 建置期必跑：任兩相鄰環取樣 360 點，最近距離必須 > 0
function minGap(f, N, Rmax, amp, drift, samples){
  var mg = Infinity;
  for (var k = 0; k < N - 1; k++){
    var a = ringPoints(f, k,   N, Rmax, amp, drift, samples);
    var b = ringPoints(f, k+1, N, Rmax, amp, drift, samples);
    for (var i = 0; i < samples; i++){
      var best = Infinity;
      for (var j = -8; j <= 8; j++){
        var q = b[(i + j + samples) % samples];
        best = Math.min(best, Math.hypot(q[0] - a[i][0], q[1] - a[i][1]));
      }
      mg = Math.min(mg, best);
    }
  }
  return mg;          // 本館 Demo：5.555（單位＝畫面上的 1 mm）
}
```

**不合格的做法**：`feTurbulence` + `feDisplacementMap` 推一張噪聲、或用 blob 路徑亂扭。那樣做出來的線會互相穿過，而互相穿過的線**不是墨流し**——它是一張壁紙。

### 特徵 2 ── 一罐墨，零明度階；「淡」是線變細、不是墨變淡

傳統墨流し只有一種濃度的墨（有時第二罐是藍靛，但那是**另一種墨**，不是墨的淡版）。所以：

- 樣式表裡**零中間灰色碼**、零 `opacity` 當顏色用、零 `rgba()` 第四位、零漸層。
- 需要層次時，改變**線寬**與**環的疏密**。

```css
/* 線寬由內而外單調遞減，同一條環上恆定——因為那一環是同一滴墨 */
.ink{ fill:none; stroke:var(--sumi); stroke-linecap:round; }
.ink.ai{ stroke:var(--ai); }        /* 第二罐，不是第一罐變淡 */
```
```js
// 環 k 的線寬（N 條環）
var strokeWidth = +(1.95 - 1.25 * (k / (N - 1))).toFixed(2);   // 1.95 → 0.70
```

### 特徵 3 ── 全部的形變只來自**一次**外力，所以歪的方向處處一致

掟は「息は一度だけ」。一族環共用同一個位移場，因此每一條環的扭曲**方向相同、幅度隨半徑單調成長**。若每條環各扭各的，畫面立刻變成假的。

```js
// 位移場對全族共用；差別只在 w(R) 這個純量
function ringPoints(f, k, N, Rmax, amp, drift, samples){
  var R = Rmax * Math.sqrt((k + 1) / N), w = Math.pow(R / Rmax, 1.15), p = [];
  var ox = f.dx * drift * w, oy = f.dy * drift * w;      // 氣流的平移，同樣隨 w 成長
  for (var i = 0; i < samples; i++){
    var th = i / samples * Math.PI * 2, d = 0;
    for (var j = 0; j < f.harm.length; j++)
      d += f.harm[j].A * Math.sin(f.harm[j].n * th + f.harm[j].ph);   // ← 全族同一組 harm
    var r = R + amp * w * d;
    p.push([ox + r * Math.cos(th), oy + r * Math.sin(th)]);
  }
  return p;
}
```

### 特徵 4 ── 紙與水是兩個不同的色碼，而圖是**被撈起來的**

墨流し不是印在紙上的，是**紙去把浮在水面上的膜撈起來**。所以畫面上一定同時存在兩層：水（冷、略暗）與紙（暖、最亮）。兩者絕不可以是同一個色碼，也絕不可以用同一個顏色的深淺表示。水盤的緣是實體的（鉛或木），它是全站最暗的非墨色。

```css
:root{
  --kami:#ECE4D2;  /* 生成り紙・唯一の大面積底 */
  --mizu:#CBD5CE;  /* 水・紙より冷たく一段暗い。文字は載せない */
  --fuchi:#4F5A54; /* 盤の縁（鉛）。小さなラベルにも使える 5.68:1 */
}
.water{ fill:var(--mizu); }
.rim  { fill:none; stroke:var(--fuchi); stroke-width:5; }   /* 縁も一本の環 */
```

### 特徵 5 ── 零直線。分隔、邊框、罫線全部不存在

墨流しの盤の上に直線は一本もありません。因此本風格**明文禁止 CSS `border`、`<hr>`、SVG `<line>` / `<rect>` / `<polygon>` 作為圖像**。區塊的分界由**留白**與**水色的地**承擔；表格的隔行也是水色的地。唯一的例外是無障礙要求的 `outline`（focus 環）。

```css
table{ border-collapse:collapse; }         /* ← 唯一允許出現 "border" 字樣的地方 */
th,td{ padding:11px 16px; }                /* 罫線ではなく余白で分ける */
tbody tr:nth-child(odd){ background:var(--mizu); }   /* 隔行は色の地 */
a:focus-visible,button:focus-visible{ outline:2px solid var(--ai); outline-offset:3px; }
```

---

## 二、設計哲學

**水面是一種資訊架構，不是一張背景圖。**

大多數版面把資訊排進列、欄、格——那是紙與印刷機的遺產。墨流し給了另一種排序軸：**半徑**。環從一個點長出來，越外面越新；環互不相交所以可以數；每一條環都是一個位置。於是「第幾則資訊」這個問題的答案不是第幾列，而是**第幾環**——一個連續的實數。

這帶來三個必然的後果，照著做就對了：

1. **沒有 hero。** 一頁上最大的東西是那一族環，不是標題。標題上限 1.5rem，商號在刊頭裡是 1.06rem 的一行。理由來自工藝本身：紙上的字是後來才刷上去的細字，紙本身才是主角。
2. **沒有卡片。** 卡片是有邊框的矩形，而這裡沒有邊框也沒有矩形。要分組就用留白，或換一塊水色的地。
3. **一次成形，不可修改。** 紙離開水面的那一刻圖就固定了。介面語彙要反映這件事：完成態與未完成態的差別是「它還在不在會使它改變的介質裡」。

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 生成り紙 kami | `#ECE4D2` | 唯一的大面積底；頁尾上的文字色 | 52% |
| 墨 sumi | `#191917` | 大半の環・全部の本文・頁尾の滿版 | 22% |
| 藍靛 ai | `#22456E` | **第二罐**の墨（三本に一本の環）・連結・見出しの添字 | 14% |
| 水 mizu | `#CBD5CE` | 水面・隔行・パネルの地・頁尾の小さな文字 | 8% |
| 縁 fuchi | `#4F5A54` | 盤の縁（鉛）・ラベル・caption・環号 | 4% |

**硬規則**

- 零純白（最亮 `#ECE4D2`）、零純黑（最暗 `#191917`）。
- **零中間灰色碼**。灰く見えるところは細い線か、環と環のあいだの紙です。
- 零漸層、零 `filter`、零 `box-shadow`、零模糊、零發光、零金屬、零玻璃擬態。
- 零紅。**不可逆動作與 focus 一律用藍靛**——架上就兩罐墨，沒有第三罐可以當警告色。
- 圓角上限 0（矩形本來就不該出現；真的需要時也是 0）。

**可讀性實測（WCAG 2.1）**

| 前景 / 背景 | 比 | 用途 |
|---|---|---|
| 墨 / 紙 | **13.91:1** | 全部の本文 |
| 藍靛 / 紙 | **7.74:1** | 連結・添字 |
| 縁 / 紙 | **5.68:1** | caption・dt・環号（0.58–0.78rem） |
| 墨 / 水 | **11.69:1** | パネル内の本文 |
| 藍靛 / 水 | **6.50:1** | パネル内の連結 |
| 紙 / 墨 | **13.91:1** | 頁尾の本文 |
| 水 / 墨 | **11.69:1** | 頁尾の小さな文字・見出しラベル |

**明文禁止**：縁 `#4F5A54` 放在墨底上（2.45:1）。水 `#CBD5CE` 承載文字（它是水，不是紙）。

---

## 四、字體系統

一枚の證書用紙です。用的是明朝——橫細豎粗、起筆收筆有墨的痕跡，與環的線質同族。

```html
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;800&family=Noto+Serif+TC:wght@400;700&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet">
```
```css
body{
  font-family:'Shippori Mincho','Noto Serif TC',"Songti TC",serif;
  font-size:16px; line-height:1.95;          /* 行高は広く——紙の余白が主役 */
  font-feature-settings:"palt" 1;
}
.num, .en{ font-family:'EB Garamond',serif; }  /* 数字とラテンは別の罐 */
```

字級 scale（**本流派沒有 hero**）：

| 用途 | 級數 | 字重 | 字距 |
|---|---|---|---|
| 商號（刊頭） | 1.06rem | 800 | .14em |
| 節標題 h2 | 1.5rem | 800 | .10em |
| 小標 h3 | 1.02rem | 700 | .09em |
| 本文 | .93–1rem | 400 | 0 |
| 表・註 | .78–.87rem | 400 | 0 |
| ラベル（dt・caption・英數副標） | .58–.62rem | 400 | **.24–.34em** |
| 環上の文字 | 11.6–12.6px | 500 | .09em |

**階層由字距與位置承擔，不由明度承擔**——因為本風格零明度階。ラベル是「字很小、字距很開的縁色」，不是「比較淡的字」。

---

## 五、版面與網格

- 版心 `max-width:1040px`，`padding:0 24px`（≤560px 時 16px）。
- **沒有網格。** 首屏由一族環佔滿；其餘區塊是單欄的長文＋表。需要並排時用 `grid-template-columns:repeat(auto-fit,minmax(280px,1fr))`，間距 30px，**不加任何框**。
- 區塊間距 `section{padding:46px 0 0}`。頁尾 `margin-top:66px`，滿版墨底。
- **環上排字**：用 `<textPath>`，把標籤放在**上弧**（`startOffset` 落在 55.5%–94.5% 之間，以 θ=270° 為中心），並在三個中心角 `.667 / .750 / .833` 之間輪替，讓半徑相鄰的兩條記事環在角度上分開。

```html
<path id="r19" class="ink" stroke-width="1.04" d="M…Z"/>
<text class="ring-label" style="font-size:12.6px" dy="-5">
  <textPath href="#r19" startOffset="75.20%">利率 月三分（年三十六分）・流質は三か月</textPath>
</text>
```
```js
// startOffset は「必要な弧長の割合」から逆算して中心角に合わせる
var circ = 2 * Math.PI * R;
var need = estimateTextWidth(label, fontSize) / circ;      // CJK≈1em / Latin≈0.54em
var startOffset = center - need / 2;                       // center ∈ {.667,.750,.833}
console.assert(startOffset > 0.555 && startOffset + need < 0.945, '上弧からはみ出す');
```

**記事は藍靛の環にだけ書く。** 三本に一本が第二罐（`k % 3 === 1`）なので、記事環は必ず藍靛になり、墨の環は一本も文字を背負いません。これで「どの環に何か書いてあるか」が色だけで分かり、しかも明度階を一階も使っていません。

**≤760px**：環上の文字を隱し、記事環には 2.6px の小さな環と環号だけを残す。內容は必ず下の靜的表に同じものを置くこと（情報零損失）。

---

## 六、元件配方

### 導覽（環已閉合 / ring-closed）
四頁＝四條弧。現用頁那一條**閉合**成環（兩端點重合），因此平面被分成內外兩塊——所以裡側可以上色。其餘三條是開口的弧，兩端不相接。**沒有 logo、沒有品牌名、沒有漢堡選單**。

```html
<a href="nagashi.html" aria-current="page">
  <svg viewBox="0 0 34 34" aria-hidden="true">
    <circle class="inner" cx="17" cy="17" r="4.1"/>
    <path class="arc" d="M17 4.6 A12.4 12.4 0 1 1 16.9 4.6 Z"/>   <!-- 閉じた -->
  </svg><span><b>流し場</b><i>THE WORKSHOP</i></span>
</a>
<!-- 非現用：<path class="arc" d="M11.6 6.2 A12.4 12.4 0 1 0 22.4 6.2"/>  上に口が開く -->
```
```css
nav.rings .arc{ fill:none; stroke:var(--sumi); stroke-width:1.5; stroke-linecap:round; }
nav.rings .inner{ fill:none; }
nav.rings a[aria-current="page"] .arc{ stroke-width:1.9; }
nav.rings a[aria-current="page"] .inner{ fill:var(--sumi); }   /* 閉じたので内側ができた */
nav.rings a:hover .arc{ stroke-width:2.4; }                    /* hover は太さだけ・色は変えない */
```
> **無障礙**：閉不閉合對輔助科技不可見，所以現用項必須同時帶 `aria-current="page"`。**不要靠變色區分**——本風格零明度階，而且藍靛對墨只有 2.45:1。

### 按鈕
```css
button{ background:var(--mizu); border:0; padding:16px 12px 14px; font:inherit; color:inherit; }
button:hover .ink{ stroke-width:2.1; }            /* 変わるのは線の太さだけ */
button:focus-visible{ outline:2px solid var(--ai); outline-offset:3px; }
```

### パネル・表
```css
.panel{ background:var(--mizu); padding:26px 26px 30px; }        /* 枠ではなく地で囲う */
caption{ text-align:left; font-size:.6rem; letter-spacing:.32em; color:var(--fuchi); }
thead th{ font-size:.6rem; letter-spacing:.24em; color:var(--fuchi); font-weight:400; }
tbody tr:nth-child(odd){ background:var(--mizu); }
```

### 頁尾
滿版墨底、`grid auto-fit minmax(210px,1fr)`、標題用水色小字距開的 ラベル、本文用紙色。

---

## 七、動效規則（四種，缺一不可）

| 種類 | 名前 | 觸發 | duration / easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **水引き** | 無（常時） | 週期 22s，相位 `0.08·sin(2πt/22000)`，30fps 節流 | 完全停止在 phase 0；圖形與資訊完全相同 |
| input 輸入 | **透かし** | `pointermove` | 一次 rAF（<17ms） | 仍作用（只是不隨相位漂移） |
| transition 轉場 | **撈上** | 頁面／狀態進場 | 420ms `cubic-bezier(.22,.68,.3,1)` | `transition:none`，直接出現 |
| signature 簽名 | **接環** | 割符が継がった瞬間 | 每環 520ms、間隔 60ms 階梯 | dasharray 直接補滿，無動畫 |

### ambient〈水引き〉
```js
function loop(t){
  if (t - last > 33){                                   // 30fps で十分（22 秒の呼吸）
    ph = 0.08 * Math.sin(t / 22000 * Math.PI * 2);
    if (inView) for (var k = 0; k < N; k++) paths[k].setAttribute('d', path(pts(F, k, ph), cx, cy));
    last = t;
  }
  requestAnimationFrame(loop);
}
```
`IntersectionObserver` で畫面外は停止、`visibilitychange` でタブ非表示も停止。

### input〈透かし〉── coalesced events が要る理由
環は 0.7–1.95px の細さで 26 本ならんでいます。素の `pointermove` は 60Hz に間引かれるので、速く掃くと**あいだの環を飛ばします**。`getCoalescedEvents()` は間引かれる前の全サンプル（120–1000Hz）を返すので、軌跡が横切った環を一本も落としません。

```js
svg.addEventListener('pointermove', function(ev){
  var list = ev.getCoalescedEvents ? ev.getCoalescedEvents() : [ev];
  clearMarks();
  for (var i = 0; i < list.length; i++){
    var u = toUserSpace(list[i]), k = hitRing(u[0], u[1]);   // |r − r_k(θ)| < 9 で判定
    if (k >= 0){ paths[k].classList.add('hit'); marked.push(paths[k]); lastK = k; }
  }
  readout(lastK);                                            // 環号・半径・記事
});
```
```css
.ink.hit{ stroke-width:2.6 !important; }   /* 変わるのは太さだけ。色は変えない */
```

### transition〈撈上〉── 純 CSS、JS ゼロ
紙が水面から引き上げられる＝水面線が下から上へ抜けていく。

```css
.lift{
  transition: clip-path .42s cubic-bezier(.22,.68,.3,1), transform .42s cubic-bezier(.22,.68,.3,1);
  clip-path: inset(0 0 0 0);
  transform: translateY(0);
}
@starting-style{ .lift{ clip-path: inset(100% 0 0 0); transform: translateY(12px); } }

/* 離散プロパティ（display）も混ぜる場合 */
.pop{ transition: opacity .34s ease, transform .34s ease, display .34s allow-discrete;
      transition-behavior: allow-discrete; }
.pop[hidden]{ display:none; opacity:0; transform:translateY(8px); }
.pop:not([hidden]){ display:block; opacity:1; transform:translateY(0); }
@starting-style{ .pop:not([hidden]){ opacity:0; transform:translateY(8px); } }
```

### signature〈接環〉
```js
paths.forEach(function(p, k){
  var L = p.getTotalLength();
  p.style.strokeDasharray  = L + ' ' + L;
  p.style.strokeDashoffset = L;
  p.style.transition = 'stroke-dashoffset .52s cubic-bezier(.3,.7,.3,1) ' + (k * 0.06) + 's';
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ p.style.strokeDashoffset = '0'; }); });
});
```
內から外へ、一本ずつ継がっていく。**この動きは本館で本站にしかありません。**

---

## 八、插畫與圖像風格（ink-float 浮墨環構成）

全站零外部圖片、零照片、零 `<img>`、零點陣圖。三條原語，明文不允許第四條：

1. **環**＝一條封閉的參數曲線。線寬由環號決定（內粗外細 1.95→0.70），**同一條環上線寬恆定**——因為那一環是同一滴墨。
2. **零填色**，三個例外：水盤裡的水、logo 最內的一環、導覽閉合後的那一環（閉合才有內側）。其餘所有「顏色」都是環與環之間的紙。
3. **零直線、零多邊形、零描外形**。全站沒有一條直線段，也沒有任何一張圖是在描一個東西的外形——圖像只有環族。

**判準**：放大任何一張圖 →(a) 任取兩條環，取樣 360 點，沒有一對相交；(b) 找不到任何一段直線；(c) 找不到任何連續明度變化；(d) 每一條環的線寬處處相同，且由內而外單調遞減。

**明文禁用**：照片、半調網點、細線幾何線描（thin-lineart 是等寬的連續線描外形，本技法的線從不描外形且線寬逐環變化）、`feTurbulence` 假質感、任何做舊／掃描濾鏡、扁平化單色圖示庫、emoji、金屬漸層、任何發光、任何模糊陰影、任何漸層、任何透明度、任何圓角。

---

## 九、Logo 與 Favicon

Logo ＝同一支引擎的六環，最內一環填墨（第三環用藍靛）。它就是一滴墨落在水上的樣子，不是一個字母組合。

```js
// assets/logo.svg（72×72 viewBox）
for (var k = 5; k >= 1; k--)
  emit('<path fill="none" stroke="' + (k===2 ? AI : SUMI) + '"' +
       ' stroke-width="' + (2.0 - 0.2*k).toFixed(2) + '" d="' + ringPath(k) + '"/>');
emit('<path fill="' + SUMI + '" stroke="none" d="' + ringPath(0) + '"/>');   // 最内だけ塗る
```

Favicon ＝同じ引擎の四環、紙色の地。inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg…%3E">
```
線寬要粗（16px で見えるように 5.2→2.5），環は四本まで。**文字は入れない。**

---

## 十、Do & Don't

**Do**
- 先把環族生出來，再想版面。版面是環讓出來的空間。
- 資訊的順序＝半徑。要排第一的就放最外圈（最新）或最內圈（最舊），並在頁面上明說是哪一種。
- 每一個「狀態」都用**幾何**表示（閉合／開口、線的粗細），不用顏色。
- 一定要有一份與圖同內容的靜態表，關掉 JavaScript 一個字也不會少。

**Don't**
- ❌ 用 `feTurbulence` / `feDisplacementMap` 做「大理石紋」。那會讓線互相穿過，而且那是 ebru 不是墨流し。
- ❌ 多色。墨流しは一罐、せいぜい二罐。四色五色を浮かべた瞬間にトルコの ebru になります。
- ❌ 梳耙／羽狀／孔雀紋。那是 ebru 的花紋，墨流しには道具がありません。
- ❌ 明度階で層級をつくる。淡い墨は存在しません。
- ❌ 邊框・罫線・カード・圓角・陰影・漸層・グロー。
- ❌ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張卡片、emoji 圖示、Lorem ipsum、「EST. 19xx」徽章、「把 X 變成 Y」型標題。
- ❌ 把水色拿來當文字色，或把紙色與水色設成同一個值。

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="ja"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>流し｜〇〇</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;800&family=Noto+Serif+TC:wght@400;700&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet">
<style>:root{--kami:#ECE4D2;--sumi:#191917;--ai:#22456E;--mizu:#CBD5CE;--fuchi:#4F5A54}
body{background:var(--kami);color:var(--sumi);font:16px/1.95 'Shippori Mincho','Noto Serif TC',serif}
.wrap{max-width:1040px;margin:0 auto;padding:0 24px}</style></head><body>

<header class="mast"><div class="wrap">
  <span class="kana">よみがな</span><h1>商号</h1>
  <span class="en">LATIN NAME · PLACE</span>
  <p class="line">一行の業態説明。hero は置かない。</p>
  <dl class="readout">
    <div><dt>環</dt><dd data-out-no>—</dd></div>
    <div><dt>半径 MM</dt><dd data-out-r>—</dd></div>
    <div><dt>記事</dt><dd class="jp" data-out-t>環の上に指を置いてください</dd></div>
  </dl>
</div></header>

<div class="wrap"><nav class="rings" aria-label="ページ"><!-- 閉じた環／開いた弧 --></nav></div>

<main class="wrap lift">
  <div class="tray" data-tray data-field='{"N":26,"Rmax":300,…}'>
    <svg viewBox="0 0 760 760" role="img" aria-labelledby="t d">
      <title id="t">…</title><desc id="d">…（表にも同じ内容がある旨）</desc>
      <circle class="water" cx="380" cy="380" r="344"/>
      <circle class="rim"   cx="380" cy="380" r="344"/>
      <path id="r0" class="ink" stroke-width="1.95" d="M…Z"/>
      <!-- … 26 本 … -->
      <text class="ring-label" dy="-5"><textPath href="#r19" startOffset="75.20%">…</textPath></text>
    </svg>
  </div>

  <section>
    <h2><small>THE FACTS ON THE RINGS</small>営業事実</h2>
    <table><caption>環号・半径・内容</caption>
      <thead><tr><th>環</th><th>半径</th><th>項</th><th>内容</th></tr></thead>
      <tbody><tr><td class="num">2</td><td class="num">83.2</td><td class="key">商号</td><td>…</td></tr></tbody>
    </table>
  </section>
</main>

<footer><div class="wrap">…</div></footer>
<script>/* 環族引擎＋水引き＋透かし */</script>
</body></html>
```

---

## 十二、技術實作與相容性

本風格由三項技術承載。三項分屬不同層（E 資料與生成／D 輸入與感測／B 動效與時間軸）。

### 1. 自寫「一滴一環・單一位移場」環族生成器（E 資料與生成層）

自寫、無相依、無 build step、純 ES5 語法。承載特徵 1／3／5 與全部的圖像。

- **支援度**：只用 `Math.sin/cos/pow/sqrt/hypot` 與 SVG `<path d>`，無任何實驗性 API。
- **不相交保證**：建置期對相鄰環取樣 360 點總當，本 Demo 最小間隔 **5.555**（單位＝viewBox 的 1 單位＝畫面上的 1 mm）。低於 1.0 就必須降低 `amp` 或減少環數。
- **割符（split tally）**：半環必須以 θ=±π/2 為**端點**取樣，不可從整環的取樣點篩選——否則裁ち口が x=cx に落ちません。本 Demo 建置期驗算：裁ち口の `|x − cx| = 0.0000`、正解の一對の端點 y 差 = **0.0000**；不正解は 環數違い / 1.7–6.5 mm のずれ（いずれも目視可能）。
- **效能實測（Node 22, M 系）**：26 環（1,705 點）を一フレーム分つくって path 文字列にするまで **1.215 ms**。30fps 運転なので 1 フレーム 33 ms のうち約 3.7%。`setAttribute('d')` は 26 回／フレーム。

### 2. `PointerEvent.getCoalescedEvents()`（D 輸入與感測層）

承載 input 動效〈透かし〉。細い環を速く掃いたときに、あいだの環を落とさないために要ります。

- **支援度（caniuse, 2026-08 StatCounter シェア）**：**Global 94.84%**。Chrome 58+／Edge 79+／Firefox 59+／**Safari 18.2+（iOS 18.2+）**／Samsung Internet 7.2+／Opera 45+。IE は非対応。
  出典：[caniuse: PointerEvent API getCoalescedEvents](https://caniuse.com/mdn-api_pointerevent_getcoalescedevents)、[MDN: PointerEvent.getCoalescedEvents()](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents)。
  ※ MDN は現在も “not Baseline” と表示していますが、その判定は Safari 18.2（2024-12）以前の状況を反映したものです。caniuse の実データのほうが新しいので、両方を見たうえで採用しています。
- **secure context（HTTPS）必須。** GitHub Pages は HTTPS なので問題なし。ローカルで `file://` から開くと `undefined` になります。
- **fallback（具體行為）**：`ev.getCoalescedEvents` が無ければ `[ev]` を使う。判定も表示も同じロジックで動き、**速く掃いたときに途中の環を拾い落とすことがあるだけ**。読み取り三格の内容・靜的表・キーボード操作は一切変わらないので、情報は零損失。

```js
var list = ev.getCoalescedEvents ? ev.getCoalescedEvents() : [ev];
```

### 3. `@starting-style` ＋ `transition-behavior: allow-discrete`（B 動效與時間軸層）

承載 transition 動效〈撈上〉。**JavaScript ゼロ**で進場転場を書けるので、`prefers-reduced-motion` の降級も CSS 一枚で閉じます。

- **支援度**：Chrome/Edge **121+**、Safari **17.5+**、Firefox **129+**。2026 年時点で主要ブラウザすべてが対応。
  出典：[MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)、[MDN: transition-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior)、[caniuse: transition-behavior](https://caniuse.com/mdn-css_properties_transition-behavior)。
- **fallback（具體行為）**：未対応ブラウザでは `@starting-style` ブロックごと無視され、`allow-discrete` も無視されるので、**要素はアニメーションなしでそのまま表示される**。レイアウト・可読性・内容に影響なし。
- **注意**：`allow-discrete` は `@starting-style` の代わりにはなりません。進場は `@starting-style` が初期値を与え、`allow-discrete` が `display` の離散切替をトランジションに含めます。両方要ります。

### 效能預算（実測）

| 項目 | 予算 | 実測 |
|---|---|---|
| 単頁サイズ（inline 全部込み） | ≤350 KB | index 87.3／nagashi 69.0／awase 173.2／shichi 24.0 KB |
| 首屏 JS 実行 | ≤100 ms | 環族一フレーム生成 1.215 ms ＋ 初期化のみ |
| 主要アニメーション | 60fps | 30fps 節流で運転（22 秒周期のため十分）。畫面外・タブ非表示では停止 |
| 外部リソース | 画像・音声ゼロ | Google Fonts の CSS/WOFF2 のみ |

### 降級一覧（情報は零損失）

| 條件 | 起きること |
|---|---|
| JavaScript オフ | 環も文字も靜的 SVG なので全部見える。〈合わせ台〉は動かないが、規則と理屈は本文に書いてある |
| `prefers-reduced-motion` | 四種の動效すべて停止／即時化。位置・内容・判定は同一 |
| `getCoalescedEvents` 非対応 | 速い掃きで環を拾い落とすことがある。表示内容は同じ |
| `@starting-style` 非対応 | 撈上の転場なし。そのまま表示 |
| ≤760px | 環上の文字を隱し、記事環に小さな環＋環号を残す。内容は靜的表にある |
| ≤560px | 導覽が一列一項に。環族はそのまま縮小（環の本数・形は不変） |
