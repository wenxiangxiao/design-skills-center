---
name: glasgow-style-mackintosh
description: The Glasgow Style of Charles Rennie Mackintosh and The Four — extreme vertical attenuation, the arc-built Glasgow rose, small chequers of squares, a vast uncoloured gesso ground, and monoline lettering stretched taller than it is drawn.
---

# 格拉斯哥學派 Glasgow Style（Mackintosh）

> 適用範圍：本規格書定義的是**風格**，不綁定產業。Demo 站是一間蘇格蘭的古典薔薇苗圃，
> 但同一套語彙可以拿去做書店、診所、樂器行、建築師事務所或任何需要「安靜、垂直、留白很多但不冷」的品牌。

---

## 一、設計哲學

一八九七到一九一〇年之間，Charles Rennie Mackintosh 與 Margaret Macdonald、Frances Macdonald、
Herbert McNair（合稱 The Four）在格拉斯哥做出一種與歐陸新藝術同時、但性格完全相反的裝飾語言。
歐陸新藝術是滿的、纏繞的、植物性的曲線；格拉斯哥是**空的、直的、被拉長的**。

理解這個流派只需要抓住一件事：**它把裝飾的量壓到極少，再把剩下的那一點點拉得很高。**

- Glasgow School of Art（1897–1909）、Hill House（1902）、Willow Tea Rooms（1903）裡，
  一個房間有九成是白牆，剩下一成是集中在視線高度以上的一小塊母題。
- 為什麼長成這樣：格拉斯哥是工業城，這批人做的是**室內**而不是印刷品。
  白牆是便宜的、可以自己漆的；高度是免費的；而手工雕的裝飾很貴，所以只做一點點，做在最顯眼的地方。
  這不是美學潔癖，是預算。**留白在這個流派裡是一個有成本意義的東西**——這正是 Demo 站把留白做成商品規格的由來。
- Mackintosh 與維也納分離派互相影響（1900 年他受邀在第八屆分離派展覽展出，Hoffmann 的方格語彙與他互為表裡），
  但兩者要分清楚：**維也納是黑白方格＋金；格拉斯哥是白＋淡彩，沒有金。**
  只要畫面上出現金屬光澤或鎏金，做出來的就是維也納或 Art Deco，不是格拉斯哥。

一句話的判準：**「拿掉那六成的白，它就不是格拉斯哥了。」**

---

## 二、本風格的 5 個不可省略特徵

以下每一項都是「拿掉它就不是這個風格」的程度。五項必須在同一個畫面上同時看得到。

### 特徵 1 — 極端縱向抽長（縱橫比 ≥ 1:3）

所有元素——字、莖、柱、面板、格子——都被縱向拉長到至少三倍。
**關鍵不是「把東西做高」，是「把一個比例正常的東西拉長」**：
拉長之後，橫向筆畫會變厚、縱向筆畫維持原寬，於是形狀變成「瘦，但橫向有重量」。
這是 The Four 用眼睛做的事，我們用一個變換做同一件事。

```css
:root{ --attn: 3.4; }            /* 抽長倍率，行動裝置降到 2.5 */

/* 版面上預留被拉長之後的高度，字才不會溢出去蓋到上面 */
.attn-wrap{
  display:block; position:relative; overflow:visible;
  height:calc(var(--fs, 26px) * var(--attn));
}
.attn{
  position:absolute; left:0; bottom:0;
  font-size:var(--fs, 26px); line-height:1;
  letter-spacing:.20em; text-transform:uppercase; white-space:nowrap;
  transform-origin:left bottom;
  transform:scaleY(var(--attn)) scaleX(.92);   /* 縱拉、橫略收 */
}
```

**自我驗證**：把整張圖橫向壓回 1/k（`transform:scaleX(calc(1/var(--attn)))`），
每一筆的粗細必須回到處處一致。做得到＝抽長是變換出來的；做不到＝你只是選了一支細長的字。

> Don't：不要用 `font-stretch: condensed` 或選一支現成的窄體來假裝。
> 窄體的橫筆不會變厚，抽長的橫筆會——這是眼睛分得出來的差別。

