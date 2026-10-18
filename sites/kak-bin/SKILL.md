---
name: synthetic-cubism-papier-colle
description: Synthetic Cubism papier collé (Braque, Picasso, Gris 1912–1919) for the web — simultaneous-viewpoint facets cut by straight lines, pasted faux-bois, newsprint and wallpaper, truncated stencil words, an ochre-umber-newsprint palette with Gris blue, and a tilted shallow tabletop.
---

# 綜合立體派拼貼 Synthetic Cubism · Papier collé

> 示範站：角面弦樂 KAK-BĪN GUITAR WORKS（高雄鹽埕的修琴與手工吉他工坊，虛構）
> 型錄位置：「現代主義與構成」新增條目，全館第 1 站。不是自創風格。

## 一、設計哲學

立體派分兩期。**分析立體派**（1909–1912）把物件拆成灰褐色小分面，幾乎認不出東西；**綜合立體派**（1912–1919）倒過來，用幾塊大的平面「組」出一個物件，而且開始往畫上貼真的東西。

- 1912 年 9 月，Georges Braque 在索爾格（Sorgues）的五金行買了一卷仿橡木紋壁紙，剪下來貼進炭筆畫〈Fruit Dish and Glass〉——第一件 papier collé。Braque 年輕時學過油漆匠，會用木紋梳畫假木紋，也會用模版刷字。
- 同年 Picasso 剪貼〈Guitar, Sheet Music and Glass〉（報紙標題《Le Journal》被剪成「LA BATAILLE S'EST ENGAGÉ」），並用紙板與線做了立體的〈Guitar〉。
- Juan Gris 1913–1919 把這套語言做得最清楚：大塊平面、強烈的明暗分面、藍色、木紋和報紙在同一張桌子上，構圖用看得見的斜線切開（〈Guitar and Pipe〉1913、〈Still Life with Checked Tablecloth〉1915）。

它長這樣的原因：**一張畫要同時告訴你一個東西從好幾個方向看起來是什麼樣子。**吉他的音孔是圓的（從正面看），琴身是一條窄帶（從側面看），背板是木頭（從後面看）——三件事同時成立，就同時畫出來。貼上的報紙與木紋紙則把「真的物質」帶進畫裡，取代用顏料模仿。

給網頁的翻譯：畫面不是一張圖，而是**一組被直線切開的視窗**，每個視窗露出同一場景的不同視角或不同材料；所有材料都是平貼的紙，邊是剪刀剪的直線。

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就變成別的東西（平面幾何海報、拼貼雜誌、普通插畫）。

### 特徵 1｜同時視角的分面：一組直線把畫面切成凸多邊形，每塊露出不同視角

每個分面只能是直線圍出來的凸多邊形；分面之間錯位 3–10px，同一物件在相鄰分面裡是不同角度（正面／背面／側面）。分面邊界畫 1.4px 炭黑線。

```html
<svg viewBox="0 0 600 640">
  <defs>
    <g id="v0"><!-- 正面視角：亮赭面板＋黑音孔 --></g>
    <g id="v1"><!-- 背面視角：木紋背板 --></g>
    <clipPath id="k0"><polygon points="0,0 340,0 210,640 0,640"/></clipPath>
    <clipPath id="k1"><polygon points="340,0 600,0 600,640 210,640"/></clipPath>
  </defs>
  <g clip-path="url(#k0)"><g transform="translate(-6 3)"><use href="#v0"/></g></g>
  <g clip-path="url(#k1)"><g transform="translate(5 -2)"><use href="#v1"/></g></g>
  <path d="M340 0L210 640" stroke="#1E1C1A" stroke-width="1.4"/>
</svg>
```

切分演算法（半平面切割，本站 `engine.js`）：從整個畫框開始，每一條線把每個 cell 分成兩半；面積 <60 的碎片不切。

### 特徵 2｜黏貼材料（papier collé）：假木紋、報紙、壁紙、樂譜，平貼且直線剪邊

材料是**平的紙**：零模糊陰影、零立體感、零圓角；邊緣是剪刀剪的直線（可稍歪 1–3°）。假木紋要像油漆匠用木紋梳刷出來的——一排同步起伏的平行梳痕＋一個節眼。

