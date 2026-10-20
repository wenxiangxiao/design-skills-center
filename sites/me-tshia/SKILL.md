---
name: penguin-horizontal-grid-paperback
description: Penguin-style horizontal-grid paperback cover — two colour-coded bands sandwiching a white title band, colour as a fixed category code, humanist sans capitals centred in the white band, an oval cartouche with a bird mark, and the paperback's physical typography (spines, title page, contents leaders, folios, colophon).
---

# 企鵝平裝三段式封面 Penguin Horizontal Grid Paperback（1935–1949）

> 範例站：暝車客運 MÊ-TSHIA NIGHT COACH（夜班客運兼椅背袋文庫）・4 頁・Claude Opus 5.5 排程 Agent・2026-10-20

## 一、設計哲學

1935 年 7 月，Allen Lane 的 Penguin Books 以六便士（約一包菸的價錢）推出第一批十本平裝書。封面是辦公室年輕職員 Edward Young 畫的「水平網格 horizontal grid」：上下兩條色帶夾住中間一條白帶，作者與書名用 Eric Gill 的無襯線字印在白帶上；色帶的顏色不是裝飾，是分類——橘＝小說、綠＝推理、粉紅／洋紅＝旅行冒險、紅＝戲劇、深藍＝傳記、紫＝散文、灰＝時事、黃＝其他。當時的平裝書與廉價通俗小說綁在一起、封面花俏；Penguin 反其道，讓整套書看起來一致、便宜好印、在書架上一眼可分。1947–1949 年 Jan Tschichold 進入 Penguin，重畫企鵝、寫下《Penguin Composition Rules》，把網格、字距、標點、頁碼的規矩給了編輯與排字工。

**這個風格的核心是「系統比單本重要」**：每一本都長一樣，只有顏色和字不同；顏色永遠代表某件事。把它用在網站上，就是讓整個網站變成一本書的封面——上下兩條常駐色帶，色帶的顏色就是你此刻所在的「系列」。

參照：Phil Baines《Penguin by Design: A Cover Story 1935–2005》（2005）；99% Invisible〈Classic Penguins: How Minimalist Book Covers Sold the Masses on Paperbacks〉；Wikipedia〈Penguin Composition Rules〉。本規格為風格研究與致敬，不使用 Penguin 名稱、企鵝標誌或任何商標；範例站的鳥是原創的鷺鷥。

## 二、本風格的 5 個不可省略特徵

### 特徵 1：水平三段——色帶／白帶／色帶（版面手法）

上帶約 30%、白帶約 40%、下帶約 30%，三段之間用一條墨線分開；色帶繞過書脊（書脊也是三段）。拿掉任何一段就不是這個風格。

```css
.cover{display:grid;grid-template-rows:30fr 40fr 30fr;aspect-ratio:111/181;border:1.5px solid #1C1B18}
.cover .band{background:var(--series)}
.cover .title{background:#FBF8EF;border-block:1.5px solid #1C1B18;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.spine{display:grid;grid-template-rows:24px 1fr 30px}.spine::before,.spine::after{content:"";background:var(--series)}
```

### 特徵 2：顏色＝分類，永遠代表某件事（色彩規則）

每種顏色只綁一個意思，平塗、零漸層、零模糊陰影、零透明；同一畫面最多兩個系列色。範例站：橘＝西部幹線、綠＝蘇花夜行、洋紅＝恆春半島、深藍＝南迴返鄉、灰＝包車、黃＝寄物失物。

```css
:root{--orange:#EC6A24;--green:#1B8A50;--cerise:#D2336E;--navy:#213C6E;--grey:#8C8F91;--yellow:#EDBE2E;--paper:#F1E9D2;--white:#FBF8EF;--ink:#1C1B18}
[data-s=o]{--series:var(--orange);--on:var(--ink)}[data-s=g]{--series:var(--green);--on:var(--white)}
[data-s=c]{--series:var(--cerise);--on:var(--white)}[data-s=n]{--series:var(--navy);--on:var(--white)}
```

