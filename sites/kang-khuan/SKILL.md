---
name: fluxus-maciunas-kit
description: Fluxus / George Maciunas kit-box graphics — condensed typewriter sans enlarged line-by-line to fill, reverse printing, type set as pattern, compartment-box grids and typewritten event-score cards, black ink only on coloured card stock.
---

# Fluxus 盒裝平面 Fluxus Kit-Box Graphics（Maciunas 派）

> 範例站：同款早餐 KĀNG-KHUÁN（永和豆漿店 × Fluxus）。本規格書不綁產業；任何「把日常行為寫成指令」的品牌都能用。

## 設計哲學

Fluxus（1962 年起，紐約／威斯巴登）不是一種裝飾風格，而是一套**便宜、可複製、把生活變成演出**的製作方式。統籌者 George Maciunas 幾乎一手包辦了整個團體的平面設計：依 Artforum 的整理，他大約有八年的文字幾乎全部來自一台打窄體無襯線字的打字機，變化只靠三件事——**照相放大（photostat）、反白印刷、把字排成圖樣**。作品被裝進塑膠分格盒（Fluxkit、Flux Year Box）郵購；最有名的單位是「事件譜」（event score）：一張卡片、一個標題、一兩句叫你去做的指令。

所以這個風格的三條底線：

1. **經濟就是美學**：一罐黑墨、一種字、現成的色卡紙。任何「為了好看而加」的東西（漸層、陰影、圓角、第二種字體家族的炫技）都會讓它變成別的風格。
2. **字是唯一的圖**：大小不是設計出來的，是「這一行放大到撐滿為止」的結果。
3. **內容是指令**：文案用祈使句、一句一個動作、編號、署名、日期。

外部參照：Benoît Buquet《Art & Graphic Design: George Maciunas, Ed Ruscha, Sheila Levrant de Bretteville》（Yale UP, 2021）；Artforum〈George Maciunas: A Finger in Fluxus〉；Getty Research Institute《The Scores Project》；MoMA The Gilbert and Lila Silverman Fluxus Collection Gift（2008）；Alison Knowles〈The Identical Lunch〉（1969）。

## 本風格的 5 個不可省略特徵

**① 照相放大的窄體字塊（photostat fill）**——全部文字只用一種窄體無襯線（打字機感），標題的**每一行各自放大到剛好撐滿欄寬**，所以行與行字級不同、字塊左右兩緣永遠是直的。拿掉它就只剩一般海報。

```css
.ps{container-type:inline-size;font:700 1em/.84 "IBM Plex Sans Condensed","Noto Sans TC",sans-serif;text-transform:uppercase}
.ps>.l{display:block;white-space:nowrap;font-size:calc(100cqi / var(--n) * 1.62)} /* 無 JS 近似：--n＝字數 */
.ps.fit>.l{font-size:var(--fs)} /* JS 量自然寬後精算 */
```
```js
function fill(el){const W=el.clientWidth;el.querySelectorAll('.l').forEach(l=>{l.style.fontSize='100px';
 const r=document.createRange();r.selectNodeContents(l);const w=r.getBoundingClientRect().width+parseFloat(getComputedStyle(l).paddingLeft)*2;
 l.style.fontSize='';l.style.setProperty('--fs',(W-.5)/w*100+'px');});el.classList.add('fit');}
```

**② 反白印刷與一罐黑墨**——墨只有 #111111 一種：沒有灰、沒有透明度、沒有漸層、沒有陰影、沒有圓角。層次只能靠「正字／反白（黑底挖字）」兩種狀態，字塊中至少一行反白。

```css
.l.r{background:#111;color:var(--st);padding:.04em .06em .02em}
.w:hover{background:#111;color:var(--st)} /* 任何單字都能被反白 */
```

**③ 字排成圖樣**——重複的字串當作紋理（品牌名重複成色帶、店名排成整面字場），取代所有裝飾圖樣。

```html
<div class="pat" aria-hidden="true">同款同款同款同款同款同款同款同款…</div>
<style>.pat{font:700 14px/1.05 "IBM Plex Sans Condensed";letter-spacing:.06em;word-break:break-all;overflow:hidden;max-height:3.4em;border-block:3px solid #111}</style>
```

