---
name: bogolanfini-mudcloth-resist
description: Bògòlanfini (Bamana mud cloth, Beledougou, Mali) for the web — the cream motifs are whatever the mud did not touch, narrow strips sewn edge to edge with patterns that never line up across the seams, border registers painted first then five inner fields, a three-earth palette (iron mud, leaf yellow, sodani-bleached white), and hand-wobbled geometry including negative-space lettering.
---

# Bògòlanfini 泥染布 ── 風格規格書

## 設計哲學

Bògòlanfini 是班巴拉語「用泥做的布」（bɔgɔ 泥＋lan 用＋fini 布）。它來自馬利中部 Beledougou 地區，傳統上由班巴拉婦女製作，Kolokani 一帶的染布師以構圖清楚、對比強著稱（Smarthistory 以 Guancho Diarra 1985 年於 Kolokani 所作的腰布為例）。

製程決定了它的長相，這是本風格一切規則的源頭：

1. **布是縫出來的**：男人在窄幅織機上織出十幾公分寬的棉布條，在市場整捲賣；女人買回來邊對邊縫成一整幅。所以布面永遠有縫線，而且畫在不同條上的紋**不會剛好對齊**。
2. **布先變黃**：n'gallama 與 n'tjankara 兩種葉子煮水搗碎，布泡進去曬乾成黃色；葉中的單寧讓布吃得住泥。
3. **泥發酵**：從河床挖富鐵的泥，加葉子放進大甕，發酵最長可達一年。鐵與布上的單寧反應成黑。
4. **泥塗在背景**：間距用手量，**先畫邊框帶，再往內畫各場**；泥只塗在圖案以外的地方——圖案是泥繞過去留下的負形。塗一層、乾、洗、再塗，所以泥色有幾階深淺。
5. **sodani 漂白**：最後在沒塗泥的黃色上點苛性的 sodani，黃退成接近棉布原色的白，圖案這才亮出來。

紋有名字、有意思，但**意義是地方的、因人而異的**（Rovine 2001；Smarthistory）。Guancho Diarra 的腰布有五個主場，可辨識的紋包括：tiga「花生」（成排小點，與婦女在花生田的勞動相關）、celè ju「網底」（婦女背東西也用來捕魚的網袋）、sa-jè-ni「小白蛇」（一條長直線）、cè farin jala「勇者腰帶」（直向鋸齒，穿著表示勇敢）。

網頁轉譯的核心一句話：**你從不畫字和圖，你畫的是它們周圍的泥。**

參照：Smarthistory〈Bògòlanfini (mud cloth) wrapper〉（Guancho Diarra, Kolokani, 1985）；Victoria L. Rovine《Bogolan: Shaping Culture through Cloth in Contemporary Mali》（Smithsonian Institution Press, 2001）；Pascal James Imperato & Marli Shamir〈Bokolanfini: Mud Cloth of the Bamana of Mali〉（*African Arts* 3:4, 1970）；Nakunte Diarra（Kolokani）2003 年於華盛頓 Smithsonian Folklife Festival 的示範。

## 本風格的 5 個不可省略特徵

拿掉任何一項就不再是 bògòlanfini，只是「大地色幾何圖案」。

### ① 負形：白是泥沒碰到的地方

圖案與字從不以淺色畫在深底上，而是深色「繞過」淺色。實作上維持一張「留白遮罩」：遮罩白＝布，其餘全部塗泥。動畫時泥沿筆序長出來，留白自己浮現。

```css
/* 靜態版：負形字＝泥色底、布色字，邊緣是手剪毛邊，不是圓角膠囊 */
.neg{display:inline-block;background:#2A2019;color:#EFE6D3;padding:.16em .42em .2em;
 clip-path:polygon(0 4%,9% 0,23% 3%,41% 0,62% 2%,80% 0,100% 3%,98% 30%,100% 58%,99% 100%,78% 97%,57% 100%,36% 97%,17% 100%,1% 97%,2% 64%,0 33%)}
```
```js
// 動態版（Canvas）：mask[i]=1 是留白；order[i] 是這個像素被泥刷到的時間
c = mask[i] ? (bleached ? CLOTH : LEAF) : (order[i] <= progress ? MUD[level[i]] : LEAF);
```

