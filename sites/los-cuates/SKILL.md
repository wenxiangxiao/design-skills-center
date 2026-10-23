---
name: rotulos-mexicanos
description: Mexican hand-painted wall signage (rótulos / rotulismo) — saturated vinyl-painted walls, three-layer sign letters (face, outward filete, hard drop shade), panel-filling type, naive product paintings with white brillo dabs, and the rotulista's signature.
---

# Rótulos Mexicanos・墨西哥手繪招牌牆 風格規格書

> 範例站：Vulcanizadora Los Cuates（伊斯塔帕拉帕 24 小時補胎行）。本規格書不綁產業：小吃攤、雜貨店、修車、理髮、洗衣、水電行都適用。

## 1. 設計哲學

Rótulo 是墨西哥街頭直接畫在店家外牆、圍牆（barda）、攤車上的招牌。二十世紀初起由專業招牌畫師 **rotulista** 以松鼠毛平筆與乙烯漆（pintura vinílica）手寫，技法揉合壁畫、字體、書法與色彩學；一面牆常要畫好幾天。1990 年代後印刷帆布（lona）取代了大半；2023 年墨西哥城 Cuauhtémoc 區把約 1,500 個攤位的手繪廣告刷白，引發「刷掉的是文化遺產」的爭議。代表性的整理：Juan Carlos Mena《Sensacional de Diseño Mexicano》（David Byrne 序）、Letterform Archive〈Mexican Rótulos: An Endangered Species?〉。

它長成這樣，是因為三個限制：

1. **讀者在移動**——行人、公車、時速四十公里的車。最重要的三個字必須在三十公尺外讀得到，所以字被放大到撐滿牆板。
2. **只有幾罐漆**——乙烯漆一罐一色、不混色漸層、一層乾了才上下一層。所以畫面是平塗、硬邊，立體感靠「影」這一層而不是明暗漸層。
3. **招牌就是名片**——畫師在角落簽名留電話，牆本身替他攬生意。

一句話：**一面牆、一個字三層漆、能從對街讀到。**

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，就不是 rótulo 了。

### ① 牆就是畫布（barda）
滿版飽和乙烯漆色當頁面地，頂端一條 cenefa 色帶、底部一條深色 zócalo 踢腳；牆面有灰泥 tirol 顆粒。**字直接畫在牆上，不裝進卡片**；需要白底時是「在牆上刷一塊白再加雙線框」。

```css
body{background-color:var(--wall);background-image:var(--tirol)} /* tirol＝SVG 硬點，見 §7 */
.cenefa{height:22px;background:linear-gradient(var(--rojo) 0 15px,var(--cal) 15px 19px,var(--negro) 19px)} /* 只用硬停點 */
.zocalo{height:84px;background:var(--negro);border-top:6px solid var(--cal)}
.tabla{background:var(--cal);box-shadow:inset 0 0 0 7px var(--cal),inset 0 0 0 10px var(--negro)} /* 刷白＋畫框線 */
```

### ② 三層字：字面＋外框 filete＋右下影 sombra
每個招牌字＝填色 face、只往外長的 filete、往右下的硬邊 sombra 三層；**三色都不能等於牆色**；零模糊、零漸層。小字用 `paint-order` 一層搞定，大字拆三層才能逐層上漆。

```css
/* 一層版（標題、價格） */
.pt{color:var(--fill);-webkit-text-stroke:.16em var(--fil);paint-order:stroke fill;text-shadow:.09em .09em 0 var(--sh)}
/* 三層版（主招牌） */
.rt .l{display:grid}.ly{grid-area:1/1}
.ly.s{color:var(--sh);-webkit-text-stroke:.15em var(--sh);transform:translate(.075em,.075em)}
.ly.o{color:var(--fil);-webkit-text-stroke:.15em var(--fil)}
.ly.f{color:var(--fill)}
```
牆色與三層的配法（本站四面牆）：黃牆＝紅字／白框／黑影；粉牆＝白字／黑框／藍影；藍牆＝黃字／黑框／紅影；綠牆＝白字／紅框／黑影。

### ③ 撐滿板寬的字級＋招牌草書混排
每一行都被放大到剛好撐滿板寬，所以**行與行的字級不同**（字少的行字大）。主字用方頭粗招牌體（Bungee），副行用一行手寫招牌草書（Yellowtail）斜 −3°；項目前用星形符號，¡ ! 照寫。

