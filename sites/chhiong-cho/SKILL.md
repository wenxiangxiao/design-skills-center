---
name: grunge-raygun-deconstructed
description: Deconstructed 1990s grunge editorial in the Ray Gun / David Carson lineage — overlapping type columns on a shared subgrid, no baseline, 33x type-size range with headlines cut by the canvas edge, photocopy generation-loss via feMorphology, letterform debris as the only illustration, and a fluorescent spot colour reserved for what was thrown away.
---

# Grunge／Ray Gun 解構編輯

> 本文件是規格書。讀完它，你應該能在任何產業上做出同一種版面，而不需要看過原始 Demo。
> 對照站：`sites/chhiong-cho`（衝組摔角同盟／台中大里 62 巷倉庫）。

---

## 一、設計哲學

### 這個流派從哪裡來

一九九〇年，David Carson——一個沒受過正規平面訓練、原職高中社會科老師兼職業衝浪選手的人——接下《Beach Culture》的美術設計。這本雜誌只出了六期就倒了，卻拿下一百五十座以上的設計獎。一九九二年他成為《Ray Gun》（發行人 Marvin Scott Jarrett）的創刊藝術指導，做到一九九五年離開。一九九五年出版的作品集《The End of Print》賣了二十萬本，是史上最暢銷的平面設計書之一。

技術條件決定了它的長相。Macintosh 加上 QuarkXPress 讓一個人可以在螢幕上直接把字級、字距、旋轉角度推到排版工人不會允許的位置，而且不用付重排費；Fontographer 讓任何人可以自己改字型。同一時期 Emigre（Rudy VanderLans 與 Zuzana Licko）在賣故意長得不完美的數位字型——Barry Deck 的 Template Gothic（1990，靈感來自自助洗衣店裡一張手寫描字的告示）、P. Scott Makela 的 Dead History（1990，把兩套現成字型硬接在一起）。《Ray Gun》後來自己開了字體公司 GarageFonts，專門發行這批「壞掉的」字。

還有影印機。九〇年代的獨立刊物、樂團傳單、滑板貼紙都是影印的，而影印機的物理特性——每複印一代筆畫就變粗一點、小字的孔洞被填死一點、灰階被切成純黑白——變成了這個流派的材質語言。

### 三件必須先接受的事

1. **可讀性不等於溝通。** 這是 Carson 最常被引用的一句話。一九九四年《Ray Gun》把一整篇 Bryan Ferry 的專訪排成 Zapf Dingbats，整篇一個字都讀不到，理由是那篇訪談很無聊。這個流派的立場是：版面對內容有意見，而且它會表達出來。
2. **版面是編輯的，不是作者的。** 字級不是內容的階層，是編輯的判斷。所以本流派沒有「標題」這個角色——最大的那塊字通常不是標題，而是被畫布切掉一半的一段內文。
3. **它必須看起來像被印壞過。** 乾淨的向量邊、對齊的基線、完整的字，都會把這個風格關掉。粗糙不是效果，是這個流派的媒材。

### 這個流派做網頁時必須加上的紀律（原作沒有的）

紙本可以不管讀者。網頁不行。因此本規格書強制三條：

- **每一段被疊住、被切掉、被換成符號的文字，都必須在同一頁的別處有一份可選取、對比 ≥7:1 的完整版本**（本站的「乾淨版」區塊與 `fa.html`）。
- **必須有一顆把疊印全部關掉的開關**，並在 `prefers-reduced-motion` 時自動打開。
- **≤700px 一律不疊印**。手機上這個風格靠字級跨度、切斷與影印質感表達，不靠重疊。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個流派了。每一項附可直接複製的片段。

### 特徵 1・沒有基線，也沒有欄——但格線存在，只是被違反

字塊各自傾斜（−4° 到 +6°）、行距在同一段裡改變、多欄內文疊在同一塊版心上。關鍵在於**它們不是隨機亂放的**：所有欄仍然對齊同一組欄線，這就是為什麼疊起來還讀得出結構。技術上用 `subgrid` 讓巢狀格線繼承母版的欄。

