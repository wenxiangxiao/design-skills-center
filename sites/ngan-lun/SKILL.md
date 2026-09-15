---
name: dry-transfer-lettering
description: 1970s-80s dry-transfer (Letraset) sign shop language - rub-down display type that breaks where you did not burnish, hand-set drifting baselines, scalpel-cut screen-tone film with no continuous tone, and non-repro blue that is everywhere and never prints.
---

# 賽璐珞轉印 Dry Transfer Lettering

> 一九六一年 Letraset 在倫敦推出乾式轉印字（instant lettering）。一層乾的墨膜印在半透明載體片上，設計師把它對準鉛筆線，用壓桿或指甲從背面搓，被壓到的墨就離開載體、黏到紙上。到一九八〇年代照相排版普及以前，全世界的小型廣告社、唱片封套設計師、招牌佬與學生作業都是這樣排字的。同一家公司另外賣 Letratone：一卷有背膠的網點膜，用手術刀切一塊下來貼，那是當年唯一的「灰階」。
>
> 這份規格書描述的不是「復古粗黑體」，是**一種會用完的排版材料所留下的全部痕跡**。

---

## 一、設計哲學

1. **材料有限，而且看得見。** 一張轉印紙上每個字母的數量是固定的（E 很多，X 只有一兩個）。排一個就少一個。這不是裝飾性的設定，它應該真的影響版面：常用字排得起，罕用字排不起，排不起就換別的字母頂上。**版面是一份庫存報表。**
2. **不完美不是濾鏡，是因果。** 缺角出現在你沒搓到的位置，裂出現在你搓過頭的位置，字距歪是因為手放的。任何「隨機做舊」的雜訊濾鏡都是這個流派的反面——它把因果換成了氣氛。
3. **一塊牌上同時有好幾種筆跡。** 英數是轉印的、漢字是描的、正文是打字機打的。這不是風格混搭，是一九八一年的物理現實：轉印紙沒有漢字，打字機打不出 48pt。
4. **有兩種顏色：會印出來的，和印不出來的。** 非重現藍（non-repro blue）在版面上到處都是，但製版相機看不見它。它承載工序，不承載意義。
5. **不要柔化任何東西。** 沒有漸層、沒有模糊陰影、沒有連續調、沒有圓角、沒有反鋸齒過的邊。要厚度就用硬邊實色。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1｜字身缺角與裂紋，而且位置由「搓到哪裡」決定

拿掉它，剩下的只是一隻粗黑體。做法是給每個字母一層由多個「整塊不透明、只挖一個洞」的遮罩層疊成的遮罩，用 `mask-composite: intersect` 取交集——交集之後，洞的聯集被挖掉。

```css
.t{
  display:inline-block; position:relative;
  font-family:'Rubik Mono One',sans-serif;   /* 或任何 1970s 展示體 */
  -webkit-mask-image:var(--m); mask-image:var(--m);
  mask-composite:var(--mc);                   /* 每層一個 intersect */
  -webkit-mask-size:100% 100%; mask-size:100% 100%;
  -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat;
}
```
```html
<span class="t" style="
  --m:radial-gradient(circle at 7.1% 11.9%,#0000 0 10%,#000 10.9%),
      radial-gradient(circle at 92.4% 88.1%,#0000 0 6.4%,#000 7.3%),
      linear-gradient(104deg,#000 0 41%,#0000 41% 41.5%,#000 41.5%);
  --mc:intersect,intersect,intersect;">R</span>
```

規則：
- **洞偏角落。** 角落的墨膜與載體接觸面積最小，永遠最先失手。取樣範圍限在 `0–24%` 與 `76–100%` 兩段。
- **洞的數量與搓印程度成反比。** `n = round(1 + (1 - q) * 5)`，`q` 是覆蓋率。
- **裂只在 `q > 0.90` 才出現**（搓過頭），而且是一條 0.5% 寬的全幅直線，角度 60–130°，一個字母最多一條。
- **決定性。** 同一個字母在同一個位置永遠破在同一處：`seed = FNV1a(句子 + 字母 + 序號)`。重新整理不會換一張臉。

### 特徵 2｜手排基線漂移與光學字距

每個字母都是一個一個對著鉛筆線放下去的，所以每個字的基線差一點、每對字之間的空隙都不一樣。

