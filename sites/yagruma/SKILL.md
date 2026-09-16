---
name: cartel-cubano-serigrafia
description: Cuban silkscreen poster style — three flat spot inks on cane paper, outline-free cut silhouettes, fixed misregistration crescents, and bitten hand-cut display lettering.
---

# 古巴絹印海報 Cartel Cubano（ICAIC／OSPAAAL 絹印）

> 一句話：**三罐墨、一張甘蔗紙、沒有一條輪廓線。第四個顏色不是調出來的，是兩塊版壓在同一個地方疊出來的。**

## 流派來歷

一九五九年之後的哈瓦那出現一種世界上獨一無二的海報語言。ICAIC（古巴電影藝術與工業學會）自一九六〇年起為每一部在島上上映的片——包含大量外國片——重新設計海報，設計師如 Eduardo Muñoz Bachs、René Azcuy、Antonio Fernández Reboiro、Raúl Martínez，一輩子畫了幾千張；同一時期 OSPAAAL 的海報由 Alfredo Rostgaard、Olivio Martínez 等人設計，以絹印（serigrafía）印在便宜的紙上，摺四摺夾進雜誌寄到世界各地。

它之所以長成那個樣子，原因幾乎全是物質性的：

1. **買不到照相製版的材料，也買不起四色印刷。** 於是沒有網點、沒有連續調，只能是平色。
2. **絹印一次上一個顏色，一個顏色就是一塊版、一罐墨、一整天。** 於是顏色數是預算，三色是常態，四色是奢侈。
3. **手工對版對不準。** 於是疊色的邊緣永遠露著一條單色的月牙，而所有人都接受了它。
4. **照排機很少，字要用手畫。** 於是展示字是被畫出來的——會互相咬合、會為了填空而變形；而正文用打字機或鉛字，兩者形成極大的對比。
5. **貼在街上、貼在村子的水泥牆上。** 於是形要大、要在二十公尺外認得出來，於是剪影。

本 SKILL 描述的是這套**製程長出來的視覺語法**，不綁定任何題材，也不涉及任何真實機構的標誌或訊息。

---

## 本風格的 5 個不可省略特徵

> 每一項都是「拿掉它就不是這個風格了」的程度。片段可以直接複製。

### 特徵 1 · TRES LATAS｜三罐墨，其餘全部疊出來

一張海報只有 **三個專色 ＋ 一張紙的顏色**。第四、第五、第六個顏色**不准宣告**，只能由 `mix-blend-mode: multiply` 疊出來。這條規矩有一個機械式的驗收方法：把樣式表裡出現的色值列舉出來，只准有五個——紙面 #E9DCBC、紙上網目的谷 #DFD0AA，以及三罐墨 #DD5B21／#8AA627／#17130E。第六個值就是第四罐墨，而這間工坊沒有那罐墨。

```css
:root{
  --cana:#E9DCBC;      /* 紙 */
  --naranja:#DD5B21;   /* 墨一 */
  --verde:#8AA627;     /* 墨二 */
  --negro:#17130E;     /* 墨三 */
}
/* 混色必須被關在「這張紙」裡面，不能跟頁面背景亂疊 */
.hoja{ position:relative; isolation:isolate; background:var(--cana) }
.plancha{ mix-blend-mode:multiply }
.p1{ color:var(--naranja) } .p1 svg{ fill:var(--naranja) }
.p2{ color:var(--verde)   } .p2 svg{ fill:var(--verde)   }
.p3{ color:var(--negro)   } .p3 svg{ fill:var(--negro)   }
```

疊出來的顏色（本站實測值，可直接拿去做對比度計算）：

| 疊法 | 結果 | 對紙的對比度 |
|---|---|---|
| naranja / 紙 | `#CA4F18` | 3.33 : 1 |
| verde / 紙 | `#7E8F1D` | 2.64 : 1 |
| negro / 紙 | `#15100A` | 13.86 : 1 |
| naranja × verde | `#6D3304` | 7.24 : 1 |
| naranja × negro | `#120601` | 14.66 : 1 |
| verde × negro | `#0B0B02` | 14.53 : 1 |
| 三色疊 | `#0A0400` | 14.99 : 1 |

