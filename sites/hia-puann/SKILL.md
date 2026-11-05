---
name: hard-edge-joined-panels
description: Hard-edge abstraction after Ellsworth Kelly — one unmixed colour per panel, panels joined by a hairline of wall, colours placed by chance rules, shapes taken from observed "found" forms, and a small museum wall label beside every work; no gradients, outlines, shadows or texture.
---

# 硬邊抽象・Ellsworth Kelly 單色接板 Hard-edge Abstraction — Kelly's Joined Monochrome Panels

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（瓦盤 HIĀ-PUÂNN，臺南北門的日曬鹽田）不同產業、但一眼看得出是同一個流派的網站。
> **本流派為既有設計史流派，非自創。** 血緣：
> - **Ellsworth Kelly（1923–2015）**。1948–1954 住巴黎，從看到的東西裡抽出形狀：窗、影子、兩棟樓之間的縫（〈Window, Museum of Modern Art, Paris〉1949）。1951 年用上一批拼貼剩下的商業色紙方塊做〈Spectrum Colors Arranged by Chance〉系列——以規則抽籤決定十八個顏色放在哪一格；同年畫〈Colors for a Large Wall〉：**64 塊畫布、每塊一個顏色、各自一個內框**，接成 240×240 cm（MoMA 藏）。1953〈Spectrum I〉第一次直接以色譜為來源；1960 年代以後的〈Curve〉、〈Red Blue Green〉等：一塊板、一個顏色、只有一條邊是彎的。
> - **「硬邊」一詞**：1959 年 Jules Langsner 策畫〈Four Abstract Classicists〉（Karl Benjamin、Lorser Feitelson、Frederick Hammersley、John McLaughlin；舊金山美術館、LACMA），巡迴倫敦時 Lawrence Alloway 改名〈West Coast Hard-edge〉。
> - 參考：MoMA〈Colors for a Large Wall〉館藏頁；Art Institute of Chicago〈Ellsworth Kelly: Spectrum Colors Arranged by Chance〉；SFMOMA 館藏 99.352；Tate Etc.〈Sixty years full intensity〉（Kelly 訪談，2009）。
> - **與鄰近流派的分界**：Albers〈正方形禮讚〉是方中方嵌套、比較色的相對性；本流派一塊板只有一色、從不嵌套。荷蘭風格派有黑色格線與三原色；本流派**零格線**，板與板之間露出的是牆。至上主義的平面傾斜漂浮在白色無限裡；本流派的板**掛正**、坐在牆上、有重量。Matisse 剪紙是手剪有機形、有刷痕；本流派邊緣是機械的直線或大半徑弧、零筆觸。

---

## 一、設計哲學

Kelly 說他不「發明」形，他「找到」形。看到窗框、影子、地上的一塊光，把它的輪廓抽出來，塗上一個顏色，掛到牆上——畫就成了一件在牆上的「物」，而不是牆上的一扇窗。

為什麼長這樣（製作條件決定外觀）：

1. **一塊畫布只塗一色。** 色紙拼貼裡每一小方塊只有一色，Kelly 直接把「方塊」放大成畫布：一塊內框、一個顏色。於是色與色的交界是兩塊畫布的接縫，不是畫出來的線——接縫會露出一點點牆。
2. **顏色交給規則。** 1951 年的拼貼用抽籤決定位置，畫家只決定規則與色票。結果是沒有「構圖重心」、沒有被偏愛的那一格。
3. **畫廊是地。** 作品掛在大面白牆上，旁邊一張小小的牆上標籤。牆不是背景，是作品的另一半。

三條心法：

- **一塊板、一個顏色、零筆觸。** 拿掉漸層、描邊、陰影、紋理之後還剩下的，就是這個流派。
- **規則比品味重要。** 顏色在哪一格，要能說出規則（抽籤、色譜順序、資料）。
- **留牆。** 板與板之間 2–3px 的牆、作品四周大量的牆，都是設計的一部分。

## 二、本風格的 5 個不可省略特徵

### 特徵 1：一塊板一個未調和的純色，硬邊（色彩規則＋形狀語彙）

每塊板只有一個顏色，邊緣是機械的直線或一段大半徑弧。**零漸層、零描邊、零陰影、零圓角（弧邊例外，且一塊板最多一條）、零紋理、零透明。** 拿掉它就是一般的色塊介面了。

