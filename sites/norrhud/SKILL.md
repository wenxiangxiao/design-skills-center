---
name: nordic-quiet
description: Nordic Quiet — a light, airy Scandinavian-minimal language of bone-white space, hairline rules, restrained sage and clay accents, a Fraunces-serif + Jost-sans pairing, and gentle fade-in reveals.
---

# 北歐簡約・靜（Nordic Quiet）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「保養品牌」這個題材。Norrhud 諾赫只是它的一次示範，同一套語言可換成陶藝、選物店、獨立咖啡、建築事務所、瑜伽、書店、家具、旅宿等任何需要「安靜、克制、有質感留白」的品牌。

---

## 一、設計哲學

北歐簡約不是「東西很少」，而是「每一樣都有存在的理由」。它的力量來自留白、來自克制、來自對材質與光的信任。三個不可動搖的原則：

1. **留白是主角**：負空間不是背景，是內容。大量的呼吸感讓少數的元素顯得珍貴。版面要「敢空」——寧可一頁只放三件事，也不要塞滿。
2. **髮絲線代替色塊與陰影**：分區靠 1px 的細線與充足間距，不靠邊框、卡片陰影或色塊對比。整體是平的、輕的、透氣的。
3. **克制的色，安靜的動**：色彩幾乎全是自然的中性色，植物綠與暖陶色只作極少量的點綴。動效只有溫柔的淡入，不彈跳、不滑動橫幅。

情緒是「安靜、清冷、有餘裕、可信賴」。與日式極簡（wabi-sabi）的差異要拉開：**日式偏侘寂、材質更粗樸、留白帶禪意的不對稱；北歐簡約更幾何、更明亮、字體更現代（幾何無襯線＋當代襯線），暖度來自羊毛與木頭而非苔石。** 做這個風格時如果畫面變重、變滿、出現強對比色塊或陰影卡，就是跑錯棚了。

## 二、色彩系統

全站是**低彩度的自然中性色階**，植物綠與暖陶只作訊號級點綴。切忌高彩、切忌純白冷光、切忌深色大色塊。

| 色票 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 骨白 Bone | `#F3F0EA` | 頁面主底、footer、favicon 底 | 60% |
| 雪白 Snow | `#FBFAF7` | 抬升卡片、輸入框底、微對比 | 14% |
| 墨 Ink | `#23241F` | 文字、logo 線、主要線稿（非純黑，帶暖） | 14% |
| 石灰 Stone | `#8C8A82` | 次要文字、標籤、拉丁學名 | 6% |
| 鼠尾草綠 Sage | `#9FAE96` | 植物點綴、強調字、hover、selection 底 | 3% |
| 陶土 Clay | `#C9B8A5` | 暖中性點綴、第二植物色 | 2% |
| 髮絲線 Line | `#DED9CF` | 1px 分隔線、表格列線、卡片邊 | 1% |

規則：

- **不用純白 `#FFF` 當大底**：純白偏冷偏數位；骨白 `#F3F0EA` 帶暖與紙感，是北歐簡約的體溫。雪白 `#FBFAF7` 只在需要一點抬升時用。
- **綠與陶是耳語不是招牌**：sage / clay 合計不超過 5% 面積，只點在強調字、hover、植物線稿、selection。一旦大面積上色，就失去了「靜」。
- **嚴禁任何漸層**，尤其紫藍漸層 hero。層次靠留白與 1px 髮絲線，不靠陰影（陰影最多 `0 1px 0 var(--line)` 的極淡分隔，不要模糊大陰影）。
- 內文可用比 ink 稍淺的 `#40403a`／`#4a4a44` 增加閱讀柔和度。

## 三、字體系統

三族分工：**當代襯線做標題與品名 / 幾何無襯線做 UI 與標籤 / 黑體中文做內文**。

- **襯線 Fraunces**（Google Fonts，opsz 光學尺寸，weights 300/400，含 italic）：柔軟的當代襯線，用於 h1/h2、產品名（常配 italic 副詞）、引言。它的高對比與軟襯線給予「文學感的溫度」。
- **無襯線 Jost**（300/400/500）：幾何人文無襯線，用於導覽、eyebrow 標籤、按鈕、拉丁學名、價格容量。全大寫＋字距 +0.24em~0.34em 做小標籤。
- **中文 Noto Sans TC**（300/400/500，偏 light）：內文與中文標題。字重要輕（300/400），行高放大到 1.85–1.95，讓中文也有留白感。避免用黑體 700 以上做內文（會變重）。

字級 scale（桌機）：

| 角色 | font-size | 字重／行高 | 家族 |
| --- | --- | --- | --- |
| Hero h1 | clamp(40px, 6vw, 72px) | Fraunces 300 / 1.12 | 襯線（可換行、含 italic 副句） |
| Section h2 | clamp(26px, 3.4vw, 40px) | Fraunces 300–400 / 1.15 | 襯線 |
| 產品名 pn | 20–23px | Fraunces 400 / 1.3 | 襯線 |
| 內文 lede | 16–17px | Noto Sans TC 300 / 1.9 | 黑體 |
| eyebrow 標籤 | 11px | Jost 400 / 1 · 字距 +0.34em · 大寫 | 無襯線 |
| 價格容量／學名 | 12–13px | Jost 400 · 字距 +0.1em | 無襯線 |

