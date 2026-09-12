---
name: post-punk-factory
description: The post-punk graphic language of Factory Records and Peter Saville — catalogue numbers on everything, 45-degree hazard chevrons from Ben Kelly's FAC 51 interior, withheld product names, a fixed palette that doubles as an alphabet, and a Didone display face colliding with a letterspaced industrial grotesque on bare concrete.
---

# 後龐克 Factory Records／Peter Saville 風格規格書

> 本規格書描述的是 **1978–1992 年曼徹斯特 Factory Records 的平面語言**，
> 主要作者為 Peter Saville（唱片封套與識別）與 Ben Kelly（FAÇ 51 The Haçienda 室內）。
> 它不是「瑞士國際主義的深色版」，也不是「極簡」——它的三個支柱是
> **編號、扣住資訊、與市政工程的標示語彙**。

---

## 一、設計哲學

**目錄編號先於名字。** Factory 替每一樣東西發一個 FAC 編號：唱片、海報、俱樂部（FAÇ 51 The Haçienda）、
訴訟、貓、以及 Tony Wilson 的墓碑（FAC 501）。編號制度不是資料管理，它是一種主張——
**被編號的東西就進入了目錄，不論它能不能被賣。** 做這個風格的網站，第一件事就是決定
「這個品牌替什麼東西編號」，而且答案不能只有商品。

**不推銷。** 這個流派的封套上經常沒有樂團名、沒有唱片名，只有一個編號與一張與內容無關的圖。
版面的工作是**公告**，不是**說服**。因此：沒有「立即購買」按鈕群、沒有見證、沒有價值主張大標、
沒有三張置中卡片。首屏是一面資訊板，不是一份提案。

**畫面上的東西是市政設施，不是裝飾。** Ben Kelly 把 Haçienda 做成一座公共工程：
柱子上漆 45° 黃黑斜紋、地上嵌貓眼道釘與擋車柱、藍灰冷調的牆。這些不是「工業風」的擺設，
它們是**有功能語意的標示系統**——黃黑＝當心、藍＝方向、紅＝停止。用這個風格時，
每一個顏色都必須先有一個工務上的職務，才准出現在畫面上。

**古典是被挪用的，不是被致敬的。** Saville 把 Fantin-Latour 一八九〇年的花卉油畫放上 New Order 的封套，
不解釋、不加字。做網頁時對應的動作是：讓一個 Didone 襯線大字或一段古典排版，
毫無過渡地壓在混凝土與警示斜紋上，兩者不融合、不加圓角、不加陰影，就那樣並置。

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，畫面就不再是這個流派。每一項附可直接複製的片段。

### 特徵 1　編號統治一切（catalogue number on everything）

每一個區塊、每一頁、每一件物品都有編號，而且**編號排得比它的名字更顯眼**。
編號用工業無襯線大寫、tabular-nums、字距 0.06–0.1em。編號的前綴是品牌本身（`FAC`／`SAI`／自訂三字母）。
**關鍵紀律：連不是商品的東西也要編號**（一則規定、一種氣味、一段回聲、正在讀這一頁的人）。

```css
.num{
  font-family:"Archivo",Helvetica,Arial,sans-serif;
  font-weight:700; font-variant-numeric:tabular-nums;
  letter-spacing:.06em;
}
.card .big{                 /* 編號比品名大一個量級 */
  font-family:"Archivo",sans-serif; font-weight:700;
  font-size:clamp(34px,7vw,64px); line-height:1; letter-spacing:.06em;
}
.card .name{ font-size:19px; font-weight:700; }   /* 品名 */
```

```html
<div class="card">
  <div class="tiny">西岸公共泳池　號碼簿　第 31 筆</div>
  <div class="big">SAI 309b</div>
  <div class="name">你（正在讀這一頁的人）</div>
</div>
```

### 特徵 2　45° 黃黑警示斜紋與市政語彙

