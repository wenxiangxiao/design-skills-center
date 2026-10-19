---
name: lcd-handheld-segment
description: Early-1980s single-segment LCD handheld game style — every pose pre-printed as a fixed dark silhouette that can only switch on or off (with faint ghost segments), reflective grey-green liquid crystal over a pale printed colour film, slanted seven-segment digits, brushed-metal faceplate with printed orange frame and round red buttons.
---

# 段碼液晶掌機風 LCD Handheld · Segment Display

> 型錄「數位與螢幕原生」2026-10-20 新增條目。範例站：早頓煎台 TSÁ-TǸG（新竹光復路西式早餐，`sites/tsa-tng`）。

## 設計哲學

1980 年 4 月，任天堂橫井軍平以夏普計算機用的反射式 TN 液晶做出第一台 Game & Watch〈Ball〉；1981 年 6 月起的 Wide Screen 系列把螢幕加大約三成，同年 9 月的〈Chef〉讓廚師用平底鍋把食物一直拋在空中。1982 年起有上下雙屏的 Multi Screen，美國 Tiger Electronics、日本 Bandai 的 LSI Game 與港台代工的同類掌機在 1980 年代鋪滿了文具店。

這種螢幕長成這樣，是因為**它根本不能畫圖**：液晶玻璃在工廠蝕刻時就把每個角色的每個姿勢、每個位置都印成一塊固定的電極，晶片只能讓某塊變黑或不變黑。所以：

- 角色不會「移動」，只會在預先決定的幾個位置之間「跳」；
- 沒點亮的段還是隱約看得到（殘影），整個遊戲的所有可能畫面其實一直都在玻璃上；
- 螢幕本身只有灰綠與近黑兩色，彩色來自玻璃後面那張**印刷的背景膜**；
- 機身是金屬拉絲面板＋印刷框＋實體按鈕，螢幕只是面板上的一扇小窗。

本風格的核心不是「復古遊戲」，而是**有限狀態的誠實**：畫面上能發生的事情，全部事先印好、全部看得見。把它用在網站上，就是讓每一個狀態都是一個可以被看見的預印段，互動只負責開與關。

## 本風格的 5 個不可省略特徵

### ① 預印段碼：只能開關，不能移動，熄滅段留殘影

畫面裡的每個物件、每個位置都是一塊固定的實心剪影（SVG `path`，`fill-rule:evenodd` 挖洞做細節）。動畫＝切換哪些段 `on`。禁止 `transform` 位移、縮放、補間；淡入淡出只能用 `steps()`。未點亮的段保留 5–6% 不透明度。

```css
.lcd .s{fill:#1D231E;opacity:.055;transition:opacity .14s steps(2,jump-none)}
.lcd .s.on{opacity:.9;transition-duration:.03s}   /* 液晶上升快、下降慢 */
.lcd .s.st{fill:none;stroke:#1D231E;stroke-linecap:round} /* 少數描邊段：冒煙 */
```
```html
<path class="s" data-s="p1" d="M151 57a8.6 9 0 1 0 17.2 0…Z"/>  <!-- 老闆娘在第 2 格 -->
<path class="s" data-s="a12" d="…"/>                          <!-- 第 2 格的蛋餅在空中第 2 高 -->
```

### ② 反射式液晶配色：灰綠底、近黑段、1.5px 落影，彩色只在背景膜

液晶 `#B3BB9A`、段 `#1D231E`（點亮時 90%）。段在反射板上有一道約 1.3/1.7px 的落影（玻璃厚度造成），以同一組段 `<use>` 位移＋0.45 模糊、20% 不透明度重畫。顏色只出現在段後面的「印刷膜」：平塗、低彩、整層 62% 不透明。

```html
<g class="film" style="opacity:.62"><rect y="30" width="320" height="82" fill="#93BCAA"/>…</g>
<use href="#segs" transform="translate(1.3 1.7)" opacity=".2" filter="url(#soft)"/>
<g id="segs" fill-rule="evenodd">…所有段…</g>
```

### ③ 斜七段數字＋LCD 圖示字

