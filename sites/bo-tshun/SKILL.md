---
name: regular-division-woodcut
description: Escher-style regular division of the plane — every shape is one congruent creature tile that interlocks with zero gaps under translation, two-colour figure-ground, woodcut interior lines and a square-to-creature metamorphosis band.
---

# 平面規則分割・木刻密鋪（Regular Division of the Plane）

## 設計哲學

M. C. Escher 1922 與 1936 年兩度到格拉納達的阿罕布拉宮，抄下摩爾人的幾何磁磚，回荷蘭後做了一件摩爾人因宗教不做的事：**把每一塊磚畫成一隻生物**。他在筆記本裡編號畫了一百多張「對稱圖紙」（regelmatige vlakverdeling），自己整理出平移、旋轉、滑移反射的系統類型——比晶體學家 Caroline MacGillavry（1965《Symmetry Aspects of M. C. Escher's Periodic Drawings》）與數學家的整理還早；1958 年出版小冊《Regelmatige vlakverdeling》。代表作是木刻與石版：〈Metamorphosis II〉（1939–40，近 4 公尺的長卷）、〈Day and Night〉（1938）、〈Sky and Water I〉（1938）。Heinrich Heesch（1932）把「單一圖形密鋪平面」分成 28 型；Doris Schattschneider《Visions of Symmetry》（1990）整理了全部圖紙；Craig Kaplan 的 Escherization（2000）把它做成演算法。

為什麼它長成這樣：**限制是木版**。一塊版一色，所以只有 2–4 色平塗；刀只能刻線，所以生物的眼、鰓、鱗都是刻刀留下的內線；版是重複套印的，所以單一圖形反覆出現是製作上的必然，不是裝飾選擇。本風格的美感全部來自一條規矩：**推出去的地方，對邊凹進來同一塊**。

這份規格的範例實作是一間餅乾舖：錫模照平移分割打成，一張麵皮切完零邊料，每片面積恆等。風格不綁產業——任何「同一個單位反覆出現」的品牌（磁磚、布料、包裝、票券、遊戲）都能用。

## 本風格的 5 個不可省略特徵

### ① 零縫零疊的全等密鋪（平移 p1）
畫面上的生物全是**同一塊**，以格向量 a=(150,0)、b=(0,70) 平移鋪滿，零縫零疊。一塊只由兩條邊決定：上緣 T、左緣 L；下緣＝T 平移 b，右緣＝L 平移 a。拿掉它（改成散放的插圖）就不是這個風格。

```html
<!-- 一塊烏魚（150×70 格，可直接複製） -->
<path id="tp-fish" d="M0 0L8 1L19 1L31 2L40 2L46 1L51 0L54 -2L58 -4L63 -7L67 -10L71 -14L74 -16L76 -13L79 -10L82 -6L86 -3L90 -1L95 -1L100 0L104 1L108 3L112 5L116 7L118 9L120 8L122 6L124 4L128 2L133 1L140 1L146 0L150 0L149 1L149 2L148 4L146 5L145 7L142 10L140 13L136 16L133 19L130 22L127 25L125 28L123 30L121 33L119 35L118 36L119 38L122 40L124 43L127 46L129 49L132 52L134 54L137 56L140 59L143 61L145 63L146 64L148 66L149 68L149 69L150 70L146 70L140 71L133 71L128 72L124 74L122 76L120 78L118 79L116 77L112 75L108 73L104 71L100 70L95 69L90 69L86 67L82 64L79 60L76 57L74 54L71 56L67 60L63 63L58 66L54 68L51 70L46 71L40 72L31 72L19 71L8 71L0 70L-1 69L-1 68L-2 66L-4 64L-5 63L-7 61L-10 59L-13 56L-16 54L-18 52L-21 49L-23 46L-26 43L-28 40L-31 38L-32 36L-31 35L-29 33L-27 30L-25 28L-23 25L-20 22L-17 19L-14 16L-10 13L-8 10L-5 7L-4 5L-2 4L-1 2L-1 1Z"/>
<!-- 2×2 週期的 pattern：四份＋溢出副本，兩色棋盤交錯 -->
<pattern id="pat" width="300" height="140" patternUnits="userSpaceOnUse">
  <g transform="translate(0 0)"><use href="#tp-fish" fill="#DFAE4C" stroke="#1B1714" stroke-width="2.2"/></g>
  <g transform="translate(150 0)"><use href="#tp-fish" fill="#5B3322" stroke="#1B1714" stroke-width="2.2"/></g>
  <g transform="translate(0 70)"><use href="#tp-fish" fill="#5B3322" stroke="#1B1714" stroke-width="2.2"/></g>
  <g transform="translate(150 70)"><use href="#tp-fish" fill="#DFAE4C" stroke="#1B1714" stroke-width="2.2"/></g>
  <!-- 另補 i,j ∈ {-1,2} 的 12 份，讓伸出格外的鰭與尾也被畫到 -->
</pattern>
```



