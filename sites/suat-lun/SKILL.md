---
name: bingata-ryukyu-katazome
description: Ryukyu bingata stencil-resist dyeing style — flat motifs separated by undyed paste lines, one solid royal ground masked away from every motif, single-edge kumadori shading as the only gradient, season-mixed motifs on a half-drop stencil repeat, and katazome letter tiles.
---

# 紅型 Bingata（琉球型染）

> 範例站：雪輪剉冰 SUAT-LÛN（南方澳剉冰店兼冰旗型染）・4 頁・Claude Opus 5.5 排程 Agent・2026-10-20

## 一、設計哲學

紅型是琉球王國時代在首里發展的型染：楮紙用柿渋貼成型紙、刻出圖案，隔著型紙把糯米糊刮到布上；糊擋住的地方之後不吃顏色。顏料由淺到深一格一格刷進糊線圍起來的格子，再在每塊顏色的一邊刷一道深色往內暈（隈取），然後把母題全部蓋糊、刷地色、蒸、最後下水把糊沖掉（水元）。

這套工序直接決定了它長什麼樣子：**顏色永遠不互相接觸**（中間一定隔著一道沒染到的白線）；**地色是一整片平塗**（因為它是最後一刀大刷子刷上去、母題被糊擋住）；**唯一的暈色在母題內、只在一邊**（隈取）；**圖案是型紙重複出來的**（有送り、有接縫）；**題材不管季節**（雪輪、櫻、楓、燕、波同在一塊布）。

做網頁時把這五件事當成渲染規則，而不是裝飾：先畫白布、再畫糊線、再填色、再隈取、再用遮罩把地色「染」在母題以外的地方。照這個順序寫，畫面自然就是紅型；跳過任何一步，它就會退化成一般的扁平插畫。

## 二、本風格的 5 個不可省略特徵

### 特徵 1：糊線留白——色塊之間一律隔著未染的白線（形狀語彙）

每一塊顏色都被一道 2.5–3.5px 的生地色（`#F6EFDD`）線包住，顏色與顏色、顏色與地色從不直接相接。**不是黑色描邊**：線是「沒被染到的布」，所以永遠是最淺的那個顏色。形狀是型紙刻得出來的平塊：圓頭花瓣、尖缺刻、整塊剪影，不畫細節線。

```svg
<!-- 一片櫻花瓣：先平塗，再疊隈取，最後一道生地色糊線壓在邊上 -->
<path d="M0,-4C-14,-9 -18,-31 -8,-41L0,-34L8,-41C18,-31 14,-9 0,-4Z" fill="#EBA0A0"/>
<path d="M0,-4C-14,-9 -18,-31 -8,-41L0,-34L8,-41C18,-31 14,-9 0,-4Z" fill="url(#kuma-momo)"/>
<path d="M0,-4C-14,-9 -18,-31 -8,-41L0,-34L8,-41C18,-31 14,-9 0,-4Z" fill="none" stroke="#F6EFDD" stroke-width="3" stroke-linejoin="round"/>
```

### 特徵 2：一片平塗的王朝地色，以遮罩「排除」所有母題（色彩規則）

地色是全畫面最大的一塊、而且絕對平塗：黃地 `#EDB62B`（王族色）、水色地 `#6DB2C7`、白地（生地本身）、或藍型（只用藍一色的濃淡）。母題用 6–9 個顏料色。地色要**蓋在母題的上層、但用 mask-composite 挖掉母題**——這就是糊伏せ＋地染め的網頁版。

```css
.l.ground{background:var(--g,#EDB62B);
  -webkit-mask:var(--sil) 0 0/240px 240px repeat,linear-gradient(#000 0 0);-webkit-mask-composite:xor;
          mask:var(--sil) 0 0/240px 240px repeat,linear-gradient(#000 0 0);mask-composite:exclude}
/* --sil＝同一張型的剪影（含糊線寬），黑色填色 */
```

### 特徵 3：型絵染文字——每字一格色塊，字是留白（字體選擇）

標題字用圓頭的 **Huninn（jf open 粉圓）**，每個字放進一格正方色塊，字本身是生地色（=沒被染到），格與格之間留 4px 生地縫；每一格裡有一道單邊隈取，角度依格輪替，游標經過時轉向游標。內文用 Noto Sans TC 400/500。禁止襯線體、禁止 mono、禁止粗黑體。

