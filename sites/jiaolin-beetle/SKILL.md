---
name: web1-geocities
description: Late-1990s amateur personal homepage — tiled background, beveled table layout, system serif type, web-safe colour clash, 88x31 badges, hit counter and webring furniture.
---

# Web 1.0 GeoCities｜業餘個人首頁（1996–2000）

繁體中文規格書。讀完這一份，你應該可以在完全沒看過 Demo 的情況下，做出一個一九九八年的個人首頁——而且是**做對**，不是做爛。

---

## 一、設計哲學

這個流派不是「醜」，是**業餘者在極端限制下的自力更生**。

一九九六到二〇〇〇年，一般人第一次拿到一塊可以自己貼東西的網路空間（GeoCities、Tripod、Angelfire、蕃薯藤、天空），配備是：

- **28.8k 撥接數據機**（約 3.6 KB/s）。一張 20K 的圖要跑六秒，所以圖必須小、必須少、而且必須「值得」。
- **640×480 或 800×600 螢幕**，256 色。所以有 216 網頁安全色這件事。
- **手打 HTML 3.2**（Notepad、FrontPage Express、Netscape Composer）。沒有 CSS、沒有 JavaScript 框架、沒有版面工具，唯一能排版的東西是 `<table>`。
- **沒有搜尋引擎推薦你**。你的流量來自留言簿、交換連結、環（webring）——也就是**人**。

從這四條限制長出來的整套視覺語言，就是這個流派。它的核心情緒是：**這是我的一頁，我自己弄的，歡迎光臨，請留個話再走**。

因此三條做人原則：

1. **不要做得比一九九八年好。** 不要加圓角、不要加陰影、不要加淡入、不要用 flexbox 做出一九九八年做不出來的對齊。你要重建的是一個時代，不是致敬它。
2. **但也不要做得比一九九八年爛。** 那個年代的好站是有秩序的：欄寬固定、表格對齊、色彩有規則、資訊分區明確。亂碼式的堆砌是失敗品，不是風格。
3. **站務家具就是內容的一部分。** 訪客計數器、最後更新日期、施工中橫幅、環章、留言簿——它們不是裝飾，它們是這個時代的社交協定。拿掉它們，它就只是一個舊網頁。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 Web 1.0 了。

### 特徵 1・平鋪的背景磚（tiled background）

整個頁面的底是一塊小磚（那個年代是 100×100 上下的 GIF）不斷重複。它沒有邊、不會被裁切、永遠不是漸層，而且**它常常和文字打架**——所以內容一定要放在一塊不透明的表格裡。這條規則直接生出了特徵 2。

```css
body{
  background:#C0C0C0 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' shape-rendering='crispEdges'%3E%3Crect width='32' height='32' fill='%23CC9966'/%3E%3Cpath fill='%23996633' d='M3 1h2v1H3zM14 8h2v1h-2zM25 15h2v1h-2z'/%3E%3C/svg%3E") repeat;
}
```

磚一定要**接得起來**（左右緣、上下緣連續）。做法是在格陣上畫圖時把座標取模：`x = ((x % 32) + 32) % 32`，任何跨出邊界的筆畫自動繞回另一邊。

### 特徵 2・有框線的表格版面 ＋ 固定 640px 內容欄

版面由 `<table border>` 切分，立體感一律來自 **2px outset／inset 浮雕邊**（那是 Windows 95 的控制項語言），不是陰影。內容欄寬固定 640px 置中——因為螢幕是 640×480，這是一個**硬體事實**，不是設計選擇。

```css
.doc{width:640px;margin:0 auto 14px;background:#FFFFFF;border:2px outset #C0C0C0;padding:14px 16px 18px}
table.t{border-collapse:collapse;width:100%}
table.t th{background:#000080;color:#FFFFFF;font:bold 13px Arial,sans-serif;text-align:left;padding:3px 6px;border:1px solid #808080}
table.t td{border:1px solid #808080;padding:3px 6px}
table.t tr:nth-child(even) td{background:#FFFFCC}   /* bgcolor="#FFFFCC" 隔列 */
.btn{border:2px outset #C0C0C0;background:#C0C0C0;padding:2px 10px}
.btn:active{border-style:inset}                      /* 按下去＝邊框翻面，不是位移＋陰影 */
```

