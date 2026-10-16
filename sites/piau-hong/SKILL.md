---
name: designers-republic-sheffield-corporate
description: The Designers Republic™ Sheffield style (1986–2009; Warp Records sleeves, Wipeout 1995) — deadpan faux-corporate over-branding where every noun carries a ™ and a product code, katakana used as graphic texture beside English capitals, flat zero-stroke vector pictograms and sinister-cute mascots, a strict limited palette of mid grey, black and one signal colour with hard edges and no gradients, and a dense modular box grid decorated with hazard stripes, arrows, barcodes and registration marks.
---

# The Designers Republic™ 雪菲爾企業偽品牌風

> 範例站：飆風研究所 PIAU-HONG R&D™（新竹四驅車店）。本規格不綁定產業：任何「可以被當成一家公司來包裝」的題材都適用——唱片行、電競、模型、手搖飲、科技展、甚至一間洗衣店。

## 1. 設計哲學

1986 年 7 月 14 日，Ian Anderson（與 Nick Phillips）在英國雪菲爾宣布成立 The Designers Republic™，把自己的城市叫做「SoYo™ North of Nowhere™」。工作室替北方樂團做唱片封套起家，替 Warp Records 做出地球標誌與「Warp 紫」，1995 年替 Psygnosis 的 PlayStation 首發遊戲 Wipeout 做了每一支虛構車隊的品牌、選單與包裝。Anderson 自述的影響：Blade Runner、普普藝術、日本流行文化、俄國構成主義、具體藝術、消費主義。

這個風格的核心是一個玩笑，但它講得一本正經：**把一切當成一家跨國企業的產品線來包裝**。字是品牌、編號是裝飾、片假名是紋理、吉祥物看起來友善又有點不安。它不是 Y2K 的鉻與發光、不是瑞士風的客觀中立、也不是新粗獷的反設計——它是一份過度設計的公司視覺識別手冊，套在一件很小、很日常的東西上。

三條原則：
1. **一切都是產品**：每個名詞、每個頁面、每個按鈕都可以有型號和 ™。
2. **平、硬、少**：平塗色塊、零漸層、零模糊陰影、色票極少。唯一允許的「陰影」是位移的實色塊（`box-shadow: 5px 5px 0 #0E0F11`）。
3. **資訊即裝飾**：條碼、對位記號、警示斜紋、箭頭、編號列不是功能說明，而是版面的節奏。

## 2. 色彩系統

| 角色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 灰 Grey | `#A9ACA6` | 頁面底色（PlayStation 中間灰） | ~45% |
| 淺灰 Grey-L | `#C4C6C1` | 次要底、賽道內場、圖示底 | ~8% |
| 深灰 Grey-D | `#8E918B` | 停用、借用件、賽道外框 | ~4% |
| 墨 Ink | `#0E0F11` | 字、粗分隔、深色模組、按鈕 | ~28% |
| 信號橘 Signal | `#FF5000` | 唯一主強調：貼紙、當前、超稀有、首要按鈕 | ~10% |
| 青 Cyan | `#19B5E8` | 次強調：稀有、焦點框、「你」的那一列 | ~3% |
| 紙白 Paper | `#F6F6F2` | 紙籤、表單、計時單 | ~2–8% |

規則：同一視口最多「灰＋墨＋一個信號色＋一個次色」。換產業時可換信號色（Warp 紫 `#6B2FBF`、毒綠 `#9BE000`），但**永遠只有一個**主信號色，底色永遠是中間灰或紙白而不是黑。

## 3. 字體系統

- **Display（拉丁）**：Michroma（Google Fonts，Eurostile 系寬體方圓字），全大寫、字距 .02–.14em。用於型號、數字、按鈕、標頭。
- **CJK／片假名**：Noto Sans TC 900（含假名），標題字距 -.03 至 -.04em；片假名一律 900 粗、常直排。
- **內文與小字**：Archivo 400/700。小字標籤 9–10px、700、字距 .12–.2em、全大寫。
- 字級 scale：9（標籤）／12／14–15（內文）／21（模組標題）／30–62（頁標）／clamp(30px,6.5vw,96px)（海報標語）。
- 行高：標題 .92–1.15；內文 1.5。
- **™ 的排法**：`.tm{font-size:.5em;vertical-align:.9em;margin-left:.08em}`——上標、半大、緊貼。

## 4. 版面與網格