```css
@property --ka{syntax:'<angle>';inherits:false;initial-value:150deg}
.kt{display:flex;flex-wrap:wrap;gap:4px;font:400 clamp(40px,6.2vw,78px)/1 "Huninn","Noto Sans TC",sans-serif}
.kt span{display:inline-grid;place-items:center;width:1.16em;height:1.16em;color:#F6EFDD;
  background:linear-gradient(var(--ka),var(--kd) 0,#0000 42%),var(--kb)}
.kt span:nth-child(6n+1){--kb:#263E7C;--kd:#101F47;--ka:200deg}
.kt span:nth-child(6n+2){--kb:#D6402A;--kd:#8F2216;--ka:20deg}
```

### 特徵 4：型送り——半送り重複、看得到的型紙與白抜き（版面手法）

整頁就是一匹布：一張 240×240 的型以「半送り」配置（第二列母題錯開半格），母題允許跨出型框、靠九宮格複製接回；型角留兩個小十字（星，對位記號）。內容放在**白抜き**——上過糊、沒被染到的生地塊上，上下緣是雪輪的連續凹口。不用卡片陰影、不用圓角框。

```css
.kart{background:#F6EFDD;padding:34px 36px;
 mask:radial-gradient(circle at 12px 0,#0000 7px,#000 7.6px) top/24px 12px repeat-x,
      radial-gradient(circle at 12px 12px,#0000 7px,#000 7.6px) bottom/24px 12px repeat-x,
      linear-gradient(#000 0 0) center/100% calc(100% - 22px) no-repeat}
```

### 特徵 5：四季混在的母題＋單邊隈取（裝飾母題）

同一塊布上同時出現冬（雪輪、千鳥）、春（櫻、燕）、夏（波、芭蕉、鳳梨）、秋（楓、菊）；大小差兩倍以上、母題裡再套母題（雪輪裡開櫻）。每一塊顏色都有一道隈取：**只在母題內、只在一邊、只暈 30–50% 的距離**，常用對比色（粉瓣配紅隈、白瓣配水色隈）。地色上絕不出現漸層。

```svg
<linearGradient id="kuma-momo" x1=".5" y1="0" x2=".5" y2="1"><!-- objectBoundingBox：跟著母題旋轉 -->
  <stop offset="0" stop-color="#C24B5A"/><stop offset=".42" stop-color="#C24B5A" stop-opacity="0"/>
</linearGradient>
```

## 三、色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 黃地 ki | `#EDB62B` | 地色（王族色），html 底 | ~40% |
| 生地 kiji | `#F6EFDD` | 糊線、白抜き、內文底 | ~25% |
| 糊 paste | `#E2D3AE` | 只在工序中間態（水元前） | 動態 |
| 藍 ai／深藍 | `#263E7C`／`#101F47` | 母題、按鈕、頁尾、隈取 | ~10% |
| 朱／深朱 | `#D6402A`／`#8F2216` | 母題、強調按鈕 | ~6% |
| 臙脂 | `#A51E3E`／`#5E0D24` | 母題、小標、價格 | ~4% |
| 水色 | `#6DB2C7`／`#2C7690` | 母題、水色地 | ~5% |
| 若草 | `#7EA73A`／`#40631A` | 母題 | ~4% |
| 紫 | `#6A4B8D`／`#3E2A5A` | 母題 | ~3% |
| 桃 | `#EBA0A0`／`#C24B5A` | 櫻花 | ~2% |
| 墨 | `#2A2320` | 內文 | — |
| 柿渋 | `#8B4A23` | 只給型紙（導覽） | <2% |

規則：每個顏料色都有一個「隈取色」（同色相深一階，或對比色）；生地色是全站最亮值；零純白、零純黑；地色零漸層。藍型模式把所有角色換成藍的五階濃淡。

## 四、字體系統

- 標題：Huninn（Google Fonts，OFL，justfont 以 Kosugi Maru＋Varela Round 為基礎的繁中圓體）400。型絵染文字 40–78px；h2 26–38px；h3 22px。
- 內文：Noto Sans TC 400／500／700，16px／1.8；lede 18px。
- 標籤：Noto Sans TC 500 12px、字距 .22em。
- 數字（價格）用 Huninn 32px，臙脂色。

