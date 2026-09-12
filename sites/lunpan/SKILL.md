---
name: punk-xerox-fanzine
description: British-American DIY punk fanzine style (1976-1984) - one-bit photocopy generation loss, stencil lettering, day-glo stock with a single black ink, folded and stapled sheets, crooked overlapping paste-up.
---

# 龐克影印同人誌 Punk Xerox / DIY Fanzine

一種**用一台影印機就能出版**的視覺語言。1976 年倫敦，Mark Perry 用打字機打完內文、用麥克筆寫標題、拿去影印店印了《Sniffin' Glue》第一期；1977–1984 年 Crass 用鏤空型版噴字做封套；同一時期全世界的地下刊物都長成同一副樣子——因為它們用的是同一台機器。

這個流派的核心不是「亂」，是**製程限制**：影印機只有黑跟白、只吃粗的東西、每複印一次就掉一代品質；紙只有一張、只有一面、印完要自己摺；顏色不是墨買來的，是紙買來的。所有視覺特徵都是這三件事的直接後果。

---

## 一、設計哲學

1. **顏色來自紙，不來自墨。** 全站只有一種墨（影印黑）。要有顏色就換紙——螢光橘、酸綠、螢光粉。這是本流派最容易被做錯的地方：一旦出現第二種彩色油墨，畫面立刻變成別的東西（里索、絹印、普普）。
2. **世代損失是內容不是效果。** 一張圖被影印過幾次，看得出來。舊的東西糊、新的東西清楚——這個資訊要被保留下來，不要「修好」它。
3. **粗到機器吃不掉。** 影印機看不見淡的、細的、灰的。所以字要粗、線要厚（≥2px）、灰階不存在。這條同時決定了排版：沒有細襯線、沒有 hairline 分隔線、沒有淺色註記。
4. **紙是有邊的、會摺的、會被釘的。** 版面不是無限延伸的捲軸，是一張有尺寸的紙。摺線、訂書針、膠帶、撕邊、影印機在紙緣留下的黑框，都是版面元素。
5. **每個人都印得出來。** 授權寫在封底：「這一份可以自由影印。」設計上因此不能依賴任何無法被影印的東西（漸層、透明度、動畫、特殊色）——**印出來還是同一個東西**，這是驗收標準。

---

## 二、本風格的 5 個不可省略特徵

> 判準：拿掉任何一項，畫面就不再是龐克影印同人誌。每項都附可直接複製的 CSS／SVG。

### 特徵 1｜1-bit：全站沒有灰階、沒有漸層、沒有模糊

影印機的閾值只有一個。中間調不是變淡，是**掉成純黑或純白**。因此：投影一律是實心位移色塊，不是 blur；分隔一律是實線，不是淡色；停用態不是降低透明度，是換成灰色實塊。

```css
/* 全域宣告：把灰階與圓角一次禁掉 */
*{border-radius:0!important}
.card{
  background:#EFEDE6;
  border:2.5px solid #121110;
  box-shadow:6px 6px 0 #121110;   /* 實心位移黑塊，絕不 blur */
}
/* 錯誤示範（會立刻毀掉這個風格）：
   box-shadow:0 8px 24px rgba(0,0,0,.18);
   background:linear-gradient(...);
   opacity:.6;                                   */
```

字緣的鋸齒感由 SVG 濾鏡對 **alpha 做硬閾值**達成（不是對顏色）：

```html
<filter id="g1" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.28" in="SourceGraphic" result="d"/>
  <!-- 最後一列把 alpha 乘 17 再減 6.8：0.4 以下全消、0.45 以上全滿 -->
  <feColorMatrix in="d" type="matrix"
    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -6.8"/>
</filter>
```
```css
h1,.logo{filter:url(#g1)}
```

### 特徵 2｜世代損失：同一支濾鏡的四代，越舊越糊

