---
name: rosta-window-stencil
description: Soviet ROSTA Windows (1919–21) hand-stencilled agitprop: 4–14 numbered panels read in sequence, cut-paper pictograms whose enclosed counters are held by visible paper bridges, three spot plates on grey kraft with deliberate misregistration, and one rhymed imperative line under every panel.
---

# ROSTA 窗（蘇聯電報社窗）— 型版連環風格規格書

> 這不是「復古海報風」。這是一個有明確年代（1919 年 2 月–1921 年）、明確地點（莫斯科，一間空掉的糖果店櫥窗）、
> 明確技術限制（沒有印刷廠、沒有紙、只能用型版一張一張手刷）的既有流派。
> 它的每一個視覺特徵都是那個限制的直接後果。你可以把它套在任何產業上，但不能拿掉那些限制——拿掉了就只剩「紅黑配色」。

---

## 一、設計哲學

**1. 版面是一串順序，不是一張構圖。**
ROSTA 窗一張紙上有四到十四格，由左至右、由上至下讀，讀完為止。它不是海報（一眼看完），是連環（一格一格看完）。
所以這個風格沒有「主視覺」這個角色，也沒有「hero」。第一格是事情發生了，最後一格永遠是命令句——你明天早上該做什麼。

**2. 圖與字不重複講同一件事。**
圖說發生了什麼（一捆紙淋到雨），字說你該怎麼辦（蓋一塊帆布）。
如果把圖說一次的事再用字說一次，這個風格就崩了——因為它原本的讀者不識字，圖必須自己成立；而識字的人看字就夠，圖不必解釋自己。

**3. 每一個形都必須是「刀切得出來的」。**
沒有漸層、沒有陰影、沒有變化線寬、沒有透視、沒有地平線。一個形要嘛被挖掉、要嘛留著，沒有中間值。
這不是美學潔癖，是型版的物理：刀只能割開或不割開。

**4. 錯位不修。**
三塊版對位對不準是手刷的常態。原作沒有修，因為修一次要重刷，重刷就少貼兩條街。
把「不完美」寫成規則：錯位是常駐的、可見的、有方向的，而不是隨機噪點。

**5. 稀缺是內容的一部分。**
一塊型版刷幾張就會破。刷幾張，決定這面窗貼得到城裡第幾條街。
所以「做得好不好」在這個風格裡不是美感評分，是「有幾個人看得到」。設計要把這件事說出來。

---

## 二、色彩系統

四塊顏色，三塊是版，一塊是紙。**上限就是三塊版**——多一塊就多一次對位、多一次過紙、多一天工。

| 色票 | 名稱 | 角色 | 面積比 |
|---|---|---|---|
| `#B9AB8D` | 灰赭包裝紙 paper | **地色**。不是米白、不是白。明度約 0.41 的偏灰赭，因為那是戰時能拿到的紙 | 34% |
| `#CBBFA4` | 新貼上去的紙 paper2 | 卡面、格子底、剛貼上去那一張 | 16% |
| `#191510` | 墨版 ink | 所有輪廓、正文、格線、footer。**事情本身** | 24% |
| `#C6261A` | 朱版 red | **行動、我們、命令、拒絕、現用態**。永遠是動詞不是名詞 | 17% |
| `#D9992A` | 赭版 ochre | 第三塊、最薄的一塊。只給「會漏、會破、會髒」的東西與漿糊暈 | 6% |
| `#EDE6D4` | 留白 white | 橋、紙縫、深底上的字 | 2% |
| `#100D09` | 頁外底 deep | footer 與頁面之外 | 1% |

**硬規則：**

- **朱版不做正文。** `#C6261A` 對 `#B9AB8D` 的對比只有 2.9:1。朱版只給 ≥24px 的字、圖形、記號。正文一律墨版（7.9:1）。
- **兩塊版相鄰時留 1–2px 紙色縫**（型版對不準會露白，所以乾脆先留）。**兩塊版永不用漸層過渡**，永不疊出第四色（除非那是套印失誤的那一次，而那一次是刻意的）。
- **零漸層**。唯一允許的重複性底紋是紙纖維（見下），它不是漸層，是紋。
- **零模糊陰影**。要陰影就用實心位移色塊。
- **零圓角**。`border-radius: 0` 寫進 reset。

