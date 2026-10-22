---
name: literatura-de-cordel-xilogravura
description: Brazilian literatura de cordel as a web style — chapbooks hung on a string, each one a single sheet of cheap coloured paper printed with one black woodcut whose white is carved out by gouge marks, a letterpress title on top and an imprint line at the foot; colour comes only from the paper, ink is only ever black.
---

# 繩上冊 Literatura de Cordel・Xilogravura — 風格規格書

> 巴西東北（Nordeste）的 literatura de cordel：一本 11×16 公分的小冊，一張便宜色紙當冊皮，一塊黑墨木刻（xilogravura），用衫仔挾吊在市集的繩子（cordel）上賣。本規格把它做成網頁語言。示範站〈繩仔冊〉把它嫁接到臺灣的歌仔冊——兩邊都是七音節的韻文小冊、都在廟口與市集吊著賣。

## 設計哲學

1. **顏色是紙，不是墨。** 墨永遠只有一種黑。一個物件要有顏色，就是換一張紙。
2. **白是挖出來的。** 木刻上沒有「畫上去的白線」，只有刀把木頭挖掉後留下的紙色。所有細節都是負形。
3. **東西是吊著的。** 版面的主單位是一本會晃的小冊，它有釘書位、有衫仔挾、有重量；不是一張卡片。
4. **一本冊只說一件事。** 書名、一塊版、一行印記。沒有副標、沒有標語、沒有按鈕群。
5. **便宜但不草率。** 印不勻、框緣抖、冊與冊互相蓋住——這些是材料的事實，不是做舊濾鏡。

外部參照：IPHAN 2018 將 literatura de cordel 登錄為巴西非物質文化遺產；J. Borges（José Francisco Borges，1935–2024，Pernambuco 州 Bezerros）的木刻冊皮；cordel 詩人 Leandro Gomes de Barros（1865–1918）；Fortaleza 的 Cordelteca da Unifor 收藏；臺灣歌仔冊 1926 年臺北黃塗活版所起以鉛字大量發行、竹林書局等版本。

## 本風格的 5 個不可省略特徵

### 1. 色紙冊皮・黑一色（色彩規則）

每本冊＝一張色紙＋一版黑墨。色紙只有五種：檸檬黃、桃仔紅、薄荷青、天藍、柑仔色。同一個物件內不混兩種紙色；零漸層、零陰影、零透明。木刻裡的「白」一律寫成 `currentColor`，讓同一塊版放在不同色紙上自動變成那張紙的顏色。

```css
.cv{background:var(--pp);color:var(--ink)}          /* --pp = 這本冊的紙 */
.cv .art{color:var(--pp)}                              /* 版上的白＝紙色 */
:root{--amar:#F2D64B;--rosa:#EC9DB5;--verde:#9BCB95;--azul:#93BCE0;--laranja:#F0A160;--ink:#17140F}
```
```svg
<symbol id="m-ke" viewBox="0 0 100 80">
  <path fill="#17140F" d="…黑版…"/>
  <path fill="currentColor" d="…刀痕…"/>   <!-- 不寫死顏色 -->
</symbol>
```

### 2. 木刻黑版：白是刀痕（形狀語彙）

圖像是大塊實黑，細節全部是鑿掉的白：**沿輪廓往內的楔形刀痕**（底寬 0.75–1.4、長 1.5–4.3 版面單位，22% 機率跳過不鑿）、**區域內的排線刀痕**（兩頭尖的梭形）、**點列**、**鱗紋**、**鋸齒**。人物正面、扁平、零透視；臉是黑的，眼口鼻是挖出來的白。圖外一圈 3.2 單位黑框，外緣直、內緣抖（±0.55）。

```js
// 沿邊楔形刀痕：底在邊上、尖往內
function wedge(p,dir,tan,L,w){return `M${p[0]+tan[0]*w/2} ${p[1]+tan[1]*w/2}L${p[0]-tan[0]*w/2} ${p[1]-tan[1]*w/2}L${p[0]+dir[0]*L} ${p[1]+dir[1]*L}Z`;}
// 排線刀痕：兩頭尖的梭形
function lens(x,y,a,L,w){const c=Math.cos(a),s=Math.sin(a),nx=-s,ny=c;
  return `M${x-c*L/2} ${y-s*L/2}L${x+nx*w/2} ${y+ny*w/2}L${x+c*L/2} ${y+s*L/2}L${x-nx*w/2} ${y-ny*w/2}Z`;}
```

