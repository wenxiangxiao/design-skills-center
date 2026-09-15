---
name: impasto-plein-air
description: Alla prima impasto oil painting as a web visual language — paint with real thickness and raking light, wet-in-wet colour drag, dry-brush run-out, an eight-tube limited palette, and viewing distance treated as a layout dimension.
---

# 油畫厚塗 Impasto（alla prima／plein air）

> 本規格書描述的是一個**既有的繪畫流派**，不是一種網頁裝飾。
> 判準只有一句：**把首屏的文字全部遮掉，懂畫的人要在三秒內說出「這是厚塗油畫」。**
> 做不到就是還沒做完——而且補救的方式是加強顏料的物理，不是加強引擎。

---

## 一、設計哲學

厚塗（impasto）不是「畫得很厚」。它是一組互相咬住的物質條件：

1. **顏料有體積**。它在畫面上堆出高度，所以它會擋光、會投影、會反光。畫面上的明暗有一部分不是畫出來的，是**照出來的**。
2. **它是濕的**。一筆穿過還沒乾的底色，會把底色帶走，所以第二筆開始，筆上的顏色就不再是管子裡的顏色。
3. **它是有限的**。一支筆蘸一次顏料能走的距離是有限的，走完就只剩畫布的凸起沾得到——那個斷斷續續的尾巴叫飛白（dry brush），它是載量的證據，不是筆誤。
4. **它是一次完成的（alla prima）**。尤其在戶外：光會走，所以畫面記錄的是一段時間內的**一個**光。畫得太久，畫面上就會出現兩個時間。
5. **它是要退後看的**。近看是一坨泥巴，退後才是水面。莫內那句話不是修辭——顏料的脊在二十公尺外完全不存在，活下來的只有塊面與明度。

這五件事合起來會逼出一個和多數網頁相反的版面觀：**層級不由字級決定，由「這個東西在多遠還看得見」決定。**

### 什麼時候該用這個流派

適合：與現場、材料、手工、時間壓力有關的題材（畫會、料理、修復、農作、劇場、任何「一次到位」的手藝）。
不適合：需要大量密集資料表格、需要精密對齊、需要冷靜中性口吻的題材——顏料會一直搶話。

---

## 二、本風格的 5 個不可省略特徵

> 每一項都是「拿掉它就不是這個風格了」。五項都要在畫面上看得見。

### 特徵 1　顏料有厚度，而厚度是資訊

畫面上最厚的地方幾乎一定是最亮的地方（因為最厚的通常是鉛白／鈦白）。厚度必須以**固定方向的斜光**去照它：光一律在左上（方位 315°、仰角 22°），受光緣亮、背光緣有一道硬邊暗，濕的地方還有一點鏡面高光。

高度場 → 法線 → Lambert＋Blinn，這是唯一正確的做法（直接可複製）：

```js
// H: Float32Array 高度場；R/G/B: 顏料本色；Wt: 濕度(0..1)；out: ImageData.data
const SC = 44, AZ = 315*Math.PI/180, EL = 22*Math.PI/180;
const lx = Math.cos(AZ)*Math.cos(EL), ly = -Math.sin(AZ)*Math.cos(EL), lz = Math.sin(EL);
let hx = lx, hy = ly, hz = lz + 1;                 // half-vector（視線視為 +z）
const hl = Math.hypot(hx, hy, hz); hx/=hl; hy/=hl; hz/=hl;
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const i = y*w + x;
  const gx = (H[i+1] - H[i-1]) * SC, gy = (H[i+w] - H[i-w]) * SC;
  const nl = Math.sqrt(gx*gx + gy*gy + 1);
  const nx = -gx/nl, ny = -gy/nl, nz = 1/nl;
  const dif = Math.max(0, nx*lx + ny*ly + nz*lz);
  let sp = Math.max(0, nx*hx + ny*hy + nz*hz);
  sp = Math.pow(sp, 36) * Wt[i] * 0.55;            // 只有還濕的地方會反光
  const v = 0.64 + 0.76*dif;                        // 環境 + 漫射
  out[i*4] = R[i]*v + sp*255; out[i*4+1] = G[i]*v + sp*255; out[i*4+2] = B[i]*v + sp*255; out[i*4+3] = 255;
}
```

