---
name: wedgwood-jasperware-relief
description: Wedgwood jasperware as a web style — matte single-colour stoneware grounds with white sprigged bas-relief whose thin edges let the ground show through, strict neoclassical profiles, beaded oval medallions and Roman capitals, rendered as a live-lit height field.
---

# Wedgwood 碧玉炻器浮雕 Jasperware Relief

> 範例站：側影寫真館 TSHIK-IÁNN（臺南的照相館把客人的側臉做成浮雕章）。本規格書不綁產業：任何需要「被端詳的肖像、紀念、禮物、典藏」的品牌都能用。

## 一、設計哲學

Jasperware 是 Josiah Wedgwood 在 1770 年代經數千次試燒後推出的無釉細炻器（stoneware）：整個坯體染成一種啞光的顏色，再把另外用模子壓出來的白土浮雕「貼」上去（sprigging），一起入窯。1775–1787 年間 John Flaxman 為它設計大量浮雕，最賺錢的用途之一是**肖像浮雕章**——Flaxman 以蠟塑模，Wedgwood 量產庫克船長（1777、1779、1784）等人的純側面像。

這個流派長成這樣，全是製程決定的：

1. **沒有釉**，所以表面永遠是啞光的，沒有反光、沒有高光，只有浮雕的起伏製造明暗。
2. **白是土，不是顏料**。白土貼得薄的地方會透出底下的藍（早期作品薄邊微透光是鑑定特徵），厚的地方才純白。白的濃淡＝厚度。
3. **浮雕來自模子**，所以母題是可重複的固定零件：側臉、月桂、垂花飾、緞帶結、棕櫚葉飾、甕、珠飾。
4. **新古典主義的審美**：嚴格側面、對稱、橢圓章框、羅馬碑刻大寫。

網頁轉譯的核心一句話：**整個畫面是一塊被斜光照著的啞光藍板，白色貼花的亮度由「厚度」與「光向」兩件事決定，其他什麼都不加。**

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是 Jasperware。

### ① 啞光無釉的單一碧色地

一頁只用一種地色，大面積平塗，帶極細的不透明砂粒（炻器的顆粒），**零光澤、零漸層、零透明疊色**。三種歷史地色：碧藍、鼠尾草綠、丁香紫（Wedgwood 另有黃、黑玄武，但那是另一套配色）。

```css
:root{--g:#7E9BC7;--sh:#5F7CA8;--hi:#A9BEDB;--w:#F2EFE7;--ink:#1F2F52}
body.pg-sage{--g:#8FA487;--sh:#71876A;--hi:#B3C2AC}
body.pg-lilac{--g:#A394B8;--sh:#85769B;--hi:#C2B7D2}
body{background:var(--g) var(--grain);background-size:160px}
/* --grain：JS 產生 160×160 不透明雜點，每點只在地色 ±3% 內擾動（不是半透明疊層） */
```

### ② 白色貼花＝厚度：薄處透出地色

白色不是一個色值，而是 `mix(地色, 白土, smoothstep(0, .55, 厚度))`。貼花邊緣厚度約 0.26，所以邊緣是帶藍的白；中心 0.8 以上才純白。打光只作用在浮雕上：平地永遠等於色票原色。

```glsl
float t = smoothstep(0., .55, h);           // 厚度 → 白土不透明度
vec3 c = mix(uG, uW, t);                     // 地色 → 白
float k = 1. + .62 * (dot(n, L) - L.z);      // 平地 n=(0,0,1) 時 k=1：地色不受光影響（啞光）
gl_FragColor = vec4(c * k * shadow + grain, 1.);   // 無 specular、無模糊陰影
```

沒有 WebGL 的地方（含 CSS 小元件）用「白＋一階暗硬影＋一階亮硬影」模擬：

```css
.rl{color:var(--w);text-shadow:1px 1px 0 var(--sh),2px 2px 0 var(--sh),-1px -1px 0 var(--hi)}
```

### ③ 嚴格側面與新古典母題

