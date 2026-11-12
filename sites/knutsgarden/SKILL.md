---
name: dalmalning-kurbits
description: Dalarna folk painting (dalmålning, Siljan region, Sweden, c.1780–1870) — giant fan-shaped kurbits blooms filling every gap, flat glue-distemper colours (Falu red, ochre, verdigris, smalt blue) with black contour, white comma "liv" strokes that bring flat shapes to life, round-arched arcades with draperies and faux-marble borders, and figures in 18th-century rural dress.
---

# Dalarna 民間畫・kurbits Dalmålning (Kurbits Painting)

範例站：`sites/knutsgarden`（Knutsgården 掛畫行，聖誕掛畫出租）。

## 設計哲學

Dalmålning 是 18 世紀末到 19 世紀中，瑞典 Dalarna 省 Siljan 湖周（Rättvik、Leksand、Gagnef、Bjursås、Mora）的農民畫師畫在牆、櫃子與紙／布掛畫（bonad）上的民間畫。畫師多半是流動的：帶著顏料走到別的教區、甚至 Hälsingland，用畫換食宿。他們看的範本是插圖聖經、單張版畫與教堂壁畫，於是聖經故事被翻成鄰居的樣子——博士戴三角帽、迦拿婚宴是兩個穿長外套與條紋圍裙的村人。Ullvi 一帶的畫師在 1780 年代把一種巨大的幻想花畫成招牌，後來被叫作 **kurbits**（常被解釋為葫蘆科 Cucurbita；Karlfeldt 1927 年的詩讓這個詞流行）。這個詞與「dalmålning」本身都是 20 世紀才定名的。

它長成這樣，是因為三個限制：

1. **顏料**：白堊加皮膠（limfärg，膠彩）調土色顏料，便宜、乾得快、不能疊漸層——所以是平塗色塊。
2. **速度**：流動畫師一面牆要在借住的幾天內畫完——先平塗、乾了再用一枝細筆沾白「點活」（*liva upp*），一筆一個逗點，又快又能讓平塊有體積。
3. **觀念**：空牆是窮。花長到把所有空白吃掉（horror vacui），人物、房子、馬只是在花之間被安排好的位置。

**一句話：先平塗，後點活；花吃掉空白；聖經是鄰居。**

## 本風格的 5 個不可省略特徵

### ① 扇形 kurbits 花冠：分層扇貝，長到吃掉空白

花冠是 3–4 層同心扇形，每層外緣是一排扇貝，紅／赭／藍／綠交替，最內一個舌形花心與一顆墨點；花從甕裡長出，S 形莖、兩到三支側枝，葉子一半亮一半暗。拿掉它就不是 dalmålning。

```js
// 一層扇貝：從花心連到外緣，外緣每片扇貝是一個二次曲線鼓包（控制點在 1.2R）
function fanLayer(cx,cy,R,dir,span,n,fill){let a0=dir-span/2,da=span/n,d=`M${cx} ${cy} L${cx+Math.cos(a0)*R} ${cy+Math.sin(a0)*R}`;
 for(let k=0;k<n;k++){const am=a0+da*(k+.5),a1=a0+da*(k+1);d+=` Q${cx+Math.cos(am)*R*1.2} ${cy+Math.sin(am)*R*1.2} ${cx+Math.cos(a1)*R} ${cy+Math.sin(a1)*R}`}
 return `<path d="${d} Z" fill="${fill}" stroke="#231913" stroke-width="1.4" stroke-linejoin="round"/>`}
// 外→內四層：R、0.79R、0.58R、0.37R；扇貝數 ≈ R/9
```

### ② 膠彩五色＋墨線：平塗、零漸層、零模糊

只有土色顏料：法倫紅、赭黃、銅綠、smalt 藍、墨，底是白堊。每個形一個平色加墨色輪廓線；暗面是另一塊平色（葉子的暗半邊），不是漸層。

```css
:root{--falu:#8A2B1F;--chalk:#F0E4C6;--red:#C3402A;--ochre:#D69B33;--green:#3E7A57;--blue:#34587F;--ink:#231913;--white:#FBF5E6}
.shape{fill:var(--red);stroke:var(--ink);stroke-width:1.4;stroke-linejoin:round} /* 禁 filter: blur、禁 linear-gradient 上色 */
```

### ③ 白逗點點活 uppliva：一筆一個逗點，沿每一個形的邊

