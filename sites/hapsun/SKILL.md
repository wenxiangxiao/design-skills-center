---
name: tactile-skeuomorphism
description: Single-light-source skeuomorphic UI where every surface declares a physical material — felt, card stock, brass, shell, glass — and every control is a raised object that sinks, glints and clicks when pressed.
---

# 擬物設計 Skeuomorphism — 觸感介面規格書

> 流派：**擬物設計 Skeuomorphism**（1998–2013）。源頭是 Apple 的 Aqua（Mac OS X 10.0, 2000）與 iOS 6 以前的系統 App：Game Center 的綠絨與木框、Notes 的黃色橫線紙、Podcasts 的盤帶機、Find My Friends 的縫線皮革、Calendar 的撕頁與釘孔；旁系是 Windows Vista/7 的 Aero 玻璃與 Android 2.x 的擬物控件。它在 2013 年 iOS 7 之後被扁平化取代，因此**它是一個有明確起訖、有代表作、可指名的流派**，不是「質感風」。
>
> 本規格書抽自範例站 **合順鈕釦行 HA̍P-SŪN**（鈕釦行 × 擬物設計），但**風格與產業分離**：任何產業都可套用。

---

## 一、設計哲學

擬物設計的主張只有一句：**介面是物件，不是圖層。**

扁平設計問「這個資訊要怎麼排」，擬物設計問「這個東西是什麼做的、它在光下長什麼樣、按下去會怎樣」。所以它的設計流程是反過來的——先決定材質與光，再決定版面。畫面上任何一塊沒有材質的區域，都是還沒做完的區域。

三條推論，寫死：

1. **全站只有一個光源，而且它不動。** 左上 315°。所有的亮邊在上、暗邊在下、投影往下偏右。一旦有兩個方向的光，畫面立刻塌成貼圖拼貼。
2. **凸起＝可按，凹陷＝可填，平的＝不能碰。** 狀態不靠顏色，靠幾何。這是擬物設計真正的可用性資產：使用者不需要學，手會告訴他。
3. **物件有重量、有厚度、有聲音。** 厚度寫在 `box-shadow` 的第一層（硬邊、零模糊、等於材質的實際厚度）；聲音用 Web Audio 合成，不同材質不同音色。

**常見誤解：** 擬物 ≠ 加圓角加陰影。圓角要小（2–6px，實物的倒角就是這麼小），陰影要有兩層（一層硬邊的「厚度」、一層柔邊的「落影」）。`border-radius:16px` 加一坨 `0 10px 40px rgba(0,0,0,.1)` 是 2020 年代的 SaaS 卡片，不是這個流派。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是擬物設計了。每一項都附可直接複製的片段。

### 特徵 1 ─ 單一光源三件套（上亮邊／下暗邊／落影）

光從左上 315° 來，全站不變。**每一個實體元件都必須同時具備**：內側上緣的高光、內側下緣的暗邊、外側向下的投影。這三件湊齊，元素才會從畫面裡「站起來」。

```css
/* 凸起的物件 */
.raised{
  border-radius:4px;
  box-shadow:
    inset 0 1.4px 0 rgba(255,255,255,.55),   /* 上緣受光 */
    inset 0 -1.6px 0 rgba(0,0,0,.34),        /* 下緣背光 */
    0 3px 0 #A08F74,                          /* 厚度：硬邊、零模糊 */
    0 6px 9px rgba(0,0,0,.45);                /* 落影：柔邊、往下 */
}
/* 凹陷的容器（輸入框、凹槽、量表） */
.sunken{
  border-radius:4px;
  box-shadow:
    inset 0 3px 9px rgba(0,0,0,.40),
    inset 0 -1px 0 rgba(255,255,255,.28);
}
```

### 特徵 2 ─ 每一塊面積都要宣告自己是什麼材質

