---
name: warhol-pop-silkscreen-serial
description: Pop Art in Andy Warhol's photo-silkscreen serial mode (New York 1962–1967) as a web language — one commonplace product repeated edge-to-edge in a gutterless grid, hand-cut flat Day-Glo colour blocks printed first and a single high-contrast black photo screen printed last and never in register, ink that clogs and starves from one repeat to the next, silver-foil grounds, and deadpan packaging lettering.
---

# 普普藝術・Warhol 絹印連作 Pop Art — Photo-Silkscreen Serial

> 範例站：再來罐頭 TSÀI-LÂI（彰化員林的罐頭工廠直營門市）。本 SKILL 定義風格，不綁產業——同一套語言可以用在飲料、零食、藥妝、唱片行、選舉文宣以外的任何「量產物」：便利商店、文具、運動鞋、口紅、漫畫店、二手相機行。
> 與本館其他站的界線：`sankua`（網版印刷 Screenprint）講的是**製程**——刮刀、網目、單張的套準誤差被使用者手勢決定；本 SKILL 講的是 Warhol 的**連作**——同一張照片重複、每一格只有偶然不同。與 `pulp-club`／`poppin`（俏皮普普風：Lichtenstein 式 Ben-Day 網點、漫畫爆炸框）也不同：本 SKILL **禁用網點與對白框**。

## 1. 設計哲學

1962 年 7 月，洛杉磯 Ferus 畫廊掛出 32 張湯罐頭，一種口味一張，像超市貨架一樣排成一列。同年 8 月 Warhol 開始用**照相絹印**：把報紙或宣傳照曬成網版，先在畫布上刷幾塊手切的平色，最後把照片黑版壓上去。那年秋天做完的〈Marilyn Diptych〉（Tate Modern）是 50 張同一張宣傳照：左邊 25 張有色，右邊 25 張黑白，墨越刷越少，臉一路淡掉。1964 年工作室搬進東 47 街，Billy Name 用鋁箔與銀漆把整個空間包起來，成為「銀色工廠」。

這套語言長成這樣有三個物質原因：

1. **它要像工廠一樣生產**。照相絹印讓同一張圖可以無限重複，助手（Gerard Malanga 1963 起）也能刷。所以畫面的單位是「一格」，版面就是格子本身，格與格之間沒有溝。
2. **色版與黑版是兩張不同的網**。平色是另外手切膠片刷的，形狀只「大概」跟照片一樣；黑版最後壓上去，位置每次都偏。錯位不是失誤，是兩道工序看得見的接縫。
3. **一張網版只有黑與不黑**。照片曬成網版就失去中間調：暗的地方糊成一塊，亮的地方整片掉白。墨多了會填死，墨少了會斷線——同一張網連刷五十次，五十格都不一樣。

一句話：**同一張照片，同一塊網，刷五十次；顏色另外刷，從來沒對準。**

## 2. 色彩系統

所有色都是平的、不透明、合成螢光感（Day-Glo）的；同一格裡最多四色＋黑。黑永遠是最後一層，以 `mix-blend-mode:multiply` 疊上。

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--silver` 銀箔 | `#C4C7CB`（＋`#E6E8EA`／`#9EA2A8` 皺褶） | 頁面底、連作牆以外的一切 | ~35% |
| `--ink` 黑版 | `#16171A` | 照片黑版、字、粗框 | ~20% |
| `--paper` 紙白 | `#FAFAF7` | 標籤、表單、價目卡 | ~12% |
| `--pink` 螢光粉 | `#F7569B` | 色塊 | 色塊合計 ~33% |
| `--orange` 橘 | `#F7873A` | 色塊 | |
| `--turq` 土耳其藍 | `#3CC2C7` | 色塊 | |
| `--lemon` 檸檬黃 | `#F4E04D` | 色塊、價格底、強調 | |
| `--lav` 薰衣草 | `#B49BE0` | 色塊 | |
| `--lime` 萊姆綠 | `#A6D84B` | 色塊 | |
| `--red` 番茄紅 | `#E8432F` | 色塊、標價貼紙 | |
| `--mint` 薄荷 | `#9FE0C4` | 色塊、地圖底 | |

