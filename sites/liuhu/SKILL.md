---
name: charcoal-reductive
description: Charcoal drawing as an interface language — every tone is broken by paper tooth, form is built from massed strokes instead of outlines, and every highlight is subtracted with an eraser, leaving a hard edge and a rim of pushed dust.
---

# 炭筆素描 Charcoal Drawing — 減法製圖規格書

> 流派：**炭筆素描（fusain / charcoal drawing）**。不是「復古紙感」，是一個有明確媒材、明確技術限制、明確代表作的繪畫傳統：
> 木炭是最古老的繪畫材料（Chauvet 洞窟壁畫的線條就是木炭）；文藝復興用它畫等比原寸的 cartoon 底稿（Leonardo《聖母子與聖安妮》cartoon，約 1499–1500，倫敦 National Gallery，炭＋白粉筆拼紙）；19 世紀法國學院把 **fusain（柳枝炭）** 定為素描訓練的核心媒材，Karl Robert《Le Fusain》（1875）是當時的教科書；Seurat 1880 年代用 conté 在 Michallet 粗紋紙上畫的塊面素描，是「紙的牙」最有名的示範；Odilon Redon 的 *noirs* 把炭推到極黑；George Bellows（Ashcan School）用炭畫夜場拳賽；Käthe Kollwitz 的炭筆自畫像；當代 William Kentridge 直接把「炭可以被擦掉、但擦不乾淨」當成動畫的本體。
>
> 本規格書抽自範例站 **柳烌窯 LIÛ-HU KILN**（炭窯 × 炭筆素描），但**風格與產業分離**：任何產業都可套用。

---

## 一、設計哲學

炭筆素描的主張只有一句：**畫面是一層鬆的粉，附在一張有牙的紙上。**

這句話推得出這個流派的全部長相。炭是鬆散的碳顆粒，沒有黏合劑，只靠紙面的凹凸（tooth）與極小的摩擦力停在那裡。因此：

1. **沒有平塗。** 顆粒只停在紙的凸點上，凹處要更大的量才填得滿。所以任何一塊灰都是斷續的，濃度越低越碎。畫面上只要出現一塊「均勻的灰」，這個流派就當場破功。
2. **沒有筆尖，只有側鋒。** 一根 φ8 mm 的柳炭沒有可用的尖端，你用的是它的側面與斷口的稜。所以**塊面比線容易，線是塊面的副產品**——這個媒材天生不畫輪廓，它堆形。
3. **亮是減出來的。** 你不能在暗上面「加白」（沒有白炭這種東西，粉筆是另一個媒材）。要亮就得把炭帶走：軟橡皮按、麵包屑揉、布抹。減出來的亮部有兩個簽名：**邊緣比畫出來的硬**，而且**外圈有一圈被推出去的炭粉**。
4. **它會弄髒一切。** 手、袖口、對頁、口袋。這不是缺點，是這個媒材的在場證明——真正的炭筆素描上一定找得到不屬於構圖的髒。

**常見誤解：** 炭筆素描 ≠ 把畫面調成灰階再加雜訊。灰階濾鏡給你的是「均勻的噪點」，炭給你的是「濃度越低越碎、且碎的位置由紙決定」。兩者的差別在低調子區：前者是雜訊，後者是紙。

介面上套用這個流派時，翻譯規則是：

| 繪畫 | 介面 |
|---|---|
| 紙的牙 | 全站共用的一張紙紋場，同時當底紋與遮罩 |
| 塊面堆形 | 圖像不是 `<img>`，是密度場的渲染結果 |
| 擦出亮部 | 「重要」＝被擦得比較乾淨（不是加亮、不是加框） |
| 弄髒 | 使用者的操作會在畫面上累積並留下 |
| 噴固定液 | 「定稿」的狀態：整體暗一階、不再能擦 |

---

## 二、本風格的 5 個不可省略特徵

> 每一項都是「拿掉它就不是這個風格了」。五項全部要在首屏看得到。

### 特徵 1：紙的牙——沒有任何一塊平塗

