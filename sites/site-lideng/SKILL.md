---
name: midcentury-laminate
description: Mid-century modern surface design driven by 1950s high-pressure laminate countertops — scattered boomerang, starburst, cracked-ice and kidney motifs at 8–13% coverage on a dawn-pink ground, charcoal hairlines, splayed tapered walnut legs, and geometric all-caps Futura-family type.
---

# 中世紀現代 Mid-Century Modern（檯面美耐板 Laminate Surface）

繁體中文規格書。讀完這一份，你應該能在**任何產業**上重現這個風格，而不需要看過 Demo。

---

## 一、設計哲學

這個風格的中心不是家具，是**一片被印過的塑膠表面**。

一九五〇年代美國把高壓美耐板（HPL）推進每一間廚房，第一次讓「圖樣」變成一種可以整片賣、整片鋪、整片換掉的東西。設計師要解決的不是「畫一張好看的圖」，而是「這張圖被鋸成任意形狀、和任意一塊接在一起、被看六十年，會怎麼樣」。因此這個年代的表面設計有三個很特別的性質：

1. **它必須經得起被切斷。** 圖樣沒有中心、沒有邊框、沒有正確方向；隨便鋸一刀都不能出現「破圖」。
2. **它必須留白。** 因為它會鋪滿一整面檯面。密的圖在 10×10 公分的樣本上很好看，鋪成 180 公分就變成噪音。
3. **它必須配得起別的東西。** 檯面下面是木頭、旁邊是磁磚、上面是人。它不能自己當主角。

於是產生了這個風格的核心手勢：**在一片安靜的地色上，稀疏地灑幾個有機幾何母題，然後用細線和細腳把整件事撐離地面。**

一九五〇年代家具的「浮起來」（細錐腳、外斜、末端收尖）和表面的「灑」是同一件事的兩面：**兩者都在減少東西和地面接觸的面積。** 你如果只做了圖樣沒做腳，或只做了腳沒做圖樣，這個風格就只完成了一半。

反面地說，這個風格不是「復古米白＋芥末黃＋一個牛皮紙紋」。那是所有人都在做的懷舊套版。真正的中世紀現代是**塑膠的**：平、亮、零紙紋、零顆粒、零漸層，顏色是工業調出來的而不是天然染出來的。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是中世紀現代了——它會變成八〇年代的、或是現在的。每一項都附可直接複製的片段。

### 特徵 1：圖不能滿——母題散佈、彼此不接觸，覆蓋率 8–13%

母題（迴力鏢／星芒／腎形／碎冰）在一格 64px 見方裡灑 2–4 個，**任兩個不相交、不重疊、不排成行列**。實測覆蓋率：迴力鏢 8.0%、星芒 7.9%、腎形 11.0%、碎冰 12.4%（織紋 36% 是例外，它是底質不是母題）。留白不是省油墨，留白就是這個花色本身。

```js
// 母題散佈：決定性亂數 + 無縫平鋪（bbox 相交才複製到鄰格）
const T = 64;                       // 一格 64 單位
for (let i = 0; i < 3; i++) {       // 每格只放 3 個。放到 6 個就死了
  const cx = rnd() * T, cy = rnd() * T;
  // …生成母題點列 pts…
  for (const dx of [-T, 0, T]) for (const dy of [-T, 0, T]) {
    if (!bboxIntersectsTile(pts, dx, dy)) continue;   // 只複製會跨界的
    emit(pts.map(p => [p[0] + dx, p[1] + dy]));
  }
}
```

四個母題的幾何規則（照抄即可）：

