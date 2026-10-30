---
name: braun-functionalism
description: Braun functionalism (Dieter Rams / Dietrich Lubs, 1955–1995) for the web — neutral housing with colour reserved for function, round controls, perforated speaker grilles, small grotesk labels set beside each control, orthogonal function zones with zero ornament.
---

# 博朗功能主義 Braun Functionalism・Dieter Rams「少，但更好」

## 設計哲學

1955 年 Dieter Rams 進入法蘭克福的 Braun，與同年起合作的 Hans Gugelot（烏爾姆造形學院）一起把家電改成「設備」：1956 年的 SK 4 收音唱盤（Rams＋Gugelot，因為壓克力上蓋被叫成「白雪公主的棺材」），之後的 T 3 口袋收音機、1971 年與 Dietrich Lubs 合作的鬧鐘、1987 年同樣與 Lubs 合作的 ET 66 計算機（V&A 藏）。Rams 把方法寫成十條「好設計」，最後一條是「好的設計是盡可能少的設計」，口號是 *Weniger, aber besser*——少，但更好。

這些物件的長相來自三個限制：①**射出成型與烤漆鋼板**只做得出平整的面、一致的小圓角與打孔；②**一個功能一個控制件**——開關、旋鈕、按鍵各自長在自己的功能區裡；③**顏色是資訊**——機身永遠是灰白、淺灰或炭灰，綠色只代表「開／可以」，橘紅只代表「注意／鈴」；Braun 的鐘常以一根黃色秒針標出畫面上唯一會動的東西。拿到網頁上：頁面是機殼，區塊是功能區，按鈕真的長得像按鍵，裝飾一律不存在。

本規格書以「睏一下」午睡站示範：首頁是一台機器的正面（時鐘＋12 艙指示燈＋孔陣喇叭），預約頁是一個起床鈴撥盤，說明頁是一本產品使用說明書。

## 本風格的 5 個不可省略特徵

### ① 中性機身，顏色只給功能

機身只有三種中性：灰白、淺灰、炭灰。顏色只出現在有功能的地方，而且每種顏色只代表一件事：綠＝開／空著／確認、橘＝鈴／呼叫／主要動作、黃＝秒針（只有秒針）。一個畫面裡的彩色面積 ≤ 5%。拿掉這條，它就變成一般的極簡風。

```css
:root{
  --body:#ECEAE4; --body2:#E2E0D9; --seam:#CFCCC4;   /* 機殼：灰白、淺灰、分模線 */
  --panel:#2B2B29; --panel2:#3A3A37;                  /* 炭灰面板 */
  --ink:#161615; --mid:#7D7B75;                       /* 字 */
  --green:#3E9B4F;  /* 只用於：開、空著、確認 */
  --orange:#E8601C; /* 只用於：鈴、呼叫、主要動作 */
  --yellow:#F2C230; /* 只用於：秒針 */
}
```

### ② 打孔的孔陣

揚聲器格柵是這個風格最強的辨識物：等距圓孔，排成方陣或同心環。它在本站同時是喇叭、背景紋理與聲音的顯示器。靜態版就是一行 CSS：

```css
.grille{aspect-ratio:1;border-radius:50%;
  background:radial-gradient(circle,#2F2F2C 0 34%,transparent 36%) 50% 50%/11px 11px,#E2E0D9}
```

同心環版（T 3 式）用 Canvas 畫：第 i 環半徑 i×pitch、孔數 round(2π·i)，奇數環錯開半個孔位。

### ③ 圓形控制件語彙

所有可操作的東西都長得像控制件：凸圓鍵、旋鈕、撥盤、滑動開關、長方鍵。按下＝往下 1px＋顏色變深；被選住的鍵留在按下位置。**只有一道 1px 鍵緣**，沒有柔軟投影（這是與 Neumorphism 的分界）。

