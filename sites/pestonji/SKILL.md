---
name: bombay-gothic-revival
description: Gothic Revival in its Bombay strain — two-centred pointed arches built from discrete voussoirs, constructional polychromy laid as integer courses of basalt, Kurla buff and Porbandar limestone, cusped tracery in orders, and layout geometry solved in CSS trigonometry rather than hard-coded coordinates.
---

# 孟買哥德復興　Bombay Gothic Revival

> 一八四〇年代起的哥德復興（Gothic Revival）是一場「把中世紀的構法當成道德」的運動：
> A. W. N. Pugin 在《True Principles》裡主張裝飾必須從構造長出來，Ruskin 在《威尼斯之石》裡把
> 手工的不完美寫成美德，Butterfield 在 All Saints, Margaret Street（1859）把顏色直接砌進牆裡
> 而不是刷在牆上（constructional polychromy）。
>
> 本規格書取的是它的**孟買一脈**：一八六〇至一八八〇年代 Fort 區那一批——
> 孟買高等法院（1878, James Fuller）、拉賈拜鐘塔（1878, 依 George Gilbert Scott 設計）、
> 維多利亞終點站（1878–1887, F. W. Stevens）。它與英國本土的差別在**材料**：
> 本地玄武岩（藍灰、便宜、砌大面）、庫拉黃石（暖黃、砌拱圈與線腳）、
> 波爾班達石灰岩（近白、砌窗框與雕刻）、巴賽因紅砂岩，四種石一起砌，
> 於是「彩飾」不是一個設計選項，而是石料清單的必然結果。
>
> **一句話判準：**把首屏的文字全部遮掉，如果還看得見「兩段圓弧交出一個尖」與
> 「水平色帶是不同材料砌上去的」，就是這個風格。少了任何一項都不是。

---

## 一　設計哲學

1. **裝飾必須是構造。** 沒有一條線是「加上去好看的」。凸飾（boss）出現在肋交會的地方，
   因為那裡真的需要一塊料；尖頭飾（cusp）長在拱的弧內，因為那裡是石料最厚、可以刻掉的地方。
   凡是解釋不出結構理由的花樣，刪掉。
2. **承力的與不承力的必須看得出來。** 肋（rib）承力，所以它是實心的、有收分（taper）、
   有凸飾；蹼（web）不承力，所以它可以薄、可以是別的材料、可以是布。
   界面設計上就是：骨架用墨色實心，面板用石色平塗，兩者永不互換。
3. **顏色是砌上去的。** 任何一個顏色只能以**水平色帶**出現，帶高是「一皮」的整數倍。
   不存在「這裡我想要一點橘色」——只有「這一皮是磚紅的」。
4. **繁複度是層級。** 重要的開口被細分得更多層（第二階、第三階的窗格與葉飾），
   不重要的開口就是一道素拱。**放大、變色、加粗都不是哥德的強調法；細分才是。**
5. **垂直收束。** 所有線條往上收；水平線只由砌層承擔。畫面上不允許存在一條
   「為了分隔而畫的水平裝飾線」——那條線必須是一道石縫。

---

## 二　色彩系統

| 色 | hex | 用途 | 目標比例 |
|---|---|---|---|
| 玄武岩 basalt | `#48525A` | 全站唯一的大面積底色（牆） | 28% |
| 玄武岩暗皮 | `#333B42` | 陰面、台座、遮片、次級底 | 10% |
| 沒食子墨 gall ink | `#17140F` | 正文、全部規線與框（一律 3px 實線） | 16% |
| 波爾班達白石 | `#E7E0CE` | **所有長文的底**，元件面板 | 14% |
| 白石暗面 | `#D5CCB4` | 楔石的交替色、書口、次級面板 | 4% |
| 庫拉黃石 | `#C9A15C` | 拱圈楔石、表頭、線腳、現用態 | 12% |
| 庫拉暗 | `#A87F3F` | 砌層裡的黃帶、邊框 | 4% |
| 巴賽因磚紅 | `#9E3B27` | 砌層紅帶、緣線、重點 | 6% |
| 苦楝綠 | `#3D6B4A` | 極少量的第五色（標籤） | ≤3% |
| 鉛丹 minium | `#C4531E` | **唯一的警示與 focus 色**，絕不作背景 | ≤3% |
| 靛 indigo | `#24406E` | 連結、第二階窗格的玻璃 | ≤3% |
| 灰泥 mortar | `#A99B84` | 砌縫、表格分隔、次要文字 | 2% |

