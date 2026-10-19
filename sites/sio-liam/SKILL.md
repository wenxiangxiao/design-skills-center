---
name: lubalin-phototype-typographics
description: Herb Lubalin / ITC U&lc phototype expressive typography — letters kerned until their outlines touch, lines stacked with negative leading, a swash Didone ampersand as protagonist, geometric caps exploding to tabloid scale on newsprint with one spot red, and Photo-Typositor squeeze to fit the measure.
---

# Lubalin 字象派・ITC《U&lc》照相排字表現主義 — 風格規格書

示範站：相黏照相打字行（`sites/sio-liam`）。

## 設計哲學

1959 年 Murray Friedel 在邁阿密發明 Photo-Typositor，由紐約的 Visual Graphics Corporation（VGC）量產：字不再是一塊有字身的鉛，而是一格一格曝在相紙上的光，操作員可以看著上一個字、把下一個字往左推到任何位置。鉛字最近只能肩並肩；照相打字可以讓兩個字的墨碰在一起、甚至疊進彼此的肚子。Herb Lubalin（1918–1981）把這個「沒有字身的自由」變成一整套語言：他為 Ralph Ginzburg 的《Avant Garde》雜誌做的字標長出了 ITC Avant Garde 字體；1970 年他與 Aaron Burns、Edward Rondthaler 成立 International Typeface Corporation（ITC），1973 年起的《U&lc》（Upper and lower case）是一份以新聞紙印刷、對摺寄送的大開本字型報，Lubalin 設計版面直到 1981 年過世。

這個風格不是「大字」——是**字與字之間的距離被當成內容**。一組字排得多近，就說了兩件事有多親。所以它的核心規則只有一條：**推到碰，再停**（tight but touching）。其餘的一切——Didone 花飾 &、字代圖、週報式字級爆炸、變形鏡頭——都是為了讓這一條規則被看見。

本館的轉譯：瀏覽器沒有照相打字機，但有 canvas。本站把每個字先畫進離屏 canvas，量出每一條掃描線的左右墨緣，再讓下一個字滑過去，滑到兩張輪廓第一次接觸為止。字距是求出來的，不是寫死的——這正是 Photo-Typositor 操作員用眼睛做的事。

## 本風格的 5 個不可省略特徵

拿掉任何一項，畫面就退回「一般的大字海報」。

### ① 碰字距與負行距：推到墨碰墨，再停

字距由兩個字的**輪廓**決定，不由外框（bounding box）決定：T 的橫底下可以鑽進一個 A、L 的手臂下可以塞進 T、上一行的下伸部可以插進下一行大寫的頭頂縫隙。行距是負的（line-height ≈ .78–.86），上下兩行同樣碰到才停。只在要被記住的那一行做——內文一律標準字距。

```css
/* 無 JS 退路：負字距＋負行距（近似，不會鑽縫） */
.geo{font-family:"Unbounded",sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:-.055em;line-height:.8}
```

```js
/* 真正的碰字：逐掃描線輪廓碰撞（完整版見示範站 common.js 的 SL.prof／SL.need／SL.line） */
function need(A,B,gap){ // A、B 為 {L[],R[],base}：每列最左／最右的墨（相對字原點）
  let best=-Infinity;
  for(let r=0;r<B.L.length;r++){const ra=r-B.base+A.base; if(isNaN(B.L[r])||isNaN(A.R[ra]))continue;
    best=Math.max(best,A.R[ra]-B.L[r]+gap);}   // gap>0 緊、0 碰、<0 疊
  return best; // B 的原點至少要放在 A 原點右邊這麼遠
}
```

### ② 字代圖與花飾 &：一個字形被換成意思

Lubalin 最有名的手法是讓一個字形承擔整個概念（〈Mother & Child〉把 & 與 Child 放進 Mother 的 O 裡）。本風格最低限度的實作：**& 永遠是 Didone 斜體的花飾 &，比兩側大寫大 1.4–1.6 倍、下沉、換色**；進階做法是讓 & 巨大地墊在兩行名字後面「托住」它們。

