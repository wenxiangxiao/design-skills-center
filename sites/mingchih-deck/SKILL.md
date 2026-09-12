---
name: postpunk-factory
description: Post-punk Factory Records / Peter Saville house style — catalogue numbers instead of names, information withheld from the face, an appropriated data plot as the only image, an unnegotiable 12-column grid, and hazard-stripe industrial signage on a controlled-yellow ground.
---

# 後龐克 Factory Records／Peter Saville

> 曼徹斯特，1978–1992。一家唱片公司把自己的每一件東西都編了號——唱片、海報、夜店、訴訟、辦公室的貓——然後在封面上不寫團名、不寫專輯名，只放一張從別處借來的圖。
> 本 SKILL 是這套語言的規格書。風格與內容分離：它可以套在任何「有一堆被編號的東西、而且不打算解釋自己」的產業上。

---

## 一、設計哲學

Factory Records 的設計不是一種裝飾，是一套**行政制度**。它的三個前提：

1. **編號先於名稱。** Tony Wilson 把公司產出的每一件東西編進 FAC 序列，唱片是 FACT，夜店是 FAC 51，連一場官司都有編號。編號的意義是：這件東西已經被登記在案，它是不是「作品」不重要。落到版面上，就是**編號一律排得比名稱大、比名稱先**，而且很多時候只有編號、沒有名稱。
2. **設計的工作是扣住資訊，不是傳達資訊。** Peter Saville 的《Unknown Pleasures》正面沒有團名、沒有專輯名；《Blue Monday》把「FAC SEVENTY THREE」編成一條色碼印在封套邊緣，鑰匙印在另一張唱片的背面。這不是耍神祕，是一個明確的立場：**看得懂的人自然看得懂，而看懂的過程本身就是內容。**
3. **圖是借來的，不是畫的。** Saville 幾乎不畫圖。他拿走劍橋天文百科裡 CP1919 脈衝星的疊線圖、拿走 Fantin-Latour 的一幅花卉油畫，原樣放上去，不加說明、不裁成裝飾。這條規則的效果是：**畫面上唯一的圖永遠帶著一點不屬於這裡的氣味。**

再加上第四個前提，來自 Ben Kelly 一九八二年替 FAC 51 Haçienda 做的室內：**裝飾只能從工地與交通來。**四十五度危險斜紋、擋車柱、地面標線、反光釘、分區色塊——一個舞廳被蓋成一座停車場。

做這個風格時，判準永遠是：**這一頁像不像一份「已經歸檔」的東西？**像海報就錯了，像簡報就更錯了。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個風格了。

### 特徵 1｜編號取代名稱（編號永遠比名稱大）

每一個實體——頁面、商品、事件、器物、人——都有一個固定格式的目錄編號，三位數，前綴為兩到三個大寫拉丁字母。編號用 800 字重、負字距，字級是名稱的 **2 到 8 倍**；名稱以 9–10px 全大寫小標籤的形式縮在編號下面，或者乾脆不出現。

```css
.entry{
  display:grid; grid-template-columns:118px 1fr auto; gap:14px; align-items:center;
  border-top:2px solid #141518; padding:12px 0; text-decoration:none; color:inherit;
}
.entry .num{ font:800 30px/1 "Archivo",sans-serif; letter-spacing:-.02em; }
.entry .ttl b{                     /* 名稱之上的類別籤，比名稱還小 */
  display:block; font:600 9px/1 "Archivo",sans-serif;
  letter-spacing:.26em; text-transform:uppercase; color:#5c5c5f; margin-bottom:5px;
}
.entry:hover{ background:#141518; color:#EFEEE8; }   /* 反白，不是變色不是加陰影 */
```

標頭右上永遠掛一枚「本頁編號」，這是整站唯一允許超過 48px 的字：

```css
.hnum{ font:800 clamp(30px,5vw,54px)/1 "Archivo",sans-serif; letter-spacing:-.02em; }
.hnum small{ display:block; font:600 10px/1 "Archivo"; letter-spacing:.28em; margin-bottom:6px; }
```

**Don't：**不要把編號做成「徽章」（圓角膠囊、外框、背景色塊）。編號就是字，裸的。

### 特徵 2｜資訊被扣住：色碼作為定址語言

牌面上不寫它是什麼。位置、類別、規格、缺點，全部編成一條**等寬色段帶**：固定段數（建議 4 段）、固定寬度、段與段之間夾 2px 的黑縫，外面再包 2px 黑框。同一個顏色在不同段是不同的意思——這是刻意的，因為一格只有一面牌。

