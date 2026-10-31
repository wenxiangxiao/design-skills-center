---
name: gothic-medallion-stained-glass
description: Early Gothic medallion stained glass (Chartres c.1200–1240) for the web — pot-metal ruby and blue glass in thick black lead cames, iron armature panels, grisaille-painted detail, medallions read bottom-to-top over a mosaic diaper ground, a donor "signature panel" at the foot, and a real-sun light pool that projects the window onto the page text.
---

# 哥德圓章花窗 Gothic Medallion Stained Glass（沙特爾鞋匠署名格半身）

> 範例站：`sites/thang-kha`（窗腳手工皮鞋，臺北中山北路）。本規格書不綁產業；任何「需要被一格一格讀」的品牌都適用：手工業、書店、麵包店、診所的流程說明。

## 1. 設計哲學

花窗不是「彩色玻璃風的插畫」，它是**光的建築構件**。十二、十三世紀法國北部的玻璃匠受三件事限制，風格全部從這三件事長出來：

1. **玻璃只能吹成小片**（pot-metal：在坩堝裡整鍋染色，吹成圓筒再攤平），所以一個形狀＝一片玻璃，片與片之間必須用 H 型鉛條（came）接起來；**鉛條就是輪廓線**，你不能在一片玻璃中間畫出另一種顏色。
2. **大窗擋不住風**，所以用鐵骨（armature／saddle bar）把窗分成一塊塊板（panel），每塊板裡放一個圓章或四葉章，空隙填紅藍小菱格（mosaic diaper）。
3. **細節只能「畫」在玻璃上**：grisaille 是氧化鐵＋玻璃粉調的暗褐釉，燒進玻璃表面；它畫臉、衣褶、毛髮，並用刷子塗成半透明的 matting、再用棒子刮出亮線（stick-lighting）。

沙特爾主教座堂南側廊〈好撒瑪利亞人〉窗（約 1205–1215）由鞋匠行會出資，最下面三格是鞋匠自己在裁皮、做鞋——中世紀的「署名格」。本風格的品牌敘事就從這裡長：**出錢的人被做進窗腳**。

一句話：**暗牆上的一扇光、黑鉛圍住的寶石色、由下往上讀的圓章、窗光落在地上。**

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，就不再是這個風格。

### ① 鉛條與鐵骨：顏色永遠不直接相接

每一塊色都被 3–4px 近黑鉛條包住（`stroke-linejoin:round`），再由 8–10px 的鐵骨橫條把窗切成板。兩塊顏色之間一定有黑；鞋的拼接縫、衣服的分色＝鉛條，**不是描邊風格的裝飾線**。

```css
.pc{stroke:#141210;stroke-width:3.2;stroke-linejoin:round} /* 一片玻璃 */
.pc.th{stroke-width:2.2}                                     /* 小片：珠、菱 */
.ar{fill:#141210}                                            /* 鐵骨 */
```
```svg
<path class="pc" data-g="R" fill="#A8102A" d="M14,96C8,78 8,52 16,36L58,40C80,44 96,50 116,58C150,66 186,72 190,90L188,96Z"/>
<rect class="ar" x="14" y="209" width="332" height="10"/>
```

### ② 透射的罐色玻璃：沙特爾藍＋寶石紅，有條紋與氣泡

玻璃面積中 **沙特爾藍 #1F4FA8 ＋ 寶石紅 #A8102A ≥ 60%**；黃 #D99A22、綠 #2E7A3A、紫褐 #6B2A55、肉色 #D8A487、微綠白 #D9E2CC 只當點綴。每塊玻璃有**不均勻濃淡（橫向拉長的條紋）與小氣泡**——用自寫的週期 value noise 產生 96px 紋理貼成 SVG `<pattern>`；**零平滑漸層、零外發光、零投影**。玻璃只在暗的牆裡發亮。

```js
/* 一片罐色玻璃的紋理：橫向拉長（2×9 格）＋中顆粒＋細顆粒，週期 96px 可無縫平鋪 */
var k=.8+.36*vn(i/96*2,j/96*9,seed,2,9)+.1*(vn(i/96*7,j/96*7,seed+31,7,7)-.5)+.06*(vn(i/96*24,j/96*24,seed+77,24,24)-.5);
rgb = base × k；再撒 7 顆 rgba(255,255,255,.22) 橢圓氣泡
```
```svg
<pattern id="tx-B" patternUnits="userSpaceOnUse" width="96" height="96"><image href="data:image/png;base64,…" width="96" height="96"/></pattern>
```

