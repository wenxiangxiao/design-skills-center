---
name: tingatinga-enamel-board
description: Tingatinga (Tanzania, 1968–) enamel-board painting for the web — every page is one square board in a single unmixed bicycle-enamel colour, naive animals outlined in black first and then filled straight from the can, fur made entirely of dots, rings, stripes and zigzags, horror-vacui filler dots and birds, a hard white gloss crescent and a hand-painted signature in the corner.
---

# Tingatinga 瓷漆硬板畫 Tingatinga Enamel Board Painting

> 範例站：`sites/kim-io-be`（金搖馬 KIM-IÔ-BÉ 投幣搖搖馬修理彩繪行，臺中太平）。風格與產業分離——這份規格可直接用在任何產業。

## 一、設計哲學

Tingatinga 是一種「用現成的便宜材料把動物畫得很開心」的畫。1968 年，Edward Saidi Tingatinga（1932–1972）在達累斯薩拉姆用天花板剩下的 3 mm 正方硬板（masonite）和腳踏車瓷漆開始畫，在 Oyster Bay 的 Morogoro Stores 門口賣給經過的人；1972 年他意外過世，學生延續成 Tingatinga Arts Co-operative Society（1990 年正式成立，至今仍在原址）。形式的每一條規則都來自材料與市場：

- **正方硬板**：天花板板材是方的，小、輕，觀光客帶得走 → 畫面永遠是一塊正方形。
- **腳踏車瓷漆**：一罐就是一個飽和顏色，不調、不稀釋，乾了會亮 → 平塗、零漸層、有一道亮光。
- **先黑線**：先用黑漆勾整隻動物，再把罐色填進格子 → 黑線是骨架，色塊是填空。
- **動物要討喜**：大眼、長脖、細腿、露齒笑；皮毛畫成圖案 → 幽默、天真，不寫實。
- **畫面不能空**：剩下的地方補小點、小花、小鳥 → horror vacui。

網頁轉譯的總原則：**一頁＝一塊板**。頁面底色就是那一罐底漆，邊上露出硬板褐；所有圖都用 SVG 依「黑線 → 罐色 → 圖案 → 亮光 → 簽名」的順序疊出來。熱鬧，但每一塊顏色都被黑線關好。

## 二、本風格的 5 個不可省略特徵

### 特徵 1：一塊正方板、一罐底色（版面手法＋色彩規則）

整頁（或整個主圖）是一塊單色板：一罐未調和的瓷漆平塗到底，**零地平線、零透視、零陰影**——動物直接浮在色面上。板邊露出硬板的褐色。主圖一律 `aspect-ratio:1/1`。

```css
:root{--ver:#E4502B;--mas:#7A5435;--ink:#16110D}
body{background:var(--ver)}                       /* 一頁一罐：首頁朱、內頁土耳其藍、遊戲頁向日黃 */
body::after{content:"";position:fixed;inset:0;border:10px solid var(--mas);pointer-events:none}  /* 硬板邊 */
.board{aspect-ratio:1/1;border:6px solid var(--mas);outline:4px solid var(--ink)}
```
```svg
<svg viewBox="0 0 400 400"><rect width="400" height="400" fill="#E4502B"/><!-- 不畫地面、不畫天空 --></svg>
```

### 特徵 2：黑線先行、罐色直塗（形狀語彙）

每個形都由三層組成：**底色層（罐色）→ 圖案層 → 黑線層（3–5 px，round join）**。罐色只能從 6＋2 罐裡挑，不調色、不透明度、不漸層；相鄰兩塊不得同罐。沒上色時（工序 2）畫面只剩黑線——這一層必須能單獨成立。

```svg
<ellipse cx="190" cy="232" rx="112" ry="58" fill="#F5C01A"/>                         <!-- 罐色 -->
<ellipse cx="190" cy="232" rx="112" ry="58" fill="url(#p-dot)"/>                     <!-- 圖案 -->
<ellipse cx="190" cy="232" rx="112" ry="58" fill="none" stroke="#16110D" stroke-width="4" stroke-linejoin="round"/> <!-- 黑線 -->
```
```css
.board .s{fill:var(--c)}            /* 每個形用 style="--c:#hex" 帶罐色 */
.board .ol{fill:none;stroke:#16110D;stroke-width:4;stroke-linejoin:round;stroke-linecap:round}
.st2 .s{fill:#FFF7E6}               /* 工序 2：只見黑線 */
```

