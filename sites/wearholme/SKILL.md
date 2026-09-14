---
name: victorian-jobbing-ornate
description: Victorian jobbing-printer ornate style — every line justified to the full measure by size, width axis and letterspacing; many faces on one page; cast ornament borders; colour permitted only inside tipped-in plates.
---

# 維多利亞繁飾 Victorian（1860–1900 英國萬用招貼與郵購目錄的活版語言）

> 這個流派沒有「標題」。它只有十三行都很重要的話，而每一行都必須正好填滿欄寬。
> 字級不是選出來的，是那一行有幾個字算出來的——字少的行就大，字多的行就小。
> 這一條規則，比任何一種花邊、任何一個字體都更決定這個流派長什麼樣子。

---

## 一、設計哲學

十九世紀後半的英國印刷廠有兩種活：**書版**（book work，安靜、規矩、一種字體排到底）與
**萬用招貼**（jobbing work，海報、招貼、票券、價目表、郵購目錄）。維多利亞繁飾講的是後者。

jobbing printer 的工作條件決定了這個流派的一切：

1. **他有一整面字架，上面是幾十種買來的鉛字**——Fat Face、Tuscan、Egyptian 板狀襯線、
   Clarendon、花飾體、陰影體。他不會只用一種，因為**那些字都是花錢買的，不用就是浪費**。
2. **他的欄寬是固定的**（版框一夾就定了），所以每一行都必須**剛好填滿**。
   填不滿就塞空鉛（quads、hair spaces），塞太多就換一號小一點的字，或換窄體。
   於是「這一行有幾個字」直接決定了「這一行多大」——**層級是算出來的，不是設計出來的**。
3. **他的花邊是鑄件**。border unit 一段一段接起來，所以花邊天生是**平鋪**的圖樣，
   不是自由畫的裝飾——這是它和新藝術（Art Nouveau）最根本的分別。
4. **活版一次只上一種墨**。所以正文頁是單色的。要顏色就得送去石印廠，另外印、另外裁、
   再一張一張裝訂進來——這就是 tipped-in plate（彩圖版）。
   **顏色在維多利亞印刷品裡不是設計語言，是一筆額外的錢。**

第 4 點是本流派最常被做錯的地方。多數人做「維多利亞風」會把朱紅與金赭撒滿整頁——
那是後來的 chromolithograph 海報，不是目錄與招貼。**要讓它像真的，就得先讓正文頁一點顏色都沒有。**

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，它就不是維多利亞繁飾了。

### 特徵 1｜每一行都撐滿欄寬，而字級由字數決定

這是本流派的本體。不是「置中的大標配小標」，是**十幾行各自獨立、各自撐滿、各自大小的話**。

排字工的槓桿有三段，順序不能顛倒：**先換一號字 → 再換寬體或窄體 → 最後塞空鉛**。

```css
/* 每一行都是一個獨立的盒子，不換行，靠 JS 算出來的三個值撐滿 */
.sl{
  display:block; white-space:nowrap; overflow:hidden;
  margin:0; padding:.10em 0; line-height:1.0;
  font-kerning:none;              /* 排字工沒有 kerning，鉛字是方的 */
  font-variant-ligatures:none;
}
/* 求解結果由 JS 寫成 inline style：
   .sl{ font-size:47.31px; font-variation-settings:"wght" 800,"wdth" 112.5;
        letter-spacing:.3140em; margin-right:-.3140em; }
   margin-right 是必須的——CSS 會在最後一個字後面也塞一份空鉛。        */

/* 填不滿的短行：置中，兩側以點線鉛條填空（quad） */
.sl.quad{
  text-align:center;
  background-image:repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 9px);
  background-size:100% 2px; background-position:center; background-repeat:no-repeat;
}
.sl.quad .qi{ background:var(--paper); padding:0 .7em; }
```

求解器（完整實作見 §十二）：