```css
:root{
  --paper:#B9AB8D; --paper2:#CBBFA4; --white:#EDE6D4;
  --ink:#191510;   --red:#C6261A;    --ochre:#D9992A;
  --deep:#100D09;  --knife:#8C3F12;
}
/* 紙：只有纖維，沒有漸層 */
.sheet{
  background-color:var(--paper);
  background-image:
    repeating-linear-gradient(0deg, rgba(25,21,16,.055) 0 1px, transparent 1px 4px),
    repeating-linear-gradient(90deg,rgba(25,21,16,.035) 0 1px, transparent 1px 7px);
}
```

---

## 三、字體系統

原作的字是刻出來的，不是排出來的——所以它粗、扁、緊、字腔小、而且**帶橋**。網頁上沒有這種中文字型，
所以做法是：**中文用最重的無襯線當「刷出來的字」，拉丁與數字用真正的型版字型當識別，真正帶橋的字一律自己畫成 SVG。**

| 用途 | 字型 | 字重 | 設定 |
|---|---|---|---|
| 中文標題、格子標語 | `Noto Sans TC` | 900 | `letter-spacing:.03em; line-height:1.14` |
| 中文正文 | `Noto Sans TC` | 500 | `line-height:1.72; font-size:16px` |
| 拉丁副標、數字讀數、章節記號 | `Stardos Stencil` | 700 | `letter-spacing:.06–.22em` |
| 大數字（價錢、窗號） | **自繪 SVG 型版數字**（見第五章） | — | 描邊 16／box 60×100 |

字級階梯（1.28 比例，刻意短——連環格裡只需要三級）：

```css
h1{font-size:clamp(24px,4.4vw,42px)}   /* 日期列，不是 hero */
h2{font-size:clamp(21px,3vw,29px); border-top:5px solid var(--ink); padding-top:10px}
h3{font-size:17.5px}
p {font-size:16px}  .small{font-size:13px}
.lat{font-family:"Stardos Stencil",monospace; font-weight:700}
```

**禁止**：襯線體、手寫體、圓體、任何有粗細變化的字重軸。這個流派沒有優雅。

---

## 四、版面與網格

### 4.1 連環格陣（本風格的骨架）

一頁一張紙，紙上四到十四格。格數必須是**行×列**的整數矩形（原作幾乎都是 2×2、2×3、3×4、2×7）。

```css
.serial{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  grid-template-rows:repeat(2, auto auto auto); /* 每格三列：圖／格號／標語 */
  border:4px solid var(--ink); background:var(--ink); /* 格線＝底色透出來 */
}
.pane{
  grid-row:span 3;
  display:grid; grid-template-rows:subgrid;   /* ← 關鍵：跨格對齊 */
  border-right:4px solid var(--ink); border-bottom:4px solid var(--ink);
}
```

**為什麼一定要 `subgrid`：** 八格的標語長短不一。沒有 subgrid，每格的圖／格號／標語各自堆疊，
八格的標語基線會參差——那一瞬間它就從「一張印刷品」變成「八張卡片」。
subgrid 讓每一格的三列都吃父格的同一組列軌，於是**圖底對齊、格號對齊、標語首行對齊**，
不管哪一格的字比較長。這是這個風格在網頁上唯一無法用別的方法做對的一件事。

### 4.2 留白與邊界

- 圖區留白率 **40–60%**（不是滿版；ROSTA 的圖是被格子框住的孤島，四周留白是格線的呼吸）。
- 格線寬 **4–5px**，永遠是墨版，永遠是實線，永遠不圓角。
- 頁面左右各一條 5px 墨版線（那是櫥窗的框）。
- **不做置中對稱**。格內的圖偏一邊，標語靠左，格號靠左上。

### 4.3 旋轉

只有一種旋轉，而且只給「現用態」：**−0.8°**。這是紙貼歪的角度，不是設計語彙。任何其他元素旋轉角一律 0。

---

## 五、本風格的 5 個不可省略特徵

> 每一項都是「拿掉它就不是這個風格了」。每一項都附可以直接複製的片段。

### 特徵 1｜多格連環＋格號＋押韻命令句

四到十四格，由左至右由上至下，每格左上角有格號（`03／08`），每格底下一行短句，句尾押韻、口語、命令式。
最後一格一定是「你明天該做什麼」。