**推論（很重要）**：正文只能坐在 negro 那塊版上。橘與綠對紙只有 3.33 與 2.64，做標題可以，做內文不行。

### 特徵 2 · SIN CONTORNO｜沒有輪廓線的剪形

所有的形都是**實心平色剪影，零描邊**。形的邊界就是顏色的邊界。加上輪廓線，它立刻變成木刻、漫畫或技術插畫——因為輪廓線意味著「先有線再填色」，而絹印是先有色塊。

```css
/* 寫死，不要靠自律 */
.plancha svg *{ stroke:none }
```

```html
<!-- 形只用直線與圓弧接成 -->
<path d="M0 0L40 0A20 20 0 0 1 40 40L0 40Z"/>
<!-- 不要： -->
<path stroke="#17130E" stroke-width="3" .../>
```

附帶結果：兩個形之間如果需要一條「線」，那條線其實是**第三個形**——一條很窄的實心長方形。這也是為什麼這個流派的線看起來永遠比插畫的線重。

### 特徵 3 · EL REGISTRO｜固定的套印偏移與單色月牙

手工套版對不準，而且每一台架子有它自己固定的歪法。結果是：**任何一塊疊色的邊緣，一定露著一條只有單色的月牙**。不要修它——完美重合的疊色一看就是電腦做的，在這個流派裡它才是錯的那一個。

```css
@property --reg{ syntax:'<number>'; inherits:true; initial-value:1 }

.plancha{
  transform:translate(
    calc((var(--rx) + var(--ox)*(1 - var(--reg)))*1px),
    calc((var(--ry) + var(--oy)*(1 - var(--reg)))*1px));
}
/* --rx/--ry ＝成品上永遠存在的殘餘偏移
   --ox/--oy ＝分版時拉開的量（取殘餘偏移的十倍，方向一致） */
.p1{ --rx:0;    --ry:0;    --ox:0;   --oy:0   }
.p2{ --rx:3.5;  --ry:-2.2; --ox:35;  --oy:-22 }
.p3{ --rx:-2.8; --ry:3.1;  --ox:-28; --oy:31  }
```

`--reg: 1` 是成品，`--reg: 0` 是三塊版被拉開。把它接到一個 `<input type="range">` 上，使用者就可以自己把海報套準。

### 特徵 4 · PLANO ABSOLUTO｜絕對平色

一塊色從頭到尾同一個值。**零漸層、零網點、零中間調、零模糊陰影、零發光、零大圓角。** 空間感全部靠「誰蓋住誰」與「誰比較大」。

```css
/* 對 */
.caja{ border:4px solid var(--negro); background:transparent }
.btn:hover{ background:var(--naranja); color:var(--cana) }   /* 整塊反色 */

/* 錯 */
.caja{ box-shadow:0 8px 24px rgba(0,0,0,.2);
       border-radius:16px;
       background:linear-gradient(180deg,#fff,#eee) }
```

要一個灰？沒有灰這罐墨。灰只能是綠壓黑，或者把黑的形做小一點、讓紙露出來。**連「按下去的硬陰影」也不要**——那是紙盒與網頁的語言，不是絲網的。

### 特徵 5 · LETRAS MORDIDAS｜咬合的手繪展示字

片名是被「畫」出來的，不是被「排」出來的。字與字互相咬進去（負字距）、被壓扁拉長、為了填滿空白而歪一點，字腔封死。正文用完全相反的另一套字：規矩、窄、只負責說清楚事情。**這個對比越大越好。**

