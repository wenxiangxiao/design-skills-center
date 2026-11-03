---
name: egyptian-tomb-register-painting
description: New Kingdom Theban tomb painting for the web — horizontal registers on ground lines, figures built on the 18-square canon (profile head, frontal eye and shoulders), hierarchical scale, six flat mineral colours with no shading, red-ochre draft corrected by black outline, hieroglyph columns set vertically, khekher frieze and block-border frame.
---

# 古埃及新王國墓室壁畫・底比斯分欄 Ancient Egyptian Tomb Painting — New Kingdom Theban Register

> 範例站：`sites/phang-tsiu`（胖酒工房，麵包酒工房）。
> 參照：大英博物館〈Nebamun 墓室壁畫〉（約前 1350，〈沼澤狩獵〉〈宴會〉殘片）；紐約大都會博物館 Nina de Garis Davies 臨摹的 Nakht 墓 TT52、Menna 墓 TT69；德爾麥地那 Sennedjem 墓 TT1；帝王谷 Horemheb 墓 KV57（未完成，可見方格與紅黑草稿）；大英博物館 EA 5634 請假陶片；Erik Iversen《Canon and Proportions in Egyptian Art》、Gay Robins《Proportion and Style in Ancient Egyptian Art》。

## 一、設計哲學

墓室壁畫不是「畫一個場景」，而是**把一件事情完整地寫下來**。它要讓死者在來世永遠擁有那些東西，所以每樣東西都要畫成「最認得出來的那一面」：臉要側面（鼻子與嘴的輪廓最清楚）、眼睛要正面（眼形最完整）、肩膀要正面（兩隻手臂都看得見）、腳要側面（步伐看得見）。這不是不會畫透視，是**拒絕讓任何東西被遮住或變形**。

由此推出整套語法：
1. **畫面是一欄一欄的帳（register）**，每一欄有一條地線，所有人都站在線上；欄越往上不代表越遠，只代表「下一行」。
2. **大小代表重要性**（階級比例）：主人比工人大，跨過好幾欄。
3. **顏色是礦物，數量有限**：六罐，平塗，不混色，不打陰影。
4. **畫是分工完成的**：畫工用紅赭打方格與草稿 → 上色工平塗 → 主畫師用黑線修正定稿。紅線常常留在牆上。
5. **字與圖是同一件事**：象形文字直欄插在人與人之間，字的方向朝向它說明的那個人。

移植到網頁的紀律：每一屏都要是「一面牆」，資訊排在欄裡；互動要讓使用者參與「打稿→上彩→定稿」或「把東西疊上供桌」這種墓室的動作，而不是一般網頁的卡片。

## 二、本風格的 5 個不可省略特徵

### 特徵 1 — 分欄與地線（register + ground line）
拿掉它：畫面變成插畫拼貼。所有人與物都站在一條粗黑地線上，欄與欄之間是 3px 黑線；欄的高度相同。
```html
<div class="reg"><div class="scene" style="aspect-ratio:900/230">
  <svg class="lay" viewBox="0 0 900 230"><path class="gl" d="M0,219.5H900"/><!-- 人物 <use> --></svg>
</div></div>
<style>.reg{border-bottom:3px solid #1C1A17}.lay .gl{stroke:#1C1A17;stroke-width:3}</style>
```

### 特徵 2 — 十八格正典與「正側混合」人體
拿掉它：人物就只是剪影插畫。站姿人物從髮際到腳底 18 格（肩 2、肚臍 7、膝 12），側臉＋正面眼＋正面肩＋側面腿，前腳是離觀者較遠的那隻；跪、坐用同一張格。主人用 2–3 倍大小。
```js
// 一格 = 10 單位；髮際 y=0、腳底 y=180；面朝 +x
const torso = 'M-26,22L26,22L25,30L14,60L13,70L-15,70L-16,60L-25,30Z';     // 正面肩，腰收窄
const head  = 'M-1,-11C6,-13 12,-8 12,-3L16,0L13,2L14,4.5L12,6.5L12.5,9C10,12 5,12 2,10L-1,13L-5,13L-5,4Z'; // 側臉
const eye   = '<ellipse cx="8.6" cy="-3" rx="3.1" ry="1.5"/><circle cx="9.2" cy="-3" r="1.2"/>';  // 正面眼
function limb(pts, ws){ /* 沿關節點兩側偏移成多邊形：手臂 [肩,肘,腕]，腿 [髖,膝,踝] */ }
```

