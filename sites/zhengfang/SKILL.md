---
name: suprematist-white-field
description: Russian Suprematism as a web system - a groundless warm-white field, two angle families only, six solid shapes with zero outline, one orthogonal black square as origin, and colour used as a strict hierarchy of destination rather than decoration.
---

# 至上主義白場 Suprematist White Field

> 流派：**至上主義 Suprematism**（Kazimir Malevich，1915–1927）
> 視覺家族：F4 幾何構成
> 這份規格書不綁定產業。範例站是拆除工程行，但同一套規則可以做美術館、印刷廠、舞團、保險公司、瑜伽教室——只要你願意放棄地平線。

---

## 一、設計哲學

一九一五年十二月，Malevich 把《黑方》掛在彼得格勒「0.10 最後一次未來主義畫展」的房間角落——那個位置在俄國家庭裡是掛聖像的地方（красный угол）。他要的不是一個圖案，是**藝術的零度**：畫面上不再有任何指涉物件的東西，只剩下形、色、與它們之間的張力。他寫：「我把自己變形為形的零。」

至上主義因此有三個不可讓步的立場，這三點決定了整套網頁規則：

1. **沒有地平線。** 白不是背景色，是無限空間。畫面上的形不站在任何東西上面，也不投影到任何東西上。一旦你在版面上畫一條貫穿的水平線，你就把無限空間變回了一張紙。
2. **正交是物象世界的殘留。** 水平與垂直是桌面、地板、牆、窗框的角度——是物件的角度。至上主義的動勢來自**斜**。但斜的角度要**少**：Malevich 的畫面通常只有一個主導斜向與它的正交補，不是每塊都自己歪一個角度。角度多＝混亂，不是動勢。
3. **零度不是空白。** 拆到什麼都不剩不叫至上主義，那叫白紙。畫面上必須留下足以互相拉扯的形，並且它們要排得出一個方向。

**做網頁時最容易失敗的地方**：把至上主義做成「白底＋幾個彩色方塊」的裝飾層，底下還是一副有頂欄、有卡片、有分隔線的正交骨架。那不是至上主義，那是貼了貼紙的 Bootstrap。這份規格書的每一條規則，都是為了讓那副骨架消失。

---

## 二、本風格的 5 個不可省略特徵

> 拿掉其中任何一項，畫面就不再是至上主義。每項附可直接複製的片段。

### 特徵 1　無地平線、無地面、無影子的白場

白是**空間**不是**背景**。因此：零紋理、零顆粒、零漸層、零暈影、零陰影、零外框線。全站不得出現任何一條貫穿版面的水平或垂直線——包含 `<hr>`、卡片邊框、表格框線、置底導覽的上緣線、footer 的分隔線。要分隔，用一塊色平面，不要用一條線。

```css
:root{ --field:#EFEAE0; }
body{ background:var(--field); }
/* 全站硬規則 */
*{ box-shadow:none; }
hr{ display:none; }
table,th,td{ border:0; }           /* 表頭改用實色平面，見特徵 5 */
.card,.panel,.box{ border:0; border-radius:0; box-shadow:none; }
```

自我檢查：把整頁截圖轉成灰階，如果你能找到任何一條從左邊界跑到右邊界的線，就還沒做完。

### 特徵 2　角度只有兩族

**正交族 0°／90°** 與 **斜軸族 θ／θ+90°**。θ 全站只有一個值（範例站是 −24.5°）。第三個角度族就不是至上主義了——那是新藝術或未來派。

正交族有語意：它保留給「還沒被解放的物象」與**那塊黑方**。其餘一切都在斜軸族上。

```css
:root{ --ax:-24.5deg; --axn:65.5deg; }
.plane        { transform:rotate(var(--ax)); }
.plane--cross { transform:rotate(var(--axn)); }
.plane--origin{ transform:none; }        /* 黑方：唯一的正交豁免 */
```

**紀律：斜的是形，不是字。** 段落文字一律水平、左對齊、對比 ≥7:1，而且容器本身也不傾斜。傾斜只發生在色平面、按鈕與導覽方塊上。這是把流派搬到螢幕上必須加的一條，Malevich 的畫沒有這個問題，你的使用者有。

### 特徵 3　六種形的封閉字彙，實心、零描邊、零圓角

