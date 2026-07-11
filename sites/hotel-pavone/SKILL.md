---
name: art-deco-gilded
description: A 1920s–30s Art Deco style — gilded linework, emerald and gold, peacock-eye motifs, stepped geometry, symmetric-yet-asymmetric editorial layouts.
---

# 鎏金裝飾藝術 · Art Deco Gilded

> 這是一份風格規格書。任何 AI 讀完本檔，即可為**任意產業**重現這套視覺語言，不需看過原始 Demo（孔雀閣 Hôtel Pavone 只是其中一次套用）。風格與內容分離：以下規範定義「怎麼看」，不綁定「賣什麼」。

---

## 一、設計哲學

裝飾藝術（Art Deco，1920s–1930s）是機械時代的貴族美學：它相信奢華可以被幾何化，相信直線、扇形與階梯能承載華麗。這套風格的三個支柱：

1. **鎏金線條勝過填色。** 華麗來自細膩的金色描邊、放射與框飾，而非大面積漸層或陰影。畫面主要是「深色底 × 金色線」。
2. **對稱是骨，非對稱是肉。** 母題（羽扇、扇形、太陽放射）本身高度對稱；但整體版面刻意偏移——巨型標題齊左、主圖偏一側、留白不平均。對稱的元件放進不對稱的網格，才不落入「置中三卡片」的 AI 模板。
3. **一個重複到底的母題。** 全站選定**一個**幾何母題（本範例為孔雀羽眼 peacock-eye），讓它出現在 Logo、favicon、插畫、分隔、hover 態。母題就是品牌記憶點。

情緒關鍵字：鎏金、爵士年代、劇院簾幕、遠洋郵輪、被打磨過的舊。避免「未來感／科技感／可愛」。

---

## 二、色彩系統

深色為主場，金色為主角，紙金為亮面。比例約 **深色 60% ／ 紙底 25% ／ 金色 12% ／ 次強調 3%**。

| 色票 | Hex | 角色 | 用途與比例 |
|------|-----|------|------------|
| 孔雀墨綠 | `#0C3A34` | 主深色 | hero、餐飲深欄、footer、深色插畫底（≈45%） |
| 深墨綠 | `#082A26` | 深色加深 | hover 加深、資訊列、插畫陰影（≈10%） |
| 鎏金 | `#C6A15B` | 主強調 | 所有線條、框、標籤、按鈕、母題（≈12%） |
| 亮金 | `#E4CD97` | 金色亮面 | hover 金、羽眼高光、小字強調（≈3%） |
| 米金紙 | `#F3E9D2` | 亮底 | 內容頁背景、淺色卡（≈22%） |
| 米金加深 | `#EADFC4` | 分界 | 輸入框底、細分隔（≈3%） |
| 近黑 | `#14110D` | 內文 | 淺底上的內文字色 |
| 孔雀藍 | `#1C6E7A` | 次強調 | 羽眼中心、插畫點綴、極少量文字（≤3%，切忌濫用） |

規則：**金色永遠不做大面積填色**，只做線、框、細分隔與小面積按鈕。深綠與金的對比就是整套奢華感的來源；孔雀藍只在羽眼與插畫細節出現，一頁不超過三處。換產業時可整體換色相（如酒紅＋金、午夜藍＋金、瓷黑＋玫瑰金），但務必維持「深底＋金線＋一個次強調」的三層結構與比例。

---

## 三、字體系統

四款 Google Fonts，各司其職。中英分工是本風格的關鍵字感。

```
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Marcellus&family=Marcellus+SC&family=Noto+Serif+TC:wght@400;600;900&display=swap');
```

- **Noto Serif TC（900 / 600 / 400）** — 中文標題與品牌名。900 用於大標，字距 `letter-spacing:.06em–.14em`。中文明朝的骨架呼應裝飾藝術的垂直感。
- **Poiret One（400）** — 拉丁文裝飾字，用於品牌副名、章節編號、法文標語。極幾何、細筆畫，是最「Deco」的一款。字距放大 `.28em–.44em`、`text-transform:uppercase`。**只用於短字串**（品牌名、標語），不用於內文。
- **Cormorant Garamond（400/500/600，含 italic）** — 內文與導言。高對比襯線，優雅。內文字級 18–21px、行高 1.6–1.7。斜體用於署名與菜單原文。
- **Marcellus / Marcellus SC** — 導覽、標籤、eyebrow、規格 key。羅馬碑刻風，字距 `.16em–.42em`、大寫。SC（小型大寫）用於更正式的標籤。

