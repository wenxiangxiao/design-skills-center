---
name: wendingen-rule-built
description: Dutch Wendingen magazine typography of the Amsterdam School (Hendrik Wijdeveld, 1918–1932) — letters and ornamental borders assembled only from straight printer's brass rules with visible seams and striped stems, a square 1:1 page and 2:1 double-square spread bound with raffia, flat burnt-orange and gold letterpress fields with ink black on rice paper, and a tightly pieced mosaic layout on a whole-unit grid.
---

# Wendingen 鉛條拼字・阿姆斯特丹學派書刊

> 範例站：瑞興磚窯 SŪI-HING（彰化花壇十八室八卦窯）。本規格書不綁產業——任何「以單位堆出來的東西」（磚、木作、樂高、編織、拼布、建築事務所、活版工作室）都特別合用。

## 1. 設計哲學

1918 年一月，阿姆斯特丹建築師協會 Architectura et Amicitia 的月刊《Wendingen》創刊（比 De Stijl 晚三個月），到 1932 年共出 116 期。編輯兼設計者 Hendrik Th. Wijdeveld（1885–1987）定下三件事：**33 公分正方開本**（攤開是兩個正方，取日本榻榻米的 2:1）、**和紙單面印、對摺後用草繩縫**的和裝，以及最出名的——**用印刷所字盒裡現成的黃銅鉛條（brass rules）拼出字母與花邊**。芝加哥藝術學院的典藏說明稱他以「把印刷黃銅條拼成字母與幾何花飾」聞名，這套超大字＋粗花邊的組合後來被叫作 Wendingen Style。

為什麼長這樣：活版印刷所裡最多的不是字，是條——空鉛、鉛條、花邊塊。Wijdeveld 是建築師，他把版面當成一面牆來砌：每一個元件都是整數單位，縫是看得見的，曲線不存在（鉛條不會彎），斜線用階梯代替。這跟同時期阿姆斯特丹學派（Michel de Klerk〈Het Schip〉1919–21）的表現主義磚造是同一種腦袋。

本規格的核心句：**字是砌出來的，不是畫出來的。** 任何一個筆畫都必須能說出它是「哪幾根條」。

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--orange` 焦橙 | `#C55220` | 封面整片色場、強調頁、現頁 | 封面 ≈60%、全站 ≈25% |
| `--orange-d` 深橙 | `#9C3D15` | hover、價格字 | <3% |
| `--gold` 黃銅金 | `#B88E35` | 細金線、花邊方塊、黑底上的數字 | ≈6% |
| `--ink` 墨黑 | `#191512` | 鉛條字、粗外框、黑底嵌塊、書脊 | ≈20% |
| `--paper` 和紙米 | `#EEE4CF` | 內頁紙 | ≈30% |
| `--paper2` 底紙 | `#E3D4B6` | 頁外桌面、次要格 | ≈12% |
| `--raffia` 草繩 | `#CDB273` | 書脊縫線、黑底上的小字 | <2% |
| `--brick` 磚紅 | `#8B3A25` | 產業色（可換成你產業的材料色） | ≈4% |

規則：**全部平塗**，零漸層、零陰影、零透明疊色（唯一的 `linear-gradient` 只用來放硬邊色塊，等同平塗）。同一畫面飽和色最多兩個（焦橙＋金），第三色只能是墨黑或紙。金不是金屬光澤，是一塊平的黃銅色。

## 3. 字體系統

- **標題（拉丁／數字）**：不用字體檔——一律以第 10 章特徵①的鉛條引擎「排」出來。字模 6 格寬 × 8 格高，直幹 2 格、橫畫 1 格（粗直細橫），M／W 用 8 格寬。
- **中文標題**：Noto Sans TC 900，常以**直排疊字**塞進黑色正方塊（Wendingen 封面也會把字母直著疊，「像中文一樣」）。字級 `clamp(20px,3.4cqi,34px)`；封面四方塊 `clamp(22px,4.4vw,52px)`。
- **內文**：Noto Sans TC 400／700，`clamp(12.5px,2.3cqi,15.5px)`、行高 1.8。原刊是無襯線——當年還被保守派罵「把廣告字放進藝術雜誌」。
- **小標／頁碼／拉丁標籤**：Josefin Sans 600/700（1920 年代幾何無襯線的血緣），全大寫、`letter-spacing:.14–.22em`、11–13px。
- 數字一律用 Josefin 或鉛條引擎；不要用 mono。

