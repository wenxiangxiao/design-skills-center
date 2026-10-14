---
name: macintosh-1bit-system-one
description: The 1984 Macintosh System 1 / Susan Kare 1-bit desktop — pure black and white pixels only (gray is a 2×2 checkerboard), bitmap system type, pinstriped title bars with a close box, 32×32 front-facing icons that invert when selected, a pull-down menu bar, double-bordered alert dialogs with a thick-ringed default button, zoom-rect window openings and Atkinson-dithered "digitized" photos.
---

# 初代麥金塔 1-bit 介面・Macintosh System 1（Susan Kare, 1984）

> 範例站：金鶴繡學號 KIM-HO̍H（台中育才街的學號刺繡店）。整站就是 1988 年那台 Macintosh 512K 的桌面：選單在上、磁碟在右、要買什麼就拖進磁碟、買好了就把磁碟拖進垃圾桶退出。

**歷史座標**：Macintosh 128K 於 1984-01-24 發表，512×342 像素、72 dpi、**只有黑與白**。Andy Hertzfeld 請 Susan Kare 用最小的方格紙畫圖示，她在 32×32 的格子裡用鉛筆塗格子，畫出剪刀、手、垃圾桶、磁片、Happy Mac 與手錶游標，也設計了第一套系統字 Chicago（原名 Elefont：只用垂直、水平、45° 線，大寫 9 像素高）。Bill Atkinson 寫了 QuickDraw 與 MacPaint，其中 FatBits 放大鏡、38 種 8×8 填充圖樣與他的抖色法（Atkinson dithering）定義了這個風格的「灰」。Finder 1.0 由 Bruce Horn 與 Steve Capps 完成，打開視窗時畫出一串**縮放框（zoom rects）**。

**為什麼長這樣**：一個像素只有一個位元，所以世界上沒有灰——灰是「一黑一白相間」的圖樣；沒有抗鋸齒，所以字是為格子畫的，圓角也是一階一階的；沒有足夠的運算畫出移動中的視窗本體，所以拖曳時只畫一個 XOR 外框，放手才搬。這些限制都不是復古濾鏡，是這個風格的骨頭。

## 1. 設計哲學

1. **一個像素一個位元。**任何元素在任何狀態下都只能是 `#000` 或 `#FFF`。需要「中間調」時用圖樣（50% 棋盤、25% 點、斜紋、磚紋），需要「強調」時用反白（invert）。
2. **桌面隱喻是資訊架構本身，不是裝飾。**頁面＝磁碟或資料夾；內容＝視窗；動作＝拖曳到某個圖示上（丟到磁碟＝加入、丟到垃圾桶＝刪除、把磁碟丟到垃圾桶＝退出）。
3. **狀態用反白說，不用顏色說。**選取＝圖示反白；正在按＝按鈕反白；選單項目選中後閃三下再執行；停用＝被 50% 白格蓋掉。
4. **離散，不補間。**1984 的螢幕 60.15 Hz、沒有 alpha 合成——動畫是一格一格的（縮放框、閃爍、手錶游標），不是 ease-in-out 的漸變。

## 2. 色彩系統

| 色票 | 用途 | 比例 |
|---|---|---|
| `#000000` 墨 | 字、框線、圖示輪廓、反白底、圖樣的黑點 | 約 25% |
| `#FFFFFF` 紙 | 視窗底、選單列、對話框、圖示內部 | 約 45% |
| 50% 棋盤 `repeating-conic-gradient(#000 0 25%,#fff 0 50%) 0 0/2px 2px` | 桌面、捲軸軌道、分隔線、停用項目 | 約 30% |

**沒有第三種顏色。**品牌色、線色等「彩色資訊」一律改成圖樣：本站的四種繡線——黑線＝實心、藍線＝斜紋、紅線＝棋盤、綠線＝橫紋。

## 3. 字體系統

