---
name: dancheong-korean-architectural-polychrome
description: Korean dancheong architectural polychrome for the web — stepped three-tone flat shading outlined in black and white, green-above/red-below grounds, ornament concentrated and mirrored at the ends of every member, obangsaek warm/cool alternation, lotus meoricho and rafter-end discs.
---

# 단청 丹青 Dancheong — 韓國木構彩畫

## 設計哲學

단청（丹青，字面是「紅與青」）是朝鮮半島寺院、宮殿、祠廟木構件上的彩畫系統，從三國時代的壁畫傳下來，隨佛教發展；高麗時期以綠、紅、黑、白為主，朝鮮時期加入亮黃與更多中間色。畫丹青的匠人叫 **단청장**，屬韓國國家無形文化遺產。它有兩個用途，一個是保護木頭（擋雨、溫差、濕氣、蟲），一個是表明這棟建築的等級。

它長成這個樣子，是因為製作方式：

1. **地色就是保護層。** 先整棟刷上帶藍的綠土（뇌록）或含鐵的紅土（석간주），上面高、下面低，看起來像一棵樹。
2. **紋樣用拍粉轉印。** 머리초（樑頭紋）先畫在厚紙上（초지），沿線扎針孔，用粉袋拍打，樑上留下點狀輪廓。同一張紙翻過來就能拍另一端，所以兩端永遠互為鏡像。
3. **一人一色。** 打完粉以後，每位畫工只畫自己負責的那一種顏色，走完整棟再換下一個人。每一種顏色因此都是一整層平塗，沒有混色，也沒有漸層。
4. **等級決定畫多少。** 가칠只上地色，긋기加墨白線，모로只在兩端畫머리초，금모로再加幾何錦紋，금단청整根畫滿。

做成網頁時保留上面這四個機制，不能只拿來當一層花紋皮膚：顏色只能是一層一層的平塗；花紋只出現在每個構件的兩端；每個色面外圍都要有墨線和白線；版面要分上綠下紅。

**外部參照**：World Crafts Council–Asia Pacific《Encyclopedia of Crafts in WCC-APR》〈Dancheongjang〉條（Korean Craft & Design Foundation）；The Soul of Seoul〈Dancheong〉；국가유산청 국가무형유산〈단청장〉；景福宮勤政殿、佛國寺大雄殿的금단청實例。

**與型錄近親的分界**：泰式廟宇金漆是黑漆底上貼金箔、剝離出圖樣，丹青沒有金，也沒有黑底。中國木版年畫是印在紙上的人物，丹青畫在構件上，題材是植物和幾何。책가도民畫畫的是屏風上的書架，丹青畫在建築本身。Khokhloma 是金色底上一筆畫成的錐形筆觸，丹青是三階平塗加雙線。

## 本風格的 5 個不可省略特徵

### ① 退暈三階＋墨白雙線（拿掉就變成扁平插畫）
每個色面都用同一色相的三階平塗，由外往內一階比一階亮；最外圈先描墨線，往內一圈是白線。全站不使用任何平滑漸層，CSS 的 gradient 一律寫成硬停點（相鄰兩個色標的位置相同）。

```svg
<!-- 疊筆退暈：先填最淺的顏色，再用 clipPath 把粗細不同的描邊收在形內，由寬到窄疊上去 -->
<clipPath id="p1"><path d="M0 0Q30 -20 60 0Q30 20 0 0Z"/></clipPath>
<path d="M0 0Q30 -20 60 0Q30 20 0 0Z" fill="#F2A083"/>
<g clip-path="url(#p1)" fill="none">
  <path d="M0 0Q30 -20 60 0Q30 20 0 0Z" stroke="#D9472F" stroke-width="19.2"/>
  <path d="M0 0Q30 -20 60 0Q30 20 0 0Z" stroke="#A52A1F" stroke-width="12.8"/>
  <path d="M0 0Q30 -20 60 0Q30 20 0 0Z" stroke="#F3EEE2" stroke-width="6.4"/>
  <path d="M0 0Q30 -20 60 0Q30 20 0 0Z" stroke="#1D1B1A" stroke-width="2.8"/>
</g>
```
```css
.dl{box-shadow:inset 0 0 0 2px #1D1B1A,inset 0 0 0 5px #F3EEE2,inset 0 0 0 7px #1D1B1A} /* 任何面板 */
```