硬規則：

- **零純白、零純黑。** 最亮是 `#E7E0CE`，最暗是 `#17140F`。
- **零彩色漸層。** 唯一允許的漸層是**過渡為 0px 的硬停點色帶**（砌層）與
  **硬停點的 `conic-gradient`**（放射分區）。任何一個有混色過渡的漸層都是錯的。
- **零模糊陰影。** 需要厚度就用硬邊實色方塊：`box-shadow:5px 5px 0 rgba(23,20,15,.55)`。
  那是石的厚度，不是光。
- **零圓角超過 3px。**
- 長文只坐白石，不坐玄武岩（`#E7E0CE` 對 `#17140F` 的對比約 13:1；玄武岩對墨只有 2.6:1）。

```css
:root{
  --basalt:#48525A; --basalt-d:#333B42; --ink:#17140F;
  --porb:#E7E0CE; --porb-d:#D5CCB4;
  --kurla:#C9A15C; --kurla-d:#A87F3F;
  --bassein:#9E3B27; --neem:#3D6B4A;
  --minium:#C4531E; --indigo:#24406E; --mortar:#A99B84;
  --course:9px;            /* 一皮：全站所有色帶高度都是它的整數倍 */
}
```

---

## 三　字體系統

| 角色 | 字體 | 字重 | 用法 |
|---|---|---|---|
| 石刻題銘・標籤・按鈕 | `Cinzel` | 600 / 900 | 一律大寫，`letter-spacing:.09em–.22em` |
| 拉丁正文・數字 | `Spectral` | 400 / 600 / 400italic | 舊式數字 `font-variant-numeric:oldstyle-nums` |
| 漢字標題與正文 | `Noto Serif TC` | 400 / 700 / 900 | 標題 900、正文 400 |

- **不用等寬體。** 碑上刻的字沒有等寬體。需要對齊數字時用
  `font-variant-numeric:oldstyle-nums; white-space:nowrap`，不要 monospace。
  （這一條同時是去 AI 化的關鍵：mono 數字＋單色描邊是「工程製圖風」的招牌，不是哥德的。）
- **不用哥德黑體（blackletter）。** 孟買這一脈的題銘是碑體羅馬大寫，不是 Fraktur。
  用 Fraktur 會立刻掉進萬聖節與啤酒標的坑裡。
- 字級 scale：`11px（Cinzel 標籤）/ 13.5px（小字）/ 17px（正文）/ 19px（導言）/
  clamp(22px,2.6vw,30px)（h2）/ clamp(23px,3vw,34px)（行名）`；行高正文 1.75、標題 1.28。

```css
body{ font:400 17px/1.75 "Noto Serif TC","Spectral",Georgia,serif }
.cut  { font-family:"Cinzel",serif; font-weight:900; letter-spacing:.09em; text-transform:uppercase }
.cut-l{ font-family:"Cinzel",serif; font-weight:600; letter-spacing:.2em; font-size:12px;
        text-transform:uppercase }
td.num{ font-variant-numeric:oldstyle-nums; white-space:nowrap }
```

---

## 四　版面與網格

- **間（bay）是基本單位。** 版面橫向被扶壁切成間：導覽是四個間的柱廊，內容列是
  「1.35fr / 1fr」的不對稱兩間（長文在寬的那一間，圖版在窄的那一間），
  絕不用等寬三欄——等寬三欄沒有主次，不是哥德。
- **垂直節奏＝一皮 9px 的整數倍。** 所有色帶、頁尾層、分隔線的高度都是 9 的倍數。
- **零圓角、3px 實線分格。** 相鄰的格子共用邊：容器 `border:3px solid var(--ink)`、
  內部元素 `border-right:2px solid var(--ink)` 並讓容器背景是墨色，縫就是灰泥。
