---
name: albers-homage-interaction
description: Josef Albers "Homage to the Square" and "Interaction of Color" style — bottom-weighted nested squares on a 1:2:3 margin grid, flat unmixed colour planes that touch without lines, small lowercase grotesque captions under paired comparison plates, and a written verso listing every colour used.
---

# Albers 色彩互動・正方形禮讚 Josef Albers: Homage to the Square / Interaction of Color

> 型錄「現代主義與構成」2026-10-20 新增條目。範例站：四方畫材 SÌ-HONG ART SUPPLY（臺北師大路畫材行，`sites/si-hong`）。

## 設計哲學

Josef Albers（1888–1976）在包浩斯教初步課程、1933 年到北卡羅萊納黑山學院、1950 年起主持耶魯設計系。同一年他開始畫〈正方形禮讚 Homage to the Square〉，一直畫到 1976 年過世，總數一千幅以上（各家統計不一）。格式只有四種：三種三方塊、一種四方塊，全部建在 10 單位網格上，方塊和方塊之間的留白「底：側：頂」永遠是 1：2：3，所以中心會往下沉。他用市售管裝顏料，不混色，直接從管子用調色刀抹上纖維板的粗面，板子先打至少六道白底，背面寫下用了哪些顏料。

1963 年 Yale University Press 出版《Interaction of Color》：一套絹印圖版夾（各家著錄 80 夾、150 幅不等）加一冊說明，內容來自他課堂上的色紙習題——一色看成兩色、兩色看成一色、假透明。重點只有一句：**顏色是相對的。同一個顏色放在不同鄰居旁邊，就是不同的顏色。**

這個風格為什麼長這樣：

- **形式要中性，顏色才能說話。** 正方形是最不帶情緒的形狀；固定的格式讓上千幅之間唯一的變數是顏色。
- **不混色＝誠實。** 顏色照管子裡的樣子用，背面寫明廠牌與色名，任何人都能重做。
- **比較才是內容。** 一幅單獨看不出什麼；兩幅並排、同一塊中心落在不同的四周，錯覺才出現。

把這套語言搬到網頁上，畫面就是：打底白的大面積留白、一幅或兩幅方中方圖版、底下一行小寫說明、每一頁都有一個「背面」。

## 本風格的 5 個不可省略特徵

### ① 方中方 1：2：3 下沉嵌套

只有正方形，永遠軸對齊、零旋轉、零圓角、零圓形。四方塊格式在 10 單位網格上依序是 10、8、6、4 單位，內方塊的 底：側：頂 留白＝1：2：3（0.5/1/1.5、1/2/3、1.5/3/4.5 單位）。拿掉下沉，它就只是同心方塊。

```css
.plate{position:relative;aspect-ratio:1/1;container-type:inline-size;background:var(--c0)}
.plate>i{position:absolute;display:block}
.plate>.s1{left:10cqi;top:15cqi;width:80cqi;height:80cqi;background:var(--c1)}
.plate>.s2{left:20cqi;top:30cqi;width:60cqi;height:60cqi;background:var(--c2)}
.plate>.s3{left:30cqi;top:45cqi;width:40cqi;height:40cqi;background:var(--c3)}
```
```html
<div class="plate" style="--c0:#8E2F3C;--c1:#C4472C;--c2:#E9B83A;--c3:#D9822B"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div>
```
兩方塊（習題）格式只留 `.s3`：`--c0` 是底、`--c3` 是中心。

### ② 平塗、未混色、色與色直接相接

每塊一色。零漸層、零描邊、零陰影、零透明、零網點、零紋理。色塊之間沒有線，鄰接本身就是主題。顏色要有名字和號碼（像管子上的標籤），不是 `primary-500`。

```css
:root{--p02:#E9B83A /*02 鎘黃*/;--p03:#D9822B /*03 橙赭*/;--p04:#C4472C /*04 朱*/;--p05:#8E2F3C /*05 胭脂*/}
*{border-radius:0!important}
.plate *{box-shadow:none;border:0;background-image:none}
```

### ③ 小寫無襯線、退在畫後面

說明文字小（≤ 圖版寬的 1/25）、全小寫、無襯線幾何體；標題格式照 Albers 的命名：`homage to the square: "名稱"`。中文用中黑體 400／500，不用粗黑、不用展示字。字永遠在圖版下方，不壓在色塊上。

```css
.cap{margin-top:10px;font:400 13px/1.5 "Jost",sans-serif;text-transform:lowercase;color:#6F695F}
.cap q{color:#1E1C1B}
```
```html
<figcaption class="cap">plate i-a · homage to the square: <q>師大路的黃昏</q></figcaption>
```

### ④ 圖版成對並排＋打底白大留白

