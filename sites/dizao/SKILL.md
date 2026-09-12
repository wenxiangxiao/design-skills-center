---
name: grunge-raygun
description: Grunge / Ray Gun (David Carson, 1992–1998) — a real 12-column baseline grid, deliberately violated: type-as-texture at eight size steps, xerox-thresholded imagery with no midtones, misregistered three-plate overprint, torn clip-path masks and bleed crops on a photocopier-grey ground.
---

# 影印濁灰・破格編排｜Grunge／Ray Gun

> 本規格書描述的是 **1992–1998 年間以《Ray Gun》為代表的 Grunge／破格編排流派**（美術指導 David Carson），不綁定產業。範例站是一間聽力所的季刊，但這套語言同樣可以做唱片廠牌、滑板店、獨立書店、實驗劇場、學生刊物或任何「內容比禮貌重要」的東西。
>
> 一句話判準：**把首屏截圖遮掉全部文字，懂設計的人要能在三秒內說出「這是 Ray Gun 那一路的」。** 做不到就回去加強視覺特徵，不要加強引擎。

---

## 一、設計哲學

這個流派誕生在一個很具體的技術條件裡：一九九〇年代初的 Macintosh、QuarkXPress、Fontographer，加上一台影印機。設計師第一次可以自己造字、自己疊圖、自己把印前的每一個環節搞壞，而且壞得起——雜誌是月刊，錯了下個月再說。

David Carson 在《Beach Culture》（1990–91）與《Ray Gun》（1992–98）做的事被歸納成一句常被引用的話：**不要把「可讀」（legibility）和「傳達」（communication）搞混。** 最極端的一次是他把一篇 Bryan Ferry 的專訪整篇排成 Zapf Dingbats——一整篇符號，一個字也讀不出來，而讀者記住了那一頁。

因此本流派的三條哲學：

1. **版面本身就是內容的態度。** 一篇講憤怒的文章不該排得跟講保險一樣。字級、錯位、切斷，是語氣不是裝飾。
2. **破壞必須有東西可破壞。** 這是最多人做錯的一點：Ray Gun 的版面之所以讀得出「壞」，是因為底下有一張真的網格、有真的欄、有真的基線。隨手把東西亂丟不是這個風格，那只是亂。**先蓋好房子，再拆牆。**
3. **手是機器的手。** 錯位是印刷機沒對準、顆粒是碳粉、斷邊是紙被撕開——不是手抖濾鏡、不是隨機抖動。方向要一致，錯得要像機器錯的。

**這個流派的邊界（本規格書明文加上去的紀律）**：破壞標題、破壞圖、破壞版面關係；**不破壞長文的可讀性**。長文一律排在乾淨的紙板上、對比 ≥ 12:1、字級 ≥ 15px、行高為 8 的整數倍。Carson 的內文本來也是排得好好的——會被誤會的是那些只看過他標題的人。

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，畫面就會滑回「一般的粗獷風網頁」。每一項都附可直接複製的片段。

### 1　有一張真的網格，然後被違反

12 欄、8pt 基線，**實際存在而且看得見**（0.5–1px 的淡線常駐）。巢狀區塊用 `subgrid` 對齊祖先的欄與基線——這樣一來，紙板裡的文字欄和頁面的欄是同一條線，而騎過去的標題才有東西可以騎。

```css
.spread{display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:8px}
.blk{display:grid;grid-template-columns:subgrid;grid-template-rows:subgrid}
@supports not (grid-template-columns:subgrid){
  .blk{grid-template-columns:repeat(var(--sp,6),1fr)}
}
/* 看得見的網格：12 個空 span，每個左邊一條線 */
.rule{position:absolute;inset:0;pointer-events:none;display:grid;grid-template-columns:repeat(12,1fr)}
.rule span{border-left:1px solid rgba(23,23,27,.13)}
```

違反的三種標準做法：**騎過欄溝**（`grid-column:1/span 9` 而正文是 `2/span 7`）、**出血**（`margin-left:-48px;overflow:hidden`）、**壓過欄線**（`z-index` 高於 `.rule`）。

### 2　字級跳階、負字距、行距塌陷

同一組語意至少橫跨三個字級，最大／最小 **≥ 5 倍**；字距 −0.045em 以下；行高 0.74–0.86 讓字身互相咬合。標題不是一行字，是一塊材質。

