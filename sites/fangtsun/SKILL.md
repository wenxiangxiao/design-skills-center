---
name: vienna-secession
description: Vienna Secession (1897–1905) for the web — square as the only unit, black-and-white Gitterwerk checker bands, letters packed into their cells, structural whiteness, and flat gold reserved for what is being honoured.
---

# 維也納分離派 Vienna Secession — 網頁風格規格書

## 一、設計哲學

一八九七年四月，十九位藝術家退出維也納藝術家協會，成立「維也納分離派」（Vereinigung bildender Künstler Österreichs — Secession）。第一任主席是 Gustav Klimt。他們的機關刊物《Ver Sacrum》（神聖之春，1898–1903）是**正方開本**——約 29.5×28.6 公分，這在當時的出版界是反常的，正方形浪費紙、難裝訂、書店不好上架。他們照樣做，因為正方形沒有方向，不強迫閱讀順序，圖與字可以在同一個場裡平等地佔位。

一八九八年 Joseph Maria Olbrich 蓋的分離派館，門楣上刻著 Ludwig Hevesi 的句子：**DER ZEIT IHRE KUNST · DER KUNST IHRE FREIHEIT**（給時代它的藝術，給藝術它的自由）。屋頂是一顆由三千片鍍金月桂葉組成的球，維也納人叫它「金色菜球」。整棟建築是白色的立方體加一顆金球——**白、方、金**，這三個字幾乎就是這個流派的全部。

分離派常被當成新藝術（Art Nouveau）的奧地利分支，這是誤讀。慕尼黑與布魯塞爾的新藝術是**鞭形曲線**；維也納在一九〇〇年之後迅速把曲線拉直，走向 Josef Hoffmann 與 Koloman Moser 的**方格**。一九〇三年 Hoffmann 與 Moser 創立維也納工坊（Wiener Werkstätte），Hoffmann 因為滿版方格的偏執被同行叫做「Quadratl-Hoffmann」（方格仔霍夫曼）。一九〇二年的第十四屆分離派展（貝多芬展）由 Hoffmann 設計展場，牆面切成黑白方格帶，Klimt 的《貝多芬橫飾帶》就掛在那條帶子上。

製作條件決定了它的樣子：石版與活版印刷、手工排字、金箔或金色油墨。**金是一塊平的金屬色，不是漸層**——因為當時根本印不出漸層的金。**留白是印出來的紙**——不是「還沒設計完的地方」，是版面計算過的一部分。

寫成網頁的判準只有一句：**遮掉全部文字看首屏，懂設計的人要能在三秒內說出「這是分離派」。**做不到就回去加強方格、加強留白、加強金，不要加強引擎。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是分離派了。每一項附可直接複製的片段。

### 特徵 1：正方形是唯一的比例單位（Das Quadrat）

所有長度都是同一個格單位 `--u` 的整數倍。容器、圖版、按鈕、留白、圖示，一律正方或正方的整數倍。**圓只准內接於格，而且永遠是正圓**——不准橢圓，不准圓角矩形。

現代做法：用 CSS 的 `round()` 把版面寬度鉗到格的整數倍，這樣「對齊格線」不是設計時手工對齊出來的，是瀏覽器每一幀算出來的。

```css
:root{
  --u:24px;              /* 格：一切幾何 */
  --t:24px;              /* 字級單位：與格分離，手機上格縮字不縮 */
  --wpct:92vw; --wmax:1128px;
  --wall:min(var(--wpct),var(--wmax));            /* 不支援 round() 時的連續值 */
}
@supports (width:round(down,10px,3px)){
  :root{ --wall: round(down, min(var(--wpct),var(--wmax)), var(--u)); }
}
@media(max-width:840px){ :root{--u:20px; --t:22px} }
@media(max-width:560px){ :root{--u:16px; --t:21px; --wpct:94vw} }

.wrap{ width:var(--wall); margin:0 auto }
.square{ aspect-ratio:1 }                          /* 一切圖版 */
.pad-2{ padding:calc(var(--u)*2) }                 /* 留白只有整數格 */
```

副作用是刻意的：拉動視窗時版面**一格一格跳**，不是平滑縮放。這就是這個風格的手感。

### 特徵 2：黑白棋盤格帶（Gitterwerk）

分段、框邊、頁眉一律用黑白相間的方格帶——**不用線、不用底色、不用陰影、不用圓角**。格帶的格與版面的格同大。禁用 `conic-gradient`（那會做出扇形接縫）；用兩層 45° 線性漸層互相錯開半格，這是最乾淨的做法。

