---
name: aldine-shaped-text-incunabula
description: Aldine Renaissance book style after the 1499 Venetian Hypnerotomachia Poliphili — one black ink on laid rag paper, Griffo-style roman with no bold and no italic, paragraphs set into goblet, funnel and object-shaped blocks with twin shape-outside floats, outline woodcuts drawn at the same weight as the type, black-ground foliate initials, signature marks and catchwords.
---

# Aldine 文藝復興書冊・Hypnerotomachia 杯形排版（Aldine Incunabula — Shaped Text）

## 設計哲學

1499 年 12 月，Aldus Manutius 在威尼斯印出 *Hypnerotomachia Poliphili*（《尋愛綺夢》）。作者匿名，三十八章的首字連起來是 POLIAM FRATER FRANCISCVS COLVMNA PERAMAVIT（「法蘭切斯科・科隆納修士深愛波莉亞」）。它被公認為最美的搖籃本之一，美在三件事同時成立：

1. **字**：Francesco Griffo 刻的羅馬體——由 1495/96 年為 Bembo《De Aetna》所刻的字重修而來，大寫更大更輕。1923 年 Monotype 以「Poliphilus」復刻，1929 年 Stanley Morison 以更早的版本做成 Bembo。
2. **圖**：約 168 幅匿名輪廓木刻（花園、拱門、方尖碑、噴泉、凱旋行列），線和字一樣細、一樣黑，空白多、只用平行排線表陰面——圖和字是同一塊版上的同一種墨。
3. **版**：段落不只是矩形。章末收成倒三角漏斗，有些頁把整段字排成高腳杯、花瓶。**形狀先定，字往裡面流**。

那個年代的限制就是規格：手搖木製印刷機、一種黑墨、亞麻碎布紙（看得見簾紋與鏈線）、沒有粗體（粗體要到 19 世紀才普及）、斜體 1500/1501 年才由 Aldus 與 Griffo 首用——所以 1499 年這本書**零粗體零斜體**，層級只靠字級、大寫與字距。

**風格本位的一句話**：一種墨、一種字、形狀先於文字。

與既有條目的分界：Arts & Crafts／Kelmscott（1890s Morris：滿版藤蔓邊框、哥德黑體、密不透風）是 19 世紀對這類書的「追憶」，本條目是源頭——疏、白、輕；明代朱墨套印評點本（兩色、直排、眉批）不同；哥德時禱書（手繪金彩）不同；新活版術（無襯線、不對稱、紅黑）是它的反面。

## 本風格的 5 個不可省略特徵

### ① 形狀先於文字：段落排成杯、漏斗、物件的形（shaped text）

拿掉它就只剩「老書風」。做法：一個固定高度的容器裡放左右兩個 `float`，各寬 50%、高 100%，以 `shape-outside: polygon()` 把文字夾成形狀。中文全形字＝1em，所以「杯寬 n em × 行高 1.7em」下每一行能放幾個字可以算出來，杯高要算好（字數稍少於容量，尖端留白；字數超過容量會溢出，絕不能發生）。

```html
<div class="cupw"><div class="cup" style="--n:30;--h:27.2em;
  --l1:polygon(0% 0%,0% 0%, … ,46% 100%,0% 100%);
  --r1:polygon(100% 0%,100% 0%, … ,54% 100%,100% 100%)">
  <i class="sl"></i><i class="sr"></i><p>段落……</p></div></div>
```
```css
.cupw{container-type:inline-size}
.cup{width:calc(var(--n)*1em);max-width:100%;height:var(--h);margin:0 auto;
  font-size:clamp(11px,calc(100cqi / var(--n)),16.5px);line-height:1.7}
.cup .sl{float:left;width:50%;height:100%;shape-outside:var(--l1)}
.cup .sr{float:right;width:50%;height:100%;shape-outside:var(--r1)}
.cup p{margin:0;text-align:justify;text-align-last:center}
```
剖面函式（e＝該高度左右合計被排除的版寬比例）：高腳杯 `y<.5: .84·(y/.5)^2.2；y<.8: .84；else .84−.36·((y−.8)/.2)^.8`；章末漏斗 `.965·y^1.05`。取 29 個樣本點產生 polygon。