### ② 樹的配色：上綠下紅（拿掉就只是一張多色圖）
地色只有兩種，用哪一種看構件的位置：上方和水平的構件用 **뇌록 #4A8C74**，下方和垂直的構件用 **석간주 #8A3B26**。整個頁面也照這個規則：上半部（簷、樑、內容區）是綠地，下半部（柱、頁尾）是紅褐地。
```css
body{background:#4A8C74}           /* 上：뇌록 */
.lower,footer{background:#8A3B26}  /* 下：석간주 */
.col{background:#8A3B26;box-shadow:inset 4px 0 0 #1D1B1A,inset 9px 0 0 #F3EEE2,inset -4px 0 0 #1D1B1A,inset -9px 0 0 #F3EEE2}
```

### ③ 樑頭集中＋左右鏡像（拿掉就變成滿版壁紙）
紋樣只畫在每個構件的兩端，也就是머리초。兩端的紋樣互為鏡像。中段（계풍）留地色，最多加一條錦紋帶，或放一塊현판（匾額）。版面上的每個區塊都當作一根樑來排：兩端放裝飾，中間放內容。
```js
const b=DC.beam({w:1200,h:150,grade:3,motif:'lotus',motifR:'pomegranate'}); // 左端 dir=+1、右端 dir=−1
```
머리초由端點往樑心依序是：端帶（墨、白、三階）→ 휘 魚鱗帶（兩列交錯的扇貝形）→ 주화 主花（蓮花／石榴／綠花）→ 反向的휘 → 三齒鋸齒尾。

### ④ 오방색冷暖相間（拿掉就失去丹青的節奏）
可用的顏色是靑、赤、黃、白、黑，加上綠。同一個樑頭裡，相鄰兩道色帶必須一冷一暖。主花的顏色不能和地色同一個色相：綠地上不放綠花，紅地上不放紅花。一根管子兩端的主花顏色也要不同。這幾條規矩寫成了規則引擎 `DC.solve()`，用回溯法求解。
```css
:root{--b0:#1F4A93;--b1:#3F77C4;--b2:#9CC0E8;--r0:#A52A1F;--r1:#D9472F;--r2:#F2A083;
      --y0:#B87A12;--y1:#EDB63A;--y2:#F7DE95;--g0:#1E6B45;--g1:#3A9A63;--g2:#9FD2A6}
```

