---
name: industrial-foundry
description: Industrial Foundry — a dark charcoal, workshop-grade visual language built from steel borders, hazard stripes, stencil serial numbers, blueprint line-drawings, monospace data readouts, and mechanical load-gauge motion.
---

# 工業風・鑄造工坊（Industrial Foundry）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「登山戶外用品」這個題材。Granit Outfitters 花崗戶外裝備只是它的一次示範，同一套語言可換成工具機、機車改裝、精釀、物流、汽修、營建、硬體新創、健身器材等任何需要「可靠、耐操、工程感」的品牌。

---

## 一、設計哲學

工業風的根不是裝飾，是**機能**。它借用工廠、鑄造車間、工程圖與安全規範的視覺——不是為了復古，而是要傳達「這東西經得起用」。三個不可動搖的原則：

1. **結構外露**：邊框、分格線、鉚釘、序號都不藏。像工廠把管線與鋼樑露在外面一樣，介面也把它的骨架露出來——粗邊框、實心分隔、可見的網格。
2. **數據即權威**：規格、承重、公差、標準編號比形容詞更有說服力。用等寬字把數字排成儀表般的讀數（readout），讓「可信」來自量測而非文案。
3. **危險與克制並存**：安全琥珀色（hazard amber）與鏽紅只用在最關鍵處——警示、額定值、CTA。大面積是沉穩的鋼鐵灰。愈克制，那一抹琥珀愈有力量。

情緒是「沉、硬、精確、可靠」。與野獸派（Brutalism）的差異要拉開：**野獸派刻意粗糙、對比刺眼、帶反叛；工業風是收斂而精密的——它像一張工程圖，不吼叫，只是把規格攤開讓你信服。** 做這個風格時如果畫面變得花俏、圓潤或輕盈，就是跑錯棚了。

## 二、色彩系統

主體是**深色鋼鐵灰階**，靠一抹安全琥珀撐起重點。切忌讓琥珀大面積氾濫，也切忌引入高彩度雜色。

| 色票 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 鋼黑 Steel | `#17181A` | 主背景、footer 底、favicon 底 | 52% |
| 鐵灰 Iron | `#212327` | 區塊底、卡片外層、資訊面板 | 22% |
| 水泥 Concrete | `#2E3136` | 抬升卡片、表格底、hover 底 | 10% |
| 蒸氣白 Steam | `#E6E4DF` | 主要文字、標題、線稿主色 | 8% |
| 安全琥珀 Hazard | `#F2B705` | 重點字、CTA、額定值、危險條紋、線稿重音 | 5% |
| 鏽紅 Rust | `#C4491F` | 警示、超載、次要重音、線稿受力點 | 2% |
| 冷灰 Grey | `#9AA0A6` | 次要標籤、mono 說明、線稿輔線 | — |

分隔線 hairline 用 `#3A3D42`。規則：

- **深色是地基**：整站以 `#17181A`／`#212327` 為底，白字在上。不要出現大面積純白背景區塊（那會瞬間破壞工坊感）。
- **琥珀是訊號燈不是塗料**：只給「需要被看見」的東西——CTA、額定數字、危險條紋、`on` 導覽態。一個畫面裡琥珀面積若超過一成，就過頭了。
- **嚴禁任何漸層**，尤其紫藍漸層 hero。要層次時用實色鋼灰的深淺 + 粗邊框 + 危險條紋，不用柔和陰影。
- 鏽紅只在「警示語意」出現（超載量表、警告標、受力點），不當裝飾色亂灑。

## 三、字體系統

三族分工明確：**壓縮體標題 / 等寬數據 / 黑體中文**。

- **標題 Oswald**（Google Fonts，weights 500/600/700）：壓縮（condensed）無襯線，全大寫、字距 +2~3px。承擔 h1/h2/品牌字。它的窄身與工業標牌、貨櫃噴字同源。
- **數據 Space Mono**（400/700）：等寬。所有數字、序號、規格值、標籤、`//` 註解、價格都用它——等寬讓數字對齊成儀表讀數。
- **中文 Noto Sans TC**（400/500/700/900）：黑體，內文與中文標題。避免明體（襯線會削弱硬度）。

字級 scale（桌機）：

| 角色 | font-size | 字重／行高 | 家族 |
| --- | --- | --- | --- |
| Hero h1 | clamp(40px, 6vw, 76px) | 700 / 1.02 | Oswald + Noto Sans TC 900 |
| Section h2 | clamp(28px, 4vw, 44px) | 700 / 1.05 | Oswald |
| 卡片 h3 | 20–22px | 500–700 / 1.2 | Oswald / Noto Sans TC 700 |
| 內文 lede | 16–18px | 400 / 1.7 | Noto Sans TC |
| 標籤／`//`kk | 11–12px | 700 / 1 · 字距 +2px · 大寫 | Space Mono |
| 規格值／序號 | 12–13px | 400/700 | Space Mono |

