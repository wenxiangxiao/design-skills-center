---
name: meisen-taisho-roman
description: Taishō–early Shōwa meisen kimono style — oversized stencil-printed motifs (roses, arrow-feather yagasuri, tulips, Deco circles) in clashing aniline colours, every horizontal edge combed into hogushi-gasuri blur by shifted warp threads, laid out as tall selvaged bolts under right-to-left Taishō signboard lettering.
---

# 銘仙・大正浪漫 Meisen (Taishō–Shōwa Modern Kimono) — 風格規格書

> 範例站：`sites/thai-ping-ting`（太平町洋傘，大稻埕的銘仙日傘店）。本文件與產業無關：照著做，任何網站都會長成銘仙。

## 設計哲學

銘仙是二十世紀初日本平民的絹——用屑繭紡的粗絲，伊勢崎、足利、秩父、桐生、八王子的織元與東京的百貨公司一季推一批「流行柄」，賣給女學生、咖啡館女給與上班的職業婦人。它長成這樣有三個原因，三個都是製程：

1. **ほぐし絣（hogushi-gasuri）**：經線先用稀疏的臨時緯線假織（仮織り），再用型紙把整張圖印在經線上，拆掉臨時緯線後上機本織。經線在織的過程中各自上下錯開——所以**橫向的邊緣全變成梳齒，直向的邊緣仍然乾淨**。這個「かすれ」不是模糊，是錯位。
2. **便宜，所以敢大**：一朵薔薇可以大到撐滿一幅（約 36–38cm）、被布邊切掉一半。西洋的薔薇、鬱金香、Art Deco 幾何、閃電折線，和傳統的矢絣、菊、椿並存。
3. **アニリン（合成）染料**：德國進口的化學染料讓洋紅、菫紫、檸檬黃、孔雀綠可以便宜地並排，互補色直接撞在一起，沒有任何調和。

網頁上要做到的是：**每一個圖都是先印再錯開的；每一塊顏色都是飽和平塗；版面是一反一反垂下來的布；招牌字由右往左讀。**

## 本風格的 5 個不可省略特徵

### 1. ほぐし絣：經線錯位，不是模糊

圖樣以 2–4px 為「一束經線」縱向切欄，每欄垂直位移 ±2–8px，相鄰欄位移相關（平滑隨機遊走＋個別抖動）。結果：橫邊成梳齒、直邊銳利。**禁止 `filter: blur`、禁止柔邊、禁止漸層羽化**。

```js
// 1) 把母題畫在比畫面高 2M 的離屏 canvas（src）  2) 逐欄錯位貼回
let v=0; const base=[]; for(let i=0;i<Math.ceil(W/cw);i++){ v=v*.55+(rnd()-.5)*1.7; base.push(v*amp+(rnd()-.5)*amp*.55); }
for(let i=0;i<base.length;i++){ const X=i*cw, off=base[i];
  ctx.drawImage(src, X*dpr,(M-off)*dpr, cw*dpr,H*dpr, X,0, cw,H); }   // cw=3, amp=5–6, M=ceil(amp*2.4)+2
// 3) 已織部分疊 2px 一條的緯線紋（rgba(18,13,22,.13)），未織部分疊 14px 一條的仮織り線（rgba(243,231,207,.42)）
```

沒有 JS 時的近似（SVG，只做直向切欄的錯位，同樣不用模糊）：

```svg
<filter id="hogushi"><feTurbulence type="fractalNoise" baseFrequency="0.33 0" numOctaves="1" seed="7"/>
  <feDisplacementMap in="SourceGraphic" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>
<!-- baseFrequency 的 y 必須是 0：只沿 x 變化、只往 y 推，才會是經線錯位 -->
```

### 2. 大柄：母題大到被幅邊裁斷

一個母題至少佔容器寬 60%，畫面上永遠看得到被布邊切掉的花。母題語彙：薔薇（同心偏移圓＋一條地色螺旋）、矢絣（V 形羽根交錯列＋中央軸線）、鬱金香、幾何同心圓＋閃電帶、乱菊（細長花瓣放射兩層）、水玉＋寬縞、市松＋椿。

