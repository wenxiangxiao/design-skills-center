---
name: juvenile-drama-toy-theatre
description: Victorian toy-theatre (Juvenile Drama, "a penny plain, twopence coloured") web style — every page is a printed proscenium, all imagery is etched line plus off-register hand-coloured washes, depth comes only from flat wings in grooves, and characters are fixed-pose cut-outs pushed on wire slides.
---

# 紙劇場 Juvenile Drama・Toy Theatre（Penny Plain, Twopence Coloured）

> 示範站：蔡家紙戲台 TSUÁ-HÌ-TÂI（嘉義紙劇場文具行）。本規格書不綁產業：任何「可以被演出來」的品牌——劇團、書店、文具、婚宴、導覽、玩具、甚至銀行的開戶流程——都能用。

## 設計哲學

紙劇場是 1811 年起在倫敦出現的印刷商品：William West 把當紅舞台劇的角色、布景一張張刻成銅版，賣給孩子買回家剪下來，在一座紙做的小戲台上演。從 West 到 J. K. Green、Redington，再到 Hoxton Street 73 號的 Benjamin Pollock（1856–1937），賣法都一樣——**白的一便士，彩的兩便士（a penny plain, twopence coloured）**。白的是只有線的印刷品；彩的是有人用水彩一張一張塗過的。Robert Louis Stevenson 1884 年寫了〈A Penny Plain and Twopence Coloured〉，紙劇場因此成為一種被記住的視覺語言。

它長成這樣，全是因為製作限制：

- **銅版只能印線**，所以明暗只能靠排線的疏密；顏色只能後加，而且是手塗，必然不對位。
- **紙劇場不能透視**，只能把一片片平面的景片插在幾道平行的溝槽裡，深度＝前後層次，不是消失點。
- **人物是紙**，不能彎曲、不能走路，只能是一個定格的戲劇姿勢（attitude），用鐵線推桿從側翼推進推出。
- **一切都在台口裡發生**：鏡框、上楣、樂池、腳燈——你看到的每一件事，都是「被演出來的」。

所以這個風格的核心不是「復古」，而是**「被印出來、被塗上、被推出來」三個動作都看得見**。在網頁上，這三件事分別變成：線稿層、上色層、推桿互動。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就退化成「有點復古的插畫網站」。

### ① 台口鏡框：所有主內容都在一座印刷的台口裡

上楣（深紅＋金邊）、兩根有凹槽線的壁柱、拱形開口、底部一排腳燈。台口是紙（米黃），台口外是戲院的暗場（酒紅黑）。內頁也用壓扁的台口當頁首。

```html
<div class="pw" style="position:relative;aspect-ratio:1000/600">
  <div class="stage" style="position:absolute;left:8%;right:8%;top:11%;bottom:0;overflow:hidden"><!-- 景片與人物 --></div>
  <svg class="pros" viewBox="0 0 1000 600" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none">
    <path fill="#EFE4C8" fill-rule="evenodd" d="M0 0H1000V600H0Z M80 600V150C80 110 140 92 220 88C320 84 420 70 500 66C580 70 680 84 780 88C860 92 920 110 920 150V600Z"/>
  </svg>
</div>
```

### ② 銅版蝕刻線＋平行排線：所有圖像都是黑線，明暗只靠排線

線一律 `#231C17`、1.6 / 0.9 兩種粗細、`stroke-linecap:butt`；暗面用 45° 排線（亮）→ 加 −45°（暗）→ 加水平（最暗）。**禁止灰色填色、禁止漸層造明暗**。

```svg
<pattern id="h45" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
  <line x2="0" y2="5" stroke="#231C17" stroke-width="1"/>
</pattern>
<clipPath id="shade"><path d="M76 60L85 120L96 238L80 238Z"/></clipPath>
<rect clip-path="url(#shade)" x="-50" y="-50" width="1100" height="700" fill="url(#h45)"/>
```

### ③ 兩角彩：五罐顏色手上色，multiply、不對位、一塊只塗一次

上色層與線稿層分開。上色層在線稿**下面**、`mix-blend-mode:multiply`、整層位移 `translate(3px,2px)`——顏色永遠對不準線。只有五個顏料色，**單一透明度 `fill-opacity:.62`**，兩色重疊自然混出第三色（藤黃＋普魯士藍＝綠）。〈白版〉就是把上色層拿掉。

