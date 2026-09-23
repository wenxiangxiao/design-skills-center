---
name: taiwan-road-sign-system
description: The Taiwanese highway sign system as a web style — green guide panels with an inset white border, Chinese over English at half height, route shields whose shape encodes road class (plum blossom, shield, square, rectangle), fat arrows with integer kilometres, signs hung on gantries and striped posts, and retroreflective sheeting that only fully reads under a headlamp.
---

# 台灣公路標誌系統 Taiwan Road Sign System — 柏油與反光膜

## 設計哲學

這個風格的作者不是設計師，是一部法規：交通部《道路交通標誌標線號誌設置規則》（民國 57 年訂定，歷次修正，現行 273 條）。它規定顏色代表什麼（第 11 條）、形狀代表什麼（第 12 條）、中英文怎麼疊（第 15 條）、一根桿子能掛幾面（第 18 條）、路線編號長什麼樣（第 88–90 條）。它長成這樣，是因為讀者以時速六十公里經過、只有兩三秒、而且常常是半夜。

所以本風格的三條原則：

1. **顏色是分類，不是氣氛。** 綠＝行車指示，藍＝省道與服務設施，棕＝觀光文化，白底紅邊＝警告與禁制，白底黑邊＝縣鄉道。一個顏色放錯地方，等於說錯一句話。
2. **所有尺寸從一個字高 H 推出來。** 英文大寫是 H/2、小寫是 3H/8，框線、內縮、圓角、行距、箭頭都是 H 的倍數。版面不是排出來的，是算出來的。
3. **牌是掛出來的，而且是給車燈照的。** 每一面牌都有支撐物（門架、牌桿），而且它的亮度來自反光膜把光送回光源——所以本風格天生有「夜」這一半。

聖安宮香路牌（demo）把這套語言交給一間廟的文創部：徒步進香的人半夜走在台 1 線路肩，駕駛只認得這套字。

## 本風格的 5 個不可省略特徵

拿掉任何一項，就不是台灣公路標誌了。

### 1　顏色＝道路與訊息的等級（規則第 11 條）

綠底白字白框是指示；省道盾是藍、快速公路盾是紅；觀光文化是棕；警告是白底紅邊正三角、禁制是白底紅邊圓形；縣道方牌、鄉道長方牌是白底黑邊。**不准用顏色做裝飾，也不准自創第六種底色。**

```css
:root{
  --grn:#00704A;  /* 綠：地名、路線、方向、里程（色樣第 6 號的螢幕近似） */
  --blu:#1D4F9E;  /* 藍：省道盾、遵行、服務設施（色樣第 47 號近似） */
  --red:#D2232A;  /* 紅：警告與禁制邊框、快速公路盾（色樣第 25 號近似） */
  --brn:#6B3B22;  /* 棕：觀光、文化、自行車路線（色樣第 51 號近似） */
  --wht:#F5F7F3;  /* 反光白：字、框、底 */
  --blk:#121413;  /* 黑：圖案與縣鄉道字 */
}
.face        {background:var(--grn);color:var(--wht)}
.face.blue   {background:var(--blu)}
.face.brown  {background:var(--brn)}
.face.white  {background:var(--wht);color:var(--blk)}
```

### 2　牌面：圓角矩形＋內縮白色邊線，中上英下，英文大寫＝中文字高的一半（第 15 條）

```css
.sign{container-type:inline-size}           /* 牌面寬度就是尺規 */
.face{
  --H:calc(var(--k,9) * .62vw + 4px);        /* 不支援 cq 單位時的備援 */
  position:relative;border-radius:calc(var(--H)*.5);
  padding:calc(var(--H)*.62) calc(var(--H)*.7);
}
@supports (width:1cqi){ .face{--H:calc(var(--k,9) * 1cqi)} }
.face::before{                               /* 白色邊線：內縮 0.16H、線寬 0.085H */
  content:"";position:absolute;inset:calc(var(--H)*.16);
  border:calc(var(--H)*.085) solid currentColor;border-radius:calc(var(--H)*.36);
}
.zh{font:900 var(--H)/1.12 "Noto Sans TC",sans-serif;letter-spacing:.06em}
.en{font:700 calc(var(--H)*.5/.7)/1.05 "Overpass",sans-serif}  /* 大寫高 = H/2（Overpass 大寫高約 0.7em） */
```