```css
.cjkdis{font-family:"Noto Serif TC",serif;font-weight:900;
        font-size:clamp(50px,10vw,140px);
        letter-spacing:-.08em;   /* 負字距 */
        line-height:.74}         /* 行距塌陷：兩行會咬在一起 */
.dis{font-family:"Anton",sans-serif;letter-spacing:-.045em;line-height:.78;text-transform:uppercase}
```

字級階梯（px）：`104 / 62 / 48 / 30 / 20 / 17 / 15 / 13 / 11`。11px 只給全大寫、字距 +0.22em 的眉標。

### 3　過曝二值化：沒有中間調

圖像只有純黑與紙白，邊緣帶碳粉外擴的碎點。**零漸層、零模糊陰影、零柔邊。** 用 `feMorphology` 把邊撐胖，再用 `feColorMatrix` 的 alpha 列硬切成二值（`A' = 22A − 9.5`，門檻落在 A≈0.432）。

```html
<filter id="xerox" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.55"/>
  <feColorMatrix type="matrix"
    values="0 0 0 0 0.09
            0 0 0 0 0.09
            0 0 0 0 0.105
            0 0 0 22 -9.5"/>
</filter>
<!-- 專色版：門檻後灌一塊實色 -->
<filter id="xrsig" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.45"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 24 -10" result="th"/>
  <feFlood flood-color="#FF2E7E"/><feComposite in2="th" operator="in"/>
</filter>
```

陰影的正確做法是**實心位移色塊**：`box-shadow:6px 6px 0 var(--ink)`，永遠 0 模糊。

### 4　錯版三色疊印

關鍵的字印三次：濁青一版、螢光洋紅一版、墨一版，各偏 2–4px，**一律 `mix-blend-mode:multiply`**。錯位方向要一致（機器沒對準），不是每個字隨機亂抖。

```html
<span class="op"><i aria-hidden="true">高頻</i><i aria-hidden="true">高頻</i><i>高頻</i></span>
```
```css
.op{position:relative;display:inline-block;isolation:isolate;--dx:2px;--dy:1px}
.op i{font-style:normal;display:block}
.op i:nth-child(2),.op i:nth-child(3){position:absolute;left:0;top:0;width:100%}
.op i:nth-child(1){color:#2E5A66;transform:translate(calc(var(--dx)*-1),calc(var(--dy)*-1));mix-blend-mode:multiply}
.op i:nth-child(2){color:#FF2E7E;transform:translate(var(--dx),var(--dy));mix-blend-mode:multiply}
.op i:nth-child(3){color:#17171B;mix-blend-mode:multiply}
```
可及性：三份中只有一份給輔助技術讀，另外兩份 `aria-hidden="true"`。

### 5　撕邊遮片與出血裁切

色塊的邊界不是矩形也不是圓角，是鋸齒撕邊的 `polygon()`；且**每一個版面至少有一個元素被畫布邊緣切斷**。

```css
.torn{clip-path:polygon(0% 0%,11.1% 1.9%,22.2% 0.2%,33.3% 0.5%,44.4% 1.9%,
 55.6% 0.2%,66.7% 0.9%,77.8% 2.1%,88.9% 0.7%,100% 0%,
 100% 100%,88.9% 99.3%,77.8% 98.1%,66.7% 99.4%,55.6% 97.9%,
 44.4% 99.1%,33.3% 98.2%,22.2% 99.6%,11.1% 98.0%,0% 100%)}
.bleed{margin-left:-48px;padding-left:48px;overflow:hidden}
```
撕邊的節點數固定、抖動幅度 ≤ 3%，這樣它才像撕的而不像鋸的。

---

## 三、色彩系統

| 色 | hex | 比例 | 用途 |
|---|---|---|---|
| 影印濁灰 | `#ADAAA0` | 約 40% | 全站地色。**不是白紙，是影印機吃掉一階的灰**——這一條決定了整個風格的體質 |
| 墨 | `#17171B` | 約 26% | 全部文字、二值化圖像、3px 框線、實心位移陰影 |
| 曝白 | `#EFEDE4` | 約 18% | 只給長文的紙板與 knockout 反白字 |
| 螢光洋紅 | `#FF2E7E` | ≤ 9% | **訊號專色**：現用態、可動作、被選中的東西、logo 的訊號線 |
| 濁青 | `#2E5A66` | ≤ 7% | **噪音專色**：疊印層、被壓住的東西、次要眉標 |

