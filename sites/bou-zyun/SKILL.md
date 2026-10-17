---
name: portuguese-azulejo-padrao
description: Portuguese azulejo style — cobalt-on-tin-glaze tiles on a visible 14 cm grid with mortar joints, 2×2 pattern tiles whose flower only completes at the shared corner, brushed cobalt washes in three dilutions, baroque cercadura frames and bilingual street-name tile plaques.
---

# 葡式瓷磚・圖案磚 Azulejo Português · Padrão

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（補磚舍，澳門葡式瓷磚修補與磚庫）不同產業、但一眼看得出是同一個流派的網站。
> 本流派全館第 1 站（型錄「在地與文化視覺」2026-10-17 新增條目）。

## 一、設計哲學

Azulejo（阿拉伯語 *az-zellij*「磨亮的小石」）是葡萄牙五百年的牆面語言。十五、十六世紀先從塞維亞進口摩爾式的 cuerda seca／arista 磚；義大利人在塞維亞引入 majolica 技法後，畫家可以直接在**生的錫釉**上用氧化鈷下筆——一筆吸進去就擦不掉，所以線有毛邊、洗色有積水的邊。十七世紀里斯本流行 **tapete（地毯）**：同一塊圖案磚以 2×2、4×4 模組重複鋪滿整面牆，藍加銻黃，像從東方進口的地毯與印花布。1680–1740 年荷蘭台夫特藍白板傳入、國王佩德羅二世 1687–1698 年禁止進口，本地「大師時期 Ciclo dos Mestres」的大型**藍白人物板**取代了圖案；1755 年里斯本大地震後的**龐巴爾磚**又讓便宜的圖案磚回到每一棟重建的樓。後來它跟著葡萄牙人到巴西、到澳門——今天澳門的街名牌就是白磚藍字、藍色雙框的中葡雙語磚牌，2020 年 8 月澳門文化局把葡式瓷磚製作與繪畫列入非物質文化遺產清單。

這個流派長成這樣，是因為四個製作限制：

1. **一支顏料**：氧化鈷燒出來只有藍。濃淡靠加水稀釋，不靠混色——所以畫面永遠是「藍的三階」。
2. **一塊 14 公分的磚**：所有圖像都要切成方格才能燒、才能運、才能貼；格線（灰縫）永遠看得見。
3. **便宜要靠重複**：畫一塊、燒一千塊。於是一塊磚只畫一朵花的四分之一，四塊轉角相對才開成一朵——**同一塊磚換個方向，就是另一面牆**。
4. **畫錯不能擦**：所以線是一筆到底、洗色會滲出線外一點點、每一窯的藍都差一點。

本站把這四個限制翻成網頁規則：一切對齊磚格、顏色只有藍的三階加圖案磚專用的黃、每塊磚的釉色決定性地微差、圖案由程式「畫一塊、轉四次」生成。

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是 azulejo，而會滑向「藍白配色的網站」「台夫特」「青花瓷」或「普通幾何圖樣」。

### 特徵 1：一支鈷藍的三階稀釋＋錫釉白（色彩規則）

只有藍的三個濃度：淡洗 `#A9BCE0`、中洗 `#5F7FC2`、勾線 `#1D3A8A`，畫在錫釉白 `#F2EEE3` 上。銻黃 `#D9A520` **只准出現在圖案磚（padrão）**——那是十七世紀 tapete 的黃；人物板、文字磚牌一律只有藍。濃淡是**稀釋**，洗色以 `multiply` 疊合，兩層淡洗交疊處自然變深；不准用漸層表示明暗。

```css
:root{--tin:#F2EEE3;--pale:#A9BCE0;--mid:#5F7FC2;--deep:#1D3A8A;--ochre:#D9A520;--mortar:#B9B3A6}
.w path{mix-blend-mode:multiply}           /* 洗色層：疊在一起就變深 */
```
```svg
<path d="…" fill="#A9BCE0" style="mix-blend-mode:multiply" transform="translate(.7 .5)"/> <!-- 洗色故意偏離勾線 0.7 單位 -->
<path d="…" fill="none" stroke="#1D3A8A" stroke-width="1.5" stroke-linecap="round"/>
```

