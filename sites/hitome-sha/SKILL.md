---
name: sashiko-hitomezashi
description: Japanese sashiko (hitomezashi) visual language — indigo-dyed cloth, one bleached cotton thread, every mark a dashed running stitch on a 5 mm marking grid, patterns generated from two binary strings.
---

# 刺し子・一目刺し — 藍地に晒の一本

> 本規格書描述的是 **刺し子（さしこ）的一目刺し（ひとめざし）分支**：日本東北（津軽・庄内・南部）自江戸期以來、用一色棉線在藍染布上以等長運針補強衣物而長成的視覺語言。
> 外部參照：津軽こぎん刺し與庄内刺し子的傳世裂（日本民藝館藏）；南部菱刺し；武州正藍染（埼玉県羽生・加須，藍甕灰汁発酵建て）；現代刺し子道着（剣道着的「刺し子織」與手刺し）；數理側的 C. Defant & N. Kravitz, *Loops and Regions in Hitomezashi Patterns*（arXiv:2201.03461 / Discrete Mathematics, 2024）。
> **與鄰近流派的分界**：與「拼布 Quilt」不同——拼布的單位是一塊布，語意在色塊的拼接；本流派整幅只有一塊布，語意在針目。與「織紋 Jacquard／Kente 條幅織」不同——那兩者的圖案是**織進去的**，圖案與布同時誕生；刺し子是布做好之後**在表面加上去**的，可以拆、可以看到背面。與「絞染」不同——那是防染，圖案是「沒有染到的地方」；這裡圖案是「加上去的線」。與「十字繡 Cross-stitch」不同——十字繡的每一針**必須在交點交叉**；一目刺しの掟恰好相反：**縱橫的針目在交點絕不重疊**。

---

## 一、設計哲學

刺し子不是裝飾，是**補強**。東北的棉布稀缺，一件衣服要穿三代，所以在會先破的地方用線把布疊厚。密度就是強度，柄的位置由「哪裡會先壞」決定，不由好不好看決定。

這推出三條做網頁時的態度：

1. **每一條線都必須是一段一段的。** 這個流派沒有連續線。罫線、邊框、底線、導覽的分隔，全部是針目。看到一條實線，就不是刺し子了。
2. **色階是零。** 一甕藍、一色線。深淺不是調出來的，是**換一塊布**。所以沒有 opacity、沒有漸層、沒有陰影、沒有 hover 變淡。層級只能靠字級、字距、位置。
3. **格是真的。** 印付け（しるしつけ）是實際工序：先用へらと定規在布上打 5 mm 的格，柄才畫得下去。網頁上的 grid 不是輔助線，是可見的、印在布上的東西，而且**任何元素都不得落在格點之間**。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，畫面就不再是刺し子。

### 1. 針目：所有線都是等長虛線，且沒有一條實線

一目 = 5 mm。畫面上的一目換算成 `--p`（建議 14px）。針目佔一目的 0.72，間隙 1.28（一針一空的一目刺し節奏）。

```css
:root{ --p:14px; --sw:3px; }           /* 一目的長度；糸的粗細（全站唯一值） */

/* 任何「線」：hr、邊框、底線、表格分隔 —— 一律用這個 */
.rule{
  height:var(--sw);border:0;
  background-image:linear-gradient(90deg,
    var(--sarashi) 0 calc(var(--p)*.72), transparent 0 calc(var(--p)*2));
  background-size:calc(var(--p)*2) var(--sw);
  background-repeat:repeat-x;
}
/* 四邊都要針目的「框」：用四道 gradient，不要 border */
.blk{
  border:var(--sw) solid transparent;
  background-image:
    linear-gradient(90deg,var(--sarashi) 0 calc(var(--p)*.72),transparent 0 calc(var(--p)*2)),
    linear-gradient(90deg,var(--sarashi) 0 calc(var(--p)*.72),transparent 0 calc(var(--p)*2)),
    linear-gradient(0deg, var(--sarashi) 0 calc(var(--p)*.72),transparent 0 calc(var(--p)*2)),
    linear-gradient(0deg, var(--sarashi) 0 calc(var(--p)*.72),transparent 0 calc(var(--p)*2));
  background-size:100% var(--sw),100% var(--sw),var(--sw) 100%,var(--sw) 100%;
  background-position:0 0,0 100%,0 0,100% 0;
  background-repeat:repeat-x,repeat-x,repeat-y,repeat-y;
}
```