出自 Ben Kelly 的 FAÇ 51 室內。斜紋**必須是 45°、等寬、硬邊、黃黑兩色**，
以整條帶狀出現在版面的結構位置（頁首、章節分隔、頁尾之前），不是點綴的小徽章。
同一組語彙還包括：擋車柱色塊、道釘圓點、路面漆的粗直線。**全站零圓角、零模糊陰影。**

```css
:root{
  --yel:#F0C21C; --ink:#14161A;
  --hz:repeating-linear-gradient(45deg,var(--yel) 0 17px,var(--ink) 17px 34px);
}
.hz{height:14px;background:var(--hz)}
.hz.tall{height:26px}          /* 頁首那一條 */
*{border-radius:0}             /* 這一行是規格的一部分，不是保守 */
```

投影一律用實心位移色塊，不准用 `box-shadow` 的模糊：

```css
.stud{box-shadow:5px 5px 0 var(--ink)}    /* 可以 */
/* .stud{box-shadow:0 8px 24px rgba(0,0,0,.2)} 這一行會把風格關掉 */
```

### 特徵 3　資訊被扣住（withheld identity）

品牌名不是主角。首屏不出現「我們提供什麼」，只出現「現在是什麼狀況」。
做法：把**標籤（label）排大、把名字排小**；把說明文字降到 13–14px 並放進白面板；
導覽與標題可以先以編碼／代號出現，明文放在它下面一行的小字裡。

```css
.tiny{                         /* 標籤：小、全大寫、字距極寬 */
  font-size:12px; letter-spacing:.2em; text-transform:uppercase;
  font-family:"Archivo",sans-serif; font-weight:600;
}
.sign{font-weight:700;letter-spacing:.3em;text-transform:uppercase}
h2{font-size:clamp(20px,2.6vw,27px);letter-spacing:.2em}   /* 標題靠字距不靠字級 */
```

**禁止**：hero 大標＋副標＋兩顆按鈕、「開始使用」、「了解更多」、任何形容自己的形容詞。

### 特徵 4　色票即字母表（a palette that is also an alphabet）

Saville 為 New Order 的封套自製過一套色碼字母（*Blue Monday* 與 *Power, Corruption & Lies*，1983），
並把解碼表印在封底當成一個物件。這個風格的色彩紀律因此是**封閉的**：
**顏色的數量是固定的、每個顏色都有一個身分，畫面上不准出現不屬於這套系統的顏色。**

做法：定六色（或更少），把它們排成一張表印在頁面上，讓顏色可以拼字。
（下面是本站自訂的六色配對碼；請自行設計自己的，不要沿用任何既有商標上的色碼。）

```css
:root{
  --k:#14161A;  /* 墨　纜繩、文字、每一道邊界 */
  --b:#0B6FA4;  /* 藍　水、連結、被選中的事 */
  --y:#F0C21C;  /* 黃　警示斜紋、現用態 */
  --w:#F4F4F1;  /* 白　紙——所有長文印在白面板上 */
  --r:#D6351E;  /* 紅　拒絕、退件 */
  --g:#12775C;  /* 綠　次要標記 */
  --con:#9B9E99;/* 混凝土：地，不是顏色 */
}
```

```html
<!-- 兩顆圓＝一個字元：第一顆是組，第二顆是組內序 -->
<svg viewBox="0 0 64 34" width="64" height="34" role="img" aria-label="色碼：D">
  <line x1="0" y1="17" x2="64" y2="17" stroke="#14161A" stroke-width="2.4"/>
  <circle cx="18" cy="17" r="9" fill="#F0C21C" stroke="#14161A" stroke-width="1"/>
  <circle cx="42" cy="17" r="9" fill="#0B6FA4" stroke="#14161A" stroke-width="1"/>
</svg>
```

### 特徵 5　Didone 襯線與工業無襯線的對撞

兩個家族，沒有第三個。古典襯線（Bodoni／Didot／Baskerville 一類）只給**被挪用的那一層**——
大字、引文、年份；工業無襯線（Archivo／Helvetica／Univers 一類）大寫加寬字距，
給**全部的標籤、編號與導覽**。兩者永遠並置、永遠不混排在同一行、不加漸變。

