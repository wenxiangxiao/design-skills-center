---
name: amish-quilt-pieced
description: Lancaster-County Amish quilt style — solid jewel cloth on a deep ground, concentric bordered frame, directional pressed seams with no outlines, and an independent running-stitch quilting layer that carries all the relief.
---

# 阿米什拼布 Amish Quilt（賓州蘭開斯特郡，1870s–1940s）

## 一、設計哲學

這個流派不是「拼貼風」，也不是「幾何風」。它是一群明文禁止裝飾、禁止人像、禁止炫耀的人，
在一件必須保暖的日用品上，被允許做的唯一一件美的事。

三個歷史條件決定了它長成這樣：

1. **只有素色布。** 阿米什的 *Ordnung*（會規）不許印花，衣裳一律素面羊毛，
   所以被面能用的顏色就是家裡衣料剩下的那幾種。沒有印花＝沒有紋理＝顏色必須自己撐起畫面。
2. **不做像。** 十誡第二條被字面執行，所以沒有花鳥、沒有人物、沒有風景，
   只剩下方、菱、三角這些「不像任何東西」的形狀。
3. **被子要蓋。** 它不是掛的，是用的。所以它有邊、有滾邊、有正反兩面，
   而壓線（quilting）不是裝飾，是把三層布固定住的結構工作——但它剛好是唯一可以講究的地方，
   於是一整床的表情都跑到那裡去了。

**設計時要記住的一句話：顏色負責構圖，壓線負責表情，兩者互不干涉。**
拼接（piecing）決定畫面上有哪些色塊；壓線（quilting）是獨立的第二層，
它從色塊上面直接跨過去，不理會下面的顏色邊界。這是本風格與所有「幾何色塊風」的分水嶺。

搬到網頁上時，這條哲學翻譯成：**版面是拼接，動效是壓線。**
版面必須是有邊界、對稱、可數的；動態必須是低幅度、連續、跨越版面分區的光影，而不是元素飛進飛出。

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，它就不是阿米什拼布了。

### 特徵 1：每一塊都是「布」，不是色塊——實色 + 織紋，零漸層

素面平織羊毛在光下不是平的，它有 45° 的織紋顆粒。畫面上的每一塊顏色都必須是
**單一實色 + 一層極輕的織紋**，絕不能有漸層、模糊陰影、發光或半透明堆疊。

```css
.cloth{position:relative;isolation:isolate;background:#1B2A4A}
.cloth::after{content:"";position:absolute;inset:0;pointer-events:none;
  mix-blend-mode:multiply;opacity:.5;
  background:
    repeating-linear-gradient( 45deg,rgba(6,10,20,.34) 0 1px,transparent 1px 3px),
    repeating-linear-gradient(-45deg,rgba(6,10,20,.22) 0 1px,transparent 1px 3px);}
```

用 `mix-blend-mode: multiply` 而不是固定顏色的疊層，是因為同一張織紋要蓋在七種底色上都成立。
**不要**把織紋做成 PNG 或 noise 濾鏡——那會變成「做舊質感」，本風格的布是新的。

### 特徵 2：同心框架——滾邊／外寬框／角塊／內窄框／中心，什麼都不出血

蘭開斯特的被幾乎全是這個結構，而且外框寬得不成比例（80 吋的被，外框 10–12 吋）。
角塊（corner blocks）是外框四角上另一種顏色的正方形，是這個流派的指紋。
**沒有任何東西可以流出邊界。**

```css
.quilt {max-width:1210px;margin:0 auto;border:9px solid #101A2E;}      /* 滾邊 binding */
.border{position:relative;background:#1B2A4A;padding:64px;}            /* 外寬框 */
.corner{position:absolute;width:64px;height:64px;background:#A82743;}  /* 角塊 */
.corner.tl{top:0;left:0}.corner.tr{top:0;right:0}
.corner.br{bottom:0;right:0}.corner.bl{bottom:0;left:0}
.field {background:#4A2545;padding:9px;}                               /* 內窄框 */
.field>.inner{background:#1B2A4A;padding:46px;}                        /* 中心 */
```

比例基準（以邊長 1000 為單位）：滾邊 18、外框 152、角塊 134、內框 40、中心 616。

### 特徵 3：接縫有倒向——沒有輪廓線，只有單側的暗線

兩塊布縫起來，縫份會被燙倒向其中一側，那一側多兩層布，因此高一點點，
燈一照，暗線只落在**其中一邊**。所以：

