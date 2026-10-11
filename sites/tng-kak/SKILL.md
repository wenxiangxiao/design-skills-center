---
name: supergraphics-sea-ranch
description: 1960s–70s architectural Supergraphics (Barbara Stauffacher Solomon at The Sea Ranch, 1966; named by C. Ray Smith in Progressive Architecture, Nov 1967) as a web style — graphics too big for a single plane that wrap around corners and run from wall to floor, parallel flat-colour stripe bands with concentric quarter-circle turns, giant cropped Helvetica-class letters and numerals, wayfinding arrows and discs, at most three saturated paints on white walls next to raw redwood and concrete, zero gradients, zero shadows, zero outlines.
---

# 超級圖像 Supergraphics・一個平面裝不下

## 0. 血緣與定位

- **流派**：超級圖像 Supergraphics（又稱 Environmental Graphics 的早期形態；屬 C. Ray Smith 所稱 Supermannerism 的一支）。
- **起點**：加州 Sonoma 海岸 The Sea Ranch，Moonraker 運動中心（游泳與網球俱樂部）更衣室與外牆，1966。設計 **Barbara Stauffacher Solomon**（1928 年生；巴塞爾設計學校受 Armin Hofmann 訓練，把 Swiss Style 與 Helvetica 帶到舊金山），建築 MLTW（Moore Lyndon Turnbull Whitaker）。據 Sea Ranch 檔案，現場由舊金山 Thomas Swan & Sons 的油漆工協力完成；起因是建築超支、需要便宜的標示系統——幾天、幾道漆。作品登上 LIFE 雜誌後被大量模仿。
- **命名**：C. Ray Smith〈Supergraphics〉，*Progressive Architecture* 1967 年 11 月號 pp.132–137；他的定義：「超級圖像大到無法被單一建築平面的框容納」。延伸論述見 Smith《Supermannerism: New Attitudes in Post-Modern Architecture》（E. P. Dutton, 1977）。
- **同期參照**：Robert Venturi & William Short〈Grand's Restaurant〉費城 1962 的建築尺度字；1970s 美國學校、停車場、體育館的導向色帶。
- **與鄰近流派的分界**：
  - 國際主義／瑞士平面：同樣用 Helvetica 與網格，但那是**紙上**的秩序；本流派的「紙」是房間，圖形**必須過牆角**、被門窗切斷。
  - 普普藝術：那是網點、漫畫與商品複製；本流派零網點、零圖像再現，只有條紋、箭頭、圓、字。
  - 後現代古典主義（Venturi／Moore 的裝飾棚）：那借古典構件與立面語彙；本流派不借任何樣式，只用導向符號。
  - Googie：那是斜屋頂、星芒與霓虹；本流派的線是平行條紋、轉角是同心圓弧。
  - 動態字體 Kinetic Typography：那是時間軸上的字卡；本流派的字是靜止的、建築尺度、被裁切。

## 1. 設計哲學

**一個平面裝不下。** 牆是一張紙，房間才是畫布。色帶走到牆角不停，轉過去；字大到只剩一半；圓被天花板切成四分之一。頁面上的對應是：圖形跨越區塊邊界、被 viewport 與容器邊緣裁切，讓使用者感到「這個東西比畫面大」。

它同時是**便宜的**：幾罐平色漆、遮蔽膠帶、一條墨線。所以沒有漸層、沒有陰影、沒有紋理——不是極簡的禁慾，是油漆工的經濟學。

## 2. 本風格的 5 個不可省略特徵

### ① 跨面連續：圖形至少過一個轉角（牆→牆、牆→地、牆→天花）

拿掉它就只是「一面牆上的壁畫」或一張瑞士海報。網頁上：色帶沿著區塊邊緣走、在區塊交界轉彎進入下一區；3D 場景中同一份圖形以展開圖座標投影到每一個面。

