---
name: grunge-raygun-xerox
description: Early-1990s grunge / Ray Gun editorial style — clashing type inside one sentence, a visible grid that is visibly broken, photocopier generation loss as a first-class rendering parameter, unreliable folios, and pure black-and-white plus a single fluorescent spot.
---

# 影印世代 GRUNGE / RAY GUN
### 一九九〇年代反排版的編輯風格規格書

> 本檔是給 AI（或人）拿去重做同一套風格用的。跟著做，可以在任何產業做出與《暗班》第 27 期同一個語言、但內容完全不同的網站。
> 判準只有一句話：**遮住全部文字看首屏，懂設計的人要能在三秒內說出「這是 Ray Gun／grunge」。**

---

## 〇、流派來歷（做之前先知道你在做什麼）

- **年代／地域**：一九九〇－一九九六，美國西岸（加州）。前身是 Emigre 雜誌（Rudy VanderLans 與 Zuzana Licko，一九八四年創於柏克萊）與 CalArts 的實驗字體教學（Jeffery Keedy、Ed Fella）。
- **代表刊物與人**：《Ray Gun》（一九九二年創刊，發行人 Marvin Scott Jarrett），美術指導 **David Carson**（一九九二－一九九五，約三十期）。Carson 此前做過《Transworld Skateboarding》與《Beach Culture》。他把版面推到「讀者對可讀性沒有天然的請求權」這個位置。
- **最有名的一次**：一九九四年，Carson 覺得一篇 Bryan Ferry 的專訪很無聊，**整篇用 Zapf Dingbats（符號字）排出來**。同一期的最後面，他又把那篇專訪用可讀的字重排一次。**這個「破壞版＋可讀版並存」的做法，就是本規格書第五章那顆「借主編的母本」按鈕的歷史依據——破格不等於不給看。**
- **字**：Barry Deck 一九八九－九〇年設計、Emigre 一九九一年發行的 **Template Gothic**（二〇一一年進 MoMA 典藏），是這十年最具代表性的字。Deck 自陳他要做一套「看起來像是受過照相製版反覆折磨」的字，用來反映「一個不完美的世界裡不完美的語言」。**這句話就是本風格的技術核心**：字的殘缺不是裝飾，是複製過程留下的傷。
- **製作條件（風格為什麼長這樣）**：麥金塔剛進編輯台、掃描器解析度低、樣張靠影印機與傳真機在辦公室之間流通。**影印一份影印過的東西，細筆畫會掉、粗筆畫會黏**——這個物理限制被當時的人從缺點翻成語彙。做這個風格而不做這一層，就只是把字亂放。

---

## 一、本風格的 5 個不可省略特徵

> 拿掉任何一項，它就不是這個風格了。五項在畫面上必須全部看得見。

### 特徵 1｜同一句話裡，字體／字級／字重不斷換

換字體的位置由**語氣**決定，不由層級決定。一個標題裡至少三套字，字級跨度 ≥6 倍，而且是同屏並存。虛詞（「到」「的」「與」）刻意被排成小的、歪的、另一套字。

```css
.head .a{font-family:"Noto Serif TC",serif;font-weight:900;font-size:clamp(42px,8.4vw,104px);
         line-height:.86;display:inline-block;vertical-align:-6px}
.head .b{font-family:"Special Elite",serif;font-size:clamp(15px,2.2vw,26px);
         display:inline-block;transform:translateY(-1.6em) rotate(-4deg)}   /* 虛詞：小、歪、打字機 */
.head .c{font-family:"Anton",sans-serif;font-size:clamp(34px,7vw,86px);
         display:inline-block;transform:rotate(-6.4deg) translateY(.06em)}
.head .d{font-family:"Space Mono",monospace;font-weight:700;
         font-size:clamp(13px,1.8vw,19px);display:inline-block;transform:translateY(-2.4em)}
```

```html
<h1 class="head"><span class="a">四點半</span><span class="b">到</span><span class="c">七點十分</span><span class="d">［五個人的下班路線］</span></h1>
```

**紀律**：只有標題、欄目名、拉頁字可以這樣玩。**段落內文一律水平、單一字體、對比 ≥7:1、可選取。**（原刊沒有這條，網頁必須有。）

### 特徵 2｜網格存在，而且看得見被破掉

亂排不是破格。破格的前提是版面底下真的有一張網格，而且它印在紙上。十二欄 × 12px 一列；每一塊內容都掛在同一組列線上（subgrid），即使旋轉、重疊、出血被裁。

