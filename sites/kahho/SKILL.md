---
name: postpunk-catalogue
description: Post-punk record-label graphics (Factory Records / Peter Saville, Manchester 1978–1992) - catalogue numbers set larger than names, non-linguistic colour-code identifiers, industrial hazard signage lifted at full scale, matte alkyd ground with hairline rules, no radius and no shadow.
---

# 後龐克唱片行政風 Factory Records／Peter Saville

## 一、設計哲學

一九七八年，Factory Records 在曼徹斯特成立。它做的第一件事不是出唱片，是**發一個編號**——FAC 1 是一張海報。此後這套編號吞掉了所有東西：唱片是 FAC，海報是 FAC，一間夜店（The Haçienda）是 FAC 51，一場官司是 FAC 61，一具棺材是 FAC 501。Peter Saville 替這家公司做的封面，把這個荒謬的行政習慣變成了視覺語言：**編號比名字大，識別碼不是文字，資訊被扣住不解釋。**

〈Blue Monday〉的封套上沒有團名、沒有曲名，只有一個模切成 5.25 吋磁片形狀的紙套，和沿著邊緣的一列色塊。那列色塊是一組密碼，解碼表印在另一張唱片的封套背面。你買了唱片，拿到的是一件不肯自我說明的東西——你得自己去找那張表。

同一時期，Ben Kelly 把 Haçienda 的室內做成一座工廠：黃黑斜紋的危險帶、路面反光釘、混凝土、烤漆鋼樑，全部照工業尺寸原物照搬，沒有一處被「設計得可愛一點」。

這個風格的三個信念：

1. **行政系統就是識別系統。**一套統一的編號套在互不相干的東西上（一棟樓、一台除濕機、一條規矩、一場淹水），編號本身產生張力與幽默。
2. **識別碼不必是文字。**色碼、模切形狀、目錄號都比名字更能標定一件東西。名字是給別人看的。
3. **不解釋。**版面不設引導、不寫「我們是一家…」。資訊是有的，全部都在，只是它排成一份簿冊而不是一篇推銷。

它**不是**極簡主義。極簡是拿掉東西，這個風格是把工業現場的東西整塊搬進來——危險帶、地磅、門牌、簿冊——只是拒絕替它們加上任何裝飾或說明。

---

## 二、本風格的 5 個不可省略特徵

> 拿掉其中任何一項，畫面就不再是這個流派。每一項都附可直接複製的片段。

### 特徵 1　編號先於名稱，而且比名稱大

每一個物件都帶一個目錄號，**號碼排在名稱前面，字級是名稱的 1.3–2.4 倍，字重 700，名稱 400**。號碼不解釋自己代表什麼。這是本流派唯一不能商量的排版規則——Factory 的 FAC 51 印得比「The Haçienda」還大。

```css
.c-no{ font: 700 19px/1 'Archivo', sans-serif;
       font-variant-numeric: tabular-nums; letter-spacing:.01em; white-space:nowrap }
.c-nm{ font: 400 14px/1.55 'Archivo', sans-serif }   /* 名稱一律比號碼小 */
.rcpt .rno{ font-size:54px; font-weight:700; line-height:.95 }  /* 單據上號碼是主角 */
```

**判準**：把頁面上所有中文遮掉，讀者仍應看得出「這是一份有編號的清單」。

### 特徵 2　非文字識別碼（色碼帶）與被扣住的解碼表

版面上至少要有一個**不是文字的主識別碼**，而它的解碼表必須放在**另一頁**。色碼帶的硬規則：等寬色格、**零間距、零外框線、零圓角**，整條外圈一道 2.5px 墨框，中間可插一格墨黑「墨隔」。長度即資訊。

```css
.cb{ display:inline-flex; height:19px; width:max-content;
     border:2.5px solid #15171A; background:#15171A }   /* 底色＝墨，格與格之間不留縫 */
.cb i{ width:8px; flex:0 0 8px; display:block }
.cb i.sep{ width:5px; flex:0 0 5px; background:#15171A;
           box-shadow: inset 0 0 0 1px #C3CBB4 }        /* 墨隔：唯一的非色譜格 */
```

