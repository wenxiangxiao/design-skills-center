---
name: atelier-populaire-one-ink
description: Paris May '68 Atelier Populaire screenprint posters — one ink per sheet, one cut-paper silhouette, one short hand-cut slogan, cheap newsprint, anonymous, pasted on a night wall.
---

# 人民工坊・一張一墨 Atelier Populaire, Mai 68

> 範例站：同車計程車運輸合作社 TÂNG-TSHIA（`sites/tang-tshia`）。本規格書不綁產業：任何「要在一夜之間對街上說一句話」的品牌都能用。

## 設計哲學

1968 年 5 月 14 日，學生、藝術家與罷工工人佔領巴黎美術學院（École des Beaux-Arts）的石版工作室，成立 Atelier Populaire。第一張〈Usines, Universités, Union〉是石版、只印 30 張；幾天後 Guy de Rougemont 與網版師傅 Éric Seydoux 帶來網版，產能暴增，到 6 月下旬警察清場前做出 350 種以上的海報。草稿每晚匿名提上大會，只問兩題：**話說得對嗎？海報說得清楚嗎？**（Tate Papers no.24）

這個流派的每一個視覺特徵都是**產能限制**長出來的：一晚要刮幾百張 → 一色；圖要讓不會畫的人也刻得出來 → 剪影；開車經過三秒要看完 → 一句短話、字大；紙是最便宜的 → 新聞紙、墨會缺會糊；作者會被抓 → 不署名。照抄外觀而不照抄限制，就會做成「復古紅色海報風」——那不是它。

## 本風格的 5 個不可省略特徵

### ① 一張一墨，紙白就是第二色
每一張只有一個墨色（朱／藍／黑／綠），第二個「顏色」永遠是沒被印到的紙。零漸層、零網點、零陰影、零半透明疊色。反白字（墨地留紙）是唯一的「雙色」手段。
```css
.sheet{background:#ECE6D6;color:var(--ink)}           /* 紙＋一墨，沒有第三種 */
.sheet.red{--ink:#C9261C}.sheet.blue{--ink:#1F3C8F}.sheet.blk{--ink:#1C1B18}.sheet.grn{--ink:#22663A}
/* 禁止：linear-gradient 填墨、box-shadow 發光、opacity 調淡墨色 */
```

### ② 手刻粗字口號：短、歪、毛邊
口號 ≤8 字（中文）或 ≤6 字（拉丁），一律最粗字重；每個字各自微歪（±3.5°）、基線上下飄、高度 ±6%；邊緣用位移濾鏡咬出刻紙的毛邊。不准用細字、不准用斜體、不准對齊得很漂亮。
```html
<svg width="0" height="0"><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="3"/>
<feDisplacementMap in="SourceGraphic" scale="3.4" xChannelSelector="R" yChannelSelector="G"/></filter></svg>
<h2 class="cut"><span class="c" style="--a:-2.1deg;--y:.02em;--s:1.03">車</span>…</h2>
<style>.cut{font:900 64px/1.02 "Noto Sans TC";filter:url(#rough)}
.cut .c{display:inline-block;transform:translateY(var(--y)) rotate(var(--a)) scaleY(var(--s))}</style>
```

### ③ 一個剪影，字咬進圖裡
一張只有一個實心剪影（車、門、傘、拳頭、工廠），沒有輪廓線、沒有細節、凹處是挖掉的洞。字壓在圖上時，壓到的部分反白（XOR），這是 68 海報最常見的構圖。
```js
ctx.fillStyle='#000'; drawIcon(ctx,'car',cx,cy,size);          // 剪影
ctx.globalCompositeOperation='xor'; ctx.fillText('你不需要車行',x,y); // 字咬進圖：重疊處反白
```
```html
<svg viewBox="0 0 100 100"><polygon points="24,6 76,6 76,96 24,96" fill="#1F3C8F"/>
<polygon points="31,13 69,13 69,50 31,50" fill="#ECE6D6"/></svg> <!-- 洞用紙色，不用線 -->
```

