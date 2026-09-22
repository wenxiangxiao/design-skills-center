---
name: iznik-cini
description: Ottoman İznik ceramic style (1480–1600) — six fired glaze colours, constant-width manganese outlines, zero gradients, a raised Armenian-bole red, and an infinite vine field that is only ever cut by the vessel's edge.
---

# 伊茲尼克陶 İznik Çini — 風格規格書

> 奧斯曼，1480–1600。白化妝土上的鈷藍、青綠、亞美尼亞紅與錳黑，罩透明鉛鹼釉一次燒成。
> 示範站：AKTAR MÎZÂN 藥秤行（伊斯坦堡長市場的香藥行）。

---

## 〇・本風格的 5 個不可省略特徵

這一章是本規格書的核心。**任何一項拿掉，畫面就不再是伊茲尼克。**每一項都附可直接複製的片段。

### 特徵 1：紅是有厚度的——它不是顏色，是一層堆高的泥漿

亞美尼亞紅（Ermeni bolu）是 1557 年以後才出現的含鐵紅泥漿。它**必須堆得厚才不會在釉下暈開**，所以在真品上用手摸得出來：紅色區域比周圍高，外緣有一圈更深的紅。

做法是**對合成後的整塊紅做形態學膨脹**，不是描邊。描邊會沿著每一條子路徑各畫一圈，連內部相接處都多出線；膨脹只會沿著整塊紅的**外輪廓**往外長。

```html
<filter id="bolu" x="-25%" y="-25%" width="150%" height="150%"
        color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="2.2" in="SourceGraphic" result="fat"/>
  <feFlood flood-color="#7E2317" result="dark"/>
  <feComposite in="dark" in2="fat" operator="in" result="rim"/>
  <feMerge><feMergeNode in="rim"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
<!-- 用法：<g filter="url(#bolu)"> …只放紅色母題… </g> -->
```

推論規則：**紅永不承載文字**（它是泥漿不是墨），紅的面積上限 6%，而且**全站唯一允許的「陰影」就是這一圈邊環**——除此之外零 box-shadow blur、零 drop-shadow、零發光。

### 特徵 2：每一塊顏色都被一條恆寬的錳黑輪廓圈住，線寬只有兩級

線寬是絕對值，與物件大小、層級無關：**結構 2.0／細節 1.2**（viewBox 單位）。找不到第三種線寬。零漸層、零明度階、零透明度。

```css
svg [data-line="structure"] { stroke: #211E1A; stroke-width: 2;   }
svg [data-line="detail"]    { stroke: #211E1A; stroke-width: 1.2; }
svg * { vector-effect: non-scaling-stroke; stroke-linejoin: round; }
```

實作時先畫加倍寬的錳黑描邊，再把平塗填色蓋上去，就得到「顏色不溢出輪廓」的釉下效果：

```html
<path d="…" fill="none" stroke="#211E1A" stroke-width="4" stroke-linejoin="round"/>
<path d="…" fill="#1B3C86"/>
```

與相近流派的分界：恩德貝勒彩繪屋的黑帶寬度隨色塊面積變、且任兩色不得相接；這裡線寬固定，**兩塊顏色可以共用一條輪廓**。

### 特徵 3：圖樣是無限的，只被器形切斷

盤心的藤蔓不是為盤心畫的。先有一張無限延展的藤蔓場，器形只是把它切斷的地方——所以**盤緣上的鬱金香一定有一半不在盤上**，而兩塊磚並在一起，花要接得上（「對花 desen tutmak」），接不上的在窯場就是廢品。

在網頁上的意思是：**圖樣釘在頁面（世界）坐標上，不是釘在元素上**。

```css
.cut{
  background-image: url("data:image/svg+xml;utf8,…無縫藤蔓磚…");
  background-size: 240px 240px;
  /* --wx/--wy＝該元素左上角在頁面坐標中對 240 取餘 */
  background-position: calc(-1 * var(--wx,0px)) calc(-1 * var(--wy,0px));
  clip-path: circle(50% at 50% 50%);   /* 器形：切斷的地方 */
}
```

