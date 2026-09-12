---
name: rosta-window
description: Soviet ROSTA Windows (Окна сатиры РОСТА, 1919–1921) — hand-cut stencil agitprop windows: a numbered grid of narrative panels, picture above and a rhymed couplet below, flat spot-colour plates with visible misregistration, no lines at all, and figures identified by silhouette attributes alone.
---

# ROSTA 窗 Окна РОСТА — 風格規格書

> 這不是「蘇聯風」，也不是「構成主義」。ROSTA 窗是一個**媒介**：一張被切成格子的紙，用厚紙板模版一塊顏色刷一次，貼在空店面的櫥窗上給不識字的人看。它長成那個樣子不是因為誰的品味，是因為**刀、紙與時間就只有那麼多**。做這個風格，就是把那三項限制當成設計規則。

---

## 一、設計哲學

**背景（真實歷史，可查證）**

- 1919 年 2 月，畫家 Mikhail Cheremnykh 與記者 Nikolai Ivanov 在莫斯科一間空糖果店的櫥窗裡貼出第一批「畫出來的通訊社快報」。幾週後詩人 Vladimir Mayakovsky 加入；他自估參與 3,000 張草稿與 6,000 條文案。高峰期團隊超過一百人。
- 沒有能用的印刷廠、也沒有紙。複製方式是**厚紙板模版手工套刷（трафарет，法國 pochoir 傳統的變體）**：Cheremnykh 回憶「收到原稿後，刻版師第二天就完成 25 份，第三天再 50 份，幾天內做完整批大約 300 份」，刻版師通常帶著家人一起做。
- 一張紙上是**四到十四格**的連環敘事，寄到各地以「一整排」的方式陳列。從電報進來到彩色海報上牆，最快四十分鐘到一小時。
- 讀者大多不識字，因此發展出一套**圖符文法**（禮帽＝資本家、鎯頭＝工人、麥束＝農民），後來直接影響了 Otto Neurath 與 Gerd Arntz 的 Isotype 與現代資訊圖表。
- 結構原型來自俄羅斯民間版畫 **лубок（lubok）**：粗糙的圖文並置、押韻順口的短句。
- 1921 年初 Kerzhentsev 離開後由 Glavpolitprosvet（GPP）接手一年，手工印刷的窗隨即被淘汰。

**設計律**

1. **能刻的才畫。** 設計的第一個提問不是「這樣好不好看」，而是「這把刀刻不刻得出來」。
2. **順序即版面。** 沒有主視覺、沒有大標題、沒有按鈕組。內容是一串有編號的格子，讀完一格讀下一格，最後一格收在一句口令。
3. **字是要唸的。** 每格配一副押韻的兩行短句。押韻不是裝飾，是給不識字的人的記憶裝置。
4. **手工的痕跡不修。** 套印錯位一到兩公釐、刷痕不勻、字距不齊——那是這張紙是手做的證據，修掉就變成印刷品。
5. **一個顏色一個晚上。** 多一個顏色＝多刻一塊版＋多刷一輪。所以顏色永遠 ≤4，而且每一塊都得有存在的理由。

---

## 二、本風格的 5 個不可省略特徵

> 拿掉任何一項，做出來的就不是 ROSTA 窗。每項附可直接複製的片段。

### 特徵 1｜編號分格連環（4–14 格）

整個版面先被切成等格網格，每格左上一枚圓圈編號；閱讀順序就是資訊結構。**格與格之間是實心的墨色刻線，不是 border、不是 gap 的空白。**

```css
/* 窗＝紙上的一塊墨色網格；格子是紙，線是墨 */
.cells{
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:14px; padding:14px;            /* gap 與 padding 都是刻線 */
  background:#191512;                /* ← 刻線的顏色 */
}
.cell{background:#D6CFBC}            /* 每一格是紙 */
.cell .no i{                         /* 圓圈編號 */
  width:26px;height:26px;border-radius:50%;
  background:#191512;color:#D6CFBC;
  display:grid;place-items:center;
  font-family:"Archivo Black",sans-serif;font-size:14px;
}
```

**必須跨格對齊三條線**（編號帶／圖區／對句帶）。用 `subgrid`，不要用固定高度：

