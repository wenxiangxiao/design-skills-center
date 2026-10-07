---
name: pure-ascii-fanfold-portrait
description: Pure ASCII art (the 95 printable characters 0x20–0x7E, one ink, monospace cells) as a complete web language — tone-ramp and glyph-shape-matched pictures in the line of Knowlton & Harmon 1966 and Atari's 1976 Compugraph portrait booth, FIGlet-style banner letters, Usenet plain-text conventions (.sig dash, > quoting, *emphasis*, artist initials) and a green-bar fanfold sheet as the page.
---

# ASCII Art・純 ASCII 半身 Pure ASCII — Fanfold Portrait

## 1. 設計哲學

這是「只會打字的機器」的美學。1960–90 年代的行式印表機、九針點陣機、電傳打字機與純文字 email，都只能輸出同一組 95 個印字字元——於是人們把字當成網點、當成筆觸。1966 年 Bell Labs 的 Kenneth Knowlton 與 Leon Harmon 把照片掃成數字、依每格濃淡換成印刷符號，印出十二呎寬的〈Studies in Perception I〉；1976 年 Atari 的 Compugraph Foto 原型機在商展上九十秒印一張 11×14 吋字元肖像；1990 年代 Usenet 的 ASCII 畫家（如署名 jgs 的 Joan Stark）改用字的「形」畫線描，1991 年 Glenn Chappell 寫出後來叫 FIGlet 的大字橫幅程式。

三條原則：

1. **限制即風格**：一切圖像只用 95 個字元，一種墨，一個等寬格子。
2. **字有兩種身分**：它有「黑度」（密度讀法）也有「形狀」（字形讀法）；好的 ASCII 畫兩種都用。
3. **純文字慣例就是裝飾**：.sig 的 `-- `、引用的 `> `、強調的 `*星號*`、角落的小寫簽名縮寫、`+---+` 框——不另外發明 icon。

與 ANSi Art（同條目另一半，見 taneita）的分界：ANSi 用 CP437 半塊 ▀▄ 與 16 色屬性，本半身**零顏色、零區塊字元、零製表符號**。與 Teletext 的分界：那是 40 欄 7 色馬賽克。與 CRT 磷光的分界：本風格不模擬螢幕瑕疵（無輝光、無掃描線），它的載體是紙。

## 2. 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 報表紙 paper | `#F3F2E8` | 頁面底、全部空白處 | ~70% |
| 綠條 bar | `#DCEAD4` | 每 3 行一條、間隔 3 行（=½ 吋，6 lpi）；欄位 focus 底 | ~25% |
| 色帶墨 ink | `#23221E` | **唯一**的墨：所有字、所有圖、hover 反白的底 | ~5% |

規則：沒有第二種墨、沒有灰字、沒有 opacity 做淺色（唯一例外：輸入框 placeholder 0.45、游標閃爍）。深淺**只能**來自字本身的墨量。hover／選取用「反白」（ink 底 paper 字），那是終端機的反顯，不是新顏色。

## 3. 字體系統

- **唯一字型**：IBM Plex Mono 400（Google Fonts），advance 寬 0.6 em。不使用任何粗體或斜體——純文字沒有粗體，強調用 `*星號*`、`_底線_` 或全大寫。
- CJK：Noto Sans TC 400 作為後備；CJK 只出現在**散文**中，不進圖像、不進有側框的區塊（全形字寬 1 em ≠ 2 ch，會撐破框）。
- 字級：桌機 15px／行高 22px；≤560px 13px／20px。標題不放大字級——標題是 FIGlet 式 5 行大字橫幅（見 §7），或與內文同字級的英文大寫 + 中文。
- 圖像字級：`font-size: min(var(--fs), calc(100cqi / (var(--cols) * .6)))`，整幅圖按欄數縮放到容器寬，行高固定 1.2（格子 1:2）。

## 4. 版面與網格

