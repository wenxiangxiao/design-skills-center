---
name: nihonga-mineral-pigment
description: Taiwanese Tōyō-ga / Japanese Nihonga mineral-pigment painting as a web style — every colour field is visibly made of ground-mineral grains, lightness comes only from finer grain of the same mineral (never from adding white or opacity), each form is first outlined in an even ink line and then shaded inward from its own edge (kumadori) with no light source, on a silk ground mounted as a hanging scroll with brocade borders, vertical inscription and a carved red seal.
---

# 膠彩畫 Nihonga／臺灣東洋畫 —— 風格規格書

> 範例站：和昌號 南北貨（迪化街一段 172 號）。本規格書與產業無關：任何需要「被畫出來、有礦物質感、安靜而貴重」的品牌（茶、花、漢方、器物、料亭、藝廊、文具）都可以照做。

## 設計哲學

膠彩不是水彩也不是油畫。它的顏色是**磨碎的石頭**：群青是藍銅礦、緑青是孔雀石、辰砂是硃砂，和著動物膠一層一層刷在絹或麻紙上。這個材料只給你一條變淺的路——把同一塊石頭磨得更細。所以膠彩畫的調子是用**粒徑**組織的：五番最粗、最深、最閃；磨到「白」就幾乎是白的。網頁上重現這件事，比重現任何一張具體的畫重要。

1927 年臺灣美術展覽會（臺展）開辦，陳進、林玉山、郭雪湖三位十幾二十歲的「臺展三少年」以東洋畫入選，從此這個媒材在臺灣長出自己的題材：大稻埕的街、嘉義的蓮池、檳榔、木瓜、市場。郭雪湖〈南街殷賑〉（1930）畫的就是迪化街。戰後東洋畫一度被排擠，1970 年代林之助提出「膠彩畫」之名，沿用至今。

三條紀律：
1. **先線後色。** 每一個形都先有一條等寬的墨線（骨描／鐵線描），顏色填在線裡，永遠不蓋過線。
2. **沒有光源。** 不畫投影、不畫高光。立體感來自「隈取」——從形自己的邊緣往內暈深，任何一個形的四周都一樣暈。
3. **畫是掛起來的。** 頁面不是平面海報，而是一幅有表裝的掛軸，或一冊冊頁、一卷手卷——畫有物理邊界、有軸、會被捲起來。

## 本風格的 5 個不可省略特徵

拿掉任何一項，就不是膠彩了。

### 1. 顏色看得見顆粒，而且粗粒會閃

每一塊色面都是礦物粒子：深色處粒子大、會有零星的晶面反光；淺色處粒子細而均勻。平塗的 `fill` 不合法。

```html
<!-- 粗（五番、七番）、中（九番）、細（十一番、白）三支濾鏡；任何色面都必須套其中一支 -->
<filter id="iw-c" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="1" seed="5" result="n"/>
  <!-- 顆粒：雜訊分階 → 暗粒 -->
  <feComponentTransfer in="n" result="dk">
    <feFuncR type="discrete" tableValues=".3 .48 .66 .82 .93 1 1 1 1 1 1"/>
    <feFuncG type="discrete" tableValues=".3 .48 .66 .82 .93 1 1 1 1 1 1"/>
    <feFuncB type="discrete" tableValues=".3 .48 .66 .82 .93 1 1 1 1 1 1"/>
    <feFuncA type="linear" slope="0" intercept="1"/>
  </feComponentTransfer>
  <feBlend in="SourceGraphic" in2="dk" mode="multiply" result="g0"/>
  <feComposite in="g0" in2="SourceAlpha" operator="in" result="g"/>
  <!-- 晶面反光：只有雜訊最高的那一階亮起來 -->
  <feComponentTransfer in="n" result="gl">
    <feFuncR type="linear" slope="0" intercept="1"/><feFuncG type="linear" slope="0" intercept=".97"/>
    <feFuncB type="linear" slope="0" intercept=".9"/>
    <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 .5 .85 1"/>
  </feComponentTransfer>
  <feComposite in="gl" in2="SourceAlpha" operator="in" result="gl2"/>
  <feComposite in="gl2" in2="g" operator="over" result="g2"/>
  <!-- 特徵 4 的隈也在這支濾鏡裡，見下 -->
  …
</filter>
<!-- iw-m：baseFrequency 1.25、暗階 .55 起；iw-f：baseFrequency 1.9、暗階 .76 起、反光更少 -->
```

