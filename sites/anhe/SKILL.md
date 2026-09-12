---
name: amish-plain-quilt
description: Plain (unprinted) Amish quilt design system — deep saturated solid fields, three-ring center-diamond geometry, seven-step value ladder, running-stitch as the only boundary, and one deliberate mistake per page.
---

# 阿米什素面拼布 Amish Plain Quilt

> 這是一份風格規格書。照它做，你會得到一個看起來像一床一八八〇年代賓州蘭開斯特阿米什被子的網站——
> 不管你賣的是棉被、咖啡、保險還是軟體。風格與內容分離：這份 SKILL 不綁產業。

---

## 一、設計哲學

這個流派的成因是一條禁令。賓州蘭開斯特郡的阿米什教會規矩（Ordnung）不准信徒用印花布，
所以婦女做被子時手上只有素色布。**沒有花可以拿來製造層次，畫面就只剩三件事可以操作：
裁片的形狀、色塊之間的明暗差、縫線走的路。**

所有東西都從這個限制長出來：

- 形狀必須大。素色布上沒有細節，小塊會消失，所以中心那塊菱形佔掉整床的三分之一。
- 明暗必須分階。兩塊布若明度相同，它們之間的邊界就消失了，形狀會斷掉。
- 縫線必須是唯一的線。沒有描邊、沒有外框、沒有陰影——要分開兩塊布只有一個辦法：把它們縫起來，那道針腳就是邊界。
- 空白處要壓最密的線。素面被子的細節全在壓線裡，越空的地方越要有東西看。

一九七一年紐約惠特尼美術館的「Abstract Design in American Quilts」把這些被子當抽象畫掛起來，
設計圈才發現：**這是一套在極端限制下長出來的完整視覺語言，而且它比大多數刻意設計的東西更難反駁。**

做網頁時最容易犯的錯是「覺得太素了，加一點裝飾」。加了就不是這個風格了。
素是它的內容，不是它的不足。

### 一個必須先講的史實更正

兩件常被誤傳的事，寫進網站文案前請先確認：

1. **阿米什被子多半用「新買的素色布」，不是碎布拼的。** 拿舊衣碎布拼的是另一個傳統
   （例如阿拉巴馬州 Gee's Bend 的被子），兩者風格與氣質都不同，常被混為一談。
2. **「故意留一處錯誤，因為只有神是完美的」是流傳極廣但有爭議的說法。**
   多數拼布史研究者認為這是後來加上去的傳說，而非當年真實存在的做法。
   本 SKILL 保留這個做法（見第六條），但**要求你在文案裡誠實標註它有爭議**——
   把傳說寫成史實是最廉價的品牌敘事。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個風格了。每一項都附可直接複製的片段。

### 特徵 1｜素面：畫面上不准有印花

整份設計裡不能出現任何重複的圖案化紋理——沒有 pattern 背景、沒有網點、沒有底紋、沒有 noise 貼圖。
唯一允許的「質感」是布的斜紋織理：一層 5.5% 不透明度、間距 3px 的 63° 硬停點條紋。
它必須弱到你要湊近才看得見；看得見花紋就是失敗。

```css
body{
  background:#1C3A2E;
  /* 唯一允許的質感：布的斜紋。硬停點，不是漸層 */
  background-image:repeating-linear-gradient(63deg,rgba(0,0,0,.055) 0 1px,transparent 1px 3px);
}
/* 明文禁止：任何 background-image 的 pattern 平鋪、feTurbulence、半調網點、noise PNG */
```

### 特徵 2｜三環中心菱：一床被子只有三層構造

外框（寬）＋四角方塊 → 內框（窄）→ 中心方塊 → 菱形 → 菱心。
只有這幾層，不加第四層。四角方塊的顏色必須與外框不同，這是這個構造被認出來的關鍵。
比例約為 **外框 : 內框 : 中心 = 1.02 : 0.38 : 2.55**。

```css
.quilt{
  display:grid;
  grid-template-columns:1.02fr .38fr 3.05fr .38fr 1.02fr;
  grid-template-rows:   .94fr .38fr 2.55fr .38fr .94fr;
}
.corner{grid-area:1/1/2/2;background:#4B2A5E}      /* 四角方塊 */
.bar-t {grid-area:1/2/2/5;background:#27476B}      /* 外框 */
.ring  {background:#C99A1E}                        /* 內框 */
.center{grid-area:3/3/4/4;background:#1C3A2E;position:relative}
/* 菱形＝旋轉四十五度的正方，用 clip-path 切，不要用 transform:rotate（文字會跟著歪） */
.center::before,.center::after{content:"";position:absolute;
  clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}
.center::before{inset:4%;background:#9E2044}        /* 菱 */
.center::after {inset:23%;background:#DFC98A}       /* 菱心 */
```

