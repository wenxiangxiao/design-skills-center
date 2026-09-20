---
name: push-pin-hardband
description: The Push Pin Style (Glaser/Chwast, New York 1954-) rebuilt for the web as a six-ink screenprint system in which every tone is a hard-edged flat step produced by an SVG discrete quantiser - no gradients, no halftone, no contour lines, no black.
---

# 普希品硬階風 · The Push Pin Style (Hard-Band System)

> 本規格書描述的是 **Push Pin Style**——一九五四年 Milton Glaser、Seymour Chwast、Reynold Ruffins、Edward Sorel 在紐約成立 Push Pin Studios 後長出來的視覺語言，一九七〇年三月十八日至五月十八日在羅浮宮裝飾藝術館的〈Le Push Pin Style〉展覽把它正式命名（那是第一次有美國設計工作室獲得這樣的待遇，展覽隨後巡迴歐洲與巴西）。它的本體是：**借一個指認得出來的歷史樣式，用有限的幾罐平色油墨把它重畫一次，而且不假裝那是原創。**
>
> 本規格書只定義風格，不綁定產業。示範站是一間紐約的獨立唱片廠牌，但同一套規矩可以拿去做書店、果醬、電影節、診所或任何東西。

---

## 一、設計哲學

### 1.1 它為什麼長成這個樣子

Push Pin 的三個歷史條件決定了它的全部外觀：

1. **他們是插畫家，不是排版師。** 一九五〇年代的紐約廣告界由攝影與瑞士網格統治，Push Pin 的四個人剛從 Cooper Union 出來，手上只有畫筆。他們沒有辦法跟攝影比逼真，於是反過來走：**畫面上的一切都明白告訴你「這是畫的」**。
2. **他們用得起的複製工藝是平版與絹印。** 一色一版。要出中間調，你只能再開一塊版，不能把兩塊版「調和」。**所以層次天生就是一階一階的，不是連續的。**
3. **他們拿歷史樣式當材料。** 新藝術、維多利亞商標、木版、細密畫、手抄本邊飾——不是懷舊，是把現成的造形當成顏料。這件事在一九六〇年代的現代主義語境裡是叛逆的：現代主義要求「形隨機能」，Push Pin 說「形可以用借的，只要你說出借自哪裡」。

### 1.2 三條判準（拿掉任何一條就不是這個風格）

- **顏色只會跳，不會滑。** 畫面上不存在連續變化的顏色。
- **形不靠線，靠色階的邊界。** 不描邊。
- **借的東西要具名。** 每一件圖像都說得出它借自哪一個歷史樣式，並且印在版面上。

### 1.3 它不是什麼

| 容易混淆的 | 分界 |
|---|---|
| 孟菲斯 Memphis | 那是義大利一九八一年起的家具與圖樣運動，主體是幾何塊面與 squiggle；本風格的主體是**借來的具象母題**與**階調** |
| 迷幻海報 Psychedelic | 那是把字擠到不能讀、用互補色振動；本風格的字永遠讀得出來，顏色永遠不振動 |
| 普普藝術 Pop Art | 那擁抱網點與大量生產的印痕；本風格**明文禁止網點**，因為網點是攝影製版的產物，不是手繪的 |
| 扁平化設計 Flat Design | 那的扁是「沒有厚度」；本風格的扁是「一階就是一次刮刀」，所以階數本身承載資料 |
| 里索印刷 Risograph | 那的識別性來自套印不準與紙的顆粒；本風格套印是準的，沒有顆粒，也沒有半透明疊色 |

---

## 二、本風格的 5 個不可省略特徵

> 這一章是本規格書的核心。每一項都附可直接複製的 CSS／SVG。五項全部做到，三秒辨識測試就會過；少做一項，它會滑回「一般的插畫網站」。

### 特徵 1 ── 硬邊階調（Hard Steps）

**規則**：所有的層次、立體感、光影，都是 **N 階平色**。階與階之間零過渡、零反鋸齒地帶、零半透明。N 必須是一個**有意義的整數**（見特徵 5），不是隨手挑的。

**做法**：把一個連續的純量場（線性或放射漸層的灰階）餵給一個 `feComponentTransfer type="discrete"` 量化器。`discrete` 把輸入 [0,1] 切成 n 個等寬區間（n = `tableValues` 的個數），每一區間輸出一個常數——所以**一條數學上連續的斜率，輸出恰好 n 塊平色**。

