---
name: sachplakat-object-poster
description: Sachplakat / Plakatstil (Lucian Bernhard, Berlin 1906–1914) — one product drawn huge in a few flat lithographic planes with no outlines, on a single saturated solid ground, with the brand name as the only word, hand-lettered in heavy block letters; nothing else on the sheet but the artist's monogram and the printer's imprint, made to be read in one glance from a passing tram.
---

# 德國物件海報 Sachplakat／Plakatstil

> 範例站：大川膠鞋 Tuā-tshuan Rubber（臺南永康膠鞋廠）。本規格與產業無關——任何「賣一樣看得見的東西」的品牌都能用：火柴、鞋、打字機、咖啡豆、自行車、藥膏、鋼筆。

## 1. 設計哲學

**年代與地域**：柏林，1906–1914（延續到 1920 年代的慕尼黑與維也納）。
**起點**：1906 年 Priester 火柴舉辦海報比賽，二十出頭的 Lucian Bernhard 交出一張只有「兩根火柴＋一行 PRIESTER」的畫。評審把它丟進紙簍，晚到的印刷商兼業務 Ernst Growald（柏林 Hollerbaum & Schmidt 印刷廠）把它撿出來——Bernhard 得獎，Growald 隨後替這種畫法找來一整批畫家：Hans Rudi Erdt（Opel）、Julius Klinger、Julius Gipkens、Ludwig Hohlwein（慕尼黑，較繪畫性的一支）。Bernhard 1908 年替 Carl Stiller 鞋廠畫的海報（V&A、MoMA 皆有藏）是同一套規矩用在鞋上：一隻鞋，一個名字。
**名稱**：Sachplakat＝物件海報；Plakatstil＝海報風格，美國收藏界的通稱。
**為什麼長這樣**：
1. **讀者在移動**。1855 年 Ernst Litfaß 在柏林立起第一批一百根廣告柱；半世紀後柱上擠滿新藝術花邊與十行字，從電車上看過去只是一團顏色。物件海報為「一兩秒的一瞥」而設計。
2. **石版印刷的限制**。每一個顏色要一塊石頭、跑一次機，所以三到四色是成本上限；畫家把字和物件**直接畫在石上**（V&A 對 Stiller 海報的描述），字因此是手繪的、帶有方塊感，而非排版。
3. **商品的品牌化**。工業量產讓同一種東西有好幾家在賣，要記住的不是「火柴」而是「Priester」，所以畫面上唯一的字就是牌名。

一句話：**一件東西、一個名字、一塊底色——其他的都用底色蓋掉。**

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，它就會滑向別的風格（新藝術、裝飾藝術、普普、孟菲斯、瑞士國際主義）。

### 特徵 1｜形狀語彙：一件商品、巨大、只由平塊組成、零輪廓線
畫面上只有一件商品，佔畫面寬度 70% 以上，可以出血裁切。形由 3–5 個平色塊拼成：受光面、暗面、內側（開口）、底；**塊與塊的交界就是邊，沒有任何描線**。暗面不是陰影，是「另一罐墨」。

```svg
<!-- 一隻拖鞋＝鞋底側面＋鞋底頂面＋鞋帶＋鞋帶內側，四塊，零 stroke -->
<g>
  <path fill="#86AEDB" d="M54 350C54 328 110 318 204 316C296 314 350 324 350 344L350 370C350 390 296 398 204 400C110 402 54 396 54 376Z"/>
  <path fill="#ECE2C8" d="M54 350C54 328 110 318 204 316C296 314 350 324 350 344C350 362 296 370 204 372C110 374 54 372 54 350Z"/>
  <path fill="#1C3C8C" d="M168 356C162 292 204 244 262 242C318 240 344 290 338 350C300 358 214 362 168 356Z"/>
  <path fill="#1B1714" d="M168 356C164 306 186 266 226 250C206 282 200 318 206 360Z"/>
</g>
```

### 特徵 2｜色彩規則：一塊飽和實地＋三到四罐石印平色，零漸層零陰影零透明
整張海報的地是**一個**飽和的實色（朱、群青、鉻黃、柱綠、牛血紅、石墨黑、紙白之一）；商品與牌名再用三到四罐墨。商品的主色與地色在 OKLab 的色差 ΔE 必須 ≥ 0.18，否則三十公尺外就融進地裡（本站〈刷〉以此判定）。

```css
:root{ /* 七罐石印墨：地與物都只能從這裡挑 */
  --paper:#ECE2C8; --black:#1B1714; --verm:#D2381C; --chrome:#EFB020;
  --ultra:#1C3C8C; --oxblood:#5C1A15; --sky:#86AEDB; --green:#2C5A3C; --grey:#B8B09C;
}
.poster{background:var(--verm)}              /* 地：一個實色，無漸層 */
.poster *{box-shadow:none!important;opacity:1!important;filter:none!important}
```

