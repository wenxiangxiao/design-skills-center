---
name: amish-plain-quilt
description: Plain-quilt visual language — large flat saturated colour fields in a Diamond-in-the-Square frame, joined by visible seams and ruled by fine running-stitch quilting whose density, not the piecing, carries all the craft.
---

# 素色拼布 Amish Plain Quilt

> 血緣：賓州蘭開斯特郡的阿米希素色拼布（約 1870–1940）。參照：Diamond in the Square／Bars／Sunshine and Shadow 三種基本版型；
> Esprit Quilt Collection（1980 年代起的收藏與巡展，是這批被子第一次被當作抽象繪畫來看）；
> Ordnung（教規）對「繪像」的禁止——這是為什麼一整床被上沒有一朵花、一隻鳥、一個字。
> 與現代拼布（modern quilting）的差別：現代拼布用印花布與留白，本流派**只用素色**且**沒有留白**——所有面積都被顏色佔滿。

---

## 一、設計哲學

三句話：

1. **布是平的。**畫面上不存在漸層、材質照片、噪點紙紋、模糊陰影、圓角。每一塊顏色都是一整塊布。
2. **精緻度全部在線上，不在塊上。**拼接只是把幾塊大色塊縫在一起（三分鐘的事）；被子真正的工在**壓線**——那些走在素地上的細白針目。一個設計如果把力氣花在把色塊切得更碎，就走錯方向了。
3. **壓線不理會拼接。**這是本流派與所有幾何風格最大的分野：色塊有色塊的幾何，壓線有壓線的幾何，兩套幾何互不相讓，壓線的羽毛環會大剌剌地跨過中心菱的邊。

推論出來的一條實作原則：**唯一的明暗來自光**。因為布是平的，畫面若要有立體感，就必須另外做一層「光」——而這層光必須可以整層關掉，關掉之後畫面仍然完整。

---

## 二、色彩系統

素色拼布的顏色來自當年教規允許的衣料：深、飽和、不透明；亮色只出現在很小的面積上，因為那塊布本來就只剩一小條。

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 墨 | `#1C1A22` | 滾邊、頁底、表頭、卡片底、青綠塊上的文字 | ~22% |
| 酒紅 | `#6B2033` | 外框（搭接裙）、大面積內容區 | ~20% |
| 靛藍 | `#22355C` | 中心菱、主要內容區 | ~18% |
| 墨綠 | `#1D4A3E` | 內框、通過／肯定語意 | ~15% |
| 茄紫 | `#4B2A57` | 角方、法蘭四角、次要內容區 | ~15% |
| 青綠 | `#2E9C9C` | **唯一亮色**：現用態、主要動作按鈕、保留孔位、可點擊 | ≤6% |
| 生白（線） | `#EFE9DC` | **只給線與字**，不給面 | ≤4% |
| 縫 | `#0E0C12` | 所有色塊之間的縫線 | 線寬 2.4px |

硬規則：

- **沒有一塊顏色是「背景」。**六塊布面積相當、彼此咬合；不存在「主色 + 背景色」的關係。
- **生白絕不用來當大面積底色。**它是線的顏色。整站不出現淺色頁面。
- **青綠不當品牌色。**它只標示「現在是這個」與「這裡可以按」。青綠塊上的文字一律用墨（對比 5.4:1），其餘深色塊上一律用生白（對比 7.6–9.1:1）。
- **零漸層。**`linear-gradient`／`radial-gradient` 全站禁用於布面；唯一允許的連續變化是 §六的光照層。

---

## 三、字體系統

拼布上沒有字。所以字必須來自它的鄰居——同時代的平版印刷品：樸素的埃及體（slab）與無襯線。

- 拉丁字與數字：**Zilla Slab** 400／500／600／700，`font-variant-numeric: tabular-nums`（數字要能對齊，因為它們是尺寸與價錢）。
- 中文：**Noto Sans TC** 400／700。標題 700，正文 400。
- 級距（1.28 比）：11.5 / 13.5 / 15 / 16 / 17.5 / 21 / 27 / 34 px。行高：正文 1.78、標題 1.32。
- 字距：正文 `.012em`；小標籤 `.20em–.30em` 並全大寫（英文）；標題 `.03em`。
- **不用襯線體標題、不用書法體、不用手寫體。**這批被子的做工是極度精準的，字也要。

