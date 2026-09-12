---
name: post-punk-factory
description: Post-punk label graphics after Factory Records and Peter Saville — a catalogue number on everything, 45-degree hazard chevrons, information withheld from the primary surface, a decodable colour-code alphabet, and occluded stacked profiles as the only image language.
---

# 後龐克・Factory ／ Peter Saville

> 曼徹斯特，1978–1992。一家唱片公司決定：所有東西都要有目錄編號——唱片、海報、俱樂部、一場官司、一隻貓、公司自己的大樓。
> 這不是裝飾動機，是一套**編目世界觀**。本規格書把它寫成可以直接套用在任何產業的網頁語言。

---

## 一、設計哲學

1. **編號即世界觀。** Factory 給每一件東西一個目錄號（FAC 1 是海報、FAC 51 是 Haçienda 俱樂部、FAC 61 是一場官司），編號一律等權：一句話和一台機器在目錄上長得一樣。網頁化的意義是——**你的資訊架構不是導覽選單，是一份序列**。做這個風格時，第一件事是決定「這個網站要替什麼東西編號」，不是決定首頁要放幾張卡片。
2. **資訊被抽掉，不是被組織。** Saville 的封面常常沒有樂團名、沒有專輯名。主要表面（滿版黑版）只承載圖與一個編號；解釋一律降級成 10.5px 大寫小標，或移到別的頁去。**留白在這裡不是氣氛，是拒絕說明。**
3. **工業標識是身體，古典是借來的。** Ben Kelly 的 Haçienda 用交通工程的語言（45° 黑黃警示帶、擋車柱、貓眼）蓋一間夜店；Saville 用 Fantin-Latour 的花去包一張電子樂唱片。兩件事必須同時在場：**冷的骨架 ＋ 一小塊借來的高級文化**。只有工業會變成工地風，只有古典會變成精品風。
4. **對稱與置中是敵人。** 版面靠左緣對齊、大量右側留白（本站以 250px 的右側槽承載導覽），資訊列一律頂天貼齊。
5. **反 AI 慣性。** 沒有圓角、沒有模糊陰影、沒有漸層、沒有卡片牆、沒有 emoji、沒有「三張置中卡片」。畫面上只有：實色塊、1–2px 實線、45° 斜紋、等寬數字。

---

## 二、本風格的 5 個不可省略特徵

> 判準：拿掉任何一項，它就不再是這個風格。每項附可直接複製的片段。

### 特徵 1　目錄編號是版面骨架，不是裝飾

每一個名詞前面都有一個號。號的字級與名詞**相同**，不縮小、不淡化、不加括號。編號固定格式（前綴＋三位數）、等寬數字、不重排、不回收、不分類。**最關鍵的實作紀律：號碼由文件結構自己數出來，不要寫死在 HTML 裡。**

```css
@counter-style pad3{ system: extends decimal; pad: 3 "0" }

.sheet{ counter-reset: cat 136 }          /* 上一季最後一號 */
.sheet li{ counter-increment: cat }
.sheet li .no::before{ content:"WY-" counter(cat, pad3) }
.no{ font-variant-numeric: tabular-nums; font-weight:700 }
```

抽掉一列，後面全部往前遞補，零 JavaScript。這一條同時讓「編號」變成可互動的對象。

### 特徵 2　45° 黑黃警示斜紋帶承擔所有語意切換

頁首、頁尾、章節之間、現用態、被擋下的表單——凡是「這裡換了一件事」，都由同一條斜紋帶說。角度永遠 45°，色帶永遠等寬，永遠不加圓角、不加陰影、不換角度。

```css
.haz{
  height:14px;
  background:repeating-linear-gradient(45deg,#101010 0 13px,#F5C200 13px 26px);
  background-size:36.77px 36.77px;                /* 26 ÷ sin45° */
  animation:hazmove 24s linear infinite;
}
@keyframes hazmove{ to{ background-position:36.77px 0 } }
```

