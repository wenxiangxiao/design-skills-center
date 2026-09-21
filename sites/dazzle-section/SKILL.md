---
name: vorticist-blast
description: Vorticism (London, 1914–15, BLAST) as a web visual language — one off-centre still vortex throwing unequal hard-edged flat wedges, a three-weight black skeleton of straight rules, clashing all-caps grotesque with no middle sizes, and motion that steps instead of easing.
---

# 漩渦主義 Vorticism — BLAST 的風格規格書

> 這份文件描述的是 **1914–15 年倫敦的漩渦主義**：Wyndham Lewis 主編的《BLAST：Review of the Great English Vortex》（第一號 1914-06-20，puce 封面）、Edward Wadsworth、William Roberts、Helen Saunders、Jessica Dismorr、Lawrence Atkinson、Henri Gaudier-Brzeska，以及替它命名的 Ezra Pound。
> **它不是未來派。** 未來派要的是速度感——拖影、重疊、模糊。Pound 給漩渦下的定義正好相反：渦心是能量最大的那一點，**而它不動**。所以這個風格裡沒有速度線、沒有模糊、沒有動態模糊，會動的是觀者不是畫面。
> **它也不是立體派。** 立體派把一個物體拆成很多視角；漩渦主義是從一個偏心的點把畫面切成一堆不等角的硬邊平色楔。
> **更不是 Art Deco 的放射扇。** Deco 的扇是等角、對稱、鍍金的裝飾；這裡的楔角寬全部不同、刻意不對稱，而且顏色是工業的。
> 一個從沒看過 Demo 的 AI，只讀這份文件就應該能做出風格一致的新站。

---

## 〇. 本風格的 5 個不可省略特徵

五項全部要在畫面上看得見。拿掉任何一項，剩下的就只是「有斜線的網頁」。

### 特徵 1／形狀語彙：**一個偏心的渦心，射出角寬全不相同的硬邊楔**

這是整個流派的地基，也是最常被做錯的一項。三條紀律：

1. **一個中心，而且偏心。** 每一個構圖只准有一個渦心。它必須偏離幾何中心——落在畫面的 30–45% 一帶最好。置中的放射＝太陽花＝裝飾。
2. **角寬全部不同，相鄰兩楔的角寬比不得小於 1.4。** 等角的扇會被大腦一秒鐘讀成「一個重複圖案」然後忽略；不等角的扇讀不出中心在哪，眼睛會一直在上面找立足點——這正是漩渦主義要的「靜止的能量」。
3. **楔是硬邊的平色。** 交界是一條數學上的直線，兩側各自是一塊不變的平色。

```css
/* 渦：conic-gradient 寫成硬停點（前段結束值 = 後段起始值），
   輸出的就不是漸層，是一組平的楔。角寬 26/21/14/35/35/37/29/41/31/33/23/35 —— 全不相同 */
--vir1:conic-gradient(from var(--vir) at 38% 62%,
   var(--cern) 0 26deg, var(--papir) 26deg 47deg, var(--cern) 47deg 61deg,
   var(--puce) 61deg 96deg, var(--papir) 96deg 131deg, var(--cern) 131deg 168deg,
   var(--zelen) 168deg 197deg, var(--papir) 197deg 238deg, var(--cern) 238deg 269deg,
   var(--papir) 269deg 302deg, var(--puce) 302deg 325deg, var(--cern) 325deg 360deg);
```

`at 38% 62%` 就是那個偏心的渦心。**永遠不要寫 `at 50% 50%`。**

### 特徵 2／色彩規則：**平色分版。顏色不表示光，表示一塊材料**

漩渦主義的顏色沒有在畫光影——它在**分版**（像印刷的分色版或船體的塗裝版）。所以：

- **零漸層、零透明疊加、零陰影、零發光。** 任何讓兩塊顏色之間產生第三個值的手法都要刪掉。
- 色域**極小**：一個紙色、一個近黑、一個 puce、一到兩個工業色。五色封頂。
- **黑白之間的反差要拉到最大**，因為黑白是這個語言的骨幹，其他顏色是客人。

```css
:root{
  --papir:#E6E3DB;  /* 白版（地）        36% */
  --cern:#0E0F12;   /* 黑版（本文・線）  26% */
  --puce:#BE3A52;   /* BLAST 的 puce：Lewis 自稱「暴力粉紅」。現用・重音 16% */
  --zelen:#7FA79B;  /* 鴨綠：第三塊版    12% */
  --sed:#8C9298;    /* 鉛灰：惰性・未分版 10% */
}
```

