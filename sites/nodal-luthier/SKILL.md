---
name: nodal-resonance
description: A dark slate workshop aesthetic where measurement instruments are the ornament - sand-white nodal figures on wood, frequency scales as navigation, monospaced readouts and zero decoration.
---

# 共振節線風 Nodal-Resonance

> 這份 SKILL 描述的是一套**視覺與互動語言**，不綁定產業。它來自「把看不見的物理量顯示出來」這件事：暗場、細砂亮線、刻度、讀數。任何需要讓使用者看見量測結果的題材都能套用——聲學、材料、氣象、醫檢、校準、天文。

---

## 一、設計哲學

**儀器就是裝飾。** 這套語言不加任何裝飾元素：沒有圓角、沒有陰影、沒有漸層按鈕、沒有插圖式 icon。畫面上每一個非文字的東西都必須是一個讀數、一條刻度、一個量測結果，或量測對象本身。要好看，就把量測做得好看。

三條原則：

1. **暗場優先。** 底是暗的，因為量測結果要亮。亮的東西只有兩種：砂白（結果）與木黃（對象）。其餘全是暗階與細線。
2. **數字用等寬，敘述用襯線。** 讀數、頻率、編號、價格一律等寬對齊；解釋這些數字的人話用襯線體，語氣是職人在工作檯旁邊講話，不是文案。
3. **每個畫面都要有一個「正在量」的東西。** 首屏不放大標，放儀器。使用者第一個動作是操作它，不是往下捲。

**去AI化的具體落實**：無 hero 大標、無置中三卡、無紫藍漸層、無 emoji、無 rounded-2xl 模糊陰影卡、無跑馬燈、無「EST. 19xx」徽章、無「把 X 變成 Y」句式。品牌敘事必須從該產業的實際工序長出來。

---

## 二、色彩系統

| 角色 | Hex | 用途 | 面積比 |
|------|-----|------|--------|
| 板岩青黑 `--ink` | `#171B1C` | 全站底色、rail 底、canvas 舞台底 | 約 62% |
| 石墨 `--ink2` | `#21282A` | 面板／選中態底／輸入框底（`#1b2122` 為其暗變體） | 約 10% |
| 分隔線 `--line` | `#2C3537` | **所有** 1px 實線分格、表格線、邊框 | 線性 |
| 砂白 `--sand` | `#E8E4D6` | 主要文字、量測結果（砂粒）、高亮 | 約 18% |
| 雲杉 `--spruce` | `#C9A26B` | 唯一的暖色強調：現用頁、達標讀數、主要按鈕底、量測對象本體 | 約 7% |
| 灰綠青 `--verd` | `#5E8C86` | 次要標記：kicker 小標、欄位標籤、狀態徽章、敏感度負值域 | 約 3% |
| 弱化文字 `--dim` | `#8B948F` | 標籤、單位、輔助說明 | — |

輔助階（僅用於資料場的色帶，不進入版面）：木料厚度階 `#F2EDE0 → #E7DCC2 → #DCCBA6 → #D4BC8A → #C9A26B → #B58F5C → #A07B4D → #89673F → #705232 → #5B4224`。

**紀律**

- 全站只有**兩個**強調色（雲杉、灰綠青），且兩者不得同時強調同一個元素。
- 不使用紅色作為錯誤色；錯誤用 `#D98A6A`（雲杉的降飽和暗變體），維持單一暖色家族。
- 底色永遠是冷的（青黑），強調永遠是暖的（木黃）。這組冷暖對立是本風格的識別，不可對調。
- 禁止任何漸層作為版面背景。漸層只允許出現在 canvas 內模擬弧面受光（`createRadialGradient`，透明度 ≤ 0.45）。

---

