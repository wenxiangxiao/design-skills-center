---
name: amish-solid-quilt
description: Lancaster County Amish solid-cloth quilt style — jewel-tone solid patches on a near-black ground with no outlines at all, a second quilting-stitch geometry that deliberately ignores every seam, declared stitch and yarn counts, and woven fabric texture instead of flat fills.
---

# 素色拼布 Amish Solid Quilt — 風格規格書

賓夕法尼亞州蘭開斯特郡的阿米什素色拼布（約 1880–1940）。
這個流派的名字在美術館裡通常被拿去跟羅斯科、亞伯斯並列，但它不是繪畫：
它是一種**受製作條件限制而長成的版面系統**——只有素色布、只有直線裁、
一床被要蓋在人身上、而縫它的人相信裝飾是虛榮的。

它與所有「幾何構成」風格的分野只有一句話：
**拼接的幾何與壓線的幾何是兩套，而且它們故意不對齊。**

---

## 一、設計哲學

1. **限制先於美學。** 素色不是品味選擇，是教規；直線不是極簡，是手裁的必然；
   寬邊不是留白，是為了讓針有地方跑。做這個風格時先問「這條規矩是誰定的」，不要問「這樣好不好看」。
2. **兩層各管各的。** 第一層（拼接）決定資訊的分區；第二層（壓線）決定閱讀的動線。
   兩層一旦對齊，畫面就變成一般的格線版面，這個流派就消失了。
3. **顏色只有六種，而且它們是染料不是色票。** 有限的色數逼出比例判斷：
   哪一塊該大、哪一塊只能出現在角落，是這個風格真正的設計工作。
4. **針趾是可以數的。** 一床被的價錢由每吋幾針決定，不由圖案決定。
   因此本風格的所有線都必須是離散的、數得出來的針趾，不是連續的實線。
5. **背面也算。** 每一床被的背面都縫著一張布標，寫著這床被的來歷。
   落到網頁上就是：任何一個展示物件都要有一個「翻過來」的面，寫它是怎麼來的。

---

## 二、本風格的 5 個不可省略特徵

> 判準：拿掉任何一項，它就不是這個風格了。

### 特徵 1｜兩套互不對齊的幾何：拼接線 vs 壓線

色塊的邊界是第一套幾何；羽毛紋、繩紋、玫瑰紋、菱格是第二套。
第二套**必須橫越**第一套的邊界，不能被色塊切斷、不能沿著縫線走。

```html
<!-- 第一層：拼接。色塊，無 stroke -->
<rect x="180" y="180" width="640" height="640" fill="#4B2E63"/>
<polygon points="500,180 820,500 500,820 180,500" fill="#272B3E"/>

<!-- 第二層：壓線。座標系與上面完全無關，直接壓過去 -->
<g fill="none" stroke="#E8E2D2" stroke-linecap="butt" opacity=".42">
  <path d="M120 500 q80 -60 160 0 q80 60 160 0 q80 -60 160 0 q80 60 160 0"
        pathLength="132" stroke-dasharray="1 1" stroke-width="1.6"/>
</g>
```

```css
/* 壓線層永遠疊在拼接層之上，且不接受任何 clip */
.quilting{mix-blend-mode:normal;pointer-events:none}
```

### 特徵 2｜布不描邊：色塊之間只有縫份，沒有輪廓線

沒有黑框、沒有白框、沒有陰影、沒有漸層、沒有圓角。
兩塊布相接的地方只有一條**同色系加深**的細線——那是縫份把布壓下去的暗處，不是輪廓。

```css
:root{ --seam-shadow-width: 1.4px; }
/* 縫份暗線＝該塊布自己的顏色加深約 22% 明度，絕不是黑色或灰色 */
.patch--plum{ --fill:#4B2E63; --seam:#311E45; }
.patch--rose{ --fill:#A3325A; --seam:#6F2040; }
.patch{ background:var(--fill); box-shadow:inset 0 0 0 var(--seam-shadow-width) var(--seam);
        border-radius:0; border:0; }
```

