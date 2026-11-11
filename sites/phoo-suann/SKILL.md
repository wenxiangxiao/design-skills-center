---
name: wixarika-yarn-nierika
description: Wixárika (Huichol) yarn painting as a web style — every shape filled with parallel strands that follow its own contour inward, each figure closed by one contrasting outline strand, the background laid last so its strands echo outward around every figure; nine flat acrylic-yarn colours (fluorescent orange, magenta, chartreuse among them) with no gradients, no transparency and no shadows; titles laid as yarn along the glyph's distance field; square boards ringed by black-and-colour frame bands; deer, peyote flower, sun and maize motifs, frontal or in profile, with small coiled dots as filler.
---

# 維秋爾毛線畫 nierika・沿形鋪線 — 規格書

> 範例站：`sites/phoo-suann`（鋪線簇絨 PHOO-SUÀNN TUFTING，臺中大雅的簇絨地毯工作室）。
> 本規格書描述的是一種視覺語言，不綁定產業；它可以拿去做餐廳、唱片行、學校、花店。

## 設計哲學

**nierika**（Wixárika 語，常被譯作「門」「看見的通道」）是墨西哥西馬德雷山脈維秋爾族（Wixárika，舊稱 Huichol）的毛線畫：在木板上抹一層坎佩切（Campeche）蜂蠟，畫出輪廓，再用指甲或小刀把毛線一條一條壓進蠟裡。平板毛線畫一般認為成形於 1950–60 年代：Ramón Medina Silva 是公認的開路者，人類學家 Peter Furst 為 UCLA 等機構收購他的作品，1968 年洛杉磯郡立自然史博物館辦了他的個展；José Benítez Sánchez（1938–2009）1963 年起在 Comala、1970 年代在 Tepic 開工作室，把它推進世界各地的博物館。早期用羊毛與天然蜂蠟，後來改用更亮、更耐久的壓克力線——今天看到的「螢光」並不是現代設計師加上去的，是這個傳統自己選的材料。

這個技法長成這個樣子，是因為**線只能沿著自己的路走**：

- 線不能被「塗」上去，只能沿一條路徑壓下去。要把一塊形狀填滿，最省事也最牢的辦法是先沿外緣壓一圈，再貼著第一圈壓第二圈，一路往中間收——所以每個形狀裡的紋路都是**它自己外形的等距線**。
- 線沒有濃淡。要變色只能換一條線，所以色彩是**整條換、硬邊相接**，沒有漸層、沒有透明、沒有陰影。
- 圖形先鋪，底最後鋪。底線會沿每一個圖形的外緣繞，像水波一樣一圈一圈推開，碰到別的波就收成一道縫——**背景不是一塊色，是無數圈回音線**。

這三件事不是裝飾選擇，是材料與工序的後果。本規格書把它們寫成網頁可以執行的規則。

## 本風格的 5 個不可省略特徵

### ① 形狀語彙：沿形等距鋪線＋一圈對比外框線＋底的回音線

每一塊顏色都由「平行於它自己外形」的線一圈圈填滿，不准有平塗面。每個圖形的第一圈（最外圈）是對比色外框線（多半是黑，黑底上則是白／黃），把形狀「關起來」。底色最後鋪，它的線同樣沿所有圖形與板框推開，所以底面上看得到一層層回音。拿掉這條，畫面就退化成平塗插畫。

做法：形 → 標籤格 → 精確歐氏距離場 → 每隔一個線寬（pitch）取一條等值線 → 逐條描線。

```js
// 每條線的顏色：第 k 圈（k=0 為最外圈）
function colOf(r,k){ if(r.ol && k===0) return r.ol;          // 外框線
  const c=r.cols, j=r.ol?k-1:k; return c[j % c.length]; }       // 內圈依色序循環
// 等值線位置：L_k = pitch * (k + .5)；pitch＝線寬（30cm 板上 6/560 → 約 3.2mm）
```

```css
/* 線本身：寬 0.84 pitch 的圓頭描邊＋一股亮撚＋一股暗撚，縫隙露出同色系的暗 */
ctx.lineWidth = pitch*.84; ctx.lineCap = ctx.lineJoin = 'round';
/* 亮撚 */ ctx.setLineDash([pitch*.42, pitch*.62]); ctx.lineWidth = pitch*.2;  // mix(色, 白, .28)，左上偏移 .14p
/* 暗撚 */ ctx.setLineDash([pitch*.36, pitch*.68]); ctx.lineWidth = pitch*.16; // mix(色, 黑, .30)，右下偏移 .16p
```

### ② 色彩規則：九軸壓克力線、整條換色、相鄰兩圈不准同一軸