### 特徵 2 — 格拉斯哥玫瑰：只由圓弧接成的盤捲，外加一道弦

整個流派的識別母題。它是一朵被壓成同心半圓的玫瑰：
一個外圈圓、內含四道**交替方向**的半弧（構成盤捲），最後被一道近乎水平的直弦切平。
一八九〇年代畫這個的工具是圓規與分規，所以**明文禁用貝茲自由曲線**——`<path>` 裡只准出現 `A`（圓弧）與 `L`。

```html
<g fill="none" stroke="#1A1714" stroke-width="1.5">
  <circle cx="60" cy="60" r="30"/>
  <path d="M 36 60 A 24 24 0 0 1 84 60"/>          <!-- 半弧，向右 -->
  <path d="M 78 61.7 A 18.2 18.2 0 0 0 41.8 61.7"/><!-- 半弧，向左 -->
  <path d="M 45.6 63.3 A 12.4 12.4 0 0 1 74.4 63.3"/>
  <path d="M 68.1 65.0 A 6.6 6.6 0 0 0 51.9 65.0"/>
  <path d="M 33.6 73.8 L 86.4 71.4" stroke-width="2.1"/> <!-- 切平的那一道弦 -->
</g>
<circle cx="60" cy="54.6" r="6" fill="#C4697E"/>   <!-- 中心的玻璃珠：唯一的顏色 -->
```

半弧半徑的遞減規律：`r_k = R × (0.80 − 0.175k)`，圓心每層下沉 `R × 0.055k`。
**花永遠不抽長。**莖可以被拉到四倍，花是正圓——這個對比就是這個流派的張力來源。

### 特徵 3 — 小方格陣，恰有一格是實心

Mackintosh 的標點符號。三到六個 6–8px 的小正方形排成一列或一個矩陣，
**其中恰有一格（或極少數幾格）是實心的**，其餘是 1px 線框。
它從來不是拿來填滿一塊面積的紋樣，而是拿來「在這裡下一個點」。
最好讓它**真的在數東西**（Demo 站裡一格＝三十公分，數格子就知道苗有多高）。

```css
.sq      { fill:none; stroke:var(--lacquer); stroke-width:1 }
.sq-full { fill:var(--lacquer); stroke:none }
```
```html
<g><rect class="sq" x="0" y="24" width="7" height="7"/>
   <rect class="sq" x="0" y="15" width="7" height="7"/>
   <rect class="sq-full" x="0" y="6" width="7" height="7"/></g>
```

> Don't：不要做成棋盤格背景、不要做成 8×8 的滿版方陣——那是維也納工坊或孟菲斯，不是格拉斯哥。

### 特徵 4 — 六成以上是未著色的石膏白；彩色總面積 ≤ 12%

底是一面**有厚度的石膏牆**，不是「白色背景」：它永遠帶一道單向的抹刀紋，不存在平塗。
結構全部是近黑漆的細構件（1.2–2.6px）。顏色只以「被壓進去的東西」出現——玻璃珠、淡彩、綁帶——
而且**七個顏色加起來不准超過畫面的 12%**。

```css
body{
  background:#F1EFE8;
  background-image:
    repeating-linear-gradient(97deg, rgba(26,23,20,.030) 0 1px, rgba(26,23,20,0) 1px 4px),
    repeating-linear-gradient(97deg, rgba(255,255,255,.55) 0 2px, rgba(255,255,255,0) 2px 9px);
}
```
97° 是抹刀的方向；全站只能有一個方向。零圓角 >3px、零模糊陰影、零漸層、零發光。

### 特徵 5 — 抽長的等線體，O 是窄長方形，字距 ≥ 0.18em

Mackintosh 自己寫的招牌字是**等線**（各筆同粗）、**很高**、**字距很開**，
而且圓形字母被壓成圓角矩形——因為它們是被拉長的。
選一支幾何等線體（Jost、Futura、Century Gothic 一路），然後**自己把它拉長**（見特徵 1）。

