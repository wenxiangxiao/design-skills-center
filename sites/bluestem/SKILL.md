---
name: midcentury-minimal-realism
description: Mid-century modern nature-plate style — countable flat shapes, five primitives only, four spot inks with fixed misregistration, hairlines reserved for diagnostic features.
---

# 中世紀現代・極簡寫實圖版風 Mid-Century Minimal Realism

> 流派：中世紀現代 Mid-Century Modern，取其自然圖版一脈（Charley Harper 的 minimal realism × Alexander Girard 的平塗限色）。
> 年代地域：一九五〇—六〇年代美國中西部；製作條件為絹印／平版三至五塊專色，一色一版，色數等於錢。
> 本規格書不綁定產業。它定義的是「一張圖用幾塊形狀畫成」這件事本身。

---

## 一、設計哲學

查理・哈波（Charley Harper, 1922–2007）替《Ford Times》畫了三十年、替《The Golden Book of Biology》畫過整本插圖，他把自己的畫法叫做 **minimal realism（極簡寫實）**，並留下這句話：

> 「我看一隻鳥的時候，我不看牠翅膀上的羽毛，我只數牠有幾片翅膀。」

這句話是整套風格的地基，而且它是一條**減法**指令，不是一條美學偏好。它的三個推論構成本風格的全部：

1. **可數性優先於逼真度。** 一張圖的第一個屬性不是「像不像」，是「幾塊」。你必須能指著畫面說出：這是十四塊。做不到就表示你在畫羽毛。
2. **簡化不是模糊，是刪除。** 不准把細節「畫得比較淡」「縮小」「合併成一團」。要嘛整塊在，要嘛整塊不在。這是版房的物理事實：一塊形狀不是刻在版上，就是不在版上。
3. **保留的標準是辨識，不是好看。** 每個對象有二到三塊**識別鍵**（黑面罩、尖冠、四片翅、白臀）。刪到只剩識別鍵仍成立；刪掉任何一塊識別鍵，剩下的東西可能還很好看，但它已經不是那個東西。

第二條血脈來自 Alexander Girard——他在一九六五年替 Braniff 航空做了「The End of the Plain Plane」，一萬七千多項改動、七種機身色，全部是平塗色域。他證明了「一整套識別可以只由幾塊沒有陰影的顏色構成」。

**這個風格拒絕的東西寫成一句話：畫面上不准有任何一個東西是為了讓它看起來更真實而存在的。**

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個風格了。五項在示範站上全部看得見。

### 特徵 1 ── 可數的塊面（Countable shapes）

每個對象由 3–20 塊**平塗閉合形狀**構成，塊數是可以被說出口的數字，而且應該印在畫面上。禁止漸層、模糊陰影、外光暈、羽毛／毛髮／鱗片級細節、任何 `filter: blur()`。

```css
/* 這是本風格唯一合法的「上色」寫法 */
.plate path{ fill:var(--brick); stroke:none; }
/* 以下四行是本風格的禁令，寫進 reset 裡當護欄 */
.plate *{ filter:none !important; opacity:1 !important; }
.plate linearGradient,.plate radialGradient{ display:none }
.plate path{ paint-order:normal }
.plate{ box-shadow:none }
```

判準：把顏色全部換成同一個灰，仍然數得出來有幾塊、每一塊是什麼。

### 特徵 2 ── 只有五種形狀（Five primitives, no sixth）

形狀語彙固定為 **圓、橢圓（可轉）、等腰三角（可轉）、半圓（可轉）、圓角矩形（可轉）**。沒有第六種，沒有手繪貝茲，沒有描外形的路徑。動物的解剖被幾何取代：腿是圓角矩形，耳朵是半圓或三角，眼睛永遠是一個實心圓。

```js
// 全站唯一的圖像原語。五個函式，其餘一律由它們疊出來。
function tri(cx,cy,w,h,a){ /* 等腰三角，頂點朝上再旋轉 a 度 */ }
function half(cx,cy,r,a){ /* 半圓，平邊朝下再旋轉 a 度 */ }
// 資料長這樣，一塊形狀一行：
['ear1','左耳', PLATE_TEAL, ['h',13,29,7,-20]]
['leg1','前足', PLATE_INK,  ['r',38,86,9,10,4,-6]]
```

判準：任何一塊形狀都要能被寫成 `[type, ...params]` 的一行。寫不出來就是你偷偷畫了第六種。

### 特徵 3 ── 四塊專色版與固定的套印偏移（Four plates, permanent misregistration）

