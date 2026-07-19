---
name: dieline-blueprint
description: An industrial die-cut blueprint style where every rule on the page carries a manufacturing meaning - magenta cut lines, cyan dashed creases, yellow glue hatch - laid over a slate-teal press-room ground.
---

# 刀模展開圖 Dieline ／ dieline-blueprint

> 一套把「工程線型」當成設計語彙的視覺系統。畫面上的每一條線都不是裝飾，而是一道工序：
> 實線切斷、虛線壓陷、斜線網上膠。任何產業都能用——只要你願意讓版面承認自己是被製造出來的。

---

## 一、設計哲學

**線有語意，不只有粗細。**

一般網頁的分隔線只有「有」跟「無」；刀模上的線有三種身分，模切機會按身分執行不同動作。
這套風格把這件事整個搬進版面：主分隔線是刀線（洋紅實線），次分隔線是壓線（青色虛線），
需要「黏合、承接、繼續」的區域鋪糊區斜線網（黃色）。使用者不必知道印刷術語，
但他會感覺到「這條線跟那條線不一樣」，而且一致到底。

三條原則：

1. **底不是白的。** 這不是紙，是放紙的檯面。地色用中間調的鐵青（不是深藍黑，也不是米白），
   紙面只出現在需要承載長文的卡片上——版面於是有了「檯面／紙」兩個明確層級。
2. **零圓角、零陰影。** 鋼刀切不出模糊的邊。所有轉角都是 miter，所有立體感來自面片明暗，
   不來自 box-shadow。唯一允許的圓弧是「提孔」這類真的會撕裂的地方。
3. **數字用等寬字，而且帶單位。** 尺寸、代號、金額全部 tabular-nums，
   後面接 `mm`／`m²`／`個`。工程圖上沒有裸數字。

**不要做的事**：不要把這套風格當成「藍圖風」或「Wireframe 風」的變體。
藍晒圖是白線負片、線寬統一；本風格是**彩色線型分類系統**，線寬幾乎一致而**顏色與虛實承載意義**。
把三種線改成同一個顏色，這套風格就死了。

---

## 二、色彩系統

| 名稱 | hex | 用途 | 面積比 |
| --- | --- | --- | --- |
| 檯面鐵青 | `#2F4A52` | 全站地色 | ~48% |
| 檯面深青 | `#1E343A` | 畫布底、資料列、行動導覽 | ~7% |
| 檯面格線 | `#3B5A63` | 地色上的 48px 方格（1px） | — |
| 卡紙白 | `#EDE9DF` | 紙面卡片、長文底 | ~28% |
| 卡紙灰 | `#DBD4C4` | 次級紙面、糊區面、機台示意 | ~6% |
| **刀線洋紅** | `#E8006E` | 刀線、區塊主分隔、主要按鈕 hover | ~8% |
| **壓線青** | `#17B9E8` | 壓線虛線、次分隔、面片摺線 | ~6% |
| **糊區黃** | `#F2C200` | 糊區斜線網、尺寸標註、咬口、頁尾強調連結 | ~3% |
| 墨黑 | `#16262B` | 紙面上的文字與 1.5px 外框 | — |
| 次要墨 | `#4A5F66` | 紙面上的標籤與註解 | — |
| 檯面次要字 | `#A9BEC4` | 地色上的註解 | — |

三個訊號色**不可互換用途**。洋紅永遠是「切斷／邊界／此處為止」，
青色永遠是「彎折／延續／可以往下」，黃色永遠是「接合／對位／基準」。
一旦洋紅拿去做次要標籤，整套語意就崩了。

CSS 變數：

```css
:root{
  --bed:#2F4A52; --bed2:#1E343A; --bed3:#3B5A63;
  --cut:#E8006E; --crease:#17B9E8; --glue:#F2C200;
  --paper:#EDE9DF; --paper2:#DBD4C4; --ink:#16262B; --ink2:#4A5F66;
}
```

---

## 三、字體系統

| 角色 | 字體 | 字重 | 用法 |
| --- | --- | --- | --- |
| 標題 | **Barlow Condensed** | 700 | 窄體、`line-height:1.12`、`letter-spacing:.01em`。中文以 Noto Sans TC 700 接續同一個 stack |
| 數據／代號 | **Azeret Mono** | 400 / 600 | 所有尺寸、金額、代號、頁碼；`font-variant-numeric:tabular-nums` |
| 內文 | **Noto Sans TC** | 400 / 500 / 700 | `line-height:1.75`，16px |

```
Google Fonts：Barlow+Condensed:wght@500;600;700
              Azeret+Mono:wght@400;600
              Noto+Sans+TC:wght@400;500;700
```