```css
/* 剪下來的紙：直線剪邊、平貼 */
.paper{background:#E8DFC9;clip-path:polygon(0 1.5%,38% 0,100% 1%,99.2% 52%,100% 98.6%,61% 100%,0 99%,.7% 46%)}
/* 假木紋：把梳痕 SVG 做成 data URI 平鋪（橫向週期 480 無縫） */
.bois{background:#B9925A url("data:image/svg+xml,…梳痕 path…") 0 0/480px 240px}
```

```html
<pattern id="m-news" width="150" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
  <rect width="150" height="60" fill="#E8DFC9"/>
  <text x="2" y="8" font-size="7" fill="#1E1C1A" fill-opacity=".72">港都日報　鹽埕區新樂街琴行週四夜開放…</text>
</pattern>
```

### 特徵 3｜截斷的模版字：字被紙邊或分面切掉一半

Braque 1911 起用模版刷字（〈Le Portugais〉的「BAL」）；Picasso 把《Le Journal》剪成「JOU」。字是畫面裡的一個物件，不是標題——而且永遠不完整。

```css
.sten{font-family:"Stardos Stencil",serif;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.trunc{display:inline-block;overflow:hidden;white-space:nowrap;clip-path:polygon(0 0,100% 0,82% 100%,0 100%)}
```
```html
<span class="sten trunc" aria-hidden="true">GUITARE</span>   <!-- 讀者看到 GUITA… -->
<text font-family="Noto Serif TC" font-weight="900">港都日報</text> <!-- 放在會被切到的報紙片上 -->
```
規則：截斷字一律 `aria-hidden`，完整資訊必須另外寫在可讀處。

### 特徵 4｜限縮色譜：赭、木紋褐、報紙米、炭黑，加一塊 Gris 藍

| 用途 | 色 | 比例 |
|---|---|---|
| 假木紋桌面（地色） | `#B9925A` | ~30% |
| 報紙米（所有長文的底） | `#E8DFC9` | ~26% |
| 木紋深 | `#6B4A2B` | ~14% |
| 炭黑（分面線、字、音孔） | `#1E1C1A` | ~14% |
| Gris 藍（連結、現用態、focus，也是最大的一塊色面） | `#3F5E86` | ~9% |
| Braque 灰綠 | `#7C8572` | ~5% |
| 亮赭（受光面） | `#D4B07A` | — |
| 點描紅（只在點描與印章） | `#A8442E` | ≤2% |

明暗不靠漸層，靠**分面三階**：每個分面依它的切線方向與光向，疊 0／13％／27％ 的炭黑。

```js
tone=(ang,light)=>{const d=Math.cos((ang-light)*Math.PI/180);return d>.45?0:d>-.35?.13:.27;}
```

### 特徵 5｜傾斜的淺空間桌面＋點描

桌面向觀者翹起（從上往下看桌面、從側面看物件），沒有消失點；所有平面幾乎平行於畫面堆疊。1914 年 Picasso 的「洛可可立體派」在分面上加點描（pointillé）——本風格用固定 9px 的紅點或藍底白點作裝飾母題。

```html
<path d="M40 300L560 258L600 562L0 604Z" fill="url(#m-bois)" stroke="#1E1C1A" stroke-width="2"/> <!-- 翹起的桌面 -->
<path d="M0 604L600 562V600L0 640Z" fill="#6B4A2B"/> <!-- 桌緣厚度 -->
```
```css
.dots{background-image:radial-gradient(#A8442E 1.6px,transparent 2.1px);background-size:9px 9px}
```

## 三、色彩系統

見特徵 4。補充：
- 長文只放在報紙米 `#E8DFC9` 上，炭黑字（對比約 13:1）。木紋深 `#6B4A2B` 上只放短文，用報紙米字。
- Gris 藍是唯一的「冷」：連結、現用頁、focus outline、和弦牌按下。
- 禁止：任何漸層（`linear-gradient` 只可用於硬停點圖樣）、霓虹色、純白 `#FFF`、模糊陰影。