**畫面上沒有「背景色」，只有材質。** 材質 ＝ 底色 ＋ 一層方向性紋理 ＋ 一層光澤梯度。純色平塗等於把這個風格關掉。零外部圖片時，用疊層 `repeating-linear-gradient` 就能做出絨、卡紙、拉絲金屬：

```css
/* 絨（檯面、深底） */
.felt{
  background-color:#24462F;
  background-image:
    repeating-linear-gradient(48deg,rgba(255,255,255,.030) 0 1px,transparent 1px 3px),
    repeating-linear-gradient(-42deg,rgba(0,0,0,.055) 0 1px,transparent 1px 3px),
    radial-gradient(128% 86% at 20% 4%,rgba(255,255,255,.13),transparent 58%),
    linear-gradient(#2C5439,#1A3324);
}
/* 卡紙（承載所有長文） */
.card{
  background-color:#C9C2B2;
  background-image:
    repeating-linear-gradient(90deg,rgba(0,0,0,.030) 0 1px,transparent 1px 4px),
    repeating-linear-gradient(0deg,rgba(255,255,255,.055) 0 1px,transparent 1px 3px);
}
/* 拉絲黃銅（軌、盤、機身） */
.brass{
  background-image:
    repeating-linear-gradient(90deg,rgba(255,255,255,.10) 0 1px,rgba(0,0,0,.05) 1px 2px),
    linear-gradient(#E2C98A,#B08D4A 38%,#8A6C33 52%,#C9A85E 70%,#7A5D28);
}
```

**規則：長文一律在「紙」上，不在「絨」上。** 深色材質是檯面，不是閱讀表面。

### 特徵 3 ─ 凸起與凹陷是狀態的唯一語言

hover、現用、選中、停用，全部用幾何表示，**不准用「換一個高亮色」**。按下的定義是明確的：往光源的反方向位移 1–1.6px，硬邊厚度收到 1px，內側的亮暗邊上下對調。

```css
.knob{ transition:transform .085s, box-shadow .085s; }
.knob:active{
  transform:translate(1px,1.6px);
  box-shadow:
    0 1px 0 var(--m-rim),
    0 2px 4px rgba(0,0,0,.45),
    inset 0 -1.4px 0 rgba(255,255,255,.32),  /* 亮邊翻到下面 */
    inset 0 2px 3px rgba(0,0,0,.42);          /* 暗邊翻到上面 */
}
```

### 特徵 4 ─ letterpress 字：文字壓在材質裡

文字永遠帶一道與光源相反的 1px 位移陰影。淺底用白色下影（凹刻感），深底用黑色上影。**沒有 letterpress 的字會浮在材質上面，整個物件就假了。**

```css
.lp  { text-shadow:0 1px 0 rgba(255,255,255,.62), 0 -1px 0 rgba(0,0,0,.14); } /* 淺底 */
.lpd { text-shadow:0 -1px 0 rgba(0,0,0,.62),      0 1px 0 rgba(255,255,255,.10); } /* 深底 */
```

### 特徵 5 ─ 接合痕跡：縫線、螺絲、鉚釘、模線

材質要被「做成東西」，就必須有加工痕跡。擬物設計的招牌是**縫線**（Find My Friends 的皮革）與**螺絲**（Aqua 的金屬窗）。這是最便宜也最有效的一招：一條內縮的虛線邊，整塊卡紙立刻變成一件縫製品。

```css
/* 縫線邊：任何卡片加這一條就成立 */
.stitched{ position:relative; }
.stitched::after{
  content:''; position:absolute; inset:8px;
  border:2px dashed rgba(70,56,30,.30); border-radius:2px; pointer-events:none;
}
/* 螺絲頭（自繪，零圖片） */
.screw{
  width:11px;height:11px;border-radius:50%;position:relative;
  background:radial-gradient(circle at 34% 30%,#EBD49A,#8A6C33 70%,#5E4720);
  box-shadow:inset 0 -1px 0 rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.25);
}
.screw::after{content:'';position:absolute;left:2px;right:2px;top:4.6px;height:1.6px;background:#4A3817;border-radius:1px}
```

