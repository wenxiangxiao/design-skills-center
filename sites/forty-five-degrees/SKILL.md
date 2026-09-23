---
name: am-halftone-cmyk
description: Four-colour AM halftone printing as a web style — every tone is a dot of variable area on a fixed screen, four process inks at fixed screen angles (C15 M75 Y0 K45) multiplied onto newsprint into rosettes, type always solid K100 and never screened, one image always shown at two scales (print size and enlarged until the dots can be counted), and the printer's control bar, dot ramps and misregistration as the ornament.
---

# 半調網點 Halftone — 四色調幅網屏

## 設計哲學

半調網點是「照片怎麼上報紙」的答案。印刷機只會兩件事：有墨、沒墨。連續調的照片要上版，就得先隔著一片網屏曝光，把每一處的灰翻譯成一顆大小不同的點——點距固定，點的面積＝那裡的深淺。1880 年 3 月 4 日紐約《Daily Graphic》登出〈A Scene in Shantytown〉，是報紙第一次印出網點照片（Stephen H. Horgan 以刻線玻璃網屏製版）；之後八十年，體育版、廣告、畫報、漫畫全都是點。四色印刷再把照片拆成青、洋紅、黃、黑四版，各版網屏轉到不同角度（C15°、M75°、Y0°、K45°），疊起來在放大鏡下形成一朵一朵的「玫瑰紋」，退後一步又融回照片。

1963 年起 Sigmar Polke 把報上的網點照片放大到點可以一顆一顆數，用鉛筆橡皮頭沾顏料手按到畫布上（Rasterbilder）；Lichtenstein 則把 Ben-Day 網點當漫畫平塗。本風格取的是 Polke 那一邊：**網點不是花紋，是翻譯；放大是為了讓人看見翻譯本身。**

所以這套風格有三條底線：畫面上沒有任何「直接的」漸層——所有深淺都是點；顏色只能從四罐製程墨疊出來；字永遠是實地黑，因為小字一上網就破。

## 本風格的 5 個不可省略特徵

### 1. 形狀語彙：固定網格上面積可變的圓點（AM 調幅網屏）

點距永遠固定，只有點的**面積**隨階調變。10% 是細點、50% 附近四點相接成棋盤、90% 只剩紙色的小孔。畫面上不准出現任何 CSS/SVG 漸層或半透明色面——要灰就是點。拿掉它，就只剩平面設計。

面積→半徑：圓點面積 `πr² = t·cell²`，所以 `r = cell·√(t/π)`；t 超過約 0.55 後相鄰點相接，半徑要平滑推到 `0.7072·cell`（方格對角半長），實地才不留紙縫。

```css
/* 網點色調：--rf = r / cell ；10% .178・20% .252・30% .309・50% .399・70% .472 */
.tint{position:relative;isolation:isolate;overflow:hidden}
.tint::before{content:"";position:absolute;inset:-60%;z-index:-1;transform:rotate(var(--a,45deg));
 background:radial-gradient(circle at center,var(--ink) calc(var(--cell,6px)*var(--rf,.31)),
   transparent calc(var(--cell,6px)*var(--rf,.31) + .7px)) 0 0/var(--cell,6px) var(--cell,6px)}
```

```glsl
float r = cell * mix(sqrt(t/3.14159), .7072, smoothstep(.55, 1., t));
```

### 2. 色彩規則：四罐製程墨＋紙，固定網角，相乘疊印成玫瑰紋

只有 C `#009FE3`、M `#E6007E`、Y `#FFED00`、K `#1F1C1B` 與新聞紙 `#ECE5D3`。每一版有自己的網角且全站不變：**C 15°・M 75°・Y 0°・K 45°**（三個顯色最強的版彼此相差 30°，黃最不顯眼放在 0°）。疊色一律 multiply，紅＝M+Y、藍＝C+M、綠＝C+Y；不准出現第五色。拿掉網角差，就沒有玫瑰紋，只剩一種顏色的點。