```css
:root{ --cap:0.13em }
.attn{ text-box: trim-both cap alphabetic; }        /* 讓大寫字頂與基線精準坐在橫材上 */
@supports not (text-box-trim: trim-both){
  .attn{ line-height:1; margin-bottom:calc(var(--cap) * -1) }
}
```
漢字用 Noto Sans TC 200/300，字距 0.2–0.34em，**永遠不用粗體**——
這個流派沒有 bold，強調靠位置與留白，不靠重量。

---

## 三、色彩系統

| 用途 | 色票 | 名稱 | 面積 |
|---|---|---|---|
| 唯一大面積底 | `#F1EFE8` | 石膏白 gesso | 46% |
| 次階底、hover 底 | `#E6E2D7` | 石膏陰階 | 12% |
| 土帶、已乾的面 | `#DCD7C9` | 石膏灰階 | 8% |
| 全部構件、正文、規線 | `#1A1714` | 黑漆 lacquer | 15% |
| 次級文字、未選態線 | `#6E6A60` | 錫灰 pewter | 7% |
| 玫瑰、現用、警示 | `#C4697E` | 玫瑰粉 rose | 4% |
| 綁帶、自然物 | `#6E7F62` | 鼠尾草綠 sage | 3% |
| 連結、focus、芽 | `#6A5A8C` | 紫水晶 amethyst | 3% |
| 玻璃珠（黃） | `#D9B54A` | 淡黃玻璃 | 1% |
| 玻璃珠（藍） | `#2E5E86` | 藍玻璃 | 1% |

硬規則：

1. **零純白（最亮 `#F1EFE8`）、零純黑（最暗 `#1A1714`）。**
2. **零金、零銀、零金屬漸層、零光澤。**有金就變成維也納分離派或 Art Deco。
3. 彩色（粉／綠／紫／黃／藍）**合計 ≤ 12%**，而且不得作為大面積背景。
4. 零色彩漸層、零 `filter: blur`、零模糊陰影。需要厚度時用硬邊實色。
5. 可及性：`--pewter #6E6A60` 對 `#F1EFE8` 為 4.7:1，是本盤裡最淺的可用文字色；
   比它更淺的顏色（如常見的 `#9A968C`）只有 2.5:1，**只能畫線，不能寫字**。

---

## 四、字體系統

- **展示（抽長）**：Jost 200/300。`font-size` 18–30px，`letter-spacing .20em`，`scaleY(3.4) scaleX(.92)`。
- **英數內文**：Jost 300/400，14–15.5px，`line-height 1.85`，`letter-spacing .012em`。
- **漢字**：Noto Sans TC 200/300/500（500 只用在極少數標題），字距 .06–.34em。
- **標籤／眉標**：Jost 400，10–11px，`letter-spacing .24–.32em`，`text-transform:uppercase`，錫灰。
- **數字**：`font-variant-numeric: tabular-nums`。

字級 scale（1.28 比例，刻意平緩——這個流派不靠字級差做層級）：
`10.5 / 12 / 13.5 / 15 / 17.5 / 19 / 23 / 26`。

**層級規則：不用字重、不用字級差、不用顏色。用位置與留白。**
重要的東西放在「高處」與「被一大片空白圍著的地方」。

---

## 五、版面與網格

- 內容欄寬 1120px，左右 34px（行動 18px）。
- 主構圖一律**非對稱**：`minmax(200px,300px) 1fr`，或 `1.05fr 1fr`。切忌置中對稱。
- 分隔用 **2px 實線**（`--rail`），不用 1px 淺灰、不用陰影、不用圓角卡片。
- **垂直節奏**：區塊上留白 46–56px，下留白 0——內容往上靠，讓空白落在下面與上面的牆上。
- 旋轉角度：本流派幾乎不旋轉。唯一允許的傾角是結構性的枝幹分岔（±13°），
  以及石膏抹刀紋的 97°（＝垂直偏 7°）。**不要為了活潑而傾斜版面。**
- 留白規則（最重要的一條）：**任一首屏，未著色的石膏白必須 ≥ 60%。**
  如果版面塞滿了，先刪內容，不要縮小字。

---

## 六、元件配方