* **絕不**在兩個顏色之間畫描邊、border 或 outline。
* 每一塊 shape 只在它的「倒向側」那一條邊畫一條暗線。
* 同一個版面裡倒向要有變化，不能全部朝同一邊（真實的被是一排倒左一排倒右）。

```css
/* 面板：只有右側有縫份 */
.pc{background:#33456B;padding:18px 20px;box-shadow:inset -3px 0 0 rgba(7,13,24,.42);}
/* 表格列：只有下方有縫份 */
td{border-bottom:1px solid rgba(7,13,24,.34);border-top:0;border-left:0;border-right:0;}
```

SVG 版本（每個 patch 只取一條邊）：

```js
const DIRV=[[0,-1],[1,0],[0,1],[-1,0]];               // 0上 1右 2下 3左
function seamEdge(pts,dir){                            // 回傳「倒向側」那條邊
  const v=DIRV[dir];let best=null,bs=-9;
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    const ex=b[0]-a[0],ey=b[1]-a[1],L=Math.hypot(ex,ey)||1;
    const sc=(ey/L)*v[0]+(-ex/L)*v[1];                 // 外法線與倒向的內積
    if(sc>bs){bs=sc;best=[a,b];}}
  return best;
}
// <path class="sm" fill="none" stroke="#070d18" stroke-opacity=".34" stroke-width="3" d="…"/>
```

### 特徵 4：壓線是獨立的第二層，跨過拼接不理它

壓線圖樣（羽毛環 feathered wreath、繩索紋 cable、斜格 crosshatch、
貝殼紋 clamshell、南瓜籽 pumpkin seed）走它自己的路，
**與下面的色塊邊界完全無關**，而且最講究的圖樣一定放在最寬的外框上。
針法是**走針（running stitch）＝虛線**，不是實線；老規矩是每吋 8–12 針。

壓線之所以看得見，是因為棉胎被壓線圍住之後浮起來——所以一條壓線兩側，
一側偏暗、一側偏亮。用兩條偏移的線疊出來，並用混色模式讓它在任何底色上都成立：

```css
.lofD{mix-blend-mode:multiply}           /* 暗側：往燈的反方向偏 */
.lofL{mix-blend-mode:screen}             /* 亮側：往燈的方向偏 */
```
```svg
<defs><path id="q1" fill="none" stroke-dasharray="11 7" d="M120 500A380 380 0 0 1 880 500"/></defs>
<g class="lofD" transform="translate(1.5,2)"><use href="#q1" stroke="#070d18" stroke-opacity=".78" stroke-width="4.4"/></g>
<g class="lofL" transform="translate(-1.5,-2)"><use href="#q1" stroke="#EDE4D2" stroke-opacity=".72" stroke-width="4.4"/></g>
<use href="#q1" stroke="#EDE4D2" stroke-opacity=".9" stroke-width="3.2"/>
```

### 特徵 5：深底 + 寶石實色 + 零純白，亮色永遠被深色框住

底色一定是深的（靛藍、茄紫、墨綠、黑）；亮色是飽和的中明度寶石色，
而且每一塊亮色都必須被深色包住，不能自己碰到畫面邊緣。
**畫面上不出現純白**——白只能是線（棉線 `#EDE4D2`），不能是面。

```css
:root{
  --ground:#1B2A4A; --night:#101A2E; --plum:#4A2545; --emerald:#12664F;
  --madder:#A82743; --gold:#C98A1E;  --teal:#2E7FA6; --rose:#8C3A5A;
  --slate:#33456B;  --thread:#EDE4D2;              /* thread = 線，不是背景 */
}
```

---

## 三、色彩系統

| 色票 | 名稱 | 用途 | 建議比例 |
|---|---|---|---|
| `#1B2A4A` | 靛藍 ground | 全站最大面積的地色（是「布」不是「背景」） | 32% |
| `#101A2E` | 墨藍 night | 滾邊、頁外、footer | 10% |
| `#4A2545` | 茄紫 plum | 內窄框、次級面板、表頭 | 12% |
| `#33456B` | 石板藍 slate | 面板、卡片 | 12% |
| `#A82743` | 茜紅 madder | 角塊、警示、退件 | 9% |
| `#12664F` | 寶石綠 emerald | 面板、圖鑑用色 | 7% |
| `#C98A1E` | 芥末金 gold | **唯一的強調色**：現用態填色、按鈕底 | 7% |
| `#E0AE49` | 亮芥末金 goldlt | 金色**文字**專用（連結、小標） | — |
| `#2E7FA6` | 天青 teal | 圖鑑用色、第三層資訊 | 5% |
| `#8C3A5A` | 乾玫瑰 rose | 圖鑑用色，只在拼接裡出現 | 3% |
| `#EDE4D2` | 棉線白 thread | **文字與線**，不做背景大面積 | 3% |