```css
.cells{grid-template-rows:repeat(2, auto auto auto)}   /* 2 列 × 每格 3 條 */
.cell{grid-row:span 3; display:grid; grid-template-rows:auto auto auto}
@supports (grid-template-rows:subgrid){
  .cell{grid-template-rows:subgrid}   /* 對句一行或兩行，刻線都在同一條水平線上 */
}
```

### 特徵 2｜圖上文下，每格一副押韻對句

圖佔上三分之二、字佔下三分之一。字是**重量級粗體、兩行、撐滿格寬**——不是排版排出來的，是刻的時候照格子把字擠進去，所以每行的字距都不一樣。

```css
.cap{font-weight:900; font-size:17px; line-height:1.42; padding:8px 12px 14px}
.cap p{
  margin:0;
  text-align:justify;
  text-align-last:justify;   /* ← 關鍵：單行也被撐滿格寬，字距因此每行不同 */
}
.cap p:last-child{color:#D5321C}   /* 下句用專色，與上句分工 */
```

對句的規矩（沒有這條，格子就只是圖卡）：下句押上句的韻；一面窗的每一格用不同的韻；語氣分**譏／說／喊**三類，前段至少兩句要帶刺，**最後一格必須是口令**。

### 特徵 3｜模版可刻性：沒有一條線

**全站零 `stroke`。** 輪廓是兩塊顏色的交界，不是描邊；細節只能是從色塊裡挖出來的「紙橋」。刻刀的物理限制寫成形態學**開運算**：任何寬度小於 2r 的東西會被永久刪掉。

```html
<!-- 刻刀。radius 就是刀口，2r 以下的形（墨或紙橋）都會消失 -->
<filter id="cut" x="-20%" y="-20%" width="140%" height="140%"
        color-interpolation-filters="sRGB">
  <feMorphology operator="erode"  radius="2"/>
  <feMorphology operator="dilate" radius="2"/>
</filter>
<g filter="url(#cut)"> <!-- 每一塊版單獨過濾，因為 feMorphology 是逐通道運算 --> </g>
```

由此定出兩個硬尺寸，寫進設計規範：**最小可刻形 5 單位、最小紙橋 6 單位**。

```css
/* 禁止清單，一條都不能違反 */
* { /* 本風格沒有這些東西 */ }
.no-stroke      { stroke:none }          /* 不准描邊 */
.no-radius      { border-radius:0 }      /* 不准圓角 */
.no-shadow      { box-shadow:8px 9px 0 rgba(0,0,0,.32) } /* 陰影＝實心位移色塊，零模糊 */
/* 不准 gradient、不准 halftone、不准排線、不准 opacity 做出中間調 */
```

### 特徵 4｜專色分版 ≤4，且必見套印錯位

一個顏色一塊版，刷序**由淺到深**（土黃 → 鉛丹 → 墨），最後留下沒被刷到的紙。顏色不混合、不疊出第三色。每塊版有**固定方向**的位移——不是隨機抖動，是那塊版今天被放歪的方向。

```css
.pl{transition:transform .09s linear}
.p-ochre{transform:translate(-1.5px, 1.9px)}   /* 土黃固定往左下 */
.p-red  {transform:translate( 1.7px,-1.3px)}   /* 鉛丹固定往右上 */
.p-ink  {transform:translate(0,0)}             /* 墨是基準版 */
.p-paper{transform:translate( .7px, .7px)}     /* 紙橋（模擬留白）*/
/* 游標移上去＝把套印錯位當場拉開，讓人看見這是四塊版疊的 */
.cell:hover .p-red  {transform:translate( 4.4px,-3.4px)}
.cell:hover .p-ochre{transform:translate(-4.0px, 4.6px)}
.cell:hover .p-ink  {transform:translate(-1.2px, .8px)}
```

### 特徵 5｜剪影型人物（屬性辨識，不是畫像）

人不是畫出來的，是用**屬性零件**拼出來的剪影：掃帚＝清潔隊員、麻袋＝回收物、禮帽＝資本家、圓肚＝亂丟的。正面或全側面，沒有臉、沒有明暗、沒有透視；四肢是**起訖各有寬度的實心楔形**，絕不是線。

