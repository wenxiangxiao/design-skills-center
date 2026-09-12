---
name: midcentury-serigraph-reduction
description: Mid-Century Modern silkscreen style built on minimal-realism shape reduction, a closed five-plate ink palette and visible overprint; every image is an ordered list of plates that can be printed short.
---

# 中世紀現代・網版約減風 Mid-Century Serigraph Reduction

> 這份規格書描述的是 1950–60 年代美國中世紀現代（Mid-Century Modern）平面設計中，以
> **Charley Harper 的「極簡寫實 minimal realism」** 與 **Alexander Girard 的民俗幾何** 為核心的網版印刷分支。
> 它的本體不是配色，是一種**造形方法**：把一個對象拆成盡可能少的封閉幾何形，一形一部位，
> 然後用有限的幾塊透明油墨把它印出來。做這個風格的網站，你要交付的不是「一張好看的插圖」，
> 是一套**能被拆開來檢查的版清單**。

---

## 一、設計哲學

Charley Harper 說他畫鳥不數羽毛，他數**翅膀**。這句話是整個流派的操作指令：

1. **約減先於裝飾。** 動手之前先問「拿掉哪一塊，牠就不再是牠了」。答案就是你的前三塊版。
2. **成本是設計條件，不是限制。** 網版一版一色，多一塊版就多一次開網、一次刮刀、一次晾乾。
   五〇年代的設計師不是「選擇」了平塗與少色，是**印刷帳單**逼出了那個語言。你的網站要把這件事說出來。
3. **顏色不調，只疊。** 色票上只有四到六格；畫面上出現的第七、第八個顏色一律是兩塊透明油墨疊出來的。
4. **不完美是機器留下的簽名。** 套印永遠差一點點。把它保留、甚至放大成互動回饋，不要修掉。
5. **溫暖但不可愛。** 這個流派用暖色、圓形與有機曲線，但它同時是**硬邊、無陰影、無質感**的。
   一旦加上柔和陰影、圓角卡片、漸層或手繪抖線，它立刻變成兒童繪本風或里索風，不再是它。

---

## 二、本風格的 5 個不可省略特徵

> 這五項是「拿掉它就不是這個風格了」的程度。每一項附可直接複製的片段。

### 特徵 1｜幾何約減的具象：一形一部位，零描邊，眼睛永遠是一個實心圓點

對象由**少數封閉幾何原形**組成——圓、半圓、橢圓、三角、楔、迴力鏢弧帶、腎形。
每一塊形狀對應一個解剖部位，形狀之間**不畫輪廓線**、不互相描邊，靠色差分開。
眼睛是整張圖裡唯一的小圓，永遠高於視覺重心。

```svg
<!-- 一隻鳥＝身(橢圓)＋頭(圓)＋喙(楔)＋腳(平頭矩形)＋翼(腎形)＋眼(小圓)。沒有一條 stroke。 -->
<svg viewBox="0 0 100 76" fill="none">
  <ellipse cx="44" cy="42" rx="22" ry="12" transform="rotate(-6 44 42)" fill="#D8A33A"/>
  <path d="M40 54h2.2v15h5.4v2H37.4v-2H40Z" fill="#33261A"/>
  <path d="M48 54h2.2v14.5h5.4v2H45.4v-2H48Z" fill="#33261A"/>
  <ellipse cx="41" cy="41" rx="15" ry="6.6" transform="rotate(-13 41 41)" fill="#1D6F68"/>
  <circle cx="63" cy="30" r="7.2" fill="#D8A33A"/>
  <path d="M69 28.5 L86 31 L69 33.5 Z" fill="#CE4F27"/>
  <circle cx="65.6" cy="28.1" r="1.55" fill="#33261A"/>
</svg>
```

**禁止**：任何 `stroke` 描邊、`stroke-linecap:round`、羽毛紋理、寫實漸層、投影。

### 特徵 2｜一色一版，疊印生出第三色，套印永遠差一點

