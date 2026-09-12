---
name: czech-cubism-facet
description: Czech Cubism (Prague, 1911-1914) as a web style - every surface broken into oblique prismatic facets whose lightness is computed from its own normal, zigzag cornices, chamfered panels, faceted display type, and a page split diagonally into two ground colours.
---

# 捷克立體主義　Czech Cubism（稜面派）

> 流派：捷克立體主義（Český kubismus），布拉格，1911–1914。
> 這不是畢卡索的分析立體派，也不是通用的「幾何風」。它是全世界唯一一次有人把立體派拿去蓋房子、做櫃子、做咖啡杯、排書名頁的運動。
> 判準：**斜面取代平面 ＋ 稜線取代陰影 ＋ 鋸齒取代直線 ＋ 沒有一個直角** 四者同時成立。

---

## 一、設計哲學

Pavel Janák 一九一一年寫〈稜柱與金字塔〉（*Prizma a pyramida*）時提出的說法是：**平面是惰性的、死的**。物質在自身重量以外若再受到第三種力（他說是精神、能量），就會沿斜面裂開，像結晶一樣。所以牆不該是平的，門楣不該是水平的，欄杆不該是垂直的——它們應該是被折出來的一組面。

Josef Gočár 一九一二年在布拉格老城蓋成的黑色聖母之家（Dům U Černé Matky Boží）把這句話做成了真的建築；Vlastislav Hofman 把同一套語彙用到書封與陶器；Josef Chochol 把它用到 Vyšehrad 山腳下的幾棟住宅。他們用的材料是清水磚、水泥粉光、深色染木——低彩度、重量感強、每一塊都看得出是誰在承重。

把它搬到網頁上時，唯一要守住的翻譯規則是：

> **不要用陰影去假裝立體，用「面」去表達立體。**

一個模糊陰影是在說「這裡有一塊懸空的板子」；一個明度不同的斜面是在說「這裡的材料折了一次」。這兩件事在畫面上長得完全不一樣，而且後者才是這個流派。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是捷克立體主義，只是「有點幾何的網頁」。

### 特徵 1：每個面的明度由它自己的法線算出（三階，不是漸層）

畫面上每一個色塊都是一個朝著某個方向的面。它的深淺不是設計師挑的，是它朝哪裡決定的。全站只認三階：**受光／側面／背光**。中間的過渡階不存在——因為在真實的稜面上，兩個面之間是一條折線，不是一段漸層。

```css
:root{ --lam:-135; --amp:15; }              /* 光的方位角固定在左上，一整天不動 */

.f{                                          /* 0：不支援時退成單一中間調 */
  stroke:rgba(17,23,29,.85); stroke-width:1; stroke-linejoin:miter;
  vector-effect:non-scaling-stroke;
  fill:hsl(var(--h,190) var(--s,14%) calc(var(--l0,74) * 1%));
}
@supports (width:calc(cos(45deg) * 1px)){    /* 1：連續明度 */
  .f{ --k:cos((var(--n,0) - var(--lam)) * 1deg);
      fill:hsl(var(--h,190) var(--s,14%) calc((var(--l0,74) + var(--amp) * var(--k)) * 1%)); }
}
@supports (width:calc(round(1.5px,1px))){    /* 2：壓成三階 +1 / 0 / -1 */
  .f{ --k:round(cos((var(--n,0) - var(--lam)) * 1deg),1); }
}
```

用法：程式只寫下這個面的法線角度，顏色自己出來。

```html
<polygon class="f" style="--n:-143" points="…"/>
<polygon class="f" style="--n:37"   points="…"/>
```

**這條規則的力量在於：新生成的面自己會決定它是什麼顏色。**使用者當場斜切的一刀、程式當場算出的一塊多邊形，都不需要查任何色表。

### 特徵 2：版面上沒有一個直角

所有面板、按鈕、輸入框、頁尾、導覽項的角，一律斜切。切的位置固定在**左上與右下**這條對角上——這是黑色聖母之家窗框的做法，斜切必須有方向，不能四角都切成八邊形。

```css
:root{ --chamf:18px }
.pane{
  clip-path:polygon(
    var(--chamf) 0, 100% 0,
    100% calc(100% - var(--chamf)), calc(100% - var(--chamf)) 100%,
    0 100%, 0 var(--chamf));
}
.btn{ clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px) }
input,select{ clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px) }
```