```js
// 把每一塊「裁片」對回整面牆的坐標
const T = 240;
for (const e of document.querySelectorAll('.cut')) {
  const r = e.getBoundingClientRect();
  e.style.setProperty('--wx', ((r.left + scrollX) % T).toFixed(1) + 'px');
  e.style.setProperty('--wy', ((r.top  + scrollY) % T).toFixed(1) + 'px');
}
```

無縫磚的做法：母題放在**環面**上——任何一個靠近邊界的母題，在 x±T、y±T 的位置各畫一份；藤蔓用週期等於 T 的正弦曲線，兩端自然接得上。

### 特徵 4：器緣必有一條「岩波帶」，繞整圈且格數整除

器心是藤蔓與花，器緣是岩與波（taş ve dalga，仿中國青花的波濤邊飾）。它與器心**永遠不同族**，而且必須**整數次繞完一圈**——除不盡就會在某處出現一格半的怪東西。

```js
// 極座標：把 (u,v) 映到一格扇形內，底邊是真的圓弧
const polar = (cx,cy,r0,r1,th0,dth,u,v) =>
  [cx + Math.cos(th0+dth*u)*(r0+(r1-r0)*v),
   cy + Math.sin(th0+dth*u)*(r0+(r1-r0)*v)];
// 一格 = 兩峰的岩 + 一顆珠
const uv = [[.04,.02],[.24,.92],[.5,.36],[.76,.92],[.96,.02]];
// n 取 12 / 16 / 24 / 32——必須整除 360°
```

### 特徵 5：六色定盤，而且它們是燒出來的不是調出來的

架上恰好六罐，沒有第七色，**也沒有任何一色的淡版**。要「淡」只能留白化妝土。

| 色 | hex | 面積 | 規則 |
|---|---|---|---|
| beyaz astar 白化妝土 | `#F2EDE0` | 43% | 唯一大面積地色；它是一層白泥不是背景 |
| kobalt 鈷藍 | `#1B3C86` | 22% | 對白 8.82:1，可承載正文、連結、頁尾滿版 |
| mangan siyahı 錳黑 | `#211E1A` | 16% | 全站唯一線色，也是全部正文（對白 14.2:1） |
| turkuaz 青綠 | `#2E8C8C` | 10% | 對白 3.42:1 → 只准 ≥24px 大字與非文字色面 |
| Ermeni bolu 紅 | `#BE3A26` | 6% | 有厚度；**永不承載文字** |
| zümrüt 釉綠 | `#2F6B42` | 3% | 藤蔓與葉、標籤（對白 5.44:1） |

「生釉」（進窯前的顏料）不是另挑的淺色，是同一罐顏料的另一個狀態，用相對色彩語法算出來：

```css
:root{
  --kobalt:#1B3C86; --bolu:#BE3A26; --zumrut:#2F6B42; --turkuaz:#2E8C8C;
  --ham-kobalt:#8E9EC2; --ham-bolu:#D79B90;           /* 舊瀏覽器的靜態備援 */
}
@supports (color: rgb(from white r g b)){
  :root{
    --ham-kobalt: oklch(from var(--kobalt) calc(l*1.42) calc(c*0.30) h);
    --ham-bolu:   oklch(from var(--bolu)   calc(l*1.34) calc(c*0.26) h);
  }
}
```

---

## 一・設計哲學

伊茲尼克不是「奧斯曼風的裝飾」，它是一套**在一次燒成裡能做到的事**所決定的語言：

1. **一次燒成，所以零中間調。** 顏料畫在白化妝土上、罩透明釉入窯，沒有二次上彩的機會，所以不存在漸層、不存在明度階、不存在半透明。要更暗只能換一罐顏料。
2. **窯有預算，所以只有六罐。** 每一罐都是一種礦物與一組燒成條件，加一罐就是加一次失敗風險。六罐是這門手藝的整個調色盤。
3. **圖樣先於器形。** 設計是一張無限的藤蔓場，器形只決定它在哪裡被切斷。這也是為什麼同一套母題可以畫在盤、碗、磚、瓶上而不必重新構圖。
4. **紅是後來才加進來的，而且它有代價。** 1557 年以後的紅必須堆厚，所以它是畫面上唯一有物理高度的顏色——整個風格的識別點就落在這一層厚度上。

做網站時把這四件事翻譯成：**零漸層／六個色碼／圖樣釘在世界坐標／紅有邊環且不承載文字。**

## 二・色彩系統

