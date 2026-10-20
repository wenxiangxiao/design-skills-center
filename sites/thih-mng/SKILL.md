---
name: subway-graffiti-piece
description: NYC subway-era graffiti writing (1971–1989) as a web style — fat interlocking bubble letters built in a fixed seven-layer spray order, soft speckled fades, overspray and drips, handstyle tags, all painted on a real surface (galvanized rolling shutter, cement, buffed patches) under sodium night light.
---

# 紐約地鐵噴漆 Subway Graffiti Piece

> 範例站：鐵門仔 THIH-MN̂G GATES（高雄苓雅的鐵捲門行，打烊後把店家的鐵門噴成招牌）。
> 風格本體來自 1971–1989 年紐約地鐵車廂上的 *writing*：Phase 2 的膨字（bubble letters / softies）、wildstyle 的互咬字與箭頭、雲朵背景、刻意的垂流滴；Martha Cooper & Henry Chalfant《Subway Art》（Thames & Hudson, 1984）、紀錄片《Style Wars》（1983）、電影《Wild Style》（Charlie Ahearn, 1983）是三份定本。

## 設計哲學

噴漆不是「有描邊的字」，是**一套有順序的工序留下的痕跡**。writer 先噴背景雲，再噴字的肚子（fill）並做 fade，然後用一圈 3D 塊把字頂起來，最後才用外框把 fill 噴出界的邊「切」乾淨，點上切光線與星光。順序決定了什麼蓋住什麼：外框永遠在 3D 上面、fill 永遠被外框收邊、overspray 留在外框外面——所以這個風格的網頁也必須**分層建構**，不能用一個漸層文字加 text-shadow 冒充。

第二件事：噴漆一定噴在**某個東西上**。地鐵車廂、鐵捲門、水泥牆、被市府灰漆蓋掉（buff）的補丁。畫面上沒有浮在空中的卡片，所有資訊都「被噴在」或「被貼在」一個表面上。

第三件事：夜。writer 在店家打烊、車廂進場之後工作，光來自路燈。鈉燈橘從上方落下，車燈偶爾掃過。

## 本風格的 5 個不可省略特徵

### ① 一件 piece＝七層，順序不能換

膨圓、互咬、各自傾斜 ±7° 的字母，帶至少一支箭頭；由下而上：背景雲＋泡泡 → overspray 霧 → 3D 塊（單一方向、實心一色＋黑邊）→ 外框（比 fill 寬 1.5 單位）→ 填色 fade → 切光線 → 四角星光。拿掉任何一層就退化成「卡通字」。

```html
<!-- 字形只寫一次，各層用 <use> 換 stroke 疊出 -->
<svg viewBox="-5 -7 60 24" stroke-linecap="round" stroke-linejoin="round">
 <defs><g id="L"><path fill="none" d="M1 0V10M6 0V10M1 5H6"/><!-- …每字一條骨架 --></g></defs>
 <use href="#L" x="1.3" y="1.1" stroke="#17181C" stroke-width="5.1"/>   <!-- 3D 黑邊（逐層位移 1..n） -->
 <use href="#L" x="1.3" y="1.1" stroke="#2FA25A" stroke-width="4.3"/>   <!-- 3D 色 -->
 <use href="#L" stroke="#17181C" stroke-width="4.4"/>                   <!-- 外框 -->
 <use href="#L" stroke="url(#fade)" stroke-width="2.9" filter="url(#spray)"/> <!-- fill -->
 <use href="#L" x="-.62" y="-.62" stroke="#F3EFE4" stroke-width=".42" stroke-dasharray="5 1.6 .4 1.6" fill="none"/> <!-- 切光線 -->
</svg>
```

### ② 噴漆的物理痕跡：顆粒軟邊 fade、overspray、垂流滴

fade 是三帶顏色，帶與帶之間是**有顆粒的軟邊**（硬停點漸層＋feTurbulence 位移），不是平滑向量漸層；外框外留一圈 overspray 霧（模糊＋雜訊遮罩）；字的下緣有垂流滴（細線＋珠頭）。全站唯一允許的「柔和」只有這三種，UI 本身不准有模糊陰影。