```html
<article class="pane">
  <div class="fig"><!-- 型版圖 --></div>
  <p class="no">03／08</p>
  <p class="cap">磅秤笑，你無趁——重的是水，毋是紙。</p>
</article>
```
```css
.pane .no{font-family:"Stardos Stencil",monospace;font-size:13px;letter-spacing:.16em;color:var(--red)}
.pane .cap{font-size:14.5px;font-weight:700;line-height:1.5}
```

**驗收：** 遮住全部文字，你還看得出這是「一串」而不是「一張」。遮住全部圖，那八句話自己也讀得成一段。

### 特徵 2｜型版形與**橋**（本風格的指紋）

型版是一張挖了洞的紙板。要印一個環形（`0`、`8`、`口`、一個罐子的輪廓），環中間那塊紙沒有東西連著它，一提起來就掉。
所以刻的時候必須留幾段不割——**橋**。印出來，橋就是筆畫上的白縫。

**這是整個風格最容易被漏掉、也最致命的一項。** 沒有橋的「型版風」是假的型版風。

```html
<svg viewBox="-8 -8 76 116" class="art">
 <g class="plate">
  <!-- 1. 島的底：島掉了就看到這塊顏色 -->
  <path class="bed" d="M16 25.3L25.3 16H34.7L44 25.3V74.7L34.7 84H25.3L16 74.7Z"/>
  <!-- 2. 島：紙色，就是會掉下來的那塊紙 -->
  <path class="isl" d="M16 25.3L25.3 16H34.7L44 25.3V74.7L34.7 84H25.3L16 74.7Z"/>
  <!-- 3. 筆畫：中線折線 + 描邊 16，butt 端、miter 角 -->
  <path class="stk" d="M8 22L22 8L38 8L52 22L52 78L38 92L22 92L8 78Z" stroke-width="16"/>
  <!-- 4. 橋：紙色矩形，橫過筆畫，畫在筆畫之上 -->
  <rect class="brg" x="-7" y="-13" width="14" height="26" transform="translate(30 8)"/>
 </g>
</svg>
```
```css
.stk{fill:none;stroke:var(--plate);stroke-linecap:butt;stroke-linejoin:miter}
.bed{fill:var(--plate)}     /* 島掉了露出來的顏色 */
.isl{fill:var(--paper2)}    /* 島 */
.brg{fill:var(--paper2)}    /* 橋 */
```

**島的幾何怎麼求：** 島的邊界是筆畫的**內緣**，不是中線。把封閉中線折線往內縮 `strokeWidth/2`：
逐邊往法向平移，再求相鄰兩邊的直線交點；兩個方向都算一次，取面積較小的那一組（這樣不必判斷繞向，凹多邊形也對）。

```js
function offs(pts,d){const n=pts.length,L=[];
  for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n];
    const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=dy/l,ny=-dx/l;
    L.push([a[0]+nx*d,a[1]+ny*d,b[0]+nx*d,b[1]+ny*d]);}
  const o=[];
  for(let j=0;j<n;j++){const[p,q]=[L[(j-1+n)%n],L[j]];
    const[x1,y1,x2,y2]=p,[x3,y3,x4,y4]=q;
    const den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
    if(Math.abs(den)<1e-6){o.push([x3,y3]);continue;}
    const t=((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den;
    o.push([x1+t*(x2-x1),y1+t*(y2-y1)]);}
  return o;}
const area2=p=>Math.abs(p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a[0]*b[1]-b[0]*a[1];},0))/2;
const inset=(p,d)=>{const a=offs(p,d),b=offs(p,-d);return area2(a)<area2(b)?a:b;};
```

**橋的兩條紀律：**
- 每一座島**至少一根橋**，否則那塊掉出去、印出來是一塊實心色塊。
- 一個形上所有橋寬加起來 **不得超過該形筆畫全長的 19%**，否則筆畫被切成一段一段，字念不出來。
  （這兩條合起來就是這個風格的成本函數：橋多＝版牢＝刷得多；橋多＝字斷＝白刷。）

### 特徵 3｜三塊專色版、缺口留白、常駐錯位

每個顏色是**一塊獨立的型版**。所以 DOM 上每塊版是一個 `<g>`，可以獨立位移。

