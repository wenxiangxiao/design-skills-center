---
name: crt-phosphor-xy
description: CRT phosphor web style — the whole page is a lit tube face set in an instrument bezel, every element is emitted light in one phosphor hue graded only by brightness, everything glows with a core plus halo, nothing fades in but everything decays out (instant on, exponential off), and display type is drawn by a stroke-vector character generator the way a vector CRT or oscilloscope beam draws it.
---

# CRT 磷光 CRT Phosphor —— 風格規格書

> 範例站：餘暉示波 YUHUI SCOPE ROOM（臺北光華商場後巷的示波器維修室，每週五放示波器音樂）。本規格書與產業無關：電子音樂廠牌、獨立遊戲、天文台、夜間電台、科技博物館、復古電腦社群、黑膠行、任何「光是被激發出來的」品牌都能套用。

## 設計哲學

CRT 的畫面不是印出來的，是**電子束打在磷光層上、被激發出來的光**。這一句話決定了整個流派：

- 光只有一種顏色——由管子裡塗的磷光粉決定（P31 綠、P1 綠、P7 藍轉黃綠、P4 白）。設計師不能「選色」，只能選亮度。
- 光會溢出：玻璃與磷光層讓每一個亮點都帶一圈暈（halation）。
- 光會留下來：磷光被激發後不會立刻熄滅，而是指數衰減（persistence）。所以 CRT 上的東西**出現是瞬間的，消失是慢的**——這和網頁預設的「淡入」恰好相反。
- 光在玻璃後面：管面是凸的、四角是圓的、邊緣比較暗、有掃描線，外面還套著一圈機殼。
- 字是機器畫的：終端機用字元 ROM 的點陣字，向量顯示器與示波器用筆畫向量字——光束一筆一筆走。

歷史參照：DEC PDP-1 Type 30 顯示器的 P7 雙層磷光（亮藍短閃＋黃綠長尾，1962 年〈Spacewar!〉就跑在上面）；Ben F. Laposky 1950 年起以示波器作畫、1953 年在愛荷華 Sanford Museum 展出〈Electronic Abstractions / Oscillons〉；Tektronix 類比示波器的 P31 綠管；1980 年代綠色／琥珀色單色終端機；以及今天的示波器音樂（Jerobeam Fenderson：立體聲左聲道推 X、右聲道推 Y）。與館內鄰近條目的分界：**Glitch Art** 模擬的是數位位元錯誤、明文不模擬顯示裝置；**ANSI Art** 的限制來自檔案格式、禁止輝光與掃描線；**Teletext** 是 7 色 40 欄馬賽克；**8-bit 像素** 是自由像素畫布。本流派的主角正是**顯示裝置本身的物理**。

## 本風格的 5 個不可省略特徵

### 1. 單一磷光色：只能選亮度，不能選顏色

一支管子＝一種色相。全站所有「亮的東西」都是同一個綠的 5 個亮度階，背景是**未點亮的管面玻璃**——綠灰色，絕對不是 #000。唯一的例外是 P7 這類雙層磷光：藍閃＋黃綠尾，那是物理，不是配色。機殼（管子外面）可以有灰色與絲印白，但機殼永遠不進入管面。

```css
:root{
  --glass:#0B1310;  /* 未點亮的玻璃：綠灰 */
  --p0:#E9FFF1;     /* 過驅核心：只給最亮處 */
  --p1:#9BFFC4;     /* 高亮：標題、現用、焦點 */
  --p2:#4BE38A;     /* 正常：正文 */
  --p3:#23A35C;     /* 低亮：次要、標籤 */
  --p4:#145C35;     /* 鬼影：刻度、分隔線 */
  --halo:rgba(75,227,138,.42); --halo-far:rgba(75,227,138,.16);
}
body{background:#23262A}        /* 機殼 */
.tube{background:radial-gradient(ellipse 75% 70% at 50% 46%,#10201A,var(--glass) 58%,#070C0A)}
```
拿掉它：只要畫面上出現第二個色相（紅色警告、藍色連結），就變回「暗色主題網站」。警告用反白，連結用高亮階。

### 2. 輝光：每一個亮的東西都有核心＋兩層暈