### 特徵 3：白帶上置中的人文無襯線大寫（字體選擇）

Gill Sans 的替代：Cabin 700（Google Fonts，設計說明即以 Johnston／Gill 為靈感），全大寫、字距 .22–.32em；中文用 Noto Sans TC 900，字距 .12–.14em 並以負 margin 補回尾端字距使其真正置中。白帶裡只有：書名、一條短線、作者（或副題）。

```css
.title h1 .zh{font:900 clamp(34px,4.6vw,54px)/1.12 "Noto Sans TC";letter-spacing:.14em;margin-right:-.14em}
.title h1 .en{font:700 13px/1.4 "Cabin",sans-serif;letter-spacing:.3em;text-transform:uppercase}
.title hr{width:34%;border:0;border-top:1.5px solid #1C1B18;margin:16px auto 12px}
```

### 特徵 4：下帶的橢圓 cartouche＋上帶的書系名與定價（裝飾母題）

下帶正中一個雙線橢圓，裡面一隻鳥；上帶左右兩端是書系名與定價／編號（小號、大寫、加字距）。這是全站唯一的「標誌」，也當 favicon。

```html
<svg viewBox="0 0 80 52" width="104"><ellipse cx="40" cy="26" rx="38" ry="24" fill="#FBF8EF" stroke="#1C1B18" stroke-width="2"/>
<ellipse cx="40" cy="26" rx="33.5" ry="19.5" fill="none" stroke="#1C1B18" stroke-width=".8"/><g transform="translate(16.5 2.2) scale(.95)"><path d="（鷺鷥剪影 path，見 common.js HERON）"/></g></svg>
<div class="band top"><span class="sc">暝車文庫</span><span class="sc">NT$ 60</span></div>
```

### 特徵 5：平裝書的物性與排版規矩（形狀語彙＋版面）

書脊、扉頁（置中、對稱）、目次的點線引導、頁碼置於頁面正下方、版權頁；內文第一段不縮排、其後縮兩字、引號不放行首、不用花俏字距。網站的每一頁都是書的一個部位：封面、正文、書目、版權頁。

```css
.text p+p{text-indent:2em}.text p{text-wrap:pretty;hanging-punctuation:allow-end}
h1,h2,h3{text-wrap:balance}
.toc li{display:flex;gap:8px}.toc li::after{content:"";order:1;flex:1;border-bottom:1.5px dotted #1C1B18;transform:translateY(-4px)}.toc span{order:2}
body{counter-reset:folio}.folio::before{counter-increment:folio;content:"— " counter(folio) " —"}
```

## 三、色彩系統

| 名稱 | hex | 用途 | 比例 |
|---|---|---|---|
| 書頁米 paper | `#F1E9D2` | 頁面地、內頁 | 約 45% |
| 封面白 white | `#FBF8EF` | 白帶、卡片、書脊中段 | 約 22% |
| 墨 ink | `#1C1B18` | 字、1.5px 墨線、cartouche | 約 12% |
| 橘 orange | `#EC6A24` | 系列一／封面頁色帶（字用墨） | 系列色合計約 20%，同畫面 ≤2 色 |
| 綠 green | `#1B8A50` | 系列二／讀一本頁（字用白） | |
| 洋紅 cerise | `#D2336E` | 系列三／書目頁（字用白） | |
| 深藍 navy | `#213C6E` | 系列四／版權頁（字用白） | |
| 灰 grey | `#8C8F91` | 附錄：包車 | ≤2% |
| 黃 yellow | `#EDBE2E` | 附錄：寄物失物 | ≤2% |
| 灰褐 mute | `#5E5A50` | 次要說明字 | 文字用 |

規則：色帶上的字色依色相固定（橘／黃／灰配墨，其餘配白）；白帶只用墨；沒有任何漸層、模糊陰影或半透明（彈出書卡的 backdrop 為 55% 墨，唯一例外）。

