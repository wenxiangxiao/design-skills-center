---
name: vcs-tia-scanline-playfield
description: Atari VCS / TIA "racing the beam" pixel style for the web — every screen image is assembled one scanline at a time from a 40-cell mirrored playfield, exactly one background color and one playfield color per line from the 128-color NTSC palette, wide 160×192 pixels, at most two 8-pixel-wide sprites per line (extras flicker), playfield-resolution score digits and black HMOVE combs, all framed by a woodgrain-and-black-ribbed console with silver toggle switches.
---

# Atari VCS／TIA 掃描線像素風（Racing the Beam）

## 設計哲學

1977 年 9 月上市的 Atari Video Computer System（後稱 2600）只有 128 位元組 RAM，**沒有畫面緩衝區**。顯示晶片 TIA（Television Interface Adapter）一次只知道「這一條掃描線」：一個背景色 COLUBK、一個 playfield 色 COLUPF、20 位元的 playfield（PF0／PF1／PF2，右半鏡像或重複）、兩個 8 位元寬的玩家精靈、兩個飛彈、一顆球。程式必須在電子束掃過每一條線之前把暫存器寫好——Nick Montfort 與 Ian Bogost 在《Racing the Beam》（MIT Press, 2009）把這叫做「追著光束跑」。

這套風格的一切樣貌都是限制長出來的：岸只能左右對稱（River Raid、Combat 的場地）、顏色只能一條一條橫著換（Activision 遊戲的彩虹夕陽與標誌條）、會動的東西只有 8 像素寬、多了就隔格閃爍。**把限制當規格書**——不是「看起來像像素」，而是「每一格都能用那組暫存器寫出來」。

與相鄰流派的分界：

- **8-bit 像素（NES／Famicom）**：有 8×8 圖塊與畫面緩衝、背景可以畫任意圖；本風格背景只有 40 格寬的整欄色塊，沒有圖塊。
- **ZX Spectrum 屬性色格**：8×8 格子內兩色；本風格的色彩單位是「整條掃描線」，不是格子。
- **段碼液晶掌機**：固定段位；本風格是光柵掃描。
- **CRT 磷光**：重點在輝光與餘暉；本風格零發光、零模糊，像素是硬邊的。

## 本風格的 5 個不可省略特徵

拿掉任何一項就不是這個風格了。

### ① 40 格鏡像 playfield

場景（岸、牆、地面、長條）只能由 40 個等寬欄組成，每欄 4 個色鐘（畫面寬的 1/40）。左 20 格由程式指定，右 20 格是左半的**鏡像**（或重複）。要做不對稱，就是在一條線中途重寫暫存器（本站 HUD 與長條圖用這招）。

```js
/* L：20 位元，MSB＝最左格；mode 1＝鏡像 0＝重複 2＝不對稱（R 另給） */
for(c=0;c<40;c++){
  v = c<20 ? L>>(19-c)&1 : mode==2 ? R>>(39-c)&1 : mode==1 ? L>>(c-20)&1 : L>>(39-c)&1;
  px = v ? COLUPF : COLUBK;  /* 一格填 4 個像素 */
}
```

```css
/* 無 JS 的靜態備援：同一套比例 */
.fb{background:linear-gradient(90deg,#5C9C5C 0 25%,#3840B0 25% 75%,#5C9C5C 75%)}
```

### ② 一條掃描線一組顏色

每條線只有一個背景色、一個 playfield 色；顏色只能**垂直地、一條一條**換。所以漸層一律是**階梯**（每 1–8 條線換一階），「你選的那一根長條」不能單獨換色，只能用精靈指著它。零 CSS 漸層、零抗鋸齒、零透明度。

```js
/* 彩虹階梯：同一高度的每根長條必然同色 */
var RB=[0x46,0x36,0x26,0x16,0x1C,0xD6,0xC6,0xB6,0xA6,0x96,0x86];
R.pf = RB[Math.min(10,(120-y)>>3)];
```

### ③ 160×192 寬像素＋NTSC 128 色

畫面固定 160×192，放大成 4:3，所以像素是**寬的**（約 1.6:1）。顏色只能取 NTSC 調色盤 16 色相 × 8 亮度；色值寫成 TIA 的位元組 `$HL`（H＝色相、L＝偶數亮度）。黑白開關（TV TYPE B·W）＝只保留亮度。

```css
canvas{width:100%;aspect-ratio:4/3;image-rendering:pixelated;image-rendering:crisp-edges}
```
```js
cv.width=160;cv.height=192;          /* 不要用 devicePixelRatio 放大 */
hex = P[(b>>4)*8 + ((b&15)>>1)];     /* $84 → #3840B0 */
```

### ④ 8 像素寬的精靈與隔格閃爍

