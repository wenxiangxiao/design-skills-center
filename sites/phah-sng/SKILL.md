---
name: pintori-olivetti-corporate-modernism
description: Italian corporate modernism after Giovanni Pintori's Olivetti publicity (1950–1967) — numerals and letters scattered as the image itself, square/circle/bar key modules, six flat inks on white, a tiny lowercase wordmark in a corner, and thin ink trajectories of mechanical motion.
---

# Pintori／Olivetti 企業現代主義平面 Pintori-Olivetti Corporate Modernism

> 範例站：`sites/phah-sng`（打算事務機器行・臺北博愛路的打字機與加算機店，虛構）
> 流派血緣：既有流派（型錄「現代主義與構成」2026-10-28 新增條目），非自創。

## 1. 設計哲學

1936 年 Adriano Olivetti 把 Sardinia 出身的 Giovanni Pintori（1912–1999）聘進伊夫雷亞（Ivrea）總部的廣告與發展辦公室，1950 年起他擔任美術指導直到 1960 年代末。1952 年紐約 MoMA 為 Olivetti 辦展，稱它把「一家工業的所有視覺面向，統一在單一的高標準品味之下」。1954 年 5 月，Olivetti 在紐約第五大道 584 號開展示間，把一台 Lettera 22 手提打字機用螺栓固定在人行道的台座上讓路人隨意打，不到一年約有五萬人停下來打過字。

Pintori 的海報要賣的是**看不見的東西**——計算、記帳、速度、精確。他的解法不是畫機器，而是**畫機器處理的東西**：數字與字母。Elettrosumma 22（約 1958）把彩色數字排成螺旋；Lettera 22 的幾張海報裡，機器常常只占一個角落，剩下的是白、是一陣彩色字屑、是幾條細線劃出的運動。當時的製作條件決定了長相：平版／絹印的專色、每色一版，所以是**平塗、不疊漸層**；照相排字還貴，所以字母常是畫出來、剪出來、一顆一顆擺的；企業識別剛成形，品牌名是**小寫無襯線**、小、放在不打擾畫面的位置。

一句話：**讓字自己變成圖，讓機器退到角落，讓白紙撐住一切。** 它比瑞士國際主義更愛玩、比包浩斯更少教條、比 Memphis 更克制。

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「一般的乾淨網站」或別的流派。

### ① 字即圖（numerals as image）
數字與字母不是標題，是**主視覺本身**：同一套無襯線（本站 Archivo 可變字型）、多色、多字級、多字寬，沿螺旋或流線灑開。每個字的顏色、字級、字寬由「字＋序號」雜湊決定，所以同一串字永遠長成同一張圖。

```css
.nums span:nth-child(6n+1){color:#E2231A}.nums span:nth-child(6n+2){color:#1D4FA3}
.nums span:nth-child(6n+3){color:#F0A21A}.nums span:nth-child(6n+4){color:#2F8F4E}
.nums span:nth-child(6n+5){color:#F29BB0}.nums span:nth-child(6n){color:#161514}
.yr{font:900 clamp(56px,30cqi,120px)/.9 "Archivo";font-variation-settings:"wdth" 72}
```
```js
// 黃金角螺旋：第 i 個字落在 r=s·√(i+k)、θ=i·137.508°
const pos=(i,c)=>{const r=c.s*Math.sqrt(i+2.2),a=i*2.399963;return [c.cx+r*Math.cos(a),c.cy+r*Math.sin(a)];};
```

### ② 方、圓、條三種模組（key modules）
一切圖形只有**正方形、正圓、短條**，以鍵距般的節奏排列——它們就是打字機的鍵、加算機的轉盤、紙帶的孔。方塊零圓角；圓就是正圓。按鈕、清單符號、段落頭、插畫全部用這三種形狀組成。

```css
.key::before{content:"";width:14px;height:14px;background:#E2231A;transition:border-radius .18s}
.key:hover::before{border-radius:50%}          /* 方變圓：本站唯一允許的「圓角」 */
.mods i{width:9px;height:9px;display:block}.mods i:nth-child(2n){border-radius:50%}
```
```svg
<rect x="232" y="364" width="136" height="72" fill="#2F8F4E"/><circle cx="300" cy="380" r="4.2" fill="#F7F5EF"/>
```

### ③ 白地＋六色平塗
大面積永遠是白（#F7F5EF）；顏色只出現在**小面積**（每塊不大於一顆鍵帽或一個字），合計 ≤25%。紅 #E2231A、鈷藍 #1D4FA3、赭黃 #F0A21A、綠 #2F8F4E、粉 #F29BB0、墨 #161514。**零漸層、零陰影、零透明、零發光**——每一色就是一塊印版。

