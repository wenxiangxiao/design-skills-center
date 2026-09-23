---
name: california-new-wave-greiman
description: April Greiman and Emigre's early-Macintosh California New Wave (1984–1990) as a web style — 72-dpi bitmap letters scaled by whole pixels next to razor-sharp vector type, layered planes floating over a perspective grid floor with hard cast shadows, pastel planes with primary-colour primitives, tilted multi-axis layering, and MacPaint 8×8 fill patterns as the only shading.
---

# 加州新浪潮 California New Wave — Greiman／Emigre 早期麥金塔數位後現代

## 設計哲學

1984 年一月第一台 Macintosh 上市：512×342、1-bit、72 dpi，MacPaint 只有 38 種 8×8 填充圖樣可以代替灰階。多數設計師把它當玩具。兩群人把它當媒材：

- **April Greiman**（1948–）：堪薩斯市藝術學院畢業後，1970–71 年到巴塞爾 Allgemeine Gewerbeschule 跟 Wolfgang Weingart 與 Armin Hofmann 學習，1976 年移居洛杉磯，1982 年起主持 CalArts 視覺傳達系。她把 Weingart 的「疊層、斜軸、字距極端化」帶到加州陽光底下，再加上錄影與空間：與攝影師 Jayme Odgers 合作的作品（如 1979 年 *WET* 雜誌封面）把字和幾何原形「放」在一個有地平線的空間裡。1986 年 Walker Art Center 的 *Design Quarterly* #133〈Does It Make Sense?〉整份在 Mac 上完成，是桌面出版的宣言。著作 *Hybrid Imagery*（1990）。
- **Emigre**：Rudy VanderLans 1984 年在柏克萊創刊的雜誌；Zuzana Licko 在 Mac 上直接以 72 dpi 格點畫字——Emigre、Oakland、Emperor、Universal（1985）——然後把這些「低解析度」字放大印在高解析度的雜誌上，刻意讓階梯狀的邊露出來。

它為什麼長成這樣：螢幕只有黑白兩色，所以**點陣是黑版**、顏色是印刷時另外加的平色專版（所以只有平色、沒有漸層）；MacPaint 沒有灰，所以**陰影是圖樣**；Weingart 教的是疊層，所以**沒有一條共同的對齊軸**；洛杉磯是錄影、電影與空間的城市，所以**字浮在一個有地板的空間裡**。

本風格三條原則：
1. **兩種解析度同時在場**：粗點陣與銳利向量字必須出現在同一個畫面、最好同一個區塊。只有其中一種就不是這個風格。
2. **版面是空間不是頁面**：每一個元件都有一個深度 z，深度決定它的投影、視差位移與它在動畫中的振幅。
3. **陰影與灰階只能用 1-bit 圖樣**：沒有 blur、沒有 opacity 灰、沒有漸層。

## 本風格的 5 個不可省略特徵

### 1　解析度衝突：整數倍放大的點陣字 × 銳利向量字

點陣字一律以 5×7 格點自繪（本站 EC-72 字面），**只准整數倍放大**（px = 2, 3, 4…），每列連續像素合併為一個矩形。旁邊必須有一行高解析度的無襯線字（Archivo，寬度軸 62–125）形成對比。拿掉點陣就只剩「一般的後現代排版」；拿掉向量字就滑向「8-bit 像素風」。

```js
// 5×7 glyph table → one SVG path, whole-pixel scaling only
function bmPath(t){let d='',x=0;for(const ch of t.toUpperCase()){const g=G[ch]||G['?'];
 for(let r=0;r<7;r++){let c=0;while(c<5){if(g[r][c]==='#'){let s=c;while(c<5&&g[r][c]==='#')c++;
  d+=`M${x+s} ${r}h${c-s}v1h-${c-s}z`;}else c++;}}x+=6;}return {d,w:x-1};}
const px=Math.max(2,Math.floor(hostWidth*0.4/(t.length*6-1)));   // integer!
el.innerHTML=`<svg viewBox="0 0 ${w} 7" width="${w*px}" height="${7*px}" shape-rendering="crispEdges"><path d="${d}"/></svg>`;
```
```css
.cond{font-stretch:62%;font-weight:900;text-transform:uppercase;line-height:.86}   /* 向量字：極窄極粗 */
.thin{font-weight:200;font-stretch:125%;letter-spacing:.5em;text-transform:uppercase} /* 向量字：極寬極細 */
```

### 2　空間中的字：透視格線地板＋浮空原形＋硬投影

畫面下方 34–40% 是一塊有地平線的透視地板（藍灰底、2px 墨線方格），其餘元件都「浮」在它上方，每一件用 0 模糊的實色投影落在它下面。原形只用錐、球、方塊、波浪線四種。