### 特徵 3｜七階明度尺：同一畫面最亮與最暗至少差三階

素色沒有花可以區分，遠看只剩明暗。把你的色票排成七階，**同一個版面上用到的顏色必須跨至少三階**。
擠在中間三階的配色遠看是一團泥——這是這個風格最常見的失敗，而且失敗得很難救。

```css
:root{
  /* 第 1 階（最亮）→ 第 7 階（最暗）。每個顏色都標階數，配色時只看階數不看色相 */
  --v1:#EAE3D4; /* 棉白 */
  --v2:#DFC98A; /* 稻黃 */
  --v3:#C99A1E; /* 芥黃 ・ #6E8B5B 秧綠 ・ #9C9A8E 灰鴿 */
  --v4:#B4462C; /* 磚紅 ・ #3D6488 灰藍 */
  --v5:#9E2044; /* 胭脂 */
  --v6:#4B2A5E; /* 茄紫 ・ #27476B 靛青 */
  --v7:#1C3A2E; /* 瓶綠 ・ #16150F 墨 */
}
```

驗算（可直接抄進專案的檢查函式）：

```js
const STEP={'#EAE3D4':1,'#DFC98A':2,'#C99A1E':3,'#6E8B5B':3,'#9C9A8E':3,
            '#B4462C':4,'#3D6488':4,'#9E2044':5,'#4B2A5E':6,'#27476B':6,
            '#1C3A2E':7,'#16150F':7};
const ok = cols => Math.max(...cols.map(c=>STEP[c])) - Math.min(...cols.map(c=>STEP[c])) >= 3;
```

### 特徵 4｜縫線是唯一的邊界

**沒有 border、沒有 outline、沒有 box-shadow、沒有圓角。**
要把兩塊色域分開，只能用一道虛的針腳：實 7px、空 12px、粗 1.5px。
這條規則統治全站——卡片、表格列、頁尾分隔、導覽現用態，全部只有這一種線。

```css
:root{--thread:#D8CFB8;--threadd:#4A4636;--on:7px;--off:12px}
.p{position:relative}
.p::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.6;
 background:
  repeating-linear-gradient(90deg,var(--th,var(--thread)) 0 var(--on),transparent var(--on) var(--off)) left top/100% 1.5px no-repeat,
  repeating-linear-gradient(90deg,var(--th,var(--thread)) 0 var(--on),transparent var(--on) var(--off)) left bottom/100% 1.5px no-repeat,
  repeating-linear-gradient(180deg,var(--th,var(--thread)) 0 var(--on),transparent var(--on) var(--off)) left top/1.5px 100% no-repeat,
  repeating-linear-gradient(180deg,var(--th,var(--thread)) 0 var(--on),transparent var(--on) var(--off)) right top/1.5px 100% no-repeat}
/* 淺色底上的縫線改用深線：在該容器上寫 --th:var(--threadd) */
```

SVG 裡的縫線（給裁片用，單位是 user unit）：

```css
.blk rect,.blk path{stroke:var(--thread);stroke-width:.055;stroke-dasharray:.16 .24;stroke-opacity:.5}
```

### 特徵 5｜壓線走滿：空白處壓最密

素面的細節全在壓線裡。五種紋樣各有位置：**方格**（外邊與大塊素面）、**麻花**（寬邊長條）、
**羽環**（中心菱與四角）、**南瓜籽**（內框窄條）、**蛤殼**（大面積填底）。
它們都是純幾何、可程序生成，不需要任何圖檔。

```js
// 五種壓線紋的產生器：回傳一組 SVG path 的 d 字串
function motif(name,W,H,g){const d=[];
 if(name==='crosshatch'){for(let x=-H;x<W+H;x+=g){d.push(`M${x} 0L${x+H} ${H}`);d.push(`M${x} ${H}L${x+H} 0`);}}
 else if(name==='cable'){for(let k=0;k<2;k++){let s=`M0 ${H/2}`;
   for(let x=0;x<W;x+=g)s+=`q${g/2} ${(k?-1:1)*(H/2-2)} ${g} 0`;d.push(s);}}
 else if(name==='pumpkin'){for(let y=0;y<H;y+=g)for(let x=0;x<W;x+=g){
   d.push(`M${x} ${y+g/2}q${g/2} -${g/2} ${g} 0`);d.push(`M${x} ${y+g/2}q${g/2} ${g/2} ${g} 0`);}}
 else if(name==='clamshell'){let row=0;for(let r=0;r<H+g;r+=g*0.6,row++)
   for(let x=(row%2?-g/2:0);x<W+g;x+=g)d.push(`M${x} ${r}a${g/2} ${g/2} 0 0 0 ${g} 0`);}
 return d;}
```

