---
name: asante-kente-strip
description: Asante strip-woven kente — narrow separately-woven strips sewn edge to edge with visible uneven stitching, warp-faced stripes alternating with weft-float blocks whose grain turns 90 degrees, exactly six dyed spools and no seventh colour, deliberate cross-seam stagger, and cloth that carries a name and says something.
---

# 阿散蒂 Kente 條幅 — Asante Strip-Woven Kente

> 迦納阿散蒂（Asante）的 *nwentoma*。男子在窄幅雙綜織機 *nsadua kofi* 上，一次只能織出約 9–11 公分寬的一條帶子；一塊布是四到二十四條這樣的帶子**分別織完、再一條一條縫起來**的。
> 十七世紀起於 Bonwire 一帶成形，十八至十九世紀在阿散蒂宮廷制度化——最滿的 *adweneasa／adwinasa*（「花盡」）曾是王室專屬。1957 年獨立後成為迦納與泛非的國服級符號。
> 外部參照：Doran H. Ross《Wrapped in Pride: Ghanaian Kente and African American Identity》(UCLA Fowler, 1998)；Venice Lamb《West African Weaving》(1975)；Ghana National Museum 與 Bonwire 織工社群的傳世布名（Adwinasa／Sika Futuro／Oyokoman／Babadua／Emaa Da／Toku Akra Ntoma）。

---

## 一、設計哲學

三件事定義這個風格，缺一就不是它：

1. **成品是縫出來的，不是排出來的。** 織機只有 11 公分寬，所以任何一塊布都是先有帶子、後有布。版面的第一個決定不是「這塊放哪裡」，而是「這一條要織多長」。條與條的長度不會一樣，因為它們不是同一個人、同一天織完的。
2. **同一批線，靠方向說話。** 經面（縱帶）與緯面（橫帶）用同一組色、同一個帶寬，沒有明暗差、沒有陰影、沒有第二種材質。布面就是這兩種方向交替出來的棋盤。「換一個顏色」在這裡是昂貴的，「把紋路轉九十度」是免費的——所以它成了主要的表達手段。
3. **布是拿來說話的。** 母題有名字，名字有出處，穿哪一塊等於先開了口。一個看得到卻讀不出來的 kente 版面，只是壁紙。

反過來說，這個風格拒絕：柔和、漸層、光源、景深、留白經營、以及任何「低調」。它是**滿的**，而且它的滿是有文法的。

---

## 二、本風格的 5 個不可省略特徵

> 每一項都附可直接複製的片段。拿掉其中任何一項，做出來的就不是這個風格。

### 特徵 1　條幅與看得見的手縫線

版面必須由等寬直條縫成（9–11 公分的實體寬度；螢幕上取容器寬的 1/3–1/6）。條與條之間是一道**針距不等**的手縫線——它是本風格版面上**唯一合法的線**。不准再有第二種分隔線，不准用留白代替它，不准把它做成等分虛線（等分＝機器車縫）。

```css
.strip      { position: relative; }
.strip > *  { position: relative; }
.strip > *::after {                 /* 縫線畫在每一段的右緣 */
  content: ""; position: absolute; top: 0; right: 0;
  width: 3px; height: 100%;
  background: repeating-linear-gradient(180deg,
    var(--fitaa)  0   5px, var(--tuntum)  5px  9px,
    var(--fitaa)  9px 12px, var(--tuntum) 12px 19px,
    var(--fitaa) 19px 23px, var(--tuntum) 23px 28px);  /* 5-4-3-7-4-5，刻意不等分 */
}
.strip:last-child > *::after { display: none; }
```

把縫線畫在「每一段」而不是「整條」上，布的下緣才會參差——縫線只存在於有布的地方。

### 特徵 2　同一批線，方向轉九十度

```css
/* 經面 warp-faced：縱帶（線沿著條幅的方向） */
.warpface { background: repeating-linear-gradient(90deg,
   var(--sika)  0   3px, var(--tuntum) 3px 6px,
   var(--kokoo) 6px 9px, var(--tuntum) 9px 15px); }

/* 緯面 weft-faced：橫帶（緯線整片蓋住經線） */
.weftface { background: repeating-linear-gradient(0deg,
   var(--fitaa) 0 3px, var(--ahaban) 3px 6px); }
```