```html
<svg viewBox="0 0 200 200">
  <defs>
    <!-- 連續場：一條黑到白的斜率。它不會被看見，它只是「位置」 -->
    <linearGradient id="field" gradientUnits="objectBoundingBox" x1="0.1" y1="0" x2="0.95" y2="1">
      <stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/>
    </linearGradient>

    <!-- 量化器：六階，朱橘 → 茄墨。
         注意 color-interpolation-filters="sRGB"：
         SVG 濾鏡預設在 linearRGB 運算，不寫這一行，下面的色碼會被解讀成線性值，
         輸出的顏色會整體偏亮。 -->
    <filter id="q6" color-interpolation-filters="sRGB">
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0.9333 0.7647 0.6000 0.4471 0.3020 0.1647"/>
        <feFuncG type="discrete" tableValues="0.4157 0.3529 0.2902 0.2275 0.1647 0.1020"/>
        <feFuncB type="discrete" tableValues="0.1412 0.1882 0.2078 0.2078 0.1961 0.1725"/>
      </feComponentTransfer>
    </filter>

    <clipPath id="shape"><path d="M100 178C63 178 36 152 36 117S63 56 100 56s64 26 64 61-27 61-64 61Z"/></clipPath>
  </defs>

  <!-- 形由 clip 決定，階調由濾鏡決定，兩者互不知道對方 -->
  <g clip-path="url(#shape)">
    <rect x="30" y="50" width="140" height="134" fill="url(#field)" filter="url(#q6)"/>
  </g>
</svg>
```

`tableValues` 的產生方式（三行 JS，把一組 hex 轉成三條表）：

```js
const tv = (hexes, ch) =>
  hexes.map(h => +(parseInt(h.slice(1 + ch*2, 3 + ch*2), 16) / 255).toFixed(4)).join(' ');
// tv(['#EE6A24','#C35A30','#994A35','#723A35','#4D2A32','#2A1A2C'], 0) → feFuncR
```

**CSS 版本**（用在矩形色帶上，不需要濾鏡）——硬停點漸層，兩個停點位置相同即為硬邊：

```css
.ramp{
  background-image: linear-gradient(90deg,
    #EE6A24 0      16.667%,
    #C35A30 16.667% 33.333%,
    #994A35 33.333% 50%,
    #723A35 50%     66.667%,
    #4D2A32 66.667% 83.333%,
    #2A1A2C 83.333% 100%);
}
```

**判準**：放大任何一張圖——(a) 找不到任何一處連續明度變化；(b) 每一條階界都是零寬度，兩側各是一塊絕對均勻的平色；(c) 數得出階數，而且那個數字在版面上另有說明。

**明文禁用**：任何未被量化的 `gradient`、任何 `filter: blur()`、任何 `opacity` 調色、任何 `rgba()` 第四位當淡色、任何 `box-shadow` 的 blur、任何半調網點、任何 `feTurbulence` 假質感。

---

### 特徵 2 ── 一罐終點墨（One Terminal Ink）

**規則**：**架上只有六罐顏色，其中一罐是紙**；所有階梯**走向同一罐暗墨**；**沒有黑**。中間階一律由 **OKLab 等距**算出，不得手調——因為同一條階梯會出現在不同尺寸、不同頁面上，手調的階會對不起來。

```css
:root{
  --cream:#F4E5C3;  /* 紙。不是油墨，但佔掉一格。所有「白」都是它 */
  --ink:  #2A1A2C;  /* 唯一的暗墨。留著一點紫，紅放在旁邊仍然是熱的 */
  --pink: #E2447E;
  --verm: #EE6A24;
  --viri: #12897A;
  --must: #E8B424;
}
```

四條官方階梯（全部終點 `#2A1A2C`）：

```css
/* 青綠 viridian → 茄墨 */
--viri3:#12897A #324F52 #2A1A2C;
--viri5:#12897A #2B6C66 #324F52 #30343E #2A1A2C;
--viri7:#12897A #26756C #2E625F #324F52 #313D45 #2F2B38 #2A1A2C;
/* 芥末 mustard → 茄墨 */
--must4:#E8B424 #A37D3A #634A39 #2A1A2C;
--must6:#E8B424 #BE9336 #95723B #6F543A #4B3635 #2A1A2C;
/* 朱橘 vermilion → 茄墨 */
--verm5:#EE6A24 #B85632 #854235 #562E33 #2A1A2C;
--verm6:#EE6A24 #C35A30 #994A35 #723A35 #4D2A32 #2A1A2C;
/* 熱粉 hot pink → 茄墨 */
--pink3:#E2447E #813154 #2A1A2C;
--pink6:#E2447E #BA3D6D #93365C #6E2D4B #4B243C #2A1A2C;
/* 紙 → 茄墨（唯一的無彩階梯，只用在表格底紋與細字） */
--cream10:#F4E5C3 #DBCCB1 #C3B39F #AB9B8E #93837D #7D6D6C #67575B #52414B #3D2D3B #2A1A2C;
```

