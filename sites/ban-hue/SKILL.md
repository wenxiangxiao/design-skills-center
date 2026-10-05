---
name: maximalism-more-is-more
description: Maximalism ("less is a bore") — pattern-on-pattern at three scales, saturated clashing jewel colours tied together by one repeated thread colour, three or more typefaces led by a soft wonky display serif, densely salon-hung gilt frames with no plain wall showing, and every edge finished with scallops, fringe or tassels plus a bestiary of bees and snakes.
---

# 極繁 Maximalism

> 範例站：萬花壁紙 Ban-Hue（高雄鹽埕的壁紙・布料・流蘇行）。本規格與產業無關——凡是「東西越多越好看」的品牌都能用：古著店、花店、酒吧、民宿、甜點、珠寶、香氛、劇場、美容院、獨立書店。

## 1. 設計哲學

**一句話：少，是無聊（Less is a bore）。但多，必須有規矩。**

**年代與譜系**（這不是 2020 年代才冒出來的網路流行語，它是一條反極簡的長線）：

- **1930s–50s｜Dorothy Draper 的 Modern Baroque**。1946 年 Chesapeake & Ohio 鐵路公司請她在 16 個月內重新裝修 The Greenbrier 度假飯店：Jefferson 藍牆、黑大理石壁爐、黑白棋盤地、超大的「高麗菜玫瑰」印花布（她的 cabbage rose chintz 賣出一百萬碼以上）、寬條紋。她證明了「大花＋寬條＋棋盤格」可以同時存在於一個房間。
- **1966｜Robert Venturi《Complexity and Contradiction in Architecture》**。回嘴 Mies 的 "less is more"：**"Less is a bore."**「我要意義豐富，不要意義清楚。」這是本風格的理論出生證明。
- **Iris Apfel**（1921–2024）："More is more and less is a bore." 疊戴首飾、大眼鏡、二手市場與高級訂製混穿——把 Venturi 的建築口號穿在身上。
- **2015–2022｜Alessandro Michele 的 Gucci**。在 Phoebe Philo 式極簡統治十年之後，把碎花、條紋、蜂、虎、蛇、蕾絲與花呢全部撞在一起，時尚媒體正式稱之為 maximalism。
- **2018–｜當代室內**：Martin Brudnizki（倫敦 Annabel's 2018）、Kit Kemp、"dopamine decor"。

**為什麼長成這樣**：
1. **它是對「乾淨」的反彈**。每一次極簡統治太久（國際主義、Céline、Apple 白），就會有人把花布拿回來。所以它的敵人是留白、灰階、單一字體。
2. **它來自印刷布與壁紙工業**。網版與滾筒印花讓一卷紙可以印上十幾色、整片重複；「版距（repeat）」「對花（match）」「尺度（scale）」是這個行業的真實詞彙，也是本風格的文法。
3. **它有規矩，只是規矩不是「少」**。室內設計師混花的老規則：**三種尺度（大、中、小）、一條共同色、至少一種幾何（條紋或格）當和事佬**。沒有這三條，它就只是亂。

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，它就滑向別的風格：拿掉花樣疊花樣→變成普普或孟菲斯；拿掉串色→變成迷幻或 Grunge；拿掉軟字混排→變成 Victorian；拿掉密掛→變成編輯排版；拿掉收邊與動物→變成 Bento 或一般電商。

### 特徵 1｜形狀語彙：花樣疊花樣，三種尺度同時出現

任何一個視窗（首屏、捲動任一處）至少同時看得見 **3 種不同家族的圖樣**：一種大花（具象花卉，單元 ≥ 180px）、一種中圖樣（動物斑或枝葉，單元 80–200px）、一種小幾何（格、鱗、條、十字繡，單元 ≤ 48px）。圖樣彼此**直接相鄰**，中間不墊白邊。素色面只准出現在「卡片內文底」，且面積不超過該視窗 15%。

