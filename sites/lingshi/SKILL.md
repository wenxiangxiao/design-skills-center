---
name: suprematist-void
description: Suprematism — solid geometric planes floating in a pure white horizonless void, tilted on an eighth-circle angle dictionary, with extreme scale disparity and colour used as identity rather than decoration.
---

# 至上主義・無地平線白場 Suprematist Void

> 一九一三年十二月，聖彼得堡 Luna Park。歌劇《戰勝太陽》（Победа над Солнцем）第二幕，一群「未來人」把太陽抓下來。那天掛在後方的幕，是一個被對角線切成黑白兩半的方形——那是卡濟米爾・馬列維奇（Kazimir Malevich）畫的第一個黑方。兩年後（1915 年 12 月 19 日，彼得格勒 Dobychina 畫廊，「0,10 最後的未來主義畫展」），他把那個方形單獨拿出來，掛在房間的牆角——俄羅斯人家裡供聖像的位置——並同時發表《從立體主義到至上主義：新的繪畫現實主義》。至上主義從一面舞台幕開始。

## 一、設計哲學

至上主義不是「幾何風」。包浩斯、瑞士國際主義、風格派也都用幾何，但它們用的是**正交的秩序**——欄、格、水平與垂直。至上主義的三個前提剛好相反：

1. **沒有地平線。** 畫面不是一個「上面有天、下面有地」的空間。沒有基線、沒有邊框、沒有頁邊界、沒有陰影。形體不站在任何東西上，它們漂著。這是這個流派最容易被做丟的一條——一旦你替它加一條分隔線、一個卡片邊框、一層陰影，它立刻掉回瑞士。
2. **形體之間的關係就是內容。** 沒有主題、沒有象徵、沒有插圖。畫面上唯一可讀的資訊是：哪一塊大、哪一塊小、它們往哪個方向去、它們離得多遠。
3. **動勢由斜置產生。** 正交是靜止，斜置是運動。所以在這個系統裡，**「正交」是一個有語意的例外狀態**（靜止、抵達、你現在所在的位置），不是預設。

做網頁時的翻譯：留白不是呼吸，留白是空間本身；標題不是招牌，標題是眾多形體中比較大的那一塊；導覽的現用態不需要高亮色，讓它是唯一沒有傾斜的那一個就夠了。

**做這個風格前先問自己一句：我這個畫面，如果把所有文字遮掉，看得出「有一塊東西正在往右上方走」嗎？**看不出來就還沒開始。

## 二、色彩系統

| 用途 | 色票 | 面積比例 | 規則 |
|---|---|---|---|
| 空場 void | `#FFFFFF` | 約 62% | 必須是純白。不是米白、不是紙白、不鋪紋理、不加暈影、不加雜訊。它不是紙，它是空間。 |
| 墨 ink | `#131313` | 約 18% | 所有主要形體、正文、分隔用實線。不是純黑 `#000`（那屬於 flat-black 螢幕原生語彙），是帶一點重量的墨。 |
| 至上紅 red | `#D9241C` | 約 11% | 動作、現用、終幕、被選中的事。紅是「發生了什麼」的顏色。 |
| 群青 ultramarine | `#1633A8` | ≤ 5% | 第二塊專色，只給一種語意（本站給 hover 與 focus）。 |
| 綠 green | `#17823F` | ≤ 3% | 第三塊專色，只給一種語意（本站給「長度超過門檻」）。 |
| 鉻黃 sun | `#F5C400` | ≤ 1.5% | **全站唯一的黃色，也是全站唯一的圓形。**它是太陽。 |

深色反轉（本站用於真實演出時段）：`--field:#131313`、文字 `#FFFFFF`，三塊專色同步提亮為 `#F04A3A` / `#5C79E8` / `#39B36B`（純黑底上原色的對比不足）。

```css
:root{
  --void:#FFFFFF; --ink:#131313; --red:#D9241C;
  --ultra:#1633A8; --grn:#17823F; --sun:#F5C400;
}
/* 這一段是本風格的地基，缺了它就不是至上主義 */
*{margin:0;padding:0;box-sizing:border-box;border-radius:0}
body{background:var(--void);color:var(--ink)}
*{box-shadow:none}          /* 零陰影 */
.plane{background:var(--ink)}/* 形體一律實心平塗，不描邊、不漸層、不半透明 */
```

