---
name: orange-crate-label-chromolitho
description: California orange crate label art (chromolithographic packing-house labels, c.1885–1955) for the web — a pine crate end carrying one pasted label: shaded brand lettering, groves converging to a snow peak at sunset, a giant fruit breaking the frame, stippled litho tones and grade-by-label commerce.
---

# 柑橘箱頭標籤 Orange Crate Label・石版彩印

> 範例站：`sites/kam-tshng`（劉家青果集貨場・雪山牌，臺中東勢）。本規格書不綁產業：任何「一箱一箱賣出去的東西」都能用——農產、茶葉、罐頭、啤酒、文具禮盒。

## 設計哲學

1880–1960 年代，加州柑橘一箱一箱用火車運到東岸的拍賣場。批發商不開箱，只看箱頭那張紙標籤就決定出價，所以標籤要在十步外被認出來：**牌子名字最大、畫面要有一個地方的樣子、果子要比山還大**。標籤由洛杉磯 Western Lithograph Co.、舊金山 Schmidt Lithograph Co. 等石印廠以 8–12 塊石版套色印製；石版做不出平滑漸層，天色與陰影只能用點描（stipple）一階一階轉。Huntington Library 的 Jay T. Last 收藏有千餘張，多數集中在 1910–1930 年。

所以這個風格有三個不能讓步的態度：
1. **整個網站是一個木箱的箱頭**：資訊是貼上去的紙，紙下面是松木板。
2. **商業比藝術大**：牌子名、等級、產地、包裝場、重量，全部印在畫面上，像真的要拿去賣。
3. **調子是點出來的**：任何明暗變化都是一粒一粒的墨點，不是數位漸層。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「一般的復古插畫」。

### ① 一張標籤貼在松木箱頭上（版面手法）
標籤是 11:10 的橫幅紙（柑橘箱頭的比例），奶油紙外緣＋深色底框＋奶油細線＋橘色髮絲線三層框；紙後面永遠是三片松木板與木紋、四角可以有釘子。標籤以外的資訊用「箱側噴漆模板字」寫在木頭上。
```css
:root{--pine:repeating-linear-gradient(180deg,transparent 0 calc(33.333% - 3px),#6E4620 calc(33.333% - 3px) 33.333%),
 repeating-linear-gradient(92deg,rgba(142,95,43,0) 0 22px,rgba(142,95,43,.22) 22px 24px,rgba(142,95,43,0) 24px 61px,rgba(110,70,32,.18) 61px 62px),
 linear-gradient(#C99A5B,#C99A5B)}
body{background-image:var(--pine);background-size:100% 420px,100% 100%,100% 100%}
.stencil{font:700 15px/1.2 Oswald,sans-serif;letter-spacing:.32em;text-transform:uppercase;color:#3A2410;opacity:.86}
```
```svg
<rect width="1100" height="1000" rx="22" fill="#F3E3BC"/>
<rect x="30" y="30" width="1040" height="940" rx="14" fill="#1E3A8C"/>
<rect x="44" y="44" width="1012" height="912" rx="10" fill="none" stroke="#F3E3BC" stroke-width="5"/>
<rect x="56" y="56" width="988" height="888" rx="8" fill="none" stroke="#EE8A1A" stroke-width="2"/>
```

### ② 立體品牌字：實色斜投影（字體選擇）
牌子名是全標籤最大的元素（中文 Noto Serif TC 900、拉丁 Ultra），奶油字＋紅色細外框＋往右下 45° 疊 12 層的深群青實色投影。**投影零模糊**——是印出來的第二塊版，不是光影。
```svg
<!-- k = 12…1 的實色疊層，最後一層才是字 -->
<text x="112" y="812" font-family="'Noto Serif TC',serif" font-weight="900" font-size="168" fill="#0E1A44">雪山牌</text>
<text x="100" y="800" font-family="'Noto Serif TC',serif" font-weight="900" font-size="168" fill="#F3E3BC" stroke="#C1301F" stroke-width="3" paint-order="stroke">雪山牌</text>
```
HTML 標題可用 `text-shadow` 疊層做同一件事：`text-shadow:1px 1px 0 #0E1A44,2px 2px 0 #0E1A44,…,8px 8px 0 #0E1A44`。