```js
// 薔薇：外圓 c1、五層偏移同心圓 c2/c1 交替、最後一條地色螺旋把它「捲」起來
for(let j=1;j<6;j++){ctx.fillStyle=j%2?c2:c1;dot(cx+Math.cos(j*2.1)*R*.05*j, cy+Math.sin(j*2.1)*R*.05*j, R*(1-j*.16));}
```
```css
/* 矢絣的 CSS 近似（硬停點，不是漸層）：*/
.yagasuri{background:
  linear-gradient(135deg,var(--mag) 25%,transparent 25%) 0 0/60px 72px,
  linear-gradient(225deg,var(--mag) 25%,transparent 25%) 30px 0/60px 72px, var(--lem)}
```

### 3. アニリン撞色：三色以上飽和平塗，互補直接相鄰

色票只有 7 色＋墨，任何一反布用「地＋主＋副＋差し色」四色，主副必為互補或近互補（洋紅×檸檬、菫×朱、孔雀×洋紅）。**零漸層、零透明度調色、零陰影**（唯一的「影」是同形下移一層的實色）。

```css
:root{--plum:#22162B;--cream:#F3E7CF;--mag:#D81E6C;--vio:#6C3FB5;--lem:#F4CF2F;--teal:#1E9E8F;--ver:#E4502B;--ink:#120D16}
/* 一反布的四色組（地, 主, 副, 差し） */
--pal-a: #22162B #D81E6C #F4CF2F #1E9E8F;  --pal-b: #F3E7CF #6C3FB5 #E4502B #1E9E8F;
--pal-c: #1E9E8F #F4CF2F #D81E6C #120D16;  --pal-d: #6C3FB5 #F4CF2F #E4502B #F3E7CF;
```

### 4. 反物：直長的布疋＋幅耳

內容的單位是「一反」：縱長 1:2.5 以上的直條、兩側有虛線幅耳（selvage），下端有織留め標籤（番號・年份・產地）。並排時像店裡掛起來的布。

```css
.bolt{position:relative;background:var(--ink);padding:0 5px}
.bolt::before,.bolt::after{content:"";position:absolute;top:0;bottom:0;width:3px;
  background:repeating-linear-gradient(180deg,var(--cream) 0 6px,var(--ink) 6px 9px)}
.bolt::before{left:1px}.bolt::after{right:1px}
.bolt .tome{position:absolute;left:12px;bottom:10px;background:var(--cream);color:var(--ink);font:400 10px/1 "Poiret One";letter-spacing:.2em;padding:4px 6px}
```

### 5. 大正の文字：右横書き看板＋裝飾明朝

招牌級的字（店名、頁名、票名）一律**由右往左橫寫**，寫在朱底墨框、內圈細線的看板上；DOM 保持正常語序（讀屏正確），只在視覺上反向。字體用裝飾明朝（Kaisei Decol），拉丁字用幾何 Deco 細體大寫（Poiret One）。

```html
<h1 class="kanban"><span class="rtl" aria-hidden="true">太平町洋傘</span><span class="vh">太平町洋傘</span></h1>
```
```css
.rtl{direction:rtl;unicode-bidi:bidi-override;display:inline-block}
.kanban{background:var(--ver);color:var(--cream);border:4px solid var(--ink);outline:2px solid var(--cream);outline-offset:-10px;padding:14px 26px 12px}
.kanban .rtl{font:700 clamp(30px,5.4vw,64px)/1.1 "Kaisei Decol",serif}
```

## 色彩系統