- **系統字（Chicago 的角色）**：選單、視窗標題、按鈕、圖示標籤、表單標籤一律**點陣字**。做法：以 canvas 用 `400 16px "Noto Sans TC"` 畫字 → `getImageData` 讀 alpha → `alpha ≥ 110` 為黑、其餘透明 → 以 1 CSS px＝1 位元顯示、`image-rendering:pixelated`。DOM 保留原字串給讀屏（`.sr`），canvas `aria-hidden`。
- **中文用 16px 柵格**（1980 年代中文點陣字的實際尺寸），粗標題 `700 16px` 閾值 100，放大只用整數倍（×4、×5，FatBits 感）。
- **內文**：一般 DOM 文字 15px／行高 1.75，`-webkit-font-smoothing:none`（macOS 上會關掉抗鋸齒）；Google Fonts `Noto Sans TC` 400/700。
- 字級 scale：12（小標籤）／15（內文）／16（點陣系統字）／64、80（FatBits 標題＝16×4、16×5）。

## 4. 版面與網格

- **選單列** 22px 白底、下緣 1px 黑線，`position:sticky`。左起：店標（粗點陣字）→ 檔案 → 編輯 → 顯示 → 特別；右端時鐘。
- **桌面** 50% 棋盤底；右側 96px 圖示欄（磁碟、資料夾、垃圾桶由上而下，垃圾桶最後）。
- **視窗初始排版用 CSS Grid**（具名區域＋負 margin 讓視窗互相壓 18–60px），第一次拖曳時 JS 把所有視窗「凍結」成絕對座標。這樣既能響應式、又能真的拖。
- 螢幕四角 6px 黑色像素圓角（`position:fixed`）。
- 零旋轉、零斜角；唯一的「不對稱」來自視窗彼此壓疊的位置。
- ≤760px：視窗改為單欄堆疊（`position:relative!important`），圖示欄變成橫排，標題列不可拖。

## 5. 元件配方

**視窗**
```css
.win{background:#fff;border:1px solid #000;box-shadow:1px 1px 0 #000}
.tb{height:20px;border-bottom:1px solid #000;position:relative;display:flex;align-items:center;justify-content:center}
.win.on>.tb::before{content:"";position:absolute;left:2px;right:2px;top:4px;height:11px;
  background:repeating-linear-gradient(#000 0 1px,#fff 1px 2px)}          /* 6 條細紋 */
.tt{position:relative;background:#fff;padding:0 7px}                       /* 標題蓋住細紋 */
.close{position:absolute;left:8px;top:4px;width:11px;height:11px;background:#fff;border:1px solid #000;box-shadow:0 0 0 1px #fff}
.win:not(.on) .close{display:none}                                          /* 背景視窗：無細紋、無關閉框 */
```
**Finder 標頭**：視窗標題列下一條 `3 個項目　312K 已用　88K 可用`，下面兩條 1px 線。

**按鈕**：像素圓角矩形用 9-slice `border-image`（SVG `shape-rendering:crispEdges`），預設按鈕外加 3px 粗環（同樣 9-slice）；按下＝整顆反白。
```css
.btn{border:3px solid transparent;border-image:var(--rr) 3 fill/3px;min-width:76px;padding:3px 14px}
.btn.dflt::before{content:"";position:absolute;inset:-5px;border:5px solid transparent;border-image:var(--ring) 5/5px}
```
**選單**：下拉面板 1px 黑框＋1px 右下落影；hover／focus 整列反白；分隔線是一條 50% 灰紋；停用項目用 `::after` 蓋一層「白、透明」棋盤。

**對話框**：`box-shadow:0 0 0 2px #fff,0 0 0 5px #000,0 0 0 6px #fff,0 0 0 7px #000` 做雙框；左側 32×32 驚嘆號三角或便條圖示；按鈕靠右、預設鈕在最右並有粗環。

**表單**：1px 黑框直角輸入框，focus 只加一圈內 1px 黑；`accent-color:#000`。

