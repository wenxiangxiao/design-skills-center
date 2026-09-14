---
name: insular-illumination
description: Insular illumination (Book of Kells / Lindisfarne / Durrow) rebuilt as a web style — constant-width interlace with never-broken over-under alternation, compass-arc spirals, zoomorphic band terminals, red-dot outlining with diminuendo initials, and flat mineral pigment on vellum.
---

# 島嶼抄本 Insular Illumination

> 七至九世紀，愛爾蘭與諾森布里亞的修道院繕寫室。《杜羅之書》（Book of Durrow, c.680）、
> 《林迪斯法恩福音書》（Lindisfarne Gospels, c.700）、《凱爾經》（Book of Kells, c.800）；
> 同一套語彙也長在金工上——塔拉胸針（Tara Brooch, 8c）、阿爾達聖爵（Ardagh Chalice）。
> 本 SKILL 只描述這一路的視覺語言，不綁定產業。

---

## 一、設計哲學

島嶼藝術是**構成法**，不是風格氣氛。它的每一個圖形都可以被一句規則寫完，
而規則被違反的地方，一個受過訓練的眼睛立刻會看出來。因此做這一路的網站，
判準不是「看起來夠不夠凱爾特」，而是三件事：

1. **帶子接得通嗎**——每一條交織帶都要有頭有尾（或首尾相接成環），不能走到一半消失。
2. **上下交替了嗎**——同一條帶子沿途一律上、下、上、下，沒有一次例外。
3. **顏色是平塗的嗎**——沒有漸層、沒有明暗、沒有投影；顏色與顏色之間永遠隔著一道墨線。

它是「滿」的（horror vacui），但滿不等於亂：版面先被墨線切成格，每一格只放一族紋樣，
格與格不相通。讀者的動線由**格**決定，不由捲軸決定。

**這一路不做的事**：透視、光影、金屬質感、發光、圓角卡片、模糊陰影、
把「凱爾特」當成一種可以隨手撒的裝飾。沒有構成法的花紋，不上板。

---

## 二、本風格的 5 個不可省略特徵

> 每一項都是「拿掉它就不是這個風格了」的程度。片段可直接複製。

### 特徵 1　等寬交織帶，與從不例外的上下交替

帶子全版同寬，兩側各一道墨廓。在上的完整通過；在下的**退開一個缺口**——
上下是把線真的斷開畫出來的，不是用陰影演的。

構成法（可直接實作）：格點 `(x,y)` 取 `x+y` 為偶數，帶子以 `(±1,±1)` 對角行走。
`x,y` 同為偶數者稱主格點，同為奇數者稱次格點。**主格點上「／向」在上，次格點上「＼向」在上。**
因為每一步必然在主／次格點之間交替，這條純局部規則自動保證全域交替——
不必回頭檢查，畫上去就對。

```css
/* 兩層畫法：先墨廓、後帶色。缺口讓上面那條的墨廓穿過去 */
.knot .bc{ fill:none; stroke:var(--ink);  stroke-linecap:butt; stroke-linejoin:round }
.knot .bf{ fill:none; stroke:var(--band); stroke-linecap:butt; stroke-linejoin:round }
/* 用法：<g stroke-width="25">…墨廓…</g><g stroke-width="21">…帶色…</g>
   帶寬 bw 與墨廓厚度 c 的關係固定：outline = bw + 2c，c 取 2–3px
   在下的格點，兩端各退 gap = bw/2 + c + 1 */
```

```js
// 缺口：把一條帶子切成「在該格點在上（或轉彎）」的連續段
function segments(cord, s, ox, oy, gap){
  var segs=[], cur=[pt(cord.pts[0],s,ox,oy)];
  for(var i=1;i<cord.pts.length;i++){
    var here=pt(cord.pts[i],s,ox,oy),
        under=(i<cord.pts.length-1)&&(cord.over[i-1]===false);
    if(under){
      var din=cord.dirs[i-1], dout=cord.dirs[i];
      cur.push([here[0]-din[0]/Math.SQRT2*gap, here[1]-din[1]/Math.SQRT2*gap]);
      segs.push(cur);
      cur=[[here[0]+dout[0]/Math.SQRT2*gap, here[1]+dout[1]/Math.SQRT2*gap]];
    } else cur.push(here);
  }
  segs.push(cur); return segs;
}
```

