---
name: hourloupe-cell-hatch
description: Jean Dubuffet's L'Hourloupe (1962–1974) as a web style — an all-over field of meandering black-outlined cells, filled only with red or blue parallel ballpoint hatching, white, and the odd solid black, where figure and ground dissolve into the same jigsaw.
---

# 浮路細胞排線 Hourloupe Cell-Hatch — 風格規格書

> 範例站：撿著了 KHIOH-TIO̍H 遺失物寄還社（`sites/khioh-tioh/`）。本規格不綁產業：任何「東西很多、要一眼篩選」的題材（失物、二手市集、圖書館、零件行、托兒所置物櫃）都能用。

## 設計哲學

**流派血緣（既有型錄流派，非自創）**：Jean Dubuffet〈L'Hourloupe〉系列，巴黎，1962 年夏至 1974 年。起點是畫家講電話時隨手用**紅、藍原子筆**畫的塗鴉——閉合的蜿蜒輪廓被切成一格一格，再用平行斜線塗滿。1962 年先做成一本剪貼小冊（原子筆畫剪下貼在黑紙上，配自創語言文字），書名 *L'Hourloupe* 是他自造的字。之後十二年擴展到繪畫、聚苯乙烯與環氧樹脂雕塑、可走進去的 *Jardin d'hiver*（龐畢度藏）、Kröller-Müller 美術館的 *Jardin d'émail*（1968 模型、1974 年完成足尺）、Périgny-sur-Yerres 的 *Closerie Falbala*（1975 完成），以及 1973 年先在紐約古根漢、同年秋天在巴黎大皇宮演出的「會動的畫」*Coucou Bazar*。

**它為什麼長這樣**：工具就是規則。原子筆只畫得出等寬的線、只有紅藍黑三種常見墨色；講電話時手不停，線就一直繞、繞回自己閉合；閉合了就想把格子塗滿，原子筆塗滿只能一條一條排線。所以：**線等寬、格閉合、色只有紅藍、填色是排線**。Dubuffet 刻意讓人物、物件與背景用同一套格子畫，形與地溶在一起，觀者要「找」才看得出形。

**本規格的三句話**：
1. 整個畫面是一張拼圖：每一處都屬於某一格，沒有空白、沒有「底」。
2. 只有四個顏色：白、黑、紅、藍；紅藍只以「平行排線」或極少量實塗出現。
3. 物件不靠顏色從背景跳出來，只靠**稍粗的外輪廓**與**格子變小**被辨認——找，是這個風格的樂趣。

**與相鄰流派的分界**：
- 與「Matisse 剪紙」不同：那是飽和平色的大形，本流派是被切碎的格與排線。
- 與「孟菲斯 Memphis」不同：那有 squiggle 圖樣與粉彩，本流派零圖樣、零粉彩，線永遠是閉合邊界。
- 與「彩繪玻璃 / 花窗」不同：那的鉛條分格是為了透光與色塊，本流派的格是塗鴉的閉合、填的是排線不是色玻璃，且無對稱、無圖像學。
- 與「Art Brut 粗獷藝術」泛稱不同：本規格只取 Hourloupe 這一個系列的視覺文法（紅藍黑白＋排線＋細胞），不含 Dubuffet 其他時期的厚塗泥土質感。
- 與「漫畫網點 / 半調」不同：灰階不存在；排線是一格一個方向、等寬，不表現明暗。

## 本風格的 5 個不可省略特徵

拿掉任何一項，就不是 Hourloupe 了。

### ① 閉合蜿蜒細胞：黑色等寬粗線，畫面零空白
每一處都屬於某個閉合格。線是**等寬**的馬克筆／原子筆黑線（螢幕上 2–3px；物件外框 5–6px），**蜿蜒、無直線、無正圓、無尖角**。格子大小不一但不極端（最大格 ≈ 最小格的 4 倍）。