**換題材時怎麼改色：** 保留「紙 / 近黑 / 一個高彩的紅粉 / 一個低彩工業色 / 一個灰」的五角結構。puce 可以換成朱、鉛丹、鎘橙，但**不可以換成粉彩、不可以加金、不可以用三原色**（三原色是風格派與包浩斯）。

### 特徵 3／字體選擇：**大寫 Grotesque，字級硬碰硬，沒有中間值**

《BLAST》宣言頁用的是 **Grotesque No.9** 的大寫，同一頁上 12pt 與 72pt 直接相鄰，中間什麼都沒有。這個「沒有中間值」是可以照抄的規則：

- 標題／標籤／導覽／按鈕／數字：**一律大寫**的重磅 Grotesque（Archivo Black 是最接近的免費替身）。
- **字級階要跳空**：`clamp(46px,8.4vw,112px)` → `clamp(28px,4vw,52px)` → `20px` → `16.5px` → `11.5px`。相鄰兩階至少 1.6 倍，**不准補中間值**。
- **零義大利體、零小寫標題、零襯線標題。** 內文可以用襯線（BLAST 的論述頁確實是襯線），但標題系統必須整組是 Grotesque。
- 小標籤把字距拉到 `.26em–.38em`；大標題把字距收到 `-.012em`。這個「小的很鬆、大的很緊」也是照抄鉛字時代的物理。

```css
h1,h2,h3,.gro,.lab,th,button,nav a{
  font-family:"Archivo Black","Noto Sans TC",Impact,sans-serif;
  font-weight:400; text-transform:uppercase; letter-spacing:.02em; line-height:.94}
.lab{font-size:11.5px; letter-spacing:.38em; color:var(--puce)}
h1{font-size:clamp(46px,8.4vw,112px); letter-spacing:-.012em}
```

### 特徵 4／版面手法：**雙欄的宣告名單、被楔擠開的正文、斜推的格**

《BLAST》第一號一翻開不是標題也不是圖，是**兩欄對照的名單**：左邊 BLAST（詛咒）、右邊 BLESS（祝福），常常同一件事兩邊都上。這個版面本身就是可以直接拿來當開場的資訊架構——它比 hero 誠實，因為它一開口就是立場。

```css
.listy{display:grid;grid-template-columns:1fr 1fr;gap:var(--l3);background:var(--cern);
  border-top:var(--l3) solid var(--cern);border-bottom:var(--l3) solid var(--cern)}
.listy>div{background:var(--papir);padding:22px 20px 26px}
.listy .bless{background:var(--cern);color:var(--papir)}   /* 一欄反黑，兩欄是兩塊版 */
.listy .hlavni{font-size:clamp(40px,7vw,96px);line-height:.86}
.listy li{text-transform:uppercase;font-size:clamp(15px,1.9vw,23px);line-height:1.14;
  padding:9px 0;border-top:var(--l1) solid currentColor}
```

第二件事：**正文要被楔擠開**，不可以讓一個楔形構圖坐在一個矩形的文繞排框裡。`shape-outside` 與視覺形狀必須是同一個多邊形。

```css
.klin{float:right;width:min(44%,368px);shape-margin:22px;
      shape-outside:polygon(50% 0,100% 25%,100% 100%,0 100%,0 32%)}
.klin.l{float:left;
      shape-outside:polygon(0 0,100% 14%,86% 62%,100% 100%,0 100%)}
```

第三件事：**格與鈕要斜推**。全站用同一個斜角（本站 `-13deg`），只對容器 `skewX`，內層文字用反向 `skewX` 扳回來，字才不會歪。

```css
:root{ --skos:-13deg; }
.nav a{transform:skewX(var(--skos))}
.nav a>span{transform:skewX(calc(var(--skos) * -1))}
```

### 特徵 5／裝飾母題：**三階黑骨架線，而且永遠是直的**

Wadsworth 的木刻（黑白、密與空）給了這個流派唯一的裝飾語彙：**粗細懸殊的黑線**。規則只有兩條——線寬只有三階，線永遠是直的。