```css
.t{ transform:rotate(var(--r,0deg)) translateY(var(--dy,0px)); }
/* 每字由 seed 決定：--r ∈ ±1.5deg，--dy ∈ ±1.6px。標題可放大到 ±2.2deg / ±2.6px */
.sp{ display:inline-block; width:.42em }   /* 空格也是手放的，不用字型的空格 */
```

- 漂移量要**看得出來但不礙讀**：±1.5° 是甜蜜點，超過 3° 會變成「故意歪」。
- 字距用負的 `letter-spacing`（−0.02em 上下）做光學收緊——當年的排字工會把字母擠到快要相碰。
- **現用／強調狀態不要用顏色，用對齊。** 對得住線的那一個就是現在這一個。

### 特徵 3｜三套刻痕系統同時在場

| 內容 | 工具 | 表現 |
|---|---|---|
| 英文大字、數字 | 轉印紙 | 1970s 展示體、有缺角、基線漂移 |
| 漢字 | 麥克筆／毛筆描 | 粗黑（900）、**沒有缺角**、每字重心不同（±1.25° / ±1.1px） |
| 正文 | 打字機 | 等寬體、14–15px、平、不歪、不破 |

```css
.hz{ font-family:'Noto Sans TC',sans-serif; font-weight:900; color:var(--marker);
     transform:rotate(var(--r)) translateY(var(--dy)); }  /* 漢字：不套遮罩 */
body{ font:400 15px/26px 'Courier Prime','Noto Sans TC',monospace; }
```
漢字的墨色要比轉印墨**暖一點、淺一點**（`#26201C` vs `#17161A`）——那是麥克筆不是印刷墨。

### 特徵 4｜零連續調：所有的灰都是一片有直邊的網點膜

網點膜是用手術刀切下來貼的，所以：

1. **邊永遠是直的。** 它蓋不住底下那條圓弧，永遠會多一塊或少一塊。
2. **全站同一個網角、同一個網距。** 一家店只有一卷膜。轉了角度貼＝錯，會起摩爾紋。
3. **只有三到四級**（20% / 40% / 60%），沒有中間值，沒有漸層。
4. **每一片留一隻掀起的角。**

```svg
<defs>
  <pattern id="t40" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <circle cx="3.5" cy="3.5" r="1.55" fill="#17161A"/>
  </pattern>
</defs>
<!-- 直邊的膜，蓋在圓弧形狀上面，故意不對齊 -->
<circle cx="160" cy="258" r="30" fill="none" stroke="#17161A" stroke-width="5"/>
<g clip-path="url(#shape)">
  <polygon points="118,150 402,144 408,198 124,204" fill="url(#t40)"/>
  <polygon points="118,150 402,144 408,198 124,204" fill="none" stroke="#17161A" stroke-width=".8" stroke-opacity=".55"/>
</g>
<!-- 掀起的角 -->
<polygon points="390,152 407,152 390,169" fill="#F3F1EA"/>
<polyline points="407,152 390,169" stroke="#17161A" stroke-width="1" fill="none"/>
<polyline points="404,153.5 391.5,166" stroke="#A9CDE8" stroke-width="1.6" fill="none"/>
```

### 特徵 5｜兩種顏色：會印出來的，和印不出來的

非重現藍是拷貝紙上的格線、鉛筆線、對位線與註記的顏色。製版相機影不到它，所以它**在成品上不存在**。

硬規則：
- **非重現藍一律不承載意義。** 不用它做強調、不用它做現用狀態、不用它做連結色。它只能是「工序的痕跡」：格線、對位線、尺寸註記、覆蓋率讀數、裁切記號。
- **反過來：任何有意義的東西都必須是會印出來的顏色**（墨黑、專色、網點膜）。
- 版面上非重現藍的面積要**多到你會注意到**（約 12%），否則這一條就白寫了。

```css
body{
  background:#F3F1EA;
  background-image:repeating-linear-gradient(to bottom,
    transparent 0 25px, #A9CDE8 25px 26px);   /* 拷貝紙的橫格：只有橫線，沒有方格 */
}
.note{ color:#6FA8D2; font-size:12.5px; padding-left:11px; border-left:2px solid #A9CDE8 }
```
**注意：**只用橫線，不要畫方格。** 方格會立刻讀成工程製圖／方格紙，整個流派就跑掉了。

---

## 三、色彩系統