顏色不是調出來的。每一塊版是一層**獨立的透明油墨**，兩塊疊在一起，紙上就長出新的顏色。
在網頁上，正確作法是**一塊版一張 `<svg>`，在 HTML 層以 `mix-blend-mode:multiply` 疊**
（為什麼不是在 SVG 內部下 blend，見第十一章的相容性查證），並給每塊版一個固定的**套印偏移**。

```css
.fig{position:relative;isolation:isolate;background:#E7DFC6} /* isolation 讓疊印止於這張圖 */
.fig .pl{position:absolute;inset:0;width:100%;height:100%;
         transform:translate(var(--rx),var(--ry));mix-blend-mode:multiply}
.fig .pl.white{mix-blend-mode:normal}   /* 打底白是不透明油墨，不參與疊印 */
/* 五塊版各自的套印誤差，數值刻意不對稱、不歸零 */
.pl-y{--rx:1.3px;--ry:-.9px} .pl-t{--rx:-1.1px;--ry:1.2px}
.pl-o{--rx:.9px;--ry:1px}    .pl-k{--rx:-.5px;--ry:-.6px}
```

疊印色**必須算得出來**（逐通道 `a*b/255`），寫在色票旁邊給人看：
`孔雀綠×芥末=#194718`、`柿橘×芥末=#AE3209`、`柿橘×孔雀綠=#172210`、`胡桃墨×芥末=#2B1806`。

### 特徵 3｜封閉的五塊色票，而且沒有純黑

色票只有五格，**每一格都有職務**，不得為了好看新增第六個色碼。最深的一塊是暖棕墨，不是 `#000`。

```css
:root{
  --wht:#FAF4E4;   /* 打底白：只給「要留白的對象」，不透明，最先印 */
  --field:#D8A33A; /* 芥末：沙、光、暖羽，也是整個頁面的地色 */
  --teal:#1D6F68;  /* 孔雀綠：水、影、量測用的線 */
  --persim:#CE4F27;/* 柿橘：喙、腳、被強調的事、拒絕（≤14%） */
  --ink:#33261A;   /* 胡桃墨：字、輪廓、最後一塊版。永遠最上面 */
  --paper:#E7DFC6; /* 紙：所有長文一律落在紙上，不落在地色上 */
}
```

比例基準：地色 34%、紙 24%、墨 14%、柿橘 13%、孔雀綠 12%、疊印色 ≤3%。
**禁止**：`#000`、`#fff`、灰階中性色、任何漸層、任何 `box-shadow`。

### 特徵 4｜原子時代的次要母題只做節奏，不做主體

星芒（starburst）、迴力鏢（boomerang）、腎形（amoeba）、細棒＋圓球（分子模型）
只出現在**分隔、標題節點、頁尾**，尺寸永遠小於主體的三分之一，且不承載資訊。

```css
/* 標題右側的「一條線＋一顆點」節點——這個流派的段落分隔就長這樣 */
.sechead .node{flex:1;height:0;border-top:1px solid var(--ink);position:relative;top:-4px}
.sechead .node::after{content:"";position:absolute;right:0;top:-4px;
  width:9px;height:9px;border-radius:50%;background:var(--persim)}
```

**禁止**：把星芒放大當背景圖樣鋪滿（那是 Y2K／太空時代，不是這裡）。

### 特徵 5｜硬邊版面：不對稱、零圓角、零陰影、主體被畫布切斷

分格用 **2px 實線**，內部細分用 **1px**。卡片沒有圓角、沒有陰影、沒有間隙陰影。
版面走 1.3 : 1 之類的不整除分割，主體允許被畫布邊緣切斷。

```css
:root{--rule:2px solid var(--ink);--hair:1px solid var(--ink)}
.panel{background:var(--paper);border:var(--rule);padding:22px;border-radius:0;box-shadow:none}
.open{display:grid;grid-template-columns:1.32fr 1fr;border-bottom:var(--rule)}
.open>.plate{border-right:var(--rule)}
button{border:var(--rule);border-radius:0}
button:active{transform:translate(1px,1px)} /* 位移，不是陰影 */
```

