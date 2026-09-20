---
name: chaekgeori-minhwa
description: Korean chaekgeori folk painting (Joseon "bookshelf pictures") as a web style — reverse perspective built in CSS, ruled two-weight ink outlines, flat obangsaek five-direction grounds, and every object read as a literal blessing.
---

# 책가도 민화 Chaekgeori Minhwa — 風格規格書

> 這份規格書讓任何 AI 只讀本檔就能做出風格一致的全新網站，不綁定產業。
> 範例站：萬里電波社 만리전파사（電子修理與零件行 × 本流派）。

---

## 0. 本風格的 5 個不可省略特徵

拿掉任何一項，做出來的就不是책가도，而是「有格子的網站」。

### 特徵一：逆遠近법 역원근 — 遠面比近面大

盒與格的側板往後**越張越開**，消失點落在觀者這一側；同一件家具上可以有不只一個視點。
拿掉它，整張畫立刻變成西洋的靜物寫生。這是這個流派唯一一眼就認得出來的結構特徵。

實作：一格＝五個圖層（遠面＋上下左右四片側板），全部用 `clip-path: polygon()`，
**近面內縮 `--a`、遠面內縮 `--f`，而 `--f < --a`**（遠面因此比近面大）。

```css
@property --f{syntax:"<percentage>";inherits:true;initial-value:3%}
:root{--a:19%;--f:3%}                    /* 近 19%、遠 3% ⇒ 逆遠近 */
.cell{position:relative;overflow:hidden;transition:--f 260ms cubic-bezier(.3,.7,.3,1)}
.cell .far,.cell .pan{position:absolute;inset:0}
.cell .far{background:var(--gd);
  clip-path:polygon(var(--f) var(--f),calc(100% - var(--f)) var(--f),
                    calc(100% - var(--f)) calc(100% - var(--f)),var(--f) calc(100% - var(--f)))}
.cell .pt{clip-path:polygon(var(--a) var(--a),calc(100% - var(--a)) var(--a),
                            calc(100% - var(--f)) var(--f),var(--f) var(--f))}
.cell .pb{clip-path:polygon(var(--a) calc(100% - var(--a)),calc(100% - var(--a)) calc(100% - var(--a)),
                            calc(100% - var(--f)) calc(100% - var(--f)),var(--f) calc(100% - var(--f)))}
.cell .pl{clip-path:polygon(var(--a) var(--a),var(--a) calc(100% - var(--a)),
                            var(--f) calc(100% - var(--f)),var(--f) var(--f))}
.cell .pr{clip-path:polygon(calc(100% - var(--a)) var(--a),calc(100% - var(--a)) calc(100% - var(--a)),
                            calc(100% - var(--f)) calc(100% - var(--f)),calc(100% - var(--f)) var(--f))}
.cell:hover,.cell:focus-within{--f:31%}  /* --f > --a ⇒ 翻成正遠近（本站的簽名動效） */
```

**判準**：任取一個盒子，量它的遠端邊與近端邊——遠端必須比較長。量不出來就不是這個流派。

### 特徵二：界畫的等寬墨線 — 線是面的邊，不是東西的輪廓

每一個面都由**用尺畫的**等寬墨線界定。線寬只有兩級（結構 2.4px／細節 1.2px），
端點方頭、轉角尖角、**零圓角、零手繪抖動、零筆壓變化**。
曲線只允許圓規畫得出來的：正圓與正圓弧。

```css
:root{--k:2.4px;--k2:1.2px}
.ob-f{stroke:var(--meok);stroke-width:2.4;stroke-linejoin:miter;stroke-linecap:butt}
.ob-l{fill:none;stroke:var(--meok);stroke-width:1.2;stroke-linejoin:miter;stroke-linecap:butt}
hr.k{border:0;border-top:var(--k) solid var(--meok)}
/* 格線隨縮放不變粗細：SVG 內一律 vector-effect="non-scaling-stroke" */
```

**判準**：放大任何一張圖，每一條線都指得出它是 2.4 還是 1.2；找不到第三種線寬，也找不到任何圓角。

### 特徵三：오방색 五方色 — 顏色不是挑的，是方位

青(東)・赤(南)・白(西)・黑(北)・黃(中)。每一個顏色同時是一個方向、一個季節與一件事。
底色由格子的方位決定，**設計者沒有選擇權**。不調和、不漸層、沒有淡版。