分數、時刻、價錢、數量一律是自繪 SVG 七段（六角段、斜 6°、底邊對齊），旁邊配固定位置的圖示段：`AM`/`PM`、`GAME A`/`GAME B`、`MISS`＋三個失誤圖示、鈴鐺。面板與圖示字用斜體粗黑無襯線全大寫（Archivo 800 italic）。

```js
function seg7(id,x,y,w,h){ /* 回傳 7 個 polygon，data-s=id+a..g，外包 translate((y+h)*.105) skewX(-6) */ }
var DIG={0:'abcdef',1:'bc',2:'abged',3:'abgcd',4:'fgbc',5:'afgcd',6:'afgedc',7:'abc',8:'abcdefg',9:'abcdfg'};
```

### ④ 拉絲金屬面板＋印刷外框＋實體按鈕

頁面底色就是機身：水平髮絲紋銀面。螢幕是黑色小圓角框，外面印一圈「銀—橘—銀—橘」雙線框；頂端是橘色印刷帶寫型號。操作鈕是圓形朱紅大鈕（黑色底座、按下 4px）、小方形模式鈕（灰黑、按下沉入）。

```css
body{background:repeating-linear-gradient(0deg,rgba(255,255,255,.16) 0 1px,rgba(0,0,0,.035) 1px 2px,transparent 2px 3px),linear-gradient(180deg,#DCDFDA,#C9CCC6 40%,#AEB2AB)}
.bezel{background:#262927;border-radius:12px;padding:16px;box-shadow:0 0 0 3px #DCDFDA,0 0 0 5px #E2602B,0 0 0 8px #DCDFDA,0 0 0 10px #E2602B}
.btn{width:64px;height:64px;border-radius:50%;background:#CC3A2B;box-shadow:0 0 0 5px #2A2D2B,0 5px 0 5px #151716}
.btn:active{transform:translateY(4px);box-shadow:0 0 0 5px #2A2D2B,0 1px 0 5px #151716}
```

### ⑤ 掌機版式：每頁是一台機，螢幕永遠是小窗

每一頁是一個機型（Wide Screen 單屏、Multi Screen 上下雙屏翻蓋、Tabletop 桌上型），型號寫在橘帶右側（`TN-81`、`MS-82`、`TT-83`）。內容放在「印刷說明卡」上：米白紙 `#F1EBDD`、2px 墨框、點線分隔、斜體英文小標。螢幕不得滿版、不得當背景；它是一扇固定比例的窗。

```html
<header class="band">…<div class="model">WIDE SCREEN・BREAKFAST &amp; WATCH<em>TN-81 煎台</em></div></header>
<div class="card"><span class="kick">STEP 2 ・ HOW TO PLAY</span><h2>三句話玩完一輪</h2>…</div>
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 拉絲銀 | `#C9CCC6`（高光 `#DCDFDA`、暗 `#AEB2AB`） | 頁面＝機身 | 45% |
| 液晶灰綠 | `#B3BB9A` | 所有螢幕底、ML 元件底 | 18% |
| 說明卡米白 | `#F1EBDD` | 長文、表單 | 15% |
| 段黑 | `#1D231E` | 段碼、正文字 | 10% |
| 框黑 | `#262927` | 螢幕框 | 5% |
| 印刷橘 | `#E2602B`（深 `#B9461B`） | 頂帶、印刷框、現用頁三角、小標 | 5% |
| 按鈕朱紅 | `#CC3A2B` | 圓形大鈕、主要 CTA | ≤2% |
| 背景膜：磁磚青 `#93BCAA`、銅板 `#A86A40`、牛皮 `#D8B27A`、蛋黃 `#F0BF3A` | | 只在液晶背景膜內，62% | — |

規則：段永遠只有一色；背景膜不得出現在螢幕以外；面板上不放任何漸層色塊以外的彩色面積（橘帶除外）。

## 字體系統