---

## 三、色彩系統

擬物設計的配色不是色票表，是**材料表**。每個顏色都必須回答「它是什麼做的」。

| 色票 | 名稱 | 面積 | 用途（材料語意） |
|---|---|---|---|
| `#24462F` | 絨綠 felt | ≈34% | 唯一大面積底色。它是檯面，永遠帶纖維紋，永遠不是純色 |
| `#C9C2B2` | 卡紙灰 card | ≈24% | 所有長文、表格、面板。永遠帶縱橫紙紋 |
| `#F2EADA` | 貝母乳白 pearl | ≈14% | 介面元件的預設面材、高光、淺色控件 |
| `#B08D4A` | 黃銅 brass | ≈12% | 刊頭軌、托盤、機具、螺絲。永遠帶拉絲紋與一道高光帶 |
| `#22201C` | 墨 ink | ≈10% | 正文、邊線、孔 |
| `#2C5E93` | 鈷藍 cobalt | ≤6% | **唯一彩色語意**：連結、現用、可動作 |
| `#F0C24A` | 警示黃 amber | ≤3% | focus ring、進行中的量表 |

硬規則：

- **零純白、零純黑。** 最亮是貝母乳白，最暗是墨。純白只出現在 `rgba(255,255,255,α)` 的高光裡。
- **投影一律兩層**：硬邊厚度層（`0 Npx 0 <rim色>`）＋柔邊落影層。單獨一層柔影是 flat-design 的做法。
- **深底不放長文。** 需要在絨上放字，先鋪一塊卡紙。
- 換材質時，面材色、亮色、暗色、邊圈色四個一起換，**不可以只換一個**——否則光源會錯。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 用途 |
|---|---|---|---|
| 標題／標籤／數字 | **Lato**（2010，humanist sans，與流派同代） | 700 / 900 | h1–h3、英文小標、料號、數值 |
| 正文（中日韓） | **Noto Sans TC** | 400 / 500 / 700 | 所有中文 |

```css
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Noto+Sans+TC:wght@400;500;700&display=swap');
:root{
  --ttl:'Lato','Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif;
  --body:'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif;
}
```

字級階梯（px）：`25 / 23 / 17 / 15.5 / 13.6 / 13.2 / 11.5`，正文行高 **1.78**（擬物介面的行高偏鬆，因為每一塊都有材質，太密會糊）。

**英文小標一律大寫 + `letter-spacing:2.4–3.4px`**——這是 Aqua 時代面板標籤的做法（`HOW THIS CARD WORKS`）。

**明文禁用等寬字。** 數字對齊用 `font-variant-numeric:tabular-nums`，不要用 monospace——mono 會把畫面拉向工程製圖風，那是另一個流派。

---

## 五、版面與網格

- 容器 `max-width:1100px`，左右 gutter 22px（手機 13px）。
- 主結構：**主欄 `minmax(0,1fr)` ＋ 側欄 `300px`**，側欄 `position:sticky; top:16px`——側欄是「托盤／工作面板」，必須跟著使用者走。
- 區塊間距 28px；區塊本身是卡紙面板，`padding:26px 28px`。
- **圓角 2–6px，一律不超過 6px。** 6px 以上就變成 2020 年代的 App 卡片。
- 留白不是空白：任何超過 240px 的空區必須有材質（絨或卡紙），否則畫面會破。
- 響應式：≤900px 側欄落到主欄下方並取消 sticky；≤560px 全部單欄，導覽四格等分撐滿一列。

---

## 六、元件配方

### 導覽（nav）

四個「物件」排在一條卡紙上，**現用頁的那一個被縫住／鎖住**（不是被高亮）：現用態 `translateY(1.5px)`、落影從 5px 收到 1px、並疊一層縫線 SVG。未選的 hover 時被提起 `translateY(-2.5px) rotate(-3deg)`。

### 按鈕（兩型）