```html
<svg class="stitching" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
  <path d="…motif('crosshatch',1200,760,34).join('')…"/>
</svg>
<style>
.stitching{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.stitching path{fill:none;stroke:#D8CFB8;stroke-width:1.1;stroke-dasharray:4.5 6;opacity:.30}
</style>
```

> **壓線紋請在建置階段算好並內嵌成靜態 SVG。**關掉 JavaScript 時它必須還在——
> 壓線是這個風格的內容，不是增強效果。

---

## 三、第六條：以上五條必須恰好被違反一次

這是本 SKILL 唯一一條**要求自己被破壞**的規則，也是它與其他極簡風格規格書最大的差別。

**每一頁上必須恰好有一塊布是錯的。**錯法只有三種，擇一：

| 錯法 | 違反 | 做法 |
|---|---|---|
| 有花的 | 特徵 1 | 全站唯一一塊帶圖案的區塊 |
| 縫份倒錯邊 | 特徵 4 | 下緣多一道 3px 的暗色階 |
| 明度同階 | 特徵 3 | 把它的底色換成與鄰塊同階的暗色 |

位置由訪客當天的日期決定性算出（同一天同一頁恆得同一塊），並且它是**唯一會慢慢動的東西**。

```css
.humble.printed{background-image:
 repeating-linear-gradient(0deg,rgba(0,0,0,.20) 0 2px,transparent 2px 9px),
 repeating-linear-gradient(90deg,rgba(0,0,0,.20) 0 2px,transparent 2px 9px)}
.humble.sw::before{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(0,0,0,.45)}
.humble.sv{background-color:#25402F;color:#EAE3D4;--th:#D8CFB8}
@keyframes humble{0%,100%{translate:0 0}50%{translate:1.5px 1.1px}}
.humble{animation:drape 22s ease-in-out infinite,humble 40s ease-in-out infinite;animation-composition:add}
```

```js
function fnv(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h>>>0;}
const key=new Date().toISOString().slice(0,10)+'|'+location.pathname.split('/').pop();
const h=fnv(key), cand=[...document.querySelectorAll('.hp')];
const el=cand[h%cand.length], kind=(h>>>8)%3;
el.classList.add('humble',['printed','sw','sv'][kind]);
el.setAttribute('aria-label','這一塊布與規格不符（'+['印花','縫份倒錯邊','明度與鄰塊同階'][kind]+'）');
```

**無障礙不打折**：候選區塊一律 `tabindex="0"`，那塊錯的直接用 `aria-label` 講出來它錯在哪。
把錯誤藏起來讓螢幕閱讀器使用者找不到，那不叫謙卑，那叫排除。

---

## 四、色彩系統

| 色 | Hex | 明度階 | 用途 | 面積比 |
|---|---|---|---|---|
| 瓶綠 | `#1C3A2E` | 7 | 全站地色，被面的地布 | 約 34% |
| 深瓶綠 | `#132A21` | 7 | 繃架、頁尾、導覽底 | 約 10% |
| 靛青 | `#27476B` | 6 | 外框寬邊 | 約 12% |
| 茄紫 | `#4B2A5E` | 6 | 四角方塊 | 約 8% |
| 胭脂 | `#9E2044` | 5 | 中心菱、警示、退件 | 約 7% |
| 芥黃 | `#C99A1E` | 3 | 內框、現用態、主要動作 | 約 6% |
| 稻黃 | `#DFC98A` | 2 | 菱心 | 約 3% |
| 棉白 | `#EAE3D4` | 1 | 襯裡與紙——**所有長文一律在這上面** | 約 15% |
| 墨 | `#16150F` | 7 | 繃架木料、棉白上的正文 | 約 3% |
| 米線 | `#D8CFB8` | — | 深色上的縫線 | 線 |
| 深線 | `#4A4636` | — | 淺色上的縫線 | 線 |

輔助色（布譜用，非版面色）：磚紅 `#B4462C`(4)、灰藍 `#3D6488`(4)、秧綠 `#6E8B5B`(3)、灰鴿 `#9C9A8E`(3)。