```css
.floor{position:absolute;left:0;right:0;bottom:0;height:40%;perspective:520px;perspective-origin:50% 0;overflow:hidden;background:#A8C6EE}
.floor .plane{position:absolute;left:-60%;right:-60%;top:0;height:260%;transform-origin:50% 0;transform:rotateX(66deg);
 background:repeating-linear-gradient(90deg,#16161D 0 2px,transparent 2px 64px),repeating-linear-gradient(0deg,#16161D 0 2px,transparent 2px 64px)}
.floor::after{content:"";position:absolute;inset:0 0 auto;height:3px;background:#16161D}  /* 地平線 */
.cast{filter:drop-shadow(6px 8px 0 #16161D)}  /* 投影：零模糊 */
```

### 3　粉彩面＋三原色點＋錄影黑

大面積只准三個粉彩（粉紅、薄荷、粉藍）加紙白；三原色（紅、黃、藍）只給原形、按鈕與強調，合計 ≤12%；所有字與線是錄影黑 #16161D。**沒有任何一色的淡版**，也沒有漸層。

```css
:root{--ink:#16161D;--paper:#F4F1EA;--pink:#F5B3C8;--mint:#9EE0CC;--powder:#A8C6EE;--red:#E5342A;--yel:#FFD23F;--blu:#2447D6}
```

### 4　斜軸疊層：沒有共同對齊軸

每個區塊有自己的旋轉角（−7°、−4°、+3°、+6°），互相壓疊；同一行裡混用極窄極粗與極寬極細；字距在 −0.01em 與 0.62em 兩端跳。任何「所有東西靠左對齊一條線」的段落都違規（長文本身除外——長文段落內部維持正常行距與左齊，是區塊在歪，不是字在歪）。

```html
<div class="layer" style="left:6%;bottom:6%;--r:-4deg" data-z="2"><div class="dancer">…</div></div>
<style>.layer{position:absolute;transform:translate(calc(var(--mx)*var(--z)*-9px),calc(var(--my)*var(--z)*-6px)) rotate(var(--r))}</style>
```

### 5　麥金塔母題：8×8 填充圖樣、視窗條紋標題列、螞蟻線選取框、符號碎屑

灰階與陰影只能用 8×8 1-bit 圖樣（點、棋盤、磚、斜線、編織）；資訊框做成 1984 Mac 視窗（橫紋標題列＋關閉方塊）；強調區加上會爬的虛線選取框；畫面散落 + × ○ 小符號。

```css
--pat-dots:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'%3E%3Cpath d='M0 0h1v1H0zM4 4h1v1H4z' fill='%2316161D'/%3E%3C/svg%3E");
.pat{image-rendering:pixelated;background-size:16px 16px}           /* 圖樣也只准整數倍 */
.win>.bar::before{content:"";position:absolute;inset:4px;background:repeating-linear-gradient(to bottom,#16161D 0 2px,transparent 2px 4px)}
.ants{background:repeating-linear-gradient(90deg,#16161D 0 6px,transparent 6px 12px) 0 0/100% 2px no-repeat; animation:ants .6s steps(4) infinite}
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 錄影黑 | `#16161D` | 全部文字、線、投影、點陣、圖樣 | 18% |
| 紙白 | `#F4F1EA` | 長文底、視窗、卡片 | 26% |
| 粉紅 | `#F5B3C8` | 首屏場、卡片 | 18% |
| 薄荷 | `#9EE0CC` | 平面、場 | 14% |
| 粉藍 | `#A8C6EE` | 地板、平面 | 14% |
| 紅 | `#E5342A` | 錐、數字、現用 | ≤5% |
| 黃 | `#FFD23F` | 球、主按鈕 | ≤5% |
| 藍 | `#2447D6` | 方塊正面、focus | ≤2% |

對比：黑對紙白 16.0:1、黑對粉紅 10.4:1、黑對薄荷 12.0:1、黑對黃 12.5:1、黑對粉藍 10.3:1——所有底色都能直接承載正文。紅對黑僅 4.2:1，紅不承載小字；紙白字不放在紅上。

## 字體系統

- 向量字：Archivo（Google Fonts，可變 wdth 62–125、wght 100–900、含斜體）。兩個極端聲部：`62% / 900 / uppercase`（大標，行高 .82–.9）與 `125% / 200 / italic / letter-spacing .5–.62em`（副標）；正文 `100% / 400 / 17px / 1.5`。
- 點陣字：EC-72（本站自繪 5×7，含 A–Z、0–9 與常用標點），倍率 3（小標）、4–5（卡片）、7–11（數字）、14–30（首屏）。
- 字級 scale：12 / 14 / 17 / 22 / 34 / 56 / 92 / 150 / 210px。
- 禁止：等寬字、襯線正文、中間字重（500–700 只給按鈕與小標）。