```html
<span class="cb" role="img" aria-label="色碼帶：甲-078 除濕機一台，共 10 格">
  <i class="k2"></i><i class="k1"></i><i class="k22"></i><i class="k0"></i>
  <i class="sep"></i><i class="k7"></i><i class="k19"></i><i class="k13"></i>
</span>
```

**判準**：首屏必須有一件東西，讀者知道它在指涉什麼，但不知道它說什麼。

### 特徵 3　工業安全標示原物照搬（45° 危險帶）

黃黑斜紋帶。**角度固定 45°、單條寬度 12px（週期 24px）、只有兩色、上下各壓一道 2.5px 墨線**。不得改成漸層、不得改成圓角、不得改成品牌色。它是從卸貨口搬進來的，不是畫出來的。

```css
.chev{ height:15px;
  border-top:2.5px solid #15171A; border-bottom:2.5px solid #15171A;
  background-image: repeating-linear-gradient(45deg,
      #F0C000 0 12px, #15171A 12px 24px);
  background-size: 33.94px 33.94px;      /* 24 ÷ cos45° ＝ 水平週期，動起來才無縫 */
  animation: crawl 3.2s linear infinite }
@keyframes crawl{ from{background-position:0 0} to{background-position:33.94px 0} }
```

同一組語彙的小尺寸版本用在「空的、未指派的」東西上（空倉位、空欄位），週期縮為 10px。

### 特徵 4　冷色工業烤漆地 ＋ 高彩度只在識別碼裡

地色是啞光烤漆——**零紙紋、零顆粒、零漸層、零暈影**。全站的高彩度顏色**只准出現在色碼帶與危險帶裡**，不得當連結色、按鈕色、標題色或品牌色。介面顏色只有四個：地、墨、紙、廠務藍；紅只給退件。

```css
:root{
  --grn:#C3CBB4;  /* 機具烤漆綠：大面積地色，絕不加任何材質 */
  --blu:#1C3A63;  /* 廠務藍：次要文字、頁尾底 */
  --ink0:#15171A; /* 墨：所有線與正文 */
  --pap:#F4F5F0;  /* 紙：長文一律在紙上，不在地上 */
  --yel:#F0C000;  /* 危險黃：只在 45° 斜紋與 hover 上 */
  --red:#C8102E;  /* 訊號紅：只給退件與拒絕 */
}
body{ background:var(--grn) }  /* 不准 background-image、不准 noise、不准 filter */
```

### 特徵 5　硬線分格、零圓角、零陰影；深度只來自模切孔

分隔一律實線：**主線 2.5px、次線 1.5px、全站 `border-radius:0`、全站沒有一個 `box-shadow` 模糊值**。需要層次時，唯一允許的手法是**模切孔**——在一塊實色板上挖一個洞，露出底下那一層。

```css
*{ border-radius:0 }
.diecut{ position:relative; background:#B4BDA3; border:2.5px solid #15171A; overflow:hidden }
.diecut .under{ position:absolute; left:50%; top:42%; transform:translate(-50%,-50%); z-index:1 }
.diecut .plate{ position:absolute; inset:0; z-index:2;
  background: radial-gradient(circle 74px at 50% 42%, transparent 0 74px, #15171A 74px) }
```

按下狀態用**實心位移色塊**而不是陰影：

```css
.nav a[aria-current] .st{ box-shadow: 0 4px 0 0 #15171A }  /* 位移色塊，blur 必須是 0 */
```

---

## 三、色彩系統

| 色 | Hex | 用途 | 面積比 |
|---|---|---|---|
| 機具烤漆綠 | `#C3CBB4` | 全站地色。啞光，零材質 | ~34% |
| 烤漆綠（暗） | `#B4BDA3` | 模切板底層、平面圖底 | ~5% |
| 烤漆綠（亮） | `#D2D8C7` | 表格列、可點方格 | ~7% |
| 墨黑 | `#15171A` | 所有分隔線、正文、色碼帶外框、章節橫幅底 | ~22% |
| 紙白 | `#F4F5F0` | 卡片與長文載體（**長文一律在紙上，不在地上**） | ~11% |
| 廠務藍 | `#1C3A63` | 次要文字、頁尾滿版底、focus ring | ~14% |
| 危險黃 | `#F0C000` | 45° 斜紋、hover、章節號碼 | ~6% |
| 訊號紅 | `#C8102E` | **只給退件與拒絕**，不得作強調色 | ≤1.5% |