```
禁止：border:1px solid #000 ／ box-shadow:0 4px 12px rgba(0,0,0,.3)
     ／ border-radius 任何非 0 值 ／ linear-gradient 當底 ／ 描邊系統（那是印度卡車藝術）
```

### 特徵 3｜蘭開斯特比例：寬外框、四角大方塊、單一中心主體

外框寬度 ≥ 邊長 1/6；四個角上必有與外框**不同色**的正方塊；
中間放**一個**大型幾何主體（菱形／方形／條幅），不放兩個。

```css
/* 一床被的比例（S 為短邊） */
--bind:  calc(var(--S) * 0.014);  /* 滾邊 */
--border:calc(var(--S) * 0.166);  /* 寬外框，1/6 */
--inner: calc(var(--S) * 0.034);  /* 內窄框 */
/* 中心地 = S - 2*(bind+border+inner) ≈ 0.572 S */
```

```html
<!-- 四角大方塊：邊長＝外框寬，正方形，不是圓角卡片 -->
<rect x="14"  y="14"  width="166" height="166" fill="#C08A1E"/>
<rect x="820" y="14"  width="166" height="166" fill="#C08A1E"/>
<rect x="14"  y="820" width="166" height="166" fill="#C08A1E"/>
<rect x="820" y="820" width="166" height="166" fill="#C08A1E"/>
```

### 特徵 4｜布是織出來的，不是填出來的

每一塊色塊裡都要看得見紗。做法是在色塊內填一條**來回穿梭的緯紗**（boustrophedon），
用 `stroke-dasharray` 表示浮長（一根紗壓過幾根才沉下去），
用 `pathLength` 表示每吋幾紗。三種織法必須看得出差別。

```html
<defs>
  <!-- 幾何只跟「每吋幾紗」有關；pathLength 讓 1 個 dash 單位 = 1 個浮長 -->
  <path id="wv10" d="M-350 -350H350 M350 -344H-350 M-350 -338H350 …"
        pathLength="700" fill="none"/>
</defs>

<clipPath id="c1"><rect x="0" y="0" width="200" height="200"/></clipPath>
<rect x="0" y="0" width="200" height="200" fill="#A3325A"/>
<g clip-path="url(#c1)" fill="none" stroke="#6F2040" stroke-width="1.7"
   stroke-dasharray="1 1">                 <!-- 平織：一上一下 -->
  <use href="#wv10" transform="translate(100 100) rotate(45)"/>
  <use href="#wv10" transform="translate(100 100) rotate(135)"/>  <!-- 經緯交叉 -->
</g>
```

三種織法的 dash 節奏（拿掉就分不出布）：

| 織法 | `stroke-dasharray` | 第二組紗的夾角 | 看起來 |
|---|---|---|---|
| 平織 plain | `1 1` | `+90°` | 細格子，沒有方向 |
| 斜紋 twill | `5 1` | 無 | 長浮線連成條，方向很強 |
| 縐織 crepe | `1 1 4 2` | `+58°` | 雜、起皺、深淺會跳 |

### 特徵 5｜所有的線都是可以數的針趾

畫面上不准有連續實線。導覽、外框、圖表、按鈕的下緣——全部是等長虛線的針趾，
而且每一條都要說得出「每吋幾針」。`pathLength` 讓這個數字與線的實際長度無關。

```html
<!-- 這條線不管畫多長，都正好是 12 針/吋 × 5.2 吋 = 62 針 -->
<path d="M4 8H316" pathLength="124" stroke-dasharray="1 1"
      stroke="#C08A1E" stroke-width="3.4" stroke-linecap="butt" fill="none"/>
```

```css
/* 針趾一律 butt 端點。round 端點是縫紉機的線，不是手縫的針 */
.st{ fill:none; stroke-linecap:butt; }
```

> 密疏本身就是語意：12 針／吋 ＝ 現用、重要、貴；4 針／吋 ＝ 疏縫、暫時、待處理。

---

## 三、色彩系統

