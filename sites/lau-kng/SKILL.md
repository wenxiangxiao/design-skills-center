---
name: ise-katagami-stencil
description: Ise katagami (Shiroko and Jike, Suzuka, Mie) persimmon-paper dyeing stencils for the web — a full-bleed red-brown shibugami sheet is the "ink" and every image exists only as holes that let light through, carved in four knife vocabularies (kiribori awl dots, dōgubori punched shapes, tsukibori tapered cuts, shimabori stripes), every enclosed island bridged back to the sheet, silk threads across stripes and lettering, register "hoshi" holes and an uncut border, with brush ink labels and a vermilion seal.
---

# 伊勢型紙・渋紙彫透 Ise Katagami — Persimmon-paper Stencil Cutwork

> 範例站：`sites/lau-kng`（漏光噴砂玻璃 LĀU-KNG，新北三重〔品牌虛構〕）。風格與產業分離——這份規格可直接用在任何產業。

## 一、設計哲學

伊勢型紙是「染布用的模板」，不是給人看的畫——但它被拿起來對著窗看的時候，就成了一幅畫。三重縣鈴鹿市白子・寺家一帶的型屋從江戶時代起替全國染坊彫型：三、四層美濃和紙以柿渋（青柿子榨出的單寧）貼合、煙燻、陰乾，成為紅褐、硬韌、不怕水的「渋紙」；職人在上面彫孔，染坊把型壓在布上刮防染糊，糊乾後下染缸、洗掉糊，布上就留下孔的形狀。1955 年日本認定六位伊勢型紙職人為重要無形文化財保持者（含錐彫的六谷梅軒、糸入れ的城ノ口みゑ）。十九世紀大量型紙流到歐洲，被 Siegfried Bing 等人收藏，成為新藝術運動的參考來源之一。

這個風格的全部規則都來自「它是一張要拿去壓糊的紙」：

- **紙是墨，圖是孔**。褐色不是背景，是唯一的「墨」；所有圖像都是被彫掉的地方，看得見是因為光從後面透過來。
- **刀決定孔**。只有四種刀法，每種刀只彫得出一種孔，柄的個性從刀來，不從筆來。
- **紙要撐得住**。被孔圍住的紙會掉下來，所以每一塊都要用「繋ぎ」接回紙身；細到站不住的條要靠絲（糸入れ）或紗（紗張り）。
- **它是工具**。邊上有對位用的「星」、不彫的「縁」、墨書的柄名與型屋的印。

網頁上要做到的是「拿起來對光」那一刻：整頁是一張渋紙，內容與圖像都從孔裡被光照出來。

## 二、本風格的 5 個不可省略特徵

### 特徵 1：渋紙即墨——紙面滿版、圖只以孔存在（色彩規則＋版面手法）

整個首屏是一張紅褐渋紙（`#6E3518`，帶纖維與渋斑），**紙上零描邊、零漸層、零陰影**；圖與大字都是挖空的孔，孔裡看到的是紙後面的光（唯一允許漸層的地方）。拿掉這條——把圖案「畫」在紙上——它就變成普通的褐色印花。

```html
<section class="lit">
  <div class="light"></div>               <!-- 紙後的天光：唯一的漸層 -->
  <svg class="sheet" viewBox="0 0 1200 800" preserveAspectRatio="none">
    <defs>
      <pattern id="same" width="30" height="15" patternUnits="userSpaceOnUse"><!-- 錐彫的點 --></pattern>
      <mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="800">
        <rect width="1200" height="800" fill="#fff"/>                 <!-- 白＝紙留著 -->
        <rect x="40" y="40" width="1120" height="720" fill="url(#same)"/>  <!-- 黑點＝孔 -->
        <text x="60" y="700" font-size="380" font-weight="900" fill="#fff" stroke="#fff" stroke-width="60">漏光</text>
        <text x="60" y="700" font-size="380" font-weight="900" fill="#000">漏光</text>
      </mask>
    </defs>
    <rect width="1200" height="800" fill="#6E3518" mask="url(#m)"/>
  </svg>
</section>
```
```css
.lit{position:relative;isolation:isolate}
.lit>.light{position:absolute;inset:0;z-index:-1;
  background:radial-gradient(circle at var(--mx) var(--my),#FFFDF7 0,var(--sun) 22%,var(--sun2) 70%)}
```
大字外圍一定要先畫一圈白色 halo（`stroke-width≈.16em`），字與點陣之間留一條沒彫的紙，字才讀得出來。

