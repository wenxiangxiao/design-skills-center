---
name: pietra-dura-commesso
description: Florentine pietra dura (commesso fiorentino) — motifs built from cut pieces of natural stone set flush into a polished black ground, where every colour is a stone with its own grain, shading comes from choosing a different stone or a different part of the slab, seams are hairline, and frames are bands of contrasting stone strips.
---

# 硬石鑲嵌 Pietra dura（佛羅倫斯 commesso）

> 範例站：金石果子行 KIM-TSIO̍H（臺中第二市場水果行 × 硬石鑲嵌）。本規格書不綁產業；任何「挑」是核心手藝的品牌——水果、茶、香料、寶石、木料——都能用。

## 設計哲學

硬石鑲嵌（pietra dura，佛羅倫斯稱 *commesso*）是十六世紀末在佛羅倫斯成形的工藝：一五八八年梅迪奇家族的托斯卡尼大公 Ferdinando I 在烏菲茲設立宮廷工坊 Galleria dei Lavori（今 Opificio delle Pietre Dure 的前身），最初是為聖羅倫佐教堂的君主禮拜堂 Cappella dei Principi（1605 年起建）供應整面的鑲石牆。工坊產品包括桌面、櫃門、小型掛板與首飾盒，主題多是花、果、鳥、蝶，常放在一片拋光黑石上；同一套方法也出現在蒙兀兒印度（泰姬瑪哈陵的 *parchin kari*）。

它長成這樣，是因為材料的限制：

1. **不能調色。** 硬石不是顏料，要一塊亮一點的橙，就只能去找一塊亮一點的石頭，或在同一塊料上換一處紋路切。所以畫面上每一個色塊都有自己的天然紋——那就是這個風格的「筆觸」。
2. **每一片都要切得下來。** 匠人用弓形線鋸加金剛砂一片一片鋸，形狀因此是大而完整的輪廓，沒有細碎筆觸；陰影是一整片暗石，高光是一整片淺石，接縫就是素描線。
3. **黑地要能把顏色托出來。** 比利時黑石（nero del Belgio）或試金石（paragone）拋光後近乎鏡面，所有石色在上面都顯得更深更亮。
4. **最後一步是一起磨。** 嵌好之後整面研磨拋光——顏色是磨出來的，未拋光的石頭灰而霧。

本館的做法：把「不能調色、只能選石」寫成程式規則——十二種石紋由自寫的週期 value noise 生成，每一片嵌片是一組 SVG 路徑交集，顏色只能透過**換石**或**移動紋路**取得。

## 本風格的 5 個不可省略特徵

### ① 拋光黑石地（nero）＋一道斜照反光

整個畫面是一塊黑石，內容全部「嵌」在裡面。黑不是純黑，帶極細石粒；畫面上唯一的漸層是光在拋光面上的反射，而它只能是一道窄而亮的斜帶，不是背景色。

```css
:root{--nero:#121110;--nero2:#1B1917}
body{background:var(--nero) var(--st-nero,none)}           /* --st-nero＝程式生成的黑石紋 data URL */
.polish{position:relative;overflow:hidden;isolation:isolate}
.polish::after{content:"";position:absolute;inset:-10% -40%;pointer-events:none;mix-blend-mode:screen;
  background:linear-gradient(104deg,transparent 42%,rgba(255,246,226,.075) 48%,rgba(255,246,226,.16) 50%,rgba(255,246,226,.075) 52%,transparent 58%);
  transform:translateX(-60%);animation:sheen 13s cubic-bezier(.45,0,.2,1) 2.8s infinite}
@keyframes sheen{0%{transform:translateX(-60%)}38%,100%{transform:translateX(60%)}}
```

### ② 以石代色：每個色塊都是一片有天然紋的石，絕不平塗

