---
name: punk-xerox
description: First-generation photocopy punk — blown-out binary contrast with visible generation loss, ransom-note cut lettering, tape and staples, and a single misregistered fluorescent plate.
---

# 龐克剪貼 Punk Xerox — 影印世代耗損風格規格書

> 適用：任何「東西是被貼上去的、資訊是被傳出去的、預算是零」的產業。
> 不適用：需要精緻感、細字排版、大量灰階攝影、或必須顯得昂貴的產業。

---

## 一、設計哲學

### 這個流派從哪裡來

1976–1980，倫敦與紐約。Jamie Reid 替 Sex Pistols 做的《God Save the Queen》《Never Mind the Bollocks》把報紙剪下來的字母貼成標題；Mark Perry 的《Sniffin' Glue》是打字機打完直接拿去影印的同人誌；Crass 的黑白模版噴印與 Gee Vaucher 的拼貼把它推到政治宣傳的方向；1977 之後全世界的 fanzine 都長成同一個樣子。

**它長成那樣不是因為有人設計了它，是因為當時只有影印機。**

- 排版要錢，剪報不用 → 標題是剪下來貼的。
- 網版印刷要錢，影印一張兩塊 → 全部只有黑跟白。
- 專業攝影要錢，照片影印過會變成一坨黑 → 圖像退成高反差二值輪廓。
- 傳單是拿去再影印給下一個人的 → **細的東西會死。**

最後一條是這個流派的真正引擎。你在龐克傳單上看到的每一個視覺決定，都可以還原成一句話：**它撐得過影印機。**

### 你在設計的不是一張紙，是一份會被複製的東西

做這個風格時，腦子裡要有一個變數：`gen`（這份東西被影印過幾次，0–5）。

- `gen 0` 是原稿：對比正常、細節都在。
- `gen 2` 開始：灰階崩掉、細筆畫變粗、字腔開始閉。
- `gen 5`：只剩黑塊。

**每一個視覺元素都必須回答「你活得到第幾代」。** 活不過的東西就不要放進重要資訊裡。這是本規格書與其他黑白高反差風格（達達拼貼、瑞士國際、Neubrutalism）的根本差別：那些風格的畫面是「一個狀態」，本風格的畫面是「一個函數 f(gen)」。

### 語氣

第一人稱、短句、直接、拒絕修飾。可以罵人，不可以撒嬌。價錢、地址、時間一律寫死。禁止行銷腔（「打造」「一站式」「量身」「在當今」）。文案的判準是：**這句話印到第五代還糊掉的話，讀者會不會漏掉重要的事？**

---

## 二、本風格的 5 個不可省略特徵

以下五項，**拿掉任何一項就不是這個流派了**。每項附可直接複製的 CSS/SVG。

### 特徵 1｜世代耗損（generation loss）— 最重要的一項

碳粉會往外長，中間調會被推到兩端。這不是裝飾濾鏡，這是本風格的物理定律。

實作是一條 SVG filter 鏈：**硬門檻（feComponentTransfer type="linear" 大斜率）→ 碳粉外擴（feMorphology operator="erode"）**。

> ⚠️ 最容易踩的坑：在 SVG filter 裡，**讓「黑」長大的是 `erode`（取鄰域最小值），不是 `dilate`**。`dilate` 取最大值，會讓白長大、把黑字吃掉。要碳粉暈開請用 `erode`。

```html
<svg style="position:absolute;width:0;height:0" aria-hidden="true"><defs>
  <!-- 第 1 代到第 5 代：門檻越來越陡、碳粉越擴越開 -->
  <filter id="xg1" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
    <feComponentTransfer>
      <feFuncR type="linear" slope="2.4" intercept="-0.748"/>
      <feFuncG type="linear" slope="2.4" intercept="-0.748"/>
      <feFuncB type="linear" slope="2.4" intercept="-0.748"/>
    </feComponentTransfer>
    <feMorphology operator="erode" radius="0.25"/>
  </filter>
  <filter id="xg3" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
    <feComponentTransfer>
      <feFuncR type="linear" slope="3.8" intercept="-1.324"/>
      <feFuncG type="linear" slope="3.8" intercept="-1.324"/>
      <feFuncB type="linear" slope="3.8" intercept="-1.324"/>
    </feComponentTransfer>
    <feMorphology operator="erode" radius="0.70"/>
  </filter>
  <filter id="xg5" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
    <feComponentTransfer>
      <feFuncR type="linear" slope="6.0" intercept="-2.14"/>
      <feFuncG type="linear" slope="6.0" intercept="-2.14"/>
      <feFuncB type="linear" slope="6.0" intercept="-2.14"/>
    </feComponentTransfer>
    <feMorphology operator="erode" radius="1.35"/>
  </filter>
</defs></svg>
```

五代的參數表（`intercept = 0.5 − slope × t`，門檻 t 隨代數往下漂，因為影印機會越印越黑）：

| 代 | slope | t（門檻） | intercept | erode radius |
|---|---|---|---|---|
| 1 | 2.4 | 0.52 | −0.748 | 0.25 |
| 2 | 3.0 | 0.50 | −1.000 | 0.45 |
| 3 | 3.8 | 0.48 | −1.324 | 0.70 |
| 4 | 4.8 | 0.46 | −1.708 | 1.00 |
| 5 | 6.0 | 0.44 | −2.140 | 1.35 |