### 特徵 2：看得見的磚格與灰縫，每塊磚釉色各不同（版面手法）

整個版面以一個磚邊 `--t` 為單位；內容區的底就是一格一格的素白磚，灰縫 2px `#B9B3A6`。所有面板、磚牌、窗口的左上角都落在磚格交點上，寬高是磚的整數倍。每一塊磚的釉色從四種白中以決定性雜湊挑一種（`#EFEADC／#F4F0E6／#F2EEE3／#EEEBE2`）——手工窯燒，沒有兩塊一樣白。

```css
:root{--t:clamp(52px,7.4vw,104px);--j:2px}
.wall-plain{background:
 linear-gradient(var(--mortar) 0 var(--j),transparent var(--j)) 0 0/var(--t) var(--t),
 linear-gradient(90deg,var(--mortar) 0 var(--j),transparent var(--j)) 0 0/var(--t) var(--t),var(--tin)}
.ov{position:absolute;left:calc(var(--t)*var(--x));top:calc(var(--t)*var(--y));width:calc(var(--t)*var(--w))}
```

### 特徵 3：四磚成一花——花只在轉角完成（形狀語彙）

一塊圖案磚 = 一朵主花的四分之一（A 角）＋一朵副花的四分之一（C 角）＋B／D 角的小圈四分之一＋四邊中點的同一個半花苞＋一條對角莖。2×2 模組把磚轉 `0／90／270／180` 度，讓四個 C 角在模組中心相會、四個 A 角在模組外角與鄰模組拼成主花。**單塊磚上看不到任何一朵完整的花。** 四邊中點畫同一個半花苞，保證任何旋轉都接得起來；對角莖上的葉子左右交錯且只在一側長卷鬚——整塊磚沒有對稱，所以鏡像是另一塊磚。

```js
const MOD=[[0,90],[270,180]];                 // 2×2 旋轉模組
const rot=(c,r)=>MOD[r%2][c%2];               // 第 c 欄第 r 列那塊磚要轉幾度
// 主花：A 角 (0,0) 起，四分之一圓內放 k+1 片瓣（0° 與 90° 的兩片被磚邊切半，由鄰磚補齊）
for(let i=0;i<=k;i++){const th=i*(Math.PI/2)/k; petal(0,0,th,R0,R1,w);}
```
```html
<i class="tz" style="--r:90"><svg viewBox="0 0 100 100"><use href="#padrao"/></svg></i>
<style>.tz svg{transform:rotate(calc(var(--r)*1deg))}</style>
```

### 特徵 4：筆繪鈷線——有毛邊、會滲、洗色不對齊（裝飾母題的筆性）

勾線一筆到底、圓頭；洗色比勾線略偏、會滲出線外；線邊以 `feTurbulence＋feDisplacementMap` 做出釉上吸墨的毛邊（位移 1.5 單位，不更多——再多就變成水彩）。零描邊的扁平色塊、等寬乾淨的向量線都不是 azulejo。

```svg
<filter id="brush" x="-4%" y="-4%" width="108%" height="108%">
  <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<symbol id="padrao" viewBox="0 0 100 100"><g filter="url(#brush)">…</g></symbol>
```

### 特徵 5：卷葉框邊 cercadura 與中葡雙語街名磚牌（字體選擇＋框）

文字與人物板一定裝在框裡：人物板與重要面板用巴洛克卷葉框（角上圓章、邊上 S 卷），文字標題用澳門街名牌的格式——白磚、藍字、藍色雙框、中文在上（Noto Serif TC 900，字距 .24–.32em）、葡文在下（Cormorant Garamond 600 大寫，字距 .16–.22em），**字被磚縫切過**。