```js
// 對邊約束：只存 T、L，其餘自動導出
const poly=(T,L)=>[...T, ...L.slice(1).map(p=>[p[0]+150,p[1]]),
  ...T.slice(0,-1).reverse().map(p=>[p[0],p[1]+70]), ...L.slice(1,-1).reverse()];
```

### ② 每一塊都是一隻生物＋相鄰不同色（圖地互換）
2 色棋盤著色（p1 方格每塊只有 ±a、±b 四位鄰居，(i+j)%2 即可）。亮塊與暗塊面積相等，所以看久了圖與地會互換。暗塊上的刻線反白、亮塊上的刻線用墨。

```css
/* 刻線顏色跟著餅色反轉 */
use.tile[data-k="0"]{fill:#DFAE4C} use.det[data-k="0"]{color:#1B1714}
use.tile[data-k="1"]{fill:#5B3322} use.det[data-k="1"]{color:#F3EAD6}
```

### ③ 變形帶 Metamorphosis
同一張圖從方格（棋盤）漸變成生物、再變成另一種生物；**每一個中間態都仍是合法密鋪**。做法：邊的控制點對 t 線性內插（t=0 投影回直線），欄與欄的共用邊用「邊界上的 t」計算，兩側算出一模一樣的線，所以不會裂縫。

```js
// 第 c 欄：左緣用 s(c/C)、右緣用 s((c+1)/C)、上下緣用 s((c+.5)/C)
const col=c=>poly(E('T',s((c+.5)/C)), E('L',s(c/C)), E('L',s((c+1)/C)));
// s：0 方格 → 1 烏魚（平台 0.38–0.62）→ 2 招潮蟹；E 對 s 是取樣點的線性內插
```



### ④ 木刻線質
近黑 #1B1714 外輪廓 2–2.4px、stroke-linejoin:round；內部只有刻刀線（眼、鰓弧、鱗、鰭條、腳），線寬 1.5–1.8、圓頭。平塗 2–4 色，**零漸層、零陰影、零發光、零透明疊色**（唯一例外：變形帶中刻線隨變形程度淡入）。刀紋可以 clip 在餅形內鋪滿：

```html
<clipPath id="uclip"><use href="#ut"/></clipPath>
<g clip-path="url(#uclip)"><path d="M-34 -20q6 5 0 9 M-22 -20q6 5 0 9 …" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g>
```

### ⑤ 格網鬼影與編號
原始格子永遠看得見：鉛筆細線（7–16% 墨）虛線格疊在圖上或鋪在頁底；每一款圖形有手稿式編號（No. 1、No. 2…）與系統名稱（平移 I）。這是 Escher 筆記本的語彙，也是讀者理解「它為什麼拼得起來」的鑰匙。避免 mono 字體與工程圖角標——編號用襯線（Gloock）。