```css
.rk{width:52px;height:52px;border-radius:50%;background:#E2E0D9;border:1px solid #CFCCC4;
  box-shadow:inset 0 1px 0 #FBFAF7;transition:transform .08s,background-color .08s}
.rk:active,.rk[aria-pressed="true"]{transform:translateY(1px);background:#D3D0C8}
.rk.or{background:#E8601C;border-color:#C94F14;color:#fff}   /* 唯一的橘色鍵 */
.sw input{appearance:none;width:40px;height:20px;border-radius:10px;background:#C9C6BE}
.sw input:checked{background:#3E9B4F}                          /* 開＝綠 */
```

### ④ 小號 grotesk 標籤，貼在控制件旁

字只有三階：標題（粗、緊）、內文、11px 標籤。標籤用小寫拉丁＋中文，左齊，緊貼它說明的那個控制件——在網頁上用 CSS anchor positioning 把標籤綁在控制件上。

```css
.lbl{font:500 11px/1.4 "Hanken Grotesk","Noto Sans TC",sans-serif;letter-spacing:.06em;color:#7D7B75;text-transform:lowercase}
.knob{anchor-name:--knob}
.note{position:absolute;position-anchor:--knob;position-area:right;margin-left:8px;
  position-try-fallbacks:flip-inline}
```

### ⑤ 正交功能分區，零裝飾

版面是一塊機殼被 1px 分模線切成功能區：每一區一件事（看時間、看空艙、聽聲音、付錢）。統一的小圓角（面板 14px、鍵 4px、圓鍵 50%），零陰影、零漸層裝飾、零插畫邊框、零斜角。

```css
.housing{background:#ECEAE4;border:1px solid #CFCCC4;border-radius:14px;overflow:hidden;
  display:grid;grid-template-columns:5fr 7fr}
.zone{padding:24px}
.zone+.zone{border-top:1px solid #CFCCC4}
.panel{background:#2B2B29;color:#ECEAE4}
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 機殼灰白 | `#ECEAE4` | 頁面地、機殼 | ~50% |
| 淺灰 | `#E2E0D9` | 鍵、格柵底、第二層面 | ~12% |
| 分模線 | `#CFCCC4` | 1px 分區線、鍵緣 | 線 |
| 炭灰 | `#2B2B29` | 時鐘面板、價目計算機、資訊帶 | ~25% |
| 炭灰 2 | `#3A3A37` | 深色鍵、深色格柵 | ~3% |
| 墨 | `#161615` | 字、指針 | ~6% |
| 綠 | `#3E9B4F` | 空艙燈、開關開、確認 | ≤2% |
| 橘 | `#E8601C` | 起床鈴指針、呼叫鍵、主要按鈕 | ≤2% |
| 黃 | `#F2C230` | 秒針（唯一） | <0.5% |
| 顯示窗 | `#CFCDC5` | 計算機／時間窗的液晶底 | ~1% |

規則：綠橘黃不得做大面積底色；不得出現任何彩色的淡版（唯一例外：撥盤上表示所選長度的扇形 `#F4D6C4`，它是橘色指針掃過的範圍，屬於功能）。

## 字體系統

- 拉丁與數字：**Hanken Grotesk**（Google Fonts，400/500/600/700）——取 Akzidenz-Grotesk 一脈的中性 grotesk 氣質；全站 `font-feature-settings:"tnum"` 等寬數字。
- 中文：**Noto Sans TC**（400/500/700/800）。
- Scale：h1 `clamp(46px,6.4vw,84px)`／700／`letter-spacing:-.035em`／行高 .95；h2 `clamp(24px,3vw,34px)`／700；h3 17px／700；內文 15–16px／400／1.55；標籤 11px／500／`.06em`。
- 字只有三階，不用斜體、不用襯線、不用 mono（mono 會把畫面推向工程製圖）。

## 版面與網格

- 外框 `max-width:1240px`，側邊 `clamp(16px,3vw,40px)`。
- 首屏是一塊機殼：`grid-template-columns:5fr 7fr`，左炭灰面板（時鐘）、右三個功能區（品牌、12 艙、聲音）以 1px 分模線疊起來。
- 所有區塊直角排列，零旋轉；區塊間距 64px，區內 padding 16–28px。
- ≤960px 機殼變單欄；≤560px 艙燈 4 欄、導覽三鍵等分。

## 元件配方

