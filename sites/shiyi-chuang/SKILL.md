---
name: rosta-window-stencil
description: Soviet ROSTA Windows (1919–21) for the web — a multi-panel narrative grid of hand-cut stencil silhouettes with mandatory bridges, three flat mis-registered plates, rhymed captions cut from the same plate as the picture, sprayed edges on coarse grey-yellow paper.
---

# 羅斯塔之窗 ROSTA Windows 風格規格書

> 本規格書描述的是 **1919–1921 年蘇聯的「羅斯塔之窗」（Окна сатиры РОСТА / ROSTA Windows）**，
> 一種模板噴印（trafaret／stencil）的手工壁報，貼在空店鋪的櫥窗玻璃上。
> 起源：1919 年 2 月，畫家兼諷刺畫家 **Mikhail Cheremnykh（切列姆內赫）** 與記者 Nikolai Ivanov
> 在莫斯科一間空糖果店的櫥窗裡貼出第一張「把電訊稿畫出來」的窗；數週後詩人
> **Vladimir Mayakovsky（馬雅可夫斯基）** 加入，此後三年間產出約一千六百件設計。
> 製作條件（這才是風格的成因）：**沒有照片可用、一個晚上要做完、印量一百到三百份、顏色只有兩三塊模板**。
> 版式：一張紙分成 4–12 格的連環敘事，每格底下一到四行押韻短句。
> 血緣：上承俄國民間版畫 **lubok（盧布克）** 與集市說唱畫 **rayok**；下啟 1941–45 的 TASS 窗。
> 參照：Wikipedia《ROSTA windows》《Russian Telegraph Agency / TASS Windows》、
> Melton Prior Institut《The ROSTA Windows of the Bolshevik Art Army》（Alexander Roob）、
> Library of Congress "Hand stenciled Russian political posters"、V&A 館藏 O74913、
> 《Маяковский. Окна РОСТА и Главполитпросвета 1919–1921》。
>
> **本規格書借用的是它的媒材規格與版式，不是它的政治內容。**
> 這套語言真正在講的事情是：*當你不能用照片、只有一個晚上、只有三塊版，你要怎麼讓人一眼認出一件東西。*

---

## 一、設計哲學

**第一原則：畫面上的每一個形狀，都必須是一把刀割得出來的。**

模板是一塊蠟紙板，你把要上墨的地方割掉，噴漆穿過去。這件事帶來三個不能違反的後果：

1. 沒有線描——只有**面**。所有形象是平塗剪影，不是輪廓線。想畫細節？那就多割一個洞。
2. 沒有漸層、沒有半透明、沒有模糊——噴漆只有「有」跟「沒有」兩種狀態。
3. **凡是被墨包圍的板子都會掉下來**，所以到處是橋。橋是這個媒材留在畫面上的簽名。

**第二原則：資訊排成一排格子，一格一拍。**

不是「版面裡有幾張圖」，是**連環**：由左而右、由上而下，一格講一件事，格與格之間是實黑線不是留白。
這是把電訊稿（一天發生的事）翻譯成圖的格式，所以它天生適合任何「今天有這些東西要公告」的內容。

**第三原則：字跟圖是同一塊版割出來的，所以字必須夠粗。**

字不是圖說，它是畫面的下半部。粗、實心、押韻、兩行講完。
細字、襯線、斜體、字級層層遞減的「編輯排版」在這裡全部失效——那需要活字，而你手上只有一把刀。

**第四原則：套不準就讓它套不準。**

兩塊以上的版靠木框的定位釘對位，一定會差 1–3mm。**不修**。修準了畫面就死了，
而且「錯位的方向是固定的」正是同一個人做同一批窗的證據。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一條，貼出來的就不是這面窗了。

### 特徵 1｜多格連環窗：實黑分格線，三條橫桿貫穿整面

一張窗切成 4–12 格（最常見 6、8、12），格與格之間是 **6px 實黑線**，不是留白、不是細線、不是圓角卡片。
每格內部由上到下固定三層：**圖 → 韻句 → 註記**，而且這三層的分界線在**整面窗上是對齊的**——
它們是釘在同一個木框上的三條橫桿，不是每格各自長出來的。圖比較矮的那一格，下面就空著。