同一支宣告，只有第一個參數不同。**帶寬（3px）全站固定一個值**——帶寬變了就是換了一批線，一塊布不會換線。

### 特徵 3　跨縫錯位是成品，不是失誤

相鄰條幅的緯浮塊在高度上刻意錯開，至少三分之一塊高。齊了就是機器織的。做法是讓所有條幅**共用同一組列軌**，錯位量因此是可以宣告的整數緯數：

```css
.cloth { display: grid;
         grid-template-columns: repeat(6, minmax(0,1fr));
         grid-template-rows: repeat(36, var(--pick)); }
.strip { display: grid; grid-row: 1 / -1;
         grid-template-rows: subgrid; }          /* ← 六條共用母網格的列軌 */
.strip > .sp:first-child { grid-row: span 3; }   /* ← 錯位＝整數緯，不是 magic number */
@supports not (grid-template-rows: subgrid) {
  .strip { grid-template-rows: repeat(var(--rows), var(--pick)); }
}
```

共用列軌還有一個真實後果：**某一條的一段文字把那一列撐高，其餘每一條在同一列的塊也跟著變高**——因為它們織的是同一塊布，緯是通的。這件事沒有 subgrid 做不到。

### 特徵 4　六軸線，沒有第七個色碼

```css
:root{
  --tuntum:#0E0C09;  /* 黑　　成熟、已經過去的事、祖先 */
  --sika:  #F2B01E;  /* 金　　豐年、王室、收得回來的錢 */
  --kokoo: #D22B1E;  /* 朱　　血緣、動怒、非講不可的事 */
  --ahaban:#0E7A45;  /* 綠　　新苗、第一次來的人 */
  --bibiri:#173E86;  /* 靛藍　和睦、把事情談成 */
  --fitaa: #F4EFE2;  /* 棉白　沒有染過的、還沒決定的 */
}
```

**面積比例**（實測自本示範站）：黑 ≈ 30%（地）、金 ≈ 22%、朱 ≈ 14%、綠 ≈ 12%、棉白 ≈ 14%、靛藍 ≈ 8%。

硬規則，可機械檢查——把樣式表裡的色值列舉出來，**必須恰好六個**：

* 零 `opacity`、零 `rgba()` 第四位、零 `filter`、零明度階、零中間灰。
* 漸層只有一種合法形態：**硬停點的等寬帶**（`repeating-linear-gradient`，每段起訖相接、無軟停點）。那不是漸層，那是線。
* 零陰影、零發光、零金屬、零玻璃擬態、圓角一律 0。
* 明暗的變化只能由**方向**造成。

**可讀性（由這六軸推出來，不是另外訂的）**：長文只准坐在棉白或黑上（`#0E0C09` 對 `#F4EFE2` ＝ 17.0:1）。金對黑 10.1:1、朱對黑 3.8:1、綠對黑 3.6:1、靛藍對黑 1.9:1——**靛藍與黑絕不相鄰承載文字**；朱與綠只准放大字。因此凡是有字的緯塊，字一律坐在一塊實色板上（`--pl`），不直接坐在帶紋上。

### 特徵 5　每塊布有名字，名字取自它最顯著的母題

母題只能是**軸對齊的矩形**，長在塊內 12×12 的格上：沒有斜線、沒有圓弧、沒有描邊、沒有第三個顏色。

```html
<!-- Nkyimkyim 曲折 -->
<svg viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true">
  <rect width="12" height="12" fill="#0E0C09"/>
  <rect x="0" y="0" width="3" height="3" fill="#F2B01E"/>
  <rect x="3" y="3" width="3" height="3" fill="#F2B01E"/>
  <rect x="6" y="6" width="3" height="3" fill="#F2B01E"/>
  <rect x="9" y="9" width="3" height="3" fill="#F2B01E"/>
  <rect x="9" y="0" width="3" height="3" fill="#F2B01E"/>
  <rect x="0" y="9" width="3" height="3" fill="#F2B01E"/>
</svg>
```

命名法：**出現次數最多的那個母題 ＋ 它用的那一軸線**（`Sika Babadua`＝金竹節）。沒有重複時用最上面那一塊。布的名字與它要說的話**必須寫在版面上**。

---

## 三、色彩系統

