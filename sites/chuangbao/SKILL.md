---
name: rosta-window-stencil
description: Soviet ROSTA-window stencil poster style — numbered narrative panel grid, hand-cut stencil silhouettes with visible bridges, three non-mixing spot inks on coarse grey newsprint, and a rhymed caption strip under every panel.
---

# РОСТА 窗・模板連環風 ROSTA Window Stencil

> 一九一九至一九二一年，莫斯科。俄羅斯電報通訊社（РОСТА）的畫家與詩人把當天的電報畫成一張分格的連環，用刀在紙板上割出模板、一塊版一個顏色刷出來，貼在空店面的櫥窗、車站與市場。沒有印刷機、沒有好紙、看的人多半不識字——這三個限制長出了這整套視覺語言。
>
> 這份規格書寫的是那套語言，不是那個年代的政治。它適用於任何「必須照順序把一件事講完、而且要讓路過的人記住」的內容。

---

## 一・設計哲學

**它不是海報，是連環。** 海報在一張紙上講一件事，窗報在一張紙上照順序講六件事。版面的第一性原則不是構圖，是**讀序**——你不能跳著看，跳著看就散了。

**它不是插畫，是模板。** 每一個形象都必須能被一把刀從一張紙板上割下來。這一條決定了所有形狀的長相：沒有外框線、沒有漸層、沒有網點、沒有細線，只有一塊一塊封閉的實心色域；而任何被色域包圍的內部（插孔、鈕心、窗格、字心）都是一塊沒被割掉的板材，必須靠一條**看得見的橋**連回板身。

**它不是修辭，是傳播技術。** 格底那行押韻的七字口白之所以押韻，是因為當年要念給旁邊不識字的人聽——念得順的話才會被帶到下一條街。所以韻腳不是裝飾，是這個風格的功能性零件。

**三個限制不能被「解決」。** 用這個風格做網頁時，最容易犯的錯是把它的限制當成技術債去修：把顏色補成漸層、把橋藏起來、把格線去掉換成留白、把韻文改成標語。四件事只要做一件，它就變成一張普通的扁平插畫海報。

---

## 二・本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 РОСТА 窗。每一項都附可直接複製的片段。

### 特徵 1｜編號的連環格陣，粗黑框線分隔，最後一格是口號

四到十二格（本站用六格），格與格之間 6px 實心黑溝，外框 7px。每格上緣一條朱紅格號帶，下緣一條與格等寬的字條。**同一列裡所有格的字條上緣必須對齊**，字多字少都不能歪——用 subgrid 做，不要用固定高度。

```css
.poster{
  display:grid; grid-template-columns:repeat(3,1fr);
  grid-template-rows:repeat(2, auto 1fr auto);   /* 兩列 × (格號/圖/字條) */
  gap:6px; background:#191410; border:7px solid #191410; border-top:none;
}
.pan{ grid-row:span 3; display:grid; grid-template-rows:subgrid; background:#E2DDCF; }
@supports not (grid-template-rows:subgrid){
  .poster{grid-template-rows:none;grid-auto-rows:auto}
  .pan{grid-row:auto;grid-template-rows:auto 1fr auto}
  .cap{min-height:5.6em}                          /* 退回估高，仍然齊 */
}
.pnum{background:#C0271B;color:#E2DDCF;padding:3px 10px;font-family:"Archivo Black",sans-serif}
```

### 特徵 2｜模板色塊與看得見的橋（含貫穿字行的橋帶）

形象＝單一封閉色域，**無外框線、無漸層、無網點、無圓角**。島（被包圍的內部）以紙色畫在色域上，並用一條紙色的線連回色域外緣——那條線就是橋，它必須看得見。

```svg
<!-- 一塊有島有橋的模板：插座 -->
<g fill="#191410"><rect x="10" y="18" width="80" height="64"/></g>
<g>  <!-- 島與橋一律用紙色，橋寬＝該號版材的最小橋寬 -->
  <rect x="30" y="34" width="9" height="22" fill="#E2DDCF"/>
  <line x1="34" y1="45" x2="10" y2="45" stroke="#E2DDCF" stroke-width="1.2"/>
</g>
```

