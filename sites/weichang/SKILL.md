---
name: moire-interference
description: Two rigid line rulings superimposed so that the whole composition is the beat pattern between them — a pure black-and-white interference language where every tone is optical, nothing is outlined, and the largest form on the page exists on neither layer.
---

# 莫列干涉 Moiré Interference

> 這份規格書描述的是歐普藝術裡的**干涉分支**——不是把一個單元變形，而是把兩組剛硬的直線疊起來，讓畫面上最大的那個東西出現在「兩者之間」。
> 它不綁定產業：範例站是金屬編織網廠，同一套語言也能做印刷廠、音響行、天文台、紡織廠、票券印製所、光學鍍膜廠、地震測站。
> 判準只有一個——**遮掉全部文字，懂設計的人要能在三秒內說出「這是兩層網疊出來的干涉紋」。**

---

## 〇、血緣與定位（先把自己放對位置）

歐普藝術有兩條分開的血脈，做之前要先知道自己在哪一條：

| | 單元變形分支 | **干涉分支（本規格書）** |
|---|---|---|
| 代表 | Bridget Riley、Victor Vasarely | Gerald Oster、Jesús Rafael Soto |
| 畫面怎麼來 | 一個重複單元被一個連續純量場**變形** | 兩組**不變形**的直線被**疊在一起** |
| 圖層數 | 一層就完成 | 至少兩層，缺一層就什麼都沒有 |
| 主角 | 單元本身 | 兩層之間的**拍頻** |
| 觀者移動時 | 不變 | 整個圖樣移動、旋轉、放大 |

外部參照（可查證）：

- **Gerald Oster & Yasunori Nishijima,〈Moiré Patterns〉, _Scientific American_ 208(5), 1963 年 5 月。** 該文開篇的比喻就是「隔著一片紗窗看另一片紗窗」——本規格書的整套做法直接從這句話長出來。Oster 是生物物理學家，他的莫列作品被收進 1965 年紐約 MoMA 的 The Responsive Eye 與同年 Buffalo AKG 的歐普大展。
- **Gerald Oster,《The Science of Moiré Patterns》**（Edmund Scientific）——把莫列從裝置藝術寫成可計算的幾何。
- **Jesús Rafael Soto,〈Vibrations〉系列（1950s–60s）**：在網印條紋底板上架一層網印壓克力，觀者一動，兩層的相對位置改變，干涉紋就在空氣裡移動。Soto 同時用**鐵線**作為第二層——這正是本範例站選金屬編織網廠的原因。

**與單元變形分支的分界寫死**：本風格明文禁止任何形式的單元變形——沒有場函數、沒有 easing 過的格點、沒有「這裡變得比較快」。本風格的每一條線都是等寬、等距、筆直的；畫面上所有的變化，一律來自**兩組這樣的線的相對關係**（間距差、夾角、相位）。如果你發現自己在調一個格子的大小，你做的是另一條血脈。

---

## 一、設計哲學

三句話：

1. **主角不在任何一個圖層上。** 兩片各自規規矩矩的線網疊起來，畫面上出現一片週期是它們數十倍的大圖樣。那片圖樣不屬於上層，也不屬於下層，它屬於「兩者的差」。設計時要把版面的主體讓給它——標題、logo、按鈕全部退到 11–15px 的小尺寸去。
2. **灰是算出來的，不是選出來的。** 樣式表裡只准出現兩個顏色。畫面上你看到的每一階灰，都是線寬除以間距的結果。要更淺就把線變細，要更深就把線變密——**沒有「調透明度」這個選項**。
3. **干涉是量具，不是特效。** 莫列的物理性質是**放大**：兩個週期 p₁、p₂ 的系統疊起來，拍紋週期 P ＝ p₁p₂ ÷ |p₁−p₂|，放大倍率 P ÷ |p₁−p₂| ＝ p₁p₂ ÷ |p₁−p₂|²。差越小，放大越大。所以這個風格天生適合承載「比較」「校驗」「對齊」「判定」這類內容——把它用成純裝飾，等於把一把游標卡尺拿來當鎮紙。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一條，做出來的就不是這個風格了。每一條附可直接複製的片段。

### 特徵 1 — 畫面上最大的圖樣，必須不存在於任何一個圖層