```html
<!-- 一份圖形、四個面：每個面只是展開圖上的一個 viewBox 視窗 -->
<svg width="0" height="0" style="position:absolute"><g id="art"><!-- 色帶、字、圓 --></g></svg>
<div class="face L"><svg viewBox="0 0 400 300"   preserveAspectRatio="none"><use href="#art"/></svg></div>
<div class="face B"><svg viewBox="400 0 600 300" preserveAspectRatio="none"><use href="#art"/></svg></div>
<div class="face R"><svg viewBox="1000 0 400 300" preserveAspectRatio="none"><use href="#art"/></svg></div>
<div class="face F"><svg viewBox="400 300 600 400" preserveAspectRatio="none"><use href="#art"/></svg></div>
```

### ② 平行色帶：等寬 1／3／5 條，條寬：間距 = 3：1，只走 0°／45°／90°，轉角是同心四分之一圓弧

色帶的「條」永遠平行、等寬、平塗；轉彎時每條都是同一圓心的弧。外側兩條同色、中央一條異色是最經典的三條帶。

```css
/* 直線段：硬邊停點的條紋（不是漸層，是三塊平色） */
.band-v{width:80px;background:linear-gradient(90deg,
  #F0531C 0 22px,transparent 22px 29px,#1E2E86 29px 51px,transparent 51px 58px,#F0531C 58px 80px)}
```
```svg
<!-- 轉角段：同一條中心線路徑，以「白描邊減黑描邊」的遮罩堆出每一條，保證同心 -->
<mask id="s0" maskUnits="userSpaceOnUse" x="-200" y="-200" width="1800" height="1100">
  <path d="M0 140H630A70 70 0 0 1 700 210V560" fill="none" stroke="#fff" stroke-width="110" stroke-linejoin="round"/>
  <path d="M0 140H630A70 70 0 0 1 700 210V560" fill="none" stroke="#000" stroke-width="50"  stroke-linejoin="round"/>
</mask>
<rect x="-200" y="-200" width="1800" height="1100" fill="#F0531C" mask="url(#s0)"/>
<!-- 中央條：同一路徑 stroke-width=30 → 30 寬 -->
```

### ③ 被裁掉的巨字：Helvetica 系 grotesque 900，字級大於容器，只露局部

字是建築尺度的符號（樓層數、門牌、店名的一個字），不是拿來閱讀的段落。裁切邊必須是「建築」——容器邊、牆角、門洞——而不是隨意的遮罩。

```css
.cq{container-type:inline-size;position:relative;overflow:clip}
.giant{position:absolute;right:-.12em;top:-.16em;font:900 58cqi/.8 "Archivo","Helvetica Neue",Helvetica,Arial,sans-serif;
  letter-spacing:-.05em;color:#F4B921;pointer-events:none}
```

### ④ 導向符號放大到建築尺度：箭頭、圓、巨型數字——圖形永遠「指向某處」

色帶的終點是箭頭或圓頭；圓是直徑數公尺的平色盤，被天花板或牆角切掉。

```svg
<polygon points="930,505 1056,560 930,615" fill="#F0531C"/>      <!-- 色帶終點箭頭：寬 = 帶寬×1.9、長 = 帶寬×1.15 -->
<circle cx="1000" cy="-20" r="180" fill="#F4B921"/>              <!-- 跨過牆角與天花板的大圓 -->
```

### ⑤ 白牆＋最多三個飽和平色＋建築本身的材料；零漸層、零陰影、零描邊

白牆至少占 55%。同一空間最多三個飽和色（墨黑寫字不算）。紅杉木、混凝土地是第二層底色，不上漆。門窗開口切斷圖形，圖形服從建築。

```css
:root{--wall:#F3F1EA;--floor:#BDB7AB;--redwood:#7C3F24;
  --o:#F0531C;--g:#12924A;--n:#1E2E86;--y:#F4B921;--k:#151515}
.btn{box-shadow:none;border-radius:0;background:var(--k);color:var(--wall)} /* 零圓角零陰影 */
```