不是投影、不是外框，而是光從核心往外溢。文字、線條、按鈕、游標一律如此；**沒有任何硬邊陰影**。

```css
.glow{color:var(--p1);text-shadow:0 0 1px var(--p0),0 0 7px var(--halo),0 0 22px var(--halo-far)}
.vec{filter:drop-shadow(0 0 2px var(--p2)) drop-shadow(0 0 9px var(--halo))}
/* canvas：同一條路徑描兩次——寬而淡的暈，細而亮的核心 */
ctx.globalCompositeOperation='lighter';
ctx.lineWidth=7*dpr; ctx.strokeStyle='rgba(75,227,138,.13)'; ctx.stroke(p);
ctx.lineWidth=1.7*dpr; ctx.strokeStyle='rgba(75,227,138,1)';  ctx.stroke(p);
```
拿掉它：剩下的是「綠字黑底」的命令列截圖，不是 CRT。

### 3. 餘暉：立即亮、指數暗

全站動效的唯一時間規則：**亮起來是 0ms，暗下去走指數衰減曲線**。所以 hover 進入不設 transition、離開才有；canvas 每幀用 `destination-out` 扣掉一定比例而不是清空；移動的東西一律拖尾。禁止淡入、禁止 ease-in-out 的對稱漸變。

```css
:root{--decay:cubic-bezier(.05,.7,.1,1)}            /* 指數衰減近似 */
.btn{transition:background-color .55s var(--decay),color .55s var(--decay)}
.btn:hover,.btn:focus-visible{transition:none;background:var(--p2);color:var(--glass)}
```
```js
// 每幀：先讓上一幀衰減，再用 lighter 疊上新的光
sx.globalCompositeOperation='destination-out';
sx.fillStyle='rgba(0,0,0,'+(1-decay)+')';   // P31 decay=.80、P1 .90、P7 .975
sx.fillRect(0,0,w,h);
```
拿掉它：畫面上的東西會「出現、消失」，而不是「被打亮、慢慢暗掉」——那是 LCD。

### 4. 管面：玻璃在機殼裡，有掃描線、暗角與弧

內容永遠在一塊圓角的管面裡，管面外是機殼（可以有絲印、按鍵、指示燈）。管面有 2–3px 一條的水平掃描線、四周暗角、一道很淡的弧形反光；還有一條緩慢下滾的交流聲亮帶（hum bar）。內容在管面**裡面**捲動，機殼不動。

```css
.tube{position:relative;border-radius:34px/44px;overflow:hidden;
  box-shadow:0 0 0 6px #15171A,0 0 0 8px #33373C,inset 0 0 70px rgba(0,0,0,.85)}
.tube::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:repeating-linear-gradient(180deg,rgba(0,0,0,.30) 0 1px,transparent 1px 3px),
             radial-gradient(ellipse 80% 75% at 50% 48%,transparent 55%,rgba(0,0,0,.55) 100%)}
.hum{position:absolute;left:0;right:0;height:22%;
  background:linear-gradient(180deg,transparent,rgba(155,255,196,.045) 50%,transparent);
  animation:roll 9s linear infinite}
@keyframes roll{from{transform:translateY(-100%)}to{transform:translateY(460%)}}
.screen{position:absolute;inset:0;overflow-y:auto}  /* 內容在玻璃後面捲 */
```
canvas 內的圖另加桶形變形：`x' = x·(1+.05y²)`、`y' = y·(1+.05x²)`。
拿掉它：剩下的是一個發光的網頁，沒有「螢幕」。

### 5. 字元產生器的字：點陣 ROM 字＋筆畫向量字

標籤、數字、狀態列用終端機字元 ROM 的點陣字（VT323＝DEC VT320 的字形）；展示用的大字由**筆畫向量字**畫出——5×7 格、只有直線段、圓角端點，就是向量顯示器一筆一筆走的那種。中文正文用 Noto Sans TC 400／500，但同樣帶輝光。不准使用比例襯線體、不准斜體、不准粗於 700。

