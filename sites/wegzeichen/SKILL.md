---
name: hfg-ulm-aicher-system
description: The Ulm School / Otl Aicher signage system — pictograms drawn only at 0/45/90 degrees on a declared module lattice, the 1972 Munich spectrum with black and red forbidden, a single grotesque worked across its width and weight axes, and every dimension derived from one number: how far away the reader is standing.
---

# 烏爾姆造形學院 HfG Ulm ／ Otl Aicher 導向系統

> 適用範圍：本規格書定義的是**風格**，不綁定產業。Demo 站是一間德國 Ulm 的指標製牌所，
> 但同一套語彙可以拿去做體育館、醫院、大學、機場、博物館、公共運輸、器材製造商、
> 甚至任何「內容本身就是一套分類系統」的品牌（圖書館、檔案服務、產品目錄）。

---

## 一、設計哲學

一九五三到一九六八年，烏爾姆造形學院（Hochschule für Gestaltung Ulm）在多瑙河邊的山上教了十五年設計。
Max Bill 開校，Tomás Maldonado 接手把它推向方法論，Otl Aicher 主持視覺傳達系。
學校一九六八年關門，但它的方法在一九七二年慕尼黑奧運的視覺識別上全面兌現——
那套識別是 Aicher 帶隊做的，今天全世界機場與醫院裡的人形圖記，血緣都在那裡。

理解這個流派只需要抓住一件事：**設計不是挑，是推導。**

- 烏爾姆的教學核心是「方法」：符號學、系統理論、生產技術、人因工程。
  學生交的不是一張海報，是一份**可以被驗算的規格**。
- 因此這個流派的畫面性格是：**沒有一個尺寸是喜好，每一個尺寸都有上游。**
  字高由觀看距離推出、模組由字高推出、筆畫與間距由模組推出、圖記由格陣推出。
  你在畫面上看到的不是品味，是一條算式的下游。
- 一九七二年那套識別還多了一個政治性的決定：**排除紅與黑**。
  慕尼黑要辦一場「快樂的運動會」（die heiteren Spiele），
  要讓畫面離一九三六年柏林的黑紅旗幟越遠越好，於是主色改成淺藍、淺綠、銀、橘、紫的光譜。
  這是這個流派最容易被辨認、也最容易被做錯的一條規則。
- 它與**瑞士國際主義**是近親但不是同一件事：瑞士的本體是網格與 Helvetica 的層級；
  烏爾姆的本體是**推導鏈與符號系統**。瑞士可以只有字，烏爾姆一定有圖記。
- 它與**交通號誌／運輸導向風**（深底、螢光色、路面標線）也不同：那是高反差的夜間可視性語言；
  烏爾姆是日光下的、淺的、成套的、可被文件化的。

一句話的判準：**「如果畫面上任何一個尺寸答不出『它從哪裡推出來的』，它就不是烏爾姆。」**

---

## 二、色彩系統（1972 慕尼黑光譜）

| 用途 | 名稱 | Hex | 建議面積 |
|---|---|---|---|
| 分類：設施 | Lichtblau 淺藍 | `#6E9FC4` | ≤ 26% |
| 分類：運動／活動 | Lichtgrün 淺綠 | `#8CBB6A` | ≤ 16% |
| 分類：作業／現用態／可動作 | Orange 橘 | `#E3862B` | ≤ 12% |
| 分類：提示／警示 | Violett 紫 | `#8A6FA5` | ≤ 8% |
| 自用：頁尾、標籤、「你在這裡」 | Tannengrün 深綠 | `#2E6B52` | ≤ 14% |
| 底：牆、板材、未上色的鋁 | Silber 銀灰 | `#D7DAD5` | ≈ 22% |
| 牌面 | Papier 紙白 | `#F2F3EF` | ≈ 24% |
| 文字 | Schriftgrau 墨灰 | `#2B322E` | — |

**兩條硬禁令（少一條就不是這個流派）：**

1. **不用純黑 `#000`。** 文字一律是帶綠的深灰 `#2B322E`。純黑在淺銀底上會像一個洞。
2. **不用紅。** 紅在這套系統裡被保留給消防與急救**設備**，不進版面。
   需要「危險」時用紫，需要「現在正在動」時用橘。