```css
.cartel-t{
  font-family:"Titan One", system-ui, sans-serif;
  text-transform:uppercase;
  letter-spacing:-.055em;
  word-spacing:-.06em;
  line-height:.84;
}
.cartel-t span:nth-child(2){ transform:translateY(.055em) scaleY(1.1) }
.cartel-t span:nth-child(3){ transform:rotate(-2.4deg) }
.cartel-t span:nth-child(5){ transform:scaleX(.86) }
```

西班牙文（或任何拉丁文字）**全大寫**是這個流派的常態——手繪大寫比手繪小寫快，而且二十公尺外讀得到。

---

## 設計哲學

1. **顏色數是預算，不是品味。** 先決定買得起幾罐墨，再決定畫什麼。三罐是這個流派的骨架。
2. **形比字先被看到。** 海報貼在街上，讀者是走路經過的人。所以一張海報只能有一個主形、一個主字，其餘都是附註。
3. **不完美是簽名。** 對不準的套印、刮刀的痕跡、紙的斑，全部保留。把它們修掉就等於宣稱這張紙不是人做的。
4. **不用照片。** 這個流派沒有照片，也沒有半調網點模擬的照片。要表現一個人，就剪一個人的形。
5. **空白是紙，不是留白。** 沒有被墨蓋到的地方就是甘蔗紙本身，它有顏色、有網目、有纖維，它不是「背景」。

## 色彩系統

| 角色 | 色票 | 比例 | 用途 |
|---|---|---|---|
| 甘蔗紙 caña | `#E9DCBC` | 約 30% | 唯一大面積底色。永遠帶 1px/4px 雙軸網目，**不存在平塗** |
| 紙的暗階 | `#DFD0AA` | 約 8% | 網目線、hover 底、表格斑 |
| 墨一 naranja | `#DD5B21` | 約 18% | 主形、片名、現用態、連結底線、focus ring |
| 墨二 verde | `#8AA627` | 約 15% | 次形、地點、場次 |
| 墨三 negro | `#17130E` | 約 18% | 全部正文、3–5px 實線、機具與人的剪影 |
| 疊色 | `#6D3304` / `#120601` / `#0B0B02` / `#0A0400` | 約 11% | **不宣告**，由 multiply 產生 |

**硬規則**

- 零純白（最亮 `#E9DCBC`）、零純黑（最暗 `#17130E`）。
- 零色彩漸層、零 `filter: blur`、零模糊陰影、零發光、零金屬。
- 圓角上限 3px（剪刀剪不出小圓角，除非那個形本來就是圓的）。
- 樣式表裡只准出現**五個色值**：紙面 `#E9DCBC`、紙上網目的谷 `#DFD0AA`、三罐墨 `#DD5B21`／`#8AA627`／`#17130E`。**第六個值就是第四罐墨，你沒有那罐墨。**
- 長文一律坐在紙上並且用 negro；橘與綠對紙的對比不足以承載內文。

換色時只要換三個 hex：這個系統對換墨的耐受度很高（例如 `#D8301C` 朱紅 ／ `#1B3E8C` 群青 ／ `#17130E` 也成立），**但不准增加成四色**。

## 字體系統

| 角色 | 字體 | 字重 | 用法 |
|---|---|---|---|
| 展示字 cartel | `Titan One`（Google Fonts） | 400（僅一個字重） | 片名、大標。全大寫、`letter-spacing:-.055em`、`line-height:.82–.9` |
| 標籤 rótulo | `Archivo` | 500 / 700 | 村名、表頭、數字、按鈕、導覽。全大寫、`letter-spacing:.09–.22em` |
| 正文 texto | `Noto Sans TC` | 400 / 700 | 繁體中文內文，`line-height:1.78` |

字級 scale（clamp，行動到桌機）：

```
海報片名  clamp(34px, 8.6vw, 108px)   line-height .82
頁面 H2   clamp(28px, 5.4vw, 54px)    line-height .94
村名      clamp(22px, 4.4vw, 46px)    line-height .90
正文      16px / 1.78
lead      17px / 1.78
標籤      10–14px / 1.2–1.5，letter-spacing .09–.22em
```

