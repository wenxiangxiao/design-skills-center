---
name: shin-hanga-mokuhanga
description: Taishō–Shōwa shin-hanga ("new prints", Watanabe Shōzaburō / Kawase Hasui / Yoshida Hiroshi, 1915–1950s) as a web style — every sky starts with a hand-wiped ichimonji-bokashi band at the top edge, large flat areas show goma-zuri speckle and woodgrain on washi, light is the unprinted paper left where a night block was wiped away, the sumi keyline fades to blue and then to nothing with distance, and each image is an ōban vertical sheet with a title cartouche, artist seal, publisher's round seal and kentō marks; the same keyblock is reprinted in several states of time and weather.
---

# 新版画 Shin-hanga（木版摺り・同版異摺）

> 範例站：雨燈 Hōo-ting（九份豎崎路燈籠所）。風格不綁產業：旅宿、茶屋、溫泉、渡船、酒藏、傘與燈具、季節性商品、任何「同一個地方在不同時刻長得不一樣」的品牌都適用。

**歷史座標**：1915 年前後，東京版元渡邊庄三郎（1885–1962，1906 年開業）想讓沒落的浮世繪木版重新有市場：沿用江戶的分工——絵師畫版下、彫師刻版、摺師摺紙、版元出資發行——但請受過西洋畫訓練的畫家作畫，畫面因此有了單一光源、大氣遠近、黃昏與雨夜、街燈與水面倒影。川瀨巴水（1883–1957）1918–19 年起在渡邊版元出風景，1925《東京二十景》的《芝増上寺》是代表作；吉田博（1876–1950）1925 年自設工房，1926 年《瀨戶內海集》的《帆船》用**同一組版木只換顏色**摺出朝・午前・午後・霧・夕・夜六張（初版 1921 的版木毀於 1923 年關東大地震）。主要買家是外國人：Toledo Museum of Art 1930 年即舉辦〈A Special Exhibition of Modern Japanese Prints〉。與「創作版画」（畫家自畫自刻自摺）是兩條路。

**為什麼長這樣**：水性顏料、櫻木版、和紙、馬連——它只能用這些。漸層做不出「工具拉的線性漸變」，只能在濕版上用刷毛抹，所以暈永遠是從版的邊緣開始的一道帶（一文字暈），邊緣帶著手的抖動；大面積平色要壓得均勻很難，壓輕了就出現細小白點，摺師後來乾脆把它當效果（ごま摺り）；版木的年輪會印上去；光不能「加」上去，只能讓紙不被印到——所以夜景是整張蓋一塊暗版、在燈和月亮處把墨擦掉；遠處的東西如果還用黑線圍起來，空氣就不見了，所以主版線往遠處換色、再往遠就不刻。顏料便宜、版木昂貴，所以同一塊主版換色版重摺，是這個流派天生的經濟學。

## 1. 設計哲學

- **一張紙就是一個畫面**。首屏不是 hero，是一枚大判直幅的版畫，資訊住在紙邊（題簽、落款、版元印、見当、版元的發行說明）。
- **顏色是一層一層摺上去的**，每一層都是透明的乘法；沒有一個顏色是「塗」上去的不透明色塊。
- **光是留下的紙**。最亮的地方永遠等於和紙底色。
- **同版異摺**：同一個構圖，時刻與天氣只改變色版的顏色與暈。內容可以不變，畫面每次不同。
- 安靜但不靜止：雲、霧、雨與燈火持續在動；換態時，馬連會刷過紙面。

## 2. 色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 和紙 washi | `#F1E8D6` | 頁面紙張、畫面最亮值、所有「光」 | 35–45% |
| 卓 table | `#D9CDB4` | 頁面底（紙放在工作桌上） | 15% |
| 墨 sumi | `#2B2622` | 主版線、正文 | 8% |
| ベロ藍 bero | `#2C4F8C` | 一文字暈、連結、晝的天空 | 10% |
| 夜藍 night | `#1C2541` | 夜版、夜間天空 | 依時刻 0–40% |
| 遠線藍 | `#3D5A80` | 遠景主版線 | 2% |
| 朱 shu | `#C23B26` | 版元印、題簽框、現用態、焦點 | ≤4% |
| 燈籠紅 | `#D2462E` | 燈籠色版 | ≤5% |
| 燈火 lamp | `#F2C14E` | 擦掉夜版後的暖光 | ≤3% |
| 柿 kaki | `#C9732F` | 油紙傘、柿漆 | ≤3% |
| 壁 | `#D9B98A`／木 `#6B4A30`／瓦 `#4C5763`／石 `#8E8C86`／山 `#4E7A6A`／海 `#3F6E9A` | 場景色版 | — |

