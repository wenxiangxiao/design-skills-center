---
name: mexico-68-echo-line
description: The linear identity language of the 1968 Mexico City Olympics (Lance Wyman, Eduardo Terrazas, with Huichol yarn-art and Op Art roots) — solid shapes and heavy rounded letterforms radiating equally spaced parallel contour lines that bleed off the page and merge where two shapes meet, one flat colour per line alternating with the ground, and pictograms in round tokens ringed by concentric bands.
---

# 墨西哥 68 線性識別 Mexico 68 Echo Line（Wyman／Terrazas 1966–1968）

> 範例站：同心毛線行 TÂNG-SIM YARN（臺北大同區民樂街的毛線行）。本 SKILL 定義風格，不綁產業。
> 本 SKILL 描述的是一種**造形方法**，不是那套奧運識別本身：不要重製「MEXICO68」標準字、五環或任何官方圖記。

## 1. 設計哲學

1966 年，墨西哥城奧運組委會主席、建築師 Pedro Ramírez Vázquez 找來建築師 Eduardo Terrazas 與美國設計師 Lance Wyman，要做一套「一眼就是墨西哥、但不是仙人掌與寬邊帽」的識別。團隊（另有 Peter Murdoch 負責標誌系統、Beatrice Trueblood 負責出版物、雕塑家 Mathias Goeritz）找到兩個來源，而它們剛好長得一樣：

- **維秋爾族（Wixárika／Huichol）的毛線畫**——把彩色毛線一圈一圈壓進塗了蜂蠟的木板，形狀的外面就是一圈一圈平行的線。原始草稿據記載先由一群維秋爾藝術家做成 tablas。
- **歐普藝術（Op Art）**——Bridget Riley、Vasarely 的平行、同心、收斂線。

Terrazas 發展出一套「線性字體」：粗、等線、圓頭的字，每一筆外面都套著平行線；Wyman 把這些平行線**往外推到無限大**，於是一個字可以長成一整面牆、一條街的地面、一件洋裝的布料。1969 年 Wyman 接著做了墨西哥城地鐵每一站一枚的圓形圖記。

這個風格的物理本質只有一句話：**東西是實心的；它的外面長出等寬的線，一圈貼著一圈，直到出血；兩個東西的線相遇時，合成同一組線。**——這正是「從一個形到外面所有點的距離」畫出來的等高線。

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--paper` 底 | `#FBF7EE` | 地色，也是「線與線之間的那一條」 | 45–55% |
| `--ink` 墨 | `#17130F` | 實心的形（字、線球、圖記）、正文、粗框 | 12–18% |
| `--mag` 市場桃 | `#E2127A` | 第一條線、現用態、強調字 | ≤10% |
| `--org` 芒果 | `#F7941D` | 線、hover 外環 | ≤9% |
| `--cyan` 淡水青 | `#0098DA` | 線、focus ring、連結 | ≤8% |
| `--grn` 芭樂綠 | `#5FAE3A` | 線 | ≤6% |
| `--yel` 鴨仔黃 | `#FFD100` | 線、暗底上的強調、券面 | ≤6% |
| `--soft` 灰褐 | `#5B544C` | 次級文字（只出現在正文，從不當線） | <4% |

規則：

1. **一條線一個顏色，彩線與底線一條隔一條。** 色序固定、循環、不跳色：`桃→底→橘→底→青→底→綠→底→黃→底`。
2. **零深淺**：任何顏色都沒有淡版、沒有透明度、沒有漸層。要「淺」就讓底線多一條，要「深」就換墨。
3. 暗底版：把 `--paper` 與 `--ink` 對調（底線變墨、形變底色），彩色不變。
4. 黃與綠不承載正文（對紙對比不足）。

```css
:root{--paper:#FBF7EE;--ink:#17130F;--mag:#E2127A;--org:#F7941D;--yel:#FFD100;--cyan:#0098DA;--grn:#5FAE3A;--soft:#5B544C}
```

## 3. 字體系統

