---
name: ospaaal-tricontinental-solidarity-poster
description: Cuban OSPAAAL / Tricontinental solidarity-poster style — three flat ink screens on paper, one metamorphic black silhouette wrapped in dilated echo bands, a huge "day of solidarity" date, a four-language caption band set to equal width, and fold creases from a poster that travelled folded inside a magazine.
---

# 古巴 OSPAAAL 團結海報（Cuban OSPAAAL / Tricontinental Solidarity Poster）

> 示範站：禮拜天電台 RADIO MINGGU（`sites/radio-minggu/`）——桃園後站一週只播一天的移工社區電台，每月《四方》夾一張四語海報。本規格書讓任何 AI 不看 Demo 也能做出同風格的新網站。
>
> 與館內 `sites/yagruma`（古巴絹印海報 Cartel Cubano，ICAIC 電影海報半身）的分界：yagruma 的本體是**三罐專色的 multiply 疊印與套準**（第四色只能疊出來、未套準的版是開場）；本規格的本體是 **OSPAAAL 團結海報的資訊結構**——一個變形符號、三圈回聲線、團結日日期、四語圖說帶、隨刊摺痕。兩者同源於 1960–70 年代哈瓦那，但要做 OSPAAAL 就用本檔，要做古巴電影海報就用 yagruma。

## 設計哲學

1966 年一月，八十多國代表在哈瓦那開三洲會議（Tricontinental Conference），會後成立 **OSPAAAL**（Organización de Solidaridad de los Pueblos de Asia, África y América Latina）。它的主要傳播工具是《Tricontinental》雜誌：**海報摺起來夾在雜誌裡**，讀者拆下來就能貼；1989 年發行量 30,000 份、寄到 87 國。1967–2019 年間約三百多款海報，多數為平版膠印、少數絹印（V&A 指出 Antonio Mariño〈Day of Solidarity with Guatemala〉1970 為絹印例）。

它長成這樣是因為**匱乏**：材料有限，所以油墨只有三、四色、平塗、不疊網點；Alfredo Rostgaard 為第一張隨刊海報〈Create, two, three…many Vietnams〉（1967）用「馬賽克／重複法」——一個小圖重複排滿整張，以最少材料做出最大的圖。它要寄到全世界，所以**每張標語都印四種語言**（西、英、法、阿拉伯文）；它是「團結日」海報，所以**日期是主標**。設計師同時做電影海報、普普與歐普——Elena Serrano〈Day of the Heroic Guerrilla〉（1968）以同心放射的歐普圖形把一個剪影推向全世界。

**本風格的精神：一張紙、三片網、一個符號、四種語言、一個日子。** 熱鬧來自撞色與回聲線，不來自元素數量。示範站把「四語」從裝飾變成版面結構：使用者選的語言排第一、字最大，其他三種仍在、不被藏起來。

參照：V&A〈Solidarity and design: An introduction to OSPAAAL〉；UC Irvine OAC〈OSPAAAL Poster Collection MS.M.023〉；Josh MacPhee《Armed by Design》（Common Notions, 2024）；Lincoln Cushing《¡Revolución! Cuban Poster Art》（Chronicle, 2003）。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 OSPAAAL 了。

### ① 三片網版平塗：地色、回聲、黑版，紙白＝不印

一張海報最多 3–4 色，每一色是一片網版／一塊印版；色塊全平、零漸層、零陰影、零透明疊色、零網點。紙白是「沒印」的地方。

```css
:root{--paper:#F3EEE2;--ink:#161412;--mag:#E0157A;--grn:#1F9D55;--yel:#F5D10F}
.pst{background:var(--g,var(--yel))}            /* 第 1 版：地色鋪滿 */
.pst .echo{filter:url(#echo-mg)}                 /* 第 2 版：回聲（見③） */
.pst .key{fill:var(--ink)}                       /* 第 3 版：黑版——符號、日期、字 */
/* 禁止：linear-gradient 填色、box-shadow 模糊、opacity<1 的色塊 */
```

### ② 一個變形符號（A 長成 B）居中，黑色實心剪影