### ② 窄幅縫合，紋在縫線兩側錯位

版面單位是「一條窄布」。一幅＝3–6 條；縫線看得見（2px 線＋每 9px 一針）；同一個紋跨過縫線時上下錯開 5–12px。

```css
.strips{--n:6;background-color:#EFE6D3;
 background-image:linear-gradient(90deg,transparent calc(100% - 2px),#D3C5A6 calc(100% - 2px));
 background-size:calc(100% / var(--n)) 100%}
```
```js
// 每條布有自己的垂直錯位：讀遮罩時第 k 條往下位移 off[k]
var kk = (x / stripW) | 0, sy = y - off[kk]; mask[i] = patternLayer[sy*pw + x] > 127;
```

### ③ 由邊往內：邊框帶先畫，內部分成數個「場」，一場只重複一個紋

上邊 tiga 點列、下邊 sa-jè-ni 直線、兩側 cè farin jala 鋸齒；內部 3–5 個矩形場，場與場之間留一條泥縫。筆序固定：上→下→左→右→各場→剩餘背景。

```css
.band-tiga{height:22px;background:#2A2019;
 background-image:radial-gradient(circle at 50% 50%,#EFE6D3 0 3.2px,transparent 3.6px);background-size:14px 11px}
.band-zig{height:26px;background:#2A2019;
 background-image:linear-gradient(135deg,#2A2019 0 33%,#EFE6D3 33% 45%,#2A2019 45% 100%),linear-gradient(45deg,#2A2019 0 55%,#EFE6D3 55% 67%,#2A2019 67% 100%);
 background-size:26px 26px;background-position:0 0,13px 0}
```

### ④ 三種土色，零漸層、零透明、零發光、零圓角

泥（三階深淺）、葉黃（未漂白）、布白（漂白後）。樹皮鏽紅只作 ≤5% 的狀態色。深淺只能用「另一階泥」表現，不能用 opacity 或漸層。

```css
:root{--mud:#2A2019;--mud2:#34281F;--mud3:#4E3B2C;--leaf:#CFA650;--cloth:#EFE6D3;--bark:#8F4A2A}
```

### ⑤ 手繪不勻：每個點、每條線都抖；字也是負形字

點是 9 邊形、半徑 ±20%；線每 9px 一個抖動頂點；泥的邊界以 30% 機率吃進/讓出一個像素（泥滲進棉纖維）。字用最粗的黑體（Noto Sans TC 900），寫進留白遮罩，周圍塗泥。

```js
function wdot(g,r,x,y,rad){g.beginPath();for(var i=0;i<9;i++){var a=i/9*6.2832,q=rad*(.8+r()*.4);
 g.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q);}g.closePath();g.fill();}
```

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 泥 0（第二層） | `#2A2019` | 主地、正文在布白上的字色 | ~45% |
| 泥 1（第一層） | `#34281F` | 泥的較淺一階（canvas 內為 `rgb(52,40,31)`） | 含於泥 |
| 泥 2（薄泥） | `#4E3B2C` | 縫線在泥上、氣泡、分隔虛線 | ≤4% |
| 布白（sodani 後） | `#EFE6D3` | 留白紋、正文底 | ~25% |
| 葉黃（未漂白） | `#CFA650` | 尚未塗泥的布、按鈕、強調 | ~15% |
| 葉黃縫 | `#B8913F` | 葉黃布上的縫線 | ≤2% |
| 樹皮鏽紅 | `#8F4A2A` | 錯誤、現用標籤 | ≤5% |

規則：泥上只放布白或葉黃；葉黃上只放泥色字；三種土色以外不得出現任何色相。

## 字體系統

- 中文：Noto Sans TC（Google Fonts）400 正文／500 輸入／900 標題與負形字。負形字一定用 900——細字留白會被泥的毛邊吃掉。
- 拉丁：Bricolage Grotesque 800（opsz 12–96），只用於大寫小標、價格數字。
- Scale：h1 clamp(30px,4vw,54px)；h2 clamp(26px,3.4vw,46px)；kicker .74rem／字距 .2em；正文 16px／行高 1.8。
- canvas 上寫字前必須 `document.fonts.load('900 80px "Noto Sans TC"', 字串)`，否則量寬錯、留白形狀錯。

