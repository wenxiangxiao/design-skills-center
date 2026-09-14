---
name: papel-picado-banner
description: Mexican cut-paper banner (papel picado) style — chiseled negative-space motifs on fold-symmetric tissue rectangles, strung on a catenary cord, high-chroma transmissive colour that multiplies where sheets overlap.
---

# 墨西哥剪紙旗 Papel Picado

> 圖案不是畫上去的，是拿掉的那一部分。
> 這個流派的全部難度在一件事上：**你畫的每一刀都是在削弱這張紙**。

---

## 一、設計哲學

Papel picado（直譯「被鑿過的紙」）是墨西哥的節慶懸掛物。一張長方形的薄棉紙（papel de china，約 20 g/m²），
用鑿刀（cincel／fierrito）與木槌從**背面**敲穿，上緣摺一道邊（doblez）包住麻繩，一串掛在街道、市場、墓園與宴席的上方。

四件事決定了它長成這樣：

1. **一次鑿四十到五十張**。四十八張疊起來壓在鉛板上，刀落一次，四十八面一起穿。所以它是一種**印刷**——同一設計的複本，
   而且每一張都不一樣：刀越往下越鈍、疊紙位移越大、角越容易破。
2. **紙一定要連著**。鑿掉的地方不能讓任何一塊紙跟上緣的摺邊斷開，斷了那塊就掉下來。**這是唯一的硬約束**，
   它決定了所有圖案的骨架：圖與圖之間必須留下紙橋（puentes）。
3. **對摺**。圖旗先對摺一次或兩次再鑿，所以一刀同時落在兩個或四個地方，成品嚴格鏡射對稱，
   而摺線在成品上看得出來——那就是這張紙的對稱軸。
4. **它是消耗品**。紙薄、會透光、會被風撕、下雨會爛。做它的人知道它撐不過三場，這不是缺點，是這個東西的本體。

代表：Puebla 州 San Salvador Huixcolotla 鎮（1990 年被列為州級文化遺產的剪紙鎮）、
José Guadalupe Posada 的骷髏版畫（papel picado 的骷髏母題大半從他來）、
以及中國剪紙經由十九世紀陶瓷與絲綢貿易的包裝紙傳入墨西哥的那條路線。

**不要把它當成「花邊裝飾」。** 它是一個有結構力學約束的負空間系統。

---

## 二、本風格的 5 個不可省略特徵

### 1. 圖案是洞，不是形（負空間為主體）

畫面上任何一個「圖形」都必須是被拿掉的紙。做法上這代表：**一整面旗是單一個 path，用 `fill-rule: evenodd`**，
外框是第一個子路徑，每一個洞是後續的子路徑。不要用白色色塊蓋在彩色上假裝是洞——那樣它就不會透光、
疊起來也不會出現第三色，整個流派就死了。

```html
<svg viewBox="0 0 240 162">
  <!-- 外框 + 兩個洞：全部在同一個 d 裡，洞是子路徑 -->
  <path fill-rule="evenodd" fill="#EC0E73" style="mix-blend-mode:multiply"
        d="M0 0H240V162H0Z
           M70 60A22 22 0 1 0 114 60A22 22 0 1 0 70 60Z
           M140 46h44v34h-44Z"/>
</svg>
```

判準：**把顏色抽掉、把背景換成任何一張照片，洞裡應該看得到背景。**

### 2. 對摺造成的嚴格鏡射對稱，而且摺線看得出來

圖旗只在四分之一張紙上設計，其餘三份是鏡射出來的。實作上：只在左半（且若四摺，只在上半）
產生刀的座標，其餘用 `x -> W-x`、`y -> H+my-y` 鏡射。

```js
function mirX(p,W){ return p.map(q=>[W-q[0],q[1]]); }
function mirY(p,H,my){ return p.map(q=>[q[0],H+my-q[1]]); }
// 每一刀：
var cut = chisel(kind,cx,cy,r,rot);
push(cut); push(mirX(cut,W));
if(fourFold){ push(mirY(cut,H,my)); push(mirY(mirX(cut,W),H,my)); }
```