```js
var LS_MAX = .62, LS_MIN = -.045;
function compose(el, M){                      // M = 欄寬 px
  var text = el.dataset.t, n = Array.from(text).length;
  if (n < 2) return setLine(el, band[1], 100, 0, true);   // 一個字：置中，不硬撐
  var w100 = probe(text, cls, 100, 100);                  // 量一次即得線性係數
  var size = M / w100 * 100;
  if (size >= band[0] && size <= band[1]) return setLine(el, size, 100, 0);  // 一號字就命中
  size = Math.min(band[1], Math.max(band[0], size));
  for (var i=0;i<3;i++){                                  // 換寬體或窄體
    var cur = probe(text, cls, size, wdth);
    wdth = clamp(wdth * (M / cur), axisMin, axisMax);
  }
  var ls = (M - probe(text, cls, size, wdth)) / ((n-1) * size);   // 塞空鉛
  if (ls > LS_MAX){ size = Math.min(band[2], /* 放大一號 */); ... }
  setLine(el, size, wdth, ls);
}
```

**判準**：把視窗拉寬拉窄，整頁的層級必須跟著重排——最大的那一行可能換成另一行。
做不到這件事，你做的只是「多字體海報」，不是維多利亞。

### 特徵 2｜一頁裡至少四種字體，而且它們是按「用途」分工的，不是按「好看」

| 角色 | 字體性格 | 本範例站的選擇 |
|---|---|---|
| 撐滿的大行（Fat Face） | 高對比 didone，粗豎細橫 | `Playfair`（可變：`opsz` `wdth` `wght`） |
| 窄體／寬體的橫幅（Grotesque） | 全大寫、可極窄極寬 | `Anybody`（可變：`wdth` 50–150） |
| 正文（Old Style / Caslon） | 英國活版廠的本命 | `Libre Caslon Text` |
| 中文的重量行 | 高對比明體，900 | `Noto Serif TC` |

```css
.sl-pf{ font-family:"Playfair",Georgia,serif; font-weight:800;
        font-variation-settings:"wght" 800,"wdth" 100,"opsz" 220; }
.sl-ab{ font-family:"Anybody",sans-serif; font-weight:700; text-transform:uppercase;
        font-variation-settings:"wght" 700,"wdth" 100; }
.sl-cn{ font-family:"Noto Serif TC",serif; font-weight:900; }
```

**Don't**：四種字體亂配。規則是——**能被拉寬拉窄的字負責撐滿，不能被拉的字負責讀**。
中文沒有寬度軸，所以中文的行只能靠字級與空鉛，這件事會自然地讓中文行長得不一樣，那是對的。

### 特徵 3｜花邊是鑄件，所以它是平鋪的，不是畫的

維多利亞的花邊叫 **border unit**：字體鑄造廠論段賣的小鉛塊，一段一段接起來湊成一條。
所以它**一定是嚴格週期性的**，而且**尺寸不隨容器改變**——拉寬容器只會多接幾段，不會把單元拉長。

```html
<!-- 不給 viewBox：SVG 使用者單位＝CSS px，單元以鑄件原尺寸平鋪，永遠不會被拉扁 -->
<svg class="ornsvg" role="presentation" aria-hidden="true" style="color:var(--ink)">
  <defs>
    <pattern id="orn-acorn" width="26" height="15" patternUnits="userSpaceOnUse">
      <path d="M13 2.2c2.6 0 4.3 1.5 4.3 3.2c0 .8-.5 1.3-1.2 1.3H9.9c-.7 0-1.2-.5-1.2-1.3C8.7 3.7 10.4 2.2 13 2.2Z" fill="currentColor"/>
      <path d="M13 7.4c2.4 0 3.9 2.3 3.9 4.4S15.2 14 13 14s-3.9-.1-3.9-2.2S10.6 7.4 13 7.4Z" fill="currentColor"/>
      <path d="M4.4 8.6C1.6 8.6 .6 6 .6 6s2-2 4.4-1.1c2 .8 2.4 3.7 2.4 3.7S6.4 8.6 4.4 8.6Z" fill="currentColor"/>
      <path d="M21.6 8.6c2.8 0 3.8-2.6 3.8-2.6s-2-2-4.4-1.1c-2 .8-2.4 3.7-2.4 3.7S19.6 8.6 21.6 8.6Z" fill="currentColor"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#orn-acorn)"/>
</svg>
```
```css
.rule{ display:block; width:100%; height:var(--rh,15px); overflow:hidden }
.ornsvg{ width:100%; height:100% }
.rule-thin{ --rh:9px }  .rule-fat{ --rh:22px }
```