```
迴力鏢 boomerang  圓弧骨架（張角 1.45–1.95 rad、半徑 8.5–13.5），沿法向加寬成閉合外形，
                  寬度 w(t) = 3.7 · sin(π·(0.16+0.68t)) —— 中央粗、兩端收尖到 0。
星芒 starburst    8 或 10 芒，長短交錯（偶數芒 ×1.0、奇數芒 ×0.58），線寬 1.9，
                  內半徑 1.5、外半徑 7.2–11.6，芯部一顆 r=1.9 的實心圓。
腎形 kidney       r(θ) = rr·(1 + k1·cos(θ+φ) + k2·cos(2θ+1.7φ))，k1∈[.30,.50]、k2∈[.16,.30]，
                  y 方向再壓 0.72 —— 必不對稱。對稱的那種是蛋，不是腎。
碎冰 crackedice   16 個隨機點，每點連到最近的 3 點，一律直線，線寬 1.4。
                  弧線的碎冰不叫碎冰，叫水漬。
```

### 特徵 2：檯面是一整片——圖樣的相位跟著版面走，不跟著元件走

一張美耐板被鋸成幾塊，圖樣還是同一張。網頁上要重現這件事：**元件不擁有自己的背景座標系**。

```css
/* 地：固定在視窗（檯面）座標系，捲動時圖不跟著跑 */
body { background-image: var(--pat); background-size: 112px 112px; background-attachment: fixed; }

/* 格狀元件：相位由它在版面上的格位決定，不是各自從 0 起算 */
.cell { --gx: 0; --gy: 0;
  background-image: var(--pat);
  background-size: var(--ts) var(--ts);
  background-position:
    calc(-1 * var(--gx) * (var(--cs) + var(--lw)))
    calc(-1 * var(--gy) * (var(--cs) + var(--lw)));
}
```

推論（重要）：**兩個相鄰元件如果套用同一張花色，它們之間的接縫會自動消失。** 這是這個風格最好用的一招，也是本 Demo 的簽名動效。

### 特徵 3：暖粉地 + 炭灰細線 + 兩個對比色，零漸層零陰影

```css
:root{
  --pink:  #E8A79F;  /* 檯面暖粉。大面積地色 ~34%，它就是檯面本身 */
  --ink:   #2C2A28;  /* 炭。只給 1.8px 的線與正文 ~10% */
  --chrome:#F2EFE6;  /* 鉻白。所有面板的底 ~26% */
  --turq:  #2F9E96;  /* 綠松。≤12% */
  --must:  #D6A32C;  /* 芥末。≤12%，現用態與主要動作 */
  --rose:  #D96A5E;  /* 玫瑰。≤8%，拒絕與焦點框 */
  --sage:  #7A8F6B;  /* 灰綠。≤6% */
  --sky:   #6F9FC4;  /* 天青。≤6% */
  --walnut:#6B4526;  /* 核桃木。只給「木」：腳、封邊條、連結 */
}
```

硬規則：

- 地色**必須是有彩度的暖粉**，不是米白、不是奶油色。米白＋芥末是懷舊套版，不是這個年代。
- 木褐 `--walnut` **只准出現在木頭的角色上**（腳、封邊條、超連結）。它不是文字色、不是邊框色。
- 全站**零 `linear-gradient`、零 `box-shadow` 的 blur、零 noise/紙紋圖層**。塑膠的本分就是平。
- 需要層次時用**明度差 + 1.8px 實線**，不要用陰影。

### 特徵 4：細錐腳外斜，板下留得到空隙

所有承載面板由 **5px 寬、24px 長、往外斜 8–10°、末端收尖**的木腳撐起，面板下緣與下方元素之間**永遠留 ≥14px 的空隙**。一九五〇年代的家具是浮在地上的——你看得到它底下的地板，這件事比任何造形都重要。

```css
.legs{ position:relative; padding-bottom:26px; }
.legs::before,.legs::after{
  content:""; position:absolute; bottom:0; width:5px; height:24px;
  background:var(--walnut);
  clip-path:polygon(0 0, 100% 0, 64% 100%, 36% 100%);   /* 末端收尖 */
}
.legs::before{ left:8%;  transform:rotate(9deg);  transform-origin:top center; }
.legs::after { right:8%; transform:rotate(-9deg); transform-origin:top center; }
```