```html
<text font-family="'Bodoni Moda',serif" font-style="italic" font-weight="700" font-size="190" fill="#E2231A" dy="18">&amp;</text>
```

```css
.amp{font-family:"Bodoni Moda",serif;font-style:italic;font-weight:700;font-size:1.55em;color:#E2231A;vertical-align:-.12em;margin:0 -.04em}
```

### ③ 幾何圓體大寫 × Didone 斜體的對撞

標題字只有兩種：**幾何、圓、寬、x-height 大的無襯線大寫**（Avant Garde 系；本站用 Unbounded 900）與**高反差 Didone 斜體**（Bodoni Moda italic 700）——後者只給 &、單一強調字與 swash。中文標題用明體 900（照相打字的明朝體），字距同樣負。不准出現第三種展示字型、不准 mono。

```css
:root{--f-geo:"Unbounded","Noto Sans TC",sans-serif;--f-did:"Bodoni Moda","Noto Serif TC",serif;--f-ming:"Noto Serif TC",serif}
h1{font:900 clamp(56px,10vw,140px)/.78 var(--f-ming);letter-spacing:-.08em}
h1 .did{font-family:var(--f-did);font-style:italic;font-weight:700;color:var(--red);letter-spacing:0}
```

### ④ 週報字級爆炸：新聞紙＋墨＋一罐專色

《U&lc》是對摺的大開本新聞紙。版面＝**一個比內文大 12 倍以上的字**＋左右齊行的三欄內文＋1px 欄線＋6px 粗線分欄。顏色只有紙、墨與**一罐**專色（本站喜紅；粉是第二罐專色，不是紅的透明版，只給 & 與網點）。零漸層、零陰影、零圓角。

```css
.mast{border-bottom:6px solid #16130F}
.cols{display:grid;grid-template-columns:1.25fr 1fr 1fr}
.cols>section{padding:0 22px;border-left:1px solid #16130F}
.cols p{text-align:justify;hyphens:auto}
.drop::first-letter{float:left;font:900 4.6em/.8 "Unbounded";color:#E2231A}
```

### ⑤ Photo-Typositor 鏡頭變形：用變形把字撐滿

Photo-Typositor 用變形鏡頭（anamorphic）把整行字壓扁或拉寬——直筆變細、橫筆不變，所以壓過的字一眼看得出來；再加一面斜鏡做假斜體。用法不是裝飾，是**讓一個字剛好撐滿一欄**（justify by distortion）。變形以基線為軸、整行一起變，不准逐字不同倍率。

```css
.w70{transform:scaleX(.7);transform-origin:0 100%}   /* 窄鏡 */
.w115{transform:scaleX(1.15);transform-origin:0 100%} /* 半寬 */
.slant{transform:skewX(-12deg);transform-origin:0 100%} /* 斜鏡 */
```

```svg
<!-- SVG 版：以基線 y=0 為軸，x0 為行首；sx 橫向倍率、t=tan(斜角) -->
<g transform="matrix(sx 0 -t 1 x0-x0*sx 0)">…</g>
```

## 色彩系統

| 名稱 | Hex | 用途 | 比例 |
|---|---|---|---|
| 新聞紙 paper | `#F3EEE2` | 長文底、卡片、打樣紙 | ~44% |
| 墨 ink | `#16130F` | 正文、字標、欄線、控制台 | ~30% |
| 喜紅 red | `#E2231A` | 唯一專色：大面積地（首屏、沿革）、& 、強調、現用態 | ~20% |
| 粉 pink | `#F5BFC6` | 第二罐專色：只給 &、網點、表格 hover、小標 | ≤6% |
| 底片 film | `#0E0C0A` | 導覽的底片條 | ≤3% |

