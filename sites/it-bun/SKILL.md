---
name: kamon-warituke-crest
description: Japanese family-crest (kamon) style — one-colour emblems built only from compass arcs and ruler lines inside a closed frame, repeated by rotational or mirror symmetry, rendered as solid, outline or mid-outline (yō / in / chū-in), and named by a strict grammar of frame + arrangement + motif.
---

# 家紋 Kamon・紋章上絵 — 風格規格書

示範站：`sites/it-bun`（一紋烙印所，臺中中區烙印鐵工房）。

## 設計哲學

家紋是一套**用名字就能重畫的圖形系統**。平安末年公家把紋飾畫在牛車上辨識身分，武家在戰場的旗與陣幕上沿用，到江戶時代商家、役者與庶民也各有其紋；明治以後紋帖（紋帳）把數千枚紋按外枠與圖樣排成目錄。紋章上絵師在反物上描紋，工具是細筆與竹製的**分廻し（ぶんまわし，圓規）**——江東區登錄的紋章上絵技術說明正是「細筆やぶんまわし（コンパス）などを使い」。當代上絵師波戸場承龍把這套「只用正圓組線」的作法搬進 Illustrator，也證明了它的本質：**每一條曲線都是某個圓的一段**。

所以這個風格不是「日式」的氣氛，而是一組嚴格的約束：一個框、一種墨、一個對稱群、一套命名文法。網頁上它的力量來自克制——畫面裡的紋越少、越大、越乾淨，越像。

## 本風格的 5 個不可省略特徵

### 1. 圓裡完結：每個紋都住在一個框裡

外枠只有五種：丸・角・隅切り角・亀甲・菱（也可以無枠，但紋的外緣仍是一個看不見的正圓）。紋永不跨出框、不透視、不打光、不裁切。網頁上紋以 1:1 正方容器呈現，周圍留白至少 12%。

```svg
<!-- 丸に〜：外圓 r49 實心，內圓 scale(.83) 用地色挖空，圖樣縮到 .78 -->
<svg viewBox="-50 -50 100 100"><path d="M-49 0A49 49 0 1 0 49 0A49 49 0 1 0 -49 0Z" fill="currentColor"/>
<path d="M-49 0A49 49 0 1 0 49 0A49 49 0 1 0 -49 0Z" fill="var(--g)" transform="scale(.83)"/>
<g transform="scale(.78)"><!-- 圖樣 --></g></svg>
```

### 2. 對稱就是文法：畫一份，轉 n 次

一個單位圖樣（葉、羽、扇、巴）以固定排法重複：違い（±30° 交叉）、並び（左右 ±16 並排）、三つ（繞圓心 120°）、三つ盛り（品字疊）、二つ（180°）。固有對稱的紋自帶 n：梅鉢 5、九曜 8、木瓜／四つ割菱／井桁 4。後疊的單位要先以地色描一圈 5 單位寬的「縁切り」，交叉處才乾淨。

```js
/* 三つ：三份同一單位，translate 到 r22 再轉 */
[0,120,240].map(t=>`<use href="#unit" transform="rotate(${t}) translate(0 -22) scale(.58)"/>`)
/* 違い：後一份先畫地色描邊做縁切り */
'<use href="#unit" transform="rotate(-30)"/><use href="#unit" transform="rotate(30)" stroke="var(--g)" stroke-width="5"/><use href="#unit" transform="rotate(30)"/>'
```

### 3. 一色・染め抜き：只有墨與地

陽紋＝實心，脈線用地色「切開」；陰紋＝只留外緣一線（線寬 = 直徑 × 2.2%）；中陰＝外緣加粗一倍（4.4%）。**地色就是第二個顏色**，不得出現第三色、漸層、陰影或透明疊色。陰紋的作法：先以墨描 2 倍線寬，再以地色填一次同一路徑，就只剩外緣。

```css
.mon{color:#2B1B12;--g:#F2ECDF}          /* 墨／地，換底時一定同時換 --g */
.mon.in path{fill:var(--g);stroke:currentColor;stroke-width:4.4} /* 陰紋（第一遍）*/
```

### 4. 只有圓弧與直線（分廻しと定規）

所有曲線一律 SVG `A` 指令（圓弧，rx=ry），直線一律 `L`；**禁用 C/Q 貝茲曲線與徒手筆觸**。葉的裂片是半徑 7 的小圓弧接起來的，銀杏是以葉柄為圓心半徑 52 的扇形，巴是半徑 R 的半圓加上兩段 R/2 的圓弧。割り付け下図（同心圓 r49/37/24/12 ＋ n 等分線）是這個風格可以公開展示的「骨架」，用朱色 1px 髮絲線疊在紋上。