三到五塊專色版，一色一版，**每塊版有一個固定不變的套印偏移方向，而且不修**。這是本風格唯一允許存在的「不完美」，也是它看起來是印出來的而不是螢幕生出來的唯一理由。

```css
:root{
  --p-mustard:#E2A32C; --p-brick:#D4552A; --p-teal:#2A6B6B; --p-ink:#1E1B17;
}
/* 每塊版一個位移；墨是套準版，永遠 0 0 */
.pl1 path{ transform:translate(1.5px,-1.1px) }   /* 芥末 */
.pl2 path{ transform:translate(1.3px, 1.4px) }   /* 磚橘 */
.pl3 path{ transform:translate(-1.6px,1.0px) }   /* 鴨青 */
.pl4 path{ transform:translate(0,0) }            /* 墨・套準版 */
```

疊印必須是真的：兩塊油墨相疊的地方要生出第三個顏色，用 `mix-blend-mode:multiply`，不要用第三個 hex 假裝。

```css
.overprint{ mix-blend-mode:multiply }
```

### 特徵 4 ── 墨線只給識別鍵（Hairlines are earned, not applied）

**形狀的邊界就是顏色的邊界。**不准替每一塊形狀描邊——那是剪紙，不是極簡寫實。墨版只印三種東西：識別鍵（浣熊的面罩、鹿的白尾緣）、眼睛、以及對象站著的那根枝／那條地平線。

```css
/* 錯：整張圖描邊 */
.plate path{ stroke:#1E1B17; stroke-width:1.6 }   /* ✗ 這會把它變成剪紙風 */
/* 對：墨是一塊版，不是一種筆 */
.pl4 path{ fill:var(--p-ink); stroke:none }        /* ✓ */
```

需要白色時，用「紙」——不上墨的留白，而不是白色油墨。所以白色形狀永遠等於底色。

### 特徵 5 ── 中間調地色＋高彩度小面積＋留白 ≥28%

地色是**低彩度中間調**（橄欖、燕麥、胡桃），高彩度色永遠是小面積的。圖不准碰到版框：圖版四周留白至少 28%，這是硬規則，不是排版偏好。

```css
:root{
  --oat:#EFE5CE;   /* 紙・26% */
  --paper:#F7F1E2; /* 圖版紙・12% */
  --olive:#55613A; /* 牆・地色・24% */
  --brick:#D4552A; /* 14% */ --teal:#2A6B6B; /* 10% */ --mustard:#E2A32C; /* 9% */
  --ink:#1E1B17;   /* 線與正文・5% */
}
```
```js
// 取景：由剩下的形狀的邊界回推縮放，強制留白
const s = 120 * 0.72 / Math.max(bboxW, bboxH);   // 0.72 = 1 − 28%
g.setAttribute('transform', `translate(${60-s*cx} ${60-s*cy}) scale(${s})`);
```

這條規則有一個很好的副作用，本站直接把它做成了核心互動：**版的尺寸是固定的，所以少一塊形狀，剩下的形狀就會變大。**

---

## 三、色彩系統

| 角色 | Hex | 面積 | 用途 |
|---|---|---|---|
| 橄欖 olive | `#55613A` | 約 24% | 頁面地色（牆）。長文絕不直接放在牆上。 |
| 燕麥 oat | `#EFE5CE` | 約 26% | 內容帶的紙。所有長文在這上面。 |
| 圖版紙 paper | `#F7F1E2` | 約 12% | 圖版與表格底，比燕麥再亮一階。 |
| 磚橘 brick | `#D4552A` | 約 14% | 第二塊版；連結、主要動作、熱的東西（羽、毛、翅）。 |
| 鴨青 teal | `#2A6B6B` | 約 10% | 第三塊版；冷的東西（身體、水、葉）、次要動作。 |
| 芥末 mustard | `#E2A32C` | 約 9% | 第一塊版；見光的東西（喙、鼓膜、殼）、hover、現用態。 |
| 墨 ink | `#1E1B17` | 約 5% | 第四塊版；正文、全部 2.5px 邊框、識別鍵與眼。 |
| 深橄欖 olive-d | `#39422A` | 約 4% | 頁尾。 |

規則：

- **油墨色只用在圖上。**當它要當文字色時一律換成深化版本，確保對比 ≥4.5:1：芥末 `#7E570D`、磚橘 `#A83C17`、鴨青 `#1D4E4E`、紙 `#6E6754`。
- 地色永遠不是純白也不是純黑。
- 零漸層、零模糊陰影。需要立體感時用**實心位移色塊**，不要用 `box-shadow: 0 4px 12px rgba(...)`。
- 疊印產生的第三色不寫死，交給 `mix-blend-mode:multiply` 算。