**字旗是例外**：要鏤空排字就不能對摺，否則字會變鏡像。這帶出第 5 條的字符集規則。

### 3. 上緣摺邊（doblez）＋ 下緣扇貝邊（picado）＋ 懸鏈線的繩

單元永遠是橫幅矩形，約 3:2。上緣 10–12% 的高度是不鑿的摺邊——繩從裡面穿過去。
下緣是一整排半圓咬痕，咬出尖齒。旗之間有固定間隙，繩不是直線，是懸鏈線。

```css
/* 摺邊：這一段永遠是實心的，也是掛的地方 */
--doblez: 10.5%;
```

```js
// 繩：y = y0 + sin(pi*u) * sag，風越大 sag 越小（繩被拉直）
var sag = SAG * (1 - Math.min(.55, wind*.42));
```

```js
// 下緣扇貝：圓心落在紙的下邊，半徑略小於間距的一半，才咬得出尖齒
var n=10, s=(W-24)/n;
for(var i=0;i<n;i++) cutCircle(12+s*(i+0.5), H-1, s*0.48);
```

### 4. 薄棉紙的透光與疊乘（顏色是相乘出來的，不是挑出來的）

紙是半透明的。**兩張紙重疊的地方，顏色必須是兩者相乘的第三色，而且不能另外指定。**
這是 papel picado 最容易被做錯的一項：一旦把重疊處畫成不透明或用 `opacity`，
畫面就退化成「彩色貼紙」。

```css
.flag path.paper { mix-blend-mode: multiply; }   /* 全站唯一正確的疊色方式 */
```

色域是高彩度的六色，一串旗**必定輪替多色**（單色串不是 papel picado）：

| 名稱 | hex | 用途 |
|---|---|---|
| rosa mexicano | `#EC0E73` | 主色，出現頻率最高 |
| turquesa | `#00B2C7` | 與 rosa 相鄰時的對比 |
| morado | `#5B2A8C` | 壓暗、收尾 |
| naranja | `#F26B1D` | 節慶感的來源 |
| verde limón | `#A7C520` | 唯一的高明度彩色 |
| amarillo | `#F4C20D` | 標籤、focus、強調 |

底色不是白，是**曬白的水泥／帆布** `#E4E0D6`（約 38% 面積），墨 `#1B1B1B` 給正文與繩。
**零柔和漸層、零圓角 >4px、零模糊陰影**——影子是硬邊的、帶洞的、與紙同色但更深。

```css
:root{ --suelo:#E4E0D6; --tinta:#1B1B1B; --rosa:#EC0E73; --turq:#00B2C7;
       --mora:#5B2A8C; --nara:#F26B1D; --limo:#A7C520; --amar:#F4C20D; }
.card{ border:3px solid var(--tinta); }
.card:after{ content:""; position:absolute; left:7px; right:-7px; top:7px; bottom:-7px;
             background:rgba(27,27,27,.20); z-index:-1; }  /* 硬邊影，不是 box-shadow */
```

### 5. 鑿刀語彙：六把刀，沒有任意曲線

邊緣**只由六種鑿刀的組合構成**。所有曲線是圓弧，所有尖角是 60° 或 90°。
一旦出現貝茲曲線那種柔軟的轉折，看起來就不是鑿出來的了——這是仿這個流派最常錯的地方。

| 刀 | 形 | 用途 |
|---|---|---|
| `gubia` 半圓 | 圓弧 + 一道弦 | 扇貝邊、花瓣、雲 |
| `tri` 三角 | 正三角 60° | 光芒、花萼、齒 |
| `leaf` 柳葉 | 兩道等半徑圓弧相交 | 葉、眼、米粒 |
| `cuadro` 方口 | 正方 0° 或 45° | 窗格、穿繩孔 |
| `punto` 圓點 | 整圓 | 花心、星點 |
| `luna` 彎月 | 大弧減小弧 | 月、鉤、波谷 |