### 特徵 3：皮毛就是圖案（裝飾母題）

動物身上不畫毛、不畫明暗，**整片填滿圖案**：點（黑點＋色心）、同心圈、斜條、Z 字、鱗、斑塊。一隻動物至少三種圖案、不同部位不同圖案（身體點、鬃毛 Z 字、腿斜條）。圖案用 SVG `<pattern>` 平鋪，色只用黑＋一罐對比色。

```svg
<pattern id="p-dot" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="4.4" fill="#16110D"/><circle cx="8" cy="8" r="1.7" fill="#FFF7E6"/></pattern>
<pattern id="p-zig" width="16" height="11" patternUnits="userSpaceOnUse"><polyline points="0,9 4,2 8,9 12,2 16,9" fill="none" stroke="#16110D" stroke-width="2.6"/></pattern>
<pattern id="p-str" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><rect width="6.5" height="15" fill="#16110D"/></pattern>
<pattern id="p-ring" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="8" fill="none" stroke="#16110D" stroke-width="2.6"/><circle cx="12" cy="12" r="3" fill="#F08CB0"/></pattern>
```
空白處用 xorshift 決定的小圓點（r 2–5.4）、六瓣小花、兩隻小鳥補滿（只補在主角外圍，不壓主角）。

### 特徵 4：天真誇張的動物（形狀語彙）

側身剪影＋正面臉、大圓白眼＋黑瞳＋白點（看著觀者）、露齒笑、腿細而直、脖子可以長得離譜。比例服從幽默，不服從解剖。形只用橢圓、圓、四邊形、星形多邊形組成——像用刷子一筆塗出來的大形。

```svg
<polygon points="…22 角星…" fill="#1AA39C"/>                 <!-- 鋸齒鬃毛：star(cx,cy,82,62,22) -->
<circle cx="275" cy="160" r="14" fill="#FFF7E6"/><circle cx="275" cy="160" r="7.3" fill="#16110D"/>   <!-- 大眼 -->
<path d="M266 194Q292 226 318 194Z" fill="#16110D"/><path d="M272 197l5 7 5-6 5 7 5-7 5 7 5-7 5 6 4-6z" fill="#FFF7E6"/> <!-- 露齒笑 -->
```

### 特徵 5：瓷漆亮光與手寫簽名（裝飾母題＋字體選擇）

瓷漆乾了會亮：每隻動物身上與每顆眼睛各一道**硬邊白色月牙**（不是漸層、不是模糊）。右下角一行大寫手寫簽名＋年份（Permanent Marker，旋轉 −4°）。UI 招牌板右上也有同一道月牙。

```svg
<path d="M130 206A23 23 0 0 1 162 188A30 30 0 0 0 130 206Z" fill="#FFF7E6"/>   <!-- 月牙亮光 -->
<text x="388" y="392" text-anchor="end" font-family="Permanent Marker" font-size="15" transform="rotate(-4 388 392)">KIM-SUI 1988</text>
```
```css
.sign::after{content:"";position:absolute;right:16px;top:10px;width:34px;height:12px;border-radius:50%;border-top:5px solid #fff;transform:rotate(-14deg)}
```

## 三、色彩系統

| 罐 | hex | 用途 | 約占比 |
|---|---|---|---|
| 朱 | `#E4502B` | 首頁底罐、獅子板、動作按鈕 | 頁底 60–70% |
| 向日黃 | `#F5C01A` | 遊戲頁底罐、獅身、主按鈕、強調字 | 8–60% |
| 土耳其藍 | `#1AA39C` | 內頁底罐、鬃毛、大象板 | 8–60% |
| 葉綠 | `#3D9A3A` | 斑馬板、花葉、鳥 | 3% |
| 鈷藍 | `#2747A6` | 大象身、深色板 | 3% |
| 粉 | `#F08CB0` | 耳、粉紅獅、hover 換色 | 3% |
| 黑 | `#16110D` | 全部線、點、文字、投幣箱 | 10–14% |
| 瓷白 | `#FFF7E6` | 眼白、點心、亮光、招牌板底 | 8–12% |
| 硬板褐 | `#7A5435` | 板邊、工序 1 底 | 2–4% |

