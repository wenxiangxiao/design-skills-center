---
name: schematic-transit-diagram
description: Schematic transit-diagram style (Harry Beck's 1933 London Underground diagram, Vignelli's 1972 New York subway diagram) for the web — octilinear lines at 0°/45°/90° with one fixed bend radius, one flat color per line on white, station ticks / white-ringed interchanges / terminus bars, horizontal sans-serif labels, and a framed key; every piece of information (nav, timeline, fares, footer) is drawn as a line with stations.
---

# 地鐵路線圖風 Schematic Transit Diagram

## 設計哲學

1931 年，倫敦地鐵的電工繪圖員 Harry Beck（1902–1974）利用空閒時間，在方格紙上把地鐵網重畫成一張「電路圖」：拿掉地面地理，只保留**誰跟誰相鄰、在哪裡換乘**。線只走水平、垂直與 45 度，站距均等，市中心放大、郊區壓縮。倫敦交通局起初嫌它太激進，1933 年 1 月試印 75 萬份口袋版，幾個月內就加印。此後幾乎每座城市的地鐵圖都沿用這套文法；1972 年 Massimo Vignelli 與 Bob Noorda（Unimark）替紐約地鐵畫的版本把它推到極端——連中央公園都變成正方形，也因此被罵了七年，今天卻是設計史經典。

它長成這樣的原因只有一個：**讀者在車廂裡、在移動中、只有幾秒鐘**。所以拓撲勝過地理、規則勝過裝飾、顏色是代碼不是氣氛。這個風格的美感完全來自「被嚴格遵守的規則」——同一個角度集、同一個線粗、同一個彎角半徑、同一套站符號。只要有一條線斜了 30 度、或某一站用了別的符號，整張圖就不像了。

拿去做網站時，把這個原則推廣：**任何資訊都可以是一條線上的幾個站**——導覽是一條車廂路線燈條、店史是一條時間線、票價是一條「3 到 7 站同價」的線、頁尾是一條終點線。

參照：Ken Garland《Mr Beck's Underground Map》（Capital Transport, 1994）；Mark Ovenden《Transit Maps of the World》（Penguin, 2003／2015）；Maxwell J. Roberts《Underground Maps After Beck》（2005）；Vignelli《The Vignelli Canon》（2010）與 1972 NYC Subway Diagram（MoMA 館藏）。

## 本風格的 5 個不可省略特徵

### ① 八向線＋固定半徑彎：只有 0°／45°／90°

所有線段只允許水平、垂直、45° 斜線；轉彎一律是**同一個半徑**的圓角。站落在格點上、站距均等，地理讓位給拓撲。

```js
// 兩格點之間：先斜後直（sf=1 時先直後斜），只會產生 0/45/90° 線段
function octi(a,b,sf){const dx=b[0]-a[0],dy=b[1]-a[1],m=Math.min(Math.abs(dx),Math.abs(dy)),o=[a];
  if(m&&m!==Math.max(Math.abs(dx),Math.abs(dy)))o.push(sf?[b[0]-Math.sign(dx)*m,b[1]-Math.sign(dy)*m]:[a[0]+Math.sign(dx)*m,a[1]+Math.sign(dy)*m]);
  o.push(b);return o;}
// 折線→固定半徑圓角路徑
function round(p,r=16){let d=`M${p[0]}`;for(let i=1;i<p.length-1;i++){const[P,A,B]=[p[i],p[i-1],p[i+1]],
  la=Math.hypot(A[0]-P[0],A[1]-P[1]),lb=Math.hypot(B[0]-P[0],B[1]-P[1]),c=Math.min(r,la/2,lb/2);
  d+=` L${P[0]+(A[0]-P[0])/la*c},${P[1]+(A[1]-P[1])/la*c} Q${P} ${P[0]+(B[0]-P[0])/lb*c},${P[1]+(B[1]-P[1])/lb*c}`;}
  return d+` L${p[p.length-1]}`;}
```