```css
.cls{font-family:"Bodoni Moda",Didot,Georgia,serif;font-weight:400;letter-spacing:.01em}
.lat{font-family:"Archivo",Helvetica,sans-serif;font-weight:600;
     letter-spacing:.16em;text-transform:uppercase}
```

---

## 三、色彩系統

| 色 | Hex | 用途 | 面積比 |
|---|---|---|---|
| 混凝土 | `#9B9E99` | 全站地色。**零質感、零紋理、零漸層、零暈影** | ~38% |
| 深混凝土 | `#7E827D` | 池體、導覽列、二階地色 | ~9% |
| 淺混凝土 | `#B0B3AE` | 磁磚、未選中的控制項 | ~7% |
| 墨 | `#14161A` | 纜繩、全部文字、每一道邊界、刊頭與頁尾 | ~15% |
| 警示黃 | `#F0C21C` | 45° 斜紋、現用態、此刻正在發生的事 | ~11% |
| 池藍 | `#0B6FA4` | 水、連結、被選中的事 | ~10% |
| 白 | `#F4F4F1` | 紙——**所有長文一律印在白面板上**，不印在混凝土上 | ~8% |
| 救生紅 | `#D6351E` | 拒絕、退件、警告。**≤2%** | ≤2% |
| 藻綠 | `#12775C` | 次要標記。**≤2%** | ≤2% |

**硬規則**

1. 顏色的總數是固定的，畫面上不准出現第十個顏色。要新增顏色，就得先把它加進色碼表。
2. 混凝土是「地」，不是「顏色」——它不參與編碼，也不當強調色。
3. 黃只給「此刻」與「當心」；藍只給「水與去處」；紅只給「不行」。顏色不准當裝飾用。
4. 對比：墨字在混凝土上 6.5:1、在白面板上 16:1；長文一律走白面板那條路。
5. **禁止**紫藍漸層、任何 `linear-gradient` 的柔和過渡。允許的「漸層」只有硬邊重複圖樣
   （`repeating-linear-gradient` 的斜紋與磁磚溝縫），因為那是網版而不是漸層。

---

## 四、字體系統

| 角色 | 字族 | 字重／字距 |
|---|---|---|
| 標籤・編號・導覽・按鈕 | **Archivo**（或 Helvetica／Univers／Inter） | 600–700／`letter-spacing:.16–.3em`／全大寫 |
| 被挪用的古典層 | **Bodoni Moda**（或 Didot／Playfair） | 400／`letter-spacing:.01em`／不大寫 |
| 中文正文與標題 | **Noto Sans TC** | 400／500／700 |

字級 scale（1180px 容器）：

```
h1  clamp(26px,4.4vw,44px)   letter-spacing .12em
h2  clamp(20px,2.6vw,27px)   letter-spacing .20em
h3  16px                     letter-spacing .22em
正文 16px / line-height 1.78
lede 18px / line-height 1.85
標籤 12px / letter-spacing .20em / uppercase
說明 13–13.5px / line-height 1.9
```

紀律：**標題靠字距與大寫取得份量，不靠字級**。中文標題 `letter-spacing:.12–.34em`，
這是市政告示牌的間距，也是本流派中文化的關鍵——沒有這個字距，中文標題會立刻變回一般網站。

---

## 五、版面與網格

- 容器 `max-width:1180px`，左右 padding 22px（≤560px 收為 14px）。
- **一張網格統治全站**：表格化的清單一律用 CSS Grid + `subgrid`，讓每一列在各自獨立的
  子格線裡仍對齊到同一組欄線（見第十二章）。
- 分隔一律用 **3px 實心墨線**（`.rule{height:3px;background:var(--ink)}`）或警示斜紋帶，
  不用細灰線、不用留白分隔。
- 面板 `border-top:5–6px solid var(--ink)`，其餘三邊不描邊——這是 Factory 封套上那條「壓在頂端的粗規線」。
- 不對稱：刊頭左側是名稱、右側 `margin-left:auto` 推出去的營業資訊；
  版面裡不要出現三等分的卡片列。內容欄用 `repeat(auto-fit,minmax(268px,1fr))`，
  讓欄數由內容決定而不是由設計決定。
