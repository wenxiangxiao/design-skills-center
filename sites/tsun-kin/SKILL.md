---
name: thermal-receipt
description: Thermal receipt web style — every surface is a 58 mm direct-thermal till roll printed live at 384 dots per line, one-bit ink on cool white paper, fixed 32-column monospace grid, emphasis limited to the three things a POS printer can do (double size, reverse, second-colour red), machine codes as ornament, and ink that fades with real time.
---

# 熱感收據 Thermal Receipt —— 風格規格書

> 範例站：存根茶飲 STUB TEA（臺中一中街手搖飲，整站由收據與杯貼構成）。本規格書與產業無關：便利商店、咖啡外帶、停車場、選舉投票所、獨立書店的短篇販賣機、音樂人的「巡演收據」、個人履歷，只要內容可以被「逐行列出」，都能套用。

## 設計哲學

熱感收據（direct thermal receipt）的歷史很短，限制卻很硬：

- **1960 年代初** NCR 在美國俄亥俄州 Dayton 的實驗室發明直熱式顯色技術，**1964** 年第一種熱感紙（Miniprint Bond）上市；**1965** Texas Instruments 發明熱感印字頭，**1969** Silent 700 終端機用它出紙。熱感紙本身就含有染料前驅物與顯色劑，印字頭只加熱、不出墨——所以沒有色帶、沒有墨匣，也**只有一種顏色**。NCR 的染料系熱感紙便宜但會褪，3M 的金屬鹽系耐久但貴，結果便宜的那種贏了：這就是收據會褪的原因。
- **1990 年代起** Epson 的 ESC/POS 指令集成為 POS 印表機事實標準：58 mm 紙在 203 dpi（8 點／mm）下每列 **384 點**；內建字型 Font A 為 **12×24 點**（一列 32 字），Font B 為 9×17 點；中文用 24×24 點陣（佔兩欄）。強調只有寥寥幾條指令：**倍寬倍高**、**反白（GS B）**、底線，以及雙色熱感紙上的**第二色（紅）**——Epson TM‑T88 系列的雙色模式就是用不同的加熱能量在特殊紙上分出紅與黑。
- **2012** 倫敦 BERG 的 Little Printer 第一次把 384 點熱感紙當成「出版媒介」設計，2013 入圍 Design Museum 年度設計；**2020-09** Michelle Liu 的 Receiptify 把 Spotify 聽歌排行印成收據樣式，幾個月內被用了上百萬次——收據從單據變成了一種公認的視覺語言。
- 臺灣的**電子發票證明聯**把它寫進法規：寬 5.7 cm（±3%）、一條 Code 39 一維條碼（期別 5 碼＋發票號碼 10 碼＋隨機碼 4 碼）、兩個並排、上緣對齊、同尺寸的 QR Code。

這個風格長成這樣，全是因為機器只會這幾招。所以在網頁上的核心不是「白色長條＋等寬字」，而是：**你只能用印表機會做的事來設計，而且每一張都會老。**

## 本風格的 5 個不可省略特徵

### 1. 窄長紙條：384 點寬的冷白熱感紙，兩端是切刀鋸齒

頁面上所有內容都裝在**一條固定寬度的紙**裡（58 mm＝384 點；標籤紙 288 點）。紙是畫面上唯一的白，而且是偏冷的熱感白，不是米白。紙的下緣是切刀留下的鋸齒，上緣卡在印表機出紙口。紙的寬度永遠不跟著視窗變寬——寬螢幕上要做的是**掛更多張**，不是把紙拉寬。

```css
:root{--paper:#F5F6F1;--w:min(100%,432px)}           /* 384 點 × 1.125 */
.rc-paper{width:var(--w);background:var(--paper);position:relative;padding:16px 12px 14px}
.rc-paper::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:6px;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6'%3E%3Cpath d='M0 0L6 6L12 0Z' fill='%23F5F6F1'/%3E%3C/svg%3E") repeat-x}
```

### 2. 一位元點陣：只有墨與紙（加雙色紙的紅），零灰階、零反鋸齒

熱感印字頭的每一點只有「有加熱／沒加熱」。所以：字形要先點陣化再二值化；**灰只能靠抖色（Atkinson）**；放大字是把點陣塊整數倍放大（倍寬倍高），邊緣是階梯，不是向量重繪。顯示時用 `image-rendering:pixelated` 保住點。

```js
// 一列字：畫在 384×24 的暫存畫布 → alpha 二值化 → 倍寬倍高就是 2×2 複製
const d=ctx.getImageData(0,0,384,24).data;
for(let i=0;i<384*24;i++) bits[i]=d[i*4+3]>110?1:0;
// 插畫：灰階 → Atkinson（誤差 1/8 擴散到 6 個鄰點）
```
```css
canvas.rc-cv{width:100%;height:auto;image-rendering:pixelated}
```