### ③ Lombardic／Uncial 大寫碑銘帶＋grisaille 描字

拉丁字只用 Uncial（Google Fonts **Uncial Antiqua**），以「·」分詞，寫在微綠白玻璃的字帶上、用 grisaille 暗褐色；中文用 **Noto Serif TC 900** 當標題。羅馬數字（Ⅰ–Ⅸ）標每一格的讀序。

```svg
<rect class="pc" data-g="W" fill="#D9E2CC" x="16" y="700" width="328" height="24"/>
<text class="ins" x="180" y="717.5" font-size="14.5" text-anchor="middle">A·TSVI·SVTOR·ME·FECIT·MCMLXIV</text>
```
```css
.ins{font-family:"Uncial Antiqua",serif;fill:#2A170B;letter-spacing:.06em}
```

### ④ 圓章窗版面：由下往上讀，最下面是署名格

窗是尖拱（rise＝0.56w、雙圓心半徑 0.5636w），外緣一圈紅帶白珠；內部以鐵骨分板，每板一個圓章或四葉章（白緣→紅環→藍地），空隙是紅藍菱格地。**讀序由下往上**（九格窗則蛇行：下排往右、中排往左、上排往右），**最下面一排是出資者在工作的署名格**。

```js
function arch(x,y,w,yb){var ys=y+.56*w,R=.5636*w;
 return 'M'+x+','+yb+'V'+ys+'A'+R+','+R+' 0 0 1 '+(x+w/2)+','+y+'A'+R+','+R+' 0 0 1 '+(x+w)+','+ys+'V'+yb+'Z';}
```

### ⑤ Grisaille 細節與菱格地母題

臉、衣褶、皮紋、鞋的車線＝`.gr` 暗褐筆線（粗細 1.1／1.7／2.6 三級）；陰影＝`.mt` 22% 淡塗；高光＝白色 30–38% 細線（刮出的 stick-lighting）。空隙一律填**菱格地**（藍地紅菱、交點黃珠、中心白點）。

```css
.gr{fill:none;stroke:#2A170B;stroke-opacity:.82;stroke-width:1.7;stroke-linecap:round}
.mt{fill:#2A170B;opacity:.22}
```
```svg
<pattern id="dia" patternUnits="userSpaceOnUse" width="28" height="28">
 <rect class="pc th" fill="#1F4FA8" width="28" height="28"/>
 <path class="pc th" fill="#A8102A" d="M14,3L25,14L14,25L3,14Z"/>
 <circle class="pc th" fill="#D99A22" cx="0" cy="0" r="3.2"/><!-- 四角各一 -->
 <circle class="pc th" fill="#D9E2CC" cx="14" cy="14" r="2.2"/>
</pattern>
```

## 3. 色彩系統

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 中殿暗牆 nave | `#211C19`（石縫 `#3A312B`） | 窗所在的牆、首屏地 | ~35% |
| 石灰岩地 stone | `#DCD3C2`（石縫 `#B3A68E`、卡片 `#E8E1D3`／`#ECE6DA`） | 光斑落下的內文區 | ~40% |
| 鉛 lead | `#141210` | 鉛條、鐵骨、按鈕框、頁尾 | ~6% |
| 沙特爾藍 | `#1F4FA8` | 玻璃主色、地 | 玻璃的 35% |
| 寶石紅 | `#A8102A` | 外緣帶、圓章環、主按鈕 | 玻璃的 28% |
| 黃 | `#D99A22` | 太陽、珠、數字圓、焦點 | 點綴 |
| 綠／紫褐／肉色／微綠白／褐 | `#2E7A3A`／`#6B2A55`／`#D8A487`／`#D9E2CC`／`#8A5A2B` | 衣、四葉章、臉、字帶、木 | 點綴 |
| grisaille | `#2A170B` | 畫在玻璃上的細節與字 | 線 |
| 墨 | `#1B1612`／`#4A3F35` | 石地上的正文 | 文字 |