```css
:root{--paper:#F7F5EF;--ink:#161514;--red:#E2231A;--blu:#1D4FA3;--och:#F0A21A;--grn:#2F8F4E;--pnk:#F29BB0}
body{background:var(--paper)} /* 禁止 linear-gradient、box-shadow、opacity<1 的色面 */
```

### ④ 小寫字標＋大留白
品牌名**全小寫**無襯線、粗但小（本站 24px），放在角落或海報左下；主圖偏心，畫面 ≥40% 留白。說明文字靠底對齊、字級小。不用大標題 hero——最大的東西是字屑與機器。

```html
<a class="wm" href="index.html"><b>phah-s<i>ǹ</i>g</b><span>打算事務機器行・博愛路 1957</span></a>
```
```css
.wm b{font:700 24px/1 "Archivo";letter-spacing:-.01em}.wm b i{font-style:normal;color:#E2231A}
```

### ⑤ 細線軌跡
1.5px 墨線與點列畫出**機構的運動**：字飛出去的路徑、紙帶、回車桿、地圖上的步行路線。細線從色塊引出、連到下一個色塊，永不成框、永不加粗。

```svg
<polyline data-trail fill="none" stroke="#161514" stroke-width="1.5" stroke-linejoin="round" points="300,298 212,240 188,262 …"/>
<line x1="226" y1="352" x2="204" y2="336" stroke="#161514" stroke-width="1.5"/><circle cx="202" cy="334" r="4.5" fill="#F0A21A"/>
```

## 3. 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 白紙 paper | `#F7F5EF` | 頁面與海報地 | ~60% |
| 白 sheet | `#FFFFFF` | 打字紙、紙帶、卡片、表單 | ~12% |
| 墨 ink | `#161514` | 正文、1.5px 細線、機器底座 | ~14% |
| 紅 rosso | `#E2231A` | 現用態、總計＊、強調鍵、旋鈕 | ~4% |
| 鈷藍 blu | `#1D4FA3` | 次要鍵、地鐵記號、時間戳 | ~3% |
| 赭黃 ocra | `#F0A21A` | 回車桿、清除鍵、按下態 | ~3% |
| 綠 verde | `#2F8F4E` | 機身（淡綠打字機）、營業中 | ~3% |
| 粉 rosa | `#F29BB0` | 打字紙邊線、第五色 | ~1% |

規則：同一個小區塊不放兩個相鄰同色模組；顏色用「循環」分配（nth-child 6n），不按語意塗滿區塊。紅只給「現在／總計」。

## 4. 字體系統

- **Archivo**（Google Fonts，可變 wdth 62–125、wght 400–900）：字標、數字、拉丁小標。數字一律 `font-variant-numeric:tabular-nums`。
- **Noto Sans TC** 400／500／700／900：中文正文與標題。
- **JetBrains Mono** 500–700：打字機打出來的字、加算機紙帶（只在「機器印出來的東西」上用）。

| 層級 | 規格 |
|---|---|
| H1 | Noto Sans TC 900，clamp(34px,4.6vw,56px)，字距 .04em |
| H2 | 900，clamp(26px,3.4vw,38px)，最大 18em 寬 |
| H3 | 700，19px |
| 小標 kick | Archivo 600 13px **小寫**，前置 `.mods` 方圓模組 |
| 正文 | 16px／1.8；說明 13px／1.7 |
| 年份與型號 | Archivo 900，wdth 64–72，容器單位 cqi |

## 5. 版面與網格

- 非對稱兩欄：首屏 1.32fr（海報）: 1fr（資訊），資訊欄靠底對齊（`align-items:end`）。
- 外邊距 `--gut: clamp(16px,4vw,56px)`；段距 clamp(56px,9vw,120px)。
- 分隔只用 1.5px 墨線（上緣或下緣一條），不用整框卡片；需要框時是一張「紙」（白＋1.5px 墨框）。
- 零旋轉；所有斜度只發生在字屑螺旋裡。
- ≤860px 單欄；≤560px 鍵與表格縮欄，紙帶導覽攤成三欄。

## 6. 元件配方

- **紙帶導覽（tape-total）**：加算機紙帶——白條、左右 1.5px 墨線、下緣鋸齒（clip-path 16 齒）。每列＝金額欄＋頁名＋符號；一般頁印「+」，hover 印「◇」（小計），現用頁整列紅字、符號「*」（總計）。`view-transition-name:tape` 換頁時不動。
- **鍵 `.key`**：白底、1.5px 墨框、左側 14px 色方塊；hover 方塊變正圓；按下 translateY(2px)。四色變體 `--c`。
- **清單 `.svc`**：每列一個色模組（奇數方、偶數圓）＋文字＋右對齊 Archivo 金額。
- **卡片 `.mc`**：白紙、上半是小海報（機器插圖＋年份字屑），下半文字；`container-type:inline-size`，卡片寬 ≥520px 自動左右排版、≤250px 收掉說明。
- **紙 `.sheet`**：白、1.5px 墨框、左側粉紅邊線、JetBrains Mono 行高 2；右上一顆赭黃圓＝鈴。
- **頁尾**：上緣一條墨線、六色模組條（方圓相間）、三欄資訊、建置模型列。