SVG 版（給 logo 用，幾何自帶邊界、不依賴 clipPath）：以解析法把 45° 平行四邊形裁進帶內，見本站 `assets/logo.svg`。

### 特徵 3　資訊被抽掉：主要表面不解釋自己

滿版黑版上只有圖與一個編號。標題、說明、按鈕組一律不得出現在這個表面上。

```css
.plate{ background:#101010; color:#E7E7E2; position:relative; overflow:hidden }
.plate .cap{ position:absolute; left:30px; bottom:18px; max-width:56%;
             font-size:11px; letter-spacing:.08em; color:#9B9E98 }
.plate .cap b{ display:block; color:#F5C200; font-size:13px; letter-spacing:.1em }
.lb{ font-size:10.5px; letter-spacing:.17em; text-transform:uppercase; font-weight:600 }
```

黑版右上角必須有一枚**沖切孔**（die-cut）：一個圓形開口，透出底下那層斜紋——這是 Factory 對「唱片套是一個物件、不是一張圖」的執念。

```css
.dcut{ position:absolute; right:24px; top:24px; width:54px; height:54px; border-radius:50%;
  background:repeating-linear-gradient(45deg,#101010 0 6px,#F5C200 6px 12px);
  box-shadow:0 0 0 2px #E7E7E2 }
```

### 特徵 4　色碼字母表：字母被換成顏色，而且它是可解的

《Power, Corruption & Lies》(FAC 75) 把字母表換成色塊。**它不是裝飾——必須真的能被讀回文字**，且對照表要印在站上。

```js
// 10 色相 × 4 明度階 = 36 字元（A–Z、0–9）
const WHEEL=['#F5C200','#EE7A12','#D2352C','#C4526B','#8B4E9E',
             '#23409E','#1E8FA8','#2E8B4E','#8A8F86','#151515'];
const BAND=[1,0.78,0.56,0.36];
const idx = ch => ch>='A'&&ch<='Z' ? ch.charCodeAt(0)-65 : 26+ch.charCodeAt(0)-48;
const colourOf = ch => mixToInk(WHEEL[idx(ch)%10], BAND[Math.floor(idx(ch)/10)]);
```

```css
.cc .sq{ width:11px; height:11px; border:1px solid #101010; position:relative }
.cc .sq::after{ content:""; position:absolute; inset:0; display:flex;
  align-items:center; justify-content:center; font-size:7.5px; font-weight:700;
  color:#fff; mix-blend-mode:difference }
li:hover .cc .sq::after{ content:attr(data-ch) }   /* 游標一過，方塊說出自己的字母 */
```

### 特徵 5　遮擋剖線：後面的線被前面的線切斷

本風格唯一的圖像語言。血緣是 1970 年 Harold Craft 為脈衝星 CP 1919 畫的疊置訊號圖（後被 Factory 用在 FACT 10 的封面上）。做法的核心是**遮擋**：每條線走完之後往下收到畫面外再閉合、填底色，於是前面那條會把後面那條切掉。

```js
// 第 i 條（由後往前）
let d = 'M ' + L + ' ' + base;
for (let j=0;j<cols;j++) d += ' L ' + x(j) + ' ' + (base - signal(j)*step*3.0);
d += ' L ' + R + ' ' + (H+6) + ' L ' + L + ' ' + (H+6) + ' Z';   // ← 關鍵：收到畫外閉合
```

```css
.pfsvg path{ fill:#101010; stroke:#E7E7E2; stroke-width:1.4; stroke-linejoin:round }
```

**明文禁用**：漸層、模糊陰影、圓角、照片、任何描外形的插圖、任何半調網點。線的資料來源是名目字串的雜湊（同名恆同圖），它不承載量測資料——**它是這件事物的封面，不是它的儀表板**。

---

## 三、色彩系統