色塊＝石片。陰影不是把顏色調暗，是換一種更暗的石（甜柿背光面用紅碧玉、受光面用紅玉髓）；葉子永遠由兩種綠石各切一半（孔雀石＋綠碧玉）。片與片之間是 1.5px 的深色接縫。

```js
// 嵌片＝路徑交集＋石紋 pattern；移動 gx/gy、轉 gr＝在整塊料上換一處切
ctx.save(); piece.paths.forEach(p=>ctx.clip(p));
const pt=ctx.createPattern(stoneCanvas('corniola'),'repeat');
pt.setTransform(new DOMMatrix().translate(piece.gx,piece.gy).rotate(piece.grDeg).scale(2));
ctx.fillStyle=pt; ctx.fill(piece.paths[0]);
ctx.lineWidth=1.6; ctx.strokeStyle='rgba(7,6,5,.88)'; piece.paths.forEach(p=>ctx.stroke(p)); // 接縫
ctx.restore();
```

```svg
<!-- 無 JS 備援：同一份路徑，平均色＋clipPath（受光面＝果身 ∩ 偏左上的圓） -->
<clipPath id="body"><path d="M418 440 L…Z"/></clipPath>
<path d="M418 440 L…Z" fill="#8C241E" stroke="#070605" stroke-width="1.4"/>
<path clip-path="url(#body)" d="M…(偏移圓)…Z" fill="#AF4924" stroke="#070605" stroke-width="2.8"/>
```

### ③ 博物誌式孤立母題，大片少片

花、果、葉、枝、鳥，寫實但由少數大片組成：一顆果子 3–5 片（果身／受光面／高光／蒂或萼），高光永遠是一片乳白的玉髓或白大理石，不是白色顏料。母題浮在黑地上，沒有地平線、沒有投影。

```js
// 一顆甜柿＝五片
[{n:'果身',s:'rosso',d:[body]},{n:'受光面',s:'corniola',d:[body,lightCircle]},
 {n:'高光',s:'calcedonio',d:[body,smallEllipse]},{n:'果萼',s:'verde',d:[fourLobe]},{n:'蒂',s:'agata',d:[stem]}]
```

### ④ 幾何石帶邊框與橢圓章

外框是一條對比石條（錫耶納黃大理石），內緣一道細綠碧玉線，四角各一塊青金石方塊；小件用橢圓「章」框。框也是嵌片，不是 CSS 邊線顏色。

```css
.band{position:relative;border:14px solid #A98638;outline:4px solid #55723A;outline-offset:-18px}
html.tx .band{border-image:var(--st-siena) 14 / 14px stretch}            /* 框條本身是石紋 */
.band::before,.band::after{content:"";position:absolute;top:-14px;left:-14px;width:14px;height:14px;background:var(--st-lapis) 0 0/96px}
.band::after{left:auto;right:-14px}
.oval{aspect-ratio:300/220;border-radius:50%;border:8px solid transparent;background:var(--st-siena) border-box}
```

### ⑤ 嵌字：羅馬碑刻大寫＋宋體，字面是石

標題是「嵌進去的字」：拉丁文用碑刻大寫（Cinzel），中文用 Noto Serif TC 900，字面以 `background-clip:text` 填錫耶納黃大理石紋；字距寬，詞間用中點「·」。內文不嵌，用溫白大理石色。

```css
.inlay{color:#D7B460}
html.tx .inlay{background-image:var(--st-siena);background-size:256px;-webkit-background-clip:text;background-clip:text;color:transparent}
.cap{font-family:"Cinzel",Georgia,serif;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
/* KIM · TSIO̍H · KUÉ-TSÍ-HÂNG */
```

## 色彩系統

所有色值都是「石的平均色」。站上的大面積顏色只有黑石與內文白；其他顏色只以「一片石」的形式出現。