```css
.plq{background:
 linear-gradient(90deg,transparent calc(var(--pt) - 1px),rgba(142,136,123,.55) calc(var(--pt) - 1px) var(--pt)) 0 0/var(--pt) 100%,var(--tin);
 border:2px solid var(--deep);box-shadow:inset 0 0 0 5px var(--tin),inset 0 0 0 7px var(--deep);color:var(--deep);text-align:center}
.plq b{font:900 1.25em/1.15 "Noto Serif TC",serif;letter-spacing:.08em}
.plq i{font:600 .62em "Cormorant Garamond",serif;font-style:normal;letter-spacing:.16em;text-transform:uppercase}
.cerc{border:22px solid var(--deep);border-image:url("data:image/svg+xml,…90×90 卷葉框…") 30 round}
```
```html
<h1 class="plq"><b>瘋堂斜巷</b><i>Calçada da Igreja de S. Lázaro</i></h1>
```

## 三、色彩系統

| 色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 錫釉白 tin | `#F2EEE3` | 所有磚的底、面板、磚牌 | ~55% |
| 釉色差 | `#EFEADC` `#F4F0E6` `#EEEBE2` | 單塊磚的手工差異（決定性挑選） | 混在上面 |
| 灰縫 mortar | `#B9B3A6`（深 `#8E887B`） | 磚縫、缺磚的灰泥、抽屜底 | ~8% |
| 淡洗 pale | `#A9BCE0` | 花瓣底色、路、場域 | ~12% |
| 中洗 mid | `#5F7FC2` | 葉、交錯花瓣、副花 | ~8% |
| 勾線 deep | `#1D3A8A` | 所有線、正文標題、按鈕、頁尾地色 | ~14% |
| 正文墨 ink | `#18264F` | 長文（深鈷近墨，對錫白對比約 13:1） | 字 |
| 銻黃 ochre | `#D9A520` | **只在圖案磚**；介面上只給現用態與 focus | ≤3% |

規則：零漸層填色（唯一例外是釉面反光——光不是顏料）；零模糊陰影；不加第二個色相（不要綠、不要紅、不要台夫特的錳紫）。

## 四、字體系統

- 中文：**Noto Serif TC** 400（正文 17px/1.75）、700（小標）、900（磚牌、大標）。
- 拉丁：**Cormorant Garamond** 600 大寫寬字距（磚牌葡文、編號、標籤），500 italic（圖說、日期）。
- 字級：磚牌主字 `clamp(34px,5.4vw,78px)`；頁標 `clamp(26px,3vw,40px)`；小標 20–24px；正文 16–17px；標籤 11–13px 大寫字距 .14–.22em。
- 數字用 Cormorant（舊式數字）；不使用 mono、不使用無襯線粗體（那會把磚牌變成交通標誌）。

## 五、版面與網格

- 單位 `--t`＝一塊磚：桌機 `clamp(60px,6.7vw,96px)`、平板 `100vw/11`、手機 `100vw/7`（手機剛好 7 塊寬）。
- 首頁是一整面 18×16 磚牆（依斷點隱藏多餘列），面板以 `--x/--y/--w/--h` 用磚數定位；窗口文字太多時，JS 讓牆往下多長幾列，使窗的下緣仍落在牆內。
- 不對稱：大磚牌左上 7×2、窗口 6×5、「缺」磚孤立在右上、排法磚牌在右下；不置中、不做三卡片。
- 內頁 `.snap` 寬度以磚數計（最多 14 磚），且讓出右側 170px 給街名磚牌導覽。
- 留白就是素白磚：不用「空白」，用「沒有畫的磚」。

## 六、元件配方

