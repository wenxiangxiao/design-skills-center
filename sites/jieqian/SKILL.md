---
name: cadastral-overlay
description: A two-coordinate-system drafting style where sepia paper-domain lines (the old record) and electric-cyan survey-domain lines (the measured present) coexist on one sheet, and vermilion appears only where they contradict.
---

# 圖籍套合風 Cadastral-Overlay

## 一、設計哲學

這個風格只講一件事：**畫面上同時存在兩份都成立、卻互相矛盾的資料，而設計的工作是讓那個矛盾看得見、量得出、並且不被偷偷抹平。**

它來自地籍套合的工作面：一張舊圖（紙上的、有年代的、會收縮的）與一次實測（地上的、當下的、有中誤差的）疊在同一張圖廓裡。因此本風格的每一個決定都從一組二分法長出來：

- **紙域 vs 測量域**：暖褐色系一律屬於「紀錄／過去／人寫的東西」；青色系一律屬於「量測／現在／儀器讀出來的東西」。設計師不得為了好看把兩者互換。
- **線型即身分**：虛線＝來自圖上的（被推算的、有不確定性的）；實線＝來自地上的（被直接觀測的）。
- **硃色是稀有品**：整站只有一個警示色，只用在「兩份資料矛盾到有人要付代價」的地方。一個頁面上出現三處以上硃色，就代表這一版設計失敗了。

由此得到本風格的第一條禁令：**不得用漸層、陰影、圓角或任何裝飾去柔化兩層之間的關係。**它們必須硬碰硬地疊在一起，因為那正是內容本身。

適用產業不限於測繪：任何「舊紀錄 vs 新實況」的題材都適合——盤點與帳冊、修復前後的建築、古今地名對照、規格書與實作差異、譯本與原典校勘、預算與決算。**風格不綁產業，只綁那組二分法。**

## 二、色彩系統

| 角色 | 色票 | 用途 | 建議比例 |
|---|---|---|---|
| 紙域地色 | `#33231A` | body 底、大面積 | 38–42% |
| 紙域面板 | `#3E2C21` | 側欄、工具列、次級區塊 | 12–16% |
| 紙域深底 | `#2A1C14` | 主要內容卡的底 | 10–14% |
| 圖版底 | `#1E140E` | 圖面／canvas／程式碼區塊的底 | 8–12% |
| 紙域亮線 | `#E8C89A` | 舊圖線、標題強調、現用頁填實 | 10–14% |
| 紙域中線 | `#C89A63` | 全部框線與分隔線 | 4–6% |
| 測量域主色 | `#3FD3E0` | 實測構造物、連結、可操作元件、mono 標籤 | 10–14% |
| 測量域暗色 | `#2A8A93` | 次要實測物、道路、水系 | 2–4% |
| 主文字 | `#EFE7DA` | 內文 | — |
| 次文字 | `#B9A48D` | 說明、單位、圖說 | — |
| 警示唯一色 | `#F2452F` | 殘差向量、越界、拒簽、拒絕條款左框 | ≤4% |

配色規則：

1. **青色永遠不做背景**，只做線、點、文字與細框。它是光，不是紙。
2. **褐色永遠不做互動狀態的唯一提示**（色盲考量）：現用頁除了填褐，還要加硃色角標；越界除了轉硃，還要加粗線寬與數值文字。
3. 灰是不存在的。要更暗就往褐裡走（`#2A1C14`），要更亮就往米黃走（`#E8C89A`）。
4. 換題材時，兩個色域可以整組替換（例如 深靛×琥珀、墨綠×蜜桃），但**必須保持「一暖一冷、一為底一為線」的結構與 3:1 左右的面積比**，且警示色只有一個。

背景質感：全站 body 疊一層 `repeating-linear-gradient(0deg, rgba(0,0,0,.10) 0 1px, transparent 1px 5px)`——五像素一條的細橫紋，模擬曬圖網點。不得改成斜紋或加大到看得出圖案。

## 三、字體系統

```
標題／地號／文件名  Noto Serif TC 900（大標）、600（文件標題、卡片名）
內文              Noto Sans TC 300（主要）、400、700（小標）
數字／制度性標籤    IBM Plex Mono 400 / 500 / 600
```

**分工是硬規則**：凡是「可以被驗算的東西」一律 mono——座標、公分、面積、案號、比例尺、參數名、法條編號、章節代號、按鈕上的數字。凡是「人寫的東西」用 sans。凡是「文件的標題」用 serif。混用會立刻毀掉本風格。

