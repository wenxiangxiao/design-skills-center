---
name: broadcast-teletext
description: Broadcast teletext (Ceefax / ORACLE Level 1) — a strict 40x25 character cell grid, eight pure RGB-corner colours, 2x3 sextant block mosaics as the only image medium, double-height headline rows, and visible control-code gaps.
---

# 廣播圖文電視 Broadcast Teletext

> 一九七四年九月二十三日，BBC 開播 Ceefax；同年 IBA 推出 ORACLE。它們把資料塞進電視訊號的垂直消隱間隔（VBI）裡送出去，接收端用一顆解碼晶片把它畫成畫面。
> 那顆晶片的能力就是這個流派的全部規格：**一頁四十欄乘二十四列的字元格、七個彩色加一個黑、每格一個前景色一個背景色、圖形只能是把格子切成二乘三的區塊。**
> 這不是一種美學選擇，是一九七四年一顆晶片的預算。三十年後它變成一種再也做不出來的畫面——因為現在的工具太自由了，自由到做不出這種被逼出來的秩序。

## 一、設計哲學

1. **格子先於一切。** 先有 40×25 的格，才有內容。文字不是排進版面，是**打進格子**。任何東西——標題、圖、色塊、分隔線、按鈕——都必須整格對齊，沒有半格的東西，沒有圓角，沒有任意定位。
2. **顏色是狀態，不是調色。** 只有八個顏色，而且是 RGB 立方體的八個頂點。沒有中間值、沒有透明度、沒有陰影、沒有漸層、沒有發光。設計時你不是在「選色」，你是在**指派語意**：黃＝標題與可動作、青＝說明與量、綠＝好的、紅＝壞的、洋紅＝序號、白＝內文、藍＝紙。
3. **一頁就是一頁。** 頁面有頁碼，用三位數定址。內容多就開子頁輪播，不往下捲。使用者不是「瀏覽網站」，是**轉到某一頁然後等它播到**。
4. **延遲是媒介的一部分。** 圖文電視的頁是循環播送的，你按了頁碼要等它輪回來。不要把等待當成缺陷去優化掉——它是這個媒介唯一的敘事節奏。
5. **拒絕材質。** 不鋪紙紋、不加顆粒、不做 CRT 掃描線與螢光暈開。那些是「復古 CRT 濾鏡」的語彙，不是圖文電視的語彙。圖文電視的畫面是**硬邊的、平的、乾淨的**。

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，畫面就不再是圖文電視。

### 特徵 1｜40×25 整數像素字元格

格寬必為整數像素，格高＝格寬 ×5/3（源自 6×10 的字元盒）。用 CSS 的階梯函式 `round()` 把格寬砍成整數，避免子像素讓馬賽克邊緣糊掉。

```css
:root{
  --avail: min(calc(100vw - 18px), 880px);
  --cw:  round(down, calc(var(--avail)/40), 1px);   /* 格寬，整數 px */
  --chh: round(down, calc(var(--cw)*5/3),  1px);    /* 格高 */
}
@supports not (width: round(down,10px,1px)){
  :root{ --cw: calc(var(--avail)/40); --chh: calc(var(--cw)*5/3); }
}
.tt{
  width: calc(var(--cw)*40); height: calc(var(--chh)*25);
  display: grid;
  grid-template-columns: repeat(40, var(--cw));
  grid-template-rows: repeat(25, var(--chh));
  background:#000; overflow:hidden;
}
.rw{ grid-column:1/-1; grid-row:var(--y); display:flex; align-items:stretch; }
i{ flex:0 0 auto; width:calc(var(--cw)*var(--w,1)); height:100%;
   display:flex; align-items:center; justify-content:center;
   font-style:normal; font-size:calc(var(--cw)*1.30); line-height:1; white-space:pre; }
```

**中文的處理**：東亞的中文圖文電視用倍寬格——一個漢字佔兩格。西文與數字一格。這條規則必須守住，否則格線會歪。

```css
.w2{ --w:2; font-family:"Noto Sans TC",sans-serif; font-size:calc(var(--cw)*1.72); }
```

### 特徵 2｜八色，全部是 RGB 立方體的頂點