### 二十四色色譜（識別碼專用）

色譜**只寫死一個顏色**：基準墨。其餘二十三色以 CSS 相對顏色語法從它算出來——色相偏移固定、飽和與明度按調子乘固定倍率。因此換一批墨，整面色譜連同全站每一條色碼帶一起換色，而彼此的關係一格不動。

```css
:root{ --ink: hsl(212 58% 44%); }               /* 甲批．唯一寫死的顏色 */
@supports (color: hsl(from red h s l)){
  :root{
    /* 8 個色相 × 3 個調子；j 為色相序、k 為調子序，index = j*3 + k */
    --c00: hsl(from var(--ink) calc(h + -198) calc(s * 1.100) calc(l * 0.659)); /* 朱深調 */
    --c01: hsl(from var(--ink) calc(h + -198) calc(s * 1.000) calc(l * 1.000)); /* 朱正調 */
    --c02: hsl(from var(--ink) calc(h + -198) calc(s * 0.621) calc(l * 1.459)); /* 朱淺調 */
    /* … 色相偏移依序 -198 / -153 / -108 / -63 / -18 / +27 / +72 / +117 … */
  }
}
```

三個調子的乘數固定為 **深 (s×1.100, l×0.659) ／ 正 (×1.000, ×1.000) ／ 淺 (s×0.621, l×1.459)**。

**表定字位**（可逐格讀回的十四個符號）：數字 0–7 用正調 → index 1、4、7、10、13、16、19、22；數字 8、9 用深調 → index 0、3；四個號段字用淺調 → index 2、5、8、11。**看調子就知道那一格是數字還是號段。**其餘所有字位以 FNV-1a 雜湊落色（見第十一章），因此色碼是識別碼、不是譯碼。

### 調色盤禁令

- 不得用紫藍漸層、不得用任何 `linear-gradient` 當地色。
- 高彩度只准出現在色碼帶與危險帶裡。連結不是彩色的，按鈕不是彩色的。
- 灰階不得有暖偏；地色不得換成純白或純黑（那是別的流派）。

---

## 四、字體系統

兩支，一支工業一支古典，**故意不搭**——這是 Saville 的核心手法（把古典的東西擺進工廠的版面裡）。

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

| 角色 | 字體 | 設定 |
|---|---|---|
| 全站介面、號碼、標籤 | **Archivo** 400/500/600/700 | `font-variant-numeric: tabular-nums` 全域開啟 |
| 長文、館規、敘事段落 | **EB Garamond** 400/500/italic | 17–19px／1.55–1.72，**只出現在紙白卡片上** |

字級階梯（桌機）：

```
單據號碼 54 / 平面圖號碼 34 / 目錄號 19 / 內文 15 / 長文（襯線）17
標籤 11–13（letter-spacing .16–.24em，600）/ 註記 10.5–11.5
```

規則：

- **章節標題不是大字，是小字加寬字距**：`font-size:13px; letter-spacing:.24em; font-weight:600; border-bottom:2.5px solid`。畫面上最大的字永遠是號碼，不是標題。
- 全站禁用等寬字型（那是工程製圖語彙）。要對齊數字用 `tabular-nums`。
- 中文不設額外字重，靠 Archivo 的西文字重帶動；不得使用系統預設無設定的字體堆疊。

---

## 五、版面與網格

### 5.1 一套主軌統治全文件（subgrid）

本流派最重要的版面規則：**同一份清單裡，每一列的內部欄位都對齊到同一組欄軌**，即使每一列各自是有邊框、有背景、內容長短不一的獨立區塊，即使它們還被分組標題再包了一層。用 subgrid。