### ② 一種墨：亞麻碎布紙上的單一黑

```css
:root{--paper:#EFE7D4;--ink:#1A1612;--ink2:#5E554A}
body{color:var(--ink);background-color:var(--paper);background-image:
  repeating-linear-gradient(90deg,transparent 0 95px,rgba(26,22,18,.035) 95px 96px), /* 鏈線 */
  repeating-linear-gradient(0deg,transparent 0 3px,rgba(26,22,18,.018) 3px 4px)}   /* 簾紋 */
```
沒有第二色相。灰 `--ink2` 只用在旁註與說明，代表「墨薄的地方」。零漸層填色（紙的書溝陰影除外）、零圓角、零投影卡片、零發光。

### ③ Griffo 式羅馬體：零粗體、零斜體，層級只靠大小、大寫、字距

```css
body{font-family:Cardo,"Noto Serif TC",serif;font-weight:400}
b,strong,h1,h2,h3,th,dt{font-weight:400} em,i{font-style:normal}
.kick,.ch,.la{text-transform:uppercase;letter-spacing:.24em;font-size:12–13px}
```
Cardo（Google Fonts，David Perry 依 Aldine 1495 年字形設計，含希臘字）負責拉丁、希臘、數字；中文用宋體／明體（Noto Serif TC 400）——「宋體」本身就是活字印刷的中文對應物。章名用拉丁大寫（HORTVS、ORIGO……，U 寫作 V）。

### ④ 對開與印刷記號：verso｜書溝｜recto、折標、提示字

每一屏是一個對開：左頁 verso、右頁 recto，內緣窄、外緣與下緣寬（約 1:1:2:2）。頁底中央是折標 signature（`a ii`、`b iii`），右頁右下角是提示字 catchword（下一頁的第一個字，可點）。

```css
.spread{display:grid;grid-template-columns:1fr 1fr}
.pg.vs{padding:5.5% 5% 11% 10%;box-shadow:inset -18px 0 22px -20px rgba(26,22,18,.32)}
.pg.rc{padding:5.5% 10% 11% 5%;box-shadow:inset 18px 0 22px -20px rgba(26,22,18,.32)}
.sigs{position:absolute;bottom:4.2%;left:5%;right:10%;display:flex;justify-content:center}
.cw{position:absolute;right:0;bottom:0;letter-spacing:.2em;text-decoration:none}
```

### ⑤ 輪廓木刻＋黑地藤蔓首字

圖與字同重：1.3px 等粗墨線、白地、陰面只用平行斜排線（右側 35%–92%）、葉子是一筆小弧、紙色填滿（擋住後面的線）。章首是黑地白字的木刻首字，白藤蔓、白細框。

```svg
<!-- 首字 -->
<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#1A1612"/>
 <path d="M4 56c8-14 2-22 10-30s16 0 20-10 14-8 22-12" stroke="#EFE7D4" stroke-width="1.4" fill="none"/>
 <rect x="2.5" y="2.5" width="55" height="55" fill="none" stroke="#EFE7D4" stroke-width=".8"/>
 <text x="30" y="43" text-anchor="middle" font-family="Cardo" font-size="38" fill="#EFE7D4"
   stroke="#1A1612" stroke-width="3" paint-order="stroke">H</text></svg>
<!-- 陰面排線 -->
<path d="M120 40L150 37.6M120 43.4L150 41M…" stroke="#1A1612" stroke-width=".75"/>
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 碎布紙 | `#EFE7D4` | 全站底、木刻填色 | ≈78% |
| 墨 | `#1A1612` | 字、線、首字黑地 | ≈18% |
| 薄墨 | `#5E554A` | 旁註、說明、未選導覽 | ≈3% |
| 紙深 | `#E3D8BF` | 按鈕 hover | <1% |
| 新紙 | `#F8F2E3` | 按鈕底（版面上「另貼的一張紙」） | <1% |