```html
<linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="0" y1="-1" x2="0" y2="11">
 <stop offset="0" stop-color="#F6C624"/><stop offset=".28" stop-color="#F6C624"/>
 <stop offset=".38" stop-color="#F08A24"/><stop offset=".62" stop-color="#F08A24"/>
 <stop offset=".72" stop-color="#E5352B"/><stop offset="1" stop-color="#E5352B"/></linearGradient>
<filter id="spray"><feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="2" result="n"/>
 <feDisplacementMap in="SourceGraphic" in2="n" scale=".26" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="halo"><feGaussianBlur stdDeviation="1.1" result="b"/><feTurbulence type="fractalNoise" baseFrequency="2.6" result="t"/>
 <feColorMatrix in="t" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.4 1.7" result="m"/><feComposite in="b" in2="m" operator="in"/></filter>
<!-- 滴 -->
<path d="M12 10.4V13.6" stroke="#E5352B" stroke-width=".5" stroke-linecap="round"/><circle cx="12" cy="13.6" r=".46" fill="#E5352B"/>
```

### ③ 表面就是畫布

一切內容都在一個真實表面上：鍍鋅鐵捲門（硬停點橫肋＋左右導軌＋底部拉桿）、水泥牆（雜訊顆粒）、被 buff 掉的灰色補丁（不規則 clip-path）、貼紙（白紙黑框硬陰影）。沒有圓角卡片、沒有懸浮面板。

```css
--slats:repeating-linear-gradient(180deg,#AEB4B0 0 3px,#8E9592 3px 17px,#636A67 17px 20px,#474D4B 20px 22px);
.shutter{background:var(--slats)}
.shutter::before,.shutter::after{content:"";position:absolute;top:0;bottom:0;width:18px;background:#474D4B;border-inline:3px solid #17181C}
.buff{background:#585C57;color:#F3EFE4;clip-path:polygon(0 2%,7% 0,40% 1.5%,72% 0,100% 2.5%,99% 40%,100% 97%,63% 100%,30% 98%,2% 100%,0 60%)}
.sticker{background:#F3EFE4;border:3px solid #17181C;box-shadow:5px 5px 0 #17181C;transform:rotate(-3deg)}
```

### ④ 兩種字聲：膨字 piece＋簽名 tag

標題是 piece（英文用七層 SVG；中文用粗黑體＋paint-order 外框＋實心 3D text-shadow），簽名是 tag（Permanent Marker 手寫、傾斜 −6°、可加王冠）。正文才用乾淨的 Noto Sans TC。不要第三種裝飾字。

```css
.h3d{font:900 clamp(30px,5vw,58px)/1.08 "Noto Sans TC";color:#F6C624;-webkit-text-stroke:.16em #17181C;paint-order:stroke fill;
 text-shadow:1px 1px 0 #2FA25A,2px 2px 0 #2FA25A,3px 3px 0 #2FA25A,4px 4px 0 #2FA25A,5px 5px 0 #2FA25A,6px 6px 0 #2FA25A,7px 7px 0 #17181C,8px 8px 0 #17181C}
.tag{font:400 30px/1 "Permanent Marker";transform:rotate(-6deg)}
```

### ⑤ 罐色票與夜光

顏色只來自一排**有名字的罐子**（火紅、工地黃、橘、檳榔綠、藍、粉紅、白），底是夜（#17181C）與鍍鋅灰。光只有一種：鈉燈橘從左上落下（multiply＋screen 兩層 radial），偶爾一道車燈掃過。

```css
.lamp{background:radial-gradient(70% 80% at 16% -8%,rgba(242,163,58,.5),rgba(242,163,58,.12) 55%,rgba(23,24,28,.62) 100%);mix-blend-mode:multiply}
.lamp2{background:radial-gradient(50% 60% at 16% -8%,rgba(242,163,58,.35),transparent 70%);mix-blend-mode:screen}
```

## 色彩系統

| 角色 | hex | 用途 | 約略比例 |
|---|---|---|---|
| 夜 night | `#17181C` | 頁底、外框、3D 黑邊、所有線 | 34% |
| 夜二 | `#23252B` | 招牌箱、3D 替代色 | 4% |
| 鍍鋅 zinc | `#8E9592` / `#AEB4B0` / `#636A67` / `#474D4B` | 鐵捲門四階肋 | 24% |
| 水泥 cement | `#B8B3A6` / `#9A9588` | 牆、路緣 | 14% |
| buff 灰 | `#585C57`（白字 6.6:1）／淺 `#A3A69E` | 文字補丁 | 8% |
| 鈉燈 sodium | `#F2A33A` | 燈光、focus ring、小標 | 3% |
| 罐：火紅 `#E5352B`、工地黃 `#F6C624`、橘 `#F08A24`、檳榔綠 `#2FA25A`、藍 `#2E86D1`、粉紅 `#EE6AA7`、白 `#F3EFE4` | | piece fill／3D／雲；按鈕黃 | 合計 ≤13% |

規則：piece 的 fill 用 2–3 罐、3D 用 1 罐、雲用 1 罐，一件 piece 最多 5 罐。不准紫藍漸層、不准任何罐色的淡版（要淡就用「霧」）。