字級：

| 用途 | size / weight / line-height / letter-spacing |
|---|---|
| 主標 h1 | `clamp(21px,3.2vw,34px)` / 900 / 1.28 / .02em |
| 章節 h2 | `clamp(18px,2.4vw,25px)` / 900 / 1.28 / .03em |
| 小標 h3 | 15px / 700(sans) / 1.5 / 0 |
| 內文 | 14.5px / 300 / 1.8–1.85 / 0 |
| 說明文 | 11.5–12.5px / 300 / 1.65 / 0 |
| mono 標籤 | 9.5–11.5px / 400–500 / 1.5 / .05–.16em |
| 數值 | 10.5–13px / 500 / 1.5 / 0 |

mono 的字距是本風格的簽名之一：**欄位標題用 `.12–.16em` 的寬字距**（像圖框外的註記），數值本身不加字距（要對齊）。

中文標題不使用粗體以外的裝飾；不使用文字陰影；不使用全大寫的中文（無意義），但英文小標一律大寫＋寬字距。

## 四、版面與網格

**核心構圖：工作面（bench）而非頁面（page）。**

1. **頁首條**：高 38px 的一條 mono 資訊帶，左為機構名、右為 2–3 項制度性資訊（地址、電話、證照字號）。它不是導覽，不含連結，永遠只有一行。這條帶子建立「這是一份公務文件」的第一印象。
2. **標題區**：`grid-template-columns: minmax(0,1fr) 200px`，左為主標＋一段長導言，右為一個 mono 的「收件戳記盒」（收件日、外業日、規格、來源）。**主標必須是一個主張句，不是名詞短語**（「這條線不是量出來的，是被承認的。」而不是「專業地籍測量服務」）。
3. **三欄工作面**：`274px | 1fr | 300px`，左為輸入清冊、中為圖面、右為結果。三欄之間只用 1px 實線分隔，**沒有間距（gap: 0）**——這是工作面而不是卡片牆。
4. **動作列**：緊貼工作面下緣（`border-top: none`），一排 mono 按鈕＋右對齊的鍵盤提示。
5. **散文區**：`column-count: 2`，欄間 38px，中間一條褐色虛線分隔。首字下沉（`::first-letter`，serif 900，2.6em）。
6. **數據列**：四格等寬、1px 實線分格、無圓角，mono 大數字＋sans 小說明。

留白規則：**外鬆內緊**。頁面左右 22px、區塊之間 0；區塊內部 14–24px。整體密度偏高（極密），因為這個風格的說服力來自「資訊量本身」。

不對稱來源：三欄寬度不等、標題區 1fr+200px、右上角導覽突出於版心之外。**不要把任何東西置中**，除了圖面內的文字標註。

RWD：≤1180px 三欄塌為單欄、右上導覽移入文件流變成四格橫列；≤900px 散文改單欄；≤560px 導覽再塌成 2×2。全部斷點都不改變色彩與線型語意。

## 五、元件配方

### 導覽（sheet-index 圖幅接合表）

右上角固定一個 2×2 的方格，每格是一張相鄰的「圖幅」：mono 圖號（`0247-I`）、serif 頁名、mono 英文小標。格與格之間用**褐色虛線**分隔（像圖幅接邊），外框實線。

```css
.sheet{border-right:1px dashed rgba(200,154,99,.5);border-bottom:1px dashed rgba(200,154,99,.5)}
.sheet[aria-current="page"]{background:#E8C89A;color:#2A1C14}   /* 調閱中＝填實 */
.sheet[aria-current="page"]::before{left:3px;top:3px;border-left:2px solid #F2452F;border-top:2px solid #F2452F}
.sheet[aria-current="page"]::after{right:3px;bottom:3px;border-right:2px solid #F2452F;border-bottom:2px solid #F2452F}
```

現用態＝**被調閱出來的那一幅**：整格填成紙色、文字反黑，左上與右下各壓一個硃色的圖廓角標。四幅永遠都在表上，沒有展開收合、沒有朝向、沒有互斥持有，只有一幅被填實。

### 按鈕

```css
.btn{font-family:mono;font-size:11.5px;letter-spacing:.05em;background:transparent;
     border:1px solid #E8C89A;color:#E8C89A;padding:7px 15px}
.btn:hover,.btn:focus-visible{background:#E8C89A;color:#2A1C14}     /* 純反色，無位移無陰影 */
.btn.go{border-color:#3FD3E0;color:#3FD3E0}
```