字級 scale（rem 換算以 16px 為基準）：

| 用途 | px | 備註 |
| --- | --- | --- |
| 主標 h2 | 32–34 | 允許手動斷行做兩行構成 |
| 次標 h3 | 19–21 | |
| 內文 | 16 | 卡片內 14.5 |
| 表格 | 14 | 表頭 11.5，大寫、`letter-spacing:.14em` |
| 標籤 label | 12 | 大寫、`letter-spacing:.14em`、次要墨色 |
| 代號／註解 | 10.5–11 | Azeret Mono、`letter-spacing:.1em` |

**標籤一律 uppercase + 寬字距**，這是工程圖標註的語感來源；內文完全不加字距。

---

## 四、版面與網格

- 容器 `max-width:1240px`，左右 padding 22px。
- 地色上鋪 **48px 方格**（`linear-gradient` 兩道 1px `--bed3`），偏移 `-1px -1px`。
  這是切割墊的格線，不是裝飾網格——內容不必對齊它，反而要刻意錯開，才像東西「放」在檯面上。
- **不對稱主結構**：主要工作區採 `minmax(0,1fr) 316px`（或 `340px minmax(0,1fr)`）的雙欄，
  操作面板固定寬、視覺區流動。行動版單欄。
- 章節標題採 `1.1fr 1fr` 的 `.secttl`：左為兩行大標，右為齊底（`align-items:end`）的說明段。
  **不要置中大標**。
- 段落最大寬 `44–50ch`。
- 區塊之間用 `--cut` 的 1.5px 實線分隔；區塊內部用 `--crease` 的 1.5px 虛線分隔。
  這是本風格最重要的節奏規則。
- 資料列 `.statbar`：等分格，格與格之間 `1px dashed rgba(23,185,232,.45)`，外框 1.5px 洋紅、無上框
  （視覺上像是從上方畫布延伸下來的一條標註帶）。

---

## 五、元件配方

### 紙面卡 `.sheet`

```css
.sheet{background:var(--paper);color:var(--ink);border:1.5px solid var(--ink);position:relative}
.sheet::after{content:"";position:absolute;inset:5px;border:1px dashed rgba(22,38,43,.28);pointer-events:none}
```

外框是刀線（實線），內框是壓線（虛線）——即「這張紙會沿內框摺起來」。
`.sheet.k` 改用 `--paper2` 作次級紙。內距 `26px 24px`（`.pad`）。

### 頁首 `.slug`（不是 hero）

一條 `border-bottom:1.5px solid var(--cut)` 的規格橫條，`display:flex` 靠基線對齊，內含：
logo 標記（46px）→ 代號 `FP ／ F-01`（10–11px 黃色寬字距）→ 品牌名（Barlow Condensed 700, 30px, uppercase）
→ 地址兩行（12px `#A9BEC4`）→ `flex:1` 撐開 → 右端頁面英文代號。
**不置中、不留大片空白、不加副標與按鈕。**

### 按鈕

```css
.btn{border:1.5px solid var(--ink);background:var(--ink);color:var(--paper);
  padding:9px 17px;font-family:"Barlow Condensed";font-weight:700;font-size:15px;
  letter-spacing:.1em;border-radius:0;transition:background .13s,color .13s}
.btn:hover{background:var(--cut);border-color:var(--cut);color:#fff}
.btn.g{background:transparent;color:var(--ink)}            /* 次要 */
.btn.g[aria-pressed=true]{background:var(--cut);border-color:var(--cut);color:#fff}
```

**不位移、不投影**。狀態切換一律用整塊換色（模切機不會把東西往下壓一點點，它整片壓下去）。

### 表單

輸入框：`1.5px solid var(--ink)`、白底、Azeret Mono 14px、`border-radius:0`。
focus 用 `outline:2.5px solid var(--cut); outline-offset:1px`——洋紅框＝「這裡是邊界」。
label 為 12px 大寫寬字距；錯誤訊息 `.err` 為 12.5px `#B3005A` 等寬字，並預留 `min-height:1.2em` 避免跳動。

### 表格

`th` 用 11.5px 大寫寬字距、`border-bottom:1.5px solid var(--ink)`；
`td` 分隔線 `1px solid rgba(22,38,43,.22)`；數值欄 `.n` 靠右且等寬。
合計列用 `tfoot` 並加 1.5px 上框。

### 導覽（見第六章）

不使用置頂列。桌機為右上角一個立體方管，四個面即四頁；行動版（≤860px）改為固定底部四格，
每格是一片「攤平的面板」，含中文頁名與代號。頁尾另備完整連結清單保底。