## 字體系統

- **Unbounded 700/800/900**（Google Fonts）：英數價格、計時、motion-library 文字元件。
- **Permanent Marker 400**：tag、簽名、轉場門上的頁名。
- **Noto Sans TC 400/700/900**：正文 16px/1.75；中文標題 900、clamp(30px,5vw,58px)、行高 1.08。
- **Barlow Condensed 600/700**：小標籤 13px、字距 .2em、全大寫。
- 字級：58 / 30 / 22 / 18 / 16 / 13。piece 不是字型，是 SVG（見特徵①）。

## 版面與網格

- 首屏＝一整扇鐵捲門（min-height 74vh），piece 寬 min(1120px,100%) 置中略偏下；貼紙右上旋 −3°、tag 散在左上與右下。
- 內容寬 1180px，左右 clamp(16px,4vw,48px)。
- 區段輪替「門／牆／夜」三種表面，不要連續兩段同表面。
- 傾角：貼紙 −3° 至 2°、buff 補丁 ±1.2°、tag −6°；piece 的字由引擎各自 ±7°。
- 手機 ≤560px：piece 全寬、貼紙轉入文流、導覽變底部四格。

## 元件配方

- **導覽（路緣罐子）**：右下固定一條水泥路緣，站四罐 SVG 噴漆；現用頁那罐的蓋子拔起（translate+rotate 28°）、噴嘴冒三點霧（steps(4) 循環）；hover 罐子傾斜 −6° 上提 6px。≤560px 改底部四格 dock。頁尾另有完整文字連結。
- **按鈕**：黃底黑字 3px 黑框、4px 實心偏移影；按下位移 2px。次要按鈕夜底白框、影子鈉燈橘。
- **卡片**：沒有卡片。用 `.buff`（不規則補丁）或 `.sticker`（白紙＋硬影）。
- **表單**：白紙貼紙上 3px 黑框輸入；同意書勾選必填。
- **頁尾**：夜底、上緣 8px 導軌色、簽名 tag「HOWL × MOCHI」。

## 動效規則

| 種類 | 實作 | 觸發 | 時長／easing | 減少動態 |
|---|---|---|---|---|
| ambient 環境 | 鈉燈閃爍（opacity 以 steps(1) 掉兩下）＋車燈斜光掃過鐵門＋piece 上的滴慢慢長出、星光閃 | 自動 | 閃爍 7.3s 循環；掃光 11s（前 22% 移動）；滴 5.5s cubic-bezier(.5,0,.8,1) | 全部停在最終狀態 |
| input 輸入 | 游標或鍵盤焦點經過 piece 迸出四角星（rAF 節流 55ms） | pointermove／focusin | 0.46s cubic-bezier(.2,1.4,.5,1) | 星光靜態出現 0.38s 後移除 |
| transition 轉場 | 鐵捲門拉下（門上噴目的頁名）→換頁→新頁門拉上 | 站內連結 | 下 0.5s（80% 觸底後回彈 16px）、上 0.7s cubic-bezier(.3,0,.25,1) | 不播放，直接換頁 |
| signature 簽名 | 〈噴一面〉積漆垂流：每 6px 格累積濕度，超過 1.5 生一滴，量越多跑越快越長，耗盡留珠 | 噴罐停留 | 每幀 v=min(2.4,.3+vol·1.1)，vol−=v·.011 | 滴同一幀算完、直接畫成最終長度 |

### motion-library 元件（v1.8.0 @a75f72c）

| 頁面 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 種類 |
|---|---|---|---|---|---|
| index | TXT-B-36 | Ink Bleed | text「巷口藝廊」、primary #E5352B、secondary #17181C、bg #B8B3A6、1.8s、once | 字由長大的漆團遮罩顯影＝漆在牆上暈開；水泥亮底讓字自動取近黑 | transition（一次性） |
| index | BG-A-19 | Bubble Dots | primary #EE6AA7、secondary #F6C624、bg #17181C、9s loop、intensity .8 | 帶白反光點的上升泡泡＝piece 背景泡泡母題（特徵①第一層） | ambient |
| blackbook | TXT-A-36 | Long Shadow | text「BLACKBOOK」、primary #F6C624、bg #17181C、2.2s once | 長出來的實心斜向階梯影＝3D 塊（特徵①），零模糊 | transition |
| paint | TXT-B-18 | Letter Bounce | text「噴一面」、primary #F6C624、bg #17181C、1.6s once | 字落下壓扁回彈＝膨字的彈性 | transition |
| night | BG-B-25 | Circle Pop | primary #E5352B、secondary #2E86D1、bg #17181C、6s loop、density .8 | 彈出的實心圓＝罐色泡泡，墊在營業時間貼紙後 | ambient |