---

## 四、字體系統

| 用途 | 字體 | 字重 | 設定 |
|---|---|---|---|
| 標題與所有拉丁標籤／數字 | **Jost**（Futura 的開源近親） | 600–700 | `letter-spacing:.005em`；小標籤 `.2em` 全大寫 |
| 中文正文 | **Noto Sans TC** | 400 / 500 / 700 | `line-height:1.75`, `letter-spacing:.01em` |
| 學名 | **EB Garamond Italic** | 400 | 只給二名法學名，其餘場合不得使用襯線 |

```css
:root{
  --disp:'Jost','Noto Sans TC',sans-serif;
  --sans:'Noto Sans TC','Jost',system-ui,sans-serif;
  --ser:'EB Garamond',Georgia,serif;
}
h1{font-family:var(--disp);font-weight:700;font-size:clamp(30px,5.2vw,56px);line-height:1.14}
.lbl{font-family:var(--disp);font-weight:600;font-size:11px;letter-spacing:.2em;text-transform:uppercase}
.num{font-family:var(--disp);font-variant-numeric:tabular-nums}
.sci{font-family:var(--ser);font-style:italic}
```

字級 scale：11 / 12.5 / 14 / 16 / 21 / 34 / 56。**中間層級刻意稀疏**——中世紀現代的資訊層級靠尺寸差距，不靠八種灰。

禁止：等寬字體（那是工程製圖語彙）、字體描邊、任何 `text-shadow`。

---

## 五、版面與網格

- **不對稱雙欄**：主欄 : 副欄 = 1.36 : 1。圖版放主欄，說明與清單放副欄。不要 1:1，不要置中。
- 版心 `max-width:1180px`，段落 `max-width:62ch`。
- **橫帶式分節**：整頁由數條滿版橫帶構成，帶與帶之間用 **3px 實線墨邊**分隔（不是留白、不是陰影）。橄欖帶與燕麥帶交錯出現。
- 圓角：**一律 0**。畫面上的圓潤感全部來自圖裡的圓與半圓，不來自 UI。
- 邊框粗細只有三檔：**3px（帶／圖版框）、2.5px（元件框）、1.5px（表格列線）**。不要 1px，太螢幕。
- 表頭下方一定是 2.5px 實線，其餘列線 1.5px、透明度 .2。
- 卡片群組必須用 **subgrid** 讓每張卡內部的橫線跨卡對齊成一條直線——這是一九六〇年代目錄頁的做法，也是本風格最容易被忽略的一條。

```css
.cat{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:22px}
.cat .card{grid-row:span 5;display:grid;grid-template-rows:subgrid}
@supports not (grid-template-rows:subgrid){ .cat .card{grid-row:auto;grid-template-rows:auto} }
```

---

## 六、元件配方

**導覽（疊版色票 overprint-chip）**——現用態不是被高亮，是被多印了一塊版：

```css
nav.chips a{position:relative;width:52px;height:52px;border:2.5px solid var(--ink);background:var(--oat);overflow:hidden}
nav.chips a .b{position:absolute;inset:0;background:var(--c1)}                 /* 第一塊版 */
nav.chips a .o{position:absolute;inset:-14% -14% auto -14%;height:74%;background:var(--c2);
  mix-blend-mode:multiply;opacity:0;transform:translate(0,-102%);transition:transform .16s ease,opacity .16s ease}
nav.chips a:hover .o{opacity:.55;transform:translate(2px,-52%)}                /* 版正要壓下來 */
nav.chips a[aria-current="page"] .o{opacity:1;transform:translate(3px,6%)}     /* 壓下去了，且對不準 */
```

**按鈕**：實心色塊 + 2.5px 墨框 + 零圓角；hover 換成芥末底墨字。禁止陰影與位移動畫。

```css
.btn{font-family:var(--disp);font-weight:600;letter-spacing:.08em;background:var(--brick);color:var(--oat);
  border:2.5px solid var(--ink);padding:10px 20px}
.btn:hover{background:var(--mustard);color:var(--ink)}
```

**圖版框**：3px 墨框 + 四角套印十字 + 底部一條 2.5px 分隔線壓一行版邊資訊（編號、中名、學名、狀態）。

