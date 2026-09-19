---
name: vienna-gitterwerk
description: Vienna Secession after 1903, the wrought-iron Gitterwerk half — an open orthogonal lattice of bands, hairlines and square nodes on printed white, one vermilion under five percent, no gold and no checkerboard, with every length in the stylesheet an integer multiple of a single module.
---

# 維也納分離派・格柵半身 Vienna Gitterwerk — 網頁風格規格書

> **這一份講的是分離派的哪一半**
> 一八九七年成立的維也納分離派有兩個不同的身體。一個是**印刷的**：《Ver Sacrum》的正方開本、黑白棋盤格帶、平的金、被塞進格子裡的字母——那是 Koloman Moser 與維也納工坊金工的身體（本館另有一站 `fangtsun` 專講這一半）。
> 另一個是**鍛出來的**：一九〇三年以後 Josef Hoffmann 把方格帶進建築與五金，於是有了 Purkersdorf 療養院（1904–06）的欄杆、Palais Stoclet（1905–11）的金屬線腳，以及整座維也納在一九〇〇到一九三〇年間裝進樓梯間的**鍛鐵格柵**——升降機的柵門、樓梯的護欄、大門的通風格、機房的隔柵。
> 本規格書只講後面這一半。**它的主角不是實心的色塊，是可以看穿的格子。**

---

## 一、設計哲學

### 1. 格柵是有洞的

棋盤格帶是實心的：黑格白格交替，你看不穿。格柵不是。格柵由**條**（鍛鐵扁鐵，寬）、**髮絲線**（細圓鋼）與**方節點**（焊接處的方鐵塊）組成，構件之間是空的，透光的，看得到後面的牆。這是整個風格的第一個判準：**畫面上的裝飾必須有洞。**把一片格柵填滿變成實心，它就變成棋盤格帶，就跑到分離派的另外一半去了。

### 2. 線不准斷在半路

鍛鐵格柵是一件一件焊起來的。一根扁鐵從這一格走到下一格，它要嘛整根過去，要嘛根本沒有這根。**不會有一根鐵條走到格子邊界就消失。**

所以這個流派的圖樣有一條可以寫成程式的法則：**相鄰兩格在共用邊界上的構件必須同類同寬。**Hoffmann 的圖樣不是「畫得小心」，是這條法則自動保證的。第八章會把它寫成八行程式。

### 3. 一個模矩，沒有第二個

Hoffmann 被同行叫做「Quadratl-Hoffmann」（方格仔霍夫曼），不是因為他愛畫方塊，是因為他的每一件東西——門格、把手長度、名牌字高、鉚釘間距——都是同一個邊長的整數倍。**不是「看起來很方」，是量得出來的方。**

網頁上要做到這件事，判準很硬：樣式表裡**不准出現任何一個獨立的長度數字**。不是「大部分用變數」，是零。唯一允許出現自由長度的地方是模矩自己的定義。第五章給做法，第十二章給實測數字。

### 4. 朱紅是一小塊漆，不是主色

鍛鐵是黑的，牆是白的。朱紅是後來漆上去的那一點——把手的握處、指示盤的指針、鑰匙孔的護片。**它永遠不到畫面的百分之五**，而且永遠是平塗，沒有漸層、沒有發光、沒有陰影。

### 5. 三秒辨識測試

遮掉全部文字看首屏，懂設計的人要能在三秒內說出「這是分離派的格柵」。做不到就回去加強格柵的密度、加強黑白對比、加強留白的整數倍，**不要加強引擎**。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個流派了。每一項附可直接複製的片段。

### 特徵 1：開放正交格柵（Das Gitterwerk）

只有三種構件，全部正交，沒有第四種：

| 構件 | 寬度 | 用途 |
|---|---|---|
| 條 Band | 0.26 格 | 承重的扁鐵，圖樣的骨 |
| 髮絲線 Haarlinie | 0.06 格 | 細圓鋼，圖樣的筋 |
| 方節點 Knoten | 0.20–0.34 格 | 焊接處，只出現在轉彎與交會 |

**禁止**：斜線、曲線、圓角、漸層、陰影、外框發光。唯一允許的曲線是特徵 5 的那顆球。