| 名 | hex | 用途 | 比例 |
|---|---|---|---|
| 墨葡萄 plum | `#22162B` | 唯一大面積地色、頁面底、元件庫 bg | 約 34% |
| 地一階 plum2 | `#2E1F3A` | 說明盒、篩選鈕底（實色，不是漸層） | ≤8% |
| 生成 cream | `#F3E7CF` | 全部正文、看板字、幅耳、票券底 | 約 18% |
| 牡丹 magenta | `#D81E6C` | 主強調、現用態、硬邊投影色 | ≤12% |
| 菫 violet | `#6C3FB5` | 暖簾、舞台地、布色 | ≤10% |
| 檸檬 lemon | `#F4CF2F` | focus ring、價格、按鈕底、標籤 | ≤10% |
| 孔雀 teal | `#1E9E8F` | 營業狀態條、布色 | ≤8% |
| 朱 vermilion | `#E4502B` | 看板、值札板 | ≤8% |
| 墨 ink | `#120D16` | 外框、傘骨、硬影、幅耳間隔 | — |

可讀性（WCAG 2.1 實算）：cream 對 plum 14.1:1；lemon 對 plum 11.3:1；ink 對 lemon 12.6:1；cream 對 violet 5.7:1；cream 對 magenta 4.0:1、對 vermilion 3.1:1（只放 18.7px 以上粗體）；cream 對 teal 僅 2.7:1——孔雀底上的字一律改用墨色。**布面上不放正文**——字一律坐在 plum、cream 或看板上。

## 字體系統

- 標題／看板：**Kaisei Decol** 700（Google Fonts），大正裝飾明朝的骨架；缺字回退 Noto Serif TC。
- 正文：**Noto Serif TC** 400，16px／1.85。
- 拉丁：**Poiret One**（Deco 幾何細體），全大寫、字距 .18–.22em，只用於 eyebrow、番號、羅馬拼音。
- 字級：看板 clamp(30px,5.4vw,64px)；h2 clamp(26px,3.6vw,40px)；h3 18–20px；正文 16px；註 12–13px。
- 沒有 800 以上字重（元件庫畫布文字除外）。不用等寬體。

## 版面與網格

- 首頁三欄：〔一反直條 24%〕〔主物件 1fr〕〔看板與說明 36%〕，全部頂天立地；≤1000px 兩欄、≤560px 單欄（直條縮為 150px 高的橫幅）。
- 型錄以 `repeat(auto-fill,minmax(170px,1fr))` 排「反」，每反 380px 高；手機兩欄 260px。
- 零旋轉的版面；唯一的傾斜是現用頁的暖簾（−11°）與 hover 的反物（−1.2°）。
- 留白：區塊間 72px；看板內外留白靠 outline-offset，不靠陰影。
- 圓角：0。唯一的圓是傘、手毬、紋。

## 元件配方

- **暖簾導覽 noren**：一根墨色橫桿下垂四片直書布（50×132px），四片四色；現用頁的那片被「撥開」——`rotate(-11deg) translateX(-6px)`、短一截、內圈檸檬框。hover 擺 ±4°（彈簧 easing）。≤560px 變全寬四片 84px。
- **按鈕**：矢羽根斜切 `clip-path:polygon(0 0,calc(100% - 14px) 0,100% 50%,calc(100% - 14px) 100%,0 100%,10px 50%)`，檸檬底墨字；hover 右移 4px 變 cream。
- **看板**：見特徵⑤。
- **票券／取り置き票**：cream 底、4px 墨框、`box-shadow:8px 8px 0 var(--mag)` 硬影、標題右横書き＋雙線底。
- **值札板**：墨底＋6px 朱框＋cream 內線（朱底上的小字對比不足，所以朱只做框），表格以 2px 墨線分列，品名 Kaisei Decol。
- **篩選鈕**：plum2 底，選中洋紅底＋檸檬底線；以 `:has()` 純 CSS 篩選。
- **footer**：上緣一條四色硬停點色帶（洋紅／檸檬／孔雀／菫各 18px）。

## 動效規則

