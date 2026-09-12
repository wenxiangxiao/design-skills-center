---
name: rosta-stencil-window
description: Soviet ROSTA Windows (1919–1921) stencil agitprop — 4–14 sequential panels on one sheet, flat cut-out pictograms with bridges, three opaque spot plates in permanent misregistration, stencil-cut lettering, and a rhymed two-line caption.
---

# ROSTA 窗（Окна РОСТА）風格規格書

> 一九一九年二月，莫斯科一家空掉的糖果店櫥窗上出現了第一面「用畫的新聞」。畫的人是
> Mikhail Cheremnykh，寫字的是記者 Nikolai Ivanov。幾週後詩人 Vladimir Mayakovsky 走過那面窗，
> 接手寫了後來大約九成的句子——他自己算過，三千張草圖、六千條句子。
> 沒有印刷廠、沒有紙，所以用模板：刻一次，手刷三百次。看的人多半不識字，所以圖必須自己講完一件事。
> **這個流派的全部造形都是這兩個條件的結果。**

參照（真實史料）：

- Melton Prior Institut，Alexander Roob〈Graphic Journalism and the Avant-garde — The ROSTA Windows of the Bolshevik Art Army〉(2014)
- Wikipedia「ROSTA windows」／「Окна сатиры РОСТА」
- Viktor Duvakin《ROSTA-Fenster: Majakowski als Dichter und bildender Künstler》(Dresden 1967)
- Leah Dickerman《ROSTA: Bolshevik Placards 1919–1921》(New York 1994)
- 延伸線：Mayakovsky × Rodchenko「Reklam-Konstruktor」為國營消費合作社 Mosselprom 做的廣告（1923–25），
  把同一套手法從內戰宣傳轉用到「今天店裡在賣什麼」——本範例站取的正是這一條線。

**適用**：公告、告示、社區組織、合作社、市場、工會、選務、公共衛生宣導、任何「要人今天做一件事」的網站。
**不適用**：奢侈品、金融、需要大量長文與細緻層級的內容型網站。

---

## 一、設計哲學

1. **圖是給不識字的人看的。** 每一格的圖必須在沒有文字的情況下講完那一格的事。做不到就換一件事講，不要加字補救。
2. **一件事，切成一連串格子。** 這不是版面構成，是敘事順序。格子有編號，必須照序讀。
3. **手工複製品，不是印刷品。** 三塊版對不準、油墨會漲開、每一刷都會漏掉一兩塊——這些不是瑕疵，是這個流派的**證據**。把它們做出來，並且把份號印在畫面上。
4. **押韻是功能，不是文采。** 上下兩句一樣長、末字同韻，是為了讓路過的人走出去以後還記得。
5. **速度即形式。** 四十分鐘要從電報變成貼在牆上的窗。任何需要慢慢畫的東西，這個流派都做不出來，也就不該出現。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1：連格敘事（4–14 格，一張紙，有編號，照序讀）

拿掉它就變成一張海報。ROSTA 窗永遠是一組序列：一張紙上切出 4 到 14 格，每格一個畫面加一行短句，
格與格之間是同一片墨色的縫（不是卡片之間的留白）。**不要做成三張圓角卡片。**

```css
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;background:#191512}
.cell{background:#DCCFB0;padding:16px 15px 15px;position:relative;min-height:210px;
      display:flex;flex-direction:column}
.cno{position:absolute;top:0;left:0;background:#191512;color:#DCCFB0;
     font-family:"Archivo Black";font-size:13px;padding:2px 8px 3px}   /* 格號，不可省 */
.cell figcaption{border-top:3px solid #191512;padding-top:9px;font-size:14.5px;font-weight:700}
```

判準：**遮住全部文字，讀者仍看得出「先發生什麼、後發生什麼」。**

### 特徵 2：模板剪影與橋（cut-out silhouette with bridges）