**驗收**：隨便指一條帶子，從頭走到尾，上下必須嚴格交替；任何一段都不能憑空消失。

---

### 特徵 2　只有圓弧的螺旋：三曲腿、喇叭口、盾形

八世紀的人手上只有圓規與分規。螺旋是一段一段**半徑遞減的圓弧**接起來的，
接點的切線要對得上；盾形（pelta）是三段圓弧——一個大半圓加兩個反向小半圓。
用貝茲曲線隨手拉的漩渦一眼認得出來：它太順了，順到沒有手。

```js
// 螺旋：每 90° 換一次半徑，全部用 <path> 的 A（圓弧）指令
function spiral(cx,cy,r,turns,dir,step){
  var n=Math.round(turns*4), rr=r, ang=dir>0?0:Math.PI,
      s='M'+(cx+rr*Math.cos(ang))+' '+(cy+rr*Math.sin(ang));
  for(var i=0;i<n;i++){
    var nr=Math.max(rr-step,r*0.06), na=ang+dir*Math.PI/2;
    s+='A'+((rr+nr)/2)+' '+((rr+nr)/2)+' 0 0 '+(dir>0?1:0)+' '
      +(cx+nr*Math.cos(na))+' '+(cy+nr*Math.sin(na));
    rr=nr; ang=na; if(rr<=r*0.07) break;
  }
  return s;
}
// 盾形 pelta
function pelta(cx,cy,r){
  return 'M'+(cx-r)+' '+cy+'A'+r+' '+r+' 0 0 1 '+(cx+r)+' '+cy
        +'A'+(r/2)+' '+(r/2)+' 0 0 1 '+cx+' '+cy
        +'A'+(r/2)+' '+(r/2)+' 0 0 0 '+(cx-r)+' '+cy+'Z';
}
```

```css
.knot .sp,.knot .trumpet{ fill:none; stroke:var(--ink); stroke-width:3; stroke-linecap:round }
```

**硬規則**：一格之內要嘛是帶、要嘛是盤，不會有一條帶子中途變成螺旋。要接，用獸首接。

---

### 特徵 3　帶端長出頭來（獸首收尾）

獸首不是貼上去的圖案，是那條帶子本身的收尾：吻部由帶寬張開，一顆眼點，
耳上的髮結（lappet）再往回長成帶。**所有的頭都必須長在帶端上**——
在帶子中間畫一顆頭，那條帶就斷了。

矩形板的四個角是帶子折返的地方，也就是四個帶端，所以**一面矩形板正好收四顆頭**。
這不是裝飾上的選擇，是幾何逼出來的結果。

```js
function beast(x,y,dx,dy,w){                    // w = 帶寬
  var a=Math.atan2(dy,dx), L=w*2.35, cs=Math.cos(a), sn=Math.sin(a);
  function P(fx,fy){ return [x+fx*cs-fy*sn, y+fx*sn+fy*cs]; }
  return '<path class="beast" d="M'+P(0,-w/2)+'Q'+P(L*.30,-w*1.02)+' '+P(L*.62,-w*.86)
       + 'L'+P(L,-w*.20)+'Q'+P(L*.74,0)+' '+P(L,w*.20)
       + 'L'+P(L*.62,w*.86)+'Q'+P(L*.30,w*1.02)+' '+P(0,w/2)+'Z"/>'
       + '<circle class="beast-eye" cx="'+P(L*.30,-w*.18)[0]+'" cy="'+P(L*.30,-w*.18)[1]
       + '" r="'+(w*.19)+'"/>';
}
```