- 12 欄 `grid-template-columns:repeat(12,minmax(0,1fr))`，**零 gap**：模組以 1px 墨線分格，區塊之間 4px 墨線。
- 每個資訊模組 `.mod` 佔 3／4／6／8／12 欄、`grid-row: span 4` 並用 **subgrid**：型號列／標題／內文／底列四條線橫向對齊——這就是 tDR 的「規格表」感。
- 不旋轉版面；只有「貼紙」允許 -3° 至 -4°。
- 頁首是**長條品牌帶**：左墨底 logo、中間循環 logo 壁紙、右側狀態格（時鐘、營業、聲音開關）。
- 右側（或手機底部）固定貼紙導覽；頁面內容右側讓出 84px。
- 留白不靠空，而靠灰底大面積與 4px 黑線。

## 5. 元件配方

**頁標貼紙**（當前頁的導覽貼紙「撕下來」落在這裡）：
```css
.stk{background:#FF5000;color:#0E0F11;padding:10px 16px 12px;border-radius:14px;transform:rotate(-3deg);box-shadow:5px 5px 0 #0E0F11;font:400 30px/1 "Michroma"}
```
**模組**：
```css
.mod{grid-column:span 3;grid-row:span 4;display:grid;grid-template-rows:subgrid;border-right:1px solid #0E0F11;border-bottom:1px solid #0E0F11;padding:0 16px}
.mod .code{display:flex;justify-content:space-between;border-bottom:1px solid;font:700 10px/1.2 Archivo;letter-spacing:.14em;text-transform:uppercase}
```
**按鈕**：全圓角膠囊，墨底白字，hover 直接換成信號橘＋墨字（無過渡曲線花招，.12s）。
```css
.btn{border-radius:999px;background:#0E0F11;color:#F6F6F2;font:400 13px/1 Michroma;padding:13px 18px 12px;text-transform:uppercase}
.btn:hover{background:#FF5000;color:#0E0F11}
```
**貼紙導覽**：紙白底片上 4 張圓角貼紙（各一色），hover 時以右上角為軸翹起 -7°；當前頁那張只剩虛線刀模框。
**表單**：紙白底、只有 3px 底線、聚焦底線變信號橘；選項用膠囊切換鈕，選中＝墨底橘字。
**計時單／收據**：紙白卡、3px 墨框、7px 實色位移陰影、墨色頁首列放單號。
**頁尾**：墨底四欄，欄標用 Michroma 橘字，最後一行是自嘲標語（「MADE IN HSINCHU, NORTH OF NOWHERE™」）。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 本站實作 | 觸發 | 時長／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient | 頁首 logo 壁紙以 `steps(6)` 一格一格平移；展示車在賽道上無限循環；吉祥物眨眼 | 自動 | 4.8s steps(6)；11–14s linear；3.6s steps(1) | 全部停止，展示車停在橋上／橋下各一格 |
| input | 戳孔按下縮到 .86、放開破孔＋紙籤 clip-path 展開；貼紙 hover 翹角；型錄卡 hover 反色 | pointer／鍵盤 | 80ms；320ms cubic-bezier(.2,.9,.3,1.2)；160ms | 無位移，狀態直接改變，aria-live 播報 |
| transition | 換頁時橘黑警示斜紋以 clip-path 由右掃入、新頁由左掃出；型錄篩選 FLIP | 點連結／篩選 | 360–420ms cubic-bezier(.7,0,.3,1)；340ms | 直接換頁、直接顯示 |
| signature | 你組的車沿 `offset-path` 跑兩圈，第一圈爬上換道橋（z 層翻到橋面之上、放大 1.22、位移陰影），第二圈從橋面底下穿過；過猛則在橋出口沿切線旋轉飛出 | 「上賽道」 | 時長＝計時秒數×620ms linear；飛出 1.1s | 不跑動畫，直接出計時單（同一組數值） |

## 7. 插畫與圖像風格（faux-corp-pictogram）

- 只用**圓角矩形、圓、多邊形**三種原語；**零描邊**（例外：白色物件需要 2px 墨邊才看得到）、零漸層。
- 每個圖示放在 48×48 viewBox；稀有度用信號色表達（標準＝深灰、稀有＝青、超稀有＝橘）。
- 吉祥物：方頭或圓頭、兩眼不對稱（一眼眨、一眼瞪）、眉毛斜 8°——友善但有點不安。
- 圖示可以重複排成壁紙（logo wall），重複本身就是語彙。
- 地圖、賽道也是象形：路是粗黑條、水是青條、地標是灰塊加中文字。

## 8. Logo 與 Favicon