**硬規則**：
- 顏色不做漸層、不做 `opacity` 半透明、不做 hover 變亮。要變就整塊換色。
- 一個顏色在全站只承擔一種語意。紅是動作就永遠是動作，不可以有時候當裝飾。
- 兩塊色域重疊時是**硬邊覆蓋**（後畫的蓋掉先畫的），不是 `mix-blend-mode`、不是半透明混色。

## 三、字體系統

| 角色 | 字體 | 字重 | 設定 |
|---|---|---|---|
| 拉丁標題／數字 | Archivo | 900 | `letter-spacing:.02em`，全大寫；數字一律 `font-variant-numeric:tabular-nums` |
| 中文標題 | Noto Sans TC | 900 | `line-height:.94; letter-spacing:-.01em` |
| 內文 | Noto Sans TC | 400 | 16px / `line-height:1.75` |
| 標籤・小註 | Archivo + Noto Sans TC | 700 | 11–13px，`letter-spacing:.14em ~ .3em` |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
```

字級 scale（clamp，不設中間斷點）：
```css
:root{
  --t1:clamp(30px,5vw,62px);   /* 區段標題 */
  --t2:clamp(19px,2.4vw,28px); /* 次標 */
  --t3:16px;                    /* 內文 */
  --t4:13px;                    /* 表格・標籤 */
  --t5:11px;                    /* 極小註記 */
}
```

**明文禁用等寬字（monospace）。** 至上主義沒有「終端機」或「工程圖」的語彙；數字用 Archivo 的 tabular 數字對齊即可。用了 mono，畫面會立刻滑向工程製圖／檔案卷宗那一族。

## 四、版面與網格

**沒有網格。** 這不是修辭：本風格明文禁止可見的欄線、分隔線、卡片邊框、外框與頁邊界線。版面由三件事決定：

1. **角度字典**（見特徵 3）：`0°, ±11.25°, ±22.5°, ±33.75°, ±45°, ±56.25°, ±67.5°`。任何旋轉值只能從這裡取，不得出現 `-7deg`、`-3deg` 這種「隨手轉一點」。唯一例外是互動微量回饋（hover 時 `+5deg` 的推移）。
2. **尺度懸殊**：每一個構成有一個支配形體與一群衛星形體，面積比 ≥ 8:1。
3. **留白 ≥ 55%**：先量，再加東西。滿版（horror vacui）是別的流派的事。

首屏的配置方式（本站 `curtain-first` 開場）：一個 `position:relative` 的 `aspect-ratio` 盒，裡面鋪一張 `preserveAspectRatio` 的 inline SVG 承載形體，文字用百分比座標絕對定位疊在上面：

```css
.hero{position:relative;width:100%;aspect-ratio:1240/720}
.hero>svg{position:absolute;inset:0;width:100%;height:100%}
.p{position:absolute;left:var(--x);top:var(--y);width:var(--w,auto);
   transform:translate(0,-50%) rotate(var(--r,0deg))}
```
```html
<div class="p" style="--x:9%;--y:19%;--r:-11.25deg;--w:330px">零十劇場</div>
```

≤900px 時**不要**硬把絕對定位塞進手機——改出一份純流排版的小尺寸版（`display:none` 切換），形體收成一張小構成 SVG，文字回到正常流並把旋轉降到 ±4°～±8°。斜置在窄螢幕上會吃掉可讀性，這是這個風格唯一需要讓步的地方。

## 五、元件配方

### 導覽（orthogonal-rest 正交靜止）
現用態**不加色、不反白、不加底線**——它是四格裡唯一沒有傾斜的那一格。這直接執行了特徵 3。

```css
.nav a{width:56px;text-align:center}
.nav i{display:block;width:26px;height:26px;margin:0 auto 7px;background:var(--ink);
  transform:rotate(var(--tilt));transition:transform .22s cubic-bezier(.2,.8,.3,1)}
.nav em{display:block;font-style:normal;font-size:11px;font-weight:700;
  transform:rotate(var(--tilt))}
.nav a:hover i{transform:rotate(calc(var(--tilt) + 5deg))}
.nav a[aria-current=page] i,.nav a[aria-current=page] em{--tilt:0deg}
```
```html
<a href="a.html" style="--tilt:-19deg"><i></i><em>劇目</em></a>
<a href="b.html" aria-current="page" style="--tilt:0deg"><i></i><em>選位</em></a>
```

### 按鈕
實心平塗、無圓角、無陰影、無邊框。靜止時傾斜，hover 時**回正**（動作 = 抵達）。
```css
.btn{display:inline-block;background:var(--ink);color:#fff;font-weight:900;font-size:15px;
 letter-spacing:.06em;padding:15px 30px;border:0;cursor:pointer;
 transform:rotate(-3.5deg);transition:transform .16s linear,background-color .16s linear}