先模糊、再硬閾值、再膨脹——這個順序才是真的影印崩壞（細筆畫消失、相鄰筆畫黏起來），純加粗做不出來。

```html
<filter id="g2" color-interpolation-filters="sRGB">   <!-- 第 2 代 -->
  <feGaussianBlur stdDeviation="0.5" result="b"/>
  <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9.2" result="h"/>
  <feMorphology in="h" operator="dilate" radius="0.22"/>
</filter>
<filter id="g3" color-interpolation-filters="sRGB">   <!-- 第 3 代 -->
  <feGaussianBlur stdDeviation="0.95" result="b"/>
  <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12" result="h"/>
  <feMorphology in="h" operator="dilate" radius="0.42"/>
</filter>
<filter id="g4" color-interpolation-filters="sRGB">   <!-- 第 4 代：快要讀不出來 -->
  <feGaussianBlur stdDeviation="1.5" result="b"/>
  <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -16" result="h"/>
  <feMorphology in="h" operator="dilate" radius="0.7"/>
</filter>
```

用法規則：**代數要有語意**。舊資料用高代數、當期資料用第 1 代、滑鼠碰到的東西「再被影印一次」（+1 代，離開就還原、不累積）。不要隨機亂灑代數。

### 特徵 3｜鏤空型版字（stencil）：筆畫被橋斷開

Crass 的封套字、軍用箱體字、路面噴漆字。做法是實心方塊組字，再用**紙色**的方塊把筆畫切斷——切斷處就是型版的「橋」，沒有橋的型版會掉下來，這是它長這樣的物理原因。字腔（O、A、D 的內部）一定要與外面相連。

```svg
<!-- 一個「日」形的型版字塊：先鋪黑，再用紙色開槽，槽不貫穿＝留下橋 -->
<g fill="#121110"><rect x="0" y="0" width="96" height="76"/></g>
<g fill="#FF5A1F">
  <rect x="12" y="14" width="72" height="10"/>
  <rect x="12" y="32" width="30" height="10"/><rect x="48" y="32" width="36" height="10"/>  <!-- 中間留 6px 橋 -->
  <rect x="12" y="50" width="72" height="10"/>
</g>
```

拉丁字用極粗無襯線（Archivo Black／Anton／Impact 類）撐場，中文用 Noto Sans TC 900。**禁止細襯線、禁止手寫字型模擬、禁止圓體。**

### 特徵 4｜紙的物理：摺線、訂書針、膠帶、歪斜疊壓

版面上的每一塊都是一張紙，它有厚度、有角度、會被別的紙壓住。全站沒有一個元素是正的：−3.6°～+3.2° 之間亂數（但同一個元素永遠同一個角度，不要每次載入都變）。

```css
.tab{position:relative;background:#EFEDE6;border:2.5px solid #121110;box-shadow:4px 4px 0 #121110}
.tab:nth-child(1){transform:rotate(-1.6deg)}
.tab:nth-child(2){transform:rotate(1.1deg)}
.tab .staple{position:absolute;left:6px;top:-4px;width:14px;height:5px;background:#121110}  /* 訂書針 */
.tab .tape{position:absolute;left:-10px;top:-9px;width:52px;height:16px;
  background:#8A8A85;border:1px solid #121110;transform:rotate(-13deg)}                     /* 膠帶 */
/* 摺角：現用態＝這一頁被摺了一角 */
.tab[aria-current="page"]::after{content:"";position:absolute;right:-2px;bottom:-2px;
  width:26px;height:26px;background:#EFEDE6;border-left:2.5px solid #121110;border-top:2.5px solid #121110;
  clip-path:polygon(100% 0,0 100%,100% 100%)}
```

摺線與剪線要分清楚：**摺＝虛線、剪＝粗實線**。這在任何摺頁印刷品上都是同一套約定。

### 特徵 5｜螢光紙一色墨：顏色是大面積的地，不是點綴