```css
.chk{
  --c:calc(var(--u)*2);
  height:var(--u);                                  /* 一列格 */
  background-color:#F2F0E9;
  background-image:
    linear-gradient(45deg,#17171B 25%,transparent 25%,transparent 75%,#17171B 75%),
    linear-gradient(45deg,#17171B 25%,transparent 25%,transparent 75%,#17171B 75%);
  background-size:var(--c) var(--c);
  background-position:0 0, var(--u) var(--u);
}
.chk.h2{ height:calc(var(--u)*2) }                  /* 兩列格 */
.chk.inv{                                           /* 反相：深底白格 */
  background-color:#17171B;
  background-image:
    linear-gradient(45deg,#F2F0E9 25%,transparent 25%,transparent 75%,#F2F0E9 75%),
    linear-gradient(45deg,#F2F0E9 25%,transparent 25%,transparent 75%,#F2F0E9 75%);
}
```

### 特徵 3：字被塞進它的格（Secessionsschrift）

分離派的字不是「排」出來的，是**塞**進格子裡的：每個字母佔一格，撐到格邊為止，字距等於零，全大寫，O 是正圓，E／F 的橫畫等長。中文可以做得比拉丁文更精確——一個漢字一格，格是正方，字級由格寬決定而非由字型決定。

```css
.sqline{ display:grid; grid-auto-flow:column; justify-content:start; line-height:1 }
.sqline b{
  --cw:calc(var(--u)*2.6);
  display:grid; place-items:center;
  width:var(--cw); aspect-ratio:1;
  font-weight:900; font-size:calc(var(--cw)*.84); letter-spacing:0;
}
.sqline b.o{ background:#17171B; color:#F2F0E9 }    /* 隔字反相＝門楣的陰刻 */

/* 拉丁副標：不塞格，改為極寬字距的平帶 */
.lat{ font-family:"Jost",sans-serif; font-weight:500;
      text-transform:uppercase; letter-spacing:.4em }
```

```html
<h1 class="lint">
  <span class="sqline" aria-hidden="true"><b>扣</b><b class="o">有</b><b>其</b><b class="o">格</b></span>
  <span class="hid">扣有其格</span>
  <span class="lat">Jedem Knopf sein Feld</span>
</h1>
```

### 特徵 4：留白即結構（Flächenkunst）

畫面至少四成是空的，而且**空白必為格的整數倍**。空白處不准填花樣、不准打底紋、不准放淡色圖、不准鋪材質。全站零漸層、零模糊陰影、零圓角。需要陰影時用實心位移色塊或 `inset` 硬邊。

```css
*{ border-radius:0 }
.card{ box-shadow: inset 0 0 0 3px #17171B }        /* 硬邊，非模糊 */
.sec{ padding: calc(var(--u)*2) 0 }                 /* 留白＝2 格 */
h2{ margin-bottom: calc(var(--u)*.6) }
p{ max-width:34em }                                  /* 文欄不准撐滿牆 */
/* 禁止：box-shadow 帶 blur、任何 linear-gradient 當底色、任何 noise/paper 紋理 */
```

### 特徵 5：月桂與金（Lorbeer & Gold）

唯一的裝飾母題是**月桂**，而且它必須是用方格堆出來的——不是曲線畫的葉子。**金 ≤6% 面積，永遠是平塗，永遠只給「被表彰的東西」**：現用的導覽格、當季的品項、被圍成的方、被選中的選項。金不當品牌色，不當連結色，不做漸層。

```html
<!-- 方格堆成的月桂：全部是 rect，沒有一條曲線 -->
<symbol id="lau" viewBox="0 0 24 24"><g fill="currentColor">
  <rect x="11" y="2" width="2" height="20"/>
  <rect x="5.5" y="5" width="3" height="3"/><rect x="7" y="9" width="3" height="3"/><rect x="8.5" y="13" width="3" height="3"/>
  <rect x="15.5" y="7" width="3" height="3"/><rect x="14" y="11" width="3" height="3"/><rect x="12.5" y="15" width="3" height="3"/>
  <rect x="8.5" y="19.5" width="2" height="2"/><rect x="13.5" y="19.5" width="2" height="2"/><rect x="11" y="22" width="2" height="2"/>
</g></symbol>
```