`border-radius` 在本風格中永遠是 `0`。連 `1px` 都不行。

### 特徵 3：鋸齒稜帶取代分隔線

段落之間、標題底下、頁尾上緣，一律不用水平直線。用等腰三角序列。三角的高由斜率決定（`tan(26deg) × 半寬`），全站共用同一個角度。

```html
<svg class="zigb" viewBox="0 0 900 16" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 13 L15.5 0 L31 13 L46.5 0 …"/>
</svg>
```
```css
.zigb{ display:block; width:100%; height:16px; fill:none;
       stroke:var(--cad); stroke-width:2.2; stroke-linejoin:miter; margin:6px 0 20px }
/* 也可以做成實心的稜帶：clip-path:polygon() 直接寫出鋸齒點列 */
```

生成點列（任何語言皆可，n 建議取偶數，寬度整除）：

```js
const zig=(w,h,n)=>Array.from({length:n+1},(_,i)=>[i*w/n, i%2 ? h : 0]);
```

**加強版：稜面楣帶（cubist cornice）。**把鋸齒升級成一列三面稜錐——這是黑色聖母之家簷口的做法，也是本風格在三秒辨識測試中最有效的一件東西。每個單元三個面，各自帶自己的法線角，所以它同時滿足特徵 1 與特徵 3：

```js
function cornice(w,h,n){                       // n 個單元
  const u=w/n, r=h*0.56, out=[];               // r = 內脊高度
  for(let i=0;i<n;i++){
    const x0=i*u, xm=x0+u/2, x1=x0+u;
    out.push({n:-152, pts:[[x0,h],[xm,0],[xm,r]]});   // 左斜面（受光）
    out.push({n:-28,  pts:[[xm,0],[x1,h],[xm,r]]});   // 右斜面（側光）
    out.push({n:94,   pts:[[x0,h],[xm,r],[x1,h]]});   // 下折面（背光）
  }
  return out;                                   // 逐項輸出 <polygon class="f" style="--n:…">
}
```
```css
.corn{ display:block; width:100%; height:40px; margin:0 0 -1px }
.corn .f{ stroke-width:1.4 }
```

放在導覽底下橫貫整個 viewport（`preserveAspectRatio="none"`）。每一頁換一種材料：磚、稜灰藍、鎘黃。

### 特徵 4：稜角化標題——字的四角被切掉，並在光的反方向疊一層暗一階

標題不是加陰影，是**同一個字被折了一次**：本體切掉左上與右下兩個 45° 角，底下疊一份位移的暗色實心副本（**零模糊、零透明度**）。

```css
.fx{ position:relative; display:inline-block }
.fx>span{ display:block;
  clip-path:polygon(.42em 0,100% 0,100% calc(100% - .30em),calc(100% - .42em) 100%,0 100%,0 .30em) }
.fx::before{ content:attr(data-t); position:absolute; left:6px; top:5px;
  color:var(--coal-d); z-index:-1; white-space:pre;
  clip-path:polygon(.42em 0,100% 0,100% calc(100% - .30em),calc(100% - .42em) 100%,0 100%,0 .30em) }
```
```html
<h1 class="fx" data-t="今天這一支"><span>今天這一支</span></h1>
```

正文一律不套。這一招只給標題與識別，段落文字必須是可選取、對比 ≥7:1 的一般 HTML 文字。

### 特徵 5：頁面沒有單一背景色——一條 26° 稜線把地分成兩塊

這是把 Janák 那句「平面是死的」用在整個 viewport 上。兩塊地色直接相鄰，**中間不放線、不放陰影、不放漸層**——放了就等於把這個風格關掉。

```css
.ground{ position:fixed; inset:0; z-index:-2; background:var(--coal) }
.ground i{ position:absolute; inset:0; background:var(--brick);
  clip-path:polygon(0 100%,100% 100%,100% 26%,0 74%) }
.ground b{ position:absolute; inset:0; background:var(--coal-d);
  clip-path:polygon(0 100%,100% 100%,100% 62%,0 96%) }
```

---

## 三、色彩系統

