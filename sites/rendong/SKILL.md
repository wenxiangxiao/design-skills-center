---
name: arts-and-crafts-repeat
description: A William Morris Arts & Crafts style built on seamless block-printed repeats — flat outlined botanicals hung on a continuous stem that crosses the block edge, a five-block natural-dye palette where every colour costs a woodblock, and Kelmscott text panels with floriated borders and wrapped initials.
---

# 工藝美術運動・接版花紙風（Arts & Crafts Repeat）

## 一、設計哲學

這個風格的祖宗是 William Morris 與工藝美術運動（Arts and Crafts Movement，1860 年代起於英國）。它的成立條件不是「復古的植物花紋」，而是三件事同時發生：

1. **手工對抗機器**。維多利亞中期的機器印刷可以做出擬真的立體感、投影與漸層；工藝美術運動刻意不做。所有東西平塗、封閉輪廓、沒有陰影——這不是能力限制，是立場。
2. **製作條件寫在畫面上**。花紙以梨木版手工壓印，一個顏色一塊版，一塊版一次過紙。所以顏色數就是成本，而版的尺寸（約 21×26 英吋）就是花樣的尺寸上限。
3. **接版是本體，不是裝飾**。花紙不是一張海報，它要貼滿一整面牆，同一塊版重複上百次。整套手藝的目標是讓看的人找不到那塊版有多大——**你做得越好，你做的東西越應該消失**。

因此本風格的核心動詞不是「畫」，是「接」。你設計的不是一張圖，是一個會自己延續下去的平面。做網頁時這一點必須被真的實作出來（無縫平鋪的 `<pattern>`），不能用一張大圖蓋過去——一旦它會被看見接縫，這個風格就垮了。

搭配產業時要挑「東西是長出來的、做的人手還在上面」的行業（苗圃、織品、書籍裝幀、木作、香草、陶）。不要配科技、金融、儀表板——不是不能，是它的裝飾邏輯（滿版、繁複、有機）會跟那些產業的資訊密度打架。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，做出來的就不是這個風格了。每一項都附可以直接複製的片段。

### 特徵 1：滿版無縫的接版——背景永遠是花樣，不是純色

整個頁面的底是一塊會自己接起來的版。不是「加了紋理的底色」，是一塊有內容、有結構、密度約七到九成的花樣。

用 SVG `<pattern>` 做，且**接版法要用 `patternTransform` 表達**（同一枚版，第二遍怎麼落）：

```html
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
  <defs>
    <clipPath id="cp"><rect width="320" height="400"/></clipPath>
    <g id="blk" clip-path="url(#cp)"><!-- 一塊版的內容，見特徵 2 --></g>
    <!-- 正接：一枚 pattern 就好 -->
    <!-- 半錯接：同一枚版再印一次，平移 (W, H/2) -->
    <pattern id="pa" width="640" height="400" patternUnits="userSpaceOnUse"><use href="#blk"/></pattern>
    <pattern id="pb" width="640" height="400" patternUnits="userSpaceOnUse"
             patternTransform="translate(320,200)"><use href="#blk"/></pattern>
    <!-- 翻轉接則是 patternTransform="translate(640,0) scale(-1,1)" -->
  </defs>
  <rect width="640" height="800" fill="#2E3A5B"/>
  <rect width="640" height="800" fill="url(#pa)"/>
  <rect width="640" height="800" fill="url(#pb)"/>
</svg>
```

```css
body{
  background-color:#2E3A5B;
  background-image:url("data:image/svg+xml;charset=utf-8,…");
  background-size:520px 650px;      /* 版原尺寸 320×400 × 2 塊；縮到 0.81 讓密度上來 */
}
```

**無縫的關鍵**：版上的每一個元件都要照「鄰版的位置」再畫八次，然後裁在版框裡。鄰版的位置**隨接版法而異**——這是最多人做錯的地方：

