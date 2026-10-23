---
name: isometric-pixel-pixorama
description: Isometric pixel art in the eBoy "Pixorama" tradition — 2:1 stair-step lines, three-tone faces lit from the upper left, a floating cut-away block crammed with a reusable object kit, zero anti-aliasing and integer-only scaling.
---

# 等角像素・Pixorama（Isometric Pixel Art／eBoy Pixorama）

> 範例站：頂樓樂園 TÍNG-LÂU LO̍K-HNÎG（高雄鹽埕・七賢百貨 R 樓的百貨頂樓遊樂場）
> 型錄位置：「數位與螢幕原生」〈等角像素・Pixorama〉，全館第 1 站。

## 1. 設計哲學

等角像素不是「把東西畫成像素」，而是**把一個世界裝進一塊浮在空中的方塊裡，每一格地磚都看得見、一格不多一格不少**。

- **血緣**：柏林 eBoy（Kai Vermehr、Steffen Sauerteig、Svend Smital，1997／98 年成立）的 Pixorama 城市切塊——紐約、東京、柏林被切成一塊等角方塊，塞滿車、人、招牌；更早的是 Maxis《SimCity 2000》（1993）與 Bullfrog《Theme Park》（1994）這些 2:1 二點五維的遊戲畫面；之後是 Sulake《Habbo Hotel》（2000）的房間。
- **它為什麼長這樣**：早期螢幕沒有反鋸齒、色數有限，真正 30° 的等角線在像素格上會抖成鋸齒，所以像素畫家改用「走兩格、升一格」的 2:1 線（約 26.565°），每段階梯都一樣長、看起來最乾淨。這個技術限制後來變成了美學：硬邊、整齊的階梯、靠三個面的明度差撐起立體，而不是靠漸層與陰影。
- **在網站上的意思**：一切圖像都在**原生解析度**畫好，再以**整數倍**放大；動作也守 2:1（小人一步 = 橫 2 px、縱 1 px）；版面像一個 UI 遊戲介面——像素窗、方塊按鈕、像素字。
- **它不是什麼**：不是 8-bit 平視精靈（NES 的 16×16 側視角色）、不是低多邊形 3D、不是有漸層光澤的等角向量插畫（那是 2010s 的扁平等角圖示）。

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是等角像素 Pixorama。

### ① 2:1 階梯線、零反鋸齒、整數倍放大

所有斜線都是「兩格一階」；canvas 只用整數座標 `fillRect`，零 `arc()`、零 `lineTo()` 路徑、零漸層；放大只走整數倍並開 `pixelated`。

```css
canvas{image-rendering:pixelated;image-rendering:crisp-edges}
```
```js
// 一格地磚 16×8：P(i,j,z) = (X0+(i-j)*8, Y0+(i+j)*4-z)
const at=(i,j,z=0)=>[X0+(i-j)*8, Y0+(i+j)*4-z];
// 菱形的上下緣（x 為欄）：兩欄升一列
const yTop = x<Nx ? Ny+((Nx-1-x)>>1) : Ny+((x-Nx)>>1);
const yBot = x<Sx ? Ny+d*4+((x-Wx)>>1) : bottom-((x-Sx)>>1);
```

### ② 三面明度：頂亮、左中、右暗，光恆在左上

每個物件只用**一個色相的三階**＝[頂面, 左面, 右面]，外輪廓 1px 墨線；不畫投影、不畫漸層。

```js
const R={ red:['#F0604A','#C23B2C','#88271E'], green:['#5CC484','#3E9A62','#2B7148'],
          cream:['#FFF1D0','#E9CFA0','#C2A577'], blue:['#5B8CEB','#3C66BF','#29468A'] };
px.box(i,j,w,d,h,z,R.red,'#1B1A2E'); // 逐欄光柵化：頂面 ramp[0]，x<S 用 ramp[1]，x≥S 用 ramp[2]
```

### ③ 浮空切塊＋滿載密度

畫面主體是**一塊浮在平塗天空上的等角方塊**：不畫地平線、不畫天空漸層、不畫遠景；方塊的兩個側面就是建築剖面（樓層窗帶、騎樓紅帶）。方塊頂面留白 <15%：遊具、人、招牌、水塔、電梯機房塞滿。