字級 scale（桌機）：大標 `clamp(42px,8vw,132px)` / 區塊標 `clamp(24px,4vw,38px)` / 副名 20–34px / 內文 18–21px / 標籤 11–13px。行高：標題 .9–1，內文 1.6–1.75。

**禁止**：無個性的系統字堆疊、無襯線 body、字距為 0 的大寫標籤。

---

## 四、版面與網格

- **容器**：`max-width:1280px`，左右 `padding:0 32px`。
- **不對稱雙欄**：hero 用 `1.05fr .95fr`，內容區用 `.42fr .58fr` 之類的非等分。刻意讓兩欄不等寬、主圖偏一側。
- **編號索引**：清單型內容（客房、菜單、章節）一律加大型 Deco 編號（`01`/`Ⅰ`/`✦`），編號用 Poiret One 或羅馬數字，是版面的節奏標記。
- **邊框哲學**：用 `1px solid 金色` 畫格線與框，**無圓角、無模糊陰影**。相鄰欄以 `border-left:1px solid gold` 分界，形成類似展櫃的分格。
- **裝飾邊角**：卡片／表單可加「缺角描邊」——用 `::before/::after` 在對角畫 L 形金線，模擬裝飾藝術框角。
- **頂部緞帶**：頁面最上緣一條 `repeating-linear-gradient(135deg,...)` 的金色人字紋（chevron ribbon），是全站的統一簽名。
- **留白規則**：section 垂直 padding 64–82px。深色與淺色 section 交替出現，形成節奏。標題與內容之間留 14–26px。
- **旋轉角度**：僅用於側邊直排標籤（`writing-mode:vertical-rl` 或 `rotate(90deg)`），角度限 90°，不做隨機小角度傾斜（那是別種風格）。

---

## 五、元件配方

**導覽列 nav**
```
深綠底 + 底部 1px 金色半透明線；sticky。
brand：幾何母題 SVG（40px）+ 中文品牌名(Noto Serif TC 900,.14em) + 拉丁副名(Poiret One,.34em,uppercase,亮金)。
連結：Marcellus,.18em,uppercase,米白；hover 時底部金線由左 scaleX(0→1)（transition .4s）。
current 頁：文字轉亮金 + 金線常駐。
手機：≤860px 收成「選單」按鈕（金色外框），展開為直列。
```

**按鈕**
```
主按鈕：金底(#C6A15B) + 深綠字 + Marcellus .24em uppercase + padding:15px 30px，無圓角；hover 轉亮金(#E4CD97)。箭頭 &#8594; 於 hover 位移 6px。
文字連結：金色 + 底部 1px 金線，hover 轉亮金。
切忌：圓角膠囊按鈕、雙按鈕並置的 CTA。
```

**卡片 / 展盤**
```
不用圓角陰影卡。改用「金線分格」：一個 border:1px solid gold 的容器，內部以 border-left/​border-top 再分欄。
深色展盤放插畫，淺色展盤放文字，兩者以金線相接。
hover：背景加深(至 #082A26)，或母題 SVG 由 scale(.6) rotate(-30deg) 淡入至原位（opacity .22）。
```

**表單**
```
輸入框：米金底 + 三邊淡框 + 底部 1.5px 金線；focus 時底線轉深綠、底色轉白。
label：Marcellus 11.5px .16em uppercase 深綠。
送出後以 JS 顯示「確認卡」（深綠底金框），不刷新頁面；含 aria-live。
錯誤訊息：Cormorant italic，暗紅 #a6432f。
```

**資訊列（取代跑馬燈）**
```
深綠底，等分 grid（3–4 格），格間 1px 金線分隔；每格 key(Marcellus 金) + value(Cormorant 米白)。
靜態、不捲動——重點資訊靠排版承載，而非 marquee。
```