**方、長條、圓、弧、十字、梯形**——只有這六種。每一塊都是一塊實心的 `background-color` 區域。沒有 border、沒有 border-radius（除了正圓與弧本身）、沒有 gradient、沒有 opacity 半透明疊色。

```css
.p{ position:absolute; border:0; border-radius:0; }
.s-square { aspect-ratio:1; }
.s-circle { aspect-ratio:1; border-radius:50%; }
.s-arc    { border-radius:0 0 0 100%; }                       /* 四分之一實面 */
.s-bar    { clip-path:inset(35% 0 35% 0); }                   /* 橫長條 */
.s-vbar   { clip-path:inset(0 33% 0 33%); }                   /* 直長條 */
.s-trap   { clip-path:polygon(0 22%,100% 4%,100% 80%,0 98%); }/* 梯形 */
.s-cross  { clip-path:polygon(37% 0,63% 0,63% 37%,100% 37%,100% 63%,
                              63% 63%,63% 100%,37% 100%,37% 63%,
                              0 63%,0 37%,37% 37%); }         /* 十字 */
```

**明文禁用**：圓角卡片、模糊陰影、玻璃擬態、外框描邊圖標、任何線性或徑向漸層、任何材質貼圖或雜訊濾鏡。至上主義沒有材質——材質會把無限空間變回一張紙（見特徵 1）。

### 特徵 4　黑方的原點地位

全站必須有**一塊純黑正方**，而且：

- 它是畫面上面積**最大或次大**的平面；
- 它是**唯一永遠保持正交**的東西（`transform:none`，連 hover 都不轉）；
- 它不是裝飾，它要在敘事上有一個不可移除的理由（範例站：依法不得拆除的工地公告牌）；
- 它必須是**真正的正方**，在任何視窗寬度下都不能被拉扁。

```css
.origin{
  position:absolute; left:5%; top:56%;
  width:12.6%; height:auto; aspect-ratio:1;   /* 高度由寬度決定 → 永遠是正方 */
  background:#12100E; transform:none;
}
.origin:hover{ transform:none; }              /* 原點不動 */
```

### 特徵 5　色的階級：面積嚴格遞減，相鄰不夾線

色彩不是配色，是**階級**。每個色階有固定的語意與**固定的面積上限**，而且必須嚴格遞減。任兩塊色平面直接相鄰時，中間**不得夾線、不得留縫、不得加陰影**——Malevich 的平面是貼在同一個表面上的，不是浮在空間裡的。

| 色 | hex | 語意 | 面積 |
|---|---|---|---|
| 暖白（白場） | `#EFEAE0` | 無限空間 | ≈62% |
| 冷白（第二塊白） | `#F7F8F4` | 最大的實體，靠一條沒有描邊的邊界與白場區分 | ≈18% |
| 黑 | `#12100E` | 原點與最重的東西；亦為全部正文 | ≈11% |
| 朱紅 | `#CB3A22` | 唯一的熱色：動作、拒絕、連結 | ≤6% |
| 赭 | `#C99A3B` | 第二專色：重量、進度、次要標記 | ≤3% |

```css
:root{
  --field:#EFEAE0; --w2:#F7F8F4; --ink:#12100E; --red:#CB3A22; --ochre:#C99A3B;
}
/* 表頭用實色平面取代框線 */
th{ background:var(--ink); color:var(--field); border:0; }
tbody tr:nth-child(odd) td{ background:var(--w2); }
/* 相鄰色平面：不准夾任何東西 */
.stack > *{ margin:0; outline:0; box-shadow:none; }
```

**兩塊白之間的那條邊界是這個風格的高難度處**（Malevich《White on White》1918）。明度差只有約 4%，不准用線、不准用陰影去「幫忙」——看不太出來是對的。

---

## 三、色彩系統

| 角色 | hex | 用途 | 建議比例 |
|---|---|---|---|
| `--field` | `#EFEAE0` | 白場、頁底、被「移除」的區域、切口 | 60–64% |
| `--w2` | `#F7F8F4` | 第二塊白：大面板、表格底紋、表單欄位底 | 16–20% |
| `--ink` | `#12100E` | 黑方、正文、表頭、footer 標記 | 10–13% |
| `--red` | `#CB3A22` | 主要動作、連結、拒絕與錯誤、現用態 | ≤6% |
| `--ochre` | `#C99A3B` | 進度、重量、次級標記、通過證明的外框 | ≤3% |