```css
:root{
  --c0:#000000; /* 黑：無訊號、外框、色彩保持島 */
  --c1:#FF0000; /* 紅：拒絕、警示、餘位不足 */
  --c2:#00FF00; /* 綠：通過、金額、可收下 */
  --c3:#FFFF00; /* 黃：標題、頁碼、可動作 */
  --c4:#0000FF; /* 藍：頁面底色（這是「紙」） */
  --c5:#FF00FF; /* 洋紅：序號、子頁指示 */
  --c6:#00FFFF; /* 青：說明、量、副標 */
  --c7:#FFFFFF; /* 白：內文 */
}
```

規則（不可妥協）：

* **不得出現第九個顏色。** 沒有 `#111`、沒有 `#0A0A2E`、沒有 `rgba()`、沒有 `opacity` 中間值。
* **每格只有一個前景色與一個背景色。** 沒有跨格漸層。
* **紅字不得放在藍底上**（對比僅 2.2:1）。作法是保留該格的黑底——這叫**色彩保持島**，是真正的圖文電視作法，也順便讓紅字在藍色版面上跳出來。
* 藍底上可用的字色：白 8.6:1、黃 8.0:1、青 7.0:1、綠 6.4:1，全部過 AA。

```css
/* 64 種前景×背景組合，直接生成 */
.c74{color:#FFFFFF;background:#0000FF}  /* 內文 */
.c34{color:#FFFF00;background:#0000FF}  /* 強調 */
.c10{color:#FF0000;background:#000000}  /* 紅字必須留黑底 */
.c06{color:#000000;background:#00FFFF}  /* 反相頁碼牌 */
```

### 特徵 3｜圖像只能是 2×3 六格子區塊馬賽克

一格切成 2 欄 3 列共六個子塊，每個子塊只有亮／不亮 → **64 種字元**。所有圖都是用這 64 個字元「打」出來的，不是畫出來的。沒有曲線、沒有對角線、沒有抗鋸齒。

```html
<!-- 定義一次，全站重用 -->
<svg width="0" height="0" aria-hidden="true"><defs>
  <symbol id="x21" viewBox="0 0 2 3" preserveAspectRatio="none">
    <!-- mask bit0 左上 bit1 右上 bit2 左中 bit3 右中 bit4 左下 bit5 右下 -->
    <path d="M0 0h1v1H0zM0 2h1v1H0z"/>
  </symbol>
</defs></svg>

<!-- 一張圖 = 一個 svg，格子用 <use> 鋪；底色用 <rect> -->
<svg class="gx" viewBox="0 0 12 9" preserveAspectRatio="none"
     style="--x:1;--y:6;--w:6;--h:3">
  <rect x="0" y="0" width="2" height="3" fill="#0000FF"/>
  <use href="#x21" x="0" y="0" width="2" height="3" fill="#FFFF00"/>
</svg>
```

```css
.gx{ grid-column:var(--x)/span var(--w); grid-row:var(--y)/span var(--h);
     width:100%; height:100%; display:block; }
```

產生 64 個 symbol 的 path：

```js
function sextantPath(mask){
  let d='';
  for(let i=0;i<6;i++) if(mask & (1<<i)){
    const sx=i%2, sy=(i/2)|0;
    d += `M${sx} ${sy}h1v1h-1z`;
  }
  return d;
}
```

把任意像素圖轉成合法的圖文電視圖（**每格最多兩色**，這是硬體限制，必須在轉換時就吃掉）：

```js
function cellFromPix(sub){                 // sub = 六個子塊的顏色索引
  const n={}; sub.forEach(c=>n[c]=(n[c]||0)+1);
  const rank=Object.keys(n).map(Number).sort((a,b)=>n[b]-n[a]);
  const bg=rank[0], fg=rank[1]===undefined?bg:rank[1];
  let mask=0; sub.forEach((c,i)=>{ if(c!==bg) mask|=(1<<i); });
  return {bg,fg,mask};
}
```

### 特徵 4｜雙倍高標題列

標題**不是靠字級變大**，是把一列字用「雙倍高」控制碼在垂直方向拉成兩倍——**字寬完全不變**，而且**下面那一列會被吃掉**。這是最容易被做錯的一項：用 `font-size` 放大會同時把字撐寬，那就不是圖文電視了。