### 3. 等寬欄格：一字一格，對齊只有三種

英數一格 12 點、中文兩格 24 點，一列 32 格。版面只有**靠左、置中、左右撐開**（品名靠左、金額靠右、中間用空白補滿）。分隔線不是 `<hr>` 的線條，而是**一整列字元**：`-` 虛線、`=` 雙線、`.` 點線。標題不能變大一號，只能倍寬倍高（整數倍）。

```js
// 左右撐開：右欄寬度固定，左欄超出就折行，最後一行用空白補滿
line = left + ' '.repeat(cols - ncols(left) - ncols(right)) + right;
// 分隔線＝一列字元
hr = (kind==='=' ? '=' : '-').repeat(32);
```

### 4. 強調只有三種印表機指令：倍寬倍高、反白、紅字

沒有粗體、沒有字級階層、沒有底色塊、沒有圓角卡片。**倍高＝最重要的那一項**（品項、標題、總計）；**反白＝跟平常不一樣**（例外、分類標題、hover／focus 狀態）；**紅字＝不要／退／急**（只在雙色紙上有）。三者語意固定，不可拿來裝飾。

```html
<p data-s="2">珍珠奶茶 L</p>          <!-- ESC ! 0x30 倍寬倍高 -->
<p data-r> 半糖 · 去冰 </p>          <!-- GS B 1 反白 -->
<p data-red>不要珍珠 → 改椰果</p>     <!-- 雙色紙第二色 -->
```
```css
/* 無 JS 時的等價樣式 */
[data-s="2"]{font-size:26px;font-weight:700}
[data-r]{background:#201C26;color:#F5F6F1}
[data-red]{color:#C8102E}
```

### 5. 機器碼與時間：條碼、QR、單號、時間戳，而且紙會褪

收據的裝飾只有機器讀的東西：Code 39 條碼、QR Code、單號、收銀員代號、時間戳、「請保留此單」。這些碼**必須是真的、掃得到**——假條碼是這個風格最大的破綻。紙上的黑會依**真實時間**褪向淡紫灰、紙會泛黃，不均勻（邊緣與手摸處先淡）。

```js
// 褪色：按收據上的日期算，不是動畫
const days=(Date.now()-new Date(el.dataset.printed))/864e5;
const fade=1-Math.exp(-days/900);                  // 約 2.5 年褪到一半
const f=Math.min(.82, fade*(0.55+0.9*noise(x/46,y/46)));   // 斑駁
ink = mix('#201C26', '#ADA6B6', f);  red = mix('#C8102E','#E7A7B0',f);
paper = mix('#F5F6F1', '#EEE5C9', fade*1.1);
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 熱感紙白 | `#F5F6F1` | 所有紙、標籤、POS 鍵 | 45% |
| 檯面色（本站烏龍綠） | `#24453B` | 頁面底：紙「被放在」的地方，可換成任何中間調實色 | 40% |
| 新印熱感黑 | `#201C26` | 唯一的墨，偏紫 | 12% |
| 雙色紙紅 | `#C8102E` | 不要／退單／急件；目前頁的夾軌記號 | 2% |
| 不鏽鋼 | `#AEB8B3` | 夾軌、單釘 | 1% |
| 褪色終點 | `#ADA6B6`／`#E7A7B0`／`#EEE5C9` | 墨、紅、紙的老化終點，只能由時間算出 | — |

規則：紙上只准出現墨、紅、紙三色；檯面可以是任何一個實色但不得漸層；禁止任何半透明。

## 字體系統

- 點陣來源：**Noto Sans Mono 600**（英數 20px 畫在 12×24 格）＋ **Noto Sans TC 500**（中文 21px 畫在 24×24 格），Google Fonts 載入，`document.fonts.load()` 等到字再印。
- 字級只有兩階：1×（24 點列高）與 2×（48 點列高）。
- 紙外的少量 HTML 文字（檯面上的說明）用同一組字 12–15px、行高 1.6–1.7，色 `#C9D6CF`。
- 英文一律大寫或原樣；不使用 italic、不使用字距調整。

## 版面與網格

- 欄寬：58 mm 紙 32 欄（384 點）、40 mm 標籤 24 欄（288 點）、夾軌票 8 欄（96 點）。
- 寬螢幕兩欄：左欄主單（432px），右欄較窄的標籤與老單**從更低的高度掛下來**（`padding-top:150px`），左右間距 9vw——不對稱，像櫃台上掛著的單。
- 頁首是一根不鏽鋼夾軌，各頁是夾著的小票；目前頁的票較長、底部紅條。
- 留白規則：紙的左右內距 12px（印字頭兩側的死區），段落之間用一整列空白（`data-feed`）或分隔線列，不用 margin。
- 零旋轉；唯一的角度來自夾軌票在風裡的擺動（±1.8°）。

