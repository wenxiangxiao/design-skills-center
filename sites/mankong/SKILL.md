---
name: art-nouveau-leadlight
description: Art Nouveau as a leaded-glass system — whiplash came lines, a Mucha halo rondel, flat desaturated tertiary fields with no gradients, and colour produced only by light transmitted through glass rather than painted onto elements.
---

# 新藝術・鉛條鑲嵌 Art Nouveau Leadlight
### 一八九五－一九一四年新藝術的視覺語言，寫成可以直接施工的規格書

> 本檔是給 AI（或人）拿去在**任何產業**重做同一套風格用的。跟著做，可以做出與《蔓光鑲嵌所》同語言、但完全不同題材的網站。
> 唯一判準：**遮住全部文字看首屏，一個懂設計的人要能在三秒內說出「這是新藝術」。**

---

## 〇、流派來歷（動手前先知道你在做什麼）

- **年代／地域**：一八九〇年代中期 – 一九一四年。布魯塞爾、巴黎、南錫、維也納、格拉斯哥、慕尼黑；經日本的商社與雜誌轉譯後，於大正期進入臺灣的公共建築與洋樓。
- **代表人物**：Victor Horta（布魯塞爾，塔塞爾公館的鐵件與樓梯，1893）、Hector Guimard（巴黎地鐵入口鑄鐵，1900）、Alphonse Mucha（吉斯蒙達海報，1894；他的圓形背板後來被直接叫做「Mucha 光暈」）、Émile Gallé 與 Daum 兄弟（南錫的玻璃）、Louis Comfort Tiffany 與 John La Farge（美國的乳白玻璃彩窗）、Charles Rennie Mackintosh（格拉斯哥，較幾何的一支）。
- **各地名稱**：法比 Art Nouveau／德 Jugendstil／奧 Sezessionsstil／義 Stile Liberty／西 Modernisme。
- **製作條件（風格為什麼長成這樣）**：
  1. **色石版印刷（chromolithography）**。一個顏色一塊石版，套印一次。所以顏色必須是**平的色域**——石版上沒有辦法做出連續漸層，而每多一個顏色就多一塊石版、多一次過機、多一份錢。於是：色域數量有限、輪廓線由「最後壓上去的黑版」統一收邊。
  2. **鉛條鑲嵌玻璃（leaded glass）**。鉛條是有寬度的型材（總寬 6–12 mm），它把每一片玻璃圍起來，而且它會潛變——**一條從頭直通到尾的直線，十年後會自己彎**。所以線必須拐彎。
  3. **鑄鐵與彎木**。Horta 與 Guimard 的線是熱彎出來的：材料能彎到什麼程度，線就長成什麼樣。
- **一句話**：新藝術的曲線不是裝飾家的品味，是**三種材料同時能做到的極限形狀**。

---

## 一、本風格的 5 個不可省略特徵

拿掉其中任何一項，它就不是新藝術了。五項都必須在首屏同時看得見。

### 特徵 1｜鞭索線 whiplash line：不對稱、線寬會變、收尾必成收緊的螺旋

一條合格的鞭索線有四條硬規矩：**(a) 兩端曲率不同（一端鬆、一端緊）；(b) 線寬由粗漸細；(c) 末端一定捲成螺旋，不能就這樣停住；(d) 母題來自「柔軟而有方向的長條」——藤蔓卷鬚、鳶尾、罌粟莖、睡蓮梗、孔雀羽、女人的頭髮。**
對稱的 S 形是裝飾藝術（Art Deco），不是新藝術。

```svg
<!-- 可直接複製：不對稱、變寬、末端收緊的鞭索線 -->
<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
  <!-- 骨架：控制點刻意一端遠一端近，製造不對稱曲率 -->
  <path d="M14 108 C4 76 26 50 58 44 C92 38 116 56 110 76
           C105 93 80 97 73 83 C67 71 79 61 88 66"
        fill="none" stroke="#20242A" stroke-width="7" stroke-linecap="round"/>
  <path d="M14 108 C4 76 26 50 58 44 C92 38 116 56 110 76
           C105 93 80 97 73 83 C67 71 79 61 88 66"
        fill="none" stroke="#C79A3F" stroke-width="2.4" stroke-linecap="round"/>
  <!-- 葉：一定長在線的外側，而且左右不對稱 -->
  <path d="M58 44 C62 30 76 22 92 25 C82 37 70 43 58 44Z" fill="#4A5B43"/>
  <path d="M30 66 C18 62 12 50 15 39 C26 47 32 57 30 66Z" fill="#4A5B43" fill-opacity=".72"/>
</svg>
```

CSS 版的鞭索線（用在標題底線、分隔、hover 軌跡）：

```css
/* 用 offset-path 讓元素沿鞭索線走；靜態用途直接把 d 放進 SVG 即可 */
.whiplash{
  --wl: path("M0 40 C-8 18 12 2 38 4 C64 6 78 22 70 34 C64 43 46 44 42 34");
  offset-path: var(--wl);
}
```

### 特徵 2｜Mucha 光暈拱：主體背後一定有一枚圓形背板

一八九四年之後幾乎每一張 Mucha 的海報，人物背後都有一個圓盤或馬蹄拱——內部填放射狀的鑲嵌碎片、同心環或圖樣。它的功能是**把主體從地色切出來**，並給整張畫面一個幾何錨點來抵銷全部的曲線。