時刻色票（天空 skyA／天邊 skyB）：朝 `#6E93BF`／`#F0B38C`，晝 `#2C5C9C`／`#F3E3C0`，夕 `#2A3F78`／`#E5763A`，夜 `#22305A`＋夜版 `#1C2541` 80%。霧：所有色版向灰收 50–60%；雨：天空向 `#5E6A80` 收 60% 並加雨版 `#5C6680`。
**規則**：零純白、零純黑；不得有 opacity 半透明白色疊上去造「亮」；所有顏色以乘法疊加（`color *= mix(1, ink, coverage)`）。

## 3. 字體系統

- 標題：**Shippori Mincho** 700（Google Fonts），字距 .04–.2em；漢字缺字由 Noto Serif TC 補。
- 正文：**Noto Serif TC** 400，16px／1.85。
- 歐文：**Cormorant Garamond** Italic 500——渡邊版元與 Toledo 1930 目錄式的英文副題（`Rain Lanterns at the Shuqi Steps, Kyūfun — Evening`）。
- 字級：h1 30–52px、h2 24–26px、h3 17–22px、紙邊說明 10–12.5px。
- 題簽與落款一律 `writing-mode: vertical-rl`。

## 4. 版面與網格

- 大判直幅：圖面比例 **1000:1470**（26.5×39 cm）。紙邊：上 3.4–4.2%、左右 3.8–4.6%、下 8–10.5%（寬度百分比）；下緣放落款、版元印與摺師名。
- 首頁：左 96px 固定導覽、中間一枚紙（高度貼齊視窗，`width:min(100%, calc((100vh - 44px) * .62))`）、右側 380px 發行說明欄（sticky）。
- 不對稱：紙偏左、說明靠右；內頁採 0.95:1.05 兩欄。
- 題簽在圖內右上（距上 3.2%、右 4%），落款在圖內左下；見当（L 形「鉤」與一字「引付」）在紙邊。
- ≤1100px 單欄；≤900px 導覽變底部列；≤560px 縮紙邊、六態 3 欄。

## 5. 元件配方

- **導覽（校合摺 kyōgō proofs）**：每一頁是一張 62×88 的小試摺，分兩層：`.key` 只有墨線（校合摺＝只摺主版的校對樣），`.col` 是彩色色版，以 `clip-path: inset(100% 0 0 0)` 藏起；hover／focus／現用頁時 `inset(0)` 由下往上「摺上顏色」（.38s）。現用頁下方一顆朱點。
- **按鈕**：朱色 1.5px 外框、明朝 700；按下（aria-pressed）整顆翻朱底紙色字——像蓋下去的印。
- **題簽**：`background:#F1E8D6ee; border:1.5px solid var(--shu); outline:1px solid var(--shu); outline-offset:2px; writing-mode:vertical-rl`。
- **卡片＝短冊**：直式紙條掛在一條墨線上，各自高低錯落、hover 微轉 −1.4°（彈性回彈），不圓角、陰影只有 `4px 5px 0 -1px #00000012` 的硬邊。
- **時刻尺**：一條 24 小時的色帶，每半小時取一次該時刻的天色＝它本身是一條摺好的漸層；拖曳、方向鍵、PageUp/Down 都可操作（`role="slider"`）。
- **頁尾**：版元印＋版元／摺師／竹骨署名＋虛構聲明。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

1. **ambient 環境**：著色器以時間 `t` 推動 あてなし雲（`fb(u.x*1.3+t*.006, …)`）、霧的水平飄移（`t*.012`）、雨版細線下落（`t*.55`）、燈火微閃（`.88+.12*noise(t*3.1)+.06*sin(t*7.3)`）；首頁每 30 秒依真實時鐘重算一次狀態。**降級**：`t` 固定為 0，畫面為該時刻的靜態一枚，資訊不變。
2. **input-driven 輸入**：拖時刻尺即時重摺（同一幀寫 uniform，無補間）；導覽試摺 hover 摺上顏色；〈你來摺〉的暈筆劃與馬連壓力即時寫入紋理。**降級**：仍即時，只是沒有 CSS 過渡。
3. **transition 轉場**：換頁時整張紙「剝がす」——`perspective(1200px) rotateX(-62deg)` .43s 掀起再導頁；新頁「置く」——從 `rotateX(18deg)` 放下 .62s。**降級**：直接換頁。
4. **signature 簽名〈馬連斜刷重摺〉**：換態時先 `copyTexImage2D` 擷取紙面舊摺，壓力前緣沿 `(x*.42+y*.9)/1.32` 斜向推過（1.5s，`1-(1-k)^2.2`），前緣後 13% 範圍內新摺帶芝麻摺白點與馬連圓弧壓痕，前緣之前仍是舊摺。**降級**：直接換成新態。