```css
/* 圓鈕 */
.knob{
  border:0;border-radius:50%;cursor:pointer;
  background:radial-gradient(circle at 33% 27%,var(--m-hi),var(--m-face) 47%,var(--m-lo) 100%);
  box-shadow:0 var(--m-depth) 0 var(--m-rim),
             0 calc(var(--m-depth) + 3px) 9px rgba(0,0,0,.45),
             inset 0 1.4px 0 rgba(255,255,255,var(--m-gloss)),
             inset 0 -1.6px 0 rgba(0,0,0,.34);
}
.knob::after{ /* 上緣的橢圓反光，這是玻璃／塑膠的招牌 */
  content:'';position:absolute;left:14%;top:11%;width:52%;height:34%;border-radius:50%;
  background:linear-gradient(rgba(255,255,255,calc(var(--m-gloss) * .85)),transparent);
}
/* 條鈕 */
.bar{
  border:0;border-radius:5px;padding:9px 18px;cursor:pointer;
  background:linear-gradient(var(--m-hi),var(--m-face) 52%,var(--m-lo));
  text-shadow:0 1px 0 rgba(255,255,255,.5);
  box-shadow:0 var(--m-depth) 0 var(--m-rim),0 calc(var(--m-depth) + 3px) 8px rgba(0,0,0,.4),
             inset 0 1.2px 0 rgba(255,255,255,var(--m-gloss)),inset 0 -1.2px 0 rgba(0,0,0,.3);
}
```

### 卡片／面板

卡紙材質（特徵 2）＋ 三層陰影（特徵 1）＋ 縫線邊（特徵 5）。標題用「英文小標大寫在上、中文大標在下」的雙層寫法。

### 表單／凹槽

輸入框、量表、托盤一律 `.sunken`。量表的填充色用 `linear-gradient(90deg,<暗金>,<亮金>)`，外框 `inset 0 1px 3px rgba(0,0,0,.6)`。

### 頁尾

一塊卡紙，三欄（聯絡／頁面／資源），`font-size:13.2px`。**頁尾必須有完整的文字連結**——這是所有「物件式導覽」的保底。

---

## 七、動效規則（四種，缺一不可）

| 類 | 名稱 | 觸發 | 具體值 |
|---|---|---|---|
| ambient | **珠光遊移** | 無需輸入，持續 | `@keyframes sway{0%{transform:rotate(-13deg)}100%{transform:rotate(16deg)}}`，14s `ease-in-out infinite alternate`。**只作用在會產生虹彩與折射的材質**（貝殼、玻璃）；拉絲金屬的反光帶方向固定、樹脂與角沒有光澤層，皆不動——這是材質知識，不是裝飾 |
| input-driven | **按下即凹** | `:active` / `pointerdown` | 85ms `cubic-bezier(.3,.9,.32,1)`，位移 `translate(1px,1.6px)`，亮暗邊對調，同時 Web Audio 發出該材質的音（延遲 <20ms） |
| transition | **翻面** | 換狀態／看卡背 | `rotateY(180deg)`，620ms `cubic-bezier(.36,.86,.3,1)`，容器 `perspective:1400px`，`backface-visibility:hidden` |
| signature | **換材質改介面** | 使用者選一個商品 | 六個 `@property` 註冊屬性（`--m-face/--m-hi/--m-lo/--m-rim/--m-depth/--m-gloss`）同時補間 520ms，每個元件 `transition-delay: calc(var(--i) * 52ms)` 逐一換過去；按鍵音色一併換 |

**逐元件錯時的寫法**（關鍵：延遲只能加在材質屬性上，不能加在按下的 `transform` 上）：

```css
.knob{
  --i:0; --d:calc(var(--i) * 52ms);
  transition-property:--m-face,--m-hi,--m-lo,--m-rim,--m-depth,--m-gloss,transform,box-shadow;
  transition-duration:.52s,.52s,.52s,.52s,.52s,.52s,.085s,.085s;
  transition-delay:var(--d),var(--d),var(--d),var(--d),var(--d),var(--d),0s,0s;
}
```