```css
.wash{mix-blend-mode:multiply;transform:translate(3px,2px);clip-path:inset(0 calc(100% - var(--wash)) 0 0)}
.wash path{fill-opacity:.62}
:root.plain{--wash:0%}  /* 白版：只剩線 */
```

### ④ 平行景片＋推桿：深度只來自溝槽，人物只會平移

畫面＝天幕（最後）＋第二道景片＋人物＋第一道景片＋上框（最前）。每一層都是一張剪下來的平面，周圍留**剪刀白邊**（紙色粗描邊）。人物是定格姿勢，只能左右平移，腳下有一根看得見的鐵線推桿伸向側翼。換景＝景片從溝槽橫向抽出、天幕往上吊。

```css
.cut path{fill:#EFE4C8;stroke:#EFE4C8;stroke-width:7;stroke-linejoin:round} /* 剪刀白邊 */
.sc.L{transform:translateX(-118%)} .sc.R{transform:translateX(118%)} .sc.T{transform:translateY(-104%)}
.stage[data-s="2"] .s2{transform:none}
.rod{position:absolute;bottom:3%;height:2px;width:260%;background:#8A8578;box-shadow:0 1px 0 #231C17}
```

### ⑤ 版號與出版行：每張圖都是「第幾版」，每頁都有印行字

標題用胖體（Fat Face）＋宋體黑；每張圖上方寫 `PLATE 3 · CHARACTERS`，下方一行斜體出版行（印行者、地址、白／彩價）。角色腳下貼名牌。價格永遠成對出現且**彩＝白×2**。

```html
<span class="plate" style="font:12px 'IM Fell English';letter-spacing:.18em;text-transform:uppercase">PLATE 3 · CHARACTERS II</span>
<p class="imprint" style="font:italic 13px 'IM Fell English'">嘉義 蔡家紙戲台 印行・白版一張 NT$30、彩版一張 NT$60</p>
```

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 暗場 house | `#2A1216` | 台口外的戲院、頁面底色（加 14/22/40px 直條紋當絲絨） | 約 35% |
| 暗場二 | `#4A1C22` | 次要暗面 | ≤3% |
| 紙 paper | `#EFE4C8` | 台口、景片、卡片、所有長文的底 | 約 38% |
| 紙背 | `#E3D4AE` | 次要紙、停用狀態 | ≤4% |
| 墨 ink | `#231C17` | 所有線、正文字 | 約 8% |
| 胭脂 carmine | `#C42A3C` | 上楣、幕、現用態、主按鈕 | 上色層 |
| 普魯士藍 prussian | `#22508F` | 天、水、袍 | 上色層 |
| 藤黃 gamboge | `#E6B021` | 金邊、腳燈火、黃幔 | 上色層 |
| 翠綠 emerald | `#3B8A57` | 山、柳、浪 | 上色層 |
| 朱 vermilion | `#DF5A28` | 樹幹、袈裟、地板 | 上色層 |
| 膚 | `#F2C9A8` | 人物臉手 | 上色層 |
| 鐵線 wire | `#8A8578` | 推桿 | ≤1% |

規則：五個顏料色只出現在 `.wash` 層、只用 `fill-opacity:.62` 一個值；UI 實色（按鈕、現用態）只能用胭脂與藤黃。零純白、零純黑、零模糊陰影（陰影一律 `box-shadow:5px 5px 0 #000` 硬邊，像紙片疊在暗場上）。

## 字體系統

- 拉丁標題：**Abril Fatface**（Regency 戲單的胖體 Fat Face）。
- 拉丁內文／版號／出版行：**IM Fell English**（含 italic；17 世紀 Fell 鉛字的數位復刻，帶印刷不勻）。
- 中文：**Noto Serif TC** 400／700／900（宋體 = 刻版字）。
- 字級：h1 `clamp(28px,7cqi,80px)`、h2 24–30px、h3 19px、內文 16px/1.75、版號 12px letter-spacing .18em 全大寫、出版行 13px italic。
- 不用等寬體、不用無襯線。粗細只用 400 與 900（700 給按鈕）。

## 版面與網格