- 中文：Noto Sans TC 500（內文 16px/1.7）、900（標題 24–34px/1.25）。
- 面板英文與 LCD 圖示字：Archivo 800/900 italic、全大寫、字距 .12–.2em，10–13px；型號 22px。
- 數字：一律 SVG 七段，不用數字字型。價目表中的價錢可用 Archivo 800 italic 18px。
- Google Fonts：`Archivo:ital,wght@0,500;0,800;1,800;1,900`、`Noto+Sans+TC:wght@500;700;900`。

## 版面與網格

- 外框 `max-width:1180px`，左右 28px；頂端橘帶滿版出血。
- 首頁：左 1.45fr 掌機（螢幕＋按鈕列）、右 1fr 說明卡欄；手機單欄、按鈕列改兩欄並把中段模式鈕移到最上。
- 雙屏頁：左欄翻蓋機 sticky（上屏、鉸鏈 30px、下屏），右欄菜單說明卡。
- 零旋轉；螢幕框之間至少 22px 金屬面留白；說明卡內點線分隔。
- 液晶 viewBox 以 320 寬為基準（單屏 320×200、上屏 320×150、下屏 320×110、桌上型 320×120）。

## 元件配方

- **導覽＝模式鈕**：四顆 44×16 灰黑小方鈕，下方印中文頁名＋英文模式名（GAME／MENU／TIME／ALARM）；現用頁的鈕沉入 3px、上方印一個橘色三角。hover 沉 1px。
- **主按鈕**：見特徵④；文字白色 Archivo 900 italic。CTA 連結做成朱紅膠囊＋4px 深紅底影。
- **數量鈕**：30×26 米白、2px 墨框、3px 圓角；按下轉橘底白字。
- **說明卡**：`.card{background:#F1EBDD;border:2px solid #1D231E;padding:22px 24px}`，小標 `.kick` 斜體橘字。
- **取餐單**：同說明卡但 `border-style:dashed`，表格行點線分隔。
- **頁尾**：3px 橘線上緣，地址、時間、電話一列；最小字 12px 寫虛構聲明。

## 動效規則

| 種類 | 本站自製實作 | 觸發 | 時值 |
|---|---|---|---|
| ambient | 時刻模式的待機示範：老闆娘自己在三格之間顧台、蛋餅冒煙翻面；冒號每秒閃；上屏選中品項的煙 0→3 縷循環 | 無需輸入 | 每拍 560ms／520ms，`steps` 切換 |
| input | 方向鍵／A/D／手把十字鍵／點格子 → 鍋鏟立即換格（同一事件內 `set`，<16ms）；按鈕 `steps(1)` 按下沉入；菜單 ↑↓ 換品項點亮上屏 | 鍵盤、Pointer、Gamepad | 段上升 30ms |
| transition | **ACL 全段測試**：點站內連結時所有段同時點亮（就像裝電池或按 ACL 鈕），兩聲蜂鳴，300ms 後換頁；新頁抵達時全段再亮 260ms 後清空 | 站內連結 | 300ms／260ms |
| signature | **預印段碼殘影液晶**：整站的狀態都是看得見的預印段，熄滅段 5.5% 殘影、點亮 90%、1.3/1.7px 反射落影，`steps(2,jump-none)` 的液晶反應 | 一直在 | — |

自我限制：液晶內禁止一切位移與縮放補間；面板上的按鈕只用 `steps(1)`。

`prefers-reduced-motion`：待機示範停在單一影格（時刻仍每 5 秒更新）、冒號常亮、ACL 轉場取消直接換頁、段切換取消過渡；遊戲照常（由使用者驅動）。資訊零損失。

