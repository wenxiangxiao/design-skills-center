---
name: cinetismo-physichromie
description: Venezuelan kinetic-art colour style after Carlos Cruz-Diez — equal-width parallel strips only, real 3D double-faced fins whose visible colour depends on where the viewer stands, an additive third colour in every seam, black-and-white induction line fields as ground, and headlines sliced into stripes.
---

# 委內瑞拉動態藝術・Cruz-Diez 物理色 Cinetismo venezolano · Physichromie — 風格規格書

示範站：`sites/sann-bin`（三面葉百葉工場，新竹北大路的雙面漆直立簾與鋁鰭片工場）。

## 設計哲學

1950 年代的卡拉卡斯，一群委內瑞拉畫家把「幾何抽象」推到下一步：畫面不必畫任何東西，**顏色本身就是事件**。Alejandro Otero 1955–60 的〈Coloritmos〉是漆在長木板上的平行黑條與色條；Jesús Rafael Soto 1955 年參加巴黎 Galerie Denise René 的〈Le Mouvement〉；同年 Carlos Cruz-Diez（1923–2019）去看了那個展，1959 年在卡拉卡斯做出第一件〈Couleur Additive〉與第一件〈Physichromie〉，1960 年移居巴黎。Physichromie 的作法是把紙板、鋁片或壓克力條**垂直立在平面上**，兩層交替（一層平、一層凸起）；顏色會隨觀者的位置、距離與環境光角度增生——走過去，作品就變色。之後是 1963–64 的〈Induction Chromatique〉（黑白線場誘導出畫面上不存在的色）、1965 的〈Chromosaturation〉（紅綠藍三個單色房間），以及 1974 年邁克蒂亞（Maiquetía）西蒙玻利瓦國際機場那片地板〈Ambientación Color Aditivo〉。Cruz-Diez 1989 年出版《Reflexión sobre el color》，把八條研究線寫成方法。

為什麼長成這樣：(1) 材料是工業的——條是鋁、壓克力、絹印紙板，**等寬、等距、直的**，因為它們是被機器裁出來的；(2) 顏色不能靠調和，只能靠**並置與視點**，所以每一條的寬度與順序都是計算；(3) 作品要給「街上的人」看（Cruz-Diez 一直強調公共與社會面），所以它必須在你走動時發生，而不是掛在那裡讓你靜觀。

網頁上它的力量來自一個簡單的事實：**游標就是觀者的身體**。畫面不是動畫，而是一個你用位置去讀的物件。

## 本風格的 5 個不可省略特徵

### 1. 只有等寬平行直條

全站唯一的形狀是寬度相同的直條（葉、縫、細線、色帶）。零曲線、零斜線、零圓角、零圓形 icon。版面的節奏就是條距；按鈕、圖示、行人、地圖街廓都用條拼。

```css
*,*::before,*::after{border-radius:0}
.bar{display:inline-block;width:6px;height:16px;
 background:linear-gradient(90deg,#E2231A 0 2px,#F7C600 2px 4px,#1D3FBF 4px 6px)} /* 硬停點，不是漸層 */
.ped{width:16px;background:linear-gradient(90deg,#141414 0 4px,transparent 4px 6px,#141414 6px 10px,transparent 10px 12px,#141414 12px 16px)} /* 一個「人」 */
```

### 2. 加色：兩色相鄰處必有第三色

兩種顏色從不直接相碰。它們之間永遠有一條窄縫（條距的 30%），縫的顏色是兩鄰色在 OKLab 的中點。這是 Couleur Additive 的網頁版——顏色不是被填上去的，是被加出來的。

```css
.seam b{background:var(--a)}                                   /* 後備 */
@supports (color:color-mix(in oklab,red,blue)){
 .seam b{background:color-mix(in oklab,var(--a),var(--b))}}   /* 號誌紅＋群青 → 縫 */
```

### 3. 視點即色：真 3D 雙面鰭片（Physichromie）

主視覺是一面鰭片牆：每片鰭垂直於牆面，**西面一色、東面一色**；`perspective-origin` 就是觀者站的位置。站在西邊看到全部西面、站在東邊看到全部東面、正對時左半邊是東面右半邊是西面，縫裡露出加色與底座線場。觀者的位置由游標／手指／行人滑桿決定，閒置 2.6 秒後由「路人」以 16 秒週期替你來回走。