見特徵 5 的表。補充硬規則：

- 零 `#000`、零 `#FFF`、零灰階色碼、零任何一色的淡版。
- 零 `opacity` 調色、零 `rgba()` 第四位當淡色、零 `filter: blur`、零 `box-shadow` 的 blur、零發光、零金屬、零玻璃擬態、零紋理圖、零噪聲。
- 圓角一律 `0`；唯一允許的圓是輪製與圓規畫得出來的整圓（盤、罐口、珠、華飾）。
- 深色底只用鈷藍（刊頭、頁尾、表頭），底上的文字一律白化妝土。
- 交錯列底色用 `#EAE3D2`——它不是「白化妝土的淡版」，它是化妝土刷薄一層時露出的胎色，是第七個**材料**不是第七個顏色；只准用在表格隔列與 hover 底。

## 三・字體系統

| 用途 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 拉丁／土耳其文標題、數字 | **Amiri** | 400 / 700 | Khaled Hosny 的 naskh 系開源字體，拉丁部分是 19 世紀 Bulaq 印刷所的氣質，與奧斯曼場景同源 |
| 繁體中文本文與標題 | **Noto Serif TC** | 400 / 700 / 900 | 襯線，與釉下筆畫的收尾相容 |
| 標籤、英數小寫字 | **Archivo** | 500 / 600 | 全大寫、字距 .18–.26em；只做標籤，不做本文 |

字級 scale（16.5px 基準，比例 1.16）：`.58 / .64 / .8 / .9 / 1 / 1.16 / 1.5rem`。
**h1 上限 1.5rem**——畫面上最大的東西必須是圖樣，不是字。行高本文 1.78、標題 1.36。

## 四・版面與網格

- **12 欄格線**，但每一塊內容的欄寬都不同（5/4/3/4/5/3/4/4/4）——非對稱是本風格的常態，對稱只出現在單一器物內部。
- **旋轉角度：0。** 伊茲尼克沒有斜排、沒有傾斜卡片、沒有視差。深度也是 0：零透視、零投影、零景深。
- 留白不是「空的地方」，是**白化妝土**——它有色碼、有面積配額，而且不得在上面再放一個淺色面板。
- 邊界一律 2px（元件內部）或 3–4px（元件外框）實線錳黑。`gap` 用 14–16px。
- 手機（≤560px）：裁片收單欄、導覽 2×2、英文副標隱藏；**圖樣的單元大小 240px 一格不變**，所以「圖樣是無限的」在任何尺寸都成立。

## 五・元件配方

### 刊頭 mast

```css
.mast{background:#1B3C86;color:#F2EDE0;display:flex;align-items:center;gap:14px;
      padding:12px 22px;border-bottom:4px solid #211E1A}
.mast .mark{width:46px;height:46px;border:2px solid #211E1A;background:#F2EDE0}
```

### 導覽 nav（「對花」語意）

四格都是同一面牆上的四塊磚；現用頁那一塊的**圖樣與底下的世界坐標對上了**，其餘三塊各偏半個單元。零變色、零底線、零粗體。

```css
nav.tiles a:not([aria-current]){ --ph:120px }  /* 半個單元 */
nav.tiles a:hover,nav.tiles a:focus-visible{ --ph:0px }
nav.tiles a{ background-position:
  calc(-1*var(--navx) + var(--ph,0px)) calc(-1*var(--navy) + var(--ph,0px));
  transition: background-position 90ms linear }
```
無障礙：相位對輔助科技不可見，所以現用項同時帶 `aria-current="page"`，並把標籤底換成鈷藍。

### 題記牌 cartouche

寫字的地方一律是白化妝土上的一個有框的牌，浮在圖樣上：

```css
.cartouche{position:absolute;left:8%;right:8%;bottom:9%;
  background:#F2EDE0;border:3px solid #211E1A;padding:9px 12px 10px}
```

### 按鈕

```css
button.act{border:3px solid #211E1A;background:#F2EDE0;padding:7px 16px;font-weight:700}
button.act.primary{background:#1B3C86;color:#F2EDE0}
/* 零圓角、零陰影、零漸層、hover 只換底不移動 */
```

### 表格

表頭鈷藍底白字 + Archivo 大寫標籤；格線 2px 錳黑；隔列 `#EAE3D2`；數字欄右對齊並 `font-variant-numeric: tabular-nums`。