- **導覽（street-plaque-stack 街名磚牌）**：右上角直掛四塊小街名牌（中文＋葡文＋小號 01–04）；現用頁多一道銻黃內框、往牆外凸 10px；hover 往外推 6px、轉 -1.5°。≤760px 落為底部四格。
- **按鈕**：深鈷實底＋內縮 2px 錫白細框（像磚牌的雙框）；次要按鈕反相。零圓角。
- **面板**：`.cerc` 卷葉框；時間軸用 `.reg`（錫白底＋左側 6px 雙線）。
- **表單**：2px 深鈷實框、零圓角、底色 `#FBF9F3`；單選做成一排磚（選中＝深鈷底白字）。
- **缺磚**：灰泥斜紋 `repeating-linear-gradient(28deg,#9E978A 0 3px,#A8A193 3px 7px,#968F82 7px 9px)`＋內凹實色陰影；中間一個「缺」字。
- **頁尾**：深鈷地、錫白字、淡洗色小標——像一排藍底的腰帶磚（barra）。

## 七、動效規則（四種，缺一不可）

| 類型 | 本站自製實作 | 觸發 | 時間 | 降級 |
|---|---|---|---|---|
| ambient 環境 | **釉光**：一道斜白光以 soft-light 疊在牆上，位置由澳門當地時刻決定（06:00 在左、18:00 在右），9s 呼吸 | 時間 | 9s ease-in-out alternate；每 60s 依時刻重算 | reduced-motion：停在當下時刻的位置 |
| input 輸入 | **磚面傾斜**：游標下那塊磚依指標位置 rotateX/Y ±5°，釉光跟著移 | pointermove | 直接寫 transform（<16ms） | reduced-motion 或無 hover 裝置：不傾斜 |
| transition 轉場 | **翻磚換頁**：滿版磚從點擊處一圈圈翻過來蓋住（rotateY 90→0），下一頁再一圈圈翻開（0→-90）；圖案頁換花時 4×4 牆逐塊翻面 | 點內部連結 | 每塊 300ms，延遲＝距離×34ms | reduced-motion：直接換頁 |
| signature 簽名 | **旋轉波・一塊磚四面牆**：點牆上任一塊磚，整面牆每塊各轉 90°，延遲依與起點的距離；同一塊磚排出下一種牆（四磚成花→半花相接→花瓣錯位→背對背） | click／按鈕 | 每塊 520ms cubic-bezier(.5,0,.2,1)，延遲 58ms／磚距 | reduced-motion：瞬間換到下一種排法，資訊不變 |

自我限制：**本流派不用淡入淡出**——磚只會翻、會轉，不會變透明。

### motion-library 元件（PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0 @eb4d70c，用 `tools/ml-embed.js` 只抽引擎核心＋這五個（約 35KB），inline 成每一頁第一個 `<script>`。顏色只用本站色票。選件前逐一讀過原始碼：`Flip Tiles`、`Pattern Morph`、`Grid Cascade` 都用 `rr()` 畫圓角方塊（磚是直角的）而淘汰；`Spirograph` 用線性漸層描邊（違反特徵 1）而淘汰；全部 TXT 元件因字型固定為無襯線（違反特徵 5）而不用。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| 店面 | `BG-B-15` | Truchet Tiles | primary `#1D3A8A`、secondary `#D9A520`、bg `#F2EEE3`、duration 9、density 1.5、seed 1981 | 店面磚牆下方的「腰帶 barra」：四分之一圓弧磚隨機翻轉——Truchet 1704 年的論文本來就是從方磚的組合出發，和 padrão「一塊磚多種排法」同源 | ambient |
| 缺磚 | `SHP-21` | Ripple Squares | 同色、1:1、duration 2.4、loop、seed 9；補好時 `replay()` | 抽屜旁的「窯口」：方框一圈圈旋開，像窯門與菱尖（ponta de diamante）框；補好整面牆時重播一次 | ambient＋transition |
| 圖案 | `BG-B-29` | Kaleidoscope | 同色、duration 16、density 1、intensity .8、**seed 73** | 頁首八瓣對稱花——padrão 的 D4 對稱放大版。seed 經篩選：13 個物件只出現圓、星、十字，不出現 `rr()` 圓角方塊 | ambient |
| 來訪 | `BG-A-03` | Tile Rotate | primary 勾線藍、secondary 淡洗 `#A9BCE0`、bg 錫白、duration 12、density 1.4、seed 2017 | 頁首一排四分之一圓弧磚依對角線依序轉半圈——呼應簽名動效「轉磚換牆」，只用藍不用黃（非圖案磚區） | ambient |
| 來訪 | `SHP-15` | Ring Expand | 同色、1:1、duration 1.6、loop false、once | 畫磚課登記成功時的圓章：同心圈擴開——B／D 角小圈的放大 | transition |

