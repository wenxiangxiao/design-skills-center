---
name: jacquard-point-paper
description: A dense weaving point-paper aesthetic — saturated aubergine ground ruled into an 8-cell grid, single accent ochre, zero radius, and every illustration rendered as woven interlacement rather than drawn.
---

# 紋織意匠圖 Jacquard Point-Paper

## 一、設計哲學

意匠圖（點格紙）是織布業真正在用的圖紙：一張被格線切成方眼的紙，每一格代表一個經緯交叉點，用手塗滿或留白，塗滿的那格上機時經紗就浮在上面。它是**程式碼的紙本形式**——排完就能餵給機器。

這個風格的三條骨幹：

1. **格線是版面本身，不是裝飾。** 頁面底層永遠鋪著一層 12px 方眼、每 8 格加粗一次的規線。所有區塊、表格、按鈕都貼著這個節奏走，不做例外的圓角或陰影。
2. **兩個色相，沒有第三個。** 一個飽和的中深色地色（經紗色），一個高明度強調色（緯紗色），加上紙色與墨色兩個中性。任何想加第三色相的衝動都應該改用「同色相不同明度」解決。
3. **圖像必須是織出來的，不是畫出來的。** 這是本風格最硬的一條。插圖、圖標、標誌都由交織規則產生：把母題寫成三階明暗遮罩，每一階指派一種真實組織（緞紋最亮、斜紋居中、平紋最暗），再逐紗渲染。做出來的圖有布的顆粒，不是向量插畫。

要避免的誤解：這不是「復古印刷」也不是「藍晒工程圖」。意匠圖沒有紙張泛黃、沒有網點、沒有描線；它是**乾淨、密集、機械、帶顏色的方眼紙**，語氣接近規格書而不是懷舊海報。

## 二、色彩系統

| 角色 | 色票 | 用途 | 面積比例 |
|---|---|---|---|
| 經紗色（地） | `#6C2E88` 紫根 | `body` 底色、頁面主色域 | 約 45% |
| 深版塊 | `#3B1250` 深紫 | `.slab` 卡片、表格底、次級區塊 | 約 25% |
| 最深 | `#26082F` 極深紫 | 規格條、頁尾、織布畫布底 | 約 12% |
| 緯紗色（強調） | `#F0C33C` 黃檗 | 標題、標籤、數字讀數、按鈕啟用態、格線第 8 格 | 約 10% |
| 紙色 | `#F1EADA` 生成 | 內文、邊框、輸入框底 | 約 8% |
| 墨色 | `#241420` 墨紫 | 生成色底上的文字、外框線 | < 2% |
| 警告 | `#FFB4A2` 淡珊瑚 | 驗證失敗、停產、缺陷提示（唯一容許的第三色相，且只出現在文字） | < 1% |

換色時的規則：地色必須是飽和度 40–60%、明度 30–40% 的中深色（不是近黑，那會掉進「深色典雅」家族）；強調色必須是地色的補色方向、明度 55–65%。整站不得出現任何漸層——布沒有漸層。

## 三、字體系統

Google Fonts 兩支：

- **Noto Sans TC** `400 / 700 / 900` — 中文全部，標題一律 900、`letter-spacing:-.02em`
- **Chivo Mono** `400 / 700` — 所有數字、代號、標籤、英文，一律大寫、`letter-spacing:.12em–.22em`

字級 scale（1.28 比例，刻意窄）：

```
h1  clamp(30px, 5.4vw, 52px)   900   line-height 1.2
h2  clamp(20px, 3vw, 30px)     900   line-height 1.2
h3  17px                       900
body 15px                      400   line-height 1.75
sm  12.5–13px                  400   line-height 1.7
lab 9.5px  mono  .22em 大寫           ← 區塊標籤，本風格的簽名級元件
tiny 8.5–9px mono .16em 大寫          ← 圖表軸標、卡片編號
```

中文標題可以很大，但**英文與數字永遠很小**——這是規格書的語氣：字大的是給人看的，字小的是給機器對的。

## 四、版面與網格

- 內容欄 `max-width:1180px`，左右 padding 22px（手機 15px）。
- `body` 背景疊四層 `repeating-linear-gradient`：0°/90° 各一層 12px 細格（`rgba(紙色,.055)`），再各一層 96px 粗格（`rgba(強調色,.13)`）。**這層格線不可省略**，它是整個風格的地基。