### 2. 明度＝粒徑：同一罐礦物五個番手，沒有「加白」

色票不是「主色＋淺色」，而是「礦物 × 番手」的矩陣。要淺一點就往右一格（同一罐、更細），要深就往左（更粗）。禁止 `opacity`、`color-mix(white)`、`filter:brightness` 來調淡。

```css
/* 礦物 × 番手（五番 七番 九番 十一番 白）——全站所有彩色只能從這 25 格取 */
--gunjo-5:#1E3C80; --gunjo-7:#33569E; --gunjo-9:#5A7BBB; --gunjo-11:#8FA8D4; --gunjo-w:#C0CFE9;   /* 群青 藍銅礦 */
--roku-5:#1D573E;  --roku-7:#337453;  --roku-9:#5A9674;  --roku-11:#94BFA0;  --roku-w:#C4DCC8;    /* 緑青 孔雀石 */
--shin-5:#8A2316;  --shin-7:#AC3D27;  --shin-9:#C66247;  --shin-11:#DA937D;  --shin-w:#ECC2B2;    /* 辰砂 */
--tai-5:#5E301B;   --tai-7:#83492C;   --tai-9:#A46A49;   --tai-11:#C49573;   --tai-w:#E0C1A6;     /* 岱赭 */
--odo-5:#8A6529;   --odo-7:#AD8740;   --odo-9:#C7A35D;   --odo-11:#DAC08A;   --odo-w:#EADBB7;     /* 黄土 */
--gofun:#F3ECDD; /* 胡粉（牡蠣殼）——唯一的白，自己就是一種顏料，不是「加白」 */
--ink:#24201C;   /* 墨，只給骨描與字 */
```
番手 0–1 用 `iw-c`、2 用 `iw-m`、3–4 用 `iw-f`。要「變深」就疊一層粗一號的同礦物（範例站貨帖頁 hover 的做法），不是換更暗的色相。

### 3. 骨描：等寬墨線先於顏色，略抖、不粗細變化

每個形都有一條 1–1.3px 的墨線（鐵線描），線寬恆定，不做書法式粗細；以極輕的位移濾鏡讓它像手畫。線永遠在色面上方。

```html
<filter id="kotsu" x="-3%" y="-3%" width="106%" height="106%">
  <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="2" result="t"/>
  <feDisplacementMap in="SourceGraphic" in2="t" scale="1.1" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<g fill="none" stroke="#24201C" stroke-width="1.15" stroke-linejoin="round" filter="url(#kotsu)">…</g>
```

### 4. 隈取：從形自己的邊緣往內暈深，沒有光源

立體感一律是「邊緣深、中心淺」，四周均勻，不偏任何方向；零投影、零高光、零 `drop-shadow` 在畫裡。做法是 SourceAlpha 減去自己的模糊，得到內緣帶，再以岱赭色 multiply。

```html
<feGaussianBlur in="SourceAlpha" stdDeviation="4" result="b"/>
<feComposite in="SourceAlpha" in2="b" operator="arithmetic" k2="1" k3="-1" result="edge"/>
<feFlood flood-color="#3B2214" flood-opacity=".55"/>
<feComposite in2="edge" operator="in" result="kuma"/>
<feBlend in="kuma" in2="g2" mode="multiply" result="g3"/>
<!-- 膠的邊：極低頻位移讓色面邊緣微微不齊 -->
<feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="1" seed="8" result="w"/>
<feDisplacementMap in="g3" in2="w" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>
```