- **留白極少（horror vacui 的節制版）。** 空的地方要嘛是牆（砌層），要嘛是石板。
  沒有「什麼都沒有的白」。
- 斷點：`≤980px` 工作檯收成單欄；`≤900px` 兩間變一間、四張圖版變二×二；
  `≤560px` 柱廊四個間等寬撐滿一列（拱縮到 38px、英文副標隱藏）、石板 padding 減半。

---

## 五　本風格的 5 個不可省略特徵

### 特徵一　兩心尖拱（拿掉它就是羅馬式）

一道拱只要兩個數：跨距 `S` 與圓心偏移 `p`。兩個圓心都落在起拱線上、
距兩端各 `p·S`，半徑一律 `(1−p)·S`。`p=0.5` 是半圓（不是哥德）；
`p=0` 等邊尖拱；`p<0` 柳葉拱，**圓心退到跨距之外**。

```js
// 拱高 = (1−p)·S·sin(acos((0.5−p)/(1−p)))
function archD(x0, y0, S, p){          // y 向下的 SVG 座標，起拱線在 y0
  const R = S*(1-p), th = Math.acos((0.5-p)/(1-p));
  const apex = R*Math.sin(th);
  return `M${x0} ${y0}A${R} ${R} 0 0 1 ${x0+S/2} ${y0-apex}A${R} ${R} 0 0 1 ${x0+S} ${y0}`;
}
```

同一條式子也寫得進 CSS（本站的拱高就是這樣算的）：

```css
.arch{
  --span:250px; --p:-0.22;
  height:calc(var(--span) * (1 - var(--p)) * sin(acos((0.5 - var(--p)) / (1 - var(--p)))));
}
```

### 特徵二　構造性彩飾：顏色只能是水平砌層

顏色是**材料**，不是塗料。所有大面積色域一律是硬停點的水平色帶，帶高為一皮的整數倍。

```css
body{
  background:#48525A;
  background-image:repeating-linear-gradient(to bottom,
    #48525A 0,       #48525A calc(var(--course)*3),
    #A87F3F calc(var(--course)*3), #A87F3F calc(var(--course)*4),
    #333B42 calc(var(--course)*4), #333B42 calc(var(--course)*6),
    #7C2B1B calc(var(--course)*6), #7C2B1B calc(var(--course)*7));
}
```

拱圈的楔石另外交替兩種石色（voussoir alternation）：黃石／白石、黃石／白石⋯⋯
交替是**石料的交替**，所以必須是兩種明確的石色，不是同一色的深淺。

### 特徵三　曲線由楔形石砌成，石縫指向圓心

**本風格沒有平滑曲線。**任何一道弧都是 n 塊四點多邊形，每一塊的兩側縫都指向
它自己那半邊的圓心。判準：「放大任何一道拱，你數得出它由幾塊石頭砌成，
而且每一道縫延長出去都會交在起拱線上的同一點」。

```js
function voussoirs(x0, y0, S, p, n, w){      // w = 拱圈厚度
  const R = S*(1-p), cx = S*p, th = Math.acos((0.5-p)/(1-p)), out=[], half=Math.ceil(n/2);
  for (const side of [0,1]){
    const c  = side ? x0+cx : x0+S-cx;
    const a0 = side ? th : Math.PI, a1 = side ? 0 : Math.PI-th;
    for (let i=0;i<half;i++){
      const b=a0+(a1-a0)*(i/half), e=a0+(a1-a0)*((i+1)/half);
      out.push({ alt:(side?half+i:i)%2, d:'M'+[
        [c+R*Math.cos(b), y0-R*Math.sin(b)], [c+(R+w)*Math.cos(b), y0-(R+w)*Math.sin(b)],
        [c+(R+w)*Math.cos(e), y0-(R+w)*Math.sin(e)], [c+R*Math.cos(e), y0-R*Math.sin(e)],
      ].map(q=>q[0].toFixed(2)+' '+q[1].toFixed(2)).join('L')+'Z' });
    }
  }
  return out;   // 交替填 #C9A15C / #D5CCB4，一律 stroke:#17140F 1.5px
}
```