用法：把代數掛在 `<html>` 上，讓整站可以一起換代。

```css
:root{ --xf: none }
html[data-gen="1"]{ --xf:url(#xg1) }
html[data-gen="3"]{ --xf:url(#xg3) }
html[data-gen="5"]{ --xf:url(#xg5) }
[data-xerox]{ filter: var(--xf) }          /* 跟著全站代數走 */
[data-fix="4"]{ filter:url(#xg4) !important } /* 這一張就是第 4 代，不跟著走 */
```

**可讀性紀律（必守）**：濾鏡只能上在「圖像層與標題」，長篇正文永遠 `gen ≤ 1`，並在頁面上老實說明（例：「正文是重打的，不然你讀不到地址」）。世代耗損是內容，不是給讀者的懲罰。

**筆畫存活公式**（拿來決定什麼字該用什麼寫法，也可以直接當互動的規則引擎）：

```
字腔 aperture ≈ 0.62 × 筆畫寬 w
每影印一次，字腔被吃掉 0.22px（黑字）／白筆畫被吃掉 0.45px（反白字）
可讀度 L = max(0, (0.62w − 0.22c) / 0.62w)      黑字
       L = max(0, (w − 0.45c) / w)               反白字
L < 0.35 → 讀不出來
```

實測（影印 5 次）：打字機 w=1.1 → L=0；剪報貼字 w=3.4 → L=0.48；反白黑塊 w=3.0 → L=0.25；麥克筆 w=6.5 → L=0.83。**這就是為什麼龐克傳單的字那麼粗。**

### 特徵 2｜贖金剪字（ransom-note lettering）

每一個字元是一片獨立剪下來的紙。規則：四種字體輪替（襯線黑體／無襯線特黑／拉丁特黑／打字機）、字級 0.82–1.28 倍隨機、旋轉 ±7°、基線上下跳 ±0.15em、約 1/4 反白、每片都有剪刀的直邊與**實心位移陰影**。

```css
.rnw{ display:inline-block }
.rn{
  display:inline-block; line-height:.98; padding:.06em .13em .02em; margin:0 .035em;
  font-size:calc(1em * var(--sc));               /* --sc: 0.82–1.28 */
  transform:rotate(var(--rot)) translateY(var(--dy));
  background:#F6F4EE; color:#121110;
  /* ⚠ clip-path 會把 box-shadow 一起剪掉。剪字的位移陰影必須改用 0 模糊的 drop-shadow，
     它跟著剪過的外形走，而且會被上層的碳粉濾鏡一起吃掉 */
  filter:drop-shadow(var(--px) var(--py) 0 #121110);   /* 永遠實心，永遠 0 模糊 */
  clip-path:polygon(var(--c1) 0, var(--c2) 1%, 100% var(--c4), var(--c3) 100%, 0 var(--c2));
}
.rni{ background:#121110; color:#F6F4EE; filter:drop-shadow(var(--px) var(--py) 0 #FF2E7A) } /* 反白片 */
.rnA{ font-family:"Noto Serif TC",serif; font-weight:900 }
.rnB{ font-family:"Noto Sans TC",sans-serif; font-weight:900 }
.rnC{ font-family:"Archivo Black",sans-serif }
.rnD{ font-family:"Special Elite",monospace }
```

```html
<span class="rnw">
  <span class="rn rnA" style="--sc:1.14;--rot:-4.2deg;--dy:.08em;--px:2px;--py:1px;--c1:2%;--c2:98%;--c3:1%;--c4:99%">開</span>
  <span class="rn rnC rni" style="--sc:.91;--rot:5.6deg;--dy:-.11em;--px:3px;--py:2px;--c1:1%;--c2:99%;--c3:3%;--c4:97%">放</span>
  <span class="rn rnB" style="--sc:1.22;--rot:-1.8deg;--dy:.03em;--px:1px;--py:2px;--c1:3%;--c2:97%;--c3:2%;--c4:98%">夜</span>
</span>
```

**用決定性亂數（FNV-1a → mulberry32）產生每個字的參數**，同一段文字永遠得到同一組剪法——否則每次重整版面都會跳，那不是剪貼，那是雜訊。

### 特徵 3｜實體固定的證據（tape / staples / torn edges）

這個流派的每一塊內容都是**被貼上去的**，不是被排上去的。所以每一塊都必須有它「怎麼固定住」的證據：膠帶、訂書針、撕邊、以及一塊實心的位移陰影（紙離牆的厚度）。

```css
.sheet{
  position:relative; background:#F6F4EE; border:2px solid #121110;
  padding:20px; transform:rotate(var(--r,0deg));
  box-shadow:5px 6px 0 #121110;        /* 實心，0 blur —— 這是紙的厚度不是光影 */
}
/* 上緣一段膠帶 */
.sheet::before{
  content:""; position:absolute; left:50%; top:-11px; margin-left:-37px;
  width:74px; height:20px; background:#EFEDE6; border:2px solid #121110;
  transform:rotate(-2.4deg);
  clip-path:polygon(3% 12%, 97% 0, 100% 88%, 2% 100%);   /* 撕開的兩端 */
}
/* 訂書針：兩條實心短棒，中間挖空 */
.staple{ position:absolute; width:15px; height:6px; background:#121110 }
.staple::after{ content:""; position:absolute; inset:1px 3px; background:#EFEDE6 }
/* 撕邊 */
.torn{ clip-path:polygon(0 2%,18% 0,37% 3%,61% 0,82% 3%,100% 0,99% 97%,74% 100%,52% 97%,28% 100%,4% 97%) }
```