人像只准**純側面**（不准正面、不准四分之三），頸部截斷；母題限定：月桂、垂花飾＋緞帶結、棕櫚葉飾（anthemion）、雙耳甕、珠飾、車床旋紋。品牌自己的物件（本站是三腳架木箱相機）要「古典器物化」：平面剪影、左右對稱或嚴格側視。

```svg
<!-- 頭像：額→鼻→唇→下巴的臉線＋固定的頸線、截斷弧、後腦 -->
<path d="M152 58C153 72 151 82 154 92C156 98 160 104 166 120C168 126 164 130 158 131C157 134 160 137 160 140C161 143 157 145 158 147C160 150 157 153 154 154C155 160 158 166 152 172C146 178 134 178 128 176C126 188 128 200 130 212L132 226C120 232 92 234 74 228C74 214 72 198 66 186C50 170 40 140 42 110C44 60 62 22 95 18C130 16 150 30 152 58Z" fill="#F2EFE7"/>
```

### ④ 橢圓章框＋珠飾邊＋中軸對稱

所有「主角」放進 4:5 的橢圓；橢圓外一圈凸珠、內一圈細線。整頁以中軸對稱為原則（壁爐飾板：中央大章、兩側小章、上方垂花、下方棕櫚葉帶）。矩形板也要有珠邊。

```css
.medal{aspect-ratio:4/5;border-radius:50%;background:var(--g);box-shadow:0 0 0 3px var(--w),4px 5px 0 3px var(--sh)}
.beads{height:14px;background:var(--beadsvg) repeat-x;background-size:16px 14px}
/* --beadsvg：<circle cx=9 cy=8 r=4.2 fill=--sh/><circle cx=8 cy=7 r=4.2 fill=--w/> 的 data URI */
```

### ⑤ 羅馬碑刻大寫，字也是浮雕

拉丁字一律 Cinzel（Trajan 系碑刻大寫）全大寫、字距 .16–.34em；中文用 Noto Serif TC 900 作標題、400 作內文。章緣文字沿橢圓排列（上緣朝外、下緣朝內），字本身是白土浮雕，會被光照出明暗。

```js
M.arcText(ctx,'TSHIK-IÁNN · TAINAN',cx,cy,rx,ry,Math.PI/2,22,'600 "Cinzel",serif',1.24,true); // 下緣
```

## 三、色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 碧藍地 Pale Blue | `#7E9BC7` | 首頁、製章頁地色、浮雕板 | 55–65% |
| 鼠尾草綠地 Sage | `#8FA487` | 館史頁地色 | 同上（換頁） |
| 丁香紫地 Lilac | `#A394B8` | 來館頁地色 | 同上（換頁） |
| 白土 Jasper White | `#F2EFE7` | 貼花、白碧玉板（長文底） | 20–25% |
| 墨藍 Ink | `#1F2F52` | 內文、頁尾（黑玄武角色） | 10–15% |
| 一階暗 `--sh` | 地色壓暗一階 | 硬邊影 | ≤3% |
| 一階亮 `--hi` | 地色提亮一階 | 浮雕左上緣 | ≤2% |

規則：同一頁只出現一種地色；白永遠不透明；淡色用預混 hex，不用 opacity。對比：墨藍 #1F2F52 在碧藍 #7E9BC7 上為 4.7:1（內文可用）；白字在地色上約 2.5:1，**只准用於 ≥40px 的浮雕標題**，長文一律放在白碧玉板上。

## 四、字體系統

- Google Fonts：`Cinzel:wght@400;600;700`、`Noto Serif TC:wght@400;700;900`。
- 字級：H1 44–72px（clamp）/ 900 / 1.08；H2 28–34px / 900 / 1.25；拉丁小標 11–15px / 600 / 字距 .24–.34em；內文 17px / 400 / 1.8；價目數字 Cinzel 700 15px。
- 年份與章號用羅馬數字（MMXXVI、No. XXIV），但**不得**做成「EST. 19xx」徽章。

## 五、版面與網格