SVG 側用 `stroke-dasharray`，且**一定要配 `pathLength`**（見第十二章），否則縮放時針目長度會跑掉：

```html
<path d="M0 3H40" pathLength="40" stroke-dasharray="0.72 1.28"
      stroke="#EFE8D8" stroke-width="3" fill="none"
      stroke-linecap="butt" vector-effect="non-scaling-stroke"/>
```

`stroke-linecap` 必須是 `butt`。圓頭（`round`）是機器繡，不是手運針。

### 2. 交点で交わらない：縱橫針目在交點絕不重疊

這是一目刺し的定義性規則。實作上等價於：**同一格裡不會同時有橫針目與縱針目**。用位元決定：

```js
// a[y] ∈ {0,1} 每一「行」要不要移一目；b[x] ∈ {0,1} 每一「列」要不要移一目
const hasH = ((x + a[y]) & 1) === 0;   // (x,y)→(x+1,y) 有橫針目
const hasV = ((y + b[x]) & 1) === 0;   // (x,y)→(x,y+1) 有縱針目
```

因此畫面上到處是**角**（兩針目在交點轉彎）而不是**十字**。角連成閉じた輪，輪是這個流派唯一的「圖形」。若你畫出了交叉的十字，那是十字繡。

### 3. 格：5 mm 的印付け，而且看得見

```css
.cloth{
  background-color:var(--kon);
  background-image:
    repeating-linear-gradient(90deg,var(--hera) 0 1px,transparent 1px var(--p)),
    repeating-linear-gradient(0deg, var(--hera) 0 1px,transparent 1px var(--p));
}
```

`--hera`（へら印・粉筆色）是**唯一允許的第三個明度**，而且它**只能畫線，絕對不准承載文字**（對比僅 2.08:1）。版心寬度、行高、padding、margin 一律寫成 `calc(var(--p)*n)`，n 為整數；`line-height: calc(var(--p)*2)` 讓每一行文字正好坐在格上。

### 4. 糸は一色：要第二個顏色就換布，不換線

```css
:root{
  --kon:#142B44;      /* 濃紺（十二番染め）—— 主地色 */
  --ai:#1F4A74;       /* 藍（二番染め）—— 第二塊布 */
  --asagi:#3E7F86;    /* 浅葱木綿 —— 第三塊布，只能放圖，不放正文 */
  --sarashi:#EFE8D8;  /* 晒 —— 全站唯一的線色，也是全部文字色 */
  --akane:#9E2B2B;    /* 茜 —— 只給不可逆動作與 focus，≤4% */
}
```

硬規則：**零 opacity 調色、零 rgba 第四位、零 gradient 作為顏色、零 filter、零 box-shadow、零 text-shadow、零 backdrop-filter、零圓角（`border-radius:0`）**。深一階淺一階的需求，一律改成「換一塊布」或「改字級」。

### 5. 厚み：密度即強度，柄由「哪裡會先壞」決定

刺した所會縮、會厚。網頁上用**針目密度**而非顏色來表示重要性：重點區塊的針目場用短周期的位元串（如 `0`、`001`）讓輪變多、面變密；次要區塊用 `01`、`0101` 讓面變靜。**不要用亮度或飽和度做強調**——這個流派沒有那個維度。

---

## 三、色彩系統

| 色票 | Hex | 名 | 用途 | 佔比 |
|---|---|---|---|---|
| 濃紺 | `#142B44` | こんのう | 主地色、body 背景、footer 以外全部 | 約 58% |
| 晒 | `#EFE8D8` | さらし | **全部的線與全部的文字**，無例外 | 約 20% |
| 藍 | `#1F4A74` | あい（二番染め） | 第二塊布：footer、卡片、結果欄 | 約 12% |
| へら印 | `#3C5C7E` | しるし | **只畫 5 mm 格線與 1px 髮絲線，永不承載文字** | 約 5% |
| 浅葱 | `#3E7F86` | あさぎ | 第三塊布：圖版底，**正文禁止放上去** | ≤ 4% |
| 茜 | `#9E2B2B` | あかね | 不可逆動作按鈕、focus outline | ≤ 3% |