### 特徵四　尖頭飾與階數（強調靠細分，不靠放大）

每一個重要的開口，弧內必長出三葉／四葉的葉尖，並且可以再被石桿（mullion）
分成第二階、第三階。**現用／重要的狀態就是「被細分到更深一階」**，
不是變大、不是變色、不是加粗。葉飾只由圓弧構成，禁用貝茲自由曲線
（一八七〇年的工具是圓規與分規）。

```js
function quatrefoil(cx, cy, R){            // 四葉飾，只由 A（圓弧）指令構成
  const lobe = R*0.5, d=[];
  for (let i=0;i<4;i++){
    const a=(i*90-45)*Math.PI/180;
    const px=cx+Math.cos(a)*(R-lobe), py=cy+Math.sin(a)*(R-lobe);
    d.push(`M${px-lobe} ${py}A${lobe} ${lobe} 0 1 1 ${px+lobe} ${py}A${lobe} ${lobe} 0 1 1 ${px-lobe} ${py}`);
  }
  return d.join('');
}
```

```css
/* 第二階只在現用／hover 時出現；開口的外形完全沒有變 */
.bay .o2{ opacity:0; transform:translateY(8px);
          transition:opacity .22s steps(3), transform .22s steps(3) }
.bay.on .o2, .bay:hover .o2, .bay:focus-within .o2{ opacity:1; transform:none }
```

### 特徵五　肋與蹼：承力的是實心收分桿，不承力的是平塗面

細的東西一律是**會收分的實心桿件**（鑄鐵或石肋），不是髮絲線。
桿件兩端／中段有凸飾。面（蹼）一律平塗，且比桿件「薄」——
視覺上就是：桿件永遠壓在面上面。

```js
function ribMember(x1, y1, x2, y2, w1, w2){   // w1 根部半寬 > w2 端部半寬 = 收分
  const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L;
  return 'M'+[[x1+nx*w1,y1+ny*w1],[x2+nx*w2,y2+ny*w2],
              [x2-nx*w2,y2-ny*w2],[x1-nx*w1,y1-ny*w1]]
    .map(q=>q[0].toFixed(2)+' '+q[1].toFixed(2)).join('L')+'Z';
}
```

> **明文禁用：** 細線幾何線描（thin-lineart，`stroke-width:1` 的髮絲輪廓）、
> 半調網點、照片、`feTurbulence` 假質感、扁平化單色圖示、金屬漸層、任何發光。

---

## 六　元件配方

### 導覽：柱廊（arcade）＋階數現用態

```css
.arcade{ display:flex; border-top:3px solid var(--ink); background:var(--basalt-d) }
.bay{ flex:1 1 0; display:flex; flex-direction:column; align-items:center;
      padding:10px 6px 12px; border-right:2px solid var(--ink);
      transition:background .18s steps(3) }      /* 過渡一律 steps()：石頭不會滑 */
.bay:last-child{ border-right:0 }
.bay:hover{ background:#3b444b }
.bay.on{ background:var(--basalt) }
```
每個 `.bay` 裡是一個由 `voussoirs()` 砌出來的開口 SVG；現用的那一個多一組 `.o2`。

### 石板（所有長文的容器）

```css
.stone{ background:var(--porb); border:3px solid var(--ink); border-radius:2px;
        box-shadow:5px 5px 0 rgba(23,20,15,.55); padding:26px 30px 30px }
.stone.dark{ background:var(--basalt-d); color:var(--porb) }
```

### 按鈕

```css
.rowbtn{ font:600 13px/1 "Cinzel",serif; letter-spacing:.14em; text-transform:uppercase;
  padding:12px 18px; background:var(--kurla); color:var(--ink);
  border:3px solid var(--ink); border-radius:2px; cursor:pointer;
  box-shadow:4px 4px 0 rgba(23,20,15,.5) }
.rowbtn:hover{ background:var(--minium); color:var(--porb) }
```
按下不位移（石頭不會陷下去），只換色。

### 表格（砌層即列）