### 頁尾

`border-top:1.5px solid var(--cut)`，三欄 `1.5fr 1fr 1fr`：聯絡資訊／頁面清單／窗口。
連結底線用 `1px dashed`，hover 轉黃。最後以 `1.5px dashed var(--crease)` 隔出一段 12.5px 的註記。

---

## 六、首創技術實作配方：剛性摺疊運動學

> 這是本風格的核心資產。任何要重現本風格的 AI 都應該實作它——
> 沒有它，這套配色只是好看的工業風皮膚。

### 6.1 資料結構

一個物件由若干**面片**組成，每片是攤平座標系（mm，x 向右、y 向下）中的一個多邊形：

```js
panel = {
  pts:   [[x,y], ...],   // 攤平後的輪廓
  holes: [[[x,y],...]],  // 選填，模切孔（開窗、提把）
  parent: <index|null>,  // 父面片；根面片為 null
  hinge: [[x1,y1],[x2,y2]], // 摺線（父子共用的那條邊）
  ang:   90,             // 完全摺起時的二面角
  kind:  'body'|'flap'|'glue',
  nm:    '前板'
}
```

**摺線必須寫在攤平座標系裡**，不是世界座標。這是整套方法能成立的關鍵。

### 6.2 摺疊求解

每片的世界矩陣（3×4 仿射）為：

```
M_root  = I
M_child = M_parent · R(hinge, φ)
φ       = s · ang · (π/180) · t
```

`R(hinge, φ)` 是繞「通過 hinge[0]、方向為 hinge[1]−hinge[0]」的軸的 Rodrigues 旋轉矩陣，
以攤平座標表達；`t ∈ [0,1]` 是全域摺疊度。**因為所有旋轉都表達在攤平座標系並由父矩陣左乘，
所以不需要為每片維護獨立的區域座標系**——把攤平頂點 `(x,y,0)` 丟進 `M` 就得到世界座標。

方向係數 `s` **自動求得**，不必人工標註山摺谷摺：

```js
u = normalize(hinge[1] - hinge[0])          // 摺線方向
r = centroid(panel.pts) - hinge[0]
r = r - (r·u)u                              // 取垂直分量
s = sign(u.x * r.y - u.y * r.x)             // (u × r) 的 z 分量
```

`s` 保證所有面片都朝同一側（+z）折起，這正是真實刀模的行為——一張紙上的壓線通常同向。
需要反摺（少數插舌）時在該片加 `rev:true` 取負。

### 6.3 投影

正交投影，先繞 Y（yaw）再繞 X（pitch）：

```js
x' =  x·cos(ay) + z·sin(ay)
z₁ = -x·sin(ay) + z·cos(ay)
y' =  y·cos(ax) − z₁·sin(ax)
z' =  y·sin(ax) + z₁·cos(ax)
```

視點置於 **+z**，因此 `z'` 越小越遠：面片依 `z'` **遞增排序後依序繪製**（畫家演算法）。
明暗取投影後法線的 z 分量：`shade = 0.62 + 0.38·|n_z|`，直接乘在填色上（不要用 opacity）。

**為什麼用正交而不是透視**：平面多邊形在正交投影下的像仍是仿射變換，
這讓第 6.5 節「把文字貼到面上」可以用一個精確的 `matrix()` 完成。透視會讓它變成非仿射，就得切成三角形。

### 6.4 線型的自動分類

一條邊是刀線還是壓線，不該由人標，而是由結構決定：

```js
edge(p,q) 為壓線  ⟺  存在某片的 hinge h，使得 p 與 q 都落在 h 上
其餘皆為刀線
```

判斷「點落在線段上」用投影參數 `u ∈ [−0.02, 1.02]` 且垂距平方 < 0.5（mm²）。
如此一來，把一個面片切成兩片、或改變親子關係，線型會自己跟著變。

### 6.5 把頁名貼到摺起的面上（導覽的作法）

面片是平面，正交投影下其像為仿射變換，故取矩形面片的三個頂點即可解出 SVG matrix：

```js
w = pts[1].x - pts[0].x;  h = pts[3].y - pts[0].y;
q0 = S(v[0]); q1 = S(v[1]); q3 = S(v[3]);   // S = 投影後的螢幕座標
matrix( (q1.x-q0.x)/w, (q1.y-q0.y)/w,
        (q3.x-q0.x)/h, (q3.y-q0.y)/h,
        q0.x, q0.y )
```

在這個 group 內用**攤平座標**下 `<text>`，文字就會正確地趴在那一面上。
行列式接近 0（面幾乎側對鏡頭）時把 opacity 設為 0，避免壓成一條線的字。