```js
function arcPts(cx,cy,r,a0,a1,n){var p=[];for(var i=0;i<=n;i++){var t=a0+(a1-a0)*i/n;
  p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;}
function chisel(kind,cx,cy,r,rot){
  var p;
  if(kind==='punto'){ p=arcPts(0,0,r,0,Math.PI*2,14); p.pop(); }
  else if(kind==='gubia'){ p=arcPts(0,-r*0.18,r,Math.PI,Math.PI*2,9); p.push([r,r*0.62],[-r,r*0.62]); }
  else if(kind==='tri'){ p=[[0,-r*1.12],[r*0.97,r*0.56],[-r*0.97,r*0.56]]; }
  else if(kind==='cuadro'){ p=[[-r*.78,-r*.78],[r*.78,-r*.78],[r*.78,r*.78],[-r*.78,r*.78]]; }
  else if(kind==='leaf'){ p=arcPts(-r*.62,0,r*1.18,-0.9,0.9,8).concat(arcPts(r*.62,0,r*1.18,Math.PI-0.9,Math.PI+0.9,8)); }
  else { p=arcPts(0,0,r,Math.PI*.62,Math.PI*2.38,12).concat(arcPts(r*.52,0,r*.82,Math.PI*2.30,Math.PI*.70,10)); }
  var c=Math.cos(rot),s=Math.sin(rot);
  return p.map(q=>[cx+q[0]*c-q[1]*s, cy+q[0]*s+q[1]*c]);
}
```

**鏤空排字的字符集規則**：鏤空只排**拉丁大寫與數字**——因為 5×7 點陣字骨的橫筆天生就是紙橋，
拿掉任何一段字就會掉。漢字筆畫太細、封閉輪廓太多，鏤空之後不是掉就是糊。
**漢字不鏤空，漢字印在紙底下的桌面上。** 這條規則同時解決了可讀性與結構兩件事。

---

## 三、色彩系統

| 角色 | hex | 比例 | 說明 |
|---|---|---|---|
| suelo 曬白水泥／帆布 | `#E4E0D6` | 38% | 唯一大面積底色。帶 46px 週期的硬邊條紋（帆布），不是漸層 |
| rosa mexicano | `#EC0E73` | 16% | 主色 |
| turquesa | `#00B2C7` | 12% | |
| morado | `#5B2A8C` | 9% | |
| naranja | `#F26B1D` | 8% | |
| verde limón | `#A7C520` | 5% | |
| amarillo | `#F4C20D` | 5% | 標籤、hover、focus |
| tinta 墨 | `#1B1B1B` | 7% | 正文、3px 邊框、繩 |

規則：
- **重疊處的顏色不得指定**，一律由 `mix-blend-mode:multiply` 算出來。
- 純白只出現在紙卡（`.card`）的底，面積 <10%。
- 一串旗的顏色順序是輪替的；換一疊紙就換一個起始 offset，整站跟著換。

## 四、字體系統

- 漢字：**Noto Sans TC** 400 / 700 / 900。正文 16.5px / 1.72，標題 900、`letter-spacing:-.01em`、`line-height:1.14`。
- 拉丁與數字：**Archivo** 500 / 700 / 800。標籤與眉標一律 `text-transform:uppercase; letter-spacing:.16em`。
- 級距：12.5（眉標）→ 14.5（標籤）→ 16.5（正文）→ 19（小標）→ `clamp(24px,3.4vw,38px)`（節標）→ `clamp(30px,5.2vw,62px)`（頁首）。
- 西班牙文的眉標（`PROXIMOS`、`DOCE PLATOS`、`PUENTES`）是這個流派的語感來源，**但正文不要夾雜西班牙文**。

## 五、版面與網格

- 最大寬 1120px，左右 22px（手機 15px）。
- **分節靠 3px 實線**，不靠留白也不靠背景色塊。`border-top:3px solid var(--tinta)`。
- 不對稱：主要網格是 `1.15fr .85fr`，不是 1:1。三欄只用在同質的價目卡。
- 所有邊框 3px、所有 tag 邊框 2px。圓角上限 4px。
- 表頭是反白的墨色實條，隔行底是 `rgba(244,194,13,.16)`。
- 旗掛在畫面上方，**內容在旗的下面**——版面的閱讀順序是「抬頭看，再低頭讀」。

