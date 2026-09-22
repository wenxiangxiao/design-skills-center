---
name: screenprint-three-run
description: Hand-pulled screenprint — three opaque inks on coloured stock, one screen per colour, visible misregistration, mesh-limited detail and a squeegee-direction ink gradient.
---

# 網版印刷 Screenprint — 三罐墨，一色一版一刮

## 設計哲學

絹印不是一種濾鏡，是一道工序。乳劑曬在繃緊的網紗上，刮刀把墨推過沒被曬硬的孔洞，落在紙上。**畫面上的每一個特徵都是這道工序的物理後果**：墨有厚度，是因為它被留在紙面而不是壓進纖維；一定套不準，是因為每個顏色要重新對位一次；細節有下限，是因為絲線之間就那麼大；濃淡有方向，是因為刮刀只走一個方向；淺色不存在，是因為架上只有三罐墨。

所以用這個風格的第一條準則是：**不要模擬「絹印感」，要模擬那道工序的限制。**先決定紙是什麼顏色、有幾罐墨、網目多粗，剩下的畫面會自己長出來。當你發現自己在加第四個顏色、加淡版、加漸層、把兩個版對得完美，你就已經離開這個風格了。

第二條準則：**印壞的地方不要修**。套歪的那 0.6 mm、色塊裡的針孔、收刀那端變薄的墨——它們是這張紙唯一不會被複製的部分。把它們修乾淨，剩下的就只是一張輸出。

外部參照：Biegeleisen《The Complete Book of Silk Screen Printing Production》（工序與網目）、Permaset Aqua 與 Speedball 水性絹印墨的技術資料（膜厚與不透明度）、1990 年代起北美 gig poster 工作室（Aesthetic Apparatus、Burlesque of North America、Jay Ryan / The Bird Machine）以有色紙＋二至四罐不透明墨為主的作法。與型錄中「古巴 OSPAAAL 絹印」的分界：那一條的識別性來自政治圖像學與飽和平色的構圖傳統；本條目的識別性來自**網框本身**——膜厚、網目、刮刀方向與套準誤差。與「里索印刷 Risograph」的分界：里索的墨是半透明的、疊色會透，且紙的顆粒是主角；絹印的墨不透明，淺色蓋得住深色。與「普希品風」的分界：那是 N 階硬邊平色且套印是準的；本條目的套印必不準，而且誤差本身是畫面元素。

---

## 本風格的 5 個不可省略特徵

> 拿掉任何一項，畫面就不再是絹印。每一項附可直接複製的片段。

### 1　墨有厚度，所以淺色蓋得住深色

絹印的墨膜約 8–30 µm，留在紙面上。後果有三：色塊永遠**不透明**；不透明白／螢光色可以直接刮在深色紙上；色塊邊緣有一圈極細的隆起反光。網頁上要做到，就是**禁止用 opacity 做淺色**，而是把淺色當成一罐真的墨。

```css
/* 對的：白是一罐墨，刮在黑卡上 */
.ink-white{ color:#F5F2E9; background:none }
/* 錯的：白是黑的淡版 */
.ink-white{ color:#141118; opacity:.35 }   /* ← 這是里索，不是絹印 */

/* 墨膜的邊緣反光：只有 1px，但拿掉就會變平版 */
.slab.p{
  background:#FF2D6F; color:#F5F2E9;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(0,0,0,.18);
}
```

### 2　一色一版一刮，所以一定套不準

每個顏色是獨立的一層，各自帶著自己的位移與微旋轉。**把套準誤差做成 CSS 變數，全站共用一個值**——同一張紙上所有粉版的偏移必須一致，才像真的；每個元素隨機偏移是假的。