### 特徵 3 — 六罐礦物色平塗，零陰影零漸層
拿掉它：變成兒童繪本。男人紅褐、女人黃赭（約定，不是寫實）；衣服亞麻白；埃及藍、孔雀石綠、黃赭、紅赭、碳黑。每塊色都被黑線包住。全站唯一「半透明」是紅稿層。
```css
:root{--ground:#D5D5C8;--ink:#1C1A17;--s:#A4502E;--t:#DDB060;--w:#F1EDE1;
      --blue:#2D6A99;--green:#3E8A6A;--yellow:#D8A23E;--red:#A33E24;--draft:#C8462C}
/* 禁止：linear-gradient、box-shadow、filter:drop-shadow、border-radius 於人物與欄 */
```

### 特徵 4 — 紅稿、上彩、黑線三層（同一組形狀）
拿掉它：失去「畫出來的牆」的痕跡。每個形狀只寫 class，由圖層 CSS 變數決定是紅線、色塊還是黑線；紅稿層偏移一點點，像畫工改過的位置。
```css
.lay .s{fill:var(--fs)} .lay .w{fill:var(--fw)} /* …每罐色一個 class */
.lay path{stroke:var(--st);stroke-width:1.25;vector-effect:non-scaling-stroke}
.Ld{--fs:none;--fw:none;--st:var(--draft);transform:translate(.25%,.6%);opacity:.85} /* 紅赭草稿 */
.Lf{--fs:var(--s);--fw:var(--w);--st:none}                                       /* 上彩 */
.Li{--fs:none;--fw:none;--st:var(--ink)}                                         /* 黑線定稿 */
```
```html
<svg class="lay Ld"><use href="#m-jar"/></svg><svg class="lay Lf"><use href="#m-jar"/></svg><svg class="lay Li"><use href="#m-jar"/></svg>
```

### 特徵 5 — 象形文字直欄＋卡赫爾簷飾＋色塊邊框
拿掉它：就只是「埃及風插畫」。牆頂一排卡赫爾（khekher，紮起的蘆葦頭，紅藍綠輪替＋黃白束帶），牆四周一圈色塊邊框（藍、紅赭、綠、黃赭方塊以亞麻白隔開），說明文字是直欄、欄與欄之間有細線。
```css
.cap>span{writing-mode:vertical-rl;text-orientation:upright;border-left:1.5px solid #1C1A17;padding:2px 3px}
.cap .hg{font-family:'Noto Sans Egyptian Hieroglyphs'}
.wall{padding:10px;background:url(band-h.svg) top/88px 10px repeat-x,url(band-h.svg) bottom/88px 10px repeat-x,
      url(band-v.svg) left/10px 88px repeat-y,url(band-v.svg) right/10px 88px repeat-y,#D5D5C8}
```
```svg
<!-- 卡赫爾單元 18×48，三色一組平鋪 -->
<path d="M3,48V20C3,12 6,6 9,4C12,6 15,12 15,20V48Z" fill="#A33E24" stroke="#1C1A17"/>
<rect x="3" y="24" width="12" height="5" fill="#D8A23E" stroke="#1C1A17"/><circle cx="9" cy="12" r="2.4" fill="#1C1A17"/>
```

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 石膏灰底 | `#D5D5C8` | 牆面（Nakht／Menna 墓的藍灰白石膏底） | ~55% |
| 碳黑 | `#1C1A17` | 黑線、地線、假髮、文字 | ~12% |
| 亞麻白 | `#F1EDE1` | 衣服、卡片、邊框間隔 | ~12% |
| 紅褐（男膚） | `#A4502E` | 男人皮膚 | ~5% |
| 黃赭（女膚） | `#DDB060` | 女人皮膚 | ~3% |
| 埃及藍 | `#2D6A99` | 天花板、封泥、尼羅河、強調字 | ~5% |
| 孔雀石綠 | `#3E8A6A` | 蓮花、紙莎草、籃子 | ~3% |
| 黃赭 | `#D8A23E` | 麵包、供桌、標記、按鈕 | ~3% |
| 紅赭 | `#A33E24` | 陶甕、椅子 | ~2% |
| 紅稿 | `#C8462C` | 方格、草稿、警示 | <1% |
| 牆裙 | `#7A2E1B`＋黑白斑點 | 頁尾花崗岩紋牆裙 | 帶狀 |

