---
name: punk-xerox
description: Ransom-note lettering cut from the page's own text, day-glo paper stocks and a single black toner, rendered through a photocopier that has no grey — the 1976–79 British punk fanzine and Jamie Reid sleeve language, rebuilt as a threshold-and-dilate pipeline.
---

# 龐克剪貼 Punk Xerox — 風格規格書

> 流派來源（真實外部參照，非自創）：
> **Jamie Reid**（Sex Pistols《Anarchy in the UK》1976、《God Save the Queen》1977、《Never Mind the Bollocks》1977 的螢光粉／螢光黃與勒索信字）、
> **Mark Perry《Sniffin' Glue》**（1976–77，倫敦，全手寫＋打字機＋影印，第一期只印了五十份）、
> **Linder Sterling** 與曼徹斯特一帶的拼貼實踐、
> 以及使它成立的那台機器：一九七〇年代普及的**乾式靜電影印機（xerography）**——它沒有灰階，只有門檻。
>
> 與其他拼貼流派的分界：**達達照相蒙太奇**（Höch／Heartfield，1916–24）拼的是攝影圖像與意義；**龐克剪貼**拼的是**字**，而且它的視覺特徵幾乎全部來自複印這個動作本身（門檻化、碳粉擴散、掃描歪斜、紙的螢光）。前者是暗房與剪刀，後者是影印機與膠帶。

---

## 一、設計哲學

**這個風格的作者不是設計師，是那台機器。**

一九七六年的倫敦，一個人要做一張海報，手上有的是：報紙、剪刀、膠水、透明膠帶、一台影印機、以及影印店櫃檯上那疊便宜的螢光色紙。他沒有照相排版機，所以標題只能從別的印刷品上剪下來拼。他沒有網版，所以顏色只有紙的顏色。他印第二版的時候懶得回去找原稿，就拿第一版再影印一次——於是黑的地方胖了一點。

三件事因此同時成立：

1. **字是實體。** 標題不是「排版」出來的，是一片一片剪下來貼上去的紙。每一片有自己的字體、自己的大小、自己的底色、自己的角度，而且**永遠對不齊**。對齊是照相排版才有的能力。
2. **沒有灰。** 影印機對每一個點只問一句話：比門檻黑，還是比門檻白。要表現灰，只能用網點假裝。所以這個風格裡不存在漸層、不存在陰影模糊、不存在半透明——只有黑、白，跟一堆 45 度的小圓點。
3. **每一次複製都是損失。** 拿影本再去影印，黑塊會膨脹、細線會消失。這不是瑕疵，是**版面層次的來源**：同一張東西的第一代與第五代並排，你不需要字級或陰影就分得出前後。

判準：**這張東西看起來像是被機器咬過一口，而不是被軟體排出來的。**

---

## 二、本風格的 5 個不可省略特徵

以下每一項都是「拿掉它就不是這個風格了」。五項全部要在畫面上看得見。

### 特徵 1：勒索信剪貼字（ransom-note lettering）

標題的每一個字元是獨立的一片紙：各自的字族、字重、字級、底色、旋轉、基線位移、以及 1.5px 的**硬**投影。全行沒有兩個字對齊，也沒有兩個字同樣大。

```css
.cut{
  display:inline-block;
  font-family:var(--ff);          /* 每個字不同：sans 900 / serif 900 / 打字機 / 極粗拉丁 */
  font-weight:var(--fw);
  font-size:var(--fz);            /* 基準 ±20% 隨機 */
  line-height:1.02;
  background:var(--bg);           /* 粉 / 黃 / 白 / 黑，四選一 */
  color:var(--fg);
  padding:var(--py) var(--px);
  margin:0 .5px;
  transform:translateY(var(--dy)) rotate(var(--rt)) scaleX(var(--sx));
  box-shadow:1.5px 1.5px 0 #111;  /* 硬陰影，blur 一律 0 */
  clip-path:polygon(1% 3%,32% 0,68% 4%,100% 1%,98% 34%,100% 70%,99% 99%,
                    63% 96%,30% 100%,2% 97%,0 62%,2% 30%); /* 撕邊，備 5–6 種輪替 */
}
/* 找不到可剪的字：用麥克筆補寫＝空心字 */
.cut.hand{background:none;box-shadow:none;color:transparent;-webkit-text-stroke:1.6px #111;font-weight:900}
```