### 特徵 5：三種輪廓各司其職，字是幾何無襯線大寫寬字距

**板是直角、圖是有機曲線、標是膠囊**——三種輪廓語彙不混用。板不准有 8px 圓角，圖不准是正圓或正多邊形，標不准是方的。

```css
.paper{ border-radius:0 }                                   /* 板：直角 */
.k    { border-radius:999px; padding:2px 9px }              /* 標：膠囊 */
/* 圖：只用 特徵1 的四種有機幾何母題 */

.lbl{ font-family:"Jost","Noto Sans TC",sans-serif; font-weight:500;
      font-size:11.5px; letter-spacing:.16em; text-transform:uppercase; }
h1,h2,h3{ font-family:"Jost","Noto Sans TC",sans-serif; font-weight:700; line-height:1.12; }
/* 禁止：字重 >700、襯線、斜體、任何 display 花體 */
```

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 檯面暖粉 | `#E8A79F` | 全站唯一大面積地色；上面永遠有一層極疏的星芒（覆蓋率約 6%） | ~34% |
| 鉻白 | `#F2EFE6` | 所有面板、卡片、表格底、花色卡的基材色 | ~26% |
| 炭 | `#2C2A28` | 1.8px 線、正文、表頭底、母題的其中一族 | ~10% |
| 綠松 | `#2F9E96` | 對比色一（冷） | ≤12% |
| 芥末 | `#D6A32C` | 對比色二（暖）；現用態、主要動作按鈕 | ≤12% |
| 玫瑰 | `#D96A5E` | 拒絕、焦點框、母題色族 | ≤8% |
| 灰綠 | `#7A8F6B` ／ 天青 `#6F9FC4` | 母題色族，僅在花色卡上出現 | 各 ≤6% |
| 核桃木 | `#6B4526` | **只給木**：細錐腳、封邊條、超連結 | ~4% |

配色紀律：

- 一個畫面上同時出現的高彩度色**不超過三個**（不含地色與鉻白）。
- 兩塊色域相鄰時中間夾一條 1.8px 炭線或一段鉻白，**不做漸層過渡**。
- 對比：正文 `--ink` on `--chrome` = 12.6:1；`--ink` on `--pink` = 7.9:1，皆遠高於 4.5:1。**不要把正文放在暖粉地上以外的彩色塊上。**

---

## 四、字體系統

| 角色 | 字體 | 字重 | 尺寸 | 其他 |
|---|---|---|---|---|
| 標題 h1 | Jost + Noto Sans TC | 700 | `clamp(26px,4.6vw,44px)` | line-height 1.12 |
| 標題 h2/h3 | Jost + Noto Sans TC | 700 | 26 / 20px | |
| 小標 `.lbl` | Jost | 500 | 11.5px | **大寫、letter-spacing .16em** |
| 正文 | Noto Sans TC | 400 | 16px | line-height 1.78 |
| 次要 `.small` | Noto Sans TC | 400 | 13.5px | line-height 1.72 |
| 編號／價格 | Space Mono | 700 | 依上下文 | 表格中的數字一律用它 |

```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

Jost 是 Futura 的開源重繪，本風格的拉丁字必須落在 Futura／Century Gothic／Avenir 這一族的幾何無襯線裡。**中文用 Noto Sans TC 400/500/700，不要用 900**——這個年代沒有超粗黑。

---

## 五、版面與網格

- **主網 8 欄**，`gap: 0`。欄與欄之間的分隔就是 1.8px 炭線本身，不留空隙。
- **模組用 subgrid**：每一塊 `.mod` 是「一塊被裁下來的檯面」，它的內部欄線必須落在同一組主欄線上——整頁共用同一組**裁切線**。

```css
.sheet{ display:grid; grid-template-columns:repeat(8,1fr); gap:0 }
.mod  { grid-column:1/-1; display:grid; grid-template-columns:subgrid;
        border:1.8px solid var(--ink); border-bottom:0; background:var(--chrome) }