## 4. 版面與網格

- **頁面單位**：每一頁都是正方（`aspect-ratio:1`），兩頁並排成 2:1 跨頁（`aspect-ratio:2/1`），中縫 2px 紙色＋三道草繩縫。≤1200px 跨頁拆成單頁正方疊放（寬 ≤720px），≤560px 放開高度。
- **頁內 6×6 嵌拼格**：`grid-template-columns:repeat(6,minmax(0,1fr))`、6 列、gap 6px；元件一律佔整數格，不浮動、不重疊（只有破格的鉛條字允許溢出）。封面用 12×12。
- **留白**：頁內 padding = 花邊深度 3u ＋ 0.6u（u=14px，手機 9px）。格與格之間的縫就是版面的「灰縫」，不要另外加外距。
- **旋轉角度**：0°。只有 0／90°；斜線一律做成階梯。
- 頁碼（folio）坐在下花邊上，紙色底把花邊挖一個口。

## 5. 元件配方

- **導覽＝草繩書脊**：左側固定 72px 墨黑直條，右緣 4px 金線；每頁一個「洞＋直排頁名＋羅馬頁碼」，一條草繩縫線從洞伸出（`scaleX(.62)`，hover／現頁拉滿 1）；現頁整格焦橙。頂上一座小八卦窯即時顯示火位。≤560px 落到底部橫排。
- **按鈕**：墨黑方塊、白字、`box-shadow:inset 0 -4px 0 var(--gold)`（底下一根金條）；替代款焦橙底＋墨條。零圓角。
- **卡片＝嵌拼格 slot**：`.slot.ink／.or／.gd／.br／.pp` 五種平色底，內距 `clamp(8px,2.2cqi,18px)`；連結格 hover 時以 4px 墨框「鎖起來」。
- **表單**：輸入框只有底線 3px 墨黑，focus 轉焦橙；單選做成並排色塊（選中＝墨黑底）。
- **footer＝版權頁 colophon**：墨黑三欄、上緣 10px 焦橙條，左欄放一組鉛條年份。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 做法 | 觸發／時間／easing | reduced-motion |
|---|---|---|---|
| ambient 環境 | 窯火：十八室中「火頭」那一室以 `steps(4,jump-none)` 在四個火色間跳（1.6s 無限）；位置由真實時間決定（每 18 小時進一室） | 無需輸入 | 停在單一火色、位置照算 |
| input 輸入 | 封面鉛條字「鬆版」：游標 46 單位內的條被推開 ≤7 單位（rAF、個別屬性 `translate`、80ms linear）；書脊草繩 hover 拉緊；磚樣滑過即替樣牆試色；版框格子 hover 描框 | <1 幀 | 推開關閉，其他即時換色保留 |
| transition 轉場 | 換頁：整本 `main` 沿左緣（書脊）`rotateY(0→-96deg)` 400ms 翻走、新頁 `62deg→0` 460ms 翻進；換砌法時整面牆的磚 FLIP 重排（520ms，依位置遞延）；改字時鉛條 FLIP | `cubic-bezier(.2,.75,.25,1)` | 直接換頁／直接換位 |
| signature 簽名 | **排字＋鎖版**：鉛條從版面下方的「字盒」（7 格一列、直條橫躺）依長短順序飛進字框（720ms、每根遞延 16ms），全數到位後整版 `translateX(2→-1→0)` 一震（敲緊楔子，150ms steps(3)），接著花邊沿順時針一塊一塊上（`--wb-lock` 0→1，950ms `steps(24)`） | 每 session 首次進站一次 | 直接顯示排好的版 |