### 3. 吊在繩上（版面手法）

首屏的主單位是一條橫過整個畫面的麻繩，冊用衫仔挾吊著、彼此重疊、各自微斜。斜度不是寫死的角度，是物理結果（重量、風、手拉）。無 JS 時退為靜態：每本冊 `rotate(var(--r))` 排一列，繩是一條 SVG 二次曲線。

```css
.bk{transform:rotate(var(--r,0deg));transform-origin:50% -18px}  /* 以挾子為軸 */
.rp{fill:none;stroke:#A8824B;stroke-width:4;stroke-linecap:round}
.rp2{fill:none;stroke:#6E5530;stroke-width:4;stroke-dasharray:2 5} /* 麻繩的股 */
```

### 4. 封面三段：書名／木刻／印記（字體選擇＋版面）

上：活字黑體書名（Noto Sans TC 900，置中，最多兩行，字級 13.5cqw）；中：木刻佔約 60% 面積（版面比 100:80）；下：一條 1.2cqw 黑線＋店號＋頁數價數（Noto Serif TC 700＋Anton）。冊比例固定 11:16，左緣兩個釘書位。內頁的韻文直排（七字一句、四句一葩），每句一行。

```css
.cv{aspect-ratio:11/16;container-type:inline-size;display:flex;flex-direction:column;padding:7cqw 7cqw 5cqw}
.cv .tt{font:900 13.5cqw/1.12 "Noto Sans TC";text-align:center;min-height:2.24em}
.cv .art{aspect-ratio:100/80;width:100%}
.cv .ft{margin-top:auto;border-top:1.2cqw solid var(--ink);display:flex;justify-content:space-between}
.cv::before,.cv::after{content:"";position:absolute;left:0;top:24%;width:2.2cqw;height:6cqw;background:#4A4338}
.cv::after{top:70%}
.verse{writing-mode:vertical-rl;height:12.5em;letter-spacing:.14em}
.verse span{display:block}           /* 一句一行（直排時＝一欄） */
```

### 5. 鑿痕母題當裝飾（裝飾母題）

沒有乾淨的 CSS 邊框。區塊分隔是一條「鑿痕條」（黑條上下緣鑿出白楔）；按鈕是黑塊，邊緣由抖動多邊形 `clip-path` 切出；編號是刀口黑方塊。地上的草叢、天上的鳥與日頭的光芒也是楔形。

```css
.gouge{height:14px;background:#17140F var(--gouge) repeat-x 0 0/200px 14px}
.btn{background:#17140F;color:#E9E2CE;clip-path:var(--jag)}
/* --jag 由建置期產生：每 12.5% 一點、往內抖 0–5% */
:root{--jag:polygon(0% 2.1%,12.5% 4.0%,25% .7%,…,100% 1.3%,98.2% 12.5%,…)}
```

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 報紙地 | `#E9E2CE` | 頁面地、刀痕在報紙底上的白 | ~48% |
| 報紙暗 | `#DDD4BC` | 次要底（小繩攤、縮圖底） | ~4% |
| 墨 | `#17140F` | 全部文字、木刻黑版、鑿痕條、按鈕、頁尾 | ~24% |
| 墨灰 | `#4A4338` | 次要文字、釘書位 | ~3% |
| 檸檬黃 | `#F2D64B` | 冊皮、首頁換頁幕、焦點替代色 | ≤5% |
| 桃仔紅 | `#EC9DB5` | 冊皮、〈一本冊的樣〉區塊、冊目頁 | ≤5% |
| 薄荷青 | `#9BCB95` | 冊皮、刻頁、地圖 | ≤5% |
| 天藍 | `#93BCE0` | 冊皮、唸頁 | ≤5% |
| 柑仔色 | `#F0A160` | 冊皮、月琴弦帶 | ≤4% |
| 麻繩 | `#A8824B`／`#6E5530` | 只給繩與衫仔挾 | ≤1% |
| 衫仔挾木 | `#C9A46A`／`#B08E57` | 只給衫仔挾 | ≤1% |

規則：五張色紙永遠是「面」，不當文字色、不當邊框色；同一個元件只能用一張紙。黑上的字用報紙色或該紙色。

## 字體系統