判斷哪些面「看得見」不要依賴法線正負（那取決於多邊形的繞向約定，容易搞錯）：
**取所有主面片 `z'` 的中位數，只在 `z' ≥ 中位數` 的面上寫字**——與繞向無關，永遠正確。

### 6.6 降級

- `prefers-reduced-motion`：不啟動 `requestAnimationFrame`，所有角度直接跳到終值；
  摺疊桿與視角控制**照常可用**（它們是操作，不是動畫）。
- 無 JavaScript：所有文案、費用表、規則、問答皆為靜態 HTML；
  以 `<noscript>` 說明互動區的用途並附替代取得方式（電話／信箱）。
- 觸控：畫布用 `touch-action:none` 與 pointer events；同時提供滑桿，不強迫拖曳。

---

## 七、動效規則

| 動作 | 觸發 | duration | easing |
| --- | --- | --- | --- |
| 按鈕換色 | hover / aria-pressed | 130ms | linear |
| 導覽方管轉面 | hover / focus / 點擊 | 每幀趨近 17%（≈250ms 收斂） | 指數趨近，非 CSS |
| 自動摺演示 | 使用者按下 | 2200ms（去程 1.1s、回程 1.1s） | 線性，配 yaw 同時緩慢右轉 |
| 摺疊桿 | 拖動 | 無過渡（即時重繪） | — |
| 量表／長條寬度 | 數值變動 | 120ms | linear |

**禁止**：進場淡入揭示、數字計數滾動、按壓硬陰影位移、`stroke-dashoffset` 描繪、跑馬燈。
本風格的動效簽名只有一個：**摺疊本身**。線型顏色隨摺疊度交棒給明暗
（`creaseOpacity = clamp(1.25 − 1.9t, 0.16, 1)`）——攤平時你看到的是製造指令，
立起來後你看到的是物件。這個交棒就是全部的戲。

---

## 八、插畫與圖像風格：`dieline-linetype`

**核心規則：圖不是「描外形」，而是由線型的語意組成。**

作法：

1. 面積一律由紙板色塊（`--paper` / `--paper2`）承擔，不是留白。
2. 輪廓＝洋紅 2.0–2.4px 實線；會彎折的地方＝青色 1.8–2.0px `stroke-dasharray:"7 4"`；
   上膠／接合區＝ 45° 黃色斜線 `<pattern>`（線寬 2.4、間距 7–8）。
3. 需要表達「機械動作」時用一支細墨色箭頭（軸線 + 兩筆 V），不要用弧形箭頭。
4. 標註文字一律 Azeret Mono 10–11px、次要墨色，貼在圖的左下與右下角，像工程圖的圖框註記。
5. 曲線只在**真實物理需要**時出現：瓦楞剖面用連續的二次貝茲 `Q` 交替上下，
   楞高與每公尺楞數必須採用實際規格（A 楞 4.8mm／110 楞、B 楞 3.0mm／150 楞、E 楞 1.6mm／295 楞），
   讓圖本身是資訊而不是裝飾。

**與 thin-lineart 的差別**：細線幾何線描是等寬單色的裝飾性外框；
本技法的線寬幾乎一致但**顏色與虛實編碼了製程**，且必定伴隨色塊面積與工程註記。
畫成單色就退化成 thin-lineart，禁止。

---

## 九、Logo 與 Favicon

**Logo 構成**：一片攤平的紙板（矩形，卡紙白填色 + 洋紅 3px 外框）＋一片沿壓線折起的紙板
（四邊形，紙灰填色 + 洋紅外框 + miter 接角），兩片之間是一條青色虛線（`stroke-dasharray:"7 5"`），
虛線中點放一個洋紅實心圓（半徑約摺線長的 8%）＝「摺點」。
右側為 Barlow Condensed 700 的品牌英文（字距 2.4）＋下方 Azeret Mono 的中文全名（字距 2.6），
兩者之間用 1.6px 墨色實線隔開。

**Favicon**：同一個構成壓縮到 32×32，去掉文字與圓點，底鋪 `--bed`：

```
<svg viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#2F4A52"/>
  <path d="M5 9h14v14H5z" fill="#EDE9DF" stroke="#E8006E" stroke-width="2"/>
  <path d="M19 9l8 4v14l-8-4z" fill="#DBD4C4" stroke="#E8006E" stroke-width="2" stroke-linejoin="round"/>
  <path d="M19 9v14" stroke="#17B9E8" stroke-width="2" stroke-dasharray="3 2.5"/>
</svg>
```

以 `data:image/svg+xml,` + URL encode 寫進 `<head>`。**不要用 emoji、不要用外部 .ico**。

