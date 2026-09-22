---
name: glitch-art-databent
description: Glitch Art as a decoding discipline — an orderly achromatic substrate where colour appears only where data broke, with hard RGB channel splits, full-width horizontal tears, 8×8 macroblocks and brightness-sorted streaks, all produced by actually corrupting bytes rather than drawing damage.
---

# Glitch Art 故障藝術 — 灰到壞為止

## 設計哲學

Glitch Art 不是「加上故障濾鏡」，是**讓一個本來正常的系統在你眼前壞掉，並且把它壞掉的樣子留下來**。流派的源頭有三條：

- **JODI**（Joan Heemskerk & Dirk Paesmans，1995–）把瀏覽器與原始碼本身當成畫布，讓使用者看見介面底下的資料。
- **Takeshi Murata〈Monster Movie〉（2005）** 與 datamosh 社群：刪掉壓縮影片的 I-frame，讓下一幕沿著上一幕的動態向量「流」過去——畫面被切成 8×8 巨集區塊並拖著走。
- **Rosa Menkman〈The Glitch Moment(um)〉（Institute of Network Cultures, 2011）與〈Glitch Studies Manifesto〉（2010）**：glitch 是「一個系統的預期流程被打斷的那一瞬間」；它必須以秩序為前提才存在。**Kim Asendorf 的 ASDFPixelSort（2010）** 則讓「像素排序」成為這個流派的第三個招牌手勢。其後有 Chicago 的 GLI.TC/H 聚會（2010–2012）把它當成社群。

所以本規格書的第一準則是：**先有秩序，才有錯**。整個畫面九成以上必須是整齊、無彩、可讀的載體（網格、等寬字、灰階）；錯誤只發生在局部，而且錯得有因果——它是從某一個位元、某一列、某一個區塊開始的，並沿著編碼往下傳。滿版都在閃的東西不是 glitch，是雜訊。

第二準則：**顏色就是錯誤**。原稿只准用灰；青、洋紅、黃、藍、紅這五個顯示器原色只准出現在「資料與原稿不一致」的地方。使用者一眼就能從顏色讀出「這裡壞了」。

第三準則：**不要畫損毀，要讓損毀發生**。能用真的解碼器、真的排序、真的區塊量化做出來的，就不要用手擺的 CSS 假裝。這個站的每一格彩色都是一個 RLE 解碼器讀到被翻轉的位元之後的必然結果。

與相近條目的分界：與「訊號衰減 Signal-Decay」（類比磁帶：追蹤、時基、偏磁、掃描線雜訊、單色墨階）不同，本條目是**數位**的——整數像素、硬邊、原色、區塊、位元；零掃描線、零類比雜訊、零模糊。與「CRT 磷光」不同，本條目不模擬顯示裝置（無輝光、無弧面、無暗角）。與「Vaporwave」不同，不借用 90 年代商業影像與粉紫漸層。與「8-bit 像素」不同：像素畫是被刻意畫出來的圖，本條目的像素是從資料被解出來的，而且是壞的。

---

## 本風格的 5 個不可省略特徵

> 拿掉任何一項，畫面就不再是 Glitch Art。每一項附可直接複製的片段。

### 1　色版分離（channel split）：只准水平、只准整數、零模糊

紅與青兩個通道各往一側滑開，邊緣長出一條紅、一條青。位移**只有水平方向**、**永遠是整數像素**、**零 blur**，而且全站共用同一組位移量（可以隨輸入變大，但不同元素之間不各自亂跳）。

```css
:root{ --s:0px }                       /* 由指標速度驅動，見動效規則 */
.split{ text-shadow: calc(2px + var(--s)) 0 0 #FF2A2A,
                     calc(-2px - var(--s)) 0 0 #00D8F0; }
/* 點陣圖用 drop-shadow，一樣 0 模糊 */
.chroma{ filter: drop-shadow(var(--s) 0 0 #FF2A2A)
                 drop-shadow(calc(var(--s)*-1) 0 0 #00D8F0); }
```

在自己產生的點陣圖裡，則是「受損那一列」的 R 通道取自左邊第 2 格：

```js
// 只有該列有錯時才分色
r = bad ? colorAt(x - 2)[0] : col[0];
```

### 2　橫向撕裂（slice displacement）：整寬、水平、每條帶位移不同

畫面被切成幾條**整寬的水平帶**，每一條各自往左或往右錯開不同的整數距離。切口永遠水平；讀不到資料的地方**抄上面一列**（拖影），不留白。