規則：同一塊色只用一種 hex；不調亮暗。男女膚色是約定，不可對調。

## 四、字體系統

- 象形文字：**Noto Sans Egyptian Hieroglyphs**（Google Fonts，Unicode 13000–1342F），400。
- 中文：**Noto Serif TC** 500（內文 16px/1.75）、900（標題、欄題）。標題 `clamp(40px,7vw,82px)`、欄題 22px、說明欄 `clamp(11px,2.1cqw,19px)`。
- 轉寫：**Gentium Book Plus** italic（支援 ꜣ ꜥ ḥ ḫ ẖ ḏ ṯ），例 *ḥtp-dj-nsw … ḫꜣ m t ḥnqt*。
- 數字：價格同時寫阿拉伯數字與象形數字（𓏤 1・𓎆 10・𓍢 100・𓆼 1000・𓂭 10000）。
- canvas 元件用 Noto Sans TC 900，以 `&text=` 只載入用到的字。

## 五、版面與網格

- 牆：色塊邊框 10px → 2px 黑框 → `grid-template-columns:1fr 3fr`：左欄主人（階級比例，高度＝三欄），右欄三個 register。
- register 比例 900:230，內部 viewBox 單位；人物高 196（約 0.8 單位/格）；說明欄以 % 定位在人與人之間的空隙。
- 頂部：天花板帶（蘆蓆紋）74px → 卡赫爾簷飾 50px → 導覽列。底部：尼羅河帶 96px → 花崗岩牆裙 40px → footer。
- 零旋轉；所有東西水平。留白只出現在欄內人物之間。
- ≤560px：主人欄改到上方（max-width 220px），三欄 register 以 `min-width:620px` 在自己的容器內橫向捲動，不讓整頁橫捲；導覽改為底部固定。

## 六、元件配方

- **導覽（draft-bearer-nav）**：三位持供者（44×84 SVG），各一頁；未選的只有紅稿，hover／focus 時上彩與黑線以 `clip-path:inset()` `steps(6)` 由左掃入；現用頁永遠畫完，標籤底色黃赭。≤560px 改成底部固定三等分。
- **按鈕**：黃赭底、2px 黑框、900 字重、零圓角；hover 反成黑底黃字。
- **卡片（供品清單格）**：黑色 3px 外框、3px 黑縫；格頂黃赭帶寫象形名，中段中文直排＋陶甕，底部價格兩行（象形數字＋NT$）。
- **碑（圓頂碑）**：`border-radius:999px 999px 0 0/90px 90px 0 0`，頂部弦月區放太陽盤 𓇳。圓頂只用在碑。
- **陶片（收據、請假表）**：`#E4D9C3` 底、不規則 `clip-path:polygon()`。
- **表單**：輸入框石膏灰底＋2px 黑框、零圓角；分段按鈕被選中＝黑底黃字。
- **footer**：法定警語框（飲酒過量有害健康／禁止酒駕／未滿十八歲禁止飲酒）＋地址＋建置模型。

## 七、動效規則

| 種類 | 本站實作 | 觸發 | 時間 | reduced-motion |
|---|---|---|---|---|
| ambient | 尼羅河帶：N35 水紋 `translateX(-60px)` 6s linear 無限；三條吳郭魚 26–41s 橫游 | 自動 | linear | 停格，魚固定在 18%／52%／78% |
| input | 人物 hover／focus：其十八格正典 60ms 亮起、對應說明欄塗黃赭；導覽持供者 hover 上彩 `steps(6)` .38s；〈辦宴〉拖放 ghost 跟手、落點區紅虛線 | 指標／鍵盤 | <100ms | 正典與塗黃照常（無位移），ghost 隱藏 |
| transition | 假門：五重門框（藍紅綠黃＋黑色龕）由外而內 `steps(4)` 關上，下一頁由內而外打開 | 點內部連結 | 每框 200ms、間隔 70ms | 不播 |
| signature | 墓室三道工序：每欄依 `view-timeline` 先上彩（entry 40%→cover 42%）、再黑線定稿（cover 28%→52%）、最後方格與紅稿淡到 .18／.3；首屏與〈封甕〉以時間播放 1.5s＋1.3s `steps(24)` | 捲動／封甕 | 捲動綁定 | 直接顯示定稿，紅稿與方格保留 .3 |

