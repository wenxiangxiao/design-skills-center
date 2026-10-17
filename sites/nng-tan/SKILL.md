---
name: constructivism-stenberg-kinoplakat
description: Soviet Constructivist film-poster style in its Stenberg-brothers half (Sovkino posters 1923–1933) — a projected film still reduced to three flat tones (paper highlight, one unnatural tint for the mid-tone, ink shadow) and cropped at a foreshortened angle, a kinetic spiral or ray burst spinning off-centre behind it, everything tilted onto a 8–15° diagonal, hand-lettered condensed block titles stretched to exactly fill a tilted band, flat lithographic spot colours on paper with no outlines and no gradients, and the collective signature "2 … 2" in the corner.
---

# 構成主義・Stenberg 電影海報半身 Constructivism — Stenberg Kinoplakat

> 型錄條目：「現代主義與構成」類〈俄國構成主義 Constructivism〉第 2 站（第 1 站 rakurs 為桌遊出版社：紅黑鋼藍赭黃撞色、flat-shape 幾何封面、31° 斜軸拼合——取的是 Rodchenko／Lissitzky 宣傳構成那一半）。
> 本站取的是同一流派的**電影海報那一半**：Vladimir（1899–1982）與 Georgii（1900–1933）Stenberg 兄弟為 Sovkino 畫的約三百張電影海報。主色相換成**洋紅＋檸檬黃＋墨**（第二色為祖母綠），不碰構成主義宣傳的正紅。
> 範例：兩陳看板（高雄鹽埕，1968 年起手繪戲院看板的兄弟畫室）。

## 1. 設計哲學

Stenberg 兄弟是 1921 年莫斯科「構成主義者第一工作小組」的創始成員，做過空間構成與舞台設計，1923 年起轉畫電影海報。當時的電影沒有劇照可用——蘇聯電影公司只給一捲膠片。他們的解法是**把膠片的格放進投影機，投在紙上，照著光描**：這讓他們可以把一格畫面任意放大、拉斜、裁切（Cooper Hewitt〈Making Design: Stenberg Poster〉；Eye Magazine 稱之為「原型投影機」）。石版印刷只付得起三四個顏色，所以投影出來的照片必須被**壓成三階**：亮處留紙、中間調整片一個顏色、暗處一塊墨。

因此本風格的一切都從「一格被投出來的電影畫面」長出來：
- 臉是**照片**，但被壓成三塊平色，而且中間調可以是任何顏色——粉紅的臉、檸檬黃的臉、綠的臉。
- 構圖是**動的**：螺旋、同心圓、放射光束，代表電影本身的運動與放映機的光。
- 所有東西都在**斜軸**上：沒有水平的片名，沒有置中的構圖。
- 字是**手寫的壓縮方塊字**，被拉長壓扁到剛好塞滿一條斜帶。
- 署名是集體的「2 Stenberg 2」——兩個人，一個名字。

一句話：**一格電影被投在紙上，三個顏色，一條斜帶，一個漩渦。**

## 2. 色彩系統

| 角色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 檸檬黃 lemon | `#F1D21C` | 頁面底色、海報地色之一、斜帶上的副標 | 約 35% |
| 洋紅 pink | `#E5306F` | 中間調（臉）、螺旋、放射光束、導覽盤 | 約 25% |
| 墨 ink | `#141212` | 暗部、斜帶、膠片框、頁尾 | 約 25% |
| 紙 paper | `#F2EAD8` | 亮部（就是紙本身）、卡片底 | 約 12% |
| 祖母綠 teal | `#12806E` | 第二中間調、hover、少量地色 | ≤ 3% |

規則：
- **只有三階＋地色**。任何一個圖像最多 3 個色值（紙／一個中間調／墨），整張海報最多 4 色。
- **中間調不必是自然色**：臉可以是粉紅、黃、綠。換中間調的顏色就換了人（本站〈兩陳〉頁三張人像是同一格描稿）。
- 零漸層、零陰影、零透明疊色（唯一例外：投影機的光束與投影殘像，它們代表「還沒描」的光，描完就消失）。
- 不用構成主義宣傳的正紅 `#D52B1E` 系——那是 rakurs／Rodchenko 那一半。