DOM 元件上的最小合法近似（**絕對不要用模糊陰影**——顏料的厚度是硬邊的）：

```css
.paint{
  /* 上緣受光、下緣背光：兩層硬邊，沒有 blur */
  box-shadow:
    inset  2px  2px 0 rgba(241,235,221,.46),
    inset -2px -2px 0 rgba(33,29,25,.34),
    4px 4px 0 rgba(33,29,25,.30);
  border-radius:0;                 /* 顏料不會自己長圓角 */
}
```

### 特徵 2　沒有輪廓線；形是方向性筆群的邊界

物體的邊 ＝ 兩群不同方向的筆觸交會的地方。**禁止**用一條線去描形。而且每一個形至少要有一段「丟失的邊」（lost edge）：與背景同明度、看不見邊界的那一段——那是厚塗判斷力的證據。

把這條規則帶進版面：正文沿著顏料**實際覆蓋到的範圍**繞排，不是沿著一個方框。

```js
// 逐列量出覆蓋邊界 → 一個可直接丟進 shape-outside 的 polygon()
function coverPolygon(H, w, h, thr = 0.0015, rows = 16){
  const L = [], R = [];
  for (let r = 0; r < rows; r++){
    const y = Math.min(h-1, Math.round((r+0.5)*h/rows)); let lo = -1, hi = -1;
    for (let x = 0; x < w; x++) if (H[y*w+x] > thr){ if (lo < 0) lo = x; hi = x; }
    if (lo < 0) continue;
    L.push([lo/w*100, y/h*100]); R.push([hi/w*100, y/h*100]);
  }
  if (L.length < 2) return null;
  return 'polygon(' + R.concat(L.reverse()).map(p => p[0].toFixed(1)+'% '+p[1].toFixed(1)+'%').join(', ') + ')';
}
```

```css
.wrapfig{ float:left; width:min(330px,52vw); margin:0 22px 8px 0; shape-margin:16px; }
/* shape-outside 與 clip-path 用同一個多邊形：文字沿著顏料走，圖也只到顏料為止 */
```

```css
/* 硬規則 */
figure, .fig, canvas.art { border:0; }         /* 不准描邊 */
.fig::after{ content:none; }                   /* 不准補一條裝飾線把形圍起來 */
```

### 特徵 3　濕中濕拖色：第二筆開始，筆上的顏色就不純了

每前進一步，筆從底下**取走**一點顏色。載量越低，取得越兇（因為筆已經在刮而不是在放）。

```js
// 走每一步的末尾（一步只取一次，不是每個像素都取）
const kk = 0.00042 + 0.00160 * (1 - loadNow);   // loadNow: 0..1
br += (underR - br) * kk;
bg += (underG - bg) * kk;
bb += (underB - bb) * kk;
```

實測：一筆 780 步、載量 0.55，從 `rgb(235 60 40)` 收筆在 `rgb(190 108 88)`——約三成被底色吃掉。
**判準：同一筆的起點與終點顏色必須不同。**相同就代表這不是濕中濕，是貼圖。

### 特徵 4　有限調色盤，顏色是混出來的（而且混色會變濁）

八管，不多不少。畫面上每一個顏色都必須從這八管混得出來，於是整張畫自然帶同一個母色。

```css
:root{
  --W:#F1EBDD; /* 鈦白   Titanium White  遮蓋力 .97 */
  --Y:#E4A81C; /* 鎘黃中 Cadmium Yellow  .88 */
  --O:#B5823A; /* 生赭   Yellow Ochre    .85 */
  --R:#C33A22; /* 鎘紅淺 Cadmium Red     .90 */
  --U:#4A3524; /* 焦茶   Burnt Umber     .80 */
  --B:#2B4A86; /* 群青   Ultramarine     .58（透明）*/
  --C:#2E7391; /* 天藍   Cerulean        .72 */
  --K:#221E1B; /* 象牙黑 Ivory Black     .78 */
}
```

混色**不是平均**。顏料是減色的，兩管一起蓋上去，各自吃掉的波長會相加：