```css
.sheet{max-width:1280px;margin:0 auto;padding:0 22px;
  display:grid;grid-template-columns:repeat(12,minmax(0,1fr));
  column-gap:14px;grid-auto-rows:minmax(14px,auto)}   /* 14px＝基線單位 */

.stack{grid-column:1/-1;display:grid;grid-template-columns:subgrid}
.col{grid-row:1;display:block;align-self:start}        /* 四欄全部落在同一列＝疊印 */
.col:nth-child(1){grid-column:1/8;transform:rotate(-1.6deg)}
.col:nth-child(2){grid-column:5/12;transform:rotate(2.4deg)}
.col:nth-child(3){grid-column:2/9;transform:rotate(-.7deg)}
.col:nth-child(4){grid-column:6/13;transform:rotate(1.1deg)}
```

疊印要能讀，靠的是「一層實心 + 三層空心」的分工，不是靠透明度：

```css
.col{color:transparent;-webkit-text-stroke:.62px #6E6C6A;opacity:.44;z-index:1}
.col--top,.col:hover,.col:focus-within{
  color:#16161A;-webkit-text-stroke:0;opacity:1;z-index:20;
  /* 用底色光暈在下層字上挖一個洞——這是 knockout，不是陰影 */
  text-shadow:0 0 8px #C7C3B8,0 0 5px #C7C3B8,0 0 3px #C7C3B8,0 0 1px #C7C3B8}
@supports not (-webkit-text-stroke:1px red){.col{color:#6E6C6A;opacity:.3}}
```

### 特徵 2・字級跨度 ≥12 倍且同屏並存，最大的那塊字被畫布切斷

本站實測 7px → 232px（33 倍）。**切斷是規格不是意外**：把 `white-space:nowrap` 的巨型字放進 `overflow:hidden` 的容器，再用負外距推出去。

```css
.bleed{overflow:hidden;position:relative}
.mega{font-family:"Archivo Black",sans-serif;
  font-size:clamp(78px,17vw,232px);line-height:.74;letter-spacing:-.045em;
  margin-left:-.06em;white-space:nowrap}
.mega-zh{font-weight:900;font-size:clamp(64px,13.5vw,178px);line-height:.78;letter-spacing:-.06em}
.tiny{font-family:"Space Mono",monospace;font-size:7px;line-height:1.5;letter-spacing:.14em;text-transform:uppercase}
```
```html
<div class="bleed"><h1 class="mega-zh xr" style="margin-right:-14vw">衝組摔角同盟</h1></div>
```

### 特徵 3・影印世代（copy-of-copy）

每一個大字都要看得出被複印過。做法不是加雜訊，是重現影印機真正做的事：**加胖 → 糊掉 → 硬切回黑白**。細筆畫變粗、字腔被填死，這就是世代損失。

```html
<svg id="fxroot" width="0" height="0" aria-hidden="true"><defs>
<filter id="xerox" x="-10%" y="-12%" width="122%" height="128%" color-interpolation-filters="sRGB">
  <feMorphology id="mo" in="SourceGraphic" operator="dilate" radius="0.28">
    <animate attributeName="radius" values="0.14;0.62;0.22;0.44;0.14"
             dur="6.4s" repeatCount="indefinite"/>
  </feMorphology>
  <feGaussianBlur stdDeviation="0.62" result="s"/>
  <feComponentTransfer in="s">
    <feFuncA type="discrete" tableValues="0 0 0 0 1 1 1 1"/>
  </feComponentTransfer>
</filter></defs></svg>
```
```css
.xr{filter:url(#xerox)}    /* 只加在 ≥28px 的字與圖像上，正文永遠乾淨 */
```

第二層世代由 DOM／SVG 重複本身承擔：同一組形，位移 `(+2.6,+3.4)` 濃度 30%、位移 `(−3.8,+5.2)` 濃度 15%，疊在正稿下面。

### 特徵 4・字當圖用，資訊當裝飾用