等距階的產生（OKLab 線性內插，不是 sRGB 內插——sRGB 內插會在中段變髒）：

```js
function oklabLerp(h1,h2,t){ /* rgb→oklab 三軸各自線性內插→oklab→rgb */ }
const ramp = (a,b,n) => Array.from({length:n}, (_,k) => oklabLerp(a,b,k/(n-1)));
```

**面積配比**（本風格的骨架比例，可 ±6%）：

| 角色 | 色 | 面積 |
|---|---|---|
| 紙（唯一大面積地色） | `#F4E5C3` | 約 44% |
| 茄墨（正文、刊頭、頁尾滿版、所有階梯的終點） | `#2A1A2C` | 約 20% |
| 熱粉 | `#E2447E` | ≤13% |
| 朱橘 | `#EE6A24` | ≤12% |
| 青綠 | `#12897A` | ≤7% |
| 芥末 | `#E8B424` | ≤5% |

**可讀性（WCAG 2.1，實測）**：茄墨／紙 = **13.13**；紙／茄墨 = 13.13；青綠／紙 = 3.45；熱粉／紙 = 3.14；朱橘／紙 = **2.51**；芥末／紙 = **1.53**；茄墨／芥末 = 8.56；茄墨／朱橘 = 5.24。
因此寫死三條：

- **正文與所有小字一律茄墨或紙色，無例外。**
- **熱粉與青綠只准承載 ≥24px（或 ≥19px 粗體）的大字**（AA large 門檻 3.0，兩者 3.45／3.14 通過）。
- **朱橘與芥末永遠不承載文字**，只當色帶與色面；要在它們身上寫字，字一律用茄墨。

**明文禁用**：黑（`#000`）、白（`#FFF`）、任何一罐油墨的「淡版」、灰階色碼（中間階只能來自上面的階梯）、任何第七罐彩色。

> **唯一的例外，而且它看不見**：`#000` 與 `#fff` 會出現在 SVG 的連續場（`<stop stop-color>`）上。那兩個色碼不是顏色，是**位置**——場永遠先經過量化器才輸出，沒有任何一個像素會以 `#000` 或 `#fff` 被畫出來。檢查方式：樣式表裡零 `#000`／`#fff`；HTML 裡的 `#000`／`#fff` 一律只出現在 `<linearGradient>`／`<radialGradient>` 之內，而且該漸層的每一個使用處都帶著 `filter="url(#q…)"`。

---

### 特徵 3 ── 零輪廓（No Contour）

**規則**：被上階調的形**一律不描邊**。形由最外面那一階的邊界決定。要更暗就再切一階；要更分明就換一罐起點墨；**不加線、不加陰影、不加外光暈**。

```css
.banded, .banded *{ stroke: none; stroke-width: 0; filter: none; }
```

```html
<!-- 對：形是 clip，階調是 filter，沒有第三個東西 -->
<g clip-path="url(#pear)"><rect ... fill="url(#field)" filter="url(#q5)"/></g>

<!-- 錯：加了一條描邊，立刻變成「上色的線描」，不是本風格 -->
<path d="..." fill="url(#field)" stroke="#2A1A2C" stroke-width="2"/>
```

**唯一合法的線**：版面上的**分隔規線**（欄線、框線、表格線），它們不是圖像的一部分，寬度只有兩級（`2px` 結構、`1.5px` 細節），一律 `#2A1A2C`，一律水平或垂直。

**明文禁用**：`stroke` 出現在任何被量化的形上、`feMorphology` 反白環、`text-shadow`、`drop-shadow`、任何圓角（`border-radius` 全站為 `0`）。

---

### 特徵 4 ── 紙是一塊版（The Paper Is a Plate）

**規則**：留白不是留白，**是一塊沒上墨的版**。它有自己的色碼，它與色帶**硬碰硬**：零間距、零圓角、零陰影、零外框、零模糊。版面的基本單位是「一塊紙 ＋ 一塊色」直接相接。

```css
.bnd{ display:flex; gap:0; align-items:stretch;
      border-bottom:2px solid var(--ink); min-height:5.9rem; }
.bnd.rev{ flex-direction:row-reverse; }       /* 逐列翻面，讀邊呈之字形 */
.plate{ flex:1 1 auto; background:var(--cream); padding:.62rem .85rem; }
.ramp { flex:0 0 auto; width:calc(var(--w) * 1%);   /* ← 寬度是資料，見特徵 5 */
        background-image:linear-gradient(90deg, /* 硬停點 */ ); }
```

這一條同時決定了**版面的個性**：因為紙塊與色塊之間沒有任何緩衝，畫面上到處是硬碰硬的接縫，而接縫的位置是資料決定的——這就是本風格的版面辨識點。