規則：

* 一個畫面最多同時出現 **6 種**顏色（一床蘭開斯特的被通常只有 4–6 塊布）。
* 深色（ground / night / plum / emerald）合計必須 ≥ 55% 面積。
* 亮色（gold / madder / teal / rose）任何一塊都不得直接接觸畫面外緣。
* 禁止 `#FFFFFF` 當底色；禁止任何漸層、任何半透明色塊。
* 對比（實算）：`--thread` 對 `--ground` **11.3:1**、對 `--plum` **10.1:1**、對 `--slate` **7.5:1**、
  對 `--night` **13.8:1**；警示塊 `--thread` 對 `--madder` **5.5:1**；`--night` 對 `--gold` **5.9:1**。
  正文一律 ≥ 7:1；面板與警示塊 ≥ 4.5:1。
* `--gold` 只用於**填色**（現用態、按鈕），文字用的金是 `--goldlt:#E0AE49`
  （對 ground 7.0:1、對 plum 6.3:1、對 slate 4.7:1）——`#C98A1E` 當文字放在 slate 上只有 3.2:1，不可用。

---

## 四、字體系統

阿米什的被上一個字都沒有——字必須從另一個地方借：
十九世紀賓州鄉下的**素面商業印刷**（帳單、拍賣單、教會週報）。
那個世界只有厚實的板狀襯線和樸素的內文襯線，**沒有等寬字、沒有幾何無襯線**。

```html
<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@500;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
```
```css
body{font-family:"Noto Serif TC",serif;font-size:16.5px;line-height:1.85;letter-spacing:.012em}
h1,h2,h3,th,.lat{font-family:Bitter,"Noto Serif TC",serif}   /* Bitter = 板狀襯線 */
.n{font-family:Bitter,serif;font-variant-numeric:tabular-nums}
```

字級 scale（1.28 比例，刻意不大）：11 / 12.6 / 13.6 / 15 / 16.5 / 17.5 / 21 / 27 / 44。

* 標題最大 `clamp(28px,4.4vw,44px)`——**不做巨型字**。這個流派不喊。
* 小標籤（`.kick`）用 Bitter 11px、`letter-spacing:.26em`、全大寫，這是唯一允許的「裝飾字」。
* 數字一律用 Bitter + `tabular-nums`。**明文禁用等寬字（mono）**：
  等寬字會把畫面拉去工程製圖那一族，不是拼布。
* 行高寬（1.85），因為這個流派的節奏是慢的。

---

## 五、版面與網格

**整個頁面就是一床被。** 由外而內：滾邊 → 外寬框（四角有角塊）→ 內窄框 → 中心。
內容全部在中心裡，沒有任何東西出血、沒有全寬區塊、沒有 sticky header。

橫向的縫必須對齊——這是拼布唯一的驗收標準（quilters 說 *matching seams*）。
用 **subgrid** 讓卡片內部的分隔線跨整頁對齊：

```css
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(238px,1fr));gap:22px 20px}
.card {grid-row:span 4;display:grid;grid-template-rows:subgrid;gap:0}
@supports not (grid-template-rows:subgrid){.card{display:flex;flex-direction:column}}
```

其他規則：

* **零圓角**（`border-radius:0` 全站）、**零模糊陰影**。投影一律是實心位移色塊：
  `box-shadow:3px 4px 0 rgba(7,13,24,.45)`。
* 對稱優先。這個流派不做不對稱構成——它做的是**同心**。
  變化來自尺寸與顏色的層級，不是來自歪斜。
* 留白不是白，是深色的布。中心區的 padding 就是「素布」。
* RWD：≤900px 外框 64→34px；≤560px 外框 →20px、角塊縮成 20px 純色方塊（去掉文字）、
  卡片兩欄。框架結構在任何寬度都不能消失。

---

## 六、元件配方

**導覽（疏縫布標 basted tab）**——現用態不是高亮，是「縫死了」：