這是本風格的身分證。做法：兩層等距線網，間距只差一點點（或夾一個很小的角），疊起來讓拍紋成為版面的主體。

```js
// 兩層線網的透射率相乘。這是唯一合法的「疊」——不是 opacity，不是 blend mode 的近似，
// 是把兩層的透光率逐點相乘，也就是光真的穿過兩層網時發生的事。
// p=間距, d=線寬（同單位）, w=一個像素的取樣寬度
const F = (s,p,d) => { const k=Math.floor(s/p), r=s-k*p; return k*d + Math.min(Math.max(r,0),d); };
const covered = (s,p,d,w=1) => (F(s+w/2,p,d) - F(s-w/2,p,d)) / w;   // 盒式濾波，必做，否則是假鋸齒
function transmit(x, y, layers){          // layers: [{p,d,a}, ...]
  let T = 1;
  for (const L of layers){
    const c = Math.cos(L.a), s = Math.sin(L.a);
    const u =  c*x + s*y;                 // 經向
    const v = -s*x + c*y;                 // 緯向
    T *= (1 - covered(u, L.p, L.d)) * (1 - covered(v, L.p, L.d));
  }
  return T;                               // 0 = 全擋, 1 = 全透
}
```

驗收：把上層拿掉，畫面上那個大圖樣必須**完全消失**；只剩一片均勻的細網。做不到就不是這個風格。

拍紋的兩條公式要寫在版面上讓人看得到（它們是內容不是註腳）：

```
同角、間距差 Δ：   P = p₁p₂ / Δ            放大倍率 = P / Δ = p₁p₂ / Δ²
同間距、夾角 θ：   P = p / (2 sin(θ/2))
通式（頻率向量）：  P = 1 / |f₁ − f₂|,  f = (cosθ/p, sinθ/p)
```

### 特徵 2 — 只有兩個顏色，而且它們都在端點

```css
:root{ --ink:#101010; --paper:#FFFFFF; }
/* 樣式表裡不准出現第三個色碼。驗收方法是機械的：
   grep -ohE "#[0-9A-Fa-f]{3,8}" *.html | sort -u  必須只回傳這兩個（與 #fff 縮寫）。 */
```

沒有品牌色、沒有強調色、沒有中灰、沒有半透明。狀態（現用／hover／選中／錯誤）一律用**整塊黑白對調**或**線的密度改變**表示：

```css
.nav [aria-current="page"]{ background:var(--ink); color:var(--paper); }
button:hover,button[aria-pressed="true"]{ background:var(--ink); color:var(--paper); }
```

這條的代價要自己扛：**不能只靠顏色傳達狀態**（本來就沒有顏色），所以每一個狀態都必須同時有文字或 `aria-current` / `aria-pressed`。

### 特徵 3 — 所有的灰都是視覺混色，一階都不准宣告

```
開孔率（= 畫面上這一塊的視覺亮度）= ((p − d) / p)²
d/p = 0.10 → 81%   0.20 → 64%   0.26 → 55%   0.36 → 41%   0.50 → 25%
```

要一塊比較淺的區域，就把那一區的 `d` 調小或 `p` 調大；要一塊比較深的，反過來。**明文禁用**：`opacity`、`rgba()` 的第四位、`filter:brightness`、任何中間灰色碼、任何漸層（唯一合法的 `repeating-linear-gradient` 是硬停點、且只含上面那兩個顏色——那是線，不是漸層）。

```css
/* 合法：這是線 */
.rule-field{
  background:
    repeating-linear-gradient(90deg,#101010 0 2px,#FFFFFF 2px 9px),
    repeating-linear-gradient(0deg, #101010 0 2px,#FFFFFF 2px 9px);
  background-blend-mode:multiply;     /* 相乘才是疊，不是 normal */
}
/* 非法：這是漸層 */
.bad{ background:linear-gradient(#000,#888); opacity:.6; }
```

### 特徵 4 — 零輪廓、零填色、零曲線：每一張圖都由「線族」產生

一個線族只有四個變數：**間距 p、線寬 d、方向角 θ、相位 φ**。形不是畫出來的，是**某一區的參數突然換了值**，邊界自己浮現。

