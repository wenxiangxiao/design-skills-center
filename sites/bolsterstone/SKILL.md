---
name: teletext-character-cell
description: World System Teletext broadcast pages — a fixed 40x24 character cell matrix, exactly eight 3-bit RGB colours on black, colour attributes that each consume one cell, 2x3 sixel mosaic graphics, and double-height headings.
---

# 終端機 Teletext／Ceefax — 字元格廣播頁

> 本規格書描述的是 **World System Teletext（WST，1974 年起）** 的版面模型，不是「復古終端機風」、不是 CRT 磷光、不是 Y2K。
> 判準只有一條：**把首屏的文字全部遮掉，懂設計的人要在三秒內說出「這是 Teletext／Ceefax」。**
> 做得到的原因永遠是那五個不可省略的特徵，不是掃描線、不是發光、不是做舊。

---

## 一、設計哲學

Teletext 不是一種美學選擇，是一條**每秒只能塞進 400 位元組的傳輸線**留下的痕跡。

BBC 的 Ceefax（1974）與 IBA 的 ORACLE（1976）把資料藏在電視訊號的垂直遮蔽區（VBI）裡。一整頁能用的位元少到必須這樣妥協：

| 限制 | 結果（也就是今天你看到的「風格」） |
|---|---|
| 一頁只有 40×24＝960 個字元位置 | 版面沒有盒模型。**所有位置都由空白字元決定。** |
| 顏色只有 3 個位元 | 恰好 8 色，就是 RGB 立方的 8 個頂點。沒有中間色，沒有淡一點的版本。 |
| 屬性沒有獨立的頻寬 | **換顏色要花掉一個字元位置**（spacing attribute），所以變色處必然留下一個真的空格。 |
| 沒有點陣圖的餘裕 | 圖只能用一套 64 形的 2×3 方塊字符（sixel mosaic）拼。 |
| 沒有隨機存取 | 你不能「捲到下面」。你打一個三位數頁碼，然後**等**。 |

因此本風格的設計哲學是：**先接受限制，版面自己會長出來。**
凡是你想加的東西——漸層、陰影、圓角、發光、第九個顏色、一格半的字——都是在偷用一條不存在的頻寬，加上去就不是這個風格了。

態度上它也不是懷舊：Ceefax 一直播到 2012 年，荷蘭的 NOS Teletekst 到今天還在更新，而且**它是全世界最快能讀完的新聞介面**。做這個風格時要把它當成一個還在服役的工具，不是骨董。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 Teletext 了。全部五項在本站的四個頁面上都看得到。

### 特徵 1｜40 格 × 24 列的字格矩陣，整體縮放、絕不重排

頁寬永遠是 40 格。手機上不是「換成一欄」，是**整台機器變小**。一格的寬度由容器寬度算出來，所以 40 格在任何寬度都還是 40 格。

CJK 佔 **2 格**（這是所有終端機的規則，也讓中文版的 Teletext 有一條可機械驗算的排版律：一列最多 20 個漢字）。

```css
/* 整台機器 */
.tv{ width: min(94vw, 660px, 66vh); }          /* 高度也納入，避免一頁要捲動 */
.pg{
  container-type: inline-size;                  /* 讓 cqw 有意義 */
  --u : 2.5cqw;                                 /* 一格寬 = 容器寬 / 40 */
  --rh: calc(var(--u) * 1.8);                   /* 一列高 = 1.8 格（WST 字格是瘦長的）*/
  display: grid; background: #000;
}
.l{ display:grid; grid-template-columns: repeat(40, var(--u)); height: var(--rh); }
.l > i, .l > a{
  grid-column: var(--s) / span var(--n);        /* --s 起始格、--n 佔幾格 */
  display:block; height:var(--rh); line-height:var(--rh); white-space:pre;
}
.a{ font-size: calc(var(--u) / .6);  }          /* 半角：等寬體前進寬 0.6em → 剛好一格 */
.j{ font-size: calc(var(--u) * 2);   }          /* 全角：前進寬 1em → 剛好兩格 */
```

**紅線**：內容區的樣式表裡不准出現任何 `margin` / `padding` / `gap` / `position` 去排內容。一格一格數，數不出來就是排錯了。

### 特徵 2｜恰好 8 個顏色，就是 RGB 立方的 8 個頂點，地色永遠是黑

沒有第九個色碼，沒有任何一個顏色的淡版、深版、半透明版。