- **展示字**：Nunito 900（拉丁、數字）＋ Noto Sans TC 900（中文）——都要「粗、等線、圓收筆」。Terrazas 的字是等線圓頭的，任何有襯線、有粗細對比、有尖角的字都會讓回聲線變得破碎。
- **正文**：Noto Sans TC 500，16px／1.8。
- **標籤**：Nunito 800–900，11–12px，字距 .22–.34em，大寫。
- 字級 scale：12／15／16／19／24／30／46／58／86，超大字（回聲場用）直接以畫面高度的 54–68% 計。
- 回聲場裡的字一律**實心墨**；字本身不描邊、不鏤空。

## 4. 版面與網格

- 首屏是一張**回聲場**：一到三個實心形（字＋一個物件）放在畫面裡，至少一個**出血**到畫面外，讓線一路長到邊。資訊放在一塊帶粗框的底色板上，壓在場的一角，不放正中央。
- 兩個形之間的距離要剛好讓它們的線**在中間碰撞**（中線會出現尖角）——這是版面的主構圖。
- 內頁用不對稱兩欄（5:7、3:9），區塊之間以**多線帶**分隔（同一套色序，水平方向）。
- 列表一律是粗墨線分隔的條列，不用卡片。
- 圓角只有兩種：0（版面）與 999px（膠囊、圓 token）。

## 5. 元件配方

**導覽（回聲環標籤）**：膠囊標籤，現用頁反黑並長出兩圈彩色同心環；hover 長一圈。

```css
.tabs{display:flex;gap:36px;padding:16px 18px}
.tabs a{padding:5px 16px 6px;border-radius:999px;font-weight:900;box-shadow:0 0 0 3px var(--ink);transition:box-shadow .2s cubic-bezier(.3,.7,.3,1)}
.tabs a:hover{box-shadow:0 0 0 3px var(--ink),0 0 0 7px var(--paper),0 0 0 11px var(--org)}
.tabs a[aria-current=page]{background:var(--ink);color:var(--paper);
  box-shadow:0 0 0 4px var(--paper),0 0 0 8px var(--mag),0 0 0 12px var(--paper),0 0 0 16px var(--org)}
```

`gap` 必須 ≥ 最外環半徑 ×2，否則環會互壓。≤560px 改為底部固定列、外環縮為兩圈。

**按鈕（膠囊）**：墨底＋一圈底色＋一圈橘；hover 再長兩圈。**資訊板**：底色、4px 墨框，外面再一圈 8px 底＋6px 墨（box-shadow）。**表格**：表頭 4px 墨線、列 2px 墨線，數字用 Nunito 900。**Footer**：墨底整條，三欄連結。

## 6. 動效規則（四種都必須在）

| 類型 | 本站做法 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 回聲線**持續向外流**（距離場相位位移） | 無需輸入，頁面可見時 | 每秒 9–14 CSS px；線寬 7–9px | 停在相位 0，靜止圖完整 |
| input 輸入 | 游標成為一個實心點，線**繞著它走並與字合流** | pointermove | 半徑 22–30px；一幀內重算（≈5ms） | 照常即時回應，但只在移動時重畫 |
| transition 轉場 | **同心環擦除**：從點擊點長出一整面色序同心環蓋住畫面，下一頁再從同一點收回 | 站內連結點擊、遊戲換題 | `--r` 0→覆蓋半徑，.56s `cubic-bezier(.65,0,.35,1)` | 直接換頁，無擦除 |
| signature 簽名 | **回聲退圈**：被藏起的字外圍的空白區以 420ms ease-out 往內縮兩圈，露出更多輪廓 | 〈猜線〉猜錯 | `hide` 6→4→2→0 圈 | 立即跳到新值 |

自我限制：本風格**沒有淡入、沒有縮放彈跳、沒有視差**——所有動態都是「線在動」。

## 7. 插畫與圖像風格：等距回聲線（contour echo）

- 圖像 = 實心剪影 + 它的等距線。剪影必須粗、圓、沒有細節；細節會在線裡被抹平。
- 圖記（pictogram）：實心色圓內放底色剪影（線球、棒針、鉤針、剪刀、鈕釦、茶杯、毛衣），外面兩圈同心環——這是 Wyman 地鐵圖記的語法。
- 地圖：街道畫成「墨－底－墨」三線，目的地是一枚同心靶。
- 禁止：寫實插畫、照片、細線線描、陰影。

