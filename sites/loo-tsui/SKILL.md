---
name: persian-miniature-safavid-folio
description: Persian miniature book painting in the Timurid–Safavid manner (Herat and Tabriz, c.1480–1600) applied to the web — stacked high-horizon space with no perspective, flat mineral colours under a gold-leaf or lapis sky, multi-coloured jadval rules framing four ruled text columns, cypresses and branches that grow out of the picture frame into gold-sprinkled margins, and every surface filled with tile, carpet, arabesque and sponge-rock ornament.
---

# 波斯細密畫・薩法維抄本頁 Persian Miniature Folio

> 範例站：露水園 LŌO-TSUÍ HN̂G（彰化田尾的大馬士革玫瑰園與銅釜玫瑰露蒸餾所，1982 年起）。風格不綁產業——任何「園、香、書、茶、手工、慢」的品牌都能用：茶行、香水工作室、花藝、果園、書店、陶瓷、地毯、甜點、婚禮、植物園、詩社、中東料理。

## 1. 設計哲學

波斯細密畫（negārgari）是抄本的插畫：它永遠住在一頁書裡，旁邊是詩、四周是界行。本規格書取的是兩個高峰的交會——帖木兒朝赫拉特畫院（Kamāl ud-Dīn Behzād，約 1450–1535，古典、節制、精確）與薩法維朝大不里士畫院（Sultan Muhammad 等，1520–40 年代《太美斯普王列王紀 Shahnameh of Shah Tahmasp》，759 頁、258 幅畫，奔放、色彩飽滿）。它長成這樣有四個原因：

1. **礦物顏料是平塗的**。青金石磨的群青、孔雀石綠、朱砂、鉛白、金箔、銀箔——貴而不可調和，所以一塊一個色，不做明暗。銀會氧化變黑，今天看到的黑灰色水池，當年是亮銀。
2. **空間是往上堆的**。沒有線性透視，遠的東西畫在上面、不縮小；地毯、水池、地磚用俯視畫，牆、人、樹用正視畫，同一畫面多個視點。地平線很高，天只剩上緣一條金。
3. **畫是書的一部分**。畫面被詩欄打斷，詩欄被金線雙欄（jadval）分成四欄；頁緣是另一張染色紙接上去的，灑金（zar-afshan）或描金花鳥。
4. **邊界是用來越過的**。畫師故意讓柏樹梢、旗、岩石、動物穿出畫框，長進頁緣——研究者稱之為「邊緣的機巧」（Courtauld《Immediations》No.21，2024 談《列王紀》〈Feast of Sadeh〉頁）。

一句話：**一頁華麗的書，裡面的世界往上長、往外長。**網頁就是那一頁。

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--margin` 頁緣玫瑰紙 | `#E5BFB3` | 頁面底（頁緣），上撒金點 | 30% |
| `--ivory` 象牙紙 | `#F2E8D0` | 文字欄、詩框底 | 30% |
| `--gold` 金箔 | `#C9A13B` | 白天的天、jadval 主線、陰刻 | 10% |
| `--gold-hi` 亮金 | `#E4C86E` | 灑金、islimi 蔓藤、夜星 | 2% |
| `--lapis` 青金石 | `#1F3B8C` | 標題框底、夜天、外框線 | 8% |
| `--mal` 孔雀石綠 | `#2F7D5B` | 草地（俯視）、灌叢 | 10% |
| `--mal-d` 深綠 | `#1E5A40` | 柏樹 | 2% |
| `--verm` 朱砂 | `#CF4630` | 外框最細一線、衣、火 | 2% |
| `--rose` 玫瑰紅 | `#C8283F` | 強調字、籤等級、玫瑰 | 2% |
| `--turq` 綠松 | `#3EA6A0` | 磚面、圓頂 | 2% |
| 岩石四色 | `#A28FC4 #EBA3A6 #D8A85A #8EA5B6` | 海綿岩：淡紫、粉、赭、藍灰輪替 | 1% |
| 銀／氧化銀 | `#AEB6B8` / `#56616A` | 水（白天亮銀、夜裡氧化） | 1% |
| 墨 | `#2A211C` | 文字、所有輪廓線 | — |

規則：**零漸層、零陰影、零透明疊色**（唯一例外是燈光般的 hover 底色變化）。天只有四種平色：拂曉牙白 `#EFE2C6`、白天金 `#C9A13B`、黃昏赭 `#D9893F`、入夜青金 `#1F3B8C`＋金點星＋銀月。