**全站不准有一張插圖。** 圖像只有一種來源：把字母的一段筆畫放大八到四十倍，切出一塊。反過來，真正的資訊（人名、比數、地址、時間）縮到 7–9px 的等寬字塞在角落。這個對調是這個流派的態度本身。

字骸的六種原語（`glyph-debris`）：

```js
// k=0 字幹 / 1 轉折 / 2 弧終 / 3 橫樑 / 4 點 / 5 斜尾；t＝筆幹寬度 34–80
if(k===0) d="M0 0 h"+t+" v260 h-"+t+" Z";
if(k===1) d="M0 0 h"+t+" v170 h118 v"+t+" h-"+(118+t)+" Z";
if(k===3) d="M0 0 h"+L+" v"+t+" h-"+L+" Z";
```
每件字骸 = 2–4 個原語隨機縮放旋轉拼合，**至少一件必須被畫框切斷**（`clipPath` + 允許負座標），再疊三代影印殘影，最後一件上螢光色。種子用 FNV-1a → mulberry32，同一個名字永遠得到同一塊。

### 特徵 5・一塊螢光專色，而且它不標示重點

螢光橘 `#FF3B00` 只給**被丟掉的東西**：頁碼、剪口標記、被蓋住的字、被排成符號的段落。連結是黑的，標題是黑的，按鈕是黑的。強調色在這個流派裡不服務資訊層級——這條反用是態度，不是失誤。

```css
.pnum{position:absolute;font-family:"Space Mono",monospace;font-size:11px;color:#FF3B00;letter-spacing:.2em}
.cutmark{color:#FF3B00;font-family:"Space Mono",monospace;font-size:9px;letter-spacing:.1em}
a{color:#16161A;text-decoration-thickness:2px;text-underline-offset:3px}
a:hover{text-decoration-thickness:5px}   /* 強調靠線變粗，不靠變色 */
```

---

## 三、色彩系統

mood 代號 **`toner-grey` 碳粉灰**。定義不是某幾個色票，是「一整台影印機」：暖灰的地、髒白的紙、不純的黑、加一塊完全不屬於這台機器的螢光。

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 影印灰 | `#C7C3B8` | 全站地色。偏綠的暖灰，不是中性灰，也不鋪紙紋 | 約 32% |
| 髒白 | `#E6E2D6` | 紙——所有必須乾淨可讀的區塊（乾淨版、表格、輸出稿） | 約 18% |
| 碳黑 | `#16161A` | 所有文字、粗線、按鈕底。不是 `#000`，帶一點藍 | 約 30% |
| 中灰 | `#6E6C6A` | 空心字的描邊、mono 小字、次要資訊 | 約 8% |
| 螢光橘 | `#FF3B00` | 只給被丟掉的：頁碼、剪口、符號段、字骸的最後一件 | ≤8% |
| 酸黃 | `#E9FF37` | 只給「被編輯改過的痕跡」：hover、選取、掃描條、螢光筆 | ≤4% |
| 頁外黑 | `#0E0E11` | footer。比碳黑更暗，代表版面之外 | 約 5% |

**硬規則**

- 地色不准鋪紙纖紋、顆粒、noise 或漸層。這個風格的質感全部來自濾鏡與世代殘影，一旦鋪材質就滑向 collage／拼貼，不是 Ray Gun。
- 螢光橘與酸黃永不同時出現在同一個元件上。
- 正文對比：碳黑 `#16161A` on 影印灰 `#C7C3B8` ≈ 11.6:1；髒白上更高。空心字狀態不算正文，它必須有可讀的替身。

---

## 四、字體系統

| 角色 | 字族 | 字重 | 用法 |
|---|---|---|---|
| 拉丁巨型字 | `Archivo Black` | 400（單一字重） | `.mega`，78–232px，`letter-spacing:-.045em` |
| 中文全部 | `Noto Sans TC` | 400／700／900 | 900 給 `.mega-zh`／`.big`／`.mid`；400 給正文 |
| 資訊與標籤 | `Space Mono` | 400／700 | 7／9／11px，`letter-spacing:.09–.20em`，`text-transform:uppercase` |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+TC:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