```css
body{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='70'%3E%3Cpath d='M0 .5H150M.5 0V70' stroke='%231B1714' stroke-opacity='.07' fill='none'/%3E%3C/svg%3E")}
.no{font:400 13px/1 "Gloock",serif;letter-spacing:.2em}
```

## 色彩系統

| 名稱 | hex | 用途 | 比例 |
|---|---|---|---|
| 麵粉紙 Paper | #F3EAD6 | 頁底、暗塊上的刻線 | ~35% |
| 奶油 Butter | #DFAE4C | 亮塊 | ~25% |
| 可可 Cocoa | #5B3322 | 暗塊、頁尾 | ~25% |
| 墨 Ink | #1B1714 | 輪廓、文字、亮塊刻線 | ~10% |
| 紅麴 Beni | #B0412E | 唯一強調：作用中把手、錯誤斜線、鄰居描邊 | ≤3% |
| 抹茶 Matcha | #6E8B3D | 可選的第三塊色 | 選用 |
| 錫 Tin | #8E9493 | 錫模（空心輪廓） | ≤2% |
| 次紙 Paper2 | #EADDC2 | 鬼影鄰居、麵皮底 | ≤5% |

規則：亮暗兩塊面積必須相等；相鄰兩塊不得同色；強調色只做「指出」不做「填滿」。

## 字體系統

- **Noto Serif TC** 400／700／900（Google Fonts）：標題 900、內文 400、標籤 700 加 0.12–0.3em 字距。
- **Gloock**（Google Fonts）：拉丁字、編號、數字（21.0、No. 2、NT$）。
- 字級：h1 clamp(64px,10vw,150px)／h2 clamp(30px,4.6vw,56px)／h3 22px／內文 16px 行高 1.85／註記 13px。
- 不用 mono（避免落入工程製圖家族）。

## 版面與網格

- 格向量即版面模數：150×70 的鉛筆格鋪滿頁底，區塊寬度盡量是 150 的倍數感。
- 2px 墨線分區、零圓角；卡片只有雙框（外 2px 實線＋內 1px，間距 5px）。
- 首屏是**一條橫貫全寬的變形帶**（上下 2px 墨線夾住，高 clamp(190px,44vh,430px)），帶子比視窗寬，捲動時一邊變形一邊左移。
- 不對稱：標題左 1.2fr、資料卡右 .8fr；三托盤等寬只出現在中段一次。
- 留白：區塊間 80–100px。

## 元件配方

- **導覽（餅模掛勾）**：一條錫色橫桿（3px #8E9493 夾 1px 墨線），三支空心錫模（即三款餅形輪廓）掛在 2×12px 掛勾上；現用頁那支被「填進麵團」（fill 奶油、stroke 墨）並下沉 3px；hover 盪 −9°（cubic-bezier(.3,1.6,.5,1) .35s）。≤560px 移到底部三等分。
- **按鈕**：墨底紙字、2px 墨框、零圓角；ghost 版透明底，hover 奶油底；按下 translateY(2px)。
- **卡片**：雙框；托盤卡＝上半 pattern 圖、2px 線、下半說明。
- **表單**：2px 墨框、零圓角、紙底；單選用「餅形色票」或反白 chip。
- **頁尾**：可可底紙字，頂端 46px 一條半尺寸烏魚密鋪帶。

## 動效規則