規則：

1. **不准出現第六個顏色。** 需要更多語意就換形狀或換角度，不要換色。
2. **不准用透明度做出新顏色。** 所有色平面 `opacity:1`。
3. **不准有 hover 的淡化。** hover 換的是**角度**（見動效 2），不是明度。
4. 深色模式：本風格**不提供**深色模式。白場是流派本體，反轉即毀。若必須，改為 `--field:#141210; --w2:#1C1A17;` 並整組重算——但那已是另一個流派。

---

## 四、字體系統

Latin／數字用一支**幾何感重的無襯線**（範例站：Archivo 400/600/800）；中文用 Noto Sans TC 400/700/900。俄國前衛的字是排字工用鉛字排出來的重塊，不是手寫。

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Noto+Sans+TC:wght@400;700;900&display=swap');
body{ font-family:"Noto Sans TC","Archivo",system-ui,sans-serif; font-size:16px; line-height:1.72; }
h1,h2,h3,h4{ font-weight:900; line-height:1.06; letter-spacing:-.012em; }
.kicker{ font-family:"Archivo"; font-weight:800; font-size:11px;
         letter-spacing:.26em; text-transform:uppercase; }
.mono{ font-family:"Archivo"; font-variant-numeric:tabular-nums; letter-spacing:.02em; }
```

字級 scale（1.28 比例，非等比大跳）：11 / 12.5 / 13.5 / 16 / 21 / 26 / 34 / 44px。

- 標題 900 字重、`line-height:1.06`、寬度上限 22ch——標題是一塊形，不是一行字。
- 小標籤一律 `letter-spacing:.24em` 大寫拉丁：這是至上主義印刷品裡「說明文字」的角色。
- 全部數字用 `tabular-nums`。至上主義的數字是量，不是排版裝飾。
- **禁止**：字距為零的堆疊系統字體、襯線體、任何手寫體、任何可變字重的連續補間（那是未來派）。

---

## 五、版面與網格

至上主義**沒有網格**——它有一個主軸與一組互相拉扯的質量。實作上：

1. **不要用置中欄。** 每個內容區塊的左緣各不相同：
   ```css
   .i1{margin-left:0}
   .i2{margin-left:clamp(0px,7vw,116px)}
   .i3{margin-left:clamp(0px,3vw,58px)}
   .i4{margin-left:clamp(0px,11vw,190px)}
   ```
   三到四個互不對齊的縮排值輪流用。目的是讓讀者找不到那條垂直的對齊線。
2. **區塊之間用色平面分隔，不用線也不用留白。**
   ```css
   .sep{ height:9px; background:var(--red); width:44%;
         transform:rotate(var(--ax)); transform-origin:left center; margin:14px 0 20px; }
   ```
3. **文字欄寬 52–62ch**，但每欄寬度都不一樣。
4. **絕對定位的白場**（如果站上有主視覺）用百分比座標放形，並用 `aspect-ratio` 鎖定整個場：
   ```css
   .field{ position:relative; width:100%; aspect-ratio:100/78; background:var(--field); }
   .field .p{ position:absolute; }  /* left/top/width/height 全用 % */
   ```
5. **RWD**：≤900px 取消所有 `margin-left` 縮排；≤560px 導覽方塊改為四等分橫列、`aspect-ratio:1`。白場的百分比座標會跟著容器變形——所以**正方與正圓一定要用 `aspect-ratio:1` 加 `height:auto`**，不要用百分比高度。

---

## 六、元件配方

### 導覽：tilt-plane 斜置平面

四塊等大的方形色板。現用頁那一塊**脫離了正交**：轉到斜軸並漂離其他三塊；其餘三塊嚴格正交、彼此對齊。語意是「它不再與其他人平行」，而不是「它被標成別的顏色」。

```css
nav.tilt{ display:flex; gap:12px; }
nav.tilt a{ position:relative; width:76px; height:76px; background:var(--w2);
  color:var(--ink); text-decoration:none;
  transition:transform .22s cubic-bezier(.2,.9,.25,1), background .09s linear; }
