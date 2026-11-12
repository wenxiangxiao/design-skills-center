---
name: calcada-portuguesa
description: Portuguese pavement (calçada portuguesa, Lisbon 1840s–) — hand-cut basalt and limestone cubes laid in courses that follow the pattern, black-and-white Mar Largo waves quantised to whole stones, sand joints, rare red-limestone accents, stone-laid lettering and limestone plaques with a border of black stones.
---

# 葡式碎石路 Calçada Portuguesa

範例站：`sites/sola-firme`（Sola Firme 穩底鞋匠，里斯本換鞋底店）。

## 設計哲學

Calçada portuguesa 是十九世紀中葉從里斯本長出來的人行道鋪面：工人（calceteiro）跪在砂床上，用鎚子把約 5 公分見方的石頭一顆顆敲進去。黑的是玄武岩，白的是石灰岩。

- **起點**：一般認為是 1840 年代初，São Jorge 城堡的軍事總督 Eusébio Furtado 用囚犯在城堡裡鋪了第一片黑白鋸齒紋（各來源記為 1841–42 年）。
- **定型**：市議會 1848 年 4 月核准鋪 Rossio 廣場，1849 年 12 月 31 日完工。那片波浪叫〈Mar Largo〉（寬闊的海）。原鋪面 1919 年前已毀，2001 年依原樣重鋪。
- **外傳**：同一個波浪後來被帶到里約 Copacabana。Roberto Burle Marx 1970 年前後重新設計海濱大道時，把波浪轉成與海平行。

**它為什麼長成這樣**：

- 鋪面只能用兩種當地產的石頭，所以只有黑白兩色。
- 石頭是手敲的，所以每顆都歪一點、角都被磨圓。
- 一顆石頭只能是一個顏色，所以圖樣的邊界永遠是「一格一格」的，任何曲線都被量化成石階。
- 工人沿著圖樣的走向排一行一行的石頭，所以看得出石行順著波浪彎。
- 只有徽紋與星芒才用少量紅石灰岩點綴。

**本館的轉譯**：網頁的地就是路面，內容是嵌在路上的石灰岩牌。圖樣不是畫上去的，是「在石心取樣」。換句話說，網頁上的每一條邊都必須是石頭的邊。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 calçada 了。

### ① 手敲方塊＋砂縫（形狀語彙）

每顆石頭是約 5 公分的不規則方塊：四角小圓、每邊微抖、每顆轉一點點角度。顆與顆之間是暖灰的砂縫，不是黑線、也不是白線。

```css
/* CSS 版：一顆石頭 */
.stone{width:13px;height:13px;border-radius:2px;background:#ECE5D6;transform:rotate(var(--r,2deg));box-shadow:0 0 0 1.5px #A89A80}
```
```glsl
// 著色器版（本站）：每格一顆石頭，大小與角度由雜湊決定，邊緣再加一點雜訊
float an=0.22*(h1-0.5); vec2 q=rot(an)*f;
vec2 hs=vec2(0.43-0.05*h2,0.43-0.05*h3);
float d=sdBox(q,hs,0.11)+(vn(gg*5.0+h1*40.0)-0.5)*0.07; // d<0 是石頭，否則是砂縫
```

### ② 兩種石頭、零漸層（色彩規則）

| 色名 | hex | 用途 | 面積 |
|---|---|---|---|
| basalto 玄武岩 | `#1F1E1B` | 圖樣、外圈滾邊、按鈕、正文字色 | 30–40% |
| calcário 石灰岩 | `#ECE5D6` | 地、牌面（牌面用亮一階的 `#F6F1E6`） | 45–55% |
| areia 砂縫 | `#A89A80` | 石縫、未鋪的砂床 | 10–15% |
| calcário vermelho 紅石灰岩 | `#94402C` | 星芒、焦點、路線，一個畫面不超過 3% | ≤3% |

**規則**：

- 顏色只能來自石頭本身。每顆石頭可以有 ±6% 的明度差，也就是天然石色的差異。
- 零漸層、零半透明疊色、零發光。
- 「濕」是唯一允許的變化：濕石變暗，石灰岩上面多一道天空反光。