## 三、字體系統

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Serif+TC:wght@400;600;900&family=Spectral:ital,wght@0,300;0,600;1,300&display=swap" rel="stylesheet">
```

| 用途 | 字族 | 設定 |
|------|------|------|
| 內文、標題（中文） | `"Noto Serif TC", Spectral, serif` | 400／600 |
| 內文（西文混排） | Spectral 由 fallback 接手 | 300／600 |
| 一切數字與標籤 | `"IBM Plex Mono", ui-monospace, monospace` | 400／600，`font-variant-numeric: tabular-nums` |

**字級 scale**（rem 基準 16px）

| token | px | line-height | 用途 |
|-------|----|-------------|------|
| micro | 9.5–10 | 1.6 | 圖例、格線標籤 |
| label | 10.5–11 | 1.8 | kicker、欄位名、徽章（letter-spacing `2–3.5px`，大寫） |
| meta | 12–13 | 1.9 | 讀數列、footer、註解 |
| body | 14.5–16 | 1.85 | 內文 |
| lead | 17.5 | 1.8 | 開場段 |
| h3 | 16–17 | 1.5 | 小節標題（letter-spacing `1–1.5px`） |
| h2 | 27（手機 22） | 1.5 | 章節標題（letter-spacing `2px`，weight 600） |
| readout | 26–40 | 1.0 | 主要數字（等寬，letter-spacing `-1px`） |

**規則**

- 中文標題 `letter-spacing: 2px` 起跳，因為暗底需要更多呼吸。
- 所有英文 label 一律大寫 + 寬字距，這是本風格的「刻度感」來源。
- 內文段落寬度上限 `62ch`，不置中。
- 垂直排列的導覽標籤用 `writing-mode: vertical-rl; text-orientation: upright; letter-spacing: 4px`。

---

## 四、版面與網格

**主結構：左側 106px 儀器欄 + 主區**

```css
.shell{display:grid;grid-template-columns:106px 1fr;min-height:100vh}
.rail{border-right:1px solid var(--line);position:sticky;top:0;height:100vh}
main{max-width:1120px;padding:0 40px 90px}
```

- 主區**不置中**於視窗，靠左貼著 rail，右側留白。這是刻意的不對稱。
- 章節之間用 `border-bottom:1px solid var(--line)` 分隔，`padding:52px 0`。不用卡片、不用背景色塊分區。
- 兩欄內容用 `1.15fr .85fr`、`gap:44px`；副欄加 `border-left:1px solid var(--line); padding-left:20px`（懸掛式，不是卡片）。
- 資料區塊（工作台、篩選器、訂製單）一律用 **1px 外框 + 內部 1px 分格**，格與格之間沒有間隙。`gap:0` 是本風格的鐵律——所有網格緊貼。
- **零圓角、零陰影。** `border-radius` 在全站只允許出現在 `border-radius:0` 的覆寫。

**斷點：900px**

- rail 轉為 `position:fixed` 的底部 60px 四格列，`writing-mode` 改回橫排，刻度數字置中。
- `main` 補 `padding-bottom:96px` 讓出底欄。
- 所有兩欄／三欄 grid 落成單欄，canvas 高度由 480 降到 360。

---

## 五、元件配方

### 5.1 儀器欄導覽（side-rail as scale）

導覽本身是一支刻度尺：每一頁被指派一個該領域的量值（本例是頻率 82／147／345／440 Hz），依大小排在尺上，游標三角指向現用頁。

```css
.scale{flex:1;position:relative;padding:26px 0}
.scale .axis{position:absolute;left:38px;top:26px;bottom:26px;width:1px;background:var(--line)}
.sitem{position:absolute;left:0;right:0;display:flex;align-items:center;gap:6px;text-decoration:none}
.sitem .hz{width:36px;text-align:right;font-family:"IBM Plex Mono",monospace;font-size:10px;color:var(--dim)}
.sitem .tick{width:11px;height:1px;background:var(--line);margin-left:1px}
.sitem .lb{writing-mode:vertical-rl;text-orientation:upright;font-size:13px;letter-spacing:4px;color:var(--dim)}
.sitem:hover .tick{background:var(--sand);width:20px}          /* 刻度長出來 */
.sitem[aria-current="page"] .lb,.sitem[aria-current="page"] .hz{color:var(--spruce)}
.needle{position:absolute;left:31px;border-left:7px solid var(--spruce);
        border-top:5px solid transparent;border-bottom:5px solid transparent}
```

每一頁的 `.sitem` 用 inline `style="top:…px"` 定位到自己的刻度值，`aria-current="page"` 標記現用頁。

### 5.2 按鈕

```css
.btn{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:2px;
     background:transparent;color:var(--sand);border:1px solid var(--line);padding:9px 14px;cursor:pointer}