```css
.tear{ position:relative; display:inline-block }
.tear::before,.tear::after{
  content:attr(data-t); content:attr(data-t) / "";   /* 第二行對輔助科技靜音 */
  position:absolute; inset:0 auto auto 0; width:100%;
  background:var(--paper); pointer-events:none }
.tear::before{ clip-path:inset(18% 0 62% 0); transform:translateX(-14px); text-shadow:3px 0 0 #FF2BD6 }
.tear::after { clip-path:inset(71% 0 12% 0); transform:translateX(22px);  text-shadow:-3px 0 0 #00D8F0 }
```

```html
<h1 class="tear split" data-t="咬三口，織一雙">咬三口，織一雙</h1>
```

### 3　8×8 巨集區塊（macroblocking）：對齊同一張網格、塊內一色

JPEG／MPEG 的 DCT 以 8×8 為單位。壞掉時細節被平均掉，整塊變成一色。**所有塊對齊同一張 8 的倍數網格**、塊內零細節、塊與塊之間是硬邊。塊的顏色取原本那一格裡**最多的那一色**，所以錯得「有道理」。

```js
function macro(a, bx, by){           // a: 索引緩衝, W 寬
  const c=[0,0,0,0];
  for(let y=by;y<by+8;y++)for(let x=bx;x<bx+8;x++){const v=a[y*W+x]; if(v>=0)c[v]++;}
  const m=c.indexOf(Math.max(...c));
  for(let y=by;y<by+8;y++)for(let x=bx;x<bx+8;x++) if(a[y*W+x]>=0) a[y*W+x]=m;
}
```

```css
canvas.px{ image-rendering:pixelated; image-rendering:crisp-edges }  /* 放大時不得內插 */
```

### 4　像素排序（pixel sort）：一個方向、有起訖、依亮度

一段連續像素依亮度重新排列，變成由淺到深的直條，像融化往下流。**只沿一個方向**（本站一律由上往下、由淺到深）、**只在一段有起點有終點的範圍內**，範圍外一格不動。

```js
function pixelSort(a, x, y0, y1){   // 一欄，自 y0 到 y1
  const col=[]; for(let y=y0;y<y1;y++){const v=a[y*W+x]; if(v>=0) col.push(v);}
  col.sort((p,q)=>p-q);              // 索引 0=最淺 … 3=最深
  let k=0; for(let y=y0;y<y1;y++) if(a[y*W+x]>=0) a[y*W+x]=col[k++];
}
```

頁面元素上的「排序滴流」可以用硬停點漸層表示（不是平滑漸層）：

```css
.drip{ width:8px; height:72px;
  background:linear-gradient(#FFE100 0 14%,#00D8F0 14% 30%,#C9C9C4 30% 41%,
                             #FF2BD6 41% 60%,#FF2A2A 60% 76%,#2A34FF 76% 100%) }
```

### 5　灰色載體，顏色只在錯處（color is error）

原稿只准四階灰＋墨；**五個顯示器原色只准出現在資料與原稿不一致的地方**，全頁面積 ≤10%。畫面九成以上必須完好、整齊、無彩。這條規則由「逐格比對」實作，而不是由設計者挑位置：

```js
const col = (decoded[i] === clean[i]) ? GRAY[decoded[i]]      // 照原稿 → 灰
          : hold[i] ? [0xFF, GRAY[v][1], GRAY[v][2]]           // 拖影 → 紅通道卡死
          : ERR[decoded[i]];                                   // 讀錯 → 原色
```

```css
body{ background:#E9E9E5 repeating-linear-gradient(90deg,transparent 0 63px,#DFDFDA 63px 64px) }
/* 64px 一條的基準線：載體是一張看得見的網格 */
```

---

## 色彩系統

| 角色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 紗白 paper | `#E9E9E5` | 唯一大面積地色 | ≈45% |
| 淺灰 g1 | `#C9C9C4` | 分隔線、次要框 | ≈10% |
| 字灰 g2 | `#5E5E59` | 標籤、說明（對紙 5.36:1） | ≈8% |
| 墨 ink | `#151515` | 正文（15.0:1）、控制台底、主框線 | ≈27% |
| 襪紗四階 | `#DCDCD7 #A2A29C #5A5A55 #1C1C1A` | 只在點陣圖裡：原稿的四種紗 | — |
| 青 C | `#00D8F0` | 錯誤；色版分離的左通道 | 原色合計 ≤10% |
| 洋紅 M | `#FF2BD6` | 錯誤；被翻轉的位元組；focus | |
| 黃 Y | `#FFE100` | 錯誤；解碼讀頭；控制台上的強調字 | |
| 藍 B | `#2A34FF` | 錯誤 | |
| 紅 R | `#FF2A2A` | 錯誤；拖影（紅通道卡死）；色版分離的右通道 | |