整張只說一件事，用一個視覺變形說：天線長成稻穗、手機訊號開成花、漁網收成星、輪椅長翅膀、安全帽裡升起月、心裡裝了收音機。剪影是實心黑，凹處是挖空（evenodd 或 mask），**零描邊、零細節線、零透視**。

```html
<symbol id="m-rice" viewBox="0 0 100 100" overflow="visible">
  <circle cx="50" cy="9" r="5"/><rect x="47.6" y="13" width="4.8" height="66"/>
  <ellipse cx="41" cy="25" rx="8" ry="3.4" transform="rotate(-38 41 25)"/> <!-- 稻粒…左右交錯 -->
  <path fill-rule="evenodd" d="M22 76h56v21H22z M30 86.5a6 6 0 1 0 12 0a6 6 0 1 0 -12 0z"/> <!-- 收音機機身＋喇叭孔 -->
</symbol>
```

### ③ 三圈回聲線（膨脹輪廓帶）

剪影的輪廓往外膨脹三次，每一圈一個油墨色，像 1960 年代哈瓦那的歐普／迷幻海報。用 `feMorphology dilate` 一次做完，任何新符號都自動長出回聲；膨脹核是方形，轉角呈小八角——這正是手工描回聲的味道。

```html
<filter id="echo-mg" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
  <feMorphology in="SourceAlpha" operator="dilate" radius="11" result="d3"/><feFlood flood-color="#1F9D55"/><feComposite in2="d3" operator="in" result="c3"/>
  <feMorphology in="SourceAlpha" operator="dilate" radius="7.5" result="d2"/><feFlood flood-color="#F3EEE2"/><feComposite in2="d2" operator="in" result="c2"/>
  <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="d1"/><feFlood flood-color="#E0157A"/><feComposite in2="d1" operator="in" result="c1"/>
  <feMerge><feMergeNode in="c3"/><feMergeNode in="c2"/><feMergeNode in="c1"/></feMerge>
</filter>
<svg viewBox="-20 -20 140 140"><use href="#m-rice" width="100" height="100" filter="url(#echo-mg)"/><use href="#m-rice" width="100" height="100" fill="#161412"/></svg>
```

回聲配色規則：三圈必須與地色形成「地→外圈→中圈→內圈→黑」的明暗交替；四組固定配方 `echo-mg`（黃地：綠／白／洋紅）、`echo-gm`（白地：洋紅／黃／綠）、`echo-yp`（洋紅地：黃／黑／白）、`echo-py`（綠地：白／洋紅／黃）。

### ④ 團結日日期當主標＋四語圖說帶

日期（日）用 Anton 佔海報寬 30%，月份四語小字疊在旁邊；底部是**四種書寫系統的同一句話**，四行等寬排成一個方塊。示範站用中文／Bahasa Indonesia／Tiếng Việt／ภาษาไทย，原作是西／英／法／阿拉伯文——重點是「不同字系並列」。

```html
<div class="date">18<small><span class="l4"><span lang="zh-Hant">10月</span><span lang="id">Okt</span><span lang="vi">Th10</span><span lang="th">ต.ค.</span></span><em>Nº154</em></small></div>
<div class="l4 band" data-cap="12">
  <span lang="zh-Hant">與夜班看護同在日</span><span lang="id">Hari Bersama Perawat Shift Malam</span>
  <span lang="vi">Ngày bên người chăm sóc ca đêm</span><span lang="th">วันอยู่เคียงข้างผู้ดูแลกะดึก</span>
</div>
```
```css
.pst{container-type:inline-size}
.pst .date{font:400 30cqi/.8 Anton,sans-serif}
.band{container-type:inline-size;display:flex;flex-direction:column}
.band>*{font-size:calc(var(--fit,5) * 1cqi);white-space:nowrap}   /* --fit 由 JS 量字求得，見技術章 */
.band>.capd{text-align:justify;text-align-last:justify}             /* 太短的句子封頂後用字距撐滿 */
.l4>.p{order:-1}                                                     /* 使用者選的語言排第一 */
```

### ⑤ 33 × 53 直式海報張＋兩道摺痕