```html
<div class="halo"><h1>標題</h1></div>
```
```css
.halo{ position:relative; display:grid; place-items:center; }
.halo::before{
  content:""; position:absolute; z-index:-1;
  width:min(58vmin,420px); aspect-ratio:1; border-radius:50%;
  /* 放射狀鑲嵌：conic 分格 + 兩道同心鉛環 */
  background:
    radial-gradient(circle, transparent 21%, #3E4349 21% 23%, transparent 23% 45%,
                    #3E4349 45% 47%, transparent 47% 71%, #3E4349 71% 74%, transparent 74%),
    conic-gradient(#7E8F6B 0 30deg, #C79A3F 30deg 60deg, #7A6480 60deg 90deg,
                   #2F6B6B 90deg 120deg, #B0705E 120deg 150deg, #D8A54A 150deg 180deg,
                   #7E8F6B 180deg 210deg, #C79A3F 210deg 240deg, #7A6480 240deg 270deg,
                   #2F6B6B 270deg 300deg, #B0705E 300deg 330deg, #D8A54A 330deg 360deg);
}
```

### 特徵 3｜鉛條輪廓：每一個色域都被一條粗黑線完整圍住，色域內零漸層

這是 cloisonné（掐絲）原則。**輪廓線寬必須 ≥ 內部任何線條的 3 倍**；色域內部一律平塗，不得有 box-shadow 模糊、不得有 CSS 漸層當作明暗（漸層只能用來模擬玻璃的織理，見特徵 4）。

由此長出一條**可驗算的配色規則**：相鄰兩個色域的相對明度差必須 **ΔL ≥ 14**（百分制）。低於這個值，那條粗黑線在視覺上讀不出來，遠看糊成一塊——鑲嵌業叫這個「糊邊」。

```css
/* 所有方塊都被鉛條圍住：三層 box-shadow ＝ 鉛條的 H 型斷面（暗緣／心／高光） */
.leaded{
  background: var(--field);
  box-shadow: 0 0 0 2px #1D2126,   /* 外暗緣 */
              0 0 0 5px #3E4349,   /* 鉛心 */
              0 0 0 6px #8E969D;   /* 斷面高光 */
  border-radius: 0;                 /* 鉛條轉角是折的，不是圓的 */
}
```
```svg
<!-- SVG 版：同一條路徑描三次，由寬到窄 -->
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="…" stroke="#1D2126" stroke-width="6.2"/>
  <path d="…" stroke="#3E4349" stroke-width="4.6"/>
  <path d="…" stroke="#8E969D" stroke-width="0.9" stroke-opacity=".78"/>
</g>
```

### 特徵 4｜去飽和的第三色調色盤，金屬色只給「一件事」

新藝術不用高彩度三原色。它的色域是**被灰化過的第三色**：鼠尾草綠、橄欖、苔、灰紫／薊、乾玫瑰／赭紅、孔雀藍綠、象牙。高彩度只出現在一個地方——金（赭金／琥珀），而且金**只給裝飾母題與強調，不給大面積地色**。

```css
:root{
  --sage:#7E8F6B;  --moss:#4A5B43;  --thistle:#7A6480;
  --rose:#B0705E;  --teal:#2F6B6B;  --ivory:#EDE3CE;
  --ochre:#C79A3F; --amber:#D8A54A;            /* 金：≤8% 面積 */
  --lead:#3E4349;  --lead-dk:#1D2126; --lead-hi:#8E969D;
  --backlight:#F4EBD7;                          /* 透光時的光源色 */
}
/* 玻璃的織理：允許漸層，但只用來做材質，不做明暗造型 */
.glass-streaky{ background:linear-gradient(107deg,#6E7A3E,#96A05E 34%,#6E7A3E 58%,#4C5430 82%,#8A9455); }
.glass-opal{ background:radial-gradient(circle at 36% 30%, #EFE7D2, #E4D9BE); }
```

### 特徵 5｜字與框是同一支筆：有機手繪字 ＋ 會生長的植物邊框

新藝術的字不是排上去的，是畫出來的：字腔（counter）被葉子填滿、字高不齊、基線起伏、相鄰字母的襯線會長在一起。邊框不是幾何框，是一株**從一角長出來、繞完一圈的植物**，而且四個角的收束各不相同。

```css
/* 字：高對比、窄、有機的展示體（Google Fonts: Amarante／Federo） */
.display{
  font-family:"Amarante", serif; font-weight:400;
  letter-spacing:.03em; line-height:1.28;
  font-size:clamp(1.9rem, 1.1rem + 2.6vw, 3.4rem);
}
.eyebrow{ font-family:"Federo", sans-serif; letter-spacing:.18em; text-transform:uppercase; font-size:.72rem; }

/* 框：會長的植物邊。四角各用一支不同的卷鬚，不可用同一個 rotate 複製四份 */
.vineframe{ position:relative; padding:34px 30px; }
.vineframe::before,.vineframe::after{
  content:""; position:absolute; width:88px; height:88px;
  background:no-repeat center/contain
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 88 88'%3E%3Cpath d='M4 84C2 56 18 34 44 30C68 26 84 40 78 54C73 66 54 68 49 57' fill='none' stroke='%233E4349' stroke-width='5' stroke-linecap='round'/%3E%3Cpath d='M4 84C2 56 18 34 44 30C68 26 84 40 78 54C73 66 54 68 49 57' fill='none' stroke='%23C79A3F' stroke-width='1.8' stroke-linecap='round'/%3E%3Cpath d='M44 30C48 16 62 8 78 11C68 23 56 29 44 30Z' fill='%234A5B43'/%3E%3C/svg%3E");
}
.vineframe::before{ left:0; top:0; }
.vineframe::after{ right:0; bottom:0; transform:scale(-1,-1); }
```

