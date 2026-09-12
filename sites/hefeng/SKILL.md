---
name: amish-quilt
description: Lancaster-County Amish quilt style — concentric symmetric frames of saturated solid colour, no prints or gradients, no white, separated by hairline charcoal seams, with one continuous quilting stitch running across every seam.
---

# 阿米什拼布 Amish Quilt 風格規格書

> 適用對象：任何 AI 或設計者。讀完本文件即可在**任何產業**上重現這套視覺語言。
> 本規格取自賓夕法尼亞州蘭卡斯特郡阿米什人的被（約 1880–1940）。它的每一條規則都不是品味，是製作條件與教規的結果——這是它能被寫成規格書的原因。

---

## 〇、本風格的 5 個不可省略特徵

**判準：拿掉其中任何一項，做出來的東西還是可以看，但它不再是這個風格。**
每一項附可直接複製的片段。

### 特徵 1｜同心框，而且嚴格對稱

由外往內：**滾邊 → 外框 → 角塊 → 內框 → 中心場 → 中心菱形**。層層包住一個中心，左右上下對稱。這不是構圖偏好——一整片布不夠寬就往外接框，接框就得四邊等寬。**四個角塊必須同色**，有一個不一樣，整幅就歪了。

網頁化的意思是：**版面是一組同心的框，不是欄。** 把 `<header>／<nav>／<main>／<footer>` 全部裝進同一個中心場裡。

```css
.qborder{background:var(--ind);border:1.5px solid var(--ink);padding:40px;position:relative;overflow:hidden}
.cb{position:absolute;width:34px;height:34px;background:var(--mus);border:1.5px solid var(--ink)}
.cb.a{left:5px;top:5px}.cb.b{right:5px;top:5px}.cb.c{left:5px;bottom:5px}.cb.d{right:5px;bottom:5px}
.qinner{background:var(--pin);border:1.5px solid var(--ink);padding:26px}
.qcenter{background:var(--ind);border:1.5px solid var(--ink);padding:30px}
```

```html
<div class="qborder">
  <span class="cb a"></span><span class="cb b"></span><span class="cb c"></span><span class="cb d"></span>
  <div class="qinner"><div class="qcenter"><!-- 全部內容 --></div></div>
</div>
```

### 特徵 2｜一塊布 = 一個顏色。零印花、零漸層、零陰影

每一塊是一片單色的平織棉。**禁止 `linear-gradient` 當面積色、禁止 `box-shadow` 的模糊、禁止 `border-radius`、禁止半透明疊色。** 唯一允許的非平塗是 **64px 循環的平織紋理**——它是材質不是漸層，而且不得有方向性高光帶或暈影。

```css
:root{--weave:url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2764%27%20height%3D%2764%27%3E%3Cfilter%20id%3D%27w%27%20x%3D%270%27%20y%3D%270%27%20width%3D%27100%25%27%20height%3D%27100%25%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.92%200.38%27%20numOctaves%3D%272%27%20seed%3D%2711%27%20stitchTiles%3D%27stitch%27%20result%3D%27n%27%2F%3E%3CfeDiffuseLighting%20in%3D%27n%27%20surfaceScale%3D%271.5%27%20diffuseConstant%3D%271.05%27%20lighting-color%3D%27%23ffffff%27%3E%3CfeDistantLight%20azimuth%3D%27104%27%20elevation%3D%2756%27%2F%3E%3C%2FfeDiffuseLighting%3E%3C%2Ffilter%3E%3Crect%20width%3D%2764%27%20height%3D%2764%27%20filter%3D%27url(%23w)%27%2F%3E%3C%2Fsvg%3E")}
.wv{background-image:var(--weave);background-size:64px 64px;background-blend-mode:overlay}
*{border-radius:0!important;box-shadow:none!important}
```

`stitchTiles='stitch'` 是關鍵：沒有它，`feTurbulence` 的雜訊在磚與磚之間會出現接縫。

### 特徵 3｜飽和的深色，而且沒有白