```css
background-image:
 repeating-linear-gradient(0deg,rgba(241,234,218,.055) 0 1px,transparent 1px 12px),
 repeating-linear-gradient(90deg,rgba(241,234,218,.055) 0 1px,transparent 1px 12px),
 repeating-linear-gradient(0deg,rgba(240,195,60,.13) 0 1px,transparent 1px 96px),
 repeating-linear-gradient(90deg,rgba(240,195,60,.13) 0 1px,transparent 1px 96px);
```

- **規格條（spec strip）**：每頁最上方一條 `display:flex` 的橫列，7–9 個「小標籤／值」欄位，欄與欄之間 1px 分隔線，最後一欄 `margin-left:auto` 靠右並用強調色。這條取代了傳統 hero，讓頁面一開始就是資料。
- **零圓角、零模糊陰影**。所有邊框 2px 實線紙色；按鈕與卡片用 `box-shadow:3px 3px 0 var(--最深)` 的硬位移陰影（不是模糊）。
- 不對稱：主要工作區用 `1.25fr .85fr` 或 `1.05fr .95fr` 這類非等分兩欄，避免 50/50。
- 留白極少。密度是本風格的個性；寧可讓表格擠一點，也不要出現大片空地色。
- 旋轉角度只出現在導覽卡片鏈（−2°～+1.4°），版面其餘部分嚴禁傾斜。

## 五、首創技術實作配方：織法引擎（本站的核心，可直接移植）

這是本風格「圖像必須織出來」的實作。三段式：**離散程式 → 交織矩陣 → 逐紗渲染**。

### 5.1 資料結構

```js
var EN=32, PK=32, SH=8;          // 經紗數、緯紗數、綜框數
var D = {
  th: Int8Array(EN),   // 穿綜：第 x 根經紗吊在第 th[x] 片綜框（0..7）
  tu: Array(8),        // 綁踏：tu[t] 是位元遮罩，第 s 位為 1 表示踏板 t 提起綜框 s
  tr: Int8Array(PK),   // 踏序：第 y 緯踩第 tr[y] 支踏板
  wc: Int8Array(EN),   // 經紗色序（染缸索引）
  fc: Int8Array(PK)    // 緯紗色序
};
```

### 5.2 編譯（整個引擎只有這一行是真理）

```js
function up(D,x,y){ return (D.tu[ D.tr[y] ] >> D.th[x]) & 1; }
```

`up=1` 表示該交叉點經紗浮在上面，畫經紗色；`up=0` 畫緯紗色。**所有畫面都從這一行長出來。**

### 5.3 逐紗渲染（讓它像布，不像棋盤）

關鍵在於「浮在上面的那根紗要壓過鄰居」。畫矩形時，把覆蓋方向的長度多畫 1.2px，並加兩道細線做圓紗身的高光與陰影：

```js
if(up){ // 經紗浮起：垂直方向多畫一點
  fillRect(px, py-0.6, z, z+1.2);                       // 紗身
  fillRect(px+z*0.24, py-0.6, z*0.18, z+1.2, 亮色);      // 高光偏左
  fillRect(px+z-z*0.16, py-0.6, z*0.16, z+1.2, 暗色);    // 右緣陰影
}else{ // 緯紗浮起：水平方向多畫一點，高光在上緣
  fillRect(px-0.6, py, z+1.2, z);
  fillRect(px-0.6, py+z*0.24, z+1.2, z*0.18, 亮色);
  fillRect(px-0.6, py+z-z*0.16, z+1.2, z*0.16, 暗色);
}
```

每個染料色需備三階：`hex` 紗身、`lt` 高光、`dk` 陰影。z（每格像素）建議 4–10；小於 4 高光會消失，大於 12 開始像磁磚。

### 5.4 用組織畫圖（插畫技法 interlacement-weave）

母題寫成 16×16 的字元陣列，四階：`#` 最亮、`+` 中、`.` 暗、空白 透明。每一階指派一種**真實組織**，明暗由該組織的浮長自然產生：

```js
if(l===3) return {u:((x*5+y*3)%8)!==0, a:黃檗, b:生成};  // 八枚經緞 → 7/8 生成浮起 → 最亮
if(l===2) return {u:((x+y)%4)<2,       a:紫根, b:黃檗};  // 四上四下斜紋 → 中間調
if(l===1) return {u:((x+y)%2)===0,     a:墨紫, b:紫根};  // 平紋 → 最暗但仍有顆粒
```