任何一塊顏色都必須被高頻的紙紋咬碎。做法是全站共用**一張**可平鋪的紙紋場（不是每個元件各自加雜訊），底紋與遮罩都從它來。

```js
/* 可平鋪的 value noise 紙紋（週期 384；scale 必須整除週期才不會出現接縫） */
function tooth(x, y) {                       // 回傳 0..1 的紙面高度
  let t = vn(x/1.5, y/1.5, 1, 256) * 0.56    // 高頻：紙的顆粒
        + vn(x/4,   y/4,   2,  96) * 0.27    // 中頻：抄紙的絮
        + vn(x/12,  y/12,  3,  32) * 0.17;   // 低頻：厚薄不均
  t += Math.sin((y + vn(x/32,y/32,7,12)*7) * (2*Math.PI*61/384)) * 0.04;  // 簾紋
  return Math.min(1, Math.max(0, t));
}
```

上色時，炭的覆蓋率不是密度的線性函數，而是**被紙紋放大過的指數**——這一行是整個流派的核心：

```js
const k   = density * (0.22 + 2.05 * tooth(x, y));   // 牙高的地方吃得到炭
const cov = 1 - Math.exp(-1.65 * k);                 // 0..1 的覆蓋率
```

沒有 canvas 也要保底（純 CSS 近似，供 fallback 或靜態頁使用）：

```css
body{
  background-color:#C9C0AE;
  background-image:
    repeating-linear-gradient(93deg, rgba(27,25,21,.045) 0 1px, transparent 1px 3px),
    repeating-linear-gradient( 3deg, rgba(27,25,21,.035) 0 1px, transparent 1px 4px);
}
```

### 特徵 2：塊面優先於輪廓，而且邊是斷的

形由一道一道側鋒排線堆出來，只有少數幾個地方會出現輪廓線，而且那條線必須**斷斷續續**（炭走過紙的凹處會漏掉）。

```js
/* 斷線：走過去的路上，牙低的地方直接跳過 */
function edge(pts, w, a) {
  for (const [x, y] of walk(pts, step)) {
    if (jit(x/5, y/5, SEED) < 0.24) continue;   // 約四分之一的印子不落下
    splat(x, y, w, a, angle, 0.8);              // 側鋒＝被拉長的印子
  }
}
```

排線塊面的四個參數決定調子：**角度、間距、寬度、壓力**。同一塊面至少交疊兩個角度（相差 60–90°），單一角度看起來像機器。

```js
hatch(poly, -1.02, 4.2, 0.26, 3.4);   // 第一道：順著形的方向
hatch(poly,  0.42, 5.6, 0.18, 3.0);   // 第二道：交叉，壓低一階
```

CSS 端的對應物是**分隔線**：不要用 `border`，用一條被紙紋遮罩過的實心塊。

```css
.hr{ height:2px; background:#1B1915; opacity:.72;
     -webkit-mask-image:var(--grain); mask-image:var(--grain);
     -webkit-mask-size:192px; mask-size:192px; }
```

### 特徵 3：白是擦出來的——硬邊，外圈一圈灰暈

這是最容易被漏掉、也最致命的一項。加亮（`opacity`、`lighten`）做不出減法的亮部：減出來的亮部**中心幾乎回到紙色、邊緣突然結束、外面一圈比周圍還髒**（被推出去的炭粉）。

```js
/* 橡皮：中心帶走，外緣加回去 */
function lift(cx, cy, rx, ry, amt) {
  forEachCell((i, d) => {                       // d = 到中心的正規化距離
    const edge = 0.055 * (1 + jit(i));          // 邊界本身也是毛的
    if (d < 1 - edge)      den[i] -= den[i] * amt * (1 - d**3 * 0.4);
    else if (d < 1.4)      den[i] += amt * 0.30 * (1.4 - d) / 0.4;   // ← 灰暈
  });
}
```

純 CSS 版（用在文字下方的「被擦過的區塊」）：