布是做衣服剩下的，所以顏色就是衣服的顏色：靛藍、酒紅、松綠、茄紫、芥末、青灰。**粉彩不行**（那不是衣服的顏色），**白更不行**（白布是漂出來的）。長文不放在被面上——放在**本色棉布**（`--thr`）的背布或布標上，那是唯一的淺色，而且它是線的顏色不是布的顏色。

```css
:root{
 --ind:#1B2340; /* 靛藍・外框與地  32% */
 --win:#6E2434; /* 酒紅・中心      14% */
 --pin:#1F4A3C; /* 松綠・內框      13% */
 --aub:#43284C; /* 茄紫・滾邊       9% */
 --mus:#B0862A; /* 芥末・角塊/現用態 11% */
 --slt:#6F8794; /* 青灰・背布       8% */
 --ink:#141319; /* 炭・所有縫份與正文 6% */
 --thr:#C9BFA6; /* 本色棉線・壓線與布標 5% */
}
```
硬規則：**不得出現 `#fff`／`#000`／任何飽和度低於 12% 的中灰**。

### 特徵 4｜壓線跨過所有拼縫，一針到底

**拼縫**是布跟布之間的線（1.5px 實線炭色）。**壓線**是走在布上面的線（0.42–0.9px、`stroke-dasharray` 為真實針距）。壓線最後才在整幅上走，它**不管下面是哪一塊布**——羽毛渦卷會直直穿過中心菱形的邊走進內框。這是整幅唯一的曲線，也是唯一能證明這些布是同一幅的東西。每吋 8–12 針。

```html
<!-- 壓線層永遠是最後一個兄弟，且與底下的色塊沒有任何 DOM 關係 -->
<g class="qt-p"><!-- 色塊 --></g>
<g class="qt-s"><!-- 拼縫：stroke=#141319 stroke-width=.55 --></g>
<g class="qt-q" filter="url(#rel)">
  <g fill="none" stroke="#C9BFA6" stroke-width=".42" stroke-dasharray="2.0 1.25" stroke-linecap="butt">
    <path d="…羽毛渦卷…"/><path d="…菱格…"/><path d="…繩紋…"/>
  </g>
</g>
```
對於不是 SVG 的區域（例如一整疊被的側面），用同一條線的 28px 循環貼圖鋪一層，`position:absolute;inset:0;pointer-events:none` 蓋在所有色塊之上——它一樣跨過每一條縫：

```css
:root{--stitchtile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cg fill='none' stroke='%23C9BFA6' stroke-width='1' stroke-dasharray='3.4 2.1'%3E%3Cpath d='M-7 7 L7 -7 M0 28 L28 0 M21 35 L35 21'/%3E%3Cpath d='M-7 21 L7 35 M0 0 L28 28 M21 -7 L35 7'/%3E%3C/g%3E%3C/svg%3E")}
.stack{position:relative}
.stack .stl{position:absolute;inset:0;z-index:3;pointer-events:none;opacity:.62;
 background-image:var(--stitchtile);background-size:28px 28px}
```
只有「後來才縫上去的東西」（布標、按鈕上的字）可以蓋過它——給它們 `z-index:4`。

`stroke-linecap:butt` 是必要的：`round` 會讓針看起來像珠子。`stroke-dasharray` 的 dash:gap 比約 1.6:1（線在布上、孔在布下）。

四種紋樣各有分工：**羽毛渦卷**只走在夠大的一整片布上（所以中心要留得夠大）、**菱格**填空地、**南瓜籽**填小方塊、**繩紋**沿直邊走。

### 特徵 5｜四邊一圈滾邊把它封起來

6–10px 的異色滾邊沿四邊縫一圈，把整幅封死；四個角要接得起來。網頁上就是 `body` 的 padding 加一個外層底色——**畫面不得延伸到視窗邊緣**。

```css
body{background:var(--aub);padding:10px}          /* 滾邊 */
@media(max-width:560px){body{padding:5px}}
```

---

## 一、設計哲學