- Mark：40×40 信號橘圓角方（rx 10）＋墨色雙段速度箭頭＋一隻白眼（瞳孔偏右，看向前方）＋一條青色小條。
- Lockup：墨色方塊放 mark、右側 Michroma 品牌名、Noto Sans TC 中文名、底部一條墨條其中 60px 橘色；右上角片假名小字。
- Favicon：同一個 mark 的 inline SVG data URI。

## 9. Do & Don't

**Do**
- 每個名詞後面都可以有 ™；每個模組都要有型號列（`PH-RULE/01`）。
- 片假名當圖形用：直排、大、900 粗。
- 讓功能說明也長得像產品規格（「3 LINES™」「NO RETURN™」）。
- 用位移實色陰影、警示斜紋、條碼、對位圈做節奏。

**Don't**
- 不要鉻、不要發光、不要漸層、不要玻璃擬態——那是 Y2K，不是這個。
- 不要黑底霓虹賽博龐克；底色是中間灰。
- 不要讓 ™ 只出現在 logo；它必須滲進內文。
- 不要用 emoji、不要紫藍漸層、不要置中三卡片、不要「EST. 19xx」徽章、不要 Lorem ipsum。
- 不要把小字型號做成等寬 mono 讀數＋量表——那會滑向工程製圖；這裡的型號是品牌，不是量測。

## 10. 頁面骨架範例

```html
<header class="mast">
  <a class="mk" href="index.html"><svg viewBox="0 0 40 40">…mark…</svg><span><b>BRAND R&amp;D<span class="tm">™</span></b><small>中文名 · カタカナ</small></span></a>
  <div class="wall" aria-hidden="true"></div>
  <div class="stat"><div class="open"><span class="code">CITY</span><b>18:40</b></div><button class="snd" aria-pressed="true">SOUND™ <b>ON</b></button></div>
</header>
<section class="ptitle"><span class="stk">02 PARTS™<small>型錄</small></span><h1><span class="disp">CATALOGUE™ VOL.26</span>每一顆零件<br>都有型號。</h1><span class="vk">パーツ・カタログ</span></section>
<section class="grid">
  <article class="mod"><div class="code"><span>PH-RULE/01</span><span>3 LINES™</span></div><h3><span class="disp">HOW TO</span>標題</h3><p>內文</p><div class="ft"><span>底列</span><span class="bar"></span></div></article>
  <!-- 3 more .mod; .mod.ink / .mod.org 換底色 -->
</section>
<nav class="decals"><a href="index.html"><i class="s"></i><span class="n">01</span><span class="l">首頁</span></a>…</nav>
<div class="wipe hz" id="wipe"><span>LOADING™</span></div>
```

## 11. 本風格的 5 個不可省略特徵

### ① ™ 與型號氾濫（拿掉它，就只是一個灰色的網站）
每個名詞都是一個品牌、每個區塊都有產品編號。
```css
.tm{font-size:.5em;vertical-align:.9em;margin-left:.08em;font-weight:700}
.code{font:700 10px/1.2 Archivo,sans-serif;letter-spacing:.14em;text-transform:uppercase}
```
```html
<h3>超速馬達<span class="tm">™</span></h3><div class="code"><span>PH-M3/X</span><span>MOTOR™</span></div>
```

### ② 片假名當紋理（拿掉它，就少了那份「同但不同」的異國企業感）
片假名不是翻譯，是圖形：直排、黑底橘字、900 粗。
```css
.kv{writing-mode:vertical-rl;background:#0E0F11;color:#FF5000;font:900 19px/1 "Noto Sans TC";padding:12px 9px;letter-spacing:.06em}
```
```html
<div class="kv">ツンツン・パーツ</div>
```

### ③ 零描邊平面象形＋不安的吉祥物（拿掉它，就是一般的扁平 icon）
```svg
<svg viewBox="0 0 96 96"><rect width="96" height="96" rx="22" fill="#FF5000"/><rect x="18" y="22" width="60" height="50" rx="8" fill="#0E0F11"/>
<circle cx="35" cy="44" r="8" fill="#F6F6F2"/><circle cx="61" cy="44" r="8" fill="#F6F6F2"/><circle cx="37" cy="44" r="3.5" fill="#0E0F11"/><circle cx="63" cy="44" r="3.5" fill="#0E0F11"/><rect x="34" y="58" width="28" height="4" fill="#19B5E8"/></svg>
```

### ④ 中間灰＋墨＋單一信號色，硬邊零漸層（拿掉它，就會滑向 Y2K 或賽博龐克）
```css
:root{--grey:#A9ACA6;--ink:#0E0F11;--org:#FF5000;--cyan:#19B5E8;--paper:#F6F6F2}
body{background:var(--grey);color:var(--ink)}
.stk{background:var(--org);box-shadow:5px 5px 0 var(--ink)} /* 唯一的「陰影」是實色位移 */
```