```css
th{ font-family:"Cinzel",serif; font-weight:600; font-size:11px; letter-spacing:.12em;
    text-transform:uppercase; background:var(--kurla); border-bottom:2px solid var(--ink) }
td,th{ text-align:left; padding:8px 10px; border-bottom:1px solid var(--mortar) }
tbody tr:nth-child(2n){ background:rgba(169,155,132,.22) }   /* 隔皮換色 */
```

### 表單與 focus

```css
:focus-visible{ outline:3px solid var(--minium); outline-offset:2px }
input,select,textarea{ background:var(--porb); border:3px solid var(--ink); border-radius:2px;
  padding:9px 11px; font:inherit; color:var(--ink) }
```

### 頁尾（三層砌上去）

```html
<footer class="foot">
  <div class="foot-band"></div>          <!-- 一皮庫拉黃 -->
  <div class="foot-band b2"></div>       <!-- 一皮巴賽因紅 -->
  <div class="foot-in">…</div>           <!-- 玄武岩暗皮 -->
</footer>
```

---

## 七　動效規則（四種，缺一不可）

| 類 | 名 | 觸發 | duration / easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **拱下的影** arcade shadow | 無，永遠在跑 | 96s linear infinite | 動畫關閉，影固定在正午位（`--sun:0deg`），畫面不變少 |
| input 輸入 | **推彈子** the runner | pointerdown / drag / 方向鍵 | 無過渡，逐帧跟手（<16ms） | 保留（本來就沒有補間） |
| transition 轉場 | **起拱揭幕** springing wipe | 切換面板 | `--reveal` 0→1，.5s `cubic-bezier(.22,.9,.2,1)` | 1ms，直接換面 |
| signature 簽名 | **過中點起拱** arch-springing | 撐開傘 | 1.5s，每骨門檻 30°+i·1.55° | 十六片同時變成拱，無過衝、無錯開 |

```css
/* 環境：硬邊的影，位置由 tan(--sun) 算出來。零模糊。 */
@property --sun{ syntax:'<angle>'; inherits:true; initial-value:-34deg }
.shadowband i{ position:absolute; top:-10%; bottom:-10%; width:34%;
  background:rgba(23,20,15,.30);
  transform:skewX(-14deg) translateX(calc(tan(var(--sun)) * 240px));
  animation:sun 96s linear infinite }
@keyframes sun{ from{ --sun:-34deg } to{ --sun:34deg } }

/* 轉場：由起拱線往上推出來，邊緣騎一道 4px 鉛丹硬邊 */
@property --reveal{ syntax:'<number>'; inherits:false; initial-value:1 }
.pane{ clip-path:inset(calc((1 - var(--reveal)) * 100%) 0 0 0);
       transition:--reveal .5s cubic-bezier(.22,.9,.2,1) }
.pane::before{ content:""; position:absolute; left:0; right:0; height:4px;
  background:var(--minium); top:calc((1 - var(--reveal)) * 100%);
  opacity:calc(1 - var(--reveal)) }

@media (prefers-reduced-motion:reduce){
  *{ animation-duration:1ms !important; animation-iteration-count:1 !important;
     transition-duration:1ms !important }
  .shadowband i{ animation:none; --sun:0deg }
}
```

**簽名動效的做法（本風格獨有）：**一組放射的肋各有自己的「過中點」門檻。
角度越過門檻的那一瞬間，那一片蹼的外緣**由直弦換成兩心尖拱**，
並先過衝到 1.42 倍鼓度、115ms 後才收回正常鼓度。它不是淡入、不是縮放——
是一段幾何被換掉。實作是換 `d`，不是換 `opacity`。

```js
if (open >= DEAD[i] && !sprung[i]) {           // DEAD[i] = 30 + i*1.55
  sprung[i] = true;
  lay(i, OVERSHOOT);                            // 鼓度 ×1.42
  setTimeout(() => sprung[i] && lay(i, ARCH), 115);
}
```

**一切過渡一律用 `steps()` 或硬邊。**石頭不會滑；`ease-in-out` 的柔順感是別的風格的東西。
唯一允許的連續 easing 是揭幕與起拱這兩支（它們模擬的是石料受力的彈性）。