全站只准九個線色（見〈色彩系統〉），每一個都是不透明的平色。明暗只來自兩件事：線與線之間的縫（同色加深 45%）、線的撚（同色 ±28–30%）。**零漸層填色、零 opacity、零 rgba 第四位、零模糊陰影、零發光。**唯一的硬規則：同一塊板上，任何兩圈相鄰的線不准是同一個顏色——否則兩個形狀會黏成一個。

```css
:root{--K:#17120E;--W:#F4EEDC;--Y:#FFD21F;--O:#FF7A1A;--R:#E32631;
      --M:#E8238F;--G:#A6DB1E;--T:#12B5B0;--B:#2442C9;--wax:#2B1E14}
/* 縫色＝線色 mix 黑 45%：B→#142470、M→#80134F、T→#0A6461、R→#7D151B */
```

### ③ 字體選擇：標題是鋪出來的線；正文是圓潤的粗字，沒有細字

大標題不是字型直接上色，而是把字形畫成 alpha 遮罩、交給同一支鋪線引擎：外圈黑線、內圈兩色線沿筆畫的距離場鋪滿。原 HTML 文字保留（顏色改透明），讀屏與複製不受影響。正文用 Noto Sans TC 500／700／900，數字與拉丁字母用 Rubik 500／700／800——兩者的圓頭與厚度像線，**不准用 400 以下字重、不准用襯線體**。

```html
<h1 class="yt" data-c="Y,O,R"><span class="yt-t">鋪線</span></h1>
```

```css
.yt{font-size:clamp(52px,8.6vw,104px);color:var(--Y);-webkit-text-stroke:3px var(--K);paint-order:stroke fill} /* 無 JS 時的樣子 */
.yt.laid .yt-t{color:transparent;-webkit-text-stroke:0}  /* 鋪好才把字讓給 canvas */
```

### ④ 版面手法：方板＋同心框帶，內容住在一塊一塊的小板裡

畫面是一塊正方形的板，外圍有 3–6 圈「黑夾彩」的框帶；頁面上的每一塊內容也是一塊小板，用 box-shadow 的零模糊硬圈做框帶。頁面底色是一整片橫向鋪滿的線（每 6px 一道縫），每一頁換一種底色——就像每一幅 nierika 各有一個底。

```css
body{background:var(--ground) repeating-linear-gradient(180deg,var(--ground) 0 5px,var(--seam) 5px 6px)}
.board{background:var(--W);padding:28px 30px;margin:24px;
 box-shadow:0 0 0 4px var(--K),0 0 0 9px var(--c1),0 0 0 13px var(--K),0 0 0 18px var(--c2),0 0 0 22px var(--K)}
```

### ⑤ 裝飾母題：鹿、仙人掌花、太陽、玉米、神之眼，加線圈小點

圖像只用維秋爾毛線畫常見的母題，正面或側面、扁平、放射對稱：鹿（側身、分叉的角、背上的圓點）、仙人掌花（五瓣放射、花心一點）、太陽（圓面＋三角光芒）、玉米（直立的穗＋葉）、神之眼 tsikuri（兩根交叉的棒＋同心菱形線圈）。空處補上小小的線圈點。**這些母題在維秋爾人的信仰裡有自己的意思，網站不得替它們編造意義；練習圖要明說是簡化重畫，不得複製任何一位藝術家的作品。**

```js
// 母題由四種原語拼成（560×560 板座標）：E 橢圓、C 膠囊、P 多邊形、F 板框
{k:'deer',n:'鹿身',sh:[E(270,318,118,60,-.05),C(350,298,392,228,30),E(410,206,42,27,-.42),
  C(214,356,204,452,13),C(246,362,252,456,13),C(326,356,338,450,13),C(352,346,374,444,13)],ol:'K',cols:['O','O','Y','R']}
```

## 色彩系統

| 代號 | 色名 | hex | 用途 | 建議比例 |
|---|---|---|---|---|
| K | 夜黑 | `#17120E` | 每個形狀的第一圈、框帶的黑、全站正文 | 18% |
| W | 棉白 | `#F4EEDC` | 內容板、黑底上的外框線、花瓣尖 | 22% |
| Y | 玉米黃 | `#FFD21F` | 太陽、玉米、底的第一圈回音線、強調與 focus | 10% |
| O | 太陽橘（螢光） | `#FF7A1A` | 鹿身、光芒 | 8% |
| R | 朱紅 | `#E32631` | 框帶、日心；〈課與來歷〉頁的底 | 8% |
| M | 仙人掌桃（螢光） | `#E8238F` | 花瓣、鹿背的點；〈線架〉頁的底 | 8% |
| G | 嫩芽綠（螢光） | `#A6DB1E` | 花心、葉 | 5% |
| T | 湖綠 | `#12B5B0` | 框帶的冷色；〈打一塊〉頁的底 | 6% |
| B | 深海藍 | `#2442C9` | 首頁的底 | 15% |
| — | 蜂蠟 | `#2B1E14` | 還沒鋪線的板面（只在鋪的過程中看得到） | — |