```css
.win{display:grid;grid-template-columns:repeat(4,1fr);
     grid-template-rows:repeat(9,auto);      /* 3 列 × 每格 3 層 */
     gap:6px;background:#191510;padding:6px;border:6px solid #191510}
.pane{background:#CFC2A2;display:flex;flex-direction:column}  /* 不支援 subgrid 時的保底 */
@supports (grid-template-rows:subgrid){
  .pane{display:grid;grid-row:span 3;grid-template-rows:subgrid}
}
.pane .vs{background:#191510;color:#E2D8BC;padding:7px 9px 9px;font-weight:900}
.pane .nt{padding:6px 9px 9px;font-size:11.5px;border-top:2px solid #191510}
```

### 特徵 2｜每一個洞都得留橋

被墨包圍的那一小塊板（眼白、鏡片、音孔、指孔、提把中間）四周都被割開了，它會掉下來。
所以每個島都要留一條 **3–4px 的橋**接回板身。橋印出來是一條**穿過黑色的白條**。
把橋修掉就不是模板了，那是向量剪貼畫。

做法：用 `fill-rule="nonzero"` 一條 path 解決——剪影順時針（上墨）、島逆時針（留板）、橋逆時針（切穿）。

```svg
<!-- 一顆有兩個眼睛的頭：外框 CW，眼睛 CCW，兩條橋 CCW -->
<path fill-rule="nonzero" fill="#191510"
  d="M10 10L110 10L110 120L10 120Z
     M30 35L50 35L50 55L30 55Z  M34 38.5L4 38.5L4 31.5L34 31.5Z
     M70 35L90 35L90 55L70 55Z  M86 31.5L116 31.5L116 38.5L86 38.5Z"/>
```

橋的方向可以用算的，不必手工指定：從島的形心朝 24 個方向試射，取**最快離開墨區**的那個方向。
若島本身已經跨出墨區（例如一條橫貫整個瓶身的白帶），它就不是島，**不要架橋**。

```js
// 射線與所有邊的最遠交點 → 超過它必在圖外；取最小者為橋的方向
function exitDist(polys,o,dx,dy){ /* 逐邊求交，回傳最大 t */ }
function bridgeDir(ink,hole){
  const c=centroid(hole); let best=null;
  for(let i=0;i<24;i++){const t=i/24*Math.PI*2,dx=Math.cos(t),dy=Math.sin(t);
    const L=exitDist(ink,c,dx,dy); if(L>0&&(!best||L<best.len)) best={dir:[dx,dy],len:L};}
  return best;
}
```

### 特徵 3｜三塊版，而且套不準

一面窗最多三塊版：**墨**（形與字）、**朱**（要你注意的那一個部位）、**赭**（角記與襯條）。
沒有第四塊——第四塊要多噴一次、多晾一次。
三塊版一定差 1–3px，方向固定不修；朱版永遠偏右上，赭版永遠偏左下。

```css
.p-red   {transform:translate(1.7px,-1.3px)}   /* SVG 內 px = user unit */
.p-ochre {transform:translate(-1.4px, 1px)}
.pane:hover .p-red  {transform:translate(5px,-3px)}  /* 把版分開給人看 */
.pane:hover .p-ochre{transform:translate(-4px,2px)}
```

朱與墨相疊處**不做透明混色**（那是活版透明油墨的語彙，不是噴漆）——後噴的那塊直接蓋掉先噴的。

### 特徵 4｜韻句與標題跟圖同版，所以字必須被割

- 韻句：兩行，粗體反白壓在黑條裡，直接貼在圖的正下方，不留邊距。短、具體、押韻。
  ✗「本物品為黑色長柄雨傘一支」　✓「雨一落就被抓在手，雨一停就被丟著走。」
- 標題：大字也是割出來的，所以**橋一樣要留**。用兩層不同週期、不同角度的
  `repeating-linear-gradient` 疊出橋條，避免變成規律的條碼。

```css
.cut{position:relative;display:inline-block}
.cut::after{content:"";position:absolute;left:-4px;right:-4px;top:-3px;bottom:-3px;pointer-events:none;
  background:
    repeating-linear-gradient(97deg,transparent 0 38px,#CFC2A2 38px 41.2px),
    repeating-linear-gradient(84deg,transparent 0 79px,#CFC2A2 79px 81.8px)}
/* ≤560px 只留一層、週期再放寬，避免細筆畫的漢字被切斷 */
@media (max-width:560px){
  .cut::after{background:repeating-linear-gradient(97deg,transparent 0 42px,#CFC2A2 42px 45px)}}
```