```js
function mixT(spec, TUBES){                       // spec: [['W',3],['B',1]]
  let dr=0, dg=0, db=0, op=0, t=0;
  for (const [k,ww] of spec){ const c = TUBES[k].c; t += ww;
    dr += (1-c[0]/255)*ww; dg += (1-c[1]/255)*ww; db += (1-c[2]/255)*ww; op += TUBES[k].op*ww; }
  dr/=t; dg/=t; db/=t; op/=t;
  const mud = 1 - 0.13*Math.min(1, Math.abs(dr-db)*1.6 + Math.abs(dg-db)*1.2);  // 越接近補色越濁
  return { c:[255*(1-dr)*mud, 255*(1-dg)*mud, 255*(1-db)*mud], op };
}
```

（要精確得用 Kubelka–Munk 的散射／吸收兩個係數；畫箱裡沒有那種東西，密度相加是誠實的近似，並且已經足以讓「白會把一切拉灰」「補色相混變濁」這兩件事在畫面上成立。）

**硬規則**：不得出現任何一個混不出來的顏色。螢光色、純黑 `#000`、純白 `#fff` 一律禁止。

### 特徵 5　一次完成：光會走，而且畫面上一定有沒畫到的地方

底漆（imprimatura）露出來的地方是**特徵不是瑕疵**。畫面完成度 ＝ 有顏料的面積，所以底漆必須是唯一的大面積底色，而且它永遠帶布紋，不存在平塗。

```css
body{
  background:#9C8F79;                 /* 底漆地：暖灰中間調，L≈62 */
  background-image:
    repeating-linear-gradient(0deg, rgba(33,29,25,.055) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgba(241,235,221,.05) 0 1px, transparent 1px 3px);
}
.panel{ background:#A89B84; }          /* 長文要坐在稍亮一階的底漆上（對比 6.1:1）*/
```

同一個光的證據要能被驗算：每一筆記下當時的太陽方位，同一塊裡最早與最晚差太多就是兩個時間。

```js
bd.stroke({ /* … */ az: sunAzimuth, region: '彩色屋' });
// 收工：span = max(az) - min(az)；> 5.5° （約 30 分鐘）＝ 這一塊裡面有兩個時刻的光
```

---

## 三、色彩系統

| 角色 | 色票 | 比例 | 用途與硬規則 |
|---|---|---|---|
| 底漆地 | `#9C8F79` | ~34% | **唯一的大面積底色**。永遠帶布紋，不存在平塗。它的語意是「這裡還沒被畫到」 |
| 底漆（亮一階） | `#A89B84` | ~16% | 長文、面板。與 `#211D19` 對比 6.1:1 |
| 底漆（再亮一階） | `#B2A691` | ~8% | 次級面板、按鈕底、導覽未選項 |
| 墨 | `#211D19` | ~14% | 正文、3px 框線、分隔。**不是純黑** |
| 焦茶 | `#4A3524` | ~5% | 次要文字、標籤 |
| 鈦白 | `#F1EBDD` | ~7% | 最厚處、反白文字。**不是純白** |
| 鎘黃中 | `#E4A81C` | ~6% | focus ring、hover、現用態 |
| 鎘紅淺 | `#C33A22` | ~5% | 連結底線、警示、關鍵標記 |
| 群青 | `#2B4A86` | ~4% | 規則框、冷色語意 |
| 天藍 | `#2E7391` | ~3% | 次要語意 |

硬規則：

- **零純白、零純黑、零色彩漸層、零 `filter: blur`、零圓角 > 4px、零模糊陰影。**需要厚度就用硬邊實色。
- 任何彩色出現，都代表「那裡有顏料」。不要用彩色當背景填充，那會讓「完成度＝彩色面積」這條法則失效。
- 明度結構是「暖灰中間調的底 ＋ 少量高彩度顏料 ＋ 一個接近黑的墨」。不要把底做亮（那是紙）也不要做暗（那是夜）。

---

## 四、字體系統

