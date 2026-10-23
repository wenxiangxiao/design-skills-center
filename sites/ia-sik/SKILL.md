---
name: fauvisme-complementary-dab
description: Fauvism (Les Fauves, Paris 1905–08) for the web — unmixed tube colours, shadows painted as the complementary colour, square broad dabs with raw linen showing, broken coloured contours, the open-window composition, and headings written in dabs.
---

# 野獸派 Fauvisme・Les Fauves ── 風格規格書

## 設計哲學

1905 年 10 月 15 日巴黎秋季沙龍開幕，第七室掛著 Matisse、Derain、Vlaminck、Marquet、Manguin、Camoin 的畫。兩天後評論家 Louis Vauxcelles 在《Gil Blas》（1905-10-17）寫下「Donatello chez les fauves」——說室中那尊文藝復興式的半身像（Albert Marque 作）掉進了「野獸」堆裡。這個詞就成了流派名。

同年夏天，Matisse 邀 Derain 到地中海邊的漁港柯利烏爾（Collioure）。兩人在那裡把 Signac 的分色點描放大成方頭寬筆塊、把顏色從物體上拆下來：天可以是黃的，山可以是洋紅，臉的陰影是綠的。Derain 的說法是：「顏色成了一根根炸藥。」（大都會博物館《Vertigo of Color》展覽說明）代表作：Matisse〈Femme au chapeau〉1905（SFMOMA）、〈Portrait de Madame Matisse (La Raie verte)〉1905（哥本哈根國立美術館）、〈Open Window, Collioure〉1905（國家藝廊，華盛頓）；Derain〈Mountains at Collioure〉1905、〈Charing Cross Bridge〉1906；Dufy、Marquet 1906 年在勒阿弗爾畫的國慶旗。

它為什麼長成這樣：鎘系顏料與軟管顏料讓畫家可以把純色直接擠上畫布；他們拒絕學院的明暗法（chiaroscuro）——立體感不靠變暗，而靠兩個互補色的對撞；為了讓顏色彼此不混，筆塊之間留出生畫布；短命的運動（1905–1908），所以它的語法很少、很硬，正好可以寫成規則。

**網頁上的翻譯**：色彩照感覺不照實物；陰影＝亮面色的互補色；所有圖像由方頭筆塊組成且露出亞麻底；文字只住在畫布留白處。

## 本風格的 5 個不可省略特徵

拿掉其中任何一項，就不是野獸派了。

### ① 純色不調和，陰影是互補色（零灰、零黑、零漸層）
九支「顏料管」＋鉛白，不調淡、不混色。陰影永遠是亮面色在色環上的對面：朱紅↔翠綠、鎘橙↔群青、鎘黃↔鈷紫、茜紅↔翡翠綠。連正文都不用黑，用群青墨 `#1B2A6B`。
```css
:root{--cy:#F6C21A;--co:#F07A1A;--vm:#E2391F;--ma:#C8246B;--vi:#7D3FA6;--ul:#2846B4;--ce:#1F8FD1;--vd:#12937A;--em:#45B649;--wh:#F6F0E2;--ink:#1B2A6B}
/* 陰影＝互補色，不是 brightness() */
.hat{background:var(--vm)} .hat .shade{background:var(--vd)}
```
```js
const COMP={cy:'vi',co:'ul',vm:'vd',ma:'em',vi:'cy',ul:'co',ce:'co',vd:'vm',em:'ma',wh:'ul'};
```

### ② 方頭寬筆塊並置，露出生亞麻畫布
每一筆是一個 4 角微抖的方頭四邊形（長 1.15–2.1s、寬 0.6–0.92s），方向沿形狀並被 value noise 擾動；約 7–10% 的格子不下筆，亞麻底 `#EADFC8` 從縫裡露出來。
```js
// 一筆 = 一個四邊形（q 為 8 個 ±12% 的角點抖動）
x.setTransform(cos*k,sin*k,-sin*k,cos*k,X*k,Y*k);
x.beginPath();x.moveTo(-w*(1+q[0]),-h*(1+q[1]));x.lineTo(w*(1+q[2]),-h*(1+q[3]));
x.lineTo(w*(1+q[4]),h*(1+q[5]));x.lineTo(-w*(1+q[6]),h*(1+q[7]));x.fill();
```
```css
body{background-color:#EADFC8;background-image:repeating-linear-gradient(0deg,transparent 0 3px,#DCCDAF99 3px 4px),repeating-linear-gradient(90deg,transparent 0 4px,#DCCDAF77 4px 5px)}
```