- 最大寬 1240px，左右 28px（≤860px 時 16px）。
- 首頁＝壁爐飾板：板 1.9fr＋資訊欄 1fr；板內中軸對稱，板外版面不對稱。
- 長文放在白碧玉板 `.tab`（內縮 9px 一圈 1.5px 淡線＋外部硬影 3px 4px），板上方可加一條珠飾帶。
- 價目照 1773 年 Wedgwood & Bentley 型錄體例分 Class I–V，兩欄、點線引導到價格。
- 無旋轉角度；所有斜的東西只有光。
- 圖文繞排：橢圓章 `float` ＋ `shape-outside: ellipse(50% 50%)`、`shape-margin:18px`，奇偶交替左右。

## 六、元件配方

- **導覽（章幣陰陽刻 cameo/intaglio）**：四枚 52×64 小橢圓章，羅馬數字 I–IV；非現用頁是**陰刻**（地色、內凹硬影 `inset 2px 3px 0 --sh`、字色一階暗），現用頁是**浮雕**（白土、外圈地色＋白環＋外凸硬影），hover 浮起 2px。
- **按鈕**：小碧玉板。白底墨字＋2px 3px 硬影；hover 往左上浮起（影變長）；按下＝陰刻（`inset 2px 2px 0 --tint`）。藍版按鈕為地色＋白環。
- **選項 chips**：白板；選中＝地色＋白字＋內凹硬影（被壓下去）。
- **卡片**：不用卡片。用白碧玉板或橢圓章。
- **表單**：輸入框白底＋內凹硬影；錯誤訊息墨藍粗體＋白色波浪底線（不引入紅色）。
- **頁尾**：墨藍（黑玄武）地、白字，三欄＋細線分隔。
- **單據**（訂製單／預約單）：1.5px 墨藍實線框、Cinzel 小標＋單號、dl 兩欄。

## 七、動效規則

四種本站自製動效＋ motion-library 元件。所有動效在 `prefers-reduced-motion: reduce` 時降級且資訊零損失。

| 類型 | 實作 | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 首頁垂花飾在著色器裡以 `sin(t·1.3+y·9)` 位移取樣微微擺動；游標閒置 2.5 秒後光沿壁爐上方慢慢繞（cos .23／sin .17 rad/s） | 時間 | 無限；光源平滑 τ=0.9s | 不擺、不繞，光停左上 |
| input 輸入 | 游標位置／觸控／**裝置傾角**即光源方向：L=(x·2.4, y·2.2, .72)，傾角 L=(γ/38, (52−β)/40) | pointermove、deviceorientation | 平滑 τ=0.07s（<100ms） | 照常（使用者自己動） |
| transition 轉場 | **浸色 jasper dip**：點站內連結，目的頁的地色（碧藍／鼠尾草綠／丁香紫）以 `clip-path: inset()` 由下往上漫過畫面，平直液面、零漸層；換頁後新頁同色的地往下退去露出內容（1777 年起 Wedgwood 把白坯浸進色泥再貼花） | click／載入（sessionStorage 旗標） | 漫上 .45s、退下 .55s，cubic-bezier(.6,0,.4,1) | 直接換頁 |
| signature 簽名 | **壓模貼花**：高度場乘上 rise，rise 依 0→1.06→1（0.7 秒 ease-out-cubic 過衝再 0.3 秒回落）；因為白的濃淡＝厚度，浮雕會先以「帶藍的薄白」浮出地面，壓實了才變純白；垂花飾晚 0.25 秒 | 載入、每次製章 | 1.3s | rise 直接 = 1 |

自我限制：本風格**禁止**淡入淡出、模糊、彈跳縮放、發光——Jasperware 的一切變化都只能來自厚度與光向。

### motion-library 元件表（`wenxiangxiao/motion-library` 1.14.0 @30c55fe）