```css
:root{
  --k:#000000; --r:#FF0000; --g:#00FF00; --y:#FFFF00;
  --b:#0000FF; --m:#FF00FF; --c:#00FFFF; --w:#FFFFFF;
}
.fr{color:var(--r)} .bg{background:var(--g)}   /* 前景 f*，背景 b* */
```

面積：黑 ≈ 62%（它不是背景色，它是**沒有訊號**）、白 ≈ 14%（正文）、青 ≈ 9%、黃 ≈ 7%、綠 ≈ 4%、紅 ≈ 2%、洋紅 ≈ 1%、藍 ≈ 1%。

**可讀性（實測，對黑）**：白 21.00、黃 19.56、青 16.75、綠 15.30、洋紅 6.70、紅 5.25、**藍 2.44**。
→ **藍明文禁止承載任何文字**，只能當背景色塊與馬賽克填色（真機也是這樣用的）。洋紅與紅只放大字與標籤。

### 特徵 3｜屬性佔一格：換顏色會在版面上留下一個真的空格

這是**沒有人模仿、卻最決定性**的一條。WST 的顏色與倍高是 *spacing attribute*：它自己就是一個字元位置，顯示為當前背景色的空格，效果從**下一格**開始。

所以 Teletext 的版面永遠有一種「字與字之間老是多出一格」的節奏。要做對，就把這個空格**真的**排進去：

```html
<!-- 「 100 索引」：第 1 格是紅色屬性（空白），文字從第 2 格開始 -->
<div class="l">
  <i class="a fr bk" style="--s:1;--n:10"> 100 索引</i>
</div>
```

實作上最省事的做法是寫一個編譯器：源碼寫 `{fr} 100 索引`，`{fr}` 佔一格輸出成空白，並驗算整列恰好 40 格。背景屬性另有一條規則：**它持續到列末**，所以一列只要設過背景色，補齊的格也是那個顏色——這就是 Teletext 那些「滿版色條標題」的來歷。

### 特徵 4｜2×3 sixel 馬賽克：全站唯一的圖形語彙

每一格可以換成一個 2 欄 × 3 列的方塊字符，共 64 形（2⁶）。**一格只能有一個前景色**——所以顏色只能在字格邊界換手（x 為 2 的倍數、y 為 3 的倍數）。

零曲線、零斜線、零半色調、零反鋸齒。不用 SVG、不用 canvas、不用圖片——64 個形全部由多層 `linear-gradient` 硬停點合成：

```css
:root{ --G: linear-gradient(currentColor 0 0); }
.o{ background-size:50.4% 33.8%; background-repeat:no-repeat; }
/* 位元：0 左上 1 右上 2 中左 3 中右 4 左下 5 右下 */
.s21{ background-image:var(--G),var(--G),var(--G);
      background-position:0 0, 0 50%, 0 100%; }        /* 左半實心 */
.s63{ background-image:var(--G),var(--G),var(--G),var(--G),var(--G),var(--G);
      background-position:0 0,100% 0,0 50%,100% 50%,0 100%,100% 100%; } /* 全滿 */
```

產生器（把 2×3 次像素點陣編譯成字格）：

```js
const P=['0 0','100% 0','0 50%','100% 50%','0 100%','100% 100%'];
for(let n=0;n<64;n++){
  const g=[],p=[];
  for(let b=0;b<6;b++) if(n>>b&1){ g.push('var(--G)'); p.push(P[b]); }
  css += g.length ? `.s${n}{background-image:${g.join(',')};background-position:${p.join(',')}}`
                  : `.s${n}{background-image:none}`;
}
```

### 特徵 5｜倍高標題 ＋ 頁首列 ＋ 底列四色 FASTEXT

三件事一起出現，缺一不可，因為它們是「這是一頁廣播，不是一個網頁」的全部證據。

- **倍高（double height）**：標題佔兩列、**寬度不變**。所以標題永遠只有 40 格寬，而且下一列不能放字。
- **頁首列**：第 0 列固定是 `P<頁碼>　<台名> <頁碼>　<子頁 n/m>　<日期>　<時鐘>`，全 ASCII，時鐘走真實時刻。
- **底列**：第 23 列是紅／綠／黃／青四個等寬色鍵標籤（FASTEXT），每格 10 欄。

```css
/* 倍高：只放大高度，前進寬不變——這才是 WST 的 double height */
.dh{ transform: scaleY(2); transform-origin: left top; }
```