## 五、版面與網格

- 最大寬 1180px、左右 28px（手機 16px）。所有元件零旋轉（紅型的傾斜只在母題內部）。
- 白抜き之間至少留 26–56px，讓地色與母題露出來——**畫面上布的面積不能低於 35%**。
- 首屏：左 0.92fr 冰旗（三幅暖簾式、竹竿）、右 1.08fr 白抜き。內頁以兩欄不對稱為主，列表左右交錯（偶數項靠右）。
- ≤900px 單欄；導覽改為底部柿渋色列。

## 六、元件配方

- **導覽（型紙掛け）**：右上竹竿（`repeating-linear-gradient` 竹節）掛四張 54×64 柿渋型紙，母題以 `mask-composite:exclude` 挖空，透出後面的布；現用頁那張已上糊（糊色底＋淡型）並下垂 8px，標籤反白。
- **按鈕**：藍或朱色塊＋一道 2px 生地內線（糊線）＋單邊隈取 `linear-gradient(200deg,深色 0,#0000 45%)`。hover 上移 2px。無圓角、無陰影。
- **白抜き（卡片）**：見特徵 4。
- **表單選項**：黃地方塊，選中翻墨底生地字；色票小方塊外加 2px 生地框。
- **頁尾**：深藍地，上緣雪輪凹口一排。

## 七、動效規則（四種，缺一不可）

| 種類 | 本站實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 三幅冰旗隨風：每幅 `perspective rotateY ±9°＋skewX`，三幅相位錯開 −1.3s／−2.5s | 常駐 | 4.2s ease-in-out infinite | 靜止 |
| input | 隈取跟筆：游標就是刷毛，母題內每道隈取的漸層向量即時轉向游標（`linearGradient` x1..y2）；型絵染文字每格 `--ka` 轉向游標 | pointermove，rAF 內更新（<16ms） | 文字 .14s linear | 照常（使用者自己在動） |
| transition | 反物送り：換頁時下一匹布從右邊整片拉進來蓋住畫面、新頁抵達再往左送走 | 站內連結 | 440ms＋520ms cubic-bezier(.6,0,.25,1)（WAAPI） | 直接換頁 |
| signature | **水元**：冰旗先以「地染め完成、糊還沒洗」的狀態出現（母題被糊蓋住、糊線是米色），一道不規則水線由上往下沖過，糊消失、白線與顏色第一次同時出現 | 字型就緒後；可按鈕重播 | 2.1s cubic-bezier(.45,.05,.4,1)，`mask-position` 100%→0 | 直接顯示洗好的成品 |

功能頁另有六道工序時間軸（型置き→色差し→隈取り→糊伏せ→地染め→水元），以 WAAPI 群組 `currentTime` 拖曳。

自我限制：本風格不用淡入當主角、不用彈跳；所有「出現」都必須對應一道真實工序（抹糊、刷色、刷地、沖水）。

### motion-library 元件（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` v1.7.0 @3a0a867，`tools/ml-embed.js` 抽子集 inline，`MotionLib.prompt(id)` 可取原始開發 Prompt。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合紅型 | 類型 |
|---|---|---|---|---|---|
| 店頭 | TXT-B-19 | Text Flag | text「冰・涼・甜」、primary #D6402A、secondary #263E7C、bg #F6EFDD、duration 3、loop、seed 1976、16:9 | 今年的試染布：字像布一樣被風吹——冰旗本來就是布，字隨布波動；平塗字、無描邊無發光，符合特徵 1／2 | ambient |
| 店頭 | BG-B-21 | Ripple Rings | primary #2C7690、secondary #263E7C、bg #F6EFDD、duration 6、density .8、intensity .8、seed 7、1:1 | 港邊雨點的同心圓——紅型常見的「水紋」母題，只用藍與水色兩個顏料色 | ambient |
| 冰單 | BG-B-20 | Wave Lines | primary #101F47、secondary #6DB2C7、bg #F6EFDD、duration 7、density 1、intensity .9、seed 3、16:9（裁成 140px 條帶） | 流水帶：一層一層的藍＝藍型（えーがた）只用藍一色、靠濃淡分層的作法 | ambient |
| 染冰旗 | TXT-A-03 | Stamp In | text「染一面冰旗」、primary #D6402A、secondary #263E7C、bg #F6EFDD、duration 1.4、loop:false、seed 21 | 標題像型紙被壓到布上——「型置き」的動作本身；一次性、停在最後一格 | transition |
| 工房 | TXT-B-17 | Water Reflection | text「水元」、primary #2C7690、secondary #263E7C、bg #F6EFDD、duration 2.4、loop:false、seed 12 | 「水元」兩字從水面浮起、倒影在水裡——紅型最後一道下水沖糊的工序 | transition |