版面是一本圖版夾：打底白 `#F1EDE4` 佔畫面一半以上，圖版成對並排比較（Interaction of Color 摺頁版式），編號 `plate i-a / i-b`。並排的兩幅大小相同、中心在同一水平線上。

```css
.pair{display:grid;grid-template-columns:1fr 1fr;gap:6%;position:relative}
body{background:#F1EDE4}
```

### ⑤ 背面 verso：每一幅都寫明用了什麼

每一幅都有背面：纖維板褐 `#6E5238` 底、斜體小字，列出用了哪幾號紙／顏料、打底幾道、「straight from the tube」。網站的頁尾就是這一頁的背面，列出本頁用到的顏色；圖版點了要能翻面。

```html
<footer class="verso"><h4>paints used on this page</h4>
 <p class="paint"><i style="background:#D9822B"></i>03 橙赭 — 四方色紙，未混色</p>
 <p>ground: 6 coats white, rough side · straight from the tube, palette knife</p></footer>
```
```css
.verso{background:#6E5238;color:#EFE6D4;font:italic 400 14px/1.9 "Jost",sans-serif}
.verso .paint i{width:12px;height:12px;display:inline-block}
```

## 色彩系統

| 用途 | hex | 比例 |
|---|---|---|
| 打底白 primer（頁面地） | `#F1EDE4` | 50–60% |
| 墨（字） | `#1E1C1B` | 6% |
| 鉛筆灰（說明） | `#6F695F` | 3% |
| 分隔 | `#D8D2C6` | 細線用 |
| 纖維板褐 verso | `#6E5238` | 8–10%（頁尾、背面） |
| 圖版色（四方色紙 16 色） | 01 麥白 `#F2E6C9`、02 鎘黃 `#E9B83A`、03 橙赭 `#D9822B`、04 朱 `#C4472C`、05 胭脂 `#8E2F3C`、06 茄紫 `#5A2E4F`、07 群青 `#2E3F7A`、08 灰藍 `#3C78A8`、09 青瓷 `#7FB2A4`、10 苔綠 `#3E6B3A`、11 橄欖 `#A3A04A`、12 麻褐 `#B9A27F`、13 灰褐 `#8C7B6B`、14 炭 `#4A4440`、15 墨 `#1E1C1B`、16 灰白 `#D8D2C6` | 合計 25–35%，只出現在圖版與色票內 |

規則：一幅圖版 3–4 色；常用 Albers 式「同色相明度階梯」（胭脂→朱→鎘黃）或「冷四周包暖中心」。網站 UI 本身不上色，只有每頁一個代表色（`--key`）給按鈕的小方塊與換頁光圈。

## 字體系統

- 英文：Jost 300／400／500、400 italic（Google Fonts；幾何無襯線，Futura 系，包浩斯年代的字感）。全部 `text-transform:lowercase`。
- 中文：Noto Sans TC 400／500／700。
- 字級：說明 12–13px／內文 16px（行高 1.75）／導語 18px／區段標 22px／頁首店名 30px。**沒有超過 32px 的字**——字是說明，不是畫。
- 數字與號碼一律兩位數 `03`，用 Jost 500。

## 版面與網格

- 桌機：左側 120px 導覽直條＋主欄 max 1240px、左右 48px；手機（≤760px）導覽落到底部 74px、主欄左右 16px。
- 首屏是一對圖版（每幅約 min(31vw, 62vh)），右側 300px 窄欄放店名與一段說明。
- 區段之間 88px；區段內 5：7 兩欄（文字：圖），或 7：5 反過來。
- 零旋轉。所有元素軸對齊。留白用 10 單位網格想：大塊是 10、8、6、4。
- 圖版底下 10px 放說明；兩幅之間 6% 間距。

## 元件配方

- **nav（四聯方色票 swatch quartet）**：每頁一個 44px 三方塊迷你禮讚（外、第二圈各有顏色，中心是打底白＝「還沒上色」）；現用頁與 hover 時中心填上該頁代表色。
  ```css
  .sw .mini i:nth-child(2){left:30%;top:45%;width:40%;height:40%;background:var(--primer);transition:background-color .16s linear}
  .sw[aria-current] .mini i:nth-child(2){background:var(--k)}
  ```
- **按鈕**：墨色平塊，左邊一個 14px 代表色方塊；hover 時兩者互換顏色（無陰影無位移）。次要按鈕是 2px 墨框。
- **卡片**：不做卡片。用圖版＋說明；需要「卡」時用 `.flip` 翻面（正面圖版、背面 verso）。
- **表單／選擇**：選色就是一排正方形色票按鈕，被選中是 4px 墨色外框（outline，不是陰影）。
- **表格**：頂線 1px 墨、列線 1px `#D8D2C6`、表頭小寫 12px 鉛筆灰。
- **footer**：verso（見特徵⑤）。