**footer**
```
深綠底 + 頂部 6px 實金條。三欄：品牌區（母題+雙語名+簡介）／導覽或聯絡／季刊訂閱表單。
最底一行 base：版權 + 「所有品牌、人名、價格、地址、電話皆為虛構示意」。
```

---

## 六、動效規則

動效克制、優雅、慢。緩速偏 `cubic-bezier(.2,.8,.25,1)`（ease-out）或 `ease`。

| 動效 | 觸發 | duration | easing | 說明 |
|------|------|----------|--------|------|
| 母題展開（簽名） | 載入 | 1s，逐片 stagger 0.07s | `cubic-bezier(.2,.8,.25,1)` | 羽扇／扇形由收攏 `rotate(0)` 逐片旋轉到最終角度。這是全站唯一的「大」動效，每站限一處。 |
| 金框描繪 | 進場（IntersectionObserver, threshold .3） | 1.4s | `ease` | `stroke-dasharray/dashoffset` 由滿到 0，金框沿邊繪出。 |
| nav 底線 | hover | .4s | `ease` | `transform:scaleX(0→1)`，`transform-origin:left`。 |
| 卡片母題浮現 | hover | .4–.5s | `ease` | 母題 SVG opacity + scale/rotate 淡入。 |
| 按鈕箭頭 | hover | .35s | `ease` | `translateX(6px)`。 |

**SVG rotate 注意**：以 CSS 旋轉 SVG 內元素時，設 `transform-box:view-box; transform-origin:0 0`（或設在母題的基準點），確保繞正確樞紐旋轉。

**降級**：務必加
```css
@media(prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
  html{scroll-behavior:auto}
  /* 描繪類直接顯示最終態：stroke-dashoffset:0 */
}
```
JS 端以 `matchMedia('(prefers-reduced-motion:reduce)')` 判斷，reduce 時母題直接以最終角度渲染、IntersectionObserver 直接加上 `in` class。

---

## 七、插畫與圖像風格

- **全部 inline SVG，零點陣圖。** 線條為主：`fill:none; stroke:金色; stroke-width:1.4–2.4`，偶爾以 `#082A26` 深綠填羽眼底、`#1C6E7A` 填中心。
- **核心母題**：孔雀羽眼＝外橢圓(金框)＋中橢圓(孔雀藍)＋核心(亮金)。可單獨用、可放射成扇。換產業時可換母題（太陽放射、貝殼扇、閃電鋸齒、麥穗、鑽石格），但保持「對稱＋金線＋可放射」三特性。
- **構成語彙**：扇形放射、人字紋（chevron）、階梯（ziggurat）、太陽放射線、對角三角、同心橢圓。
- **場景插畫**：以幾何線描表現具象物（木格窗、拱窗、屏風、屋瓦、雞尾酒杯、街廓地圖），維持 2px 以內線寬、對稱或對角構圖，不加漸層與寫實陰影。
- **背景放射**：hero 可疊一層極淡（opacity .12–.16）的金色放射線 `sunburst`，用 JS 迴圈生成從中心發散的細線。

---

## 八、Logo 與 Favicon 設計指南

**Logo（`assets/logo.svg`）**
- 結構：一個**階梯拱框**（stepped arch，Deco 建築山牆）內含母題。孔雀閣為「拱框＋三片羽扇＋羽眼」。
- 線寬 3（外框）／2.4（母題），純金色描邊，透明底，`viewBox="0 0 140 140"`。
- 用 `clipPath` 讓母題被拱框裁切，形成「窗中之景」。
- nav / footer 用簡化版（3 片羽 + 1 羽眼即可），保留辨識度又不吃效能。