至少備三種單元（橡實與葉、繩紋、菱形點線），並**按層級分工**：
粗花邊（22px）只用在整頁的天頭地腳；細繩紋（9px）分節；菱形點線（7px）分行。

### 特徵 4｜顏色只准出現在「另紙裝訂」的地方

正文頁是活版，一次只上一種墨，所以**它只有黑與紙**。
顏色出現的地方必須同時滿足三件事：**另一張紙、另一次裁切、看得見的邊界**。

```css
.plate{
  background:var(--plate);            /* 更白更厚的圖版紙 */
  border:1px solid var(--paper-dd);
  margin:22px 28px;                   /* 四邊比正文頁窄——那是另外裁的 */
  padding:20px 22px 16px;
  box-shadow:3px 3px 0 0 var(--paper-dd);   /* 硬邊，不是模糊陰影：那是紙的厚度 */
}
```

**硬規則**：`.plate` 以外的任何一個 CSS 顏色值，只准是 `--paper` 系或 `--ink` 系。
連結不用藍色，用**黑底反白**；現用狀態不用彩色，用**加粗與切口**。
（訂購單這種「另紙印的表格葉」也算 plate 範疇，可用朱紅＋黑二色印。）

### 特徵 5｜套印位移留著不修

石印彩圖版是四塊石逐次上機的，套不準是常態。真的維多利亞彩圖版放大看，
色塊與黑版壓線永遠差個零點幾公釐。**把它修掉，整張圖就變成了現代印刷。**

```css
@keyframes reg{
  0%{transform:translate(0,0)}      25%{transform:translate(.55px,-.35px)}
  50%{transform:translate(-.3px,.5px)} 75%{transform:translate(.35px,.4px)} 100%{transform:translate(0,0)}
}
.plate .st-red  { animation:reg 13s linear infinite }
.plate .st-green{ animation:reg 17s linear infinite reverse }
.plate .st-blue { animation:reg 19s linear infinite }
.plate .st-gold { animation:reg 23s linear infinite reverse }
```
四塊石的週期互質（13/17/19/23 秒），所以它們永遠不會同時回到原位——這就是「上紙的伸縮」。
`prefers-reduced-motion` 時把動畫關掉，但**位移要留著**（設成固定偏移），否則資訊（「這是套印的」）就沒了。

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 目錄紙（未漂白） | `#E9DFC8` | 正文頁唯一底色，永遠帶硬邊紙纖維紋 | 32% |
| 紙的暗處／書口 | `#DED2B6` / `#CFC0A0` | 切口、郵路軌道底、表列 hover | 14% |
| 墨 | `#1A1613` | 正文、規線、花邊、全部圖版 | 26% |
| 淡墨 | `#4C433A` / `#7A6F61` | 次要資訊、圖說 | 8% |
| **圖版紙** | `#F4EFE2` | **只在 `.plate` 內**：更白更厚的另一種紙 | 8% |
| 石一　朱紅 | `#B02318` | **只在 `.plate` 內** | 5% |
| 石二　瓶綠 | `#1D4635` | **只在 `.plate` 內** | 3% |
| 石三　石青 | `#2A4A6E` | **只在 `.plate` 內** | 2% |
| 石四　金赭 | `#A8802C` | **只在 `.plate` 內** | 2% |

**零純白（`#FFF`）、零純黑（`#000`）、零漸層、零圓角、零模糊陰影。**
陰影一律是硬邊的實色方塊（紙的厚度），不是 `blur`。

紙纖維（不是雜訊圖，是硬邊細紋）：
```css
body{
  background:#E9DFC8;
  background-image:
    repeating-linear-gradient(93deg,rgba(26,22,19,.030) 0 1px,transparent 1px 5px),
    repeating-linear-gradient( 2deg,rgba(26,22,19,.022) 0 1px,transparent 1px 7px);
}
```

---

## 四、字體系統

```html
<link href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,400..800&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Noto+Serif+TC:wght@400;700;900&family=Playfair:opsz,wdth,wght@5..1200,87.5..112.5,400..900&display=swap" rel="stylesheet">
```