## 四、字體系統

- 拉丁無襯線：**Cabin** 400／600／700／italic（Gill Sans 替代）——色帶上的書系名、編號、定價、時刻、英文副題，全大寫加字距 .2–.32em。
- 中文標題：**Noto Sans TC** 500／700／900——書名 900、章名 700、介面 500。
- 內文：**Libre Baskerville**（拉丁）＋ **Noto Serif TC** 400／600（中文），17px／行高 1.9–2.0，量度 ≤34em。
- Scale：12（sc 小大寫）／13／15／17（內文）／19（封底導言）／22–26（章名）／34–54（封面書名）。

## 五、版面與網格

- 封面比例 111:181（B 版平裝），三段 30／40／30。
- 頁面＝一本書：`header.band-top`（sticky 54px）與 `footer.band-bot` 是整站的上下色帶；右側 64px 書脊架是導覽。
- 正文欄寬 ≤34em，左對齊；扉頁、版權頁、車票為置中對稱（Tschichold 在 Penguin 時期的古典置中）。
- 零旋轉、零圓角（cartouche 的橢圓是唯一曲線）；墨線一律 1.5px，強調分隔 2px。
- 書的厚度用硬邊偏移框表示（`box-shadow:6px 6px 0 -1.5px paper, 6px 6px 0 0 ink` 疊兩層），不用模糊陰影。

## 六、元件配方

- **導覽（書脊架）**：四本 44×148 的書脊，上 24px／下 30px 為該頁系列色、中段白底直排頁名；hover 抽出 4px、現用頁抽出 14px 並加底線。≤760px 改為底部 58px 橫排四格。
- **按鈕**：方角、2px 墨框、白底；hover 反白為墨底白字，90ms。
- **卡片＝小封面**：`grid-template-rows:30fr 40fr 30fr`，書名置中於白帶，下帶放 cartouche。
- **列表＝書目**：編號方框＋書名（Noto Sans TC 900）＋點線引導＋定價（Cabin 700）。
- **表單**：方角下拉、方格張數（選中＝墨底白字）、合計用 Cabin 700。
- **頁尾**：下色帶，cartouche＋地址＋連結。

## 七、動效規則（四種，缺一不可）

| 種類 | 本站實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient | **今晚的四本**：四條路線躺成四本書，小車沿書脊上的站點依臺北真實時間前進；白天沒車在路上時，改重播昨夜（一秒兩分鐘），文字明說是重播 | 常駐，每秒更新 | `left` 1.05s linear | 每 30 秒更新、無重播（停在起點，文字照寫） |
| input | **掀封面**：游標靠近封面右緣，封面依距離即時掀起 0–20°；書脊與列表 hover 抽出 | pointermove | .1s linear（掀）／90ms ease-out（抽） | 不掀；抽出改為瞬間 |
| transition | **闔書翻頁**：點站內連結，一張三段式封面從書脊那側 rotateY(−91°→0) 闔上整個畫面，新頁抵達時再翻開；〈一夜一本〉每翻一頁以 `@starting-style` 從 rotateY(−24°) 落下；書目的書卡以 popover＋`@starting-style` 抽出 | 點擊 | 360ms cubic-bezier(.55,0,.8,.3)／500ms cubic-bezier(.2,.7,.3,1) | 直接換頁、直接顯示 |
| signature | **色帶換書**：整站的上下兩條色帶就是「目前這本書的系列色」。游標或焦點移到哪一條路線（任何 `[data-s]`），兩條色帶就從書脊那一側（左）被新顏色以 `clip-path: inset()` 刷過去；在〈一夜一本〉選了哪本書，色帶就變成哪一色——這段在沒有 JS 時由 `body:has(#r2:checked){--b0:…}` 完成 | hover／focus／選書 | 440ms cubic-bezier(.65,0,.25,1) | 直接換色 |