```css
.rub::before{
  content:""; position:absolute; inset:-.5rem -1.1rem; z-index:-1;
  background:
    radial-gradient(58% 72% at 30% 46%,
      rgba(226,218,200,.34), rgba(226,218,200,.13) 58%, transparent 76%);
  -webkit-mask-image:var(--grain); mask-image:var(--grain); mask-size:192px;
}
```

canvas 端做即時擦除時用 `globalCompositeOperation:'destination-out'` 也可以，但**一定要另外補外圈的灰暈**，否則會看起來像貼上去的白色貼紙。

### 特徵 4：值域是「紙的暖灰 → 炭的冷黑」，零彩度

- 紙**不是白的**：#C9C0AE 這一階的暖灰。用純白會立刻變成「掃描件」。
- 炭**不是純黑的**：#1B1915，而且它反光，所以最暗處的覆蓋率上限壓在 ~96%。
- 值域壓縮在 12%–88%，**真黑只給 ≤3% 的面積**（通常是一個洞、一個口、一道縫）。
- 全站零彩度，唯一允許一個暖色作語意色，面積 ≤4%。

```css
:root{
  --paper:#C9C0AE;   /* 紙・46%  底 */
  --lit:#E8E1D0;     /* 擦白・14% 亮部與反白字 */
  --mid:#8A8377;     /* 中灰・10% 次要文字、規格標籤 */
  --soot:#1B1915;    /* 炭・26%  正文、邊、最暗 */
  --board:#2A2720;   /* 滿板的炭（暗底區） */
  --ember:#BF4E17;   /* 窯火橙・≤4%  唯一彩色語意 */
}
```

### 特徵 5：手在畫面裡——指痕、拖痕、浮粉、不收邊

炭筆素描一定有不屬於構圖的髒：指腹壓出的暈、袖口拖過去的一道、抖落的浮粉、還有**畫面邊緣不收邊**（形淡出成紙，沒有框）。

```js
/* 指痕：一團被帶走又放下的炭，不是一隻手的圖 */
function handmark(F, x, y, r, a, ang) {
  for (let i = 0; i < 7; i++) {                     // 沿著移動方向的一串重疊壓印
    const t = i/6 - 0.5;
    F.splat(x + cos(ang)*t*r*1.1, y + sin(ang)*t*r*1.1,
            r*(0.42 + 0.22*jit(i)), a*(0.5 + 0.7*(1 - Math.abs(t)*1.6)), ang, 0.52);
  }
  for (let k = 0; k < 4; k++) F.line(...);          // 指紋脊線：很淡，0.5a
  F.dust(x, y, r*0.9, a*0.4, 9);                    // 抖落的浮粉
}
```

不收邊（讓插圖淡出成紙，而不是切一個方框）：

```css
figure canvas{
  -webkit-mask-image:linear-gradient(to bottom,#000 78%,transparent 100%),
                     linear-gradient(to right,transparent 0,#000 4%,#000 96%,transparent 100%);
  mask-image:linear-gradient(to bottom,#000 78%,transparent 100%),
             linear-gradient(to right,transparent 0,#000 4%,#000 96%,transparent 100%);
  -webkit-mask-composite:source-in; mask-composite:intersect;
}
```

---

## 三、色彩系統

| 色 | hex | 用途 | 目標比例 |
|---|---|---|---|
| 紙・暖灰 | `#C9C0AE` | 全站底色；所有長文一律在紙上 | 46% |
| 板・滿炭 | `#2A2720` | 刊頭、footer、擦板區、暗底段落 | — |
| 炭・冷黑 | `#1B1915` | 正文、邊線、最暗處 | 26% |
| 擦白 | `#E8E1D0` | 擦出來的亮部、暗底上的字 | 14% |
| 中灰 | `#8A8377` | 標籤、次要資訊、規格欄 | 10% |
| 窯火橙 | `#BF4E17` | **唯一彩色**：現用、警示、關鍵數字 | ≤4% |

規則：