規則：紅與粉永遠是實色、不做透明度；墨不用純黑、紙不用純白。對比（WCAG 2.1 實算）：墨對紙 15.99:1、紙對紅 4.04:1、墨對紅 3.96:1——紅地上只放 ≥24px 粗體大字（大字門檻 3:1），長文一律回到紙上；墨對粉 11.59:1。

## 字體系統

- **Unbounded**（Google Fonts，可變 wght 200–900）：所有拉丁大寫標題、數字、小標（700 11px 字距 .18em）。標題 900、字距 −.055～−.08em。
- **Bodoni Moda**（Google Fonts，ital／opsz／wght）：italic 700 只給 &、單字強調與 swash。
- **Noto Serif TC** 400／700／900：中文內文 17px／1.72；中文標題 900、行高 .84、字距 −.07em。
- 字級階梯（px）：11／14／17／22／34／58／90／140／240＋（字標以 SVG 無上限）。爆炸字至少為內文的 12 倍。

## 版面與網格

- 右側 76px 固定底片條導覽；內容區左右 padding `clamp(16px,4vw,56px)`。
- 首屏：左大字標（佔 70% 以上寬）＋右 300px 紙色側欄（「耳報」），中間 6px 墨線。
- 週報：刊頭（大字＋小字＋大號 Nº）下 6px 墨線，三欄 1.25:1:1，1px 欄線。
- 角度：本風格不旋轉。唯一的斜是斜鏡 12°。
- 留白：不留白給氣氛——留白只出現在字標四周，讓碰在一起的字被看見。

## 元件配方

- **導覽（font-filmstrip）**：黑底直條、兩側各一排 7px 送孔（兩組 radial-gradient repeat-y），每頁一格負片（紙色字），現用頁翻成正片（紙底紅字）。≤900px 改為底部橫條。
- **按鈕**：墨底紙字、Unbounded 900 大寫、零圓角；hover 換喜紅。
- **卡片（打樣卡）**：紙底、10px 紙色邊＋2px 墨 outline 內縮 16px（雙線框）。
- **表單**：墨色控制台、紙色輸入框、分段選擇器以 `:has(input:checked)` 翻紅。
- **表格**：頂 6px 墨線、列 1px 墨線、價格欄 Unbounded 900 右齊、hover 整列粉。
- **頁腳**：墨底、巨大紅色字標、三欄。

## 動效規則

| 種類 | 實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 鏡頭呼吸：字標 `.lens` scaleX .975↔1.03 | 時間 | 9s ease-in-out infinite | 停在 1 |
| input | 拖字（Pointer Events），放手滑回並在碰點壓扁；相黏機三支桿即時重解；捲動驅動曝光與字距 | 指標／捲動 | 跟手 0ms；回彈 260–720ms `cubic-bezier(.55,0,.8,.3)` | 拖動保留、回彈瞬移；捲動列直接最終態 |
| transition | 暗房擦拭：紙由左推過（紅前緣 18px），下一頁往右抽走 | 點內部連結 | 380ms／460ms `cubic-bezier(.7,0,.2,1)` | 停用，直接換頁 |
| signature | **碰字 kiss**：字從鬆排（中點向外 ×0.4 間距）滑入，在接觸瞬間 scaleX .94、再回 1 | 載入、切排法 | 640ms＋距離×.25，逐字延遲 18ms，加速型 `cubic-bezier(.55,0,.8,.3)`（像被吸過去） | 不播，直接停在求解位置 |

自我限制：本風格**禁用淡入**——字是光，不是霧；要嘛曝到、要嘛沒曝。所有出現都是「滑過來碰到」。

### motion-library 元件表