- **導覽（互鎖按鍵排 latching-keys）**：三顆長方鍵排成一列，像錄音座的互鎖鍵——現用頁那一鍵被鎖在按下位置（`translateY(3px)`、較深底、上緣暗線），鍵頂的小燈變綠；按其他鍵時上一顆彈起。
- **主要按鈕**：長方鍵 `.bk.or`（橘）只出現一次／畫面；次要按鈕 `.bk`（淺灰）。
- **圓鍵** `.rk`：52px；`.dk` 深色、`.or` 橘、`.gr` 綠；`aria-pressed` 表示鎖住。
- **卡片**：不存在。資訊放在功能區裡，區與區只用 1px 分模線分開。
- **表單**：滑動開關 `.sw`（灰→綠）、四擋撥盤（role="slider"）、時段長方鍵組。
- **顯示窗**：`#CFCDC5` 底、墨字、右對齊大數字、左上 11px 標籤——計算機與時間窗共用。
- **頁尾**：四欄（店名地址／營業／預約／頁面）＋一列細字免責。

## 動效規則

動作只來自機構：轉動、按下、滑動、打開快門。沒有彈跳登場、沒有淡入堆疊、沒有發光。

| 種類 | 本站實作 | 觸發 | 時間與 easing | reduced-motion |
|---|---|---|---|---|
| ambient | 時鐘黃色秒針一圈 60 秒連續掃動（`@property --s` 動畫，以真實秒數負延遲對齊）；孔陣每分鐘 6 次的靜息呼吸 | 無 | `60s linear infinite`；呼吸 10s 正弦 | 秒針停在當下秒數；孔陣靜止，狀態用文字 |
| input | 起床鈴撥盤：拖曳橘色指針只停四個擋位，`@property --a` 帶一點過衝回彈，同時發出「喀」；按鍵按下 1px；燈旋鈕轉 60° | pointer／方向鍵／點擊 | `.24s cubic-bezier(.3,1.5,.45,1)`；鍵 `.08s` | 直接到位，無過衝 |
| transition | 換頁＝投影機換片快門：上下兩片炭灰合起（.26s）→換頁→打開（.42s），中央橘點；預約確認時預約單往下展開（clip-path） | 站內連結、確認鍵 | `cubic-bezier(.7,0,.3,1)`／`(.6,0,.2,1)` | 不播快門，直接換頁 |
| signature | **孔陣即顯示 grille-as-display**：聲音只從孔裡看得見——同心環孔陣的每一環對應一段頻帶（內低外高），孔的口徑依 AnalyserNode 的能量張開 | 按聲音鍵、起床鈴 | 每幀；`smoothingTimeConstant .78` | 孔陣靜止，旁邊文字寫「正在播放：粉紅雜訊」 |

自我限制：本風格禁用 `box-shadow` 模糊、`filter: blur`、`text-shadow`、淡入堆疊與 hover 浮起。

### motion-library 元件表（motion-library 1.25.3 @183aafe）