```html
<svg class="art" viewBox="0 0 120 132">
  <g class="plate p-ink">…</g>
  <g class="plate p-red">…</g>
  <g class="plate p-ochre">…</g>
</svg>
```
```css
.p-ink{--plate:var(--ink)} .p-red{--plate:var(--red)} .p-ochre{--plate:var(--ochre)}
/* 常駐錯位：不是抖動，是四張不同的手刷樣張 */
@keyframes reg-r{0%{transform:translate(0,0)}25%{transform:translate(1.3px,-.9px)}
 50%{transform:translate(-1px,1px)}75%{transform:translate(.6px,1.2px)}100%{transform:translate(0,0)}}
.p-red{animation:reg-r 1.6s steps(1) infinite}   /* steps(1)：四個離散位置，不補間 */
```

**補漏白（trapping）：** 真的手刷會讓油墨稍微溢出刀口。用 `feMorphology` 把每塊版整體外擴 0.6，
兩塊版之間預留的 1.5px 紙縫就變成 0.3px——這正是原作看起來的樣子。

```html
<filter id="spread" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.6"/>
</filter>
```
```css
.art .plate{filter:url(#spread)}   /* 關掉它，你看到的就是刀路本身 */
```

### 特徵 4｜象形化的「類型」，不是個體

人物只有：頭（一個封閉多邊形——它本身就是一座島，需要一根橋）、軀幹一條粗棒、四肢四條粗棒。
**沒有臉、沒有透視、沒有地平線、沒有陰影、沒有細節。** 物件同理：一個罐子就是一個帶蓋線的矩形。

```js
// 一個「人」：五條折線，一座島（頭）
lang: { sw:12, s:[
  [[[38,14],[44,8],[54,8],[60,14],[60,26],[54,32],[44,32],[38,26]], 1],  // 頭（封閉）
  [[[49,32],[49,60]], 0],                       // 軀幹
  [[[26,50],[49,38],[72,26]], 0],               // 兩臂（一高一低＝在扛東西）
  [[[49,60],[32,88]], 0], [[[49,60],[66,88]], 0]] }  // 兩腿
```

**驗收：** 拿掉全部顏色，你仍然讀得出「這是一個人在扛東西」，而且你說不出他是誰、幾歲、什麼表情。
說得出來就是畫太細了。

### 特徵 5｜格線是實心墨槓，狀態靠「貼上去」表達

這個風格沒有陰影、沒有發光、沒有圓角，所以「現在在哪一頁」不能用高亮表達。
原作的做法是物理的：**那張紙貼上去了，其他的還沒貼。**

```css
.nav a{background:rgba(16,13,9,.16); border-right:3px solid var(--ink)}   /* 空玻璃 */
.nav a[aria-current]{
  background:var(--paper2); transform:rotate(-.8deg);
  box-shadow:0 0 0 3px var(--ink);                    /* 實心，不模糊 */
}
.nav a[aria-current]::before{   /* 四角漿糊暈 */
  content:"";position:absolute;inset:3px;pointer-events:none;
  background:
   radial-gradient(circle at 0 0,   rgba(217,153,42,.5) 0 6px,transparent 6px),
   radial-gradient(circle at 100% 0,rgba(217,153,42,.5) 0 6px,transparent 6px),
   radial-gradient(circle at 0 100%,rgba(217,153,42,.5) 0 6px,transparent 6px),
   radial-gradient(circle at 100% 100%,rgba(217,153,42,.5) 0 6px,transparent 6px);
}
.nav a[aria-current]::after{    /* 上緣撕痕 */
  content:"";position:absolute;left:0;right:0;top:-1px;height:4px;
  background:repeating-linear-gradient(90deg,var(--ink) 0 3px,transparent 3px 7px);
}
```

---

## 六、元件配方

### 6.1 導覽 `pane-pasted`（窗格已貼）

四頁＝櫥窗的四格玻璃。現用頁那一格貼著一張紙（見特徵 5），其餘是空玻璃（只有格框與編號）。
≤900px 攤成等寬四格；≤560px 縮小字級但保留「貼上去 vs 空著」的差別；頁尾必備完整文字連結保底。

### 6.2 按鈕