- **欄就是單位**：整張紙寬度 `round(down, min(100vw,108ch), 1ch)`，內文欄 ≤68ch，圖像以欄數宣告（`--cols:72`）。
- **連續報表紙**：`grid-template-columns: 4ch 1fr 4ch`，左右兩條 `pin` 帶用文字畫走紙孔（` o :`，每 3 行一孔）與齒孔虛線 `:`。
- **綠條**：`repeating-linear-gradient` 3 行綠 3 行白，與文字行高對齊。
- 區段分隔是一整列字：`====`（job 標頭下）、`----`（段落）、`- - - 8< - - -`（撕線，表示「這裡可以撕下」）。
- 零旋轉、零圓角、零陰影；不對稱靠「圖在右、文在左」的兩欄與大小懸殊的圖像。
- 留白規則：區段間空 1–2 行（`.gap` = 1 行高），不用 px 間距。

## 5. 元件配方

- **Job 標頭**（每頁頂）：`JI-SIONG CHARACTER PORTRAITS   JOB 1982-0412  SHEET 2/4   2026-10-08 14:22:05`，flex space-between，時鐘每秒更新。
- **導覽＝.sig 簽名檔**：固定在視窗底，第一行 `-- `，第二行 `[ 1 櫃檯 ][ 2 坐一張 ]…`，現在頁 `[*…*]`，行尾閃爍 `_`。鍵盤 1–4 換頁。
- **按鈕／連結**：`.lk::before{content:"[ "} .lk::after{content:" ]"}`，hover/focus 換成 `[>` `<]`——寬度不變、不位移。行內連結 `<url>` 尖括號，hover 反白。
- **單選**：原生 radio 藏起來，`span::before{content:"( ) "}`，`:checked` 換 `"(*) "`。
- **滑桿**：`role="slider"` 的純文字 `亮暗 <----------|----------> +0`，指標拖曳＋方向鍵。
- **輸入框**：`名字 [__________]` 方括號夾住無框 input，focus 時整列綠條底。
- **引用 FAQ**：`.quote::before` 用一長串 `"> \A> \A…"` 鋪滿左側。
- **人員表**：`<pre>` 開頭 `-- `，名字＋小寫縮寫簽名＋職稱。
- **框**：只框 ASCII 內容（監看螢幕 `+-- MONITOR [ LIVE ] ---+`、`| … |`），框線由 JS 依內容寬度補 `-`。

## 6. 動效規則（四種，缺一不可）

| 類型 | 本站做法 | 觸發 | 時間 | reduced-motion |
|---|---|---|---|---|
| ambient | 石膏頭像的燈持續繞行，每幀重新打光＋重新挑字 | 時間 | 0.36 rad/s，rAF | 燈停在左上 135°，仍可用游標移燈 |
| input | 游標／手指即時移燈（追隨係數 .35/幀）；相機、手繪、滑桿即時重算監看螢幕 | pointer / 相機幀 | <16 ms/幀 | 移燈直接到位、無追隨 |
| transition | 走紙換頁：`.sheet` `animation: feedOut .36s steps(14,end)`，新頁 `feedIn .42s steps(9,end)` | 內部連結、鍵盤 1–4 | 360 / 420 ms | 無動畫直接換頁 |
| signature | 〈雙向擊印〉：九針頭就是文字 `[#]`，偶數行往右、奇數行往左逐字打出 | 首頁載入、按「印」 | 每行 30–36 ms | 一次印完 |

本站自我限制：**禁用淡入、禁用 ease 補間位移**——印表機與走紙只會一格一格地動，所以所有位移都是 `steps()`。

## 7. 插畫與圖像風格

兩種技法，必須都出現：

1. **字形比對（演算法）**：每格切成 2 欄 × 3 層 = 6 個子格，量測「頁面自己的字型」中 95 個字的 6 維墨量向量（歸一化到最黑的子格 = 1）。對每格的暗度向量 v，先做對比強化 `v' = (v/max)^2 · max`，再找 `Σ(F−v')² + 1.5·6·(mean_F − mean_v)²` 最小的字。輪廓自然長出 `. _ ' / \ | F L`。
2. **密度（演算法）**：只比平均墨量，95 字排成 128 階查找表。Knowlton／Compugraph 一派。
3. **手繪線描**：只用 `/ \ | _ - . ' ( ) o` 的形，不管黑度，右下角署小寫縮寫（`-- py`）。

題材：石膏頭像、靜物（立方與球、酒瓶、蘋果）——用 SDF ray-march 渲染成暗度場再交給比對器；燈永遠從左上來（135°）。

## 8. Logo 與 Favicon