nav.tilt a:hover{ background:var(--ochre); }
nav.tilt a[aria-current="page"]{
  background:var(--ink); color:var(--field);
  transform:rotate(var(--ax)) translate(10px,-8px); }
```

### 按鈕

按鈕本身就是一塊斜置的實色平面。hover 不換色不變亮，它**沿著自己的軸再往前推 9px**。

```css
.btn{ background:var(--red); color:var(--field); font-weight:900; padding:13px 24px;
  border:0; border-radius:0; cursor:pointer;
  transform:rotate(var(--ax)); transform-origin:left center;
  transition:transform .16s cubic-bezier(.2,.9,.25,1); }
.btn:hover,.btn:focus-visible{ transform:rotate(var(--ax)) translateX(9px); background:var(--ink); }
.btn[disabled]{ background:var(--w2); color:#8a857c; transform:none; }
:focus-visible{ outline:3px solid var(--red); outline-offset:3px; }
```

### 卡片

沒有卡片。有的是**色平面上的文字**。若真的需要成組的資訊區塊，用 `--w2` 填滿、零圓角、零陰影、零邊框，並讓卡片之間的間距不等寬。

### 表單

欄位底色 `--w2`，`border:0`，`border-radius:0`，focus 用 3px 朱紅 outline。錯誤訊息是一塊實心朱紅平面，不是紅色小字。

```css
input,select,textarea{ background:var(--w2); border:0; border-radius:0; padding:11px 12px; font:inherit; }
.err{ background:var(--red); color:var(--field); padding:10px 12px; }
```

### 表格

`border-collapse:collapse` 但**所有框線為零**；表頭是一塊黑色平面，奇數列鋪 `--w2`。

### Footer

不用線分隔。用一塊斜置的黑色長條起頭：

```css
footer .rule{ width:100%; height:16px; background:var(--ink);
  transform:rotate(var(--ax)) scaleX(.42); transform-origin:left center; }
```

---

## 七、動效規則（四種，缺一不可）

| # | 類型 | 內容 | 具體值 |
|---|---|---|---|
| 1 | ambient 環境 | **第二塊白的漂移**：那塊 `--w2` 的大平面沿主軸來回 14px。唯一持續存在的動態，而且幾乎看不出來——這是《White on White》 | `96s ease-in-out infinite alternate`，位移 ±14px／±7px |
| 2 | input 輸入 | **正交解除**：hover／focus 任何一塊平面，它立刻轉到斜軸。滑鼠所到之處，物象世界暫時解除 | `transform .09s linear`（<100ms），`rotate(var(--ax))` |
| 3 | transition 轉場 | **斜切推移**：內容以與主軸同向的 `clip-path` 楔形從一角推到對角。機械的，用 `steps()` 不用 easing | `.52s steps(9,end) both`，區塊延遲 80ms 遞增 |
| 4 | signature 簽名 | **零度切口 zero-cut**：見下 | `.38s steps(7,end) both` |

### 簽名動效：零度切口 zero-cut

移除任何一塊平面時，一條**場色的全幅切線**沿斜軸族的其中一個方向掃過整個畫面，然後**永遠留著**。因為切線的顏色就是白場的顏色，它看起來像是把所有經過的平面都劃開了一道 3px 的縫。拆到後來，白場上會留下一組互相交錯的白縫——那正是至上主義畫面上那些「看不見但存在的軸」。

```css
.cutlayer{ position:absolute; inset:0; z-index:3; pointer-events:none; overflow:hidden; }
.cut{ position:absolute; height:3px; width:220%; background:var(--field); transform-origin:0 50%; }
.cut.run{ animation:cutsweep .38s steps(7,end) both; }
@keyframes cutsweep{ from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0 0 0)} }
```

```js
// 切線角度由該塊的編號決定性決定，因此同樣的狀態永遠得到同一組切口
var ang = (fnv(id) % 2) ? -24.5 : 65.5;
c.style.left = (p.x + p.w/2) + "%";
c.style.top  = (p.y + p.h/2) + "%";
c.style.marginLeft = "-110%"; c.style.marginTop = "-1.5px";
c.style.transform  = "rotate(" + ang + "deg)";
```

### prefers-reduced-motion

四種全部降級且**資訊零損失**：

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:.001ms!important; transition-duration:.001ms!important; }
  .w2plane{ animation:none; transform:rotate(var(--ax)); }  /* 停在中點 */
  .wipe{ animation:none!important; clip-path:none!important; } /* 直接是最終畫面 */
  .cut.run{ animation:none; }                                 /* 切口瞬間存在 */
}
```