```html
<!-- 一律用 SVG <pattern>，每個表面都是一扇窗 -->
<svg width="0" height="0" style="position:absolute"><defs>
  <pattern id="p-peony" patternUnits="userSpaceOnUse" width="240" height="240">…</pattern>
  <pattern id="p-leopard" patternUnits="userSpaceOnUse" width="200" height="200">…</pattern>
  <pattern id="p-check" patternUnits="userSpaceOnUse" width="48" height="48">
    <rect width="48" height="48" fill="#F6E7CF"/><rect width="24" height="24" fill="#1A1210"/>
    <rect x="24" y="24" width="24" height="24" fill="#1A1210"/>
    <path d="M36,8l4,4-4,4-4-4z" fill="#E8407A"/><path d="M12,32l4,4-4,4-4-4z" fill="#E8407A"/>
  </pattern>
</defs></svg>
<svg class="pat"><rect width="100%" height="100%" fill="url(#p-peony)"/></svg>
```

### 特徵 2｜色彩規則：撞色，但一條串色貫穿所有圖樣

至少一組**互撞**（牡丹粉 × 祖母綠、番茄紅 × 鈷藍、番紅花黃 × 孔雀藍）同時出現；所有色都要飽和，不准灰褐 greige、不准整片粉彩。**每一種圖樣裡都必須出現同一個「串色」**（本站是 `#E8407A`，在牡丹花瓣、檸檬花心、蜂格節點、條紋寬條、豹斑底、魚鱗頂點、棋盤菱形裡全都有）。串色就是讓撞色不打架的那條線。

```css
:root{
  --thread:#E8407A;           /* 串色：每個 pattern 都要含它 */
  --em:#0F6B4F; --cb:#1E3FA0; --tq:#2FA6A0;  /* 冷撞 */
  --tm:#D8352A; --sf:#F2B230;                /* 暖撞 */
  --ink:#1A1210; --cr:#F6E7CF; --gd:#C69A3B; /* 墨、奶油、金框 */
}
```

### 特徵 3｜字體選擇：至少三種字混排，主角是一支「軟、歪」的展示襯線

- **主角**：Fraunces（Undercase Type，可變軸 `opsz 9–144`、`wght 100–900`、`SOFT 0–100`、`WONK 0–1`）——SOFT 讓襯線像沾了墨般圓潤，WONK 讓 h/n/m 前傾；這種「有點醉」的軟襯線是 2020 年代極繁字感的核心。大量用斜體。
- **中文**：Noto Serif TC 900，粗、正、比拉丁字大。
- **第三種**：Big Shoulders Display 900 全大寫窄字，用在標籤、價格說明、kicker。
- 同一張卡片內至少出現兩種字；字級跳級要大（展示字 ≥ 內文 5 倍）。

```css
.disp{font-family:"Fraunces",Georgia,serif;font-optical-sizing:auto;
  font-variation-settings:"SOFT" var(--soft,100),"WONK" var(--wonk,1)}
h1.disp{font-style:italic;font-weight:560;font-size:clamp(70px,10.5vw,158px);line-height:.86}
.cond{font-family:"Big Shoulders Display",sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:.06em}
/* hover：從軟到硬、從歪到正 */
a:hover .disp{--soft:0;--wonk:0}
```

### 特徵 4｜版面手法：沙龍密掛（salon hang），牆面幾乎不外露

內容以「掛在花牆上的框」組織：大小、形狀全部不同（長方金框、橢圓框、拱頂框、圓鏡、窄長條框、十字繡樣框），**每個框都歪 −3°～+3°**，框與框間距 ≤ 26px、可以互相壓邊；框外露出的就是壁紙。不准對齊成整齊的卡片牆，不准三等分。覆蓋率 ≥ 85%（horror vacui）。

```css
.salon{display:grid;grid-template-columns:repeat(12,1fr);gap:26px 22px;
  grid-template-areas:"a a a a a a a b b b b b" "a a a a a a a c c c e e"
                      "d d d d f f f h h h e e" "d d d d f f f g g g g g"}
.fa{grid-area:a;--r:-1deg}.fb{grid-area:b;--r:1.6deg}.fc{grid-area:c;--r:-2.6deg}
.fr{transform:rotate(var(--r))}
.gilt{padding:15px;background:radial-gradient(circle,#EBCB7A 0 1.8px,transparent 2.3px) 0 0/8px 8px,#C69A3B;
  box-shadow:inset 0 0 0 2px #7A5518,inset 0 0 0 4px #EBCB7A,inset 0 0 0 6px #7A5518,5px 8px 0 rgba(10,30,22,.45)}
.gilt>.in{border:3px solid #7A5518;box-shadow:0 0 0 2px #EBCB7A;overflow:hidden}
.gilt.oval,.gilt.oval>.in{border-radius:50%}
.gilt.arch,.gilt.arch>.in{border-radius:999px 999px 6px 6px}
```