對比實測（WCAG 2.1）：K 對 W 16.0:1；K 對 Y 12.8:1；W 對 B 6.7:1。正文只寫在 W 板（K 字）或 K 板（W／Y 字）上，**不直接寫在有縫的線地上**。

## 字體系統

- 來源：Google Fonts `Noto Sans TC`（500/700/900）＋`Rubik`（500/700/800）。
- 字級：鋪線標題 `clamp(52px,8.6vw,104px)`；小標題（`.yt.sm`）`clamp(40px,5.6vw,68px)`；h3 20px；正文 16px／1.75；kicker 12px Rubik 800 字距 .18em 大寫。
- 鋪線標題的線寬 `pitch = max(2.6, fontSize/24)`；筆畫要至少 3 圈（黑＋兩色），所以標題字重固定 900、不得小於 40px。
- 數字一律 Rubik tabular-nums。

## 版面與網格

- 內容寬 1180px、左右 28px（≤560px 時 16px）。
- 首頁：左 560px 方板＋右欄文字（不對稱 1:1.2），右上角固定 168×168 的神之眼導覽，文字欄右側讓出 150px。
- 所有內容板之間至少 22px（＝最外圈框帶），兩塊板的框帶不得相疊。
- 零旋轉；唯一的角度是神之眼 hover 時轉 12°。
- 留白：底色的線地就是留白，不另設米白空區。

## 元件配方

- **導覽（tsikuri 神之眼）**：兩根棉白交叉棒＋七層同心菱形（黑與彩相間），四臂端各一頁，現用頁為黑底黃字並多兩圈框；≤560px 落為底部四格黑條。
- **按鈕**：黃底黑字、三圈硬框（黑／桃／黑），hover 換綠底湖綠圈，active 換橘。
- **卡片**＝小板（`.board`），沒有圓角卡片、沒有模糊陰影。
- **表單**：棉白底、3px 黑硬框；選項（radio）做成線圈鈕，選中時翻黑底黃字並多兩圈框。
- **表格**：每列下緣一條 3px 黑線（一條線＝一圈）。
- **頁尾**：黑底，桃色 3px 分隔線；附店規四條。

## 動效規則

四種動效各有本站自製的實作，全部有 `prefers-reduced-motion` 降級且資訊零損失：

| 種類 | 實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 神之眼的七層菱形依序換色，像線一圈圈繞上去 | 常駐 | 4.8s `steps(1)` 無限，各層延遲 −0.6s | 停在單一配色 |
| input 輸入 | 游標下的那一區：黑外框翻白、撚痕加亮（Worker 內重鋪約 6–12ms）；〈線架〉線軸 hover 時線紋往上捲並抽出一段線頭 | pointermove／focus | 即時；線軸 .7s `cubic-bezier(.3,.8,.3,1)` | 外框翻白照常（是資訊，不是動畫） |
| transition 轉場 | 繞線轉場：以點擊點為心的同心線圈（黑黃黑桃黑湖綠黑橘）由 `@property --r` 撐開蓋住畫面，下一頁再從中心挖開 | 站內連結 | 進 .52s `cubic-bezier(.7,0,.3,1)`、出 .6s `cubic-bezier(.6,0,.2,1)` | 不做，直接換頁 |
| signature 簽名 | **沿形鋪線**：每一區先打外框那一圈，再一圈一圈往內，圖形先、框帶再、底最後；正在鋪的那一條以亮撚畫（指尖壓著），鋪完整條才以本色蓋回去 | 首頁載入、〈打一塊〉按「打」、標題進入視窗 | 首頁 8s、打一塊 6s、標題 1.3s，速度依總弧長等速 | 直接畫完整張 |

自我限制：本站不用淡入、不用視差、不用彈跳。

### motion-library 元件（1.38.0 @e1382805）