自我限制：本風格禁用 ease 彈跳、縮放彈出、淡入淡出當主打——上彩一律 `steps()` 分格掃過，像一筆一筆塗。

### motion-library 元件（PLAYBOOK §2.8）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| BG-B-16 | Weave Grid | 全站頂 | colors `#2D6A99`/`#D8A23E`/`#F1EDE1`、duration 14、density 1.3、intensity .35、seed 1350 | 底比斯墓頂常畫的編織蓆紋；平塗矩形經緯，intensity 壓到 .35 讓「壓下去」的暗條幾乎消失，不違反零陰影 |
| TXT-A-35 | Stripe Mask | index | text「供品清單」、`#A33E24`/`#2D6A99`/`#F1EDE1`、1.6s、loop false、seed 52 | 字被 14 條直條一條條塗出來＝上色工逐格平塗；亮底→字為近黑 |
| SHP-27 | Shape Stack | yan | `#D8A23E`/`#A33E24`/`#F1EDE1`、1.4s、loop false、seed 3；每放一件供品 `replay()` | 圓餅與方塊往上疊在一條地線上＝供桌上往上堆的供品 |
| BG-B-37 | Minimal Stripes | yan | `#2D6A99`/`#A33E24`/`#F1EDE1`、9s、density 2.4、intensity .6、seed 21 | 裁成 18px 的帶子＝牆緣色塊邊框在慢慢推移；純平塗矩形 |
| TXT-A-19 | Gate | tsiu | text「甕房」、`#2D6A99`/`#A33E24`/`#F1EDE1`、1.8s、loop false、seed 9 | 兩扇平塗門板往外推開露出字＝墓門／假門；無圓角無發光 |

出處：`MotionLib.prompt(id)`（motion-library 1.30.0 @9301b9d8）。掛載照 `sites/ka-to` 的包裝：等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `loop:false` 只播一次、canvas `aria-hidden`、容器內保留 `.ml-fb` 標題、reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。

## 八、插畫與圖像風格（canon-grid-register-figures）

- 全站零圖檔。所有人物與器物在建置期由 `limb()`（沿關節偏移成多邊形）與手寫路徑組成 `<symbol>`，三層以 `<use>` 重用。
- 人物 12 款：頂籃、扛甕、俯身搗、跪撕、倒酒、書吏、主人立像、椅坐男女、跪坐客男女、豎琴手。客人朝向主人（鏡像）。
- 器物：陶甕（封泥藍或黑）、大甕、圓麵包、圓錐麵包、籃、篩、供桌、蓮花、紙莎草、吳郭魚、豎琴、麵包店門面。
- 供品**往上疊**，不透視；同類物件並排、略錯開半格。
- 禁止：寫實比例、3/4 側臉、陰影、高光、透視地面、漸層天空。

## 九、Logo 與 Favicon

- Logo `assets/logo.svg`：上下兩條色塊邊框，中間石膏灰框裡一只封泥藍蓋的陶甕（象形 W22 𓏊）與一個圓麵包（X2 𓏐）站在同一條地線上；右側兩條細線夾住直排字標「胖酒工房」。
- Favicon：埃及藍方底上一只紅赭陶甕、黃赭封泥，黑線 1.4px，inline SVG data URI。

## 十、Do & Don't