```css
.knot .beast{ fill:var(--band); stroke:var(--ink); stroke-width:2; stroke-linejoin:round }
.knot .beast-eye{ fill:var(--ink) }
.knot .beast-lappet{ fill:none; stroke:var(--ink); stroke-width:2; stroke-linecap:round }
```

咬合（biting）允許：一顆頭可以咬住另一條經過的帶。**咬不等於接**——它們仍是兩條。

---

### 特徵 4　朱點輪廓與遞減首字

母題外圍排一圈鉛丹紅的**單顆圓點**：不是虛線、不是點狀邊框，是一顆一顆點上去的，
所以大小會有微差、間距會呼吸。點的作用是把母題從底材「提」起來——
它取代了陰影，這一路沒有陰影。

**遞減（diminuendo）**：一段的頭一個字奇大，第二個小一截，第三、四個再小，
四到五個字之後回到內文字級。它是版面的入口，不是裝飾。

```css
.dim .d1{font-size:3.5em; float:left; line-height:.82; margin:.04em .12em 0 0; color:var(--minium)}
.dim .d2{font-size:1.85em}
.dim .d3{font-size:1.42em}
.dim .d4{font-size:1.16em}
.dim .d5{font-size:1.02em}

/* 朱點：一顆一顆點上去，繞完一圈重來 */
@keyframes rub{0%,4%{opacity:0}9%{opacity:1}78%{opacity:1}92%,100%{opacity:0}}
.rdot{fill:var(--minium)}
.rdot.ani{animation:rub 5.4s linear infinite; animation-delay:calc(var(--i)*.115s)}
```

```js
function ringDots(cx,cy,r,n){ var a=[];
  for(var i=0;i<n;i++){ var t=i/n*Math.PI*2; a.push([cx+r*Math.cos(t), cy+r*Math.sin(t)]); }
  return a; }
```

**硬規則**：朱點只用鉛丹紅，永遠是實心正圓，永遠不作背景。

---

### 特徵 5　滿版分格、零透視、礦物平塗（而且沒有金箔）

版面先被墨線切成格；每一格一族紋樣；格與格不相通。
顏色是**不透明礦物**，一塊一塊平塗，邊界永遠是一道沒食子墨線。

**關於金**：《凱爾經》全書未使用金箔——看起來像金的地方是**雌黃**
（orpiment，三硫化二砷），一種亮黃礦物顏料。《林迪斯法恩福音書》確有少量金，
但島嶼藝術主體的「金」是雌黃。所以這一路**沒有金屬質感、沒有光澤漸層**：雌黃是啞的，它只是很黃。

```css
.panel{ border:2px solid var(--ink); background:var(--vellum); container-type:inline-size }
.panel + .panel{ border-top:none }                /* 格與格共邊，不留縫 */
.panel-h{ border-bottom:2px solid var(--ink); background:var(--chalk);
          font-family:"Uncial Antiqua",serif; font-size:clamp(19px,3.4cqi,30px);
          padding:.34em .6em; display:flex; gap:.6em; align-items:baseline; flex-wrap:wrap }
/* 需要厚度時用硬邊實色方塊，不要 blur */
.btn{ border:2px solid var(--ink); box-shadow:3px 3px 0 var(--ink); border-radius:0 }
.btn:active{ transform:translate(3px,3px); box-shadow:0 0 0 var(--ink) }
```

**驗收**：把整站截圖轉成灰階——層級應該完全靠明度與格線成立；
任何地方出現柔邊、光暈、金屬反射或圓角 > 3px，就不是這一路。

---

## 三、色彩系統

底色只有一個：犢皮。其餘六色是礦物與植物顏料，各有固定職務，不互換。