### 特徵 3・系統字，而且只有七階字級

`Times New Roman`（中文接新細明體）當正文，`Arial`（中文接細明體）當標題，**沒有第三種字**。字級只有 `<font size=1..5>` 加 h1/h2/h3 那七階，行高緊（1.15，不是 1.6）。

這一條看起來像「沒做選擇」，其實相反：**那個年代瀏覽器就只有這幾種字**，所以「字體個性」正是「只有這幾種字」這件事本身。用 Google Fonts 會立刻毀掉這個風格。

```css
body{font-family:"Times New Roman","新細明體",PMingLiU,Times,serif;font-size:16px;line-height:1.15}
h1{font:bold 24px Arial,"細明體",sans-serif;color:#FF0000;text-align:center}
h2{font:bold 18px Arial,"細明體",sans-serif;color:#000080;border-left:8px solid #FF0000;padding-left:7px}
h3{font:bold 15px Arial,"細明體",sans-serif;color:#006600}
.mono{font-family:"Courier New",Courier,monospace;font-size:12px}
a{color:#0000EE;text-decoration:underline}
a:visited{color:#551A8B}
a:hover,a:active{color:#FF0000}
```

**連結的三個顏色（`#0000EE` 藍、`#551A8B` 紫、`#FF0000` 紅）不可以改。**它們是這個時代唯一的互動語彙——一個連結去過沒去過，靠的是顏色，不是任何別的東西。

### 特徵 4・逐格小圖，而且尺寸是規格不是設計

所有圖都是**無反鋸齒、216 網頁安全色、1px 為最小單位**的逐格小圖。而且尺寸是那個年代的固定廣告規格，不是你想多大就多大：

| 用途 | 尺寸 | 說明 |
|---|---|---|
| 橫幅 banner | 468 × 60 | 站徽、頂端招牌 |
| 徽章 button | 88 × 31 | 交換連結、環章、獎章、Best viewed |
| 圖示 icon | 32 × 32 | 品項、分類 |
| 項目符號 bullet | 16 × 16 | 清單前的小球 |

```css
img,svg{image-rendering:pixelated}         /* 放大不要糊 */
svg{shape-rendering:crispEdges}            /* 邊不要抗鋸齒 */
```

畫法：先在格陣上決定每一格的顏色，再逐列 run-length 合併、上下相同的併成方塊、同色併成一條 `<path>`。這樣「一格還是一格」，但位元組數會小四到五倍——那個年代的圖也是這樣省出來的。

```js
// 格陣 → 向量（同色一條 path，段落為 M x y h w v h h-w z）
function rects(g){
  const runs=[];
  for(let y=0;y<g.h;y++){let x=0;while(x<g.w){const c=g.get(x,y);
    if(c===null){x++;continue;} let n=1; while(x+n<g.w&&g.get(x+n,y)===c)n++;
    runs.push({x,y,w:n,c}); x+=n;}}
  /* …依 x|w|c 分組後把連續 y 併成方塊，再依顏色併成 path… */
}
```

### 特徵 5・站務家具（site furniture）

這一條最容易被漏掉，而它才是這個流派的靈魂。至少要有：

- **施工中橫幅**（under construction）——公開承認這一頁沒做完。
- **訪客計數器**——七位數 odometer，深底綠字或黑底白字。
- **最後更新日期**——而且要寫得很明確（「民國八十八年七月十二日」）。
- **留言簿**與**站長信箱**。
- **環章**（webring navbar）——上一站／下一站／隨機／名冊。
- **Best viewed in ⋯**、**Made with ⋯** 之類的自陳徽章。
- **彩虹分隔線** `<hr>`。

```html
<hr class="rb">
<p align="center">
<font size="2">本頁最後更新：民國八十八年七月十二日　到訪人次</font>
<img src="counter.gif" width="58" height="13" alt="47182">
</p>
```

```css
hr.rb{height:6px;border:0;background:repeating-linear-gradient(90deg,
  #FF0000 0 10px,#FF9900 10px 20px,#FFFF00 20px 30px,
  #00CC00 30px 40px,#0000FF 40px 50px,#9900CC 50px 60px)}
```

---

## 三、色彩系統