```css
.rt{container-type:inline-size}
.rt .l{font:400 calc(100cqi / var(--n) * 1.42 * var(--k,1))/1.04 Bungee,"Arial Black",Impact,sans-serif;white-space:nowrap}
.script{font:400 clamp(30px,6vw,64px)/1 Yellowtail,cursive;transform:rotate(-3deg)}
.estrella{width:.9em;height:.9em;background:var(--rojo);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)}
```

### ④ 素樸商品畫＋白色 brillo 亮點
商品（輪胎、工具、指路手）正面、平塗、黑色輪廓、零透視零漸層；立體只靠**左上一抹白色短弧 brillo**。每個大字左上也點同一個位置的 brillo。指路手 manita 是標準母題。

```svg
<circle cx="100" cy="100" r="93" fill="#1A1716"/>
<circle cx="100" cy="100" r="52" fill="#C9C1B0" stroke="#1A1716" stroke-width="4"/>
<path d="M48 56A66 66 0 0 1 70 38" stroke="#FAF6EA" stroke-width="6" stroke-linecap="round" fill="none"/><!-- brillo -->
```
```css
.ly.f i::after{content:"";position:absolute;left:.15em;top:.2em;width:.15em;height:.045em;background:var(--cal);transform:rotate(-30deg)}
```

### ⑤ 招牌口吻與畫師簽名
文案是祈使與清單：SE PARCHAN LLANTAS／24 HRS／價格直接寫在牆上；**電話是最大的字之一**；右下角必有 rotulista 簽名＋電話＋年月。

```html
<span class="firma">Rot. Beto Salgado<b>55 5582 0983 · DIC 2025</b></span>
```

## 3. 色彩系統

| 名稱 | Hex | 用途 | 比例 |
|---|---|---|---|
| amarillo 牆黃 | #F6C400 | 首頁牆、紅牆上的字 | 每頁一面牆約 55% |
| rosa mexicano | #E4007C | 價目頁牆 | 同上 |
| azul añil 靛藍 | #1F4FA8 | 遊戲頁牆、粉牆上的影 | 同上 |
| verde bandera | #0A8A43 | 來店頁牆 | 同上 |
| rojo 紅 | #E2231A | 字面、星號、按鈕、cenefa | 8% |
| negro llanta 胎黑 | #1A1716 | 影、輪廓、zócalo、正文 | 15% |
| cal 石灰白 | #FAF6EA | 刷白板、外框、brillo | 18% |
| gis 粉筆黃 | #FFE14D | 胎上傷口的粉筆圈、hover 標記 | ≤2% |

規則：每頁只有一面牆色；字的三層都不等於牆色；中間色不存在（不調淡、不加透明）。

## 4. 字體系統

- **Bungee**（Google Fonts，David Jonathan Ross，以城市招牌為原型）：主招牌、價格、按鈕、標籤。字級由 `cqi` 撐滿決定，不用固定 scale。
- **Yellowtail**（Google Fonts）：每面牆至多兩行的手寫招牌草書。
- **Noto Sans TC** 500／700／900：中文正文與說明，16px／1.75；中文在牆上只出現在刷白板內。
- 小標籤字級：13–16px Bungee，字距 .03em。正文不放在牆色上超過兩行。

## 5. 版面與網格

- 桌機 7:4 兩欄：左欄是牆上的招牌本體（字、圖、服務清單、電話、簽名），右欄是刷白板（營業狀態、說明、按鈕）。≤860px 單欄；≤560px 字級靠 cqi 自動縮。
- 草書行 rotate(−3deg)；其餘一律水平，不旋轉卡片。
- 邊距 clamp(16px,4vw,48px)；牆板之間 22–28px；cenefa 永遠在最上、zócalo 永遠在 footer 前。

## 6. 元件配方

- **導覽 manita-aqui**：四隻指路手，非現用頁手指向右（點我往那走），現用頁手指轉 90° 朝下，標籤後加「· AQUÍ」。hover 手往右推 6px。
- **按鈕**：紅底＋內 3px 紅＋2px 白線框（畫在牆上的雙線）＋5px 黑硬影；按下時位移 4px 影縮 1px。
- **刷白板 .tabla**：見特徵①。
- **價目表**：真 `<table>`，刷白底、3px 黑分隔線；價格用 `.pt` 一層三色字靠右。
- **footer**：zócalo 延伸成黑底，連結用牆黃。

## 7. 動效規則