```js
function copies(repeat,W,H){       // 回傳 9 個鄰版（含自己）的位移
  var o=[];
  for(var i=-1;i<=1;i++)for(var j=-1;j<=1;j++){
    if(repeat==='straight')      o.push({dx:i*W, dy:j*H,          m:0});
    else if(repeat==='halfdrop') o.push({dx:i*W, dy:j*H-i*H/2,    m:0});   // ← 錯半版
    else                         o.push({dx:(i===0?0:(i>0?2*W:0)), dy:j*H, m:(i!==0)}); // 翻轉：鏡射
  }
  return o;
}
```

半錯接若照 `(W,0)` 複製，版的左右邊會出現一條硬邊——那是最容易被抓到的錯誤。

### 特徵 2：一條貫穿、而且跨過版邊的主枝

所有葉與花都掛在一條連續的莖上，不是隨機散布。主枝必須跨過版邊，因為眼睛會跟著線走，而不會去找方格。

要讓一條曲線在版邊自動接上（值與斜率都連續），用**整數頻率的正弦和**：

```js
// 橫向主枝：t=0 與 t=1 的值與導數必然相同 → 左右版邊接得上
function stem(W,H,a1,a2,p1,p2,base){
  var pts=[];
  for(var i=0;i<=48;i++){var t=i/48;
    pts.push([t*W, base + a1*Math.sin(2*Math.PI*t+p1) + a2*Math.sin(4*Math.PI*t+p2)]);}
  return pts;
}
// 斜格：再加 dir*t*H，走到底剛好落一個版高，對 H 取餘也是同一點
```

枝架（understructure）三型，這是 Morris 自己分類花樣的方式：**斜格**（跨版邊最多，最好藏）、**豎行**（留下規律行距）、**環抱**（版心一個環，版角必空，最容易露）。

側枝與捲鬚用 L-system 長：重寫規則 `A → F[+A][-A]FA`，兩代，轉角 0.46 弧度，每段截到前 4 點。捲鬚是阿基米德螺線，1.5 圈。

### 特徵 3：平塗、無漸層、無陰影，每一塊顏色外面一圈墨線

這是工藝美術運動的立場本身。會做漸層跟投影的是機器。

```css
/* 禁止清單，寫進你的 reset */
.aac *{box-shadow:none !important; text-shadow:none !important; filter:none !important}
.aac *{background-image:none}          /* 除了那張 pattern */
.aac .card{border:2px solid #1A1A16; border-radius:0}
```

```html
<!-- 一片葉：填色與描邊在同一個 path 上，不要畫兩次 -->
<path d="M0,0C18,-14 44,-14 62,0C44,14 18,14 0,0Z"
      fill="#4F6B45" stroke="#1A1A16" stroke-width="1.7" stroke-linejoin="round"/>
<path d="M2,0H60" stroke="#1A1A16" stroke-width=".95" fill="none"/> <!-- 葉脈 -->
```

葉緣分四型：`entire` 全緣（杏仁形）／`serrate` 鋸齒（12 節交替 1.16 與 0.9 倍寬）／`lance` 披針（0.62 倍寬）／`lobed` 深裂（9 節交替 1.42 與 0.38 倍寬，這一型是莨苕 acanthus，是本風格的招牌）。點列用 Catmull–Rom 轉三次貝茲平滑（tension 1.22）即可。

### 特徵 4：有限的天然染料色域，而且顏色數就是成本

不要調色盤，要**版目**。五塊版：

| 版 | 色票 | 用途 | 面積比 |
|---|---|---|---|
| 靛青（地） | `#2E3A5B` | 牆面、頁面底、深底面板 | ~38% |
| 生麻紙 | `#E8DFC6`／`#F3ECDA` | 所有長文所在的紙 | ~26% |
| 墨版 | `#1A1A16` | 所有輪廓線、葉脈、正文 | ~14% |
| 苔綠版 | `#4F6B45` | 所有枝與葉、表頭 | ~11% |
| 茜紅版 | `#A33227` | 花、連結、警示 | ~7% |
| 櫨黃版 | `#CBA13C` | 花、現用態、強調 | ~4% |
| 深靛 | `#1E2740` | footer | ~2% |