```svg
<!-- 巴：一個半圓＋兩段半徑 R/2 的弧 -->
<path d="M0 -24A24 24 0 0 1 0 24A12 12 0 0 1 0 0A12 12 0 0 0 0 -24Z"/>
<!-- 割り付け下図 -->
<g fill="none" stroke="#E2531E" vector-effect="non-scaling-stroke"><circle r="49"/><circle r="37"/><circle r="24"/><circle r="12"/><line x2="0" y2="-49"/></g>
```

### 5. 紋名就是規格書：紋帖式組版

紋名＝［陰陽］＋［外枠］＋［排法］＋［圖樣］：「中陰隅切り角に三つ銀杏」「丸に違い鷹の羽」。版面上紋永遠與直排紋名成對出現（明朝體、字距 .14em），像紋帖一樣以 1px 規線分格、格內編號「第〇〇號」。紋名可以拆成部件晶片顯示（圖樣那一格反白）。

```css
.cell{display:grid;grid-template-columns:1fr 22px;border-right:1px solid #2B1B12;border-bottom:1px solid #2B1B12}
.vname{writing-mode:vertical-rl;font:600 12.5px "Noto Serif TC",serif;letter-spacing:.14em}
```

## 色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 檜（地） | `#E4CDA2` | 頁面底，帶 1px 硬邊木紋線 `#D7BC8D` | ~45% |
| 紋帖紙 | `#F2ECDF` | 卡片、紋帖、表單 | ~22% |
| 焼き色（墨） | `#2B1B12` | 所有紋、內文、規線、導覽底 | ~18% |
| 淺焼き | `#6B4A30` | 次要文字、木柄、皮件 | ~5% |
| 真鍮 | `#A57F3A`／`#C9A55A` | 烙鐵頭、柄箍、頁尾小字 | ~6% |
| 熾火 | `#E2531E` | 只給「熱」：現用頁鐵頭外圈、主按鈕、割り付け下図、錯誤 | ≤4% |

規則：紋本身永遠只有「焼き色＋地」兩色；熾火不得進入紋內。換底色時同步改 `--g`，否則縁切り與陰紋的地色會露餡。

## 字體系統

- `Noto Serif TC` 400／600／900（Google Fonts）：標題 900、晶片與紋名 600、內文 400，行高 1.85。
- `Noto Sans TC` 900：只給 motion-library 的 canvas 文字元件。
- 字級：H1 直排 46–92px（clamp）、H2 26–40px、內文 16px、紋名 12.5–34px 直排、kicker 12px 字距 .24em。
- 不用任何手寫體與「和風」裝飾字；紋已經夠和風。

## 版面與網格

- 左側 112px 烙鐵架導覽（≤760px 落為底部 74px dock）。
- 內容最大 1180px，16–48px 側邊距；區塊以 1.5px 焦茶實線分格，**零圓角卡片**（只有正圓是允許的曲線元素）。
- 首頁首屏 1.25fr／1fr：左是檜木板與烙鐵（物件），右是直排店名＋說明，不做大標 hero。
- 紋帖：`repeat(auto-fill,minmax(128px,1fr))` 的規線格；右側 380px sticky 詳情。
- 旋轉角度只用 30° 的倍數（違い ±30°、三つ 120°）；吊回的烙鐵 9° 是唯一例外。

## 元件配方

- **nav（烙鐵架）**：焦茶直條上掛四支烙鐵 SVG（木柄 9px、真鍮箍、2.8px 軸、圓頭 r20），頭上是**鏡像**的紋；現用頁外圈 `stroke:#E2531E`、整支下沉 4px；hover 提起 5px 轉 −7°。旁邊直排頁名＋小字英文。
- **按鈕**：2px 焦茶框、紋帖紙底、600 字重字距 .12em；`.hot` 為熾火底。前置一顆 12px 實心圓（像一枚最小的紋）。按下 translateY(2px)。
- **卡片**：紋帖紙＋1.5px 焦茶框，零陰影零圓角。
- **晶片**：部件選擇用，`aria-pressed` 反白；不合法的排法（巴不能「違い」）劃線停用。
- **表單**：radio／checkbox `accent-color:#2B1B12`；文字框 1.5px 框。
- **footer**：焦茶底、真鍮小字、店紋 72px 反白。

## 動效規則