```css
:root{ --reg-x:0.9px; --reg-y:0.5px; --reg-rot:0.18deg }  /* 一張紙一組值 */
.run-k{ color:#141118 }                                    /* 黑版＝基準，永遠不偏 */
.run-p{ color:#FF2D6F; display:inline-block;
        transform:translate(var(--reg-x),var(--reg-y)) rotate(var(--reg-rot)) }
.run-b{ color:#1F3FC4; display:inline-block;               /* 第三版往另一邊偏 */
        transform:translate(calc(var(--reg-x)*-.62),calc(var(--reg-y)*1.18))
                  rotate(calc(var(--reg-rot)*-.7)) }
/* 疊印：兩色真的重疊的地方會出現第三色，面積由誤差決定 */
.trap{ background:color-mix(in srgb,#FF2D6F 62%,#1F3FC4); color:#F5F2E9 }
```

四角的套準十字是這個特徵的簽名圖記：畫兩次，黑的那組準、粉的那組帶 `--reg-*`。

```html
<svg class="regmark" viewBox="0 0 34 34" aria-hidden="true">
  <g class="p"><circle cx="17" cy="17" r="8"/><path d="M17 3v28M3 17h28"/></g>
  <g class="k"><circle cx="17" cy="17" r="8"/><path d="M17 3v28M3 17h28"/></g>
</svg>
<style>
.regmark g{fill:none;stroke-width:1.6}
.regmark .k{stroke:#141118}
.regmark .p{stroke:#FF2D6F;transform:translate(var(--reg-x),var(--reg-y)) rotate(var(--reg-rot));
            transform-origin:50% 50%}
</style>
```

### 3　網目給了解析度下限，而且整張紙共用同一塊網

這是最常被做錯的一項：多數「絹印風」把顆粒做成每個圖各有各的雜訊。真實的網紗是**一整塊**，紋理必須連續地鋪滿整張紙。用 `feTurbulence` 產生一小塊貼片，再用 `<feTile>` 鋪滿——這在語意上就是那塊網。

```html
<filter id="mesh" x="-3%" y="-3%" width="106%" height="106%"
        primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <!-- 22×22 使用者單位＝一塊網目貼片 -->
  <feTurbulence type="fractalNoise" baseFrequency="0.58" numOctaves="1" seed="9"
                x="0" y="0" width="22" height="22" result="n"/>
  <feTile in="n" result="gauze"/>
  <!-- 把噪聲硬切成「有孔／沒孔」，做出針孔 -->
  <feColorMatrix in="gauze" type="matrix" result="holes"
     values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 9 0 -4.35"/>
  <feComposite in="SourceGraphic" in2="holes" operator="out"/>
</filter>
```

搭配線寬下限：**43T 粗網 1.2 mm／77T 0.5 mm／120T 0.3 mm**。低於下限的線不要畫細，要**直接不畫**。粗網點一律 25–35 lpi，不要用細網點假裝照片。

### 4　刮刀有方向，所以濃淡有方向

同一塊色面上，起刀端墨厚、收刀端墨薄，而且梯度永遠**沿著刮刀的單一方向線性變化**——不是從中心往外、不是隨機、不是多個方向。這是「手刮的」最快的辨識點。

```css
/* 刮刀由上往下：頂端厚、底端薄 */
.pulled{
  background-image:linear-gradient(180deg,
    rgba(255,45,111,1) 0%, rgba(255,45,111,1) 58%, rgba(255,45,111,.72) 100%);
}
/* SVG 上直接用 fill-opacity 表現墨膜，不要用 filter 模糊 */
.plate{ fill-opacity:var(--film,.86) }
```

### 5　紙是基底，不是背景

畫面上所有「淺」的地方都是**留紙**。沒有淡版、沒有加白、沒有透明度。所以紙色是配色的一員，換紙＝換整張畫的氣氛。不要用純白或近白當底——那是影印，不是絹印。

```css
:root{
  --stock-mustard:#E0B429;  /* 芥末卡 250g */
  --stock-duck:#2F5D50;     /* 鴨綠卡 240g */
  --stock-coal:#17151A;     /* 炭黑卡 300g */
  --stock-peach:#F2A6A0;    /* 粉桃卡 240g */
}
body{ background:var(--stock-mustard); color:#141118 }
/* 要「淡」，只能留紙 */
.light{ color:color-mix(in srgb,#141118 36%,var(--stock)) }
```

---

## 色彩系統