**不要**在正文用展示字；**不要**給展示字第二個字重（這個流派沒有 bold，強調靠大小與位置）。

## 版面與網格

- 海報本體是一個固定比例的框（`aspect-ratio: 1000/620` 桌機、`1000/860` 行動），內部用 **12 欄 × 5 列**的 grid，**三塊版共用同一組 grid**，所以元素跨版對齊。
- 圖（SVG）在每塊版裡 `position:absolute; inset:0`，文字在 grid 上層，兩者互不干擾。
- 頁面層級用 5px 實線分區、3–4px 實線分格，**無圓角、無陰影、無卡片**。
- 不對稱：片名靠左滿到第 10 欄，場次資訊推到右上角，底部一條資訊帶橫貫全寬。
- 留白規則：紙至少露出 28%，而且那些紙**必須連成一整塊**（碎白等於沒有白）。

## 元件配方

```css
/* 導覽：版數（現用頁三版都上了，疊出第四色） */
.nav ul{ display:grid; grid-template-columns:repeat(4,1fr) }
.nav li+li{ border-left:3px solid var(--negro) }
.nav a{ display:flex; gap:10px; padding:11px 12px;
        font:700 13px/1.2 "Archivo"; letter-spacing:.09em; text-transform:uppercase }

/* 按鈕：實框，hover 整塊反色，沒有陰影沒有圓角 */
.btn{ border:4px solid var(--negro); background:transparent; padding:13px 18px;
      font:700 13px/1 "Archivo"; letter-spacing:.12em; text-transform:uppercase }
.btn:hover{ background:var(--naranja); color:var(--cana) }

/* 「卡片」＝一個實框的盒子，不是圓角卡片 */
.caja{ border:4px solid var(--negro); padding:16px 18px }

/* 表格：只有橫線，3px 實線，hover 換紙的暗階 */
th,td{ border-bottom:3px solid var(--negro); padding:9px 10px; text-align:left }
tbody tr:hover{ background:var(--cana-s) }

/* 連結：3px 實底線，hover 整塊反色 */
a{ border-bottom:3px solid var(--naranja) }
a:hover{ background:var(--naranja); color:var(--cana) }

/* focus：4px 實線外框，用墨一 */
:focus-visible{ outline:4px solid var(--naranja); outline-offset:2px }
```

## 動效規則

這個流派的動態全部來自**印刷這件事本身**：墨會漂、刮刀會過、版會合。禁止淡入當主角，禁止視差，禁止彈跳。

| 類型 | 做什麼 | duration / easing | 觸發 |
|---|---|---|---|
| ambient 環境 | `deriva`：三塊版各自以不同週期微幅漂移（±0.8px），模擬手工套版 | 13s / 17s / 21s，`linear infinite` | 無，持續 |
| input-driven 輸入 | 拖曳海報或推套準尺改變 `--reg`；片單 hover 時圖記上移放大 | `<100ms`（直接設值，不加 transition）／`.13s` | pointer、鍵盤 |
| transition 轉場 | `rasero` 刮刀推墨：`clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`，由左至右刮出來 | `.52s cubic-bezier(.2,.7,.3,1)` | 進場、內容更新 |
| signature 簽名 | `la registrada` 分版／套準：全站所有圖與展示字都活在三塊可分離的版上，`--reg` 是一個跨頁保存的站台狀態 | 使用者控制（連續） | 拖曳／滑桿／`sessionStorage` |

```css
@keyframes deriva{
  0%{--dx:0;--dy:0} 25%{--dx:.7;--dy:-.5}
  50%{--dx:-.4;--dy:.8} 75%{--dx:.5;--dy:.4} 100%{--dx:0;--dy:0} }
@keyframes rasero{ from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0 0 0)} }

@media (prefers-reduced-motion:reduce){
  .p1,.p2,.p3{ animation:none !important }   /* 漂移停止 */
  .raser{ animation:none !important }        /* 不刮，直接在場 */
  .js .hoja[data-reg]{ --reg:1 }             /* 預設就是套準：疊印字直接可讀 */
}
```

