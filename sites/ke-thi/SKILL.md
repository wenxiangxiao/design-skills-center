---
name: lowicz-wycinanki-layered-papercut
description: Polish Łowicz folk papercut (wycinanki łowickie) — black serrated base paper with progressively smaller glossy color layers glued on top, fold-symmetric facing roosters, gwiozda / kodra / tasiemka forms on a whitewashed wall.
---

# 羅維奇剪紙 Wycinanki łowickie

## 設計哲學

羅維奇（Łowicz，華沙西南、馬佐夫舍）一帶的農家自十九世紀後半起，在刷白的屋牆、天花板樑、窗間與門楣上貼剪紙。紙是市集買來的亮面色紙，工具是剪羊毛的大剪刀——握著刀片那一頭剪，靠鋼的彈性讓刀口準。羅維奇的特徵是**多色黏貼**：先剪一張黑（或深色）的底紙剪影，再把一層比一層小、一層換一色的彩紙往上貼；鄰近的 Kurpie 則是單色一張剪到底。三種形制：圓形 **gwiozda**（單一垂直對稱軸，常見兩隻公雞面對面＋中間的花）、橫長 **kodra**（貼在白卡紙上的長條場景，放在樑上）、垂掛 **tasiemka**（兩條帶子頂端一個彩環）。

它長成這樣的原因：小而暗的農舍裡要一眼看得見→飽和亮色＋黑底；紙要對摺才剪得對稱→單軸鏡像；羊剪一刀一刀推→邊緣細密鋸齒；過節前牆會重新刷白→白牆是畫布、剪紙是「每年重貼」的消耗品。網頁上照搬這個邏輯：**白牆是底，每個圖形都是黑底紙＋逐層內縮的亮色紙，一切對摺對稱，形制決定版面。**

## 本風格的 5 個不可省略特徵

### ① 逐層內縮黏貼（拿掉＝變成一般扁平插畫）

每個圖形＝第 0 層黑色底紙＋2–5 層彩紙；第 k 層是同一形狀往內縮 k×d（d≈畫框寬的 2.3%）並換一色，層與層之間永遠露出一圈等寬的下層邊。零漸層、零陰影、零透明。

```js
/* 原語第 k 層：橢圓 */
function ell(p,k){const rx=p.rx-k*d, ry=p.ry-k*d; if(rx<.4*d) return null; /* 取樣成多邊形 */}
/* 一個原語＝一串顏色：['K','R','Y'] → 黑底、紅、黃 */
{k:'ell',x:55,y:62,rx:21,ry:16,col:['K','O','R']}
```
```svg
<g class="ly" style="--l:0"><path fill="#17140F" d="…底紙（鋸齒）"/></g>
<g class="ly" style="--l:1"><path fill="#F07D19" d="…內縮一圈"/></g>
<g class="ly" style="--l:2"><path fill="#D62A2A" d="…再內縮一圈"/></g>
```

### ② 對摺即對稱（拿掉＝變成民俗風貼圖）

每個構圖一條垂直對稱軸。公雞、小鳥一定成對、面對面，中間一朵花或一棵樹（drzewko）。gwiozda 是**單軸**對稱，不是放射萬花筒。

```js
const L=place(kogut,{s:.42,x:9,y:46}), R=place(kogut,{s:.42,x:49,y:46,mx:100}); /* mx：x→100−x */
```
```css
.mirror{transform:scaleX(-1)} /* 價目列兩頭的蛋：右邊是左邊翻過來 */
```

### ③ 羊剪鋸齒 ząbki（拿掉＝變成剪紙風 Papercut 的平滑貼紙）

底紙外緣剪成細密鋸齒（取樣點奇數號往外推 0.74d）。大字、標籤、按鈕也是鋸齒邊的彩紙籤。

```css
.zab{clip-path:polygon(0% 0px,5.56% 5px,11.11% 0px, … ,calc(100% - 5px) 5.56%, …)} /* 深度用 px，與尺寸無關，用 JS 生成 */
```
```js
for(let i=0;i<n;i++){const a=i/n*TAU, m=i%2?1+.78*d/r:1; pts.push([cx+Math.cos(a)*r*m, cy+Math.sin(a)*r*m]);}
```

### ④ 刷白牆＋市集亮面紙七色（拿掉＝變成米白紙感或深色底）

大面積帶一點藍的石灰白；黑只給底紙與字；七個亮色每塊紙只一色，互相直接相撞。

```css
:root{--wall:#EDF0EE;--k:#17140F;--p:#FBFAF4;--r:#D62A2A;--o:#F07D19;--y:#F5C518;--g:#14935A;--b:#2456C8;--v:#6E3B9E;--m:#E2457A}
body{background:var(--wall)}
```