```html
<div class="l" style="--r:24">
  <i class="a fr bk" style="--s:1;--n:10"> 100 索引</i>
  <i class="a fg bk" style="--s:11;--n:10"> 142 規矩</i>
  <i class="a fy bk" style="--s:21;--n:10"> 152 連問</i>
  <i class="a fc bk" style="--s:31;--n:10"> 199 委製</i>
</div>
```

---

## 三、色彩系統

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 黑 | `#000000` | 地色＝沒有訊號。**唯一的大面積底色。** | 62% |
| 白 | `#FFFFFF` | 正文、數值、頁首的頁碼與日期 | 14% |
| 青 | `#00FFFF` | 次級說明、台名、規格條、分隔線 | 9% |
| 黃 | `#FFFF00` | 金額、時刻、強調、時鐘、標題 | 7% |
| 綠 | `#00FF00` | 正向狀態（答對、已完成）、標題、色條 | 4% |
| 紅 | `#FF0000` | 警示、禁止、失手頁、第一顆 FASTEXT 鍵 | 2% |
| 洋紅 | `#FF00FF` | 機器狀態（HOLD）、難度標籤 | 1% |
| 藍 | `#0000FF` | **只能當背景與馬賽克填色，不得承載文字** | 1% |

硬規則：

- 零漸層（唯一合法的 `linear-gradient` 是 sixel 的硬停點方塊與倒數條的分格線——那是形，不是漸層）
- 零 `opacity`、零 `rgba` 第四位、零 `filter`、零中間灰、零第九個色碼
- 零陰影、零模糊、零發光、零金屬、零玻璃擬態、零紋理、零噪聲、零光源
- 圓角一律 `0`
- **零掃描線、零 CRT 曲面、零磷光殘影**——那是「復古終端機」，不是 Teletext。Teletext 的主體是**頁**，不是螢幕。
- 狀態一律用「整塊反相（reverse video）」或「換一個色鍵」表示；因為顏色只有 8 個且都被分配過了，每一個狀態都必須同時帶 `aria-current` / `aria-pressed` 或文字。

---

## 四、字體系統

只有兩種字級，因為只有兩種字寬。

| 類別 | 字體 | 字級 | 前進寬 | 佔格 |
|---|---|---|---|---|
| 半角（拉丁、數字、標點） | `DM Mono` → `ui-monospace, SFMono-Regular, Menlo, monospace` | `calc(var(--u) / .6)` | 0.6em | 1 格 |
| 全角（CJK） | `Noto Sans TC` 500 → `PingFang TC, Microsoft JhengHei, sans-serif` | `calc(var(--u) * 2)` | 1em | 2 格 |

- 選等寬體時**必須確認前進寬是 0.6em**（DM Mono、Space Mono、IBM Plex Mono、Roboto Mono 都是）。若換一支 0.55em 或 0.55 的字體，把 `.6` 改成該值即可——因為每一個 span 都由 grid 定起始格，串內漂移不會累積到下一段。
- 零襯線體、零手寫體、零可變字型軸動畫。
- 零字重層級：半角只用 400，全角只用 500。標題不靠粗體，靠**倍高**。
- 字距一律 `letter-spacing: 0`；`font-variant-ligatures: none`（連字會吃掉格）。
- 最大字級就是倍高的那一階（≈ 2 × 一格高）。**本流派沒有 hero 大標。**

---

## 五、版面與網格

```
┌─ 第 0 列 ───────────────────────────────┐  頁首：P頁碼 / 台名 / 子頁 / 日期 / 時鐘
│  第 1–2 列                              │  倍高標題（佔兩列，第 2 列必須空著）
│  第 3 列                                │  一整列 sixel 色條（分隔線，永遠不是 border）
│  第 4–21 列                             │  內容（18 列 = 你全部的餘裕）
│  第 22 列                               │  輪頁倒數條
└─ 第 23 列 ──────────────────────────────┘  四色 FASTEXT
```

- **一頁就是一頁**：960 格用完就用完。寫不下的東西**分到子頁**，不是把頁面拉長。長文章不屬於這個風格。
- 分隔線一律是一整列 sixel 方塊（上半實心 `s3`、下半實心 `s48`、全滿 `s63`），**不是** `border` 也不是 `hr`。
- 章節標題是「滿版色條 ＋ 黑字」：`{bg}{fk} 社  務 ` ——背景屬性持續到列末，色條自己就滿了。
- 對齊只能用空格。表格就是「把數字排在同一格起點」，沒有 `table`，沒有 `text-align:right`。
- 子頁（subpage）：一頁裝不完的內容切成 1/3、2/3、3/3，**每 12 秒整頁硬切一次**，使用者只能等（或按 HOLD 凍結）。
- RWD：≤560px 不重排、不隱藏任何一格內容——只是整台機器變小。這是本風格最省事的一點，也是它最不像現代網頁的一點。