### 特徵 3｜字體：唯一的字是牌名，手繪粗方塊字
海報上沒有標語、價錢、電話、地址。牌名用粗、方、略帶手感的字**畫出來**（SVG path），不是用字型排出來；中文同理——筆畫拉直成矩形與斜方塊。網頁正文可用 Noto Sans TC 500/900，Latin 標籤用 Bowlby One（Google Fonts）呼應 Bernhard 的粗方塊字。

```svg
<!-- 「大川」：七個多邊形，無字型依賴 -->
<svg viewBox="0 0 200 100"><g fill="#ECE2C8">
 <path d="M6 30H94V45H6Z"/><path d="M42 4H58V45H42Z"/><path d="M42 45H58L26 96H6Z"/><path d="M52 52L64 41L98 96H78Z"/>
 <path d="M114 4H130L128 56Q124 80 108 96H92Q110 76 113 56Z"/><path d="M144 14H160V86H144Z"/><path d="M176 4H193V96H176Z"/>
</g></svg>
```

### 特徵 4｜版面：二元構圖，物＋名，其餘是空的地
直式（5:7）。牌名一條帶在上（或在下），商品佔中央到底；兩者之外**至少 40% 是空的地**。不置中對稱也可以——Bernhard 的火柴是斜的，Stiller 的鞋偏一側。網頁上延伸為：**每個區塊就是一張海報**，區塊底色＝該海報的地色，說明文字用牌名的顏色寫在海報旁邊，不寫在海報裡。

```css
.shoe{display:grid;grid-template-columns:minmax(260px,46%) 1fr;background:var(--sg);color:var(--sf)}
.shoe:nth-of-type(even){grid-template-columns:1fr minmax(260px,46%)}
.shoe .pv svg{display:block;width:100%;height:auto} /* 海報無框、無陰影，與區塊同地色 */
```

### 特徵 5｜裝飾母題：沒有裝飾——只有畫家花押、印刷所印記，以及「被貼著」
唯一允許的附件：右下角一枚方框單字花押、底邊一行極小的印刷所印記（「石印・大川印刷部・臺南永康　No.1」）。海報永遠以「貼在柱上／牆上」的狀態出現：網頁導覽是一排貼著、角落翹起的小海報；首頁是一根廣告柱。

```svg
<g fill="#ECE2C8"><rect x="356" y="520" width="26" height="26" fill="none" stroke="#ECE2C8" stroke-width="2"/>
<text x="369" y="539" font-size="14" font-weight="900" text-anchor="middle">宥</text>
<text x="18" y="548" font-size="9" letter-spacing="1">石印・大川印刷部・臺南永康　No.1</text></g>
```

## 3. 色彩系統

| 墨 | hex | 用途 | 比例 |
|---|---|---|---|
| 朱 Vermilion | `#D2381C` | 地（藍白拖海報）、警示帶 | 地時 60–70% |
| 群青 Ultramarine | `#1C3C8C` | 地（白雨鞋）、〈刷〉頁底 | 同上 |
| 鉻黃 Chrome | `#EFB020` | 地（工作雨鞋）、鞋頁底、強調 | 同上 |
| 柱綠 Column green | `#2C5A3C`／柱身 `#24402F` | 地（童鞋）、廣告柱、導覽列 | — |
| 牛血紅 Oxblood | `#5C1A15` | 首頁底（呼應 Priester 的深底） | — |
| 石墨黑 | `#1B1714` | 地（廠頁）、物件暗面 | — |
| 紙白 | `#ECE2C8` | 物件受光面、牌名、正文 | — |
| 淺藍／灰 | `#86AEDB`／`#B8B09C` | 只當物件的第二塊面 | ≤10% |

規則：每頁一個地色；一張海報至多 4 罐墨＋地；地色與物件主色 ΔE(OKLab) ≥ 0.18。

## 4. 字體系統

- 牌名：手繪 SVG 多邊形（見特徵 3），不用字型。
- 標題：Noto Sans TC 900，`clamp(32px,5vw,84px)`，行高 1.15。
- 正文：Noto Sans TC 500，16px／1.75。
- Latin 標籤與數字：Bowlby One，13–15px 大寫、字距 .1em；價格 `clamp(28px,3.4vw,44px)`。
- 禁止：細體、斜體、襯線、任何字效（描邊、陰影、漸層字）。

## 5. 版面與網格