```css
:root{--lemon:#F1D21C;--pink:#E5306F;--ink:#141212;--paper:#F2EAD8;--teal:#12806E}
```

## 3. 字體系統

| 用途 | 字體（Google Fonts） | 字重 | 備註 |
|---|---|---|---|
| 中文標題／斜帶片名 | Noto Sans TC | 900 | **一律壓縮**：HTML 用 `transform:scaleX(.74)`；SVG 用 `textLength`＋`lengthAdjust="spacingAndGlyphs"` 拉到塞滿斜帶 |
| 拉丁／西里爾副標、數字、標籤 | Oswald | 600／700 | 大寫、`letter-spacing:.06–.14em`；支援西里爾字（КИНО） |
| 內文 | Noto Sans TC | 500／700 | 16px、行高 1.7 |

字級 scale：`clamp(66px,10.5vw,158px)` 首頁店名 → `clamp(48px,8vw,118px)` 頁標 → `clamp(34px,6vw,76px)` 節標 → 28–30px 卡片標 → 16px 內文 → 12–13px Oswald 標籤。行高：標題 0.9–1.08，內文 1.65–1.7。
**不用任何襯線字**，不用細字重的標題。

## 4. 版面與網格

- **斜軸**：全站共用 `--tilt:-8deg`；斜帶標題 `rotate(-8deg)`、海報內斜帶 `-14deg`、卡片在 `-3°…+2.5°` 之間交錯。沒有任何一個大標題是水平的。
- **偏心**：漩渦／放射盤的圓心永遠不在畫面中央（海報內在 x=400/600、y=300/840；首頁在右側出血）。
- **出血裁切**：臉被畫面邊緣切掉一部分，斜帶兩端都超出版心（`margin:0 -40px`）。
- **交錯網格**：多欄卡片奇偶錯位（`nth-child(even){margin-top:44px}`）並各自微轉。
- 留白：區塊上下 110/90px；斜帶標題與內容間距 46px；海報內至少留一塊地色不被圖案覆蓋（圓盤中心）。
- 斷點：≤1000px 欄數減半；≤760px 單欄、導覽改底部條；≤560px 剪接條改 4 欄。

## 5. 元件配方

**導覽（kino-rays 放射光束）**：右上角 262px 四分之一圓盤，`repeating-radial-gradient(circle at 100% 0, pink 0 21px, ink 21px 23px)` 做同心環；四條墨色光束以 `transform-origin:100% 0; rotate(-12/-30/-48/-66deg)` 從角落射出，每條是一頁。hover 時光束沿自身方向外推 14px 並變綠；現在頁是檸檬黃光束。≤760px 改為底部四格條。

```css
.rays{position:fixed;top:0;right:0;width:262px;height:262px;pointer-events:none}
.rays::before{content:"";position:absolute;inset:0;border-bottom-left-radius:100%;
  background:repeating-radial-gradient(circle at 100% 0,var(--pink) 0 21px,var(--ink) 21px 23px)}
.rays a{pointer-events:auto;position:absolute;right:0;top:0;width:250px;height:31px;transform-origin:100% 0;
  transform:rotate(var(--a));background:var(--ink);color:var(--paper);clip-path:polygon(0 0,100% 0,100% 100%,6% 100%)}
.rays a:hover{transform:rotate(var(--a)) translateX(-14px);background:var(--teal)}
```

**斜帶標題（band）**：墨底紙字，`rotate(var(--tilt))`，左右各超出 40px；內含 `.sq` 壓縮字。變體 `.pk`（洋紅底墨字）、`.lm`（黃底墨字）。

**按鈕／連結**：不用圓角按鈕。文字連結＋6px 底線＋CSS 繪製的箭頭（clip-path 多邊形），或墨色斜置方塊（`rotate(-2deg)`，hover 轉成 -4° 並變洋紅）。