**硬規則：所有顏色必須落在 216 網頁安全色**（每個通道只能是 `00 / 33 / 66 / 99 / CC / FF`）。

**只有三個歷史例外**，因為它們是這個時代的定義色：`#C0C0C0`（Netscape 的預設灰）、`#0000EE`（連結）、`#551A8B`（已訪問）。

| 色 | hex | 面積 | 用途 |
|---|---|---|---|
| 銀 | `#C0C0C0` | ≈30% | 頁面地色、控制項底、浮雕邊的中間值 |
| 白 | `#FFFFFF` | ≈26% | 內容表格底（長文一律在白底上，不在磚上） |
| 海軍藍 | `#000080` | ≈12% | 表格標題列、h2、頁尾、橫幅底 |
| 黑 | `#000000` | ≈10% | 正文、所有 1px 框線、圖的外緣 |
| 大紅 | `#FF0000` | ≈7% | h1、「更新！」、作用中連結、標線 |
| 連結藍 | `#0000EE` | ≤5% | 只給連結 |
| 已訪紫 | `#551A8B` | ≤3% | 只給去過的連結 |
| 米黃 | `#FFFFCC` | ≤6% | 隔列底色、引言框底 |
| 青／洋紅／亮綠 | `#00FFFF`／`#FF00FF`／`#00FF00` | 各 ≤3% | 只在背景磚與小圖示裡出現 |

規則：

- **零漸層**。允許 hard-stop 色帶（`repeating-linear-gradient` 每段都是實色、沒有過渡），因為那是「把六塊色貼成一條」，不是漸層。
- **零圓角、零模糊陰影**。立體感只有一種來源：`2px outset`／`2px inset`。
- **深色不當底色**。這個流派的底是亮的（銀、米黃、淺磚），暗底是它的另一支（駭客風／黑底霓虹），不要混。

---

## 四、字體系統

| 角色 | 字族 | 大小 | 字重／行高 |
|---|---|---|---|
| 正文 | `"Times New Roman","新細明體",PMingLiU,Times,serif` | 16px | normal / 1.15 |
| 小字 | 同上 | 12–14px | normal / 1.2 |
| h1 | `Arial,"細明體",sans-serif` | 24px | bold / 1.1，置中，紅色 |
| h2 | 同上 | 18px | bold，左邊一條 8px 紅槓 |
| h3 | 同上 | 15px | bold，綠色 |
| 表頭 | 同上 | 13px | bold，白字藍底 |
| 數字／碼 | `"Courier New",Courier,monospace` | 12px | normal |
| 圖內小字 | `MingLiU,PMingLiU,SimSun,serif` | 8–12px | 那個年代圖裡的中文是點陣字 |

排版細節：

- 中文標題常常**逐字加空白**（「歡　迎　光　臨」）。這是那個年代唯一的字距工具，請照做。
- 段落之間用 `<p>`，不要用 margin 做節奏。段落間距 6px。
- `<center>` 的語意用 `text-align:center` 重建，而且**要常常用**——這個流派的東西是置中的。

---

## 五、版面與網格

**框架集（frameset）**是這個時代最具識別性的版面。現代瀏覽器已經移除 `<frameset>`，用 CSS Grid 重建它，但要保留三件事：**各框各自捲動、框之間有實體分隔線、分隔線可以拖**。

```
┌──────────────────────────────────┐
│  橫幅框 64px（468×60 站徽 + 時鐘） │
├────────┬─────────────────────────┤
│ 導覽框 │  主框                   │
│ 170px  │  （640px 內容欄置中）    │
│ 可拖寬 │  各自捲動                │
├────────┴─────────────────────────┤
│  狀態列 22px（Document: Done）    │
└──────────────────────────────────┘
```

```css
html,body{height:100%;margin:0}
body{display:grid;grid-template-rows:64px 1fr 22px}
.mid{display:grid;grid-template-columns:auto 1fr;min-height:0}
.nav{width:var(--navw,170px);overflow:auto;resize:horizontal;
     min-width:118px;max-width:340px;border-right:2px outset #C0C0C0}
.main{overflow:auto}
.status{border-top:2px inset #C0C0C0;background:#C0C0C0;font:11px Arial}
@media (max-width:560px){
  html,body{height:auto}
  body{display:block}.mid{display:block}
  .nav{width:auto;resize:none;border-right:0;border-bottom:2px outset #C0C0C0}
  .doc{width:auto;margin:0 5px 10px}
}
```