本風格的自我限制：**不用淡入、不用彈跳、不用任何曲線位移路徑**——鉛條只走直線，要嘛到位、要嘛沒到。

## 7. 插畫與圖像風格（rule-mosaic：鉛條拼嵌）

全站沒有一張「畫」：窯的平面圖、年份、門牌、窯票號、地圖都只用直條矩形拼成，每根條內部是 2×(短邊格數) 根平行細條、條與條留 0.9 單位縫。圖像的顏色是「整根換色」——窯室依狀態整室換色（裝坯灰褐、預熱黃褐、火頭金、冷卻磚紅）。位置圖：道路＝三條平行墨條、鐵路＝兩條石板藍條＋枕木短條、車站＝墨塊挖白字。禁止曲線、禁止斜線、禁止任何漸層光影。

## 8. Logo 與 Favicon

Logo（`assets/logo.svg`）：260×260 正方；外 12px 墨框、內焦橙場、20px 處一圈 3px 金線；中間鉛條引擎排出的「SH」（直先排法），下方一座鉛條八卦窯、第 5 室上金。Favicon：同構圖簡化為墨框＋焦橙＋上下兩條金線＋「SH」，inline SVG data URI。

## 9. Do & Don't

**Do**：每個筆畫都能數得出幾根條／縫看得見／正方頁與 2:1 跨頁／花邊排滿整數單位／焦橙整片平塗／中文直排疊進黑方塊／一頁內元件貼齊 6×6 格。

**Don't**：曲線字或圓角（那是 Art Deco 或 Streamline）／斜線筆畫／漸層、陰影、玻璃、霓虹／金屬光澤的金（Art Deco 公式）／黑白棋盤格帶（那是維也納分離派 Ver Sacrum）／三原色＋純幾何構成（那是 De Stijl，Wendingen 的對手）／置中三卡片、紫藍漸層、emoji icon、EST. 徽章、Lorem ipsum。

## 10. 本風格的 5 個不可省略特徵

### ① 黃銅鉛條拼字：字只由直條矩形組成，縫看得見、字幹是平行細條（字體選擇）

拿掉它就只是一本橙色雜誌。字模是格子，規則引擎把格子分解成最少的矩形，每根矩形畫成平行細條：

```js
// 字模：6×8，XX = 兩格直幹，單列 = 一根橫畫
const G={S:["XXXXXX","XX....","XX....","XXXXXX","....XX","....XX","....XX","XXXXXX"] /* … */};
function solve(grid,W,H,dir){ /* 逐格掃描，未用的實心格往 dir 方向長到最長，再往另一方向擴寬；min＝三種策略取根數最少者 */ }
function pieceSVG(r){ const C=10,S=.9,GAP=1.15,X=r.x*C+S/2,Y=r.y*C+S/2,W=r.w*C-S,H=r.h*C-S;
  const vert=r.h>=r.w, n=(vert?r.w:r.h)*2, t=((vert?W:H)-(n-1)*GAP)/n; let s="";
  for(let i=0;i<n;i++){const p=i*(t+GAP); s+=vert?`<rect x="${X+p}" y="${Y}" width="${t}" height="${H}"/>`:`<rect x="${X}" y="${Y+p}" width="${W}" height="${t}"/>`}
  return `<g class="pc">${s}</g>`; }
```

### ② 厚重鉛條花邊：粗墨外線＋細金線＋字盒塊帶＋內細線，永遠排滿整根（裝飾母題）

由外而內：0.8u 墨線（每 4u 一根、留縫）→ 間隔 → 0.22u 金線（每 6u 一根）→ 1u 高的塊帶（黑條、黑條、金方循環，角上黑方嵌金心）→ 0.14u 內墨線。剩餘長度平均分進縫，**不切半根**。

```css
@property --wb-lock{syntax:'<number>';inherits:true;initial-value:1}
.wb{position:relative;--wb-unit:14;--wb-ink:#191512;--wb-gold:#B88E35}
.wb::after{content:"";position:absolute;inset:0;pointer-events:none;
  box-shadow:inset 0 0 0 11px #191512,inset 0 0 0 19px #B88E35} /* 無 JS 後備 */
html.houdini .wb::after{box-shadow:none;background-image:paint(wborder)}
```