掛載規則（照 ka-to `KT.ml`）：`document.fonts.ready` 後掛；離屏 `destroy()`、回到視窗重掛；一次性元件 `loop:false` 播一次；canvas `aria-hidden`；容器保留原 HTML 標題 `.ml-fb`，掛載成功才視覺隱藏；`prefers-reduced-motion` 時背景 `seek(.35)`、文字 `seek(1)`。開發 Prompt 見 `MotionLib.prompt(id)`。元件不擔任簽名。

## 插畫與圖像風格

全站沒有一張「插畫」：所有圖像都是同一支 piece 引擎（`PIECE.build`）照字串與種子生成的七層 SVG——首屏 THIHMNG、六面客戶門、黑本 37 字母、logo、預約單初稿。字母是骨架＋2.9 單位圓頭筆畫；同字串同種子恆得同一面。

## Logo 與 Favicon 設計指南

- Logo：`MNG` 三字 piece（黃→橘→紅 fade、綠 3D、一支箭頭），招牌箱內 86px 寬，`assets/logo.svg` 含雲與滴的完整版。
- Favicon：32×32 inline SVG data URI：鍍鋅肋紋底＋一個 M 膨字（黑框、綠 3D、黃 fill）。

## Do & Don't

- Do：每個標題都要看得出外框與 3D 的上下關係；資訊用貼紙或 buff 補丁承載；只噴「有同意書的門」——文案要明說合法委託。
- Do：tag 簽在角落，像真的簽名。
- Don't：平滑向量漸層字、模糊 drop-shadow、圓角卡片、霓虹發光。
- Don't：把 piece 當 icon 縮到 24px 以下（改用 tag 或單字母）。
- Don't：鼓勵噴未經同意的牆；不寫「街頭叛逆」腔。
- 去 AI 化：禁紫藍漸層 hero、置中三卡片、emoji icon、Lorem ipsum、EST. 19xx 徽章。

## 頁面骨架範例

```html
<header class="mast">…招牌箱：logo piece＋店名＋電話…</header>
<nav class="curb" aria-label="主選單">…四罐 SVG…</nav>
<main id="main">
 <section class="gate"><div class="shutter hero-sh spark-zone">
   <h1 class="vh">店名＋一句話</h1>
   <aside class="sticker">營業時間…</aside>
   <div class="hero-piece"><!-- PIECE.build({text:'THIHMNG'}).svg --></div>
   <span class="tag">HOWL '99</span>
   <div class="lamp"></div><div class="lamp2"></div><div class="sweep"></div>
 </div><div class="rail"><i></i></div></section>
 <section class="wall"><h2 class="h3d">…</h2><article class="buff">…</article></section>
</main>
<div class="roll" aria-hidden="true"></div>
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況（查證） | fallback |
|---|---|---|---|---|
| SVG `feTurbulence`＋`feDisplacementMap`＋`feComposite`（arithmetic/in） | A 渲染 | 特徵②：fill 的顆粒軟邊、overspray 霧；牆面雜訊 | MDN：Baseline Widely available，2015-07 起各瀏覽器 | 濾鏡不支援時 fill 仍是三帶硬停點、外框照常，只少顆粒 |
| `requestAnimationFrame` 濕度場積分＋Canvas 2D（Float32Array 6px 格、Path2D 遮罩算覆蓋率） | B 動效 | 簽名垂流與〈噴一面〉 | Canvas 2D／Path2D(d)／rAF 長期 Baseline | 無 canvas：`<noscript>` 說明＋黑本與夜班頁完整資訊 |
| URL 狀態序列化 `URLSearchParams`＋`history.replaceState` | E 資料 | 黑本排字台、噴一面結果、夜班帶入估價：`?tag=&s=&f=&d=&est=` 同網址同一面 | MDN：URLSearchParams Baseline Widely available（2018-04） | 無 JS：排字表單以 GET 送出 |

- 其他：`paint-order: stroke fill`（中文膨字外框）不支援時退為 text-stroke 壓在字上，仍可讀；`clip-path` polygon 補丁不支援時為矩形。
- 效能實測（headless Chromium 1194、1280×800）：首屏腳本執行 index 6ms／blackbook 50ms／paint 49ms／night 22ms；rAF 61fps；單頁 109–257KB（含 motion-library 子集約 60KB）。同一畫面同時運轉的 motion-library 元件 ≤1。
- 查證來源：developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap、…/Element/feTurbulence、developer.mozilla.org/en-US/docs/Web/API/URLSearchParams。