> **五項自查表**（做完逐項打勾）：鞭索線在？光暈拱在？每個色域都被粗黑線圍住且 ΔL ≥ 14？調色盤是去飽和第三色、金只給裝飾？字與邊框是同一套生長語彙？

---

## 二、設計哲學

三句話：

1. **顏色不是塗上去的，是光穿過材料以後剩下的。** 這不是比喻——把每一塊色實作成「一層色域 × 一層光源」的 `mix-blend-mode: multiply` 乘積，整個畫面的行為會立刻對：色域之間會互相影響、光源一動全站配色一起變、關掉光源整站退回鉛與紙。反過來做（把 hex 寫死在每個元件上）會得到一張**看起來像**新藝術的靜態海報，那正是它最常被做壞的地方。
2. **曲線是結構，不是裝飾。** 線要拐彎是因為直線會潛變、會裂、會失去張力。所以：不要把鞭索線當成邊角的花邊，要讓它承擔版面的分割——它應該是欄與欄之間、區塊與區塊之間那條真的線。
3. **限制先於美感。** 有限的色版數、固定的鉛條寬度、最小可切尺寸——先把限制寫成數字（本規格建議：色域 ≤ 8 色、輪廓 ≥ 3× 內線、ΔL ≥ 14、最小色塊短邊 ≥ 相當於 2.5 cm 的比例），再在限制內求好看。

---

## 三、色彩系統

| 色票 | Hex | 角色 | 建議比例 |
|---|---|---|---|
| 夜鉛底 | `#141A1E` | 地色（工坊暗場／未透光處） | 34% |
| 鉛心 | `#3E4349` | 全部輪廓與分隔的主色 | 14% |
| 鉛暗緣 | `#1D2126` | 輪廓外側，製造斷面厚度 | 6% |
| 鉛斷面高光 | `#8E969D` | 輪廓中心的一道細亮線 | 2% |
| 背光象牙 | `#F4EBD7` | 光源色；色域全部乘在它上面 | 12% |
| 鼠尾草綠 | `#7E8F6B` | 主色域 A | 8% |
| 孔雀藍綠 | `#2F6B6B` | 主色域 B（深） | 6% |
| 薊紫 | `#7A6480` | 主色域 C | 5% |
| 乾玫瑰 | `#B0705E` | 主色域 D（暖） | 5% |
| 苔綠 | `#4A5B43` | 葉與植物母題 | 3% |
| 赭金 | `#C79A3F` | 唯一的金屬色：強調、連結、裝飾母題 | 4% |
| 琥珀 | `#D8A54A` | 赭金的亮階（hover／現用態） | 1% |

**規則**

- 大面積地色永遠是**鉛與夜**，不是彩色。彩色是被光穿過來的，它只能出現在「有玻璃的地方」。
- 赭金＋琥珀合計 ≤ 8%。金一多，就變成裝飾藝術。
- **不得使用**：紫藍漸層、高彩度三原色大面積、任何 `box-shadow` 的模糊陰影（鉛條沒有柔邊）、圓角（鉛條的轉角是折的）。
- 相鄰色域 `ΔL ≥ 14`。計算用相對明度即可：`L = 0.2126R + 0.7152G + 0.0722B`（先做 sRGB 線性化）再取百分制。

---

## 四、字體系統

| 用途 | 字體 | 來源 | 設定 |
|---|---|---|---|
| 展示／標題（拉丁） | **Amarante** | Google Fonts | 400；`letter-spacing:.03em`；`line-height:1.28` |
| 標籤／編號／小標（拉丁） | **Federo**（Jakob Erbar 一九〇九年 Feder Grotesk 的數位化） | Google Fonts | 400；`letter-spacing:.16em`；`text-transform:uppercase`；`.66–.78rem` |
| 中文內文與標題 | **Noto Serif TC** | Google Fonts | 400／700／900；`line-height:1.85`；`letter-spacing:.02em` |

字級階梯（1.26 倍）：`0.62 / 0.72 / 0.86 / 1 / 1.26 / 1.6 / 2.05 / 2.6 rem`。
內文 17px、行高 1.85——新藝術的版面很擠，行距必須撐開才讀得下去。

**為什麼是這兩支拉丁字**：Amarante 的骨架直接取自新藝術的植物字（窄、中高對比、字腔被擠成葉形）；Federo 源自一九〇九年的 Feder Grotesk，是**年代正確**的無襯線，用來當標籤不會出戲。不要用 Playfair Display（十八世紀 Didone，差一百年）、不要用任何預設系統字堆疊。

---

## 五、版面與網格