- 最大寬 1180px，16px 側邊。主舞台 `aspect-ratio:1000/600`，內頁頁首台口 `1000/400`。
- 舞台開口：left/right 8%、top 11%；台口 SVG 用 `preserveAspectRatio="none"` 隨比例伸縮。
- 卡片（紙版）用自動欄 `minmax(260px,1fr)`，每三張交替 `rotate:-.6deg / .5deg`——像剛從印刷機拿下來散在櫃台上。
- 台口外留白就是暗場；台口內不留白——景片要塞滿到台口邊。
- 手機 ≤560px：舞台照比例縮小，不改構圖；控制列換成兩列。

## 元件配方

- **導覽（樂池 pit-nav）**：固定在視窗底部的一排後場樂師剪影（二胡、鑼、嗩吶），每人舉一張頁名牌；現用頁那位站起來 `translateY(-8px)`、被塗上顏色、名牌翻成胭脂底。行動版縮小樂師、拿掉英文。頁尾另有完整文字連結。
- **按鈕**：`all:unset` 後胭脂底紙色字、2px 墨框、`3px 3px 0` 硬影；按下 `translate:2px 2px`。停用＝紙背色、無影。
- **白／彩切換**：兩格相連的框，被選的那格反白成紙色。狀態寫進 sessionStorage，全站共用。
- **卡片（紙版）**：紙底、1px 墨框、`5px 5px 0 #000`；頁首 `3px double` 底線＋版號；圖框 5:3；底部出版行。
- **戲單（dialog）**：紙底、雙線分隔、右上角斜蓋一枚胭脂「彩／白」章。
- **表單**：輸入框 1.5px 墨框、零圓角、淡紙底 `#fff8e6`。
- **footer**：一行斜體出版行＋文字連結。

## 動效規則

四種動效各有本站自製的實作；motion-library 元件是額外加上的。

| 種類 | 本站自製實作 | 觸發 | duration / easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 腳燈油火閃爍：每盞火焰 `scale` 四段關鍵影格、延遲 `calc(var(--i)*-.37s)` | 持續 | 1.7s 線性循環 | 火焰靜止 |
| input 輸入 | ① 推桿拖曳：pointer capture，x 夾在 −16～116%，離記號 <3.2% 吸附；方向鍵 ±3（Shift ±10），Enter 直接到記號 ② 游標視差：`--px`（@property `<number>`）由 `.35s ease-out` 自己補間，各層 `--d` 不同深度 ③ 紙版卡 hover 被塗上顏色 | pointermove / keydown / hover | 延遲 0（每次 pointermove 直接寫值） | 視差關閉；拖曳照常 |
| transition 轉場 | ① 換頁落幕／升幕：幕 `translateY(-101%)` ② 白版↔彩版：`--wash`（@property `<percentage>`）0%↔100%，同時驅動每層上色的 `clip-path` | 點連結 / 載入 / 切換 | 幕 .9s `cubic-bezier(.7,0,.25,1)`、上色 1.3s `cubic-bezier(.5,0,.3,1)` | 立即切換 |
| signature 簽名 | **槽軌換景 groove-change**：兩道景片依序從溝槽橫向抽走（前道 0ms、後道 120ms）、天幕往上吊（220ms），新景反序推入（天幕 380ms、上框 460ms、後道 520ms、前道 660ms）；水排從下方升起 | 按〈換景〉 | 每片 .75s `cubic-bezier(.65,0,.3,1)` | 立即換景，景名與台詞照常出現 |

台詞（cue）出現用 `clip-path` 以 `steps(14,end)` 由左往右露出，像一格一格排上去的鉛字。

**本風格禁用**：淡入淡出（紙不會半透明）、縮放進場、彈跳、模糊。所有移動都是「被推」或「被吊」——只有平移。