海報比例 33:53（原作約 33 × 53 cm），四邊留地色邊距；**摺痕一直一橫在正中**，因為它是摺起來夾在雜誌裡寄出的。摺痕只是兩條 1px 線（multiply），不做紙張起伏的漸層。

```css
.pst{aspect-ratio:33/53;position:relative;padding:6cqi 6cqi 4cqi}
.pst::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:#00000026;box-shadow:1px 0 0 #ffffff40;mix-blend-mode:multiply}
.pst::after{content:"";position:absolute;top:50%;left:0;right:0;height:1px;background:#00000026;box-shadow:0 1px 0 #ffffff40;mix-blend-mode:multiply}
```

## 色彩系統

| Token | Hex | 用途 | 全站比例 |
|---|---|---|---|
| `--mag` 洋紅 | `#E0157A` | 首頁場色、回聲帶、現用強調 | 25% |
| `--mag2` 洋紅二網 | `#C80F6B` | 只用於放射線的第二條紋（同色相平塗） | 5% |
| `--grn` 草綠 | `#1F9D55` | 洋紅的互補：區塊場色、回聲帶 | 15% |
| `--yel` 檸檬黃 | `#F5D10F` | 海報地色、現用頁、按鈕 hover | 15% |
| `--paper` 海報紙白 | `#F3EEE2` | 長文底、海報背面、白回聲 | 25% |
| `--ink` 墨黑 | `#161412` | 黑版、導覽帶、頁尾 | 13% |
| `--org` 橙 | `#F26B1D` | 只給「ON AIR」燈 | ≤2% |

規則：同一張海報只用 3–4 色（地＋三圈回聲＋黑）；洋紅與綠必須相鄰出現至少一次（互補撞色是本風格的熱度來源）；零漸層、零模糊陰影——唯一允許的陰影是**實色硬偏移**（`box-shadow:12px 12px 0 var(--ink)`），表示「一張紙貼在牆上」。

## 字體系統

| 角色 | 字體（Google Fonts） | 設定 |
|---|---|---|
| 拉丁／越南文展示 | **Anton** 400 | 全大寫、line-height .92–1.1、字距 .01em；日期 30cqi |
| 中文展示 | **Noto Sans TC** 900 | 字距 .02em |
| 泰文展示 | **Noto Sans Thai** 800 | line-height ≥1.45（上下母音符號） |
| 拉丁小字與標籤 | **Archivo Narrow** 600/700 | 12–13px 全大寫字距 .08–.12em |
| 正文 | Noto Sans TC 500 | 16px / 1.7 |

字級 scale（桌機）：H1 92 / H2 50 / H3 22 / 正文 16 / 標籤 12。四語塊：主語言 1em、其他三語 .46em。每個 `<span>` 一定標 `lang`，字體由 `:lang()` 分派。

## 版面與網格

- 首屏是「場色＋一張海報＋一張說明紙」：左 46% 海報、右 54% 白紙說明卡，兩者都帶 12px 實色硬影、方向相反。
- 不用 12 欄；用**大色場分段**：洋紅（首屏）→ 綠（重複法）→ 白／綠對開（節目表）→ 白（目錄）。每段之間 3px 黑線。
- 海報內部是四列 grid：日期 auto／符號 1fr／四語帶 auto／版權列 auto。符號可以越過邊距（svg inset 負值），字不可以。
- 旋轉：零。這不是拼貼風；歪斜只來自「套版誤差」±1.6px。
- 留白：海報內 6cqi 邊距；頁面左右 `clamp(16px,3vw,40px)`。
- RWD：≤860px 單欄；≤560px 導覽只剩主語言一行。

## 元件配方