### 特徵 5｜裝飾母題：每一條邊都要收（扇貝、流蘇、珠緣），再放一群動物

沒有任何一條「素的直邊」：框有珠緣、帷幔有扇貝、扇貝下有珠串流蘇、導覽是拉鈴繩與流蘇。動物母題至少兩種（本站：蜂、蛇；可替換為虎、鸚鵡、猴、孔雀）。

```css
/* 扇貝下緣：14px 半圓一個接一個 */
.scallop{mask:radial-gradient(circle at 50% 0,#000 69%,transparent 71%) 0 100%/28px 14px repeat-x,
             linear-gradient(#000 0 0) 0 0/100% calc(100% - 13px) no-repeat}
```
```svg
<!-- 珠串流蘇：金線＋粉珠，9×44 平鋪 -->
<pattern id="p-fringe" patternUnits="userSpaceOnUse" width="9" height="44">
  <path d="M4.5,0V36" stroke="#C69A3B" stroke-width="2.2"/><circle cx="4.5" cy="38" r="3.4" fill="#E8407A"/>
</pattern>
```

## 3. 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 牡丹粉（串色） | `#E8407A` | 每一種圖樣都含；按鈕、強調、h1 | 15% |
| 祖母綠 | `#0F6B4F`／深 `#0A4A37`／葉 `#2E9B6E` | 大花地、頁底、葉 | 22% |
| 鈷藍 | `#1E3FA0` | 中圖樣地、鏡面 | 12% |
| 孔雀藍 | `#2FA6A0` | 小圖樣（魚鱗） | 5% |
| 番茄紅 | `#D8352A` | 條紋細線、價格、地址橫幅 | 6% |
| 番紅花黃 | `#F2B230` | 花心、檸檬、蜂、kicker | 6% |
| 洋紅深 | `#A3174F` | 花心、豹斑心、次要字 | 4% |
| 淡粉 | `#F7A1BD`／豹底 `#F29BB8` | 內瓣、豹紋地 | 6% |
| 金框 | `#C69A3B`／亮 `#EBCB7A`／暗 `#7A5518` | 所有框、桿、珠緣 | 10% |
| 漆黑 | `#1A1210` | 刊頭底、蜂格地、描邊 | 8% |
| 奶油 | `#F6E7CF` | 卡片內文底（唯一素色） | ≤ 15% |

規則：同一視窗至少一組冷暖互撞；串色在每個 pattern 裡都要出現；奶油只做「讀字的地方」。

## 4. 字體系統

- 來源：Google Fonts — `Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1`、`Noto Serif TC:wght@500;700;900`、`Big Shoulders Display:wght@700;900`。
- Scale：h1 拉丁 `clamp(56px,10.5vw,158px)` 斜體 wght 460–560／h1 中文 `clamp(34px,5.6vw,84px)` 900／h2 26–46px 900（中文）＋ 18–34px 斜體 Fraunces 副題／kicker 13–15px Big Shoulders 900 字距 .14–.24em／內文 15–17px Noto Serif TC 500，行高 1.7–1.75。
- 數字（價格、電話）用 Fraunces `SOFT 0` 讓它變硬、變清楚；名字與標題用 `SOFT 100`。
- 中文與拉丁字並排時，拉丁字斜體、中文直立——混排本身就是裝飾。

## 5. 版面與網格

- 桌機 12 欄沙龍網格（見特徵 4），≤1060px 改 6 欄，≤560px 2 欄（窄條框與圓鏡並排，其餘全寬）。
- 每個框 `--r` 介於 −3° 與 +3°，相鄰兩框必須一正一負。
- 牆本身是一整片壁紙，以 8 幅直條組成（每幅一個 `overflow:hidden` 的窗，內部是同一張全寬 SVG，`left:calc(var(--i)*-100%)`），幅與幅之間留 1px 接縫線——那條縫是真實感的來源。
- 天花板線（金色線腳）與腰牆（棋盤格＋金色腰帶）把頁面切成「房間」：頂部線腳、中間花牆、頁尾腰牆。
- 留白規則：不存在大片留白；框內文字區可以有 18–34px 內距，那就是全部的呼吸。

## 6. 元件配方