每一個圖都是**一塊被挖掉的形**：單一封閉外形、平塗、零描邊、零漸層、零陰影、零圓角修飾。
凡是封閉的內孔，都必須留一道**橋**接回外框——沒有橋，刻下來的紙會整塊掉出來。
橋在畫面上就是幾道糙紙色的橫斷，它是這個風格最快被認出來的東西。

```html
<svg viewBox="-4 -4 108 108" width="88" height="88" role="img" aria-label="模板・錢">
  <path d="M50 8a42 42 0 110 84 42 42 0 010-84z M32 34h36v8H32z M46 26h8v50h-8z"
        fill="#191512" filter="url(#ink)"/>
  <!-- 橋：糙紙色橫斷，2–3 道，必須錯開、微傾，不得等距 -->
  <rect x="-6" y="31.4" width="112" height="3.7" fill="#DCCFB0" transform="rotate(-1.5 50 31.4)"/>
  <rect x="-6" y="63.6" width="112" height="3.1" fill="#DCCFB0" transform="rotate(1.2 50 63.6)"/>
</svg>
```

橋的規矩：一塊版最少 1 道、最多 4 道；兩塊版的橋不得對齊（會在整面窗上拉出一條白線）。

### 特徵 3：三塊不透明專色版，永遠對不準

最多三塊版（朱、墨、靛），一塊版刷一遍。疊起來的地方**不會產生第四個顏色**——油墨不透明，
後刷的直接蓋住前面的。三塊版之間永遠有 2–5px 的固定錯位，而且**不准修正**：
對得準的版看起來像印刷廠印的，那就不是這個流派了。

```css
:root{--ox:3.4px;--oy:1.8px}         /* 這一刷的錯位向量 */
.ov{transform:translate(var(--ox),var(--oy))}   /* 錯位那一塊版 */
```

```html
<path class="ov" d="…" fill="#C42B1C" filter="url(#ink)"/>  <!-- 先刷的朱版，位移 -->
<path         d="…" fill="#274A87" filter="url(#ink)"/>  <!-- 後刷的靛版，蓋住它 -->
```

### 特徵 4：模板刻字（stencil-cut lettering）

標題、標語、品牌字必須被**同一組橋**橫斷——字跟圖是同一塊模板刻出來的，不能只有圖是模板、字是網頁字。
做法是把文字的填色換成一組硬邊條紋漸層，再用 `background-clip:text` 裁進字裡。條紋角度刻意不是 90°
（手刻的刀路不會是正的）。

```css
.st{
  color:transparent; -webkit-text-fill-color:transparent;
  background-image:repeating-linear-gradient(93deg,#191512 0 12px,transparent 12px 15px);
  -webkit-background-clip:text; background-clip:text;
  font-weight:900; letter-spacing:-.035em; line-height:.94;
}
@supports not ((-webkit-background-clip:text) or (background-clip:text)){
  .st{color:#191512;-webkit-text-fill-color:#191512;background:none}
}
```

**只用於大字**（≥22px）。正文一律是可選取、對比 ≥7:1 的一般 HTML 文字——這是原作不需要處理、
但網頁必須守住的一條紀律。

### 特徵 5：押韻的上下聯，加上這一份的編號

畫面底部一定有一條實色帶，裡面是兩行**字數相同、末字同韻**的話，且其中至少一句是叫人做一件事。
角落一定有編號——原作寫的是「ROSTA 753-4」「GPP 331-9」（窗號-格號）。
編號不是裝飾，它是這件東西的產製事實：這是第幾面窗、第幾格、第幾刷。

```css
.couplet{border-top:5px solid #191512;background:#C42B1C;padding:20px 22px 22px;
         display:flex;flex-direction:column;gap:6px}
.couplet .ln{font-size:clamp(26px,5.4vw,52px)}          /* 用 .st 刻字 */
.couplet .tag{font-family:"Archivo Black";font-size:11.5px;color:#F0E9D8;letter-spacing:.14em}
.stamp{position:absolute;right:14px;top:-3px;background:#274A87;color:#F0E9D8;
       font-family:"Archivo Black";font-size:12px;padding:6px 10px 7px;transform:rotate(1.6deg)}
```