**卡片**：紙底、頂部 10px 墨條、整張微轉。價目卡用 `clip-path:polygon(0 0,100% 4%,100% 100%,0 96%)` 做成斜切的墨色板。

**表單**：4px 墨框、零圓角、紙底；單選用藏起來的 radio＋`span`，選中時變墨底黃字並轉 -3°。

**頁尾**：墨底，右下角超大洋紅「2陳2」簽名（`font-size:min(30vw,300px)`、`rotate(-8deg)`、被裁切）。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 內容 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 首頁右側的放射光盤 `repeating-conic-gradient` 持續慢轉；〈兩陳〉頁螺旋年表慢轉（hover／focus 暫停） | 無需輸入 | 110s／300s 一圈 linear | 停止轉動 |
| input 輸入 | 游標在首頁移動 → 看板的 ракурс 角度（`rotateY` ±8°、`rotateX` ±6°）即時追隨；導覽光束 hover 外推；剪接台片盒 hover 抬起轉 -4° | pointermove／hover | rAF lerp 0.22（<16ms）；hover 120–160ms `cubic-bezier(.3,.7,.2,1)` | 看板固定在基準角；hover 無補間 |
| transition 轉場 | 跨頁：舊頁旋轉縮小（-16°、0.6×）、新頁以默片「光圈 iris」從中心張開（`clip-path:circle()`）；剪接台換鏡頭：硬切＋新畫面從 7° 斜甩進來並以斜刷 wipe 顯現 | 換頁／剪接 | 舊 500ms `cubic-bezier(.6,0,.8,.4)`、新 620ms `cubic-bezier(.2,.7,.2,1)`；剪接 160／280ms | 直接換頁、直接換畫面 |
| signature 簽名 | **投影描稿**：投影機開燈 → 一張灰階、模糊、梯形變形、閃爍的劇照投在空白看板上 → 梯形校正 → 四道工依序沿斜向筆刷 wipe 塗上（幾何／臉／斜帶片名／膠片格與署名）→ 關燈、投影殘像淡出 | 載入、按「再投一次」、捲到看板、剪完三刀 | 投影 760ms、每層 440ms（wipe 600ms）、收尾 380ms，共約 3s | 四層直接完成，無投影殘像，資訊零損失 |

本站自我限制：**不用淡入當進場**——所有出現都是「被描上去」的斜刷 wipe 或「被投出來」的光；不用 scroll-jack。

## 7. 插畫與圖像風格（projector-posterize 投影三階平塗）

- 圖像只有一種做法：**把一格照片壓成三塊平色**。亮部＝紙（不畫）、中間調＝一塊顏色、暗部＝一塊墨。光固定從左上來，所以暗部永遠在右側與下緣。
- 零描邊：輪廓只來自兩塊色的交界。眼睛＝紙色杏仁形＋墨色圓；鼻子＝一塊墨色楔形＋一條紙色亮線。
- 劇照（湯、空椅、開走的火車、背影、仰角樓群、放映機）都是 300×220 的「格」，放進膠片框（墨框＋上下兩排紙色片孔）。
- 透視要誇張：仰角、俯角、一點透視的鐵軌——Stenberg 的 ракурс。
- 背景幾何只有三種：阿基米德螺旋（粗筆畫 38 單位）、28 等分放射楔、圓盤。

## 8. Logo 與 Favicon

Logo：洋紅圓（偏右上）＋中心黃點＋一條 -14° 的紙色斜帶，帶上壓縮的「2陳2」。Favicon：檸檬黃底、洋紅圓、墨色斜帶、紙色「2」，inline SVG data URI。

```html
<svg viewBox="0 0 64 64"><circle cx="38" cy="26" r="22" fill="#E5306F"/><circle cx="38" cy="26" r="9" fill="#F1D21C"/>
<path d="M0 40 L64 24 L64 44 L0 60 Z" fill="#F2EAD8"/>
<text x="6" y="55" font-family="Oswald" font-weight="700" font-size="17" fill="#141212" transform="rotate(-14 6 55)">2陳2</text></svg>
```