## 7. 插畫與圖像風格（mokuhanga-shader 木版摺り著色器）

- 圖像只由「區域」與「線」組成：每個物件＝一塊色版的形＋主版上的線。不畫陰影、不畫立體光；量感來自暈與疊色。
- 版序：空（一文字暈＋天邊暈）→ 山（嶺深腳淺）→ 海（水平線深、刻線波紋）→ 瓦 → 壁（芝麻摺最明顯）→ 木 → 石 → 燈籠 → 窗 → 傘 → 衣 → 主版線（近墨）→ 遠線（藍）→ 霧（退回紙）→ 夜版（擦光）→ 雨版。
- 人物是撐傘的背影，不畫臉。電線桿與電線是允許的現代物（巴水最愛）。

## 8. Logo 與 Favicon

- Logo：版元圓印——朱色粗外環＋細內環，圈內是一盞燈籠（燈籠紅自上而下暈淡、墨線肋骨、黑色上下蓋）與以直線方塊組成的「雨」字，背景上緣一道ベロ藍一文字暈與斜雨線。
- Favicon：簡化為朱環＋燈籠＋兩條紙色肋線，inline SVG data URI。

## 9. Do & Don't

- **Do**：每個天空都從上緣開始濃；大面積平色一定看得到紙纖維或芝麻摺；夜裡最亮的地方就是紙；遠景換藍線或不描線；畫面一定有題簽與版元印。
- **Do**：同一個構圖準備多個「態」，讓時間、天氣或使用者決定今天摺哪一態。
- **Don't**：用 CSS `linear-gradient` 從頂到底拉滿整片天空（那是工具漸層，不是暈）；用白色半透明疊出光；全畫等寬黑輪廓（那是浮世繪錦絵或清線派）；金屬光澤、霓虹 glow、模糊陰影。
- **Don't（去 AI 化）**：紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- **Don't（流派邊界）**：與浮世繪錦絵（平色、等寬墨線、無光源）、創作版画（自畫自刻自摺、刀痕粗）、表現主義木刻（黑白刀痕）、水彩（顏料暈開在紙上而非版上）分清楚。

## 10. 頁面骨架範例

```html
<nav class="proofs" aria-label="頁面（校合摺）">
  <a href="index.html" aria-current="page"><svg viewBox="0 0 62 88"><g class="col">…色版…</g><g class="key">…墨線…</g></svg><span>一枚</span></a>
  …
</nav>
<main class="wrap"><div class="home">
  <section class="stage"><div class="sheet oban">
    <div class="img"><canvas id="print"></canvas>
      <div class="cart">九份豎崎の雨燈<b>夜</b></div>
      <div class="sign">火旺畫<i>旺</i></div></div>
    <div class="kento kagi"></div><div class="kento hiki"></div>
    <div class="marg"><span>彫・畫・摺 署名<br><span class="en">Title — State</span></span><span class="pubmark">版元印</span></div>
  </div></section>
  <aside class="colophon">此刻・今日之摺／時刻尺／六態印章／發行說明</aside>
</div></main>
```

## 11. 本風格的 5 個不可省略特徵

### ① 一文字暈 ichimonji-bokashi（拿掉它，天空就是一張數位漸層）
天空的色版從紙的**上緣**開始濃，在 `band` 處淡為零；淡出線帶一點手抹的水平抖動；只佔天空上段，不貫穿畫面。

```glsl
float yb=u.y+.022*(vn(vec2(u.x*5.,2.))-.5)+.01*(vn(vec2(u.x*40.,9.))-.5); // 手抹的邊
float ichi=1.-smoothstep(band*.42,band,yb);                               // 只在上緣一道帶
col=ink(col,cSkyA,skyMask*ichi*kA*grain(u,1.));
```
```css
/* 無 WebGL 時的近似：硬停點做出「帶」而非全幅漸層 */
.sky{background:linear-gradient(180deg,#2C5C9C 0,#2C5C9Ccc 14%,#2C5C9C55 30%,transparent 46%),#F1E8D6}
```