### 頁尾

鈷藍滿版、白化妝土文字、上緣 4px 錳黑；四欄 `auto-fit minmax(210px,1fr)`。

## 六・動效規則

四種性質不同、觸發源不同的動態，缺一不可。**全部零淡入、零位移、零縮放**——因為釉不會飄。

| 種類 | 內容 | 觸發 | duration / easing |
|---|---|---|---|
| **ambient 環境** | 岩波環繞行：刊頭 logo 的 16 格岩波環等速自轉一圈 | 無（持續） | `34s linear infinite`（格數整除，所以無接縫跳動） |
| **input-driven 輸入** | 對花吸附：hover／focus 一塊裁片，該塊圖樣的相位吸附回世界坐標 | hover / focus-within | `90ms linear`（<100ms） |
| **transition 轉場** | 釉漫：元件進場時 `clip-path` 由上而下開出來 | 首次繪製（`@starting-style`） | `460ms cubic-bezier(.2,.78,.3,1)` |
| **signature 簽名** | **切口漂移 kesim-drift**：九塊裁片的**裁切邊界**各自以 26 秒週期漂移，而圖樣一格也沒有移動過 | 無（持續） | `26s ease-in-out infinite`，各自負延遲錯開 |

簽名動效的定義性質：**畫面一直在變，卻沒有任何一朵花移動過**。變的只有「哪裡被切掉」——這正是特徵 3 的動態化。

```css
@keyframes driftC{ 0%,100%{clip-path:circle(50% at 50% 50%)}
                   50%   {clip-path:circle(45.5% at 52% 48.5%)} }
.cut.c1{ animation:driftC 26s ease-in-out infinite }
```

降級（資訊零損失）：

```css
@media (prefers-reduced-motion:reduce){
  *,::before,::after{animation:none!important}
  .cut{clip-path:none!important}          /* 裁片變回矩形，內容一字不少 */
  .cartouche,.panel,.tezgah{transition:none;clip-path:none}
  nav.tiles a{transition:none}            /* 相位直接到位，aria-current 照樣標示 */
}
```

## 七・插畫與圖像風格（技法：gyrılmış-desen 切斷圖樣構成）

全站**零外部圖片、零照片、零 `<img>`、零 `<canvas>`、零點陣圖**。所有圖像由三條原語產生，明文不允許第四條：

1. **平塗 ＋ 恆寬輪廓**：每一塊顏色是絕對均勻的單色，被 2.0／1.2 兩級錳黑輪廓圈住。零漸層、零階調、零透明度、零光源、零投影。
2. **紅是唯一有厚度的顏色**：整塊紅的外輪廓往外長一圈 `#7E2317` 的暗環（`feMorphology dilate`）。
3. **所有圖樣都是同一張無限藤蔓場的切片**：圖樣釘在世界坐標、被 `clip-path` 裁出器形，所以母題一定被邊緣切斷，相鄰兩塊拼得回去。

**母題只有六族，沒有第七族**：`lâle` 鬱金香、`karanfil` 康乃馨、`sümbül` 風信子、`gül` 玫瑰華飾、`saz yaprağı` 長鋸齒葉、`çintamani` 三圓兩紋。畫不出來的東西不畫——這個流派從來不是寫生。

母題一律參數化產生（下例為岩波帶的一格），不手擺點：

```js
const lale = () => [
 {f:'B', d:'M50,97 C29,97 21,78 21,57 C21,41 29,31 33,22 L36,3 L43,21 L50,1 L57,21 L64,3 L67,22 C71,31 79,41 79,57 C79,78 71,97 50,97 Z'},
 {f:'W', d:'M50,86 C38,86 33,74 33,58 C33,48 38,41 41,35 L50,52 L59,35 C62,41 67,48 67,58 C67,74 62,86 50,86 Z'}
];
```

**明文禁用**：照片、半調網點、細線幾何線描、排線、交叉排線、點描、`feTurbulence`／`feDisplacementMap` 假質感、做舊或刮痕濾鏡、扁平化單色圖示庫、emoji 當 icon、金屬漸層、任何發光、任何模糊陰影、任何漸層、任何透明度、任何圓角、任何斜排、任何投影。