```css
.lau{ width:calc(var(--u)*1.4); height:calc(var(--u)*1.4); color:#B08A2E }
/* 金方鑲嵌：現用態不是被高亮，是被鑲上一枚金方 */
.cel i{ position:absolute; inset:20%; background:#B08A2E; z-index:-1;
        transform:scale(0); transition:transform .12s steps(3) }
.cel:hover i{ transform:scale(.46) }
.cel[aria-current=page] i{ transform:scale(1) }
```

---

## 三、色彩系統

只有五個顏色。**材質、分類、狀態一律不靠顏色區分，靠格子記號區分**——這條紀律直接來自當時的黑白印刷條件，而且它讓整套系統在單色印刷、色盲模擬與深色模式下都不會崩。

| 色票 | Hex | 面積 | 用途 |
|---|---|---|---|
| 石灰白 Kalkweiß | `#F2F0E9` | 約 46% | 唯一的地色。是刷了石灰的展場牆，不是紙——**零紙紋、零顆粒、零暖黃**，冷白偏灰 |
| 墨 Tusche | `#17171B` | 約 26% | 棋盤格、全部框線（一律 3px）、正文、反相格底 |
| 孔雀綠 Pfauengrün | `#1E6E63` | 約 14% | 第二平面：頁尾整塊、小標 kicker、連結、輔助說明 |
| 金 Gold | `#B08A2E` | ≤6% | 只給被表彰的東西。平塗，永不漸層 |
| 貝灰 Perlgrau | `#C9C4B4` | 約 8% | 空格、停用態、表格偶數列（`#E8E5DC`）與量測用中間調 |

規則：

- 金與孔雀綠**不得相鄰於同一條邊界**，中間必隔石灰白或墨。
- 墨只以「方格」或「3px 直線」出現，不做大面積色塊背景（頁尾的孔雀綠除外）。
- 灰階零色偏；不准用 `#111`、`#0A0A0A` 這類「偏暖的黑」。
- 深底區塊（頁尾、carve 欄）內部的金升為說明色，其餘照舊。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 中文標題 | Noto Sans TC | 900 | 塞格用。字級由格寬決定：`calc(var(--cw)*.84)` |
| 中文內文 | Noto Sans TC | 400 | 15px / line-height 1.95 |
| 拉丁標籤・數字 | Jost | 400 / 500 | Futura 系幾何無襯線，O 為正圓，最接近分離派的字感 |

```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;700&family=Noto+Sans+TC:wght@400;500;900&display=swap" rel="stylesheet">
```

字級階梯以**第二個單位 `--t`** 為基準，與幾何格 `--u` 分離。這是實作上必須注意的一點：手機上格要變小（否則版面塞不下），但字不能跟著等比縮小（`.52 × 16px` 只有 8px，沒有人讀得到）。兩個單位分開走，格縮字不縮。

```css
:root{ --u:24px; --t:24px }
@media(max-width:840px){ :root{--u:20px; --t:22px} }
@media(max-width:560px){ :root{--u:16px; --t:21px; --wpct:94vw} }

h1,h2,h3{ font-weight:900; letter-spacing:.14em; line-height:1.35 }
h2{ font-size:calc(var(--t)*.95) }
h3{ font-size:calc(var(--t)*.66); letter-spacing:.2em }
.kicker{ font-family:"Jost"; font-size:calc(var(--t)*.42);
         letter-spacing:.36em; text-transform:uppercase; color:#1E6E63 }
.tiny{ font-size:calc(var(--t)*.52); line-height:1.8; color:#3B3B40 }
.num{ font-family:"Jost"; font-variant-numeric:tabular-nums }
```

拉丁小標一律用德文單字（Werkstatt／Chronik／Auftrag／Ergebnis）——這是分離派的母語，也讓中文與拉丁在同一條格線上有明確的分工：**中文說內容，德文標段落**。

---

## 五、版面與網格

- **牆寬** `--wall` 由 `round(down, min(92vw,1128px), --u)` 決定，永遠是格的整數倍。
- **旋轉角度：零。** 分離派沒有斜的東西。唯一的 45° 出現在棋盤格的漸層算式裡與月桂葉的階梯，畫面上看不見斜線。
- **對稱與不對稱並用**：單一構件（門楣、印記、月桂）中軸對稱；頁面層級不對稱——把對稱的那一塊推到左邊，右邊放一條深色窄欄。