---

## 三、色彩系統

模板印刷一塊版一個顏色，顏色數＝成本，所以色數是硬上限。

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 糙紙 | `#DCCFB0` | 唯一的地色——它是紙，不是背景色 | ~32% |
| 朱版 | `#C42B1C` | 第一塊版：要人注意的事、標語帶、現用態 | ~24% |
| 墨版 | `#191512` | 第二塊版：所有框線（5px）、正文、格縫、頁尾 | ~21% |
| 靛版 | `#274A87` | 第三塊版：大面積的形、說明區塊、頁外底 | ~14% |
| 模板洞白 | `#F0E9D8` | 「沒被刷到的地方」：卡片底、輸入框、深底上的字 | ~7% |
| 赭 | `#C08A2E` | 只給印記與深底上的強調 | ≤2% |

硬規則：

- **零漸層、零模糊陰影、零圓角、零材質。**投影一律是實心位移色塊（`box-shadow:6px 6px 0 #191512`）。
- 三塊版重疊處不得混色（不要 `mix-blend-mode:multiply`——那是活版透明油墨，不是模板不透明油墨）。
- 深底（朱／靛／墨）上的文字一律用洞白 `#F0E9D8`，不要用糙紙色（對紅底只有 3.6:1）。
- 邊框只有一種粗細語彙：外框 5px、卡片 4px、細分隔 3px。沒有 1px。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 中文全部 | Noto Sans TC | 900 標題／700 正文 | 手繪招牌字最接近的替身；不要用襯線 |
| 數字・拉丁・編號 | Archivo Black | 400 | 窗號、刷次、價錢、時刻。**所有數字都用它**，這是編號感的來源 |

級距（rem 基準 16px）：

```
巨標 clamp(26px,5.4vw,52px) / 章節 clamp(30px,4.6vw,50px) / 窗題 clamp(22px,3.4vw,34px)
正文 16px（行高 1.68） / 格內短句 14.5px / 表格 14.5px / 註 13px / 編號標籤 11–13px
```

- 標題一律 `letter-spacing:-.035em; line-height:.94`（字擠在一起，像刻出來的）。
- 編號一律 `letter-spacing:.02em`，不加千分位以外的裝飾。
- **不要用襯線體、不要用書法體、不要用等寬字**（等寬是終端機語彙，不是模板語彙）。

---

## 五、版面與網格

- 整頁是**一張貼在玻璃上的紙**：`max-width:1120px`、置中、`background:糙紙`，紙以外是靛色的窗外。
- 內容區左右內距 40px（≤900px 為 22px，≤560px 為 14px）。
- 主結構只有兩種：**連格區塊**（`grid`，3 欄／≤900px 2 欄／≤560px 1 欄）與**兩欄文字**（1.15fr / .85fr）。
- 旋轉只出現在「被手貼上去的東西」：導覽紙條 −2.2°／1.5°／−1.1°／2.4°，印記 1.6°。
  **內容本身永遠是正的**——模板是壓在紙上刷的，不會歪。
- 留白率約 20–26%。這個流派不是 horror vacui（那是迷幻海報），但也絕不留大片空白：
  空白的紙在一九一九年是浪費。

---

## 六、元件配方

**導覽（疊貼）**：四頁＝四張貼在同一塊玻璃上的紙條，彼此重疊。現用頁那張**貼在最上層**，
壓住其餘三張的角、翻成朱底、右上角多一枚圖釘。語意是層序：誰最新，誰蓋住誰。