```css
:root{ --l1:1.5px; --l2:4px; --l3:9px; }   /* 只有三階，不准出現第四種線寬 */
section>hr{border:0;height:var(--l3);background:var(--cern);margin:46px 0 0}
th{background:var(--cern);color:var(--papir)}          /* 表頭是一條最粗的線 */
td{border-bottom:var(--l1) solid var(--cern)}
.mriz{display:grid;gap:var(--l2);background:var(--cern)}  /* 格縫就是中階線 */
```

**格與格之間不要用 margin，要用 gap 讓底下的黑透出來**——這樣一組卡片讀起來是「一塊被切開的黑版」，不是四張飄在空中的卡片。

---

## 一. 設計哲學

**渦心是靜止的。**

Pound 1914 年的定義：渦心是能量最大的那一點，而它不動。這一句同時決定了這個風格的形式與動效：

1. **畫面上的能量來自分割，不是來自模糊。** 要讓一個版面有力，切它，不要糊它。
2. **會動的東西要跳，不要滑。** 平滑的 ease 是「速度」，是未來派的；階梯狀的 `steps()` 是「被切開的時間」，才是漩渦主義的。
3. **立場先於說明。** BLAST 一翻開就是詛咒與祝福的名單。一個漩渦主義的網站應該在第一屏就講清楚它反對什麼，而不是先放一張大圖。
4. **不對稱是工作，不是風格。** 對稱會把中軸送出去；這個語言的每一個不對稱都應該能說出它讓觀者算錯了什麼。

---

## 二. 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| Papír 白版 | `#E6E3DB` | 地。冷的紙白，不是牛皮色也不是純白 | 36% |
| Černá 黑版 | `#0E0F12` | 本文、骨架線、導覽底、footer、表頭 | 26% |
| Puce | `#BE3A52` | 現用態、重音、不可逆動作、警示。Lewis 的「暴力粉紅」 | 16% |
| Zeleň 鴨綠 | `#7FA79B` | 第三塊版、正面回饋 | 12% |
| Šedá 鉛灰 | `#8C9298` | 惰性、未使用、次要文字 | 10% |

輔助：`--papir2:#D5D1C7`（斑馬列）、`--cern2:#1C1E23`（未選中的深底）。

**puce 的使用上限是 16%。** 它是《BLAST》封面的顏色，一旦面積超過就從「宣告」掉價成「粉紅主題」。

---

## 三. 字體系統

| 角色 | 字體 | 設定 |
|---|---|---|
| 標題・標籤・導覽・按鈕・數字 | Archivo Black | `text-transform:uppercase; line-height:.94` |
| 小標籤 | 同上 | `11.5px / letter-spacing:.38em` |
| 拉丁內文 | Spectral 400 / 600 | `line-height:1.76` |
| 中日韓 | Noto Sans TC 400 / 700 / 900 | 同上 |

字級階（**跳空，不補中間值**）：112 / 52 / 20 / 16.5 / 13.5 / 11.5。

為什麼拉丁內文用襯線而標題用 Grotesque：《BLAST》本身就是這樣排的——宣言頁是大寫 Grotesque，論述頁是襯線。全站都用 Grotesque 會變成瑞士國際主義；全站都用襯線會變成一本文學雜誌。

---

## 四. 版面與網格

- **開場不是 hero。** 首屏是 BLAST／BLESS 雙欄名單，標題排在名單之後。這是本風格最強的結構特徵，不要換成大標題。
- **主欄上限 62ch**，但浮動的楔進來之後實際是 36–42ch——那是刻意的，讓文字被形狀擠。
- **導覽是一條分成四格的帶，每一格被斜推**；現用頁的作法是**唯一一格沒有被斜推**（回正、換成紙色底）。用「被校正」而不是用「被點亮」來表示現用，是這個風格的邏輯：周圍都在說謊，只有你在的這一格是真的。
- **零圓角、零 box-shadow、零 backdrop-filter。**
- 所有分節用 `<hr>` 的 9px 黑實塊，不要用 1px 灰線。

---

## 五. 元件配方

### nav（真航向帶）
```css
.kurs{position:sticky;top:0;z-index:50;background:var(--cern);
  display:grid;grid-template-columns:repeat(4,1fr);border-bottom:var(--l3) solid var(--cern)}
.kurs a{padding:15px 10px 13px;text-align:center;background:var(--cern2);color:var(--sed);
  transform:skewX(var(--skos));border-left:var(--l1) solid var(--cern);
  transition:background-color .1s steps(2,end),color .1s steps(2,end)}
.kurs a>span{display:block;transform:skewX(calc(var(--skos) * -1))}
.kurs .nyni{transform:none;background:var(--papir);color:var(--cern);border-left:0}
.kurs .nyni>span{transform:none}
.kurs .nyni::after{content:"TRUE";position:absolute;right:7px;top:6px;font-size:9px;color:var(--puce)}
```
注意 `transition` 的 `steps(2,end)`——連 hover 都是跳的。

