---
name: crackle-glaze-celadon
description: Song-dynasty crackle-glaze celadon as a web design language — two populations of hairline crazing that terminate in T-junctions and never cross, glaze value driven only by coating thickness in hard-stop iso-thickness bands, an exposed clay body at rim and foot, silhouettes that are only profiles of revolution, and pinholes that never sit on a crack.
---

# 陶釉開片 Crackle Glaze ── 風格規格書

> 這份規格書描述的是**宋代開片青瓷**的視覺語言：哥窯的「金絲鐵線」、汝窯的蟹爪紋、龍泉的梅子青。
> 它不綁定產業。任何讀完這份文件的人（或 AI）都應該能做出一個風格一致的新網站。
>
> 一句話抓住它：**顏色只有兩個來源，一是釉，二是胎；釉的明暗只由釉有多厚決定；而畫面上所有的線都是釉自己裂的。**

## 0. 這個流派是什麼

| | |
|---|---|
| 年代 | 北宋末—南宋（11–13 世紀），至明清仿燒不絕；現代日本、台灣、英國工作室陶瓷延續 |
| 地域 | 浙江（龍泉、南宋官窯）、河南（汝州）、傳世哥窯 |
| 成因 | 釉與胎的熱膨脹係數不同。冷卻時胎收得少、釉收得多，釉被拉開，裂只走在那一層 0.5–1.5 公釐的玻璃裡，走到胎就停。**它原本是缺陷**——南宋以後才被當成美。 |
| 製作技術限制（這是關鍵） | ① 釉是**沾／澆／浸**上去的液體，所以它會流、會積，厚薄不均是必然的；② 口沿與凸稜上的釉被拉薄，底下的胎透出來；③ 圈足要墊燒所以刮掉釉，燒過之後鐵鏽色；④ 胎裡的氣在燒成時跑出來，在釉面留下針尖大的凹孔（棕眼）；⑤ 器是在輪子上拉起來的，所以形一定是旋轉體，而且會留下旋紋。 |
| 代表語彚 | 金絲鐵線／蟹爪紋／冰裂紋／魚子紋／紫口鐵足／棕眼／縮釉／積釉／粉青・天青・梅子青・米黃 |
| 它為什麼長成這樣 | 因為**沒有人畫過它**。畫面上的每一條線都是材料自己在冷卻時算出來的，而且它到今天還在繼續算——傳世的開片器，裂是幾百年裡陸續到的，早到的被茶湯與塵染成鐵黑（鐵線），晚到的還是淡黃（金絲）。**「兩種顏色」不是兩種釉，是兩種年紀。** |

不要和這些搞混：

- **冰裂紋玻璃／碎裂效果（shattered glass）**：那是一次性的破壞，線會交叉成 X，而且從一個撞擊點放射出去。開片沒有撞擊點，也沒有 X。
- **Voronoi／泡沫**：那是 120° 的三叉點、凸多邊形、而且泡會合併變大。開片是 90° 的 T 字、非凸的島、而且只會愈分愈細。
- **做舊濾鏡／裂紋貼圖**：一眼就露。開片的判準在下面第一條。
- **金繕（kintsugi）**：那是把**貫穿裂**用金漆補起來，是一條粗的、連續的、有寬度變化的金線，它跨過開片而不理它。開片不是金繕。

---

## 1. 本風格的 5 個不可省略特徵

拿掉任何一條，它就不是這個風格了。每一條都附可以直接複製的片段。

### 特徵 I — 金絲鐵線：兩族裂，只以 T 字終止，永不交叉

**規則**

1. 一條新的裂只在**一個既有的釉域內部**成長，兩端落在那個釉域的邊界上；而邊界只由器緣與既有的裂組成 ⇒ 端點必然是 T 字。
2. **找不到任何一個 X 形交叉。**這是機械可驗的，不是風格上的偏好。
3. 顏色只有兩級，由「這條裂開了多久」決定：十年以上是**鐵線**（鐵黑，1.15 單位寬），十年以內是**金絲**（土黃，0.6 單位寬）。**沒有中間色、沒有中間寬度**——那是一個判斷，不是一個漸層。
4. 裂是折線，每一節都是直的，但整條會蜿蜒（隨機漫步的側向偏移，兩端收回去）。**不要用貝茲曲線**：釉裂沒有控制點。
5. 裂**不描任何形**。它不是輪廓線，它是把一個面切開的線。

**驗收（放大任何一張圖）**：(a) 每一條裂的兩端都停在另一條裂或器緣上；(b) 找不到十字交叉；(c) 線只有兩種粗細、兩種顏色。

```js
// 單調細分裂網：構造上保證 T 字終止。
// 1. 以「面積^1.25 × 長寬比^1.9」加權挑一個釉域（大的、細長的先裂——應力先在那裡釋放）
// 2. 刀垂直於該域的長軸（±26° 抖動）、偏心 0.34–0.66
// 3. 以直線裁出兩端點，再把它折成折線；折線若穿出該域就退成較小的幅度
// 4. 用「折線本身」去切這個域 ⇒ 之後任何新裂的端點都落在這條折線上
function cut(cell, rand) {
  const bb = bbox(cell), horiz = bb.w < bb.h;
  const ang = (horiz ? 0 : Math.PI / 2) + (rand() * 2 - 1) * 26 * Math.PI / 180;
  const d = [Math.cos(ang), Math.sin(ang)], n = [-d[1], d[0]];
  const c = centroid(cell), f = 0.34 + rand() * 0.32, span = horiz ? bb.h : bb.w;
  const p = [c[0] + n[0] * (f - .5) * span * .88, c[1] + n[1] * (f - .5) * span * .88];
  const hit = cutPolygon(cell, p, d);            // 必須恰好切到 2 點，否則放棄這一刀
  if (!hit) return null;
  for (const s of [1, .66, .42, .24]) {          // 彎不下去就彎小一點，絕不讓兩條裂交叉
    const k = bendKnots(hit.seg, rand, Math.min(26, len(hit.seg) * .085) * s, 7);
    if (polylineInside([hit.seg[0], ...k, hit.seg[1]], cell))
      return { pts: [hit.seg[0], ...k, hit.seg[1]], a: [...hit.a, ...k.reverse()], b: [...hit.b, ...k] };
  }
  return { pts: hit.seg, a: hit.a, b: hit.b };    // 直的也可以，交叉不可以
}
```