1. **規則先於品味。** 這個風格的每一條規則都可以追到一個物理或宗教上的理由：布不夠寬所以接框、教規禁印花所以用素色、白布要漂所以沒有白、壓線最後才走所以它跨過所有縫。做設計決定的時候，先問「這條規則的理由是什麼」，理由不成立就不要照抄。
2. **看不見的工才是價值。** 遠看是幾個大色塊，走近才看得到每吋十針的壓線。所以：**不要把資訊都塞進第一眼**，讓細節在靠近時才出現，而且細節必須是真的（真的針距、真的數字），不是裝飾。
3. **對稱是誠實的。** 對稱做不好會被一眼看穿，所以它是手藝的證明。不要用「刻意的不對稱」來製造活潑——這個風格裡的活潑來自顏色，不來自歪掉。
4. **補丁是紀錄，不是瑕疵。** 這個風格容許（甚至歡迎）看得出來的修改痕跡。介面上的狀態改變可以留下痕跡，不必每次都回到乾淨。

---

## 二、色彩系統

| 變數 | Hex | 用途 | 建議比例 |
|---|---|---|---|
| `--ind` | `#1B2340` | 靛藍。最大面積的地色＝外框與中心場 | 32% |
| `--win` | `#6E2434` | 酒紅。中心菱形、主要動作、標題重點 | 14% |
| `--pin` | `#1F4A3C` | 松綠。內框、通過態 | 13% |
| `--mus` | `#B0862A` | 芥末。四個角塊、現用態、連結 | 11% |
| `--aub` | `#43284C` | 茄紫。滾邊（畫面最外一圈） | 9% |
| `--slt` | `#6F8794` | 青灰。背布、次要面板 | 8% |
| `--ink` | `#141319` | 炭。**所有**縫份線與布上的正文 | 6% |
| `--thr` | `#C9BFA6` | 本色棉線。壓線、布標、長文的底 | 5% |

**規則**
- 任兩塊色域之間**必有一條 1.5px 的 `--ink` 線**（拼縫），永不直接相鄰、永不用漸層過渡。
- **長文一律在 `--thr` 的布上**（對比 10:1），被面上只放短標與數字。
- `--mus` 是唯一的「現用／被選中」色。不要新增第二個強調色。
- 深色底上的 `--thr` 文字對比約 8.3:1；`--thr` 底上的 `--ink` 文字約 10.2:1。兩者都超過 WCAG AA。

---

## 三、字體系統

| 用途 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 中文全部 | **Noto Sans TC** | 400 / 700 / 900 | 阿米什禁裝飾，所以襯線體不對。要的是工整、沒有個性的板 |
| 拉丁與數字 | **Archivo** | 400 / 600 / 700 | 標籤全大寫、`letter-spacing:.22em`；數字一律 `font-variant-numeric:tabular-nums` |

```css
body{font-family:"Noto Sans TC","Archivo",sans-serif;font-size:16px;line-height:1.72;letter-spacing:.02em}
h1,h2,h3{font-weight:900;line-height:1.2;letter-spacing:.16em}
.lat{font-family:"Archivo",sans-serif;letter-spacing:.22em;text-transform:uppercase;font-size:11px;font-weight:600}
.num{font-family:"Archivo",sans-serif;font-variant-numeric:tabular-nums;letter-spacing:.04em}
```

**禁止等寬字。** 等寬數字是工程製圖的語彙，不是織品的。要對齊數字用 `tabular-nums`，不要用 `monospace`。

字級階梯：`h1` `clamp(30px,5.2vw,52px)` ／ `h2` 19px ／ `h3` 15px ／ 內文 16px ／ 表格 14px ／ 註 12.5px。階梯只有五階——這個風格的層級靠**位置與框**，不靠字級。

---

## 四、版面與網格

- **同心框**（特徵 1）是骨架。內容全部在最內層。
- **零旋轉。** 這個風格沒有斜的東西（唯一的斜線是壓線的菱格與中心菱形本身，而它們是 45°，不是隨機角度）。
- **留白 = 大面積單色。** 阿米什被是滿版的，它的「呼吸」來自一整片沒有東西的靛藍，不是空白。所以：**不要留白底空隙，要留大色塊**。
- **subgrid 保證縫對齊**：一整列的卡片各自內容長短不同，但每一列的橫線必須落在同一高度。