| 種類 | 本站實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 一條輪胎沿 zócalo 滾過 TOPE（`offset-path: path()`，路徑由 JS 依寬度生成），自轉 1.1s | 常駐 | 11s linear 無限 | 停在 30% 位置不轉 |
| input | 游標碰到大字，該字的字面＋外框抬起 0.07em、影留在牆上；價目列有指路手跟到該列 | pointerover／focus | 320ms cubic-bezier(.3,1.4,.5,1)；手 160ms | 無位移，只有列底色 |
| transition | 換頁＝三道油漆滾筒以下一頁的牆色由左刷滿，下一頁再由右退開 | 點內部連結 | 360ms＋90ms 錯開，cubic-bezier(.6,0,.3,1) | 直接換頁 |
| signature | **capa por capa**：依招牌畫師的上漆順序重畫整面牆——字面逐字 70ms → 影逐字 45ms → 外框逐字 45ms → brillo 逐字彈出 → 草書 → 簽名；遊戲成績也以同一順序畫回牆上 | 載入、按「請 Beto 重畫」、遊戲結束 | 每筆 240ms cubic-bezier(.5,0,.6,1)，全程約 4s | 直接顯示完成態 |

自我限制：本風格不用淡入、不用模糊、不用視差；「出現」一律是筆刷由左到右的 clip-path。