- 左側 92px 導覽欄（≤560px 改為底欄 76px）。
- 首頁兩欄 36%／64%：左為廣告柱（底部對齊、出到視窗底），右為牌名與一句話。
- 商品頁：每款一個全寬區塊，海報與說明左右交替；海報緊貼區塊邊緣（出血）。
- 留白規則：海報內 ≥40% 空地；頁面區塊間不用分隔線，**換地色就是分隔**。
- 旋轉角度：只有導覽小海報 −3°／+2.4°（「貼歪了」），其他一律 0°。

## 6. 元件配方

- **導覽（小海報側欄）**：每頁一張 5:7 小海報（地色＋一個 900 字），未選者旋轉並以 `clip-path` 切出翹角、`::after` 露出紙背；hover 翹得更高；現用頁平貼、左側鉻黃標記。
- **按鈕**：實地矩形、0 圓角、無陰影；主要＝鉻黃地黑字，次要＝3px inset 外框。
- **卡片**：不存在。用「一張海報＋旁邊的字」取代。
- **表格**：只有 3px 底線，無直線、無底紋。
- **表單**：本站無；若需要，輸入框為紙白實地、3px 黑底線。
- **頁尾**：柱綠地，左側一根小廣告柱（同樣可拖、會慢轉），右側三欄資訊。

## 7. 動效規則

| 種類 | 內容 | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient | 廣告柱慢轉（首頁 7.5°/s、頁尾 12°/s），面向光的柱面分三階平亮度 | 載入即開始 | rAF 連續 | 停轉；拖曳與方向鍵仍可轉 |
| input | 拖柱（慣性 `v*=0.06^dt`）；〈刷〉筆刷即時落在雜物上；導覽 hover 翹角 | pointer／鍵盤 | <16ms 回饋；翹角 .18s | 慣性保留（是控制不是裝飾），翹角無過渡 |
| transition | 貼海報：新頁由上往下 `clip-path` 刷開＋一條墨色刷桿跟著下降；離頁時新頁地色由上往下蓋下；〈刷〉換張同法 | 換頁／換訂單 | .62s／.38s `cubic-bezier(.6,0,.2,1)` | 無動畫，直接切換 |
| signature | **電車一瞥**：柱子在 1.2 秒內從電車窗外掠過，水平動態模糊，窗框是黑色平塊 | 「坐電車經過」 | 1.2s 線性（電車等速）；慢速重播 4.8s 無模糊 | 柱子靜止置中、縮為 0.42 倍代表三十公尺外，判讀文字相同 |

自我限制：不用淡入、不用彈跳、不用視差捲動——Sachplakat 的世界裡唯一在動的是讀者。

## 8. 插畫與圖像風格

技法「平塊物件構成 flat-plane object」：
1. 先畫剪影，再把剪影切成受光／暗面／內側／底四塊；
2. 每塊只填一罐墨；
3. 物件可以大到出血；
4. 不畫地面、不畫投影、不畫背景物——**背景物是被刷掉的東西**；
5. 細節（鞋帶孔、鞋底條紋）用最暗那罐墨的小平塊，不用線。

## 9. Logo 與 Favicon

- Logo：朱紅地＋紙白「大川」方塊字＋底部一條黑帶（`assets/logo.svg`）。
- Favicon：32×32 朱地、紙白「大川」縮小版，inline SVG data URI。
- 原則：Logo 本身就是一張最小的物件海報——名字就是物件。

## 10. Do & Don't

**Do**：一頁一個地色；物件巨大；牌名用畫的；讓使用者「看見被刪掉的東西」（本站〈刷〉）；真實可信的價格、地址、人名。
**Don't**：
- 不要在海報上寫標語、價錢、電話（那是本站〈刷〉要你刷掉的東西）；
- 不要描邊、陰影、漸層、半透明；
- 不要新藝術的鞭形曲線與花邊（那是 Sachplakat 要取代的對象）；
- 不要裝飾藝術的放射扇與鍍金；不要普普的網點；
- 去 AI 化禁令：禁紫藍漸層、禁置中大標＋兩顆按鈕＋三張圓角卡片、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章。

## 11. 頁面骨架範例

```html
<nav class="rail" aria-label="頁面">
  <a class="bill" href="index.html" style="--bg:#5C1A15;--bf:#ECE2C8" aria-current="page"><span class="sheet">柱</span><small>Column</small></a>
  <a class="bill" href="shoes.html" style="--bg:#EFB020;--bf:#1B1714"><span class="sheet">鞋</span><small>Shoes</small></a>
</nav>
<main>
  <section class="shoe" style="--sg:#D2381C;--sf:#ECE2C8">
    <div class="pv"><!-- 海報 SVG：地 rect＋物件平塊＋牌名 path＋花押與印記 --></div>
    <div class="tx"><p class="no">No.1</p><h2>藍白拖</h2><dl><dt>一雙</dt><dd>NT$129</dd></dl></div>
  </section>
</main>
```

廣告柱：

