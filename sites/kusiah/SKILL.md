---
name: punk-xerox-ransom
description: Punk Xerox — 1977 photocopier zine aesthetic: ransom-note lettering cut from other pages, 1-bit blown-out threshold imagery, fluorescent copy stock as the only source of colour, misaligned paste-up, and cumulative generational decay.
---

# 龐克剪貼 Punk Xerox — 影印世代退化風格規格書

## 一、設計哲學

一九七六年到一九七九年之間，倫敦與紐約的樂團傳單、唱片封套與小誌不是設計出來的，是**組裝**出來的。設計者手上只有三樣東西：別人的印刷品、一把美工刀、一台全錄影印機。字從報紙上剪下來（Jamie Reid 為 Sex Pistols〈God Save the Queen〉做的綁架信標題），照片被影印到只剩黑與白（Mark Perry 的《Sniffin' Glue》），顏色來自你手上那疊螢光影印紙而不是來自油墨（Crass 的黑白拼貼與地下 distro 的粉紅傳單）。

這個風格的核心不是「粗糙」，而是**製程本身被留在成品上**。它有三個誠實之處，全部要保留：

1. **東西是剪下來的**——所以每一塊都有邊，而且邊是撕的、是切歪的。
2. **只有一種墨**——碳粉黑。其他顏色都是「紙」的顏色。要換色，你得換一張紙，而紙有厚度、會投下硬邊的影子、會蓋住底下那張。
3. **它是複本的複本**——第 n 代影印。細線先死，黑塊互相黏死，紙緣長出掃描黑框與碳粉屑。

做這個風格最常見的失敗是把它做成「亂」。它不亂：綁架信的每一個字都對得上一條讀得出來的行，貼版有中心，資訊層級極清楚。**它只是拒絕對齊到像素。**

> 去 AI 化立場：本風格明文禁用漸層、圓角、模糊陰影、置中三卡片與 emoji icon。它們不只是「不好看」，是製程上不可能——影印機做不出漸層，美工刀切不出圓角，一張紙壓在另一張紙上不會產生高斯模糊。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是龐克剪貼了。每一項附可直接複製的片段。

### 特徵 1｜綁架信剪字（ransom-note lettering）

標題不是一行字，是**一排各自從不同地方剪下來的字塊**。每個字要有自己的：字體、字級、傾角、底紙顏色、撕邊、硬邊投影，以及一個不對齊的基線。字距刻意負值讓紙塊互相壓一點。

```css
.cut{
  --cbg:var(--paper2); --csh:var(--toner);
  display:inline-block; line-height:1;
  padding:.05em .3em .13em .16em; margin:0 -.02em;      /* 負字距＝紙塊互相壓住 */
  /* 每個字塊也有 clip-path（撕邊），所以影子同樣畫在裡面，見特徵 3 */
  background-color:var(--csh);
  background-image:linear-gradient(var(--cbg),var(--cbg));
  background-repeat:no-repeat;
  background-size:calc(100% - 2px) calc(100% - 2px);
  transform:translateY(var(--y)) rotate(var(--r)) scale(var(--s));
}
.cut.f-a{font-family:"Noto Sans TC";font-weight:900}
.cut.f-b{font-family:"Noto Serif TC";font-weight:900}
.cut.f-c{font-family:"Courier Prime";font-weight:700}
.cut.f-d{font-family:"Noto Serif TC";font-weight:700;font-style:italic}
.cut.f-e{font-family:"Archivo Black"}
.cut.s-pk{--cbg:var(--pk)} .cut.s-yl{--cbg:var(--yl)}
.cut.s-k{--cbg:var(--toner);--csh:var(--pk);color:var(--paper2)}   /* 反白的那一塊 */
```

每個字塊的 `clip-path` 用同一支 `torn()` 產生器，振幅放大到 2.6%（字小，撕痕要更明顯才看得到）。

參數範圍（超出就變成「裝可愛」）：`--r` ±6deg、`--y` ±4px、`--s` 0.86–1.20、字體最少 4 種、底紙最少 3 種、反白塊出現率約 1/6。**一定要決定性生成**（同一句話永遠得到同一排剪字），否則每次重整版面都在跳，讀者會以為壞了。

```js
// FNV-1a → mulberry32：同字串恆得同結果
function fnv(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h>>>0}
function mul(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
```