### 導覽（不是置頂色塊列）

```css
.nav ul{ list-style:none; margin:0; padding:0; display:flex; gap:26px }
.ni a{ display:flex; flex-direction:column; align-items:center; gap:3px; text-decoration:none }
```
每一格是一個 34×50 的小圖（一根莖＋一朵小玫瑰），下面兩行標籤（漢字 13px／英文 9.5px）。
**現用態不准用高亮、不准用底色、不准放大。**本站用的是「起苗」：現用那一格的植株被從土裡起出來，
根露在土線上面；其餘三格的根還埋著。

```css
.ng-roots{ opacity:0 }
.ni.on .ng-roots{ opacity:1 }          /* 底下那一半現在看得見 */
.ni.on .ng-soil{ transform:translateY(17px) }
.ni.on .ng-stem{ stroke:var(--lacquer) }
```
無障礙：這種差異對輔助科技不可見，**現用項必須同時帶 `aria-current="page"`**。

### 按鈕

```css
.kb{ appearance:none; background:transparent; border:2px solid var(--lacquer); border-radius:0;
     padding:18px 16px 16px; text-align:left; cursor:pointer; font:inherit;
     display:flex; flex-direction:column; gap:7px; min-height:118px;
     transition:background 70ms linear }
.kb:hover,.kb:focus-visible{ background:#E6E2D7 }
.kb-sq{ width:9px; height:9px; border:1.5px solid var(--lacquer) }   /* 特徵 3 */
.kb:hover .kb-sq{ background:var(--rose); border-color:var(--rose) }
```
按鈕是一塊**直立的**面板（高 > 寬），左上角一個小方格，文字左對齊。零圓角、零陰影、零漸層。

### 卡片（其實沒有卡片）

這個流派沒有「卡片」。用**一條 1px 底線**把項目分開就好：

```css
.ent{ display:grid; grid-template-columns:86px 1fr; gap:18px; padding:26px 0;
      border-bottom:1px solid rgba(26,23,20,.22) }
```

### 連結與表單

```css
.lnk{ text-decoration:none; border-bottom:1.5px solid var(--amethyst); padding-bottom:1px }
.lnk:hover{ background:#E6E2D7 }
:focus-visible{ outline:2px solid var(--amethyst); outline-offset:3px }
```

### 表格

```css
.tbl th{ font-weight:400; font-size:10.5px; letter-spacing:.26em; text-transform:uppercase;
         color:var(--pewter); border-bottom:2px solid var(--lacquer) }
.tbl td{ border-bottom:1px solid rgba(26,23,20,.22); padding:9px 12px 9px 0; vertical-align:top }
```

### 頁尾

2px 上框線，三欄不等寬（`1.4fr 1fr 1fr`），13px，無底色。

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可；四種都要有 `prefers-reduced-motion` 降級且資訊零損失。

| 種類 | 做什麼 | duration / easing |
|---|---|---|
| **ambient 環境** | 七根莖各自搖曳：Web Animations 加法合成的 `rotate`，振幅 0.34–0.60°，相位由 slug 雜湊決定 | 7.2–11.8s，`ease-in-out`，`iterations:Infinity` |
| **input-driven 輸入** | 碰任一根莖 → 莖由錫灰轉黑漆、加粗到 2.6px、珠放大到 4.6、量尺當場跳到那一根的公分數 | 60–70ms `linear`；量尺無補間（0ms） |
| **transition 轉場** | 換頁＝一道黑漆橫材由上緣落下再抽走（`clip-path: inset()`） | 出 190ms `cubic-bezier(.55,.06,.68,.19)`／進 260ms `cubic-bezier(.22,.61,.36,1)` |
| **signature 簽名** | **抽長生節**：新的一節不是被畫出來也不是被移進來的，它一開始就完整存在，只是 `scaleY` 是 0.06 | 540ms `cubic-bezier(.16,.72,.28,1)` |

簽名動效的實作與它為什麼是這個流派的動效：