**④ 分格盒（Fluxkit compartment）**——版面＝一個盒子：3px 黑外框、1.5px 黑隔板、格子大小不等，每格一張色卡紙。用 `gap` 露出黑底當隔板，不畫線。

```css
.box{display:grid;grid-template-columns:repeat(12,1fr);gap:1.5px;background:#111;border:3px solid #111}
.box>*{background:var(--st)}
```

**⑤ 打字機事件譜卡**——內容單位是卡片：黑底編號列（EVENT No.01）、動詞標題、Courier 祈使句、一行價格或署名。文案規則：一句一個動作、句號結尾、沒有形容詞堆疊。

```html
<article class="card s-can"><span class="no"><span>EVENT No.01</span><span>FLIP</span></span>
 <h3>〈翻〉<small>蛋餅</small></h3><p>麵皮下鐵板。打一顆蛋在上面。等邊緣起泡，翻一次。只翻一次。</p><span class="pr">NT$35</span></article>
<style>.card{border:1.5px solid #111;padding:14px 16px;font:400 15px/1.55 "Courier Prime",monospace}
.card .no{display:flex;justify-content:space-between;background:#111;color:var(--st);margin:-14px -16px 12px;padding:6px 10px;font:700 11px/1 "IBM Plex Sans Condensed";letter-spacing:.14em}</style>
```

## 色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 新聞紙 | #EEE9DC | 頁面地、網點圖的紙 | ~40% |
| 墨 | #111111 | 全部的字、隔板、反白底、網點 | ~25% |
| 金絲雀黃卡 | #F3D54E | 盒蓋標籤、主要按鈕反白字 | ~10% |
| 粉紅卡 | #F4A9BE | 紀念、郵購 | ~6% |
| 薄荷卡 | #A8D9B9 | 鹹豆漿／紅茶卡 | ~6% |
| 天藍卡 | #A6CBE8 | 來店頁 | ~5% |
| 牛皮卡 | #E6CFA0 | 點單紙 | ~6% |
| 白卡 | #FAF8F2 | 譜卡本體、輸入框 | ~2% |

規則：色只屬於「紙」，永遠不屬於「墨」；一張卡一種紙色；不得出現任何色的淡版或透明版。

## 字體系統

- 窄體無襯線：**IBM Plex Sans Condensed** 600/700（Google Fonts）——取 IBM 打字機窄體的血緣；所有標籤、數字、英文大寫。
- 中文：**Noto Sans TC** 500/700/900；字塊裡的中文行用 900、line-height .98。
- 打字機：**Courier Prime** 400/700——只用在譜卡內文與指令。
- 字級：內文 15–16px／1.62；標籤 11–12px、字距 .14–.18em 大寫；標題不設字級，由照相放大決定。

## 版面與網格

12 欄、28px 邊距（手機 16px）、零旋轉。版面由「盒」組成：首頁 = 盒蓋（左 1.75fr）＋狀態與網點圖（右 1fr），下方是 12 欄不等寬的分格盒。留白不靠空白而靠紙色：每格都是滿的紙。所有分隔一律 1.5px 或 3px 實線，或 1px 虛線（點單列、譜卡行）。

## 元件配方

- **導覽＝點單**：右上一張牛皮卡小點單，四列「□ 01 盒 BOX」；現用頁整列反白並由 SVG 勾以 steps(4) 畫上；hover 時勾畫到一半。≤560px 攤成四等分一列。
- **按鈕**：2px 黑框、窄體大寫＋中文 900；hover 反白；主要按鈕預設反白（黑底黃字）。
- **卡片**：見特徵⑤；整張卡是連結，hover 整張反白、網點圖 `filter:invert(1)`。
- **表單**：原生 checkbox 以 `position:absolute;opacity:0` 隱藏（**不可 display:none**，否則 CSS 計數器不會加總），外觀是 22px 黑框方格＋手勾 SVG。
- **頁尾**：四欄資訊＋一整條字圖樣帶。

## 動效規則