```html
<div class="pc" style="--n:40">
 <div class="pc-base"><b style="left:2.5%;--a:#1F9E4A;--b:#E2231A"></b>…</div>
 <i class="fin" style="left:1.25%;--w:#E2231A;--e:#1F9E4A"><u></u><u></u></i>…
</div>
```
```css
.pc{position:relative;container-type:inline-size;perspective:560px;perspective-origin:var(--vx,50%) 42%;overflow:hidden;
 background:repeating-linear-gradient(90deg,#141414 0 1.5px,var(--base,#EDECE7) 1.5px 6px)}
.fin{position:absolute;top:0;bottom:0;width:calc(100cqw / var(--n) * 1.25);transform-origin:0 50%;transform:rotateY(-90deg);transform-style:preserve-3d}
.fin u{position:absolute;inset:0;backface-visibility:hidden;background:var(--w)}           /* 西面 */
.fin u+u{transform:rotateY(180deg);background:oklch(from var(--e) calc(l - .05) c h)}        /* 東面，背光暗一階 */
```
```js
/* t∈[0,1] 觀者位置 → perspective-origin，-15%…115% 讓兩端都能「走過頭」 */
SB.view=(el,t)=>{el.style.setProperty('--vx',(-15+t*130)+'%');el.style.setProperty('--vxn',t)};
```

### 4. 誘導線場：黑白細線是所有顏色的地

色從不放在純色底上。底座、時間表、地圖街廓、空狀態一律是 1.5px 黑線／4.5px 地色的線場；說明 Induction 的區塊再疊一層 1.5px 白線，兩層以 22s／31s 反向漂移。不用外框線來「收」色塊，也不用陰影。

```css
:root{--lines:repeating-linear-gradient(90deg,#141414 0 1.5px,#EDECE7 1.5px 6px)}
.ind::before{content:"";position:absolute;inset:-20px -40px;background:repeating-linear-gradient(90deg,#141414 0 2px,transparent 2px 7px);animation:drift 22s linear infinite}
.ind::after {content:"";position:absolute;inset:-20px -40px;background:repeating-linear-gradient(90deg,#F4F3EE 0 1.5px,transparent 1.5px 9px);animation:drift 31s linear infinite reverse}
@keyframes drift{to{transform:translateX(35px)}}
```

### 5. 字也是條

大標以直條切開（字被條紋填滿，像隔著一扇簾看字），條色跟著觀者位置在兩色間換；標籤用作品編號式「N° 0001」「Physichromie de vitrine」；正文用中性無襯線（Archivo／Noto Sans TC），字從不描邊、不加陰影、不傾斜。

```css
.striped{background:repeating-linear-gradient(90deg,var(--sa,#141414) 0 var(--sw,3px),var(--sb,#E2231A) var(--sw,3px) calc(var(--sw,3px)*2));
 -webkit-background-clip:text;background-clip:text;color:transparent;background-position:calc(var(--vxn,0)*12px) 0}
@supports not ((-webkit-background-clip:text) or (background-clip:text)){.striped{color:#141414;background:none}}
.no{font:700 12px/1 "Archivo";font-stretch:80%;letter-spacing:.14em;text-transform:uppercase}
```

## 色彩系統

九罐烤漆＝全站唯一的色源。中間色只准是其中兩罐在 OKLab 的內插（縫、漸進葉色）。

| 代號 | 名稱 | hex | 用途 | 比例 |
|---|---|---|---|---|
| — | 鋁白（頁面地） | `#EDECE7` | body、線場的地 | ~38% |
| W | 葉白 | `#F4F3EE` | 文字欄、白面葉、休息色 | ~18% |
| K | 烤漆黑 | `#141414` | 正文、線場、導覽底、每 3–5 片切一片 | ~16% |
| R | 號誌紅 | `#E2231A` | 首頁頁色、西面暖色起點 | 光譜合計 ~26% |
| O | 柿橘 | `#F26A1B` | 暖色過渡 | |
| Y | 鉻黃 | `#F7C600` | 來工場頁色、今天 | |
| G | 竹綠 | `#1F9E4A` | 型錄頁色、開工中 | |
| C | 湖青 | `#00A0B8` | 冷色過渡 | |
| B | 群青 | `#1D3FBF` | 走過去頁色、東面冷色 | |
| M | 洋紅 | `#D6157E` | 冷暖交界、強調 | |
| — | 中灰 | `#6E6F6B` | 次要說明（≤2%） | |