```css
.paste{position:relative;width:352px;height:98px}
.slip{position:absolute;top:8px;width:104px;height:74px;background:#F0E9D8;border:3px solid #191512;
      padding:8px;transition:transform .16s cubic-bezier(.3,1.2,.5,1)}
.slip:nth-child(1){left:0;transform:rotate(-2.2deg);z-index:1}
.slip:nth-child(2){left:80px;transform:rotate(1.5deg);z-index:2}
.slip:nth-child(3){left:160px;transform:rotate(-1.1deg);z-index:3}
.slip:nth-child(4){left:240px;transform:rotate(2.4deg);z-index:4}
.slip.on{z-index:9;background:#C42B1C;transform:rotate(-.6deg) scale(1.05);box-shadow:6px 6px 0 #191512}
.slip:hover{transform:translateY(-5px) rotate(0deg)!important}
.pin{position:absolute;right:-7px;top:-7px;width:18px;height:18px;background:#274A87;
     border:3px solid #191512;border-radius:50%}
```

≤900px 攤平為四格等寬橫列（現用格仍是朱底），頁尾另備完整文字連結。

**按鈕**：實心墨塊，零圓角，hover 整塊翻朱。`padding:12px 20px;font-weight:900`。停用態是紙灰底。

**表單**：4px 墨框、糙紙底、focus 時框翻朱且底翻洞白。錯誤訊息是朱色粗體，直接寫「為什麼被擋下來」。

**表格**：3px 墨框、表頭墨底洞白字、偶數列洞白底。

**頁尾**：整條墨底，字用糙紙色，連結底線用赭色。

---

## 七、動效規則（四種，缺一不可）

| 類 | 名稱 | 觸發 | 具體值 |
|---|---|---|---|
| ambient | 日光掃玻璃 | 無 | 126px 硬邊洞白帶，`opacity:.1`，`translateX(0→1420px)`，24s linear infinite |
| ambient | 指讀棒逐格 | 無 | 一枚「指手」模板停在現用格右上；每 3.2s 前進一格，`transition:transform .42s cubic-bezier(.2,1.4,.4,1)` |
| input | 指到哪格就讀哪格 | hover / focus | 該格底翻洞白、指讀棒立刻跳過去，延遲 <100ms；ambient 暫停，離開後恢復 |
| transition | 刷版 brush-pull | 進頁／出結果 | `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`，**`steps(6,end)` 0.52s**，三塊版 stagger 90ms |
| signature | 刷次遞增 impression | 每一次瀏覽 | 見下 |

```css
@keyframes pull{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.pull{animation:pull .52s steps(6,end) both}
.pull.d1{animation-delay:.09s}
.pull.d2{animation-delay:.18s}
```

`steps(6)` 不可換成平滑補間——刷子是一段一段推過去的，不是淡入。

### 簽名動效：刷次遞增（impression count）

**每一次瀏覽就是把這面窗再手刷一份。**刷次存在 `localStorage`，跨頁累計、印在窗角上；
它是這一份複製品的序號，並且決定這一份長什麼樣：

```js
var RUN=(parseInt(localStorage.getItem('run')||'147',10)||147)+1;
localStorage.setItem('run',String(RUN));
var rnd=mulberry32(fnv1a('site/'+RUN));           // 同一刷永遠得同一份
document.documentElement.style.setProperty('--ox',(1.6+rnd()*3.6).toFixed(2)+'px');  // 朱版錯位
document.documentElement.style.setProperty('--oxb',(-4.2+rnd()*3.2).toFixed(2)+'px');// 靛版錯位
document.getElementById('inkm').setAttribute('radius',(0.6+rnd()*1.8).toFixed(2));  // 吃墨漲量
addMiss(document.querySelector('[data-miss]'));   // 這一刷漏掉的 1–3 塊白
```

規矩：**畫面上必須明講這件事**（「你手上這一份是第 148 刷，它跟第 147 刷不一樣」），
否則它就只是隨機裝飾。`prefers-reduced-motion` 下刷次照增、錯位與缺刷照樣不同——
那是印刷差異，不是動畫；停掉的只有刷子的動作。

**全站禁用**：淡入式滾動揭示、視差、數字滾動、跑馬燈、模糊陰影、彈跳緩動（`cubic-bezier` 過衝只准用在導覽紙條被掀起的那 .16s）。