```css
.reg{ display:grid;
      grid-template-columns:
        max-content minmax(10.5rem,1fr) max-content max-content minmax(5.5rem,.95fr);
      border-top:2.5px solid #15171A }
.ser{ grid-column:1/-1; display:grid; grid-template-columns:subgrid }   /* 分組層 */
.serh{ grid-column:1/-1 }                                               /* 分組標題橫跨 */
.ent{ grid-column:1/-1; display:grid; grid-template-columns:subgrid;    /* 資料列 */
      border-bottom:1.5px solid #15171A; align-items:baseline; padding:9px 0 }
.ent > *{ padding:0 10px }

@supports not (grid-template-columns: subgrid){
  .ser,.ent{ grid-template-columns: 5.9rem minmax(10.5rem,1fr) 12.6rem 6.6rem minmax(5.5rem,.95fr) }
}
```

第 1、3、4 軌刻意用 `max-content`：沒有 subgrid 時每一列各自量自己的內容，日期欄出現「1998-11-04」與「日期不詳」兩種寬度就會整欄錯開；有 subgrid 時七十幾列共用同一組已解析軌道。fallback 改寫成固定 rem 值，對齊退化為近似，資訊零損失。

### 5.2 版面骨架

- 頁寬上限 `1180px`，左右 padding 22px。
- 頁首上緣**必有一條危險帶**（15px）；頁中換節時可再放一條（`.rev` 反向爬行）。
- 主要區塊只有三種：**簿冊（subgrid 清單）／紙白卡片（長文）／滿版藍色塊（次要行動）**。不得出現「置中三張圓角卡片」。
- 不對稱：清單頁右側留 268–330px 的固定欄放面板或模切孔圖，左欄流動。
- 留白規則：區塊之間 30px，**不用留白做層次，用線做層次**。

### 5.3 RWD

```
≤900px  欄軌降為 4 軌（隱藏「附註」欄）；導覽攤成整寬四格並全部顯示標籤；色譜由 8×3 改為 4 欄流排
≤560px  欄軌降為 2 軌（號碼＋名稱）；色碼格寬 8px→6px；地址列隱藏（頁尾仍有全文）
```

---

## 六、元件配方

### 6.1 版頭 masthead

左：60×60 實心墨方塊商標（含模切孔）。中：商號 + 10.5px 英文副名（`letter-spacing:.26em`）。右：地址電話小字（11.5px 廠務藍）。導覽貼在右下角。**底部一道 2.5px 墨線，沒有陰影、沒有毛玻璃、不 sticky。**

### 6.2 色碼籤導覽（cipher-tab）

四個頁籤各是一條 4 格色碼，**沒有文字**；現用頁的標籤被印出來，其餘三個標籤 `color:transparent`，hover／focus 於 90ms 內顯字。現用態不靠底色高亮，而靠一塊 4px 的實心位移色塊。

```css
.nav a{ padding:0 11px 5px; border-left:2.5px solid #15171A }
.nav a:last-child{ border-right:2.5px solid #15171A }
.nav .st{ display:flex; height:22px; width:56px; border:2.5px solid #15171A; background:#15171A }
.nav .st i{ flex:1 }
.nav .lb{ display:block; height:14px; margin-top:5px; font:600 10px/1 'Archivo',sans-serif;
          letter-spacing:.16em; color:transparent; transition:color .09s linear }
.nav a:hover .lb, .nav a:focus-visible .lb{ color:#1C3A63 }
.nav a[aria-current] .lb{ color:#15171A }
.nav a[aria-current] .st{ box-shadow:0 4px 0 0 #15171A }
@media(max-width:900px){ .nav .lb{ color:#15171A } }   /* 手機一律顯字 */
```

**可用性保底（必做）**：每個頁籤內放一個 `.sr` 螢幕閱讀器文字；頁尾必須有一組完整的文字連結；≤900px 標籤永遠可見。

### 6.3 按鈕

零圓角、零陰影、2.5px 墨框、字距 .14em、hover 換成危險黃。