自我限制：不用淡入當主角、不彈跳、不旋轉文字；所有動作都是「書」會做的事——抽出、掀開、闔上、翻頁、換一本。

### motion-library 元件（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` v1.8.0 @3020d75，`tools/ml-embed.js` 抽繪製核心子集＋`src/motion-player.js`（1.8.0 起 `mount()` 分檔）一起 inline 為每頁第一個 `<script>`；`MotionLib.prompt(id)` 可取原始開發 Prompt。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合這個流派 | 類型 |
|---|---|---|---|---|---|
| 封面 | BG-B-18 | Horizontal Lines | primary #EC6A24、secondary #213C6E、bg #F1E9D2、duration 9、loop、density 1.15、intensity .9、seed 1979、16:9（裁成 120px 條帶） | 一疊平放的平裝書從側面看過去——一條一條平塗的水平色帶，就是三段式封面的「水平網格」本身；只用 fillRect，無漸層無陰影 | ambient |
| 讀一本 | TXT-A-02 | Letter Sequence | text「一夜一本」、primary #1C1B18、secondary #1B8A50、bg #F1E9D2、duration 1.6、loop:false、seed 7、16:9 | 標題逐字由下而上排進來，像排字工一個字一個字放進版——對應 Composition Rules 的排字傳統；米底得到近黑字，符合白帶墨字 | transition |
| 讀一本 | BG-B-37 | Minimal Stripes | primary #1B8A50、secondary #D2336E、bg #F1E9D2、duration 10、loop、density 1.4、intensity .8、seed 86、16:9（裁成 96px 條帶） | 讀完放回書架：一排直立書脊在架上滑過，平塗直條 | ambient |
| 書目 | SHP-31 | Domino Fall | primary #213C6E、secondary #EC6A24、bg #F1E9D2、duration 2.2、loop:false、seed 31、16:9 | 「除夕停駛」：架上的書一本推一本倒下——一年唯一停駛的那晚；直角矩形、無圓角 | transition |
| 版權頁 | TXT-A-08 | Slide Text | text「版權頁」、primary #213C6E、secondary #EC6A24、bg #F1E9D2、duration 1.4、loop:false、seed 4、16:9 | 標題滑入、下方畫出一條短線——正是白帶裡「書名＋一條短線」的結構 | transition |

掛載規則：等 `document.fonts.ready`、離屏 `destroy()`、回到視窗重掛；一次性文字 `loop:false` 只播一次；canvas `aria-hidden`；容器保留 `.ml-fb` HTML 標題，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。元件不擔任 signature。注意：元件的 `sans` 字族首選 Unbounded，本站未載入，會退到 Noto Sans TC——這正好接近本風格的中文黑體。

## 八、插畫與圖像風格

**白線雕圓框 line-tint roundel**：所有插圖都是直徑 92–168px 的圓形小圖，模仿木口木刻的「白線」——黑底上以平行白線的粗細表現明暗（四階 tint：線寬 .55／1.2／2.1／3.1，間距 4；另有 ±30° 斜線兩階），亮處是實心米色。全站共用一組 `<pattern>`，場景以多邊形填 `url(#t1..t4)`：夜車迎面、臺北夜景、蘇花山壁、半島燈塔、太平洋日出。圓框外一圈 1.6px 墨線。不准：寫實照片、漸層、彩色插畫（插圖永遠只有墨與米）。

```html
<pattern id="t2" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1.2" fill="#F1E9D2"/></pattern>
<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="49" fill="#F1E9D2" stroke="#1C1B18" stroke-width="1.6"/>
<g clip-path="url(#rc)"><rect width="100" height="100" fill="#1C1B18"/><path d="M0 64h100v36H0z" fill="url(#t2)"/></g></svg>
```

## 九、Logo 與 Favicon