```css
:root{--bas:#1F1E1B;--lim:#ECE5D6;--lim2:#F6F1E6;--sand:#A89A80;--red:#94402C}
```

### ③ 石頭拼字＋刻字牌（字體選擇）

**標題用石頭拼**：先把字以 Archivo Black 畫進離屏畫布，再逐格取樣。每格 3×3 子取樣，過半覆蓋就敲黑石，其餘敲白石，字筆畫自然長成階梯狀。

**正文**：

- 中文用 Noto Serif TC，像刻在石灰岩牌上的字。
- 葡文標籤用 Spectral SC 小型大寫、字距 .12–.16em。
- 數字用 Spectral 舊式數字。

**禁止**：無襯線細字、手寫體。

```js
// 石頭字（摘自 core.js SF.laid）
for(j…rows) for(i…cols){ cov = 3×3 子取樣 alpha>110 的數量;
  fill(cov>=4 ? 玄武岩 : 石灰岩); roundRect(i*cell+inset+jx, j*cell+inset+jy, cell-2*inset, …, cell*.18) }
```

### ④ 石行順著圖樣走（版面手法）

石頭排成行，而行的方向就是圖樣的方向。

- 波浪頁的行跟著正弦彎。
- 菱格頁的行轉 45°。
- 直條頁的行是水平的。

黑白邊界在「石心」取樣，所以邊界永遠沿著石頭走。版面上，路面是全幅的地，內容牌不對稱地嵌在路上，留出大片路面可看。

```glsl
vec2 toGrid(vec2 p){ return vec2(p.x, p.y + WA*sin(p.x*WK)); }   // 波浪行向
vec2 cw = fromGrid((id+0.5-vec2(sh,0.0))*S);                     // 石心回到世界座標
float pv = pattern(cw, id);                                        // 在石心取樣 → 量化邊界
```

### ⑤ Mar Largo 波浪、黑石滾邊、紅石星芒（裝飾母題）

- **Mar Largo**：寬黑白帶的大波浪。
- **guia 黑石滾邊**：牌、框外一圈黑石。
- **星芒**：紅石灰岩做的小菱形星，放在菱格交點。

```css
.plq{position:relative;background:#F6F1E6;border:2px solid #1F1E1B;outline:1px solid #1F1E1B;outline-offset:-8px}
.plq::before{content:"";position:absolute;inset:-14px;z-index:-1;background:
 repeating-linear-gradient(90deg,#1F1E1B 0 9px,#A89A80 9px 11px) top/100% 9px no-repeat,
 repeating-linear-gradient(90deg,#1F1E1B 0 9px,#A89A80 9px 11px) bottom/100% 9px no-repeat,
 repeating-linear-gradient(180deg,#1F1E1B 0 9px,#A89A80 9px 11px) left/9px 100% no-repeat,
 repeating-linear-gradient(180deg,#1F1E1B 0 9px,#A89A80 9px 11px) right/9px 100% no-repeat,#A89A80}
```

## 色彩系統

見特徵②。

- **比例**：路面 70% 以上；牌面 25–30%；紅 ≤3%。
- **文字**：一律 `#1F1E1B`。輔助字 `#5B5549`。
- **反白**：只發生在黑石按鈕上，用石灰岩色字。
- **濕石**：明度 ×0.56，石灰岩上加 `#DBE3E6` 的鏡面高光。

## 字體系統

**來源**：Google Fonts，包括 Noto Serif TC 500/700、Spectral 400/600/italic、Spectral SC 600/800、Archivo Black。Archivo Black 只拿來當石頭字的遮罩，不直接顯示。

| 層級 | 字 | 大小／行高 |
|---|---|---|
| 石頭字標題 | Archivo Black 遮罩，cell 5px × 9 行 | 約 45px 高 |
| h2 中文副標 | Noto Serif TC 700 | 22–26px / 1.3 |
| 正文 | Noto Serif TC 500 | 17px / 1.75（手機 16px） |
| 葡文標籤 kick | Spectral SC 600 | 13px，字距 .16em，小寫 |
| 數字 | Spectral，oldstyle-nums tabular-nums | 隨文 |