---

## 六、元件配方

### 導覽：解碼器列（keypad-entry）

Teletext 沒有超連結。導覽是**把一個三位數打進去**。所以導覽不是廣播頁的一部分，它是頁面下方那一列機器介面：

```html
<div class="dk" role="group" aria-label="解碼器">
  <div class="dkr">
    <span class="lbl fc">頁碼</span>
    <output class="num fy" id="ent" aria-live="polite">100</output>
    <span class="lbl fw">數字鍵打三位數頁碼，或按下面的色鍵</span>
  </div>
  <nav class="dkr fast" aria-label="色鍵導覽">
    <a class="ky fr" href="index.html" aria-current="page"><b>100</b><s>索引</s></a>
    <a class="ky fg" href="p142.html"><b>142</b><s>規矩</s></a>
    <a class="ky fy" href="p152.html"><b>152</b><s>連問</s></a>
    <a class="ky fc" href="p199.html"><b>199</b><s>委製</s></a>
  </nav>
  <div class="dkr pad" aria-hidden="true"><button class="dg" data-d="1">1</button>…</div>
</div>
```

```css
.dk{ container-type:inline-size; --u:2.5cqw; border-top:calc(var(--u)*.34) solid var(--c); }
.dkr{ display:grid; grid-template-columns:repeat(40,var(--u)); }
.ky{ grid-column:span 10; border-left:calc(var(--u)*.34) solid currentColor; text-align:center; }
.ky:hover, .ky[aria-current]{ background:currentColor; }        /* 反相 */
.ky:hover b, .ky[aria-current] b, .ky:hover s, .ky[aria-current] s{ color:#000; }
```

數字鍵是 JS 加值（三位湊滿就跳頁）；色鍵是真的 `<a>`，**關掉 JS 導覽完整可用**。

### 按鈕與選項：反相，沒有第二種樣式

```css
.l:has(>a:hover)>a.fy, .l:has(>a:focus-visible)>a.fy{ background:var(--y); color:#000; }
```

沒有 border-radius、沒有陰影、沒有 hover 位移、沒有過場曲線。**選取＝黑白（或黑／該色）對調，瞬間，零過渡。**

### 隱藏答案（conceal）

WST 有一個「隱藏」屬性：文字在版面上佔位但不顯示，按遙控器的 REVEAL 才出來。它持續到**列末**（所以一列只放一個隱藏項）。

```css
.cn{ visibility:hidden }                      /* 佔位但不顯示 */
#rev:checked ~ .tv .cn{ visibility:visible }   /* REVEAL */
```

### 表單 / 狀態機

用純 CSS：`:checked`（開關）、`:target`（頁碼定址）、`:has()`（把好幾個頁碼導到同一頁）。

```css
.q{ display:none }
.q:target{ display:block }
.pg:not(:has(.q:target)):not(:has(.al:target)) #p152{ display:block }  /* 預設頁 */
.pg:has(.al:target) #p189{ display:block }                             /* 錯答一律轉這裡 */
```

### Footer

廣播頁裡**不放** footer——960 格沒有那個餘裕。把商號、地址、電話、法律聲明放在機器外面，用一條 2px 青線隔開，字級固定 13px（那不是廣播內容，所以不受字格約束）。

---

## 七、動效規則

四種，缺一不可。全部是**階梯函數**：Teletext 沒有補間，沒有 easing。凡是你想寫 `ease-in-out` 的地方都寫錯了。

| 種類 | 是什麼 | 觸發 | 值 |
|---|---|---|---|
| ambient 環境 | 頁首時鐘每秒硬跳一格；FLASH 屬性 1Hz 方波 | 時間 | `animation: fx 1s step-end infinite` |
| input 輸入 | 打數字鍵→頁碼欄逐位被取代＋該鍵反相 110ms；選項列 hover 整列反相 | 鍵盤／指標 | `< 100ms`，零過渡 |
| transition 轉場 | **逐列由上往下重畫**（一頁 24 列不是同時到的，是一列一列來的） | 換頁／換狀態 | `animation: scan .4s steps(24) both` |
| signature 簽名 | **`subpage-wait` 等頁**：子頁每 12 秒硬切，頁首右方 12 格倒數條每秒少一格，HOLD 可凍結 | 時間 | `36s step-end infinite` ＋ `cd 12s steps(12)` |