## 9. Do & Don't

**Do**
- 讓臉的中間調是不自然的顏色；同一張臉換顏色就是另一個人。
- 片名一定在斜帶上，且用 `textLength` 拉滿。
- 至少一個偏心的螺旋／放射／圓盤。
- 讓圖像被邊緣裁切。
- 署名用集體的形式（「2 ○ 2」）。

**Don't**
- 不要漸層、陰影、玻璃、圓角卡片、模糊陰影。
- 不要把構成主義做成「紅黑方塊＋斜線」就交差——那是 rakurs 的宣傳半身；本半身的主角是**被投影的人與電影運動**。
- 不要寫實膚色、不要照片、不要外部圖片。
- 不要置中大標＋兩顆按鈕＋三張圓角卡片；不要紫藍漸層；不要 emoji 當 icon；不要 Lorem ipsum；不要「EST. 19xx」徽章。
- 不要複製任何一張 Stenberg 海報的構圖——學方法（投影、三階、斜帶、漩渦），不學畫面。

## 10. 頁面骨架範例

```html
<a class="brand" href="index.html"><svg><!-- logo --></svg><b>店名</b></a>
<nav class="rays" aria-label="主要導覽">
  <a href="index.html" style="--a:-12deg" aria-current="page"><i>01</i>看板</a>
  <a href="montage.html" style="--a:-30deg"><i>02</i>剪一段</a>
  <a href="works.html" style="--a:-48deg"><i>03</i>價目</a>
  <a href="about.html" style="--a:-66deg"><i>04</i>兩陳</a>
</nav>
<section class="hero">
  <div class="hero-disc"></div><!-- 偏心放射光盤，慢轉 -->
  <div class="hero-copy"><h1 class="band"><span class="sq">店名</span></h1><p class="lede">…</p></div>
  <div class="stage"><div class="bb"><div class="tr armed">
    <div class="ly l0"><!-- 整張海報，做投影殘像 --></div>
    <div class="ly l1"><!-- 地色＋螺旋＋圓盤 --></div>
    <div class="ly l2"><!-- 三階臉 --></div>
    <div class="ly l3"><!-- 斜帶＋片名 --></div>
    <div class="ly l4"><!-- 膠片格＋字幕列＋2○2 --></div>
  </div></div></div>
</section>
<section class="sec"><h2 class="band"><span class="sq">節標</span></h2>…</section>
<footer class="foot">…<div class="sig">2陳2</div></footer>
```

## 11. 本風格的 5 個不可省略特徵

### ① 投影三階的臉／劇照（拿掉它，就只是一張幾何構成，不是電影海報）

一格照片壓成紙／一個中間調／墨三塊，零描邊，暗部在右下；中間調可以是任何顏色。

```svg
<!-- 200×260 的臉：中間調（洋紅）→ 右側暗部（墨）→ 亮部（紙） -->
<path d="M62 92 Q60 40 104 34 Q148 36 146 92 Q148 140 132 176 Q118 204 102 206 Q84 204 72 178 Q58 146 62 92 Z" fill="#E5306F"/>
<path d="M124 44 Q148 54 146 92 Q148 140 132 176 Q118 204 102 206 Q114 190 117 168 Q122 150 119 134 Q130 120 126 100 Q128 70 124 44 Z" fill="#141212"/>
<path d="M75 109 Q87 100 99 109 Q87 116 75 109 Z" fill="#F2EAD8"/><circle cx="88" cy="108" r="4.6" fill="#141212"/>
<path d="M104 110 L114 146 L101 153 L109 145 Z" fill="#141212"/>
```

### ② 偏心螺旋／放射光束（拿掉它，畫面就不會動）