```css
.t-c{--ink:#009FE3;--a:15deg}.t-m{--ink:#E6007E;--a:75deg}
.t-y{--ink:#FFED00;--a:0deg}.t-k{--ink:#1F1C1B;--a:45deg}
```

```svg
<pattern id="m50" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(75)">
  <circle cx="3" cy="3" r="2.39" fill="#E6007E"/></pattern>
<!-- 疊印：兩層各自的角度，第二層 style="mix-blend-mode:multiply" -->
```

### 3. 字體選擇：字永遠是 K100 實地，不上網；標題用 Franklin Gothic 系粗無襯線

製版房的鐵則：黑字只走黑版、100% 實地，因為 8pt 的字一拆成點就糊。所以本風格的字**從不**被網點化、不做彩色字、不做漸層字；反白字只准出現在 K 實地上。標題是報紙體育版的粗黑：英文 Libre Franklin 900（Franklin Gothic 的復刻），中文 Noto Sans TC 900；內文用報紙明體 Noto Serif TC；圖說與網線標註用 News Cycle（News Gothic 的復刻）。

```css
h1,h2{font:900 clamp(34px,5.2vw,68px)/1.08 "Noto Sans TC","Libre Franklin",sans-serif;color:#1F1C1B}
.en{font-family:"Libre Franklin";font-weight:900;text-transform:uppercase;letter-spacing:-.02em}
.cap{font:400 12.5px/1.5 "News Cycle",sans-serif;letter-spacing:.04em} /* 「85 LPI・K45°」 */
```

### 4. 版面手法：同一張圖同時以兩個尺度出現（印刷尺寸 × 放大到點可數）

Polke 的放大、印刷廠的數紗鏡、報紙的局部放大框——本風格一定讓觀者看到「點」和「圖」是同一件事。做法三選一或全用：(a) 印刷尺寸小圖＋細框標出裁切處＋細線拉到大圖（放大 6–10 倍）；(b) 首屏直接從放大開始，捲動退回印刷尺寸；(c) 游標是方形數紗鏡。放大必須是**同一次取樣**的放大（網點跟著變大），不能換一張高解析圖。

```html
<figure class="ts-fig">
  <div class="fig small"><canvas></canvas><span class="crop"></span></div>
  <svg class="leader"><line …/><line …/></svg>   <!-- 1px K 細線，從裁切框角拉到大圖角 -->
  <div class="fig big"><canvas></canvas></div>   <!-- 同一來源，zoom 8 -->
  <figcaption><b>圖一</b> 左上：印刷尺寸；右下：方框內放大八倍。</figcaption>
</figure>
```

### 5. 裝飾母題：印刷控制條、網點階調帶、套準十字與固定的套準誤差

印刷紙邊那一條色靶是本風格唯一的「裝飾」：四色實地塊、兩兩疊印塊、K 25/50/75% 網塊、灰平衡塊、兩端套準十字。另有橫跨版面的網點階調帶（0→100%），以及**全站共用一組**的套準誤差（每版固定偏移若干分之一格，不是每張圖隨機）。

```svg
<!-- 套準十字 -->
<g fill="none" stroke="#1F1C1B" stroke-width="1.2"><circle cx="15" cy="15" r="6.6"/><path d="M3 15H27M15 3V27"/></g>
<path d="M15 8.4A6.6 6.6 0 0 1 21.6 15L15 15Z M15 21.6A6.6 6.6 0 0 1 8.4 15L15 15Z" fill="#1F1C1B"/>
```

```js
// 全站唯一一組套準誤差（以網格為單位）
const MIS = [[.16,0], [-.11,.09], [.05,-.14], [0,0]]; // C M Y K
```

## 色彩系統