**連作色組（WAYS）**：每組 = [地色, 物身, 標籤, 頂蓋]，八組輪替，任兩組的地色不同。相鄰格不能同組（用 `(col + row*3) % 8` 排就不會撞）。

```js
const WAYS=[['turq','lemon','pink','orange'],['pink','mint','lemon','turq'],['orange','lav','lime','pink'],['lemon','turq','red','lav'],
            ['lav','orange','mint','lemon'],['lime','pink','orange','turq'],['red','lemon','turq','mint'],['mint','lav','pink','orange']];
```

規則：零漸層（銀箔底的皺褶例外，那是材料不是色）；零透明度；零陰影；色塊不得出現在黑版「之上」。

## 3. 字體系統

| 角色 | 字體（Google Fonts） | 用法 |
|---|---|---|
| 品牌手寫 | **Yellowtail** 400 | 只用在品牌名（Tsài-lâi），像商品標上的草寫商標；一頁至多 2 次 |
| 商品板字 | **Alfa Slab One** 400 | 數字、重量、價格、年份；包裝式粗板字 |
| 中文 | **Noto Sans TC** 900／500 | 900 用於品名與標題（像罐頭正面的品名）；500 內文 |
| 標籤小字 | **Archivo** 800（wdth 62–125） | 英文品名、規格、cap 標籤，字距 .16em 全大寫 |

字級 scale：12 / 14 / 17 / 22 / 34 / 44 / 58 / 86 / 120–210（年份與頁名）。內文行高 1.7，標題 0.85–1.15。

文案語氣：**平鋪直敘（deadpan）**。只說物件、數量、重量、價格、年份；不形容、不讚美、不說「匠心」。好句子：「洋菇片。400 公克。五十八元。」「黑版從來沒有對準過。美國的進口商沒有退貨。」

## 4. 版面與網格

- **連作牆**：首屏就是一面無溝格（gap:0），同一件商品重複 16／25／32／50 格，滿版出血到視窗邊。桌機 8 欄、平板 6 欄、手機 4 欄；格子比例 3:4。
- **雙聯（Diptych）**：兩塊 5×5 並排，中間 6px 黑線；左有色、右只有黑版且墨量往右遞減。
- 文字區用 `.wrap`：桌機左側讓出 180px 給標價貼紙導覽，寬 ≤1180px；不對稱兩欄（1.25fr／1fr）。
- 框線一律實心黑 3–6px，**直角**，無圓角。
- 允許小角度旋轉：價目卡 ±1.2°、行動區塊 −0.6°、貼紙 ±2°。連作格本身**不旋轉**（只有黑版旋轉 ±0.8°）。

## 5. 元件配方

**一格（can）**

```html
<div class="can" style="--g:#3CC2C7;--kx:4.2;--ky:-1.8;--kr:.5deg;--kf:.9">
  <i class="blk body"  style="background:#F4E04D;clip-path:polygon(…手切八點…)"></i>
  <i class="blk label" style="background:#F7569B;clip-path:polygon(…)"></i>
  <i class="blk lid"   style="background:#F7873A"></i>
  <canvas class="key"></canvas>  <!-- 照片黑版：白＝紙、黑＝墨 -->
</div>
```
```css
.can{position:relative;aspect-ratio:3/4;background:var(--g);overflow:hidden;isolation:isolate}
.can .blk{position:absolute;inset:0}
.can .key{position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:multiply;
  transform:translate(calc((var(--kx) + var(--px)*var(--kf))*1px),calc((var(--ky) + var(--py)*var(--kf))*1px)) rotate(var(--kr))}
```

**標價貼紙導覽（price-gun label nav）**：fixed 左上直列四張白底紅框貼紙（虛線內框、`rotate:var(--r)` ±2°），左側黃底板字頁碼、右側中文頁名、下方英文小字。現用頁換成螢光粉底黑框。≤900px 變成底部一排、不旋轉。