**明文禁用**：卡片陰影、圓角、`gap`、`margin` 造成的「浮起來」、玻璃擬態、任何把紙當成「背景」而不是「一塊版」的寫法（例如在紙上再放一個淺色面板）。

---

### 特徵 5 ── 借樣，而且具名（The Borrowing, Named）

**規則**：每一件圖像都**借一個指認得出來的歷史樣式**，並且**把借的是什麼印在版面上**。借而不說是抄；說了就是引用。

其次，**版面上的量必須是資料算出來的，不是排出來的**。本風格把「設計決定」交給三個數字：

| 版面屬性 | 由什麼決定 |
|---|---|
| 色帶的**寬度** | 一個連續量（時間、長度、重量、價格…） |
| 色帶的**階數 N** | 一個離散量（件數、曲數、批次、人數…） |
| 階梯的**起點油墨** | 那一件東西借的歷史樣式 |
| 階梯的**終點** | 永遠是那一罐茄墨 |

```html
<span class="pno">OP-101　青綠 → 茄墨</span>
<span class="pmeta">封套借樣 <b>維多利亞火柴標</b>　曲數 <b>4</b>　A 面 <b>18:42</b></span>
<div class="ramp" style="--w:46.6; --n:4"
     role="img" aria-label="寬度代表 18:42，四階代表四首，階梯自青綠走向茄墨。"></div>
```

**明文禁用**：憑感覺決定的寬度、為了好看而增減的階數、沒有出處的「復古風」裝飾、以及把借樣的名字藏起來。

---

## 三、字體系統

| 角色 | 字 | 設定 |
|---|---|---|
| 展示字（標題、片名、刊頭） | **Fraunces**（可變，1970 年代 Windsor／Cooper 一脈的暖襯線） | `font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 144;` `font-weight:900` |
| 數字、標籤、小字 | **Archivo**（grotesque） | `font-variant-numeric: tabular-nums` |
| 中文 | **Noto Serif TC** 400／500／700／900 | 與 Fraunces 同行時用 900 |
| 等寬（程式片段） | 系統等寬堆疊 | `.72rem` |

```
https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800&family=Fraunces:opsz,wght,SOFT,WONK@9..144,600..900,0..100,0..1&family=Noto+Serif+TC:wght@400;500;700;900&display=swap
```

字級階（clamp，不設第四級——本風格的階層靠**顏色與位置**，不靠字級堆疊）：

```css
h1,h2      { font-size: clamp(1.5rem, 4.2vw, 2.3rem); line-height:1.06; }
.ptit      { font-size: clamp(1.12rem, 3.1cqw, 1.62rem); }   /* 隨容器縮放 */
body       { font-size: clamp(15px, .95rem + .12vw, 17px); line-height:1.62; }
.lbl       { font-size:.62rem; font-weight:600; letter-spacing:.2em; text-transform:uppercase; }
```

**字距規則**：全大寫的英文標籤一律 `letter-spacing:.14em–.24em`；中文標題 `letter-spacing:.005em`（Fraunces 的 WONK 已經製造了不規則，再加字距會鬆掉）。

---

## 四、版面與網格

- **外框**：`max-width:1180px`，左右 `clamp(.9rem,2.4vw,1.8rem)`。
- **沒有欄網格。** 本風格的版面由「紙塊／色塊」的接縫決定，接縫位置是資料算出來的。需要並排時用 `grid-template-columns: minmax(0,1.1fr) minmax(0,1fr)`，兩欄，不要三欄。
- **分格一律 2px 實線 `#2A1A2C`**，細節線 1.5px。圓角全站 `0`。
- **色帶元件必須放在 container 裡**，這樣它在整頁寬與半頁寬的欄裡是同一個元件：

```css
.stackwrap{ container-type: inline-size; container-name: stack; }
.ramp{
  --s: calc(var(--w) * 1cqw / var(--n));   /* 一階的實際寬度 */
  background-size: 100% 100%;              /* == calc(var(--s)*var(--n)) */
  background-repeat: repeat-x;
}
@container stack (max-width: 620px){
  .bnd, .bnd.rev{ flex-direction: column; }
  .ramp{ height: 2.9rem; width: calc(var(--w) * 1%); }   /* 比例一格也不變 */
}
```

- **RWD**：`≤860px` 兩欄收一欄；`≤620px`（容器查詢，不是視窗）色帶改成上紙下色，**寬度百分比保持不變**，所以「寬＝資料」這條規則在任何尺寸都成立；`≤560px` 隱藏英文副標與部分表格欄位，其餘不動。

---

## 五、元件配方

### 5.1 刊頭