```css
.btn{border:4px solid var(--ink); background:var(--ochre); color:var(--ink);
  font-weight:900; letter-spacing:.08em; padding:10px 20px; border-radius:0;
  transition:background-color .08s steps(2), color .08s steps(2)}   /* steps，不補間 */
.btn:hover{background:var(--red); color:var(--white)}
.btn.主{background:var(--red); color:var(--white)}
.btn.主:hover{background:var(--ink)}
```
**不做**：陰影、位移、縮放、圓角。按鈕換的是顏色，而且是跳過去的，不是漸變過去的。

### 6.3 卡片（用 subgrid 對齊）

```css
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(258px,1fr));gap:16px}
.card{grid-row:span 4; display:grid; grid-template-rows:subgrid;   /* 圖／名／列表／條件 */
      border:4px solid var(--ink); background:rgba(237,230,212,.36)}
@supports not (grid-template-rows:subgrid){
  .card{grid-row:auto;display:flex;flex-direction:column}
  .card .cond{margin-top:auto}
}
```

### 6.4 表格

```css
table{border-collapse:collapse;width:100%}
th,td{border:3px solid var(--ink);padding:7px 10px;vertical-align:top}
th{background:var(--ink);color:var(--white);letter-spacing:.06em}
td.n{font-family:"Stardos Stencil",monospace;text-align:right;white-space:nowrap}
```

### 6.5 表單

輸入框 `border:3px solid var(--ink)`、底 `var(--white)`、`border-radius:0`、focus 用 3px 朱版 outline。
錯誤訊息用朱版粗體，**並且旁邊掉一座島**（見 7.4）——錯誤在這個風格裡不是紅字，是東西掉下來。

### 6.6 頁尾

深底 `--deep`、上緣 5px 朱版線、四欄資訊（地址／時間／人／頁面），最後一段小字寫免責與流派出處。

---

## 七、動效規則（四種，缺一不可）

**通則：全站沒有一條 `ease`。** 所有 timing-function 都是 `steps()`。
理由不是風格偏好——手刷的東西沒有中間影格，一張紙要嘛印了要嘛沒印。

### 7.1 ambient｜套印錯位（1.6s，`steps(1)` × 4 段）
朱版與赭版各自沿自己的方向在四個離散位置間跳。不是抖動，是「你正在看第幾張手刷樣張」。
`prefers-reduced-motion` → `animation:none`，停在對位準的那一張。

### 7.2 input-driven｜三塊版當場分開（80ms）
hover／focus 任一格，朱版位移 `(6px,-5px)`、赭版位移 `(-5px,4px)`，同時浮出刀路細線。
延遲 <100ms。動畫要用 `animation:none` 蓋掉 ambient，否則 transition 打不贏 animation。

```css
.pane .plate{transition:transform .08s steps(2)}
.pane:hover .p-red,.pane:focus-within .p-red{animation:none;transform:translate(6px,-5px)}
.pane:hover .cut,.pane:focus-within .cut{display:inline;stroke:rgba(140,63,18,.75);stroke-width:1}
```

### 7.3 transition｜一格一格貼上去（320ms `steps(5)`，62ms stagger）
```css
@keyframes paste{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
.pane{animation:paste .32s steps(5) both; animation-delay:calc(var(--i,0)*62ms)}
```
`prefers-reduced-motion` → `animation:none; clip-path:none`（直接是最終畫面）。

### 7.4 signature｜**掉島 island-drop**
沒有被橋接回外界的島，在「刷版」的瞬間從版上脫落、翻著掉出畫面，留下一塊實心的色版底。
用 `steps(6)`——它是被手刷出來的，不是被補間出來的。

```css
@keyframes fall{to{transform:translate(var(--fx,10px),var(--fy,300px)) rotate(var(--fr,52deg))}}
.isl{transform-box:fill-box;transform-origin:50% 50%}
.isl.fell{animation:fall .72s steps(6) forwards}
svg.art{overflow:visible}          /* 島要掉得出畫面 */
.art .plate.nofilter{filter:none}  /* 掉的時候關掉 feMorphology，否則被濾鏡區域裁掉 */
```
`prefers-reduced-motion` → `animation:none; visibility:hidden`。島一樣是不見了，露出的一樣是實心色塊，資訊零損失。

**掉島同時是全站的「拒絕」語彙**：表單驗證失敗時，該欄位旁邊掉一座島，而不是閃一下紅框。

---

## 八、插畫與圖像風格