### 特徵 2：四種刀的孔語彙（形狀語彙）

| 刀法 | 孔的形 | 代表柄 | 規則 |
|---|---|---|---|
| 錐彫 kiribori | 細小正圓 | 鮫・行儀・通し | 點徑 ≈ 間距 × .3；排成重疊扇鱗或斜格，遠看成灰 |
| 道具彫 dōgubori | 同一枚衝刀的形重複 | 梅・菊菱・霰 | 每個形一模一樣，半送り（half-drop）排列 |
| 突彫 tsukibori | 兩端尖細的刀痕 | 笹・萩・唐草 | 自由曲線，但葉與葉之間一定留紙 |
| 縞彫 shimabori | 等距細長條 | 萬筋・子持縞 | 一寸三十條以上稱萬筋；條上橫過絲 |

**全部是小紋級的細密重複**：單一孔的尺寸不超過畫面短邊的 3%（大字除外）。

```js
// 鮫小紋：重疊扇鱗，每鱗三道點弧，後排蓋前排（節錄自本站 common.js）
const W=s, H=s*.5, R=[.17,.33,.49].map(k=>k*s);
for (const c of centers) for (const [ri,r] of R.entries()) {
  const n=Math.round(Math.PI*r/(s*.085));
  for (let q=0;q<=n;q++){ const a=Math.PI+Math.PI*q/n, x=c[0]+Math.cos(a)*r, y=c[1]+Math.sin(a)*r;
    if (centers.some(d=>d[1]>c[1] && Math.hypot(x-d[0],y-d[1])<s*.52 && y<d[1])) continue; // 被下一排蓋住
    dot(x,y,s*(.019+.006*ri)); } }
```
```svg
<!-- 梅・道具彫：五瓣同一枚刀 -->
<g fill="#000"><circle cx="0" cy="-7" r="5.6"/><circle cx="6.7" cy="-2.2" r="5.6"/><circle cx="4.1" cy="5.7" r="5.6"/><circle cx="-4.1" cy="5.7" r="5.6"/><circle cx="-6.7" cy="-2.2" r="5.6"/></g>
```

### 特徵 3：繋ぎ與糸入れ——紙要撐得住（形狀語彙）

任何被孔完全包圍的紙都必須有一條「繋ぎ」接回紙身，否則會掉。突彫的圈要斷一格；縞彫的條上要有絲（1px 深褐細線橫過孔）；**大字也一樣**——整行標題被兩條細絲橫穿，這是型紙文字最醒目的特徵。

```svg
<!-- 標題上的兩條絲：畫在紙層上方，不在 mask 裡 -->
<g stroke="#4A2310" stroke-width="1.2" opacity=".9">
  <line x1="24" y1="452" x2="1176" y2="452"/><line x1="24" y1="588" x2="1176" y2="588"/>
</g>
```
```js
// 繋ぎ判定：從外框（縁）出發泛洪，連不到的紙就是會掉的島
function fallen(g,W,H){ /* 0=紙 1=錐（不切斷紙）5=糸（算紙） 其餘=孔 */
  const seen=new Uint8Array(W*H), q=[];
  for (let i=0;i<W*H;i++){ const x=i%W,y=i/W|0; if(x<2||y<2||x>=W-2||y>=H-2){seen[i]=1;q.push(i);} }
  while(q.length){ const i=q.pop(),x=i%W,y=i/W|0;
    for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){ const X=x+dx,Y=y+dy,j=Y*W+X;
      if(X>=0&&Y>=0&&X<W&&Y<H&&!seen[j]&&(g[j]===0||g[j]===1||g[j]===5)){seen[j]=1;q.push(j);} } }
  return [...g.keys()].filter(i=>!seen[i]&&(g[i]===0||g[i]===1||g[i]===5));
}
```

### 特徵 4：星與縁——它是一件工具（版面手法）