- **零純白（#FFF）、零純黑（#000）。** 出現任何一個，這張圖就不是炭畫的。
- 暗底區（`--board`）不是「反相」：它是「這一塊還沒被擦」。所以暗底上的字必須坐在一塊被擦過的淡斑上，而不是直接放在滿炭上。
- 橙色永遠不能大面積出現，也不能拿來當背景。它是火，不是色塊。
- 需要第二個語意色時，**往值域裡找**（更暗的炭、更亮的擦白），不要往色相裡找。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 級距 |
|---|---|---|---|
| 中文標題 | Noto Serif TC | 900 | `clamp(1.9rem, 5.4vw, 3.2rem)`；首屏 `clamp(3.1rem, 9.4vw, 6.4rem)` |
| 中文正文 | Noto Serif TC | 400 | 16.5px / 1.92 |
| 拉丁標籤・數字 | Anton | 400（本身即壓縮粗體） | .66–.78rem，`letter-spacing:.2em` |
| 大數字 | Anton | 400 | 1.9–2.1rem |

- **禁用等寬字。** 這是這個流派最容易走偏的地方：mono 數字會把畫面立刻推進「工程製圖」家族。規格、價格、溫度一律用 Anton（壓縮無襯線）或襯線本體。
- 標題用襯線 900 是因為炭的塊面需要一個有肉的形去對應；細襯線（Didone）在紙紋上會斷掉。
- 拉丁小標一律大寫＋寬字距，當成「畫在紙邊的鉛筆註記」。
- 行高給大（1.9），因為底紋是活的，行距太小會讓紙紋和文字打架。
- 只在**標題、分隔線、導覽、轉場**套紙紋遮罩；**正文不要遮罩**（可讀性優先，正文靠底紋already 夠）。

---

## 五、版面與網格

- 主欄位不對稱：`grid-template-columns: minmax(0,1.62fr) minmax(0,1fr)`，右欄（側註）往下推 2.6rem，讓兩欄的起點不齊。
- 列表型內容（商品、工序）用**整寬橫列**，交替左右配置插圖；**不要切成三張卡片**。
- 段落最大寬度 66ch；側註 border-left 2px 實線（不是色塊、不是圓角）。
- 零圓角、零模糊陰影。這個媒材沒有「浮起來」這件事，只有「被擦得比較乾淨」。
- 分隔線：2px 實心 + 紙紋遮罩（見特徵 2）。
- 插圖用 `aspect-ratio` 或依容器寬度即時算高，**渲染解析度＝CSS 像素**（不放大 devicePixelRatio）：紙紋本來就是像素級的，放大兩倍反而讓顆粒變成馬賽克。
- RWD：≤900px 收成單欄；≤560px 導覽改成四格等寬、首屏最小高 340px、插圖最大寬 340px。

---

## 六、元件配方

### 導覽（擦亮窗格 rubbed-window）

四格暗塊排在滿炭的刊頭上，**現用頁那一格是被擦得最乾淨的那一格**——語意不靠底線、不靠反相，靠「亮度＝乾淨程度」。

```css
.rubnav a{ position:relative; background:#353128; color:#BDB4A2;
  padding:.42rem 1.05rem; box-shadow:inset 0 0 0 1px #1A1814;
  transition:background-color .22s ease, color .22s ease; }
.rubnav a::before{ content:""; position:absolute; inset:2px; pointer-events:none;
  background:radial-gradient(62% 74% at 44% 42%,
    rgba(232,225,208,.30), rgba(232,225,208,.07) 62%, transparent 74%);
  mask-image:var(--grain); mask-size:192px; opacity:.55; transition:opacity .22s ease; }
.rubnav a:hover::before{ opacity:.85 }                 /* hover ＝再擦兩下 */
.rubnav a[aria-current="page"]{ background:#CFC7B4; color:#24211B }
.rubnav a[aria-current="page"]::before{ opacity:1 }
```

### 按鈕

實心炭塊或 2px 實線框，零圓角，hover 只變一階明度（不位移、不加陰影）。