```css
.reg{display:grid;grid-template-columns:repeat(auto-fill,minmax(196px,1fr));grid-auto-rows:auto}
.reg>article{grid-row:span 7;display:grid;grid-template-rows:subgrid}   /* 七條共用軌道 */
@supports not (grid-template-rows:subgrid){
  .reg>article{grid-row:auto;display:block}
  .reg>article>*{min-height:34px}        /* 退回固定列高，縫仍對齊 */
}
```

- RWD：`≤820px` 兩欄塌成一欄；`≤560px` 同心框的 padding 由 40/26/30 降為 22/14/16，角塊由 34px 降為 20px。框永遠不消失——框消失就沒有這個風格了。

---

## 五、元件配方

### 導覽（壓線密度 stitch-density）
四頁＝四塊等大的布。**現用頁那塊被壓滿**（密走羽毛渦卷），其餘只有稀疏的定位十字（大針疏縫）。語意是「它上面的工比別人多」。

```css
.nv{position:fixed;top:16px;right:16px;display:flex;border:1.5px solid var(--ink)}
.nv a{width:62px;height:62px;position:relative;background:var(--pin);border-right:1.5px solid var(--ink)}
.nv a[aria-current=page]{background:var(--win)}
@media(max-width:900px){.nv{position:static;margin-bottom:22px}.nv a{flex:1;height:52px}}
```
現用頁的密壓線（SVG，疊在布塊上）：
```html
<svg viewBox="0 0 62 62"><g fill="none" stroke="#C9BFA6" stroke-width=".9" stroke-dasharray="2.2 1.4" opacity=".9">
<path d="M2 5q7 -4 14 0t14 0t14 0t14 0"/><!-- …每 8px 一條，橫七條直七條… --></g></svg>
```

### 按鈕
```css
button{border:1.5px solid var(--ink);background:var(--win);color:var(--thr);
 padding:13px 10px;font-weight:700;letter-spacing:.12em;border-radius:0;
 transition:background 60ms steps(2)}
button:hover{background:var(--mus);color:var(--ink)}
```
**沒有陰影、沒有圓角、沒有 hover 位移。** 按鈕就是一塊被縫上去的布。

### 卡片
卡片不是浮起來的東西，是**格子裡的一格**。用共用邊框（`border-width:0 1.5px 1.5px 0` + 容器補左上）做出連續的縫網，卡片之間**沒有間隙**（`gap:0`）。

### 表單
```css
label{border:1.5px solid var(--ink);background:var(--thr);color:var(--ink);text-align:center;padding:8px}
input[type=radio]{position:absolute;opacity:0;width:0;height:0}
label:has(input:checked){background:var(--win);color:var(--thr)}
label:has(input:focus-visible){outline:3px solid var(--win);outline-offset:-3px}
label.off{background:#B8AF97;color:#6B6455;cursor:not-allowed}   /* 停用＝褪色的布 */
```
選中態用**換布**表達（整格換色），不要用打勾、不要用外光暈。

### Footer
最深的靛（`#12182C`），一圈 1.5px 縫份，內容是店務資訊三列。footer 是背布，不是裝飾。

---

## 六、動效規則

**全站唯一的 easing 是 `steps()` 與 `linear`。** 沒有 `ease`、沒有 `cubic-bezier`——**針是離散事件，沒有半針這種東西。** 這條紀律比任何一個具體動畫都重要。

| 種類 | 內容 | 觸發 | duration / easing |
|---|---|---|---|
| ambient 環境 | **曬被日影線**：一條 3px 實色亮線橫掃過整幅（`mix-blend-mode:screen; opacity:.10`） | 無 | 26s `linear` infinite |
| input 輸入 | 色塊 hover 沿縫份被挑起 2px；一疊裡的被 hover 抽出 14px 並吐出讀數 | hover/focus | 60–70ms `steps(2)`（延遲 <100ms） |
| transition 轉場 | **掀被**：內容以 `clip-path:inset()` 由下往上一列一列掀開 | 進頁 | 560ms `steps(9)`，每段 stagger 110ms |
| signature 簽名 | **換布不換線**：換布時新布沿縫份方向被推進去（`clip-path` 由 `inset(0 100% 0 0)` 到 `inset(0)`），而壓線層完全靜止不動 | 狀態改變 | 220ms `steps(6)` |

