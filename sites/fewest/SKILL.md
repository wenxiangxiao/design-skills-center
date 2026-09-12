---
name: mid-century-minimal-realism
description: Mid-century modern minimal realism — additive geometric primitives, zero outlines, five isoluminant inks, and negative space treated as form.
---

# 中世紀現代・極簡寫實 Mid-Century Minimal Realism

## 〇、這個流派是什麼

**年代與地域**：1950–1968 年的美國，戰後限色平版與絹印的產物。

**三個真實外部參照（可搜尋、可比對）**

| 參照 | 貢獻的具體特徵 |
|---|---|
| **Charley Harper**（1922–2007，辛辛那提）自稱的 *minimal realism* | 用最少的幾何塊面畫自然生物；代表作為 *The Golden Book of Biology*（1961）、Ford Times 的野鳥插圖、Cincinnati Zoo 海報 |
| **Alexander Girard**（1907–1993），1952–1973 主持 Herman Miller 織品部，留下三百餘件圖樣，另有 La Fonda del Sol 餐廳與 Braniff 航空識別 | 強烈色域直接相接、民藝母題、色塊即版面 |
| **Paul Rand／Saul Bass／Ray &amp; Charles Eames（House of Cards, 1952）** | 把物件化約成「還認得出來」的符號，並允許幾何與手感並置 |

**它為什麼長成這樣**：戰後兒童讀本與企業印刷品普遍走限色平版或絹印，一塊色就是一塊版，一塊版就是一筆錢與一次套印風險。做不出連續調，於是**漸層、陰影、明暗層次全部出局**；為了讓四五塊版仍然分得開，只能靠**色相**而不是深淺。「簡化」在這裡不是品味，是印刷經濟學的結果——這是本流派與現代 flat design 最根本的差別：flat design 是選擇，minimal realism 是限制。

**適用**：兒童教育、自然科學、動物園與植物園、農產與食品、玩具、旅遊識別、餐飲、社區與地方創生。**不適用**：需要質感寫實或高解析攝影的題材（珠寶、材質販售）。

---

## 一、本風格的 5 個不可省略特徵

> 判準：**拿掉它，畫面就不是這個流派了。**

### 特徵 1　加法形（additive primitives）——只有八種原語

一張圖是「整塊的形」相加而成，**絕不描外形**。全部原語只有八種：正圓、半圓、橢圓、三角、四邊、多邊、長條、二次曲線。一個生物用 8–16 塊；每一塊只有一個實色；每一塊都可以被單獨拿掉。

拿掉它會怎樣：只要有一個 path 是「沿著輪廓走」的，畫面立刻掉進「一般扁平插畫」。

```html
<!-- 主紅雀：11 塊。注意沒有任何一個 path 在描外形 -->
<svg viewBox="0 0 120 122" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="101.5" width="112" height="5" fill="#74A15F"/>          <!-- 棲枝 -->
  <rect x="0" y="-1.3" width="20.1" height="2.6" fill="#28211B"
        transform="translate(60 82) rotate(95.7)"/>                       <!-- 跗 -->
  <polygon points="36,70 8,92 2,82 30,60" fill="#DB6F3D"/>                <!-- 尾羽 -->
  <ellipse cx="58" cy="64" rx="26" ry="20" transform="rotate(-14 58 64)" fill="#DB6F3D"/>
  <ellipse cx="54" cy="68" rx="15" ry="8"  transform="rotate(22 54 68)"  fill="#28211B"/>
  <circle cx="80" cy="44" r="14" fill="#DB6F3D"/>                          <!-- 頭 -->
  <polygon points="70,36 88,20 92,40" fill="#DB6F3D"/>                     <!-- 冠羽 -->
  <polygon points="84,42 96,46 92,58 80,54" fill="#28211B"/>               <!-- 面斑 -->
  <polygon points="92,46 108,50 92,56" fill="#B78A1C"/>                    <!-- 喙 -->
  <circle cx="84" cy="44" r="2.6" fill="#F2EAD6"/>                         <!-- 眼 -->
</svg>
```