| 色 | hex | 來源 | 用途 | 比例 |
|---|---|---|---|---|
| 犢皮（肉面） | `#E8DCC0` | 小牛皮 | **唯一大面積底色**，永遠帶毛孔與纖維，不存在平塗 | 34% |
| 犢皮（毛面） | `#D9C9A4` | 同上，較黃 | 導覽帶、次級格底 | 6% |
| 沒食子墨 | `#23190F` | 橡癭＋鐵鹽 | 全部輪廓、規線、正文 | 24% |
| 雌黃 | `#DFA61C` | 三硫化二砷 | 主帶、標題底、hover；本路數的「金」 | 13% |
| 銅綠 | `#37735D` | 銅＋醋酸 | 第二條帶、確認狀態 | 9% |
| 鉛丹 | `#C04A28` | 焙鉛 | 朱點、首字、警示；**絕不作背景** | 9% |
| 菘藍 | `#2A4877` | Isatis tinctoria | 第三條帶、focus 圈 | 4% |
| 地衣紫 | `#6A3D69` | 地衣 turnsole／orchil | 第四條帶，只在帶數多時出現 | 2% |
| 白堊 | `#F4EEDF` | 碳酸鈣 | 格底提亮，面積 < 3% | 2% |

```css
:root{
  --vellum:#E8DCC0; --vellum-hair:#D9C9A4; --chalk:#F4EEDF;
  --ink:#23190F; --ink-soft:#5A4A33;
  --orpiment:#DFA61C; --verdigris:#37735D; --minium:#C04A28;
  --woad:#2A4877; --folium:#6A3D69;
  --band:var(--orpiment); --rule:2px solid var(--ink);
}
/* 犢皮底：毛孔與纖維。硬邊、週期、絕不是漸層雲霧 */
body{ background:var(--vellum); background-image:
  radial-gradient(circle at 2px 2px, rgba(90,74,51,.115) .9px, transparent 1.1px),
  radial-gradient(circle at 9px 14px, rgba(90,74,51,.07) .8px, transparent 1px),
  repeating-linear-gradient(92deg, rgba(120,100,70,.045) 0 1px, transparent 1px 7px);
  background-size:19px 19px, 23px 23px, auto; }
```

**禁止**：純白 `#FFF`、純黑 `#000`、任何色彩漸層、任何 `filter: blur()`、金屬漸層。

---

## 四、字體系統

| 角色 | 字體 | 來源 | 設定 |
|---|---|---|---|
| 標題・行號・遞減首字 | **Uncial Antiqua** | Google Fonts（單一字重 400） | `letter-spacing:.01em`、`line-height:1.12` |
| 拉丁文內文・數字・標籤 | **EB Garamond** | Google Fonts 400/600/italic | 標籤 `letter-spacing:.2em; text-transform:uppercase` |
| 中文內文 | **Noto Serif TC** 400/700/900 | Google Fonts | `line-height:1.66` |

Uncial Antiqua 是安色爾／島嶼書體的當代重繪，用它是因為**島嶼大寫體是這一路的本體**，
不是為了「中世紀感」。它只用在標題與首字：它的小字級可讀性不足，正文一律交給襯線體。

字級階（16px 基準）：

```
內文 17px / 1.66      次要 14–15px（--ink-soft）
h3   19–20px          h2   clamp(19px, 3.4cqi, 30px)   ← 用 cqi，隨「格」不隨視窗
遞減 3.5em → 1.85em → 1.42em → 1.16em → 1.02em → 1em
標籤 12–13px, letter-spacing .14–.22em, uppercase
```

數字一律 `font-variant-numeric: tabular-nums`。

---

## 五、版面與網格

1. **先分格，再放內容。** 整頁是一疊 `.panel`，彼此共用邊線（`.panel + .panel{border-top:none}`），
   不留縫、不留圓角、不投影。
2. **標題列與內容列分開**：`.panel-h`（白堊底＋墨線）＋ `.panel-b`（犢皮底）。
3. **格內二分**用 `.grid2`，分隔線是 2px 實線而不是留白。
4. **字級隨格不隨視窗**：`.panel` 設 `container-type:inline-size`，標題與內距用 `cqi`。
   同一個元件放在寬格與窄格裡是不同的大小——一面結板在名片上與在海報上本來就不是同一面板。