**只給標題與識別號用，不要給正文用。**正文一旦剪字就讀不了，而龐克小誌的正文是打字機打的、規規矩矩的。

### 特徵 2｜1-bit 影印閾值化（blown-out photocopy threshold）

畫面上沒有灰階，只有純黑與純白。中間調靠**方格抖動**（影印機是方格網點，不是圓點半調）。造形先以平滑向量畫出，再過一條濾鏡鏈：模糊 → 對 alpha 做離散閾值 → 形態學膨脹。細線在模糊後掉到閾值以下就消失，粗塊被膨脹咬在一起。

```html
<filter id="xz" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="0.10" result="b"/>
  <feComponentTransfer in="b" result="t">
    <feFuncA type="discrete" tableValues="0 0 0 1 1 1 1 1"/>   <!-- 閾值 = 3/8 -->
  </feComponentTransfer>
  <feMorphology in="t" operator="dilate" radius="0"/>
</filter>
```

```css
.xz{filter:url(#xz)}
```

方格抖動（Bayer 4×4，格子邊長 3–5px，不要更細，細了就變成灰）：

```js
const B=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
function dither(x,y,w,h,level,cell=4){let s='';
  for(let j=0;j<Math.ceil(h/cell);j++)for(let i=0;i<Math.ceil(w/cell);i++)
    if(B[j&3][i&3] < level*16) s+=`<rect x="${x+i*cell}" y="${y+j*cell}" width="${cell}" height="${cell}"/>`;
  return s}
```

**禁用**：圓點半調（那是普普藝術與報紙）、feTurbulence 手抖邊（那是迷幻海報，而且會糊掉字緣）、任何 opacity 介於 0 與 1 之間的灰。

### 特徵 3｜紙色即彩色，撕邊與硬邊影子（stock colour, torn edge, hard shadow）

**全站只有一種墨。**所有彩色都是紙的顏色。因此每一塊顏色一定是一張**有邊界、有厚度、會壓住底下**的紙：四邊是撕的，投影是 4–8px 的實心位移色塊。

**這裡有一個一定會踩到的坑：`clip-path` 會把 `box-shadow` 一起裁掉。**（`filter:drop-shadow()` 也救不了——CSS 的繪製順序是先 filter 再 clip，影子照樣被切。）所以撕邊元件的硬邊影子必須**畫進元素裡面**：底層 `background-color` 塗影子色，上層 `linear-gradient` 塗紙色但縮小 6px，右下就露出一條實心色帶。副作用剛好是對的——**撕破的紙，影子也是撕破的。**

```css
.sh{                                   /* 一張紙 */
  --bg:var(--paper2); --shd:var(--toner);
  background-color:var(--shd);
  background-image:linear-gradient(var(--bg),var(--bg));
  background-repeat:no-repeat;
  background-size:calc(100% - 6px) calc(100% - 6px);   /* 右下露出 6px 實心影子 */
  padding:18px 26px 28px 20px;                          /* 右下多留給影子帶 */
  color:var(--toner);
  /* clip-path 由撕邊產生器給，見下 */
}
.sh.pk{--bg:var(--pk)} .sh.yl{--bg:var(--yl)}
.sh.k {--bg:var(--toner);--shd:var(--pk);color:var(--paper2)}
```

**沒有撕邊的元件（按鈕、導覽、輸入框）才用真的 `box-shadow:4px 4px 0`。**這個分工本身也是規格：撕的東西影子是撕的，切的東西影子是直的。

撕邊產生器（四邊各以 7 段噪聲折線取代直線，振幅 1.5–2.6%）：

```js
function torn(seed,amp=1.8){const R=mul(fnv('torn'+seed)),p=[],N=7;
  for(let i=0;i<N;i++)p.push([i*100/N, Math.abs(R()*amp)]);
  for(let i=0;i<N;i++)p.push([100-Math.abs(R()*amp), i*100/N]);
  for(let i=N;i>0;i--)p.push([i*100/N, 100-Math.abs(R()*amp)]);
  for(let i=N;i>0;i--)p.push([Math.abs(R()*amp), i*100/N]);
  return 'polygon('+p.map(q=>q[0].toFixed(1)+'% '+q[1].toFixed(1)+'%').join(',')+')'}
```