```css
body{background:#A8DDF0}   /* 天空＝一個平塗色，不是場景 */
```
```js
px.box(-.25,-.25,10.5,8.5,62,-62,R.cream,INK);         // 樓身：頂面就在屋頂高度
for(let fl=0;fl<6;fl++) px.box(a+.2,8.25,.6,0,4,z,R.glass); // d=0 → 貼在左面的窗
```

### ④ 一套零件，重複組合只換色

所有物件都是同一個零件庫的組合：方塊、等角圓柱、2:1 橢圓、3 px 寬的小人。旋轉木馬＝紅圓柱＋十二格帳篷；摩天輪＝一個圓＋八個吊籃；包場頁的零件盤就是這個庫本身。

```js
KIT.horse={n:'投幣電動馬',w:1,d:1,a:2,tok:1,fee:300,draw(px,i,j,w,d,f,run){
  px.box(i+.1,j+.1,.8,.8,5,0,R.red,INK); /* 底座 */ /* …馬身 8×4、頭 3×5… */ }};
// 小人：3 px 寬、9 px 高；兩格步伐交替
px.kid(x,y,look,frame);
```

### ⑤ 像素字＋貼在面上的招牌

UI 字一律點陣字（DotGothic16／Silkscreen）；招牌字要**貼在等角面上**——左面 `skewY(26.565°)`、右面 `skewY(-26.565°)`；UI 框沒有圓角，四角各缺一格（階梯缺角）。

```css
.face-l{transform:matrix(1,.5,0,1,0,0);transform-origin:0 0}   /* 左面 */
.face-r{transform:matrix(1,-.5,0,1,0,0);transform-origin:0 0}  /* 右面 */
.win{border:3px solid #1B1A2E;clip-path:polygon(3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,
 100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),
 0 calc(100% - 3px),0 3px,3px 3px)}
```

## 3. 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 天空 | `#A8DDF0` | 頁面唯一大面積底；切塊浮在它上面 | ~45% |
| 墨 | `#1B1A2E` | 外輪廓、正文、窗框標題列、頁尾 | ~12% |
| 紙白 | `#FFFDF4` | 像素窗內底 | ~18% |
| 防水漆綠（頂／左／右） | `#5CC484` `#3E9A62` `#2B7148` | 屋頂地磚（兩種綠交錯）、確認按鈕 | ~8% |
| 奶油樓身 | `#FFF1D0` `#E9CFA0` `#C2A577` | 建築、女兒牆 | ~6% |
| 紅 | `#F0604A` `#C23B2C` `#88271E` | 木馬、主按鈕、強調 | ~4% |
| 黃 | `#FFD34D` `#E0A321` `#A6720F` | 現用態、代幣、排隊格 | ~3% |
| 藍／玻璃 | `#5B8CEB` `#3C66BF` `#29468A`・`#8FD3F0` | 摩天輪、窗、連結 | ~3% |
| 粉、青、木、鋼 | `#FF9DBC`・`#4FD1C5`・`#D39A5A`・`#C9DCE6` 各三階 | 遊具換色用 | 合計 ~1% |

規則：每個色都是三階一組；**不准**出現同一物件的第四階或任何漸層；透明度只有 0 與 1。

## 4. 字體系統

- 中文：**DotGothic16**（Google Fonts）；缺字回退 Noto Sans TC。
- 拉丁／數字標籤：**Silkscreen**，全大寫，字距 .04em。
- 字級（px）：64／44／30／26／18／16（內文）／14／12／11；行高內文 1.8、標題 1.25。
- 只有 400 字重——像素字沒有粗體，強調用底色塊（墨底白字、黃底墨字）。
- `-webkit-font-smoothing:none` 讓 macOS 上的點陣字別被糊掉。

## 5. 版面與網格

- 基本單位 `--u: 3px`：框線、缺角、按鈕側面都是 3 的倍數。
- 首屏：左大右小兩欄（`minmax(0,1fr) 330px`），左邊是切塊（pixorama-first），右邊是像素窗資訊。
- 零旋轉；唯一的「斜」只有 2:1 等角面上的貼面字。
- 留白：區塊之間 42px；像素窗內距 16–18px。
- 導覽固定在右側（電梯面板），≤900px 改為底部一列。