## 版面與網格

- 12 欄網格只用來「放」區塊，不用來對齊區塊：區塊跨欄後各自旋轉 −7°～+6°，並以負 margin 互壓 10–14px。
- 首屏是一個 stage：高 100svh，下方 40% 是透視地板；元件以百分比絕對定位，每一件有 `data-z`（1–3）。
- 留白：區塊之間 70–120px；區塊內 16–22px。
- 手機 ≤560px：stage 改固定高 760px 的直式構圖，旋轉角減半，原形數量從 4 減為 2–3。

## 元件配方

- **導覽＝MacPaint 工具盤**：左上固定 2×2 格、每格 45px、2px 墨框；圖示是 11×11 點陣；現用頁整格反黑；滑過時格子鋪上棋盤圖樣。下方一列文字清單同步反黑。≤560px 變成底部四格 dock，圖示下加小字。
- **按鈕**：黃底、2px 墨框、`4px 4px 0` 硬影、寬體 800 大寫；hover 反黑；按下位移 2px。
- **視窗**：`.win` 2px 框＋6×8 硬影，22px 橫紋標題列、左側關閉方塊、標題置中白底。
- **卡片**：粉彩底、2px 框、硬影、各自旋轉；右上一個 HI／LO 小方章。
- **表單**：單選做成相連的方格列，選中反黑；不用圓角、不用原生外觀。
- **Footer**：錄影黑底，薄荷小標，右下角一組旋轉 −7° 的巨大粉紅點陣「5678」。

## 動效規則

| 類型 | 做法 | 觸發 | 時長／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 地板格線朝觀者前進；選取框螞蟻線爬行 | 常駐 | 2.2s linear 無限；0.6s steps(4) | 靜止，格線與框線保留 |
| input 輸入 | 游標視差：每層位移 = 游標 × z × 9px／6px | pointermove（rAF 合併） | 70ms linear | 關閉，圖層維持原位 |
| transition 轉場 | Finder 開窗「縮放框」：7 個外框從被點的連結放大到全螢幕再換頁；到站時 5 框向外散去 | 站內連結 | 260ms steps(6)，每框延遲 34ms | 直接換頁 |
| signature 簽名 | 整張海報依使用者排的四個八拍，照合成節拍跳舞（見技術章） | ▶／空白鍵 | 36 拍，118–138 BPM | 圖層不動，計數視窗、動作名、八拍指示照常逐拍更新——資訊零損失 |

曲線一律 `linear` 或 `steps(n)`——這個風格的動畫是一格一格的，不是滑的。禁止 ease-in-out 的漂浮與淡入。

## 插畫與圖像風格

只有四種原形（錐、球、方塊、波浪線）＋點陣字＋填充圖樣。原形 = 平色填滿 + 3px 墨框 + 一半用斜線／棋盤圖樣「上陰影」+ 零模糊投影。沒有照片、沒有人物插畫、沒有圖示庫。需要「圖」的地方放點陣大數字（BPM、價格、日期）。

## Logo 與 Favicon 設計指南

- Logo：薄荷色斜板上一個紅色點陣「8」（下方偏移一個墨色的同形投影）、一枚帶斜線陰影的黃錐、點陣字標「EIGHT COUNT」、下方一行細斜寬體 tagline；底部是透視地板。
- Favicon：12×12 格，粉紅底、下方三格墨色地板、墨色點陣 8、右下紅三角。`shape-rendering="crispEdges"`。

## Do & Don't

**Do**：兩種解析度並置；點陣只用整數倍；每個浮空物件都有投影；灰階用圖樣；區塊各自歪；按鈕和計數視窗像 1984 Mac。

**Don't**：
- 不要讓地板變成 synthwave／蒸汽波：**沒有夕陽、沒有霓虹發光、沒有洋紅青色線、沒有鉻字**——地板是淺色底、墨線、零光暈。
- 不要用像素字寫長文（它是展示字）；不要非整數縮放點陣；不要 blur、opacity 灰、漸層、圓角。
- 去 AI 化禁令：無紫藍漸層、無置中三卡、無 emoji 圖示、無 Lorem ipsum、無「EST. 19xx」徽章。

## 頁面骨架範例