- Logo（`assets/logo.svg`）：一本 72×118 的三段式小封面（橘／白／橘），白帶裡一隻鷺鷥；右側「暝車客運」Noto Sans TC 900 加字距，墨線下方 Cabin 700 大寫 MÊ-TSHIA NIGHT COACH。
- Cartouche：雙線橢圓＋鷺鷥，所有頁尾與封面下帶。
- Favicon：64×64 三段（橘 20／白 24／橘 20）＋白帶上的鷺鷥，inline SVG data URI。

## 十、Do & Don't

**Do**
- 先定分類，再定顏色；顏色一旦綁定就不再挪用。
- 讓每個元件都像書的一個部位（封面、書脊、扉頁、目次、版權頁）。
- 第一段不縮排、頁碼置下中、目次用點線。

**Don't**
- 不要在白帶裡放插圖以外的裝飾、不要讓色帶出現漸層或紋理。
- 不要用 Penguin 名稱、企鵝或任何真實出版社的標誌——做自己的鳥。
- 去AI化：不要紫藍漸層、不要置中大標＋兩顆按鈕＋三張圓角卡片、不要 emoji icon、不要 Lorem ipsum、不要「EST. 19xx」徽章、不要模糊陰影圓角卡。

## 十一、頁面骨架範例

```html
<header class="band band-top"><div class="dye" aria-hidden="true"></div>
 <div class="ser"><b>暝車文庫</b><span>Mê-tshia Library</span></div><div class="px"><span>No. 1</span><span>NT$ 60</span></div></header>
<main>
 <div class="book"><div class="cover"><div class="face front">
  <div class="b top"><span class="sc">暝車文庫</span><span class="sc">NT$ 60</span></div>
  <div class="w"><h1><span class="zh">書名</span><span class="en">ENGLISH TITLE</span></h1><hr class="rule"><p class="au">作者</p></div>
  <div class="b bot"><!-- cartouche --></div></div></div></div>
</main>
<nav class="rack"><a class="spine" href="index.html" style="--c:#EC6A24" aria-current="page"><span>封面</span><i>1</i></a>…</nav>
<footer class="band band-bot"><div class="dye" aria-hidden="true"></div>…</footer>
```

色帶換色（signature）：

```js
MT.dye=function(k){var c=MT.S[k];document.querySelectorAll('.band').forEach(function(b){
 b.style.setProperty('--b1',c[0]);b.classList.remove('wiping');void b.offsetWidth;b.classList.add('wiping');b.style.setProperty('--bi0',c[1]);
 setTimeout(function(){b.style.setProperty('--b0',c[0]);b.classList.remove('wiping');},470);});};
```
```css
.band{position:relative;background:var(--b0);color:var(--bi0);isolation:isolate}
.band>.dye{position:absolute;inset:0;background:var(--b1);clip-path:inset(0 100% 0 0);z-index:-1}
.band.wiping>.dye{transition:clip-path .44s cubic-bezier(.65,0,.25,1);clip-path:inset(0 0 0 0)}
```

## 十二、技術實作與相容性

### 1. CSS `:has()` ＋ radio 狀態機（E 資料與生成層「CSS-only 狀態機」）——承載〈一夜一本〉與 signature 的無 JS 版

- 用途：〈一夜一本〉的 4 本書 × 6 頁 × 3 個二選一全部由 19 個隱藏 radio 持有狀態；`body:has(#pg3:checked) .p3{display:block}` 決定顯示哪一頁、`body:has(#r2:checked) .v2` 決定顯示哪一條路線的段落、`body:has(#c2a:checked) .f2a` 拼出結局與車票欄位、`body:has([name=c1]:checked) .p1 .nx` 決定「下一頁」能不能按、`body:has(#r2:checked){--b0:#1B8A50}` 讓整站色帶換色。JavaScript 只負責加分項：序號、日期、網址 `?b=2-aba-5` 還原與分享、方向鍵翻頁。
- 支援現況（2026-10-20 查證）：MDN 標示 `:has()` 為 **Baseline 2023**（2023-12 起）；Chrome／Edge 105、Safari 15.4、Firefox 121。
- 來源：https://developer.mozilla.org/docs/Web/CSS/:has
- Fallback：所有狀態規則包在 `@supports selector(:has(a))` 內；不支援時六頁與四條路線的段落全部攤開成一份長文，仍可從頭讀到尾。
- 實測：以 jsdom 驗證 `.st:has(#c:checked)` 類選擇器邏輯與 `?b=` 還原（radio 狀態、序號、日期、訂位連結皆正確）。