```css
.panel{background:var(--c);border:0;border-radius:0;box-shadow:none}
/* 唯一允許的「形」：整塊板的外形，用 SVG path 或 clip-path，不用 border-radius 修四角 */
```
```html
<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M0 100V34C20 14 38 6 50 6s30 8 50 28v66z" fill="#FFFFFF"/></svg>
```

### 特徵 2：接板——板與板緊貼，中間只露一道牆（版面手法）

多塊板組成一件作品時，以 2–3px 的縫相接，縫裡看到的是牆色。這道縫是「這是很多塊畫布」的證據。拿掉縫（顏色直接相接）就變成一張色塊圖；縫太寬就變成卡片網格。

```css
:root{--gap:3px;--wall:#EFEDE8}
.joined{display:grid;grid-template-columns:repeat(8,1fr);gap:var(--gap);background:transparent}
.joined>i{background:var(--c)}          /* 64 塊＝Colors for a Large Wall */
.row{display:flex;gap:var(--gap)}       /* 一排＝Spectrum：寬度可以承載資料 */
.row>i{flex:var(--w) 0 0;background:var(--c)}
```

### 特徵 3：機運排色——顏色由規則抽籤，不由設計師挑（色彩規則）

給一組色票與一條規則（抽籤、色譜序、資料映射），讓程式決定每一格。必須是**決定性**的：同一個 seed（例如日期）抽出同一面牆，才能被說明、被分享。Demo 的規則：第 r 列的中心階段是 r，每格有 18% 往前一階、18% 往後一階、8% 跳兩階。

```js
function rng(s){return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296}}
const r=rng(20261106);
const wall=[...Array(64)].map((_,k)=>{const d=r();let s=(k>>3)+(d<.18?-1:d<.36?1:d<.44?2:d<.5?-2:0);return Math.max(0,Math.min(7,s));});
```

### 特徵 4：現成的形 found form——每個形都能說出它從哪裡來（裝飾母題）

形不是幾何練習，而是觀察的簡化：一條弧＝鹽堆的輪廓、一個切角＝碎陶片、一個圓底＝滴下的那一滴、一個斜頂＝被風吹斜的草。一件作品只用一種形；同一頁的形要能並排比較。

```html
<!-- 切角：碎陶片 --><svg viewBox="0 0 100 100"><path d="M0 0h78l22 22v78H0z" fill="var(--black)"/></svg>
<!-- 圓底：一滴    --><svg viewBox="0 0 60 100"><path d="M0 0h60v62c0 20-14 38-30 38S0 82 0 62z" fill="var(--red)"/></svg>
<!-- 斜頂：被風吹斜 --><svg viewBox="0 0 50 100"><path d="M0 24L50 0v100H0z" fill="var(--green)"/></svg>
<!-- 梯形：剖面    --><svg viewBox="0 0 100 100"><path d="M12 0h76l12 100H0z" fill="var(--ochre)"/></svg>
```

### 特徵 5：牆上標籤——每件作品旁一張小小的博物館標籤（字體選擇＋版面）

標題斜體（作品名＋年份）、下面兩行小字（材質、塊數、尺寸或資料），灰色，13–15px，左側 3px 墨線或直接放在作品右下的牆上。全站的說明文字都用這個口吻：短、名詞在前、不推銷。大字只留給店名一次。

```html
<p class="label"><i>Colors for a Salt Field, No. 1</i><br>2026-11-06・64 joined panels・brine on tile<br>鹽埕小屋開著，到 17:00</p>
```
```css
.label{font:400 13px/1.55 "Archivo","Noto Sans TC",sans-serif;color:#6B675F}
.label i{font-style:italic;font-weight:600;font-size:15px;color:#1B1A18}
```

## 三、色彩系統

| 用途 | hex | 比例 |
|---|---|---|
| 牆（頁面地） | `#EFEDE8` | 約 65% |
| 墨（字、分隔線 3px） | `#1B1A18` | 約 8% |
| 標籤灰 | `#6B675F` | 小字 |
| 海藍 sea | `#2D5D8C` | 板 |
| 綠 green | `#3E8E4E` | 板 |
| 黃綠 chartreuse | `#B9C23A` | 板 |
| 赭 ochre | `#D89A22` | 板 |
| 粉紅 pink | `#E58C8C` | 板 |
| 紅 red | `#C8322A` | 板、唯一的動作色（按鈕 hover、鹽耙） |
| 黑 black | `#161513` | 板 |
| 鹽白 salt | `#FFFFFF` | 板（白板在牆上要比牆更白） |

