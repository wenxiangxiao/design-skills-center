---
name: splice-room-tape
description: An analogue tape-splicing room aesthetic — oxide-brown ground, bone leader tape, grease-pencil amber and signal red, worksheet grids, 45-degree splice geometry and waveform-envelope illustration.
---

# 盤帶剪接室風 SPLICE-ROOM TAPE

## 一、設計哲學

這套語言來自一張桌子：剪接台。上面只有帶身、刀片、膠帶、油性筆，和一支永遠在等你決定的磁頭。它的美學不是懷舊，是**工序**——每一個視覺元素都對應一個真實的動作。

三條原則：

1. **畫面上的東西都要能被操作或被讀出數值。** 沒有裝飾性的方塊、沒有為了填空的圖。一條帶身要能看出它由哪幾段拼成；一張表格要能讀出評語；一條波形要真的是某段聲音算出來的。
2. **底色是材料，不是背景。** 全站地色取磁帶氧化鐵的棕（`#6B4126`），因為那是這個行業真正的顏色。不要用中性灰或紙白去「襯托內容」——材料本身就是內容。
3. **落差要被誠實地畫出來。** 這套語言的核心圖形是**接縫**：兩段不同來源的東西被斜著接在一起，接口永遠看得見（一條 45° 的亮線）。不要把差異磨平，要把它標出來，必要時在旁邊加一個紅色的驚嘆號。

用這套語言做別的產業時，把「帶身」換成該產業的連續材料（布、線、木、路線、時間軸），把「刀口」換成該產業的取捨點。它適合任何「由片段拼成整體、而且拼法有代價」的題材。

## 二、色彩系統

| 用途 | 色票 | 比例 | 說明 |
|---|---|---|---|
| 地色・磁帶氧化棕 | `#6B4126` | 約 38% | body 全站底。疊 90° 每 3px 的 `rgba(0,0,0,.05)` 細條紋模擬帶身。|
| 深棕・面板／頁尾 | `#3D2416` | 約 20% | 卡片、剪接台面板、導覽軌、footer。|
| 極深棕・框線／帶盤 | `#291709` / `#1c0f06` | 約 8% | 2px 實線邊框一律用 `#1c0f06`，不用陰影模糊。|
| 骨白・引帶／文字 | `#EDE6D6` | 約 16% | 主文字色、白引帶、剪接膠帶、接縫線。大面積使用時（工作單抬頭）文字改 `#2A180E`。|
| 儀表灰青 | `#8FA69C` / `#5E7A72` | 約 8% | 機器面板、按鈕、播放頭、讀數。這是全站唯一的冷色，只給「機器」用。|
| 訊號紅 | `#D8402C` | 約 5% | REC 燈、紅引帶、警告接縫、現用頁標記、引言左線。禁止用於大面積。|
| 油性筆黃 | `#E0A22A` | 約 5% | 標籤、章節編號、手寫感標記、eyebrow 小標。|
| 引帶綠／藍 | `#4E8F6B` / `#4A6E8F` | 各 <3% | 只作為分類碼（第三、四個頁面；第四、五條 take）。|

配色規則：**暖棕系佔九成，冷色只允許出現在機器與分類碼上**。任何一個介面元素同時用到紅與綠時，兩者必須分屬不同語意層（警告 vs 分類），不可並列成裝飾。

## 三、字體系統

三套，各有明確分工，不可互換：

- **中文與正文**：`Noto Sans TC`，400／500／700／900。標題用 900、字距 `.01em`、行高 1.25。正文 16px／行高 1.75、色 `#CFC3AC`。
- **機器標示**：`Barlow Condensed` 600／700，一律 `text-transform:uppercase`、字距 `.06em`–`.22em`。用於：按鈕、導覽頁名、VU 標記、帶身上的 take 編號、章節眉標。字級 11–15px，永遠比它旁邊的中文小。
- **讀數與資料**：`IBM Plex Mono` 400／600。用於：時碼、價目、規格、分數、剪接碼、圖說。表格中的規格欄一律 mono 12.5px。