| 角色 | 石 | 平均色 | 比例 | 用途 |
|---|---|---|---|---|
| 地 | 黑石 Nero del Belgio | `#121110`（面板 `#1B1917`） | 約 62% | 整片地、所有面板 |
| 內文 | 白大理石 Bianco | `#E8E4DB`（次級 `#ADA79B`） | 約 14% | 內文、次級文字（對黑 15.1:1／8.0:1） |
| 框與嵌字 | 錫耶納黃大理石 Giallo di Siena | `#D7B460` | 約 8% | 外框條、標題嵌字、連結、focus |
| 現用與強調 | 紅玉髓 Corniola | `#C4522A`（UI `#D0602F`） | ≤3% | 本季標記、警示、果的受光面 |
| 角方 | 青金石 Lapis | `#24408F` | ≤2% | 框角方塊、水（地圖） |
| 葉 | 孔雀石 Malachite／綠碧玉 Verde | `#1E7E55`／`#55723A` | ≤6% | 葉的陰陽兩半、框內細線 |
| 其他石 | 紅碧玉 `#9C2A23`、黃碧玉 `#CB9733`、玉髓 `#D2D7DA`、瑪瑙 `#9C6A42`、紫水晶 `#6A3F82` | — | 只在嵌片 | 果實 |

規則：零純黑 `#000`、零純白 `#FFF`；零色彩漸層（唯一合法的漸層是 ① 的反光帶與燈）；零模糊陰影、零發光；任何色塊若沒有石紋，就要能說出它「是哪一種石的平均色」（無 JS 備援時）。

## 字體系統

- 拉丁大寫：**Cinzel** 400/700（Google Fonts），碑刻比例，全大寫、字距 .16–.4em。
- 拉丁斜體：**Cormorant Garamond** Italic 500，用於石名學名、拉丁小註。
- 中文：**Noto Serif TC** 400／600／900。標題 900、字距 .06–.12em；內文 400、17px、行高 1.75。
- 字級：h1 `clamp(46px,5.6vw,84px)`／h2 `clamp(28px,3.4vw,44px)`／h3 18–22px／kicker 12px Cinzel 700 .3em／內文 17px／註 14px。
- 數字：價格用 Cinzel 700；年份可用羅馬數字當 kicker，但**不做「EST. 年份」徽章**。

## 版面與網格

- 左側固定 104px 石樣盤（導覽），主欄最大 1180px（首屏 1360px），兩側 40px 留白；≤820px 導覽落到底部。
- 首屏是一整塊掛板（canvas 1000×640），佔 62%；右欄是嵌字店名與本季。
- 區塊之間用 14px 錫耶納石條（`<hr class="rule">`）而不是空白或細線。
- 不旋轉、不傾斜；畫面的動勢只來自母題本身（枝條的對角線）。
- 面板內留白＝黑石，鼓勵大面積空黑：母題總面積不超過板面 45%。

## 元件配方

- **導覽（石樣盤 cabochon tray）**：四枚橢圓石樣（青金石／孔雀石／紅玉髓／錫耶納），石樣面是真石紋 `background:var(--st-lapis) 0 0/96px`；現用頁那枚放大並換錫耶納邊框、字轉黃。
- **按鈕**：0 圓角、2px 錫耶納框、透明底；`.solid` 為錫耶納實底黑字。hover 互換。
- **卡片**：`#1B1917` 面板，無陰影；重點卡左側 10px 石條（`border-image:var(--st-corniola) 0 0 0 10 / 0 0 0 10px stretch`）。
- **橢圓章（月份卡）**：`aspect-ratio:300/220;border-radius:50%`＋8px 錫耶納石框，上緣一枚羅馬數字標籤；本季那枚標籤換紅玉髓。
- **表單／分享框**：黑底、1px 錫耶納框、0 圓角、等寬字只用在網址。
- **footer**：上緣 14px 石條，最後一行是 Cinzel 碑刻句，以「·」分詞。

## 動效規則

四種動效，全部 `prefers-reduced-motion` 降級為最終靜態，資訊零損失。