紙一張、墨三罐，**加起來最多四個顏色，外加疊印生成的第四色**。

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 紙 芥末卡 | `#E0B429` | 底；首頁 | 依頁面擇一，占 55–70% |
| 紙 鴨綠卡 | `#2F5D50` | 底；內頁（深紙配不透明白） | — |
| 紙 炭黑卡 | `#17151A` | 底；深夜感、螢光最跳 | — |
| 紙 粉桃卡 | `#F2A6A0` | 底；說明頁 | — |
| RUN 01 黑 | `#141118` | 輪廓、字、所有要讀得出來的東西；**永遠是套準基準** | 20–30% |
| RUN 02 螢光粉 | `#FF2D6F` | 強調、標籤、最亮的那一塊；只能走 43T | 8–14% |
| RUN 03 鈷藍 | `#1F3FC4` | 最底層的色塊、陰影、水與天 | 6–12% |
| 不透明白 | `#F5F2E9` | 深紙上的字與反白 | 深紙時取代黑 |
| 第四色（疊印生成） | `color-mix(in srgb,#FF2D6F 62%,#1F3FC4)` | 只出現在兩版真的重疊處 | <2%，面積由套準誤差決定 |

**禁止**：任何一罐墨的淡版、任何漸層當底色（刮刀梯度除外）、任何半透明色塊、第五罐墨。

## 字體系統

- 標題／數字：`Archivo Black`（900，`line-height:.86`，`letter-spacing:-.02em`，一律大寫）。海報字要能被粗網刮得動，所以只用實心粗黑，**不用細襯線、不用髮絲線**。
- 標籤／欄頭：`Archivo Narrow` 700，`letter-spacing:.20em`，`text-transform:uppercase`，12px。
- 中文：`Noto Sans TC` 900 配標題、400/500 配內文。
- 字級階梯硬碰硬、沒有中間值：`d1 clamp(54px,12.2vw,148px)` ／ `d2 clamp(30px,5.6vw,68px)` ／ `d3 clamp(21px,2.9vw,34px)` ／ 內文 `clamp(15px,1.05vw,17px)`，行高 1.72。
- 標題與內文之間不設第四級。要突出就跳一整階，不要用 1.2 倍。

## 版面與網格

- **整張紙是歪的**：`.sheet{ transform:rotate(-0.45deg) }`。紙上機一定不正，整站唯一的旋轉就在這裡，元素本身不要各自亂轉。
- 不對稱兩欄：`1.32fr 1fr` 與 `1fr 1.32fr` 交替使用，禁止對稱三卡片。
- 分隔線是實心橫槓 `border-top:2.6px solid currentColor`，**零圓角、零陰影**（唯一的陰影是按鈕按壓的硬陰影與紙的投影）。
- 四角必有套準十字，貼齊紙邊外側 `-6px`。
- 留白＝留紙，不是「呼吸感」。大面積留紙要有理由（那裡沒有版）。

## 元件配方

```css
/* 導覽：版架 rack —— 不是置頂列，是牆上那排曬好的網版 */
.rack{position:fixed;left:1.4vw;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:9px}
.rack a{width:62px;border:2px solid currentColor;padding:6px 5px 7px;text-decoration:none}
.rack a:hover{transform:translateX(7px) rotate(-1.4deg);background:#FF2D6F;color:#F5F2E9}
.rack .sc{height:24px;border:1.4px solid currentColor;   /* 網框縮圖：兩組斜線＝網紗 */
  background-image:repeating-linear-gradient(46deg,currentColor 0 .8px,transparent .8px 3.4px),
                   repeating-linear-gradient(-46deg,currentColor 0 .8px,transparent .8px 3.4px)}
@media(max-width:560px){ .rack{left:0;right:0;bottom:0;top:auto;transform:none;flex-direction:row} }

/* 按鈕：按下去是把版壓下去，硬陰影零模糊 */
.btn{border:2.6px solid currentColor;background:transparent;padding:11px 20px;
  font:700 13px/1 "Archivo Narrow",sans-serif;letter-spacing:.14em;text-transform:uppercase}
.btn:hover{background:#FF2D6F;border-color:#FF2D6F;color:#F5F2E9;
  transform:translate(-2px,-2px);box-shadow:4px 4px 0 #141118}

/* 色塊卡：一罐墨刮滿一塊，白字挖在墨裡 */
.slab{padding:18px 20px;border:2.6px solid currentColor}
.slab.k{background:#141118;color:#F5F2E9;border-color:#141118}
.slab.p{background:#FF2D6F;color:#F5F2E9;border-color:#FF2D6F}

/* 表格：只有橫線，零斑馬紋零圓角 */
th,td{text-align:left;padding:8px 10px;border-bottom:1.4px solid currentColor}
th{border-bottom-width:2.6px;font:700 11px/1.5 "Archivo Narrow",sans-serif;letter-spacing:.14em;text-transform:uppercase}

/* footer：一條粗線之上，三欄資訊，不做「回到頂部」 */
footer{border-top:2.6px solid currentColor;padding-top:18px;font-size:13.5px}
```