### 5. 絹本與表裝：畫有邊界，邊界是布與軸；字直排，印是白文朱印

底不是「米白背景」，是看得到經緯的絹（3px 絹目），而且絹外面一定有表裝：中廻し（素色或小紋裂）、一文字（金襴細條）、天地、軸頭。題字直排，落款下方蓋一方白文印（朱底、字留白）。

```css
.silk{background-color:#E4D6B7;
  background-image:repeating-linear-gradient(0deg,rgba(150,128,88,.16) 0 1px,transparent 1px 3px),
                   repeating-linear-gradient(90deg,rgba(150,128,88,.13) 0 1px,transparent 1px 3px)}
.mount{background:#7E8B78 url("data:image/svg+xml,…小菱紋…");padding:22px 18px}   /* 中廻し */
.ichi{height:12px;background:url("data:image/svg+xml,…金襴…")}                        /* 一文字 */
.jiku::before,.jiku::after{background:radial-gradient(circle at 40% 35%,#C9C1AE,#7A7363 60%,#4A4539)} /* 軸頭 */
.vt{writing-mode:vertical-rl;text-orientation:mixed}
```
```html
<!-- 白文方印：朱底、字為紙色，印本身也要過一次中粒濾鏡（印泥也是顆粒） -->
<g transform="translate(30 262) rotate(1.5)">
  <g filter="url(#iw-m)"><rect x="-10" y="-10" width="20" height="20" rx=".8" fill="#B33A26"/></g>
  <text y="4.7" font-size="13.2" text-anchor="middle" fill="#F1E6D2" font-family="'LXGW WenKai TC',serif">秋</text>
</g>
```

## 色彩系統

| 角色 | 色 | 比例 | 用途 |
|---|---|---|---|
| 床の間壁 | `#4D5A52`（＋feTurbulence 灰泥紋） | ~45% | 頁面底色。畫是「掛在牆上」的，所以頁面本身是牆 |
| 絹 | `#E4D6B7` ＋絹目 | ~28% | 所有畫面與長文的底 |
| 中廻し | `#7E8B78`／深 `#6C7967` | ~10% | 表裝裂、冊頁外框、工具盒 |
| 胡粉 | `#F3ECDD` | ~6% | 牆上的文字、白色物件 |
| 墨 | `#24201C` | ~4% | 骨描、絹上正文 |
| 礦物 25 格 | 見特徵 2 | ~6% | 畫裡的顏色；介面強調色只從這裡取 |
| 朱印 | `#B33A26` | ≤1.5% | 印、現用頁題簽、價格旁標記 |
| 金 | `#B08F55`（金砂子）、金襴 `#8A6F3E` | ≤1% | 稀疏撒金與一文字；**不准**大面積金地（那是琳派，不是這個流派） |

對比：絹 `#E4D6B7` 上墨 `#24201C` 為 11.2:1；牆 `#4D5A52` 上胡粉 `#F3ECDD` 為 6.2:1、上註記色 `#D9D0BC` 為 4.7:1。

## 字體系統

- 題字、標題、印、題簽：**LXGW WenKai TC**（Google Fonts，楷體），700 給大標，400 給款識。
- 正文：**Noto Serif TC** 400／600。
- 不用無襯線、不用等寬數字。價格數字用楷體。
- 字級：直排店名 64–104px（clamp）、頁標 44–96px、區塊標 28–32px、正文 15–16px、註記 12–13.5px；行高 1.75（正文）、1.25（標題）。
- 直排一律 `writing-mode:vertical-rl`；兩位以下阿拉伯數字用 `text-combine-upright:all`；電話寫成國字（〇二・二五五三・〇四一七）。

## 版面與網格