規則：玻璃色只出現在玻璃上；牆是暗的、地是亮的，**中間調沒有**。光斑 `mix-blend-mode:multiply` 疊在石地上，正文被染色但仍可讀。

## 4. 字體系統

- 中文標題：Noto Serif TC 900，`clamp(40px,7vw,84px)`，`letter-spacing:.06em`。
- 正文：Noto Serif TC 400，16–17px／1.8。
- 拉丁碑銘、kicker、年份：Uncial Antiqua，13px（kicker，`letter-spacing:.18em` 大寫）、22–30px（年份、羅馬數字）。
- 字級三階：84／36／16，中間不加別的。
- 載入：`https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Uncial+Antiqua&display=swap`

## 5. 版面與網格

- **牆＋地兩段式**：每一頁上半是 `.wall`（暗石砌牆，`background-size:100% 64px,180px 128px` 的石縫），窗靠在牆的下緣（窗台＝地的上緣）；下半是 `.floor`（300×220 大方石）。
- 首頁：`grid-template-columns:auto 1fr`，左窗（`height:min(86vh,840px)`），右文字欄底對齊。
- 訂鞋頁：窗在右、說明在左；地上的工作卡放在**窗的正下方**，因為光斑會落在那裡。
- 零旋轉、零圓角（只有圓章與玫瑰窗本身是圓）。留白：窗與文字欄間 `clamp(24px,5vw,80px)`。
- ≤560px：文字欄移到窗上方，窗寬 `min(82vw,360px)`；導覽變成底部三等分。

## 6. 元件配方

- **導覽＝三扇小尖窗（lancet-lights）**：每個連結是一個 58×92 的尖拱 SVG，未選是暗玻璃，**現用頁那扇被點亮**（藍／紅／綠），頂上的小圓變黃；hover 亮一半。
- **按鈕**：`.cta`＝5px 鉛框＋紅或藍實色＋900 字；`.chip`＝4px 鉛框的玻璃片，左側一塊 22px 色片；按下 `aria-pressed=true` 變黃。零圓角零陰影。
- **卡片**：5px 鉛框、石色底 `#E8E1D3`，標題列可用全鉛底反白（訂鞋單）。
- **表單**：輸入框 4px 鉛框、Uncial 大寫。
- **頁尾**：全鉛底 `#141210`，淡石色字。
- **玫瑰窗**：圓形容器 9px 鉛框，上面疊一張 SVG 窗櫺（兩圈＋八條輻）。

## 7. 動效規則

| 種類 | 本站自製實作 | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **雲影**：一維 value noise 每 120ms 調一次窗的暗度與光斑透明度（雲過去）；光裡的 14 顆**塵**沿光斑斜飄 | 時間 | 雲週期 ≈9s；塵 9s linear | 雲停在全亮；塵靜止 35% |
| input 輸入 | **拖太陽**：日晷上拖曳／方向鍵 ±15 分，光斑即時改長度、斜度、模糊；hover 玻璃片亮 1.35 倍 | pointer／鍵盤 | 即時（同幀） | 照常（使用者自己在動） |
| transition 轉場 | **依讀序合窗**：十二格依「由下往上、蛇行」順序一格格以 `scale(0→1)` 暗下，下一頁依同順序亮起 | 站內連結 | 220ms／格、間隔 32ms、`cubic-bezier(.6,0,.3,1)` | 直接換頁 |
| signature 簽名 | **日影投窗**：此刻臺北真實太陽把整扇花窗（同一個 `<use>`）翻轉、剪切、拉長投在正文上 | 真實時間 | 每分鐘重算 | 照常計算、靜止 |

自我限制：本風格**禁用淡入與滾動揭示**——光是唯一會動的東西；但上面四種一個都不能少。