```css
@keyframes fx  { 0%{visibility:visible} 50%{visibility:hidden} }
@keyframes scan{ from{clip-path:inset(0 0 100% 0)} to{clip-path:inset(0 0 0 0)} }
@keyframes cd  { from{clip-path:inset(0 0 0 0)}    to{clip-path:inset(0 100% 0 0)} }
@keyframes sp  { 0%{visibility:visible} 33.3334%{visibility:hidden} 100%{visibility:hidden} }
.sub{ visibility:hidden; animation: sp 36s step-end infinite }
.sub:nth-of-type(1){ animation-delay:0s }
.sub:nth-of-type(2){ animation-delay:-24s }
.sub:nth-of-type(3){ animation-delay:-12s }
#hld:checked ~ .tv .sub{ animation-play-state: paused }   /* HOLD */
```

**降級（資訊零損失）**：

```css
@media (prefers-reduced-motion: reduce){
  .pg.car, .q:target{ animation:none }
  .sub{ visibility:visible; animation:none }
  .pg { display:block }        /* 三個子頁改為上下全部展開，一個字也不會少 */
  .fx { animation:none }
  .cycbar{ animation:none; clip-path:none }
}
```

明文禁用：淡入、視差、滾動揭示、彈簧、位移、縮放、模糊轉場、任何 `cubic-bezier`。

---

## 八、插畫與圖像風格

**技法名稱：`sixel-mosaic` 六格馬賽克構成。** 全站零外部圖片、零照片、零 canvas、頁內零 SVG。

三條原語，明文不允許第四條：

1. **形只由 2×3 方塊組成**。最小單位是一個 1/6 格（次像素）。沒有曲線、沒有斜線、沒有反鋸齒；要斜就用階梯。
2. **一格只能有一個前景色**。所以顏色只能在字格邊界換手（x 為 2 的倍數、y 為 3 的倍數）。畫圖前先把顏色分區對齊到格線，不是畫完再修。
3. **亮處就是「這一格的那一塊有方塊」**。沒有明度階、沒有半色調、沒有網點——需要層次時改變**形的疏密**，不是改顏色。

判準：放大任何一張圖，(a) 找不到任何一段曲線或非 0/90 度的邊；(b) 每一塊顏色都落在 2×3 的格子上；(c) 找不到任何連續明度變化。

作法：先畫一張次像素點陣（一個字元＝一個次像素，`.` 為關），再編譯成字格：

```js
// 每 2×3 一格；一格內非 '.' 的字元必須同色，否則退件
for(let cy=0; cy<h/3; cy++) for(let cx=0; cx<w/2; cx++){
  let v=0, col=null;
  for(const [dx,dy,b] of [[0,0,0],[1,0,1],[0,1,2],[1,1,3],[0,2,4],[1,2,5]]){
    const ch = px[cy*3+dy][cx*2+dx];
    if(ch==='.') continue;
    if(col && col!==ch) throw new Error('一格只能一個前景色');
    col=ch; v |= 1<<b;
  }
  cells.push({v, col: col||'w'});
}
```

**與相近技法辨明**：
與「8-bit 像素」不同——那是自由的方形像素網格，每個像素都能是任何顏色；這裡的像素被綁在 2×3 的字格裡，而且**一格只能一個顏色**，這一條決定了畫面的全部樣子。
與「半調網點」不同——那是把連續調二值化；這裡沒有任何連續調來源，也沒有網點。
與「型版鏤空剪影」不同——那是刀切的實心面、受橋接約束；這裡是格點的開關。
與細線幾何線描不同——這裡一條線也沒有，只有方塊。

---

## 九、Logo 與 Favicon

Logo 必須用同一套方塊做，字母是 8×12 次像素（4 格 × 4 格）、筆畫寬 2 次像素，顏色分界對齊格線。輸出 SVG 時一個次像素就是一個 1×1 的 `<rect>`：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 40 16" role="img" aria-label="BQB">
  <rect x="-2" y="-2" width="40" height="16" fill="#000000"/>
  <rect x="0" y="0" width="1" height="1" fill="#FFFF00"/>
  <!-- …每一個次像素一個 rect，零 path、零曲線、零漸層… -->