規則：一面葉只用一色；西面偏暖、東面偏冷是預設（早上陽光從東邊來，西面在陰影裡反而要亮）；兩面亮度差 <0.12 時必須插一片 K 或 W；Chromosaturation——每一頁有一個飽和頁色（R/G/B/Y），只出現在導覽現用葉與換頁百葉。

## 字體系統

- 來源：Google Fonts `Archivo`（可變 `wdth 62–125`、`wght 400–900`）＋ `Noto Sans TC` 400／700／900。
- 字級：大標 `clamp(64px,9.4vw,150px)`／900／行高 .92／字距 −.03em（中文）；區段標 `clamp(34px,4.6vw,64px)`／900；小標 22–30px／900；正文 16px／400／1.7；導言 18px；標籤 11–12px／700／`font-stretch:75–80%`／字距 .12–.14em 全大寫。
- 中文大標一律 `.striped`（條寬 3–5px）；拉丁標籤 Archivo 壓窄。數字（價目、尺寸）用正文字重 700–900，不另用等寬字。

## 版面與網格

- 整站零旋轉；所有分隔是 1.5px 黑實線；欄與欄之間用一條線而不是留白卡片。
- 首屏 `1.55fr : 1fr`：左邊整塊鰭片牆（滿高，無邊距），右邊文字欄是葉白紙。
- 內容用 12 欄：示範區 7 欄＋說明 5 欄，下一列左右對調（不對稱交錯）。
- 條距是版面的單位：導覽寬 76px、葉距 `100cqw/n`；區段上下間距 96px。
- 留白規則：色塊旁邊不留白，留線場；文字旁邊才留白。

## 元件配方

- **導覽（直立簾葉）**：右緣 76px 黑條上直立四片葉，`perspective:400px`；每片兩面：正面＝頁色＋直排頁名、背面＝葉白＋英文；非現用 `rotateY(62deg)`（側著只露 N°）、hover `28deg`、現用 `0`（正對）。≤560px 改底部 64px 橫排。
- **按鈕**：黑底葉白字、零圓角，內含一個 6×16 的三色小條 `.bar`；hover 三色順序翻轉。次按鈕＝葉白底＋1.5px 內框（`box-shadow:inset 0 0 0 1.5px`，無模糊）。
- **色票（chip）**：高瘦直條，底部 1.5px 線上一塊葉白標籤（名稱＋SB-R01＋hex）；hover 時中央打開一條 18px 線場縫。
- **表單**：欄位鋁白底＋1.5px 內框；塗色列＝24 格直條，按住拖過即塗（中間跳過的格子補上）。
- **時間表**：七根直條，底是線場、開工時段是竹綠條、導覽時段是鉻黃條、今天的線場換成黃黑。
- **footer**：頂端 14px 七色條（12px 一色），黑底三欄。

## 動效規則

| 種類 | 本站自製實作 | 觸發 | 參數 |
|---|---|---|---|
| ambient | 「路人」：首頁鰭片牆閒置 2.6s 後以 16s 正弦週期來回走；Induction 雙層線場 22s／31s 反向漂移 | 時間 | 追隨係數 .08／幀；`linear` |
| input-driven | 游標 X（或觸控、← →）＝觀者位置，同一幀寫進 `perspective-origin` 與條紋字色 | pointermove | 追隨 .35／幀（約 50ms 到位） |
| transition | 百葉換頁：16 片（手機 8 片）目的頁色的葉 `rotateY(-90→0)` 合上（380ms、由右往左每片延遲 20ms）→ 換頁 → 新頁 `0→90` 打開（420ms、22ms 錯開） | 點內部連結 | `cubic-bezier(.7,0,.25,1)`，WAAPI |
| signature | Physichromie 視點即色：真 3D 雙面鰭片＋縫中加色，顏色由你站的位置決定 | 位置 | `perspective:560px`、鰭深 1.25×葉距 |