```html
<div class="plate">
  <span class="reg tl"><i></i><i></i></span> <!-- 十字：兩根 1.5px 實心條 -->
  <svg class="art" viewBox="0 0 120 120"><g class="fitg" filter="url(#sprd)">…</g></svg>
  <div class="cap"><span><b>No.118</b> 浣熊 <i class="sci">Procyon lotor</i></span><span class="lbl">原稿・15 塊</span></div>
</div>
```

**清單／零件表**：`grid-template-columns:30px 1fr 62px 30px`（序號／名稱／所屬版／標記點）。列線 1.5px，hover 整列翻成芥末底。

**表單**：輸入框 2.5px 墨框、零圓角、focus 時 `outline:3px solid var(--mustard)`。錯誤訊息用磚橘文字，不用紅色驚嘆號圖示。

**頁尾**：深橄欖底，三欄不等寬（1.5 : 1 : 1），連結色芥末。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 值 |
|---|---|---|---|
| ambient | **套印呼吸** | 無需輸入、恆常 | 三塊彩色版各自 `translate` ±0.9px，週期 26s／31s／23s，`ease-in-out infinite`。墨版不動（它是套準版）。 |
| input | **抬版預覽** | hover／focus 零件列或形狀 | 該塊沿其色版的套印方向抬 2.3–2.8px，其餘塊降到 `opacity:.24`；`transition` 90ms linear，延遲 <100ms。 |
| transition | **過紙推移** | 進頁 | 四層內容依序 `clip-path:inset(0 100% 0 0)` → `inset(0)`，各 340ms `steps(9)`，stagger 90ms——四塊版依序過紙。用 `steps()` 是因為平台機是一下一下的。 |
| signature | **抽版重裱** | 刪掉一塊形狀 | 那塊沿其色版方向平移 30–38px 並淡出（380ms），同時整張圖依剩下形狀的邊界重新裝框放大（460ms `cubic-bezier(.26,.94,.3,1)`）。 |

```css
@keyframes d1{0%,100%{transform:translate(0,0)}50%{transform:translate(.9px,.7px)}}
.art .pl1{animation:d1 26s ease-in-out infinite}
.pl1{--lx:2.6px;--ly:-2px;--ox:34px;--oy:-25px}     /* 抬版／抽版的方向＝該版的套印方向 */
.pl.hot .pp{transform:translate(var(--lx),var(--ly))}
.pl.out .pp{transform:translate(var(--ox),var(--oy));opacity:0}
.fitg{transition:transform .46s cubic-bezier(.26,.94,.3,1)}
```

降級（四種都要有，且資訊零損失）：

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important}
  /* 關鍵：套印錯位是風格本體，不是動畫。停下來也要留在錯位的位置。 */
  .art .pl1{transform:translate(.6px,.5px)} .art .pl2{transform:translate(-.5px,.5px)}
  .art .pl3{transform:translate(.6px,-.5px)}
  nav.chips a[aria-current="page"] .o{opacity:1;transform:translate(3px,6%)}
}
```

禁用：淡入式滾動揭示、視差、數字滾動、跑馬燈、彈跳、模糊。

---

## 八、插畫與圖像風格

技法名稱：**minimal-realism silhouette（極簡寫實塊面構成）**。

- 全站零外部圖片。所有圖像——主圖、目錄縮圖、標誌、favicon、使用者產出物——由同一支形狀引擎輸出。
- 每一塊形狀都必須**可命名**（「初級飛羽群」而不是「path-14」），而且要標明它屬於哪一塊版、是不是識別鍵。
- 塊與塊之間只有兩種關係：**相鄰**（共用邊界）與**疊印**（相乘）。沒有第三種。
- 依附關係要寫進資料：面罩掛在頭上，尾環掛在尾上。刪掉承載者，掛在它身上的東西一起走。
- 判準：**拿掉顏色，只留塊數與形狀，仍讀得出這是什麼。**

資料格式（可直接複製）：

```js
// [id, 名稱, 版, 形狀, 群組|null, 識別鍵說明|null, 依附|null]
['head' ,'頭'  ,3,['c',24,42,17]          ,null   ,null                        ,null  ],
['mask' ,'面罩',4,['e',23,44,17,7,-6]     ,null   ,'黑面罩。拿掉它就只是一隻灰貓。','head'],
['ring1','尾環一',4,['e',78,52,4.6,10,-52],'rings',null                        ,'tail'],
```

「群組」是特徵 1 的護欄：同一組重複形狀（六隻腳、五顆斑、四片翅）**要嘛全留、要嘛全刪**。留一半就是在數羽毛。

---

## 九、Logo 與 Favicon

- 標誌必須由同一組五種形狀組成——它是這批圖版的第十三張，不是外來的。
- 建議構成：一根圓角矩形當軸 + 二到三個三角形當穗／翼 + 一個半圓當底 + 一個小實心圓當眼／節點。三到四塊版，不描邊。
- 字標用 Jost 700 全大寫，字距 0.5；下方兩行 Jost 500、字距 2.7、字級 11.5：一行深橄欖、一行磚橘。
- Favicon 用同一組形狀，**直接寫成 inline SVG data URI**，不另存檔：

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 74'><rect width='52' height='74' fill='%23EFE5CE'/><path d='…' fill='%232A6B6B'/><path d='…' fill='%23E2A32C'/><path d='…' fill='%23D4552A'/></svg>">
```