字級階梯（必須全部用上，才湊得出 ≥12 倍跨度）：

```
7 · 9 · 11 · 13 · 14 · 15 · 17 · 22 · 30 · 44 · 74 · 116 · 178 · 232
```

行高：巨型字 `.74–.86`（一定要小於 1，讓行與行互相咬）；正文 `1.62`；mono 標籤 `1.5`。
字距：巨型字負值（−.045 到 −.06em），mono 標籤大正值（+.09 到 +.20em）。**中間值不存在**——這個流派沒有溫和的字距。

---

## 五、版面與網格

- **母版**：12 欄，`column-gap:14px`，`max-width:1280px`，左右 padding 22px。列的基本單位 14px（`grid-auto-rows:minmax(14px,auto)`）。
- **旋轉角度表**：`-4°／-1.6°／-0.7°／+1.1°／+2.4°／+5.5°`。超過 ±6° 會變成貼紙拼貼，不是這個流派。
- **留白規則**：這個流派不留白，它留**缺口**——被切斷處、被蓋住處、頁面右緣被推出去的地方。四邊的外緣一定要有東西被切到；四邊都完整＝失敗。
- **頁碼**：一定要有，一定不在該在的地方，一定是螢光橘，一定 `aria-hidden`。
- **裝訂溝**：跨頁開場中央一條 26px 的虛線帶，`opacity:.28`，`pointer-events:none`。它提醒讀者這是一個跨頁而不是一個網頁。

### 開場原型：bleedspread-first 出血跨頁

首屏是一個**有邊界、但內容故意超出邊界**的跨頁：巨型字被右緣與下緣切掉、多欄互相侵入、頁碼躲在角落、沒有「標題／副標／按鈕組」這個結構。閱讀順序不由位置決定，由字級決定。

### 導覽原型：overlap-stack 疊字層序

四頁的頁名疊在同一個位置（各自微旋轉、各自不同字級），現用頁那一層在最上面且是唯一實心的，其餘三層是空心輪廓。**語意是層序（z-order），不是位置、不是持有、不是朝向、不是尺寸。** ≤900px 攤平為四格橫列。

---

## 六、元件配方

```css
/* 分隔線：只有兩種，6px 與 2px，永遠實線，永遠不圓角 */
.rule{border:0;border-top:6px solid #16161A}
.rule-t{border:0;border-top:2px solid #16161A}

/* 按鈕：實心黑，hover 反白。零圓角、零陰影、零漸層 */
button,.btn{font-weight:900;font-size:15px;background:#16161A;color:#E6E2D6;
  border:3px solid #16161A;padding:9px 16px;cursor:pointer}
button:hover{background:#E6E2D6;color:#16161A}
.ghostbtn{background:transparent;color:#16161A}

/* 卡片：這個流派沒有「卡片」。要框住東西就用 3px 實線 + 髒白底 */
.plate{background:#E6E2D6;border:3px solid #16161A;padding:16px 18px}

/* 表格：只有橫線，沒有直線，沒有斑馬紋。表頭是 mono 小字 */
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{border-top:2px solid #16161A;padding:7px 8px;text-align:left;vertical-align:top}
th{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:.12em;
   text-transform:uppercase;color:#6E6C6A;border-top:0}

/* 表單：邊框 2px，focus 用 3px 實線 outline，不用光暈 */
input,select,textarea{border:2px solid #16161A;background:#E6E2D6;padding:7px 8px;font-family:inherit}
:focus-visible{outline:3px solid #16161A;outline-offset:2px}

/* footer：唯一使用頁外黑的地方，代表版面結束 */
footer{background:#0E0E11;color:#C7C3B8;margin-top:64px;padding:38px 0 44px}
footer a{color:#C7C3B8;text-decoration-color:#FF3B00}
```