## 版面與網格

- **一頁＝一幅布**：區塊背景用 `.strips`（3–6 條），每區條數可以不同（3、4、5、6），像不同的布。
- **場格（subgrid）**：價目、步驟這類並列資料做成「每條布一欄、每個場一列」：父層宣告列，子層 `grid-template-rows:subgrid`，於是不同長度的內容仍讓同一場對齊。
- 不旋轉、不傾斜；不對稱來自「場」的大小差（例如 60/40 分欄、場高 66/34）。
- 留白規則：場與場之間 8–12px 的泥縫；區塊上下 56–72px；左右 `clamp(16px,3.4vw,44px)`。

## 元件配方

- **導覽（縫幅導覽 seam-strips）**：右上角四條 44×108px 的窄布，邊對邊以 2px 虛線縫起；未在的頁是葉黃布＋泥色字，現用頁是「被塗了泥」的布（泥底＋布白字＋頂上一排 tiga 點），長 16px；hover 往下拉 7px。手機改為底部一列。
- **按鈕**：葉黃布被三圈泥框住 `box-shadow: inset 0 0 0 4px mud, inset 0 0 0 6px leaf, inset 0 0 0 8px mud`；hover 變布白；深色版反過來。零圓角。
- **卡片**：沒有卡片。用「一條布」：`border-left:3px dashed`（縫線）＋上方一個紋樣小布（canvas）。
- **表單**：3px 泥框、布白底、零圓角，focus 用 3px 葉黃外框。
- **頁尾**：一條 tiga 點列帶＋三欄。

## 動效規則

四種動效各至少一個本站自製實作：

| 類型 | 實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 泥池冒泡：泥面上的小圈 2→10px 長大後破成四點 | 布塗好後持續，每 260–780ms 一顆，最多 9 顆 | 1.5s／線性 | 不畫 |
| input | 泥刷：游標在布上刷，半徑 22–28px 內未塗的背景立刻塗泥（母題刷不到）；布乾後刷過是「第二層泥」，0.9s 後退回 | pointermove／pointerdown，<16ms | 即時 | 停用，布直接是完成狀態 |
| transition | 收布：換頁時六條泥幅由上往下依序垂下（40ms 錯開，.36s cubic-bezier(.6,0,.3,1)），下一頁再往下收走；價目布五條在捲動時從各自錯位縫回原位（scroll-driven） | 點站內連結／捲動 | .36s＋.42s | 直接跳頁；縫好的狀態 |
| signature | **負染顯形＋sodani 漂白**：泥依筆序（邊框→各場→背景）逐像素塗上背景，店名與營業狀態是泥繞過去的地方；塗滿後留白由縫線往內 1.5s 從葉黃退成布白 | 載入 | 邊框 2.4s、各場 2.8s、店名 6s（游標可加速）＋漂白 1.5s | 直接顯示漂白後的完成布，資訊零損失 |

自我限制：不使用淡入、不使用模糊、不讓任何元素旋轉。

### motion-library 元件（v1.11.0 @dc24b44，`tools/ml-embed.js` 子集＋`src/motion-player.js`）