```css
/* 一格之內的三種構件，全部用 rect 畫在 SVG 裡，不用 border 也不用 gradient */
/* 條（垂直，從上緣走到中心） */
/* <rect x="0.37U" y="0"      width="0.26U" height="0.5U"/>  */
/* 髮絲線（水平，從左緣走到中心） */
/* <rect x="0"     y="0.47U"  width="0.5U"  height="0.06U"/> */
/* 方節點（三向交會） */
/* <rect x="0.37U" y="0.37U"  width="0.26U" height="0.26U"/> */
```

格柵的**含墨率**要落在 **24%–28%**。低於 20% 會散成一堆線頭，高於 32% 就糊成實心色塊、變成棋盤格帶。動手做完量一次：把所有 `rect` 的面積加起來除以畫布面積。

### 特徵 2：接縫法則（Kantenbedingung）

每一格的四條邊各帶一個條件：`0` 空、`1` 髮絲線、`2` 條。一格只有在

- 它的**左邊條件 = 左鄰的右邊條件**，且
- 它的**上邊條件 = 上鄰的下邊條件**

的時候才准放上去。放不上去的格不准硬放，換一枚放得上去的。

這條法則一寫下去，圖樣就**不可能**有斷在半路的線——因為斷線的那一枚根本不合法。這也是為什麼同一套法則可以生出無限多面不同的柵門，而每一面都是對的。

```js
// 三種條件 × 四條邊，扣掉「只有一條邊有東西」的（那會斷在半路），共 73 枚
var TILES=[];
for(var n=0;n<3;n++)for(var e=0;e<3;e++)for(var s=0;s<3;s++)for(var w=0;w<3;w++){
  var k=(n>0)+(e>0)+(s>0)+(w>0);
  if(k===0||k>=2) TILES.push({n:n,e:e,s:s,w:w});
}
function field(cols,rows,top,left){          // top/left 是兩條邊界條件序列
  var g=[],i,j,k;
  for(j=0;j<rows;j++){ g.push([]);
    for(i=0;i<cols;i++){
      var needW = i===0 ? left[j%left.length] : g[j][i-1].e;
      var needN = j===0 ? top[i%top.length]  : g[j-1][i].s;
      var legal=[];
      for(k=0;k<TILES.length;k++){
        var t=TILES[k]; if(t.w===needW && t.n===needN) legal.push(t);
      }
      // 決定性挑選：純整數混合座標，不用亂數。同樣的條件永遠同一面圖樣。
      g[j].push(legal[(i*13 + j*29 + i*j*5) % legal.length]);
    }}
  return g;
}
```

**不要用亂數。**亂數生成的圖樣每次重整都不一樣，那是生成藝術不是鍛鐵件。條件序列（例如 `12011210` / `10211021`）就是這面格柵的型號，寫在型錄上，訂得到。

### 特徵 3：單一模矩，整數倍，零自由長度

```css
:root{
  --mu:13px;                                   /* 自由長度 1／3 */
  --modul:max(9px, min(var(--mu), 1.35vw));    /* 自由長度 2、3／3 */
  --m1:var(--modul);           --m2:calc(var(--modul)*2);
  --m3:calc(var(--modul)*3);   --m4:calc(var(--modul)*4);
  --m6:calc(var(--modul)*6);   --m8:calc(var(--modul)*8);
  --m12:calc(var(--modul)*12); --m16:calc(var(--modul)*16);
  --m24:calc(var(--modul)*24); --m44:calc(var(--modul)*44);
  --half:calc(var(--modul)/2); --qtr:calc(var(--modul)/4);
  --hair:calc(var(--modul)/16);                /* 髮絲線 = 1/16 格 */
}
body{ font-size:calc(var(--modul)*1.25); line-height:calc(var(--modul)*2) }
h1  { font-size:calc(var(--modul)*2.5);  letter-spacing:calc(var(--modul)/3) }
p   { margin:0 0 var(--m2) 0; max-width:calc(var(--modul)*46) }
```

**字級也是模矩的倍數**——不要另外開一個字級單位。開了第二個單位，這個流派就只剩皮了：Hoffmann 的名牌字高本來就是門格的分數。

驗收辦法（建置期跑一次，不過不准交付）：掃全部 `<style>` 與行內 `style=""`，抓 `\d+(px|rem|em|pt|ch)`，扣掉 `--modul` 自己的定義與 media query 條件，**剩下必須是 0 個**。

### 特徵 4：一個朱紅，不到 5%，永遠平塗