地色是螢光紙（面積 30% 以上），墨只有黑。第二種紙（影印白）承載長文，第三種紙（酸綠）只做貼紙、現用態、被選中的東西，面積 ≤8%。

```css
:root{
  --paper:#FF5A1F;  /* 螢光橘影印紙・全站地色 ~34% */
  --ink:#121110;    /* 影印黑・全站唯一的墨 ~30% */
  --white:#EFEDE6;  /* 影印白・第二種紙，長文一律在這上面 ~24% */
  --acid:#C6FF00;   /* 酸綠・貼紙與現用態 ≤8% */
  --grey:#8A8A85;   /* 影印機留下的邊框，只准當結構線 ≤4% */
}
body{background:var(--paper);color:var(--ink)}
```

硬規則：**灰色不准用來做「比較不重要的文字」**（那是灰階，這台機器沒有灰階），它只能是實體物件（膠帶、機器邊框、壓痕）。

---

## 三、色彩系統

| 色票 | 名稱 | 用途 | 面積 |
|---|---|---|---|
| `#FF5A1F` | 螢光橘影印紙 | 全站地色、封面、退件框、按鈕反白 | ~34% |
| `#121110` | 影印黑 | 唯一的墨：所有文字、邊框、圖、footer 底 | ~30% |
| `#EFEDE6` | 影印白 | 第二種紙：長文卡片、表格、落版台 | ~24% |
| `#C6FF00` | 酸綠 | 現用態、hover、貼紙、可動作的東西 | ≤8% |
| `#8A8A85` | 影印灰 | 膠帶、機器邊框、虛線分格 | ≤4% |

換色時整組換紙：螢光粉 `#FF2E88`、酸綠底 `#C6FF00`、螢光黃 `#FFE500`、水藍 `#5BC8FF` 都是真實存在的影印紙色。**墨永遠只有黑。**

---

## 四、字體系統

| 角色 | 字體 | 字重 | 用法 |
|---|---|---|---|
| 中文正文／標題 | Noto Sans TC | 500 / 700 / 900 | 標題一律 900，內文 500；標題絕不用細字重 |
| 拉丁展示字 | Archivo Black | 400（本身極粗） | 刊名、章節英文、數字大字 |
| 數字與機讀資訊 | Courier Prime | 400 / 700 | 頁碼、件號、價目、時刻、代碼——打字機是這個流派的內文字 |

字級 scale（16px 為基準）：`11.5 / 12.5 / 13.5 / 15 / 17 / 20 / clamp(26px,4.4vw,44px)`。
行高：正文 1.62、標題 1.0–1.25、mono 1.5。字距：mono `+.02em`、大標 `−.03em`。

規則：**同一行裡混不同字體是允許的甚至鼓勵的**（打字機數字塞在粗黑標題裡），但不要做「每個字一種字體」的綁架信剪字——那是 Jamie Reid 一個人的手法，不是這個流派的通則（見〈Do & Don't〉）。

---

## 五、版面與網格

- **有邊的紙，不是無限捲軸**：內容最大寬度 1120–1180px，四周留白 22px（手機 14px）。每一區塊都是一張紙。
- **網格是拿來違反的**：主結構用 grid（例如 `1.15fr .85fr`），但每個子塊各自旋轉 −3.6°～+3.2°、互相重疊 4–10px。
- **旋轉是固定值不是亂數**：用 `nth-child` 指定，讓同一個元素永遠同一個角度。會變的歪是抖動，不是紙。
- **邊到邊**：滿版的紙塊可以被畫布切斷，不要每塊都完整置中。
- **落版網格（本流派特有）**：一張 A4 橫放＝4 欄 × 2 列 ＝ 八頁。上排正的、下排 `rotate(180deg)`。
```css
.sheet{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,minmax(214px,auto));
  border:3px solid var(--ink);box-shadow:10px 10px 0 var(--ink)}
.cell{border-right:1.5px dashed var(--grey);border-bottom:1.5px dashed var(--grey)}
.cell:nth-child(n+5){transform:rotate(180deg)}     /* 下排印成顛倒 */
```

