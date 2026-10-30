---
name: gothic-book-of-hours-kalendarium
description: International Gothic Book of Hours (Paris/Bourges c.1380–1420, Limbourg brothers' Très Riches Heures) — vellum ground, lapis, vermilion and burnished gold, Textura with red rubrics, KL calendar pages computed by the medieval computus, ivy-leaf bar borders with marginal drolleries, and arched miniatures with zodiac tympana and diaper grounds.
---

# 哥德時禱書・曆頁半身 Gothic Book of Hours — Kalendarium

> 示範站：日課田（臺東池上的稻米與月令箱）。本規格書不綁產業：任何「有年曆、有節令、有逐月內容」的品牌（農場、花店、茶行、酒窖、裁縫、學校行事曆）都能用。

## 設計哲學

時禱書（Livre d'heures）是十四到十六世紀歐洲俗人最常擁有的一本書：照八個「時辰」排的禱文，前面附一份十二個月的**曆頁 Kalendarium**。巴黎與布爾日在 1380–1420 年間把它做成國際哥德式的頂點——Jean Pucelle《Jeanne d'Évreux 時禱書》（c.1324–28）立下頁緣怪趣（drôleries）與常春藤邊飾的語彙；林堡兄弟（Paul、Herman、Johan Limbourg）為貝里公爵畫的《豪華時禱書 Très Riches Heures》（c.1411–16，1485–89 由 Jean Colombe 補完，今藏尚蒂伊城堡孔代博物館）把曆頁做成「上為黃道拱楣、下為那個月農事」的定式。2025 年 6 月 7 日至 10 月 5 日，孔代博物館趁修復把它拆開，十二張月曆頁第一次並排展出。

它為什麼長這樣——全部來自材料與用途：

- **犢皮紙很貴、青金石更貴**：群青（lapis lazuli 研磨）比金還稀有，所以藍只用在最重要的地方；朱砂（vermilion）便宜、拿來寫「紅字」（rubric＝紅），把重要的日子、標題與指示從黑字裡挑出來——「紅字日」這個詞就是從這裡來的。
- **金不是顏料，是金箔**：先在羊皮上堆一層石膏底（gesso）讓它隆起，再貼金、用瑪瑙刀磨亮。所以金在燭光下會隨你的角度一閃一閃，而且邊緣有一條陰影——它是**被墊高的平面**，不是平塗的黃。
- **曆頁是一張表**：每天一列，欄位是金數（新月）、主日字母、羅馬計日、聖人名；開頭一個巨大的 **KL**（Kalendae）合字。這是中世紀的「計算機」——用 computus 算出復活節與每年的禮拜日。
- **邊框是給眼睛休息的**：常春藤細莖、三裂金葉、一條藍朱交替的框條，空白處住著荒謬的小動物——騎蝸牛的騎士、吹號的兔子。嚴肅的內文、胡鬧的頁緣，是這個流派的幽默。

本規格書要你做的是「**一本會算日子的書**」：每個月一頁、會亮的金、紅字日、和在邊上散步的怪東西。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是時禱書，只是「有點中世紀的網站」。

### ① 犢皮底＋青金・朱・磨金三色（磨金必須隨光閃）

底色是犢皮 `#F1E6CC`（≥50% 面積，帶極淡毛孔點）；主色只有三個：群青 `#24408E`、朱 `#C23A22`、磨金 `#C9A23A`。金一律是**墊高的金箔平面**：一條隨游標（燭光）移動的亮帶＋下緣 1px 暗金邊。全站唯一允許的漸層就是這條金的光帶。

```css
:root{--vel:#F1E6CC;--lap:#24408E;--ver:#C23A22;--au:#C9A23A;--aud:#8E6B1E;--aul:#F1DA88;--gx:50%}
body{background:var(--vel);background-image:radial-gradient(circle at 30% 40%,rgba(42,33,24,.035) 0 1px,transparent 1.5px);background-size:19px 23px}
.au{background:linear-gradient(100deg,var(--aud) 0,var(--au) 30%,var(--aul) 46%,#FFF3C4 50%,var(--aul) 54%,var(--au) 70%,var(--aud) 100%);
 background-size:320% 100%;background-position:var(--gx) 0;box-shadow:inset 0 -1px 0 var(--aud),inset 0 1px 0 var(--aul)}
/* JS：addEventListener('pointermove',e=>root.style.setProperty('--gx',100-e.clientX/innerWidth*100+'%')) */
```

SVG 裡的金用 `userSpaceOnUse` 的 linearGradient，JS 改它的 `gradientTransform`：

```svg
<linearGradient id="au" class="aug" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="420" y2="90" spreadMethod="reflect">
 <stop offset="0" stop-color="#8E6B1E"/><stop offset=".34" stop-color="#C9A23A"/><stop offset=".48" stop-color="#F1DA88"/>
 <stop offset=".5" stop-color="#FFF3C4"/><stop offset=".52" stop-color="#F1DA88"/><stop offset=".66" stop-color="#C9A23A"/><stop offset="1" stop-color="#8E6B1E"/></linearGradient>
```

### ② Textura 黑字＋朱字（rubric）＋段號與行末填飾

拉丁字一律 Textura 哥德黑字（Google Fonts **Texturina**）；中文正文 Noto Serif TC。標題、紅字日、操作說明用朱；段首 ¶ 朱藍交替；正文下有淡玫瑰色劃線（抄寫員打的格）；段落最後一行的空白用藍朱金的「行末填飾 line-filler」補滿。

```css
.tx{font-family:"Texturina",serif}
.textblock p{background:repeating-linear-gradient(transparent 0 calc(1.85em - 1px),rgba(181,83,107,.18) calc(1.85em - 1px) 1.85em)}
.pil::before{content:"¶";font:700 1.05em/1 "Texturina";margin-right:.35em;color:var(--ver)}
.pil:nth-of-type(2n)::before{color:var(--lap)}
.filler::after{content:"";display:inline-block;width:5.5em;height:.42em;margin-left:.5em;
 background:linear-gradient(90deg,var(--lap) 0 38%,#FBF6E8 38% 42%,var(--ver) 42% 80%,var(--au) 80%);box-shadow:inset 0 0 0 1px #2A2118}
```

### ③ 泥金首字與 KL 合字

每一節以一個方形首字開頭：磨金外框、玫瑰或群青底、白色點飾與細白線、字身藍（或白）並以 `paint-order:stroke` 描白邊。曆頁一律以 **KL** 開頭（K 金、L 白，左藍右玫瑰）。

```svg
<svg viewBox="0 0 100 100"><rect x="1" y="1" width="98" height="98" fill="url(#au)" stroke="#2A2118" stroke-width="1.4"/>
 <rect x="9" y="9" width="82" height="82" fill="#B5536B" stroke="#2A2118"/>
 <path d="M18 50c8-14 22-14 32 0s24 14 32 0M18 50c8 14 22 14 32 0s24-14 32 0" fill="none" stroke="#FBF6E8" stroke-width=".9" opacity=".75"/>
 <text x="50" y="69" text-anchor="middle" font-family="Noto Serif TC" font-weight="900" font-size="58" fill="#24408E" stroke="#FBF6E8" stroke-width="1.6" paint-order="stroke">池</text></svg>
```

### ④ 常春藤框條邊飾＋頁緣怪趣

內容區外圍：一條 1.2px 墨框＋內側朱細線；左側一條 8px 寬、藍朱每 46px 交替的框條，接縫處貼一塊金；四角與邊上伸出墨色細莖，節點長出**三裂常春藤葉**（六成金、其餘藍或朱）、捲鬚與金點。框線上住著怪趣小動物，沿框走路。

```svg
<path id="lf" d="M0 0C-2-3-7-3-8 1C-11 0-13 4-10 7C-12 10-8 13-5 11C-4 14 0 14 0 11C0 14 4 14 5 11C8 13 12 10 10 7C13 4 11 0 8 1C7-3 2-3 0 0Z" stroke="#2A2118" stroke-width=".9"/>
<use href="#lf" transform="translate(120 18) rotate(40) scale(.7)" fill="url(#au)"/>
```

```css
.dro{position:absolute;left:0;top:0;width:64px;height:46px;offset-path:path("M12 12H1088V748H12Z");offset-rotate:auto;offset-anchor:50% 92%}
```

### ⑤ 拱楣細密畫：黃道拱楣＋平塗人物＋菱格／星空地

月令圖固定 4:5：外框群青、磨金框帶、玫瑰底綴白點；上方半圓拱楣（群青帶上金星→白環寫兩宮黃道名→金色放射日輪→藍心寫月名），下方是那個月的農事：山是一層層圓頂的「哥德岩」並以白細線提亮，人物平塗、墨線勾、衣上三四道白線（hatching）提亮，天空是群青＋金星或**菱格（diaper）**。零透視、零陰影、零模糊。

```svg
<path d="M40 182A160 160 0 0 1 360 182Z" fill="#24408E" stroke="#2A2118"/>      <!-- 黃道帶 -->
<path d="M62 182A138 138 0 0 1 338 182Z" fill="#FBF6E8"/><text font-family="Texturina" fill="#C23A22"><textPath href="#arc" startOffset="50%" text-anchor="middle">Libra · Scorpio</textPath></text>
<path d="M98 182A102 102 0 0 1 302 182Z" fill="url(#au)"/>                    <!-- 日輪 -->
<path d="M-13 2L-9-40h18L13 2Z" fill="#C23A22" stroke="#2A2118"/><path d="M-8-34l4 14M-5.4-32.7l4 14" stroke="#FBF6E8" stroke-width=".9"/> <!-- 人物衣身＋白線提亮 -->
```

## 色彩系統

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 犢皮 | `#F1E6CC` | 頁面地 | 50–60% |
| 犢皮暗 | `#E6D6B2` | 翻頁紙背、次級底 | ≤5% |
| 沒食子墨 | `#2A2118` | 正文、所有輪廓線 | 10–14% |
| 群青 | `#24408E` | 細密畫框與天、KL 左半、首字身、選中態 | 10–14% |
| 朱 | `#C23A22` | 紅字（標題、紅字日、禮拜日字母）、主按鈕 | 5–8% |
| 磨金 | `#C9A23A`（暗 `#8E6B1E`／亮 `#F1DA88`） | 首字框、葉、框條接縫、日輪 | 5–8% |
| 銅綠 | `#3E7A4E` | 葉、田、第三條絲帶 | ≤5% |
| 玫瑰 | `#B5536B` | 首字底、細密畫外地、第四條絲帶 | ≤4% |
| 鉛白 | `#FBF6E8` | 白點飾、提亮細線、表單底 | ≤4% |

規則：顏料之間不混成漸層；淡色＝顏料混白（如水田 `#6F86BF`），不是 opacity。唯一漸層是金的光帶。

## 字體系統

- **Texturina**（Google Fonts，opsz 12–72、wght 400/700）：所有拉丁字——月名、黃道、羅馬計日、主日字母、標題副標、題記。
- **Noto Serif TC** 500／700／900：中文正文 17px／1.85、標題 26px 900（朱、字距 .08em）、首字 58px 900。
- 曆表：日數 Texturina 700 15px；羅馬計日 Texturina 400 14px；名稱 14px。
- 禁止無襯線體出現在可見文字。

## 版面與網格

- 頁面是一張紙：`max-width:1240px`，四周留白依中世紀頁面比例**外側與下方較寬**（`padding:28px 7.5vw 60px 4.5vw`）。
- 書頭（masthead）以 3px 雙線收尾；內容以「對開」為單位：左頁 verso（細密畫）0.95fr、右頁 recto（曆表或內文）1.05fr，中縫 44px。
- 每個重要區塊都是 `.framed`（內距 34–40px）＋邊飾；正文欄最寬 760px。
- 零旋轉；只有怪趣角色會沿框轉向。
- ≤860px 對開疊成單欄；≤560px 曆表欄寬收窄（見元件配方）。

## 元件配方

- **導覽＝書籤絲帶**：右上四條絲帶從頁頂垂下（朱、藍、綠、玫瑰各一），直書中文＋底部 Texturina 小字，下端燕尾 `clip-path:polygon(0 0,100% 0,100% 100%,50% calc(100% - 14px),0 100%)`；hover 以 `steps(4)` 拉長 26px；現用頁最長（168px）並在末端掛一顆金珠。
- **曆表（subgrid）**：`ol.kal` 定義五欄 `2.2em 1.4em 2.1em 6.2em 1fr`，每一列 `li` 為 `grid-column:1/-1;grid-template-columns:subgrid`，所以表頭、每一天、使用者的紅字日永遠對齊同一組欄線；`@supports not (grid-template-columns:subgrid)` 時每列自帶同一組欄寬。禮拜日的主日字母大寫朱字；紅字日整列名稱朱字粗體；使用者自己的日子前面加一顆 45° 金菱。
- **按鈕**：朱底白字、2px 同色內框＋1px 金內線（`box-shadow:inset 0 0 0 2px var(--ver),inset 0 0 0 3px var(--au)`），零圓角零陰影。
- **表單**：鉛白底、1.5px 墨框、零圓角；月份選擇是 4×3 的方格按鈕，選中變群青底＋下緣 4px 金。
- **頁腳＝卷末題記 colophon**：`Explicit.`（朱、Texturina）＋地址電話；3px 雙線上框。

## 動效規則

| 種類 | 本站實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **燭光磨金**：所有金面的光帶依 `0.5+0.38·sin(t/4.2s)+0.06·sin(t/0.57s)` 緩慢漂移（燭火會抖）；＋ML 菱格天 | 無輸入 2.5 秒後 | 每 40ms 更新一次 `--gx` 與 SVG gradientTransform | 光帶停在中央；游標仍可移動它（那是輸入） |
| input 輸入 | **游標即燭**：光帶追游標（追隨係數 .35，<1 幀）；怪趣角色在游標 80px 內停步，福壽螺縮眼、白鷺停腳；曆表列 hover 鋪金 | pointermove | 立即 | 光帶直接跳到游標位置，角色不動 |
| transition 轉場 | **翻犢皮頁**：點站內連結→一張劃格紙背以左緣為軸 `rotateY(180→0)` 翻過來蓋住（520ms，cubic-bezier(.55,.05,.35,1)），新頁抵達再 `0→−180` 翻走（620ms）；月令頁換月份時大圖本身 rotateY 翻頁；封裝結果以 `clip-path:inset()` `steps(14)` 逐行展開 | click／鍵盤 | 見左 | 全部取消，直接換頁 |
| signature 簽名 | **頁緣怪趣巡行 drôlerie patrol**：福壽螺、稻草人騎士、白鷺、吹螺兔沿常春藤框線用 CSS `offset-path` 走路（`offset-rotate:auto` 所以在右緣、底緣會側著、倒著走），腳步是 `steps(2)` 兩格；騎士逆向走，遇到福壽螺就停下來比武 1.2 秒（長矛 −14°、螺縮眼）然後錯身而過；框的尺寸一變，ResizeObserver 重算路徑並保留各自進度 | 常駐 | 速度：螺 9、騎士 22、兔 26、鷺 30 px/s | 角色停在框上固定位置（7%／32%／57%／82%），仍看得到 |

自我限制：禁用淡入、數字滾動、視差、跑馬燈；所有動作都是「燭光」「翻頁」「走路」三種中世紀抄本裡真的有的動作。

### motion-library 元件表（PLAYBOOK §2.8）

元件庫 `wenxiangxiao/motion-library` 1.25.0 @9b3a7ba8；子集由 `tools/ml-embed.js` 產生並 inline 為每頁第一個 `<script>`，`tools/ml-smoke.js` smoke ok。只選 BG／SHP——TXT 類的字型是無襯線，會破壞特徵②。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-01 | Grid Fill | index | primary `#C9A23A`、secondary `#C23A22`、bg `#24408E`、duration 9、density 1.4、intensity .9、seed 1411、16:9 | ambient | 首頁月令圖的天空換成**金朱方格菱格（diaper）**——國際哥德細密畫最典型的背景；元件只有 fillRect 方格與格線，零圓角零發光 |
| BG-B-16 | Weave Grid | yue-ling | primary `#24408E`、secondary `#C23A22`、bg `#C9A23A`、duration 14、density 1.3、intensity .8、seed 1416、16:9 | ambient | 月令大圖天空是**藍朱交織的錦幔（cloth of honour）**，人物背後掛布是哥德細密畫的定式；條帶交織、無圓角 |
| SHP-33 | Squiggle Draw | ding | primary `#24408E`、secondary `#C23A22`、bg `#FBF6E8`、duration 1.6、loop false、seed 3、16:9（以 46px 條帶裁切） | transition | 按「上金封裝」時在合計下方**畫出一條行末填飾**——抄寫員用波浪筆畫把行尾空白補滿；底下的淡格線就是打格線 |
| SHP-15 | Ring Expand | shi-chen | primary `#C23A22`、secondary `#C9A23A`、bg `#FBF6E8`、duration 2.4、seed 8、1:1 | ambient | **此刻時辰的鐘聲**：朱金同心圓一圈圈擴散，放在「現在是第幾時」旁邊——時禱書的時辰本來就是敲鐘報的 |
| BG-A-15 | Triangle Grid | shi-chen | primary `#C9A23A`、secondary `#C23A22`、bg `#24408E`、duration 12、density 1.2、intensity .8、seed 1485、16:9 | ambient | 「來田裡」資訊牌背後的**菱形 lozenge diaper**，三角拼成的金朱菱格，像牌匾後的彩繪地 |

掛載：`JD.ml(el,opts)`（照 `sites/ka-to` 的 `KT.ml`）——等 `document.fonts.ready`；IntersectionObserver 離屏 `destroy()`、回視窗重掛；一次性元件 `loop:false` 播一次後 `seek(1)`；canvas `aria-hidden`；容器內 `.ml-fb` 文字掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、SHP-33 `seek(1)`。同一畫面同時運轉 ≤2 個（時辰頁的鐘與菱格分屬上下兩區）。每個元件的開發 Prompt 可由 `MotionLib.prompt(id)` 取得。

## 插畫與圖像風格

**gothic-miniature-kit 哥德細密畫組件**——全部由 JS 函式產生 SVG（建置期烤一張給無 JS）：

- `mini(month,{diaper})`：400×500，外框群青→9px 磨金框帶→玫瑰地白點；黃道拱楣（群青帶 15 顆金星、白環 textPath 兩宮名、金日輪 13 道打點放射、藍心月名）；景（哥德岩 `range()`、田帶 `field()`、人物 `fig()`、水牛、三合院、白鷺）。
- 田的質感用 `<pattern>`：金稻（`q2-10 6-12` 稻穗）、綠秧（V 字兩筆）、油菜（五點黃）、水田（白色水平細線）、曬穀場（短橫）。
- 人物：斗笠、平塗衣身、墨線 1px、白線 hatching 三四道；姿勢 bend／reap／sow／carry／rake／pick／rain（蓑衣）／sack／plow／hoe。
- 首字 `initial(ch)`、`klSVG()`、邊飾 `border(w,h,seed)`、怪趣 `DRO.snail|knight|egret|hare`。
- 禁止：透視消失點、陰影、模糊、照片、寫實光影、細線幾何線描小屋。

## Logo 與 Favicon 設計指南

Logo 是一枚首字方塊：磨金外框→群青底→朱色半圓拱（拱楣）內嵌金日→下方綠田以墨線十字分成四塊、四株秧苗用亮金細線。Favicon 為同構 32×32：金框、藍底、朱拱、綠田十字。不要放字。

## Do & Don't

- Do：讓金會隨游標亮；紅字只給「重要的日子與指示」；每頁至少一個首字；細密畫一律 4:5 拱楣；邊上放一兩個會走的小動物。
- Do：曆表真的算——主日字母、金數、羅馬計日、新月與節氣都由當年計算。
- Don't：紫藍漸層、置中三卡片、圓角卡片陰影、emoji、Lorem ipsum、EST. 徽章。
- Don't：把金做成平塗黃色（它是墊高、會亮的）；把哥德字用在中文；用無襯線字；做「羊皮紙捲軸＋蠟封」的奇幻遊戲風——那是 RPG，不是時禱書。
- Don't：讓怪趣角色擋住內文——它們只能走在框線上。

## 頁面骨架範例

```html
<div class="wrap">
 <header class="mast"><a class="logo" href="index.html"><!-- logo svg --></a><h1>店名<small class="tx">Latin name</small></h1>
  <nav class="ribbons"><a href="index.html" aria-current="page">曆<span>Kalendarium</span></a><a href="labores.html">月令<span>Labores</span></a></nav></header>
 <main>
  <section class="spread framed" data-bord data-dro="knight snail egret hare">
   <div class="verso"><div class="mini"><!-- mini(month) --></div></div>
   <div class="recto"><div class="klhead"><div class="kl"><!-- klSVG() --></div><h3>十月<span class="tx">October · 2026</span></h3></div>
    <ol class="kal"><li class="hd"><span>新月</span><span>字</span><span>日</span><span>羅馬計日</span><span>名</span></li>
     <li class="sun"><span class="gn"></span><span class="dl">D</span><span class="dn">4</span><span class="rd">IV Non.</span><span class="nm"></span></li></ol></div>
  </section>
  <section class="textblock"><h2 class="rh">標題<span class="tx">Prologus</span></h2>
   <p class="pil"><span class="ini"><!-- initial('池') --></span>正文……</p><p class="pil filler">最後一段。</p></section>
 </main>
 <footer class="colo"><div><b>Explicit.</b><p>此冊至此完。</p></div></footer>
</div>
```

## 技術實作與相容性

### 1. CSS `offset-path: path()`＋`offset-rotate`（B 動效層：SVG SMIL／animateMotion／offset-path）

- 支援：MDN `offset` 標記 Baseline Widely available（2022-09 起各瀏覽器可用）；caniuse〈offset-path: path()〉現行 Chrome／Edge／Firefox／Safari 皆支援。`offset-position` 為 Baseline 2024，本站不使用。
- 用法：路徑字串以容器 px 座標寫成矩形 `M m m H w-m V h-m H m Z`；WAAPI `el.animate([{offsetDistance:'0%'},{offsetDistance:'100%'}],{iterations:Infinity})`，`playbackRate=0` 即停步；ResizeObserver 重算路徑時保留 `currentTime`。
- Fallback：`CSS.supports('offset-path','path("M0 0H10")')` 為否→角色以 left/top 擺在框四角、不走；reduced-motion→停在 offsetDistance 7／32／57／82%。

### 2. CSS Grid `subgrid`（C 版面層）

- 支援：web-platform-dx〈subgrid〉Baseline Newly available 2023-09-15（Chrome／Edge 117、Firefox 71、Safari 16），預計 2026-03-15 Widely available；web.dev〈Baseline 2023〉同。
- Fallback：`@supports not (grid-template-columns:subgrid)` 讓每一列自帶同一組 `grid-template-columns`——欄線仍對齊（因為欄寬全是固定值＋1fr），只是不共用軌道。
- 為何需要：時禱書曆頁的本質是「每天一列、欄位對齊」的表；使用者插入的紅字日、表頭、節氣名長短不一，subgrid 讓所有列共用父層五條軌道。

### 3. 中世紀曆算 computus（E 資料與生成層：規則引擎＋決定性計算）

- 主日字母：1 月 1 日起 a–g 循環，閏年 2 月 24 日後退一字（bissextile 重複）；當年第一個禮拜日的字母即主日字母（2026＝D、2027＝C、2028＝BA）。
- 金數：`Y mod 19 + 1`（2026＝XIII）；標在當年每次新月的那一天。新月以 Meeus《Astronomical Algorithms》第 49 章平朔＋主要週期項修正（誤差約 ±2 小時），換成臺灣時間 UTC+8。
- 復活節：Meeus／Jones／Butcher 格里曆演算法（2026-04-05、2027-03-28，與實際相符）。
- 羅馬計日：Kalendae／Nonae／Idus 倒數（3、5、7、10 月 Nones 在 7 日、Ides 在 15 日，其餘 5／13 日）；例：10 月 16 日＝XVII Kal.（Nov.）。
- 節氣：太陽視黃經低精度公式（L＝280.46°＋0.9856474°n，加 1.915° sin g＋0.02° sin 2g），每 15° 一節氣、以臺灣日界判日；2026 寒露 10/8、霜降 10/23、立春 2/4 驗算吻合。
- 效能實測（node 22）：一年曆表冷啟動 1.3ms、細密畫 0.9ms、12 張縮圖 3.7ms、邊飾 1.1ms。

### 4. 其他

- 翻頁：CSS 3D `rotateY`＋`backface-visibility:hidden`＋WAAPI；不支援 `Element.animate` 時直接換頁。
- 效能預算：單頁 280–305KB（motion-library 子集約 227KB＋頁面 55–78KB）；首屏 JS（kit＋曆表＋邊飾）<10ms，元件掛載等字型就緒；磨金光帶每 40ms 更新一次（25fps 足夠燭光），分頁隱藏時停。
- 無 JS：建置期已把當月細密畫、KL、首字、曆表與全部文字烤進 HTML；月令頁 `<noscript>` 列出十二個月內容。