規則：沒有任何彩色。強調＝換成大寫、加字距、加 ❦ 常春藤葉。

## 字體系統

- 來源：Google Fonts `Cardo`（400）、`Noto Serif TC`（400）。不載入任何 700。
- Scale（px）：章名大寫 12–13／旁註 12.5–13.5／正文 16.5（手機 16）／杯形段落依 `100cqi / n` 自動 11–16.5／小標 19／頁標題 44／店名 76。
- 行高 1.7；正文兩端對齊；`hanging-punctuation: allow-end`；杯形段落 `text-align-last:center`。
- 拉丁大寫字距 .24–.4em；中文標題字距 .3em。

## 版面與網格

- 最大寬 1260px 的對開，右側 120px 留給冊目導覽；書溝一條 1px 12% 墨線＋兩側內陰影。
- 頁邊距：verso 上 5.5%／內 5%／下 11%／外 10%；recto 鏡像。
- 對稱、置中是本風格的本體（Hypnerotomachia 的頁面多為中軸對稱），**不要**為了「去 AI 化」硬做不對稱；去 AI 化靠的是杯形段落與木刻。
- 旋轉角度：零。留白：段落之間 0.9em，章之間 26px，形狀尖端的空白不要填。
- ≤760px：對開改單頁直排，verso 在上 recto 在下，以 .6px 線分隔；杯寬仍為 n em，字級隨容器縮到 11px 為止。

## 元件配方

- **導覽（冊目 Registrum）**：右側固定 84px 欄，`REGISTRVM` 標＋三個折標字母（a／b／c）與頁名；現用頁上方出現 ❦（opacity 0→1、旋轉 −30°→0）、字母下一條 16px 刻線。≤760px 落為底部橫列。
- **按鈕（另貼的紙籤）**：`background:#F8F2E3;border:.8px solid ink;outline:.6px solid ink;outline-offset:-5px`（雙線框＝木刻框），文字大寫希臘或中文加字距；hover 換紙深；無圓角無陰影。
- **卡片**：不存在。樹譜條目是「左木刻 110px＋右文字」的格，以 .6px 線分隔。
- **表格（價目）**：無框、點線底線、數字 `oldstyle-nums` 靠右。
- **表單**：滑桿 `accent-color: ink`；`<output>` 用薄墨。
- **頁尾（印房記號）**：置中原創印記＋一行地址；所有資訊置中。

## 動效規則

四種動效全部本站自製，motion-library 元件為額外加成：

| 類型 | 實作 | 觸發 | duration / easing | reduced-motion |
|---|---|---|---|---|
| ambient | 木刻樹冠繞樹幹擺動 ±1.4°；雲 translateX ±15px；兩隻鳥穿過天空 | 常駐 | 樹 6–8.4s ease-in-out alternate；雲 30–46s；鳥 26–34s linear | 全停，畫面完整 |
| input | 〈修剪台〉拖曳樹冠或拉滑桿：木刻樹冠 scaleX 與文字杯 polygon、杯高、價目同幀重算；剪窄時葉片沿拋物線掉落旋轉 | pointer／range | 立即（rAF），葉 0.9–1.6s cubic-bezier(.4,0,.8,.6) | 葉不掉，其餘照常 |
| transition | 翻頁：右頁沿書溝 rotateY 0→−96°（430ms cubic-bezier(.55,0,.75,.4)）換頁，到站接著 −96→−180°（520ms）落到左頁再淡出；〈三個夢〉每一步同樣翻一頁；門扇 scaleX(.1) 打開 | 內部連結／選擇 | 見左 | 直接換頁 |
| signature | **傾注**：段落從滿版矩形，被兩個 shape-outside polygon 擠成杯／漏斗／樹形，字一行行往下流到尖端 | 捲入視窗（scroll-driven）、選擇完成 | `animation-range: entry 5% cover 40%`；fallback 1.9s cubic-bezier(.55,0,.15,1) | 直接是最終形狀 |

自我限制：不用淡入當主打、不用彈跳、不用計數動畫；所有動效都是「紙與墨會做的事」。