紙底、下緣 2px 茄墨線；左側是原創 logo（旋轉的橙皮螺旋）＋ 商號（Fraunces 900 ＋ Archivo 全大寫副標）；右側是三組「標籤／值」的事實。**刊頭沒有按鈕、沒有搜尋框、沒有漢堡選單。**

### 5.2 導覽：拉頁（gatefold）

四頁＝四張紙。四格大小、位置、外形、字、明暗結構完全一樣，變的只有**它有沒有被展開**：現用頁那一張是**展開的拉頁**，所以它比另外三格寬，而寬出來的那一半上印著這一頁的一行說明；另外三格摺著，說明在裡面看不見。

```css
.gate li{ flex:1 1 0; transition:flex-grow .42s cubic-bezier(.24,.8,.3,1); }
.gate li.out{ flex-grow:2.05; }                  /* 展開的那一張比較寬 */
.gfold{ flex:0 0 0; width:0; overflow:hidden; background:#562E33; color:var(--cream); }
.out .gfold{ flex:1 1 48%; width:auto; }          /* 摺出去的那一半 */
.gseam{ flex:none; width:3px; background:var(--cream); }  /* 摺線，兩種狀態都在 */
```

**語意分界**：這不是「摺痕」（那是已經發生過、不可逆的塑性變形）；拉頁是**現在正攤開著**、可逆、摺線在摺起與攤開兩種狀態下都存在，而且攤開後露出的是**它自己的另一半**，不是後面的東西。
**無障礙**：展開與否對輔助科技不可見，所以現用項同時帶 `aria-current="page"`；摺起的那一半 `aria-hidden="true"`。`≤820px` 時說明改為掉到該格下方全寬。

### 5.3 色帶（本風格的招牌元件）

```html
<li class="bnd">                     <!-- 偶數列加 class="bnd rev" 翻面 -->
  <div class="plate">                <!-- 沒上墨的版，所有文字都在這裡 -->
    <span class="pno">OP-101　青綠 → 茄墨</span>
    <span class="ptit">第八大道的雨</span>
    <span class="pwho">Sylvia Marder Trio</span>
    <span class="pmeta">A 面 <b>18:42</b>　曲數 <b>4</b>　封套借樣 <b>維多利亞火柴標</b></span>
  </div>
  <div class="ramp" style="--w:46.6;--n:4;--T:18.70s;--tf:steps(4);
       background-image:linear-gradient(90deg,#12897A 0 25%,#2E625F 25% 50%,#313D45 50% 75%,#2A1A2C 75% 100%)"
       role="img" aria-label="…"></div>
</li>
```

**色帶上永遠不放文字。**（因為階會走——見 6.4。）

紙版的左端（翻面列則在右端）放一枚 **42px 的借樣母題**：同一件東西的階梯與階數，用同一個量化器再畫一次。母題只有六個（橙與葉、太陽輪、拱、波、葉序、器），由「借了哪一個歷史樣式」對應過去——**母題不是裝飾，它是借樣這個欄位的圖像版**，所以同一個借樣永遠是同一個母題。

### 5.4 按鈕

```css
button{ font-family:var(--ui); font-weight:800; font-size:.76rem; letter-spacing:.08em;
        border:2px solid var(--ink); background:var(--cream); color:var(--ink);
        padding:.4rem .9rem; border-radius:0; cursor:pointer; }
button.primary{ background:var(--must); }                    /* 芥末底＋茄墨字＝8.56 */
button:hover{ background:var(--ink); color:var(--cream); }   /* 反相，不是變淡 */
button:disabled{ background:#C3B39F; color:#67575B; border-color:#67575B; }
```

### 5.5 表格

`border-collapse:collapse`；表頭下緣 2px 茄墨、其餘列 1.5px `#313D45`；偶數列底紋 `#DBCCB1`（紙→茄墨階梯的第二階，茄墨在它上面 10.36:1）。數字欄 `text-align:right` ＋ `tabular-nums`。

### 5.6 頁尾

茄墨滿版、紙色字；四欄事實（地址／營業／價目／沿革）＋ 頁面列（現用項芥末色）＋ 細字聲明。頁尾裡的細字用 `#C7B8A3`（對茄墨 8.43）。

---

## 六、動效規則

> 本風格的動效原則：**只有「階」會動，顏色本身從不漸變。** 任何 `transition` 的目標都不得是顏色的中間值。