掛載規則：等 `document.fonts.ready`；IntersectionObserver 離屏 `destroy()`、回到視窗重掛（元件庫 `pause()` 後仍每幀重繪）；canvas `aria-hidden`，容器保留原 HTML 標題 `.ml-fb`，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、一次性元件 `seek(1)`。同一畫面同時運轉 ≤2 個。重現單一元件：`MotionLib.prompt('BG-B-15')`。

## 八、插畫與圖像風格

**技法：cobalt-majolica-wash 錫釉鈷繪**（全館新技法）。所有圖像都是程式生成的 SVG，三層：洗色（淡／中，multiply、偏移 0.7）→ 銻黃（只在圖案磚）→ 勾線（深鈷 1.5、圓頭），整組套 `#brush` 濾鏡。

- **圖案磚**：`params(seed)` 決定主花瓣數 k（3–5）、主花型（尖瓣／圓瓣＋淡洗場／菱格帶）、副花型（同心圈／八角星／四葉）、黃落在哪裡、葉數；`tileSVG(p,{mirror,batch})` 可產生鏡像與「另一窯」（鈷偏灰、無黃）。
- **人物板**：albarrada（雙耳瓶插花＋兩隻相對的鳥）、地圖——只用藍、畫在 6×6 或 6×4 磚上，磚縫壓在圖上。
- 母題清單：花瓣放射主花、八角星、四葉、半花苞、對角莖與卷鬚（aranhiço）、菱格帶、雙耳瓶、鳥、卷葉框。
- 不要：照片、陰影、透視（人物板可以有一點地平線，但不要明暗體積）、任何第二色相。

## 九、Logo 與 Favicon

一塊深鈷框的磚：左上是四分之一朵主花（銻黃花心、勾線與中洗兩道弧、一條對角莖），右下 C 角被咬掉四分之一圓、露出深鈷底，邊上一圈錫白虛線——「缺了一角的磚」。Favicon 與 `assets/logo.svg` 同一份 SVG（inline data URI）。

## 十、Do & Don't

**Do**
- 一切對齊磚格；面板是幾塊磚大就是幾塊磚大。
- 一塊磚畫四分之一，讓花在轉角完成；用旋轉產生整面牆。
- 洗色偏離勾線、線有毛邊；每塊磚白得不一樣。
- 文字標題做成中葡（或任何雙語）街名磚牌。

**Don't**
- 不要青花瓷的纏枝蓮與漸層暈染（那是中國釉下彩）；不要台夫特的錳紫與風車小景。
- 不要把藍白做成扁平 icon 風、不要等寬乾淨的向量線。
- 不要圓角卡片、模糊陰影、紫藍漸層、emoji icon、置中三卡片、Lorem ipsum、「EST. 19xx」徽章。
- 銻黃不准出現在人物板與磚牌字上。
- 不要淡入淡出——磚會翻、會轉，但不會變透明。

## 十一、頁面骨架範例