留白規則：**留白很少**。內容欄內邊距 14–16px，元素間距 6–8px，區塊之間才用彩虹 `<hr>` 隔開。這個流派怕空，不怕擠。

---

## 六、元件配方

### 導覽（現用頁那一列不是連結）

一九九六年手寫 HTML 的人，在自己那一頁不會把自己做成連結——他就是打了一行純文字。**這就是現用態**：不是高亮、不是換色、不是加記號，而是**可點性的喪失**。

```html
<ul class="nav-l">
  <li><span class="now" aria-current="page">首　頁</span><small>HOME　店在哪、賣什麼</small></li>
  <li><a href="beetles.html">飼育圖鑑</a><small>GUIDE　十五種蟲</small></li>
</ul>
```
```css
.nav-l{list-style:none;margin:0;padding:0}
.nav-l li{margin-bottom:3px;font-size:15px}
.nav-l .now{color:#000000;text-decoration:none}      /* 就是純文字，什麼都不加 */
.nav-l small{display:block;font:11px Arial;color:#333333;line-height:1.1}
```

### 按鈕

```css
.btn{font:bold 13px Arial,sans-serif;border:2px outset #C0C0C0;background:#C0C0C0;padding:2px 10px;color:#000000;cursor:pointer}
.btn:active{border-style:inset}
.btn[disabled]{color:#808080;cursor:default}
```

### 卡片（其實是表格格）

這個流派沒有「卡片」，只有**表格裡的一格加一圈浮雕邊**。禁止圓角、禁止陰影、禁止等高 flex 對齊以外的花樣。

```html
<table class="t plain"><tr>
<td width="33%"><div class="cell"><p align="center"><img …></p><b>品名</b><br>…</div></td>
</tr></table>
```
```css
.cell{border:2px outset #C0C0C0;background:#FFFFFF;padding:5px;height:100%}
table.plain,table.plain td{border:0;background:transparent}
```

### 表單

```css
input[type=text],textarea,select{border:2px inset #C0C0C0;background:#FFFFFF;padding:1px 3px;
  font-family:"Times New Roman","新細明體",serif;font-size:14px}
fieldset{border:2px groove #C0C0C0;padding:6px 10px 10px}
legend{font:bold 13px Arial,sans-serif;color:#000080}
```

### 頁尾

置中、小字、彩虹線在最上面，內容依序是：地址電話營業時間 → 最後更新 → 環章 → 版權宣告 → 「本站圖片請勿直接連結（會吃掉我的流量）」。

### 環章（webring navbar）——這個流派專屬的元件

環章是要**貼在別人站上**的東西，所以它必須是一段可以複製的 HTML 原始碼，而且要用一九九八年的寫法（`<table border>`、`<font face>`、`<center>`），不能用 CSS：

```html
<!-- 台灣甲蟲同好環 環章 開始 -->
<center>
<table border="1" cellpadding="4" cellspacing="0" bgcolor="#C0C0C0">
<tr><td align="center">
<font face="細明體" size="2"><b>台灣甲蟲同好環</b></font><br>
<font face="細明體" size="1">第 25 站　阿成的蟲窩</font><br>
<a href="…">上一站</a> ｜ <a href="…">下一站</a> ｜ <a href="…">隨機</a> ｜ <a href="…">名冊</a>
</td></tr></table>
</center>
<!-- 台灣甲蟲同好環 環章 結束 -->
```

---

## 七、動效規則

**這個流派的動畫只有一種做法：逐格。**沒有補間、沒有 easing、沒有淡入。所有動的東西都是一張橫向排開的精靈圖被整條往左推，每一格是一跳。

```html
<svg class="spr f6" viewBox="0 0 24 24" style="--w:144px;--dur:.72s" aria-hidden="true">
  <g class="reel"><g>…第1格…</g><g transform="translate(24,0)">…第2格…</g>…</g>
</svg>
```
```css
.spr .reel{animation-name:reel;animation-duration:var(--dur);animation-iteration-count:infinite}
.f4 .reel{animation-timing-function:steps(4)}
.f6 .reel{animation-timing-function:steps(6)}
.f8 .reel{animation-timing-function:steps(8)}
@keyframes reel{to{transform:translateX(calc(-1 * var(--w)))}}
```