```js
// 阿基米德螺旋：r 由 r0 線性長到 r1，dir=±1 決定轉向；stroke 38 單位
function spiral(cx,cy,r0,r1,turns,dir){let d='';const N=turns*72;
  for(let i=0;i<=N;i++){const u=i/N,th=dir*u*turns*2*Math.PI,r=r0+(r1-r0)*u;
    d+=(i?'L':'M')+(cx+r*Math.cos(th)).toFixed(1)+' '+(cy+r*Math.sin(th)).toFixed(1)}return d}
```
```css
/* 純 CSS 放射光盤（首頁背景），偏右出血、慢轉 */
.hero-disc{position:absolute;width:min(124vmin,1180px);aspect-ratio:1;right:-16vmin;top:50%;translate:0 -50%;border-radius:50%;
  background:repeating-conic-gradient(from 0deg,var(--pink) 0 7deg,var(--lemon) 7deg 18deg);animation:spin 110s linear infinite}
```

### ③ 斜軸與斜帶（拿掉它，就是一張普通的電影海報）

```css
.band{display:block;background:var(--ink);color:var(--paper);transform:rotate(-8deg);margin:0 -40px;padding:10px 60px 8px;font-weight:900}
```
```svg
<!-- 海報內：-14° 斜帶，兩端出血 -->
<path d="M-40 600 L640 430.5 L640 562.5 L-40 732 Z" fill="#141212"/>
```

### ④ 拉滿斜帶的壓縮手寫字（拿掉它，字就變成排版而不是畫上去的）

```svg
<g transform="translate(24 696) rotate(-14)">
  <text font-family="'Noto Sans TC'" font-weight="900" font-size="92" fill="#F2EAD8"
        textLength="548" lengthAdjust="spacingAndGlyphs">鼓山渡輪夜班</text>
</g>
```
```css
.sq{display:inline-block;transform:scaleX(.74);transform-origin:0 50%;white-space:nowrap} /* HTML 標題的壓縮 */
```

### ⑤ 石版平色＋膠片格＋集體署名（拿掉它，就看不出這是一張印出來的電影海報）

四色以內、零漸層；劇照放在帶片孔的膠片格裡；右下角「2 ○ 2」。

```svg
<g transform="translate(455 112) rotate(10)">
  <rect x="-75" y="-55.5" width="150" height="111" fill="#141212"/>
  <rect x="-67" y="-52.5" width="7.5" height="6" fill="#F2EAD8"/><!-- 上下各 6 個片孔 -->
  <svg x="-68" y="-42.5" width="136" height="85" viewBox="0 0 300 220" preserveAspectRatio="xMidYMid slice"><!-- 劇照 --></svg>
</g>
<text x="580" y="821" text-anchor="end" font-family="Oswald" font-weight="700" font-size="24" fill="#E5306F">2 陳 2</text>
```

## 12. 技術實作與相容性

### (a) 核心技術與查證

| 技術 | 層 | 承載什麼 | 支援現況（查證來源） |
|---|---|---|---|
| `conic-gradient`／`repeating-conic-gradient`／`repeating-radial-gradient` 程序化圖樣 | A 渲染 | 特徵②的放射光盤（首頁）、導覽盤的同心環——不用任何圖片就能畫出 Stenberg 的漩渦與光束 | Can I Use（MDN BCD）：repeating-conic-gradient Chrome 69、Edge 79、Firefox 83、Safari 12.1、Opera 56；MDN `<gradient>` 為 Baseline Widely available |
| View Transitions API（跨文件 `@view-transition{navigation:auto}`＋同文件 `document.startViewTransition`） | B 動效 | 跨頁「光圈 iris」轉場（默片的 iris in）；剪接台每一刀的硬切＋斜甩 | MDN〈@view-transition〉：**Limited availability（非 Baseline）**；Chrome 開發者文件：跨文件轉場 Chrome／Edge 126+、Safari 18.2+、Firefox 未支援 |
| CSS 3D transform（`perspective`＋`rotateX/Y`）＋ Pointer Events | C 版面／D 輸入 | 特徵①③的 ракурс：看板以 -15° rotateY 立在鷹架上，游標即時改變拉角 | CSS transforms 3D 與 Pointer Events 皆 Baseline Widely available |