| 變數 | 色碼 | Twi | 中 | 用途 | 面積 |
|---|---|---|---|---|---|
| `--tuntum` | `#0E0C09` | Tuntum | 黑 | 地色、正文底、經面的間隔帶 | 30% |
| `--sika` | `#F2B01E` | Sika | 金 | 主強調、現用態、focus ring、連結 | 22% |
| `--kokoo` | `#D22B1E` | Kɔkɔɔ | 朱 | 次強調、警示、非講不可的事 | 14% |
| `--fitaa` | `#F4EFE2` | Fitaa | 棉白 | 正文字、框線、縫線、長文底板 | 14% |
| `--ahaban` | `#0E7A45` | Ahaban | 綠 | 分類色（新／第一次） | 12% |
| `--bibiri` | `#173E86` | Bibiri | 靛藍 | 分類色（夜／和睦），不承載正文 | 8% |

第七個顏色不存在。看起來像第七色的地方，都是兩軸線以某個方向交替織出來的視覺混色；放大就會看到它其實是帶。

---

## 四、字體系統

* 拉丁：**Archivo Black**（標題、母題名、導覽、塊內字）＋ **Archivo 500/600**（內文）。
* 漢字：**Noto Sans TC 500/700**。
* 明文禁用：襯線體、手寫體、細字重（≤400）、等寬體當正文。**這個風格沒有「細」**——線是有粗細的實體，字也是。

字級 scale（1.25 比例，都落在整數）：

```
30 / 24 / 19 / 17 / 15 / 13.5 / 12.5 / 11.5
```

* `h1` 30px / line-height 1.1 / letter-spacing .01em
* 塊內大字 19–26px / 1.04
* 內文 15–16px / 1.65
* 塊內小字 11.5–12.5px / 1.28–1.3
* 標籤與 Twi 名：`text-transform:uppercase; letter-spacing:.06–.14em`

---

## 五、版面與網格

* **欄＝條幅。** 桌機 6 條，平板 3 條，手機 3 條（**少織幾條，不是把布壓扁**）。被拿掉的條幅所載的事實，必須同時存在於下方的靜態表——布可以變窄，事實一件都不能少。
* **列＝緯。** `--pick` 是一列軌的高度（桌機 26px，手機 20px）。所有的高度都是 `--pick` 的整數倍：塊高 2–5 緯，間隔 1–8 緯。**不存在非整數的高度。**
* **錯位表**：六條的起始偏移建議 `0 / 3 / 1 / 0 / 5 / 2` 緯——相鄰兩條的差不得為 0，且不得全部同差（等差＝機器）。
* **留白**：這個風格沒有留白。條幅之間沒有 gap（`gap:0`），塊之間露出來的是**經面的縱帶**，不是背景。頁面下緣的黑不是留白，是「這台機器織到這裡」。
* **旋轉**：零。這個風格沒有任何非 0/90 度的元素。

---

## 六、元件配方

### 導覽（shed-open 開口）

導覽不是品牌列。四格各是一束平行的經線；現用的那一束被**踩開**——上下分層，中間空出一條梭子過得去的口。

```css
.hed .w { position:absolute; left:0; right:0; height:9px;
  background: repeating-linear-gradient(90deg, var(--fitaa) 0 2px, var(--tuntum) 2px 6px);
  transition: transform .12s steps(3, end); }        /* 離散，不是滑順 */
.hed .w.up{top:2px} .hed .w.dn{top:11px}
.hed[aria-current="page"] .w.up{transform:translateY(-3px)}
.hed[aria-current="page"] .w.dn{transform:translateY( 3px)}
.hed:hover .w.up, .hed:focus-visible .w.up{transform:translateY(-3px)}
.hed:hover .w.dn, .hed:focus-visible .w.dn{transform:translateY( 3px)}
.shed:has(.hed:hover) .hed:not(:hover) .w{transform:translateY(0)}
```

「開口」對輔助科技不可見，所以現用項**必須同時帶 `aria-current="page"`**。

### 緯浮塊（.blk）

```css
.blk { position:relative; overflow:hidden; display:flex;
       align-items:center; justify-content:center; padding:4px 7px; text-align:center; }
.blk::before { content:""; position:absolute; inset:0; z-index:0;
  background: repeating-linear-gradient(var(--dir, 0deg),
    var(--a, var(--sika)) 0 var(--band),
    var(--b, var(--tuntum)) var(--band) calc(var(--band)*2)); }
.blk > .t { position:relative; z-index:2; display:inline-block;
  background: var(--pl, var(--tuntum)); color: var(--tc, var(--fitaa)); padding:2px 6px; }
```