**禁用**：`border-radius` 任何非零值、帶模糊半徑的陰影、rgba 陰影、真正有色階變化的漸層（放射／圓錐／多色停點）。

### 特徵 4｜歪斜貼版（misaligned paste-up）

畫面上不該有任何一塊與畫布正交。紙片以 ±7deg 亂數旋轉、互相重疊、切斷彼此的欄。導覽、卡片、按鈕全部帶 1–3deg 的歪。重點在於**歪是有秩序的**：旋轉來自同一顆決定性亂數，所以每次載入都一樣，讀者建立得起空間記憶。

```css
.nv{transform:rotate(-1.2deg)}
.nv:hover{transform:rotate(-2.6deg) translate(-2px,-2px)}
.pc{transform:rotate(var(--rr))}      /* --rr 由 seed 產生，±7deg */
```

配套：**互動不用滑順補間，只用 `steps()`。**影印機沒有中間狀態。

```css
.chk{transition:transform 90ms steps(2)}
.pc {transition:transform 120ms steps(2)}
@keyframes jit{50%{transform:translateY(calc(var(--y) - 2px)) rotate(var(--r)) scale(var(--s))}}
.cut:hover{animation:jit 180ms steps(2) 2}
```

### 特徵 5｜世代退化（generational decay）

這一項把前四項綁在一起。母版影印一次是第一代，用第一代再影印是第二代——每一代都：模糊變重、閾值把更多細節推掉、碳粉膨脹半徑變大、紙緣長出掃描黑框、隨機碳粉屑增加。**沒有這一項，前四項只是「風格化的乾淨畫面」。**

以世代 g（1–6）驅動五個參數：

| g | feGaussianBlur σ | feMorphology radius | 閾值 tableValues | 掃描黑邊 | 碳粉屑數 |
|---|---|---|---|---|---|
| 1 | 0.10 | 0    | `0 0 0 1 1 1 1 1` | 0px  | 0 |
| 2 | 0.30 | 0.15 | `0 0 0 1 1 1 1 1` | 3px  | 6 |
| 3 | 0.55 | 0.30 | `0 0 0 0 1 1 1 1` | 6px  | 14 |
| 4 | 0.85 | 0.50 | `0 0 0 0 1 1 1 1` | 10px | 24 |
| 5 | 1.20 | 0.75 | `0 0 0 0 1 1 1 1` | 15px | 36 |
| 6 | 1.60 | 1.05 | `0 0 0 0 1 1 1 1` | 21px | 50 |

```js
const SIG=[.10,.30,.55,.85,1.20,1.60], DIL=[0,.15,.30,.50,.75,1.05],
      BAND=[0,3,6,10,15,21], SPK=[0,6,14,24,36,50];
function applyGen(g){const i=g-1, r=document.documentElement;
  r.style.setProperty('--gen',g);
  r.style.setProperty('--band',BAND[i]+'px');
  document.getElementById('xz-blur').setAttribute('stdDeviation',SIG[i]);
  document.getElementById('xz-dil').setAttribute('radius',DIL[i]);
  document.getElementById('xz-fn').setAttribute('tableValues', g<=2?'0 0 0 1 1 1 1 1':'0 0 0 0 1 1 1 1');
}
```

```css
.band{position:fixed;inset:0;pointer-events:none;box-shadow:inset 0 0 0 var(--band) var(--toner)}
```

**兩條硬規則，違反就是不可用的網站：**

1. **只有裝飾與插圖退化。**正文、價目、電話、時間、表單標籤永遠是第一代的一般 HTML 文字。
2. **一定要給退回第一代的方法**（「重新製版」）與**完全關掉的方法**（「停在第一代」），而且要在畫面上一直看得到目前是第幾代。

---

## 三、色彩系統

一種墨，四種紙。**面積比例是規格的一部分**，不是建議。

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 影印紙灰白 `--paper` | `#DEDBD2` | 全站地色（body）。它不是白，是走過影印機的紙 | 約 42% |
| 碳粉黑 `--toner` | `#141216` | **唯一的墨**：全部文字、線、圖、投影、反白塊底 | 約 26% |
| 螢光粉紙 `--pk` | `#FF2E7A` | 第二張紙：主要動作、現用態、被拒絕的事、警示 | 約 18% |
| 螢光黃綠紙 `--yl` | `#DFEB2B` | 第三張紙：hover、被選中的事、成立的結果 | 約 10% |
| 未印紙白 `--paper2` | `#F2F0E8` | 貼在地色上的乾淨紙片、撕邊露出的紙芯 | 約 4% |
| 頁尾黑 `--dark` | `#0C0B0E` | 只給 footer 一塊滿版 | ≤3% |

