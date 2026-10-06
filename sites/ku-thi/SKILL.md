---
name: wabi-sabi-fukinsei
description: Wabi-sabi as a web language (Sen no Rikyū's sōan tea aesthetic as codified for designers by Leonard Koren, 1994) — every shape irregular and generated from one noise field, colours taken only from ageing materials (ash glaze, iron, rust, moss), odd-numbered scalene asymmetric groupings floating in more than half empty ground, surfaces that visibly change with real time, and quiet light-weight serif type set vertically at the edges.
---

# 侘寂 Wabi-sabi・不均齊（不完全、無常、未完成）

> 範例站：久苔 苔庭所 KÚ-THÎ（宜蘭員山的苔庭與苔蘚園）。本 SKILL 定義風格，不綁產業。
> 型錄條目「在地與文化視覺／和風極簡 Wabi-sabi」全館第 2 站。第 1 站 nagi-cha 是早期的「和風極簡」：米白紙底、置中大標、細線描。本站刻意走另一半——**不是留白的乾淨，而是時間的痕跡**：灰釉底、不規則石形、苔會長、光會走。

## 1. 設計哲學

侘寂不是「日式極簡」。極簡追求的是乾淨、精準、可量產；侘寂拒絕的正是這三件事。

- **源頭**：十五世紀末村田珠光的「冷枯」與草庵茶，十六世紀千利休把茶室縮到兩疊、用長次郎燒的黑樂茶碗取代唐物——一個手捏、不對稱、表面坑疤的碗，被放在權力最高的人面前。侘（wabi）是簡素中的自足，寂（sabi）是時間在物上留下的鏽、苔與磨損。
- **給設計師的版本**：Leonard Koren《Wabi-Sabi for Artists, Designers, Poets & Philosophers》（1994）把它和現代主義逐條對照：現代主義要幾何、光滑、恆久、可控、明亮；侘寂要有機、粗糙、無常、交給自然、昏暗。
- **京都苔寺西芳寺**：苔不是設計出來的，是十四世紀的枯山水庭在江戶末年荒廢後**自己長出來的**。這是本風格在網頁上最重要的一句話：**畫面不是一次完成的，它會隨時間改變。**

三條總綱：

1. **不均齊（fukinsei）**——沒有直尺線、沒有正圓、沒有對稱軸。
2. **間（ma）**——空白是主角，物件是用來讓空白被看見的。
3. **無常**——每一個表面都要讓人看出時間：光的方向隨真實時刻走、苔會長、手指經過會濕。

## 2. 色彩系統

色彩只取「會老的材料」：灰釉、鐵、鏽、苔、金繕的金。全部低彩度，沒有任何一個顏色是從色票「挑」出來的鮮色。

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 灰釉 Ash | `#BDB6A6` | 唯一的大面積地色（帶三層錯位斑點紋，見 §5） | ~55% |
| 灰釉亮 Ash-hi | `#CDC7B8` | 表單底、訂單面板、按鈕底 | ~8% |
| 灰釉暗 Ash-lo | `#A9A292` | 分隔、盆土 | ~4% |
| 鐵 Iron | `#2D2924` | 全部正文與標題（對灰釉 ≈ 8.6:1） | ~12% |
| 板岩 Slate | `#4A4740` | 次要文字、標籤（≈ 5.4:1，只用在 ≥13px） | ~6% |
| 苔 Moss | `#55642F` | 唯一的「有生命」的顏色：苔、現用頁、合格記號、連結底線 | ~10% |
| 苔亮 Moss-hi | `#8B9A52` | 苔尖受光 | ≤3% |
| 鏽 Rust | `#8A4B2C` | 現用態小點、錯誤、focus 外框 | ≤2% |
| 金繕 Gold | `#A88838` | **只出現在修補過的地方**（Logo 的裂縫） | ≤0.5% |

硬規則：

- 零純白（最亮 `#CDC7B8`）、零純黑（最暗 `#2D2924`）。
- 除苔以外，任何顏色的 OKLCH 彩度 ≤ 0.06；苔 ≤ 0.09。
- 零漸層色塊（光影由著色器或材質產生，不是 `linear-gradient` 拉兩色）；唯一例外是「此刻」季節欄的苔色淡入。
- 金只給修補。沒有破，就沒有金。

## 3. 字體系統

- **Noto Serif TC** 300／400／500（Google Fonts）——全站唯一中文字體。**不用 600 以上**：侘寂沒有粗體，強調靠大小、留白與直排。
- **EB Garamond Italic** 400——只給羅馬字（KÚ-THÎ）、學名、年份、價格數字（`font-variant-numeric: oldstyle-nums`，舊體數字高低不齊，正是不均齊）。
- 字級：12 / 13 / 15 / 16 / 20–22 / 32–42（h1 直排）。正文 16px、行高 1.95、字距 .06em；標題字距 .14–.6em。
- 頁面主標一律 `writing-mode: vertical-rl`，貼在畫面邊緣，不置中。
- 禁止：全大寫、粗黑體、等寬體、任何幾何無襯線體。

```css
h1{writing-mode:vertical-rl;font:300 clamp(24px,3.1vw,42px)/1.3 "Noto Serif TC",serif;letter-spacing:.55em}
.num{font-family:"EB Garamond",serif;font-style:italic;font-variant-numeric:oldstyle-nums}
```

## 4. 版面與網格

- 12 欄網格只是用來**避開**的：內容塊永遠落在非對稱欄位（如 7–11、3–5、5–11），絕不 1–12 或 4–9 置中。
- 每一屏（viewport）的內容面積 ≤ 45%，其餘是地色。
- 一組東西的數量取奇數：3、5、7。三點構圖一律**不等邊三角形**（三邊兩兩相差 ≥10%），重心離畫面中心 ≥ 畫面半寬的 20%。
- 列表項目採「錯位」：每一項左緣不同（例：2%／34%／11%／41%／0／27%／15%），像飛石。
- 文字繞著不規則的形走（`shape-outside`），不是繞方框。
- 旋轉：本風格**不旋轉文字**；不規則感由形本身產生，而不是把方塊轉 2°。
- 留白規則：區塊之間 12–22vh。長文欄寬 ≤ 34em。

## 5. 元件配方

**地色材質**（不是平塗，三層不同週期的斑點錯位，永不對齊）：

```css
body{background:#BDB6A6;background-image:
  radial-gradient(circle at 30% 40%,rgba(45,41,36,.09) 0 .6px,transparent 1.2px),
  radial-gradient(circle at 70% 60%,rgba(255,252,240,.10) 0 .7px,transparent 1.3px),
  radial-gradient(circle at 50% 50%,rgba(45,41,36,.05) 0 1px,transparent 1.6px);
  background-size:7px 11px,13px 9px,23px 29px}
```

**導覽——飛石（tobi-ishi）**：四顆由噪聲生成的石頭千鳥錯位排在左下，頁名直接寫在石旁；現用頁的石頭底下長出一圈苔（苔色多邊形 scale 1.18），標籤前加一顆鏽色小石。行動版攤平成底部一列，奇數項上抬 12px。

**按鈕**：八值 `border-radius` 形成不規則圓石；hover 時換一組八值（形會「動一下」），不放大、不陰影。

```css
.btn{border:1.5px solid #2D2924;background:#CDC7B8;border-radius:46% 54% 41% 59%/58% 47% 53% 42%;letter-spacing:.3em}
.btn:hover{background:#2D2924;color:#CDC7B8;border-radius:55% 45% 58% 42%/45% 57% 43% 55%}
```

**卡片**：沒有卡片。資訊用一條 1px `rgba(45,41,36,.35)` 的上邊線分組，或直接放在地上。

**表單**：底色 Ash-hi，只有下邊線 1.5px 鐵色，四角圓角各不同（`3px 9px 2px 7px`）。

**Footer**：上緣一條由噪聲抖動的手繪線（SVG path，`vector-effect:non-scaling-stroke`），三欄非對稱，左側讓出飛石的位置。

## 6. 動效規則（四種都必須在）

| 類型 | 本站實作 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **雲影**緩緩掠過苔庭；**光的方向隨真實時刻**（06:00 東 → 12:00 南 → 18:00 西，夜間轉暗） | 時間 | 雲 `uTime×0.012`；閒置時 ~14fps 重繪 | 雲影停，光的方向仍依時刻（靜態） |
| input 輸入 | **露**：游標經過的苔變濕、變暗並閃出露珠，2.4 秒內乾掉 | pointermove | 40ms 取樣、最多 6 點、`exp(-d²·700)` | 關閉（純裝飾、無資訊） |
| transition 轉場 | 跨頁 **霧散**（cross-document View Transitions）；〈三石〉訂單面板以**石形 clip-path 擴張**打開 | 換頁／合格 | 舊頁 .42s 淡出＋5px 霧；新頁 .62s；石形 1.1s `cubic-bezier(.3,.6,.2,1)` | 直接切換 |
| signature 簽名 | **苔の進出**：合格的那一刻，苔從三顆石頭的根部沿不規則前緣向外蔓延，5.2 秒長滿 | 師傅點頭 | `uGrow` 0→1、`1-(1-u)^2.4` | 直接呈現長滿的狀態 |

自我限制：禁止彈跳、禁止視差、禁止任何「從下方淡入上滑」；動態只能來自自然（光、雲、水、生長）。

## 7. 插畫與圖像風格：噪聲石與苔（noise-stone & moss）

- 全站沒有一張圖檔。所有圖像是同一支片段著色器即時算出的：灰釉地、石、石影、苔。
- **石**：超橢圓（指數 2.6）半徑乘以 `1 + 0.12·(snoise(低頻) + 0.45·snoise(中頻))`，以「與太陽方向的點積」打光，邊緣 18% 暗化，北面（畫面上方）長地衣斑。
- **苔**：三個尺度的噪聲（14／57＋110／7）合成色調，以 14 頻的梯度與太陽方向算受光；苔的邊界是 24＋61 頻的噪聲抖動，**永遠不是平滑曲線**。
- **影**：沿太陽反方向偏移 0.45×石徑取樣石形，地與苔都會被遮暗 38%。
- 退化：無 WebGL 時改用同一組多邊形的平塗 SVG（石 `#4C4A46`、苔 `#55642F`）。

## 8. Logo 與 Favicon

一顆由種子 4.17 生成的石頭，底部被苔包住，石面一道金繕裂縫（`#A88838`，鋸齒折線）。字標「久苔」直排、Noto Serif TC 400、字距 .4em，旁附 EB Garamond Italic「KÚ-THÎ」。Favicon 為同一石＋苔＋裂縫的 inline SVG data URI。

## 9. Do & Don't

**Do**
- 讓每一個形都不一樣：同一個函式，不同種子。
- 讓畫面跟著真實時間變：時刻、季節（「此刻」標示當月的季節欄）。
- 把修補畫出來（金繕），不要藏。
- 文字少、短、具體：「石頭可以摸，苔不要摸——手上的油會讓它發黃一個月。」

**Don't**
- 不要米白紙底＋置中大標＋一根細線（那是「和風極簡」模板，不是侘寂）。
- 不要正圓、正方、直角卡片、對稱的三欄卡片。
- 不要櫻花、鳥居、和柄紋樣、浮世繪浪花當裝飾——那是觀光符號。
- 不要紫藍漸層、emoji icon、模糊陰影卡片、Lorem ipsum、「EST. 19xx」徽章。
- 不要粗體、不要全大寫、不要鮮色 CTA。
- 不要把「侘寂」寫在畫面上解釋自己。

## 10. 頁面骨架範例

```html
<a class="brand" href="index.html"><svg><!-- stone + moss + gold seam --></svg><b>久苔</b><i>KÚ-THÎ</i></a>
<nav class="tobi" aria-label="飛石導覽">
  <a href="index.html" aria-current="page" style="--x:18px;--y:0;--w:64px;--h:44px">
    <svg viewBox="0 0 100 100"><polygon class="ms" points="…"/><polygon class="st" points="…"/></svg><span>庭</span></a>
  <!-- 3 more stones, staggered -->
</nav>
<section id="hero">
  <canvas id="gcv" aria-hidden="true"></canvas>          <!-- WebGL garden -->
  <h1>苔，是等出來的。</h1>                                 <!-- vertical, right edge -->
  <div class="lede"><div class="flo"></div><p>…</p></div>   <!-- float with shape-outside = the stone's edge -->
</section>
<div class="wrap"><section class="ground">…</section></div>
<script>
  const G = KT.garden(document.getElementById('gcv'));
  G.st.stones = [{x:-.48,y:.07,k:.205,seed:1.37,ax:1,ay:.63,rot:-.22,reach:.075}, /* … odd count, scalene */];
  G.st.field = 1; G.draw(performance.now());
</script>
```

## 11. 本風格的 5 個不可省略特徵

拿掉任何一項，它就退回「日式極簡」或「大地色系網站」。

### ① 不均齊之形——所有形由同一個噪聲場生成，沒有一條直尺線

石、苔、按鈕、導覽、footer 的線，全部是「基本形 × (1 + 噪聲)」。同一個函式、不同種子，永遠不會有兩個一樣的形。

```js
// radius of an irregular stone at angle t (identical in JS and GLSL)
function sr(t, seed, amp = 0.12){
  const c = Math.cos(t), s = Math.sin(t);
  const se = Math.pow(Math.abs(c)**2.6 + Math.abs(s)**2.6, -1/2.6);      // superellipse
  const n  = snoise(c*1.3+seed*7.1, s*1.3+seed*3.7) + 0.45*snoise(c*3.1+seed*1.9+7, s*3.1-seed*5.3);
  return se * (1 + amp*n);
}
```
```css
/* no-JS approximation for small UI: eight different radii, never two equal */
.pebble{border-radius:46% 54% 41% 59%/58% 47% 53% 42%}
```

### ② 寂色——只取會老的材料的顏色，彩度上限 0.06（苔 0.09）

```css
:root{--ash:#BDB6A6;--ash-hi:#CDC7B8;--iron:#2D2924;--slate:#4A4740;
      --moss:#55642F;--moss-hi:#8B9A52;--rust:#8A4B2C;--gold:#A88838}
/* gold appears only on a repair */
.seam{stroke:var(--gold);stroke-width:2.4;fill:none;stroke-linejoin:round}
```

### ③ 間與奇數——內容 ≤45% 畫面，三點必為不等邊、重心偏離中心

```js
// the gardener's check, reusable for any 3-item composition
function wabiOK(a,b,c, box){
  const d=(p,q)=>Math.hypot(p.x-q.x,p.y-q.y), D=[d(a,b),d(b,c),d(a,c)].sort((x,y)=>x-y);
  const cx=(a.x+b.x+c.x)/3, cy=(a.y+b.y+c.y)/3;
  const off=Math.hypot((cx-box.cx)/(box.w/2),(cy-box.cy)/(box.h/2));
  return D[1]/D[0]>=1.1 && D[2]/D[1]>=1.1 && off>=0.2;
}
```
```css
.list li:nth-child(7n+1){margin-left:2%}.list li:nth-child(7n+2){margin-left:34%}
.list li:nth-child(7n+3){margin-left:11%}.list li:nth-child(7n+4){margin-left:41%}
```

### ④ 時間的表面——光隨真實時刻、苔會長、手指經過會濕

```js
// toward-sun vector in garden space (+x east, +y south)
function sun(d=new Date()){ const h=d.getHours()+d.getMinutes()/60, f=(h-6)/12;
  return (h>=6&&h<18) ? {x:Math.cos(Math.PI*f), y:0.2+0.7*Math.sin(Math.PI*f)} : {x:-0.3,y:0.5,night:true}; }
```
```glsl
// moss grows outward from each stone's root; the front is never smooth
if(h.w>0.0) cov = max(cov, h.w*uGrow - r.y);
float edge = snoise(p*24.0)*0.018 + snoise(p*61.0)*0.008;
float moss = smoothstep(0.0, 0.006, cov + edge);
```

### ⑤ 靜的字——Noto Serif TC 300／400、主標直排貼邊、舊體數字

```css
h1{writing-mode:vertical-rl;font-weight:300;letter-spacing:.55em;position:absolute;right:calc(var(--gut) + 2vw);top:15vh}
.num{font-family:"EB Garamond",serif;font-style:italic;font-variant-numeric:oldstyle-nums}
/* text follows the stone, not a box */
.flo{float:left;shape-margin:12px;shape-outside:polygon(/* rightmost crossing of the stone every 5px */)}
```

## 12. 技術實作與相容性

### 12.1 原生 WebGL 片段著色器（無函式庫）——A 渲染層

- **承載**：特徵 ①②④ 與全站每一張圖。灰釉地、石、石影、苔、雲影、露，全部是同一支 fragment shader；石與苔的參數由 JS 以 uniform 陣列（`uSt[10]`、`uSh[10]`）傳入。
- **選 WebGL 1（GLSL ES 1.00）而非 WebGL 2**：本站不需要 WebGL 2 的任何功能，WebGL 1 的覆蓋率更高。WebGL 2 在 Safari 15（2021）後才普及（Khronos〈WebGL 2.0 Achieves Pervasive Support〉），WebGL 1 則是所有現行瀏覽器的基線。
- **精度**：`#ifdef GL_FRAGMENT_PRECISION_HIGH` 才用 highp，否則降為 mediump（部分舊行動 GPU）。
- **驗證**：建置時把著色器轉為 `#version 450` 以 glslang（@webgpu/glslang）編譯通過；並以**逐行移植的 CPU 參考實作**渲染 640×400 預覽，核對構圖、受光方向與苔的邊界。
- **Fallback**：`getContext('webgl')` 失敗或著色器編譯失敗 → `KT.garden()` 回傳 null → 以**同一組多邊形**畫平塗 SVG（石 `#4C4A46`／苔 `#55642F`）；〈三石〉的石頭改為實心多邊形，拖放與判定照常。無 JS → 文字與營業資訊完整，`<noscript>` 說明。
- **效能**：畫布解析度 = CSS 尺寸 × min(DPR,1.5) × 0.6–0.7；閒置時約每 70–90ms 重繪一次（雲影），只有生長、拖曳、露的期間才 60fps；離開視窗（IntersectionObserver）即停。每像素約 30 次 simplex 取樣。**未能在建置環境實測 GPU 幀時間**（建置環境無 GPU 瀏覽器），此為誠實註記。

### 12.2 同一個 simplex 噪聲在 CPU 與 GPU 兩端——E 資料與生成層

- **承載**：特徵 ① 的「同一條邊」。Ashima Arts／Stefan Gustavson 的 2D simplex（webgl-noise，MIT）在 GLSL 與 JS 兩端**逐式移植**（mod289 置換、同一組常數），所以 JS 算出來給 `shape-outside`、`clip-path`、SVG 點擊區的多邊形，與 GPU 畫出來的石頭像素邊，是同一個函式的兩次求值。
- **實測**（Node 22）：9 顆石 × 40 點 × 10 次 = 7.8ms（每次排版 < 1ms）；右側輪廓掃描線 0.23ms。噪聲值域實測 −0.995～0.999。
- 決定性：同種子同形；〈三石〉的取盆號碼以 FNV-1a 對石位雜湊。

### 12.3 CSS `shape-outside: polygon()`——C 版面與樣式層

- **承載**：特徵 ③⑤——首頁導言沿小石的右緣繞排；〈苔帖〉七段說明沿苔團的輪廓繞排（左右交替）。
- **作法**：首頁每 5px 一條掃描線，取石形多邊形在該高度最右的交點，組成 `polygon(0 0, x₀ 0, x₁ 5px, …, 0 h)`；苔帖直接把苔團多邊形換算成 canvas 盒內百分比。`shape-margin: 12–14px`。
- **查證**：MDN〈shape-outside〉標示 Baseline Widely available（2020-01 起各主流瀏覽器可用，免前綴）；本站只用 Level 1 `polygon()`。
- **Fallback**：不支援時退為一般方框繞排，文字仍完整可讀。≤900px 取消繞排（窄螢幕繞排會讓欄寬過窄）。

### 12.4 Cross-document View Transitions（轉場，附加）

- `@view-transition{navigation:auto}`＋`::view-transition-old/new(root)` 自訂「霧散」關鍵影格。
- **查證**：Chrome／Edge 126+、Safari 18.2+ 支援；Firefox 尚未支援（Chrome for Developers〈View Transition API〉）。不支援時為一般換頁，無任何內容延遲。`prefers-reduced-motion: reduce` 時以 `@view-transition{navigation:none}` 關閉。

### 12.5 預算

| 項目 | 實測 |
|---|---|
| index.html | 42 KB（含全部 CSS／JS／SVG） |
| moss.html | 41 KB |
| tray.html | 51 KB |
| garden.html | 41 KB |
| 首屏 JS（排版＋多邊形＋繞排） | < 2 ms（Node 估算，不含 GPU） |
| 外部資源 | 僅 Google Fonts |