規則：一頁一罐底；相鄰兩塊不同罐；**零漸層、零陰影、零透明度混色**；文字放在瓷白招牌板上（黑字），大標題用瓷白字＋黑描邊直接壓在底罐上。

## 四、字體系統

- 標題拉丁：**Lilita One**（Google Fonts）——像招牌師傅刷的胖圓體。中文標題：**Noto Sans TC 900**。
- 內文：Noto Sans TC 500，16 px／1.7。
- 簽名：**Permanent Marker**，只用在板角簽名。
- 字級：h1 `clamp(56px,9vw,128px)`／h2 `clamp(34px,5vw,58px)`／內文 16／註 13.5。大標 `-webkit-text-stroke:3px #16110D; paint-order:stroke fill`——字也先描黑線。

## 五、版面與網格

- 首屏：左板右字（1.08fr／.92fr），板寬 `min(100%,82vh)`；≤980px 板在上。
- 內容：招牌板（`.sign`）是唯一的資訊容器：瓷白、4px 黑線、四角不等半徑（手剪）、可旋轉 −0.8°。
- 分隔：一行黑點（`radial-gradient` 18px 間距）取代細線。
- 小板格：4 欄正方板（≤980 兩欄），每塊下面一張說明牌。
- 留白：板與板之間 18px；頁底留 140px 給投幣箱導覽。

## 六、元件配方

- **導覽 coin-slot-nav**：右下固定黑色投幣箱，三格投幣口；hover 時一枚十元從口裡探出 6px，現用頁的那枚已插進一半（`clip-path:inset(0 0 45% 0)`）。≤560px 落為底部三等分。
- **按鈕**：向日黃底、4px 黑線、不等角半徑 `22px 14px 26px 12px/16px 26px 12px 22px`；hover 換粉罐並轉 −2°。零陰影。
- **招牌板**：見特徵 5。
- **表格**：招牌板內，行線用 3px 黑點線 `dotted`；價錢用 Lilita One 朱色。
- **罐子色票**：方塊上半是罐色、頂部一顆黑色橢圓蓋、一道白月牙；下半瓷白寫名稱與 hex。
- **footer**：三張招牌板並排。

## 七、動效規則（四種，缺一不可）

| 類型 | 本站自製實作 | 觸發／參數 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 首頁獅子搖搖馬原地搖 `rotate(±3.2deg)` 3.6s ease-in-out；兩隻小鳥沿 CSS `offset-path` 繞板頂飛（16s／23s linear，`offset-rotate:auto`） | 載入即播 | 停在 0°；鳥停在路徑 28%／70% |
| input 輸入 | 眼珠跟游標（≤5 單位）＋點紋／鋸齒圖案的 `patternTransform` 隨游標平移；按住小板看黑線稿；滑過罐子換示範板底色 | pointermove 當幀 rAF；pointerdown／hover | 眼不動；按住與換色照常（無位移） |
| transition 轉場 | 換頁：一把下一頁底罐顏色的漆刷（鋸齒 `clip-path` 邊）440ms 由左刷過，下一頁 520ms 再刷走；工序切換：同款刷子 560ms 掃過示範板，刷到正中換工序 | 點內部連結／點工序 | 直接換頁／直接換工序 |
| signature 簽名 | **節拍點紋 beat-dotting**：〈搖一首〉裡搖搖馬依 Web Audio 時鐘 `7°·cos(π·拍相位)` 前後搖，每一拍按準了就在牠身上 best-candidate 取樣點下 1–2 顆三層點紋（彈出 .32s），點到 8／20／34 顆時，腿／鬃毛／身體的 SVG `<pattern>` 以 `patternTransform scale(.3→1)` 彈開長出 | 空白鍵／點板／點按鈕 | 不搖；拍點以燈號與「點」字顯示；點紋直接出現 |

自我限制：不用淡入當主打、不用陰影、不用模糊。