## 八・Logo 與 Favicon 設計指南

**Logo**：一個正圓，外圈是 16 格岩波帶（整除 360°），圓心是一朵套用了 `#bolu` 濾鏡的鬱金香。外圈自轉即為全站的 ambient 動效。整體嚴格落在 100×100 的 viewBox 裡，零文字。

**Favicon**：inline SVG data URI 寫在 `<head>`，內容是同一朵鬱金香放大到滿版（16px 下岩波帶會糊成一圈灰，所以拿掉）。描邊加粗到 5／4，因為小尺寸下 2.0 的線會消失。

```html
<link rel="icon" href="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E…%3C/svg%3E">
```

## 九・Do & Don't

**Do**

- 先畫一張無限的藤蔓場，再決定要把它切成什麼形。
- 每一塊顏色都圈上恆寬的錳黑輪廓，連相接處也共用同一條。
- 讓紅有厚度，而且只有紅有。
- 岩波帶的格數整除 360°，繞完整圈。
- 標籤用 Archivo 大寫加字距，本文用錳黑；青綠只給大字。
- 手機上縮的是版面，不是圖樣的單元大小。

**Don't**

- ❌ 不要用漸層、明度階、半透明去做「深一點的藍」——架上沒有那一罐。
- ❌ 不要用 `stroke` 去做紅的厚度（子路徑相接處會多出線）。
- ❌ 不要讓圖樣釘在元素上——那樣每一塊都從自己的左上角起算，永遠對不上花。
- ❌ 不要在白化妝土上再放一個淺色面板；留白是材料不是空隙。
- ❌ 不要在紅上寫字。
- ❌ 不要斜排、不要投影、不要圓角、不要紫藍漸層 hero、不要置中三卡片、不要 emoji 當 icon、不要 Lorem ipsum、不要「EST. 19xx」徽章。
- ❌ 不要把岩波帶做成跑馬燈橫幅——它是繞著器緣的環，不是一條會捲的帶。

## 十・頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml;utf8,…">
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Archivo:wght@500;600&family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>/* 見上 */</style></head><body>

<header class="mast">
  <a class="mark" href="index.html"><svg viewBox="0 0 100 100">…岩波環＋鬱金香…</svg></a>
  <span class="wordmark">ŞİRKET ADI</span><span class="cn">商號</span>
  <span class="meta">CITY · STREET · 1893</span>
</header>

<nav class="tiles" aria-label="主導覽">
  <a href="index.html" aria-current="page"><span class="lab">本舖</span><span class="en">Ana Sayfa</span></a>
  <a href="b.html"><span class="lab">…</span><span class="en">…</span></a>
</nav>

<section class="field">
  <div class="cuts">
    <div class="cut c1" tabindex="0">
      <div class="cartouche"><span class="k">Adres 地址</span>
        <span class="v">…<small>…</small></span></div>
    </div>
    <!-- c2…c9 -->
  </div>
  <noscript><p class="noscript">未啟用 JavaScript：裁片裡的圖樣會各自從自己的左上角起算，接縫處對不上花；全部文字一字不少。</p></noscript>
</section>

<main class="wrap">
  <h1>…（上限 1.5rem）…</h1>
  <p class="lede">…</p>
  <h2>…</h2>
  <table>…</table>
</main>