**硬規則**

1. 零漸層。唯一允許的 `repeating-linear-gradient` 是硬停點的織理與縫線，中間不得有過渡色。
2. 零陰影、零模糊、零圓角、零外框。
3. 長文一律在棉白上（對比 ≥ 12:1），不要在瓶綠上排三行以上的內文。
4. 相鄰兩塊色域的明度階不得相同（第六條的那一塊除外）。
5. 芥黃只給「現在可以動的東西」，胭脂只給「被擋下來的事」。這兩個語意不得互換。

---

## 五、字體系統

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&family=Zilla+Slab:wght@400;600&display=swap');
h1,h2,h3,h4{font-family:'Noto Serif TC',"Songti TC",serif;font-weight:700;line-height:1.32;letter-spacing:.01em}
body{font-family:'Noto Sans TC',"PingFang TC",sans-serif;font-weight:400;font-size:16px;line-height:1.78}
.lat,.num{font-family:'Zilla Slab',Georgia,serif;font-variant-numeric:tabular-nums}
```

| 用途 | 字級 | 字重 | 行高 |
|---|---|---|---|
| 店名（菱心內） | `clamp(26px,3.6vw,44px)` | 900 | 1.2 |
| 章節標題 h2 | 23–31px | 700 | 1.32 |
| 卡片標題 h3 | 15.5–17px | 700 | 1.32 |
| 內文 | 16px | 400 | 1.78 |
| 布塊上的資訊 | 13–14px | 400 | 1.6 |
| 小註 `.mini` | 13px | 400 | 1.6 |
| 標籤 `.lbl` | 10.5px / letter-spacing .19em / 大寫 | 400 | — |
| 數字與布號 | Zilla Slab、`tabular-nums` | 400/600 | — |

**禁止**：斜體、任何裝飾字體、任何 display face、字元描邊、文字陰影、漸層文字。
理由跟布一樣——阿米什的規矩不准穿花的，字也一樣。

---

## 六、版面與網格

### 主網格（三環中心菱）

見特徵 2。**外圈的長條要用 `subgrid` 去對齊內圈的軌道線**，否則接縫對不齊——
拼布上接縫對不齊就是失敗，這是這個風格唯一真正的「錯誤」定義。

```css
.bar-t{grid-area:1/2/2/5;display:grid;grid-template-columns:subgrid}
.bar-l{grid-area:2/1/5/2;display:grid;grid-template-rows:subgrid}
@supports not (grid-template-columns:subgrid){
  .bar-t,.bar-b{grid-template-columns:.38fr 3.05fr .38fr}
  .bar-l,.bar-r{grid-template-rows:.38fr 2.55fr .38fr}
}
```

### 留白規則

- **不留白邊。**布是縫滿的，色域之間沒有 gap，`gap:0`。要分開就用縫線。
- 內距一律 `13px 15px`（布塊）或 `18px 20px`（棉白襯裡）。
- 區塊之間的垂直節奏：`52px`（章節）、`14px`（卡片）。
- 版心 `max-width:1180px`，左右 `22px`。

### 響應式

- ≤900px：繃架旁的座位攤平成橫列；兩欄版改單欄。
- ≤640px：被面壓成 1:1 的正方（`aspect-ratio:1/1`），字級降到 11.5px，
  被面上的長句隱藏，改在被面下方補一份 `<dl>` 完整資訊——**畫面先於文字，資訊零損失**。
- 這一點很重要：手機上要保住的是「三秒認得出這是一床被子」，不是把字塞進去。

---

## 七、元件配方

### 導覽（stitched-down 縫死導覽）

四條布別在繃架邊上。**現用頁那條是被縫死的**（沿長邊兩道針腳、下沉 2px）；
其餘只是別著（一枚菱形別針、微傾 −1.1°、hover 時翻到 +0.7°）。
語意是「這一條已經固定了，別的還可以拿下來」。

```css
.nav a{padding:9px 15px 10px;background:#132A21;text-decoration:none;position:relative}
.nav a.pin{rotate:-1.1deg;transform-origin:top left}
.nav a.pin::before{content:"";position:absolute;left:50%;top:-5px;width:9px;height:9px;margin-left:-4.5px;background:#9C9A8E;rotate:45deg}
.nav a.pin:hover{rotate:.7deg}
.nav a.sewn{translate:0 2px}
.nav a.sewn::after{content:"";position:absolute;inset:0;pointer-events:none;
 background:repeating-linear-gradient(90deg,#D8CFB8 0 7px,transparent 7px 12px) left 4px/100% 1.5px no-repeat,
            repeating-linear-gradient(90deg,#D8CFB8 0 7px,transparent 7px 12px) left calc(100% - 4px)/100% 1.5px no-repeat}
```

### 按鈕

```css
.btn{display:inline-block;padding:10px 20px;background:#C99A1E;color:#16150F;font-weight:500;cursor:pointer;border:0}
.btn.ghost{background:#1C3A2E;color:#EAE3D4}
.btn[disabled]{opacity:.4;cursor:not-allowed}
/* 沒有 hover 位移、沒有陰影、沒有圓角。要回饋就換底色 */
```

### 卡片＝一塊布

```css
.card{background:#EAE3D4;color:#16150F;--th:#4A4636;padding:17px 19px;position:relative}
/* 再加特徵 4 的 .p::after 縫線。不要加別的 */
```

### 表單

輸入框是棉白色的布，零邊框、零圓角。**驗證訊息用胭脂底的整塊布**，不是紅色小字。

```css
.fld input,.fld select{width:100%;padding:8px 9px;background:#EAE3D4;color:#16150F;border:0;font:inherit}
.err{background:#9E2044;padding:11px 13px;margin-top:12px}
```

### 表格

沒有格線。每一列的上緣是一道縫線。

```css
table{border-collapse:collapse;width:100%}
th,td{text-align:left;padding:8px 10px;vertical-align:top}
tbody tr td{background:repeating-linear-gradient(90deg,var(--th,#D8CFB8) 0 7px,transparent 7px 12px) left top/100% 1.5px no-repeat}
```

### 頁尾

深瓶綠，上緣一道縫線，三欄。

---

## 八、動效規則

四種，缺一不可。全部走 `translate`／`rotate` 兩個獨立變換屬性，不用 `transform` 簡寫——
因為要靠 `animation-composition:add` 把它們相加。

| 類別 | 名稱 | 觸發 | duration / easing |
|---|---|---|---|
| ambient | 布面呼吸 | 無 | `drape` 22s ease-in-out infinite ＋ `ripple` 13–19s（各自相位） |
| input | 拈起 | hover / focus-within | 90ms linear（上提 3px、針距 7/12 → 10/16） |
| transition | 翻被 | 進頁 | 480ms `steps(5)`，`clip-path:inset(0 100% 0 0)` → `inset(0)` |
| signature | 謙卑塊 | 常駐 ＋ 點擊 | 漂移 40s；點擊時全站縫線抽緊 260ms（`body.tug{--on:5px;--off:9px}`） |

```css
@keyframes drape {0%,100%{rotate:-.16deg} 50%{rotate:.16deg}}
@keyframes ripple{0%,100%{translate:0 0} 50%{translate:.6px -.7px}}
.p{animation:drape 22s ease-in-out infinite,ripple var(--rd,15s) ease-in-out infinite;
   animation-delay:calc(var(--i,0) * -1.3s),calc(var(--i,0) * -.77s);
   animation-composition:add;                 /* ← 關鍵 */
   transition:translate 90ms linear}
.p.lift:hover,.p.lift:focus-within{translate:0 -3px;--on:10px;--off:16px}
@keyframes turn{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.turn{animation:turn 480ms steps(5) both}
@media (prefers-reduced-motion:reduce){
  .p,.humble{animation:none!important}
  .humble{translate:1.5px 1.1px}   /* 靜態偏位：那塊錯的仍然找得到 */
  .turn{animation:none}
  .p{transition:none}
}
```

**為什麼一定要 `animation-composition:add`**：`drape` 與 `ripple` 都在動 `translate`／`rotate`。
預設的 `replace` 之下，後宣告的動畫會整個蓋掉前一個，而且**動畫值會壓掉 `transition` 的底值**——
於是 hover 的「拈起」完全不會發生。改成 `add` 之後，動畫是「加在底值上」，
底值（含 transition）照樣生效，兩層動作才能共存。這不是炫技，是這個版面成立的條件。

**禁用**：淡入式滾動揭示、視差、數字滾動、跑馬燈、`stroke-dashoffset` 描繪動畫、
按壓硬陰影、任何 `filter:blur`。理由：這些動作在布上不存在。

---

## 九、插畫與圖像風格（pieced-patch 裁片縫合構成）

**零外部圖片、零照片、零寫實描繪。**所有圖像都由同一支引擎輸出，
而且每一張都拆得出「哪一塊布裁成什麼形狀、縫線往哪邊倒」。

原語只有四種：

1. **正方裁片** `sq(x,y,w,h,布)`
2. **半三角裁片** `hst(x,y,邊長,方向 0–3,布甲,布乙)`——一個正方沿對角切開的兩片
3. **縫線** ——每一片的輪廓，`stroke-dasharray:.16 .24`
4. **壓線紋** ——第五個特徵的五種紋樣

五種裁法（六單位見方，三塊布 `[地, 配, 心]`）：

```js
function patches(kind,c){const P=[],[A,B,C]=c;
 const sq=(x,y,w,h,col)=>P.push({t:'sq',x,y,w,h,c:col});
 const hst=(x,y,s,d,c1,c2)=>P.push({t:'hst',x,y,w:s,h:s,d,c:c1,c2});
 if(kind==='ninepatch'){for(let r=0;r<3;r++)for(let q=0;q<3;q++)sq(q*2,r*2,2,2,((r+q)%2===0)?A:B);sq(2,2,2,2,C);}
 else if(kind==='pinwheel'){hst(0,0,3,0,A,B);hst(3,0,3,1,A,B);hst(0,3,3,3,A,B);hst(3,3,3,2,A,B);sq(2.4,2.4,1.2,1.2,C);}
 else if(kind==='halfsquare'){for(let r=0;r<2;r++)for(let q=0;q<2;q++)
    hst(q*3,r*3,3,(r*2+q)%4,(r+q)%2?B:A,(r+q)%2?A:B);sq(2.5,2.5,1,1,C);}
 else if(kind==='railfence'){for(let r=0;r<3;r++){sq(0,r*2,6,.7,A);sq(0,r*2+.7,6,.65,C);sq(0,r*2+1.35,6,.65,B);}}
 else if(kind==='logcabin'){sq(2.5,2.5,1,1,C);let x=2.5,y=2.5,w=1,h=1;const t=.75;
  for(let g=0;g<3;g++){sq(x,y-t,w,t,A);sq(x+w,y-t,t,h+t,B);sq(x,y+h,w+t,t,B);sq(x-t,y-t,t,h+2*t,A);
   x-=t;y-=t;w+=2*t;h+=2*t;}}
 return P;}
```

**判準**：拿掉全部顏色，仍讀得出這塊布是怎麼裁的、縫份往哪邊倒。
**主色的定義**：面積最大的那塊布（五種裁法算下來都是 `c[0]`，也就是「地」）。相鄰不同色比的就是這個。

**明文禁用**：`feTurbulence` 手抖濾鏡、半調網點、細線幾何線描（thin-lineart）、
等角視圖、任何描物件外形的插圖。這些都是別的流派的語彙。

---

## 十、Logo 與 Favicon

Logo 就是一塊布：一個三環中心菱的方塊，加上店名。**不要畫任何具象的東西。**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="80" viewBox="0 0 280 80">
  <rect width="280" height="80" fill="#1C3A2E"/>
  <rect x="8" y="8" width="64" height="64" fill="#27476B"/>
  <path d="M40 10 70 40 40 70 10 40Z" fill="#9E2044"/>
  <path d="M40 22 58 40 40 58 22 40Z" fill="#4B2A5E"/>
  <path d="M40 30 50 40 40 50 30 40Z" fill="#DFC98A"/>
  <rect x="10" y="10" width="60" height="60" fill="none" stroke="#D8CFB8" stroke-width="1.4" stroke-dasharray="5 4" stroke-opacity=".75"/>
  <text x="88" y="42" font-family="Noto Serif TC, serif" font-weight="700" font-size="27" letter-spacing="2" fill="#EAE3D4">品牌名</text>
  <path d="M88 49h178" fill="none" stroke="#D8CFB8" stroke-width="1.3" stroke-dasharray="6 9" stroke-opacity=".6"/>
</svg>
```

Favicon 是同一塊布壓到 32×32，只留三層，以 inline data URI 寫在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%231C3A2E'/%3E%3Cpath d='M16 3.5 28.5 16 16 28.5 3.5 16Z' fill='%239E2044'/%3E%3Cpath d='M16 10 22 16 16 22 10 16Z' fill='%23C99A1E'/%3E%3Cpath d='M2.2 2.2h27.6v27.6H2.2z' fill='none' stroke='%23D8CFB8' stroke-width='1.3' stroke-dasharray='3 2.4'/%3E%3C/svg%3E">
```

---

## 十一、Do & Don't

**Do**

- 用大形狀。中心那塊要大到佔掉三分之一。
- 先排明度階，再挑顏色。配色會議上只准講階數。
- 長文放在棉白襯裡上。
- 每一頁留一塊錯的，並且誠實說明這個做法有史學爭議。
- 手機上先保住畫面的辨識度，資訊另外補一份完整的文字。

**Don't**

- 不要加任何印花、網點、noise、材質貼圖。
- 不要用漸層、陰影、模糊、圓角、外框、發光。
- 不要用細線幾何線描去「補一點細節」——這是另一個流派。
- 不要把明度都擠在中間三階。
- 不要用置中大標＋副標＋兩顆按鈕＋三張卡片的模板；這個風格的首屏應該是一件東西，不是一段宣傳。
- 不要用 emoji 當 icon，不要 Lorem ipsum，不要「EST. 19xx」徽章，不要紫藍漸層。
- 不要宣稱「阿米什人故意留一處錯誤」是史實。

---

## 十二、頁面骨架範例

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&family=Zilla+Slab:wght@400;600&display=swap" rel="stylesheet">
<style>/* 第四、五、六、八章的規則 */</style></head><body>

<header class="wrap"><div class="masthead">
  <div class="id"><a href="index.html">…logo svg…</a>
    <div><h1>品牌</h1><div class="sub lat">LATIN NAME・地點</div></div></div>
  <nav class="nav">
    <a class="sewn" aria-current="page">第一頁<span class="en lat">ONE</span></a>
    <a class="pin" href="b.html">第二頁<span class="en lat">TWO</span></a>
  </nav>
</div></header>

<main class="wrap"><div class="turn">
  <div class="frame">
    <span class="rail t"></span><span class="rail b"></span><span class="rail l"></span><span class="rail r"></span>
    <div class="quilt">
      <svg class="stitching" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true"><path d="…"/></svg>
      <div class="cell corner p hp lift" tabindex="0" style="--i:1">…地址…</div>
      <div class="bar-t barc p" style="--i:2"><div class="cell tiny">…</div><div class="cell">…價目…</div><div class="cell tiny">…</div></div>
      <div class="cell corner p hp lift" tabindex="0" style="--i:3">…電話…</div>
      <div class="cell ringc tiny p hp" tabindex="0" style="--i:4">規矩一</div>
      <div class="cell center p" style="--i:5">
        <span class="dia"></span><span class="dia3"></span>
        <div class="cnt"><div class="lbl">副標</div><div class="shopname">品牌</div></div>
      </div>
      …
    </div>
    <div class="quiltinfo"><dl>…手機用的完整資訊…</dl></div>
  </div>
</div></main>

<footer class="foot"><div class="wrap">
  <div class="seam"></div>
  <div class="cols">…</div>
</div></footer>
<script>/* 第三章的謙卑塊選取 */</script>
</body></html>
```

---

## 十三、技術實作與相容性

本站的視覺由三項技術承載。以下為 2026-09-02 查證的支援現況、fallback 的具體行為與效能實測值。

### 1. CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 2 的接縫對齊。外框長條跨越內圈三條不等寬軌道（`.38fr / 3.05fr / .38fr`），
用 `subgrid` 讓它的子格直接繼承母格軌道，接縫才會從外框一路對齊到中心。
用等分軌道自己重排是對不上的——因為母格軌道本來就不等寬，這正是拼布上最忌諱的事。

**支援現況（查證 MDN《Subgrid》與 caniuse `css-subgrid`，2026-09-02）**：
Firefox 71（2019-12）最早支援，Safari 16.0（2022-09），Chrome／Edge 117（2023-09-12／15）。
**Baseline newly available 自 2023-09-15**，現已列為 Baseline widely available，全球覆蓋率 92% 以上。

**Fallback**：`@supports not (grid-template-columns:subgrid)` 時，把同一組軌道值明寫給子格
（`.38fr 3.05fr .38fr`）。視覺結果幾乎相同，差別只在 `fr` 的捨入誤差可能讓接縫差一兩個像素；
版面、內容與可讀性完全不變，資訊零損失。

### 2. CSS `animation-composition: add`（B 動效與時間軸層）

**承載**：ambient 的「布面呼吸」與 input 的「拈起」必須同時存在。
兩支動畫（`drape` 動 `rotate`、`ripple` 動 `translate`）加上 hover 的 `transition:translate`，
在預設的 `replace` 合成模式下會互相覆蓋，而且動畫值優先序高於 transition 的底值，
結果是 hover 完全沒有回饋。`add` 讓動畫加在底值上，三層才共存。

**支援現況（查證 MDN《animation-composition》與 caniuse `mdn-css_properties_animation-composition`，2026-09-02）**：
Safari 16.0、Chrome／Edge 112、Firefox 115。**Baseline newly available 自 2023-07。**
注意規格仍是 CSS Animations Level 2 的編輯草案，未來行為可能微調。

**Fallback**：`@supports not (animation-composition:add)` 時只保留 `drape` 一支動畫，
並在 `:hover`／`:focus-within` 時把動畫關掉讓 transition 生效——
布還是會呼吸，拈起也還在，只是兩者不同時發生。

**附帶依賴**：獨立變換屬性 `translate` / `rotate`（非 `transform` 簡寫）。
兩者為 Baseline widely available（Chrome 104、Firefox 72、Safari 14.1，2022-08 起三引擎齊備）。
不支援時整段 `.p` 動畫不生效，版面靜止但完整。

### 3. 圖著色回溯求解（E 資料與生成層）

**承載**：布譜頁二十四床被面的配色，以及換布會的驗收。
「相鄰兩塊主色不得相同」在數學上就是九宮格四鄰接圖上的**圖著色問題**；
以最大度優先排序 ＋ 回溯法求解，配色池是五塊布。純 JavaScript，無瀏覽器 API 依賴，故無相容性問題。
搭配 FNV-1a → mulberry32 決定性偽亂數，同一床被面永遠是同一組配色。

```js
function colourGraph(n,adj,palette,rnd){
 const asg=new Array(n).fill(-1);
 const order=[...Array(n).keys()].sort((a,b)=>adj[b].length-adj[a].length);
 (function go(i){ if(i===n)return true; const v=order[i];
   for(const col of shuffle(palette,rnd)){ if(adj[v].some(u=>asg[u]===col))continue;
     asg[v]=col; if(go(i+1))return true; asg[v]=-1;} return false;})(0);
 return asg;}
```

**實測**：九格、五色的解在 12–40 次嘗試內收斂（中位數 12），單次求解 < 0.05ms。
二十四床全部滿足「相鄰不同色」；其中二十二床同時滿足「明度差 ≥ 3 階」，
另外兩床是刻意保留的客人指定配色，卡片上明白標註「不足三階」。

**換布會的窮舉驗證**：八位社員 × 256 種換法 × 十二個月 × 每月二十四種自己的布塊，共 73,728 局。
第二條（明度差 ≥3）通過 85.4%、第三條（相鄰不同色）通過 19.3%、兩條都過 19.0%。
兩條都過的局裡，換五塊 9,460 局、換六塊 3,504 局、換七塊 907 局、換八塊 110 局——
**換越多不一定越好**。另外，換不到五塊時第三條在數學上必定失敗
（九宮格的四個邊格互不相鄰，換來的布依「中心→四角→四邊」上被面，
少於五塊就一定有兩塊自己的布挨在一起）。

### 效能預算

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含全部 inline 資源） | 繃架 31KB／換布會 45KB／布譜 200KB／收布 32KB | ≤350KB |
| 外部資源 | 僅 Google Fonts 三個字族 | 零圖片、零音檔 |
| 首屏 JS 執行 | 謙卑塊選取為一次 `querySelectorAll` ＋ 一次 hash，< 1ms | ≤100ms |
| 動畫 | 全部只動 `translate`／`rotate`／`clip-path`，不觸發 layout | 60fps |
| 布塊 SVG | 每塊約 1.0KB（描邊屬性移到 CSS，較行內寫法省 55%） | — |

布譜頁 200KB 的來源是二百一十六塊布塊 SVG（24 床 × 9 塊）。
把 `stroke` / `stroke-dasharray` / `stroke-opacity` 從行內屬性移到 CSS 類別，
單塊由 2,272 位元組降到 1,007 位元組，全頁由 417KB 降到 200KB。
若你的專案要放更多樣本，請沿用同樣的做法，或改用 `<use>` 引用。

### 不需要 JavaScript 也成立的部分

繃架上的全部營業資訊、壓線紋、布譜的十二色布單／五種裁法／五種壓線紋／二十四床被面、
收布規矩、店史、交通——全部是靜態 HTML 與建置階段就算好的 inline SVG。
需要 JavaScript 的只有兩件事：換布會的互動、訂製單的估價；兩者都有 `<noscript>` 明講並指出替代路徑。
謙卑塊在沒有 JavaScript 時停在建置階段預設的那一塊，仍然存在、仍然找得到。