| 種類 | 本站實作（自製） | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 鐵板網點圖：一顆蛋照臺北真實時間在煎（開爐 05:30–11:30），每 1/8 秒重新製版一次 | 時間 | 125ms 一格 | 停在單一影格，資訊不變 |
| input 輸入 | 游標＝製版放大鏡（網點局部放大 2.25×）；任何單字 hover 立即反白；點單勾選 | pointer／hover／change | 即時（<16ms） | 照常（使用者自己在動） |
| transition 轉場 | 照相負片刷：換頁時黑幕從中線 steps(5) 張開、抵達頁 steps(6) 收回；首頁盒蓋 steps(7) 掀起；譜卡行以 @starting-style 進場 | click／load／:checked | 300–700ms steps() | 全部關閉，直接顯示 |
| signature 簽名 | **照相放大重排**：署名標籤每次改點單，逐行從 38% steps(5) 放大到剛好撐滿，每行延遲 110ms | change／input | 420ms steps(5,end) | 直接停在撐滿 |

自我限制：本風格**禁用淡入、緩動曲線與模糊**——所有動態都用 `steps()`，像放大機與打字機一樣一格一格。

### motion-library 元件表（motion-library 1.14.0 @30c55fe，`tools/ml-embed.js` 子集 inline 為每頁第一個 `<script>`）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 性質 |
|---|---|---|---|---|---|
| BG-B-04 | Halftone Sweep | 盒 | primary #111111／secondary #F4A9BE／bg #EEE9DC，duration 6，density 1.1，seed 1979，4:5 | 首頁一格「網點每天從同一角度掃過」：單色圓點、零漸層零發光，等於 Fluxus 報紙照片的網點 | ambient |
| TXT-A-27 | Typewriter | 點單 | text "SCORE FOR ONE BREAKFAST"，#111111／#F3D54E／#FAF8F2，2.4s，once | 譜卡抬頭被打字機逐字打出：Maciunas 的文字本來就來自打字機 | transition |
| TXT-B-14 | Domino Letters | 早報 | text「週六 06:00 煎一百顆蛋」，#111111／#F4A9BE／#F3D54E，2.2s，once | 本週演出的字像骨牌倒下站好——Fluxus 的遊戲感，只用墨色 | transition |
| TXT-B-30 | Checker Words | 來店 | text「來店 VISIT」，#111111／#F3D54E／#A6CBE8，2s，once | 棋盤方格長滿後把字挖成反白：正好是特徵② 反白印刷 | transition |
| BG-B-07 | Halftone Checker | 來店 | #111111／#F3D54E／#F4A9BE，duration 5，seed 47，4:5 | 郵購盒旁一格網點棋盤＝分格盒的另一種寫法 | ambient |

出處：`MotionLib.prompt(id)`。全部經原始碼檢查：只用 `bgFill`／`halftone`／`fillText`／`fillRect`，沒有 `rr()` 圓角、沒有 `shadowBlur`、沒有漸層；字色由 bg 亮度自動判為近黑，所以文字元件都放在淺色卡紙上。掛載：等 `document.fonts.ready`、離屏 `destroy()`、回到視窗重掛、一次性文字 `loop:false`、canvas `aria-hidden`、容器保留 `.ml-fb` 原 HTML 標題、reduced-motion 時背景 `seek(.35)` 文字 `seek(1)`。

## 插畫與圖像風格

**照相製版網點（offset-sdf-halftone）**：全站沒有一張圖檔。每張「照片」都是一個濃度場函式（盤子、蛋、杯子、蒸籠用距離場與 value noise 組成），交給同一部網點機以 45° 調幅網點、點徑 = √濃度 × 0.64 × 網距印出，一罐黑墨。不畫輪廓線——照相製版沒有線。