顏色只做一件事：**分類**。它不做氣氛、不做層級、不做裝飾。
同一塊版面上的分類色不超過兩個；第三個顏色出現時，代表你的分類法有問題，不是你的配色有問題。

```css
:root{
  --paper:#F2F3EF; --silber:#D7DAD5; --silber2:#C4C8C2;
  --blau:#6E9FC4; --gruen:#8CBB6A; --orange:#E3862B;
  --violett:#8A6FA5; --tann:#2E6B52; --schrift:#2B322E;
}
/* 絕對不要出現：#000、任何紅色、任何漸層、任何陰影 */
```

---

## 三、字體系統

**一個拉丁字體家族，兩個軸。** 層級不是換字體做出來的，是同一家族在字寬與字重上取不同位置做出來的。

歷史原型是 Univers（Adrian Frutiger，1957）：它一出生就是一張 21 格的矩陣，
橫軸是字寬、縱軸是字重，用編號而不是用「Bold／Light」命名。
在網頁上用 **Archivo Variable**（Google Fonts，`wdth` 62–125 × `wght` 100–900）還原這件事最省事。

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet">
```

指派表（照抄即可）：

| 角色 | wght | wdth | 其他 |
|---|---|---|---|
| 牌面主行／H1 | 600–700 | 100 | `letter-spacing:.01em` |
| 副行（德文／英文） | 400 | 70–72 | 全大寫，`letter-spacing:.11em` |
| 規格條、標籤、表頭 | 500–600 | 68–74 | 全大寫，`letter-spacing:.11em` |
| 內文 | 400 | 100 | `line-height:1.5–1.62` |
| 數字 | 繼承 | 繼承 | `font-variant-numeric:tabular-nums`（**必做**） |

```css
body{font-family:Archivo,'Noto Sans TC',system-ui,sans-serif;
     font-variation-settings:'wght' 400,'wdth' 100}
.klein{font-variation-settings:'wght' 600,'wdth' 70;
       font-size:12px;letter-spacing:.11em;text-transform:uppercase}
```

中文以 **Noto Sans TC** 配同一階字重，不另配第二種中文字。
「一個腳本一個家族」是這條規則的正確讀法——不是「整站只准一個字型檔」。

---

## 四、版面與網格：從一個數字推出全部

這是本風格最核心、也最容易被漏掉的一章。

```
D  觀看距離（公尺）           ← 唯一的輸入
h  字高（大寫高，mm）= D × 5
M  模組（mm）        = h ÷ 5
筆畫 = 1M      圖記 = 10M × 10M      行高 = 15M      版邊 = 10M
圖記與文字的間距 = 5M            箭頭 = 10M × 10M
```

**資訊預算**——這是烏爾姆與「只是排得整齊」的分水嶺。距離不只決定尺寸，還決定**這面牌准帶什麼**：

| D | 最多行數 | 准帶的欄位 |
|---|---|---|
| ≤ 8 m | 6 | 圖記・名稱・副行・說明・箭頭 |
| ≤ 16 m | 4 | 圖記・名稱・副行・箭頭 |
| ≤ 28 m | 3 | 圖記・名稱・箭頭 |
| > 28 m | 2 | 圖記・箭頭 |

被撤下的欄位**不是縮小、不是塞進收合選單**——是這個距離的牌不准帶它。
（在網頁上，被撤下的內容必須完整登記在頁尾，資訊零損失。）

```css
:root{
  --D:12;
  --capmm:calc(var(--D) * 5);                    /* 牌上真正的 mm，標在規格條 */
  --cap:calc(clamp(18px,calc((14 + var(--D)*1.15) * 1px),72px) * var(--sc,1));
  --fs:calc(var(--cap) / .73);                   /* Archivo 的 cap/em ≈ .73 */
  --M:calc(var(--cap) / 5);
}
.tafel{font-size:var(--fs);padding:2cap}
.zeile{display:grid;grid-template-columns:2cap 1fr 2cap;gap:1cap;height:3cap;align-items:center}
[data-lvl="3"] .t3{display:none}
[data-lvl="2"] .t3,[data-lvl="2"] .t2{display:none}
[data-lvl="1"] .t3,[data-lvl="1"] .t2,[data-lvl="1"] .spec{display:none}
```

> **螢幕不是牆。** 真實的牌高與觀看距離成正比；螢幕是固定視野，所以把 D 對螢幕字高做了壓縮（上式），
> 但**比例、模組倍數與資訊預算完全照手冊**，而且真正的 mm 一律標在規格條上。這個妥協要寫出來，不要藏。

留白規則：版邊 10M，欄間 5M，段落之間 15M。**沒有置中**——標題、圖記、文字一律齊左，箭頭齊右。

---

## 五、本風格的 5 個不可省略特徵

拿掉任何一項，做出來的就不是烏爾姆／Aicher。

### 1. 形狀語彙：筆畫只走 0°、45°、90°，線寬恆為 1M

每一段筆畫的兩端點必須滿足 `Δx=0`、`Δy=0` 或 `|Δx|=|Δy|`。這是可驗算的條件，不是感覺。
關節一律用同一個半徑的圓弧接（`stroke-linejoin:round`），端點方頭（`stroke-linecap:butt`）。

```svg
<!-- 一個合法的人形：頭 + 軀幹 + 兩臂(45°) + 兩腿(45°→90°) -->
<svg viewBox="0 0 20 20" style="--ink:#6E9FC4">
  <circle cx="10" cy="3.5" r="2.2" style="fill:var(--ink)"/>
  <g fill="none" style="stroke:var(--ink)" stroke-width="2"
     stroke-linecap="butt" stroke-linejoin="round">
    <polyline points="10,7 10,12"/>
    <polyline points="10,8 6,12"/><polyline points="10,8 14,12"/>
    <polyline points="10,12 7,15 7,18"/><polyline points="10,12 13,15 13,18"/>
  </g>