平塗之後的最後一道工：花瓣內緣一排逗點（頭朝外、尾指向花心）、葉脈兩側魚骨狀逗點、莖上一列白點、衣服下擺與馬鞍幾筆。逗點只用一個形狀，大小隨形縮放。

```svg
<defs><path id="cm" d="M0 -1.15A1.15 1.15 0 1 0 0 1.15Q2.6 .9 5 0Q2.6 -.5 0 -1.15Z"/><circle id="dt" r="1.5"/></defs>
<g fill="#FBF5E6">
  <use href="#cm" transform="translate(212 140) rotate(200) scale(1.6)"/>  <!-- 花瓣：rotate＝指向花心 -->
  <use href="#dt" transform="translate(180 300) scale(.8)"/>               <!-- 莖：白點 -->
</g>
```

### ④ 圓拱拱廊＋帷幔＋仿大理石邊：畫面被框成一格一格的「場」

bonad 橫向分成幾個圓拱（墨外框＋紅內帶＋拱上一圈白點），拱下掛兩道帷幔（紅藍交替垂弧＋赭色流蘇）；整幅外框是仿大理石波紋邊（marmorering），頂上一條題字帶、底下一條綠地面帶。

```css
.bonad{background:#F0E4C6;border:2px solid #231913;box-shadow:0 0 0 10px #34587F,0 0 0 12px #231913,8px 14px 0 12px rgba(35,25,19,.38)}
.bonad::before{content:"";position:absolute;left:-26px;right:-26px;top:-40px;height:16px;background:#B5793A;border:2px solid #231913;border-radius:8px;box-shadow:inset 0 -5px 0 #7C4A22} /* 掛畫木桿 */
```
```svg
<path d="M0 560 V165 A165 165 0 0 1 330 165 V560" fill="none" stroke="#231913" stroke-width="2.2"/>
<path d="M14 560 V165 A151 151 0 0 1 316 165 V560" fill="none" stroke="#C3402A" stroke-width="13"/>
```

### ⑤ 十八世紀鄉民服裝與民俗母題：題字用手寫羅馬體斜體

人物正面或側面、臉頰一個紅圓點：男人三角帽、長外套（藍或紅，翻出紅襯裡）、赭背心、及膝褲、白襪；女人頭巾、紅裙、Rättvik 式條紋圍裙。母題：法倫紅木屋（白角板黑屋頂）、民俗木馬、蠟燭、星、五點花。題字用帶 18 世紀刻字味道的羅馬體斜體（IM Fell English Italic），大寫首字可用 Fraktur。

```css
.ins{font-family:"IM Fell English",Georgia,serif;font-style:italic}
.cap{font-family:"UnifrakturMaguntia",serif;float:left;font-size:4.2em;line-height:.82;color:#C3402A;text-shadow:2px 2px 0 #231913}
```

## 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--falu` 法倫紅 | `#8A2B1F` | 頁面底＝木屋牆（原木條紋 72px 一根） | 約 35% |
| `--chalk` 白堊 | `#F0E4C6` | 畫幅底、資訊卡 | 約 35% |
| `--red` 朱 | `#C3402A` | 花冠外層、外套、拱內帶、主按鈕 | 8% |
| `--ochre` 赭黃 | `#D69B33` | 花冠中層、花心、流蘇、強調 | 6% |
| `--blue` smalt 藍 | `#34587F` | 大理石邊、甕、外套、次按鈕 | 7% |
| `--green` 銅綠 | `#3E7A57` | 葉、地面帶、莖（暗綠 `#2C5A40`） | 6% |
| `--ink` 墨 | `#231913` | 所有輪廓、正文 | 2% 面積 |
| `--white` 鉛白 | `#FBF5E6` | 只給逗點與白點 | <1% |
| `--wood` 木 | `#B5793A`／`#7C4A22` | 掛畫木桿、仿木紋 | <2% |

規則：同一個形只有一個平色；白只能是逗點、點、襪子與衣領；沒有任何漸層上色（木桿的 inset 平影是唯一的「立體」）。

## 字體系統

- **題字／標題**：IM Fell English（Google Fonts），斜體為主，字級 `clamp(30px,4vw,48px)`，行高 1.15。小型大寫用 IM Fell English SC 作署名（「Anno 2026 · uppsatt af …」）。
- **首字**：UnifrakturMaguntia，4.2em，朱色加 2px 墨硬影。
- **中文正文**：Noto Serif TC 500，16px／1.75；小標 700、字距 .2em、法倫紅。
- 瑞典語作題字與按鈕，中文作說明，兩者並排（「Måla om 重點一次」）。

