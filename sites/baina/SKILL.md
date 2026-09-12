---
name: quilt-piecework
description: American patchwork quilt aesthetics for the web — equal blocks pieced on aligned seams, named block vocabulary cut only at 90° and 45°, flat dyed cloth separated by lightness rather than hue, a three-layer sashing/border/binding frame, and discrete hand-quilting stitches that run across the seams.
---

# 拼布 Quilt — 風格規格書

> 流派：美式拼布。血緣有二：**賓州蘭卡斯特的阿米許實色被**（Lancaster Amish quilts, 1880–1940，
> 深飽和素色布、大面積色塊、繁複壓線、極少印花）與 **阿拉巴馬 Gee's Bend 的即興拼布**
> （1930s– ，工作服與麵粉袋改製、比例不規則、明度對比大膽）。
> 另一條實體來源是 **1930 年代美國的印花麵粉袋／飼料袋（feed sack）**：麵粉商為了讓主婦把空袋改做衣服與被子而印上花色，
> 這是「貨物的包裝變成被面」這件事的史實根據，也是本 Demo 選用共同購買班這個產業的理由。

---

## 一、設計哲學

拼布不是「把碎片貼在一起」，是**先把整體切成可縫的直線，再一片一片縫回去**。
每一條線都是一次縫紉動作的痕跡，所以：

1. **畫面上不存在無法製造的形狀。**任何一塊布都必須是縫紉機能一次車過的邊：90°、45°，或半徑等於格寬的四分之一圓。曲線很貴，所以只有一族塊型敢用。
2. **接縫是內容，不是分隔線。**兩塊布之間那條 1px 的線與它下面 0.6px 的暗影，是縫份的厚度。抹掉它，畫面立刻變成色塊拼貼而不是拼布。
3. **明度統治色相。**兩塊布分不分得開，看的是 L\*，不是色名。這一條讓整個風格可以被量化驗收。
4. **整體有邊界，而且邊界有三層。**被子不是無限延伸的圖樣，它有滾邊、有邊框、有內鑲條，一圈一圈把畫面收住。
5. **壓線不服從拼縫。**把三層縫成一件的那道線斜著走過所有接縫。它是唯一被允許無視版面結構的元素。

**這個風格不是**：孟菲斯（幾何但無縫份、無材質邏輯）、風格派（同樣是矩形但反對重複與對稱）、
Bento Grid（卡片有圓角與陰影、格與格之間是留白不是縫份）、幾何圖樣壁紙（無邊界、無塊型名稱）。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1　等大方格 × 接縫必須跨塊對齊（seam matching）

拼布最基本的手藝：相鄰兩塊的內部分割線要落在**同一條線**上。網頁上要做真的，不是畫的——
用 CSS `subgrid` 讓每張卡片的內部橫線繼承同一組軌道，不管卡片裡的字多長，一整列的橫線都是直的。

```css
.band{grid-column:1/-1;display:grid;grid-template-columns:subgrid;row-gap:12px}
.rows4{grid-template-rows:auto auto auto auto}
.card{grid-column:span 3;grid-row:span 4;display:grid;grid-template-rows:subgrid;row-gap:0}
@supports not (grid-template-columns:subgrid){
  .band{grid-template-columns:repeat(12,minmax(0,1fr))}
  .card{display:block;grid-row:auto}          /* 退回一般卡片，橫線不再對齊但全部可讀 */
}
```

拿掉它會怎樣：卡片高度各自為政，橫線參差——那是網頁卡片牆，不是被面。

### 特徵 2　有名字的塊型語彙，只准 90°／45° 與四分之一圓

不准出現自由曲線、不准出現任意角度的斜邊。整套圖像由一支**拼縫文法**生成：正方格 → 每格一個切分符號。