```css
.tab{background:#33456B;color:#EDE4D2;padding:11px 20px 12px;
 transform:rotate(-1.1deg) translateY(-3px);box-shadow:3px 4px 0 rgba(7,13,24,.42);
 transition:transform .12s ease,box-shadow .12s ease}
.tab:hover{transform:rotate(-2.2deg) translateY(-6px)}        /* 只別著一角，會翹 */
.tab.on{background:#C98A1E;color:#101A2E;transform:none;box-shadow:none;
 outline:2px dashed rgba(16,26,46,.85);outline-offset:-6px}   /* 四周跑一圈回針繡 */
```

**按鈕**：實色 + 實心位移影，按下時影歸零、位移 3px。`:disabled` 退成 plum。

**面板 / 卡片**：實色 + **單側** inset 縫份，永不四邊描邊。

**表單**：欄位底色用棉線白 `#EDE4D2`、文字用 night；錯誤訊息用 madder 實色塊，
不用圖示、不用紅框、不用抖動——訊息本身就是布上的一塊補丁。

**表格**：表頭用 plum 實色；每列只有 `border-bottom`；偶數列疊 `rgba(7,13,24,.2)`。

**footer**：night 底，沒有分隔線裝飾（上面那床被的滾邊就是分隔）。

---

## 七、動效規則

四種動態，全部低幅度、全部有 `prefers-reduced-motion` 降級：

| 類型 | 做什麼 | 參數 |
|---|---|---|
| ambient 環境 | **燈影橫掃**：壓線兩側的暗線／亮線隨燈位緩慢互換（煤油燈在動） | `26s ease-in-out infinite alternate`，位移 ±2.4px |
| input 輸入 | 布標翹角、卡片縫份加深、可走的壓線段點亮 | `.09s–.12s ease`，延遲 <100ms |
| transition 轉場 | **走針推移**：`clip-path:inset()` 以針距為單位跳進 | `.62s steps(14,end)` |
| signature 簽名 | **落針起伏**：走過的壓線段立刻獲得起伏 | 無補間，一段一段出現 |

```css
@keyframes lampD{0%{transform:translate(1.5px,2px)}50%{transform:translate(-.4px,2.4px)}100%{transform:translate(-2px,1.2px)}}
@keyframes lampL{0%{transform:translate(-1.5px,-2px)}50%{transform:translate(.4px,-2.4px)}100%{transform:translate(2px,-1.2px)}}
.lofD{mix-blend-mode:multiply;animation:lampD 26s ease-in-out infinite alternate}
.lofL{mix-blend-mode:screen;  animation:lampL 26s ease-in-out infinite alternate}

@keyframes stitchwipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.wipe{animation:stitchwipe .62s steps(14,end) both}

@media (prefers-reduced-motion:reduce){
  .lofD,.lofL{animation:none}   /* 燈停在正上方，起伏仍在，資訊零損失 */
  .wipe{animation:none}
}
```

**明文禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、彈跳（bounce/spring）緩動、
`stroke-dashoffset` 描繪動畫（壓線是一針一針落下的，不是被畫出來的）。
`steps()` 是本風格唯一正確的緩動語彙——手縫的動作本來就是離散的。

---

## 八、插畫與圖像風格（seam-and-stitch 縫份與壓線二層構成）

**零外部圖片、零照片、零人像**（這是流派規定，不是技術限制）。所有圖像由兩層構成：

1. **拼接層**：只有直邊多邊形（正方、長方、菱、直角三角），實色填滿，
   互相直接相鄰，每塊只有一條邊有暗線。
2. **壓線層**：走針虛線，直線與正圓弧，跨過拼接層不理它，兩側各有暗／亮偏移線。

判準：**拿掉全部顏色，仍讀得出哪一條是接縫（有倒向、只有一側暗）、
哪一條是壓線（跨越色塊、兩側都有線、是虛的）。**

六個標準格局（可直接照做）：中心鑽石 Diamond in the Square、條紋 Bars、
日光與陰影 Sunshine and Shadow（正方形轉 45° 排成同心菱環）、九宮格 Nine Patch、
海浪 Ocean Waves（直角三角）、籬笆 Rail Fence（三條一組交替轉向）。

**禁用**：細線幾何線描、半調網點、feTurbulence 手抖濾鏡、做舊紙紋、
任何寫實描繪、任何 emoji、任何曲線有機造形（花草藤蔓一律不做）。

---

## 九、Logo 與 Favicon