### ② 一線一色、等粗、平塗、白地

每條線一個高辨識度飽和色，全部同一粗細（本站 9px），白底。**零漸層、零陰影、零透明度**：需要「淡掉」時用預先混好的淡色 hex（`--t`），不用 opacity。河流是唯一的「自然」，也照八向規則畫，用淡藍、加粗。

```css
:root{--paper:#FFFFFF;--ink:#1B1B1B;--lw:9px;--C:#F2A900;--B:#E0457B;--G:#2F9E44;--T:#C8102E;--W:#8B5A2B;--R:#6A3D9A;--river:#A8D8EE}
.ln{fill:none;stroke:var(--c);stroke-width:var(--lw);stroke-linecap:butt;stroke-linejoin:round}
.focus .ln:not(.on){stroke:var(--t)} /* 預混淡色，不是 opacity */
.river{fill:none;stroke:var(--river);stroke-width:18}
```

### ③ 三種站符號：短刻、轉乘白圈、終點橫槓

一般站＝線側一根同色短刻（指向標籤那側）；轉乘站＝白心黑圈；終點＝橫跨線的短槓。全站只有這三種，不得出現圓點站、星形站或圖示站。

```svg
<path d="M200 80 L200 92" stroke="#F2A900" stroke-width="5.5"/>                      <!-- 一般站：短刻 -->
<circle cx="360" cy="80" r="9" fill="#FFF" stroke="#1B1B1B" stroke-width="3.6"/>      <!-- 轉乘站 -->
<path d="M40 68 L40 92" stroke="#F2A900" stroke-width="6"/>                            <!-- 終點：橫槓 -->
```

### ④ 一種無襯線、標籤一律水平

站名用一種人文／標誌系無襯線（本站 Overpass＋Noto Sans TC），**全部水平、不旋轉**，貼在短刻那一側；中文站名 15px 700、英文 9.5px 600 灰。標籤以白色 `paint-order:stroke` 描邊壓在線上，不加底框。

```css
.lb{font:700 15px "Noto Sans TC",sans-serif;fill:#1B1B1B;paint-order:stroke;stroke:#fff;stroke-width:4px;stroke-linejoin:round}
.lb .en{font:600 9.5px "Overpass",sans-serif;letter-spacing:.05em;fill:#5E6267}
```

### ⑤ 圖例框與「萬物皆線」

說明收在一個 2.5px 黑框的圖例框（KEY）裡，附每條線的色樣；空白處才允許出現淡方格。網站的其他資訊也畫成線與站：導覽＝車廂路線燈條、區塊標題＝一小段線、時間軸＝一條線、頁尾＝終點線。

```css
.keybox{border:2.5px solid #1B1B1B;background:#fff;padding:18px 20px}
.lh{display:flex;align-items:center;gap:14px}
.lh::before{content:"";width:46px;height:9px;background:var(--c);border-radius:5px} /* 區塊標題前的一段線 */
.tl li::before{content:"";position:absolute;left:0;right:0;top:14px;height:9px;background:var(--W)} /* 時間軸 */
```

## 色彩系統

| Token | Hex | 用途 | 面積 |
|---|---|---|---|
| `--paper` | `#FFFFFF` | 唯一底色 | ~70% |
| `--ink` | `#1B1B1B` | 文字、轉乘圈、框、按鈕、你的線 | ~10% |
| `--C` 柑橘線 | `#F2A900`（淡 `#FBE6AE`） | 線色 | 六線合計 ~14% |
| `--B` 花線 | `#E0457B`（淡 `#F7CADB`） | 線色 | |
| `--G` 香茅線 | `#2F9E44`（淡 `#C3E5C9`） | 線色／營業中燈 | |
| `--T` 茶線 | `#C8102E`（淡 `#F1BCC4`） | 線色／錯誤訊息／頁尾線 | |
| `--W` 木線 | `#8B5A2B`（淡 `#E0CDB9`） | 線色／時間軸 | |
| `--R` 樹脂線 | `#6A3D9A`（淡 `#D8CBE8`） | 線色 | |
| `--river` | `#A8D8EE`／字 `#2F7FA8` | 河 | ~3% |
| `--passed` | `#C9CCD0` | 已經過的站與線（燈條） | ~1% |
| `--grid` | `#E4E9ED` | 方格與分隔細線 | ~2% |