### motion-library 元件（1.37.0 @b655b9df）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| TXT-B-36 | Ink Bleed | index | text「夢園」、colors {primary #1A1612, secondary #5E554A, bg #EFE7D4}、duration 2.2、loop:false、seed 1499、16:9 | 店名由墨點暈開長成——手搖印刷機上墨落在碎布紙的瞬間；單一墨色、無發光 | transition（一次性） |
| BG-A-11 | Parallel Curves | index（TEMPVS 章） | 同色票、duration 9、density .9、intensity .7、seed 1983 | 起伏的平行線＝木刻天空與風的刻線；純 stroke、無圓角無發光；裁成 96px 刻線帶 | ambient |
| TXT-B-16 | Circle Text | trees | text「FESTINA·LENTE·」、duration 2.4、loop:false、seed 1501、1:1 | Aldus 印房格言繞成羅馬錢幣式圓章（Aldine 海豚錨印記的格言） | transition（一次性） |
| TXT-A-02 | Letter Sequence | dream | 每一步換 text（第一夢…/夢醒…）、duration 1.6、loop:false、seed 1467 | 夢的章名逐字升起，像排字工一個字一個字放進排字盤；每一步重播 | input／transition |
| BG-A-29 | Topo Lines | dream（夢醒後） | duration 10、density .8、intensity .8、seed 1499 | 維納斯之泉的水紋（Poliphilo 在泉邊與 Polia 重逢）；只有線、零漸層 | ambient |

建置期處理（唯一修改）：元件庫文字元件預設字族是 Unbounded（無襯線）、字重 800，違反特徵③，故在 `ml-embed` 子集上把 `FAM.sans` 換成 `"Cardo","Noto Serif TC",serif`、預設字重換成 400，再以 terser 壓縮，`tools/ml-smoke.js` smoke ok。開發 Prompt 出處：`MotionLib.prompt(id)`。掛載包裝：等 `document.fonts.ready`、離屏 `destroy()`、一次性元件播一次後停最後一格、canvas `aria-hidden`、容器內 `.ml-fb` 標題掛載成功才視覺隱藏。

## 插畫與圖像風格

- 技法：**阿爾定輪廓木刻 aldine-outline-woodcut**。等粗 1–1.4px 墨線、紙色填滿、陰面平行斜排線、葉子一筆小弧、天空上密下疏的水平刻線、雲是扇貝輪廓。
- 所有造型樹由同一支剖面函式產生——**畫樹的輪廓與排字的杯形是同一條曲線**。
- 母題：拱門（拱石放射線、刻字門楣 tabula）、古典甕（口緣、凹槽、足）、造型樹（球、杯、錐、塔、螺、柱）、遠山、石牆。
- 禁：照片、漸層上色、陰影、透視寫實渲染、扁平向量插畫。

## Logo 與 Favicon 設計指南

- Logo：雙圈印記，外圈沿圓刻 `BĀNG-HN̂G · HORTVS · SOMNII · TIANVEI · MCMLXXII`，中央一棵杯形木刻樹，下方「夢園」。用法同 Aldine 的海豚錨印房記號：放在頁尾與版權頁，不放在頁首。
- Favicon：32×32 墨底、紙色高腳杯剪影（與首字同一套黑地白形）。

## Do & Don't

**Do**
- 先決定形狀再寫字；寫完一定算容量。
- 章末收成漏斗；版權頁也收成漏斗。
- 層級只用大寫、字距、字級、❦。
- 圖與字同一種墨、同一種粗細。
- 首字可藏離合詩（本站 H·O·R·T·V·S＝hortus）。

**Don't**
- 不要粗體、不要斜體、不要第二色相（紅色朱筆是後人的，不是 1499 年的）。
- 不要圓角卡片、模糊陰影、紫藍漸層、置中三卡片、emoji、Lorem ipsum、「EST. 19xx」。
- 不要讓杯形段落溢出（字多於容量時，加高杯或刪字）。
- 不要把哥德黑體當成「古書」——Aldine 是羅馬體。
- 不要用滿版藤蔓邊框（那是 1890 年代 Kelmscott，不是 1499）。