規則：色板全部是飽和純色，**不出現同色相的淺版或深版**；彩色只住在「板」上，介面元件（按鈕、標籤、導覽字）只用墨與灰。換產業時換掉色票的語意（Demo 的八色是鹽田由淡到濃的水色），但保持「一組 6–8 個純色＋牆＋墨」。

## 四、字體系統

- **Archivo**（Google Fonts，400／600／800，含斜體）：拉丁字、數字、牆上標籤的斜體作品名。中性的 grotesque，像美術館的標籤。
- **Noto Sans TC**（400／500／900）：中文內文與店名。店名 900、`clamp(64px,9vw,132px)`、行高 .9，全站只出現一次。
- 字級：標籤 13／作品名 15／內文 16（行高 1.8）／段標 28–48（900）／店名 64–132。
- 不用襯線、不用手寫、不用 mono 讀數。

## 五、版面與網格

- **零旋轉**：板一律掛正。
- 大留白：作品四周至少 48px 牆；段落之間 96–140px。
- 首頁：左 1.3fr 是一件接板作品（正方形，`min(100%,80svh)`），右 0.7fr 是店名＋標籤。
- 卡片清單改成「一件作品＋一張標籤」的展牆：`grid-template-columns:repeat(auto-fill,minmax(230px,1fr))`，每件以 **subgrid** 對齊（板、標籤、說明、價目四列跨件同高），所以形狀不同的板，標籤仍落在同一條水平線上——就像畫廊把所有標籤釘在同一個高度。
- 時間軸＝一排接板，板寬照年數。

## 六、元件配方

- **導覽（掛板導覽）**：右側固定 150px 欄，三塊 34px 寬單色板；未選 22px 高，hover 48px，現用頁 96px（「掛滿」）。左邊是標籤式頁名。`height` 以 `steps(4,end)` 切換，不滑順。≤860px 落為底部三等分，板變成 10／22px 高的色條。
- **按鈕**：墨底牆字 `padding:14px 20px`，零圓角；hover 換成紅底白字（硬切）。次要按鈕 `box-shadow:inset 0 0 0 2px`（這是唯一允許的 box-shadow，用來畫 2px 框，不是陰影）。
- **卡片**：不存在。改用「板＋標籤」。
- **表單**：底線輸入，3px 墨線，焦點時線變紅。
- **頁尾**：3px 墨線上方分隔，四欄標籤。

## 七、動效規則（四種，缺一不可）

本流派的動態原則：**顏色只硬切，不補間**。位移可以有，但顏色從一色到另一色永遠是瞬間。

| 類型 | 本站自製實作 | 觸發 | 時間 |
|---|---|---|---|
| ambient 環境 | 〈蒸發〉：每 2.2 秒，以一維 value noise 挑一格，讓它往下一個鹹度階段硬切一次（海→綠→黃綠→赭→粉→紅→黑→白→海） | 時間 | 2200ms 間隔、0ms 換色 |
| input 輸入 | 游標下那塊板被往上提 4px（`translate`，無過渡），標籤立即換成那一格的池名與說明；〈撈鹽花〉的紅色鹽耙以彈簧追指標 | pointermove／方向鍵 | <16ms 回應 |
| transition 轉場 | 換頁：六條光譜色板依抽籤順序每 60ms 硬切蓋下、到新頁再依抽籤順序拿走；撈到的鹽花以 FLIP 從原位縮放飛進托盤 | 點連結／收成 | 6×60ms；FLIP 420ms `cubic-bezier(.2,.7,.2,1)` |
| signature 簽名 | **機運重抽硬切波**：點牆上任何一格，64 格以「到點擊格的距離＋二維 value noise×2.4」排序，各自在 `d×70ms` 時直接換成新籤，作品編號 No. +1 | click／Enter | 約 0–800ms 的波，零補間 |

`prefers-reduced-motion`：蒸發停止（牆保持當日的籤）、重抽一次全部換完、鹽花不隨風漂、鹽耙直接跟手、換頁色板與 FLIP 取消——所有資訊仍在。

### motion-library 元件（PLAYBOOK §2.8）