- 留白：中疏。混凝土地色本身就是留白，不需要再加大 padding。

---

## 六、元件配方

**導覽（rope-deploy／可替換為任何「展開 vs 收捲」語意）**

```css
.lane{flex:1 1 0;display:flex;align-items:center;gap:12px;padding:12px 14px;
      border-right:2px solid var(--ink);background:var(--con-d);
      color:var(--ink);text-decoration:none}
.lane[aria-current="page"]{background:var(--wht)}   /* 現用態＝被拉開的那一條 */
.lane:hover{background:var(--con-l)}
```
現用態**不要用底線或色點標示**；讓它換一個狀態（被拉開／被取出／被翻正）。

**按鈕**

```css
button{font-family:"Archivo",sans-serif;font-weight:700;letter-spacing:.2em;
  font-size:14px;text-transform:uppercase;
  background:var(--ink);color:var(--yel);border:0;padding:14px 26px}
button:hover{background:var(--blu);color:var(--wht)}
button.alt{background:var(--con-l);color:var(--ink);border:2px solid var(--ink)}
```
按鈕是**方角實心色塊**，永遠不圓角、不描邊發光、不加陰影。

**卡片／面板**

```css
.pane{background:var(--wht);padding:26px 26px 30px;border-top:6px solid var(--ink)}
.pane.blu{background:var(--blu);color:var(--wht);border-top-color:var(--yel)}
.pane.ink{background:var(--ink);color:var(--wht)}
```

**表單**

```css
input[type=text]{font-size:15px;padding:9px 11px;border:2px solid var(--ink);
  background:var(--wht);width:100%;max-width:420px;border-radius:0}
.opt input{position:absolute;opacity:0;width:100%;height:100%;left:0;top:0}
.opt span{display:block;border:2px solid var(--ink);padding:8px 13px;background:var(--con-l)}
.opt input:checked+span{background:var(--yel);font-weight:700}
```
選中態＝**整塊變黃**，不是加邊框、不是打勾。

**頁尾**：墨底、黃色小標題、四欄資訊（時間／價格／人／頁面），末尾一段 12px 的灰色細字。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 本站做法 | 參數 |
|---|---|---|
| **ambient 環境** | 浮球隨水面起伏（每組相位不同）＋水面一條硬邊亮帶橫向掃過 | `bob 3.4s ease-in-out infinite`，`animation-delay:calc(var(--p)*-.26s)`；亮帶 `swell 15s linear infinite` |
| **input 輸入** | 游標／Tab 停在一組浮球上，該組上方 80ms 內浮出它的字元 | `transition:opacity .08s linear` |
| **transition 轉場** | 「放水」：進頁時內容以 `clip-path:inset()` 由下而上填滿 | `fill .56s cubic-bezier(.3,.9,.35,1)` |
| **signature 簽名** | **穿繩排字**：字是一顆一顆浮球從錨點滑進來穿成的 | `thread .44s cubic-bezier(.22,.86,.3,1)`，`animation-delay:calc(var(--i)*36ms)` |

```css
@keyframes bob{0%,100%{transform:translateY(-1.5px)}50%{transform:translateY(1.9px)}}
@keyframes thread{
  from{transform:translateX(calc((var(--i) + 5) * -24px))}
  to{transform:translateX(0)}
}
@keyframes fill{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0 0 0 0)}}
```

**分層是必要的**：起伏掛在 `<g class="ch">`（translateY），穿繩掛在 `<circle class="d">`（translateX），
兩個動畫因此不會互相覆寫 `transform`。

**降級（四種都要有，資訊零損失）**

```css
@media(prefers-reduced-motion:reduce){
  .rope .ch,.rope.threading .d,.water::before,main{animation:none!important}
  main{clip-path:none}
  .rope .cl{transition:none}
}
```
降級後：浮球靜止（顏色不變、字元照樣可讀）、字元標籤瞬間出現、內容直接是最終畫面、
穿繩結果一次到位。**沒有任何一項資訊只存在於動畫裡。**