**降級（資訊零損失）：**

```css
@media (prefers-reduced-motion:reduce){
  svg .hl.lit{animation:none;transform:rotate(0deg)}   /* 光停在 315° */
  .flipinner{transition:none}                           /* 直接切換正反面 */
  .knob,.bar{transition-duration:0s,0s,0s,0s,0s,0s,0s,0s;transition-delay:0s} /* 材質瞬間套用 */
}
```

聲音**預設關閉**，必須由使用者按一個明確的開關啟動（同時滿足 AudioContext 的手勢要求）。

---

## 八、插畫與圖像風格

技法名稱：**釦材疊層構成（material-strata）**。原則是「物件不是被畫出來的，是被組裝出來的」——每一張圖都拆得出它由哪幾層材料疊成。四種原語：

1. **材質疊層**：底盤（金屬／樹脂）→ 面材（貝／布／玻璃）→ 邊圈斜切 → 孔或暗腳。每一層獨立可辨。
2. **珠光虹彩帶**：同心弧的 3–6 條低對比明暗帶 ＋ 一道斜切的高光弧。**不是一個圓形高光點**——圓點是塑膠球，弧才是貝殼。
3. **雙股棉線**：兩條相位差 `sin(i/n·5π)·1.05` 的折線疊成，看得出捻度。
4. **壓印小字**：料號與規格以 letterpress 壓在卡紙上。

判準：**拿掉全部顏色，仍讀得出這顆是幾孔、面材是哪一層、用什麼針法縫上去的。**

```
<!-- 珠光虹彩帶：核心三行 -->
<circle cx="50" cy="50" r="18" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="4.2"/>
<circle cx="50" cy="50" r="22" fill="none" stroke="#000" stroke-opacity=".08" stroke-width="2.6"/>
<g class="hl lit"><path d="M20 27 A 39 39 0 0 1 63 15" fill="none" stroke="#fff" stroke-opacity=".47" stroke-width="4.4" stroke-linecap="round"/></g>
```

明文禁用：照片、半調網點、細線幾何線描（thin-lineart）、feTurbulence 手抖濾鏡、扁平化的單色圖示。**icon 一律自繪、一律有材質。**

---

## 九、Logo 與 Favicon

Logo ＝ **一塊拉絲黃銅門牌 ＋ 兩顆螺絲 ＋ 一個貝母圓章**。門牌用五段 `linearGradient` 做出金屬的「亮—暗—亮」反光帶；店名做兩層位移（深色在後 +1px，亮色在前）＝ 刻字。

Favicon 用同一個圓章縮到 32×32，只留：貝母圓、邊圈、四孔、十字線。**一律 inline SVG data URI 寫在 `<head>`**：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='15' r='12' fill='%23F2EADA'/%3E...%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先定材質與光，再定版面。
- 每個互動元件都問一次：它凸起還是凹陷？按下去往哪邊沉？發什麼聲音？
- 深色材質當檯面，淺色材質當閱讀面。
- 把實物的接合細節放進來：縫線、螺絲、模線、拉絲。
- 陰影兩層：硬邊厚度 ＋ 柔邊落影。

**Don't**

