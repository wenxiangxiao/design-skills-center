---
name: superstudio-continuous-monument
description: Italian Radical Design in the manner of Superstudio's Continuous Monument (Florence 1966–1978) — a single isotropic black-on-white square grid that wraps every surface at one constant pitch, inserted as a hard-edged photomontage into toned grayscale landscape photographs with a hand-tinted sky, receding in perspective past the frame edge to the horizon, presented as numbered plates (tavole) with typewritten captions and terse condensed-capital Italian manifesto lines, with red used only for the one square that is yours.
---

# 義大利激進設計・Superstudio 連續紀念碑 Architettura Radicale / Il Monumento Continuo

## 1. 設計哲學

1966 年，佛羅倫斯大學建築系的 Adolfo Natalini 與 Cristiano Toraldo di Francia 成立 Superstudio（其後加入 Gian Piero Frassinelli、Alessandro 與 Roberto Magris、Alessandro Poli），同年與 Archizoom Associati（Andrea Branzi 等）在 Pistoia 合辦〈Superarchitettura〉展，被視為「激進設計」的宣言。1969 年 Superstudio 發表〈連續紀念碑：全面都市化的建築模型〉（Il Monumento Continuo）：一條覆滿方格的建築，以照片拼貼插進沙漠、河谷、曼哈頓與阿爾卑斯山，最後繞地球一圈。同一時期的〈建築直方圖〉（Istogrammi d'architettura）把建築縮成一套包著格子的方塊，1970 年由 Zanotta 量產為 Quaderna 家具（白色層壓板、黑格網版印刷，至今仍在生產）。1971–73 年的〈基本行為〉（Atti fondamentali：生活、教育、儀式、愛、死亡）與 1972 年 MoMA〈Italy: The New Domestic Landscape〉展中的〈Supersurface〉影片，把格子變成一張「沒有物件」的生活表面。

它長成這樣的原因：**格子是反建築**。等向、無階層、無中心的方格拒絕了「比較好的位置」與「比較重要的房間」；照片拼貼讓它不必被蓋出來就能被看見；圖版與打字機圖說是建築雜誌（Casabella、Domus）與展覽的頁面語言。所以本風格的視覺規則全部來自一個立場——**一種格子、一個價錢、沒有盡頭**。

給網頁的轉譯：頁面本身是一張格子層壓板；每一張圖是一張編號圖版；圖裡唯一的「設計」是一條覆滿格子、穿過真實地景的白色量體；文字短、斷然、像宣言。

## 2. 色彩系統

| Token | Hex | 用途 | 面積 |
|---|---|---|---|
| `--lam` 層壓板白 | `#F6F6F1` | 頁面底（上面永遠鋪 24px 格線） | 50% |
| `--white` 量體白 | `#FDFDFB` | 圖版底、格子量體頂面、卡片 | 15% |
| `--ink` 格線黑 | `#141414` | 格線、外框、文字 | 12% |
| `--g1` 銀鹽深灰 | `#2E2C28` | 照片暗部、次要文字 | 照片內 |
| `--g2` 銀鹽中灰 | `#7E796F` | 照片中間調 | 照片內 |
| `--g3` 銀鹽亮灰 | `#C9C3B6` | 照片亮部、分隔細線 | 照片內 |
| `--tint` 手染天空 | `#BFD9D6` | 只用在照片的天空（上色照片） | ≤10% |
| `--red` 你的那一格 | `#D6402A` | 被選中的一格、唯一的強調 | ≤1% |

規則：照片是灰的（帶一點暖的銀鹽色），格子是黑白的，天空可以是手染的淡青；**紅只能出現在「一格」這個單位上**——被選的格子、導覽目前頁方塊的一個角、一顆按鈕。黃昏時天空換成 `#E0C4A8→#F0E2CE`，夜裡換成 `#2E3842→#62686A` 而格子降到 55% 亮度，但格子永遠比地景亮。

## 3. 字體系統