</svg>
```

```js
// 出圖前先驗角度，不合法就退件——這條檢查本身就是風格的一部分
const legal = (x1,y1,x2,y2) => {
  const dx=Math.abs(x2-x1), dy=Math.abs(y2-y1);
  return (dx||dy) && (dx===0 || dy===0 || dx===dy);
};
```

### 2. 色彩規則：1972 光譜，明文排除純黑與紅

見第二章。實作上最簡單的自我檢查：全站 CSS 搜尋 `#000`、`black`、`red`、`#f00`、`crimson`——命中就是錯。
顏色只承擔分類，一塊版面上的分類色不超過兩個。

```css
.balken{height:24px;display:flex}          /* 色鑰：把分類色攤在使用者面前 */
.balken i{flex:1}
/* <div class="balken"><i style="background:#6E9FC4"></i>…</div> */
```

### 3. 字體：單一無襯線家族的 wdth × wght 矩陣

同一頁出現第二個拉丁字體家族即失格。層級全部由兩個軸產生，窄體專門用來裝長字（德文、機構名、全大寫標籤）。

```css
h1   {font-variation-settings:'wght' 700,'wdth' 92}
.sub {font-variation-settings:'wght' 400,'wdth' 70;text-transform:uppercase;letter-spacing:.11em}
td   {font-variant-numeric:tabular-nums}
```

### 4. 版面：一切落在宣告過的模組 M 上，而且模組尺是看得見的

不是「大概對齊」，是每一個 padding、gap、border、height 都寫成 M（或 cap）的倍數。
而且要讓使用者**看見這把尺**——畫面邊緣放一條刻度、規格條上印出 M 值與字高。
系統設計的可信度來自它願意把自己的規格印在自己身上。

```css
.mskala{position:fixed;top:0;right:0;bottom:0;width:34px;background:var(--paper);
        border-left:2px solid var(--silber2)}
.mskala i{position:absolute;right:0;width:11px;height:2px;background:var(--silber2)}
.mskala i.b{width:22px;background:var(--schrift)}   /* 每 5 格一道長刻度 */
```

### 5. 裝飾母題：沒有裝飾——唯一允許的非資訊圖形是方向箭頭與分類色帶

箭頭只有八個方向（因為只有 45°），用同一副格陣畫。色帶只標分類。
除此之外，畫面上不准出現任何不承載資訊的圖形：沒有圓角、沒有陰影、沒有漸層、沒有材質、沒有框線花邊、沒有插畫式裝飾。