### ③ 石版點描調子（色彩規則）
8 個墨色（群青、深群青、天藍、橘、柑暗、黃、紅、綠）平塗；**唯一的明暗手段是點描**：每一塊墨是平塗色被一張 mask 遮住，mask 是灰階漸層經過「雜訊相減＋閾值」濾鏡，漸層越亮點越密。禁止任何可見的平滑漸層。
```svg
<filter id="stip" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
 <feTurbulence type="fractalNoise" baseFrequency=".71" numOctaves="1" seed="7" result="n"/>
 <feComponentTransfer in="n" result="nc"><feFuncR type="linear" slope="2.6" intercept="-.8"/></feComponentTransfer>
 <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" result="g"/>
 <feColorMatrix in="nc" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" result="na"/>
 <feComposite in="g" in2="na" operator="arithmetic" k2="1" k3="-1" k4=".5" result="d"/>
 <feComponentTransfer in="d" result="t"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>
 <feFlood flood-color="#fff"/><feComposite in2="t" operator="in"/>
</filter>
<radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="640" cy="330" r="488"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
<mask id="m-glow" maskUnits="userSpaceOnUse" x="70" y="70" width="960" height="420"><rect x="70" y="70" width="960" height="420" fill="url(#glow)" filter="url(#stip)"/></mask>
<rect x="70" y="70" width="960" height="420" fill="#EE8A1A" mask="url(#m-glow)"/>
```
⚠ **baseFrequency 不可用 .5、.25、1 這類整數倒數**：Perlin 雜訊在格點上恆為 0，取樣會落在少數幾個值上，點描會變成一塊有硬邊的圓。本站用 .57／.63／.71。

### ④ 越框的巨大果實＋三層景深（形狀語彙）
前景一顆比遠山大的果子（附兩片葉與一朵白花）壓在畫框與絲帶上、越出場景；中景是成列的果樹往一個消失點收；遠景是雪山與日落。樹冠是兩個圓：暗色圓整組依太陽位移、亮色圓疊在上面——平塗兩階，像石版的兩塊版。
```svg
<g transform="translate(-1.3 5.7)" fill="#1E4A24"><!-- 暗面整組 --><circle cx="430" cy="530" r="18"/>…</g>
<g fill="#2E6B33"><circle cx="430" cy="528" r="15.5"/>…</g>
```

### ⑤ 包裝場的商業語彙（裝飾母題）
紅色絲帶橫幅（產地，兩端燕尾折）、紅色圓形等級徽（特選 FANCY）、`PACKED BY …` 小字、地名、重量、箱號。**三種等級＝三張不同牌子的標籤**（加州包裝場的老規矩），等級只看標籤就懂。
```svg
<path d="M120 584 L60 584 L84 612 L60 640 L150 640Z" fill="#C1301F"/>
<rect x="120" y="568" width="860" height="56" fill="#C1301F"/>
<text x="440" y="606" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="27" letter-spacing="5" fill="#F3E3BC">臺中東勢 · TUNG-SHIH, TAIWAN</text>
```

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 松木 | `#C99A5B`／`#B07E40`／`#8E5F2B`／`#6E4620` | 頁面底（箱板）、板縫、硬投影 | 35% |
| 標籤奶油 | `#F3E3BC` | 標籤紙、內容卡、字 | 25% |
| 群青 | `#1E3A8C`／`#14275E`／`#0E1A44` | 標籤底、天空、字投影 | 18% |
| 橘／柑暗 | `#EE8A1A`／`#C25A10` | 果、日落、強調 | 8% |
| 紅 | `#C1301F` | 絲帶、等級徽、按鈕、焦點 | 5% |
| 綠／深綠 | `#2E6B33`／`#1E4A24` | 葉、果樹、第二等級 | 5% |
| 黃 | `#F6CE4E` | 日核、亮點、小字強調 | 2% |
| 山紫 | `#5E5AA0`／`#38376E` | 遠山 | 2% |
| 墨 | `#1C1712` | 正文 | — |