**紀律（不可妥協）**

- 洋紅與濁青**永遠不當內文色**——它們在濁灰底上對比不足（1.6:1 與 3.3:1）。它們只能是大面積形狀、或墨底上的字。
- **長文一律排在曝白紙板上**（對比 > 12:1），字級 ≥ 15px。破壞版面不等於破壞閱讀。
- 洋紅與濁青相疊時**一律 multiply**，疊出來的髒色是這個風格的正字標記。
- 零漸層、零圓角、零模糊陰影。
- 兩塊高飽和專色不可佔滿全頁——這是影印機，不是絹印。

換色域時的規則：地色可以換成別的「機器灰」（如 `#B4AEA4` 牛皮、`#A8ADA6` 冷灰），但**不可以換成純白**；訊號色可以換（螢光綠 `#C8FF00`、朱 `#FF3B14`），但必須維持「一個訊號色 + 一個噪音色」的二元關係。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 設定 |
|---|---|---|---|
| 中文大字／標題 | Noto Serif TC | 900 | `letter-spacing:-.08em; line-height:.74` |
| 中文內文 | Noto Sans TC | 400 / 900 | `line-height:24px`（8 的整數倍） |
| 拉丁大字／頁碼 | Anton | 400 | `letter-spacing:-.045em; line-height:.78; text-transform:uppercase` |
| 眉標／數字／表頭 | Archivo Black | 400 | `font-size:11px; letter-spacing:.22em; text-transform:uppercase` |

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Noto+Sans+TC:wght@400;900&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
```

字級 scale（px）與行高（皆為 8 的倍數）：

| px | 行高 | 用途 |
|---|---|---|
| 104 | .78 | 跨頁主標，一行以內，必定被邊緣切到 |
| 62 | .80 | 次標，允許壓過欄溝 |
| 48 | .82 | 引言，負字距 −0.06em |
| 30 | 40 | 小標 |
| 20 | 28 | 導言 lead |
| 17 | 24 | 內文（紙上） |
| 15 | 24 | 表格與說明 |
| 13 | 20 | 圖說 caption |
| 11 | 16 | 眉標 kicker，字距 +0.22em，全大寫 |

**混排規則**：同一個標題裡明體與黑體可以並存（這是 Ray Gun 的口音）；但同一段內文不可以。中文標題用明體 900 是關鍵——黑體會變成「新粗獷主義」，不是這個流派。

---

## 五、版面與網格

- **12 欄**，`grid-template-columns:repeat(12,1fr)`，欄溝 0（欄線由 `.rule` 畫出來，不是靠 gap）。
- **8px 基線**，所有 `margin` / `padding` / `line-height` 皆為 8 的整數倍；用 `calc(n*var(--u))` 寫死。
- **不對稱**：主要區塊的起始欄不可以是 1、4、7、10 這種整齊的位置。範例站用的是 `1/span 5`、`7/span 6`、`2/span 7`、`10/span 3`、`4/span 9`。
- **留白不是均勻的**：右欄可以只有 3 欄寬塞滿圖說，左邊留一大片空的濁灰。
- **裝訂溝**：跨頁隱喻要有一條 3px 濁青的中縫（`position:absolute;left:50%`），≤900px 時隱藏。
- **頁碼 folio**：每個版面底部一條 6px 墨線，左右兩個 Anton 56px 的頁碼，中間一行 13px 的書眉。這是「這是一本刊物」的最省力證明。

RWD：
- ≤900px：欄數降為 6，`.rule` 與中縫隱藏，出血縮小。
- ≤560px：欄數降為 2、`grid-auto-rows:auto`，`.blk` 改 `display:block`；大字用 `clamp()` 已自動收斂；撕邊與錯版全部保留（**行動版不可以退成乾淨版**，那樣就沒有風格了）。

---

## 六、元件配方

**導覽（legibility-rank：現用態＝唯一沒有被噪音蓋住的那一格）**

```css
.navl li:not(.on) a::after{content:"";position:absolute;inset:2px -3px 0 -3px;
  background:#2E5A66;mix-blend-mode:multiply;opacity:.42;
  clip-path:polygon(0 12%,100% 4%,100% 88%,0 96%);pointer-events:none}