會動的東西只有兩個玩家精靈（每條線一個 8 位元圖樣、一種顏色，可 2×／4× 拉寬）、兩條 1 像素飛彈與一顆球。超過兩個物件就**隔格輪流畫**（閃爍）。船槳是飛彈、船是 GRP0、礁石是 GRP1。

```js
K.RAFT=[0x3C,0x7E,0xDB,0xFF,0xDB,0xFF,0xDB,0xFF,0x7E,0x3C];  /* 俯視橡皮艇 8×10 */
if(!((rk/40)&1)||!(frame&1)) drawGRP1(rock);                  /* 奇數顆隔格閃 */
```

### ⑤ PF 分數字、HMOVE 梳齒與木紋主機

分數用 playfield 解析度的 3×5 大字（左半玩家 0 色、右半玩家 1 色＝score mode）；物件水平移動的那幾條線，左緣出現 8 像素黑色「HMOVE 梳齒」——真機的副作用，保留它。畫面一定裝在主機裡：木紋前板、黑色橫肋、銀色撥桿開關。

```css
.deck{background:repeating-linear-gradient(0deg,#000 0 4px,#1B1916 4px 7px);
  border-top:12px solid;border-image:repeating-linear-gradient(90deg,#5A3A1E 0 9px,#7E5630 9px 12px,#3E2412 12px 13px) 12 0 0 0}
.sw i:after{background:linear-gradient(#F4F4F4 0 30%,#A8A8A8 30% 70%,#7A7A7A 70%)} /* 金屬撥桿：三段硬切，不是柔漸層 */
```
```js
if(R.hm) for(k=0;k<8;k++) B[o+k]=BLACK;   /* HMOVE 梳齒 */
```

## 色彩系統

螢幕內只用 TIA 色值（Stella NTSC 常見版本）。本站用到：

| 色值 | hex | 用途 | 約略比例 |
|---|---|---|---|
| `$00` | #000000 | 背景、HUD 帶、底部招牌帶 | 18% |
| `$84` | #3840B0 | 河水 COLUBK | 35% |
| `$C4`／`$C6`／`$D4` | #407C40／#5C9C5C／#507C38 | 岸，每 16 條世界線換一階 | 30% |
| `$8C`／`$0E` | #90A4EC／#ECECEC | 險灘浪花掃描線 | 4% |
| `$1C` | #E8E85C | 船（GRP0）、左半分數 | 3% |
| `$06` | #909090 | 礁石（GRP1） | 1% |
| `$42`／`$44`／`$26` | #9C2020／#B03C3C／#AC783C | 長虹橋、碼頭 | 2% |
| 彩虹階 `$46 $36 $26 $16 $1C $D6 $C6 $B6 $A6 $96 $86` | | 長條圖與底部標誌條 | 依資料 |

螢幕外（主機與說明書）：木紋 #3E2412／#5A3A1E／#6E4826／#7E5630、黑塑膠 #0B0A09、肋條 #1B1916、銀 #C8C8C8、說明書字 #ECECEC／#B0B0B0、強調黃 #E8E85C。說明書頁頂一條四色帶（紅 #9C2020／橘 #E09470／黃／綠 #5C9C5C）。

## 字體系統

- 螢幕內：**不用任何字型**。數字與英文只用自繪 3×5 點陣（`K.glyph`）：分數字放大到 playfield 格（每格 4 像素寬、每列 2 條線），招牌字以 1 像素寫在底部帶（48 像素六精靈招牌的寬度）。
- 主機與標籤上的「印刷字」：Silkscreen（Google Fonts）給英文標籤與開關名稱、Unbounded 800 給卡匣標籤大字（motion-library 文字元件使用）、JetBrains Mono 600 給計數器。
- 中文：Noto Sans TC 400／700／900。標題 900、clamp(24px,3.4vw,36px)、行高 1.2；內文 16px／1.75；註記 13px。
- 中文永遠不進螢幕——那台機器顯示不了中文，中文住在說明書與卡匣標籤上。

## 版面與網格

- 首屏：螢幕寬 100%（最大約 970px）、4:3、黑色 14px 外框；下接主機前板（開關一列、右側紅色「追光束」鈕）；再下接一條黑底說明列。
- 右側固定 112px 卡匣欄（導覽），≤860px 時變成頂部橫排三卡匣。
- 內容區是「說明書頁」：黑底、上緣四色帶、無圓角、表格以 2px 深灰分隔線。兩欄 1.1fr／1fr，窄螢幕單欄。
- 頁面背景是 70 年代木紋壁板（豎紋＋每 120px 一道板縫）。
- 全站 0 圓角、0 旋轉、0 陰影模糊（唯一陰影是紅鈕 6px 硬實底）。