16px 下的判準：**還數得出來有幾塊嗎？**數不出來就再刪一塊。

---

## 十、Do & Don't

**Do**

- 把塊數印在畫面上。這個風格的自尊心就是那個數字。
- 每個對象先定義二到三塊識別鍵，再開始畫。
- 留白至少 28%，圖不碰框。
- 套印偏移固定、明列、不修。
- 白色一律用「紙」（底色）表達，不用白色油墨。
- 三種邊框粗細（3 / 2.5 / 1.5）、一種圓角（0）。

**Don't**

- ✗ 描邊每一塊形狀（→ 變成剪紙風）。墨線只給識別鍵。
- ✗ 用漸層或模糊陰影做量感。這個風格沒有光源。
- ✗ 為了「更像」而增加細節。羽毛、毛髮、鱗片、反光點一律不畫。
- ✗ 用第六種形狀，或偷用手繪貝茲曲線。
- ✗ 把高彩度色當地色鋪滿。高彩度永遠是小面積。
- ✗ 用等寬字體、字體描邊、text-shadow。
- ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章。
- ✗ 用 `mix-blend-mode` 做「氣氛」。它在這裡只有一個工作：算出兩塊油墨疊起來的第三個顏色。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,<svg …>">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@1&family=Jost:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
<style>/* 見第三～七章 */</style></head><body>

<!-- 油墨肥邊濾鏡，全站共用一支 -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
 <filter id="sprd" x="-45%" y="-45%" width="190%" height="190%" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.62" in="SourceGraphic" result="fat"/>
  <feComposite in="SourceGraphic" in2="fat" operator="over"/>
 </filter></svg>

<header class="mast"><div class="wrap">
  <a class="brand" href="index.html"><svg …>…</svg><span>…</span></a>
  <nav class="chips" aria-label="主導覽">
    <a href="index.html" aria-current="page" style="--c1:#E2A32C;--c2:#D4552A">
      <span class="b"></span><span class="o"></span><span class="t">THIS MONTH</span><span class="n">1</span></a>
    …
  </nav>
</div></header>

<main>
  <!-- 橫帶一：燕麥紙帶．不對稱雙欄 -->
  <section class="band"><div class="wrap pad">
    <div class="open">
      <div class="w2"><div class="plate">…圖版…</div></div>
      <div class="parts w3">
        <div class="ph"><span class="lbl">零件表　PARTS</span><span class="lbl">15 塊・4 塊版</span></div>
        <ol><li data-id="head"><span class="i num">01</span><span>頭</span>
            <span class="pk">鴨青版</span><span class="kk"></span></li>…</ol>
      </div>
    </div>
  </div></section>

  <!-- 橫帶二：橄欖牆帶．長文不放在牆上，只放短句與表格 -->
  <section class="band o"><div class="wrap pad-s">
    <div class="eyebrow"><span class="lbl">FOUR PLATES</span><span class="r"></span><h2>四塊版</h2></div>
    …
  </div></section>
</main>

<footer><div class="wrap">…</div></footer>
</body></html>
```

---

## 十二、技術實作與相容性

### 1. SVG `feMorphology` + `feComposite`（渲染層）

**承載**：特徵 3 的油墨肥邊。先把整張圖 `dilate` 一圈，再把原圖 `feComposite operator="over"` 疊回去，於是每塊形狀底下墊著一圈自己的顏色，相鄰兩塊接觸處會透出那一圈；`feMorphology` 對已合成的 RGBA 逐通道膨脹，因此不同顏色的交界會出現輕微色緣——這正是套印不準的樣子，不是 bug。

```svg
<filter id="sprd" x="-45%" y="-45%" width="190%" height="190%" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.62" in="SourceGraphic" result="fat"/>
  <feComposite in="SourceGraphic" in2="fat" operator="over"/>