## 頁面骨架範例

```html
<nav class="reg" aria-label="冊目 Registrum"><b class="rt">REGISTRVM</b><ul>
 <li><a href="index.html" aria-current="page"><span class="hd">❦</span><span class="sig">a</span>卷首</a></li>
 <li><a href="trees.html"><span class="hd">❦</span><span class="sig">b</span>樹譜</a></li></ul></nav>
<main><section class="spread">
 <div class="pg vs"><figure><svg class="wc">…輪廓木刻…</svg><figcaption>HORTVS SOMNII</figcaption></figure>
  <div class="sigs"><span class="sg">a i</span></div></div>
 <div class="pg rc"><p class="kick">SOMNIVM · HORTI</p><h1>夢園</h1>
  <div class="cupw"><div class="cup" style="--n:30;--h:…;--l1:…;--r1:…"><i class="sl"></i><i class="sr"></i><p>……</p></div></div>
  <article class="cap"><span class="ini">…H…</span><h3><span class="la">HORTVS</span>園</h3><p>……</p></article>
  <div class="sigs"><span class="sg">a ii</span><a class="cw" href="trees.html">樹譜</a></div></div>
</section></main>
```

## 技術實作與相容性

### 1. CSS Shapes `shape-outside: polygon()`＋多邊形補間（C 版面與樣式層）
- 承載：特徵①與 signature。兩個 float 的 polygon 由 29 個樣本點組成；補間起點是同頂點數、e 全為 0 的矩形。
- 支援：MDN〈shape-outside〉Baseline Widely available（2020-01 起）；MDN〈basic-shape〉：兩個 polygon 須同 fill-rule、同頂點數才能補間，`shape-outside` 的 animation type 為「as specified for basic-shape」。WPT `css-shapes/animation/shape-outside-interpolation.html` 覆蓋此行為。
- Fallback：不支援 shapes 的瀏覽器文字照矩形排、字一個不少；容量依舊夠（矩形容量最大）。
- 容量演算：每行取該行上下緣之間 e 的最大值、可用寬取整成字數，求最少行數；字數估計 ×1.08＋3 作安全餘量（避頭尾、兩端對齊）。

### 2. CSS scroll-driven animations `animation-timeline: view()`（B 動效與時間軸層）
- 承載：signature 的觸發——段落捲入視窗 5%→40% 的過程中由矩形傾注成形，捲回去會倒流。
- 支援：Chrome／Edge 115+；Safari 26.0（WebKit〈Features in Safari 26.0〉）；Firefox 159 預設啟用（web.dev〈New to the web platform in October 2026〉）。caniuse〈animation-timeline: view()〉。
- Fallback：`@supports (animation-timeline:view())` 包住；不支援時 JS 以 IntersectionObserver 加 `.on`，改用 1.9s `transition: shape-outside`；無 JS 時直接是最終形狀。

### 3. Pointer Events＋setPointerCapture（D 輸入與感測層）
- 承載：input——修剪台拖曳樹冠；同時有 `<input type=range>` 鍵盤替代。拖曳期間加 `.nt` 關掉 shape-outside 過渡，讓文字同幀重排。
- 支援：MDN Pointer Events Baseline Widely available。

### 效能
- 每頁 inline 全部資源：index ≈266KB、trees ≈292KB、dream ≈279KB（位元組，≤350KB）；其中 motion-library 子集經 terser 壓縮後 ≈171KB。
- 首屏 JS：shape-core＋site 共約 5KB，只做讀時間與綁事件；polygon 與杯高全部建置期算好寫進 HTML。
- 同一畫面同時運轉的 motion-library 元件 ≤2；離屏 destroy。
- 驗證方式：`node --check` 逐段、jsdom 走完三個夢與修剪台、`tools/ml-smoke.js` smoke ok。本輪排程環境無法啟動實體瀏覽器量測 fps，shape-outside 動畫屬 layout 動畫，段落短（≤220 字）時重排成本在 1ms 量級。