### 特徵 5｜灰黃粗紙、噴漆漏邊、沒有一條細線

底材是**灰黃粗紙 `#CFC2A2`**，不是白紙也不是米白。紙紋用兩層 0.5px 的
`repeating-linear-gradient` 交叉疊出即可——**不要用 `feTurbulence` 雜訊**（那是絹印／迷幻海報的語彙，而且會把字緣糊掉）。
噴漆會漏：每個剪影邊緣外 1.4–6px 灑八顆 0.45–1.5px 的實心點，位置由物件編號決定性算出，同一件永遠同一組噴點。

```css
.sheet{background:#CFC2A2;
  background-image:
    repeating-linear-gradient( 63deg,rgba(25,21,16,.060) 0 .5px,transparent .5px 3px),
    repeating-linear-gradient(152deg,rgba(25,21,16,.045) 0 .5px,transparent .5px 4px);
  box-shadow:6px 7px 0 rgba(0,0,0,.34)}   /* 實心位移投影，不准模糊 */
```

---

## 三、色彩系統

| 色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 粗紙 | `#CFC2A2` | 所有紙的地色；剪影的「白」就是它 | ~34% |
| 墨 | `#191510` | 第一塊版：剪影、韻句條、分格線、正文、表框 | ~30% |
| 朱 | `#C0301E` | 第二塊版：關鍵部位、連結、拒絕、現用態、刀口 | ~16% |
| 赭 | `#C98B1B` | 第三塊版：角記、漿糊痕、頁尾連結、次要強調 | ~7% |
| 玻璃 | `#6E6A5C` | 頁面底色（紙貼在它上面），不是「背景」是玻璃 | ~8% |
| 亮紙 | `#E2D8BC` | 反白字、按鈕面、表單欄位 | ~3% |
| 鋅板 | `#8C8474` | 模板板身（導覽片）、停用態 | ~2% |
| 深墨 | `#0E0B08` | footer | ~2% |

**硬規則**

- 全站零漸層（除了「玻璃天光」那條硬止點高光帶——那是玻璃不是印刷品）。
- 全站零圓角、零模糊陰影、零半透明色塊。投影一律實心位移色塊。
- 朱與赭永遠不直接相鄰於同一條邊界，中間必隔紙或墨。
- 長文一律在紙上（`#CFC2A2` 或 `#E2D8BC`），不在玻璃上——玻璃的對比不足以承載內文。
- 這不是「復古米白紙感」：墨的面積幾乎與紙相等（30% : 34%），畫面上必須有大塊實黑。

---

## 四、字體系統

| 角色 | 字體 | 字重／字級 |
|---|---|---|
| 中文全部（標題與內文） | `Noto Sans TC` | 標題 900、韻句 900、內文 500、表頭 900 |
| 數字、編號、拉丁標籤 | `Alfa Slab One`（400，僅此一重） | 編號 12–27px、大數字 24–34px |

- 標題字級 `clamp(31px,5.6vw,54px)`，字距 `-.035em`，行高 .96。**不要更大**——這個風格的識別性來自格子與剪影，不是巨型字。
- 韻句 15–19px / 900 / 行高 1.34，永遠反白壓在墨條裡。
- 內文 15–16px / 500 / 行高 1.66。
- 不使用襯線體、不使用斜體、不使用細字重（<500）、不使用等寬字（那是終端機語彙）。
- 拉丁字只用在編號與量測數字上，不寫拉丁標語。

---

## 五、版面與網格

- 頁面 = 一塊玻璃，上面貼著幾張**紙**（`.sheet`）。紙與紙之間留 14–26px 的玻璃。
- 每張紙用 `clip-path` 切出 0.4–0.8% 的歪邊（裁紙不會裁得直），兩種切法交替使用。
- 紙的四角有漿糊痕：`position:absolute` 的赭色半透明矩形，`rotate(-3.2deg)` 與 `rotate(2.4deg)` 各一。
- 窗的格數：桌機 4 欄、≤900px 2 欄、≤560px 1 欄；`grid-template-rows` 的數量隨欄數改為 9／18／36。
- 內容區左側留 96px 給模板導覽片；≤900px 時導覽改為頂部橫列，左內距歸零。
- 剪影在格子裡**不得撐滿**：`viewBox="0 0 100 100"`，形體佔 55–80%，四周留呼吸。