- **非對稱是強制的。** 主欄 : 次欄 = `1fr : .62fr`（黃金比的近似），並且**每隔一個區塊就左右對調**（`.flip`）。不要置中單欄。
- **不要三張等寬圓角卡片。** 要並列就用鉛條圍起來的「格」，寬度不等（例如 `1.25fr .75fr`）。
- **留白給光，不給空。** 大面積的暗場不是留白，是「還沒有玻璃的地方」——它應該是連續的、有方向的（一道自左上斜下的光場），不是均勻的灰。
- **旋轉角度**：新藝術幾乎不旋轉元素。傾斜只出現在**光**上（投影用 `skewX(-13deg)`），不出現在文字或方塊上。
- **斷點**：`≤900px` 導覽落為橫列、雙欄塌成單欄；`≤560px` 內距 16px、標題降到 1.6rem。
- **窄開口要重新構圖，不是縮小**。實物也是這樣：小窗用 6mm 鉛、大窗用 14mm，而且小窗掛不下名牌片。本站的規則是 `W < 78 cm` 時——鉛條寬度降到 6mm、每格目標邊長由 13 降到 9、名牌疊片整個取消（資訊改由 HTML 正文承擔）、光暈鑲片移到正中央、卷鬚由兩支減為一支並移到右側空曠處。等比例縮小只會得到一面糊掉的窗。

```css
.asym{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,.62fr); gap:46px; align-items:start; }
.asym.flip{ grid-template-columns:minmax(0,.62fr) minmax(0,1fr); }
@media(max-width:900px){ .asym,.asym.flip{ grid-template-columns:1fr; gap:30px } }
```

---

## 六、元件配方

### 導覽（came-joint 焊點）
不用置頂文字列。用一小片鉛條骨架，每一頁是骨架上的一個**交會點**；非現用頁的交點是「未焊」——兩條鉛條只是交疊，中間看得見一道細縫；現用頁的交點被**焊起來**：一滴錫隆起、縫消失、旁邊帶一點高光。

```svg
<g fill="none" stroke-linecap="round">
  <path d="M20 12V94 M118 12V94 M6 33H208 M6 76H208" stroke="#1D2126" stroke-width="7.4"/>
  <path d="M20 12V94 M118 12V94 M6 33H208 M6 76H208" stroke="#3E4349" stroke-width="5.2"/>
  <path d="M20 12V94 M118 12V94 M6 33H208 M6 76H208" stroke="#8E969D" stroke-width="1" stroke-opacity=".7"/>
</g>
<!-- 未焊：留一道縫 -->
<path d="M20 25.4V40.6" stroke="#141A1E" stroke-width="1.1"/>
<!-- 已焊：不規則的一滴錫＋高光 -->
<path d="M111.6 31.8c-.3-3.1 1.9-5.2 4.9-5c3 .2 5.2 2 5 5.1c-.2 3-2.2 5-5.2 4.9c-2.9-.1-4.5-2-4.7-5z" fill="#A9B0B4"/>
<path d="M114 29.6c1.2-1 3-1.1 4-.2" fill="none" stroke="#EDE3CE" stroke-width="1.1" stroke-opacity=".9"/>
```

### 按鈕
```css
.btn{
  background:var(--ochre); color:#10151A; border:0; border-radius:0;
  padding:11px 26px; font-weight:700; letter-spacing:.08em;
  box-shadow:0 0 0 2px #1D2126, 0 0 0 5px #3E4349;   /* 鉛條圍邊 */
}
.btn:hover{ background:var(--amber) }
.btn.ghost{ background:transparent; color:var(--ivory) }
```

### 卡片／區塊（一律叫「格」）
```css
.pane{ background:#1B2228; padding:22px 24px; border-radius:0;
  box-shadow:0 0 0 2px #1D2126, 0 0 0 5px #3E4349, 0 0 0 6px #8E969D; }
```

### 表單
輸入框用**內縮**的鉛條（`inset` box-shadow），因為玻璃是嵌進鉛槽裡的：
```css
input,select,textarea{
  background:#232B32; color:var(--ivory); border:0; border-radius:0; padding:10px 12px;
  box-shadow:inset 0 0 0 2px #1D2126, inset 0 0 0 4px #3E4349;
}
label{ font-family:"Federo",sans-serif; letter-spacing:.16em; text-transform:uppercase;
  font-size:.66rem; color:var(--ochre); }
```

### 表格
`border-collapse:collapse`，列分隔用 `2px solid #3E4349`（就是鉛條），表頭用 Federo 小字大字距的赭金。不要斑馬紋。

### Footer
上緣 `6px solid #3E4349`（一條外框鉛條），底色由 `#1B2228` 漸到 `#141A1E`。三欄不等寬 `1.3fr .8fr .8fr`。

---

## 七、動效規則

**四種都要有，一種都不能少。安靜不是風格，安靜是沒做完。**