四種動效，缺一不可：

| 種類 | 本站的做法 | 觸發 | 時值 | reduced-motion |
|---|---|---|---|---|
| **ambient 環境** | 施工中的工人（steps(6)/0.72s）、旋轉信箱（steps(8)/1.6s）、NEW! 星（steps(4)/0.6s）、走路的鍬形蟲（steps(4)/0.56s）、彩虹 `<hr>` 的色帶位移（steps(6)/3s） | 不需輸入 | 見左 | 全部停在第 1 格；`<hr>` 停止位移。圖案仍在，資訊零損失 |
| **input 輸入** | 連結 hover 立刻變 `#FF0000`（**沒有 transition**，因為一九九八年沒有）；表格列 hover 變 `#FFFF99`（重建 `onMouseOver="this.bgColor=…"`）；按鈕 `:active` 邊框 outset→inset；左框分隔線拖曳即時改欄寬 | hover／點按／拖曳 | < 16ms | 不受影響（那是狀態不是動畫） |
| **transition 轉場** | **三階段到齊**：進頁時先只有文字（0–150ms）→ 表格框線與底色到齊（150–310ms）→ 圖開始下載。這正是一九九六年 `<table>` 要等整段解析完才排版、圖最後才畫的順序 | 頁面載入 | 310ms，`steps` 硬切 | 直接跳到最終狀態 |
| **signature 簽名** | **modem-draw 數據機逐列成像**（見下） | 捲到該圖 | 由圖自己的位元組數決定 | 圖直接完整顯示，`Document: Done` |

### 簽名動效：modem-draw 數據機逐列成像

**每一張圖都以 28.8k 的速度由上往下一列一列畫出來，而它花多久，是用那張圖自己的位元組數算的。**

```js
const bytes = new Blob([el.innerHTML]).size;        // 那張圖真正的大小
const dur = Math.min(6.5, Math.max(0.18, bytes/1024/3.6));   // 28.8k ≈ 3.6 KB/s
el.style.setProperty('--dur', dur+'s');
```
```css
.img>svg{clip-path:inset(0 0 100% 0)}
.img.go>svg{animation:mdraw var(--dur) steps(24,end) forwards}
.img.done>svg{clip-path:inset(0 0 0 0);animation:none}
@keyframes mdraw{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0% 0)}}
```

配套三件事：

1. **捲到才開始下載**（`IntersectionObserver`）——一九九六年的圖就是捲到才進來的。
2. 大圖下面掛一行 mono 的 `12.4K of 18.0K (68%)`，狀態列同步顯示 `Transferring image (18.0K)…`，全部畫完才寫 `Document: Done`。
3. 這**不是**淡入、不是滾動揭示、不是視差。它沒有透明度變化、沒有位移、沒有 easing；它是一個檔案格式的行為被重建成 24 個硬切的掃描段，而它的長度是一個可驗算的物理量。

自我限制（可寫進你的站，但不得讓動效總數低於四種）：**全站禁用 opacity 淡入、禁用 transform 位移進場、禁用視差、禁用數字滾動計數、禁用 `stroke-dashoffset` 描繪**。訪客計數器只是一張靜態的 odometer 圖，它不會跳給你看。

### 關於 `<blink>`

`<blink>` 已從所有瀏覽器移除。要重建它請遵守三條：頻率壓在 **1Hz 以下**（不得接近 3Hz，那是光敏性癲癇的門檻）、**全站最多兩處**、而且**必須提供一顆停止鈕**。`prefers-reduced-motion` 下一律不閃。

```css
.blink{animation:blk 1.2s steps(2) infinite}
@keyframes blk{50%{visibility:hidden}}
html.noblink .blink,@media (prefers-reduced-motion:reduce){.blink{animation:none}}
```

---

## 八、插畫與圖像風格

技法名稱：**websafe-sprite 網頁安全色逐格構成**。

全站只有兩種圖像原語，沒有第三種：

1. **逐格小圖**：1px 為最小單位、216 網頁安全色、零反鋸齒、尺寸照特徵 4 的規格表。
2. **無縫背景磚**：32–128px 見方，四邊必須接得起來。