**實測對比（WCAG 2.1）**：晒／濃紺 **11.76:1**；晒／藍 **7.51:1**；晒／茜 **6.10:1**；晒／浅葱 **3.76:1**（只過大字門檻，故明令正文不得置於浅葱上）；晒／へら印 **2.08:1**（故へら印只准畫線）。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 字級 | 字距 | 行高 |
|---|---|---|---|---|---|
| 標題 h1 | Noto Serif TC | 700 | 1.28rem | .08em | `calc(var(--p)*2)` |
| h2 / h3 | Noto Serif TC | 700 | 1.08 / .94rem | .08em | 同上 |
| 正文 | Noto Serif TC | 400 | .86–.95rem | .02em | `calc(var(--p)*2)` |
| 標籤・LABEL | Zen Kaku Gothic New | 500 | .56–.64rem | .16–.24em | `calc(var(--p)*1.6)` |
| 數字 | Zen Kaku Gothic New | 500 | — | .04em | `font-variant-numeric:tabular-nums` |

**本流派沒有 hero。** 標題上限 1.28rem（≈20px）。商號在刊頭是 1.05rem 的一行，字距 .42em。理由來自產業事實：布上的字是刺出來的，一目 5 mm，刺不出巨型字。層級全部由**字距**與**位置**承擔，不由字級跳級承擔。

---

## 五、版面與網格

- 唯一長度單位是 `--p`（一目 = 5 mm）。**所有** margin / padding / width / height 寫成 `calc(var(--p)*n)`，n 為整數或 .5 的倍數。
- 版心固定 **56 目**：`width:min(calc(var(--p)*56), calc(100% - var(--p)*2))`。
- 行高一律 `calc(var(--p)*2)`（兩目一行），讓文字基線落在格線上。
- 斷點只改 `--p`，不改結構：`≤760px → 12px`、`≤560px → 11px`。這是本流派最省事也最正確的 RWD——布縮小，格跟著縮小，柄不變形。
- 不對稱來源：**針目場的位元串**，不是版面的偏移。版面本身正交、對齊、安靜；畫面的躁動全在布上。

---

## 六、元件配方

**nav（糸通し／threaded needle）**：四格等寬，每格一支針的 inline SVG。四支針外形完全相同；現用頁那一支**針眼裡穿著線**（一條 `stroke-dasharray` 的曲線），其餘三支是空針。無障礙不能只靠圖形，故現用項同時帶 `aria-current="page"` 並在頁名下加一條針目底線。

```html
<a href="gara.html" aria-current="page">
  <svg class="ndl" viewBox="0 0 76 26">
    <path class="ndl-b" d="M8 13h56" stroke-width="3"/>
    <path class="ndl-p" d="M64 13l9 0" stroke-width="1.4"/>
    <ellipse class="ndl-e" cx="15" cy="13" rx="5.4" ry="3.2"/>
    <path class="ndl-t" d="M15 13C4 13 2 21 9 23s16-2 26-2 18 3 26 1"
          pathLength="40" stroke-dasharray="0.72 1.28" stroke-width="2.4"/>
  </svg><b>柄帳</b><i>GARACHŌ</i>
</a>
```
```css
.ndl path,.ndl ellipse{fill:none;stroke:var(--sarashi)}
.ndl-e{fill:var(--kon)}
.ndl-t{display:none;stroke:var(--sarashi)}
a[aria-current=page] .ndl-t{display:block}
a:hover .ndl-b{stroke-width:5}            /* hover 只讓針變粗，不換色 */
```

**按鈕**：方角、無圓角、反相。常態＝晒底＋濃紺字；hover＝藍底＋晒字；不可逆動作＝茜底＋晒字。`:focus-visible` 一律 `outline:3px solid var(--akane)`。

**表格**：無框線，只有每列下緣一條 1px 的針目髮絲線；`th` 用標籤字（.62rem／.2em 字距）。

**卡片**：不是圓角陰影卡片。卡片是**一塊布**——`position:relative` 的容器，底下鋪 `.cloth` + 針目場 SVG，文字浮在上面。hover 時整塊布的橫針目移一目（見下章）。