## 版面與網格

- 頁面＝法倫紅木牆；所有內容都是**掛在牆上的畫**：畫幅上方 40px 有木桿與吊繩，畫幅整體以頂端為軸 ±0.3–0.7° 擺。
- 畫幅內是橫向的「場」：題字帶（約 12% 高）→ 拱廊（約 70%）→ 綠地面帶（約 9%）；四周大理石邊。
- 列表頁＝交錯高度的掛畫牆：每四幅 margin-top 0／46／16／70px，間距 40–46px，不對齊成格。
- 流程＝一條「橫楣 frieze」：四格不等寬（1.1／.9／1.2／1fr），格頂一條紅赭藍的色帶，格間 2px 墨線。
- 留白規則：畫幅內不准有大於畫幅寬 15% 的空白——用五點花、小扇形、星、鬚補掉。畫幅外的木牆是唯一允許的「空」。

## 元件配方

- **導覽（liv-branch-nav）**：左上一張小畫（116px），畫著一根 S 莖與三朵小花冠＝三頁；現在這頁的花已點活（白逗點）且全彩，其他兩朵去飽和、沒有逗點；hover 時逗點層以 steps(3) 三格亮起。花冠以 `<symbol>` 式的隱藏 `<defs>` 定義一次，桌機直式與手機橫式兩支導覽 `<use>` 共用。≤860px 換成右下橫式花枝。
- **按鈕**：朱底、白斜體 IM Fell、2px 墨框、零圓角，右側一排三顆白點（`radial-gradient` 7.3px 間距）；hover 變墨底。
- **卡片＝掛畫**：`.bonad`（見特徵④），或小掛畫：2px 墨框＋5px 8px 硬影＋木桿 `::before`＋吊繩 `::after`，hover `rotate(-1.6deg)`。
- **表單**：白底輸入框 2px 墨框；篩選鈕為白堊底斜體字，`aria-pressed=true` 變赭黃。
- **頁尾**：墨底、上緣 10px smalt 藍，三欄（地址／季節／點活夜），赭黃斜體小標。

## 動效規則

| 種類 | 實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 掛畫擺動 `rotate(±.32deg)`；燭焰 `scale` 三格 steps(3) 閃；導覽花枝擺 ±.7°；季節倒數依真實日期 | 持續 | 8s／9s ease-in-out；燭焰 1.1s／1.37s | 擺動與燭焰停；倒數文字照常 |
| input 輸入 | 游標 70 單位內的白逗點映燭光變赭；畫幅下緣隨游標 skewX（–0.7°～0.7°）；點活台的筆跟著指標、虛線圈顯示吸附半徑 | pointermove（rAF 合併） | fill .25s；skew .5s cubic-bezier(.3,.7,.2,1) | 不做 skew，逗點變色保留 |
| transition 轉場 | **捲畫**：換頁時一幅白堊畫背（中央一朵三色花冠）由上往下放下，木軸跟著降到底，再換頁；新頁畫背往上捲回 | 站內連結點擊 | 540ms 放下／620ms 捲回 cubic-bezier(.6,0,.3,1) | 無轉場直接換頁 |
| signature 簽名 | **uppliva 點活**：首屏畫先只有底色，一枝筆依筆序（花冠→葉脈→莖→衣裝）一個逗點一個逗點點上 928 顆；「畫師的手」拉桿可前後走、〈重點一次〉以 6 倍速倒轉再重畫 | 載入／拖動／按鈕 | 每顆 120ms steps(2,end)、間隔 6ms、起始延遲 400ms | 直接顯示點活完成；拉桿隱藏 |

自我限制：不用淡入當簽名；不用跑馬燈；不做計數器滾動數字。