```html
<nav class="nav"><a class="plq" href="index.html" aria-current="page"><b>店面</b><i>Fachada</i></a>…</nav>
<header class="fach" style="position:relative;display:grid;grid-template-columns:repeat(18,var(--t))">
  <i class="tz" data-c="0" data-r="0" data-b="0" style="--g:#F2EEE3;--r:0"><svg viewBox="0 0 100 100"><use href="#padrao"/></svg></i>
  <!-- …其餘磚：data-b＝MOD[r%2][c%2] -->
  <h1 class="ov plq" style="--x:1;--y:1;--w:7"><b>店名</b><i>Nome em português</i></h1>
  <section class="ov cerc" style="--x:1;--y:4;--w:6">開場文字與兩顆按鈕</section>
  <a class="ov hole" style="--x:10;--y:2;--w:1" href="#">缺</a>
</header>
<section class="wall-plain"><div class="snap"><figure class="cerc"><!-- 藍白人物板 SVG --></figure>…</div></section>
<footer class="ft">深鈷地・錫白字</footer>
```

## 十二、技術實作與相容性

### 1. 程序化圖樣生成：padrão 四分之一花生成器（E 資料與生成層）
`tile.js`（約 6KB，建置期與瀏覽器共用）：mulberry32＋FNV-1a 決定性亂數，同一個 seed 永遠畫出同一塊磚、同一道筆抖。主花／副花／半花苞／對角莖由參數組合；四邊中點用同一個半花苞並繞磚心轉四次，保證任何旋轉排法接縫都連續；葉子左右交錯＋單側卷鬚使磚無任何對稱，鏡像成為可辨識的「另一塊磚」（缺磚遊戲的陷阱就靠它）。建置期烘成靜態 `<symbol>`（無 JS 時整面牆照樣在）；〈缺磚〉則在瀏覽器依 `?s=` 即時生成五種 symbol。Fallback：無 JS 時牆是靜態 HTML，遊戲顯示 `<noscript>` 規則說明。

### 2. `mix-blend-mode: multiply` 洗色疊合＋SVG `feTurbulence／feDisplacementMap` 筆觸（A 渲染層）
洗色 path 以 multiply 疊合，兩層淡洗交疊即變深，模擬鈷在錫釉上的積色；勾線與洗色整組套位移濾鏡做出吸釉毛邊。查證：MDN〈mix-blend-mode〉與〈&lt;blend-mode&gt;〉Baseline Widely available（2020-01 起跨瀏覽器）；MDN〈feTurbulence〉〈feDisplacementMap〉Baseline Widely available（2015-07 起）。Fallback：不支援 blend 時洗色正常覆蓋（只是交疊處不變深）；濾鏡失效時線條變得乾淨，資訊不變。

### 3. CSS 3D transform：翻磚換頁與逐塊翻面（C 版面與樣式層）
換頁覆蓋層是一個 `perspective:900px` 的 grid，每塊磚以 Web Animations `rotateY(90→0)`／`(0→-90)` 翻轉，延遲由與點擊點的距離決定；`sessionStorage` 在兩頁之間傳點擊座標，下一頁在 `<head>` 內聯腳本加 `.arriving` 先蓋住，1.6 秒保險自動解除。旋轉波期間牆加 `.waving`，對磚的 `<svg>` 設 `will-change:transform` 讓旋轉走合成層。查證：MDN〈backface-visibility〉Baseline Widely available（2022-03 起；舊 Safari 需 `-webkit-` 前綴，本站翻面只到 90° 不依賴背面隱藏）。Fallback：無 `Element.animate` 或 reduced-motion 時直接換頁。

### 效能預算實測
- 單頁大小（含 motion-library 子集 35KB、tile.js、全部 inline SVG）：見 README；全部 < 350KB。
- 首屏 JS：jsdom 實測整段 inline 腳本執行時間見 README（jsdom 無版面與繪製，僅作上限參考；未於實機瀏覽器量測）。
- 同一畫面同時運轉的 motion-library 元件 ≤2；旋轉波只動 transform；釉光只動 opacity／transform。
- 已知風險：首頁約 180–290 塊可見磚各自套筆觸濾鏡，低階手機首次繪製可能偏慢；必要時可把 `#brush` 只留在勾線層。