### ② 芝麻摺＋木目＋和紙纖維（拿掉它，就變成平面插畫）
```glsl
float goma(vec2 u,float a){float n=.6*vn(u*R*.33)+.4*vn(u*R*.09);return 1.-a*smoothstep(.55,.74,n);}
float grain(vec2 u,float s){return .92+.08*sin(u.y*R.y*.16+5.*vn(vec2(u.x*3.+s,u.y*48.)));}
float fib=vn(u*vec2(R.x*.06,R.y*.9))*vn(u*vec2(R.x*.9,R.y*.05));  // 縱橫纖維
```
```css
.wall{background:#D9B98A;position:relative}
.wall::after{content:"";position:absolute;inset:0;opacity:.75;
  background:radial-gradient(circle,#F1E8D6 0 1.2px,#0000 1.6px) 0 0/7px 6px,
             radial-gradient(circle,#F1E8D6 0 .9px,#0000 1.3px) 3px 3px/9px 8px}
```

### ③ 光是擦掉的（拿掉它，夜景就變成數位「發光」）
夜版整張覆蓋，在燈、窗、月與濕石階倒影處降低覆蓋率；最亮值＝紙色，再淡淡疊一層燈火黃。

```glsl
float nc=nk*(1.-clamp(glow*1.05+moon+halo+refl*.9,0.,1.));
col=ink(col,cNight,nc);              // 夜版：被擦過的地方露出紙
col=ink(col,cLamp,(glow*.35+refl*.4)*nk*1.1);
```
```svg
<rect width="200" height="120" fill="#22305A"/>
<circle cx="120" cy="58" r="44" fill="#F1E8D6" opacity=".18"/><circle cx="120" cy="58" r="26" fill="#F1E8D6" opacity=".3"/>
```

### ④ 主版線漸隱（拿掉它，就退回浮世繪的等寬黑輪廓）
近景（z<5）墨線 2.1–2.6，遠景藍線 1.5，山與海**不刻線**；霧中墨線再淡 35%。

```js
lc = cv[o.far ? 'keyFar' : 'key']; lc.lineWidth = o.far ? 1.5 : (o.z < 2 ? 2.6 : 2.1);
// 山：O.push({r:'mtn', d:'M500 640C566 606 …Z'})  ← 沒有 l（線）
```
```css
.near{stroke:#2B2622;stroke-width:2.3}.far{stroke:#3D5A80;stroke-width:1.5}.distant{stroke:none}
```

### ⑤ 大判直幅＋題簽＋落款＋版元印＋見当（拿掉它，就只是一張圖）
```css
.oban{aspect-ratio:auto;padding:4.2% 4.6% 10.5%;background:#F1E8D6}
.img{aspect-ratio:1000/1470}
.cart{position:absolute;top:3.2%;right:4%;writing-mode:vertical-rl;background:#F1E8D6ee;
  border:1.5px solid #C23B26;outline:1px solid #C23B26;outline-offset:2px;padding:10px 5px}
.kento.kagi{right:3%;bottom:8.2%;width:22px;height:22px;border:solid #2b262255;border-width:0 1.5px 1.5px 0}
```
```svg
<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="none" stroke="#C23B26" stroke-width="4"/>
<circle cx="32" cy="32" r="22" fill="none" stroke="#C23B26" stroke-width="1.2"/></svg>
```

## 12. 技術實作與相容性

| 技術 | 層 | 本站承載 | 支援現況與查證 | 不支援時 |
|---|---|---|---|---|
| 原生 WebGL1 片元著色器（無函式庫） | A 渲染 | 全部 5 個特徵的畫面本體：14 張版遮罩 → 5 張 RGB 紋理（＋燈光／倒影圖），單一 fragment shader 依版序乘法疊色、暈、芝麻摺、木目、纖維、夜版擦光、雨版；`copyTexImage2D` 擷取舊摺做簽名動效；`toBlob` 存檔 | MDN〈WebGLRenderingContext: copyTexImage2D()〉Baseline Widely available（since 2015-07）；WebGL1 全面支援。片元精度用 `GL_FRAGMENT_PRECISION_HIGH` 判斷降為 mediump。使用 8 個 sampler（WebGL1 保證最小值 8）、約 25 個 uniform 向量 | 頁面預設就放一張由同一份場景幾何生成的靜態 SVG（平色＋SVG 線性漸層暈＋同樣的近墨遠藍線）；WebGL 建立失敗即保留它；〈你來摺〉顯示說明並停用操作 |
| matchMedia＋真實時刻驅動 | B 動效與時間軸 | `new Date()` → 24 小時 9 個關鍵影格 smoothstep 內插（天色、暈寬、夜版、燈、月、雲）；每日天氣由日期 FNV-1a 決定（晴 48%／霧 20%／雨 32%，頁面明示不是氣象）；`matchMedia('(prefers-reduced-motion: reduce)')` 關閉時間動畫與斜刷 | MDN〈Window.matchMedia()〉Baseline Widely available（since 2015-07）；`prefers-reduced-motion` Baseline（since 2020-01） | 無 matchMedia 時（try/catch）視為未要求減動 |
| Pointer Events（pressure） | D 輸入與感測 | 時刻尺拖曳；〈你來摺〉暈筆劃（停筆 y＝暈寬，平均壓力＋速度＝濃度）與馬連壓力圖（`.07+.12*pressure` 的徑向印，`lighter` 累加進 100×147 canvas → 紋理） | MDN〈PointerEvent: pressure〉Baseline Widely available（since 2020-07）；滑鼠按下恆為 0.5 | 鍵盤：時刻尺方向鍵；暈用兩個 range；馬連用「自動摺」（空白鍵）蛇行路徑 |