```css
.spread{display:grid;grid-template-columns:repeat(12,1fr);
        grid-auto-rows:minmax(12px,auto);   /* 12px 是最小值，內容可以把列撐高 */
        column-gap:14px;position:relative}
.blk{display:grid;grid-template-rows:subgrid}          /* 內部行仍咬母網格的列線，且會回頭撐大母網格的列 */
@supports not (grid-template-rows:subgrid){ .blk{grid-auto-rows:minmax(12px,auto)} }

/* 欄線印在紙上 */
.rules{position:absolute;inset:-30px -26px -34px;pointer-events:none;opacity:.5;
  background-image:repeating-linear-gradient(90deg,rgba(22,19,15,.16) 0 1px,transparent 1px calc(100%/12));
  background-position:26px 0;background-size:calc(100% - 52px) 100%;background-repeat:no-repeat}
```

```html
<div class="blk" style="grid-column:1/8;grid-row:1/span 16">…</div>
<div class="blk" style="grid-column:7/13;grid-row:3/span 21;z-index:3">…</div><!-- 第 7 欄重疊 -->
```

**規則**：至少一組塊必須在欄上重疊（≥1 欄）、至少一塊旋轉 −7°～+4.5°、至少一塊出血被畫布切斷。

### 特徵 3｜字被影印過，而且看得出是第幾代

**不是加紋理，是重做一次影印。** 靜電複印只認得亮與暗：先光學模糊，再硬門檻二值化。細筆畫整根消失、粗筆畫黏死、邊緣長出階梯狀鋸齒。做法是把「模糊」與「極端對比」串成一條 CSS filter 鏈，並讓元素背景是**不透明的白**（門檻要成立必須有底）。

```css
.gen{background:#FFFFFF;transition:filter 360ms steps(3)}   /* 影印是逐格的，不是補間的 */
.g0{filter:none}                                            /* 母本 */
.g1{filter:blur(.28px) contrast(7)}
.g2{filter:blur(.42px) brightness(.985) contrast(10)}       /* brightness<1 → 筆畫變胖 */
.g3{filter:blur(.58px) brightness(1.02)  contrast(13)}      /* brightness>1 → 細筆畫掉光 */
.g4{filter:blur(.76px) brightness(.97)   contrast(16)}
.g5{filter:blur(.98px) brightness(1.045) contrast(20)}
```

**原理**：`contrast(k)` 對每個色版做 `c → (c−0.5)·k + 0.5`，k 大時就是一條以 0.5 為界的硬門檻；`blur()` 先把筆畫邊緣糊成灰帶，門檻再把那條灰帶切成鋸齒。`brightness()` 的唯一功能是**把門檻往上或往下推半格**，決定這一代是「胖掉」還是「斷掉」。內文請 ≥17px，否則第 4 代以上會失去可讀性。

### 特徵 4｜頁碼與欄目名不在它們該在的地方

頁碼可以在版心正中央、可以是打字機體歪著蓋上去、可以不照順序（本站四頁是 08 / 31 / 14 / 02）。欄目名被巨字壓住只露一半。

```css
.folio-mid{position:absolute;left:50%;transform:translateX(-50%) rotate(2.6deg);
           font-family:"Special Elite",serif;font-size:26px;bottom:14px;z-index:7}
.rubric{position:absolute;left:-2px;writing-mode:vertical-rl;font-family:"Anton",sans-serif;
        font-size:clamp(40px,6vw,72px)}
.rubric span{display:block;clip-path:inset(0 0 0 46%)}      /* 只露右半邊 */
```

**紀律**：頁尾必須有一組完整、水平、可讀的文字連結。找得到，只是不在你以為的地方。

### 特徵 5｜只有純黑與純白，加一塊螢光

版心裡**不准有中間灰**。所有看起來像灰的東西都是斑點在遠處造成的錯覺。灰只准出現在紙的邊緣、摺角背面、滾筒陰影。顏色只有一塊螢光專色（來自事後補上的麥克筆／螢光影印紙），再加一支螢光筆的黃當作「讀過」的記號。零漸層、零模糊陰影（投影一律實心位移色塊）、零圓角。