型紙四周留一圈**不彫的縁**（約短邊 4%，最少 18px），左右邊中點各有一個對位小孔「星」。導覽、標題框與資訊卡要壓在「縁」或「不彫的保留塊」上——在 mask 裡為它們畫白色矩形，讓紙在那裡是實的。

```js
// 資訊卡底下的紙不彫：讀取卡片位置，在 mask 裡補一塊白
keep.push([r.left-b.left-14, r.top-b.top-14, r.width+28, r.height+28]);
```
```css
.nav .hoshi{width:9px;height:9px;border-radius:50%;background:var(--sun);box-shadow:0 0 0 2px #2B170C}
```

### 特徵 5：墨書與朱印（字體選擇＋裝飾母題）

型紙上的文字只有兩種：**毛筆墨書**的柄名、刀法、彫師（楷書，`LXGW WenKai TC`，生成色紙條上墨字，左邊 5px 墨線）與**朱色方印**（3px 朱框、略傾）。被彫出來的大字用最粗的明朝體（`Noto Serif TC 900`），拉丁字用模板字（`Stardos Stencil`）——模板字本身就帶繋ぎ。

```css
.bokusho{font:400 15px/1.5 "LXGW WenKai TC",serif;color:#1C130D;background:#EFE6D2;padding:6px 10px 6px 12px;border-left:5px solid #1C130D}
.stamp{display:inline-grid;place-items:center;width:46px;height:46px;border:3px solid #B23A26;color:#B23A26;font:700 13px/1.05 "Noto Serif TC";transform:rotate(-4deg)}
```

## 三、色彩系統

| 色名 | hex | 用途 | 比例 |
|---|---|---|---|
| 渋紙 | `#6E3518` | 型紙本體＝墨 | 45% |
| 燻渋 | `#4A2310` | 頁面底、導覽、縁的煙燻 | 20% |
| 煤 | `#2B170C` | 年表帶、框線、絲 | 8% |
| 天光 | `--sun`（時間決定：`#FFFDF6` 正午～`#E39A4C` 夜燈） | 只出現在孔裡 | 10% |
| 生成 | `#EFE6D2` | 墨書紙條、資訊卡、價目 | 12% |
| 墨 | `#1C130D` | 墨書字 | 3% |
| 藍 | `#2A4A6B` | 型染的結果色、營業中 | 1% |
| 朱 | `#B23A26` | 印、警告 | 1% |

規則：**天光色不得用在紙面上**，只能透過孔出現；紙面不用任何漸層，只允許纖維紋理（`feTurbulence` 低對比）。

## 四、字體系統

- 彫字：Noto Serif TC 900，標題 clamp(40px,5vw,72px)，首屏大字 = min(.44 × 高, .34 × 寬)，行高 1.15。
- 墨書與內文：LXGW WenKai TC 400/700，17px／1.75。
- 拉丁：Stardos Stencil 700，字距 .14em，用於編號、價格、羅馬拼音。
- 直排：標題可 `writing-mode:vertical-rl`（導覽標籤、段落大標），字距 .25em。

## 五、版面與網格

- 左側 92px 渋紙導覽欄（手機改底部 74px），內容區不對稱：首屏滿版型紙；之後的段落以「型紙＋墨書紙條」交錯，型紙 1.25fr、文字 1fr，左右輪替。
- 年表用「掛在繩上的紙標」：寬度 38–52% 不等、左右交錯、上方 1px 吊線。
- 不旋轉；唯一允許的角度是朱印 −4°。
- 留白：段落上下 70–96px，縁的寬度隨畫面短邊 4%。

## 六、元件配方

- **導覽（下絵彫穿）**：三個母題（錐點、梅、縞）。未選的只有虛線下絵（`stroke-dasharray:3 3`）；hover 時 `clip-path:inset(0 100% 0 0)→inset(0)` 以 `steps(7)` 彫穿、透出天光；現用頁永遠是彫穿的。
- **按鈕**：生成色底、左 4px 朱線、無圓角；主要動作用天光色底。
- **卡片**：一律是「生成紙條＋左墨線」，不用陰影、不用圓角；壓在型紙上時要在 mask 裡留不彫的保留塊。
- **表格**：頂 3px 墨線、列間虛線；價格用模板字靠右。
- **footer**：渋紙紋理、三欄、最下方資料虛構聲明。

## 七、動效規則（四種，缺一不可）