| 角色 | 色票 | 比例 | 用途 |
|---|---|---|---|
| 拷貝紙白 | `#F3F1EA` | 30% | 唯一大面積底色；不是純白 |
| 拷貝紙暗階 | `#EAE7DD` | 6% | 表格隔行、次級塊面 |
| 非重現藍 | `#A9CDE8` | 8% | 橫格線、膜的掀角高光 |
| 非重現藍（深） | `#6FA8D2` | 4% | 鉛筆線、註記文字、裁切記號 |
| 轉印墨黑 | `#17161A` | 24% | 全部英數大字、3px 規線、網點膜的點 |
| 麥克筆暖黑 | `#26201C` | 6% | 全部漢字 |
| 螢光橘紅 | `#FF4B1F` | 9% | 第一專色：連結底線、現用、警示、前掣 |
| 電光青 | `#00A7C4` | 5% | 第二專色 |
| 芥末黃 | `#F2B705` | 5% | 第三專色：hover 底、汽水台 |
| 載體片藍 | `#2E5FA3` | 3% | 只在「那張紙」本身上出現 |

**硬規則**
- 零純白（最亮 `#F3F1EA`）、零純黑（最暗 `#17161A`）。
- 零色彩漸層。唯一允許的「漸層」是遮罩裡那條 0.9% 的硬邊（洞的邊緣）。
- 零 `filter:blur`、零 `box-shadow` 的模糊。要厚度就 `box-shadow:3px 3px 0`。
- 圓角上限 2px。
- 專色**最多三個**。一九八一年多印一個顏色要多一塊版；三個已經是老闆會唸你的數量。

---

## 四、字體系統

| 用途 | 字體 | 字重 | 字級 |
|---|---|---|---|
| 轉印大字 | Rubik Mono One（近 1970s Pump／Blippo 的等寬展示體） | 400 | `clamp(17px, 7.4vw, 74px)` |
| 正文（英數） | Courier Prime | 400 / 700 | 14–15px ／ 行高 26px |
| 漢字標題 | Noto Sans TC | 900 | 0.62em of 英文標題 |
| 漢字正文 | Noto Sans TC | 500 | 同正文 |

- **等寬的展示體是刻意的選擇**：替字（見第七章）換上去的字母不能讓版面位移，所以字身寬度必須一致。
- 字級只用四階：`74 / 34 / 17 / 14`。中間值一律不要——轉印紙一張只有一個字級，要別的字級要買別張紙。
- 行高鎖在拷貝紙的橫格上（`--rule: 26px`），所有垂直間距都是它的整數倍。

---

## 五、版面與網格

- **基線格 26px**，與背景的橫格線同一套。
- 兩條非重現藍的直欄界線壓在容器左右各 14px 處（`.pad::before/::after`），四角有裁切記號。**這兩條線不是內容欄，是紙的邊。**
- 版面不對稱：連續的區塊用 `margin-left: 0 / 8% / 18%` 錯開，模擬一張沒有欄位系統、靠目測排的稿紙。
- 表格是打字機打的：`border-collapse:collapse`、`thead` 下 3px 實線、其餘 1px、隔行底色 `#EAE7DD`。
- 手機 ≤560px：縮到單欄，導覽四格等寬撐滿，英文副標隱藏，展示字降到 `clamp` 下限。

---

## 六、元件配方

**導覽（baseline-set 基線落定）**——現用頁那一格是「已經搓平、貼齊鉛筆線」的，其餘三格還是手放的，歪出線外。**四格的顏色、大小、位置完全一樣，差別只有對齊。**

```css
nav li::after{ content:''; position:absolute; left:0; right:0; bottom:10px; height:1px;
  background:repeating-linear-gradient(to right,#6FA8D2 0 4px,transparent 4px 9px) }  /* 虛：還沒定 */
nav li.on::after{ background:#6FA8D2 }                                                 /* 實：定了 */
nav li.off a{ transform:rotate(var(--nr)) translateY(var(--nd)) }                       /* ±2.1deg / ±2.6px */
nav li.on  a{ transform:none }
```
無障礙：現用項一定要同時給 `aria-current="page"`，因為對齊差異對輔助科技不可見。

**按鈕**：2px 實框、無圓角、`background:#F3F1EA`，hover 換成芥末黃底。不用陰影。

**連結**：`border-bottom:2px solid #FF4B1F`，hover 加芥末黃底。不換字色。

**Footer**：3px 上框線，四欄打字機文字。