三階必須在明度上**單調遞減**，否則圖會變成雜訊。這是最容易做錯的一步。

### 5.5 結構驗證（讓工具會回話）

把使用者的程式當程式檢查，錯誤訊息用該行業的口氣寫，不要用「Error」：

- **浮長**：逐欄／逐列在環狀（modulo）意義下找最長連續同態長度。≥9 即警告。
- **交織率**：上下左右相鄰交叉點狀態改變的次數 ÷ `2·EN·PK`。平紋＝1.0（最高），八枚緞≈0.25。這個值同時決定布身（>0.62 緊實／>0.34 適中／否則鬆軟）與織縮率（`3.2 + ratio·9.5` %）。
- **不織經紗**：某欄 32 緯全浮或全沉 → 那根紗根本沒進布裡。
- **閒置綜框**：某片綜框被穿了紗卻從未被任何踏板提起。

### 5.6 序列化

把五張表直接印成人看得懂的字串，不要 base64：

```
W8-<32 個 0–7 穿綜>-<16 個 hex 綁踏>-<32 個 0–7 踏序>-<32 個 0–3 經色>-<32 個 0–3 緯色>
```

正則逐段驗證後才 decode。可放進 `?d=` 分享、也可直接印在單據上。

### 5.7 降級

`prefers-reduced-motion` 下不需要停用任何功能——本引擎沒有自動播放的動畫，只在使用者操作時重繪一次，把 CSS 過渡壓到 0.001ms 即可。無 JS 時所有文案為靜態 HTML，另以 `<noscript>` 補上電話與價目。

## 六、元件配方

### 導覽（card-chain 紋版鏈）

不用置頂列。左下角固定一個「讀卡口」按鈕（`position:fixed;left:16px;bottom:16px`），顯示目前頁名與一張穿孔卡圖示；點擊向上扇出四張卡片，每張輕微旋轉 `-2deg ~ 1.4deg` 並各自 `translateX(4/12/20/28px)` 造出鏈條的錯位感。

```css
.chain-fan{opacity:0;pointer-events:none;transform:translateY(10px);transition:.18s ease}
.chain[data-open="1"] .chain-fan{opacity:1;pointer-events:auto;transform:none}
.card{border:2px solid var(--sumi);box-shadow:3px 3px 0 var(--ube-dd);min-width:200px}
.card[aria-current="page"]{background:var(--ube-dd);color:var(--nama);border-color:var(--kiha)}
```

按鈕需 `aria-expanded` / `aria-controls`；Esc 與點擊外部關閉；行動版拉成滿寬並取消旋轉。頁尾必須另備完整連結列作為保底。

### 按鈕

```css
.btn{font-family:mono;font-size:11px;letter-spacing:.12em;text-transform:uppercase;
     background:var(--nama);color:var(--sumi);border:2px solid var(--sumi);
     padding:8px 14px;box-shadow:3px 3px 0 var(--ube-dd)}
.btn:hover{background:var(--kiha)}
.btn.ghost{background:transparent;color:var(--nama);border-color:var(--nama);box-shadow:none}
```

`hover` **不做位移**（按壓硬陰影是已過載語彙），只換底色。

### 區塊（slab）

`background:var(--ube-d); border:2px solid var(--nama); padding:18px 20px;` 開頭必接一個 `.lab` 小標籤。`.slab.dark` 換成最深底，用於讀數與結果。

### 表格

`border-collapse:collapse`，格線 1px `rgba(紙色,.22)`；`th` 用 mono 9.5px 大寫強調色、`font-weight:400`；數值欄 `td.n` 靠右 mono 不換行。表格是本風格的主力排版工具，能用表格就不要用卡片牆。

### 表單

輸入框：紙色底、墨色 2px 框、mono 13px、`width:100%`。每個欄位下方固定保留一行 `.err`（`min-height:1em`）避免驗證訊息造成跳版。焦點環一律 `outline:3px solid var(--kiha); outline-offset:2px`。

### 頁尾

最深底、上緣 2px 紙色線、三欄（1.4fr / 1fr / 1fr）：品牌與地址電話／完整連結／本站說明。底部一行 mono 10px 版權與「內容為虛構示意」。

## 七、動效規則

本風格的動效**刻意稀少**——布不會自己動。