材料只有五種，但**每一種都以三個明度同時在場**（特徵 1）。這是本風格的配色本體：不是「多色相」，是「少色相、多明度階」。

| 材料 | 受光 | 側面 | 背光 | 用途 | 面積 |
|---|---|---|---|---|---|
| 清水磚 brick | `#c4633f` | `#a94a2d` | `#5d2919` | 下半頁地色、強調面板、拒絕與退件 | 約 26% |
| 煤黑 coal | `#1f2c37` | `#161f27` | `#11171d` | 上半頁地色、頁尾、所有稜線與正文 | 約 26% |
| 冰白 ice | `#e8eded` | `#d3dcde` | `#b6c5c8` | 內容面板（所有長文一律在這上面） | 約 24% |
| 稜灰藍 steel | `#849aa9` | `#647e90` | `#4f6472` | 次要面、表頭、註記、停用態 | 約 15% |
| 鎘黃 cadmium | — | `#ebb133` | `#b07e11` | 現用態、主要動作、切口／刀路。**面積 ≤7%** | ≤7% |

硬規則：

1. **零漸層。**唯一的例外是無——真的沒有例外。深淺變化一律靠換面。
2. **零模糊陰影。**`box-shadow` 只允許 `inset` 的實心色（用來畫切面），`filter:blur` 全站禁用。
3. 鎘黃只有語意用途（動作／現用／切口），**不得當品牌色、不得當大面積地色**。
4. 長文永遠在冰白面板上，永遠不在磚面或煤黑地上。
5. 對比實測：冰白／煤黑 14.11、冰白／磚赭 4.80、煤黑／鎘黃 8.63、煤黑地上的稜灰藍 6.16——全部通過 AA。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 中文標題 | Noto Sans TC | 900 | 套 `.fx` 稜角化（特徵 4） |
| 中文正文 | Noto Sans TC | 400 / 700 | 行高 1.78，不套任何切角 |
| 拉丁字與數字 | Jost | 400 / 500 / 700 | 一九二〇年代中歐幾何無襯線的血緣，`font-variant-numeric:tabular-nums` |

字級 scale（1.5 倍階，刻意跳得大——立體派沒有溫和的層級）：

```
display  clamp(34px, 7.2vw, 72px)   稜角化，只給首頁與頁名
h2       clamp(20px, 2.5vw, 27px)
lead     17px
body     16px
small    13.5px
label    13px / letter-spacing .06em
tag      10–11px / letter-spacing .20em（全部大寫或全形編號）
```

**禁止**：襯線體、手寫體、圓體、任何有圓角終端的字。**禁止** `letter-spacing` 為負。

---

## 五、版面與網格

- 主欄寬 `max-width:1140px`，左右 padding 26px（≤560px 收到 15px）。
- 兩欄制：`1.25fr .75fr`（工作區＋控制區）或 `1.15fr .85fr`（圖＋資訊），≤900px 直接落成單欄。
- **旋轉角度只有一個：26°。**地色分割線、鋸齒斜邊、軸測厚度方向，全部從這個角度推導。多一個角度就會亂。
- 軸測（等角）投影的厚度位移固定為 `(0.34, 0.20) × 厚度`——右下方，與光源（左上）相反。
- 留白規則：面板之間 22px，區塊之間 30px。**不做置中對齊的段落**，所有文字齊左。
- **不做三張等寬圓角卡片。**要並排就用 `repeat(auto-fit,minmax(…,1fr))`，而且每張面板都必須有切角。

---

## 六、元件配方

**導覽（kerf-notch 鋸口）**：四個梯形並排，現用頁那一格的**材料被切走**——背景透明、左右兩道 2px 鎘黃切面（`inset` box-shadow）、標籤變鎘黃、下緣一排虛線鋸痕。其餘格是實心冰白梯形。

```css
.kerf a{ background:var(--ice-m); color:var(--coal);
  clip-path:polygon(0 0,100% 0,100% 100%,10px 100%); border-left:1px solid var(--coal) }
.kerf a[aria-current="page"]{ background:transparent; color:var(--cad);
  box-shadow:inset 2px 0 0 var(--cad), inset -2px 0 0 var(--cad) }
.kerf a[aria-current="page"]::after{ content:""; position:absolute; left:0; right:0; bottom:-9px; height:9px;
  background:repeating-linear-gradient(90deg,var(--cad) 0 3px,transparent 3px 7px) }
```

