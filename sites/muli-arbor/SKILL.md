---
name: xylem-tomogram
description: A field-instrument visual language for measurement work — olive mid-tone ground, wood-anatomy illustration, a dedicated false-colour scale that never leaks into the layout, and interfaces that refuse to state conclusions the data cannot support.
---

# 木質斷層風 Xylem-Tomogram

一套給「量測」而生的視覺語言。它的核心不是木頭的溫暖感，而是**儀器的克制**：
畫面上每一個顏色都必須有量測依據，沒有依據的區域要看起來就像沒有依據。

適用於任何「由間接資料推論不可見狀態」的題材——樹木檢測、地質探測、無損檢測、
醫學影像設備、土壤調查、結構監測、水文量測、考古探勘。也適用於任何希望
「數據誠實感」壓過「行銷感」的專業服務業。

---

## 一、設計哲學

1. **顏色是資料，不是裝飾。** 版面用色與資料用色是兩個互不相通的色域。
   版面只用橄欖／米／黃綠／赭紅四個角色；資料圖表用一組獨立的偽色階，
   而那組色階**絕不可以**出現在按鈕、標題或裝飾上。看到那些顏色，就代表你在看數據。
2. **未知要看得出是未知。** 沒有資料的區域畫成比背景稍亮的暗灰，不是白、不是綠、不是留白。
   留白會被讀成「乾淨」，綠會被讀成「正常」。介面有義務讓「沒量到」比「沒問題」更顯眼。
3. **介面可以拒絕使用者。** 當輸入不足以支撐結論時，正確的行為是說明理由並不出結論，
   而不是給一個信心低的答案。這一條會直接改變版面：判定區必須為「不予判定」保留同樣的視覺份量。
4. **每個數字都要能被追問。** 頁面上出現的每一個推導值，旁邊或另一頁必須寫得出它的算式、
   門檻與門檻的由來。這是本風格的文案骨幹。
5. **不對稱來自功能。** 主畫布靠左吃滿，控制面板是右側一條窄柱；這不是構圖偏好，
   是儀器的操作面本來就長這樣。不要為了平衡而把它拉成置中對稱。
6. **有機的形只出現在被量測的對象上。** 樹皮輪廓、年輪、導管孔可以是曲線；
   介面本身一律直角、零圓角、零陰影、實線分隔。

---

## 二、色彩系統

### 版面色（唯一允許出現在 UI 上的顏色）

| 角色 | hex | 用途 | 面積比 |
|---|---|---|---|
| 樹皮橄欖 `--bark` | `#3B4327` | 頁面地色 | ~55% |
| 深樹影 `--deep` | `#2A301B` | 面板、卡片、畫布外框、行動導覽底 | ~22% |
| 邊材米 `--sap` | `#EDE6CE` | 內文、輪廓線、標題 | ~15%（做為前景） |
| 健全黃綠 `--sound` | `#C6D45E` | 可操作元件、強調、現用狀態、正向判定 | ~6% |
| 腐朽赭紅 `--decay` | `#A93F30` | 劣化、拒絕、警示、界限線 | ~2% |
| 墨 `--ink` | `#1B1F12` | 黃綠底上的字 | — |

分隔線：`rgba(237,230,206,.20)` 為次要分隔、`rgba(237,230,206,.42)` 為容器邊框。
畫布底另用一階更深的 `#22280F`，使畫布看起來像嵌進面板的一塊玻璃。

**橄欖是黃綠色相（H≈75），不是藍綠色相。** 這一點決定整個風格的體感：
藍綠會走向醫療與北歐，黃綠會走向田野與工程。不要把 `--bark` 換成 `#2F4A52` 這類鐵青，
那是另一個風格。

### 資料色階（僅用於圖表與畫布內部）

以量值分段線性內插，六個節點：

```
320  → #4A1C2A   空腔
700  → #8E2F2C   重度
960  → #A93F30   明顯劣化
1180 → #D98E33   初期劣化
1350 → #9AA84E   接近健全
1480 → #C6D45E   健全
```

明度與色相同時單調變化，因此色覺辨識有差異者也能讀出強弱——**不要**改成純紅綠對比。
無資料格：`#2E3418`（比畫布底亮一階的中性暗色，刻意不落在色階上）。

---

## 三、字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 標題 | Zilla Slab | 700 | 板狀襯線，工程報告書的體感；`letter-spacing:-.01em` |
| 讀數／標籤／編號／表頭 | DM Mono | 400 / 500 | 所有數字一律等寬；`letter-spacing:.04em`–`.20em` 依尺寸放大 |
| 內文 | Noto Sans TC | 400 / 700 | `line-height:1.75`，長文段落 `1.95` |

字級 scale：