**降級後資訊零損失**：漂移停止後，三塊版的偏移量以文字寫在版面上（`v2 +3.5,−2.2`）；刮刀轉場關掉後內容一次全在；`--reg` 預設 1，代表疊印才讀得到的那一行預設就是可讀的。

## 插畫與圖像風格

技法名稱：**剪形平塗疊印構成（cut-flat-overprint）**。

1. **形是實心平色剪影**，零描邊；邊界只由直線與圓弧（SVG `A` 指令）構成。
2. **一張圖最多三塊版**；第四色以上只能由 multiply 產生。
3. **每塊版有固定的套印偏移**，所以疊色邊緣永遠露著單色月牙，同一個形的三色不會完全重合。

驗收判準：把任何一張圖放大，(a) 找不到任何一條描邊；(b) 每一塊顏色都是絕對均勻的平色，沒有漸層、沒有網點、沒有中間調；(c) 每一個疊色區的邊緣都露著一條單色邊。

**明文禁用**：照片、半調網點、細線幾何線描、`feTurbulence` 假質感濾鏡、扁平化單色圖示、金屬漸層、任何發光、任何模糊陰影、任何做舊濾鏡。

母題建議：樹與葉（掌狀葉＝圓盤被 V 形缺口切開）、光錐（梯形）、屋頂天際線（折線多邊形）、人群（半圓＋梯形肩，尺寸不一）、機具（矩形＋圓＋錐）。**人一律只有輪廓，沒有五官。**

## Logo 與 Favicon 設計指南

- Logo 就是一張最小的海報：**一塊紙 ＋ 三塊 multiply 的形**，零描邊、零文字裝飾。
- 三塊形要分屬三個顏色，而且至少有一組要疊在一起——logo 自己必須示範這個系統。
- Favicon **不要用疊印**（各平台對 SVG favicon 的 blend 支援不一），改用三塊**不重疊**的剪形 + 紙色底，32×32 仍然認得出主形。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E
%3Crect width='32' height='32' fill='%23E9DCBC'/%3E
%3Cpath d='…掌狀葉…' fill='%238AA627'/%3E
%3Cpath d='M14.4 12L17.6 12L18.6 30L13.4 30Z' fill='%2317130E'/%3E
%3Cpath d='M2 26L11 21.5L11 30L2 30Z' fill='%23DD5B21'/%3E%3C/svg%3E">
```

## Do & Don't

**Do**

- 先決定三罐墨，再決定畫什麼。
- 讓疊色自己生出第四、第五個顏色。
- 保留套印偏移的月牙。
- 展示字咬在一起、逐字微調。
- 正文一律坐在紙上、用 negro。
- 人與物一律剪影，沒有五官、沒有細節。

**Don't**

- 不要第四罐墨（不要因為「需要一個灰」就宣告灰）。
- 不要輪廓線、不要漸層、不要網點、不要模糊陰影、不要發光。
- 不要照片，也不要用濾鏡把照片弄成「像絹印」。
- 不要圓角卡片、不要置中大標＋兩顆按鈕＋三張卡片的模板、不要紫藍漸層。
- 不要 emoji 當 icon（icon 一律自繪剪形 SVG）。
- 不要 Lorem ipsum、不要「在當今快節奏的世界」這種 AI 腔文案。
- 不要「EST. 19xx」徽章。
- 不要把套印修到完美——修完它就不是這個流派了。

## 頁面骨架範例

```html
<div class="hoja cartel" data-reg role="group" aria-label="三塊分色網版疊在同一張紙上">

  <!-- 版一 naranja：主形 + 大字 -->
  <div class="plancha p1 abs">
    <svg class="art" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d="…光錐（梯形）…"/><path d="…葉冠…"/>
    </svg>
    <div class="lay">
      <div class="t-titulo">AGUA<br>DE POZO</div>
      <div class="t-ficha">Cuba · 1968 · 92 min · 16 mm</div>
    </div>
  </div>

  <!-- 版二 verde：次形 + 地點時間 -->
  <div class="plancha p2 abs">
    <svg class="art" viewBox="0 0 1000 620" aria-hidden="true"><path d="…屋頂天際線…"/></svg>
    <div class="lay"><div class="t-pueblo">VIERNES 24<br>8:30 PM<br><b>SEIBABO</b></div></div>
  </div>

  <!-- 版三 negro：機具 + 全部正文 -->
  <div class="plancha p3 abs">
    <svg class="art" viewBox="0 0 1000 620" aria-hidden="true"><path d="…放映機…"/></svg>
    <div class="lay">
      <div class="t-tira">CINE MÓVIL · RUTA 3</div>
      <div class="t-pie"><span>ENTRADA LIBRE</span><span>PANTALLA 6×4 m</span></div>
    </div>
  </div>