| ID | 名稱 | 頁 | 參數 | 類型 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-38 | Zigzag Energy | index | colors {primary:#EFE6D3, secondary:#CFA650, bg:#2A2019}、duration 6、density 1.2、intensity 1、seed 4、loop、16:9 裁成 96px 帶 | ambient | 首頁步驟區上方一條會走的 cè farin jala 勇者腰帶；元件只畫 miter 折線、不透明、無發光，正好是特徵③的鋸齒邊框帶 |
| TXT-B-36 | Ink Bleed | index | text「泥染」、colors {primary:#2A2019, secondary:#8F4A2A, bg:#EFE6D3}、duration 2.4、loop:false 進視窗播一次、seed 16 | transition | 「泥染」兩字由一團團泥滲進布裡長出來＝塗泥的那一刻；布白底讓元件自動給近黑字 |
| BG-A-07 | Random Pop Dots | tng | colors {primary:#CFA650, secondary:#EFE6D3, bg:#2A2019}、duration 5、density 1.1、intensity .9、seed 11、loop、1:1 | ambient | 〈泉眼〉一節的池面：實心圓點彈出又縮回＝泥池底冒上來的泡；實心、無透明，也像 tiga 點列 |
| SHP-33 | Squiggle Draw | poo | colors {primary:#2A2019, secondary:#CFA650, bg:#EFE6D3}、duration 1.8、loop:false、按「上泥」完成才播、seed 3 | transition | 布寫好後畫出一條 sa-jè-ni 小白蛇——「一路平安過來」；單線、圓頭、無漸層 |
| TXT-B-39 | Crumble Down | lai | text「乾了就沖」、colors {primary:#2A2019, secondary:#8F4A2A, bg:#CFA650}、duration 2.2、loop:false 進視窗播一次、seed 18 | transition | 泡法一節的標題字掉下來、碎屑落地＝敷在身上的泥乾了、裂了、沖掉；葉黃底讓元件給近黑字 |

挑選時逐一讀過原始碼：五個元件都沒有 `shadowBlur`、沒有漸層、沒有 `rr()` 圓角；Ink Bleed 與 Crumble Down 有極少量 alpha 的碎點（<0.5 秒）。掛載包裝 `NI.ml` 照 `sites/ka-to` 的 `KT.ml`：等字型、離屏 `destroy()`、canvas `aria-hidden`、容器保留 HTML 標題（`.ml-fb`）；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。開發 Prompt 可用 `MotionLib.prompt(id)` 取得。同一畫面同時運轉的元件 ≤2。

## 插畫與圖像風格

全站沒有一張「畫」：所有圖像——首頁大布、頁首布、價目布上的紋樣小布、地圖、訊息布、八個紋的圖例——都是同一支負染渲染器 `NI.Cloth` 生成的：先在遮罩上用白色畫出母題與字（9 邊形點、抖動折線、同心環、透鏡形花瓣），每條布垂直錯位後合成，然後逐像素塗泥。

八個母題（前四個有出處，後四個本店自創並標明）：tiga 花生點列、celè ju 網底（對角網格留出小菱形）、sa-jè-ni 小白蛇（長直線）、cè farin jala 勇者腰帶（直向鋸齒）、泉眼（點＋兩圈環）、水火同源（三角火＋兩條波）、白河蓮（六瓣透鏡）、雞跤印（三趾＋後趾）。地圖的路是一條粗的抖動線——路是白的，因為泥繞過它。

## Logo 與 Favicon 設計指南

Logo：64×64 的泥色方巾由三條布縫成（縫線 `#4E3B2C` 上有葉黃斜針），左條 tiga 點、中條勇者腰帶鋸齒、右條兩個泉眼；全部是布白留白。不放字——店名永遠以負形字出現在布上。Favicon：32×32 泥底、一條布白鋸齒、兩側葉黃點。

## Do & Don't

**Do**：先決定留白遮罩再塗泥；讓紋在縫線兩側錯位；邊框帶先畫；每場只重複一個紋；字用 900 粗黑體並寫成負形；註明紋名出處與「意義因地因人而異」；自創母題要標明自創。

**Don't**：
- 不把布白的線畫在泥上（那是正形，不是泥染）。
- 不用漸層、透明、發光、模糊陰影、圓角卡片、膠囊按鈕。
- 不讓紋在縫線處完美接合；不把整幅做成單一連續平鋪圖樣。
- 不捏造「每個紋代表什麼」的萬用字典；不使用宗教儀式脈絡的紋。
- 去AI化禁令照舊：無紫藍漸層、無置中大標＋三卡片、無 emoji icon、無 Lorem ipsum、無「EST. 19xx」徽章。

## 頁面骨架範例

```html
<header class="hero" id="hero">
  <div class="hero-fb"><h1><span class="neg">店名</span></h1><p>營業狀態</p></div><!-- 無 JS 的備援 -->
  <canvas id="hero-cv" class="cloth-cv"></canvas>
</header>
<section class="strips" style="--n:5">
  <div class="cloth"><!-- 五條布、六個場：subgrid -->
    <article class="sp"><div><canvas data-tile="quan"></canvas></div><h3 class="nm">名稱</h3><div>溫度</div><div>時間</div><div>價格</div><div>附註</div></article>
  </div>
</section>
<script>
new NI.Cloth(document.getElementById('hero-cv'),{seed:1987,strips:W=>W>1100?6:4,misalign:12,
  auto:[[0,.4,2.4],[.4,.7,2.8],[.7,1,6]],
  compose:function(g,t,a){a.M.tiga(g,a.r,0,0,a.W,40,18);a.zone(0,0,a.W,40,0,.1,20);
    a.text('店名',60,260,180);a.zone(0,0,a.W,a.H,.1,1,22);}});
</script>
```
```css
.cloth{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));grid-template-rows:repeat(6,auto)}
.cloth .sp{grid-row:1/-1;display:grid;grid-template-rows:subgrid;border-left:3px dashed #34281F}
```

## 技術實作與相容性

### 1. Canvas 2D `getImageData`／`putImageData` 逐像素負染渲染器（A 渲染層）
- 承載特徵①②④⑤與 signature、input、ambient：兩張離屏遮罩（圖樣層逐條錯位、字層不錯位）→ `getImageData` 讀成 Uint8 遮罩 → 預算每像素筆序 `order`、漂白時間 `bt`、泥階 `lv`、棉紗紋 `fib` → 每幀一次迴圈寫 `ImageData` → `putImageData`。
- 查證：MDN `getImageData()` Baseline Widely available（2015-07）；`willReadFrequently` 是 `getContext()` 的 context 屬性（只給離屏遮罩）。
- 效能實測（Node 22＋@napi-rs/canvas，1440×800 CSS px）：像素數上限 640k（超過即降解析度，最低 0.75×）；建置＋首幀 ≈100ms、390×640 手機 ≈50ms；動畫中每幀一次全畫面迴圈 ≈2–4ms；布塗好後只 `putImageData` 快取＋畫氣泡，節流 25fps；離屏由 IntersectionObserver 停止。噪聲以每 4px 一格的粗格表查表，避免每像素算 value noise。
- Fallback：無 canvas／無 JS → `.hero-fb` 以 CSS 負形字顯示同一份文字；reduced-motion → 直接畫完成狀態。

### 2. CSS Grid `subgrid`（C 版面與樣式層）
- 承載特徵②③：價目布（五條×六場）、首頁五步、來店頁五步——每條布是父格線的一欄、跨全部列，子層 `grid-template-rows:subgrid`，同一場跨條對齊。
- 查證：caniuse／web.dev〈CSS subgrid〉：Chrome／Edge 117、Firefox 71、Safari 16；MDN 標為 Baseline 2023。
- Fallback：`@supports not (grid-template-rows:subgrid)` → 每條布 `display:block`，內容照順序直排，只是場不跨條對齊；≤860px 一律改成單欄直排。

### 3. CSS scroll-driven animations `animation-timeline: view()`（B 動效與時間軸層）
- 承載 transition「縫回來」：價目布五條各帶 `--off`（46／−34／58／−22／40px），`animation-range: entry 5% cover 38%` 內滑回 0，縫線同時由布白變回泥色。
- 查證：MDN `view()` 非 Baseline；Chrome／Edge 115+、Safari 26+ 支援，Firefox 穩定版仍在 flag 後（2026 Interop 項目）。
- Fallback：整段包在 `@supports (animation-timeline:view())` 與 `prefers-reduced-motion:no-preference` 內；不支援就是縫好的靜態布，資訊零損失。

### 其他
- 營業狀態以 `Intl.DateTimeFormat(…, {timeZone:'Asia/Taipei'})` 計算；〈留布〉的訊息以 `?m=&b=&d=&h=&n=&f=` 序列化，布號為 FNV-1a 36 進位前五碼。
- 單頁大小：約 150–160KB（含 motion-library 子集 ~111KB），低於 350KB。
