---
name: red-top-tabloid
description: British red-top tabloid — a bleeding red masthead block, one screamer justified to the full measure, three violent type sizes with nothing between them, no white space, and every grey made of visible 85-line halftone dots on newsprint.
---

# 英國紅頂小報 Red-top Tabloid

> 一九六九年十一月十七日，《The Sun》改為小報開本重新發刊，刊名反白在一塊出血的紅上。
> 這個做法後來被《Daily Mirror》《Daily Star》《Daily Record》沿用，成為英國報業對「red-top」這個詞的定義——
> 它指的不是一份報紙的立場，而是它報頭那塊紅的位置與大小。
>
> 本風格講的是這個格式，不是這些報紙的內容。它是一套被三件事逼出來的版面語言：
> **紙很小（對開的一半）、墨只有兩罐（黑與一個特別色）、而每一格都要賣錢。**

---

## 一、設計哲學

小報是一個**面積有限、而且超出就必須跳頁**的媒介。大報可以靠留白分層級，小報不行——
一張 A3 大小的紙上要擠進頭條、導言、內文、表格、框稿、旗標、更正、版腳，留白是沒賣掉的版位。

因此這個風格的每一條規矩都是同一個約束的不同面向：

1. **層級不靠留白，靠尺寸落差。** 標題與內文之間沒有過渡，字級直接從 130px 掉到 13px。
2. **標題不是寫出來的，是解出來的。** 欄寬是給定的，標題必須兩端頂到它（本行叫**見方**）。
   頂不到就改標題，不改欄寬。
3. **灰不是一個顏色，是墨的百分比。** 只有兩罐墨，所有的中間調都是網點，放大看得到點。
4. **紅是一個位置，不是一個強調色。** 紅只出現在報頭、旗標、更正、與手會碰的地方。

它與其他「印刷風」的分界：
- 與**大報 Broadsheet**：大報的版面是欄與灰階層級的秩序，小報的版面是搶。大報的標題可以不滿行，小報不行。
- 與**龐克剪貼 Punk Xerox**：那是手工剪貼、歪斜、影印衰減的痕跡；本風格每一件東西都對齊欄線，沒有一度是歪的（除了兩個旗標）。
- 與**里索／絹印**：那些的本體是專色疊印產生第三色；本風格的兩罐墨從不相疊，灰一律靠網點。
- 與**瑞士國際主義**：那是格線決定位置、留白是設計的一部分；這裡格線只決定欄，留白是虧損。

---

## 二、本風格的 5 個不可省略特徵

> 這五項任何一項拿掉，畫面就不再是紅頂小報。每一項附可直接複製的片段。

### 特徵 1　紅頂：刊名反白在一塊出血的紅上

不是紅色的字、不是紅線、不是標誌，是**一塊色**，而且它至少有一邊貼齊裁切線。
刊名是反白的（反白＝紙上沒有墨），所以它的顏色是紙色，不是白色。

```css
.redtop{
  background:#B80014;            /* 紅只有一個值，沒有淡紅 */
  color:#D6D4C6;                 /* 反白＝紙色，不是 #FFF */
  padding:10px 18px 12px;
  box-shadow:0 0 0 .4px #B80014; /* 吃墨：實塊比幾何大一點 */
}
.redtop b{
  font-family:'Archivo',sans-serif;
  font-size:clamp(38px,7.4vw,74px);
  line-height:.86;
  font-variation-settings:'wdth' 62,'wght' 900;  /* 極窄極黑 */
}
```

### 特徵 2　見方：每一行標題都兩端頂到欄寬

欄寬是唯一的硬約束。字級、寬度（長體／wdth 軸）、字距三個變數由它解出來。
**解不出來就把差額印在版面上**，不要置中、不要縮欄、不要換行假裝沒事。