線元素（枝、足、觸角、蛛絲）是唯一可以用 `stroke` 的地方，因為**它本身就是一條線**，不是在描一塊面的邊：

```css
svg .sh[data-s]{ fill:none; stroke-linecap:butt; }  /* 絕不用 round */
```

### 特徵 2　零輪廓線（colour meets colour）

兩塊顏色**直接相接**。中間不留白邊、不加黑線、不打陰影、不圓角。要把兩塊分開，唯一的手段是換一個色相。

```css
/* 全域禁令：這四行是本風格的憲法 */
*        { border-radius:0 }
svg *    { stroke:none }              /* 線元素以 [data-s] 屬性另外開例外 */
.card,.btn,.plate { box-shadow:none } /* 不准有任何模糊陰影 */
.grid    { gap:0 }                    /* 色塊之間不留縫 */
```

拿掉它會怎樣：加一圈 1px 描邊，畫面立刻變成 2015 年的 icon set；加一層 `drop-shadow`，變成 Material。

### 特徵 3　五色等亮（isoluminant five）

五塊油墨的**明度完全一樣**，只有色相與彩度不同。畫面因此沒有「主色與背景色」的階層，也沒有明暗層次——**分類的工具只剩色相**。這是三秒辨識測試的關鍵：遮掉文字，你會先看到五塊互相咬合、亮度接近的色域。

```css
:root{
  /* 先寫 hex 做 fallback，再寫 oklch；不懂 oklch 的瀏覽器會忽略第二次宣告 */
  --pap:#F2EAD6; --ink:#28211B;
  --mus:#B78A1C; --per:#DB6F3D; --tea:#45A3A4; --oli:#74A15F; --plu:#C9729A;

  --pap:oklch(.938 .028  88);   /* 紙　相對亮度 .826 */
  --ink:oklch(.255 .016  64);   /* 墨　相對亮度 .016 */
  --mus:oklch(.66  .128  84);   /* 芥末 .283 */
  --per:oklch(.66  .150  44);   /* 柿橙 .268 */
  --tea:oklch(.66  .088 196);   /* 鴨綠 .301 */
  --oli:oklch(.66  .105 136);   /* 橄欖 .300 */
  --plu:oklch(.66  .120 352);   /* 莓紫 .268 */
}
```

**做法**：先定一個 L（本站 `.66`），五個色相全部沿用同一個 L，只改 H 與 C。要換一整套配色，只要改 L 與五個 H —— 等亮這件事自動成立。sRGB 相對亮度實測落在 0.268–0.301，全距 0.033。

面積比例：紙 38% ／ 芥末 13% ／ 柿橙 13% ／ 鴨綠 11% ／ 橄欖 11% ／ 墨 11% ／ 莓紫 3%（莓紫是「只有牠有的那塊記號」專用，全站不得超過 3%）。

**hover 只准加彩度，不准改明度**——這是等亮規則的延伸，也是本風格 hover 的唯一合法做法：

```css
:root{ --perH:oklch(.66 .186 44) }             /* L 與 H 不動，C 從 .150 → .186 */
.sh[data-c=per]{ fill:var(--per); transition:fill .07s linear }
.sh[data-c=per]:hover{ fill:var(--perH) }
```

### 特徵 4　留白即形（negative space as form）

**紙是第六塊色**，不是背景。認得出來的東西有一半是紙：眼睛是紙、翼斑是紙、腹是紙。把一塊拿掉時，**位置要留著**，不准把剩下的塊擠過去補——那個空位是牠的一部分。

版面上同一條規則：卡片之間 `gap:0`，色塊直接相接，留白全部集中到**版面外緣**與**圖版四周**。Logo 與 favicon 用 `fill-rule="evenodd"` 做真正的減法：

```html
<!-- 一個方塊被一個圓咬掉一角：兩個子路徑 + evenodd = 真的挖空 -->
<path fill="#DB6F3D" fill-rule="evenodd"
      d="M2 4H46V44H2Z M38 32A10 10 0 1 1 18 32 10 10 0 0 1 38 32Z"/>
```