硬規則：

1. 原色**永不在紙底上承載文字**（Y 1.08:1、C 1.43:1、M 2.63:1）。在墨底控制台上可以（Y 13.9:1、C 10.5:1）。
2. 零漸層（排序滴流的硬停點不算漸層）、零模糊陰影、零 border-radius、零玻璃擬態、零霓虹發光。
3. 零紫藍漸層、零「賽博龐克霓虹」：本風格的原色是**顯示器的通道**，不是氛圍燈。
4. 原色只能出現在「壞掉的地方」。如果一個元素沒有壞，它就不准有顏色。

## 字體系統

- **IBM Plex Mono** 400/500/600（Google Fonts）：十六進位、位移、標籤、數字。它是「資料本身」的字。
- **Noto Sans TC** 400/700/900：中文正文與標題。標題 900。
- **Anton**：拉丁大字與編號（E1–E5、R1–R5），壓縮窄體讓水平撕裂更明顯。

字級：h1 `clamp(30px,4.2vw,54px)`／h2 `clamp(26px,3.2vw,40px)`／h3 20px／正文 16px 行高 1.75／標籤 12px mono 字距 .06em 全大寫。hex 傾印 13px 行高 1.75、手機 10.5px。**所有被撕裂或分色的字必須是 ≥24px 的標題**；正文永遠乾淨可讀。

## 版面與網格

- 最大寬 1280px，64px 基準直線畫在背景上（1px `#DFDFDA`）。
- 非對稱兩欄：7:5、6:6、5:7 輪流；區塊之間 88px；每個區塊頂端 2px 墨線。
- **零旋轉**：glitch 只准水平位移。任何 rotate 都會讓它變成「拼貼」。
- 點陣圖一律 `image-rendering:pixelated`，以整數倍放大，寬高比寫死（本站 44:64）。
- 手機 ≤560px：hex 表改 8 欄、導覽四格等分、所有兩欄疊成一欄；撕裂位移量不縮小（它是整數像素，不是百分比）。

## 元件配方

**導覽（corrupt-current）**：四格 tab 標位移（`0x00 HEAD`），非現用格乾淨灰；現用格反成墨底，頁名做色版分離，右下垂下一條 8px 寬的排序滴流。語意：你打開的那個檔，是唯一會壞的檔。

```css
.tabs a[aria-current]{background:#151515;color:#E9E9E5}
.tabs a[aria-current] b{text-shadow:calc(3px + var(--s)) 0 0 #FF2BD6,calc(-3px - var(--s)) 0 0 #00D8F0}
.tabs a[aria-current]::after{content:"";position:absolute;right:14px;top:100%;width:8px;height:72px;
  background:linear-gradient(#FFE100 0 14%,#00D8F0 14% 30%,#C9C9C4 30% 41%,#FF2BD6 41% 60%,#FF2A2A 60% 76%,#2A34FF 76% 100%);
  animation:drip 3.2s steps(8,end) infinite}
```

**按鈕**：2px 墨框、0 圓角；hover 反白並分色：

```css
.btn{font:700 15px/1 "Noto Sans TC";background:#E9E9E5;border:2px solid #151515;padding:11px 16px;border-radius:0}
.btn:hover{background:#151515;color:#E9E9E5;text-shadow:2px 0 0 #FF2BD6,-2px 0 0 #00D8F0}
```

**控制台（hex 傾印）**：墨底、`#BDBDB8` 字、位移欄 `#6E6E69`、列首位元組加底線、被翻轉的位元組洋紅底墨字、選取中紙底墨字。

**卡片**：沒有卡片。資訊塊是「2px 墨頂線＋標籤＋內容」。檔號卡用墨底表頭＋細線 dl。

**表單**：readonly 網址欄 1px 淺灰框、mono 12px；位元開關是 8 顆方鈕，`aria-pressed` 表示位元值，已翻轉的加 6px 洋紅內底線。

**footer**：2px 墨頂線、三欄，最後一欄以 `EOF · 0x0000–0x1FFF` 收尾。

## 動效規則