---

## 八　插畫與圖像風格：拱石砌構（arch-course）

全站零外部圖片。所有圖像由三個原語輸出，**不允許第四種**：

1. **楔形石 voussoir** — 曲線一律砌成離散的四點多邊形，縫指向圓心，兩石色交替。
2. **砌層 course** — 面積一律是水平色帶，帶高為一皮的整數倍，豎縫半錯（stretcher bond），
   每一皮下緣壓一道灰泥線。
3. **鑄鐵桿件 member** — 細的東西是會收分的實心桿，端部與中段有凸飾（trefoil／quatrefoil）。

判準：**「把顏色抽掉，每一條曲線都還數得出它由幾塊石頭砌成，而且每一道石縫都指向那條弧的圓心。」**

與近親技法的差別（做新站時務必辨明）：

- 與**細線幾何線描**：本技法的形沒有輪廓線，形的邊界是**石塊面**的邊界。
- 與**等角視圖／藍晒圖**：那是投影與線型的語意；本技法沒有圖號、沒有量表、沒有 mono 數字，
  它畫的是「這個東西是用幾塊料砌起來的」。
- 與**交織帶（島嶼抄本）**：那是帶子的重疊與連通；本技法的石塊互不重疊，它們是**鄰接**的，
  而且有一個明確的受力方向。
- 與**鉛條分割彩窗**：那是把平面分割成鄰接色域、顏色來自透射光；本技法的顏色來自石料本身，
  沒有光穿過任何東西。

---

## 九　Logo 與 Favicon 設計指南

- **Logo ＝ 一道兩心尖拱 ＋ 拱下的一個放射物件。**拱由 12 塊交替色楔石砌成，
  下緣壓三道砌層（玄武岩／庫拉黃／玄武岩）。拱下那個物件用來說明行業，
  但必須是放射的、有中心凸飾的——這樣它與拱共用同一套幾何。
- 尺寸：`144 × 152` 的 viewBox，最小可用 60px 寬（此時楔石縫仍要看得見；看不見就是石太多，減到 8 塊）。
- **Favicon ＝ 同一支引擎的 32×32 最小輸出：**玄武岩底、一道白石尖拱、拱內一個磚紅三角、
  一根墨色中軸、一顆黃銅頂珠、底下兩皮砌層。
  一律 inline SVG data URI 寫在 `<head>`，不用 .ico、不用外部檔。
- **禁止**：漸層、發光、圓角圖章、任何文字縮在 32px 裡。

---

## 十　Do & Don't

**Do**

- 每一道弧都砌成楔石，縫指向圓心。
- 顏色只以整數皮數的水平色帶出現。
- 強調用「細分到更深一階」，不用放大或高亮。
- 長文一律坐白石板，板有 3px 墨框與硬邊落影。
- 過渡用 `steps()`；需要厚度用硬邊實色方塊。
- 版面用不對稱的「間」，比例 1.35:1。

**Don't**

- **不要半圓拱。**（那是羅馬式，一眼就露。）
- **不要 blackletter。**
- 不要等寬體、不要 mono 數字、不要圖號角標與量表——那是「工程製圖風」不是哥德。
- 不要模糊陰影、不要圓角 >3px、不要彩色漸層、不要發光。
- 不要把顏色當塗料用（「這個按鈕我想要綠色」）。顏色必須是某一種石。
- 不要置中的「大標＋副標＋兩顆按鈕＋三張圓角卡片」。
- 不要紫藍漸層、不要 Lorem ipsum、不要 emoji 當 icon、不要「EST. 19xx」徽章。
- 不要為了對稱而把兩欄做成等寬。哥德的立面有主間與次間。

---

## 十一　技術實作與相容性

### 11.1 核心技術三項與它們各自承載什麼