- **Noto Sans TC 900**（Google Fonts）：書名、標題、按鈕——當作木活字黑體。字距 .06–.12em。
- **Noto Serif TC 500／700／900**：正文、韻文、印記——歌仔冊內頁是明體鉛字。
- **Anton**：拉丁小標，全大寫、字距 .08–.2em（cordel 冊皮上的葡文店號感）。
- 字級：H1 54–124px／H2 30–64px／書名 13.5cqw／正文 16–17px 行高 1.9–2.1／小標 11–13px。
- 直排：`writing-mode:vertical-rl; text-orientation:mixed`，數字用 `text-combine-upright:all`。

## 版面與網格

- 首屏：一條繩橫過全寬（兩端各超出 20px 釘在畫面外），繩高 150–186px（手機 48px，相對開場區頂），冊吊在繩下；左下角一段直排大字＋三條規則，右下角茄芷袋。
- 內容：左右兩欄不等寬（1.05fr／1fr），一欄是放大的木刻、一欄是直排文字。
- 冊目：`repeat(auto-fill,minmax(250px,1fr))` 冊桌，每本冊旋轉 −2.4°～+2.1°（hover 時轉正上提 6px）。
- 留白：區塊上下 48–110px；側距 `clamp(16px,4vw,56px)`。
- 旋轉只給吊著或擺著的冊（≤4°），文字與按鈕不旋轉。

## 元件配方

- **導覽（曬冊繩）**：右上角一條小麻繩（SVG 二次曲線），四本 38×54 小冊各一字（繩／冊／刻／唸）＋小拉丁註記；平時以 3.6s 各自不同相位擺動；hover 一記踢擺 0.7s；現用頁那本冊「上墨」——黑底、字成紙色。
- **按鈕**：黑塊、報紙色字、`clip-path:var(--jag)`；hover 換成檸檬黃底墨字。次要按鈕＝3px 內框。
- **冊（卡片的替代）**：`.cv` 三段式，見特徵 4；吊著時是 `<button>`，按一下讀、拖落來買。
- **表單**：輸入框無框，只有下緣 4px 墨線；選項是自繪方塊（勾選時中間一顆黃方塊）；版的選擇是十塊木刻縮圖，選中時底換成你選的紙色。
- **對話框（讀冊）**：右邊是冊皮（墨色底襯）、左邊是內頁，內頁以 `clip-path:inset(0 0 0 100%)→inset(0)` 從右往左翻開（直排書由右翻）。
- **頁尾**：墨底、報紙色字、Anton 黃色小標；上方一條鑿痕條。

## 動效規則

| 種類 | 本站實作 | 觸發 | 數值 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 風吹繩：三個正弦疊成的陣風同時推繩節點與冊的擺角；導覽小冊各自擺 | 時間 | 風 = 70sin(.43t)+46sin(1.07t+1.3)+28sin(2.6t+.4)·max(0,sin .21t)；擺 3.6s ease-in-out ±2.4° | 風歸零、冊靜止；導覽不擺 |
| input 輸入 | 游標掠過繩會把繩推開（半徑 38px）；掠過冊依水平速度給它一記擺；拖冊時繩被拉成 V | pointermove／drag | 同幀 | 推繩與拖曳照常（使用者自己在動），擺動阻尼加大到 9 |
| transition 轉場 | 換頁：目的頁那張色紙冊皮沿繩落下蓋住全畫面（560ms，−6°→+2.4°→0），下一頁再被拉起（620ms）；讀冊內頁由右翻開（460ms）；收條 steps(4) 由上印出 | 點連結／開冊 | cubic-bezier(.45,0,.55,1) | 直接換頁、內頁直接顯示 |
| signature 簽名 | **拉落來 pull-to-unpin**：把冊往下拖，挾子所在的繩節點被釘在手上、整條繩拉成 V；拉離原位超過 max(96px, 冊高×0.62) 時挾子「啪」一聲跳起轉 −38°、一顆十芒刀痕星爆 3 格，繩彈回、冊脫手——放進茄芷袋就是買了，掛回任一個空挾子就是放回去 | 拖曳 | Verlet 56 節點、約束 14 次／步、每幀 2 子步；重力 1500px/s²；有冊的節點 ×3.2 重 | 照常可拉，但無星爆、挾子不跳 |

自我限制：本風格**不用淡入、不用模糊、不用發光**；所有出現都是「掉下來」「翻開」「印出來」這種有物理來源的動作。

### motion-library 元件