**按鈕**：黑底白字直角，hover 換螢光粉底黑字；次要按鈕白底 3px 黑框，hover 檸檬黃。

**價目卡（label）**：紙白底 3px 黑框，左上 cap 小字、品名 Noto 900、價格 Alfa Slab 44px 放在檸檬黃底上。

**表單／數量**：直角 3px 黑框步進器，數字 Alfa Slab；勾選框 `accent-color:#E8432F`。

**footer**：黑底，品牌名 Yellowtail 粉色、cap 標題檸檬黃。

## 6. 動效規則（四種，缺一不可）

| 類型 | 本風格的做法 | 觸發 | 參數 |
|---|---|---|---|
| ambient 環境 | **連作換色**：每 1.4 s 隨機一格被「重刷」成另一組色，瞬間換、不補間（`steps(3)` 亮一下）；銀箔底皺褶 38 s 來回滑動 | 時間 | `setTimeout 1400`、`animation:sheen 38s linear infinite alternate` |
| input 輸入 | **游標錯版**：游標相對視窗中心的位移 ×9px 寫入 `--px/--py`，每格黑版乘自己的係數 `--kf`（0.55–1.45）偏移；彈簧追隨（k .22、阻尼 .68）。Alt＋方向鍵等效 | pointermove／keydown | 延遲 1 幀 |
| transition 轉場 | **灌墨（flood stroke）**：點內頁連結時一整片平色由上往下灌滿（前緣一條 14px 刮刀），到新頁再由上往下收走 | click → navigate | 430 ms／520 ms，`cubic-bezier(.7,0,.4,1)` |
| signature 簽名 | **拉版**：一把刮刀從左橫過整面連作，黑版逐欄落下；墨量從左 1.25 遞減到右 0.55，右側開始斷線掉白（Diptych 的淡出） | 載入／「再拉一版」／捲入視窗 | 1500 ms，每欄 clip-path inset 掃開 |

自我限制：**禁用淡入、禁用滾動視差、禁用彈跳**——連作的變化只能是「重刷」（瞬間換色）與「錯位」（位移），不能是透明度。

`prefers-reduced-motion: reduce`：不換色、銀箔停止、黑版不跟游標（停在各格自己的錯位）、拉版直接呈現最終墨量、換頁不灌墨。資訊零損失。

## 7. 插畫與圖像風格（photo-key-serial 照片黑版連作）

所有圖都是**一張打光的物件照片 → 單一閾值 → 黑版**：

1. 在離屏 canvas 畫一張「照片」：圓柱漸層打光（左暗、35% 處高光、右暗）、罐圈、標籤字、右下投影。
2. 轉亮度，`black = L < T + blotch(x,y) + streak(x,y)`；`T = 0.25 + 0.19 × ink`，blotch 是 8px 尺度的值噪聲（±0.12），streak 是沿刮刀方向拉長的噪聲（×starve）。
3. 色塊不描輪廓：用 8 點多邊形手切，每點 ±1.6% 抖動，整塊再偏移 ±2%。

禁止：網點（Ben-Day／halftone）、灰階、描邊插畫、向量扁平 icon、陰影漸層的 3D 圖示。

## 8. Logo 與 Favicon

Logo = 一格連作本身：土耳其藍地、粉色罐身塊、黃色標籤塊、橘色頂蓋塊（都不照輪廓），黑版向右上偏 5/−3px、轉 −1°，黑帶上反白 Yellowtail 品牌名，品名「再來」Noto 900。Favicon 是 32×32 的同一構圖、只留色塊與黑框。

## 9. Do & Don't

**Do**
- 讓同一個物件重複到「多到無聊」，再讓每一格偶然不同。
- 讓黑版永遠偏一點；在一整面裡放一格「對準的」反而是最怪的那格。
- 用量產物的語言說話：品名、淨重、價格、批號、年份。
- 銀色。