| 層 | 技術 | 在本風格裡承載什麼 |
|---|---|---|
| C 版面與樣式 | **CSS 三角函數 `sin()` `cos()` `acos()` `tan()`** | 放射版面的全部幾何：每一片的張角與標籤落點、拱高、開合時的收縮量、滑桿上滑塊的位置。改 `--ribs` 不必動一行 JavaScript。 |
| A 渲染 | **`conic-gradient` 硬停點扇區** | 放射分區的顏色。十六片布＝一個 gradient 字串的十六段，沒有十六個元素、沒有十六個 path。 |
| E 資料與生成 | **`SVGGeometryElement.getTotalLength()` / `getPointAtLength()`** | 沿拱的弧長取樣：楔石接縫、尖頭飾與縫線的落點由弧長參數求得，而不是硬寫座標；點擊位置也靠它投影回弧長參數。 |

### 11.2 支援現況（查證日 2026-09-15）

- **CSS 三角函數（`sin/cos/tan/asin/acos/atan/atan2`）** — Baseline **Widely available**，
  自 2025-09-13 起；Chrome 111（2023-03-07）、Edge 111、Firefox 108（2022-12-13）、
  Safari 15.4（2022-03-14）。列入 Interop 2023。
  查證來源：Web Platform Features Explorer `trig-functions`、MDN `Web/CSS/Reference/Values/sin`。
  **注意事項：** `sin()` 吃角度、吐純數，所以要乘長度才是長度：
  `calc(cos(var(--i) * 360deg / var(--ribs)) * var(--lr))`。
  自訂屬性要參與 `calc` 的除法，值必須解析成純數（`--ribs:16`）；
  若要讓角度平滑補間，必須用 `@property` 把它註冊成 `<angle>`。
- **`conic-gradient()`** — Baseline **Widely available**，自 2023-04 起；
  Chrome 69、Edge 79、Firefox 83、Safari 12.1（iOS 12.2）。查證來源：MDN `conic-gradient()`。
  **本風格只用它的硬停點形式**（相鄰兩段的停點完全相等），所以不會出現扇區之間的混色。
- **`getTotalLength()` / `getPointAtLength()`** — 全瀏覽器自 2020-01 起可用。
  查證來源：MDN `SVGGeometryElement/getTotalLength`、`SVGGeometryElement/getPointAtLength`。
  **注意事項：** MDN 明載這兩個方法**實務上只在 `<path>` 上可靠**
  （SVG 2 把它們搬到 `SVGGeometryElement`，但其他形狀元素的支援不齊）。
  所以：**要取樣就先把形狀寫成 `<path>`。**
- **`@property`（附註，非核心，用於角度補間）** — Chrome 85、Safari 16.4、Firefox 128。
  未註冊時自訂屬性仍會做 token 替換，所以**版面照樣算得出來**，只有補間退化成瞬間跳值。

### 11.3 不支援時的 fallback 具體行為

| 缺什麼 | 實際發生什麼 | 資訊有損失嗎 |
|---|---|---|
| CSS 三角函數 | 含 `sin()` 的 `transform` / `height` 宣告整條無效，放射排列塌回各元素的預設位置（左上重疊）。**因此凡是承載資訊的文字都不得只靠三角函數定位**——本站的十六件事同時以靜態 `<ol>` 存在。 | 否 |
| `conic-gradient` | `background` 宣告無效，退回元素的底色（玄武岩暗皮），骨架與拱的 SVG 完全不受影響。 | 否（顏色是裝飾，品項名與價目都在表格裡） |
| `getPointAtLength` | 以 `typeof el.getPointAtLength === 'function'` 偵測；缺少時改用建置階段就算好的座標陣列（本站的靜態 SVG 已經內含全部座標）。 | 否 |
| `@property` | 角度不補間，直接跳值：影會一格一格跳、揭幕變成瞬間換面。 | 否 |
| JavaScript 全關 | 四頁的全部文字、表格、價目、十六件營業事實與整面傘的骨與拱都是建置階段輸出的靜態 HTML／SVG。只有「推彈子」與「上蒙皮檯」不能操作，並以 `<noscript>` 明說。 | 否 |

### 11.4 效能預算（實測）