- **導覽（拉鈴繩 bell-pull）**：右側固定一根黃銅桿（`linear-gradient(#EBCB7A,#C69A3B 45%,#7A5518)`，兩端圓球），垂下 4 條 28px 寬、長度不一（48–64vh）的織帶，每條用不同圖樣填色，中段奶油色直排標籤，末端一個流蘇（金球＋洋紅頸＋粉色裙）。各條以不同週期（4.4–5.8s）左右擺 ±1.6°；hover 往下拉 16px（`cubic-bezier(.3,1.6,.5,1)` 彈回），現在頁往下 34px 且標籤反粉。≤760px 改為頂部右側短繩、隨頁捲走。
- **按鈕**：牡丹粉底、奶油字、2px 墨框、3px 實心墨影，按下位移 2px。全大寫 Big Shoulders。
- **卡片＝框**：`.gilt`（長方／橢圓／拱頂）、圓鏡（`repeating-conic-gradient` 金色放射＋鈷藍鏡面）、十字繡樣框（`p-stitch` 底＋粉框）、條紋窄框。卡片內只有奶油底一種素色。
- **cartouche 標籤**：奶油底、2px 墨框，外加 3px 奶油＋ 2px 粉的雙層外框——用來壓在圖樣上放字。
- **表單**：輸入框 `#fff8ec` 底、2px 墨框、數字用 Fraunces 22px。
- **頁尾（腰牆）**：金色腰帶 → 120px 棋盤格 → 金色腰帶 → 漆黑底資訊三欄，大字 Ban-Hue 用粉色 Fraunces 斜體。

## 7. 動效規則

| 類型 | 本站實作 | 觸發 | 時長／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 拉鈴繩與流蘇以 4.4–5.8s 不同週期擺盪 ±1.6° | 常駐 | `ease-in-out alternate infinite` | 靜止垂直 |
| input 輸入 | Fraunces 字軸波：游標經過 h1，距離 220px 內的字母 `wght` 加粗至 900、`SOFT` 由 100 降到 0、`WONK` 關閉；框 hover 轉正並把字從軟變硬 | pointermove（rAF 節流，<16ms） | 即時／框 .45s `cubic-bezier(.3,1.5,.5,1)` | 保留即時變化，取消轉場 |
| transition 轉場 | 扇貝帷幔落下：糖果條帷幔＋珠串流蘇從頂部降下蓋住畫面（.48s），新頁從帷幔下拉起 | 站內連結點擊 | `cubic-bezier(.6,0,.3,1)` | 直接換頁 |
| signature 簽名 | **落幅 the drop**：壁紙從天花板一幅幅放下——`clip-path: inset(0 0 100% 0)` → `inset(0)`，同時一支有明暗的紙捲沿下緣滾下，結束時一道刷膠光從下往上掃過。首頁 8 幅錯開 95ms；〈對花〉每貼一幅播一次；花樣簿由捲動驅動 | 載入／貼上／捲動 | 1.05s `cubic-bezier(.5,.05,.25,1)` | 直接顯示貼好的牆 |

額外：框在牆貼好後依序「掛上」（從 −60px、多歪 7° 彈到定位，.9s）；〈對花〉撕掉重貼時整幅紙轉 −14° 掉落。禁止：通用淡入當主打、數字計數、跑馬燈。

## 8. 插畫與圖像風格

- **技法：印花版距重複（chintz repeat）**。每個圖樣是一個 SVG `<pattern>` 單元，平塗、零漸層（紙捲與鏡面除外）、零描邊（線條本身就是圖案時例外，如蜂格菱線）。
- **花**：花瓣是同一個水滴路徑 `M0,0C-14,-10 -16,-34 0,-44C16,-34 14,-10 0,0Z` 旋轉成環：外環 8 瓣（串色）、內環 8 瓣錯 22.5°（淡粉）、花心 6 瓣（洋紅）＋黃心。
- **葉**：`M0,0C10,-9 30,-10 46,0C30,10 10,9 0,0Z` ＋一條深綠葉脈。
- **動物**：蜂＝兩片奶油橢圓翅＋黃身＋兩道黑紋；蛇＝同一條曲線疊三層 stroke（墨 15／綠 11／黃虛線 3 9）。
- **單元內的東西不得跨出單元邊界**，跨邊的元素必須在四個角各畫一次（否則接縫會斷）。
- 豹斑用決定性偽隨機（mulberry32，固定 seed）在建置時排好，並在 ±200 位移處複製以保證無縫。