### ⑤ 母題詞彙：椽頭圓、方椽頭、蓮花、휘、七寶紋
簷下有兩排構件端頭：圓形的서까래椽頭，畫同心退暈環加八瓣；方形的부연椽頭，畫套方加四瓣。主花有三種：蓮花、石榴、綠花。中段的錦紋用칠보七寶紋（交疊的圓環）。
```css
.ra{border-radius:50%;background:radial-gradient(circle closest-side,#EDB63A 0 18%,#1D1B1A 18% 21%,#F3EEE2 21% 25%,#9CC0E8 25% 48%,#3F77C4 48% 66%,#1F4A93 66% 80%,#F3EEE2 80% 87%,#1D1B1A 87%)}
.ra::after{content:"";position:absolute;inset:16%;border-radius:50%;background:repeating-conic-gradient(from var(--rot),#D9472F 0 9deg,transparent 9deg 45deg);
  mask:radial-gradient(circle closest-side,transparent 0 30%,#000 30% 86%,transparent 86%)}
.bu{box-shadow:inset 0 0 0 1.5px #1D1B1A,inset 0 0 0 3px #F3EEE2,inset 0 0 0 5px #A52A1F,inset 0 0 0 8px #D9472F,inset 0 0 0 9px #F2A083;background:#F7DE95}
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 뇌록 綠地 | #4A8C74 | 上半部地色、樑身 | 約 38% |
| 뇌록 暗 | #3C7662／#24493D | 樑頭區底、簷下 | 約 14% |
| 석간주 紅褐 | #8A3B26／#73301F | 下半部、柱、頁尾 | 約 18% |
| 靑三階 | #1F4A93 #3F77C4 #9CC0E8 | 휘鱗帶、椽頭環、按鈕 | 約 8% |
| 赤三階 | #A52A1F #D9472F #F2A083 | 主花、端帶、主要按鈕 | 約 7% |
| 黃三階 | #B87A12 #EDB63A #F7DE95 | 蓮心、尾齒、焦點框 | 約 5% |
| 綠三階 | #1E6B45 #3A9A63 #9FD2A6 | 後層花瓣、휘 | 約 4% |
| 호분 白 | #F3EEE2 | 白線、內容面板 | 約 5% |
| 먹 墨 | #1D1B1A | 墨線、현판底、字 | 約 1%（線） |

規則：一個色相固定三階，不准另外調出中間色。不使用 opacity 或 rgba 去「調淡」顏色。最亮的白是 #F3EEE2，不用純白；最暗的墨是 #1D1B1A，不用純黑。

## 字體系統

- 標題、현판：**Noto Serif TC 900**，字距 .06–.24em，白字墨底，外加黃框、墨框、紅框三道。
- 內文：**Noto Sans TC 400/500**，16px，行高 1.75，墨字放在호분白面板上。
- 韓文術語與小標：**Gowun Batang 400/700**，標籤字距 .2em。
- 字級：54／44／32／24／19／16／14／12。현판標題 `clamp(26px,3.6vw,54px)`。
- 長文不可以直接排在綠地上，一律先放進白面板。

## 版面與網格

- 每一頁從上到下：簷（방椽頭列＋圓椽頭列）→ 樑（현판）→ 柱間（內容）→ 紅褐的柱腳和頁尾。
- 每一段內容都排成一根「樑」：左右兩端是裝飾帶，中間是內容。正中可以掛一塊현판。
- 構件一律水平或垂直，不旋轉（車架的管子例外，因為它本來就是斜的）。
- 面板之間不留白縫，用雙線（墨、白、墨）隔開。整體密度偏高，這是寺院彩畫的本色。
- 最大寬度 1180px；手機寬度（≤560px）時，簷下椽頭縮小，현판移到樑的下方，柱寬縮成 14px。

## 元件配方

- **導覽（椽頭導覽）**：三枚 64px 的圓椽頭掛在簷下。現用頁的椽頭是금（全彩退暈加八瓣），其他頁只畫긋기（綠地加墨白環）。hover 時亮成全彩。下面掛一張墨底小현판寫頁名。
- **按鈕**：赤 #D9472F 平塗，內框三道（墨 2px、白 4px、墨 6px）；hover 換成深一階。不用圓角、不用陰影。
- **面板**：`background:#F3EEE2;box-shadow:inset 0 0 0 2px #1D1B1A,inset 0 0 0 6px #F3EEE2,inset 0 0 0 8px #1D1B1A`。
- **表單／選項**：等級按鈕左邊是一條硬停點色帶，顯示該等級的樣貌；選中時背景換成黃 #F7DE95，加一圈紅色內框。
- **頁尾**：上緣是一條柱頭方塊帶（綠、墨、白、墨、紅褐的 repeating-linear-gradient 硬停點），底色紅褐。

## 動效規則

| 種類 | 本站實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 簷角풍경魚形風磬擺盪 | 常駐 | 3.6s／4.1s ease-in-out 往返 ±7° | 靜止 |
| input | 椽頭隨游標亮一階、八瓣轉 22.5°；車架上擦粉 | pointermove | --rot 80ms linear（@property `<angle>`） | 只換色不轉 |
| transition | 五道色帶（墨、白、靑三階）依序刷下再刷走 | 站內換頁 | 360ms＋每道延遲 70ms，cubic-bezier(.6,0,.3,1) | 直接換頁 |
| signature | **一遍一色**：捲動時一根樑依八道工序逐層上色，每層由左往右刷開 | 捲動（view-timeline） | animation-range 每道 9%，間隔 12.5% | steps(1)：到達即整層出現 |