```css
/* 兩族裂只有兩組值，沒有第三組 */
.lih path { fill: none; stroke-linecap: butt; stroke-linejoin: miter; }
.lih .tieh  { stroke: var(--tieh);  stroke-width: 1.15; }  /* 鐵線：開了十年以上 */
.lih .kimsi { stroke: var(--kimsi); stroke-width: .6;   }  /* 金絲：十年以內 */
```

### 特徵 II — 釉的明暗只由釉厚決定，而且只能是硬停點的等厚帶

**規則**

1. 釉是一層有厚度的玻璃：在口沿與凸稜上被拉薄（最淡），往下流、積在腹與圈足上方（最深）。
2. 因此**畫面上沒有光源**。沒有高光、沒有落影、沒有立體感。深的地方不是因為背光，是因為釉厚。
3. 厚度只能以**等厚帶**表現：`linearGradient` 的每一段，兩個 `stop` 必須同色。**出現任何一段兩端異色的漸層就是違規**，因為那是光。
4. 樣式表**只宣告五個色碼**（釉、胎、墨、紙、朱）。畫面上其餘每一個顏色都用相對顏色語法從這五個推導。第六個色碼就是一個你沒有解釋的顏色。

**由這條推出可讀性規則**（用 `#9FB3A6` 起算，對墨 `#2A2621`）：

| 帶 | 值 | 對墨對比 | 可以放什麼 |
|---|---|---|---|
| thin 釉薄 | `#B6C2BA` | 8.1 | 任何文字 |
| 帶 0 釉 | `#9FB3A6` | 6.8 | 任何文字 |
| 帶 1 | `#8FA697` | 5.8 | 任何文字 |
| 帶 2 | `#7F9988` | 4.9 | 內文（剛過 AA） |
| 帶 3 | `#6F8C7A` | 4.1 | 只放大字 |
| 帶 4 積釉 | `#5F806B` | 3.4 | **不放字**——那是器的下半，本來就不寫字 |

```css
:root{
  /* 只有這五個是宣告的 */
  --glaze:#9FB3A6; --tai:#7A5638; --ink:#2A2621; --paper:#EFE8D6; --zhu:#A33A22;
  /* 其餘一律推導：l 降低＝釉更厚，c 微升＝厚的地方顏色更足 */
  --b1:oklch(from var(--glaze) calc(l - .045) calc(c + .005) h);
  --b2:oklch(from var(--glaze) calc(l - .09)  calc(c + .01)  h);
  --b3:oklch(from var(--glaze) calc(l - .135) calc(c + .015) h);
  --b4:oklch(from var(--glaze) calc(l - .18)  calc(c + .02)  h);
  --thin:oklch(from var(--glaze) calc(l + .055) calc(c - .012) h);  /* 拉薄處 */
  --pin:oklch(from var(--glaze) calc(l - .23) calc(c + .012) h);    /* 棕眼 */
  --bench:oklch(from var(--tai) calc(l - .2) calc(c - .052) calc(h - 8deg));
  --foot:oklch(from var(--tai) calc(l - .17) calc(c - .008) h);     /* 鐵足 */
  --kou:oklch(from var(--tai) calc(l + .04) calc(c + .03) calc(h - 28deg)); /* 紫口 */
  --tieh:oklch(from var(--ink) calc(l + .03) calc(c + .012) calc(h + 40deg));
  --kimsi:oklch(from var(--tai) calc(l + .12) calc(c + .04) calc(h + 12deg));
}
/* 降級：同一條公式在建置階段算出的等值 hex。它不是第六個顏色，是同一個顏色的離線版本。 */
@supports not (color: rgb(from white r g b)){
  :root{ --b1:#8FA697; --b2:#7F9988; --b3:#6F8C7A; --b4:#5F806B; --thin:#B6C2BA;
         --pin:#55705F; --bench:#2F2824; --foot:#462A10; --kou:#995446;
         --tieh:#2E2F22; --kimsi:#A87631; }
}
```

```html
<!-- 等厚帶：每一段的兩個 stop 同色。這是「零漸層」的唯一合法寫法。 -->
<linearGradient id="you" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%"  stop-color="var(--thin)"/><stop offset="0%"  stop-color="var(--thin)"/>
  <stop offset="11%" stop-color="var(--thin)"/><stop offset="11%" stop-color="var(--glaze)"/>
  <stop offset="44%" stop-color="var(--glaze)"/><stop offset="44%" stop-color="var(--b1)"/>
  <stop offset="71%" stop-color="var(--b1)"/>   <stop offset="71%" stop-color="var(--b2)"/>
  <stop offset="89%" stop-color="var(--b2)"/>   <stop offset="89%" stop-color="var(--b3)"/>
  <stop offset="96%" stop-color="var(--b3)"/>   <stop offset="96%" stop-color="var(--b4)"/>
  <stop offset="100%" stop-color="var(--b4)"/>
</linearGradient>
```