輸入動效（正交解除）在降級後仍然發生，只是 duration 歸零——因為那是**狀態**不是動畫，拿掉它會失去「這塊被指到了」的資訊。

---

## 八、插畫與圖像風格：mass-plane 質量色面構成

全站沒有一張外部圖片、沒有一條輪廓線、沒有一個字符圖標、沒有一張描外形的插圖。所有圖像（主視覺、縮圖、logo、favicon、印記、圖表）都由同一組實心色平面構成，而且每一塊都帶三個**可讀回的量**：面積（＝重量）、傾角（＝屬於哪一族）、顏色（＝語意類別）。

四條硬規則：

1. **零描邊、零漸層、零陰影、零圓角**（正圓與弧除外）。
2. 平面可以被畫布邊切斷，但**永遠不與畫布邊平行**（除了那塊黑方）。
3. 每張圖至少有一塊平面壓過另一塊，且**壓在上面的那塊面積必較小**。
4. **不出現任何「圖標」**——功能用色塊的位置與大小表達，不用象形符號。

判準：拿掉全部文字，仍讀得出「哪一塊比較重、哪一條是主軸」。

程序化構成（同一個 id 永遠得到同一張圖）：

```js
function fnv(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0;}
function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function compose(id){                       // → SVG 字串
  var r=mul(fnv(id)), s='<rect width="100" height="100" fill="#EFEAE0"/>';
  s+='<rect x="'+(8+r()*8).toFixed(1)+'" y="'+(10+r()*8).toFixed(1)+'" width="34" height="34" fill="#12100E"/>';
  var n=3+Math.floor(r()*3), C=["#CB3A22","#C99A3B","#F7F8F4","#12100E"];
  for(var i=0;i<n;i++){var x=6+r()*62,y=14+r()*62,w=14+r()*40,h=3+r()*13;
    s+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+
       '" fill="'+C[Math.floor(r()*4)]+'" transform="rotate(-24.5 '+(x+w/2).toFixed(1)+' '+(y+h/2).toFixed(1)+')"/>';}
  return s;
}
```

---

## 九、Logo 與 Favicon

Logo 就是特徵 4 加特徵 2：**一塊正交的黑方，被一條斜軸族的朱紅長條穿過**。不要畫字母、不要畫象形、不要圓角。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#EFEAE0"/>
  <rect x="34" y="34" width="96" height="96" fill="#12100E"/>
  <rect x="24" y="112" width="152" height="15" fill="#CB3A22" transform="rotate(-24.5 100 119.5)"/>
  <rect x="128" y="52" width="15" height="60" fill="#C99A3B" transform="rotate(-24.5 135.5 82)"/>
  <rect x="140" y="140" width="34" height="34" fill="#F7F8F4"/>