```css
/* CSS 細胞：填色層用 clip-path 抖動多邊形，外框另用一層 SVG 描（clip-path 會把 border 切掉） */
.cell{position:relative;isolation:isolate;padding:22px 26px}
.cell>.cf{position:absolute;inset:0;z-index:-1;clip-path:polygon(3.1% 1.9%,22% 3.4%,47% 1.6%,71% 2.8%,96.2% 3.5%,98.4% 28%,97.1% 55%,98.6% 81%,95% 97.9%,64% 96.6%,38% 98.1%,4.4% 96.2%,1.7% 70%,2.9% 41%,1.6% 15%)}
.cell>.co{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.cell>.co path{fill:none;stroke:#141414;stroke-width:3.4;vector-effect:non-scaling-stroke;stroke-linejoin:round}
```
相鄰兩格的共用邊必須抖得一模一樣（拼圖咬合）：抖動量用「排序後端點＋邊上取樣點座標」雜湊決定，方向用排序後的法向量（見站內 `KT.wobPoly`）。

### ② 四色鎖死：白 #FBFAF6、黑 #141414、紅 #D7261E、藍 #1F4FBF
零漸層、零陰影、零透明、零第五色。紅藍是原子筆墨色：紅偏朱、藍偏群青。

```css
:root{--w:#FBFAF6;--k:#141414;--r:#D7261E;--b:#1F4FBF}
```

### ③ 平行排線填格：一格一個方向，紅或藍
大部分有色格是**等寬平行斜線**（墨寬 2.5px／間距 6.2px，約 40% 覆蓋），每格角度不同（−90°～90° 隨機）；白格約 30–60%；實黑格 ≤ 4%；實紅／實藍格 ≤ 4%，只用來點睛。同一格內絕不混紅藍。

```css
@property --hi{syntax:'<length>';inherits:true;initial-value:2.5px}
@property --ha{syntax:'<angle>';inherits:true;initial-value:-35deg}
.hr,.hb{background:repeating-linear-gradient(var(--ha),var(--c) 0 var(--hi),var(--w) var(--hi) 6.2px)}
.hr{--c:var(--r)}.hb{--c:var(--b)}
```
```svg
<pattern id="kr" width="6.2" height="6.2" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
  <rect width="6.2" height="6.2" fill="#FBFAF6"/><rect width="2.5" height="6.2" fill="#D7261E"/></pattern>
```

### ④ 形地溶解：物件與背景同一套格子，只靠外框粗細與格子大小分辨
物件內部的格比背景小（背景格 ≈ 70px，物件格 ≈ 物件尺寸 × 0.32，最小 15px）、外框加粗到 2 倍；**不給物件換底色、不加陰影、不加白邊**。標題字也一樣被切成格（見站內 `masks`）。

```js
// 單像素判定：同一區（物件 or 背景）裡，離「被雜訊扭曲過的座標」最近的種子就是它的格
const wx=x+A*(noise(x*f,y*f)+.5*noise(x*f*2.3+17,y*f*2.3)), wy=y+A*(noise(x*f+91,y*f+33)+.5*noise(x*f*2.3+51,y*f*2.3+7));
// 格邊：cell[p]!==cell[p+1]；物件邊：obj[p]!==obj[p+1]；兩者各自做可分離膨脹（1.1 / 2.4 倍 scale）
```

### ⑤ 手寫原子筆字＋細胞字
標題用手寫感字體（拉丁 Shantell Sans 800、中文霞鶩文楷 TC 700），大標題則直接**被切成細胞**用排線塗滿。內文放在條紋格上時，字後墊一條白底（像在塗好的格子上留白寫字）。

```css
h1,h2,h3{font-family:"Shantell Sans","LXGW WenKai TC",cursive;font-weight:800}
.tt{background:#FBFAF6;padding:0 .25em;box-decoration-break:clone}
```

## 色彩系統

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 白 | `#FBFAF6` | 白格、紙、字底 | 45–55% |
| 黑 | `#141414` | 所有線、極少實格、深色按鈕 | 15–20%（含線） |
| 紅 | `#D7261E` | 紅排線（車上撿到）、實紅點睛 | 15–20% |
| 藍 | `#1F4FBF` | 藍排線（店裡撿到）、實藍點睛 | 12–18% |