```js
// 一張「圖」= 把畫布切成幾塊，每一塊給一組不同的線族參數。
// 例：左半是粗線稀疏、右半是細線稀疏 → 邊界就是「這裡被抽細了」這件事。
drawRegion(0,   0, w/2, h, [{p:1.27,d:0.62,a:0}]);
drawRegion(w/2, 0, w/2, h, [{p:1.27,d:0.23,a:0}]);
// 例：一塊「空白」= 線族陣列是空的。不要用白色矩形去蓋。
drawRegion(x, y, w, h, []);
```

明文禁用：照片、`<path>` 的自由曲線輪廓、實心填色的圖示、半調網點、`feTurbulence` 假質感、任何做舊濾鏡、任何發光、任何模糊陰影、任何圓角超過 3px 的東西。SVG 圖示只能是 `stroke` 等寬的直線段（`stroke-linecap:butt`），一個檔案裡不准出現第二種 `stroke-width`（版面規線除外）。

### 特徵 5 — 版面是量具：畫面上必須有一個可以被讀出來的量

干涉分支跟裝飾性圖樣的分界就在這裡。頁面上要有至少一個地方，使用者是**用眼睛讀出一個數**，而不是看到一個標好的數字：

```html
<!-- 比例尺就是實物尺寸。放大倍率寫在旁邊，不寫就是騙人。 -->
<p class="scale">拍紋帶距 12.70 公釐　放大 ×20<span class="bar"></span></p>
<style>.scale .bar{display:block;height:9px;border:1px solid #101010;border-top:0;width:254px}</style>
```

配套的硬規則：**任何放大倍率都要標在圖旁邊**；同一張比較圖裡不准混用兩個倍率；不同倍率的兩組圖要分開標題。

---

## 三、色彩系統

| 色 | 色碼 | 面積 | 用途 |
|---|---|---|---|
| 紙 | `#FFFFFF` | 約 46%（版面）／畫布內由開孔率決定 | 唯一的底。是「沒有被線蓋到」的地方，不是背景色 |
| 墨 | `#101010` | 約 54% | 線、正文、1px／3px 規線、反白塊的底 |

- **零色相**：整站沒有任何一個帶彩度的顏色。全館其他站幾乎都有一個強調色，本風格刻意沒有——**顏色的工作全部交給線的密度**。
- 純白與純黑（`#101010` 而非 `#000000`，避免 OLED 上的黑陷與邊緣鬼影）是刻意的：歐普需要最大對比，這裡不適用「零純白零純黑」那一套紙感規則。
- 對比：`#101010` 對 `#FFFFFF` 為 19.1:1，遠超 WCAG AAA。
- **focus ring** 用 3px 實線黑框加 2px offset，不用顏色：`outline:3px solid #101010; outline-offset:2px`。

---

## 四、字體系統

- **拉丁**：`Archivo`（Google Fonts）400／600 兩個字重，不准第三個。Op Art 年代的海報用的是 Akzidenz-Grotesk／Univers／Helvetica 那一路的中性怪誕體——字體不可以有個性，因為它會跟畫面搶眼睛。
- **中文**：`Noto Sans TC` 400／500。
- **數字一律 `font-feature-settings:'tnum' 1`**：這個風格裡數字是量測結果，必須等寬對齊。

| 角色 | 大小 | 字重 | 字距 | 行高 |
|---|---|---|---|---|
| 標籤 `.lab` | 11px 全大寫 | 600 | `.2em` | 1.4 |
| 正文 | 15px | 400 | 0 | 1.62 |
| 小節標 h3 | 16px | 600 | `-.01em` | 1.18 |
| 節標 h2 | `clamp(20px,2.5vw,27px)` | 600 | `-.01em` | 1.18 |
| 主張 `.big` | `clamp(26px,4.6vw,48px)` | 600 | `-.025em` | 1.06 |
| 表格 | 13px | 400 | 0 | 1.5 |

**唯一一處大字**是 `.big`，而且它必須在第一屏**下面**——首屏最大的東西永遠是干涉紋。

---

## 五、版面與網格