| 種類 | 本站自製實作 | 觸發 | 時長／easing |
|---|---|---|---|
| ambient 環境 | 拋光面斜照反光帶掠過（① 的 `.polish::after`） | 永續 | 13s 週期、移動 38% 時間、`cubic-bezier(.45,0,.2,1)`，延遲 2.8s |
| input 輸入 | 游標＝斜照燈：拋光面上的高光跟著指標走；嵌片 hover 換金色接縫並顯示石名與產地 | pointermove | 即時（<16ms，CSS 變數 `--lx/--ly`） |
| transition 轉場 | 鋸縫轉場：一道 2px 錫耶納線鋸由左切到右，黑石板跟著蓋上，下一頁從左緣退開；月份章以 FLIP 放大成整張石板 | 點內部連結／點月份章 | 420ms／500ms `cubic-bezier(.6,0,.3,1)`；FLIP 420ms `cubic-bezier(.2,.7,.2,1)` |
| signature 簽名 | **逐片入槽**：板上先只有虛線刻出的槽，嵌片依工坊順序（枝→葉→果身→受光面→高光→框）一片片落入，每片自上 7px 落下、ease-out cubic | 板進入視窗 | 掛板 3.6s、月份章 1.4s、地圖 2.0s |

降級：reduced-motion 時嵌板直接畫完、反光帶停在中央 50% 透明、鋸縫轉場取消、FLIP 取消。

自我限制：不做淡入當主打、不做數字滾動、不做描邊動畫（stroke-dashoffset）。石頭不會彈跳。

### motion-library 元件表（motion-library 1.15.0 @f216548，`tools/ml-embed.js` 子集 inline 為每頁第一個 `<script>`）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| BG-A-29 | Topo Lines | 石（首頁） | primary `#C9A34A`、secondary `#E8E4DB`、bg `#121110`、duration 10、density 1.1、intensity .8、seed 1971、16:9 裁成 120px 帶 | 兩組會呼吸的等高線＝剖開的瑪瑙同心紋，放在首屏下方當一條「瑪瑙帶」；只有線、沒有填色與發光，不破壞「色塊都是石」 | ambient |
| BG-B-21 | Ripple Rings | 盒 | primary `#2FA06A`、secondary `#D7B460`、bg `#121110`、duration 6、density 1、seed 12、1:1 | 同心圓擴散＝孔雀石的同心紋章，放在標題旁的圓章裡 | ambient |
| SHP-34 | Circle Draw | 配 | primary `#D7B460`、secondary `#D0602F`、bg `#121110`、duration 1.8、loop false、seed 6、1:1 | 一道錫耶納弧被畫滿一圈＝橢圓章框被嵌完；進頁播一次，按「拋光」時重播當完成的轉場 | transition |
| SHP-15 | Ring Expand | 來 | primary `#D0602F`、secondary `#D7B460`、bg `#121110`、duration 2.6、loop、seed 87、1:1、`mix-blend-mode:screen` 疊在地圖上 | 本店位置的紅玉髓章向外擴三圈，告訴你「在這裡」 | ambient |
| BG-A-11 | Parallel Curves | 來 | primary `#9A958B`、secondary `#7A4434`、bg `#E8E4DB`、duration 12、density .8、intensity .7、seed 3、16:9 裁成 150px 帶 | 白底上起伏的灰線＝白大理石的石脈，頁尾前一條「白大理石帶」 | ambient |

重現：`MotionLib.prompt(id)` 可取得各元件的原始開發 Prompt；掛載時一律等 `document.fonts.ready`、離屏 `destroy()`、canvas `aria-hidden`、容器保留 `.ml-fb` 文字備援，reduced-motion 時背景 `seek(.35)`、一次性元件 `seek(1)`。同一畫面同時運轉的元件 ≤2。

## 插畫與圖像風格