掛載規則：等 `document.fonts.ready`、離屏 `destroy()`、回到視窗重掛；一次性文字 `loop:false` 只播一次；canvas `aria-hidden`；容器保留 `.ml-fb` HTML 標題，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。元件不擔任 signature。

## 八、插畫與圖像風格

技法 `katazome-kumadori 型染隈取`：每個母題寫成「區域清單」`{d 路徑, c 底色, k 隈取色, a 隈取角度}`，渲染時分四層——平塗（色差し）、隈取（objectBoundingBox 線性漸層，0→42% 由深到透明）、糊線（生地色 stroke）、剪影（給遮罩用，含糊線寬）。九種母題：雪輪（圓被咬 6 個凹口）、櫻（五瓣、瓣尖缺刻）、梅（五圓瓣）、燕、千鳥、波（三層半環）、楓（七裂）、菊（十六瓣）、芭蕉葉、鳳梨（菱格是糊線）、霞雲。一張型 7–10 個母題，大小差 2 倍以上。

禁止：黑色描邊、寫實陰影、照片、漸層地色、母題之間顏色相接、母題外的暈色。

## 九、Logo 與 Favicon

Logo：藍地方塊＋2px 生地內框，中央黃色雪輪（右下隈取）裡一朵朱色櫻花，全部以生地糊線分開（`assets/logo.svg`）。Favicon：同構簡化，雪輪＋朱色圓心，inline SVG data URI。

## 十、Do & Don't

- Do：先決定地色，再讓地色以遮罩繞開母題；每塊顏色都有糊線；隈取一律單邊。
- Do：讓不同季節的母題同框；讓母題跨出型框、靠重複接回。
- Do：工序就是動效——抹糊、刷色、刷地、沖水，各有自己的方向（刷色左→右、刷地右→左、沖水上→下）。
- Don't：黑色描邊（那是日式插畫或刺青 flash，不是紅型）。
- Don't：地色漸層、紙紋濾鏡、模糊陰影、玻璃擬態、紫藍漸層、emoji、置中三卡片。
- Don't：把蠟染的冰裂紋、絞染的暈開邊緣混進來——紅型的邊是型紙刻出來的、是銳利的。
- Don't：用淡入當主角；所有出現都要對應一道工序。

## 十一、頁面骨架範例

```html
<body>
 <div class="bolt set-yuki" aria-hidden="true"><!-- 整頁就是一匹布 -->
  <i class="l kiji"></i><i class="l color"></i><i class="l kuma"></i><i class="l ground"></i><i class="l line"></i>
 </div>
 <header class="top"><a class="brand" href="index.html">…</a>
  <nav class="kata"><ul><li><a href="index.html" aria-current="page"><span class="card" style="--m:url(data:…)"><i></i></span><span class="lab">店頭</span></a></li>…</ul></nav>
 </header>
 <main>
  <section class="kart"><h1 class="kt" aria-label="雪輪剉冰"><span aria-hidden="true">雪</span>…</h1><p>…</p></section>
 </main>
</body>
```

```css
.l{position:absolute;inset:0;background-repeat:repeat;background-size:240px 240px}
.l.kiji{background:#F6EFDD}.l.color{background-image:var(--c)}.l.kuma{background-image:var(--q)}.l.line{background-image:var(--ln)}
/* --c/--q/--ln/--sil 是同一張型的四個圖層（SVG data URI），由母題引擎產生 */
```

## 十二、技術實作與相容性

### 1. CSS `mask-image` ＋ `mask-composite: exclude`（A 渲染層）——承載特徵 2、4、signature 與導覽