隨機範圍建議：`rotate ±4.2deg`、`translateY ±8%字級`、`scaleX 0.86–1.30`、`font-size ×0.82–1.22`。**用決定性亂數**（同一個標題永遠長一樣），不要用 `Math.random()`。

### 特徵 2：只有兩種紙，只有一種墨

紙只有兩種螢光色，墨只有碳粉黑。第三種顏色不存在——不是「盡量少用」，是**沒有**。淺色的「白」只是原稿紙，深色的「灰」只是影印機壓板本身。

```css
:root{
  --pink:#FF3D7F;  /* day-glo 螢光粉紙 */
  --yell:#EDE81C;  /* day-glo 螢光黃紙 */
  --ink :#111111;  /* 碳粉黑，唯一的墨 */
  --mach:#D5D2C7;  /* 影印機壓板／沒有貼到紙的牆 */
  --white:#F4F2EA; /* 原稿紙 */
}
/* 禁止：linear-gradient / radial-gradient / opacity 疊色 / box-shadow 有 blur */
```

唯一允許的半透明是**膠帶**（白色 12–42%），因為膠帶本來就是透明的。

### 特徵 3：影印世代（generation loss）

同一份東西必須同時以不同世代出現在畫面上。世代差＝版面層次。做法是一條純 SVG 濾鏡鏈：去彩 → RGB 與 alpha 都硬切兩階 → 碳粉擴散。

```html
<svg width="0" height="0" style="position:absolute">
 <filter id="xg3" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
   <feColorMatrix type="saturate" values="0"/>
   <feComponentTransfer>
     <feFuncR type="discrete" tableValues="0 0 0 0 0 1 1 1 1 1 1 1"/>
     <feFuncG type="discrete" tableValues="0 0 0 0 0 1 1 1 1 1 1 1"/>
     <feFuncB type="discrete" tableValues="0 0 0 0 0 1 1 1 1 1 1 1"/>
     <feFuncA type="discrete" tableValues="0 0 0 1 1 1 1 1 1 1 1 1"/>
   </feComponentTransfer>
   <feMorphology operator="dilate" radius="0.5"/>
 </filter>
</svg>
```

五個世代的參數（`thr` = RGB 門檻、`thrA` = alpha 門檻、`dil` = dilate 半徑）：

| 世代 | thr | thrA | dil | 看起來 |
|---|---|---|---|---|
| 1 | .50 | .50 | 0 | 銳利，邊緣沒有反鋸齒 |
| 2 | .47 | .42 | 0.25 | 黑的地方開始胖 |
| 3 | .43 | .34 | 0.5 | 細的字開始黏在一起 |
| 4 | .38 | .26 | 0.85 | 看不出誰對誰 |
| 5 | .33 | .18 | 1.3 | 只知道這是一張單子 |

**關鍵規則：濾鏡只能套在「墨層」上，不能套在紙上。** 影印機不會把粉紅色的紙吃掉，被吃掉的是墨。所以結構永遠是「彩色紙的容器」包住「一個套了濾鏡的墨層」：

```html
<div class="flyer" style="background:var(--pink);clip-path:polygon(…);filter:drop-shadow(5px 5px 0 #111)">
  <div class="ink" data-g="3"><!-- 全部內容 --></div>
</div>
```

```css
.ink[data-g="3"]{filter:url(#xg3)}
```

### 特徵 4：45 度半調網點

任何「照片」都必須先被門檻化成純黑白，灰階只能靠 45 度網格上的小圓點大小去逼近。點的直徑 = `maxR × sqrt(灰度)`（面積與灰度成正比，這是網點該有的關係）。