```js
function screen(ctx,W,H,cell,dark){const a=Math.PI/4,ca=Math.cos(a),sa=Math.sin(a),n=Math.ceil(Math.hypot(W,H)/cell/2)+2;let k=0;ctx.beginPath();
 for(let j=-n;j<=n;j++)for(let i=-n;i<=n;i++){const X=W/2+(i*ca-j*sa)*cell,Y=H/2+(i*sa+j*ca)*cell;if(X<-cell||X>W+cell||Y<-cell||Y>H+cell)continue;
  const r=Math.sqrt(Math.min(1,dark(X/W,Y/H)))*cell*.64;if(r<.35)continue;ctx.moveTo(X+r,Y);ctx.arc(X,Y,r,0,6.2832);if(++k===20){ctx.fill();ctx.beginPath();k=0;}}ctx.fill();}
```

## Logo 與 Favicon 設計指南

Logo＝一個三格的盒子：黑外框、左格金絲雀黃放「同」、左下反白「款」、右上粉紅「No.47」、右下新聞紙格裡一顆網點荷包蛋。Favicon 同構：黑方塊、三格色紙、一顆黑點蛋黃。不加任何外框陰影或圓角。

## Do & Don't

- Do：所有標題用照相放大字塊；至少一行反白；文案寫成祈使句；每張卡一種紙色；動態全部 `steps()`。
- Do：真實可信的虛構資訊（地址、價格、電話、時間）寫成「指令」口吻。
- Don't：漸層、陰影、透明度、圓角、模糊、淡入、彈性緩動。
- Don't：第二種無襯線家族、手寫字、裝飾花邊；emoji icon；紫藍漸層；置中大標＋三張卡片。
- Don't：把網點做成彩色——網點永遠是黑墨，顏色只在紙上。
- Don't：EST. 徽章、Lorem ipsum、「在當今快節奏的世界」。

## 頁面骨架範例

```html
<header class="top"><a class="brand">…logo…</a><nav class="slipnav">…四列點單…</nav></header>
<main>
 <section class="hero"><div class="lid s-can"><h1 class="ps"><span class="l tc" style="--n:4">同款早餐</span><span class="l r" style="--n:17">BREAKFAST EVENTS</span></h1></div>
  <aside><div class="stat">營業狀態</div><canvas id="griddle"></canvas></aside></section>
 <div class="box"><a class="card s-can">…EVENT No.01…</a><a class="card s-mnt">…</a></div>
 <div class="pat">同款同款同款…</div>
</main>
```

## 技術實作與相容性

1. **CSS `:has()`＋計數器純 CSS 狀態機（E 層）**——點單的勾選態、譜卡逐行出現、內用／外帶、溫度字樣、空單提示、按鈕可用性全部由 `.slipform:has(#i-dan:checked) li[data-i=dan]{display:grid}` 推出；總價、分鐘數、首數用 `#i-dan:checked{counter-increment:total 35 mins 4 items 1}` 加總、`.tot::after{content:counter(total)}` 顯示。**關掉 JavaScript 仍可完整點單。** 查證（2026-10-25）：MDN〈Firefox 121 release notes〉確認 `:has()` 於 Firefox 121（2023-12-19）上線；Chrome／Edge 105、Safari 15.4。Fallback：不支援 `:has()` 的瀏覽器譜卡行全部隱藏，但計數器總價與勾選本身照常運作；JS 另會生成署名標籤。注意：checkbox 不能 `display:none`，否則不計數。
2. **`@starting-style`＋`transition-behavior:allow-discrete`（B 層）**——譜卡行從 `display:none` 變 `grid` 時以 steps(3) 從左 18px 推入。查證：MDN〈CSSStartingStyleRule〉標示 Baseline 2024（2024-08 起新可用）；Chrome 117、Firefox 129、Safari 17.5。Fallback：不支援時直接出現，資訊零損失。
3. **Canvas 2D 調幅網點機（A 層）**——承載特徵與全部圖像、ambient 與 input。實測（@napi-rs/canvas，520×360、網距 7px）：每格 9.5ms；**一條包含上千個圓的單一路徑在 Skia 會退化到 680ms/格**，改成每 20 點 fill 一次後回到 10ms 以內——這是本風格最重要的效能注意事項。卡片縮圖 10 張靜態一次。
4. 效能：單頁 131–146KB（含 motion-library 子集 ~99KB）；同畫面同時運轉的 canvas 動畫 ≤2（鐵板＋一個元件）；離屏的鐵板與元件都停止重繪。