規則：顏色可以承載語意（本站：紅＝車上、藍＝店裡、白＝路上、黑＝證件），但永遠不出現第五色；hover 狀態以「紅藍互換、白格塗上排線、黑格挖白」表達，不用變亮變暗。

## 字體系統

- 來源：Google Fonts — `LXGW WenKai TC`（400/700，中文內文與大字）、`Shantell Sans`（400/700/800，拉丁、數字、標題、按鈕）、`Unbounded`（800，僅供 motion-library 文字元件，元件寫死字族）。
- 字級：大字 clamp(44px,6vw,80px)／H2 34–54px／H3 20–30px／內文 17px（手機 16px）／註記 13–15px。
- 字重：標題 800、內文 400、表格標籤 700。行高：內文 1.75、標題 1.05–1.15。
- 數字一律 Shantell Sans 800 大號（價格、秒數、件數），像用馬克筆寫在吊牌上。

## 版面與網格

- **零空白原則的網頁版**：首屏 100% 是細胞場（canvas），其他段落以「一組互相咬合的格」排版：格與格 `margin:-1.5px` 讓外框疊成一條線，不留 gap。
- 網格可以有，但格子大小必須不一；同一列最多一格旋轉 ±1–2°。
- 拒絕置中三卡片：三個步驟要寫成大小不同、有一格下沉 26px 的拼圖。
- 桌機左上固定 250×178 的拼格導覽，內容左側留 292px；≤900px 導覽落為底部橫條。
- 留白：段落之間 90–110px；格內 22–34px 內距。

## 元件配方

- **導覽（拼格導覽 jigsaw-cell nav）**：一塊 250×178 的四格拼圖，14 個共用頂點，四格各為一個 `<a>`（用 bounding box 定位、內部 `.cf` 以 clip-path 裁出格形），一張 SVG 疊在上面描全部邊。預設格白；hover／focus 時 `--hi` 0→2.5px（steps(5)）＝原子筆把格子排線塗滿，同時 `--ha` 擺 70°；現用頁格是塗滿的、字反白黑底。
- **按鈕**：`.btn.cell` + `data-fill="hr|hb"`，平時白格（`--hi:0`），hover 填排線；字放在白色或黑色小底條上。
- **卡片 / 資訊格**：`.cell[data-cell=種子][data-fill=hw|hr|hb|hk]`，由 JS 產生抖動多邊形；hk 黑格放白字。
- **表單**：select、fieldset 一律 3px 黑框直角（表單是「櫃台的紙本」，不抖動，以免難以點選）；radio 用 `accent-color:#D7261E`。
- **吊牌（popover）**：300px 白格、旋轉 −1.5°、右上角黑方塊 × 關閉、Esc 可關。
- **footer**：上緣 3px 黑線、三欄、虛構聲明獨佔一列。

## 動效規則

全站四種性質不同的動效（§2.7.4），全部本站自製；motion-library 元件為額外加料。

| 類型 | 實作 | 觸發 | duration / easing | reduced-motion 降級 |
|---|---|---|---|---|
| ambient 環境 | 全站排線緩慢平移：`body{animation:drift 9s linear infinite}`，`@keyframes drift{to{--hp:62px}}`，所有 `.hr/.hb` 以 `background-position:var(--hp) 0` 繼承 | 自動 | 9s linear 循環 | 動畫取消，排線靜止（資訊不變） |
| input 輸入 | 細胞翻面：游標下那一格紅藍互換、白格塗紅、黑格挖白（只重畫該格 bounding box） | pointermove | 即時（<16ms） | 照常（使用者自己在動） |
| transition 轉場 | 細胞換頁：視窗切成 15 格抖動 Voronoi，從點擊處依距離 `scale(0→1.04)` 蓋滿，下一頁反向縮走 | 站內連結 | 每格 260ms steps(4)，最遠延遲 300ms | 直接換頁、不蓋格 |
| signature 簽名 | **原子筆重排線**：被找到的失物浮起（−3°、上移 10px），全部格先只剩黑線，再依「螺旋順序」一格一格、每格內一條一條把排線畫回去，最後 FLIP 飛進招領單托盤 | 在〈找回來〉點中正確物件 | 每格 ≤110ms、格內每條 22ms；飛行 620ms cubic-bezier(.6,0,.3,1) | 直接顯示填滿的物件、吊牌直接出現 |