## 7. 動效規則

| 種類 | 本站自製實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 首頁閒置 5 秒後機器自己打店裡的句子（每 900ms 一字），字飛入螺旋 | 時間 | 900ms 間隔 | 停用；預排的 112 個字照常在 |
| input 輸入 | 任何按鍵→字從打字紙飛進螺旋、對應的鍵亮紅 130ms、滑架左跳 2px、24 字一次回車（旋鈕亮赭黃）；機器卡 hover 鍵依序按下；十鍵實體鍵與畫面鍵同步閃 110ms | keydown／pointerdown | 飛行 560ms cubic-bezier(.2,.75,.25,1)；鍵 steps(2) | 字直接出現在格位，不飛 |
| transition 轉場 | 跨頁「送紙」：舊頁往上捲出、新頁從下送入，字標與紙帶不動（cross-document View Transitions）；機器篩選用同文件 View Transition | 導覽／點按 | 420ms cubic-bezier(.6,0,.3,1) | `@view-transition{navigation:none}`、篩選直接切換 |
| signature 簽名 | **打字成圖**：你按下的每一個字，照順序落進黃金角螺旋的下一格，顏色／字級／字寬由「字＋序號」雜湊決定，一條 1.5px 墨線連著最後九個字——海報是你打出來的 | 鍵盤輸入 | 同 input | 字直接落格，資訊零損失 |

自我限制：不用淡入捲動揭示、不用視差；所有動作都是「機器在動」——按鍵、滑架、紙往上送。