```js
// 45 度網格：橫向步距 c = cell/√2，列間再乘 0.86，奇數列偏移半格
const c = cell * Math.SQRT1_2;
for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
  const x = i * c + (j % 2 ? c / 2 : 0), y = j * c * 0.86;
  const g = grey(x, y);                 // 0..1
  if (g <= 0.02) continue;
  const r = maxR * Math.sqrt(g);        // ← 面積正比
  if (r < 0.35) continue;
  out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/>`);
}
```

`cell` 建議 6–10px：**點要大到看得見**。看不見網點就等於在做灰階，這個風格就關掉了。

### 特徵 5：膠帶、訂書針與撕邊

任何兩片紙的接合處必須有物理接合物；紙邊一律是撕的，不是切的；投影一律 1–5px、blur 0、45 度方向。

```html
<!-- 膠帶：兩側鋸齒撕痕 + 兩條反光線 -->
<g transform="translate(4 6) rotate(-4.2)">
  <path d="M0 0 L8 -1.1 L16 1.3 L24 -1.1 …L100 0 L100 20 L92 21.3 …Z" fill="#fffdf0" opacity=".42"/>
  <path d="M0 0H100V20H0Z" fill="#fff" opacity=".14"/>
  <path d="M0 1.5H100" stroke="#111" stroke-width=".5" opacity=".22"/>
  <path d="M0 18.5H100" stroke="#111" stroke-width=".5" opacity=".22"/>
</g>
<!-- 訂書針 -->
<path d="M-7 -3 L-7 3 M-7 -3 L7 -3 M7 -3 L7 3" stroke="#111" stroke-width="2.1" fill="none"/>
```

撕邊的做法：沿矩形四邊每 9–17px 取樣一點，往法線方向推 `(rand()-0.35) × amp`，偶爾（12% 機率）推 2.4 倍造成缺口，再連成多邊形。用 `clip-path:polygon()`（HTML）或 `<path>`（SVG）。**不要用 `border-radius`，不要用 `feTurbulence` 抖邊**——那是迷幻海報的語彙，會把字緣糊掉。

---

## 三、色彩系統

| 角色 | Hex | 佔比 | 用途 |
|---|---|---|---|
| 螢光粉紙 day-glo pink | `#FF3D7F` | ~26% | 紙。主單、選手卡、重點紙片 |
| 螢光黃紙 day-glo yellow | `#EDE81C` | ~20% | 紙。另一半的紙片、現用態、被選中的東西 |
| 碳粉黑 toner | `#111111` | ~22% | 唯一的墨：所有文字、線、黑底條、投影 |
| 影印機灰 platen | `#D5D2C7` | ~24% | 頁面的地色。它不是紙，是「沒有貼紙的地方」 |
| 原稿紙 stock white | `#F4F2EA` | ~8% | 只給原稿與白底紙片；不是純白（純白是螢幕，不是紙） |

規則：

- **粉與黃永遠不漸層、不疊色、不半透明。** 兩張紙相疊就是相疊，上面那張完全遮住下面那張。
- 黑只有一種黑。不要 `#333`、不要 `rgba(0,0,0,.6)`。
- 地色 `--mach` 上疊一層極淡（5.5%）的縱向碳粉條紋（1px 寬、隨機間距），這是影印機滾筒的痕跡，不是紋理裝飾。
- **調色盤查重提示**：粉＋黃＋黑很容易撞上 Y2K／普普／賽博龐克。分辨的關鍵不是色票而是**結構**——這裡的粉不是「強調色」，是**紙**；它以大面積、有撕邊、有投影、可被壓在另一張紙下面的形式存在。

---

## 四、字體系統

這個風格**沒有**字體選擇，只有「你手上剪得到什麼」。所以：**同一行字裡至少出現 3 種不同字族**。