| 類別 | 本風格的做法 | 觸發 | duration / easing |
|---|---|---|---|
| **ambient 環境** | 日照方位隨真實時刻移動：`--sun`（0=清晨 1=黃昏）驅動背光徑向漸層的圓心與整體強度。同一頁在不同時刻是不同的配色。 | 無（時鐘 + 30 秒輪詢） | 連續，無 easing |
| **input-driven 輸入** | 游標即一盞近距離的燈：`pointermove` 更新 `--torch-x/y/r`，一層 `mix-blend-mode:screen` 的徑向光跟著走，經過的玻璃亮起。 | 指標 | `.18s linear`（延遲 < 100ms） |
| **transition 轉場** | 換頁＝太陽斜斜掃過窗面：`@view-transition{navigation:auto}` ＋ `::view-transition-new(root)` 的傾斜 `clip-path` 掃出；同時把主要鑲片標上 `view-transition-name` 讓骨架原地 morph。 | 導覽 | `.62s cubic-bezier(.2,.7,.25,1)` |
| **signature 簽名** | **透光投影染色 transmission-cast**：把同一批玻璃再畫一次，`skewX(-13deg) scaleY(.52)` 投到窗下方的內容上，`mix-blend-mode:multiply` — 玻璃的顏色**離開玻璃**、落在正文上，把字真的染成那個顏色，並隨 `--sun` 在頁面上移動。 | 時刻 + 版面 | 連續 |

```css
/* signature：透光投影染色 */
.cast{ position:relative; height:0; pointer-events:none; z-index:2 }
.castsvg{
  position:absolute; left:0; top:0; width:100%;
  mix-blend-mode:multiply; opacity:var(--cast-op);
  filter:blur(9px) saturate(1.25);
  transform:translateX(var(--cast-x)) skewX(-13deg) scaleY(.52);
  transform-origin:50% 0;
}
/* 轉場：斜向掃光 */
@keyframes mk-sweep{
  from{ clip-path:polygon(0 0,0 0,-22% 100%,-22% 100%) }
  to  { clip-path:polygon(0 0,144% 0,122% 100%,-22% 100%) }
}
::view-transition-new(root){ animation:.62s cubic-bezier(.2,.7,.25,1) both mk-sweep }
::view-transition-old(root){ animation:.40s ease-in both mk-dim }
```

**`prefers-reduced-motion` 降級（四種都要，且資訊零損失）**

| 動效 | 降級後 |
|---|---|
| ambient 日照 | 停在造訪當下的時刻，配色照算，只是不再自己走（輪詢拉長到 10 分鐘） |
| input 游標燈 | 光半徑設 0，改由 `:focus-visible` 的瞬時描邊承擔同一件事 |
| transition 轉場 | `@view-transition{navigation:none}`，一般導覽，頁面內容完全相同 |
| signature 投影染色 | 保留投影本身（它是資訊：那是窗的顏色），移除移動與模糊的動態更新 |

**禁止**：通用淡入當作簽名、數字計數、`stroke-dashoffset` 描繪（這三者在本館已過載）、按壓硬陰影。

---

## 八、插畫與圖像風格

技法名稱：**came-cloisonné 鉛條分割彩窗製圖**。

**全站不畫任何一張「描外形」的插圖。** 所有圖像——logo、favicon、案例縮圖、章節飾片、回執印記——都由同一支引擎生成，三層疊起來：

1. **背光層**：一塊徑向漸層，從 `#FFF8E6` 到 `#C9BFA6`。這是唯一的光源。
2. **玻璃層**（`mix-blend-mode: multiply`）：由鉛條路徑切出的封閉面域，每一格填一片玻璃。玻璃分類決定 paint server：Cathedral → 徑向漸層；Streaky／Opalescent → 多停點線性漸層；Antique → 近垂直的細微條紋；Seedy → `feTurbulence` fractalNoise 點成氣泡；Reamy → `feDisplacementMap` 橫向拉波；Glue-chip → `feDiffuseLighting` 打出冰裂結晶。
3. **鉛條層**（key 版，最上）：同一條路徑描三次——暗緣 `1.34w` / 鉛心 `1.0w` / 高光 `0.19w`。

分割本身是幾何：把開口切成 m×n 的**節點**，用一個低頻＋高頻疊加的位移場把內部節點推開（邊界節點釘死），相鄰節點之間用三次貝茲連起來，控制點沿法向偏移一個由節點編號雜湊決定的簽名曲率——**共用邊必得同值，所以每一格永遠密合，不會有縫**。

```js
// 鞭索位移場（邊界不動，內部長成有機的不規則）
function warp(u,v,s){ const a=(s%1000)/159;
  return [ Math.sin(v*2.3+a)*0.062 + Math.sin(v*5.7+a*2.1)*0.019,
           Math.sin(u*1.9+a*1.7)*0.050 + Math.sin(u*4.3+a*0.6)*0.015 ]; }
// 邊的簽名曲率：同一條邊被兩格共用時必須拿到同一個 k
function curv(i,j,o,s){ return ((fnv(i+':'+j+':'+o+':'+s) % 2000)/1000 - 1) * 0.115; }
```

**貼鉛卷鬚 overlay leadlight**：主分割之外，另外在面上「貼」兩三條鞭索卷鬚——一道反向淺弧掃進一條等角螺線（`r = R·e^{-2.6s}`，轉約 2.7 圈）。這是真實工法（自黏鉛條 overlay，常用於既有玻璃加工），也是特徵 1 在畫面上唯一無可爭辯的證據；沒有它，warp 過的格網只會讀成「歪掉的方格」。

