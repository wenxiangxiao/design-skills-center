---
name: tiki-polynesian-pop
description: Tiki / Polynesian Pop (American tiki bars 1933–1970s, Don the Beachcomber, Trader Vic's, the Mai-Kai) for the web — torch-lit carved tiki faces, lashed bamboo frames, Hanalei bamboo lettering and burnt-in plank signs, a night-lagoon palette with flat lava-sunset bands, and exotic-menu motifs (tapa bands, thatch eaves, pufferfish lamps, dotted price leaders).
---

# 玻里尼西亞流行風・提基 Tiki / Polynesian Pop

> 示範站：南洋水族 LAM-IUNN AQUARIUM（臺北中山北路二段 77 巷的熱帶魚店，1964 年起，虛構）

## 一、設計哲學

Tiki 不是玻里尼西亞文化本身，是 **1930–60 年代美國人對南太平洋的想像被做成酒吧裝潢**：Ernest Gantt（後改名 Donn Beach）1933–34 年在好萊塢開 Don the Beachcomber，Victor Bergeron 的 Hinky Dink's 在 1936–37 年改成 Trader Vic's，二戰後退伍軍人、米契納《南太平洋故事》與海爾達《康提基號》把它推向全美；1956 年佛州勞德代爾堡的 Mai-Kai 是全盛期的代表。Sven Kirsten 2000 年在 Taschen 出版《The Book of Tiki》，把這整套視覺命名為「Polynesian Pop」。

它長成這樣，是因為三個製作條件：

1. **木頭與竹子是唯一的建材**——招牌、菜單封面、吧檯都要看起來像在島上手工做的，所以字是「刻」或「燒」進木板的、框是竹竿綁出來的。
2. **酒吧很暗**——光來自火把、河豚燈和魚缸，雕刻永遠是被一個暖色點光源從斜側照亮，凹處是黑的。所以「雕刻」要用**光影**畫，不是用描線。
3. **菜單是主要的印刷品**——Trader Vic's 與 Mai-Kai 的菜單是收藏品：拱頂或茅屋形的封面、tapa 樹皮布紋邊、點線價目、每一杯酒都有自己的插圖。

本館的使用原則：**承認它是借來的**。不用真實宗教神像的名字與造型、不放任何「部落」式的刻板人物；提基臉一律是虛構的、幾何化的，網站裡寫清楚它的來歷。

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，就變成「熱帶度假村」或「夏威夷衫」，不是 Tiki。

### ① 雕刻提基臉——以光影成形，不以描線成形

凹眼、凸瞳、厚眉脊、喇叭鼻、齜牙嘴、兩隻招風耳、頂冠一排三角刻痕；平面＋斜面的「刀面」，不是圓潤的黏土。明暗只來自一個暖色點光源，凹處接近黑。示範站以程式生成高度場、逐像素打光（見第十二章）；靜態版本用 4 階褐色平塗：

```svg
<svg viewBox="0 0 100 112"><!-- 平塗版提基頭：4 階 koa 褐，亮＝凸、暗＝凹 -->
  <path d="M14 8h72v10H14z" fill="#5A3520"/>
  <path d="M17 8l5 9 5-9 5 9 5-9 5 9 5-9 5 9 5-9 5 9 5-9 5 9 5-9 5 9" stroke="#2A170D" stroke-width="2.4" fill="none"/>
  <ellipse cx="10" cy="62" rx="8" ry="17" fill="#5A3520"/><ellipse cx="90" cy="62" rx="8" ry="17" fill="#5A3520"/>
  <rect x="13" y="16" width="74" height="94" rx="5" fill="#6B4126"/>
  <path d="M15 30q35-16 70 0v9q-35-14-70 0z" fill="#A87A48"/>               <!-- 眉脊（凸） -->
  <ellipse cx="32" cy="48" rx="12" ry="9" fill="#2A170D"/><ellipse cx="68" cy="48" rx="12" ry="9" fill="#2A170D"/> <!-- 凹眼 -->
  <circle cx="31" cy="49" r="4.6" fill="#C49260"/><circle cx="69" cy="49" r="4.6" fill="#C49260"/>              <!-- 凸瞳 -->
  <path d="M45 52h10l9 22H36z" fill="#A87A48"/>                                 <!-- 喇叭鼻 -->
  <rect x="20" y="82" width="60" height="20" rx="6" fill="#2A170D"/>
  <path d="M24 84h52v6H24zM24 94h52v6H24z" fill="#C49260"/>                     <!-- 上下兩排牙 -->
  <path d="M30.5 84v16M37 84v16M43.5 84v16M50 84v16M56.5 84v16M63 84v16M69.5 84v16" stroke="#2A170D" stroke-width="1.6"/>
</svg>
```

### ② 竹竿與麻繩綁紮——所有框與分隔都是帶節的竹子

框不是 border，是四根竹竿，四角用麻繩打 X 綁住；招牌是吊在竹竿下的木板。竹竿是全站唯一允許「圓柱漸層」的地方（竹子是圓的）。

```css
.bam-h{height:16px;border-radius:8px;background:
  repeating-linear-gradient(90deg,transparent 0 118px,#8C6A33 118px 121px,#E9CF92 121px 123px,transparent 123px 160px), /* 竹節 */
  linear-gradient(180deg,#EBD39A 0,#CFA765 38%,#A9823F 78%,#7A5A26 100%)}                                          /* 圓柱 */
.bam-v{width:16px;border-radius:8px;background:
  repeating-linear-gradient(180deg,transparent 0 96px,#8C6A33 96px 99px,#E9CF92 99px 101px,transparent 101px 140px),
  linear-gradient(90deg,#EBD39A 0,#CFA765 38%,#A9823F 78%,#7A5A26 100%)}
```
```svg
<symbol id="lash" viewBox="0 0 30 30"><!-- 麻繩 X 綁紮：深繩＋虛線纖維 -->
  <path d="M4 4l22 22M26 4L4 26" stroke="#6E4F22" stroke-width="5" stroke-linecap="round"/>
  <path d="M4 4l22 22M26 4L4 26" stroke="#E4CB8E" stroke-width="2" stroke-dasharray="3 2" stroke-linecap="round"/>
</symbol>
```

### ③ Hanalei 竹節字＋燒進木板的字

拉丁字一律 **Hanalei Fill**（Astigmatic／Brian J. Bonislawsky，Google Fonts 2012，靈感來自 Mai-Kai 招牌的竹字）。中文用 Noto Serif TC 900，寫在木板上時是「燒進去」的：上緣深影、下緣亮線，字色是火光金。木板邊緣不規則（clip-path 多邊形）。

```css
.latin{font-family:"Hanalei Fill",serif;letter-spacing:.02em}
.plank{background:
  repeating-linear-gradient(178deg,transparent 0 7px,rgba(0,0,0,.13) 7px 8px,transparent 8px 15px,rgba(255,220,170,.05) 15px 16px),
  linear-gradient(180deg,#6B4126,#4A2B19 55%,#3A2116);
  clip-path:polygon(0 6%,3% 0,40% 3%,72% 0,98% 2%,100% 14%,99% 88%,100% 100%,60% 97%,24% 100%,1% 97%,0 70%)}
.carved{color:#F2AE3A;text-shadow:0 -2px 0 #1C0F07,0 2px 0 rgba(255,214,150,.32)}
```

### ④ 潟湖夜 × 熔岩夕照：大面積深青＋平塗色帶

底色是夜裡的潟湖深青；暖色只出現在三個地方：火光（火把、河豚燈、眼睛）、夕照、價錢。夕照與水都是**硬邊的水平色帶**，不是平滑漸層——那是 50 年代菜單網版印刷的樣子。

```css
:root{--lagoon:#0F3D3E;--deep:#0A2A2C;--sea:#5FB3A6;--koa:#3A2116;--paper:#F6EBD0;--cream:#F2E3C0;
      --lava:#E4572E;--gold:#F2AE3A;--hib:#C42A47;--bamboo:#CFA765}
.dusk{background:linear-gradient(180deg,#3A2116 0 14%,#C42A47 14% 30%,#E4572E 30% 46%,#F2AE3A 46% 62%,#F6D58A 62% 70%)}
.water{background:repeating-linear-gradient(180deg,#145254 0 18%,#11494B 18% 40%,#0F3D3E 40% 66%,#0C3335 66% 100%)}
.sun{border-radius:999px 999px 0 0;background:repeating-linear-gradient(180deg,#FFE8A8 0 22px,transparent 22px 30px)} /* 被切成條的半個太陽 */
```

### ⑤ 異國菜單母題：tapa 紋帶・茅草屋簷・河豚燈・點線價目

每一張「紙」的上緣都有一條 tapa 樹皮布紋（三角＋鋸齒＋圓點），頁首是參差的茅草屋簷，屋簷下吊著河豚燈；價目一律是點線引到右邊的價錢。

```css
.tapa{height:26px;background-color:#F6EBD0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='26'%3E%3Cpath d='M0 0h52v3H0zM0 23h52v3H0z' fill='%233A2116'/%3E%3Cpath d='M0 6l13 14L26 6l13 14L52 6v4L39 24 26 10 13 24 0 10z' fill='%233A2116'/%3E%3Ccircle cx='13' cy='9' r='2.2' fill='%23C42A47'/%3E%3Ccircle cx='39' cy='9' r='2.2' fill='%23E4572E'/%3E%3C/svg%3E")}
.leader{display:flex;align-items:baseline;gap:.5em}
.leader .dots{flex:1;border-bottom:2px dotted rgba(58,33,22,.45);transform:translateY(-4px)}
.price{font:400 1.15em/1 "Hanalei Fill",serif;color:#C42A47}
.puffer-lamp{transform-origin:50% 0;animation:sway 6.5s ease-in-out infinite alternate}
@keyframes sway{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
```

茅草屋簷：三層參差三角草束（#6E4F22 → #A9823F → #CFA765，由後到前越短越亮）＋ 70 根細草線，底緣一條 9px koa 樑。建置期以決定性亂數生成（見示範站 `thatch(seed)`）。

## 三、色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| lagoon | `#0F3D3E` | 頁面大面積底、水 | ~35% |
| deep | `#0A2A2C` | 深段、頁尾、硬影 | ~10% |
| koa | `#3A2116`／`#5A3520` | 木板、導覽柱、雕刻暗部 | ~18% |
| paper／cream | `#F6EBD0`／`#F2E3C0` | 菜單紙、長文 | ~20% |
| bamboo | `#CFA765` | 竹竿、沙、茅草 | ~6% |
| gold | `#F2AE3A` | 燒字、火光、按鈕 | ~5% |
| lava | `#E4572E` | 火焰、強調、夕照 | ~3% |
| hibiscus | `#C42A47` | 價錢、警告、夕照 | ~2% |
| sea | `#5FB3A6` | 水面高光、「和平」 | ≤1% |

規則：暖色永遠是「光」或「錢」；冷色永遠是「水」。不得出現紫、粉藍、霓虹綠；不得有玻璃擬態或模糊陰影——唯一的陰影是 10–12px 的實色硬影（`box-shadow:12px 12px 0 #0A2A2C`），像菜單放在吧檯上。

## 四、字體系統

| 角色 | 字體 | 字級 | 字重／行高 |
|---|---|---|---|
| 拉丁標題、價錢、年份 | Hanalei Fill | 22–42px | 400／1 |
| 中文大標（木板） | Noto Serif TC | clamp(46px,8.5vw,104px) | 900／1 |
| 中文小標 | Noto Serif TC | 22–44px | 900／1.2 |
| 內文 | Noto Sans TC | 15–16px | 400／1.8 |
| 註記、刻符說明 | Noto Sans TC | 12.5–13px | 400／1.45 |

```html
<link href="https://fonts.googleapis.com/css2?family=Hanalei+Fill&family=Noto+Sans+TC:wght@400;700&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
```
Hanalei Fill 只有大寫感很強的單一字重，**不可用於內文**；拉丁副標也不要超過 6 個字。

## 五、版面與網格

- **櫥窗三欄**：`grid-template-columns:minmax(70px,.9fr) minmax(0,4.2fr) minmax(70px,.9fr)`——中間是竹框魚缸（16:9），兩側是圖騰柱（寬 ≤140px），底部對齊（`align-items:end`）。手機時兩側柱縮成 52px，不拿掉。
- **頁首永遠是屋簷**：茅草 SVG 撐滿寬（`preserveAspectRatio="none"`），高 60–96px，下面吊東西（燈、招牌、吊牌）。
- **菜單紙微旋**：`rotate(-1.2deg)`～`(.6deg)`，配 12px 實色硬影；紙上緣一定是 tapa 帶。
- **吊牌陣列**：竹竿橫跨、下面以虛線繩吊 6 塊木板，各自 ±2° 旋轉。
- **shape-outside 繞排**：菜單裡的圖騰柱 `float:left` 並以「柱身＋三對耳朵＋頂冠」的多邊形 `shape-outside`，文字沿雕像輪廓繞排；圓形河豚燈 `float:right; shape-outside:circle(44% at 50% 58%)`。
- 左側固定 92px 圖騰柱導覽；≤760px 改為底部 72px 一排四顆頭。

## 六、元件配方

- **導覽（圖騰柱 totem-stack）**：左側 koa 直條＝一根柱子，四顆提基頭（64×72 打光 canvas）上下疊，頭下是兩行字（中文頁名＋Hanalei 英文）。現用頁：兩眼點著火（`radial-gradient` 金→熔岩、`steps(3)` 閃），字轉熔岩色；hover：頭歪 −5°。
- **按鈕**：火光金或木槿紅底，`clip-path:polygon(0 8%,100% 0,97% 100%,3% 92%)` 歪梯形，Noto Serif TC 900；hover 轉熔岩。
- **卡片＝菜單紙**：`background:#F6EBD0`＋上緣 tapa＋旋轉＋實色硬影；項目是「圖＋名稱＋小字註＋點線＋價錢」。
- **表單**：選項是 2px koa 邊框的方塊，選中＝koa 底金字；輸入框底色 `#FFF8E6`；送出鈕同按鈕。
- **警告刻牌**：木槿紅底的歪長條，左邊一枚刻符（提基小臉：溫和＝閉嘴、愛咬鰭＝齜牙、兇＝紅底張口、獨居＝單眼、底棲＝底線）。
- **頁尾**：deep 底、上緣 tapa 帶、三欄（店名地址／營業／頁面），Hanalei 欄名。

## 七、動效規則（四種，缺一不可）

| 類型 | 本站實作（自製） | 觸發 | 數值 | reduced-motion 降級 |
|---|---|---|---|---|
| ambient 環境 | 魚沿各自的 `offset-path` 迴圈游、氣泡上升、水草 skew、河豚燈擺、火把閃、閒置 5 秒後火光自己在畫面裡繞 | 無 | 魚速 24–62 px/s、`linear`；燈 6.5s `ease-in-out alternate`；火焰 `.42s steps(3)` | 全部 `animation-play-state:paused`：魚停在各自路徑的不同位置（負 delay），資訊不丟 |
| input 輸入 | 敲玻璃：點魚缸處出漣漪，190px 內的魚 `playbackRate=4.5` 竄開 650ms | pointerdown | 漣漪 .7s `ease-out` scale 9 | 無漣漪、不加速；點擊仍可操作 |
| transition 轉場 | 竹簾換頁：離開時 11 片竹簾由上而下 `scaleY(0→1)` 垂下；抵達時由下而上捲起 | 站內連結 | 每片 230ms、間隔 32ms、`cubic-bezier(.5,0,.2,1)` | 直接換頁 |
| signature 簽名 | **火炬照雕**：游標是一支火把，它的位置就是所有提基浮雕的點光源，火焰每 90ms 明暗一次 | pointermove | 光源離牆 150 css px、衰減 `1.3/(1+(d/520)²)`、環境光 .2 | 不閃、不自繞；光源仍跟手（使用者自己在動） |

**motion-library 元件**（v1.1.0 @eb4d70c；`MotionLib.prompt(id)` 可取每個元件的開發 Prompt）：

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| TXT-B-17 | Water Reflection | 櫥窗 | text「南洋水族 1964」・primary `#5FB3A6`・secondary `#F2AE3A`・bg `#0A2A2C`・duration 2.4・loop false・seed 1964・16:9・maxHeight 300 | 店史標題從潟湖水面升起並倒映；暗底→字自動近白 |
| TXT-B-26 | Swing Letters | 魚單 | text「今日到貨」・primary `#C42A47`・secondary `#E4572E`・bg `#F6EBD0`・duration 2.6・loop false・seed 21・maxHeight 260 | 吊在竹竿下的木牌字一個個晃到定位；紙底→字自動近黑 |
| BG-A-19 | Bubble Dots | 配缸 | primary `#F2E3C0`・secondary `#5FB3A6`・bg `#0F3D3E`・duration 9・density .8・intensity .8・seed 90 | 缸裡的水本身：描邊氣泡＋高光點 |
| SHP-19 | Bubble Pop | 配缸 | primary `#5FB3A6`・secondary `#E4572E`・bg `#F6EBD0`・duration 1.6・loop false・intensity 1.2・seed＝配缸單號 | 「開缸」那一刻配缸單頂端氣泡彈開 |
| BG-B-20 | Wave Lines | 來店 | primary `#5FB3A6`・secondary `#0F3D3E`・bg `#0A2A2C`・duration 8・density 1・intensity .9・seed 77 | 夕照下的潟湖波帶 |

掛載一律經 `LI.ml()`：等 `document.fonts.ready`、離屏 `destroy()`、回到視窗重掛；一次性文字元件 `once`；canvas `aria-hidden`、原 HTML 標題保留在 `.ml-fb`；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。元件不擔任 signature。

## 八、插畫與圖像風格

- **雕刻（koa-relief-heightfield）**：提基只用高度場打光或 4 階褐平塗，不用描線；頂冠一定有三角刻痕、一定有耳朵、一定有牙。
- **魚與物件（提基菜單平塗）**：viewBox 100×60、朝右；飽和平塗＋2.2px koa 深褐勾邊；花紋是條紋與圓點（不是寫實鱗片）；眼睛一律黑點＋一個米白高光。
- **剪影**：棕櫚樹只用 `#1C120C` 剪影，站在夕照帶前。
- **河豚燈**：竹籤刺一圈、椰殼本體、內部兩圈暖光同心圓、兩隻圓眼。
- 禁止：照片、寫實水彩、扁平向量「人物插畫」、任何真實神像的造型。

## 九、Logo 與 Favicon

Logo：潟湖青底、一條竹竿橫線當地平線，中央一尊平塗提基頭（眼睛點熔岩色），右下一尾紅蓮燈從嘴邊游出、後面三顆氣泡。Favicon 32×32：潟湖青底、提基頭簡化成眼＋鼻＋一排金牙，inline SVG data URI。

## 十、Do & Don't

**Do**
- 把雕刻當成「被一個光照亮的東西」來畫。
- 所有框都用竹竿＋綁繩；所有紙都要有 tapa 帶。
- 價錢用點線引出，用 Hanalei Fill 寫。
- 在文案裡交代提基的來歷（美國酒吧文化），不要假裝它是「傳統」。

**Don't**
- 不要紫藍漸層、玻璃擬態、模糊陰影、圓角大卡片、置中三卡片。
- 不要 emoji 當 icon（🌴🍹🗿 一律不准）；icon 一律自繪 SVG。
- 不要用真實的毛利、夏威夷神祇名稱或聖像造型；不要「土著」人物插圖。
- 不要把夕照做成平滑漸層——要硬邊色帶。
- 不要 Lorem ipsum、不要「EST. 19xx」徽章；年份放在吊牌與故事裡。

## 十一、頁面骨架（可直接使用）

```html
<body>
<nav class="rail" aria-label="主要導覽：圖騰柱">
  <ol><li><a href="index.html" aria-current="page"><span class="head"><canvas class="relief" width="48" height="54" data-heads="1,1,6,.2"></canvas><span class="eyes"><i></i><i></i></span></span><span class="lbl">櫥窗<b>Window</b></span></a></li>…</ol>
</nav>
<main>
  <section class="hero">
    <svg class="thatch" viewBox="0 0 1200 90" preserveAspectRatio="none">…三層草束…</svg>
    <div class="stage">
      <div class="totem"><canvas class="relief" width="70" height="248" data-heads="1,1,6,.2;2,0,5,-.3;0,1,7,.4"></canvas></div>
      <div class="window"><div class="bam-h t"></div><div class="bam-h b"></div><div class="bam-v l"></div><div class="bam-v r"></div>
        <div class="tank">…魚（.sw + offset-path）…</div></div>
      <div class="totem">…</div>
    </div>
    <div class="sign plank"><h1 class="carved">店名</h1><span class="latin">Shop Name · since 1964</span></div>
  </section>
  <section class="menucard paper"><div class="tapa"></div>
    <ul><li><svg viewBox="0 0 100 60"><use href="#f-cardinal"/></svg><div class="leader"><span>紅蓮燈</span><span class="dots"></span><span class="price">NT$250</span></div></li></ul>
  </section>
</main>
<footer class="foot"><div class="tapa"></div>…</footer>
</body>
```

## 十二、技術實作與相容性

### A. Canvas 2D ImageData 高度場打光（A 渲染層）——承載特徵①與 signature
- 每尊提基是一張 `Float32Array` 高度場：`face(u,v)` 疊十種原語（木塊、耳、頂冠刻痕、眉脊、凹眼凸瞳、喇叭鼻、鼻孔、齜牙嘴、頰溝、斧痕刀面＋木紋），平台以 smoothstep 斜切（刀面，不是黏土）。Sobel 取法線一次存起來。
- 每次光源移動：逐像素 `Lambert × 距離衰減 × 火焰明暗`，木色依高度從 `#3A2116` 走到 `#C48C52`，寫回 `ImageData` → `putImageData`。只重畫可見的 canvas（IntersectionObserver），只在游標動或火焰閃時重畫。
- 高度場以 `requestIdleCallback` 一張一個任務建，首屏不阻塞；建好前顯示平塗 SVG 備援（`.relief-fb`），建好才換。
- 支援：Canvas 2D／ImageData 為所有瀏覽器長期支援；`requestIdleCallback` 在 Safari 缺席時以 `setTimeout(16)` 代替。
- **效能實測（node 22，單執行緒）**：建場 70×248＝28.8ms（含 JIT 暖機）、90×300＝19.7ms、110×124＝4.4ms、48×54＝0.8ms；打光每幀 0.40／0.45／0.30／0.04ms。首頁同時可見約 7 張，每幀合計約 1.3ms，遠低於 16.7ms 預算。

### B. CSS `offset-path: path()` ＋ `offset-distance` 動畫（B 動效層）——承載 ambient 與〈配一缸〉
- 每條魚一條「去程向右、轉身、回程向左、轉身」的封閉 path（兩段等長），`@keyframes swim{to{offset-distance:100%}}` 線性循環；`offset-rotate:0deg`，魚身另以 `steps(1)` 在 50% `scaleX(-1)` 翻面——所以魚永遠是正的，不會像 `offset-rotate:auto` 那樣游回來時肚子朝上。
- 每條魚的 path 由 `LI.swimPath(W,H,zone,rng)` 依容器尺寸與棲層（上／中／底）生成，resize 後重算；`path()` 只能是單一字串、不能用 `var()`，所以以 `el.style.offsetPath='path("…")'` 直接寫。
- **查證**：MDN `offset` 標示 Baseline Widely available（自 2022-09）；MDN `path()` 標示 Baseline Widely available（自 2020-07），且註明 path 必須是單一字串、不能以 `var()` 組成（本站因此以 JS 寫入）。
- Fallback：`@supports not (offset-path:path("M0 0L1 1"))` 時魚以 `translate(var(--fx),var(--fy))` 停在路徑上的一點，畫面仍完整。

### C. CSS `shape-outside`（C 版面層）——承載特徵⑤的菜單版面
- 魚單上的圖騰柱 `float:left; shape-outside:polygon(…28 點…)`（柱身＋三對耳＋頂冠），河豚燈 `float:right; shape-outside:circle(44% at 50% 58%)`，`shape-margin:12–14px`。
- **查證**：MDN `shape-outside` 標示 Baseline Widely available（自 2020-01）；caniuse 顯示 `polygon()`、`circle()` 於主流瀏覽器支援，`path()` 與 `rect()` 支援較晚——本站因此只用 polygon 與 circle。
- Fallback：不支援時退化為一般矩形浮動繞排；≤560px 拿掉河豚燈浮動、圖騰柱縮為 96px。

### 預算
- 單頁 90–103KB（含 34.9KB motion-library 子集與全部 inline 資源）；零外部圖片；外部資源只有 Google Fonts。
- 首屏 JS：引擎與資料解析 <10ms，高度場延到閒置時建。動畫以 transform／offset-distance 為主，不觸發版面重排。

### 參考來源
- Smithsonian Magazine〈There's More to Classic Tiki Than Just Kitsch〉；Difford's Guide〈Tiki's rise, fall and revival〉；Wikipedia〈Tiki bar〉
- Sven Kirsten《The Book of Tiki: The Cult of Polynesian Pop in Fifties America》Taschen 2000；Punch〈Sven Kirsten, Tiki Historian〉
- Atomic Grog（The Mai-Kai 1956 建造照片與雕刻紀錄）
- Google Fonts〈Hanalei Fill〉（Astigmatic，靈感來自 Mai-Kai 竹字標誌）
- MDN：`offset`、`path()`、`shape-outside`；caniuse：`shape-outside` 各值

## 十三、驗收：三秒辨識測試

遮掉所有文字看首屏：屋簷茅草、兩根被火光照亮的三頭圖騰柱、竹竿綁紮的魚缸、吊著的河豚燈、深青底——三秒內應該說得出「Tiki 酒吧」。五個特徵的位置：①兩側圖騰柱與導覽頭 ②魚缸竹框與四角綁繩 ③招牌木板與 Hanalei 副標 ④深青水帶與（來店頁）夕照帶 ⑤屋簷、河豚燈、下一屏的 tapa 菜單。