## 動效規則

四種缺一不可，四種都要 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 類 | 是什麼 | 觸發 | 值 |
|---|---|---|---|
| ambient 環境 | 紙的翹曲 `cockle` | 無需輸入，持續 | 19s `ease-in-out` infinite，`rotate` 在 −0.28°↔−0.58° 之間、`translateY` ±2px |
| ambient 環境 | 濕墨反光 `sheen` | 無需輸入，只跑在已上墨的大色塊上 | 11s `linear` infinite，`mix-blend-mode:screen`，`translateX(-62%)→62%` |
| input-driven 輸入 | 刮刀跟手 + 墨隨速度變厚薄 | `pointermove`，延遲 <16ms（單一 rAF） | 墨膜 `f(v)=0.30+0.70·e^(−v/1.2)`，v 單位 px/ms |
| input-driven 輸入 | 分版展開 | 圖卡 `:hover` / `:focus-within` | 粉版 `translate(7px,-5px)`、藍版 `translate(-8px,6px)`，130ms `cubic-bezier(.2,.8,.3,1)` |
| transition 轉場 | 換版：舊版沿刮刀軸抬起、新版落下 | 換頁（View Transitions） | old `.30s cubic-bezier(.5,0,.85,.2)` + `clip-path:inset(0 0 100% 0)`；new `.40s cubic-bezier(.15,.8,.25,1)` |
| **signature 簽名** | **〈套不準〉** | 使用者刮的那一下 | 見下 |

**〈套不準〉the misregister you made**：使用者在首屏刮刀下拉時，引擎以 `getCoalescedEvents()` 取得真實取樣率的速度序列，算其標準差 σ；`--reg-x = min(σ·0.62, 3.2)px`、`--reg-y = 0.58·--reg-x`、`--reg-rot = min(0.30·--reg-x, 0.9deg)`。這組值寫進 `sessionStorage`，**套用到全站每一頁的每一個粉版與藍版**——標題、套準十字、圖案、色塊同步偏移同一個量。刮得穩就套得準；抖了，整站的粉版就一直偏那麼多。使用者印壞的那一版，就是這個站接下來的長相。

降級：`prefers-reduced-motion` 時不出現刮刀，頁面直接印好，`--reg-*` 取預設 0.9px（仍看得到套不準，因為那是風格本體，不是動畫）。

**禁止**：淡入當主要進場（色塊要用 `clip-path:inset()` 由上往下揭開，那是刮刀不是漸顯）、視差、彈跳 easing、跑馬燈。

## 插畫與圖像風格

技法：**分色階與粗網點構成（screen-separation）**。

1. 先想好幾罐墨，再畫。每張圖 = 3 個 `<g>`，各自一色、各自套用 `filter:url(#mesh)`。
2. **黑版**：輪廓、字、所有語意。線寬不得低於該網目的下限（77T→約 5 個使用者單位 @160 viewBox）。
3. **粉版**：最亮的那一塊，通常是單一幾何形（太陽、光、一條色帶）。
4. **藍版**：最底層的大色塊（水、天、影子），永遠不描邊。
5. 三個版各自帶 1–2 個單位的偏移，**故意不對齊**。
6. 零漸層、零陰影、零透視、零半透明。要階調只能用 25–35 lpi 的圓點。