**「這張紙」紙條**（本流派的招牌元件）：上下 3px 框線，內含全部字母的存量格；用完的格反白（黑底、橘紅字）。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 是什麼 | 參數 |
|---|---|---|
| **環境 ambient** | 未貼牢的角：約 13% 的字母持續輕微浮動，像膜還沒完全黏死 | `rotate(+0.55deg) translateY(-0.9px)`、`6.5–11.5s`、`ease-in-out`、`infinite alternate` |
| **輸入 input-driven** | 用指甲再壓一下：hover／focus 整行字的洞縮小，字**變得更完整**（不是變亮） | `mask-size:100%→124%`、`mask-position:0→-12%`、`80ms linear` |
| **轉場 transition** | 換頁＝換一張紙：舊頁的大字往上離紙，新頁的大字搓下來 | `peel .22s ease-in` ／ `press .26s steps(4,jump-none)`；`steps()` 是因為搓是離散動作 |
| **簽名 signature** | **替字**：紙上某個字母用完，全站該字母當場換成倒轉的替代字 | `document.startViewTransition()` 包住 DOM 改動 |

```css
@keyframes lift{ from{transform:rotate(var(--r)) translateY(var(--dy))}
                 to  {transform:rotate(calc(var(--r) + .55deg)) translateY(calc(var(--dy) - .9px))} }
.tl:hover .t{ mask-size:124% 124%; mask-position:-12% -12% }
@view-transition{ navigation:auto }
::view-transition-old(root){ animation:peel .2s ease-in forwards }
::view-transition-new(root){ animation:press .24s steps(4,jump-none) forwards }
```

**替字表**（一九七〇年代招牌佬真的這樣做）

| 用完 | 改用 | 動作 | | 用完 | 改用 | 動作 |
|---|---|---|---|---|---|---|
| W | M | 轉 180° | | N | Z | 轉 90° |
| M | W | 轉 180° | | Z | N | 轉 90° |
| O | 0 | — | | U | C | 轉 −90° |
| I | 1 | — | | S | 5 | — |
| V | A | 轉 180° | | E | 3 | 反過來貼 |
| 6 | 9 | 轉 180° | | 2 | Z | — |

Q、X、J、K 沒有替代法。用完就是排不出來——照實留白，不要假裝。

**替換只發生在畫面上。** DOM 裡的字元不變，所以複製、搜尋、螢幕閱讀器讀到的永遠是正字：

```css
.t[data-sub]{ color:transparent }
.t[data-sub]::before{ content:attr(data-sub); position:absolute; left:0; top:0; width:100%;
  text-align:center; color:#17161A; transform:rotate(var(--sr,0deg)) scaleX(var(--sx,1)) }
```

**降級**：四種動效都要 `prefers-reduced-motion` 路徑，且資訊零損失——浮動停住（字的破口一樣在）、hover 變瞬間（效果一樣）、轉場關掉（頁面一樣到）、替字直接發生（結果一樣，只是沒有動畫）。

---

## 八、插畫與圖像風格（tone-film-cut 網點膜裁貼構成）

零外部圖片。所有圖像由三種東西組成，**不允許第四種**：

1. **輪廓**：4–5px 的實心墨線，封閉，等寬。這是麥克筆描的，不是細線幾何線描——它有重量。
2. **網點膜**：直邊多邊形填 `url(#t20|t40|t60)`，全部 `rotate(45)`、網距 7。邊緣加一條 0.8px、55% 不透明的墨線（刀痕）。
3. **專色平塗**：橘紅／青／黃的硬邊實色塊，沒有描邊漸層。

判準：**把任何一張圖放大，每一塊灰都必須是一片有直邊的膜；找不到任何一階中間調，也找不到任何一條漸層。**

明文禁用：照片、半調網點演算法（把連續影像二值化）、細線幾何線描、`feTurbulence` 假質感、扁平化單色圖示、任何發光、任何模糊陰影、任何把向量圖做舊的濾鏡。

---

## 九、Logo 與 Favicon

**Logo 的做法是：讓標誌本身就是一次失敗的轉印。**

銀輪的標誌是一個轉印時缺了三個角的大寫 `O`（一個輪）：重字重的橢圓環（`fill-rule:evenodd` 挖中孔）→ 套一層 `<mask>` 打三個洞與一條裂 → 環內右下角壓一片直邊的 40% 網點膜 → 中央四根橘紅軸心。字標放右邊，兩行，下面壓一條 4px 橘紅線與一行麥克筆漢字。