reduced-motion：路人不走（只有使用者自己移動才變）、線場停住、百葉換頁取消、「走一趟」改為一次跳一段（西→正面→東），motion-library 背景停在 `seek(.35)`、文字元件 `seek(1)`。資訊零損失：三個視點另有靜態對照圖（N° 0001-W／0／E）。

自我限制：不用淡入、不用滾動揭示、不用彈跳——這個風格的運動來自觀者，不來自物件。

### motion-library 元件

來源 `wenxiangxiao/motion-library` v1.9.0 @6e9435f。產生：`node tools/ml-embed.js <ml>/src/motion-lib.js BG-B-37,TXT-A-33,TXT-B-14,SHP-32 6e9435f > mlsub.js`，再接上 `src/motion-player.js`（`mount()` 播放器），每頁 inline 為第一個 `<script>`；冒煙 `node tools/ml-smoke.js mlsub.js …` → `smoke ok`。提示詞可用 `MotionLib.prompt(id)` 取得。掛載包裝 `SB.ml()`：等 `document.fonts.ready`、IntersectionObserver 離屏即 `destroy()`、一次性文字 `once`、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`。

| ID | 名稱 | 頁 | 角色 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-37 | Minimal Stripes | index | ambient | `colors:{primary:#E2231A,secondary:#1D3FBF,bg:#EDECE7}`、duration 9、density 1.6、seed 1968、16:9（以 220px 帶裁切） | 「每一片都有兩面」色帶：紅藍直條在鋁白上滑動、寬窄呼吸——只有 `fillRect` 直條、零圓角零發光，正是 Otero〈Coloritmos〉式的平行色條節奏 |
| TXT-A-33 | Slice Text | kata | transition | `text:'葉片型錄'`、`colors:{#1F9E4A,#F26A1B,#EDECE7}`、duration 2.6、once | 標題被切成六條、綠橘兩色交錯滑進來對齊成墨字——字被條切開正是特徵 5；只進場一次 |
| TXT-B-14 | Domino Letters | walk | transition | `text:'走過去'`、`colors:{#1D3FBF,#F7C600,#EDECE7}`、duration 2.2、once | 字一個個像葉片繞樞軸翻正——就是直立簾葉轉 90° 的動作 |
| SHP-32 | Stairs Rise | visit | ambient | `colors:{primary:#F7C600,secondary:#D6157E,bg:#EDECE7}`、duration 2.4、loop、1:1 | 七根直條依序升起、顏色由鉻黃逐條加到洋紅——五道工序旁的「一片一片排上去」，等寬直條＋兩色內插，就是加色 |

## 插畫與圖像風格

全站沒有插畫，只有**鰭片浮雕（fin relief）**：任何「圖」都是一組 n 片雙面葉＋縫＋線場。案例圖＝同一扇簾從某一頭看的樣子；地圖＝線場街廓＋鋁白的路；時間表＝直條；行人＝三根黑條。照片、人物、物件剪影一律不用。

## Logo 與 Favicon 設計指南

Logo：三片色葉（紅、黃、藍）各帶一條窄的加色縫（紅＋橘、黃＋綠、藍＋紫），之間以黑條分隔，底下是 12 條 1.5px 線場；右側中文「三面葉」900、拉丁 `SANN-BĪN-HIO̍H` Archivo 800 字距 3。Favicon：32×32 葉白底，紅黃藍三條、中間兩條黑。禁止圓形、斜線、漸層。

## Do & Don't

- Do：每兩色之間留一條加色縫；讓游標＝觀者；兩面亮度差不夠就插黑或白；所有圖都用條排。
- Do：給 reduced-motion 和無 JS 一張「三個位置」的靜態對照。
- Don't：圓角、陰影、模糊、平滑漸層、斜線、曲線、圓形頭像、icon 字型、emoji。
- Don't：把顏色放在純色底上「單獨展示」——它一定要被另一色或線場框住。
- Don't：把 Physichromie 做成假的（用 2D 漸層模擬）；鰭片必須是真的 3D 平面，看到的面由透視決定。
- 去AI化：禁紫藍漸層 hero、置中三卡片、Lorem ipsum、EST. 徽章、「把 X 變成 Y」標題。

## 頁面骨架範例

```html
<body>
<nav class="rail"><a class="brand" href="index.html">…</a><ul>
 <li><a class="slat on" href="index.html" style="--pc:#E2231A;--pi:#fff"><span class="face f-w"><em>N° 01</em><strong>工場</strong></span><span class="face f-e"><em>WORKS</em></span></a></li>…
</ul></nav>
<main>
 <section class="hero">
  <div class="hero-wall"><div class="pc hero-pc" style="--n:40">…鰭片…</div></div>
  <div class="hero-txt"><p class="no">Physichromie de vitrine · N° 1968</p>
   <h1><span class="striped">三面葉</span><small>百葉工場</small></h1>
   <p class="lead">站的位置，就是顏色。</p><a class="btn" href="walk.html"><span class="bar"></span>走過去</a></div>
 </section>
 <section class="sec"><div class="sec-h"><p class="no">三種顏色的行為</p><h2>…</h2></div><div class="beh">…</div></section>
</main>
<footer class="foot">…</footer>
</body>
```

## 技術實作與相容性

| 技術 | 本站承載 | 支援現況與查證 | 不支援時 |
|---|---|---|---|
| CSS 3D：`transform-style:preserve-3d`＋`backface-visibility`＋**`perspective-origin` 由觀者位置驅動**（A 渲染層） | 特徵 3／signature：40 片（工作台 24 片）雙面鰭片，看到哪一面完全由透視決定 | MDN：`perspective-origin` Baseline Widely available（2015-09）；`preserve-3d`、`backface-visibility` 同屬 Widely available | 鰭片以 HTML 靜態輸出（無 JS 也在）；不支援 3D 時鰭片落為正面平條，仍看得到西面色＋縫 |
| `color-mix(in oklab, A, B)`＋相對色語法 `oklch(from var(--e) calc(l - .05) c h)`（C 樣式層） | 特徵 2：每條縫的加色；東面背光暗一階 | MDN `color-mix()`：Chrome/Edge 111、Firefox 113、Safari 16.2，Baseline 2023；相對色語法 Chrome 119、Safari 18、Firefox 128 起全面支援（Frontend Masters 2024 整理） | `@supports` 包住：縫退為鄰面原色、東面不加暗；文字讀數另以 JS OKLab 算出同一個 hex |
| Web Animations API 群組編排（B 動效層） | transition：百葉合上→換頁→打開，16 片錯開 20–22ms，`finished` Promise 接換頁 | WAAPI `Element.animate()` Baseline Widely available | reduced-motion 或無 JS：直接換頁；`pageshow persisted` 時清掉殘留百葉 |
| （輔）Pointer Events＋setPointerCapture、URLSearchParams＋history.replaceState、container query 單位 `cqw` | 拖過塗色、`?p=` 49 碼記住一扇簾、鰭深＝`100cqw/n` | 皆 Baseline Widely available（cqw 2023） | 塗色列每格是 `<button>`，點擊／鍵盤 Enter 也能塗 |

查證來源：MDN `perspective-origin`（developer.mozilla.org/docs/Web/CSS/perspective-origin）、MDN `color-mix()`（developer.mozilla.org/docs/Web/CSS/color_value/color-mix）、Chrome Developers〈CSS color-mix()〉、Frontend Masters〈Relative Color Syntax — Basic Use Cases〉；`@view-transition` 跨文件換頁經 caniuse 查證 Firefox 仍不支援（Chrome 126／Safari 18.2 起），故本站換頁改用 WAAPI 百葉，不依賴它。

效能實測（headless Chromium 141，1280×800）：四頁 ScriptDuration 11–86ms（含 motion-library 掛載）；首頁閒置路人＋BG-B-37 同畫面共 1 個元件、主迴圈 59.5fps；頁面大小 106–120KB（含 83KB 元件子集）；鰭片每幀只改一個自訂屬性 `--vx`，無 layout thrashing。

外部參照：Wikipedia〈Carlos Cruz-Diez〉（八條研究線、1959 Physichromie／Couleur Additive、1974 Maiquetía 地板）；Cruz-Diez《Reflexión sobre el color》1989（Yale University Press 英譯本《Reflection on Color》）；MoMA 1965〈The Responsive Eye〉；Alejandro Otero〈Coloritmos〉1955–60；Galerie Denise René〈Le Mouvement〉1955。