自我限制：本風格禁用淡入淡出（opacity 補間）與 ease-out 彈跳；所有離散狀態改變用 `steps()`，像手一筆一筆畫。

### motion-library 元件表（PLAYBOOK §2.8，版本 1.39.0 @bafd6002）

| 頁 | ID | 名稱 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| 首頁 | TXT-A-35 | Stripe Mask | text `"{N} FOUND"`、primary #D7261E、secondary #1F4FBF、bg #FBFAF6、duration 1.6、loop false（一次）、seed 13、16:9 裁成 140px 高 | transition（進視窗播一次） | 今日件數的大標由 14 道直條逐條揭開，條帶前緣是一條紅線——等於「一條一條排線把字塗出來」，與特徵③同語彙；白底得到近黑字 |
| 首頁 | BG-B-22 | Stripe Twist | primary #D7261E、secondary #1F4FBF、bg #FBFAF6、duration 9、density 1.25、intensity .8、seed 1962、9:16，容器以同一張抖動多邊形 clip | ambient | 紅白藍白相間的直條隨正弦扭動，被裁進一個細胞形狀，像一格會呼吸的排線；全平塗零發光零圓角，不破壞特徵② |
| 找回來 | TXT-B-34 | Jitter Settle | text `"ALLÔ ?"`、primary #1F4FBF、secondary #D7261E、bg #FBFAF6、duration 1.4、loop false、seed 62、16:9 裁成 96px | input／transition（每通電話 replay） | 電話接起時抖動後定住的「喂？」——向 Dubuffet 在巴黎講電話塗鴉的起源致意；逐字抖動像原子筆手寫的不穩 |
| 找回來 | SHP-33 | Squiggle Draw | primary #D7261E、secondary #1F4FBF、bg #FBFAF6、duration 2.6、loop true、intensity 1.1、seed 7、16:9 裁成 96px | ambient | 留言條上邊聽邊畫的那條紅色蜿蜒線＝Hourloupe 的誕生瞬間。元件底下會畫一層 6% 的淡格線，在本站被讀成「留言條的格線」——這是唯一一處允許的非細胞線 |
| 寄還與價目 | BG-A-11 | Parallel Curves | primary #D7261E、secondary #1F4FBF、bg #FBFAF6、duration 8、density 1.1、intensity 1.2、seed 1974、9:16，裁進細胞形 | ambient | 一束波動的平行線（每第四條換藍）＝放大的排線本身，像一格塗到一半的排線在呼吸；元件線條 alpha .85 在白底上近乎實色 |

出處：`MotionLib.prompt(id)`（私人庫 `wenxiangxiao/motion-library` `src/motion-lib.js`）。掛載規則：等 `document.fonts.ready`、離屏 `destroy()`／回視窗重掛、一次性文字元件進視窗播一次、canvas `aria-hidden`、`.ml-fb` 保留原 HTML 標題；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。元件不擔任 signature。

## 插畫與圖像風格

- 全站零點陣圖檔。所有圖由**細胞引擎**即時生成（見下節）：13 種失物剪影（長柄傘、折疊傘、鑰匙串、手套、毛線帽、眼鏡、皮夾、手機、保溫瓶、小熊玩偶、圍巾、耳罩耳機、球鞋）以單位方塊內的橢圓／膠囊／多邊形聯集定義，再被切成細胞、填排線。
- 剪影要**簡單到被切碎後仍能認**：用輪廓特徵（傘的弧頂＋J 柄、眼鏡的雙圈、手套的五指）而非內部細節。
- 每件物件有一個「色調」（red／blue／white），決定其格子的機率分布；標題字有自己的 title 色調（實紅較多）。
- 同一天同一堆：種子＝`FNV-1a("khioh"+日期)`，`?day=YYYY-MM-DD` 可重現任一天。