- Logo：7 行 ASCII 小胸像（`,@@@,` / `@@@@@` / `` `@@@' `` / `|@|` / `_d@@@b_`）裝在 `.---.` 框裡＋FIGlet 式 `JI-SIONG`＋`CHARACTER PORTRAITS · 1982`，綠條底。SVG 以 `<text>` 逐行排，`xml:space="preserve"`、空白換成 `&#160;`。
- Favicon：32×32 報表紙＋兩道綠條＋一個 `@`（inline SVG data URI）。

## 9. Do & Don't

**Do**
- 所有圖、框、分隔、按鈕都只用 0x20–0x7E；寫一個建置期檢查把非 ASCII 字元從 `.art` 裡揪出來。
- 每幅圖宣告欄數，讓它縮放而不是換行。
- 給每幅圖 `role="img"` 與文字描述——螢幕閱讀器不該念 400 個 `@`。
- 簽名、`-- `、`> `、`*強調*` 這些純文字慣例當作 UI 的一部分。

**Don't**
- 不用 CP437 區塊字元 `█▓▒░`、不用 box-drawing `┌─┐`（那是 ANSi）。
- 不用顏色、不用灰字、不用陰影、不用圓角、不用 emoji、不用圖片。
- 不在有側框的區塊放 CJK（框會歪）。
- 不用 ease 補間的淡入、滑入；印表機只會一格一格。
- 去AI化：禁紫藍漸層、禁置中大標＋三張卡片、禁 Lorem ipsum、禁「EST. 19xx」徽章。

## 10. 頁面骨架範例

```html
<div class="form">
  <div class="pin" aria-hidden="true"></div>
  <main class="sheet">
    <div class="job"><span>SHOP NAME</span><span>JOB 0001  SHEET 1/3</span><span id="clk"></span></div>
    <div class="rule" aria-hidden="true"></div>
    <div class="wrap" style="--cols:46"><pre class="art big" role="img" aria-label="SHOP">
 ___  _  _   ___   ___
/ __|| || | / _ \ | _ \
\__ \| __ || (_) ||  _/
|___/|_||_| \___/ |_|  </pre></div>
    <p>一段散文，最寬 68ch。*強調用星號*。</p>
    <div class="rule cut" aria-hidden="true"></div>
    <figure><div class="wrap" style="--cols:72"><pre class="art" role="img" aria-label="…">…</pre></div>
      <figcaption>說明。                                   -- py</figcaption></figure>
  </main>
  <div class="pin r" aria-hidden="true"></div>
</div>
<footer class="sigbar"><div>-- </div><nav><a class="lk on" href="index.html">1 首頁</a>…</nav></footer>
```

## 11. 本風格的 5 個不可省略特徵

### ① 只有 95 個印字字元（0x20–0x7E）
圖、框、規、按鈕、標題全部由它們組成；拿掉這條（加入 █ ┌ 或圖片）就變成 ANSi 或一般網頁。

```css
.rule::before{content:"===================================================================="}
.rule.cut::before{content:"- - - - - - - - 8< - - - - - - - - 8< - - - - - - - - 8< - - -"}
.lk::before{content:"[ "}.lk::after{content:" ]"}
```
```js
// build-time guard
if(/[^\x20-\x7E\n]/.test(artText)) throw new Error('non-ASCII in art');
```

### ② 一種墨：深淺只來自字本身
不准灰字、不准第二色；暗部是 `@ B Q`，亮部是 `. ' \``，中間調是 `: ! | I`。

```css
:root{--paper:#F3F2E8;--bar:#DCEAD4;--ink:#23221E}
body{color:var(--ink);background:var(--paper)}
a:hover{background:var(--ink);color:var(--paper)} /* 反顯，不是新顏色 */
```

### ③ 等寬格是唯一的網格
寬度以整欄計、圖像以欄數宣告並整幅縮放，行高固定 1.2。

```css
.form{width:round(down,min(100vw,108ch),1ch)}
.wrap{container-type:inline-size}
.art{white-space:pre;line-height:1.2;font-kerning:none;font-variant-ligatures:none;
     font-size:min(15px,calc(100cqi / (var(--cols) * .6)))}
```