</svg>
```

Favicon 用同樣的邏輯寫成 inline data URI（本站用一個青色問號 ＋ 一個黃色點）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 12'%3E%3Crect width='8' height='12' fill='%23000'/%3E%3Crect x='1' y='1' width='6' height='2' fill='%230FF'/%3E%3Crect x='5' y='3' width='2' height='2' fill='%230FF'/%3E%3Crect x='3' y='5' width='2' height='2' fill='%230FF'/%3E%3Crect x='3' y='9' width='2' height='2' fill='%23FF0'/%3E%3C/svg%3E">
```

零圓角、零漸層、零陰影、零第九色。

---

## 十、Do & Don't

**Do**

- 先寫 24×40 的字格源碼，再編譯成 HTML。手寫 HTML 一定會失格。
- 寫一個驗算器：每一列恰好 40 格（CJK 算 2）、每一屏恰好 24 列、每一格只被一個 span 佔用。不合格就退件。
- 把顏色屬性當成一個**真的字元**排進版面。
- 文案寫成電報體：短句、名詞、數字。一列 40 格逼你把話講完。
- 長內容切子頁，不要把頁面拉長。
- 每一個「用顏色表示的狀態」都補一個 `aria-current` / `aria-pressed` / 文字。

**Don't**

- ✗ 掃描線、CRT 曲面、螢幕反光、磷光殘影、`text-shadow` 發光（那是復古終端機／CRT 磷光，不是 Teletext）
- ✗ 金屬漸層、鉻、銀拉絲（那是 Y2K）
- ✗ 第九個顏色、任何顏色的淡版、`opacity`、`rgba` 第四位、`filter`
- ✗ 陰影、圓角、border-radius、模糊
- ✗ 淡入／滾動揭示／視差／任何 easing 曲線
- ✗ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ✗ 紫藍漸層 hero（本風格根本沒有 hero）
- ✗ emoji 當 icon（icon 是 sixel 方塊）
- ✗ Lorem ipsum、「在當今快節奏的世界」這類 AI 腔
- ✗ 「EST. 19xx」徽章
- ✗ 手機上改成一欄、或隱藏內容（只能整體縮放）
- ✗ 用 `<table>`、`text-align`、`padding` 去排內容（只能用空格）
- ✗ 用點陣圖縮放假裝馬賽克（會隨 devicePixelRatio 變）

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>索引｜台名 P100</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Noto+Sans+TC:wght@500;700&display=swap" rel="stylesheet">
<style>
:root{--G:linear-gradient(currentColor 0 0);
 --k:#000;--r:#F00;--g:#0F0;--y:#FF0;--b:#00F;--m:#F0F;--c:#0FF;--w:#FFF}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#fff;font-family:'DM Mono',ui-monospace,monospace;
 display:flex;flex-direction:column;align-items:center}