導覽的現用態也遵守這條：**不是被高亮，是被咬掉一塊**。

```css
nav.notch{ background:var(--per); padding-top:9px }
nav.notch ul{ display:flex; list-style:none; background:var(--pap2) }
nav.notch a{ position:relative; display:block; padding:11px 19px 12px; background:var(--pap2) }
nav.notch a[aria-current=page]::before{           /* 從色帶上減去一個半圓 */
  content:""; position:absolute; left:50%; top:0; transform:translateX(-50%);
  width:30px; height:15px; border-radius:0 0 15px 15px; background:var(--per);
}
```

### 特徵 5　姿勢先於細節（pose before detail）

先決定牠**在做什麼**（剪影與姿態），再決定牠**身上有什麼**（記號）。姿勢沒了，加再多斑點也認不出來。

實作上把這件事寫成資料：每一塊形都標三個權重欄位——**剪影 s／記號 m／姿態 p**。這三欄不只是註解，它們是可以被程式讀的，因此「這張圖還認不認得出來」變成一個可以計算的問題（見第七章）。

```js
// [原語, [座標...], 色票, 剪影, 記號, 姿態, 名稱]
['c',[74,32,13],'per', 3,3,0, '紅頭']    // 這塊同時扛剪影與記號
['b',[80,68,94,66,3.4],'ink', 0,0,2, '趾'] // 這塊只扛姿態
```

---

## 二、色彩系統

| 名 | hex | oklch | 相對亮度 | 用途 | 佔比 |
|---|---|---|---|---|---|
| 紙 pap | `#F2EAD6` | `oklch(.938 .028 88)` | .826 | 頁底、卡底、圖中的白（眼、腹、翼斑） | 38% |
| 芥末 mus | `#B78A1C` | `oklch(.66 .128 84)` | .283 | 毛、殼、木、翅 | 13% |
| 柿橙 per | `#DB6F3D` | `oklch(.66 .150 44)` | .268 | 紅羽、菌蓋、主要動作、拒絕、現用態 | 13% |
| 鴨綠 tea | `#45A3A4` | `oklch(.66 .088 196)` | .301 | 水中、藍羽、灰皮毛、標籤字 | 11% |
| 橄欖 oli | `#74A15F` | `oklch(.66 .105 136)` | .300 | 枝葉、兩棲、地面、次要說明字 | 11% |
| 莓紫 plu | `#C9729A` | `oklch(.66 .120 352)` | .268 | 「只有牠有」的那塊記號 | ≤3% |
| 墨 ink | `#28211B` | `oklch(.255 .016 64)` | .016 | 正文、足、觸角、斑、分節線、頁尾 | 11% |

**淺底靠 `color-mix` 從主色兌，不要另外配色**——這樣換主色時所有淺底自動跟著走：

```css
--tintP: color-mix(in oklab, var(--per) 16%, var(--pap));
--tintT: color-mix(in oklab, var(--tea) 16%, var(--pap));
--tintM: color-mix(in oklab, var(--mus) 16%, var(--pap));
```

**禁止**：任何 `linear-gradient` 當底、任何 `box-shadow`、任何把同一色相調亮／調暗來「拉開層次」的做法。要層次就換色相。

---

## 三、字體系統

| 角色 | 字體 | 字重 | 字距 | 說明 |
|---|---|---|---|---|
| 標題／標籤／導覽 | **Jost**（Futura 系幾何無襯線） | 500 / 700 | `.16em`–`.42em` | 幾何無襯線是本流派的本體，圓點、單層 a、幾何 o |
| 節號 | Jost | **300** | `-.02em` | 52px 大字細筆畫，與 700 的小標題形成對比 |
| 中文正文 | **Noto Sans TC** | 400 / 500 / 700 | `.012em` | 幾何感較強的黑體，與 Jost 並排不打架 |
| 一句話標語 | **Yellowtail** | 400 | 0 | 全站只用一次；MCM 廣告的手寫斜體對比，用多了就變成婚宴菜單 |