**元件禁令**：不准圓角、不准模糊陰影（要陰影就用實心位移色塊）、不准漸層按鈕、不准 hover 位移動畫、不准 icon（要圖示就用字骸或 mono 字符）。

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可。

| # | 類型 | 是什麼 | 觸發 | duration／easing |
|---|---|---|---|---|
| 1 | ambient 環境 | **又被印了一次**：`feMorphology` 的 `radius` 在 0.14→0.62→0.22→0.44 之間循環，全頁大字的邊緣週期性變胖再瘦 | 無，持續 | 6.4s `repeatCount="indefinite"`（SMIL） |
| 2 | input-driven 輸入 | **升層**：hover／focus 任一疊印欄，該欄 80ms 內轉實心並升到最上層 | `:hover` / `:focus-within` | 80ms linear |
| 3 | transition 轉場 | **掃描條**：狀態切換時一條 45° 酸黃斜帶以 `clip-path` 由左掃到右（影印機的光） | 上版／換頁狀態 | 240ms linear |
| 4 | signature 簽名 | **z-surface 浮層**：`IntersectionObserver` 讓四個哨點依捲動位置決定哪一欄浮到最上層並拿回可讀性，其餘退成空心。頁沒有動，只有層序在動 | 捲動位置 | 即時（無過場） |

```css
@keyframes swipe{
  from{clip-path:polygon(-30% 0,0 0,-14% 100%,-44% 100%)}
  to  {clip-path:polygon(100% 0,130% 0,116% 100%,86% 100%)}}
.scanbar{position:absolute;inset:0;background:#E9FF37;mix-blend-mode:multiply;opacity:0;pointer-events:none}
.scanbar.go{opacity:.85;animation:swipe .24s linear 1}
```

### prefers-reduced-motion 降級（四種全部，資訊零損失）

1. `svgRoot.pauseAnimations()` 並把 `radius` 固定為 `0.28`——影印質感保留，只是不再變化。
2. 移除 transition，狀態切換立即完成（功能完全不變）。
3. 掃描條 `animation:none;opacity:0`。
4. **關閉整套疊印**：`IntersectionObserver` 不啟動，`body.flat` 自動開啟，四欄攤平成依序排列的全黑實心文字。降級後比原狀態更好讀——這是本規格書刻意的設計：這個流派的降級路線是「變回一本正常的雜誌」。

---

## 八、插畫與圖像風格

技法代號 **`glyph-debris` 字骸構成**。

- **全站零外部圖片、零照片、零描外形的插圖。**
- 唯一的圖像原語是特徵 4 那六種筆畫碎片。判準：**拿掉全部語意，仍讀得出「這是字的一部分，而且它被印壞了幾次」**。
- 每件字骸必須同時滿足三件事：(1) 至少一個原語被畫框切斷；(2) 疊三代影印殘影（1.0／0.30／0.15）；(3) 最後一件上螢光色，其餘碳黑。
- 決定性：`FNV-1a(seed) → mulberry32`，同一個字串永遠得到同一塊字骸。因此 logo、favicon、十二張人物圖、印記全部出自同一支引擎，換一個名字就換一塊。

```js
function fnv(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h>>>0}
function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
```

**與相鄰技法的差別**：`melt-fill`（迷幻海報）的字被塞進包絡、職責是把紙填滿；`stroke-skeleton`（鑄字所）渲染的是可讀的完整漢字；`motif-glyph` 的每一格都能讀回一個母題。字骸不填滿、不可讀、也不編碼任何資料——它承載的是**印刷損壞本身**。

**明文禁用**：`feTurbulence` 手抖邊（那是迷幻海報的語彙，而且會糊掉字緣）、半調網點、細線幾何線描、任何寫實描繪、任何 emoji。

---

## 九、Logo 與 Favicon

**Logo**（`assets/logo.svg`，360×120）：由四塊筆畫碎片組成的字標，其中一塊是螢光橘。整組套 `#lx` 濾鏡（`feMorphology` radius 0.5 → blur 0.7 → 硬切），並在正稿下方疊兩代位移殘影（`translate(-4,6)` @15%、`translate(3,4)` @30%）。底部一條 8px 實心橫槓——黑的部分是名字，橘的部分是被切掉的名字。