```js
// token：0/1/2 實心 ｜ tN 半方三角 ｜ xN 四角三角 ｜ qN 四分圓 ｜ bN 對半 ｜ rN 條紋
// 九宮格 Nine Patch（3×3）
{n:3, spec:"1 0 1/0 1 0/1 0 1"}
// 風車 Pinwheel（2×2 半方三角同向旋轉）
{n:2, spec:"t01 t11/t31 t21"}
// 醉漢之路 Drunkard's Path（4×4，全部塊型裡唯一的曲線族）
{n:4, spec:"q01 q11 q01 q11/q31 q21 q31 q21/q11 q01 q11 q01/q21 q31 q21 q31"}
```

半方三角的 SVG 一句話寫完（先鋪底色，再蓋一個角三角）：

```html
<svg viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#EAE2D2"/>
  <polygon points="0,0 100,0 0,100" fill="#4A2350"/>
</svg>
```

四分之一圓（凹弧配凸弧）：

```html
<path d="M0,0 L100,0 A100,100 0 0 1 0,100 Z" fill="#7B1C2C"/>
```

塊型必須有真名字（九宮格、木屋、飛雁、鋸齒星、熊掌、醉漢之路…），並附片數與縫合順序。
沒有名字與縫序的形狀不是塊型，是圖案。

### 特徵 3　實色布 × 靠明度分，零漸層零模糊陰影

每一塊布是**單一實色**加一層極細的經緯織紋，沒有漸層、沒有 `filter: blur`、沒有 `box-shadow` 的模糊半徑。
投影一律是實心位移色塊（`box-shadow:2px 2px 0`）。

```css
.cloth{background:#EAE2D2;border:1px solid rgba(10,8,12,.55);box-shadow:2px 2px 0 rgba(10,8,12,.22)}
.weave{position:absolute;inset:0;pointer-events:none;
  background:repeating-linear-gradient(var(--wa,0deg),
    rgba(255,255,255,.085) 0 1.4px, transparent 1.4px 4px)}
.patch:hover .weave{--wa:90deg}   /* 相鄰布的布紋方向不同，反光就不同 */
```

配色驗收用 L\*（CIE 明度）而不是感覺：

```js
const lin=c=>{c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);};
const Lstar=hex=>{const [r,g,b]=[1,3,5].map(i=>lin(parseInt(hex.substr(i,2),16)));
  const Y=0.2126*r+0.7152*g+0.0722*b; return Y>0.008856?116*Math.cbrt(Y)-16:903.3*Y;};
// 相鄰兩塊 |ΔL*| < 15 → 接縫消失，不合格
// 一塊布面上最深與最亮 ΔL* ≥ 55 → 塊型結構一眼可讀
```

### 特徵 4　鑲邊三層：sashing → border → binding

從外往內：**滾邊 binding**（最深的那一色，最細，繞整幅一圈）、**寬邊框 border**、**內鑲條 sashing**（分開每一塊的溝）。
三層都缺就只是布樣，不是被子。這三層就是整個網頁的外框，不是裝飾框。

```css
.binding{background:#17151A;padding:8px;min-height:100vh}                /* 滾邊：全站最深色 */
.border {background:#0E5A55;padding:22px;position:relative}              /* 寬邊框 */
.border::before{content:"";position:absolute;inset:11px;
  border:1px solid rgba(234,226,210,.28);pointer-events:none}            /* 邊框內的落針線 */
.sheet  {background:#4A2350;padding:10px}                                /* 被面 */
.top    {display:grid;grid-template-columns:repeat(7,minmax(0,1fr));
         gap:5px;background:#17151A;padding:5px}                          /* gap 即 sashing */
```

滾邊永遠是**全站最深的一色**，而且寬度固定不隨斷點改變比例太多——它是把整件東西收邊的那條布。

### 特徵 5　手縫壓線跨過接縫（離散針腳）

壓線（quilting）與拼縫（piecing）是兩件事：拼縫把布接成面，壓線把面布、棉胎、裡布三層縫成一件，
所以它**不理會拼縫的邊界**，斜著壓過去。針腳必須是離散的短線段（針長 3.1px、針距 2.05px），不是連續的線。