---

## 八、插畫與圖像風格

`stencil-cut pictogram`：全站零外部圖片，所有圖像由一組固定的**模板象形字彙**組成。原語只有三種：

1. **剪影**：單一封閉 path、平塗、無描邊、無內部細節。內部要有東西，只能靠另一塊版疊上去。
2. **橋**：糙紙色橫斷，2–3 道，微傾（±1.2–1.5°），不等距。
3. **錯位鬼影**：同一個 path 換一個版色、位移 `var(--ox)`，先畫在下層。

字彙本身是**有限的**，而且要在網站上明講「我們總共只刻了 N 塊版，所有的圖都是這 N 塊排出來的」。
這條限制是模板印刷的經濟學，也是這個流派的資訊圖表血緣（Otto Neurath 與 Gerd Arntz 的 ISOTYPE
就是從這裡長出去的）。

判準：**拿掉顏色與文字，六格仍讀得出一件事的先後。**

明文禁用：細線幾何線描、半調網點、`feTurbulence` 手抖濾鏡、寫實描繪、任何漸層或光影。

---

## 九、Logo 與 Favicon

Logo ＝ 一個四格的窗（這個流派的本體：貼滿東西的那面玻璃），朱版位移在下、靛版壓在上，
四個洞是糙紙色，中間橫過一道橋。字用 `.st` 刻字。

Favicon 同構，32×32 內嵌 inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23DCCFB0'/%3E%3Cpath d='M6 5h21v21H6z' fill='%23C42B1C'/%3E%3Cpath d='M4 7h21v21H4z' fill='%23274A87'/%3E%3Cpath d='M7 10h7v7H7zM17 10h5v7h-5zM7 20h7v5H7zM17 20h5v5h-5z' fill='%23DCCFB0'/%3E%3Crect y='14' width='32' height='2' fill='%23DCCFB0'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先問「這件事拆成幾格」，再想版面。
- 每一格只講一件事，短句寫在圖下面，圖不靠文字才成立。
- 三塊版錯位、留橋、漏刷——把手工複製的證據做出來並標上份號。
- 大字用刻字（`.st`），正文用一般文字。
- 一定要有一句叫人今天做一件事的話。

**Don't**

- ✗ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ✗ 紫藍漸層、玻璃擬態、模糊陰影、`border-radius` 超過 0（圖釘的圓除外）
- ✗ emoji 當 icon（icon 一律是模板剪影）
- ✗ Lorem ipsum、AI 腔文案、「EST. 19xx」徽章
- ✗ 把錯位「修正」成對齊，或把 `steps()` 換成平滑補間
- ✗ 用刻字排正文（可讀性會死），或把三塊版做成半透明疊色
- ✗ 跑馬燈、視差、淡入式滾動揭示

---

## 十一、頁面骨架範例（可直接使用）