**按鈕**：實心鎘黃、煤黑字、切角 12px、`font-weight:700`。hover 換純白底。停用態換稜灰藍。**不做 hover 位移、不做按壓硬陰影。**

**面板**：見特徵 2。三種變體 `.pane`（冰白）／`.pane.dk`（煤黑側面）／`.pane.br`（磚面，白字）。

**表單**：`input`／`select` 一律 2px 煤黑實線邊、切角 10px、底色冰白。錯誤訊息以磚背光色 `#5d2919` 顯示在欄位下方；整批退件用一整塊磚色面板列出理由——**理由要寫成一句人話，不是「欄位不得為空」**。

**表格**：表頭 `#b6c5c8` 實心底，格線只有底線 1px，`rgba(22,31,39,.22)`。數字欄一律 `tabular-nums`。

**頁尾**：上緣不是水平線，是一條 22px 的斜邊（`clip-path:polygon(0 22px,100% 0,100% 100%,0 100%)`）。

---

## 七、動效規則

四種，缺一不可，全部有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 類型 | 名稱 | 觸發 | 參數 | 降級 |
|---|---|---|---|---|
| ambient | 窖霜結晶 | 無（22s 循環） | 六簇小稜晶各自 `scale(.55→1.1)`＋opacity，錯開 3.1s | 停在中間態、固定 opacity .55 |
| input | 開面 | hover／focus | `rotate3d(.3,1,0,8deg)`，**90ms linear**（<100ms） | `transform:none` |
| transition | 折頁 fold-turn | 進頁 | `perspective(1400px) rotate3d(1,.42,0,-13deg) → none`，560ms `cubic-bezier(.22,.92,.28,1)`，`transform-origin:14% 0` | 不播，直接是最終畫面 |
| signature | 落刀生面 | 下刀 | 兩半沿刀的法線各推開 7px 再回位，300ms `cubic-bezier(.3,1.5,.5,1)`（過衝）；切口鎘黃線 flash 420ms | 不推、不閃，直接是切開後的畫面 |

**明文禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、`stroke-dashoffset` 描繪、任何 `ease-in-out` 的長時間補間。這個流派的動作是「折」與「裂」，不是「飄」。

`easing` 只允許三種：`linear`（90ms 以內的即時回饋）、`cubic-bezier(.22,.92,.28,1)`（轉場）、`cubic-bezier(.3,1.5,.5,1)`（有過衝的裂開）。

---

## 八、插畫與圖像風格

技法名稱：**facet-solid 稜面立體構成**。零外部圖片、零照片、零寫實描繪。所有圖像（logo、favicon、示意圖、產品圖、印記）只由三種原語構成：

1. **面**：凸多邊形，帶一個 `--n` 法線角，顏色由特徵 1 算出。
2. **稜線**：相鄰兩面之間 1px 的 `stroke`，顏色固定 `rgba(17,23,29,.85)`，`stroke-linejoin:miter`（**永遠不用 round**）。
3. **鋸齒帶**：等腰三角序列，見特徵 3。

一個實體 = 頂面 ＋ 若干側面。側面由每條邊沿深度方向擠出，只畫法線朝向觀者（與深度方向點積 > 0）的那些：

```js
function facesOf(poly, dep){                    // poly 為螢幕座標
  const sg=Math.sign(signedArea(poly)), out=[];
  for(let i=0;i<poly.length;i++){
    const a=poly[i], b=poly[(i+1)%poly.length];
    let nx=b[1]-a[1], ny=-(b[0]-a[0]);          // 邊向量轉 -90°
    if(sg>0){ nx=-nx; ny=-ny; }                 // 取外法線
    const L=Math.hypot(nx,ny)||1; nx/=L; ny/=L;
    if(nx*dep[0]+ny*dep[1] > 0.02)              // 只畫看得見的側面
      out.push({ q:[a,b,[b[0]+dep[0],b[1]+dep[1]],[a[0]+dep[0],a[1]+dep[1]]],
                 az:Math.round(Math.atan2(ny,nx)*180/Math.PI) });
  }
  return out;
}
```