判準是：**拿掉顏色，你還讀得出這張圖有幾格；而每一張圖都要能被說出「它有幾 KB」**——因為它的下載時間就是由這個數字決定的。

主題物件（本站是甲蟲）不要一張一張手畫，寫一支**參數化引擎**：一組參數（體長、鞘翅寬、前胸寬、大顎型態與長度、角、三個體色）畫出一隻，二十四個品項就是二十四組參數。同一支引擎再降解析度輸出 logo（60px）、favicon（16px）、徽章上的小蟲（23px）、走路精靈（22px×4 格）。這樣整站的圖必然同源，而且新增一個品項只要加一行參數。

```js
function beetleGrid(p){
  const g = Grid(p.W,p.H), cx=(p.W-1)/2;
  const top = p.ml + p.head + 1;              // 大顎先佔位，其餘往下排
  // 腳（三對，1px 折線）→ 鞘翅（橢圓＋中央接縫＋左上高光）→ 前胸（梯形）→ 頭（含複眼）→ 大顎／角
  return g;
}
```

明文禁用：照片、漸層填色、抗鋸齒的曲線、`feTurbulence` 手繪毛邊、半調網點、細線幾何線描、emoji。

---

## 九、Logo 與 Favicon

- **Logo**：128×128，銀底 + 一圈 outset 浮雕邊（上左白 `#FFFFFF`、下右灰 `#808080`）+ 一塊 `#000080` 招牌 + 招牌內 `#FFCC00` 細框 + 主題物件的 60px 逐格圖 + 下方 22px 中文店名（`MingLiU` 粗體）。整支由同一支圖像引擎輸出，不用外部字型檔以外的任何素材。
- **Favicon**：16×16，同一支引擎的最小解析度輸出，底色用強調色（本站 `#FFCC00`），寫成 inline SVG data URI 放在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E…%3C/svg%3E">
```

編碼時只要把 `<` `>` `#` `"` 換掉即可（`%3C` `%3E` `%23` 與改用單引號），不需要整串 base64。

---

## 十、Do & Don't

### Do

- 背景磚一定要接得起來，內容一定要放在不透明的白底表格上。
- 連結的三個顏色照抄，不要改。
- 圖的尺寸照 468×60 / 88×31 / 32×32 / 16×16 的規格。
- 寫「最後更新：民國八十八年七月十二日」這種**具體到荒謬**的日期。
- 承認自己沒做完（施工中橫幅）。
- 文案用第一人稱、口語、有主張（「價錢都寫在那一頁，不用問」）。
- 交換連結、留言簿、環章——社交家具要真的能用。
- 手機 ≤560px 要把框架攤平成單欄，別讓一九九八年變成不能讀。
- 明白告訴使用者資料存在哪裡（本站：只存在他自己的瀏覽器）。

### Don't

- ❌ 圓角、模糊陰影、漸層、毛玻璃、`rounded-2xl` 卡片牆。
- ❌ Google Fonts、可變字型、任何一九九八年沒有的字。
- ❌ 淡入、滾動揭示、視差、數字滾動、`cubic-bezier` 的任何緩動。
- ❌ 置中大標＋副標＋兩顆按鈕＋三張卡片的模板。
- ❌ 紫藍漸層 hero。
- ❌ emoji 當圖示（那個年代沒有 emoji；圖示一律自繪逐格 SVG）。
- ❌ Lorem ipsum、AI 腔（「在當今快節奏的世界」）。
- ❌ 「EST. 19xx」徽章——寫「開店：民國八十四年三月」就好，那是資訊不是裝飾。
- ❌ 自動播放的音樂。要放背景音樂請做成一顆預設關閉的開關（一九九八年的 `<bgsound>` 是自動播的，但那件事在今天是錯的，這是少數應該修正時代的地方）。
- ❌ 把 `<blink>` 或跑馬燈當主要動效。跑馬燈在這個流派裡是合法語彙，但**一頁最多一條**，而且不要拿它承載重要資訊。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant" class="st1">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>首頁｜○○○</title>
<link rel="icon" href="data:image/svg+xml,…">
<style>/* 見第三～七章 */</style>
<noscript><style>.img>svg{clip-path:inset(0 0 0 0)!important}html.st1 *{border-color:inherit}</style></noscript>
</head>
<body class="fs">