**Don't（含去 AI 化禁令）**
- 不要紫藍漸層、不要置中大標＋兩顆按鈕＋三張圓角卡片、不要 emoji icon、不要 Lorem ipsum、不要 EST. 19xx 徽章。
- 不要 Ben-Day 網點與漫畫對白框（那是 Lichtenstein，不是本 SKILL）。
- 不要格子間距、不要圓角卡片、不要陰影。
- 不要讓色塊精準貼齊照片輪廓——那就變成填色插畫。
- 不要用透明度做墨的濃淡；墨只有「有」和「沒有」。
- 不要模仿或翻拍任何既有作品、名人照片或真實商標；照片要自己「拍」（自己打光生成）。

## 10. 頁面骨架範例

```html
<nav class="tags"><a href="index.html" aria-current="page" style="--r:-2deg"><b>01</b><span>架上</span><small>SHELF · 32 CANS</small></a>…</nav>
<main>
  <section class="wall">
    <div class="grid"><!-- 32 × .can --></div>
    <div class="squeegee"></div>
    <div class="label wall-tag">
      <h1><span class="script">Tsài-lâi</span> 再來罐頭</h1>
      <p class="cap">No.01・洋菇片・32 罐</p>
      <p class="big"><span class="slab">400 g</span><span class="slab">NT$58</span></p>
      <button class="btn">再拉一版</button>
    </div>
  </section>
  <section class="wrap"><!-- 年份大字＋兩欄 deadpan 文案＋單格大圖 --></section>
  <section class="dip"><div class="panel"><!-- 25 色 --></div><div class="panel"><!-- 25 黑白淡出 --></div></section>
</main>
```

## 11. 本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 Warhol 連作，而是「彩色插畫格子」。

### ① 連作格：同一張圖滿版重複，零間距

```css
.grid{display:grid;grid-template-columns:repeat(8,1fr);gap:0}
.grid>.can{aspect-ratio:3/4}
@media (max-width:1100px){.grid{grid-template-columns:repeat(6,1fr)}.grid>.can:nth-child(n+25){display:none}}
@media (max-width:560px){.grid{grid-template-columns:repeat(4,1fr)}.grid>.can:nth-child(n+17){display:none}}
```
格數取 16／25／32／50（4×4、5×5、8×4、雙聯 2×25）。物件只有一個，不准換主題。

### ② 兩層不對位：手切平色在下，照片黑版在上且永遠偏

```css
.can .blk.label{clip-path:polygon(calc(27.5% + .9%) calc(36% - 1.2%), … );translate:1.8% -.9%}
.can .key{mix-blend-mode:multiply;transform:translate(4.2px,-1.8px) rotate(.5deg)}
```
```js
const kx=(R()<.5?-1:1)*(2.2+R()*3.4), ky=(R()-.5)*6, kr=(R()-.5)*1.6; // 每格自己的錯位（px, deg）
```
黑版是白紙＋黑墨的不透明圖，靠 `multiply` 讓白消失——這就是「疊印」，不是把黑圖去背。

### ③ 照片即黑版：一個閾值，糊版與缺墨

```js
const T=0.25+0.19*ink;                       // ink 0.55（缺墨）～1.35（糊版）
const t=T+(blotch(x/8,y/8)-.5)*.24+(streak(x/1.5,y/46)-.5)*.5*starve-starve*.12;
pixel = L[y*w+x] < t ? 0xFF16171A : 0xFFFFFFFF;
```
同一張照片、同一個 seed 系統：每格 seed 不同 → 糊掉與掉白的位置不同。沒有灰、沒有網點。

### ④ Day-Glo 平色＋銀箔底