.navl li:not(.on) a .nm{transform:translate(1.5px,0);transition:transform .08s steps(2,end)}
.navl li:not(.on) a:hover::after{opacity:.14}
.navl li.on a .nm{border-bottom:4px solid #FF2E7E}
```
語意：現用頁不是被標示、不是被反相、不是變大，而是**只有它沒有被噪音蓋住**。非現用態的對比仍須 ≥ 4.5:1。

**按鈕**：實心位移陰影，按下去就吃掉陰影。
```css
.btn{background:#FF2E7E;color:#17171B;font-weight:900;border:3px solid #17171B;border-radius:0;
     box-shadow:6px 6px 0 #17171B;transition:transform .06s steps(2,end),box-shadow .06s steps(2,end)}
.btn:hover{transform:translate(3px,3px);box-shadow:3px 3px 0 #17171B}
```

**卡片**：曝白紙板 + 3px 墨框 + 一層錯位的濁青框（`::after` + multiply），hover 時錯得更開。禁止圓角、禁止模糊陰影。

**表單**：`border-radius:0`、3px 墨框、曝白底；錯誤訊息是螢光洋紅底的黑字實心色塊，不是紅色小字。

**Footer**：純黑 `#0E0E11`、頂邊 6px 螢光洋紅、目次式三欄。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 具體值 |
|---|---|---|---|
| ambient 環境 | **碳粉沸騰＋影印燈** | 無 | 全螢幕顆粒層 `animation:boil 1.05s steps(1,end) infinite`，三個 keyframe 各平移 (0,0)/(11,5)/(4,13)px，用 `transform` 故不重繪；4px 曝白掃描帶 `animation:scan 11s steps(28,end) infinite`＋`mix-blend-mode:screen` |
| input 輸入 | **散版 plate-shift** | hover / focus，延遲 < 100ms | 三色版的偏移量 ×2.6，`transition:transform .07s steps(2,end)`。**注意方向**：導覽與連結上 hover 是「對焦」（噪音退開），內容字上 hover 是「更散」——指標所到之處改變的是套印關係，不是亮度 |
| transition 轉場 | **撕邊掃版 wipe** | 換頁／換狀態 | `clip-path` 在兩個「頂點數相同」的撕邊 polygon 之間補間，`animation:.38s steps(7,end)`；七格＝影印機走紙 |
| signature 簽名 | **拔字 word-lift** | 點字 | ① 三色版 60ms 內收攏成一版；② 整個字以 `steps(5,end)` 五格跳到收集帶並縮到 .42；③ **原位留下一枚曝白色的字形疤痕（knockout scar），整場不消失**。版面於是隨著使用者的每一次選擇被挖空 |

`steps()` 是這一節的骨幹：這個流派的機器是影印機與滾筒，**不該有平滑的 ease-in-out**。全站禁用 `cubic-bezier` 的柔和緩動與淡入淡出當主打；`linear` 只能用在掃描帶。

`prefers-reduced-motion` 降級（四種都要，且資訊零損失）：
```css
@media (prefers-reduced-motion:reduce){
  .grain{animation:none}          /* 顆粒仍在，只是不沸騰 */
  .lamp{display:none}             /* 純裝飾，移除 */
  .stage.wipe{animation:none}     /* 換頁瞬間完成，內容相同 */
  .frag.lift{animation:none}      /* 拔字瞬間完成，疤痕照留 */
  *,*::before,*::after{transition-duration:.001s !important;animation-duration:.001s !important}
}
```

---

## 八、插畫與圖像風格（overprint-strata 曝印疊層）

**零外部圖片。** 所有圖像由四種原語構成，判準是「拿掉全部文字，仍讀得出哪一層被壓在下面」：

1. **過曝閾值塊**：程序生成的形狀 → `feMorphology` 撐胖 → `feColorMatrix` 硬閾值 → 純黑塊 + 邊緣碎點。無中間調。
2. **錯版重影**：同一個 path 印三次（墨／濁青／洋紅），各偏 1.5–4px，`multiply`。
3. **資料散點**：真的資料畫成硬邊散點或折線（範例站畫的是語音香蕉圖與純音聽力圖）。這一層是這個風格唯一「認真」的地方——破格的版面配上假的圖表會露餡。
4. **撕邊遮片**：`clip-path:polygon()` 的鋸齒邊，用來裁掉一半的圖與一半的字。

**明文禁用**：`feTurbulence` / `feDisplacementMap` 手抖濾鏡（那是迷幻海報的語彙，而且會糊掉字緣）、半調網點的柔和灰階、細線幾何線描、任何寫實描繪、任何 stock 風格的插圖。

封面／縮圖的生成配方（同號恆得同圖）：`FNV-1a → mulberry32` → ① 撕邊濁青塊 ② 橫貫的墨色撕邊條 ③ 條上 knockout 的巨大期號（出血到畫布外）④ 一條九節的洋紅折線 ⑤ 錯版兩次的刊名 ⑥ 沿墨條邊緣灑 46 顆黑白碳粉點。

---

## 九、Logo 與 Favicon

**Logo 的構圖概念**：一條**底噪地板**（撕邊的黑色橫條）＋一條**穿過它的訊號折線**（螢光洋紅，7px，`stroke-linejoin:miter`、`stroke-linecap:butt`——不可以圓頭）＋**一枚被拔起來的方塊**（knockout）。字標本身以三色錯版疊印。

規則：
- 折線的節點必須是**尖角**，不可平滑；線寬固定，不可漸變。
- 字標三版偏移固定 3px，方向一致（青版 −3,−2；洋紅版 +3,+2；曝白版 0）。
- Logo 不可放在漸層、照片或圓角容器上；它需要一塊平的濁灰或墨。

**Favicon**：原創 inline SVG data URI 寫在 `<head>`，32×32，只用四個元素——濁灰底、濁青條、墨條（錯位 2px）、洋紅折線 + 一枚 knockout 方塊。不可用 emoji、不可用外部 .ico。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23ADAAA0'/%3E%3Crect x='2' y='21' width='28' height='9' fill='%232E5A66'/%3E%3Crect x='4' y='19' width='28' height='9' fill='%2317171B'/%3E%3Cpath d='M2 15 L7 8 L11 13 L15 5 L19 12 L23 6 L27 14 L30 9' fill='none' stroke='%23FF2E7E' stroke-width='3'/%3E%3Crect x='12' y='2' width='5' height='5' fill='%2317171B'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先把 12 欄／8pt 網格蓋好、畫出來，再破壞它。
- 每個版面至少一個元素被畫布切斷。
- 錯版方向一致；顆粒是碳粉不是雜訊濾鏡。
- 長文一律在曝白紙板上，對比 > 12:1，字級 ≥ 15px。
- 圖表要是真的資料，數字要算得出來。
- 用 `steps()`；這台機器沒有平滑緩動。
- 行動版保留全部撕邊、錯版與大字——只降欄數，不降風格。

**Don't**

- ❌ 不要用純白 `#FFF` 當地色——地色是影印濁灰，這是體質不是偏好。
- ❌ 不要用漸層（尤其紫藍）、圓角、模糊陰影、玻璃擬態。
- ❌ 不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。這個流派沒有置中。
- ❌ 不要用 emoji 當 icon。
- ❌ 不要 Lorem ipsum，也不要 AI 腔（「在當今快節奏的世界」「賦能」「一站式」）。文案要有人名、價錢、地址、電話、營業時間。
- ❌ 不要 `feTurbulence` 手抖邊。
- ❌ 不要為了「有風格」把內文也弄糊——**破壞標題與圖，不破壞閱讀**。
- ❌ 不要用「EST. 19xx」徽章、不要跑馬燈（本流派的橫向元素是書眉，不是 ticker）。
- ❌ 不要把兩塊專色鋪滿全頁；它們的上限是 9% 與 7%。
- ❌ 不要讓噪音靠「調低不透明度」達成——那是可及性問題不是風格。噪音要靠歪、靠錯版、靠被切。

---

## 十一、頁面骨架範例（可直接使用）

```html
<body>
<div class="grain" aria-hidden="true"></div><div class="lamp" aria-hidden="true"></div>

<nav class="nav"><div class="navin">
  <a class="brand" href="index.html">…logo svg…<span><b>品牌名</b><small>LATIN NAME</small></span></a>
  <ul class="navl">
    <li class="on"><a href="index.html" aria-current="page"><span class="fo">42</span><span class="nm">跨頁</span></a></li>
    <li><a href="two.html"><span class="fo">58</span><span class="nm">內頁</span></a></li>
  </ul>
</div></nav>

<main class="sheet">
<div class="spread">
  <div class="rule" aria-hidden="true"><span></span>…×12…</div>
  <div class="gut" aria-hidden="true"></div>

  <!-- 出血的大字塊：騎過欄溝、切出血 -->
  <div style="grid-column:1/span 5">
    <div class="bigslab torn"><span class="ch">大字<b>反白</b></span></div>
  </div>

  <!-- 錯版標題 -->
  <div style="grid-column:7/span 6">
    <p class="kicker">P.42–43　眉標</p>
    <h1 class="cjkdis">主標<br>
      <span class="op"><i aria-hidden="true">錯版</i><i aria-hidden="true">錯版</i><i>錯版</i></span>
    </h1>
  </div>

  <!-- 長文：曝白紙板 + subgrid，欄與祖先對齊 -->
  <div class="blk paper" style="grid-column:2/span 7;--sp:7">
    <div class="cols" style="grid-column:span 7"><p>……</p></div>
  </div>

  <!-- 圖說堆疊 -->
  <div class="capstack" style="grid-column:10/span 3">
    <p><b>圖 1</b>　……</p>
  </div>

  <!-- 頁碼 folio -->
  <div style="grid-column:1/span 12">
    <div class="foliobox"><span class="folio">42</span><p class="tiny">書眉</p><span class="folio">43</span></div>
  </div>
</div>
</main>

<footer>…目次三欄＋免責…</footer>
</body>
```

---

## 十二、技術實作與相容性

本站的視覺由三項技術承載，各自屬於不同層（渲染／版面／動效）。查證日期 **2026-09-09**。

### 1　CSS `subgrid`（C 版面與樣式層）— 承載特徵 1

**它承載什麼**：紙板裡的文字欄、卡片裡的規格列，全部對齊**祖先的**欄與基線。沒有它，巢狀區塊只能對齊自己的內部網格，於是「被違反的網格」就沒有一張真的網格可違反——這個特徵會直接消失。範例站的六張機型卡以 `grid-template-rows:subgrid` 讓六張卡的型號、規格、價格逐列落在同一條基線上，即使每張卡的文字長度不同。

**支援現況**（查證 caniuse `css-subgrid` 與 web-features explorer）：**Baseline Widely available，2026-03-15 起**。Firefox 71+（2019-12）、Safari 16+（2022-09）、Chrome / Edge 117+（2023-09-12 / 09-15）、Opera 103+、Samsung Internet 24+。caniuse 全球覆蓋約 89–91%（含舊版殘留）。

**Fallback（實際行為）**：
```css
@supports not (grid-template-columns:subgrid){
  .blk{grid-template-columns:repeat(var(--sp,6),1fr)}
}
@supports not (grid-template-rows:subgrid){
  .cards{grid-template-rows:auto} .card{grid-row:auto;display:block}
  .card>*{margin-top:8px}
}
```
不支援時：紙板內部改用自己的等分欄（視覺差異是內文欄不再與頁面欄同線）、卡片改為一般流排（規格列不再跨卡對齊）。**內容、順序、可讀性完全相同，資訊零損失。**

### 2　SVG filter `feMorphology` + `feColorMatrix`（A 渲染層）— 承載特徵 3

**它承載什麼**：影印機的兩個物理事實——碳粉會外擴（dilate）、感光鼓沒有中間調（threshold）。`feColorMatrix` 的 alpha 列 `0 0 0 22 -9.5` 等於 `A' = 22A − 9.5`，門檻落在 `A ≈ 0.432`，邊緣一刀切開；前面的 `feMorphology dilate radius=.55` 先把邊撐胖 0.55px，切完就得到帶碳粉肥邊的硬邊圖。用 CSS `filter:contrast()` 做不到這件事，因為它不會先撐胖，切出來的邊是乾淨的鋸齒而不是碳粉。

**支援現況**（查證 MDN `<feMorphology>` / `<feColorMatrix>` 與 caniuse `mdn-svg_elements_femorphology`）：兩者皆 **Baseline Widely available，自 2015-07 起跨瀏覽器**。

**Fallback（實際行為）**：濾鏡若被忽略（SVG filter 停用、列印、極舊瀏覽器），圖形退為未撐胖的原始向量——**形狀、比例、資訊完全相同**，只是邊緣少了碳粉肥邊與硬閾值。所有版面尺寸不受影響（濾鏡不參與佈局）。

**效能注意**：SVG filter 逐幀重算很貴。本站的紀律是**濾鏡只用在靜態裝飾圖元，絕不用在文字、絕不用在每幀變動的元素**；文字的「髒」由三份 DOM 疊印（純 `transform` + `mix-blend-mode`）承擔，不進濾鏡管線。

### 3　`steps()` 逐格時間函數（B 動效與時間軸層）— 承載四種動效的節奏

**它承載什麼**：這個流派的機器是影印機、滾筒與走紙輪，它們的動作是**分格的**。碳粉沸騰 `steps(1,end)` 三格、掃描帶 `steps(28,end)`、撕邊掃版 `steps(7,end)`、拔字 `steps(5,end)`。換成 `ease-in-out`，整站立刻變成一個現代網頁——這是本流派最容易被做丟的一項。

**支援現況**（查證 MDN `<easing-function>`）：**Baseline Widely available，自 2015-07 起跨瀏覽器**。`steps(n, jump-*)` 關鍵字語法在較新版本才齊全，本站只用最保守的 `steps(n, end)`。

**Fallback**：無支援缺口。若整段 CSS animation 不被支援，元素停在最終狀態（`animation-fill-mode:forwards` 的位置），互動結果不變。

### 4　效能預算實測

| 項目 | 預算 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline 資源） | ≤ 350 KB | index 35 KB／適配室 53 KB／翻 42 KB／刊 79 KB（未壓縮；外部僅 Google Fonts） |
| 顆粒圖磚 | — | 單一 96×96 SVG data URI，6.3 KB，全站共用一張（沸騰靠 `transform` 位移，不換圖） |
| 首屏 JS 執行 | ≤ 100 ms | 首頁與內頁只有一段 localStorage 讀取（< 1 ms）；「翻」頁首次 `render()` 為 8 個字的字串組裝＋一次 `innerHTML`，Node 22 下版面計算本體 12 跨頁全跑完 < 1 ms |
| 主要動畫 | 60 fps | 顆粒層與掃描帶只動 `transform`（合成層，`will-change:transform`）；拔字只動 `transform`；`clip-path` 掃版每次僅一個元素、0.38 s |
| layout thrashing | 無 | 拔字一次 `getBoundingClientRect()` 讀、一次寫 CSS 變數，讀寫不交錯；`.rule` 的 12 條欄線是靜態 DOM，不重算 |

**已知取捨**：`mix-blend-mode:multiply` 會為每個 `.op` 建立堆疊脈絡。單頁 `.op` 用量控制在 20 個以內（範例站最多 8 個 + 「翻」頁每次 8 個），未觀察到合成壓力。若要大量使用（如整段內文疊印），改用單層 `text-shadow` 假錯版並接受色彩不會相乘。

---

## 十三、可及性（本流派最容易翻車的地方）

這個流派拿「難讀」當語言，所以必須寫死幾條底線，否則它就只是一個做不出來的東西：

1. **長文永遠可讀**：曝白紙板、對比 > 12:1、字級 ≥ 15px、行高 ≥ 1.4。
2. **噪音不靠透明度**：疊在裝飾層的字仍維持 ≥ 0.80 不透明度；「髒」由錯版、旋轉、裁切承擔。
3. **裝飾層 `aria-hidden`**：顆粒、掃描帶、錯版的兩份色版、書眉、頁碼裝飾，全部對輔助技術隱藏。
4. **互動一定有鍵盤路徑**：可點的碎字是 `<button>`，Tab 可走、Enter 可觸發，`:focus-visible` 是 3px 螢光洋紅外框。
5. **互動裡的資訊必須在靜態頁另存一份**：範例站把十二格的全部候選字與社論全文靜態印在同一頁（「P.72 全文與候選字表」），關掉 JavaScript 也讀得到。
6. **`prefers-reduced-motion` 四種動效全降級，資訊零損失。**