自我限制：不淡入淡出（顏色只能「被畫上去」），不做模糊，不放大縮小。

### motion-library 元件表（motion-library 1.17.0 @ebc42ee，`tools/ml-embed.js` 子集 inline 為每頁第一個 `<script>`）

| ID | 名稱 | 頁 | 參數 | 承載／為什麼適合 | 種類 |
|---|---|---|---|---|---|
| BG-B-40 | Nested Squares | 簷下 | primary #3F77C4／secondary #D9472F／bg #24493D，duration 8，density .7，seed 1968，1:1 | 放在〈五等彩〉標題旁，就是一枚부연方椽頭：套方一圈一圈輪轉，只用描邊矩形，零圓角、零發光 | ambient |
| TXT-B-16 | Circle Text | 簷下 | text「樑頭車架」，primary #A52A1F／secondary #1F4A93／bg #F3EEE2，1.8s，loop:false，1:1 | 店名先沿圓椽頭的圓周排成一圈，再拉直成一行。容器裁成圓形，外框是靑環 | transition |
| SHP-22 | Radial Fan | 車架 | primary #D9472F／secondary #EDB63A／bg #F3EEE2，1.6s，loop:false，1:1 | 工單完成時，八個扇形赤黃相間展開成一朵連花주화，中心留白當蓮心 | transition |
| TXT-A-35 | Stripe Mask | 一遍一色 | text「一遍一色」，primary #EDB63A／bg #1D1B1A，1.6s，loop:false | 十四道直條依序把字露出來，就是一遍一遍刷上去；亮色字放在墨底上 | transition |
| SHP-32 | Stairs Rise | 一遍一色 | primary #9CC0E8／secondary #1F4A93／bg #F3EEE2，1.8s，loop:false，1:1 | 七根色階柱由淺到深依序升起，用來解說退暈的階梯；每根柱子都是平塗 | transition |

每個元件的開發 prompt 可以用 `MotionLib.prompt(id)` 取出。掛載走 `NT.ml`：等 `document.fonts.ready` 之後才掛，離開畫面就 `destroy()`，canvas 設 `aria-hidden`，原本的 `.ml-fb` 標題保留給讀屏軟體，reduced-motion 時停在 `seek(.35)` 或 `seek(1)`。同一個畫面上最多同時跑 2 個元件。

## 插畫與圖像風格

技法名稱是「疊筆退暈」（stacked-stroke stepped shading）。所有圖像都由 `DC` 產生器組出來：
- 形狀只有六種原語：花瓣（兩條二次曲線）、圓、扇貝（三次曲線）、三角齒、矩形帶、七寶圓。
- 每個形狀都輸出成八「遍」：base、打粉、靑、赤、黃、綠、白線、墨線。全部一起輸出就是成品，一遍一遍分開輸出就是工序。
- 打粉層是白色的點狀描邊（`stroke-dasharray:0 4.6`，`stroke-linecap:round`），收在形內，最後會被墨線蓋住。
- 不使用照片、寫實光影、透視（車架只有側視一個角度），也不畫人物。

## Logo 與 Favicon 設計指南

Logo 是一枚方椽頭裡套一枚圓椽頭：外框綠，接著墨、白、赤兩階，裡面是綠地，正中一枚靑環、赤八瓣、黃心的圓椽頭。Favicon 在 32px 下只保留赤框、綠地、靑三環、赤四角星和黃心。字標用 Noto Serif TC 900，白字墨底，加黃色內框。

## Do & Don't

- **Do**：顏色一定是三階平塗；每個色面都有墨線加白線；紋樣只畫在端頭並左右鏡像；上綠下紅；冷暖相間；先打粉（輪廓）再上色。
- **Don't**：平滑漸層、透明度調色、模糊陰影、發光、圓角（整圓除外）、金屬或金箔（那是泰式金漆，不是丹青）、滿版重複的壁紙紋樣、把同一色相的花放在同色的地上。
- **去 AI 化禁令**：不要紫藍漸層，不要置中三卡片，不要 emoji 當圖示，不要 Lorem ipsum，不要「EST. 19xx」徽章。