### 3　路線編號盾徽：形狀就是等級（第 88–90 條）

國道＝**梅花形**白底綠邊黑字；省道＝**盾形**藍底、單藍雙白框、上「台」下數字（快速公路紅底）；市縣道＝**正方形**白底黑邊；區鄉道＝**長方形**白底黑邊、字＋數。共線時等級高者在前、同等級編號小者在前（第 90-1 條）。地名旁邊只要有路，就要有盾。

```html
<!-- 省道盾：同一條 path 描三次＝藍底、白框、藍細框 -->
<svg viewBox="0 0 100 100" role="img" aria-label="省道台1線">
  <path id="s" d="M50 4C62 12 78 13 92 10C94 42 88 74 50 96C12 74 6 42 8 10C22 13 38 12 50 4Z" fill="#1D4F9E"/>
  <use href="#s" fill="none" stroke="#F5F7F3" stroke-width="5" transform="translate(50 50) scale(.86) translate(-50 -50)"/>
  <use href="#s" fill="none" stroke="#1D4F9E" stroke-width="2" transform="translate(50 50) scale(.79) translate(-50 -50)"/>
  <text x="50" y="38" text-anchor="middle" font-weight="900" font-size="19" fill="#F5F7F3">台</text>
  <text x="50" y="74" text-anchor="middle" font-family="Overpass" font-weight="800" font-size="40" fill="#F5F7F3">1</text>
</svg>
<!-- 國道梅花：五個外圓（綠）＋五個內圓（白）疊出綠邊 -->
```

### 4　粗箭頭＋整數公里，地名最多三個（第 96–98 條）

箭頭是實心的三角頭＋等寬箭身；地名方向牌依「直行、左轉、右轉」由上而下排；地名里程牌依近遠由上而下，**公里只寫整數、不寫「公里」兩字**、靠右對齊。

```html
<div class="dest">
  <svg class="arw" viewBox="0 0 60 60"><path d="M30 4 52 28H38v28H22V28H8z" fill="currentColor"/></svg>
  <span><span class="zh">鹿港</span><i class="en">Lukang</i></span>
  <span class="km">93</span>
</div>
<style>
.dest{display:grid;grid-template-columns:auto 1fr auto;align-items:center;column-gap:calc(var(--H)*.55)}
.km{font:800 calc(var(--H)*1.08)/1 "Overpass";font-variant-numeric:tabular-nums}
.arw{width:calc(var(--H)*1.5);height:calc(var(--H)*1.5)}
</style>
```

### 5　牌是掛出來的：門架、黑白相間支柱，以及反光膜（第 17–20 條）

每一面牌都有支撐：懸掛式用鍍鋅鋼門架（桁架斜撐看得見），豎立式用黑白相間 20 cm 條紋的支柱（最高到 180 cm）。夜間牌面亮是因為反光膜，不是因為它發光。

```css
.post{width:14px;background:repeating-linear-gradient(180deg,#F5F7F3 0 20px,#121413 20px 40px)}
.truss{height:22px;border-block:4px solid #9AA09B;background:
  repeating-linear-gradient(55deg,transparent 0 10px,#9AA09B 10px 13px,transparent 13px 24px),
  repeating-linear-gradient(-55deg,transparent 0 10px,#9AA09B 10px 13px,transparent 13px 24px)}
/* 逆反射：兩層黑，反光物件夾在中間 */
.dark-a{mask-image:radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0 30%,#000 100%)}          /* 柏油 */
.dark-b{mask-image:radial-gradient(circle calc(var(--r)*2.6) at var(--x) var(--y),transparent 0 58%,#000 100%)}/* 反光物件 */
```

## 色彩系統