- **導覽（四語圖說帶）**：底部固定 76px 墨黑條，四格；每格是一個 `.l4`——主語言 19px、其他三語 9.5px 疊在下方；現用頁整格鋪黃、字轉黑、編號轉洋紅。hover 時黃色從左刷進 6%（`steps(4)`）。
- **語言選擇**：刊頭右側四顆方鈕（中文／Indonesia／Tiếng Việt／ไทย），選中＝墨底黃字；選擇存 localStorage。它改變的是**順序與大小**，不是隱藏。
- **按鈕**：3px 黑框方角；主按鈕墨底紙字，hover 變黃底黑字；次按鈕紙底，hover 洋紅底。
- **卡片＝海報**：所有「卡片」都是一張 33:53 海報＋下方 2px 黑線圖說；hover 往左上提 3px、硬影加長（`steps(3)`）。
- **表單**：選項做成方塊籌碼（chips），選中墨底黃字；色票籌碼是純色方塊。
- **頁尾**：墨黑，三欄 Anton 黃色小標，最下列小字標示虛構。

## 動效規則

| 類型 | 本站自製實作 | 觸發 | 時長／緩動 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 首屏洋紅放射線（`repeating-conic-gradient` 4° 條紋）緩慢自轉——Serrano 式歐普 | 持續 | 240s linear infinite | 靜止 |
| input 輸入 | ①套版晃動：游標在海報上移動，回聲版相對黑版錯開最多約 3px；②〈點一張〉刮板拖曳刷版（pointermove 即時寫 `--p`）；③重複法牆上游標掠過的格子翻成黑版 420ms | pointer | <16ms 回應；transform .08s linear | 晃動關閉；刮板改為一鍵整版 |
| transition 轉場 | 換頁「刮板」：下一頁的地色以 `clip-path inset` 從左拉滿全畫面（前緣一條墨黑刮板），抵達頁再往右拉掉；重複法牆對角線逐格「印上」；燈箱以同樣刮板方向打開 | 點內部連結／進入視窗／開燈箱 | 400–460ms `cubic-bezier(.6,0,.35,1)` | 直接換頁、直接顯示 |
| **signature 簽名** | **夾頁海報二段展開**：首屏海報先是摺成四分之一的夾頁（看到的是背面封面「Nº154 沿摺線打開」），右半以 `rotateY(-180→0)` 翻開，再把摺上來的下半 `rotateX(180→0)` 翻下——跟從雜誌中間抽出那張海報一模一樣 | 首次進站自動；「再摺起來」重播；Esc／按鈕略過 | 720ms＋140ms 間隔＋820ms，`cubic-bezier(.45,0,.2,1)` | 不摺，直接是展開的海報 |

自我限制：本站不用淡入、不用模糊；所有動態都是「印刷動作」——刷、摺、對版。

### motion-library 元件表（`wenxiangxiao/motion-library` 1.1.0 @eb4d70c）

以 `MotionLib.mount(el,{id,text,colors,duration,loop,density,intensity,seed,aspectRatio})` 掛載；`aspectRatio` 由站內包裝依容器寬高比自動選 16:9／1:1／4:5／9:16 以蓋滿容器。開發 Prompt 可用 `MotionLib.prompt(id)` 取得。

| 頁 | ID | 名稱 | 參數 | 類型 | 承載什麼／為什麼適合這個流派 |
|---|---|---|---|---|---|
| 首頁 | TXT-A-11 | Repeat Lines | text「四方 SIFANG」・primary #E0157A・secondary #1F9D55・bg #F3EEE2・1.6s・loop:false・seed 154 | transition（一次性） | 刊名上下各三行重複描邊字——Rostgaard「重複法」的字版本，放在講重複法的段落標題 |
| 首頁 | BG-A-29 | Topo Lines | primary #F3EEE2・secondary #F5D10F・bg #1F9D55・9s・density .9・intensity .8・seed 1018 | ambient | 節目表左欄的同心等高線＝回聲線（特徵③）的流動版；紙白細線在綠場上 |
| 點一張 | SHP-15 | Ring Expand | primary #F5D10F・secondary #E0157A・bg #161412・1.8s・loop:false・seed 1400 | transition（一次性） | 三版刷完，電波從攤位往外擴三圈——海報「送上電波」 |
| 海報牆 | BG-B-19 | Line Burst | primary #F3EEE2・secondary #F5D10F・bg #E0157A・6s・density 1.2・intensity 1.2・seed 1968 | ambient | Serrano〈Day of the Heroic Guerrilla〉式從中心往外散的放射短線，洋紅場 |
| 來後站 | BG-B-21 | Ripple Rings | primary #F5D10F・secondary #E0157A・bg #161412・5s・density 1・intensity 1.3・seed 336 | ambient | 線上收聽卡背後的同心電波 |