5. **地毯頁（carpet page）開場**：整頁純裝飾，資訊編織在框格裡，**由外往內讀**。
   外圈是帶，第二圈是事實，中心是名。不要在這裡放「大標＋副標＋兩顆按鈕」。
6. 留白規則：格內 `clamp(14px, 2.6cqi, 26px)`；格與格之間 **0**。留白在格裡，不在格外。

```css
.carpet-grid{ display:grid; grid-template-columns:repeat(4,1fr); border:2px solid var(--ink) }
.carpet-grid>*{ border:1px solid var(--ink); display:flex; flex-direction:column;
                justify-content:center; align-items:center; text-align:center }
.carpet-grid .mid{ grid-column:2/4; grid-row:2/4; background:var(--chalk); position:relative }
@media (max-width:700px){
  .carpet-grid{ grid-template-columns:repeat(2,1fr) }
  .carpet-grid .cnr{ display:none }
  .carpet-grid .mid{ grid-column:1/3; grid-row:1/2; order:-1 }
}
```

---

## 六、元件配方

**導覽（織入 woven-through）**：導覽是一條橫貫的織帶，四頁是帶上的四段。
現用頁那一段**沒有隔**，所以它與整條帶是同一個連通分量；其餘三段在自己兩側各上一道隔，
各被關成一個閉環。現用狀態是一次連通分量查詢，不是一個樣式。

```js
// 非現用的三段，在自己兩側各上一道直隔
for (var k=0;k<4;k++){ if(k===cur) continue;
  [8*k+1, 8*k+7].forEach(function(cx){
    for(var y=0;y<=Y;y++) if((cx+y)%2===0) breaks[cx+','+y]='V'; }); }
```

**按鈕**：白堊底、2px 墨框、`box-shadow:3px 3px 0 var(--ink)`（硬邊，那是厚度不是陰影）；
hover 轉雌黃；active 位移 3px 並收掉厚度；按下狀態 `aria-pressed="true"` 轉銅綠＋白堊字。

**表格**：1px 墨格線、表頭毛面犢皮底＋12–13px uppercase 標籤、數字欄右對齊 tabular-nums。

**卡片**：沒有卡片。要分區就分格。

**分隔線**：`.rule-dots` —— 一條 1px 墨線，底下一排 13px 週期的朱點。

```css
.rule-dots{ height:13px; border-top:1px solid var(--ink); margin:14px 0; position:relative }
.rule-dots::after{ content:""; position:absolute; inset:4px 0 auto 0; height:5px;
  background-image:radial-gradient(circle at 3px 2.5px, var(--minium) 2px, transparent 2.2px);
  background-size:13px 5px }
```

**頁尾**：白堊底、墨線上框、三欄（地點／頁／人）。

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可。全部附 `prefers-reduced-motion` 降級，
且降級後資訊零損失。

| 類 | 做什麼 | 觸發 | 時值／緩動 |
|---|---|---|---|
| ambient 環境 | **點朱**：母題外圈的朱點一顆一顆亮起來，繞完一圈重來 | 無 | 5.4s linear infinite，逐顆 delay 0.115s |
| input 輸入 | **整條帶子亮起來**：指到任何一段，同一連通分量全部保持不透明，其餘降到 .28 | pointerenter／Tab | 即時（< 100ms，連通分量在放樣時就算好了） |
| transition 轉場 | **劃線揭頁**：乾筆先把格線劃滿整頁，再一格一格掀開 | 換頁 | 520ms `steps(13,end)` |
| signature 簽名 | **穿織巡帶**：一顆朱點沿著選中那條帶子的路徑走，在自己在上的交點浮在帶面上，在自己在下的交點鑽進去看不見 | 點「走一趟」 | `offset-distance` 0→100%，linear，長度 = 格數 × 0.34s |

**穿織巡帶的做法**：遮擋不是算出來的，是**圖層疊出來的**——