規則：線色彼此色相差 ≥40° 或明度差明顯；同一色不得兼任兩條線；文字永遠是墨色或灰，不用線色寫字（線色只上線、刻與小色樣）。

## 字體系統

- Google Fonts：`Overpass`（400/600/800/900，源自公路標誌 Highway Gothic 的標誌系無襯線）＋`Noto Sans TC`（400/500/700/900）。不使用任何交通機構的專用字體。
- 字級：H1 `clamp(34px,5vw,58px)` 900；H2 `clamp(24px,3vw,34px)` 900；站名 15px 700；正文 15px/1.65；英文標籤 9.5–11px 800 字距 .14–.16em 全大寫；數字（價格、票號）用 Overpass 800–900。
- 全站零襯線、零斜體、零手寫體；不旋轉任何文字。

## 版面與網格

- 地圖格點 40px；所有站座標是整數格點，彎角半徑 16px（你的線 13px）。
- 地圖視窗以 `viewBox` 等比縮放；≤560px 時放進可橫向捲動的容器（`min-width:680px`），頁面本身不橫捲。
- 頁面 12 欄自由網格，最大寬 1240px；首頁 `1fr 330px`（地圖＋搭乘面板）。
- 留白：區塊間 64px；框線一律 2.5px 黑實線、零圓角（按鈕膠囊例外：它是一段「線」）。
- 零旋轉：任何元素不得以非 0/45/90 的角度擺放。

## 元件配方

- **導覽：車廂路線燈條**——一條 7px 橫線上四個站；已經過的頁灰色、現用頁是一個 26px 白心黑圈「本站」、前方的站是黑色短刻；hover 時短刻變成圓。上方小字「本列車往 來店 方向 →」。

```css
.strip li::before{content:"";position:absolute;left:0;right:0;top:11px;height:7px;background:var(--ink)}
.strip li.passed::before{background:var(--passed)}
.strip .car{position:absolute;top:2px;width:26px;height:26px;margin-left:-13px;border-radius:50%;background:#fff;border:4.5px solid var(--ink);left:var(--to)}
```

- **按鈕**：墨色膠囊（它是一段線），左側一個小轉乘圈；ghost 版為白底黑框。hover 只往右推 3px（列車前進），不變色。
- **卡片**：不用卡片。資訊塊是黑框矩形（圖例框）或掛在線上的站列。
- **表單**：2.5px 黑框、零圓角輸入框；單選是膠囊「站牌」，選中反黑。
- **車票**：左半白底（路線條＋站名＋段別）、右半淺灰底（配方表、票號），中間 2.5px 黑虛線撕口。
- **頁尾**：一條茶線上的五個站：地址、時間、電話、最近捷運、終點。

## 動效規則