輔助：`clip-path: polygon()` 動畫做簽名的斜刷 wipe（Baseline）；SVG `textLength`／`lengthAdjust`（SVG 1.1）做特徵④；IntersectionObserver 讓下方看板捲到才描；sessionStorage 把剪接結果帶到估價單；`?m=` 網址可分享剪法。

### (b) Fallback 具體行為

- **無 JS**：所有海報在建置期以同一份 `art.js` 於 Node 預先輸出成 inline SVG，四層全部可見；投影殘像層 `.l0` 只在 `html.js` 下才存在。剪接台顯示 `<noscript>` 說明＋一張範例看板。
- **不支援 View Transitions（Firefox）**：跨頁為一般瞬間換頁；剪接台 `startViewTransition` 不存在時直接換畫面——資訊零損失。
- **同文件轉場不污染全頁**：剪接時 `html.cutting` 讓 `::view-transition-old/new(root)` 不套用跨頁的旋轉 iris。
- **不支援 conic-gradient**：光盤退為 `background` 無效 → 透明，紙色圓仍在；導覽盤的 radial 環屬同代特性。
- **prefers-reduced-motion**：所有 animation／transition 0s；投影描稿四層直接完成、無殘像；看板不跟游標；螺旋年表不轉；轉場關閉。
- **觸控**：ракурс 跟隨僅在 pointermove 時更新；手機看板固定基準角。

### (c) 效能實測（建置環境 Node 22／jsdom）

- 單頁大小：index 135 KB（gzip 約 20 KB）、montage 52 KB、works 33 KB、about 45 KB——皆遠低於 350 KB。
- `ART.poster()` 生成一張 4 層海報 ≈ 0.15 ms；首屏 JS（放置光束、啟動描稿計時器）估計 < 5 ms，遠低於 100 ms 門檻。
- 動畫只動 `transform`／`clip-path`／`opacity`：光盤轉動與 iris 由合成器執行；ракурс 追隨每幀只寫兩個 CSS 自訂屬性，無 layout thrashing。
- 剪接台每一刀：一次 innerHTML（約 3 KB SVG）＋41 個座位改 `data-k`。

## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-A-32` | Shock Lines | primary #E5306F／secondary #141212／bg #F1D21C、duration 6、density 1、intensity 1、seed 1958 | ambient：檸檬黃地上洋紅實心楔形由中心向外放射、內圈半徑一起一落——Stenberg 海報的放射光束；只用實心三角平塗，零漸層零透明，條帶斜 −1.5° 呼應本站斜帶。 |
| works.html | `TXT-A-06` | Stretch Pop | primary #E5306F／secondary #141212／bg #F1D21C、text 訂一面看板、duration 1.3、aspectRatio 16:9、seed 6（一次性，進視窗播放、點擊重播） | input：片名先被壓扁拉高、再彈回正常比例——構成主義海報把字體橫向壓縮塞進斜帶的那個動作；黃底墨字，斜 −6° 像貼在訂單上方的一條看板片名。 |
| montage.html | `TXT-A-19` | Gate | primary #E5306F／secondary #12806E／bg #F2EAD8、text 剪一段、duration 1.6、aspectRatio 16:9、seed 19（一次性，進視窗播放、點擊重播） | transition：洋紅與青綠兩片平色幕從中間向兩邊拉開，露出「剪一段」——戲院開演的布幕，也是剪接台上兩個鏡頭分開的那一刀；只有兩塊實色矩形。 |
| about.html | `BG-B-34` | Minimal Circle | primary #E5306F／secondary #F1D21C／bg #141212、duration 5、intensity 1、aspectRatio 1:1、seed 34 | ambient：墨底上一枚洋紅圓盤呼吸、外圈一段檸檬弧繞著轉——Stenberg 海報偏心圓盤與旋轉的放映機鏡頭；實心圓＋單一弧線。 |