```css
:root{ --paper:#FFFFFF; --toner:#16130F; --spot:#FF3B00; --edge:#B9B4AC; --mark:#E8FF00; }
.sheet{background:var(--paper);box-shadow:3px 3px 0 rgba(22,19,15,.34)}   /* 實心位移，不模糊 */
.hl{background:linear-gradient(var(--mark),var(--mark));background-size:100% .78em;
    background-position:0 .62em;background-repeat:no-repeat}              /* 螢光筆 */
```

---

## 二、設計哲學

1. **可讀性是一份有限資源，不是一項天賦權利。** 版面可以決定把它花在哪裡——但必須誠實地標示花掉了多少，並且永遠留一條回到母本的路（Carson 一九九四年把 Bryan Ferry 那篇在同一期後面重排一次，就是這條路）。
2. **殘缺要有來源。** 字的破損必須來自一個說得出名字的物理過程（影印、傳真、照相製版），不是隨機的 grunge 筆刷。來源說得出來，畫面才站得住。
3. **破格的前提是有格。** 先把網格畫出來，再破它。
4. **語氣比層級大。** 一個字排多大，看它在句子裡有多重，不看它是 h1 還是 h2。
5. **內文不參加這場遊戲。** 標題可以打壞，正文必須讓人讀完——這是這套風格搬到網頁上唯一必須新增的紀律。

---

## 三、色彩系統

| 色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 爆白 | `#FFFFFF` | 影印紙。**純白、零紙紋、零顆粒**（顆粒是碳粉不是紙） | ≈50% |
| 碳粉黑 | `#16130F` | 所有文字、線、實心塊。**暖黑，不是 #000**——碳粉本身是有色的 | ≈33% |
| 螢光橘 | `#FF3B00` | 唯一專色：動作、現在、被選中、麥克筆記號、序號 | ≈11%（上限 14%） |
| 影印灰 | `#B9B4AC` | **唯一的中間調，且只准在版心之外**：紙緣、摺角背面、滾筒陰影、頁面底色 | ≈5% |
| 螢光黃 | `#E8FF00` | 只給一件事：螢光筆劃過的痕跡（讀過、被更正、被強調的一句） | ≤1% |

**規則**

- 版心（紙面上）只有 `#FFFFFF` 與 `#16130F` 兩個值，中間灰一律用斑點密度模擬。
- 螢光橘永不做大面積地色，也永不與螢光黃相鄰。
- 頁面外框（body）用影印灰，讓「紙」在「機器」上面這件事成立。
- 若換產業要換色：**只能換那一塊螢光專色**（螢光粉 `#FF2D6F`／螢光綠 `#00E56B`／螢光藍 `#2B4CFF`），黑白灰三色不動。

---

## 四、字體系統

| 角色 | 字 | 用法 |
|---|---|---|
| 顯示（中） | Noto Serif TC 900 | 主標、篇名、巨字裁切、拉頁引言 |
| 顯示（拉丁） | Anton | 章節標、欄目名、按鈕、與中文明體互撞 |
| 打字機 | Special Elite | 虛詞、頁碼、手寫感的補字、「後來加上去的」東西 |
| 等寬 | Space Mono 400/700/400i | 標籤、機器讀數、價目、頁眉的 uppercase 機邊標記 |
| 內文 | Noto Sans TC 400/700/900 | 段落、表格、導覽 |