```js
/* 楔形肢體：所有手臂、腿、桿件的唯一原語。w0/w1 是兩端的寬度 */
function bar(x0,y0,x1,y1,w0,w1,fill){
  const dx=x1-x0, dy=y1-y0, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L;
  const p=[[x0+nx*w0/2,y0+ny*w0/2],[x1+nx*w1/2,y1+ny*w1/2],
           [x1-nx*w1/2,y1-ny*w1/2],[x0-nx*w0/2,y0-ny*w0/2]];
  return `<polygon points="${p.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ')}" fill="${fill}"/>`;
}
```

```html
<!-- 一個人＝頭（圓）＋軀幹（梯形）＋四根楔形＋兩塊鞋。就這樣 -->
<g class="pl p-red">
  <circle cx="100" cy="22" r="14" fill="#D5321C"/>
  <polygon points="80,40 120,40 126,114 74,114" fill="#D5321C"/>
  <!-- bar(82,58, 24,90, 15,11) / bar(118,58, 176,90, 15,11) -->
  <!-- bar(88,114, 80,146, 16,13) / bar(114,114, 122,146, 16,13) -->
  <polygon points="62,140 94,140 94,150 62,150" fill="#D5321C"/>
</g>
```

---

## 三、色彩系統

| 角色 | Hex | 佔比 | 用途 |
|---|---|---|---|
| 鐵皮青灰 | `#5A6660` | 34% | 頁外底：紙被貼在什麼上面。它不是背景色，是一面**物件** |
| 漿紙 | `#D6CFBC` | 28% | 紙。所有內容都在紙上，沒有一段長文直接放在鐵皮上 |
| 墨 | `#191512` | 20% | 第三塊版：刻線、輪廓、正文、頁尾 |
| 鉛丹紅 | `#D5321C` | 12% | 第二塊版：下句、現用態、可動作、拒絕 |
| 土黃 | `#E0A21C` | 5% | 第一塊版：錢與時間、通過、次要圖元 |
| 紙板暗面 | `#C6BEA8` | 1% | 未現用的導覽紙條 |
| 鐵皮暗／亮 | `#48524E` / `#6C7972` | — | 鐵捲門橫楞的硬停止色帶（非漸層） |

**規則**

- 顏色只有五個角色，不准新增。要第五個顏色就等於要求多刻一塊版。
- **紙上零漸層**。唯一允許的連續漸層是「落在鐵皮或玻璃上的光」——那是光，不是墨。
- 鐵皮的楞紋一律用 `repeating-linear-gradient` 的**硬停止**寫成實心色帶：

```css
body{
  background:#5A6660;
  background-image:repeating-linear-gradient(180deg,
    #48524E 0 2px, #5A6660 2px 20px, #6C7972 20px 22px, #5A6660 22px 26px);
}
```

- 灰階零色偏；紅與黃絕不相鄰於同一條邊界（中間一定隔紙或墨）。

---

## 四、字體系統

| 用途 | 字體 | 字重 | 尺寸 |
|---|---|---|---|
| 對句、標題、按鈕 | Noto Sans TC | **900** | 17–23px |
| 拉丁文字、編號、數字、代碼 | Archivo Black | 400（本身即黑體） | 10.5–26px，`letter-spacing:.02–.10em` |
| 正文 | Noto Sans TC | 400／700 | 15.4px／`line-height:1.7` |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
```

- **中文一律用 900，不用 700 當標題。**刻出來的字沒有細的。
- 拉丁字只做三件事：編號、數字、英文小標。不用它寫句子。
- 全站**不使用斜體、不使用襯線、不使用等寬**（等寬是終端機的語彙，不是刻版的）。
- 字級階梯：`12 / 13.4 / 14.6 / 15.4 / 17 / 19 / 21 / 23 / 26`——階梯很密，因為窗上的字級由格子大小決定，不是由階層決定。

---

## 五、版面與網格

- **開場即窗**：首屏就是本期的窗，沒有 hero、沒有標語、沒有按鈕組。營業資訊寫在格子裡與窗頭窗尾的墨帶上。
- 窗＝一張紙（`.paper`），紙上一塊墨色網格（`.cells`），網格上下各一條滿版墨帶（`.winhead` / `.wintail`）。
- 桌機 3 欄、`≤900px` 2 欄、`≤560px` 1 欄；欄數變了但每格內部的三條線仍靠 subgrid 對齊。
- 內容頁一律是「一張紙一個段落」的紙條堆疊（`.slip`），紙條之間露出鐵皮。
- 陰影只有一種：`box-shadow:8px 9px 0 rgba(0,0,0,.32)`，實心、零模糊、固定右下。
- 紙的左緣壓一塊土黃的糨糊漬（`::after`），寬 9px、高 36px——貼上去的東西才有糨糊。

---

## 六、元件配方

### 導覽（paste-lap 貼壓層）

四頁＝四張貼在鐵門上的紙條，互相重疊；**現用頁是最後貼上去、蓋住別人的那一張**。語意是「誰在最上面」，不是高亮。

```css
.nav ul{display:flex;align-items:flex-end;padding-left:16px;list-style:none}
.nav li{margin-left:-18px}                    /* 負邊距＝互相重疊 */
.nav a{background:#C6BEA8;padding:9px 20px 10px;
       box-shadow:5px 5px 0 rgba(0,0,0,.30);
       transform:rotate(-.7deg);transition:transform .09s linear}