三種等級固定三個底色：群青（特選）、綠（優選）、赭 `#9A5A16`（家用）。

## 字體系統

- 品牌中文：**Noto Serif TC 900**，只用在牌子名與標題。
- 品牌拉丁：**Ultra**（粗 slab），牌子英文名、價格數字。
- 商業小字：**Oswald 500–700**，全大寫、字距 .14–.32em（產地、PACKED BY、模板字）。
- 正文：**Noto Sans TC 400／700**，16px／1.75。
- 字級：標籤牌子名 = 標籤寬 15%；頁面 H1 clamp(34px,4.6vw,60px)；H2 clamp(28px,3.2vw,40px)；小字 12–15px。

## 版面與網格

- 每一頁的主角都是「一張貼在木頭上的紙」：主標籤 `width:min(92vw,960px)` 置中；內容卡 `.paper` 是奶油紙＋群青細框＋往右下 10px 的木色硬投影。
- 三等級並排 3 欄（≤900px 變 1 欄）；季節表 6 欄（≤900px 3 欄、≤560px 2 欄）。
- 傾斜只出現在「被手貼上去的東西」：吊牌 −5°～3°、印章 −6°～−14°。版面本身正交。
- 留白：區塊間 10–14vh，因為木板就是留白。

## 元件配方

- **導覽（吊牌）**：右上一條麻繩，三張牛皮紙吊牌掛著（`clip-path` 切兩個肩角、孔眼是奶油環圓點），hover 反向擺動（`cubic-bezier(.3,1.8,.4,1)` 回彈）；現用頁的吊牌變奶油色並蓋一顆紅色圓章「在此」。≤760px 落成底部三格。
```css
.tags a{clip-path:polygon(18% 0,82% 0,100% 14%,100% 100%,0 100%,0 14%);transform-origin:50% 4px;transform:rotate(var(--tilt));transition:transform .5s cubic-bezier(.3,1.8,.4,1)}
.tags a[aria-current=page]::after{content:"在此";border:3px solid #C1301F;border-radius:50%;transform:rotate(-14deg)}
```
- **按鈕**：紅底奶油字、5px 深群青硬投影，按下位移 4px 吃掉投影。
- **內容卡**：`.paper{background:#F3E3BC;border:10px solid #F3E3BC;outline:3px solid #1E3A8C;outline-offset:-16px;box-shadow:10px 10px 0 #6E4620}`。
- **價目表**：品項左、價格右（Ultra 20–22px），列間 1px 牛皮線 `#C9B285`。
- **表單／預約**：電話與 LINE 做成兩塊並排的大色塊（紅／群青），不做假表單。
- **頁尾**：深群青箱底＋12px 紅色上緣。

## 動效規則

| 種類 | 本站實作 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient | 標籤裡的雲左右飄、果葉擺；輸送帶待機時帶子在走；BG-B-08 季節帶 | 自動 | 雲 14s／19s `ease-in-out alternate`；葉 6s／7.5s ±2.5° | 全停，畫面完整 |
| input | 分級鍵一按，踢板甩起＋按鍵下壓（<16ms）；等級卡 hover 翹角；吊牌擺 | 鍵盤／指標 | 踢板 0.12/幀衰減；卡片 `.22s cubic-bezier(.3,1.5,.5,1)` | 無過渡，狀態照變 |
| transition | 換頁時一個貼好標籤的木箱頭沿滾筒由右推入、新頁再推出左邊（WAAPI） | 點內部連結 | 460ms／560ms `cubic-bezier(.55,0,.25,1)` | 直接換頁 |
| signature | **拖動標籤上的太陽**：天色、遠山陰影、果樹暗面、柑仔暗面與亮點的石版點描即時重新長出顆粒；太陽 x 對應 06:00–18:00 | 拖曳／方向鍵 | 每 rAF 只改 7 個屬性 | 不做開場落日，拖曳照常 |