---

## 六、元件配方

**導覽（模板疊層 stencil-plate）**：四片鋅板疊在頁面左緣，每片一個編號。
現用頁那一片被**割穿**——編號變成朱紅（那是板子後面的漆），並有一條與板同色的橋橫過編號中段。

```css
.plate{width:66px;height:66px;background:#8C8474;border:3px solid #191510;
  font:400 27px/1 "Alfa Slab One",serif;color:#6B6455;box-shadow:3px 3px 0 rgba(0,0,0,.4)}
.plate[aria-current]{color:#C0301E;box-shadow:inset 0 0 0 3px #191510,4px 4px 0 rgba(0,0,0,.45)}
.plate[aria-current]::after{content:"";position:absolute;left:0;right:0;top:44%;height:5px;background:#8C8474}
```

**按鈕**：3px 實黑框 + 4px 實心位移陰影，按下時位移到 0；轉場一律 `steps(2)`（機械的，不是彈性的）。

```css
.btn{border:3px solid #191510;background:#E2D8BC;box-shadow:4px 4px 0 #191510;
  font-weight:900;padding:11px 15px;transition:transform .07s steps(2),box-shadow .07s steps(2)}
.btn:active{transform:translate(4px,4px);box-shadow:0 0 0 #191510}
```

**表格**：2px 實黑框線，表頭為墨底反白，偶數列 `rgba(25,21,16,.05)`。不要斑馬色、不要圓角、不要陰影。

**表單**：3px 實黑框、亮紙底；`:focus` 用 4px 朱紅 outline（不是發光、不是圓角）。
錯誤訊息以 8px 朱紅左邊條 + 900 字重朱紅字呈現，逐條列出，**指名是哪一欄、為什麼**。

**footer**：深墨底、赭黃連結、粗體頁名橫排。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 內容 | 參數 |
|---|---|---|
| ambient 環境 | 玻璃天光：一條硬止點高光帶掃過整個視窗，且它疊在紙的**上面**（玻璃在前、紙貼在玻璃內側），白色 8.5%／4.5% 兩道 | `position:fixed;z-index:4;pointer-events:none`，`linear-gradient(97deg,…)` 硬止點，`translateX(-13%→13%)`，46s linear infinite |
| input 輸入 | 三塊版分開：hover 任一格，墨不動、朱 `translate(5px,-3px)`、赭 `translate(-4px,2px)`，角落跳出「版：墨／朱／赭」 | 90ms `steps(2)`，延遲 <100ms |
| transition 轉場 | 貼窗 paste-on：每張紙由左上偏移 20/26px、傾 −1.7° 落定，過衝一次 | 300ms `cubic-bezier(.2,1.1,.3,1)`，窗延遲 40ms |
| signature 簽名 | **補刀 re-cut** | 見下 |

**補刀 re-cut**（本站簽名，全館唯一）：舊剪影疊在新剪影上方，一把 4px 的朱紅刀由左至右 `steps(5)` 掃過，
同時舊剪影以 `clip-path:inset(0 0 0 100%)` 被逐段抹掉，露出底下多割一道的新剪影。
補到第二刀時，朱版由右上 16px 滑進套準位置並過衝 −2.6px（**過衝而不回彈**，因為那是手推著版對位，不是彈簧）。

```css
@keyframes knife{to{clip-path:inset(0 0 0 100%)}}
@keyframes reg{0%{transform:translate(16px,-11px)}70%{transform:translate(-2.6px,1.8px)}
               100%{transform:translate(1.7px,-1.3px)}}
@keyframes blade{from{transform:translateX(-6%)}to{transform:translateX(104%)}}
.recut .old{animation:knife .26s steps(5) forwards}
.recut .p-red{animation:reg .3s cubic-bezier(.2,1.05,.35,1) both}
@media (prefers-reduced-motion:reduce){
  .recut .old{animation:none;clip-path:inset(0 0 0 100%)}   /* 直接是補完的樣子 */
  .recut .p-red{animation:none}.blade{display:none}
}
```