```css
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;700&family=Noto+Sans+TC:wght@400;500;700&family=Yellowtail&display=swap');
body{ font-family:"Jost","Noto Sans TC",sans-serif; font-size:16.5px; line-height:1.72; letter-spacing:.012em }
```

字級 scale（1.0 = 16.5px）：`11.5 / 12.5 / 13.5 / 15 / 16.5 / 19 / 20 / 27 / 40 / 52`。
規則：**小字距要大，大字距要小**。11.5px 的標籤字距 `.24em`，52px 的節號字距 `-.02em`。

---

## 四、版面與網格

- **色場帶**：每頁最上緣一條 18px、最下緣一條 10px 的滿版色帶，由五塊不等寬色域相接（13% / 9% / 11% / 7% / 10%，重複兩次共 100%）。這是 Girard 織品的直接引用，也是全站的招牌。
- **分節線**：`height:5px; background:var(--ink)`，**滿版出血**，不縮進內容欄。中世紀現代的分節靠實線與色塊，不靠留白。
- **內容欄**：`max-width:1180px`，左右 padding 30px（手機 18px）。
- **不對稱**：主要區塊用 `1.15fr / .85fr`，不用 1:1。
- **卡片牆**：`grid; gap:0`，卡底以四色 tint 依 `:nth-child(4n+k)` 輪替。卡片之間沒有縫、沒有陰影、沒有圓角——它們是同一張紙上的四塊色。
- **節標題**：`52px/300` 的兩位數字（柿橙）＋ `20px/700/.24em` 的標題（墨）＋ 右對齊的 13px 註記（橄欖）。

```css
.sechead{display:flex;align-items:baseline;gap:20px;margin-bottom:26px}
.sechead .no{font-size:52px;font-weight:300;line-height:.8;color:var(--per);letter-spacing:-.02em}
.sechead h2{font-size:20px;font-weight:700;letter-spacing:.24em}
.sechead p{margin-left:auto;font-size:13px;color:var(--oli);max-width:30ch;text-align:right}
```

---

## 五、元件配方

**按鈕**——實色矩形，零圓角零陰影，hover 只加彩度：

```css
.btn{border:0;background:var(--per);color:var(--pap);font-weight:700;font-size:14px;
     letter-spacing:.18em;padding:14px 26px;transition:background .07s linear}
.btn:hover,.btn:focus-visible{background:var(--perH);outline:none}
```

**卡片**——沒有邊框、沒有陰影，靠底色與相鄰卡片區分：

```css
.plate{background:var(--pap2);padding:16px 16px 14px}
.plate:nth-child(4n+2){background:var(--tintM)}
.plate:nth-child(4n+3){background:var(--tintT)}
.plate:nth-child(4n)  {background:var(--tintP)}
```

**表格**——不畫格線，用整列色塊代替：

```css
table{border-collapse:collapse;width:100%}
th{text-align:left;font-size:11.5px;letter-spacing:.24em;color:var(--tea);font-weight:500}
tbody tr:nth-child(odd){background:var(--pap2)}
```

**表單**——只留一條 3px 底線，focus 時底線換成柿橙、底色換成芥末 tint：

```css
input,select,textarea{border:0;background:var(--pap2);padding:11px 13px;border-bottom:3px solid var(--ink)}
input:focus{outline:none;background:var(--tintM);border-bottom-color:var(--per)}
label{font-size:11.5px;letter-spacing:.22em;color:var(--tea);font-weight:500}
```

**頁尾**——整塊墨底，四欄，連結用芥末（唯一在深底上仍然可讀的一塊油墨）。

---