---

## 六、元件配方

**導覽（釘在一起的四張紙）**：見特徵 4 的 `.tab`。現用態＝底色換酸綠 ＋ 往上抬 6px ＋ 右下角摺起一角。**不要用底線、不要用色棒**。

**按鈕**：
```css
button{background:#EFEDE6;border:2.5px solid #121110;box-shadow:5px 5px 0 #121110;
  font-weight:900;padding:9px 16px;cursor:pointer;
  transition:transform .08s steps(2,end),background .08s steps(2,end)}
button:hover{background:#C6FF00;transform:translate(2px,2px);box-shadow:3px 3px 0 #121110}
button:disabled{background:#8A8A85;color:#EFEDE6}   /* 停用＝換成灰紙，不是變透明 */
```
注意 `steps(2)`：這個流派沒有補間動畫（見第七節）。

**卡片／紙塊**：`background:#EFEDE6; border:2.5px solid; box-shadow:6px 6px 0;` 內縮 4–5px 再畫一圈 1px `#8A8A85` 當「影印機留下的邊」。

**表格**：外框 2.5px、格線 1px、表頭黑底白字用 mono、`tr:hover td{background:#C6FF00}`。數字欄右對齊、mono、700。

**表單**：欄位 `border:2.5px solid; box-shadow:3px 3px 0 #8A8A85;` 標籤用 mono 11.5px 大寫字距 `.06em`。**錯誤訊息是「退件」不是紅字**：整塊換成螢光橘底、4px 黑框、`×` 開頭條列、句子要像人講的話。

**footer**：純黑底、酸綠小標、mono 內文，最下面一條虛線分隔，寫授權聲明。

---

## 七、動效規則

**這個流派沒有補間。** 影印機是離散的，紙是離散的，所以所有動態都走 `steps()`。全域禁用 `ease-in-out` 的柔滑感與 `opacity` 淡入。

| 種類 | 觸發 | 具體值 |
|---|---|---|
| **ambient 環境** | 不需輸入，持續 | 影印燈管掃描：一條 `--white` 直帶 `mix-blend-mode:difference` 橫掃刊頭，`animation:lamp 8.4s steps(21,end) infinite` |
| **input-driven 輸入** | hover／focus | 「再影印一代」：`el.style.filter='url(#g2)'`，回應 <60ms，離開即還原（**不累積**——不可逆的惡化會讓人不敢用滑鼠）；按鈕 `translate(2px,2px)` + 陰影縮短，`.08s steps(2)` |
| **transition 轉場** | 進頁／換狀態 | 壓上玻璃：`animation:platen .52s steps(6,end)`，`clip-path:inset(0 0 100% 0)` → `inset(0)`，由上而下六格推開，**不是淡入** |
| **signature 簽名** | 使用者按「摺」 | 一張紙摺成一本書：`scaleY(.5)` → `scaleY(.5) scaleX(.25)`，`transform-origin:0 0`，各 `.55s steps(5,end)`；接著翻頁 `rotateY(-158deg)`，`.38s steps(3,end)` |

```css
@keyframes lamp{0%{transform:translateX(-120%)}70%,100%{transform:translateX(760%)}}
@keyframes platen{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
```

**降級（四種都要有，且資訊零損失）**：
```css
@media (prefers-reduced-motion:reduce){
  body{animation:none}            /* 轉場：直接就位 */
  .lampbar{animation:none;opacity:0}  /* 環境：燈管不掃，版面不變 */
  *{transition:none!important}    /* 輸入：狀態立刻切換，仍看得出被選中 */
}
```
簽名動效在 reduced-motion 下**直接跳到摺好的結果**，並且頁序表（哪一格變成第幾頁）在任何情況下都是一張真的 HTML 表格，不是動畫的副產品。

---