```js
// 筆畫字：每字 5×7 格（x 0–4, y 0–6），筆畫以 ; 分隔，字距 6 格
const FONT={A:'0 0 0 4 2 6 4 4 4 0;0 3 4 3', H:'0 0 0 6;4 0 4 6;0 3 4 3', /* … */};
function vecSVG(text){ /* 每一筆 → M x y L x y …，viewBox 0 0 (6n) 8 */ }
```
```css
.vec path{fill:none;stroke:var(--p1);stroke-width:.62;stroke-linecap:round;stroke-linejoin:round}
.mono{font-family:"VT323","Noto Sans TC",monospace}
.cursor{display:inline-block;width:.6em;height:1em;background:var(--p1);animation:blink 1.06s steps(1) infinite}
```
拿掉它：換成 Inter 或任何現代無襯線，畫面立刻變成「科技公司的暗色儀表板」。

## 色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 管面玻璃 | `#0B1310` | 唯一的管內底色（中央 `#10201A`、管緣 `#070C0A` 的徑向漸層） | 62% |
| 機殼 | `#23262A` | 管子外的一切；倒角 `#33373C`、按鍵 `#3A3E43` | 18% |
| 正常 p2 | `#4BE38A` | 正文、線條 | 10% |
| 高亮 p1 | `#9BFFC4` | 標題、現用態、數值、焦點 | 4% |
| 低亮 p3 | `#23A35C` | 次要文字、標籤（對玻璃 5.8:1） | 4% |
| 鬼影 p4 | `#145C35` | 分隔虛線、刻度、捲軸 | 1.5% |
| 過驅 p0 | `#E9FFF1` | 光束核心、按下瞬間 | <0.5% |
| 機殼絲印 | `#B9BDB4` | 只在機殼上 | <1% |

換管規則：P1 `#3CD26E`／P7 閃 `#78AAFF`＋尾 `#BEE65A`／琥珀終端 `#FFB000`（整組亮度階按同比例換算）。一頁只能有一支管。

## 字體系統

- **VT323**（Google Fonts，DEC VT320 字元 ROM）：狀態列、按鈕、數值、標籤。字級 15／17／19／21／26／34／42px（VT323 視覺偏小，比正文大 2–4px 才對齊）。字距 .06–.14em，全大寫。
- **筆畫向量字**（自繪，見特徵 5）：頁面大標與點光單，高度 22／30／46px，stroke-width .62（以 8 單位高的 viewBox 計）。
- **Noto Sans TC 400／500**：中文正文 16px／行高 1.78；h1 30px、h2 22px、h3 18px，字距 .08em。
- 不使用任何粗體以外的強調：強調＝提高亮度階或反白。

## 版面與網格

- 三層：機殼絲印列（上）→ 管面＋右側軟鍵欄（中，填滿剩餘高度）→ 機殼絲印列（下）。`body{overflow:hidden}`，內容在管面裡捲。
- 管面內距：上 34／左 54／右 150（留給軟鍵標籤）／下 60px；≤900px 改為 26／22／92。
- 正文最寬 38em；表格最寬 760px。區塊之間用 `1px dashed var(--p4)` 分隔，**沒有卡片、沒有圓角面板**。
- 唯一允許的格線是示波器刻度（10×8 格、鬼影亮度、透明度 .38），只放在真的有光跡的地方。
- 零旋轉；不對稱來自右側軟鍵欄與左重的管內排版。

## 元件配方

- **軟鍵導覽**：鍵在機殼上（右側直排、灰色塑膠鍵、左側一顆指示燈），標籤在管面上、與鍵對齊（`top: calc(50% + (i-1.5)*92px)`，鍵與標籤共用同一公式）。現用頁：指示燈亮、管面標籤高亮並帶閃爍方塊游標。≤900px 鍵移到管面下方四等分、標籤貼管面底緣。頁尾另備完整文字連結。
- **按鈕**：1px p3 邊、透明底、VT323 21px；hover／focus＝反白（p2 底、玻璃色字、外暈），立即亮、0.55s 指數暗。
- **輸入框**：只有一條底線，字 42px VT323、字距 .32em、全大寫、帶輝光；caret 用 p1。
- **單選**：方框標籤，選中＝反白。
- **表格**：無外框，列間鬼影虛線；數值欄用 VT323 p1。
- **footer**：在管面內，鬼影虛線分隔，三欄地址／時間／連結。

