---
name: rousseau-naive-jungle
description: Henri Rousseau naïve jungle style — a wall of separately outlined, flat leaves in dozens of different greens stacked to the edges with no atmospheric depth, frontal animals staring out through the gaps, one flat glow-less sun or moon disc over a pale graded sky, red-orange exotic blooms, and a red script signature in the corner.
---

# 盧梭素人叢林 Henri Rousseau — Naïve Jungle（Peinture naïve／Le Douanier）

> 範例站：`sites/tshiu-na-lai`（樹林內觀葉苗圃・屏東長治）。本規格書與產業無關：任何需要「茂密、天真、正面凝視、平塗」的品牌都能用。

亨利・盧梭（Henri Rousseau, 1844–1910）在巴黎入市稅關卡（octroi）當了二十二年收稅員（1871–1893），同事叫他「海關員」Le Douanier；他沒受過學院訓練、一輩子沒離開法國，叢林全是在巴黎植物園（Jardin des Plantes）的溫室、動物園標本與畫冊裡看來的。1891 年第一張叢林畫〈驚奇！〉（Tiger in a Tropical Storm／Surprised!，倫敦國家藝廊）在獨立沙龍被嘲笑，1904–1910 年間他畫了約二十多張叢林，最後一張〈夢〉（The Dream, 1910，MoMA）。同年的〈熱帶森林中的猴子〉（Tropical Forest with Monkeys, 1910，華盛頓國家藝廊）、〈弄蛇人〉（The Snake Charmer, 1907，奧賽美術館）是另外兩個常被引用的典型。2005–06 年 Tate Modern〈Henri Rousseau: Jungles in Paris〉把這批畫重新定位為現代主義的源頭之一（畢卡索 1908 年在洗衣船為他辦過宴會）。

## 設計哲學

1. **不會畫景深，就把東西一層一層疊上去。** 盧梭的叢林沒有空氣遠近法：遠的葉子不會變藍變糊，只是更暗、被前面的蓋住。整張畫是一面「葉牆」，畫面四邊都塞滿。
2. **每一片葉子都是單獨的一個東西。** 他照著溫室裡的盆栽一片一片畫，每片有自己的輪廓、自己的主脈、自己的綠——所以看起來像剪紙拼貼，而不是「一團樹叢」。
3. **動物不是在打獵，是在看你。** 老虎、猴子、獅子都是正面或僵硬的側面，眼睛又圓又白，從葉縫中直直看出畫外。
4. **天真不是笨拙，是一套很嚴的規矩。** 平塗、零陰影、零筆觸、輪廓清楚——這是一種「拒絕學院技巧」的精確，畫面其實非常整齊。

## 本風格的 5 個不可省略特徵

### ① 版面手法：滿版疊葉牆，零空氣遠近（拿掉它就變成普通植物插畫）

葉叢從畫面底邊一路長到上緣下方約 27% 處、左右出血；至少分 4 層（遠景暗葉→中景→動物→遮動物的葉→前景）。遠景**只變暗、不變淡、不變糊、不縮小到看不清**。

```js
// 遠景葉長度上限：保留上方 27% 的天空
L = Math.max(Lu*.16, Math.min(Lu*(.28+r()*.32), rootY - H*.27));
// 圖層排序：0 遠 → 1 中 → [動物] → 3 遮蓋 → 4 前景；同層依 y 由上往下畫
leaves.sort((a,b)=>a.layer-b.layer||a.y-b.y);
```
```css
/* 靜態版：用 SVG 葉疊出邊帶，最後一排出血到容器外 */
.fringe{height:96px;overflow:hidden;background:#162B1D}
.fringe svg{position:absolute;bottom:-4px;width:100%;height:120px}
```

### ② 色彩規則：百綠——每一片葉一種綠，淺色主脈＋暗緣線，零漸層零陰影

從 12–16 階綠中隨機取一色給「一片葉」，不是給一叢；遠景取暗段（#14281A–#355F3A）、前景取亮段（#3F7A3A–#B5C977）。主脈與側脈比葉身淺 2–4 階，葉緣一道 1.3px 更暗的線。全站唯一的漸層只給天空（與雨）。（盧梭據說用到數十種綠——本規格把它寫成「每片葉獨立抽色」的規則。）