### motion-library 元件表（PLAYBOOK §2.8）

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-16 | Weave Grid | index 亞麻段 | colors `#F0E4C6`／`#E2D2AE`／bg `#D8C8A2`；duration 14；density 1.6；intensity .6；16:9（裁成 200px 帶）；seed 5 | ambient | 亞麻的經緯——大幅 bonad 畫在手織亞麻上；純 fillRect、零圓角零模糊，色只用白堊與亞麻 |
| SHP-22 | Radial Fan | index 流程段 | colors `#C3402A`／`#D69B33`／bg `#F0E4C6`；duration 2.2；loop false；1:1；seed 13 | transition（進視窗一次） | 八片扇形依序展開，就是一朵 kurbits 花冠打開；平色扇形、無陰影 |
| BG-A-29 | Topo Lines | bonader 櫃門頁首 | colors `#7C4A22`／`#C3402A`／bg `#B5793A`；duration 16；density 1.4；intensity .8；16:9（裁 230px）；seed 21 | ambient | 等高線的同心環＝畫師在櫃門上畫的仿木紋 ådring 與木節；只有描線 |
| SHP-29 | Wave Dots | bonader 租單前 | colors `#FBF5E6`／`#D69B33`／bg `#8A2B1F`；duration 3.2；intensity .7；16:9（裁 96px）；seed 9 | ambient | 一列白點像莖上點活的白點列；底是法倫紅牆 |
| BG-A-17 | Flow Lines | mala 頁首 | colors `#FBF5E6`／`#231913`／bg `#34587F`；duration 9；density 1.3；intensity .9；16:9（裁 170px）；seed 31 | ambient | 藍底上流動的白與墨細線＝仿大理石 marmorering 邊帶 |

全部以 `KB.ml()` 掛載（照 `sites/ka-to` 的 KT.ml）：`document.fonts.ready` 後掛、離屏 `destroy()`、once 元件只播一次、canvas `aria-hidden`、容器內保留 `.ml-fb` 文字、reduced-motion 背景 `seek(.35)`、一次性 `seek(1)`。開發 Prompt 出處：`MotionLib.prompt(id)`（motion-library 1.39.0 @bafd6002）。同畫面同時運轉 ≤2 個。

## 插畫與圖像風格

技法 **dalmalning-flat-liv（膠彩平塗＋白逗點點活）**：全部是程式產生的 SVG 路徑，種子決定（xorshift32）。順序固定：先畫所有平色形（每個形墨邊 1.1–1.6），最後才一層白逗點；逗點座標在畫形的同時被記錄（花瓣內緣 2–3 顆、葉脈魚骨、莖白點、衣擺、鞍），所以「點活」可以獨立重播或交給使用者。人物只用梯形、三角、橢圓；臉是一個膚色橢圓、一顆紅頰點、一顆墨點眼。禁止：照片、漸層上色、描邊粗細變化的「書法」線、寫實比例。

## Logo 與 Favicon 設計指南

- Logo：左側一株三層扇形花冠長在藍甕裡（朱／赭／藍＋白點），右側 IM Fell 斜體字標「Knutsgården」，下方小型大寫 `BONADUTHYRNING · RÄTTVIK`。檔案：`assets/logo.svg`。
- Favicon：法倫紅方底、一朵三層扇形花冠＋三顆白點＋藍甕，inline SVG data URI。只用五色＋墨＋白。

## Do & Don't

- **Do**：讓花把空白吃掉；每個形先平塗再點活；人物穿 18 世紀鄉民衣；畫幅掛在木桿上；瑞典語題字＋中文說明。
- **Do**：白只給逗點；暗面用另一塊平色。
- **Don't**：紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡片、emoji icon、rounded-2xl＋模糊陰影、Lorem ipsum、「EST. 19xx」徽章。
- **Don't**：把 kurbits 畫成寫實花；用細線線描代替平塗；讓畫幅內出現大片空白；用 drop-shadow 濾鏡做立體。
- **Don't**：複製任何館藏中的具體作品構圖；本站所有畫面為原創程序繪製。

## 頁面骨架範例

```html
<body>
<nav class="livnav" aria-label="主要導覽"><svg viewBox="0 0 110 236"><!-- 三朵小花冠，現頁 .nb.on 有白逗點 --></svg></nav>
<main>
  <section class="hero">
    <div class="bonad hero-b"><svg id="hero" viewBox="0 0 1200 820" role="img" aria-labelledby="ht"><title id="ht">三拱 bonad 的文字描述</title>
      <!-- 大理石邊、題字帶、三拱、kurbits、人物、木屋、馬 -->
      <g class="lv" fill="#FBF5E6"><!-- 點活逗點 <use href="#cm" …> --></g></svg></div>
    <div class="tag"><div><h1>Knutsgården<span>掛畫行・租一幅聖誕掛畫</span></h1></div><div><p id="season"></p></div></div>
  </section>
  <section class="bonad red"><h2>Så går det till<small>一季四步</small></h2>
    <div class="frieze"><div><span class="n">I</span><h3>Välj bonad</h3><p>…</p></div><!-- ×4 --></div></section>
</main>
<footer class="foot">…</footer>
</body>
```