| ID | 名稱 | 頁 | 種類 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-A-11 | Repeat Lines | 首頁 | transition | text「外框先行」・primary `#FFD21F`・secondary `#E8238F`・bg `#17120E`・1.6s・once・seed 7・16:9 | 字的輪廓一層層向上下複製後收回本體——就是「外框先行」的回音線；黑底上字色自動近白 |
| BG-B-40 | Nested Squares | 首頁頁尾 | ambient | primary `#FF7A1A`・secondary `#12B5B0`・bg `#17120E`・8s・density 1・seed 1972・16:9（裁成 120px 條帶） | 同心方框依序轉 90°＝板的框帶與神之眼的菱形；只有描邊直線，無圓角無發光 |
| BG-A-11 | Parallel Curves | 線架 | ambient | primary `#E8238F`・secondary `#FFD21F`・bg `#17120E`・6s・density 1.1・seed 9・16:9 | 一束平行的波浪線＝一束還沒壓進蠟的線；每四條一條黃，是換軸 |
| TXT-A-30 | Reveal Outline | 打一塊 | transition | text「打一塊」・primary `#E32631`・secondary `#12B5B0`・bg `#F4EEDC`・1.8s・once・seed 3・16:9 | 先描出字的外框、再填實——與鋪線同一個順序；亮底上字色自動近黑 |
| BG-A-29 | Topo Lines | 課與來歷 | ambient | primary `#12B5B0`・secondary `#FFD21F`・bg `#17120E`・9s・density 1・seed 2014・16:9 | 兩個中心各自推開的等高線＝底線沿圖形推開、碰到別的波收成一道縫 |

出處：`MotionLib.prompt(id)`（wenxiangxiao/motion-library `src/motion-lib.js`）。掛載照 `sites/ka-to` 的 `KT.ml`：等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `once` 播一次、reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`；canvas `aria-hidden`，原 HTML 標題留在 `.ml-fb`。一個畫面最多兩個元件同時在跑。這些元件不是簽名——簽名只有沿形鋪線。

## 插畫與圖像風格

技法代號 `nierika-contour-strands`：全站沒有任何一張點陣圖或手繪 SVG 插圖。每一張圖都是同一支引擎依「形＋鋪線順序」算出來的：形以四種原語（橢圓／膠囊／多邊形／板框）宣告，層級越後越在上；距離場在 2px 格上算，等值線經 Chaikin 平滑一次再描。

- 圖形一律扁平、正面或側面、零透視、零光影。
- 每個圖形至少寬 2 個 pitch，否則只剩外框一圈——細部（鹿角）就讓它只有一圈。
- 小點用「圓＋外框一圈＋中心一色」，是線圈的縮影。
- 不得出現人像、神祇或任何特定作品的構圖。

## Logo 與 Favicon 設計指南

Logo＝神之眼：深海藍方底、兩根棉白交叉棒、十層同心菱形（黑、黃、黑、桃、黑、湖綠、黑、橘、黑、綠）。Favicon 是同一個構造縮成六層，寫成 inline SVG data URI。不得加字、不得加漸層或陰影；縮小時寧可減層，不可減掉黑夾彩的節奏。

## Do & Don't

**Do**

- 每一塊顏色都從外框開始往內鋪；底最後。
- 相鄰兩圈換軸；黑框裡不打黑。
- 正文放在棉白或夜黑的板上。
- 明說母題來源，並把收藏真品的管道指回維秋爾藝術家。

**Don't**

- 不要平塗色塊、漸層、透明、模糊陰影、發光、玻璃擬態。
- 不要用細字重或襯線體；不要讓正文直接坐在有縫的線地上。
- 不要把母題當成「神秘部落風」裝飾，不要替它們編造靈性意義，不要複製任何藝術家的作品。
- 去AI化禁令照舊：不要紫藍漸層 hero、不要置中大標＋兩顆按鈕＋三張圓角卡、不要 emoji icon、不要 Lorem ipsum、不要「EST. 19xx」徽章。
- 不要把它做成「墨西哥 68 回音線」：那是實心形外長出的等寬單色平行線、抽象幾何與無襯線字；本風格是**形內**往內收的多色線、具象母題、而且外框與底是兩套不同的線。

## 頁面骨架範例

```html
<body class="g-R"><!-- 每頁一種底：g-M／g-T／g-R，預設深海藍 -->
<nav class="tsk" aria-label="四頁">
  <svg viewBox="-60 -60 120 120" aria-hidden="true">…兩根棒＋七層菱形…</svg>
  <a class="up" href="index.html" aria-current="page">鋪線</a>
  <a class="rt" href="xian.html">線架</a><a class="dn" href="pu.html">打一塊</a><a class="lf" href="ke.html">課與來歷</a>
</nav>
<main>
  <section class="open wrap">
    <div class="nierika"><canvas id="board" role="img" aria-label="（描述整塊板）"></canvas></div>
    <div>
      <h1 class="yt" data-c="Y,O,R"><span class="yt-t">店名</span></h1>
      <div class="board c-OT"><p>一段話。</p><a class="btn" href="pu.html">主要動作 →</a></div>
    </div>
  </section>