**進階：跨兩張紙的膠帶（CSS anchor positioning）。** 真正貼過公佈欄的人知道，最重要的那條膠帶是把兩張紙黏在一起的那一條——它的左端在 A 紙的右緣，右端在 B 紙的左緣。用絕對定位做不到，因為兩張紙會隨版面重排。

```css
.sheetA{ anchor-name:--sA }
.sheetB{ anchor-name:--sB }
@supports (anchor-name:--probe){
  .bridge{
    position:absolute; height:24px; z-index:35; pointer-events:none;
    background:rgba(255,46,122,.40);
    border-top:1.5px solid #FF2E7A; border-bottom:1.5px solid #FF2E7A;
    clip-path:polygon(0 10%,100% 0,100% 90%,0 100%);
    left : calc(anchor(--sA right) - 30px);
    right: calc(anchor(--sB left)  - 30px);
    top  : calc(anchor(--sA top)   + 54px);
  }
}
@supports not (anchor-name:--probe){ .bridge{ display:none } }
```

### 特徵 4｜沒對準的螢光專色（misregistered DayGlo plate）

全站只有**一塊**彩色，而且它**沒有對準**。這是影印店的第二次過紙、或是螢光色紙、或是後來用麥克筆補的——它永遠偏 3–6px 壓在黑的上面，而且**明文禁止與黑對齊**。對齊了就變成 Neubrutalism，不是龐克。

```css
:root{ --pink:#FF2E7A; --acid:#F5F000; --toner:#121110 }
/* 沒對準的重影字 */
.mis{ position:relative }
.mis::after{
  content:attr(data-mis); position:absolute; left:4px; top:4px;
  color:var(--pink); z-index:-1; white-space:nowrap;
}
/* 反白剪字的陰影用粉紅，不用黑 */
.rni{ box-shadow:3px 2px 0 var(--pink) }
/* 粉紅膠帶：半透明，因為它是貼在上面的 */
.tape{ background:rgba(255,46,122,.42); border-top:1.5px solid var(--pink); border-bottom:1.5px solid var(--pink) }
```

```html
<h2 class="mis" data-mis="工具免費">工具免費</h2>
```

酸黃 `#F5F000` 是第三塊、也是最薄的一塊版（≤7%），只給「免費／緊急／今天」這種語意，**不得當品牌色、不得當連結底色以外的裝飾**。

### 特徵 5｜毛邊與零中間調（fuzzy edges, no midtones）

- **任何一塊黑的邊緣都不是幾何直邊。** 上 `erode` 濾鏡、或 `clip-path` 撕邊、或兩者都上。畫面上不應該存在一條「乾淨的」黑邊。
- **全站零漸層、零圓角、零模糊陰影。** 所有陰影都是實心位移色塊（`box-shadow: Xpx Ypx 0 色`）。
- **零中間調。** 灰只以「壞掉的東西」的身分出現：糊掉的字、上一代的殘影、停用狀態。灰**永遠不給正文**。
- **底噪來自碳粉，不是紙。** 不要鋪紙纖維紋理、不要 feTurbulence 手抖邊（那是迷幻海報的語彙）——底噪是碳粉落塵，用四層極小的 `radial-gradient` 圓點。

```css
.grit{
  position:fixed; inset:-40px; pointer-events:none; z-index:0; opacity:.5;
  background-image:
    radial-gradient(circle at 12% 22%, #121110 .7px, transparent .8px),
    radial-gradient(circle at 63% 71%, #121110 .6px, transparent .7px),
    radial-gradient(circle at 84% 14%, #121110 .9px, transparent 1px),
    radial-gradient(circle at 31% 88%, #121110 .5px, transparent .6px);
  background-size:37px 41px, 53px 47px, 71px 67px, 29px 31px;
  animation:tonerfall 38s linear infinite;
}
@keyframes tonerfall{ to{ background-position:37px 41px,-53px 47px,71px -67px,-29px 31px } }
```

---

## 三、色彩系統

mood 代號：**blown-toner 曝底碳粉**。

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 影印紙 | `#EFEDE6` | 全站地色。是回收影印紙的灰白，**不是純白**；零紙紋、零顆粒 | 40% |
| 白紙片 | `#F6F4EE` | 剪字紙片與內容紙的底，比地色亮一階（因為它是「另一張紙」） | — |
| 碳粉黑 | `#121110` | 大面積實心塊、全部邊框（2–4px）、正文。**邊緣必帶毛邊** | 34% |
| 螢光粉 | `#FF2E7A` | 全站唯一主要彩色。**沒對準的第二塊版**，恆定偏移 3–6px | 14% |
| 酸黃 | `#F5F000` | 第三塊、最薄的一塊版。只給「免費／緊急／今天」與連結底 | ≤7% |
| 影印灰 | `#8E8B84` | **只給壞掉的東西**：糊掉的字、上一代的殘影、停用態。永不給正文 | ≤5% |

### 硬規則