| 色 | hex（螢幕近似） | 用途 | 比例 |
|---|---|---|---|
| 柏油 | `#1C1F1E`／`#262A28` | 全站地色；一律是路面，不是「暗色主題」 | 約 45% |
| 標誌綠 | `#00704A`（非現用 `#005A3B`） | 指示牌底、按鈕 | 約 25% |
| 反光白 | `#F5F7F3` | 字、框、標線、支柱白段 | 約 14% |
| 鍍鋅灰 | `#9AA09B` | 門架、桁架、牌桿上段 | 約 5% |
| 省道藍 | `#1D4F9E` | 省道盾、服務設施牌 | ≤4% |
| 警告紅 | `#D2232A` | 三角與圓形邊框、快速公路盾 | ≤3% |
| 標線黃 | `#F3B400` | 現用車道底線、焦點框、香旗、表頭 | ≤3% |
| 觀光棕 | `#6B3B22` | 觀光文化與駐駕站 | ≤2% |

規則原文以「臺灣區塗料油漆工業同業公會中華民國七十六年審定之劃一編號」指定色樣（綠第 6、藍第 47、紅第 25、棕第 51、黃第 18 號），反光材料色依 CNS 4345；上表 hex 是螢幕近似值，不是官方換算。**零漸層填色**（唯一的漸層是光：頭燈光圈與過車光帶）、零模糊陰影、零紫藍。

## 字體系統

- 中文：**Noto Sans TC 900**（近似路牌常見的金梅粗黑；字距 +0.06em）。正式案可改用 justfont「臺灣道路體」。
- 英文與數字：**Overpass 700／800**（Red Hat 以 FHWA Highway Gothic 為本的開源字）；數字一律 `tabular-nums`。
- 字級不是 scale，是 H 的倍數：中文 1H、英文 H/2 大寫高（`font-size: calc(H*.5/.7)`）、公里 1.08H、次要中文 0.62H、次要英文 0.31H 大寫高。
- 內文（牌以外的說明文字）用 Noto Sans TC 500、16px／1.75，顏色 `#DCE0DB`。

## 版面與網格

- 每一面牌是一個 `container-type:inline-size`；牌內所有長度 = `--k × 1cqi`，`--k` 是「字高佔牌寬的百分比」。改牌寬，整面牌等比縮放，比例永遠合規。
- 首頁首屏是門架：三面牌並排懸掛，寬度比 1.25 : 1 : 0.9，下緣不對齊（牌高由內容決定）。
- 牌桿版面：一根桿子最多三面，由上而下「禁制→警告→指示」（第 18 條），商品頁就是這樣排的。
- 路線頁：中央一條柏油（中線虛線 46/74px），站牌左右交錯插在路肩；≤560px 時路縮到左側 44px、牌全部在右。
- 零旋轉角度（牌面與行車方向成九十度，第 16 條）；留白＝路面。

## 元件配方

- **導覽＝車道指示門架（指 29）**：四面綠牌掛在鍍鋅桁架下；現用頁那一面是「你所在的車道」——向下箭頭、黃色、底下一道黃線；其餘三面是出口：斜上箭頭、較暗的綠 `#005A3B`、白框 70%。hover 上抬 2px（90ms linear）。
- **按鈕**：綠底＋內縮白框（`box-shadow: inset 0 0 0 2px var(--grn), inset 0 0 0 4px var(--wht)`），圓角 8px；次要按鈕灰底灰框；按下（aria-pressed）變標線黃。
- **卡片＝牌**：沒有卡片，只有牌。一件商品＝一面牌，價格寫在公里的位置。
- **表格＝告示牌**：綠底大框，表頭英文大寫標線黃，列線 2px 半透明白。
- **表單**：本站無表單；若需要，輸入框是白底黑邊的縣道方牌樣式。
- **Footer**：一根黑白支柱＋一面綠色告示牌（地址、電話、時間中英並列）。

## 動效規則