### ④ 新聞紙與網版的不完美
紙是偏黃的新聞紙 `#ECE6D6`（不是純白）。墨沿刮刀方向逐漸缺墨、出現白色細點與刮痕條；墨多的時候字會變胖（糊版）。每張的缺墨程度不同（load 0.84–1.08）。
```css
.sheet::after{content:"";position:absolute;inset:0;pointer-events:none;
 background:repeating-linear-gradient(93deg,rgba(60,50,30,.035) 0 1px,transparent 1px 5px)} /* 紙纖維 */
```
缺墨由 canvas 逐像素計算（見「技術實作」）。

### ⑤ 貼在牆上、不署名
海報不是放在白色版面裡，而是貼在夜裡的牆上：歪貼（±2°）、硬邊投影、撕角、膠帶；作者欄只寫集體名（「同車合作社・人民工坊」），不寫個人。
```css
body{background:#2E2F2B url("data:image/svg+xml,…feTurbulence…")} /* 水泥牆 */
.sheet{transform:rotate(var(--r));box-shadow:0 1px 0 rgba(0,0,0,.35),7px 9px 0 -3px rgba(0,0,0,.3)}
.torn-tr{clip-path:polygon(0 0,86% 0,88% 3%,91% 1%,93% 5%,96% 4%,100% 9%,100% 100%,0 100%)}
```

## 色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 夜牆 | `#2E2F2B` | 唯一大面積底；水泥雜訊 | 45% |
| 新聞紙 | `#ECE6D6` | 所有內容都在紙上 | 35% |
| 朱墨 | `#C9261C` | 主墨、警語、叫車 | ≤10% |
| 藍墨 | `#1F3C8F` | 安全、夜歸 | ≤5% |
| 黑墨 | `#1C1B18` | 公告、正文 | ≤8% |
| 綠墨 | `#22663A` | 機場、交通 | ≤4% |
| 鈉燈 | `#E9A23B` | 只當光：牆上的路燈暈、舉手、focus。永遠不是墨 | ≤2% |

規則：同一張紙上只出現一個墨。牆上不同紙可以不同墨。鈉燈色不得印在紙上。

## 字體系統

- 口號：Noto Sans TC 900（Google Fonts），經 `#rough` 毛邊＋逐字歪斜。尺寸 clamp(28px,4.6vw,84px)，行高 1.02，字距 −.02em。
- 拉丁／電話：Anton 400 全大寫，字距 .01–.06em（Atelier 手寫大寫的替身）。
- 正文：Noto Sans TC 500，16px／1.75；表格 15px。
- 公告小字：Special Elite（打字機，1968 傳單是打字油印），11–13px，只用於日期、議程、出處。
- 禁止：細字（<500）、斜體、襯線體當口號。

## 版面與網格

- 版面是一面牆，不是網格。紙張以 CSS Grid 粗略排位後，各自 `--r` 旋轉 −2°～+2°，彼此可以壓角。
- 首屏是一條曬衣繩：剛刮好的海報用夾子夾著晾（Atelier 照片裡最常見的畫面），每張 3:4。
- 右側 180px 留給撕條導覽；≤900px 時導覽移到底部、內容單欄。
- 紙內留白：padding 18–28px；口號與剪影佔滿紙面 70% 以上，海報不留「設計感的空白」。

## 元件配方

- **導覽（撕條傳單）**：一張貼在右側的叫車傳單，下緣四條直排撕條＝四頁；目前頁那一條已被撕掉，只剩鋸齒殘根（`clip-path` 鋸齒＋`visibility:hidden`）。hover 時撕條往下掀 5px、轉 −3°。手機變成底部橫列。
- **按鈕**：墨色實心＋紙色字，`box-shadow:4px 4px 0` 硬影，旋轉 −.6°；按下位移 2px。次要按鈕＝2px 墨框。零圓角。
- **卡片**：就是一張紙（`.sheet`），一墨，可撕角（`.torn-tr`／`.torn-bl`）或貼膠帶（`.tape`）。
- **表格**：虛線分隔 `1.5px dashed rgba(28,27,24,.3)`，表頭 900 字重，無底色。
- **表單**：底線輸入框（3px 墨線）、字磚按鈕（1.5px 內框）、墨色色塊選擇（22px 方塊、選中下緣 3px）。
- **頁尾**：在牆上，不在紙上；紙色 78% 透明度的小字。