### ④ 字形即筆觸：輪廓由字的「形」組成，標題是 FIGlet 式大字
```
 ___  _  _   ___   ___       ._____
/ __|| || | / _ \ | _ \    .-'"""!TIZai
\__ \| __ || (_) ||  _/   '`    ''!|IIZQBB,
|___/|_||_| \___/ |_|     !:''.''::!|IIZQQBBBBE
```
```js
// 2x3 shape vector match (per cell)
for(g of glyphs){ d = Σ(F[g][k] - v'[k])^2 + 1.5*6*(meanF[g]-meanV)^2 } // pick min
```

### ⑤ 純文字慣例當裝飾：簽名縮寫、`-- `、`> `、`*強調*`、走紙孔與綠條
```css
.pin::before{content:" o :\A   :\A   :\A o :\A   :\A   :"}  /* 每 3 行一個走紙孔 */
.sheet{background:repeating-linear-gradient(to bottom,var(--bar) 0 66px,transparent 66px 132px)}
.quote::before{content:"> \A> \A> \A> ";white-space:pre}
```
```html
<figcaption>說明文字。                         -- py</figcaption>
<footer class="sigbar"><div>-- </div><nav>…</nav></footer>
```

## 12. 技術實作與相容性

### A. 字形比對引擎（E 資料與生成層；Canvas 2D `fillText`＋`getImageData`）
- 開機時把 95 個字以頁面字型畫在 2280×48 的離屏 canvas，量每字 2×3 子格墨量 → 95×6 Float32；之後每格最近鄰比對。
- 查證：MDN `CanvasRenderingContext2D.getImageData()`／`fillText()` Baseline Widely available。`willReadFrequently:true` 讓 Chrome 用 CPU 後端避免回讀卡頓。
- 字型：等 `document.fonts.load('40px "IBM Plex Mono"')`（最多 900 ms）再量；字型沒到時以系統等寬字量測——結果仍正確對應畫面上實際使用的字。
- 效能實測（Node 22，100×56 格 × 95 字 × 6 維）：**3.8 ms／幀**；首頁 72×34 格約 2 ms。石膏頭像的 ray-march 只在開機做一次（法向量快取），之後每幀只做 14,688 次點積。
- 建置期同演算法以 Python＋Pillow（DejaVu Sans Mono 量測）生成無 JS 靜態圖。

### B. 相機輸入（D 輸入與感測層；`MediaDevices.getUserMedia()`）
- 查證：MDN Baseline Widely available（2017-09 起）；**僅限安全環境**（HTTPS／localhost／file:），否則 `navigator.mediaDevices` 為 undefined。Chrome 53+、Firefox 68+、Safari 11+。
- 只在使用者點「開相機」後請求；`{video:{facingMode:'user',width:{ideal:640}},audio:false}`；離頁 `pagehide` 停所有 track。影像只畫進本機 canvas，不上傳。
- Fallback：無 API 或被拒 → 監看螢幕顯示原因（`NotAllowedError` 等），引導改用〈放一張照片〉（`<input type=file accept=image/*>`）或〈手繪〉（Pointer Events＋`getCoalescedEvents()`，筆壓改粗細）。

### C. 欄寬取整（C 版面與樣式層；CSS `round()` ＋ container query units）
- `width: round(down, min(100vw,108ch), 1ch)` 讓整張紙永遠是整數欄；`.art` 以 `100cqi / (cols × .6)` 縮放。
- 查證：web.dev〈The CSS stepped value math functions are now in Baseline 2024〉——`round()` Chrome／Edge 125、Firefox 118、Safari 15.4；container query units Baseline 2023。
- Fallback：宣告兩次 `width`，不支援 `round()` 時用 `min(100vw,108ch)`，最多誤差不到一欄；不支援 `cqi` 時 `.wrap` overflow hidden、字級回到 15px。

### D. 走紙與擊印（B 動效層；`steps()` 與 rAF）
- `animation-timing-function: steps(14, end)`：MDN Baseline Widely available（2015-07）。`jump-*` 關鍵字需 Chrome 77／Firefox 65／Safari 14，本站只用 `end`。
- 雙向擊印以 rAF 依經過時間計算行號與字數，不累積 setTimeout 誤差。

### 效能預算
| 頁 | 大小（含 inline） | 首屏 JS |
|---|---|---|
| index | ~35 KB | 字形量測 + 一次 ray-march，約 20–40 ms（延後到字型就緒後一幀） |
| booth | ~50 KB | 同上；相機幀 ≤6 ms |
| samples / visit | ~25 KB | <1 ms |