來源：`wenxiangxiao/motion-library` v1.10.0 @887bb23，以 `tools/ml-embed.js` 只抽該頁元件，並與 `src/motion-player.js`（`mount()`）一起 inline 為每頁第一個 `<script>`；掛載走 `TS.ml`（等字型、離屏 destroy、一次性文字 seek(1)、reduced-motion 背景 seek(.35)）。開發 Prompt 以 `MotionLib.prompt(id)` 取得。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 角色 |
|---|---|---|---|---|---|
| index | TXT-A-14 | Torn Text | text「七字仔」、colors 墨／桃仔紅／報紙、duration 2.4、once、maxHeight 190、seed 34 | 「七字仔」三字沿一條鋸齒裂口上下兩半錯開再對齊——像一張便宜冊紙被撕開又拼回；鋸齒裂口正是鑿痕母題 | transition |
| tsheh | BG-B-24 | Crosshatch | colors 墨／檸檬黃／桃仔紅、duration 7、loop、density .9、seed 11 | 冊目標題後的交叉排線慢慢平移——木刻排線刀痕的放大，直線、零圓角、零發光 | ambient |
| khik | TXT-B-37 | Letter Assemble | text「刻一塊版」、colors 墨／檸檬黃／薄荷青、duration 2.2、once、seed 62 | 四個字從四散飛回各自的位置——撿字排版的動作；字色由薄荷青底自動得近黑 | transition |
| liam | TXT-B-10 | Stop Motion | text「唸歌」、colors 墨／檸檬黃／天藍、duration 1.8、once、seed 9 | 12 格逐格長出的字，像說唱的人一字一頓 | transition |
| liam | BG-A-04 | Vertical Lines | colors 墨／檸檬黃／柑仔色、duration 5、loop、density .5、seed 4 | 一排直線依相位伸縮＝月琴弦在振；圓頭線端恰是 U 刀的刀痕 | ambient |

## 插畫與圖像風格

技法 **xilo-gouge 鑿痕木刻生成**：每塊版＝一組黑色原語（多邊形、圓、橢圓）＋生成器依決定性亂數（FNV-1a 雜湊母題名→mulberry32）鑿出：沿邊楔形刀痕、區域紋理（`hatch:角度:間距`／`dots:間距`／`scale:間距`／`zig:間距`）、地面記號（草叢三楔、鳥、十二芒日頭、星點）、抖動內緣的黑框與框上 14 個缺口、60 顆紙色細斑（只落在黑上看得見＝印不勻）。記號層依序疊（白連續合併、黑各自一條 path，避免 nonzero 反向相消）。

- 母題要選「一眼認得的物件或人」：月琴阿伯、雞公、磨鏡人、雙蝶、窗邊人、桃樹日頭、五分車、帆船、駝峰牛、廟口。
- 人物一律正面或正側，比例粗短；手腳是長方塊。
- 一塊版約 11–19KB；同一頁同一母題只輸出一次 `<symbol>`，各冊用 `<use>`。

## Logo 與 Favicon 設計指南

Logo：一條下垂的麻繩、一支衫仔挾、一本檸檬黃小冊（墨色書名條＋木刻窗，窗裡刀挖出一顆日頭與兩座山）。Favicon 同構簡化為 32×32：報紙底、繩、黃冊、黑版、白山。不加字以外的任何裝飾。

## Do & Don't

**Do**
- 讓顏色只來自紙；換紙就換顏色。
- 白一律是 `currentColor` 的刀痕。
- 讓冊吊著、重疊、會晃；讓「拿下來」成為真的動作。
- 書名短，最多兩行。內頁直排、一句一行。

**Don't**
- 不用漸層、模糊陰影、發光、玻璃擬態、圓角卡片（rounded-2xl＋模糊陰影＝去AI化禁令）。
- 不在木刻上畫白線描邊（白只能是挖的）。
- 不用 emoji 或線框 icon；需要圖示就刻一個小楔形圖。
- 不用紫藍漸層 hero、置中大標＋兩顆按鈕＋三張卡片、Lorem ipsum、「EST. 19xx」徽章。
- 不要把五張色紙同時塞進一個元件；也不要把色紙拿來當字色。

## 頁面骨架範例