## 元件配方

- **nav（夾軌）**：`.rail::before` 不鏽鋼條＋每張票一個夾子方塊；票本身是 96 點寬的小收據 canvas，`transform-origin:50% 0` 擺動；hover 時票反白。
- **按鈕（POS 鍵）**：紙白底、2px 墨框、0 圓角、無陰影；按下或 `aria-pressed=true` 時反白。主要動作（開班）是紅底。
- **卡片**：沒有卡片。資訊群組＝另一張收據或一段分隔線之間的列。
- **表單**：用 POS 鍵群組（`fieldset`＋`legend` 小字距大寫）取代下拉選單。
- **連結**：收據上的一整列；hover／focus 時整列反白（在點陣資料上 XOR，再只重繪那幾列）。
- **footer**：檯面上一行小字；收據自己的結尾是條碼＋「請保留此單」。

## 動效規則

| 類型 | 本站實作 | 觸發／時長／曲線 | reduced-motion |
|---|---|---|---|
| ambient | 夾軌上的票在冷氣風裡擺動；印表機待機 LED 閃；每 30 秒依真實時間重排叫號、下一鍋與老單褪色 | `sway` 4.6–6.7s ease-in-out alternate，各票相位錯開；LED 2.4s steps(1) | 擺動與閃爍停止；時間資料仍更新（靜態重排） |
| input | 連結列 hover／focus 反白；POS 鍵按下反白 | pointerenter 當下 XOR＋局部 putImageData，<16ms | 保留（非動畫） |
| transition | 換頁：紅色切刀從左掃到右 0.16s，紙落下 0.42s `cubic-bezier(.55,0,1,.6)`，新頁以 1600 點／秒逐「行」出紙（每次跳一整列字高，像步進馬達） | 點擊內部 .html 連結；進入視窗時出紙 | 直接換頁、整張直接出現 |
| signature | **撕單上釘**：抓住紙尾往下拉，紙跟著被拉長；超過 95px 或甩得夠快就從出紙口撕斷——撕口的齒數與起伏由你拉的速度與斜度決定——紙飛向右上角的單釘並刺穿，印表機立刻再印一張 | pointer 拖曳＋velocity；飛行 0.82s 衰減積分 | 不飛行，單釘計數直接 +1，並以 aria-live 宣告 |

自我限制：本風格**禁用淡入**（熱感紙不會慢慢顯色，它是一列一列冒出來的）；禁用 ease-out 的柔和滑入。

## 插畫與圖像風格

- 一律 **灰階繪製 → Atkinson 抖色 → 一位元**；需要乾淨邊的線、文字、紅色杯貼走第二個「ink」通道直接二值化。
- 母題只畫店裡真的會印的東西：杯子、地圖、杯貼。地圖是街廓（抖色灰）＋街道（挖白）＋門牌（紅底反白）。
- 禁止向量平滑插畫、禁止彩色、禁止陰影。

## Logo 與 Favicon 設計指南

- Logo 是 **32×26 的一位元點陣**：封膜杯＋斜吸管＋一塊紅色杯貼＋一排撕線點＋5×5 點陣字 STUB，`shape-rendering:crispEdges`。像熱感印表機 NV 記憶體裡存的店頭圖。
- Favicon：16×16 檯面綠底上一張小收據，最後一行是紅字，下緣鋸齒。

## Do & Don't

**Do**
- 先決定欄數，所有內容都對齊到格子。
- 讓強調有語意：倍高＝重點、反白＝例外、紅＝不要。
- 條碼與 QR 用真的編碼器產生，並實測可掃。
- 用時間做事：時間戳、叫號、褪色都由真實時鐘算出。

**Don't**
- 不要用「等寬字型＋虛線」的 HTML 假裝收據就收工——沒有點陣與欄格，它只是一個 monospace 網頁。
- 不要畫假條碼、不要在紙上用漸層／陰影／圓角／半透明。
- 不要把紙拉寬去填滿螢幕。
- 去 AI 化禁令：禁紫藍漸層、禁置中三卡片、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章。

## 頁面骨架範例

```html
<nav class="rail" aria-label="主要導覽"><ol>
  <li><a class="tkt" href="index.html" data-n="01" data-t="出單"><span class="t-txt">01 出單</span></a></li>
  <li><a class="tkt" href="menu.html"  data-n="02" data-t="價目"><span class="t-txt">02 價目</span></a></li>
  <li class="spike"><a href="visit.html#spike"><svg>…</svg><span class="n">0</span>單釘</a></li>
</ol></nav>
<main class="desk">
  <section class="rc main" data-title="首頁">
    <div class="rc-paper"><div class="rc-src">
      <figure data-img="cup" data-w="220" data-h="196"></figure>
      <p data-a="c" data-s="2">店名</p>
      <hr data-k="=">
      <p data-a="lr"><span>品項</span><span>價錢</span></p>
      <p data-r> 例外 </p>
      <p data-red>不要／退</p>
      <p><a href="menu.html">02 價目單 ……… ＞</a></p>
      <figure data-bar="STUB-0118"></figure>
      <figure data-qr="https://example.com/?r=…"></figure>
    </div></div>
  </section>
</main>
```
`.rc-src` 是語意化的原始碼：無 JS 時它本身以 CSS 排成一張可讀的收據；有 JS 時渲染器讀它、印成 canvas，並把連結搬到 canvas 上方的透明命中區（保留可聚焦與可讀名稱）。