## 動效規則

| 種類 | 本站實作 | 觸發 | 時間 | 降級 |
|---|---|---|---|---|
| ambient 環境 | 交流聲亮帶下滾；點光台光跡持續描繪；現用標籤方塊游標閃 | 無 | 9s linear 循環；描繪每幀 | 亮帶靜止、光跡畫成完整靜態圖、游標不閃 |
| input 輸入 | 游標＝光點，劃過管面留下指數衰減的拖尾；按鈕反白；磷光表「激發」 | pointermove／hover／click | 即時；衰減每幀 14% | 拖尾關閉；反白無過渡；激發直接顯示亮態 |
| transition 轉場 | 關機：畫面塌成水平線→塌成一點→換頁；開機：上一頁的光點先衰減，畫面再由一條線撐開 | 站內連結 | 關 340ms ease-in；點衰減 900ms `--decay`；開 520ms | 直接換頁 |
| signature 簽名 | 〈光束寫字〉打的字被編成立體聲，左聲道推 X、右聲道推 Y，畫面從正在播的聲音讀回來描出 | 輸入／發射 | 每幀讀 2048 樣本取最近 dt·SR 個 | 畫出完整一圈的靜態圖，數值照常更新 |

自我限制：本站**禁用淡入**（違反特徵 3），但總動效仍是 4 種。

## 插畫與圖像風格

**光束描跡 beam-trace**：所有圖都是一條（或幾條）連續的光路徑——李薩茹圖形、筆畫字、位置圖都是線，沒有填色面積。路徑越慢越亮、越快越暗；筆畫之間的「跳線」不消隱（真實的類比示波器沒有消隱），以最暗階留著。靜態圖用 SVG `stroke` ＋ drop-shadow 輝光；動態圖用 canvas `lighter` 疊加＋衰減。

## Logo 與 Favicon 設計指南

- Logo：左邊一個帶機殼的小管面，裡面是 3:2 李薩茹圖形；右邊是一塊玻璃上的筆畫向量字 YUHUI＋SCOPE ROOM。SVG 內以 feGaussianBlur＋feMerge 做輝光。
- Favicon：32×32 機殼圓角矩形＋玻璃＋3:2 李薩茹，inline SVG data URI。
- 規則：logo 一定要「在一支管子裡」；不准單獨把綠字放在白底上。

## Do & Don't

**Do**
- 一支管一種顏色，用亮度做全部階層。
- 讓所有東西出現時是瞬間、消失時是衰減。
- 讓光在玻璃後面：掃描線、暗角、圓角、機殼。
- 讓圖是「一條路徑」，並讓跳線以最暗階留著。
- 對比：正文 p2 對玻璃 11.4:1、次要 p3 5.8:1、高亮 p1 15.7:1。

**Don't**
- 不要 #000 底（那是 OLED），不要純白字。
- 不要第二個色相；不要紅色錯誤訊息、藍色連結。
- 不要淡入、不要 ease-in-out、不要 dashoffset 描線動畫（那是「畫出來」，CRT 是「打亮」）。
- 不要卡片、圓角面板、毛玻璃、硬邊投影。
- 不要 glitch 撕裂與色版分離（那是 Glitch Art，不是本流派）。
- 去AI化：禁紫藍漸層、禁置中大標＋兩鈕＋三卡、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章。

## 頁面骨架範例

```html
<body>
<div class="set">
  <div class="silk"><span><span class="lamp"></span><b>BRAND</b> · 品牌名</span><span>MODEL · X-Y · P31</span></div>
  <div class="face">
    <div class="tube" id="tube">
      <main class="screen" id="screen" tabindex="-1">
        <header class="status mono"><span>CH1→X</span><b>XY MODE</b><span>60 Hz</span></header>
        <!-- 建置期或執行期以 vecSVG() 產生的筆畫向量字 -->
        <svg class="vec" viewBox="0 0 30 8" role="img" aria-label="HELLO"><path d="…"/></svg>
        <h1>頁面標題</h1>
        <p>正文……</p>
        <section><h2>段落</h2><button class="btn">▶ 發射</button></section>
        <footer class="foot">…完整文字連結…</footer>
      </main>
      <canvas class="trail" id="trail"></canvas>
      <div class="hum"></div><div class="dot" id="dot"></div>
      <div class="labels"><span class="on" style="top:calc(50% - 138px)">TRACE<small>首頁</small></span>…</div>
    </div>
    <nav class="keys"><a class="key k0 on" href="index.html" aria-current="page"><i></i><b>F1</b></a>…</nav>
  </div>
  <div class="silk"><span>地址 · 電話</span></div>
</div>
</body>
```