| 類型 | 觸發 | 做法 | 時長／緩動 | reduced-motion |
|---|---|---|---|---|
| ambient 小車 | 自動 | 每條線一個 26×12 膠囊沿 `path.getPointAtLength` 行駛，兩站之間 smoothstep 2.2s、停站 0.9s、端點折返；離屏或分頁隱藏即停算 | 3.1s／站 | 停在各線中間站，不動 |
| input 聚焦 | 指到站／線、鍵盤 focus | 其他線換預混淡色、站名轉粗；搭乘中相鄰站的命中圈 scale .82↔1.08 | 90ms／1.1s alternate | 只換色，無脈動 |
| input 錯站 | 點了不能去的站 | 該站 `steps(4)` 左右晃 4px | 280ms | 不晃，只顯示訊息 |
| transition 換頁 | 站內連結 | 跨文件 View Transitions：舊頁左移 48px、新頁 `clip-path:inset(0 0 0 100%)→0` 直角推入；往回走（`pageswap`/`pagereveal` 加 `back` 型別）方向相反；燈條 `view-transition-name:strip` 不參與動畫，燈條小車從上一站滑到本站 | 360／460ms，`cubic-bezier(.2,.8,.2,1)` | `skipTransition()`、小車直接在本站 |
| transition 出票 | 到站 | 車票 `clip-path` 由左往右印出 | 700ms | 直接出現 |
| signature 鋪線＋發車旋律 | 到站 | 你的線＝乘車中心線的**斜接平行偏移**（13px，八向偏移後仍八向），以黑 10px＋白芯 3px 一站一段鋪上，每到一站敲一個 Web Audio 音（線決定音色、站的高度決定音高，C 大調五聲音階） | 280ms／段 | 線直接完整出現；聲音仍可手動播放 |

**自我限制**：不用淡入淡出、不用模糊、不用 dashoffset 描線（鋪線是逐段重算路徑）。

### motion-library 元件表（v1.12.0 @61e24ce，`tools/ml-embed.js` 子集＋`src/motion-player.js`）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| SHP-34 | Circle Draw | index | primary `#1B1B1B`、secondary `#E0457B`、bg `#FFFFFF`、duration 2.6、loop、seed 24、16:9 | 轉乘站白心黑圈被畫滿、粉紅點沿圈繞行；只有圓與線、無發光無漸層，正是特徵③ |
| BG-A-26 | Moving Grid | index | primary `#8FA3B4`、secondary `#2F9E44`、bg `#FFFFFF`、duration 8、density 1.2、seed 1933 | Beck 打底的方格紙：只有正交格線與格點，承載特徵①⑤ |
| TXT-A-28 | Slot | stations | text「下一站 桂花」、primary `#C8102E`、bg `#FFFFFF`、duration 1.8、loop:false、once | 翻牌式下一站顯示；白底→近黑字，停格即純文字 |
| BG-B-18 | Horizontal Lines | fares | primary `#2F9E44`、secondary `#C8102E`、bg `#FFFFFF`、duration 9、intensity .9、seed 15 | 只有 0° 的平塗水平色條＝多條線並行的幹線區段，用容器裁成 72px 帶 |
| TXT-A-20 | Arrow | visit | text「往歸綏街」、primary `#1B1B1B`、bg `#FFFFFF`、duration 1.6、loop:false、once | 直角平頭的導引箭頭推開標題＝站內指標，箭頭只有 0° |