```css
.btn{ background:#1B1915; color:#E8E1D0; padding:.62rem 1.35rem; border:0;
      font-weight:700; letter-spacing:.12em }
.btn:hover{ background:#3C3730 }
.btn.ghost{ background:transparent; color:#1B1915; box-shadow:inset 0 0 0 2px #1B1915 }
```

### 資料列（取代卡片）

```css
.item{ display:grid; grid-template-columns:minmax(0,.9fr) minmax(0,1.35fr) minmax(0,.62fr);
       gap:2.4rem; padding:1.9rem 0; border-top:1px dotted #7C7568 }
.item:nth-child(even){ grid-template-columns:minmax(0,.62fr) minmax(0,1.35fr) minmax(0,.9fr) }
.item:nth-child(even) .fig{ order:3 }                  /* 插圖左右交替 */
.meta div{ display:flex; justify-content:space-between; border-bottom:1px dotted #8A8377 }
```

### 暗底上的文字塊

暗底（滿炭）上的每一段文字都要坐在一塊被擦過的淡斑上。有 JS 時用 `rubField()` 依實際文字方框擦；沒有 JS 時用 `.rub::before` 的 CSS 版（見特徵 3）保底。

### footer

滿炭底、四欄、`h4` 用 Anton 寬字距小標；最後一段細字（.78rem）放虛構聲明與建置模型。

---

## 七、動效規則

四種性質不同的動態，缺一不可；全部都有 `prefers-reduced-motion` 降級且資訊零損失。

| 類型 | 做什麼 | 參數 |
|---|---|---|
| **ambient 環境** | 底紋位移（浮炭）＋ 首屏板上未擦牢的炭粉每 2.4 秒往下沉一點點 | `animation:drift 150s linear infinite`（背景位移 256px/512px）；板上 `smudge(x,y,0,2.6,20,null,0.05)`，僅重繪 60×60 的髒矩形 |
| **input 輸入** | 指標在任何暗底上移動＝蹭；`pointermove` 當幀就重繪，延遲 <100ms（實測單次 0.03 ms 計算 + 0.35 ms 局部上紙） | 半徑 `12–34px`，由 `PointerEvent.pressure` 與 `tiltX/tiltY` 決定 |
| **transition 轉場** | 換頁＝一道橡皮橫掃：斜向亮帶 `translateX(-115% → 115%)`，出場 330ms 後導航，進場反向 500ms | `cubic-bezier(.3,.1,.2,1)`，亮帶本身套紙紋遮罩 |
| **signature 簽名** | **質量守恆的蹭炭傳輸**：炭不會被創造或消失，只會換地方——一部分被推到前方的格子、一部分黏在手上，手上的炭跨頁帶走並在淺色頁面留下指痕 | 取走 `den*k*f`，其中 78% 推到位移後的格子、22% 進手；手每幀還回 `load*5%` |

```css
@keyframes drift{ from{background-position:0 0} to{background-position:256px 512px} }
@keyframes wipe { from{transform:translateX(-115%);opacity:1}
                    to{transform:translateX(115%); opacity:1} }
@media (prefers-reduced-motion:reduce){
  body{animation:none}                 /* 紙紋靜止，仍然在 */
  #wipe{display:none}                  /* 直接換頁，內容一致 */
  *{transition-duration:.01ms!important}
}
```

降級原則：**蹭髒與擦除是資訊，不是裝飾**，所以 reduced-motion 下它們照常運作，只是沒有過場動畫。被關掉的只有「自己會動」的那兩項（底紋位移、浮炭下沉）。

---

## 八、插畫與圖像風格（tonal-massing 炭粉塊面）

全站不使用任何外部圖片。所有圖像——建築、產品、工序、手印、logo、favicon——都是**同一支密度場引擎**的輸出，四個原語：

1. `splat(x,y,r,a,ang,sq)`：側鋒的一個壓印（被拉長的橢圓，`sq≈0.34`）。
2. `hatch(poly,ang,gap,a,w)`：在多邊形內排線；同一塊面至少兩個角度。
3. `edge(pts,w,a)`：斷續的輪廓，只用在少數「找到的邊」。
4. `lift / rubStroke / rubField`：擦。`rubField` 是用形的法線算擦除量，所以亮部會跟著形轉，而不是一條一條刷出來的條紋。