## 動效規則

性質原則：顏色會變，形狀不動。方塊永遠不位移、不縮放、不旋轉；變的是色（`@property` 補間）、是一條紙（色橋）、是翻面與光圈。

| 種類 | 本站自製實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 首屏兩幅的外三圈每 9 秒換一組（四組色票輪替），中心 03 永遠不換；`@property --c0..--c3` 逐圈延遲 0／.3／.6s 補間 | 時間 | 2.6s `cubic-bezier(.45,0,.55,1)` | 不輪替，停在兩組固定色；資訊（中心是同一張紙）以文字說明 |
| input | 游標在圖版上橫移＝在四組外圈之間 OKLab 即時內插（`.live` 關掉補間）；色紙頁指到哪張、試色台立刻換底；色紙課拖紙放底 | pointermove／focus／drag | <1 幀；試色台 120ms linear | 照常（使用者自己在動） |
| transition | 換頁「方中方光圈」：下一頁代表色從 1：2：3 中心方塊的位置 `clip-path: inset(45% 30% 15% 30%)` 長滿整面，抵達頁再收回中心、收成底邊一點；櫥窗圖版 `rotateY` 翻到背面 | 點連結／點圖版 | 離開 460ms、抵達 620ms `cubic-bezier(.7,0,.2,1)`；翻面 700ms | 不放光圈；翻面瞬切 |
| signature | **色橋 color bridge**：把中心那張紙剪一條，從左幅中心鋪到右幅中心——同色的錯覺當場拆穿、不同色的「看起來一樣」也當場拆穿 | 按「搭一條色橋」或過關後 | 1100ms 三拍：抽出 25%→停→一刀鋪滿 | 直接出現整條，標註文字照常 |

### motion-library 元件表（wenxiangxiao/motion-library v1.7.0 @daecfee）

元件只用來加熱鬧，不當 signature；全部色值取自本站色票，`bg` 一律打底白 `#F1EDE4`（亮底 → 元件字色自動近黑）。參數出處：`MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 角色 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-A-19 | Gate | index | transition | text「這家店賣顏色」、primary `#C4472C`、secondary `#3C78A8`、bg `#F1EDE4`、duration 1.6、loop:false、seed 1963 | 兩片平塗色板（朱、灰藍）往兩側拉開露出標題——兩個顏色並排就是 Interaction 的單位；只有矩形、無圓角無發光 |
| TXT-B-30 | Checker Words | lesson | transition | text「色紙課」、primary `#3C78A8`、secondary `#2E3F7A`、duration 1.8、loop:false、seed 12 | 正方形格子一格一格長滿再反白出字，像在桌上一張一張排色紙；全是軸對齊方塊 |
| BG-B-33 | Minimal Blocks | paper | ambient | primary `#C4472C`、secondary `#E9B83A`、duration 8、density 1、seed 4 | 三張不透明方紙在 2×2 位置間輪流疊放——Albers 的「假透明」習題就是用不透明紙疊出來的 |
| TXT-A-35 | Stripe Mask | visit | transition | text「來店」、primary `#3E6B3A`、secondary `#A3A04A`、duration 1.4、loop:false、seed 117 | 直條遮罩逐條揭出字，像把一條條紙並排貼滿；平塗、無斜角 |
| SHP-12 | Split & Merge | visit | ambient | primary `#3E6B3A`、secondary `#A3A04A`、duration 3.2、loop、seed 8 | 四個方塊分開又合起，對應色紙課「兩人一桌、四張紙對換著放」；底下的 6% 細網格讀作 Albers 的 10 單位構圖網格 |

掛載規則：等 `document.fonts.ready`；離屏 `destroy()`、回到視窗重掛；一次性文字元件進視窗播一次，之後 `seek(1)`；canvas `aria-hidden`，容器保留 `.ml-fb` 原 HTML 標題；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

全站沒有插畫，只有圖版：四方塊禮讚、兩方塊習題、色票方塊。地圖也用矩形拼（街道是打底白長條、校區是一塊苔綠、店是一幅迷你禮讚）。沒有物件圖示、沒有人物、沒有照片感。若一定需要圖示，用一個 3 方塊迷你禮讚代替。

## Logo 與 Favicon 設計指南

Logo＝一幅四方塊禮讚（外胭脂、朱、鎘黃、中心橙赭，嚴守 1：2：3）＋右側「四方畫材」Noto Sans TC 500 與小寫 `sì-hong art supply`。Favicon 是同一幅，`viewBox="0 0 10 10"`，四個 `<rect>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect width='10' height='10' fill='%238E2F3C'/%3E%3Crect x='1' y='1.5' width='8' height='8' fill='%23C4472C'/%3E%3Crect x='2' y='3' width='6' height='6' fill='%23E9B83A'/%3E%3Crect x='3' y='4.5' width='4' height='4' fill='%23D9822B'/%3E%3C/svg%3E">
```