### 按鈕

無圓角、3px 實邊、hover 整塊黑白對調。**沒有按壓陰影**（那是另一個風格）。

```css
.btn{ font-family:"Archivo Black",sans-serif; font-size:13px; letter-spacing:.08em;
      background:var(--tuntum); color:var(--fitaa); border:3px solid var(--fitaa);
      padding:8px 14px; border-radius:0; }
.btn:hover{ background:var(--fitaa); color:var(--tuntum); }
```

### 表格與面板

`border-collapse:collapse`，**3px** 實線，表頭反白（棉白底黑字）。面板 = 3px 外框 + 反白標題條。這是布上的「素織區」，用來放讀得到的字。

### Footer

3px 上框線，左對齊，不置中。營業事實（地址、電話、時間）必須完整重複一次。

---

## 七、動效規則（四種，缺一不可）

| 類 | 名 | 觸發 | 值 |
|---|---|---|---|
| ambient 環境 | **織序推進** | 真實時鐘（無需輸入） | 每 3.2 秒落一緯；六台相位差 37 緯；07:30–17:00 開工、週日休。畫面每天不同。 |
| input-driven 輸入 | **開口 shed** | hover / focus | `transform .12s steps(3,end)`，只改 transform，<16ms |
| transition 轉場 | **上縫 sewn-on** | 頁面進場 | `clip-path: inset(0 0 100% 0) → inset(0)`，`.52s steps(9,end)`，六條 70ms stagger |
| signature 簽名 | **轉紗 grain-turn** | 元素狀態 | 緯塊內的紋路方向 0deg ↔ 90deg，`steps(1,end)` |

**為什麼全部用 `steps()` 而不用 ease**：織布沒有中間狀態——緯線不是「落了一半」。任何連續插值在這個風格裡都是錯的。這條規則同時是動效規則與風格規則。

```css
@property --dir { syntax:"<angle>"; inherits:true; initial-value:0deg; }
.blk.turn::before { animation: grain 2.4s steps(1,end) infinite; }
@keyframes grain { 0%,49.99%{--dir:0deg} 50%,100%{--dir:90deg} }
.blk:hover::before, .blk:focus-visible::before { --dir:90deg; }

@keyframes sew { from{clip-path:inset(0 0 100% 0)} to{clip-path:inset(0 0 0 0)} }
.strip { animation: sew .52s steps(9,end) both; animation-delay: calc(var(--i,0)*70ms); }
```