```css
.dh{ grid-row: var(--y) / span 2; }          /* 佔兩列 */
.dh i{ height:50%; align-self:center; transform: scaleY(2); }
/* 只在垂直方向 ×2；背景也一起被拉成兩列高，這正是原始晶片的像素列重複 */
```

```html
<div class="rw dh" style="--y:2">…</div>
<!-- 第 3 列不存在。雙倍高列吃掉下一列，這是規格，不是排版偷懶。 -->
```

### 特徵 5｜控制碼佔一個看得見的空格

這是行家的辨識點，也是最常被漏掉的一項。在 Level 1 規格裡，換前景色、開圖形模式、開雙倍高**都要花掉一個字元位**，而那一格在畫面上是空的。所以圖文電視的版面上**到處是消不掉的一格空隙**：顏色改變的地方，前面永遠斷開一格。

```
P341 晚鳥假期 1/6   FRI 14 FEB  21:47:33
    ↑     ↑    ↑
    每一次換色，前面都留一格。不是排版習慣，是規格。
```

實作規則：**任何相鄰且不同前景色的兩段文字之間，至少留一個空格。** 寫版面時把它當硬性約束，不要為了塞滿而消掉它。

---

## 三、色彩系統（比例）

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 藍 | `#0000FF` | 頁面底色（「紙」）。長文一律在藍底上 | 約 34% |
| 黑 | `#000000` | 表頭列、狀態列、快捷鍵列、色彩保持島、圖形底 | 約 30% |
| 白 | `#FFFFFF` | 內文、時鐘、分隔實心帶 | 約 16% |
| 黃 | `#FFFF00` | 標題、頁碼、可動作、次級強調 | 約 9% |
| 青 | `#00FFFF` | 副標、說明、量、反相頁碼牌 | 約 6% |
| 綠 | `#00FF00` | 通過、金額、快捷鍵 | 約 3% |
| 紅 | `#FF0000` | 拒絕、警示、餘位不足、快捷鍵（必配黑底） | ≤2% |
| 洋紅 | `#FF00FF` | 子頁指示、序號 | ≤1% |

**mood 名稱：`rgb-corner` 純角頂色域。** 與「純黑平塗」的差別在於：這裡的黑不是主色，是「沒有訊號」；主色是藍。畫面上同屏並存七個滿飽和原色，而且它們永遠硬邊相接。

---

## 四、字體系統

* **拉丁與數字**：等寬。`"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`，字重固定 700。字級 `calc(var(--cw)*1.30)`。
* **中文**：`"Noto Sans TC", sans-serif`，字重 700，倍寬格，字級 `calc(var(--cw)*1.72)`。
* **只有一個字重（700）與三個字級**（一般、雙倍高、螢幕外註腳）。字級階層由**格子數**表達，不由字級表達——這是本流派與所有現代排版的分野。
* 不用襯線、不用可變字軸、不用 `letter-spacing`（格子已經決定了間距）。
* 螢幕外的頁尾註腳用 `clamp(11px, calc(var(--cw)*0.72), 14px)`，因為那不在格子裡。

---

## 五、版面與網格

* **每頁固定 25 列**：第 0 列表頭（頁碼＋台名＋子頁＋日期＋即時鐘）、第 1–2 列雙倍高主標、第 3 列實心色帶、第 4–20 列內容、第 21 列狀態／閃爍列、第 22 列實心白帶、第 23–24 列 FASTEXT 四色鍵。
* **內容欄位**：中文一列最多 19 個字（38 格）；正文一律從第 1 格起，第 0 格永遠留空（那是控制碼的位置）。
* **零留白哲學**：格子本身就是留白，不要再加 padding。元件之間用**一列空格**分隔，不用間距值。
* **分隔線**：把整列鋪成一個顏色，然後只顯示下三分之一——那是一列「下方橫線」的六格子字元。

```css
.thin i{ align-self:flex-end; height:33.34%; }   /* 一格的三分之一＝一個子塊列 */
```

* **RWD**：不改版型，只改格寬。40 欄永遠是 40 欄，25 列永遠是 25 列。≤560px 時格寬掉到 13px 左右，資訊一格都不減。頁尾另備純文字連結列保底。

---

## 六、元件配方

### 表頭列（第 0 列）