| 種類 | 觸發 | 規格 |
|---|---|---|
| signature 對稱扇區揭示 | 紋進視窗（IO threshold .4–.6）、篩選、組紋、烙下 | `repeating-conic-gradient(from calc(-180deg/n), #000 0 var(--sw), transparent 0 calc(360deg/n))` 為遮罩；`@property --sw:<angle>` 從 0 transition 到 360°/n，600–1300ms `cubic-bezier(.62,0,.32,1)`；結束加 `.done` 拿掉遮罩 |
| input 割り付け下図 | pointer 進入紋 | 下図 120ms 浮出；分廻しの腕 `rotate(atan2)`，rAF 合併、同幀更新 |
| transition 烙圈 | 站內連結 | 點擊處 `clip-path:circle(0→150vmax)` 420ms `cubic-bezier(.7,0,.3,1)` 焦茶蓋滿；下一頁 `circle(150vmax→0)` 500ms 由中心燒開 |
| ambient 炭床 | 永續 | 12 塊炭的裂縫 `steps(6)` 2.6–4.1s 明滅，延遲錯開 |
| 首屏壓鐵 | 載入／「再烙一次」 | 鐵 550ms 落下 → 接觸瞬間紋出現、`color` 以 `steps(3)` 900ms 由真鍮變焼き色 → 三縷煙 2.6s → 鐵吊回 1s |
| 按住烙 | pointer／Space 按住 | 焼き色三段：<0.35s 淺（真鍮色）、0.35–1.5s 剛好、>1.5s 焦（`feMorphology dilate 1.6`）|

禁用：淡入當主打、數字滾動計數、彈跳、模糊陰影、跑馬燈。reduced-motion：扇區揭示直接完成、烙圈不出現、炭火停在亮格、烙鐵直接吊回、巴不轉；資訊零損失。

### motion-library 元件表

來源 `wenxiangxiao/motion-library` v1.9.0 @6e9435f；`node tools/ml-embed.js <ml>/src/motion-lib.js SHP-34,TXT-A-04,BG-A-09,TXT-A-21,TXT-B-36 6e9435f` 子集＋`motion-player.js`，每頁 inline 為第一個 `<script>`；掛載用站內 `IB.ml()`（等 `document.fonts.ready`、離屏 destroy、一次性 `once`、reduced-motion 背景 `seek(.35)`／文字 `seek(1)`）。提示詞可用 `MotionLib.prompt(id)` 取得。

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| SHP-34 | Circle Draw | index | primary `#2B1B12` secondary `#E2531E` bg `#F2ECDF`，duration 3.2，loop，seed 1958，1:1 | 一腳定心、一腳畫圓的分廻し第一筆；只畫 `arc` 與一個圓點，零圓角零發光 |
| TXT-A-04 | Punch Zoom | index | primary `#E2531E` secondary `#2B1B12` bg `#F2ECDF`，1.4s，once，seed 6，maxHeight 330 | 「一烙定紋」像烙鐵壓下：字衝入、外圈震開；淺底→字色自動近黑 |
| BG-A-09 | Polar Grid | moncho | primary `#E2531E` secondary `#A57F3A` bg `#F2ECDF`，14s，loop，intensity .7，density .8，seed 1986 | 同心圓＋放射線就是割り付け下図；只有 `arc`／`lineTo` |
| TXT-A-21 | Link Circle | renshu | primary `#2B1B12` secondary `#E2531E` bg `#F2ECDF`，1.6s，once，seed 4，1:1 | 實心圓內以地色挖出「四張單」＝染め抜き本身 |
| TXT-B-36 | Ink Bleed | visit | primary `#2B1B12` secondary `#E2531E` bg `#E4CDA2`，2s，once，seed 9 | 「來店」從數點吃開，像焦痕滲進木紋；檜木淺底→字色近黑 |

選用原則：避開會畫 `rr()` 圓角矩形（如 Stamp In、Kaleidoscope 的方塊）與漸層描邊（Spirograph）的元件——圓角與漸層都不在分廻しと定規的語彙裡。同一畫面最多兩個元件在跑。

## 插畫與圖像風格

**割り付け家紋（warituke-mon）**：全站沒有插畫，所有圖像都是同一支引擎依紋名即時生成的紋，外加由矩形與圓組成的物件（烙鐵、銅鑼燒、杯墊、皮標、柴屐、地圖）。物件也守同一條規矩：只用直線與圓弧（柴屐是兩個半圓接直線），平塗、零陰影。地圖的街道是 7px 直線、綠川是一段半徑 420 的圓弧。

## Logo 與 Favicon 設計指南