### 特徵 III — 紫口鐵足：每一件器都要在某處露出胎

**規則**

1. 口沿一道 2.6 單位寬的**紫褐線**（釉被拉到最薄，底下泛紫的胎透出來）。
2. 圈足**一圈完全不上釉**，填胎色的暗階（燒過之後的鐵鏽色）。
3. **文字不准坐在鐵足上**——那裡不是釉，對比也不對。
4. 少了這兩處，青就只是一個背景色；有了這兩處，它才是一層**塗在別的東西上面**的釉。

```css
.tsiku      { stroke: var(--kou); stroke-width: 2.6; fill: none; }  /* 紫口 */
.tiehtsiok  { fill: var(--foot); }                                   /* 鐵足 */
.kienn      { fill: none; stroke: var(--foot); stroke-width: 1.2; }  /* 器緣 */
```

**把它用在介面上**（本站導覽就是這條做的）：現用頁那一個部位的**釉被磨開，露出胎**，並在釉止住的地方畫一道紫褐的痕。四格的大小、位置、外形、亮度完全一樣，差別只有「它的釉有沒有被磨開」。這個差異對輔助科技不可見，所以現用項必須同時帶 `aria-current="page"`。

```css
.tsai .you2 { fill: var(--b1); }              /* 釉 */
.tsai .lou  { fill: var(--foot); display:none } /* 露出來的胎 */
.tsai .hen  { stroke: var(--kou); stroke-width:2; fill:none; display:none } /* 釉止住的痕 */
.tsai [aria-current] .you2 { display: none; }
.tsai [aria-current] .lou,
.tsai [aria-current] .hen  { display: block; }
```

### 特徵 IV — 形只有旋轉體的側影，加上拉坯旋紋

**規則**

1. 每一個形都是**一條側影與它的鏡射**：`[[y, 半寬], ...]`，左右對稱。畫面上不存在由斜線構成的外形。
2. 側影必須是**曲線**——器是在輪子上拉起來的，不是折出來的。把控制點做 Catmull-Rom 取樣（每兩點之間至少 9 段）。直接連折線就會變成一個紙袋。
3. 下半必有**不等距**的水平旋紋（間距 7–20 單位隨機，兩端各內縮 3–8 單位，右端 y 帶 ±0.6 抖動）——間距是手上去的速度，不是尺量的。
4. 旋紋用 `--b2`、寬 1、`opacity:.8`。它是紋，不是線稿。

```js
// 側影 → 封閉多邊形（Catmull-Rom 取樣，端點鏡射補點）
function smoothProfile(prof, seg = 9) {
  const p = prof, ext = [[2*p[0][0]-p[1][0], 2*p[0][1]-p[1][1]], ...p,
    [2*p[p.length-1][0]-p[p.length-2][0], 2*p[p.length-1][1]-p[p.length-2][1]]];
  const out = [];
  for (let i = 1; i < ext.length - 2; i++) {
    const [y0,w0]=ext[i-1], [y1,w1]=ext[i], [y2,w2]=ext[i+1], [y3,w3]=ext[i+2];
    for (let s = 0; s < seg; s++) {
      const t=s/seg, t2=t*t, t3=t2*t;
      const f=(a,b,c,d)=>.5*(2*b + (-a+c)*t + (2*a-5*b+4*c-d)*t2 + (-a+3*b-3*c+d)*t3);
      out.push([f(y0,y1,y2,y3), Math.max(.5, f(w0,w1,w2,w3))]);
    }
  }
  return [...out, prof[prof.length-1]];
}
function profileToPolygon(prof, cx) {
  const s = smoothProfile(prof);
  return [...s.map(([y,w])=>[cx-w,y]), ...s.map(([y,w])=>[cx+w,y]).reverse()];
}
// 可直接用的七個側影（單位：viewBox 單位，由口到足）
const PROFILES = {
  甕:   [[0,116],[14,120],[34,106],[60,152],[122,196],[246,206],[382,176],[468,136],[498,122],[516,116]],
  缽:   [[0,176],[10,180],[26,168],[70,188],[140,182],[210,146],[252,104],[266,92],[274,88]],
  水丞: [[0,58],[10,62],[24,54],[52,96],[104,112],[158,100],[190,72],[200,64],[206,60]],
  花插: [[0,52],[16,56],[40,46],[86,60],[160,96],[252,112],[330,92],[372,66],[386,58],[396,56]],
  三足爐:[[0,132],[12,138],[30,126],[66,146],[120,152],[168,138],[196,118],[206,112],[212,110]],
  盞:   [[0,104],[8,108],[22,98],[58,92],[98,72],[126,44],[138,30],[146,28]],
  盤:   [[0,196],[8,200],[20,190],[46,170],[62,132],[70,92],[76,84],[80,82]]
};
```

### 特徵 V — 棕眼：釉面必有小孔，而且小孔不騎在裂上

**規則**

1. 每個釉面散布 r = 0.8–1.7 的實心小圓（`--pin`），**密度不均**（用拒絕取樣，不要用等距網格）。
2. **孔不落在裂上**：離最近的裂至少 5.2 單位。理由是物理的——孔是燒成時就有的，裂是後來才來的，後來的東西不會把先前的孔補掉。這一條讓畫面「對」，而且它可以程式驗證。
3. 完美無瑕的平面不是釉，是塑膠。但**不要用 `feTurbulence` 假造質感**——那會變成一張做舊貼圖。孔是數得出來的個體。