近黑地色 + 六種高彩度素色染料 + 一種線色。**不得再加第八色。**

| 用途 | Hex | 佔比 | 規則 |
|---|---|---|---|
| 地色 靛黑 | `#14161F` | 約 34% | 不是純黑，帶一點藍。全站底、滾邊、footer |
| 縫份底 | `#0B0C12` | 約 3% | 只給格線間隙（`gap`），永不當面積色 |
| 版塊底 | `#1A1D28` | 約 16% | 文字區塊的底 |
| 茜紫 plum | `#4B2E63` | ≤10% | 加深 `#311E45` |
| 洋玫 rose | `#A3325A` | ≤9% | 加深 `#6F2040`；也用於「被拒絕」 |
| 孔雀 teal | `#17635F` | ≤8% | 加深 `#0C4340` |
| 芥末 gold | `#C08A1E` | ≤9% | 加深 `#835C10`；**唯一的現用態顏色** |
| 海藍 navy | `#1E3566` | ≤10% | 加深 `#122347` |
| 靛墨 ink | `#272B3E` | ≤6% | 加深 `#191C2A` |
| 線色 thread | `#E8E2D2` | 文字 | 對 `#14161F` 對比 14.6:1 |
| 疏線 dim | `#948D7C` | 次要文字 | 對 `#14161F` 對比 5.5:1 |
| 裡布 lining | `#CFC6B2` | 背面 | 只出現在「翻過來」的那一面 |

**硬規則**

- 長文只寫在 `#14161F` / `#1A1D28` 上，**不寫在染料色塊上**（芥末與洋玫上只放墨色短標籤）。
- 沒有任何一個顏色是「主色」。六種染料互相牽制，誰面積大是這一床被的設計決定。
- 現用態、被選中、可動作，一律用**芥末 `#C08A1E`**；沒有第二個強調色。
- 零漸層、零透明疊色、零 `backdrop-filter`。唯一允許的 alpha 是壓線的 `opacity`（0.13–0.55）。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 中文全部 | `Noto Serif TC` | 400 / 700 / 900 | 素樸有襯線，不用黑體——阿米什的印刷品是襯線的 |
| 拉丁與數字 | `Bitter` | 500 / 700 | 板實的 slab serif，像農場帳本 |
| 小標籤 | `Bitter` 500 | `letter-spacing:.16em`；`text-transform:uppercase`；0.68rem |
| 數字 | `font-variant-numeric: tabular-nums` | 針數、尺寸、價錢一律等寬對齊 |

字級：正文 17px / `line-height:1.85`；`h2` `clamp(1.25rem,2.6vw,1.72rem)`；
`h1.big` `clamp(1.9rem,5.2vw,3.4rem)`；小標 0.66–0.68rem。

**禁止**：無襯線系統字堆疊、可變字型的花俏軸、字距 <0 的緊排、任何手寫體。

---

## 五、版面與網格

整頁就是一床被：一組主縫線，所有版塊都必須對齊到它。

```css
:root{ --col:12; --seamw:2px; }
.top{ display:grid; grid-template-columns:repeat(var(--col),1fr);
      gap:var(--seamw); background:#0B0C12; }     /* 縫份從間隙露出來 */
.blk{ grid-column:1/-1; display:grid;
      grid-template-columns:subgrid; gap:var(--seamw); }   /* 塊中之塊，共用同一組縫線 */
.pc { background:#1A1D28; padding:26px 24px; }
```

- **`subgrid` 是這個風格的正確工具**，不是炫技：拼布的定義就是「小塊的縫線必須對齊到整床的縫線」。
  巢狀兩層以上時，內層繼續 `subgrid`（列方向也可以），別自己重算欄寬。
- 版塊之間**沒有 margin**，只有 `gap`＝縫份。留白由格子的空欄提供。
- 斷點：`--col` 在 900px 降為 6、560px 降為 4。欄數是布塊數，不是螢幕尺寸。
- 對稱是允許的，甚至是必要的（中心醒目塊必須置中）——這是本風格與構成主義最大的差別。