| 種類 | 實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| signature 變形帶 | 每欄 <path> 加 SMIL `<animate attributeName="d">`（25 關鍵影格、dur 10s），`svg.pauseAnimations()` 後以捲動進度 `setCurrentTime(τ·10)` | 捲動（hero 270vh、sticky） | 線性，跟手 | 仍由使用者捲動驅動；HTML 預設即 τ=.5 的完整靜態漸變，資訊不損失 |
| ambient 托盤 | pattern 上 SMIL `animateTransform`（additive="sum"）平移整一週期：烏魚 −300px/16s、方磚 140px/22s、招潮蟹橫行 40px 往返 5s | 自動；點托盤停／走 | linear、indefinite | `pauseAnimations()` 停格 |
| input 鄰居描邊 | 指到變形帶任一塊，紅麴 6px 描它、3.5px 虛線描它唯一的四位鄰居 | pointermove | 即時（<16ms） | 同 |
| input 編輯器 | 拖把手 → 只改一條 path d，30 塊麵皮同步 | pointer／方向鍵 | 即時 | 同 |
| transition 換頁 | 全螢幕以 .7 倍烏魚餅一塊塊壓下（scale 0→1 .26s cubic-bezier(.3,1.4,.5,1)，延遲依距點擊處距離 0–340ms），下一頁一塊塊掀開（.3s） | 站內連結 | 見左 | 不播放，直接換頁 |
| transition 換錫模 | 邊線取樣逐點補間 420ms（easeInOutQuad），中途每格仍合法 | 按 No. 1–3 | 420ms | 立即切換 |
| 切 | 錫模空心輪廓沿蛇行順序每 48ms 壓一塊，被壓的塊 scale .94→1 | 按「切」 | .32s 彈性 | 全部同時完成 |

自我限制：不用淡入當主打、不用視差、不用跑馬燈。