```css
:root{
  --weiss:#FAF9F5;   /* 印出來的白，不是螢幕白 */
  --schwarz:#121110; /* 鍛鐵黑，帶一點暖 */
  --zinnober:#B8271F;/* 朱紅：把手、指針、現用態的下劃 */
  --grau:#8E8A7E;    /* 麻灰：說明文字與髮絲線 */
  --hell:#E6E6E2;    /* 淺灰：凹槽與未啟用 */
}
```

朱紅只准出現在三個地方：**使用者的手會碰的那一件**（把手、推桿）、**正在指的那一根**（指針）、**目前位置的那一道下劃**。其餘一律黑白。

**無金。**金是分離派的另一半（Ver Sacrum 與工坊金工）。這一半是鍛鐵與白漆，一點金都沒有。

### 特徵 5：方節點，與唯一的一顆球

交會處是方的。整片格柵裡唯一允許的圓，是**兩條髮絲線轉彎、且這一格沒有任何一條「條」經過**的時候的那顆小球——Hoffmann 的 Kugel。一面 6×8 的柵門裡會出現兩到三顆，不會更多。

```js
var k = (t.n>0)+(t.e>0)+(t.s>0)+(t.w>0);
if(k===4){ /* 交會：套方環（外環 0.34 格 + 芯 0.14 格） */ }
else if(k===3){ /* 三向：實心方節點 0.26 格 */ }
else {
  var straight = (t.n>0&&t.s>0&&!t.e&&!t.w) || (t.e>0&&t.w>0&&!t.n&&!t.s);
  if(!straight){
    var duenn = (t.n!==2&&t.e!==2&&t.s!==2&&t.w!==2);
    if(duenn) circle(cx, cy, 0.125*U);         // ← 唯一的球
    else      square(cx, cy, 0.20*U);
  }
}
```

---

## 三、色彩系統

| 色票 | Hex | 用途 | 目標比例 |
|---|---|---|---|
| Weiß 印白 | `#FAF9F5` | 底。所有留白 | 62% |
| Schwarz 鍛鐵黑 | `#121110` | 格柵、標題、條 | 26% |
| Hell 淺灰 | `#E6E6E2` | 凹槽、軌道、未啟用按鈕 | 7% |
| Grau 麻灰 | `#8E8A7E` | 髮絲線、說明文、次要標籤 | 4% |
| Zinnober 朱紅 | `#B8271F` | 把手、指針、現用態下劃 | **< 5%，絕不超過** |

規則三條：

1. **沒有第六個顏色。**需要另一個層級的時候用留白或線寬，不要開新色。
2. **沒有中間米色調。**白是 `#FAF9F5`（冷、印刷紙白），不是 `#F0EBDC`（暖、米黃）。暖米色會讓畫面滑向工藝美術運動。
3. **沒有漸層、沒有陰影、沒有透明度堆疊。**深淺只能用「黑 / 淺灰 / 白」三階，不能用 `opacity`。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 設定 |
|---|---|---|---|
| 標題／標籤／數字 | **Archivo** | 900（標籤 700） | `text-transform:uppercase`；`letter-spacing:calc(var(--modul)/3)` |
| 正文中文 | **Noto Sans TC** | 400 | `line-height:calc(var(--modul)*2)` |
| 強調 | Noto Sans TC | 900 | 不用斜體，這個流派沒有斜體 |

字級階（全部是模矩倍數）：

```
h1  2.5 格    h2  1.5 格    h3  1.25 格
正文 1.25 格   標籤 0.95 格   說明 0.95 格
行高一律 2 格（正文與標題同一條基線網）
```

三條硬規則：

- **全大寫的拉丁字一定要拉字距**（≥ 1/6 格）。不拉字距的全大寫是預設字感，不是分離派。
- **不用斜體、不用小型大寫、不用連字。**
- **中文不加字距。**中文本身就是方的，再加字距會散。中文與拉丁並置時，用**行高**對齊而不是用字級對齊。

---

## 五、版面與網格

- 版心 `max-width: calc(var(--modul)*100)`，置中，左右內距 4 格。
- 正文欄寬上限 **46 格**（約 38 字／行）。超過就分欄，不要加寬。
- 段落間距 2 格，區塊間距 4 格，大分節 8 格。**沒有 1.5 格這種東西。**
- 多欄用 `repeat(auto-fit, minmax(calc(var(--modul)*26), 1fr))`，間距 4／6 格。
- **圖文繞排用 `shape-outside`**：格柵母題切一個缺角（L 形），正文的右緣跟著缺角走。這是這個流派少數允許的不對稱。