```css
.btn{ display:inline-block; font:600 13px/1 'Archivo',sans-serif; letter-spacing:.14em;
      padding:13px 20px; background:#15171A; color:#C3CBB4; border:2.5px solid #15171A; cursor:pointer }
.btn:hover,.btn:focus-visible{ background:#F0C000; color:#15171A }
.btn.gh{ background:transparent; color:#15171A }
.btn[disabled]{ background:#B4BDA3; border-color:#B4BDA3; color:#F4F5F0; cursor:not-allowed }
```

### 6.4 表單與退件

輸入框：紙白底、2.5px 墨框、無圓角。**退件不是紅字提示，是一張退件單**——左緣 9px 訊號紅實心條，並且要**點名是哪一條規矩擋下你的**。

```css
.reject{ border-left:9px solid #C8102E; background:#F4F5F0; padding:14px 16px; margin:14px 0 }
.reject b{ display:block; color:#C8102E; font-size:12px; letter-spacing:.1em; margin-bottom:4px }
```

### 6.5 頁尾

滿版廠務藍、三欄、12px。連結是廠務綠底線字，hover 反成危險黃。頁尾必須重複全部營業資訊與全部頁面連結（因為導覽是密碼）。

---

## 七、動效規則

四種，缺一不可。四種都必須有 `prefers-reduced-motion` 降級，且降級後資訊零損失。

| 類型 | 名稱 | 觸發 | 規格 |
|---|---|---|---|
| ambient | **危險帶爬行** | 無 | `background-position` 位移一個水平週期 33.94px，3.2s linear infinite。降級：停在 `background-position:6px 0`，外觀不變 |
| input-driven | **逐格報號** | `pointerover` 色碼格 | 格子 `transform:translateY(-4px)`，transition 70ms linear；同時把該格的色號寫進同列的讀數欄。延遲 <100ms。降級：不位移，讀數照常 |
| transition | **模切孔開啟** | 步驟／頁面切換 | `clip-path: circle(0% at 22% 34%)` → `circle(145% …)`，340ms `cubic-bezier(.2,.8,.3,1)`。降級：直接顯示 |
| signature | **色碼落樣 code-stamp** | 送印 | 見下 |

### 簽名動效：色碼落樣

發號的瞬間，機台上那條二十四色的**色譜軌**被一個墨黑三角標尺由左至右掃過；標尺每停在一個色上，那一格顏色就**垂直掉進**下方色碼帶的下一個空格。色譜不會因此變少（那是專色，不是被消耗的）。

```css
.scan{ position:absolute; top:-13px; left:0; width:15px; height:11px; background:#15171A;
       clip-path: polygon(50% 0, 100% 100%, 0 100%);
       opacity:0; transition: transform .12s steps(4,end) }
.scan.run{ opacity:1 }
.cb.stamping i.pend{ visibility:hidden }
.cb i.drop{ animation: drop .18s steps(3,end) both }
@keyframes drop{ from{ transform:translateY(-46px) } to{ transform:translateY(0) } }
```

節奏：標尺移動 130ms → 落格 → 停 60ms → 下一格。十二格約 2.3 秒。

**`steps()` 是規格的一部分**：本流派沒有彈跳、沒有 ease-out 的柔軟收尾、沒有淡入。東西是被沖壓下去的，不是飄下來的。

**避免 layout thrashing 的實作要求**：開始落樣前**一次性**讀完色譜軌二十四格的座標並快取，之後整段動畫只寫 `transform`，不再量測。

**降級**：`prefers-reduced-motion: reduce` 時整條色碼帶一次寫齊、標尺不出現，發出的號碼與色碼完全相同。

### 全站自我限制

禁用淡入（`opacity` 補間）作為進場、禁用視差、禁用捲動揭示、禁用數字滾動計數。以上四項是本流派的反面。（四種動效總數仍為 4，不受此限制影響。）

---

## 八、插畫與圖像風格

**全站不得有任何外部圖片、不得有寫實描繪、不得有細線幾何線描、不得有半調網點。**所有圖像由三種原語組成，且僅由這三種組成：