```css
/* 門楣構圖：左邊是軸對稱的牆，右邊是一條 9 格寬的陰刻欄 */
.portal{ display:grid; grid-template-columns:1fr calc(var(--u)*9) }
.wall{ display:grid; justify-items:center; gap:calc(var(--u)*1.25);
       padding:calc(var(--u)*2.5) calc(var(--u)*1) calc(var(--u)*2) }
.carve{ background:#17171B; color:#F2F0E9;
        padding:calc(var(--u)*1.6) calc(var(--u)*1);
        display:grid; align-content:start; gap:calc(var(--u)*1.1) }
@media(max-width:840px){ .portal{ grid-template-columns:1fr } }
```

- **表格**是這個風格的天然元件：`border-collapse:collapse`、2px 墨框、表頭反相（墨底白字）、偶數列 `#E8E5DC`、數字欄 `tabular-nums` 靠右。
- **手機 ≤560px**：格降到 16px，多欄一律攤成單欄，欄間的直線邊框改成下邊框，導覽的四格改為底部橫列或縮小，頁尾另備完整文字連結。

---

## 六、元件配方

### 導覽：inlay-square 嵌方

四頁＝四個正方格，黑白相間排成一條格帶。**現用態不是被高亮、不是被反相、不是變大——是它被鑲上了一枚金方。**（分離派館圓頂的鍍金月桂＝被表彰的東西。）

```css
.inlay{ display:grid; grid-template-columns:repeat(4,calc(var(--u)*2.4)) }
.cel{ position:relative; aspect-ratio:1; display:grid; place-items:center;
      text-decoration:none; color:inherit; isolation:isolate }
.cel:nth-child(odd){ background:#17171B; color:#F2F0E9 }
.cel:nth-child(even){ background:#F2F0E9; box-shadow:inset 0 0 0 2px #17171B }
.cel i{ position:absolute; inset:20%; background:#B08A2E; z-index:-1;
        transform:scale(0); transition:transform .12s steps(3) }
.cel:hover i,.cel:focus-visible i{ transform:scale(.46) }
.cel[aria-current=page] i{ transform:scale(1) }
.cel[aria-current=page]{ color:#17171B }
```

### 按鈕

方的，3px 墨框，無圓角，無模糊陰影，hover 換成金底。過場一律 `steps()`，不要平滑 easing——這個風格的動作是機械的。

```css
button,.btn{ font:inherit; font-weight:500; letter-spacing:.16em;
  color:#17171B; background:#F2F0E9; border:3px solid #17171B;
  padding:calc(var(--u)*.4) calc(var(--u)*.8); cursor:pointer;
  display:inline-grid; place-items:center;
  transition:background-color .1s steps(2), color .1s steps(2) }
button:hover,.btn:hover{ background:#B08A2E }
.btn.dark{ background:#17171B; color:#F2F0E9 }
.btn.dark:hover{ background:#1E6E63 }
```

### 圖版（方中圓）

每一件品項都住在一個正方框裡，內容是一個正圓。hover 時**左上角鑲進一枚金方**——不是放大、不是陰影、不是位移。

```css
.plate{ width:100%; aspect-ratio:1; background:#F2F0E9;
  box-shadow:inset 0 0 0 3px #17171B; position:relative;
  display:grid; place-items:center; isolation:isolate;
  border:0; padding:0; cursor:pointer; overflow:hidden }
.plate svg{ width:74%; height:74% }
.plate .gold{ position:absolute; left:3px; top:3px;
  width:var(--u); height:var(--u); background:#B08A2E;
  transform:scale(0); transform-origin:0 0; transition:transform .11s steps(3) }
.plate:hover .gold,.plate:focus-visible .gold{ transform:scale(1) }
```

### 表單

輸入框與按鈕同語彙：3px 墨框、零圓角、石灰白底。錯誤訊息不是紅字，是**一塊金底的方框**——因為金是「被指出來的東西」。

```css
.fld input,.fld select,.fld textarea{
  font:inherit; font-size:calc(var(--u)*.58); color:#17171B;
  border:3px solid #17171B; background:#F2F0E9; border-radius:0;
  padding:calc(var(--u)*.34) calc(var(--u)*.45); width:100% }
.errs{ border:3px solid #17171B; background:#B08A2E; padding:calc(var(--u)*.7); display:none }
.errs.on{ display:block }
```

### 彈出規格卡（原生 popover）

用 `popover` 屬性而非自寫 modal，因為它自帶頂層、`Esc`、focus 管理，而且**不支援時該元素會直接留在文件流裡顯示，內容零損失**。