- **首屏是一幅掛軸**：寬 300–480px 的直幅，偏離中心放（範例：三欄 `1fr | 480px | 1.1fr`，掛軸在中欄，左欄短文、右欄直排題跋）。不要置中大標。
- 掛軸結構由上而下：吊環三角繩 → 八双（9px 深木）→ 天（96px 裂＋兩條風帶，各 22px 寬，掛在 26% 與 74%）→ 一文字 → 絹本 → 一文字 → 地（120px）→ 軸棒（兩端軸頭外凸 8px）。
- 內頁：冊頁（兩欄，偶數葉下沉 70px）、手卷（橫向、可左右捲、兩端木軸）、色紙／短冊（小方塊與細長條）。
- 畫裡的留白至少 40%；物件之間不排網格，依「歲朝清供」構圖：一枝從上角斜入、一盆直立、器物在下，題字在左上直排。
- 旋轉：掛軸環境擺動 ±0.28°；印章 −3° 到 +1.5°；其餘不旋轉。

## 元件配方

- **導覽（題簽 rolled-scroll）**：右上角一根竹竿，四頁＝四卷捲起的掛軸（24px 高的圓筒漸層＋兩端軸頭＋一張胡粉題簽）。現用頁那一卷已展開：下方垂出 54px 的絹條（礦物色塊＋頁名＋軸棒），題簽翻成朱底。hover 未選的卷：左移 10px、旋轉 −1.2°、半展 12px。≤900px 落為底部四卷橫排。
- **按鈕**：墨底胡粉字楷體，`box-shadow:2px 3px 0 rgba(0,0,0,.25)`（硬邊，是紙板厚度不是光）；次要按鈕為墨框透明底。零圓角。
- **卡片＝冊頁一葉**：中廻し外框 16px → 絹本畫面 → 右側直排短冊（胡粉底、上下 6px 金條）→ 下方絹底資訊卡。
- **短冊標籤（tooltip）**：直排、胡粉底、上下金條、硬邊陰影，跟著游標。
- **表單**：輸入框胡粉底墨框楷體；送出即「落款蓋印」。
- **footer**：牆上，左側一方白文印，右側胡粉小字。

## 動效規則

| 種類 | 範例站實作 | 觸發 | 時間／曲線 | 減少動態時 |
|---|---|---|---|---|
| ambient 環境 | 掛軸隨室內氣流擺動（±0.28°）、風帶反相擺、金砂子明滅、地圖朱印上下浮 | 自動 | 9s／6.2s／5s／2.6s，ease-in-out，無限 | 全部停在靜止姿態 |
| input 輸入 | 題簽 hover 半展；畫中物件 hover 掛出短冊並上浮 1.5px；番手帖點格→放大鏡；貨帖 hover 疊粗一號；清供頁筆刷 | 指標／鍵盤 | 0.1–0.32s，`cubic-bezier(.2,.8,.2,1)`；筆刷每個 coalesced event 即時寫入 | transition 取消，回饋仍即時 |
| transition 轉場 | 掛軸由上往下展開（`clip-path:inset(0 0 100% 0)→0`），軸棒同時從頂端落下；冊頁捲到才展開；年貨單展開 | 載入／進入視窗／落款 | 1–1.15s，`cubic-bezier(.25,.75,.25,1)` | 直接完整顯示 |
| signature 簽名 | 〈撒粉〉：骨描先在，岩繪具一粒一粒落到絹上，大粒先、細粉後 | 載入後 1.25s | 約 3.5s（SMIL，各粒 0.22s） | 移除遮罩，直接是完成的畫 |

**本流派禁用**：淡入整塊（顏色只能一粒粒來）、視差、彈跳、任何會產生光源方向的動效（光掃、高光移動）。

## 插畫與圖像風格