### motion-library 元件表（wenxiangxiao/motion-library v1.6.0 @d1c08d2）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 動效種類 |
|---|---|---|---|---|---|
| TXT-B-10 | Stop Motion | index | text「早頓煎台」、colors `#1D231E/#E2602B/#B3BB9A`、duration 1.6、loop false、seed 1981、16:9 | 首頁右欄的店名液晶條：字以 12 個離散影格逐字跳出——跟段碼一樣沒有補間；底色是液晶灰綠，元件自動給近黑字＝段色 | transition（一次性進場） |
| BG-A-01 | Grid Fill | menu | colors `#1D231E/#E2602B/#B3BB9A`、duration 6、density 1.4、intensity .8、seed 81 | 菜單說明卡頂端的「液晶矩陣」帶：方格依相位一格一格變黑，像點陣液晶測試畫面；純 fillRect，零圓角零發光 | ambient |
| TXT-A-29 | Counter | menu | text「今早已煎 N」（N 依臺北時刻推算）、colors `#E2602B/#1D231E/#B3BB9A`、duration 1.8、once | 雙屏機下方的出餐計數：整數一格一格跳到今天的份數，和七段數字同一種節奏 | transition（一次性） |
| TXT-A-28 | Slot | story | text「1981」、colors `#E2602B/#1D231E/#F1EBDD`、duration 1.6、once | 沿革標題：四位數像機台撥碼轉到開店年份，字為說明卡墨色 | transition（一次性） |
| SHP-32 | Stairs Rise | story | colors `#93BCAA/#E2602B/#F1EBDD`、duration 4、loop、seed 7 | 「每小時出餐」示意：七根平頂長條對應 05–11 點，從磁磚青長到印刷橘；只有 fillRect，符合印刷膜的平塗 | ambient |

掛載方式：子集 inline 為每頁第一個 `<script>`；`TT.ml()` 等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、回到視窗重掛；一次性文字 `loop:false` 播一次後 `seek(1)`；canvas `aria-hidden`；原 HTML 標題留在 `.ml-fb`，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同畫面同時運轉的元件 ≤2。開發 Prompt 出處：`MotionLib.prompt(id)`。

## 插畫與圖像風格

**預印段碼圖集（lcd-segment-atlas）**：每個物件畫成一塊實心剪影，細節全部用 evenodd 挖洞（蛋黃、口袋、肉排烤紋、蘿蔔糕煎痕），不用描邊（冒煙除外）。同一個物件的每個位置各一塊；同一格的生料、熟面、空中兩個高度、焦煙互相重疊，重疊的殘影本身就是畫面的一部分。人物是幾何的：圓頭、髮髻、梯形圍裙、兩段式手臂＋鍋鏟。背景膜是平塗色塊：磁磚、鐵板、櫃台、窗外太陽、價目板。

禁止：漸層、陰影（反射落影除外）、描邊人物、像素點陣（那是另一個時代的螢幕）。

## Logo 與 Favicon 設計指南

Logo：橫式掌機剪影——銀色機身、頂端橘帶上寫 `TSÁ-TǸG`、黑框液晶窗、窗裡一塊預印的蛋餅段＋兩縷煙、左右各一顆朱紅圓鈕、右上一顆小方鈕。Favicon：32×32 橘底、黑框液晶、一塊挖蛋黃洞的蛋餅段、右下一點朱紅。兩者皆 inline SVG，不用字型以外的外部資源。

## Do & Don't

**Do**
- 先列出「所有可能的狀態」，每個狀態畫成一個段；互動只負責開關。
- 讓殘影一直看得到——那是這個風格最迷人的地方。
- 七段數字自己畫，斜 6°。
- 每頁換一個機型（單屏／雙屏／桌上型），版式跟著機型走。

**Don't**
- 不要讓任何東西在液晶裡平滑移動、縮放或旋轉。
- 不要發光（這是反射式液晶，不是 LED 也不是 CRT）。
- 不要用像素字、掃描線或 RGB 色差。
- 不要畫任何既有遊戲的角色、版面或機身標誌；角色與規則一律原創。
- 去AI化禁令照舊：無紫藍漸層、無置中三卡片、無 emoji icon、無 Lorem ipsum、無「EST. 19xx」徽章。

## 頁面骨架範例