### motion-library 元件表（PLAYBOOK §2.8，motion-library 1.11.0 @dc24b44）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 動效種類 |
|---|---|---|---|---|---|
| TXT-A-36 | Long Shadow | index | text '24 HRS'，colors {primary #E2231A, secondary #1A1716, bg #F6C400}，duration 2.2，loop:false，seed 24，16:9 | 「24 HRS」長出一整條實色階梯長影＝放大的 sombra 層；零模糊，影色由牆色與紅混成單一平色 | transition（進視窗播一次） |
| BG-B-15 | Truchet Tiles | index | colors {#1A1716, #E2231A, #F6C400}，duration 9，density 1.4，seed 1971 | 黑色四分圓弧在黃牆上翻轉＝輪胎胎紋 dibujo de llanta 的帶狀飾邊，取代裝飾分隔線 | ambient |
| TXT-B-08 | Number Slam | precios | text '$60'，colors {#FAF6EA, #F6C400, #E4007C}，duration 1.6，loop:false，seed 60 | 最常被點的價格「砸」到粉牆上——招牌上最大的數字就是最重要的資訊 | transition |
| TXT-B-18 | Letter Bounce | taller | text '¡ÁNDALE!'→回合結束改 '¡QUEDÓ!'，colors {#F6C400, #E2231A, #1F4FA8}，duration 1.8，loop:false | 結果板的驚嘆字逐字彈落，像店員喊話；字由藍牆亮度自動取近白 | input（回合結束重播） |
| BG-B-22 | Stripe Twist | llegar | colors {#F6C400, #E2231A, #0A8A43}，duration 8，density 1.2，intensity .8，seed 83 | 雙色波浪條＝牆頂常見的手刷 franjas 飾帶，硬邊 fillRect、零漸層 | ambient |

出處：各元件 `MotionLib.prompt(id)`；子集由 `tools/ml-embed.js` 產生並 inline 為每頁第一個 `<script>`。掛載包裝 `LC.ml`：等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `loop:false`、canvas `aria-hidden`、`.ml-fb` 保留原 HTML 標題、reduced-motion 背景 `seek(.35)`／文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 8. 插畫與圖像風格（brillo-naif）

- 全部 inline SVG：圓、短直線、單段弧。輪胎＝黑外圈＋26 道胎紋短線＋深灰胎側＋米灰鋼圈＋五顆螺帽＋兩道 brillo。
- 傷口一律畫上**黃色虛線粉筆圈**（補胎師傅找到洞會用粉筆圈起來）：小釘、大螺絲、胎面割傷、胎側鼓包、胎側割傷、磨平各有固定畫法。
- 不畫人臉、不畫寫實照片感、不用品牌商標；吉祥物若要畫，也照同一套平塗＋黑輪廓＋brillo。

## 9. Logo 與 Favicon

- Logo：黃方底上一顆輪胎，紅色中心刷白外圈，中間塊狀「LC」——白字面＋右下 6px 黑影（就是三層字的縮小版），左上一道 brillo。只用矩形與圓。
- Favicon：同結構簡化為黃底、黑胎、紅心、一道 brillo，inline SVG data URI。

## 10. Do & Don't

**Do**：一頁一面牆色；字撐滿板；三層字的順序（影在最下、外框在中、字面在上）；電話寫大；角落簽名；價格直接畫上去。
**Don't**：漸層字、霓虹發光、模糊陰影、圓角卡片牆、玻璃擬態；把中文長段落直接放在飽和牆色上；用 emoji 當圖示；Lorem ipsum；置中大標＋三張卡片；仿冒真實品牌商標（可樂瓶、輪胎品牌）——rótulo 常畫品牌，但範例站一律畫無標商品。

## 11. 頁面骨架範例

```html
<body class="w-amarillo">
<div class="cenefa" aria-hidden="true"></div>
<header class="top"><a class="marca" href="index.html">…</a>
 <nav><ul class="manitas"><li><a class="mano" href="index.html" aria-current="page"><svg><use href="#mano"/></svg><b>LA BARDA</b></a></li>…</ul></nav></header>
<main><section class="barda wrap">
 <h1 class="rt paint"><span class="l" style="--n:13;--tf:300ms;--ts:1330ms;--to:1995ms;--tb:2660ms">
  <span class="vh">VULCANIZADORA</span>
  <span class="ly s" aria-hidden="true"><i style="--i:0">V</i>…</span>
  <span class="ly o" aria-hidden="true"><i style="--i:0">V</i>…</span>
  <span class="ly f" aria-hidden="true"><i style="--i:0">V</i>…</span></span></h1>
 <p class="script">Los Cuates</p>
 <aside class="tabla">…</aside>
</section></main>
<div class="zocalo"><div class="tope"></div><div class="rodando">…</div></div>
<footer>…</footer></body>
```

## 12. 技術實作與相容性

### 12.1 多層字＋`paint-order` 與 `-webkit-text-stroke`（C 版面與樣式層）
- 承載特徵②與 signature：三層 `grid-area:1/1` 疊合，每層字逐字 `<i>`，各自以 `clip-path: inset()` 動畫上漆。小字以 `paint-order: stroke fill` 讓外框只往外長。
- 支援：caniuse〈CSS property: paint-order〉——Chrome 123 起完整支援（35–122 為部分支援：HTML 文字不吃 `-webkit-text-stroke` 的 paint-order），MDN 標 Baseline 2024；Firefox、Safari 早已支援。`-webkit-text-stroke` 三大引擎皆支援。
- Fallback：舊 Chromium 的 paint-order 失效時外框會壓進字面一半——字仍可讀，只是字面變瘦；三層版不依賴 paint-order，不受影響。無 JS：三層靜態完整顯示。

### 12.2 container query units `cqi` 撐滿板寬（C 版面與樣式層）
- 承載特徵③：`.rt{container-type:inline-size}`，字級＝`100cqi / 字數 × 1.42 × --k`；字型到齊後量一次實寬只修正 `--k`，之後縮放視窗完全交給 cqi，不再跑 JS。
- 支援：caniuse／web.dev〈Container queries land in stable browsers〉——Chrome／Edge 105、Firefox 110、Safari 16。不支援時 cqi 依規格退回 small viewport 單位，字會偏大但 `white-space:nowrap` 下仍在同一行；外層 `overflow-x:hidden` 防破版。

### 12.3 `offset-path: path()`（B 動效與時間軸層）
- 承載 ambient（輪胎沿 zócalo 滾過 TOPE 減速丘，路徑依容器寬度生成）與遊戲 input 回饋（答對時那條胎沿二次貝茲曲線滾進你選的那一行，WAAPI 補間 `offsetDistance`）。
- 支援：MDN `path()` Baseline Widely available；caniuse〈path() in offset-path〉Chrome 56、Firefox 72、Safari 16。不支援時輪胎停在左上角不動（zócalo 仍完整），遊戲直接換下一條胎，計分不受影響。

### 12.4 效能實測（建置環境 node／jsdom）
- 頁面大小：index 158KB、precios 176KB、taller 170KB、llegar 146KB（皆含 105KB motion-library 子集），上限 350KB。
- 站內腳本無長迴圈；簽名約 80 個 `<i>` 的 clip-path 動畫，合成層處理；同時運轉的 canvas 元件 ≤2。
- 遊戲邏輯 jsdom 冒煙：開店→點選→計時結束→出單→`?n=` 還原，皆無錯誤。

### 12.5 查證來源
- MDN paint-order：https://developer.mozilla.org/docs/Web/CSS/paint-order ；caniuse：https://caniuse.com/mdn-css_properties_paint-order
- caniuse 容器查詢單位：https://caniuse.com/mdn-css_types_length_container_query_length_units ；web.dev：https://web.dev/blog/cq-stable
- caniuse offset-path path()：https://caniuse.com/mdn-css_types_basic-shape_path_offset-path
- 風格背景：Wikipedia〈Rotulo〉；Hyperallergic〈The Unforgivable Whitewashing of Mexico City's Food Stalls〉；Letterform Archive〈Mexican Rótulos: An Endangered Species?〉；PRINT〈Mexico's Hand-Painted Signs…〉；Bungee：https://djr.com/bungee