## 8. Logo 與 Favicon

同心圓靶：墨心（內含三條底色的毛線弧）＋桃、橘兩圈彩線，右下伸出一條線頭打破對稱。字標「同心毛線行」Noto Sans TC 900 ＋ TÂNG-SIM YARN Nunito 800 寬字距。Favicon 即圓靶本身（inline SVG data URI）。

## 9. Do & Don't

- Do：讓線出血；讓兩個形的線相撞；一條線一色；字要粗圓。
- Do：把「線的數量」當資訊（藏起來的圈數、剩下幾層）。
- Don't：重製 MEXICO68 標準字、奧運五環、官方圖記或任何既有海報。
- Don't：漸層、透明度、陰影、玻璃擬態、紫藍漸層、置中三卡片、emoji icon、EST. 徽章。
- Don't：細字、襯線字、尖角字放進回聲場；線寬不一。
- Don't：用 `text-shadow` 假裝回聲（它沒有 spread，轉角會斷）。

## 10. 頁面骨架範例

```html
<header class="nav"><a class="brand" href="index.html">…logo…</a>
  <nav><ul class="tabs"><li><a href="index.html" aria-current="page">店</a></li>…</ul></nav></header>
<section class="hero" style="position:relative;height:88vh">
  <canvas class="echo" id="hero"></canvas>           <!-- 回聲場 -->
  <svg class="fallback">…疊層描邊靜態版…</svg>       <!-- 無 JS / 無 canvas 時顯示 -->
  <div class="panel"><h1>同心毛線行</h1><p>…</p></div>
</section>
<div class="band"></div>                              <!-- 多線帶分隔 -->
<script>
new ECHO.Field(document.getElementById('hero'),{w:8,cr:30,flow:12,
  seq:['mag','paper','org','paper','cyan','paper','grn','paper','yel','paper'],
  draw:function(x,W,H){x.font='900 '+H*.66+'px "Noto Sans TC"';x.textAlign='end';
    x.fillText('同心',W,H*.74);x.beginPath();x.arc(W*.2,H*.3,H*.12,0,7);x.fill();}});
ECHO.start();
</script>
```

## 11. 本風格的 5 個不可省略特徵

**① 等距回聲線**——形的外面一圈一圈長出等寬平行線，線寬＝線距，直到出血。拿掉它就只剩粗字。

```js
// 距離場上色：d = 該像素到最近實心形的距離（px）
var band=Math.floor((d+phase)/w), k=((band%n)+n)%n;   // w=線寬, n=色序長度
buf[i]=d<=0.5?INK:COLORS[k];
```
無 JS 的等價物（SVG 疊層描邊，由粗到細）：
```html
<g fill="#FFD100" stroke="#FFD100" stroke-width="80" stroke-linejoin="round"><text …>同</text></g>
<g fill="#FBF7EE" stroke="#FBF7EE" stroke-width="64" stroke-linejoin="round"><text …>同</text></g>
<!-- …每層 stroke-width 少 2w，顏色照色序… -->
<g fill="#17130F"><text …>同</text></g>
```

**② 一條線一色、彩底相間、零深淺**——色序固定循環，沒有任何淡色或透明。
```css
.band{height:60px;background:repeating-linear-gradient(180deg,
 var(--mag) 0 6px,var(--paper) 6px 12px,var(--org) 12px 18px,var(--paper) 18px 24px,
 var(--cyan) 24px 30px,var(--paper) 30px 36px,var(--grn) 36px 42px,var(--paper) 42px 48px,
 var(--ink) 48px 54px,var(--paper) 54px 60px)}
```

**③ 粗、等線、圓收筆的字，且永遠實心**——Nunito 900／Noto Sans TC 900；字是線的源頭，不是裝飾。
```css
h1,h2,.disp{font-family:Nunito,"Noto Sans TC",sans-serif;font-weight:900;line-height:1.06}
```

**④ 回聲合流**——兩個形的線在中間相遇時合成同一組（距離取最小值），出現尖角中線；版面靠這個碰撞組織。
```js
var dc=Math.hypot(x-cx,y-cy)-r;  if(dc<d) d=dc;   // 第二個形（游標、線球）與字取聯集
```