| 色 | Hex | 面積 | 用途（硬規則） |
|---|---|---|---|
| 冷灰 | `#D9DAD4` | 約 34% | 全站唯一大面積地色。刻意冷、零紙紋、零顆粒、零漸層 |
| 面板灰 | `#E7E7E2` | 約 9% | 面板、黑版上的線與字 |
| 墨黑 | `#101010` | 約 26% | 所有線、正文、滿版黑版、頁尾、斜紋的黑段 |
| 警示黃 | `#F5C200` | 約 13% | 斜紋的黃段、現用態、可動作、第一號 |
| 鈷藍 | `#23409E` | 約 11% | 連結、focus ring、數值 |
| 玫瑰 | `#C4526B` | ≤7% | **借來的高級文化**：不佔空間的東西（事、制）的類別標、被拒絕的事、大字引文的重音 |
| 混凝土 | `#9B9E98` / `#6E726C` | 約 7% | 次級文字、虛線號位 |

**規則**：
- 地色**不得**是暖米白或紙色；那會把它推向瑞士／北歐。冷灰的意思是「這是水泥，不是紙」。
- 玫瑰是全站唯一的柔性色，只給無形之物，面積永遠 ≤7%。給它品牌色的地位就毀了。
- 色碼帶是**唯一**允許出現譜系色（十色相）的地方，且必須以等大方塊＋1px 墨框呈現，總面積 ≤5%。
- 深色模式：本風格不做深色模式。黑版已經在裡面了。

---

## 四、字體系統

- 拉丁：**Archivo**（400／500／600／700）——中性格洛特斯克，替代 Helvetica。
- 中文：**Noto Sans TC**（400／500／700）。
- 借來的襯線：**EB Garamond** ＋ **Noto Serif TC**（替代 Bembo），**只**用於大字引文與無形之物。

```css
body{ font-family:"Archivo","Noto Sans TC",sans-serif; font-size:15.5px; line-height:1.64;
      font-feature-settings:"tnum" 1 }
.se{ font-family:"EB Garamond","Noto Serif TC",Georgia,serif }
```

字級階梯（刻意壓縮，Saville 的字都很小）：

| 角色 | 值 |
|---|---|
| 大字引文 `.borrow` | 29px／1.42，serif，max-width 22ch |
| 章節標 h2 | 24px／1.18，700 |
| 正文 | 15.5px／1.64 |
| 目錄名目 | 15px／1.45 |
| 編號 | 13px／700／tabular-nums |
| 備註 | 12.5px，`#6E726C` |
| 標籤 `.lb` | **10.5px／letter-spacing .17em／uppercase／600** ← 這一級是風格的指紋 |

**不要**用可變字型的連續字重動畫，不要用超大 hero 字。這個流派的力量來自**小字與空白的比例**，不是字大。

---

## 五、版面與網格

- 內容欄 `max-width:1180px`，左右 padding 30px；**≥981px 時右側 padding 加到 250px**，空出一條固定的導覽槽。右側大量留白是版式規格，不是沒東西放。
- 全部靠左緣對齊。**沒有任何置中的區塊。**
- 表格式索引用 **subgrid**，讓每一列自己是一個可 hover 的盒子，欄位卻跨整份文件對齊：

```css
.idx{ display:grid; grid-template-columns:5.9rem minmax(0,1fr) 2.6rem 4.6rem }
.idx>li{ grid-column:1/-1; display:grid; grid-template-columns:subgrid;
         column-gap:14px; border-top:1px solid #6E726C; padding:9px 0 8px }
@supports not (grid-template-columns:subgrid){
  .idx{display:block} .idx>li{display:flex;flex-wrap:wrap;gap:6px 14px}
}
```

- 分隔：1px 實線（列）、2px 實線（章節）、14px 斜紋帶（語意切換）。三級，不多不少。
- 滿版黑版一頁一次，貼齊視窗左右緣（full-bleed），不留邊。

---

## 六、元件配方

**導覽（發號 ordinal-issue）**：四頁＝四條「號位」。現用頁的號位裡**真的有一個號**（CSS counter 產生），其餘三條是空的虛線槽。