## 3. 字體系統

- **中文正文與標題**：`LXGW WenKai TC`（霞鶩文楷 TC，Google Fonts，400/700）——楷書帶筆意，代替抄本書法家的手。
- **波斯書法**：`Noto Nastaliq Urdu`（Google Fonts，400/700）——納斯塔利克（nasta'liq）懸掛體，波斯詩的正統書體。只用於短詞：章名、籤名、頁名（`<span lang="fa" class="fa">`）。
- **羅馬字小型大寫**：`Cormorant SC`（500/700）——標籤、頁碼、價格。
- 字級：本文 17px／行高 1.85；欄標 22px letter-spacing .24em；籤詩 19px；巨字只有籤名（波斯字 40px）。**不要巨型 hero 字**：細密畫頁的主角是畫，不是字。
- 對齊：欄內 `text-align: justify; text-justify: inter-character`（抄本的詩欄是撐滿的）。

## 4. 版面與網格

- **頁 = folio**：`main.folio` 是象牙紙，外面一圈四色 jadval（金 2px／墨 1.5px／青金 3.5px／朱 1.5px，以多重 box-shadow 疊出），再外面是玫瑰色頁緣＋灑金。頁緣左 70px、右 110px（右側留給 shamsa 導覽），**不對稱**。
- **四欄界行**：folio 本身是 grid：`rule | c1 | gutter | c2 | gutter | c3 | gutter | c4 | rule`。三條欄間金線（雙線 1.5px，間距 4px）是 `grid-row: 1/-1` 的元素，從頁首貫穿到頁尾。
- **每個區塊都是 subgrid**：段落、價目列、狀態列、表單都 `grid-template-columns: subgrid` 繼承同一組欄軌，所以欄線在整頁上下對齊。
- **畫打斷詩欄**：畫（`.paint`）跨 c1–c4，蓋在欄線上；畫裡的柏樹、樹枝、鳥穿出畫框長進頁緣（SVG `overflow: visible`，viewBox 比畫框大 70–120px）。
- **題頭 sarlawh**：每頁頂端一條青金石底 islimi 蔓藤帶，中間一個橢圓題框放標題。
- **尾題 colophon**：頁末用逐行縮短的倒三角文字收尾，最後一行是 `تمت`（tammat，「完」）。
- **接字 catchword**：頁左下角以 −8° 斜放下一頁的頁名，就是抄本的 rekābeh。
- 斷點：≤760px 收成 2 欄（4 個欄名對應到 2 欄軌）、≤560px 單欄，欄線隱藏，畫仍然破框。

## 5. 元件配方

**Nav（shamsa 太陽紋章）**：右上固定 84px 的 32 道光芒圓章（金／青金交替，中心 khatai 花），120 秒自轉一圈、hover 加速到 14 秒。下面垂掛四個拱頂小籤牌（上圓下方 `border-radius:32px 32px 6px 6px`），內容：波斯字＋直排中文頁名＋漢字序號；現頁＝青金底金字。≤760px 移到右下，點圓章展開。

```css
.sh-list a{width:64px;background:var(--ivory);border:1.5px solid var(--gold);outline:1px solid var(--ink);outline-offset:2px;border-radius:32px 32px 6px 6px}
.sh-list a span{writing-mode:vertical-rl;letter-spacing:.2em}
.sh-list a[aria-current]{background:var(--lapis);color:var(--ivory)}
```

**欄標（h2.cart）**：青金底、金邊、內嵌一道亮金細線，左波斯字右中文：`box-shadow: inset 0 0 0 3px var(--lapis), inset 0 0 0 4px var(--gold-hi)`。

**按鈕**：拱頂形 `border-radius:20px 20px 4px 4px`，青金底金邊；次要鈕象牙底。hover 換玫瑰紅底，不位移、不投影。

**價目表**：每列一個 subgrid（品項＋波斯名／規格／價格右齊 Cormorant SC 玫瑰紅／說明），列間 1px 半透明金線。

**詩框（vbox）**：2×2 格，中間金色直線分隔兩個半句——波斯詩的對句（beyt）兩半並列的版式。

**表單**：象牙底、1.5px 金框、零圓角；送出後的確認單排成倒三角尾題，蓋一枚玫瑰紅圓印（−8°）。