.btn:hover{border-color:var(--sand)}          /* 只換框色，不位移、不加陰影 */
.btn.on{border-color:var(--spruce);color:var(--spruce)}
.btn:focus-visible{outline:1px solid var(--verd);outline-offset:3px}
.submit{background:var(--spruce);color:var(--ink);border:0;letter-spacing:3px;padding:13px}
```

**禁止**：按壓位移、硬陰影、圓角、漸層。

### 5.3 選項晶片（配置器）

```css
.ch{font-size:13.5px;border:1px solid var(--line);padding:7px 12px;background:none;color:var(--sand)}
.ch.on{border-color:var(--spruce);color:var(--spruce);background:#1E2426}
.ch small{font-family:"IBM Plex Mono",monospace;color:var(--dim);margin-left:7px;font-size:11px}
```
價格／數量寫在晶片內的 `<small>` 等寬字裡，靠右跟隨。

### 5.4 讀數列（含目標帶）

一列 = `[代號 30px] [帶狀量表 1fr] [數值 62px]`，整列可點選以切換目前關注的量。

```css
.mrow{display:grid;grid-template-columns:30px 1fr 62px;gap:8px;align-items:center;
      padding:7px 0;border-bottom:1px solid var(--line);background:none;border-left:0;border-right:0;border-top:0}
.mrow .band{position:relative;height:6px;background:#1b2122;border:1px solid var(--line)}
.mrow .band .ok{position:absolute;top:0;bottom:0;background:rgba(94,140,134,.35)}  /* 目標帶 */
.mrow .band .pin{position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--sand)} /* 現值 */
.mrow.sel{background:#1E2426}      /* 選中 */
.mrow.hit .val{color:var(--verd)}  /* 落在目標帶內 */
```

### 5.5 表單

```css
input[type=text],input[type=tel],input[type=email],select{
  width:100%;background:#1b2122;border:1px solid var(--line);color:var(--sand);
  font-family:inherit;font-size:14.5px;padding:9px 10px}
input:focus{outline:none;border-color:var(--verd)}
form label{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:2px;color:var(--dim);
           display:block;margin:14px 0 5px}
.err{color:#D98A6A;font-size:12px;font-family:"IBM Plex Mono",monospace;display:none}
.err.show{display:block}
```
驗證一律**送出時**才顯示，錯誤訊息是具體指引（「請填 09 開頭的十位數手機號碼」），不是「格式錯誤」。

### 5.6 滑桿

```css
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:22px;background:transparent}
input[type=range]::-webkit-slider-runnable-track{height:2px;background:var(--line)}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:3px;height:22px;
  background:var(--spruce);margin-top:-10px}   /* 一根指針，不是一顆球 */
```
滑桿下方永遠附 `.ticks` 等寬刻度數字列（`display:flex;justify-content:space-between`）。

### 5.7 頁尾

三欄 `1.3fr 1fr 1fr`，欄名用等寬 10.5px 大寫 `--verd`，連結用 `border-bottom:1px solid var(--line)` 當底線（hover 才變亮），不用 `text-decoration`。

---

## 六、動效規則

**本風格的動效預算極低。** 版面本身幾乎不動；會動的只有「量測中的東西」。

| 對象 | 觸發 | 時長／曲線 |
|------|------|-----------|
| 砂粒模擬 | 掃頻值改變、敲擊 | 連續 rAF，阻尼 0.55–0.60，無 easing 概念 |
| 量表寬度（`.amp i`、`.band .pin`） | 讀數更新 | `width .12s linear`，刻意用 linear，儀器不做緩動 |
| 卡片點亮 `.card.lit` | 該模態進入共振 | `background .25s` |
| 刻度長出 `.tick` | hover | 無 transition，瞬間切換（對焦是瞬間的） |
| 收據捲入 | 表單送出 | `scrollIntoView({behavior:'smooth'})`，reduced-motion 下改 `'auto'` |

**明令禁止**（全館過載語彙）：揭示式進場淡入、數字滾動計數、按壓硬陰影、`stroke-dashoffset` 描繪、跑馬燈。

**prefers-reduced-motion**

```css
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
```
```js
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce){ settleStatic(); }        // 不啟動 rAF，直接以拒絕取樣把結果放到終態
else { raf = requestAnimationFrame(step); }
```
降級版本必須保留**完整的模擬邏輯與讀數**，只是不播放過程。

---

## 七、插畫與圖像風格：`grain-accretion` 砂粒聚積

本風格不畫線稿、不畫圖示、不用外部圖片。所有圖像都是**同一個母題的兩種輸出**：

**（A）即時模擬（canvas）**——見第九章配方。

**（B）靜態識別圖（SVG）**——當一個項目需要一枚識別記號時，用同一套邏輯離線生成一張砂圖，把它當作那個項目的指紋：

```
1. 以項目代號做 FNV-1a 雜湊，得到確定性亂數種子
2. 由種子決定節線曲線的參數（環的長短軸、瓣數、偏斜）
3. 沿曲線撒 150–200 顆點，每顆加 σ≈0.024 的高斯抖動、半徑 0.9–1.6
4. 落在輪廓外的點直接丟掉（邊界會自然吃掉一段線，這是對的）
5. 輸出 <path> 輪廓（1px `--line` 描邊、無填色）＋ <circle> 砂粒（`--sand`）
```

同一代號永遠得到同一張圖。**砂永遠是亮的、輪廓永遠是暗的細線、背景永遠是暗場。**

工序、材料、流程類插圖（如第七道工序圖）用 `--spruce`／`--verd` 兩色 1–1.6px 線與純色塊構成，尺寸統一 96×60 或 104×132，一律放進 `1px` 外框的暗格內。

**禁止**：細線幾何線描（thin-lineart）、等角小屋、emoji、照片、任何外部圖片。

---

## 八、Logo 與 Favicon

**Logo 構成**＝〔量測對象的輪廓（實心 `--spruce`）〕＋〔疊在上面的節線（`--sand`，`stroke-dasharray:"1.6 2.6"` 的虛線＝砂）〕＋〔對象自身的特徵開孔（`--ink`）〕，右側接字標。

```
字標：IBM Plex Mono 19px / letter-spacing 4.5px / --sand（英文全大寫）
副標：Noto Serif TC 12.5px / letter-spacing 3px / --verd
兩者之間用一條 1px --line 橫線分隔
```

**Favicon**（原創 inline SVG data URI，寫在 `<head>`，禁止外部檔案）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23171B1C'/%3E%3Cellipse cx='16' cy='16' rx='7' ry='11' fill='none' stroke='%23E8E4D6' stroke-width='2.4' stroke-dasharray='1.4 2.2'/%3E%3Ccircle cx='16' cy='5.5' r='1.4' fill='%23C9A26B'/%3E%3Ccircle cx='16' cy='26.5' r='1.4' fill='%23C9A26B'/%3E%3C/svg%3E">
```
16px 下只留三個元素：暗底、虛線環、兩顆暖色點。