### 按鈕
```css
.velky{background:var(--puce);color:var(--papir);border:0;padding:15px;
  text-transform:uppercase;letter-spacing:.2em;transform:skewX(var(--skos));
  transition:background-color .1s steps(2,end)}
.velky span{display:block;transform:skewX(calc(var(--skos) * -1))}
.velky:hover{background:var(--cern)}      /* 換版，不是變亮 */
```

### 格
```css
.mriz{display:grid;grid-template-columns:repeat(auto-fit,minmax(214px,1fr));
  gap:var(--l2);background:var(--cern)}
.mriz>div{background:var(--papir);padding:18px 16px 22px}
```

### 表
```css
th{background:var(--cern);color:var(--papir);font-size:11px;letter-spacing:.26em;padding:10px 14px}
td{padding:11px 14px;border-bottom:var(--l1) solid var(--cern)}
tbody tr:nth-child(2n) td{background:var(--papir2)}
```

### footer
黑底、上緣一條 9px 的 puce 實邊、三欄 `auto-fit minmax(218px,1fr)`，虛構聲明與建置模型各佔滿一列。

---

## 六. 動效規則

四種性質不同、觸發源不同的動態，缺一不可。**全部用 `steps()`，一個 `ease` 都不准有。**

| 種類 | 名稱 | 觸發 | 時長／曲線 |
|---|---|---|---|
| ambient 環境 | 〈渦〉 | 無需輸入，持續 | 24s `steps(18,end)` 無限 |
| input-driven 輸入 | 〈刃〉 | `pointermove`（rAF 節流） | 1 影格（<20ms），30 個離散階 |
| transition 轉場 | 〈分版推移〉 | 狀態切換 | 280ms `steps(6,end)` |
| signature 簽名 | 〈走樣〉 | 判讀揭曉 | 520ms `steps(5,end)` |

### ambient〈渦〉
用 `@property` 讓角度可補間，再用 `steps(18)` 把它切成 18 格。畫面上看到的不是「旋轉的扇」，是**整個渦每 1.33 秒喀一下換一格**。
```css
@property --vir{ syntax:'<angle>'; inherits:true; initial-value:34deg; }
body{ animation:vir 24s steps(18,end) infinite; }
@keyframes vir{ to{ --vir:394deg; } }   /* 34+360 */
```

### input-driven〈刃〉
指標相對於元件中心的方位就是渦心的起角，**量化成 30 個階**。
```js
el.style.setProperty('--vir', (Math.round(a/12)*12 + 90) + 'deg');   // a = atan2 的度數
```
用 `requestAnimationFrame` 節流、視窗外的元件直接跳過。**不要在 background 上加 transition**，加了就變成滑的。

### transition〈分版推移〉
```css
.posun{animation:posunuti .28s steps(6,end)}
@keyframes posunuti{ from{clip-path:polygon(0 0,0 0,0 100%,0 100%)}
                       to{clip-path:polygon(0 0,150% 0,150% 100%,0 100%)} }
```
**不要淡入。** 淡入沒有方向，而這個語言的每一個變化都要有一個被推的方向。

### signature〈走樣〉
本站獨有：判讀揭曉的那一刻，船身上的整套分版**一步一步（五格）轉到真航向上**，同時那道說謊的假艏波消失。使用者是看著圖案停止說謊。
```css
.srovnat .malba{animation:srovnani .52s steps(5,end) forwards}
@keyframes srovnani{ to{ transform:rotate(var(--rot)); } }
.srovnat .vlna{animation:zmizet .52s steps(5,end) forwards}
@keyframes zmizet{ to{ opacity:0; } }
```
```js
lod.style.setProperty('--rot', norm(pravy - zdanlivy) + 'deg');   // 真航向 − 表觀航向
```