**Footer**：一個沒有標題列的小白框（1px 黑框＋落影），放地址電話與「資料皆為虛構」。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 種類 | 本站實作 | 觸發／時間 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 〈Tajima 機台〉視窗一直在繡下一個學號（每格 2 針、蛇行針序、針頭跟著跑，繡完 1.6s 換下一位）；選單列時鐘；地圖上店的螞蟻線 `steps(4)` | 自動、離開視窗或分頁隱藏即暫停 | 直接顯示繡好的字、螞蟻線靜止 |
| input 輸入 | 圖示點一下立即反白；拖曳時跟著游標的 XOR 灰紋輪廓；照片上左右移游標＝重新 Atkinson 抖色（亮度 ±30%）；MacPaint 油漆桶與鉛筆 | 每個 pointermove 一幀內完成（<16ms） | 保留（是操作本身） |
| transition 轉場 | **縮放框 zoom rects**：12 格、每格 1/60 s、留 4 格殘影、`t²` 加速；用於換頁、打開／關閉視窗、警告框、商品飛進磁碟、退出磁碟到印表機；記事本摺角翻頁 `clip-path` `steps(6)` | 點兩下圖示、選單項目、按鈕 | 直接切換 |
| signature 簽名 | **點陣繡字**：學號＋姓名以 16px 柵格化成 1-bit，依蛇行順序一格一針繡進 FatBits 格（×4），針桿跟著跳；線色以圖樣呈現；繡好變成一個可拖曳的 `.繡` 檔 | 按「繡」，每格 5 針約 1.5–2.5s | 直接顯示成品 |

附加：選單項目選中**閃三下**（`steps(1,end)` 330ms）再執行；ImageWriter 草稿模式逐行列印（每行 170ms、印字頭 `steps(14)` 來回）。

## 7. 插畫與圖像風格（kare-icon-1bit）

- **圖示**：32×32、正面、粗輪廓、內部填白（遮罩），一律由程式化像素原語畫（Bresenham 直線、掃描線多邊形、二次曲線、8×8 圖樣填充、最後 `seal()` 把封閉內部補白）。選取時整顆 `filter:invert(1)`。
- **「照片」**：先用 canvas 2D 灰階漸層畫出場景，再以 **Atkinson 抖色**（誤差只擴散 6/8）轉成 1-bit——亮部開、暗部實，像 1984 年用 ThunderScan 掃進來的照片。
- **地圖／插畫**：街廓＝多邊形＋MacPaint 圖樣（磚紋＝學校、點＝住宅、編織＝商圈），標籤是白底點陣字塊。
- 禁止任何向量平滑曲線、漸層、陰影模糊、透明度。

## 8. Logo 與 Favicon

- Logo 是 32×32 的鶴：鶴喙就是一根繡針（針眼在喙根）、頸是一條線、身體用 50% 灰紋、一條虛線線頭從針尖垂下。
- 由同一支點陣引擎輸出：`assets/logo.svg`（×8，每個像素一個 `<rect>`、`shape-rendering="crispEdges"`）與 inline SVG favicon（×1）。
- 選單列最左用粗點陣字「金鶴」取代蘋果標誌（**不得使用 Apple 標誌**）。

## 9. Do & Don't

- ✅ 灰一律用圖樣；強調一律用反白；停用一律蓋棋盤。
- ✅ 點陣只做整數倍放大；1 位元＝1 CSS px。
- ✅ 拖曳只畫外框；放手才搬；丟到圖示上就是動詞。
- ✅ 讀屏文字留在 DOM；canvas 一律 `aria-hidden`；鍵盤可以完成所有事（Enter 打開、方向鍵選單、按鈕替代拖曳）。
- ❌ 不要任何第三色、漸層、`border-radius`、模糊陰影、`opacity` 半透明。
- ❌ 不要 Apple 標誌、Happy Mac 原圖、Chicago 字型檔、原版圖示的逐格複製——風格可以學，圖要自己畫。
- ❌ 不要用 emoji、紫藍漸層、置中三卡片、Lorem ipsum。
- ❌ 不要 ease-in-out 的淡入；這個風格的動畫是一格一格的。

## 10. 頁面骨架範例