### ③ 斷續的彩色粗輪廓
輪廓不是黑線：群青、朱紅、鈷紫，4–9px，虛實長短不一（Matisse 的藍輪廓）。
```js
x.setLineDash([10+r()*44,3+r()*12, ...]);x.lineWidth=5;x.strokeStyle='#2846B4';x.stroke(path);
```
```css
.panel{outline:5px dashed var(--ul);outline-offset:-5px}
```

### ④ 平面化與「敞開的窗」
高地平線、零線性透視、零明暗漸層；畫面用窗框分成室內／窗外兩個色域，帽子（或花盆）放在窗台上。版面上，文字只放在「畫布留白」——筆塊引擎的 block 區域不下筆，留下亞麻底給 DOM 文字。
```js
{d:'M24 70 L182 70 L182 486 L24 486 Z',lit:null,block:true,line:'co'} // 留白給店名
{d:'M232 472 L232 46 L768 46 L768 472',line:'ul',lw:9}                // 窗框只畫線
```

### ⑤ 字也是筆塊
中文標題由同一支筆塊引擎填出字形（字內露白），拉丁字用 Fraunces 軟襯線 `SOFT 100, WONK 1` 斜體——像畫家簽名。無 JS 時退回 Noto Serif TC 900 的純色字。
```html
<h2 class="bt" data-cols="vm,co"><span class="bt-tx">野色五條</span></h2>
```
```css
.lat{font-family:Fraunces,serif;font-variation-settings:"SOFT" 100,"WONK" 1;font-style:italic}
.bt-live .bt-tx{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 生亞麻 | `#EADFC8` | 畫布底、留白、文字底 | 30% |
| 布紋 | `#DCCDAF` | 亞麻線紋（半透明疊在底上） | — |
| 鎘黃 | `#F6C21A` | 天、藺草、按鈕 y | 9% |
| 鎘橙 | `#F07A1A` | 天、窗台、臉亮面 | 9% |
| 朱紅 | `#E2391F` | 帽、牆、強調字 | 9% |
| 茜紅 | `#C8246B` | 右牆、山 | 7% |
| 鈷紫 | `#7D3FA6` | 牆、黃的陰影 | 5% |
| 群青 | `#2846B4` | 輪廓、左牆、頁尾 | 9% |
| 蔚藍 | `#1F8FD1` | 海、鐘形帽 | 4% |
| 翠綠 | `#12937A` | 紅的陰影、藺草、按鈕 g | 8% |
| 翡翠綠 | `#45B649` | 田、葉、茜紅的陰影 | 5% |
| 鉛白 | `#F6F0E2` | 卡片、太陽高光 | 3% |
| 群青墨 | `#1B2A6B` | 正文 | 2% |

規則：相鄰兩塊盡量隔 ≥4 格色環（12 格）；同色不相鄰；不准出現灰、黑、半透明調色、漸層。

## 字體系統

- 中文：Noto Serif TC 500（正文 17px／1.8）、900（標題，或作為筆塊字的字形遮罩）。
- 拉丁：Fraunces（Google Fonts 可變字型，opsz 9–144、wght 400–900、SOFT 0–100、WONK 0–1），一律 `SOFT 100, WONK 1` 斜體，用在副標、目錄號（N° 3）、年份。
- 字級：筆塊大標 clamp(44px,6vw,120px)；小標 22–24px；正文 17px；註記 13–15px。
- 字色：正文群青墨；強調用純色；絕不用黑。

## 版面與網格

- 12 欄不對稱網格（5/7、8/4、4/8），卡片可 ±0.4–1.2° 旋轉。
- 首屏 = 一幅 1000×640 的畫（aspect-ratio），寬 ≤148vh；左右兩面牆的留白各 15.8% 放店名（直排筆塊字）與營業資訊。
- 卡片與色塊用 `clip-path:polygon()` 做微斜的四邊形，不用圓角、不用陰影。
- 段落間距 90–110px；文字段落 ≤40ch。

## 元件配方