**效能（實測／估算）**：
- 頁面大小：index 83 KB、suri 85 KB、hanmoto 80 KB、toro 26 KB（全部 inline，≤350 KB）。
- 版遮罩建置（520×764，14 張＋打包）：以 Skia（@napi-rs/canvas）在建置機上實測 **44 ms**；600 寬 75 ms，故首頁採 520。物件以 bbox 只對相交的先前區域做 `destination-out`，比全區擦除快約 25%。
- 片元著色器：每像素約 12 次紋理讀取＋約 30 次 value-noise；DPR 上限 1.5（hanmoto 1.25）、離開視窗（IntersectionObserver）或分頁隱藏即停 rAF。
- 驗證方式：建置環境沒有可用的瀏覽器／GPU，著色器以 `@shaderfrog/glsl-parser` 檢查語法，再用 `glsl-transpiler` 轉成 JS、在 CPU 上逐像素實際渲染六態與〈你來摺〉壓力模式並目視比對；頁面邏輯以 jsdom＋WebGL 替身跑完整操作流程（含無 WebGL 與 reduced-motion 兩種模式）。**實機 GPU 幀時間尚未量測**，上線後請以 DevTools Performance 確認主要動畫 60fps。
- 注意：`smoothstep(e0,e1,x)` 在 GLSL 中 e0≥e1 為未定義行為，反向要寫 `1.-smoothstep(e1,e0,x)`。

## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-A-20` | Diagonal Lines | primary #5C6680／secondary #2C4F8C／bg #F1E8D6、duration 9、density 3、intensity 0.5、seed 1918 | ambient：雨版：一條和紙底上斜向平移的細雨線帶，只用直線與平色、無發光無漸層，延續首頁「九份的雨夜」而不搶版畫本體 |
| toro.html | `TXT-B-17` | Water Reflection | primary #D2462E／secondary #2C4F8C／bg #F1E8D6、text 雨燈、duration 2.2、aspectRatio 16:9、seed 5（一次性，進視窗播放、點擊重播） | input：店名浮出後在濕石階般的水線下留一道晃動倒影——特徵③光與倒影是「留下的紙」而非發光，燈籠紅只用在水線 |
| hanmoto.html | `TXT-A-30` | Reveal Outline | primary #3D5A80／secondary #2B2622／bg #F1E8D6、text 主版、duration 1.8、aspectRatio 16:9、seed 11（一次性，進視窗播放） | input：先用遠線藍描出字的輪廓（校合摺只摺主版），再摺上墨色——把版元頁講的「主版線→色版」工序演一次 |
| hanmoto.html | `BG-B-20` | Wave Lines | primary #4E7A6A／secondary #3F6E9A／bg #F1E8D6、duration 12、density 1、intensity 0.8、seed 1926、scroll true（捲動驅動） | input：山色版到海色版一層層平色疊摺、半透明交疊處自然變深＝乘法疊色的版序；隨捲動推進，像吉田博同版換色 |
| suri.html | `TXT-A-02` | Letter Sequence | primary #C23B26／secondary #2C4F8C／bg #F1E8D6、text 摺一枚、duration 1.6、aspectRatio 16:9、seed 3（一次性，進視窗播放、點擊重播） | input：「摺一枚」逐字由下往上浮出——像摺師一枚一枚把色版摺上去，字一個一個出現在紙上；只動位移與不透明度，紙色底、無發光無漸層，貼合本頁的工序體驗。 |