## 六、動效規則（四種，缺一不可）

| 種類 | 本站的做法 | 參數 |
|---|---|---|
| **ambient 環境** | 繩與旗持續受風擺動，風本身是三個不同頻率正弦的疊加，沒有輸入也一直在動 | `w = .26 + .20sin(.00041t) + .13sin(.00097t+1.3) + .09sin(.0023t+.7)` |
| **input-driven 輸入** | 游標的 x 位置（或裝置 `gamma` 傾角）即時決定風向；延遲 <16ms（同一幀寫入） | 每面旗是二階彈簧–阻尼：`a += (target-a)*.055 - v*.16` |
| **transition 轉場** | 換頁是一道斜向的 `clip-path` wipe（風掀過去），不是淡入 | 250ms linear，`polygon(-30% 0,130% 0,130% 100%,-8% 100%)` |
| **signature 簽名** | **順紙橋傳裂**：風夠大時，全張最細的那一條紙橋先斷，斷掉的那一塊掉下來堆在頁底 | 見第七節 |

**`prefers-reduced-motion` 降級（資訊零損失）**：
- ambient：風停，旗靜止在自然垂掛角度。
- input-driven：不接受風向輸入，但「吹這一面」按鈕仍可按，結果完全一樣，只是不做動畫。
- transition：直接導航，不做 wipe。
- signature：不自動撕；使用者主動按才撕，且撕的結果（碎紙、剩紙比例）照樣顯示為文字。
- **需要時鐘的功能（遊戲）不可以跟著停**：改用 60ms 的 `setInterval` 推進，只是不動旗子。

```js
var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
if(RM){ /* 不跑 rAF，但仍推進邏輯時鐘 */ setInterval(tickAll, 60); }
```

**絕不使用**：淡入進場、滾動視差、數字計數、stroke-dashoffset 描繪。旗會動是因為有風，不是因為你捲動。

## 七、簽名動效：順紙橋傳裂（tear along the bridges）

兩個洞之間剩下的紙叫紙橋。風一大，**先斷的一定是全張最細的那一條**，而且「最細」是算得出來的：

1. 把整面旗光柵化成 2 單位一格（120×81）。
2. 從所有「不是紙」的格（洞、紙外）做多源 BFS，得到每一格紙的**寬度場** `d`。
3. 在 `d` 的**中軸**（四鄰居都不大於自己、且不是平原）上取 `d` 最小的那一點——那就是最細的紙橋，`d` 就是它的半寬。
4. 在那一點挖掉半徑 `d+1` 的圓：那條橋斷了。
5. 重做連通分量。**任何一塊沒有連到上緣摺邊的紙就是掉下來了**——它變成一片碎紙，落到頁尾堆著。

```js
function bottleneck(g,d,CW,TOP,pick){
  var cand=[],bv=1e9;
  for(var i=CW*(TOP+3);i<g.length-CW;i++){
    if(!g[i]||d[i]<1) continue;
    var x=i%CW; if(x<2||x>CW-3) continue;
    if(d[i]<d[i-1]||d[i]<d[i+1]||d[i]<d[i-CW]||d[i]<d[i+CW]) continue;          // 不在中軸上
    if(d[i]===d[i-1]&&d[i]===d[i+1]&&d[i]===d[i-CW]&&d[i]===d[i+CW]) continue;  // 平原不算脊
    if(d[i]<bv){bv=d[i];cand=[i];} else if(d[i]===bv) cand.push(i);
  }
  return cand.length ? {i:cand[pick%cand.length], w:bv, n:cand.length} : null;
}
```

**規則：字旗不參與撕裂。** 承載資訊的那些旗永遠不破，所以頁面上的字一個都不會少。
碎紙也不會消失——它落到頁尾的碎紙堆，可以數。

## 八、插畫與圖像風格