- 用途：地色層＝「整片」減去「型的剪影」；白抜き的雪輪凹口邊；型紙導覽的挖空；水元的水線（`mask-position` 動畫）。
- 支援現況（2026-10-20 查證）：MDN 標示 `mask-composite` 為 **Baseline 2023**（2023-12 起最新版主流瀏覽器皆可）；caniuse：Chrome／Edge 120+、Firefox 53+、Safari 15.4+。舊 WebKit/Blink 只有 `-webkit-mask-composite`（關鍵字不同：`xor` 對應 `exclude`），本站兩者並寫、前綴在前。
- 來源：https://developer.mozilla.org/docs/Web/CSS/mask-composite ・ https://caniuse.com/mdn-css_properties_mask-composite
- Fallback：`@supports not ((mask-composite:exclude) or (-webkit-mask-composite:xor))` 時，地色層改墊到最底（z-index 0），成品外觀相同，只是工序中間態「刷地色會蓋到母題」不再誠實；白抜凹口退為直邊；型紙導覽顯示整張柿渋方塊（標籤仍在）。

### 2. Web Animations API 群組時間軸＋`Animation.currentTime` seek（B 動效與時間軸層）——承載〈染一面冰旗〉六道工序

- 9 支 `element.animate()`（各自 `delay`／`duration`、`fill:'both'`、建立後即 `pause()`），以一支 `<input type=range>`（0–6000ms）同時設定所有動畫的 `currentTime`；「從白布開始染一次」用 rAF 推進同一個 t。刷色用 `clip-path: inset()` 左→右 `steps(9)`（一筆一筆），刷地右→左，糊伏せ上→下，水元動 `mask-position`。
- 支援：`Element.animate()`／`currentTime` Baseline Widely available（2020-03 起）；以 WAAPI 動 `clip-path`、`mask-position` 在 Chrome、Firefox、Safari 皆可插值。
- 來源：https://developer.mozilla.org/docs/Web/API/Element/animate
- Fallback：無 `animate` 時不建立時間軸，CSS 預設即成品狀態（所有圖層可見、水線位置在已洗完），拖曳條仍更新工序說明文字。reduced-motion：「染一次」改為每 1.1 秒跳到下一道工序的完成態，不補間。

### 3. Pointer Events → SVG `linearGradient` 向量（D 輸入與感測層）——承載 input 動效「隈取跟筆」

- `pointermove` 記錄座標、每幀最多一次 `requestAnimationFrame` 計算母題中心到游標的角度，改寫該母題全部隈取漸層的 `x1 y1 x2 y2`（objectBoundingBox，故跟著母題的旋轉）；離開時還原各區域原本的隈取角度。型絵染文字以 `@property --ka:<angle>` 註冊後 transition。
- 支援：Pointer Events Baseline Widely available；`@property` Baseline 2024（Chrome 85、Safari 16.4、Firefox 128），不支援時 `--ka` 直接切換、不補間。
- 來源：https://developer.mozilla.org/docs/Web/API/Pointer_events ・ https://developer.mozilla.org/docs/Web/CSS/@property

### 效能預算實測（建置當下）

| 頁 | 檔案大小（含 motion-library 子集 62.1KB 與烘好的型圖層） |
|---|---|
| index.html | 約 202KB |
| menu.html | 約 204KB |
| flag.html | 約 192KB |
| story.html | 約 183KB |

- 型圖層：一張型 4 層 data URI 約 64KB（黃地雪輪型），建置期烘好，無 JS 也能看到整匹布；功能頁切換型紙時在執行期產生並快取。
- 首屏 JS：母題引擎只在功能頁執行（一套型 4 層 SVG 字串於 Node 實測約 3ms）；其餘頁只掛事件與 IntersectionObserver。
- 同時運轉的 motion-library 元件 ≤2；冰旗擺動為純 CSS transform（合成層）。
- 驗證方式：jsdom 逐頁執行全部 inline script（無例外）、`node --check` 逐段、`tools/ml-smoke.js` smoke ok、母題與 Logo 以 resvg 實際渲染檢查。建置環境沒有可用的瀏覽器，未取得 60fps 實測值，以「只動 transform／opacity／clip-path／mask-position」作為保證手段。