```
h1/h2  clamp(26px, 3.4vw, 40px)   700
h3     17–20px                    700
讀數大字 31px                      700  Zilla Slab
內文    15px / 長文 16.5–17px      400  line-height 1.75–1.95
標籤    10–11px  letter-spacing .16–.26em  大寫拉丁
註記    12–12.5px  opacity .55–.62
```

**規則**：任何一個會被拿來判斷的數字，都必須是等寬字。中文標籤與拉丁代號並置時，
拉丁一律大寫加寬字距，作為「機器欄位」的訊號。

---

## 四、版面與網格

- 容器 `max-width:1200px`，左右 padding 26px（≤640px 收為 16px）。
- **主工作區**：`grid-template-columns: minmax(0,1fr) 340px`。左為畫布（吃滿），右為控制柱。
  ≤1040px 塌成單欄，控制柱移到畫布下方——**不要**改成左右對調或置中。
- **讀數列**：四等分格線分隔的橫帶，`border-right:1px` 分格、無圓角、無間距。
  下方接一條判定列，判定列是整條橫幅而非卡片。
- **長文段落**：`max-width:62–70ch`。三欄說明用 `repeat(3,1fr)` + `gap:34px`，
  ≤640px 塌成單欄。
- **圖說區**：圖與圖說永遠共用一個 1px 實線框，圖說在框內、不是框外。
- 留白規則：section 之間 `padding:56px 0` 加一條 1px 頂線；同一 section 內元素間距 12–26px。
  **不使用大留白**——本風格的密度是中等偏密，資訊要看起來像一份報表。
- 零圓角、零陰影、零漸層（資料色階除外）。

---

## 五、元件配方

### nav — 年輪環（ring-depth）

右上角固定 176×176 的同心圓 SVG，四頁為四道環（半徑 74／57／40／23，`stroke-width:15`）。
頁名以 `<textPath>` 貼在該環上緣弧線，`font-size:9.6px`、`letter-spacing:.34em`、`fill` 為地色（挖空效果）。
現用頁的環 `stroke: var(--sound)`；hover／focus 的環 `stroke: var(--sap)`。中心一枚 `--deep` 圓盤放品牌代號。

```html
<nav class="ringnav" aria-label="年輪環導覽"><svg viewBox="0 0 176 176">
  <defs><path id="p1" d="M 88 88 m -74,0 a 74,74 0 0 1 148,0" fill="none"/></defs>
  <a href="index.html" class="cur" aria-current="page"><title>檢測台</title>
    <circle class="rg" cx="88" cy="88" r="74"/>
    <text class="rt"><textPath href="#p1" startOffset="50%" text-anchor="middle">檢測台</textPath></text>
  </a>
  <!-- r=57 / 40 / 23 同理 -->
</svg></nav>
```

**語意**：由外而內＝由現場到後台（操作台 → 方法 → 資料庫 → 契約）。若題材沒有這種深度序列，
換成別的導覽，不要硬套。≤900px 一律降為底部四格 dock，頁尾另備完整連結。

### 按鈕

```css
.btn{background:var(--sound);color:var(--ink);border:1px solid var(--sound);
     font-family:var(--mono);font-size:12px;letter-spacing:.12em;padding:11px 8px;border-radius:0}
.btn:hover{background:transparent;color:var(--sound)}          /* 整塊反色，不位移、不加陰影 */
.btn.ghost{background:transparent;color:var(--sap);border-color:var(--line2)}
.btn.ghost:hover{background:var(--sap);color:var(--ink)}
```

### 圖層切換（分段按鈕）

一排相連的方形按鈕，`border-right:none` 只留最後一個，選中者 `aria-pressed="true"` 並整塊填 `--sound`。
**必須用 `aria-pressed` 而不是 class 判斷狀態。**

### 面板（控制柱）

`border:1px solid var(--line2)` 外框，內部以 `border-bottom:1px solid var(--line)` 分成數個 `.pblk`。
每塊上緣一行 `10px / letter-spacing:.2em / opacity:.55` 的大寫拉丁小標。
數值列為 `display:flex; justify-content:space-between` 的兩端對齊，左標籤右數值、數值等寬字。

### 表單

輸入框底色比面板深一階（`#22280F`）、1px 實線框、零圓角、`outline:2px solid var(--sound)` on focus。
錯誤訊息為 `--decay` 色、等寬、12.5px，且**永遠佔位**（`min-height:17px`）避免版面跳動。
驗證在送出時一次全部檢查並逐欄標示，不做逐鍵即時紅字。

### 卡片（資料列）

`grid-template-columns:104px 1fr`：左為一枚程序生成的識別印記，右為欄位。
欄位用 `<dl>` 三欄，每格上緣一條 1px 線。**不使用陰影卡片、不使用圓角、hover 不浮起**，
只允許 `background: rgba(237,230,206,.04)` 的極輕底色變化。