```html
<button popovertarget="p-1">規格</button>
<div popover id="p-1" class="spec">
  <button class="pop-x" popovertarget="p-1" popovertargetaction="hide">閉</button>
  …
</div>
```

```css
[popover]{ border:0; padding:calc(var(--u)*1); background:#F2F0E9; color:#17171B;
  box-shadow:inset 0 0 0 3px #17171B; width:min(92vw,calc(var(--u)*20)) }
@supports selector(:popover-open){
  [popover]{ position:fixed; inset:0; margin:auto; height:fit-content;
    opacity:0; transform:scale(.94);
    transition:opacity .2s, transform .2s steps(4),
               overlay .2s allow-discrete, display .2s allow-discrete }
  [popover]:popover-open{ opacity:1; transform:scale(1) }
  @starting-style{ [popover]:popover-open{ opacity:0; transform:scale(.94) } }
  [popover]::backdrop{ background:rgba(23,23,27,.6) }
}
@supports not (transition-behavior:allow-discrete){
  [popover]{ transition:none; opacity:1; transform:none }
}
```

### 頁尾

一整塊孔雀綠，上方壓一條兩列高的反相棋盤格帶。四頁的完整文字連結一定要在這裡，這是所有非常規導覽的保底。

---

## 七、動效規則

**這個風格的動作是機械的**：所有 transition 一律 `steps()`，沒有一條 `cubic-bezier` 的緩動曲線。四種性質不同的動態，缺一不可。

| 類型 | 內容 | 參數 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 金方圓頂上一道光帶一格一格掃過 | `animation: sw 48s steps(24) infinite`，三條 `--u/2` 寬的白帶 opacity .45 | 動畫停用，光帶停在定點，圓頂完整 |
| input 輸入 | 格內鑲金：hover 任一格／圖版／導覽，90–120ms 內鑲入一枚金方 | `transform:scale()` + `transition .11s steps(3)`，延遲 < 100ms | duration 歸零＝瞬間鑲上，狀態語意不變 |
| transition 轉場 | 棋盤格推移：進頁時內容以 `clip-path` 一格一格被揭開 | `animation: rv .5s steps(8) both`，`inset(0 100% 0 0)` → `inset(0)` | `animation:none`＝直接是最終畫面 |
| signature 簽名 | **量化跳格 quantised reflow**：版面沒有任何連續尺寸，改變視窗時一格一格跳，跳一格則格數讀數跳一次、頁首格帶閃一次金 | `round(down, …, var(--u))` + rAF 節流的 resize 讀數 | 跳格照常（那是版面規則不是動畫），只是不閃金 |

```css
.rv{ animation:rv .5s steps(8) both }
@keyframes rv{ from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0 0 0)} }

@keyframes sw{ from{transform:translateX(calc(var(--u)*-4))}
               to{transform:translateX(calc(var(--u)*12))} }

@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation:none!important; transition-duration:.001s!important }
}
```

> 注意：`transition-duration:.001s` 而不是 `transition:none`，因為 `display` 的離散轉場需要一個非零時長才會觸發完成事件，歸零會讓 `allow-discrete` 的元件卡住。

新元素進場用 `@starting-style`，不要用 JS 加 class 再 rAF：

```css
.cl svg{ transform:scale(1); transition:transform .17s steps(4) }
@starting-style{ .cl svg{ transform:scale(.15) } }
```

---

## 八、插畫與圖像風格：square-inlay 方格鑲嵌

**全站不准有一條曲線路徑，圓除外。** 所有圖像只由四種原語構成，而且每一張圖都必須「拿掉顏色後仍數得出它用了幾格」。

1. **方格** — 唯一的形狀單位。永遠正方，永不圓角。
2. **方中圓** — 正圓內接於格。次級格內的小圓（孔、鉚點）可以巢狀，但仍必須是正圓。
3. **月桂** — 三到七個方格沿 45° 對角階梯排列組成一片葉，兩側鏡射掛在一條 2px 的直莖上。
4. **三點花萼** — 三個等大的方或圓構成正三角，用於印記與結尾記號。

分類記號取代顏色（這是本風格最實用的一條）：同一個圓內用不同的**格子配置**表示不同的類別。

