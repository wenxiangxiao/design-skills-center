---
name: suprematism-void
description: Russian Suprematism (Malevich, 1915-1918) for the web — a horizonless white field where flat quadrilaterals, one circle and one crossing bar float on a shared diagonal, scale is the only depth cue, and text is treated as another mass rather than a paragraph.
---

# 至上主義 Suprematism 風格規格書

> 本規格書描述的是**俄國至上主義**（Супрематизм），一個真實存在、可查證、可指名的既有藝術與設計流派，
> 不是本館自創的風格。
>
> **年代與地域**：1915–1927，俄羅斯（彼得格勒、莫斯科、維捷布斯克）。
> **代表人物與作品**：卡濟米爾・馬列維奇 Kazimir Malevich（1879–1935）——1915 年 12 月在彼得格勒
> 「0,10：最後的未來主義畫展」發表 39 件至上主義作品，其中《黑方塊》被掛在展廳兩面牆交界的高處，
> 也就是俄羅斯家屋中供奉聖像的「紅角」(красный угол)；同年出版宣言
> 《從立體主義與未來主義到至上主義：繪畫中的新寫實主義》。
> 三個階段依序是**黑色時期**（黑方塊、黑十字、黑圓，1915）、**彩色時期**
> （《至上主義構成：飛機飛行》1915、《八個紅色矩形》1915）、**白色時期**（《白上白》1918）。
> 同代人：埃爾・利西茨基 El Lissitzky（PROUN 系列、《以紅楔攻打白軍》1919）、
> 奧爾加・羅扎諾娃 Olga Rozanova、伊利亞・恰許尼克 Ilya Chashnik、
> 尼古拉・蘇耶京 Nikolai Suetin（把至上主義畫上羅曼諾索夫瓷器）。
> 1919–1922 年他們在維捷布斯克組成 UNOVIS（新藝術確立者），把這套語言帶進海報、書籍、瓷器與建築模型。
>
> **當時的製作技術限制**：至上主義的本體是**油彩平塗**——調子與筆觸被刻意消除，邊緣用直尺與遮蓋切齊，
> 目的是讓形看起來「不是被畫出來的，而是就在那裡」。當 UNOVIS 把它印成海報與書封時，
> 受制於凸版與少數幾塊專色版，顏色數更少、邊緣更硬、疊色只能靠版與版相接——
> 這反過來強化了「大色塊、硬邊、無漸層」的視覺結果。
>
> **它為什麼長成這樣**：馬列維奇要的不是抽象裝飾，而是**取消參照系**。
> 沒有地平線、沒有重力、沒有可辨識的物件，觀者就無從判斷哪邊是上、哪邊是遠，
> 只剩下「感覺的至上」（супрематия чувства）。白色不是背景，是他所謂的「白色的深淵」——一個沒有邊界的空間。

---

## 一、設計哲學

**這個風格的第一原則是：白不是背景，白是空間。**

一般的版面把白當成「還沒放東西的地方」；至上主義把白當成一個**沒有邊界、沒有方向、沒有底的空間**。
差別在後果上：只要你替白加了一層紙紋、一道漸層、一個外框、一條分隔線，或讓任何一塊色塊「站」在某條基線上，
這個風格立刻變成「白底的極簡風」——那是完全不同的另一種東西。

**第二原則是：沒有上下。**

版面上不准出現水平基線。標題不置中、段落不靠齊某一條看不見的頂邊、卡片不排成一列。
所有的形共用少數幾個斜角，讓整個畫面往同一個方向漂。當使用者找不到水平線的時候，
他就只能用「哪一塊比較大」來判斷遠近——這正是本風格唯一的深度線索。

**第三原則是：形不代表任何東西。**

至上主義的方塊不是窗、不是磚、不是按鈕的隱喻。它就是一塊有面積、有角度、有顏色的東西。
所以千萬不要把它畫成 icon，也不要替它加上意義。**它承載資訊的方式是「字印在它身上」或「字釘在它的邊上」，
不是「它長得像那件事」。**

**第四原則是：這是繪畫，不是製圖。**

沒有描邊、沒有刻度、沒有圖號、沒有等寬數字、沒有網格線。
如果你的畫面上出現了 1px 的細線框、mono 字體的座標讀數或角標編號，你做的是工程製圖，不是至上主義。