- 不要：圓角 >6px、大面積模糊陰影、`rounded-2xl` 卡片牆。
- 不要：純色平塗的區塊（沒有材質＝沒做完）。
- 不要：用「高亮色」表示現用態——用凸起／凹陷／位移。
- 不要：兩個方向的光源；任何由右下往左上的高光。
- 不要：等寬字、emoji icon、Lorem ipsum、紫藍漸層、置中大標＋兩顆按鈕＋三張卡片。
- 不要：把 `filter:blur()` 當材質用——材質是紋理，不是模糊。
- 不要：忘記 `prefers-reduced-motion`：四種動效都要降級，且降級後資訊零損失。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜行號</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
<style>
@property --m-face{syntax:'<color>';inherits:true;initial-value:#F2EADA}
@property --m-hi{syntax:'<color>';inherits:true;initial-value:#FFFDF7}
@property --m-lo{syntax:'<color>';inherits:true;initial-value:#C9BDA6}
@property --m-rim{syntax:'<color>';inherits:true;initial-value:#A08F74}
@property --m-depth{syntax:'<length>';inherits:true;initial-value:3px}
@property --m-gloss{syntax:'<number>';inherits:true;initial-value:0.62}
/* …特徵 1–5 的片段… */
</style></head>
<body>
  <div class="mast"><div class="plate brass">
    <a href="index.html"><svg class="logo">…</svg></a>
    <div class="meta">地址／電話／<button id="sndbtn" class="snd"><i></i><span>聲音 關</span></button></div>
  </div></div>

  <nav class="nav"><div class="navcard card stitched">
    <a class="nb on" href="index.html" aria-current="page"><span class="hole">…釦 SVG…縫線 SVG…</span><span class="lbl">樣卡</span></a>
    <a class="nb" href="two.html">…</a>
  </div></nav>

  <div class="wrap">
    <div class="top">
      <div class="card stitched flipper"><div class="flipinner">
        <div class="face">…正面…</div><div class="back card">…背面…</div>
      </div></div>
      <aside class="tray card stitched">
        <div class="pan brass">…現用物件…</div>
        <dl><dt>料號</dt><dd data-fit="code">—</dd>…</dl>
        <button class="bar" style="--i:0">動作</button>
      </aside>
    </div>
    <section class="panel card stitched">
      <h2><span class="en">SECTION LABEL</span>中文標題</h2><div class="rule"></div>
      …卡紙上的長文…
    </section>
  </div>

  <footer><div class="foot card stitched">…三欄完整文字連結…</div></footer>
  <noscript>…關掉 JavaScript 仍完整可讀的說明…</noscript>
</body></html>
```

---

## 十二、技術實作與相容性

本風格由三項技術承載，**每一項都是被視覺特徵逼出來的，不是為了用而用**。

### 1. CSS Houdini Paint API（A 渲染層）— 承載「每一塊面積都是材質」

特徵 2 要求每個表面都有纖維／紙紋／拉絲。零外部圖片的前提下，`repeating-linear-gradient` 做得到「規律紋理」，但做不到**不重複、隨元件尺寸重算的有機纖維**。Paint worklet 以元件的實際 `PaintSize` 為畫布，用決定性 xorshift 灑纖維，因此大面積的絨不會出現肉眼可見的貼圖接縫。

- **支援現況（查證 MDN, 2026-09）：** MDN《CSS Painting API》標示 **Limited availability / Experimental — "not Baseline because it does not work in some of the most widely-used browsers"**。實務上：Chromium（Chrome/Edge 65+）支援；**Firefox 與 Safari 不支援**。
  來源：<https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API>
- **fallback 的具體行為：** 特徵偵測 `'paintWorklet' in CSS`，`addModule()` 以 **Blob URL** 註冊（維持單檔 HTML、零外部檔案），`.then()` 成功才在 `<html>` 加上 `paintok` class。**未支援時什麼都不做**——所有 `.felt / .card / .brass` 的多層 `repeating-linear-gradient` 底圖照常生效，材質、色彩、明暗結構完全一致，差別只是紋理會以 3–4px 的週期重複。任何一步 throw 都被 `try/catch` 吞掉，畫面回到 fallback。
- **注意：** `paint()` 只寫在 `html.paintok` 的規則裡，因此不支援的瀏覽器連解析都不會碰到它。

```js
var W="registerPaint('hs-surface',class{static get inputProperties(){return['--sf-kind']}paint(c,s,p){/* …xorshift 灑纖維… */}});";
if (typeof CSS!=='undefined' && 'paintWorklet' in CSS){
  try{
    var u=URL.createObjectURL(new Blob([W],{type:'text/javascript'}));
    CSS.paintWorklet.addModule(u).then(function(){document.documentElement.className+=' paintok';}).catch(function(){});
  }catch(e){}
}
```

### 2. CSS `@property` 註冊自訂屬性（B 動效與時間軸層）— 承載 signature

signature「換材質改介面」要在 520ms 內把六個材質參數**補間**過去。未註冊的自訂屬性是不可補間的字串，換材質只會瞬間跳掉。`@property` 把它們宣告成 `<color>` / `<length>` / `<number>`，於是漸層的色站、`box-shadow` 的厚度、高光的不透明度都能平滑動畫——**沒有它，這個 signature 就不存在。**

- **支援現況（查證 2026-09）：** Chrome/Edge 85（2020-08）、Safari 16.4（2023-03）、Firefox 128（2024-07）。屬於 **Baseline newly available**（預計 2027-01-09 進入 widely available）。
  來源：<https://developer.mozilla.org/en-US/docs/Web/CSS/@property>、web-platform-dx features explorer「Registered custom properties」
- **fallback 的具體行為：** 舊版瀏覽器忽略 `@property` 區塊；`element.style.setProperty()` 照樣生效，材質**瞬間**切換（無補間、無逐元件錯時），視覺結果正確、資訊零損失。

### 3. Web Audio 合成（D 輸入與感測層）— 承載「物件有聲音」

擬物設計的另一半是聽覺：iOS 6 的快門聲、鍵盤聲、鎖屏聲。本站不放任何音檔（零外部資源），六種材質各以「帶通／低通白噪 ＋ 0–3 條衰減正弦」即時合成：貝殼 3.2 kHz Q7 ＋ 2600/4100 Hz；金屬 1900/3300/5100 Hz 三泛音衰減 200ms；玻璃 5200/7400 Hz；樹脂與角為低通悶響；包布幾乎無聲。

- **支援現況：** Web Audio API 為 Baseline widely available（Chrome 35+／Safari 14.1+／Firefox 25+）。所有瀏覽器都要求 **使用者手勢**後才能離開 `suspended` 狀態。
  來源：<https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API>
- **fallback 的具體行為：** 若 `window.AudioContext` 不存在（或被策略封鎖），合成函式直接 `return`，不拋錯、不影響任何視覺。聲音一律由使用者按刊頭的「聲音」開關啟動，**預設關閉**。

### 4. 效能預算（實測）

| 頁 | 單檔大小（含全部 inline CSS/JS/SVG） | DOM 節點 | 首屏 inline script 執行 |
|---|---|---|---|
| 樣卡 index.html | 162.2 KB | 1,912 | 21.7 ms |
| 釦材 khoo.html | 101.4 KB | 1,249 | 6.7 ms |
| 包釦檯 pao.html | 71.4 KB | 599 | 4.6 ms |
| 行號 hang.html | 49.5 KB | 417 | 1.8 ms |

量測方法：於 jsdom 26（V8）載入頁面、移除 `<script>` 後重新注入並計時，即「不含 HTML parse 的腳本執行成本」。jsdom 的 DOM 操作明顯慢於瀏覽器，故此數值為**上界**。四頁皆遠低於 350 KB 與 100 ms 的門檻。

動畫成本：ambient 的珠光遊移是 SVG `<g>` 的 `transform:rotate`，同頁最多 24 個小節點，無 layout、無 paint 失效；signature 的材質補間由 `@property` 走 CSS 動畫路徑；按下的位移只動 `transform` 與 `box-shadow`。**全站無 `setInterval`、無捲動監聽、無 layout thrashing。** 包釦檯的手柄動畫是單一 `requestAnimationFrame` 迴圈，按放即結束。

---

*本規格書隨範例站「合順鈕釦行 HA̍P-SŪN」發行。風格與內容分離：SKILL 定義擬物設計的視覺語言，不綁定鈕釦業。*