**一律禁用**：淡入式滾動揭示、視差、數字滾動、跑馬燈、`stroke-dashoffset` 描繪、彈性 easing 的回彈。
本風格的所有時間曲線不是 `steps()` 就是「一次過衝後停住」——刀是一下一下割的，版是用手推到定位的。

---

## 八、插畫與圖像風格

**唯一的圖像原語是「模板剪影」**：一組簡單幾何（矩形／橢圓／多邊形／膠囊）取聯集成剪影，
再挖島、架橋、灑噴點。全站沒有第二種畫法，logo、favicon、圖鑑、印記全部同源。

- 剪影必須**認得出來但認不太出來**——這是這個風格的張力來源。零細節的外框是起點，不是終點。
- 每件東西有三個刀階：**刀 0** 純外框 → **刀 1** 往裡割出結構（接縫、束帶、鏡片、指孔）→ **刀 2** 另開朱版標關鍵部位。
- 判準：拿掉全部文字，一個沒看過這件東西的人能不能指出它是什麼。指不出來就補刀，**不要加細線**。
- 圖案的隨機成分（噴點、印記格）一律走決定性偽隨機（FNV-1a → mulberry32），同一件永遠同一張圖。
- 禁止：照片、寫實描繪、線描外框、細於 2px 的線、圓角、漸層、雜訊濾鏡、emoji、半調網點。

---

## 九、Logo 與 Favicon

**Logo**：一條墨色橫條被三道紙色的橋切成四格，前三格各放一枚剪影（其中一枚用朱版），
第四格是一塊赭黃實色。字標壓在下緣，中文 900、拉丁小字距 2。
邏輯：logo 本身就是一面最小的窗——**四格、三塊版、被橋切過**。

**Favicon**（inline SVG data URI）：32×32，紙底 + 四塊 13×13 方格（其中一塊朱紅），
再用兩條 3px 的紙色橋橫豎切過整枚圖示。橋一定要有，否則縮到 16px 時就只是四個方塊。

---

## 十、Do & Don't

**Do**

- 先想「這一頁有幾件事要公告」，把它切成格，一格一件。
- 剪影先畫外框就好，等到有人認不出來再補刀——這也是內容策略。
- 韻句寫得具體、押韻、兩行講完；用動詞，不要用形容詞堆。
- 三塊版的錯位方向全站一致，並且明講給讀者看。
- 所有互動用 `steps()`；所有陰影用實心位移。

**Don't**

- ✗ 圓角、漸層、模糊陰影、半透明卡片、玻璃擬態。
- ✗ 用細線描邊補救「認不出來」——這是模板，不是插畫。
- ✗ 把橋修掉修乾淨。
- ✗ 用 `feTurbulence` 做手抖邊（別的流派的語彙，且會糊掉字緣）。
- ✗ 巨型標題當主視覺（首屏的主角是**格子**，不是字）。
- ✗ 米白紙感 + 細襯線 + 大量留白的「復古文青」處理——那會把它變成另一種站。
- ✗ 借用它的政治內容、旗幟、口號、領袖形象。借的是媒材與版式。

---

## 十一、頁面骨架範例（可直接使用）