字也一樣。所有 900 字重的標題都被一條貫穿整行的紙色橫帶切斷，帶寬＝最小橋寬：

```css
:root{ --bridge:4px }                 /* 1.5mm→2px｜3mm→4px｜5mm→7px */
.stn{position:relative;display:inline-block;font-weight:900;letter-spacing:.04em}
.stn::after{content:"";position:absolute;left:-1.5%;right:-1.5%;top:50%;
  height:min(calc(var(--bridge) * var(--bs,1)),.18em);transform:translateY(-50%);
  background:var(--stnbg,#D6D0C0);pointer-events:none}
```

用法：`<h1 class="stn" style="--bs:1.9">城西窗報隊</h1>`（`--bs` 依字級放大橋帶）。

### 特徵 3｜一色一版、色域不相疊、套印錯位留著不修

三塊模板依序刷：**赭（底、熱、光）→ 墨（形、人、物、正文）→ 朱（火、勾、叉、格號、該做的那件事）**。每一塊版只在自己該有的地方有洞，所以顏色不會混；手工對版永遠差 1.5–3mm，那個錯位是特徵不是瑕疵。

```css
.pl{transition:transform 80ms linear}                    /* 每一件各屬一塊版 */
.pan:hover .pl-r{transform:translate(1.1px,-.8px)}       /* 朱版往右上 */
.pan:hover .pl-y{transform:translate(-1.1px,.8px)}       /* 赭版往左下 */
```

**面積比例是規則**：赭 ≤18%、墨 ~34%、朱 ≤22%、紙 ~26%。朱一旦超過墨，畫面就變成商業海報。

### 特徵 4｜減到剪影質量的形象

人與物只剩十公尺外還認得出來的塊。沒有臉、沒有透視、沒有陰影、沒有厚度。人＝圓頭＋梯形軀幹＋矩形四肢（四肢用旋轉矩形，不要用弧線）。對錯不靠說明，靠顏色。

```js
// 一個人＝六塊，不多不少
head  = circle(50,15,10)
torso = polygon([[40,26],[60,26],[65,60],[35,60]])
legL  = rect(38,58,10,37);  legR = rect(52,58,10,37)
armL  = rect(28,28,9,31, +12°);  armR = rect(63,28,9,31, -12°)   // 換姿勢＝換旋轉角
```

### 特徵 5｜格底的韻文字條

每格下方一條與格等寬的字條，七字一句，**第二、四、六句押同一個韻**，末格是一句祈使的口號。字條與圖之間一條 4px 黑線，字重 900、字距 .1em。

```html
<div class="cap">
  <div class="ln">一時火舌竄過樑</div>
  <div class="rh">韻 ㄤ　火舌從鍋裡竄出，高過鍋沿</div>
</div>
```

```css
.cap{border-top:4px solid #191410;padding:9px 11px 11px;background:#E2DDCF}
.cap .ln{font-weight:900;font-size:clamp(15px,2vw,19px);letter-spacing:.1em;line-height:1.35}
.cap .rh{font-family:"Archivo Black",sans-serif;font-size:10px;color:#C0271B;letter-spacing:.1em}
```

---

## 三・色彩系統

| 角色 | Hex | 面積 | 用途 |
|---|---|---|---|
| 粗紙灰 paper | `#D6D0C0` | ~26% | 窗報用紙。**冷調灰白，不是米白暖紙**——它是包裝紙不是書籍紙 |
| 板材 card | `#E2DDCF` | ~8% | 格內底、島與橋。比紙亮一階，因為那是沒被刷到的板 |
| 墨版 ink-k | `#191410` | ~34% | 形、人、物、框線、正文、頁尾。面積最大的一塊版 |
| 朱版 ink-r | `#C0271B` | ≤22% | 火、勾、叉、格號帶、連結、現用態、「該做的那件事」 |
| 赭版 ink-y | `#D79A28` | ≤18% | 底、熱、光、牌面、導覽底、hover |
| 窗框漆綠 frame | `#24352C` / `#16211B` | 頁外 | 頁面本身以外的世界：窗框、窗台、body 底 |