```js
// 反向淺弧（二次貝茲取樣）→ 等角螺線 → Catmull-Rom 轉三次貝茲
function tendril(x, y, len, dir, hand){        // hand = ±1 決定捲向
  var pts = [], R0 = len * 0.40;
  var cx = x + Math.cos(dir) * len * 0.90, cy = y + Math.sin(dir) * len * 0.90;
  var th0 = dir + hand * Math.PI * 0.5;
  var ex = cx + Math.cos(th0) * R0, ey = cy + Math.sin(th0) * R0;
  var kx = x + Math.cos(dir - hand * 0.82) * len * 0.64,
      ky = y + Math.sin(dir - hand * 0.82) * len * 0.64;
  for (var i = 0; i <= 18; i++){ var t = i / 18, u = 1 - t;      // 段一：反向淺弧
    pts.push([u*u*x + 2*u*t*kx + t*t*ex, u*u*y + 2*u*t*ky + t*t*ey]); }
  for (i = 1; i <= 30; i++){ var s = i / 30,                      // 段二：等角螺線
      th = th0 + hand * s * Math.PI * 2.7, rr = R0 * Math.exp(-2.6 * s);
    pts.push([cx + Math.cos(th) * rr, cy + Math.sin(th) * rr]); }
  return cr2cubic(pts);            // 再描三次：暗緣 1.26w／鉛心 0.92w／高光 0.17w
}
```



**配玻方案：由上而下三段，奇偶格分明暗**。隨機配玻會得到一面「拼布」，不是新藝術。把畫面切成天／中／地三段，每段各備一組「淡」與「深」的料，格子依 `(col+row)%2` 交錯取用——因為相鄰格永遠奇偶相反，任兩鄰格必定一淡一深，**ΔL ≥ 14 由構造保證，不必事後檢查**（實測 9×4 的窗最小 ΔL = 22、糊邊 0 處、金色面積 6.0%）。

```js
var BANDS = [
  { light:["OP-07","GC-01","SE-03"], dark:["CA-21","ST-12","OP-19"] },  // 天 85-88 / 48-54
  { light:["SE-03","OP-07"],         dark:["CA-52","CA-34","ST-12"] },  // 中 85-86 / 40-48
  { light:["RE-08","SE-03"],         dark:["AN-1913","FL-27","ST-45"] } // 地 66-85 / 24-33
];
function glaze(ct, seed){
  var r = rng(seed), a = {}, rows = ct.rows;
  ct.pieces.forEach(function(p){
    if (p.zone !== "field"){ a[p.id] = p.leaf ? "CA-52" : "CA-21"; return; }
    var v = rows > 1 ? p.row / (rows - 1) : 0;
    var b = BANDS[v < 0.34 ? 0 : (v < 0.68 ? 1 : 2)];
    var pool = ((p.col + p.row) % 2 === 0) ? b.dark : b.light;
    a[p.id] = pool[Math.floor(r() * pool.length)];
  });
  return a;
}
// 三段的交界也要驗過：天深(<=54) 對 中淡(>=85)、中深(<=48) 對 地淡(>=66)，皆 >= 14
```



**與相近技法的差別**：與 `flat-shape`（無描邊色塊構成）的差別是本技法的色域**必被鉛條圍住**、不得自由漂浮，而且鉛條有寬度與斷面高光；與 `papercut`（剪紙拼貼）的差別是剪紙是不透光的疊層、本技法每一格都是透光的；與 `grille-lattice`（鐵窗花格）的差別是鐵桿承力、分割由結構解出，而鉛條不承力（它是脆的），分割由鞭索線的美學語彙決定。

**疊片（plating）**：需要在畫面上放一個獨立的小構圖（品牌鑲片、名牌條、印記）時，不要在主分割上挖洞——另做一片小的鑲嵌**疊在上面**，這是真實工法，而且 `multiply` 會自動把兩層玻璃的顏色乘起來，物理上也對。

---

## 九、Logo 與 Favicon 設計指南

**Logo**：一枚圓形鑲片（rondel）。外環 12 片彩色玻璃、內環 6 片、中心一塊乳白玻璃，三道同心鉛環；中心的乳白片上長出一條**收尾成螺旋的鞭索卷鬚**與兩片不對稱的葉。圓＝Mucha 光暈（特徵 2），鉛環＝cloisonné（特徵 3），卷鬚＝鞭索線（特徵 1）——一枚標誌同時交代三個特徵。