技法名稱：**`stencil-bridge pictogram` 型版橋象形構成**。全站零外部圖片、零照片、零寫實描繪。
所有圖像（連環格的圖、品項象形、logo、favicon、回執印記）都由**三種原語**組成：

1. **象形形**：以 `stroke-width` 12–16、`butt` 端、`miter` 角描出的折線集合（開放或封閉）。
   人物只有頭與五根棒；物件只有外框與一兩條分件線。
2. **島**：封閉折線內縮 `sw/2` 得到的多邊形（見特徵 2 的 `inset()`）。它是「會掉下來的那塊紙」。
3. **橋**：`w × (sw+10)` 的紙色矩形，橫過筆畫，畫在筆畫之上。橋寬 10–14。

**判準：拿掉全部顏色，你仍然讀得出「哪一塊會掉下來」。**

**明文禁止**：`feTurbulence`/`feDisplacementMap` 手抖邊（那是迷幻海報與噴漆模板的語彙，會糊掉刀口）、
半調網點、細線幾何線描、`stroke-linecap:round`、任何漸層填充、任何寫實描繪。

**兩種讀法（同一份幾何）：**

| | 印樣 print | 刀路 knife |
|---|---|---|
| 筆畫 | `stroke:var(--plate)`，套 `feMorphology` 外擴 | `stroke:var(--knife)` + 上疊一條 `stroke-width:sw-2` 紙色線 ⇒ 1px 外框 |
| 島 | 紙色實心 | 無填色、1px 刀線 |
| 橋 | 紙色實心 | 無填色、1px 刀線 |

給使用者一顆「看刀路／看印樣」的鈕。這一顆鈕比任何說明文字都更能講清楚這個風格是什麼。

---

## 九、Logo 與 Favicon 設計指南

**原則：logo 本身必須是一塊型版。** 選一個有封閉內白的字或形（`日`、`回`、`0`、`8`、一個環），
把它刻成型版，然後**把橋畫出來**。看到 logo 的人第一眼會問「為什麼那條白線橫過去」——那就對了。

```svg
<rect x="6" y="6" width="84" height="84" fill="#C6261A"/>            <!-- 朱版底 -->
<g fill="none" stroke="#191510" stroke-width="10" stroke-linecap="butt" stroke-linejoin="miter">
  <path d="M20 20H76V76H20Z"/><path d="M20 48H76"/>                  <!-- 「日」＝兩座島 -->
</g>
<g fill="#C6261A">                                                    <!-- 橋 -->
  <rect x="40" y="14" width="16" height="12"/><rect x="40" y="42" width="16" height="12"/>
  <rect x="40" y="70" width="16" height="12"/><rect x="14" y="40" width="12" height="16"/>
</g>
```

**Favicon**：16px 下只讀得出三件事——紙色底、一個朱版方環、環上兩道紙色缺口。
不要放字，不要放漸層。inline SVG data URI 寫在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23B9AB8D'/%3E%3Cpath d='M14 14H50V50H14Z' fill='none' stroke='%23C6261A' stroke-width='9'/%3E%3Crect x='26' y='9' width='12' height='12' fill='%23B9AB8D'/%3E%3Crect x='26' y='43' width='12' height='12' fill='%23B9AB8D'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

### Do
- 四到十四格，整數矩形排列，有格號，由左至右讀。
- 每格底下一行押韻的、口語的、命令式的短句。最後一格是「你該做什麼」。
- 每一座封閉內白都畫出橋。橋是白的，看得見的。
- 三塊版，各自是一個可獨立位移的 `<g>`。相鄰兩色之間留紙縫。
- 錯位常駐、可見、有方向。
- 所有 timing-function 用 `steps()`。
- 現用態用「貼上去 vs 空著」表達。
- 紙是灰赭的（明度 0.40–0.45），不是米白也不是白。

### Don't
- ❌ 不要 hero：沒有「大標＋副標＋兩顆按鈕＋三張卡片」。這個風格的首屏是一串格子。
- ❌ 不要漸層、不要模糊陰影、不要圓角、不要玻璃擬態。
- ❌ 不要 `ease`／`cubic-bezier`。一個都不要。
- ❌ 不要噴霧毛邊、不要手抖濾鏡、不要做舊污漬紋理。ROSTA 不是 grunge。
- ❌ 不要畫沒有橋的環形。那不是型版，那是紅黑配色。
- ❌ 不要用朱版寫正文（對比 2.9:1）。
- ❌ 不要「EST. 19xx」徽章、不要跑馬燈、不要數字滾動、不要 `stroke-dashoffset` 描繪、不要視差。
- ❌ 不要畫臉、不要畫透視、不要畫地平線、不要畫陰影。
- ❌ 不要把圖說過的事再用字說一次。