```css
.rail{ position:fixed; top:104px; right:22px; width:198px;
       counter-reset:navno 100; background:#D9DAD4; border:2px solid #101010; padding:9px 10px }
.rail a{ display:grid; grid-template-columns:1fr 74px; counter-increment:navno }
.rail .slot{ height:27px; border:1.5px dashed #6E726C }
.rail a[aria-current=page] .slot{ border:1.5px solid #101010; background:#F5C200 }
.rail a[aria-current=page] .slot::before{ content:"WY-" counter(navno,pad3) }
```

**按鈕**：方角、2px 實線、hover 直接翻黃，`transition:.09s linear`。禁止 hover 位移、禁止陰影。

```css
.btn{ background:#101010; color:#D9DAD4; border:2px solid #101010;
      padding:9px 18px; font-weight:700; font-size:13.5px; letter-spacing:.06em }
.btn:hover{ background:#F5C200; color:#101010 }
```

**表格**：表頭是實心黑條、白字、10.5px 大寫；列底 1px 灰線；數字欄靠右 `tabular-nums`。

**表單**：2px 黑框、`border-radius:0`、背景同地色；錯誤態換玫瑰框＋玫瑰粗體提示。**不要**用浮動標籤。

**頁尾**：滿版黑，最後一行放一句用 serif 排的、屬於這個品牌的宣告，字級 17px。

---

## 七、動效規則（四種，缺一不可）

| 類 | 名稱 | 觸發 | 值 |
|---|---|---|---|
| ambient | 警示帶推移 ＋ 門禁時鐘 | 無輸入 | `background-position` 24s linear infinite；時鐘每 15s 由真實 `new Date()` 重算開閉與倒數 |
| input | 列反白 ／ 色碼翻字 ／ 黑版前排上抬 | hover・focus | 全部 `.09s linear`（<100ms）。色碼方塊 hover 時以 `content:attr(data-ch)` 顯示自己的字母 |
| transition | 捲門 shutter | 進頁 | `clip-path:inset(0 0 100% 0)` → `inset(0)`，**620ms `steps(14)`**，逐段延遲 90／180／250ms。steps 讓它讀起來像板條 |
| **signature** | **遞補波 counter-cascade** | 增刪或移序 | 其後每一列的號碼被 CSS counter 重新數出來，並以 300ms `steps(6)` 的 `clip-path` 由上往下推過去，每列延遲 index×26ms |

```css
@keyframes shutter{ from{clip-path:inset(0 0 100% 0)} to{clip-path:inset(0 0 0 0)} }
@keyframes cascade{ from{clip-path:inset(0 0 100% 0); transform:translateY(.55em)}
                    to{clip-path:inset(0 0 0 0); transform:translateY(0)} }
.sec{ animation:shutter 620ms steps(14) both }
.no.bump{ animation:cascade 300ms steps(6) both }
```

**一律 `steps()`，不用 ease。** 這個流派的機械感來自「看得見格數」。
`prefers-reduced-motion` 下四種全部歸零：斜紋停、時鐘照跑（只是不動畫）、捲門直接是最終畫面、遞補波直接換數字——**資訊零損失**。

---

## 八、插畫與圖像風格

只有四種原語，全部程序生成，零外部圖片：

1. **遮擋剖線堆**（特徵 5）：封面、hero、縮圖、logo 全部同源。
2. **色碼方塊帶**（特徵 4）：11px 方塊、2px 間距、1px 墨框。
3. **45° 警示斜紋帶**（特徵 2）。
4. **沖切孔**：圓形開口，露出下一層。

決定性：所有圖以 FNV-1a → mulberry32 由名目字串產生，**同名恆同圖**，故可寫進靜態 SVG、可分享、可還原。

---

## 九、Logo 與 Favicon

Logo ＝ 一個黑色正方形（品牌的「版」）＋ 裡面一張剖線堆 ＋ 右上一枚沖切孔 ＋ 底部 26px 的 45° 警示帶；右側是字標與四格色碼（把品牌代號自己編碼一次）。