```css
@keyframes lift{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0)}}
.lift{animation:lift 560ms steps(9) both}
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}
.wipe.run{animation:wipe 220ms steps(6) both}
@keyframes air{from{transform:translateX(0)}to{transform:translateX(calc(100vw - 24px))}}

@media(prefers-reduced-motion:reduce){
 *,*::before,*::after{animation:none!important;transition:none!important}
 .lift{clip-path:none}          /* 內容直接是最終畫面 */
 .qborder::after{transform:translateX(38vw)}  /* 日影停在定點 */
}
```
四種降級後**資訊零損失**：掀被直接顯示完成態、換布直接換色、日影停住、hover 讀數常駐。

---

## 七、插畫與圖像風格

**零外部圖片。所有圖像由四種原語構成，且每一張都拆得出「哪一層是拼的、哪一層是壓的」。**

1. **色塊 patch**——單一素色的多邊形，只用正方、長方、等腰直角三角、菱形四種（手工拼布只裁得準這四種）。無描線、無漸層、無陰影。
2. **縫份 seam**——任兩塊相鄰處一條 1.5px 的 `--ink` 實線，且必須**連續穿過整幅**（拼縫是對齊的，不是隨機的）。
3. **壓線 stitch**——`stroke-dasharray` 虛線，四種紋樣，**跨過所有色塊與縫份**（見特徵 4）。
4. **十字繡署名**——5×7 格的十字繡數字，繡在右下角，記年份或姓名縮寫。

```js
// 十字繡數字：每一格畫一個 X
const G={'4':'10001 10001 10001 11111 00001 00001 00001', /* … */};
function cross(txt,u){let d='',w=0;for(const ch of txt){G[ch].split(' ').forEach((r,y)=>
  [...r].forEach((v,x)=>{if(v==='1'){const px=(w+x)*u,py=y*u;
    d+=`M${px} ${py}l${u} ${u}M${px+u} ${py}l${-u} ${u}`;}}));w+=6;}
 return `<path d="${d}" stroke="#141319" stroke-width="${u*0.34}" fill="none"/>`;}
```

**判準：拿掉全部顏色，仍讀得出哪一條是拼縫、哪一條是壓線。** 這兩種線在真實的被上是不同的東西——一個在布之間，一個在布之上。

**明文禁用**：細線幾何線描（thin-lineart）、半調網點、寫實描繪、`feTurbulence` 手抖邊、圓角、`stroke-linecap:round`。

---

## 八、Logo 與 Favicon

Logo 就是一幅縮到 60×68 的被：滾邊、外框、四個角塊、內框、中心菱形，加兩橫兩直的壓線跨過全部。**不要畫針、不要畫線軸、不要畫手**——這個風格的識別物就是被本身。

```html
<svg viewBox="0 0 60 68" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="68" fill="#43284C"/><rect x="3" y="3" width="54" height="62" fill="#1B2340" stroke="#141319" stroke-width="1.4"/>
<rect x="9" y="9" width="9" height="9" fill="#B0862A" stroke="#141319" stroke-width="1.2"/><!-- ×4 角 -->
<rect x="13" y="13" width="34" height="42" fill="#1F4A3C" stroke="#141319" stroke-width="1.2"/>
<path d="M30 17L44 34L30 51L16 34Z" fill="#6E2434" stroke="#141319" stroke-width="1.2"/>
<g fill="none" stroke="#C9BFA6" stroke-width="1.1" stroke-dasharray="3 1.8">
<path d="M0 26L60 26"/><path d="M0 42L60 42"/><path d="M22 0L22 68"/><path d="M38 0L38 68"/></g></svg>
```
Favicon 是同一幅退到 32×32：四個角塊各 6px、中心菱形、兩條壓線。**十六級以下不要畫壓線的虛線**（會糊成灰帶），改成兩條實線。

---

## 九、Do & Don't