---

## 十一、頁面骨架範例（可直接改用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>今日的窗｜○○○</title>
<link rel="icon" href="data:image/svg+xml,…"><!-- 見第九章 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Stardos+Stencil:wght@400;700&display=swap" rel="stylesheet">
<style>/* 見第二、三、四、七章 */</style></head><body>

<!-- 補漏白濾鏡：全站共用一顆 -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<filter id="spread" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
<feMorphology operator="dilate" radius="0.6"/></filter></defs></svg>

<div class="sheet">
  <header class="head">
    <div class="mark"><!-- logo svg --><div><b>店號</b><span class="lat">ROMANISATION</span></div></div>
    <p class="slug">一句話講完你在賣什麼、怎麼賣。不要標語，要事實。</p>
    <nav class="nav" aria-label="主要導覽">
      <a href="index.html" aria-current="page"><i>01</i>今日的窗</a>
      <a href="b.html"><i>02</i>牌價</a><a href="c.html"><i>03</i>刻版</a><a href="d.html"><i>04</i>收運</a>
    </nav>
  </header>

  <main class="wrap">
    <div class="dateline">
      <h1 class="dl">今仔日這面：⋯⋯</h1>
      <p class="meta">窗號 ⋯<br>日期 ⋯<br>三塊版・八格・刷 <b>148</b> 張</p>
      <button class="btn tog" id="knife" type="button" aria-pressed="false">看刀路</button>
    </div>

    <div class="serial">
      <article class="pane" style="--i:0">
        <div class="fig"><svg class="art" viewBox="0 0 120 132">
          <g class="plate p-ink">…</g><g class="plate p-red">…</g></svg></div>
        <p class="no">01／08</p><p class="cap">押韻的一句。</p>
      </article>
      <!-- ×8 -->
    </div>
  </main>
</div>