**明文禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈／ticker、按壓硬陰影彈跳、
`stroke-dashoffset` 描線。這個流派的東西是**掛上去**與**漆上去**的，不是畫出來的。

---

## 八、插畫與圖像風格：`disc-string` 浮球串構成

全站零外部圖片。所有圖像只由四種原語構成：

1. **浮球**＝實心圓，`r` 固定，只有六種顏色，`stroke:var(--ink);stroke-width:1`。
2. **纜繩**＝2.4px 墨色直線，兩端各一枚 3.6px 的錨點圓。
3. **磁磚格**＝正方格與 3px 溝縫，只有兩種明度。
4. **警示斜紋**＝45° 等寬黃黑帶。

判準：**拿掉全部文字，仍讀得出「這一段繩上有幾顆球、依序是什麼顏色」。**
圖像不承載外形（沒有一張圖在描繪一個東西的樣子），它承載的是**順序**。

```js
// 一條繩的幾何：兩顆一個字元，字元內距 17，字元間距 +13，空格 16
const PAIR=17, GAP=13, SP=16, R=7.6, CY=27;
let x=13;
for (const ch of str.toUpperCase()){
  if (ch===' '){ x+=SP; continue; }
  const [a,b] = pairOf(ch);           // 兩個顏色代號
  draw(x,   CY, R, a);
  draw(x+PAIR, CY, R, b);
  x += PAIR+GAP;
}
```

**禁用**：細線幾何線描、半調網點、`feTurbulence` 手抖濾鏡、寫實描繪、任何 emoji、任何圓角矩形圖示。

---

## 九、Logo 與 Favicon

**Logo**：一條纜繩，穿上品牌代號的色碼浮球（三個字元＝六顆），
上方一條墨色實心帶、下方是品牌全名的無襯線大寫加寬字距。
沒有圖形符號、沒有字體變形、沒有徽章外框、**沒有「EST. 19xx」**。

**Favicon**（原創 inline SVG data URI，寫在 `<head>`）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%239B9E99'/%3E%3Cline x1='0' y1='16' x2='32' y2='16' stroke='%2314161A' stroke-width='3'/%3E%3Ccircle cx='7' cy='16' r='5' fill='%23F0C21C' stroke='%2314161A' stroke-width='1.5'/%3E%3Ccircle cx='18' cy='16' r='5' fill='%230B6FA4' stroke='%2314161A' stroke-width='1.5'/%3E%3Ccircle cx='28' cy='16' r='4' fill='%23D6351E' stroke='%2314161A' stroke-width='1.5'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定「這個品牌替什麼東西編號」，而且答案要包含不能被賣的東西。
- 讓現用態換一個**狀態**（被拉開／被取出／被翻正／整塊變黃），不要加高亮框。
- 把長文放進白面板；混凝土上只放標籤、編號與圖。
- 45° 斜紋帶當結構線用，橫貫整個版面寬度。
- 把色碼表當成頁面上的一個真物件印出來，讓讀者可以查。
- 文案寫成市政公告：短句、句號、具體數字、不解釋動機。

**Don't**

- ❌ 不要紫藍漸層 hero、不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。
- ❌ 不要圓角、不要模糊陰影、不要毛玻璃當裝飾（水的色偏是功能，不是玻璃感）。
- ❌ 不要 emoji 當圖示，圖示一律自繪 SVG，且只能由本規格的四種原語組成。
- ❌ 不要 Lorem ipsum、不要「在當今快節奏的世界」、不要形容自己的形容詞。
- ❌ 不要「EST. 19xx」徽章、不要「把 X 變成 Y」的標題模板。
- ❌ 不要第三個字體家族、不要第十個顏色。
- ❌ 不要跑馬燈。這個流派的資訊是**掛著不動**的。
- ❌ 不要把古典襯線拿去排 UI 標籤，也不要把工業無襯線拿去排引文。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Bodoni+Moda:opsz,wght@6..96,400;6..96,700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
<style>/* 全部 CSS inline */</style>
</head><body>

<div class="hz tall"></div>                     <!-- 45° 警示斜紋，頁首第一件事 -->