```js
const GREENS=['#14281A','#1F3B22','#24452B','#2E5A2C','#355F3A','#3F7A3A','#4A6E3C','#5E8F3E',
 '#6E9A48','#86A957','#9DB865','#B5C977','#2B4A44','#3D5E4E','#557A5B','#476B2F'];
ctx.fillStyle=leaf.fill; ctx.fill(body);
ctx.strokeStyle='#0E1D14'; ctx.lineWidth=1.3; ctx.stroke(body);     // 暗緣線
ctx.strokeStyle=leaf.vein; ctx.lineWidth=Math.max(1,w*.035); ctx.stroke(veins); // 淺色脈
```
```svg
<path d="M50 200Q98 104 50 8Q2 104 50 200Z" fill="#3F7A3A" stroke="#0E1D14" stroke-width="2"/>
<path d="M50 200L50 12M50 170Q66 162 80 150M50 170Q34 162 20 150" fill="none" stroke="#B5C977" stroke-width="1.6" stroke-linecap="round"/>
```

### ③ 裝飾母題：葉縫裡正面凝視的動物

動物只露出臉或半身，**正面、對稱、僵直**；眼睛是「白眼球＋黑瞳＋1.4px 黑輪廓」，瞳孔可以跟著觀者移動。身體用 2–4 個平塗色塊，條紋／斑點是實心筆劃，不寫實、不畫毛。

```js
function eye(x,y,r,iris){                    // 盧梭的眼睛：白、圓、黑瞳、直視
  E(x,y,r,r*1.02,'#F4EFDF'); if(iris)E(x+LX*r*.3,y+LY*r*.3,r*.66,r*.66,iris);
  E(x+LX*r*.36,y+LY*r*.36,r*.38,r*.4,'#14120C');
  ctx.beginPath();ctx.ellipse(x,y,r,r*1.02,0,0,TAU);ctx.strokeStyle='#14120C';ctx.lineWidth=1.4;ctx.stroke();}
```
```svg
<g><ellipse cx="0" cy="0" rx="7" ry="7.3" fill="#F4EFDF" stroke="#14120C" stroke-width="1.4"/><circle cx="1" cy="1" r="3" fill="#14120C"/>
<ellipse cx="22" cy="0" rx="7" ry="7.3" fill="#F4EFDF" stroke="#14120C" stroke-width="1.4"/><circle cx="23" cy="1" r="3" fill="#14120C"/></g>
```

### ④ 形狀語彙：一枚零光暈的平塗日／月盤，懸在淡色漸層天空

白天是朱橘 #D4421E 實心圓（〈異國風景〉系列的紅日），夜裡是乳白 #EDE5C4 滿月（〈弄蛇人〉〈夢〉）。**不畫光暈、不畫光線、不畫雲的體積**；天空是唯一允許的漸層，上冷下暖。

```css
.sun{width:14vmin;aspect-ratio:1;border-radius:50%;background:#D4421E;box-shadow:none;filter:none}
.sky{background:linear-gradient(#C3D2C6,#EFE4BE 62%,#14281A 62%)}       /* 夜：#1E2D36→#3E5150 */
```

### ⑤ 字體與簽名：樸拙襯線＋紅色書寫體署名與年份

標題用厚重的襯線（Noto Serif TC 900／Young Serif），像畫家在畫布角落一筆一劃寫出來的；畫面右下角一定有一行紅色書寫體的署名＋年份（盧梭總是這樣簽）。資訊型小字（票券、價目）可用黑體，但永遠不搶標題。