判準：**拿掉全部顏色，仍讀得出哪一個面朝上、哪一個面朝側。**

明文禁用：`feTurbulence` 手抖濾鏡、半調網點、細線幾何線描、任何曲線（圓弧一律折成 3–5 段直線）、`stroke-linecap:round`。

---

## 九、Logo 與 Favicon 設計指南

Logo 是一個被切開的稜柱：頂面（冰白）、兩個側面（稜灰藍的兩階）、一道鎘黃的切口，切口所露出的斷面自己是一個獨立的面。全部 `stroke:#161f27` `stroke-width:3` `stroke-linejoin:miter`。

Favicon 同構，簡化到 32×32：煤黑底、四個多邊形、一條 2.4px 鎘黃切線，**不加圓角、不加文字**，寫成 inline SVG data URI 放在 `<head>`。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='…'%3E…%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 每一個色塊都要能回答「你朝哪裡」。
- 用同一個角度（26°）貫穿全站。
- 讓現用態以「材料被移除」表達，而不是「加上一塊高亮」。
- 長文一律水平、一律在冰白面板上、一律可選取。
- 圓弧折成折線；曲線折成折線；連 loading 指示都折成折線。

**Don't**

- ✗ 圓角（任何大小）
- ✗ 模糊陰影、`filter:blur`、玻璃擬態
- ✗ 漸層（含極細微的「幾乎看不出來」的那種）
- ✗ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ✗ emoji 當 icon
- ✗ Lorem ipsum、AI 腔文案、「EST. 19xx」徽章、「把 X 變成 Y」句式標題
- ✗ 把 45° 斜切當成唯一手法卻不做明度差——**沒有明度差的斜切只是裁角，不是稜面**
- ✗ 用陰影假裝立體

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>/* 見特徵 1–5 與元件配方 */</style>
</head>
<body>
  <div class="ground" aria-hidden="true"><i></i><b></b></div>   <!-- 特徵 5 -->
  <div class="wrap">
    <div class="top">
      <a class="brand" href="index.html">…</a>
      <nav class="kerf" aria-label="主導覽">
        <a href="index.html" aria-current="page"><span class="n">01</span><span class="t">首頁</span></a>
        …
      </nav>
    </div>

    <main class="fold">                                        <!-- 轉場：折頁 -->
      <h1 class="fx" data-t="頁名"><span>頁名</span></h1>       <!-- 特徵 4 -->
      <svg class="zigb" viewBox="0 0 900 16" preserveAspectRatio="none"><path d="M0 13 L15.5 0 …"/></svg>
      <div class="cols">
        <div class="pane">…</div>                              <!-- 特徵 2 -->
        <div class="pane dk">…</div>
      </div>
      <svg viewBox="0 0 620 400">
        <g class="solid opn" tabindex="0">
          <polygon class="f" style="--n:-143" points="…"/>     <!-- 特徵 1 -->
          <polygon class="f" style="--n:37"   points="…"/>
          <polygon class="f tp" points="…"/>
        </g>
      </svg>
    </main>
    <footer>…</footer>
  </div>
