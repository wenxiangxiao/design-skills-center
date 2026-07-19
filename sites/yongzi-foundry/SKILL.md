---
name: skeleton-spec
description: A Chinese type-foundry specification aesthetic where every glyph is synthesised live from stroke skeletons and eight parameters, laid out as a working type specimen sheet in lead-grey lilac, ink black and proof red.
---

# 字骨規格書 Skeleton-Spec

## 一、設計哲學

這個風格的前提是一句話：**版面上的字不是排上去的，是鑄出來的。**

一般網站把字體當成素材——選一個字型檔，套上去，結束。字骨規格書反過來：
把字的構造攤在檯面上，讓讀者看見一個字是由哪幾根骨頭撐起來的、
把哪一根加粗會發生什麼事。因此這個風格的版面長得像**字樣單（type specimen）**
與**規格書**的混血：滿是刻度、字身框、參數讀數、逐項對照表，
而所有「插圖」的位置都由字本身佔據。

三條不可違背的原則：

1. **字是主角，不是內容的容器。** 頁面上最大的東西永遠是一個字，不是一句標語。
2. **每個數字都要算得出來。** 灰度、筆寬、字面率不能是形容詞，要是引擎實算的數值。
3. **參數可以被讀者動。** 讀者拖動的不是玩具滑桿，是真的在改寫這個網站的識別。

去AI化的關鍵在於：本風格**沒有 hero**。第一屏就是工作用的字樣單，
沒有「用最好的字，說最重要的話」這種句子。文案是鑄字師講話的樣子：短、乾、不推銷。

## 二、色彩系統

金屬鉛（鉛錫銻合金）是冷灰帶紫的，不是銀色。整套配色從這裡長出來。

| 用途 | 色票 | 比例 | 說明 |
|---|---|---|---|
| 頁面地色 | `#C9C5D4` 鉛灰紫 | ~46% | 冷調中明度淡紫灰，明度 79%／飽和 11%。**不可換成米白紙感** |
| 面板／卡片 | `#DEDBE4` 淺鉛 | ~30% | 所有 `.panel`、表格、字樣框的底 |
| 次級底／工具列 | `#B7B2C6` 深鉛 | ~8% | 側欄、表頭、導覽排字盤 |
| 墨 | `#14131A` 油墨黑 | ~13% | 所有字符、2px 分格線、反白按鈕底 |
| 校紅 | `#D8323C` 校對紅 | ~2.5% | **只用在有語意處**：滑桿把手、疊字上層、極值標示、印記、章節編號 |
| 銻藍 | `#3D4E85` 銻藍 | ~0.5% | 只用於字身格線與輔助刻度（永遠帶 opacity 0.14–0.28） |

規則：

- 校紅是訊號不是裝飾。一屏內出現超過六次就是濫用。
- 銻藍永遠是半透明的格線，不做文字色、不做按鈕色。
- 不使用任何漸層、任何陰影、任何圓角（`border-radius` 全站為 0，唯一例外是圓體字符的 `stroke-linecap:round`）。

## 三、字體系統

**中文字符不使用字型檔**（見第五章引擎配方）。Google Fonts 只負責拉丁、數字與介面文字：

| 角色 | 字體 | 用法 |
|---|---|---|
| 拉丁展示 | `Fraunces` 700 | 品牌拉丁名、`.sh-name` |
| 標籤／數值／代碼 | `Space Mono` 400/700 | 所有 `.lab`、表頭、讀數、編號、鑄體碼。字距 `letter-spacing:.14–.24em`、`text-transform:uppercase`、字級 9–11px |
| 中文內文 | `Noto Sans TC` 400/500/700 | 段落、表格內容、按鈕中文字 |

字級 scale（1.32 倍率，刻意窄）：

```
9  10  11  12.5  13.5  15  19  （px）
標籤 讀數 按鈕 說明  表格  內文 章節標題
```

行高：中文內文 `1.75`–`2.0`（規格書要好讀），標籤 `1.5`，表格 `1.7`。
中文段落寬度上限一律 `max-width:66ch`–`74ch`，絕不滿版跑到 100 字一行。

**章節標題永遠是三件套**：紅色兩位數編號 `01` ／ 中文標題（`letter-spacing:.14em`）／ 右推到底的英文標籤。
下方 2px 實線滿寬。

## 四、版面與網格