```css
h1,h2{font-family:"Young Serif","Noto Serif TC",serif;font-weight:900}
.sign{font-family:"Pinyon Script",cursive;color:#B32A20;font-size:28px}
```
```js
ctx.font='400 '+Math.max(18,U*.042)+'px "Pinyon Script"';ctx.fillStyle='#B32A20';ctx.textAlign='right';
ctx.fillText('Ng Kim-tik  2016',W-18,H-16);
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 遠葉暗綠 | #14281A／#1F3B22 | 遠景葉、頁面底色、地面 | 35% |
| 中葉綠 | #2E5A2C／#3F7A3A／#5E8F3E | 中景與遮蓋葉 | 25% |
| 亮葉綠 | #86A957／#9DB865／#B5C977 | 前景葉、葉脈、強調 | 10% |
| 藍綠 | #2B4A44／#3D5E4E | 夾在綠裡的冷色葉 | 4% |
| 天空 | #C3D2C6→#EFE4BE | 天空漸層、資訊板 #EFE6CB／#E9E1C4 | 18% |
| 朱日 | #D4421E | 太陽、少數按鈕 | 2% |
| 花橘／花紅 | #E2702A／#B32A20 | 異花、署名、價錢 | 3% |
| 墨 | #1C1B12 | 文字、按鈕、導覽 | 3% |
| 動物色 | 虎 #D9822B、象 #9C9D94、鸚鵡 #C8281E、孔雀 #1F5FA0 | 只用在動物 | <2% |

夜間：所有葉色往 #0A1A1F 混 55%，動物與眼睛**不變暗**（眼睛在黑暗中更亮，是〈弄蛇人〉的效果）。

## 字體系統

- 標題：Noto Serif TC 900（中文）＋ Young Serif（拉丁），字級 clamp(30px,4.2vw,50px)／區塊標題 clamp(28px,3.6vw,44px)，行高 1.15，字距 .04–.06em。
- 內文：Noto Serif TC 400，17px／1.75。
- 資訊（票券、價目、導覽）：Noto Sans TC 500／700／900，12–15px，字距 .08–.28em——來源是收費亭票券的黑體。
- 署名：Pinyon Script，紅 #B32A20，只用在畫面右下角與頁尾。

## 版面與網格

- 首屏 = 一張畫：`height:max(560px,100svh)`，手機 `max(520px,80svh)`（留出可以捲動的區域）。資訊放在**釘在畫上的木板**（`.plank`，紙色、`rotate(-1.2deg)`、右下 6px 木色硬影、兩顆釘子），不是浮在畫上的半透明卡。
- 畫面上方 27% 留給天空；動物分布在 45–90% 高度帶。
- 內頁：天空色資訊區與暗綠區交替，區塊之間用「葉緣邊帶」接縫（不用直線分隔）。
- 圖文繞排：植物插圖 float，`shape-outside:polygon()` 沿葉叢外形繞排，`shape-margin:16px`——文字像人從葉子旁邊擠過去。
- 留白規則：畫面內零留白（滿版）；資訊區內留白要大，形成「畫／牆」對比。

## 元件配方

- **導覽（車道燈）**：右上三個 68px 寬墨色板，每格一個 30px 方燈，內部是向下箭頭剪影；現用頁燈綠 #62B548、頂邊 5px 綠；hover 黃 #C9962A。≤560px 落為底部三等分。
- **按鈕**：紙色或墨色實心方塊、零圓角，`padding:12px 14px`，hover 換亮葉綠並上浮 2px。
- **木板資訊卡**：`background:#EFE6CB;box-shadow:6px 6px 0 #6B4A2B;transform:rotate(-1.2deg)`，`::before/::after` 做兩顆 9px 圓釘。
- **吊牌（價目）**：紙色＋2px 墨框，頂端 18px 吊線與一個打孔圓；`transform-origin:50% -16px`，被游標掃過時以彈簧盪動。
- **通行券**：#EFE3C0 紙、左緣以 `mask: radial-gradient(circle at 0 10px,transparent 5px,#000 5.5px) 0 0/100% 20px repeat-y` 做撕孔，虛線騎縫；未取得時是暗綠虛線框。
- **頁尾**：最暗綠 #10201A，三欄，含紅色書寫體署名與「虛構示意」聲明。

## 動效規則

| 種類 | 本站自製實作 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 風：每片葉的彈簧目標角加上自寫 1D value noise（`noise(t*.00022+ph)*.05+noise(t*.0011+ph*3)*.018`）；日／月依真實時刻移動；頁尾葉緣 CSS `sway` 5.5–7s alternate | 無 | 振幅 ±0.05 rad | 風停、葉靜止；日月仍在正確位置（資訊不損失） |
| input 輸入 | 撥葉：游標／手指／方向鍵附近的葉子目標角被推離（距離＝到葉片線段的垂距，半徑 `U*.1+36`），半隱式歐拉阻尼彈簧 k=55–70、c=8.5；內頁吊牌被游標掃過依水平速度盪動 | pointermove／方向鍵 | 延遲 1 frame（<17ms） | 改臨界阻尼（c=2√k），葉子直接讓開不回彈 |
| transition 轉場 | 葉幕：8 片大葉從左右下角以 `rotate(±96deg)→0` 合上（420ms cubic-bezier(.6,.05,.4,1)，每片延遲 28ms），換頁後再打開 | 站內連結 | sessionStorage 旗標 | 不顯示葉幕，直接換頁 |
| signature 簽名 | **葉後對眼＋撕下通行券**：在一隻動物上停 0.5 秒，牠的遮蓋葉永久往兩側收（a0 ± .75 rad），瞳孔開始追著你；一張以牠命名的植物通行券從畫上那個位置飛向券軌（WAAPI 900ms，先上拋再落位），落位時彈一下並顯示騎縫撕孔 | 停留 0.5s | — | 通行券直接出現在券軌 |