</div>

<div class="regbar">
  <label for="reg">REGISTRO</label>
  <input type="range" id="reg" min="0" max="100" value="0" step="1"
         aria-label="三塊網版的套準程度：0 為完全分版，100 為套準">
  <output id="reg-out" for="reg">分版 0%</output>
</div>
```

```css
.hoja{ position:relative; isolation:isolate; background:var(--cana);
  background-image:
    repeating-linear-gradient(90deg,var(--cana-s) 0 1px,transparent 1px 4px),
    repeating-linear-gradient(0deg, var(--cana-s) 0 1px,transparent 1px 4px) }
.plancha{ position:absolute; inset:0; mix-blend-mode:multiply }
.plancha svg{ position:absolute; inset:0; width:100%; height:100% }
.plancha svg *{ stroke:none }
.lay{ position:absolute; inset:0; display:grid;
  grid-template-columns:repeat(12,1fr);
  grid-template-rows:auto auto 1fr auto auto;
  padding:clamp(12px,2.2vw,26px); align-content:start; pointer-events:none }
```

**無 JavaScript 時**：`@property --reg` 的 `initial-value` 設為 `1`，再用 `.js .hoja[data-reg]{--reg:0}` 讓「未套準」只在有 JS 時發生。這樣關掉 JavaScript 的人看到的是一張套準的、全部讀得到的海報。

---

## 技術實作與相容性

本風格只需要三項技術，全部是瀏覽器原生、零函式庫、零外部圖片。

### 1. `mix-blend-mode: multiply` ＋ `isolation: isolate`（渲染層）

**承載什麼**：特徵 1 的全部——第四色以上的顏色由疊印產生而非宣告；以及特徵 3 的單色月牙。

**支援現況（查證：MDN《mix-blend-mode》與《isolation》頁、caniuse）**：`mix-blend-mode` 自 Chrome 41 / Firefox 32 / Safari 7.1（iOS 8）/ Edge 79 起支援，caniuse 記為「available across browsers since January 2020」；`isolation` 同樣自 2020 年起跨瀏覽器可用，caniuse 標記為 widely available、可不加 fallback 使用。IE 與 Opera Mini 從未支援。

**不支援時的具體行為**：`mix-blend-mode` 被忽略 → 三塊版以 source-over 疊上去，於是只看得到最上面那塊版的顏色，**疊色消失、第四色不存在**。因此凡是「只有疊出來才夠暗」的文字，都必須在頁面別處以 negro 再印一次（本站在正文區用一整句話重述那一行的意思）。`isolation` 被忽略時混色會穿到頁面背景——因為頁面底色與紙同色（`#E9DCBC`），實際結果與正確渲染幾乎一致。

**注意**：`mix-blend-mode` 會讓元素建立堆疊脈絡，`z-index` 只在該群組內有效；務必把三塊版包在同一個 `isolation:isolate` 的容器裡，否則疊色會把導覽列一起吃進去。

### 2. `@property` 型別化自訂屬性（動效與時間軸層）