技法名稱：**fold-cut negative（對摺鑿空負形）**。全站零外部圖片，所有圖像由同一支引擎輸出。

構圖照老規矩，由裡到外四層：

1. **中央大孔**（medallion 的心）：半徑 18–27。
2. **兩圈放射**：5–6 與 7–8 把刀繞著中心，只生左半再鏡射；y 方向壓扁 0.88。
3. **內框 marco**：沿左緣 5 刀、上下緣各 4 刀，鏡射成完整一圈；再加兩顆角落補刀。
4. **下緣扇貝** picado：10 個半圓咬過去。
5. 空的地方補 3–5 顆**星點**（單點不成環，所以不會把紙圍死）。

**強制的修補迴圈**（這是這個技法的本體，不是保險措施）：

```js
function repair(sheet){
  for(var t=0;t<22;t++){
    rasterize(sheet); var loose = countComponentsNotTouchingTop();
    if(!loose) return sheet;
    // 一起縮：只縮其中一刀會破壞對摺造成的鏡射對稱，那就不是剪紙了
    for(var i=0;i<sheet.polys.length;i++) sheet.polys[i]=shrink(sheet.polys[i],0.962);
  }
  // 收了二十二次還連不起來：那幾塊就是真的掉了
  eraseLooseCells(sheet);
}
```

實測（100 張隨機）：鏤空率平均 **27.5%**（16–37%），平均修補 **1.5 次**，無一張以「掉了」收場。

**明文禁用**：照片、半調網點、細線幾何線描、`feTurbulence` 假質感、扁平化單色圖示、
任何用白色方塊假裝成洞的做法。

### 疊紙效應（同一刀的第 n 張）

一疊 48 張一起鑿，所以第 n 張帶三個參數：

```js
var blunt = (n-1)/47;            // 刀鈍度
var dx = (n-1)*0.052;            // 疊紙位移（洞位偏移）
var chipProb = 0.02 + 0.30*blunt;// 破角機率
// 每一個頂點：沿隨機方向位移 (0.16 + 1.05*blunt) * rand()
```

**因此同一個設計在頁面上出現兩次，兩次不會長得一樣。禁止 `<use>`、禁止任何圖形複製。**

## 九、Logo 與 Favicon

- Logo：五面字旗掛在一條懸鏈線上，鏤空排出品牌的羅馬字縮寫；五面分別取自同一疊的第 1、12、24、36、48 張，
  所以由左到右刀痕越來越毛——**logo 本身就在示範這個流派最核心的那件事**。
  下方一行 Archivo 800、`letter-spacing:6.5` 的羅馬字，右下角一行 Noto Sans TC 900 的漢字。
- Favicon：32×32 inline SVG data URI，一面 rosa 的旗，下緣七個扇貝齒、五個洞，`fill-rule="evenodd"`。
  **不要用剪刀圖示、不要用派對圖示。**

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23E4E0D6'/%3E%3Cpath fill='%23EC0E73' fill-rule='evenodd' d='M3 4h26v17l-2.2 3.6L24.6 21l-2.2 3.6L20.2 21 18 24.6 15.8 21l-2.2 3.6L11.4 21 9.2 24.6 7 21l-2.2 3.6L3 21Z M13 10a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z M6.5 8.5h3.2v3.2H6.5Z M22.3 8.5h3.2v3.2h-3.2Z M9 15.4h4.2v2.6H9Z M18.8 15.4H23v2.6h-4.2Z'/%3E%3C/svg%3E">
```

## 十、Do & Don't

**Do**

- 每一個「圖形」都先問一次：它是紙還是洞？答不出來就重畫。
- 圖旗一律對摺對稱；字旗一律不對摺。
- 一串旗至少四個顏色輪替。
- 繩畫成懸鏈線，且風大時 sag 變小。
- 讓紙會破。破是這個流派的一部分，不是 bug。
- 把「紙要連著」寫成程式會檢查的條件，不要只在腦裡遵守。

**Don't**

- ❌ 用白色色塊假裝成洞（它不透光，疊起來不出第三色）。
- ❌ 用 `opacity` 做疊色（正確的是 `mix-blend-mode:multiply`）。
- ❌ 用貝茲曲線畫「剪紙感」的花邊。
- ❌ 用 emoji 骷髏、辣椒、仙人掌、墨西哥帽當圖示——那是觀光紀念品，不是這個流派。
- ❌ `EST. 19xx` 徽章、紫藍漸層、置中三卡片、rounded-2xl 加模糊陰影。
- ❌ 圓角 >4px、`box-shadow` 的模糊影、任何柔和漸層背景。
- ❌ 把旗做成靜止的裝飾條（沒有風就沒有這個流派）。
- ❌ 鏤空漢字。

## 十一、頁面骨架範例

```html
<header class="canopy"><span class="pole l"></span><span class="pole r"></span>
  <div class="wrap">
    <nav><ul class="nav">
      <li class="on"><a href="index.html" aria-current="page"><svg class="fl"></svg><span class="lb">抬頭</span></a></li>
      <li><a href="menu.html"><svg class="fl"></svg><span class="lb">十二道</span></a></li>
    </ul></nav>
  </div>