| 類型 | 本站實作 | 觸發 | 時間 | reduced-motion |
|---|---|---|---|---|
| ambient | 紙後天光依臺北真實時刻換色（每分鐘），並有一道窗櫺光帶 90s 緩慢橫移 | 時間 | 90s linear 循環 | 光帶停住；顏色照樣隨時間（靜態資訊） |
| input | 游標＝手持燈：`--mx/--my` 跟著指標，靠近的孔變亮；導覽 hover 彫穿 | pointermove（rAF 合併，<16ms） | 即時；導覽 .38s steps(7) | 保留（使用者自己在動） |
| transition | 換頁＝把型紙掀起來：跨文件 View Transitions，舊頁 `rotateX(-58deg)` 往上掀、新頁 `clip-path` 由上往下鋪；〈四種彫〉「放在桌上」以 clip-path 把光收掉；〈噴一扇〉揭型 `rotateX(-70deg)` | 導覽、按鈕 | .55s cubic-bezier(.6,0,.3,1)；揭型 .85s | 無動畫、直接切換 |
| signature | **透孔打霧**：噴嘴由左而右走 1.9s，玻璃只在被彫穿的地方長出 `backdrop-filter` 霧面；沒有繋ぎ的紙島先掉下去、那一塊也整片霧掉 | 按「噴砂」 | 1.9s；落片 .9s | 一次到位，霧面與落片結果相同 |

自我限制：本風格**不用淡入滑入**當進場、**不用任何發光 `shadowBlur`**——光只能從孔裡來。

### motion-library 元件（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` 1.34.0 @6c948e93，逐頁子集（`tools/ml-embed.js`），`tools/ml-smoke.js` smoke ok。開發 Prompt 以 `MotionLib.prompt(id)` 取得。

| ID | 名稱 | 頁 | 參數 | 類型 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-10 | Dot Matrix | index〈為什麼是褐的〉 | primary `#FBF3E2`・secondary `#E9C894`・bg `#4A2310`・duration 6・density 1.5・intensity .8・seed 1976・16:9 | ambient | 點的大小隨同心波起伏，像燈在錐彫孔後面移動；只有圓點、零圓角矩形、零發光 |
| TXT-A-33 | Slice Text | index〈一張型，噴一扇窗〉 | primary `#6E3518`・secondary `#2A4A6B`・bg `#EFE6D2`・duration 1.4・loop false・seed 12 | transition | 六條橫帶左右交錯滑入成字，像縞彫一刀一刀拉；生成底→字色自動近黑 |
| TXT-A-35 | Stripe Mask | hori 頁首「四種彫」 | 同上配色・duration 1.5・loop false・seed 4 | transition | 14 條直條依序遮出字——縞與糸的節奏 |
| SHP-10 | Pattern Morph | hori〈道具彫〉 | primary `#6E3518`・secondary `#2A4A6B`・bg `#EFE6D2`・duration 3.2・loop・seed 41・1:1 | ambient | 5×5 的形由圓轉成菱：正是圓刀與菱刀兩枚道具 |
| BG-B-16 | Weave Grid | fuki〈紗張り〉 | primary `#C9A27A`・secondary `#8A4A26`・bg `#2B170C`・duration 9・density 1.3・intensity .7・seed 1920・4:5 | ambient | 經緯交織的格子＝貼在型紙背面的生絲紗 |

掛載規則：等 `document.fonts.ready`、離屏 `destroy()`、一次性文字元件進視窗播一次、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 八、插畫與圖像風格

全站**零插畫、零圖檔**：所有圖像都是型紙上的孔（`kakishibu-cutwork 渋紙彫透`）。窗外景（〈噴一扇〉玻璃後面）是唯一的平塗插圖——公寓、竹、晾衣、春聯——它的任務是讓霧面看得出來，所以要有細節與飽和色。

## 九、Logo 與 Favicon

一張正方渋紙，中央一朵道具彫的梅（五瓣同一枚刀、中心留紙與五道蕊線＝繋ぎ），左右兩個星；字標「漏光」為彫字、`LĀU-KNG` 為模板字；右上朱印「林」。Favicon 只留紙、梅、星。

## 十、Do & Don't