- 最大寬 1240px，左右留白 `clamp(14px,2.4vw,30px)`。
- 分隔只有兩種粗細：**1px 髮線**（表格、格線、次級分隔）與 **3px 實線**（區段之間、焦點框、強調框）。沒有第三種。
- **零圓角**（上限 3px，實務上一律 0）、**零陰影**、**零外框模糊**。
- 主要內容用 `1.35fr / 1fr` 或 `1fr / 1fr` 的雙欄非對稱網格，≤820px 落成單欄。明文禁用置中三卡片。
- **滿版干涉帶**：每一頁的最上方都是一條滿版、沒有左右留白的畫布帶，高度 `clamp(260px,42vh,460px)`。這條帶子是版面的錨——使用者一捲下來，資訊才開始。
- 表格是這個風格的朋友：`border-collapse:collapse`、每格 1px 髮線、表頭反白（黑底白字）、數字右對齊。

---

## 六、元件配方

```css
/* nav：四格等分，現用格整塊反白。不要 logo、不要漢堡、不要底線動畫 */
.nav ul{display:grid;grid-template-columns:repeat(4,1fr);list-style:none}
.nav li{border-left:1px solid #101010} .nav li:first-child{border-left:0}
.nav a{display:flex;align-items:center;gap:11px;padding:13px 14px;min-height:60px}
.nav [aria-current="page"]{background:#101010;color:#FFFFFF}

/* 按鈕：方角、髮線框、hover 整塊反白。沒有位移陰影（那是新粗獷不是歐普） */
button{border:1px solid #101010;background:#FFFFFF;color:#101010;padding:7px 13px;letter-spacing:.06em}
button:hover,button[aria-pressed="true"]{background:#101010;color:#FFFFFF}

/* 「卡片」不存在。要分組就用格線 */
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));
      border:1px solid #101010;border-right:0;border-bottom:0}
.grid>div{border-right:1px solid #101010;border-bottom:1px solid #101010;padding:10px 12px}

/* 定義列：dt 全大寫小標，dd 下方一條髮線 */
.kv{display:grid;grid-template-columns:auto 1fr;gap:3px 16px;font-size:13px}
.kv dt{font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;padding-top:4px}
.kv dd{border-bottom:1px solid #101010;padding-bottom:4px}

/* footer：3px 上框，四欄自動排 */
footer{border-top:3px solid #101010;padding:26px 0 40px;font-size:13px}
```

---

## 七、動效規則（四種，缺一不可）

| 類型 | 本風格的做法 | 參數 |
|---|---|---|
| **ambient 環境** | 下層以極慢的**平移**前進（不是旋轉）。平移量小到肉眼看不出來，但拍紋跟著跑，速度是平移的 P/p 倍 | 0.08 mm/s；重繪節流 60 ms（≈16fps 足夠，因為要的是「幾乎沒在動」） |
| **input-driven 輸入** | 拖曳或方向鍵**轉動上層**，±3°。延遲必須 <100ms，所以要取回被合併掉的指標取樣點 | 0.00009 rad/px；`getCoalescedEvents()` |
| **transition 轉場** | 換頁時整站的網**回到零位**：疊著的對正（拍紋消失成均勻的一片）、斜的轉正、鬆的繃緊；到站再張開 | 出場 360ms、進場 620ms，`1-(1-p)³` |
| **signature 簽名** | **干涉放大**：上層只轉 0.1°，畫面上那片巨大的圖樣整個轉過去。沒有任何一個元素在動，動的是兩層的關係 | — |

硬規則：

- **禁用淡入、禁用 `stroke-dashoffset` 描繪、禁用數字滾動、禁用按壓位移陰影、禁用視差。** 這個風格不需要它們，而且它們會把「靜止的畫面、動的是眼睛」這件事毀掉。
- 所有 easing 用 `linear` 或 `steps()`。這個風格裡沒有彈性、沒有回彈、沒有摩擦。
- `prefers-reduced-motion:reduce` 時：ambient 停在第 0 幀、transition 直接跳、signature 的可控範圍改由滑桿提供（資訊零損失，因為所有讀數都是文字）。input-driven 保留——那是使用者自己按出來的。

```css
@media (prefers-reduced-motion: reduce){ .fr{transition:none} }
```

---

## 八、插畫與圖像風格