## Do & Don't

**Do**
- 每一幅都守 1：2：3、中心往下沉。
- 讓兩幅並排比較；同一塊中心放在不同四周。
- 顏色寫名字和號碼；頁尾列出本頁用了哪些色。
- 字小、小寫、放在圖下方。

**Don't**
- 不要同心置中的方塊（那是靶，不是 Albers）；不要旋轉的菱形。
- 不要圓角、描邊、陰影、漸層、玻璃、發光、半透明疊色（假透明要用不透明色「做」出來）。
- 不要把字壓在色塊上、不要大標 hero、不要置中三卡片。
- 去AI化禁令照舊：禁紫藍漸層、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章、禁「在當今快節奏的世界」腔。
- 不要用色環或調色盤 UI 解釋顏色——用並排的實例。

## 頁面骨架範例

```html
<body style="background:#F1EDE4;padding-left:120px">
<nav class="rail" aria-label="主選單">
 <a class="sw" href="index.html" aria-current="page" style="--a:#8E2F3C;--b:#C4472C;--k:#D9822B"><span class="mini"><i></i><i></i></span><b>首頁</b><span>homage</span></a>
</nav>
<main>
 <div class="folio"><span><b>plate i</b> · homage to the square</span><span>店名・地址</span></div>
 <div class="hero">
  <div class="pair">
   <figure><div class="plate" style="--c0:#8E2F3C;--c1:#C4472C;--c2:#E9B83A;--c3:#D9822B"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div>
    <figcaption class="cap">plate i-a · <q>黃昏</q></figcaption></figure>
   <figure><div class="plate" style="--c0:#2E3F7A;--c1:#3C78A8;--c2:#7FB2A4;--c3:#D9822B"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div>
    <figcaption class="cap">plate i-b · <q>雨後</q></figcaption></figure>
  </div>
  <div><h1><span class="en">shop name</span>中文店名</h1><p>兩幅中心是同一個顏色。</p></div>
 </div>
</main>
<footer class="verso">…本頁用到的顏色…</footer>
</body>
```

## 技術實作與相容性

| 技術 | 承載 | 支援現況（查證） | fallback |
|---|---|---|---|
| CSS container query units（`cqi`）＋`container-type:inline-size` | 特徵①：1：2：3 嵌套的位置與尺寸、櫥窗背面的字級全部以圖版自身寬度計，任何尺寸比例不變 | caniuse「Container query length units」：Chrome／Edge 105、Safari 16.0、Firefox 110 起支援（2023 年初三大引擎齊） | 先寫 `%` 版（正方形容器裡 `%` 與 `cqi` 等值），`@supports (width:1cqi)` 再覆寫；背面字級退為 11px |
| CSS `@property`（`syntax:'<color>'`）＋`transition` | ambient 逐圈換色、習題換底、試色台換底——未註冊的自訂屬性不能補間，註冊後顏色才會「慢慢換」 | MDN `@property`：Baseline 2024（2024-07 起三大引擎最新版皆支援；Chrome 85、Safari 16.4、Firefox 128） | 不支援時自訂屬性照常生效但瞬切；ambient 仍在換，只是沒有補間 |
| OKLab 同時對比誘導模型（自寫，E 層規則引擎） | func 判定與所有「看起來偏亮／偏冷」的說明：apparent = c + k·(c − s)，明度 k=.42、色度 k=.55；勝負以 ΔE_OK 判：第一題 ≥ .20、第二題 < .04 | 純 JS 運算，無相容問題；sRGB↔OKLab 依 Björn Ottosson 2020 公式 | 無 JS 時色紙課顯示 noscript 說明，其餘頁面靜態圖版完整 |

其他：拖曳用 Pointer Events（`setPointerCapture`、`elementFromPoint` 找落點），亦可點選或鍵盤 Enter 選紙；換頁光圈與色橋用 Web Animations API `Element.animate()`（不支援則直接換頁、色橋直接出現）；`?h=05040203` 八位數記一幅禮讚，可分享還原。

**效能**：四頁分別 93／97／89／87 KB（含 61.6 KB motion-library 子集），皆遠低於 350 KB；首屏腳本只做 DOM 建立與一次 `setProperty`，無逐幀 JS（ambient 交給 CSS transition），motion-library 同畫面 ≤2 個且離屏即 destroy。

**誘導模型的限制**：這是教學用的線性近似，以 Albers 書中習題的方向調校，不是 CIECAM 等色彩外觀模型；數值只拿來決定「過不過關」與文字提示，不宣稱任何物理準確度。