```css
body{font-family:"Noto Sans TC","Zilla Slab",system-ui,sans-serif;font-size:16px;line-height:1.78;letter-spacing:.012em}
.num,.lat{font-family:"Zilla Slab",Georgia,serif;font-variant-numeric:tabular-nums;letter-spacing:.02em}
h2{font-size:27px;font-weight:700;letter-spacing:.03em;line-height:1.32}
h2 .en{display:block;font-size:11px;letter-spacing:.3em;font-weight:400;text-transform:uppercase;opacity:.55}
```

---

## 四、版面與網格

**框中菱 Diamond in the Square** 是整個版面的母題，尺寸比例照原型（以 1000 為邊）：

```
滾邊 binding      0–22          （8–10px，四角 45° 接角）
外框 outer border 22–212        （寬度 = 邊長的 19%——比你以為的寬）
外角方 corner sq  22–212 的四角  （190×190，必須另裁一塊，顏色與中心呼應而非與框相同）
內框 inner border 212–266
內角方            212–266 的四角
中心地 centre     266–734
中心菱 diamond    四邊中點連成的正菱形
```

版面規則：

- **零圓角、零陰影、零外框光暈。**`border-radius:0` 全域寫死。
- 區塊之間永遠是一條 2.4px 的「縫」（`border: 2.4px solid var(--seam)`），不是留白也不是陰影。
- 頁面主網格：內容區 `max-width:1180px`；首屏為 `1.05fr / .72fr` 的不對稱兩欄（左被面、右布條），非置中三卡片。
- **接縫必須對齊**：同一列卡片的每一條橫縫要在同一條直線上（做法見 §六 subgrid）。
- 手工誤差要看得見：每條拼接縫的端點加 ±0.65 單位的決定性抖動，角落不會完美對齊——完美對齊的是印刷品，不是被子。

---

## 五、本風格的 5 個不可省略特徵

> 拿掉任何一項，它就不是素色拼布了。

### 1. 大面積純色、零圖像、零紋理

Ordnung 禁繪像，所以被面上沒有一朵花、一隻鳥、一個字。這條在網頁上要執行成：**所有圖像都必須是色塊與線，不得出現任何描繪物件外形的插圖、照片、材質底圖或噪點**。

```css
.field{background:#22355C;background-image:none;box-shadow:none;border-radius:0}
/* 禁止：linear-gradient / radial-gradient / filter:blur / opacity 疊紙紋 / noise png */
```

### 2. 框中菱：中心一菱、四邊四框、四角四方，而且框很寬

```html
<svg viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" fill="#1C1A22"/>                         <!-- 滾邊 -->
  <rect x="22" y="22" width="956" height="956" fill="#6B2033"/>             <!-- 外框 -->
  <rect x="22"  y="22"  width="190" height="190" fill="#4B2A57"/>           <!-- 角方 ×4 -->
  <rect x="788" y="22"  width="190" height="190" fill="#4B2A57"/>
  <rect x="22"  y="788" width="190" height="190" fill="#4B2A57"/>
  <rect x="788" y="788" width="190" height="190" fill="#4B2A57"/>
  <rect x="212" y="212" width="576" height="576" fill="#1D4A3E"/>           <!-- 內框 -->
  <rect x="266" y="266" width="468" height="468" fill="#4B2A57"/>           <!-- 中心地 -->
  <path d="M500 266L734 500L500 734L266 500Z" fill="#22355C"/>              <!-- 中心菱 -->
</svg>
```

角方一定要另一個顏色。四個角同色、且與外框同色，是新手最常犯的錯——那會讓外框變成一個沒有轉折的環。

### 3. 縫：色塊之間永遠有一條看得見的縫，且縫會抖