**禁止**：`border-radius` > 0、`box-shadow`、`filter:blur`、置中對稱的三欄卡片。

---

## 三、色彩系統

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 芥末 field | `#D8A33A` | 頁面地色、沙、暖羽、光 | ~34% |
| 紙 paper | `#E7DFC6` | 所有面板與長文的底 | ~24% |
| 胡桃墨 ink | `#33261A` | 正文、輪廓、最上面那塊版、頁尾 | ~14% |
| 柿橘 persimmon | `#CE4F27` | 喙、腳、主要動作、錯誤與拒絕 | ≤13% |
| 孔雀綠 teal | `#1D6F68` | 水、影、次要動作、量測線 | ~12% |
| 打底白 white | `#FAF4E4` | 只給要留白的對象；不透明 | ~3% |

疊印色（不得手寫，一律由 multiply 產生）：`#194718`／`#AE3209`／`#172210`／`#2B1806`。

對比實測：墨/紙 11.00、墨/芥末 6.43、白/孔雀綠 5.42、孔雀綠/紙 4.47（僅供 ≥18px 或圖形）、
柿橘/紙 3.30（**只做圖形，不做內文**）。**正文一律墨落在紙上或芥末上。**

---

## 四、字體系統

| 用途 | 字體 | 字重 | 備註 |
|---|---|---|---|
| 拉丁標籤／數字 | **Jost**（Futura 復刻） | 500–700 | `letter-spacing:.16em`，全大寫，`font-variant-numeric:tabular-nums` |
| 中文標題 | **Noto Sans TC** | 900 | `letter-spacing:.04em`，`line-height:1.12` |
| 中文內文 | **Noto Sans TC** | 400/500 | 16px／`line-height:1.72`／`font-feature-settings:"palt" 1` |

字級 scale：`10.5 / 12.5 / 13.5 / 15 / 16 / 17 / 19 / 21 / clamp(21,3vw,30) / 34`。
標題不使用細字重；小標籤一律 `text-transform:uppercase` 的 Jost。
**禁止**：襯線體、手寫體、可變字型的極端寬度軸、系統字堆疊而無字體個性。

---

## 五、版面與網格

- 容器 `max-width:1180px`，左右 22px（≤560px 為 14px）。
- 主要分割走 **1.32fr / 1fr** 或 **1.25fr / 1fr**，避免 50/50。
- 區塊之間用**整條 2px 橫線**斷開（`section{border-bottom:2px solid var(--ink)}`），不用留白斷開。
- 圖框比例固定 `aspect-ratio:100/76`（近似 A2 橫幅的印刷比例）。
- 資訊列表用 `subgrid` 讓跨卡片的每一列坐在同一條軌上（見第十一章）。
- 留白規則：圖框內主體佔 76–86%，四周留 7% 的等邊白；文字區塊最大 62ch。

---

## 六、元件配方

**導覽（版數導覽 plate-ply）**：四個頁面＝四枚同一支引擎輸出的圖標。
未選頁只印 2 塊版（幾乎認不出的色塊），現用頁印滿 5 塊版並放大。
現用態不靠顏色高亮，靠**它比別人印得完整**。

```css
nav.ply{display:flex;flex-wrap:wrap;border:var(--rule);background:var(--paper)}
nav.ply a{display:flex;align-items:center;gap:9px;padding:7px 12px;border-right:var(--hair);text-decoration:none}
nav.ply a[aria-current=page]{background:var(--field)}
nav.ply a[aria-current=page] .ic{width:50px;height:38px} /* 現用頁的圖標更大、版更多 */
```

**按鈕**：2px 墨邊、無圓角、柿橘底白字（主要）或紙底墨字（次要）；`:active` 只位移 1px。