```css
.motiv{
  float:left; width:var(--m24); height:var(--m24);
  margin-inline-end:var(--m2); margin-block-end:var(--m1);
  shape-outside:polygon(0 0, 100% 0, 100% 50%, 50% 50%, 50% 100%, 0 100%);
  shape-margin:var(--m1);
  clip-path :polygon(0 0, 100% 0, 100% 50%, 50% 50%, 50% 100%, 0 100%);
}
```

- **留白是算過的。**所有留白都是格的整數倍，因此拉動視窗時版面是一格一格跳的。這是手感，不是 bug。

---

## 六、元件配方

### 標籤（Marke）

```css
.marke{
  font-family:'Archivo',sans-serif;font-weight:900;
  font-size:calc(var(--modul)*0.9);letter-spacing:calc(var(--modul)/5);
  text-transform:uppercase;color:var(--grau);
  display:flex;align-items:center;gap:var(--m1);margin-block-end:var(--m1);
}
.marke::after{content:"";flex:1;height:var(--hair);background:var(--hell)}
```

一條髮絲線從標籤右邊一路拉到區塊右緣。這是分節的唯一手段——**不用底色、不用卡片、不用圓角框**。

### 按鈕（Knopf）

```css
.knopf{
  font-family:'Archivo',sans-serif;font-weight:900;text-transform:uppercase;
  letter-spacing:calc(var(--modul)/4);
  background:var(--schwarz);color:var(--weiss);border:none;
  padding:var(--m1) var(--m3);line-height:var(--m2);cursor:pointer;
}
.knopf:hover,.knopf:focus-visible{background:var(--zinnober)}
.knopf.hohl{background:none;color:var(--schwarz);
  box-shadow:inset 0 0 0 var(--hair) var(--schwarz)}
```

**直角、無陰影、無過渡漸層。**hover 是整塊換色，不是變暗。

### 表格（Tafel）

```css
.tafel{width:100%;border-collapse:collapse}
.tafel th,.tafel td{text-align:start;padding:var(--m1) var(--m2) var(--m1) 0;
  border-block-end:var(--hair) solid var(--grau);vertical-align:top}
.tafel th{font-family:'Archivo',sans-serif;font-weight:700;text-transform:uppercase;
  letter-spacing:calc(var(--modul)/6);font-size:calc(var(--modul)*0.95);white-space:nowrap}
```

只有橫線，沒有直線，沒有斑馬紋，沒有外框。

### 導覽（不用置頂列）

這個流派的導覽應該是**一件物**，不是一條列。本站用的是井道軌：一根垂直的軌、一個方形車廂，四個停靠點就是四頁。原則可以搬到別的產業：抽屜櫃的四層、配電盤的四個閘刀、樂譜架的四格。**重點是導覽自己要是格柵裡的一個構件**，不是浮在上面的一條 bar。

### 現用態（見動效規則的簽名）

```css
/* 不換色、不加粗、不放大。整項往上錯開四分之一格，它底下那條髮絲線斷掉。 */
li[aria-current="page"]{transform:translateY(calc(var(--qtr)*-1))}
li[aria-current="page"] .de{border-block-end:var(--hair) solid var(--zinnober)}
li[aria-current="page"] .fuge{background:none}
```

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可。

| 類 | 內容 | 觸發 | duration / easing |
|---|---|---|---|
| **環境 ambient** | 頁首格柵帶每 6 秒有一枚構件原地轉 90°，圖樣慢慢重織 | 時間，`setInterval(6000)` | 900ms `cubic-bezier(.6,0,.3,1)` |
| **輸入 input-driven** | 把手按下即時下沉並轉朱紅；柵門條的 `flex-grow` 跟著開合；邊緣條件按鈕即時重拼整面 | pointer／鍵盤，延遲 < 100ms | 120ms linear／320ms `cubic-bezier(.4,0,.2,1)` |
| **轉場 transition** | 換頁時車廂沿井道軌行駛到該樓層；hover 別層會把同一個 Animation 物件 seek 過去預覽，離開就 `reverse()` | 頁面載入／hover／focus | 260ms + 每層 220ms，`cubic-bezier(.4,0,.2,1)` |
| **簽名 signature** | **四分之一格錯位**：見下 | 狀態 | 靜態位移（不補間） |

### 簽名：四分之一格錯位（Viertelmodul-Versatz）