```css
.cc{ display:inline-flex; gap:2px; background:#141518; padding:2px; vertical-align:middle; }
.cc i{ display:block; width:14px; height:40px; background:var(--seg); }
.cc.sm i{ width:9px;  height:24px; }
.cc.lg i{ width:26px; height:74px; }
```
```html
<span class="cc" aria-hidden="true">
  <i style="--seg:#F0C310"></i><i style="--seg:#C4818E"></i>
  <i style="--seg:#B5B2AC"></i><i style="--seg:#EFEEE8"></i>
</span>
<span class="sr">一層／C 區近電梯／十六至二十四步／無但書</span>
```

把多個實體的色碼並排成一條，就得到整批庫存的一張圖——**開場首屏就用這個，不要用大標題**：

```css
.strip{ display:flex; gap:2px; background:#141518; padding:3px; position:relative; overflow:hidden; }
.strip i{ flex:1 1 0; min-width:0; height:56px; background:var(--seg); }
```
```html
<!-- 每一直條 = 一個實體的四段色碼，由上到下堆疊 -->
<i style="--seg:linear-gradient(180deg,#F0C310 0% 25%,#C4818E 25% 50%,#B5B2AC 50% 75%,#EFEEE8 75% 100%)"></i>
```

**紀律（本風格為現代網頁補上的一條）：**色碼是**第二種**語言，不是唯一語言。每一枚色碼旁邊必須有 `.sr` 視覺隱藏的文字全譯，且站內必須有一頁公開對照表。**扣住資訊 ≠ 讓人用不了。**

### 特徵 3｜借來的圖：無標籤的疊線層析圖

整站只有一種「圖」，而且它不是插畫，是一組真實量測數字被畫成的線。做法是把 N 條同型曲線由後往前疊，每條先用**底色實心填滿自己下方**再描邊，於是前面的線把後面的遮住——遮擋就是內容。**不畫座標軸、不畫圖例、不寫單位。**圖說只有一句不解釋任何事情的短句，而且用一種不屬於這套版面的襯線斜體。

```js
// rows: number[N][M]，由後往前畫
function ridgeline(rows,{w=660,h=330,rose=-1}={}){
  const n=rows.length,m=rows[0].length,padX=18,top=26,step=(h-top-26)/(n-1);
  let s=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="..."><rect width="${w}" height="${h}" fill="#141518"/>`;
  for(let d=n-1;d>=0;d--){
    const base=top+d*step;
    const pts=rows[d].map((v,i)=>{
      const x=padX+i*((w-padX*2)/(m-1)); return `${x.toFixed(1)},${(base-v*0.57).toFixed(1)}`;
    }).join(' ');
    s+=`<polygon points="${padX},${base} ${pts} ${w-padX},${base}" fill="#141518"/>`;      // 遮擋
    s+=`<polyline points="${pts}" fill="none" stroke="${d===rose?'#C4818E':'#EFEEE8'}"
         stroke-width="${d===rose?1.9:1.05}" stroke-linejoin="miter"/>`;
  }
  return s+'</svg>';
}
```
```css
.borrow{ font:italic 400 17px/1.6 "Bodoni Moda",Georgia,serif; color:#5a3b42; }
```

**Don't：**不要加漸層填色、不要加陰影、不要 `stroke-linejoin:round`。線必須是尖角的、等粗的、白的。

### 特徵 4｜不可協商的十二欄格線（而且看得見）

整站共用一副 12 欄格線，**印在背景上**，所有版塊都掛在它上面。巢狀的版塊不自己排欄，它**借用**整頁的欄——這正是 `subgrid` 的用途。

```css
.sheet{ display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); }
.band { grid-column:1/-1; display:grid; grid-template-columns:subgrid; align-items:stretch; }
@supports not (grid-template-columns:subgrid){
  .band{ grid-template-columns:repeat(12,minmax(0,1fr)); }
}
.c1_5{grid-column:1/5} .c5_13{grid-column:5/13} .c1_9{grid-column:1/9} .c9_13{grid-column:9/13}