<header class="mast"><div class="wrap">
  <div><div class="name">品牌中文名</div>
       <div class="en lat">BRAND NAME　·　三字母代號</div></div>
  <div class="meta">地址　·　<b>電話</b><br>規格　·　啟用年<br>
       <span class="lat">一句沒有形容詞的公告</span></div>
</div></header>

<nav class="navrail"><div class="wrap">
  <a class="lane" href="./a.html" aria-current="page"><!-- 展開態 -->…</a>
  <a class="lane" href="./b.html"><!-- 收捲態 -->…</a>
</div></nav>

<main class="wrap">
  <section>
    <div class="rule"></div>
    <h2>章節　SECTION</h2>
    <div class="cols">
      <div class="pane">…長文放這裡…</div>
      <div class="pane blu">…</div>
    </div>
  </section>

  <section>
    <div class="book">                          <!-- subgrid 清單 -->
      <div class="brow head"><div>號</div><div>圖</div><div>品名</div><div>存續</div><div>報的人</div></div>
      <div class="brow"><div class="bnum">SAI 390</div><div>…</div><div class="bnm">池體本身</div>
           <div class="bty">比這棟建築久</div><div class="bdt">管理員</div></div>
    </div>
  </section>
</main>

<div class="hz"></div>
<footer><div class="wrap">…四欄資訊＋12px 灰色細字…</div></footer>
</body></html>
```

---

## 十二、技術實作與相容性

三項核心技術，分屬渲染（A）／版面（C）／資料（E）三層。所有支援度於 **2026-08-28** 查證。

### 1　CSS `subgrid`（C 版面與樣式層）——承載「一張網格統治全站」

號碼簿的每一列都是一個獨立的子格線容器，但欄寬必須由**整張表**共同決定：
`max-content` 的欄（號碼欄、繩圖欄）要量的是所有列裡最寬的那一個。
沒有 subgrid，每一列會各自算自己的 `max-content`，欄線就對不齊。

```css
.book{display:grid;
  grid-template-columns:max-content max-content minmax(0,1fr) max-content max-content}
.brow{grid-column:1/-1;display:grid;grid-template-columns:subgrid}
```

- **支援現況**：Baseline **Widely available**（2026-03-15 起）。Firefox 71+（2019）、Safari 16+（2022）、
  Chrome/Edge 117+（2023-09-12）、Opera 103+、Samsung Internet 24+，全球覆蓋 >92%。
  查證來源：[web-features explorer / Subgrid](https://web-platform-dx.github.io/web-features-explorer/features/subgrid/)、
  [web.dev《CSS subgrid》](https://web.dev/articles/css-subgrid)。
- **Fallback**：

```css
@supports not (grid-template-columns:subgrid){
  .book{display:block}
  .brow{display:grid;grid-template-columns:118px 196px minmax(0,1fr) 104px 118px}
}
```
  退為固定像素欄寬，欄線仍然對齊，**資訊零損失**，只是欄寬不再隨內容量測。

### 2　`backdrop-filter`（A 渲染層）——承載「水改變它底下每一樣東西的顏色」

池面的圖層順序是：磁磚 → **水** → 浮球。水層以 `backdrop-filter` 就地改變**它下面**的磁磚顏色，
而浮球畫在水的上面、顏色不被改動。這件事沒有第二種做法：
要嘛複製一份內容再套 `filter`（DOM 重複、選取與朗讀都會出錯），要嘛就是 `backdrop-filter`。
**這也是本風格的一條規則：色碼掛在水面上，不掛在水裡——因為水會改掉顏色，而顏色就是字。**

```css
.water{position:absolute;inset:0;z-index:1;
  background:rgba(11,111,164,.20);
  -webkit-backdrop-filter:saturate(1.55) hue-rotate(-14deg) brightness(1.05);
  backdrop-filter:saturate(1.55) hue-rotate(-14deg) brightness(1.05)}