| 類型 | 做法 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient 過車光 | 門架牌面上一道 100° 的淡白光帶掃過（背景位移） | 常駐 | 9s linear infinite，前 62% 靜止 | 關閉，牌面不變 |
| ambient 燈籠 | 夜間場景神轎燈籠上下 3px | 常駐 | 1.6s ease-in-out | 關閉 |
| input 反光閃點 | `.rr` 牌面上 radial 光點跟著游標（mix-blend screen） | pointermove | 即時 | 保留（非動畫） |
| input 頭燈 | `--x/--y` 以 rAF 更新兩層遮罩 | pointermove | 1 frame | 保留；另有「遠燈」全亮 |
| transition 過門架 | 換頁時綠色桁架幕由上往下蓋、新頁由上往下掀（clip-path） | 點內部連結 | 260ms 進／420ms 出 | 直接換頁 |
| transition 路口 | 牌往右上放大飛過頭頂（2.4×），下一面從遠方 0.3× 開過來 | 選方向 | 420ms＋520ms（WAAPI） | 直接換牌 |
| scroll 從門架底下開過 | 門架 scale 1→3.1、上移 120vh；路面虛線隨捲動前進 | view-timeline | contain 0–100% | 靜態門架 |
| scroll 站牌由遠而近 | rotateX 18°、scale .56 → 1 | view() | entry 0% – cover 42% | 靜態 |
| **signature 逆反射閱讀** | 見特徵 5：兩層黑夾反光層，光圈中心落在牌上時 brightness 1.22 | 頭燈 | 80ms | 保留 |

本風格禁用：淡入當主角、彈跳、旋轉、數字計數滾動。

## 插畫與圖像風格

**法規牌面構成（regulation-panel）**：全站零照片、零外部圖片——所有圖像都是依法規形狀畫的牌：梅花、盾、方、長方、正三角、圓、箭頭形；圖案一律實心剪影（黑或白），線條只出現在框與斜槓。警告三角的自創圖案（當心香客、前有神轎、注意夜間、注意鞭炮）照規則的語法畫：人形是圓頭＋實心多邊形身體，沒有表情、沒有細節。場景（路口、門架、路面）只用平塗色塊與標線。

## Logo 與 Favicon 設計指南

Logo 是一面縮小的綠底指示牌：圓角矩形＋內縮白框，裡面一支「直行後右轉」的白色粗箭頭，箭頭右上一面黃色三角香旗；右下兩條白色短橫代表牌上的字（logo 不放字，避免字型依賴）。Favicon 同構，64×64 inline SVG data URI。不要把神明或宮廟圖像放進 logo。

## Do & Don't

- Do：每一個尺寸都從 H 算；每一個地名旁放對的盾；公里寫整數；牌一定掛在東西上。
- Do：夜間畫面讓反光物件比路面亮——那是物理，不是特效。
- Don't：自己發明底色、把紅色當強調色、英文和中文一樣大、一面牌放四個地名、箭頭用細線畫。
- Don't：紫藍漸層、置中三卡片、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、做舊刮痕、霓虹發光。
- Don't：把本風格做成「高速公路主題」的玩笑——它是一套為了救命而極度克制的語言。

## 頁面骨架範例

```html
<header class="gnav">
  <a class="brand" href="index.html">…logo…</a>
  <ul class="lanes">
    <li class="lane"><a class="face here" href="index.html" aria-current="page">
      <svg class="arw">↓</svg><span><b class="zh">首頁</b><i class="en">Home</i></span></a></li>
    <li class="lane"><a class="face" href="route.html">
      <svg class="arw">↗</svg><span><b class="zh">路線</b><i class="en">Route</i></span></a></li>
  </ul>
  <div class="truss"></div>
</header>
<main>
  <div class="sign"><div class="face">
    <div class="dest"><svg class="arw">…</svg><span><span class="zh">苑裡</span><i class="en">Yuanli</i></span><span class="km">3</span></div>
    <div class="dest"><svg class="arw">…</svg><span><span class="zh">大甲</span><i class="en">Dajia</i></span><span class="km">13</span></div>
  </div></div>
</main>
<footer class="foot"><div class="post"></div><div class="sign"><div class="face">地址／電話</div></div></footer>
```