1. **色碼帶** — 等寬硬邊色格橫排，零間距零圓角，外圈一道墨框。承載「這是誰」。
2. **危險斜紋帶** — 45°、12px 條寬、只有黃黑兩色、上下壓墨線。承載「這裡有狀況／這裡是空的」。
3. **模切孔** — 實色板上的一個圓洞，露出底下那一層。承載「深度」與「這是一件被開過洞的印刷品」。

logo、favicon、平面圖、單據印記、章節裝飾全部由這三種組成。

**判準**：把全部文字遮掉，讀者仍要讀得出「這是一段被編碼的字串，而且它有多長」。色碼帶的長度是它唯一的量。

**與相近技法的界線**：色碼帶編碼的是一個**字串的身分**（等高、只有色相變化）；它不是把一列數字畫成高度不同的柱子（那是資料條），也不是把一條路徑畫成折線（那是軌跡）。本技法沒有量值、沒有順序關係，只有身分與長度。

---

## 九、Logo 與 Favicon

**Logo**：140×140 墨黑實心方塊。上方一個直徑 80 的模切圓孔，露出地色；孔內以**矩形拼出**一個字（不用字型，因為 logo 不能依賴字體載入）。下緣一條危險帶（12px 高，八個 45° 斜齒），最底一條四格色碼——編的就是商號本身。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <rect width="140" height="140" fill="#15171A"/>
  <circle cx="70" cy="56" r="40" fill="#C3CBB4"/>
  <!-- 字以矩形拼出 -->
  <rect x="38" y="32" width="64" height="11" fill="#15171A"/>
  <rect x="64.5" y="18" width="11" height="84" fill="#15171A"/>
  <rect y="104" width="140" height="12" fill="#F0C000"/>
  <path d="M0 116 12 104h9L9 116z …" fill="#15171A"/>   <!-- 45° 斜齒 -->
  <rect x="0" y="116" width="35" height="24" fill="#c59283"/>  <!-- 色碼四格 -->