## 技術實作與相容性

### 採用技術（三層）

1. **Canvas 2D 一位元熱感渲染器（A 渲染層）**：自寫的 ESC/POS 式排版器讀 `.rc-src`，逐字畫進 12／24 點格，`getImageData` 二值化、倍寬倍高以點複製、反白以 XOR、插畫以 Atkinson 抖色，最後 `putImageData` 上色；`image-rendering:pixelated` 顯示。承載特徵 2、3、4。
   - 查證：MDN〈CanvasRenderingContext2D: getImageData()〉Baseline Widely available（2015-07 起）；`willReadFrequently` 為 `getContext()` 的 context 屬性，頻繁讀回時改走軟體畫布。caniuse〈image-rendering: pixelated〉：Chrome 41+、Firefox 93+、Safari 10+，2021 起各瀏覽器普遍支援。
   - Fallback：`document.fonts` 不存在或 1.8 秒內字型未就緒時照樣排（退回系統 CJK 字）；渲染丟例外時該張收據標 `.fail`，`.rc-src` 以 CSS 收據樣式顯示，內容零損失；無 JS 同理。
2. **從零寫的 QR Code Model 2 編碼器＋Code 39（E 資料與生成層）**：位元組模式（UTF‑8）、錯誤更正 M、版本 1–10 自動選、GF(256) 原始多項式 0x11D 的 Reed–Solomon、8 種遮罩以簡化罰分選最佳、版本 ≥7 寫入版本資訊；Code 39 以 12 模組／字（寬條＝2 模組）編碼。用途：交班單把整局結果序列化進 `?r=出杯-退單-走掉-平均×10-最常錯欄&seed=` 印成 QR，**手機掃了就能在另一台裝置重印同一張交班單**；門市頁照法規印出並排雙 QR 與 19 碼 Code 39 的發票證明聯樣張。
   - 查證：建站時以 jsQR 解回版本 1、6、8（含中文 UTF‑8）三組字串全數一致；Code 39 以 ZXing `Code39Reader` 解回 `11510AB123456789F3`。發票規格依財政部〈電子發票證明聯一維及二維條碼規格說明〉（寬 5.7 cm、Code 39 19 碼、兩個並排 QR 每邊 ≥1.5 cm、四周留白 ≥0.2 cm）。`TextEncoder` 為 Baseline Widely available。
   - Fallback：超出版本 10 容量時丟例外 → 該張收據走 `.fail` 文字版。
3. **Pointer Events 拖曳＋速度取樣＋拋擲積分（D 輸入與感測層）**：`setPointerCapture` 讓紙尾的拖曳不會因手指滑出而中斷；最近 6 個樣本算速度，決定是否撕斷、撕口齒形與飛行初速；紙尾 `touch-action:none` 只鎖那一條，整頁捲動不受影響。承載簽名〈撕單上釘〉。
   - 查證：MDN〈Element: setPointerCapture()〉〈Pointer events〉Baseline Widely available。
   - Fallback：紙尾是 `<button>`，鍵盤 Enter／Space 或單擊即以預設速度撕單；reduced-motion 時不飛行。
- 輔助：`clip-path: inset()` 做逐行出紙的露出、`sessionStorage` 跨頁保存單釘、`IntersectionObserver` 讓視窗外的單捲到時才出紙。

### 效能實測（Node 22＋Skia 畫布，建站當下）

| 項目 | 實測 |
|---|---|
| 單頁大小（全部 inline） | 41–53 KB（預算 350 KB） |
| 首屏 JS（字型就緒後：夾軌 4 張票＋第一張收據排版、抖色、上色） | 35–60 ms；其餘收據以 `setTimeout(0)` 分幀排版 |
| 一張 384×1352 點收據上色 | 16 ms；含褪色斑駁 62 ms（只在建置與每 30 秒） |
| hover 反白 | 只 XOR＋重繪該連結的 24–48 點列，< 2 ms |
| 出紙動畫 | 每幀只改一個 `clip-path` 值，無版面重排 |

*本輪依執行紀律禁用瀏覽器工具，以上為 Node＋Skia 量測；瀏覽器端通常更快（GPU 字形快取）。*