### ③ 正方開本、2:1 跨頁、草繩和裝（版面手法）

```css
.page{aspect-ratio:1}
.spread{display:grid;grid-template-columns:1fr 1fr;aspect-ratio:2/1;position:relative}
.spread::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:7px;margin-left:-3.5px;
  background:linear-gradient(#CDB273 0 0) 50% 18%/7px 30px no-repeat,
             linear-gradient(#CDB273 0 0) 50% 50%/7px 30px no-repeat,
             linear-gradient(#CDB273 0 0) 50% 82%/7px 30px no-repeat}
```

### ④ 焦橙與黃銅的大片平色＋墨黑＋和紙（色彩規則）

封面必須是一整片焦橙，字是墨黑，金只當線與方塊。內頁回到和紙米，焦橙以整格出現。

```css
:root{--orange:#C55220;--gold:#B88E35;--ink:#191512;--paper:#EEE4CF}
.cover{background:var(--orange);color:var(--ink)}
.slot.or{background:var(--orange)} .slot.ink{background:var(--ink);color:var(--paper)}
```

### ⑤ 嵌拼版面：一頁是整數格的拼貼，中文直排疊進黑方塊（版面手法）

```html
<div class="mosaic" style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:repeat(6,auto);gap:6px">
  <div class="slot ink" style="grid-area:1/1/2/7">小標</div>
  <h2 class="slot" style="grid-area:2/1/4/5">火在走，磚不動。</h2>
  <div class="slot or" style="grid-area:2/5/7/7"><span style="writing-mode:vertical-rl;font-weight:900">一窯十八室</span></div>
</div>
<div class="cjk-stack"><span>瑞</span><span>興</span><span>磚</span><span>窯</span></div>
```

## 11. 頁面骨架範例

```html
<body style="padding-left:72px">
<nav class="spine"><a class="pg" href="index.html" aria-current="page"><span class="hole"></span><span class="lbl">窯報</span><span class="no">I</span><span class="stitch"></span></a>…</nav>
<main class="book">
  <section class="cover wb"> <!-- 12×12：鉛條大字 1/1/8/11、直排黑方 1/11/9/13、期號條 8/1/9/11、圖 9/1/13/8、資訊 9/8/13/13 --> </section>
  <section class="spread">
    <div class="pg-sq wb"><div class="mosaic">…</div><span class="folio l">2</span></div>
    <div class="pg-sq wb"><div class="mosaic">…</div><span class="folio r">3</span></div>
  </section>
  <footer class="colophon">…</footer>
</main>
```

## 12. 技術實作與相容性

### 12.1 CSS Houdini Paint API（A 渲染層）——承載特徵②

- **做法**：花邊畫法寫成一支普通函式 `paintBorder(ctx,W,H,P)`；執行時把它 `toString()` 串上 `registerPaint('wborder',…)` 做成 Blob URL，`CSS.paintWorklet.addModule(url)` 成功後才在 `<html>` 加 `.houdini`，讓 `.wb::after{background-image:paint(wborder)}` 生效（單檔 HTML，不需外部 worklet 檔）。`inputProperties` 讀 `--wb-unit／--wb-ink／--wb-gold／--wb-lock`；`--wb-lock` 以 `@property` 註冊為 `<number>`，用 WAAPI 從 0 補到 1 時 paint 每幀重跑，花邊依各塊中心的極角順時針出現。
- **支援現況（2026-10 查證）**：caniuse「CSS Painting API」——Chrome／Edge 65+、Opera 52+、Chrome Android 支援；Safari 12.1–26.x 與 TP 為「預設關閉」、iOS Safari 不支援；Firefox 全版本不支援。
- **fallback 具體行為**：沒有 `CSS.paintWorklet` 或 `addModule` 失敗 → `<html>` 加 `.wb-canvas`，每個 `.wb` 插入一張 `<canvas>`，**用同一支 `paintBorder` 函式**畫（Paint 的 ctx 是 Canvas2D 子集，`fillRect`／`fillStyle` 兩邊相同），`ResizeObserver` 重畫；鎖版動畫改 rAF 逐幀重畫。無 JS → `::after` 的雙層 inset `box-shadow`（墨＋金）。三種環境的資訊完全相同。