```css
.seg{ transform-box:fill-box; transform-origin:center bottom }
.grow{ animation:attenuate 540ms cubic-bezier(.16,.72,.28,1) both }
@keyframes attenuate{ from{ transform:scaleY(.06) } to{ transform:scaleY(1) } }
```

因為 `stroke-width` 在非等比縮放下會跟著方向走，**節上的橫材在抽長的過程中會由極薄長到全厚，
而縱向的莖從頭到尾一樣粗**。也就是說：生長 = 改變縱橫比，不是改變尺寸。
這正是特徵 1 的動態版本。

明文禁用：`stroke-dashoffset` 描繪、數字計數、按壓硬陰影位移、視差、淡入當主打。
（但總數不得因此低於四種——安靜不是風格。）

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:1ms !important; animation-iteration-count:1 !important;
                        transition-duration:1ms !important }
  .railwipe{ display:none }
}
```
JavaScript 端另外以 `matchMedia('(prefers-reduced-motion: reduce)')` 攔掉搖曳與生長，直接給終態。

---

## 八、插畫與圖像風格

技法名稱：**異向抽長構成（anisotropic stretch）**。全站零外部圖片，三個原語，不允許第四種。

1. **抽長帶**：任何形先以正常比例、等寬描邊畫好，再整體 `scaleY(k)`。
   於是橫筆厚度 = `w × k`、縱筆厚度 = `w`。**橫縱筆寬比必須 ≥ 3，處處成立。**
2. **圓弧**：所有曲線只由 SVG 的 `A` 指令接成（玫瑰、盾形芽片、葉）。禁用 `C`／`Q`／`S`／`T`。
   盾形＝縱向 vesica：弦長 h、弓高 w/2 時，`r = (h²/4 + w²/4) / w`。
3. **珠點終端**：**任何一條線都不准就這樣停在空中**，端點一律收成一顆實心圓珠。
   這件事交給渲染器強制執行，不是手放的：

```html
<defs>
  <marker id="bead" viewBox="0 0 8 8" refX="4" refY="4"
          markerWidth="4.4" markerHeight="4.4" markerUnits="strokeWidth" orient="auto">
    <circle cx="4" cy="4" r="3.1" fill="#1A1714" style="fill:context-stroke"/>
  </marker>