```css
:root{
  --hobun:#E8E2D2;    /* 호분 胡粉 — 西・白 */
  --seokganju:#9B3A2A;/* 석간주 石間硃 — 南・赤 */
  --yangnok:#17654A;  /* 양록 洋綠 — 東・青 */
  --meok:#17181C;     /* 먹 墨 — 北・黑 */
  --jahwang:#D9A62B;  /* 자황 雌黃 — 中・黃 */
  --guncheong:#2C3E8C;/* 군청 群靑 — 間色，只給連結與器物 */
  --samcheong:#8FB3D9;/* 삼청 三靑 — 間色，只給器物 */
}
.cell--E{--gd:var(--yangnok)} .cell--S{--gd:var(--seokganju)}
.cell--W{--gd:var(--hobun)}   .cell--N{--gd:var(--meok)} .cell--C{--gd:var(--jahwang)}
```

**配套硬規則（本風格的靈魂）**：一件東西畫在一塊地上，**對比不足 3:1 就等於沒畫**。
所以同一件東西可能在南格看得見、在西格看不見——顏色的合法性由地決定，不由喜好決定。

```js
function lum(h){h=h.replace('#','');const c=[0,2,4].map(i=>parseInt(h.substr(i,2),16)/255)
  .map(v=>v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4));
  return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];}
const ratio=(a,b)=>{const l1=lum(a),l2=lum(b);
  return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);};
// 用法：ratio(groundHex, pigmentHex) >= 3 才准畫上去
```

實測（本站六種顏料對四個地色）：

| 地 | 可用顏料（≥3:1） | 不可用 |
|---|---|---|
| 東 양록 `#17654A` | 호분 5.42・자황 3.15・삼청 3.21 | 석간주 1.01・군청 1.38・먹 2.53 |
| 南 석간주 `#9B3A2A` | 호분 5.36・자황 3.11・삼청 3.17 | 양록 1.01・군청 1.39・먹 2.56 |
| 西 호분 `#E8E2D2` | 석간주 5.36・양록 5.42・군청 7.47・먹 13.72 | 자황 1.72・삼청 1.69 |
| 北 먹 `#17181C` | 호분 13.72・자황 7.97・삼청 8.12 | 석간주 2.56・양록 2.53・군청 1.84 |

### 特徵四：滿密與無空氣 — 沒有光源，沒有影子，沒有遠近的空氣

畫面上沒有一盞燈、沒有一道影、沒有空氣透視。空處填滿器物與紋樣（단청 的卍字連續紋）。
物與物之間沒有空間關係，只有疊壓次序。

```css
/* 明文禁用：box-shadow / text-shadow / filter / backdrop-filter /
   任何 gradient 當顏色 / opacity 調色 / 任何金屬或玻璃質感 */
.fret{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M2 14 L2 6 L8 6 L8 10 L5 10 L5 14 L14 14 L14 2' fill='none' stroke='%23D9A62B' stroke-width='1.4' stroke-linecap='square'/%3E%3C/svg%3E");
  background-repeat:repeat-x}
```

```svg
<!-- 面上的紋樣：SVG pattern；側板上的同一張紋必須跟著面一起斜 -->
<pattern id="dc" width="16" height="16" patternUnits="userSpaceOnUse">
  <path d="M2 14 L2 6 L8 6 L8 10 L5 10 L5 14 L14 14 L14 2"
        fill="none" stroke="#17181C" stroke-width="1.1" stroke-linecap="square"/>
</pattern>
<pattern id="dcs" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="skewX(-14)">
  <path d="M2 14 L2 6 L8 6 L8 10 L5 10 L5 14 L14 14 L14 2"
        fill="none" stroke="#17181C" stroke-width="1.1" stroke-linecap="square"/>
</pattern>
```

### 特徵五：母題的字面性 — 每一件東西都是一句話的圖畫版

牡丹＝富貴、石榴＝多子、佛手＝福。**畫上去的每一件東西都必須能指出它在說哪一句話**；
指不出來的東西不該出現在架上。這也決定了圖的畫法：物件要畫得**可辨識**，不可抽象化、不可裝飾化。

本站的做法（可照抄的模式）：把產業自己的物件表列出來，一件配一句，理由要從那件東西的**物理行為**長出來。

| 物 | 句 | 理由 |
|---|---|---|
| 진공관 真空管 | 長壽 | 它會亮，亮著就還活著 |
| 퓨즈 保險絲 | 平安 | 自己先斷，別人才不斷 |
| 콘덴서 電容 | 蓄財 | 存得住電，不急著放 |
| 인두 烙鐵 | 姻緣 | 把兩件本來分開的事接在一起 |
| 변압기 變壓器 | 中庸 | 把高的降下來，把低的升上去 |