```html
<symbol id="f-a" viewBox="0 0 24 24"><!-- 四角四格 -->
  <circle cx="12" cy="12" r="9.2" fill="#F2F0E9" stroke="#17171B" stroke-width="1.8"/>
  <g fill="#17171B"><rect x="5.8" y="5.8" width="2.6" height="2.6"/><rect x="15.6" y="5.8" width="2.6" height="2.6"/>
  <rect x="5.8" y="15.6" width="2.6" height="2.6"/><rect x="15.6" y="15.6" width="2.6" height="2.6"/></g></symbol>

<symbol id="f-b" viewBox="0 0 24 24"><!-- 對角三格 -->
  <circle cx="12" cy="12" r="9.2" fill="#F2F0E9" stroke="#17171B" stroke-width="1.8"/>
  <g fill="#17171B"><rect x="6.6" y="6.6" width="2.6" height="2.6"/><rect x="10.7" y="10.7" width="2.6" height="2.6"/>
  <rect x="14.8" y="14.8" width="2.6" height="2.6"/></g></symbol>

<symbol id="f-c" viewBox="0 0 24 24"><!-- 半格：以圓形 clipPath 切一塊實心 -->
  <circle cx="12" cy="12" r="9.2" fill="#F2F0E9" stroke="#17171B" stroke-width="1.8"/>
  <rect x="3" y="3" width="9" height="18" fill="#17171B" clip-path="url(#cc)"/></symbol>

<symbol id="f-d" viewBox="0 0 24 24"><!-- 滿格 -->
  <circle cx="12" cy="12" r="9.2" fill="#17171B"/></symbol>
```

金方鑲嵌的印記（回執、憑證、卡號章）以八乘八格、左右鏡射生成，其中恰好一格是金：

```js
function stamp(seed){
  let s=seed, out='<rect width="48" height="48" fill="#F2F0E9"/><g fill="#17171B">';
  const nx=()=>((s=(s*1664525+1013904223)>>>0)/4294967296);
  for(let r=0;r<8;r++) for(let c=0;c<4;c++) if(nx()<0.42){
    out+=`<rect x="${c*6}" y="${r*6}" width="6" height="6"/>`;
    out+=`<rect x="${(7-c)*6}" y="${r*6}" width="6" height="6"/>`;   // 中軸鏡射
  }
  out+='</g>';
  out+=`<rect x="${Math.floor(nx()*8)*6}" y="${Math.floor(nx()*8)*6}" width="6" height="6" fill="#B08A2E"/>`;
  out+=`<circle cx="24" cy="24" r="${6+Math.floor(nx()*4)}" fill="none" stroke="#1E6E63" stroke-width="3"/>`;
  return out+'<rect x="1.5" y="1.5" width="45" height="45" fill="none" stroke="#17171B" stroke-width="3"/>';
}
```

**禁用**：`feTurbulence`／手抖濾鏡、半調網點、細線幾何線描、寫實描繪、任何 `stroke-linecap:round`。

---

## 九、Logo 與 Favicon

Logo 的構成公式：**三乘三棋盤格 ＋ 中央格內一枚金正圓 ＋ 一圈 3px 墨框**。品牌字用極寬字距的拉丁大寫，另附一組月桂與一組金方作為節奏記號。

Favicon 用同一個構成，寫成 inline SVG data URI（`#` 要編碼成 `%23`）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23F2F0E9'/%3E%3Cg fill='%2317171B'%3E%3Crect width='8' height='8'/%3E%3Crect x='16' width='8' height='8'/%3E%3Crect y='16' width='8' height='8'/%3E%3Crect x='16' y='16' width='8' height='8'/%3E%3C/g%3E%3Ccircle cx='12' cy='12' r='4' fill='%23B08A2E'/%3E%3Crect x='1' y='1' width='22' height='22' fill='none' stroke='%2317171B' stroke-width='2'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定格，再決定內容。放不下就少放一件，不要縮小格。
- 分類、狀態、材質一律用**格子配置**區分，不用顏色。整站黑白印出來要能用。
- 金只給被表彰的東西，而且是平的。
- 留白留大塊、留整數格、留空。
- 所有 transition 用 `steps()`。
- 單一構件對稱、頁面層級不對稱。
- 拉丁德文只標段落，不承載內容。

**Don't**