來源：motion-library 1.32.0 @66e54db2，每頁以 `tools/ml-embed.js` 只抽該頁的元件，terser 壓縮後 `tools/ml-smoke.js` 皆 smoke ok。讀過原始碼後排除：BG-B-38 Minimal Square（內框 `strokeRect` 描邊）、BG-B-33 Minimal Blocks（`rr()` 圓角＋`shadowBlur`）、BG-B-26 Floating Shapes（`shape()` 含圓角方與星）、SHP-12／SHP-11（`softGrid` 格線，本流派零格線）、TXT-B-28（`rr()`＋陰影）。

| ID | 名稱 | 頁 | 參數 | 類型 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-22 | Stripe Twist | index | colors `#E58C8C`／`#C8322A`／`#EFEDE8`，duration 9，density .55，intensity .7，seed 1818，16:9，容器 86px 裁切 | ambient | 粉與紅兩色平條被風吹皺＝結晶池前的鹵水；只有 `fillRect`、兩個純色、零漸層 |
| TXT-B-40 | Float Drift | index | text「撈鹽花」，`#C8322A`／`#161513`／`#EFEDE8`，duration 1.8，loop false，seed 15，maxHeight 280 | transition | 字一個個從下方漂上來定位＝鹽花浮上水面；只畫字、無發光 |
| TXT-A-08 | Slide Text | kiam | text「五格鹽」，`#C8322A`／`#161513`／`#EFEDE8`，duration 1.4，loop false，seed 5，maxHeight 300 | transition | 字由左滑入、下方一條紅色硬邊長條伸展＝一塊板被推上牆 |
| BG-B-37 | Minimal Stripes | kiam | `#3E8E4E`／`#D89A22`／`#EFEDE8`，duration 10，density .8，intensity .8，seed 1952，容器 110px | ambient | 綠與赭等高直條左右滑動、寬窄變化＝Spectrum 式的直條接板 |
| TXT-A-19 | Gate | puann | text「一格一色」，`#C8322A`／`#161513`／`#EFEDE8`，duration 1.6，loop false，seed 9，maxHeight 300 | transition | 紅、黑兩塊純色板往左右拉開露出字＝兩塊接板分開 |

掛載：等 `document.fonts.ready`；IntersectionObserver 進視窗才 `mount`、離開即 `destroy()`；文字元件只播一次、之後重掛 `seek(1)`；canvas `aria-hidden`；原 HTML 標題留在 `.ml-fb`，掛載成功才視覺隱藏；減少動態時背景 `seek(.35)`、文字 `seek(1)`。各元件的開發 Prompt 可用 `MotionLib.prompt(id)` 取得。

## 八、插畫與圖像風格

- **全站零插畫。** 所有圖像都是「板」：方板、接板、或一條邊被找到的形。
- 需要表示物件時，問「它的輪廓簡化成一塊單色板是什麼形？」——鹽堆＝弧頂、碎陶＝切角、鹵水＝圓底。
- 需要表示資料時，用板的寬度（重量、年數）與顏色（階段、時刻），不畫軸、不畫刻度。

## 九、Logo 與 Favicon

兩塊接板：左黑（瓦盤）、右粉紅與紅（鹵水），右板的一條邊是弧（找到的形：結晶池的水線）。中間 3px 牆縫。favicon 同圖，inline SVG data URI。不要字母組合、不要圓形徽章。

## 十、Do & Don't

**Do**：一塊一色；接縫露牆；說得出排色規則；每個形說得出來源；每件作品配一張標籤；大字只用一次。

**Don't**：
- 不要漸層、描邊、陰影、圓角卡片、半透明、紋理、紙紋。
- 不要格線（那是風格派）、不要方中方（那是 Albers）、不要傾斜漂浮（那是至上主義）。
- 不要顏色補間（`transition: background`）。
- 去AI化：禁紫藍漸層、禁置中大標＋兩顆按鈕＋三張圓角卡、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章。

## 十一、頁面骨架範例