字級階：`clamp(30px,4.4vw,52px)` 主標 → 22px 章標 → 16px 小標 → 16px 正文 → 13.5px 表格 → 11.5px 圖說／標籤。**不要出現 17–21px 之間的中間級**，這套語言靠級距的斷裂製造工業感。

## 四、版面與網格

- **左緣固定 74px 的導覽軌**，`body{padding-left:74px}`。主內容 `max-width:1120px`、左右 padding 26px。這條軌把整個版面推離視窗左緣，是本風格最明顯的骨架特徵。
- **不對稱雙欄**：`minmax(0,1.55fr) / minmax(260px,.95fr)`，右欄放「交代事項／注意事項」卡片，永遠比左欄窄且靠上對齊。
- **工作單抬頭**：頁首是一條骨白色的橫帶（不是導覽列），左邊品牌、右邊一排 mono 的欄位值（`工作單 No.`、`曲目`、`帶速`…），下方一條 1px 虛線。它模仿的是錄音工作單的表頭，每一頁的欄位內容不同。
- **零圓角。** 所有 `border-radius` 為 0。陰影一律是硬陰影：`box-shadow:6px 6px 0 rgba(0,0,0,.2)`，不得使用模糊陰影。
- **分隔**：段落之間用一條 10px 高的「帶身」橫條（上下 1px 深淺邊）取代 `<hr>`。
- 留白偏緊：章節間距 34px，卡片內距 16–18px。這是一張工作台，不是畫廊。

## 五、元件配方

**導覽（leader-tape rail）**
```css
.rail{position:fixed;left:0;top:0;bottom:0;width:74px;background:#291709;border-right:2px solid #1c0f06}
.rail .strip{flex:1;width:38px;background:linear-gradient(180deg,#4a2c19,#3a2213 40%,#4a2c19)}
.rail a{writing-mode:vertical-rl;height:96px;font-family:'Barlow Condensed';letter-spacing:.16em;
        border-top:2px solid rgba(0,0,0,.5);border-bottom:2px solid rgba(0,0,0,.5)}
.rail a[aria-current="page"]{box-shadow:inset 0 0 0 3px #D8402C}
```
軌上方一枚 44px 的線描帶盤 SVG，下方一枚 24×38 的磁頭方塊與 `HEAD` 標。四個頁面＝帶上四段不同顏色的引帶（骨白／黃／綠／藍），現用頁加紅框與一枚指向右方的三角。**≤900px 時整條軌降為底部四格 dock，並取消 `padding-left`。**

**按鈕**
```css
.btn{font-family:'Barlow Condensed';text-transform:uppercase;letter-spacing:.12em;
     background:#8FA69C;color:#20302c;border:2px solid #1c0f06;box-shadow:3px 3px 0 #1c0f06;padding:9px 16px}
.btn:active{transform:translate(3px,3px);box-shadow:0 0 0 #1c0f06}
```
主要動作用訊號紅底＋骨白字；次要動作用透明底＋米色字。

**格子（cell）**：`min-height:86px` 的方格，左上角一個判定符號（◎○△✕，mono 19px，✕ 用訊號紅）、下面兩行 11.5px 的手寫評語、右上角一顆 22px 的方形試聽鈕。選取狀態＝頂緣長出一條 6px 的分類色、外框 `inset 0 0 0 2px #EDE6D6`。**不要用勾勾或色塊填滿表示選取**，要用「貼上了一段帶」的語意。

**表格**：`border-collapse:collapse`，只有橫線（`1px solid #5c4534`），表頭是 Barlow Condensed 11.5px 字距 .14em 的黃色，底線加粗成 2px。hover 整列加 `rgba(0,0,0,.14)`。不要斑馬紋。

**卡片**：`#3D2416` 底＋2px 深框＋硬陰影。標題 16px，內部用 `<dl class="kv">` 兩欄（左欄黃色 Barlow 標籤、右欄米色值）。

**引言**：左邊 4px 訊號紅豎線，16.5px 500 字重，下方 mono 11.5px 的出處。

**頁尾**：`#291709` 底，三欄（地址電話／各頁連結／規則），最後一行 mono 12px 的免責聲明。