```css
.sheet::after{content:"";position:absolute;inset:0;pointer-events:none;background-size:34px 34px;
 background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34'%3E%3Cg stroke='%238FA6A3' stroke-width='1.15' stroke-linecap='butt' stroke-dasharray='3.1 2.05' opacity='0.5'%3E%3Cline x1='-8' y1='25' x2='25' y2='-8'/%3E%3Cline x1='-8' y1='42' x2='42' y2='-8'/%3E%3Cline x1='9' y1='42' x2='42' y2='9'/%3E%3Cline x1='-8' y1='9' x2='25' y2='42'/%3E%3Cline x1='9' y1='-8' x2='42' y2='25'/%3E%3C/g%3E%3C/svg%3E")}
```

`stroke-linecap:butt` 是硬規定：`round` 會讓針腳變成藥丸，手縫的針腳兩端是方的。

---

## 三、色彩系統

大面積地色必須是**低明度的深染實色**，不是米白紙。長文一律放在胚布上，不放在被面上。

| 用途 | 色 | Hex | L\* | 占比 |
|---|---|---|---|---|
| 被面地色（最大面積） | 茄紫 | `#4A2350` | 21.0 | 26% |
| 滾邊 binding／正文／全部邊線 | 墨黑 | `#17151A` | 8.4 | 19% |
| 寬邊框 border／次要卡片 | 鴨青 | `#0E5A55` | 34.1 | 15% |
| 主要動作、拒絕、強調卡片 | 酒紅 | `#7B1C2C` | 27.4 | 12% |
| 胚布（所有長文的底、未縫的空格） | 胚白／未漂 | `#EAE2D2` / `#DED4BE` | 90.1 / 84.3 | 14% |
| 深色卡片 | 深栗 | `#4A3520` | 24.0 | 6% |
| 現用態、被選中、可下針（唯一亮色，≤8%） | 芥黃 | `#C9911F` | 64.0 | 5% |
| 導覽現用頁露出的裡布 | 灰藍 | `#6C7F92` | 52.3 | 2% |
| 壓線 | 淺青灰 | `#8FA6A3` | 65.6 | 1% |
| 布色補充（僅出現在布塊裡） | 苔綠 `#3E6B3A`／淡藕 `#C8A9B4` | | 41.0／72.2 | — |

**規則**

- 芥黃只給「現用態／被選中／可動作」，絕不當品牌色或大面積地色。
- 任兩塊相鄰布域之間只允許一條 1px 縫線與 0.6px 暗影；**不准描邊、不准留白、不准漸層過渡**。
- 全站零漸層（唯一例外是布內部那層 8.5% 白的織紋條紋，它是材質不是漸層）。
- 陰影一律 `box-shadow: Npx Npx 0`，blur 半徑永遠是 0。

---

## 四、字體系統

拼布沒有自己的字體傳統，所以字要退到布後面，只借用兩件史實：**麵粉袋上的印刷字**（粗、方、有間距）
與**被角上的手寫標籤**（襯線、老派）。

| 角色 | 字體 | 字重 | 大小 | 行高 |
|---|---|---|---|---|
| 中文標題 | Noto Serif TC | 900 | `clamp(30px,4.4vw,54px)` / h2 `clamp(20px,2.5vw,30px)` | 1.24 |
| 中文正文 | Noto Sans TC | 400／500 | 16px | 1.72 |
| 拉丁文與數字 | Zilla Slab | 500／600／700 | 隨鄰接文字 | — |
| 標籤／編號 | Zilla Slab | 600，`letter-spacing:.13em`，`text-transform:uppercase` | 11–12.5px | 1.55 |

```css
.lat{font-family:"Zilla Slab",serif;font-weight:600;letter-spacing:.13em;text-transform:uppercase}
.num{font-family:"Zilla Slab",serif;font-weight:600;font-variant-numeric:tabular-nums}
```

所有數字用 `tabular-nums`——貨單、明度、片數都要能上下對齊，那也是一種接縫對齊。

---

## 五、版面與網格

- **12 欄主網格**，`column-gap:12px`（＝ sashing 的寬度）。所有段落都是 `.band`（`grid-column:1/-1` + `subgrid`），
  所以整頁每一張紙的左右邊都落在同一組垂直縫線上。