---

## 1. 設計哲學

책가도（冊架圖）是朝鮮後期（18 世紀末起）的民畫類型：一架子的書與器物，畫在屏風上。
它有三個性質，決定了它翻成網頁時該怎麼寫：

1. **它是一張清單，不是一個場景。** 架子把世界切成格，每一格放幾件，看畫的人是一格一格讀的。
   → 網頁的資訊層級由「格」承擔，不由字級承擔。
2. **它的透視是反的。** 궁중 책가도 用逆遠近，是為了讓架上每一件都完整地朝向觀者——這是一種**禮貌**，不是錯誤。
   → 所以「越遠越大」不是風格化，是這個流派的世界觀：東西是給你看的，不是給空間的。
3. **它的每一件都在說話。** 器物是 rebus，畫的是祝福不是靜物。
   → 內容必須能被指認、被翻譯；裝飾性的、說不出意思的形狀不該存在。

因此三條寫作原則：**先分格再寫字**、**把規則印在頁面上**（對比值、方位、可用顏料）、**每一個圖都要能被翻譯成一句話**。

---

## 2. 色彩系統

| 用途 | 色碼 | 名 | 面積 | 規則 |
|---|---|---|---|---|
| 西・白／長文底 | `#E8E2D2` | 호분 胡粉 | ~32% | 全部長文一律坐這裡 |
| 北・黑／刊頭・頁尾・全部線 | `#17181C` | 먹 墨 | ~24% | 唯一的線色 |
| 東・青 | `#17654A` | 양록 洋綠 | ≤14% | 地色；其上文字只用 호분（5.42:1） |
| 南・赤／現用態 | `#9B3A2A` | 석간주 石間硃 | ≤14% | 地色；其上文字只用 호분（5.36:1） |
| 中・黃／hover 底 | `#D9A62B` | 자황 雌黃 | ≤12% | 其上文字只用 먹（7.97:1） |
| 連結・器物 | `#2C3E8C` | 군청 群靑 | ≤8% | 對 호분 7.47:1 |
| 器物 | `#8FB3D9` | 삼청 三靑 | ≤6% | **不承載文字**（對 호분 1.69:1） |

硬規則：零 `#FFF`、零 `#000`、零中間灰、零漸層、零陰影、零模糊、零發光、零透明度調色、**零圓角**。
唯一合法的曲線是圓規畫得出來的整圓（門把手、喇叭盆、轉盤），那是一個圓，不是一個圓角。
**一個顏料一個值**，沒有它的 60% 版本；要第二個明度就換一個顏料。

---

## 3. 字體系統

- **標題／店號**：`'Nanum Myeongjo'` 800（Google Fonts）——朝鮮明朝體，橫細直粗、襯腳硬。
- **正文**：`'Noto Serif TC'` 400（中文）＋`'Nanum Myeongjo'`（韓文）。
- **規格與數**：`'IBM Plex Mono'`，0.78em，字距 .02em。

```css
body{font:400 1.02rem/1.64 "Noto Serif TC","Nanum Myeongjo",Georgia,serif}
h1,h2,h3{font-family:"Nanum Myeongjo","Noto Serif TC",Georgia,serif;font-weight:800;line-height:1.2}
.mono{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:.78em;letter-spacing:.02em}
```

字級只有四階：1.5rem（h2）／1.2rem（lede）／1.1rem（h3）／1.02rem（正文）。
本流派**沒有巨型字**——畫面上最大的東西是格子，不是標題。

---

## 4. 版面與網格

**五方版面**：3×3 格，中格放店號，上下左右四格放四個方位，四角留白格。這是 오방 的標準排法。

```css
.shelf--5{display:grid;grid-template-columns:repeat(3,1fr);
          grid-template-rows:repeat(3,minmax(150px,auto));border:var(--k) solid var(--meok)}
/* 順序：空 / 北 / 空 // 東 / 中 / 西 // 空 / 南 / 空 */
@media (max-width:560px){ .shelf--5{grid-template-columns:1fr;grid-auto-rows:minmax(132px,auto)} }
```

**圖鑑列對齊（subgrid）**：一排圖版的每一列（圖／名／規格／吉祥話／庫存）必須跨格對齊——
책가도 的格線是用尺畫的，格與格的分界不能錯開。