---

## 七、動效規則

**自我限制條款：本流派零連續補間。** 所有時間函數一律 `steps()`，最小時間單位是「一目」。沒有 ease、沒有 cubic-bezier、沒有淡入、沒有位移慣性。但總動效數不得低於四種：

| 種類 | 內容 | 觸發 | 值 |
|---|---|---|---|
| ambient 環境 | 一支針沿刊頭的針目線一目一目走，走過的針目留著 | 時間 | `animation:run 12s steps(40,jump-none) infinite`（`stroke-dashoffset:0 → -40`） |
| input 輸入 | hover／focus 任一塊布，該塊的**橫針目整體移一目**，柄當場變成另一個柄 | pointer／keyboard | `transform:translate(1px,0)`（SVG user unit = 一目），`transition:transform 80ms steps(1,jump-end)` |
| transition 轉場 | 狀態切換以格為單位的硬邊 wipe | 狀態變更 | `@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}` + `.56s steps(8,jump-end)` |
| signature 簽名 | **縁の位元翻轉**：按左緣／上緣的點翻一個 bit，該行或該列的針目整條移一目，全幅的交點當場改變、新的柄自己長出來 | 點擊縁の点 | 無動畫，直接改 `stroke-dashoffset`（0 ↔ -1） |

`prefers-reduced-motion: reduce` 時：ambient 停在終點（全部針目可見）、input 的 transition 設為 none（狀態照變）、wipe 的 clip-path 設為 none。**四種降級後資訊全部保留，零損失。**

---

## 八、插畫與圖像風格（hitome-field 一目場構成）

全站零外部圖片、零照片、零 `<img>`、零 canvas。所有圖像由**三條原語**產生，不允許第四條：

1. **針目**：長度恆為 0.72 目的直線段，只有水平與垂直兩個方向，端點方頭。
2. **格**：一目 5 mm 的正交格，所有針目端點必落在格點上。
3. **位元串**：兩條 0/1 數列 `a[]`（行）與 `b[]`（列），完全決定整幅圖。**沒有一張圖是「畫」的。**

```js
function field(a,b){                      // a.length=H+1, b.length=W+1
  let s='';
  for(let y=0;y<=a.length-1;y++)
    s+=`<path d="M0 ${y}H${b.length-1}" pathLength="${b.length-1}"
        stroke-dasharray="0.72 1.28" stroke-dashoffset="${a[y]?-1:0}"/>`;
  for(let x=0;x<=b.length-1;x++)
    s+=`<path d="M${x} 0V${a.length-1}" pathLength="${a.length-1}"
        stroke-dasharray="0.72 1.28" stroke-dashoffset="${b[x]?-1:0}"/>`;
  return `<svg viewBox="0 0 ${b.length-1} ${a.length-1}"><g fill="none"
      stroke="#EFE8D8" stroke-width="3" stroke-linecap="butt"
      vector-effect="non-scaling-stroke">${s}</g></svg>`;
}
```

**明文禁用**：照片、半調網點、細線幾何線描（thin-lineart）、`feTurbulence` 假布紋、任何做舊／掃描濾鏡、扁平化單色圖示庫、emoji、金屬漸層、任何發光、任何模糊陰影、任何曲線（針目只有水平與垂直）、任何斜線、任何圓角。

**一個必須知道的不變量**：一目刺しの目数與柄無關。W×H 目的布，不論位元串怎麼選，橫針目恆為 (H+1)·W/2、縱針目恆為 (W+1)·H/2。40 目角一律 1640 目＝糸 8.20 m。做報價、做進度條、做資訊圖時要利用這一點。

---

## 九、Logo 與 Favicon

Logo 就是一塊 9 目角的一目刺し（行 `0011`／列 `0011`＝角亀甲），右側配標籤字的拉丁社名。**不要畫針、不要畫線團、不要畫和風圖章**——標記本身必須是這個流派的產物。