```css
.blk{border:2.4px solid #0E0C12}
```
```js
/* 拼接縫：端點抖 ±0.65 單位，決定性亂數，同 seed 同結果 */
const J = () => (rng() - 0.5) * 1.3;
d += `M${x1+J()} ${y1+J()}L${x2+J()} ${y2+J()}`;
```

### 4. 壓線：走在素地上的細白針目，而且它不理會拼接縫

壓線一律是 **`stroke-dasharray` 的斷續線**（那是針目，不是虛線裝飾），線寬 2.4–2.7px、`stroke-linecap: butt`（不可 round，圓頭是麥克筆不是針），色 `#EFE9DC`、透明度 .88–.90。

```css
.stitch{fill:none;stroke:#EFE9DC;stroke-width:2.7;stroke-dasharray:7 5;stroke-linecap:butt;stroke-opacity:.9}
```

六種母題的骨架（可直接抄）：

```js
// 菱格 crosshatch：兩組 45° 平行線，間距 61 單位＝2.2 吋（疏）／33 單位＝1.2 吋（密）
function hatch(bb, sp, ang){ /* 沿 (cos,sin) 方向拉線，沿法向每 sp 一條 */ }
// 繩紋 cable：沿一條帶狀中線的兩條反相正弦
pts.push([x + ux*t + px*Math.sin(t/per*Math.PI*2 + ph*Math.PI)*amp,
          y + uy*t + py*Math.sin(t/per*Math.PI*2 + ph*Math.PI)*amp]);
// 羽毛環 feather：中心小圓 + 外圓 + 18 片沿半徑外推並側偏 sin(u·π)·0.24 的羽
// 南瓜籽 pumpkin：每格四段尖橢圓弧，r = h − k·sin(u·π)
// 扇貝 clam：錯排半圓，奇數列平移半個週期
```

**關鍵**：母題以「素地」為單位配置，不以色塊為單位。羽毛環的外圓可以壓過中心菱的邊——它就是要壓過去。

### 5. 滾邊 binding：外緣是一條包邊，不是 border

整床被的最外圈是一條 8–10px 的實色包邊，四角 45° 接角，**顏色與被面上任何一塊都不同**——它是最後才決定的那一個顏色。網頁上的落實：頁面最外層與頁尾之間放一條實色窄帶，且頁面本身沒有外邊距留白。

```css
.bindstrip{height:12px;background:#1C1A22;border-top:2.4px solid #0E0C12;border-bottom:2.4px solid #0E0C12}
```

---

## 六、元件配方

**導覽（stitch-density 針目密度）**——現用態不是被高亮，是**被縫得比較密**，因此下陷：

```css
nav.dens a{width:96px;border:2.4px solid #0E0C12;background:#22355C;
  transition:transform .22s cubic-bezier(.2,.7,.2,1)}
nav.dens a[aria-current="page"]{background:#1D4A3E;transform:translateY(4px)}   /* 壓實的地方會下陷 */
nav.dens a[aria-current="page"] .lb{background:#2E9C9C;color:#1C1A22;font-weight:700}
```
現用頁那一格的方塊畫密菱格（`stroke-dasharray:"3 2.2"`），其餘畫兩條疏縫（`stroke-dasharray:"14 11"`, opacity .42）。

**按鈕**：`border:2.4px solid #0E0C12`，底色青綠、字色墨；hover `translateY(-2px)`、active `translateY(2px)`。**不用陰影表示按壓**（陰影是本流派的禁令），用位移。

**卡片與接縫對齊（CSS Grid subgrid）**：

```css
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:14px}
.card{display:grid;grid-row:span 4;grid-template-rows:subgrid;gap:0}   /* 四條橫縫全部對齊 */
.card>*{padding:10px 13px;border-bottom:2px solid #0E0C12}
@supports not (grid-template-rows:subgrid){
  .card{grid-row:auto;grid-template-rows:auto}
  .card .ttl{min-height:3.2em}.card .spec{min-height:6.4em}
}
```