軸的實際範圍（已查證，見 §十二）：
`Playfair` — `opsz 5–1200`、`wdth 87.5–112.5`、`wght 300–900`；
`Anybody` — `wdth 50–150`、`wght 100–900`。

**字級不是 scale，是「帶」。** 每一行只被指定一個 rank，rank 給出 `[下限, 上限, 破格上限]`，
實際字級由求解器算：

```js
const BANDS = { 1:[44,92,138], 2:[26,52,76], 3:[19,34,48], 4:[14,22,30], 5:[12,17,22] };
```

正文 16px / 行高 1.62 / Libre Caslon Text。
小型大寫的標籤一律 `Anybody` 600–700、`letter-spacing:.2em`、`text-transform:uppercase`、11–13px。

---

## 五、版面與網格

- **單欄，欄寬固定**：`--measure: min(860px, calc(100vw - 214px))`。維多利亞的版框是夾死的。
- **沒有卡片、沒有格線系統。** 分節靠**規線**（`border-top:3px double`）與**花邊鉛條**。
- **天頭**：刊頭（房號印記＋行名＋期號）→ 3px double rule → 郵路花邊條。
- **地腳**：3px double rule → 繩紋花邊 → 營業資訊 → 帖標（`A · B · C · D`）。
- **表列**：`border-collapse:collapse`，只有橫線，沒有直線；價目欄右切齊並改用 Playfair。
- **RWD**：≤900px 切口索引由右緣豎排改成頂部橫排四格；≤820px 欄寬改為 `100vw - 40px`；
  彩圖版的四欄格改兩欄。字級因為是算出來的，會自己跟著縮，不需要 media query。

---

## 六、元件配方

**規線**（分節，兩種，不得混用）
```css
hr{ border:0; border-top:1px solid var(--ink); margin:18px 0 }
header.mast{ border-bottom:3px double var(--ink) }   /* double rule 是維多利亞的骨架 */
```

**連結**（正文頁不准有彩色連結）
```css
a{ color:inherit; text-decoration:none; border-bottom:1px solid var(--ink); padding-bottom:.5px }
a:hover{ background:var(--ink); color:var(--paper) }
```

**表列與引線**（leader dots 是點線鉛條，hover 才接上）
```css
.cat td{ padding:6px 8px 6px 0; border-bottom:1px solid var(--paper-dd) }
.cat .ld{ position:relative }
.cat .ld i{ position:absolute; left:0; right:0; bottom:.34em; height:2px; opacity:0;
  background:repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 7px);
  transition:opacity .09s linear }
.cat tr:hover .ld i{ opacity:1 }
```

**切口拇指索引**（現用頁的語意是「書被翻開在這裡」，不是「被標示」）
```css
.thumb a{ writing-mode:vertical-rl; text-orientation:upright; background:var(--paper-d);
  border:1px solid var(--ink); border-right:0; padding:14px 5px 14px 7px }
.thumb a::after{ content:""; position:absolute; left:0; top:0; bottom:0; width:5px;   /* 閉合的切口 */
  background:repeating-linear-gradient(180deg,var(--paper-dd) 0 1px,var(--paper-d) 1px 3px) }
.thumb li.on a::after{ width:11px;                                                     /* 開的切口 */
  background:linear-gradient(90deg,var(--ink) 0 1px,var(--plate) 1px 5px,var(--ink) 5px 6px,var(--paper-dd) 6px 11px) }
```

**按鈕**（只在 plate 範疇內；正文頁不放按鈕）
```css
.btn{ font-family:"Anybody",sans-serif; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  background:var(--st-red); color:var(--plate); border:1px solid var(--st-red); padding:9px 20px; cursor:pointer }
.btn:hover{ background:var(--plate); color:var(--st-red) }   /* 反轉，不是變淡 */
```

**首字放大**（drop cap，維多利亞正文的開頭）
```css
.drop::first-letter{ font-family:"Playfair",Georgia,serif; font-weight:900;
  font-size:3.05em; line-height:.82; float:left; padding:.06em .10em 0 0;
  font-variation-settings:"wght" 900,"opsz" 800 }
```

---

## 七、動效規則（四種，缺一不可）