規則：

- **禁止把 `--pk` 或 `--yl` 當文字色。**它們是紙，不是字。要強調就把整塊紙換成那個顏色，字仍然是碳粉黑。
- 粉與黃綠**永遠不直接相鄰**；中間必隔一條碳粉黑（邊框、投影或另一張紙的邊）。
- 零漸層、零透明色、零混色。要「淡一點」就用抖動網點，不用 opacity。
- 深色文字塊（`.sh.k`）的投影用 `--pk` 而非黑，這是唯一的例外。

與其他高飽和風格的差別：普普／Y2K 是「多種墨壓在一塊主導底色上」；本風格是「一種墨壓在多張不同顏色的紙上」。判斷方法很簡單——**畫面上每一塊彩色都應該找得到它的四個邊**。

---

## 四、字體系統

小誌沒有字型預算，有什麼用什麼——所以**混用是規格，不是妥協**。

```
Noto Sans TC   400 / 700 / 900   正文、剪字 f-a
Noto Serif TC  700 / 900         剪字 f-b / f-d（斜體）、大數字
Courier Prime  400 / 700         全部編號、件號、統計數字、剪字 f-c（打字機＝小誌正文的原型）
Archivo Black  400               全部拉丁小標籤、kicker、頁尾識別（剪字 f-e）
```

字級 scale（16px 基準）：

| 角色 | 字級 | 字重 | 行高 | 字距 |
|---|---|---|---|---|
| h1（剪字） | `clamp(30px,7vw,62px)` | 900 | 1.15 | 0 |
| h2（剪字） | `clamp(23px,4.4vw,38px)` | 900 | 1.15 | 0 |
| h3 / 紙片標題 | 17–19px | 900 | 1.25 | .06em |
| 正文 | 16px（手機 15.5px） | 400 | **1.72** | .01em |
| lead 引言 | 18px | 400 | 1.72 | .01em |
| 紙片內文 `.b` | 14px | 400 | 1.65 | .01em |
| kicker（Archivo Black） | 11px | 400 | 1 | **.24em** |
| mono 數字 | 12–13px | 400/700 | 1.5 | 0 |

正文行高 1.72 是刻意的：畫面上所有東西都在互相壓，只有正文區必須寬鬆到讀得下去。**這是本風格唯一「安靜」的地方，不要把它也弄歪。**

---

## 五、版面與網格

- 外框 `max-width:1080px`，左右 padding 22px（手機 15px）。
- **內容用 CSS Grid `auto-fill minmax(248px,1fr)`，但每一塊都帶自己的旋轉與撕邊**——網格負責不撞在一起，旋轉負責看起來不是網格。
- 章節間距 64px，章節之間可用 `border-top:5px solid var(--toner)` 這一種分隔線（**只有一種粗線，沒有細線**）。
- 旋轉角度：紙片 ±7deg、導覽 −1.2deg（現用態回正並下沉 3px）、按鈕 0deg（按鈕要好按）。
- **留白率 30–45%**：地色要看得見，這是與「多色描邊滿載」那類 maximalism 的分界。
- 直排字條（`writing-mode:vertical-rl`）是可選的第二種碎片，用在標題旁；手機退回橫排。

### 開場原型：紙疊（stack-first）

首屏不是主視覺，是**一疊互相遮蔽的紙**。十四張大小不一、角度不一，只露出被壓住的那一條邊。點任何一張把它抽到最上面（z 序重排＝資訊可見性的操作）。

可用性保底是規格的一部分：**紙疊下方必須有「攤開這一疊」區塊，把同樣十四張以一般網格完整排一次**，沒有 JavaScript 也讀得完。

```css
.stack{position:relative;height:640px}
.stack .pc{position:absolute;transition:transform 120ms steps(2)}
.stack .pc:hover{transform:translate(-4px,-6px) rotate(var(--rr))!important}
@media(max-width:900px){                       /* 手機：疊變成排 */
  .stack{height:auto;display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .stack .pc{position:static!important;width:auto!important}
}
```