- **被面** 7 欄 × 5 列，`aspect-ratio:1/1`，`gap:5px` 即內鑲條，底色是滾邊的墨黑。
- **旋轉角度**：只有導覽的現用頁允許 −1.7°（那是布被掀起來），其餘一律 0°。拼布不歪；歪的是縫壞了。
- **留白規則**：被面上不留白（滿版方格），紙上留白 16–18px 內距。畫面的呼吸來自明度差，不來自空白。
- 斷點：≤900px 主網格降為 6 欄且 `.band` 的子元素一律滿寬、被面 5 欄；≤560px 被面 4 欄、導覽 2×2。

---

## 六、元件配方

**導覽（binding-fold 滾邊翻折）**——四頁＝被子四邊的滾邊條，現用頁那一條被**翻起來、露出裡布與縫份**：

```css
.fold{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.fold a{background:#17151A;color:#EAE2D2;border:1px solid #000;padding:11px 12px 12px;
  text-decoration:none;transition:transform .16s cubic-bezier(.2,.8,.3,1)}
.fold a[aria-current="page"]{background:#6C7F92;color:#17151A;   /* 露出裡布 */
  transform:translateY(-9px) rotate(-1.7deg);box-shadow:0 6px 0 -2px rgba(0,0,0,.35)}
.fold a[aria-current="page"]::before{content:"";position:absolute;left:0;right:0;bottom:-7px;height:7px;
  background:#DED4BE;border:1px solid rgba(10,8,12,.55);border-top:none}      /* 縫份 */
.fold a[aria-current="page"]::after{content:"";position:absolute;left:10px;right:10px;top:5px;height:2px;
  background:repeating-linear-gradient(90deg,#EAE2D2 0 6px,transparent 6px 10px)} /* 外露的三針 */
```

**按鈕**：零圓角、1px 黑邊、實心位移陰影，按下時位移而不是變色。

```css
button{background:#7B1C2C;color:#EAE2D2;border:1px solid #000;padding:10px 15px;
  box-shadow:2px 2px 0 #17151A;transition:transform .08s,box-shadow .08s}
button:hover:not(:disabled){transform:translate(1px,1px);box-shadow:1px 1px 0 #17151A}
button:disabled{background:#DED4BE;color:#7a7268;box-shadow:none}
```

**卡片（一塊布）**：`.cloth` — 胚布底、1px 縫線邊、2px 實心位移陰影，**沒有圓角**。

**表格**：表頭用深栗實色，隔列用未漂胚布 `#DED4BE`，全部格線 1px `rgba(10,8,12,.55)`——表格的格線就是接縫。

**表單**：輸入框底色 `#F5EFE0`、1px 縫線邊、focus 用 2px 芥黃 outline（`outline-offset:-1px`，像別針別在布上）。

**footer**：墨黑滾邊色滿版，連結用芥黃。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 A | **壓線漂移** `breathe` | 不需輸入，全站每一頁持續 | 48s `ease-in-out` 無限；整層壓線 `translate:0 0 → 2.4px 1.6px`（`inset:-40px` 留出溢出餘裕，只動合成層） | `animation:none`，壓線靜止且完整 |
| ambient 環境 B | **晾被起伏** `sag` | 不需輸入，被面每一格持續 | 24s `ease-in-out` 無限；`translate:0 ±1.4px`、`rotate:∓.14deg`，每格相位 `--ph` 由格號決定 | `animation:none`，被面靜止且完整 |
| input-driven 輸入 | **布紋翻向** | hover／focus 任一塊布 | ≈60ms；`--wa:0deg→90deg` 並抬起 1px 露出縫份陰影 | 只保留 1px 抬起，瞬時 |
| transition 轉場 | **上針前後的換頁** | 送單、換袋成功、下針 | `document.startViewTransition()`，`::view-transition-*` 0.34s | 直接跳，狀態相同 |
| signature 簽名 | **平針縫合** `running-stitch` | 按下「下針」 | 每針 0.055s 依序出現；針長 3.1px、針距 2.05px；轉角前後各三針縮為 2.0px／1.3px（手縫到轉角會抽緊） | 針腳一次全部出現，縫線仍在 |