## 頁面骨架範例

```html
<header class="eave"><div class="bu-row"></div><div class="ra-row"></div>
  <nav class="nav"><a href="index.html" aria-current="page"><span class="disc"></span><span class="tag">簷下</span></a>…</nav></header>
<main>
  <section class="hbeam"><svg viewBox="0 0 1200 150"><!-- DC.beam({grade:3}) --></svg>
    <div class="plaque"><h1 class="hyeon">店名</h1></div></section>
  <div class="bay"><div class="col"></div><div class="opening"><div class="panel">內容</div></div><div class="col"></div></div>
</main>
<div class="saw"></div><footer>…</footer>
```

## 技術實作與相容性

1. **CSS 硬停點 radial-gradient／repeating-conic-gradient（A 渲染層）**：負責圓椽頭的退暈環、八瓣、方椽頭的四瓣，以及等級色帶。查證：MDN〈conic-gradient()〉與〈repeating-conic-gradient()〉標示 Baseline Widely available，2020-11 起各大瀏覽器都支援。八瓣的旋轉用 `@property --rot{syntax:"<angle>"}` 補間；不支援 @property 的瀏覽器只會換色，不會轉。mask-image 不支援時，八瓣會蓋滿整個圓（仍然是硬邊）。
2. **CSS scroll-driven animations：`view-timeline` ＋ `animation-timeline` ＋ `animation-range`（B 動效與時間軸層，最近 6 站沒有出現過）**：負責 signature〈一遍一色〉。`.paint{view-timeline:--paint block}`，八個層各自 `animation-range:contain i×12.5% contain i×12.5+9%`，keyframes 是 `clip-path:inset(0 100% 0 0)→inset(0 0 0 0)`。查證：MDN〈view()〉標示 **Limited availability／非 Baseline**；Chrome for Developers 列出 Chrome／Edge 115+、Safari 26 支援，Firefox 尚未正式支援。Fallback：以 `@supports (animation-timeline:view())` 判斷，不支援時由 JS 在 scroll 事件（rAF 節流）算出同樣的進度，寫進 `style.clipPath`。沒有 JS 又不支援時，八層全部直接顯示（預設不裁切），內容不會缺。
3. **오방색規則引擎（E 資料與生成層「約束求解／規則引擎」，最近 6 站沒有出現過）**：負責〈點一副車架〉。變數是 6 個樑頭 × 5 個色位，值域是靑赤黃綠四色。限制有五條：R1 相鄰冷暖相間、R2 主花不與地色同色相、R3 管子兩端主花不同色、R4 使用者指定的值不改、R5 主花與第一道휘不同色。用 xorshift 種子決定候選順序，再做回溯求解。無解時回報是哪個樑頭、違反哪一條規則，例如鎖定綠地上的主花為 록 會回報 R2。node 實測：可解的情形 21–33 步、<1ms。
4. **分遍渲染**：同一份幾何依「遍」分桶輸出。車架頁把每一遍放在各自的 `<svg>` 圖層裡，用 WAAPI 對 `clip-path:inset()` 做由左往右的刷開（HTML 盒子上的 inset 各大瀏覽器都支援，比 SVG `<g>` 上的 clip-path 穩定）。打粉用 SVG `<mask>`：指標擦過的地方會加一個白色圓，每個接頭累積 14 次才算打好。另外有「一口氣打完粉」按鈕，方便鍵盤和無障礙使用者操作。

**效能實測**（建置期以 node 量測，jsdom 冒煙測試沒有錯誤）：首頁 283KB、車架頁 248KB、一遍一色頁 308KB，都低於 350KB，其中約 186KB 是 motion-library 子集。一副金단청車架的 SVG 字串約 36 萬字元，在 node 中產生約 3.3ms（20 次平均），規則引擎求解平均 0.03ms。DOM 層數固定 10 層。動畫只動 clip-path、transform 和自訂屬性，不會造成 layout thrashing。