---

## 二、色彩系統

至上主義的顏色是**不透明的顏料色**，不是螢幕的霓虹色。它們永遠平塗、永遠硬邊、永遠不混合。

| 色 | Hex | 角色 | 面積比 |
|---|---|---|---|
| 暖白 | `#F7F5F0` | **空間本身**（不是背景色） | 約 52% |
| 冷白 | `#E9ECEE` | 第二層空間：可操作區、卡片、表格底 | 約 14% |
| 淡藍白 | `#DCE3E9` | 第三層空間：最遠的形、停用態、未達成 | 約 6% |
| 黑 | `#101010` | **第一質量**：最大的塊、頁尾、正文 | 約 17% |
| 硃紅 | `#D6301C` | **第二質量**：現在、當前目標、拒絕、主要動作 | 約 8% |
| 群青 | `#24409A` | 第三質量：只給圓、focus ring、少數強調 | 約 2% |
| 灰 | `#A8A9A6` | 遠處、次要標籤、未啟用 | 約 1% |

**硬規則**

1. **三個白必須是三塊不同的空間，不是三個底色。**它們之間永遠是硬邊，中間不放線、不放陰影、不放漸層。
2. **不准有第四個彩色。**特別是黃色——黃＋紅＋藍＋黑＋白是包浩斯與風格派的配方，加了黃這個站就變成別人。
3. 硃紅只給「現在正在發生的事」。頁面上同時出現兩塊紅，就等於同時有兩個現在。
4. 群青的面積永遠最小，而且**優先給圓**（形狀詞彙裡唯一的曲線，配唯一的冷色）。
5. 零漸層、零陰影、零 `border-radius`（圓除外）、零 `border`、零 `opacity` 半透明疊色。

```css
:root{
  --w1:#F7F5F0; --w2:#E9ECEE; --w3:#DCE3E9;
  --ink:#101010; --red:#D6301C; --blue:#24409A; --grey:#A8A9A6;
}
*{border-radius:0}                 /* 圓以外一律沒有圓角 */
.mass{box-shadow:none;border:0;background-image:none}
```

---

## 三、字體系統

至上主義同代的印刷品用的是**幾何無襯線與粗黑體**：厚、寬、緊、全大寫。
本規格書用 **Archivo**（拉丁）＋ **Noto Sans TC**（中文），兩者的字碗都方、字重都上得去 900。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Noto+Sans+TC:wght@500;700;900&display=swap">
```

| 用途 | 設定 |
|---|---|
| 大標 h1 | `font:900 clamp(40px,7.4vw,88px)/0.95 Archivo; letter-spacing:-.035em` |
| 中標 h2 | `font:900 clamp(24px,3.4vw,38px)/1.08; letter-spacing:-.02em` |
| 小標 h3 | `font:900 19px/1.4` |
| 標籤 `.tag` | `font:700 11px/1.4; letter-spacing:.24em; text-transform:uppercase` |
| 內文 | `font:500 16px/1.85 "Noto Sans TC"` |
| 數字 | 與內文同一套字，`font-variant-numeric:tabular-nums`，**不用等寬字體** |

**規則**

- 拉丁字一律大寫、字距 `.09em` 以上；中文標題用 900、字距 `-.02em`。
- **不准用 mono 字體。**等寬數字是工程製圖的語彙，會把整個風格拉走。
- 標題的字級不是階層，是**質量**：大標之所以大，是因為它是畫面上最近的那一塊。

---

## 四、版面與網格

**沒有網格。**有的是一組允許角度與一條主軸。

```css
:root{ --a1:-24deg; --a2:-66deg; --a3:12deg; --a4:24deg; --a5:66deg; }
```

- 全站所有旋轉元素只能用這五個角度之一，**沒有第六個**。`--a1:-24deg` 是主軸。
- 每一個構圖裡**必須有一條沿主軸貫穿整個畫面、兩端被畫布切斷的細長條**。它是把所有形綁在一起的東西。
- 內容區塊不置中：用 `margin-left:0 / 8% / 18%` 三段錯落（`.off1/.off2/.off3`），窄螢幕才收齊。
- 文字欄寬 `max-width:58ch`；表格不用框線，用 `border-top:2px solid var(--ink)` 當分隔質量。
- 留白率高（≥55%），但**留白不是呼吸，是空間**——不要靠加大 padding 來製造留白，要靠把形往邊緣推、讓它們被畫布切斷。

---

## 五、元件配方

**質量 mass（唯一的圖像原語）**

```css
.m{position:absolute;display:block}                 /* 外框：不旋轉，供錨定用 */
.m>i{display:block;width:100%;height:100%;
     background:var(--c,var(--ink));
     transform:rotate(var(--r,0deg));transform-origin:50% 50%}