**承載什麼**：特徵 3 的「分版↔套準」是一個連續量。`--reg`（`<number>`）驅動三塊版的位移；`--dx`／`--dy`（`<number>`）讓環境漂移可以被 `@keyframes` 內插——未註冊的自訂屬性在關鍵影格之間只會離散跳變，漂移就不會是漂移。

**支援現況（查證：web.dev〈@property: Next-gen CSS variables now with universal browser support〉，2024-07-12；MDN《@property》）**：`@property` 於 **2024-07-09 成為 Baseline Newly available**（Chrome 85 / Safari 16.4 / Firefox 128 起三大引擎齊備）。截至 2026-09 尚未滿 2.5 年，屬 Newly available 而非 Widely available，因此必須備降級。

**不支援時的具體行為**：`--reg` 退回一般自訂屬性，`calc()` 的代入照樣成立，所以**拖曳與滑桿完全正常**（JS 每次直接設值，不依賴內插）；差別只在 `deriva` 的漂移會變成每 25% 跳一次的離散位移。降級判斷寫在 CSS 裡：

```css
@supports not (background: paint(x)){ /* 概略對應無 Houdini 的舊引擎 */ }
/* 更保險的做法：不要依賴 @property 做任何資訊性的事，只拿它做平滑度 */
```

本站選擇的策略是**不對它做特徵偵測**——因為它退化之後沒有任何資訊損失，只有平滑度損失。

### 3. URL 狀態序列化（資料與生成層）

**承載什麼**：〈點戲單〉的三部片與村碼寫進 `?p=0.4.9&v=2`，用 `history.replaceState` 即時更新網址；回條裡的可分享網址就是同一串。海報本來就是拿來傳的，這個功能是流派語意的延伸。

**支援現況（查證：MDN《URLSearchParams》《History.replaceState》）**：兩者皆為長期 Baseline Widely available（`URLSearchParams` 自 Chrome 49 / Firefox 44 / Safari 10.1；`history.replaceState` 自 IE10 時代）。

**不支援／關閉 JS 時的具體行為**：頁面上的十二部片、年份、片長、拷貝捲數與原始票數全部是靜態 HTML，一個字不會少；`<noscript>` 另外說明「要點戲請把片名抄下來交給村委會或打電話」。輸入端一律做防禦性解析：非整數、超出 0–11、重複與超過三筆的值直接丟掉（已以 `p=99.-1.2.3.4&v=999` 實測，結果為 `{picks:[2,3,4], village:6}`，不會拋錯也不會越界）。

### 效能預算（實測值）

| 頁面 | 單檔大小（含 inline 全部 CSS/JS/SVG） | 預算 |
|---|---|---|
| `index.html` | 32.0 KB | ≤350 KB |
| `pedida.html` | 34.2 KB | ≤350 KB |
| `taller.html` | 33.2 KB | ≤350 KB |
| `ruta.html` | 25.5 KB | ≤350 KB |
| `assets/logo.svg` | 2.5 KB | — |

零外部圖片、零外部音檔、零函式庫；唯一外部資源是 Google Fonts 三個家族。首屏 JS 僅一段約 40 行的事件綁定（無版面量測、無迴圈渲染），執行時間遠低於 100ms。動畫只改 `transform` 與 `clip-path`（合成層屬性），三個動畫元素，無 layout thrashing。`pedida` 的重繪是一次 `innerHTML` 替換 12 列的表格，每次互動一次。

### 已知陷阱

1. **`mix-blend-mode` 會吃掉 `position: sticky` 的視覺層級**——把 sticky 容器放在混色群組之外。
2. **不要在 `.plancha` 上加 `opacity`**，它會再建立一層群組，疊色結果會變。
3. **SVG favicon 不要用 blend**，各平台支援不一；改用不重疊的形。
4. **`will-change: transform` 只加在三塊版上**，加多了記憶體會爆。
5. **正文不要放在橘或綠的版上**，對比只有 3.33 與 2.64。