- Do：讓光只從孔裡出現；每一塊被圍住的紙都留繋ぎ；在大字上橫過絲；用墨書標柄名與彫師。
- Do：一頁一種刀為主，最多混兩種。
- Don't：把褐色當背景再把圖「畫」上去；用陰影、發光、圓角卡片；用紫藍漸層、emoji、Lorem ipsum、EST. 徽章。
- Don't：讓孔大到變成「挖空插畫」——型紙的美在小紋的密度。

## 十一、頁面骨架範例

```html
<nav class="nav paper"><span class="hoshi"></span>
  <a class="k" href="index.html" aria-current="page"><svg viewBox="0 0 56 56"><g class="draft">…</g><g class="cut">…</g></svg><b>對光</b></a>
</nav>
<main>
  <section class="open lit"><div class="light"></div><svg class="sheet"></svg>
    <h1 class="vh">店名</h1>
    <div class="o-label"><span class="bokusho">鮫小紋　錐彫</span><span class="stamp">漏<br>光</span></div>
    <div class="o-card kinari">…營業狀態、此刻的光…</div>
  </section>
  <section class="tq"><div class="panel lit" data-pat="ume"><div class="light"></div><svg class="sheet"></svg></div>
    <div class="tq-t"><h2><span class="v">道具彫</span><span class="lat">DŌGUBORI</span></h2><p>…</p></div></section>
</main>
```

## 十二、技術實作與相容性

### 1. `backdrop-filter` × `mask-image`（A 渲染層「mix-blend-mode / backdrop-filter 疊印」；backdrop-filter 最近 6 站未出現，mask-image 曾見於 pinn-kau-lang 的 mask-composite）

承載 signature 與特徵 1：玻璃層 `backdrop-filter: blur(7px) saturate(.45) brightness(1.12)`，其 `mask-image` 是一張 400×240 的 canvas `toDataURL()`——用與型紙挖洞**同一份孔幾何**畫成黑色，噴嘴每走過一欄就更新一次（全程約 41 次）。
- 查證：MDN `backdrop-filter` 標示 Baseline 2024（2024-09 起主流瀏覽器最新版皆可用），Safari 需同時寫 `-webkit-backdrop-filter`；`mask-image` 同寫 `-webkit-mask-image`。
- Fallback：`CSS.supports('backdrop-filter','blur(1px)')` 與 `-webkit-` 皆否時，加 `.nofilter`，霧面改為 `rgba(240,243,240,.9)` 不透明白霧——柄的形狀與結果完全相同，只少了模糊。

### 2. 繋ぎ連通性規則引擎（E 資料與生成層「約束求解／規則引擎」＋「圖論」；最近 6 站未出現）

承載特徵 3 與 func：40×24 格的型紙，每次下刀後從「縁」泛洪（4 鄰接），錐孔與糸視為紙、其他孔視為斷；連不到的紙島即時分島、各自以 WAAPI 掉落，並轉為霧面。node 實測每次判定 0.12ms。純 JS，無相容性問題。

### 3. 真實時刻驅動的天光（B 動效與時間軸層「matchMedia ＋ 時間驅動」；最近 6 站未出現）

承載 ambient 與特徵 1：以 UTC+8 換算臺北時刻，九段光色（天未光、東光、上晝、中晝、下晡西曬、黃昏、暗頭仔、夜燈）線性內插成 `--sun/--sun2`，每分鐘更新；`matchMedia('(prefers-reduced-motion: reduce)')` 決定光帶與所有動效是否停住。
- 換頁轉場用跨文件 View Transitions（`@view-transition{navigation:auto}`）；不支援的瀏覽器（如 Firefox）直接換頁、無損失。

### 效能預算實測

- 單頁大小：index 299.8KB、hori 298.9KB、fuki 313.2KB（含各頁 motion-library 子集約 269KB），皆 ≤350KB。
- 首屏 JS：型紙產生（1440×900，358 個 SVG 節點）jsdom 實測 5.1ms；繋ぎ判定 0.12ms／次。
- 動畫：天光只改 CSS 變數（合成層外的背景重繪限於 `.light`）；噴砂期間每欄一次 `toDataURL`（400×240）。本輪在無瀏覽器的排程環境建置，60fps 未能以真實瀏覽器量測，列為待驗。