## 六、動效規則

這套語言的動效很少，但每一個都對應真實動作。

| 動效 | 觸發 | 值 |
|---|---|---|
| 引帶推出 | 導覽 hover／focus | `transform:translateX(3px)`，180ms `ease` |
| 按鈕壓下 | `:active` | `translate(3px,3px)` 並移除硬陰影，瞬時 |
| 格子亮起 | cell hover | 背景 `#5a3620`→`#6b4126`，140ms |
| **斜接縫滑移（本風格簽名）** | 切換某一段的來源 | 帶身重繪，接口處以 45° 斜線切開，兩段沿斜線方向錯位 20px 後歸位 |
| 磁頭走帶 | 播放中 | 播放頭 x 由 `requestAnimationFrame` 依 `AudioContext.currentTime` 推進，非 CSS 動畫 |
| VU 指針 | 播放中 | `rotate(-46°→+46°)`，輸入為 `pow(level,.55)`，不做平滑補間（真表就是會抖） |
| REC 燈 | 播放中 | 紅底＋`box-shadow:0 0 10px #D8402C`，無閃爍 |

**`prefers-reduced-motion:reduce` 降級**：所有 transition 壓到 0.001s；播放頭改為**每小節跳一格**而非連續移動；VU 指針仍動（它是資料顯示不是裝飾）。聲音不受此設定影響——聲音不是動畫，但**絕不可自動播放**，一律等使用者手勢。

## 七、插畫與圖像風格：waveform-envelope 波形包絡

**本風格不畫插圖。** 頁面上每一張圖，都是把該段內容寫成一個可跑的合成模型、實際跑一遍、取其振幅包絡畫出來的。換一段聲音就換一張圖；同一段聲音永遠得到同一張圖。

三種原語，只有這三種：

1. **包絡帶（envelope band）**：對時間軸取樣，每個取樣點的振幅上下鏡射成一條有厚度的帶。ADSR 用真值：attack 50ms、decay 至 76% 峰值（≤300ms）、release 最後 130ms。底噪值抬高整條帶的最小厚度——**底噪大的 take，它的波形整條都比較粗**，這是可讀的資訊，不是美術效果。
2. **帶身（tape body）**：一條 72px 高的矩形，上緣 6px 為分類色。兩段來源不同時，交界處以 `dx=20px` 的 45° 斜線切開，切口疊一條 22% 不透明的骨白色斜帶（＝剪接膠帶）與一條 1.6px 的實線。
3. **刻度（scale）**：mono 9px 的秒數／dB 標記，配 1px 的 `#5c4534` 細線。任何圖只要有時間軸或量的軸，就必須標出可讀的數值。

顏色規則：波形本身用分類色（骨白／黃／紅／綠／藍），底線與刻度一律 `#5c4534`＋`#8a6a52` 文字，**警告標記才可用訊號紅**。

無 JavaScript 的頁面，圖在建置階段用同一支引擎烘成靜態 SVG（Python 與 JS 兩份實作必須共用同一組參數與同一條 ADSR 公式，否則靜態圖與互動圖會對不起來）。

**禁止**：細線幾何線描的器材插圖、等角視圖的機房、任何「畫出來」的麥克風或盤帶機造型。這個風格靠資料成圖，不靠描形。

## 八、Logo 與 Favicon

**Logo**：一條被 45° 斜線切開的波形。左半段與右半段是**兩段不同的波形**（不同的起伏），沿著紅色斜線錯開——logo 本身就是一個剪接點。下方 Barlow Condensed 17px、字距 3.4 的英文名。深棕底、骨白線、紅斜線，三色。

```
─ 波形段 A ─╱─ 波形段 B ─      斜線 #D8402C 4px，自右上到左下
PANSHENG SOUND
```

**Favicon**（32×32 inline SVG data URI，寫在 `<head>`）：同構簡化——上排一段波形、下排一段波形、中間一條紅斜線貫穿。1.6px 線寬即可在 16px 下辨識。**不要放帶盤圓形**，圓形在 16px 下會糊成一團。

## 九、Do & Don't

**Do**