| 種類 | 本站是什麼 | 觸發 | duration / easing |
|---|---|---|---|
| **ambient 環境** | 彩圖版四塊石的套印位移（13/17/19/23s 互質週期）＋刊頭郵戳日期輪走真實本地時刻 | 無（時間驅動） | 13–23s `linear` 無限；郵戳每 20s 對時 |
| **input-driven 輸入** | 拉動視窗寬度時十三行即時重解字級／字寬／空鉛；表列 hover 接上引線點 | resize（去抖 90ms）／hover | 引線 `.09s linear`；重解 <100ms |
| **transition 轉場** | 換頁時新頁從書口側（右）以硬邊直線推過來覆蓋舊頁 | 頁面載入 | `.42s cubic-bezier(.32,.02,.2,1)` |
| **signature 簽名** | **郵路**（見 §八） | 送出訂購單 | 45s，`steps(24, end)` |

```css
@keyframes leafwipe{ from{clip-path:inset(0 0 0 100%)} to{clip-path:inset(0 0 0 0)} }
.wipe{ animation:leafwipe .42s cubic-bezier(.32,.02,.2,1) both }
```

**`prefers-reduced-motion` 降級（四種全部要有，且資訊零損失）**
- 套印位移 → 改成固定偏移（仍看得出是四塊石套印的）
- 重解 → 照常（那不是裝飾，是版面本體）
- 換頁推移 → 直接顯示
- 郵路 → 不動畫，改以文字「郵路　9／24 格」表示；回函一樣會在同一個時刻抵達

```css
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:.001ms !important; animation-iteration-count:1 !important;
    transition-duration:.001ms !important }
  .plate .st-red{ transform:translate(.6px,-.4px) }  /* 位移留著 */
}
```

---

## 八、簽名動效：郵路（the post road）

**這個流派的網站不應該有「送出後立刻看到結果」這件事。** 一八八七年沒有這種東西。

送出的單子會摺成三摺、蓋戳、滑出視窗上緣；接著**刊頭底下那條花邊條變成郵路**——
花邊有幾個單元，郵路就有幾格，郵車一格一格走過去。走到底，回函落進首頁的信盤。

```js
var UNITS = 24, DUR = 45000;
var anim = coach.animate(
  [{transform:'translateX(0px)'}, {transform:'translateX(' + span + 'px)'}],
  { duration: DUR, easing: 'steps(' + UNITS + ', end)', fill: 'both' });
anim.currentTime = Date.now() - sentAt;     // 跨頁對齊真實 epoch，不是重播
anim.onfinish = deliver;
```

三個關鍵，照抄即可：
1. **格數＝花邊單元數。** 進度條不是另外畫的元件，它就是版面上本來就有的那條花邊。
2. **`currentTime` 對齊 epoch。** 使用者換頁、重新整理、關掉再開，郵車都在它該在的位置——
   因為時間是真的在走，不是動畫在播。
3. **要有一條「不等」的路。** 「親往局裡自取」把 `anim.currentTime = DUR`，
   `onfinish` 自然會觸發——**seek 到終點，不是取消重播**。

```js
function fetchNow(){ anim.currentTime = DUR; }
```

---

## 九、插畫與圖像風格：雙印法圖版

全站圖像分兩種，**不得混用，也不得出現第三種**。

### (a) 正文頁的圖＝活字廠圖版：只准黑墨的實心塊面與等寬的平行刻線

濃淡靠**刻線的疏密**做出來，不靠網點（一八八七年的活版機印不出網點）。
判準：**放大看，每一條刻線一樣粗，只有間距不同。**