.btn:hover,.btn:focus-visible{transform:rotate(0deg);background:var(--red)}
.btn[disabled]{background:#B9B9B4;transform:rotate(0);cursor:not-allowed}
```

### 卡片（其實沒有卡片）
不要用卡片。要分組就用「一塊形體 + 它旁邊的字」。真的需要一組並列的東西時，用 grid 排版但**不畫任何容器**：
```css
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:30px}
.wcard b{display:block;margin-top:14px;font-size:14px;font-weight:900}
.wcard:hover .th{transform:rotate(-3.5deg)}   /* 圖自己歪，不是卡片浮起來 */
```

### 表格
只有橫向實線，沒有直線、沒有斑馬紋、沒有外框。
```css
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{text-align:left;padding:11px 14px 11px 0;vertical-align:top}
thead th{font-weight:900;font-size:11px;letter-spacing:.16em}
tbody tr{border-top:2px solid var(--ink)}
```

### 表單控制項
不要用瀏覽器預設外觀。單選群組寫成一排實心方塊：未選 = 墨、hover = 群青並傾斜、已選 = 紅並放大回正。
```css
.sq{width:26px;height:26px;background:var(--ink);border:0;padding:0;cursor:pointer;
    transition:transform .14s linear,background-color .14s linear}
.sq:hover{background:var(--ultra);transform:rotate(-11.25deg)}
.sq.on{background:var(--red);transform:scale(1.35) rotate(11.25deg)}
.sq[disabled]{background:none;cursor:not-allowed;transform:none}  /* 不可選＝不存在 */
```

### 頁尾
一條 3px 實線之上，三欄純文字。不要 logo 牆、不要社群圖示、不要電子報訂閱框。
```css
.ft{margin-top:110px;padding:46px 0 70px;border-top:3px solid var(--ink)}
```

## 六、動效規則

至上主義的畫是靜止的，但**網站不能靜止**——這裡的原則是：動的是形體在空間中的位置與姿態，不是它的顏色、透明度或大小。**明文禁用：淡入、視差、模糊、縮放呼吸、彈跳 easing（`cubic-bezier` 不得出現回彈）。**

| 類型 | 內容 | duration / easing |
|---|---|---|
| **ambient 環境** | 衛星形體失重漂移：`translate` ≤ 11px、`rotate` ≤ 0.4°，`alternate` 無限往返 | 49s–91s，`ease-in-out`，每塊週期互質避免同步 |
| **ambient 環境（時間驅動）** | 真實時刻改變場燈：日間 `#FFFFFF` → 進場 `#EDECE9` → 演出中整頁反轉為墨底 | 背景色 `.9s linear` |
| **input-driven 輸入** | hover：形體 `rotate` ±5°、換色；點選：重投影整面構成 | ≤ .22s，`cubic-bezier(.2,.8,.3,1)`；重算延遲實測 < 1ms |
| **transition 轉場** | 對角掃幕：一塊 240vmax 的墨色平面以 −45° 姿態沿自身軸滑出，露出頁面 | .5s，`cubic-bezier(.2,.85,.25,1)` |
| **signature 簽名** | **日落 sun-strike**：一枚墨色方塊沿 45° 滑入並停在那枚黃圓上，狀態寫入 `localStorage`，跨頁生效 | .55s，`cubic-bezier(.3,.9,.2,1)` |