### motion-library 元件（v1.28.1 @95eb095，`tools/ml-embed.js` 子集 inline 為每頁第一個 <script>）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| TXT-B-38 | Text Mosaic | index | text「切到無賰」, colors {#5B3322,#DFAE4C,bg #F3EAD6}, duration 1.8, loop:false, seed 1991, 16:9 | 字從粗方塊馬賽克收斂成形——「格子變成形」的文字版；純像素塊、無漸層無發光 |
| BG-A-03 | Tile Rotate | index | colors 同上, duration 9, density 1.2, intensity .9, seed 21 | 四分之一弧磚依格旋轉、相鄰兩色交替——旋轉系統的格子；平塗線條 |
| SHP-09 | Shape Morph | cutter | colors {#5B3322,#B0412E,#F3EAD6}, duration 4.5, seed 7, 1:1 | 單一形狀圓→方→三角變形、底是淡格線——說明「每支錫模從方格開始」 |
| TXT-B-14 | Domino Letters | tins | text「盒與價」, duration 1.6, loop:false, seed 24 | 字像骨牌倒下排好——餅一塊塊排進盒 |
| BG-A-01 | Grid Fill | tins | colors {#DFAE4C,#5B3322,#F3EAD6}, duration 8, density 1.1, seed 48 | 方格依序填色＋格線——盒子一格格裝滿，也是特徵⑤格網 |

掛載：等 `document.fonts.ready`；IntersectionObserver 離屏 `destroy()`、回視窗重掛；一次性文字元件只播一次；canvas aria-hidden，容器內保留 HTML 標題（.ml-fb）掛載成功才視覺隱藏；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。開發 Prompt 見 `MotionLib.prompt(id)`。

## 插畫與圖像風格

全站沒有一張插圖是「畫出來放上去」的——全部是同一支幾何引擎的輸出：餅形（Catmull-Rom 平滑＋刀尖點）、木刻內線、兩色交錯。生物設計原則：頭與尾在左右緣（嘴頂進前一隻的尾叉）、鰭與腳在上下緣（背鰭塞進上一排的肚子）；刀尖點（sharp）留給鰭尖、尾叉、螯尖、腳尖。新生物先在 150×70 方格裡畫 T 與 L，用鞋帶公式確認面積仍是 10,500、多邊形不自交。

## Logo 與 Favicon 設計指南

- Logo：兩尾互咬的烏魚（奶油＋可可）＋「無賰」900 字與 BÔ-TSHUN（Gloock），紅麴 3px 底線。
- Favicon：奶油底上一尾可可烏魚＋紙色眼，inline SVG data URI。
- 規則：logo 本身必須是密鋪的一個片段（至少兩塊咬合），不得單獨一隻。

## Do & Don't

- Do：讓每一塊都是同一塊；讓對邊照抄；讓格子看得見；讓兩色等面積。
- Do：用一條變形帶說故事（方格 → 生物 A → 生物 B）。
- Don't：散放、旋轉不同角度的單隻插圖（那只是 icon）。
- Don't：漸層、柔影、發光、玻璃擬態、圓角卡片。
- Don't：複製 Escher 原作的特定蜥蜴、鳥、魚設計——方法可用，圖形要原創。
- 去AI化禁令照舊：禁紫藍漸層、禁 emoji icon、禁置中三卡片模板、禁 Lorem ipsum、禁 EST. 徽章。

## 頁面骨架範例

```html
<header class="mast"><a class="brand" href="index.html">…兩尾互咬的 logo…<b>店名</b></a>
 <nav><ul class="hooks"><li><a href="index.html" aria-current="page"><i class="hk"></i><svg viewBox="-36 -24 244 118"><path d="…方磚…"/></svg><span>整張麵皮</span></a></li>…</ul></nav></header>
<section class="hero" style="height:270vh"><div class="pin" style="position:sticky;top:0;height:100vh">
 <div class="hhead"><h1>店名</h1><aside class="card">No. 1–3・平移 I・每片 21.0 g</aside></div>
 <div id="stripband"><svg id="strip" viewBox="0 0 2400 350">…每欄一條 path＋每列 use…</svg></div>
 <div class="hfoot">方磚 → 烏魚 → 招潮蟹　<span id="morph-rd">50</span>% 已變形</div></div></section>
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況與查證 | fallback |
|---|---|---|---|---|
| SVG `<pattern>` 平鋪＋`patternTransform` | A 渲染（SVG pattern 平鋪） | 特徵①②——托盤、盒內、頁尾、比較圖全部是 pattern；一個 <path> 被 16 份 <use> 引用 | MDN〈<pattern>〉〈patternTransform〉：Baseline Widely available（屬性跨瀏覽器 2020-01、DOM 屬性 2015-07）；SVG2 的 CSS transform 用在 pattern 上支援差，故用屬性 | 無 |
| SVG SMIL `<animate attributeName="d">`＋`pauseAnimations()`／`setCurrentTime()` | B 動效時間軸（SMIL） | signature 變形帶、托盤 ambient | caniuse〈SVG SMIL animation〉：Chrome 5+、Firefox 4+、Safari 6+、Edge 79+、iOS 6+，僅 IE 與 Opera Mini 不支援；MDN〈SVGSVGElement.setCurrentTime()〉Baseline Widely available（2015-07）。d 內插要求兩路徑指令結構相同——本站每條邊固定 32 段，所以全部是 M＋127L＋Z | SMIL 不執行時路徑停在 HTML 內建的 τ=.5 靜態漸變（方格→烏魚→招潮蟹完整可見） |
| 約束求解／規則引擎（Beauquier–Nivat 平移條件） | E 資料與生成 | func 與特徵①③——對邊自動導出、O(n²) 線段相交檢查（128 點約 8k 次 <1ms）、鞋帶面積、FNV-1a 代號、`?t=` base64url 序列化 | 純 JS | 無 JS：noscript 說明改用方格紙拍照下單；首頁與盒價頁所有圖為靜態 SVG |

**效能實測（建置期 node）**：index.html 338KB／cutter.html 312KB／tins.html 305KB（各含約 244KB motion-library 子集）。首頁 JS 建 17 條 SMIL（25 影格）約 4ms；編輯器拖曳一次重算 128 點＋簡單性檢查 <1ms，只改一條 path d。同一畫面同時運轉的 motion-library 元件 ≤1。jsdom 實跑三頁零錯誤；librsvg 算圖檢查變形帶零縫。

查證來源：
- https://caniuse.com/svg-smil
- https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement/setCurrentTime
- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/pattern
- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/patternTransform