禁止：細線幾何線描小屋、等角視圖工程圖、任何 `<img>`、任何照片、emoji。

## Logo 與 Favicon 設計指南

Logo 是「網框 + 刮刀」的正面剪影，畫兩次：粉版偏 `(3.4, −2.6)`，黑版正位、框內鋪 5px 的 `<pattern>` 網紗線。字標分兩行、第二行換一罐墨。**Logo 本身必須是套歪的**——這是這套識別最重要的一件事。

Favicon 用 inline SVG data URI 寫在 `<head>`：芥末底、黑色網框、粉色刮刀、一條粗黑刀口。32×32 下只要保留「框 + 梯形刀 + 粗橫線」三個形就認得出來。

## Do & Don't

**Do**
- 先選紙色，再選三罐墨。
- 把套準誤差做成一個全站共用的變數。
- 線寬低於網目下限就不要畫那條線。
- 讓濃淡只沿刮刀的一個方向變化。
- 針孔與缺墨留著。

**Don't**
- 不要第四罐墨、不要任何一色的淡版。
- 不要白底或近白底（那是影印，不是絹印）。
- 不要把版對得完美。
- 不要用 `opacity` 造淺色。
- 不要漸層 hero、不要置中大標＋三張圓角卡片、不要 emoji 當 icon、不要 Lorem ipsum、不要「EST. 19xx」徽章。
- 不要細網點假裝照片。

## 頁面骨架範例

```html
<body data-stock="mustard">
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <!-- 見特徵 3 的 #mesh 濾鏡 -->
  </defs></svg>

  <div class="press">
    <div class="sheet" id="sheet">
      <svg class="regmark tl" …></svg><svg class="regmark tr" …></svg>
      <svg class="regmark bl" …></svg><svg class="regmark br" …></svg>

      <header>
        <p class="lbl run-p">RUN 01 ／ 標籤</p>
        <h1 class="display d1"><span class="run-k">三</span><span class="run-p">刮</span><span class="run-b">印房</span></h1>
      </header>
      <hr class="rule">

      <div class="cols c-5-7">
        <svg viewBox="0 0 160 160"><!-- 藍版 → 粉版 → 黑版，順序就是刮的順序 --></svg>
        <div><h2 class="display d2">…</h2><p class="inkable">…</p></div>
      </div>

      <div class="slab p wet"><!-- 一罐墨刮滿一塊 --></div>
      <footer>…</footer>
    </div>
  </div>

  <nav class="rack" aria-label="版架">…</nav>
  <div class="grab" id="grab"></div>
  <div class="squeegee" id="squeegee"><i></i><b>墨膜</b></div>
  <noscript><style>.inkable{color:inherit}.grab,.squeegee{display:none}</style></noscript>
</body>
```

---

## 技術實作與相容性

本站的三項核心技術，各自承載一個不可省略特徵。

### A 渲染層　SVG `<feTile>`（＋`feTurbulence`、`feColorMatrix`）

**承載特徵 3**：一塊 22×22 使用者單位的網目貼片被 `feTile` 鋪滿整個濾鏡區，所以整張紙共用同一塊網，而不是每個圖各有各的雜訊。針孔由 `feColorMatrix` 把噪聲的 B 通道乘 9 減 4.35 後推進 alpha、再以 `feComposite operator="out"` 打洞而成。

- **支援現況（查證：MDN `<feTile>` 頁面）**：`feTile` 為 Baseline 功能，自 2015 年 7 月起於各瀏覽器可用。`primitiveUnits="userSpaceOnUse"` 為 SVG 1.1 濾鏡規格的一部分，同屬長期可用。
- **fallback 具體行為**：濾鏡若被忽略（極舊環境或使用者停用），`filter` 屬性無效，圖形以純色平塗呈現——**少的只有針孔與網目顆粒，形狀、顏色、資訊全部保留**。本站不以濾鏡承載任何語意。
- **效能**：濾鏡只掛在插畫的 `<g>` 上（每頁 3–5 個、總面積 < 0.2 個視窗），且**不隨時間變化**，因此只在首次繪製與尺寸變動時重算。不掛在 `body`、不掛在文字上。