.mod:last-of-type{ border-bottom:1.8px solid var(--ink) }
@supports not (grid-template-columns:subgrid){ .mod{ grid-template-columns:repeat(8,1fr) } }
.mod > *      { grid-column:1/-1; padding:20px 22px }
.mod > .c3    { grid-column:span 3 }   /* c1…c6 同理 */
.mod > * + *  { border-left:1.8px solid var(--ink) }
```

- **不對稱切分**：欄寬用 5+3、3+5、4+4、1+4+3，避免 4+4 連用兩次以上。
- **留白**：面板內距 20–22px，段間 .85em。留白給在**元件之間**（尤其是垂直方向的空隙，見特徵 4），不是給在文字四周。
- **旋轉**：只有導覽的疊板允許 −5.5°～+6.1° 的小角度；內容區一律不旋轉。
- **RWD**：≤900px 導覽攤成頁首四格橫列；≤640px 扇形樣品串攤成 3 欄格；`.mod` 的 c2/c3 在 ≤640px 自動落為整列（`grid-column:1/-1`）。

---

## 六、元件配方

**導覽（stack-straighten 抽正）**——四頁＝四張疊在一起的板，現用頁那一張被抽出來並轉正，其餘全歪：

```css
.nav a{ position:absolute; left:0; width:166px; padding:5px 11px;
  background:var(--chrome); border:1.8px solid var(--ink); color:var(--ink); text-decoration:none;
  transform-origin:14px 50%; transition:transform 200ms cubic-bezier(.2,.9,.3,1) }
.nav li:nth-child(1) a{ top:0;   transform:rotate(-5.5deg) }
.nav li:nth-child(2) a{ top:34px;transform:rotate(3.2deg)  }
.nav li:nth-child(3) a{ top:68px;transform:rotate(-2.4deg) }
.nav li:nth-child(4) a{ top:102px;transform:rotate(6.1deg) }
.nav a:hover                { transform:rotate(0) translateX(14px) }
.nav a[aria-current=page]   { transform:rotate(0) translateX(42px); background:var(--must); z-index:5 }
```

**按鈕**——無陰影，hover 是「被拿起來 2px」而不是被壓下去：

```css
.btn{ border:1.8px solid var(--ink); background:var(--chrome); color:var(--ink);
      font:500 14.5px/1 "Noto Sans TC",sans-serif; padding:11px 17px; border-radius:0;
      transition:transform 90ms linear, background-color 90ms linear }
.btn:hover  { transform:translateY(-2px); background:var(--must) }
.btn.go     { background:var(--must) }
.btn.go:hover{ background:var(--turq); color:var(--chrome) }
```

**花色卡（樣品）**——上圖下字，hover 換一個尺度：

```css
.sw{ background:var(--chrome); border:1.8px solid var(--ink); display:flex; flex-direction:column }
.sw .face{ flex:1; min-height:104px;
  background-image:var(--pat); background-size:var(--ts) var(--ts);
  border-bottom:1.8px solid var(--ink);
  transition:background-size 90ms steps(2) }
.sw:hover .face,.sw:focus-within .face{
  background-size:calc(var(--ts)*1.7) calc(var(--ts)*1.7) }
```

**表單**——欄位是被裁切線分格的，不是一堆浮在空白裡的框：

```css
.f{ display:grid; grid-template-columns:repeat(2,1fr);
    border-width:1.8px 0 0 1.8px; border-style:solid; border-color:var(--ink) }
.f label{ padding:10px 12px; border:0 1.8px 1.8px 0 solid var(--ink) }
.f input,.f select,.f textarea{ width:100%; border:1.8px solid var(--ink);
  background:var(--chrome); color:var(--ink); border-radius:0; padding:6px 7px }