```html
<header class="top">
  <a class="mark" href="index.html"><svg>…繩＋挾＋冊…</svg><span><b>店名</b><span>tsîn-á-tsheh · since 1934</span></span></a>
  <nav class="varal" aria-label="主導覽">
    <svg class="line" viewBox="0 0 360 30" preserveAspectRatio="none"><path d="M-6 4Q180 26 366 4" stroke="#A8824B" stroke-width="3" fill="none"/></svg>
    <ul><li><a href="index.html" aria-current="page" style="--pp:#F2D64B;--i:0"><span class="pn"></span><span class="mc">繩<i>tsin</i></span></a></li>…</ul>
  </nav>
</header>
<div class="feira">
  <svg class="ropesvg" viewBox="0 0 100 100" preserveAspectRatio="none"><path class="rp" vector-effect="non-scaling-stroke" d="M-2 22Q50 34 102 22"/></svg>
  <div class="shelf">
    <button class="bk" data-id="1" style="--r:-3deg">
      <div class="cv" style="--pp:#F2D64B"><b class="tt">書名</b>
        <svg class="art" viewBox="0 0 100 80"><use href="#m-bio"/></svg>
        <span class="ft">店號印<i>8P・NT$60</i></span></div>
    </button>
  </div>
</div>
<div class="gouge" aria-hidden="true"></div>
```

## 技術實作與相容性

### 1. requestAnimationFrame Verlet 繩索物理（B 動效與時間軸層「rAF 物理積分」）
- 承載特徵 3 與 signature：56 個質點、兩端固定；每步 Verlet 積分（阻尼 .986）＋只在「太長」時修正的距離約束 14 次（繩可鬆不可撐）；有冊的節點加 2.2 倍重力；冊的擺角是被掛點加速度驅動的阻尼擺 θ'' = −(g/L)sinθ − cθ' − (a/L)cosθ。拖曳時把掛點節點釘到指標上，拉離原位 > max(96px, 0.62×冊高) 即「脫挾」。
- 支援：requestAnimationFrame、Pointer Events、`setPointerCapture()` 皆為 MDN Baseline Widely available（setPointerCapture 自 2020-07 起各瀏覽器可用）。
- fallback：無 JS——冊以靜態 CSS 旋轉排成一列、繩為 SVG 二次曲線、每本冊仍可在「冊目」頁購買。離屏（IntersectionObserver）與分頁隱藏時停止模擬。
- 實測：jsdom（node 22）下首頁站內腳本執行 ≈52ms（含 120 步暖機），motion-library 子集 ≈30ms；jsdom 的 DOM 遠慢於真實瀏覽器，此為上限值。每幀 2 子步 × 56 節點 × 14 次約束 ≈ 1.6k 次距離運算，DOM 寫入只有 1 條 path 的 d 與 16 個 transform。

### 2. writing-mode: vertical-rl ＋ text-combine-upright（C 版面與樣式層）
- 承載特徵 4：歌仔冊內頁七字一句直排、讀冊對話框、冊目每本的頭一葩、首頁的開場大字與說明。
- 支援：W3C i18n〈Styling vertical Chinese, Japanese, Korean and Mongolian text〉指出主要引擎皆支援直排基本功能；MDN 標 `text-orientation` Baseline Widely available（2020-09 起）、`text-combine-upright` 的 `all` 值 Baseline（2022-03 起；`digits` 值無瀏覽器支援，勿用）。
- 坑：直排容器裡要「一句一欄」必須讓每句 `display:block`（用 flex 的話 main axis 會跟著 inline 軸變成直的）。≤560px 時長段落改回橫排，韻文保持直排。
- fallback：不支援時退為橫排，資訊不變。

### 3. 決定性偽隨機的木刻生成器（E 資料與生成層「決定性偽隨機」＋「程序化圖樣生成」）
- 承載特徵 2 與全站插圖：母題名經 FNV-1a 雜湊作 mulberry32 種子，同母題恆得同一塊版；生成在建置期執行並烘成 `<symbol>`，**無 JS 也看得到每一塊版**。
- 輸出純 SVG path，不需要 canvas；`<use>` 內的 `currentColor` 繼承自外層 `color`，同一塊版可放在任何色紙上。
- 另：茄芷袋以 `sessionStorage` 跨頁，並以 `URLSearchParams`＋`history.replaceState()`（MDN Baseline Widely available，2015-07 起）把袋內冊號寫進 `?b=`——收條上的連結寄給別人，打開就是同一袋冊。
- 效能預算：單頁 210–296KB（含木刻 symbol 與 motion-library 子集約 100KB），皆 ≤350KB；同一畫面最多 1 個 motion-library 元件在跑。

查證來源：MDN〈Element: setPointerCapture()〉、MDN〈History: replaceState()〉、MDN〈text-orientation〉〈text-combine-upright〉、W3C i18n〈Styling vertical Chinese, Japanese, Korean and Mongolian text〉。