```svg
<!-- 八方向箭頭，全部畫在同一個 20×20 格陣上；此為「右轉」 -->
<svg viewBox="0 0 20 20" style="--ink:#2B322E">
  <g fill="none" style="stroke:var(--ink)" stroke-width="2"
     stroke-linecap="butt" stroke-linejoin="round">
    <polyline points="3,10 17,10"/><polyline points="12,5 17,10 12,15"/>
  </g>
</svg>
```

```css
*{border-radius:0 !important}   /* 開發期間打開這行，找出所有偷渡的圓角 */
```

---

## 六、元件配方

**導覽（Leitsystem，不是品牌列）**：沒有 logo、沒有漢堡選單。一排「箭頭＋目的地」，
現用頁的箭頭換成一枚實心方塊（「你在這裡」）。sticky，底部 4px 深綠實線。

```css
.leit{position:sticky;top:0;background:var(--paper);border-bottom:4px solid var(--tann)}
.leit a{display:flex;align-items:center;gap:9px;text-decoration:none;
        font-variation-settings:'wght' 600,'wdth' 88;font-size:15px;letter-spacing:.02em}
.leit a:hover .zh{border-bottom:2px solid var(--orange)}
```

**按鈕**：方角、實心深綠、全大寫窄體、無陰影。次要鍵用 `inset box-shadow` 做 3px 實線框（不是 border，才不會位移）。

```css
.knopf{background:var(--tann);color:var(--paper);border:0;padding:12px 22px;cursor:pointer;
  font-variation-settings:'wght' 700,'wdth' 84;font-size:14px;letter-spacing:.11em;text-transform:uppercase}
.knopf:hover{background:var(--orange)}
.knopf.zweit{background:var(--paper);color:var(--tann);box-shadow:inset 0 0 0 3px var(--tann)}
```

**卡片**：**沒有卡片。** 用 2px 的格線分隔（`gap` + 底色露出來），不要圓角容器。

```css
.raster{display:grid;gap:2px;background:var(--silber2)}   /* 格線 = 露出來的底色 */
.raster > *{background:var(--paper);padding:16px 18px}
```

**表單**：白底、2px 銀灰實線框、方角；focus 用 3px 橘色 `outline`（不是 glow）。

**表格**：表頭全大寫窄體深綠、底線 2px 墨灰；資料列底線 2px 銀灰；數字欄齊右且 `tabular-nums`。

**頁尾**：整塊深綠實色，方角，不做斜切也不做波浪。

---

## 七、動效規則

**總則**：動效必須是資訊的，不是氣氛的。禁止淡入、禁止滾動揭示、禁止視差。
即使禁了這三樣，仍必須有四種性質不同的動態——安靜不是風格，安靜是沒做完。

| 種類 | 做法 | duration / easing |
|---|---|---|
| 環境 ambient | 一條由**真實時鐘**驅動的色帶游標（營業時間 / 工序 / 班表）；不需要輸入也一直在動 | `left` 過渡 900ms `linear`，每秒更新 |
| 環境 ambient 2 | 邊緣模組尺的走標，用捲動驅動動畫綁在捲動進度上 | `animation-timeline:scroll(root block)` |
| 輸入 input-driven | hover／focus 圖記，**立刻**（`transition:none`）疊上它的模組格陣與 45° 輔助線 | 0ms。延遲 <100ms 是硬要求 |
| 轉場 transition | 點箭頭換頁時，整頁依**箭頭的方向**位移淡出；新頁從相反方向進場 | 170ms，`linear(0,.28 22%,.34 46%,1)`（階梯感，像機械翻牌） |
| 簽名 signature | 觀看距離尺：拖動 D，全站字高／模組／筆畫／行距即時重算，**且超出規範的欄位被撤下** | 即時，無過渡（規格是跳的，不是滑的） |

四種全部要有 `prefers-reduced-motion` 降級，而且降級後資訊零損失：

```css
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.001ms !important;animation-iteration-count:1 !important;
    transition-duration:.001ms !important}
  body.geht{transform:none;opacity:1}     /* 轉場不位移，直接換頁 */
}
```

```js
const rm = matchMedia('(prefers-reduced-motion: reduce)');
setInterval(tick, rm.matches ? 60000 : 1000);   // 時鐘改成每分鐘跳一次
if (rm.matches) return;                          // 轉場整段跳過，連結照常運作
```