**卡片**：2px 外框；圖在上、資訊列在下，每列 1px 分隔；**沒有陰影、沒有 hover 浮起**。

**表單**：輸入框 2px 墨邊、`#FAF4E4` 底；錯誤訊息柿橘粗體，直接寫出**為什麼被擋下**
（「A 牆只有 12 席，30 人坐不下」），不要寫「輸入無效」。

**頁尾**：整塊翻成墨底紙字，連結用芥末。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 內容 | 參數 |
|---|---|---|
| ambient 環境 | **走版漂移**：五塊版各自以不同週期在 ±1.5px 內漂移，像一台正在跑的印刷機 | 17/19/21/23s `ease-in-out` `alternate` |
| input 輸入 | **推開最上面那塊版**：hover／focus 時最上層油墨位移 3px，露出底下的疊印色 | `90ms linear`（<100ms） |
| transition 轉場 | **刮刀推移**：新內容以 `clip-path:inset(0 100% 0 0)→inset(0)` 掃入 | `480ms steps(6)` |
| signature 簽名 | **加版重印**：塊數改變時，全站每一張圖同一幀重繪，新那塊版硬邊落版 | `260ms steps(4)` |

**一律使用 `steps()`，不要 easing 曲線**——平塗油墨沒有中間態，補間會製造這個風格禁止的中間色。

```css
@keyframes squeegee{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.fig.wiping .pl:last-child{animation:squeegee 260ms steps(4) 1}
@media(prefers-reduced-motion:reduce){
  .fig .pl,.fig.wiping .pl:last-child{animation:none!important}
  .sweep{animation:none!important;clip-path:none!important}
}
```

降級後**資訊零損失**：套印停在靜態偏移、刮刀不掃但內容直接就位、加版仍然換得成。

---

## 八、插畫與圖像風格：版數約減構成（ply-reduction）

全站**不使用任何外部圖片**，也不畫寫實插圖。每一個對象寫成一份**有序的版清單**：

```js
// 一塊 = { p:版號, t:原形, ...幾何 }；陣列順序＝上版順序＝辨識度順序
const 大杓鷸 = [
  {p:Y, t:'ell',  x:44,y:43, rx:23,ry:13, a:-6},      // 1 身
  {p:Y, t:'cir',  x:64,y:30, r:7.6},                  // 2 頭
  {p:K, t:'bill', x:70,y:31, len:27, curve:.55, w:3.1},// 3 喙 ← 拿掉它就不是牠
  {p:K, t:'multi',ds:[腳1,腳2]},                       // 4 腳
  {p:T, t:'bean', x:41,y:42, rx:16,ry:7, a:-13},      // 5 翼
  {p:K, t:'cir',  x:66,y:28, r:1.55},                 // 6 眼
  {p:W, t:'ell',  x:42,y:48, rx:13,ry:4.6}            // 7 腹
];
render(spec, n) // 只印前 n 塊
```

原形只有七種：`ell` 橢圓、`cir` 圓、`half` 半圓、`wedge` 楔、`bar` 平頭桿、
`arc` 弧帶（迴力鏢）、`bean` 腎形，另加 `band` 帶狀曲線（頸）與 `bill` 收尖曲喙。
**判準**：拿掉全部顏色，仍讀得出這個對象是由幾塊、哪幾種原形組成的；而且每一張圖都能倒著播回到 1 塊。

「要留白的對象」（白鳥、白器物）不能靠紙留白——請在牠後面先印一塊**整幅色域**，
再用不透明白畫主體。這是原作的做法，也順便讓 ply 1 變成一塊純色塊，很好看。

---

## 九、Logo 與 Favicon

- Logo＝把品牌的代表對象用**同一支引擎**輸出的 5 塊版圖，不是另外畫的。
  它必須能被降到 2 塊版仍然掛得住（導覽列會這樣用它）。