### footer

三欄，上緣 1px 實線。最後一段為 12px、`opacity:.45` 的免責與資料聲明——
本風格的 footer 一定有這一段，它是風格的一部分。

---

## 六、動效規則

本風格**沒有自動播放的動畫**。畫面會動只有兩個原因：使用者操作，或模擬正在運算。

| 對象 | 觸發 | duration | easing |
|---|---|---|---|
| 按鈕／分段按鈕整塊換色 | hover / focus / 切換 | 130ms | linear |
| 導覽環 stroke 換色 | hover / focus | 160ms | linear |
| 量表寬度、進度條 | 值改變 | 120ms | linear |
| 卡片底色 | hover | 120ms | linear |
| 畫布重繪 | 參數改變 | 同步（0ms） | — |

**刻意的零過渡**：參數一動，畫布立刻重畫，不做補間。量測儀器不會慢慢淡入一個新讀數；
延遲會讓人誤以為那是動畫效果而不是新資料。

**禁止**：進場揭示（IntersectionObserver 淡入）、數字滾動計數、按壓硬陰影位移、
`stroke-dashoffset` 描繪、視差、跑馬燈、自動輪播。

`prefers-reduced-motion: reduce` 下把所有 transition 壓到 `.001ms`。
因為本風格沒有自動動畫，這個降級**不會關掉任何功能**——這是刻意的設計，
不要做出「開了 reduced-motion 就少一半內容」的站。

---

## 七、插畫與圖像風格：xylem-section 木質剖面製圖

**所有圖像都是組織切面，不是物件的外形描繪。** 三種原語，程序生成：

1. **年輪界** — 一條橫貫畫面的微彎曲線（`M0 y Q w/2 y+3 w y`），`stroke-width:1.1`、`opacity:.5`。
   每 38–44px 一條，間距隨機微擾。
2. **導管孔** — 沿年輪界內側 3–6px 排布的空心圓，半徑 2.2–3.5，`stroke: --sound`、`opacity:.8`。
   環孔材整齊排成一列；散孔材則在整個年輪內隨機散布且半徑相近。
3. **放射組織** — 垂直細線，`stroke-width:.5`、`opacity:.14`，密度約每 14px 一條。

材況以疊加層表達：**初期腐朽**加半透明脫色斑（`fill:--sap; opacity:.15`）與一條 `--decay` 界限線；
**空洞**用一條 `--decay` 粗線作癒傷障壁區，其下以底色覆蓋並撒暗紫紅碎屑點。

**輸出規則**：靜態頁的圖在建置時就烘成 SVG 寫進 HTML（無 JS 也看得到）；
相同輸入必須得到相同輸出（用 LCG 或 FNV 種子，不要用 `Math.random()`）。
圓形元素一律以 `<g>` 共用 `stroke`／`fill`／`opacity` 屬性包起來，座標取整數，
否則單張圖輕易超過 40 KB。

**識別印記**：每筆資料配一枚 11 圈同心環的小方圖，環寬由編號雜湊決定，寬環粗實、窄環細淡，
圓心一點 `--decay`。它是條碼的替代品，不要真的畫條碼。

**禁止**：細線幾何線描的小房子／小工具、等寬單色外框圖示、emoji、任何外部圖片與圖示字型。

---

## 八、Logo 與 Favicon

**Logo**：左為一枚樹幹橫斷面（同心圓四道，外圈 `stroke-width:1.6` 由內往外遞減 opacity），
心材位置一塊 `--decay` 實心圓（偏心 1–2px，不要正中），
一條 `--sound` 直線作為射線斜貫整個斷面並在兩端各點一個實心圓（感測器）。
右為兩行字：上行 Zilla Slab 700 的中文簡稱，下行 DM Mono 9.5px、`letter-spacing:2.4` 的英文全名。

構圖要點：**射線必須穿出斷面之外**，落在兩顆感測器上——這條線是整個 logo 的語意，
沒有它就只是一枚年輪貼紙。