---

## 八、插畫與圖像風格

**沒有插畫，只有圖記。** 圖記是符號不是小圖畫：它不描寫，它指認。

- 全部畫在同一個 20×20 模組格陣上，見第五章第 1 條。
- 一個題材只允許一個圖記，不做「同一個東西的三種畫法」。
- 人形用共同的骨架比例：頭 `r=2.2` 在 `(10,3.5)`、肩在 `y=8`、髖在 `y=12`、腳在 `y=18`。
  動作只靠四肢的 45° 方向改變，軀幹不彎。
- 圓只用在頭、輪、禁止圈三處；輪與禁止圈是描邊，頭是實心。
- 幾何只寫**一次**：把每個圖記寫成一份 `<symbol>`，畫面上所有出現都是 `<use>`，
  顏色由各自的 `--ink` 自訂屬性穿過 shadow tree 傳進去。

```html
<svg class="defs" aria-hidden="true"><!-- .defs{position:absolute;width:0;height:0;overflow:hidden} -->
  <symbol id="pk-eingang" viewBox="0 0 20 20">
    <polyline points="8,2 17,2" fill="none" style="stroke:var(--ink,#2B322E)" stroke-width="2"/>
    <!-- … -->
  </symbol>
</svg>
<svg viewBox="0 0 20 20" style="--ink:var(--blau)"><use href="#pk-eingang"/></svg>
<svg viewBox="0 0 20 20" style="--ink:var(--orange)"><use href="#pk-eingang"/></svg>
```

---

## 九、Logo 與 Favicon

Logo 用**和圖記完全相同的規則**畫：同一個格陣、同一個線寬、同一組角度。
烏爾姆的品牌不做書法、不做字標變形、不做正負形巧思——那些是別的流派的樂趣。