- Favicon 用 inline SVG data URI 寫在 `<head>`，32×32，**只放三到四塊版**：
  一塊色域、一塊主體、一塊柿橘記號、一顆白眼點。不要放文字。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23D8A33A'/%3E%3Cellipse cx='15' cy='19' rx='10' ry='5' fill='%2333261A'/%3E%3Cpath d='M13 17L21 5L27 8L16 20Z' fill='%231D6F68'/%3E%3Ccircle cx='21' cy='16.5' r='1.7' fill='%23FAF4E4'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先寫版清單再寫 CSS；每一塊版都要說得出它為什麼值得存在。
- 把「成本」寫進介面：多一塊版＝多一次刮刀、多晾多久、多少錢。
- 疊印色印在色票旁邊，讓人知道第三色是疊出來的。
- 讓現用態靠「印得比較完整」表達，而不是靠高亮色塊。
- 正文一律落在紙色面板上；地色上只放標題與圖。

**Don't**

- ❌ 圓角、模糊陰影、漸層、玻璃感、置中三卡片。
- ❌ 純黑 `#000` 與純白 `#fff`；灰階中性色。
- ❌ 任何 `stroke` 描邊的插圖、`stroke-linecap:round`、`stroke-dashoffset` 描繪動畫。
- ❌ `feTurbulence` 手抖濾鏡與半調網點（那是迷幻海報與里索的語彙，會糊掉硬邊）。
- ❌ 螢光粉／螢光綠（那是 Risograph；本流派是不透明水性網版油墨，飽和但不螢光）。
- ❌ 「EST. 19xx」徽章、跑馬燈、數字滾動、淡入式滾動揭示、視差。
- ❌ Lorem ipsum、emoji 當 icon、紫藍漸層。

---

## 十一、技術實作與相容性

> 查證日期 2026-09-08，來源 caniuse／MDN。使用率為 caniuse 依 StatCounter 2026 年 8 月的統計。

### (1) `mix-blend-mode` 疊印 — 一塊版一張 `<svg>`，在 HTML 層混色

**這一條是本規格書最重要的實作陷阱。**
直覺作法是把 `mix-blend-mode:multiply` 下在 SVG 內部的 `<path>` 上——**不要這樣做**。
caniuse `mdn-css_properties_mix-blend-mode_svg_elements` 顯示：
**Safari（含 26.6／27）至今完全不支援在 SVG 元素上混色，全球僅 34.27%**。
Chrome 41+／Firefox 32+／Edge 79+ 支援，Safari 不支援——你的疊印會在所有 iPhone 上失效。

正確作法是把每一塊版做成**一張獨立的 `<svg>` 元素**，在 HTML 層疊起來混色：
caniuse `css-mixblendmode`（Blending of HTML/SVG elements）全球 **96.98%**
（81.31% 完整＋15.67% 部分；Safari 的「部分」正是上述 SVG 內部混色的缺口，不影響本作法）。
這剛好也是**絹印的實際做法**：一塊網版一個顏色，一張一張過紙。

- **fallback**：不支援時各層以正常疊加繪製——最上面那塊版會蓋住下面的，
  圖仍然完整可辨（因為約減後的形狀本來就靠色差分開），只是少了疊印的第三色。
- **必須加 `isolation:isolate`** 在圖框上，否則 multiply 會穿透到頁面地色。
- 不透明白（打底白）那一層必須 `mix-blend-mode:normal`，否則白會被乘暗成 `#E2D5B1`。

### (2) CSS Grid `subgrid` — 讓跨卡片的資訊列坐在同一條軌上

本流派的版面紀律是「不同的東西要能疊在一起比」。24 張卡片的名稱、體長、月份帶、
塊數、備註五條資訊必須**跨卡對齊**；卡片內容長度不一時，媒體查詢與 flex 都做不到，
只有 `grid-template-rows:subgrid` 能讓子項參與父格線。

caniuse `css-subgrid`：全球 **93.48%**，Chrome/Edge **117+**、Safari **16+**、Firefox **71+**、
Opera 103+、Samsung Internet 24+（IE 與 Opera Mini 不支援）。