### 12.2 矩形分解規則引擎（E 資料與生成層）——承載特徵①與 func

- **做法**：字模格 → 貪婪最大矩形分解（三策略：h 橫先、v 直先、min 每格比較兩向；min 模式再三者取根數最少），上限每根 12 格。輸出 `{x,y,w,h,o}`，同時供 SVG 繪製、FLIP 對位與報價（字磚片數、磚條根數、模具種類＝不同 w×h 的數量）。
- **實測**：「SUI-HING 1963」330 格 → 46 根，node 22 單次 0.15–0.33ms；門牌（≤6 字＋邊）重算＋重繪 <2ms。建置時同一支引擎在 node 預先排好封面與年份 SVG，所以無 JS 時字照樣在。
- **相容性**：純 ES5＋`Uint8Array`，全瀏覽器。

### 12.3 FLIP 版面轉場＋WAAPI（B 動效與時間軸層）——承載 signature 與 transition

- **做法**：First／Last 由引擎資料直接算（不讀 DOM），Invert 寫成 `transform: translate() scale()`，Play 用 `Element.animate()`。SVG 元素設 `transform-box:fill-box; transform-origin:0 0`，位移單位即 SVG 使用者單位。樣牆的磚是池化 `<rect width=1 height=1>`，位置全由 `transform: translate(x,y) scale(w,h)` 表示，換砌法即補間兩組 transform 字串。游標推開用獨立的 `translate` 屬性，不與 FLIP 的 `transform` 打架。
- **支援現況**：WAAPI `Element.animate()` 與 `.finished` 全主流瀏覽器（Baseline）；個別 transform 屬性 `translate` Baseline 2022；`@property` Baseline 2024（Firefox 128）；`:has()` 與 container query 單位（`cqi`）Baseline 2023。
- **fallback**：`prefers-reduced-motion` → 全部直接到位；無 WAAPI → 直接換位（資訊零損失）。

### 12.4 效能預算（本輪實測）

單頁大小：index 約 99KB、bricks 約 64KB、plaque 約 68KB、visit 約 62KB（全部 inline，皆 <350KB）。首屏 JS：引擎與窯圖著色 <5ms（封面字在建置時預排）。主要動畫只動 `transform`／`translate`／`opacity` 與一個註冊自訂屬性；花邊 paint 僅在鎖版的 950ms 內逐幀重跑。

### 12.5 查證來源

- caniuse〈CSS Painting API〉https://caniuse.com/css-paint-api（2026-10 查詢）；W3C〈CSS Painting API Level 1〉https://www.w3.org/TR/css-paint-api-1/；web.dev〈Cross-browser paint worklets and Houdini.how〉
- Wikipedia〈Wendingen〉（1918–1932、Wijdeveld、116 期、各期封面設計者）；Ubu Gallery〈Wendingen: Dutch Design, 1918–1932〉新聞稿 2001（33 cm 正方、榻榻米雙正方、和紙、草繩和裝、首期 650 本）
- Art Institute of Chicago 典藏 Wijdeveld〈Architectuur / Frank Lloyd Wright〉1931 說明（以印刷黃銅條拼字母與幾何花飾、Wendingen Style）；Cooper Hewitt〈Hendricus Theodorus Wijdeveld: Letterpress Printing〉2015
- Wikipedia〈Hoffmann kiln〉與 Ziegeleipark Mildenberg〈Friedrich Hoffmann memorial exhibition〉（1858 環窯專利、12–24 室）；Spectral Codex〈Taiwan Brick Industry〉（TR 煉瓦、八卦窯）
- Paul Lewis〈FLIP Your Animations〉aerotwist 2015