| 種類 | 實作 | 觸發 | duration／easing |
|---|---|---|---|
| ambient | 布的「呼吸」：每反經線錯位幅度 ×(1±.24·sin(0.7t))，約 15fps 重繪；首頁日傘以 0.45 rad/s 自轉 | 進入視窗 | 連續；錯位追隨係數 .22／幀 |
| input | **梳**：游標掠過任何布面，該處經線錯位以高斯 σ≈36px 歸零（被梳齊），離開後鬆回；首頁日傘可拖曳轉動（帶慣性）；暖簾 hover 擺動 | pointermove | 回應 <16ms；回彈 0.5s cubic-bezier(.3,1.6,.5,1) |
| transition | 跨文件 View Transition「垂反」：新頁 `clip-path:inset(0 0 100% 0)→inset(0)` 由上往下垂放，舊頁下沉 28px 變暗；暖簾以 `view-transition-name:noren` 留在原地 | 站內換頁 | 新頁 .62s cubic-bezier(.2,.7,.2,1)；舊頁 .42s |
| signature | **織り下ろし**：每反布第一次進入視窗時，先顯示「印好但未織」的銳利經線＋稀疏仮織り線，一條 cream 緯線帶著一枚墨色杼由上往下走，走過的地方經線逐欄錯開成かすれ | 首次進入視窗 | 2.4s（首頁 3.4s）線性 |

`prefers-reduced-motion`：布直接以織好的狀態靜態繪出（資訊完整）、不呼吸、不梳；日傘不自轉但仍可拖；View Transition 關閉；遊戲照常（使用者自己在動）。首頁另有「印好／織到一半／織上」三張靜態圖解，讓織り下ろし的內容在任何設定下都看得到。

自我限制：本風格**不用淡入**、不用模糊、不用視差。

### motion-library 元件

來源 `wenxiangxiao/motion-library` v1.10.0 @887bb23，以 `tools/ml-embed.js` 產生每頁子集＋`motion-player.js`，inline 為每頁第一個 `<script>`。各元件 Prompt 見 `MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-A-35 | Stripe Mask | index | text「錯開才好看」、primary #F4CF2F、secondary #D81E6C、bg #22162B、duration 1.8、loop false、seed 28、16:9（以容器高定尺寸） | transition（一次性） | 字由 14 道直條逐條打開——直條就是經線，正好是ほぐし的講解標題 |
| BG-B-16 | Weave Grid | index（頁尾帶） | primary #D81E6C、secondary #1E9E8F、bg #22162B、duration 9、intensity .8、density .7、seed 7 | ambient | 經緯交錯的平織格子緩緩位移：銘仙本身是平織，頁尾就是一段布邊 |
| TXT-B-24 | Text Fan | tanmono | text「反物帖」、primary #D81E6C、secondary #F4CF2F、bg #22162B、duration 1.6、loop false、intensity 1.1、seed 21 | transition（一次性） | 字像傘骨一樣扇開再收正——帖與傘都是會打開的東西 |
| SHP-22 | Radial Fan | mawasi | primary #D81E6C、secondary #F4CF2F、bg #22162B、duration 1.4、loop false、seed 8 | transition（一次性） | 八片扇形依序張開＝八骨日傘開傘，遊戲開始前的那一下 |
| BG-B-32 | Pinwheels | mise | primary #E4502B、secondary #F4CF2F、bg #22162B、duration 8、intensity .9、density .8、seed 28 | ambient | 四片三角硬邊旋轉的紙風車列：大正玩具攤的風車，零圓角零發光 |

掛載規則（照 `sites/ka-to` 的 `KT.ml`）：等 `document.fonts.ready` 才掛；離屏 `destroy()`、回視窗重掛；一次性元件 `loop:false` 播一次，重掛直接 `seek(1)`；canvas `aria-hidden`；容器內保留原 HTML 標題 `.ml-fb`，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

全站沒有手繪插畫：所有圖像都是**同一支 ほぐし渲染器**畫的布——母題函式（平塗形）→ 3px 經線分欄錯位 → 緯線紋。傘面是把同一反布貼進八片扇形（傘骨墨線、扇貝緣、骨端 cream 點、中央石突）。手毬是檸檬圓＋三道洋紅／孔雀帶＋cream 心。地圖是平塗色塊街道，不描邊。反物番號經 FNV-1a → mulberry32 決定母題、色組與錯位，同號恆得同一反。

## Logo 與 Favicon 設計指南

俯看的八骨日傘：八片扇形用洋紅／檸檬／菫／孔雀／朱五色交錯，墨色傘骨與中央石突，扇緣內側一排交錯短齒暗示かすれ。地為墨葡萄方形。favicon 為同一圖的 32px 簡化版（去掉短齒）。店名永遠右横書き。

## Do & Don't

- Do：讓花被布邊切掉；讓兩個互補色直接相鄰；所有「模糊」都用錯位做；字放在看板或素地上。
- Do：招牌字右横書き，DOM 保持正常語序並提供 `.vh` 正向文字。
- Don't：`filter:blur`、漸層、半透明疊色、柔影、圓角卡片。
- Don't：把正文放在花紋布上；把母題縮小成「小碎花」——那是另一種布。
- Don't（去AI化）：紫藍漸層 hero、置中三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章。

## 頁面骨架範例

```html
<header class="mast">
  <a class="brand" href="index.html"><img src="assets/logo.svg" alt="" width="52" height="52"><span><b>店名</b><small>ROMANIZED · 1928</small></span></a>
  <nav class="noren" aria-label="主要頁面">
    <a href="index.html" aria-current="page"><b>店頭</b><i>Mise-saki</i></a>
    <a href="catalog.html"><b>反物帖</b><i>Tanmono</i></a> …
  </nav>