### motion-library 元件表（motion-library 1.30.0 @9301b9d8，`tools/ml-embed.js` 產生子集）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 動效種類 |
|---|---|---|---|---|---|
| BG-B-20 | Wave Lines | 戲台 | colors `#22508F/#3B8A57/#EFE4C8`、duration 8、density .6、intensity .7、seed 1972、16:9（容器 30% 高、底對齊、multiply） | 第一、三景的湖水／洪水本體，前面再壓一排靜態捲浪。它是無描邊的平塗色帶疊成的水，正是紙劇場「浪排 sea row」：一排一排平行、從側翼推進的波浪。 | ambient |
| TXT-A-03 | Stamp In | 戲台（戲單） | text 白／彩、fam serif、`#C42A3C/#231C17/#EFE4C8`、duration 1.1、loop false、1:1 | 落幕後戲單右上角蓋下的「彩」或「白」章——櫃台在每張彩版背面蓋章的動作。 | transition |
| TXT-B-36 | Ink Bleed | 紙版 | text 紙版目錄、fam serif、`#231C17/#C42A3C/#EFE4C8`、duration 2.2、once | 頁首標題像墨從版上滲進紙裡：白版「印出來」那一刻。 | transition |
| BG-B-24 | Crosshatch | 紙版 | `#231C17/#22508F/#EFE4C8`、duration 14、density .7、seed 60、16:9 | 解釋白版怎麼用排線做明暗的示範板——它本身就是一張以交叉排線刻出起伏、光繞一圈的銅版雕刻。 | ambient |
| TXT-A-30 | Reveal Outline | 店頭 | text 蔡家紙戲台、fam serif、`#231C17/#C42A3C/#EFE4C8`、duration 2.4、once | 店名先只描外框再填墨：先有線、後有色，與白版→彩版同一個順序。 | transition |

開發 Prompt 出處：`MotionLib.prompt(id)`。掛載包裝 `ZT.ml`：等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、回到視窗重掛；一次性文字 `once` 播一次後重掛直接 `seek(1)`；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`；canvas `aria-hidden`，容器內原本的 HTML 標題 `.ml-fb` 掛載成功才視覺隱藏。元件**不擔任** signature。

## 插畫與圖像風格

技法「紙劇場版畫 juvenile-drama-plate」：每件物件三層——`cut`（剪刀白邊＋紙底，不透明）、`wash`（手上色、multiply、位移）、`line`（銅版線＋排線）。

- 人物：120×250 的定格姿勢，一手高舉（指、托缽、持傘）、一手垂；水袖一筆；臉只有三條短弧（眼、口）；腳下一塊底座＝可以站在推桿上。
- 景片：柳、蘆、柱、門、岩松、浪排；永遠從畫面側邊長進來，內緣是剪出來的輪廓。
- 天幕：一張正面的風景，平面、零透視，用排線分出遠近。
- 上框（top drop）：葉緣、木雕楣、雲帶——遮住舞台上緣的那條。
- 浪排：一排捲浪，可多排疊。
- 禁止：照片、漸層造型、描邊外框式的「線框插畫」（本風格的線必帶排線與上色層）、圓潤可愛的扁平角色。

## Logo 與 Favicon 設計指南

一座迷你台口：暗場方底、紙色拱門、胭脂上楣＋藤黃金邊、正中一個宋體「紙」、底部四盞腳燈火。Favicon 為同構圖 64×64 的 inline SVG data URI，不放字以外的細節。

## Do & Don't

**Do**
- 每頁至少一座台口；內容「被演出來」。
- 線稿與上色分層；上色永遠位移、永遠 multiply、只用五色一個透明度。
- 價格成對（白／彩），彩＝白×2。
- 人物只平移；換景用抽景片、吊天幕。
- 文案從產業本身長出來：誰刻版、誰上色、一張多少錢。

**Don't**
- 不要紫藍漸層、置中大標＋兩顆按鈕＋三張圓角卡、emoji icon、Lorem ipsum、EST. 徽章。
- 不要圓角（除了推桿指環）、不要模糊陰影、不要發光（腳燈只是火焰形狀的藤黃平塗）。
- 不要透視、不要 3D 旋轉、不要縮放進場——紙劇場沒有這些。
- 不要讓顏色對準線、不要疊第二層顏色。
- 不要把台口畫成劇院照片式的寫實金色雕花——它是一張印刷品。

## 頁面骨架範例

```html
<header class="mast"><a class="brand" href="index.html"><img src="assets/logo.svg" alt=""><b>店名</b></a>
  <div class="ppbar" role="group" aria-label="版本"><button data-pp="plain" aria-pressed="false">白版</button><button data-pp="col" aria-pressed="true">彩版</button></div></header>