### ⑤ 三種形制即版面（拿掉＝只是幾張剪紙插圖）

圓 gwiozda＝主視覺／結果；橫長 kodra＝樑上的導覽與價目列（白卡紙長條）；垂掛 tasiemka＝兩條帶子＋頂端彩環，承載營業時間與註記，風吹會輕擺。

```html
<div class="tasiemki"><span class="ring"><svg>…玫瑰</svg></span><span class="band"><svg>…帶</svg></span><span class="band">…</span></div>
```
```css
.tasiemki .band{transform-origin:50% 0;animation:sway 6.4s ease-in-out infinite alternate}
@keyframes sway{from{transform:rotate(-2.4deg)}to{transform:rotate(2.4deg)}}
```

## 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| wapno 刷白牆 | `#EDF0EE` | 頁面地色（帶藍的石灰白） | ~45% |
| sadza 黑底紙 | `#17140F` | 每個圖形第 0 層、字、頁尾 | ~20% |
| papier 白卡紙 | `#FBFAF4` | kodra 卡紙、紙籤、gwiozda 中心 | ~15% |
| czerwień 紅 | `#D62A2A` | 紅蛋、價錢、現用態 | ~7% |
| zieleń 綠 | `#14935A` | 葉、課程區塊 | ~5% |
| żółć 黃 | `#F5C518` | 現用頁字、強調按鈕 | ~4% |
| pomarańcz 橘 | `#F07D19` | 公雞身體、層 | ~2% |
| kobalt 藍 | `#2456C8` | 尾羽、focus | ~1% |
| fiolet 紫 | `#6E3B9E` | 尾羽、標題籤 | ~0.5% |
| róż 桃 | `#E2457A` | 翅膀內層 | ≤0.5% |
| seledyn 草綠 | `#9CC93B` | 葉內層 | ≤0.5% |

規則：亮色只出現在黑底紙之上或紙籤上，不直接當大面積地色（例外：一個整塊的課程／CTA 區塊）。相鄰層必換色相。

## 字體系統

- 中文：Noto Sans TC 900（標題、紙籤字）／500（內文）——粗短黑體像剪出來的字。
- 拉丁：Bagel Fat One（店名副標、價錢）——肥圓頭、像剪刀剪的字；Rubik 700 全大寫寬字距（波蘭文小標 11px，letter-spacing .06–.1em）。
- Scale：店名紙籤 40–72px（每字一張方形紙籤，各轉 ±3°）／H2 24–40px／內文 16px 行高 1.75／小字 12–14px。
- 標題反白時放在鋸齒紙籤上，不加描邊、不加陰影。

## 版面與網格

- 首屏三欄：左（店名紙籤＋說明）1fr／中（gwiozda）1.25fr／右（tasiemki）150px。整頁不對稱，但**每個構圖內部嚴格對稱**。
- 紙籤旋轉 ±1.5–3°；圖形本身不旋轉（剪紙貼正）。
- 頂部「樑」＝白卡紙條，下緣鋸齒＋黑牙一排；頁尾＝黑紙，上緣鋸齒。
- 留白：區塊間 56–72px；kodra 左右留 16–64px。
- ≤560px：gwiozda 置頂、單欄、價目列只留左蛋與價錢。

## 元件配方

- **導覽（成對樑 para-beam）**：四個小剪紙站在樑上；現用頁的那一個旁邊多出它的鏡像（scaleX(-1)）成一對面對面；hover／focus 時鏡像從背後滑出 19px。
  ```css
  .para-nav .tw{transform:scaleX(-1);visibility:hidden}
  .para-nav a[aria-current] .tw{visibility:visible;transform:translateX(-20px) scaleX(-1)}
  .para-nav a[aria-current] .me{transform:translateX(20px)}
  ```
- **按鈕**：黑紙籤＋鋸齒 clip-path，hover 換成紅紙（90ms），次要按鈕黃紙黑字。
- **卡片**：白卡紙 `#FBFAF4` 平塗，零圓角零陰影，上方一個 84px 剪紙圖。
- **價目列（kodra 列）**：`56px auto 1fr auto 56px`——左蛋、品名、點線、價錢、右側鏡像蛋；每 3 列一列黃紙、每 5 列一列黑紙。
- **表單**：fieldset 白卡紙；步進器黑框 3px、黑底按鈕；單選以紙籤呈現，選中＝黑紙黃字。
- **頁尾**：黑紙三欄，上緣鋸齒。

## 動效規則