- **宣言大寫**：Archivo（Google Fonts 可變字體，`wdth` 62–125），`font-stretch:62%; font-weight:800; text-transform:uppercase; line-height:.92`。只放義大利文短語：`UNA SOLA SUPERFICIE PER TUTTI.`、`TRE REGOLE`、`ISTOGRAMMI`。字級 44–152px。
- **中文**：Noto Sans TC 400／700／900。標題 900、`letter-spacing:.02–.06em`；內文 400、15–16px、`line-height:1.75`。
- **圖版圖說**：Courier Prime 12–13px，全大寫義大利文＋中文：`TAV. 1 — IL MONUMENTO CONTINUO, TRATTO DI LUGU`。只用在圖說、單位、號碼；**不做數字讀數儀表**。
- Scale（px）：152 / 112 / 48 / 30 / 22 / 16 / 13 / 12。

## 4. 版面與網格

- 頁面底是 24px 格線（`rgba(20,20,20,.11)`、1px），所有邊距、間距、元件高度都是 24 的倍數（12 是唯一允許的半格）。
- 12 欄、`gap:24px`、外邊距 24px（≤560px 時 16px）。**不對稱**：圖版占 1–8 欄、文字 9–12 欄；故事板圖版交錯落在 1–6／7–12／2–8／8–13，並以 48/96px 的上移錯位。
- **零旋轉**：所有東西都在格子上，0°。
- 圖版（tavola）：白底、1px 黑框、12px 內距、16:10 圖、下方一行打字機圖說左右對齊。
- 留白不是「空」，是露出來的格子。

## 5. 元件配方

**導覽：直方圖方塊（istogrammi nav）**——左下固定，四個包著 8px 格線的白方塊高度遞增 24/32/40/48px，目前頁 72px 且反白（黑底白線）並在右上角放一個 8×8 紅格；hover 升到 64px（`@property --h` 補間）。≤560px 攤成底部滿寬條。

```css
@property --h{syntax:'<length>';inherits:false;initial-value:32px}
.blk{--h:32px;height:var(--h);background:#FDFDFB;border:1.5px solid #141414;
 background-image:linear-gradient(to right,#141414 1px,transparent 1px),linear-gradient(to bottom,#141414 1px,transparent 1px);
 background-size:8px 8px;background-position:-1px -1px;transition:--h .28s cubic-bezier(.2,.8,.2,1)}
.isto a:hover .blk{--h:64px}
```

**按鈕**：48px 高、1.5px 黑框、白底、900 中文；hover 反黑。主要動作用紅底（全頁只一顆）。

**資料列（dl）**：上 1.5px 黑線，每列 1px 黑底線，左欄 96px 放義大利文窄體大寫標籤（`STANOTTE`、`LIBERI`、`PREZZO`）。

**卡片＝直方圖**：白底黑框；上半是 12px 格線的「舞台」，中間一個等角格子方塊；下半是打字機編號（`ISTOGRAMMA N. 3 — PANCA`）、中文品名、尺寸（以格為單位）、價格。

**表單**：0 圓角、1.5px 黑框、`--lam` 底；單選做成相連的格子段（選中反黑）。

**Footer**：上 1.5px 黑線、四欄（INDIRIZZO／TELEFONO／ORARI／FONTI）＋一行打字機出處。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