| ID | 名稱 | 頁面 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| SHP-38 | Spirograph | 首頁「車床旋紋」圓章 | `colors{primary:#F2EFE7,secondary:#F2EFE7,bg:#7E9BC7}` duration 3.2、loop:false、seed 24、1:1 | 外擺線描出玫瑰紋＝Wedgwood 1763 年引進陶業的 engine-turning 車床旋紋；主副色同為白土，元件內建的線性漸層因此退化成平色，守住「零漸層」 | ambient（進視窗播一次） |
| SHP-29 | Wave Dots | 製章頁「壓模」珠帶 | primary/secondary #F2EFE7、bg 隨地色、duration 1.4、once、16:9 cover | 一串白珠波動＝章框的珠飾；每次壓模時重播，是簽名動效的伴奏 | transition |
| BG-B-37 | Minimal Stripes | 館史頁兩側壁柱 | primary #F2EFE7、secondary=bg #8FA487、duration 9、density 1.6、9:16 cover | 白／地色直條緩慢移動＝新古典壁柱與甕身的凹槽（fluting）；平塗矩形零圓角零發光 | ambient |
| BG-B-36 | Minimal Arcs | 來館頁營業時間章背景 | primary #F2EFE7、secondary #1F2F52、bg #A394B8、duration 14、4:5 cover | 同心弧緩轉＝章背的車床旋紋圈；被中央白章擋住大半，只露出外緣 | ambient |
| BG-A-03 | Tile Rotate | 來館頁頁尾前的橫帶 | primary=secondary #F2EFE7、bg #A394B8、duration 10、density 1.2 | 四分之一圓弧磚翻轉時連成圓環與波形＝新古典的連環紋（guilloche）帶 | ambient |

元件 Prompt 出處：`MotionLib.prompt(id)`。掛載規則：等 `document.fonts.ready`；離屏 `destroy()`、回視窗重掛；一次性元件 `loop:false`；canvas `aria-hidden`；reduced-motion 背景 `seek(.35)`、一次性 `seek(1)`。同一畫面同時運轉的元件 ≤2。

## 八、插畫與圖像風格：貼花高度場 sprig height-field

全站沒有一張插畫檔。每個母題都是「白色遮罩＋一個厚度配方」：

```js
{ draw(ctx){ /* 以白色畫出母題 */ }, r: 14,   // 盒狀模糊半徑＝圓頂的圓潤度
  base: .3, amp: .62,                          // 邊緣厚度、中心加厚
  op: 'max' | 'add' | 'cut' }                  // 疊上、加厚（頭髮）、刻線（眼、髮絲）
```

遮罩經三次可分離盒狀模糊（≈高斯）得到圓頂，`h = mask·(base + amp·smoothstep(blur·k))`。頭像＝頭形（r14）＋髮帽 add（r6）＋髮型（月桂冠／希臘髻／提圖斯短捲／素髮）＋刻線（髮絲、眼、眉）＋耳。月桂、垂花飾、緞帶結、棕櫚葉飾、甕、相機都是同一套產生器。

## 九、Logo 與 Favicon

- Logo：120×148 橢圓章，碧藍地、30 顆白珠、一圈細線、白色側臉（帶 1.6px 一階暗硬影）。
- Favicon：同橢圓，只留白色側臉，inline SVG data URI。
- 不得放字在 favicon；不得用圓形（一定是 4:5 橢圓）。

## 十、Do & Don't

**Do**：一頁一地色；白的濃淡只由厚度決定；光從游標或傾角來；人像純側面；章框橢圓＋珠邊；拉丁字 Cinzel 大寫。

**Don't**：
- 不要釉光、高光、反射、玻璃擬態、模糊陰影、外發光。
- 不要漸層（含背景、按鈕、文字）；不要 opacity 做淡色。
- 不要正面或四分之三側臉；不要卡通臉。
- 不要紫藍漸層 hero、置中三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- 不要把白當成平塗色——沒有厚度的白就是貼紙，不是 jasper。

## 十一、頁面骨架範例