規則：

- **三塊墨永不相疊**——要疊就是多刻一塊版。需要淺色壓在深色上時，做法是深版在那裡本來就沒有洞。
- **零漸層、零模糊陰影、零透明度**。投影一律是實心位移色塊。
- 紙不鋪紙纖紋理、不加 noise；它的粗糙感來自刷墨外溢（見第九章），不是材質貼圖。
- body 底鋪 92° 的細直紋，那是漆過的木窗框，不是紙紋。

---

## 四・字體系統

| 角色 | 字體 | 字重／字級 | 說明 |
|---|---|---|---|
| 標題・口號・字條 | Noto Sans TC | 900｜clamp(15px,2vw,19px) ～ clamp(34px,6.6vw,62px) | 一律加 `.stn` 橋帶 |
| 正文 | Noto Sans TC | 400/700｜16px／line-height 1.85 | 最長 70ch |
| 格號・讀數・拉丁 | Archivo Black | 9–20px｜letter-spacing .06–.24em | 只給數字、編號與英文，**不給中文** |

字級階梯：11.5 / 12.5 / 13.5 / 15 / 17 / 19 / 21 / 29 / 62。字距：中文標題 .04–.1em，拉丁 .1–.24em。

**禁止等寬字**（那是終端機不是模板）、**禁止襯線體**、**禁止字重 100–300**（模板割不出細筆畫）。

---

## 五・版面與網格

- 整站包在一面**窗**裡：`max-width:1180px`，14px 深綠外框 + `inset 0 0 0 4px #3B5546` 內斜面 + 3px 外緣描邊。內容是貼在窗玻璃後面的一張紙，四角有膠帶。
- 窗報：3 欄 × 2 列（≤640px 兩欄、≤430px 單欄），每格 1:1。
- 留白很少但不是沒有：紙的四邊 26–30px，格內 9–13px。**格與格之間沒有留白，只有黑溝。**
- 一切轉角為 0，一切邊框為 2/3/4/5/7px 的實線，沒有 1px。
- 表格：2px 黑格線、表頭反白、偶數列 5% 墨底。這是公告板的表，不是資料儀表板的表。

---

## 六・元件配方

**導覽（刷道 inked-pass）**：四張牌＝四塊版。現用頁刷滿三道（赭底＋墨字＋朱色套印錯位塊），其他頁只刷兩道（赭底＋墨字）。牌下三個小方格是版記，填色即刷過。

```css
.nv{background:#D79A28;color:#191410;border:3px solid #191410;padding:9px 10px 7px}
.nv.cur{transform:translate(3px,3px);box-shadow:-6px -6px 0 0 #C0271B}
.nv .pass i{width:9px;height:9px;border:2px solid #191410;background:transparent}
.nv .pass i.on-r{background:#C0271B}
```

**按鈕**：主要動作為朱底紙字 + `box-shadow:6px 6px 0 0 #191410`，按下時 `translate(3px,3px)` 並縮短陰影。次要動作為紙底墨框，hover 轉赭底。**不要用 hover 變色以外的花招。**

**卡片**：3–4px 黑框、方角、無陰影、標題列反白。

**表單／選項**：選項按鈕紙底墨框，選中反白為墨底；錯誤以 `box-shadow:inset 0 0 0 3px #C0271B` 框住，不用紅字提示。

**頁尾**：整塊墨底、`#B8B0A0` 內文、`#E2DDCF` 小標、連結赭黃。四欄自動排。

---