**Footer**：右下角小字，靠右對齊；與左下的接字對稱。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 內容 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 銅釜爐火 scale/skew 閃動；chi 雲 26–34s 左右漂；夜星 3.4s 明滅；shamsa 120s 自轉；冷凝管滴露 | 載入即持續 | flame 0.8–1.1s ease-in-out alternate | 全停，畫面維持靜態構圖 |
| input 輸入 | 游標 90px 內的玫瑰叢朝反方向傾斜（最多 9°）；夜鶯轉頭看游標；籤牌 hover 上抬 3px 歪 −2°；〈玫瑰籤〉撥書口時頁邊紙張依速度掀動 | pointermove（rAF 節流，<16ms） | .12s ease-out | 無位移；功能照常 |
| transition 轉場 | **書衣闔上再翻開**：點站內連結，兩片烙金皮革書衣（中央 shamsa 橢圓章、四角 lachak 角花）從兩側 rotateY 闔上，換頁後再翻開 | 站內 `.html` 連結 | .62s cubic-bezier(.6,0,.3,1) | 書衣不出現，直接換頁 |
| signature 簽名 | **破框生長**：柏樹從畫中升起刺穿上框、開花枝與玫瑰枝依 L-system 世代一代一代長出畫框進入頁緣，最後夜鶯從框內飛出停在框外枝頭 | 首頁載入、地圖載入、每次〈玫瑰籤〉開書 | 每代 .5s、代間 .32s，cubic-bezier(.2,.9,.3,1.3) | 直接呈現長好的完成態 |

自我限制：**不用淡入當簽名、不用視差、不用 stroke-dashoffset 描線**——細密畫的東西是「長出來」或「畫上去」的，不是「浮現」的。

## 7. 插畫與圖像風格（persian-miniature-register 堆疊視域細密畫）

全部以程序產生的 inline SVG 組成，原語如下：
- **海綿岩**：圓滑多瓣輪廓（極座標雜訊）＋2–3 道內輪廓＋5 個深色孔洞；淡紫／粉／赭／藍灰輪替，沿地平線排一列。
- **chi 雲**：中國傳入的帶狀捲雲，白底、群青描邊（夜裡改亮金）。
- **柏樹**：火焰形深綠，表面短弧鱗片；常與開花樹交纏。
- **開花樹／玫瑰枝**：L-system（F→F[+F][−F]，帶種子抖動），白五瓣小花或紅玫瑰在枝端。
- **磚面**：8 角星＋十字（khatam）girih 平鋪 pattern；亭子正面、拱券內。
- **地面**：孔雀石綠＋小草叢花點（俯視的「千花地」）。水渠：銀底魚鱗波紋，俯視成十字。
- **人物**：長袍、腰帶、小頭，不隨遠近縮小；本站換成戴斗笠的採花人——細密畫向來畫當代人。
- **蔓藤 islimi**：波狀主莖＋每個波峰捲出一支對數螺旋鬚＋鬚端 khatai 花＋分裂棕櫚葉；用於題頭帶。

## 8. Logo 與 Favicon

Logo：一個金框青金方塊（畫）裡，柏樹的尖穿出上框；右側楷書「露水園」、Cormorant SC「LŌO-TSUÍ HN̂G」、玫瑰紅納斯塔利克「گلاب‌خانه」。Favicon：64px 版本，玫瑰紙底、金框、青金天、柏樹、一朵玫瑰、銀色水線。破框是識別的一部分——縮小也要保留。

## 9. Do & Don't

- **Do**：遠的往上畫、不縮小；每個平面都有圖樣；畫一定要至少一處破框；文字一定在界行欄裡；頁緣一定是另一種顏色的紙。
- **Don't**：線性透視、投影陰影、漸層天空、照片、圓角卡片、模糊陰影、紫藍漸層 hero、emoji icon、置中大標＋兩顆按鈕、Lorem ipsum、EST. 徽章。
- **Don't**：把它做成「阿拉伯風」大雜燴（清真寺剪影、新月、駱駝）。細密畫是書與園，不是觀光海報。
- **Don't**：用納斯塔利克排長段文字（讀者讀不懂），只用在短的名稱上，並給 `lang="fa"`。

## 10. 本風格的 5 個不可省略特徵

拿掉任何一項，就不再是波斯細密畫頁。

### ① 堆疊視域：高地平線、遠的往上、多視點、零透視

天只佔上緣約 20%，地面從 y≈150 開始一路鋪到底；亭子、樹叢、人都不縮小，只是位置往上。水渠與地毯是俯視矩形，亭子是正視立面——同一張圖兩種視點。