**技法名稱：交叉線族構成 crossed-rulings。** 全站零外部圖片、零照片、零 `<img>`。每一張圖都由 1–3 組等寬平行直線疊成，可調的只有 p／d／θ／φ 四個量。

判準（自己驗收用）：

1. 放大任何一張圖，數得出它由幾組平行線構成，而且每一組的線寬處處相同。
2. 找不到任何一條封閉輪廓、任何一塊被填滿的形、任何一條曲線。
3. 任何看起來像「形」的東西，指得出它的邊界是哪兩組參數的交界。
4. 任何一階灰，算得出它的 `((p−d)/p)²`。

兩種基本用法：

```js
// A. 單層 → 程序圖、階梯圖、圖示。畫面明確、不會眼花
rule(ctx, x,y,w,h, [{p:0.635,d:0.23,a:0},{p:0.635,d:0.23,a:Math.PI/2}], scale);
// B. 雙層 → 干涉。畫面的主角，一頁最多一處，不要到處放
weave(ctx, w,h, [{p:0.635,d:0.16},{p:0.605,d:0.152,a:0.9*Math.PI/180}], scale);
```

**斜線族**（把其中一族從 90° 轉開）是這個語言裡唯一的「傾斜」：它讀起來是「被剪切了」「鬆掉了」「錯開了」。不要拿它來當裝飾，它是語意。

---

## 九、Logo 與 Favicon

Logo ＝ 一個方框內兩層線網，其中一層轉 4–5°，干涉紋自己會長出來。字標用同一套怪誕體，全大寫，字距 1.6，底下壓一條 1.6px 實線。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" fill="#FFFFFF"/>
  <g fill="none" stroke="#101010" stroke-width="1.25">
    <path d="M3 2V46M7.4 2V46M11.8 2V46M16.2 2V46M20.6 2V46M25 2V46M29.4 2V46M33.8 2V46M38.2 2V46
             M2 3H46M2 7.4H46M2 11.8H46M2 16.2H46M2 20.6H46M2 25H46M2 29.4H46M2 33.8H46M2 38.2H46"/>
  </g>
  <g fill="none" stroke="#101010" stroke-width="1.15" transform="rotate(4.2 24 24)">
    <path d="M3 2V46M6.95 2V46M10.9 2V46M14.85 2V46M18.8 2V46M22.75 2V46M26.7 2V46M30.65 2V46M34.6 2V46
             M2 3H46M2 6.95H46M2 10.9H46M2 14.85H46M2 18.8H46M2 22.75H46M2 26.7H46M2 30.65H46M2 34.6H46"/>
  </g>
  <rect x="1.5" y="1.5" width="45" height="45" fill="none" stroke="#101010" stroke-width="3"/>