掛載：照 `sites/ka-to` 的 `KT.ml`——等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、回視窗重掛；一次性文字 `once` 播一次後重掛直接 `seek(1)`；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`；canvas `aria-hidden`，容器保留 `.ml-fb` HTML 標題。同畫面最多 2 個。各元件開發說明見 `MotionLib.prompt(id)`。

## 插畫與圖像風格

全站沒有插畫，只有**圖**：香材路線圖、站名表的直線條、大稻埕周邊圖、店史時間線、車票路線條，全部由同一支八向生成器（`octi`＋`round`＋`offset`）或同一套 CSS 線條元件畫出。街道是 7px 淺灰線、捷運沿用真實線色但不放任何機構標誌、步行路線用「你的線」畫法。不畫物件、不畫人、不用圖示。

## Logo 與 Favicon 設計指南

一個 64×64 白方塊裡：一條水平綠線、一條 45° 轉垂直的粉紅線（固定半徑彎），兩線交會處一個白心黑圈，綠線末端一根短刻。就是一張兩線一轉乘站的最小路線圖。Favicon 為同一構圖的 32×32 inline SVG data URI。不得使用圓環＋橫槓的地鐵標誌型。

## Do & Don't

| Do | Don't |
|---|---|
| 所有線段 0/45/90°，彎角同一半徑 | 任意角度、貝茲曲線、手繪抖動 |
| 一線一色、等粗、平塗 | 漸層線、發光線、陰影、透明疊色 |
| 三種站符號用到底 | 圖示站、星形站、彩色圓點站 |
| 標籤水平、貼刻的那側 | 旋轉標籤、沿線彎曲的文字 |
| 資訊掛在線與站上 | 置中三卡片、圓角模糊卡片 |
| 白地＋方格只在空白處 | 紫藍漸層 hero、米色紙紋質感 |
| 真實路線色但自繪 | 交通機構的標誌、字體、商標配色組合 |
| 去 AI 化：具體店名、地址、價格、產地 | Lorem ipsum、emoji 圖示、「EST. 19xx」徽章 |

## 頁面骨架範例

```html
<header class="wrap"><div class="top">
  <a class="brand" href="index.html"><img src="assets/logo.svg" alt="" width="52" height="52"><span><b>店名</b><small>ENGLISH NAME · 地點 年份</small></span></a>
  <nav class="strip" aria-label="站點導覽" style="--to:12.5%"><ol>
    <li class="here"><a href="index.html" aria-current="page"><i></i><b>路線圖</b><span>MAP</span></a></li>
    <li class="next"><a href="stations.html"><i></i><b>站名表</b><span>STATIONS</span></a></li>
    <li class="next"><a href="fares.html"><i></i><b>票價</b><span>FARES</span></a></li>
    <li class="next"><a href="visit.html"><i></i><b>來店</b><span>VISIT</span></a></li>
  </ol><span class="car" aria-hidden="true"></span></nav></div></header>
<main class="wrap">
  <section class="sec"><div class="lh" style="--c:var(--G)"><h2>區塊標題</h2><span class="en">Section</span></div>
    <svg viewBox="-48 -52 984 692"><!-- octi()+round() 產生的 .ln、.tk、.ring、.lb --></svg>
    <div class="keybox"><h3>圖例 KEY</h3>…</div></section>
</main>
<footer class="wrap foot"><ol><li><b>ADDRESS</b>…</li><li><b>HOURS</b>…</li><li><b>TERMINUS</b>店名</li></ol></footer>
```

## 技術實作與相容性

| 技術（層） | 承載什麼 | 支援現況與查證 | Fallback |
|---|---|---|---|
| 八向路徑生成器＋斜接平行偏移（E 資料與生成／A SVG 路徑） | 特徵①②③、整張圖、站名表、周邊圖、你的線（簽名） | 純 JS 字串運算＋SVG path，所有瀏覽器；路線圖在建置期輸出為靜態 SVG | 無 JS 時圖完整可讀，只少互動 |
| 跨文件 View Transitions（B 動效） | 換頁方向感、燈條不動 | Chrome 官方文件〈Cross-document view transitions for multi-page applications〉：Chrome／Edge 126+、Safari 18.2+；Firefox 列為未支援／開發中（2026-10-24 查證，二手來源對 Firefox 現況不一致，一律當作不支援處理）；`pageswap`／`pagereveal` 為 Chrome 124+、Safari 18.2+ | `@view-transition` 不認得就整條忽略＝一般換頁；燈條小車的 CSS 動畫與 VT 無關，全瀏覽器都有 |
| Web Audio 合成（D 輸入與感測） | 發車旋律、每站音 | MDN Web Audio API：Baseline 廣泛可用；自動播放政策要求使用者手勢後才 `resume()`，本站在第一次點站時建立 `AudioContext` | 無 AudioContext 時靜默；聲音開關可關 |

效能實測（建置期 node）：整張圖 SVG 生成 0.19ms；一次乘車幾何（ridePts＋offset＋round）<0.1ms；首頁 HTML 185KB、站名表 151KB、票價 160KB、來店 142KB（皆含約 122KB motion-library 子集，≤350KB）。動畫：六輛小車每幀 18 次 `getPointAtLength`，離屏停算；同畫面最多 2 個 motion-library 元件。