```html
<div id="col"></div>
<script>new Column(document.getElementById('col'), [svgA,svgB,svgC,svgD], {n:32});</script>
```

## 12. 技術實作與相容性

### 12.1 CSS 3D：`transform-style: preserve-3d` 廣告柱（A 渲染層）
- **承載**：特徵 5「被貼著」與首頁開場、頁尾 ambient、簽名〈電車一瞥〉。四張海報先串成一條 1600×560 的 SVG 長條（data URI，存成 `--strip` 自訂屬性），柱身由 N 片（首頁 32、頁尾 20、電車 24）寬 `2R·tan(π/N)` 的面組成，每片 `rotateY(i·360/N) translateZ(R)`，以 `background-position` 取長條的第 i 段；外層 `translateZ(-R) rotateY(a)` 旋轉。柱面依 cos 角分三階 `brightness()`——用階而非連續明暗，維持石印「平塊」。
- **查證**：MDN〈transform-style〉Baseline Widely available（2015-09 起）；caniuse `preserve-3d`：Chrome 12+、Firefox 10+、Safari 4+、Edge 12+，IE 不支援。MDN 註明此屬性不繼承，需設於每個非葉節點——本站只有 `.spin` 一層。
- **注意**：祖先不得有 `overflow:hidden`、`filter`（除了簽名的模糊是加在整個 3D 情境之外的 `.tcol`）或 `opacity<1`，否則被壓平。
- **fallback**：無 JS 時 `.litfass` 不生成，首頁顯示四張平面海報；不支援 3D 時柱面退化為平面條，仍可拖曳與點選。

### 12.2 Pointer Events＋`setPointerCapture()`＋`getCoalescedEvents()`（D 輸入與感測層）
- **承載**：拖柱（含慣性）、〈刷〉的筆刷——每一個合併事件點都加入 `<path>` 的 `d`，同時在 50×70 的格上蓋章；筆刷所在的 `<g class="ov">` 以「剩下雜物的聯集」為 `<mask>`，所以商品與牌名天生刷不到（它們在遮罩之上另一層）。`color` 屬性＋`stroke="currentColor"` 讓已刷的筆觸在換底色時一起換。
- **查證**：MDN〈Element.setPointerCapture()〉Baseline Widely available（2020-07 起）；`getCoalescedEvents` 無則退回單一事件（本站已判斷）。
- **fallback**：點一下＝自動來回刷一遍（鍵盤／輔助科技可用「重來這張」與底色按鈕；海報狀態以文字清單同步呈現）。

### 12.3 30 公尺視距量測：SVG→`<canvas>` 下採樣＋OKLab ΔE（E 資料與生成層）
- **承載**：特徵 2 的色彩規則被寫成判定函式。按「坐電車經過」時，把「只有商品」與「只有牌名」兩層各自畫進 40×56 的 canvas（一張 5:7 海報在三十公尺外約佔的視角解析度），`getImageData` 逐點換算 OKLab，與地色 ΔE < 0.18 的點視為「跟底混在一起」，超過兩成即不准印。雜物格表也用同法（每樣雜物先點陣成 50×70 格），刷到 88% 才算刷掉。
- **查證**：MDN〈CanvasRenderingContext2D.getImageData()〉Baseline Widely available；以 data: URI 載入、不含 `<foreignObject>` 的 SVG 在 Chrome／Firefox 不汙染 canvas。舊版 Safari 可能拋 SecurityError——本站 `try/catch` 後改以「物件色票 vs 地色」估算並明示「以色票估算」。OKLab 依 Björn Ottosson 2020 公開矩陣實作。
- **門檻來源**：以七罐墨兩兩實算（紙白×鉻黃 0.17、紙白×灰 0.16、黑×牛血紅 0.15 皆判為分不開；朱×群青 0.35 可讀）。

### 12.4 簽名的動態模糊
SVG `<feGaussianBlur stdDeviation="16 0">`（只模糊 x 軸），以 CSS `filter:url(#mblur)` 套在電車場景的柱子容器上。MDN：`stdDeviation` 兩值語法 Baseline Widely available（2020-01）。若瀏覽器不支援 HTML 元素上的 url() 濾鏡，則柱子清晰地掠過，資訊不變。

### 12.5 效能實測（建置環境 jsdom 估算，非實機）
| 頁 | 單檔大小 | 首屏腳本執行 |
|---|---|---|
| index.html | 42.0 KB | 19.0 ms |
| shoes.html | 36.6 KB | 5.3 ms |
| paintout.html | 39.9 KB | 14.6 ms |
| factory.html | 30.7 KB | 5.2 ms |

皆遠低於 350KB／100ms 預算。柱子每幀只改一個 `transform`，面的亮度只在跨階時改 class（每轉一圈約 6×N 次），無 layout thrashing。