## 動效規則

| 種類 | 本站自製 | 觸發 | 數值 | reduced-motion |
|---|---|---|---|---|
| ambient | 晾繩擺動（環境風 `sin(t/1700)+sin(t/610)`）＋車燈掃過牆（soft-light 光斑 14s 一趟） | 自動 | 彈簧 k=18、阻尼 3.2、上限 ±14° | 不擺、不掃 |
| input | 手掃過繩子推動海報（指標水平速度 ×1.9 注入角速度）；服務單張隨游標掀角（rotateY ±5°）；撕條 hover | pointer | 同幀回應 <16ms | 掀角照常（資訊不變） |
| transition | 跨文件 View Transitions「刷貼」：新頁由上往下被刷上牆（clip-path 0→100%，先下沉 −14px 再回彈 2px） | 換頁 | .62s `cubic-bezier(.55,.05,.25,1)` | `@view-transition{navigation:none}` |
| signature | **收乾 cockle-settle**：剛刮好的海報是濕的——紙因吸水起皺（feDisplacementMap scale 16）、墨色偏暗偏飽和（brightness .8、saturate 1.3）；3.2–3.6s 內 smoothstep 收平到 scale 1.4 的殘皺、墨轉霧面。每張一支獨立 filter | 每次印出一張 | 見左 | 直接呈現乾的成品 |

其他：〈入社〉的年份條在進入視窗時由上往下貼上（clip-path inset，.5s）。

### motion-library 元件（1.38.0 @e1382805）

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-A-14 | Torn Text | 晾版 | text「夜班照常」, colors 三格 `#1C1B18／#1C1B18／#ECE6D6`, duration 1.6, loop false, 16:9, seed 68 | transition（一次性） | 一句話被撕成上下兩半再對齊＝牆上被撕過又補貼的海報；只畫平塗字與鋸齒裁切，無漸層無發光，一墨 |
| BG-A-32 | Shock Lines | 晾版 | colors `#C9261C／#C9261C／#ECE6D6`, duration 9, density .7, intensity .8, 16:9, seed 5 | ambient | 朱墨放射楔＝「05:30 天光收班」的日出；全是平塗三角形，正是 68 海報裡工廠與太陽的放射線語彙 |
| TXT-B-10 | Stop Motion | 開會 | text「今晚貼什麼」, 黑墨／紙, duration 1.4, loop false, 16:9, seed 14 | transition（一次性） | 12 格逐格跳出、每格微歪＝手刻字一個一個貼上去的節奏；不平滑、不補間，符合手工感 |
| BG-B-37 | Minimal Stripes | 叫車 | colors `#ECE6D6／#ECE6D6／#2E2F2B`, duration 8, density 1.4, intensity .6, 16:9（裁成 120px 條帶）, seed 88 | ambient | 夜裡路口的斑馬線緩緩移動；紙色平塗條紋在牆色上，兩色、零漸層 |
| TXT-A-03 | Stamp In | 入社 | text「同車」, 朱墨／紙, duration 1.2, loop false, 1:1, seed 88 | transition（一次性） | 合作社社章蓋下去＝ 68 海報角落的「Atelier Populaire」手蓋章；單一朱墨描框＋字 |

元件提示詞可由 `MotionLib.prompt(id)` 取得。掛載規則：等 `document.fonts.ready`、離屏 `destroy()`、一次性元件只播一次、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

技法 `atelier-stencil-silhouette` 單墨剪影：所有圖都是 100×100 盒裡的多邊形＋圓＋挖洞，頂點加 ±0.8 單位決定性抖動（剪刀剪的不準），再經單墨過網引擎印出。禁止：線稿、漸層、寫實插畫、照片、超過一個主圖、裝飾花邊。可用母題：車、頂燈、方向盤、鑰匙、門、月、飛機、傘（換產業就換成該產業的工具與場所）。

## Logo 與 Favicon 設計指南