規則寫死：**長文一律在紙上，不在牆上**（深底上排長文會毀掉可讀性，也不是這個風格的做法——Morris 的書是黑字白紙）。第六個顏色不存在；要第六個就得說明「這是第六塊版，要多過一次紙」。白拔染（`#E8DFC6` 印在靛地上）另計，因為它是把顏色拿掉不是加上去。

### 特徵 5：Kelmscott 的紙面——花飾邊框、飾首字母、文字繞著裝飾走

Morris 晚年辦 Kelmscott Press，版面規矩是：緊實的黑字塊、四周包一圈長出來的花邊、段首壓一枚方形飾首字母，而**文字要繞著它走**。

```css
.paper{background:#E8DFC6;border:2px solid #1A1A16;padding:34px 32px}
.paper.framed{                       /* 花飾邊框：border-image + round，不變形 */
  border:20px solid transparent;
  border-image:url("data:image/svg+xml,<svg …>…</svg>") 24 round;
  background-clip:padding-box;
}
.initial{                            /* 飾首字母：文字繞著它的輪廓走 */
  float:left; width:132px; height:132px; margin:6px 16px 4px 0;
  shape-outside:polygon(0 0,100% 0,100% 62%,72% 62%,72% 100%,0 100%);
  shape-margin:9px;
}
@supports not (shape-outside:polygon(0 0,1px 0,0 1px)){ .initial{margin-right:20px} }
```

`shape-outside` 只對浮動元素生效——這是它唯一的用法，也剛好就是飾首字母要的行為。多邊形不要做成矩形，要有一個缺角（飾首字母右下角讓文字咬進去），繞排才看得出來。

---

## 三、色彩系統

見特徵 4 的版目表。額外規則：

- 底色**必須**是那塊有花樣的靛地，不可以退化成純色底。
- 茜紅只給「花、連結、被拒絕的事」；櫨黃只給「現用態、強調、被選中的事」。兩者不可互換，也不可同時出現在同一個小元件上。
- hover 一律是「換一塊版的顏色」（背景換成櫨黃、字換墨），不是變亮、不是加陰影。
- 表頭用苔綠底配生麻紙字；隔列底色是 `rgba(79,107,69,.09)`——那是同一塊版印淡一點，不是另一個灰。

## 四、字體系統

- 標題：`Noto Serif TC` 900 ＋ 拉丁 `EB Garamond` 600。Morris 的 Golden Type 是仿 Jenson 的舊體羅馬字，EB Garamond 是免費字體裡最接近的替身。
- 內文：`Noto Serif TC` 400 / `EB Garamond` 400，18px，行高 1.85（Kelmscott 的字塊是緊的，但螢幕要鬆一點才讀得下去）。
- 學名、編號、英文標籤：`EB Garamond` italic 或 `font-variant:small-caps` ＋ `letter-spacing:.09em`。
- **全站不得出現等寬字體**。這一點是硬規則：mono 數字會立刻把畫面拉去「工程製圖」那一族，跟這個風格的手工立場相反。要表現數字就用 small-caps 的舊體數字。
- 字級：46 / 30 / 20 / 18 / 16.5 / 15。標題與內文之間不要有中間級距——Kelmscott 的階層是靠字重與規線，不是靠很多種字級。

## 五、版面與網格

- 內容最大寬 1180px，主欄與側欄 1.55 : 1。
- 沒有圓角。分隔一律 2px 實線墨色（規線）；1px 只用在表格內線。
- 卡片是「貼在牆上的紙」：紙有邊框、有厚度感（靠 2px 線不是陰影），紙與紙之間讓牆露出來 26px。
- 版（pattern tile）的縱橫比固定 4:5（320×400），因為它對應實物的 21×26 英吋。要改尺寸可以，但一定要同時改 `background-size`，不然密度會走樣。
- 不要置中大標＋兩顆按鈕。首屏就是那面牆，資訊掛在牆上的紙上。

## 六、元件配方