標題常搭配 `<em>` 換行副句（斜體或琥珀色），製造壓縮體的兩段節奏。

## 四、版面與網格

- **12 欄心智、實際不對稱**：hero 用 `grid-template-columns: 1.4fr 1fr`，左側大標＋lede，右側是 readout 儀表面板＋藍圖 figure。不要置中。
- **`.wrap` 最大寬 1200–1280px**，左右 gutter 22px。區塊 `.sec` 上下留白 clamp(56px, 8vw, 96px)。
- **危險條紋分隔 `.hazard-div`**：區塊之間用 45° 重複線性漸層的條紋帶（琥珀×鋼黑，高 10–14px）當 separator，取代跑馬燈——它是靜態的招牌識別，不捲動。masthead 頂端也壓一條 4px 細版。
- **可見網格**：卡片外層 2px 實線邊框（`#3A3D42`），四角加「登記括號」`.brk`（L 形角標）強化工程圖感。
- **留白規則**：留白要「規矩」——用等寬的內距（16/22/32）與硬分隔，而不是柔和大留白。資訊密度可以高，但一定要用線與序號分區，讓密而不亂。

## 五、元件配方

**nav（masthead）**：`position:sticky; top:0`，鋼黑底、底部 2px 邊框，頂端 `::before` 一條 4px 危險條紋。品牌區左＝40px 方形 SVG mark（琥珀邊框）＋Oswald 大寫字＋mono 副標。導覽連結 Oswald 大寫、字距 +2px；當前頁 `.on` 加琥珀底線或琥珀字。最右一顆 `.cta`（琥珀實心、黑字）指向型錄。≤720px 收成漢堡鈕（三條 span），JS 切 `.open` 展開直向選單。

```css
.masthead{position:sticky;top:0;z-index:60;background:#17181A;border-bottom:2px solid #3A3D42}
.masthead::before{content:"";display:block;height:4px;
  background:repeating-linear-gradient(45deg,#F2B705 0 14px,#17181A 14px 28px)}
```

**按鈕 `.btn`**：無圓角（或 2px 極小）。主按鈕琥珀底、鋼黑字、Oswald 大寫、內含 → SVG 箭頭；hover 時整塊位移 2px 並加 2px 鋼黑外框（像按下實體開關）。`.ghost` 為透明底＋琥珀邊框＋琥珀字。**禁止**膠囊全圓角與模糊陰影。

**卡片 `.card`（工程藍圖式）**：2px 邊框、直角、四角 `.brk` 括號；頂列 `.serial` 放模板序號（如 `GR-2416-α`）＋分類標；中段 `.draw` 是原創 SVG 線稿（琥珀主線、冷灰輔線、鏽紅受力點）；底部 `.spec` 規格表（`th` 靠左冷灰、`td` 靠右白字，row 用 hairline 分隔）。hover 時邊框轉琥珀、輕微上移 2px。

**表單**：輸入框鋼黑底、1px `#3A3D42` 邊框、mono 字；focus 時邊框轉琥珀、外加 2px 琥珀外光（`outline`）。label 用 mono 大寫小字。

**footer**：鋼黑底，三～四欄（品牌宣言／導覽／工坊資訊）；底部 `.foot-meta` 一列 mono 小字（版權＋`DESIGN SKILLS CENTER · INDUSTRIAL-FOUNDRY`），上緣 1px 分隔。

**資訊面板 `.readout`**：鐵灰底、hairline 分隔的多列 `key / value`，key 用 mono 冷灰大寫、value 白字（額定值用琥珀 `<b>`）。取代「三張圓角卡」承載重點數據。

## 六、動效規則

動效要「機械感」——短、硬、有目的，不飄不彈。全部在 `@media (prefers-reduced-motion: reduce)` 下降級為直接顯示終態。

| 動畫 | 觸發 | duration | easing | 說明 |
| --- | --- | --- | --- | --- |
| LOAD TEST 承重量表 | IntersectionObserver 進入視窗 | 1400ms | `cubic-bezier(.2,.7,.2,1)`（近似 easeOut） | `.g-fill` 由 0 增長至 `target/max` 寬度，`requestAnimationFrame` 同步跳動數字；reduce 時直接設終值 |
| 按鈕 hover | :hover | 120ms | ease-out | translate 2px + 加 2px 外框 |
| 卡片 hover | :hover | 150ms | ease-out | 邊框轉琥珀、上移 2px |
| 導覽展開 | 點漢堡 | 200ms | ease | 直向選單 max-height / opacity |

**承重量表**是本站的識別動效（別站沒有）：捲到「品質保證」區時，數條量表像拉力機加載般填滿到額定值，數字同步遞增；超載款用鏽紅 `.warn`。核心 JS 骨架：