| 種類 | 本站實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| signature 黏貼 glue-down | 每個 `.ly` 圖層依層號依序從 `translate(0,-16px) rotate(±4deg) scale(1.07)` 拍下，72% 時壓扁 `scale(1.02,.96)` 再回正（WAAPI，fill:backwards） | 進視窗（IntersectionObserver 25%）、滿月頁按「剪」 | 300ms／`cubic-bezier(.5,0,.7,.4)`，每層間隔 90–140ms | 不播，全部層直接在位 |
| ambient | tasiemka 繞頂端輕擺 ±2.4°；BG-B-32、BG-B-30 背景帶 | 常駐 | 6.4s／7.3s ease-in-out alternate | 停擺；背景元件停在 `seek(.35)` |
| input 掀層 peek | hover／focus／觸控點一下，各層位移 `(l×1.1px, l×−1.5px)` 露出底下各層；對摺畫布即時鏡像 | pointer | 90ms linear | 位移保留但無過渡 |
| transition 刷白 | 換頁：三道牆色刷痕（右緣鋸齒）由左刷入，下一頁由左往右刷出 | 站內連結 | 380ms 入／440ms 出，`cubic-bezier(.6,0,.3,1)` | 直接換頁 |

自我限制：本風格零淡入（opacity 只用在黏貼第一影格、不作為主效果）、零模糊、零視差。

### motion-library 元件表

來源：`wenxiangxiao/motion-library` 1.5.0 @a07dac2，以 `tools/ml-embed.js` 抽子集 inline 為每頁第一個 `<script>`（約 53KB，`ml-smoke` 通過）；開發 Prompt 見 `MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| BG-B-32 | Pinwheels | index | colors `#D62A2A／#14935A／#EDF0EE`、duration 9、density 2.2、seed 1968、16:9 裁成 96px 帶 | 只用 `poly()` 平塗三角，正是羊剪剪出的三角牙 ząbki 在轉；零圓角零發光零透明（ambient） |
| TXT-B-16 | Circle Text | index | text「滿月紅蛋」、colors `#D62A2A／#F5C518／#EDF0EE`、duration 2.4、loop:false、1:1 | 字先排成 gwiozda 的圓再攤直；亮底→近黑字（transition，一次性） |
| TXT-A-06 | Stretch Pop | jajka | text「今日蛋價」、同色票、duration 1.4、intensity 1.2、loop:false | 字像剛拍上牆的紙被壓扁再彈正，呼應黏貼簽名（transition） |
| TXT-B-24 | Text Fan | miesiac | text「做滿月」、colors `#D62A2A／#14935A／#EDF0EE`、duration 1.6、loop:false | 字由扇形收攏成一列＝對摺紙打開（transition） |
| BG-B-30 | Confetti Fall | wycinanki | colors `#D62A2A／#14935A／#EDF0EE`、duration 8、density 1.4、seed 1925 | 剪下的碎紙 ścinki 落地；只用 fillRect 不透明平色（ambient） |

掛載：`KT.ml(el,opts)`——等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、回視窗重掛；一次性文字元件第二次直接 `seek(1)`；canvas `aria-hidden`，容器內 `.ml-fb` 原 HTML 標題在掛載成功後才視覺隱藏。同一畫面最多 2 個元件。

## 插畫與圖像風格

技法「逐層內縮剪紙 inset-layer cutout」：圖案＝原語清單（`leaf` 兩端尖葉、`ell` 橢圓／圓、`drop` 淚滴、`tri` 三角、`bar` 細條），在 0–100 盒內面向右畫。每個原語帶一串顏色，第 0 層黑且剪鋸齒；`from` 指定它從第幾層開始貼（翅膀、眼睛貼在身體上面）。母題：kogut 公雞（五根尾羽各一色）、ptak 小鳥、róża 玫瑰圈、tulipan 鬱金香、jajko 蛋、drzewko。路徑以相對座標 `l` 指令、一位小數輸出，以控制體積。

## Logo 與 Favicon 設計指南

- Logo：一張 gwiozda（黑鋸齒底＋紅綠黃三環＋白卡紙心）內一對面對面的公雞與一朵鬱金香。小尺寸（≤48px）改用 róża 玫瑰圈。
- Favicon：28 齒黑鋸齒圓＋紅、綠、黃三環＋黑心，inline SVG data URI。
- 不得加外框、陰影、漸層；不得把公雞做成單隻（一定成對或用玫瑰圈）。

## Do & Don't

**Do**：每個圖都有黑底紙；每層都比下層小一圈且換色；對摺對稱；鋸齒只在最外層；白牆為地；字放在紙籤上。
**Don't**：投影或 drop-shadow 做「立體紙雕」（那是 Papercut 風，不是羅維奇）；放射萬花筒對稱；漸層、半透明疊色、模糊；米白紙紋底；emoji 當 icon；紫藍漸層；置中三卡片；Lorem ipsum；EST. 徽章。