<div class="fs-banner">
  <span class="img" style="border:0"><svg viewBox="0 0 468 60">…站徽…</svg></span>
  <span style="color:#FFF;font:11px Arial">台中市北屯區　04-2422-6187<br><span id="clk">--:--:--</span></span>
</div>

<div class="fs-mid">
  <nav class="fs-nav" aria-label="站內導覽">
    <p class="nav-t">目　錄</p>
    <ul class="nav-l">
      <li><span class="now" aria-current="page">首　頁</span><small>HOME</small></li>
      <li><a href="two.html">第二頁</a><small>PAGE TWO</small></li>
    </ul>
    <p class="nav-t">到訪人次</p>
    <p class="center"><span class="img"><svg viewBox="0 0 58 13">…odometer…</svg></span></p>
    <div class="badges"><span class="img"><svg viewBox="0 0 88 31">…88×31…</svg></span></div>
  </nav>

  <main class="fs-main">
    <div class="doc">
      <div class="center" style="border:2px inset #C0C0C0;background:#FFFFCC;padding:6px">
        <svg class="spr f6" …>…工人…</svg> <b>本站施工中</b>
      </div>
      <h1>歡　迎　光　臨</h1>
      <hr class="rb">
      <p>第一人稱的自我介紹，兩到四段，要有主張。</p>
      <h2>店在哪裡</h2>
      <table class="t">
        <tr><th style="width:96px">地　址</th><td>具體到門牌與地標</td></tr>
        <tr><th>電　話</th><td class="mono">04-2422-6187</td></tr>
      </table>
    </div>
    <div class="doc center" style="background:#C0C0C0">
      <hr class="rb">
      <p class="mono">本頁最後更新：民國八十八年七月十二日</p>
      <p id="ringfoot">環章的位置</p>
    </div>
  </main>
</div>

<div class="fs-status">
  <b id="sbar-msg">Document: Done</b>
  <button class="sbtn" id="blinkoff">停止閃爍</button><span>28.8 Kbps</span>