```html
<i class="crn tl"></i><i class="crn tr"></i><i class="crn bl"></i><i class="crn br"></i>
<nav class="mb" aria-label="選單列">
  <div class="mi"><button class="mt" aria-haspopup="true" aria-expanded="false"><span class="bm" data-w="700">金鶴</span></button>
    <div class="md" role="menu"><a role="menuitem" href="#" data-act="about"><span class="bm">關於金鶴…</span></a></div></div>
  <div class="mclock"><span class="bm" id="mclock">週四 09：00</span></div>
</nav>
<main class="desk">
  <div class="icol"><a class="ico" href="shop.html"><canvas data-ico="folder"></canvas><span class="lbl bm">制服行</span></a></div>
  <section class="win" data-front style="grid-area:a">
    <header class="tb"><button class="close" aria-label="關閉視窗"></button><h2 class="tt"><span class="bm">關於金鶴.MacWrite</span></h2></header>
    <div class="fhead"><span>3 個項目</span><span>88K 可用</span></div>
    <div class="wb">…</div><i class="grow"></i>
  </section>
</main>
```

## 11. 本風格的 5 個不可省略特徵

### ① 純 1-bit：只有黑白，灰是棋盤（拿掉它就只是「黑白極簡」）
```css
:root{--g50:repeating-conic-gradient(#000 0 25%,#fff 0 50%) 0 0/2px 2px}
.desk{background:var(--g50)}                      /* 桌面 */
.dis::after{content:"";position:absolute;inset:0;  /* 停用＝蓋一層白棋盤 */
  background:repeating-conic-gradient(#fff 0 25%,transparent 0 50%) 0 0/2px 2px}
```
```js
/* Atkinson：六個鄰居各 1/8，丟掉 1/4 */
for(y)for(x){o=e[i];n=o<.5?0:1;out[i]=n;er=(o-n)/8;
  add(x+1,y,er);add(x+2,y,er);add(x-1,y+1,er);add(x,y+1,er);add(x+1,y+1,er);add(x,y+2,er);}
```

### ② 點陣系統字（拿掉它就是一般網頁套了黑白配色）
```js
function rasterText(s,size=16,weight=400,th=110){
  const c=document.createElement('canvas'),x=c.getContext('2d',{willReadFrequently:true});
  x.font=`${weight} ${size}px "Noto Sans TC"`;c.width=Math.ceil(x.measureText(s).width)+2;c.height=size+4;
  x.font=`${weight} ${size}px "Noto Sans TC"`;x.fillText(s,1,Math.round(size*.88)+1);
  const d=x.getImageData(0,0,c.width,c.height).data;            /* alpha ≥ th 才是墨 */
  return Uint8Array.from({length:c.width*c.height},(_,i)=>d[i*4+3]>=th?1:0);}
```
```css
canvas{image-rendering:pixelated}   /* 1 位元＝1 CSS px，放大只用整數倍 */
```

### ③ 細紋標題列＋關閉框＋右下 grow box（拿掉它就認不出是視窗）
```css
.win.on>.tb::before{content:"";position:absolute;left:2px;right:2px;top:4px;height:11px;
  background:repeating-linear-gradient(#000 0 1px,#fff 1px 2px)}
.tt{position:relative;background:#fff;padding:0 7px}
.close{position:absolute;left:8px;top:4px;width:11px;height:11px;border:1px solid #000;background:#fff;box-shadow:0 0 0 1px #fff}
```

### ④ 32×32 正面圖示＋選取反白（拿掉它就沒有桌面）
```css
.ico canvas{width:32px;height:32px;image-rendering:pixelated}
.ico.sel canvas{filter:invert(1)}                  /* 白內部變黑、黑輪廓變白 */
.ico.sel .lbl{background:#000}.ico.sel .lbl canvas{filter:invert(1)}
```
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- 磁片：外框、金屬遮板、標籤三條線；每個像素都是整數座標的 rect/path -->
  <path d="M3 2h24l2 2v25H3z" fill="#fff" stroke="#000"/><path d="M9 2h13v10H9z" fill="#fff" stroke="#000"/>
  <path d="M17 4h3v6h-3z"/><path d="M7 16h18v14H7z" fill="#fff" stroke="#000"/>