## 頁面骨架範例

```html
<header class="belka"><a class="brand" href="index.html"><svg>…róża</svg><span><b>店名</b><i>Jajka</i></span></a>
 <nav class="para-nav"><a href="index.html" aria-current="page"><span class="fig"><svg class="wy tw"><use href="#nf0"/></svg><svg class="wy me"><use href="#nf0"/></svg></span><b>牆</b><i>Ściana</i></a>…</nav></header>
<main id="main">
 <section class="hero">
  <div><div class="name"><span class="zab">雞</span><span class="zab">啼</span>…</div><p class="lede">…</p></div>
  <figure class="gw peek" tabindex="0"><svg class="wy" data-glue viewBox="0 0 100 100"><g class="ly" style="--l:0">…</g>…</svg></figure>
  <aside class="hours"><div class="tasiemki">…</div><div class="card zab"><b>05:30</b>開門</div></aside>
 </section>
 <figure class="kodra-wrap peek"><svg class="wy" data-glue viewBox="0 0 900 112">…</svg></figure>
</main>
<footer class="stopka">…</footer>
```

## 技術實作與相容性

### 1. Canvas 2D `globalCompositeOperation:'destination-out'` × `scale(-1,1)`（A 渲染層）
- 承載：〈對摺剪一刀〉——在摺著的半張紙上圍一圈，`destination-out` 把那塊從紙上挖掉並沿刀口挖一道 4px 縫；「打開」畫布以 `translate(W,0);scale(-1,1)` 把同一張紙畫成鏡像左半。特徵②③的互動證明。
- 支援：MDN〈CanvasRenderingContext2D.globalCompositeOperation〉Baseline Widely available（2015-07 起各瀏覽器）。
- Fallback：無 canvas／`getContext` 為 null 時整段停用，顯示 noscript 說明，其餘內容不受影響。
- 效能：每次 pointermove（位移 >3px）重畫 600×840 與 1200×840 兩張，約 1–2ms。

### 2. Web Animations API `Element.animate()`（B 動效與時間軸層）
- 承載：簽名「黏貼」——每一層 `<g class="ly">` 依 `--l` 延遲一個 3 影格關鍵影格、`fill:'backwards'`，結束後交回 CSS（hover 掀層的 transition 才能接手）；刷白轉場三道刷痕；畫布作品「貼到牆上」。
- 支援：MDN〈Element.animate()〉Baseline Widely available（2020-03 起）；caniuse：Chrome 36、Firefox 48、Safari 13.1、iOS 13.4。未使用 `composite` 選項（MDN 葡文頁仍標示未實作，故不依賴）；完成判斷用 `setTimeout`，不依賴 `Animation.finished`。
- Fallback：無 `animate` 或 reduced-motion 時不加 `.pre`，所有層一開始就在位；轉場改為直接換頁。

### 3. URL 狀態序列化 `URLSearchParams` × `history.replaceState`（E 資料與生成層）
- 承載：〈做滿月〉——`?z=20261010-6.6-12.4-20.2-1`（出生日-長輩戶數.入數-親戚-朋友-時段）；按「剪」寫入網址，打開該網址即還原同一張 gwiozda 與帳單（決定性：同參數同圖、訂單碼以 FNV-1a 雜湊）。
- 支援：URLSearchParams、History.replaceState 皆 Baseline Widely available。
- Fallback：解析失敗即用預設值（出生日＝今天 −9 天）；replaceState 例外時只是網址不變。

### 效能實測（建置時）
- 頁面大小：index 210KB／jajka 194KB／miesiac 123KB／wycinanki 196KB（含 ~53KB motion-library 子集；皆 ≤350KB）。
- 首屏 JS：剪紙皆建置期以 node 產生靜態 SVG，執行期只綁事件與 IO；滿月頁重新生成一張 gwiozda 約 9 層、<5ms。
- 動畫只動 transform／opacity，不觸發版面重排。

### 查證來源
- culture.pl〈Kurpie, Łowicz, Kashubian &… Architectural: A Brief Guide to Paper Cutouts〉（2023）：kodra／gwiozda／ribbon 三形制、羊剪握刀片剪、亮面紙、Gerson 收藏
- KU CREES〈Wycinanki〉；culture.pl〈Folk Art at Home: A DIY Guide to Polish Paper Cut-Outs〉
- MDN Element.animate()、caniuse mdn-api_element_animate；MDN globalCompositeOperation
