---
name: orphism-simultaneous-disc
description: Orphism / Simultanéisme (Robert & Sonia Delaunay, Paris 1912–14) — flat hard-edged concentric discs split into quadrant arcs, complementary colours always touching (Chevreul's law of simultaneous contrast), no outlines, no gradients, no shadows, type set on flat colour patches, everything slowly turning.
---

# 奧費主義／同時主義 Orphism · Simultanéisme

> 範例站：圓光舞廳 Înn-kng Ballroom（社交舞廳）。本規格與產業無關——任何需要「節奏、顏色、轉動」的品牌都能用。

## 1. 設計哲學

1912 年詩人 Guillaume Apollinaire 在巴黎替 Robert Delaunay、František Kupka 等人的新畫取名「奧費主義 Orphisme」——像奧菲斯的歌一樣，只靠顏色與形狀就能感動人，不需要畫任何東西。Delaunay 夫婦自己稱之為「同時主義 Simultanéisme」，理論來源是化學家 Michel-Eugène Chevreul 1839 年的《色彩同時對比定律》：兩個顏色並排時，各自會往對方的互補色反方向偏移，所以**顏色從來不是單獨被看見的**。

代表作：Robert Delaunay〈Disque simultané〉1912–13（史上最早的純抽象圓盤之一）、〈Formes circulaires, Soleil, Lune〉1913、〈Hommage à Blériot〉1914；Sonia Delaunay〈Le Bal Bullier〉1913（巴黎蒙帕納斯舞廳的探戈）、〈Prismes électriques〉1914、與 Blaise Cendrars 合作的兩公尺摺頁詩集〈La Prose du Transsibérien〉1913，以及 1920s 她的「同時」織品與服裝。

為什麼長這樣：(1) 他們要畫「光」而不是「物」，光經過稜鏡被拆成色環，所以形狀就是圓與弧；(2) 同時對比只在硬邊相鄰時才最強，所以零漸層、零輪廓線；(3) 油畫與 pochoir（模版上色）的手工限制讓每塊顏色都是平塗；(4) 他們相信顏色本身就有運動感，所以畫面總是暗示旋轉。

一句話：**圓是唯一的形，鄰居決定顏色，一切都在轉。**

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，它就變成別的風格（歐普、孟菲斯、包浩斯…）。

### 特徵 1｜形狀語彙：同心圓盤＋直半徑切出的四分弧段
畫面上的「圖」只有一種：同心圓，被通過圓心的直線切成 2／4／6 等分，每一環的切分可以錯開角度。不得用矩形、三角形或自由曲線當圖像元素（矩形只用作文字色場，見特徵 3）。圓盤要大、要出血、要偏心。

```css
/* 每一環一個 div；環寬用 inset 控制，色段用 conic-gradient 硬邊 */
.disc{position:absolute;border-radius:50%;aspect-ratio:1}
.disc .ring{position:absolute;inset:var(--in);border-radius:50%;
  background:conic-gradient(from 45deg,#E0442B 0 25%,#1F8A5B 0 50%,#E0442B 0 75%,#1F8A5B 0)}
```
```js
function conic(segs,off){ // 等分硬邊
  return "conic-gradient(from "+off+"deg,"+segs.map((c,i,a)=>c+" "+(i*100/a.length)+"% "+((i+1)*100/a.length)+"%").join(",")+")";
}
```

### 特徵 2｜色彩規則：互補色永遠相鄰（同時對比）
八色 RYB 色環，索引相差 4 即互補：朱紅↔翠綠、橙↔天藍、鉻黃↔群青、黃綠↔紫。**任一條交界兩側，應盡量是互補或至少相差 3 格**；相鄰色（差 0–1 格）並排＝「濁」，視為錯誤。全飽和平塗、零漸層（conic 只用硬停點）、零輪廓線、零陰影、零透明度。墨黑與紙白是一對額外的「明度互補」。

```css
:root{--c0:#E0442B;--c1:#EE7B26;--c2:#F2B825;--c3:#9DBA3A;
      --c4:#1F8A5B;--c5:#3FA4D9;--c6:#1F3FA8;--c7:#6B3FA0;
      --rose:#E98BA6;--ink:#17161A;--canvas:#EDE4D0;--paper:#F7F1E3}
/* comp(i) = (i+4)%8 */
```

### 特徵 3｜字體：幾何無襯線大寫＋每一行坐在一塊平色場上
Sonia 的海報與 Transsibérien 把字壓在 pochoir 色塊上，每段換一個顏色。標題用 League Spartan 800–900 大寫、緊字距；中文用 Noto Sans TC 900。**字永遠不直接放在圓盤上**，一定先有一塊矩形色場；色場顏色之間也遵守特徵 2。英文字母 O 可以換成一枚四分圓盤。

```css
.field{display:inline-block;padding:.08em .32em .02em;line-height:1.05}
.f0{background:#E0442B;color:#F7F1E3}.f2{background:#F2B825;color:#17161A}
.o-disc{display:inline-block;width:.74em;height:.74em;border-radius:50%;
  background:conic-gradient(var(--a) 0 25%,var(--b) 0 50%,var(--a) 0 75%,var(--b) 0)}
```
```html
<h1><span class="field f0">圓</span><span class="field f6">光</span><span class="field f2">舞</span><span class="field f4">廳</span></h1>
```

### 特徵 4｜版面手法：偏心出血的巨盤＋夾在弧間的文字塊＋直式長卷
首屏一枚直徑 ≥110vh 的圓盤，中心落在畫面右下 3/4 處並出血兩邊；文字塊靠左、疊在盤緣上。長文用 Transsibérien 版式：左側 24–26% 一條疊圓色塊柱、右側文字欄。小圓盤互相重疊、上下錯落（不排成整齊的格子）。

```css
.hero .big{position:absolute;width:min(118vh,112vw);
  left:calc(78% - min(59vh,56vw));top:calc(58% - min(59vh,56vw))}
.prose{display:grid;grid-template-columns:minmax(120px,26%) 1fr}
```

### 特徵 5｜裝飾母題：旋轉與 Rythme sans fin（半圓串列）
圓盤的每一環以不同速度、交替方向慢慢轉（Robert Delaunay〈Rythme sans fin〉系列的連續半圓）；分隔線一律用上下交錯的半圓串列，不用直線。

```css
.rythme{height:28px;background:
  radial-gradient(circle at 50% 100%,#1F3FA8 0 13px,transparent 13.5px) 0 0/56px 28px repeat-x,
  radial-gradient(circle at 50% 0,#E0442B 0 13px,transparent 13.5px) 28px 0/56px 28px repeat-x}
```

## 3. 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 生畫布 canvas | #EDE4D0 | 唯一大面積地色 | 約 30% |
| 紙 paper | #F7F1E3 | 長文色場、面板 | 約 18% |
| 墨 ink | #17161A | 正文、導覽、價目色場 | 約 12% |
| 朱紅 c0 | #E0442B | 主強調、外環 | ≤10% |
| 群青 c6 | #1F3FA8 | 主強調對 | ≤10% |
| 鉻黃 c2 | #F2B825 | 亮點、現用態 | ≤8% |
| 翠綠 c4 | #1F8A5B | 朱紅的互補 | ≤6% |
| 橙 c1 / 天藍 c5 / 黃綠 c3 / 紫 c7 | #EE7B26 / #3FA4D9 / #9DBA3A / #6B3FA0 | 第三、四環 | 各 ≤4% |
| 玫瑰 rose | #E98BA6 | Sonia 的粉紅，只用於一環或一塊色場 | ≤3% |

文字色：深色場（c0 c4 c6 c7 ink）上用 paper；淺色場（c1 c2 c3 c5 rose paper canvas）上用 ink。朱紅底的白字只用於 ≥24px 大字（對比 3.9:1）。

## 4. 字體系統

- Google Fonts：`League Spartan` 400/600/800/900、`Noto Sans TC` 400/500/700/900。
- 字級：hero 中文 clamp(64px,10.5vw,150px) 900 / line-height .92；英文副標 clamp(30px,4.6vw,64px) 800 大寫；H2 clamp(28px,4vw,52px) 900；正文 16px / 1.7；標籤 11–13px League Spartan 800 字距 .12–.2em 大寫。
- 數字（價格、BPM）用 League Spartan 900，不用等寬字。

## 5. 版面與網格

- 無網格線；版面由圓盤決定。圓盤一律偏心、至少一枚出血。
- 零旋轉的文字（只有圓會轉，字不轉）。
- 留白：生畫布地色的空處 ≥25%；色場之間緊貼（gap 0），色場與圓盤之間不留白邊。
- 斷點：≤900px 巨盤移到頂部（寬 120vw、上緣 -34vw）文字接在下方；≤560px 長卷左柱縮為 28–56px 色條。

## 6. 元件配方

- **導覽（couple-orbit 雙圓舞伴）**：右上角墨色盒內四對互補小圓，每對＝一頁；現用頁那對持續自轉 60°/s，hover 加速；≤900px 變底欄。
- **按鈕**：平色矩形、零圓角、零陰影；hover 反成墨底紙字（`background:var(--ink);color:var(--paper)`）。按鈕組 gap 0、相鄰按鈕取互補色。
- **卡片**：不用卡片。資訊用「圓盤＋下方色場標題」或「色場磚＋右下角四分圓角飾」（`::after` conic 半透明 0、只露兩個象限）。
- **表格**：紙底、墨色表頭、每列左側 12px 色條標示所屬顏色。
- **表單／槽位**：空槽＝canvas 底＋2px 虛線外框；填入後換成該色色場。
- **footer**：墨底、標題鉻黃 League Spartan 大寫，上方必有一條 Rythme 半圓串列。

## 7. 動效規則（4 種，缺一不可）

| 類型 | 本站做法 | 觸發 | 數值 |
|---|---|---|---|
| ambient 環境 | 每枚圓盤各環以不同速度交替方向自轉；首頁六對舞伴沿圓軌以華爾滋 87 BPM 繞場（24 拍一圈） | 載入即開始 | 外環 5°/s、內環最高 22°/s；速度變化以 `cur+=(target-cur)*dt*6` 緩動 |
| input 輸入 | 游標所在的那一環翻成互補色並加速 6 倍，說明框即時寫出色名 | pointermove | 同一幀生效（<16ms） |
| transition 轉場 | 換頁時四分圓盤從點擊處 iris 張開，新頁從同一點收回；舞種切換時面板以 clip-path 圓形擦除 | 點內部連結／點舞盤 | 520ms 出、620ms 入，cubic-bezier(.6,0,.2,1) |
| signature 簽名 | 〈開舞〉：舞序圓盤把每一支舞依序轉到指針下，舞伴換成該舞的互補色對、以該舞 BPM 繞場（16 拍一圈） | 舞卡頁按「開舞」 | 每支 4s、轉盤 700ms cubic-bezier(.5,0,.2,1) |

`prefers-reduced-motion: reduce`：旋轉引擎不啟動（圓盤靜止但色段完整）、舞伴停在初始位置、iris 取消直接換頁、開舞改為每 1.8s 直接跳到下一支且無轉動、節拍燈恆亮。資訊零損失。
自我限制：本風格禁用淡入、禁用視差、禁用彈跳——它的運動只有「轉」。

## 8. 插畫與圖像風格（simultaneous-disc 同時圓盤構成）

全站沒有任何插圖或照片——所有圖像都是 conic-gradient 圓盤、radial-gradient 半圓與兩個重疊的圓（＝一對舞伴）。需要「人」的地方放兩枚互補小圓；需要「地圖」時用 inline SVG 平色矩形街道＋一枚四分圓標記；需要「裝飾」時放 Rythme 半圓串列。

## 9. Logo 與 Favicon 設計指南

Logo＝三環四分圓盤（外環朱紅／翠綠、中環鉻黃／群青、圓心紫／黃綠半圓）＋右側兩塊色場（墨底中文名、玫瑰底英文大寫）。Favicon 只用外環與中環，32×32 inline SVG data URI。禁止加描邊、陰影或漸層。

## 10. Do & Don't

**Do**：互補色硬邊相鄰／圓盤大而出血／字壓在色場上／每環轉速不同／分隔用半圓串列／用顏色做排序規則（例如舞卡的同時分）。
**Don't**：漸層（包含 conic 柔邊）／輪廓線／box-shadow 模糊／圓角卡片／毛玻璃／字直接放在圓盤上／相鄰色並排／把圓盤排成整齊網格／emoji icon／紫藍漸層 hero／置中三卡片／「EST. 19xx」徽章／Lorem ipsum。
與相近風格的分界：**歐普藝術**是黑白或高對比的錯視振動、形狀重複變形；本風格是飽和互補色的平塗圓盤、不追求錯視。**孟菲斯**是 squiggle、斑點圖樣與家具幾何；本風格只有圓與直半徑、零圖樣。**包浩斯**是三原色＋方圓三角的構成；本風格只有圓、用八色環。**Art Deco** 的放射扇是對稱鍍金；本風格是不對稱、零金屬。

## 11. 頁面骨架範例

```html
<section class="hero">
  <div id="discs" aria-hidden="true"></div>           <!-- JS makeDisc() 建巨盤 .big -->
  <div class="copy">
    <span class="kicker field fk">TAIPEI · 大稻埕</span>
    <h1><span class="field f0">圓</span><span class="field f6">光</span></h1>
    <p class="lede">一段放在紙色場上的導言。</p>
    <div class="ctas"><a class="f0" href="carnet.html">主要行動 →</a><a class="f2" href="danses.html">次要</a></div>
  </div>
</section>
<div class="rythme" aria-hidden="true"></div>
<section class="prose"><div class="col" aria-hidden="true"></div><div class="txt">…長文…</div></section>
```
```js
makeDisc(host,[
  {segs:[0,4,0,4],off:0,spd:5,w:.16},   // 外環 朱紅/翠綠
  {segs:[2,6,2,6],off:45,spd:-7,w:.15}, // 鉻黃/群青 錯開 45°
  {segs:[1,5,1,5],off:10,spd:9,w:.16},
  {segs:[7,3],off:90,spd:-22}           // 圓心 紫/黃綠 二分
],{live:true});
```

## 12. 技術實作與相容性

| 技術 | 本站承載 | 支援現況（查證來源） | 不支援時 |
|---|---|---|---|
| **conic-gradient() 硬停點**（A 渲染層） | 全站每一枚圓盤、每一環、導覽、舞卡圓盤、O 字盤 | MDN：Baseline Widely available，2020-11 起全瀏覽器（[MDN gradient](https://developer.mozilla.org/docs/Web/CSS/gradient)、[flaviocopes 硬停點語法](https://flaviocopes.com/css-conic-gradients/)） | 該環退為 background-color 首色（瀏覽器忽略無效 background），仍是平色圓 |
| **offset-path: path() 雙弧圓軌＋offset-distance**（B 動效層） | 舞伴繞場（首頁 ambient、舞卡簽名），offset-rotate:auto 讓一對舞伴隨切線轉向 | MDN offset：2022-09 起 Baseline（Chrome 55+／Firefox 72+／Safari 16+）。`offset-path: circle()` 基本形狀的支援資料不一致（[css-tricks](https://css-tricks.com/?p=249797) 稱 basic shape 不生效，[webreference](https://webreference.com/css/properties/offset-path/) 範例卻列出），故本站**不用 circle()**，改以兩段 SVG 弧 `M x-r y A r r 0 1 1 x+r y A r r 0 1 1 x-r y` 寫成 path() | `CSS.supports('offset-path','path("M0 0 L1 1")')` 為假時，改以 left/top＋rotate 計算同一圓周座標 |
| **CSS 三角函數 cos()/sin() 於 calc()**（C 版面層） | 舞種頁八枚舞盤沿色環就位（互補色正對面）；舞卡頁六個槽位與五個交界記號沿圓周就位 | Baseline Widely available，Chrome 111／Edge 111／Firefox 108／Safari 15.4，2023-03 起（[web.dev Trigonometric functions in CSS](https://web.dev/articles/css-trig-functions)、[MDN sin()](https://developer.mozilla.org/docs/Web/CSS/sin)） | `@supports not (translate:calc(cos(10deg)*1px))` 時 JS 以 Math.cos/sin 算出同一組 translate |

其他：旋轉全部共用一支 requestAnimationFrame，分頁隱藏時停止；換頁 iris 用 Web Animations `element.animate()`（不支援則直接換頁）；舞卡排舞器對 8P6＝20,160 種順序做剪枝深搜。

**效能實測**（建置環境無圖形瀏覽器，以下為 jsdom＋Node 22 實測與檔案量測）：
- 單頁大小：index ≈28KB、danses ≈28KB、carnet ≈35KB、salle ≈24KB（全部 inline，遠低於 350KB）。
- 排舞器：jsdom 中 2–3ms 完成全搜尋（Node 原型 9ms 含啟動）。
- 首屏 JS：只建立 DOM 與 conic 字串，無 canvas、無影像解碼；每幀只改 `rotate` 與 `offset-distance` 兩個屬性（皆不觸發 layout），無 layout 讀寫交錯（幾何只在 resize 時讀一次）。