```js
// 棕眼：拒絕取樣，且離任何一條裂 ≥ 5.2
function pinholes(poly, cracks, rand, n) {
  const out = [], bb = bbox(poly);
  let guard = 0;
  while (out.length < n && guard++ < n * 60) {
    const q = [bb.x0 + rand() * bb.w, bb.y0 + rand() * bb.h];
    if (!pointInPoly(q, poly)) continue;
    if (cracks.some(cr => cr.pts.some((_, i) => i && segDist(q, cr.pts[i-1], cr.pts[i]) < 5.2))) continue;
    out.push(`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${(.8+rand()*.9).toFixed(1)}"/>`);
  }
  return `<g class="pin">${out.join('')}</g>`;
}
```

---

## 2. 設計哲學

1. **顏色只有兩個來源：釉與胎。**任何第三個顏色進場前，先回答「它是釉還是胎？」——朱是唯一的例外（警示與 focus），而它絕不做背景。
2. **沒有光源。**深淺是厚薄。這條規則一次移除了整個網頁設計裡最常見的一批手法：漸層、陰影、發光、高光、玻璃感、金屬感。
3. **線不描形。**畫面上所有的線都是釉自己裂的；它們把面切開，而不是圈出一個形。
4. **不完美是規格，不是瑕疵。**旋紋不等距、棕眼不均勻、釉厚不一致、裂不直——這些都是明文要求的。但**不完美必須有成因**：每一項都能回答「是哪一道工序留下的」。
5. **它還在變。**開片是一個沒有做完的過程。如果你的實作能讓它隨真實時間繼續裂（見下一節），這個流派才算被完整地用上了。

## 3. 色彩系統

| 角色 | 色票 | 面積 | 用途 |
|---|---|---|---|
| 釉（粉青） | `#9FB3A6` | 約 26% | 器面的基準厚度 |
| 等厚帶 b1–b4 | `#8FA697` `#7F9988` `#6F8C7A` `#5F806B` | 約 22% | 釉往下流、積起來 |
| 釉薄 thin | `#B6C2BA` | 約 8% | 口沿、凸稜 |
| 台面 bench | `#2F2824` | 約 22% | 唯一的大面積暗色（老茶桌，由胎推導） |
| 胎 tai | `#7A5638` | 約 3% | 剖面圖裡的胎體 |
| 鐵足 foot | `#462A10` | 約 5% | 圈足、規線、表格分界 |
| 紫口 kou | `#995446` | ≤2% | 口沿那一道 |
| 鐵線 tieh | `#2E2F22` | 約 3% | 開了十年以上的裂 |
| 金絲 kimsi | `#A87631` | 約 2% | 十年以內的裂、連結底線 |
| 墨 ink | `#2A2621` | 約 4% | 坐在釉上與紙上的全部文字 |
| 紙 paper | `#EFE8D6` | 約 8% | 單據、表格、引文的底 |
| 朱 zhu | `#A33A22` | ≤1% | 唯一的警示與 focus，絕不作背景 |

硬規則：

- **零純白**（最亮 `#EFE8D6`）、**零純黑**（最暗 `#2A2621`）。
- **零彩色漸層**——唯一合法的 `linearGradient` 是硬停點的等厚帶。
- **零 `filter: blur`**、**零模糊陰影**、**零發光**、**零金屬**、**零玻璃擬態**。畫面上唯一的「深」是釉厚。
- **圓角上限 2px**（棕眼與水盆的環是圓形，那是形不是圓角）。
- 樣式表主宣告區**只准出現五個色碼**；其餘一律 `oklch(from …)`。可以用 grep 驗。
- 朱對台面只有 2.2:1，所以 **focus 環是「紙色 2px + 朱 3px」兩層**，才在任何底上都看得見。

## 4. 字體系統

| 用途 | 字體 | 字重 | 尺寸 | 其他 |
|---|---|---|---|---|
| 漢字全部 | Noto Serif TC | 400 / 500 | 內文 `clamp(15px, 1.02vw + 10px, 17.5px)`／行高 1.95 | 字距 .02em |
| 拉丁與數字 | EB Garamond | 400 / 500 / 400 italic | 隨漢字 | `font-variant-numeric: oldstyle-nums` |
| h1 / h2 / h3 | Noto Serif TC 500 | — | 1.9rem / 1.32rem / 1.02rem | 字距 .14em（h3 .2em） |
| 小標籤 | Noto Serif TC 400 | — | .82em | 字距 .2em，`--tieh` 色（鐵線色；`--pin` 對釉只有 2.5:1，只能當孔不能當字） |

硬規則：

- **零粗體**。`strong, b { font-weight: 400 }`。這個流派沒有 bold——宋代器物上的字是刻的或寫的，強調靠**位置與大小**，不靠加粗。
- **零等寬體、零 mono 數字**。等寬數字會立刻把畫面推進「工程製圖／儀表板」那一族。用舊式數字（oldstyle figures）。
- 行高寬鬆（1.95）。這個流派的節奏是慢的。
- 標題不要大到變成 hero big type；本站最大的東西永遠是那件器。

## 5. 版面與網格

**沒有網格。**版面由裂網切出來。