Favicon（inline SVG data URI，32×32）：黑底、底部 9px 斜紋帶、兩條互相遮擋的剖線。**不要**畫房子、盒子或任何具象物件。

---

## 十、Do & Don't

**Do**
- 先決定「這個網站要替什麼編號」，再開始畫。
- 讓編號由 CSS counter 生成，使它可以被增刪與遞補。
- 每一頁留一塊什麼都不解釋的滿版黑。
- 色碼字母表要附對照表——可解的密碼才是設計，不可解的是花紋。
- 大量右側留白。

**Don't**
- ❌ 紫藍漸層、圓角卡片、模糊陰影、置中三卡片、emoji icon。
- ❌ 暖米白紙感地色（會變成瑞士／北歐）。
- ❌ 把玫瑰或鈷藍當品牌主色。
- ❌ 淡入式滾動揭示、視差、數字滾動、跑馬燈、按壓硬陰影、`stroke-dashoffset` 描繪。
- ❌ 用 ease／cubic-bezier 做本風格的轉場；一律 `steps()`。
- ❌ 把剖線圖拿去承載真實量測資料並加上座標軸——那會變成儀表板，不是封面。
- ❌ 「EST. 19xx」徽章、Lorem ipsum、AI 腔開場白。

---

## 十一、頁面骨架範例

```html
<div class="haz"></div>

<header class="mast"><div class="wrap mastin">
  <a class="brand" href="index.html"><svg class="mk">…</svg>
    <span><b>品牌名</b><span>LATIN SUBTITLE　地址</span></span></a>
  <div class="info"><div id="gate" class="gate"><i></i><span>即時狀態</span></div></div>
</div></header>

<nav class="rail">
  <div class="lb">本站四頁・各有其號</div>
  <a href="a.html" aria-current="page"><span>目錄<br><small class="lb">CATALOGUE</small></span><span class="slot"></span></a>
  <a href="b.html"><span>第二頁<br><small class="lb">SECOND</small></span><span class="slot"></span></a>
</nav>

<main>
  <div class="fullbleed plate"><div class="in">
    <svg class="pfsvg hero" preserveAspectRatio="none" viewBox="0 0 1180 300">…</svg>
    <div class="dcut"></div>
    <div class="cap"><b>WY-136　SPRG</b>名目<em>一句附註</em></div>
  </div></div>
  <div class="haz thin"></div>

  <section class="sec"><div class="wrap">
    <div class="hd"><h2>章節</h2><span class="lb">SECTION</span><span class="n">右側註記</span></div>
    <ol class="idx" style="counter-reset:cat 136">
      <li><b class="no">WY-001</b>
          <span class="nm"><span class="cc">…</span> 名目<small>備註</small></span>
          <span class="ct" data-c="zhi">制</span><span class="dt">1971-11-03</span></li>
      <li class="vac"><b class="no gen"></b><span class="nm"></span>
          <span class="ct">—</span><span class="dt">未發</span></li>
    </ol>
  </div></section>
</main>

<footer class="foot"><div class="haz thin"></div><div class="wrap">
  <p class="se">WY-001　一句屬於這個品牌的宣告。</p>
</div></footer>
```

---

## 十二、技術實作與相容性

本站以三項技術承載視覺，皆於 2026-09-10 查證。

### 1　CSS counters ＋ `@counter-style`（C 版面與樣式層）— 承載特徵 1

`counter-reset` / `counter-increment` / `counter()` 讓編號成為**文件結構的副產品**：增刪一列，其後全部遞補，零 JavaScript，且關掉 JS 仍有號。這是「編號可被當成互動對象」的前提，用 JS 寫死數字做不到（無 JS 即無號）。