## 七・動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 參數 | 降級 |
|---|---|---|---|---|
| ambient | **輪刷** | 時間，每 6.2s 換一格 | 該格三塊版依序現形，各 `.26s steps(1)`，延遲 0/.26/.52s | 停用迴圈，六格停在刷滿的狀態，並印一行說明 |
| input | **版分離** | hover／focus-within | 朱 `translate(1.1px,-.8px)`、赭 `translate(-1.1px,.8px)`，`80ms linear` | `transform:none`，版號小方格照常顯示 |
| transition | **貼新紙** | 換頁載入 | `clip-path:inset(0 0 100% 0)→inset(0)`，`.46s cubic-bezier(.2,.85,.3,1)`；膠帶四角 `.18s steps(2)` 延遲 .46s | 不播，直接是最終畫面 |
| signature | **掉版** | 換版材 | 橋 < 最小橋寬的島 `translateY(58px)`＋`opacity:0`，`.42s steps(6)` | 瞬間消失，掉版數與窗台清單照常更新 |

**一律 steps()，不要 ease。** 刷版是一下一下拍上去的，不是滑過去的。

禁用：跑馬燈、視差、淡入式滾動揭示、數字滾動計數、按壓模糊陰影、`stroke-dashoffset` 描繪、任何 `border-radius` 動畫。

---

## 八・插畫與圖像風格（模板連環分格構成 stencil-serial）

全站沒有一張外部圖片、沒有一張描外形的寫實插圖。圖像原語只有四種：

1. **剪影塊**——單一封閉多邊形或圓，一色到底，無外框、無漸層。
2. **島**——被色塊包圍的紙色內部，帶一個以公釐計的橋寬屬性。
3. **橋**——把島連回色域外緣的紙色線段，寬度＝`max(島的橋寬, 版材最小橋寬)`。
4. **刷邊**——`feMorphology dilate` 造成的外溢與鈍角，讓每一條邊都不是數學上的直角。

**判準：拿掉全部顏色，整張圖仍然是一塊可以用刀割下來的、單一連通的區域。** 這是可以驗算的，不是說法——把圖取樣成格點跑一次連通元件標記即可。本站二十二件物件 × 三號版材 × 兩種取樣密度、八種人形、十八格連環，板材恆為 1 塊。

**畫煙的規則（會被忽略的細節）**：雲團由一串圓組成時，相鄰的圓必須相交、**隔一個的圓必須不相交**——否則三個圓之間會圍出一塊沒有橋的空隙，割下來就掉了。取 `d(i,i+1) < r_i+r_{i+1}` 且 `d(i,i+2) ≥ r_i+r_{i+2}`。

**構圖不用手算縮放**：把每一件東西的目標矩形寫出來，讓引擎依 bbox 等比置中塞進去。

```js
FO('stove', 8,60,92,96)   // 爐台佔下緣
FO('pot',  28,42,72,60)   // 鍋坐在爐上
FO('smoke',38, 4,62,40)   // 煙在鍋的正上方
```

禁用：`feTurbulence` 手抖濾鏡（那是迷幻海報）、半調網點、細線幾何線描、等角視圖、任何描邊字。

---

## 九・Logo 與 Favicon 設計指南

Logo 的本體就是**一個有島有橋的環**——這是這個風格的最小可辨識單位。

```svg
<svg viewBox="0 0 240 72" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="72" fill="#D6D0C0"/>
  <rect x="8"  y="8"  width="14" height="56" fill="#D79A28"/>   <!-- 赭版 -->
  <rect x="26" y="14" width="46" height="44" fill="#191410"/>   <!-- 墨版：環 -->
  <rect x="36" y="22" width="26" height="22" fill="#D6D0C0"/>   <!-- 島 -->
  <rect x="45" y="40" width="8"  height="18" fill="#D6D0C0"/>   <!-- 橋，不藏 -->
  <rect x="26" y="6"  width="46" height="5"  fill="#C0271B"/>   <!-- 朱版 -->
</svg>
```

Favicon 用同一個環，去掉字，16px 下仍讀得出「一個方環＋一條缺口」。一律 inline SVG data URI，不要 png。

---

## 十・Do & Don't

**Do**

- 先想清楚六格的因果（出事→為什麼→錯做→下場→正做→口號），再想版面。
- 每一格只放一到三件東西，全部留 4–6 單位的邊。
- 讓橋看得見，並且讓使用者知道它為什麼在那裡。
- 韻文念一次；念不順就重寫。
- 長文一律放在紙上，對比 ≥7:1。