## 四、字體系統

| 角色 | 字體 | 字重 | 用法 |
|---|---|---|---|
| 中文標題 | Noto Serif TC | 900 | 報紙刊頭的感覺；字級 28–120px，行高 1.1 |
| 中文內文 | Noto Serif TC | 400 / 700 | 16–17px，行高 1.8 |
| 模版字（拉丁、數字、價格） | Stardos Stencil | 700 | 全大寫、字距 .06–.3em；價格與年份也用它 |
| 動畫字（motion-library 文字元件） | Noto Sans TC 900（`text=` 子集） | 900 | 元件庫內建無襯線，只載入用到的字 |

字級階梯：12 / 15 / 17 / 24 / 28 / 34 / 46 / 92 / 120。沒有中間值的「中型標題」。

## 五、版面與網格

- 主欄最大 1240px，左側 210px 留給剪報導覽（≤900px 改為頂端黏著列）。
- 區塊之間 60–80px；區塊本身是「貼上去的紙」，各自旋轉 −2°～+2.5°，相鄰兩塊方向相反。
- 首頁為非對稱雙欄 0.82 : 1.18，右欄是靜物畫面。
- 年表、流程用無間距的色塊條（報紙／木紋／藍／點描／炭黑），每格材料不同。

## 六、元件配方

**導覽（剪報籤 clipping-collage）**：左上角一疊剪報，每張各歪一個角度、各自不同的直線剪邊；預設寬 92px 只露出中文與半個模版字，hover／focus 時以 `steps(4)` 展開到 158px；現用頁換成木紋紙並在底部壓一條 4px 藍。≤900px 攤成頂端四格。

```css
.clip-nav a.c{width:92px;overflow:hidden;transition:width .22s steps(4,end);clip-path:polygon(0 0,100% 6%,96% 100%,0 92%)}
.clip-nav a.c[aria-current="page"]{background:#B9925A url(木紋);box-shadow:inset 0 -4px 0 #3F5E86}
```

**按鈕（和弦牌）**：報紙米底、模版字、旋轉 ±2°；按下＝藍底報紙字＋底部 5px 炭黑。不用圓角、不用陰影。

**卡片**：就是一張剪下來的紙（`.paper`），三種剪法輪流（`.p2` `.p3`）。

**表單／清單**：價目以「剪報條」呈現，每條右上角一個淡 14% 的截斷模版字（STRI／SETU／FRET…）。

**頁尾**：炭黑底、報紙米字，模版字小標。

## 七、動效規則（四種，缺一不可）

| 種類 | 本站實作 | 觸發 | 時間 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **光源繞桌**：光向 36 秒一圈，每 600ms 把每個分面重算成亮／中／暗三階之一——明暗一格一格翻，不是漸變 | 時間 | 600ms 一格 | 光向固定 220°，三階明暗照常顯示 |
| input 輸入 | **視角視差**：滑鼠位置讓每個分面依自己的深度值（−1…1）平移最多 9px，像換一個站位看桌子 | pointermove | rAF，<16ms | 關閉 |
| transition 轉場 | **五片拼貼紙換頁**：木紋、報紙、藍、炭黑、點描五片紙從五個方向貼上蓋滿，下一頁再撕走 | 點內部連結 | 300ms＋60ms 錯開；離開 380ms | 直接換頁 |
| signature 簽名 | **撥弦重切**：每撥一次弦，一條新的切線穿過撥弦點（角度＝弦序×37＋次數×61），整張靜物重新切分、每個分面以 `steps(3)` 抖到新位置 | 撥弦 | 200ms | 立即重切，無抖動；聲音照常 |

另有：吉他卡片 hover／focus 重切（180ms steps(2)）、弦振動（260ms）。

本風格自我限制：**禁用淡入、禁用模糊、禁用 ease 平滑位移**——立體派的變化是「切換」，所以全站只用 `steps()`。

