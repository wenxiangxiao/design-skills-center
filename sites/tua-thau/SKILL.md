---
name: yakusha-okubi-e-kira-mica
description: Ukiyo-e actor "big-head" portraits (yakusha ōkubi-e, Sharaku/Tsutaya 1794) for the web — a bust cropped by the frame on a dark brushed-mica ground that glints only toward the light, carved key-block lines that swell and taper, flat registered colour blocks with hand misregistration, kewari hairlines, vertical cartouches with signature, censor seal and publisher mark.
---

# 役者大首繪・黒雲母摺 Yakusha Ōkubi-e on Dark Mica（寫樂／蔦屋半身）

> 範例站：`sites/tua-thau`（大頭戲卡舖，臺北萬華的歌仔戲應援小卡）。型錄「在地與文化視覺｜浮世繪 Ukiyo-e」條目的第二站；第一站 `horigoi` 是三枚続的ベロ藍風景與波，本站是**單人半身＋暗雲母地**——兩站 mood、主色相、開場三者皆不同。本規格書不綁產業：任何「賣一張臉、一個角色、一位主角」的品牌都適用——劇團、樂團周邊、選手卡、角色商品、肖像攝影、人物專訪。

## 1. 設計哲學

浮世繪的役者繪（actor prints）是江戶劇場的應援商品：戲迷在繪草紙屋用一碗蕎麥麵的錢買下喜歡的演員。1794 年（寛政六年）五月，版元**蔦屋重三郎**替一位沒人聽過的畫師**東洲齋寫樂**一口氣出版二十八張大判「大首繪」——只畫胸像、臉占畫面一半、背景是暗色的**黒雲母摺**。雲母粉調膠刷滿背景，是昂貴且需要專門工房的做法，只有大版元做得起。寫樂不美化演員：鷹勾鼻、下垂的嘴、亮相時往鼻樑收的「寄り目」，十個月後他就從出版界消失了。

這個風格的形狀全部來自木版印刷的限制：

1. **一個顏色一塊版**，所以顏色只能平摺、面與面之間不暈染；細節由墨色的主版（key block）承擔。
2. **線是刀刻出來的**：起刀細、中段肥、收刀尖（肥痩）；頭髮刻成整塊墨，髮際再刻一排髮絲（毛割 kewari）。
3. **手摺一定對不準**：見当（kentō）對位總有一根頭髮的誤差，色會從墨線邊露出來。
4. **雲母只刷背景**：臉（胡粉）、衣服不刷，所以人物永遠是啞光的，背景才會閃——而且只在你轉動紙張、某幾片雲母對到光時閃。

一句話：**暗而會閃的地、啞光的白臉、刀刻的墨線、平摺的版色、直排的題簽。**

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，就不再是這個風格。

### ① 黒雲母摺：背景是唯一會反光的東西

背景是暗銀灰（#2F2B28–#3A3531），帶刷毛方向的疏密，上面散著小片雲母；**亮點只出現在朝向對到光的那幾片**，光源一動亮點就換一群。人物、題簽、衣服一律啞光。全站唯一允許的漸層就是雲母的光。

```css
/* 靜態備援：雲母地＋細片 */
.mica{background-color:#3A3531;background-image:radial-gradient(rgba(207,200,184,.55) .6px,transparent 1px),radial-gradient(rgba(207,200,184,.3) .5px,transparent .9px);background-size:5px 6px,13px 11px}
/* 光：由 JS 把 --lx/--ly 綁到游標或傾角 */
.mica::after{content:"";position:absolute;inset:0;mix-blend-mode:screen;background:radial-gradient(ellipse 38% 30% at var(--lx) var(--ly),rgba(230,222,204,.42),transparent 65%)}
```
```glsl
/* 即時版（WebGL 片段著色器核心）：每片雲母一個 2D 朝向，對到光才亮 */
vec2 cell=floor(p/2.6); float r=h(cell); vec2 nr=vec2(h(cell+3.1),h(cell+7.7))*2.-1.;
vec2 v=L-(uv-.5)*.7; float a=dot(normalize(nr),normalize(v));
float sp=pow(max(0.,a),36.)*step(.5,r);   /* 一半的格子是雲母片，36 次方讓它只在對準時亮 */
```

### ② 大首的裁切：頭占一半，肩膀被畫框切掉