---

## 九、首創技術實作配方：模態場模擬與可操作量測台

這是本風格的核心資產。要把它套到別的產業，替換「場」的定義即可（聲學模態→溫度場、應力場、電位場、風壓場…），其餘結構完全通用。

### 9.1 三層資料結構

```
輪廓 profile   → 決定哪些網格點在定義域內
場 field[m]    → 每個模態（或每個關注量）在網格上的值 w
參數 param[]   → 使用者可改的每格參數（本例是厚度 t）
```

### 9.2 輪廓：控制點 + Catmull-Rom

不要用數學曲線硬湊真實物件的輪廓，會湊出奇怪的尖角。用一張半寬控制表＋Catmull-Rom 內插：

```js
var PROF=[[0,0],[10,48],[28,84],[62,103.5],[98,91],[128,60],[156,51],[198,66],
          [244,84],[290,70],[330,39],[348,21]];   // [沿長軸位置, 半寬]
function crom(a,b,c,d,t){var t2=t*t,t3=t2*t;
  return 0.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);}
function halfW(y){ /* 找到所在區段、取四個控制點、內插 */ }
function inside(x,y){var w=halfW(y);return w>0.03&&Math.abs(x)<=w-0.018;}
```
表的最後一點不回到 0，讓多邊形自然以一條水平邊封口（本例＝琴頸接合處）。

### 9.3 場：假設形狀 + 形狀跟隨的正規化座標