**表格**：`border-collapse:collapse`，每格 2px 縫線；數字欄右對齊並用 `.num`。

**表單**：輸入框底色＝墨、邊框＝縫、focus 用 3px 青綠 outline；錯誤訊息用文字說明「哪一欄跟哪一欄對不起來」，不用紅框閃爍。

**頁尾**：墨底，四欄，連結用 `border-bottom:1px dashed`（那是疏縫）。

---

## 七、動效規則

本流派的畫面是靜的，但被子在光下不是。四種動態，缺一不可：

| 種類 | 做法 | duration / easing | reduced-motion |
|---|---|---|---|
| ambient 斜光巡行 | `feDistantLight@azimuth` 在 base±span 間往返；12fps 步進＋幀時間看門狗 | 週期 24s，正弦 | 固定 132°，凹凸仍在 |
| input 手電筒 | 游標在樣片上的位置 → `azimuth = atan2(−dy,dx)`、`elevation = 14 + (1−2r)·52`，rAF 節流 | <100ms | 改用方向鍵（左右轉方位、上下改仰角） |
| transition 翻被角 | 全屏 `clip-path: polygon(100% 0,100% 100%,0 100%)` 由右下掀起，露出背面素裡布與線頭 | 420ms `cubic-bezier(.2,.7,.2,1)` | 直接跳頁 |
| signature 棉的位移 | 見 §八 | 500ms `cubic-bezier(.2,.7,.2,1)` | 不補間，直接跳到新解 |

**禁令**：不得用淡入進場、數字滾動、視差、跑馬燈、捲動揭示。**但**自我限制不得使動效總數低於 4——安靜不是風格。

```css
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}.turn{display:none}}
```

---

## 八、插畫與圖像風格（stitchline-relief 壓線起伏構成）

全站沒有一張外部圖片、沒有一張描繪物件外形的插圖。所有圖像由三種原語構成：

1. **素色塊**：純色多邊形，零漸層零陰影。
2. **縫**：2.4px 同色暗一階的線，端點有決定性抖動。
3. **針目**：1.1–2.7px 的 `stroke-dasharray` 斷續線，`butt` 端點。

第四件事不是圖像原語而是一層**解**：

**棉的位移（batting-shift）**——每一塊布能鼓多高，由它「最大的未被壓到的空方」決定；被壓扁的棉不會消失，會被分配給還有餘裕的布塊。

```js
// 1. 把被面打成 100×100 柵格，壓線與滾邊標記為障礙
// 2. 切比雪夫距離變換（兩次掃描）→ 每格到最近障礙的距離 d
// 3. 每一塊布的最大內接方 s = (2·max(d) − 1) × 格寬
// 4. 鼓的高度 h = min(1, s / 4吋)
// 5. 守恆：excess = Σ(1 − h_i)·A_i，分給 s ≥ 4吋 的布塊：puff = 1 + excess / slackArea
```

這個高度圖交給 `feDiffuseLighting` 打光——**注意 `feDiffuseLighting` 讀的是 alpha 通道不是亮度**，所以高度必須寫在 `fill-opacity`，壓線的溝必須用 `<mask>`（黑＝alpha 0）挖掉，不能畫成灰色：

```html
<filter id="rk" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="b"/>
  <feDiffuseLighting in="b" surfaceScale="24" diffuseConstant=".92" lighting-color="#F7F2E7">
    <feDistantLight id="sun" azimuth="132" elevation="33"/>
  </feDiffuseLighting>
</filter>
<mask id="m">
  <rect width="1000" height="1000" fill="#fff"/>
  <path d="{拼接縫}"  fill="none" stroke="#000" stroke-width="7"/>
  <path d="{壓線}"    fill="none" stroke="#000" stroke-width="6" stroke-linecap="round"/>
</mask>
<g class="relief" filter="url(#rk)">
  <g mask="url(#m)">
    <rect x="22" y="22" width="956" height="956" fill="#000" fill-opacity="0.54"/>  <!-- 高度＝fill-opacity -->
    …
  </g>
</g>
```
```css
@supports (mix-blend-mode:soft-light){.relief{mix-blend-mode:soft-light}}
@supports not (mix-blend-mode:soft-light){.relief{display:none}}   /* 不支援就沒有光，布仍完整 */
.quilt[data-light="off"] .relief{display:none}                      /* 使用者也可以關燈 */
```