```

**表格**：`border-collapse:collapse`，格線 1.8px，`th` 是炭底鉻白字、Jost 500 大寫 letter-spacing .11em，偶數列底 `rgba(44,42,40,.045)`。

**Footer**：頂邊 1.8px 炭線，其餘不加框，13px。

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可。四種都必須有 `prefers-reduced-motion` 降級，且降級後**資訊零損失**。

| 類型 | 內容 | duration / easing | 降級 |
|---|---|---|---|
| **ambient 環境** | ①檯面地紋 92 秒走完一格 112px（`background-position` 動畫）；②浮起的量體以 8.3s／10.9s／13.7s 三個不同步週期微轉 ±0.9°、微移 3px | 92s linear infinite；8–14s ease-in-out infinite | 動畫關閉、地紋停在 `0 0`，構圖完全相同 |
| **input 輸入** | hover／focus 花色卡 → 該卡的圖樣**換一個尺度**（`background-size` ×1.7）；扇形樣品串的卡被拉起 24px | 90ms steps(2)（Houdini 環境下改為 90ms cubic-bezier(.3,.9,.3,1) 連續縮放） | transition 歸零＝瞬間切換，尺度資訊仍在 |
| **transition 轉場** | 裁切推入：`clip-path` 斜切多邊形從右下推入，三塊 stagger 90ms | 420ms cubic-bezier(.2,.85,.3,1) | 不播，直接是最終畫面 |
| **signature 簽名** | **接縫消失 seam-vanish**（見下） | 90ms，無 easing | transition 歸零，但**仍然直接呈現合併後的狀態**——資訊零損失 |

### 簽名動效：接縫消失 seam-vanish

**當介面要說「這兩塊不可以並排」時，它不畫紅框、不搖晃、不變灰——它讓那兩塊之間的接縫直接消失，圖樣接過去，兩塊變成同一片檯面。**

因為在這一行，兩塊分不出來，就等於它們是同一片。否定不是被標示出來的，是被**合併**出來的。

做法（純 CSS + 一個橋接元素，不需要量測）：

```js
// 1) 把被指到的空格換成鄰居的花色（兩者從此共用同一個座標系，見特徵 2）
cell.style.setProperty('--pat', neighbourPat);
cell.style.setProperty('--ts',  neighbourTs);
// 2) 用一個 1.8px 的橋蓋住兩格之間的溝，並給它同一張圖、同一個相位
bridge.style.left = `calc(${x} * (var(--cs) + var(--lw)) + var(--cs))`;
bridge.style.top  = `calc(${y} * (var(--cs) + var(--lw)))`;
bridge.style.setProperty('--bx', bridge.style.left);
bridge.style.setProperty('--by', bridge.style.top);
```

```css
.bridge{ position:absolute; display:none; pointer-events:none;
  background-image:var(--pat); background-size:var(--ts) var(--ts);
  background-position: calc(-1 * var(--bx)) calc(-1 * var(--by)) }