- 讓每一張圖都能被讀出數字；圖說要寫「這張圖是怎麼算出來的」。
- 把規則與公式完整寫在一個不需要 JavaScript 的頁面上，並在互動頁連過去。
- 用「材料的顏色」當地色（氧化棕），冷色只給機器。
- 硬邊、硬陰影、2px 實框、零圓角。
- 文案寫具體的年份、型號、價格、人名、門牌；寫出「我們不做什麼」比寫「我們很專業」有力得多。

**Don't**

- 不要紫藍漸層、不要置中大標＋兩顆按鈕＋三張圓角卡片。
- 不要用 emoji 當 icon；判定符號用 ◎○△✕ 這類排版符號或自繪 SVG。
- 不要跑馬燈。這個風格的重點資訊靠工作單表頭與帶身承載，不靠捲動橫幅。
- 不要「EST. 19xx」年份徽章，也不要「老屋改建」的開場敘事。年份請直接寫進年表與器材購入紀錄。
- 不要自動播放聲音；不要把音量控制藏起來。
- 不要把接縫美化掉——差異看得見，才是這套語言的價值。

## 十、頁面骨架範例

```html
<body>
  <nav class="rail" aria-label="主導覽（引帶）">
    <svg class="reel" viewBox="0 0 44 44"><!-- 帶盤線描 --></svg>
    <div class="strip">
      <a data-c="1" href="index.html" aria-current="page"><i></i>剪接台</a>
      <a data-c="2" href="fa.html"><i></i>剪接法</a>
      <a data-c="3" href="peng.html"><i></i>棚與機</a>
      <a data-c="4" href="shi.html"><i></i>錄音師</a>
    </div>
    <div class="head"></div><div class="cap">HEAD</div>
  </nav>
  <nav class="mdock" aria-label="主導覽"><!-- ≤900px 的底部四格 --></nav>

  <header class="sheet-top">
    <div class="wrap">
      <a class="brand" href="index.html"><svg width="46" height="46"><!-- logo --></svg>
        <span><b>盤聲錄音室</b><span>PANSHENG SOUND STUDIO</span></span></a>
      <div></div>
      <div class="wsmeta">
        <span>工作單 <b>No. 1990-1106-A</b></span><span>帶速 <b>15 ips</b></span>
      </div>
    </div>
    <div class="wrap"><div class="sheet-rule"></div></div>
  </header>

  <main class="wrap">
    <section class="brief">
      <div>
        <p class="eyebrow">章節眉標</p>
        <h1>主標題，<em>重點用油性筆黃</em>。</h1>
        <p class="lead">兩到三句具體的敘述，不用形容詞堆疊。</p>
      </div>
      <aside class="order">
        <h2>交代事項</h2>
        <ol><li>條件一</li><li>條件二</li></ol>
        <p class="sign">署名／職稱 日期</p>
      </aside>
    </section>

    <hr class="tape">

    <section>
      <div class="secline"><span class="n">01</span><h2>區塊標題</h2><p>一句操作說明。</p></div>
      <div class="deckwrap"><div class="deck" role="group" aria-label="…">
        <!-- 104px + repeat(8, minmax(120px,1fr)) 的格子牆 -->
      </div></div>
      <noscript><div class="ns">靜態全文與規則頁的連結寫在這裡。</div></noscript>
    </section>

    <section class="bench">
      <div class="benchtop"><div class="vu">…</div><div class="rec">…</div><div class="timer mono">00:00.0</div></div>
      <svg class="tape" viewBox="0 0 960 148"><!-- 由狀態即時重繪 --></svg>
      <div class="tr"><button class="btn">▶ 播放</button><button class="btn k">合帶</button></div>
    </section>
  </main>

  <footer>…</footer>
</body>
```

**驗收**：把這份 SKILL 交給沒看過 Demo 的 AI，它應該做得出「左邊一條引帶軌、頂上一張工作單抬頭、中間一片可操作的格子牆、下面一條由選擇拼成的帶身」的網站——產業可以完全不同（織品、木工、鐵道、料理），只要那個產業有「片段」與「拼接的代價」。