---

## 十、Do & Don't

**Do**

- 讓三種線各司其職，並且全站一致到底。
- 主結構做不對稱雙欄；操作面板固定寬。
- 所有數字加單位、用等寬字、右對齊。
- 文案用該產業真正在用的詞（本例：咬口、落數、放損、楞向、糊耳、令、開數）。
- 動效只保留一個核心：狀態的連續變形本身。
- 一定要有一個**真的能操作**的核心功能，而不是「展示型」動畫。

**Don't**

- ✗ 紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡的模板。
- ✗ 圓角與模糊陰影（本風格 `border-radius` 全站為 0）。
- ✗ emoji 當 icon；icon 一律用 6.x／第八章的線型語彙自繪 SVG。
- ✗ 米白紙感當地色——紙只出現在卡片上，檯面必須是鐵青。
- ✗ 把三個訊號色當裝飾隨意互換；洋紅不可拿去做次要標籤。
- ✗ 跑馬燈、進場淡入揭示、數字計數、`EST. 19xx` 徽章、「把 X 變成 Y」式標題。
- ✗ 用位圖或外部圖片充當工程圖。所有圖必須是 SVG，且參數要有真實依據。
- ✗ 只做視覺不做引擎：沒有第六章那套摺疊求解，這個風格就沒有理由存在。

---

## 十一、頁面骨架範例

```html
<body>
<header class="wrap">
  <div class="slug">
    <svg width="46" height="46" viewBox="0 0 56 56" aria-hidden="true">
      <path d="M4 10h30v34H4z" fill="#EDE9DF" stroke="#E8006E" stroke-width="2.4"/>
      <path d="M34 10l18 8v34l-18-8z" fill="#C9C0AD" stroke="#E8006E" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M34 10v34" stroke="#17B9E8" stroke-width="2.4" stroke-dasharray="5 3.5"/>
    </svg>
    <span><span class="bm">FP ／ F-01</span><br><span class="bn">品牌名</span></span>
    <span class="bz">英文名　業務範圍<br>地址</span>
    <span class="sp"></span>
    <span class="bz mono">PAGE NAME ／ 頁名</span>
  </div>
</header>

<main class="wrap">
  <!-- 首屏＝工作區，不是 hero -->
  <section class="benchgrid">
    <div class="sheet k" style="padding:0">
      <svg id="stage" viewBox="0 0 920 600"></svg>
      <div class="stagebar">
        <div class="lt">
          <span class="c1"><i></i>刀線 CUT</span>
          <span class="c2"><i></i>壓線 CREASE</span>
          <span class="c3"><i></i>糊區 GLUE</span>
        </div>
        <span class="dim">CODE-0001</span>
      </div>
    </div>
    <form class="sheet"><div class="pad">…操作面板…</div></form>
  </section>

  <div class="statbar">
    <div><span class="dim">量測項</span><b class="mono">123 mm</b></div>
    …
  </div>

  <div class="hr" style="margin:52px 0 0"></div>

  <section>
    <div class="secttl">
      <h2>兩行的<br>章節標題</h2>
      <p class="note">齊底的說明段，最多 44ch。</p>
    </div>
    <div class="grid3">
      <div class="sheet"><div class="pad">
        <svg viewBox="0 0 240 108" class="ill"><!-- dieline-linetype 插圖 --></svg>
        <h3>小標</h3><p>內文</p>
      </div></div>
    </div>
  </section>
</main>

<footer class="wrap">…三欄…<div class="hrd"></div><p class="note">虛構聲明與建置模型</p></footer>
<div id="navbox"></div><nav id="navbar"></nav>
</body>
```

---

## 十二、把這套風格搬到別的產業

線型語意是抽象的，換產業只要重新定義三種線代表什麼：

| 產業 | 洋紅實線＝ | 青色虛線＝ | 黃色斜線＝ |
| --- | --- | --- | --- |
| 紙器／包裝 | 切斷 | 壓摺 | 上膠 |
| 縫紉／打版 | 裁片邊 | 摺份／褶線 | 縫份 |
| 木工／板材 | 鋸切線 | 溝槽 | 上膠面 |
| 建築／隔間 | 結構牆 | 可拆隔間 | 施工中區域 |
| 手術／解剖教學 | 切口 | 縫合線 | 覆蓋區 |
| 資料流程 | 邊界／中止 | 可分支 | 待人工介入 |

規則不變：**三色只能有三種意思，全站一致，且每一種都要在頁面上有圖例告訴使用者。**
只要圖例存在、語意一致，這套風格就成立；一旦線型變成純裝飾，它就退化成一般的工業風。