自我限制：不用淡入、不用視差、不用模糊；所有「動」都是印刷品會有的動作（貼、擺、推、踢）。

### motion-library 元件（1.26.0 @9ba51588）

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 性質 |
|---|---|---|---|---|---|
| 首頁 | TXT-A-36 | Long Shadow | text「等級就是標籤」、primary `#1E3A8C`、secondary `#C1301F`、bg `#F3E3BC`、duration 1.6、once | 標題長出實色斜投影——就是特徵②的品牌字投影，零模糊 | transition（一次） |
| 首頁 | BG-B-08 | Halftone Sun | primary `#EE8A1A`、secondary `#F6CE4E`、bg `#1E3A8C`、duration 10、density 1.1、seed 31 | 季節帶背後的網點放射太陽：標籤常見的日芒，且本身是點，與特徵③同一種調子語言 | ambient |
| 上輸送帶 | BG-B-37 | Minimal Stripes | primary `#2E6B33`、secondary `#1E4A24`、bg `#14275E`、duration 6、density 2 | 開始前面板下的綠色帶條在走＝輸送帶 | ambient |
| 上輸送帶 | TXT-B-08 | Number Slam | text＝正確率數字、primary `#C1301F`、bg `#F3E3BC`、duration 1.3、once | 收工時正確率像橡皮章一樣砸在紙上 | transition（事件） |
| 訂一箱 | TXT-A-13 | Ribbon | text「訂一箱」、primary `#C1301F`、bg `#F3E3BC`、duration 1.4、once | 紅絲帶展開＝特徵⑤的產地絲帶 | transition（一次） |
| 訂一箱 | TXT-B-26 | Swing Letters | text「週末來採果」、primary `#F6CE4E`、bg `#2E6B33`、duration 2.2、once | 字一個個像吊牌掛在繩上擺——對應吊牌導覽 | transition（一次） |

掛載包裝 `KG.ml()`：等 `document.fonts.ready` 才掛、離屏 `destroy()`、一次性文字 `loop:false` 進視窗播一次、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。元件開發 Prompt 見 `MotionLib.prompt(id)`。

## 插畫與圖像風格

全站零圖檔。所有圖像是同一支標籤產生器：場景（點描天空 → 太陽 → 平塗雲 → 遠山＋點描暗面 → 雪頂＋點描暗面 → 綠丘 → 果園兩階圓 → 標誌物〔河與紅橋／水牛剪影〕）→ 絲帶 → 品牌字 → 等級徽 → 越框的果實。物件一律平塗、零描邊（框線除外）、零光澤、零模糊陰影。

## Logo 與 Favicon 設計指南

Logo 是一張縮小的箱頭標籤：奶油外緣、群青底、紫色山與雪頂、一顆橘色果與一片綠葉、底下一條紅絲帶；文字「雪山牌 SUAT-SUANN BRAND」在右。Favicon 只留標籤本身（64×64），16px 時仍讀得出「藍底＋橘圓＋紅條」。

## Do & Don't

- ✅ 每一頁都要看得到木頭與貼上去的紙。
- ✅ 等級／方案一律用不同的標籤區分，不用徽章色票。
- ✅ 漸層只能是點描；換色只能是另一塊平塗墨。
- ❌ 禁止平滑 CSS 漸層當畫面（木紋的硬停點條紋除外）、禁止 `filter:blur`、禁止模糊陰影、禁止玻璃擬態。
- ❌ 禁止把標籤做成扁平 icon 卡片；標籤必須有場景與越框的果子。
- ❌ 去AI化：禁紫藍漸層、置中三卡片模板（本站三張卡是三張實際標籤，且下方附規則與價格）、emoji icon、Lorem ipsum、EST. 19xx 徽章（本風格用的是「PACKED BY」與箱號）。
- ❌ 禁用 `baseFrequency` 為 .5、.25、1 的 feTurbulence（見特徵③）。