1. 首屏是**一件 1:1 的器**（`aspect-ratio` 綁 viewBox），器面被裂網切成 n 個釉域。
2. 每一塊文字放進一個釉域的**內接矩形**。求內接矩形要從**「離邊界最遠的那一點」**（近似 pole of inaccessibility）長出來，不要從重心——釉域有一邊是器物的曲線，重心常常已經貼在那條曲線上了。
3. 字級由矩形**反解**：試 26 → 8.5 單位，取第一個「寬放得下、高放得下（只准用掉矩形高的 95%）」的值，再乘 0.94 留氣口。**放不下就不放**——那件事留給下面的靜態表，並且在頁面上說出來：「今天這一面放得下 10 件」。
4. 文字用 HTML 疊在 SVG 上（不要 `foreignObject`），位置用 % 寫死在 `style` 裡，字級用 `cqw` 綁 `container-type: inline-size` 的外框。這樣文字是真的文字：可選、可搜尋、螢幕閱讀器讀得到。
5. **鐵足上不排字。**
6. ≤560px：疊在器面上的字全部 `display:none`，改由下方的靜態表承擔（資訊零損失）；器仍然滿版顯示。
7. 內文欄寬上限 34em，且不置中——器居中，文字靠左。

```css
.miann { position: relative; container-type: inline-size; max-width: 780px; margin: 0 auto; }
.sit   { position: absolute; color: var(--ink); line-height: 1.62; }
.sit .t{ display:block; font-size:.82em; letter-spacing:.2em; color: var(--tieh); }  /* 4.4–7.4:1 */
.sit .num { white-space: nowrap; }         /* 電話與價錢不准從中間斷開 */
@media (max-width: 560px){ .sit { display: none; } }
```

## 6. 元件配方

**導覽（側欄，非 topbar）**——四個部位：口沿／肩／腹／圈足。固定在左緣 86px 寬，`body { padding-left: 86px }`。現用態見特徵 III。≤560px 變成一列橫排，圖示縮到 26×32，英文副標隱藏，頁尾另備完整文字連結。

**按鈕**——1px `--kimsi` 邊框、2px 圓角、`letter-spacing:.12em`、hover 填 `--foot`。沒有陰影、沒有漸層、沒有圓角膠囊。

**卡片**（`.khah`）——1px `--foot` 邊框，padding 1rem，hover 填 `--foot`。**不要三張並排等寬的圓角卡片**；用 `grid-template-columns: 1.25fr .95fr` 這種不對稱比例。

**單據／表格**（`.tsu` `.tan`）——`--paper` 底、`--ink` 字、1px `--foot` 框。這是畫面上唯一亮的區塊，用來承擔長文與數字。表格 `border-collapse: collapse`，只有底線，沒有斑馬紋。

**連結**——`border-bottom: 1px solid var(--kimsi)`（金絲），hover 轉 `--zhu`。不要 `text-decoration: underline`（那條線的顏色不受控）。

**頁尾**——`--bench` 底、`--b1` 字、頂上一道 1px `--foot`。放商號、三代人、原創 logo、建置模型。

## 7. 動效規則

| 種類 | 做法 | 時間 / easing |
|---|---|---|
| ambient 環境 | 水盆：每 6.4s 一滴，三圈硬邊的環 `scale(.12)→scale(1)`、`opacity` 在 46% 之後才掉 | 6.4s `steps(9, jump-none)` 無限，三圈延遲 0 / 2.1 / 4.2s |
| input-driven 輸入 | 游標移到一條裂上：`stroke-width` 1.15→2.2（金絲 .6→1.5），同時 `<text>` 由 `display:none` 變 `block` 說出它是哪一天到的 | 純 CSS，0 延遲 |
| transition 轉場 | 轉器：`rotateY(-13deg) scaleX(.88)` → 正 | .3s `steps(4, jump-none)`（輪子上的四分之一轉，不是平滑旋轉） |
| **signature 簽名** | **開片鬆張**：新裂以 `clip-path: inset(0 50% 0 50%)` → `inset(0)` 由兩端往中間出現；緊接著整面釉 `translateX(.6px)` 過衝再回位 | 裂 .09s `steps(3, jump-none)`；鬆張 .18s `linear(0, 1.34 38%, .82 62%, 1.06 82%, 1)` |

```css
/* 簽名：裂到的那一下 */
.lih path.sin { clip-path: inset(0 50% 0 50%); animation: phinn .09s steps(3,jump-none) forwards; }
@keyframes phinn { to { clip-path: inset(0 0 0 0); } }
.song { animation: song .18s linear(0, 1.34 38%, .82 62%, 1.06 82%, 1) 1; }
@keyframes song { 0%{transform:translateX(0)} 30%{transform:translateX(.6px)} 100%{transform:translateX(0)} }

@media (prefers-reduced-motion: reduce){
  .puann2 .khenn { animation: none; transform: scale(.55); opacity: 1; }  /* 環停住，不消失 */
  .lih path.sin  { animation: none; clip-path: none; }                    /* 裂直接整條在 */
  .song          { animation: none; }
  .miann, .tiam  { animation: none; }
}
```

**明文禁用**：淡入當主動效、視差、滾動劫持、`stroke-dashoffset` 描繪（那會讓釉裂看起來像被畫出來的）、數字計數、任何 `blur`、任何彈跳的 `cubic-bezier` 果凍感。

**這個流派最好的動效不是動畫，是時間。**見第 9 節。

## 8. 插畫與圖像風格

技法名：**開片網構成**。三個原語，明文不允許第四個。

1. **釉域**——實色平塗，顏色只由等厚帶決定。**沒有輪廓線**：形的邊界是釉的邊界。
2. **裂**——只有鐵線與金絲兩種，只以 T 字終止。
3. **棕眼**——小圓，不騎在裂上。

外加兩個只准出現在器上的元件：**紫口**（口沿一道線）與**鐵足**（足圈一塊胎色）。