**Do**
- 先把版面畫成同心框，再放內容
- 每兩塊顏色中間放一條 1.5px 炭線
- 讓一條線跨過全部的縫，而且讓它在狀態改變時**不動**
- 長文放在本色棉布上
- 用 `steps()`
- 對稱

**Don't**
- ❌ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ❌ 任何 `border-radius`、任何模糊 `box-shadow`、任何面積用的 `gradient`
- ❌ `#fff`、`#000`、粉彩、低飽和中灰
- ❌ 等寬字、emoji 當 icon、外部圖片
- ❌ `ease` / `cubic-bezier` / 淡入式滾動揭示 / 視差 / 數字滾動 / 跑馬燈
- ❌ 「EST. 19xx」徽章、Lorem ipsum、「在當今快節奏的世界」
- ❌ 把壓線畫成裝飾性的曲線——它必須跨過縫，否則它只是一條線
- ❌ 用「刻意的不對稱」製造活潑

---

## 十、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant-TW"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{--ind:#1B2340;--win:#6E2434;--pin:#1F4A3C;--aub:#43284C;--mus:#B0862A;
 --slt:#6F8794;--ink:#141319;--thr:#C9BFA6;--seam:1.5px}
*{box-sizing:border-box;margin:0;padding:0;border-radius:0}
body{background:var(--aub);color:var(--thr);padding:10px;
 font-family:"Noto Sans TC",sans-serif;line-height:1.72}
.qborder{background:var(--ind);border:var(--seam) solid var(--ink);padding:40px;position:relative;overflow:hidden}
.qborder::after{content:"";position:absolute;top:0;left:0;width:3px;height:100%;
 background:var(--thr);opacity:.1;mix-blend-mode:screen;animation:air 26s linear infinite}
.cb{position:absolute;width:34px;height:34px;background:var(--mus);border:var(--seam) solid var(--ink)}
.cb.a{left:5px;top:5px}.cb.b{right:5px;top:5px}.cb.c{left:5px;bottom:5px}.cb.d{right:5px;bottom:5px}
.qinner{background:var(--pin);border:var(--seam) solid var(--ink);padding:26px}
.qcenter{background:var(--ind);border:var(--seam) solid var(--ink);padding:30px}
.cloth{background:var(--thr);color:var(--ink);border:var(--seam) solid var(--ink);padding:22px 24px}
@keyframes air{to{transform:translateX(calc(100vw - 24px))}}
@keyframes lift{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0)}}
.lift{animation:lift 560ms steps(9) both}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.lift{clip-path:none}}
</style></head><body>
<nav class="nv"><!-- 四塊布，現用頁那塊被壓滿 --></nav>
<div class="qborder">
  <span class="cb a"></span><span class="cb b"></span><span class="cb c"></span><span class="cb d"></span>
  <div class="qinner"><div class="qcenter">
    <header><!-- logo + 店名 --></header>
    <section class="lift"><h2>標題</h2><div class="cloth"><p>長文一律在本色棉布上。</p></div></section>
    <footer><!-- 背布 --></footer>
  </div></div>