1. **ambient 環境——雲影漂移＋真實時刻光線**：雲影是第二層 value noise，以 `0.00004 × dt` 在地景上平移；載入時依使用者時鐘決定白日（太陽方位角隨時間 −2.9→−0.7 rad）、黃昏（16:30–18:36）、熄燈後（夜）三種光。降級：靜止一張，仍依時刻選光。
2. **input-driven 輸入——游標視差＋格子 hover**：游標在圖版上移動，鏡頭偏航 ±0.07 rad、升降 ±7，指數趨近（`1−0.86^(dt/16)`）；游標下的格子即時染淡紅並在圖說列寫出「第 2 列・第 041 格 今晚：空著」。方向鍵移動選格，鏡頭沿紀念碑滑過去。延遲：同一個 rAF 內（<17ms）。降級：無視差、鏡頭直接跳到目標，hover 與選格照常。
3. **transition 轉場——格子吞頁**：點站內連結時，一層層壓板白從透明浮起，格線間距由 `96vmax` 收斂到 `24px`（`@property --cell` 補間，520ms，`cubic-bezier(.6,0,.4,1)`）；新頁載入時反向（24px→120vmax、透明，600ms）。降級：`#sw{display:none}`，直接換頁。
4. **signature 簽名——紀念碑生長**：首頁載入後，連續紀念碑從鏡頭後方沿直線長向地平線（3.4s、ease-out cubic），穿過山頭時山被切開；完成後圖說換成「TAV. 1 完成：一條紀念碑，繞地球一圈的其中 384 公尺」。降級：一開始就是完整的紀念碑。

自我限制：**本風格禁用淡入、彈跳、模糊與陰影**——格子不會飄進來，它要嘛在，要嘛正在被蓋出來。

## 7. 插畫與圖像風格（voxel-photomontage）

- 圖像只有兩種東西：**一張灰階照片**（地景）與**一個包著格子的白色量體**。兩者不融合——量體沒有陰影、沒有反光、不受霧以外的光影響，邊緣是硬切的，正是拼貼。
- 照片：自寫週期 value noise 的 fBm＋一層 ridged 噪聲生成高度場，Lambert 光烘焙成亮度；以 Voxel Space 逐欄投射；暖灰色調映射 `R=43+v·.84, G=41+v·.81, B=37+v·.76`；遠處以天空色做大氣霧；最後每像素疊 ±7 的三角分布靜態顆粒（照片顆粒，只加在照片上、不加在格子上）。
- 量體：頂面 `#F5F5F0`、側面 `#C8C8C1`；格線依像素足跡做抗鋸齒，太細時退成灰而不是閃爍。
- 等角直方圖（istogrammi）：30° 等角；頂／左／右三面 `#FDFDFB／#EBEBE5／#D6D6CF`；格線間距在所有物件上相同（0.25 單位），2px 外框、1px 格線。

## 8. Logo 與 Favicon

- 標誌：一個 3×3 的白色方格（2–3px 黑線），中列最右一格塗紅——「三列中的一格」。字標：Noto Sans TC 900「格仔坪」＋窄體大寫 `KEH-Á-PHIÂNN · SUPERSUPERFICIE DI LUGU`＋打字機小字 `384 × 3 m · 1,050 m s.l.m.`；兩條水平格線從方格延伸穿過字標。
- Favicon：同一個 3×3 方格，inline SVG data URI。

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect x='1' y='1' width='46' height='46' fill='%23FDFDFB' stroke='%23141414' stroke-width='3'/><path d='M16.3 1V47M31.7 1V47M1 16.3H47M1 31.7H47' stroke='%23141414' stroke-width='3'/><rect x='33' y='17.5' width='13' height='13' fill='%23D6402A'/></svg>">
```

## 9. Do & Don't

**Do**
- 格子間距全站一致；物件變大，格子不變大。
- 每張圖都是有編號的圖版，配打字機圖說。
- 量體永遠出畫框——它沒有盡頭。
- 文案短、斷然，像宣言；義大利文只做標籤與宣言，資訊用中文。
- 用真實的地景（或可信的生成地景），不要抽象背景。

**Don't**
- 不要圓角、陰影、玻璃擬態、漸層按鈕。
- 不要把格子當「背景花紋」縮放、旋轉或變色；不要彩色格線。
- 不要讓紅色超過「一格」。
- 不要把格子畫成工程圖：不要圖號角標、比例尺、數字讀數儀表、標註箭頭（那是另一個風格）。
- 不要把量體做成未來城市的玻璃大樓；它是白色、實心、無窗、無門的。
- 去AI化：禁紫藍漸層 hero、置中三卡片、emoji icon、Lorem ipsum、EST. 徽章。

## 10. 頁面骨架範例

```html
<body>
<div id="sw" class="out" aria-hidden="true"></div>
<header class="mast"><a href="index.html"><!-- 3×3 logo --><span><b>格仔坪</b><i>Keh-á-phiânn · Supersuperficie di Lugu</i></span></a></header>
<main>
 <section class="open" style="display:grid;grid-template-columns:repeat(12,1fr);gap:24px;padding:24px">
  <figure class="tav" style="grid-column:1/9">
   <div class="frame"><canvas id="tav1"></canvas><!-- 靜態 SVG 備援 --></div>
   <figcaption><span class="typ">TAV. 1 — IL MONUMENTO CONTINUO</span><span class="typ">連續紀念碑・384 格 × 3 m</span></figcaption>
  </figure>
  <aside style="grid-column:9/13">
   <p class="cap" style="font-size:96px">Una sola<br>superficie<br>per <b style="color:#D6402A">tutti.</b></p>
   <h1>一條直線，橫過山谷。</h1>
   <a class="btn red" href="superficie.html">去選一格 →</a>
  </aside>
 </section>