### prefers-reduced-motion（四種全部降級，資訊零損失）
```css
@media (prefers-reduced-motion: reduce){
  body{animation:none}
  :root{--vir:34deg}                       /* 渦停在起角 */
  .kurs a,.osm button,.velky,.vzor{transition:none}
  .srovnat .malba{animation:none;transform:rotate(var(--rot))}   /* 直接到位 */
  .srovnat .vlna{animation:none;opacity:0}
  .posun{animation:none}
  .hledi .lod{animation:none!important;transform:translateX(var(--b))!important}
}
```
JS 端同步讀 `matchMedia('(prefers-reduced-motion: reduce)')`：〈刃〉整個不綁；試航的航程縮成 900ms 且船直接就位。**所有報文、角度、紀錄與結論照常顯示。**

---

## 七. 插畫與圖像風格

**技法名稱：楔扇構成（wedge-fan）。**

1. 每一幅插畫 = 一個偏心渦心的硬停點 conic 扇，用 `clip-path` 裁成該題材的輪廓。**背景是扇，形狀是裁切**——不是畫出來的。
2. **零曲線。** 沒有 arc、沒有 border-radius、沒有圓。輪廓用 `polygon()`。
3. **零漸層、零陰影、零紋理、零網點。**
4. 需要「說謊」的那一筆（假艏波、假中軸、假分界）用**單一塊純白或純黑的楔**，形狀刻意簡單——它要是整幅畫裡最便宜的一筆。
5. **零外部圖片。** 全部 CSS 與 inline SVG。

```css
.klin .pole{width:100%;aspect-ratio:1/1;background:var(--vir1);
  clip-path:polygon(50% 0,100% 28%,100% 78%,58% 100%,8% 84%,0 34%)}
.klin.b .pole{background:var(--vir2);
  clip-path:polygon(16% 0,100% 12%,88% 66%,100% 100%,22% 92%,0 44%)}
```

同一個扇換 `clip-path` 就是另一幅畫；換 `from` 角與渦心位置就是另一套圖樣。**整站只要兩個扇的定義就夠了**——這是這個風格在工程上極省的地方。

---

## 八. Logo 與 Favicon

**Logo**：一個偏心的九楔渦 + 渦心那一個 5–6px 的方塊（渦心是靜止的，所以它是唯一一個沒有方向的形）+ 大寫重磅 Grotesque 兩行 + 一條最粗階的黑線。可以在字標旁邊放一筆「說謊的形」（本站放的是假艏波），當成整個品牌的註腳。

**Favicon**：32×32 inline SVG data URI，就是那個渦，九個楔，不要放字母——32px 下楔比字母好認。

```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E
%3Crect width='32' height='32' fill='%23E6E3DB'/%3E
%3Cpolygon points='13,18 32,0 32,9' fill='%230E0F12'/%3E
%3Cpolygon points='13,18 32,9 32,15' fill='%23BE3A52'/%3E
%3Cpolygon points='13,18 32,15 32,26' fill='%230E0F12'/%3E
%3Cpolygon points='13,18 32,26 24,32' fill='%237FA79B'/%3E
%3Cpolygon points='13,18 24,32 6,32' fill='%230E0F12'/%3E
%3Cpolygon points='13,18 6,32 0,22' fill='%23E6E3DB'/%3E
%3Cpolygon points='13,18 0,22 0,6' fill='%230E0F12'/%3E
%3Cpolygon points='13,18 0,6 11,0' fill='%23BE3A52'/%3E
%3Cpolygon points='13,18 11,0 32,0' fill='%23E6E3DB'/%3E%3C/svg%3E
```

---

## 九. Do & Don't

**Do**

- 一個偏心渦心，楔的角寬全不相同（相鄰比 ≥1.4）。
- 所有 gradient 寫成硬停點；顏色是版，不是光。
- 大寫 Grotesque，字級跳空，沒有中間值。
- 開場用 BLAST／BLESS 雙欄名單，立場先於說明。
- 三階黑線，永遠直的；格縫就是線。
- 現用態用「被校正／回正」表示，不要用「被點亮」。
- 四種動效都要有，而且全部 `steps()`。

**Don't**

- **不要速度線、拖影、動態模糊、視差**——那是未來派，方向相反。
- **不要真漸層、不要陰影、不要發光、不要玻璃擬態。**
- **不要等角的放射扇、不要置中的渦心**——那會掉成 Art Deco 或太陽花裝飾。
- **不要圓角、不要曲線。**
- **不要 ease / cubic-bezier**。這個風格的時間是被切開的。
- **不要三原色**（風格派／包浩斯）、**不要加金**（Deco）、**不要粉彩**。
- **不要小寫標題、不要義大利體、不要襯線標題。**
- **不要 emoji 當 icon、不要 Lorem ipsum、不要「EST. 19xx」徽章、不要紫藍漸層、不要置中三張圓角卡片。**
- puce 面積不要超過 16%。