</svg>
```

### ⑤ 下拉選單列＋雙框對話框＋粗環預設鈕（拿掉它就沒有「系統」）
```css
.mb{position:sticky;top:0;height:22px;background:#fff;border-bottom:1px solid #000;display:flex}
.mi.open>.mt,.md [role=menuitem]:hover{background:#000}      /* 反白 */
.md [role=menuitem].flash{animation:flash .33s steps(1,end)}   /* 選中閃三下 */
@keyframes flash{0%,50%,100%{background:#000}25%,75%{background:#fff}}
.dlg{border:1px solid #000;box-shadow:0 0 0 2px #fff,0 0 0 5px #000,0 0 0 6px #fff,0 0 0 7px #000}
.btn.dflt::before{content:"";position:absolute;inset:-5px;border:5px solid transparent;border-image:var(--ring) 5/5px}
```

## 12. 技術實作與相容性

| 技術 | 本站承載什麼 | 支援現況（查證） | 不支援時 |
|---|---|---|---|
| **Canvas 2D ImageData 1-bit 柵格化＋Atkinson 抖色**（A 渲染層） | 特徵①②④：全站點陣字、圖示、店面照片、地圖、取件單都是 `getImageData`→閾值／抖色→`putImageData` | `getContext('2d')`、`getImageData`、`putImageData` 為 MDN Baseline Widely available；`willReadFrequently` 屬性只是效能提示，不支援的瀏覽器會忽略（MDN getContext()；caniuse） | 無 JS：所有 `.bm` 保留原字串以一般字型顯示、`<noscript>` 說明；字型未載入時先用後備字柵格化，`document.fonts.ready` 後重畫 |
| **CSS `steps()` 逐格動畫＋`image-rendering:pixelated`**（B 動效層） | 特徵⑤選單閃三下、螞蟻線、印字頭、記事本摺角翻頁、磁碟容量條；縮放框以 rAF 一格一框離散播放 | `steps()` MDN Baseline Widely available（2015-07 起）；`image-rendering: pixelated` Chrome 41+、Firefox 93+、Safari 10+（caniuse） | `pixelated` 不支援時退到 `crisp-edges`；reduced-motion 時所有動畫 0s、縮放框直接跳到結果 |
| **Pointer Events＋`setPointerCapture`＋`mix-blend-mode:difference` XOR 外框**（D 輸入層） | 拖曳商品進磁碟、磁碟進垃圾桶（退出）、視窗標題列拖外框；外框用 `difference` 疊在任何底上都會反相 | `setPointerCapture` MDN Baseline Widely available（2020-07 起）；`elementsFromPoint` 與 `mix-blend-mode` 皆 Baseline | 觸控裝置（`pointer:coarse`）不綁拖曳以免擋捲動，改點兩下或「放進新生.disk」按鈕；鍵盤 Enter 加入、× 鈕刪除、「退出磁碟」按鈕結帳 |

**效能實測**（node 22，同一份程式）：Atkinson 360×232 一次 1.2ms（pointermove 重抖色以 rAF 節流）；全部 24 個圖示生成 0.7ms；三頁 HTML 分別 74／82／75 KB（含全部 inline CSS/JS，遠低於 350 KB 預算）；無外部圖片、無音檔，唯一外部資源是 Google Fonts。

**查證來源**：MDN〈image-rendering〉與 caniuse〈CSS property: image-rendering: pixelated〉；MDN〈steps()〉；MDN〈Element.setPointerCapture()〉；MDN〈HTMLCanvasElement.getContext()〉；Smithsonian Magazine〈How Susan Kare Designed User-Friendly Icons for the First Macintosh〉；The Henry Ford〈Pixels with Personality: Susan Kare's Digital Creativity〉；Atkinson dithering 說明（tinrocket.com 2002–2010 專案頁，含 Atkinson 本人提供的細節）。