1. **黑不是文字色，黑是一塊面積。** 34% 的畫面應該是實心黑塊，而不是「白底黑字」。
2. **粉紅永不與黑對齊。** 任何粉紅元素與它對應的黑元素之間必須有 3–6px 的位移。
3. **不准出現第四個色相。** 需要更多層次時，加的是「代數」不是顏色。
4. **零漸層。** 只有兩個例外，而且它們都不是「表面處理」：`.grit` 底噪的 radial-gradient 圓點（二值的，.7px 之後直接 transparent），以及 `.expo` 影印機曝光帶（那是一道掃過去的光，不是一個面）。任何色塊、按鈕、卡片、標題的填色一律純色。
5. **對比檢查：** 影印灰 `#8E8B84` 對紙底只有 2.4:1，所以它**只能用在裝飾與已失效的資訊**；任何要被讀的字一律用 `#121110`（12.4:1）或紙色壓在黑上（11.9:1）。

---

## 四、字體系統

四種字體同時在場，這是這個流派的本體（剪報就是從不同地方剪來的）。

| 角色 | 字體 | 字重 | 用在哪 |
|---|---|---|---|
| 剪字 A | Noto Serif TC | 900 | 標題剪字（明體的粗襯線在影印下最有辨識度） |
| 剪字 B | Noto Sans TC | 900 | 標題剪字、全部 `h1–h3`、UI |
| 剪字 C | Archivo Black | 400 | 拉丁大寫標籤、編號、章節碼 |
| 剪字 D / 打字機 | Special Elite | 400 | 手打的補充、地址、時間、標籤、「這是打字機打的」語意 |
| 正文 | Noto Sans TC | 400 / 700 | 內文（**唯一不會被剪成一片一片的東西**） |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700;900&family=Special+Elite&display=swap" rel="stylesheet">
```

### 字級 scale

```
剪字標題  clamp(30px, 6vw, 60px)    line-height .98   字距 0
區塊標題  clamp(26px, 4.4vw, 44px)  line-height 1.06  字距 -.01em
小標      19px / 900
正文      16px / 1.62（手機 15px）
小字      13px / 1.5
拉丁標籤  10–12px / .04–.16em 字距 / 全大寫
```

### 紀律

- **字距是負的或零，永遠不是正的**（除了拉丁全大寫標籤）。
- **不要用細字。** 400 以下不存在。300 的優雅細體在第二代就死了。
- **打字機字體不是裝飾，是語意**：用了 Special Elite 就等於在說「這行是後來打上去的」。不要拿它當正文。

---

## 五、版面與網格

### 骨架：公佈欄，不是網格

這個流派的版面隱喻是**一面被貼滿的公佈欄**，不是一個網格系統。差別在三件事：

1. **東西會互相蓋住。** 新的貼在舊的上面。用 `z-index` 與負 `margin` 製造重疊，重疊處要看得出來誰壓誰。
2. **每一塊都是歪的。** `--r` 在 −2.4°～+1.6° 之間，**每一塊的角度都不一樣**，不要用同一個值。
3. **順序是時間不是重要性。** 貼上去的先後決定層級。

```css
.board{ position:relative; display:grid; grid-template-columns:repeat(12,1fr); gap:18px 16px; align-items:start }
.s1{ grid-column:1/7;  --r:-1.4deg }
.s2{ grid-column:7/13; --r: 1.1deg }
.s3{ grid-column:1/5;  --r:  .9deg; margin-top:-14px }   /* 負 margin ＝ 壓在上一張上面 */
.s4{ grid-column:5/9;  --r: -.7deg }
```

### 留白

留白率 20–35%。**比迷幻海報鬆、比瑞士國際緊。**留白不是呼吸，是「還沒有人貼上去」。留白區塊要不規則，不要留成一條乾淨的邊界。

### 響應式

- `≤900px`：公佈欄攤成單欄，取消重疊與跨紙膠帶，旋轉保留但減半。
- `≤560px`：**旋轉全部歸零**（手機上歪的紙會造成水平捲動）、陰影從 5px 降到 3px、剪字標題的 `--sc` 範圍收窄到 0.9–1.15、膠帶寬度 74px → 58px。

---

## 六、元件配方

### nav — 新印一張（現用頁最清楚）

本流派的導覽現用態不該用高亮色塊，應該用**清晰度**：現用頁那一格是剛影印出來的（第 0 代、實心黑底、粉紅位移陰影），其他頁是上禮拜印的（第 4 代濾鏡、糊掉、發灰）。

```css
.nav a{ display:block; padding:8px 12px 9px; background:#F6F4EE; border:2px solid #121110;
        box-shadow:3px 3px 0 #121110; transform:rotate(var(--nr,0deg)); transition:transform 90ms linear }
.nav a:hover{ transform:rotate(calc(var(--nr,0deg) - 2deg)) translateY(-3px) }
.nav .old a{ filter:url(#xg4); color:#3a3833 }              /* 上禮拜印的 */
.nav .old a:hover{ filter:url(#xg2) }                        /* 拿近一點看 */
.nav .now a{ background:#121110; color:#F6F4EE; box-shadow:4px 4px 0 #FF2E7A; filter:none }
```

每一格給不同的 `--nr`（例：−1.1° / 0.8° / −0.6° / 1.3°）。

### 按鈕

```css
.opt{ background:#EFEDE6; border:2px solid #121110; box-shadow:4px 4px 0 #121110;
      padding:11px 13px; font-weight:900; cursor:pointer;
      transition:transform 80ms linear, box-shadow 80ms linear }
.opt:hover, .opt:focus-visible{ transform:translate(-2px,-2px); box-shadow:7px 7px 0 #FF2E7A; outline:none }
.opt:disabled{ color:#8E8B84; box-shadow:4px 4px 0 #8E8B84; cursor:not-allowed }
```

按下去不是「壓下去」（那是 Neubrutalism 的按壓硬陰影），是**往左上抽起來、陰影變成粉紅**——紙被拿起來一點。

### 卡片 = 一張紙

用 `.sheet`（見特徵 3）。卡片內一定要有：兩枚訂書針、一段上緣膠帶、一個角落的代數標籤 `GEN n`。

### 連結

```css
a{ color:#121110; background:#F5F000; box-shadow:2px 2px 0 #121110; padding:0 3px; text-decoration:none }
a:hover, a:focus-visible{ background:#FF2E7A; color:#F6F4EE; outline:none }
```

**連結是螢光筆畫過的，不是底線。**

### 表單

```css
input, select, textarea{
  background:#F6F4EE; border:2px solid #121110; box-shadow:3px 3px 0 #121110;
  padding:8px 10px; font:inherit; border-radius:0;
}
input:focus{ outline:3px solid #FF2E7A; outline-offset:2px }
label{ font-family:"Special Elite",monospace; font-size:13px }   /* 欄位標籤是打字機打的 */
.err{ background:#121110; color:#F5F000; padding:2px 6px; font-weight:900 }
```

### footer

反相：整塊 `#121110` 底、`#F6F4EE` 字、上緣 4px 實線。footer 裡的連結底色換成螢光粉（酸黃壓在黑上會刺眼）。footer 是**唯一**准許大面積純黑的區域，因為它是「紙的背面」。

---

## 七、動效規則

四種，缺一不可。全部都要有 `prefers-reduced-motion` 降級，且降級後資訊零損失。

| 種類 | 名稱 | 觸發 | duration / easing |
|---|---|---|---|
| ambient 環境 | 碳粉落塵 `tonerfall` | 無（恆常） | 38s linear infinite |
| ambient 環境 | 曝光帶 `expo` | 無（恆常） | 22s linear infinite，`mix-blend-mode:screen` |
| input 輸入 | 掀紙 `sheet-lift` | hover / focus-within | **90ms linear**（必須 <100ms） |
| transition 轉場 | 疊上新的一張 `slap-on` | 換頁 / 換狀態 | 340ms cubic-bezier(.2,.9,.3,1) |
| signature 簽名 | 再影印一次 `recopy` | 按鍵 | 光棒 1.05s linear + 330ms 後換代 |

```css
/* input-driven：掀紙 —— 以訂書針為軸抬起，陰影變厚 */
.sheet{ transition:transform 90ms linear, box-shadow 90ms linear }
.sheet:hover, .sheet:focus-within{
  transform:rotate(calc(var(--r,0deg) - 2.4deg)) translateY(-5px);
  box-shadow:9px 11px 0 #121110; z-index:40;
}

/* transition：疊上新的一張 —— 舊的不動只變淡，新的從上面丟下來 */
@view-transition{ navigation:auto }
::view-transition-old(root){ animation:none; opacity:.55 }
::view-transition-new(root){ animation:slapon .34s cubic-bezier(.2,.9,.3,1) }
@keyframes slapon{ from{ transform:translateY(-34px) rotate(1.6deg); opacity:.2 } to{ transform:none; opacity:1 } }

/* signature：影印機的光棒 */
.lightbar{ position:fixed; left:0; right:0; top:0; height:10px; z-index:70; pointer-events:none;
           background:#F6F4EE; box-shadow:0 0 0 2px #121110; display:none }
.lightbar.on{ display:block; animation:sweep 1.05s linear }
@keyframes sweep{ from{ transform:translateY(-14px) } to{ transform:translateY(102vh) } }

@media (prefers-reduced-motion:reduce){
  .grit{ animation:none }                 /* 落塵定格，圖樣仍在 */
  .expo{ display:none }
  .sheet{ transition:none }
  .sheet:hover, .sheet:focus-within{ transform:rotate(var(--r,0deg)); outline:3px solid #FF2E7A }
  .lightbar.on{ animation:none; display:none }   /* 代數直接跳，結果完全相同 */
  ::view-transition-old(root), ::view-transition-new(root){ animation:none }
}
```

**明文禁止**：淡入進場、視差捲動、數字計數、stroke-dashoffset 描繪、按壓硬陰影（`translate(2px,2px)` + 陰影縮小）。這些在本館已經過載，而且它們全都是「平滑的」——本流派沒有平滑的東西。

---

## 八、插畫與圖像風格

技法代號：**generation-decay 世代耗損拼貼**。原語只有三種，**零外部圖片**。

### 原語 1：高反差二值輪廓

所有「照片」都是被影印過的照片：**只有純黑與純白，沒有中間調**。實作是把物件畫成一組實心黑形狀（`fill`，不是 `stroke`），然後上世代濾鏡。

判準：**拿掉標籤仍認得出它是什麼東西，但認不出它是什麼牌子。**

```html
<svg viewBox="0 0 120 120" role="img" aria-label="影印過的齒盤">
  <circle cx="60" cy="60" r="36" fill="#121110"/>
  <path d="M95.9 56.9L110.4 60L95.9 63.1Z …" fill="#121110"/>   <!-- 齒 -->
  <circle cx="60" cy="60" r="21.6" fill="#EFEDE6"/>              <!-- 挖空 -->
  <rect x="56.6" y="37.7" width="6.8" height="22.3" fill="#121110" transform="rotate(17 60 60)"/>
  <circle cx="60" cy="60" r="7.2" fill="#EFEDE6"/>
</svg>
```

**線寬下限 2.2px。** 低於這個值的東西活不過第二代，畫了等於沒畫。**明文禁止 `stroke-linecap:round`**（影印不出圓端點）與細線幾何線描。

### 原語 2：剪字紙片

見特徵 2。它同時是標題、也是圖像——本流派沒有「標題」與「插圖」的分界。

### 原語 3：固定證據

膠帶、訂書針、撕邊、油手印、立可白的塗痕。見特徵 3。

### 明文禁用

- `feTurbulence` / `feDisplacementMap` 手抖邊（迷幻海報的語彙，而且會糊掉字緣）
- 半調網點當主要質感（半調在本流派是**壞掉的東西**：一貼上去第二代就變成一坨黑，這是它的劇情功能不是它的裝飾功能）
- 寫實描繪、漸層、圓角、細線幾何線描
- emoji 當 icon

---

## 九、Logo 與 Favicon 設計指南

**Logo 是一塊黑，不是一組字。**

配方：
1. 一塊撕邊或歪斜的實心黑矩形（`path` 四角各偏 2–4px，不用 `rect`）。
2. 一枚紙色的**粗線**符號（線寬 ≥12，`fill:none`），畫出這家店的動作或物件輪廓。
3. 一片貼上去的紙色標籤，上面用 Archivo Black 打拉丁名，整片旋轉 −2°。
4. **底下墊一塊偏 5px 的螢光粉**——沒對準的第二塊版。

```svg
<svg viewBox="0 0 260 92" role="img" aria-label="店名">
  <rect x="5" y="5" width="252" height="84" fill="#FF2E7A"/>          <!-- 沒對準的粉紅版 -->
  <path d="M0 3 L248 0 L252 80 L6 84 Z" fill="#121110"/>              <!-- 歪的黑塊 -->
  <path d="M26 62 C26 30 52 20 84 22 C116 24 132 44 160 40 C186 36 200 26 224 32"
        fill="none" stroke="#EFEDE6" stroke-width="13"/>              <!-- 粗線符號 -->
  <rect x="96" y="8" width="72" height="22" fill="#EFEDE6" transform="rotate(-2 132 19)"/>
  <text x="132" y="25" text-anchor="middle" font-family="Archivo Black,sans-serif"
        font-size="15" fill="#121110" transform="rotate(-2 132 19)">CROOKED</text>
</svg>
```

**Favicon**：16px 只放得下一件事——**同一個粗線符號，畫兩次，粉紅那次偏 2px**。不要放字。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23EFEDE6'/%3E%3Cpath d='M6 22 C6 12 13 8 20 11 C25 13 26 17 28 16' fill='none' stroke='%23FF2E7A' stroke-width='6'/%3E%3Cpath d='M4 20 C4 10 11 6 18 9 C23 11 24 15 26 14' fill='none' stroke='%23121110' stroke-width='6'/%3E%3Crect x='2' y='24' width='9' height='6' fill='%23121110'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

### Do

- 每一個視覺元素都問一次「你活得到第幾代」。
- 標題剪字用決定性亂數，同一段文字永遠同一組剪法。
- 陰影一律 `0` blur、實心、有方向。
- 粉紅永遠偏移，永遠不對齊。
- 灰只給壞掉的東西。
- 正文用真的 HTML 文字、`gen ≤ 1`，並在頁面上老實說「正文是重打的」。
- 文案寫死具體的價錢、地址、電話、時間。
- 手機把旋轉歸零。

### Don't

- ❌ 紫藍漸層、任何漸層
- ❌ 圓角、模糊陰影、`rounded-2xl` 卡片
- ❌ 置中大標＋副標＋兩顆按鈕＋三張卡片
- ❌ emoji 當 icon
- ❌ Lorem ipsum、行銷腔、「EST. 19xx」年份徽章
- ❌ 細字（<400）、細線（<2.2px）、`stroke-linecap:round`
- ❌ 把濾鏡上在長篇正文上（世代耗損是內容，不是懲罰）
- ❌ 用 `dilate` 做碳粉暈開（那會把黑吃掉，要用 `erode`）
- ❌ 在有 `clip-path` 的元素上用 `box-shadow`（會被一起剪掉，改用 0 模糊的 `drop-shadow`）
- ❌ 讓粉紅與黑對齊（一對齊就變成 Neubrutalism）
- ❌ 灰階照片、半調當主要質感、紙纖維紋理
- ❌ 跑馬燈（本流派的資訊不會捲動，它被釘在牆上）

### 與鄰近流派的分界（很重要）

| 對照 | 差別 |
|---|---|
| **達達拼貼 Dada** | 達達的拼貼是**構成**（各種碎片的異質並置、有色彩、有幾何構圖）；本流派的拼貼是**複製的殘骸**，只有黑白＋一塊沒對準的螢光，而且它有代數。 |
| **Neubrutalism 網頁新粗獷** | 那個是乾淨的：硬邊、飽和色塊、對齊的位移陰影、圓體字。本流派的邊緣全部是毛的、彩色只有一塊而且沒對準。 |
| **里索 Risograph** | 里索是**多塊乾淨的專色版互相疊印**、有半調網點、顏色是主角。本流派只有一塊黑加一塊沒對準的粉，而且它拒絕中間調。 |
| **Grunge / Ray Gun** | 那是排版的解構（字疊字、字級亂跳、負字距到不可讀）。本流派的版面其實很直白——它壞掉的是**印刷品質**，不是排版邏輯。 |

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant" data-gen="0">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜店名</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700;900&family=Special+Elite&display=swap" rel="stylesheet">
<style>
:root{--paper:#EFEDE6;--paper2:#F6F4EE;--toner:#121110;--pink:#FF2E7A;--acid:#F5F000;--smudge:#8E8B84;--xf:none}
html[data-gen="1"]{--xf:url(#xg1)} html[data-gen="5"]{--xf:url(#xg5)}
[data-xerox]{filter:var(--xf)}
body{background:var(--paper);color:var(--toner);font-family:"Noto Sans TC",sans-serif;font-size:16px;line-height:1.62}
/* …特徵 1–5 的 CSS… */
</style>
</head>
<body>
  <svg style="position:absolute;width:0;height:0" aria-hidden="true"><defs><!-- xg1…xg5 --></defs></svg>
  <div class="grit" aria-hidden="true"></div>
  <div class="expo" aria-hidden="true"></div>
  <div class="lightbar" id="lightbar" aria-hidden="true"></div>

  <header class="mast">
    <a class="brand" href="index.html"><!-- inline logo svg --></a>
    <nav aria-label="主要導覽">
      <ul class="nav">
        <li class="now"><a href="index.html" aria-current="page">
          <span class="num">01</span><span class="zh">公佈欄</span><span class="gen">FRESH COPY</span></a></li>
        <li class="old"><a href="two.html"><span class="num">02</span><span class="zh">第二頁</span></a></li>
      </ul>
      <p class="navnote">你現在在的那一頁是剛影印出來的，其他頁是上禮拜印的。</p>
    </nav>
  </header>

  <main class="wrap">
    <div class="board">
      <div class="bridge" id="t1"></div>
      <article class="sheet s1" data-xerox data-fix="0">
        <span class="staple" style="left:14px;top:-3px;transform:rotate(-8deg)"></span>
        <span class="staple" style="right:16px;top:-3px;transform:rotate(6deg)"></span>
        <span class="rnw"><!-- 剪字標題 --></span>
        <p>內容。價錢、地址、時間寫死。</p>
        <span class="genlab">GEN 0</span>
      </article>
      <!-- …其餘紙片，每張不同 --r、不同 gen… -->
    </div>
  </main>

  <footer class="foot"><!-- 反相：黑底紙色字 --></footer>

  <div class="copier">
    <button class="cpbtn" id="cpbtn">再影印一次<span id="cpgen">第 0 代</span></button>
  </div>

<script>
(function(){
  var root=document.documentElement, bar=document.getElementById('lightbar');
  var RM=matchMedia('(prefers-reduced-motion: reduce)'), g=0;
  document.getElementById('cpbtn').addEventListener('click',function(){
    if(g>=5)return; g++;
    if(RM.matches){root.setAttribute('data-gen',g);return;}
    bar.classList.remove('on'); void bar.offsetWidth; bar.classList.add('on');
    setTimeout(function(){root.setAttribute('data-gen',g);},330);
    setTimeout(function(){bar.classList.remove('on');},1100);
  });
})();
</script>
</body></html>
```

---

## 十二、技術實作與相容性

三項核心技術，各自承載一個不可省略特徵。支援度於 **2026-08-23** 查證。

### 12.1 SVG filter：`feComponentTransfer` + `feMorphology`（A 渲染層）

**承載**：特徵 1 世代耗損、特徵 5 毛邊。硬門檻把中間調推到兩端，`erode` 讓碳粉外擴。

**支援現況**：MDN《`<feComponentTransfer>`》標示 **Baseline Widely available**，自 **2015-07** 起跨瀏覽器；《`<feMorphology>`》同為 **Baseline Widely available**，自 **2015-07** 起跨瀏覽器。查證來源：MDN Web Docs（`developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComponentTransfer`、`.../feMorphology`）。

**fallback**：不支援時 `filter:url(#…)` 整個被忽略，畫面停在第 0 代——**版面、對比、可讀性完全不變，資訊零損失**。因此本站把「第 0 代」設計成一個本來就成立的完整畫面，世代耗損是加上去的，不是必要的。

**踩過的坑（務必記下）**：
- 讓黑長大的是 `erode` 不是 `dilate`。`dilate` 取鄰域最大值（白長大），`erode` 取最小值（黑長大）。
- `erode` 同時作用在 alpha 上，所以濾鏡元素的**背景必須不透明**，否則整塊會從邊緣被吃掉。本站把濾鏡上在有 `background` 的 `.sheet` 上，邊緣被啃掉 ≤1.35px——剛好就是影印紙邊的樣子，予以保留。
- 必須寫 `color-interpolation-filters="sRGB"`。預設值是 `linearRGB`，門檻會落在完全不同的地方，看起來像沒生效。

**效能**：本站單頁最多 9 個受濾鏡元素（`.sheet`、`.fig`），每個 ≤ 560×420。濾鏡只在 `data-gen` 改變時重新合成，不在動畫每幀重算——**光棒是獨立的 `transform` 動畫，代數在 330ms 後一次換完**，因此不會逐幀跑濾鏡。

### 12.2 View Transition API（B 動效與時間軸層）

**承載**：轉場「疊上新的一張」——新內容像一張剛印好的紙被丟到舊的上面（舊的不動只變淡，新的從上方落下並帶 1.6° 再回正）。這正是公佈欄的行為，用 CSS transition 做不到（換頁與 DOM 重建之間沒有共同時間軸）。

**支援現況**：caniuse `view-transitions`（單文件）**全球覆蓋 90.2%**，Chrome/Edge **111+**、Safari **18.0+**、Firefox **144+**（143 為預設關閉）、Samsung Internet 23+。MDN 標示 `Document.startViewTransition()` 為 **Baseline 2025**（2025-10 起三引擎皆支援）。查證來源：`caniuse.com/view-transitions`、MDN《Document: startViewTransition() method》。

跨文件轉場以 `@view-transition{ navigation:auto }` 宣告——不支援的瀏覽器會直接忽略這個 at-rule，沒有副作用。

**fallback**：
```js
var go=function(){ /* 改 DOM */ };
if(document.startViewTransition && !RM.matches){ document.startViewTransition(go); } else { go(); }
```
不支援時 DOM 直接更新，**狀態與內容完全相同，只是沒有那 340ms**。`prefers-reduced-motion` 走同一條路徑。

### 12.3 CSS anchor positioning（C 版面與樣式層）

**承載**：特徵 3 的**跨兩張紙的膠帶**。這條膠帶的左端錨定在 A 紙的右緣、右端錨定在 B 紙的左緣——它同時參照兩個不同的元素。絕對定位做不到：兩張紙在 grid 裡會隨視窗寬度移動，膠帶會飛走。

**支援現況**：caniuse `css-anchor-positioning` **全球覆蓋 84.12%**，Chrome/Edge **125+**（2024-05）、Safari **26.0+**、Firefox **147+**、Samsung Internet 27+、Opera 111+。MDN 標示 `anchor()`、`position-area`、`position-try-fallbacks` 為 **Baseline 2026**（2026-01 起）。查證來源：`caniuse.com/css-anchor-positioning`、MDN《CSS anchor positioning》。

**注意**：MDN 另標示 `position-anchor` **尚未達 Baseline**。本站因此**不使用 `position-anchor`**，改用具名的 `anchor(--name side)` 直接在 `left`／`right`／`top` 內取值——這三個函式版本才是 Baseline 2026 的那一組。

**fallback**：
```css
@supports not (anchor-name:--probe){ .bridge{ display:none } }
```
跨紙膠帶消失，但**每一張紙自己的上緣膠帶與兩枚訂書針是 `::before` 與 `.staple` 畫的、與 anchor positioning 無關，永遠都在**——特徵 3「實體固定的證據」完整保留，只是少了那三條跨紙的粉紅膠帶。資訊零損失（膠帶不承載任何文字）。

### 12.4 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline CSS/JS/SVG） | ≤350KB | 27–57KB（最大為零件抽屜頁 57KB，含 24 張 inline SVG） |
| 外部資源 | 僅 Google Fonts | 僅 Google Fonts（5 個字族），零外部圖片、零音檔、零函式庫 |
| 首屏 JS 執行 | ≤100ms | 影印鍵初始化 <1ms（讀 sessionStorage + 設一個屬性）；核心功能頁的引擎為 3 個物件的算術，<1ms |
| 主要動畫 | 60fps | `tonerfall` 與 `expo` 只動 `background-position` 與 `transform`；`sheet-lift` 只動 `transform`／`box-shadow`；光棒只動 `transform`。**零 `getBoundingClientRect`、零 layout thrashing** |
| 濾鏡合成 | — | 每頁 ≤9 個受濾鏡元素，僅在換代時合成一次，不逐幀 |

### 12.5 無障礙與 noscript

- **世代耗損只上在圖像層與標題**，長篇正文永遠 `gen ≤ 1`，並在 footer 明寫「正文是重打的」。
- 核心功能中「在紙上糊掉」的文字，DOM 裡永遠是**真的、可選取、螢幕閱讀器讀得到的文字**，並附一段視覺隱藏的說明（`（這一行在紙上已經糊成一整塊）`）。畫面上的失讀是劇情，不是資料被刪掉。
- 導覽的現用態除了「比較清楚」之外，一律另附 `aria-current="page"` 與可見的文字標籤，**清晰度從不是唯一通道**。
- `noscript` 提供：完整規則、筆畫存活公式、原稿三行的實測數值、全部選項清單與一組標準解——沒有 JavaScript 也推得出同一個答案。
- 焦點樣式一律 `outline:3px solid #FF2E7A; outline-offset:2px`，永不移除。