```js
/* 等寬平行刻線：在 clip 之內以固定角度、固定線寬、可變間距排一組線。
   線的末端有長短不齊（刻刀起落），但線寬永遠一樣。                      */
function tint(clipId, x0, y0, x1, y1, angDeg, gap, w, seed){
  const rd = rng(seed), a = angDeg * Math.PI/180;
  const dx = Math.cos(a), dy = Math.sin(a), px = -dy, py = dx;
  const cx = (x0+x1)/2, cy = (y0+y1)/2, span = Math.hypot(x1-x0, y1-y0);
  const d = [];
  for (let t = -span; t <= span; t += gap){
    const mx = cx + px*t, my = cy + py*t;
    const h1 = span*(.52 + rd()*.12), h2 = span*(.52 + rd()*.12);
    d.push(`M${mx-dx*h1} ${my-dy*h1}L${mx+dx*h2} ${my+dy*h2}`);
  }
  return `<g clip-path="url(#${clipId})"><path d="${d.join('')}"
            stroke="currentColor" stroke-width="${w}" fill="none"/></g>`;
}
```
`gap` 決定調子：**2.0 深、2.5 中、3.2 淺**。同一塊圖裡至少要有兩個不同的刻線角度
（本站：身 62°、翼 14°、鬚 78°），否則會看起來像斜線底紋而不是版畫。

**同一塊圖版在站上出現幾次都是同一塊**——包括它的缺角。缺角用紙色蓋掉即可：
```js
`<path d="M170 17l6 0l0 5z" fill="var(--paper)"/>`   /* 一八七九年被壓壞的那一角 */
```

### (b) 彩圖版的圖＝色石版：四塊石的硬邊平色域，零刻線零網點

**兩者共用同一份幾何。** 同一個物件在目錄裡出現兩次，是同一個，用兩種印法印的——
這是本流派最有說服力的一招，而且它把特徵 4 變成看得見的事。

```html
<g class="st-gold" fill="var(--st-gold)"><path d="…身…"/></g>
<g class="st-red"  fill="var(--st-red)" ><path d="…翼…"/></g>
<g fill="none" stroke="var(--ink)" stroke-width="1.5"><path d="…黑版壓線…"/></g>
```

**明文禁用**：照片、半調網點、細線幾何線描（hairline outline）、`feTurbulence` 假質感濾鏡、
扁平化單色圖示、任何 emoji。

---

## 十、Logo 與 Favicon

Logo 是**房號印記**（house mark）：維多利亞商號刻在信箋與貨箱上的那一塊小圖版。做法：
1. 一個幾何外框（菱形／盾形／橢圓），**雙線**——外框 4px、內框 1.6px。
2. 框內一個與本行業有關的實物，用刻線做調子（不是描外形）。
3. 框內一組首字母，Georgia/Playfair 700，`letter-spacing:2`。
4. 底部三到四條等距的水平刻線，被外框 clip 掉——那是「被壓在紙上的底紋」。

```svg
<svg viewBox="0 0 120 120">
  <defs><clipPath id="lz"><path d="M60 6 114 60 60 114 6 60Z"/></clipPath></defs>
  <path d="M60 6 114 60 60 114 6 60Z" fill="none" stroke="#1A1613" stroke-width="4"/>
  <path d="M60 15 105 60 60 105 15 60Z" fill="none" stroke="#1A1613" stroke-width="1.6"/>
  <g clip-path="url(#lz)" stroke="#1A1613" stroke-width=".9" fill="none">
    <path d="M-10 96h140M-10 102h140M-10 108h140M-10 114h140"/></g>
  <!-- …實物…並以 tint() 上刻線… -->
  <text x="60" y="34" text-anchor="middle" font-family="Georgia,serif"
        font-weight="700" font-size="15" fill="#1A1613" letter-spacing="2">W&amp;S</text>
</svg>
```

Favicon：同一個菱形＋實物剪影，32×32，inline SVG data URI，底色 `#E9DFC8`。
**不要縮小 logo 當 favicon**——刻線在 32px 會糊成一團灰。favicon 只留框與實心剪影。

---

## 十一、Do & Don't

**Do**
- 先把正文頁做成**純黑白**，做完了再決定哪一塊值得另外印成彩圖版。
- 每一行都問「這一行有幾個字」，讓字數決定字級。
- 花邊用平鋪單元，並且讓它在不同寬度下**多接幾段**，不要拉長。
- 價目、重量、編號一律 `font-variant-numeric: lining-nums tabular-nums`，並右切齊。
- 文案寫成一八八〇年代商號的口氣：條列章程、具體數字、不推銷、偶有歉意。