大判直式 300:440（約 26.5×39 cm）。頭（含頭飾）占畫面高度 ≥45%，四分之三側臉朝畫面一側，臉偏離中心往視線方向；肩膀在下緣被切斷，不畫手臂全貌。首屏的 print 要比視窗高（本站 118vh），讓視窗下緣像畫框一樣切過肩膀。

```css
.pbox{position:absolute;left:50%;top:4vh;height:118vh;aspect-ratio:300/440;transform:translateX(-52%)}
.stage{height:100vh;overflow:hidden}   /* 視窗就是畫框 */
```

### ③ 主版：肥痩的刀刻線＋整塊墨髮＋毛割

輪廓分段刻（額到鼻尖一刀、鼻翼一刀、唇一刀、下巴到頰一刀），不是一條封閉描邊。每一刀是**填色的多邊形**，寬度沿線變化：起刀 25–30%、三分之一處 100%、收刀 10–15%。頭髮一律整塊 #1C1815，髮際刻 0.6px 細髮線。

```js
/* 一刀：Catmull-Rom 取樣後依位置算寬度，左右各偏移半寬再封成多邊形 */
function brush(pts,w,a=.28,b=.12,pk=.33){ const P=catmull(pts,3),L=[],R=[];
  P.forEach((p,i)=>{const t=i/(P.length-1),q=t<pk?a+(1-a)*Math.sin(t/pk*Math.PI/2):b+(1-b)*Math.cos((t-pk)/(1-pk)*Math.PI/2);
    const n=normal(P,i);L.push([p[0]+n[0]*w*q/2,p[1]+n[1]*w*q/2]);R.push([p[0]-n[0]*w*q/2,p[1]-n[1]*w*q/2]);});
  return 'M'+L.join('L')+'L'+R.reverse().join('L')+'Z'; }
```
```svg
<g class="blk-k" fill="#1C1815"><path d="M126,136L114,152…Z"/><!-- 額→鼻尖 --></g>
```

### ④ 版色：平摺、限色、手摺錯位

色票只有版木用得出來的幾色：紅（紅 beni #C93C5E、淡紅 #EBA5B3）、紫 #6B4A7C、黃 #D7A63A、藍 #355A78、弁柄 #9E4529、胡粉 #F4EDE0（臉）、墨 #1C1815。**零漸層、零描邊色、零陰影、零透明**。每一塊色版各自 `translate(±1.2px,±1.1px)`（同一 seed 決定），主版不動——色會從墨線邊緣露出來。

```html
<g class="blk-c">
  <g transform="translate(0.8,-0.6)"><path d="…" fill="#355A78"/></g>  <!-- 藍版 -->
  <g transform="translate(-1.1,0.4)"><path d="…" fill="#C93C5E"/></g> <!-- 紅版 -->
</g>
<g class="blk-k" fill="#1C1815">…</g>  <!-- 主版：最後疊、不偏 -->
```

### ⑤ 題簽・落款・改印＋役者紋：全部直排

右上角一個直式題簽（和紙底、墨框、內框留白一道），寫役名與演員；左下落款「○○画」＋圓形朱印「極」（改印 censor seal）＋直長的版元印；肩上一枚役者紋（家紋式的圓形徽，胡粉底、衣色紋）。文字一律 `writing-mode: vertical-rl`。

```css
.cart{writing-mode:vertical-rl;background:#EADFC7;color:#1C1815;border:2px solid #1C1815;box-shadow:inset 0 0 0 3px #EADFC7,inset 0 0 0 4px #1C1815;padding:14px 12px;font-family:'Yuji Syuku',serif}
.seal{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#C93C5E;color:#F4EDE0}
```
```html
<div class="cart">陳三<small>曾月霞</small></div>
<div class="rakkan" style="writing-mode:vertical-rl">大頭舖画<span class="seal">極</span></div>
```

## 3. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| mica | #2F2B28 | 頁面地（帶細片點） | ~45% |
| mica2 | #3A3531 | 版面雲母地、現用導覽 | ~10% |
| micaHi | #CFC8B8 | 雲母細片、雲母光、次要字 | ~5% |
| washi | #EADFC7 | 題簽、和紙板 | ~22% |
| gofun | #F4EDE0 | 臉、暗地上的正文 | ~6% |
| sumi | #1C1815 | 主版、頭髮、框 | ~6% |
| beni / beniL | #C93C5E / #EBA5B3 | 紅版、朱印、主要按鈕／胭脂 | ~3% |
| mura | #6B4A7C | 紫版 | ≤1% |
| ki | #D7A63A | 黃版、focus、小標 | ≤1% |
| ai | #355A78 | 藍版、卡冊布面 | ≤1% |
| bengara | #9E4529 | 弁柄版、木目 | ≤1% |