### 導覽原型：釘書針裝訂（staple-bind）

四頁＝四枚釘書針。現用頁那一枚是**被釘進去的**（兩腳折平、壓進紙裡、有內陰影與壓痕）；其餘三枚是**還放在紙上沒釘下去的**（腳張開、浮著、有位移硬影、歪 −4deg）。語意是「裝訂完成與否」，不是高亮。

---

## 六、元件配方

```css
/* 導覽 */
.nv{display:flex;align-items:center;gap:9px;padding:9px 15px 10px;
    background:var(--paper2);box-shadow:4px 4px 0 var(--toner);
    font-weight:900;font-size:15px;letter-spacing:.05em;transform:rotate(-1.2deg);
    transition:transform 90ms steps(2);text-decoration:none;color:var(--toner)}
.nv:hover{transform:rotate(-2.6deg) translate(-2px,-2px);background:var(--yl)}
.nv[aria-current=page]{background:var(--toner);color:var(--paper2);
    box-shadow:inset 3px 3px 0 rgba(255,255,255,.14);transform:rotate(0) translateY(3px)}

/* 按鈕：位移＝被按下去，不是變暗 */
.btn{font-weight:900;letter-spacing:.05em;border:0;padding:11px 18px;cursor:pointer;
     background:var(--pk);color:var(--toner);box-shadow:4px 4px 0 var(--toner);
     transition:transform 90ms steps(2)}
.btn:hover{transform:translate(-3px,-3px);background:var(--yl)}
.btn.k{background:var(--toner);color:var(--paper2);box-shadow:4px 4px 0 var(--pk)}

/* kicker 小標籤 */
.kicker{font-family:"Archivo Black";font-size:11px;letter-spacing:.24em;
        background:var(--toner);color:var(--paper2);display:inline-block;padding:4px 10px}

/* 表單：外框用 inset box-shadow，不用 border（border 會被 clip-path 切掉） */
.fm input,.fm select,.fm textarea{
  font:inherit;width:100%;background:var(--paper2);border:0;
  box-shadow:inset 0 0 0 3px var(--toner);padding:9px 11px}
.fm input:focus{outline:0;background:var(--yl)}
.err{background:var(--pk);font-weight:900;font-size:13.5px;padding:5px 9px;
     box-shadow:2px 2px 0 var(--toner);display:none}
.err.on{display:block}

/* 表格：表頭是一條黑帶，格線只有一種粗細 */
th{font-weight:900;background:var(--toner);color:var(--paper2);border-bottom:0}
td{border-bottom:2px solid var(--toner)}

/* 頁尾：滿版黑，連結用黃綠 */
.ft{background:var(--dark);color:var(--paper2)}
.ft a{color:var(--yl)} .ft h3{color:var(--pk);letter-spacing:.1em;font-size:14px}
```

---

## 七、動效規則

**四種，缺一不可**，全部用 `steps()`，全部有 `prefers-reduced-motion` 降級且資訊零損失。

| 種類 | 內容 | 觸發 | duration / easing |
|---|---|---|---|
| ambient 環境 | 碳粉顆粒每 900ms 跳一格（三格循環），密度隨世代增加 | 無需輸入 | `900ms steps(3) infinite` |
| input 輸入 | 抽紙：點一張紙 → 位移 (−4,−6)px 並抬到最上層；剪字 hover 跳 2px；按鈕位移 (−3,−3)px | 點擊／hover，延遲 <100ms | `90–120ms steps(2)` |
| transition 轉場 | 掃描光帶：26px 白帶由上而下分 18 段走完，走完世代 +1 | 進入任一頁 | `620ms steps(18) forwards` |
| **signature 簽名** | **世代退化**：每一次跨頁，全站裝飾圖像的影印代數 +1（見特徵 5） | 瀏覽行為本身 | 立即，非補間 |