### ⑤ 模組方格＋警示斜紋／條碼／對位記號（拿掉它，就沒有「規格書」的節奏）
```css
.grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:0}
.mod{grid-row:span 4;display:grid;grid-template-rows:subgrid;border-right:1px solid #0E0F11;border-bottom:1px solid #0E0F11}
.hz{background:repeating-linear-gradient(-45deg,#0E0F11 0 12px,#FF5000 12px 24px)}
.bar{display:inline-block;height:22px;width:74px;background:repeating-linear-gradient(90deg,#0E0F11 0 2px,transparent 2px 3px,#0E0F11 3px 4px,transparent 4px 7px,#0E0F11 7px 10px,transparent 10px 11px)}
.reg{display:inline-block;width:16px;height:16px;border-radius:50%;border:1.5px solid;background:linear-gradient(currentColor,currentColor) center/1.5px 100% no-repeat,linear-gradient(currentColor,currentColor) center/100% 1.5px no-repeat}
```

## 12. 技術實作與相容性

### (a) 核心技術與查證

| 技術 | 層 | 在本站承載什麼 | 支援現況與查證來源 |
|---|---|---|---|
| **CSS `offset-path: path()`＋`offset-rotate: auto`＋WAAPI 補間 `offsetDistance`** | B 動效 | 簽名動效：車沿 800×380 座標的兩圈閉合路徑行駛、自動轉向；rAF 讀 `animation.currentTime` 判斷是否在換道橋區間以切換 z 層與放大；過猛時暫停於橋出口，以 `getPointAtLength` 取切線角改為絕對定位飛出 | MDN `offset` 與 `offset-rotate`：Baseline Widely available，2022-09 起各瀏覽器皆支援。舞台為固定 800×380 px 的 div 再以 `transform: scale()` 縮放，因此 path() 的 px 座標在任何寬度都正確 |
| **Web Audio 合成（使用者手勢啟動）** | D 輸入感測 | 戳孔的噪音爆破＋方波下滑、紙籤依稀有度變調、起跑三燈嗶聲、車行時鋸齒＋方波雙振盪器馬達聲（上橋時頻率×1.12）、飛出的低頻下墜、換頁的濾波噪音 | MDN Web Audio API：主流瀏覽器長期支援；AudioContext 只在第一次點擊後建立並 `resume()`，符合自動播放政策；頁首 SOUND™ 開關、偏好存 localStorage（try/catch） |
| **CSS Grid `subgrid`** | C 版面 | tDR 規格表感：同一列模組的型號列／標題／內文／底列四條線橫向對齊，不論內文長短 | caniuse css-subgrid：Chrome 117+、Safari 16+、Firefox 71+ 全部支援 |

### (b) Fallback 具體行為

- **不支援 subgrid**：`@supports not (grid-template-rows:subgrid)` 改為 flex column，底列以 `margin-top:auto` 貼底——各模組仍等高，只是內部線不對齊。
- **不支援 offset-path／WAAPI**：車停在起點，計時單照常產生（數值由同一個 `car()` 函式算出，不依賴動畫）。
- **無 Web Audio**：`PH.snd()` 靜默返回，所有回饋仍有視覺與 aria-live 文字。
- **`prefers-reduced-motion`**：logo 壁紙、展示車、眨眼、紙籤展開、貼紙翹角、換頁掃描、FLIP、上賽道動畫全部關閉；戳孔直接揭示並以 aria-live 播報；計時單直接出現；〈賽道日〉兩台展示車靜止在橋上與橋下。
- **無 JS**：`<noscript>` 顯示店內電話與營業資訊；年表、型錄說明、賽程為靜態 HTML。

### (c) 效能實測（建置環境 Node 22／jsdom）

| 頁面 | 檔案大小（含全部 inline） | inline 腳本執行 |
|---|---|---|
| index.html | 約 54 KB | 約 10–21 ms（暖機後 10 ms） |
| track.html | 約 41 KB | < 35 ms（含解析） |
| parts.html | 約 31 KB | < 30 ms（含解析） |
| about.html | 約 28 KB | 約 12–18 ms |

- 全部遠低於 350 KB 與 100 ms 預算；動畫只動 `offset-distance`、`transform`、`clip-path`、`background-position`，不觸發版面重排。
- 換道橋區間判斷每幀只做一次除法與比較；路徑長度與橋段比例在載入時以 `getTotalLength()` 預先計算一次。