- Do：每一屏都是一面牆；字放在人與人之間；價格寫象形數字；男紅女黃；紅稿可以留在牆上。
- Do：使用者的動作是墓室裡的動作——疊供品、封甕、記帳、請假。
- Don't：置中大標＋兩顆按鈕＋三張圓角卡片；紫藍漸層；emoji；Lorem ipsum；EST. 徽章。
- Don't：金色漸層「法老風」、金字塔＋人面獅身當背景、Papyrus 字體、圖坦卡門黃金面具式的金藍條紋——那是觀光紀念品，不是墓室壁畫。
- Don't：把人物畫成 3/4 側或有陰影；把欄做成卡片網格；用 `border-radius` 修人物。
- 酒類網站須標示「飲酒過量，有害健康」「禁止酒駕」「未滿十八歲禁止飲酒」。

## 十一、頁面骨架範例

```html
<div class="ceil"><div class="ml" id="ml-ceil"><p class="ml-fb">天花板・蘆蓆紋</p></div></div>
<div class="khk"></div>
<header class="top"><a class="brand" href="index.html"><span class="hg">𓏏𓏐 𓎛𓈖𓈎𓏏𓏊</span><b>店名</b></a>
  <nav><ul class="bearers"><li><a href="index.html" aria-current="page">…三層 svg…<span class="lb v">墓壁</span></a></li></ul></nav></header>
<main>
  <section class="band"><h1>店名</h1><p class="lede">一句話</p><p class="st" id="open-now">營業時間</p></section>
  <div class="wall"><div class="wall-in">
    <div class="owner"><div class="reg"><!-- 主人：階級比例 --></div></div>
    <div class="regs"><div class="reg"><div class="regh"><span class="n">壹</span><span>欄題</span></div><!-- scene --></div></div>
  </div></div>
</main>
<div class="nile"><div class="wv"></div></div><div class="dado"></div><footer>…</footer>
```

## 十二、技術實作與相容性

| 技術 | 層 | 承載 | 支援現況（查證） | fallback |
|---|---|---|---|---|
| CSS scroll-driven animations（`view-timeline`／`animation-timeline`／`animation-range`） | B | 簽名：每欄依捲動上彩→定稿→收格 | Chrome／Edge 115+、Safari 26.0+ 支援；Firefox 仍在 `layout.css.scroll-driven-animations.enabled` 旗標後（caniuse〈animation-timeline: view()〉，2026-11 查） | `CSS.supports('animation-timeline','view()')` 為否時改加 `.io`，IntersectionObserver 進入 35% 時以 1.2s `steps(20)` transition 上彩；再無 IO 則直接定稿。首屏一律以時間動畫播放 |
| `writing-mode: vertical-rl`＋`text-orientation: upright`＋Unicode 埃及象形文字 | C | 特徵 5：象形與中文直欄、欄題、碑文 | MDN 標示 text-orientation 自 2020-09 起 Widely available；Noto Sans Egyptian Hieroglyphs 由 Google Fonts 提供（OFL） | 字型未載入時象形字可能顯示為方框，但中文欄照常；所有象形字旁都有中文 |
| Pointer Events＋`setPointerCapture` 拖放 | D | 〈辦宴〉把客人與供品拖進宴席 | 全主流瀏覽器長期支援（MDN Baseline） | 沒移動＝點一下即加入；鍵盤 Enter／Space 同效；reduced-motion 不顯示 ghost |

其他：CSS 自訂屬性跨 `<use>` 影子樹繼承（三層同形的關鍵）、`vector-effect:non-scaling-stroke`、`clip-path:inset()`、Web Animations（假門）、`Intl.DateTimeFormat` 以 Asia/Taipei 判斷營業。

**效能實測（建置環境 node 22）**：index 236.8KB、yan 229.6KB、tsiu 225.9KB（≤350KB；其中元件子集 150.4KB、符號 25.2KB）；元件子集 eval 3.7ms；首屏 JS 只做一次 `getBoundingClientRect` 迴圈＋IO 註冊；簽名動畫只動 `clip-path` 與 `opacity`，無 layout thrashing；同屏運轉元件 ≤2。

查證來源：caniuse.com/mdn-css_properties_animation-timeline_view；developer.mozilla.org/docs/Web/CSS/text-orientation；fonts.google.com/specimen/Noto+Sans+Egyptian+Hieroglyphs；britishmuseum.org/collection/object/Y_EA5634；Wikipedia〈Artistic canons of body proportions〉（Iversen 十八格，引 Robins）。