在一個所有東西都嚴格對齊到同一條模矩線的版面裡，把一樣東西往上錯開四分之一格，是最響亮的訊號——比換顏色、比加粗、比放大都響。所以：

- **「你在哪裡」不用顏色表示，用錯位表示。**現用的導覽項整項上移 1/4 格，它下面那條髮絲線因此斷開。
- 車廂停在樓層時也不是齊平的，它停低 1/4 格——因為手動梯本來就停不平。
- 而核心功能把同一個語彙**反過來用**：在停層檯裡，錯位是失敗；你要做的事就是把它消掉。

`prefers-reduced-motion` 下這個簽名**完整保留**——它是一個位置，不是一段動畫。

### 把「手感」調到真的做得到

如果核心互動要求使用者在某個位置放手，**先算一次放手的時間窗**：窗寬 = 2 × 容許誤差 ÷ 放手當下的速度。全速放手的窗通常只有幾十毫秒，那不是難，那是壞掉。本站的解法是史實本身——每一層樓面前一公尺有**減速凸輪**，車廂被強制降到爬行速度（25 cm/s），於是 ±3 公分的窗變成 **240 毫秒**，實測 224 毫秒。先量這個數字再調參數。

### 降級規範

```css
@media (prefers-reduced-motion:reduce){
  *{animation-duration:1ms !important;animation-iteration-count:1 !important;
    transition-duration:1ms !important;scroll-behavior:auto !important}
}
```

四種動態各自的降級與資訊保留：

1. 環境：整個停掉（JS 端 `matchMedia` 判斷後不啟動 interval）。圖樣仍然全部可見，只是不再重織——**零資訊損失**。
2. 輸入：狀態立即到位，不做補間。所有回饋（顏色、開合、重拼）照常發生。
3. 轉場：車廂直接就定位，不行駛。
4. 簽名：**原樣保留**。

核心功能另外提供「逐格」按鈕：第一下把車廂開到減速凸輪前二十公分，之後一下兩公分，完全不需要任何滑行手感或時間感也能把梯停平、拿到同一張執照（已模擬驗證：逐格路徑三趟連平成功發照）。

---

## 八、插畫與圖像風格

**這個流派不畫插畫，它拼格柵。**所有圖像——頁首帶、柵門型錄、母題、logo、favicon——都是同一套 73 枚磚按特徵 2 的法則拼出來的，沒有一張是手繪路徑。

做法：

1. 決定一個上緣條件序列與一個左緣條件序列（各 4–12 位的 `0/1/2` 字串）。這一對就是圖樣的型號。
2. 用特徵 2 的 `field()` 拼出格陣，逐格畫出構件。
3. 建置期驗算兩件事：**接縫不合處必須是 0**；**含墨率落在 24–28%**。

```js
function check(g){                     // 接縫驗算：跑完必須回傳 0
  var bad=0,i,j;
  for(j=0;j<g.length;j++) for(i=0;i<g[0].length;i++){
    if(i>0 && g[j][i-1].e !== g[j][i].w) bad++;
    if(j>0 && g[j-1][i].s !== g[j][i].n) bad++;
  }
  return bad;
}
```

不同的用途用不同的密度：

| 用途 | 格數 | 格邊長 | 含墨率 |
|---|---|---|---|
| 頁首帶 | 40 × 2 | 24 | 27% |
| 柵門型錄 | 6 × 8 | 24 | 25–26% |
| 編輯器示範 | 8 × 8 | 24 | 25% |
| 單枚磚展示 | 1 × 1 | 24 | — |

**禁止**：外部圖片、照片、細線幾何線描（線框小屋那一套）、等角視圖、半調網點、噪點做舊。

---

## 九、Logo 與 Favicon

Logo 由兩件組成，全部用 `rect` 畫，沒有一條曲線：

1. **記（Marke）**：一個 18 格見方的外框（框寬 2 格），框內兩枚 4 格見方的黑方塊沿對角排，第三枚同尺寸的方塊塗朱紅。這是柵門的縮寫。
2. **字（Wortmarke）**：字母長在 6×9 格的網上，筆畫寬一律 2 格，**只有正交線段**。`A` 頂是平的，`Q` 的尾巴是一枚脫離字身的方塊，`R` 的腿是一根直落的條。字距 2 格。