```
[0-3] 頁碼 P341   黑字青底（反相牌）
[4]   控制碼空格
[5-12] 台名（中文倍寬，黃）
[13]  控制碼空格
[14-16] 子頁 1/6（洋紅）
[20-29] 日期（白）
[32-39] 即時鐘 HH:MM:SS（白，每秒硬跳，無補間）
```

### FASTEXT 四色鍵（第 23–24 列）——導覽

四個頁碼各佔 10 格，底色依序紅／綠／黃／青，黑字。**現用頁那一鍵熄掉**：底色變黑、字變成該鍵的顏色，標籤改成「目前」，下一列寫「現在這頁」。語意是**這顆鍵按了沒事**——一顆失效的按鍵，而不是一顆被高亮的按鍵。

```html
<div class="keys">   <!-- 疊在第 23–24 列上的可點區 -->
  <a class="key" href="index.html">前往 100 目錄</a>
  <a class="key" href="deals.html">前往 341 特價</a>
  <span class="key" aria-disabled="true">888 目前這頁</span>
  <a class="key" href="about.html">前往 199 本社</a>
</div>
```

```css
.keys{ position:absolute; left:0; right:0; bottom:0; height:calc(var(--chh)*2);
       display:grid; grid-template-columns:repeat(4,1fr); z-index:2; }
.key{ background:none; border:0; cursor:pointer; text-indent:-9999px; overflow:hidden; }
```

### 子頁輪播

一個頁碼底下掛 1–6 張整頁，每 7 秒自動翻一張，附一顆 `HOLD` 停止輪播。**關閉 JavaScript 時全部子頁並列顯示**，內容零損失——這是本流派天然的漸進增強。

```css
.pg.js .tt{display:none}
.pg.js .tt.on{display:grid}
```

### 按鈕（螢幕外的「遙控器」）

硬邊、2px 實線外框、無圓角、無陰影。按下＝前景背景對調。

```css
.remote button{ background:#000; color:#00FFFF; border:2px solid #00FFFF;
  padding:calc(var(--chh)*0.34) 0; font:700 inherit; cursor:pointer; }
.remote button:active,.remote button.dn{ background:#00FFFF; color:#000; }
```

### 表格

不要畫框線。用**欄的起始格號**對齊，用顏色分欄語意，用「下三分之一分隔列」斷開列群。

---

## 七、動效規則

四種缺一不可，且全部要有 `prefers-reduced-motion` 降級。

| 類型 | 內容 | 具體值 |
|---|---|---|
| ambient 環境 | 表頭即時鐘每秒硬跳；子頁自動輪播；第 21 列 FLASH 閃爍 | 時鐘 `setInterval 1000`，不做數字滾動；閃爍 `1.4s steps(1,end) infinite` |
| input 輸入 | 數字鍵／FASTEXT 鍵按下整格反相 | ≤90ms，直接換 class，無 transition |
| transition 轉場 | 跨文件換頁：舊頁由上下往中央收成一線，新頁再由上往下逐列蓋上 | `steps(12)` 200ms ＋ `steps(24)` 340ms |
| **signature 簽名** | **逐列播送 vbi-rowfill** | 見下 |

```css
.fl i{ animation: flsh 1.4s steps(1,end) infinite; }
@keyframes flsh{ 0%,50%{opacity:1} 50.01%,100%{opacity:0} }

/* 簽名動效：新頁一列一列到，舊頁在下半部繼續存在 */
.vbi{ animation: vbi 720ms steps(24,end) both; }
@keyframes vbi{ from{clip-path:inset(0 0 96% 0)} to{clip-path:inset(0 0 0 0)} }

/* 轉場：跨文件 View Transitions */
@view-transition{ navigation:auto; }
::view-transition-old(root){ animation: ttout 200ms steps(12,end) both; }
::view-transition-new(root){ animation: ttin  340ms steps(24,end) both; }
@keyframes ttout{ from{clip-path:inset(0 0 0 0)}   to{clip-path:inset(48% 0 48% 0)} }
@keyframes ttin { from{clip-path:inset(0 0 96% 0)} to{clip-path:inset(0 0 0 0)} }

@media (prefers-reduced-motion:reduce){
  .fl i{animation:none;opacity:1;text-decoration:underline}
  .vbi{animation:none}
  ::view-transition-old(root),::view-transition-new(root){animation:none}
}
```