```html
<div class="sheet">
  <span class="sunbar" aria-hidden="true"></span>

  <header class="top">
    <a class="brand" href="index.html">
      <svg width="46" height="46" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M12 12h80v80H12z" fill="#C42B1C" transform="translate(4 3)"/>
        <path d="M12 12h80v80H12z" fill="#274A87"/>
        <path d="M22 22h26v26H22zM56 22h24v26H56zM22 56h26v24H22zM56 56h24v24H56z" fill="#DCCFB0"/>
        <rect x="4" y="46" width="96" height="4" fill="#DCCFB0" transform="rotate(-1.4 50 48)"/>
      </svg>
      <span><span class="bt st">品牌名</span><span class="bs">LATIN SUBTITLE</span></span>
    </a>
    <nav class="paste">
      <a class="slip" href="a.html"><span class="sn">01</span><span class="sl">頁名</span></a>
      <a class="slip on" href="b.html" aria-current="page"><span class="sn">02</span><span class="sl">頁名</span><span class="pin"></span></a>
      <a class="slip" href="c.html"><span class="sn">03</span><span class="sl">頁名</span></a>
      <a class="slip" href="d.html"><span class="sn">04</span><span class="sl">頁名</span></a>
    </nav>
  </header>

  <section class="window" data-miss id="win">
    <span class="stamp num">第 <span data-run>148</span> 刷</span>
    <div class="wmeta">
      <div>窗號　<b class="num">2317</b></div>
      <div>格數　<b class="num">6</b></div>
      <div>版數　<b class="num">3</b>（朱・墨・靛）</div>
    </div>
    <h1 class="wtitle st">這面窗在講什麼</h1>
    <div class="grid plate">
      <figure class="cell"><span class="cno">1</span>
        <div class="cart"><!-- 模板剪影 SVG --></div>
        <figcaption>這一格的一句話。</figcaption></figure>
      <!-- …共 4–14 格… -->
    </div>
    <div class="couplet plate">
      <span class="tag num">UP / 上聯 · 遙條韻</span>
      <span class="ln st h">高麗菜今早就到</span>
      <span class="tag num">DOWN / 下聯 · 同韻</span>
      <span class="ln st h">自己帶袋來得早</span>
    </div>
    <div class="pointer" aria-hidden="true"><!-- 指手模板 --></div>
  </section>
</div>
```

濾鏡定義放在 `<body>` 開頭（全站共用一份）：

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="ink" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
    <feMorphology id="inkm" operator="dilate" radius="1.1"/>
  </filter>