自我限制：不使用淡入當主打；不使用跑馬燈；不使用發光與模糊。

### motion-library 元件（v1.28.1 @95eb095，`tools/ml-embed.js` 只抽該頁元件，inline 為每頁第一個 `<script>`）

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-09 | Wave Letters | 叢林 | text「八張通行券」、colors primary #B32A20／secondary #2E5A2C／bg #EFE6CB、duration 2.6、loop false、seed 8 | transition（一次性） | 五個字像被風吹的葉片一波波起伏、浪頭那個字變紅再落定——叢林的風進到標題裡；純填色字、零描邊零發光，亮底得近黑字 |
| TXT-B-26 | Swing Letters | 八盆 | text「吊牌價目」、colors #B32A20／#6B4A2B／#EFE6CB、duration 2.4、loop false、seed 4 | transition（一次性） | 每個字從一條橫線吊下來盪、阻尼停住——就是溫室裡掛在盆邊的吊牌；與本頁吊牌彈簧同一個物理語彙 |
| BG-A-11 | Parallel Curves | 八盆 | colors #5E8F3E／#B5C977／#1F3B22、duration 9、density .7、intensity .8、seed 12 | ambient | 澆水表上方的一條水流帶：平行波線、零漸層，綠色系 |
| BG-A-31 | Dot Rain | 溫室 | colors #B5C977／#EFE6CB／#162B1D、duration 4、density .9、intensity .9、seed 16 | ambient | 噴霧時刻的雨絲——對應〈驚奇！〉（熱帶風暴中的老虎）畫面上的斜雨；雨絲尾端淡出是本風格唯二允許的漸層之一 |
| TXT-A-02 | Letter Sequence | 溫室 | text「怎麼來」、colors #B32A20／#2E5A2C／#EFE6CB、duration 1.6、loop false、seed 6 | transition（一次性） | 三個字從下往上長出來，像新芽；最樸素的逐字進場，不搶地圖 |

掛載規則：`TNL.ml()` 等 `document.fonts.ready` 才掛；IntersectionObserver 離屏即 `destroy()`、回到視窗重掛；一次性元件第二次起 `seek(1)`；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`；canvas `aria-hidden`，容器內 `.ml-fb` 保留原 HTML 標題。同一畫面同時運轉 ≤2 個。元件 Prompt 出處：`MotionLib.prompt(id)`。

讀過原始碼後排除：Diagonal Lines（緞帶光澤＋blur 投影＋暈影）、Pendulum Swing（金屬球漸層與模糊投影）、Wobble／Scale Pulse（`softGrid` 方格底與 `rr()` 圓角方塊）——都違反特徵②④的「零陰影零發光、只有天空漸層」。

## 插畫與圖像風格

全部是程式繪製：首頁 canvas 每片葉是一個 Path2D（lance 披針、heart 象耳、banana 芭蕉、spike 虎尾、fork 鹿角、calathea 竹芋斑、nest 山蘇、fern 羽葉、fan 掌葉、zebra 白脈），內頁以同一套方程式在建置期輸出 SVG。動物以 2–6 個橢圓與實心筆劃組成。花是 7–8 瓣橢圓＋內瓣＋黃心。**禁止**：照片、寫實毛髮、景深模糊、光暈、投影、3D。

## Logo 與 Favicon 設計指南

64×64：天空色底、右上一顆朱日、三片不同綠的葉從底邊長上來（中間那片是鹿角形）、兩片葉之間一雙白眼黑瞳。favicon 為同一個 SVG 的 data URI。Logo 不放字；字標在導覽旁以 Noto Serif TC 900 另排。

## Do & Don't

- Do：每片葉單獨描邊、單獨取色；葉牆出血；動物正面直視；日月是平的圓；右下角紅色署名。
- Do：讓觀者「撥開」——這個風格天生就是 hidden-object。
- Don't：葉子用同一個綠、用漸層或陰影做體積、用 blur 做景深。
- Don't：把動物畫成寫實或卡通大頭（Q 版）；不要讓動物張牙舞爪，牠們是在「看」。
- Don't（去AI化）：紫藍漸層 hero、置中大標＋三張圓角卡、emoji icon、Lorem ipsum、EST. 徽章、柔和大陰影卡片。
- Don't：跑馬燈、通用淡入當主打。

## 頁面骨架範例

```html
<section class="stage" id="jungle" aria-label="叢林畫">
  <div class="plank"><h1>店名</h1><span class="en">ENGLISH NAME</span><p>一句話來歷。</p><div class="st"><i></i><span>營業中</span></div></div>
  <div class="stage-fb"><!-- 無 canvas 時的文字名單 --></div>
  <!-- JS 插入 <canvas class="jcv" tabindex="0" role="img" aria-label="..."> -->