畫一個東西的順序永遠是：**大塊面 → 暗部加壓 → 找到的邊 → 擦亮部 → 抖浮粉**。

判準：**把顏色全部抽掉（本來就沒有顏色），仍然讀得出光從哪裡來、哪一面是暗的、哪一塊是最黑的。**

兩種模式，同一支引擎：

- **加法（紙上）**：底是紙，density 從 0 往上加。用在內頁插圖。
- **減法（板上）**：底是滿炭（density ≈ 1.1），全部靠 `lift` 把亮部帶走。用在暗底區與首屏。這是炭筆素描的 *toned ground* 技法，兩者在同一站並置時，讀者會立刻理解「亮＝被拿走的炭」。

明文禁用：照片、半調網點、細線幾何線描（thin-lineart）、扁平化單色圖示、任何 `feTurbulence` 手抖濾鏡貼在完成圖上假裝質感。

---

## 九、Logo 與 Favicon

**Logo**：一支畫用炭條＋一塊炭。作法不是畫向量形狀，是把同一支引擎的密度場**取樣成點陣圓**（stipple）輸出成 SVG：

```js
for (let y = 1; y < H; y += 1.9) for (let x = 1; x < W; x += 1.9) {
  const jx = (jit(x*.7, y*.3, 5) - .5) * 1.9, jy = (jit(y*.7, x*.3, 9) - .5) * 1.9;
  const c = field.cov(x + jx, y + jy);
  if (c < 0.18) continue;
  out.push(`<circle cx="${x+jx}" cy="${y+jy}" r="${(0.42 + c*1.02).toFixed(2)}"
            opacity="${Math.min(1, c*1.2).toFixed(2)}"/>`);
}
```

約 1,100 個圓、49 KB，縮到 36px 仍然看得出是「一支炭」。**不要**用實心路徑描外形——那會變成剪影 icon，不是炭。

**Favicon**：32×32 inline SVG data URI。滿炭底 + 一支斜的淺色炭條 + 一塊黑塊，三個形狀就夠，不要在 16px 裡放顆粒。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%232A2720'/%3E%3Cpath d='M5.5 24.5 20 6.5l4.2 3.2L9.8 27.8z' fill='%23CFC6B2'/%3E%3Cpath d='M5.5 24.5l4.3 3.3 1.6-5.2z' fill='%2315140F'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 一張紙紋場全站共用，底紋與遮罩都從它來。
- 每一塊亮部都問一次：「它是被擦出來的嗎？」是，就給它硬邊＋外圈灰暈。
- 讓使用者弄髒畫面，並且**不要自動清乾淨**。髒是這個媒材的在場證明。
- 值域壓縮：真黑 ≤3% 面積，其餘都在中間調裡分。
- 插圖邊緣淡出成紙，不要框。

**Don't**

- ❌ 紫藍漸層、圓角卡片、模糊大陰影——這個媒材沒有「浮起來」。
- ❌ 純白 `#FFF` 與純黑 `#000`。
- ❌ 等寬數字（會立刻變成工程製圖風）。
- ❌ 用 `opacity` 或 `filter:brightness()` 假裝亮部。加亮 ≠ 減法。
- ❌ 均勻的灰階雜訊當紙紋（要的是「濃度越低越碎」，不是等量噪點）。
- ❌ emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、「把 X 變成 Y」句式。
- ❌ 把全站都套遮罩（正文會變得很難讀）。遮罩只給標題、線、導覽、轉場。

---

## 十一、頁面骨架範例（可直接使用）