```css
.plates{display:grid;grid-template-columns:repeat(4,1fr);border:var(--k) solid var(--meok)}
.plate{grid-row:span 6;display:grid;grid-template-rows:subgrid}
@supports not (grid-template-rows:subgrid){
  .plate{grid-row:auto;display:block}
  .plate .pl-img{min-height:128px}.plate .pl-name{min-height:3.4em} /* …各列給 min-height */
}
```

留白規則：**沒有留白分區**。所有分隔都是 2.4px 或 1.2px 的實線。畫面要滿。

---

## 5. 元件配方

**導覽（門已開 door-swung）**：四頁＝架上四格，每格畫著一扇關著的門（方板＋圓把手）。
現用頁那一扇門**繞左緣轉開**——門板因此是一個逆遠近的平行四邊形，格子裡面露出來。

```css
.door{position:absolute;left:12px;top:12px;width:34px;height:40px;
      border:var(--k) solid var(--meok);background:var(--samcheong)}
.door::after{content:"";position:absolute;right:5px;top:50%;width:7px;height:7px;margin-top:-3.5px;
      border:var(--k2) solid var(--meok);border-radius:50%;background:var(--hobun)}
[aria-current="page"] .door{background:var(--meok);border-color:var(--meok)}     /* 格內（暗） */
[aria-current="page"] .door::before{content:"";position:absolute;left:-16px;top:0;width:16px;height:100%;
      background:var(--samcheong);border:var(--k2) solid var(--meok);
      clip-path:polygon(0 -14%,100% 0,100% 100%,0 114%)}                          /* 轉開的門板 */
```
門開沒開對輔助科技不可見，所以現用項**必須**同時帶 `aria-current="page"` 並把頁名改成 석간주。

**按鈕**：1.2px 墨線方框、호분 底、hover 換 자황 底（墨字 7.97:1）。沒有圓角、沒有陰影。
**表格**：`thead th` 底線 2.4px，其餘 1.2px；數字欄右對齊且用 mono。
**刊頭／頁尾**：整塊 먹 底、호분 字（13.72:1），刊頭下一條 18px 的 단청 帶。

---

## 6. 動效規則

四種，缺一不可，全部要有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 類 | 內容 | 值 |
|---|---|---|
| 環境 ambient | 단청帶圖樣自走；轉盤指針掃過刻度 | `40s linear infinite`；`22s ease-in-out infinite alternate` |
| 輸入 input-driven | 點一件器物即換顏料，對比值同幀更新 | 無 transition，延遲 0 ms |
| 轉場 transition | 進場時五格依「中→東→南→西→北」把遠面推出去 | `--f` 19%→3%，`620ms`，各延遲 90 ms |
| 簽名 signature | **透視歸正**：焦點落在一格，該格翻成正遠近 | `--f` 3%→31%，`260ms cubic-bezier(.3,.7,.3,1)` |

```css
@keyframes splay{from{--f:19%}to{--f:3%}}
.shelf--5 .cell{animation:splay 620ms cubic-bezier(.3,.75,.35,1) both}
.cell--C{animation-delay:0ms}.cell--E{animation-delay:90ms}/* … */
@media (prefers-reduced-motion:reduce){.shelf--5 .cell{animation:none}.cell{transition:none}}
```

**為什麼簽名是「翻成正遠近」**：正遠近在這個流派裡是**異常狀態**——它看起來像一個洞，逆遠近看起來像一個舞台。
用「暫時變正常」來標示「你正在看這一格」，同時把這個流派的核心特徵示範了一遍。

**明文禁用**：淡入、滾動揭示、視差、`stroke-dashoffset` 描繪、跑馬燈、彈跳、任何 `filter`。

---

## 7. 插畫與圖像風格

技法名：**gyehwa-flat 界畫平塗構成**。全站零外部圖片、零照片、零 `<img>`、零 canvas。
三條原語，明文不允許第四條：

1. **界線**：所有面由等寬墨線界定，線寬只有 2.4／1.2 兩級，方頭尖角，零圓角。
2. **平塗**：線內一律絕對均勻的單色，零漸層、零明暗、零陰影、零光源。
3. **逆遠近的四邊形**：所有立體物的側面都是平行四邊形，且**遠端邊必定比近端長**，比例全站一致。

曲線只允許正圓與正圓弧（圓規畫得出來的）。紋樣用 `<pattern>`；畫在側板上的紋樣必須用 `patternTransform="skewX()"` 跟著面一起斜，**不可以拉伸**。