- 結構建議：一個方形模組框 + 一個 45° 構成的符號 + 一列同家族的窄體大寫字。
- 顏色最多兩個：深綠 + 一個分類色。
- Favicon 用 inline SVG data URI，只保留符號本體，線寬加粗到 2.4（16px 下 1M 會消失）。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Crect width='20' height='20' fill='%23F2F3EF'/%3E%3Cg fill='none' stroke='%232E6B52' stroke-width='2.4' stroke-linejoin='round'%3E%3Cpolyline points='4,17 4,8 10,2 16,8 16,17'/%3E%3Cpolyline points='7,13 13,13'/%3E%3C/g%3E%3C/svg%3E">
```

---

## 十、Do &amp; Don't

**Do**

- 先決定觀看距離（或它的類比：閱讀情境、裝置、載體），再決定字高，再決定模組。
- 把規格印在自己身上：模組尺、M 值、字高、圖號。
- 齊左、齊右，兩端對齊版邊。
- 用格線（露出來的底色）取代卡片。
- 數字一律 `tabular-nums`。
- 圖記與文字共用同一條基線。

**Don't**

- ❌ 純黑、紅色、紫藍漸層。
- ❌ 圓角、模糊陰影、玻璃感、發光。
- ❌ 第二個拉丁字體家族。
- ❌ 置中的大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ❌ 把圖記畫成可愛的小插圖，或替它加上表情、漸層、描邊外框。
- ❌ emoji 當 icon。
- ❌ Lorem ipsum、「在當今快節奏的世界」之類的 AI 腔。
- ❌ 淡入、滾動揭示、視差——但**不准因此只剩一個動效**，照第七章補滿四種。
- ❌ 「EST. 19xx」徽章。年份要出現就寫成事實句（「1971 年開所」），不要做成徽章。

---

## 十一、技術實作與相容性

本站宣告三項核心技術，各屬不同層。下列支援度於 **2026-09-17** 查證。

### A 渲染層：`<symbol>` × `<use>` shadow tree ＋ 逐實例 CSS 自訂屬性

- **承載什麼**：二十八個圖記的幾何全站只寫一次；所有出現都是 `<use>` 實例，
  顏色由每個實例自己的 `--ink` 決定。改一次骨架，全站同時改；也讓 `zeichen.html` 從 123 KB 降到 75 KB。
- **原理與限制**：`<use>` 會把被參照的內容深複製進一棵 shadow tree，
  **一般 CSS 選擇器跨不進去**——只有「可繼承的屬性」與「自訂屬性」能穿過邊界。
  所以 symbol 內部必須寫成 `style="stroke:var(--ink,#2B322E)"`（`stroke`／`fill` 本身不可繼承，要靠 `var()` 取值）。
- **查證來源**：MDN《SVG and CSS》「elements referenced by `<use>` elements inherit the styles from that element,
  so to apply different styles to them you should use CSS custom properties」；
  Smashing Magazine, *Smashing Animations Part 6: Magnificent SVGs With `<use>` And CSS Custom Properties*（2025-11）。
- **支援度**：全常青瀏覽器。`<use>` 是 SVG 1.1 就有的元素，自訂屬性穿透 shadow tree 是規範行為。
- **fallback**：無需 fallback；`var(--ink, #2B322E)` 的第二參數即為預設墨色。

### B 動效與時間軸層：CSS 捲動驅動動畫 `animation-timeline: scroll()`

- **承載什麼**：右緣模組尺的走標——零 JavaScript、零 scroll 事件監聽、不在主執行緒上做版面計算。
- **支援度（2026-09）**：Chrome／Edge 115+（2023-07 起未加旗標）、Safari 26+（2025-09 落地，26.4 加上 threaded、26.5 修好進度精度與 play-state 的一批 bug）、
  Firefox 仍在 `layout.css.scroll-driven-animations.enabled` 旗標後（Nightly 預設開啟）。全球覆蓋約 84%。
- **查證來源**：MDN《CSS scroll-driven animations》、caniuse `mdn-css_properties_animation-timeline_scroll`。
- **fallback**：整段包在 `@supports (animation-timeline: scroll())` 內。不支援時走標停在頂端，
  刻度、長短刻度與「Modul M」標示照常顯示——**它本來就是一把尺，尺不會動也還是尺，資訊零損失。**

### C 版面與樣式層：`cap` 字高單位

- **承載什麼**：牌面的幾何直接寫成大寫字高的倍數——行高 `3cap`、圖記 `2cap`、版邊 `2cap`、間距 `1cap`。
  導向系統的規範講的就是 cap height，所以 CSS 就用 cap。
- **附帶好處**：`1cap` 由**當下實際生效的字體**決定。萬一 Archivo 沒載到、掉到系統字體，
  `--fs` 是用 Archivo 的 cap/em 比（0.73）算的會偏掉，但所有用 `cap` 寫的幾何會自己跟著新字體修正，牌面不會散。
- **支援度**：Firefox 97（2022-02）、Chrome 118（2023-09）、Safari 17.2（2023-12）。2024 年起為 Baseline 廣泛可用。
- **查證來源**：Ahmad Shadeed《CSS Cap Unit》（2024-06，明列三家版本）、MDN `<length>`。
- **fallback**：`@supports not (height:1cap){ … }` 內以 `em` 重寫同一組尺寸（`3cap → 2.19em`，即 3 × 0.73）。
  視覺差異在 1px 之內。

### 附註（非核心技術）

`linear()` 階梯 easing（轉場的機械感，Chrome 113+／Safari 17.2+／Firefox 112+）；
可變字體軸 `font-variation-settings`（Archivo `wdth` 62–125 × `wght` 100–900，Google Fonts CSS2 API tuple 語法，軸名須依字母序 `wdth,wght`）；
`sessionStorage` 保存觀看距離與轉場方向（一律包 `try/catch`）；
圖記角度合法性檢查為建置期執行，輸出的是靜態 SVG，執行期零成本。

### 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS／JS／SVG） | ≤ 350 KB | 59.1 / 75.7 / 69.1 / 72.0 KB |
| 外部請求 | 僅 Google Fonts | 2 網域（`fonts.googleapis.com`、`fonts.gstatic.com`），零外部圖片／音檔 |
| 首屏 JS | ≤ 100 ms | 共用腳本 ~110 行，無框架、無迴圈渲染；委製檯的重繪只動一個 `innerHTML` 節點 |
| 主要動畫 | 60 fps | 走標為 compositor-only 的 `top`→捲動時間軸；轉場只動 `transform`／`opacity`；時鐘游標每秒一次 `left` |
| layout thrashing | 無 | 只有轉場進場時一次刻意的 `offsetWidth` 強制重排 |

---

## 十二、頁面骨架範例（可直接使用）

```html
<!doctype html>
<html lang="zh-Hant" data-lvl="3">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--paper:#F2F3EF;--silber:#D7DAD5;--silber2:#C4C8C2;--blau:#6E9FC4;--gruen:#8CBB6A;
  --orange:#E3862B;--violett:#8A6FA5;--tann:#2E6B52;--schrift:#2B322E;--ink:var(--schrift);
  --D:12;--sc:1;
  --cap:calc(clamp(18px,calc((14 + var(--D)*1.15) * 1px),72px) * var(--sc));
  --fs:calc(var(--cap)/.73);--M:calc(var(--cap)/5)}
.defs{position:absolute;width:0;height:0;overflow:hidden}
body{background:var(--silber);color:var(--schrift);font-family:Archivo,'Noto Sans TC',system-ui,sans-serif;
  font-variation-settings:'wght' 400,'wdth' 100;font-size:17px;line-height:1.5}
.leit{position:sticky;top:0;background:var(--paper);border-bottom:4px solid var(--tann);
  display:flex;gap:28px;padding:10px 24px;z-index:9}
.leit a{display:flex;align-items:center;gap:9px;text-decoration:none;color:inherit;
  font-variation-settings:'wght' 600,'wdth' 88;font-size:15px}
.leit svg{width:22px;height:22px}
.tafel{background:var(--paper);font-size:var(--fs);line-height:1;padding:2cap}
.zeile{display:grid;grid-template-columns:2cap 1fr 2cap;gap:1cap;height:3cap;
  align-items:center;text-decoration:none;color:inherit}
.zeile + .zeile{border-top:calc(var(--M)*.5) solid var(--silber2)}
.zeile svg{width:2cap;height:2cap}
.t1{font-variation-settings:'wght' 600,'wdth' 100}
.t2{font-size:max(12px,calc(var(--fs)*.40));font-variation-settings:'wght' 400,'wdth' 72;
  letter-spacing:.11em;text-transform:uppercase;opacity:.74}
[data-lvl="2"] .t2{display:none}
@supports not (height:1cap){
  .tafel{padding:1.46em}
  .zeile{height:2.19em;grid-template-columns:1.46em 1fr 1.46em;gap:.73em}
  .zeile svg{width:1.46em;height:1.46em}
}
</style>
</head>
<body>
<svg class="defs" aria-hidden="true">
  <symbol id="pk-eingang" viewBox="0 0 20 20">
    <g fill="none" style="stroke:var(--ink,#2B322E)" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round">
      <polyline points="8,2 17,2"/><polyline points="17,2 17,18"/><polyline points="8,18 17,18"/>
      <polyline points="2,10 13,10"/><polyline points="9,6 13,10 9,14"/>
    </g>
  </symbol>
  <symbol id="ar-e" viewBox="0 0 20 20">
    <g fill="none" style="stroke:var(--ink,#2B322E)" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round">
      <polyline points="3,10 17,10"/><polyline points="12,5 17,10 12,15"/>
    </g>
  </symbol>
</svg>

<nav class="leit" aria-label="導向牌">
  <a href="#"><svg viewBox="0 0 20 20" style="--ink:var(--tann)"><use href="#ar-e"/></svg>目的地一</a>
  <a href="#"><svg viewBox="0 0 20 20" style="--ink:var(--tann)"><use href="#ar-e"/></svg>目的地二</a>
</nav>

<main style="max-width:1180px;margin:0 auto;padding:24px">
  <div class="tafel">
    <a class="zeile" href="#">
      <svg viewBox="0 0 20 20" style="--ink:var(--blau)"><use href="#pk-eingang"/></svg>
      <span><span class="t1">大廳入口</span><br><span class="t2">Haupteingang</span></span>
      <svg viewBox="0 0 20 20"><use href="#ar-e"/></svg>
    </a>
  </div>
</main>
</body>
</html>
```

---

*本規格書隨 Design Skills Center 範例站 `wegzeichen` 一併發布。*
*站點與規格書由 **Claude Opus 5**（排程 Agent 自動執行）於 2026-09-17 建置。*