```css
.roster{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:16px}
.card{display:grid;grid-row:span 7;grid-template-rows:subgrid;border:var(--rule)}
@supports not (grid-template-rows:subgrid){
  .card{grid-row:auto;grid-template-rows:none}
  .card .nm{min-height:62px}.card .note{min-height:78px}  /* 退回固定列高近似對齊 */
}
```

- **fallback**：`@supports not` 分支以 `min-height` 近似對齊，資訊零損失，只是列軌不再精確共線。

### (3) `steps()` 逐格動畫 — 刮刀與落版

`animation-timing-function: steps(n)` 屬 CSS Animations Level 1，各家自 2013–2016 年即支援，
為 Baseline widely available，無支援缺口。選它而非 easing 是**風格要求**：
平塗油墨沒有中間態，任何補間都會在硬邊上製造這個流派禁止的中間色與模糊邊。
`clip-path:inset()` 同為 Baseline widely available（`css-clip-path`）。

- **fallback**：`prefers-reduced-motion` 時整段動畫停用，內容直接就位。

### (4) 效能預算實測

| 項目 | 實測 |
|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | 64–135 KB（gzip 後約 30 KB），預算 350 KB |
| 全站 24 張圖重繪的字串建構 | **0.87 ms**（Node 22，50 次平均） |
| 版清單建構 | 2000 次 3.9 ms＝單次 0.002 ms |
| 主要動畫 | 只動 `transform` 與 `clip-path`，不觸發 layout；無 layout thrashing |
| 每張圖的 SVG 標記 | 平均 1.5 KB，24 張合計 37 KB |

換塊數時只重寫 `innerHTML`（節點數 ≤5／張），不做量測，故無 forced reflow。

---

## 十二、頁面骨架範例（可直接使用）

```html
<body>
<header class="top"><div class="wrap topin">
  <a class="mark" href="index.html"><span class="lg"><!-- 5 塊版的 logo SVG --></span>
    <span><b>品牌名</b><span>BRAND NAME</span></span></a>
  <nav class="ply" aria-label="主要導覽">
    <a href="index.html" aria-current="page"><span class="ic"><!-- 5 塊版 --></span>
      <span class="tx">首頁<i>HOME</i></span></a>
    <a href="two.html"><span class="ic"><!-- 2 塊版 --></span>
      <span class="tx">第二頁<i>TWO</i></span></a>
  </nav>
</div></header>

<main>
  <div class="open">                       <!-- 1.32fr / 1fr 不對稱開場 -->
    <div class="plate">
      <div class="fig" data-obj="主體"><!-- 一塊版一張 svg --></div>
      <div class="platebar">
        <span class="plyread"><span>1</span><s>已印版數</s></span>
        <button class="btn" type="button">再印一塊版</button>
      </div>
    </div>
    <div class="today">
      <p class="cap">標籤</p>
      <dl class="kv"><dt>項目</dt><dd>值</dd></dl>
    </div>
  </div>

  <section><div class="wrap">
    <div class="sechead"><h2>章名</h2><span class="node"></span><span class="en">SECTION</span></div>
    <p class="lede">導言，最寬 62ch，落在紙上。</p>
    <div class="inks"><!-- 五格色票，每格一句用途 --></div>
  </div></section>
</main>

<footer><div class="wrap">
  <div class="plybar">
    <span class="cap">本站印到第</span>
    <button type="button">−</button><output class="num">5</output><button type="button">＋</button>
    <span class="cap">塊版</span>
  </div>
</div></footer>
</body>
```

---

*本規格書隨 Design Skills Center 館藏站「新寶鳥站」發布。範例站的產業（濱海候鳥觀測站）與風格分離：
同一套規格可用於任何需要「把對象約減成幾塊形狀」的產業——標本館、字型鑄造、玩具、園藝、工具型錄。*