```svg
<rect class="sky" width="600" height="240" fill="#C9A13B"/>          <!-- 金天，會被地面蓋住只剩上緣 -->
<rect y="150" width="600" height="610" fill="url(#meadow)"/>          <!-- 高地平線 -->
<rect class="water" x="270" y="430" width="60" height="330" fill="url(#wt)"/> <!-- 水渠：俯視 -->
<rect x="200" y="182" width="360" height="212" fill="url(#girih)"/>   <!-- 亭子：正視 -->
```

### ② 礦物平塗＋金天銀水

每一塊顏色都是不透明平色，金色是天、銀色是水，岩石用四種粉彩輪替。

```css
.mini *{filter:none}                      /* 不准陰影 */
.sky{fill:#C9A13B}                        /* 白天：金箔 */
html[data-sky=night] .sky{fill:#1F3B8C}   /* 入夜：青金石＋金點星 */
.water{fill:url(#wt)}                     /* 銀底 #AEB6B8 + 白色魚鱗波 */
```

### ③ jadval 四色框線＋四欄界行（subgrid）

```css
.folio{display:grid;grid-template-columns:[f-s] 14px [c1-s] 1fr [c1-e] 22px [c2-s] 1fr [c2-e] 22px [c3-s] 1fr [c3-e] 22px [c4-s] 1fr [c4-e] 14px [f-e]}
.folio>.page-bg{grid-column:f-s/f-e;grid-row:1/-1;background:#F2E8D0;
  box-shadow:0 0 0 2px #C9A13B,0 0 0 3.5px #2A211C,0 0 0 7px #1F3B8C,0 0 0 8.5px #CF4630}
.folio>.rl{grid-row:1/-1;justify-self:center;width:7px;border-left:1.5px solid #C9A13B;border-right:1.5px solid #C9A13B}
.rl.g1{grid-column:c1-e/c2-s}.rl.g2{grid-column:c2-e/c3-s}.rl.g3{grid-column:c3-e/c4-s}
.panel{grid-column:f-s/f-e;display:grid;grid-template-columns:subgrid}
```

畫框則以 SVG 四層 rect：金 5px／墨 1.2px／青金 2.2px／朱 1px。

### ④ 破框：畫裡的東西長進灑金頁緣

SVG 的 viewBox 比畫框大，畫框內容用 clipPath 裁切，破框物另起一組不裁切的 `<g>`。

```svg
<svg viewBox="-70 -120 740 1000" style="overflow:visible">
  <clipPath id="fr"><rect width="600" height="760"/></clipPath>
  <g clip-path="url(#fr)"> …天、地、亭、園… </g>
  <rect x="-3" y="-3" width="606" height="766" fill="none" stroke="#C9A13B" stroke-width="5"/>
  <g class="breakout"> <!-- 柏樹 y:340→-80、玫瑰枝伸出右框、夜鶯停在框外 --> </g>
</svg>
```

```css
html{background:#E5BFB3 url("data:image/svg+xml,…灑金多邊形…") repeat;background-size:360px}
```

### ⑤ 滿版母題：磚、毯、蔓藤、海綿岩、柏樹與開花樹

```svg
<pattern id="girih" width="22" height="22" patternUnits="userSpaceOnUse">
  <rect width="22" height="22" fill="#2B53A6"/>
  <path d="M11 3.2L18.8 11 11 18.8 3.2 11Z M5.5 5.5H16.5V16.5H5.5Z" fill="#3EA6A0" stroke="#FBF6EA" stroke-width="1.1"/>
  <circle cx="11" cy="11" r="2.6" fill="#FBF6EA"/>
</pattern>
```

海綿岩：`blob()` 極座標雜訊輪廓＋3 道內輪廓＋5 個 `fill-opacity:.55` 墨色孔洞；islimi：波狀主莖每個波峰捲出 22 段、每段轉 0.32rad 半徑 ×0.9 的對數螺旋，端點放 khatai 花。

## 11. 頁面骨架範例