**Don't**
- ✗ 不要在正文頁用任何彩色（連結、現用狀態、警語都不行）。
- ✗ 不要用 `text-align:center` 當層級手段——**撐滿才是層級**，置中只留給填不滿的短行。
- ✗ 不要用圓角、模糊陰影、漸層，一個都不行。
- ✗ 不要用網點或照片做調子；只准刻線與實心塊面。
- ✗ 不要把套印修準。
- ✗ 不要用「EST. 18xx」年份徽章（那是二十一世紀的仿古）；創業年份寫進正文的句子裡就好。
- ✗ 不要用 Lorem ipsum、emoji icon、紫藍漸層、置中三卡片。
- ✗ 不要只放一種字體然後加很多花邊——那是「復古」，不是維多利亞。

---

## 十二、頁面骨架範例

```html
<!doctype html>
<html lang="zh-Hant" class="js-off">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,%3Csvg …%3E">
<link href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,400..800&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Playfair:opsz,wdth,wght@5..1200,87.5..112.5,400..900&display=swap" rel="stylesheet">
<style>/* §三 §四 §五 §六 */</style>
</head>
<body>

<header class="mast"><div class="leaf"><div class="mastbar">
  <div class="lg"><!-- 房號印記 --></div>
  <div class="tx"><div class="l1">SHOP &amp; SON</div><div class="l2">業別・期號</div></div>
  <div class="fol"><span class="pmark" data-pmark></span><br>帖甲　A　頁 1</div>
</div></div>
<div class="postrack" id="postrack" hidden><!-- 花邊軌道＋郵車 --></div>
</header>

<nav class="thumb" aria-label="帖次索引"><ul>
  <li class="on"><a href="index.html" aria-current="page">帖甲　扉頁</a></li>
  <li><a href="two.html">帖乙　貨品</a></li>
</ul></nav>

<main class="leaf">
  <!-- 扉頁：每一行都是一句完整的營業資訊，由排字工程式撐滿 -->
  <section class="measure" data-compose>
    <span class="rule rule-fat"><!-- 橡實花邊 --></span>
    <p class="sl sl-pf" data-band="44 92 138" data-t="SHOP &amp; SON">SHOP &amp; SON</p>
    <span class="rule"  style="--rh:7px"><!-- 菱形點線 --></span>
    <p class="sl sl-cn" data-band="26 52 76"  data-t="行名與業別">行名與業別</p>
    <!-- …十三行… -->
    <span class="rule rule-fat"><!-- 橡實花邊 --></span>
  </section>

  <noscript><p class="noscript">十三行的字級與空鉛是現算的；沒有 JavaScript 會退回一般換行排版，字一個不少。</p></noscript>

  <!-- 彩圖版：另紙、另裁、四邊窄 -->
  <section class="measure"><div class="plate">
    <div class="ptit">彩圖版第三號</div>
    <!-- 四塊石＋黑版壓線 -->
    <div class="pcap">四色石印　本版另紙裝訂</div>
  </div></section>
</main>

<footer class="colophon"><div class="leaf">
  <span class="rule rule-thin"><!-- 繩紋 --></span>
  <p><b>行名</b>　地址　電報掛號</p>
  <p class="sig">A · B · C · D　　FOUR GATHERINGS</p>
</div></footer>

<script>/* 排字工＋郵班 */</script>
</body></html>
```

---

## 十三、技術實作與相容性

本站三項核心技術，各在一層，皆為本館最近六站未曾使用。

### 1. `font-variation-settings` 可變字型軸動態（C 版面與樣式層）

**承載**：特徵 1 的第二段槓桿。字級撞到帶的上下限之後，排字工換的是**寬體或窄體的鉛字**——
在可變字型裡就是 `wdth` 軸。沒有這一軸，短行只能靠空鉛，長行只能縮小，層級會失控。

**支援現況（查證：MDN《font-variation-settings》／caniuse `variable-fonts`）**：
CSS 屬性 `font-variation-settings` 為 **Baseline widely available**，自 2018-09 起各大瀏覽器可用。
需注意兩件事：(a) `@font-face` 裡的**同名描述子**（descriptor）**不是 Baseline**，本站不使用它；
(b) macOS 10.13 以前的系統不支援可變字型。