## 9. Logo 與 Favicon

- Logo：金色珠緣圓章（外圈 24 顆亮金珠）內祖母綠地、一朵三環牡丹壓三片葉；右側 Fraunces 斜體 "Ban-Hue"（串色）＋Noto Serif TC 900「萬花壁紙」，下方一粗粉一細金雙線。檔案 `assets/logo.svg`。
- Favicon：64×64 祖母綠方塊、金框、一朵兩環牡丹＋黃心，inline SVG data URI。小尺寸時只保留外環與花心。

## 10. Do & Don't

**Do**
- 每個視窗三種圖樣、三種尺度；一條串色走到底。
- 讓框歪、讓框疊、讓壁紙從縫隙裡露出來。
- 字要混：軟歪襯線斜體＋粗中文＋窄大寫。
- 每條邊都收：扇貝、流蘇、珠緣、拉繩。
- 文案從產業長出來（版距、對花、裁長、幾支）。

**Don't**
- 不要大片留白、不要灰褐、不要整片粉彩、不要單一字體。
- 不要把圖樣全部縮成同一尺度（會糊成一片——這是「亂」與「極繁」的分界）。
- 不要整齊的三等分卡片、不要紫藍漸層、不要 emoji icon、不要 Lorem ipsum、不要 EST. 徽章。
- 不要用照片拼貼代替圖樣——本風格的圖樣是設計出來的重複單元，不是素材堆疊。
- 不要把孟菲斯的 squiggle 和三角形混進來（那是另一個流派）。

## 11. 頁面骨架範例

```html
<body>
  <svg width="0" height="0" style="position:absolute"><defs><!-- 全部 pattern、tassel symbol --></defs></svg>
  <nav class="pulls" aria-label="主要導覽：拉鈴繩"><div class="rod"></div><ul>
    <li style="--d:0s;--per:5.2s"><a href="index.html" style="--len:56vh" aria-current="page">
      <svg class="band"><rect width="100%" height="100%" fill="url(#p-peony)"/></svg>
      <span class="lab">沙龍</span><svg class="tsl"><use href="#tassel"/></svg></a></li>
    <!-- …其餘三條 -->
  </ul></nav>
  <main class="wall">
    <div class="paper" aria-hidden="true">
      <div class="strip" style="--i:0"><svg class="inner"><rect width="100%" height="100%" fill="url(#p-peony)"/></svg><i class="roller"></i></div>
      <!-- ×8 -->
    </div>
    <div class="cornice"></div>
    <section class="salon">
      <div class="fr fa"><div class="gilt"><div class="in">
        <h1 class="disp" data-wave="520">Ban-Hue</h1><p class="zh">萬花壁紙行</p>
      </div></div></div>
      <a class="fr fb gilt oval" href="book.html#peony"><div class="in">
        <svg class="pat"><rect width="100%" height="100%" fill="url(#p-peony)"/></svg>
        <div class="lab cartouche">本月花樣・大牡丹</div></div></a>
      <!-- 圓鏡、窄條、拱頂、十字繡、語錄、地址 -->
    </section>
  </main>
  <footer class="dado"><div class="rail"></div><svg class="chk"><rect width="100%" height="100%" fill="url(#p-check)"/></svg><div class="rail"></div>…</footer>
</body>
```

## 12. 技術實作與相容性

本站三項核心技術（ledger `tech`），每項都在承載一個不可省略特徵：