```html
<nav class="hang" aria-label="主要">
  <a href="index.html" style="--c:var(--pink)" aria-current="page"><span class="lb"><i>鹵色牆</i><span>首頁</span></span><span class="pn"></span></a>
  <a href="kiam.html" style="--c:var(--black)"><span class="lb"><i>五格鹽</i><span>價目</span></span><span class="pn"></span></a>
</nav>
<header class="hero">
  <div class="wall joined" id="wall" role="button" tabindex="0" aria-label="64 塊單色板，點一下重抽"><!-- 64 × <i style="--c:var(--green)"></i> --></div>
  <div class="side">
    <h1>店名</h1>
    <p class="label"><i>Colors for a ___, No. 1</i><br>2026-11-06・64 joined panels<br>營業狀態</p>
  </div>
</header>
<section class="goods">
  <article class="it" style="--c:var(--red)">     <!-- grid-row:span 4; grid-template-rows:subgrid -->
    <div class="hold"><svg viewBox="0 0 60 100"><path d="M0 0h60v62c0 20-14 38-30 38S0 82 0 62z" fill="var(--c)"/></svg></div>
    <p class="label"><span class="t">品名</span>　<i>English title, 2026</i><br>材質・來源</p>
    <p class="desc">說明</p>
    <ul class="pr"><li>規格 NT$價格</li></ul>
  </article>
</section>
```

## 十二、技術實作與相容性

### 1. 決定性偽隨機＋自寫 value noise（E 資料與生成層）

承載特徵 3、ambient 與 signature。xorshift32 以臺南日期 `YYYYMMDD` 為 seed，同一天任何人看到同一面牆；重抽以 `seed×31＋No.×7919` 產生下一籤。value noise：512 格表（固定 seed 1818），一維兩八度供〈蒸發〉挑格與鹽田風場，二維雙線性供重抽波的到達時間擾動與鹽花亂流。純 JS、無 API 相容性問題。無 JS 時顯示建置期以 seed 20261106 預先寫進 HTML 的那面牆。

### 2. requestAnimationFrame 阻尼彈簧＋推擠碰撞（B 動效層）

承載 input 與 func〈撈鹽花〉。鹽耙：k=260、阻尼比 0.9 的二階彈簧追指標目標；鹽花：受 `wind(t)`（噪聲）與二維噪聲亂流加速，每秒衰減到 22% 的水面阻力，與鹽耙做 AABB 最小穿透軸推出並繼承鹽耙速度，撞盤邊以 −0.4 反彈；中心進入右下 30%×44% 鹽堆區即收成。`dt` 上限 50ms（分頁切走再回來不會爆衝）。node 原型 5400 步（90 秒×60fps）18 片鹽花耗時 17–38ms；jsdom 實測 3 秒隨機掃動收 4 片、靜置 8 秒收 0 片（風不會替你收）。減少動態：無風、鹽耙直接跟手。

### 3. CSS Grid subgrid（C 版面與樣式層）

承載特徵 5：〈五格鹽〉展牆每件 `grid-row:span 4;grid-template-rows:subgrid`，形狀與高寬比不同的板（100×100、60×100、50×100）底部對齊、標籤落在同一條線；〈瓦盤〉五個工序板同理（span 2）。查證：web-features explorer 標 subgrid 為 Baseline 2023-09-15 新近可用（Chrome 117、Firefox 71、Safari 16），預計 2026-03-15 成為廣泛可用。fallback：`@supports not (grid-template-rows:subgrid)` 改成固定 `200px auto auto 1fr` 列——標籤仍大致對齊，只差說明長度不同時價目不同高。

### 效能預算實測

| 頁 | 大小（含 inline motion-library 子集約 156KB） | 首屏 JS | 同時運轉的元件 |
|---|---|---|---|
| index.html | 約 183KB | 建牆＋狀態 <5ms（jsdom） | 首屏 0；捲到鹵水帶 1、到〈撈鹽花〉標題 1 |
| kiam.html | 約 171KB | <2ms | 標題 1＋色帶 1 |
| puann.html | 約 170KB | <2ms | 標題 1 |

動畫只動 `transform`／`translate` 與板的 `background`（離散），無 layout thrashing；〈撈鹽花〉最多 18 片＋1 鹽耙，每幀 19 次 `style.transform` 寫入。

查證來源：[MDN／web-features：subgrid](https://web-platform-dx.github.io/web-features-explorer/features/subgrid)、[caniuse：CSS Subgrid](https://caniuse.com/css-subgrid)、[MoMA：Colors for a Large Wall](https://www.moma.org/collection/works/80528)、[Art Institute of Chicago：Spectrum Colors Arranged by Chance](https://www.artic.edu/exhibitions/10279/ellsworth-kelly-spectrum-colors-arranged-by-chance)、[Wikipedia：Hard-edge painting](https://en.wikipedia.org/wiki/Hard-edge_painting)、[Cargill：Solar Sea Salt Ponds](https://cargill.com/salt-in-perspective/solar-sea-salt-ponds)。