來源 `wenxiangxiao/motion-library` v1.6.0 @0a806bc，以 `tools/ml-embed.js` 抽子集 inline。參數格式 `MotionLib.mount(el,{id,text,colors:{primary,secondary,bg},duration,loop,density,intensity,seed,aspectRatio})`；開發 Prompt 以 `MotionLib.prompt(id)` 取得。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-01 | Halftone Expand | index | primary #E2231A・secondary #F5BFC6・bg #F3EEE2・9s・density 1.5・seed 1974 | ambient | 新聞紙網點帶：兩罐專色輪流長滿。《U&lc》印在新聞紙上，網點是它唯一的「圖」 |
| TXT-B-21 | Magnet Pull | index | 同色票・text "TIGHT"・1.8s・loop:false・seed 47 | transition | 字逐個從磁鐵邊被拉出、咬著排回原位：字與字之間有吸力，正是緊排 |
| TXT-B-23 | Weight Grow | lockup | 同色票・text "EXPOSE"・1.6s・loop:false・seed 9 | transition | 細描邊長成實心＝照相打字的過曝吃墨；與相黏機的「曝光」桿同義 |
| TXT-A-02 | Letter Sequence | specimen | 同色票・text "SPECIMEN"・2s・scroll seek・seed 12 | input | 捲動逐字落位，字樣單的標題由讀者自己排上去 |
| SHP-33 | Squiggle Draw | shop | 同色票・1.4s・loop:false・seed 74 | transition | 一筆喜紅花飾線＝Lubalin 字標旁的 swash；圓頭線與 Didone 花飾同族 |

掛載規則：等 `document.fonts.ready`；IntersectionObserver 離屏 `destroy()`、回視窗重掛；一次性文字 `loop:false` 只播一次、之後 `seek(1)`；canvas `aria-hidden`；容器內原本的 HTML 標題（`.ml-fb`）在掛載成功後才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。元件全部用 Unbounded（元件庫 FAM.sans 的首選字型）繪字，與本站標題同一字族。

## 插畫與圖像風格

**沒有插畫。** 所有「圖」都是字：字標、連字咬合表、中文負字距、& 托住。需要圖示的地方放一個字；需要裝飾的地方放一個花飾 &、一條 swash 或網點。唯一的非字圖形是位置示意圖（粗墨線＋一塊紅色招牌）。

## Logo 與 Favicon 設計指南

紅底正方形，一條紙色的 S 形曲線（兩個 12px 半徑弧）與一條墨色 L 形折線，在 S 下弧與 L 豎筆處**相碰**——碰字距的最小示範。字標版本以幾何筆畫手繪 SIOLIAM（不依賴字型），Â 的抑揚符號為紅色。Favicon 為同一個 64×64 圖形的 inline SVG data URI。

## Do & Don't

**Do**
- 只讓「要被記住的那一行」碰字；內文標準字距、左右齊行。
- & 一定是 Didone 斜體、一定比兩側大、一定換色。
- 變形整行一起變，以基線為軸。
- 字距用輪廓求解；無法求解時退回 `letter-spacing:-.055em`。

**Don't**
- 不要用外框算字距（那只是「排得緊」，不是「碰」）。
- 不要漸層、陰影、圓角、玻璃、發光；不要燙金效果。
- 不要第三種展示字型、不要 mono 數字。
- 去AI化禁令：禁紫藍漸層 hero、禁置中三卡片、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章、禁「把 X 變成 Y」標題。

## 頁面骨架範例

```html
<header class="hero" style="background:#E2231A;color:#F3EEE2;display:grid;grid-template-columns:1fr 300px">
  <div id="hero-lk"><h1 class="lk-fb" style="font:900 200px/.8 'Noto Serif TC';letter-spacing:-.06em">相黏</h1></div>
  <aside class="ear" style="background:#F3EEE2;color:#16130F;border-left:6px solid #16130F">…</aside>
</header>
<article class="tab">
  <div class="mast"><div class="t">緊<i class="did">&amp;</i>排</div><div class="m">第 47 號</div><div class="n">Nº47</div></div>
  <div class="cols"><section>…</section><section>…</section><section>…</section></div>
</article>
<script>
SL.fonts(['900 100px Unbounded','italic 700 100px "Bodoni Moda"']).then(()=>{
  SL.lockup(document.getElementById('hero-lk'),[
    {items:SL.it('SIO',{fam:'geo',w:900,fs:150},'#F3EEE2')
      .concat([{ch:'&',f:{fam:'did',w:700,it:1,fs:250},fill:'#F5BFC6',dy:28,under:true}])
      .concat(SL.it('LIÂM',{fam:'geo',w:900,fs:150},'#F3EEE2'))}
  ],{gap:0,vgap:-.015}).render(true);
});
</script>
```