- **背景垂直細線**：`repeating-linear-gradient(90deg, rgba(20,19,26,.045) 0 1px, transparent 1px 48px)`，48px 一道，模擬字盤格。
- **邊框語言**：外框 2px 實線；內部分隔 1px `rgba(20,19,26,.28)`；虛線只用於字身框（`stroke-dasharray:8 6`）。
- **不對稱**：主要區塊一律「大操作區 + 窄工具欄」，比例 `1fr / 300–316px`，工具欄底色下沉一階（深鉛）。**不要對半分。**
- **字樣舞台**：40px 方格背景 + 一條紅色中線（`opacity .45`），字置中，四角落標註「字身框 1000／字面 860／中線」。
- **字符盤**：`grid-template-columns:repeat(10,1fr)`，每格 `aspect-ratio:1/1`，格線 2px 實線，左上角小號流水編號。缺字格用 45° 斜條紋填充。
- **字級階梯（waterfall）**：一列一個字級，左側固定寬 56px 的 `92 pt` 標籤，右側同一串字由大到小，列間虛線分隔。
- 行動版斷點：940px（雙欄轉單欄）、620px（導覽鉛字翻正、標籤縮小）、520px（字符盤 10→4 欄）。

## 五、核心配方：字骨合成引擎（本風格的首創技術）

這是本風格與「看起來像規格書」的裝飾風之間的分界線。沒有這支引擎就只是換皮。

### 5.1 骨架格式

一個字 = 一組筆畫字串陣列。座標系 1000×1000 為字身框，字面約 860（四邊各留 70）。

```
"永":["p|485,95 525,195",          // p 點
      "h|280,290 545,290",          // h 橫
      "z|500,290 500,780 400,855",  // z 折（多轉折點的 polyline）
      "z|340,300 275,470 150,785",
      "z|505,440 665,360 850,800"]
```

筆型五種：`h` 橫、`v` 豎、`d` 撇捺、`p` 點、`z` 折。
**筆型不只是分類，它決定筆寬**——這是中文字對比的來源。

### 5.2 八參數

```js
P = { w, c, x, e, s, g, k, j }
// w 豎筆寬 26–190   c 橫豎對比 0–0.8   x 字面率 .78–1.10   g 中宮 .86–1.14
// s 襯線量 0–1      k 傾斜 ±12°        e 筆端 0平切/1圓收   j 轉角 0方/1圓
function stkW(t,P){
  if(t==="h") return Math.max(5, P.w*(1-P.c*0.78));      // 橫最細
  if(t==="d"||t==="p") return Math.max(5, P.w*(1-P.c*0.34)); // 斜筆居中
  return P.w;                                             // 豎最粗
}
function xf(p,P){ return [(p[0]-500)*P.g*P.x+500, (p[1]-500)*P.g+500]; }
```

### 5.3 渲染

每筆畫 → 一條 `<path>`，用 **stroke 而非輪廓**：

```js
'<path d="M'+pts.join("L")+'" fill="none" stroke="'+color+
'" stroke-width="'+w+'" stroke-linecap="'+(P.e>.5?"round":"butt")+
'" stroke-linejoin="'+(P.j>.5?"round":"miter")+'"/>'
```

**襯線（明體感）另外疊 polygon**，不要試圖用 stroke 做：
`s>0.02` 時，對每條 `h` 筆畫的起點加逆入三角（高 `w*(0.85+2.30*s)`、寬 `P.w*(0.34+0.62*s)`），
終點加頓角三角；對每條 `v` 筆畫的起點加左右突起。傾斜用外層 `<g transform="skewX(-k)">`。

`viewBox="-50 -50 1100 1100"`（留出襯線與粗筆的溢出）。

### 5.4 灰度實算（本風格所有數值的來源）

```js
function inkCover(ch,P){                      // 覆蓋率 = Σ(筆長 × 筆寬) ÷ 字面積
  let area=0;
  parseG(ch).forEach(st=>{ const w=stkW(st.t,P);
    for(let i=0;i<st.pts.length-1;i++){
      const a=xf(st.pts[i],P), b=xf(st.pts[i+1],P);
      area += Math.hypot(b[0]-a[0], b[1]-a[1]) * w; }});
  return Math.min(0.99, area/(860*860));
}
```

以「永東字口人」五字平均分級：`<14% W1 特細／<20% W2 細／<27% W3 書／<34% W5 中／<46% W7 粗／else W9 特粗`。
（此值會重複計入筆畫交疊處，是相對指標而非物理墨量——**在頁面上要誠實標明這一點**。）

### 5.5 識別接管（本風格的靈魂）

引擎鑄出來的字必須拿去做**四件事以上**，否則它只是一個 demo widget：