.bridge.on{ display:block }
```

**禁令（本風格自我限制，但總動效數仍為 4）**：禁用淡入式滾動揭示、視差、數字滾動、跑馬燈、按壓硬陰影、`stroke-dashoffset` 描繪、彈跳 bounce。這個年代的東西不會彈。

---

## 八、插畫與圖像風格

**全站零外部圖片、零照片、零描外形的插圖。** 所有圖像由一支引擎輸出，原語只有兩類：

1. **四種有機幾何母題**（迴力鏢／星芒／腎形／碎冰）＋ 一種底質（織紋）＋ 素色，規則見特徵 1。
2. **三種載體幾何**：直角面板（板）、5px 收尖外斜木腳（腳）、1.8px 炭線（裁切線）。

判準：**拿掉顏色，仍讀得出這是哪一種母題、它是幾號尺度。** 尺度用 tile 尺寸表示：一號 44px、二號 72px、三號 118px；同一個母題換一個尺度就是另一款板。

不准出現：半調網點、手抖濾鏡（`feTurbulence`）、細線幾何線描的小屋小物件、寫實描繪、等角視圖、任何紙纖或顆粒圖層。

---

## 九、Logo 與 Favicon

**Logo**：一個橫向鉻白面板（1.8px 炭框），面板上並置**三個母題各一**（一段玫瑰迴力鏢粗弧、一顆綠松星芒、一片芥末腎形），面板下方一條炭線代表地面，線上左右各一根木色收尖細腳。這是把五個特徵一次講完的最短句子。

```svg
<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="120" fill="#F2EFE6" stroke="#2C2A28" stroke-width="1.8"/>
  <path d="M22 62c14-26 44-34 66-18" fill="none" stroke="#D96A5E" stroke-width="11" stroke-linecap="round"/>
  <g stroke="#2F9E96" stroke-width="2.6"><path d="M132 30v34M115 47h34M120 35l24 24M144 35l-24 24"/></g>
  <circle cx="132" cy="47" r="4" fill="#2F9E96"/>
  <path d="M170 34c12-6 26 2 24 14s-18 16-25 8-6-18 1-22z" fill="#D6A32C" stroke="#2C2A28" stroke-width="1.8"/>
  <path d="M18 82h204" stroke="#2C2A28" stroke-width="1.8"/>
  <g fill="#6B4526"><path d="M40 82l5 0-1.4 22h-2.2z"/><path d="M196 82l5 0 1.4 22h-2.2z"/></g>
</svg>
```

**Favicon**：暖粉底、一塊鉻白板、一道玫瑰迴力鏢、兩根木腳。以 inline SVG data URI 寫在 `<head>`，不用 .ico、不用 .png。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E…%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 地色用有彩度的暖粉，讓所有面板浮在它上面。
- 母題灑得比你以為的少。覺得「有點空」的時候，那個密度才對。
- 每一塊承載面板都給它腳，並且讓人看得到腳底下的地。
- 小標一律大寫 + .16em 字距，這是這個年代的聲音。
- 圖樣的相位跟著版面走。相鄰同花色就讓接縫消失——這是這個風格最好用的一招。
- 數字用 Space Mono，讓規格看起來像規格。

**Don't**

- ❌ 不要用米白／奶油色當地色，配芥末黃再加一層牛皮紙紋。那是懷舊套版，不是這個風格。
- ❌ 不要漸層、不要模糊陰影、不要 `border-radius: 8px`、不要毛玻璃。
- ❌ 不要把母題排成整齊的行列或做成無縫「圖騰牆」——它會立刻變成布料或壁紙。
- ❌ 不要用超粗黑（900）中文標題，也不要襯線。
- ❌ 不要 emoji 當 icon；icon 用母題與 1.8px 線自繪。
- ❌ 不要 Lorem ipsum，不要「在當今快節奏的世界」，不要「EST. 19xx」徽章。
- ❌ 不要把 `--walnut` 木褐拿去當文字色或框線色。它只給木頭。
- ❌ 不要在同一畫面用超過三個高彩度色。
- ❌ 不要把面板直接坐在底上（沒有腳、沒有空隙）——那是八〇年代的量體感，不是這個年代。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--pink:#E8A79F;--ink:#2C2A28;--chrome:#F2EFE6;--turq:#2F9E96;--must:#D6A32C;
      --rose:#D96A5E;--walnut:#6B4526;--lw:1.8px;--pat:url("data:image/svg+xml,…")}
*{box-sizing:border-box;margin:0;padding:0}
body{font:400 16px/1.78 "Noto Sans TC",sans-serif;color:var(--ink);
  background-color:var(--pink);background-image:var(--pat);background-size:112px 112px;
  background-attachment:fixed}
.wrap{max-width:1160px;margin:0 auto;padding:0 18px 90px}
.sheet{display:grid;grid-template-columns:repeat(8,1fr);gap:0}
.mod{grid-column:1/-1;display:grid;grid-template-columns:subgrid;
  border:var(--lw) solid var(--ink);border-bottom:0;background:var(--chrome)}
.mod:last-of-type{border-bottom:var(--lw) solid var(--ink)}
@supports not (grid-template-columns:subgrid){.mod{grid-template-columns:repeat(8,1fr)}}
.mod>*{grid-column:1/-1;padding:20px 22px}
.mod>.c3{grid-column:span 3}.mod>.c5{grid-column:span 5}
.mod>*+*{border-left:var(--lw) solid var(--ink)}
.lbl{font-family:"Jost",sans-serif;font-weight:500;font-size:11.5px;
  letter-spacing:.16em;text-transform:uppercase}
h1{font-family:"Jost","Noto Sans TC",sans-serif;font-weight:700;line-height:1.12}
.legs{position:relative;padding-bottom:26px}
.legs::before,.legs::after{content:"";position:absolute;bottom:0;width:5px;height:24px;
  background:var(--walnut);clip-path:polygon(0 0,100% 0,64% 100%,36% 100%)}
.legs::before{left:8%;transform:rotate(9deg);transform-origin:top center}
.legs::after{right:8%;transform:rotate(-9deg);transform-origin:top center}
@media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;
  animation-iteration-count:1!important;transition-duration:.001ms!important}}
</style></head><body>
<div class="wrap">
  <nav class="nav">…四張疊板，現用那張抽正…</nav>
  <header class="sheet">
    <div class="mod">
      <div class="c5" style="padding:0">…主視覺：一疊串在鉚釘上的樣本／一片檯面…</div>
      <div class="c3 legs">…品牌、地址、電話、時間…</div>
    </div>
  </header>
  <div class="sheet">
    <div class="mod"><div class="c5">…</div><div class="c3">…</div></div>
    <div class="mod">…六格母題說明…</div>
  </div>
  <footer>…</footer>
</div>
</body></html>
```