<footer>…鈷藍滿版…</footer>
<script>/* 把每一塊裁片對回世界坐標，見特徵 3 */</script>
</body></html>
```

---

## 十一・技術實作與相容性

### 1. `<feMorphology operator="dilate">` — 承載特徵 1（堆高的紅）

- **支援現況**：跨瀏覽器可用，**自 2015 年 7 月起**為已確立（widely available）的功能。查證來源：MDN `<feMorphology>` 參考頁（https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feMorphology ）。
- **為什麼需要它**：`stroke` 是以路徑為中心往兩側各長一半，而且對每一條子路徑各描一圈；本風格要的是「整塊紅合成之後的**外側**輪廓」。膨脹作用在像素上，所以子路徑相接處不會多出線。
- **注意**：預設在 `linearRGB` 色空間運算，會讓邊環偏亮——本站一律指定 `color-interpolation-filters="sRGB"`。
- **fallback 具體行為**：不支援時 `filter` 屬性被忽略，紅色母題照常以平塗＋錳黑輪廓繪出，只是少了那一圈暗紅邊環。形狀、顏色、面積、可讀性完全不變，零資訊損失。

### 2. CSS 相對色彩語法 `oklch(from …)` — 承載特徵 5（生釉／熟釉是同一罐顏料）

- **支援現況**：Chrome/Edge 119+、Safari 16.4+、Firefox 128+；2024 年起可跨主流瀏覽器使用，全球涵蓋率約 87%。查證來源：MDN「Using relative colors」與 caniuse 的 `mdn-css_types_color_oklch_relative_syntax` 支援表（https://caniuse.com/mdn-css_types_color_oklch_relative_syntax ）。
- **為什麼需要它**：進窯前的顏料不是另一個色碼，是同一個顏料的另一個狀態。用 OKLCH 從燒成色推導（壓低 L 的對比、砍掉 70% 的 C、色相不動），可以做到「改一個色碼，生釉跟著改」，而不是維護兩套色票。
- **fallback 具體行為**：以 `@supports (color: rgb(from white r g b))` 把整組宣告包起來；`:root` 先給一組靜態的生釉備援色（`#8E9EC2` / `#D79B90` / `#93B29F` / `#97C2C2`），舊瀏覽器落在備援值上，外觀差異僅在生釉色的飽和度，語意（未抓／已抓）完全保留。

### 3. `@starting-style` ＋ `transition-behavior: allow-discrete`（含 Popover API）— 承載轉場動效

- **支援現況**：`@starting-style` 於 Chrome 117（2023-09）、Safari 17.5（2024-05）、Firefox 129（2024-08）推出；`transition-behavior` 自 2024-08-06 起為 Baseline Newly available，隨 Firefox 129 發布而成為 Baseline。查證來源：MDN `@starting-style`、MDN `transition-behavior`、web.dev「Now in Baseline: animating entry effects」。
- **為什麼需要它**：本風格零淡入（釉不會飄），進場只能是「開出來」——`clip-path` 由 `inset(… 100% …)` 過渡到 `inset(-8px)`。而封籤是 top-layer 的 popover，要讓它有進退場動畫，就必須讓 `overlay` 與 `display` 這兩個離散屬性可過渡，那正是 `allow-discrete` 的用途。
- **fallback 具體行為**：舊瀏覽器直接忽略 `@starting-style` 區塊，元件以最終狀態出現（沒有進場動畫，不會破版）。封籤另以 `@supports not selector(:popover-open)` 提供非 popover 路徑：改為 `position:fixed` 的面板，由 `[open]` 屬性控制顯示，JS 端也先 `try { showPopover() }` 再退回加 class。

### 4. 效能預算（建置期實測）

| 頁 | 單頁大小（含 inline 全部資源） | 外部請求 |
|---|---|---|
| `index.html` | 114.4 KB | 僅 Google Fonts |
| `kavanoz.html` | 179.2 KB | 僅 Google Fonts |
| `sir.html` | 244.5 KB | 僅 Google Fonts |
| `posta.html` | 112.2 KB | 僅 Google Fonts |

- 全部 ≤350 KB 的硬門檻。零外部圖片、零外部音檔、零 JS 相依、零 build step 產物被載入。
- 首屏 JS：`index.html` 僅 719 bytes，工作是對 12 個元素各讀一次 `getBoundingClientRect()` 並寫兩個自訂屬性——單次量測 + 單次寫入，無 layout thrashing，實測 <100ms（實際在個位數毫秒）。
- 動畫全部是 `clip-path` 與 `background-position`，不觸發版面重算；`resize` 事件以 120ms debounce 重新對花。
- 藤蔓磚是一張 27 KB 的 SVG data URI，被瀏覽器解碼一次後重複平鋪，不隨裁片數增加。

---

*規格書對應示範站：`sites/aktar-mizan/`（AKTAR MÎZÂN 藥秤行）。外部參照：Nurhan Atasoy & Julian Raby《Iznik: The Pottery of Ottoman Turkey》(1989)；Walter B. Denny《Iznik: The Artistry of Ottoman Ceramics》(2004)；Arthur Lane 的分期研究；大英博物館 Godman 收藏；Oktay Aslanapa 自 1963 年起的 İznik 窯址發掘。*