| 角色 | 字族 | 字重 | 用途 |
|---|---|---|---|
| 剪貼字 A | Noto Sans TC | 900 / 500 | 主要的剪片 |
| 剪貼字 B | Noto Serif TC | 900 / 600 | 從報紙剪來的那些 |
| 剪貼字 C | Archivo Black | 400 | 極粗拉丁，數字與英文 |
| 剪貼字 D | Special Elite | 400 | 打字機字，fanzine 的內文語彙 |
| 內文 | Noto Sans TC | 500 | 16px / 行高 1.8 |
| 標籤與編號 | Special Elite | 400 | 11–12.5px，字距 `.12–.2em` |

字級 scale（只有四級，因為剪刀只有四種尺寸）：

```
剪貼大標 clamp(30px, 6vw, 52px)  ·  剪貼中標 26–34px
內文 16px / 1.8                  ·  小字（打字機）11.5px / 1.7，字距 .13em
```

**禁止**：可變字型軸動畫、字距漸變、`text-wrap:balance` 之類的優雅排版。這個風格的排版品質下限就是它的美學。

---

## 五、版面與網格

**沒有網格。** 有的是「一面牆」與「貼在上面的紙」。

- 頁面地色 = 牆／壓板。內容一律裝在紙片（`.scrap`）裡：`clip-path` 撕邊 + `filter:drop-shadow(3px 3px 0 #111)`。
- 主要內容欄 `max-width:1180px`，但**紙片可以超出、可以互相壓邊、可以歪 −6°～+7°**。
- 旋轉只給紙片，不給文字段落（文字歪了就讀不了；讓紙歪，字在紙上是正的）。
- 留白率約 20–30%：比迷幻海報鬆（那是 horror vacui），比瑞士國際緊。留白的地方要露出地色，讓人看得出「這裡沒有貼紙」。
- 兩欄式 `1fr 1fr`，≤860px 塌成單欄。表格一律 2px 實線黑框、無圓角、偶數列 5% 黑底。

---

## 六、元件配方

### 6.1 導覽（本站用「訂書針角」原型）

四頁＝四張被同一枚訂書針釘在右上角的紙。現用頁那張翻到最上面（`rotate(-1.6deg)`、黃紙、左上一條粉色標記），其餘三張分別 `rotate(3.5/7/10.5deg)` 扇形露出右下角。語意是**疊序**：誰在最上面。

```css
.stapled{position:fixed;top:12px;right:14px;width:214px;height:158px;z-index:60}
.stapled a{position:absolute;left:8px;top:6px;width:190px;height:120px;
  background:var(--white);border:2.5px solid var(--ink);transform-origin:10px 8px;
  transition:transform 90ms steps(3,end);filter:drop-shadow(2px 2px 0 rgba(17,17,17,.9))}
.stapled a.n1{transform:rotate(10.5deg)} .stapled a.n2{transform:rotate(7deg)}
.stapled a.n3{transform:rotate(3.5deg)}  .stapled a.n4{transform:rotate(0)}
.stapled a.on{z-index:8;transform:rotate(-1.6deg);background:var(--yell)}
```

≤900px 攤平為頂部四格 sticky 橫列（現用格黑底黃字＋上方一條粉線），頁尾另備完整文字連結。

### 6.2 按鈕

```css
.btn{background:var(--pink);color:var(--ink);border:2.5px solid var(--ink);padding:9px 16px;
     font-weight:900;box-shadow:3px 3px 0 var(--ink);transition:transform 70ms steps(2,end)}
.btn:hover{transform:translate(1.5px,1.5px);box-shadow:1.5px 1.5px 0 var(--ink)}
.btn.sel,.btn[aria-pressed="true"]{background:var(--ink);color:var(--yell)}
```

按下的位移用 `steps(2)`，不要用 ease——按鈕是機械的。

### 6.3 卡片／紙片

```css
.scrap{position:relative;background:var(--white);padding:20px 22px;
       filter:drop-shadow(3px 3px 0 #111)}
.scrap.p{background:var(--pink)} .scrap.y{background:var(--yell)}
.scrap.k{background:var(--ink);color:var(--white)}
```
搭配 inline `style="clip-path:polygon(…)"`（每一片用自己的 seed 生成撕邊，同一片永遠一樣）。

### 6.4 表單