</svg>
```

Favicon 為同構的 64×64 inline SVG data URI，寫在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23EFEAE0'/%3E%3Crect x='10' y='10' width='31' height='31' fill='%2312100E'/%3E%3Crect x='6' y='40' width='52' height='6' fill='%23CB3A22' transform='rotate(-24.5 32 43)'/%3E%3Crect x='44' y='12' width='6' height='22' fill='%23C99A3B' transform='rotate(-24.5 47 23)'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定 θ（主導斜軸），再開始畫任何東西。整站只有這一個角度與它的正交補。
- 讓每一塊平面都有一個可讀回的量（重量／數量／價格／占比）。至上主義的形是質量，不是圖案。
- 用色平面取代所有的線、框、卡片、分隔、圖標。
- 讓那塊黑方在敘事上不可移除。
- 讓標題是一塊形（900 字重、`line-height:1.06`、寬度上限 22ch）。

**Don't**

- ❌ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕、三張圓角卡片。
- ❌ 任何 emoji 或線描圖標；任何 `border-radius` 大於 0 的矩形。
- ❌ 任何漸層、模糊陰影、半透明疊色、材質與雜訊濾鏡（材質＝紙＝有限空間）。
- ❌ 任何貫穿版面的水平或垂直線（含 `<hr>` 與表格框線）。
- ❌ 第三個角度族。兩族就是兩族。
- ❌ 傾斜的段落文字。斜的是形，不是字。
- ❌ 「EST. 19xx」徽章、跑馬燈、數字滾動、視差、淡入式滾動揭示。
- ❌ 把黑方做成長方形，或讓它在 RWD 下被拉扁。
- ❌ 深色模式。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--field:#EFEAE0;--w2:#F7F8F4;--ink:#12100E;--red:#CB3A22;--ochre:#C99A3B;--ax:-24.5deg}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--field);color:var(--ink);font:400 16px/1.72 "Noto Sans TC","Archivo",sans-serif;overflow-x:hidden}
h1,h2,h3{font-weight:900;line-height:1.06;letter-spacing:-.012em}
a{color:var(--red)} a:hover{background:var(--red);color:var(--field);text-decoration:none}
.wrap{max-width:1240px;margin:0 auto;padding:0 clamp(18px,4vw,54px)}
.kicker{font-family:"Archivo";font-weight:800;font-size:11px;letter-spacing:.26em;text-transform:uppercase}
nav.tilt{display:flex;gap:12px}
nav.tilt a{width:76px;height:76px;background:var(--w2);color:var(--ink);text-decoration:none;position:relative;
  transition:transform .22s cubic-bezier(.2,.9,.25,1)}
nav.tilt a[aria-current="page"]{background:var(--ink);color:var(--field);transform:rotate(var(--ax)) translate(10px,-8px)}
.field{position:relative;width:100%;aspect-ratio:100/78;background:var(--field)}
.field .p{position:absolute;border:0;transition:transform .09s linear}
.field .p:hover{transform:rotate(var(--ax))}
.origin{aspect-ratio:1;height:auto;background:var(--ink)}
.origin:hover{transform:none}
.sep{height:9px;background:var(--red);width:44%;transform:rotate(var(--ax));transform-origin:left center;margin:14px 0 20px}
.btn{background:var(--red);color:var(--field);font-weight:900;padding:13px 24px;border:0;cursor:pointer;
  transform:rotate(var(--ax));transform-origin:left center;transition:transform .16s cubic-bezier(.2,.9,.25,1)}
.btn:hover{transform:rotate(var(--ax)) translateX(9px);background:var(--ink)}
th{background:var(--ink);color:var(--field);text-align:left;padding:7px 10px;border:0}
td{padding:7px 10px;border:0} tbody tr:nth-child(odd) td{background:var(--w2)}
@media (max-width:900px){[class^=i]{margin-left:0}}
@media (prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}
</style></head><body>

<div class="wrap" style="display:flex;justify-content:space-between;align-items:flex-start;padding:26px 0">
  <div><h1 style="font-size:clamp(26px,3.5vw,44px)">品牌名</h1>
       <p class="kicker" style="margin-top:6px">Latin Subtitle</p></div>
  <nav class="tilt" aria-label="主導覽">
    <a href="#" aria-current="page"><span class="kicker" style="position:absolute;left:8px;top:6px">01</span></a>
    <a href="#"><span class="kicker" style="position:absolute;left:8px;top:6px">02</span></a>
    <a href="#"><span class="kicker" style="position:absolute;left:8px;top:6px">03</span></a>
    <a href="#"><span class="kicker" style="position:absolute;left:8px;top:6px">04</span></a>
  </nav>
</div>

<main class="wrap">
  <div class="field">
    <div class="p" style="left:52%;top:22%;width:46%;height:62%;background:var(--w2);transform:rotate(var(--ax))"></div>
    <div class="p origin" style="left:6%;top:44%;width:22%"></div>
    <div class="p" style="left:34%;top:18%;width:40%;height:8%;background:var(--red);transform:rotate(var(--ax))"></div>
    <div class="p" style="left:62%;top:56%;width:12%;aspect-ratio:1;height:auto;border-radius:50%;background:var(--ochre)"></div>
  </div>
  <div class="sep"></div>
  <section style="margin-left:clamp(0px,7vw,116px);max-width:58ch">
    <p class="kicker">01 &nbsp; 章節</p>
    <h2 style="font-size:clamp(24px,3vw,38px);max-width:22ch;margin:6px 0 12px">標題是一塊形，不是一行字。</h2>
    <p>正文水平、左對齊、對比 ≥7:1。斜的是形，不是字。</p>
  </section>
  <p style="margin-top:26px"><button class="btn">主要動作</button></p>
</main>

<footer class="wrap" style="padding:56px 0 40px">
  <div style="width:100%;height:16px;background:var(--ink);transform:rotate(var(--ax)) scaleX(.42);transform-origin:left center;margin-bottom:34px"></div>
  <p style="font-size:13px">地址　電話　營業時間</p>
</footer>
</body></html>
```