**Favicon**：同一枚 rondel 簡化到 32×32。細節一律砍掉，只留**六片扇形玻璃 ＋ 三條直徑鉛條 ＋ 中心乳白圓**。inline SVG data URI，不用點陣檔：

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
<rect width='32' height='32' fill='%23141A1E'/><g transform='translate(16,16)'>
<!-- 六片扇形（角度 -90 起，每 60 度一片）-->
… <path d='M0 0L0 -13A13 13 0 0 1 11.26 -6.5Z' fill='%237E8F6B'/> …
<g fill='none' stroke='%233E4349' stroke-width='2.6'>
<path d='M0 -13L0 13'/><path d='M11.26 -6.5L-11.26 6.5'/><path d='M11.26 6.5L-11.26 -6.5'/>
<circle r='13'/><circle r='4.8'/></g><circle r='4.8' fill='%23EDE3CE'/></g></svg>">
```

---

## 十、Do & Don't

**Do**

- 先決定光源，再決定顏色。任何一塊色都必須說得出「它背後的光是什麼」。
- 讓鞭索線承擔真正的版面分割，而不是貼在角落當花邊。
- 四個角的裝飾各自不同。同一支卷鬚 rotate 四份是裝飾藝術的做法，不是新藝術。
- 把 ΔL ≥ 14 寫成程式檢查，並在介面上把違規處指名道姓講出來——這條規則本身就是很好的內容。
- 用年代正確的字（Amarante／Federo／Noto Serif TC）。

**Don't**

- 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- 圓角。鉛條的轉角是折的。`border-radius` 在本風格只允許用在正圓（rondel）。
- 模糊陰影。鉛沒有柔邊；要立體感就用「暗緣／心／高光」三層實色描邊。
- emoji 當 icon。icon 一律是鉛條分割出來的形。
- 高彩度三原色大面積、金超過 8%。
- 對稱的 S 形曲線（那是 Art Deco）、幾何等分的邊框（那是 Arts & Crafts）。
- 把顏色寫死在元件上。一旦寫死，光源一動全站就不會跟著動，整套語言就垮了。
- `Lorem ipsum`、AI 腔文案、「EST. 19xx」年份徽章。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,…"><!-- 見第九節 -->
<link href="https://fonts.googleapis.com/css2?family=Amarante&family=Federo&family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
@view-transition{navigation:auto}
@keyframes mk-sweep{from{clip-path:polygon(0 0,0 0,-22% 100%,-22% 100%)}
  to{clip-path:polygon(0 0,144% 0,122% 100%,-22% 100%)}}
@keyframes mk-dim{from{opacity:1}to{opacity:0}}
::view-transition-old(root){animation:.40s ease-in both mk-dim}
::view-transition-new(root){animation:.62s cubic-bezier(.2,.7,.25,1) both mk-sweep}
@media(prefers-reduced-motion:reduce){@view-transition{navigation:none}
  ::view-transition-old(root),::view-transition-new(root){animation:none}}

:root{--lead:#3E4349;--lead-dk:#1D2126;--lead-hi:#8E969D;--night:#141A1E;--night2:#1B2228;
  --backlight:#F4EBD7;--sage:#7E8F6B;--teal:#2F6B6B;--thistle:#7A6480;--rose:#B0705E;
  --ochre:#C79A3F;--amber:#D8A54A;--ivory:#EDE3CE;--sun:.5;--cast-x:0px;--cast-op:.5}
body{margin:0;background:var(--night);color:var(--ivory);
  font-family:"Noto Serif TC",serif;font-size:17px;line-height:1.85}
body::before{content:"";position:fixed;inset:0;z-index:-2;
  background:radial-gradient(120% 90% at calc(8% + var(--sun)*84%) -8%,#2C3841 0%,#1A2126 46%,#10151A 100%)}
.disp{font-family:"Amarante",serif;font-weight:400}
.lat{font-family:"Federo",sans-serif;letter-spacing:.16em;text-transform:uppercase;font-size:.72rem}
.pane{background:var(--night2);padding:22px 24px;border-radius:0;
  box-shadow:0 0 0 2px var(--lead-dk),0 0 0 5px var(--lead),0 0 0 6px var(--lead-hi)}
.asym{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.62fr);gap:46px;align-items:start}
@media(max-width:900px){.asym{grid-template-columns:1fr;gap:30px}}
.sash svg{display:block;width:100%;height:auto;isolation:isolate}
.glass{mix-blend-mode:multiply}
.cast{position:relative;height:0;pointer-events:none;z-index:2}
.castsvg{position:absolute;left:0;top:0;width:100%;mix-blend-mode:multiply;opacity:var(--cast-op);
  filter:blur(9px) saturate(1.25);transform:translateX(var(--cast-x)) skewX(-13deg) scaleY(.52);
  transform-origin:50% 0}
</style></head>
<body>
<header class="top"><a class="brand" href="index.html">…rondel…<b>品牌</b></a>
  <nav class="joints">…焊點導覽…</nav></header>
<main>
  <section class="hero">
    <div class="sash" style="view-transition-name:came-armature"><!-- 引擎產生的整扇窗 --></div>
    <div class="cast"><div class="castsvg"><!-- 同一批玻璃，投影染色 --></div></div>
  </section>
  <div class="wrap"><section class="asym">
    <div><h2 class="disp">標題</h2><p>…</p></div>
    <div class="pane"><h3>…</h3><p>…</p></div>
  </section></div>
</main>
<footer>…</footer>
<script>/* cartoon 引擎、日照、游標燈；全部 inline */</script>
</body></html>
```

---

## 十二、技術實作與相容性

本風格的三項核心技術，各自承載什麼、支援現況、查不到時退到哪裡。

### (a) `mix-blend-mode`（渲染層）— 承載「顏色是光乘出來的」

整套色彩系統的唯一來源。玻璃層設 `mix-blend-mode:multiply` 疊在背光層上；signature 的投影染色也是同一個機制。容器必須設 `isolation:isolate`，否則會和頁面底色混在一起。

- **支援**：Baseline **Widely available**（自 2020 年 1 月起可用）：Chrome 41+／Edge 79+／Firefox 32+／Safari 7.1+（iOS Safari 8+）。查證：MDN／caniuse（`mdn-css_properties_mix-blend-mode`）。
- **fallback**：無支援時 `multiply` 被忽略，色域會直接以自身 hex 平塗——畫面仍然完整、輪廓與構成不變，只是失去「光」的那一層。這是可接受的降級，不必寫 `@supports`。若要嚴謹，可 `@supports not (mix-blend-mode: multiply){ .glass{opacity:.92} }` 補一點透明感。