輸入框：3px 實線黑框、無圓角、`border-radius:0`（要明寫，否則 iOS 會自己加）、focus 時 `box-shadow:4px 4px 0 var(--pink)` 而不是外框光暈。錯誤訊息是一條黑底黃字的長條，不是紅字。

### 6.5 頁尾

整塊黑底（`--ink`）白字，連結用黃色。放一台影印機的 SVG，指示燈用方波閃。

---

## 七、動效規則

四種性質不同的動態，缺一不可。**所有 easing 一律 `steps()`**：這個風格裡沒有連續運動，只有機械的離散跳格。

| 類型 | 內容 | 觸發 | 參數 |
|---|---|---|---|
| ambient 環境 | 影印機指示燈方波閃爍 | 不需輸入，持續 | `animation:lamp 1.4s steps(2,jump-none) infinite`，opacity 1 ↔ .18 |
| input-driven 輸入 | 剪片被滑過時抬起、轉角加大並顯示出處 | hover / focus | `transition:transform 70ms steps(2,end)`；`translateY(-3px) rotate(1.7×)` |
| transition 轉場 | 出紙：內容由上而下逐段刷出 | 狀態切換 | `@keyframes eject{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}` `.38s steps(14,end)` |
| signature 簽名 | **再影印一次**：進紙動作＋世代 +1，門檻位移、碳粉擴張、細節掉失 | 按鈕 | `feed .42s steps(3,end)` ＋ `data-g` 遞增 |

`prefers-reduced-motion` 降級（**資訊零損失**）：
- 指示燈固定為亮。
- hover 保留出處提示，取消位移。
- 出紙改為直接顯示。
- 「再影印一次」不播機器動作，直接切到下一世代的畫面——劣化的結果仍然完整可見，只是沒有動畫。

---

## 八、插畫與圖像風格

**零外部圖片。** 所有圖像由同一條管線輸出：向量部件 → 灰度場 → 45 度網點 → 影印濾鏡。

三種原語，不多不少：

1. **半調照片**：人／物由幾塊不同灰度的橢圓、矩形、三角組成（頭、頸、肩、顴影、眉窩、髮／頭套／帽），再過網點。粗糙是對的——影印過的相片本來就認不太出人。
2. **剪片**：每一塊圖與每一個字都在一張有撕邊、有硬投影的紙上。
3. **膠帶與訂書針**：只出現在兩片紙的接合處，不當裝飾灑。

判準：**拿掉顏色，仍然讀得出「這是被剪下來貼上去的，而且它被影印過幾次」。**

明文禁用：`feTurbulence`／`feDisplacementMap` 手抖邊（迷幻海報語彙）、細線幾何線描、寫實描繪、任何形式的漸層網格。

---

## 九、Logo 與 Favicon

Logo = 兩張相疊的螢光紙 + 用**黑色實心方塊**拼出來的字。字不是字型，是方塊——因為在影印之後，小字的細節本來就會消失成方塊。上緣壓一枚訂書針。

```svg
<svg viewBox="0 0 220 84">
  <path d="M4 12 L96 6 L100 62 L8 70 Z" fill="#FF3D7F"/>
  <path d="M104 22 L214 14 L218 74 L108 80 Z" fill="#EDE81C"/>
  <g fill="#111"><rect x="14" y="18" width="30" height="30"/><rect x="50" y="14" width="12" height="34"/>…</g>
  <path d="M48 2 v14 M48 2 h20 M68 2 v14" stroke="#111" stroke-width="5" fill="none"/><!-- 訂書針 -->
  <path d="M0 76 h220" stroke="#111" stroke-width="4"/>
</svg>
```

Favicon 是同一件事縮到 32×32：兩張歪的紙（粉在後、黃在前）＋幾條黑塊＋一枚針。用 inline SVG data URI 寫在 `<head>`，不要 .ico。

---

## 十、Do & Don't

**Do**

- 讓標題的字互相碰撞、互相壓邊、大小不一。
- 讓紙片超出容器、壓到別的紙片、歪個幾度。
- 讓同一份東西以不同影印世代同時出現。
- 讓網點大到看得見。
- 用決定性亂數，讓同一個標題每次載入長得一模一樣。
- 文案用具體的、有口音的、會被寫在紙上的句子。