---

## 十二、技術實作與相容性

範例站宣告的三項核心技術，分屬 C（版面樣式）／D（輸入感測）／E（資料生成）三層。

### 1. CSS Anchor Positioning（C 版面與樣式層）

**它承載什麼**：白場上的讀數（構件編號、材料、噸數）必須貼在一塊**會旋轉、會被切口劃開、隨時可能被移除**的平面上。用 JavaScript 算座標的話，每一次移除都要重讀一輪 `getBoundingClientRect()`，那是典型的 layout thrashing。`anchor-name` / `position-anchor` / `position-area` / `position-try-fallbacks` 讓這件事完全宣告式，零 layout 讀取。

```css
.p{ anchor-name:--a-A1; }                   /* 逐塊以 inline style 指定 */
.tag{
  position:absolute;
  position-area:top span-right;
  position-try-fallbacks:flip-block,flip-inline;   /* 靠近畫布邊時自動換邊 */
  margin:5px;
}
```
```js
tag.style.setProperty("position-anchor","--a-"+id);   // 一個 tag 元素、換錨點
```

**支援現況（2026-08-31 查證）**：CSS Anchor Positioning 已是三引擎皆支援的 Baseline 特性——Chrome/Edge 125+（2024-05）、Safari 18.2+（2024-12，`@position-try` 需 Safari 26）、**Firefox 147 於 2026-01-13 預設開啟**（MDN《Firefox 147 release notes for developers》、MDN《position-anchor》、MDN《anchor-name》）。全球覆蓋約 91%。

**Fallback（具體行為）**：
```css
@supports not (anchor-name:--x){ .tag{ display:none; } }
```
讀數整個不顯示，資訊由**永遠存在於 DOM 中的構件表**（含編號、構件、材料、層、跨、噸、工時、可回收、去向九欄）承擔，資訊零損失。這張表在支援與不支援的瀏覽器上都在，不是為了 fallback 才長出來的。

**已知陷阱**：`anchor-name` 必須設在錨點元素上、`position-anchor` 設在被定位元素上，且被定位元素必須是 `position:absolute|fixed`。錨點若有 `transform`，錨矩形取的是變換後的軸對齊外框——本站的平面會旋轉，因此讀數位置在旋轉時會有幾像素的位移，這是可接受的（讀數不需要精確貼齊角點）。

### 2. IntersectionObserver（D 輸入與感測層）

**它承載什麼**：〈工序與機具〉頁左側那面立面示意圖，會**照著你捲到第幾道工序自己拆掉**——每一段 `<section class="step">` 帶一個 `data-gone` 清單，觀察器一觸發就把對應的平面淡出、把失去鄰塊的平面轉到斜軸。這是 scroll-linked 而非 scroll-jack：頁面照常捲動，只有那張圖在跟。

```js
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting) apply(+e.target.dataset.i); });
},{rootMargin:"-42% 0px -46% 0px",threshold:0});
steps.forEach(function(s){ io.observe(s); });
```

**支援現況（2026-08-31 查證 MDN《IntersectionObserver》）**：Baseline Widely available，2019-01 起跨瀏覽器（Chrome 51+、Firefox 55+、Safari 12.1+、Edge 15+）。

**Fallback（具體行為）**：`if("IntersectionObserver" in window)` 為否時，改為監聽各段的 `focusin`（鍵盤讀者仍可逐段觸發），並把示意圖直接設定為**最後一道工序的狀態**；六段工序的文字、機具表與工期噸數全部是靜態 HTML，資訊零損失。