---

## 九、Logo 與 Favicon 設計指南

Logo 就是一塊框中菱的拼布方塊，加上壓線。規則：正方、無文字進入方塊內部、字排在方塊右側、方塊內每一層都要看得到縫。

Favicon（32×32 inline SVG data URI，本站原件）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%231C1A22'/%3E%3Crect x='2' y='2' width='28' height='28' fill='%236B2033'/%3E%3Crect x='8' y='8' width='16' height='16' fill='%231D4A3E'/%3E%3Cpath d='M16 8l8 8-8 8-8-8z' fill='%2322355C'/%3E%3Cpath d='M16 11l5 5-5 5-5-5z' fill='none' stroke='%23EFE9DC' stroke-width='1.1' stroke-dasharray='2 1.6'/%3E%3C/svg%3E">
```

16px 下只剩三層：滾邊、外框、中心菱。**不要在 favicon 裡放壓線母題**，會糊成一團灰。

---

## 十、Do & Don't

**Do**

- 一頁只用六塊布的顏色，而且讓它們面積相當。
- 把最好的手藝放在線上：母題設計、針目密度、線走過素地的路徑。
- 讓壓線跨過拼接縫。
- 讓縫抖一點、角落對不太齊。
- 提供「關燈」——光是一層，不是布的一部分。

**Don't**

- ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片。
- ✗ 任何 `border-radius`、`box-shadow`、`filter: blur`。
- ✗ emoji 當 icon（icon 一律自繪 SVG，且只用直線、45° 斜線、正圓與方）。
- ✗ 淺色（生白）大面積底——那是紙，不是被。
- ✗ 印花、紋理底圖、紙紋、噪點、照片。
- ✗ Lorem ipsum、AI 腔文案、`EST. 19xx` 徽章、「把 X 變成 Y」句式標題。
- ✗ `stroke-linecap: round` 的壓線；✗ 用陰影表示按壓（用位移）。
- ✗ 跑馬燈與捲動揭示。

---

## 十一、頁面骨架範例

```html
<header class="rail"><div class="wrap">
  <a class="brand" href="index.html">{方塊 logo}<span><span class="bn">廠名</span><span class="be">LATIN NAME</span></span></a>
  <nav class="dens" aria-label="主導覽">
    <a href="a.html" aria-current="page">{密菱格 svg}<span class="lb">頁一</span></a>
    <a href="b.html">{疏縫 svg}<span class="lb">頁二</span></a>
  </nav>
</div></header>

<main class="wrap">
  <section class="hero">
    <div class="frame"><div class="bar"></div>{被面 svg}<div class="bar"></div></div>
    <div class="strips">
      <div class="blk c-for strip nost"><h3>小標籤</h3><p class="big">主要數值</p><p class="mut">補充</p></div>
      <div class="blk c-wine strip nost">…</div>
    </div>
  </section>

  <section>
    <h2>章節<span class="en">SECTION</span></h2>
    <div class="cards rowsync">
      <div class="card blk" style="background:#22355C">
        <div class="ttl">標題</div><div class="fig">{縮圖}</div>
        <div class="spec">規格</div><div class="prc"><span>單位</span><span class="num">數值</span></div>
      </div>
    </div>
  </section>
</main>

<div class="bindstrip"></div>
<footer>…</footer>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，都是**因為這個流派的視覺特徵需要它**才選的，不是因為它新。

### A 渲染層｜SVG `feDiffuseLighting` 光照浮雕