| 色 | hex | 用途 | 面積比例（約） |
|---|---|---|---|
| 新聞紙 | `#ECE5D3` | 底、留白、反白字 | 50% |
| K 黑 | `#1F1C1B` | 所有文字、2px 分欄線、K 版網點、實地塊 | 22% |
| M 洋紅 | `#E6007E` | M 版網點；疊出紅 | 10% |
| Y 黃 | `#FFED00` | Y 版網點；互動高亮（hover／選中列） | 9% |
| C 青 | `#009FE3` | C 版網點；疊出藍綠 | 9% |
| 疊印 C+M | `#1F2A77` | 只作控制條與進版條示意 | — |
| 疊印 M+Y | `#E4251B` | 同上；紅角標籤 | — |
| 疊印 C+Y | `#00955E` | 同上 | — |

規則：沒有任何一色的 opacity 淡版——淡就是網點 10–30%；紙色不是白，是帶灰黃的新聞紙；高亮用 Y 實地配 K 字。

## 字體系統

Google Fonts：`Libre Franklin` 600/900、`News Cycle` 400/700、`Noto Sans TC` 500/900、`Noto Serif TC` 400/700。

| 層級 | 字 | 大小 | 行高 |
|---|---|---|---|
| H1 | Noto Sans TC 900 | clamp(34px, 5.2vw, 68–86px) | 1.08 |
| H2 | Noto Sans TC 900 | clamp(26px, 3vw, 44px) | 1.1 |
| 眉標 kicker | Libre Franklin 900 大寫 | 11.5px，字距 .16em | 1.3 |
| 內文 | Noto Serif TC 400 | 17px | 1.75 |
| 圖說／網線標註 | News Cycle 400/700 | 12.5px，字距 .04em | 1.5 |
| 大數字 | Libre Franklin 900 | clamp(34px, 4.4vw, 58px) | 1 |

## 版面與網格

- 報紙式非對稱雙欄：文字欄 5 : 圖欄 7；區段之間 2px K 實線，欄內 1px K 細線。零旋轉——網角是點在轉，版面不轉。
- 圖一律直角、零圓角、零陰影，邊框 1px 或 2px K。
- 首屏可用 sticky 放大舞台（320vh 捲動長度）；文字放在紙色實地框裡疊在網點上（字不上網）。
- 導覽是印刷控制條：固定在右緣 68px 寬的直條（手機移到底部 60px 橫條），每頁一塊色靶。
- 留白：區段間 60–90px；手機 ≤560px 左右 16px。

## 元件配方

- **導覽（控制條）**：`.cbar a` 每頁一塊；目前頁＝該墨 100% 實地（K 頁反白字），其他頁＝同墨 30% 網點；頂端套準十字、底端 K 10/30/50/70% 階梯。hover 時色塊往下多印 8px。
- **按鈕**：K 2px 框、Y 實地、K 字；hover 反成 K 底 Y 字。零圓角零陰影。
- **選項**：1.5px K 框方塊；選中＝K 實地反白。
- **圖**：`.fig` 內 `.still`（CSS 網點色塊，無 JS 時的靜態備援）＋ `<canvas>`；下接 `.figcap`（圖號＋News Cycle 圖說＋進版條）。
- **進版條 progs**：四個 22×14 小塊（Y／M+Y／三色／四色），印到哪一版亮到哪一塊。
- **表格**：頂 2px、列 1px K 線；今天／命中列用 Y 實地。
- **footer**：左地址與網線參數聲明，右整條印刷控制條 SVG。

## 動效規則

| 類別 | 本站做法 | 觸發 | 時間 | 降級（reduced-motion） |
|---|---|---|---|---|
| ambient 環境 | 套準漂移：C/M/Y 三版以 0.13–0.31 Hz 的正弦各自漂 ±0.07 格，K 不動，玫瑰紋緩慢呼吸 | 常駐（僅可見的圖） | 持續 | 停在固定套準誤差，影像不變 |
| input 輸入 | 方形數紗鏡：游標所在處 6× 放大，同一次繪製重新取樣；框上有 mm 刻度 | pointermove / pointerdown | 即時（同一幀） | 保留（使用者主動） |
| transition 轉場 | 網點掃換：換頁時 K 45° 網點由 0 長到 17.5px 蓋滿版面，新頁再縮回 0 | 內部連結點擊 | 420ms `cubic-bezier(.6,0,.4,1)` | 直接換頁 |
| signature 簽名 | 進版打樣：每張圖第一次進入視窗時依 Y→M→C→K 逐版印出，每版從送紙方向滑入、點由 0 長到定值 | IntersectionObserver ≥25% | 每版 0.5s、間隔 0.55s、`easeOutCubic` | 四版一次到位 |
| 放大（開場） | 捲動把倍率 9×→1× 連續退回，網點與影像同比例縮 | scroll（rAF 節流） | 跟手 | 首屏直接 1×，放大改由圖一並置呈現 |