**判準**：(a) 每一條線指得出是 2.4 還是 1.2；(b) 找不到任何連續明度變化與任何投影；(c) 每一個側面的遠端比近端長。

**禁用**：照片、半調網點、細線幾何線描、`feTurbulence` 假質感、做舊濾鏡、扁平化單色圖示庫、emoji、金屬漸層、發光、模糊陰影。

---

## 8. Logo 與 Favicon

**Logo**：一個逆遠近的正方格（外框＝遠面、內框＝近面開口、四條斜線＝四片側板），格裡站一件**這個產業最代表的器物**，平塗＋兩級墨線。
`assets/logo.svg` 自帶 `<style>`（獨立檔吃不到頁面 CSS）。

**Favicon**：32×32 inline SVG data URI，只畫「兩個嵌套方框＋四條斜線＋中心一塊赤」——16 px 下器物會糊掉，逆遠近的幾何還認得出來。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E…%3C/svg%3E">
```

---

## 9. Do & Don't

**Do**

- 先分格，再寫字。資訊層級靠格子，不靠字級。
- 把規則印在頁面上：方位、地色色碼、對比值、可用顏料數。
- 每一個圖都要能翻成一句話；說不出意思的形狀不要畫。
- 逆遠近的比例全站一致，而且量得出來。
- 顏色由方位決定；合法性由對比計算決定。

**Don't（含去 AI 化禁令）**

- ❌ 正遠近的盒子（除非是刻意的「歸正」狀態）。
- ❌ 光源、影子、空氣透視、任何 `box-shadow`／`filter`。
- ❌ 紫藍漸層 hero；❌「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」；❌ rounded-2xl ＋ 模糊陰影卡片。
- ❌ emoji 當 icon；❌ Lorem ipsum；❌「在當今快節奏的世界」之類 AI 腔。
- ❌「EST. 19xx」徽章；❌「老街屋／巷弄改建」開場敘事；❌「把 X 變成 Y」標題模板。
- ❌ 跑馬燈（단청帶是圖樣不是文字帶，不要拿它跑字）。
- ❌ 顏料的淡版、半透明、任何中間灰。
- ❌ 在 자황 上放 호분 字（1.72:1）、在 호분 上放 삼청 字（1.69:1）。
- ❌ 把 오방색 當成「一組好看的配色」自由挪用——顏色綁方位，挪用就失去意義。

---

## 10. 頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜商號</title>
<link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Serif+TC:wght@400;600&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet">
<style>/* §2 色票 + §3 字體 + §4 網格 + 特徵一的 .cell */</style>
</head><body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <!-- §7 的 dc / dcs pattern -->
</defs></svg>

<header class="mast"><div class="wrap"><svg class="lg">…逆遠近的格＋器物…</svg>
  <b>商號</b><span>副題</span></div></header>
<div class="fret" aria-hidden="true"></div>
<nav aria-label="주 메뉴"><ul class="nav">
  <li><a href="index.html" aria-current="page"><i class="door"></i><b>가게　店</b><em>Shop</em></a></li>
  …
</ul></nav>

<main class="wrap">
  <section class="shelf shelf--5">
    <!-- 空 / 北 / 空 // 東 / 中 / 西 // 空 / 南 / 空 -->
    <div class="cell cell--N" tabindex="0">
      <div class="far"></div><div class="pan pt"></div><div class="pan pb"></div>
      <div class="pan pl"></div><div class="pan pr"></div>
      <svg class="edge" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M19 19 L81 19 L81 81 L19 81 Z M3 3 L97 3 L97 97 L3 97 Z
                 M19 19 L3 3 M81 19 L97 3 M81 81 L97 97 M19 81 L3 97"
              fill="none" stroke="#17181C" stroke-width="0.8" vector-effect="non-scaling-stroke"/>
      </svg>
      <span class="lab on-dark">北 북</span>
      <div class="body on-dark"><b>主要事實</b><span>次要事實</span></div>
    </div>
    …
  </section>
  <hr class="k">
  <div class="cols"><section class="c7">…</section><aside class="c5">…</aside></div>
</main>

<footer><div class="wrap"><div class="fgrid">…四欄…</div></div></footer>
</body></html>
```

---

## 11. 技術實作與相容性

三項核心技術，選擇理由一律是「這個流派的視覺特徵需要它」。

### 11.1 `@property` ＋ `clip-path: polygon()` 插值（B 動效與時間軸層）— 承載特徵一