Logo 就是一枚被塊（block），不是圖標：同心方 → 角塊 → 菱 → 內菱，
最後一條走針虛線斜穿過去（表示這塊布已經被壓過）。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#101A2E"/><rect x="8" y="8" width="184" height="184" fill="#1B2A4A"/>
  <rect x="8" y="8" width="34" height="34" fill="#A82743"/><rect x="158" y="8" width="34" height="34" fill="#A82743"/>
  <rect x="158" y="158" width="34" height="34" fill="#A82743"/><rect x="8" y="158" width="34" height="34" fill="#A82743"/>
  <rect x="42" y="42" width="116" height="116" fill="#4A2545"/><rect x="50" y="50" width="100" height="100" fill="#12664F"/>
  <path d="M100 50 150 100 100 150 50 100Z" fill="#C98A1E"/><path d="M100 68 132 100 100 132 68 100Z" fill="#A82743"/>
  <path fill="none" stroke="#EDE4D2" stroke-width="4" stroke-dasharray="10 7" d="M14 186 186 14M14 14 186 186"/>
</svg>
```

Favicon 用同一枚塊簡化到 32×32（去掉角塊，只留菱與一條虛線），寫成 inline data URI。

---

## 十、Do & Don't

**Do**

* 先決定框架比例，再決定中心放什麼。框架是骨架，不是裝飾。
* 每一塊顏色都問一次「這是布嗎」——布有織紋、有厚度、有倒向。
* 壓線圖樣要能講出名字（羽毛環／繩索紋／斜格／貝殼／南瓜籽）。
* 文案樸素、具體、不修辭。這個流派的人不做形容詞。
* 深色佔多數，亮色被框住。

**Don't**

* ❌ 描邊。兩個顏色之間永遠沒有 border，只有縫份。
* ❌ 圓角、模糊陰影、發光、玻璃、漸層、半透明疊層。
* ❌ 純白背景、純白大色塊。
* ❌ 等寬字、幾何無襯線、巨型標題、置中大標＋副標＋兩顆按鈕。
* ❌ 印花、材質貼圖、做舊、紙紋、noise 濾鏡。
* ❌ 人像、動物、花草、任何寫實圖像；也不要 emoji。
* ❌ 「EST. 19xx」徽章、跑馬燈、紫藍漸層、置中三張圓角卡片。
* ❌ 出血、全寬區塊、sticky header——被子有邊。

---

## 十一、頁面骨架範例

```html
<body>
<main class="quilt"><div class="border cloth">
  <i class="corner tl"></i><i class="corner tr"></i><i class="corner br"></i><i class="corner bl"></i>
  <div class="field"><div class="inner">

    <ul class="tabs">
      <li><a class="tab on" href="index.html">背面<span class="en">the back</span></a></li>
      <li><a class="tab"    href="top.html">被面<span class="en">the top</span></a></li>
    </ul>

    <p class="kick">THE REGISTER</p>
    <h1>標題</h1>
    <p class="lead">導言。</p>

    <div class="row">
      <div class="pc p">面板一</div><div class="pc">面板二</div><div class="pc e">面板三</div>
    </div>

    <div class="cards">
      <article class="card"><div class="im"><svg …/></div>
        <p class="ti">NO. 118</p><p class="nm">名稱</p><p class="sp">規格</p></article>
    </div>

  </div></div>
</div>
<footer>…</footer></main>
</body>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，分屬 A 渲染／C 版面／E 生成三層。

### 1. CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 2 與拼布的驗收標準「橫縫要對齊」。圖鑑卡片內部的四條橫線
（圖／編號／名稱／規格）以 subgrid 共用同一組 grid line，
所以整頁所有卡片的縫是齊的，改任何一張卡片的內容不會把那一排的縫拉歪。
這件事 flexbox 與一般 grid 都做不到——它們只能對齊卡片外框，不能對齊卡片內部的線。

**查證（2026-08-20）**：MDN《CSS subgrid》與 caniuse `css-subgrid`：
Firefox 71（2019-12）、Safari 16（2022-09）、Chrome / Edge 117（2023-09-12），
web-features explorer 標示 **Baseline Widely available（2026-03-15 起）**，全球覆蓋約 92–94%。

**fallback**：`@supports not (grid-template-rows:subgrid){.card{display:flex;flex-direction:column}}`
→ 卡片改為一般直排，內容一字不少，只是跨卡片的橫縫不再對齊（等於一床縫沒對準的被，仍是一床被）。