## 八、插畫與圖像風格：`generation-loss` 影印世代崩壞

全站零外部圖片。所有圖像用三種原語畫，然後宣告它「被影印過幾代」：

1. **實心色塊與挖空**：所有形狀都是 `<rect>`／`<path>` 的實心黑，細節靠紙色方塊挖出來。線寬下限 4px（低於這個影印機會吃掉）。
2. **型版母題**：鏈條、雨、路口、箭頭、同心方環（無線電波）、鎖——每個母題都只由方塊與挖空構成，沒有一條曲線細線。
3. **代數**：`filter:url(#g1..#g4)`。同一張圖在不同位置可以是不同代數，而代數要對應真實的「它有多舊」。

判準：**拿掉文字，仍讀得出這張圖被影印過幾次。**

決定性生成（同一期永遠得到同一張封面）：
```js
function fnv(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0;}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var rnd=mulberry32(fnv('SHIFT-'+issue));   // 母題、旋轉、位移全由它決定
```

**禁用**：半調網點（那是報紙與普普）、feTurbulence 手抖濾鏡（那是迷幻海報）、細線幾何線描、寫實描繪、任何 emoji。

---

## 九、Logo 與 Favicon

**Logo**：型版鏤空的字 ＋ 一張攤平的落版紙（四欄兩列、摺線虛線、剪線粗實線、右下角摺起一角）。全部是實心塊，可以直接拿去做型版、也可以被影印十次還認得出來。這是驗收標準：**把 logo 用 `#g4` 濾鏡跑一遍，還認得出來才算合格。**

**Favicon**（原創 inline SVG data URI，寫在 `<head>`）：
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FF5A1F'/%3E%3Cpath d='M4 6h24v20H4z' fill='%23EFEDE6'/%3E%3Cpath d='M4 16h24M16 6v20' stroke='%23121110' stroke-width='2'/%3E%3Cpath d='M9 6v20M23 6v20' stroke='%23121110' stroke-width='1' stroke-dasharray='3 3'/%3E%3Cpath d='M28 26l-7 0 7-7z' fill='%23FF5A1F'/%3E%3Cpath d='M28 26l-7 0 7-7' fill='none' stroke='%23121110' stroke-width='2'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 一種墨、多種紙。要顏色就換地色。
- 字粗、線厚、灰階零。停用態換灰紙，不是降透明度。
- 每塊都歪一點，但角度固定。
- 摺線虛線、剪線實線，這兩個不要混。
- 文案用人講話的方式寫，短句、有具體數字、敢承認難看的事（賠了多少錢、幾個人退社）。
- 授權寫在最顯眼的地方：「這一份可以自由影印。」

**Don't**
- ❌ **不要做綁架信剪字**（每字一種字體＋隨機旋轉的標題）。那是 Jamie Reid 1977 年替 Sex Pistols 做的個人手法，已經被用到變成「龐克」的刻板印象；本規格書刻意把它排除在五個必要特徵之外，改用**鏤空型版字**（Crass 路線）——同一個年代、同一台影印機，但沒有被用爛。做拼貼風格請改用達達（那是另一個流派，另一份 SKILL）。
- ❌ 不要用第二種彩色油墨（那是里索與絹印）。
- ❌ 不要半調網點、不要噪點材質貼圖、不要 feTurbulence 抖動邊。
- ❌ 不要圓角、不要模糊陰影、不要漸層、不要玻璃感。
- ❌ 不要淡入、不要視差、不要滾動劫持。所有動態走 `steps()`。
- ❌ 不要 Lorem ipsum、不要 emoji icon、不要「在當今快節奏的世界」。
- ❌ 不要把髒亂當風格：這個流派的東西雖然歪，但**每一行都讀得清楚**。影印是為了讓更多人讀到，不是為了讓人讀不到。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Courier+Prime:wght@400;700&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--paper:#FF5A1F;--ink:#121110;--white:#EFEDE6;--acid:#C6FF00;--grey:#8A8A85}
*{box-sizing:border-box;margin:0;padding:0;border-radius:0!important}
body{background:var(--paper);color:var(--ink);font-family:"Noto Sans TC",sans-serif;font-weight:500;
  line-height:1.62;animation:platen .52s steps(6,end) 1}