技法代號 **commesso-stone-field（石紋嵌片場）**：全站沒有一張圖檔。每張圖＝一份「片表」：

- 片＝`{n 名稱, s 石種, d:[路徑…交集], gx, gy, gr 紋路位置與角度, o 工序}`；線片（枝、梗、街道）＝`{k:'line', d, w}` 用石紋描邊。
- 果實由參數產生器組成：`lobed(cx,cy,r,squash,lobes,amp,rot)`（柿、柑、芭樂、荔枝殼）、`kidney`（芒果）、`bell`（蓮霧）、`leaf`（兩半葉，回傳陰陽兩條路徑）、`grapes`（倒三角排列）。
- 受光面＝果身 ∩ 一個偏左上的圓；高光＝果身 ∩ 一個小橢圓——永遠是「交集」，所以每片都切得下來。
- 石紋：十二種，週期 value noise（格點取模，可無縫平鋪）＋3–4 層 fbm＋domain warp。條帶石（孔雀石、瑪瑙）用 `frac(v*N + fbm)`；大理石脈用 `|sin(…+fbm)|` 的窄谷；青金石另撒黃鐵礦亮點。
- 地圖也是一塊嵌板：白大理石條＝街、青金石＝河、綠碧玉＝公園、紅玉髓橢圓＝本店。

## Logo 與 Favicon 設計指南

- Logo：一枚直立橢圓石樣盤——外圈錫耶納、細綠碧玉線、黑石心，裡面一顆五片嵌成的甜柿加一片兩半葉。只用石的平均色，無描邊。
- Favicon：同一枚橢圓，去掉葉子，inline SVG data URI。
- 字標：「金石果子行」Noto Serif TC 900＋「KIM-TSIO̍H KUÉ-TSÍ-HÂNG」Cinzel 700 .3em。

## Do & Don't

**Do**
- 先決定「這一塊是什麼石」，再決定它的顏色；換顏色＝換石或換紋路位置。
- 葉子一定兩半、兩種綠。
- 讓黑地佔大面積，母題稀疏地浮在上面。
- 標題嵌字，內文不嵌。
- 每塊嵌板都要有一份無 JS 的 SVG 備援（平均色＋clipPath）。

**Don't**
- 不平塗、不用顏色漸層做立體、不加 drop-shadow 或發光。
- 不用白色顏料畫高光——高光是一片淺色的石。
- 不用鍍金與 Art Deco 放射扇（那是另一個流派）；錫耶納黃是大理石不是金屬。
- 不做圓角卡片、不做紫藍漸層 hero、不用 emoji、不做「EST. 年份」徽章、不寫「把 X 變成 Y」標題。
- 不把石紋當背景圖鋪滿版面（地只有黑石一種）。

## 頁面骨架範例

```html
<div class="shell">
  <nav class="tray" aria-label="主選單">
    <a class="cab" href="index.html" aria-current="page" style="--c:#24408F;--t:var(--st-lapis)"><i aria-hidden="true"></i><b>石</b><span>PANEL</span></a>
    <!-- 盒／配／來 -->
  </nav>
  <div class="main">
    <section class="hero"><div class="wrap">
      <figure class="board-wrap polish" data-lamp>
        <svg class="fb-svg" viewBox="0 0 1000 640"><!-- 平均色備援 --></svg>
        <canvas id="panel" width="1000" height="640" role="img" aria-label="描述整塊板"></canvas>
      </figure>
      <div class="lede"><span class="kick">臺中第二市場旁</span><h1 class="inlay">金石<br>果子行</h1>
        <span class="roman cap">KIM-TSIO̍H KUÉ-TSÍ-HÂNG</span></div>
    </div></section>
    <hr class="rule">
    <footer class="foot">…<p class="inscr">KIM · TSIO̍H · PIETRA DURA</p></footer>
  </div>
</div>
<script>
const bd=KJ.Board(document.getElementById('panel'),1000,640,FR.panel().concat(KJ.frame(1000,640)),{t:0});
new IntersectionObserver(es=>{if(es[0].isIntersecting)bd.assemble(3600)}).observe(bd.cv);
</script>
```