**Don't**

- ✗ 任何漸層（含紫藍 hero 漸層）、任何模糊陰影、任何 `border-radius`。
- ✗ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ✗ emoji 當 icon。
- ✗ Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）。
- ✗ 「EST. 19xx」年份徽章。
- ✗ 把亂七八糟當成風格：**版面可以歪，資訊不可以找不到**。所有內容必須是可選取的一般 HTML 文字，沒有 JavaScript 也讀得完。
- ✗ 用真實人物的臉。這個流派歷史上大量挪用名人肖像，但那是一九七七年的事，現在不要。
- ✗ 把濾鏡套在整張彩色紙上（紙會變成黑的）。濾鏡只套墨層。

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,%3Csvg …%3E">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;900&family=Noto+Serif+TC:wght@600;900&family=Archivo+Black&family=Special+Elite&display=swap" rel="stylesheet">
<style>
:root{--pink:#FF3D7F;--yell:#EDE81C;--ink:#111;--mach:#D5D2C7;--white:#F4F2EA}
body{margin:0;background:var(--mach);color:var(--ink);font:500 16px/1.8 'Noto Sans TC',sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:0 clamp(16px,3vw,34px) 90px}
</style></head>
<body>

<!-- 1. 濾鏡定義（五個世代） -->
<svg class="defs" aria-hidden="true" style="position:absolute;width:0;height:0">
  <filter id="xg1" …>…</filter> … <filter id="xg5" …>…</filter>
</svg>

<!-- 2. 訂書針角導覽（≤900px 有另一組 sticky 橫列） -->
<nav class="stapled">…</nav>

<!-- 3. 頁首：logo 紙片 + 打字機字條 -->
<header class="wrap mast">…</header>

<main class="wrap">
  <!-- 4. 首屏：一整張紙（彩色紙容器 → 墨層 → 內容） -->
  <section class="stage">
    <div class="wallcopies">…同一張單子的第 2–5 代，歪斜壓邊…</div>
    <div class="flyer" style="background:var(--pink);clip-path:polygon(…);filter:drop-shadow(5px 5px 0 #111)">
      <div class="ink" data-g="1">
        <div class="fhead"><span class="ransom">…剪貼字…</span></div>
        <div class="fbar">日期・時間・地址</div>
        …
      </div>
      <svg class="ftape">…膠帶…</svg><svg class="fpin">…訂書針…</svg>
    </div>
    <button class="btn k" id="rexerox">再影印一張</button>
  </section>

  <!-- 5. 一般段落：紙片 + 表格 -->
  <section>
    <h2><span class="ransom">…</span></h2>
    <div class="two">…</div>
  </section>
</main>

<footer class="foot">…黑底、黃連結、影印機 SVG…</footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站三項核心技術，皆於 2026-08-13 查證支援度後採用。

### 12.1 SVG 濾鏡：`feComponentTransfer type="discrete"` ＋ `feMorphology`（A 渲染層）

- **承載什麼**：特徵 3（影印世代）與特徵 2（沒有灰）。`discrete` 的傳輸函數 `v = tableValues[floor(C × n)]`——給它一個「前 k 個 0、其餘 1」的表，就得到真正的門檻化，而不是提高對比。`feMorphology operator="dilate"` 承載碳粉擴散。**RGB 與 alpha 都要切**：只切 RGB 的話，透明背景上的黑字（RGB 恆為 0）完全不會變化。
- **支援現況（查證：MDN《feComponentTransfer》《feFuncA》《feMorphology》、SVG 1.1 Filter Effects）**：三者皆屬 SVG 1.1 濾鏡基元，現行 Chrome／Edge／Safari／Firefox 全面支援，屬 Baseline Widely available。
- **Fallback**：`@supports not (filter: url(#x))` 或濾鏡未套用時，內容退回**已經是純黑白兩色的向量**（半調點與黑條在建置階段就算好了），畫面仍然是完整的影印風，只是失去世代差。**資訊零損失**——世代差在頁面上另有文字說明與並排對照。
- **效能實測**：濾鏡只套在墨層，且以 IntersectionObserver 限制同時套用的元素數（見 12.3）。24 張小傳單的頁面實測濾鏡元素同時最多 8–10 個。

### 12.2 `steps()` 逐格 easing（B 動效與時間軸層）

- **承載什麼**：四種動效的全部時間曲線。影印機是離散機械：燈是方波（`steps(2,jump-none)`）、進紙是三格（`steps(3,end)`）、出紙是十四格（`steps(14,end)`）、按壓是兩格。**用 `ease` 就等於把這個風格關掉**——連續補間屬於螢幕，不屬於機器。
- **支援現況（查證：MDN《steps() CSS function》／《\<easing-function\>》）**：MDN 標示 *This feature is well established and works across many devices and browser versions*，自 **2015 年 7 月**起跨瀏覽器可用（Baseline Widely available）。`jump-none` 等關鍵字為後續補充，本站僅在指示燈使用，退化為預設 `end` 時視覺無差別。
- **Fallback**：不支援 `steps()` 的環境會退回 `linear`，動畫仍會發生、狀態仍會改變。
- **`prefers-reduced-motion`**：四種動效全部縮到 0.001ms 並保留終態，見第七章。

### 12.3 `IntersectionObserver`（D 輸入與感測層）

- **承載什麼**：**效能預算**。單頁最多 30 個帶濾鏡的元素（24 張歷史傳單＋6 張選手照），若全部同時套 `feMorphology`，首屏合成成本會爆掉。IO 在元素離開視窗（`rootMargin:'320px 0px'`）時把 `data-g` 暫存並移除，回到視窗再放回去——濾鏡是按需付費的。
- **支援現況（查證：MDN《IntersectionObserver》）**：Baseline Widely available，自 2019 年起跨瀏覽器（Safari 12.1+、Firefox 55+、Chrome 51+）。
- **Fallback**：`if ('IntersectionObserver' in window)` 包住；不支援時所有 `data-g` 保持在 HTML 裡的靜態值，濾鏡照常全部套用，只是首屏多花一點合成時間。畫面與資訊完全相同。

### 12.4 效能預算實測（2026-08-13）

| 頁 | 單檔大小（含全部 inline 資源） | 節點 | 判定 |
|---|---|---|---|
| index.html | 85.8 KB | 6 張小傳單 + 主單 | ✓ ≤350KB |
| roster.html | 336.9 KB | 24 張小傳單 + 6 張半調肖像（5,536 個網點圓） | ✓ ≤350KB |
| mic.html | 121.6 KB | 6 張中型半調肖像 + 執行期剪貼引擎 | ✓ ≤350KB |
| tickets.html | 46.6 KB | 表單 + 地圖 SVG | ✓ ≤350KB |

外部資源只有 Google Fonts（四個字族），零外部圖片、零外部腳本、零音檔。
半調網點以「面積正比 + 半徑 <0.35 即略過 + 座標取一位小數」壓縮，1,440 個 sixel 的原型測試在 Node 上耗時 1ms；建置期就算完並輸出成靜態 SVG，執行期不重算，故首屏 JS 只有事件綁定與 IO 註冊（<100ms）。

### 12.5 為什麼不用某些看似合理的技術

- **Unicode 區塊字元／點陣字型**：字元格會被系統字型的覆蓋率綁架，且無法做撕邊與旋轉。改用向量 + `clip-path`。
- **`feTurbulence` 抖邊**：那是迷幻海報的語彙，且會糊掉字緣，與特徵 1 直接衝突。
- **Canvas 2D 畫半調**：可行，但 canvas 的內容不能被選取、不能被讀屏、不能被搜尋。本站的圖像是 SVG，文字是真的文字。

---

*本規格書由 Claude Opus 5（排程 Agent）撰寫於 2026-08-13。範例站：`sites/phahthih/`。*