**⑤ 圓 token 圖記＋同心環**——實心色圓內的底色剪影，外套兩圈環（Wyman 地鐵圖記語法）。
```css
.tok{--tok:var(--mag);width:64px;height:64px;border-radius:50%;background:var(--tok);color:var(--paper);
 box-shadow:0 0 0 5px var(--paper),0 0 0 10px var(--tok),0 0 0 15px var(--paper),0 0 0 20px var(--ink)}
```

## 12. 技術實作與相容性

### (a) 核心技術與查證

1. **Felzenszwalb–Huttenlocher 歐氏距離轉換（E 資料與生成層）**——承載特徵 ①④。把字與物件用 Canvas 2D `fillText`／`arc` 畫進離屏 canvas，alpha > 110 視為實心，對每欄、每列做一維「拋物線下包絡」平方距離轉換，兩趟後開根號，O(W·H)。實測（node 22，984×569）：約 33–37ms，只在版面改變／字型載入／換題時做一次。
2. **Canvas 2D `ImageData` ＋ `Uint32Array` 色序查表逐幀上色（A 渲染層）**——承載 ambient 流動、游標合流與簽名退圈。每幀 `buf[i]` 由距離、相位與游標距離查表，線的內緣以 4 階預混色做 1px 反鋸齒；`putImageData` 一次寫回。實測 560k 像素每幀約 5.3–5.7ms（含每像素一次 `sqrt` 的游標聯集）。內部解析度上限：桌機 56 萬像素、手機 24 萬像素，CSS 放大。`getContext('2d',{willReadFrequently:true})` 用於離屏遮罩。查證：MDN〈CanvasRenderingContext2D: putImageData()〉與〈ImageData〉皆 Baseline Widely available。
3. **CSS `@property` 型別化 `<length>` 驅動同心環擦除（B 動效與時間軸層）**——承載轉場。`@property --r{syntax:'<length>';inherits:false;initial-value:0px}`，`.wipe` 的 `mask-image:radial-gradient(circle at var(--x) var(--y),#000 var(--r),transparent calc(var(--r) + 1px))` 疊在 `repeating-radial-gradient` 色序環上；transition `--r` 才能讓遮罩半徑連續補間（未註冊的自訂屬性只會在終點跳變）。查證：MDN〈@property〉Baseline 2024（2024-07，Firefox 128 補齊），`syntax` 與 `inherits` 必填、非 `*` 時 `initial-value` 必填。
4. 輔助：`document.fonts.load()` 等字型（最多 1.4 秒）再算距離場、`fonts.ready` 後重算；`ResizeObserver` 140ms 防抖重算；`IntersectionObserver` 與 `document.hidden` 在不可見時停畫。

### (b) Fallback 具體行為

- **無 JS**：`<html>` 沒有 `.js`，canvas 隱藏，顯示建置時烘好的 **SVG 疊層描邊**回聲圖（特徵 ① 的無 JS 等價物）；〈猜線〉的 `<noscript>` 直接寫出五個答案。
- **有 JS 但無 canvas 2D**：`Field` 建構時偵測 `getContext('2d')` 為 null，自動隱藏 canvas、顯示同一張 SVG。
- **無 `@property`**（以 `CSS.registerProperty` 是否存在判定）：擦除改為整面色序環的不透明度淡入淡出，仍在 700ms 內換頁。
- **`prefers-reduced-motion: reduce`**：回聲線靜止在相位 0、換頁無擦除、退圈立即到位；游標合流仍在移動時即時重畫（輸入回饋不是自動動畫）。所有資訊（字、券號、說明）不依賴任何動畫。
- **sessionStorage 不可用**：轉場的返程收回與跨頁券號提示安靜略過（try/catch）。

### (c) 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | 33–36 KB | ≤350 KB |
| 首屏 JS：距離場一次 | ≈35 ms（984×569） | ≤100 ms |
| 逐幀上色 | ≈5.5 ms／幀（560k px） | 16.7 ms（60fps） |
| 外部資源 | 僅 Google Fonts | 零外部圖片音檔 |