**降級（四種都要，且資訊零損失）**：

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{ animation:none!important; transition:none!important }
  .hed[aria-current="page"] .sh{ opacity:1; left:calc(50% - 8px) }  /* 梭子停在口中間 */
  .strip{ clip-path:none }                                          /* 布直接是縫好的 */
  .blk.turn::before{ --dir:90deg }                                  /* 方向資訊仍在，只是不翻 */
}
```

環境動效的降級不是「停掉」而是「停在此刻的正確值」——數字照算，只是不再自己前進。

---

## 八、插畫與圖像風格（band-and-block 條與塊構成）

全站零外部圖片、零照片、零 `<img>`。所有圖像由三個原語產生，**明文不允許第四個**：

1. **帶 band** — 全條幅長的硬邊等寬帶，帶寬全站固定一個值。
2. **塊 block** — 一個軸對齊矩形，它**整片取代**該處的帶，而且塊內的帶跑**垂直於**外面的方向。
3. **母題 motif** — 只由矩形組成，畫在塊內 12×12 的格上，只用兩軸線。

判準：放大任何一張圖，(a) 找不到任何一條描邊輪廓、任何一段圓弧、任何一條斜線；(b) 每一塊顏色都是硬邊的帶或實心矩形，找不到任何連續明度變化；(c) 每一塊「面」都指得出它的紋路方向是縱還是橫。

**明文禁用**：照片、半調網點、細線幾何線描、`feTurbulence` 假質感、任何做舊濾鏡、扁平化單色圖示、金屬漸層、任何發光、任何模糊陰影、任何把 12×12 格以外的座標寫進母題。

**與近親的分辨**：這**不是**逐紗的交織光柵（那是織法意匠圖／point paper 的語言，畫的是結構）。本技法的最小單位是**帶**（≥3px）與**塊**，畫的是一塊布在兩公尺外的樣子。明文禁止畫出單根紗線。

---

## 九、Logo 與 Favicon

**Logo**：三條條幅縫成的一小塊布（含兩道不等針距的縫線、三塊錯位的緯塊），右側接 Archivo Black 兩行字，第二行用金。不准把字放進布裡。

**Favicon**：12×12 格上的三條迷你條幅，`shape-rendering="crispEdges"`，inline SVG data URI 寫在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' shape-rendering='crispEdges'%3E%3Crect width='12' height='12' fill='%230E0C09'/%3E%3Crect x='0' y='0' width='4' height='12' fill='%23F2B01E'/%3E%3Crect x='0' y='4' width='4' height='3' fill='%230E0C09'/%3E%3Crect x='4' y='2' width='4' height='3' fill='%23D22B1E'/%3E%3Crect x='4' y='8' width='4' height='3' fill='%230E7A45'/%3E%3Crect x='8' y='0' width='4' height='12' fill='%23F4EFE2'/%3E%3Crect x='8' y='6' width='4' height='3' fill='%230E0C09'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

* 讓條幅長度不一樣，讓布的下緣參差。
* 讓錯位是整數緯，並且寫在樣式表裡（而不是靠眼睛調）。
* 讓每一條只負責一件事，事有多長就織多長。
* 把名字與它要說的話寫在版面上。
* 縮小時**少織幾條**，並把被拿掉的事實補在靜態表裡。

**Don't**

* ✗ 把緯塊對齊（對齊＝機器布）。
* ✗ 宣告第七個顏色，或用 opacity／filter 做出明度階。
* ✗ 用漸層、陰影、圓角、發光、金屬感。
* ✗ 用細字重、襯線體，或讓標題靠字重而不是靠大小與塊面建立階層。
* ✗ 把條幅之間做成留白或 1px 分隔線。
* ✗ 用 ease 曲線做任何「織」的動作。
* ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、AI 腔開場白。
* ✗ 把 kente 當「非洲風裝飾」隨手貼在別的骨架上——它是版面本身，不是花邊。

---

## 十一、頁面骨架範例（可直接使用）

```html
<main>
  <div class="cloth" style="grid-template-rows:repeat(30,var(--pick))">

    <div class="strip" style="--i:0;--rows:24">
      <div class="sp warpface" style="grid-row:span 2"></div>
      <div class="blk" style="grid-row:span 4;--a:var(--sika);--b:var(--tuntum)">
        <span class="t" style="font-family:'Archivo Black',sans-serif;font-size:19px">18–20<br>DEC</span>
      </div>
      <div class="sp warpface" style="grid-row:span 3"></div>
      <div class="blk" style="grid-row:span 2;--a:var(--kokoo);--b:var(--tuntum)">
        <span class="t">五・六・日 三夜</span>
      </div>
      <div class="sp warpface" style="grid-row:span 6"></div>
    </div>

    <div class="strip" style="--i:1;--rows:27">
      <div class="sp" style="grid-row:span 3"></div>      <!-- ← 錯位 3 緯 -->
      <div class="blk" style="grid-row:span 3;--a:var(--bibiri);--b:var(--fitaa)">
        <span class="t" style="--pl:var(--fitaa);--tc:var(--tuntum)">三台・十二組</span>
      </div>
      <div class="sp warpface" style="grid-row:span 5"></div>
    </div>

  </div>

  <!-- 布可以變窄，事實不能少 -->
  <div class="panel"><h2>營業事實</h2><div class="bd">
    <dl class="fact"><dt>地點</dt><dd>…</dd></dl>
  </div></div>