禁用：淡入、視差、彈跳、模糊。網點以外的東西不動。

## 插畫與圖像風格

技法：**am-rosette 四色調幅網點**。所有圖先以 Canvas 2D 用漸層畫成「連續調照片」（拳套、擂台、沙包、逆光半身、掛手套的牆），但這張照片永遠不直接顯示——只顯示它的四色網點版。構圖用報紙體育照片的語言：暗背景、頂光、側面人物、主體偏心；不畫臉部五官（逆光剪影），不畫文字進照片。網線：大圖 4.5–5px、小圖 3–4px（CSS px），放大圖同比例變大。

## Logo 與 Favicon 設計指南

- Logo：3px K 方框內，一顆以 K 45° 網點構成的球（光從左上，階調往右下與邊緣變深）——一記拳頭被翻譯成點。旁置「四十五度拳館」Noto Sans TC 900 與「FORTY-FIVE DEGREES BOXING」Libre Franklin 900。
- Favicon：新聞紙底 3×3 顆 K 點，轉 45°，點徑由左上到右下遞增（最小的網點階調帶）。inline SVG data URI。

## Do & Don't

**Do**：所有灰用點；四版網角固定；字 K100 實地；至少一處讓人看到放大後的點；控制條與階調帶當裝飾；套準誤差全站同一組。

**Don't**：CSS 漸層或半透明做深淺；把字網點化或做彩色漸層字；用 Ben-Day 均勻點當普普貼花（那是 Pop Art）；所有版同角度（沒有玫瑰紋）；隨機套準誤差；第五色；圓角卡片、模糊陰影、紫藍漸層、emoji icon、EST. 年份徽章、置中三卡片、Lorem ipsum。

## 頁面骨架範例

```html
<body>
<header class="mast"><a class="logo" href="index.html">…logo svg…<b>四十五度拳館</b></a>
  <p class="run">高雄市鹽埕區瀨南街 131 號 2 樓</p><p class="folio">第 38 期館訊</p></header>
<nav class="cbar" aria-label="主要導覽">
  <a href="index.html" class="t-c" aria-current="page"><span class="zh">館</span><span class="pc">C 100</span></a>
  <a href="classes.html" class="tint t30 t-m"><span class="zh">課</span><span class="pc">M 30</span></a>
</nav>
<main>
  <section class="enlarge"><div class="stage">
    <div class="fig hero-fig"><div class="still tint t-m t50"></div><canvas id="hero"></canvas></div>
    <div class="hero-copy"><h1>一記右直拳，見報是七萬八千顆點。</h1></div>
  </div></section>
</main>
<footer class="foot">…地址…<svg>…印刷控制條…</svg></footer>
<script>
const hero = HT.mount(document.getElementById('hero'), {w:1200, h:800, cell:5, focus:[.47,.28], draw:SCN.hero});
</script>
</body>
```

（10 × 7 cm 的照片在 85 LPI 下：3.94 in × 85 ≈ 335、2.76 in × 85 ≈ 234，一版約 78,400 顆點。）

## 技術實作與相容性

### 1. 原生 WebGL2 片段著色器（A 渲染層）