## Logo 與 Favicon 設計指南

- Logo（`assets/logo.svg`）：一張吊牌外形切成五個咬合細胞（黑、紅排線、白、藍排線、紅排線），左上穿繩孔；右側霞鶩文楷「撿著了」＋紅色 Shantell Sans `KHIOH-TIO̍H`＋藍色小字。
- Favicon：32×32 inline SVG data URI，三格咬合（黑、紅排線、藍排線），2.2px 黑線。
- 禁止：圓角方框徽章、漸層、陰影、把 Logo 放在彩色底上（只能放白或黑）。

## Do & Don't

**Do**
- 讓整個首屏是一張零空白的細胞拼圖，讓人「找」。
- 用條紋顏色承載一個真實的分類規則（本站：撿到的地點）。
- 讓 hover、轉場、簽名都用「格」與「排線」這兩個單位。
- 給 canvas 準備同等資訊的文字清單（首頁今日清單、〈找回來〉的清單模式）。

**Don't（含去AI化禁令）**
- 不用第五色、不用漸層、不用陰影與發光、不用圓角卡片＋模糊陰影。
- 不用紫藍漸層 hero、不做「置中大標＋兩顆按鈕＋三張圓角卡片」。
- 不用 emoji icon；不用 Lorem ipsum；不放「EST. 19xx」徽章。
- 不把格線拉直、不用正圓；不在同一格混紅藍。
- 不把物件塗成實色讓它跳出背景——那就變成貼紙插畫，不是 Hourloupe。
- 不用淡入當進場（本風格的時間單位是「一筆」，用 steps()）。

## 頁面骨架範例

```html
<nav class="nav" aria-label="主要導覽">
 <a class="logo" data-k="logo" data-fill="hk" href="index.html"><span>撿著了</span></a>
 <a data-k="index" data-fill="hr" href="index.html"><span>今天的<br>失物堆</span></a>
 <a data-k="find" data-fill="hb" href="find.html"><span>找回來</span></a>
 <a data-k="post" data-fill="hr" href="post.html"><span>寄還<br>與價目</span></a>
</nav>
<header class="hero">
 <h1 class="sr">品牌名——今天的失物堆</h1>
 <div class="pilebox" id="pile"><div class="pl-static">（無 JS／canvas 時的文字）</div></div>
 <div class="cap cell" data-cell="cap"><p class="capbig">撿到 <b>22</b> 件。<br>點一件，看它的吊牌。</p>
  <ul class="legend"><li><i class="sw hr"></i>紅條紋＝車上撿到</li><li><i class="sw hb"></i>藍條紋＝店裡撿到</li><li><i class="sw hw"></i>白格＝路上撿到</li></ul></div>
</header>
<main class="wrap">
 <div class="rgrid">
  <div class="rc cell" data-cell="r1" data-fill="hr"><h3 class="tt">紅條紋</h3><p class="tt">……</p></div>
  <div class="rc cell" data-cell="r2" data-fill="hb"><h3 class="tt">藍條紋</h3><p class="tt">……</p></div>
 </div>
 <a class="btn cell" data-cell="b1" data-fill="hb" href="find.html"><span>自己接五通電話 →</span></a>
</main>
<script>KT.nav('index');KT.cellify();KT.transitions();</script>
```

## 技術實作與相容性

本站認領三項核心技術（A 渲染／B 動效／E 資料生成，三層不同；A、B 兩項為最近 6 站未出現）。