- 技法：**岩繪具粒徑構成**——每個物件＝若干有機輪廓色面（Catmull-Rom 閉合曲線，半徑抖動 6–30%）＋若干線狀色（金針、蝦米、竹編）＋一組骨描線。色面依番手分組套濾鏡，**同一物件內相鄰同番手的連續色面合成一組**以省濾鏡、又不破壞上下順序。
- 題材：寫生的、具體的、有名字的東西（這一顆干貝、這一片烏魚子），不是圖示。
- 決定性：每個物件以 FNV-1a／mulberry32 種子生成，同種子恆得同一張畫；靜態頁在建置時烘成 SVG，無 JS 也看得到。
- 禁止：漸層填色、描邊粗細變化、投影、外發光、照片、等角透視、扁平圖示。

## Logo 與 Favicon 設計指南

- Logo：一幅小掛軸（中廻し外框＋絹＋上下金襴一文字），直排楷體店名，左下一方白文「和昌」印。
- Favicon：朱底方印，內框一圈紙色細線，中央一個「和」的簡化筆畫——16px 下仍是「一方印」。
- 印永遠微斜（−3°～+1.5°），永遠白文（朱底白字）。朱文印（白底朱字）留給次要落款。

## Do & Don't

**Do**
- 先畫線再上色；顏色永遠在線裡。
- 淺色＝同礦物更細的番手；深色＝疊粗一號。
- 頁面是牆，畫有表裝；資訊可以寫成直排題跋。
- 價格、產地、斤兩寫具體：「猿払干貝 2L 一斤 NT$3,980，約 42–46 顆」。

**Don't**
- 不要大面積金地與金雲（那是琳派）；不要漆黑底配金字（那是 Art Deco）。
- 不要用 opacity／加白調淡；不要任何漸層填色。
- 不要投影、高光、玻璃擬態、圓角卡片牆、紫藍漸層、emoji、置中大標＋兩顆按鈕。
- 不要「EST. 19xx」徽章；年代寫進故事裡（「昭和十一年臘月」）。
- 不要把濾鏡套在整頁上：濾鏡只給色面，字永遠清楚。

## 頁面骨架範例

```html
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <!-- iw-c / iw-m / iw-f / kotsu / kinume pattern -->
</defs></svg>
<nav class="daisen" aria-label="頁面">
  <div class="rail"></div>
  <ol>
    <li class="on"><a href="index.html" aria-current="page">
      <span class="tube"><i class="jiku l"></i><span class="slip">掛軸</span><i class="jiku r"></i></span>
      <span class="unroll"><span class="sw" style="--c:#5A7BBB"></span><b>店頭</b><i class="rod"></i></span></a></li>
    <!-- 其餘三卷 -->
  </ol>
</nav>
<main class="hall">
  <div class="intro">…短文與兩顆按鈕…</div>
  <div class="kake sway">
    <i class="hook"></i><div class="hassou"></div>
    <div class="unfurl">
      <div class="ten"><span class="futai l"></span><span class="futai r"></span></div>
      <i class="ichi"></i>
      <div class="naka"><div class="honshi"><svg viewBox="0 0 400 780">…畫…</svg></div></div>
      <i class="ichi"></i><div class="chi"></div>
    </div>
    <div class="jikubo unfurl-rod"></div>
  </div>
  <div class="daiba vt"><h1>店名</h1><p class="sub">業種</p><p class="meta">地址・時間</p></div>
</main>
</body>
```

## 技術實作與相容性