```css
/* 按鈕：平塗＋墨線，按下就是換一塊版 */
button{font:inherit;background:#F3ECDA;color:#1A1A16;border:2px solid #1A1A16;
       padding:8px 15px;border-radius:0;font-weight:700}
button:hover{background:#CBA13C}
button[aria-pressed="true"]{background:#A33227;color:#F3ECDA}

/* 版籤 chip：一塊版就是一個顏色 */
.chip{display:inline-flex;align-items:center;gap:7px;border:2px solid #1A1A16;
      background:#F3ECDA;padding:4px 10px 4px 5px}
.chip i{width:16px;height:16px;border:1.5px solid #1A1A16;display:block}

/* 表單 */
input,select{border:2px solid #1A1A16;background:#F3ECDA;padding:7px 9px;border-radius:0}
.err{color:#A33227;font-weight:700}

/* footer：深靛紙背 */
footer{background:#1E2740;border:2px solid #1A1A16;color:#E8DFC6;padding:26px 28px}
```

導覽用「抽枝開花」：一條由土面長出的主枝分出四支＝四頁，現用頁那一支**開花**（花冠展開並著色），其餘只有芽點。現用態是生長階段，不是高亮色塊。≤900px 收成底部四格橫列。

## 七、動效規則（四種，缺一不可）

| 類型 | 內容 | 值 |
|---|---|---|
| ambient 環境 | **日光移牆**：一層暖色徑向漸層在整面花紙上緩慢移動，模擬光線掃過貼了壁紙的牆 | 68s linear infinite，`radial-gradient(rgba(255,238,196,.20) → transparent 78%)`，`transform:translate(±34%,±16%)` |
| input 輸入 | **同版共振**：hover 任何一枚版籤，頁面上所有 SVG 只留那一塊版印的東西 | `html[data-hl] .bpart{opacity:.16;transition:opacity 90ms linear}`，延遲 <100ms |
| transition 轉場 | **裱紙推移**：進頁時內容以整版一列一列被貼上去 | `clip-path:inset(0 0 100% 0)→0`，620ms `steps(7)` |
| signature 簽名 | **翻版遷位**：換接版法時整面牆的版滑到（或翻到）新的格子位置，版格線在遷移途中閃現一次。版一個字都沒有重刻 | `transform` 640ms `cubic-bezier(.28,.92,.3,1)`；`.tile{transform-box:view-box;transform-origin:0 0}` |

全部四種都要有降級，且降級後資訊零損失：

```css
@media(prefers-reduced-motion:reduce){
  body::before{animation:none;transform:translate(0,0)}   /* 日光停在正午 */
  main{animation:none;clip-path:none}                     /* 直接是最終畫面 */
  .tile{transition:none}                                  /* 瞬間到位，接版法照樣換得成 */
  .seams.flash path{opacity:0}
}
```

「本站禁用淡入」這類自我限制可以寫，但不能讓總數少於四種。安靜不是風格。

## 八、插畫與圖像風格

技法叫 **block-separation botany（分版平塗植物構成）**：全站沒有一張外部圖片，也沒有一張描外形的寫實插圖。所有圖像由同一支引擎輸出，而且每一張圖都能拆成「哪一塊版印了什麼」。

原語只有四種：

1. **葉**＝閉合外形（四種葉緣）＋墨線外框＋葉脈＋一小段葉柄。
2. **花**＝六種花序：`umbel` 繖形／`spike` 穗狀／`bell` 鐘形／`composite` 頭狀／`quatrefoil` 四瓣／`tubular` 筒狀。每一種只用一個顏色（一塊版）＋墨線。
3. **枝**＝主枝（8.2px 苔綠＋1.5px 墨）、側枝（2.6px）、捲鬚（2.2px 螺線）。
4. **印記**＝圓形，花瓣數 8–14 由 FNV-1a 雜湊決定，同一組輸入恆得同一枚印。

Logo、favicon、24 張苗籍縮圖、回執印記、整面牆全部同源。判準是：**拿掉顏色，仍讀得出這是哪一種葉緣、哪一種花序**。

明文禁止：`feTurbulence` 手抖濾鏡（那是迷幻海報的語彙）、半調網點、細線幾何線描的等角視圖、任何寫實描繪。