</main>
<nav class="isto"><a href="index.html" aria-current="page"><span class="blk"></span><span>總覽</span></a><!-- ×4 --></nav>
</body>
```

## 11. 本風格的 5 個不可省略特徵

### ① 等向方格——一種格子包住所有表面（拿掉它，就只是白色極簡）

格子是黑線白底、正方形、**同一個間距包住頁面、量體頂面、量體側面與每一件家具**；不隨物件縮放、不旋轉、不變色。

```css
.laminate{background-color:#FDFDFB;
 background-image:linear-gradient(to right,#141414 1px,transparent 1px),linear-gradient(to bottom,#141414 1px,transparent 1px);
 background-size:24px 24px;background-position:-1px -1px}
```
```svg
<pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#141414" stroke-width="1"/></pattern>
```

### ② 照片蒙太奇——格子量體硬插進灰階地景（拿掉它，就是 Quaderna 家具型錄而不是激進建築）

地景是有顆粒的暖灰照片，天空可手染淡青；量體沒有陰影、不吃環境光，邊緣硬切。CSS 版（有現成照片時）：

```css
.montage{position:relative;filter:none}
.montage img{filter:grayscale(1) sepia(.18) contrast(1.05)}
.montage .sky{position:absolute;inset:0 0 62% 0;background:#BFD9D6;mix-blend-mode:multiply}
.montage .monument{position:absolute;clip-path:polygon(40% 100%,100% 88%,64% 41%,57% 42%);background:#F5F5F0}
```

### ③ 透視延伸到地平線、而且出畫框（拿掉它，量體就變成一棟建築而不是一個系統）

紀念碑的兩端都必須被畫框切掉：一端在近景出框，一端消失在地平線霧裡。格線在遠處退成灰。

```svg
<!-- 一點透視：近端 (68,100)-(160,88)，遠端 (57,42)-(62,41.2)；橫線以 t^2.2 分布 -->
<path d="M57 42L62 41.2L160 88L68 100Z" fill="#F5F5F0"/>
<path d="M58.7 41.7L98.7 96M60.3 41.5L129.3 92" stroke="#141414" stroke-width=".35"/>
```

### ④ 圖版＋打字機圖說＋窄體義大利文宣言（拿掉它，就是一般的形象網站）

```css
.tav{background:#FDFDFB;border:1px solid #141414;padding:12px 12px 0}
.tav figcaption{display:flex;justify-content:space-between;padding:8px 0 10px;font:13px/1.5 "Courier Prime",monospace}
.cap{font-family:"Archivo";font-stretch:62%;font-weight:800;text-transform:uppercase;line-height:.92}
```
```html
<figcaption><span>TAV. 2 — SUPERFICIE, VISTA DAL QUADRATO</span><span>從格子看出去</span></figcaption>
```

### ⑤ 三值色＋一格紅（拿掉它，就變成普普或孟菲斯）

只有照片灰階、量體白、格線黑；天空可以手染；紅只給「你的那一格」。

```css
:root{--lam:#F6F6F1;--white:#FDFDFB;--ink:#141414;--tint:#BFD9D6;--red:#D6402A}
.cell.mine{background:#D6402A}           /* 全頁唯一的紅面積 */
.isto [aria-current] .blk::after{content:"";position:absolute;right:0;top:0;width:8px;height:8px;background:#D6402A}
```

## 12. 技術實作與相容性

### (a) 核心技術與查證

| 技術 | 層 | 本站承載什麼 | 支援現況與來源 |
|---|---|---|---|
| Canvas 2D `createImageData`／`putImageData`＋`Uint32Array` 直寫像素（Voxel Space 逐欄高度場投射） | A 渲染 | 全站唯一的圖像引擎：地景照片、雲影、時刻光、紀念碑與它的格子、選格的 pick buffer | Canvas 2D 與 ImageData 為全瀏覽器長期支援的 Baseline 功能；演算法參照 s-macke/VoxelSpace（GitHub，Comanche 1992 技術解說與 JS 示範：back-to-front 或 front-to-back 加 y-buffer 的逐欄投射）。本站採 front-to-back＋y-buffer。像素以 `0xFF<<24 | B<<16 | G<<8 | R` 寫入，依賴小端序（目前所有主流瀏覽器平台皆是）。 |
| 自寫週期 value noise fBm＋ridged、xorshift32 決定性種子 | E 資料生成 | 512² 可無縫循環的地形（每個八度音以 P=5·2ᵒ 的週期格點取樣）、亮度紋理、雲影；每晚的占用格由「日期」當種子產生，同一天任何人看到的空格相同 | 純 JS 運算，無相容性問題。 |
| CSS `@property` 型別化 `<length>` 補間 | B 動效 | 轉場時 `--cell` 從 96vmax 收到 24px（格子吞頁）；導覽方塊 `--h` 升起 | MDN：Baseline 2024（Newly available）；caniuse：Chrome/Edge 85+、Safari 16.4+、Firefox 128+。 |

### (b) Fallback 具體行為

- **無 JS／Canvas 失敗**：每張圖版內預放一張 SVG 靜態圖（三層山稜＋一點透視的白色格子帶），`.js-ok` 出現前一直顯示；選格頁顯示 `<noscript>` 改以電話預約。轉場層 `#sw` 的入場動畫是純 CSS，無 JS 也會正常淡出。
- **不支援 `@property`**（Firefox <128、Safari <16.4）：`--cell` 與 `--h` 無法補間，轉場退化為只有透明度淡入淡出、導覽方塊高度瞬間跳變；資訊不受影響。
- **`prefers-reduced-motion: reduce`**：無紀念碑生長（一開始就完整）、無雲影漂移、無游標視差、無轉場層；hover 染格、點選、方向鍵選格照常，鏡頭直接跳到目標格；格位證不做刷出動畫。
- **無 IntersectionObserver**：故事板五張圖版直接全部算繪。

### (c) 效能實測（Node 22 / V8，本輪環境無瀏覽器；以下皆為以同一份 core.js 在 Node 可重現的數字）

- 單頁大小：index 33.6 KB、superficie 36.9 KB、istogrammi 33.3 KB、atti 40.8 KB（全部 inline，遠低於 350 KB）。
- 首屏 JS：地形＋烘焙拆成 9 個 `setTimeout` 切片，最長一片 12.4 ms，總計 76 ms 牆鐘；首張 720×450 畫面冷啟動 61.9 ms（含 JIT），之後單一 long task 皆 <100 ms。
- 穩定幀：720×450 每幀 3.8 ms、360×225 每幀 1.7 ms（16.7 ms 預算內，60 fps）；圖版離開視口或分頁隱藏即停止 rAF。
- 故事板圖版為 `still` 模式：只在初次與 hover 時重畫，不跑持續迴圈。