## 技術實作與相容性

### 1. 程序化 kurbits 生成＋決定性偽隨機＋URL 狀態（E 資料與生成層；「程序化圖樣生成」「決定性偽隨機」「URL 狀態序列化 ?seed=」）

`K.plant(seed)` 以 xorshift32 決定莖的 S 形、側枝角度、花冠層數與配色，遞迴長出甕→莖→側枝（小花冠或葉＋鬚）→頂花冠；`K.card(kind,seed)` 組出整幅畫。同一個 seed 在任何電腦上長出同一幅畫，所以 `bonader.html?b=jonas` 與 `mala.html?s=1777&k=jonah` 都可分享。**它承載特徵①④⑤**——花吃掉空白、拱廊、人物都由同一支生成器排出。純字串拼接，無 DOM 依賴，node 建置期與瀏覽器共用。實測（node 22）：首頁整幅 2.2ms、一張單幅 0.55ms。

### 2. Pointer Events 壓感＋輪廓吸附（D 輸入與感測層「Pointer Events 壓感／傾斜」；最近 6 站未出現）

點活台用 `pointerdown/move/up`、`setPointerCapture`、`getCoalescedEvents()`（有就用，沒有退回單一事件）。`PointerEvent.pressure` 決定吸附半徑 `r = 8 + 18·pressure`（滑鼠固定 0.5、觸控與筆用實際壓力）；指標座標以 `getScreenCTM().inverse()` 轉回 SVG 座標，查 24 單位格網桶，把 r 內未點的取樣點一次點上。**它承載特徵③與首創**。鍵盤替代：方向鍵移筆、空白鍵點。查證：MDN〈PointerEvent: pressure〉標示 Baseline Widely available（2020-07 起跨瀏覽器）；MDN〈SVGGeometryElement〉同為 Widely available；`getCoalescedEvents` 不存在時程式自動退回。

### 3. Web Animations API 時間軸控制（B 動效與時間軸層「Web Animations API（timeline 控制、seek、reverse）」；最近 6 站未出現）

首頁 928 顆逗點各一支 `Element.animate()`（opacity、`steps(2,end)`、delay＝序號×6ms、`fill:'both'`）；「畫師的手」拉桿 `pause()`＋設定 `currentTime` 拖動整條時間軸，〈重點一次〉`updatePlaybackRate(-6)` 倒轉、`Promise.all(finished)` 後再正向播放；換頁捲畫與單幅展開用 `clip-path: inset()` 關鍵影格。**它承載簽名 uppliva 與轉場。**查證：MDN〈Animation〉與〈Animation.currentTime〉皆標 Baseline Widely available（2020-03 起）；`reverse()／finish()` 行為依 MDN 說明。Fallback：`document.body.animate` 不存在時隱藏拉桿、直接顯示完成畫面、換頁不做捲畫。

### 附：CSS `shape-outside: polygon()`

首頁〈Målarna〉的段落沿 kurbits 右側輪廓繞排；多邊形在建置期由那株花自己的 liv 取樣點逐列（30 單位一列）取最右點＋22 推出。MDN 標 shape-outside 為 Baseline Widely available（2020-01 起）；不支援時就是普通的左浮動。

### 效能預算（實測）

| 頁 | 大小（含 motion-library 子集 ≈288KB） | 首屏 JS |
|---|---|---|
| index.html | ≈346KB | 生成整幅 2.2ms＋插入 DOM；928 支 Animation 建立 |
| bonader.html | ≈347KB | 8 幅 × 0.55ms |
| mala.html | ≈344KB | 1 幅 0.55ms |

主要動畫只動 `opacity`、`transform`、`clip-path`，不觸發版面；游標事件以 rAF 合併；同畫面運轉的 motion-library 元件 ≤2，離屏即 destroy。

查證來源：MDN Web Docs〈shape-outside〉〈Animation〉〈Animation: currentTime〉〈PointerEvent: pressure〉〈SVGGeometryElement: getPointAtLength()〉；caniuse〈shape-outside: polygon()〉。風格史：Caparol〈Colour Research Vol.1 — The Swedish Souvenir〉、Region Gävleborg〈Decorated Farmhouses of Hälsingland — 19th century paintings〉、Cleveland Museum of Art 1954.255（Hans Prins 1952 年依 Back Erik Andersson 的 Leksand 教堂壁畫所作的 bonad）。