```html
<body class="pg-sage">
<header class="top">
  <a class="brand" href="index.html"><svg><!-- 橢圓章 logo --></svg><span><b class="rl">品牌名</b><small class="cin">Latin Name</small></span></a>
  <nav><ul class="nav">
    <li><a href="index.html" aria-current="page"><span class="md"><span>I</span></span><span class="lb">館</span></a></li>
    <li><a href="b.html"><span class="md"><span>II</span></span><span class="lb">製章</span></a></li>
  </ul></nav>
</header>
<main>
  <section class="hero">
    <div class="plq" id="plaque"><img class="fb" src="靜態備援.webp" alt="浮雕描述"></div>
    <div><h1 class="rl">標題<span class="cin">Latin subtitle</span></h1><p class="lede">…</p>
      <a class="btn" href="b.html">主要行動 <span class="cin">Go</span></a></div>
  </section>
  <section class="wrap"><div class="beads"></div><div class="tab"><h2><span class="cin">Catalogue</span>價目</h2>…</div></section>
</main>
<footer class="foot">…</footer>
<script>new TI.Plaque(document.getElementById('plaque'),{w:960,h:600,sway:1,layers:()=>SC.hero(false)});</script>
</body>
```

## 十二、技術實作與相容性

### 1. 原生 WebGL 片段著色器（A 渲染層）
- **承載**：特徵②（厚度→透光）與特徵①（平地＝原色、啞光）、signature 壓模、input 光源、ambient 垂花擺動。高度場以 RGBA 貼圖上傳（R＝靜態浮雕、另一張＝垂花），著色器做四鄰差分法線、六步硬影、雜湊砂粒。
- **支援度查證**：MDN `WebGLRenderingContext` 為 Baseline Widely available（自 2015-07）。著色器已用 glslang（@webgpu/glslang 0.0.15，轉成 GLSL 450 型別檢查）通過編譯驗證。
- **fallback**：`getContext('webgl')` 失敗或編譯失敗 → 同一套數學的 CPU 版寫進 ImageData（解析度＝高度場解析度、最多每 140ms 一張、關閉垂花擺動）；無 JS → `<img class="fb">` 是建置期用同一套 CPU 算好的 WebP（首頁 960×600、製章 480×600、館史三枚小章）。
- **效能**：建置期 node 實測高度場——首頁 960×600 共 17 層約 270ms、製章章 480×600 約 45–140ms，執行期以 `setTimeout` 分批每批 ≤10ms（單層最重約 24ms），不阻塞首屏；CPU 備援一張 960×600 約 70ms、480×600 約 33ms。GPU 端每像素約 22 次取樣，畫布寬上限 1400 裝置像素、DPR ≤2；不動時不重畫（垂花頁除外）。

### 2. DeviceOrientation（D 輸入與感測層，附游標替代）
- **承載**：「把章拿在手上轉」——手機傾角即光向。
- **查證**：MDN `DeviceOrientationEvent` Baseline Widely available（自 2023-09）、僅限安全環境；`DeviceOrientationEvent.requestPermission()` 非 Baseline、須使用者手勢（iOS Safari 14.5+ 支援，caniuse）。Chromium 2026-06 的 Intent to Ship 也朝「先請求權限」移動。
- **fallback**：`pointer:coarse` 才顯示「傾斜手機看光」按鈕；有 `requestPermission` 就在點擊時請求，拒絕或沒有感測器則改用手指拖曳（pointermove 同樣驅動光）。

### 3. CSS Shapes `shape-outside: ellipse()`（C 版面與樣式層）
- **承載**：館史頁三代小章以橢圓繞排內文——新古典書籍的橢圓肖像插圖版式，讓特徵④延伸到排版。
- **查證**：MDN `shape-outside` 與 `ellipse()` Baseline Widely available（自 2020-01）。
- **fallback**：不支援時退回矩形繞排；≤560px 取消浮動，小章置中。

### 4. 其他
- 一筆側臉的嵌入：使用者筆畫（≥6 點）依首尾點做相似變換貼到額點 A(152,58)／下巴點 B(128,176)，若鼻子在弦的另一側則沿弦鏡射；重取樣 20 點；鼻尖偏離弦不足 8 或超過 70 單位視為「看不出鼻子」。18 個內點 × 2 座標各 6 bit → 36 字元 base64url，可分享、可傳給第二個人畫「對面那一半」。
- 單號 FNV-1a（`TI-` 前綴 base36）。