- **承載什麼**：特徵 4 與特徵 5——布是平的，凹凸只能來自斜光；而斜光下看得見的東西就是壓線的溝與棉的鼓。這是唯一能把「壓線密度」直接變成畫面深度的手段。
- **支援現況（2026-08-20 查證）**：MDN《`<feDiffuseLighting>`》標示 **Baseline Widely available**，自 2015-07 起跨瀏覽器（Chrome/Edge、Firefox、Safari 全支援）；BaseWatch 對該 MDN 條目統計全球覆蓋 **95.4%**，並註明其未掛 Baseline 標籤只是因為該條目粒度較細，非支援警訊。
- **實作陷阱（務必知道）**：`feDiffuseLighting` 的凹凸圖取自輸入的 **alpha 通道**，不是亮度。用灰階 `fill` 畫高度圖是無效的——必須把高度寫進 `fill-opacity`，並用 `<mask>`（黑＝alpha 0）挖出壓線的溝。本站第一版就是栽在這裡。
- **fallback**：光照層以 `mix-blend-mode: soft-light` 疊在布面上，並用 `@supports not (mix-blend-mode:soft-light){.relief{display:none}}` 把整層拿掉——不支援混合模式時若讓它疊上去會蓋住整張被面，這個守衛是必要的。濾鏡本身不支援時該層只是一塊被遮罩的半透明黑，soft-light 下影響輕微。另有使用者可按的「關燈」。**三種情況下布面、壓線、文字都完整，資訊零損失。**

### C 版面與樣式層｜CSS Grid `subgrid`

- **承載什麼**：特徵 3 的延伸——拼布的規矩是「同一列的縫必須成一條直線（seam matching）」。卡片牆若每張卡自己排版，橫縫就會錯開。`subgrid` 讓每張卡的四條橫縫繼承同一組父格線。媒體查詢與固定行高都做不到這件事，因為每張卡的文字長度不同。
- **支援現況（2026-08-20 查證）**：`subgrid` 於 **2026-03-15 升為 Baseline Widely available**；Firefox 71（2019）最早、Safari 16（2022）、Chrome/Edge 117（2023-09）、Opera 103、Samsung Internet 24，全球覆蓋 **>92%**。
- **fallback**：`@supports not (grid-template-rows:subgrid)` 時改回 `grid-row:auto` 並給標題與規格欄 `min-height`。接縫會對不齊——而那正好是這條規矩存在的理由——但每張卡的資料完整可讀。

### E 資料與生成層｜幾何規則引擎（距離變換 + 棉量守恆）

- **承載什麼**：簽名動效與核心功能的驗收。壓線的三條規矩全部是可當場驗算的幾何量：**最大空方**（100×100 柵格上的切比雪夫距離變換，兩次掃描 O(n)）、**穿孔**（線段到圓心的最短距離）、**總針長**（折線長度積分）。棉的位移則是這些量的直接後果。
- **相容性**：純 JavaScript（`Uint8Array`／`Int16Array`／`Math.hypot`），無瀏覽器 API 依賴，故無支援缺口。搭 FNV-1a → mulberry32 決定性偽亂數，同輸入恆得同一床被，因此 `?q=` 分享碼可完整還原。
- **效能實測（Node 22 單執行緒，2026-08-20）**：一次完整的「重建全部壓線折線 + 柵格化 + 距離變換 + 棉量結算」平均 **2.15ms**（廠內標準規格）／**3.63ms**（最重的母題組合 密菱格＋密菱格＋南瓜籽＋扇貝）。使用者每一次操作只觸發一次，不在每幀執行。
- **頁面預算實測**：`index.html` 68.3KB／`zuofa.html` 159.5KB／`yaxian.html` 77.0KB／`weituo.html` 44.5KB（皆為含全部 inline CSS/JS/SVG 的單檔大小，上限 350KB）。斜光巡行刻意以 12fps 步進——每一步都要重算一次濾鏡——並掛幀時間看門狗：連續 8 幀超過 `1000/12 + 26` ms 即自動降到 4fps 並在介面標示；其餘動效（翻被角、棉的位移、按鈕位移）只改 `transform`／`opacity`／`width`，不觸發 layout，維持 60fps。