明文禁用：照片、半調網點、細線幾何線描（線有粗細但它不描形）、`feTurbulence` 假質感、扁平化單色圖示、金屬漸層、任何發光、任何模糊陰影、任何做舊濾鏡、emoji。

**畫一個「貫穿裂」時**（它不是開片，別搞混）：3.2 單位寬的 `--ink` 主線、旁邊 0.9 單位的 `--thin` 偏移線（兩側的段差），**兩端散開成 4 條短叉**（開片的末端是 T 字，貫穿裂的末端是叉）。這三件事讓它在一片開片裡一眼就認得出來。

```js
// 貫穿裂末端的短叉
function forks(pts) {
  const ends = [[pts[0], pts[1]], [pts.at(-1), pts.at(-2)]];
  return ends.flatMap(([p, q]) => {
    const dx = p[0]-q[0], dy = p[1]-q[1], L = Math.hypot(dx,dy) || 1;
    return [-1.05,-.55,.55,1.05].map(a => {
      const len = 8 + Math.abs(a)*4, c = Math.cos(a), s = Math.sin(a);
      const ux = dx/L*c - dy/L*s, uy = dx/L*s + dy/L*c;
      return `<path d="M${p[0]} ${p[1]}L${p[0]+ux*len} ${p[1]+uy*len}"/>`;
    });
  }).join('');
}
```

## 9. 讓它隨真實時間繼續裂（這個流派的核心機制）

開片是一個沒有做完的過程，所以**不要把裂當成一張貼圖**。做法：

1. 給每一件器一個**燒成日**與一個**裂速**（幾天裂一條）。
2. 建置階段把「未來」的裂也一起算出來、一起輸出成靜態 SVG，每一條帶 `data-k`（第幾條），預設只有建置日該有的那些帶上 `.on`。
3. 執行期只做一件事：用今天的日期算出 `k = ⌊(今天 − 燒成日) / 裂速⌋`，把 `k` 條以內的加上 `.on`，並依「開了幾年」決定它是鐵線還是金絲。**執行期不算任何幾何。**
4. 沒有 JavaScript 時，畫面停在建置日那一張網——完全合法、一個字也不少。

```js
// 執行期全部的邏輯就這幾行
document.querySelectorAll('svg[data-fired]').forEach(s => {
  const fired = s.dataset.fired, rate = +s.dataset.rate;
  const now = Date.UTC(...);                        // 對齊到「日」，不要用當地時刻
  const el = Math.round((now - Date.UTC(+fired.slice(0,4), +fired.slice(5,7)-1, +fired.slice(8,10))) / 864e5);
  const k = Math.floor(el / rate);
  s.querySelectorAll('.lh').forEach(g => {
    const n = +g.dataset.k, age = el - n * rate;
    g.classList.toggle('on', n <= k);
    const p = g.querySelector('.tieh,.kimsi');
    if (p) p.setAttribute('class', age >= 3650 ? 'tieh' : 'kimsi');   // 十年
  });
});
```

由這個機制長出來的三件事（都要寫在頁面上，它們是內容不是彩蛋）：

- **下一條裂是哪一天到的**，以及它會穿過哪幾個字（裂不繞路，也不等版面重排）。
- **今天放得下幾件事**。裂多一條，釉域就多一塊、每一塊就小一點。
- **哪一天這一面就排不下字了**（把裂速外插到飽和裂數）。

## 10. Logo 與 Favicon

**Logo**：一個 220×220 的方版。`--bench` 外框、內縮 18 的釉面（用等厚帶）、口沿一道紫褐、底下一條鐵足；正中一條 3 單位寬的鐵黑貫穿裂由上到下蜿蜒；一支黃銅鋦釘（`12×38` 兩腳 + `96×14` 橫樑）**橫跨**那條裂；四周三條金絲與三顆棕眼。它就是這門手藝：一條裂、一支釘。