---

## 六、元件配方

**導覽（針趾密度）**：四頁一列，每格上方一條針趾線。現用頁 12 針／吋、芥末色、線在走；
其餘 4 針／吋、疏線色。現用態不靠底色、不靠底線、不靠圓點。

```html
<li aria-current="page">
  <a href="#"><svg viewBox="0 0 320 16" preserveAspectRatio="none">
    <path d="M4 8H316" pathLength="124" stroke-dasharray="1 1"
          stroke="#C08A1E" stroke-width="3.4" stroke-linecap="butt" fill="none"/>
  </svg><span>今年的隊被</span><span>12 STITCHES / IN · 01</span></a>
</li>
```

**按鈕**：直角、1.5px 實線邊、無陰影。hover 整塊翻成芥末底墨字（布被翻面，不是變亮）。

```css
button{border:1.5px solid rgba(232,226,210,.4);border-radius:0;background:#14161F;color:#E8E2D2}
button:hover:not(:disabled){background:#C08A1E;color:#14161F;border-color:#C08A1E}
```

**選取態＝疏縫（basting）**：不要高亮、不要外框陰影。給那一塊布縫一圈大針趾。

```css
.cell.sel .sm{stroke:#E8E2D2;stroke-width:7;stroke-dasharray:11 9;stroke-opacity:1}
```

**表格**：無框線，只有 1px `rgba(232,226,210,.16)` 的橫線；表頭用小標籤樣式。
**表單**：直角輸入框、1px 邊；錯誤提示是左側 3px 洋玫直條，不是紅字加驚嘆號。
**Footer**：縫份色 `#0B0C12` 滿底，四欄，小標籤用芥末。

---

## 七、動效規則

四種，缺一不可，全部有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 類型 | 名稱 | 觸發 | 具體值 |
|---|---|---|---|
| ambient 環境 | **針趾行進** | 不需輸入 | 內窄框那一圈壓線的 `stroke-dashoffset` 以 `steps(60)` 走 30s 無限循環——一次一針，不是滑動 |
| input 輸入 | **布鏡 loupe** | hover / focus（<100ms） | 游標所在那塊布的織紋在側欄放大 2.6 倍；`.cell:hover .wv{opacity:1}` 0.12s linear |
| transition 轉場 | **上布 laying-on** | 新元素插入 DOM | `@starting-style` + 每塊 `transition-delay:calc(var(--d)*34ms)`，0.46s `cubic-bezier(.2,.8,.3,1)` |
| signature 簽名 | **拆線掀被 unpicking** | 認完一板布樣 | 見下 |

**簽名動效：拆線掀被**

```css
@keyframes erase{from{stroke-dasharray:0 100}to{stroke-dasharray:100 0}}
.flip.unpick .riperase{animation:erase .84s steps(22) forwards}   /* 線被一針一針抽走 */
.flip.unpick .front{opacity:0;transition:opacity .01s linear .88s}
.flip.unpick .half{opacity:1;transition:opacity .01s linear .88s,
                   transform 1.15s cubic-bezier(.55,0,.25,1) .88s}
.flip.unpick .half.a{transform:rotate3d(1,1,0,155deg)}   /* 沿對角線那條縫掀開 */
.flip.unpick .half.b{transform:rotate3d(1,1,0,-155deg)}
.flip.unpick .back{opacity:1;transition:opacity .55s ease 1.25s}   /* 裡布與布標 */
```

順序是：**先拆線，才掀得動**。一條地色的實線沿對角線長出來（那是線被抽掉後裂開的縫），
然後被面沿那條縫裂成兩片、各自向外翻折，露出背面的裡布與手縫布標。

```css
@media(prefers-reduced-motion:reduce){
  .sewing{animation:none}                       /* 針停在原位，圖樣完整 */
  .flip.unpick .half{display:none}              /* 不翻，直接見背面 */
  .flip.unpick .front{opacity:0}
  .flip.unpick .back{opacity:1}
}
```