</header>

<main>
  <section class="sect">
    <div class="wrap"><p class="eyebrow lat">PROXIMOS — 眉標</p></div>
    <div class="sky"><svg viewBox="0 0 1200 430" preserveAspectRatio="xMidYMid meet"></svg></div>
    <div class="wrap">
      <h1 class="big">標題在旗的下面。</h1>
      <dl class="infogrid">…</dl>
    </div>
  </section>
</main>

<footer class="scraps">
  <div class="pile"></div>           <!-- 碎紙堆 -->
  <div class="wrap">…</div>
</footer>
```

```css
/* 導覽：現用頁那一面旗翻正，其餘側翻（看到的是薄紙的側面，洞看不見） */
.nav li:not(.on) .fl{ transform:scaleX(.34) skewX(-9deg); filter:saturate(.25) brightness(1.06); }
.nav li.on  .fl{ transform:none; }
.nav .fl{ transition:transform .34s cubic-bezier(.22,.9,.3,1), filter .34s; transform-origin:50% 0; }
```

---

## 十二、技術實作與相容性

本風格的三項核心技術、查證來源、fallback 與實測值。

### A. 剪紙結構求解器（約束求解 + 連通圖 / 中軸）— 純算術，零 API 依賴

**它承載什麼**：特徵 1（洞是主體）與特徵 2（對摺對稱）的合法性，以及簽名動效（順紙橋傳裂）。
沒有它，「紙要連著」只能靠人眼判斷，對摺對稱也會在修補時被破壞。

- 光柵：2 單位一格 → 120×81 = 9720 格。多邊形以掃描線填入 bbox 範圍，不做全域測試。
- 連通分量：4-鄰域 flood fill，判斷每一塊紙是否碰得到上緣摺邊。
- 中軸近似：寬度場 BFS 後取四鄰居局部極大且非平原者。
- **相容性**：無瀏覽器 API 依賴，只用 `Uint8Array` / `Int32Array`（Baseline widely available）。
  沒有 typed array 的環境（IE10 以前）退回一般陣列即可。

**實測（Node 22，100 張隨機旗）**：生成＋修補＋驗連通 **112 ms／100 張 = 1.12 ms 一張**；
一頁最多 18 面旗 → 約 **20 ms**，遠低於首屏 JS 100 ms 的預算。
鏤空率 27.5%（16–37%），平均修補 1.5 次，0 張以「掉了」收場。

### B. DeviceOrientation（D 輸入與感測層）— 風向與風力

**它承載什麼**：特徵 3 的懸掛物語意。papel picado 掛在戶外，風是它唯一的外力；
在手機上把裝置斜著拿，`gamma` 直接就是風向，這比任何滑桿都更像那件事。

- **查證（MDN）**：`DeviceOrientationEvent` 介面為 **Baseline widely available**，
  自 2023 年 9 月起在各大瀏覽器可用。
- **查證（MDN）**：`DeviceOrientationEvent.requestPermission()` 靜態方法**不是 Baseline**——
  它只在部分瀏覽器（Safari／iOS）存在，需要 **transient activation**（必須由點擊等 UI 事件觸發），
  且僅在 **secure context（HTTPS）** 可用；回傳 Promise，resolve 為 `"granted"` 或 `"denied"`。
- **fallback（三層，全部實作）**：
  1. 有 `requestPermission` → 提供一顆「接上傾斜感測」按鈕（滿足 transient activation），
     使用者拒絕時顯示「要不到權限，改用下面的風力桿」。
  2. 無 `requestPermission` 但有 `deviceorientation` 事件（Android Chrome、桌機的一部分）→ 直接監聽，
     `e.gamma === null` 時不採用。
  3. 完全沒有 → **桌機用游標 x 位置當風向**（永遠可用），另備一支 0–100 的風力桿 `<input type=range>`。
- 風向永遠夾在 `[-1,1]`：`udir = clamp(gamma/38, -1, 1)`，風力 `min(.85, |gamma|/52)`。

```js
function askTilt(btn){
  var D = window.DeviceOrientationEvent;
  if(!D){ btn.textContent='這台裝置沒有傾斜感測'; btn.disabled=true; return; }
  if(typeof D.requestPermission === 'function'){           // iOS / Safari
    D.requestPermission().then(function(r){
      btn.textContent = (r==='granted') ? '已接上' : '沒有給權限，改用下面的風力桿';
    }).catch(function(){ btn.textContent='要不到權限，改用下面的風力桿'; });
  } else {                                                  // 直接聽
    btn.textContent='這台裝置直接聽傾斜；桌機請用游標與風力桿'; btn.disabled=true;
  }
}
```

### C. requestAnimationFrame 物理積分（B 動效與時間軸層）— 繩的懸鏈線與旗的阻尼擺

**它承載什麼**：特徵 3。繩不是直線、旗不是同步擺動——每一面旗有自己的相位與慣性，
而繩的下垂量隨風變化。用 CSS animation 做不到（風是連續變數，不是關鍵影格）。

- 每面旗：二階彈簧–阻尼 `v += (target - a)*0.055 - v*0.16; a += v;`
  `target = dir * wind * 26 * (0.6 + 0.55*sin(phase + 0.0011t))`。
- 繩：16 段折線逼近 `y = y0 + sin(pi·u)·sag`，`sag = SAG·(1 - min(.55, wind·.42))`。
- **不做 layout thrashing**：每幀只寫 `transform` 屬性字串，不讀取任何幾何；
  旗的 `d` 只在生成與撕裂時重算。
- **相容性**：`requestAnimationFrame` Baseline widely available。
  沒有時（極舊環境）退回 `setInterval(…,60)`——這也正是 `prefers-reduced-motion` 的路徑。

### 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS，不含 Google Fonts） | ≤350 KB | **40.7–46.6 KB** |
| 首屏 JS 執行（18 面旗的生成＋修補＋驗連通） | ≤100 ms | **約 20 ms**（1.12 ms／面 × 18） |
| 主要動畫 | 60 fps | 每幀只寫 ≤20 個 `transform` 字串，無讀取、無 layout thrashing |
| 撕裂一次（寬度場 BFS ＋ 連通分量 ＋ 重畫路徑） | — | **約 2.5 ms**（一次性事件，不在每幀） |

### 其他用到的 CSS（非核心技術，但這個流派必需）

- `mix-blend-mode: multiply` — 特徵 4 的唯一正確實作。Baseline widely available。
  不支援時（極舊瀏覽器）旗會變成不透明色塊，版面與可讀性不受影響，只是失去疊色。
- `fill-rule="evenodd"` — 特徵 1。SVG 1.1 起全面支援。撕裂後改用光柵重畫時切換成 `nonzero`
  （因為那時的子路徑是會互相重疊的小方塊）。
- `clip-path` + `@keyframes` — 換頁 wipe。不支援時整塊 overlay 不顯示，導航照常。