## 元件配方

- **卡匣導覽**：`a` 為 112×118 黑塑膠，頂部 26px 橫肋（repeating-linear-gradient 0deg），內嵌黑標籤＋上緣 4px 色條；目前頁 `transform:translateX(-10px)`＋右側 10px 黃色實塊＝「插進去了」；hover 上抬 4px，`transition:transform .2s steps(2)`。
- **撥桿開關**：`<button class="sw" aria-pressed>`，內含 22×40 黑槽與 16px 銀色撥桿，`aria-pressed=true` 時撥桿從 top:2px 跳到 18px（steps(2)）。瞬時開關（RESET）用 `:active`。
- **追光束鈕**：紅底 #9C2020、白字 Silkscreen、6px 深紅硬實底，按下時下沉 6px。
- **說明書表格**：`th` 用 Silkscreen 12px 黃字；GAME 號碼欄 Silkscreen 黃字。
- **統計格**：三格 2px 間隔、黑底、數字 Silkscreen 26px 黃。
- **頁尾**：黑底、13px 灰字、粗體品牌名。

## 動效規則

一律「整格」：CSS 動畫全部 `steps()`，JS 動畫照 60fps 格數走，**零 easing 曲線**。

| 類型 | 實作 | 觸發 | 時間 |
|---|---|---|---|
| ambient | 攻擊模式：世界座標每格 +0.45～0.6 線，船以 0.06 追蹤河心；浪花線 `(wy+(f>>2))%5==0` 換 `$8C`／`$0E` | 載入、閒置 5 秒回到 | 連續 |
| input | 鍵盤／游標／Gamepad 每格輪詢，船 x ±1.6 px/格、游標 0.25 追蹤；預約頁搖桿 160ms 重複間隔 | 輸入 | 同格 |
| transition | 跨文件 View Transitions：`::view-transition-old(root)` `steps(6)` 收成橫線再收成點；new 由橫線張開；GAME SELECT／RESET 螢幕 `translateY(-100%→0)` `steps(7)` 垂直捲動 | 換頁、換遊戲 | .3s／.34s／.42s |
| signature | 追光束：時間凍結，每格只寫 24 個色鐘，光束後方 3 像素白點，下方黑；`<output>` 列出該線暫存器 | 按住紅鈕／B／搖桿 B | 一條線約 7 格 |

自我限制：不用淡入、不用滑入、不用彈簧；不用 shadowBlur 發光。

**prefers-reduced-motion**：攻擊模式停在一格（輸入仍即時重畫）；追光束改為整格畫好並把第 150 條線標白、列出暫存器；轉場關閉；motion-library 背景 `seek(.35)`、文字 `seek(1)`。

### motion-library 元件（1.36.0 @ede9bb9e）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| TXT-B-38 | Text Mosaic | index | text「過灘 KUE-THUANN」、primary #E8E85C、secondary #3840B0、bg #000、duration 1.6、loop:false、seed 1986、16:9 | 卡匣標籤店名從大方塊（≈playfield 解析度）解析成印刷字——螢幕像素到標籤印刷的橋；只用 drawImage 最近鄰放大，零圓角零發光；黑底得近白字（transition） |
| BG-B-37 | Minimal Stripes | index | primary #5C9C5C、secondary #3840B0、bg #000、duration 6、density 2.2、seed 22，60px 高條帶裁切 | 岸綠／河藍整欄直條平移，像 playfield 一整欄一整欄的色塊；純 fillRect（ambient） |
| TXT-A-29 | Counter | book | text「{價錢} 元」、primary #E8E85C、secondary #3840B0、bg #000、duration .9、seed＝人數 | 價錢像分數從 0 數上來；每次改選項重新掛載（input） |
| SHP-32 | Stairs Rise | book | primary #9C2020、secondary #E8E85C、bg #000、duration 2.4、loop | 七根由紅到黃的實心階梯條＝Activision 式彩虹階；純 fillRect（ambient） |
| TXT-B-27 | Pixel Dissolve | river | text「22 KM・23 灘」、primary #E8E85C、secondary #3840B0、bg #000、duration 1.5、loop:false、seed 23 | 標題以方格逐格溶出，邊緣格子是 primary 黃——方格就是寬像素（transition） |

掛載用站內 `K.ml()`：等 `document.fonts.ready`、離屏 `destroy()`、canvas `aria-hidden`、容器內保留 `.ml-fb` HTML 標題。重現參數可用 `MotionLib.prompt(id)` 查原始開發 prompt。被淘汰：BG-B-18 Horizontal Lines（柔漸層與 blur 濾鏡違反②）、TXT-A-31 LED（shadowBlur 發光）、BG-A-33 Retro Sunrise（平滑漸層）。

