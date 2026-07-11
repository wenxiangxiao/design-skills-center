---
name: risograph-print-style
description: Build retro Risograph-inspired websites with two-ink overprint layers, deliberate misregistration, paper grain, and print-shop ornaments.
---

# Risograph 印刷風格(risograph-print-style)

以孔版印刷(Risograph)的物理限制作為設計語言:少數幾色油墨、半透明疊色、永遠對不準的色版、紙的顆粒。範例實作見同目錄 `index.html` / `bouquets.html` / `atelier.html`(疊瓣花社 Petal Press)。

## 設計哲學

1. **限制即風格**:整站只有 2 塊色版(粉、藍)+ 少量特色黃。第三個顏色(紫)不准直接填色,必須由兩版 multiply 疊出——這條規則是整個風格的地基。
2. **錯位是誠實,不是瑕疵**:Riso 的魅力在色版永遠差兩三公釐。預設就讓藍版偏移 2–4px,不要「修正」它。
3. **網頁是一張打樣稿**:對位十字、裁切角、版號、油墨比例、工單語言(「上機」「停版」「打樣」)全部可以入版面,當作可讀的裝飾。
4. **紙感優先**:米白紙底 + 全頁噪點;避免純白 `#FFF` 與純黑 `#000`,黑改用深藍紫墨色。

## 色彩系統

| 用途 | 名稱 | Hex |
|---|---|---|
| 紙底 | 米白道林 | `#F7F1E3` |
| 亮紙(卡片/區塊) | | `#FCF8EC` |
| 色版 1 | Fluorescent Pink 21U | `#FF48B0` |
| 色版 2 | Medium Blue | `#3255A4` |
| 特色版(節制使用) | Yellow | `#FFE800` |
| 疊色(僅供參考) | Pink✕Blue multiply | `#321871` |
| 文字墨 | 深藍紫 | `#2E2A44` |

**疊色規則**:
- 疊色一律 `mix-blend-mode: multiply`,禁止直接使用 `#321871` 填色。
- 油墨濃度用 `opacity` 模擬網點階調:`.45 / .65 / .85 / 1` 四階。
- 黃版只做點綴(小圓點、標籤底、螢光筆畫線),面積不超過版面 5%。
- 禁止漸層,尤其紫藍漸層;Riso 的階調靠網點與透明度,不靠 gradient。

## 字體系統

- **Noto Serif TC**(400/600/700/900):中文標題與內文。標題用 900,帶鉛字味。
- **Space Grotesk**(400/500/700):編號、價格、工單標籤、英文副標。一律搭配大字距(`letter-spacing: .14em–.32em`)+ 大寫。
- 層級口訣:中文襯線負責「說話」,幾何無襯線負責「標記」。兩者不互換。

## 版面與網格

- 內容寬 `max-width: 1100px`,section 間距 72–96px。
- 邊框皆 `2px solid`(藍),分隔線用 `2px dashed`(模擬撕線/摺線)。
- **裁切角** `.crops`:容器四角以 border 畫 L 形記號,對角兩組藍、兩組粉,偏移 -8px 落在框外。
- **對位十字** `.reg`:圓 + 十字的 SVG(`viewBox 0 0 24 24`),放在章節標題旁與打樣框角落。
- **頂部印刷資訊條**:藍底米白字的工單列(`RISO PROOF NO.—INK—PAPER`),全站一致。
- 版號語言:每個 section 掛 `SEC. 01` 徽章;商品掛 `PP-01` 式編號。

## 元件配方

### 疊印標題 `.op`
```html
<h2 class="op" data-text="色版打樣室">色版打樣室</h2>
```
```css
.op{position:relative;display:inline-block;color:transparent}
.op::before,.op::after{content:attr(data-text);position:absolute;inset:0;mix-blend-mode:multiply}
.op::before{color:var(--pink);transform:translate(-2px,-2px)}
.op::after{color:var(--blue);transform:translate(2px,1px)}
```
本體透明佔位,粉/藍兩層偽元素錯位疊印。小字級用 `.op-s`(偏移縮為 1px)。

### 雙色插畫(分版 SVG)
```html
<svg viewBox="0 0 200 200">
  <g class="plate plate-pink" fill="currentColor"><!-- 花:粉版 --></g>
  <g class="plate plate-blue"><!-- 莖葉/陰影:藍版,預設 translate(3px,2.5px) --></g>
</svg>
```
```css
.plate{mix-blend-mode:multiply;transition:transform .35s,opacity .3s}
.plate-pink{color:var(--pink)}
.plate-blue{color:var(--blue);transform:translate(3px,2.5px)}
```

### 票券式卡片 `.ticket`
亮紙底 + 2px 藍框;圖區與文字區以 `2px dashed` 分隔,分隔線兩端放紙色圓形「打孔」(絕對定位圓,蓋在邊框上);左上角掛 `PP-XX` 版號;底部 meta 列放價格(Space Grotesk 700)與油墨比例(`PINK 70 / BLUE 30`)。hover 位移 -3px 並落 `6px 6px 0` 粉色實體陰影。

### 色版開關(招牌互動)
兩顆 `button.plate-btn[data-plate=pink|blue]`,點擊 toggle `body.pink-off` / `body.blue-off`:
```css
body.pink-off .plate-pink, body.pink-off .op::before{opacity:0}
body.blue-off .plate-blue, body.blue-off .op::after{opacity:0}
```
按鈕含色票方塊(chip)、版名、`ON・上機 / OFF・停版` 狀態字,並同步 `aria-pressed`。效果須作用於**全站**插畫與疊印標題,才有「整份打樣稿抽掉一版」的力道。

## 動效規則(錯位參數)

| 狀態 | 粉版 | 藍版 |
|---|---|---|
| 靜置 | `(0, 0)` | `(3px, 2.5px)` |
| 卡片 hover(套準失調) | `(-2px, -2px)` | `(6px, 5px)` |
| 疊印標題(大字) | `(-2px, -2px)` | `(2px, 1px)` |
| 疊印標題(小字 `.op-s`) | `(-1px, -1px)` | `(1px, 1px)` |

- 過渡:`transform .35s ease, opacity .3s ease`;色版開關的顯隱走 opacity,不走 display。
- 錯位只許平移,禁止旋轉與縮放(印刷機不會轉紙)。
- `prefers-reduced-motion: reduce`:全域關 transition/animation,hover 錯位固定回靜置值。
- 禁止 marquee、視差、自動輪播。

## 插畫與圖像風格(分版畫法)

- 一張圖固定拆兩版:**粉版畫「主體」**(花瓣、招牌、遮陽棚),**藍版畫「結構」**(莖葉、線稿、包裝、陰影)。
- 造型語彙:旋轉橢圓組成的花瓣、同心圓玫瑰、`<pattern>` 圓點網屏(6–10px 週期)模擬網點。
- 陰影用藍版粗筆畫弧線(`stroke-width 10–16, opacity .5`)壓在粉版上,疊出紫色暗面。
- 白色物件(白花、玻璃)不填色,只留藍色輪廓線——白就是紙。
- 噪點:全頁 `body::after` 鋪 `feTurbulence`(`baseFrequency .85`、alpha ≤ .06)的 data-URI 平鋪圖,`mix-blend-mode:multiply`。

## Logo 與 Favicon 指南

- **Logo**(`assets/logo.svg`):五瓣小花 + 中文字標,粉/藍兩版各一層、錯位 3px、multiply;花芯一點黃;四角配粉藍對位十字;下緣掛版號行 `PINK PLATE 01 / BLUE PLATE 02`。
- **Favicon**:inline SVG data URI,米白圓角底 + 藍花(右下)疊粉花(左上)+ 黃芯;兩層皆 `style='mix-blend-mode:multiply'`。64×64 viewBox 內錯位 6px,縮小後仍讀得出疊印。
- 單色場合(印章、刻版)取藍版即可成立;禁止把 logo 疊色處直接畫成紫。

## Do & Don't

**Do**
- 疊色永遠用 multiply 疊出來
- 藍版預設偏 2–4px,hover 才加大
- 工單語言入文案:上機、停版、打樣、對版
- 網點、裁切線、對位十字當裝飾系統
- 深藍紫代替黑;米白代替白

**Don't**
- 紫藍或任何漸層
- marquee 跑馬燈、自動輪播
- 置中三卡片的萬用模板構圖
- emoji 當 icon(用 SVG 對位記號、色票方塊)
- Lorem ipsum 與空泛的「AI 腔」文案
- 直接填 `#321871` 假裝疊色
- 錯位加旋轉(只許平移)

## 頁面骨架範例

```html
<body>
  <div class="presbar">RISO PROOF NO.—店名—INK—PAPER</div>
  <nav class="top"><!-- 疊印小花 logo + 疊印字標 + 3 連結 --></nav>

  <header class="pagehead / hero">
    <!-- kicker(對位十字+英文)→ 疊印 H1 → 引文(黃色螢光畫線)→ CTA -->
    <!-- 右欄:.sheet 打樣框(裁切角+對位十字+分版 SVG 主視覺) -->
  </header>

  <section><!-- .shead:SEC.編號徽章 + 疊印 H2 + 虛線 rule -->
    <!-- 內容:.ticket 票券卡 grid / .sched 工單表 / .plan 訂閱票 -->
  </section>

  <footer>
    <!-- 三欄:品牌+標語 / 店舖資訊 / 連結 -->
    <div class="colophon"><!-- © + 三色色票點 + 版號/紙張資訊 --></div>
  </footer>
  <script><!-- 色版開關 toggle --></script>
</body>
```