## 六、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 時長／曲線 | reduced-motion |
|---|---|---|---|---|
| **ambient 環境** | 色場漂移 | 不需輸入，持續 | `34s linear infinite`，`translateX(0 → -50%)` | `animation:none`，色帶靜止不變 |
| **input 輸入** | 提彩 | hover／focus | `70ms linear`，只改 `fill` 的彩度 | 保留（<100ms 且非位移） |
| **transition 轉場** | 上片 | 頁面首次繪製 | `480ms cubic-bezier(.2,.7,.3,1)`，`@starting-style` 給 `opacity:0; translateY(16px)`，四段各 delay 60ms | `@starting-style` 內覆寫為 `opacity:1;transform:none` |
| **signature 簽名** | **形塊脫落 shape-shed** | 一塊形被判定可以拿掉 | `300ms ease`：沿自身形心對畫布中心的**外法線**位移 34 單位、旋轉 ±15°、縮到 0.18，最後 `display:none`（`allow-discrete`） | 直接 `opacity:0`，不位移不旋轉 |

**形塊脫落的完整配方**（本站的招牌動作，全館唯一）：

```css
.sh{ transform-box:fill-box; transform-origin:50% 50%;
     transition:opacity .30s ease, transform .30s ease, fill .07s linear,
                display .30s allow-discrete;
     transition-behavior:allow-discrete }
.sh.gone{ opacity:0; display:none;
          transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(.18) }
@starting-style{ .stage .sh,.board .sh{ opacity:0; transform:scale(.4) } }
```

`--dx/--dy/--rot` 在產生 SVG 時就寫進每一塊的 `style`：

```js
const [cx,cy]=centroid(shape);            // 形心
let dx=cx-60, dy=cy-62, L=Math.hypot(dx,dy)||1;   // 60,62 = 畫布中心
const rot=((cx*7+cy*13)%23-11)*1.4;        // 決定性微轉，同一塊恆得同角度
style = `--dx:${(dx/L*34).toFixed(1)}px; --dy:${(dy/L*34).toFixed(1)}px; --rot:${rot.toFixed(1)}deg`;
```

**被退回**時不用淡出，用一次 260ms 的抖動，語意是「裝回去」：

```css
.sh.nudge{animation:nudge .26s linear}
@keyframes nudge{0%,100%{transform:rotate(0)}25%{transform:rotate(-3.6deg)}60%{transform:rotate(3.2deg)}}
```

**禁令**：不得用淡入當主要動效、不得視差、不得滾動劫持、不得 `filter:blur`。位移一律短（≤34 單位），因為這個流派的東西是**印在紙上的**，紙不會飄。

---

## 七、插畫與圖像風格（形塊引擎）

全站沒有一張外部圖片。所有圖像——二十四張圖版、logo、favicon、社員章——由同一支引擎產生。

**原語表**（八種，資料格式 `[type,[nums],colour,s,m,p,label]`）

| type | 參數 | 說明 |
|---|---|---|
| `c` | x,y,r | 正圓 |
| `e` | x,y,rx,ry,rot | 橢圓 |
| `t` | x1,y1,x2,y2,x3,y3 | 三角 |
| `q` | 八個座標 | 四邊 |
| `P` | 2n 個座標 | 多邊 |
| `r` | x,y,w,h,rot | 矩形（中心定位） |
| `h` / `w` | x,y,r[,rot] ／ x,y,r,a0,a1 | 半圓／扇形 |
| `b` / `A` | 兩點+線寬 ／ 二次貝茲+線寬 | 長條／曲線（唯一可用 stroke 者） |

**畫布**：`viewBox="0 0 120 122"`，一律 `preserveAspectRatio` 預設。

**構圖規則**
1. 每個生物 8–16 塊；超過 16 塊代表你在描外形。
2. 排序即疊序：地面／枝 → 肢與尾 → 身 → 頭 → 記號 → 眼。
3. 每一塊只准一個色票；同一塊絕不做漸層。
4. 淺色的塊（`pap`）只准疊在深色塊上，不准直接放在紙底上（會消失）。
5. 三個權重欄位 s／m／p 必填，且整張圖的 p 總和不得為 0（植物除外）。

**判準**：拿掉顏色（全部改成墨）之後，仍然讀得出「哪一塊是剪影、哪一塊是記號」。與其他分塊技法的差別：這裡的每一塊不編碼量測資料、也不填滿版面，它編碼的是**這一塊在辨識裡負責什麼**——這是本技法唯一的資訊層。