### motion-library 元件（`wenxiangxiao/motion-library` 1.26.0 @9ba5158）

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-29 | Kaleidoscope | 首頁玫瑰窗 | primary `#A8102A`、secondary `#1F4FA8`、bg `#141210`、duration 36、density 1.1、intensity .7、seed 1210、1:1 | ambient | 八瓣鏡射的平塗碎片在圓窗裡慢轉＝玫瑰窗的放射對稱；bg 填鉛色，碎片之間永遠是黑，不違反特徵① |
| TXT-A-30 | Reveal Outline | 首頁店名 | primary `#D99A22`、bg `#211C19`、duration 2.6、loop false、seed 1964、16:9 maxHeight 150 | transition（一次性） | 先描輪廓、再填字＝先上鉛條、再嵌玻璃的工序 |
| TXT-B-38 | Text Mosaic | 訂鞋頁標題 | primary `#1F4FA8`、secondary `#A8102A`、bg `#211C19`、duration 2.2、loop false、seed 1210、16:9 maxHeight 140 | transition（一次性） | 大方塊逐步細分成字＝碎玻璃拼成碑銘 |
| SHP-15 | Ring Expand | 訂鞋頁玫瑰窗（完成時） | primary `#D99A22`、secondary `#A8102A`、bg `#141210`、duration 1.6、loop false、seed 7、1:1 | input（完成回饋） | 讀完九格時同心環從玫瑰窗中心擴散一次＝整扇窗被點亮 |
| TXT-B-16 | Circle Text | 修鞋頁標題 | primary `#D99A22`、secondary `#1F4FA8`、bg `#211C19`、duration 2.4、loop false、seed 1951、16:9 maxHeight 160 | transition（一次性） | 字先沿圓排列再拉直＝圓章外緣的碑銘 |
| BG-B-15 | Truchet Tiles | 修鞋頁牆與地之間的邊帶 | primary `#A8102A`、secondary `#1F4FA8`、bg `#141210`、duration 14、density 2.2、seed 1967、16:9（容器 56px 裁切） | ambient | 粗弧線在鉛底上翻轉＝窗緣的紅藍卷草邊帶 |

掛載一律透過 `TK.ml()`：等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、一次性文字 `loop:false` 只播一次、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`、reduced-motion 時背景 `seek(.35)`／文字 `seek(1)`。每個元件的開發 Prompt 見 `MotionLib.prompt(id)`。

## 8. 插畫與圖像風格

- 全站零圖檔：所有圖像由 `.pc` 玻璃片＋`.gr`／`.mt` 釉線組成（技法名：came-leaded-glass-kit）。
- **形狀一律是「能用一片玻璃切出來」的**：避免細長凹角；細節交給 grisaille。
- 人物：正面或四分之三側、大頭、手勢誇張；臉一律肉色玻璃＋grisaille 眉眼口；衣服單色一片＋三條褶線。
- 物件（鞋、楦、工具）側視、平塗、一塊白色刮痕高光。
- 敘事格：一格一件事，物件放大到幾乎碰到圓章的邊。
- 灰窗（grisaille window）：白玻璃菱格＋釉線藤蔓＋每隔一段一朵彩色小花，用於需要「看清真顏色」的頁面。

## 9. Logo 與 Favicon

- Logo：紅緣藍地的小尖窗，上半一顆黃太陽、一條鐵骨、窗腳一隻紅鞋；右側 Noto Serif TC 900 店名＋Uncial `THANG·KHA`。檔案 `assets/logo.svg`。
- Favicon：32×32 inline SVG data URI——紅緣藍窗＋一條鐵骨＋窗腳黃色鞋形。

## 10. Do & Don't

**Do**：鉛條包住每一塊色／玻璃有條紋與氣泡／牆暗地亮／由下往上讀／把出資者（顧客）放進窗腳／讓真實的光走到內容上。

**Don't**：
- 不要 Tiffany 式新藝術彎曲鉛條與乳白玻璃（那是 1890 年代，另一個風格）。
- 不要用細描邊冒充鉛條；鉛條至少 3px 且是近黑。
- 不要漸層玻璃、外發光、玻璃擬態模糊卡片。
- 不要紫藍漸層 hero、置中三卡片、emoji icon、EST. 徽章、Lorem ipsum。
- 不要把整頁都做成窗——窗只是一個構件，旁邊要有牆和地。

## 11. 頁面骨架範例

```html
<header class="wall hero">
  <nav class="lights" aria-label="主選單"><a href="index.html" aria-current="page"><svg viewBox="0 0 58 92"><path class="gl" d="…尖拱…"/><path class="fr" d="…"/></svg><span>窗前</span></a>…</nav>
  <div class="hero-in">
    <div class="wcol"><svg class="win" viewBox="-8 -8 376 756"><g id="win-l">…玻璃片…</g></svg></div>
    <div class="tcol"><p class="kick">Thang·kha · sutores</p><h1>窗腳皮鞋</h1><p class="lede">…</p><a class="cta" href="order.html">讀窗訂一雙</a></div>
  </div>