## 四、版面與網格

- **非對稱 editorial，不置中**：hero 用不等寬雙欄（如文字 `1.1fr` ＋ 線稿 figure `0.9fr`），標題靠左、大量右側或上下留白。`sec-head` 常是「左標題／右一句小注（`.num`）」的兩端對齊。
- **`.wrap` 最大寬約 1120px**；長段落用 `.wrap-narrow`（≤760px）維持舒適行寬（50–60 字元）。
- **區塊留白大**：`.sec` 上下 padding clamp(56px, 9vw, 104px)。段落之間、元件之間都留足空氣。
- **髮絲線系統**：區塊之間用 `<hr class="rule">`（1px `--line`）分隔；列表（成分索引、產品列、原則）用 `border-top:1px solid var(--line)` 逐列分隔，首尾補線。這是本風格的分區語言，取代卡片與色塊。
- **黏性半透明導覽**：masthead 用 `rgba(243,240,234,.86)` ＋ `backdrop-filter: blur(8px)`，底部 1px 髮絲線，滾動時內容從線下透出。

## 五、元件配方

**nav（masthead）**：`position:sticky; top:0`，半透明骨白＋模糊＋底部 1px 線。左＝小尺寸線稿 mark（雲杉／地平線）＋ Jost 大寫字標＋中文小副標；中/右＝Jost 大寫導覽連結，當前頁用 `aria-current="page"`（加細底線或 sage 色）。≤720px 收成線稿漢堡鈕，JS 切 `.open` 展開。

```css
.mast{position:sticky;top:0;z-index:60;background:rgba(243,240,234,.86);
  backdrop-filter:saturate(1.05) blur(8px);border-bottom:1px solid #DED9CF}
```

**按鈕**：極簡。主 CTA 常是「文字＋細箭頭 SVG」的下劃線連結，或 1px `ink` 邊框的透明鈕（無填色、無圓角或極小圓角 2px）；hover 時底線延展或邊框轉 sage。**禁止**膠囊填色鈕與模糊陰影。

**卡片 `.pcard`／`.source-card`**：骨白或雪白底、**只用 1px 髮絲線邊**（`.source-grid` 以 `gap:1px` + 背景色做出細線分格）、無圓角或極小圓角、無陰影。內含原創瓶身／植物線稿 SVG、Fraunces 品名、Jost 小標、輕內文。留白要大方（padding 30–34px）。

**列表列 `.prow`／`.ing-row`／`.values li`**：`border-top:1px solid var(--line)`，充足上下 padding（20–36px）。這是承載資訊的主力版面，取代「三張圓角卡」。

**表單**：輸入框雪白底、1px 髮絲線、Jost/黑體 light 字；focus 時邊框轉 sage，無粗外光。label 用 Jost 大寫小字。

**footer**：骨白底、上緣 1px 線、多欄（品牌一句／頁面／概念店）；底部 `.foot-base` 一列小字（版權＋`Made in small batches · Taipei`）。

## 六、動效規則

動效只有一種語氣：**溫柔的淡入上移**。短、慢、無彈跳。全部在 `@media (prefers-reduced-motion: reduce)` 下直接顯示終態。

| 動畫 | 觸發 | duration | easing | 說明 |
| --- | --- | --- | --- | --- |
| `.reveal` 進場 | IntersectionObserver 進入視窗（threshold .12、rootMargin 下緣 -8%） | 700–900ms | `ease` / `cubic-bezier(.2,.6,.2,1)` | opacity 0→1、translateY 16px→0；可用 `.d1/.d2` 加 80–160ms 階梯延遲 |
| 成分索引揭示 | `.ing-row:hover` / `:focus-within` | 500ms | ease | `max-height` 0→90px、opacity 0→1，把產地說明溫柔展開（非彈出） |
| 導覽展開 | 點漢堡 | 300ms | ease | 直向選單 opacity / max-height |

**成分索引 hover-reveal** 是本站的識別互動（別站沒有）：一列列學名清單，游標停留才緩緩展開它的產地故事——安靜、需要好奇心去觸發。`.reveal` 的 JS 骨架：

```js
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce||!('IntersectionObserver'in window)){
  document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in');});
}else{
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  });},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(e){io.observe(e);});
}
```

**禁止跑馬燈／ticker**：全館此手法已過度使用，且與「靜」的氣質相衝。用進場淡入與 hover 揭示承擔動態。

## 七、插畫與圖像風格