| 動作 | 觸發 | duration / easing |
|---|---|---|
| 導覽卡鏈扇出 | 點擊讀卡口 | 180ms ease（opacity + translateY 10px） |
| 讀卡口箭頭翻轉 | 同上 | 180ms ease（rotate 180deg） |
| 按鈕／連結換色 | hover、focus | 瞬時，無過渡 |
| 量表寬度變化 | 數值更新 | 120ms linear |
| 畫布重繪 | 使用者操作 | 立即，單次，無補間 |

明確禁止：跑馬燈、揭示進場、數字滾動計數、`stroke-dashoffset` 描繪、按壓位移、視差捲動、自動輪播。畫面的「活」要來自互動結果的改變，不是來自動畫。

## 八、插畫與圖像風格

只有一種技法：**interlacement-weave 交織織紋**（見 §5.4）。母題限定為與該產業有關的實體物件，畫成 16×16 三階遮罩，輪廓要粗、細節要捨——16 格放不下的東西就換母題。所有插圖以 `<canvas>` 產生，外框 1px 分隔線，背景填最深色。

嚴禁：外部圖片、emoji 當圖標、細線幾何線描、圓角插畫、任何漸層。

## 九、Logo 與 Favicon

**Logo**：一個正方形的交織塊，用二上二下斜紋規則程序生成（`up = (x%4) ∈ {t, t+1} where t = y%4`），經紗紫根、緯紗黃檗、底墨紫、外框 2px 紙色。96×96、每格 12px（8×8 格）。標誌本身就是一小塊布，這是本風格的核心宣言，不要加字。

**Favicon**：同一段程式輸出 32×32（每格 4px），去掉外框，寫成 inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=...%3E">
```

用同一支函式輸出兩種尺寸，確保標誌與 favicon 永遠一致。

## 十、Do & Don't

**Do**

- 先鋪 12/96px 雙層格線，再放任何東西
- 每個區塊開頭都給一個 mono 大寫小標籤
- 用表格承載資料，數字一律 mono 靠右
- 讓工具會回話：驗證訊息用行業口吻寫（「那不是布，是掛在框上的線。」）
- 文案從產業本身長出來：整經、穿綜、穿筘、投梭、打緯、下機、驗布、浮長、經密、織縮率
- 所有圖像都用引擎織出來，包括 logo

**Don't**

- 不要紫藍漸層 hero、不要置中大標＋兩顆按鈕＋三張圓角卡
- 不要圓角、不要模糊陰影、不要漸層（布沒有漸層）
- 不要 emoji 當圖標、不要外部圖片
- 不要 Lorem ipsum、不要「在當今快節奏的世界」、不要「EST. 19xx」徽章、不要「把 X 變成 Y」句式
- 不要跑馬燈或自動動畫
- 不要把地色調成近黑（那是另一個風格家族）
- 不要在三階明暗遮罩上讓明度非單調——圖會變雜訊

## 十一、頁面骨架範例

```html
<div class="spec">
  <div><b>品號</b>XX-01</div>
  <div><b>規格</b>32 × 32</div>
  <div><b>營業</b>週二–週六 10:00–18:00</div>
</div>

<main id="main">
  <section class="wrap bench">
    <h1>一句從產業長出來的話。<br>不要是標語。</h1>
    <p class="lede">兩三句把使用者要做的事講完，帶入行話並解釋它。</p>

    <div class="loomscroll">
      <div class="loom">
        <div class="lg"><span class="glab">表一 TABLE A</span><canvas tabindex="0"></canvas></div>
        <div class="lg"><span class="glab">表二 TABLE B</span><canvas tabindex="0"></canvas></div>
      </div>
    </div>
  </section>

  <section class="wrap facts">
    <div class="slab dark">
      <span class="lab">讀數 READOUT</span>
      <table><tbody>
        <tr><th>項目</th><td class="n">數值</td></tr>
      </tbody></table>
    </div>
    <div class="slab">
      <span class="lab">代碼 CODE</span>
      <label class="f"><input type="text"></label>
      <div class="btnrow"><button class="btn">載入</button><button class="btn ghost">複製</button></div>
      <span class="err" role="status"></span>
    </div>
  </section>
</main>

<nav class="chain" data-open="0" aria-label="紋版鏈導覽">
  <ul class="chain-fan"><li><a class="card" href="#">…</a></li></ul>
  <button class="reader" aria-expanded="false" aria-controls="chainFan">…</button>
</nav>
```

版面骨架永遠是：**規格條 → 可操作的工作台 → 讀數與代碼 → 結果 → 說明**。沒有 hero。