```css
/* 環境漂移 */
.dr{animation-name:drift;animation-timing-function:ease-in-out;
    animation-iteration-count:infinite;animation-direction:alternate}
.d1{animation-duration:58s;--dxa:9px;--dya:-7px;--dra:.35deg}
@keyframes drift{from{transform:translate(0,0) rotate(0)}
                 to{transform:translate(var(--dxa),var(--dya)) rotate(var(--dra))}}

/* 對角掃幕：不用 clip-path，用一塊真的平面滑出去 */
.wipe{position:fixed;left:50%;top:50%;width:240vmax;height:240vmax;margin:-120vmax 0 0 -120vmax;
 background:var(--ink);z-index:90;opacity:0;pointer-events:none;transform:rotate(-45deg);
 animation:unveil .5s cubic-bezier(.2,.85,.25,1) both}
@keyframes unveil{
 0%{opacity:1;transform:rotate(-45deg) translateY(0)}
 99%{opacity:1;transform:rotate(-45deg) translateY(-245vmax)}
 100%{opacity:0;transform:rotate(-45deg) translateY(-245vmax)}}
```
> 注意 `.wipe` 的預設狀態是 `opacity:0`。動畫若因任何原因沒有執行，頁面不會被蓋住——覆蓋只存在於 keyframes 的 0% 裡。這是這個轉場能安全使用的前提。

```css
@media (prefers-reduced-motion:reduce){
 .wipe{display:none}
 *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
  transition-duration:.001ms!important}
}
```
四種動效降級後**資訊零損失**：漂移停止（形體位置本來就不承載資訊）、場燈直接切到目標色、輸入回饋瞬間完成、掃幕不出現、日落方塊直接就位。

## 七、插畫與圖像風格（plane-flight 平面飛行構成）

**這個風格沒有插圖。**不要描外形、不要圖示化、不要細線線描、不要半調網點、不要材質濾鏡。所有圖像由四種原語構成：

1. **矩形／長條**（實心，零描邊）
2. **正方**（衛星形體）
3. **十字／梯形**（少用，作為第二層次）
4. **圓**（每個站至多一枚，且必須有語意上的理由）

判準是：**拿掉全部文字，仍然讀得出「哪一塊是支配形體、動勢往哪個方向上升」。**

進階做法（本站採用）：讓構成**由資料算出來**，同一筆資料永遠得到同一張圖。本站每一檔製作的構成是這樣解的——

```js
// 決定性偽亂數：同 seed 恆同構成
function fnv(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h>>>0;}
function mul32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const ANG=[0,11.25,22.5,33.75,45,56.25,67.5];

// 支配形體面積 = 演出長度；細長條數 = 幕數；小方數 = 演員數；傾角 = 首演月份
const ang = -ANG[1 + (month*3)%6];
const domA = (mins-40)/100;
const dw = W*(0.30+0.30*domA), dh = H*(0.20+0.26*domA);
```
```svg
<rect x="99.4" y="75.8" width="163.2" height="84" fill="#131313"
      transform="rotate(-45 181 117.8)"/>
```

## 八、Logo 與 Favicon

Logo 是**一個被對角線切成黑白兩半的方形**（1913 年那面幕）＋一枚被它咬到的黃圓（太陽）＋一條紅色斜條。不要文字標、不要字母組合、不要外框。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <rect width="120" height="120" fill="#FFFFFF"/>
  <circle cx="84" cy="34" r="17" fill="#F5C400"/>
  <polygon points="16,16 16,104 104,104" fill="#131313"/>
  <rect x="16" y="16" width="88" height="88" fill="none" stroke="#131313" stroke-width="6"/>
  <rect x="0" y="112" width="44" height="8" fill="#D9241C" transform="rotate(-22.5 22 116)"/>
</svg>
```

Favicon 用同一組原語縮到 32×32（去掉紅條，加粗外框），以 inline SVG data URI 寫在 `<head>`：
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FFFFFF'/%3E%3Cpolygon points='4,4 4,28 28,28' fill='%23131313'/%3E%3Ccircle cx='23' cy='9' r='4.6' fill='%23F5C400'/%3E%3Crect x='4' y='4' width='24' height='24' fill='none' stroke='%23131313' stroke-width='2'/%3E%3C/svg%3E">
```

## 九、本風格的 5 個不可省略特徵

> 每一項都是「拿掉它就不是至上主義了」的程度。做完之後逐項回去對。

### 1. 沒有地平線的白場
底是純白，而且它**不是紙**。零紋理、零顆粒、零暈影、零漸層、零陰影、零邊框、零可見頁邊界。形體不站在任何東西上。
```css
body{background:#FFFFFF}
*{border-radius:0;box-shadow:none}
.section,.card,.panel{border:0;background:none}   /* 不准有容器 */
```
**拿掉它會變成：**瑞士國際主義（紙上的資訊表）或包浩斯（暖米白的構成練習）。