</main>
```

---

## 十二、技術實作與相容性

本站的視覺由三項技術承載，分屬三層。每一項的選擇理由都是「這個流派的特徵需要它」，不是「這個技術很酷」。

### 1　CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 3。六條條幅共用母網格的列軌，所以「錯位」是可宣告的整數緯數，而且「某一條的文字撐高某一列，其餘五條在同一列的塊跟著變高」這件事會自己發生——緯是通的。

**支援現況**（查證：caniuse `css-subgrid`，2026-09-18 讀取，全球使用率 **93.48%**）：Chrome 117+、Edge 117+、Safari 16.0+、Firefox 71+、Samsung Internet 24+。Opera Mini、IE 全系不支援。

**fallback 具體行為**：`@supports not (grid-template-rows: subgrid)` 時，每條改用 `grid-template-rows: repeat(var(--rows), var(--pick))`——布仍然是六條、錯位仍然看得見、版面不塌；失去的只有「跨條幅的列軌連動」，該列的文字改為在自己的條幅內換行。

### 2　CSS `steps()` 逐格 easing（B 動效與時間軸層）

**承載**：簽名動效「轉紗」、轉場「上縫」、輸入動效「開口」。織布是離散的，緯線不會落一半，所以本站**全站沒有一條連續 easing 曲線**。

**支援現況**（查證：caniuse `mdn-css_types_easing-function_steps_jump`，2026-09-18 讀取，全球使用率 **96.27%**；`steps()` 本體屬 CSS Animations Level 1，支援更早）：Chrome 77+、Edge 79+、Safari 14+、Firefox 65+。本站只用不帶方向關鍵字的 `steps(n)` 與 `steps(n, end)`，支援度更寬。

**fallback 具體行為**：不支援 `steps()` 的環境會退回 `ease`——動作變成滑順的，風格上不對但功能完全不受影響。`--dir` 若未被 `@property` 註冊（Firefox < 128），自訂屬性仍以**離散**方式切換，正好就是本站要的結果，所以 `@property` 在此是選用而非必要。

### 3　CSS `:has()` 關聯選擇器（E 資料與生成層，CSS-only 狀態機）

**承載**：織檯的狀態機。織布是離散狀態機，所以介面狀態也該由 DOM 直接推出來，而不是由 JS 另存一份旗標。本站四處實際使用：(a) 線架／塊架的選取態 `label:has(input:checked)`；(b)「縫上去」按鈕的可用性 `.lay:has(.cell.full ~ ×8) #sewbtn`——八格是否織滿完全由 CSS 從 DOM 讀出，JS 不持有這個狀態；(c) 導覽 `.shed:has(.hed:hover) .hed:not(:hover) .w` 讓其餘幾束經線閉合。

**支援現況**（查證：caniuse `css-has`，2026-09-18 讀取，全球使用率 **94.82%**）：Chrome 105+、Edge 105+、Safari 15.4+、Firefox 121+。Opera Mini、IE 不支援。

**fallback 具體行為**：`@supports not selector(:has(*))` 時「縫上去」按鈕恆為可用態（按下去仍會檢查八格是否織滿，只是少了視覺預告）；線架／塊架的選取態退回瀏覽器原生 radio 外觀，仍然看得出選了哪一個。

### 效能預算（實測）

| 項 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | index 32.6 KB／dwom 28.9 KB／kasa 37.0 KB／nwene 60.1 KB | ≤350 KB ✓ |
| 首屏 JS | index 僅一支時鐘計算（一次 `workedMs` 迴圈 ≈ 380 次加總）；dwom／kasa 零 JS | ≤100ms ✓ |
| 動畫 | 全部只改 `transform`／`clip-path`／自訂屬性，不觸發 layout；`steps()` 每秒重繪次數遠低於 60 | 60fps ✓ |
| ambient 迴圈 | `setInterval 800ms`，只在緯數改變時才寫 DOM（六欄各 20 個 `<i>`） | 無 layout thrashing ✓ |

### 無障礙

* 顏色**不是唯一的狀態指示**：導覽現用項同時帶 `aria-current="page"`；織檯每一格帶 `aria-label` 說明它是空的還是放了什麼。
* 對比：正文 `#F4EFE2` 對 `#0E0C09` ＝ 17.0:1。靛藍與綠明文不承載正文。
* `:focus-visible` 為 3px 金色外框 + 2px offset（不是移除，也不是模糊光暈）。
* 關掉 JavaScript：四頁的全部文字、節目表、母題語意表、營業事實皆為建置階段寫死的靜態 HTML 與內嵌 SVG，一個字都不會少；只有織檯的「把塊放進格子」需要 JS，其規則以完整表格另列於同頁。

---

*本 SKILL.md 是風格規格書，不綁定產業。示範站用的是一個音樂祭，但同一套規則可以拿去做書店、球隊、電台或任何東西——只要你願意讓版面被縫出來。*