**Don't**

- 不要紫藍漸層 hero、不要置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- 不要用 emoji 當 icon，不要用現成 icon set。
- 不要 Lorem ipsum，不要「在當今快節奏的世界」。
- 不要 EST. 19xx 徽章、不要「把 X 變成 Y」句式標題、不要「老街屋改建」開場敘事。
- 不要把套印錯位「修好」，不要把橋 P 掉，不要把黑溝換成留白。
- 不要因為畫面熱鬧就再加一個顏色——第四塊版要多刻一次、多刷一道、多對一次位。

---

## 十一・頁面骨架範例（可直接用）

```html
<body>
  <!-- 刷墨外溢的濾鏡，整份文件共用一個 -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="brush" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
      <feMorphology operator="dilate" radius="0.5"/>
    </filter>
  </svg>

  <div class="win"><div class="sheet">
    <span class="tape a"></span><span class="tape b"></span>
    <header class="head">
      <div class="brand">
        <h1 class="stn" style="--bs:1.9">城西窗報隊</h1>
        <div class="en">CHENGXI WINDOW BULLETIN CORPS ・ WINDOW</div>
      </div>
      <nav class="nav">
        <a class="nv cur" href="index.html" aria-current="page"><b>窗</b><span class="lt">WINDOW</span>
          <span class="pass"><i class="on-y"></i><i class="on-k"></i><i class="on-r"></i></span></a>
        <a class="nv" href="ban.html"><b>版房</b><span class="lt">PLATE ROOM</span>
          <span class="pass"><i class="on-y"></i><i class="on-k"></i><i></i></span></a>
      </nav>
    </header>

    <section class="bulletin">
      <div class="blhead"><span class="no">No.118</span><span class="ti">油鍋起火</span>
        <span class="dt">民國一一五年八月二十二日</span></div>
      <div class="poster">
        <article class="pan">
          <div class="pnum">01<span>第 1 格</span></div>
          <svg class="art" viewBox="0 0 100 100">
            <g class="pl pl-k"><polygon points="…" fill="#191410"/></g>
            <g class="isl" data-mm="3.5">
              <polygon points="…" fill="#E2DDCF"/><line x1="…" stroke="#E2DDCF" stroke-width="1.2"/>
            </g>
          </svg>
          <div class="cap"><div class="ln">鍋裡油煙直直衝</div><div class="rh">韻 ㄥ</div></div>
        </article>
        <!-- ×6 -->
      </div>
      <div class="sill"><span class="lbl">窗台</span><span class="pieces"></span></div>
    </section>
  </div>
  <footer>…</footer></div>
</body>
```

```css
.pl{filter:url(#brush)}                 /* 刷墨外溢，只掛在墨上、不掛在島上 */
.isl{transition:transform .42s steps(6),opacity .42s steps(6)}
.isl.is-out{transform:translateY(58px);opacity:0}
```

---

## 十二・技術實作與相容性

本站的視覺由三項技術承載，各屬一層，全部在建置當下實測跑通。

### A 渲染層｜SVG `<feMorphology operator="dilate">`

**承載**：特徵 2 的刷墨外溢——每一塊色域向外脹 0.5 使用者單位（約 1.5mm），角被拍鈍，整張圖沒有一個數學上的銳角。這是「用刷子垂直拍過模板」與「用向量軟體畫方塊」的唯一差別。

**支援度（2026-08-22 查證 MDN《feMorphology》／caniuse `mdn-svg_elements_femorphology`）**：Baseline **Widely available**，2015-07 起跨瀏覽器。

**fallback**：不支援時濾鏡整個被忽略，圖形以銳角呈現，版面、可讀性與所有數值完全不變。掛法為 CSS `.pl{filter:url(#brush)}`，只掛在墨上——**不要掛在島與橋上**，否則島會被脹大，等於把字心割大了。

**效能**：濾鏡區域即單一形狀的 bbox，首頁 6 格共 48 個小濾鏡；縮圖牆（144 張迷你圖）以 `.mini .pl{filter:none}` 關掉，避免上百個濾鏡區域。