## 技術實作與相容性

### 1. 輪廓碰撞字距（E 約束求解｜Canvas 2D `getImageData`）

- **做法**：每個字以 `fillText` 畫進離屏 canvas（`getContext('2d',{willReadFrequently:true})`），alpha>96 視為墨，逐列取左右墨緣；列方向膨脹 ±1.2% 字級，防止兩條斜邊在取樣間隙互穿。下一字原點＝與前面所有字（非只鄰字）所需距離的最大值；垂直方向以逐欄上下墨緣同理。輪廓以「字型字串＋字」快取。
- **支援**：Canvas 2D `fillText`／`getImageData` 為 Baseline Widely available（2015 年起全瀏覽器）。字型必須先 `document.fonts.load()` 才量得對，否則量到的是後備字型。
- **fallback**：無 canvas／無 JS 時顯示 HTML 標題（`.lk-fb`），以 `letter-spacing:-.055em; line-height:.8` 近似；字標為 SVG `<text>`，讀屏讀 `aria-label`。
- **實測**：以假 canvas（矩形斜字形）在 jsdom 跑全部四頁：無例外、全部 lockup 產生；原型以 60×60 合成字形驗證 T→A 鑽入 15px、L→A（腳擋住）不鑽入。效能估算：120px 字一字取樣約 10 萬像素，首屏五組字標合計約 40 字、首次求解估 40–70ms（之後快取），拖曳不重解。

### 2. CSS scroll-driven animations（B 動效與時間軸｜`animation-timeline:view()`）

- **做法**：〈字樣〉兩列大字的 `font-variation-settings:"wght"` 200→900 與 `letter-spacing` .32em→−.07em 綁 `animation-timeline:view(); animation-range:entry 0% cover 55%`。
- **支援（查證）**：Chrome／Edge 115+（2023-07）、Safari 26（2025-09）；Firefox 至 2026 年中仍在 `layout.css.scroll-driven-animations.enabled` 旗標後，為 Interop 2026 目標。來源：drweb.de〈CSS Scroll-Animationen ohne JavaScript〉、buildmvpfast.com〈CSS Scroll-Driven Animations Go Cross-Browser〉、Mozilla Connect 提案串。
- **fallback**：`@supports (animation-timeline:view())` 外的瀏覽器改以 IntersectionObserver（threshold .6）加 `.done`，以 0.9s transition 一次曝到底；再不支援直接最終態。reduced-motion 一律最終態。

### 3. 可變字重軸＝曝光（C 版面與樣式｜`font-variation-settings`／可變 `font-weight`）

- **做法**：Unbounded 可變 wght 200–900。〈相黏機〉「曝光」桿 300–900（step 50）同時改 canvas 量字的字重與 SVG `font-weight`，因此字變粗時輪廓變寬、整組字重新碰——過曝會把字「撐開」，正是照相打字的暗房現象。〈字樣〉以 `font-variation-settings` 動畫。
- **支援（查證）**：MDN `font-variation-settings` Baseline Widely available（2018-09 起）。注意：`@font-face` 描述子版本與 `FontFace.variationSettings` 不是 Baseline，本站不使用。Unbounded 的 wght 200–900 範圍查證自 Fontsource 套件說明。
- **fallback**：非可變字型環境下字重落到最近的靜態字重，碰字仍由實際輪廓求解，結果正確只是階數變少。

### 效能預算

單頁 84–90KB（含 54.8KB motion-library 子集），遠低於 350KB。動畫皆為 transform／clip-path；scroll-driven 動畫的 font-variation 會觸發重排但只作用於兩列。motion-library 同畫面 ≤2 個、離屏 destroy。