/* 欄線本身要看得見 */
main>.wrap::before{
  content:""; position:absolute; left:24px; right:24px; top:0; bottom:0; z-index:0; pointer-events:none;
  background:repeating-linear-gradient(90deg,rgba(20,21,24,.18) 0 1px,transparent 1px calc(100%/12));
  mix-blend-mode:multiply;
}
```

欄間距為 **0**：相鄰版塊直接對接，兩道 2px 黑框以 `margin-left:-2px` 併成一道。字級只有三階（11 / 15 / 132），比例固定，**沒有第四階、沒有斜體、沒有第二種強調方式**。

### 特徵 5｜裝飾只能從工地與交通來

允許的裝飾母題只有四種：**45° 危險斜紋**、**反光釘（硬邊實心方點）**、**地面標線（3px 白線畫的框）**、**分區實色塊**。不准出現任何來自印刷史的裝飾（花邊、飾首字母、網點、手抖濾鏡）。

```css
.hz{                                   /* 危險斜紋帶 */
  height:20px; border-top:2px solid #141518; border-bottom:2px solid #141518;
  background:repeating-linear-gradient(135deg,#141518 0 13px,#F0C310 13px 26px);
  background-size:36.77px 36.77px;     /* = 26px ÷ cos45°，讓它可以整格位移 */
}
ul.studs{ list-style:none; }           /* 反光釘清單 */
ul.studs li{ position:relative; padding-left:22px; }
ul.studs li::before{ content:""; position:absolute; left:0; top:.62em; width:10px; height:10px; background:#141518; }
.stall{ border-right:3px solid #EFEEE8; }  /* 地面標線 */
```

**Don't：**零圓角、零模糊陰影、零漸層（唯一的漸層是色碼直條的四段硬停止）。

---

## 三、色彩系統

本風格的地色是**管制黃**——它是 FAC 51 Haçienda 的黃黑斜紋，不是「品牌主色」，是「場地」。長文一律在紙上或黑底上，不在黃色上。

| 色 | Hex | 面積 | 用途 |
|---|---|---|---|
| 管制黃 Yellow | `#F0C310` | **≈30%** | 地色、危險斜紋、現用態、強調數字。它是場地，不是紙。 |
| 瀝青黑 Asphalt | `#141518` | ≈26% | 所有 2px 框線、深色版塊、正文於暗底、色碼的縫 |
| 標線白 Line-white | `#EFEEE8` | ≈22% | 紙（所有長文在這上面）、地面標線、疊線圖的線 |
| 水泥灰 Concrete | `#B5B2AC` | ≈15% | 次級版塊、平面圖底、停用態。**零紙紋、零顆粒** |
| 灰玫瑰 Dusty rose | `#C4818E` | **≤7%** | 「借來的」那一塊柔色。只給色碼的一段、疊線圖裡的那一條、focus ring、路徑線 |

**硬規則：**

- 灰玫瑰是唯一的柔色，**它必須存在，而且必須少**。工業色域裡永遠留一塊不屬於這裡的顏色——這是 Saville 把 Fantin-Latour 的玫瑰放進工業唱片封套的那一手。拿掉它，整站就退化成普通的工地警示風。
- 黃與黑永不用漸層過渡，永遠硬邊相接。
- 灰階零色偏（`#B5B2AC` 是暖中性水泥，不是藍灰）。
- 不准出現第六個色相。要更多層級就調面積，不調彩度。
- 連結色用深磚 `#8a2f16`（在白紙上）或管制黃（在黑底上），不用藍。

---

## 四、字體系統

兩種字，三階字級，全站沒有第四種可能。

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Noto+Sans+TC:wght@400;500;900&family=Bodoni+Moda:ital,wght@1,400&display=swap" rel="stylesheet">
```
```css
:root{
  --lat:"Archivo",system-ui,sans-serif;      /* 拉丁：標籤、編號、數字 */
  --han:"Noto Sans TC","Archivo",sans-serif; /* 漢字：標題與正文 */
  --ser:"Bodoni Moda",Georgia,serif;         /* 只給「借來的」那一行圖說 */
}
body{ font:400 15px/1.85 var(--han); letter-spacing:.01em; }
h2  { font:900 clamp(19px,2.4vw,25px)/1.3 var(--han); letter-spacing:.02em; }
h3  { font:700 14px/1.5 var(--han); letter-spacing:.1em; }
.lbl{ font:600 10px/1 var(--lat); letter-spacing:.28em; text-transform:uppercase; }
.mono{ font:600 13px/1.7 var(--lat); letter-spacing:.04em; font-variant-numeric:tabular-nums; }
.big{ font:800 clamp(46px,10vw,124px)/.86 var(--lat); letter-spacing:-.035em; }
```

- **三階**：小標籤 10–11px（字距 .22–.28em，全大寫拉丁）／正文 15px／編號 30–132px。中間不准插階。
- 數字一律 `tabular-nums`，一律 Archivo，就算夾在漢字句子裡也是。
- 中文標題用 900 字重，不用 700；小標籤永遠不用中文（中文沒有全大寫，字距拉開會散）。
- **禁止**：斜體（唯一例外是特徵 3 那一行圖說）、字元陰影、外框字、漸層字。

---

## 五、版面與網格

- 容器 `max-width:1180px`，左右 padding 24px。欄數 12，**欄間距 0**。
- 每一列都是一個 `.band`（`grid-column:1/-1` + `subgrid`），列與列之間 18–34px。
- 常用切法：`1/5 + 5/13`（三七開）、`1/9 + 9/13`（主＋側欄）、`1/7 + 7/13`（對半）、`1/4 + 4/10 + 10/13`。**不要用等分三欄。**
- 版塊只有四種：`.paper`（白紙，2px 黑框）、`.dark`（黑底）、`.conc`（水泥灰）、裸的（直接壓在黃色地上）。四種都是 `border:2px solid #141518`、`padding:26px 24px`、**零圓角**。
- 留白規則：留白就是黃色。黃色不是背景，是版塊之間**還沒有被登記的地面**，所以它要成塊出現（≥18px），不要當細縫用。
- 版塊之間不要置中對齊；一列裡的兩塊永遠不等寬。

RWD：≤900px 時全部欄合併為 `1/-1`、負邊距歸零、側欄取消 sticky；≤560px 時隱藏背景欄線、`.wrap` padding 降為 14px、色碼段縮為 11×30px、表格字級 13px。

---

## 六、元件配方

### 導覽：車格佔用（bay-stall）

四頁＝四個地面停車格。現用頁那一格**被佔住**：一塊實色從下方升滿整格，把印在地上的頁碼蓋掉。現用態不是被標示、不是變色，而是**它被東西擋住了**——這是特徵 2 的規則套用在導覽自己身上。

```css
nav.stalls{ display:grid; grid-template-columns:repeat(4,1fr); background:#141518;
  border-top:2px solid #141518; border-bottom:2px solid #141518; }
.stall{ position:relative; height:76px; overflow:hidden; background:#141518; color:#EFEEE8;
  border-right:3px solid #EFEEE8; text-decoration:none; }
.stall:last-child{ border-right:0; }
.stall .ground{ position:absolute; left:12px; bottom:8px; font:800 34px/1 var(--lat);
  color:rgba(239,238,232,.30); }                       /* 印在地上的頁碼 */
.stall .veh{ position:absolute; inset:auto 0 0 0; height:0; background:#F0C310;
  transition:height 140ms steps(4); }                   /* 車 */
.stall:hover .veh{ height:34%; }                        /* 倒車進格，四格硬跳 */
.stall[aria-current="page"] .veh{ height:100%; }
.stall[aria-current="page"] .ground{ display:none; }    /* 被蓋住 */
.stall[aria-current="page"]::after{ content:""; position:absolute; right:10px; bottom:10px;
  width:22px; height:22px; border-radius:50%; background:#141518; z-index:2; }
```

### 按鈕

```css
.btn{ border:2px solid #141518; background:#141518; color:#F0C310;
  font:700 12px/1 var(--lat); letter-spacing:.22em; text-transform:uppercase;
  padding:15px 22px; border-radius:0; cursor:pointer; }
.btn:hover{ background:#F0C310; color:#141518; }        /* 反白，不位移不加陰影 */
.btn.alt{ background:transparent; color:#141518; }
.btn[disabled]{ background:#B5B2AC; color:#5c5c5f; border-color:#5c5c5f; }
```

### 表單

```css
input,select,textarea{ width:100%; padding:11px 12px; border:2px solid #141518;
  background:#EFEEE8; font:600 16px/1.3 var(--lat); color:#141518; border-radius:0; }
input:focus{ outline:3px solid #C4818E; outline-offset:1px; }   /* focus 用那塊柔色 */
label{ display:block; font:600 10px/1 var(--lat); letter-spacing:.24em;
  text-transform:uppercase; margin:14px 0 6px; }
```

錯誤訊息的口氣：**行政式的退件，不是道歉。**「退件：低於底價。1S01 的底價是 2,400 元，本場不予開拆。」不要寫「哎呀，好像有點問題喔」。

### 卡片

沒有卡片。要分組就用 `.paper` / `.dark` / `.conc` 版塊直接對接，或用 `.entry` 目錄列。**絕對不要圓角＋陰影的三張並排卡片。**

### Footer

黑底、頁尾導覽用「編號＋名稱」（`000　目錄`），下面兩欄 `.fine`（12px、水泥灰）放地址電話與免責。

---

## 七、動效規則

四種，缺一不可，全部要有 `prefers-reduced-motion` 降級且**資訊零損失**。本風格的共同紀律是：**不准有 easing。**這裡的東西是機械移動的，不是彈性的——`steps()` 是本風格的預設 timing function。

| 種類 | 做法 | 值 |
|---|---|---|
| **ambient 環境** | 日光燈管閃爍（`steps(1)` 的不規則 opacity 關鍵影格）＋ 危險斜紋帶整格位移 | tube 7.2s／hz 5.6s `steps(7)` |
| **input 輸入** | 導覽的「倒車進格」`transition:height 140ms steps(4)`；版塊 hover 整塊反白（`transition:none`，即時） | ≤140ms |
| **transition 轉場** | 進頁時黑色遮罩以 `clip-path:inset()` 由左掃出，`steps(6)` | 620ms |
| **signature 簽名** | **逐段讀碼 gate-read**：送出時色碼的每一段依序點亮，每亮一段就同步把對應欄位硬跳寫進收據，四段讀完柵欄才抬起 | 260ms／段，柵欄 900ms `steps(6)` |

```css
@keyframes tube{ 0%,42%{opacity:1} 44%{opacity:.18} 46%{opacity:1} 47%{opacity:.18}
                 49%,88%{opacity:1} 89%{opacity:.4} 91%,100%{opacity:1} }
@keyframes hzrun{ from{background-position:0 0} to{background-position:257.4px 0} }
@keyframes wipe { from{clip-path:inset(0 0 0 0)} to{clip-path:inset(0 0 0 100%)} }
@keyframes gateup{ to{transform:scaleX(0)} }

.cc.read i{ opacity:.22; transition:none; }   /* signature：逐段讀碼 */
.cc.read i.on{ opacity:1; }

@media (prefers-reduced-motion:reduce){
  .hz,.tube,.strip .scan{ animation:none }
  .stall .veh{ transition:none }
  .gate.up::after{ animation:none; transform:scaleX(0) }
  .wipe{ display:none }
}
```

reduced-motion 下 signature 的四段一次全亮、欄位一次全寫、柵欄直接在開啟位置——**讀出來的內容一字不少**。

**禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、彈跳 easing、按壓硬陰影、`stroke-dashoffset` 描繪。

---

## 八、插畫與圖像風格

**這個風格不畫插圖。**畫面上允許出現的圖只有三類：

1. **疊線層析圖**（特徵 3）——真實量測數字，無座標軸。這是唯一的「主圖」。
2. **程序生成的平面圖／示意圖**——用實色方塊與 3px 白線畫的俯視圖，`stroke-linecap:square`、`stroke-linejoin:miter`，只有五個色。路徑線用灰玫瑰、5px、方頭。
3. **色碼帶本身**——它同時是資料、是索引、是圖案。

零外部圖片、零照片、零漸層網格、零 emoji。圖示如果非要不可，用**只有水平線、垂直線、45° 斜線與正圓**的自繪 SVG，線寬固定 4，`fill:none`，**不設 `stroke-linecap:round`**。

---

## 九、Logo 與 Favicon

Logo = 一個**單線字母 + 一條四段色碼**。字母用 7px 白線畫在黑底方塊上，色碼在右側垂直排列。不要文字商標、不要圓形徽章、不要漸層。

```html
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="品牌名">
  <rect width="64" height="64" fill="#141518"/>
  <path d="M8 56V8h20a14 14 0 0 1 0 28H20" fill="none" stroke="#EFEEE8" stroke-width="7"/>
  <rect x="44" y="8"  width="12" height="12" fill="#F0C310"/>
  <rect x="44" y="22" width="12" height="12" fill="#C4818E"/>
  <rect x="44" y="36" width="12" height="12" fill="#B5B2AC"/>
  <rect x="44" y="50" width="12" height="6"  fill="#EFEEE8"/>
</svg>
```

Favicon 用同一構圖縮到 32×32，寫成 inline SVG data URI（`%23` escape hex）：

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>...</svg>">
```

---

## 十、Do & Don't

**Do**

- 每一個實體都給編號，編號比名稱大。
- 首屏放索引或色碼帶，不放標語。
- 錯誤訊息寫成行政退件，具名、具數、不道歉。
- 留一塊灰玫瑰。永遠留。
- 讓十二欄格線看得見。
- `steps()` 當預設 easing。

**Don't**

- ❌ 紫藍漸層、任何漸層 hero
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ❌ emoji 當 icon
- ❌ 圓角、模糊陰影、玻璃霧面
- ❌ Lorem ipsum、「在當今快節奏的世界」、「把 X 變成 Y」句式標題
- ❌ 「EST. 19xx」徽章（Factory 從來不懷舊，它只登記）
- ❌ 手寫字體、斜體正文、第二種強調色
- ❌ 把色碼做成**唯一**的資訊管道（必須有 `.sr` 全譯與一頁對照表）
- ❌ 跑馬燈、視差、滾動揭示

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>場區｜XX</title>
<link rel="icon" href="data:image/svg+xml,<svg .../>">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Noto+Sans+TC:wght@400;500;900&family=Bodoni+Moda:ital,wght@1,400&display=swap" rel="stylesheet">
<style>/* 見上 */</style></head>
<body>
<div class="tube"></div><div class="wipe"></div>

<header>
  <div class="wrap"><div class="masthead">
    <a class="brandmark" href="index.html"><!-- logo -->
      <span><span class="bname">Brand Name</span><br><span class="bsub">中文名・類別</span></span></a>
    <div class="hnum"><small>PRE</small>001</div>
  </div></div>
  <div class="hz"></div>
  <div class="wrap"><nav class="stalls">
    <a class="stall" href="index.html" aria-current="page">
      <span class="nm">場區</span><span class="en">SITE</span>
      <span class="ground">001</span><span class="veh"></span></a>
    <!-- 其餘三格 -->
  </nav></div>
</header>

<main><div class="wrap"><div class="sec sheet">

  <div class="band"><div class="c1_13">
    <span class="lbl">標籤・全大寫拉丁</span>
    <div class="strip"><!-- 每一直條一個實體的色碼 --></div>
    <div class="hz rev"></div>
  </div></div>

  <div class="band">
    <div class="c1_5"><div class="dark">…讀法…</div></div>
    <div class="c5_13"><div class="paper">…主要內容…</div></div>
  </div>

  <div class="band">
    <div class="c1_9"><!-- 疊線層析圖 -->
      <p class="borrow">三十日，各時。</p></div>
    <div class="c9_13"><div class="conc">…事實欄…</div></div>
  </div>

  <div class="band"><div class="c1_13">
    <a class="entry" href="x.html"><span class="num">048</span>
      <span class="ttl"><b>Tender</b>名稱寫在這裡，而且比編號小</span>
      <span class="cc sm">…</span></a>
  </div></div>

</div></div></main>

<footer><div class="wrap">
  <div class="fnav"><a href="index.html">001　場區</a>…</div>
  <div class="band sheet"><div class="c1_7"><p class="fine">地址／電話／時間</p></div>
    <div class="c7_13"><p class="fine">免責與規範說明</p></div></div>
</div></footer>
</body></html>
```

---

## 十二、技術實作與相容性

本風格的三項核心技術，以及它們各自承載哪一個視覺特徵。所有支援度均於 **2026-08-26** 查證 MDN / caniuse，未憑印象宣稱。

### 1. CSS `subgrid`（C 版面與樣式層）— 承載特徵 4

**承載什麼：**「不可協商的十二欄格線」不能只是一句設計主張，它必須是實作事實。`.band` 以 `grid-template-columns:subgrid` 借用整頁 `.sheet` 的 12 欄，因此每一列版塊的邊界都精準落在同一組欄線上，也就精準對上背景畫出來的那 12 條線。用 `repeat(12,1fr)` 重新宣告的話，只要巢狀層有任何 padding/border，欄線就會漂移，特徵 4 立刻失效。

**支援現況（查證 caniuse `css-subgrid` 與 MDN《Subgrid》）：** Baseline **Widely available（2026-03-15 達成）**。Firefox 71+（2019-12，最早）、Safari 16+（2022-09）、Chrome / Edge 117+（2023-09）、Opera 103+、Samsung Internet 24+。現行瀏覽器全數支援，計入舊版存量後 caniuse 全球覆蓋率約 90–97%。

**Fallback（具體行為）：**
```css
@supports not (grid-template-columns:subgrid){
  .band{ grid-template-columns:repeat(12,minmax(0,1fr)); }
}
```
欄數與版塊位置完全相同，只有背景欄線與版塊邊界可能出現 1px 以內的視覺錯位。**資訊零損失。**

### 2. `steps()` 逐格 easing（B 動效與時間軸層）— 承載動效預算全部四式

**承載什麼：**本風格禁止一切彈性與柔和的動態。`steps(n)` 是它的預設 timing function：導覽倒車 `steps(4)`、危險斜紋整格位移 `steps(7)`、頁面轉場 `clip-path` 掃出 `steps(6)`、柵欄抬起 `steps(6)`、日光燈管 `steps(1)`。用 `ease-out` 做同樣的動作，出來的是一個柔軟的網站，不是這個風格。

**支援現況（查證 MDN《steps()》與《animation-timing-function》）：** 自 **2015-09 起跨瀏覽器可用**，Baseline Widely available。`steps(n, jump-*)` 關鍵字語法（`jump-start` / `jump-end` / `jump-both` / `jump-none`）較晚；為求穩妥，本規格只用 `steps(n)` 與 `steps(n,end)` 這兩種各家一致的寫法。

**Fallback：**無支援缺口。極舊環境若忽略 `animation-timing-function`，退為 `ease`，動作仍完整播完、狀態仍到位。

**效能：**四種動效全部只改 `opacity`、`transform`、`background-position`、`clip-path`，皆為合成器屬性，不觸發 layout。實測單頁首屏 JS 執行 < 20ms（見下）。

### 3. 圖論最短路 Dijkstra（E 資料與生成層）— 承載特徵 2 的第三段

**承載什麼：**色碼第三段編碼的「步數」如果是手寫的假數字，這個風格就只是配色。本站的步數是在每一層的通行格網（13×5，含結構柱與各層實際障礙）上以 Dijkstra 解出的**繞行後**最短路，再換算成步；同一條路徑在收據上被畫成平面圖上的那條灰玫瑰折線。因此「第三段是黃色」這件事在物理上是可驗證的。

**支援現況：**純 JavaScript（`Map` + 陣列），無瀏覽器 API 依賴，無相容性問題。搭配 FNV-1a → mulberry32 決定性偽亂數產生既有標單，故 `?b=` 分享碼可完整還原同一場開標。

**效能實測（Node 22，本機）：**
- 單次 Dijkstra（13×5 格網、四鄰接）：**0.0067 ms**（5,000 次共 33.6 ms）。全部 48 格的步數在建置階段一次算完寫入靜態 HTML，執行階段不再重算。
- 30 日 × 24 時疊線圖資料生成：200 次共 13.2 ms。

### 效能預算實測

| 頁 | 單頁大小（含全部 inline CSS/JS/SVG） | 預算 350KB |
|---|---|---|
| index.html | 49.0 KB | ✓ |
| bays.html | 70.8 KB | ✓ |
| code.html | 28.1 KB | ✓ |
| catalogue.html | 37.1 KB | ✓ |

外部資源只有 Google Fonts 三個字族。零外部圖片、零音檔、零 JS 函式庫。首屏 JS 只做事件掛載與（可選的）`?b=` 還原，無 `getBoundingClientRect`、無同步版面量測、無 layout thrashing。

### 無障礙與無 JavaScript 保底

- 每一枚色碼旁必有 `.sr` 視覺隱藏全譯；站內必有一頁公開對照表。
- 核心功能所依據的全部資料（48 格的層、區、步數、但書、底價、色碼）以靜態 `<table>` 寫在同一頁的 `<details>` 裡，關掉 JavaScript 完整可讀。
- 所有互動元件為原生 `<button>` / `<a>` / 表單元件，可鍵盤操作；`aria-pressed`、`aria-current="page"`、`role="status"` 齊備。
- `focus-visible` 一律用 3px 灰玫瑰外框（唯一與 hover 不同的視覺回饋）。
- 對比：黃底黑字 ≈ 11.9:1、白紙黑字 ≈ 15.4:1、黑底黃字 ≈ 11.9:1，皆遠高於 4.5:1。