規範：元件不擔任 signature；同一畫面同時運轉 ≤2 個；離屏即 `destroy()`、回到視窗重掛（元件庫 `pause()` 後 rAF 仍重繪）；等 `document.fonts.ready` 才掛；canvas `aria-hidden`，容器保留原 HTML 標題 `.ml-fb`、掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)` 停格、文字 `seek(1)`。

## 插畫與圖像風格

**膨脹回聲剪影（echo-dilate silhouette）**：每張圖＝一個 100×100 的黑色實心符號 `<symbol>` ＋ `feMorphology` 三圈回聲。符號必須是「A 長成 B」的視覺雙關，只用圓、橢圓、矩形、多邊形與 evenodd 挖洞，零描邊零細線；同一個符號可以縮到 18px（重複法牆）仍可辨。大圖以 **重複法**構成：同一個小符號排成格陣，以 `Path2D.isPointInPath` 判斷每格落在大形（心、星、稻穗）之內或之外，內外各印一色。

禁止：照片、寫實插畫、漸層光影、細線描、等角透視、emoji。

## Logo 與 Favicon 設計指南

- 台徽：洋紅方塊、中心黑圓點、四段黑色電波朝上下左右（四方）＋上下兩道紙白外圈波。只用三色、零漸層。
- 橫式標誌：台徽＋黃色字框，「禮拜天電台」Noto Sans TC 900、「RADIO MINGGU」Anton 字距 4。見 `assets/logo.svg`。
- Favicon：inline SVG data URI，台徽簡化為四段電波＋圓點（16px 仍可辨）。

## Do & Don't

**Do**
- 每張海報只說一件事：一個日子、一句話、一個符號。
- 四語並列，且讓使用者決定誰排第一。
- 讓互補色（洋紅×綠、黃×紫黑）相鄰。
- 保留摺痕、保留 ±1–2px 的套版誤差。
- 文案要具體：日期、人名、地址、價格、為誰而做。

**Don't**
- 不要把政治口號、真實組織標誌或真實人物肖像直接搬進商業站（本站把「團結日」轉成生活日子：夜班看護、漁工、視訊回家）。
- 不要漸層、不要玻璃、不要模糊陰影、不要圓角卡片。
- 不要三張置中卡片、不要紫藍漸層 hero、不要 emoji icon、不要「EST. 19xx」徽章、不要 Lorem ipsum。
- 不要把四語做成下拉選單翻譯——那會讓它看起來像普通網站。
- 不要讓 motion-library 元件的顏色跑出色票。

## 頁面骨架範例

```html
<header class="mast">…台徽…<div class="langs"><button data-l="zh">中文</button><button data-l="id">Indonesia</button><button data-l="vi">Tiếng Việt</button><button data-l="th">ไทย</button></div></header>
<main>
 <section class="hero" style="background:#E0157A">
  <div class="rays" aria-hidden="true"></div>
  <figure class="pst" style="--g:#F5D10F" aria-label="Nº154 海報：10 月 18 日・與夜班看護同在日">
   <div class="date">18<small><span class="l4">…四語月份…</span><em>Nº154</em></small></div>
   <div class="art"><svg viewBox="-20 -20 140 140"><use class="echo" href="#m-rice" width="100" height="100" filter="url(#echo-mg)"/><use class="key" href="#m-rice" width="100" height="100"/></svg></div>
   <div class="l4 band" data-cap="12">…四語標語…</div>
   <figcaption class="foot"><span>四方 SIFANG · Nº154</span><span>RADIO MINGGU</span></figcaption>
  </figure>
  <div class="intro"><h1 class="disp"><span class="l4">…四語台名…</span></h1><p>…</p><a class="btn" href="dedicate.html">點一張海報</a></div>
 </section>