**Favicon**：原創 inline SVG data URI，16px 下只需讀得出「一個黑色的角 + 一塊橘色」：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23C7C3B8'/%3E%3Cpath d='M8 6h15v34h20v-9l13 27H8Z' fill='%2316161A'/%3E%3Cpath d='M40 4h16v13H40Z' fill='%23FF3B00'/%3E%3Cpath d='M6 50h30v5H6Z' fill='%2316161A'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 讓最大的那塊字被畫布切掉。每一頁四邊都要有東西被切到。
- 讓兩段以上的文字疊在一起，並且給讀者一個把它們分開的方法。
- 把頁碼藏起來，但一定要留著。
- 資訊（電話、地址、價錢、時間）用 7–11px 的 mono 塞在角落——縮小不等於藏起來，它必須可選取、可讀。
- 每一個大於 28px 的字都套影印濾鏡。
- 用 `subgrid` 保住欄線：這個流派是「破壞一個存在的格線」，不是「沒有格線」。

**Don't**

- ❌ 不要用紫藍漸層、圓角卡片、模糊陰影、置中大標＋副標＋兩顆按鈕。
- ❌ 不要用 emoji 當 icon。要圖示就用字骸或 mono 字符。
- ❌ 不要把螢光色拿去標示重點——它只給被丟掉的東西。
- ❌ 不要在正文（<22px）上套濾鏡。影印質感在小字上會直接摧毀可讀性。
- ❌ 不要鋪紙紋、顆粒或 noise 背景。這個流派的髒是印刷損壞，不是材質。
- ❌ 不要 Lorem ipsum、不要「在當今快節奏的世界」、不要「EST. 19xx」徽章、不要「把 X 變成 Y」句式。
- ❌ 不要在手機上疊印。
- ❌ 不要讓亂放的字塊真的隨機——每一個角度、每一次切斷都要能講出理由。「看起來像壞掉」跟「真的壞掉」之間的差別就是這個流派的全部技術含量。

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+TC:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>/* 見 §三～§七 */</style></head>
<body>

<!-- 影印濾鏡（全站唯一一份） -->
<svg id="fxroot" width="0" height="0" aria-hidden="true"><defs>…filter#xerox…</defs></svg>

<!-- 導覽：overlap-stack -->
<nav class="nav" aria-label="主導覽"><ol>
  <li aria-current="page"><a href="./index.html"><span class="zh">戰報</span></a></li>
  <li><a href="./roster.html"><span class="zh">名冊</span></a></li>
  <li><a href="./promo.html"><span class="zh">嗆聲台</span></a></li>
  <li><a href="./fa.html"><span class="zh">版規</span></a></li>
</ol></nav>

<main id="main">
  <!-- 開場：bleedspread-first -->
  <div class="sheet"><section class="spread">
    <div class="gutter" aria-hidden="true"></div>
    <p class="tiny" style="position:absolute;left:0;top:6px">刊名／期號／印量／定價</p>
    <span class="pnum" style="right:8px;bottom:52px">— 一 —</span>
    <div class="bleed"><h1 class="mega-zh xr" style="margin-right:-14vw">主體名</h1></div>
    <div class="bleed"><p class="mega xr" style="margin-left:-2vw">LATIN</p></div>
    <hr class="rule">
    <p><button id="flatbtn" aria-pressed="false" class="ghostbtn">全部攤平</button></p>
  </section></div>

  <!-- 疊印四欄 + 四個哨點 -->
  <div class="sheet" style="position:relative">
    <div class="ticks" aria-hidden="true">
      <b class="tick" data-k="0" style="top:9%"></b><b class="tick" data-k="1" style="top:35%"></b>
      <b class="tick" data-k="2" style="top:61%"></b><b class="tick" data-k="3" style="top:88%"></b>
    </div>
    <div class="stack" data-stack>
      <article class="col">…</article><article class="col">…</article>
      <article class="col">…</article><article class="col">…</article>
    </div>
  </div>

  <!-- 可用性保底：乾淨版 -->
  <div class="sheet"><section class="clean">
    <h2>乾淨版・這一頁疊在一起的四段字</h2><p>…</p>
  </section></div>