**Favicon**：inline SVG data URI，32×32。標誌在 16px 會糊，所以 favicon 用簡化版——實心圓、中央挖孔、四根橘紅軸心，沒有缺角（缺角在 16px 看不見，硬放只會變成髒點）。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='...' viewBox='0 0 32 32'%3E...%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 讓庫存真的會用完，而且讓使用者看得到剩幾個。
- 缺角由「哪裡沒搓到」決定，不要用亂數灑。
- 漢字用描的、正文用打字機打的、大字用轉印的——三套筆跡並置。
- 網點膜的邊是直的，而且故意蓋不準。
- 非重現藍到處都是，但什麼都不代表。

**Don't**
- 不要：用 `filter: url(#grunge)` 或雜訊貼圖做舊——那是氣氛，不是因果。
- 不要：給漢字加缺角——一九八一年沒有漢字轉印紙。
- 不要：畫方格紙——會立刻變成工程製圖。
- 不要：用顏色或亮度做現用狀態——用對齊。
- 不要：紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji 當 icon、Lorem ipsum、`EST. 19xx` 徽章、模糊陰影、圓角 > 2px。
- 不要：把缺角做到影響可讀——它是材料的痕跡，不是遊戲。單一字母的破口面積上限約 12%。

---

## 十一、頁面骨架範例

```html
<body data-page="index">
<i class="crop tl"><i></i><i></i></i><!-- 四角裁切記號，非重現藍 -->
<div class="pad">
  <header class="mast">
    <div class="sign">
      <span class="tl"><span class="t g0" data-ch="S" style="--r:-.41deg;--dy:-.63px">S</span>…</span>
      <span class="hl"><span class="hz" style="--r:.8deg">銀</span><span class="hz" style="--r:-1.1deg">輪</span></span>
    </div>
    <p class="sub">地址　電話　營業時間</p>
  </header>

  <nav class="set"><ul>
    <li class="on" aria-current="page"><a href="index.html">…</a></li>
    <li class="off" style="--nr:1.7deg;--nd:-2.1px"><a href="b.html">…</a></li>
  </ul></nav>

  <main>
    <section>
      <h2><span class="tl">…</span> <span class="hl">…</span></h2>
      <p>打字機打的正文。</p>
      <p class="note">印不出來的註記。</p>
    </section>
  </main>

  <div class="strip">           <!-- 這張紙還剩幾個字母 -->
    <div class="inv" id="inv"></div>
    <button id="newsheet">貼一張新紙</button>
  </div>

  <footer>…</footer>
</div>
</body>
```

**內容基準線**：所有營業資訊、價目、規則、表格一律寫成靜態 HTML。關掉 JavaScript 之後，唯一會少的是「庫存」這件事——所以每個字母都是完好的，紙永遠是新的。一個字都不會少。

---

## 十二、技術實作與相容性

### 1. `mask-image` 多層 ＋ `mask-composite: intersect`（A 渲染層）

**承載**：特徵 1 的全部。這是全站唯一讓「活的、可選取、可搜尋、螢幕閱讀器讀得到的文字」帶著缺角的手段——把字轉成圖片就失去這一切。

**為什麼是 `intersect` 而不是 `subtract` / `exclude`**：每一層寫成「整塊不透明、只挖一個洞」，交集之後剛好是「整塊不透明、挖掉所有洞」。`intersect` 是**對稱運算**，所以不必推敲多層遮罩的合成順序（規格是由最後一層往第一層合成，很容易寫反）。這個寫法在任何層數下都不會出錯。

**支援現況（查證：MDN《mask-composite》、caniuse `mdn-css_properties_mask-composite`）**：Baseline **Widely available**，2023 年 12 月起跨瀏覽器可用。未加前綴版本：Chrome 120+、Edge 120+、Firefox 53+、Safari 15.4+、Samsung Internet 25+。
**不寫 `-webkit-mask-composite`**：舊 WebKit 的同名屬性用的是另一套關鍵字（`source-in`／`xor`），語意不同，寫進去反而會在部分舊版把字整個切掉。只寫標準版，其餘用 `-webkit-mask-image`／`-size`／`-repeat` 補。

**Fallback（實際行為）**：瀏覽器不認得 `mask-composite` 時，多層遮罩退回預設的 `add`（聯集）＝整塊不透明 ⇒ **每個字母都完美無缺**。可讀性只會更好，版面尺寸完全不變。這是本流派少見的「降級後更清楚」的情況——不是壞掉，是另一個世界。

### 2. `PointerEvent.getCoalescedEvents()`（D 輸入與感測層）