**簽名動效必須用逐一出現的獨立線段，不准用 `stroke-dashoffset`。**
理由是視覺可辨：dashoffset 是一條連續的線被推出來，每一針等長等速；手縫是一針一針落下，
而且轉角會縮針。做法：

```js
// 沿方框四邊產生針腳，每針一個 <line>，用 --i 決定出現次序
out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="--i:${idx++}"/>`);
```
```css
.stitchline line{opacity:0}
.stitching line{animation:pop .001s linear forwards;animation-delay:calc(var(--i)*.055s)}
@keyframes pop{to{opacity:1}}
@media (prefers-reduced-motion:reduce){.stitching line{animation:none;opacity:1}}
```

自我限制條款：**本風格禁止淡入、禁止視差、禁止滾動揭示、禁止模糊過渡**（布不會漸漸出現，
布是被縫上去的）。但這四種動效一個都不能少。

---

## 八、插畫與圖像風格

技法代號 `piecework-geometry` **拼縫幾何構成**。全站沒有一張外部圖片、沒有一張寫實描繪。
所有圖像（被面 35 格、24 張塊型圖鑑、logo、favicon、回執印記、成品）由同一支引擎輸出，原語只有四種：

1. **布塊多邊形**——只由正方形的 90°／45° 切分產生（唯一曲線是 r＝格寬的四分之一圓）。
2. **縫線與縫份**——每一條切分線上 1px 深線（`shape-rendering:crispEdges`）＋ 0.6px 暗影。
3. **織紋**——布內部 1.4px／4px 的經緯細線，方向逐塊 0°／90° 交替。
4. **平針壓線**——離散短線段，跨過接縫，不服從拼縫邊界。

驗收判準：**拿掉全部顏色，仍讀得出這一塊是怎麼縫起來的——先縫哪一條、後縫哪一條。**

明文禁用：`feTurbulence` 手抖濾鏡（那是絹印與迷幻海報的語彙）、半調網點、細線幾何線描、
寫實描繪、任何 emoji 或圖示字型。

---

## 九、Logo 與 Favicon

**Logo**（`assets/logo.svg`，96×96）＝ 一塊九宮格拼布 ＋ 一道跨過接縫的芥黃壓線 ＋ 一圈滾邊。
規則：外圈墨黑 5px 滾邊、內為鴨青邊框、中央 3×3 實色布、壓線斜穿整塊並且**明顯壓過縫線**（那是整個風格的縮寫）。

**Favicon**（inline SVG data URI，32×32）＝ 四片半方三角組成的風車 ＋ 一道斜壓線 ＋ 3px 滾邊。
小尺寸下要辨識，所以只用一個塊型、只用兩色、線寬不小於 1.4px。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23EAE2D2'/%3E%3Cpolygon points='2,2 16,2 2,16' fill='%234A2350'/%3E%3Cpolygon points='16,2 30,2 30,16' fill='%237B1C2C'/%3E%3Cpolygon points='30,16 30,30 16,30' fill='%234A2350'/%3E%3Cpolygon points='2,16 16,30 2,30' fill='%237B1C2C'/%3E%3Cg stroke='%2317151A' stroke-width='1.4'%3E%3Cline x1='16' y1='1' x2='16' y2='31'/%3E%3Cline x1='1' y1='16' x2='31' y2='16'/%3E%3C/g%3E%3Cg stroke='%238FA6A3' stroke-width='2' stroke-dasharray='3 2.2'%3E%3Cline x1='0' y1='24' x2='32' y2='8'/%3E%3C/g%3E%3Crect width='32' height='32' fill='none' stroke='%2317151A' stroke-width='3'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定明度結構，再挑色相。
- 每一塊圖都要有塊型名字、片數與縫合順序，寫在旁邊。
- 讓長文待在胚布上；被面只承載方格與圖。
- 三層鑲邊一定要做滿，而且滾邊是全站最深的一色。
- 壓線覆蓋整幅並壓過每一條接縫。
- 每一個互動狀態用「布的狀態」表達：翻起、抬起、換向、縫上。

**Don't**

- 不准圓角。`border-radius` 在這個風格裡等於零。
- 不准模糊陰影、不准 `filter: blur`、不准漸層背景（紫藍漸層 hero 更是絕對禁止）。
- 不准把塊型畫成「大概像那樣」的裝飾形狀——每一條邊都要是可縫的。
- 不准用細線幾何線描或手抖濾鏡假裝手工感；手工感來自縫份、織紋與針腳。
- 不准 emoji 當 icon、不准 Lorem ipsum、不准「EST. 19xx」徽章。
- 不准置中大標＋副標＋兩顆按鈕＋三張圓角卡片。首屏應該直接是那床被。
- 不准用 `stroke-dashoffset` 描繪當簽名動效。
- 不准讓相鄰兩塊布的 ΔL\* 小於 15。

---

## 十一、頁面骨架範例（可直接使用）

```html
<body>
<div class="binding"><div class="border"><div class="sheet">

  <header class="masthead">
    <a href="index.html"><span class="mk"><!-- logo.svg inline --></span></a>
    <div>
      <div style="font-family:'Noto Serif TC',serif;font-weight:900;font-size:26px">品牌名</div>
      <div class="sub lat">BRAND NAME · LOCATION</div>
      <div class="sub">一句沒有形容詞的說明</div>
    </div>
    <div class="stamp">第 47 期 · 2026 年 9 月</div>
  </header>

  <nav class="fold" aria-label="主導覽">
    <a href="index.html" aria-current="page"><span class="n">01</span><span class="t">被面</span></a>
    <a href="blocks.html"><span class="n">02</span><span class="t">塊型圖鑑</span></a>
    <a href="swap.html"><span class="n">03</span><span class="t">換袋</span></a>
    <a href="join.html"><span class="n">04</span><span class="t">入班與訂貨</span></a>
  </nav>

  <main class="page">
    <!-- 被面：首屏即成品，不設大標 hero -->
    <section class="band">
      <div style="grid-column:span 12">
        <div class="top"><!-- 35 個 .cellq，每格一塊布或一格胚布 --></div>
      </div>
    </section>

    <!-- 一整列卡片：橫線靠 subgrid 對齊 -->
    <section class="band rows4">
      <article class="cloth cell4" style="grid-column:span 3">
        <div class="fig">…</div><div class="nm">…</div><div class="small">…</div><div class="od tiny">…</div>
      </article>
      <!-- ×4 -->
    </section>
  </main>

  <footer class="ft">…</footer>