```
字母配方（[x, y, w, h]，單位＝格，字身 6×9）
Q [0,0,6,2] [0,7,6,2] [0,2,2,5] [4,2,2,5] [5,5,2,2] [6,7,2,2]
U [0,0,2,7] [4,0,2,7] [0,7,6,2]
A [0,0,6,2] [0,0,2,9] [4,0,2,9] [0,4,6,2]
D [0,0,6,2] [0,7,6,2] [0,0,2,9] [4,2,2,5]
R [0,0,2,9] [0,0,5,2] [3,2,2,2] [0,4,5,2] [4,5,2,4]
T [0,0,6,2] [2,2,2,7]
```

Favicon 是 logo 的記，縮到 32×32：外框 2px、兩枚 7px 黑方塊沿對角、右上一枚 7px 朱紅方塊。原創 inline SVG data URI 寫在 `<head>`，**不要用 .ico、不要用外部檔**。

---

## 十、Do & Don't

### Do

- 格柵要有洞，含墨率量出來給自己看。
- 接縫法則寫成程式，讓它保證線不斷。
- 一個模矩，整數倍，建置期驗算到 0。
- 朱紅少到你要找一下才找得到。
- 導覽做成一件物，不是一條置頂 bar。
- 現用態用錯位，不用顏色。
- 每一種動態都問一次：關掉它之後，有沒有任何資訊消失？

### Don't

- **不要棋盤格帶。**實心交替色塊是分離派的另一半，兩半不要混。
- **不要金。**一點都不要。
- 不要暖米色底、不要紙纖維質感、不要做舊噪點。
- 不要斜線、曲線、圓角、陰影、漸層、`opacity` 疊色。
- 不要第二個長度單位（尤其不要單獨的字級單位）。
- 不要亂數生成圖樣——同一個型號每次要長一樣。
- 不要跑馬燈、不要置中大標＋兩顆按鈕＋三張卡片、不要 emoji 當 icon、不要 Lorem ipsum、不要「EST. 19xx」徽章。
- 不要紫藍漸層 hero。

---

## 十一、頁面骨架範例

```html
<body data-stock="0">
<div class="rahmen">

  <header class="kopf">
    <a class="wort" href="index.html"><!-- inline SVG 字標 --></a>
    <p class="kopfsatz">工房名 · 中文名<br>地址<br>營業時間</p>
  </header>

  <!-- 環境動效就掛在這條帶上 -->
  <div id="kopfband" class="feldrahmen" aria-hidden="true"><!-- 40×2 格柵 --></div>

  <!-- 導覽是一件物：一根軌 + 一個車廂 -->
  <nav class="schacht" aria-label="樓層">
    <div class="gleis"><div class="rohr"></div><div class="korb"></div></div>
    <ol class="stockliste" reversed>
      <li data-f="3"><a href="c.html"><span class="nr">3</span><span class="de">WERKSTATT</span>
        <span class="zhn">工房</span><span class="fuge"></span></a></li>
      <li data-f="0" aria-current="page"><span class="stell"><span class="nr">0</span>
        <span class="de">HALLE</span><span class="zhn">門廳</span><span class="fuge"></span></span></li>
    </ol>
  </nav>

  <main>
    <section class="anzeiger">
      <!-- 開場：一個佔版心的半圓指示盤，不是大標 hero -->
      <svg viewBox="0 0 360 208">…</svg>
      <div class="anzeigertext">
        <div class="marke">Erdgeschoß · 門廳</div>
        <h1>兩行以內的<br>具體事實</h1>
        <p>正文。</p>
      </div>
    </section>

    <section>
      <div class="marke">分節標籤</div>
      <table class="tafel">…</table>
    </section>

    <section>
      <div class="motiv" aria-hidden="true"><!-- L 形格柵母題 --></div>
      <div class="marke">分節標籤</div>
      <p>正文會沿著母題的缺角繞排。</p>
    </section>
  </main>

  <footer class="fuss">…</footer>
</div>
</body>
```

---

## 十二、技術實作與相容性

本站的三項核心技術、查證結果、fallback 與實測值。

### 技術 1｜Wang 磚邊緣匹配拼砌（E 資料與生成層）

- **承載什麼**：特徵 1 與特徵 2。所有格柵圖樣、logo 以外的全部圖像，以及型錄上六款柵門的差異。
- **支援度**：不涉及任何瀏覽器 API——純整數運算 + `<rect>` / `<circle>`。在任何能跑 SVG 的環境都成立。
- **fallback**：建置期已把每一面格柵拼好寫進 HTML；執行期的 JS 只在容器是空的時候才重拼。**關掉 JavaScript，全部圖樣照樣在。**
- **實測**：73 枚磚。6×8 柵門一面 = 48 格、約 195 個 `rect` + 2–3 個 `circle`、約 10.1 KB、接縫不合處 **0**、含墨率 25.6%±0.8。40×2 頁首帶接縫不合處 **0**。六款柵門的條件序列互不相同，輸出互不相同；同一組條件重複執行輸出位元相同（決定性已驗）。