| 種類 | 名稱 | 觸發 | 規格 |
|---|---|---|---|
| **環境 ambient** | 〈轉〉 | 無，持續 | 刊頭的橙皮螺旋 `animation: turn 1.8s linear infinite`。1.80 秒是 33⅓ 轉的真實週期（60 ÷ 33.333）。 |
| **輸入 input-driven** | 〈壓針〉 | hover／focus-within，延遲 0ms | 該條色帶的階數由 N **立刻**退到 3：換掉 `background-image` 與 `--s`，無 transition。像把唱針壓下去。 |
| **轉場 transition** | 〈翻面〉 | 換頁、nav 互動 | 拉頁以 `flex-grow`／`flex-basis` 展開收合，`.42s cubic-bezier(.24,.8,.3,1)`。不淡入、不滑入。 |
| **簽名 signature** | 〈走階〉 | 無，持續 | **色帶的顏色每一拍整階往前挪一格，階界一動也不動。** |

### 6.4 簽名動效〈走階〉的實作

```css
.ramp{
  --s: calc(var(--w) * 1cqw / var(--n));        /* 一階的實際寬度（需要 container） */
  background-size: 100% 100%;
  background-repeat: repeat-x;
  animation-name: walk;
  animation-duration: var(--T);                  /* 走完一圈 = 那一件東西的量 ÷ 60 */
  animation-timing-function: var(--tf);          /* steps(N)，N = 階數 */
  animation-iteration-count: infinite;
}
@keyframes walk{
  from{ background-position: 0 0; }
  to  { background-position: calc(var(--s) * var(--n)) 0; }
}
```

因為 `background-size` 恰好等於一整條階梯的寬度、`background-repeat` 是 `repeat-x`，平移一整個週期是**完全週期性**的：畫面每 `--T` 秒回到一模一樣的狀態，中間沒有任何跳接。由於階梯是「一罐油墨走到茄墨」，繞回去的時候會出現一道「墨接光」的硬縫，那道縫就在帶上一階一階地走。

**為什麼每一條帶都不同步**：`--T` 與 `--n` 都是那一件東西自己的資料，所以十二條帶的週期各不相同，畫面永遠不會整齊。