- **導覽（顏料管）**：4 支 SVG 顏料管（尾端鋸齒封口、管身、螺旋蓋），管身中段一塊頁色；現用頁那支被擠扁（管身路徑中段內收）且管口擠出一坨顏色。桌機固定右上、≤560px 固定底部。
- **按鈕（筆塊）**：`clip-path:polygon(1% 9%,97% 0,100% 86%,5% 100%)`，hover 換成互補色並 `rotate(-1.6deg) scale(1.04)`。
```css
.dab{--a:var(--vm);--b:var(--vd);background:var(--a);color:var(--wh);clip-path:polygon(1% 9%,97% 0,100% 86%,5% 100%);transition:transform .12s ease-out,background-color .1s}
.dab:hover{background:var(--b);transform:rotate(-1.6deg) scale(1.04)}
```
- **卡片**：鉛白底＋微斜 clip-path；上方是一幅筆塊小畫，下方目錄號（Fraunces 斜體）＋名稱＋價。
- **表單**：輸入框 2px 群青實線、亞麻底，focus 3px 朱紅外框。
- **頁尾**：群青滿版、上緣不規則斜切，字為鉛白與鎘黃。

## 動效規則

| 類型 | 本站實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 窗外的海與地圖上的大甲溪：每 150ms 7% 的筆塊換成同組另一色（海在閃） | 時間 | 150ms tick | 停在第一張，不閃 |
| input | 濕筆抹：游標掃過筆塊標題，半徑 0.55em 內的筆塊轉向游標方向並被帶走，0.88/幀衰減回位 | pointermove | <16ms 回饋 | 不建立 |
| transition | ① 換頁：大筆塊依噪聲方向 380ms 刷滿螢幕，下一頁 460ms 一筆一筆揭掉；② 首頁兩片百葉窗 rotateY 往外打開 1.15s cubic-bezier(.6,.05,.2,1)；③ 上色時該區筆塊 520ms 隨機順序重刷 | 點連結／載入／上色 | 見左 | 直接換頁、不顯示百葉、直接上色 |
| signature | **互補光翻**：每筆帶「亮面色＋互補陰影色」，`dot(法線, 光向)+噪聲 > 門檻` 決定看哪一面；光向預設由臺北時刻決定（06 時從右、12 時從上、18 時從左），游標進畫面即接管，0.22 緩動 | 時刻／游標 | 每幀插值 | 光向直接跳到位，不緩動 |