```
1 墨廓（全部）→ 2 被選中那條的帶色 → 3 朱點 → 4 其餘各條的帶色 → 5 獸首
```

於是朱點在自己在上的交點浮在自己的帶面上（第 2 層在它下面），
在自己在下的交點被別條的帶色蓋掉（第 4 層在它上面）。再配一支依實際路徑比例產生的
`@keyframes`，在鑽入的那一格把不透明度切到 0：

```js
var stops = underStops(cord);            // 每個「在下」的格點落在路徑長度的比例
var kf='@keyframes wk{', prev=0, w=0.030;
stops.forEach(function(t){
  var a=Math.max(0,t-w/2), b=Math.min(1,t+w/2);
  kf += (prev*100)+'%{opacity:1}'+(a*100)+'%{opacity:1}'+(a*100+.01)+'%{opacity:0}'
      + (b*100)+'%{opacity:0}'+(b*100+.01)+'%{opacity:1}';
  prev=Math.min(1,b+0.002);
});
kf += '100%{opacity:1}}';
```

```css
.walker{ fill:var(--minium); stroke:var(--ink); stroke-width:1.6 }
/* 元素上：offset-path:path('…'); offset-rotate:0deg;
   animation: wk-m 8s linear infinite, wk 8s linear infinite; */
@media (prefers-reduced-motion:reduce){ .walker{animation:none!important} }
```

降級（`prefers-reduced-motion`）：不畫朱點、不跑轉場，改用一句文字給出完全相同的資訊——
「這條帶子行經 24 個交點：上 12 次、下 12 次，兩端收在板角的獸首上。」

**禁止**：淡入作為主要動效、視差、滾動劫持、彈跳緩動、任何 `filter: blur()` 的過場。

---

## 八、插畫與圖像風格（三族紋樣構成法）

全站零外部圖片。所有圖像——地毯頁、導覽、圖例、logo、favicon、使用者作品——
由同一支引擎的三族原語輸出：

1. **交織帶**（平織格點＋斷點集合＋上下交替，見特徵 1）
2. **螺旋盤**（圓弧構成：三曲腿／喇叭口／盾形，見特徵 2）
3. **獸首**（帶端收尾，見特徵 3）

外加強制的**朱點輪廓**（特徵 4）。判準：
**把顏色抽掉，每一個圖形都要能說出它屬於哪一族，而且全站帶寬一致。**

斷點（break）是這一族的核心工具：在格點上放一道隔，帶子在那裡轉彎。

```js
function bend(x,y,dx,dy,breaks,X,Y){
  var h=(y===0||y===Y), v=(x===0||x===X), u=breaks[x+','+y];
  if(u==='H') h=true; if(u==='V') v=true;          // H 橫隔：上下反彈；V 直隔：左右反彈
  return [v?-dx:dx, h?-dy:dy];
}
```

板的四邊是天生的隔；四個角同時有兩種隔，所以帶子在角上折返 —— 那就是帶端。

**明文禁用**：照片、半調網點、細線幾何線描（帶子有寬度，輪廓線只是它的邊）、
`feTurbulence` 假質感濾鏡、扁平化單色圖示、任何金屬漸層。

---

## 九、Logo 與 Favicon 設計指南

Logo 必須是**三族紋樣做成的一個物件**，不是一個字標加裝飾：

- 主形取一個有開口或有端點的形（環、帶、環扣），開口兩端收獸首；
- 主形的表面是交織帶（墨廓 + 帶色兩層），至少四處看得見上下穿插的缺口；
- 外圍一圈單顆朱點；
- 零漸層、零陰影，底色用犢皮而不是透明。