### (b) View Transitions API（動效時間軸層）— 承載「換頁＝太陽掃過窗面」

跨文件用 `@view-transition{navigation:auto}` ＋ `::view-transition-new(root)` 的傾斜 `clip-path`；同文件（換玻璃、切窗型）用 `document.startViewTransition(cb)`。

- **支援（同文件 same-document）**：**Baseline Newly available（2025-10）**。Chrome 111+（2023-03）、Safari 18+（2024-09）、Firefox 144+（2025-10，初版不含 view transition types）。
- **支援（跨文件 cross-document）**：Chrome 126+／Edge 126+／Opera 112+／Safari 18.2+。**Firefox 尚未在穩定版預設開啟**；MDN 對 `@view-transition` 的狀態明載為「Limited availability，非 Baseline」。
- **查證**：MDN `Document.startViewTransition()`／`ViewTransition`／`@view-transition`；web.dev「Same-document view transitions are now Baseline Newly available」。
- **fallback 的具體行為**：不支援時 `@view-transition` 整條規則被忽略、`document.startViewTransition` 不存在。程式碼一律寫成
  ```js
  function swap(fn){ (document.startViewTransition && !RM.matches)
    ? document.startViewTransition(fn) : fn(); }
  ```
  結果是**一般的頁面導覽／一般的 DOM 更新**：沒有動畫，所有內容、狀態與資訊完全相同。`prefers-reduced-motion: reduce` 走的是同一條路徑。

### (c) `ResizeObserver`（輸入與感測層）— 承載「窗是照你的開口現割的」

首屏那扇窗不是一張固定的圖：量測容器寬度 → 以 96dpi 換算公分 → 按 1:4 放樣成實物尺寸 → 重跑一次鉛條分割。因為玻璃有**最小可切邊長 2.5 cm**，開口變窄時格數會真的變少（少切一刀），所以手機與桌機看到的不是同一扇窗。

- **支援**：全球使用率 **96.39%**（caniuse `mdn-api_resizeobserver`，統計基準 2026 年 8 月）。Chrome 64+／Firefox 69+／Safari 13.1+／Edge 79+／iOS Safari 13.4+。
- **fallback**：`if(window.ResizeObserver){…} else { window.addEventListener("resize", schedule) }`。行為完全相同，只是不會對「容器變了但視窗沒變」的情況反應。
- **回授防護（必做）**：重繪會改變被觀察元素的高度，直接回呼 `build()` 會造成無限迴圈。作法是在 rAF 裡比對「量到的寬度 ＋ `innerHeight`」，沒變就直接 return。

### 效能預算（本站實測）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG，不含 Google Fonts） | ≤ 350 KB | 39.7 – 43.7 KB |
| 首屏 JS 執行 | ≤ 100 ms | 分割引擎 0.35 ms／46 片、1.50 ms／122 片；SVG 字串組裝 0.07／0.15 ms；加上一次 `innerHTML` 與樣式重算，首屏總計仍在 20 ms 以內 |
| 主要動畫 | 60 fps | 日照與投影只改 CSS 自訂屬性（`--sun`／`--cast-x`／`--cast-op`），不重算幾何；游標燈只改三個變數，無 layout thrashing |
| 路徑資料量 | — | 一扇 57 片的窗約 7 KB 的 path `d`；四頁全部零外部圖片、零外部音檔、零函式庫 |

**量測方式**：同一支引擎在 Node 22（`process.hrtime.bigint()`）跑 9 次取中位數——分割 46 片 0.35 ms／122 片 1.50 ms，SVG 字串組裝 0.07 ms／0.15 ms，產出的 SVG 為 14.3 KB／39.0 KB。頁面大小為建置後檔案的位元組數。真正的成本在瀏覽器端的一次 `innerHTML` 與樣式重算，所以重繪一律包在 `requestAnimationFrame` 裡並比對尺寸後才執行；若把開口拉到 200 片以上，把 `target`（每格目標邊長）調大讓格數降下來即可。

### 其他實作注意

- **SVG 展示屬性不要放 `var()`**。`stroke="var(--lead)"` 在各家瀏覽器的支援並不一致；鉛條顏色一律寫實色（`#3E4349`），或改用 CSS 規則選到該元素再設 `stroke`。
- **`stroke-width` 的單位是使用者座標**。若 viewBox 以公分為單位，`stroke-width="0.92"` 就是 9.2 mm 的鉛條——這正好是實物規格，很好用，但不要誤寫成 px。
- **`filter` 屬性會被 CSS `filter` 覆蓋**。玻璃的織理濾鏡寫在屬性上時，hover 不要再用 CSS `filter`，改用 `stroke` 做高光（近白的描邊在 multiply 下會露出背光色，讀起來就是「那一格亮了」）。

---

*本規格書由《蔓光鑲嵌所》範例站抽出。風格與內容分離：把第一節的五個特徵搬到任何產業都成立——本站示範的是彩繪玻璃鑲嵌工坊，但同一套語言拿去做香水、劇院、書店、植物園、珠寶、溫室或咖啡烘焙都對。*