@keyframes platen{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
.wrap{max-width:1120px;margin:0 auto;padding:0 22px}
header{border-bottom:5px solid var(--ink);position:relative;overflow:hidden;padding:14px 0}
.lampbar{position:absolute;inset:0 auto 0 0;width:16%;background:var(--white);
  mix-blend-mode:difference;animation:lamp 8.4s steps(21,end) infinite;pointer-events:none}
@keyframes lamp{0%{transform:translateX(-120%)}70%,100%{transform:translateX(760%)}}
h2{display:inline-block;background:var(--ink);color:var(--paper);font-weight:900;
  padding:6px 14px 8px;transform:rotate(-1.2deg);filter:url(#g1)}
.card{background:var(--white);border:2.5px solid var(--ink);box-shadow:6px 6px 0 var(--ink);padding:16px}
@media (prefers-reduced-motion:reduce){body{animation:none}.lampbar{animation:none;opacity:0}*{transition:none!important}}
</style></head><body>
<svg style="position:absolute;width:0;height:0" aria-hidden="true"><defs>
  <filter id="g1" color-interpolation-filters="sRGB">
    <feMorphology operator="dilate" radius="0.28" result="d"/>
    <feColorMatrix in="d" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -6.8"/>
  </filter>
</defs></svg>
<header><div class="lampbar"></div><div class="wrap"><!-- 型版字 logo --></div></header>
<div class="wrap">
  <h2>章節標題</h2>
  <div class="card">一張紙。</div>
</div>
</body></html>
```

---

## 十二、技術實作與相容性

本站三項核心技術，皆於 2026-09-04 查證。

### 1. `feComponentTransfer` 家族與 `feMorphology`（A 渲染層）
承載特徵 1 與特徵 2 的全部——1-bit 硬閾值、邊緣被啃、世代崩壞。

- **支援現況**：caniuse `mdn-svg_elements_femorphology` 與 `mdn-svg_elements_fecomponenttransfer` 皆為**全球覆蓋 97.26%**、Baseline Widely available、**2015 年 7 月起跨瀏覽器**（Chrome 5+／Firefox 3+／Safari 6+／Edge 12+／IE 11）。查證來源：caniuse.com 該兩頁（統計為 StatCounter 2026 年 8 月）、MDN `<feMorphology>`。
- **實作要點**：(a) 一定要寫 `color-interpolation-filters="sRGB"`，預設的 linearRGB 會讓閾值算在錯的色空間，結果偏亮；(b) 硬閾值請作用在 **alpha** 通道（`feColorMatrix` 最後一列乘大數再減常數），不要對 RGB 做，否則彩色地色會被吃掉；(c) 順序是 `blur → 硬閾值 → morphology`，反過來只會得到「加粗」而不是「崩壞」。
- **Fallback**：不支援時濾鏡整個被忽略，字與圖照常顯示——因為畫面本身已經是純黑白平塗，1-bit 的樣子是由**配色與元件規則**保證的，濾鏡只是加上崩壞的邊。**資訊零損失，風格仍成立。** 這也是本站把「顏色只有紙與黑墨」寫成硬規則的原因：風格不可以依賴濾鏡。
- **效能**：濾鏡只掛在刊頭 logo、章節標題、封面縮圖與「當下被指到的那一塊」，不掛在長文與整頁容器上；hover 時只換 `filter` 字串、不改版面，不觸發 layout。

### 2. CSS `steps()` 逐格動畫（B 動效與時間軸層）
承載影印燈管掃描、壓上玻璃的轉場、摺頁與翻頁——這個流派的每一個動作都應該是離散的。

- **支援現況**：MDN `steps()` 為 **Baseline Widely available，2015 年 7 月起跨瀏覽器**。查證來源：MDN《steps() CSS function》。
- **實作要點**：只用 `steps(n)` 與 `steps(n, end)`；`jump-none`／`jump-both` 等關鍵字是後來才加的，caniuse 另列 `mdn-css_properties_animation-timing-function_jump` 追蹤，本站不使用以求最大相容。
- **Fallback**：無支援缺口。舊瀏覽器若不認 `steps()`，退回線性補間，動作仍完整、資訊不變。
- **效能**：`lamp` 只動 `transform`（合成層），`platen` 動 `clip-path`（Chrome/Firefox/Safari 均可 GPU 合成）；全站無 rAF 迴圈，首屏 JS 只做 DOM 綁定與一次渲染。

### 3. 落版置換求解（E 資料與生成層）
承載本站的核心功能與首創：把「讀的順序」與「印的位置」之間的對應算出來，而且是**算**出來的不是查表來的。

- **模型**：八格為節點（0–3 上排、4–7 下排）；邊 = 沒被剪斷的摺線：橫摺只剩最左最右兩行（`0-4`、`3-7`），直摺兩排都有（`0-1,1-2,2-3,4-5,5-6,6-7`）。這八個節點恰好構成一個環。
- **求解**：從一角出發，交替執行「翻同一葉的正反面」（同一直行的上下兩格）與「翻書背」（同排左右相鄰格），走完環的唯一走法即頁序：
  `頁 1..8 → 格 0,4,5,1,2,6,7,3`，也就是上排 `P.1 P.4 P.5 P.8`、下排 `P.2 P.3 P.6 P.7`。
- **驗算**：每一直行的兩格必須是連號（1-2、3-4、5-6、7-8）。四個角落各得一組合法解（等於整張紙轉一圈），本站採左上角起。
- **相容性**：純 JavaScript（`Math.imul` 為 ES2015，Baseline Widely available），無瀏覽器 API 依賴。
- **無 JavaScript 時**：`<noscript>` 直接印出答案表與完整摺法步驟，且「師傅的算法」整段推導是靜態 HTML——**這個功能的知識部分不需要 JavaScript 就拿得到**，只有拖排與摺頁動畫需要。

### 效能預算實測（2026-09-04）
| 頁 | 單檔大小（含全部 inline CSS/JS/SVG） | 外部資源 |
|---|---|---|
| index.html | 30 KB | Google Fonts 3 支 |
| rates.html | 24 KB | 同上 |
| zine.html | 40 KB | 同上 |
| archive.html | 30 KB | 同上 |

四頁皆遠低於 350 KB 門檻；零外部圖片、零音檔、零 JS 函式庫。首屏 JS 只有事件綁定與一次 `innerHTML` 渲染（<10ms 量級，無 rAF、無計時迴圈）。動畫只改 `transform`、`clip-path`、`filter` 三個屬性，不讀取版面尺寸，無 layout thrashing。

---

## 十三、外部參照（做這個風格前先看這些）

- Mark Perry，《Sniffin' Glue and Other Rock'n'Roll Habits》，倫敦，1976–1977（打字機內文＋麥克筆標題＋A4 影印）。
- Crass 的鏤空型版噴字與黑白摺頁內袋，Dial House，1977–1984；Gee Vaucher 的黑白拼貼。
- Jamie Reid 為 Sex Pistols 所做的剪字（1977）——本規格書明文**不採用**其剪字為必要特徵，理由見〈Do & Don't〉。
- Xerox 914 一類乾式影印機的世代損失：第二代起中間調崩成純黑白、邊緣被啃、每代累積約 0.5–1.5° 的送紙歪斜。
- 一張紙八頁的摺法（one-sheet zine，一刀四摺）：見本站〈落版台〉頁「師傅的算法」，或任何獨立出版工作坊的講義。