| 角色 | 字體 | 字級 | 字重／行高 |
|---|---|---|---|
| 標題 | Noto Serif TC | `clamp(21px, 2.6vw, 34px)`；首屏最大一階可到 64px | 900 / 1.24 |
| 正文 | Noto Sans TC | 17px（手機 16px） | 400 / 1.78 |
| 英文與數字 | Fraunces（italic 600–700） | 標籤 12–13px、數據 27–30px | / 1.1 |
| 小字 | Noto Sans TC | 13.5px | 400 / 1.66 |

- 標題用高對比襯線（顏料是厚的，字也要有粗細差），內文用無襯線黑體維持可讀。
- 英文一律斜體襯線 Fraunces，用途只有三種：品牌副標、距離／編號標籤、數據。**不要拿它排長文**。
- **首屏最大的那一行，它大的理由必須是「在那個距離只有它還讀得到」**，不是設計者想放大。這是本流派與 hero-bigtype 的分界線。
- 字級 scale：12 / 13.5 / 15 / 17 / 19 / 21 / 27 / 34 / 64。不要插入中間值。

---

## 五、版面與網格

- **距離帶取代字級階層**。先問「這一段在幾公尺外還需要被讀到」，再決定它的大小與是否存在。三個距離帶是最小可用的一組：遠（只有名字與時間）／中（營業事實）／近（材料與工序細節）。
- 分格線一律 **3px 實線墨色**，零圓角。面板一律帶 `5px 5px 0` 的硬邊落影（那是板的厚度）。
- 主欄寬 `max-width: 1060px`，左右內距 20px。長文欄寬不超過 40 全形字。
- 圖不放在方框裡。圖就是顏料，讓文字沿著它的覆蓋範圍走（特徵 2）。
- 不對稱：距離帶的畫板一律左對齊，尺寸差自己會製造版面的斜度，不需要再加旋轉角。
- RWD：≤700px 距離帶改為單欄堆疊、繞排關閉（`shape-outside:none`）、導覽四格等寬不換行；≤560px 面板內距收到 15px、定義表改單欄。

---

## 六、元件配方

### 導覽（濕邊）

現用頁那一塊**還沒乾**：邊緣化開、表面有高光；其餘已乾：邊是硬的、表面是啞的。

```css
nav.wet{display:flex;border-bottom:3px solid var(--ink)}
nav.wet a{flex:1;padding:15px 14px 17px;background:var(--pc);position:relative;isolation:isolate}
nav.wet a:not(:last-child){border-right:3px solid var(--ink)}
nav.wet a:not([aria-current]){box-shadow:inset 0 -5px 0 rgba(33,29,25,.22)}   /* 乾：硬邊 */
nav.wet a[aria-current]::before{content:"";position:absolute;inset:0;z-index:-1;mix-blend-mode:screen;
  background:linear-gradient(107deg,rgba(241,235,221,.46) 0 16%,rgba(241,235,221,.06) 34% 60%,rgba(33,29,25,.20) 100%)}
nav.wet a[aria-current]::after{content:"";position:absolute;top:0;bottom:0;right:-11px;width:22px;background:var(--pc);
  -webkit-mask-image:linear-gradient(90deg,#000,transparent);mask-image:linear-gradient(90deg,#000,transparent);
  animation:bleed 9s ease-in-out infinite alternate}                            /* 濕：邊在化開 */
@keyframes bleed{from{transform:scaleX(.72)}to{transform:scaleX(1.12)}}
```

### 按鈕

```css
button{border:3px solid var(--ink);background:var(--ground3);padding:8px 14px;border-radius:0;
  box-shadow:3px 3px 0 rgba(33,29,25,.32)}
button:hover{background:var(--ymid)}
button[aria-pressed="true"]{background:var(--ink);color:var(--white)}
button:focus-visible{outline:3px solid var(--ymid);outline-offset:2px}
```

### 面板／卡片

```css
.panel{background:var(--ground2);border:3px solid var(--ink);padding:22px 24px;
  box-shadow:5px 5px 0 rgba(33,29,25,.30)}
```
**不要**圓角、不要模糊陰影、不要三張並排的等寬卡片。

### 表單與表格

框線 2–3px 實線；表頭用墨底反白；數字欄靠右並用 Fraunces italic。輸入框 `border-radius:0`，focus 用鎘黃 outline。