### motion-library 元件表（`wenxiangxiao/motion-library` 1.20.0 @e45c261f，`tools/ml-embed.js` 子集 inline）

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-05 | Spiral Dots | 首頁海報底 | colors {primary #161514, secondary #E2231A, bg #F7F5EF}, duration 40, density .55, intensity .6, seed 1957, 4:5 | ambient | 黃金角點陣緩轉，是字屑螺旋的「底版」——Pintori Elettrosumma 的螺旋母題；純圓點、平塗、零漸層 |
| TXT-A-27 | Typewriter | 首頁「門口那台」 | text「請隨意打一行字。」, primary #E2231A, bg #F7F5EF, duration 2.4, loop false（一次性）, 16:9 裁切 | transition（進視窗打一次） | 等寬字逐字出現＋紅色游標方塊；淺底得到近黑字色 |
| SHP-12 | Split & Merge | 機器頁「拆開，再裝回去」 | primary #1D4FA3, secondary #F0A21A, bg #F7F5EF, duration 2.6, loop, 1:1 | ambient | 四塊正方形拆開又合回——修理流程的抽象；只有 fillRect，零圓角 |
| BG-A-07 | Random Pop Dots | 機器頁價目帶 | primary #E2231A, secondary #1D4FA3, bg #F7F5EF, duration 5, density 1.1, intensity .8, seed 1958, 16:9 裁成 70–110px 帶 | ambient | 彩色圓點彈出又縮回，像字屑落在價目表上；正圓、平塗 |
| TXT-A-29 | Counter | 十鍵頁結果 | text「<總和> 元」, primary #E2231A, bg #F7F5EF, duration 1.8, loop false, 16:9 裁切 | transition（結果出現時數到總和） | 加算機打出總計的那一下；等寬數字＋紅色進度線 |

開發 Prompt 出處：`MotionLib.prompt('<ID>')`。掛載一律經 `PS.ml`：等 `document.fonts.ready`、IntersectionObserver 進視窗才掛、離屏 `destroy()`、canvas `aria-hidden`、容器保留 `.ml-fb` HTML 標題，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。已知取捨：SHP-12 的 `softGrid` 會畫一層 6% 墨色方格紙底，視同「方格紙」接受。

## 8. 插畫與圖像風格（pintori-module-kit）

機器由 `rect`／`circle`／`line` 三種原語組成，不畫輪廓、不畫透視：
- 手提打字機：白紙（白＋墨框＋三條字行線）→ 墨色滑架條＋兩顆紅旋鈕 → 機身色塊 → 4 排白圓鍵（10/10/9/8，每排右移 1/4 鍵距）→ 白空白鍵 → 墨底座＋兩個方腳。
- 加算機：紙帶直條＋墨色紙捲圓＋十鍵 3×4 白圓＋紅色長「+」鍵＋右側搖柄（細線＋紅圓）。
- 手搖計算機：八個白圓轉盤（內寫數字）＋八條白槽與紅色撥桿。
- 年份／型號以 Archivo 900 疊在插圖左上，每位數一色。

## 9. Logo 與 Favicon

- Logo（`assets/logo.svg`）：五個模組（方紅、圓黃、方藍、圓綠、方粉）一列＋小寫字標「phah-sǹg」（ǹ 為紅）＋1.5px 墨線＋中文店名小字。
- Favicon：32×32，白地上四格——左上紅方、右上黃圓、左下藍圓、右下綠方。不放字。

## 10. Do & Don't

**Do**：讓數字當主角；機器縮到角落；字標小寫；色只出現在小塊；所有線 1.5px；用「機器在動」的動效（鍵按下、滑架、送紙）。
**Don't**：漸層、陰影、玻璃、發光；圓角卡片（rounded-2xl）；大標題 hero＋兩顆按鈕＋三卡片；紫藍漸層；emoji icon；Lorem ipsum；EST. 19xx 徽章；把品牌名寫成大寫；把顏色塗滿大區塊（那是 Memphis 或包浩斯）；斜放的色塊（那是構成主義）。

## 11. 頁面骨架範例

```html
<header class="hd">
 <a class="wm" href="index.html"><b>brand<i>.</i></b><span>中文店名・地點 年份</span></a>
 <nav class="tape" aria-label="主選單"><ol>
  <li><a href="index.html" aria-current="page"><span class="v">1,957</span><span class="t">首頁</span><span class="s"></span></a></li>
  <li><a href="b.html"><span class="v">8</span><span class="t">第二頁</span><span class="s"></span></a></li>
 </ol></nav>
</header>
<section class="hero">
 <figure class="poster"><!-- 4:5，container-type:inline-size；svg 內 <g data-glyphs> 放字屑、<polyline data-trail> 放細線、角落放機器與小寫字標 --></figure>
 <div class="info"><p class="kick"><span class="mods"><i></i><i></i><i></i></span>lowercase kicker</p><h1>店名</h1><p class="lede">…</p><a class="key" href="#">主要動作</a></div>
</section>
```

## 12. 技術實作與相容性

1. **CSS container queries＋容器單位 cqi**（C 版面層；最近 6 站未出現）：海報、十鍵、年份與機器卡都是查詢容器——鍵的字級 `9cqi`、間距 `3.2cqi`，年份 `30cqi`，機器卡在自身寬 ≥520px 時改左右版、≤250px 收掉說明。承載特徵①④：不論卡片被放在幾欄裡，字屑與留白比例不變。查證：web-platform-dx〈Container queries〉列為 Baseline Widely available（2025-08-14）；容器長度單位 Chrome／Edge 105+、Safari 16+、Firefox 110+（caniuse `mdn-css_types_length_container_query_length_units`）。fallback：找不到容器時 cq 單位退回小視窗單位（svi／svb），版面仍成立。
2. **跨文件 View Transitions `@view-transition{navigation:auto}`**（B 動效層；最近 6 站未出現）：承載 transition——「送紙」；字標與紙帶設 `view-transition-name`，換頁時留在原地。機器篩選另用同文件 `document.startViewTransition()`，每張卡 `view-transition-name:mcN`。查證：Chrome／Edge 126+；Safari 18.2+（另有資料寫 26.2）；Firefox 標示部分支援／未支援（caniuse〈cross-document-view-transitions〉、web-platform-dx）。fallback：不支援時就是一般換頁；`prefers-reduced-motion` 時以 `navigation:none` 關閉；篩選在不支援時直接切 `hidden`。導覽超過 4 秒 Chrome 會跳過轉場。
3. **鍵盤為主要操作：`KeyboardEvent.code`**（D 輸入層）：十鍵頁同時收 `Digit0–9` 與 `Numpad0–9`、`NumpadAdd`／`NumpadEnter`／`Enter` 加總、`Backspace` 退格、`Escape`／`NumpadDecimal` 清除；首頁收任何可列印字元（`e.key.length===1`），輸入法以 `compositionend` 取字、忽略 `insertCompositionText` 避免重複。畫面十鍵用 `pointerdown`（不等 click 的 300ms）。承載 signature 與 func。fallback：觸控裝置用畫面鍵與「打一行」輸入框。

另：**FNV-1a／xorshift32 決定性雜湊**——字的顏色字級字寬、今天的紙帶（以臺北日期為種子）、分享連結 `?d=` 重排同一張海報。

**效能實測**：index 258KB、machines 259KB、ten-key 239KB（含約 200KB motion-library 子集），皆 <350KB。jsdom 實測首頁腳本初始化（112 個預排字＋格位計算約 300 格）<10ms；單次加字為一次 `createElementNS`＋一段 WAAPI，<1ms。同一畫面運轉中元件 ≤1 個（首屏只有 BG-B-05）。字飛行用 transform，無 layout thrash。