規則：版色只出現在**人物、題簽、印**上，頁面大面積只有雲母與和紙兩種。

## 4. 字體系統

- 毛筆標題：**Yuji Syuku**（Google Fonts）——題簽、h1、落款、印。缺字回落 Noto Serif TC。
- 內文：**Noto Serif TC** 400／700／900。
- Scale：h1 54–92px（直排）、題簽 20–36px、h2 22–40px、內文 15–16px／行高 1.75（直排段落 2.15）、說明 12–14px。
- 數字在直排中用漢數字（一八〇元）或 `text-combine-upright:all`（兩位數以內）。

## 5. 版面與網格

- **首屏**：左 1.3fr 是一張大首（被視窗切掉肩膀），右 .7fr 是一塊直式店招（h1 題簽＋直排副題＋直排營業事實）。不置中、不對稱。
- **直排段落**：`.col{writing-mode:vertical-rl;height:30em;overflow-x:auto}`，標題柱放在右側（直排讀序從右開始）。手機 ≤560px 改橫排。
- **番付式價目**：`flex-direction:row-reverse`，每一品項一欄直排，品名在上、價格在下。
- **卡冊**：兩頁對開、每頁 3 張、`direction:rtl` 讓「一」在最右。
- 零旋轉（人物頭部 −7°～+9° 的傾除外）、零圓角矩形；只有朱印是圓。
- 留白：區塊之間 72px；框線 2px 墨。

## 6. 元件配方

- **導覽（雲母題簽 mica-slip-nav）**：右上 44×150px 直式題簽，和紙底墨框；現用頁的那一張被「刷了雲母」（暗地＋細片＋跟著 --ly 走的光）並加長到 176px。hover 以 `steps(3)` 落下 12px。≤560px 改為底部三等分。
- **按鈕**：`border:2px solid #1C1815;background:#C93C5E;color:#F4EDE0`，hover 位移 −2px 並出一道 3px 實色墨影（`steps(2)`）；次要按鈕為和紙底。
- **卡片**：一張卡＝一張 300:440 的大首＋右上題簽＋左下編號；放在藍布卡冊的半透明卡套裡；hover 依游標 3D 傾 ±8°，雲母光跟著游標反向移動。
- **表單／選擇**：用和紙方塊按鈕，選中態改成雲母地白字（與導覽同一語彙）。
- **頁尾**：落款列——店名（毛筆）、地址、連結、建置標示，以 2px micaHi 線與正文分開。

## 7. 動效規則

| 種類 | 本站自製實作 | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **行燈搖光**：閒置 2.2s 後光源以 Lissajous（0.37／0.53 Hz）慢慢晃，亮度 7.3／17.9 Hz 微閃；全頁雲母光與 WebGL 雲母跟著動 | 時間 | 每幀趨近 3% | 光固定在左上，不動 |
| input 輸入 | **瞳孔跟游標**＋**雲母隨游標／傾角換亮點**；卡片 hover 3D 傾 | pointermove／deviceorientation／Alt+方向鍵 | rAF 一幀內（<16ms） | 瞳孔與光仍即時跟（使用者自己在動），卡片不傾 |
| transition 轉場 | **摺り順進場**：主版先出（`steps(4)` .34s）→ 每塊色版以馬連刷過的 `clip-path` 由左到右 .42s、間隔 .11s → 開眼 → 雲母斜向刷上；換頁時一張和紙以 `steps(5)` 推過（「摺」字）；卡冊點開以 FLIP 放大；換卡時對方的卡 `rotateY` 翻面 `steps(6)` | 載入／點擊 | 見左 | 全部直接呈現終態 |
| signature 簽名 | **睨み・寄り目**：點臉（或 Enter），兩眼瞳孔瞬間往鼻樑收（近眼 −3.4px、遠眼 +2.6px），頭往前一頓（−2.2°，`steps(5)` .52s），WebGL 雲母一道斜光掃過畫面，旁邊直排跳出戲迷的大向う「好！」 | click／Enter | .52s／掃光 .65s | 寄り目照做（資訊），不頓、不掃光，「好！」直接顯示 |