</filter>
```

**支援現況（2026-08-24 查證）**：MDN《`<feMorphology>`》標示 **Baseline Widely available**，自 2015-07 起跨瀏覽器；`feComposite` 同屬 SVG 1.1 濾鏡基元，支援情形相同。
**fallback**：不支援時整支濾鏡被忽略，形狀、顏色、版面與可讀性完全不變，只是邊緣變成數學上的硬邊。因此**濾鏡只能承擔質感，不得承擔資訊**。
**注意事項（實作踩過的坑）**：
- 濾鏡要掛在 SVG 內部的 `<g>` 上，**不要**用 CSS `filter:url(#sprd)` 掛在外層 HTML 容器上——後者的 `radius` 會以 CSS px 計算（0.62px ≈ 看不見），掛在 `<g>` 上則以 SVG user unit 計算（在 120 單位的圖版上 ≈ 2.4 CSS px，剛好）。掛在 HTML 容器上還會連帶把版邊文字一起膨脹。
- 濾鏡區域要開大（`-45% / 190%`），否則「抽版」動畫把形狀移出去時會被濾鏡邊界切掉。
- **效能**：每頁最多掛兩張大圖。目錄頁的十二張縮圖一律不掛濾鏡——十二個濾鏡區域會讓捲動掉幀。

### 2. CSS Grid `subgrid`（版面層）

**承載**：第五章的目錄頁橫線對齊。卡片內部五列（圖／中名與編號／學名／塊數與版數／年份印量價格）掛到外層網格的列軌上，因此不論學名多長，整排卡片的每一條橫線都對齊成一條直線。這件事用 `grid-template-rows:auto` 或 flex 做不到。

**支援現況（2026-08-24 查證）**：caniuse／web.dev — subgrid 於 **2023-09-15 三引擎齊備**（Firefox 71 於 2019、Safari 16 於 2022、Chrome/Edge 117 於 2023-09），並於 **2026-03-15 起列為 Baseline Widely available**，全球覆蓋 >92%。
**fallback**：`@supports not (grid-template-rows:subgrid)` 時退回一般網格——卡片內容一模一樣，只是橫線不跨卡對齊。資訊零損失。

### 3. 規則引擎與依附閉包（資料與生成層）

**承載**：核心互動的裁定。三條規矩是三個可驗算的述詞：

```
規矩一（群組完整性）  ∀g ∈ Groups : |Kept ∩ g| ∈ {0, |g|}
規矩二（識別鍵）      ∀p : key(p) ⇒ p ∈ Kept
依附（掛得住）        ∀p ∈ Kept : dep(p) ≠ ⊥ ⇒ dep(p) ∈ Kept
規矩三（塊數上限）    |Kept| ≤ |House|
```

「下限」（再刪一塊就會犯規的那個數字）＝**識別鍵集合對依附關係取閉包、再補齊所在群組**的不動點。純 JavaScript，無瀏覽器 API 依賴，故無相容性問題。

**驗證**：閉包解已對十二張圖版**窮舉全部 2ⁿ 子集**驗證，閉包最小值與窮舉最小值 12/12 完全相同；全部合格刪法 447 種，其中 157 種（35.1%）會被收版。窮舉在 Node 22 單執行緒約數十毫秒完成，僅在建置階段跑；執行階段每次交版只做一次線性掃描（n ≤ 16），耗時 <0.1ms。

**決定性**：版號由 FNV-1a 雜湊 `(key, bitmask)` 決定，同一組刪法恆得同一個版號；`?p=<key>.<mask base36>` 可完整還原，`localStorage` 供跨頁貼版。

### 4. 效能與無 JavaScript

- 單頁大小（含 inline 全部 CSS／JS／SVG）：28–56 KB，遠低於 350 KB 門檻。零外部圖片、零外部指令碼；唯一外部資源是 Google Fonts。
- 首屏 JS：一次 `draw()`（≤16 個 `createElementNS`）+ 一次清單建構，實測 <10 ms。
- 動畫只改 `transform` 與 `opacity`，不觸發 layout；每次刪除只做一次 `setAttribute('transform')`，無 layout thrashing。
- **無 JavaScript 時**：四頁的全部文字、表格、十二張圖版與首頁那張原稿都在建置階段以同一支形狀引擎算完並寫進 HTML，關掉 JavaScript 仍是完整的網站；失去的只有「刪」這個動作本身，而全部規則、公式與實測數字都印在方法頁上，不需要 JavaScript。