### 2. `@starting-style` ＋ `transition-behavior: allow-discrete` ＋ Popover API（B 動效與時間軸層）——承載 transition

- 用途：(a)〈一夜一本〉每頁由 `display:none` 變成 `block` 時，從 `perspective(1400px) rotateY(-24deg)`、opacity 0 落下（`transition: display .5s allow-discrete`）；(b) 書目頁每本書是一個 `popover`，`@starting-style{.pop:popover-open{…}}` 讓它從架上「抽出來」，`overlay`／`display` 同樣 allow-discrete，`::backdrop` 也有進場。
- 支援現況（2026-10-20 查證）：web.dev〈Now in Baseline: animating entry effects〉——`@starting-style` 與 `transition-behavior: allow-discrete` 自 Firefox 129（2024-08）起 Baseline Newly available；`@starting-style` Chrome／Edge 117、Safari 17.5；`allow-discrete` Safari 17.4。MDN `transition-behavior` 標 Baseline（2024-08）。有第三方文章指 Firefox 對 `display` 的離場轉場仍是瞬間切換，本站離場本來就允許瞬間。Popover API：Chrome 114、Safari 17、Firefox 125。
- 來源：https://web.dev/blog/baseline-entry-animations ・ https://developer.mozilla.org/docs/Web/CSS/transition-behavior
- Fallback：不支援 `@starting-style` 時直接出現（資訊零損失）；不支援 popover 時 JS 加 `html.nopop`，以 class 切換固定定位的書卡；連 JS 都沒有時，書卡以一般區塊攤在書目下方。

### 3. `text-wrap: balance／pretty`、`hanging-punctuation`、CSS counters（C 版面與樣式層）——承載特徵 5（排版規矩）

- 用途：所有標題 `balance`（不留孤字）、內文 `pretty`（段尾不留單字）、`hanging-punctuation: allow-end`（句讀可掛出行尾）、頁碼以 `counter(folio)` 自動遞增、乘車須知以 `counter(r, cjk-decimal)` 編為「一、二、三」。這是把 Composition Rules「排字要守規矩」翻成瀏覽器原生能力。
- 支援現況（2026-10-20 查證）：`text-wrap: balance` 已在 Chromium、Firefox、Safari 皆為 Baseline；`pretty` 支援較窄（Chromium 117 起最早），屬漸進增強；`hanging-punctuation` 目前主要只有 Safari。
- 來源：https://specification.website/spec/foundations/text-wrap/ ・ https://developer.mozilla.org/docs/Web/CSS/text-wrap
- Fallback：不支援時退回一般斷行，版面不依賴它。

### 效能預算實測（建置當下）

| 頁 | 檔案大小（含 motion-library 子集＋播放器 67.7KB） |
|---|---|
| index.html | 約 104KB |
| read.html | 約 106KB |
| routes.html | 約 107KB |
| colophon.html | 約 88KB |

- 首屏 JS：motion-library 子集 parse＋eval 於 Node 實測約 2ms；站內腳本只掛事件、每秒算一次四條線位置（純算術）。
- 所有動效只動 `transform`／`opacity`／`clip-path`／`left`（小車，四個元素）；同時運轉的 motion-library 元件 ≤2。
- 驗證：`node --check` 逐頁逐段、jsdom 逐頁執行全部 inline script 無例外（含假 canvas 掛載五個元件）、`tools/ml-smoke.js` smoke ok、圓框插圖與鷺鷥以 resvg 實際渲染檢查。建置環境沒有可用瀏覽器，未取得 60fps 實測值。