**承載**：排字檯的搓印。釋放量＝你真正搓過的路徑長度，逐格累進到 8×10 的覆蓋場；洞的位置就是覆蓋率低於 55% 的那幾格，裂則是某幾格超過 260%。沒有子取樣的話，搓得快就會跳格，覆蓋場會出現物理上不存在的空白。

**支援現況（查證：MDN《PointerEvent: getCoalescedEvents()》、caniuse `mdn-api_pointerevent_getcoalescedevents`）**：MDN 明載 **不是 Baseline**（"does not work in some of the most widely-used browsers"），且僅在 secure context 可用。caniuse 全球支援 **94.84%**：Chrome 58+、Edge 79+、Firefox 59+、**Safari 18.2+**（2024-12）、Safari on iOS 18.2+、Samsung Internet 7.2+。

**Fallback（實際行為）**：`ev.getCoalescedEvents ? ev.getCoalescedEvents() : [ev]`，再以上一點與本點做直線內插。覆蓋場略粗（快速揮動時每幀只有一段直線而不是實際曲線），缺角會少一兩處，**玩法、規則與判定完全相同**。無指標裝置時另有完整鍵盤路徑：方向鍵移位、Enter 放下、按住空白鍵以 0.72 覆蓋／秒等速搓、放開定稿。

### 3. View Transitions API（B 動效與時間軸層）

**承載**：轉場動效（換頁＝換一張紙）與簽名動效（替字時舊字離紙、新字搓落）。

**支援現況（查證：MDN《ViewTransition》）**：`ViewTransition` 介面標示 **Baseline 2025 Newly available**（2025-10 起跨瀏覽器可用）；同文件（SPA）的 `document.startViewTransition()` 為 Chrome/Edge 111+、Firefox 133+、Safari 18+。跨文件（MPA）的 `@view-transition { navigation: auto }` at-rule **仍是 Limited availability、明確不是 Baseline**（Chromium 與 Safari 18.2+ 支援，Firefox 尚未於穩定版開啟）。

**Fallback（實際行為）**：
- 跨文件：`@view-transition` 不被認得時整條規則被忽略 ⇒ 一般的即時跳頁，內容零損失。
- 同文件：`if (document.startViewTransition && !reducedMotion) {…} else { commit() }` ⇒ 替字直接發生，結果完全相同。
- `prefers-reduced-motion: reduce` 時一律走 `commit()` 並以 `::view-transition-*{animation:none!important}` 收尾。
- 為避免 `view-transition-name` 必須全域唯一造成衝突，一次最多替 14 個字母命名（`sw0…sw13`），其餘同一幀直接改；轉場結束後把名字清掉。

### 4. 效能預算（實測）

| 項目 | 實測 | 預算 |
|---|---|---|
| 600 個字母的遮罩字串生成（Node 22） | **4.35 ms**，平均 182 字元／字 | — |
| 單頁大小（含全部 inline CSS／JS／SVG，零外部圖片） | index 60 KB／sessions 43 KB／bench 52 KB／sheet 63 KB | ≤ 350 KB |
| 首屏 JS（庫存結算＋替字掃描，約 120 個 `.t` 節點） | 一次 `querySelectorAll` ＋ 線性走訪，無 layout 讀取 | ≤ 100 ms |
| 動畫 | 只動 `transform` 與 `mask-size`／`mask-position`，不讀任何幾何，無 layout thrashing | 60fps |
| 外部資源 | 只有 Google Fonts 三支（Rubik Mono One／Courier Prime／Noto Sans TC） | — |

**注意事項**
- 遮罩是**逐字**的，所以只給展示級字級用。正文一律不上遮罩——那既是效能考量，也是史實（正文是打字機打的）。
- `mask-size` 的過渡在部分瀏覽器不是合成執行緒屬性，所以 hover 的 80ms 是刻意壓短的；不要做 300ms 的柔化。
- 庫存狀態存 `localStorage`，存取一律包 `try/catch`；隱私模式或配額滿時退化為「本次造訪內有效」，紙照樣會用完，只是關掉分頁就回到新的一張。

### 5. 其他（非核心技術）

`SVG <pattern>` 平鋪（網點膜）、FNV-1a 決定性雜湊（缺角與漂移的 seed）、URL 狀態序列化（`?set=` 分享你排的那塊牌）。這三項都沒有支援疑慮，也不是本站視覺的主要承載者。