**絕對禁止**：圓角、陰影、漸層、按壓位移、放大。反色就是全部的回饋。

### 三態權重鈕（本風格的招牌控制項）

一組 `0 / 1 / 3` 的小方鈕，`aria-pressed` 標記選中者填實。用於任何「這筆資料我信幾分」的輸入。它比滑桿誠實，因為它逼使用者作離散的判斷而不是無意義地微調。

### 清冊項（cp）

每一筆：`mono 編號 + sans 名稱 / mono 種類小字 / 控制鈕列 + 右對齊的量值 / <details> 卷內附件`。項與項之間用褐色虛線。附件展開後是一段 11.5px 的說明，左邊壓一條 2px 的青色引線。

**這是本風格的道德核心**：任何要使用者作判斷的介面，都必須在同一個位置提供作判斷的依據，而且依據要能收起來（不強迫閱讀）也能展開（不隱藏）。

### 表格

1px 褐框、表頭 mono 寬字距、數值欄 `text-align:right` 且 `white-space:nowrap`、儲存格 padding `6px 9px`。**不要斑馬紋**。表格是文件不是列表。

### 拒絕條款塊

```css
.refuse{border:1px solid #F2452F;border-left-width:4px;padding:9px 12px;background:rgba(242,69,47,.07)}
.refuse b{color:#F2452F;font-family:mono;font-size:11px;letter-spacing:.08em;display:block}
```

標題為「中文標題＋兩個空格＋英文大寫代碼」（例：`本所拒絕出圖　REFUSED`）。內文直接說明**為什麼不做**，不提供「我知道了」的關閉鍵——拒絕不是通知。

### 文件塊（協議書／回執）

```css
.doc{border:1px solid #E8C89A;padding:14px 16px;background:rgba(232,200,154,.06)}
.doc h4{font-family:serif;font-weight:600;font-size:15px;letter-spacing:.14em}  /* 「土 地 界 址 協 議 書」 */
```

文件標題用 serif 600 加 `.14em` 字距，並在字與字之間手動加全形空格——模擬公文標題的疏排。內文 mono 10.5px、行高 1.85。簽章欄為一排 1px 邊框的小方塊。

### 表單

輸入框：`background:#1E140E; border:1px solid rgba(200,154,99,.45); font-family:mono; padding:7px 9px`，focus 時 `outline:2px solid #3FD3E0`。選項用 `<label class="opt">` 包住 radio/checkbox，選中時邊框轉青、底加 8% 青。錯誤訊息用 mono 11px 硃色，**寫成一句人話而不是「此欄必填」**（例：「電話請填 8 至 10 碼（可含連字號）」）。

### 頁尾

深底 `#1E140E`、上緣 2px 褐實線、三欄（機構資訊＋logo／業務／頁面），最後一段 mono 10px 的免責與技術聲明。

## 六、動效規則

本風格的動效總量極少，且遵守一條總則：**能被量測的東西才可以動，而且它的動法要等於它的量。**

| 動效 | 觸發 | 規格 |
|---|---|---|
| 累積記錄棒 | 每次重新計算 | `scaleY(.02→1)`，160ms，`linear`，`transform-origin:bottom`。棒**不淡出、不合併、不重排**，橫向累積 |
| 反色 | hover / focus | 無 transition（0ms）。直接跳 |
| 展開附件 | `<details>` | 瀏覽器原生，不加自訂動畫 |
| 捲動定位 | 結案／詳情展開 | `scrollIntoView({behavior:'smooth',block:'nearest'})`，reduced-motion 下改 `auto` |

**明令禁止**：進場淡入／位移揭示、數字 count-up、視差、stroke-dashoffset 描繪、跑馬燈、任何無限循環的呼吸或漂浮。理由：這個風格的畫面代表一份可被驗算的資料，會自己動的資料是不可信的。**當使用者改變參數時，圖面應該在同一幀直接跳到新狀態——因為那不是移動，那是另一個解。**

`prefers-reduced-motion: reduce` 下把全部 `animation` 與 `transition` 設為 none 即可；**不得因此改變任何數值、判定或可用性**。

## 七、插畫與圖像風格（residual-vector 殘差向量製圖）

**全站不使用任何描外形的插圖。**唯一的圖像語言是「同一組點在兩個座標系裡的差」，由三種原語構成：