| 類型 | 做法 | 觸發 | 時間 | 降級 |
|---|---|---|---|---|
| ambient 環境 | **datamosh 漂移**：每 150ms 取一個對齊 8 的 8×8 區塊，從鄰近 (±2, ±1) 的位置抄像素過來（P-frame 動態向量），每 48 拍回到 I-frame；另有標題撕裂帶 `steps(1)` 偶發換位、排序滴流 `steps(8)` 生長、地圖上的錯點 700ms 明滅 | 時間 | 150ms／4.8s／3.2s | 停在第一幀，資訊不變 |
| input 輸入 | **指標速度 → 色版分離量**：pointermove 算水平速度，`--s = round(min(9, v×6))` px（整數），每幀 ×0.8 衰減 | 游標 | <16ms | `--s` 固定 0 |
| transition 轉場 | **跨頁水平撕裂**：舊頁 `steps(6)` 左右亂跳並由下往上被裁掉；新頁由上往下補回 | 換頁 | 300ms | `animation:none`，瞬間換頁 |
| signature 簽名 | **錯誤沿編碼往下跑**：位元一翻，從第一個受損列開始，一幀解一列往下重畫，讀頭是一條黃線 | 翻位元／載入 | 1 列／幀（≤64 幀） | 一次畫完最終狀態 |

所有 easing 一律 `steps()`；**零 ease、零淡入淡出**。glitch 沒有中間狀態：一格要嘛讀對、要嘛讀錯。

## 插畫與圖像風格

**decode-raster 解碼光柵**：全站零外部圖片、零照片、零手繪插畫。每一張圖都是一段位元組經解碼器寫進 `ImageData` 的結果：

1. 原稿是 4 階灰的索引緩衝（花樣由公式產生：菱格、橫條、千鳥〔2/2 斜紋 4 深 4 淺的真實組織〕、鋸齒）。
2. 編碼成逐列 RLE：每列 1 個列首位元組（段數）＋若干段位元組（高 2 位＝紗色、低 6 位＝針數−1）。
3. 翻位元 → 解碼 → 與原稿逐格比對 → 同色畫灰、異色畫原色、拖影畫「紅通道卡死」。
4. 其餘四種錯（錯紗、巨集區塊、拉紗、斷針）是對索引緩衝的運算，渲染器同一支。

判準：放大任何一張圖——(a) 每一格都在整數網格上；(b) 有顏色的格子都能指出它為什麼錯；(c) 找不到任何漸層、模糊、半透明。

## Logo 與 Favicon 設計指南

Logo 由 `crispEdges` 的整數矩形組成：左邊一隻襪（其中一列往右撕開 2 格，左側露出青色通道、底部一條黃）、中間五根針（第三根是斷的，只剩下半截、塗成藍）、右邊 3×5 點陣字 TIAU（A 的橫槓滑出一格並染洋紅）。Favicon 是同一隻襪的 16×16 版本，inline SVG data URI。規則：Logo 本身也要「只在一處壞掉」。

## Do & Don't

**Do**
- 先做一個會運作的系統（解碼器、排序、區塊量化），再讓它壞。
- 錯誤局部化：一個起點、一個方向、一段範圍。
- 讓顏色有因果：每一格彩色都能被追溯到一個位元、一列或一個區塊。
- 正文永遠乾淨可讀；只撕標題。
- 提供「看原稿」的方法（按住、切換），讓使用者比較錯與對。

**Don't**
- 不要整頁閃爍、不要全螢幕雜訊、不要隨機抖動所有元素（那是雜訊，不是 glitch）。
- 不要掃描線、CRT 弧面、類比雪花（那是別的流派）。
- 不要模糊、發光、霓虹、紫藍漸層、賽博龐克配色。
- 不要旋轉、不要斜切：撕裂只准水平。
- 不要讓原色出現在沒有壞的東西上。
- 去AI化禁令照舊：無 emoji icon、無置中三卡片、無 Lorem ipsum、無圓角大陰影卡、無「EST. 19xx」徽章。

## 頁面骨架範例

```html
<header class="mast">
  <a class="brand" href="index.html"><!-- crispEdges logo --><b>店名</b></a>
  <nav aria-label="頁面"><ul class="tabs">
    <li><a href="index.html" aria-current="page"><span>0x00 HEAD</span><b>首頁</b></a></li>
    <li><a href="b.html"><span>0x40 ERRS</span><b>第二頁</b></a></li>
  </ul></nav>
</header>
<main class="wrap">
  <section class="open">
    <div>
      <p class="cmd">$ <b>xxd -l 208 today.skn</b></p>
      <h1 class="tear split" data-t="標題">標題</h1>
      <pre class="dump console"><!-- offset  hex × 16  ascii；被翻轉的位元組 <b class="bad"> --></pre>
    </div>
    <figure><canvas class="px chroma" role="img" aria-label="描述哪裡壞了"></canvas></figure>
  </section>
</main>
<footer class="foot">… <div class="eof">EOF · 0x0000–0x1FFF</div></footer>
```