## 插畫與圖像風格

全站零圖檔（logo.svg 除外）。所有圖像都是 TIA 核心逐線算出來的：河岸＝value noise 決定半寬（6–17 格）、沙洲＝中央對稱 PF 位元、險灘＝浪花線＋礁石精靈、碼頭與長虹橋＝整列 PF 位元的橫帶。要畫新東西，先問「這一條線的暫存器寫得出來嗎？」。

## Logo 與 Favicon 設計指南

- Logo：左方 100×100 是一格「螢幕」：上下黑帶、綠岸、鏡像河道一階一階變寬變窄、一條白浪花線、一艘 20×26 的黃色方塊船、左緣黑色 HMOVE 梳齒；右方「過灘泛舟」900 字、Silkscreen KUE-THUANN、四色小色條。`shape-rendering:crispEdges`。
- Favicon：16×12 的 SVG data URI——綠底、中間藍河、黃色船，三個 rect。

## Do & Don't

- Do：每一條線先想暫存器；顏色寫成 `$HL`；長條用彩虹階；要標示選取就用精靈指，而不是換色。
- Do：中文住在說明書與標籤上；主機開關用真正的 `<button aria-pressed>`。
- Don't：螢幕內放任何字型、漸層、透明、圓角、發光、斜線、旋轉。
- Don't：同一條線出現第三種背景色；同一條線超過兩個精靈而不閃爍。
- Don't：用任何遊戲公司的標誌、角色、卡匣圖；只借硬體規則。
- 去AI化：禁紫藍漸層、置中三卡片、emoji icon、Lorem ipsum、EST. 徽章；文案從產業長出來（黑板、口令、水位）。

## 頁面骨架範例

```html
<nav class="carts"><a href="index.html" aria-current="page"><span class="px">GAME 1<b>河</b></span></a>…</nav>
<div class="wrap">
 <section class="tv"><canvas id="scr" role="img" aria-label="…"></canvas>
  <div class="fb"><h1>無 JS 時看到的標題</h1></div><output id="regs"></output></section>
 <div class="deck" role="group" aria-label="主機開關">
  <button class="sw" id="tvtype" aria-pressed="false"><i></i>TV TYPE<b>COLOR</b></button>
  <button class="sw" id="gsel"><i></i>GAME SELECT<b>GAME 1</b></button>
  <button class="beamb" id="beam">按住・追光束</button></div>
 <section class="man"><h2><span class="px">TODAY</span>今日水情</h2>…</section>
</div>
<script>/* K.screen(canvas, scene) — scene.line(y,S,R) 只寫 R.bk R.pf R.L R.mode R.g0 R.x0 R.c0 R.hm */</script>
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況（查證） | fallback |
|---|---|---|---|---|
| Canvas 2D `ImageData`＋`Uint32Array` 逐線核心 | A 渲染 | 特徵①–⑤全部：每格 192 次 `line(y)`，寫 160 個 32 位元像素，一次 `putImageData` | Canvas 2D 與 ImageData 為 Baseline 長期支援；TIA 暫存器語意查證：PF 20 位元、PF0/PF1/PF2 = 4/8/8 位元、右半鏡像或重複由 CTRLPF bit0 決定、PF0 與 PF2 位元序反向（AtariAge Session 13、hemulator TIA reference、Atari Archives《Programming the 2600》） | 無 canvas／無 JS：`.fb` 以 CSS 硬切 linear-gradient 畫出岸–河–岸三欄＋HTML 標題，所有資訊都在 HTML |
| Gamepad API（`navigator.getGamepads()` 每格輪詢）＋鍵盤 | D 輸入 | 掌舵、預約的日期／人數、FIRE、B 鈕追光束、START 重來；`gamepadconnected` 顯示已接上 | MDN：Baseline widely available（2017 起）；Firefox 81 起限 secure context（GitHub Pages 為 HTTPS） | 方向鍵／WASD／Space／B；游標；所有開關都是按鈕 |
| CSS `steps()` 逐格動效＋跨文件 View Transitions | B 動效 | 所有 CSS 動態量化成整格（開關、卡匣、螢幕捲動、關機收線） | `@view-transition{navigation:auto}`：Chrome 126+、Safari 18.2+；Firefox 部分／未支援（caniuse、web-features explorer、Chrome for Developers） | 不支援時直接換頁；reduced-motion 時 `navigation:none` |

效能實測（node，300 格完整重畫）：31ms，約 **0.1ms／格**；首屏 JS（核心＋場景）<5ms，motion-library 子集載入除外。同一畫面同時運轉的 motion-library 元件 ≤2。單頁 310–315KB（含約 282KB 元件子集）≤350KB。螢幕離屏時 IntersectionObserver 停 rAF。