</div></div></div>
</body>
```

---

## 十二、技術實作與相容性

本風格的三個技術支點，各自承載一個不可省略特徵，全部在 2026-09-02 查證過現況。

### 1. CSS Grid `subgrid`（C 版面與樣式層）— 承載特徵 1

**它承載什麼**：接縫跨塊對齊。卡片列的四條橫線（圖／名／說明／縫序）與整頁所有紙張的左右邊，
都對齊到同一組軌道。用巢狀獨立 grid 做不到——每個巢狀 grid 會依自己的內容算軌道。

**支援現況（2026-09-02 查證）**：Chrome／Edge 117（2023-09）、Firefox 71、Safari 16.0；
web-features explorer 記載 subgrid 於 **2026-03-15 進入 Baseline Widely available**（此前為 Newly available，起算日 2023-09-15）；
caniuse 全球覆蓋約 89%。
查證來源：<https://web-platform-dx.github.io/web-features-explorer/features/subgrid/>、<https://caniuse.com/css-subgrid>

**fallback 具體行為**：`@supports not (grid-template-columns:subgrid)` 時，`.band` 改用
`repeat(12,minmax(0,1fr))`（欄位仍在，只是不再繼承父軌道），卡片改 `display:block`。
結果是橫線不再跨卡片對齊，其餘版面、內容、順序完全相同，資訊零損失。

### 2. View Transitions API — 同文件（B 動效與時間軸層）— 承載轉場動效

**它承載什麼**：送單、換袋成功、下針三次狀態切換。這三次都是「一個物件從一個容器移到另一個容器」，
用 CSS transition 做不到，因為 DOM 節點被重建；`view-transition-name` 讓瀏覽器自己把舊位置補到新位置。

**支援現況（2026-09-02 查證）**：Chrome／Edge 111+、Safari 18+、Firefox 133+；
web.dev 公告**同文件 view transitions 於 2025-10-14 成為 Baseline Newly available**（三引擎齊備）。
注意跨文件（`@view-transition{navigation:auto}`）是另一個 feature，支援狀況不同，本站不使用。
查證來源：<https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available>、
<https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API>、<https://caniuse.com/view-transitions>

**fallback 具體行為**：

```js
function go(fn){
  if(document.startViewTransition && !RM()) document.startViewTransition(fn);
  else fn();                      // 不支援或使用者要求減少動態 → 直接改 DOM
}
```
狀態、內容、可操作性完全相同，只是沒有補間。`prefers-reduced-motion` 走同一條路徑。

### 3. 拼縫文法 ＋ 三塊布的塊型判定（E 資料與生成層）— 承載特徵 2 與核心功能

純 JavaScript 字串重寫＋幾何，無任何瀏覽器 API 依賴，故無相容性問題。
同一支引擎在**建置階段**輸出被面 35 格與 24 張圖鑑的靜態 SVG 寫進 HTML（關掉 JavaScript 仍是完整的一床被），
在**執行階段**負責換布重繪、成品渲染與功能的規則判定。
決定性偽亂數為 FNV-1a → mulberry32，同一個期別／同一份訂單永遠得到同一個結果，所以 `?q=` 分享碼可完整還原。

**核心功能（換袋）的實測數字**：以 9 種布、6 位班員、每人 3 只袋、一人只換一次的設定，
窮舉 84 種可能的訂貨組合 × 200 期：

| 指標 | 值 |
|---|---|
| 可成局（存在一條換到目標塊型的路徑）| 55.4% |
| 完全無解的期 | 0 / 200 |
| 中位換袋次數 | 1 次 |
| 最多換袋次數 | 6 次（上限即班員人數）|
| 預設第 47 期（目標飛雁）| 84 手中 24 手可成，開局即成 3 手，中位 2 次、最多 3 次 |

也就是：**你訂什麼真的有差**（近一半的訂單湊不出來），但每一期都有解，而且解得快。
換不到時系統誠實說「這一期到這裡，班部會把你的袋留到下一期」——不給分數、不給星等、不排名。

### 4. 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline 資源）| ≤350 KB | index 76 KB／blocks 92 KB／swap 52 KB／join 44 KB |
| 外部請求 | 只允許 Google Fonts | 1（字型），零圖片零音檔 |
| 首屏 JS 執行 | ≤100 ms | index 0 ms（無 JS）；其餘頁引擎解析＋首次渲染 < 12 ms（Node 22 同段程式碼 1000 次塊型渲染 ≈ 9 ms）|
| 主要動畫 | 60 fps | ambient 只動 `translate`／`rotate`（合成層），不觸發 layout；簽名動效只動 `opacity` |
| layout thrashing | 無 | 全程無 `getBoundingClientRect`；換布與換袋皆一次性 `innerHTML` 寫入 |

### 5. 無 JavaScript 與無障礙

- 四頁的全部資訊（被面、貨單、24 種塊型與縫序、六種塊型的湊成條件、班務、表格）都是靜態 HTML，關掉 JavaScript 完整可讀；`swap.html` 另有 `<noscript>` 區塊列出全部規則，拿紙筆一樣走得完。
- 被面每一格 `tabindex="0"` 並帶 `aria-label`（第幾列第幾格、什麼塊型、用了哪幾塊布）。
- 導覽現用頁用 `aria-current="page"`；焦點環為 2px 芥黃，不依賴顏色單獨傳達狀態（現用頁同時位移、換底色、露出縫份）。
- 表單錯誤 `aria-live="polite"`，並把焦點移到第一個出問題的欄位。

---

*本 SKILL 由 Claude Opus 5 於 2026-09-02 撰寫（排程 Agent 自動執行）。範例站：`sites/baina/`。*