### motion-library 元件表（1.11.0 @dc24b44，`MotionLib.prompt(id)` 可取得原 Prompt）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| BG-B-37 | Minimal Stripes | index | colors {primary #E2391F, secondary #2846B4, bg #F6F0E2}, duration 6, loop, density 1.8, intensity 1, seed 1906, 16:9（容器 150px 高裁切） | 朱紅／群青直條隨正弦變寬窄，像 Dufy、Marquet 1906 年畫的國慶旗；全不透明純色條，不違反①② |
| TXT-B-26 | Swing Letters | hats | text 'HAT RACK 掛帽架', colors {#F6C21A, #E2391F, bg #12937A}, duration 2.6, loop false, once | 字從一根掛桿上擺盪後停住＝帽子掛上帽架；翠綠底→元件自動給近白字 |
| TXT-A-38 | Marker | hats | text '價目', colors {#2846B4, #F6C21A, bg #EADFC8}, duration 1.4, once | 斜切的一刷鎘黃寬筆從字後掃過＝一筆方頭筆塊；亞麻底→近黑字 |
| TXT-B-34 | Jitter Settle | paint | text 判詞, colors {#E2391F, #2846B4, bg #F6F0E2}, duration 1.6, loop false, seed 1905 | 評審判詞抖動、偶爾閃朱紅後落定——秋季沙龍的騷動；按「交給評審」才掛 |
| BG-A-20 | Diagonal Lines | visit | colors {#F07A1A, #12937A, bg #F6C21A}, duration 8, loop, density 1.2, seed 1936 | 斜向等距粗線＝三角藺帽的斜紋編法，每四條一條翠綠 |

掛載包裝 `FV.ml`：等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、一次性文字 `once` 只播一次、canvas `aria-hidden`、原 HTML 標題 `.ml-fb` 在 `.ml-live` 後才視覺隱藏、reduced-motion 背景 `seek(.35)`／文字 `seek(1)`。元件不擔任 signature；四種動效各有自製實作。

自我限制：本站不用淡入、不用數字滾動、不用模糊陰影。

## 插畫與圖像風格

**fauve-dab 雙色筆塊生成**：場景是一串由下往上疊的區域（絕對座標 SVG path），每區宣告 `lit`（亮面色組）、`sh`（陰影色組）、`c`（法線圓頂中心與半徑）、`flow`（筆向）、`s`（筆距）、`line`（輪廓色）。引擎在每區外框內以抖動網格取樣，用 `isPointInPath` 確認落在本區且不被上層蓋住，再生成筆塊。小物件（眼、帽帶、花）可用 `fill:true` 純色平塗。題材：窗、帽、窗台、山、海、田、廟的屋脊、戴帽的女人。

## Logo 與 Favicon 設計指南

Logo：四塊互補色牆（群青／朱紅／鎘橙／翠綠）上一頂鎘黃帽，帽的陰影半邊是鈷紫，群青虛線輪廓。Favicon：亞麻底＋朱紅帽簷＋鎘黃帽冠＋翠綠帽帶＋群青虛線。都是純色平面，零漸層。

## Do & Don't

**Do**：陰影用互補色；露出畫布；輪廓用彩色斷線；讓顏色比形狀先被看見；文字放在留白處。
**Don't**：黑色陰影、灰、`filter:brightness()`、漸層、半透明疊色、圓角卡片＋模糊陰影、紫藍漸層 hero、置中三卡片、emoji icon、Lorem ipsum、EST. 徽章。不要把野獸派做成梵谷（長而捲曲的筆觸）或點描（等大圓點）——筆塊是方頭、短、寬。

## 頁面骨架範例

```html
<section class="hero"><div class="frame">
  <canvas id="hero-cv" role="img" aria-label="敞開的窗…"></canvas>
  <div class="volet l" aria-hidden="true"></div><div class="volet r" aria-hidden="true"></div>
  <div class="pan pl"><h1><span class="bt" data-cols="vm,co"><span class="bt-tx">野</span></span>…</h1></div>
  <div class="pan pr"><p class="st"><i></i><span>營業中</span></p><a class="dab" href="hats.html">看帽款</a></div>
</div></section>
<script>
new FV.Painting(document.getElementById('hero-cv'),{w:1000,h:640,regions:[
  {d:'M232 46 L768 46 L768 252 L232 252 Z',lit:['cy','co'],flow:0,s:18},          // 黃天
  {d:'M296 264 L356 198 L566 190 L642 250 L704 264 Z',lit:['ma'],sh:['em'],c:[500,236,210,50],s:12,line:'vi'}
]});
</script>
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援與查證 | fallback |
|---|---|---|---|---|
| Canvas 2D 筆塊渲染器（Path2D＋`isPointInPath` 取樣、`setTransform` 每筆旋轉、`createPattern` 布紋、`setLineDash` 斷續輪廓） | A 渲染 | 特徵②③④、signature、所有圖 | Canvas 2D／Path2D 為各瀏覽器長期支援的基礎 API（MDN Baseline Widely available） | 畫布下方有 CSS 純色色塊構圖（牆、窗、天、田）；DOM 文字不依賴 canvas |
| 自寫 value noise＋3 層 fbm（整數雜湊、smoothstep 插值） | E 資料與生成 | 每筆的方向擾動與長度、筆塊字的方向與色分區、換頁筆塊方向 | 純 JS，無相容性問題；決定性（同 seed 同畫） | — |
| 臺北真實時刻驅動光向（`Intl.DateTimeFormat` `timeZone:'Asia/Taipei'`）＋`matchMedia('(prefers-reduced-motion)')` | B 時間軸 | signature 預設光向、首頁「現在光從哪邊照進來」、營業狀態 | Intl.DateTimeFormat 為 MDN Baseline Widely available（2017-09 起） | Intl 失敗時退回本機時間；reduced-motion 時光向直接到位、不閃、不刷 |

查證來源：MDN Intl.DateTimeFormat（Baseline Widely available）；MDN `getContextAttributes()`／`willReadFrequently`（筆塊字 mask 讀回用 `{willReadFrequently:true}`）；大都會博物館〈Vertigo of Color: Matisse, Derain, and the Origins of Fauvism〉展覽導覽；Wikipedia〈Gil Blas (periodical)〉（1905-10-17）。

效能實測（@napi-rs/canvas 於 Node 22 實際繪製）：首頁窗 3,686 筆 16ms（1200px 寬）、畫頁女人 3,050 筆 12ms、帽款小畫約 1,200 筆 4ms、地圖 2,847 筆 10ms；光向改變時才重繪，海的閃動每 150ms 重繪一次。單頁 153–161KB（含 motion-library 子集 110KB）。同一畫面同時運轉的 motion-library 元件 ≤1 個。