```html
<body>
<a class="skip" href="#main">跳到內容</a>
<div id="wipe" aria-hidden="true"></div>

<header class="masthead">            <!-- 滿炭底 -->
  <div class="in">
    <a class="mark" href="index.html"><svg width="36" height="36">…</svg>
      <span><b>店名</b><i>ROMANISATION</i></span></a>
    <nav class="rubnav" aria-label="主導覽">
      <a href="index.html" aria-current="page">首頁<em aria-hidden="true">擦</em></a>
      <a href="b.html">第二頁</a><a href="c.html">第三頁</a><a href="d.html">第四頁</a>
    </nav>
  </div>
</header>

<section class="board">              <!-- 首屏＝一塊滿炭的板，字住在擦過的淡斑上 -->
  <canvas id="bd" aria-hidden="true"></canvas>
  <div class="boardtext">
    <p class="kicker">地點・行業</p>
    <h1>店名</h1>
    <p class="rom">ROMANISATION</p>
    <p class="lede rub">一句從產業本身長出來的話。</p>
    <dl class="facts rub">…地址／電話／營業時間…</dl>
  </div>
</section>

<main id="main">
  <section><div class="wrap">
    <div class="lay">                <!-- 1.62fr / 1fr 不對稱 -->
      <div><h2><span class="no">01</span>標題</h2>
        <p class="sub">LATIN SUBTITLE</p>
        <p>…</p>
        <figure><canvas id="fig-1"></canvas><figcaption>…</figcaption></figure></div>
      <div class="side"><p class="note"><b>標籤</b>側註…</p></div>
    </div>
  </div></section>
  <div class="wrap"><div class="hr grain"></div></div>
</main>

<footer>…四欄＋細字聲明…</footer>
<canvas id="hands" aria-hidden="true"></canvas>       <!-- 手印疊層（fixed, pointer-events:none） -->
<div id="handbar">手上的炭 <b>0.00 g</b> <button>洗手</button></div>
</body>
```

---

## 十二、技術實作與相容性

本站三項核心技術，選它們的理由都是「這個流派的視覺特徵需要它」，不是「它很酷」。

### (1) CSS `mask-image` 顆粒遮罩（A 渲染層）

**承載**：特徵 1 與 2——標題、分隔線、導覽亮斑、換頁亮帶都被同一張紙紋咬過，所以 DOM 元件與 canvas 插圖看起來是同一張紙上的東西。遮罩圖是執行期由紙紋場產生的 192×192 PNG data URI，寫進 `--grain` 自訂屬性。

**支援現況（查證：MDN《mask-image》與 caniuse `mdn-css_properties_mask-image`，2026-09 查閱）**：unprefixed `mask-image` 自 **2023 年 12 月**起成為 Baseline，Chrome / Edge / Firefox / Safari 現行版皆支援；較舊的 Safari 與 Android WebView、Samsung Internet 4–24 需要 `-webkit-mask-image`，因此**兩個屬性一律成對寫**。

**Fallback 具體行為**：不支援時 `--grain` 仍然是一個合法的 url()，只是遮罩不生效 → 標題與分隔線變成實心、亮斑變成平滑的 radial-gradient。**版面、色彩、層級、可讀性完全不變**，只少了顆粒。若連 canvas 都不可用（`--grain: none`），body 退回兩道 `repeating-linear-gradient` 的紙紋近似。

### (2) `PointerEvent.pressure` / `tiltX` / `tiltY`（D 輸入與感測層）

**承載**：特徵 3——擦除量與擦除半徑必須由「你壓多重」決定，否則橡皮只是一個固定大小的橡皮擦游標，減法就變成了填色。壓力同時餵給三件事：擦除係數、擦頭半徑（12–34px）、以及破紙的累積量。

**支援現況（查證：MDN《PointerEvent: pressure property》，2026-09 查閱）**：`pressure` 屬於 Baseline widely available（2020 年 7 月起）。關鍵細節：**不支援壓感的硬體（滑鼠）在按下時回傳 0.5、未按下回傳 0**；`tiltX/tiltY` 在非觸控筆裝置一律回傳 0。