1. 頁首 logo（`永`＋`石` 兩字，34px）
2. 導覽鉛字（四枚，30px，`data-ch` 屬性驅動）
3. favicon —— 即時組 SVG data URI 換 `<link id="fav">` 的 `href`：
   ```js
   const svg = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-50 -50 1100 1100'>"
     + "<rect x='-50' y='-50' width='1100' height='1100' fill='%2314131A'/>"
     + glyphSVG("永", P, "%23DEDBE4") + "</svg>";   // 顏色一律先寫成 %23 形式
   ```
4. 內容區的所有字樣、比較樣張、使用者補鑄的字

狀態以 `sessionStorage`（鍵 `yz.house` = `{p:"9600-10-100-0-0-102-0-0", n:"永石黑體"}`）跨頁生效，
並支援 `?f=` 參數覆蓋。參數碼 = 八個值各 ×100 取整、以 `-` 串接，**載入前必做範圍驗證**再套用。

## 六、元件配方

### 導覽：mirror-slug 排字盤

```
position:fixed; bottom:0; 背景深鉛; border-top:2px solid 墨
每項 = <a class="slug"> ─ .body（淺鉛底、2px 框、border-bottom-width:6px）
                        └ 字符 transform:scaleX(-1)   ← 預設鏡像
                        ─ .cap 正體中文 + 英文小標
hover / focus-visible / aria-current="page":
  .gl → scaleX(1)（.22s cubic-bezier(.2,.7,.3,1)）
  .body → 反白（墨底淺鉛字）、border-bottom-width:6px→2px、translateY(4px)  ← 壓印
```

**無障礙硬規則**：鏡像只是視覺，`aria-label` 必須是正字，`.cap` 恆顯示正體標籤，
`≤620px` 直接取消鏡像，頁尾必備完整連結列。**破格不等於難用。**

### 按鈕

`font-family: Space Mono; font-size:11px; letter-spacing:.16em; text-transform:uppercase;`
淺鉛底、2px 墨框、無圓角、`padding:9px 15px`。hover = **整塊反白**（背景轉墨、字轉淺鉛），
`transition:background .13s, color .13s`。**不做位移、不做陰影、不做縮放。**
選中態 `.on` = 反白常駐。工具列上的一排按鈕用 `margin-left:-1px` 讓邊框共用。

### 表單

`input/select`：底 `#F0EEF4`、2px 墨框、`Space Mono` 12px。
`:focus-visible` 一律 `outline:3px solid 校紅; outline-offset:1px`。
錯誤訊息用 `Space Mono` 10.5px 校紅，佔位 `min-height:15px` 避免版面跳動。
驗證訊息要有**具體指引**（「手機請填 09 開頭共十碼」），不是「格式錯誤」。

### 表格（本風格的主力元件）

`border-collapse:collapse`，格線 1px `rgba(20,19,26,.32)`，
表頭深鉛底 + `Space Mono` 10px uppercase + `font-weight:400`（表頭不加粗，靠底色分層）。
數值欄 `text-align:right` + `Space Mono`。比較表中的極值：最大值 `color:校紅;font-weight:700`，最小值 `color:銻藍`。

### 滑桿

軌道 4px 墨實心；把手 12×20px 校紅方塊 + 2px 墨框、**無圓角**、`cursor:ew-resize`。
必須同時寫 `::-webkit-slider-thumb` 與 `::-moz-range-thumb`（後者要 `border-radius:0`）。

### Footer

2px 上框，三欄（`1.4fr 1fr 1fr`）：聯絡資訊／頁面索引／產品清單。
最後一段 `Space Mono` 10px 灰色細註，說明技術實作與虛構聲明。

## 七、動效規則

本風格的動效預算極小，因為**主要的動態是字形本身在變**。

| 觸發 | 效果 | duration / easing |
|---|---|---|
| 拖動參數桿 | 全站字符即時重繪 | **無過渡**（0ms，同步重繪即是回饋） |
| 按鈕 hover | 整塊反白 | `.13s ease` |
| 導覽鉛字 hover/focus | 鏡像翻正 | `.22s cubic-bezier(.2,.7,.3,1)` |
| 導覽鉛字壓印 | `translateY(4px)` + 下框 6px→2px | `.16s ease` |
| 分頁／模式切換 | 無過渡（瞬間切換＝對焦） | — |

**禁止**：淡入揭示進場、數字計數滾動、按壓硬陰影位移、`stroke-dashoffset` 描繪、跑馬燈。
（前四項在本館已過載；跑馬燈與本風格的靜態規格書性格衝突。）

`prefers-reduced-motion:reduce` → `*{transition-duration:.001ms!important;animation-duration:.001ms!important}`。
因為本風格沒有自動播放的動畫，**降級後不會有任何功能消失**——這是設計目標，不是巧合。

## 八、插畫與圖像風格：stroke-skeleton 筆畫骨架製圖