## 6. 元件配方

- **像素窗 `.win`**：3px 墨框＋四角缺一格；頂端 `.bar` 墨底、Silkscreen 12px 大寫、右側黃字小註。
- **方塊按鈕 `.blk`**：底下 6px 是方塊的「左面」（`inset 0 -6px 0 深一階`），左上 6px 是亮邊；按下沉 3px 並把側面收成 3px。
- **晶片 `.chip`**：紙白底＋3px 墨框＋底部 6px 奶油側面，前面一顆 12px 色塊。
- **電梯面板導覽 lift-panel**：鋼灰面板、墨底紅字樓層顯示（R／7F／6F／1F）、方塊按鈕；現用樓層＝黃色並沉 3px、左上角紅燈；換頁時樓層箭頭以 `steps(4)` 逐格跑。
- **工具提示 `.tip`**：同像素窗缺角，名字 18px＋Silkscreen 英文＋代幣數。
- **表單**：輸入框 `inset 0 0 0 3px` 墨框、零圓角、focus 3px 紅外框。
- **頁尾**：墨底、黃連結、Silkscreen 青色小標。

## 7. 動效規則

全站動畫 **8 fps 逐格**（每 125ms 一格），不補間；位移一律守 2:1。

| 種類 | 本站實作 | 觸發 | 時值 |
|---|---|---|---|
| ambient 環境 | 遊具自己轉（木馬帳篷條紋旋轉、摩天輪每格 π/48、小火車每格 0.012 圈、球池每 2 格重洗）、小朋友排完隊隨機換一台再走；街區圖愛河一格一格閃、公車機車 2px/1px 走 | 進入視窗 | 8 fps；離屏停 |
| input 輸入 | 游標下的遊具整台點亮白格＋提示框；遊具卡 hover／focus 從 2 fps 加速到 8 fps；包場編輯器跟著游標的格子預覽（白＝可放、紅＝不行） | pointermove／focus／方向鍵 | <16ms（同一格內重畫） |
| transition 轉場 | 換頁：4×4 Bayer 有序抖動 16 格由透明蓋到滿、新頁再由滿退開，`steps(1,end)` 逐格換 `background-image`；電梯樓層箭頭 `steps(4)`；樓層指南逐層點亮 | 點站內連結／捲入 | 420ms／125ms 一層 |
| signature 簽名 | **開園**：電梯門打開，小朋友照 BFS 最短路一格一格（每步 2px 橫 1px 縱）走到各遊具的排隊格，走到了那台才開始轉 | 首頁載入／包場頁「開園試跑」 | 每人間隔 5–6 格出門 |

`prefers-reduced-motion`：遊具停在單一影格、小朋友直接站在排隊格、抖動換頁取消、樓層燈直接全亮；所有數字與文字資訊不變。

### motion-library 元件（PLAYBOOK §2.8）

來源 `wenxiangxiao/motion-library` v1.11.0 @22220a4，`tools/ml-embed.js` 子集＋`src/motion-player.js`，每頁只嵌入該頁用到的 ID。**掛載方式：降解析度＋整數倍放大**——內層寬度＝外框寬 ÷（px × dpr），再 `transform:scale(px × dpr)`、canvas `pixelated`，讓元件的每一個 canvas 像素都變成 3–4 CSS px 的實心方塊，服從特徵①。

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-27 | Pixel Dissolve | index | text「今日開園」・primary #F0604A・secondary #5B8CEB・bg #A8DDF0・duration 1.6・loop false・seed 1965・px 4・16:9 | transition（一次性） | 開園時刻表的標題由方格一塊塊拼出來——像素流派本來就是方格，拼字過程就是本站的語言 |
| BG-B-32 | Pinwheels | index | primary #F0604A・secondary #FFD34D・bg #5CC484・duration 6・density 1.4・seed 42・px 4・容器高 132px 裁切 | ambient | 屋頂西南角的風車花園；三角扇葉全是平塗硬邊，無圓角無發光，降解析度後就是像素風車 |
| TXT-A-28 | Slot | rides | text「一枚 NT$20」・primary #F0604A・secondary #FFD34D・bg #FFFDF4・duration 1.8・loop false・seed 20・px 4 | transition（一次性） | 投幣機的滾輪：價錢像代幣機一樣轉出來；遊具頁就是投幣的地方 |
| SHP-20 | Confetti Burst | party | primary #F0604A・secondary #FFD34D・bg #FFFDF4・duration 2.2・loop false・seed 6・px 3・容器高 150px | input（送出預約才播） | 生日包場送出後的彩紙；矩形紙片降解析度後是 1–2 格的像素彩紙 |
| TXT-B-30 | Checker Words | visit | text「七賢三路」・primary #5CC484・secondary #F0604A・bg #FFFDF4・duration 1.6・loop false・seed 3・px 4 | transition（一次性） | 棋盤格長出街名——屋頂地磚就是兩種綠的棋盤 |