## 版面與網格

- **地**：全幅路面，`position:fixed` 的 WebGL 畫布。捲動時路面跟著走，因為世界座標包含 scrollY。
- **牌**：寬 520–620px，左右交錯錨定。
  - hero 靠左 6vw。
  - 故事牌靠右。
  - 清單牌左縮 9vw。
  - 段與段之間留 20–26vh 的空路面。
- **零旋轉**：牌是嵌在地上的，不歪。
- **角**：牌是直角；石頭是小圓角。
- **≤560px**：牌滿版留 16px 邊；石頭字 cell 降為 4px；門墊縮成 100px 寬。

## 元件配方

**導覽（門前石毯 tapete）**：

- 固定在底部中央，三塊門墊並排，外面一圈砂色底加黑框。
- 每塊墊子用石頭拼出葡文頁名（ENTRADA／SOLAS／CAMINHO），下面一行小中文。
- 現用頁那塊是「剛被雨打濕」的：石頭明度 ×0.72，一半石頭帶一道反光。
- hover 時上抬 2px。

**按鈕**：

- 黑石底、石灰岩字。
- 內圈三層 inset box-shadow 做成刻線框。
- hover 換紅石。
- ghost 版是石灰岩底、黑字。

**牌（卡片）**：見特徵⑤。重點用紅石滾邊版 `.plq.red`，每頁最多一塊。

**表單**：

- 單選做成「石條」：一排方格，選中的那格變黑石。
- select 是直角、2px 黑框、石灰岩底。

**表格**：只有橫線：表頭下 2px，列間 1px，黑。

**頁尾**：一塊雙欄牌，左邊是標誌與地址，右邊是 Mar Largo 動態帶。

## 動效規則

四種動效各有一個本站自製實作。

| 種類 | 實作 | 觸發 | 時間 | reduced-motion |
|---|---|---|---|---|
| signature 石浪 | 首頁 Mar Largo 的波相位隨時間緩慢前進，但石頭不動。每顆石頭在石心重新取樣，浪頭經過時整顆從白翻黑、從黑翻白，像有人在重鋪。載入時先「依紋鋪石」：沿行序一顆顆敲下，每顆 0.22s 從 1.32 倍縮回並留一圈壓痕 | 載入、時間 | 鋪石 2.4s（第二頁起 1.9 倍速）；浪 `ph = t` 慢速無限 | 直接顯示鋪好、靜止的浪 |
| ambient | 雲影 fbm 以 (16,6)px/s 飄過，壓暗 ≤11%；地勢低處的水窪以 90 秒週期乾濕 | 時間 | 連續 | 停在 t=7.3s 的單一影格 |
| input | 游標／觸控在路面留下左右交錯的濕鞋印：每移動 58px 一步，鞋尖朝移動方向。濕印變暗加反光，5 秒內由邊緣往內乾掉。點一下就落一個鞋印 | pointermove／pointerdown | 首幀即出（<16ms） | 關閉（純裝飾，資訊零損失） |
| transition | 跨文件 View Transitions：新頁以 `clip-path: inset()` 配 `steps(9)` 一行一行鋪進來。新頁的路面同時從砂床開始鋪石。〈走哪條〉的路線用紅石，以 `steps(n)` 沿路逐格鋪出 | 換頁、算出路線 | .62s／≤1.6s | 無轉場、路線直接出現 |

**自我限制**：零淡入、零彈跳。所有「出現」都是鋪石，也就是一格一格的 steps。

### motion-library 元件表