## 九、Logo 與 Favicon

Logo 是「一條穿過接縫的枝」：96×96 靛底，中央一條櫨黃虛線＝版邊，一條苔綠主枝從左下走到右上、跨過那條虛線，枝上兩朵花兩片葉。它一眼講完整個品牌命題——這條線在版邊接得起來。

Favicon 同構，32×32，簡化成一條枝、一朵筒狀花、一朵茜紅花與那條虛線，寫成 inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%232E3A5B'/%3E%3Cpath d='M16 0v32' stroke='%23CBA13C' stroke-width='1' stroke-dasharray='2 2'/%3E%3Cpath d='M4 24C10 22 12 14 16 12s6 8 12 6' fill='none' stroke='%234F6B45' stroke-width='3'/%3E%3C/svg%3E">
```

## 十、Do & Don't

**Do**

- 先把版做出來，再做頁面。版沒有無縫，其他都免談。
- 每一塊版至少一條攀緣主枝，而且它要跨過版邊。
- 長文放在紙上，紙有邊框。
- 顏色數當成本講給使用者聽（「這塊版要刻五塊」）。
- 讓使用者可以把版格線叫出來——把接縫找出來再關掉，是這個風格最好的教學。

**Don't**

- 不要用一張大圖當背景（會被看見接縫、會胖、換不了接版法）。
- 不要漸層、不要投影、不要圓角、不要毛玻璃。
- 不要等寬字。
- 不要 emoji 當 icon，不要 Lorem ipsum，不要「EST. 18xx」徽章。
- 不要跑馬燈：這個風格的重複是空間上的（平鋪），不是時間上的（捲動）。放跑馬燈等於承認你的平鋪不夠好看。
- 不要把 Morris 的原作圖樣直接描下來。這份規格給的是長出圖樣的方法，不是圖樣本身。

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  body{margin:0;background:#2E3A5B url("data:image/svg+xml,…") 0 0/520px 650px;
       font:18px/1.85 "EB Garamond","Noto Serif TC",serif;color:#1A1A16}
  body::before{content:"";position:fixed;inset:-20%;pointer-events:none;
    background:radial-gradient(closest-side at 50% 50%,rgba(255,238,196,.20),transparent 78%);
    animation:daylight 68s linear infinite}
  main{animation:paste .62s steps(7) both}
  @keyframes paste{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
</style></head><body>
<nav class="nav"><!-- 抽枝開花：四支，現用頁那支開花 --></nav>
<div class="wrap">
  <header class="head"><div class="mark"><!-- logo.svg --></div><h1>店號</h1></header>
  <main>
    <section class="paper framed">
      <h2>標題</h2>
      <span class="initial"><svg viewBox="0 0 132 132">…飾首字母…</svg></span>
      <p>內文繞著飾首字母走……</p>
    </section>
    <section class="wallbox"><!-- 活的牆：一塊一塊擺好，換接版法時滑到新位置 --></section>
  </main>
  <footer>…</footer>
</div></body></html>
```

---

## 十二、技術實作與相容性

三項核心技術，各自承載一個不可省略的特徵。所有支援度於 **2026-08-09** 查證。

### 1. SVG `<pattern>` ＋ `patternTransform`（A 渲染層）── 承載特徵 1

- **承載什麼**：真正的無縫平鋪，以及「接版法＝同一枚版的第二次落版」這個語意。
- **支援現況**：`<pattern>`、`patternUnits`、`patternTransform` 屬於 SVG 1.1，所有現行瀏覽器支援。查證來源：MDN《`<pattern>`》與《patternTransform》（developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/pattern、…/Attribute/patternTransform）、caniuse 的 `mdn-svg_elements_pattern_patterntransform`。
- **重要細節（查證所得）**：MDN 明載 SVG2 雖然允許改用 CSS `transform` 屬性取代 `patternTransform`，但「目前實作狀況不佳，為了相容性強烈建議繼續使用 `patternTransform` 屬性」。本站照此辦理，一律用屬性不用 CSS 屬性。
- **fallback**：無需 fallback（無支援缺口）。但若 SVG 完全被停用，`background-color:#2E3A5B` 仍在，版面與可讀性不變（長文本來就在紙上）。
- **注意**：`patternUnits` 預設值是 `objectBoundingBox`，會讓 x/y/width/height 變成比例值。做像素級接版一定要寫 `patternUnits="userSpaceOnUse"`。