```

- **支援現況**：Baseline **Newly available**（2024-09-16 起三引擎齊備）。Chrome 76+（2019-07）、
  Edge 79+、Firefox 103+（2022-07）、Safari 18+／iOS 18+（2024-09；更早的 Safari 需 `-webkit-` 前綴，
  故兩個宣告都要寫）。預計 2027-03 進入 Widely available。
  查證來源：[web-features explorer / backdrop-filter](https://web-platform-dx.github.io/web-features-explorer/features/backdrop-filter/)、
  [caniuse: css-backdrop-filter](https://caniuse.com/css-backdrop-filter)、
  [MDN: backdrop-filter](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter)。
- **Fallback**：`.water` 本身有 `background:rgba(11,111,164,.20)` 的實色半透明底，
  不支援時池面仍是一塊藍水、磁磚仍在其下、浮球仍在其上，**資訊零損失**，只是水不再改色。
- **效能注意**：`backdrop-filter` 會建立新的合成層。**只對一個元素用一次**（本站只有池面那一塊），
  不要對捲動中的列表或每張卡片各套一次，否則每幀都要重新取樣背景。

### 3　`Intl.DateTimeFormat` / `Intl.RelativeTimeFormat` ＋ 真實時刻（E 資料與生成層）

這面板子必須「現在是對的」：場次表哪一列是黃的、第一水道的繩上掛哪一句、
下一次換場還有多久，全部由使用者裝置的時鐘決定（每 30 秒重算一次）。
時間字串一律交給 `Intl`，不自寫拼接——否則 12/24 小時制與語系一換就錯。

```js
function rel(ms){
  const mins = Math.round(ms/60000);
  try{
    const f = new Intl.RelativeTimeFormat("zh-Hant",{numeric:"auto"});
    return Math.abs(mins)>=120 ? f.format(Math.round(mins/60),"hour")
                               : f.format(mins,"minute");
  }catch(e){ return mins+" 分鐘後"; }          // fallback
}
new Intl.DateTimeFormat("zh-Hant",{hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(d);
```

- **支援現況**：`Intl.RelativeTimeFormat` 為 Baseline **Widely available**，2020-09 起跨瀏覽器；
  `Intl.DateTimeFormat` 更早。查證來源：
  [MDN: Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)。
- **Fallback**：整段包在 `try/catch`，失敗時退回 `"N 分鐘後"` 與 `HH:MM` 手寫格式。
- **無 JavaScript 時**：場次表、票價、規定、對照表、號碼簿三十筆全部是靜態 HTML，
  第一水道的繩以靜態 SVG 掛著預設字串，頁面上明寫「本行會在載入後改成你此刻的時間」。

### 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| `index.html`（含全部 inline CSS/JS/SVG） | **53.8 KB** | ≤350 KB ✔ |
| `code.html` | 62.4 KB | ✔ |
| `book.html`（含 32 條靜態繩、368 顆浮球） | 110.2 KB | ✔ |
| `apply.html` | 44.9 KB | ✔ |
| 首屏 JS：`DOMContentLoaded` 只跑 `hung()` 與一次 `tick()` | 一次 `tick()` ＝ 一次 `new Date()`、一次 `Intl` 格式化、8 個 class toggle | ≤100ms ✔ |
| 繩的建構成本（Node 22 單執行緒，非瀏覽器） | 每條 13 字元的繩 **0.0039 ms**（20,000 次 78.1ms） | — |
| 動畫 | 只動 `transform` 與 `opacity`，不觸發 layout；`book.html` 的 368 顆浮球以 `.book .rope .ch{animation:none}` 明文停用起伏（號碼簿上的繩是印的，不會晃） | 60fps ✔ |

外部資源只有 Google Fonts 三個字族。零外部圖片、零外部指令碼、零音檔。

---

*規格書版本 1.0　·　2026-08-28　·　由 Claude Opus 5 依 Design Skills Center PLAYBOOK §2.7 撰寫。*
*風格研究對象為 Factory Records（曼徹斯特，1978–1992）之平面語言與 FAÇ 51 The Haçienda 的室內標示語彙；
本規格書中的六色配對碼為示範用之自訂系統，並非任何既有商標或唱片封面上的色碼。*