**禁止**：淡入淡出當主角、視差、彈跳 easing、任何 `blur`／`glow`、`stroke-linecap:round` 的描繪動畫
（那是縫紉機不是手縫）。

---

## 八、插畫與圖像風格：`patch-piecing` 布塊拼接與織紋

**零外部圖片、零照片、零描外形的插圖。** 所有圖像由四種原語組成，而且可以互相組成：

1. **布塊** — 實色多邊形，無 stroke，只有同色系加深的縫份暗線。
2. **織紋** — 一條來回穿梭的緯紗（`<use>` 引用共用 defs），dash 節奏＝浮長，pathLength＝每吋幾紗。
3. **針趾** — 等長虛線的第二層幾何，`stroke-linecap:butt`，永遠橫越布塊邊界。
4. **布標** — 裡布色的矩形＋一圈 9 針／吋的手縫邊，寫這個物件的來歷。

判準：**拿掉顏色，仍讀得出「哪幾塊是同一匹布裁的」。**
若一張圖靠顏色才成立，它就不屬於這個風格。

明文禁用：`feTurbulence` 手抖濾鏡、半調網點、細線幾何線描、寫實描繪、
`stroke-linecap:round`、任何模糊陰影。

---

## 九、Logo 與 Favicon

Logo 就是一床最小的被：滾邊 → 寬外框 → 四角方塊 → 中心方 → 菱形 → 內菱形，
再加一橫一豎兩條 24 針的壓線穿過去。零文字。

```html
<svg viewBox="0 0 64 64" role="img" aria-label="…">
  <rect width="64" height="64" fill="#14161F"/>
  <rect x="4" y="4" width="56" height="56" fill="#1E3566"/>
  <rect x="4" y="4" width="13" height="13" fill="#C08A1E"/> <!-- 四角，四個都要 -->
  <rect x="17" y="17" width="30" height="30" fill="#A3325A"/>
  <polygon points="32,17 47,32 32,47 17,32" fill="#17635F"/>
  <polygon points="32,24 40,32 32,40 24,32" fill="#4B2E63"/>
  <path d="M2 32H62" pathLength="48" stroke-dasharray="1 1"
        stroke="#E8E2D2" stroke-width="1.6" fill="none" opacity=".62"/>
</svg>
```

Favicon 用同一張圖去掉四角方塊與其中一條壓線，以 `data:image/svg+xml,` 內嵌於 `<head>`。

---

## 十、Do & Don't

**Do**

- 先決定布（色塊與比例），再決定字要落在哪一塊。
- 每一個資訊區塊都對齊到同一組主縫線；用 `subgrid`，不要自己算欄寬。
- 每一條線都想清楚「這是幾針／吋」。
- 給每個展示物件一個背面，寫它的來歷。
- 對稱可以，置中可以——這個流派不怕中軸線。

**Don't**

- **不要**：描邊。任何 `border`、外框陰影、色塊之間的黑白線都會立刻毀掉它。
- **不要**：圓角、不要模糊陰影、不要漸層、不要玻璃感。
- **不要**：讓壓線沿著縫線走。兩層對齊＝這個風格死掉。
- **不要**：用第二個強調色。芥末已經是全部了。
- **不要**：印花、不要材質貼圖、不要紙紋 overlay。布紋要織出來，不是貼上去。
- **不要**： `EST. 18xx` 徽章、不要 Lorem ipsum、不要 emoji 當 icon、不要紫藍漸層 hero、
  不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。
- **不要**：把它做成「羅斯科風」。色域繪畫沒有縫份、沒有針、沒有寬邊四角塊。

---

## 十一、頁面骨架範例