</main>
<script id="yarn-core">/* core.js：形→距離場→等距線→鋪線；主執行緒與 Worker 共用 */</script>
<script>/* host.js：Worker＋OffscreenCanvas，失敗退回主執行緒 */
  PS.board(document.getElementById('board'),{motif:'kauyumari',autoplay:true,dur:8},onMsg);
</script>
</body>
```

## 技術實作與相容性

### 1. OffscreenCanvas＋Worker（A 渲染層；最近 6 站未出現）

承載特徵①與簽名：首頁與〈打一塊〉的板在 Worker 裡建距離場、串等值線、逐幀鋪線；主執行緒只收 `{t:'meta'|'prog'|'done'}` 訊息與一份標籤格（做游標查區）。Worker 由同一份 `<script id="yarn-core">` 原始碼加 12 行 shim 包成 Blob URL，`canvas.transferControlToOffscreen()` 之後以 transfer list 送進去。

- 支援：MDN 標示 OffscreenCanvas 為 Baseline Widely available（2023 年 3 月起跨瀏覽器可用），可在 Web Worker 中使用；`transferControlToOffscreen()` 同期。
- Worker 內沒有 `requestAnimationFrame` 時以 `setTimeout(16)` 代替。
- Fallback：沒有 `transferControlToOffscreen`、沒有 Worker、或建 Worker 失敗（例如 CSP 擋 blob:）→ 在主執行緒用同一個 `YC.Board`／`YC.Runner` 畫在 DOM canvas 上，畫面完全相同；連 canvas 都沒有 → 顯示文字與電話，〈打一塊〉的時段選單仍可用。

### 2. 精確歐氏距離場＋marching squares 等值線串接（E 資料與生成層「程序化圖樣生成」）

承載特徵①③：形以原語判定內外得到標籤格（280×280，每格 2px）；兩次一維 Felzenszwalb–Huttenlocher EDT 得到每格到「最近的換區邊界」的距離；在 `L_k=pitch(k+.5)` 取等值線，以邊編號串成封閉折線（鞍點以四角平均裁決），每條線記下它屬於哪一區、第幾圈、弧長。弧長同時是〈打一塊〉用線單的數據來源：線條長 × 9.6（每 cm 打 4 針、毛圈 1.2cm）＝用線長，÷2.2＝克數（100g≈220m）。

### 3. CSS `@property` 型別化自訂屬性補間（B 動效與時間軸層；最近 6 站未出現）

承載轉場：`@property --r{syntax:'<length>';inherits:false;initial-value:0px}` 讓 `mask:radial-gradient(circle at x y,#000 var(--r),transparent …)` 的半徑可以被 `transition` 補間；同心線圈本體是 `repeating-radial-gradient` 的硬停點帶。

- 支援：web.dev 2024-07〈@property: Next-gen CSS variables now with universal browser support〉；caniuse 列 Edge 85+、Firefox 128+。
- 偵測：以 `CSS.registerProperty` 是否存在判定；不支援時不做轉場，連結照常換頁（`--r` 無法補間時遮罩會瞬間跳到終值，所以乾脆不放）。

### 效能預算實測（node 20，同一份 core.js）

| 項目 | 實測 |
|---|---|
| 首頁鹿板建場（距離場＋219 條線） | 59–115 ms，**在 Worker 內**，不佔主執行緒 |
| 〈打一塊〉四張圖建場 | 20–38 ms（Worker 內） |
| 整板重鋪（hover 換區） | 4–12 ms（Worker 內） |
| 一個鋪線標題（450×127 格） | 約 15 ms（主執行緒，進視窗才建） |
| 單頁大小 | 209–214 KB（含 motion-library 子集約 171 KB，已 terser 壓縮） |

鋪線動畫每幀只畫新增的那一小段，所以每幀成本與總線長無關（約 1–2 條線的描邊）。

### 查證來源

- MDN〈OffscreenCanvas〉、〈HTMLCanvasElement.transferControlToOffscreen()〉
- web.dev〈@property: Next-gen CSS variables now with universal browser support〉（2024-07）；caniuse〈CSS at-rule: @property〉
- UCLA Fowler Museum, *Vital Matters*：Diana Negrín da Silva〈Techniques and Materials of Yarn Painting〉、〈Popularization of Yarn Painting in Mexico's History〉
- Wikipedia〈José Benítez Sánchez〉；Museum of International Folk Art〈Creation of the World〉
- Peter T. Furst, *Visions of a Huichol Shaman*（University of Pennsylvania Museum, 2003）