子集由 `node tools/ml-embed.js <ml>/src/motion-lib.js BG-A-10,TXT-A-28,BG-B-21,SHP-34,TXT-A-02 183aafe` 產生（約 226KB，三頁共用），inline 為每頁第一個 `<script>`；`tools/ml-smoke.js` smoke ok。prompt 出處：`MotionLib.prompt(id)`。掛載包裝 `KH.ml`：等 `document.fonts.ready`、離屏 `destroy()`、一次性元件 `loop:false` 只播一次、canvas `aria-hidden`、容器保留 `.ml-fb` 標題。元件的字型（Unbounded）刻意不載入，退回 Noto Sans TC，避免寬體展示字打壞 grotesk 字感。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 角色 |
|---|---|---|---|---|---|
| 首頁 | BG-A-10 | Dot Matrix | primary `#3F3F3B`／secondary `#E8601C`／bg `#2B2B29`；duration 10；density 1.4；intensity .8；seed 20；16:9 | 〈為什麼是二十分鐘〉炭灰帶的底紋：同心正弦的點陣像一整面喇叭網在慢慢呼吸。只有圓點、零發光，點色是炭灰上的深一階灰，不搶顏色規則 | ambient |
| 首頁 | TXT-A-28 | Slot | primary `#E8601C`／secondary `#2B2B29`／bg `#ECEAE4`；duration 1.6；loop false；seed 4；16:9 | 價目標題「20 · 30 · 45 · 90」像計數器滾輪一樣滾到定位——四個長度就是本店唯一的四個擋位；亮底自動得到近黑字 | transition（一次） |
| 預約 | SHP-34 | Circle Draw | primary `#3E9B4F`／secondary `#E8601C`／bg `#F6F5F1`；duration 1.2；loop false；seed 7；1:1 | 按下確認後在預約單上畫一圈綠——綠＝確認，圓＝鐘面；元件的細格線很淡，與機殼紙白一致 | transition（一次） |
| 預約 | BG-B-21 | Ripple Rings | primary `#E8601C`／secondary `#2B2B29`／bg `#F6F5F1`；duration 3.2；density .7；intensity .8；seed 13；16:9 | 預約單上「起床鈴 13:35」底下的同心波：鈴聲往外擴散；橘＝鈴，正好是本色規 | ambient |
| 說明書 | TXT-A-02 | Letter Sequence | primary `#E8601C`／secondary `#2B2B29`／bg `#ECEAE4`；duration 1.4；loop false；seed 2；16:9 | 「使用說明書」逐字由下升起定位，像說明書封面印字；零旋轉零彈跳，合乎機構式動作 | transition（一次） |

讀過原始碼後排除：Rotating Words（`shadowBlur` 投影）、LED（發光點陣）、Sound Wave（漸層長條）。同一畫面同時運轉 ≤2。

## 插畫與圖像風格

**家電面板組件 appliance-face-kit**：全站沒有插畫，只有「零件」——圓、同心環、圓角矩形、打孔、指針。時鐘、撥盤、艙燈、喇叭、旋鈕、呼叫鍵都用 SVG／CSS／Canvas 以平塗做出來，零描邊插畫（說明書步驟小圖也是平塗零件）。示意地圖是平塗的路條與一個綠燈點。

## Logo 與 Favicon 設計指南

Logo 是一顆鐘面：炭灰外圈、灰白面、四個刻度、一根指向「20 分」位置的橘色短針、墨色中心點。字標「睏一下」700、緊字距，副標 11px 小寫標籤。Favicon 用同一個 SVG（data URI）。不得模仿 Braun 的字標（尤其是凸起的 A）。

## Do & Don't

- Do：每一個控制件長得像控制件，標籤貼在它旁邊。
- Do：顏色只給功能；同一種顏色全站只代表一件事。
- Do：用分模線分區，而不是用卡片與陰影。
- Do：數字用等寬（tnum），讀數右對齊。
- Don't：柔軟投影、凸起的同色擠出（那是 Neumorphism）。
- Don't：彩色大面積底、漸層、發光、玻璃擬態。
- Don't：mono 字型、圖號角標、量表（會滑向工程製圖）。
- Don't：紫藍漸層 hero、置中三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- Don't：使用 Braun 的商標、字標或聲稱與 Braun 有關。

## 頁面骨架範例

```html
<header class="wrap"><div class="top">
  <a class="mark" href="index.html"><svg>…</svg><span><b>店名</b><i>小寫副標</i></span></a>
  <nav class="keys"><a href="index.html" aria-current="page">首頁<small>front</small></a><a href="book.html">預約<small>book</small></a></nav>
</div></header>
<section class="wrap"><div class="housing" style="display:grid;grid-template-columns:5fr 7fr">
  <div class="panel zone"><!-- 時鐘或顯示窗 --></div>
  <div>
    <div class="zone"><span class="lbl">status</span><h1>標題</h1><a class="bk or" href="book.html">主要動作</a></div>
    <div class="zone seam-t"><span class="lbl">controls</span><button class="rk" aria-pressed="false">A</button></div>
    <div class="zone seam-t"><div class="grille"></div></div>
  </div>
</div></section>
```

## 技術實作與相容性