<footer>…</footer>
<script>
document.getElementById('knife').addEventListener('click',function(){
  var on=document.body.classList.toggle('knife');
  this.setAttribute('aria-pressed',on?'true':'false');
  this.textContent=on?'看印樣':'看刀路';
});
</script></body></html>
```

---

## 十二、技術實作與相容性

本站以三項技術承載視覺，每一項都是「這個流派的特徵需要它」，不是「這個技術很酷」。
支援度於 2026-09-08 查證 MDN／caniuse／web-features，並記錄不支援時的具體 fallback 行為。

### 12.1 CSS Grid `subgrid`（C 版面與樣式層）

- **承載**：特徵 1 的連環格陣跨格對齊——八格的圖底線、格號、標語首行必須齊平，否則一張印刷品會散成八張卡片。
- **支援現況（查證 caniuse `css-subgrid` / web-features `subgrid`，2026-09-08）**：
  Chrome/Edge 117+（2023-09-12）、Firefox 71+（2019）、Safari 16+（2022）、Opera 103+、Samsung Internet 24+；
  全球覆蓋 >92%；**Baseline Widely available，2026-03-15 起**。
- **為什麼不用別的做法**：`align-items:end` 只能對齊最後一列；固定列高會在中文長短句下截字；
  用 JS 量高度會在字型載入前後跳動。這件事只有 subgrid 做得對。
- **Fallback**：`@supports not (grid-template-rows:subgrid)` 下，`.pane` 退為 `display:flex; flex-direction:column`，
  標語以 `margin-top:auto` 壓到底。八格全部可讀、順序不變、格線不變，僅失去跨格基線對齊。資訊零損失。

### 12.2 CSS `steps()` 逐格時間函數（B 動效與時間軸層）

- **承載**：全站四種動效的時間軸。手刷的東西沒有中間影格——ambient 的四張樣張（`steps(1)`）、
  input 的兩格切換（`steps(2)`）、transition 的五格上紙（`steps(5)`）、signature 掉島的六格落下（`steps(6)`）。
- **支援現況（查證 MDN《`steps()`》/《easing-function》）**：**Baseline Widely available**，
  Chrome 1+／Firefox 4+／Safari 3.1+／Edge 12+，2015 年 7 月前即跨瀏覽器；
  `jump-*` 關鍵字為後期新增，本站只用 `steps(n)` 的預設 `jump-end`，覆蓋率等同 CSS Animations 本身。
- **實作要點**：`animation-timing-function` 是**逐段**套用的。要得到「正好四個離散位置」，
  必須寫四段關鍵影格（0/25/50/75/100）搭 `steps(1)`，而不是一段搭 `steps(4)`（後者會在段內再切四份，看起來又變平滑了）。
- **Fallback**：無支援缺口。`prefers-reduced-motion: reduce` 下四種動效全部 `animation:none`，
  ambient 停在對位準的樣張、transition 直接是最終畫面、掉島改為 `visibility:hidden`（露出的仍是實心色版底）。

### 12.3 SVG `feMorphology`（A 渲染層）

- **承載**：特徵 3 的補漏白／透墨外擴。SVG 幾何畫的是**刀路**（刀走過的線）；
  `dilate 0.6` 之後畫面上的才是**印樣**（油墨溢出刀口以後的樣子）。關掉濾鏡＝看見刀路，這是本站的核心切換。
- **支援現況（查證 MDN《`<feMorphology>`》，2026-09-08）**：**Baseline Widely available，2015 年 7 月起跨瀏覽器**
  （Chrome 5+／Firefox 3+／Safari 6+／Edge 12+）。`SVGFEMorphologyElement` 各屬性同。
- **注意事項（實作時踩到的）**：
  1. 濾鏡會建立一個裁切區域。掉島動畫把島平移 300px 會被裁掉——所以掉島瞬間必須在該 `<g>` 上加 `.nofilter`。
  2. `radius` 不可過大：本站筆畫寬 12–16，`0.6` 讓兩色之間預留的 1.5px 紙縫收成約 0.3px；
     超過 1.2 會把相鄰兩塊版糊在一起，等於毀掉「留紙縫」這條規則。
  3. 濾鏡掛在**每張 SVG 一個頂層 `<g>`**，不是每個 `<path>`；24 張縮圖各掛一個濾鏡會明顯掉幀。
- **Fallback**：`filter` 無效時整條宣告被忽略，畫面退為刀路本身的幾何——線條略細 0.6，
  紙縫略寬 1.2px，**版面、可讀性、資訊完全不變**。不需要 `@supports`。

### 12.4 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（inline CSS/JS/SVG 全計，UTF-8） | 首頁 63.4 KB／牌價 57.9 KB／刻版 56.5 KB／收運 66.9 KB | ≤350 KB ✅ |
| 外部資源 | 只有 Google Fonts 兩支；零圖片、零音檔、零函式庫 | — |
| 首屏 JS | 型版引擎 + 渲染器 + 內容 ≈ 24 KB，首頁只跑一個 click 綁定與一次日期寫入 | ≤100 ms ✅ |
| 型版求解（刻版頁最重的一次計算） | 島連通性 union-find + 斷率：單次 <0.05 ms（Node 22 實測 20 萬次 ≈ 8.4 ms） | — |
| 動畫 | 只動 `transform` 與 `clip-path`，不觸發 layout；`getBoundingClientRect` 零次 | 60fps ✅ |

### 12.5 其他相容性

- `:focus-visible`、`aspect-ratio`、CSS 自訂屬性、`clip-path:inset()`、`transform-box:fill-box`：皆 Baseline widely available。
- `transform-box:fill-box` **必須明寫**在會旋轉的 SVG 元素上：`transform-box` 的初始值是 `view-box`，
  沒寫的話 `transform-origin:50% 50%` 會落在整張 SVG 的中心，掉島會繞著畫面中心甩出去。
- 無障礙：裝飾性 SVG 一律 `aria-hidden="true"`；承載資訊的 SVG 給 `role="img"` + `aria-label`；
  型版上的每一個橋位除了可點的 SVG 方塊外，另備一份 HTML checkbox 清單，鍵盤與螢幕閱讀器可完成完全相同的操作。
- 正文對比：墨 `#191510` 對紙 `#B9AB8D` = 7.9:1；深底 `#100D09` 上的 `#EDE6D4` = 16:1。朱版不做正文。