**辨識規則引擎**（第五個特徵的可計算版本）

```js
// 三欄分數 = 還留著的權重 / 全部權重
// 三位判官，三票取二；某欄若整張圖總和為 0 則該欄不計，其餘欄按比例重分配
const TH={ g:.72, m:.58, c:.60, w:[.42,.34,.24] };
function judge(cr,kept){
  const [S,M,P]=totals(cr); let s=0,m=0,p=0;
  cr.sh.forEach((sh,i)=>{ if(kept[i]){ s+=sh[3]; m+=sh[4]; p+=sh[5] } });
  const fs=S?s/S:0, fm=M?m/M:0, fp=P?p/P:0;
  const wS=S?TH.w[0]:0, wM=M?TH.w[1]:0, wP=P?TH.w[2]:0, WT=wS+wM+wP;
  const g =(S?fs:1)>=TH.g;              // 剪影編輯
  const mm=(M?fm:1)>=TH.m;              // 記號編輯
  const c =((wS*fs+wM*fm+wP*fp)/WT)>=TH.c; // 總編
  return { g, m:mm, c, ok:(g+mm+c)>=2 };
}
```

這個規則有一個關鍵性質：**單調**——拿掉一塊只會讓三欄同時下降或不動，所以任何通過的子集的超集也一定通過。因此(a)最小解一定走得到，(b)但**順序會決定你卡在哪一個局部極小**，(c)被退回的一塊之後也不會忽然變成可以拿——退稿是真的退稿。整個互動的張力來自這一條數學性質。

---

## 八、Logo 與 Favicon

- **標記**：一個實色方塊被一個圓從下緣咬掉一塊（`fill-rule="evenodd"` 的真減法），右上角補一個鴨綠三角、左側一條芥末長條——正好示範三種原語與第四個特徵。
- **字標**：Jost 700，字距 `7`（約 .26em），全大寫；下方 12px 的中文副標，字距 `5`，鴨綠。
- **Favicon**：同一個減法，`viewBox 0 0 32 32`，用 inline SVG data URI 寫在 `<head>`，不另外放檔案。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F2EAD6'/%3E%3Cpath fill='%23DB6F3D' fill-rule='evenodd' d='M4 4H28V28H4Z M23 20A7 7 0 1 1 9 20 7 7 0 0 1 23 20Z'/%3E%3Cpath fill='%2345A3A4' d='M20 4h8v8Z'/%3E%3C/svg%3E">
```

---

## 九、Do &amp; Don't

**Do**
- 先畫剪影與姿勢，再加記號。畫完問自己：遮住顏色還認得出來嗎？
- 五塊油墨等亮，換配色只換 L 與五個 H。
- 卡片、色塊、色帶之間 `gap:0`。留白集中在外緣。
- 淺色只疊在深色上。
- 每一個 hover 只加彩度。

**Don't**
- ❌ 不描外形、不用細線交代形狀（那是技術插畫，不是這個流派）
- ❌ 不加輪廓線、不加 `box-shadow`、不加 `border-radius`
- ❌ 不用漸層當底（尤其禁止紫藍漸層 hero）
- ❌ 不用同一色相的深淺做層次
- ❌ 不用 emoji 當 icon，圖示一律用八原語自繪
- ❌ 不用置中大標＋副標＋兩顆按鈕＋三張圓角卡片的模板
- ❌ 不用 Lorem ipsum、不用「在當今快節奏的世界」
- ❌ 不用 `EST. 19xx` 徽章——年代寫進沿革表，不做成標章
- ❌ 不做「可愛化」：不加腮紅、不加高光點、不把眼睛放大成兩顆大圓（那是 2020 年代的 mascot，不是 1962 年的自然讀本）

---

## 十、頁面骨架範例（可直接使用）

```html
<body>
  <!-- ambient 色場帶 -->
  <div class="band" aria-hidden="true"><div>
    <i class="p"></i><i class="m"></i><i class="t"></i><i class="o"></i><i class="l"></i>
    <i class="p"></i><i class="m"></i><i class="t"></i><i class="o"></i><i class="l"></i>
  </div></div>

  <header class="top"><div class="topin">
    <a class="brand" href="index.html">
      <svg class="mk" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#DB6F3D" fill-rule="evenodd"
              d="M2 4H46V44H2Z M38 32A10 10 0 1 1 18 32 10 10 0 0 1 38 32Z"/>
        <path fill="#45A3A4" d="M32 4h14v14Z"/>
        <rect x="2" y="4" width="9" height="40" fill="#B78A1C"/>
      </svg>
      <span class="bwrap"><b>FEWEST</b><span class="sub">少塊自然讀本社</span></span>
    </a>
    <nav class="notch" aria-label="主要"><ul>
      <li><a href="index.html" aria-current="page">本月讀本</a></li>
      <li><a href="plates.html">圖版總目</a></li>
    </ul></nav>
  </div></header>

  <main id="main">
    <section class="wrap rise">
      <div class="open">
        <div class="stage"><!-- 形塊 SVG --></div>
        <div>
          <p class="lede">一句話講完你在做什麼。</p>
          <dl class="colophon"><dt>標籤</dt><dd>內容</dd></dl>
          <a class="btn" href="#">主要動作</a>
        </div>
      </div>
    </section>

    <div class="rule"></div><!-- 5px 滿版墨線 -->

    <section class="wrap rise">
      <div class="sechead"><span class="no">01</span><h2>節　標　題</h2>
        <p>右對齊的一句註記。</p></div>
      <div class="plates"><!-- gap:0 的卡片牆 --></div>
    </section>
  </main>

  <div class="band thin" aria-hidden="true">…</div>
  <footer>…</footer>