- 承載：特徵 1、2、4、5 的全部圖像。每個 fragment 對四版各算一次：把像素座標旋轉到該版網角 → 找所在網格中心 → 反轉回影像座標取樣一次 → RGB→CMYK（K = smoothstep(.3,1,1−max(rgb))·.92 的部分 GCR，CMY = (1−rgb−K)/(1−K)）→ 網點擴大 `t + 0.12·4t(1−t)`（50% 處 +12%）→ 半徑 → 抗鋸齒圓 → 以墨色 multiply 疊到紙色。每像素 4 次貼圖取樣、無迴圈外分支，1200×800 裝置像素約 96 萬 fragment × 4 次取樣。
- 數紗鏡：同一 pass 內，方形區域中的座標 `q = L + (px − L)/mag` 再走一次同樣的網屏函式，所以放大的就是同一張印刷品。
- 查證：MDN〈WebGL2RenderingContext〉標示 **Baseline Widely available（自 2021 年 9 月起跨瀏覽器可用）**。網角 C15°/M75°/Y0°/K45° 與玫瑰紋成因查證自 The Print Guide〈Halftone screen angles〉與 PrintPlanet〈Screen angles: why are they 15, 45, 75 and 90?〉。
- Fallback：`getContext('webgl2')` 失敗或 shader 編譯失敗 → 以 Canvas 2D 用**同一套算式**（同網角、同 GCR、同半徑曲線、同套準誤差）逐點 `arc()` 畫一次靜態網點，`globalCompositeOperation='multiply'`；此時無漂移、無數紗鏡、無進版動畫，但圖與資訊完整。無 JS → `.still` 的 CSS 網點色塊＋所有文字。
- 效能：只渲染可見（IntersectionObserver）的畫布；DPR 上限 1.5；reduced-motion 時只在狀態改變時重繪。

### 2. `position: sticky` ＋ scroll-linked 倍率（C／D 層）

- 承載：特徵 4 的開場。320vh 的區段內舞台 sticky 於視窗，`scroll` 事件以 rAF 節流算進度 p，倍率 `z = 9^(1−p)`，同時乘到網格與影像取樣（網點與影像同比例縮），不攔截、不改寫捲動（scroll-linked 而非 scroll-jack）。
- 查證：MDN〈position〉標示 Baseline Widely available（2015 年 7 月起）。
- Fallback：reduced-motion 時區段高度改為自動、倍率固定 1×，放大改由圖一的印刷尺寸／8 倍並置提供，資訊零損失。

### 3. 約束規則引擎（E 資料與生成層）

- 承載：〈週六對打配對〉。硬條件依序過濾（規矩一：滿 12 堂；規矩二：體重差 ≤4 kg，帶打者年資多一年以上可放寬到 6 kg；規矩三：未滿半年只配帶打者，其餘年資差 ≤12 個月或帶打；規矩五：有共同空時段），軟偏好計分（架式相反 +8、目標技術／對等／抗壓各自加減分、體重差每 kg −6）。每一條都在結果卡上以文字寫出，並回報「幾位因體重、幾位因年資被排除、第二順位是誰」。
- 純 JS，無相容性疑慮；日期以 `Intl.DateTimeFormat('zh-TW')` 顯示下一個週六。

### 輔助：`@property` 網點掃換

- `@property --r { syntax:'<length>' }` 讓 radial-gradient 的點半徑可以 transition。查證：MDN〈@property〉、web.dev〈@property: Next-gen CSS variables now with universal browser support〉——**Baseline 2024 Newly available（2024 年 7 月起）**。不支援時 `--r` 不插值、直接跳到蓋滿，440ms 後照常換頁。

### 效能實測值（建站當下）

- 單頁大小（含全部 inline CSS/JS/SVG）：index 73.6 KB、classes 48.0 KB、match 54.9 KB、visit 47.6 KB（上限 350 KB）。
- 來源圖 Canvas 2D 繪製（Node @napi-rs/canvas 量測）：每張 0.1–0.8 ms。
- 著色器以 Mesa llvmpipe（GLSL 330 等價轉寫）離線渲染驗證輸出正確；排程環境無 GPU 瀏覽器，未能量 60fps，但每像素工作量為 4 次取樣＋4 次距離計算，屬輕量級。