```html
<body>
<div class="plate">
 <header class="band"><a class="brand" href="index.html"><img src="assets/logo.svg" alt=""><span><b>店名</b><i>ENGLISH NAME</i></span></a>
  <div class="model">WIDE SCREEN<em>XX-81 型號</em></div></header>
 <nav class="modes"><a href="index.html" aria-current="page"><span class="tri"></span><span class="k"></span><span class="z">首頁</span><span class="l">GAME</span></a>…</nav>
 <main>
  <div class="bezel"><span class="cap">LIQUID CRYSTAL</span>
   <svg class="lcd" viewBox="0 0 320 200">
    <g class="film">…平塗背景膜…</g>
    <use href="#segs" class="shade" transform="translate(1.3 1.7)" filter="url(#soft)"/>
    <g id="segs" fill-rule="evenodd"><path class="s" data-s="hero0" d="…"/>…</g>
   </svg></div>
  <button class="btn" aria-label="左">◀</button> <button class="btn">A</button>
  <div class="card"><span class="kick">HOW TO</span><h2>…</h2></div>
 </main>
</div>
<script>
 var segs={};document.querySelectorAll('[data-s]').forEach(e=>(segs[e.dataset.s]??=[]).push(e));
 function set(k,on){(segs[k]||[]).forEach(e=>e.classList.toggle('on',on));}
</script>
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況與查證 | fallback |
|---|---|---|---|---|
| SVG 段碼圖集：建置期輸出全部 `path[data-s]`＋`fill-rule:evenodd`＋`<use>` 位移重畫反射落影＋`feGaussianBlur` | A 渲染 | 特徵①②、signature；三頁四塊液晶全部是預印段 | SVG 1.1 `<use>`／`fill-rule`／`feGaussianBlur` 為各瀏覽器長期支援（MDN Baseline 早已 widely available）；`<use href>`（無 xlink）Chrome 50／Firefox 51／Safari 12.1 起 | 段在建置期就寫進 HTML，無 JS 時看到的是全部殘影＋說明卡文字；`<use>` 失效只少落影 |
| CSS `steps(n, jump-none)` 逐格＋rAF 固定拍長累加器（不插值） | B 動效時間軸 | 特徵①的液晶反應（上升 30ms、下降 2 階 140ms）、按鈕 `steps(1)`、遊戲每拍 520→360ms 加速、待機示範 | `steps()` 長期支援；`jump-*` 關鍵字為 2019–2020 年間各引擎陸續支援（MDN easing-function 相容表「jump」列，經 w3cub 鏡像查閱；Firefox 實作見 Bugzilla 1496619）——精確版本請以 MDN 現行表為準 | 不支援 `jump-none` 的舊瀏覽器整條 `transition` 宣告失效＝段直接切換，仍正確 |
| Gamepad API `navigator.getGamepads()` 輪詢＋邊緣偵測，附鍵盤與觸控替代 | D 輸入感測 | 〈煎台〉與菜單的實體手把操作：十字鍵／左搖桿換格、A 出手、START 開局；`gamepadconnected` 時下屏 `GAMEPAD` 段亮 | MDN：僅限 secure context（HTTPS；Firefox 81 起不安全環境回傳空陣列）；Chrome 21+、Firefox 29+、Safari 10.1+；可能被 Permissions Policy 擋而丟 `SecurityError`——已 try/catch。GitHub Pages 為 HTTPS | 無手把或 API 時鍵盤（←→／A／D／空白／Enter／1／2／T）與點擊格子完整可玩 |

效能實測（建置後）：index 107KB、menu 98.7KB、story 88.1KB（皆含 motion-library 子集 56KB），遠低於 350KB；首屏 JS 只做 `querySelectorAll('[data-s]')` 一次與 class 切換；各頁頁面腳本 jsdom 實測 index 11.0ms／menu 7.5ms／story 1.5ms（不含 core 與 ML 子集的解析，真機另需實測）；每拍只切 class、無版面重排；同畫面最多 1 個本站液晶迴圈＋2 個 ML 元件。壓電蜂鳴為 Web Audio 方波 2kHz、增益 .035，只在使用者手勢後建立，可關。

查證來源：MDN〈Navigator: getGamepads()〉、Mozilla Hacks〈Securing Gamepad API〉(2020)、MDN〈easing-function / steps()〉、Bugzilla 1496619；風格史：Wikipedia〈Game & Watch〉、Nintendo〈Iwata Asks: Game & Watch〉。