## 技術實作與相容性

### 1. Container query units（C 版面與樣式層）——承載特徵 2

牌寬即尺規：每一面牌 `container-type:inline-size`，牌內 `--H: calc(var(--k) * 1cqi)`，字、框、圓角、箭頭、盾全部是 H 的倍數，所以任何寬度下「英文大寫＝中文字高一半」都成立。
- 支援：Chrome/Edge 105+、Safari 16+、Firefox 110+，全球 94.87%（caniuse〈CSS Container Query Units〉，2026-09 查證：https://caniuse.com/css-container-query-units）。
- 注意：cq 單位解析的是**祖先**容器，所以結構必須是 `.sign`（容器）＞`.face`（用單位）。
- Fallback：`@supports (width:1cqi)` 之外的瀏覽器用 `calc(k × .62vw + 4px)`，比例仍對，只是跟視窗而不是牌寬走。

### 2. CSS scroll-driven animations（B 動效與時間軸層）——承載特徵 5 的門架與路線頁

首頁 `.approach{view-timeline:--appr block}`，門架與路面以 `animation-timeline:--appr; animation-range:contain 0% contain 100%` 綁在捲動上＝從門架底下開過去；路線頁每面站牌 `animation-timeline:view(); animation-range:entry 0% cover 42%` 由遠而近。`animation` 簡寫必須寫在 `animation-timeline` 之前（簡寫會重設 timeline）。
- 支援：Chrome/Edge 115+、Safari 26+、Firefox 159 起預設開啟（先前在 flag 後）；`view()` 全球 87.22%（caniuse〈animation-timeline: view()〉，2026-09 查證：https://caniuse.com/mdn-css_properties_animation-timeline_view）。
- Fallback：整段包在 `@supports (animation-timeline: view())`；不支援時 `.approach` 高度改 auto、門架靜止、站牌直接在位——資訊零損失。≤560px 也關閉（手機首屏內容高，sticky 會裁切）。

### 3. CSS mask-image 雙層徑向遮罩（A 渲染層）——承載 signature「逆反射閱讀」

夜間場景層序：路面 → `.dark-a`（光圈 r）→ 反光物件（路牌、香旗、導標）→ `.dark-b`（光圈 2.6r、不透明度 .93）。路面亮度 = (1−A)(1−B)、反光物件亮度 = (1−B)，於是在 r～1.5r 之間牌讀得到、柏油全黑。游標以單一 rAF 寫 `--x/--y`；光圈中心距牌面 < 0.5r 時加 `.hot`（brightness 1.22）。
- 支援：無前綴 `mask-image` Chrome/Edge 120+、Firefox 53+、Safari 15.4+（caniuse〈CSS Masks〉，https://caniuse.com/css-masks）；本站同時寫 `-webkit-mask-image`。
- Fallback：不支援遮罩時兩層黑直接蓋滿（牌看不見）——所以本站一律提供「遠燈」鍵（H）把 `--r` 設成 1400px，且 `<details>` 內有四個路口全部牌面的靜態表；無 JavaScript 時同表可讀。

### 效能預算（建置時量測）

| 頁 | 檔案（含 inline CSS/JS/SVG） | inline JS |
|---|---|---|
| index.html | 約 29.6 KB | 1.4 KB |
| route.html | 約 36.5 KB | 1.8 KB |
| shop.html | 約 23.4 KB | 1.4 KB |
| night.html | 約 55.0 KB | 26.1 KB（其中約 22 KB 是預先算好的牌面 SVG 字串） |

全部遠低於 350 KB。首屏 JS 只註冊事件監聽與一個 ResizeObserver，無迴圈計算；頭燈每次 pointermove 最多一次 rAF、只量兩個元素的 rect；所有持續動畫只動 `transform`／`background-position`／`clip-path`，不觸發 layout。外部資源僅 Google Fonts。