**降級（資訊零損失）**：

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{ animation-duration:.001ms !important; animation-iteration-count:1 !important;
                        transition-duration:.001ms !important; }
  .ramp{ animation:none; background-position:0 0; }   /* 停在第一階，階數與寬度不變 */
  .mk{ animation:none; }
}
```
四種動效降級後都只是「停住」：階數、寬度、顏色、文字、順序全部不變，一個位元的資訊也沒有少。

**明文禁用**：淡入、滾動視差、彈跳、顏色 transition、`scroll-jack`、任何把資訊藏在動畫後面的寫法。

---

## 七、插畫與圖像風格（hardband-ramp 硬邊色帶構成）

**三條原語，不允許第四條：**

1. **形 ＝ 一塊 clip。** 用 `clipPath` 或 `clip-path` 給出封閉輪廓；形本身不畫、不描邊、不填色。
2. **階調 ＝ 一個連續場經過量化器。** 場只有兩種：`linearGradient`（方向性的光）與 `radialGradient`（同心的光）。場永遠不會被直接看見。
3. **階數 ＝ 一個整數，而且它有意思。** 3–7。超過 7 階畫面就開始看起來像漸層，本風格的上限是 7。

**判準**：放大任何一張圖——(a) 找不到任何一條輪廓線；(b) 找不到任何連續明度變化；(c) 每一塊顏色都在四條官方階梯之一上（用滴管驗得出來）；(d) 數得出階數。

**與相鄰技法的分界**：

- 與「輪廓與平塗 contour-et-aplat」：那是**一條封閉輪廓 ＋ 其內完全無階調的平塗**，形由線決定；本技法零輪廓，形由最外階的邊界決定，而且內部一定有階。
- 與「粗網 coarse-screen」：那的最小單位是一顆點、點的大小就是調子；本技法沒有點，調子是整塊面。
- 與「界畫平塗 gyehwa-flat」：那的線是面的邊、線寬兩級；本技法一條線也沒有。
- 與「八位元像素」：那是自由的方形像素格；本技法的階是沿著一個連續場切出來的，形狀隨場而變，不受任何格點約束。

**明文禁用**：照片、`<img>`、半調網點、細線幾何線描、`feTurbulence`／`feDisplacementMap` 假質感、做舊與刮痕濾鏡、扁平化單色圖示庫、emoji 當 icon、金屬漸層、發光、模糊陰影、圓角。

---

## 八、Logo 與 Favicon

**Logo**：一個**借來的具象母題**（不是抽象記號），畫成一條被量化的階梯。示範站用的是一條削下來的橙皮盤成的阿基米德螺旋，皮被切成六階（芥末→茄墨），旁邊是商號。logo 檔案本身**不使用濾鏡**——把螺旋直接切成 n 段各自填平色，這樣它在任何會剝掉濾鏡的環境（郵件、OG image、某些 SVG sanitizer）裡都一樣。

```js
// 阿基米德螺旋帶：外緣 r = a + b·θ，內緣 r − w·taper，輸出填充輪廓
// 再依 θ 均分成 n 段，每段一個平色
```

**Favicon**：inline SVG data URI，紙底 ＋ 四道硬邊同心環（芥末→茄墨）＋ 中心孔。16px 下仍然讀得出「這是階，不是漸層」。**不要**把 logo 直接縮小——螺旋在 16px 會糊成一團。

---

## 九、Do & Don't

**Do**
- 先決定「哪個量決定寬度、哪個量決定階數」，再開始畫。
- 每一張圖都寫出它借自哪一個歷史樣式，並印在版面上。
- 把紙當成一罐顏色來配比（44%），不要當成剩下的空間。
- 讓 hover／focus 改變**階數**，而不是改變亮度。
- 表格、數字、事實愈多愈好——本風格的幽默感來自「一本正經地把一件小事算清楚」。

**Don't（含去 AI 化禁令）**
- 不要紫藍漸層 hero；本風格根本沒有 hero，也沒有任何未量化的漸層。
- 不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」；本風格沒有卡片，也沒有圓角。
- 不要 emoji 當 icon；不要 Lorem ipsum；不要「在當今快節奏的世界」。
- 不要用 `opacity` 做層次——本風格的層次只有階。
- 不要加 `EST. 19xx` 徽章、不要做舊、不要噪點、不要掃描線。
- 不要把展示字當成裝飾放大到看不出內容；Fraunces 的 900 已經夠吵了。
- 不要超過六罐顏色。真的。一九六六年那十二張封套就是這樣毀的。

---

## 十、頁面骨架（可直接使用）

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,%3Csvg…%3E">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800&family=Fraunces:opsz,wght,SOFT,WONK@9..144,600..900,0..100,0..1&family=Noto+Serif+TC:wght@400;500;700;900&display=swap">
<style>/* 六罐油墨 → 版面規則 → 色帶元件 → 拉頁導覽 */</style>
</head><body>

<header class="mast">…logo ＋ 商號 ＋ 三組事實…</header>

<nav class="gate"><ul>
  <li class="g out"><a href="a.html" aria-current="page">…</a>
    <span class="gfold"><span class="gseam"></span><span class="gnote">這一頁的一行說明</span></span></li>
  <li class="g"><a href="b.html">…</a><span class="gfold" aria-hidden="true">…</span></li>
</ul></nav>

<main>
  <div class="wrap"><p class="rulestrip lbl">帶寬＝X　·　階數＝Y　·　階梯都走向同一罐墨</p></div>

  <div class="wrap stackwrap">
    <ol class="stack">
      <li class="bnd">      <div class="plate">…</div><div class="ramp" style="--w:46.6;--n:4;…"></div></li>
      <li class="bnd rev">  <div class="plate">…</div><div class="ramp" style="--w:71.8;--n:6;…"></div></li>
    </ol>
  </div>

  <div class="wrap"><section>
    <div class="sh"><h2>…</h2><span class="lbl">…</span></div>
    <div class="cols">…文字… …<figure class="fig"><svg>…量化過的圖…</svg><figcaption>…</figcaption></figure></div>
  </section></div>
</main>

<footer class="foot">…四欄事實 ＋ 頁面列 ＋ 細字聲明…</footer>
</body></html>
```

---

## 十一、技術實作與相容性

### 11.1 本站承載視覺的三項技術

| 層 | 技術 | 在本風格裡承載什麼 |
|---|---|---|
| **A 渲染** | `SVG feComponentTransfer type="discrete"`（＋`color-interpolation-filters="sRGB"`） | 全站所有圖像的階調唯一來源。一個連續場經量化後輸出 N 塊硬邊平色，所以畫面上零真漸層 |
| **B 動效與時間軸** | **FLIP 版面轉場** | 〈排面台〉上曲目方塊的插入、取下與換序：先量舊矩形、換 DOM、再從差值倒推回去播，所以方塊是「被搬過去」而不是淡出淡入 |
| **C 版面與樣式** | **container queries ＋ `cqw`** | 色帶元件的一階實際寬度 `--s` 與標題字級都以 `cqw` 表示，所以同一個元件在整頁寬與半頁寬的欄裡階數與比例完全相同；簽名動效〈走階〉的位移距離也由它給出 |

### 11.2 支援現況與查證來源