## 3. 色彩系統

| 名稱 | hex | 用途 | 比例 |
|---|---|---|---|
| 牆白 | `#F3F1EA` | 頁面底、面板、正牆 | 55–65% |
| 左牆陰面／右牆 | `#E4E0D5`／`#ECE9E0` | 3D 面的平面明暗（以不同平色表示受光，不用漸層） | 3D 場景內 |
| 混凝土地 | `#BDB7AB` | 地板、編輯器底 | 5–10% |
| 紅杉 | `#7C3F24`／`#5E2D19` | 天花板、門、footer、舞台背景 | 8–12% |
| TK-11 朱橙 | `#F0531C` | 主色帶、主按鈕 | ≤12% |
| TK-52 海軍藍 | `#1E2E86` | 色帶中條、巨字 | ≤10% |
| TK-31 草綠 | `#12924A` | 第三色 | ≤6% |
| TK-24 鉻黃 | `#F4B921` | 大圓、強調 | ≤6% |
| TK-90 墨黑 | `#151515` | 字、按鈕、框線 | 6–8% |

規則：一個畫面同時出現的飽和色 ≤3；不做淡色版（沒有 #F0531C 的 20% 透明）；光線以 `mix-blend-mode:soft-light` 的平色色塊表示，不用漸層。

## 4. 字體系統

- **拉丁**：Archivo（Google Fonts，可變軸 `wdth 62–125`、`wght 100–900`）——Helvetica 的開源替身；巨字與數字用 `font-stretch:62–72%` 的窄體 900。
- **中文**：Noto Sans TC 900／700／500。
- **字級**：巨字以容器單位 `58–92cqi`；h1 `clamp(54px,8vw,120px)`；h2 `clamp(38px,6vw,84px)`；內文 16px／1.65；標籤 12px 窄體大寫 letter-spacing .06–.1em。
- **行高**：標題 .8–1.05（緊），巨字 .8；字距 -.02～-.05em。
- 禁止：襯線、手寫、斜體、細於 500 的字重。

## 5. 版面與網格

- 左側 84px 固定色帶導覽是版面的「第一面牆」；內容從它右邊開始，區塊 padding `clamp(70px,9vw,140px)`。
- 頁面色帶沿區塊左右邊緣交替蛇行（`data-band="l|r"`），在區塊交界以半徑 70 的同心圓弧轉彎，終點是指向下一區的箭頭。
- 巨字貼在區塊角落並出血 10–30%；一個區塊只放一個巨字。
- 角度只有 0°／45°／90°。不旋轉文字。
- 手機 ≤760px：導覽落到底部成橫向色帶；巨字仍以 cqi 等比，裁切比例不變。

## 6. 元件配方

- **色帶導覽 corner-band**：三條直帶（朱／藍／朱），每頁一個裁切的窄體巨數字（牆白色），hover 數字上移 10%；現用頁的色帶向右「分岔」出一段帶箭頭的短帶指向頁面。
- **按鈕**：墨黑或朱橙實心、零圓角、零陰影，右側一個 CSS clip-path 箭頭；hover 換海軍藍。`.btn.ghost` 以 4px inset 黑框。
- **面板（plate）**：牆白底＋10px 墨黑硬偏移色塊（`box-shadow:10px 10px 0 #151515`，是平色而非陰影模糊）。
- **表格**：3px 墨黑底線，價錢以窄體 900 右對齊。
- **選項 chip**：3px inset 黑框，選中反黑。
- **footer**：紅杉底，上緣一條 40px 三色橫帶。

## 7. 動效規則（四種全有，皆有 reduced-motion 降級）