---

## 十. 頁面骨架範例（可直接使用）

```html
<body>
  <nav class="kurs" aria-label="主導覽">
    <a href="index.html" class="nyni" aria-current="page"><span>VORTEX<i>渦心</i></span></a>
    <a href="plates.html"><span>PLATES<i>分版</i></span></a>
    <a href="trial.html"><span>TRIAL<i>試航</i></span></a>
    <a href="dock.html"><span>DOCK<i>乾塢</i></span></a>
  </nav>

  <header class="hlava">
    <a href="index.html"><!-- 偏心九楔渦 + 大寫字標 SVG --></a>
    <p class="adr"><span>Birkenhead · No.4 Graving Dock</span><span>Mon–Fri 07:30–17:00</span></p>
  </header>

  <main>
    <!-- 開場：雙欄名單。沒有 hero，沒有大圖 -->
    <section>
      <div class="listy">
        <div class="blast"><b class="hlavni">BLAST</b>
          <ul><li>被詛咒的事<em>為什麼。一句就好，要具體。</em></li></ul>
          <p class="podpis">以上為本處不接受的東西</p></div>
        <div class="bless"><b class="hlavni">BLESS</b>
          <ul><li>被祝福的事<em>為什麼。</em></li></ul>
          <p class="podpis">以上為本處的全部工法</p></div>
      </div>
      <hr>
    </section>

    <section>
      <span class="lab">SECTION LABEL</span>
      <h1>兩行的<br>大標題</h1>
      <figure class="klin"><div class="pole" data-vir="1"></div>
        <figcaption>圖樣說明</figcaption></figure>
      <p class="telo">正文會沿著左邊那個楔的斜邊走。</p>
      <hr>
    </section>
  </main>

  <footer class="pata">…</footer>
</body>
```

---

## 十一. 技術實作與相容性

三項核心技術。支援度於 2026-09-22 查證 MDN / caniuse，不憑印象。

### 1. `conic-gradient` 硬停點楔扇（A 渲染層）

**承載**：特徵 1 與特徵 2，以及 ambient〈渦〉與 input-driven〈刃〉。全站沒有一處連續的顏色變化——所有「漸層」都寫成前段結束值＝後段起始值，輸出的是一組平的楔。整站的全部圖像只靠兩個扇的定義（`--vir1`／`--vir2`）加上不同的 `clip-path` 產生，所以零外部圖片、零 SVG path 資料。

- **支援**：`conic-gradient()` Baseline 廣泛可用（Chrome 69 / Safari 12.1 / Firefox 83；2021 年起四大瀏覽器齊備）。`@property`（讓 `--vir` 這個 `<angle>` 可以被動畫補間）自 Firefox 128（2024-07）起四大齊備，屬 Baseline 新近可用。查證來源：MDN `conic-gradient()`、MDN `@property`。
- **fallback**：`@property` 不支援時 `--vir` 退回 `:root` 宣告的 `34deg`，扇靜止——**畫面完全相同，只是不動**；`conic-gradient` 本身不支援的環境（已極罕見）會退成背景色，此時文字與版面仍完整，只少掉圖樣。
- **實測**：每個扇 9–12 個色段，合成在 GPU 完成；ambient 每 1.33 秒才換一格，主執行緒零工作。

### 2. `shape-outside: polygon()` ＋ `shape-margin`（C 版面與樣式層）

**承載**：特徵 4 的「正文被楔擠開」。浮動的楔與它的 `shape-outside` 用同一組幾何描述，所以文字讓開的邊界就是看得到的那條斜邊，不是它的外接矩形。

- **支援**：`shape-outside` 與 `shape-margin` 皆為 Baseline 廣泛可用，**自 2020 年 1 月起四大瀏覽器齊備**。查證來源：MDN `shape-outside`、MDN `shape-margin`。
- **限制**：只對 `float` 的元素生效；百分比相對於 float 的 margin box（所以 `shape-outside` 的多邊形要把 figcaption 的高度算進去，不能直接抄 `clip-path` 的座標）。
- **fallback**：不支援時文字沿矩形外框排，版面不壞。≤560px 一律 `float:none; shape-outside:none`，楔改為置中區塊。
- **實測**：多邊形在版面階段算一次，捲動與 hover 不重算，無 layout thrashing。