</svg>
```

Favicon 用同一張圖縮到 32×32（兩層改成 4px／3.55px 間距，轉 5°），以 `data:image/svg+xml,` 內嵌在 `<head>`，不另外出檔。

---

## 十、Do & Don't

**Do**

- 讓首屏最大的東西是干涉紋，品牌名縮到 14px 放在刊頭那一行。
- 把放大倍率、間距、線寬、帶距寫在畫面上——這個風格的文案就是規格。
- 用整塊反白表示狀態，並且同時給 `aria-current` / `aria-pressed`。
- 每一張圖旁邊都標倍率；不同倍率分開標題。
- 干涉一頁最多一處。第二處會讓人眼睛痛，而且會稀釋第一處。

**Don't（含去 AI 化禁令）**

- 不要紫藍漸層、不要置中大標＋兩顆按鈕＋三張圓角卡片、不要 emoji 當 icon、不要 rounded-2xl 加模糊陰影、不要 Lorem ipsum、不要「在當今快節奏的世界」。
- 不要 `opacity` 調灰、不要中灰色碼、不要任何漸層。
- 不要把干涉紋當背景貼圖鋪在文字底下——**長文一律坐在純白上**，干涉紋只出現在自己的帶子裡。
- 不要用位圖縮放去「做出」莫列（那是取樣假影，會隨螢幕改變，而且不可控）。莫列必須是算出來的。
- 不要讓裝置像素網格參與取樣：畫布一律 1 CSS px = 1 backing px。否則螢幕變成第三個週期系統，畫面上的拍紋就不再只屬於那兩層。
- 不要跑馬燈。這個風格已經有一個會動的大東西了。
- 不要「EST. 19xx」徽章。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg…%3E">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&family=Noto+Sans+TC:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--ink:#101010;--paper:#FFFFFF;--hair:1px;--rule:3px;--gut:clamp(14px,2.4vw,30px)}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--paper);color:var(--ink);font:400 15px/1.62 'Archivo','Noto Sans TC',sans-serif;
     font-feature-settings:'tnum' 1}
.wrap{max-width:1240px;margin:0 auto;padding:0 var(--gut)}
.lab{font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:600}
canvas{display:none} .js canvas{display:block}      /* 無 JS 時不留空盒 */
</style></head>
<body>
<script>document.documentElement.className='js';document.body.className='js';</script>

<header class="head"><div class="wrap">
  <svg width="30" height="30" viewBox="0 0 32 32"><!-- logo mark --></svg>
  <span class="nm">品牌名</span><span class="cx">一行事實</span>
</div></header>

<nav class="nav" aria-label="主導覽"><ul>
  <li><a href="a.html" aria-current="page"><svg …/><span><span class="t1">中文</span><span class="t2">EN</span></span></a></li>
  …
</ul></nav>

<main>
  <section class="sheetbox">
    <canvas class="mesh" id="cv" role="img" aria-label="兩層線網疊出的干涉紋，以及它代表的量"></canvas>
    <svg class="nojs-mesh" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="a" width="3.81" height="3.81" patternUnits="userSpaceOnUse">
          <rect width="3.81" height="3.81" fill="#fff"/>
          <rect width="1.38" height="3.81" fill="#101010"/><rect width="3.81" height="1.38" fill="#101010"/></pattern>
        <pattern id="b" width="3.63" height="3.63" patternUnits="userSpaceOnUse" patternTransform="rotate(1.1)">
          <rect width="3.63" height="3.63" fill="#fff"/>
          <rect width="1.31" height="3.63" fill="#101010"/><rect width="3.63" height="1.31" fill="#101010"/></pattern>
      </defs>
      <rect width="1200" height="420" fill="url(#a)"/>
      <rect width="1200" height="420" fill="url(#b)" style="mix-blend-mode:multiply"/>
    </svg>
    <p class="scale">帶距 12.70 公釐　放大 ×20<span class="bar"></span></p>
  </section>

  <div class="ctl"><div class="wrap">
    <input id="ang" type="range" min="-300" max="300" value="0" step="1" aria-label="上層角度，單位為百分之一度">
    <p class="read">角度 <b>0.00</b>°　帶距 <b>12.70</b> mm　帶向 <b>90</b>°</p>
  </div></div>

  <section class="sec wrap">
    <p class="lab">小標籤</p>
    <h2 class="big">一句主張，<br>而且它在第一屏下面</h2>
  </section>
</main>

<footer>…<noscript><p class="nsnote">干涉紋在你的裝置上即時算出來，需要 JavaScript；關掉之後仍有一張靜態疊網圖，所有數字與資訊完整在頁面上。</p></noscript></footer>
</body></html>
```

---

## 十二、技術實作與相容性

### 12.1 本站用到的三項核心技術

| 層 | 技術 | 它在這裡承載什麼 |
|---|---|---|
| A 渲染 | **Canvas 2D `ImageData` 逐像素合成** | 特徵 1 的全部。干涉紋必須是兩層透射率相乘的真實結果，不能是貼圖或濾鏡 |
| D 輸入與感測 | **Pointer Events `getCoalescedEvents()`** | 特徵 1 的輸入端。拍紋對角度的放大倍率極高，指標事件被合併掉的那幾個取樣點會直接變成畫面上肉眼可見的跳動 |
| B 動效與時間軸 | **Web Animations API（`Animation.currentTime` 當時間軸、`reverse()`、`finished`）** | 轉場的「回到零位」與判定回饋的硬邊掃桿 |

### 12.2 支援現況（查證來源與日期：2026-09-18）

**Canvas 2D `putImageData` / `createImageData`** — caniuse `mdn-api_canvasrenderingcontext2d_putimagedata`：全球可用率 **97.27%**。Chrome 4+、Firefox 2+、Safari 4+、Edge 12+、iOS Safari 3.2+。無須 fallback。
來源：<https://caniuse.com/mdn-api_canvasrenderingcontext2d_putimagedata>