</section>
<section class="controls"><ol class="rules"><li>規則一</li><li>規則二</li><li>規則三</li></ol></section>
<article class="pl">
  <figure style="shape-outside:polygon(28% 14%,72% 10%,96% 52%,66% 100%,34% 100%,4% 50%);aspect-ratio:360/440"><svg>…葉與陶盆…</svg></figure>
  <h2>虎尾蘭</h2><p>文字沿葉叢外形繞排……</p>
  <div class="tag" tabindex="0"><table><tr><td>5 吋</td><td>NT$220</td></tr></table></div>
</article>
```

## 技術實作與相容性

### 1. Canvas 2D＋Path2D 分層葉叢（A 渲染層）

- 每片葉在 `build()` 時建立 2–3 個 `Path2D`（葉身／脈／飾），每幀只做 `setTransform→translate→rotate→fill/stroke`；1400×820 約 180 片葉、8 隻動物、7 朵花，Node＋@napi-rs/canvas 實測單幀繪製 2–5ms（含物理）。手機依面積把葉數降到約 55%。
- 支援：MDN 標示 `Path2D` 為 Baseline Widely available（2016-08 起跨瀏覽器）；Canvas 2D 全面支援。查證：MDN〈Path2D〉、caniuse〈Path2D API〉。
- Fallback：取不到 2D context 或沒有 `Path2D` 時不插入 canvas，`.stage` 顯示 CSS 天空＋地面與八隻動物的文字名單，三顆遊戲按鈕 disabled；其餘頁面不受影響。

### 2. requestAnimationFrame 阻尼彈簧（B 動效與時間軸層；最近 6 站完全沒出現）

- 每片葉一個角彈簧：`vel += (-k(θ-target-sway) - c·vel)·dt; θ += vel·dt`（半隱式歐拉，dt ≤ 33ms）。target 由游標到葉片「線段」的垂距決定（不是到葉基點），所以只有被手碰到的那幾片會讓開。原型（node，20 行）實測 200 片葉一步 0.25ms。
- 離屏（IntersectionObserver）與分頁隱藏（visibilitychange）即停止 rAF；reduced-motion 改臨界阻尼、關閉風。
- 內頁吊牌用同一支彈簧（k=60、c=6），只在被碰到時跑 rAF，靜止即停。

### 3. CSS Shapes `shape-outside: polygon()`（C 版面與樣式層；最近 6 站完全沒出現）

- 建置期以同一套葉方程式取樣葉緣＋陶盆四角，求凸包，輸出百分比 `polygon()` 寫進 `style`，瀏覽器零計算；`shape-margin:16px`。
- 支援：MDN 將 `shape-outside` 標為 Baseline Widely available（2020-01 起跨瀏覽器）；caniuse 顯示 Firefox 62+、Edge 79+ 支援 `polygon()`。
- Fallback：不支援時退回矩形浮動繞排（版面不破）；≤560px 取消 float 與 shape-outside，圖置中於文字上方。

### 4. 其他

- 真實時刻：使用者當地時間 06–18 時為日（朱日），其餘為夜（滿月、葉色混 #0A1A1F 55%），可手動切換。
- 通行券完成代號：FNV-1a（找到順序＋日期）→ 31 字元表 5 碼 `TNL-XXXXX`；找到的順序存 sessionStorage，換頁回來不重找（try/catch，被封鎖時只是不保留）。
- 效能預算（實測檔案大小）：index 291.7KB／plants 336.9KB／visit 269.2KB（皆含約 246KB motion-library 子集），皆 ≤350KB；首屏自製 JS（jungle.js 解析＋建 180 片 Path2D）node 實測約 12ms，單幀 2–5ms。