## 頁面骨架範例

```html
<body><!-- body 背景＝var(--pine) -->
 <a class="brand" href="index.html">…縮小標籤 logo…<b>雪山牌</b></a>
 <nav class="tags"><a href="index.html" aria-current="page"><b>箱頭</b><small>HOME</small></a>…</nav>
 <main>
  <section class="hero">
   <p class="stencil">TUNG-SHIH · TAIWAN · 淨重 10 台斤 · 此面向上</p>
   <div class="lblwrap" tabindex="0" role="slider" aria-label="標籤上的太陽位置">
    <svg viewBox="0 0 1100 1000"><!-- 特徵①②③④⑤ --></svg>
   </div>
   <p class="stencil">No. 1964-1031 · 特選 FANCY</p>
  </section>
  <section class="paper"><h2>劉家青果集貨場</h2>…</section>
 </main>
 <footer class="foot">…</footer>
</body>
```

## 技術實作與相容性

| 技術 | 本站承載 | 支援現況與查證 | 不支援時 |
|---|---|---|---|
| **SVG 濾鏡點描**：`feTurbulence`＋`feComponentTransfer`＋`feComposite operator="arithmetic"`＋`discrete` 閾值，作為 `<mask>` 內容 | 特徵③全部調子、signature | MDN〈feTurbulence〉〈feComposite〉〈feComponentTransfer〉皆 Baseline Widely available；SVG `<mask>` 全瀏覽器支援。建置時以 resvg 0.48.1 逐張算圖檢查，發現 `baseFrequency=.5` 的格點退化（點描變硬邊圓盤）後改為 .57／.63／.71 | 無 JS 時濾鏡照常運作，標籤完整（太陽停在預設 13:10）；濾鏡失效的極舊瀏覽器只看到平塗底色與所有文字 |
| **requestAnimationFrame 物理積分** | 上輸送帶：果子在帶上依帶速滾動（角速度＝帶速／半徑）、被踢起後做拋體（g＝1500 單位/s²）並以 0.32 恢復係數落箱反彈；首頁開場落日 | rAF Baseline Widely available | reduced-motion：首頁不做開場落日；遊戲仍可玩（玩家自己在動） |
| **鍵盤為主要操作** | 遊戲以 1／2／3（或 ←／↓／→）分級、Enter 開始；首頁太陽以方向鍵移動（`role="slider"`、`aria-valuetext` 為時刻） | `KeyboardEvent.key` Baseline Widely available（MDN） | 觸控有三顆大鍵；指標可直接拖太陽 |

**效能**：每頁 ≤338KB（首頁 337.6KB 含 4 張標籤 SVG 與 230KB 元件子集）。signature 每幀只改 7 個 SVG 屬性，瀏覽器重算受影響的 6 張 mask 濾鏡；拖曳以 rAF 合併為每幀一次。遊戲畫布 1200×640 邏輯座標、每幀 <100 個繪製呼叫；同畫面同時運轉的 motion-library 元件 ≤1。首屏 JS 只綁事件與一個 1.8 秒的開場落日。

**查證來源**：MDN Web Docs〈&lt;feTurbulence&gt;〉〈&lt;feComposite&gt;〉〈&lt;feComponentTransfer&gt;〉〈KeyboardEvent.key〉〈requestAnimationFrame〉；Huntington Library〈Jay T. Last Collection of Citrus Labels〉finding aid（OAC）：1880–1960、多數 1910–1930、Western Lithograph Co.／Schmidt Lithograph Co.。