```js
function uu(x,y){                       // 讓場跟著輪廓胖瘦，但不製造曲率尖峰
  var hs=0.22+0.72*halfW(y); if(hs<0.26)hs=0.26;
  var u=x/hs; return u>1.4?1.4:(u<-1.4?-1.4:u);
}
function shape(m,x,y){var u=uu(x,y),v=y/1.55;
  if(m===0)return u*v;                                  // 扭轉：十字節線
  if(m===1)return v*v-0.42-0.16*u*u;                    // 長軸：兩道橫弧
  return 1-(u/0.60)*(u/0.60)-(v/0.86)*(v/0.86);         // 環模：閉合環
}
```
**踩雷提醒**：直接用 `x/halfW(y)` 正規化會在窄處產生巨大曲率，讓後面的能量積分爆掉。務必像上面一樣用「常數 + 比例」的柔性寬度。

每個場算完後在定義域內取 `max|w|` 正規化到 ±1。

### 9.4 頻率：瑞利商

```js
// 彎曲應變能密度（含扭轉項，否則純扭轉模態會算出 0）
U = wxx² + wyy² + 2ν·wxx·wyy + 2(1-ν)·wxy²      // ν=0.30
f_m = C_m · sqrt( Σ U_m·t³  ÷  Σ w_m²·t )
```
- `C_m` 在載入時以「均勻參數」求一次，反解成已知的參考值（本例：t=3.0mm 時 82／152／347 Hz）。之後 `C_m` 固定不動，頻率就會隨使用者改動的 `t` 自己跑。
- **一定要把 `U` 做 3–4 次 3×3 均值平滑**。有限差分出來的四階量會有單格尖峰，不平滑會讓使用者「戳一個洞就把頻率打下 20%」。

### 9.5 敏感度場（本配方最有價值的一半）

```js
∂f/∂t (每一格) = 0.5·f_m·( 3·U_m·t² / Σ(U·t³)  −  w_m² / Σ(w²·t) )
```
剛性項隨 `t³`、質量項隨 `t`，所以**在節線附近（`w²` 大、`U` 小）去料會讓頻率上升**，其餘地方下降。把正負畫成兩個色相（暖／青），使用者立刻看懂「這裡不能刨」。

正規化用**平均值的 1.9 倍**當上限，不要用單格最大值——否則整張圖會被一兩格洗成全黑。

### 9.6 砂粒：隨機遊走 + 節線捕獲

真實的 Chladni 行為不是「往低處滑」，而是「振幅大的地方一直被彈飛、彈到節線上就再也不動」。照著寫：

```js
var a  = |w| at particle;                    // 局部振幅
var g  = ∇|w| at particle, gm = |g|;
if (a/gm < 0.028) { v = 0; continue; }       // 以「到節線的估計距離」判定捕獲
v = v*0.55 + (rand-0.5)*hop*a - (g/gm)*bias*a;   // hop≈0.15·drive, bias≈0.014·drive
p += v;  if(!inside(p)) { p 不動; v *= -0.20; }   // 邊界擋住，但絕不把粒子拉向中心
```
**三個致命細節**（少一個圖就出不來）：
1. 捕獲條件要用 `a/|∇a|`（距離）而不是 `a`（振幅），否則節線寬的地方糊成一團、窄的地方完全空白。
2. 出界處理只能「留在原地並反彈」。任何形式的 `p *= 0.9` 都會把所有粒子吸到中心，圖就毀了。
3. 隨機遊走要遠大於梯度漂移（`hop` 約為 `bias` 的 10 倍），否則粒子會卡在「山谷」而到不了真正的節線。

驅動量：`drive = Σ_m 1/(1+((f-f_m)/(0.03·f_m))²)`，離共振就自動歸零，砂靜止。

### 9.7 降級與備援

- `prefers-reduced-motion`：不啟動 rAF，改用拒絕取樣（以 `exp(-w²/2σ²)` 為機率）一次把粒子放到終態。
- 無指標裝置／鍵盤：所有 canvas 上的拖曳操作都必須有等效按鈕（本例是「逐區刨削」六顆按鈕）。
- `<noscript>`：說明這個工具需要腳本，並指出同樣的資訊在哪一頁有靜態版本。頁面的文字內容本身永遠是靜態 HTML，不靠 JS 生成。

---

## 十、Do & Don't

**Do**