### 分隔線

```css
hr.rule{border:0;height:6px;background:var(--ink);
  -webkit-mask-image:repeating-linear-gradient(90deg,#000 0 22px,rgba(0,0,0,.35) 22px 26px,#000 26px 48px);
          mask-image:repeating-linear-gradient(90deg,#000 0 22px,rgba(0,0,0,.35) 22px 26px,#000 26px 48px)}
```
（一條被刀抹過去的墨，中間有幾處刀口較輕——不要用 1px 灰線。）

### 頁尾

墨色 3px 上框線，四欄自動排（`minmax(215px,1fr)`），小字 14px。

---

## 七、動效規則

四種都要有，缺一不可，且全部要有 `prefers-reduced-motion` 降級。

| 類型 | 本站做法 | duration / easing |
|---|---|---|
| **ambient** | 調色盤結皮：昨天剩的顏料由外而內失去高光、飽和下降，然後被刮掉重來 | 48s linear infinite，各塊 `animation-delay` 錯開 −5.6s |
| **input-driven** | 筆程顯影：游標移到板上即讀該點的顏料厚度／濕度／顏色 | 即時，`pointermove` 直接寫 textContent，<16ms |
| **transition** | 罩布：一塊沾了顏料的布以 `clip-path` 斜推過畫面 | 460ms `cubic-bezier(.42,0,.3,1)` 進、500ms 出 |
| **signature** | 退後看：捲動＝後退，板真的縮到該距離的角尺寸 | linear，綁在捲動位置上（非時間） |

禁止事項：

- 不得把通用淡入當作 signature。
- 不得用 `stroke-dashoffset` 描繪（那是線，本流派沒有線）。
- 不得做「數字計數」的進場。數字要出現就直接出現。
- 顏料不做彈跳、不做縮放回彈。顏料很重。

降級（`prefers-reduced-motion: reduce`）：結皮停在濕的狀態、罩布不出現、距離軌改成四個離散按鈕並把三個距離帶同時顯示。**資訊零損失**——降級後讀者拿到的字一個都不少。

---

## 八、插畫與圖像風格（loaded-stroke 載量筆觸構成）

全站圖像由同一支引擎輸出，每一筆只有四個參數：

1. **筆型** — 板刷（多根筆毛、會開叉）／圓筆（窄、集中）／畫刀（兩道銳邊、堆得最高、走得最短）。
2. **載量 load** — 決定它能走多長。`runLen = (刀 90 : 筆 150) + 900 × load × press`。
3. **壓力 press** — 決定寬度與脊高。
4. **拖色** — 見特徵 3。

構成法則：

- 形用**方向排列**堆出來。同一塊面至少兩個筆向，交角不小於 25°。
- 每一筆的起點要實、終點要虛。**畫面上必須看得到飛白**，沒有飛白就代表沒有載量這個概念。
- 明文禁用：照片、半調網點、細線幾何線描、`feTurbulence` 假質感濾鏡、扁平化單色圖示、任何描外形的輪廓線、任何發光。
- 判準：**把光照拿掉（只剩本色），仍然看得出每一筆從哪裡下、往哪裡走、在哪裡沒顏料了。**

---

## 九、Logo 與 Favicon

- Logo ＝ **一筆**。一道載滿顏料的橫拖，右端三到四塊斷開的飛白；受光緣補一道鈦白，那是脊。旁邊放一個由刀壓出來的色塊（不要畫圓，圓是幾何不是顏料）。
- 不要字母組合（monogram）、不要盾形、不要對稱。
- Favicon 用 inline SVG data URI 寫在 `<head>`，16px 下只需讀得出「一筆紅色、右邊斷掉、左上有一塊黃」。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%239C8F79'/%3E%3Cpath d='M3 20c6-3 11-4 16-3 4 1 7 2 10 4l-1 5c-4-2-7-3-11-3-5-1-9 0-14 2z' fill='%23C33A22'/%3E%3Cpath d='M3 19c6-3 11-4 16-3 4 1 7 2 10 4l-.6 2.2C25 20 22 19 18 18.4 13 17.6 9 18.3 3.5 20.6z' fill='%23F1EBDD'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定畫面上哪些地方**不畫**。底漆露出來的比例是這個流派的呼吸。
- 每一筆都要有方向與載量，寧可少一筆也不要補一筆沒有理由的。
- 顏色一律從那八管混出來，混完再用。
- 面板、按鈕、線一律硬邊、零圓角、實色落影。
- 把「多遠看」寫進版面：至少做出兩個距離帶。