### motion-library 元件（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` 1.33.0 @41128f85，`tools/ml-embed.js` 逐頁產生子集後 terser 壓縮，`tools/ml-smoke.js` smoke ok。參數可用 `MotionLib.prompt(id)` 查原始開發 Prompt。

| ID | 名稱 | 頁 | 類型 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-26 | Swing Letters | index | transition（一次性進場） | text「十元搖一首」、primary #F5C01A、secondary #1AA39C、bg #E4502B、duration 3.2、loop:false、intensity 1.2、seed 1979 | 每個字吊在一根橫桿下衰減擺盪＝投幣搖搖馬的搖；純填色字、零發光，字色由朱底自動取近白 |
| BG-A-07 | Random Pop Dots | index | ambient | primary #F5C01A、secondary #FFF7E6、bg #1AA39C、duration 6、density 1.4、seed 1988 | 一顆顆彈出又縮回的實心圓＝Tingatinga 補滿空白的小點；只有平塗圓、零漸層 |
| SHP-07 | Wobble | rides | ambient | primary #E4502B、bg #1AA39C、duration 3.6、intensity 1.1、seed 22、aspectRatio 1:1 | 一團平塗朱色、邊緣蠕動的形＝剛倒出來的一滴瓷漆；元件附 6% 輔助格線，在土耳其藍底上幾乎不可見 |
| TXT-A-06 | Stretch Pop | rides | transition（一次性進場） | text「六罐，不調色」、bg #1AA39C、duration 1.4、loop:false、seed 6 | 字由細長拉伸彈回＝罐蓋撬開的那一下；零發光 |
| BG-B-25 | Circle Pop | ride | ambient | primary #F5C01A、secondary #E4502B、bg #16110D、duration 5、density 3、seed 108 | 黑底上一顆顆亮起、擴一圈環再熄掉的圓＝搖搖馬燈箱的燈泡；只有平塗圓與細環 |
| TXT-B-18 | Letter Bounce | ride | transition（結果進場） | text「搖完了！」、primary #F5C01A、bg #E4502B、duration 1.6、loop:false、seed 32 | 字從上方落下、壓扁彈起＝搖搖馬最後一下停住；每輪結束 replay() |

掛載：等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、一次性文字 `once` 後重掛 `seek(1)`、canvas `aria-hidden`、容器內保留 `.ml-fb` 原 HTML 標題；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同畫面同時運轉 ≤2 個。元件不擔任 signature。

## 八、插畫與圖像風格

技法代號 **enamel-pattern-beasts 瓷漆圖案獸**：全站零圖檔；所有圖由 `anim.js` 以字串產生 SVG（建置期在 node 預先輸出，無 JS 也看得到）。每隻動物＝少量大形（橢圓身、星形鬃、四邊形腿＋橢圓腳掌、圓臉）× 三層（罐色／圖案／黑線）；坐在一條褐色弧形搖座上，搖座中央一個黑色投幣盒（「NT$10」）。四款：獅子（點紋身、Z 字鬃、斜條腿）、大象（點紋身、同心圈耳、鱗腿）、長頸鹿（斑塊）、斑馬（斜條＋Z 字鬃）。工序可用 class 切換：`st1` 玻纖灰、`st2` 黑線稿、`st3` 罐色、`st4` 圖案與填空、`st5` 亮光與簽名。

## 九、Logo 與 Favicon

朱色正方板上一顆獅子頭：土耳其藍 28 角鋸齒鬃、向日黃臉、兩顆大白眼、露齒笑；四角各一顆黑點、兩顆白點補空。`assets/logo.svg`；favicon 為同一張 SVG 的 data URI。

## 十、Do & Don't

- Do：一頁一罐底；先黑線；每隻動物三種以上圖案；補滿空白；一道硬邊月牙亮光；板角簽名。
- Do：讓文字住在瓷白招牌板裡，板四角半徑不相等。
- Don't：漸層、陰影、模糊、半透明疊色、寫實比例、光源方向、地平線或透視。
- Don't：把 Tingatinga 畫成「非洲剪影＋夕陽」的觀光明信片；本風格的身分是平塗瓷漆與圖案皮毛，不是異國情調。
- 去AI化：禁紫藍漸層、禁置中三卡片、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章、禁 rounded-2xl＋模糊陰影卡片。