**Favicon**：同一個構成縮到 32×32，只留「釉底＋一條裂＋一支釘」，寫成 inline SVG data URI 放在 `<head>`。不要用外部檔案，也不要 PNG。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%239FB3A6'/%3E%3Cpath d='M16 2c-1.4 6-.4 10-1.2 14.5C14 21 15.4 26 16 30' stroke='%232E2F22' stroke-width='1.6' fill='none'/%3E%3Cpath d='M8 12h5v8H8zM19 12h5v8h-5z' fill='%23A87631'/%3E%3Cpath d='M11 15h11v2H11z' fill='%23A87631'/%3E%3C/svg%3E">
```

## 11. Do & Don't

**Do**

- 讓釉域的大小決定資訊的層級，而不是反過來。
- 把器做成 1:1 並寫出比例尺（「1 公釐 ＝ 3.07 單位」）。這個流派的尺寸是真的。
- 每一條裂都給它一個到達日。
- 長文放在紙上（`--paper`），或放在帶 0–2 的釉上。
- 用「工序」解釋每一個視覺決定：這條線是哪一刀？這塊深是釉積在哪裡？
- 文案用手藝人的實話，講限制與拒絕（「急件不接——漆不會因為你急就乾」）。

**Don't（含去 AI 化禁令）**

- 不要紫藍漸層、不要玻璃擬態、不要發光、不要模糊陰影、不要金屬感。
- 不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。
- 不要 emoji 當 icon；圖示一律用側影或裂。
- 不要用貝茲曲線畫裂，不要讓裂交叉成 X，不要讓裂描出一個形。
- 不要把裂當貼圖平鋪（`<pattern>` 重複的裂網一眼就露：裂不會週期性重複）。
- 不要粗體、不要等寬數字、不要儀表板與量表（這個流派沒有讀數）。
- 不要 `feTurbulence` 做舊、不要噪點疊層。
- 不要 Lorem ipsum、不要「EST. 19xx」徽章、不要「把 X 變成 Y」的標題。
- 不要在鐵足上寫字，不要在帶 3、帶 4 上寫內文。

## 12. 頁面骨架範例（可直接用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜商號</title>
<link rel="icon" href="data:image/svg+xml,…">   <!-- 見第 10 節 -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+TC:wght@400;500&display=swap">
<style>/* 第 3 節的 :root + @supports not，再加第 5、6 節 */</style>
</head>
<body>
<nav class="tsai" aria-label="四個部位">
  <a href="a.html" aria-current="page"><svg viewBox="0 0 38 46" aria-hidden="true">…</svg>
    <span class="ming">口沿</span><span class="lo">the rim</span></a>
  …
</nav>

<main class="wrap">
  <section class="biau">
    <p class="nn">這一件器是⋯⋯年燒的，到今天開了 <span data-live="sv-a">13</span> 條裂。</p>
    <div class="miann" style="aspect-ratio:480/542">
      <svg class="ki" id="sv-a" viewBox="0 -10 480 542"
           data-fired="1978-04-12" data-rate="1290" data-n="30" aria-hidden="true">
        <defs><linearGradient id="you">…</linearGradient>
          <clipPath id="c"><polygon points="…"/></clipPath></defs>
        <g class="iu-lai" clip-path="url(#c)">
          <polygon class="you" points="…" fill="url(#you)"/>
          <g class="rings">…</g><g class="pin">…</g>
          <polygon class="tiehtsiok" points="…"/>
          <g class="lih">
            <g class="lh on" data-k="1"><path class="hit" d="…"/><path class="tieh" d="…"/>
              <text x="…" y="…">1981·10·23</text></g>
            …
          </g>
        </g>
        <path class="tsiku" d="M124 1.2H356"/>
        <polygon class="kienn" points="…"/>
      </svg>
      <div class="sit" style="left:55%;top:26%;width:35%;font-size:2.6cqw">
        <span class="t">商號</span><span class="v">⋯⋯</span></div>
    </div>
  </section>

  <hr>
  <div class="ge ge2">
    <div class="luan"><h1>⋯</h1><p>⋯</p></div>
    <div class="tsu"><h3>⋯</h3><p>⋯</p></div>
  </div>

  <noscript><p class="tsu">沒有 JavaScript 時，這一面停在建置日那一張網，一個字也不會少。</p></noscript>
  <h2>營業事實（不依賴圖與 JavaScript 的那一份）</h2>
  <ul class="pio"><li><span class="t">地址</span><span>⋯</span></li>…</ul>
</main>

<div class="puann2" aria-hidden="true"><svg viewBox="0 0 74 74">…</svg></div>
<footer class="wrap" id="hue">…</footer>
<script>/* 第 9 節那幾行 */</script>
</body>
</html>
```

---

## 13. 技術實作與相容性

三項核心技術，分屬三層。所有支援度都在 2026-09-17 查過 MDN 與 caniuse，**沒有憑印象宣稱支援**。

### A 渲染層：CSS 相對顏色語法 `oklch(from … calc(l …) calc(c …) calc(h …))`

**它承載什麼**：特徵 II 的全部。樣式表只宣告五個色碼（釉／胎／墨／紙／朱），畫面上其餘 15 個顏色——四級等厚帶、釉薄、hover、棕眼、台面、鐵足、紫口、鐵線、金絲、紙暗階、淡墨、黃銅——全部從那五個推導。把 `--glaze` 換成米黃 `#D6C9A8`，整站立刻變成另一窯，而且等厚帶的層級關係、對比與可讀性規則全部自動跟著走。

**支援現況**（caniuse `css-relative-colors`，資料日 2026-08，全球 **87.02% + 5.27% = 92.29%**）：

| 瀏覽器 | 完整支援 | 部分支援 |
|---|---|---|
| Chrome / Edge | 131+ | 119–130 |
| Safari / iOS Safari | 18.0+ | 16.4–17.7 |
| Firefox | 133+ | 128–132 |
| Samsung Internet | — | 25+ |

Baseline：2024-09 起 Newly available（Firefox 128 於 2024-07-09 預設開啟後四引擎到齊）。查證來源：caniuse.com/css-relative-colors；MDN《Using relative colors》；web.dev《New to the web platform in July 2024》。

**已知陷阱**：自訂屬性的值是 token 串，**不支援的瀏覽器照樣會「存下」`--b1: oklch(from …)`**，等到 `var(--b1)` 被用到時才在 computed-value 階段失效，該屬性直接 unset ⇒ 畫面會掉色。所以降級不能靠 `var()` 的第二參數，必須用後置的 `@supports not` 覆寫整組。Safari 16.4–17.x 另外要求色相計算明寫單位（`calc(h - 28deg)` 而不是 `calc(h - 28)`），本站一律寫 `deg`。

**Fallback 具體行為**：`@supports not (color: rgb(from white r g b))` 內重新宣告同一組變數，值是**在建置階段用同一條 OKLab→sRGB 公式算出來的等值 hex**（本站的 `color.js` 實作了 oklch↔sRGB 雙向轉換，`--b1` 算出 `#8FA697`、`--bench` 算出 `#2F2824`，與瀏覽器的計算結果同式同源）。所以降級不是「另一套配色」，是同一個顏色的離線版本；視覺差異僅來自瀏覽器各自的色彩管理，肉眼不可辨。

### B 動效與時間軸層：真實日期驅動（`Date.UTC` + 建置階段寫死的到達日）