### 12.1 SVG `<pattern patternUnits="userSpaceOnUse">` 平鋪＋`patternTransform`（A 渲染層）
- **承載**：特徵 1、2、5 與〈對花〉的判定本身。全站 11 個 pattern（大牡丹 240、檸檬枝 120、金蜂格 80、糖果條 64×10、粉豹 200、鱗瓦 40×24、舞廳棋盤 48、十字繡、流蘇、以及執行期複製的縮放版）。〈對花〉每一幅是 `<g transform="translate(-i·幅寬, dy)">` 裡同一張牆座標圖樣的一扇窗；`dy ≡ 0 (mod 版距×縮放)` 即對上，誤差 `min(e, T−e)` 以 `版距cm×10 / T` 換算毫米。縮放用 `cloneNode` 複製 pattern 後設 `patternTransform="scale(k)"`。
- **查證**：MDN〈SVGPatternElement: patternTransform〉— Baseline Widely available（屬性於 2020-01 起各瀏覽器一致，DOM 屬性 2015-07）；MDN 同頁建議繼續使用 `patternTransform` 屬性而非 SVG2 的 CSS transform（實作不一致）。
- **注意**：放 defs 的 `<svg>` 不可 `display:none`（部分瀏覽器會讓引用失效），改用 `position:absolute;width:0;height:0`。跨元素以 `url(#id)` 引用同一文件內的 pattern 全瀏覽器可用。
- **Fallback**：無。SVG pattern 為基線能力；無 JS 時所有圖樣照常顯示（只有〈對花〉需要 JS，`<noscript>` 給出版距與支數的文字答案）。

### 12.2 CSS scroll-driven animations：`view-timeline` ＋ `animation-timeline` ＋ `animation-range`（B 動效與時間軸層）
- **承載**：簽名〈落幅〉在花樣簿的版本——每款花樣隨捲動從黃銅桿上放下（`clip-path` 由 `inset(0 0 100% 0)` 到 `inset(0)`），紙捲沿下緣滾下，規格卡同步歪著掛上。時間軸命名在共同祖先 `.ent{view-timeline:--roll block}` 上，讓兄弟元素 `.roll .paper`、`.roll .cyl`、`.spec` 都能使用（命名 view timeline 只對後代可見）。`animation-range: entry 20% cover 55%`。
- **查證**：caniuse〈animation-timeline: view()〉— Chrome／Edge 115+ 支援；Safari 26.0 起支援（18.x 以前不支援）；Firefox 114–154 在 flag 後預設關閉；MDN 標示非 Baseline。
- **Fallback**：以 `@supports (animation-timeline:view())` 包住；不支援時 JS 在 `<html>` 加 `.no-sda`，改用 IntersectionObserver（threshold .25）加 `.on`，以 1.3s 時間驅動的 `clip-path` transition 播放同一個放下動作；無 IO 則直接顯示。完全無 JS 且不支援時，紙預設就是展開的（動畫只在支援區塊內宣告），資訊零損失。`prefers-reduced-motion: reduce` 下不宣告任何動畫。

### 12.3 可變字型 `font-variation-settings`：Fraunces `opsz／wght／SOFT／WONK`（C 版面與樣式層）
- **承載**：特徵 3。四頁 h1 以 `data-wave` 拆成逐字 span（以單字為不斷行群組），pointermove 以 rAF 節流計算每個字母到游標的距離 k，寫入 `"wght" base→900, "SOFT" 100→0, "WONK" 1→0`；框與規格卡 hover 時透過自訂屬性 `--soft／--wonk` 讓標題從軟歪變硬正（`transition: font-variation-settings .35s`）。數字一律 `SOFT 0`。
- **查證**：Google Fonts Fraunces 說明頁與 googlefonts/fraunces README——四軸 `opsz 9–144（預設 144）`、`wght 100–900`、`SOFT 0–100（預設 100）`、`WONK 0–1`（二元，opsz>18 時自動替換）；caniuse〈Variable fonts〉— Chrome 62+（66 起完整）、Safari 11+、Firefox 62+。
- **Fallback**：字型未載入時退回 Georgia，`font-variation-settings` 被忽略、版面不變；觸控裝置無 hover 時標題保持 SOFT 100 的預設軟體。

### 12.4 效能實測（建置環境：Node 22＋jsdom 跑完整〈對花〉流程，無例外）
| 頁 | 檔案大小（含全部 inline SVG/CSS/JS） |
|---|---|
| index.html | ≈ 62 KB |
| book.html | ≈ 69 KB |
| match.html | ≈ 69 KB |
| visit.html | ≈ 60 KB |

全部遠低於 350 KB 上限。首屏 JS 只有：帷幔轉場監聽、字軸波拆字（< 30 個 span）、營業鏡 `Intl.DateTimeFormat`（Asia/Taipei）——無迴圈繪製、無 canvas。動畫只動 `transform`、`clip-path` 與 `font-variation-settings`（後者僅在 h1 的少數 span 上），pointermove 以 rAF 合併為每幀一次。壁紙 pattern 由瀏覽器原生平鋪光柵化，捲動時不重算。