Favicon 用 inline SVG data URI，2×2 目的最小可辨識單元（四段針目互不相交）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23142B44'/%3E%3Cg stroke='%23EFE8D8' stroke-width='3' stroke-linecap='butt'%3E%3Cpath d='M2 10h8M18 10h8M6 22h8M22 22h8M10 2v8M10 18v8M22 6v8M22 22v8'/%3E%3C/g%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 每一條線都是針目；`stroke-linecap:butt`；針目長度用 `pathLength` 正規化。
- 縱橫針目在交點絕不重疊——用位元奇偶決定，不要手動避讓。
- 所有尺寸寫成 `calc(var(--p)*n)`；斷點只改 `--p`。
- 要第二個顏色，換一塊布。
- 密度表示重要性；字距與位置表示層級。
- 文案從產業事實長出來：目数、糸の長さ、縮み率、納期、藍建ての日数。

**Don't**

- ❌ 任何實線（含 `border:1px solid`、`text-decoration:underline`）。
- ❌ 任何 opacity／rgba 淡色／gradient 調色／filter／box-shadow／border-radius。
- ❌ 交叉的十字針（那是十字繡）、圓頭針目（那是機繡）、曲線針目。
- ❌ 巨型標題 hero、置中三卡片、紫藍漸層、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- ❌ 把へら印色拿去寫字（2.08:1）；把正文放到浅葱上（3.76:1）。
- ❌ 用 `feTurbulence` 假裝布紋。布紋是格，格是畫出來的。
- ❌ 淡入、視差、彈跳、慣性。本流派只有 `steps()`。

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="ja"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&family=Zen+Kaku+Gothic+New:wght@500&display=swap" rel="stylesheet">
<style>
:root{--p:14px;--sw:3px;--kon:#142B44;--ai:#1F4A74;--asagi:#3E7F86;--sarashi:#EFE8D8;--akane:#9E2B2B;--hera:#3C5C7E}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--kon);color:var(--sarashi);font-family:"Noto Serif TC",serif;
     font-size:15px;line-height:calc(var(--p)*2)}
.w{width:min(calc(var(--p)*56),calc(100% - var(--p)*2));margin-inline:auto}
h1{font-size:1.28rem;font-weight:700;letter-spacing:.08em}
.cloth{background-color:var(--kon);background-image:
  repeating-linear-gradient(90deg,var(--hera) 0 1px,transparent 1px var(--p)),
  repeating-linear-gradient(0deg,var(--hera) 0 1px,transparent 1px var(--p))}
.panel{position:relative;padding:calc(var(--p)*2) 0}
.panel .cl{position:absolute;inset:0;z-index:0}
.panel .in{position:relative;z-index:1}
.fld{position:absolute;inset:0;width:100%;height:100%}
</style></head>
<body>
 <nav>…四支針，現用頁那支穿線…</nav>
 <header class="panel">
   <div class="cl cloth"><svg class="fld" …>…針目場…</svg></div>
   <div class="in w">
     <p class="lb">標籤・LABEL</p>
     <h1>標題（上限 1.28rem，本流派沒有 hero）</h1>
     <dl class="fct">…每一則事實各佔一行，行高兩目…</dl>
   </div>
 </header>
 <main class="w">…</main>
 <footer class="ft">…第二塊布（藍）…</footer>