```html
<main class="folio">
  <div class="page-bg"></div><i class="rl g1"></i><i class="rl g2"></i><i class="rl g3"></i>
  <header class="sarlawh"><svg class="sl-band">…islimi…</svg>
    <div class="sl-cart"><b class="fa" lang="fa">گلاب‌خانه</b><h1>露水園</h1></div></header>
  <figure class="paint growing"><svg class="mini" viewBox="-70 -120 740 1000">…</svg></figure>
  <h2 class="cart"><span class="fa" lang="fa">دیباچه</span>園誌</h2>
  <div class="panel cols"><p class="c1">…</p><p class="c2">…</p><p class="c3">…</p><p class="c4">…</p></div>
  <p class="colophon"><span style="width:96%">…</span><span style="width:58%">…</span><span style="width:20%" lang="fa">تمت</span></p>
  <a class="catch" href="next.html"><span lang="fa">گلاب</span><span>次葉・露與花</span></a>
</main>
<nav class="shamsa">…</nav>
<div class="cover"><div class="bd l">…</div><div class="bd r">…</div></div>
```

## 12. 技術實作與相容性

**① CSS Grid subgrid（C 版面層）——承載特徵 ③**
四欄界行要「從題頭到頁尾都對齊」，但段落、價目列、狀態列、表單是各自獨立的元件；subgrid 是唯一能讓巢狀元件繼承父層欄軌的 CSS 機制，所以三條欄線（folio 層級的 `grid-row:1/-1` 元素）在每個元件邊上都準確落在欄間。查證：web.dev〈Baseline 2023〉列 subgrid 為 Baseline 2023（Chrome/Edge 117、Firefox 71、Safari 16）；caniuse `mdn-css_properties_grid-template-columns_subgrid` 顯示現行各大瀏覽器皆支援，2026 年已屬 Widely available。Fallback：`@supports not (grid-template-columns:subgrid)` 時 `.panel` 改用與 folio 相同的固定軌道清單——因為所有欄都是 `minmax(0,1fr)`、gutter 為固定 px，欄位位置完全一致，視覺零差異。

**② 決定性程序化紋樣生成（E 資料與生成層）——承載特徵 ①④⑤ 與簽名動效**
一支約 12KB 的 `gen.js`：xorshift32 PRNG、極座標雜訊輪廓（海綿岩、灌叢）、F→F[+F][−F] L-system 枝條（每段帶世代序 `--o`）、islimi 對數螺旋蔓藤帶、girih 8 角星／六角地磚／魚鱗水 pattern、柏樹、斗笠人物、銅釜與冷凝瓶。同一份程式碼在 build 時以 node 跑一次，把首頁、品項頁、地圖的畫以靜態 SVG 寫進 HTML（無 JS 也看得到完整的畫與破框）；〈玫瑰籤〉在瀏覽器執行同一份 `SCENE()`，依籤詩的母題（天色、亭子有無、人數、枝條是玫瑰／開花樹／石榴）即時組一張新畫。實測 node 22 上 `SCENE()` 平均 3.1ms／張。L-system 世代序直接成為簽名動效的 `animation-delay: calc(var(--o)*.32s)`——長出來的順序就是文法展開的順序。

**③ Intl.DateTimeFormat（Asia/Taipei）＋ matchMedia 時間驅動（B 時間軸層）——承載特徵 ②**
`new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',hourCycle:'h23',…}).formatToParts()` 取得田尾當地時刻，寫入 `html[data-sky]`：05–07 拂曉牙白天、07–17 金天、17–19 赭天、19–05 青金天＋金星＋銀月＋氧化銀水；月份寫入 `data-season`，首頁狀態列與十二月曆據此顯示「花期第幾天／距花期幾天」與營業狀態。`?t=night` 可預覽。查證：MDN `Intl.DateTimeFormat` 與 `formatToParts` 皆 Baseline Widely available；`matchMedia('(prefers-reduced-motion: reduce)')` Widely available。Fallback：無 JS 時天色固定為白天金天，資訊不缺。

**效能預算實測**：index.html 168KB（含靜態 SVG 801 個 path）、golab 94KB、fal 81KB、visit 112KB，皆 <350KB；外部資源僅 Google Fonts。首屏 JS：天色／狀態列計算 <2ms，游標互動以 rAF 節流、getBBox 快取；〈玫瑰籤〉開書時生成畫 ≈3ms＋插入 DOM。動畫只用 transform／opacity（爐火、雲、枝條生長、書衣），無 layout thrashing。

**本站首創**：破框生長——以 L-system 世代序驅動、讓畫中植物長出畫框進入頁緣的簽名動效；以及「翻書口取 fāl」互動：按住默念填滿金圈→沿書口撥頁（指標速度驅動頁碼）→放手開書，對頁由程序依籤詩母題即時組成一張細密畫。