## 技術實作與相容性

### A. Web Audio：立體聲 AudioBuffer 作為向量訊號＋AnalyserNode 讀回（D 輸入與感測層）
- 做法：把文字編成一圈 N＝sampleRate／描繪率 個 (x,y) 樣本——畫線段等速走、跳線走 6 倍快、每段起點停 0.15 格（角點亮）；寫進 2 聲道 `AudioBuffer`（`copyToChannel`），`AudioBufferSourceNode.loop=true` 播放；同一路訊號經 `ChannelSplitterNode` 分給兩支 `AnalyserNode`（fftSize 2048、smoothing 0），每幀 `getFloatTimeDomainData()` 讀回左右聲道，取最近 dt·sampleRate 個樣本畫出來。**畫面讀的是正在播放的聲音，不是另一份動畫資料。**
- 支援：`getFloatTimeDomainData()` 為 Baseline Widely available（MDN：Chrome 35、Firefox 30、Safari 14.1、iOS Safari 14.5 起；2021-04 起全面可用）。AudioContext 須使用者手勢後 `resume()`。
- fallback：未按「發射」、無 AudioContext 或被拒時，畫面直接從同一份樣本陣列以真實時間推進讀取指標描出——圖完全一樣，只是沒有聲音；提示文字說明。
- 查證來源：MDN〈AnalyserNode: getFloatTimeDomainData() method〉；示波器音樂原理（左→X、右→Y）見 testandmeasurementtips〈Making pictures from sound on an oscilloscope FAQ〉、CCC Camp 2019〈Oscilloscope Music〉Jerobeam Fenderson 場次說明。

### B. Canvas 2D `lighter` 加成＋`destination-out` 衰減（A 渲染層）
- 做法：兩張 canvas——sustain（磷光尾，每幀扣掉 1−decay）與 flash（核心閃光，每幀清空，CSS `mix-blend-mode:screen` 疊上）。線段依長度分四個亮度桶，各建一條 `Path2D`，每桶描兩次（暈＋核心），每幀最多 8 次 stroke。
- 支援：`globalCompositeOperation` 的 `lighter`／`destination-out` 為 Canvas 2D 長期 Baseline；`Path2D` Baseline。
- fallback：`prefers-reduced-motion` 時不跑 rAF，只畫一張完整靜態圖；無 JS 時 `<noscript>` 內顯示建置期烘好的 SVG 筆畫字。

### C. Web Animations API（B 動效與時間軸層）
- 做法：開關機轉場以 `element.animate()` 寫成三段關鍵影格（scale 1→0.006→0.003、brightness 1→3.5→6），以 `animation.finished` Promise 等完成才 `location.href`；殘留光點另一支動畫以 `--decay` 曲線 900ms 衰減。`pageshow` 的 `persisted` 時取消 `fill:forwards` 的殘留狀態（bfcache 回上一頁不會停在黑屏）。磷光比較表的「激發」也是 WAAPI：P7 先藍閃 4% 再轉黃綠尾。
- 支援：`Animation.finished` Baseline 2022（MDN，2022-09 起全瀏覽器）。
- fallback：無 `Element.prototype.animate` 或 reduced-motion 時，連結照常直接跳轉。

### 效能實測
- 頁面大小：index 52KB、nights 48KB、repair 27KB、visit 25KB（全部 inline，遠低於 350KB）。
- 文字編譯成樣本（8 字、800 樣本）：1.6ms（Node 22 實測）；首屏 JS 合計 <10ms。
- 每幀：最多 2048 個點、8 次 stroke、兩次全幅 fill；游標拖尾閒置 70 幀後自動停止 rAF。