**簽名動效「逐列播送 vbi-rowfill」的完整定義**：換頁時新頁不是整張換上，而是**一列一列從最上面到達**，每列一到就是完整的、沒有淡入；在到達途中，畫面上半是新頁、下半仍是舊頁——**這一刻的螢幕同時是兩張不同的頁**，這正是每個看過圖文電視的人記得的那個畫面。抵達過程中隨機挑一列灌進亂碼（誤碼），380ms 後由下一次播送更正。

```js
function garble(el){
  const y = 2 + Math.floor(Math.random()*20);
  const d = document.createElement('div');
  d.className='grb'; d.style.setProperty('--y', y+1);
  let h='';
  for(let k=0;k<40;k++)
    h += '<i class="c'+(1+Math.floor(Math.random()*7))+'0">'+'█▒░▓'[Math.floor(Math.random()*4)]+'</i>';
  d.innerHTML=h; el.appendChild(d);
  setTimeout(()=>d.remove(), 380);
}
```

**明文禁用**：淡入、視差、數字滾動計數、跑馬燈、緩動曲線（`ease`／`cubic-bezier`）、模糊、縮放、CRT 掃描線與螢光暈開。這個媒介只有兩種時間：**到了**與**還沒到**。所以所有動畫的 timing function 一律是 `steps()` 或 `linear`。

---

## 八、插畫與圖像風格

技法名稱：**`sextant-charset` 六格子字元圖**。

* 全站零外部圖片、零 canvas 點陣圖。所有圖像——主視覺、圖示、logo、favicon、程序生成的印記——都是同一套 64 個六格子字元排出來的。
* 判準：**每一張圖都必須能寫成一串可電傳的字元碼。** 如果它不能被打成一行字送出去，它就不是這個流派的圖。
* 每格最多兩色（一底一前景），這條在轉圖階段就要吃掉，不能靠疊圖作弊。
* 色階：沒有色階。要表現漸層就換一整塊顏色，邊界是硬的。
* 圖與文字共用同一個格子系統——圖可以被文字覆蓋，文字可以被圖切斷，因為它們是同一種東西。

---

## 九、Logo 與 Favicon

**Logo**：本身就是一塊六格子馬賽克，`shape-rendering="crispEdges"`，viewBox 用格數而非像素。底下壓一條紅／綠／黃／青的 FASTEXT 四色帶——那是這個媒介的簽名。

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" shape-rendering="crispEdges">
  <rect width="12" height="12" fill="#000000"/>
  <!-- 六格子圖形 … -->
  <rect x="0" y="10" width="3" height="2" fill="#FF0000"/>
  <rect x="3" y="10" width="3" height="2" fill="#00FF00"/>
  <rect x="6" y="10" width="3" height="2" fill="#FFFF00"/>
  <rect x="9" y="10" width="3" height="2" fill="#00FFFF"/>