</div></body></html>
```

---

## 十一、技術實作與相容性

本站的視覺由三項技術承載。以下為 **2026-09-05 查證** 的支援現況、fallback 具體行為與效能實測值。

### (1) CSS Grid `subgrid`（C 版面與樣式層）
**承載**：特徵 1 的「縫必須對齊」。被籍頁二十四張卡片內容長短不一，`grid-template-rows: subgrid` 讓每張卡片繼承外層的七條 row track，於是**每一列的橫線都落在同一高度**——這件事巢狀 grid 做不到（子格會自建軌道），手調 `min-height` 也只是碰巧對上。

**支援現況**（查證來源：MDN《Subgrid》、caniuse `css-subgrid`、web.dev《CSS subgrid》）：Firefox 71（2019-12）最早、Safari 16.0（2022-09）、Chrome/Edge 117（2023-09-12）。三引擎到齊後於 **2023-09-15 成為 Baseline Newly available**，並於 **2026-03-15 升為 Baseline Widely available**；全球支援 >92%。

**Fallback**：`@supports not (grid-template-rows: subgrid)` 時卡片改為 `display:block` 並對每一列指定 `min-height`（本站為 34px／`.nm` 38px）。縫仍對齊，只是不再自動跟隨內容長度。**資訊零損失。**

### (2) SVG filter `feTurbulence` + `feDiffuseLighting` + `feMorphology`（A 渲染層）
**承載**：特徵 2 的布面平織紋理（沒有它，色塊只是 De Stijl 的色面，不是布），以及特徵 4 的壓線浮凸——`feMorphology dilate` 把針腳外擴成一道脊，`feGaussianBlur` 給它斷面，`feDiffuseLighting` 用一盞**固定**的平行光（azimuth 128 / elevation 38）打出真實被子上壓線凹、棉花凸的高低差。

**支援現況**（查證來源：MDN《feDiffuseLighting》《feTurbulence》《feMorphology》）：`feDiffuseLighting` 為 **Baseline Widely available，2015-07 起跨瀏覽器**；`feTurbulence`、`feMorphology`、`feDistantLight` 同屬 SVG 1.1 Filter Effects，同期到位，現行瀏覽器全支援。

**兩條效能紀律（本站的可行性落點）**
- 布紋只以 **64px 循環貼圖**的形式存在（`background-image` + `background-blend-mode:overlay`），由瀏覽器光柵化一次後重複貼；**絕不對整頁即時套 filter**。`stitchTiles='stitch'` 保證磚間無縫。
- 浮凸 filter 只套在**壓線那一層**，而壓線層是全站唯一**永不改變**的圖層（見簽名動效）——它從不需要重新光柵化。這是「不變層」在效能上的紅利。

**Fallback**：濾鏡不支援時整個 `filter` 被忽略，色塊與壓線仍完整可見，只是少了織紋與浮凸。**資訊零損失。**

### (3) `steps()` 離散時間函數作為全站唯一 easing（B 動效與時間軸層）
**承載**：全部四種動效。`steps(9)` 的掀被、`steps(6)` 的換布、`steps(2)` 的 hover——一針就是一針，中間沒有東西。這不只是選一個 timing function，而是一條寫死的紀律：**本站的 CSS 裡不出現任何 `ease` 或 `cubic-bezier`。**

**支援現況**：`steps()` 屬 CSS Easing Functions Level 1，自 2015 年起全瀏覽器支援，無支援缺口。

**效能實測**（Node 22 / 2026-09-05）
| 項目 | 值 | 預算 |
|---|---|---|
| 最大單頁（`bei.html`，含 inline CSS/JS 與 24 張 SVG） | **71.7 KB** | ≤350 KB ✔ |
| `bu.html`（含修補引擎與兩幅可變 SVG） | **58.2 KB** | ≤350 KB ✔ |
| 首屏 JS：`render()` 一次完整重繪（含四條規矩驗算） | **< 1 ms** | ≤100 ms ✔ |
| 修補引擎窮舉 3,240 種組合 | **12 ms** | — |
| 動畫 | 僅動 `transform` 與 `clip-path`，零 `getBoundingClientRect`，不觸發 layout | 60fps ✔ |

**其他相容性註記**
- `:has()`（用於 `label:has(input:checked)`）為 Baseline 2023；不支援時選中態退回瀏覽器預設的 radio 外觀，狀態仍可讀。
- `mix-blend-mode:screen`（曬被日影線）為 Baseline Widely available；不支援時亮線退為半透明實色，仍是一條掃過的線。
- `localStorage` 用於跨頁保存訪客修過的那床被，全程包在 `try/catch`；不可用時介面明說「這個瀏覽器不讓我記住」，其餘功能不受影響。
- 全站**零外部圖片、零音檔**；外部資源僅 Google Fonts。

---

*本規格書描述的是風格，不綁定產業。demo 站用的是一家彰化和美的手工棉被行，但同一套規則放在美術館、事務所、學校或任何需要「規矩、對稱、耐用」氣質的地方都成立——把中心菱形換成你的主視覺區塊，把七處傷換成你的核心功能，其餘照抄。*