---

## 十二、技術實作與相容性

三項核心技術，各承載一個特徵。所有支援度於 **2026-09-09** 查證 MDN／caniuse／web-features。

### 1. CSS Houdini Paint API（`CSS.paintWorklet`）— A 渲染層

**承載**：特徵 1 的母題生成。同一支 worklet 依 `--lam:<母題> <圖案色> <地色> <種子>` 即時繪製六種母題；因此一張花色可以在 hover 時把尺度**連續**從二號換到三號而不失真（`background-size` 是可補間的長度，paint() 每一個中間尺寸都重畫一次），也可以在「接縫消失」時改用合併後的座標系重畫。用固定尺寸的點陣圖或縮放的 SVG 都做不到這件事。

**支援度（2026-09-09 查證 MDN《CSS Painting API》）**：標示為 **Limited availability（not Baseline）／Experimental**——Chromium 全系支援（Chrome/Edge 65+、Opera、Samsung Internet），Safari 部分支援，Firefox 未實作。**這是本站唯一非 Baseline 的技術，因此它被設計成純增強。**

**Fallback（實際行為）**：同一支圖樣演算法在**建置階段**以 SVG 後端跑一遍，輸出 24 張 64×64 的 `data:image/svg+xml` tile 寫進 CSS 自訂屬性（`--p0…--p23`，共約 46 KB）。這是**預設路徑，所有瀏覽器一律先拿到它**；worklet 註冊成功後才由 `html.hou` 選擇器把 `background-image` 換成 `paint(lam)`：

```css
html.hou body, html.hou [style*="--lam"]{ background-image: paint(lam) }
html.hou .sw .face{ transition: background-size 90ms cubic-bezier(.3,.9,.3,1) }  /* 連續 */
.sw .face          { transition: background-size 90ms steps(2) }                 /* 分階 */
```

差別只有兩點：換尺度是連續的還是分兩階跳的；放大到 200% 以上時邊緣是重畫的還是縮放的。**圖樣外觀、遊戲規則、全部文字資訊完全相同，資訊零損失。** worklet 以 `Blob` + `URL.createObjectURL` 註冊，因此不需要任何外部檔案（單檔 HTML 成立）。