### A. SVG 濾鏡鏈（feTurbulence／feComponentTransfer／feBlend／feComposite／feGaussianBlur／feDisplacementMap）
- **現況**：MDN〈feTurbulence〉〈feComponentTransfer〉皆標 *Baseline Widely available*（2015-07 起跨瀏覽器）。`feBlend mode="multiply"`、`feComposite arithmetic`、`feDisplacementMap` 同為長期支援。HTML 元素以 CSS `filter:url(#id)` 引用頁內 SVG 濾鏡（題簽色塊、筆刷色樣）在 Chromium／Firefox／Safari 皆可。
- **查證來源**：https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence 、https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer
- **Fallback**：濾鏡失效時色面退為平塗、骨描仍在、所有字為 HTML 文字——資訊零損失，只失去顆粒。
- **注意**：`feBlend multiply` 的輸出 alpha 是兩者聯集，必須再 `feComposite operator="in" in2="SourceAlpha"` 裁回形內，否則每組都會變成一塊白方框（建站時實際踩到並修正）。濾鏡只套色面群組，不套整幅畫：範例首頁共 114 個小範圍濾鏡群組。

### B. SVG SMIL `<animate>`（簽名動效〈撒粉〉）
- **現況**：SMIL 在 Chromium、Firefox、Safari 皆支援（Chromium 2015 年曾宣布棄用後撤回）。`<animate attributeName="opacity" begin="1.4s" fill="freeze">` 放在 `<pattern>` 內的 `<circle>`，再以兩層不同週期（7 與 11 單位、後者旋轉 23°）的 pattern 疊成遮罩打破重複感；遮罩另含整幅骨描的白色副本，所以墨線始終可見。
- **刻意不做的做法**：在遮罩裡動畫 `feTurbulence`／`feFuncA intercept`——那會讓整幅畫每一幀重算雜訊，成本與畫面面積成正比；改用預先撒好的顆粒 pattern，只動 opacity。
- **Fallback／降級**：`prefers-reduced-motion` 或 4.2 秒後由 JS 移除 `mask` 屬性；無 JS 時 SMIL 自行跑完並以一張全白 rect 收尾（3.55s），畫面最終完整。不支援 SMIL 的環境下 opacity 停在 0 會看不到色——現存主流瀏覽器皆支援，若需保險可在 `<noscript>` 外以 JS 偵測 `SVGAnimateElement` 後才加遮罩。

### D. Pointer Events：`pressure`／`tiltX`／`tiltY`＋`getCoalescedEvents()`＋`setPointerCapture()`
- **現況**：MDN〈PointerEvent.pressure〉*Baseline Widely available*（2020-07 起）；規格明定不支援壓力的硬體（滑鼠）在按下時回報 0.5。`getCoalescedEvents()` 在 Chromium、Firefox 可用，Safari 17 以前不支援——程式以 `e.getCoalescedEvents?…:[e]` 偵測。
- **查證來源**：https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pressure
- **本站用法**：筆寬 = 5 + pressure × 20 px（換算到品項座標除以 `getScreenCTM().a`）；傾斜量 `hypot(tiltX,tiltY)/60` 把圓點拉成橢圓並轉到傾斜方向。觸控若回報 0 或 1 視為 0.5。每一點寫進「該品項 × 該番手」的 `<mask>`（遮罩內容以 feDisplacementMap 打毛邊）。覆蓋率以 `isPointInFill／isPointInStroke` 在品項自己的座標系 5 單位格點取樣。
- **Fallback**：不能拖曳的使用者用「替下一樣上彩」按鈕一次塗滿一層；`touch-action:none` 只加在畫布上，頁面其餘可正常捲動。

### 效能預算（建站環境實測／估算）
- 單頁大小（含全部 inline SVG／CSS／JS）：index 162KB、goods 131KB、paint 87KB、visit 46KB——皆 ≤350KB。
- 首屏 JS：index 只綁事件與一次 `offsetHeight` 讀取；paint 首屏不生成任何圖。繪製庫在 node 實測：10 種品項 × 三層上彩版本 × 100 次＝74ms，即單一品項三層 <0.1ms。
- 建站環境沒有可用的無頭瀏覽器，**未能實測 fps**；設計上的保護：環境擺動（CSS transform，合成層）延到撒粉結束（4.4s）後才開始，避免兩者疊加時讓濾鏡重繪；撒粉結束即移除遮罩；濾鏡只套小範圍色面群組。