## 技術實作與相容性

本站認領三項核心技術（ledger `tech`），各自承載視覺特徵，不是裝飾：

1. **自寫週期 value noise＋fbm＋domain warp 生成十二種石紋**（E 資料與生成層「noise 自寫」）——承載特徵②：每片石的顏色差異來自紋路。整數雜湊格點、smoothstep 內插、格點座標對週期 P 取模，因此 128×128 貼圖可無縫平鋪；`ImageData` 寫入後轉 canvas 給 `createPattern`。實測：node 22 生成全部 12 種 128² 貼圖共 55ms；頁面只在用到時才生成（首頁首屏需 9 種，約 40ms）。
2. **Canvas 2D `Path2D` 交集裁切＋`CanvasPattern.setTransform(DOMMatrix)`**（A 渲染層）——承載特徵②③④與簽名動效：每一片＝多條 Path2D 依序 `clip()` 的交集，再以平移／旋轉後的石紋 pattern 填色；`isPointInPath` 做 hover 判片。
3. **Pointer Events（pointer capture＋`getCoalescedEvents()`＋`pressure`）**（D 輸入與感測層）——承載〈配一塊石〉：在槽上拖曳即在整塊料上移動紋路，筆壓越重紋路走越快；滑鼠 `pressure` 回報 .5。

查證（2026-10-25）：
- `setPointerCapture()`：MDN 標示 Baseline Widely available（2020 年 7 月起各瀏覽器皆可用）；無效 pointerId 會拋 `NotFoundError`。來源：MDN〈Element: setPointerCapture() method〉。
- SVG `<pattern>`／`patternUnits` 與 `clipPath`：MDN 標示 2015 年 7 月起跨瀏覽器可用，用於無 JS 備援。來源：MDN〈SVGPatternElement: patternUnits property〉、〈SVG from scratch: Patterns〉。
- `CanvasPattern.setTransform()`、`Path2D(svgPath)`、`DOMMatrix`、`getCoalescedEvents()`：現代 Chromium／Firefox／Safari 均支援（Safari 對 `getCoalescedEvents` 支援較晚）。程式皆有防呆：沒有 `setTransform` 時石紋不位移但仍填色；沒有 `getCoalescedEvents` 時改用單一事件。

Fallback 具體行為：
- 無 JS／無 canvas：每塊嵌板顯示同一份片表輸出的 SVG（平均色＋clipPath），導覽石樣與標題退回平均色；配石頁顯示畫稿 SVG 與文字說明各片該用哪種石。
- 不支援 `background-clip:text`：標題顯示錫耶納平均色 `#D7B460`。
- reduced-motion：嵌板直接完成、反光帶停格、無轉場。

效能預算：檔案大小為實測——index.html 約 220KB、box.html 約 295KB、pei.html 約 174KB、visit.html 約 163KB（皆含 inline motion-library 子集 106KB，≤350KB）。JS 時間：石紋生成以 node 22 實測 12 種共 55ms，首頁實際只用到其中 10 種；瀏覽器端幀時間本輪**未能實測**（建置環境沒有可用的無頭瀏覽器），只以 jsdom＋假 canvas 跑過全部頁面的腳本與互動流程、零錯誤。掛板組裝動畫每幀重繪約 76 片；若低階機掉幀，可把 `assemble()` 改為只重繪新落下的那一片。motion-library 元件同畫面最多 1–2 個，離屏即 destroy。

風格外部參照：Opificio delle Pietre Dure（Wikipedia／Britannica〈commesso〉）；Finestre sull'Arte〈History of the Florentine commesso〉；Cappella dei Principi（San Lorenzo, Firenze）；泰姬瑪哈陵 *parchin kari*。