**本風格禁止使用任何傳統插圖。** 站上的所有圖像都必須是字，或字的構造：

- 需要「圖」的地方，放一個超大字符（150–300px）配字身格線與讀數。
- 需要「圖示」的地方，放一枚該功能的代表字（永／比／刀／印）。
- 需要「裝飾」的地方，什麼都不放，改放刻度或表格。
- 印記／條碼類：以 FNV-1a 雜湊決定方框四邊的刻痕位置與長度，中央嵌一枚引擎鑄出的字。

零外部圖片、零音檔。字身格線、米字格、字面框都是 `<line>`／`<rect>`。

## 九、Logo 與 Favicon

**Logo** = 兩枚引擎鑄出的字 + 1px 直分隔線 + 拉丁名（Fraunces 700）+ 副標（Space Mono 大字距）
+ 一行校紅小標。外框 4px 實線矩形，內縮 16px。整體橫式 640×200。
**Logo 必須跟著現行參數改變**——這是本風格的識別方式：logo 不是固定資產。

**Favicon** = 墨黑滿版方塊 + 淺鉛色的主字（見 5.5）。
靜態備援（HTML 內寫死的 `<link>` 初始值）用手寫 path 版本，避免 JS 未執行時無圖示。

## 十、Do & Don't

**Do**

- 第一屏就是可操作的工作檯（字樣單）。所有內容都在同一張紙上。
- 每個數字都標明怎麼算出來的，包含它的侷限。
- 文案用行話：字身、字面、中宮、內白、灰度、沖模、開沖、上沖、走版、外框化、字盤、檢字。
- 拒絕與提醒要具體：「16 pt 時最細的橫筆只有 0.62 px——這個尺寸螢幕上會斷。」
- 給每個破格互動準備一個出口（鏡像導覽配正體標籤、繪圖檯配「照範例」按鈕）。

**Don't**

- 不做置中大標＋副標＋兩顆按鈕的 hero。本風格連 hero 這個概念都沒有。
- 不用圓角、陰影、漸層、毛玻璃。
- 不用 emoji 當圖示（本風格連 SVG 圖示都不用，只用字）。
- 不寫「在這個資訊爆炸的時代」「讓文字擁有靈魂」這類句子。鑄字師不這樣講話。
- 不把參數桿做成純裝飾——拖了不改變網站識別，這個風格就失效了。
- 不用米白紙感底色（`#F5F1E8` 一族）。鉛是冷的。

## 十一、頁面骨架範例

```html
<body>
<!-- 檔頭：字樣單抬頭，不是 hero -->
<header class="wrap sheet-head">
  <div class="sh-mark"><span id="shmark"></span>
    <span class="sh-name">品牌中文名<small>LATIN NAME · 城市</small></span></div>
  <div class="sh-meta">
    <div>字樣單<b>SPECIMEN No.07</b></div>
    <div>現行鑄體<b data-house-name>—</b></div>
    <div>鑄體碼<b class="mono" data-house-code>—</b></div>
  </div>
</header>

<main class="wrap">
  <p class="intro">一段把「這一頁就是字體本身」講清楚的引言，左側 3px 校紅豎線。</p>

  <!-- 舞台 + 工具欄：1fr / 316px 不對稱 -->
  <section class="stage">
    <div class="stage-main">
      <div class="stage-bar"><span class="lab">主字樣 · KEY GLYPH</span><span class="stage-tabs"></span></div>
      <div class="stage-box"><div id="bigglyph"></div>
        <div class="grid-note mono"><span>字身框 1000</span><span>字面 860</span><span>中線</span></div></div>
      <div class="readout"><!-- 四格實算讀數 --></div>
    </div>
    <aside class="stage-side">
      <div class="side-h"><span class="lab">鑄字桿 · CASTING LEVERS</span></div>
      <div id="levers"></div>
      <div class="side-act"><button>套用到全站</button><button>回復</button></div>
    </aside>
  </section>

  <!-- 章節標題三件套 -->
  <div class="sec-h"><span class="no">02</span><h2>字級階梯</h2><span class="en">SIZE WATERFALL</span></div>
  <div class="waterfall"></div>
</main>

<!-- 排字盤導覽（JS 生成，四枚鏡像鉛字） -->
<script>buildNav("index.html"); paintIdentity();</script>
</body>
```

---

驗收標準：拿掉配色與字體之後，這個站還剩下什麼？——**剩下一支會鑄字的引擎，
和一個把自己的招牌交給讀者去改的決定。** 如果你套用本 SKILL 做出的新站
只有鉛灰紫和表格，沒有一個能被讀者改寫的東西，那就還沒做完。