來源：`MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-38 | Text Mosaic | index | text「SOLA FIRME」；colors 黑 `#1F1E1B`／紅 `#94402C`／牌面 `#F6F1E6`；duration 2.2；loop:false；seed 1959；16:9 | transition（一次性） | hero 牌上的店名由粗方塊逐步細化成字＝石頭拼字的過程。純 drawImage 放大取樣、零圓角零發光 |
| BG-B-39 | Minimal Wave | index | colors 黑／紅／石灰岩；duration 9；intensity 1.4；seed 1849；16:9 | ambient | 頁尾一條緩慢起伏的黑波線＝Mar Largo 的縮寫。平色描邊、無陰影 |
| SHP-30 | Grid Cascade | solas | colors 黑／紅／石灰岩；duration 2.4；loop:false；seed 61；1:1 | transition（一次性） | 「一方試鋪」：6×6 小方塊沿對角一顆顆落定＝試踩石被鋪起來。圓角 .18 與手敲石頭的磨角一致 |
| BG-B-15 | Truchet Tiles | solas | colors 黑／紅／石灰岩；duration 10；density 1.4；seed 1848；16:9 | ambient | 價目前的橫帶：Truchet 四分之一圓弧在格子裡翻轉，是 calçada 幾何花樣的另一種鋪法。butt 端點、零發光 |
| TXT-A-02 | Letter Sequence | caminho | text「CAMINHO」；colors 紅／黑／牌面；duration 1.6；loop:false；seed 12；16:9 | transition（一次性） | 〈走哪條〉標題逐字落位，像一顆顆石頭。純平色字 |

**掛載**：

- 掛載包裝 `SF.ml` 照 `sites/ka-to` 的 `KT.ml`：等 `document.fonts.ready` 才掛；離屏 `destroy()`，回到視窗再重掛；一次性元件只播一次。
- canvas 一律 `aria-hidden`；容器內保留 `.ml-fb` 原 HTML 標題。
- reduced-motion 時，背景停 `seek(.35)`、文字停 `seek(1)`。
- 同一畫面同時運轉的元件 ≤2。

## 插畫與圖像風格

**技法**：沿紋座標鋪石（field-aligned stones）。全站零點陣圖，所有圖都是「石頭」：

- 路面是 WebGL 片段著色器即時鋪的。
- 鞋底（三種紋）、石材色票、標誌、門墊、標題字，都是同一套「一格一顆石頭」的 SVG／Canvas 程式。
- 地圖的街道是 SVG `<pattern>` 石格：白方格是石灰岩、黑白格是混鋪、灰大方塊是花崗岩、深色是柏油。

**禁止**：手繪線稿、照片、寫實陰影、漸層。

## Logo 與 Favicon 設計指南

- **Logo**：一隻鞋底的輪廓（直角外框裡），鞋底內鋪滿 Mar Largo 黑白石浪，右下角放一顆紅石灰岩當印記。SVG 200×200，`clipPath` 切出鞋底。
- **Favicon**：4×4 顆石頭，依小波浪分黑白，砂色縫，inline SVG data URI。
- **最小尺寸**：16px 時仍看得出黑白波。

## Do & Don't

**Do**

- 讓每一條邊都是石頭的邊，量化到整顆石頭。
- 留大片空路面。
- 紅石只給焦點。
- 用濕／乾表現狀態，例如現用頁、hover、腳印。

**Don't**

- 平滑曲線邊界、漸層、發光、模糊陰影。
- 圓角卡片、紫藍漸層。
- 置中三卡片、emoji icon、Lorem ipsum。
- 「EST. 19xx」徽章。
- 第三種主色。
- 把波浪畫成線而不是石帶。這是最常見的失敗。
- 用 PNG 磁磚圖片鋪地。

## 頁面骨架範例

```html
<canvas id="pave" aria-hidden="true"></canvas>
<script type="x-shader/x-fragment" id="frag">/* 見 shader：toGrid → 石格 → 石心取樣 pattern → 砂縫 → 濕度 */</script>
<main>
 <section class="hero"><div class="plq">
  <span class="kick">sapataria · travessa da queimada <b>23</b></span>
  <h2 class="stoneh"><span class="pt">VISITAR</span><span class="zh">來店</span></h2>
  <p>……</p><a class="btn" href="solas.html">看三種鞋底</a>
 </div></section>
</main>
<nav class="mats" aria-label="主選單">
 <a href="index.html" aria-current="page"><span class="mp">ENTRADA</span><span class="mt">店</span></a>
 <a href="solas.html"><span class="mp">SOLAS</span><span class="mt">鞋底</span></a>
</nav>
<script>SF.boot({pat:0,wave:1});</script>
```