```css
.screamer{display:block;width:100%;overflow:hidden}
.screamer .ln{
  display:inline-block;white-space:nowrap;transform-origin:left center;
  font-weight:900;line-height:.94;
  transform:scaleX(var(--cond,.78));   /* 中日文＝長體，由求解器寫入 */
  font-size:var(--sz,120px);
}
.screamer.lat .ln{                      /* 拉丁文改用 wdth 軸，不縮放 */
  transform:none;
  font-variation-settings:'wdth' var(--wd,66),'wght' 900;
  letter-spacing:var(--tr,0em);
}
.spec{                                  /* 把解印出來：這是版面的一部分 */
  font-family:'Archivo',sans-serif;font-size:9.5px;font-weight:700;
  color:#1A4FA3;border-top:.6px solid #1A4FA3;
}
.spec.loose{color:#B80014;border-top-color:#B80014}  /* 塞不滿就轉紅 */
```

求解式（中日文，字身為全形）：

```
size = min(級數上限, 欄寬 ÷ (字數 × 長體下限))
cond = 欄寬 ÷ (字數 × size)          →  clamp 到 [0.62, 1.15]
若 cond 被 1.15 夾住：先灌字距（上限 +0.055em），仍不足則
差幾字 = ceil((欄寬 − 已有寬度) ÷ (size × cond))
```

### 特徵 3　三級字階，中間不准有第四級

標題（90–150px）／導言（16.5px）／內文（13.6px）。三級之間是**斷崖不是斜坡**。
一旦出現 24px、32px、48px 這類中間值，畫面立刻變成一般雜誌。

```css
.screamer .ln{font-size:120px}   /* 一級：解出來的 */
.stand{font-size:16.5px;line-height:1.5;font-weight:500}
.stand b:first-child{font-weight:900}   /* 導言前兩三個字加黑，是本行的規矩 */
.body p{font-size:13.6px;line-height:1.62;text-align:justify}
```

### 特徵 4　塞滿：欄線貼身，留白是虧損

七欄，欄間 10px，欄與欄之間是一條 0.6px 的實線（不是留白）。
線寬**只有兩種**：欄線 0.6px 與框線 2.4px，沒有第三種。圓角一律 0。

```css
.grid{display:grid;gap:0 10px;grid-template-columns:repeat(7,1fr)}
.grid > *{border-left:.6px solid #17171A;padding-left:5px}
.grid > *:first-child{border-left:0;padding-left:0}
.boxed{border:2.4px solid #17171A;padding:8px 9px 9px}   /* 框稿 */
.kicker{                                                  /* 肩題一律 WOB */
  display:inline-block;background:#17171A;color:#D6D4C6;
  font-size:12px;font-weight:900;letter-spacing:.12em;padding:2px 8px 3px;
}
```

### 特徵 5　灰是網點：沒有一個灰色的色碼

整份樣式表裡不准出現任何中間灰的 hex。每一階灰都是墨的網點百分比，
以 45° 單色網呈現（兩層相同格陣互錯半格）。合法的階只有五個：10／25／40／60／85%。

```css
.s10,.s25,.s40,.s60,.s85{
  --pitch:3.2px;                                   /* 85 lpi */
  background-image:
    radial-gradient(circle at 50% 50%,#17171A 0 var(--r),rgba(0,0,0,0) var(--r)),
    radial-gradient(circle at 50% 50%,#17171A 0 var(--r),rgba(0,0,0,0) var(--r));
  background-size:var(--pitch) var(--pitch);
  background-position:0 0, calc(var(--pitch)/2) calc(var(--pitch)/2);
}
.s10{--r:.404px} .s25{--r:.638px} .s40{--r:.807px}
.s60{--r:.989px} .s85{--r:1.177px}
```

半徑由覆蓋率反推，不是憑感覺調的：兩層格陣每 `p²` 有兩顆點，
`覆蓋率 = 2πr² / p²` → `r = p·√(覆蓋率 / 2π)`。

---

## 三、色彩系統

| 色 | hex | 用途 | 佔比 |
|---|---|---|---|
| 新聞紙 | `#D6D4C6` | 唯一大面積底；也是**所有反白字的顏色** | 約 46% |
| 墨 | `#17171A` | 正文、欄線、框線、WOB 底、頁尾 | 約 34% |
| 紅頂紅 | `#B80014` | 報頭、旗標、更正框、現用頁、focus、不可逆按鈕 | ≤8% |
| 旗黃 | `#FFD400` | 只給圓旗標 | ≤3% |
| 校對藍 | `#1A4FA3` | 只給校對符號、量度與求解結果 | ≤2% |

