---
name: concrete-poetry-constellation
description: Concrete poetry (Gomringer's konstellationen, Brazil's Noigandres, Lin Heng-tai's sign poems) as a web style — one character per square cell on a strict modular grid, repetition with exactly one deviation, the empty cell as an active element, a single heavy sans in black with at most one "voice" colour, and meaning made by permutation rather than sentences.
---

# 具體詩 Concrete Poetry — 風格規格書

> 示範站：白字瓷 PE̍H-JĪ PORCELAIN（鶯歌，一件一字的白瓷）。本規格書不綁定產業：任何「字本身就是商品或訊息」的品牌都能用——招牌、字型、出版、餐具、文具、展覽。

## 設計哲學

具體詩不寫句子，它**排列字**。1953 年 Eugen Gomringer 在瑞士出版《konstellationen》，借 Max Bill 的「具體藝術」為名：一首詩是幾個字在平面上的「星座」，讀者用眼睛在格子間走出意思。1952 年聖保羅的 Noigandres 小組（Augusto 與 Haroldo de Campos、Décio Pignatari）走得更遠，1958 年〈plano-piloto para poesia concreta〉宣告詩是「verbivocovisual」——字義、字聲、字形同時作用，並援引 Fenollosa 與 Pound 對漢字「表意文字」的想像。臺灣的林亨泰在 1950 年代末寫〈風景〉系列，以重複的詩行讓防風林一排一排站出來。

他們長成這樣，是因為三個限制：**打字機與活字的等寬格**（一字一格是物理事實）、**單色印刷**（顏色昂貴，Augusto de Campos 的〈poetamenos〉想要霓虹燈般亮滅的字，沒錢，只好用幾種顏色標「聲部」）、**對廣告標語的反諷**（Pignatari 的〈beba coca cola〉把口號拆到只剩殘渣）。所以網頁版的具體詩也必須：一格一字、單一字體、留白當作一個字、顏色極少且有語意、意義靠位置而非句法。

## 本風格的 5 個不可省略特徵

### 1. 一格一字的方陣（形狀語彙）

畫面的主角是**等大正方格**裡的單字，行列對齊、零字距變化、零旋轉。拿掉格子，就只剩一段文字。

```css
.poem{display:grid;grid-template-columns:repeat(var(--n,4),var(--c));grid-auto-rows:var(--c);gap:0}
.poem .cell{display:grid;place-items:center;font:700 calc(var(--c)*.62)/1 "Noto Sans TC",sans-serif}
:root{--c:clamp(52px,8.4vw,104px)}
```

### 2. 重複，然後只有一個偏離（版面手法）

一首詩用同一個字填滿，**只讓一格不一樣**——少一個偏旁（瓷→次）、換一個字、或空掉。偏離只能有一處，否則就變成圖案。

```html
<!-- 十五個瓷、一個次：瓷少了瓦，就是次品 -->
<div class="poem" style="--n:4">
  <span class="cell">瓷</span>…<span class="cell co">次</span>…<span class="cell">瓷</span>
</div>
```

### 3. 留白是一格（形狀語彙）

空格和字一樣大，是刻意放的「沉默」（Gomringer〈silencio〉的中心空格）。現用頁導覽也是空格；聲音裡空格就是休止。**空格不畫框、不放圖示**。

```css
.cell.gap{visibility:visible;cursor:default}          /* 空格照佔一格 */
.quad a[aria-current]{background:transparent;color:transparent;box-shadow:inset 0 0 0 1px var(--table-d)}
```

### 4. 一種字、黑一色＋一個聲部色（字體選擇＋色彩規則）

中文用幾何感的黑體（Noto Sans TC 700/900），拉丁用 Futura 系（Jost），**拉丁一律小寫、標題與詩裡沒有標點**。字只准黑；唯一的彩色是「聲部色」（本站鈷藍 #1E3C9A），只給那個偏離的字。零漸層、零陰影、零描邊外框。

```css
.la{font-family:"Jost",sans-serif;text-transform:lowercase;letter-spacing:.02em}
.cell{color:#111311}.cell.co{color:#1E3C9A}   /* 一首詩至多一處 .co */
```

### 5. 置換：同樣的字，換位置就是換一首（裝飾母題）

系列作以編號並列（no.2a 原、no.2b 鏡、no.2c 轉＋輪），展示同一組字的鏡像、轉置、輪換；字形層級的置換＝拿掉或換掉一個構件。這是本風格唯一的「裝飾」。

```js
const mir=r=>r.map(x=>[...x].reverse().join(''));           // 鏡
const tr =r=>[0,1,2].map(c=>[2,1,0].map(k=>[...r[k]][c]).join('')); // 轉 90°
const rot=r=>[r[r.length-1],...r.slice(0,-1)];               // 輪
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 影青桌面 | `#8DB59F` | 頁面地色（桌面），所有瓷板放在它上面 | ~50% |
| 深影青 | `#6E987F` | 桌面上的格線、〈擺一桌〉盤底、空格框 | ~5% |
| 瓷白 | `#F4F4EF` | 承載詩與內文的方瓷板、器的圓盤 | ~28% |
| 釉影 | `#E7EBE5` | 輸入框、晶片按鈕底 | ~3% |
| 墨 | `#111311` | 全部的字、主按鈕、頁尾 | ~12% |
| 次墨 | `#3B4540` | 標籤、說明 | ~1% |
| 鈷藍 | `#1E3C9A` | 唯一的聲部色：偏離的字、讀線、播放游標、hover | ≤2% |

對比：墨對瓷白 16.9:1、墨對影青 8.2:1、鈷藍對瓷白 8.8:1、次墨對影青 4.4:1（只用於 ≥12px 標籤）。暗底（頁尾、字陣卡）上的鈷藍字改用 `#8FA6E8`。

## 字體系統

- Google Fonts：`Noto Sans TC` 300/400/500/700/900、`Jost` 300/400/500。
- 字級：詩格字＝格寬 ×0.62（700）；品牌字 clamp(56px,7.6vw,112px)/900；頁標 clamp(30px,4.4vw,56px)/900 字距 .06em；內文 16px/1.85；標籤 Jost 12px 小寫字距 .08em；價格 Jost 300 28–40px。
- 規則：拉丁全小寫；標題、導覽、按鈕、詩裡不放標點（內文可以）；同一首詩只用一個字重。

## 版面與網格

- 8px 基準；詩格 `--c` 在 52–104px 之間流動，手機 44–76px。
- 頁面＝影青桌面上不對稱放置的方瓷板（`.sheet`，零圓角、零陰影），常用 5:7 或 7:5 兩欄。
- 首屏：左方瓷板裝 4×4 詩，右欄品牌字＋一段話＋營業狀態＋兩顆按鈕＋一條窯況字柱；**不放大標 hero、不放三卡片**。
- 角度：零。所有東西正交對齊格線。
- 留白：區塊間 72–128px；詩格之間 0 間距（格子本身就是留白）。

## 元件配方

- **導覽 silencio-quad**：左上 2×2 四個 48px 瓷白方格各一個字（白／器／擺／來），現用頁是空格（透明＋1px 內框），hover 反黑；手機 44px。
- **按鈕**：墨底瓷白字、48px 高、字距 .2em、零圓角；次按鈕為 2px 內框；hover 一律變鈷藍。
- **晶片**：釉影底 44px 方鈕，`aria-pressed=true` 反墨。
- **卡片**：不用卡片。商品是「字陣＋名稱＋規格表＋價格」一列，以 2px 桌面縫分隔（容器設桌面底、`gap:2px`）。
- **表單**：釉影底、無框、48px 高。
- **頁尾**：墨底，四欄，最後一行小寫拉丁＋中文虛構聲明。

## 動效規則

| 種類 | 實作 | 觸發 | 時值 | reduced-motion |
|---|---|---|---|---|
| signature 同字共鳴 | 被敲的字 `translateX(A·e^{-t/0.42}·sin(2π·9t))`，A＝格寬×0.07；同字全振幅、共用構件者 ×0.4 並延遲 40ms＋35ms/格距 | 點擊／Enter（懸停只讓該字半振幅輕顫、無聲、不傳遞） | 約 1.6s 衰減 | 不振動：被敲與同字變鈷藍、構件相關者加 3px 鈷藍底線，1.3s |
| ambient 窯況 | 七格火字依 sin 相位在 火／炎／焱 間**離散**置換；燒窯日（週二週五 08–20 臺北時間）基準熱度 0.8，其餘 0.35 | 時間 | 每 1.4s 一步 | 停在當下時刻的一格 |
| input 讀線 | 3px 鈷藍列線與行線跟著游標所在的列／行 | pointermove | 同幀 | 照常（使用者自己在動） |
| input 拖曳 | 字跟手 `translate(dx,dy)`；放手 FLIP 換位 | pointer | 同幀／放手 440ms | 直接換位 |
| transition 換頁 | 16 件瓷白方塊依讀序每 20ms 出現一塊、第 11 塊寫目的頁字；下一頁依反序每 20ms 收走一塊 | 內部連結 | 約 0.42s＋0.32s | 直接換頁 |
| transition 置換 | FLIP：`cubic-bezier(.2,.75,.1,1)` 440ms，逐格延遲 14ms | 鏡／轉／輪／散 | 0.66s | 直接到位 |
| transition 落字 | 字由上落入，`steps(4,end)` 260ms、逐格 28ms（像排字，不是淡入） | 文字改變 | 0.7s | 直接出現 |

自我限制：本風格禁用淡入淡出主打、禁用旋轉、禁用模糊；動作只有**位移與離散替換**。

### motion-library 元件

來源：`wenxiangxiao/motion-library` v1.10.0 @887bb23，以 `tools/ml-embed.js` 只抽該頁元件，**v1.8.0 起 `mount()` 在 `src/motion-player.js`，必須與子集一起 inline**。開發 Prompt 以 `MotionLib.prompt(id)` 取得。

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| BG-A-01 | Grid Fill | index | colors {primary #F4F4EF, secondary #1E3C9A, bg #8DB59F}、duration 9、density .8、intensity 1、seed 1961、16:9 | 模組格依對角相位填滿又空下，就是「一格一單位」的版面；純方塊零圓角零發光 |
| BG-B-33 | Minimal Blocks | index | {#8DB59F, #1E3C9A, #F4F4EF}、duration 8、density 1、seed 1975、1:1 | 三塊方繞中心輪流換位，元素不變只換位置＝特徵⑤置換 |
| TXT-B-22 | Word Pulse Grid | wares | text 碗、{#1E3C9A, #8DB59F, #F4F4EF}、duration 2.4、loop false、seed 420、1:1 | 5×7 字陣依距離相位脈動，正是具體詩的重複方陣；中央底板以 bg 色填，圓角不可見 |
| TXT-B-32 | Shuffle Letters | table | text 擺一桌、{#1E3C9A, #F4F4EF, #8DB59F}、duration 1.8、loop false、seed 16、16:9 | 打亂的字序滑回原位：換位置就是換一首 |
| TXT-A-11 | Repeat Lines | visit | text 鶯歌、{#1E3C9A, #8DB59F, #F4F4EF}、duration 2.2、loop false、seed 129、16:9 | 描邊字列左右交錯滑入、本字定格：重複即節奏 |

掛載：等 `document.fonts.ready`；IntersectionObserver 離屏 `destroy()`、回到視窗重掛；文字元件 `once` 只播一次、之後 `seek(1)`；canvas `aria-hidden`，容器內保留 `.ml-fb` HTML 標題，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。字色由元件依 bg 亮度決定，本站全部放在瓷白或影青（皆為亮底→近黑字）。

## 插畫與圖像風格

**沒有插畫。** 所有「圖」都是字：商品是一個字的 3×3 字陣（中央掉一個構件：碗→宛、盤→般、杯→不、碟→枼），地圖是路名本身沿著路走的方向排在格子裡，次品櫃是「瓷→次」的置換式。器的形狀只用正圓（碗盤杯碟俯視）與正方（方盤、瓷板），不畫輪廓。

## Logo 與 Favicon 設計指南

4×4 方陣：影青底、瓷白方板、十五個墨色小方塊、第 11 格鈷藍、最後一格空。就是「重複＋一個偏離＋一格留白」三條規則的最小示範。字標「白字瓷」900＋小寫 `peh-jī porcelain`。Favicon 為同構 32×32 inline SVG data URI。

## Do & Don't

- Do：一首詩只有一個偏離；空格當字放；拉丁小寫；顏色只給偏離的字。
- Do：用位置說話——同樣的字換讀法、換位置。
- Don't：把具體詩做成文字雲、斜排、弧形排或大小不一的字堆。
- Don't：任何漸層、陰影、圓角卡片、圖示、emoji、裝飾線。
- Don't：紫藍漸層 hero、置中大標＋三卡片、Lorem ipsum、「EST. 19xx」徽章。
- Don't：一頁出現兩種聲部色以上（poetamenos 式多聲部只在明確標註「聲部」時可用，且需圖例）。

## 頁面骨架範例

```html
<nav class="quad" aria-label="主導覽">
  <a href="index.html" aria-current="page" aria-label="首頁">白</a>
  <a href="wares.html" aria-label="器">器</a><a href="table.html" aria-label="擺一桌">擺</a><a href="visit.html" aria-label="來店">來</a>
</nav>
<main>
  <section class="hero">
    <div class="plate"><div class="poem" style="--n:4">
      <span class="cell">瓷</span><!-- ×10 --><span class="cell co">次</span><!-- ×5 -->
    </div><p class="cap">no.1 <b>次品</b> 1975</p></div>
    <div><h1 class="brand">白字瓷<span class="la">peh-jī porcelain · yingge · 1961</span></h1>
      <p>一段話。</p><a class="btn" href="table.html">擺一桌</a></div>
  </section>
</main>
```

## 技術實作與相容性

### 1. Web Audio API 模態合成（D 輸入與感測層「WebAudio 合成（使用者手勢啟動）」）

- 每次敲擊：4 個 `OscillatorNode`（sine）按器形泛音比疊加——碗 1/2.32/4.25/6.63、盤（×0.5）1/1.59/2.14/2.92、杯（×2）1/2.76/5.40/8.93、碟（×1.5）1/2.01/3.9/5.8；`GainNode` 3ms 起音、指數衰減（碗 1.7s、盤 2.6s、杯 0.95s、碟 0.6s，高泛音更快），加 12ms 高通白噪聲當竹籤敲擊；總線經 `DynamicsCompressorNode`。
- 音高：字在讀序中首次出現的順序 → 五聲音階（C D E G A 兩個八度）。同字同音、空格休止；「敲一遍」以 `AudioContext.currentTime` 預排 16 拍（每拍 300ms），畫面游標以 setTimeout 同步。
- 支援：MDN 標 `OscillatorNode` Baseline Widely available（2015-07 起）、`createPeriodicWave` 2021-04；本站只用 OscillatorNode／GainNode／BiquadFilterNode／AudioBufferSource。
- Fallback：沒有 AudioContext 或使用者沒開「聲」→ 只有畫面振動與游標，資訊不變。AudioContext 只在點擊「聲」或「敲一遍」後建立（自動播放政策）。

### 2. Intl.Segmenter（E 資料與生成層「Intl API」）

- `new Intl.Segmenter('zh-Hant',{granularity:'word'})` 取 `isWordLike` 片段當詞（標點自動被丟掉，符合特徵④），再以 `granularity:'grapheme'` 切字；落桌規則：一個 ≤4 字的詞放不進本列剩餘格就把剩餘格留空、換下一列；空白鍵＝空一格、換行＝本列收尾。
- 支援：MDN 標 Baseline 2024（Newly available，2024-04）；caniuse：Chrome／Edge 87、Firefox 125、Safari 14.1（iOS 14.5）。
- Fallback：沒有 Segmenter → 以 `/[\p{L}\p{N}]/gu` 逐字切，提示列寫明「逐字（此瀏覽器沒有斷詞）」。

### 3. FLIP 版面轉場（B 動效與時間軸層）＋ Element.animate()

- First：記下 16 個字按鈕的 `getBoundingClientRect()`；Last：改狀態、重設 `grid-row/grid-column`；Invert＋Play：`el.animate([{transform:'translate(dx,dy)'},{transform:'none'}],{duration:440,easing:'cubic-bezier(.2,.75,.1,1)',delay:i*14})`。
- 支援：MDN 標 `Element.animate()` Baseline Widely available（2020-03 起）。
- Fallback：reduced-motion 或不支援 → 直接換位。

### 效能預算（實測：jsdom＋node 22 計時，非真機）

| 頁 | 檔案 | body 腳本執行 |
|---|---|---|
| index.html | 約 132KB（含元件子集 ~92KB＋播放器 ~5KB） | 41.7ms |
| wares.html | 約 129KB | 12.7ms |
| table.html | 約 141KB | 16.0ms |
| visit.html | 約 129KB | 10.3ms |

全部 ≤350KB、首屏 JS ≤100ms。共鳴振動只改 `.g` 的 transform（合成層）、離屏元件 destroy；同畫面同時運轉的 motion-library 元件 ≤2（首頁兩個背景元件分處兩段）。