</body></html>
```

---

## 十二、技術實作與相容性

本風格有兩項技術是**承重的**（拿掉它，特徵 1 與特徵 4 就得改用手工色表與圖片，整套規格書會退化成一份配色表），一項是輔助的。

### 12.1 CSS 三角函數 `cos()`（承載特徵 1）

- **用途**：把「面的法線角度」直接翻譯成「明度」。不用 JavaScript、不用色表，因此**任何當場生成的新面都自己有顏色**。
- **支援現況**（2026-08-22 查證）：MDN《`sin()`》頁面標示 **Baseline Widely available**，「自 2023 年 3 月起跨瀏覽器可用」。web.dev〈Baseline 2023〉將 `sin()`／`cos()`／`tan()`／`asin()`／`acos()`／`atan()`／`atan2()` 列為 Baseline 2023 的一部分（Chrome/Edge 111+、Safari 16.4+、Firefox 125+ 起全數穩定）。
  - 來源：<https://developer.mozilla.org/docs/Web/CSS/sin>、<https://web.dev/blog/baseline2023>、<https://web.dev/articles/css-trig-functions>
- **fallback 具體行為**：整段包在 `@supports (width:calc(cos(45deg) * 1px))` 內。不支援時，`.f` 落回第一條規則 `fill:hsl(var(--h) var(--s) calc(var(--l0) * 1%))`——**所有側面成為同一階中間色**。此時形狀、稜線、法線角度標示、版面與所有文字完全不變，只是立體感從三階退成兩階（頂面仍與側面不同，因為 `--l0` 不同）。資訊零損失。

### 12.2 CSS `round()`（把明度壓成三階）

- **用途**：`round(cos(…), 1)` 把 −1…1 壓成 `{-1, 0, +1}` 三個值，這正是特徵 1 要求的「只認三階」。
- **支援現況**（2026-08-22 查證）：MDN《`round()`》標示自 **2024 年 5 月**起跨瀏覽器可用（Baseline 2024 newly available）；Firefox 118（2023-09）、Safari 15.4（2022-03）、Chrome/Edge 125（2024-05）。
  - 來源：<https://developer.mozilla.org/en-US/docs/Web/CSS/round>
- **fallback 具體行為**：獨立一層 `@supports (width:calc(round(1.5px,1px)))`。不支援時 `--k` 維持 12.1 的連續 `cos()` 值——畫面變成連續明度而非三階。風格略微失真（過渡階出現），但每個面仍由自己的法線決定深淺，功能與資訊完全不受影響。

### 12.3 CSS 3D `transform-style:preserve-3d` ＋ `perspective()`（承載 input 與 transition 動效）

- **用途**：hover 時把面**真的折出來**（`rotate3d`），以及進頁時的折頁轉場。用 2D `transform` 做不出「面轉向之後受光角度也變了」這件事。
- **支援現況**（2026-08-22 查證）：MDN《`transform-style`》標示 **Baseline Widely available**，「自 2015 年 9 月起跨瀏覽器可用」；`perspective()` 自 2015 年 7 月起跨瀏覽器可用。
  - 來源：<https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style>
- **fallback 具體行為**：無支援缺口。`prefers-reduced-motion:reduce` 時 `.pz{transition:none}` 且 hover 的 `transform` 被覆寫為 `none`、`.fold` 的 animation 取消——畫面直接是最終狀態。

### 12.4 幾何引擎：半平面裁剪（Sutherland–Hodgman）

純 JavaScript，無瀏覽器 API 依賴，故無相容性問題。一條有向直線把多邊形裁成左右兩份；每一條新產生的邊即一個新的側面，其法線角度直接寫進 `style="--n:…"`。搭配 FNV-1a → 決定性偽亂數，同一組輸入恆得同一結果，因此 `?p=` 分享碼可完整還原。

### 12.5 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline CSS/JS/SVG，不含 Google Fonts） | 21–38 KB | ≤350 KB |
| 幾何引擎：完整一局（8 刀，含裁剪、弦長、面積、角度） | 0.049 ms（5,000 局 244 ms，Node 22 單執行緒） | — |
| 單次半平面裁剪 | 0.002 ms（20,000 次 40.7 ms） | — |
| 每次下刀的 DOM 重繪 | ≤9 塊 × ~6 面 ≈ 54 個 `<polygon>` | — |
| 首屏 JS | 只有一個 `setInterval(…,30000)` 的重量讀數 | ≤100 ms |

**無 layout thrashing**：動畫只改 `transform` 與自訂屬性；`getBoundingClientRect()` 只在 pointer 事件開始時讀一次，不在動畫迴圈裡讀。

### 12.6 無 JavaScript 時

四頁的全部資訊（價目、工序、機具、時刻、配送區、聯絡方式）都是靜態 HTML。`index.html` 的重量讀數退為出窖原重；`chang.html` 的十二面轉冰盤是靜態 SVG，只是不能轉；`cai.html` 與 `dan.html` 各有 `<noscript>` 區塊，前者列出師傅照三張單子各切一次的完整數字，後者給電話與 email 與同一組規則。

---

*本規格書描述的是風格，不綁定產業。同一套語彙可以用在建築事務所、五金行、冷鏈物流、家具品牌、地質調查、寶石切割、印刷廠、登山裝備——任何「材料會沿斜面裂開」的行業都合身。*