</svg>
```

**Favicon**：inline SVG data URI，四色方格，8×8 viewBox，不加圓角。

```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Crect width='8' height='8' fill='%23000'/%3E%3Crect x='1' y='1' width='3' height='3' fill='%23F00'/%3E%3Crect x='4' y='1' width='3' height='3' fill='%230F0'/%3E%3Crect x='1' y='4' width='3' height='3' fill='%23FF0'/%3E%3Crect x='4' y='4' width='3' height='3' fill='%230FF'/%3E%3C/svg%3E
```

---

## 十、Do & Don't

**Do**

* 先畫 40×25 的格紙，再想內容。內容塞不進去就砍內容，不要改格數。
* 每次換色前留一格空白。
* 標題用雙倍高，不用大字級。
* 圖用六格子打出來，每格最多兩色。
* 紅字一律留黑底。
* 所有動畫用 `steps()`。
* 用頁碼當導覽的第一語言（341、888、199），頁名是第二語言。
* 關掉 JavaScript 後子頁全部攤開，內容零損失。

**Don't**

* ❌ 不要加 CRT 掃描線、螢光暈開、桶形變形、雜訊顆粒——那是「復古電視濾鏡」，不是圖文電視。
* ❌ 不要用第九個顏色，不要用 `opacity` 中間值、`box-shadow`、`border-radius`、`filter: blur`。
* ❌ 不要用漸層（包括紫藍漸層 hero）。
* ❌ 不要 emoji 當圖示——圖示要用六格子打。
* ❌ 不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。這個流派沒有 hero，第一列永遠是表頭列。
* ❌ 不要淡入、不要滾動揭示、不要視差、不要數字滾動計數。
* ❌ 不要為了塞內容而讓頁面往下捲——開子頁。
* ❌ 不要用 Lorem ipsum；圖文電視的文案是**電報體**：短句、具體數字、沒有形容詞。
* ❌ 不要「EST. 19xx」徽章。
* ❌ 不要把中文排成一格寬——中文倍寬格是規格，不是選項。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>P341 …</title>
<link rel="icon" href="data:image/svg+xml,…">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@700&family=Noto+Sans+TC:wght@700&display=swap">
<style>/* 見第二節與第七節 */</style>
</head><body>

<svg width="0" height="0" aria-hidden="true"><defs><!-- 64 個 sextant symbol --></defs></svg>

<main class="wrap">
  <div class="pg" data-carousel>
    <div class="tt on">
      <svg class="gx" style="--x:1;--y:7;--w:16;--h:8" viewBox="0 0 32 24"
           preserveAspectRatio="none" aria-hidden="true"><!-- 六格子圖 --></svg>

      <div class="rw" style="--y:1">
        <i class="c06">P</i><i class="c06">3</i><i class="c06">4</i><i class="c06">1</i>
        <i class="c00" style="--w:1"></i>                      <!-- 控制碼空格 -->
        <i class="c30 w2">晚</i><i class="c30 w2">鳥</i>
      </div>

      <div class="rw dh" style="--y:2">                        <!-- 雙倍高，吃掉第 3 列 -->
        <i class="c04" style="--w:2"></i><i class="c34 w2">海</i><i class="c34 w2">島</i>
        <i class="c04" style="--w:34"></i>
      </div>

      <div class="rw" style="--y:4"><i class="c06" style="--w:40"></i></div>  <!-- 實心色帶 -->
      <div class="rw thin" style="--y:10"><i class="c00" style="--w:40"></i></div> <!-- 下三分之一分隔 -->
      <div class="rw fl" style="--y:22"><i class="c71" style="--w:40"></i></div>   <!-- 閃爍列 -->
    </div>
    <div class="keys"><!-- FASTEXT 四鍵 --></div>
  </div>

  <nav class="tail">100 目錄 ｜ 341 特價 ｜ 888 抓頁 ｜ 199 本社</nav>
</main>
</body></html>
```

---

## 十二、技術實作與相容性

本站認領三項技術，分屬 A 渲染／B 動效時間軸／C 版面樣式三層。

### 1. CSS 階梯數學函式 `round()`（C 版面與樣式層）

**承載**：特徵 1 的整數像素格。`round(down, calc(var(--avail)/40), 1px)` 把格寬砍到整數，讓 40 欄乘上格寬永遠等於一個整數寬度，六格子圖的邊界因此永遠落在像素上，不會被子像素抹糊。這件事 `calc()` 做不到——它沒有「取整」。

**支援現況（2026-08-21 查證）**：MDN《round() CSS function》與 web.dev《The CSS stepped value math functions are now in Baseline 2024》皆載明 `round()`／`mod()`／`rem()` 自 **2024 年 5 月起為 Baseline（newly available）**，三大引擎全支援。

**fallback**：`@supports not (width: round(down,10px,1px))` 時退回 `calc(var(--avail)/40)`，格寬變成小數。**版面、列數、顏色、內容完全不變**，只是馬賽克邊緣在某些縮放比例下會有半像素的柔邊。資訊零損失。

### 2. SVG `<symbol>` ＋ `<use>` 六格子字元庫（A 渲染層）

**承載**：特徵 3。六格子是一套**字元集**而不是一堆圖形，所以渲染器必須是「定義一次、重用上千次」的字符重用器，而不是路徑繪製器。64 個 `<symbol>` 在文件頂端定義一次（約 4.6KB），之後每一格圖只是一個 `<use href="#xNN" x y width height fill>`，約 60 bytes。本站 24 張團體圖示＋首頁主視覺共約 560 格，用 `<path>` 逐格畫要 3 倍體積，而且每一格的幾何會重複寫進檔案。選 `<use>` 而不是 CSS `background-image` 是因為每一格的前景色都不同，`<use>` 可以直接吃 `fill` 屬性。