```html
<body>
  <div class="wrap"><div class="brand">
    <svg class="logo" viewBox="0 0 64 64">…</svg>
    <div><b>品牌名</b><span class="lat">LATIN SUBTITLE</span></div>
  </div></div>

  <nav class="nav"><div class="wrap"><ul>
    <li aria-current="page"><a href="a.html">
      <svg class="stline" viewBox="0 0 320 16" preserveAspectRatio="none">
        <path d="M4 8H316" pathLength="124" stroke-dasharray="1 1"
              stroke="#C08A1E" stroke-width="3.4" stroke-linecap="butt" fill="none"/>
      </svg>
      <span class="nm">第一頁</span><span class="spi">12 STITCHES / IN · 01</span></a></li>
    <!-- 其餘三頁：pathLength 改成 4 針／吋，stroke 改 #948D7C -->
  </ul></div></nav>

  <main>
    <div class="herowrap"><svg viewBox="0 0 1000 1000" class="quilt hero">
      <defs><!-- weaveDefs：每吋 7/10/14/20 紗四條共用路徑 --></defs>
      <!-- 拼接層：滾邊→寬外框→四角→內窄框→中心地→中心主體 -->
      <!-- 壓線層：<g class="quilting"> 羽毛紋／繩紋／玫瑰紋／菱格 -->
      <!-- 文字層：<g class="qtext"> 直接縫在布上的資訊 -->
    </svg></div>

    <div class="wrap"><div class="top">
      <section class="blk">
        <div class="pc" style="grid-column:span 7">…</div>
        <div class="pc" style="grid-column:span 5">…</div>
      </section>
    </div></div>
  </main>

  <footer class="ft">…</footer>
</body>
```

窄螢幕（≤700px）把被面上的小字層 `display:none`，同樣的資訊必須在下方以一般 HTML 重複一次。
**被面上的字是布，不是唯一的資訊來源。**

---

## 十二、技術實作與相容性

三項核心技術，各承載一個不可省略特徵。支援度為 2026-08-18 查證 MDN／caniuse／web.dev 的結果。

### 1. `CSS Grid subgrid`（C 版面與樣式層）— 承載特徵 3 與整站版面

一床被的定義就是「小塊的縫線必須對齊到整床的縫線」。`subgrid` 是唯一能讓
巢狀元素**繼承父格線**而不重新宣告欄寬的機制；拍品卡片另用 `grid-template-rows:subgrid`
巢狀兩層（卡片 → `.meta`），讓十二張卡的「尺寸／縫者／針數／起標」四條橫縫在整列上對齊。

- **支援現況**：Firefox 71（2019-12）、Safari 16（2022-09）、Chrome/Edge 117（2023-09）；
  2026-03-15 起列為 **Baseline Widely available**，全球覆蓋約 97%。
  查證來源：caniuse `css-subgrid`、MDN《CSS grid layout / subgrid》。
- **Fallback**：`@supports not (grid-template-columns:subgrid)` 時 `.blk` 退回
  `repeat(var(--col),1fr)`，`.lotcard` 退回 `display:block`。
  版塊仍在該在的位置、卡片內容完整，只是跨卡的橫縫不再對齊。資訊零損失。

### 2. `SVG pathLength` ＋ `stroke-dasharray`（A 渲染層）— 承載特徵 4 與特徵 5

`pathLength` 讓作者宣告一條路徑「算幾單位長」，瀏覽器再按
`pathLength ÷ 實際幾何長度` 的比例去換算所有距離計算（含 dash 圖樣）。
本站因此可以把「每吋幾針」與「每吋幾紗」寫成**宣告值**：

- 針趾：`pathLength = 針數 × 2`、`stroke-dasharray="1 1"` → 一針一空，不管線畫多長針數都不變。
- 織紋：一條來回穿梭的緯紗，`pathLength` 設成「總長 ÷ 浮長」，於是 dash 節奏
  （`1 1` 平織／`5 1` 斜紋／`1 1 4 2` 縐織）可以掛在 `<use>` 上逐塊變化，
  幾何完全不必重算——整份文件只需要四條 defs 路徑（每吋 7／10／14／20 紗），共 9.0 KB。

- **支援現況**：`pathLength` 屬 SVG 1.1，MDN 相容表列為全瀏覽器支援（Chrome、Edge、
  Firefox、Safari、Opera 皆自初版起）；`stroke-dasharray` 同為 Baseline Widely available。
  查證來源：MDN《SVG Attribute reference: pathLength》《stroke-dasharray》。