- Logo：朱墨梯形頂燈剪影，「同車」二字反白刻進燈罩、各自歪 −3°／+4°，下方 700 字重社名。一墨、紙底。
- Favicon：32×32 紙底朱墨頂燈，燈窗挖空。inline SVG data URI。
- 不做漸層版、不做描邊版、不做多色版。

## Do & Don't

- Do：一張一墨；口號短到開車經過看得完；字壓圖反白；讓墨缺一點、紙皺一點；不署名。
- Do：讓功能本身練習這個流派的限制（本站〈開會〉的九個表決人，每個人就是一條特徵）。
- Don't：紫藍漸層、置中三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- Don't：把 68 的真實口號與真實海報直接複製；照抄規矩、內容自己寫。
- Don't：加第二墨色的「設計感」雙色版——那是 1970s 之後的商業網版，不是這裡。
- Don't：用半調網點（那是平版印刷與普普）、用霓虹發光、用金屬或玻璃擬態。

## 頁面骨架範例

```html
<body>
 <svg width="0" height="0"><filter id="rough">…</filter></svg>
 <main class="wrap">
  <section class="line"><svg class="cord">…</svg>
   <ul class="hang"><li class="peg"><span class="pin"></span>
    <figure class="poster" role="img" aria-label="朱墨海報：車行需要你，你不需要車行"><canvas aria-hidden="true"></canvas>
     <div class="fb" style="--ink:#C9261C"><svg viewBox="0 0 100 100">…</svg><div class="cut">車行需要你<br>你不需要車行</div></div></figure></li></ul>
  </section>
  <article class="sheet tract blk torn-tr" style="--r:-.8deg"><h2 class="cut">一句話</h2><p>正文…</p></article>
 </main>
 <nav class="flyer sheet"><div class="head"><b>同車</b><div class="tel">02-2302-1988</div></div>
  <div class="tabs"><a href="index.html" aria-current="page">晾版<i>01</i></a><a href="assembly.html">開會<i>02</i></a>…</div></nav>
</body>
```

## 技術實作與相容性

| 技術 | 承載 | 支援現況（查證 2026-11） | fallback |
|---|---|---|---|
| Canvas 2D `getImageData`／`putImageData` 逐像素單墨過網 | 特徵①④：模版 alpha → 兩層 value noise 咬毛邊（閾值隨墨量 load 移動＝糊版／缺墨）→ 沿刮刀方向 `0.14·t^2.2` 缺墨＋刮痕條＋白點 → 每 4px 網目 ×0.94 → 單墨 RGBA | 全瀏覽器（MDN Baseline） | 無 canvas 或 JS：顯示同一張海報的 HTML/SVG 版（`.fb`，同一剪影同一口號同一墨） |
| SVG filter `feTurbulence`＋`feDisplacementMap`（CSS `filter:url(#id)` 套在 HTML 元素上） | 特徵②毛邊字；簽名「收乾」逐幀改 `scale` 16→1.4 | Chrome／Edge／Firefox 完整；Safari 支援 HTML 元素上的 url() 濾鏡（MDN） | 濾鏡無效時字照常顯示，只是邊緣平滑；收乾退化為只有 brightness 變化 |
| 跨文件 View Transitions `@view-transition{navigation:auto}` | 轉場「刷貼」 | Chrome／Edge 126+、Safari 18.2+；Firefox 標示部分支援（caniuse／Chrome Developers 文件） | 以 `'onpagereveal' in window` 偵測；不支援時進場由 `html.paste-in main` 自己跑同一支 keyframes |

效能（node 22 實測，純 JS 引擎）：540×720 一張約 25ms；首頁 360×480 每張約 11ms，五張以 380ms 間隔逐張印（同時也是「一張一張刮」的節奏），首屏單次 JS 任務 <30ms。草稿預覽 300×400 約 7ms、改字 60ms 防抖。每頁 194–204KB（motion-library 子集 terser 後約 171KB 佔大宗）。同一畫面運轉元件 ≤2。

查證來源：MDN〈CanvasRenderingContext2D.getImageData〉〈feDisplacementMap〉〈@view-transition〉；caniuse「Cross-document view transitions」；developer.chrome.com〈Cross-document view transitions for multi-page applications〉；Tate Papers no.24（Atelier Populaire 史實）。