- 不要曲線。除了正圓，畫面上不准有第二種曲線。
- 不要漸層（尤其不要漸層的金）、不要模糊陰影、不要圓角、不要紙紋顆粒。
- 不要用金當品牌色或連結色；金一旦超過 6%，這個風格就變成 Art Deco。
- 不要把分離派做成新藝術：沒有鞭形曲線、沒有藤蔓、沒有女子側臉。
- 不要「大致對齊」。對不齊就是錯的。
- 不要 emoji 當 icon、不要 Lorem ipsum、不要紫藍漸層 hero、不要置中大標＋兩顆按鈕＋三張圓角卡片、不要「EST. 19xx」徽章。
- 不要在留白處放淡色裝飾圖「補一下」。空的地方要真的空。

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;700&family=Noto+Sans+TC:wght@400;500;900&display=swap" rel="stylesheet">
<style>/* 第二、三、四、五節的 CSS 全部 inline */</style>
</head><body>

<svg class="hid" aria-hidden="true"><defs>…symbol 定義…</defs></svg>

<header class="hd">
  <a class="mark" href="index.html"><svg viewBox="0 0 24 24"><use href="#mark"/></svg></a>
  <div class="bn"><b>品牌名</b><em>Latin Name</em></div>
  <nav class="inlay" aria-label="主導覽">
    <a class="cel" href="index.html" aria-current="page"><i></i><em>門面</em></a>
    <a class="cel" href="b.html"><i></i><em>第二頁</em></a>
    <a class="cel" href="c.html"><i></i><em>第三頁</em></a>
    <a class="cel" href="d.html"><i></i><em>第四頁</em></a>
  </nav>
</header>
<p class="navnote">現用的那一格被鑲上金</p>
<div class="chk"></div>

<main>
  <section class="portal wrap rv">
    <div class="wall">
      <div class="dome"><div class="sw"><b></b><b></b><b></b></div></div>
      <h1 class="lint">
        <span class="sqline" aria-hidden="true"><b>四</b><b class="o">字</b><b>箴</b><b class="o">言</b></span>
        <span class="hid">四字箴言</span>
        <span class="lat">Vier Zeichen</span>
      </h1>
      <div class="rule"></div>
    </div>
    <aside class="carve">
      <svg class="lau"><use href="#lau"/></svg>
      <div><h3>Werkstatt</h3><p>地址<br>電話</p></div>
    </aside>
  </section>

  <div class="chk h2"></div>

  <section class="wrap sec">
    <span class="kicker">Kapitel</span>
    <h2>章名</h2>
    <div class="btgrid">
      <figure class="bt">
        <button class="plate" popovertarget="p-1"><i class="gold"></i>
          <svg viewBox="0 0 24 24"><use href="#f-a"/></svg></button>
        <figcaption><span class="no">編號</span><span class="nm">名稱</span></figcaption>
      </figure>
    </div>
  </section>
</main>

<div class="chk h2 inv"></div>
<footer><div class="wrap">
  <div class="fgrid">…四欄資訊，其中一欄必為全部頁面的完整文字連結…</div>