## 技術實作與相容性

### 1. 原生 WebGL 片段著色器（無函式庫）——A 渲染層

**承載**：特徵①②④、signature、ambient、input。

**做法**：

- 一個全螢幕三角形，GLSL ES 1.00。
- `toGrid` 把世界座標轉成「沿圖樣走向」的石格座標；每行加隨機錯位。
- 每格用帶抖動的 sdRoundBox 畫一顆石頭。
- 再把石心轉回世界座標做圖樣取樣，讓邊界量化到整顆石頭。
- 鞋印以 `uniform vec4 uP[16]` 環形緩衝傳入。

**查證**：MDN〈WebGL: 2D and 3D graphics for the web〉；web-features〈webgl2〉Baseline Widely available。本站只用 WebGL 1 以求最廣支援；MDN 註明 GPU 也必須支援。

**fallback**：

- `getContext('webgl')` 失敗、shader 編譯或連結失敗時，`body.nogl` 改用 CSS 靜態 Mar Largo：data URI SVG 的波浪多邊形，再疊一層 12px 砂縫格 pattern。
- `<noscript>` 同樣處理。
- 片段精度以 `GL_FRAGMENT_PRECISION_HIGH` 判斷，沒有就用 mediump。

**效能**：

- DPR 上限 1.5（窄螢幕 1.25）。
- 分頁隱藏時停 rAF；reduced-motion 時只在捲動與縮放時重畫。
- 每像素大約 3 組 fbm、16 次鞋印迴圈。
- 建置期以自寫 GLSL AST 直譯器（`@shaderfrog/glsl-parser` 解析）在 node 逐像素跑過同一份原始碼出圖，驗證波浪、菱格、鋪石進場與鞋印。沙箱沒有 GPU，無法量 fps，需在實機補測。

### 2. 圖論最短路（Dijkstra）＋URL 狀態序列化——E 資料與生成層

**承載**：func〈走哪條〉。

**圖**：13 個節點、20 條街。每條街是 [石材, 長度, 坡度]。

**兩種權重**：

- 「最穩」的權重：`長度/100×0.6 ＋ 長度/100×滑度(石材,天氣)×鞋底係數×(1＋坡度/4)`，電梯固定 6。
- 「最短」的權重：只看長度。

**輸出**：

- 兩條路同時畫出，最穩的用紅石，最短的用黑點。
- 判定看「每百公尺風險」。
- 結果寫進 `#r=起-迄-天氣-底`，可分享、可重開；同時存進 sessionStorage，回首頁會出現〈你上次問的路〉。
- 留單號以 FNV-1a 雜湊產生。

**實測**：jsdom 跑過 13×12 全部點對，皆有解。

### 3. 跨文件 View Transitions ＋ `steps()` ——B 動效與時間軸層

**承載**：transition。

**做法**：`@view-transition{navigation:auto}`，`::view-transition-new(root)` 以 `clip-path: inset(0 0 100% 0)→inset(0)` 配 `steps(9,end)`，0.62s 內一行一行鋪進來。

**查證**：

- Chrome 開發者文件〈Cross-document view transitions〉。
- caniuse〈cross-document-view-transitions〉：Chromium 126+、Safari 18.2+；Firefox 自 144 起為 partial。
- Interop 2026 有列入。

**fallback**：不支援時就是一般換頁。新頁路面本身仍會從砂床鋪起，所以「鋪」的感覺不會消失。

### 效能預算實測

- 單頁 320.7／325.0／331.7 KB（含 inline motion-library 子集約 288 KB），全部 ≤350 KB。
- 首屏自寫 JS 約 8 KB。
- 每支 `<script>` 逐段 `node --check` 通過。
- `tools/ml-smoke.js` smoke ok。