### motion-library 元件（PLAYBOOK §2.8，元件庫 1.1.0 @eb4d70c）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| TXT-A-14 | Torn Text | 靜物 | text「角面弦樂」・colors primary `#3F5E86` secondary `#B9925A` bg `#E8DFC9`・duration 1.5・loop false・seed 1975 | 店名沿一道鋸齒線撕成上下兩半再對上——就是 papier collé 的「撕下一條報紙」；只有直線與 clip，無圓角無發光 | transition（一次性進場） |
| BG-B-07 | Halftone Checker | 靜物 | colors `#A8442E`/`#3F5E86`/`#E8DFC9`・duration 9・density .9・intensity .8 | 週四 jam 區塊的點描底：Picasso 1914 洛可可立體派的 pointillé 色面，點徑隨棋盤交替呼吸 | ambient |
| BG-B-24 | Crosshatch | 修理 | colors `#1E1C1A`/`#6B4A2B`/`#B9925A`・duration 14・density .8・intensity .7 | 標題背後的斜排線緩慢滑動：分析立體派用排線做分面明暗的那一手 | ambient |
| BG-A-15 | Triangle Grid | 琴 | colors `#3F5E86`/`#D4B07A`/`#6B4A2B`・duration 10・density .9 | 琴型清單上方的三角分面帶，分面依相位亮起——分面本身就是本風格的基本單位 | ambient |
| TXT-A-33 | Slice Text | 工坊 | text「工坊」・colors `#3F5E86`/`#B9925A`/`#E8DFC9`・duration 1.4・loop false | 字被橫切六條、各自錯位再對齊：同一個字的六個分面 | transition（一次性進場） |

出處：`MotionLib.prompt(id)`。掛載包裝見 `index.html` 的 `KB.ml`：等 `document.fonts.ready`、離屏 `destroy()`、回視窗重掛、文字元件 `once` 只播一次、canvas `aria-hidden`、原 HTML 標題 `.ml-fb` 保留；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 八、插畫與圖像風格（分面拼貼 facet-collage）

- 一張圖 = 三個視角的 `<g>`（正面／背面／側面）＋一組切線。物件以最少幾何畫：吉他琴身用 8 段三次貝茲、音孔一個圓、琴頸一個矩形、琴頭一個梯形。
- 側面視角裡，物件輪廓退成排線（`m-hatch`），只剩厚度帶。
- 酒瓶、杯子、報紙、樂譜、桌面是固定配角；俯看時瓶與杯變成同心圓。
- 地圖、肖像、商品照一律用同一套切法——連地圖也被切。

## 九、Logo 與 Favicon

方形標章：木紋地、左側一塊 Gris 藍斜面、一個黑音孔被一道斜線切成兩半（左半黑、右半報紙米＝背面），三條弦直穿。字標：Noto Serif TC 900「角面弦樂」＋ Stardos Stencil「KAK-BĪN GUITAR WORKS」，底下一條 3px 炭黑線。Favicon 為標章的 64×64 簡化版（inline SVG data URI）。

## 十、Do & Don't

**Do**
- 讓同一個物件在相鄰分面裡是不同角度。
- 每一塊顏色都宣告自己是什麼材料（木紋、報紙、壁紙、樂譜、點描、平塗）。
- 讓字被切斷；把完整資訊寫在別處。
- 用 `steps()` 做所有動態。

**Don't**
- 不要漸層、模糊陰影、圓角、玻璃擬態、紫藍漸層 hero。
- 不要把分面做成隨機三角形馬賽克（那是低多邊形，不是立體派）——分面要大、要少、要從物件長出來。
- 不要只有灰褐單色（那是分析立體派）；綜合立體派一定有一塊藍或綠的大平面與黏貼材料。
- 不要置中大標＋三張圓角卡、emoji icon、Lorem ipsum、EST. 19xx 徽章。
- 不要用 Picasso／Braque 的真作品圖像；畫你自己的桌子。

## 十一、頁面骨架（可直接使用）