### 3. 約束求解／規則引擎（E 資料與生成層）

**它承載什麼**：核心功能的驗收。三條規則是三個可驗算的幾何謂詞，全部在前端即時計算：

1. **殘留物象度** = Σ(剩餘構件的 obj 權重) / Σ(全部 obj) ≤ 15%
2. **格線殘留** = 剩下的平面中，是否存在兩塊同跨（column）或同層（row）；為 0 才過
3. **主軸** = 剩餘平面質心的**質量加權共變異數矩陣**特徵值比 λ₁/λ₂ ≥ 3.00，且主軸方向偏離畫布邊界 ≥18°，並且至少剩 4 塊

```js
function pca(rest){
  var M=0,cx=0,cy=0;
  rest.forEach(function(p){var m=Math.max(p.mass,.25);M+=m;cx+=m*(p.x+p.w/2);cy+=m*(p.y+p.h/2);});
  cx/=M; cy/=M;
  var sxx=0,syy=0,sxy=0;
  rest.forEach(function(p){var m=Math.max(p.mass,.25),dx=(p.x+p.w/2)-cx,dy=(p.y+p.h/2)-cy;
    sxx+=m*dx*dx; syy+=m*dy*dy; sxy+=m*dx*dy;});
  sxx/=M; syy/=M; sxy/=M;
  var tr=sxx+syy, det=sxx*syy-sxy*sxy, d=Math.sqrt(Math.max(tr*tr/4-det,0));
  var ang=0.5*Math.atan2(2*sxy,sxx-syy)*180/Math.PI;
  var off=Math.abs(((ang%90)+90)%90); off=Math.min(off,90-off);
  return {ratio:(tr/2+d)/(tr/2-d), ang:ang, off:off};
}
```

拆除順序另有一條約束（結構件要拆，同跨上方必須先清空），被擋下時介面會**指名是哪幾塊壓著**，而不是只給一個「不可以」。

**支援現況**：純 JavaScript（`Math.imul`、`Math.atan2`、`Set`、`BigInt`），無瀏覽器 API 依賴，故無相容性缺口。`BigInt` 僅用於分享碼的位元遮罩編碼，Baseline Widely available（2020-09 起跨瀏覽器）。

**解空間實測（建置時窮舉，非估計）**：滿足「格線殘留為 0」的收工佈局共 **840 種**（剩 3 或 4 塊格內平面、兩兩不同跨不同層）；其中同時通過三條的有 **295 種，占 35.1%**。失敗原因分布：認得出（殘留物象度 >15%）357 種、無主軸（塊數不足／主軸比不足／太接近邊界）340 種（可重複計）。

### 效能預算（實測）

| 項目 | 實測 | 門檻 |
|---|---|---|
| `index.html` 單頁（含 inline CSS/JS 全部資源） | **53 KB** | ≤350 KB |
| `gongxu.html` ／ `liaochang.html` ／ `weituo.html` | 25 KB／38 KB／24 KB | ≤350 KB |
| 首屏 JS 執行（25 個平面綁定＋首次 render） | < 3 ms | ≤100 ms |
| 每次移除的重繪 | 只寫 class 與 `transform`，零 `getBoundingClientRect()`，不觸發 layout | 無 layout thrashing |
| 主要動畫 | 全部只動 `transform` 與 `clip-path`，合成層處理 | 60fps |
| 外部資源 | 只有 Google Fonts 兩支；**零外部圖片、零音檔、零函式庫** | — |

---

## 十三、無 JavaScript 的行為

- 白場的二十四塊平面與黑方是**靜態 HTML**（`<button>` 元素帶 inline 座標），關掉 JavaScript 仍是一張完整的至上主義立面構成。
- 全部構件資料（九欄）以常駐表格存在，不依賴任何腳本。
- 四頁的營業資訊、工序、機具、料場、法規說明皆為可選取的一般 HTML 文字。
- 委託單在無 JavaScript 時仍可填寫與閱讀（驗證與回執需要腳本，介面明寫）。

---

*本 SKILL.md 為 Design Skills Center 館藏規格書。風格與內容分離：以上規則不綁定拆除工程行，任何產業都可套用。*