1. **紙域多邊形**：褐色虛線（`stroke-dasharray:9 4`，2.2px），內填 4.5% 同色，代表來自紀錄的幾何。
2. **測量域圖形**：青色實線（1.6px；牆等線狀物 2.6px `stroke-linecap:square`），內填 10% 同色，代表現地實測的東西。
3. **殘差向量**：由測量點指向紀錄點的硃色箭頭，**放大一個固定倍率並在圖上寫明**（例「×20」）。箭頭頭部為三角形 path，張角 ±0.42 rad、長度 5–9px。

搭配元素：`stroke-dasharray:3 3` 的褐色虛線圓＝中誤差圓（半徑用同一放大倍率）；`stroke-opacity:.16`、`stroke-dasharray:1 6` 的褐色格網＋四邊 mono 座標註記；圖廓內縮 14px 的 0.5 透明度細框。

**殘差場的六種型態**（可直接拿來當縮圖／圖鑑的生成規則，`d` 為位移、`u` 為該點相對中心的正規化座標）：

```js
shift  : d = (k·0.9, k·0.32)                 // 全部同向：整張平移
rot    : d = (−u.y·k·1.5, u.x·k·1.5)         // 繞中心成環：方位差
scale  : d = ( u.x·k·1.6,  u.y·k·1.6)        // 向外放射：紙張伸縮
shear  : d = ( u.y·k·1.9, 0)                 // 沿一軸規則變化：局部歪斜
blunder: d = 小雜訊；單點 d = (k·4.2, −k·2.1) // 一根特別長：粗差
join   : d = sign(x−cx)·(k·1.2, k·0.5)       // 被切成兩半：圖幅接邊差
```

每個位置再加 `(rand−0.5)·k·0.28` 的雜訊，長度超過 `k·1.6` 的箭頭轉硃色。**同一支引擎必須同時產出主圖、縮圖、logo、favicon 與回執印記**——這是本風格「全站無一張圖是畫的」的實現方式，也是它看起來不像 AI 產物的主要原因。

印記（回執／落款）：一個雙圈硃色圓（外圈 2.4px 實線、內圈 1px `dasharray:2 3`），圈內散布 9 組「青點＋褐箭頭」，底部一行 mono 的識別碼。以輸入內容的 FNV-1a hash 作種子，同輸入恆同形。

## 八、Logo 與 Favicon

**Logo 構成**：一個褐色虛線方框（紀錄）＋一個向右下偏移的青色實線方框（實測）＋一支從褐點指向青點的硃色箭頭（殘差）＋兩顆實心小點。右側 serif 900 中文機構名（字距 4px）＋下方 mono 英文名（字距 2.6px、青色）。整體置於紙域底色的矩形內，**不去背、不加圓角**。

尺寸建議 240×64，中文字 26px、英文 10px。縮到 120px 寬時仍應看得出「兩個方框沒有對齊」——這是識別的全部重點。

**Favicon**（inline SVG data URI，32×32）：只保留三個元素——褐虛線方框（5,6,13,13）、青實線方框（12,11,13,13）、硃色連線（11,12 → 20,19）。不放文字。

```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E
%3Crect width='32' height='32' fill='%2333231A'/%3E
%3Crect x='5' y='6' width='13' height='13' fill='none' stroke='%23E8C89A' stroke-width='1.6' stroke-dasharray='3 2'/%3E
%3Crect x='12' y='11' width='13' height='13' fill='none' stroke='%233FD3E0' stroke-width='1.6'/%3E
%3Cpath d='M11 12 L20 19' stroke='%23F2452F' stroke-width='2'/%3E%3C/svg%3E
```

## 九、Do &amp; Don't

**Do**

- 每一個要求使用者判斷的控制項旁邊，都放得下判斷所需的依據（`<details>` 卷內附件）。
- 數字一律 mono、一律標單位、一律標不確定度。寫 `±10.2 cm` 而不是「精準」。
- 把「系統拒絕做的事」寫成頁面上的正式段落，用硃色左框標出，不藏進 tooltip。
- 主標寫成一句有立場的主張句。
- 全部圖像由同一支資料引擎生成，包含 logo 與 favicon。
- 提供一頁完全不需 JavaScript 就能讀完的「方法／原理」頁，讓人可以複核你的每一個數字。

**Don't**