**軸的實際範圍（查證：Fontsource 的 Playfair／Anybody 條目）**：
`Playfair` `ital 0–1`、`opsz 5–1200`、`wdth 87.5–112.5`、`wght 300–900`；
`Anybody` `ital 0–1`、`wdth 50–150`、`wght 100–900`。
**求解器必須把 `wdth` 夾在這個範圍內**——Google Fonts 的 `css2` API 對超出範圍的區間直接回 400，
整支字型會載不到。`Playfair` 只有 ±12.5% 的寬度餘裕，這正是為什麼一定要有第三段槓桿（空鉛）。

**Fallback**：不支援可變字型（或字型未載入）時，`font-variation-settings` 被忽略，
求解器仍以字級與 `letter-spacing` 兩段槓桿求解，只是層級對比較平；
`document.fonts.ready` 之後會再解一次。中文字型本來就沒有寬度軸，走的就是這條路。

### 2. SVG `<pattern>` 平鋪（A 渲染層）

**承載**：特徵 3 的花邊鉛條、以及簽名動效的郵路軌道（郵車走的格數＝花邊單元數）。

**支援現況**：SVG 1.1 的 `<pattern>` 與 `patternUnits="userSpaceOnUse"` 是自 IE9 以來的通用能力，
無支援疑慮。**真正的實作要點是不要給 `viewBox`**：一旦給了 `viewBox` 再配
`preserveAspectRatio="none"`，SVG 會把整個座標系拉伸去填滿容器，花邊單元就被拉扁了——
那就不是鑄件了。不給 `viewBox` 時，SVG 使用者單位等於 CSS px，單元以原尺寸平鋪，
容器變寬只會多接幾段。

**Fallback**：不需要。`<rect fill="url(#…)">` 若因故失敗，`.rule` 是一條 9–22px 的空條，
版面不塌，只是少一道裝飾。

### 3. Web Animations API：`currentTime` 與 timeline 控制（B 動效與時間軸層）

**承載**：簽名動效「郵路」。這件事**不能用 CSS animation 做**——CSS 動畫每次載入頁面都從頭播，
而郵車必須在使用者換頁、重新整理、關掉再開之後，仍然在它「該在」的那一格。

**支援現況（查證：MDN《Web Animations API》《DocumentTimeline》《Animation: currentTime》）**：
`Element.animate()` 與 `Animation.currentTime` 屬於 Web Animations API 的核心；
`DocumentTimeline` 標示 **Baseline widely available**，自 2020-07 起各大瀏覽器可用。
MDN 另註明 `animationTimeline.currentTime` 的精度可能因瀏覽器的防指紋設定而被降低——
本站不依賴毫秒級精度（一格 1.875 秒），無影響。
本站**不使用** `Animation.persist()`（非 Baseline）。

**Fallback**：`if (coach.animate && !prefersReducedMotion)` 為假時（舊瀏覽器或使用者偏好減少動態），
改以 `transform` 直接寫到當前格位、並以 `setTimeout(remaining)` 在同一個時刻送達回函，
另以文字顯示「郵路　9／24 格」。**時間與結果完全相同，只是不動。**

### 效能預算（實測）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | 帖乙 84.5 KB（最大），其餘 46–52 KB | ≤350 KB |
| 首屏 JS：十三行求解 | 每行 1 次量測命中者 ≈0.02ms；撞限走三段槓桿者最多 6 次量測。13 行合計 **<30ms**（未撞限的行佔多數） | ≤100ms |
| 主要動畫 | 郵車 `steps(24)`＋四塊石 `transform`，皆為合成層屬性，**60fps** | 60fps |
| Layout thrashing | 求解的量測集中在單一 `position:fixed` 的探針元素上，且每一輪先寫後讀；逐幀動畫只寫 `transform`，不讀幾何 | 無 |

### 本站的其他相依（非核心，僅供參考）

- `localStorage`：保存郵班與信盤（跨頁、跨造訪）。存取一律包 `try/catch`，
  隱私模式或配額滿時退化為「本次造訪內有效」，功能不中斷。
- `Intl` / `Date`：郵戳的日期輪走使用者的真實本地時刻。
- `getBoundingClientRect()`：求解器的量測手段。**不可用 `canvas.measureText`**——
  canvas 的 `font` 簡寫不吃 `font-variation-settings`，量到的會是預設軸位置的寬度。