### 1. OffscreenCanvas ＋ Worker：細胞場在背景執行緒生成（A 渲染層）
- **承載什麼**：首屏與〈找回來〉的失物堆每張 100–160 萬像素，每像素要做雜訊扭曲、區內最近種子查找、雙層邊緣膨脹與排線判定；放主執行緒會吃掉 200–360ms。改由 `canvas.transferControlToOffscreen()` 交給以 Blob URL 建立的 Worker（Worker 原始碼＝`HLengine.toString()`，與主執行緒同一支引擎），在 Worker 內 `putImageData` 直接畫上畫面，再把 `obj`／`cell`／`line`／`spec`／`ang`／`cmin`／`cbb` 七個 TypedArray 以 transferable 回傳主執行緒做 hover 與命中。
- **支援現況（查證）**：MDN 標示 OffscreenCanvas 與 `transferControlToOffscreen()` 為 Baseline 2023（2023 年 3 月起跨瀏覽器可用）；web.dev〈OffscreenCanvas—speed up your canvas operations with a web worker〉列 Chrome 69、Edge 79、Firefox 105、Safari 16.4。來源：developer.mozilla.org/docs/Web/API/OffscreenCanvas、web.dev/articles/offscreen-canvas。
- **Fallback**：不支援 `transferControlToOffscreen` 或 Worker 建立失敗 → 同一支 `HLengine.generate` 在主執行緒跑（`setTimeout` 讓出首幀），畫到 base canvas；若 base 已被轉移則畫到覆蓋層。無 canvas／無 JS → `.pl-static` 文字與首頁今日清單。
- **效能實測**（node 22，aarch64 沙盒，同一支引擎）：1650×960（1100×640 CSS × 1.5）26 件物件 272–363ms；1400×800 22 件＋標題字 ≈ 250ms；jsdom 主執行緒退路 194–209ms（1000×640）。Worker 路徑下主執行緒只花 Blob 建立與 postMessage（<5ms），首屏 JS 遠低於 100ms 門檻。
- 渲染倍率上限 `min(devicePixelRatio,1.5)`，避免 3x 螢幕把像素數放大 9 倍。

### 2. CSS `@property` 型別化自訂屬性（B 動效與時間軸層）
- **承載什麼**：`--hi`（排線墨寬，`<length>`）、`--ha`（排線角度，`<angle>`）、`--hp`（排線平移，`<length>`）。未註冊的自訂屬性在 `repeating-linear-gradient()` 裡無法補間；註冊後，hover 時墨寬 0→2.5px 就是「原子筆把格子塗滿」，角度同時擺動；body 上的 `--hp` 9 秒循環讓全站所有排線一起緩慢漂移（ambient）。
- **支援現況（查證）**：web-platform-dx「Registered custom properties」Baseline Newly Available 2024-07-09（Chrome/Edge 85、Safari 16.4、Firefox 128），Widely Available 預計 2027-01-09；caniuse（MDN 資料）Firefox ≤127 不支援、128 起支援；web.dev〈New to the web platform in July 2024〉確認 Firefox 128 支援 `@property`。
- **Fallback**：不支援的瀏覽器中 `@property` 被忽略，自訂屬性變成不可補間 → hover 時排線**瞬間**塗滿（資訊不變），環境漂移停止。初始值在 CSS 規則內另有預設（`--hi` 在需要白格的元件上明寫 0px），所以靜態外觀一致。

### 3. 決定性偽隨機（xorshift32＋FNV-1a）＋ value noise（E 資料與生成層）
- **承載什麼**：同一天＝同一堆失物（擺放、旋轉、格子、排線角度、填色全由種子決定）；`?day=` 可重現；〈找回來〉的五通來電由 `FNV-1a(日期+"calls"+局號)` 洗牌決定；招領號亦為 FNV-1a。細胞邊界的蜿蜒來自自寫 256×256 value noise 兩個八度的座標扭曲。
- **支援**：純 ES5 運算，無相容性問題。

### 其他相容性備註
- 跨頁轉場用 WAAPI `Element.animate()`；不支援時直接換頁。
- sessionStorage 只放招領單與換頁旗標；被封鎖時 try/catch 吞掉，頁面照常。
- 單頁大小（含 motion-library 子集約 288KB）：index 約 337KiB、find 約 336KiB、post 約 326KiB，皆 ≤350KB。