**Web Animations API** — caniuse `web-animation`：全球 **96.18% + 0.68% = 96.86%**。Chrome 84+、Edge 84+、Firefox 75+、Safari 13.1+、iOS Safari 13.4+ 為完整支援。
來源：<https://caniuse.com/web-animation>
**Fallback 的具體行為**：`makeTransition()` 開頭就判 `prefers-reduced-motion`；若 `Element.prototype.animate` 不存在，`host.animate` 會拋錯 → 整段轉場不執行，連結維持瀏覽器原生跳頁，畫面直接以 u=1 呈現。判定回饋改為直接加上 `.hit` class（純 CSS，無動畫）。資訊零損失。

**`PointerEvent.getCoalescedEvents()`** — MDN 明載 **Limited availability，"not Baseline because it does not work in some of the most widely-used browsers"**，且**僅在安全內容（HTTPS）可用**。Chromium 與 Firefox 有，WebKit／Safari 沒有。
來源：<https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents>
**Fallback 的具體行為**（本站實作，逐行照抄可用）：

```js
cv.addEventListener('pointermove', function(e){
  if(!dragging) return;
  var evs = (typeof e.getCoalescedEvents === 'function') ? e.getCoalescedEvents() : null;
  if(!evs || !evs.length) evs = [e];      // Safari / 非安全內容 / 空陣列 → 退回單一事件
  for(var i=0;i<evs.length;i++){ angle += (evs[i].clientX - lastX) * K; lastX = evs[i].clientX; }
});
```

退化後的差異是可量的：快速拖曳時每幀只取到 1 個取樣點而不是 3–8 個，角度變化在幀與幀之間變成階梯而不是連續，拍紋會看起來「跳」一下。**角度值與所有讀數完全一樣**，只有中間過程的平滑度不同。另外滑桿（`input[type=range]`）與方向鍵永遠是等效的替代輸入，所以 Safari 使用者不會少任何功能。

### 12.3 效能預算（本站實測）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS，不含字型） | ≤ 350 KB | index 27.3 KB／mu 25.9 KB／weave 27.0 KB／duimu 27.7 KB |
| 兩層合成 1100×440 | — | **7.2 ms**／幀（Node 22，同一份程式碼） |
| 兩層合成 760×380 | — | **4.2 ms**／幀 |
| 首屏 JS 執行 | ≤ 100 ms | 一次 `fit()` ＋ 一次 `weave()`，< 15 ms |
| 主要動畫 | 60 fps | ambient 節流到 60 ms 一幀（刻意，因為它要看起來幾乎沒在動）；拖曳時每幀重繪，< 8 ms |
| 外部請求 | — | 僅 Google Fonts 兩支。零圖片、零音檔、零 JS 函式庫 |

省 CPU 的兩個必做措施：

```js
// 1. 覆蓋率查表：把方波的盒式濾波積分先算成 512 格的 Float32Array，
//    逐像素只剩「相位累加 → 取索引 → 查表」，沒有 floor、沒有除法。
// 2. IntersectionObserver + document.hidden：畫布捲出視窗或分頁隱藏時完全不重繪。
if('IntersectionObserver' in window) new IntersectionObserver(e=>{seen=e[0].isIntersecting;}).observe(cv);
```

### 12.4 正確性怎麼驗

這個風格可以被數學驗收，請一定要驗：

```js
// 1. 平均亮度必須等於兩層開孔率的乘積
//    40 目 d0.23 × 42 目 d0.22 → 0.407 × 0.397 ≈ 0.162 → 16 + 239×0.162 ≈ 55
// 2. 拍紋週期必須等於公式值
//    p₁=3.810px p₂=3.629px → P = p₁p₂/Δ = 76.2px；實測掃描列的亮度峰間距 = 76.3px
// 3. 夾角式：p=3.81px θ=2° → P = p/(2 sin(θ/2)) = 109.2px；實測 108.9px
```

對不上就是實作錯了（最常見的錯誤是忘了盒式濾波，於是看到的是像素取樣的假莫列，會隨 devicePixelRatio 改變）。