.m.dot>i{border-radius:50%}
```
外層不旋轉、內層才旋轉，是為了讓 CSS anchor positioning 的錨定框保持軸對齊（見第十二章）。

**導覽（axis-align 對軸）**：四頁＝四條細長條，現用頁那一條是**唯一與主軸平行的**，其餘歪斜。
現用態不靠高亮，靠對齊。

```css
.axis .b{height:4px;width:46px;background:var(--grey);transform:rotate(var(--k));transform-origin:100% 50%}
.axis li:nth-child(1) .b{--k:41deg}  .axis li:nth-child(2) .b{--k:-58deg}
.axis li:nth-child(3) .b{--k:73deg}  .axis li:nth-child(4) .b{--k:-9deg}
.axis li.on .b{width:96px;background:var(--ink);--k:var(--a1)}   /* 對軸 */
```

**按鈕**＝一塊有字的質量，不是元件：`background:var(--ink);color:var(--w1);padding:13px 24px;border:0`，
hover 換成 `var(--red)`。幽靈款用 `box-shadow:inset 0 0 0 3px var(--ink)`，**不要用 `border`**（border 會參與 layout，
而質量不應該有厚度的概念）。

**表單**：欄位底色 `--w2`、只有一條 `border-bottom:3px solid var(--ink)`，focus 時換紅。
錯誤訊息是一塊紅色實心區塊壓在欄位下面，不是紅字加驚嘆號 icon。

**頁尾**＝一塊佔滿寬度的黑質量，上緣壓一條 9px 的紅條。

---

## 六、動效規則

至上主義的畫是靜的，但**網頁不是畫**——這個風格在螢幕上的正確延伸是「形在飄」。四種動效缺一不可。

| 種類 | 名稱 | 觸發 | 參數 |
|---|---|---|---|
| ambient 環境 | `layer-drift` 空層漂移 | 無需輸入，持續 | `@keyframes drift{to{transform:translate(46px,-20px)}}`；三層各 34s／52s／76s，`linear`，`alternate`。**速度與圖層深度成正比**——近的快、遠的慢，這是唯一的深度動線索 |
| input-driven 輸入 | `attitude` 姿態 | `pointermove`／傾斜 | 游標離視窗中心的水平位移 → 側傾 ±4.2°，一階低通 `bank += (target-bank)*0.09`，實際回饋延遲 < 100ms |
| transition 轉場 | `recompose` 重新構圖 | 狀態切換 | 同文件 View Transitions：`document.startViewTransition()`，`view-transition-name` 掛在會變的那一塊上，讓它**形變**而不是淡入淡出；`animation-duration:220ms` |
| signature 簽名 | **`no-up` 無上下** | 常駐＋輸入 | 整個構圖繞著觀看者旋轉，而觀看者永遠不動：`--th = 2.1·sin(t/17) + 0.5·sin(t/6.3) + bank`，套在 `.noup{transform:rotate(var(--th))}` 上。畫面上因此永遠沒有一條穩定的水平線 |

**`prefers-reduced-motion` 降級（四種都要，且資訊零損失）**

```css
@media (prefers-reduced-motion:reduce){
  .layer{animation:none}                 /* 漂移停在起始位置 */
  .noup{transform:none !important}       /* 旋轉歸零 */
  .m>i{transition:none}
  ::view-transition-old(root),::view-transition-new(root){animation:none}
}
```
四種動效沒有一種承載資訊：旋轉角、漂移位移、側傾都不編碼任何數值，全部關掉後版面內容完全相同。

**禁止**：淡入進場當主打、滾動視差、數字計數、按壓硬陰影、`stroke-dashoffset` 描繪、跑馬燈。

---

## 七、插畫與圖像風格

技法名稱：**quadrilateral-mass 四邊形質量構成**。全站沒有一張外部圖片、沒有一張描物件外形的插圖。
所有圖像（logo、favicon、24 張隊形圖、紀錄卡、回執印記）都由同一支引擎輸出，原語只有四種：

1. **四邊形**：長寬比 1.3–2.6 的矩形，旋轉角取自五個允許角之一。
2. **正圓**：唯一的曲線，永遠是群青，永遠只有一個。
3. **細長條**：高度 ≤ 寬度的 1/8；其中一條必須貫穿全幅並被畫布切斷。
4. **十字**：兩條細長條正交，只在需要標示「你在這裡」時使用。

判準：**拿掉全部顏色，仍讀得出哪一塊在前、整體往哪個方向飛。**

```js
// 一張構圖的最小骨架（SVG，size = 邊長）
function plate(size, pts, seed){
  const cx=size/2, cy=size/2, ANG=[-24,-66,12,24,66];
  let o=`<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;
  o+=`<rect width="${size}" height="${size}" fill="#E9ECEE"/>`;
  o+=`<rect x="${-size*0.3}" y="${cy-size*0.007}" width="${size*1.6}" height="${size*0.014}"
        fill="#101010" transform="rotate(-24 ${cx} ${cy})"/>`;        // 貫穿主軸
  const col=['#101010','#D6301C','#101010','#24409A','#A8A9A6'];
  pts.forEach((p,i)=>{
    const x=cx+p[0], y=cy+p[1], s=size*(0.148-0.014*i), a=ANG[(seed+i*3)%5];
    if(i===3) o+=`<circle cx="${x}" cy="${y}" r="${s*0.52}" fill="${col[i]}"/>`;
    else o+=`<rect x="${x-s*0.75}" y="${y-s*0.5}" width="${s*1.5}" height="${s}"
             fill="${col[i]}" transform="rotate(${a} ${x} ${y})"/>`;
  });
  return o+'</svg>';
}
```

**明文禁用**：細線幾何線描、半調網點、`feTurbulence` 手抖濾鏡、紙紋、寫實描繪、任何描邊（`stroke`）。

---

## 八、Logo 與 Favicon 設計指南

Logo **不是字標**，是一個構圖：暖白底、一塊黑四邊形（最大質量）、一條貫穿的紅細長條（主軸）、
一顆群青正圓、一到兩塊灰色遠景。品牌名以另一個 HTML 元素放在旁邊或印在黑塊上，不畫進 SVG 裡。

Favicon 用同一組規則縮到 64×64，但只留三件事：一條紅主軸、一塊黑四邊形、一顆藍圓。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23F7F5F0'/%3E%3Crect x='-6' y='29' width='76' height='5' fill='%23D6301C' transform='rotate(-24 32 32)'/%3E%3Crect x='16' y='14' width='30' height='22' fill='%23101010' transform='rotate(-24 31 25)'/%3E%3Ccircle cx='45' cy='47' r='7' fill='%2324409A'/%3E%3C/svg%3E">
```

---

## 九、本風格的 5 個不可省略特徵

> 這五項是「拿掉它就不是至上主義了」的程度。每一項都附可直接複製的片段。

### 特徵 1｜沒有地平線的白場（白是空間，不是背景）

零質感、零漸層、零陰影、零外框、零基線。任何一塊形都不「站」在任何東西上面。

```css
html,body{background:#F7F5F0}          /* 純色，不加 background-image */
body{box-shadow:none}
.void{position:relative;height:clamp(520px,78vh,720px);overflow:hidden;background:var(--w1)}
.void *{box-shadow:none !important;border:0 !important}
/* 三層白＝三層空間，彼此硬邊 */
.near{background:var(--w1)} .mid{background:var(--w2)} .far{background:var(--w3)}
```
**拿掉它會怎樣**：一旦白底鋪了紙紋或加了外框，畫面就有了「一張紙」的邊界，形變成貼在紙上的貼紙，
空間感消失，風格立刻掉回「北歐簡約／瑞士白底」。

### 特徵 2｜有限的形狀詞彙（四邊形、正圓、細長條、十字）

沒有曲線（正圓除外）、沒有描邊、沒有圓角、沒有 icon。

```css
.m>i{background:var(--c);transform:rotate(var(--r))}   /* 四邊形 */
.m.dot>i{border-radius:50%}                            /* 唯一的曲線 */
.bar{height:7px;width:min(76vw,640px);background:var(--ink)}   /* 細長條 */
.cross:before,.cross:after{content:"";position:absolute;background:var(--ink)}
.cross:before{left:50%;top:0;width:3px;height:100%;margin-left:-1.5px}
.cross:after{top:50%;left:0;height:3px;width:100%;margin-top:-1.5px}
```
**拿掉它會怎樣**：只要多了一個三角形、一條曲線或一枚圖示，畫面就變成「幾何插畫」——
包浩斯與孟菲斯都用三角形，至上主義不用。

### 特徵 3｜共享對角動勢（五個允許角＋一條貫穿主軸）

```css
:root{--a1:-24deg;--a2:-66deg;--a3:12deg;--a4:24deg;--a5:66deg}
.axisbar{position:absolute;left:-6%;top:63%;width:112%;height:clamp(11px,1.5vw,17px);
  background:var(--red);transform:rotate(var(--a1))}   /* 兩端必須被畫布切斷 */
```
規則：全站旋轉值只能是這五個之一；每一個構圖至少一條貫穿條；相鄰的兩塊不要用同一個角。
**拿掉它會怎樣**：形各轉各的角度，畫面立刻散成一堆隨機色塊，看起來像是程式亂數生成的，
而不是有人構圖過的。

### 特徵 4｜尺度即深度（沒有透視、沒有陰影、沒有模糊）

深度只由三件事表達：**大小、彩度、漂移速度**。

```css
.layer   {animation:drift 34s linear infinite alternate}          /* 近：大、實色、快 */
.layer.s2{animation-duration:52s;animation-direction:alternate-reverse}
.layer.s3{animation-duration:76s}                                  /* 遠：小、灰、慢 */
@keyframes drift{from{transform:translate(0,0)}to{transform:translate(46px,-20px)}}
```
**拿掉它會怎樣**：一旦加了投影或模糊，你就宣告了「有一個光源、有一個地面」——
那正是至上主義要取消的東西。

### 特徵 5｜文字是一塊質量（印在形上，或釘在形的邊上）

文字要嘛壓在色塊上成為它的一部分，要嘛以標籤形式**釘在色塊的某一條邊上**並隨它移動。
不置中、不加框、不獨立浮在白場中間。

```css
/* 印在形上 */
.m h1{position:absolute;left:9%;top:16%;width:84%;color:var(--w1);
  font:900 clamp(21px,2.9vw,34px)/1.06 Archivo;letter-spacing:-.02em;
  transform:rotate(var(--a1));transform-origin:0 0}

/* 釘在形的邊上（見第十二章的相容性處理） */
.lab{font:700 10.5px/1.35 Archivo;letter-spacing:.16em;text-transform:uppercase}
.pin{position:absolute;left:var(--fl);top:var(--ft)}          /* 保底 */
@supports (anchor-name:--x){
  #m3{anchor-name:--m3}
  .p3{position-anchor:--m3;top:anchor(top);left:calc(anchor(right) + 14px)}
}
```
**拿掉它會怎樣**：文字自己排成一欄置中的段落，畫面立刻分成「上面是構圖、下面是網頁」兩截，
風格只剩下裝飾。

---

## 十、Do & Don't

**Do**

- 讓形被畫布切斷。沒有一個構圖是「完整裝進畫框裡」的。
- 讓最大的那塊黑質量承載品牌名。
- 用三個白做出三層空間。
- 讓現用態靠**對齊／大小／位置**表示，不要靠加亮或加框。
- 資訊完整：地址、電話、價目、時刻、人名一應俱全——構圖再抽象，內容要具體。

**Don't**

- ❌ 加黃色（那是包浩斯／風格派）。
- ❌ 用正交的黑色格線分割畫面（那是蒙德里安／De Stijl）。
- ❌ 用照片蒙太奇、斜體大寫俄文標語、放射線與工程感圖表（**那是構成主義**：Rodchenko 與 Tatlin 是唯物的、要服務生產；
  至上主義是形而上的、不服務任何東西。這兩者最常被混為一談，請務必分開）。
- ❌ 用 mono 字體、刻度、圖號角標、量表（那是工程製圖）。
- ❌ 圓角卡片、模糊陰影、玻璃擬態、紫藍漸層。
- ❌ 置中大標＋副標＋兩顆按鈕＋三張卡片的模板。
- ❌ Lorem ipsum、emoji 當 icon、「EST. 19xx」徽章、「把 X 變成 Y」句式標題。
- ❌ 跑馬燈——這個風格的形是**飄**的，不是**捲**的。

---

## 十一、頁面骨架範例

```html
<body>
<nav class="axis" aria-label="主導覽">
  <ol>
    <li class="on"><a href="a.html" aria-current="page"><span class="n">空場 VOID</span><span class="b"></span></a></li>
    <li><a href="b.html"><span class="n">練習 EXERCISE</span><span class="b"></span></a></li>
  </ol>
</nav>

<main>
  <section class="void">
    <div class="noup" style="position:absolute;inset:0">
      <div class="layer">
        <div class="m" id="m1" style="left:6%;top:20%;width:31vw;height:17vw">
          <i style="--c:var(--ink);--r:var(--a1)"></i>
          <h1>零地平<br>跳傘學校</h1>
        </div>
        <div class="m" id="m2" style="left:-6%;top:63%;width:72vw;height:1.5vw">
          <i style="--c:var(--red);--r:var(--a1)"></i>
        </div>
        <div class="lab pin p1" style="left:6.5%;top:55%">屏東縣潮州鎮潮北路 271 號</div>
      </div>
      <div class="layer s2"> … 中景 … </div>
      <div class="layer s3"> … 遠景 … </div>
    </div>
  </section>

  <section class="sec wrap">
    <div class="tag">高度 / ALTITUDE</div>
    <h2 class="h2">五個空層</h2>
    <div class="off2 tx"> … </div>
  </section>
</main>

<footer><div class="fbar"></div><div class="wrap"> … </div></footer>
</body>
```

**重點**：標籤（`.lab.pin`）與它的錨（`.m`）必須放在**同一個 `.layer` 裡**——
`.layer` 因為有 `transform` 而成為絕對定位子孫的包含塊，兩者同在一個座標系，錨定關係才不會被漂移動畫扯開。

---

## 十二、技術實作與相容性

本站的三項核心技術，各自承載一個不可省略特徵，全部在 2026-08-18 查證過現況支援度。

### 12.1 CSS anchor positioning（C 版面與樣式層）— 承載特徵 5

**它承載什麼**：把標籤釘在質量的某一條邊上。用 JS 量位置會在每次漂移、每次縮放、每次字體載入完成後
重新 `getBoundingClientRect()`，是典型的 layout thrashing；用 `position-area`／`anchor()` 則由排版引擎直接解，零腳本。

**支援現況（2026-04 統計）**：Chrome／Edge 125+（2024-03 起）、Safari 26+（macOS Tahoe 26／iOS 26）、
Firefox 147+ 預設開啟（145–146 需開 `layout.css.anchor-positioning.enabled`）、Opera 111+、Samsung Internet 27+，
全球覆蓋約 **83%**。查證來源：MDN《position-anchor》、TestMu AI《CSS Anchor Positioning: Browser Support》。

**已知規格限制與本站的處理**

- `anchor()` 只在絕對／固定定位元素上生效，且錨與被錨定者要有共同的包含塊——本站把兩者放進同一個 `.layer`。
- 錨定框以錨元素的邊框盒解算。為了避免旋轉造成的錨定框膨脹，**本站的 `.m` 外層不旋轉，只有內層 `<i>` 旋轉**。
- `@position-try` 與 `position-area` 簡寫在部分版本仍在補完，本站**只用 `anchor(top/right/bottom/left)`** 這一組基本能力。

**Fallback 具體行為**：`.pin` 的基準宣告是純百分比的 `left/top`（建置階段就算好並寫進 inline style），
`position-anchor` 與 `anchor()` 只寫在 `@supports (anchor-name:--x){}` 內。
不支援的瀏覽器看到的是同一組標籤、同一個位置、同樣的文字，**只是漂移時標籤與質量的相對位置會有幾個像素的誤差**，資訊零損失。

### 12.2 DeviceOrientationEvent（D 輸入與感測層）— 承載簽名動效與核心操控

**它承載什麼**：在自由落體裡，你唯一能控制的是身體的姿態。把「裝置的姿態」直接接成「身體的姿態」，
是這個題材唯一誠實的輸入方式——你不是在按方向鍵，你是在把自己側過去。

**支援現況**：`DeviceOrientationEvent` 介面本身 MDN 標示為 well established、2023-09 起跨瀏覽器可用。
但 **`DeviceOrientationEvent.requestPermission()` 是 limited availability 的實驗性靜態方法**（Safari／iOS 13+ 才有），
且**只能在安全上下文（HTTPS）中、由使用者手勢觸發**（transient activation）。
查證來源：MDN《Device orientation events》、MDN《DeviceOrientationEvent.requestPermission()》、W3C《Device Orientation and Motion》。

**Fallback 具體行為**（三層，任何裝置都玩得完整）

1. 沒有 `window.DeviceOrientationEvent` → 介面直說「這個裝置沒有方向感測器」，改用游標。
2. 有 `requestPermission` 但被拒絕 → 直說沒有取得權限，改用游標或方向鍵。
3. 完全沒有指標裝置（純鍵盤／輔助技術）→ 方向鍵可完成同一件事；另備「請教練代跳」按鈕，
   用同一組物理與同一個決定性亂數跑完整趟，非指標使用者一樣看得到完整流程與紀錄卡。

`beta/gamma` 轉姿態時取 `gamma/30`、`(beta-42)/30` 並鉗制到單位圓內——42° 是手持看螢幕的自然俯角，不是 0。

### 12.3 同文件 View Transitions（B 動效與時間軸層）— 承載轉場動效

**它承載什麼**：狀態切換時讓構圖**重新構圖**而不是重畫。換隊形時那張構圖裡的每一塊各自飛到新位置；
接手成功時那一塊從灰變成實色並就地形變；跳完時整個空層形變成紀錄卡。
沒有這個 API，就只能做淡入淡出——而淡入淡出在這個風格裡是被禁止的。

**支援現況**：同文件（same-document）View Transitions 為 Chrome／Edge 111+、Safari 18+、Firefox 132+，
自 2025-10 起 `ViewTransition` 介面在最新版瀏覽器全面可用。
（跨文件 cross-document 版本另計：Chrome 126+／Safari 18.2+，Firefox 仍在旗標後，本站**不使用**跨文件版本。）
查證來源：MDN《View Transition API》、CSS-Tricks《Cross-Document View Transitions: The Gotchas Nobody Mentions》。

**Fallback 具體行為**：所有呼叫都寫成
```js
if(document.startViewTransition && !reduceMotion) document.startViewTransition(update); else update();
```
不支援時 `update()` 直接執行，DOM 結果完全相同，只是沒有形變過程。`prefers-reduced-motion` 走同一條路徑。

### 12.4 效能預算實測值

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS／JS／SVG） | ≤ 350KB | index 28.8KB／fall 35.8KB／zhentu 49.9KB／bao 28.9KB |
| 外部資源 | 僅 Google Fonts | 僅 Google Fonts（零外部圖片、零音檔、零函式庫） |
| 構圖引擎（24 張隊形圖一次全出） | — | **0.137 ms**／次（Node 22 單執行緒，100 次平均） |
| 操控積分（每幀） | — | **0.000013 ms**／步（600,000 步 7.6ms） |
| 每幀 DOM 寫入 | 無 layout thrashing | 每幀只寫 `#world` 一次 `transform` ＋ 姿態條一次 `transform`／`width`，**零 `getBoundingClientRect()`**（只在 `resize` 時量一次） |
| 首屏 JS | ≤ 100ms | 首屏只做：讀 URL 參數、算今日隊形、輸出一張 200px 構圖、掛事件；主要成本即上表的 0.137ms 級 |

**無 JavaScript 時**：四頁的全部資訊（校名、地址、電話、價目、梯次、五個空層、24 個隊形的幾何與跨距、
手冊全文、報名條件）都是靜態 HTML；24 張隊形圖與首頁構圖在建置階段就以同一支引擎輸出成靜態 SVG／HTML。
唯一無法在無腳本環境下進行的是「六十二秒」本身——它需要即時輸入——該頁因此另備一張列出全部物理參數的表格。

---

*本規格書描述的流派為既有的俄國至上主義（1915–1927），非本館自創。示範站的校名、人物、地址、電話、
價目、隊形代號與所有數字皆為虛構教學示意。*