### C 版面與樣式層｜CSS Grid `subgrid`

**承載**：特徵 1 的字條對齊。一則窗報是二維的格陣，同一列裡每一格的「格號帶／圖／字條」三條列軌必須共用；字條的字數不一樣，若各自為政就會參差，讀序會被破壞。這件事**媒體查詢與固定高度都做不到**，因為列高要由該列最高的字條決定。

**支援度（2026-08-22 查證 web-features explorer《Subgrid》／web.dev《Baseline 2023》）**：Firefox 71（2019-12）、Safari 16（2022-09）、Chrome / Edge 117（2023-08）；2023 年底達 Baseline，現為 **Widely available**，全球覆蓋 >92%。

**fallback**：`@supports not (grid-template-rows:subgrid)` 時退回 `grid-auto-rows:auto` + `.cap{min-height:5.6em}`，字條改以估高對齊，資訊零損失，只是列高不再由內容決定。

### E 資料與生成層｜格點取樣連通元件標記（模板橋接判定）

**承載**：簽名動效「掉版」與版房的「檢版」。這一層回答的問題是：*這塊版割下去以後，還是一塊嗎？*

作法有兩支，互相驗算：

1. **逐橋判定（執行期，O(島數)）**——島的橋寬 < 版材最小橋寬即判定橋斷，該島不予割出，畫面上它掉下來落到窗台。這是頁面即時用的那一支，成本可忽略。
2. **格點連通元件標記（檢版用）**——把整塊版取樣成 N×N 布林格（1＝板材、0＝洞），跑一次四鄰接氾濫填充。小於 `N²×0.00008` 格的碎點不計，那是凹角上的取樣雜訊而非真的會掉的板。

第二支同時用形態學開運算（erode r → dilate r）交叉驗算過：比 2r 細的橋會被吃掉，兩種算法對同一組樣板得到相同結論。

**支援度**：純 JavaScript 與 `Uint8Array`／`Int32Array`，無瀏覽器 API 依賴，無相容性缺口。`performance.now()` 為 Baseline Widely available，只用於顯示耗時。

**效能實測（Node 22，與瀏覽器同一份程式碼）**：

- 檢版 4 塊樣板 @120×120 取樣：**3.1 ms**（瀏覽器首次 35 ms 含 JIT 暖機，第二次 6.9 ms）。
- 逐橋判定：首頁 7 座島，每次換版材 < 0.1 ms。
- 建置階段全站驗證（22 件物件 × 3 號版材 × 2 種取樣密度 + 8 種人形 + 18 格連環）：**全部為單一連通塊**。

### 效能預算（硬門檻 ≤350KB／首屏 JS ≤100ms／60fps）

| 頁 | 單檔大小（含 inline 全部 CSS/JS/SVG） | 備註 |
|---|---|---|
| index.html | 68 KB | 6 格 inline SVG |
| ban.html | 63 KB | 4 塊樣板 |
| ku.html | 144 KB | 144 張迷你圖，全部關閉濾鏡 |
| pai.html | 99 KB | 三個題目共 18 格 + 54 句 |

首屏 JS 只做三件事：讀 localStorage、走訪 `.isl` 更新兩個屬性、寫六個讀數（最重的 ku.html 有 100 座島，實測 < 5 ms）。四種動效只動 `transform` / `opacity` / `clip-path`，不觸發 layout。

### 無 JavaScript 時

四頁的窗報、六格圖、全部韻文、版材對照表、庫房清單與隊部資訊都是建置階段就寫進 HTML 的靜態內容，關掉 JavaScript 完整可讀可選取。失去的只有：換版材（停在中號紙板）、輪刷、窗台堆積、排窗報的驗收與分享碼。

### `prefers-reduced-motion`

四種動效全部有降級，且降級後**資訊零損失**：輪刷停用並改印一行「六格都停在刷滿三道的狀態」；版分離改為不位移，但三塊版的版號小方格照常顯示；貼新紙不播；掉版改為瞬間消失，掉版數、窗台清單與所有讀數照常更新。