- **已知差異**：MDN 與社群記錄 Safari 對 dash 的算繪與 Chrome／Firefox 略有出入，
  故本站不把針數當成需要精確讀取的資料，只當視覺密度；密疏的相對關係在三個引擎上一致。
- **Fallback**：不支援 `pathLength` 時 dash 會退回以使用者單位計算，
  線仍是虛線、仍看得出密疏，只是針數不精確。SVG 完全被停用時，
  所有資訊在同頁的 HTML 文字與表格中另有完整敘述。

### 3. `@starting-style` ＋ `transition-behavior: allow-discrete`（B 動效與時間軸層）— 承載轉場動效

換一板布樣時，二十五塊布是新插入 DOM 的元素；判定面板是從 `display:none` 開出來的。
兩者都無法用一般 `transition` 補間。`@starting-style` 提供「元素第一次被繪製前」的起始值，
`transition-behavior:allow-discrete` 讓 `display` 這種離散屬性也能參與轉場——
沒有它就只能寫一段 JS 去 `setTimeout` 切 class。

```css
.panel{display:none;opacity:0;transition:opacity .4s,transform .4s,display .4s allow-discrete}
.panel.on{display:block;opacity:1;transform:none}
@starting-style{ .panel.on{opacity:0;transform:translateY(12px)} }
```

- **支援現況**：Chrome/Edge 117（2023-09）、Safari 17.5（2024-05）、Firefox 129（2024-08）；
  web.dev 公告此組合於 **2024-08 進入 Baseline（newly available）**。
  查證來源：MDN《@starting-style》《transition-behavior》、web.dev《Now in Baseline: animating entry effects》。
- **已知限制**：MDN／browser-compat-data issue #26155 記錄 Firefox 目前不會從
  `display:none` 開始轉場；本站因此**不把 `display` 的轉場當成資訊呈現的必要條件**——
  面板該顯示時一定顯示，只是進場動畫在 Firefox 上退為瞬間出現。
- **Fallback**：不支援 `@starting-style` 的瀏覽器直接跳到終態，元素立刻可見，資訊零損失。

### 效能實測（2026-08-18，Node 22 單執行緒）

| 項目 | 實測 |
|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | index 64.1 KB／sale 38.3 KB／bolt 43.3 KB／company 39.8 KB（門檻 350 KB） |
| 共用 `weaveDefs()`（四條織紋路徑） | 9.0 KB，生成 0.08 ms |
| 最重的一頁（sale：12 床縮圖標記）生成 | **1.99 ms**（門檻 100 ms） |
| 認布房整板（25 塊）重建 | `QE.lot()` 0.010 ms ＋ `QE.board()` 0.05 ms |
| DOM 元素數 | index 1,714／sale 2,980／bolt 395／company 299 |
| 動畫成本 | ambient 只改一個 `stroke-dashoffset`（合成層）；轉場只改 `opacity`／`transform`；<br>簽名動效只在一次點擊後跑一次。全程零 `getBoundingClientRect`、零強制回流 |
| 外部資源 | 只有 Google Fonts 兩支字體。零圖片、零音檔、零 JS 函式庫 |

### 無 JavaScript 時

- 首頁那床被在建置階段就以同一支引擎算好、輸出成靜態 SVG 直接寫在 HTML 裡——**沒有 JS 也是一床完整的被**，被面上的字是可選取的 `<text>`。
- 拍賣目錄有 `<noscript>` 的完整表格（十二床全部欄位）。
- 認布房需要 JS 才能玩，但該頁的規則、三種織法的說明與被面會的沿革都是靜態 HTML。
- 委託單的驗證在 JS 關閉時退回瀏覽器原生 `required` 驗證。

---

*白橡岔義勇消防隊為虛構機構。蘭開斯特郡「泥濘拍賣會」（mud sale，志願消防隊的春季義賣）
與阿米什素色拼布的形制、比例、針數則取自真實。*