</body>
```

---

## 十一、技術實作與相容性

本站的三項核心技術，選擇理由一律是「這個流派的視覺特徵需要它」，不是「這個技術很酷」。

### 技術 1　`oklch()` 與 `color-mix()`（C 版面與樣式層）

**承載**：特徵 3「五色等亮」與 input-driven 動效「提彩」。
等亮這件事只能在感知均勻的色彩空間裡宣告：`oklch(L C H)` 讓五個色相共用同一個 L，寫出來的 CSS 本身就是這條規則。用 hex 或 hsl 都做不到——hsl 的 L 不是感知亮度，同樣的 `hsl(*,60%,50%)` 黃色會比藍色亮一倍以上。hover 只加彩度（C 從 .150 → .186，L 與 H 不動）也是同一個理由：任何在 sRGB 裡「調亮一點」的做法都會破壞特徵 3。

**支援度查證（2026-08-27）**：MDN《oklch()》與《color-mix()》。`oklch()` 為 **Baseline Widely available**，Chrome/Edge 111+、Firefox 113+、Safari 15.4+，2026 年初全球覆蓋約 93%。`color-mix()` 為 Baseline 2023（newly available），Chrome/Edge 111+、Firefox 113+、Safari 16.2+。兩者皆非旗標功能。

**Fallback（無 `@supports`，用宣告順序）**：每一個變數先寫 sRGB hex，再寫 oklch。不認得 oklch 的引擎在解析第二次宣告時會丟棄整條宣告，保留 hex 值。三個 tint 也一樣先寫 hex 再寫 `color-mix()`。**降級後畫面完全相同**（hex 就是 oklch 值轉出來的），只有 hover 的彩度差會略小，資訊零損失。

### 技術 2　`@starting-style` + `transition-behavior: allow-discrete`（B 動效與時間軸層）

**承載**：簽名動效「形塊脫落」與轉場「上片」。
形塊被拿掉時必須先演完 300ms 的位移旋轉縮小，然後**真的從版面消失**（`display:none`）——否則它會繼續吃掉滑鼠事件與 Tab 焦點。`display` 是離散屬性，沒有 `allow-discrete` 就補不了間，只能靠 `setTimeout` 手動切換（而那會在快速連點時錯亂）。反過來，一塊形被「裝回去」或整張圖重新裝上時，元素是**新被繪製**的，只有 `@starting-style` 能給它一個起始狀態；用 JS 加 class 再強制 reflow 是同一件事的髒版本。

**支援度查證（2026-08-27）**：web.dev《Now in Baseline: animating entry effects》與 MDN《transition-behavior》。`@starting-style` 與 `transition-behavior: allow-discrete` 隨 **Firefox 129（2024-08）** 一起成為 **Baseline newly available**；Chrome/Edge 117+（`transition-behavior` 121+）、Safari 17.4+（`allow-discrete` 17.5+）、Firefox 129+。已知限制：Safari 目前不支援 `overlay` 的 `allow-discrete`，故 popover／dialog 的關閉動畫會直接跳掉——**本站不使用 popover 或 dialog**，不受影響。

**Fallback**：
```css
@supports not (transition-behavior:allow-discrete){ .sh.gone{ display:none } }
```
不支援時形塊直接消失、進場直接到位，**遊戲判定、塊表、收工單完全不變，資訊零損失**。

### 技術 3　單調識別規則引擎與窮舉底數（E 資料與生成層）

**承載**：核心功能的全部判定、二十四張圖版背面印的「底數」與「收工法數量」、以及首頁 ambient 的示範拿法順序。

三位判官的規則（見第七章）具有**單調性**：拿掉一塊只會讓三欄分數同時下降或不動。由此得到三個可以寫進文案的性質：
1. 任何通過的子集，它的超集也通過 → **底數（全域最小解）一定走得到**。
2. 但貪心會卡在**局部極小**（每一塊都拿不掉，卻不是最少的那一個）→ 順序有意義，遊戲才成立。
3. 被退回的一塊之後不會忽然變成可以拿 → 退稿是真的退稿，不會有詭異的來回。

**底數與收工法數量**在建置階段以窮舉算出（每張圖 2ⁿ 個子集，n ≤ 16），寫死進頁面。實測：二十四張圖全部窮舉（含每個通過子集再檢查它是不是局部極小）在 Node 22 單執行緒 **127ms**。瀏覽器端執行期只做兩件事：每次點擊一次 `judge()`（O(n)），以及「還有沒有合法的一步」掃描（O(n²)，n ≤ 16 → ≤ 256 次判定），**實測 0.0067ms**。純 JavaScript，無瀏覽器 API 依賴，無相容性問題。

**平衡實測**：以 24 張圖 × 400 次隨機亂點模擬（共 9,600 局）：走到底數 8.2%、差一塊 20.1%、差二到三塊 47.2%、更差 24.4%；其中 34.9% 是被退稿三次而收工。亂點很難走到底數，但也不會完全走不動——這正是要的難度。

### 效能預算實測（2026-08-27）

| 項目 | 實測 | 門檻 |
|---|---|---|
| index.html（含全部 inline CSS/JS/SVG） | 60.3 KB | ≤350 KB |
| plates.html（24 張圖版全部 inline SVG） | 78.8 KB | ≤350 KB |
| reduce.html／press.html | 51.3 KB／51.5 KB | ≤350 KB |
| 首屏 JS：解析 14.3 KB 圖版 JSON | 0.101 ms | ≤100 ms |
| 首屏 JS：其餘（一次 localStorage 讀取 + 一個 setTimeout） | <1 ms | ≤100 ms |
| 每次點擊的完整合法性掃描（n=16） | 0.0067 ms | — |
| 主要動畫 | 色場帶為單一 `transform:translateX`（合成層，零 layout）；形塊脫落每次只動 1 個元素的 opacity/transform | 60fps |

外部資源僅 Google Fonts（Jost／Noto Sans TC／Yellowtail，`display=swap`）。零外部圖片、零音檔、零 JS 函式庫。

---

*本 SKILL.md 對應範例站：`sites/fewest`（FEWEST 少塊自然讀本社）。風格為既有流派，血緣與外部參照見第〇章。*