| 類型 | 做法 | 觸發／時長／easing | reduced-motion |
|---|---|---|---|
| ambient 環境 | 天窗光斑：每面牆一塊 soft-light 平色平行四邊形，位置與斜度由台灣真實時刻（Intl Asia/Taipei，06–18 時）決定，透明度 9s 呼吸；房間以 `@property --sway` 13s 左右輕擺 ±2.2° | 持續 | 光斑固定、不擺 |
| input 輸入 | 游標在房間上 → 鏡頭偏轉 ±7°／俯仰 ±3°；拖曳 → 繞房間轉身；編輯器拖曳拉色帶即時 0／45／90° 吸附並長出圓弧 | 直接寫 CSS 變數，1 幀內 | 保留（使用者主動） |
| transition 轉場 | 換頁時三條 45° 色帶（朱、藍、綠）像滾筒刷一樣掃過全螢幕再掃出；「上漆」時四面牆依序以 clip-path 從一側刷上 | .42s 進／.5s 出 cubic-bezier(.7,0,.3,1)；上漆 1.7s | 直接換頁；直接顯示完成態 |
| signature 簽名 | **捲動驅動的房間轉身**：首頁牆角 sticky，捲動時鏡頭從 -40° 轉到 +40°，色帶依左牆→正牆→右牆→地板一面一面刷上，讓人親眼看到同一條帶過牆角不斷開 | `animation-timeline: view()`，range contain 0–100% | 固定 -22°、全部刷好 |

## 8. 插畫與圖像風格：跨面色帶 supergraphic-band

全站沒有一張「畫」——所有圖像都由四種原語組成：平行色帶（1／3／5 條）、箭頭、平色圓、巨字。圖形在展開圖座標（1 單位 = 1 cm）上定義，再投影到 3D 房間或頁面。零透視繪製（透視只來自 CSS 3D 鏡頭）、零描邊、零漸層。

## 9. Logo 與 Favicon

- Logo：一條三色帶（朱外、白隙、藍中）從左邊進來，在畫面內轉一個同心圓弧向下出血；右側一個海軍藍窄體「K」只露上半；店名「轉角油漆／TŃG-KAK」黑字。
- Favicon：32×32 牆白方塊上，同一條三色帶轉角出血。

## 10. Do & Don't

- Do：讓圖形過轉角、被切掉、指向某處；一個畫面 ≤3 個飽和色；保留大片白；讓建築材料（木、水泥）露出來。
- Do：用 0／45／90° 與同心圓弧，條寬：間距 3：1。
- Don't：漸層、陰影模糊、圓角卡片、描邊圖示、emoji、紫藍漸層 hero、置中三卡片。
- Don't：把字縮小到「放得下」——放得下就不是超級圖像。
- Don't：在一面牆裡畫完一個完整構圖（那是壁畫）。
- Don't：第四個飽和色；淡色版；網點；插畫人物。

## 11. 頁面骨架範例

```html
<nav class="band-nav"><i class="stripes"></i><ol>
  <li aria-current="page"><a href="index.html"><span class="clip"><span class="num">1</span></span><span class="lab">1・轉角</span></a></li>
  <li><a href="studio.html"><span class="clip"><span class="num">2</span></span><span class="lab">2・拉一條</span></a></li>
</ol></nav>
<main>
  <svg class="pageband" aria-hidden="true"></svg>          <!-- JS 依區塊位置畫出蛇行色帶 -->
  <section class="sec cq" data-band="r">
    <span class="giant" aria-hidden="true">1972</span>
    <p class="tag">一個平面裝不下</p>
    <h2>色帶走到牆角，<em>不停</em>，直接轉過去。</h2>
  </section>
  <section class="sec cq" data-band="l">…</section>
</main>
```

## 12. 技術實作與相容性

### 12.1 SVG `<use>` 多視窗跨面投影＋CSS 3D 房間（A 渲染層）