</defs></svg>
```

---

## 十二、技術實作與相容性

三項核心技術，分屬 A 渲染／D 輸入與感測／E 資料與生成三層。

### 1. `<feMorphology>`（A 渲染層）— 承載特徵 2 與特徵 3 的「油墨從模板孔漫出」

**它在本站承載什麼**：`operator="dilate"` 把每一塊剪影的邊向外推 `radius` 個使用者單位，
做出「刷子把墨壓進紙、邊緣漲開」的效果；`radius` 由當次刷次決定（0.6–2.4），
所以每一刷的墨色胖瘦不同。這件事用 `stroke` 做不到——描邊會在轉角產生接縫，而且會出現這個流派禁止的線；
`filter:blur()` 也做不到——模板印刷沒有柔邊。

**支援現況（2026-08-15 查證 MDN《feMorphology》與 caniuse）**：
Baseline **Widely available**，自 2015-07 起跨瀏覽器（Chrome/Edge、Firefox、Safari 全支援）。
`operator` 預設值為 `erode`，故必須明寫 `operator="dilate"`。
**Fallback**：SVG 濾鏡被停用或不支援時，`filter` 屬性整個被忽略，剪影仍以原始 path 平塗渲染——
形狀、顏色、橋與錯位全部保留，只少了墨的漲量。資訊零損失。

**注意事項**：`radius` 的單位是濾鏡座標系的使用者單位，不是 CSS px。本站 viewBox 為 108 單位、
渲染尺寸 88–104px，故 `radius=1.1` 約等於 0.9–1.06 CSS px。若把 SVG 放大顯示，radius 要同步調小。

### 2. Web Speech API `speechSynthesis`（D 輸入與感測層）— 承載這個流派的存在理由

**它在本站承載什麼**：ROSTA 窗是做給不識字的人看的，所以現場一定有人念。本站把「念」交給瀏覽器：
按下按鈕後，六格的短句與上下聯依序被合成語音念出來，而**每一段語音的 `onstart` 事件就是指讀棒前進的訊號**——
畫面的閱讀順序不由捲動或點擊決定，而由那個聲音決定。

**支援現況（2026-08-15 查證 MDN《Web Speech API》與 caniuse `mdn-api_speechsynthesis`）**：
`speechSynthesis` 與 `SpeechSynthesisUtterance` 在現行 Chrome/Edge（33+）、Firefox、Safari、
Opera、Samsung Internet 皆支援；IE、Opera Mobile 與舊版 Android 瀏覽器從未支援。
可用的語音（voice）清單由作業系統決定，`zh-TW` 語音**不保證存在**。
`utterance.onstart` / `onend` 支援良好；但 **`boundary` 事件並非 Baseline**（Chrome 桌機支援、
Android Chrome 不如預期，Safari 不提供 `charLength`），因此本站**刻意不使用 `boundary`**，
只用逐段的 `onstart` 做同步——這是本站在可行性上的主要取捨。

**Fallback（三層）**：

1. 沒有 `speechSynthesis`：改用節拍指讀，指讀棒以固定間隔走完同樣的順序，並在按鈕旁明寫
   「這台裝置沒有語音合成，改用節拍指讀，內容一字不少」。
2. 有 API 但沒有中文語音、或語音被系統靜音：另掛一支以字數估時的計時器同步推進指讀棒，
   畫面照走完；再加一支 `tot+4000ms` 的看門狗確保狀態一定收回。
3. `prefers-reduced-motion`：ambient 自動走格不啟動，按鈕仍可用，六格短句本來就是可選取的一般文字。

**另注**：語音必須由使用者手勢啟動（本站是一顆明確的按鈕），不自動播放；`getVoices()` 在部分瀏覽器
首次呼叫回傳空陣列，需搭配 `voiceschanged` 事件，本站在載入時先呼叫一次暖機。

### 3. `Intl.Segmenter`（E 資料與生成層）— 承載對句驗收與斷詞橋位

**它在本站承載什麼**：核心功能要驗「下聯字數是否與上聯相同」。中文用 `str.length` 會被
代理對（surrogate pair）與組合字算錯，`Intl.Segmenter(granularity:'grapheme')` 才是正確的字數。
另外以 `granularity:'word'` 把使用者對出來的下聯斷成詞——**詞縫就是刻版時要留的橋位**，
刻版員的回話裡會直接報「斷成 3 個詞，我在詞縫留 2 道橋位」。中文沒有空格，
這件事沒有 ICU 的斷詞資料是做不到的。

**支援現況（2026-08-15 查證 MDN《Intl.Segmenter》與 web.dev〈The Intl.Segmenter object is now part of Baseline〉）**：
Baseline **Newly available，2024-04-16**（三大引擎皆支援；Firefox 125 為最後一塊拼圖）。
較舊的裝置與瀏覽器不支援。
**Fallback**：`typeof Intl.Segmenter === 'undefined'` 時，字數退回 `Array.from(str).length`
（正確處理代理對，對中文結果相同），斷詞退回逐字切分——驗收規則完全不變，
只是橋位數會等於字數而不是詞數。功能可用性零損失。

### 效能預算實測（2026-08-15）

| 項 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline CSS/JS/SVG，未壓縮） | index 44KB／chuang 52KB／pan 48KB／she 32KB | ≤350KB |
| 外部資源 | 僅 Google Fonts 兩支字型；零圖片、零音檔、零函式庫 | — |
| 首屏 JS | 簽名 PRNG 與缺刷共 <60 次 DOM 操作；無 `getBoundingClientRect` 迴圈 | ≤100ms |
| 主要動畫 | 全部只動 `transform` 與 `clip-path`，不觸發 layout；ambient 僅 1 個元素 | 60fps |
| `feMorphology` | 靜態 `radius`，每次載入只設定一次，不逐幀動畫 | — |
| 對句驗收窮舉（Node 22 實測） | 六張事由牌的相異解分別為 13／60／16／14／38／24 | — |

無 `layout thrashing`：指讀棒每次移動只讀兩次 `getBoundingClientRect` 再寫一次 `transform`，
且只在 hover、語音段落切換與 3.2s 的節拍時發生。

---

*本規格書描述的是一個一九一九年的手工模板印刷媒介在網頁上的實作。它的每一條規矩都可以回推到
「刻一次、手刷三百次、給不識字的人看、四十分鐘要上牆」這四個生產條件——照著做，
就會長出這個樣子；不照著做，就只是配色像而已。*