逆遠近的全部幾何由**一個**自訂屬性 `--f` 決定。未註冊的自訂屬性是「無型別的字串」，
瀏覽器無法在兩個值之間插值，所以 `transition:--f` 不會生效；用 `@property` 宣告 `syntax:"<percentage>"` 之後，
`--f` 成為可插值的百分比，於是整格五片 `clip-path` 一起平滑變形——這是全站進場動效與簽名動效共用的同一條軸。

**支援度查證（2026-09-20）**：MDN《@property》與 caniuse `mdn-css_at-rules_property` — Chrome/Edge 85+、Safari 16.4+、Firefox 128+；
**2024 年 7 月起為 Baseline**。
**Fallback 具體行為**：不支援時 `--f` 仍然是合法的自訂屬性，`clip-path` 照樣算得出正確的多邊形，
只是 hover 與進場變成**瞬間切換**而非過渡。幾何、方位、資訊全部不變，**資訊零損失**。
`clip-path` 的 `polygon()` 本身在點數相同時可插值（CSS Shapes 1），為 Baseline 已久。

### 11.2 SVG `<pattern>` ＋ `patternTransform`（A 渲染層）— 承載特徵四

平塗的面上要有 단청 的卍字連續紋，而畫在**側板**上的同一張紋必須跟著面一起斜。
`patternTransform="skewX(-14)"` 讓圖樣在圖樣座標系裡先剪切，紋樣因此是「被斜著印上去」而不是「被拉長」——
拉長會讓線寬變不均勻，直接違反特徵二的兩級線寬。
`<pattern>` 與 `patternTransform` 是 SVG 1.1 的核心，全瀏覽器長期支援，無相容性風險。
**Fallback**：圖樣失效時面仍是合法的平塗色，界線與內容不變。

### 11.3 CSS Grid `subgrid`（C 版面與樣式層）— 承載特徵二的「用尺畫」

책가도 的格線是一次畫好的，格與格的分界必須對齊。`subgrid` 是 CSS 裡唯一能讓巢狀元件**繼承**父格線的機制：
十二張圖版的六列因此逐列對齊，說明長短不影響「재고」那一行的位置。
**支援度查證（2026-09-20）**：MDN《Subgrid》與 caniuse `mdn-css_properties_grid-template-rows_subgrid` —
Firefox 71+（2019）、Safari 16+（2022）、Chrome/Edge 117+（2023-09），**2026-03-15 起為 Baseline Widely available**，全域支援 >92%。
**Fallback 具體行為**：`@supports not (grid-template-rows:subgrid)` 時圖版改 `display:block` 並給各列 `min-height`，
對齊由最小高度近似達成；欄位順序、內容與框線完全相同，**資訊零損失**。

### 11.4 效能預算實測

| 項 | 值 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部資源） | 18–33 KB | ≤350 KB ✓ |
| 首屏 JS 執行（〈책가 架〉，最重的一頁） | 一次 `paint()` 約 1.4 ms（12 件 × 對比計算＋DOM 更新） | ≤100 ms ✓ |
| 主要動畫 | 只動 `clip-path` 與 `background-position`，不觸發 layout | 60 fps ✓ |
| 外部資源 | 僅 Google Fonts；零圖片、零音檔、零函式庫 | ✓ |
| 建置期窮舉 | 四格合法顏料 3／3／4／3，合法解 5 184 組，無死局 | ✓ |

### 11.5 已知陷阱

- **`transition:--f` 沒有 `@property` 就完全不會動。** 這是最容易踩的一個：CSS 不報錯，只是靜止。
- **`clip-path` 的 `polygon()` 只在點數相同時插值**；四片側板與遠面都要固定用四點，不要為了省事在某一片用三點。
- **`overflow:hidden` 要下在 `.cell` 上**：遠面比近面大，逆遠近時遠面會頂到格線；沒有裁切就會蓋掉鄰格。
- **SVG 的 `stroke-width` 會被 `preserveAspectRatio="none"` 拉扁**。格線那一層一定要加 `vector-effect="non-scaling-stroke"`，否則橫線與直線粗細不同，兩級線寬的判準立刻破功。
- **`patternTransform` 用 `scale()` 會連線寬一起縮**；只用 `skewX()`／`rotate()`／`translate()`。
- 오방색的 자황（黃）對淺地幾乎沒有對比（1.72:1）。它可以當地色、當 hover 底、當器物色，**永遠不要拿它當文字色**。