**支援現況（2026-08-21 查證）**：`<symbol>`、`<use>`、`preserveAspectRatio="none"` 皆屬 SVG 1.1（2003），MDN 標示 Baseline Widely available，現行瀏覽器全支援，無支援缺口。註：`<use>` 引用外部檔案的 `href` 在部分瀏覽器受限，本站一律**同文件內引用**，不受影響。

**fallback**：不需要。SVG 若被完全停用，`.tt` 的黑底與所有文字內容仍在，版面不塌（圖形區域會是純黑格）。

### 3. View Transitions API 跨文件轉場（B 動效與時間軸層）

**承載**：四頁之間的換頁。圖文電視的「換頁」是這個媒介的核心動作，所以它必須是一個真正的轉場，而不是瀏覽器的白閃。`@view-transition{navigation:auto}` 讓兩份靜態 HTML 之間的導覽變成一段可控的動畫，而**不需要把網站改寫成 SPA**——這正是本站要的：四頁仍然是四份可獨立開啟、可被搜尋引擎讀到的靜態文件。

**支援現況（2026-08-21 查證）**：跨文件 View Transitions 目前為 **Chromium 126+（2024-06）與 Safari 18.2+（2024-12）** 支援；**Firefox 仍在旗標後**，須視為漸進增強。同文件版本（`document.startViewTransition`）支援面較廣。opt-in 語法在來源頁與目標頁都要寫。

**fallback**：不支援的瀏覽器就是一般導覽——直接換頁，沒有動畫。頁面內容、版面與其餘三種動效（ambient／input／signature）完全不受影響，資訊零損失。`prefers-reduced-motion` 下以 `animation:none` 關閉。

### 效能實測值（2026-08-21，本站四頁）

| 頁 | 單檔大小（含全部 inline CSS/JS/SVG） | 字元格節點 | 備註 |
|---|---|---|---|
| `index.html` P100 | 62.2 KB | 約 1,250 | 2 張子頁 |
| `deals.html` P341–346 | 173.8 KB | 約 4,700 | 6 張子頁 24 團，含 24 張六格子圖示與 6 條紋樣分隔帶 |
| `about.html` P199 | 106.2 KB | 約 3,900 | 6 張子頁純文字 |
| `hunt.html` P888 | 90.1 KB | 約 2,200 | 3 張靜態子頁＋執行期生成的遊戲格陣 |

* 全部低於 350KB 單頁預算（最大者為預算的 49.7%）。零外部圖片、零外部音檔；外部資源僅 Google Fonts 兩個字族。
* 首屏 JS 只做三件事：掛時鐘（`setInterval`）、標記輪播容器、綁鍵盤。無版面量測、無 `getBoundingClientRect`、無 layout thrashing。
* 簽名動效與轉場皆為純 CSS `clip-path` ＋ `steps()`，由合成器處理，不觸發重排。
* 子頁切換以 class 切換（`display:none/grid`）完成，不重建 DOM。
* 遊戲格陣每次更新只重寫變動的那幾列的 `innerHTML`（每列 ≤40 個節點），不重建整個 1,000 格。

---

## 十三、歷史與參照

* **BBC Ceefax**（1974-09-23 開播，2012-10-23 停播）與 **IBA ORACLE**（1974–1992）——本流派的本體。
* **Teletext Level 1 規格**：40×24 顯示列（另加表頭列）、7 色前景 7 色背景、2×3 區塊圖形、雙倍高、閃爍、色彩保持，控制碼佔位。
* **Teletext Holidays**（英國，1990 年代–2000 年代）——完全建立在圖文電視頁面上的晚鳥假期生意，本站的產業設定出自此。
* **法國 Minitel**（1982–2012）與**日本文字多重放送**（1985–）——同期的近親，後者確立了漢字倍寬格的作法。
* **台灣圖文電視**（1980 年代末起於無線三台試播）——本站的在地設定。
* 現代承繼者：Teletext Art（Dan Farrimond 等）、Raquel Meyers 的「KYBDslöjd」、edit.tf 線上編輯器。

---

*本規格書為 Design Skills Center 館藏。風格與內容分離：SKILL 定義風格，不綁定產業。*