**Favicon**：同一枚斷面，去掉文字，`viewBox="0 0 64 64"`，底色 `--deep`，
以 inline SVG data URI 寫在 `<head>`，不外連檔案。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%232A301B'/%3E%3Cg transform='translate(32,32)'%3E%3Ccircle r='25' fill='none' stroke='%23EDE6CE' stroke-width='2.4'/%3E%3Ccircle r='18' fill='none' stroke='%23EDE6CE' stroke-width='1.4' opacity='.55'/%3E%3Ccircle r='8' cx='-1' cy='2' fill='%23A93F30'/%3E%3Cline x1='-22' y1='-11' x2='19' y2='16' stroke='%23C6D45E' stroke-width='2.6'/%3E%3C/g%3E%3C/svg%3E">
```

---

## 九、Do & Don't

**Do**

- 讓主畫布在使用者做出第一個動作之前保持空白，並在空白處寫清楚「尚無量測資料」與下一步。
- 把「這份資料的可信度」做成與結論同等份量的介面元素（覆蓋率、殘差、樣本數）。
- 每個推導值旁邊都放得出算式與門檻，並在另一頁寫出門檻的由來。
- 用專業行話：射線、覆蓋率、殘差、反演、走時、門檻、界限線、障壁區、複測。
  行話要從該產業真的長出來，不要拿科技業的詞彙套。
- 在 footer 與報告尾端寫明資料界線與不涵蓋範圍。
- 數字一律等寬字，欄位標籤一律大寫拉丁加寬字距。

**Don't**

- 不要用紫藍漸層、不要置中大標＋兩顆按鈕、不要三張圓角卡片。
- 不要把資料色階拿去做按鈕、標題或裝飾。
- 不要用綠色或留白表示「沒有資料」。
- 不要在資料不足時仍然給出一個結論——那是這個風格最嚴重的錯誤。
- 不要加載入動畫、進場淡入、數字滾動。儀器沒有開場動畫。
- 不要用 emoji 當圖示，不要用細線幾何線描的插圖。
- 不要寫「在當今快節奏的世界」「把 X 變成 Y」「EST. 19xx」這類文案。
- 不要用 `Math.random()` 產生會被看見兩次的圖形——同一筆資料必須永遠長一樣。

---

## 十、頁面骨架範例

```html
<body>
<nav class="ringnav" aria-label="年輪環導覽"><!-- 四道環，見 §5 --></nav>
<nav class="dock" aria-label="頁面導覽"><!-- ≤900px 顯示 --></nav>

<header class="mast">
  <div class="wrap">
    <a href="index.html"><img src="assets/logo.svg" alt="機構名稱"></a>
    <p class="meta">地址<br>電話　營業時間</p>
  </div>
</header>

<main><div class="wrap">

  <section class="bench">
    <div class="benchgrid">           <!-- minmax(0,1fr) 340px -->
      <div class="stage">
        <div class="stagehd">          <!-- 檢材／參數／進度 四段等寬字 -->
          <span>檢材　<b>ID 名稱</b></span><span>已量測　<b>0 / 8</b></span>
        </div>
        <canvas id="cv" width="560" height="560" role="img" aria-label="…尚未量測時無資料…"></canvas>
        <div class="layers" role="group" aria-label="圖層切換">
          <button type="button" aria-pressed="true">結果圖</button>
          <button type="button" aria-pressed="false">原始路徑</button>
          <button type="button" aria-pressed="false">覆蓋密度</button>
        </div>
        <p class="note">一句話說明可以怎麼操作，以及沒有依據的區域代表什麼。</p>
      </div>

      <div class="panel">
        <div class="pblk"><p class="plab">SUBJECT</p>…</div>
        <div class="pblk"><p class="plab">CONFIGURATION</p>…滑桿與按鈕格…</div>
        <div class="pblk"><p class="plab">SOLUTION</p>
          <div class="rowv"><span>覆蓋率</span><b>—</b></div>
          <button class="btn" type="button">產生報告</button>
        </div>
      </div>
    </div>

    <div class="readout" aria-live="polite">
      <div class="rgrid">
        <div><span>METRIC A</span><b>—</b><em>中文說明</em></div><!-- ×4 -->
      </div>
      <div class="verdict">
        <span class="tag v-na">尚無資料</span>
        <p>為什麼現在還不能下結論，以及使用者該做什麼。</p>
      </div>
    </div>
  </section>

  <section class="body">
    <p class="kick">SECTION LABEL</p>
    <h2 class="h2">中文標題</h2>
    <div class="cols3">…三欄說明…</div>
  </section>

</div></main>

<footer><!-- 三欄 + 免責與資料界線聲明 --></footer>
<noscript><!-- 靜態替代管道 --></noscript>
</body>
```

**核心互動的實作骨架**（任何反演／估計類題材都適用）：

```js
// 1. 隱藏真值：由識別碼雜湊決定，同一筆資料恆為同一個真值
const truth = truthOf(record.id);
// 2. 使用者設計量測：位置、數量、要量哪幾條
// 3. 正向模型：沿量測路徑積分真值 → 觀測量（加微量雜訊）
const obs = forward(truth, geometry);
// 4. 反演：SIRT/ART 逐輪把殘差按權重分攤回未知數，中途做輕度平滑正則化
const est = invert(obs, geometry, {iters:140, lambda:.85, smooth:.4});
// 5. 覆蓋度檢查 → 不足就拒絕出結論
// 6. 指標與判定 → 允許使用者切到「揭曉真值」對答案
```