```css
@keyframes grainshift{to{background-position:320px 320px}}
.grain{animation:grainshift 900ms steps(3) infinite}
@keyframes scanpass{from{transform:translateY(-26px)}to{transform:translateY(102vh)}}
.scan{position:fixed;left:0;right:0;top:0;height:26px;background:var(--paper2);
      animation:scanpass 620ms steps(18) forwards;pointer-events:none;z-index:70}

@media (prefers-reduced-motion:reduce){
  .grain{animation:none}          /* 顆粒停在第一格，密度不變 */
  .scan{display:none}             /* 不播掃描帶，世代照樣 +1，資訊零損失 */
  .cut:hover{animation:none}
  *{transition-duration:1ms!important}
}
```

**明文禁用**：淡入、滑順 ease/cubic-bezier、視差、彈簧、任何補間中的中間狀態。理由不是「怕俗」，是製程——影印機的按鈕沒有 ease-out。

---

## 八、插畫與圖像風格：世代網點剪貼（generation-halftone collage）

全站零外部圖片。四種原語，全部再過特徵 2 的濾鏡鏈：

1. **閾值化黑塊**：任何造形先以平滑貝茲／基本形畫出，再過濾鏡變成只有黑白兩階的塊。線寬下限 **6px**（更細的線在第三代就消失了——那正是規格要的，但如果它承載資訊就不能用細線）。
2. **方格抖動階調**：中間調一律 Bayer 4×4、格子 3–5px。
3. **撕邊紙片**：見特徵 3。
4. **剪字方塊**：見特徵 1，也用在插圖內部（小誌封面）。

判準：**拿掉顏色，仍讀得出哪一塊是紙、哪一塊是碳粉、以及這是第幾代。**

明文禁用：寫實描繪、細線幾何線描（thin-lineart）、圓點半調、feTurbulence 手抖濾鏡、任何 3D 或透視陰影。

---

## 九、Logo 與 Favicon

**Logo** = 品牌名的每一個字剪成一塊獨立的紙，各自不同底色與傾角，上方橫壓一根釘書針。不要做成一個圖形符號——龐克剪貼的識別本身就是「字被剪下來重排」這個動作。

```html
<svg viewBox="0 0 134 40"><g filter="url(#xz)">
  <rect x="0" y="4" width="32" height="31" fill="var(--toner)"/>   <!-- 影子先畫 -->
  <rect x="2" y="2" width="32" height="31" fill="var(--pk)"/>      <!-- 紙後畫 -->
  <text x="18" y="26" font-family="Noto Serif TC" font-weight="900" font-size="24"
        text-anchor="middle" fill="var(--toner)">歹</text>
  <!-- …其餘三塊各換底紙與傾角… -->
  <rect x="30" y="0" width="24" height="5" fill="var(--toner)"/>   <!-- 釘書針冠 -->
  <rect x="30" y="0" width="5"  height="12" fill="var(--toner)"/>
  <rect x="49" y="0" width="5"  height="12" fill="var(--toner)"/>
</g></svg>
```

**Favicon**（inline SVG data URI，16px 下仍讀得出來的三塊）：一塊螢光粉底、一塊碳粉黑、兩三塊反白方塊、上方一根釘書針。禁止在 favicon 裡放細節或文字。

---

## 十、Do & Don't

**Do**

- 決定性亂數：同一段文字永遠得到同一排剪字、同一條撕邊。
- 每一塊彩色都找得到四個邊。
- 投影一律 `Npx Npx 0 <實色>`。
- 互動只用 `steps()`。
- 正文乾淨、寬鬆、絕不剪字。
- 把製程寫在頁面上（「這張紙也是影印的」）——這個風格允許、甚至要求自我指涉。
- 世代退化一定要能重置與關閉，而且代數要一直看得見。

**Don't**