```js
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting) run(e.target); });
},{threshold:.4}).observe(gaugeEl);
function run(g){
  var pct = (g.dataset.target/g.dataset.max)*100;
  if(reduce){ fill.style.width=pct+'%'; num.textContent=g.dataset.target; return; }
  /* requestAnimationFrame 由 0 動到 pct，1400ms，easeOut */
}
```

**禁止跑馬燈／ticker**：全館此手法已過度使用。危險條紋是靜態的，不要讓它捲動。

## 七、插畫與圖像風格

- **一律藍圖線稿**：物件用單線 SVG 畫成工程圖——琥珀 `#F2B705` 為主輪廓（stroke-width 1.5），冷灰 `#9AA0A6` 為輔助尺寸線與內構，鏽紅 `#C4491F` 標受力點／裁切線。`fill:none`、`stroke-linejoin:round`。
- **鉚釘與括號**：用小圓（rivet）與 L 形角標（registration bracket）點綴邊角，強化「這是被組裝出來的」感。
- **模板序號**：每個物件都給一組 `GR-####-α` 式的序號，mono 字，像出廠鋼印。
- **零外部圖片、零 emoji**。所有 icon 自繪 SVG（箭頭、量表、工具）。

## 八、Logo 與 Favicon 設計指南

- **Logo**：一個花崗岩／山形的實心色塊 mark（琥珀）＋Oswald 大寫字標，可加一條內嵌鋼黑三角製造「山中之山」的層次。標牌感、可單色輸出。
- **Favicon**：inline SVG data URI 寫在 `<head>`。做法＝鋼黑方底 `#17181A` + 琥珀三角（山／料堆）+ 內嵌小鋼黑三角。範例：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2317181A'/%3E%3Cpath d='M8 26 L16 6 L24 26 Z' fill='%23F2B705'/%3E%3Cpath d='M12 26 L16 16 L20 26 Z' fill='%2317181A'/%3E%3C/svg%3E">
```

## 九、Do & Don't

**Do**

- 深色鋼灰為底、琥珀只點重點；用數據 readout 建立可信度
- 粗邊框、直角、可見網格、序號、鉚釘、危險條紋
- Oswald 壓縮大寫標題 + Space Mono 數據 + Noto Sans TC 黑體
- 每件物件給規格表與模板序號；線稿一律工程藍圖式
- 動效機械、短促、有目的；提供 reduced-motion 降級

**Don't**

- ❌ 紫藍漸層 hero、任何柔和漸層
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片的 AI 模板
- ❌ emoji 當 icon、圓角 rounded-2xl + 模糊陰影卡
- ❌ 大面積純白背景、粉嫩高彩度雜色
- ❌ 跑馬燈／ticker 捲動帶（改用靜態危險條紋）
- ❌ Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）；數字要具體可信

## 十、頁面骨架範例

```html
<header class="masthead">
  <div class="wrap mast-in">
    <a class="brand" href="index.html">
      <svg class="mk" viewBox="0 0 40 40"><rect width="40" height="40" fill="#17181A"/>
        <path d="M8 32 L20 8 L32 32 Z" fill="#F2B705"/>
        <path d="M14 32 L20 20 L26 32 Z" fill="#17181A"/></svg>
      <span><b>GRANIT</b><span class="sub">OUTFITTERS · 花崗戶外</span></span>
    </a>
    <button class="burger" id="burger" aria-label="開啟選單" aria-expanded="false">
      <span></span><span></span><span></span></button>
    <nav class="nav" id="nav">
      <a href="index.html" class="on">首頁</a>
      <a href="gear.html">裝備</a>
      <a href="workshop.html">工坊</a>
      <a href="gear.html" class="cta">型錄 CATALOG</a>
    </nav>
  </div>
</header>

<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-main">
      <span class="tag">EST. 2014 · TAICHUNG WORKSHOP</span>
      <h1>硬派裝備<em>為極限而鍛</em></h1>
      <p class="lede">具體、可信、有數字的品牌敘述……</p>
      <div class="actions">
        <a class="btn" href="gear.html">檢視型錄 →</a>
        <a class="btn ghost" href="workshop.html">走進工坊</a>
      </div>
    </div>
    <aside class="hero-side">
      <div class="readout">
        <div class="r"><span>LOAD 承重</span><span><b>135 kg</b></span></div>
        <div class="r"><span>TEST STD</span><span>CNS 3902 · EN 12277</span></div>
      </div>
    </aside>
  </div>
</section>

<div class="hazard-div" role="separator" aria-hidden="true"></div>

<footer>
  <div class="wrap foot-in">…導覽／工坊資訊…</div>
  <div class="wrap foot-meta">
    <span>© 2014–2026 GRANIT OUTFITTERS</span>
    <span>DESIGN SKILLS CENTER · INDUSTRIAL-FOUNDRY</span>
  </div>
</footer>
```

---

*本 SKILL 為 Design Skills Center 館藏之一，示範站 Granit Outfitters 由 Claude Opus 4.8（排程 Agent 自動執行）建置。風格定義與內容分離，可自由套用於任何產業。*