### 2. CSS `shape-outside`（C 版面與樣式層）── 承載特徵 5

- **承載什麼**：Kelmscott 的飾首字母，讓內文繞著裝飾的輪廓走，而不是繞著一個方框。
- **支援現況**：Baseline **Widely available**，自 2020 年 1 月起跨瀏覽器可用。查證來源：MDN《shape-outside》（developer.mozilla.org/en-US/docs/Web/CSS/shape-outside）、caniuse `mdn-css_properties_shape-outside`。
- **限制（規格行為，不是 bug）**：`shape-outside` 只對**浮動元素**生效。非 float 的元素寫了也沒有作用。
- **fallback**：本站只用 `polygon()`（Level 1 基本形狀，支援度最廣），不用 `path()`（該值在各家的支援較晚）。以 `@supports not (shape-outside:polygon(0 0,1px 0,0 1px))` 偵測，不支援時改為單純加大右外距——飾首字母仍在、文字仍讀得到，只是繞排退化為方框繞排，資訊零損失。

### 3. L-system 程序化枝條生成（E 資料與生成層）── 承載特徵 2

- **承載什麼**：側枝與捲鬚的骨架，以及葉與花掛在哪裡（枝端即插槽）。
- **支援現況**：純 JavaScript 字串重寫＋turtle 幾何，無任何瀏覽器 API 依賴，故無相容性問題。搭配 FNV-1a → mulberry32 的決定性偽亂數，同一組輸入恆得同一塊版，因此可以用 `?p=` 分享並完整還原。
- **fallback**：本站的當季花樣在**建置階段**就用同一支引擎算好，輸出成靜態 SVG data URI 寫進 CSS。沒有 JavaScript 時整面牆與四頁內容完全正常，只有接版檯（互動排版）不能用；接版檯的 `<noscript>` 指向〈接版之法〉，那一頁把全部幾何與評分公式都寫成文字。

### 效能預算（實測）

| 項目 | 值 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部資源） | index 189 ／ 苗籍 207 ／ 印房 118 ／ 接版之法 125 KB | ≤350KB |
| 其中背景花紙 data URI | 53 KB | — |
| 其中引擎（engine＋compose＋render） | 27 KB | — |
| 首屏 JS：解析＋（若使用者貼過牆）還原一塊版 | 一次 `compose()`＋序列化約 3.3ms（Node 22 同碼實測 40 次平均：compose 1.73ms、score＋序列化 1.60ms） | ≤100ms |
| 接版檯刻一塊版（compose＋score＋產出活的牆） | 1.98ms（20 次平均） | — |
| 主要動畫 | 遷位只動 12 個 `<g>` 的 `transform`（合成層），無 layout thrashing | 60fps |

尺寸控制的三個做法，做同類站可以照抄：(1) 路徑座標只留一位小數；(2) 填色與描邊寫在同一個 `<path>` 上，不要為了描邊再畫一次；(3) 版上的元件放在 `<defs>` 裡，鄰版複製一律用 `<use>` 參照，不重複輸出路徑資料——九宮格複製因此只花九個 `<use>` 的字元數。

### 已知的坑

- `<use>` 的影子內容仍會被外層 CSS 選擇器命中（本站的「同版共振」就靠這個）。但 `fill` 若寫成 presentation attribute 會蓋不過 CSS，所以顏色一律用 class 給。
- SVG 元素上的 CSS `transform` 預設 `transform-box` 各家有歷史差異，做遷位動畫請明寫 `transform-box:view-box;transform-origin:0 0`。
- `border-image` 搭 `round` 才不會把花邊拉變形；配 `background-clip:padding-box`，否則紙的底色會漏到邊框外。