## 十一、頁面骨架範例

```html
<body style="--bg:#E4502B">
<main class="wrap">
 <section class="hero">
  <div class="hero-board"><svg class="board st5 rock" viewBox="0 0 400 400">…</svg></div>
  <div class="hero-txt"><span class="tag">副標</span><h1><span class="zh">店名</span><span class="en">LATIN</span></h1>
   <p class="lede">一句話。</p><p class="sign">營業狀態</p><a class="btn" href="ride.html">主動作</a></div>
 </section>
 <div class="dotrule"></div>
 <section><h2>標題</h2><div class="sign tilt">內文</div></section>
</main>
<nav class="coinbox"><a href="index.html" aria-current="page"><i></i><span>畫板</span></a>…</nav>
</body>
```

## 十二、技術實作與相容性

### 1. SVG `<pattern>`＋`patternTransform`（A 渲染層「SVG pattern 平鋪」；最近 6 站未出現）
承載特徵 3：所有皮毛圖案都是 userSpaceOnUse 的 `<pattern>`；游標移動時改寫 `patternTransform="translate()"`，〈搖一首〉解鎖時以 rAF 改寫 `scale(.3→1)`（ease-out-back）。查證：MDN〈patternTransform〉標示 Baseline Widely available（2020-01 起全瀏覽器），並建議仍用屬性而非 CSS `transform`（SVG2 的 CSS 寫法實作不完整）——本站因此全用屬性。Fallback：不需要；無 JS 時圖案以靜態屬性顯示。

### 2. CSS Motion Path `offset-path: path()`（B 動效層「SVG SMIL / animateMotion / offset-path」；最近 6 站未出現）
承載 ambient 飛鳥與投幣：鳥的迴圈依板尺寸在 JS 重算；十元硬幣以 `position:fixed` 放在視窗原點，`offset-path` 用視窗座標畫一條二次貝茲，WAAPI 補間 `offset-distance 0→100%` 飛進板上的投幣口。查證：caniuse `offset-path: path()`——Chrome 64+、Edge 79+、Firefox 72+、Safari 16.0+（iOS 16+）；MDN `offset` 標示 Baseline Widely available（2022-09 起）。Fallback：`@supports not (offset-path:path("M0 0"))` 隱藏飛鳥；投幣時 `CSS.supports` 為否則跳過飛行直接開始。

### 3. Web Audio 時鐘排程＋鍵盤／指標判拍（D 輸入與感測層「WebAudio 合成（使用者手勢啟動）」）
承載 signature：投幣（使用者手勢）時建立 `AudioContext`；25ms 的 `setInterval` 以 120–140ms lookahead 把方波旋律、三角波低音、八分音高頻排進 `AudioContext.currentTime`；搖擺角與判拍都讀同一個時鐘（±90ms＝準、±180ms＝好），並扣掉 `outputLatency`（上限 50ms）。查證：MDN `AudioContext.outputLatency` 為 Baseline 2025（Safari 18.4 起）——舊 Safari 沒有此屬性時視為 0。Fallback：沒有 Web Audio 或勾「靜音」時改用 `performance.now()` 當時鐘，看燈號玩，判拍規則不變。

### 效能預算實測

| 頁 | 單檔大小 | 其中 motion-library 子集 |
|---|---|---|
| index.html | 約 244 KB | 約 159 KB（BG-A-07＋TXT-B-26，terser） |
| rides.html | 約 203 KB | 約 158 KB |
| ride.html | 約 210 KB | 約 159 KB |

- 全部 ≤350 KB。首屏 JS：本站自寫腳本在 jsdom 中執行約數毫秒（板子已在建置期輸出為靜態 SVG，執行期只綁事件）；元件庫在 `document.fonts.ready` 後才掛載，不佔首屏。實際瀏覽器的 100ms／60fps 未在本輪以真機量測，屬估計值。
- 同畫面同時運轉的元件 ≤2；離屏 destroy。
- 動畫只改 `transform`、`offset-distance`、SVG 屬性與 `opacity`，無 layout thrashing。