自我限制：**不用淡入當進場**（進場一律是摺り順）；**不做平滑補間的位移**（頭頓、題簽落下、翻卡都用 steps，像手摺與木偶的一格一格）。

### motion-library 元件表（`wenxiangxiao/motion-library` 1.26.0 @9ba51588）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 動效種類 |
|---|---|---|---|---|---|
| TXT-B-36 | Ink Bleed | 首頁「本季」 | text「本季 陳三五娘」, colors {primary #1C1815, secondary #C93C5E, bg #EADFC7}, duration 2.6, loop:false, seed 1794, 16:9 | 墨從紙裡暈出字——主版墨摺上和紙那一瞬間；和紙亮底得到近黑字 | transition（一次性） |
| BG-A-29 | Topo Lines | 首頁「一張卡，九塊版」 | colors {primary #9E4529, secondary #1C1815, bg #EADFC7}, duration 16, density 1.3, intensity .55, seed 1971, 16:9 | 等高線＝山櫻版木的木目（每五圈一道深紋＝年輪），慢慢呼吸；零圓角零發光 | ambient |
| TXT-B-10 | Stop Motion | 卡目頁標題 | text「六枚揃」, colors {primary #C93C5E, secondary #1C1815, bg #EADFC7}, duration 1.8, loop:false, seed 6 | 12 fps 一格一格把字「摺」出來，和手摺一張一張出來的節奏相同 | transition（一次性） |
| BG-B-21 | Ripple Rings | 換卡頁櫃台角 | colors {primary #C93C5E, secondary #D7A63A, bg #EADFC7}, duration 6, density .8, intensity .7, seed 5, 1:1 | 櫃台叫號鈴的聲波——同心圓是紋的圓，零漸層零發光 | ambient |
| TXT-A-21 | Link Circle | 換卡完成的卡冊封面 | text「換」, colors {primary #C93C5E, secondary #CFC8B8, bg #3A3531}, duration 1.4, loop:false, seed 7, 1:1, manual | 朱色圓印蓋下、字挖白——就是改印「極」的形；放在雲母地上 | transition（一次性） |

元件的開發 Prompt 可以 `MotionLib.prompt(id)` 取得。掛載一律經站內 `TT.ml`：等 `document.fonts.ready`、離屏 `destroy()`、回到視窗重掛、一次性元件 `loop:false` 播一次、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`、reduced-motion 時背景 `seek(.35)`／文字 `seek(1)`。同一畫面同時運轉的元件 ≤2。元件不擔任 signature。

## 8. 插畫與圖像風格（大首版下組件 okubi-hanshita-kit）

全站零圖檔。六張大首由同一組件以參數產生：

- 臉：四分之三側臉（朝左），額→鼻尖→鼻翼→唇→下巴→頰分 5 刀；耳、頸各 1–2 刀。
- 行當參數：頭飾（文生巾、旦的髮髻與頭面、丫鬟髻、三花小帽＋鼻樑豆腐塊、紗帽＋黑三髯、大花扎巾＋臉譜）、眉的粗細與上挑、瞳孔偏移、口型（閉、小、咧、下垂）、胭脂版、傾角。
- 衣：左右兩片肩＋兩層衿（交叉成 V 而非 X）＋一種小紋（菱、點、十字、波）＋肩上役者紋。
- 每張卡以 `seed` 決定各色版的錯位量。
- 不臨摹任何一張既有的寫樂作品；人物、紋、劇團皆為虛構。

## 9. Logo 與 Favicon

Logo：雲母地上一個朝左的白臉側像（黑帽、紅帽緣、一眼一眉一唇）、藍衣紅衿，右側一枚直式題簽「大頭」＋朱圓印。Favicon 32×32：雲母地、白臉、墨髮、一眼、紅唇，inline SVG data URI。

## 10. Do & Don't

**Do**
- 讓背景是唯一會閃的東西；人物永遠啞光。
- 線分段刻、有肥痩；頭髮整塊墨＋毛割。
- 每塊色版各自錯一點點。
- 所有標示直排；落款＋圓印＋版元印成組出現。
- 讓視窗切掉肩膀。

**Don't**
- 不要把雲母做成整片均勻的金屬漸層或發光（那是 Art Deco 或玻璃擬態）。
- 不要描邊色（彩色外框）、不要陰影與模糊、不要圓角卡片。
- 不要把臉放正中、不要全身像、不要畫手持麥克風的現代偶像（畫戲中角色）。
- 去AI化禁令照舊：無紫藍漸層、無置中三卡、無 emoji、無 Lorem ipsum、無「EST.」徽章。
- 不要臨摹真實的寫樂作品或用真實演員的臉。

## 11. 頁面骨架範例

```html
<nav class="slips"><a class="slip on" href="index.html" aria-current="page">大首・本舖</a><a class="slip" href="cards.html">六枚・卡目</a></nav>
<section class="hero">
  <div class="stage">
    <div class="pbox">
      <div class="print" role="button" tabindex="0"><!-- svg 300×440：mica-st / blk-c / jolt>hd>(blk-c,blk-k,pupil) / blk-k --></div>
      <canvas class="mica-gl" aria-hidden="true"></canvas>
      <div class="cart hcart">陳三<small>曾月霞</small></div>
    </div>
    <div class="rakkan">大頭舖画<span class="seal">極</span></div>
  </div>
  <div class="sign"><h1 style="writing-mode:vertical-rl">大頭戲卡舖</h1><ul class="facts" style="writing-mode:vertical-rl">…</ul></div>
</section>
<section class="story washi"><div class="col" style="writing-mode:vertical-rl;height:30em">…</div><h2>店的來歷</h2></section>
```

## 12. 技術實作與相容性

### 12.1 所用 API 與查證

| 技術 | 層 | 承載 | 支援現況（查證） |
|---|---|---|---|
| 原生 WebGL 片段著色器（無函式庫） | A 渲染 | 特徵①、signature 的掃光、首屏 | WebGL 1 為 Baseline Widely available（MDN `WebGLRenderingContext` 相關頁：各瀏覽器自 2015-07 起支援） |
| DeviceOrientation＋游標替代 | D 輸入 | 雲母的光源、input 動效 | MDN〈Device orientation events〉；`DeviceOrientationEvent.requestPermission()` 非 Baseline、僅安全環境、需使用者手勢（iOS 13+）；Chrome on Android 非 HTTPS 時不給值 |
| `writing-mode: vertical-rl`（＋`text-combine-upright`） | C 版面 | 特徵⑤、導覽題簽、店招、來歷、番付價目、戲迷對話 | MDN `writing-mode` Baseline Widely available（web-features：2019-09-27 起；Safari 10.1 起） |

來源：MDN〈Device orientation events〉、MDN〈DeviceOrientationEvent: requestPermission()〉、MDN〈writing-mode〉、web-platform-dx web-features explorer〈writing-mode〉、MDN〈WebGLRenderingContext〉系列頁。

### 12.2 Fallback 具體行為

- **無 WebGL**：`TT.mica()` 回傳 null，不加 `.gl`，SVG 內的靜態雲母（暗地＋`<pattern>` 細片）照常顯示；全頁雲母光（CSS radial-gradient＋`--lx/--ly`）仍跟游標。
- **無 DeviceOrientation 或未允許**：光源改用游標；觸控裝置拖動手指同樣會更新光；閒置 2.2s 後交給行燈搖光。iOS 顯示「允許傾斜看雲母」按鈕（`requestPermission` 需手勢）。
- **無 JavaScript**：首頁有建置期烤好的大首 SVG（含靜態雲母）與全部文字；卡目頁 `<noscript>` 給一張大首與六張清單與價格；換卡頁 `<noscript>` 說明實體換卡日。
- **reduced-motion**：見第 7 章表格；WebGL 只在輸入時重畫，不跑行燈。
- **不支援 vertical-rl 的極舊瀏覽器**：退回橫排，資訊不缺。

### 12.3 效能

- 單頁：index 309KB、cards 306KB、trade 284KB（含 motion-library 子集 232KB，皆 ≤350KB）。
- WebGL：全螢幕三角形一次 draw、`devicePixelRatio` 上限 1.5、離屏（IntersectionObserver）停畫。
- 大首 SVG 每張約 20–25KB；換卡頁以 `<symbol>`＋`<use>` 共用，避免重複。
- 首屏 JS：建置期已烤好首屏，載入時只重掛當日看板一張（字串拼接＋innerHTML，量測於 node 端組件生成六張 < 15ms）。