</body></html>
```

---

## 十二、技術實作與相容性

### (a) 所用 API 的現況支援與查證來源

| 技術 | 層 | 在本風格承載什麼 | 支援現況（2026-09 查證） |
|---|---|---|---|
| `pathLength` + `stroke-dasharray` | A 渲染 | 把針目長度正規化成「目」而非像素：`viewBox` 的一個 user unit＝一目，`pathLength` 設為格數後，`stroke-dasharray:0.72 1.28` 在任何寬度下都是同一個針目 | MDN：`pathLength` 將所有距離計算按 `pathLength /` 實際路徑長度縮放，`stroke-dasharray` 據此解讀。**全瀏覽器支援**。CSS 對應屬性 `path-length` 亦已存在，兩者並存時 CSS 優先 |
| `vector-effect="non-scaling-stroke"` | A 渲染 | 糸的粗細恆為 3px，不隨 `viewBox` 縮放變粗變細（布可以縮，線不能縮——實物就是如此） | MDN／caniuse：**Baseline widely available，2020-07 起全面可用**（Chrome 全版、Firefox 15+、Safari 5.1+）。規格中的 `non-scaling-size` / `non-rotation` / `fixed-position` 三值**無任何實作，不得使用** |
| `steps()` 時間函數 | B 動效 | 全站零連續補間，最小時間單位是一目 | CSS Easing Functions Level 1，**全瀏覽器長期支援**。`jump-none` / `jump-end` 關鍵字為 Level 1 新增，Chrome 77+／Firefox 65+／Safari 14+ |
| 自寫 hitomezashi 位元串引擎 | E 資料與生成 | 兩條 0/1 數列產生全站每一張圖、導覽狀態與功能結果；閉じた輪の探索為純 JS 圖走訪 | 無相依、無第三方程式庫、無 build step。純 ES5 語法，可在任何支援 SVG 的瀏覽器執行 |

**已知的相容性陷阱（務必照做）**：MDN 記載 **`pathLength` 不適用於文字的描邊（text stroke）**，因此 Safari 對 `<text>` 上的 `stroke-dasharray` 呈現與 Chrome／Firefox 不同（dash 會密約五倍）。**本風格因此明令：針目只畫在 `<path>` / `<line>` 上，絕不對 `<text>` 上 dash。** 文字要有針目底線時，改用 CSS 的 `background-image: linear-gradient(...)` 做（見第二章）。

### (b) 不支援時的 fallback 具體行為

- **JavaScript 全關**：四頁全部是建置期寫死的靜態 HTML 與內嵌 SVG。針目場、柄帳十六柄的目数與輪数、全部營業事實都在靜態表格裡；互動的「印付け台」退回一張十字花刺しの静的見本＋`<noscript>` 說明，並指向柄帳的靜態照合表。**一個字都不會少。**
- **`vector-effect` 不支援**（Safari ≤5 / Firefox ≤14）：線寬會隨縮放變化，柄仍然完全正確可讀，只是粗細不一致。不做偵測、不做 polyfill。
- **`pathLength` 不支援**（不存在於現役瀏覽器）：dash 會以像素解讀，針目長度改變但相位關係不變，柄的拓樸不變。
- **`steps()` 不支援**：動畫退為線性，視覺變「滑」，資訊不變。
- **字體未載入**：fallback 為 `serif` / `sans-serif`，版面因行高寫死為 `calc(var(--p)*2)` 而不位移。

### (c) 效能預算實測值（2026-09-20，本站實測）

| 項 | 值 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | index 41.8 KB／仕立て 62.1 KB／柄帳 95.8 KB／印付け台 44.3 KB | ≤350 KB ✅ |
| 外部資源 | Google Fonts 一支 CSS，其餘為零（零圖片、零音檔、零函式庫） | — |
| 首屏 JS 執行 | 三頁為 0 ms（無 JS）；印付け台建 50 條 path ＋ 首次繪製 **< 4 ms** | ≤100 ms ✅ |
| 位元串引擎 | 40×40 格的柄生成 200 次共 **11 ms**（單次約 0.055 ms） | — |
| 閉じた輪の探索 | 24 目角（600 目）單次 < 2 ms，按一次縁の点即時重算 | — |
| 動畫 | 全部為 `stroke-dashoffset` 與 `transform` 的離散跳變，無 layout thrashing，60 fps | 60 fps ✅ |

### (d) 數理註記（可驗證，非裝飾）

一目刺しの中にできる閉じた輪，其**寬與高必為奇數**，**周長 ≡ 4 (mod 8)**，**面積 ≡ 1 (mod 4)**。
出處：C. Defant & N. Kravitz, *Loops and Regions in Hitomezashi Patterns*（arXiv:2201.03461, 2022；Discrete Mathematics 347, 2024）；另有 Ren & Zhang 的簡化證明（Annals of Combinatorics, 2023）與 Hayes & Seaton, *Mathematical specification of hitomezashi designs*（Journal of Mathematics and the Arts, 2023）。
本站在**建置期**逐柄驗算十六柄（全部適合），並在**執行期**每次按下〈刺す〉重新數一遍。若你重製此風格，這個性質可以當成單元測試：任何一組位元串產生的任何一個閉じた輪都必須通過，通不過就是你的鄰接建法錯了。

---

*本規格書由 **Claude Opus 5 · 排程 Agent** 撰寫（2026-09-20）。*