| 項 | 門檻 | 本站實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | ≤350 KB | 首頁 83 KB、骨 53 KB、蒙皮 75 KB、修 38 KB |
| 首屏 JS 執行 | ≤100 ms | 兩支 IIFE，無 DOM 建構迴圈超過 16 個元素；建置階段已把 SVG 寫死 |
| 主要動畫 | 60 fps | 環境影與開合只改 `transform` 與 `background`（單一 gradient 字串）；簽名動效每帧最多改 3 個 `d` 屬性，不讀取版面，無 layout thrashing |
| 幾何驗證 | — | 拱的弧長以 2000 段取樣與解析式 `2Rθ` 吻合到小數三位（550.191 / 550.191） |

**效能守則：**改放射版面時只改自訂屬性（`--open`、`--ribs`），
不要逐元素寫 `style.transform`；顏色只改 `background` 那一個字串。

---

## 十二　頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>行名　頁名</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D…%3E">   <!-- 原創 inline SVG -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Spectral:ital,wght@0,400;0,600;1,400&family=Noto+Serif+TC:wght@400;700;900&display=swap">
<style>
@property --sun{ syntax:'<angle>'; inherits:true; initial-value:-34deg }
@property --reveal{ syntax:'<number>'; inherits:false; initial-value:1 }
:root{ --basalt:#48525A; --basalt-d:#333B42; --ink:#17140F; --porb:#E7E0CE;
       --kurla:#C9A15C; --kurla-d:#A87F3F; --bassein:#9E3B27; --minium:#C4531E;
       --indigo:#24406E; --mortar:#A99B84; --course:9px }
body{ margin:0; color:var(--ink); background:var(--basalt);
  font:400 17px/1.75 "Noto Serif TC","Spectral",Georgia,serif;
  background-image:repeating-linear-gradient(to bottom,
    var(--basalt) 0, var(--basalt) calc(var(--course)*3),
    var(--kurla-d) calc(var(--course)*3), var(--kurla-d) calc(var(--course)*4),
    var(--basalt-d) calc(var(--course)*4), var(--basalt-d) calc(var(--course)*6),
    #7C2B1B calc(var(--course)*6), #7C2B1B calc(var(--course)*7)) }
.wrap{ max-width:1180px; margin:0 auto; padding:0 22px }
.stone{ background:var(--porb); border:3px solid var(--ink); border-radius:2px;
        box-shadow:5px 5px 0 rgba(23,20,15,.55); padding:26px 30px 30px }
</style>
</head>
<body>

<header class="mast">
  <div class="shadowband" aria-hidden="true"><i></i></div>   <!-- ambient -->
  <div class="wrap"><div class="mast-top">
    <a class="mark" href="index.html"><!-- logo SVG --><span>
      <span class="t1">行名</span><br><span class="t2 cut-l">ROMAN CAPITALS SUBTITLE</span>
    </span></a>
    <div class="mast-fact">地址<br><b>電話</b>　營業時間</div>
  </div></div>
  <nav class="arcade" aria-label="四頁">
    <a class="bay on" href="index.html" aria-current="page">
      <!-- voussoirs() 砌出來的開口 + .o2 第二階窗格 -->
      <span class="bay-zh">頁名</span><span class="bay-en cut-l">PAGE</span>
    </a>
    <!-- 其餘三個 .bay，沒有 .o2 -->
  </nav>
</header>

<main class="wrap">
  <section>
    <div class="sect-head"><span class="n cut">I</span><h2>章名</h2></div>
    <div class="grid2">                      <!-- 1.35fr / 1fr 的主間與次間 -->
      <div class="stone">長文一律坐白石。</div>
      <figure class="plate apw">
        <!-- archPlate()：楔石拱＋圓心標＋起拱線＋砌層 -->
        <figcaption>圖說。</figcaption>
      </figure>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="foot-band"></div><div class="foot-band b2"></div>
  <div class="foot-in"><div class="wrap">…　<p class="fict">虛構聲明。</p></div></div>
</footer>
</body>
</html>
```

---

*本規格書由 **Claude Opus 5 · 排程 Agent** 整理（2026-09-15）。
範例站：`sites/pestonji/`（孟買 Fort 區的洋傘行 × 哥德復興・Bombay Gothic）。
風格與內容分離：本規格不綁定產業，把它交給任何 AI，配上別的產業，就會長出同一個風格的新站。*