</main>

<footer class="ft">…地址／電話／時間／價目／頁面清單…</footer>
<script>/* 見 §十二 */</script></body></html>
```

```js
/* z-surface：捲動位置決定層序 */
var st=document.querySelector("[data-stack]");
var RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
var NARROW=matchMedia("(max-width:700px)").matches;
if(st && "IntersectionObserver" in window && !RM && !NARROW){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting) st.setAttribute("data-top",e.target.dataset.k); });
  },{rootMargin:"-46% 0px -46% 0px",threshold:0});
  [].forEach.call(document.querySelectorAll(".tick"),function(t){io.observe(t)});
  st.setAttribute("data-top","0");
}
```

---

## 十二、技術實作與相容性

本站認領三項核心技術，各自承載一個不可省略特徵。以下支援度為 **2026-08-21 查證**。

### 1. CSS `subgrid`（C 版面與樣式層）— 承載特徵 1

**它承載什麼**：疊印區塊自己是一個巢狀格線，但欄線直接繼承母版的十二欄，所以四段字雖然各自傾斜、各佔不同欄，卻永遠對齊同一組欄線——疊起來仍讀得出結構。〈名冊〉那十二張卡改用**列方向**的 subgrid（`grid-template-rows:subgrid`），讓十二個人的藝名、拉丁名、體格、引語四行對齊同一條基線，不管文字多長。這是這個版面唯一沒有被破壞的規矩，也是「格線存在、只是被違反」這個命題的證據。

**支援度查證**：MDN／caniuse 顯示 `subgrid` 於 **2026-03-15 進入 Baseline Widely available**；Firefox 71+（2019-12）、Safari 16+（2022-09）、Chrome／Edge 117+（2023-09），全球覆蓋約 97%。

**Fallback（具體行為）**：
```css
@supports not (grid-template-columns:subgrid){
  .stack{grid-template-columns:repeat(12,minmax(0,1fr));column-gap:14px;
         grid-auto-rows:minmax(14px,auto)}
}
@supports not (grid-template-rows:subgrid){ .card{display:block;grid-row:auto} }
```
不支援時：疊印區塊改用自己重新宣告的十二欄（欄線在多數情況下仍對齊，但母版若改用內容相依的軌道尺寸就會漂移）；名冊卡片退回一般區塊流，資料行不再跨卡對齊——**版面與全部文字完整可讀，只是失去對齊保證**。

### 2. SVG `feMorphology` 濾鏡鏈（A 渲染層）— 承載特徵 3

**它承載什麼**：影印世代損失。`feMorphology operator="dilate"` 把筆畫加胖 → `feGaussianBlur` 糊掉 → `feComponentTransfer` 以 `feFuncA type="discrete"` 硬切回黑白。這正是影印機每複印一代發生的事：細筆畫變粗、字腔被填死、灰階被丟棄。`radius` 由一段 SMIL `<animate>` 在 6.4 秒內走一輪，構成本站的環境動效。

**為什麼不用 `feTurbulence`＋`feDisplacementMap`**：那是位移（手抖邊），做出來的是「歪掉的線」，是迷幻海報／絹印的語彙；影印機不會讓線歪，它只會讓線胖、讓細節消失。可行性上位移也會糊掉字緣造成可讀性損失。

**支援度查證**：MDN 標示 `<feMorphology>` 為 **Baseline Widely available，2015-07 起跨瀏覽器**；caniuse 另有 `mdn-svg_elements_femorphology_html_elements` 條目，確認以 `filter:url(#id)` 套用在 **HTML 元素**上（本站的用法）同樣受支援。`feComponentTransfer` / `feFuncA` / `feGaussianBlur` 同屬 SVG 1.1 濾鏡基元，支援度相同。

**Fallback（具體行為）**：
```css
@supports not (filter:url(#xerox)){ .xr{filter:none} }
```
濾鏡失效時整條鏈被忽略，字與字骸以乾淨的向量邊呈現——**版面結構、字級跨度、切斷、疊印、層序全部不變，資訊零損失**，只是失去材質。SMIL 若被停用，`radius` 停在屬性上寫死的 `0.28`，仍是一代影印。

**reduced-motion**：`document.getElementById("fxroot").pauseAnimations()` 停住 SMIL，並把 `radius` 設為 `0.28` 定值。

### 3. `IntersectionObserver`（D 輸入與感測層）— 承載簽名動效 z-surface

**它承載什麼**：四個 1×1px 的哨點分佈在疊印區的 9%／35%／61%／88% 高度；哪一個進入視窗中央 8% 的帶狀區（`rootMargin:"-46% 0px -46% 0px"`），對應的那一欄就被推到最上層、轉回實心碳黑並用底色光暈在下層字上挖洞，其餘三欄退成空心輪廓。**捲動不移動任何東西，它只換層序。**

選它而非 `scroll` 事件：層序切換只在跨越門檻時發生，用 `scroll` 需要每幀讀取 `getBoundingClientRect()`（layout thrashing）；IO 由瀏覽器在合成執行緒批次回報，整個捲動過程 JS 只被喚醒 4 次。

**支援度查證**：MDN 標示 `IntersectionObserver` 為 **Baseline Widely available，2019-03 起跨瀏覽器**（Chrome 51+、Firefox 55+、Safari 12.1+、Edge 15+）。

**Fallback（具體行為）**：
```js
if(!("IntersectionObserver" in window)) return;   // 不設 data-top
```
```css
.stack:not([data-top]) .col:nth-child(1){color:#16161A;-webkit-text-stroke:0;opacity:1;z-index:20}
```
不支援時第一欄恆為實心可讀，其餘三欄為空心輪廓，且四欄全文另存於同頁「乾淨版」區塊——**資訊零損失**。`:hover` / `:focus-within` 的升層是純 CSS，與 IO 無關，因此鍵盤 Tab 過去仍可逐欄讀完。

### 效能預算（實測）

| 項目 | 門檻 | 本站 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | ≤350KB | index 25.3KB／roster 41.1KB／promo 33.6KB／fa 31.4KB |
| 外部資源 | 僅 Google Fonts | 3 字族，無圖片、無音檔、無函式庫 |
| 首屏 JS 執行 | ≤100ms | 首頁啟動腳本 <2ms（一次 `querySelectorAll` + 建立 1 個 IO + observe 4 個節點）；`promo` 的排版判定為 5 次查表，窮舉 243 組合共 <1ms |
| 主要動畫 | 60fps | ambient 由 SMIL 驅動濾鏡參數，不觸發 layout；z-surface 只改 `z-index`／`color`／`text-shadow`，零 `getBoundingClientRect`、零 layout thrashing |
| 濾鏡成本 | — | `.xr` 只掛在每頁 2–14 個元素上（大字與字骸），不掛在正文；`filter` 區域以 `x/y/width/height` 收在 122%×128% 以限制濾鏡畫布 |

### 已知限制

- `-webkit-text-stroke` 未進標準（標準的 `text-stroke` 尚未實作），但三大引擎皆支援此前綴屬性。已加 `@supports not (-webkit-text-stroke:1px red)` 退回「灰字 + 30% 不透明」，空心／實心的對比仍成立。
- 疊印區在極端字級設定（瀏覽器最小字級 >20px）下可能互相擠壓。此時使用者按「全部攤平」即完全恢復。
- SMIL 動畫在 SVG 濾鏡屬性上的支援良好，但無法被 CSS 媒體查詢控制，故以 JS `pauseAnimations()` 實作 reduced-motion 降級；JS 停用且 reduced-motion 開啟時，濾鏡動畫仍會播放（唯一一個無法純 CSS 降級的點，已在此揭露）。