硬規則（可機械檢查）：

- **零 `#FFF`**。反白是「紙上沒有墨」，所以反白字一律 `#D6D4C6`。
- **零純黑**。最暗是 `#17171A`。
- **零中間灰的色碼**。要灰就用網點（特徵 5）。
- **零 `opacity` 調色、零 `rgba` 第四位當淡色**（`rgba(0,0,0,0)` 只准用於網點的透明停點）。
- **零漸層**。唯一合法的 `radial-gradient` 是網點；唯一合法的 `linear-gradient` 是硬停點的線。
- **零 `filter`、零 `backdrop-filter`、零模糊陰影、零發光、零金屬、零玻璃擬態**。
  陰影一律是 `box-shadow:0 0 0 Xpx <實色>`（吃墨），沒有 offset、沒有 blur。
- **圓角一律 0**。
- 對比實測（對新聞紙 `#D6D4C6`，WCAG 2.1 相對亮度）：墨 **12.00:1**／紅 **4.62:1**／藍 **5.24:1**／黃 **1.04:1**。
  黃與紙的亮度幾乎相同（只差色相），所以**黃的形狀必須靠 2.4px 墨色框線界定**，而且黃上只准放墨字（12.50:1）。
  紅對墨只有 2.60:1，因此**紅底上永遠放紙色字，絕不放墨字**。

---

## 四、字體系統