- **支援現況**：CSS counters 屬 CSS 2.1，MDN 標示 Baseline Widely available，全瀏覽器長期支援。`@counter-style`（含 `system: extends` 與 `pad`）於 2023 年 9 月隨 **Chrome 117／Firefox 118／Safari 17** 三引擎到齊，屬 Baseline newly available。
- **查證來源**：MDN《Using CSS counters》《counter-increment》《counter()》《@counter-style/pad》；web.dev《New to the web platform in September (2023)》。
- **Fallback**：`@counter-style pad3` 不支援時 `counter(cat, pad3)` 退為十進位。本站全部號碼落在 101–148（本來就是三位數），**補零為無作用**，故退化後畫面完全相同，資訊零損失。

### 2　CSS Grid `subgrid`（C 版面與樣式層）— 承載特徵 1 與第五章的索引網格

目錄的每一列既要是獨立可 hover 的盒子（自己的邊框、內距、狀態），欄位又要跨整份文件對齊。`display:grid` 巢狀會讓每一列各自算欄寬；`subgrid` 讓子格繼承父格的軌道。這件事沒有替代做法，硬寫固定 px 寬會在中文長短名目下崩掉。

- **支援現況**：Firefox 71+、Safari 16+、Chrome／Edge 117+、Opera 103+、Samsung Internet 24+；2023-09 起跨瀏覽器可用，**2026-03-15 升為 Baseline Widely available**，全球覆蓋 >92%。
- **查證來源**：MDN《Subgrid》；caniuse `css-subgrid`；web.dev《CSS subgrid》《Baseline 2023》。
- **Fallback**：`@supports not (grid-template-columns:subgrid)` 時整份索引退為 flex 換行，四個欄位以固定寬度排列——欄位對齊略鬆，但**每一列的號、名目、類別、日期全部仍在且順序不變**，資訊零損失。

### 3　`matchMedia` ＋ 真實時刻驅動（B 動效與時間軸層）— 承載 ambient 動效

門禁與管理室的狀態不是寫死的營業時間表，而是每 15 秒由 `new Date()` 重算的即時狀態（開／關、還有幾小時幾分）——**畫面不需要任何輸入就會變**，這就是本站的環境動效。同一支 `matchMedia` 另外承擔兩件事：`(prefers-reduced-motion: reduce)` 決定遞補波要不要播；`(min-width: 981px)` 決定右側導覽槽的色碼帶要不要掛上。

- **支援現況**：`Window.matchMedia()` 為 Baseline Widely available，2015-07 起跨瀏覽器；`MediaQueryList.addEventListener('change')` 亦為 Baseline。
- **查證來源**：MDN《Window: matchMedia() method》《Testing media queries programmatically》。
- **Fallback**：無 `matchMedia` 時本站以 `{matches:false}` 佔位——動效照播、色碼帶不掛，時鐘仍以 `setInterval` 更新。關掉 JavaScript 時，門禁時段以靜態表格完整印在〈倉別與租約〉頁，資訊零損失。

### 效能預算（實測）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | ≤350KB | index 66.8KB／編目室 34.0KB／倉別 32.1KB／命名法 30.8KB |
| 外部資源 | 僅 Google Fonts | 僅 Google Fonts（零外部圖片、零音檔、零函式庫） |
| 首屏 JS 執行 | ≤100ms | 首屏黑版與全部索引皆為**建置階段輸出的靜態 HTML/SVG**，JS 只做時鐘與色碼帶；剖線引擎 1180×300／15 列×52 點在 Node 22 實測單次 0.9ms |
| 主要動畫 | 60fps | 斜紋帶只動 `background-position`、遞補波只動 `clip-path`＋`transform`，皆為合成層屬性；零 `getBoundingClientRect`，無 layout thrashing |

### 無 JavaScript 時

首屏的滿版黑版、全部目錄列（含編號與色碼帶）、月租表、租約十條、色碼對照表、沿革——**全部是靜態 HTML 與內嵌 SVG**。失去的只有：即時門禁倒數（靜態時段表仍在）、編目室的互動（三條規則與十八件待議清單仍以文字完整列出）。