```html
<nav class="palette" aria-label="Pages"><div class="grid">
 <a href="index.html" aria-current="page" aria-label="Floor"><svg viewBox="0 0 11 11"><path d="…11×11 bitmap…"/></svg></a> …
</div><ul class="names"><li class="cur"><a href="index.html">Floor</a></li>…</ul></nav>
<main><section class="stage hero" data-fithost>
 <div class="floor"><div class="plane"></div></div>
 <div class="layer" data-z="1" style="left:5%;top:7%;width:46%;height:44%;--r:-7deg"><div class="dancer" style="background:var(--mint)"></div></div>
 <div class="layer" data-z="2" style="left:8%;top:13%"><div class="dancer"><span class="bm" data-bm="5678" data-fit=".4">5678</span></div></div>
 <div class="layer cast" data-z="3" style="left:53%;top:37%;width:9vw"><div class="dancer"><svg><!-- cone --></svg></div></div>
 <div class="layer" data-z="1" style="left:64%;top:49%"><div class="dancer win"><div class="bar"><b>Count</b></div>…</div></div>
</section></main>
```
`.layer` 負責位置、旋轉與視差（CSS 變數），內層 `.dancer` 留給動畫——兩者分開，transform 才不會互相覆蓋。

## 技術實作與相容性

### 1. SVG 點陣字引擎＋`shape-rendering: crispEdges`＋整數倍（A 渲染層）——承載特徵 1

- 5×7 字表逐列合併為矩形，一個字串一條 `<path>`；倍率由容器寬度算出後 `Math.floor` 成整數，ResizeObserver 不用——resize 去抖 120ms 重算。
- `shape-rendering` 查證：MDN〈shape-rendering〉，Baseline widely available（自 2020-07）。它只是提示；真正保證不糊的是「矩形座標全在整數格點＋整數倍率」，所以即使瀏覽器忽略提示也不會出現半像素。
- `image-rendering: pixelated`（8×8 圖樣背景放大 2 倍）查證：MDN〈image-rendering〉，Baseline widely available（自 2020-01）。
- Fallback：無 JS 時 `.bm` 內的原文以 Archivo 62%／900 大寫顯示，資訊完整；每個點陣都附 `.sr` 文字。
- 實測：40 個點陣字串生成 3.4ms（node）。

### 2. Web Audio API 前瞻排程（D 層／聲音）——承載簽名動效的節拍

- 依 Chris Wilson〈A Tale of Two Clocks〉（web.dev, 2013）：`setInterval` 25ms 輪詢，凡是落在 `currentTime + 0.12s` 以內的拍子就用 `start(t)`／`setValueAtTime(t)` 排定在聲卡時鐘上，主執行緒卡頓不影響節拍。
- 聲音全部即時合成：大鼓（正弦 150→42Hz 指數下滑）、拍手（1.5kHz 帶通噪音，第 2、4 拍）、閉鈸（7kHz 高通噪音，反拍）、貝斯（鋸齒波＋低通包絡，每個八拍換根音）、第 7 拍反拍的雙方波牛鈴＝教練的「換動作」提示；起拍前四聲方波 blip＝「5、6、7、8」。
- 首次發聲一定在使用者按下 ▶／空白鍵之後（自動播放政策）；`AudioContext` 不存在時 `onNoAudio` 直接印卡並以文字說明。

### 3. Web Animations API：`Animation.currentTime` 被音訊時鐘驅動（B 動效與時間軸層）——簽名動效本體

- 每個 `.dancer` 以動作函式 `f(beat, z, side) → [tx, ty, rotate, scale]` 每 1/4 拍取樣，生成一條 36 拍、145 個 keyframe 的 `element.animate(...)`，立刻 `pause()`。之後每個 rAF：`a.currentTime = (ctx.currentTime − (ctx.outputLatency||0) − t0) × 1000`。動畫沒有自己的時鐘。
- 查證：MDN〈Animation: currentTime〉，Baseline widely available（自 2020-03）；MDN〈AudioContext: outputLatency〉為 Baseline 2025 newly available（自 2025-03），舊瀏覽器以 0 代替——畫面最多早到一個輸出緩衝（約 10–40ms），低於可察覺的節拍錯位。
- 深度 z 決定振幅（z=3 的原形比 z=1 的平面動得多），side 決定左右鏡像（開合跳時兩側向外）。
- 實測：9 層 keyframe 生成 2.0ms；每幀只寫 9 個 `currentTime`，零 layout 讀取。

### 效能預算

四頁各 36–48KB（含全部 inline CSS／JS／SVG，未壓縮），遠低於 350KB；首屏 JS（字表＋點陣渲染＋綁定）< 10ms；動畫只動 transform（合成層），目標 60fps。唯一外部資源為 Google Fonts（Archivo）。

### 查證來源

- MDN — Animation: currentTime property：https://developer.mozilla.org/en-US/docs/Web/API/Animation/currentTime
- web.dev — A tale of two clocks：https://web.dev/articles/audio-scheduling
- MDN — AudioContext: outputLatency：https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/outputLatency
- MDN — image-rendering：https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
- MDN — shape-rendering：https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering
