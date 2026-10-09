---
name: futurist-parole-in-liberta
description: Italian Futurist "words-in-freedom" typography (Marinetti 1912–1914, Depero) — onomatopoeia as type weight, many typefaces and three inks per page, syntax destroyed into noun-noun pairs and math signs, words flung along diagonal force-lines with chronophotographic echoes, on flat coloured paper stock.
---

# 未來主義自由字 Parole in libertà — 風格規格書

> 範例站：嗶啵汽水廠 PI-POK（宜蘭羅東的彈珠汽水廠）。風格與產業分離：本規格可用於任何「有聲音、有速度、有機器」的品牌——印刷廠、鐵工所、賽車場、打擊樂教室、爆米花機、廣播電台。
> 型錄條目：「現代主義與構成」→ 義大利未來派 Futurism 的**自由字半身**（全館第 2 站，與 luyi〔力場・金屬冷面半身〕分半）。

## 0. 設計哲學

1909 年馬里內蒂（F. T. Marinetti）在《費加洛報》發表〈未來主義宣言〉；1912 年 5 月 11 日〈未來主義文學技術宣言〉要求摧毀句法、只用動詞原形、廢除形容詞副詞與標點、名詞成對出現；1913 年 5 月 11 日〈無線想像與自由字〉把矛頭轉向「所謂的頁面印刷和諧」：「我們會在同一頁用三四種不同顏色的墨，必要時用二十種不同的字體。斜體給一連串相似而快速的感覺，粗體給暴力的擬聲……」。1914 年《Zang Tumb Tuuum》把阿德里安堡圍城的砲聲排成鉛字；1927 年德佩羅（Fortunato Depero）的螺栓裝訂書《Depero Futurista》把廣告、字體與機械人偶釘在一起，1932 年他替 Campari Soda 設計了錐形瓶。

這個風格長成這樣，是因為**當時的活版印刷只能排水平的鉛字**——未來主義者偏要用鐵絲綁、用石膏墊、甚至直接照相製版手稿，把字斜著、彎著、疊著擺。它的視覺能量來自「對印刷機的反抗」。所以在網頁上重現它，**字必須真的在動、真的會撞**：本站的每一個字都是一個有質量的剛體。

一句話：**字就是聲音，版面就是噪音發生的現場。**

**與同流派另一半身（luyi，力場半身）的分界**：luyi 是「金屬冷面＋放射力場統治所有角度＋聲音響度即時改寫可變字軸」——圖像主體是鋁板與向量場，字是被場讀數驅動的；本半身是「平塗色紙＋三墨＋八種字體各綁一種感覺類別＋字是有質量會碰撞的剛體」——圖像主體是字本身與它們互相推擠後的版面，字的內容由宣言條文寫成的文法產生。本半身禁用金屬、禁用可變字軸驅動、禁用向量場流線。

## 1. 本風格的 5 個不可省略特徵

拿掉任何一項，它就退化成「隨便旋轉文字的海報」或達達拼貼。

### 特徵 1：字即聲音——擬聲字的字重＝音量

暴力擬聲（TAC! ZANG TUMB BOOM）一律用最粗的無襯線黑體、大寫、紅墨、字級是正文的 4–7 倍；漏氣與細碎聲用打字機斜體小字、拉開字距。同一個聲音越大，字越粗越大，不是越彩。

```css
.t-onoma{font-family:'Archivo Black','Noto Sans TC',sans-serif;font-weight:900;color:#E1251B;
  text-transform:uppercase;letter-spacing:-.03em;line-height:.86;font-size:clamp(44px,9vw,120px)}
.t-hiss{font-family:'Courier Prime',monospace;font-style:italic;letter-spacing:.32em;font-size:.82em}
```

### 特徵 2：一頁多字體、三種墨——拒絕和諧

同一畫面至少 6 種字體、3 種墨（黑 #16130F、紅 #E1251B、鈷藍 #1E3FA0）。每一種字體綁死一種「感覺類別」，不是隨機混搭：

| 類別 | 字體 | 墨 | 用途（1913 規則） |
|---|---|---|---|
| onoma 暴力擬聲 | Archivo Black / Noto Sans TC 900 | 紅 | 爆裂、撞擊 |
| fast 快速感覺 | Bodoni Moda Italic | 黑 | 連串、重複、速度 |
| pair 名詞對 | Bodoni Moda 800 / Noto Serif TC 900 | 黑 | 類比名詞 |
| verb 動詞原形 | Anton / Noto Sans TC | 藍 | 動作 |
| sign 數學符號 | Courier Prime 700 | 黑 | 取代連接詞與標點 |
| price/數字 | Alfa Slab One | 黑或紅 | 價格、年代 |

```css
.t-fast{font-family:'Bodoni Moda','Noto Serif TC',serif;font-style:italic;font-weight:500}
.t-pair{font-family:'Bodoni Moda','Noto Serif TC',serif;font-weight:800;line-height:1}
.t-verb{font-family:'Anton','Noto Sans TC',sans-serif;color:#1E3FA0;text-transform:uppercase}
.t-sign{font-family:'Courier Prime',monospace;font-weight:700;line-height:.8}
```

### 特徵 3：摧毀句法——名詞對＋算式取代標點

文案不用逗號句號、不用形容詞副詞、動詞只用原形；名詞兩兩以連字號綁起（瓶子-砲彈、彈珠-月亮）；連接詞換成 `+ × = > ÷ −`。標題、價目表、按鈕都照這個寫：「價目 = 速度」「灌 × 翻 × 封」。

```html
<h1><span class="t-onoma">PI-POK</span> <span class="t-pair">彈珠-月亮</span>
  <span class="t-sign">+</span> <span class="t-verb">翻</span> <span class="t-pair">瓶子-砲彈</span></h1>
```

### 特徵 4：斜角力線構圖——水平行不超過 1/3

字行以 ±6°–62° 斜放、沿「力線 linee-forza」從一個發射點放射出去；永不倒置（超過 62° 即視為失控）。版面上要畫出實際的力線：極窄的銳角楔，紅與黑交替，從同一點射出。

```html
<svg class="forza" viewBox="0 0 1200 640" preserveAspectRatio="none" aria-hidden="true">
  <path d="M744 640L420 40L470 30Z" fill="#E1251B" opacity=".55"/>
  <path d="M744 640L1120 120L1150 140Z" fill="#16130F" opacity=".14"/>
</svg>
```

```css
.forza{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
h2{transform:rotate(-7deg);transform-origin:left bottom}
```

### 特徵 5：頻閃重複——Balla／Bragaglia 的時間殘影

動的東西要留下 2–3 層錯位殘影（巴拉〈拴著皮帶的狗的動態〉1912、布拉加利亞的光動態攝影）。標題常駐殘影並緩慢呼吸；飛行中的字掛上殘影、停下即收。殘影只能同色降透明，不可模糊、不可換色。

```css
.echo{position:relative;display:inline-block}
.echo::before,.echo::after{content:attr(data-t);position:absolute;left:0;top:0;color:inherit;white-space:nowrap}
.echo::before{opacity:.32;animation:echo1 2.6s ease-in-out infinite}
.echo::after{opacity:.14;animation:echo2 2.6s ease-in-out infinite}
@keyframes echo1{0%,100%{transform:translateX(-.04em)}50%{transform:translateX(-.13em)}}
@keyframes echo2{0%,100%{transform:translateX(-.08em)}50%{transform:translateX(-.27em)}}
.fly{text-shadow:-.12em 0 0 color-mix(in srgb,currentColor 30%,transparent),-.26em 0 0 color-mix(in srgb,currentColor 14%,transparent)}
```

## 2. 色彩系統

紙是**平塗色紙**（德佩羅的螺栓書以多種色紙印製），每一頁換一種紙色，墨永遠只有三種。零漸層、零陰影（唯一例外：結果標籤的 10px 實色偏移硬影）。

| 名稱 | Hex | 用途 | 比例 |
|---|---|---|---|
| 薄荷紙（字版頁） | #CDE8DA | 首頁底 | 55–65% |
| 檸檬紙（口味頁） | #F0DE6E | 口味頁底 | 同上 |
| 橘紙（噪音頁） | #EE9A4D | 噪音頁底 | 同上 |
| 石板紙（宣言頁） | #B7C3CF | 宣言頁底 | 同上 |
| 墨黑 | #16130F | 正文、輸送帶、粗框 | 20–25% |
| 未來派紅 | #E1251B | 擬聲字、力線、現用態 | 8–12% |
| 鈷藍 | #1E3FA0 | 動詞、第三墨、focus | 3–6% |
| 瓶玻璃綠 | #5FAF98 | 只用於彈珠瓶插圖 | ≤3% |

規則：紅只給聲音與現用；藍只給動詞與 focus；不准出現第四種墨。

## 3. 字體系統

全部來自 Google Fonts：Archivo Black、Bodoni Moda（含 opsz 與斜體）、Anton、Alfa Slab One、Courier Prime、Noto Sans TC 900、Noto Serif TC 400/700/900、LXGW WenKai TC——共 8 種。

- 字級 scale（px）：正文 17／小註 11–13／小標 19–26／中標 34–56／擬聲 74–120／巨字 clamp(70px,13vw,210px)。
- 正文 Noto Serif TC 400，行高 1.75；所有大字行高 .78–.9。
- 字距：擬聲 −.03em、打字機 +.2–.32em、斜體 −.01em。
- 拉丁與中文混排時，中文永遠走相同類別的 TC 字體（擬聲→Noto Sans TC 900，名詞對→Noto Serif TC 900，快速→霞鶩文楷）。

## 4. 版面與網格

- 沒有 12 欄均分網格的感覺：區塊以 12 欄定位但**交錯錯位**（1/6、7/12、2/7、8/13…），每塊帶 −3°～+2.5° 旋轉，hover 時轉正。
- 標題旋轉 −5°～−11°，副標反向 +6°～+14°，形成剪刀交叉。
- 字版區（tavola）滿寬、高 68vh，上緣 3px 墨線；字只住在字版裡，可以互相輕微重疊（≤8% 面積）。
- 留白：區塊之間 40–60px，字版內字面積上限 44%（引擎自動淘汰最舊的字）。
- 頁尾以 6px 墨線截斷，三欄。

## 5. 元件配方

**導覽 parola-cluster 自由字導覽**：右上 330×104 的小字版，四個頁名各用不同字體與旋轉（−14°、+9°、−6°、+17°），間夾 `+ × =`；現用頁轉紅並在下方壓一條 skewX(−30°) 紅條；hover 轉正放大 1.12。≤560px 改為底部四格墨黑條，旋轉縮到 ±4°。

```css
.cluster{position:relative;width:330px;height:104px}
.cluster a{position:absolute;text-decoration:none;transition:transform .12s cubic-bezier(.2,1.6,.4,1)}
.cluster a:nth-child(1){left:0;top:30px;transform:rotate(-14deg);font:900 30px/1 'Archivo Black'}
.cluster a:nth-child(2){left:96px;top:2px;transform:rotate(9deg);font:italic 600 30px/1 'Bodoni Moda'}
.cluster a[aria-current]{color:#E1251B}
```

**按鈕**：無圓角；主按鈕紅底白字 Archivo Black；次按鈕透明、右側 3px 墨線分隔、Anton 大寫；hover 反黑。
**卡片**：不是卡片——是上緣 5px 墨線的斜置區塊，價格牌以 Alfa Slab One 黑底色字 +7° 貼在右上角。
**表格**：2px 墨線分列，數字用 Alfa Slab One 靠右，hover 整列反黑。
**頁尾**：6px 墨線，三欄，標題 Archivo Black 紅 −3°。

## 6. 動效規則

| 種類 | 本站實作 | 觸發 | 時長／緩動 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 碳酸＝`+ × = ÷` 數學符號從頁底上升旋轉；標題殘影呼吸；灌裝機齒輪轉、輸送帶走 | 載入即常駐 | 11–23s linear；殘影 2.6s ease-in-out | 符號靜置於隨機高度、殘影定格於一層 |
| input 輸入 | 字可拖曳與甩動（拋擲速度→剛體速度與角速度）；hover 字「喊」：轉 −3° 放大 1.07；導覽轉正 | pointer | 即時；喊 90ms cubic-bezier(.2,1.8,.4,1) | 拖放後直接 settle，無飛行 |
| transition 轉場 | 斜角力線擦拭：紅色斜楔＋一道黑力線由左向右掃過全頁再離開 | 點站內連結／載入 | 出 380ms、入 420ms cubic-bezier(.7,0,.3,1) | 不擦拭、直接換頁 |
| signature 簽名 | **字撞字 word-on-word impact**：封得準的那一瓶噴出一串自由字，字以剛體飛出、旋轉、撞開已在版上的字，字版震 3px、力線從灌裝機嘴爆開 | 封珠 | 飛行約 0.6–1.2s 物理積分、震 140ms steps(3)、力線 500ms 淡出 | 字直接出現在版上並瞬間求解不重疊，無震動無力線 |

## 7. 插畫與圖像風格

插圖只有兩種：**字本身**（擬聲字版，佔視覺 80%）與**德佩羅式機械平塗**——彈珠瓶、灌裝機、噪音機都只由矩形、梯形、圓、銳角楔組成，三墨＋瓶玻璃綠平塗，無描邊、無漸層、無透視。機器要有一個會轉的齒輪或會壓下的頭。

```html
<symbol id="codd" viewBox="0 0 34 86">
  <path d="M12 2h10v6l-2 3v5c0 3 3 4 3 7v3l5 6v46c0 4-2 6-6 6H8c-4 0-6-2-6-6V32l5-6v-3c0-3 3-4 3-7v-5l-2-3z" fill="#5FAF98"/>
  <path d="M7 50h20v14H7z" fill="#CDE8DA"/><path d="M7 50h20v4H7z" fill="#E1251B"/>
  <circle class="mb" cx="17" cy="28" r="4.6" fill="#E9EEF0"/>
</symbol>
```

## 8. Logo 與 Favicon

Logo：一支向右傾 12° 的黑色彈珠瓶剪影＋瓶頸紅色彈珠＋一道從瓶底射出的紅色銳角力線＋右側 Archivo Black「PI-POK」帶兩層同色殘影、整組 −6°。Favicon：薄荷底、黑瓶、紅珠、紅力線，64×64 inline SVG data URI。不可用圓形徽章、不可用「EST.」。

## 9. Do & Don't

**Do**
- 先決定「這個品牌發出什麼聲音」，再寫擬聲字；擬聲字是內容不是裝飾。
- 每種字體綁一種感覺類別，在全站一致。
- 字的旋轉限制在 ±62°，保證可讀；長文仍是水平、Noto Serif TC、行高 1.75。
- 動態字用真實物理（質量、碰撞、阻尼），讓「撞」看得見。

**Don't**
- 不用漸層、模糊陰影、圓角卡片、紫藍漸層、emoji icon。
- 不讓整頁字都斜——正文、價目表、地址必須水平可讀（未來主義是對印刷的反抗，不是對讀者的反抗）。
- 不借用 1909 宣言中歌頌戰爭的語句；本站只取它的速度、噪音與機器。
- 不出現第四種墨、不出現描邊字、不做霓虹發光（那是另一個風格）。
- 不寫形容詞：「清涼好喝」是違規文案。

## 10. 頁面骨架範例

```html
<header class="top">
  <a class="brand" href="index.html"><svg>…</svg><b class="echo" data-t="PI-POK">PI-POK</b></a>
  <nav class="cluster"><a href="index.html" aria-current="page">字版<span>TAVOLA</span></a>…</nav>
</header>
<main>
  <section class="tavola" id="tavola">
    <svg class="forza">…力線…</svg>
    <div id="words">
      <span class="w t-onoma" data-a="-12" data-fs="96" style="left:40%;top:30%;font-size:min(96px,8vw);transform:translate(-50%,-50%) rotate(-12deg)">TAC!</span>
      <span class="w t-pair" data-a="24" data-fs="32" style="left:62%;top:55%;…">彈珠-月亮</span>
    </div>
  </section>
  <section class="rules"><h2 class="echo" data-t="一班 60″">一班 60″<em>規則只有三句</em></h2>…</section>
</main>
<footer class="foot">…</footer>
```

## 11. 技術實作與相容性

### 11.1 核心技術（3 項）

1. **馬里內蒂規則文法生成器（E 資料與生成層）**——把 1912〈技術宣言〉與 1913〈無線想像與自由字〉寫成產生規則：每一句＝一個擬聲字（依封珠品質 perfect／good／miss／hiss 選字庫）＋1–3 個詞元，詞元只能是名詞對、動詞原形、數學符號、快速感覺；**每個詞元帶類別，類別直接決定字體與墨色**。FNV-1a → mulberry32 決定性亂數，同 seed 同字版（`?seed=` 可重現）。
2. **rAF 剛體積分＋OBB 分離軸碰撞＋拖曳拋擲（B 動效／D 輸入層）**——每個字是一個有向外框剛體（寬高由 `offsetWidth/offsetHeight` 量測、質量∝面積），半隱式積分、線阻尼 e^(−2.6t)、角阻尼 e^(−3.2t)；SAT 取四軸最小穿透、位置修正 80%、法向衝量恢復係數 0.3、接觸點偏移產生力矩；旋轉夾在 ±62°（特徵 4）。字靜止 40 幀即睡眠、不再寫 DOM。拖曳以 Pointer Events + `setPointerCapture`，放手速度→初速。
3. **建置期同引擎烘焙＋SVG 力線（A 渲染層）**——Node 以同一份 engine.js 跑完 13 次封珠、settle 400 步，把結果寫成百分比座標與 `min(px,vw)` 字級的靜態 span；無 JS／noscript 看到的就是一張完整字版。JS 啟動時「收養」這些 span 為剛體，從靜態無縫接手。

### 11.2 支援現況與查證來源

- `Element.setPointerCapture()`：MDN 標示 Baseline Widely available（2020-07 起全瀏覽器）。查證：MDN〈Element: setPointerCapture() method〉。
- SVG `<textPath>`（噪音頁的旋轉字環）：MDN SVGTextPathElement `href`／`method` 屬性 Baseline Widely available（2015-07）。`textLength` 放在 `<text>` 上以 `lengthAdjust` 撐滿圓周。
- `color-mix()`（飛行殘影）：Baseline 2023；不支援時 `text-shadow` 整條宣告失效＝無殘影，字照常飛，資訊零損失。
- `requestAnimationFrame`、CSS `clip-path: polygon()` 動畫、`IntersectionObserver`：皆 Baseline Widely available。
- 文字史料：1913 宣言「三四種墨、必要時二十種字體、斜體給快速相似的感覺」引文經 Campari《The Art Journal 14》所引原文查證；Depero 1932 Campari Soda 錐形瓶經 Wikipedia〈Campari Soda〉與 AIGA Eye on Design 查證；Getty〈Tumultuous Assembly: Visual Poems of the Italian Futurists〉為視覺參照。

### 11.3 Fallback 具體行為

| 狀況 | 行為 |
|---|---|
| 無 JavaScript | 顯示建置期烘好的 35 字靜態字版＋說明條；導覽、口味、噪音、宣言內容完整 |
| prefers-reduced-motion | 字不飛：直接放到版上並同步 settle；無震動、無力線、無擦拭；殘影定格；輸送帶照走（遊戲本體必要的移動，速度不變），齒輪靜止 |
| 字型未載入 | `document.fonts.ready` 或 1.8 秒逾時後啟動，量測以當下字型為準；後續 resize 依比例重排 |
| 分頁隱藏／字版捲出視窗 | `visibilitychange` + `IntersectionObserver` 暫停輸送帶與物理 |

### 11.4 效能實測

- 單頁大小：index 約 52 KB、其餘約 31 KB（全部 inline，不含 Google Fonts）——遠低於 350 KB。
- 物理：Node 22（aarch64）46 個字剛體 0.07 ms／步、70 個 0.14 ms／步；字面積上限 44% 使同時剛體數 ≤ 約 50，主迴圈遠低於 16.7 ms，60fps 有餘裕。
- 首屏 JS：收養 35 個 span＋settle 30 步，Node 模擬約 2 ms（瀏覽器另加一次 layout 讀取，皆在 100 ms 預算內）。
- 只寫 `transform`；睡眠中的字不寫 DOM，避免 layout thrashing（量測只發生在字誕生的那一次）。