</svg>
```

**Favicon**：同一套語彙縮到 32×32——墨方塊、模切圓孔、下緣 7px 危險帶。以 inline SVG data URI 寫在 `<head>`，**不得用外部檔案、不得用 emoji**。

---

## 十、Do & Don't

**Do**

- 讓號碼比名字大，而且不解釋號碼。
- 把互不相干的東西編進同一套號碼（一棟樓和一台除濕機同列）——這是本流派的幽默感所在。
- 長文一律放在紙白卡片上，用襯線體；地色上只放清單、線與號碼。
- 每一次拒絕都要指名是哪一條規矩擋下的。
- 危險帶照工業尺寸原物照搬。

**Don't**

- ✗ 不要圓角、不要模糊陰影、不要毛玻璃、不要漸層地色。
- ✗ 不要把高彩度顏色拿去當按鈕色或連結色——彩色只屬於識別碼。
- ✗ 不要淡入、不要視差、不要捲動揭示、不要數字滾動計數。
- ✗ 不要 emoji 當 icon、不要 Lorem ipsum、不要「在當今快節奏的世界」。
- ✗ 不要「EST. 19xx」徽章、不要「老街屋改建」開場、不要「把 X 變成 Y」標題。
- ✗ 不要在地色上鋪紙紋、顆粒或 noise——啞光烤漆是本流派地色的本體。
- ✗ 不要把導覽做成置頂列 + 高亮底色。現用態靠實心位移色塊或「只有它被解碼」。
- ✗ 不要讓解碼表跟識別碼放在同一頁。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>簿冊｜某某行號</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2315171A'/%3E%3Ccircle cx='16' cy='13' r='7.5' fill='%23C3CBB4'/%3E%3Crect y='25' width='32' height='7' fill='%23F0C000'/%3E%3C/svg%3E">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
</head><body>

<div class="chev" aria-hidden="true"></div>

<header class="mast"><div class="wrap in">
  <a class="mark" href="index.html" aria-label="回簿冊">…模切孔商標…</a>
  <h1>某某行號<small>SOMETHING CO.　乙-001</small></h1>
  <div class="addr">地址<br>電話　營業時間</div>
  <nav class="nav" aria-label="主導覽">
    <a href="index.html" aria-current="page">
      <span class="st" aria-hidden="true"><i class="k2"></i><i class="k15"></i><i class="k11"></i><i class="k10"></i></span>
      <span class="lb">簿冊</span><span class="sr">簿冊 THE REGISTER</span></a>
    …其餘三個…
  </nav>
</div></header>

<main><div class="wrap">
  <!-- 開場：不是 hero，是簿冊本身 -->
  <div class="regcap">
    <span class="rule">丙-001　號碼一經發出，不收回、不重複、不轉讓。</span>
    <span class="cnt">簿上現有 <b>29</b> 條號碼</span>
  </div>

  <div class="reg">
    <section class="ser">
      <h2 class="serh"><b>甲</b> 物　<span>經過這裡的東西</span><em>8 條</em></h2>
      <article class="ent">
        <div class="c-no">甲-078</div>
        <div class="c-nm">除濕機一台<span class="who">王志男</span></div>
        <div class="c-cb"><span class="cb" role="img" aria-label="色碼帶">…</span>
                          <span class="cbread" aria-hidden="true"></span></div>
        <div class="c-dt">2019-05-21</div>
        <div class="c-nt">附水桶</div>
      </article>
    </section>
  </div>

  <!-- 長文一律在紙上 -->
  <div class="blk"><div class="pap">
    <h2 class="sec">怎麼運作 <span>丙-002</span></h2>
    <p>（EB Garamond 17px／1.72）…</p>
  </div></div>
</div></main>

<footer><div class="wrap in">…三欄，全部營業資訊與全部頁面文字連結…</div></footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站以三項技術承載上述視覺特徵，分屬三個不同的層（版面／渲染／資料生成）。

### 12.1 CSS Grid `subgrid`（C 版面與樣式層）——承載特徵 1 與 5.1

**它承載什麼**：整份簿冊七十餘列的內部欄位對齊同一組欄軌。每一列是有自己邊框與 hover 底色的獨立 `<article>`，還被 `<section>` 分組再包一層；`display:contents` 會犧牲掉列的邊框與底色，媒體查詢則無法讓 `max-content` 軌跨列協商。

**支援現況（2026-08-28 查證）**：Firefox 71（2019）率先支援，Safari 16.0（2022）、Chrome 117（2023-09-12）、Edge 117（2023-09-15）跟上；**Baseline Newly available 2023-09-15，Baseline Widely available 2026-03-15**，全球覆蓋 >92%。來源：[MDN Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid)、[caniuse css-subgrid](https://caniuse.com/css-subgrid)、[web.dev CSS subgrid](https://web.dev/articles/css-subgrid)。

**Fallback 具體行為**：`@supports not (grid-template-columns: subgrid)` 時，`.ser` 與 `.ent` 各自宣告一組**固定 rem 值**的相同軌道（`5.9rem / minmax(10.5rem,1fr) / 12.6rem / 6.6rem / minmax(5.5rem,.95fr)`）。欄位仍分五欄、仍全部可讀，只是欄寬由固定值而非內容協商決定，日期欄在極端內容下可能有 2–4px 的視覺落差。資訊零損失。

### 12.2 CSS 相對顏色語法 `hsl(from …)`（A 渲染層）——承載特徵 2 與 4

**它承載什麼**：二十四色色譜只寫死一個基準墨，其餘二十三色由它算出（色相偏移固定、飽和與明度按調子乘固定倍率）。因此「換一批墨」是改一個自訂屬性，整站每一條色碼帶、平面圖色塊、單據印記同時換色而彼此關係不變。用二十四個寫死的 hex 做不到這件事——那會變成二十四個各自為政的顏色，而不是一套從同一桶墨調出來的色譜。

**支援現況（2026-08-28 查證）**：Safari 16.4、Chrome 119 先行，**Firefox 128（2024-07-09）補齊三引擎，即為 Baseline Newly available 2024-07**；為 Interop 2024 項目之一。來源：[MDN Using relative colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors)、[caniuse css-relative-colors](https://caniuse.com/css-relative-colors)、[web.dev 2024-07](https://web.dev/blog/web-platform-07-2024)。

**Fallback 具體行為**：二十四個 `--cNN` 先以**靜態 hex 宣告**（甲批的實算值：`#79311b #b14d2f #c59283 #79781b …`），再在 `@supports (color: hsl(from red h s l))` 內以相對語法覆蓋。不支援的瀏覽器得到完全相同的甲批色譜，色碼帶、色譜對照表、平面圖全部照常；只有「換墨批」三顆按鈕停用，介面會明寫「本瀏覽器不支援相對顏色，固定甲批」。資訊零損失。程式端以 `CSS.supports('color','hsl(from red h s l)')` 偵測。