重現：`MotionLib.prompt('TXT-B-27')` 等可取得各元件原始開發 Prompt。文字元件的字色由 bg 亮度決定：本站三個文字元件都放在亮底（天空／紙白）上，得到近黑字。

## 8. 插畫與圖像風格（iso-pixel-kit 等角像素零件庫）

- 全站沒有一張點陣圖檔：所有圖都是 canvas 在原生解析度（184×206、216×172…）即時畫出來的，再整數倍放大。
- 原語只有五種：`box`（逐欄光柵化三面方塊）、`cyl`（等角圓柱）、`ell`（2:1 橢圓）、`ring`（中點圓演算法）、`line`（Bresenham）。
- 物件高度用 px、佔地用格；人 3×9、馬 8×4、吊籃 5×4、木馬帳篷 9 層。
- 臺灣頂樓的在地母題：綠色防水漆地磚、不鏽鋼水塔、電梯機房、女兒牆、背面朝天的百貨招牌。

## 9. Logo 與 Favicon 設計指南

- Logo（`assets/logo.svg`）：72×36 原生像素，由同一支引擎畫出、再逐列 run-length 轉成 SVG `<path>`（`shape-rendering="crispEdges"`）：一塊 2×2 綠屋頂浮空方塊上立一座紅白帳篷木馬，右側 3×5 自繪點陣字 TING／LAU 與四色代幣條。
- Favicon：16×16 inline SVG data URI，天空底＋菱形綠地磚＋紅白帳篷＋黃柱。
- 不准用字型渲染 Logo 文字；Logo 每一個點都是方格。

## 10. Do & Don't

**Do**
- 先決定原生解析度，再整數倍放大；所有座標取整。
- 一個物件一個色相三階；外輪廓墨線、內部只靠明度分面。
- 把在地細節做成零件（水塔、防水漆、鐵窗），讓切塊「塞滿」。
- 動作守 2:1、8 fps；動畫是逐格，不是補間。

**Don't**
- 不用 `ctx.arc()`／`stroke()`／`createLinearGradient()`、不用 CSS `border-radius`、不用 `filter:blur`、不用 `box-shadow` 模糊。
- 不把圖片 `width:100%` 拉伸成非整數倍。
- 不畫天空漸層、地平線或遠景——切塊就是全部。
- 不用 emoji、不用紫藍漸層、不用置中三卡片；不寫「EST. 19xx」徽章。
- 不用 30° 真等角（線會抖），只用 2:1。

## 11. 頁面骨架範例

```html
<nav class="lift" aria-label="電梯（網站導覽）">
  <div class="disp" aria-hidden="true"><span class="arw"></span><span class="fl">R</span></div>
  <ol><li><a href="index.html" data-fl="R" aria-current="page">R<small>樂園</small></a></li>
      <li><a href="rides.html" data-fl="7F">7F<small>遊具</small></a></li></ol>
</nav>
<main>
  <section class="hero">
    <div class="stage"><canvas id="roof" role="img" aria-label="等角像素鳥瞰…"></canvas>
      <div class="sign face-l"><b>七賢百貨</b></div></div>
    <aside class="win"><div class="bar"><span>TODAY · 本日</span><i>14:00</i></div><div class="in">…</div></aside>
  </section>
</main>
<script>
const px=new TL.Px(document.getElementById('roof'),184,206); px.X0=84; px.Y0=60;
TL.fit(px, document.querySelector('.stage'));          // 整數倍放大
TL.loop(px.cv, f=>{ px.clear('#A8DDF0'); TL.drawRoof(px, roof, f, {run:true}); }); // 8 fps
</script>
```