</div>
</body>
</html>
```

---

## 十二、技術實作與相容性

本站認領三項核心技術，全部在 2026-08-21 查證過現況支援，全部 Baseline Widely available，沒有一項需要旗標。

### 1．`steps()` 逐格動畫與精靈圖（B 動效與時間軸層）

**承載**：特徵 5 的全部站務家具動畫（工人、信箱、NEW! 星、走路的蟲）、彩虹 `<hr>` 的色帶位移、簽名動效的 24 段掃描、三階段到齊的硬切。這個流派的動畫**只能**是逐格的，用 `ease`／`linear` 會立刻變成二〇二〇年代的東西。

**查證**：MDN《`<easing-function>`》標示 **Baseline Widely available**，`steps()` 自 **2015-07** 起跨瀏覽器可用。

**實作要點**：`steps(n)` 的參數必須是**字面整數**，`steps(var(--fr))` 是無效 CSS——所以用 `.f3 / .f4 / .f6 / .f8` 四個類別各寫一條 `animation-timing-function`，格數由類別給、總寬與時值由自訂屬性給。位移量寫成 `translateX(calc(-1 * var(--w)))`，`var()` 在 `@keyframes` 裡是可以用的。

**Fallback**：不支援 `steps()` 的瀏覽器會退回 `ease`，動畫仍在跑、只是變成連續的（不會壞，只是不對味）。`prefers-reduced-motion: reduce` 下 `.reel` 的 animation 整個關掉，停在第 1 格——每一支精靈的第 1 格都是可獨立閱讀的完整圖案（工人站著、信箱關著、星是滿的、蟲是完整的），資訊零損失。

### 2．`IntersectionObserver`（D 輸入與感測層）

**承載**：簽名動效的觸發——圖捲進視窗才開始「下載」。這是這個流派的核心體感（一九九六年你捲到哪裡，圖才載到哪裡），不是效能優化。

**查證**：MDN《IntersectionObserver》標示 **Baseline Widely available**，自 **2019-03** 起跨瀏覽器可用。

**實作要點**：`root` 留 `null` 即可。雖然本站的主框是一個 `overflow:auto` 的捲動容器，但交集演算法本來就會被祖先的 overflow clip 裁切，所以視窗根一樣正確。`rootMargin:'100px'` 讓圖在進畫面前一點點開始，避免使用者盯著空框。

**Fallback**：`if(!('IntersectionObserver' in window))` 時，所有圖直接標成 `done`（`clip-path` 解除）並把百分比標籤寫成 100%，狀態列直接寫 `Document: Done`。畫面完全一樣，只是少了那六秒的等待。

### 3．`IndexedDB`（E 資料與生成層）

**承載**：核心功能的產出物——你在環上的位置（環號、上一站、下一站、背景磚、環章樣式）與留言簿的多筆記錄。選它而不是 `localStorage`，是因為留言簿是**有結構、要依時間倒序讀、會持續增加**的多筆記錄，而環員資料要在四個頁面之間一致地被讀出來（狀態列、頁尾環章、背景磚都靠它）。

**查證**：MDN《IndexedDB API》（含 `IDBFactory`／`IDBDatabase`／`IDBObjectStore`）標示 **Baseline Widely available**，自 **2015-07** 起跨瀏覽器可用。

**實作要點**：兩個 object store——`guest`（`keyPath:'id'`，`autoIncrement`）與 `ring`（`keyPath:'k'`，永遠只有一筆 `k:'me'`）。所有讀寫包成 `DBput / DBall / DBclear` 三個函式，介面與儲存後端解耦。

**Fallback**：無 `indexedDB`（或在私密模式下 `open()` 直接 throw／`onerror`）時退回 `localStorage` 的單一 JSON；再不行就退回記憶體物件，功能在本次瀏覽期間完全一樣，只是關掉分頁就沒了。介面上明講「你留的話只存在你自己的瀏覽器裡」。

### 附帶用到但不列為核心的

- **`clip-path: inset()` 動畫**：MDN 標示 `clip-path` 自 **2017-03** 起跨瀏覽器可用；相同形狀函式之間可補間，`inset()` 對 `inset()` 合法。不支援時圖直接完整顯示。
- **CSS `resize: horizontal`**：MDN 標示為 **Limited availability**（部分主流瀏覽器不支援，行動版 Safari 沒有）。因此它只是漸進增強——導覽框旁邊永遠有「◄ 窄 / 寬 ►」兩顆按鈕做同一件事，鍵盤可操作。
- **`prefers-reduced-motion`**：四種動效各自都有降級，且降級後畫面上的每一個資訊都還在。

### 效能預算（實測）

| 頁 | 單頁大小（含 inline 全部資源） | 圖像數 |
|---|---|---|
| index.html | 60.0 KB | 5 |
| beetles.html | 102.5 KB | 31 |
| ring.html | 117.7 KB | 32 |
| guestbook.html | 61.0 KB | 15 |

全部遠低於 350 KB 上限。零外部請求（連字型都沒有）。

- 圖像從格陣轉向量時做兩次合併（逐列 run-length → 上下同型併方塊 → 同色併 path），位元組數降到未合併版本的約 **20%**（24 張品項圖由 152 KB 降到 25 KB）。
- 首屏 JS：三階段到齊的兩個 `setTimeout` 加一次 `querySelectorAll` 與每張圖一次 `new Blob().size`，實測 < 5ms。
- 動畫全部只改 `clip-path` 與 `transform`，不觸發 layout；rAF 迴圈只在「正在成像的圖」不為空時運轉，圖畫完自動停。
- 沒有任何一張外部圖片、外部字型、外部音檔或 CDN。

---

## 十三、驗收：你做完之後自己檢查

1. 把首屏截圖，**遮掉全部文字**——三秒內看得出這是一九九八年的個人首頁嗎？（銀底＋平鋪磚＋白框內容表＋彩虹線＋88×31 徽章列＋計數器）
2. 五個不可省略特徵，在畫面上**全部找得到**嗎？
3. 關掉 JavaScript，整站還讀得完嗎？（表格、名冊、規則、聯絡資料必須是靜態 HTML）
4. 開 `prefers-reduced-motion`，有沒有任何資訊消失？
5. 視窗縮到 360px 寬，框架有沒有攤平、有沒有橫向捲軸？
6. 你有沒有偷偷用了一個一九九八年不存在的東西（圓角、陰影、淡入、Google Fonts）？