**Don't**

- ❌ 紫藍漸層、任何漸層當底。
- ❌ 圓角卡片＋模糊陰影＋三欄並排。
- ❌ emoji 當 icon（icon 一律用筆觸畫）。
- ❌ 描外形的輪廓線、細線幾何線描。
- ❌ 純黑 `#000`／純白 `#fff`／螢光色／任何混不出來的顏色。
- ❌ 用照片或濾鏡假裝厚度（`filter: drop-shadow` 不是顏料）。
- ❌ Lorem ipsum、「在當今快節奏的世界」式的 AI 腔、「EST. 19xx」徽章。
- ❌ 把最大的字當成標題。在這個流派裡，最大的字是**遠處唯一還讀得到的那一行**。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,600;1,9..144,700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
<style>
:root{--ground:#9C8F79;--ground2:#A89B84;--ground3:#B2A691;--ink:#211D19;--white:#F1EBDD;
      --ymid:#E4A81C;--red:#C33A22;--blue:#2B4A86}
body{margin:0;background:var(--ground);color:var(--ink);
  font:400 17px/1.78 "Noto Sans TC",system-ui,sans-serif;
  background-image:repeating-linear-gradient(0deg,rgba(33,29,25,.055) 0 1px,transparent 1px 3px),
                   repeating-linear-gradient(90deg,rgba(241,235,221,.05) 0 1px,transparent 1px 3px)}
h1,h2,h3{font-family:"Noto Serif TC",serif;font-weight:900;line-height:1.24}
.wrap{max-width:1060px;margin:0 auto;padding:0 20px}
.panel{background:var(--ground2);border:3px solid var(--ink);padding:22px 24px;box-shadow:5px 5px 0 rgba(33,29,25,.30)}
</style></head><body>

<header class="masthead"><div class="wrap">…品牌名＋一行事實…</div></header>

<nav class="wet" aria-label="主要導覽">
  <a href="a.html" aria-current="page" style="--pc:#E4A81C">首頁</a>
  <a href="b.html" style="--pc:#2E7391">第二頁</a>
</nav>

<main>
  <!-- 距離帶 1：遠。只有名字與最重要的一句事實 -->
  <section class="standback"><div class="wrap">
    <div class="sbrow far"><canvas width="96" height="40"></canvas><h2>…</h2></div>
    <div class="sbrow mid"><canvas width="430" height="180"></canvas><dl class="kv">…</dl></div>
    <div class="sbrow near"><canvas width="1000" height="418"></canvas><p class="probe">…</p></div>
  </div></section>

  <!-- 簽名：退後看 -->
  <section class="rail"><div class="stage wrap">
    <canvas class="plate" width="1000" height="418"></canvas>
    <div class="readout" aria-live="polite">…距離／可辨色塊數／浮凸剩多少…</div>
  </div></section>

  <div class="wrap"><section class="panel">…</section></div>
</main>

<footer>…地址、電話、時間、虛構聲明…</footer>
<noscript><div class="wrap panel">沒有 JavaScript 也讀得到：所有文字資訊都是靜態的。</div></noscript>
</body></html>
```

---

## 十二、技術實作與相容性

### 12.1 Canvas 2D ImageData（渲染層｜承載特徵 1、3、5）

- **用途**：高度場逐像素著色（`createImageData` → 直接寫 `data` → `putImageData`）。不能用 CSS 做，因為法線要從相鄰像素的高度差算出來。
- **支援現況**：`CanvasRenderingContext2D.createImageData` / `putImageData` 為 **Baseline Widely available**（MDN《ImageData》《putImageData》），各主流瀏覽器長期支援，無相容性疑慮。
- **Fallback**：`getContext('2d')` 取不到時整塊畫面留白，但全部營業資訊、規矩、價目、時刻表本來就是靜態 HTML，一個字也不會少（`<noscript>` 另有明示）。
- **效能實測**（Node 22，與瀏覽器同一份純算術程式碼）：

| 項目 | 尺寸 | 實測 |
|---|---|---|
| 建板（含布紋場） | 1000×418 | 17 ms |
| 畫一整張海港（91 筆） | 1000×418 | 67 ms |
| 著色一次 | 1000×418 | 12 ms |
| **首頁首屏合計** | | **96 ms**（預算 100 ms） |
| 遊戲板單筆＋重新著色 | 760×320 | 約 10 ms／次（60fps 有餘裕） |
| 距離判讀 `readAt` | 1000×418 | 約 20 ms／次，且以 `requestIdleCallback` 排程、結果快取 |

每幀只寫一次 `putImageData`，不讀任何 DOM 幾何，無 layout thrashing。單頁大小 37–41 KB（已含全部 inline CSS/JS，零外部圖片），遠低於 350 KB 預算。

### 12.2 CSS scroll-driven animations（動效與時間軸層｜承載 signature）

- **用途**：`view-timeline-name: --rail` 定義在 `.rail` 上，`.plate` 與三個距離帶的文字以 `animation-timeline: --rail` 綁上去——**捲動就是後退**，板的縮放與文字帶的出現全部由捲動位置決定，不由時間決定。用 CSS 而不用 JS 的理由是它跑在合成執行緒上、和捲動同步，不會掉格。
- **支援現況（已查證，2026-09-15）**：MDN《animation-timeline》明載 **Limited availability — 「This feature is not Baseline because it does not work in some of the most widely-used browsers.」** Chromium 115+ 起支援；Firefox 直到近期仍以偏好設定／較晚的版本才提供；因此**不得預設它存在**。
- **Fallback（已實作）**：整段包在 `@supports (animation-timeline: view())` 內。不支援時走 `addEventListener('scroll', …, {passive:true})` ＋ `requestAnimationFrame` 節流，由 JS 依 `.rail` 的 `getBoundingClientRect()` 算出同一個進度值並直接寫 `transform` 與三個文字帶的 `opacity`——**視覺與資訊完全相同，只是由 JS 驅動**。另備四顆距離按鈕（2 / 5 / 12 / 25 m）與 ←→ 方向鍵，鍵盤與無捲動環境皆可用。
- **降級**：`prefers-reduced-motion: reduce` 時 `.rail` 收回正常高度、板不縮放、三個距離帶同時顯示、讀數固定在 2 m，資訊零損失。

### 12.3 CSS `shape-outside`（版面與樣式層｜承載特徵 2）

- **用途**：正文沿著引擎輸出的顏料覆蓋多邊形繞排。這是「形是筆群的邊界，不是一條線」在版面層級的唯一忠實實作——用方框繞排就等於替顏料補了一條看不見的輪廓線。
- **支援現況（已查證）**：MDN《shape-outside》標示 **Baseline Widely available**，**自 2020 年 1 月起**各瀏覽器可用。無須前綴。
- **實作要點**：`shape-outside` 只對**浮動元素**生效；同一個 `polygon()` 同時給 `clip-path`，圖與文字的邊界才會是同一條。座標用百分比，縮放不會跑掉。
- **Fallback**：不支援時 `shape-outside` 被忽略，浮動元素退回矩形繞排，文字一個不少。≤700px 一律關閉繞排改為單欄堆疊（窄欄裡繞排會擠出孤兒行）。

### 12.4 其他（非核心技術）

`requestIdleCallback`（無支援則退回 `setTimeout(…,0)`）排程距離判讀；`mask-image` 成對寫 `-webkit-` 前綴，用於分隔線與濕邊導覽的化開效果，不支援時退回實心；Google Fonts 為唯一外部資源，字型未載入時 `system-ui` 接手、字級與版面不變。

---

*本規格書隨 `sites/jitkha/` 一併交付。只讀這份文件、不看 Demo，也應該能做出同一個流派的全新網站。*