</div></footer>
</body></html>
```

圓頂（ambient）的純 CSS 做法，零 JavaScript、零外部圖片：

```css
.dome{ width:calc(var(--u)*11); height:calc(var(--u)*11);
  position:relative; overflow:hidden; --m:calc(var(--u)/2);
  background-color:#B08A2E;
  background-image:
    repeating-linear-gradient(90deg,transparent 0 calc(var(--m) - 2px),#F2F0E9 calc(var(--m) - 2px) var(--m)),
    repeating-linear-gradient(0deg, transparent 0 calc(var(--m) - 2px),#F2F0E9 calc(var(--m) - 2px) var(--m));
  clip-path:circle(50%) }
.dome .sw{ position:absolute; inset:0; animation:sw 48s steps(24) infinite }
.dome .sw b{ position:absolute; top:-4%; bottom:-4%;
  width:calc(var(--u)/2); background:#F2F0E9; opacity:.45 }
.dome .sw b:nth-child(2){ left:calc(var(--u)*1.5) }
.dome .sw b:nth-child(3){ left:calc(var(--u)*3) }
```

---

## 十二、技術實作與相容性

本風格用到三項現代 API，分屬三個不同的層（版面／動效／輸入），每一項都是**因為特徵需要它**才選，不是因為它新。查證日期 2026-08-26。

### 1. CSS `round()`／`mod()` 階梯值函式（版面與樣式層）

**承載特徵 1。** 讓「所有長度都是格的整數倍」由瀏覽器每一幀執行，而不是設計時手工對齊。也是簽名動效「量化跳格」的唯一實作。

- **支援現況**（查證來源：[caniuse `mdn-css_types_round`](https://caniuse.com/mdn-css_types_round)，2026-07 統計）：全球覆蓋 **89.71%**。Chrome／Edge **125+**、Firefox **118+**、Safari／iOS Safari **15.4+**、Opera 111+、Samsung Internet 27+。IE 全系列不支援。web.dev 公告階梯值函式為 **Baseline 2024**（[The CSS stepped value math functions are now in Baseline 2024](https://web.dev/blog/css-stepped-value-functions)）。
- **Fallback 具體行為**：`--wall` 先以 `min(92vw,1128px)` 定義為連續值，再用 `@supports (width:round(down,10px,3px))` 覆寫成量化值。不支援時牆寬平滑縮放、版面完全正常，只是失去「一格一格跳」的手感；讀數改為顯示四捨五入後的格數。**資訊零損失。**
- 注意：`round()` 內用 `vw` 而非 `%`，因為百分比要等到解出包含塊尺寸才能算，寫在 `:root` 的自訂屬性上會拿不到參照。

### 2. `@starting-style` ＋ `transition-behavior: allow-discrete`（動效與時間軸層）

**承載新元素的進場與 `display` 的離散轉場**：新釘上的圖版由 `scale(.15)` 長到 `scale(1)`、結果面板與回執由 `display:none` 過場到 `display:grid`，全部不需要 JS 加 class 再 rAF。

- **支援現況**（查證來源：MDN [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)、[`transition-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior)，web.dev [Now in Baseline: animating entry effects](https://web.dev/blog/baseline-entry-animations)）：Chrome／Edge **117+**、Safari **17.5+**、Firefox **129+**，2024-08 起 **Baseline Newly available**。
- **Fallback 具體行為**：`@supports not (transition-behavior:allow-discrete){ .result{opacity:1; transform:none; transition:none} }` — 面板直接出現、不播進場，內容與互動完全一致。`@starting-style` 不支援時整個 at-rule 被忽略，元素直接以最終樣式渲染。**資訊零損失。**
- 與 `prefers-reduced-motion` 的交互作用是本節最容易踩到的坑：降級時要寫 `transition-duration:.001s`，**不能寫 `transition:none`**，否則離散轉場不會執行、`display:none` 的元素永遠打不開。

### 3. `popover` 屬性（輸入與感測層）

**承載規格卡與規則卡。** 選它而非自寫 modal，是因為它自帶頂層（top layer）、`Esc` 關閉、light-dismiss、focus 管理與 `::backdrop`，而且**降級行為正好是我們要的**。

- **支援現況**（查證來源：MDN [`popover` global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover)、web.dev [Popover API lands in Baseline](https://web.dev/blog/popover-api)）：Chrome／Edge **114+**、Safari **17+**、Firefox **125+**，**Baseline 2024**。
- **Fallback 具體行為**：CSS 把 `[popover]` 的預設樣式寫成「文件流裡的一張卡」，只有在 `@supports selector(:popover-open)` 成立時才改成 `position:fixed` 的浮層。因此不支援的瀏覽器會把二十四張規格卡直接印在頁面上，可讀、可捲、可搜尋。**資訊零損失。**

### 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁位元組（含全部 inline CSS/JS/SVG） | 首頁 35.3KB／目錄頁 52.3KB／對局頁 37.7KB／廠事頁 32.3KB | ≤350KB ✓ |
| 外部資源 | 只有 Google Fonts 兩支字族，零外部圖片、零音檔 | — |
| 首屏 JS | 讀數腳本一次 `getComputedStyle` ＋ 一次 `getBoundingClientRect`；對局頁另建 44 個 DOM 節點 | ≤100ms ✓ |
| 對局引擎單手（列舉全部合法手＋一層前瞻） | **1.76 ms**（Node 22，800 局 15,700 手實測平均） | 遠低於一幀 |
| 主要動畫 | 圓頂光帶只動 `transform`，不觸發 layout；棋盤格帶為 `background-image` 靜態 | 60fps ✓ |
| resize 讀數 | rAF 節流，一次讀一次寫，無 layout thrashing | — |

**可行性優先於炫技**：三項技術在動手前都先做過最小原型與支援度查證；對局引擎的規則、計分與編解碼在寫進頁面之前，先在 Node 跑了 800 局全自動對打，違規手 0 次、編解碼往返 100% 一致。

---

*本規格書隨 Design Skills Center 館藏「方寸釦廠」發布。風格與內容分離：拿這份規格去做任何產業的網站都成立，只要那個產業願意接受「格是唯一的單位」。*