</header>
<main id="main" class="floor"><div class="in">…正文（光斑會落在這裡）…</div></main>
<script>
TK.pool(document.getElementById('main'),document.querySelector('.wcol svg'),'win-l',[-8,-8,376,756]);
TK.init();
</script>
```

## 12. 技術實作與相容性

### (a) 使用的 API 與查證

| 技術（tech roster 層） | 在本站承載 | 支援現況與查證 |
|---|---|---|
| **mix-blend-mode: multiply＋CSS transform＋filter: blur**（A 渲染層） | 簽名「日影投窗」：`<use href="#win-l">` 複製整扇窗，`matrix(1 0 0 -1 0 H)` 上下翻轉（窗頂的光落得最遠）、`skewX(−方位差)`、高度＝窗高×cos(方位差)/tan(高度角)×.95、模糊 4–13px，以 multiply 疊在石地與正文上 | caniuse〈mix-blend-mode: multiply〉：Chrome 41+、Firefox 32+、Safari 8+、Edge 79+（2026-10-31 查）。不支援時光斑以一般透明疊上，文字仍可讀 |
| **matchMedia＋時間驅動**（B 動效與時間軸層） | 臺北此刻的太陽（NOAA 簡化天文式：平近點角→黃經→赤經赤緯→格林威治恆星時→時角→高度方位），決定光斑有無、長度、斜度、模糊與夜裡窗的暗度；`matchMedia('(prefers-reduced-motion: reduce)')` 決定雲與塵 | `Window.matchMedia` Baseline Widely available（MDN）；天文式以 node 驗算 2026-10-31 臺北：06:00 高度 −0.9°、12:00 50.5°／方位 188.6°、17:30 −4.3°，與日出 06:03、日落 17:20 相符 |
| **自寫週期 value noise**（E 資料與生成層） | 九種罐色玻璃的 96px 紋理（條紋、顆粒、氣泡）→ `canvas.toDataURL()` → SVG `<pattern>`；同一函式也驅動雲影與塵的位置 | Canvas 2D `createImageData`／`toDataURL` 全面支援；無 canvas 時玻璃保留 `fill` 的純色 |

窗本身是建置期以 node 產生的靜態 inline SVG（同一支 `glass.js` 在瀏覽器裡重組訂鞋窗），所以**關掉 JavaScript 時窗、文字、價目全部完整**，只是沒有光斑、紋理與動效。

### (b) Fallback 具體行為

- 無 JS：玻璃純色、無光斑、無雲；首頁日晷位置顯示說明文字；訂鞋頁 `<noscript>` 給完整價目與電話。
- 太陽在地平線下：不投光斑，窗加一層 0–66% 的暗（依高度角），讀數改寫「窗只剩街燈」。
- 太陽轉到窗背面（方位差 >86°）：不投光斑，讀數改寫「只剩天光」。
- 無 IntersectionObserver：motion-library 元件直接掛載。
- reduced-motion：雲停、塵靜止、換頁無動畫、訂鞋窗的黃色讀序環不轉、元件停格。

### (c) 效能預算實測

| 項目 | 值 |
|---|---|
| index.html／order.html／repair.html | 301KB／320KB／321KB（308,378／327,763／328,931 bytes，含 motion-library 子集 232.6KB），皆 ≤350KB |
| 玻璃紋理產生（9 張 96²，三層 noise） | node 實測 18ms |
| 訂鞋窗九格重組 | 0.35ms |
| 光斑重算 | 只在太陽改變（每分鐘／拖曳）與 resize 時；雲影每 120ms 改兩個 opacity，不觸發版面 |
| 同時運轉的 motion-library 元件 | 每畫面 ≤2（首頁玫瑰＋一次性店名） |