Favicon 用原創 inline SVG data URI 寫在 `<head>`，16px 下要能讀出「一個開口的環 + 一道斜線」：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23E8DCC0'/%3E%3Cpath d='M16 4a12 12 0 1 0 7 21.7' fill='none' stroke='%2323190F' stroke-width='5.6'/%3E%3Cpath d='M16 4a12 12 0 1 0 7 21.7' fill='none' stroke='%23DFA61C' stroke-width='2.8'/%3E%3Cpath d='M9 27l16-11' stroke='%2323190F' stroke-width='4.6'/%3E%3Cpath d='M9 27l16-11' stroke='%23C04A28' stroke-width='2'/%3E%3Ccircle cx='23' cy='25.7' r='2.6' fill='%2323190F'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先把帶子接通，形是接通之後自己長出來的。
- 每一格只放一族紋樣；格與格共邊，不留縫。
- 顏色平塗，邊界永遠是墨線。
- 需要厚度時用硬邊實色方塊（`box-shadow:3px 3px 0`）。
- 標題字級用 `cqi`，讓元件對「格」負責而不是對視窗負責。
- 遞減首字用在每一頁的第一段。

**Don't**

- ❌ 上下不交替、或同一條帶上連著兩次在上。
- ❌ 走不通的帶（進去沒出來、板中間斷掉沒收獸首）。
- ❌ 貝茲曲線隨手拉的螺旋。
- ❌ 金箔、金屬漸層、發光、投影、圓角卡片。
- ❌ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ❌ emoji 當 icon（icon 一律用三族紋樣自繪）。
- ❌ Lorem ipsum、AI 腔文案、「EST. 19xx」徽章。
- ❌ 把「凱爾特」當氣氛：沒有構成法的花紋，不上板。

---

## 十一、頁面骨架範例

```html
<body>
<header class="mast"><div class="mast-in">
  <svg class="mast-logo" viewBox="0 0 64 64">…開口環＋獸首…</svg>
  <span><span class="mast-name">行號</span><br><span class="mast-sub">副名</span></span>
  <div class="mast-tel">地址<br>電話 ・ 營業時間</div>
</div></header>

<nav class="nav" aria-label="主導覽">
  <svg class="nav-svg" id="navknot" preserveAspectRatio="none" aria-hidden="true">
    <!-- 靜態備援：一條實心帶。JS 到位後換成真正的織帶 -->
    <path d="M0 29h366" stroke="var(--ink)" stroke-width="12"/>
    <path d="M0 29h366" stroke="var(--orpiment)" stroke-width="7"/>
  </svg>
  <div class="nav-labels">
    <a href="a.html" aria-current="page"><span class="cn">第一頁</span>LEATHANACH</a>
    …
  </div>
</nav>

<main class="wrap">
  <section class="carpet">…地毯頁：由外往內讀…</section>

  <section class="panel">
    <h2 class="panel-h">格的標題<span class="lat">LATIN LABEL</span></h2>
    <div class="panel-b">
      <p class="dim"><span class="d1">遞</span><span class="d2">減</span><span class="d3">的</span>
      <span class="d4">首</span><span class="d5">字</span>之後回到內文。</p>
      <div class="grid2">
        <div>…</div>
        <div><svg class="knot">…結板…</svg></div>
      </div>
    </div>
  </section>
</main>

<footer>…三欄：地點／頁／人…<div class="colophon">…</div></footer>
</body>
```

---

## 十二、技術實作與相容性

本站核心技術三項，分屬三層，每一項都是視覺的主要承載者。

### 1　自寫島嶼結繩引擎（資料與生成層）

平織格點 ＋ 斷點集合 ＋ 有向狀態走訪 ＋ 尖點分解。無任何瀏覽器 API 依賴，
只用 `Object` 與陣列。它同時是全站**唯一**的渲染器：地毯頁、導覽、圖例、
獸首、螺旋、logo、favicon 與使用者作品都是它的輸出。

- **上下交替**：主／次格點的局部規則（特徵 1）。實測：8×6 板、隨機放 1–8 道隔共 400 組配置，
  交替違規 **0 次**。
- **帶子分解**：從四個角（尖點）起走，得到開放帶；其餘未走訪的有向狀態構成閉環帶。
  走訪時同時標記正向與反向狀態，確保每條帶只被數一次。