### 12.3 `Intl.Segmenter`（E 資料與生成層）——承載特徵 2 的正確性

**它承載什麼**：色碼帶一格對應一個**字位（grapheme cluster）**，不是一個 UTF-16 碼元。這決定三件事：帶子有幾格、十七格上限怎麼算、以及「同一個字恆得同一色」是否成立。用 `String.prototype.split('')` 會把組合字、ZWJ 序列與印度系文字拆碎，帶子的長度會說謊，而長度是本流派唯一的量。

實測（Node 22，`Intl.Segmenter('zh-Hant',{granularity:'grapheme'})`）：

| 輸入 | Segmenter 格數 | `split('')` 格數 |
|---|---|---|
| `王先生的除濕機` | 7 | 7 |
| `café`（e + 結合重音） | 4 | 4 |
| `👨‍👩‍👧‍👦 家當` | 4 | **14** |
| `अनुच्छेद` | 4 | **8** |

**支援現況（2026-08-28 查證）**：**Baseline Newly available 2024-04-16**，Firefox 125（2024-04）為最後補齊者，Chrome/Edge 87+、Safari 14.1+ 早已支援。來源：[MDN Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)、[web.dev Intl.Segmenter Baseline](https://web.dev/blog/intl-segmenter)、[caniuse](https://caniuse.com/mdn-javascript_builtins_intl_segmenter_segment)。

**Fallback 具體行為**：`window.Intl && Intl.Segmenter` 不存在時退回 `Array.from(str)`（依碼點切分，非碼元，所以基本多文種平面外的字仍是一格）。上限計數與落色用的是同一支函式，兩者一致，故十七格限制與色碼帶長度不會互相矛盾；差別只在含 ZWJ 的表情序列會被拆成多格。決定性不受影響：同輸入恆得同帶。

### 12.4 落色演算法與均勻度

表定十四個字位用固定表（見第三章）。其餘字位：`FNV-1a(UTF-8 bytes) mod 24`。

以 123 個常用漢字實測二十四格分布：最少 2、最多 11，χ² = 31.7（自由度 23，5% 臨界值 35.2）→ **在 5% 顯著水準下不能拒絕均勻分布**。這正是本站明文宣告「色碼是識別碼，不是譯碼」的量化依據：二十四格容不下一整套漢字，撞色是設計上被接受的結果，而不是瑕疵。

### 12.5 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline CSS/JS 全部資源） | 43.8 / 62.2 / 34.5 / 35.2 KB | ≤350 KB |
| 外部資源 | 僅 Google Fonts 兩支 | 零外部圖片／音檔 |
| 首屏 JS | 索引頁 2.0 KB、發號頁 10.1 KB，載入後只做事件綁定與一次 `localStorage` 讀取 | ≤100 ms |
| 主要動畫 | 危險帶為 `background-position`（合成器友善）；落樣只寫 `transform`；座標一次性批次讀取後不再量測 | 60 fps、無 layout thrashing |

### 12.6 無 JavaScript 行為

四頁的全部資料——簿冊七十餘條紀錄、四十一格平面與坪數／月租、二十四色色譜與十四個表定字位、館規全文、沿革、營業資訊——皆為建置階段輸出的靜態 HTML。需要 JavaScript 的只有：色碼逐格報號、平面圖側欄、換墨批、發號機與委託單即時檢核。四頁各有 `<noscript>` 明列哪些功能不可用與替代方式。