<main>
  <section class="theatre" id="th">
    <div class="pw">
      <div class="stage" data-s="1">
        <div class="ly sc T bd s1"><svg viewBox="0 0 1000 600"><!-- 天幕：rect.paper + g.wash + g.line --></svg></div>
        <div class="ly sc L g2 s1"><div class="par" style="--d:.9"><svg><!-- 第二道景片 --></svg></div></div>
        <div class="ly figs">
          <div class="fig L on" style="--x:36;anchor-name:--a" role="slider" tabindex="0" aria-label="角色（推桿）"><i class="rod"></i><svg viewBox="0 -10 150 260"><!-- g.cut g.wash g.line --></svg></div>
          <span class="tag" style="position-anchor:--a">角色名 <span class="plate">PLATE 2</span></span>
          <q class="cue" style="position-anchor:--a">台詞</q>
        </div>
        <div class="ly sc L g1 s1"><div class="par" style="--d:1.8"><svg><!-- 第一道景片 --></svg></div></div>
        <div class="foot"><!-- 腳燈 --></div>
        <div class="curtain"><!-- 幕 --></div>
      </div>
      <svg class="pros" viewBox="0 0 1000 600" preserveAspectRatio="none"><!-- 台口 --></svg>
    </div>
  </section>
</main>
<nav class="pit" aria-label="主導覽（樂池）"><ul><li><a href="index.html" aria-current="page"><svg><!-- 樂師 --></svg><em>戲台</em></a></li></ul></nav>
```

## 技術實作與相容性

本站三項核心技術（ledger `tech`）：

1. **CSS anchor positioning（C 版面與樣式層）**——角色名牌 `.tag` 與台詞 `.cue` 以 `position-anchor:--xu`＋`top:anchor(bottom)`／`bottom:anchor(top)`、`left:anchor(center)` 黏在被推動的剪像上，台詞另設 `position-try-fallbacks:flip-block`。注意：anchor 只看版面盒、不看 transform，所以剪像的位移寫在 `left:calc(var(--x)*1%)` 而不是 `transform`。
   - 支援現況：MDN〈anchor()〉標示 **Baseline 2026（Newly available）**；web.dev〈New to the web platform in January 2026〉記載 Chrome/Edge 125、Safari 26、Firefox 147 補齊（2026-01）。查證：https://developer.mozilla.org/docs/Web/CSS/anchor 、https://web.dev/blog/web-platform-01-2026
   - Fallback：`CSS.supports('anchor-name','--a')` 為假時在 `<html>` 加 `.noanchor`，名牌改貼舞台底 `bottom:.5%`、台詞改在 `bottom:64%`，JS 每次推動時把 `left` 寫成剪像的 x%（台詞夾在 18–82%）。資訊完全相同。
2. **mix-blend-mode: multiply 疊印（A 渲染層）**——所有 `.wash` 上色層以 multiply 疊在紙上、位移 3/2px，重疊處自然混色；〈白版〉＝上色層 `clip-path` 收到 0%。
   - 支援現況：MDN〈mix-blend-mode〉**Baseline Widely available**（各瀏覽器自 2020-01 起）。查證：https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode
   - Fallback：不支援時上色層仍以 `fill-opacity:.62` 半透明蓋在線稿下方，只是重疊處不加深。
3. **CSS @property 型別化自訂屬性（B 動效與時間軸層）**——`--wash`（`<percentage>`）同時驅動上百個上色層的 `clip-path`，一個 transition 讓整座戲台一起被「刷上」；`--px`（`<number>`）讓游標視差自己補間，不需要 JS 平滑。
   - 支援現況：MDN〈@property〉**Baseline 2024**（Chrome/Edge 85、Safari 16.4、Firefox 128，2024-07-09）。查證：https://developer.mozilla.org/docs/Web/CSS/@property 、https://web-platform-dx.github.io/web-features-explorer/features/registered-custom-properties
   - Fallback：未註冊時自訂屬性不可補間——白／彩與視差變成瞬間切換，結果相同。

**效能預算（實測）**：頁面大小 index 349,341 B、sheets 331,757 B、shop 287,210 B（皆 ≤350KB；其中 motion-library 子集約 254–257KB）。首屏 JS：本站邏輯為事件綁定與一次 `enter(1)`，jsdom 實測全流程（三景推完＋落幕＋切白版）無錯誤；換景只動 transform，不觸發版面重排；視差只寫一個 CSS 變數。同一畫面同時運轉的 motion-library 元件 ≤2（戲台頁：水排＋戲單章）。所有 motion-library 元件以 `tools/ml-smoke.js` 冒煙測試 `smoke ok`。