| 角色 | 字體 | 設定 |
|---|---|---|
| 刊名與標題（拉丁） | **Archivo**（可變，`wdth` 62–125、`wght` 100–900） | `font-variation-settings:'wdth' 62,'wght' 900` |
| 標題（中日文） | **Noto Sans TC** 900 ＋ `scaleX()` 長體 | `transform:scaleX(.62 – 1.15)` |
| 數字與標籤 | Archivo 700，`letter-spacing:.08em`，全大寫 | `font-variant-numeric:tabular-nums` |
| 導言 | Noto Sans TC 500，16.5px／1.5 | 前兩三字 900 |
| 內文 | Noto Sans TC 400，13.6px／1.62，`text-align:justify` | — |
| 表（agate） | 11.4px；表頭 10px／900 | 數字欄靠右、等寬數字 |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
```

字級 scale 只有六個值，沒有第七個：`解出來的標題 / 22 / 16.5 / 13.6 / 12 / 11.4 / 9.5`。
（22 只給框稿標題，9.5 只給規格行。）

**中日文的「長體」是史實不是權宜**：照相排版時代的長體一到長體四就是把字身橫向壓縮，
報紙標題最常用的就是這個。所以 `scaleX()` 在這個風格裡是正解，不是妥協。

---

## 五、版面與網格

- 七欄，欄間 10px，欄線 0.6px 實線。內欄可再切 2 或 3 等分。
- 版心最大寬 1100px；左側留 66px 給欄外校對符號，右側 18px。
- 沒有任何一個區塊是置中的。頭條 5 欄、側欄 2 欄是預設分配。
- **一定要有一條跳頁線**（`接第 X 版〈…〉`）。版面是有限資源，塞不下就跳，不是把頁面拉長。
- 版腳（folio）一列，含：刊名／版次／出刊資訊／**版面配量（欄 × 公分）**／自印說明。
- 旗標（圓形 flash）全站上限兩個，各旋轉 ±6°。**這是全站唯一允許的旋轉。**

```css
.flash{
  width:104px;height:104px;border-radius:50%;
  border:2.4px solid #17171A;        /* 黃對紙只有 1.04：沒有框線就看不出形 */
  display:grid;place-items:center;text-align:center;
  background:#FFD400;color:#17171A;font-weight:900;font-size:13px;
  transform:rotate(-6deg);
}
.flash.r{background:#B80014;color:#D6D4C6;transform:rotate(6deg)}
```

---

## 六、元件配方

**導覽（摺痕 creased）**：四格等寬，大小／位置／外形／字完全一樣，
現用的那一格身上多一條**摺痕**——一條紙色線緊貼一條墨線，加上摺過去那半邊的 10% 網點。
紙被摺過就回不去了；這是塑性變形，不是誰按著它。

```css
.fold-nav{display:grid;grid-template-columns:repeat(4,1fr);
  border-top:2.4px solid #17171A;border-bottom:2.4px solid #17171A}
.fold-nav a{position:relative;display:block;padding:7px 8px 8px;
  border-right:.6px solid #17171A;background:#D6D4C6;text-decoration:none;color:#17171A}
.fold-nav a[aria-current="page"]::before{
  content:"";position:absolute;left:50%;top:0;bottom:0;width:0;
  border-left:1px solid #D6D4C6;border-right:1px solid #17171A;transform:translateX(-1px)}
.fold-nav a:hover{background:#17171A;color:#D6D4C6}
```

**按鈕**：沒有圓角、沒有 hover 位移。紅底紙色字＝不可逆動作；墨底紙色字＝一般動作。
**表格**：隔列底用 10% 網點（不是淺灰）。表頭下緣 2.4px，列間 0.6px。
**更正欄**：2.4px 紅框，左上角一塊紅底反白標籤，標籤壓在框線上。
**校對符號**：欄外 38px 的一條，只在 hover／focus 時出現，內容是校對記號＋該則佔掉的欄公分。

---

## 七、動效規則

四種，性質與觸發源都不同，缺一不可。

| 種類 | 名稱 | 觸發 | 規格 |
|---|---|---|---|
| ambient | **吃墨 ink gain** | 時間，無輸入 | 全版實塊同相位 `box-shadow` 外擴 .30px↔.95px，14s，`ease-in-out`，無限循環。位置一格不動。 |
| input-driven | **校對符號 ／ 欄位尺** | hover／focus／捲動 | 符號用 `display:none→block` 切換（**無 transition，0ms**）；欄位尺以 `animation-timeline:scroll(root block)` 標出讀到第幾欄公分。 |
| transition | **改版 replate** | 換頁 | 每一欄 `animation:replate 1ms steps(1) both`，`animation-delay:calc(var(--i)*42ms)`。整塊落下，**不滑行、不緩動**。 |
| signature | **見方 the lock-up** | 載入／改變視窗寬度／字體就緒 | 標題自 `cond 1.15`（或 `wdth 125`）起，經 **三個離散中間態**（60ms、130ms、200ms）鎖到求解值；規格行同時印出級數／長體／字距／見方或差幾字。 |

```css
@keyframes gain-ink{0%,100%{box-shadow:0 0 0 .30px #17171A}50%{box-shadow:0 0 0 .95px #17171A}}
.kicker,caption{animation:gain-ink 14s ease-in-out infinite}

@keyframes replate{from{opacity:0}to{opacity:1}}
.col{animation:replate 1ms steps(1) both;animation-delay:calc(var(--i,0)*42ms)}

@media(prefers-reduced-motion:reduce){
  .kicker,caption{animation:none;box-shadow:0 0 0 .4px #17171A}
  .col{animation:none}
  .ruler .cur{display:none}           /* 刻度仍在，資訊零損失 */
}
```

降級後四種全部靜止，但**沒有任何資訊消失**：吃墨固定在 0.4px、欄位尺只剩靜態刻度、
改版直接就位、見方求解照跑但不演中間態。

**明文禁用**：淡入淡出當主要轉場、視差、滑行緩動（`ease-out` 位移）、跑馬燈、彈跳、
任何 `filter` 動畫、任何會改變版面位置的 hover。

---

## 八、插畫與圖像風格（粗網構成 coarse-screen）

三條原語，不准有第四條：

1. **網點**：45° 單色網（兩層互錯半格），一格一顆，半徑編碼調子，**合法的階只有五個**。
2. **實塊**：100% 的區域，四周比幾何外擴 0.4px（吃墨）。不是描邊——外擴是均勻的且同色。
3. **線**：只有 0.6px 與 2.4px 兩種寬度，只有水平與垂直，只用於欄線與框線。

判準（放大任何一張圖）：(a) 每一階調子都是五個網點尺寸之一，找不到第六個；
(b) 沒有任何主體有輪廓線——形是由調子的邊界決定的；(c) 每一條線不是水平就是垂直。

**明文禁用**：照片、漸層、feTurbulence 假質感、做舊濾鏡、細線幾何線描、
扁平化單色圖示庫、emoji、金屬漸層、任何發光、任何模糊。

---

## 九、Logo 與 Favicon

- **Logo**＝紅頂本身。一塊紅方塊，裡面是紙色的反白主體（本例：一羽鴿與刊名），
  主體只由網點與實塊組成，刊名下方一條 2.4px 的紙色線。**不要做圖標＋字的組合標**。
- **Favicon**：紅底方塊 ＋ 一個紙色的反白字母（刊名首字），inline SVG data URI 寫在 `<head>`。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20fill='%23B80014'/%3E%3Cpath%20d='M7%206h5v9h8V6h5v20h-5v-8h-8v8H7z'%20fill='%23D6D4C6'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 一版只有一個尖叫標題。第二個標題就把第一個的力氣吃掉了。
- 標題寫短。見方求解器會告訴你還差幾個字——那是要你改標題，不是要你改欄寬。
- 導言前兩三個字加黑。這是本行的記號。
- 數字要能被讀者用同一張紙上的資料驗算回來。
- 每一版都要有一條跳頁線。

**Don't**
- 不要紫藍漸層、不要置中大標＋兩顆按鈕＋三張圓角卡片。
- 不要 emoji 當 icon；不要 Lorem ipsum；不要「EST. 19xx」徽章。
- 不要用 `#FFF` 反白——反白是紙色。
- 不要用中間灰的 hex 做隔列底或次級文字，用網點與墨。
- 不要把紅當成一般強調色灑在正文裡。紅是報頭、旗標、更正、和手會碰的地方。
- 不要讓標題置中。小報的標題一律齊左並頂滿欄寬。
- 不要在黃上放紙色字（1.4:1）。

---

## 十一、頁面骨架範例

```html
<body>
  <div class="sheet">
    <header class="masthead">
      <div class="redtop"><b>刊名</b></div>
      <div class="mast-right">
        <span class="mast-line">地址・電話</span>
        <span class="mast-line">期號・日期・售價・<span class="stars">★★</span></span>
      </div>
    </header>
    <div class="mast-rule"></div>

    <nav class="fold-nav" aria-label="版次">
      <a href="index.html" aria-current="page"><span class="no">第一版</span><span class="nm">頭版</span></a>
      <a href="b.html"><span class="no">第二版</span><span class="nm">…</span></a>
    </nav>

    <div class="ears"><span>左耳</span><span>右耳</span></div>

    <div class="grid">
      <div class="c5 col" style="--i:0">
        <span class="kicker red">肩題</span>
        <div class="screamer" id="h1" data-max="150" data-cap="0.30"><span class="ln">尖叫標題</span></div>
        <span class="spec" data-for="h1">求解中…</span>
        <p class="stand"><b>導言前幾字加黑</b>，其餘照常。</p>
        <div class="grid" style="grid-template-columns:repeat(3,1fr)">
          <div class="body"><p>…</p></div><div class="body"><p>…</p></div><div class="body"><p>…</p></div>
        </div>
        <p class="jump">接第三版〈…〉</p>
      </div>
      <div class="c2 col" style="--i:1">
        <article class="boxed"><span class="lbl">框稿</span><h2>…</h2><p>…</p></article>
        <div class="errata"><span class="lbl">更正</span><p>…</p></div>
      </div>
    </div>

    <footer class="folio">
      <span>刊名・版次</span><span class="budget">版面配量 7 欄 × 24.6 公分</span>
    </footer>
  </div>
</body>
```

---

## 十二、技術實作與相容性

本站三項核心技術，分屬三個不同的層。

### 1　`font-variation-settings` 可變字型寬度軸（C 版面與樣式層）

承載特徵 1 與特徵 2 的拉丁文部分。Archivo 在 Google Fonts 上是**單一檔案**的可變字型，
`wdth` 軸 62–125、`wght` 軸 100–900（靜態等價物為 Archivo Condensed／Archivo／Archivo Expanded）。
求解器以 8 次二分搜尋在 `wdth` 軸上找出能容下最大級數的寬度，每次一個量測。

- **查證**：MDN《font-variation-settings》；Google Fonts VF 說明與 Omnibus-Type 的 Archivo 軸範圍（wdth 62–125）。
- **支援**：`font-variation-settings` 為 Baseline 特性，Chrome 62+／Safari 11+／Firefox 62+／Edge 17+ 全支援。
- **Fallback**：字型未載入或不支援可變軸時，`font-family` 退到 `Arial Narrow`／`Helvetica`，
  求解器改以級數與字距達成見方，規格行照印，**版面不變、資訊零損失**。

### 2　CSS Scroll-driven Animations（B 動效與時間軸層）

承載欄位尺：`animation-timeline: scroll(root block)` 讓紅標記在 0–40 欄公分的刻度上移動，
**零 JavaScript、零捲動監聽、零主執行緒工作**。

- **查證（2026-09-20）**：MDN《CSS scroll-driven animations》與 caniuse
  `mdn-css_properties_animation-timeline_scroll`。
  Chrome／Edge 115+（2023-07 起無旗標）、Safari 26（2025-09）起支援，26.4 加入 threaded 版本；
  **Firefox 到 152（2026-06）在穩定版仍在 `layout.css.scroll-driven-animations.enabled` 旗標後**，
  Nightly 預設開啟。全球支援度約 84%。
- **Fallback**：以 `@supports (animation-timeline: scroll())` 包住。不支援時紅標記 `display:none`，
  **公分刻度仍然完整印在欄外並加註「（刻度為靜態）」**——它本來就是一把尺，尺上的數字不需要動畫。
- `prefers-reduced-motion` 下同樣只留靜態刻度。

### 3　自寫見方求解器（E 資料與生成層）

全館沒有第二個站有這個構造。要點：

- **單一離屏探針**：整站只有一個 `position:absolute;left:-9999px` 的 `<span>` 做量測，
  一次讀完再一次寫回，**不做 layout thrashing**。
- **中日文走閉式解**：全形字身寬度對字級是線性的，所以先量一次 100px 的自然寬得到 `unit`，
  其餘全部是算術，`O(1)`，不需要二分。
- **拉丁文走 8 次二分**（`wdth` 軸與寬度非線性），每頁只有報頭一行，成本固定。
- **`document.fonts.ready`** 之後才解，避免用 fallback 字的寬度算出錯的值；
  另設 1200ms 逾時保險，字型載不到也會解。
- **`ResizeObserver`** 監看每一則稿子的容器，改變視窗寬度就重解（`requestAnimationFrame` 節流）。

### 效能預算（實測）

| 項目 | 值 | 門檻 |
|---|---|---|
| 單頁大小（含全部 inline CSS／JS／SVG） | 30.8 – 38.6 KB | ≤350 KB ✓ |
| 首屏 JS（求解器全文） | 5.9 KB 未壓縮 | — |
| 首屏 JS 執行 | 每行標題 1–8 次同步量測，全頁 ≤ 10 次，估 &lt;10 ms | ≤100 ms ✓ |
| 主要動畫 | `box-shadow` 外擴（合成層可處理）、`opacity` steps(1)、scroll timeline（可 threaded） | 60fps ✓ |
| 外部資源 | 僅 Google Fonts 兩家族；**零外部圖片、零音檔** | ✓ |

**沒有 layout thrashing**：求解器在一次 `requestAnimationFrame` 內完成全部量測與寫入；
吃墨動畫只改 `box-shadow` 外擴（不影響版面）；改版轉場只改 `opacity`。

### 不支援時的具體行為總表

| 缺 | 畫面 | 資訊 |
|---|---|---|
| JavaScript | 標題維持 `clamp()` 的級數與 `--cond:.78`，規格行停在「求解中…」 | 零損失；〈校樣間〉的六個錯與更正全文在 `<details>` 裡 |
| 可變字型 | 標題改用 `Arial Narrow`，見方靠級數與字距 | 零損失 |
| `animation-timeline` | 欄位尺只剩靜態刻度 | 零損失 |
| `prefers-reduced-motion` | 四種動效全部靜止 | 零損失 |