**Fallback 具體行為**：`press = e.pressure > 0 ? e.pressure : (e.buttons ? 0.55 : 0.3)`。滑鼠使用者得到一個固定中等力道的橡皮，遊戲完全可玩，只是少了「輕抹 / 重壓」的表情。觸控筆使用者額外得到傾角加成的擦頭寬度。完全沒有指標裝置（鍵盤、讀屏）時，側欄的「示範擦一道」按鈕會沿著題目最亮的一條帶擦出一道並說明擦法，且所有結果文字都在 `aria-live="polite"` 區塊裡。

### (3) 自寫週期性 value noise 紙紋場（E 資料與生成層）

**承載**：特徵 1、4、5 的全部——它同時是底紋、是遮罩、是覆蓋率公式裡的那一項，也是 logo 與 favicon 的來源。自己寫（而不是用 `feTurbulence`）有三個實際理由：(a) 需要**同一組數值**同時給 CSS 遮罩與 canvas 上紙，濾鏡做不到；(b) 需要**可平鋪**（週期性 hash），濾鏡的 tile 會露接縫；(c) 需要 `tooth(x,y)` 這個純函數在 node 與瀏覽器給出完全一樣的結果，才能離線驗圖。

**支援現況**：純 JS 算術（`Math.imul`、`Float32Array`），無 API 依賴，ES5 語法。唯一的環境需求是 Canvas 2D 的 `createImageData` / `putImageData`（Baseline widely available）。

**Fallback**：沒有 canvas → 不產生 data URI，`--grain` 與 `--tooth` 保持 `none`，走 CSS 漸層紙紋；所有插圖的 `<canvas>` 保留 `aria-label` 描述，文字內容一字不少。整站在 `<noscript>` 下仍可完整閱讀（營業資訊、價目、工序、規則全部是靜態 HTML）。

### 效能預算實測

以相同程式碼在 Node v22（單執行緒、無 GPU）量測，瀏覽器另加 `putImageData` 的上傳成本：

| 項目 | 實測 | 預算 | 結果 |
|---|---|---|---|
| 單頁大小（含全部 inline CSS/JS，不含 Google Fonts） | index 54 KB・炭品 57 KB・起窯 53 KB・擦板 60 KB | ≤350 KB | ✅ |
| 紙紋場建表（384²，一次性） | 39 ms | — | ✅ |
| 兩張遮罩／底紋 tile 的像素計算 | 10 ms | — | ✅ |
| 首屏板：密度場建構 + 全幅上紙（1100×460） | 37 + 45 = 82 ms | 首屏 JS ≤100 ms | ✅ |
| 互動：單次擦除計算 | 0.024 ms（500 次 12 ms） | — | ✅ |
| 互動：單次蹭抹計算（含質量結算） | 0.066 ms（500 次 33 ms） | — | ✅ |
| 互動：局部重繪 70×70 髒矩形 | 0.35 ms | 每幀 ≤16.6 ms | ✅ 60 fps |

三個讓它跑得動的決定：**(a)** 紙紋只算一次存成可平鋪查表，之後全站都是查表；**(b)** 互動只重繪指標周圍的髒矩形，並用 `requestAnimationFrame` 合併同一幀內的多次事件；**(c)** canvas 一律以 CSS 像素渲染，不乘 devicePixelRatio。

質量守恆是可驗算的：`grid_total + hand_load` 在 200 次蹭抹前後皆為 7067.44（Float32 精度內完全相等）。

---

## 十三、把這個風格搬到別的產業

這個流派**不綁炭窯**。它綁的是三件事：手工、髒、以及「重要的東西是被清出來的」。

- **修復工坊／古書修復**：滿炭的板換成蒙塵的書頁，擦＝清潔測試窗。
- **深夜電台**：暗底＝沒有訊號的時段，擦＝調出一個台。
- **拳館／體能**：Bellows 的炭筆拳賽本來就是這個流派的代表作，暗場＋擦出來的身體高光。
- **考古現場**：刷去表土＝擦；出土物就是被減出來的亮部。

換產業時，五個不可省略特徵一項都不能少；可以換的是題材、文案語氣、以及那個 ≤4% 的語意色（火橙可換成鏽紅、青銅、靛藍，但**只能有一個**）。