```js
// 最小解碼管線
const ref = clean(p), enc = encodeRLE(ref);
const bytes = enc.bytes.slice(); bytes[off] ^= (1 << bit);  // 咬一口
const st = decode(bytes);                                   // 列首壞 → 讀錯行 → 抄上一列
paint(img, st.idx, ref, st.hold); ctx.putImageData(img, 0, 0);
```

---

## 技術實作與相容性

### A 渲染層　Canvas 2D `createImageData()` ＋ `putImageData()`（只寫不讀）

承載特徵 3、4、5 與全站全部圖像。每張圖是一塊 44×64 的 `ImageData`，由索引緩衝逐格寫入 RGBA 後 `putImageData`，再以 CSS `image-rendering:pixelated` 整數倍放大。**刻意永不呼叫 `getImageData()`**：MDN 指出在某些隱私設定下（Firefox 的指紋防護），`getImageData`／`putImageData` 不保證往返一致、讀回來的像素會被加入雜訊——對一個「每一格顏色都必須有因果」的風格，這是致命的。所以狀態永遠存在自己的 `Int8Array` 裡，Canvas 只當輸出。

- 查證：MDN `CanvasRenderingContext2D.getImageData()` 標示自 2015-07 起跨瀏覽器可用，並記載指紋防護雜訊的注意事項；`putImageData`、`createImageData` 同屬長期可用 API。`image-rendering:pixelated` 在 Chromium／Safari 支援，Firefox 以 `crisp-edges` 為準，故兩行都寫。
- Fallback：無 JS 時首頁仍有完整 hex 傾印與註解（第一層資訊全部在靜態 HTML），canvas 以 `<noscript>` 說明；五種錯的規格文字與價表全為靜態。

### B 動效與時間軸層　跨文件 View Transitions（`@view-transition{navigation:auto}`）

承載轉場動效「跨頁水平撕裂」。舊頁 `::view-transition-old(root)` 以 `steps(6)` 左右亂跳並被 `clip-path:inset()` 由下往上裁掉，新頁由上往下補回，300ms。

- 查證：MDN `@view-transition` 頁面狀態列為 **Limited availability**（「not Baseline because it does not work in some of the most widely-used browsers」）；Chromium 126+、Safari 18.2+ 支援，Firefox 在 2026 年陸續推進中。
- Fallback：at-rule 不被認得即整條忽略，換頁為一般瞬間換頁，**資訊零損失**；`prefers-reduced-motion` 時以 `animation:none` 取得相同結果。

### E 資料與生成層　URL 狀態序列化（`URLSearchParams` ＋ `history.replaceState`）＋ FNV-1a 檔號

承載核心功能的「一個檔一雙」：整雙襪子的錯誤就是網址 `?p=<花樣>&f=<位移>.<位元>,…`（最多三口），所以複製網址就等於把那個壞檔交給別人；檔號是 `FNV-1a(p:flips)` 的 base36 六碼，同一組錯永遠同一個號。每日 B 品倉由 `xorshift(FNV-1a(本地日期))` 決定，全世界同一天看到同一批。

- 查證：`URLSearchParams` 與 `History.replaceState()` 皆為 MDN Baseline 長期廣泛可用；`Math.imul` 同。解析時以 `^(\d{1,4})\.([0-7])$` 白名單驗證，超出檔長的位移自動丟棄，最多取 3 組。
- Fallback：`replaceState` 包在 try/catch，失敗時網址欄仍顯示目前狀態供手動複製；剪貼簿 API 不可用時改為選取網址欄。

### 輔助：`mix-blend-mode` 不使用，改用 0 模糊 `text-shadow`／`drop-shadow`

色版分離原本可用 `mix-blend-mode`（MDN Baseline Widely available，自 2020-01），但它會讓整個元素進入混合群組並與地色相乘，破壞「原稿只有灰」的規則；0 模糊陰影只在邊緣長出通道，本體不動。

### 效能預算實測（本站）

- 單頁容量：index 29.0KB／cuowu 27.6KB／gaidang 30.7KB／laichang 23.1KB（預算 350KB），另載 Google Fonts。
- 解碼：44×64 一張 RLE 解碼＋比對＋上色 < 1ms（node 22 實測 1000 次解碼＋比對＋上色共 27ms，約 0.03ms／張）；首屏 JS（首頁 7 張圖）估計 < 10ms（預算 100ms）。
- datamosh 每 150ms 改寫一塊 64 格並重畫 2,816 格，畫面外（IntersectionObserver）與分頁隱藏時暫停。
- 簽名動效每幀只重畫一張 44×64，無 layout、無 reflow；所有 CSS 動畫只動 `transform`、`clip-path`、`height`（滴流 8px 寬元素，影響可忽略）。