### 2. CSS Grid `subgrid` — C 版面與樣式層

**承載**：特徵 2 的版面對應物——整頁共用同一組裁切線。每一塊 `.mod` 是一片被裁下來的檯面，它的內部欄線必須落在主網的同一組欄線上，否則「一整片」的說法在版面上就不成立。

**支援度（2026-09-09 查證 MDN《Subgrid》與 web-features explorer）**：**Baseline Widely available（自 2026-03-15）**；Firefox 71+（2019-12）、Safari 16+（2022-09）、Chrome/Edge 117+（2023-09），Baseline Newly available 為 2023 年。全球覆蓋約 92%+。

**Fallback**：`@supports not (grid-template-columns: subgrid)` 時退回 `repeat(8, 1fr)`——每塊模組各自分八欄，線仍然在、版面仍然成立，只是跨模組的欄線不保證對齊。資訊零損失。

### 3. 規則引擎與極小化極大搜尋（alpha-beta）— E 資料與生成層

**承載**：核心功能「排一面樣品牆」的合法性判定與對手落子。合法性是一條約束：一格合法 ⇔ 它是空的，且與它正交相鄰的每一張已掛的板都「分得出來」（色相家族不同，且不是同母題同尺度）。對手（三級：學徒 depth 1／師傅 depth 3／廠長 depth 5）對 16 格盤做 negamax + alpha-beta，勝負值只有 −1／0／+1（輪到你沒有合法格就輸），平手時以「讓對手下一手的合法格最少」為次要目標。牌堆是公開的，因此搜尋不需要處理隱藏資訊。

**支援度**：純 JavaScript，無瀏覽器 API 依賴，無相容性缺口。

**效能實測（Node 22，單執行緒）**：開局最深的一手——depth 1：16 節點 / 0.009 ms；depth 3：704 節點 / 0.139 ms；depth 5：9,437 節點 / 1.913 ms。實際遊戲中盤面越滿分支越少，故 1.9 ms 是上界；遠低於首屏 100 ms 預算，也不會掉幀。

**平衡實測（各 2,000 局，決定性種子 0–1999）**：

| 對手 | 玩家隨機落子 | 玩家 depth-3 思考 |
|---|---|---|
| 學徒（d1） | 玩家輸 31.5%／廠方輸 31.8%／滿牆 36.7% | — |
| 師傅（d3，預設） | 玩家輸 40.3%／廠方輸 22.4%／滿牆 37.4% | 玩家輸 26.8%／廠方輸 41.3%／滿牆 31.9% |
| 廠長（d5） | 玩家輸 43.5%／廠方輸 15.8%／滿牆 40.7% | 玩家輸 29.1%／廠方輸 27.1%／滿牆 43.9% |

平均 14.5–14.8 手結束（你自己下 7 手），約 90 秒一輪。

### 效能預算

| 項目 | 預算 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部資源、24 張圖樣 data URI） | ≤350 KB | 80.7–91.4 KB |
| 外部資源 | 僅 Google Fonts | 僅 Google Fonts（零圖片、零音檔） |
| 首屏 JS 執行 | ≤100 ms | 首頁 0（無腳本除 worklet 註冊）；對局頁最重一手 1.9 ms |
| 主要動畫 | 60 fps | 全部只動 `transform` / `background-position` / `background-size`，零 `getBoundingClientRect`、零 layout thrashing |

### 無 JavaScript 的行為

- 首頁：二十四張扇形樣本的角度在建置階段寫進 inline style，完整可讀。
- 花色表：二十四張卡與全表皆為靜態 HTML，篩選鈕失效但全部內容照常呈現。
- 樣品牆：顯示建置階段以 depth-3 跑出的一面留檔滿牆，附十六手逐手紀錄表。
- 工廠頁：五條廠規、沿革、委製單欄位皆為靜態 HTML（送出需 JS，頁面明載電話）。