## 12. 技術實作與相容性

### 12.1 Canvas 2D 原生解析度＋`image-rendering: pixelated`＋ResizeObserver 整數倍（A 渲染層）

- 承載特徵①②③④：所有圖像以 `fillRect` 整數座標繪製，零路徑零反鋸齒；canvas CSS 尺寸＝原生寬 × s ÷ dpr，s 為整數（裝置像素倍數）。
- 支援度（查證）：MDN 將 `image-rendering` 列為 Baseline Widely available（2020-01 起）；caniuse `image-rendering: pixelated` Chrome 41+、Firefox 93+、Safari 10+、Edge 79+。`ResizeObserverEntry` Baseline Widely available（2020-07）；但 `devicePixelContentBoxSize` 在 caniuse 與 MDN 皆標 **Safari 不支援**（Chrome／Edge 84+、Firefox 93 部分／108 完整；WebKit bug 264158→219005）。
- Fallback：`observe(el,{box:'device-pixel-content-box'})` 包在 try/catch，Safari 改用 `Math.round(contentRect.width × devicePixelRatio)`——在非整數 dpr（如 1.25）時可能差 1 裝置像素，像素格仍是整數倍、只是邊緣可能有 1px 不均；`image-rendering` 不支援時退為平滑放大（變糊但資訊完整）。無 JS：canvas 不畫，所有遊具資訊在 HTML 清單與卡片上。

### 12.2 BFS 圖論：連通約束＋最短路（E 資料與生成層）

- 承載 signature 與 func：從電梯門口對 10×8 屋頂做 4 鄰接 BFS；每台遊具的「排隊格」＝佔地外框（不含斜角）上距離最近的可達空格；找不到＝被圍住，閃紅並禁止送出預約。小朋友的路徑由 `prev[]` 回溯，再以 1/4 格（＝2px 橫、1px 縱）逐格前進。
- 純 JS，無相容性問題。實測（node）：一次 BFS＋十台排隊格搜尋 ≈ 0.011 ms。

### 12.3 CSS `steps()` 逐格動畫與精靈圖（B 動效與時間軸層）

- 承載 transition：換頁的 4×4 Bayer 抖動是 17 個 keyframe，每格換一張 4×4 SVG data URI（背景 12×12px、`pixelated`），`animation-timing-function: steps(1,end)` 讓每段在結尾跳格；電梯樓層箭頭 12×4 精靈圖 `steps(4)`；遊具卡 ping 以 `steps(1,end)` 黃黑閃三下。
- 支援度：`steps()` 與 `animation-timing-function` 屬 Baseline Widely available；`background-image` 為離散動畫屬性，在 keyframe 之間以 50% 切換，配 `steps(1,end)` 後在每段結尾切換，各主流瀏覽器一致。
- Fallback：`prefers-reduced-motion` 時抖動層不建立、直接換頁；不支援 CSS 動畫時抖動層停在第一格（透明），不影響操作。

### 12.4 效能預算實測

| 項目 | 數值 |
|---|---|
| 單頁大小（含 inline motion-library 子集 ~111KB） | index 174KB／rides 167KB／party 173KB／visit 167KB（上限 350KB） |
| 首頁每格繪製 | 約 6,900 次 `fillRect`（node 計數）；node 樁環境 0.83 ms／格；瀏覽器內 8 fps，遠低於 16ms 預算 |
| BFS＋排隊格 | 0.011 ms／次 |
| 同畫面同時運轉的 motion-library 元件 | ≤2（首頁 TXT-B-27 一次性＋BG-B-32；其餘頁各 1） |
| 離屏 | 自製 8 fps 時鐘與 motion-library 皆以 IntersectionObserver 停止；元件離屏 destroy |

*本輪排程環境無法下載瀏覽器，未取得瀏覽器內 Performance 面板實測值；以上為 node 計數與估算，請下次有瀏覽器時補測。*