- 首屏放儀器，讓使用者第一個動作是操作它。
- 所有數字等寬對齊，附單位、附目標帶、附刻度。
- 用 1px 實線分格建立秩序，格與格之間 `gap:0`。
- 文案講工序、講判斷依據、講為什麼這個數字重要，用該行業真正的行話。
- 每個模擬都附「這是估算、不是量測儀器」的誠實註記。
- 暗場只給兩個亮色：結果（砂白）與對象（木黃）。

**Don't**

- 禁止：不要大標 hero、不要置中標題＋副標＋兩顆按鈕。
- 禁止：不要圓角、陰影、玻璃感、漸層背景、發光邊。
- 禁止：不要 emoji 當 icon，不要外部圖片與圖庫插畫。
- 禁止：不要跑馬燈、不要數字滾動計數、不要進場淡入當主打動效。
- 禁止：不要「在當今快節奏的世界」「把 X 變成 Y」「EST. 19xx」。
- 禁止：不要讓模擬變成裝飾——如果拿掉它網站照樣成立，那它就不該存在。
- 禁止：不要為了炫技犧牲可用性：所有互動都要有鍵盤與無腳本的路。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…原創 SVG…">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Serif+TC:wght@400;600;900&family=Spectral:ital,wght@0,300;0,600;1,300&display=swap" rel="stylesheet">
<style>
:root{--ink:#171B1C;--ink2:#21282A;--line:#2C3537;--sand:#E8E4D6;--spruce:#C9A26B;--verd:#5E8C86;--dim:#8B948F}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--ink);color:var(--sand);font-family:"Noto Serif TC",Spectral,serif;font-size:16px;line-height:1.85}
.shell{display:grid;grid-template-columns:106px 1fr;min-height:100vh}
main{max-width:1120px;padding:0 40px 90px}
section{border-bottom:1px solid var(--line);padding:52px 0}
.kicker{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:3.5px;color:var(--verd);text-transform:uppercase}
h2{font-size:27px;font-weight:600;letter-spacing:2px;margin:10px 0 18px}
p{max-width:62ch;color:#D6D2C6}
@media(max-width:900px){/* rail 轉底欄、grid 落單欄、canvas 降高 */}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<div class="shell">
  <nav class="rail" aria-label="主導覽">
    <div class="brand"><!-- 原創 SVG logo --><b>字標</b></div>
    <div class="scale">
      <div class="axis" aria-hidden="true"></div>
      <div class="needle" style="top:66px" aria-hidden="true"></div>
      <a class="sitem" href="index.html" aria-current="page" style="top:66px">
        <span class="hz">82</span><span class="tick"></span><span class="lb">工作台</span></a>
      <!-- 其餘頁面依其量值排在刻度上 -->
    </div>
  </nav>

  <main>
    <section>
      <span class="kicker">Section Label — 中文副題</span>
      <h2>一句從工序長出來的話，不是廣告詞。</h2>
      <p class="lead">說明使用者現在看到的是什麼、他要做什麼。</p>

      <div class="bench">                      <!-- 1px 外框、內部分格、gap:0 -->
        <div class="stage"><canvas id="cv" role="img" aria-label="…可操作的說明…"></canvas></div>
        <div class="readout">                  <!-- 讀數列 + 目標帶 + 操作鈕 -->
          <div class="bigf mono"><span id="val">—</span><small>單位</small></div>
          <div class="modelist">….mrow×N…</div>
          <div class="btnrow"><button class="btn" type="button">動作</button></div>
        </div>
      </div>
      <div class="sweepwrap">
        <label for="sweep">參數名稱　範圍</label>
        <input id="sweep" type="range" min="…" max="…">
        <div class="ticks mono"><span>…</span><span>…</span></div>
      </div>
      <noscript><div class="ns">此工具需要 JavaScript；靜態資訊見「…」頁。</div></noscript>
      <p class="note">計算方式與誠實免責。</p>
    </section>
  </main>
</div>
<footer>
  <div class="fgrid">
    <div><b>品牌全名</b>地址／電話／營業時間</div>
    <div><b>PAGES</b>…相對路徑連結…</div>
    <div><b>NOTE</b>虛構示意聲明</div>
  </div>
</footer>
<script>/* 場模擬：見第九章配方 */</script>
</body>
</html>
```

---

*風格代號 `nodal-resonance`。由 **Claude Opus 4.8** 於 2026-07-19 撰寫（排程 Agent 自動執行）。*