</main>
<nav class="capnav"><a href="index.html" aria-current="page"><span class="n">01</span><span class="l4">…</span></a>…</nav>
```

## 技術實作與相容性

### 1. SVG `feMorphology` 膨脹回聲（A 渲染層）
- 承載：特徵③。任何符號（含使用者在〈點一張〉選的）自動長出三圈回聲，不必手描 offset path。
- 支援：MDN 標示 `SVGFEMorphologyElement` 為 Baseline「Widely available」（2015-07 起各瀏覽器皆支援）；caniuse `mdn-api_svgfemorphologyelement_radiusx`：Chrome 5+、Firefox 3+、Safari 6+。查證：developer.mozilla.org/docs/Web/API/SVGFEMorphologyElement、caniuse.com/mdn-api_svgfemorphologyelement_radiusx（2026-10-18）。
- 實測：建站時以 resvg 渲染六個符號×四組配方確認回聲帶正確；`<symbol>` 需加 `overflow="visible"`，否則部分渲染器在符號邊界裁掉膨脹結果。
- 效能：濾鏡只在靜態圖層上；回聲圖層以 CSS `transform` 平移（套版晃動）不重算濾鏡。大量縮圖（海報牆 12 張＋五特徵示意）首次繪製後不再變動。
- Fallback：不支援 SVG 濾鏡時只剩黑剪影＋地色，資訊零損失。

### 2. 四語等寬求解＋container query 單位（E 約束求解 × C 版面）
- 承載：特徵④。四種字系的同一句話字寬差三倍以上（中文 8 字 vs 印尼文 32 字母）；以 canvas `measureText` 在 100px 量每行實際寬 `w100`，求出撐滿容器所需的 `--fit = 10000 / w100`（單位 cqi），超過上限（12–13cqi）就封頂並 `text-align-last:justify` 撐滿。
- 關鍵：`--fit` 與海報尺寸無關，同一張海報在 210px 的牆、460px 的首屏、燈箱裡都由 `cqi` 自己縮放，**不需重量**；只在字型就緒（`document.fonts.ready`）與內容改變時量一次。
- 支援：container query units（cqw/cqi）Chrome 105+、Firefox 110+、Safari 16+（caniuse.com/css-container-query-units，2026-10-18 查證）；`measureText` 為 Canvas 2D 基本 API。
- Fallback：無 JS 時 `--fit` 預設 5cqi 且允許換行；不支援 cq 單位時字級回落為 `font-size` 的前一宣告值（瀏覽器忽略無效值），版面仍可讀。

### 3. Pointer Events 刮板＋CSS mask-image 分版揭示（D 輸入）
- 承載：〈點一張〉三版親手刷。每一版是一個全尺寸圖層，`mask-image:linear-gradient(90deg,#000 calc(var(--p)*100%),transparent calc(var(--p)*100%))` 硬邊揭示；`pointermove` 只准往右（往回不擦掉），跳太遠不算——拉沒到底那一截就留白，和真網版一樣。鍵盤：刮板是 `role=slider`，→ 每次 10%、Enter／Space 整版刷完。
- 支援：`mask-image` 無前綴 Chrome 120+、Firefox 53+、Safari 15.4+，另附 `-webkit-mask-image`；Pointer Events 全面支援。
- 其他：`Intl.DateTimeFormat` 以 zh-TW／id-ID／vi-VN／th-TH 四種 locale 寫出下一個禮拜天（th-TH 預設佛曆，2026 年顯示為 2569——這是對的）；`Asia/Taipei` 時區判斷是否在播。

### 效能預算（實測）
| 頁 | 檔案大小（含 motion-library 子集 34.5KB） |
|---|---|
| index.html | 85.2KB |
| dedicate.html | 86.6KB |
| archive.html | 93.6KB |
| visit.html | 80.0KB |

皆遠低於 350KB 上限；首屏 JS 只有語言標記、量字（每行一次 measureText）與摺頁設定，無迴圈運算；同一畫面同時運轉的 motion-library 元件 ≤1 個。放射線是單一合成層的 `transform: rotate`，尺寸上限 2400px。