- ❌ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ❌ 任何 `border-radius`、模糊陰影、`rgba` 陰影、漸層、opacity 灰（`linear-gradient` 只准當成「一塊實色」用，見特徵 3）
- ❌ 用螢光色當文字色
- ❌ emoji 當 icon
- ❌ 把粉與黃綠直接相鄰
- ❌ 圓點半調、細線線描、寫實插畫
- ❌ 亂數不決定性（每次重整都跳）
- ❌ 讓正文、價格、電話、時間跟著世代退化
- ❌ Lorem ipsum、「在當今快節奏的世界」、「把 X 變成 Y」句式、EST. 19xx 徽章

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Courier+Prime:wght@400;700&family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
<style>
:root{--paper:#DEDBD2;--paper2:#F2F0E8;--toner:#141216;--pk:#FF2E7A;--yl:#DFEB2B;--dark:#0C0B0E;--gen:1;--band:0px}
body{background:var(--paper);color:var(--toner);font-family:"Noto Sans TC",sans-serif;line-height:1.72;margin:0}
.wrap{max-width:1080px;margin:0 auto;padding:0 22px 90px}
</style></head><body>

<!-- 1. 濾鏡（全站一份） -->
<svg width="0" height="0" aria-hidden="true"><defs>
<filter id="xz" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
<feGaussianBlur id="xz-blur" in="SourceGraphic" stdDeviation="0.10" result="b"/>
<feComponentTransfer in="b" result="t"><feFuncA id="xz-fn" type="discrete" tableValues="0 0 0 1 1 1 1 1"/></feComponentTransfer>
<feMorphology id="xz-dil" in="t" operator="dilate" radius="0"/>
</filter></defs></svg>

<!-- 2. 三層固定覆蓋：顆粒 / 掃描黑邊 / 碳粉屑 -->
<div class="grain"></div><div class="band"></div><div class="spx" id="spx"></div>

<div class="wrap">
  <header class="hd">
    <a class="brand" href="index.html"><!-- logo svg --></a>
    <div class="genbox"><span id="genlab">影印第 1 代</span>
      <button id="genreset">重新製版</button><button id="genfreeze">停在第一代</button></div>
  </header>

  <!-- 3. 釘書針導覽 -->
  <nav class="nav">
    <a class="nv" href="a.html" aria-current="page"><!-- 釘進去的針 --><span>〇一 標題</span></a>
    <a class="nv" href="b.html"><!-- 沒釘下去的針 --><span>〇二 標題</span></a>
  </nav>

  <main>
    <p class="kicker">SECTION LABEL</p>
    <h1><span class="ransom"><!-- 逐字 .cut --></span></h1>
    <p class="lead">正文。乾淨、不歪、不剪字。</p>

    <div class="cols">
      <div class="sh pk" style="clip-path:polygon(/* torn() */)">
        <span class="ttl">紙片標題</span><span class="b">紙片內文</span>
      </div>
    </div>
  </main>
</div>

<footer class="ft"><div class="wrap"><!-- 滿版黑 --></div></footer>
</body></html>
```

---

## 十二、技術實作與相容性

三項核心技術。全部於 **2026-08-17** 查證 MDN 與 caniuse。

### 1. CSS Houdini Painting API（A 渲染層）— 碳粉顆粒

`registerPaint('toner')` 依 `--gen` 即時重畫 320×320 的顆粒磚，隨世代變粗變密。選它而非靜態圖，是因為顆粒必須隨世代連續變化且能無限平鋪。worklet 以 Blob URL 載入，維持單檔 inline。

```js
if (window.CSS && CSS.paintWorklet) {
  const src = "registerPaint('toner',class{static get inputProperties(){return['--gen']}" +
   "paint(c,s,p){var v=p.get('--gen');var g=parseFloat(v&&v.toString())||1;" +
   "var x=((g*2654435761)>>>0)||7;function r(){x^=x<<13;x>>>=0;x^=x>>>17;x^=x<<5;x>>>=0;return x/4294967296}" +
   "var n=Math.round(s.width*s.height/1500*(0.5+g*0.6));c.fillStyle='#141216';" +
   "for(var i=0;i<n;i++){var a=r()<0.10?1.3+g*0.3:0.9;c.fillRect(Math.round(r()*s.width),Math.round(r()*s.height),a,a)}}});";
  CSS.paintWorklet.addModule(URL.createObjectURL(new Blob([src], {type:'text/javascript'})));
}
```

**支援現況（caniuse `css-paint-api`，2026-08-17 取得）：全球約 76.4%。Chrome 65+／Edge 79+／Opera 52+／Samsung Internet 9.2+ 支援；Safari 12.1–26.5 與 TP 皆為 disabled by default；Firefox 至 156 版仍不支援；iOS Safari 不支援。**這是本站三項技術中唯一支援度有缺口的一項，因此規格要求：

**Fallback 具體行為**：`.grain` 的預設 `background-image` 是建置階段烘焙好的 150 個方塊 SVG data URI（約 7KB），Houdini 只在 `@supports (background-image:paint(toner))` 內覆蓋它。Firefox／Safari 看到的是同樣密度、同樣顏色、同樣以 `steps(3)` 跳格的顆粒層，只是密度不隨世代連續增加（改由掃描黑邊、碳粉屑與濾鏡三項承擔世代訊號）。**顆粒是氛圍，不是資訊，因此資訊零損失。**

```css
.grain{background-image:url("data:image/svg+xml,…150 個 rect…");background-size:320px 320px;
       animation:grainshift 900ms steps(3) infinite}
@supports (background-image:paint(toner)){ .grain{background-image:paint(toner)} }
```

### 2. SVG 濾鏡影印退化鏈 feGaussianBlur → feComponentTransfer(discrete) → feMorphology（A 渲染層）

承載特徵 2 與特徵 5。對 **alpha** 通道做離散閾值（`type="discrete"`，8 段 tableValues 即可把閾值定在 k/8），是「1-bit 影印」在瀏覽器裡唯一不需要 canvas 逐像素處理的做法；`feMorphology dilate` 則是碳粉在紙上的擴張。

**支援現況（MDN，2026-08-17 取得）：`<feMorphology>` Baseline Widely available，2015-07 起跨瀏覽器；`<feComponentTransfer>`／`<feFuncA>` 同為 Baseline Widely available，2015-07 起跨瀏覽器；`<feGaussianBlur>` 同。無支援缺口。**

注意事項（實作時真的會踩到）：

- 必須加 `color-interpolation-filters="sRGB"`，否則預設 linearRGB 會讓閾值位置偏掉。
- 濾鏡區域要放大：`x="-10%" y="-10%" width="120%" height="120%"`，否則 dilate 出來的碳粉會被裁掉。
- **不要對每一個小元素各掛一次濾鏡**：把 `filter:url(#xz)` 掛在「一個容器 `<g>`」上，一次處理整組圖。
- 濾鏡會連同容器內的文字一起硬邊化——這是要的（小誌封面），但**絕不可把它掛在正文容器上**。

**Fallback**：瀏覽器若停用 SVG 濾鏡，`.xz` 內容以原始向量呈現（乾淨的黑塊與抖動網點），畫面仍是完整的剪貼版面，只是不會退化。資訊零損失。

### 3. `steps()` 逐格動畫（B 動效與時間軸層）

全站零補間。`steps(2)`／`steps(3)`／`steps(18)` 分別承載 hover 位移、顆粒跳格與掃描光帶的分段推進。這不是效能取捨，是語彙選擇：**影印機的每一個動作都只有「有」和「沒有」。**

**支援現況（MDN `steps()`／CSS Easing Functions Level 1，2026-08-17 取得）：Baseline Widely available，2015-07 起跨瀏覽器（Chrome 26+／Firefox 4+／Safari 9+／Edge 12+）。無支援缺口，不需要 fallback。**

### 效能預算（實測）

| 項目 | 門檻 | 本站實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG，不含 Google Fonts） | ≤350KB | 首頁 71KB／修不修得好 89KB／分診台 76KB／拆解通訊 **186KB**（24 張程序生成封面，最大的一頁） |
| 首屏 JS 執行 | ≤100ms | 核心 JS 約 4.5KB，主要工作是 `applyGen()` 五個屬性寫入與碳粉屑 SVG 字串組裝（第一代 0 顆、第六代 50 顆），實測 <5ms |
| 主要動畫 | 60fps | 四種動效全部只改 `transform` 與 `background-position`，零 `getBoundingClientRect`、零 layout thrashing；SVG 濾鏡只在世代改變時重算（每頁一次），不進逐幀路徑 |
| 外部資源 | 僅 Google Fonts | 零外部圖片、零音檔、零 JS 函式庫 |

**壓不下去的話先砍這三個**：抖動網點的格子邊長（3.2 → 5.5px，rect 數少 2.9 倍）、封面數量、碳粉屑上限。

### 可行性備註

`clip-path:polygon()` 的撕邊會裁掉 `border` 與 `box-shadow` 的一部分。因此本規格一律用 `box-shadow` 做投影（畫在元素外，會被裁）、用 `inset box-shadow` 做外框（畫在元素內，不會被裁）。若某個元件同時需要撕邊與外框，做法是**外層放一張大 1–2px 的黑紙、內層放彩紙**，不要用 border。