```html
<body>
<nav class="rail">
  <a class="plate" href="index.html" aria-current="page">1<small>今日窗</small></a>
  <a class="plate" href="two.html">2<small>第二頁</small></a>
</nav>
<div class="wrap">
  <!-- 窗頭紙條：緊湊，不是 hero -->
  <section class="sheet a"><span class="paste"></span><span class="paste r"></span>
    <h1 class="bigtitle"><span class="cut">站名</span></h1>
    <div class="strip"><div><b>開窗</b>06:20–21:40</div><div><b>電話</b><span class="mono">06-274-1904</span></div></div>
  </section>

  <!-- 主角：連環窗 -->
  <section class="win">
    <article class="pane">
      <div class="fig"><span class="no mono">01</span>
        <svg viewBox="0 0 100 100"><g class="p-ochre"><path d="M100 100L84 100L100 84Z" fill="#C98B1B"/></g>
          <path fill-rule="nonzero" fill="#191510" d="…剪影 CW + 島 CCW + 橋 CCW…"/></svg></div>
      <div class="vs">兩行押韻的，<br>短句子。</div>
      <div class="nt"><strong>品名</strong>　拾獲地點　日期</div>
    </article>
    <!-- …其餘格… -->
  </section>
</div>
<footer>…</footer>
</body>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，各自承載一個不可省略的特徵。

### 1｜模板橋接演算法（E 資料與生成層，純 JavaScript）

承載**特徵 2**。多邊形聯集取剪影、島以反向纏繞挖空、橋以反向四邊形切穿，全部收在一條
`fill-rule="nonzero"` 的 path 裡。橋的方向由 24 方向射線的**最小離場距離**決定；
島若已跨出墨區則判定為「不需要橋」（`needsBridge()`），避免產生看不見的贅餘幾何。

- **相容性**：純幾何運算，只依賴 `Math` 與 SVG `path` 的 `fill-rule`，無瀏覽器 API 依賴，無支援缺口。
- **正確性驗證**（Node 22 實測）：以奇偶纏繞數採樣驗證——實體處 winding = −1、島內 = 0、橋上 = 0、圖外 = 0，符合預期。
- **效能實測**：20,000 次橋計算 18.0ms（約 0.0009ms/次）；24 件 × 3 刀階全部生成 **1.69ms**，path 字串總長 29.5KB。
  首屏的十二格窗在建置階段就已算完並寫成靜態 SVG，**執行階段零計算**。

### 2｜CSS Grid `subgrid`（C 版面與樣式層）

承載**特徵 1** 的「三條橫桿貫穿整面窗」。每一格 `grid-row:span 3` 且
`grid-template-rows:subgrid`，於是十二格的圖／韻句／註記三條分界線在整張窗上共用同一組軌道。
用巢狀 grid 或 flex 都做不到這件事——它們只能讓每格各自對齊自己。

- **支援現況**（2026-08-19 查證 MDN《Subgrid》、caniuse `css-subgrid`、web.dev《Baseline 2023》、
  web-platform-dx features explorer）：Firefox 71（2019）最早，Safari 16.0（2022），Chrome／Edge 117（2023-09-12）；
  **Baseline Newly available 2023-09-15，並於 2026-03-15 升為 Baseline Widely available**。
- **Fallback**：`.pane` 預設為 `display:flex;flex-direction:column`（無 subgrid 也完全可讀，只是各格自行對齊），
  再用 `@supports (grid-template-rows:subgrid)` 升級。資訊零損失。

### 3｜SVG `<feMorphology>`（A 渲染層）

承載**特徵 5** 的噴漆漫邊與刀口毛邊：`operator="dilate"` 把剪影外擴 0.3–0.6 個 user unit
模擬噴槍在模板邊緣漏過去的那一圈，`erode` 則用於刀口收縮的對照示範。

- **支援現況**（2026-08-19 查證 MDN《feMorphology》、caniuse `mdn-svg_elements_femorphology`）：
  **Baseline Widely available，2015-07 起跨瀏覽器**（Chrome/Edge/Firefox/Safari 全支援）。
- **Fallback**：不支援時濾鏡整個被忽略，剪影仍為完整硬邊剪影——本風格本來就以硬邊為主，
  漫邊只是質感增益，資訊零損失。**注意**：`radius` 請控制在 1 以內並只套在單一 path 上；
  大半徑的 `feMorphology` 是逐像素運算，套在整面窗上會掉幀。

### 效能預算（實測）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | index 34.7KB／renling 39.4KB／keban 73.3KB／guize 25.8KB | ≤350KB ✓ |
| 首屏 JS 執行 | index 首屏為靜態 SVG，JS 僅一支 0.9KB 的 localStorage 讀取；認領台一輪重繪 <2ms | ≤100ms ✓ |
| 主要動畫 | 只動 `transform` 與 `clip-path`，不觸發 layout；ambient 為單一 `translateX` | 60fps ✓ |
| layout thrashing | 無：不呼叫 `getBoundingClientRect`，不在動畫中讀取版面 | 無 ✓ |

### 無 JavaScript 時

- 今日窗：十二格全部為建置階段輸出的靜態 SVG 與 HTML，完整可讀可選取。
- 認領台：對局需要 JS；`<noscript>` 提供二十四件的完整清冊（品名／韻句／拾獲地點／編號）。
- 割版房：圖鑑靜態輸出於「一刀」狀態，五個特徵的說明與程式碼片段全部可讀。
- 招領規則：所有規則、費率與流程為靜態表格；掛失單改以電話與臨櫃辦理，並在頁面上明講。