**它承載什麼**：整個首創（單調不可逆的日曆分割）、ambient 的「這一面今天長什麼樣」、以及頁面上三段真實的內容（下一條裂的日子、今天放得下幾件、哪一年排不下字）。

**為什麼不用 `Intl.DateTimeFormat` 或 `Temporal`**：本站只需要「今天是哪一天」的日界，不需要曆法、時區資料庫或曆法運算。`Date.UTC` 把當地日期對齊到 UTC 的日界之後做整數天數相減，行為在所有瀏覽器一致、零相依、零位元組。`Temporal` 直到 2026 年仍只有 Firefox 139+ 與部分引擎預設可用（其餘需 polyfill，約 50 KB 壓縮後），對這個需求是不成比例的。

**支援現況**：`Date.UTC`、`classList.toggle`、`dataset`、`querySelectorAll` 全部是長期 Baseline Widely available（2015 年以前）。無需 polyfill。

**Fallback 具體行為**：沒有 JavaScript ⇒ 畫面停在**建置日**那一張網（`.on` 是建置階段寫死的），`<noscript>` 明說這件事；裂日簿、十一件營業事實、價目、六件器的資料全部是靜態 HTML，**一個字也不會少**。這一頁唯一會失去的是「它知道今天是哪一天」。

**已知陷阱**：`new Date().getUTCDate()` 在當地時間的午夜前後會跨日，導致同一個人在深夜與清晨看到的裂數差一條。本站接受這個誤差（它就是一天），但**不能**改用當地時間的 `getDate()` 去和 UTC 的燒成日相減——那會在某些時區固定多算或少算一天。

### E 資料與生成層：單調細分裂網引擎

**它承載什麼**：全站每一條裂、每一個釉域、以及版面的分割本身。

**它為什麼是這個流派需要的**：Voronoi／Laguerre 給的是 120° 三叉點與凸胞（那是泡沫與晶粒），Gilbert tessellation 給的是隨機線段（線會交叉），碎裂模擬給的是放射狀的 X。**只有「在既有胞內部切一刀」這個構造能同時保證 T 字終止、不交叉、而且單調變密**——這三件事正好是開片的三個事實。

**實作要點**

1. 選域：`面積^1.25 × 長寬比^1.9` 加權（大的、細長的先裂）；並要求兩半的長寬比都 ≤ 3.0，否則重試——這一條讓釉域是等向的「島」，不是細長的條（真實開片就是等向的）。
2. 刀垂直於長軸 ±26°、偏心 0.34–0.66。
3. 折線用**它自己**去切多邊形（不是用那條直線），所以之後任何新裂的端點都落在這條折線上。折線若穿出該域，幅度降到 0.66／0.42／0.24，全部失敗就用直線——**寧可直，不可交叉**。
4. 決定性偽隨機（FNV-1a → xorshift）：同一個 seed 永遠同一張網，所以同一件器在任何人的螢幕上、任何一次重新整理之後都是同一張臉。
5. 建置階段輸出靜態 SVG，路徑座標取小數一位（取兩位會讓位元組翻倍而肉眼看不出差別）。

**實測值**（Node 22，本機）

| 項目 | 數字 |
|---|---|
| 13 條裂（首屏甕，179,040 單位²） | 5.7 ms |
| 40 條裂 | 4.8 ms |
| 120 條裂（滿網圖版） | 8.0 ms |
| X 形交叉數（幾何實測，全站全部裂兩兩比對內部段） | **0** |
| 釉域最大長寬比 | 2.03（13 條）／2.39（40 條）／2.70（120 條） |
| 13 條裂的 path 字串合計 | 466 位元組 |
| 單頁大小（含 inline 全部 CSS/JS/SVG） | 40.2 / 59.4 / 80.9 / 40.4 KB（上限 350 KB） |
| 執行期幾何運算 | 0（只有 class 切換） |

**驗收腳本**（任何人都可以拿去驗自己的實作）

```js
// 內部不得相交：任兩條裂去掉兩端 1.5% 之後不得有交點
function auditNoCross(cracks) {
  let bad = 0;
  for (let i = 0; i < cracks.length; i++)
    for (let j = i + 1; j < cracks.length; j++)
      for (let a = 1; a < cracks[i].pts.length; a++)
        for (let b = 1; b < cracks[j].pts.length; b++)
          if (segInter(cracks[i].pts[a-1], cracks[i].pts[a],
                       cracks[j].pts[b-1], cracks[j].pts[b])) bad++;   // 參數區間取 (.015, .985)
  return bad;            // 必須是 0
}
```

### 效能預算

| 門檻 | 本站 |
|---|---|
| 單頁 ≤ 350 KB（含 inline 全部資源） | 最大 80.9 KB |
| 首屏 JS 執行 ≤ 100 ms | 執行期只做 `querySelectorAll` + class 切換（首頁 30 個群組），無幾何、無版面量測 |
| 主要動畫 60fps | 全部是 `transform` 與 `clip-path`／`display`，不觸發 layout；`steps()` 每秒實際只有 3–9 格 |
| layout thrashing | 無。JS 不讀任何幾何屬性（不呼叫 `getBoundingClientRect` 於迴圈中）、不寫任何尺寸 |
| 外部資源 | 只有 Google Fonts 兩個字族；零外部圖片、零音檔、零函式庫 |

---

*規格書出自範例站「補硿吳．鋦瓷補器作」（`sites/po-khang/`），由 Claude Opus 5 於 2026-09-17 建置。風格與產業分離：這份文件描述陶釉開片，不描述鋦瓷。*