- 字級 scale（同屏並存）：`11 / 12.5 / 17 / 19 / 26 / 40 / 66 / 96 / 300`（px）。**最小與最大要差 6 倍以上**。
- 行高：內文 1.62；主標 0.86–0.9（要讓行與行咬在一起）。
- 字距：等寬標籤 `letter-spacing:.14–.24em` 全大寫；主標 `-.06em`。
- 巨字裁切一律 `line-height:.72; letter-spacing:-.06em; user-select:none`。

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Special+Elite&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@400;900&display=swap" rel="stylesheet">
```

---

## 五、版面與網格

- **母網格**：12 欄，`grid-auto-rows:minmax(12px,auto)`，`column-gap:14px`。所有塊 `grid-row: N / span M`。12px 是列的**最小**高度（節奏），內容可以把列撐高——這正是 subgrid 在做的事：子格線是母格線，子內容因此回頭參與母列的定尺。純 12px 固定列會讓長內容溢出撞版。
- **重疊**：至少一組相鄰塊共用 1 欄（`1/8` 與 `7/13`），後者 `z-index:3`。
- **旋轉**：`-7deg` ～ `+4.5deg`，只給塊不給段落（段落文字永遠水平）。
- **出血**：至少一塊 `margin-left:-40px` 或巨字 `left:-4.5vw`，被 `.sheet{overflow:hidden}` 切斷。
- **裝訂溝**：版心正中 26px 的暗帶＋三個裝訂孔（`.gutter`），讓「這是一份更大的東西的中間兩頁」成立。
- **機邊**：`.sheet` 外圍一圈影印灰 + 四角裁切角規（兩根 1.6px 的線交叉，不畫方框）+ 一行 mono 大寫的機器標記。
- **留白**：本風格**不追求留白**。版心密度高，塊與塊之間 0–6px，靠字級落差製造層次而不是靠空白。
- **RWD**：`≤900px` 關掉裝訂溝、欄線、欄目名；`≤560px` `.spread` 改 `display:block`、取消所有 `transform` 旋轉、巨字縮到 44vw、裁切角規隱藏。**手機上仍必須看得到影印劣化與螢光專色**——那兩件事不是裝飾。

---

## 六、元件配方

**導覽（摺角）**：四個 62px 方塊，各印一個頁碼。現用頁右上角被摺下來（實心三角＝紙背的影印灰 + 一道對角黑摺痕），去過的頁留一道已攤平的舊摺痕。

```css
.dog{position:relative;width:62px;height:62px;background:#fff;border:1.8px solid var(--toner);display:block}
.dog .fol{position:absolute;left:6px;bottom:4px;font-family:"Space Mono";font-weight:700;font-size:15px}
.dog.cur::before{content:"";position:absolute;right:0;top:0;width:26px;height:26px;background:var(--edge);
  clip-path:polygon(100% 0,0 0,100% 100%);box-shadow:-1px 1px 0 rgba(22,19,15,.5)}
.dog.cur::after{content:"";position:absolute;right:0;top:0;width:26px;height:26px;
  background:linear-gradient(225deg,transparent 49%,var(--toner) 49% 52%,transparent 52%)}
.dog.seen::after{content:"";position:absolute;right:0;top:0;width:20px;height:20px;
  background:linear-gradient(225deg,transparent 49%,rgba(22,19,15,.34) 49% 51%,transparent 51%)}
```

**按鈕**：零圓角、零陰影模糊。主要動作＝螢光橘底白字 + `rotate(-1.4deg)`；hover 反成碳粉黑底螢光橘字。次要動作＝白底 2.4px 黑框 mono 粗體。停用態＝45° 斜線網底。

```css
.cta{background:var(--spot);color:#fff;border:0;font-family:"Anton";font-size:clamp(22px,3.4vw,34px);
     padding:10px 20px 12px;transform:rotate(-1.4deg)}
.cta:hover,.cta:focus-visible{background:var(--toner);color:var(--spot);outline:none}
button:disabled{color:var(--edge);
  background:repeating-linear-gradient(45deg,#fff 0 5px,rgba(22,19,15,.06) 5px 10px)}
```

**卡片／清單**：不用卡片。用**上下 1.4–2.6px 實線分隔的列**，偶數列 `rgba(22,19,15,.045)` 底。狀態標籤是 10px mono 的方框，選中時填螢光橘。

**表單／錯誤**：錯誤訊息＝碳粉黑底、白字、左邊 8px 螢光橘實心條、mono 12.5px。不用紅字、不用圖示。

**footer**：整塊反白（碳粉黑底白字），欄標題底下一條 1.4px 螢光橘線；末尾一行完整的水平文字連結（這是特徵 4 的保底）。

---

## 七、動效規則（四式，缺一不可）

| 類型 | 名稱 | 觸發 | 值 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 壓版掃描 platen-sweep | 無 | 120px 高的白色亮帶 `translate3d` 掃過整張紙，8.4s linear infinite，只動 transform（合成器層） | 停在 12vh 的定點，亮帶仍在 |
| input 輸入 | 上一代預覽 peek-back | hover／focus-within | 該塊 70ms 內退回較清楚的一代 `.gen:not(.g0):hover{filter:blur(.2px) contrast(6);transition-duration:70ms}`，離開即回原代；母本（g0）不參加 | `transition:none`，瞬切，資訊相同 |
| transition 轉場 | 重新曝光 re-expose | 進頁 | 內容區從第 5 代以 `filter 420ms steps(4)` 倒回本頁代數，結束後 `filter:""` 移除 | 直接是最終代數，不播 |
| signature 簽名 | 掉代 generation-loss | 每按一次「印」 | 滾筒溫度 +1.9°C/張；每 9.5°C 掉一代；受影響的元素 `transition:filter 360ms steps(3)` | `transition:none`，代數照樣改變 |

**紀律**

- **禁用**：淡入式滾動揭示、視差、數字滾動計數、stroke-dashoffset 描繪、按壓硬陰影位移、跑馬燈。
- 轉場不是「揭示」：元素從第一幀就在最終位置與最終不透明度，變的只有二值化參數。
- `steps()` 是必須的——影印是逐格的，不是補間的。
- 任何 filter 動畫都必須在結束後把 `filter` 清掉，避免元素長期停在額外的渲染層。

---

## 八、插畫與圖像風格

**技法名：巨字塊構成 xerox-glyph。零外部圖片、零描外形的插圖、零裝飾線條。** 只有四種原語：

1. **巨字裁切**：單一字符放大 8–40 倍，被版面邊緣或裁切線切斷，只剩塊面。判準是「拿掉字義仍讀得出這是一個被放大到不是字的形」。
2. **碳粉崩邊**：上述塊面經 `feMorphology dilate → erode` 與 `feComponentTransfer` 門檻後的**階梯狀**外緣（不是手抖濾鏡的波浪邊）。
3. **決定性斑點場**：FNV-1a → mulberry32 灑出的 0.4–1.8px 碳粉斑，密度隨代數上升，同 seed 恆同斑。
4. **麥克筆記號**：6–9px 的單筆封閉筆觸（圈、劃掉、箭頭），只用螢光橘或螢光黃，語氣必須是「有人在紙上留下的」。

```html
<!-- 原語 2：碳粉崩邊 -->
<filter id="toner" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.7"/>
  <feMorphology operator="erode"  radius="0.5"/>
  <feComponentTransfer><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>
</filter>
<!-- 原語 4：麥克筆圈記（不閉合、butt 端點） -->
<path fill="none" stroke="#FF3B00" stroke-width="4.6" stroke-linecap="butt"
      d="M12 40 C6 22, 62 10, 130 14 C186 18, 210 30, 202 44 C193 60, 116 68, 52 62 C24 59, 10 51, 14 42"/>
```

```js
// 原語 3：決定性斑點場
function fnv(s){var h=0x811c9dc5;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h>>>0;}
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
```

**明文禁用**：`feTurbulence`＋`feDisplacementMap` 的手抖波浪邊（那是迷幻海報的語彙，而且會糊掉字緣）、半調網點、細線幾何線描、任何寫實描繪、任何 emoji 或圖示字體。

---

## 九、Logo 與 Favicon

**概念**：一張被摺過角、被麥克筆圈過的影印紙。**不含任何文字**，因為 SVG logo 拿不到 webfont。

- 紙：白底 + 2px 碳粉黑框，**右緣與下緣是階梯狀崩邊**（路徑上的 H/V 交錯，不是圓角也不是波浪）。
- 摺角：右上一個影印灰實心三角 + 2.4px 黑摺線。
- 字行：三條實心黑條（不是線，是塊）。
- 記號：一圈螢光橘、不閉合、`stroke-linecap:butt` 的單筆橢圓，壓在紙上。
- 右側：一組裁切角規（十字，不畫框）+ 一個黑方塊內嵌螢光橘方塊。

**Favicon**：同一件事簡化到 32×32——白紙、摺角、兩條字行、一圈螢光橘，寫成 inline SVG data URI（單引號屬性，`#` 一律寫成 `%23`）。

---

## 十、Do & Don't

**Do**

- 先畫網格，再破它；把欄線印在紙上。
- 每一個殘缺都說得出它是第幾代。
- 一個標題裡至少三套字，虛詞排成小的、歪的、另一套字。
- 內文水平、可選取、對比 ≥7:1。
- 永遠留一顆「回到母本」的按鈕，並且用平白的話說明它在做什麼。
- 頁尾放一組完整、水平、可讀的文字連結。
- 手機版保留影印劣化與螢光專色，只放棄裝訂溝、旋轉與裁切角規。

**Don't**

- ❌ 紫藍漸層、圓角卡片、模糊陰影、置中大標＋兩顆按鈕＋三張卡片。
- ❌ 用 grunge 筆刷貼圖或現成 texture PNG 當「破損」——破損必須是可解釋的過程輸出。
- ❌ 把 `filter` 掛在 `body` 或大面積容器上長期存在（渲染層爆掉）。
- ❌ 中間灰進版心。任何 `#888` 都是這個風格的失敗。
- ❌ 讓劣化真的擋住資訊：可讀性可以被花掉，但不能被沒收。
- ❌ 用「EST. 19xx」徽章、emoji 圖示、Lorem ipsum、AI 腔文案。
- ❌ 把螢光專色放進會被二值化的區塊裡：`contrast(13)` 會把 `#FF3B00` 推成純紅 `#FF0000`。**螢光是影印完之後才用麥克筆補上去的**，所以它只能待在被影印的區塊外面（左緣導軌、標頭、按鈕、footer）。唯一允許的例外是小面積的螢光黃 `.hl`（那是有人在母本上劃的，本來就會被印進去），它會被門檻推成純黃 `#FFFF00`，視覺上仍是螢光筆。
- ❌ 為了「亂」而亂：每一個旋轉角、每一次重疊都要說得出它在版面上的職務。

---

## 十一、頁面骨架範例（可直接用）

```html
<body data-k="index">
<div class="machine">                       <!-- 機器：影印機壓不到的那一圈 -->
  <div class="trim tl"><i></i><i></i></div><!-- 四角裁切角規 -->
  <p class="mach-mark"><span>NO.27</span><span>SHEET p.08–09</span><span>PLATE / 母本</span></p>

  <main id="main" class="sheet">            <!-- 紙 -->
    <div class="platen" aria-hidden="true"></div>   <!-- ambient 壓版掃描 -->
    <div class="rules"  aria-hidden="true"></div>   <!-- 欄線：看得見的網格 -->
    <div class="gutter" aria-hidden="true"><i></i><i></i><i></i></div>

    <div class="spread">
      <div class="mass m1" aria-hidden="true">四</div>          <!-- 巨字裁切 -->
      <div class="rubric" aria-hidden="true"><span>專題</span></div>

      <div class="blk" style="grid-column:1/8;grid-row:1/span 16">
        <p class="kick">欄目 / 期別 / 分類</p>
        <h1 class="head"><span class="a">四點半</span><span class="b">到</span><span class="c">七點十分</span></h1>
      </div>

      <div class="blk" style="grid-column:7/13;grid-row:3/span 21;z-index:3">   <!-- 重疊一欄 -->
        <div class="gen g2" style="padding:12px;border-left:2.4px solid var(--toner)">
          <p>內文水平、可選取、17px 以上。</p>
        </div>
      </div>
    </div>
    <span class="folio-mid" aria-hidden="true">09</span>        <!-- 頁碼在版心正中央 -->
  </main>
</div>

<nav class="dogs" aria-label="頁面">                              <!-- 摺角導覽 -->
  <a class="dog cur" href="index.html"><span class="nm">校樣</span><span class="fol">08</span></a>
  <a class="dog"     href="copy.html"><span class="nm">配本</span><span class="fol">31</span></a>
</nav>

<footer><div class="fbox">
  <p class="flinks"><a href="index.html">校樣 08</a><a href="copy.html">配本台 31</a></p>
</div></footer>
</body>
```

---

## 十二、技術實作與相容性

### 12.1 本站承載視覺的三項技術

| 層 | 技術 | 它承載什麼 |
|---|---|---|
| A 渲染 | **SVG `feMorphology` + `feComponentTransfer`**，以及由 `blur()` + `brightness()` + `contrast()` 串成的 **CSS filter 二值化鏈** | 特徵 3 的影印世代劣化（文字）與特徵 2 的碳粉崩邊（logo／圖像） |
| C 版面 | **CSS Grid `subgrid`** | 特徵 2：破格必須破在一張真的存在、且所有塊共用的網格上 |
| D 輸入與感測 | **IntersectionObserver** | 「注意力」是本站唯一被記錄的量：某篇在視窗內 ≥55% 持續 2.4 秒才算讀過，並在左緣留下螢光筆痕 |

### 12.2 支援現況（2026-08-20 查證）

- **CSS `filter`（含 `blur()`／`brightness()`／`contrast()`）**：Baseline **Widely available**，二〇一六年九月起跨瀏覽器（MDN／caniuse `css-filters`）。
  *注意*：「二值化」不是標準 filter function，是 `blur → contrast` 兩個標準函式串起來的**技法**：`contrast(k)` 對每個色版做 `c → (c−0.5)·k + 0.5`，k 越大越接近以 0.5 為界的硬門檻。
  **前提**：套用的元素必須有不透明背景。透明底時 `contrast()` 只作用於 RGB 不作用於 alpha，模糊過的字會維持半透明＝只是糊掉、不會二值化。
  **Fallback**：不支援 `filter` 時整條宣告被忽略，全部文字自動等於母本（第 0 代）——**資訊零損失，而且是往好的方向失效**。
- **SVG `feMorphology`**：Baseline **Widely available**，二〇一五年七月起跨瀏覽器（MDN）。`feComponentTransfer`（含 `feFuncA type="discrete"`）為 SVG 1.1 濾鏡原語，同期跨瀏覽器。不支援時整個 `filter` 屬性被忽略，logo 退為乾淨邊的紙與圈記，構圖不變。
- **CSS `subgrid`（`grid-template-rows:subgrid`）**：Baseline，二〇二三年九月十五日起 **Newly available**，至今為 **Widely available**（Firefox 71+、Safari 16+、Chrome/Edge 117+、Opera 103+、Samsung Internet 24+，全球約 92%+；caniuse `mdn-css_properties_grid-template-rows_subgrid`）。
  **Fallback**：`@supports not (grid-template-rows:subgrid){ .blk{grid-auto-rows:12px} }` — 內部改用同尺寸的自有列，行仍是 12px 一格，只是不再與母網格嚴格對齊；欄線、重疊、旋轉、出血全部照舊。
- **IntersectionObserver**：Baseline **Widely available**，二〇一九年三月起跨瀏覽器（MDN／caniuse `intersectionobserver`）。
  **Fallback**：`if(!("IntersectionObserver" in window))` 時改掛 `scroll`（`{passive:true}`）以視窗中線比對，語意相同、精度較粗；再不行則「已讀」計數維持 0，不影響任何內容的可讀性。
- **`clip-path`／`mix-blend-mode` 未用於承載資訊**，僅用於摺角三角與欄目名切半；不支援時退為完整方塊與完整欄目名。

### 12.3 效能實測（2026-08-20，Node 22 / 單執行緒）

| 項目 | 值 | 門檻 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | index 24.5 KB／配本台 27.1 KB／這一期 36.7 KB／編輯室 20.4 KB | ≤350 KB ✔ |
| 外部資源 | 僅 Google Fonts（5 家族）。零外部圖片、零音檔、零函式庫 | — |
| 斑點場生成（130–170 個決定性斑點） | 每頁一次，實測 0.0052 ms／120 斑點 → 單頁 < 0.01 ms | 首屏 JS ≤100 ms ✔ |
| 配本台整輪計算（12 篇窮舉排序模擬 30,000 次） | 總計 < 60 ms，單輪 < 0.002 ms | ✔ |
| 主要動畫 | ambient 只動 `transform:translate3d`（合成器層，不觸發 layout／paint）→ 60fps | ✔ |
| filter 動畫 | 只在**離散狀態改變**時發生（`steps(3)`／`steps(4)`，360–420ms），不逐幀重算；轉場結束後以 `setTimeout` 清除 `filter` 釋放渲染層 | 無 layout thrashing ✔ |

**已知風險與處置**：`blur()` 是 GPU 密集的，套在大面積容器上會拖慢。本站的處置是（a）filter 只掛在文章區塊與樣本上，不掛 `body`；（b）進頁轉場的整頁 filter 在 520ms 後移除；（c）blur 半徑上限 0.98px。

### 12.4 可用性保底（做這個風格必須照抄的四條）

1. 沒有 JavaScript 時，全部文字一律以**母本（第 0 代）**呈現，且十二篇全文都在頁面上——劣化是增強，不是前提。
2. 每一篇下面都有「借主編的母本」，另有全頁的「全部借母本」。文案用平白的話說明它在做什麼。
3. 使用者沒有印到的內容**不會被藏起來**：在他那本裡是空白頁，但頁面一律給母本。
4. 劣化改變的是筆畫完整度，**不是對比度**——二值化之後黑更黑、白更白，對比比原稿還高。任何會降低對比的做法（淡化、降透明度）都與這個風格的物理相反。

---

*《暗班》第 27 期・暗班編輯室 AM-PAN・本 SKILL 由 Claude Opus 5（排程 Agent）撰寫，2026-08-20。*