### 2. 實心平塗的少數幾何原語
矩形、長條、正方、十字、梯形。**零描邊、零漸層、零圓角、零半透明。**重疊處是硬邊覆蓋。
```css
.plane{background:var(--ink);border:0;border-radius:0;opacity:1;mix-blend-mode:normal}
```
```svg
<rect x="58" y="300" width="118" height="42" fill="#1633A8" transform="rotate(11.25 117 321)"/>
```
**拿掉它會變成：**任何一種當代扁平風格；只要出現一條描邊或一層 8px 圓角，這個流派就消失了。

### 3. 斜置動勢（八分圓角度字典）
所有旋轉值只能從 `0°, ±11.25°, ±22.5°, ±33.75°, ±45°, ±56.25°, ±67.5°` 取；畫面上必須讀得出一條往右上升的對角。**正交（0°）是有語意的例外：靜止／抵達／你在這裡。**
```css
.tilt-a{transform:rotate(-11.25deg)}
.tilt-b{transform:rotate(-22.5deg)}
.tilt-d{transform:rotate(-33.75deg)}
/* 現用態＝唯一的正交 */
.nav a[aria-current=page] i{--tilt:0deg}
```
**拿掉它會變成：**風格派（De Stijl）或瑞士——同樣的色塊，正交排列，就是完全不同的流派。

### 4. 尺度懸殊與留白
一個支配形體 + 一群衛星形體，面積比 ≥ 8:1，留白 ≥ 55%。
```css
.dominant{width:min(34vw,420px);aspect-ratio:1}     /* 支配形體 */
.satellite{width:clamp(18px,2vw,48px);aspect-ratio:1} /* 衛星 */
```
量法：把所有形體的面積加總除以畫布面積，> 0.45 就砍。
**拿掉它會變成：**孟菲斯或普普——一堆差不多大的彩色形狀擠在一起。

### 5. 色彩就是身份
黑與紅為主，群青、綠各一塊，各自只承擔一種語意。**全站只有一枚圓形，而它是黃的。**顏色不漸層、不透明、不 hover 變亮。
```css
:root{--ink:#131313;--red:#D9241C;--ultra:#1633A8;--grn:#17823F;--sun:#F5C400}
.sun{width:34px;height:34px;background:var(--sun);border-radius:50%}  /* 全站唯一的 border-radius */
a:hover{color:inherit;background:var(--red);color:#fff}               /* 換色，不是變亮 */
```
**拿掉它會變成：**包浩斯三原色練習（紅黃藍等權）或無彩度的極簡。至上主義的顏色數量是被嚴格配給的。

## 十、Do & Don't

**Do**
- 先擺形體，再放字。字是形體之一，不是形體的說明。
- 讓「現用／被選中」的狀態用**姿態**（角度、大小）而不是顏色來表示，至少表示一次。
- 讓某一個資訊只能從構成本身讀出來（大小、方向、距離）。
- 手機版誠實地降級成流排版，並把旋轉降到 ±4°～±8°。
- 每個 `rotate()` 值都能在角度字典裡找到。