店紋「丸に一つ引」：外圓環＋一條橫帶，是最少筆畫的紋，也是「一紋」的字面。Logo（`assets/logo.svg`）為店紋＋橫排「一紋」900 字重、「烙印所」與小字 IT-BÛN BRANDING IRONS，下方一條熾火細線（唯一允許熾火出現在標誌的地方）；favicon 為檜木色圓底上的焦茶紋（inline SVG data URI）。烙鐵上的店紋一律鏡像。

## Do & Don't

**Do**：紋與紋名成對出現；每個紋都能說出它的對稱數；換底就換 `--g`；讓使用者看到割り付け下図；鐵頭上的紋鏡像。

**Don't**：貝茲曲線、徒手線、第三個顏色進紋內、漸層、模糊陰影、圓角卡片、紅白「和風」配色套餐、浮世繪波浪背景、櫻花亂飄、Lorem ipsum、emoji、紫藍漸層、置中三卡片、EST. 徽章。不要描摹任何現存企業或家族的特定紋樣——用文法重新割り付け。

## 頁面骨架範例

```html
<nav class="rack" aria-label="主導覽（烙鐵架）">
  <ul><li><a class="iron" href="index.html" aria-current="page"><span class="tool" data-mon="丸に一つ引"></span><span class="lbl">一紋<small>烙印所</small></span></a></li></ul>
</nav>
<main>
  <section class="hero">
    <div class="board"><div class="mark plate"><!-- KM.svg('丸に一つ引') --></div></div>
    <div class="htxt"><h1 style="writing-mode:vertical-rl">一紋烙印所</h1><p class="lead">一個紋，一支鐵，一下。</p></div>
  </section>
  <div class="grid"><button class="cell"><div class="plate"><!-- 紋 --></div><span class="vname">丸に三つ柏</span><span class="no">第0050號</span></button></div>
</main>
<script>
/* 紋名 → SVG → 扇區揭示 */
el.innerHTML = KM.svg('中陰隅切り角に三つ銀杏');
IB.sweep(el.querySelector('.mon'), KM.symN('中陰隅切り角に三つ銀杏'), 1100);
</script>
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況（查證） | fallback |
|---|---|---|---|---|
| `@property` 註冊 `<angle>`＋`repeating-conic-gradient()` 遮罩 | B 動效＋A 渲染 | 對稱扇區揭示（signature） | `@property`：MDN 標為 Baseline 2024（Chrome/Edge 85、Firefox 128、Safari 16.4）；`repeating-conic-gradient()`：caniuse 列 Chrome 69、Firefox 83、Safari 12.1 起支援；`mask-image` 無前綴 Safari 15.4 起，另附 `-webkit-mask-image` | `CSS.supports('mask-image','repeating-conic-gradient(...)')` 為假或 reduced-motion → 直接加 `.done`，紋完整顯示；`@property` 不支援時 transition 不補間、直接跳到完成 |
| 紋名文法引擎 KM（自寫） | E 資料與生成「規則引擎／文法」 | 紋名 ⇄ 部件 ⇄ SVG；算對稱數 n；接單判定；URL `?mon=` 分享 | 純 JS 字串與 SVG 字串組裝，ES5 語法 | 無 JS 時頁面標題與文字仍在（紋圖缺席）；`URLSearchParams` 失敗則用預設紋 |
| Pointer Events＋`setPointerCapture`＋rAF | D 輸入與感測 | 按住烙（壓的秒數→焼き色三段）；割り付け腕跟游標 `atan2` | Pointer Events 全主流瀏覽器支援；按住烙同時綁 Space／Enter `keydown`/`keyup`（忽略 `repeat`） | 觸控長按 `contextmenu` 已攔；鍵盤可完整操作 |

查證來源：MDN〈@property〉；caniuse〈repeating-conic-gradient()〉；江東區〈染織（紋章上絵）〉；和樂 web〈波戸場承龍・ぶんまわしで描く家紋〉；國立國會圖書館リサーチ・ナビ〈家紋について調べるには〉（沼田頼輔《日本紋章学》、泡坂妻夫《家紋の話》）。

效能實測（node，無瀏覽器）：KM 生成 36 枚紋帖 SVG＋下図平均 0.9ms（node 22，暖機後 20 次平均）；四頁 HTML 各 120–131KB（含 77KB motion-library 子集與 6KB 播放器），遠低於 350KB；扇區揭示只動一個合成屬性，不觸發 layout（僅遮罩重繪）；同一畫面同時運轉的 motion-library 元件 ≤2。