- ❌ 紫藍漸層、置中大標＋三張圓角卡片、模糊陰影、`rounded-2xl`。
- ❌ emoji 當 icon（本風格連 icon 都少用；需要時畫 SVG 幾何）。
- ❌ 用青色當背景、用褐色當警示、用硃色當裝飾。
- ❌ 進場動畫、數字滾動、跑馬燈、視差、無限循環的微動。
- ❌ 「在當今快速變遷的時代」「一站式解決方案」「專業團隊值得信賴」這類 AI 腔。文案要有具體的人名、年份、公分數、法條與價格。
- ❌ 用「精準」「零誤差」「完美」等字眼。本風格的世界觀裡沒有零誤差，只有寫清楚的誤差。
- ❌ 把兩個資料層用透明度融合成一層柔和的畫面。它們必須互相牴觸。

## 十、頁面骨架範例

```html
<div class="strip"><div class="wrap">
  <span><b>機構名</b>　ROMANISED NAME</span>
  <span class="rt"><span>地址</span><span>電話</span><span>證照字號</span></span>
</div></div>

<nav class="sheetnav" aria-label="圖幅接合表導覽">
  <div class="cap">圖幅接合表 SHEET INDEX</div>
  <div class="sheetgrid">
    <a class="sheet" href="a.html" aria-current="page"><span class="no">0001-I</span><span class="nm">工作台</span><span class="en">BENCH</span></a>
    <a class="sheet" href="b.html"><span class="no">0001-II</span><span class="nm">案卷室</span><span class="en">FILES</span></a>
    <a class="sheet" href="c.html"><span class="no">0001-III</span><span class="nm">方法</span><span class="en">METHOD</span></a>
    <a class="sheet" href="d.html"><span class="no">0001-IV</span><span class="nm">委託</span><span class="en">COMMISSION</span></a>
  </div>
</nav>

<main class="wrap">
  <div class="headline">
    <div>
      <div class="case">案號 111-XX-0247　／　案由　／　委託人</div>
      <h1>一句有立場的主張句。</h1>
      <p>一段長導言，說明使用者在下面那個工作面上要做什麼、以及為什麼那件事沒有正確答案。</p>
    </div>
    <div class="stampbox">收件　<b>111.03.14</b><br>規格　<b>GSD 1.4 cm/px</b></div>
  </div>

  <section class="bench">
    <div class="col"><div class="colhd"><span>輸入清冊　INPUT</span><i>0 / 1 / 3</i></div>
      <div class="cp"><div class="r1"><span class="id">C1</span><span class="nm">項目名稱</span></div>
        <span class="kind">來源・年份・狀態</span>
        <div class="r2">
          <button class="wbtn" data-w="0" aria-pressed="false">0</button>
          <button class="wbtn" data-w="1" aria-pressed="true">1</button>
          <button class="wbtn" data-w="3" aria-pressed="false">3</button>
          <span class="res">r 12.4 cm</span>
        </div>
        <details class="ev"><summary>卷內附件</summary><p>作判斷所需的證據原文。</p></details>
      </div>
    </div>
    <div class="col"><div class="colhd"><span>圖面　PLATE</span><i>解 #01</i></div>
      <div class="plate"><svg viewBox="0 0 870 690" role="img" aria-labelledby="t d">…</svg></div>
      <div class="legend">
        <span><i style="border-color:#C89A63;border-top-style:dashed"></i>紀錄層</span>
        <span><i style="border-color:#3FD3E0"></i>實測層</span>
        <span><i style="border-color:#F2452F"></i>差異</span>
      </div>
      <div class="refuse"><b>本所拒絕作結論　NO CONCLUSION</b>為什麼不做的完整說明。</div>
    </div>
    <div class="col"><div class="colhd"><span>結果　OUTPUT</span><i>n=8</i></div>
      <div class="kv"><span>參數</span><b>1.003165</b><span>中誤差</span><b>±10.2 cm</b></div>
      <table class="area">…</table>
    </div>
  </section>

  <div class="acts">
    <button class="btn" data-preset="a">預設組合一</button>
    <button class="btn go">執行不可回頭的那一步</button>
    <span class="hint">鍵盤：Tab 走清冊，Enter／空白鍵切換</span>
  </div>
  <div class="result">…三種結案之一…</div>

  <section class="reading">
    <h2>散文小標</h2>
    <div class="cols"><p>首字下沉的第一段……</p><div class="pull">一句被抽出來的主張。</div></div>
    <div class="factrow"><div><b>1/1200</b><span>說明</span></div>…</div>
  </section>
</main>
```

驗收：把這份規格交給一個沒看過 Demo 的 AI，它應該做得出一個「兩層資料在同一張圖上互相牴觸、硃色只出現在牴觸處、全部數字都標了不確定度、而且系統會在證據不足時公開拒絕作結論」的網站——題材可以完全不同。