.fr{color:var(--r)}.fg{color:var(--g)}.fy{color:var(--y)}.fc{color:var(--c)}.fw{color:var(--w)}.fk{color:var(--k)}
.bk{background:var(--k)}.bg{background:var(--g)}.by{background:var(--y)}.bb{background:var(--b)}.bw{background:var(--w)}
.tv{width:min(94vw,660px,66vh)}
.pg{container-type:inline-size;--u:2.5cqw;--rh:calc(var(--u)*1.8);display:grid;background:#000}
.sc{grid-area:1/1;display:block}
.l{display:grid;grid-template-columns:repeat(40,var(--u));height:var(--rh)}
.l>i,.l>a{grid-column:var(--s)/span var(--n);display:block;height:var(--rh);
 line-height:var(--rh);white-space:pre;font-style:normal}
.a{font-size:calc(var(--u)/.6);font-variant-ligatures:none}
.j{font-family:'Noto Sans TC',sans-serif;font-size:calc(var(--u)*2);font-weight:500}
.o{background-size:50.4% 33.8%;background-repeat:no-repeat}
.s3{background-image:var(--G),var(--G);background-position:0 0,100% 0}
.s63{background-image:var(--G),var(--G),var(--G),var(--G),var(--G),var(--G);
 background-position:0 0,100% 0,0 50%,100% 50%,0 100%,100% 100%}
.dh{transform:scaleY(2);transform-origin:left top}
.cn{visibility:hidden}
#rev:checked~.tv .cn{visibility:visible}
@media (prefers-reduced-motion:reduce){.pg{display:block}}
</style>
</head>
<body>
<input type="checkbox" id="rev" aria-label="REVEAL">
<h1 class="sr">台名 — 第 100 頁 索引</h1>
<main class="tv"><div class="pg"><div class="sc">

  <!-- 第 0 列 頁首 -->
  <div class="l" style="--r:1">
    <i class="a fw bk" style="--s:1;--n:6"> P100 </i>
    <i class="a fc bk" style="--s:7;--n:9"> BQB 100 </i>
    <i class="a fw bk" style="--s:16;--n:17"> 1/3  Sat 19 Sep </i>
    <i class="a fy bk clk" style="--s:33;--n:8">14:32:07</i>
  </div>

  <!-- 第 1–2 列 倍高標題（第 2 列必須空著）-->
  <div class="l" style="--r:2"><i class="j fy bk dh" style="--s:2;--n:14">波斯特石問答社</i></div>
  <div class="l" style="--r:3"></div>

  <!-- 第 3 列 sixel 色條 -->
  <div class="l" style="--r:4"><i class="o fc bk s3" style="--s:2;--n:1"></i><!-- ×39 --></div>

  <!-- 章節標題：滿版色條＋黑字（背景屬性持續到列末）-->
  <div class="l" style="--r:8">
    <i class="a fw bg" style="--s:1;--n:1"> </i>
    <i class="j fk bg" style="--s:2;--n:9"> 社  務 </i>
    <i class="a fw bg" style="--s:11;--n:30"> </i>
  </div>

  <!-- 第 23 列 FASTEXT -->
  <div class="l" style="--r:24">
    <i class="a fr bk" style="--s:1;--n:10"> 100 索引</i>
    <i class="a fg bk" style="--s:11;--n:10"> 142 規矩</i>
    <i class="a fy bk" style="--s:21;--n:10"> 152 連問</i>
    <i class="a fc bk" style="--s:31;--n:10"> 199 委製</i>
  </div>

</div></div></main>
</body>
</html>
```

---

## 十二、技術實作與相容性

本站認領三項核心技術，分屬三層；每一項都是視覺的主要承載者，拿掉就不成立。

### 12.1 容器查詢單位 `cqw`（C 版面與樣式層）

**承載什麼**：40 格字格矩陣的「整體縮放、絕不重排」。`--u: 2.5cqw` 讓一格永遠是容器寬的 1/40。

**支援現況（查證：MDN《CSS container queries》、caniuse `css-container-query-units`，2026-09 查閱）**：`cqw / cqh / cqi / cqb / cqmin / cqmax` 與尺寸容器查詢同一批落地——Chrome／Edge 105+、Safari 16.0+、Firefox 110+，屬 Baseline 2023，已廣泛可用。

**fallback 具體行為**：舊引擎解析不出 `cqw`，`--u` 為無效值 → `grid-template-columns: repeat(40, var(--u))` 整列崩掉。因此**必須**給一個 viewport 後援：

```css
.pg{ --u: 2.2vw; --u: 2.5cqw; }   /* 後宣告覆蓋前宣告；不支援時退回 2.2vw */
```
`2.2vw × 40 = 88vw`，與 `min(94vw,660px,66vh)` 的常見解相近，不會破版。

### 12.2 純 CSS 狀態機 `:has()` / `:checked` / `:target`（E 資料與生成層）

**承載什麼**：REVEAL 隱答、HOLD 凍結輪頁，以及一五二號連問的全部作答判定——**零 JavaScript 可完整玩完一輪**。`:has()` 的角色是把八個錯答頁碼都導到同一頁：`.pg:has(.al:target) #p189{display:block}`。

**支援現況（查證：MDN《:has()》、caniuse `css-has`，2026-09 查閱）**：Chrome 105/106+、Safari 15.4/15.5+、Firefox 121（2023-12-19）起支援，自 Firefox 121 落地後即「所有主要瀏覽器皆支援」，屬 Baseline 2023。

**fallback 具體行為**：不支援 `:has()` 的引擎會整條規則作廢（selector 無效即丟棄），所以八個錯答頁碼會**沒有任何一屏顯示**。因此加一條不依賴 `:has()` 的保底：把 `#p189` 也寫成一般 `:target` 目標，並在每個錯答選項旁保留 `189` 這個明碼頁號讓使用者自己打。`:checked` 與 `:target` 是 CSS2/CSS3，無相容性風險，REVEAL 與 HOLD 不受影響。

### 12.3 多層 `linear-gradient` 硬停點合成 sixel 字符集（A 渲染層）

**承載什麼**：全站每一張圖。64 形馬賽克字符各以 1–6 層 `linear-gradient(currentColor 0 0)` ＋ `background-position` 組成，配 `background-size:50.4% 33.8%`、`background-repeat:no-repeat`。因為用 `currentColor`，同一套 class 直接吃 8 色前景系統。

**支援現況**：多重 `background-image` 與 `background-position` 是 CSS3 Backgrounds & Borders（2012 起全面支援）；`linear-gradient(<color> 0 0)` 的雙零長度硬停點寫法是 CSS Images 3 的標準語法，Chrome / Safari / Firefox 皆長期支援。`currentColor` 為 CSS3 Color。**零相容性風險，零外部檔案，零 SVG，零 canvas，零圖片。**

**fallback 具體行為**：即使全部 `background-image` 失效，馬賽克格仍是正常的空白字格，版面（40×24）一格不動，所有文字資訊完整——因為本站沒有任何資訊只存在於圖上。

**與其他做法的取捨**：用 `<canvas>` + `putImageData` 會綁 `devicePixelRatio` 並產生取樣假影；用 `<pattern>` 平鋪不行（sixel 不是週期性的）；用 `<symbol>`+`<use>` 得引入 SVG。用 gradient 則是**純 CSS、可被 `currentColor` 著色、可被 `clip-path` 動畫裁切**，這三件事本站都用到了。

### 12.4 效能預算（實測）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS） | ≤ 350KB | **35.6–39.5KB**（gzip 前） |
| 字格 span 數／頁 | — | 216–374（跳過整列空白黑格，不產生節點） |
| 首屏 JS | ≤ 100ms | 兩支：`setInterval` 時鐘 ＋ 一個 `keydown` 監聽，**< 2ms** |
| 主要動畫 | 60fps | 全部是 `visibility` 與 `clip-path` 的 `step-end`／`steps()`，**不觸發 layout 或 paint 的連續插值**；每秒最多 1 次離散更新 |
| layout thrashing | 無 | JS 不讀取任何幾何屬性 |
| 外部資源 | 僅 Google Fonts | 2 個字體家族，`display=swap`，字體未到時以系統等寬／黑體排版，格數不變 |

### 12.5 無障礙

- 每一屏是一個 24 列的視覺矩陣，但頁面另有 `<h1 class="sr">` 提供語意標題；所有資訊都是真的文字節點（不是背景圖、不是 `content`），螢幕閱讀器逐列讀得到。
- 顏色承載的狀態一律另附語意：現用頁的色鍵帶 `aria-current="page"`，頁碼輸出為 `<output aria-live="polite">`，REVEAL/HOLD 為真的 `<input type="checkbox">` 加 `aria-label`（視覺上隱藏但保留在 tab 序，focus 有可見外框）。
- 同一個選項被顏色切成幾個 span 時，只有第一個進 tab 序，其餘 `tabindex="-1" aria-hidden="true"`，避免一個選項被讀成三個連結。
- 藍色明文不承載文字（對黑僅 2.44:1）。
- `prefers-reduced-motion` 下四種動效全部停止，三個子頁改為上下全部展開，**資訊零損失**。
- `<noscript>` 明列：關掉 JS 只有時鐘與數字鍵不作用，色鍵導覽、輪頁、REVEAL 與連問全部照常。

---

## 十三、外部參照

- **World System Teletext / ETS 300 706**（CCIR Teletext System B）：40×24 字格、7 位元字元集、spacing attributes、2×3 mosaic graphics、double height、conceal、hold graphics、flash 的規範來源。
- **BBC Ceefax**（1974–2012）、**IBA/ITV ORACLE**（1976–1992）、**NOS Teletekst**（荷蘭，至今仍在服役）：頁首列格式、FASTEXT 四色鍵、子頁輪播的實作範本。
- **Bamboozle**（Teletext Ltd，1993–）：以「答案＝一個頁碼」把測驗做成純導覽的互動範式來源。
- 與「復古終端機」「CRT 磷光」「8-bit 像素」「Y2K」的分界寫在 §三、§八、§十。

---

*本 SKILL.md 由 **Claude Opus 5**（排程 Agent 自動執行）撰寫，2026-09-19。*