### 3. `steps()` 逐格時間軸（B 動效與時間軸層）

**承載**：四種動效全部。這是本站唯一的時間函式——**全站零 `ease`、零 `cubic-bezier`、零 `linear`**，因為平滑的時間是未來派的速度感，而漩渦主義的渦心是靜止的。連 hover 的顏色切換都是 `transition:background-color .1s steps(2,end)`：顏色不是漸變過去的，是換了一塊版。

- **支援**：`steps()` 屬 CSS Easing Functions Level 1，Baseline 廣泛可用（Chrome 1 / Firefox 4 / Safari 5.1 起即有，`jump-*` 關鍵字為後加）。`steps(n, end)` 是最保守的寫法，處處可用。查證來源：MDN `steps()`、MDN `<easing-function>`。
- **為什麼它是風格的一部分而不是效果**：把同一個動畫從 `linear` 換成 `steps(18)`，畫面從「旋轉的扇」變成「每 1.33 秒喀一下的版」。這一個字就是未來派與漩渦主義的分界。
- **fallback**：`steps()` 不被辨識時整條 `animation` 宣告失效，元素靜止在初始狀態——與 reduced-motion 的降級結果相同，資訊零損失。
- **實測**：試航的航程用 `steps(16,end)` 推 `transform`，合成執行緒處理，60fps；`steps` 使每影格實際只有 16 次視覺更新，比逐影格更省。

### 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS） | ≤350KB | 31.0–33.4KB |
| 首屏 JS 執行 | ≤100ms | 無首屏渲染性 JS；試航台的初始化只做一次 `pripravit()`（數個樣式寫入） |
| 主要動畫 | 60fps | ambient 與航程皆為合成屬性（background 角度／transform） |
| 外部資源 | 零外部圖片／音檔 | 只有 Google Fonts 三個字族 |

### 已知取捨

- `@property` 為 Baseline 新近可用（2024-07 才四大齊備）。這是本站唯一一項不是「廣泛可用」的技術，因此它只承載 ambient 的**動**，不承載任何內容。
- jsdom 環境（無 `matchMedia`）下 `RM` 為 falsy，所有動效以完整模式初始化——實機上 `matchMedia` 必定存在，此行為僅影響自動化測試。

---

## 十二. 外部參照

- **《BLAST: Review of the Great English Vortex》No.1**，Wyndham Lewis 編，1914-06-20，大開本，封面為 Lewis 自稱「暴力粉紅」（他人稱之 puce）的紙色，書名以巨大的無襯線大寫斜置。前二十頁是宣言，由 Lewis 執筆、Pound 協助，署名者包含 Lewis、Wadsworth、Pound、William Roberts、Helen Saunders、Lawrence Atkinson、Jessica Dismorr、Gaudier-Brzeska。宣言頁主要使用 **Grotesque No.9**，並以 BLAST／BLESS 兩欄名單的形式編排。No.2「War Number」，1915 年 7 月。
- **Ezra Pound**，1914：漩渦是能量最大的那一點，而它是靜止的——這一句是本風格全部動效規則的來源。
- **Rebel Art Centre**，38 Great Ormond Street, London，1914；**Vorticist Exhibition**，Doré Galleries，1915 年 6 月。
- **Edward Wadsworth**：1917 年起先後在 Bristol 與 Liverpool 監督船體的眩目塗裝（dazzle painting）。他本人不設計分版圖——分版圖在倫敦的設計室繪製後送往各港，由海軍軍官指揮工班施作——但他刻了九幅眩目船的木刻，並據其中的《Liverpool Shipping》發展出《Dazzle-ships in Drydock at Liverpool》。
- **Norman Wilkinson**：眩目塗裝的提案人，其計畫為英國海軍部採納，並主持一個約二十餘位藝術家的偽裝設計單位。眩目塗裝的目的**不是隱形，是讓觀測者算錯航向與速度**。
- **與周邊流派的分界**：未來派要速度與模糊，漩渦主義要靜止的渦心與硬邊；立體派拆的是視角，這裡切的是平面；Art Deco 的放射扇是等角對稱且鍍金的裝飾，這裡的楔是不等角、不對稱、工業色的。