**Don't**
- 不要紫藍漸層、不要 rounded-2xl、不要模糊陰影、不要玻璃擬態。
- 不要 emoji 當 icon；本風格連 icon 都不該有（icon 是象徵，至上主義拒絕象徵）。
- 不要 Lorem ipsum，不要「在當今快節奏的世界」。
- 不要「置中大標＋副標＋兩顆按鈕＋三張卡片」。
- 不要等寬字、不要圖號角標、不要量表刻度——那是工程製圖，不是至上主義。
- 不要在白場上加紙紋、noise、grain 或任何 `filter`。
- 不要用第二枚圓形。
- 不要把跑馬燈當動效簽名。

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FFFFFF'/%3E%3Cpolygon points='4,4 4,28 28,28' fill='%23131313'/%3E%3C/svg%3E">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;border-radius:0;box-shadow:none}
:root{--void:#FFFFFF;--ink:#131313;--red:#D9241C;--ultra:#1633A8;--grn:#17823F;--sun:#F5C400}
body{background:var(--void);color:var(--ink);font-family:'Noto Sans TC',sans-serif;
     font-size:16px;line-height:1.75;font-variant-numeric:tabular-nums;overflow-x:hidden}
.wrap{width:min(1240px,92vw);margin:0 auto}
.hd{display:flex;align-items:flex-start;justify-content:space-between;padding:26px 0 10px}
.nav{display:flex;gap:20px}
.nav a{width:56px;text-align:center}
.nav i{display:block;width:26px;height:26px;margin:0 auto 7px;background:var(--ink);
       transform:rotate(var(--tilt));transition:transform .22s cubic-bezier(.2,.8,.3,1)}
.nav em{display:block;font-style:normal;font-size:11px;font-weight:700;transform:rotate(var(--tilt))}
.nav a:hover i{transform:rotate(calc(var(--tilt) + 5deg))}
.hero{position:relative;width:100%;aspect-ratio:1240/720}
.hero>svg{position:absolute;inset:0;width:100%;height:100%}
.p{position:absolute;left:var(--x);top:var(--y);width:var(--w,auto);
   transform:translate(0,-50%) rotate(var(--r,0deg))}
.sect{padding:78px 0 8px}
.sect>.lab{display:inline-block;font-family:'Archivo',sans-serif;font-weight:900;font-size:11px;
           letter-spacing:.3em;transform:rotate(-11.25deg);transform-origin:left bottom;margin-bottom:26px}
.sect h2{font-size:clamp(30px,5vw,62px);font-weight:900;line-height:.94;
         display:inline-block;transform:rotate(-3.5deg);transform-origin:left bottom}
.ft{margin-top:110px;padding:46px 0 70px;border-top:3px solid var(--ink)}
@media(max-width:900px){.hero{display:none}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}
</style>
</head>
<body>
<header class="hd wrap">
  <a href="index.html"><!-- logo svg --></a>
  <nav class="nav" aria-label="主導覽">
    <a href="a.html" style="--tilt:-19deg"><i></i><em>甲</em></a>
    <a href="b.html" aria-current="page" style="--tilt:0deg"><i></i><em>乙</em></a>
    <a href="c.html" style="--tilt:34deg"><i></i><em>丙</em></a>
  </nav>
</header>
<main class="wrap">
  <section class="hero">
    <svg viewBox="0 0 1240 720" role="img" aria-label="構成">
      <polygon points="520,110 520,530 940,530" fill="#131313"/>
      <rect x="520" y="110" width="420" height="420" fill="none" stroke="#131313" stroke-width="3"/>
      <rect x="980" y="232" width="214" height="22" fill="#D9241C" transform="rotate(-33.75 1087 243)"/>
      <rect x="58" y="300" width="118" height="42" fill="#1633A8" transform="rotate(11.25 117 321)"/>
    </svg>
    <div class="p" style="--x:9%;--y:19%;--r:-11.25deg;--w:330px">品牌名</div>
  </section>
  <section class="sect">
    <span class="lab">SECTION</span>
    <h2>區段標題</h2>
    <p style="max-width:62ch;margin-top:22px">內文。</p>
  </section>
</main>
<footer class="ft"><div class="wrap">聯絡資訊</div></footer>
</body>
</html>
```

## 十二、技術實作與相容性

本站的三項核心技術，以及它們各自承載什麼。

### 1. CSS `matrix3d()` 平面單應變換（A 渲染層）

**承載什麼**：特徵 1 與特徵 3 的核心命題——「至上主義說形體沒有透視，但劇場把觀眾分配到不同的視點」。使用者選定座位後，同一組 DOM 形體被**一次 style 寫入**重投影成該座位看見的四邊形。SVG 只支援仿射變換（`matrix()` 六參數），做不出投影梯形；CSS `matrix3d()` 的 `m14`／`m24` 才提供齊次除法所需的 w 分量。這是選它的唯一理由。

**支援現況（2026-09 查證）**：MDN `transform-function/matrix3d()` 標示 **Baseline Widely available**，自 2015 年 7 月起於各主流瀏覽器可用。查證來源：MDN `Web/CSS/transform-function/matrix3d`、caniuse `mdn-css_types_transform-function_matrix3d`。

**做法**：四點對應解 8 個未知數（高斯消去），再按 column-major 填進 4×4：
```js
function solveH(src,dst){                 // src/dst 各 4 個 [x,y]
  const A=[],b=[];
  for(let i=0;i<4;i++){
    const [x,y]=src[i],[u,v]=dst[i];
    A.push([x,y,1,0,0,0,-u*x,-u*y]); b.push(u);
    A.push([0,0,0,x,y,1,-v*x,-v*y]); b.push(v);
  }
  /* 8×8 高斯消去（含部分選主元），奇異時回傳 null */
  ...
  return h;                                // [a,b,c,d,e,f,g,h,1]
}
function toMatrix3d(h){
  return [h[0],h[3],0,h[6],  h[1],h[4],0,h[7],  0,0,1,0,  h[2],h[5],0,1];
}
el.style.transformOrigin='0 0';
el.style.transform='matrix3d('+toMatrix3d(h).join(',')+')';
```

**Fallback 具體行為**：`solveH()` 在矩陣奇異（例如容器尚未取得尺寸、四點退化為一點）時回傳 `null`；此時清空 `transform`，`.scr` 以 `width:100%;height:100%` 正視顯示，並在讀數表印出「本裝置不支援投影變換，右方以正視顯示」。座位的可見面積、失衡、分數、票價全部仍以文字給出，**資訊零損失**。另外容器尺寸為 0 時最多重試 30 個影格。

**效能實測**（Node 22，同一份原始碼）：單次解算 **0.0076 ms**（5000 次 38.0 ms）。hover 逐格重算的預算上限是 100 ms，實際約為其 1/13000。變換套在單一容器上，由合成器處理，不觸發 layout。

### 2. 真實時刻驅動的場燈狀態機（B 動效與時間軸層）

**承載什麼**：ambient 動效之一——不需要任何輸入。網站依真實時刻在「日間／進場（開演前 30 分）／演出中（110 分）／散場」四態之間切換：白場明度逐級下降，演出時段整頁反轉為墨底。這讓「這是一座劇場」變成畫面本身的行為，而不是一句文案。

**支援現況（2026-09 查證）**：`Intl.DateTimeFormat` 的 `timeZone` 選項與 `formatToParts()` 為 Baseline Widely available（MDN `Intl/DateTimeFormat/formatToParts`）；`matchMedia('(prefers-reduced-motion: reduce)')` 亦為 Baseline。時區固定取 `Asia/Taipei`，不受使用者本機時區影響。

```js
function tpe(){
  try{
    const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',hour12:false,
      weekday:'short',hour:'2-digit',minute:'2-digit'}).formatToParts(new Date());
    const o={}; p.forEach(x=>o[x.type]=x.value);
    return {w:o.weekday, m:+o.hour*60 + +o.minute};
  }catch(e){                                   // 不支援 timeZone 的環境
    const d=new Date();
    return {w:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()], m:d.getHours()*60+d.getMinutes()};
  }
}
```
**Fallback 具體行為**：`Intl` 不可用時退為裝置本機時間（`catch` 分支）；JavaScript 完全關閉時固定停在「日間」白場，四頁全部內容仍完整可讀。每 30 秒重算一次，不使用 `setInterval` 以外的計時資源。

### 3. URL 狀態序列化（E 資料與生成層）

**承載什麼**：票根。`?show=1003-1430&seat=D7` 就是憑證——重新開啟會還原那個座位的幕與全部讀數，可複製給別人看「我坐在這裡會看到這個形狀」。

**支援現況（2026-09 查證）**：`URLSearchParams` 與 `history.replaceState()` 皆為 Baseline Widely available（MDN `URLSearchParams`、`History/replaceState`）。

```js
const p=new URLSearchParams(location.search);
const seat=p.get('seat');
if(seat && /^[A-H](1[0-2]|[1-9])$/.test(seat)){ /* 還原 */ }
history.replaceState(null,'','?show='+showId+'&seat='+seat);
```
**Fallback 具體行為**：`history.replaceState` 不存在時略過網址同步，選位與訂位流程照常；輸入的 `seat` 一律經正規表示式白名單驗證後才使用（不接受任意字串），無效值直接忽略。**關閉 JavaScript 時**，選位頁下方永遠存在一張完整的 96 席資料表（席位／可見面積／左右失衡／分數／等級／票價），可讀、可比較、可排序閱讀。

### 效能預算實測

| 頁面 | 單檔大小（含全部 inline CSS/JS/SVG） | 預算 350 KB |
|---|---|---|
| index.html | 34.5 KB | ✓ |
| seats.html | 56.5 KB | ✓ |
| works.html | 58.9 KB | ✓ |
| house.html | 26.3 KB | ✓ |

零外部圖片、零外部音檔、零 JavaScript 函式庫；唯一外部資源是 Google Fonts 兩支字族。首屏 JS 只做一次狀態判定與（選位頁）一次矩陣解算，實測遠低於 100 ms。主要動畫全部只改 `transform` 與 `background-color`，不觸發 layout。