### 2. `mix-blend-mode`（A 渲染層）

**承載**：特徵 1 的織紋與特徵 4 的壓線起伏。
織紋層用 `multiply`，所以同一張 45° 紋路蓋在十種底色上都自動得到正確的暗度；
壓線的暗側用 `multiply`、亮側用 `screen`，所以同一條壓線橫跨茜紅、芥末金、靛藍時
不必為每一種底色手調顏色。在「布面零漸層」這條規則下，
這是唯一能表達起伏的做法（不能用 radial-gradient，那會讓布看起來像塑膠）。

**查證（2026-08-20）**：MDN《mix-blend-mode》與 caniuse `css-mixblendmode`：
Baseline Widely available，2020-01 起跨瀏覽器（Chrome 41+、Firefox 32+、Safari 8+、Edge 79+），
SVG 元素上的 `mix-blend-mode` 同樣受支援。**規格陷阱**：Safari 至今不支援
hue／saturation／color／luminosity 這四個非可分離混色模式；本站只用 `multiply` 與 `screen`
（皆為可分離模式），不受影響。

**fallback**：不支援時混色模式被忽略，織紋層退成一層 50% 不透明的暗色細線（布仍有紋理），
壓線的暗／亮線退成固定色（在深底上仍然清楚，在芥末金上對比略降但仍可辨）。
造形、資訊與可讀性零損失。**效能紀律**：`mix-blend-mode` 會建立新的堆疊脈絡，
所以只套在兩個 `<g>` 與一個 `::after` 上，絕不逐元素套；
環境動效只動這兩個 `<g>` 的 `transform`，不觸發 repaint 以外的工作。

### 3. 圖論：歐拉路徑與奇次頂點配對（E 資料與生成層）

**承載**：核心功能「壓線走一趟」。把壓線圖當成圖（graph）：交點是頂點、每一段是邊。
「這床被最少要斷幾次線」＝ 路線檢查（route inspection）的開放路徑版本：

```js
// 每一個連通分量各自計算，再加總
minTrails = Σ over components  max(1, oddDegreeVertices / 2)
```

依 Euler–Listing 定理，一個連通圖若有 2k>0 個奇次頂點，恰好可分解為 k 條開放跡；
奇次頂點為 0 時可一筆走完並回到原點。實作驗證方式是把奇次頂點兩兩配對加上 k 條虛邊，
在補完的偶次圖上跑 Hierholzer 求歐拉迴路，再拆掉虛邊——得到的正是 k 條跡。

**四床壓線圖的實測值**（Node 22 建置階段算出，寫死進頁面）：

| 圖樣 | 段數 | 分量 | 奇次頂點 | 最少起針 | 實際可達 |
|---|---|---|---|---|---|
| 斜格 Crosshatch | 28 | 1 | 0 | 1 | ✔ 1 |
| 羽毛環＋繩索紋 | 40 | 2 | 0 | 2 | ✔ 2 |
| 貝殼紋 Clamshell | 21 | 3 | 6 | 3 | ✔ 3 |
| 南瓜籽 Pumpkin Seed | 24 | 1 | 8 | 4 | ✔ 4 |

**相容性**：純 JavaScript 字串與陣列運算，無瀏覽器 API 依賴，故無支援缺口。
互動輸入用一般 `click` 事件加 `document.elementFromPoint` 之外的
`Element.closest()` 委派（Baseline Widely available），並對每一段與每一個交點
另備 `tabindex="0"` 與 Enter／Space，無指標裝置亦可完整操作。
狀態以 token 串（段號 + `-` 表斷線）序列化進 `?q=`，同碼恆得同一趟。

### 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁最大（`top.html`，含 24 床 inline SVG） | 122 KB | ≤350 KB |
| `frame.html` | 103 KB | ≤350 KB |
| `index.html` / `house.html` | 17 KB / 20 KB | ≤350 KB |
| 首屏 JS 執行（4 床圖建圖 + 首次 render） | < 6 ms | ≤100 ms |
| 環境動效 | 2 個 `<g>` 的 transform，無 layout / 無 getBoundingClientRect | 60fps |
| 外部資源 | 僅 Google Fonts（Bitter + Noto Serif TC） | 零圖片、零音檔 |

壓線起伏的切換只改 `style.opacity`，不重排、不重算幾何；
`clip-path` 轉場為 `steps(14)`，總共 14 幀，不做逐像素補間。