- **效能實測（Node 22）**：8×6 板求解 2000 次 = **50 ms**（0.025 ms／次）。
  一次互動要重解一次板並重繪 SVG，遠低於 100ms 預算。
- **降級**：無 JavaScript 時，導覽退回一條實心雙色帶（見骨架範例的靜態備援），
  全部文字內容、營業資訊、價目與規則都是靜態 HTML，一字不少。

### 2　`offset-path` / `offset-distance` / `offset-rotate`（動效與時間軸層）

承載簽名動效「穿織巡帶」。用它而不用 `requestAnimationFrame` 的理由是
**路徑本身就是資料**：帶子的中心線已經由引擎算出一個 `path()` 字串，
交給瀏覽器沿路插值比每幀自己算座標準確、也不會有 layout thrashing
（每幀只動一個 `offset-distance`，不讀任何幾何）。

- **支援現況（查證 MDN《offset-path》《offset-rotate》）**：
  `offset-rotate` 標示 **Baseline Widely available，自 2022-09 起各瀏覽器皆可用**；
  `offset-path: path()` 與 `offset-distance` 同屬這組 motion path 屬性，同樣
  widely available，無須 fallback。
- **fallback**：`prefers-reduced-motion: reduce` 時朱點完全不產生，改以一行文字給出
  同樣的資訊（交點數、上幾次、下幾次、兩端收在哪裡）。`insertRule` 失敗時
  （極少數 CSP 情境）整個 walker 不輸出，其餘畫面不受影響。

### 3　Container queries ＋ container query units（版面與樣式層）

承載特徵 5 的「紋樣密度由格自己決定」。`.panel` 與 `.carpet` 設
`container-type: inline-size`，標題字級、內距、地毯頁格內字級全部用 `cqi`。
理由是真的：同一個元件放在寬格與窄格裡本來就不該一樣大——一面結板在名片上與在海報上
是不同的板，格子要夠大才刻得出帶廓與朱點。

- **支援現況（查證 MDN《CSS container queries》與 caniuse）**：
  `cqw / cqh / cqi / cqb / cqmin / cqmax` 自 **2023-02 起為 Baseline**
  （Chrome 105 / Safari 16 / Firefox 110），與尺寸查詢同時支援，無額外旗標。
- **fallback**：舊瀏覽器忽略 `cqi`，`clamp()` 的第一個參數（下限像素值）生效，
  字級停在最小階，版面結構與可讀性不變。

### 附註（非核心技術，皆為漸進增強）

- **CSS scroll-driven animations（`animation-timeline: view()`）** 讓遞減首字在讀者往下讀時
  自己降下來。查證：此特性**不是 Baseline**——Chrome/Edge 115+、Safari 26 已支援，
  Firefox 穩定版至 2026 年仍在 `layout.css.scroll-driven-animations.enabled` 旗標之後
  （已列入 Interop 2026 項目）。因此整段包在
  `@supports (animation-timeline: view())` 內，不支援時首字停在靜態的 3.5em 階，
  **字級不同，字一個也不會少**。
- **`navigator.clipboard`** 用於複製板號，不支援時按鈕仍顯示板號文字，可手動選取。
- **`BigInt`** 用於把 18 個格點的三進位狀態編成板號（Baseline widely available）。

### 效能預算實測

| 項 | 值 | 預算 |
|---|---|---|
| 單頁大小（含 inline CSS/JS/SVG） | 46.6 – 52.9 KB | ≤ 350 KB |
| 首屏 JS（解板＋建 SVG 字串＋插入） | < 12 ms | ≤ 100 ms |
| 互動重繪（改一道隔 → 重解 + 重繪） | < 8 ms | 60fps |
| 外部資源 | Google Fonts 三支，零圖片零音檔 | — |

---

*一句話驗收：遮掉全部文字，一個懂設計的人要能在三秒內說出「這是島嶼抄本那一路」。*
*做不到就回去加強五個特徵，不要加強引擎。*