### 技術 2｜Web Animations API 群組時間軸（B 動效與時間軸層）

- **承載什麼**：轉場動效（車廂行駛到樓層）與環境動效（構件轉 90°）。關鍵在 `Element.animate()` 回傳的 `Animation` 物件可以被**留著**：hover 別的樓層時不是再做一個新動畫，是把同一個物件 seek 過去預覽，離開就 `reverse()`。
- **支援度（2026-09 查證）**：MDN 標示 `Element.animate()` 為 Baseline **widely available**（2020-03 起）；caniuse 的 Animation API 表列 Chrome 75 / Edge 79 / Safari 13.1 / Firefox 48。`currentTime`、`reverse()`、`playbackRate`、`finished` 屬同一個 `Animation` 介面。
  查證來源：`developer.mozilla.org/en-US/docs/Web/API/Element/animate`、`caniuse.com/mdn-api_animation`、`caniuse.com/web-animation`。
  **未採用 `Animation.persist()`**：該方法的逐瀏覽器最低版本未能查證到具體數字，改用 `fill:'both'` 達成同樣效果。
- **fallback**：`prefers-reduced-motion: reduce` 或 `Element.animate` 不存在時，車廂直接以 `style.transform` 就定位，不做任何補間；所有狀態與資訊不變。
- **實測**：單次行駛 260–920 ms（每層 +220 ms）；行駛中只動 `transform`（合成層屬性），無 layout thrashing。

### 技術 3｜CSS `shape-outside` / `shape-margin`（C 版面與樣式層）

- **承載什麼**：版面與網格章的圖文繞排——正文右緣跟著格柵母題的 L 形缺角走。這是本風格唯一允許的不對稱。
- **支援度（2026-09 查證）**：MDN 標示 Baseline **widely available**，各家互通自 **2020 年 1 月**起；caniuse 列 Chrome 37 / Edge 79 / Safari 10.1 / Firefox 62。`polygon()` 等 `<basic-shape>` 值與屬性本身同時出貨。
  查證來源：`developer.mozilla.org/en-US/docs/Web/CSS/shape-outside`、`caniuse.com/mdn-css_properties_shape-outside`。
- **fallback**：不支援時 `float` 仍然生效，母題照樣浮在左邊，正文變成矩形繞排——只少掉缺角那一段凹進去的效果，**沒有任何內容消失或重疊**。手機（≤560px）本來就取消 float 改為上下堆疊。

### 附帶查證

- `prefers-reduced-motion`：Baseline widely available（2020-01），Chrome 74 / Edge 79 / Safari 10.1 / Firefox 63。來源：`caniuse.com/prefers-reduced-motion`。
- `calc(var(--x) * n)`：受限於自訂屬性本身，Chrome 49 / Edge 16 / Safari 10 / Firefox 31。來源：`caniuse.com/css-variables`。
- 邏輯屬性（`margin-inline`、`inset-block`、`border-block-end`）：全數 Baseline widely available。

### 效能預算實測

| 頁 | 大小（含全部 inline 資源） | 預算 |
|---|---|---|
| `index.html` | 46.6 KB | ≤ 350 KB ✓ |
| `modelle.html` | 113.8 KB | ≤ 350 KB ✓ |
| `fahrt.html` | 57.9 KB | ≤ 350 KB ✓ |
| `werkstatt.html` | 47.5 KB | ≤ 350 KB ✓ |

- 零外部圖片、零外部音檔、零 JS 函式庫。外部資源只有 Google Fonts 兩支。
- 首屏 JS：格柵在 HTML 裡已經拼好，載入時不重拼；執行的只有車廂定位與事件綁定（< 10 ms 等級）。
- 主要動畫只改 `transform` 與 `flex-grow`，不觸發 layout。
- 模矩驗算：四頁合計 **645 處** 模矩衍生長度、**0 處** 自由絕對長度（建置期腳本逐條掃描 `<style>` 與行內 `style`，扣除 `--modul` 自身定義與 media query 條件）。