### C 版面與樣式層　CSS Custom Highlight API（`CSS.highlights` + `::highlight()`）

**承載特徵 4 與整站的「刮到哪裡才上墨」**：正文被切成每 7 字一段的 `Range`，刮刀通過時依當下墨膜落入四個 `Highlight` 之一（`ink1`–`ink4`），四級各有自己的 `::highlight()` 色值。**零 DOM 變動**——文字節點從頭到尾沒有被包過 `<span>`，所以選取、搜尋、螢幕閱讀器、複製貼上全部不受影響。

- **支援現況（查證：MDN「CSS custom highlight API」與 2026 年 Baseline 更新）**：Chrome/Edge 105、Safari 17.2、Firefox 140（2025-06）；2025 年 6 月成為 Baseline newly available，2026 年 3 月起進入 Baseline widely available。
- **fallback 具體行為**：`window.CSS.highlights` 不存在時，引擎在 `requestAnimationFrame` 內直接呼叫 `printNow()`——整頁立刻以滿墨呈現，刮刀不出現。**資訊零損失**，只是少了「自己刮」的過程。`prefers-reduced-motion: reduce` 走同一條路徑。無 JS 時由 `<noscript>` 內的 `<style>` 取消 `.inkable` 的淡樣色並隱藏刮刀，同樣是一張印好的紙。
- **注意**：`::highlight()` 只能設 `color`、`background-color`、`text-decoration`、`text-shadow`、`-webkit-text-stroke` 等少數屬性，**不能設 `transform`**。所以套準偏移必須做在元素上（`.run-p` / `.run-b`），不能做在 highlight 上。

### D 輸入與感測層　`PointerEvent.getCoalescedEvents()`

**承載特徵 4「刮刀有方向，所以濃淡有方向」與簽名動效〈套不準〉**：瀏覽器每幀只派送一個 `pointermove`，但指標的實際取樣率可達 120–1000 Hz。`getCoalescedEvents()` 取回兩幀之間被合併掉的所有中間點，因此墨量沿**真實的刮刀路徑**逐段累積，而不是每幀一條直線；速度序列的標準差也才有意義——沒有它，抖動會被瀏覽器的降頻平滑掉，〈套不準〉就永遠算出 0。

- **支援現況（查證：MDN `PointerEvent.getCoalescedEvents()` 與 caniuse `mdn-api_pointerevent_getcoalescedevents`）**：**不是 Baseline**——Chrome/Edge 與 Firefox 支援，Safari 尚未支援。
- **fallback 具體行為**：`e.getCoalescedEvents ? e.getCoalescedEvents() : null`，取不到就以單一事件點 `[e]` 進入同一條 `step()` 路徑。刮刀照常走、墨照常上、套準誤差照常算出來，只是取樣較粗，σ 會偏小、套得比實際穩一點。**功能完整，沒有任何分支被關掉。**

### 效能預算實測

| 項目 | 門檻 | 本站 |
|---|---|---|
| 單頁大小（含 inline CSS/JS/SVG，不含 Google Fonts） | ≤350 KB | 33 / 35 / 46 / 33 KB |
| 外部資源 | 僅 Google Fonts | 1 個 CSS（無圖片、無音檔、無 JS 相依） |
| 引擎單次刮刀運算（node 量測，60 列 × 完整路徑） | — | 0.0036 ms／次（5000 次 18.1 ms） |
| 首屏 JS 執行 | ≤100 ms | 主要成本是建立 Range 與一次 `getBoundingClientRect()` 測量（約 190 個 Range／頁），測量延後到第一次 `pointerdown` 才做，首屏只跑建表 |
| 主要動畫 | 60 fps | 刮刀與墨區更新全部收斂到單一 `requestAnimationFrame`；環境動效只動 `transform`，不觸發 layout |

*本規格書描述的是風格，不綁定產業。範例站的店名、人名、價格、電話與地址皆為虛構示意。*