**`<feComponentTransfer>` / `<feFuncR type="discrete">`**
- 來源：MDN〈`<feComponentTransfer>`〉（`svg.elements.feComponentTransfer`）。SVG 1.1 濾鏡原語，五種函數型別 `identity / table / discrete / linear / gamma`；`discrete` 的區間數等於 `tableValues` 的個數 n（`table` 是 n−1）。
- 支援：Chrome／Edge／Firefox／Safari 全部長期支援（SVG 濾鏡自 IE10 時代即為共同基線）。
- **必寫的一行**：MDN 明載「濾鏡預設在 `linearRGB` 色彩空間處理色彩分量，可用 `color-interpolation-filters` 改為 `sRGB`」。**不寫 `color-interpolation-filters="sRGB"`，`tableValues` 裡的色碼會被當成線性值解讀，輸出整體偏亮、階界位置也會偏移。** 本站四頁全部寫了。
- fallback：若濾鏡被停用（極少數 sanitizer 環境），`<g clip-path>` 裡的 `<rect fill="url(#field)">` 會露出未量化的灰階斜率——形、位置、版面、全部文字完全不變，只有那一張圖從「階」變成「灰」。所有圖像都另附 `<title>`／`<desc>`／`aria-label`，資訊零損失。

**CSS container queries ＋ `cqw`**
- 來源：MDN〈CSS containment / container queries〉。`container-type: inline-size` 建立行內尺寸查詢容器，`1cqw` = 最近的查詢容器行內尺寸的 1%。
- 支援：Chrome 105+／Edge 105+／Safari 16+／Firefox 110+（2023 年起為 Baseline）。
- fallback：不支援 `cqw` 的引擎會讓 `--s` 無效 → `@keyframes walk` 的 `to` 宣告被丟棄 → **簽名動效不播，色帶靜止**。色帶的**寬度**改由 `width: calc(var(--w) * 1%)` 承擔（百分比對 flex 父元素），所以「寬＝資料」這條規則在沒有 container query 的環境裡照樣成立。

**FLIP**
- 來源：MDN〈`Element.animate()`〉／`getBoundingClientRect()`。用的是 Web Animations API 的 `element.animate()`，Chrome 36+／Firefox 48+／Safari 13.1+。
- fallback：`if (el.animate)` 守衛；沒有 WAAPI 就直接換 DOM，結果完全一樣，只是不播位移。`prefers-reduced-motion: reduce` 時主動略過 FLIP。

**`linear-gradient` 硬停點**
- 同一個顏色連寫兩個位置（`#EE6A24 0 16.667%`）是 CSS Images Level 4 的雙位置語法，Chrome 72+／Firefox 83+／Safari 12.1+。更舊的引擎用等價的重複停點寫法（`#EE6A24 0, #EE6A24 16.667%, #C35A30 16.667%, …`）。

### 11.3 效能預算（實測）

| 頁 | 大小（含全部 inline CSS／JS／SVG） | 預算 350KB |
|---|---|---|
| `index.html` | 60.3 KB | ✔ |
| `catalog.html` | 47.0 KB | ✔ |
| `bench.html` | 42.5 KB | ✔（其中 inline JS 7.9 KB） |
| `house.html` | 40.7 KB | ✔ |

- **外部資源**：只有 Google Fonts 一項。零外部圖片、零外部音檔、零外部 JS。
- **首屏 JS**：`index.html`／`catalog.html`／`house.html` 各只有一行（加一個 `js` class），執行時間 < 1ms。`bench.html` 的 7.9KB 腳本在 `render(null)` 一次建 3 個 slot ＋ 4 個色塊，實測 < 10ms，遠低於 100ms 門檻。
- **動畫成本**：〈走階〉只動 `background-position`（合成層屬性），12 條帶同時播不觸發 layout；〈轉〉只動 `transform`。**零 layout thrashing**：FLIP 的所有 `getBoundingClientRect()` 都在同一個同步區段裡一次讀完，寫入分開進行。
- **量化器成本**：`feComponentTransfer` 是逐像素查表，沒有捲積核，是最便宜的濾鏡原語之一；全站共 8 個濾鏡實例，都套在靜態、不重繪的 SVG 上。

### 11.4 無障礙

- 每一個 `.ramp` 都是 `role="img"` ＋ `aria-label`，把「寬度代表什麼、階數代表什麼、階梯從哪一罐走到哪一罐」用文字講完。
- 每一張 SVG 圖都有 `<title>` ＋ `<desc>` ＋ `aria-labelledby`。
- 導覽現用項帶 `aria-current="page"`（因為「有沒有展開」對輔助科技不可見）。
- 所有互動都有 `:focus-visible` 的 3px 熱粉外框。〈排面台〉的換序與取下都是真的 `<button>`，鍵盤完全可用，換序後焦點跟著移動。
- 沒有任何資訊只由顏色承載：階數旁邊一定有數字，狀態旁邊一定有文字。