- **一律極細單線 SVG**：植物（雲杉針葉、樺葉、沙棘漿果、泥炭紋）與瓶身都用 1.1–1.4 stroke-width 的線稿，`fill:none`、`round` 端點。ink 畫瓶身輪廓，sage/clay 畫植物細節。
- **瓶身作為主圖**：產品以簡約瓶身線稿呈現，內含一小株對應成分的植物線。留白包圍，不加底色。
- **不用照片、不用 emoji**。所有 icon（箭頭、漢堡、植物）自繪 SVG。
- 質地感來自「紙白＋細線＋大留白」，不是材質貼圖。

## 八、Logo 與 Favicon 設計指南

- **Logo**：一株極簡的雲杉／針葉線（中軸＋對稱斜枝）加一條 sage 色的地平線，配 Jost 大寫字標 `NORRHUD`。可單色、可縮到極小仍可辨識。象徵「北方的樹與地平線」。
- **Favicon**：inline SVG data URI 寫在 `<head>`。做法＝骨白方底 `#F3F0EA` + ink 雲杉線 + 一條 sage 地平線。範例：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F3F0EA'/%3E%3Cg fill='none' stroke='%2323241F' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='16' y1='6' x2='16' y2='24'/%3E%3Cpath d='M16 8 L12 13 M16 8 L20 13 M16 13 L11 18 M16 13 L21 18 M16 18 L10 23 M16 18 L22 23'/%3E%3C/g%3E%3Cline x1='9' y1='27' x2='23' y2='27' stroke='%239FAE96' stroke-width='1.3' stroke-linecap='round'/%3E%3C/svg%3E">
```

## 九、Do & Don't

**Do**

- 敢留白：一頁少放幾件事，讓每件顯得珍貴
- 用 1px 髮絲線與大間距分區，不用邊框色塊與陰影
- 骨白底＋輕字重＋大行高；綠與陶只作耳語級點綴
- Fraunces 襯線標題／品名 + Jost 無襯線標籤 + Noto Sans TC light 內文
- 動效只有溫柔淡入與 hover 揭示；提供 reduced-motion 降級

**Don't**

- ❌ 紫藍漸層 hero、任何漸層、模糊大陰影卡
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片的 AI 模板
- ❌ emoji 當 icon、rounded-2xl 填色膠囊鈕
- ❌ 純白冷底、高彩度色塊、擁擠版面
- ❌ 跑馬燈／ticker、彈跳滑動等吵雜動效
- ❌ Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）；文案要具體、克制、可信

## 十、頁面骨架範例

```html
<header class="mast">
  <div class="mast-in">
    <a class="brand" href="index.html">
      <svg class="mk" viewBox="0 0 30 34"><g fill="none" stroke="#23241F" stroke-width="1.4"
        stroke-linecap="round" stroke-linejoin="round"><line x1="15" y1="4" x2="15" y2="27"/>
        <path d="M15 7 L10 13 M15 7 L20 13 M15 13 L8 20 M15 13 L22 20 M15 19 L7 27 M15 19 L23 27"/></g>
        <line x1="6" y1="31" x2="24" y2="31" stroke="#9FAE96" stroke-width="1.4" stroke-linecap="round"/></svg>
      <span class="wm"><b>NORRHUD</b><em>北方肌膚</em></span>
    </a>
    <nav class="nav" id="nav">
      <a href="index.html" aria-current="page">首頁</a>
      <a href="ritual.html">保養儀式</a>
      <a href="story.html">品牌</a>
    </nav>
    <button class="menu-btn" id="menuBtn" aria-label="開啟選單" aria-expanded="false">…</button>
  </div>
</header>

<section class="hero">
  <div class="wrap"><div class="hero-grid">
    <div>
      <p class="eyebrow reveal">Nordic Skincare · Est. 2019</p>
      <h1 class="serif reveal">留白<br>是最深的<br><i>滋養。</i></h1>
      <p class="lede reveal">具體、克制、可信的品牌敘述……</p>
    </div>
    <figure class="hero-art reveal"><!-- 原創瓶身／植物線稿 SVG --></figure>
  </div></div>
</section>

<hr class="rule">

<section class="ritual"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Ingredienser</p>
    <h2 class="serif">成分索引</h2></div><span class="num">游標停留，看它從哪裡來</span></div>
  <div class="ing-index">
    <div class="ing-row" tabindex="0"><div class="ing-head">
      <span class="ing-letter serif">G</span><span class="ing-name serif">雲杉 <i>Gran</i></span>
      <span class="ing-lat">Picea abies</span></div>
      <div class="ing-origin">懸停才揭示的產地故事……</div></div>
  </div>
</div></section>

<footer><div class="wrap">…品牌一句／頁面／概念店…
  <div class="foot-base"><span>© 2019–2026 Norrhud</span>
  <span>Made in small batches · Taipei</span></div></div></footer>
```

---

*本 SKILL 為 Design Skills Center 館藏之一，示範站 Norrhud 由 Claude Opus 4.8（排程 Agent 自動執行）建置。風格定義與內容分離，可自由套用於任何產業。*