```html
<nav class="clip-nav" aria-label="主要導覽">
  <a class="brand" href="index.html">角面弦樂<small>KAK-BĪN GUITAR WORKS</small></a>
  <a class="c" href="index.html" aria-current="page"><b>靜物</b><i>STILL LIFE</i></a>
  <a class="c" href="repair.html"><b>修理</b><i>REPAIRS</i></a>
</nav>
<main class="wrap">
  <section class="hero">
    <div class="paper">…文字一律在報紙上…</div>
    <svg viewBox="0 0 600 640">
      <defs><!-- m-bois / m-news / m-wall / m-dots 材料 --><g id="sv0">…</g><g id="sv1">…</g><g id="sv2">…</g></defs>
      <g id="cells"><!-- KBF.svg() 產生：clipPath＋use＋三階明暗＋分面線 --></g>
    </svg>
  </section>
</main>
<script>
var r=KBF.svg({W:600,H:640,pre:'s',lines:KBF.seedLines(1975,6,600,640),seed:1975,light:220,nv:3});
document.getElementById('cells').innerHTML=r.html;
</script>
```

## 十二、技術實作與相容性

### 1. SVG `<clipPath>`＋`<pattern>` 材料庫（A 渲染層）
- 承載特徵 1、2、5：每個分面是一個 `<clipPath>` 多邊形，裡面 `<use>` 一個視角；材料全是 `<pattern>`（木紋梳痕、報紙真字、壁紙菱紋、樂譜、點描、排線）。
- 查證：MDN `<clipPath>`／`SVGClipPathElement` 標 Baseline widely available（2015-07 起）；`<pattern>` 同為 Baseline widely available（MDN 註記部分屬性支援不一）。`clip-path` 表現屬性 Baseline（2017-03 起）。
- fallback：無 JS 時，建置期已用同一支引擎烘好一張靜態分面圖（19 個分面）直接寫在 HTML 裡。

### 2. 半平面多邊形切割＋決定性亂數（E 資料與生成層）
- 承載特徵 1 與簽名動效：`KBF.split()` 以點對直線的有號距離把凸多邊形一分為二（Sutherland–Hodgman 單邊版），`KBF.cells()` 逐線切出全部 cell；mulberry32 讓同一種子永遠得到同一張圖（建置期 node 與瀏覽器共用同一份 `engine.js`）。
- 實測：7 條線、約 20 個 cell，切分＋產生 SVG 字串 <1ms（node 22）；重切時 innerHTML 換掉一個 `<g>`。

### 3. Web Audio Karplus–Strong 撥弦合成（D 輸入與感測層）
- 承載 func〈六弦六面〉：每根弦以白噪音填滿長度 N=sampleRate/f 的延遲線，逐樣本取相鄰平均×0.9965 衰減，寫進 `createBuffer()` 的 AudioBuffer，以 `AudioBufferSourceNode` 播放，經 105Hz peaking（琴身共鳴）與 3.6kHz lowpass。悶音弦（指法 x）用 0.86 衰減、0.14 秒的短促版。同音高的 buffer 快取。
- 查證：MDN `BaseAudioContext.createBuffer()` Baseline widely available（2021-04 起跨瀏覽器）；`createBufferSource()` 同；MDN 建議用 `AudioBufferSourceNode()` 建構子，兩者皆可。AudioContext 需使用者手勢啟動——本站在第一次 pointerdown／keydown 時 `resume()`。
- fallback：無 AudioContext 時聲音靜默，重切與八小節進度照常（視覺與文字回饋完整）。
- 實測：2.6 秒單弦 buffer 生成約 5ms（44.1kHz，node 原型）。

### 效能預算（實測，2026-10-18）
| 頁 | 大小（含 inline 全部資源與元件子集 34.4KB） |
|---|---|
| index.html | 約 124KB |
| repair.html | 約 77KB |
| guitars.html | 約 141KB |
| atelier.html | 約 101KB |

首屏 JS：引擎切分 <1ms＋元件掛載延後到字型就緒；主要動畫為 steps() 與 600ms 一格的明暗重算，無 layout thrashing。

## 十三、驗收：三秒辨識測試

遮掉所有文字只看首屏：赭色木紋桌面翹起、一把吉他被幾道直線切成十幾塊，有的塊是面板與黑音孔、有的是木紋背板、有的只剩排線輪廓；旁邊一塊藍、一塊壁紙、一片報紙、一張樂譜、一塊紅點——懂設計的人會說「Juan Gris／立體派拼貼」。