**Favicon（inline SVG data URI，寫在 `<head>`）**
- 32×32，深綠底方框 + 1.4px 金色內框 + 簡化母題（3 條放射 + 頂端羽眼）。
- 以 URL-encoded SVG 寫入 `href="data:image/svg+xml,..."`，`#` 需編碼為 `%23`。
- 範例：
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230C3A34'/%3E%3Crect x='3' y='3' width='26' height='26' fill='none' stroke='%23C6A15B' stroke-width='1.4'/%3E%3Cellipse cx='16' cy='10' rx='3.2' ry='4.2' fill='none' stroke='%23C6A15B' stroke-width='1.5'/%3E%3C/svg%3E">
```

---

## 九、Do & Don't

**Do**
- 深底 × 金線 × 一個次強調色的三層結構。
- 選定單一幾何母題並讓它貫穿 Logo／favicon／插畫／hover。
- 不對稱網格 + 大型 Deco 編號 + 齊左巨標。
- 頂部人字紋緞帶、金線分格、缺角描邊框。
- 虛構但可信的文案：具體人名、地址、電話、營業時間、價格。
- 一個「別站沒有」的簽名動效（本站＝羽扇展開）。

**Don't（含去AI化禁令）**
- ✗ 紫藍漸層 hero、任何大面積漸層。
- ✗ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片的模板。
- ✗ emoji 當 icon（icon 一律自繪 SVG 線描）。
- ✗ 圓角 + 模糊陰影卡片。
- ✗ Lorem ipsum、AI 腔（「在當今快節奏的世界」）。
- ✗ 金色做大面積填色、孔雀藍濫用。
- ✗ 跑馬燈（本風格用靜態資訊列與對稱構成承載重點）。
- ✗ 隨機小角度傾斜（那是手繪雜誌風，不是 Deco）。

---

## 十、頁面骨架範例

可直接取用的最小骨架（深底 hero + 不對稱雙欄 + 金線分格）：

```html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>品牌名｜產業</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg.../%3E">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600&family=Marcellus&family=Noto+Serif+TC:wght@400;600;900&family=Poiret+One&display=swap" rel="stylesheet">
<style>
:root{--emerald:#0C3A34;--emerald-d:#082A26;--gold:#C6A15B;--gold-lite:#E4CD97;
  --cream:#F3E9D2;--peacock:#1C6E7A;--serif:'Cormorant Garamond',serif;
  --han:'Noto Serif TC',serif;--deco:'Poiret One',sans-serif;--label:'Marcellus',serif;}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--cream);color:#14110D;font-family:var(--han);line-height:1.75}
.wrap{max-width:1280px;margin:0 auto;padding:0 32px}
.ribbon{height:10px;background:repeating-linear-gradient(135deg,var(--gold) 0 2px,transparent 2px 12px),var(--emerald)}
.hero{background:var(--emerald);color:var(--cream);padding:64px 0}
.hero .grid{display:grid;grid-template-columns:1.05fr .95fr;gap:20px;align-items:center}
.hero h1{font-family:var(--han);font-weight:900;font-size:clamp(48px,10vw,120px);line-height:.9;letter-spacing:.04em}
.hero .fr{font-family:var(--deco);letter-spacing:.4em;text-transform:uppercase;color:var(--gold-lite);margin-top:16px}
.btn{display:inline-block;font-family:var(--label);letter-spacing:.24em;text-transform:uppercase;
  color:var(--emerald-d);background:var(--gold);padding:15px 30px;margin-top:24px}
.grid-frame{border:1px solid var(--gold)}
@media(max-width:860px){.hero .grid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<div class="ribbon"></div>
<!-- nav：深綠底 + brand(母題 + 中文900 + Poiret副名) + Marcellus 連結（略） -->
<section class="hero"><div class="wrap grid">
  <div>
    <p class="fr">EST. MCMXXXI</p>
    <h1>品牌名</h1>
    <p class="fr">Latin Subname</p>
    <a class="btn" href="#">進一步 &#8594;</a>
  </div>
  <div><!-- 母題 SVG：羽扇／扇形放射，載入時逐片旋轉展開 --></div>
</div></section>
<!-- 內容：不對稱雙欄 + 大型 Deco 編號 + 金線分格 -->
<!-- footer：深綠底 + 頂部 6px 金條 + 三欄 + 虛構聲明 -->
</body>
</html>
```

驗收：一個沒看過 Demo 的 AI，只讀本檔即應能做出深底金線、母題貫穿、不對稱編輯式版面、含一處簽名動效且具 reduced-motion 降級的全新裝飾藝術網站。