**1. AudioContext＋AnalyserNode 驅動孔陣（D 輸入與感測層「AudioContext 分析驅動視覺」）**
- 五種聲音（粉紅：Paul Kellet 濾波；褐：漏積分；電扇：褐雜訊×12.5Hz 葉片調變＋120Hz；冷氣機：低通褐雜訊＋60Hz 市電與 180Hz 諧波；細雨：高通粉紅＋隨機水滴脈衝）全部以 `AudioBuffer` 即時算出 6 秒，尾端 0.25 秒交叉淡化接成無縫 `loop`。訊號鏈：`BufferSource → Gain(0→.32, .6s) → AnalyserNode(fftSize 256, smoothing .78) → destination`。起床鈴是六個正弦音。
- 孔陣每幀 `getByteFrequencyData`，第 i 環取 bin `[60·(i/n)^1.6, 60·((i+1)/n)^1.6)` 的平均，孔半徑 = pitch×(.2＋.24×能量)。
- 支援：Web Audio API 與 `AnalyserNode` 在 MDN 為 Baseline Widely available；需使用者手勢才能啟動（本站只在按聲音鍵時建立 AudioContext）。
- Fallback：無 Web Audio 時按鍵改顯示「這個瀏覽器不支援 Web Audio」，孔陣維持呼吸；無 canvas 時孔陣是 CSS `radial-gradient` 打孔底；無 JS 時同上，資訊不缺。
- 效能：最外 14 環約 660 個孔，一次 `beginPath`＋一次 `fill`，每幀 <1ms；離屏與分頁隱藏時停止 rAF。

**2. CSS anchor positioning（C 版面與樣式層）**
- 用途：首頁 12 艙燈的狀態標籤綁在被指到的那一艙（`position-anchor` 由 JS 換名字，位置由 CSS 算）；預約撥盤的讀數綁在橘色指針尖端；說明書面板的六條引線**兩端都是錨點**——左端 `left:anchor(--k3 right)`、右端 `right:calc(anchor(--pnl right) - 48px)`，說明文字 `top:anchor(--k3 center)`。
- 指針尖端的錨點不用 transform：`.tip{left:calc(50% + sin(var(--a))*37%);top:calc(50% - cos(var(--a))*37%)}`——因為 Firefox／Safari 尚不支援「anchor positioning transforms」，錨點必須是版面位置。
- 支援現況（查證）：Chrome／Edge 125（2024-05）、Safari 26（2025-09）、Firefox 147（2026-01-13）起全面支援，web.dev 列為 2026 年 1 月 Baseline Newly available；子功能「anchor positioning transforms」只有 Chrome 144。來源：web.dev〈New to the web platform in January 2026〉、web-features explorer〈anchor-positioning-transforms〉。
- Fallback：以 `@supports (anchor-name:--x)` 包住；不支援時，艙燈標籤改由 JS 量測 `getBoundingClientRect` 定位、撥盤讀數固定在撥盤中下方、說明書改為面板下方的編號清單（引線隱藏）。

**3. CSS `@property` 型別化角度（B 動效與時間軸層「CSS @property 型別化自訂屬性補間」）**
- `@property --a{syntax:'<angle>';inherits:true}`：撥盤的指針旋轉、選取扇形 `conic-gradient(... 0 var(--a) ...)` 與指針尖端錨點的 `sin()/cos()` 位置都讀同一個 `--a`，只有型別化之後 `transition:--a .24s` 才能讓三者同步補間（帶過衝）。秒針用 `@keyframes sweep{to{--s:360deg}}`。
- 支援：web-features explorer 列為 Baseline Newly available（2024-07-09，Firefox 128 補齊；Chrome 85、Safari 16.4）。Fallback：未註冊時 `--a` 不補間，指針直接跳到擋位，功能不變。

**效能預算實測**：三頁 HTML 各約 264–273KB（含 226KB motion-library 子集與全部 CSS/JS），低於 350KB；首屏 JS 只做時鐘、艙位推算（12 艙×一天約 90 段，<1ms）與孔陣初畫；同一畫面同時運轉的元件 ≤2。