```css
:root{--silver:#C4C7CB;--pink:#F7569B;--orange:#F7873A;--turq:#3CC2C7;--lemon:#F4E04D;--lav:#B49BE0;--lime:#A6D84B;--red:#E8432F;--mint:#9FE0C4}
body{background:
  repeating-linear-gradient(97deg,transparent 0 38px,rgba(255,255,255,.22) 38px 41px,transparent 41px 90px,rgba(0,0,0,.07) 90px 92px),
  linear-gradient(112deg,#b4b8bd 0%,#e4e6e8 14%,#aeb2b8 29%,#eceef0 43%,#b1b5ba 58%,#d8dbde 74%,#a5a9af 100%);
  background-size:auto,260% 100%}
```

### ⑤ 商品即肖像：包裝字與 deadpan 標價

```html
<p class="cap">No.01・洋菇片・Mushroom pieces</p>
<p class="big"><span class="slab">400 g</span><span class="slab" style="background:#F4E04D">NT$58</span></p>
```
```css
.slab{font-family:"Alfa Slab One",serif}.script{font-family:"Yellowtail",cursive}
.cap{font:800 12px/1.4 "Archivo",sans-serif;letter-spacing:.16em;text-transform:uppercase}
```
主角永遠是一件量產物（罐、瓶、盒、鞋），它的品名、重量、價格就是標題。

## 12. 技術實作與相容性

### A. 照片黑版生成（A 渲染層；Canvas 2D `getImageData`／`putImageData`＋`globalCompositeOperation`）

- 每種物件、每個尺寸只畫一次「照片」並快取亮度 `Float32Array`；每格只做一次閾值迴圈（`Uint32Array` 直接寫 ImageData）。標籤字是照片的一部分，所以 `document.fonts.load()` 完成後清快取重印。
- 只印視窗上下 400px 內的格子（IntersectionObserver），其餘標髒、捲到時再印；黑版解析度上限 devicePixelRatio 1.25（絹印本來就粗）。
- 支援：Canvas 2D 與 ImageData 為 MDN Baseline Widely available；`getContext('2d',{willReadFrequently:true})` 在不支援的瀏覽器會被忽略，不影響結果。
- 實測（建置環境 aarch64，@napi-rs/canvas 跑同一份引擎）：第一張照片含打光 18 ms；之後 225×300 的黑版 32 格 65 ms（≈2 ms／格）。首頁首屏 32 格合計 ≈83 ms，在 100 ms 預算內；手機 16 格約一半。

### B. 疊印（C/A 層；CSS `mix-blend-mode: multiply`＋`isolation: isolate`）

- 黑版 canvas 是不透明白紙＋黑墨，`multiply` 讓白色消失、黑色蓋過色塊；每格 `isolation:isolate` 讓混合只發生在格內，不會吃到銀箔底。
- 查證：MDN〈mix-blend-mode〉標示 Baseline Widely available（2020-01 起）；caniuse `multiply` 值：Chrome 41+、Firefox 32+、Safari 8+、Edge 79+。
- Fallback：不支援時黑版的白會蓋住色塊——畫面變成黑白照片連作（仍可讀，等於右半邊的 Diptych）。

### C. 拉版與灌墨（B 動效層；Web Animations API `Element.animate()`）

- 刮刀 `left` 與每欄黑版 `clip-path: inset(0 100% 0 0 → 0)` 各自一支動畫，delay 依欄位換算，`fill:'backwards'` 讓未刷到的欄保持空白；換頁灌墨以 `animation.finished` Promise 接 `location.href`。
- 查證：MDN〈Element: animate() method〉Baseline Widely available（2020-03 起）。
- Fallback：沒有 `Element.animate` 或 reduced-motion 時，墨量照樣套用，畫面直接呈現最後狀態；連結回到一般換頁。

### D. 其他

- 決定性偽隨機（FNV-1a → mulberry32）：同一天的首頁錯位與糊版位置一樣，隔天換一套。
- 頁間狀態：取貨單與兌換券存在 `sessionStorage`（存取包 try/catch，私密視窗失敗時頁面照常）。
- 單頁大小：38–73 KB（含全部 CSS／JS），遠低於 350 KB；無外部圖片、無音檔，只有 Google Fonts。