</defs>
<line x1="30" y1="150" x2="30" y2="26" stroke="#1A1714" stroke-width="2" marker-start="url(#bead)"/>
```

`fill="#1A1714"` 是屬性、`style="fill:context-stroke"` 是宣告；
支援 `context-stroke` 的瀏覽器讓珠自動吃到那條線的顏色，不支援的退回屬性值。兩邊都對。

**驗收判準**：把顏色全部抽掉之後，(a) 每一條曲線都數得出它由幾段圓弧接成，
(b) 找不到任何一個裸露的線端，(c) 橫筆比縱筆厚至少三倍。

明文禁用：照片、半調網點、細線幾何線描（線要有寬度與方向性，不是髮絲）、
`feTurbulence` 假質感、扁平化單色圖示、金屬漸層、任何發光、任何模糊陰影。

---

## 九、Logo 與 Favicon 設計指南

**Logo**：左邊是符號，右邊是抽長的字，中間一道 2px 橫材把兩者壓在同一條線上。

- 符號 = 兩根不等高的立桿（端點收珠）＋ 一朵格拉斯哥玫瑰（在較高那根的頂上）＋ 一列五個小方格（恰一格實心）。
- 字 = 品牌名，`scale(0.94 2.35)`，`letter-spacing` 約 0.5em；副標用錫灰、不抽長。
- 不要把玫瑰放在字的正中央，不要對稱，不要外框。

**Favicon**：32×32 的內嵌 SVG data URI。一朵玫瑰（三道弧＋一道弦）＋ 一根往下出框的莖 ＋ 右下角一個實心小方格 ＋ 一顆粉色珠。
不要把 logo 整個縮小塞進去——16px 下只看得到那三道弧。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E...%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 讓首屏六成以上是空的，並且讓那片空白**有意義**（它是牆、是高度、是還沒被畫到的地方）。
- 把最重要的東西放高，其餘的壓到底部一條窄帶裡。
- 用 2px 實線分隔，用小方格當標點。
- 每一個顏色出現之前先問：它是「被壓進石膏裡的那顆珠」嗎？不是就拿掉。
- 現用態用「狀態改變」（起出來、被抽長、露出根），不要用高亮。

**Don't**

- 不要金、不要銀、不要任何金屬光澤與鎏金襯線徽章（那是 Art Deco／維也納）。
- 不要粗體、不要圓角 >3px、不要模糊陰影、不要漸層、不要毛玻璃。
- 不要置中對稱的大標＋副標＋兩顆按鈕＋三張卡片。
- 不要紫藍漸層 hero、不要 emoji 當 icon、不要 Lorem ipsum、不要「EST. 19xx」徽章。
- 不要用貝茲曲線畫玫瑰（會變成新藝術的藤蔓）。
- 不要把方格陣鋪成滿版棋盤（會變成維也納工坊）。
- 不要以為「很多留白」就等於這個流派——留白必須**被拉高**且**旁邊有一小塊很密的東西**在對比它。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>品牌名 — 頁名</title>
<link rel="icon" href="data:image/svg+xml,...">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Noto+Sans+TC:wght@200;300;500&display=swap" rel="stylesheet">
<style>
:root{ --gesso:#F1EFE8; --gesso2:#E6E2D7; --gesso3:#DCD7C9; --lacquer:#1A1714;
       --pewter:#6E6A60; --rose:#C4697E; --sage:#6E7F62; --amethyst:#6A5A8C;
       --attn:3.4; --rail:2px; --cap:.13em }
body{ margin:0; background:var(--gesso); color:var(--lacquer);
      font-family:'Jost','Noto Sans TC',sans-serif; font-weight:300; font-size:16px; line-height:1.85;
      background-image:
        repeating-linear-gradient(97deg, rgba(26,23,20,.030) 0 1px, rgba(26,23,20,0) 1px 4px),
        repeating-linear-gradient(97deg, rgba(255,255,255,.55) 0 2px, rgba(255,255,255,0) 2px 9px) }
.wrap{ max-width:1120px; margin:0 auto; padding:0 34px }
.head{ border-bottom:var(--rail) solid var(--lacquer) }
.head-in{ display:flex; align-items:flex-end; justify-content:space-between; gap:26px;
          max-width:1120px; margin:0 auto; padding:26px 34px 14px }
.attn-wrap{ display:block; position:relative; height:calc(var(--fs,26px) * var(--attn)) }
.attn{ position:absolute; left:0; bottom:0; font-size:var(--fs,26px); line-height:1;
       letter-spacing:.20em; text-transform:uppercase; white-space:nowrap;
       transform-origin:left bottom; transform:scaleY(var(--attn)) scaleX(.92);
       text-box:trim-both cap alphabetic }
@supports not (text-box-trim: trim-both){ .attn{ margin-bottom:calc(var(--cap) * -1) } }
.lead{ display:grid; grid-template-columns:minmax(200px,300px) 1fr; gap:46px; padding:46px 0 34px }
.foot{ border-top:var(--rail) solid var(--lacquer); margin-top:70px; padding:26px 0 46px; font-size:13px }
@media (max-width:560px){ :root{ --attn:2.5 } .wrap{ padding:0 18px } .lead{ grid-template-columns:1fr } }
@media (prefers-reduced-motion:reduce){ *{ animation-duration:1ms !important; transition-duration:1ms !important } }
</style>
</head>
<body>
<svg width="0" height="0" aria-hidden="true"><defs>
  <marker id="bead" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="4.4" markerHeight="4.4"
          markerUnits="strokeWidth" orient="auto">
    <circle cx="4" cy="4" r="3.1" fill="#1A1714" style="fill:context-stroke"/></marker>
</defs></svg>

<header class="head"><div class="head-in">
  <a class="mark" href="index.html"><!-- 立桿＋玫瑰＋方格陣＋抽長字 --></a>
  <nav class="nav"><!-- 四格，現用態用狀態改變而非高亮，並加 aria-current="page" --></nav>
</div></header>

<main>
  <section class="wrap lead">
    <div><div class="attn-wrap"><span class="attn">Section</span></div></div>
    <div><p>導言。左欄只放一個被拉長的詞，右欄放句子——非對稱，永遠不置中。</p></div>
  </section>
  <section class="wrap"><!-- 這裡六成以上留給石膏牆 --></section>
</main>

<footer class="foot"><div class="wrap"><!-- 三欄不等寬 --></div></footer>
</body>
</html>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，各屬不同層，各自承載一個不可省略特徵。

### 1. SVG `<marker>` + `marker-start / marker-mid / marker-end`（A 渲染層）

**承載**：特徵三的珠點終端與插畫技法的第三原語——「沒有一條線可以裸著結束」由渲染器強制，不是手放的。
改一次 `<marker>` 的定義，全站每一個線端同時改；全站沒有任何一顆珠是手動放置的。

- **支援現況（查證 MDN）**：`<marker>` 元素自 2015 年 7 月起跨瀏覽器可用（Baseline）；
  `marker-mid` 屬性自 2020 年 7 月起 widely available，對應的 CSS 屬性自 2017 年 4 月起 widely available。
  來源：MDN `<marker>` / `marker-end` / `marker-mid` 條目。
- **`context-stroke`（SVG 2）**：讓 marker 內的形吃到引用它的那條線的 `stroke` 顏色。
  支援度不如 `<marker>` 本身普及，因此一律寫成
  `fill="#1A1714" style="fill:context-stroke"`——
  **fallback 具體行為**：不支援時 CSS 宣告無效被丟棄，presentation attribute 生效，珠變成固定的黑漆色；
  形狀、位置、數量完全不變，只有 hover 時珠不會跟著莖一起變色。資訊零損失。
- **跨 `<svg>` 引用**：`url(#bead)` 在同一份文件內跨 `<svg>` 元素解析得到，
  所以把 `<defs>` 放在 `<body>` 開頭一個 `width="0" height="0"` 的 svg 裡即可全站共用。
  該 svg **不可用 `display:none`**（部分瀏覽器會連帶失效），用 `position:absolute;width:0;height:0;overflow:hidden`。

### 2. Web Animations API 加法合成 `composite: 'add'`（B 動效與時間軸層）

**承載**：ambient 搖曳。莖的靜態姿態（`transform` 屬性上的位移）與搖曳必須共存，
`composite:'add'` 讓搖曳**疊加**在既有值之上而不是取代它，所以一支動畫可以服務七根姿態各異的莖。

```js
const a = g.animate(
  [{transform:'rotate(-0.5deg)'},{transform:'rotate(0.5deg)'},{transform:'rotate(-0.5deg)'}],
  {duration: 7200 + phase*4600, iterations: Infinity, easing:'ease-in-out', composite:'add'});
a.currentTime = phase * duration;     // 相位：七根不同步
```

- **支援現況**：`Element.animate()` 本身是 Baseline；三種 composite 模式（`replace` / `add` / `accumulate`）
  自 Chromium 84（2020-05）起支援，Firefox 與 Safari 亦已實作。來源：web.dev「Web Animations API improvements in Chromium 84」、
  MDN `KeyframeEffect.composite`、CSS-Tricks「Additive Animation with the Web Animations API」。
- **fallback 具體行為**：整段包在 `try/catch` 與 `Element.prototype.animate` 存在性檢查裡。
  失敗時莖靜止站著——版面、尺寸、可讀性、量尺、所有數字皆不變。資訊零損失。
- **旋轉原點的陷阱（重要）**：SVG 元素的 `transform-box` 初始值是 `view-box`，
  此時 `transform-origin:50% 50%` 解析到的是整個 viewBox 的中心，不是元素自己——直接寫 `rotate()` 會讓整根莖繞著畫面中心甩。
  必須明寫 `transform-box: fill-box; transform-origin: 50% 100%`，把支點釘在該群組邊界框的底邊中點（＝土線上的莖腳）。
- 另一個陷阱：CSS `transform`（含 WAAPI 動畫）**會覆蓋** SVG 的 `transform` 屬性。
  需要同時有「定位」與「動畫」時，一律外層 `<g transform="translate(...)">` 包內層 `<g class="animating">`。

### 3. CSS `text-box-trim` / `text-box-edge`（C 版面與樣式層）

**承載**：特徵五。抽長之後的等線體要精準坐在 2px 橫材上，必須把字型自帶的上下 leading 切掉，
讓大寫字頂與基線成為盒子的實際邊界；否則 `scaleY(3.4)` 會把那幾 px 的 leading 一起放大成十幾 px 的歪斜。

```css
.attn{ text-box: trim-both cap alphabetic }
```

- **支援現況（查證 MDN）**：Chrome 133+／Edge 133+（2025-02）、Safari 18.2+（2024-12）預設可用；
  Firefox 尚未支援，因此**不是 Baseline**。來源：MDN `text-box-trim`／`text-box-edge`／`text-box` 條目。
- **fallback 具體行為**：`@supports not (text-box-trim: trim-both)` 內改用
  `line-height:1` ＋ `margin-bottom: calc(var(--cap) * -1)`，`--cap` 預設 `0.13em`
  （Jost 的 ascent 與 cap-height 差值的近似）。
  **本站的實作**：開機時先以 `CSS.supports('text-box-trim','trim-both')` 判斷，
  只有在不支援時才跑一次 canvas 量測把 `--cap` 改成該字型的精確值（等 `document.fonts.ready` 之後才量）：
  ```js
  const c = document.createElement('canvas').getContext('2d');
  c.font = '100px Jost';
  const m = c.measureText('H');
  document.documentElement.style.setProperty('--cap',
    ((m.fontBoundingBoxAscent - m.actualBoundingBoxAscent) / 100) + 'em');
  ```
  兩條 fallback 路徑的偏差都在基線 ±2px 以內，且**不改變任何一個字、任何一個數字**。資訊零損失。
- 不支援也不跑 JS 時（最壞情況）：`line-height:1` 生效，抽長字會比橫材高出約 1–2px。純視覺，無功能影響。

### 效能預算（實測值）

| 頁 | 單檔大小（inline 全部資源） | 外部資源 |
|---|---|---|
| `index.html` | 34.7 KB | 僅 Google Fonts |
| `key.html` | 41.4 KB | 僅 Google Fonts |
| `stock.html` | 41.3 KB | 僅 Google Fonts |
| `graft.html` | 26.8 KB | 僅 Google Fonts |

- 門檻 350 KB／頁，最大頁為門檻的 11.8%。零外部圖片、零音檔、零第三方 JS。
- 首屏 JS：`index.html` 的開機工作為一次 `querySelectorAll`（7 個節點）、7 次 `Element.animate()`、
  以及事件繫結，無版面量測、無同步 reflow 迴圈——遠低於 100ms。
- 動畫全部跑在 `transform` 與 `opacity` 上（合成層），無 layout thrashing；
  量尺拖曳每次 pointermove 只寫一次 `transform` 屬性與一次 `textContent`。
- SVG 皆為 `viewBox` 向量，不隨 DPR 增加成本。

### 無障礙與降級總表

| 情境 | 行為 |
|---|---|
| 關掉 JavaScript | 四頁全文、七項規格、十六個品種、印刷版檢索表、價目、日曆皆為靜態 HTML；量尺停在 90cm；檢索台改讀印刷版對句表 |
| `prefers-reduced-motion` | 四種動效全部降級為終態，資訊零損失 |
| 鍵盤 | 量尺為 `role="slider"`（方向鍵 ±1cm、PageUp/Down ±10、Home/End）；檢索台 `1`/`2` 或 ←/→ 作答、Backspace 退回 |
| 螢幕閱讀器 | 導覽現用態另帶 `aria-current="page"`；結果區 `aria-live="polite"`；每張 SVG 帶 `role="img"` 與完整 `aria-label` |
| 顏色 | 所有文字色對 `#F1EFE8` ≥ 4.7:1；沒有任何資訊只靠顏色傳達（現用態同時改變形狀與可見結構） |