</header>
<main id="main">
  <section class="hero">
    <div class="bolt"><canvas data-bolt="44" role="img" aria-label="反物 No.44：大薔薇銘仙"></canvas><span class="tome">反 No.44 · 昭和二年 伊勢崎</span></div>
    <div><!-- 主物件：傘／商品 --></div>
    <div><h1 class="kanban"><span class="rtl" aria-hidden="true">店名</span><span class="vh">店名</span></h1><p>…</p><a class="btn" href="…">翻反物帖</a></div>
  </section>
</main>
```

## 技術實作與相容性

| 技術 | 承載 | 支援現況與查證 | fallback |
|---|---|---|---|
| **Canvas 2D 9 參數 `drawImage` 逐欄錯位**（ほぐし渲染器） | 特徵①、signature 織り下ろし、input 梳、ambient 呼吸、傘面材質 | `CanvasRenderingContext2D.drawImage` 全瀏覽器支援（MDN Baseline Widely available） | 無 canvas／無 JS：布的位置保留墨底＋幅耳＋織留め標籤；文字資訊（番號、柄名、價格）另在 HTML 或來店頁 |
| **跨文件 View Transitions** `@view-transition{navigation:auto}` ＋ `::view-transition-new(root)` clip-path | transition 垂反、暖簾 `view-transition-name` 留位 | Chrome／Edge 126+、Safari 18.2+ 支援；Firefox 未支援（查證：developer.chrome.com〈Cross-document view transitions for multi-page applications〉） | 不支援的瀏覽器直接一般換頁，無中間態；reduced-motion 取消動畫 |
| **`unicode-bidi:bidi-override`＋`direction:rtl`**（右横書き）、`writing-mode:vertical-rl`（暖簾直書） | 特徵⑤看板、票名、暖簾 | 兩者皆全瀏覽器支援（MDN Baseline Widely available） | DOM 為正常語序，讀屏與複製文字都是正向；`.vh` 另附正向文字 |
| `:has()` 篩選 | 型錄依柄篩選 | Baseline 2023（Chrome 105／Safari 15.4／Firefox 121） | 包在 `@supports selector(:has(a))`，不支援時全部顯示 |

效能（建置時量測）：四頁各 129–133KB（含 motion-library 子集約 92KB）；ほぐし渲染器每反每幀 = 欄數×2 次 `drawImage`（380px 高、170px 寬的反約 114 次），只重繪視窗內的布、平時 15fps、織り下ろし與梳時 60fps；首屏 JS 只建構三塊離屏布（首頁 bolt、傘面材質、圖解三張），無同步大迴圈。