.nav li:nth-child(2) a{transform:rotate(.5deg)}   /* 每張各歪各的 */
.nav a:hover{transform:rotate(-1.6deg) translateY(-3px)}
.nav li:has(a:hover){z-index:8}
.nav .on{z-index:7}                            /* 現用頁蓋住其他三張的角 */
.nav .on a{background:#D6CFBC;box-shadow:7px 7px 0 rgba(0,0,0,.38);
           transform:rotate(.3deg) translateY(-4px)}
.nav .on a::before{content:"";position:absolute;left:0;right:0;bottom:-5px;height:5px;background:#D5321C}
```

### 按鈕

```css
.btn{font-weight:900;background:#191512;color:#D6CFBC;border:0;padding:11px 22px;
     box-shadow:4px 4px 0 #D5321C;transition:transform .08s linear}
.btn:hover {transform:translate(-2px,-2px);box-shadow:6px 6px 0 #D5321C}
.btn:active{transform:translate( 2px, 2px);box-shadow:2px 2px 0 #D5321C}
```

### 表格

```css
thead th{background:#191512;color:#D6CFBC;font-weight:900}
tbody tr           {background:rgba(25,21,18,.05)}
tbody tr:nth-child(even){background:rgba(25,21,18,.10)}
th,td{padding:7px 9px;text-align:left}   /* 沒有框線：分隔靠色階 */
```

### 表單

```css
input,select{border:0;background:rgba(25,21,18,.09);border-bottom:4px solid #191512;padding:8px 10px}
input:focus{background:rgba(213,50,28,.12);border-bottom-color:#D5321C;outline:none}
:focus-visible{outline:4px solid #D5321C;outline-offset:2px}
```

### 頁尾

滿版墨底、連結為土黃並帶 3px 土黃底線；`hover` 時底線換成鉛丹。

---

## 七、動效規則（四種，缺一不可）

| 種類 | 觸發 | 內容 | duration / easing |
|---|---|---|---|
| **ambient 環境** | 無（持續） | 一條斜光帶掃過整片鐵皮 | `23s linear infinite`，`translateX(-42% → 42%)` |
| **input 輸入** | hover 一格 | 把四塊版的套印錯位當場拉開 2.5 倍 | `90ms linear`（延遲 <100ms） |
| **transition 轉場** | 頁面載入 | 窗被「刷漿貼上」：`clip-path:inset(0 100% 0 0) → inset(0)` | `580ms cubic-bezier(.22,.9,.3,1.02)` |
| **signature 簽名** | 該格捲進視野（IntersectionObserver） | **逐版刷色 stencil-pass**：一格一格、一版一版依刷序被斜刷出來 | `400ms cubic-bezier(.3,.72,.4,1)`，版間延遲 0／130／260／340ms |

```css
/* signature：一塊版被一道斜刷痕由左往右刷出來 */
@keyframes brushpass{
  from{clip-path:polygon(0 0, 0 0, -16% 100%, -16% 100%)}
  to  {clip-path:polygon(0 0, 116% 0, 100% 100%, 0 100%)}   /* 右緣永遠是斜的＝刷子的角度 */
}
html.js .cell .pl{clip-path:polygon(0 0,0 0,-16% 100%,-16% 100%)}   /* 未刷＝空白 */
html.js .inked .pl{animation:brushpass .40s cubic-bezier(.3,.72,.4,1) both}
html.js .inked .p-ochre{animation-delay:0s}
html.js .inked .p-red  {animation-delay:.13s}
html.js .inked .p-ink  {animation-delay:.26s}
html.js .inked .p-paper{animation-delay:.34s}
```

**降級（四種都要，且資訊零損失）**

```css
@media (prefers-reduced-motion:reduce){
  .glare{animation:none;transform:translateX(-8%)}                 /* 光停住，鐵皮仍有一條高光 */
  html.js .cell .pl,html.js .inked .pl{clip-path:none!important;animation:none!important}
  html.js .pasted{animation:none!important}
  .pl,.btn,.nav a{transition:none!important}                       /* 錯位改為瞬間跳變，仍看得見 */
}
```

無 JavaScript 時：`html` 上沒有 `.js`，`.pl` 的初始 `clip-path` 完全不生效，所有版直接是完成態。**這是本風格的關鍵實作原則：動效只加在 `html.js` 底下，永遠不要讓「未播放」等於「看不見」。**

**禁止**：淡入當主要動效、視差、數字計數、模糊過場、彈跳緩動、任何 `filter:blur()`。刷子沒有 ease-out-back。

---

## 八、插畫與圖像風格（bridgecut-silhouette 橋接鏤刻剪影）

**唯一四種原語，全部是可填色的閉合面：**

1. **剪影塊**：多邊形／圓，直接就是形。
2. **楔形桿** `bar()`：肢體、桿件、刷柄（見特徵 5）。
3. **紙橋**：以紙色畫在色塊上，模擬模版上留下來的那條紙板。最小 6 單位。
4. **屬性零件**：掃帚、麻袋、桶、箱、禮帽——身分由它決定，不由臉決定。

**畫布**：`viewBox="0 0 200 150"`，每張圖三到四塊版，版內單一顏色。

**必須通過的驗收**（建置期就跑，不要等到上線）：把每個圖元光柵化後跑一次 `erode(2) → dilate(2)`，**不准有任何一件消失**。本示範站 119 個圖元全數存活，平均面積損失 2.19%，最嚴重的一件（電池的正極，8×5）保留 80.0%。

**明文禁用**：`feTurbulence` 手抖邊（那是迷幻海報的語彙）、半調網點、交叉排線、細線幾何線描、寫實描繪、`stroke-linecap:round`、任何漸層填色。

---

## 九、Logo 與 Favicon

Logo ＝**一面縮小的窗**：墨色方塊切成 2×3 格，其中一格刷鉛丹、一格刷土黃，其餘留紙；右側是四條長短不一的實心色帶當作字（因為遠看窗上的字就是幾條帶子）。零文字、零描邊。

Favicon 用同一規則、`viewBox="0 0 32 32"` 的 inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23D6CFBC'/%3E%3Crect x='3' y='3' width='26' height='26' fill='%23191512'/%3E%3Crect x='6' y='6' width='8' height='8' fill='%23D5321C'/%3E%3Crect x='18' y='6' width='8' height='8' fill='%23D6CFBC'/%3E%3Crect x='6' y='18' width='8' height='8' fill='%23D6CFBC'/%3E%3Crect x='18' y='18' width='8' height='8' fill='%23E0A21C'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 首屏就是那張窗；資訊寫在格子裡。
- 每格左上一枚圓圈編號，最後一格收在口令。
- 陰影一律實心位移色塊。
- 套印錯位留著，並讓使用者能把它拉開來看。
- 所有長文放在紙上；鐵皮上只放紙。
- 文案短、具體、押韻、帶一點刺。價錢、電話、時刻、人名都要是真的（在虛構世界裡是真的）。

**Don't**

- ✗ 任何 `stroke` 描邊、任何細線。
- ✗ 圓角、模糊陰影、玻璃感、漸層填色。
- ✗ 置中大標＋副標＋兩顆按鈕的 hero。
- ✗ emoji 當圖示（圖示一律是剪影 SVG）。
- ✗ 「EST. 19xx」徽章、「把 X 變成 Y」句式標題、Lorem ipsum。
- ✗ 蘇聯符號的取用：鐮刀鎚子、紅星、西里爾字母裝飾、革命口號的挪用。**借的是製程與版面文法，不是政治符號。**把它用在非政治的公共題材上（清潔隊、消防、公衛、圖書館、學校）才是這個風格今天的正確用法。
- ✗ 把窗做成漂亮的圖卡牆：格子如果可以任意重排、順序不影響閱讀，那就不是窗，是 grid。

---

## 十一、頁面骨架範例（可直接使用）

```html
<body>
<div class="glare" aria-hidden="true"></div>          <!-- ambient 斜光 -->

<div class="wrap"><nav class="nav"><ul>
  <li class="on"><a href="index.html"><span class="num">01</span><span class="zh">本週的窗</span></a></li>
  <li><a href="b.html"><span class="num">02</span><span class="zh">第二頁</span></a></li>
</ul></nav></div>

<main class="wrap">
  <section class="win paper pasted">
    <div class="masthead"><b>貼在哪裡　本週</b><span>PASTED 115-09-09　EDITION 40</span></div>
    <div class="winhead"><!-- logo --><span class="t">某某窗　第一三八號</span>
      <span class="m">No.138　刻版 某某　刷 40 張</span></div>

    <div class="cells">
      <article class="cell">
        <div class="no"><i>1</i><span>這一格在講什麼　韻 ㄞ</span></div>
        <div class="fig"><svg viewBox="0 0 200 150">
          <g class="pl p-ochre">…</g><g class="pl p-red">…</g>
          <g class="pl p-ink">…</g><g class="pl p-paper">…</g>
        </svg></div>
        <div class="cap"><p>上句寫在這裡，</p><p class="lo">下句押它的韻。</p></div>
      </article>
      <!-- 再五格 -->
    </div>

    <div class="wintail"><span>地址</span><span>電話</span><span>時段</span></div>
  </section>

  <section class="paper slip">
    <h2><span class="en">SECTION LABEL</span>中文小節標題</h2>
    <div class="rule red"></div>
    <p>內文。</p>
  </section>
</main>

<footer><div class="wrap">…</div></footer>
<script>
/* signature 的觸發：一格捲進視野就上版 */
(function(){
  var cells=[].slice.call(document.querySelectorAll('.cell,.figbox'));
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!('IntersectionObserver' in window)||rm){cells.forEach(function(c){c.classList.add('inked')});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('inked');io.unobserve(e.target);}});},
    {rootMargin:'0px 0px -8% 0px',threshold:.16});
  cells.forEach(function(c){io.observe(c)});
})();
</script>
</body>
```

---

## 十二、技術實作與相容性

本站的三項核心技術。**每一項的選擇理由都是「這個流派的視覺特徵需要它」，不是它好玩。**

### 1. SVG `feMorphology` 開運算（A 渲染層）— 承載特徵 3

**它承載什麼**：把「刻刀刻不出比 2r 更細的東西」這條製程限制寫成一支**會實際刪除幾何**的濾鏡。它不是效果，是驗收工具：刻版檢查台上把刀口從 0 加到 4，可以親眼看見 3 公釐的墨條與 3 公釐的紙橋先後消失。

**支援現況（2026-09-09 查證 MDN《`<feMorphology>`》）**：**Baseline Widely available**，2015 年 7 月起跨瀏覽器可用。`operator` 取 `erode` / `dilate`，`radius` 可取兩個值（x、y 各一）。

**實作要點**：`feMorphology` 是**逐通道**運算，多色圖形一起過濾會產生色偏。因此**每一塊版單獨過濾**（本風格本來就一版一色，天然吻合）。半徑不要大於 6，成本隨 r² 增長。

**Fallback**：`if(!('SVGFEMorphologyElement' in window))` 時把檢查台的按鈕列隱藏、把讀數換成靜態說明文字，圖形停在原圖——尺寸規範（最小 5、紙橋最小 6）本來就寫在頁面上，資訊零損失。正式頁面的六張圖**不掛濾鏡**：它們在建置階段就已經跑過同一套開運算驗收（見第八章的 119 / 0 / 2.19% 實測），所以執行期不必每幀重跑，這是效能預算下的取捨。

### 2. CSS Grid `subgrid`（C 版面與樣式層）— 承載特徵 1

**它承載什麼**：一面窗是**從同一塊板子上切下來的**，所以編號帶、圖區、對句帶這三條刻線必須跨整面窗切齊——不管第 3 格的對句是一行、第 5 格是兩行。這件事媒體查詢與固定 `min-height` 都做不到（對句長度是內容決定的），Flex 也做不到（跨列不對齊）。

**支援現況（2026-09-09 查證 caniuse `css-subgrid` 與 web-features）**：Firefox 71+（2019-12）、Safari 16+（2022-09）、Chrome/Edge 117+（2023-09-12）、Opera 103+、Samsung Internet 24+。2023 年 9 月起三引擎齊備，**2026-03-15 起為 Baseline Widely available**，全球覆蓋 >92%。

**Fallback**：`@supports (grid-template-rows:subgrid)` 包起來；不支援時 `.cell` 退回自己的 `auto auto auto` 三列，格子仍然是三段式、圖仍在字上、資訊完全相同，只是相鄰格的刻線可能差幾個像素。

### 3. `IntersectionObserver`（D 輸入與感測層）— 承載 signature

**它承載什麼**：窗不是一次刷完的，是**讀到哪刷到哪**。簽名動效的觸發源必須是「這一格進入視野」這件事本身。選它而非 scroll-driven animations，是因為刷版是一次性的離散事件（刷過就不會退回去），不是與捲動位置連續綁定的參數——用 `animation-timeline` 反而會讓刷痕隨著往回捲而倒退，那不是刷子的行為。

**支援現況（2026-09-09 查證 MDN《IntersectionObserver》與 caniuse `intersectionobserver`）**：**Baseline Widely available**，2019 年 3 月起跨瀏覽器。Chrome 58+、Edge 16+、Firefox 55+、Safari 12.1（macOS）／12.2（iOS）+、Opera 45+、Samsung Internet 7.2+。IE 不支援。

**Fallback**：`if(!('IntersectionObserver' in window) || prefers-reduced-motion)` 時直接對全部格子加上 `.inked`，四塊版立刻是完成態。無 JavaScript 時 `html` 沒有 `.js` 類別，初始 `clip-path` 根本不套用——圖從一開始就是完整的。

### 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG，不含 Google Fonts） | 30.3 / 47.2 / 28.6 / 79.1 KB | ≤350 KB ✓ |
| 首屏 JS 執行 | IntersectionObserver 註冊 6 個目標 + 一次 localStorage 讀取，<3ms | ≤100 ms ✓ |
| 主要動畫 | `clip-path` 與 `transform` 皆為合成層屬性，零 layout、零 `getBoundingClientRect`；每格只跑一次 400ms 後即 `unobserve` | 60fps ✓ |
| 濾鏡 | 全站唯一掛 `filter` 的元素是刻版檢查台的兩個 `<g>`（420×160），且只在按鈕按下時重算 | — |
| 外部資源 | 只有 Google Fonts 兩支；零外部圖片、零音檔、零函式庫 | ✓ |

### 建置期驗收腳本（可直接搬走）

```js
// 把每個圖元光柵化，跑真的開運算，檢查有沒有東西會被刻刀吃掉
function opening(mask,W,H,r){
  const off=[]; for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++) if(dx*dx+dy*dy<=r*r) off.push([dx,dy]);
  const pass=(src,op)=>{const o=new Uint8Array(W*H);
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){let v=op==='erode'?1:0;
      for(const[dx,dy]of off){const nx=x+dx,ny=y+dy;
        const s=(nx<0||ny<0||nx>=W||ny>=H)?0:src[ny*W+nx];
        if(op==='erode'){if(!s){v=0;break;}}else{if(s){v=1;break;}}}
      o[y*W+x]=v;} return o;};
  return pass(pass(mask,'erode'),'dilate');
}
// 任何 area(opening(shape)) === 0 的圖元，就是設計上刻不出來的東西，退回去重畫。
```

---

*規格書版本 1.0．示範站：溪墘窗 第三分隊（新竹市香山區，虛構）．由 Claude Opus 5（排程 Agent）撰寫於 2026-09-09。*