- 做法：圖形只定義一次（展開圖座標的 `<g id>`，含遮罩），每個面是一個 `preserveAspectRatio="none"` 的 `<svg viewBox>` 視窗，以 `<use href>` 引用；面本身用 `rotateY(±90deg)`／`rotateX(90deg)` 摺成 6×4×3 m 的房間，`perspective` 在父層、`transform-style:preserve-3d` 在場景。牆角的連續是**幾何保證**，不是對齊出來的。
- 支援：`<use href>`（不帶 xlink）與 CSS 3D transforms 皆為各大瀏覽器長期支援的 Baseline 功能（MDN）。遮罩容器 SVG 不可用 `display:none`（部分瀏覽器會讓其中的 mask 失效），改用 0×0 絕對定位。
- 備援：無 JS 時首頁顯示 noscript 說明與全部文字資訊；3D 不可用時面仍以平面呈現。

### 12.2 container query units（C 版面與樣式層）

- 做法：每個區塊 `container-type:inline-size`，巨字 `font-size:58–92cqi` 並以 `overflow:clip` 裁切——字永遠比容器大同一個比例，裁切位置在 320px 到 1920px 都一致；導覽每格 `container-type:size`，數字以 `cqb` 依格高放大。
- 支援：caniuse（MDN 資料）——Chrome／Edge 105+、Firefox 110+、Safari 16+。查無容器時單位退回 small viewport 單位（`svi`／`svb`），仍為大字裁切，只是比例改依視窗。
- 來源：caniuse「Container query length units」；techhub.iodigital.com〈Container query length units〉。

### 12.3 CSS scroll-driven animations（B 動效與時間軸層）

- 做法：首頁舞台 `view-timeline-name:--stage`，sticky 房間 `animation:turn linear both; animation-timeline:--stage; animation-range:contain 0% contain 100%`，以 `@property` 註冊的 `--ry <angle>` 與 `--paint <number>` 補間鏡頭角度與四面刷漆進度；各面 `clip-path:inset(0 calc((1 - clamp(0, var(--paint)*4 - var(--fi), 1))*100%) 0 0)` 依序刷上。頁面色帶以 `animation-timeline:scroll(root)` 隨捲動展開。
- 支援：Chrome／Edge 115+、Safari 26+（Chrome for Developers 文章與 2025-09 Safari 26 相關報導）；**Firefox 至 2026 年仍預設關閉**（caniuse／MDN `view()` 標為 Limited availability）。
- 備援：`CSS.supports("animation-timeline: view()")` 為假時，JS 以 rAF 節流的 scroll 監聽計算同一個進度寫入 `--ry`／`--paint`，視覺結果相同；頁面色帶直接完整顯示。reduced-motion：停用並固定為完成態。

### 12.4 Canvas 2D 像素分色計數（E 資料與生成層，估價用）

- 做法：同一份圖形以 Canvas 2D 重畫（`Path2D` 同一條中心線、`destination-out` 減去內寬，與 SVG 遮罩同構），1px = 2 cm、四周多留 2 m；逐像素就近歸色、依座標歸面，得出每面每色 ㎡、溢出牆外（被切掉）的面積，以及三條牆角兩側的連續列數（判定「是否過轉角」）。漆量 = 面積 × 2 道 ÷ 8 ㎡/L，向上取 0.5 L。
- 支援：Canvas 2D 與 `getImageData` 全面支援；若 canvas 被污染或讀取失敗，退回以中心線長度 × 帶寬的解析估算並在估價單註明。

### 12.5 效能實測

- 單頁大小（含 inline 全部 CSS/JS/SVG）：index 41 KB、studio 55 KB、works 36 KB、visit 39 KB（上限 350 KB）。
- `artSVG()` 產生首頁圖形：約 0.01 ms／次（Node 實測）；像素分色迴圈 900×550：約 2–15 ms，僅在按「上漆・估價」時執行一次。
- 動畫只動 `transform`、`clip-path`、`opacity` 與註冊自訂屬性，無 layout thrashing；編輯器拖曳以 rAF 合併房間重繪。
