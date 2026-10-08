---
name: kelmscott-press-folio
description: The Kelmscott Press book-page half of William Morris's Arts & Crafts — a two-page spread as the unit, dense justified black text with no paragraph gaps, white-vine-on-black woodcut borders, square woodcut initials sunk into the text, and strictly two inks (black and vermilion) on handmade paper.
---

# 凱姆斯各特書頁風（Kelmscott Press Folio）

> 工藝美術運動 Arts & Crafts 的**書頁半身**。同一流派的**花紙半身**（無縫接版、梨木版一色一版）見 `sites/rendong/SKILL.md`；兩者共用 Morris 這個源頭，但本規格書只管「一本書被翻開的那兩頁」。

## 一、設計哲學

William Morris 在 1891 年於倫敦 Hammersmith 創立 Kelmscott Press，到 1898 年關閉前印了 53 種、約 18,000 冊書。他反對的是十九世紀末的機器書：灰、鬆、字距與行距都太寬、頁面沒有重量。他在〈The Ideal Book〉（1893）與〈A Note by William Morris on his Aims in Founding the Kelmscott Press〉（1895）講得很清楚，好書要滿足四件事：

1. **單位是攤開的兩頁，不是單頁**。左右兩頁一起設計，文字塊往書脊靠攏，四邊留白由窄到寬依序是：內（書脊）＜上＜外＜下。
2. **頁面要黑**。字要粗、字距要緊、行距要小，不准有「白色河流」穿過字塊。段落之間不空行，用一片葉子（hedera）隔開。
3. **只有兩種墨**：黑與朱。朱給標題、段首、旁註；黑給一切其他。不用第三色，不用灰，不用淺色版。
4. **裝飾是木刻**：邊框與飾首字母是黑底上刻出白色藤蔓、葉、花——印出來的是「沒被刻掉的木頭」。所以裝飾永遠是滿的、密的、白線在黑地上。

《The Works of Geoffrey Chaucer》（1896，Kelmscott Chaucer）是這一切的總成：Chaucer type 雙欄、Troy type 標題、朱印旁註與起訖句、87 幅 Burne-Jones 木刻插圖、Batchelor 手漉亞麻紙（魚形水印）、Albion 手搬印刷機，紙本 425 部、犢皮紙本 13 部。

做網頁時，**這個風格的本體是印刷工序本身**：兩種墨、一個字塊、一圈木刻框、一顆沉進字裡的飾首字。它適合「有手藝、有文本、有儀式感」的產業：講古、書店、出版、茶館、合唱團、刻印、樂譜、族譜、教會、獨立出版。不適合儀表板、金融即時資料、需要大量彩色的商品目錄。

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，做出來的就不再是 Kelmscott。

### 特徵 1：白藤黑地的木刻框——裝飾是被刻出來的，不是畫上去的

框是一條實心黑帶，上面的藤、葉、花是**紙色**（=被刻掉的木頭）。藤必須是**連續的、有根的**——從框的某一點長出來、分枝、在帶內填滿到七成密度。葉子是白色實心、中間刻一道黑色葉脈。框內外各有一條紙色髮絲線。

```html
<!-- 框帶：evenodd 挖空中間 -->
<svg viewBox="0 0 600 860" preserveAspectRatio="none" class="vine frame">
  <defs>
    <path id="kpL" d="M0 0C2.5-4 7-3.6 10 0C7 3.6 2.5 4 0 0Z"/>          <!-- 葉 -->
    <g id="kpV"><path d="M1.2 0H8.2M3.8 0L5.5-2M5 0L6.8 1.8" fill="none" stroke="currentColor" stroke-width=".55"/></g>
    <clipPath id="band"><path clip-rule="evenodd" d="M42 50H540V787H42Z M78 86H504V751H78Z"/></clipPath>
  </defs>
  <path class="kb" fill-rule="evenodd" d="M42 50H540V787H42Z M78 86H504V751H78Z"/>
  <path class="hr" d="M44.5 52.5H537.5V784.5H44.5Z M75.5 83.5H506.5V753.5H75.5Z"/>
  <g clip-path="url(#band)"> <!-- 藤：見第十一章的 space colonization 引擎 --> </g>
</svg>
```
```css
.kb{fill:var(--k)}                       /* 黑地 = 墨 */
.hr{fill:none;stroke:var(--vp);stroke-width:.8}
.vine .br{fill:var(--vp);color:var(--k)} /* 葉白、葉脈黑 */
.vine .st path{fill:none;stroke:var(--vp);stroke-linecap:round;stroke-linejoin:round}
```
禁止：黑線畫在白底上的「線描花邊」（那是 Art Nouveau 的書籍裝飾，不是 Kelmscott）；禁止把框做成重複平鋪的 pattern（那是花紙半身）。

### 特徵 2：兩種墨，而且只有兩種

| 角色 | 色票 | 用在哪裡 | 面積 |
|---|---|---|---|
| 紙 | `#F1E9D6` | 頁面、木刻白線 | ~55% |
| 墨 | `#17120E` | 正文、框、飾首字地 | ~38% |
| 朱 | `#B5301E` | 標題、起訖句、旁註、段首葉、現用態 | ≤6% |
| 封面板（頁外） | `#7D8E9C` / 影 `#56636E` | 書之外的桌面——Kelmscott 的藍灰紙板封面 | 頁外 |
| 書脊摺線 | `#DCCFB2` | 1px 摺線 | 線 |

```css
:root{--paper:#F1E9D6;--ink:#17120E;--rub:#B5301E;--board:#7D8E9C;
      --k:var(--ink);--r:var(--rub);--vp:var(--paper)}  /* 所有元素只認 --k / --r */
.rub{color:var(--r)}
```
硬規則：頁內零灰階、零淡色、零漸層、零透明度。任何「次要文字」也是墨色，以字級與字重區分，不准調淡。所有顏色都經過 `--k`／`--r` 兩個變數——這樣「印刷」時可以先只上朱、再上墨（見動效）。

### 特徵 3：黑字塊——兩端對齊、字距不留縫、段落不空行

```css
.blk{font-family:"Noto Serif TC",serif;font-weight:600;   /* 比一般內文重一級 */
     font-size:calc(15*var(--u));line-height:1.6;           /* CJK 下限，不再鬆 */
     text-align:justify;text-justify:inter-character;text-wrap:pretty;
     hanging-punctuation:allow-end;margin:0}
.blk+.blk{margin-top:0}                                       /* 段落之間不空行 */
.hed{display:inline-block;width:1.05em;height:.78em;margin:0 .18em 0 .1em;background:var(--r);
     mask:url("data:image/svg+xml,…葉形…") center/contain no-repeat}  /* 段落改用朱葉隔開 */
```
新段落 = 在同一個段落裡插一片朱色 hedera 葉，**不換行、不空行、不縮排**。整頁看過去必須是一塊均勻的黑。

### 特徵 4：對開頁與 Morris 邊距

版面單位是 spread（左 verso＋右 recto），中間一條書脊摺線。邊距 內：上：外：下 ≈ 1 : 1.2 : 1.44 : 1.73（每級多兩成），文字塊靠向書脊。

```css
.spread{container-type:inline-size;display:grid;grid-template-columns:1fr 1fr;
        background:var(--paper);box-shadow:7px 9px 0 var(--board-d);--u:calc(100cqi / 1200)}
.spread::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:#DCCFB2}
.page{position:relative;aspect-ratio:600/860}
/* 600×860 設計單位：內 42、上 50、外 60、下 73 */
.verso.plain{padding:calc(50*var(--u)) calc(42*var(--u)) calc(73*var(--u)) calc(60*var(--u))}
.recto.plain{padding:calc(50*var(--u)) calc(60*var(--u)) calc(73*var(--u)) calc(42*var(--u))}
```
外邊（verso 左、recto 右）放朱色旁註；下邊放頁碼（Goudy 舊體數字）。

### 特徵 5：方形木刻飾首字，沉進字塊四行

第一段的第一個字是一塊**正方形黑地木刻**：字是紙色、四周白藤繞著字長，藤要避開字形。沉入正文 4 行（`initial-letter:4`），右側文字直接貼著繞排。

```css
.ini::first-letter{initial-letter:4;color:var(--vp);font-weight:900;
  background:var(--k) var(--ini) center/100% 100% no-repeat;   /* --ini = 白藤 SVG data URI */
  padding:.1em .12em .06em;margin:0 .22em .02em 0}
@supports not (initial-letter:4){
  .ini::first-letter{float:left;font-size:5.3em;line-height:1.08;padding:.06em .1em .02em;margin:.08em .14em 0 0}
}
```
```html
<p class="blk ini" style="--ini:url('data:image/svg+xml,…')">同行講古茶房在萬華……</p>
```

## 三、色彩系統

見特徵 2 的表。補充規則：

- 頁外（書桌）用 Kelmscott 紙板封面的藍灰 `#7D8E9C`，書本投一道 7px 9px 的**硬邊**影 `#56636E`——零模糊。頁外文字用墨色（對 `#7D8E9C` 約 5.5:1）。
- 朱只給「會被讀者用來找東西」的元素：標題、起訖句（Here begynneth／這裡開始、Here endeth／到此）、旁註、段首葉、表頭、編號、現用頁。
- 互動狀態不加新色：hover 由朱變墨，或由墨變朱。
- 對比：墨對紙 15.4:1；朱對紙 5.1:1（朱只用於 ≥14px 粗字）。

## 四、字體系統

| 用途 | 字體（Google Fonts） | 字重 | 備註 |
|---|---|---|---|
| 中文正文 | Noto Serif TC | 600 | 比常規重一級，模擬 Golden type 的黑 |
| 中文標題・飾首字 | Noto Serif TC | 900 | 字距 .04–.3em |
| 拉丁標題（Troy／Chaucer type 角色） | Grenze Gotisch | 700 | 只用於 Here begynneth／Here endeth 類起訖句，朱色 |
| 拉丁小字・頁碼（Golden type 角色） | Goudy Bookletter 1911 | 400 | 頁碼、英文引文、價格數字 |

字級（設計單位 u，頁寬 600u）：正文 15｜表格 14–14.5｜旁註 13｜起訖句中文 17／拉丁 19｜書名 46｜頁碼 12。行高：正文 1.6、標題 1.12–1.35。

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;600;700;900&family=Grenze+Gotisch:wght@500;700&family=Goudy+Bookletter+1911&display=swap" rel="stylesheet">
```

## 五、版面與網格

- 設計座標：每頁 600×860 單位，`--u = 100cqi / 1200`（spread 寬為容器）。所有尺寸用 `calc(n*var(--u))`，整本書隨寬度等比縮放——這是「印刷品」的邏輯：字級跟紙走，不跟視窗走。
- 有框的頁：框外緣 = 頁減去邊距（verso x=60／recto x=42，y=50，498×737），框帶寬 36，文字區再內縮 12–13。
- 無框的頁：只留邊距與文字塊，可加雙欄（`columns:2;column-gap:22u`，Chaucer 雙欄的做法）。
- 零旋轉、零重疊、零卡片。唯一的「格線」是 spread 的兩頁與書脊。
- 每個 spread 至多一頁有全框；開卷第一個 spread 可兩頁都有框（Kelmscott 開卷頁的做法）。

## 六、元件配方

**導覽：旁註（shoulder-note）**——朱色直排小字，放在 recto 的外邊距。現用頁變墨並在頂上戴一片朱葉。
```css
.shnav{position:absolute;right:0;top:calc(90*var(--u));width:calc(60*var(--u));display:flex;flex-direction:column;align-items:center;gap:calc(16*var(--u))}
.shnav a{writing-mode:vertical-rl;color:var(--r);font-weight:700;font-size:calc(13*var(--u));letter-spacing:.2em;text-decoration:none}
.shnav a[aria-current=page]{color:var(--k)}
@media (max-width:900px){.shnav{position:fixed;left:0;right:0;bottom:0;flex-direction:row;background:var(--paper);border-top:3px solid var(--ink)}
  .shnav a{writing-mode:horizontal-tb}}
```
**按鈕**：墨地紙字、零圓角、900 字重、字距 .1em；hover 變朱地。次要按鈕＝透明底墨框。
**表格**：表頭朱字、底線 2px 墨，列線 1px 墨；無斑馬紋、無底色。
**表單**：輸入框只有一條 2px 墨底線（textarea 為 2px 墨框），focus 時線變朱。
**目錄**：三欄 grid（朱編號｜標題＋小字說明｜Goudy 頁碼），上 2px 下 1px 墨線。
**起訖句**：每個章節以「Here begynneth…／這裡開始・…」朱字開、以「Here endeth…／…到此」朱字收。
**頁外 footer**：放在藍灰書桌上、書本之外，墨字＋墨底線連結，含全部頁面連結與「虛構示意」聲明。

## 七、動效規則（4 種，各自有 reduced-motion 降級）

| 種類 | 本站做法 | 觸發 | 時間／緩動 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **輪刻**：卷首左頁的大型飾首字每 9 秒換一個講者的姓，藤用 space colonization 現長出來（深度逐幀遞增） | setInterval 9s，分頁隱藏時暫停 | 生長 1500ms 線性 | 停在第一個姓，十二位講者名單在右頁正文中完整列出 |
| input 輸入 | **點朱**：指著（hover／focus）講者名字或接龍句，框上屬於他的那條根整條轉朱 | pointerover／focusin | 90ms linear | transition 歸零、瞬間變色 |
| transition 轉場 | **翻葉**：點內頁連結時 recto 以書脊為軸翻過去（rotateY 0→−180°），新頁 recto 由 14° 落定 | click／載入 | 540ms cubic-bezier(.45,.05,.4,1)；落定 420ms | 直接換頁 |
| signature 簽名 | **朱墨兩過**：接一句送出時，頁面先變成白紙，壓板落下一次只出朱、再落一次才出墨與框 | submit | 每過 760ms，兩過間隔 260ms | 直接出完整印刷結果 |

禁用：淡入、滾動揭示、視差、跑馬燈、dashoffset 描線。

## 八、插畫與圖像風格

全站沒有插畫，只有木刻：框、飾首字、印記。技法命名 **colonized-vine-woodcut（殖民藤蔓木刻）**：

- 藤由 space colonization 長出：在框帶裡撒吸引點，從根開始每步 6.5u 朝影響半徑 34u 內吸引點的平均方向生長，距離 9u 即「吃掉」該點；加 ±0.32 rad 交替旋轉做出捲曲。
- 粗細用管模型（pipe model）：一段枝的寬 = 1.5 + √(下游節點數) × 0.42，上限 4.2。
- 葉：沿枝每兩節 80% 機率長一片 10–17u 的白葉，左右交替；枝端 20% 開五瓣花（花心墨點＋紙點）、30% 結兩顆漿果、其餘一片頂葉。
- 根的數量有語意：本站一條根 = 一位講者（卷首右頁 12 條 = 九月同行夜 12 人；接龍頁每多一句多一條）。
- 同一顆 seed 永遠長出同一個框；建置時以同一支引擎在 Node 烘成靜態 SVG，無 JS 也看得到。

## 九、Logo 與 Favicon

- **印記（printer's mark）**：360×150 黑地木刻長方塊，白藤四面長，中央留一塊紙色方框寫「同行」（Noto Serif TC 900）與朱色 Grenze「Tâng-kiânn · Tea Room」。這是 Kelmscott 版記印記的結構：書末一塊長方形木刻，字在藤中間。
- **Favicon**：32×32 黑方塊＋紙色髮絲框＋一枝白藤兩片葉＋一朵五瓣白花、朱色花心。inline SVG data URI。

## 十、Do & Don't

**Do**
- 以 spread 為單位設計；手機才拆成單頁直排。
- 段落用朱葉隔開，整頁不空行。
- 每章用「這裡開始／到此」朱字起訖。
- 所有顏色只經過 `--k`、`--r`、`--vp` 三個變數。
- 框的藤要從根長出、連續、可數。

**Don't**
- 不用第三種墨、不用灰字、不用淡色底塊、不用漸層與模糊陰影。
- 不用圓角、卡片、膠囊按鈕。
- 不把框做成平鋪紋樣；不用黑線白底的線描花邊。
- 不用 emoji 當 icon（hedera 葉以 CSS mask 畫）。
- 不寫「在這個快節奏的世界」之類的 AI 腔；不用 EST. 徽章；不做置中大標＋兩按鈕＋三卡片。
- 不用紫藍漸層 hero；不放跑馬燈。

## 十一、頁面骨架範例

```html
<main class="book">
 <section class="spread">
  <div class="page verso plain">
    <h2 class="inc"><span class="lt" lang="en">The Table</span>本冊目錄</h2>
    <ol class="toc blk">…</ol>
    <span class="folio">iii</span>
  </div>
  <div class="page recto framed">
    <svg class="vine frame" viewBox="0 0 600 860" preserveAspectRatio="none">…框…</svg>
    <nav class="shnav"><a href="index.html" aria-current="page">卷首</a><a href="tale.html">接一句</a>…</nav>
    <div class="txt">
      <h2 class="inc"><span class="lt" lang="en">Here begynneth</span>這裡開始・……</h2>
      <p class="blk ini" style="--ini:url(…)">同……<span class="hed"></span>……</p>
    </div>
    <span class="folio">iv</span>
  </div>
 </section>
</main>
```
藤框引擎核心（約 30 行，可直接用）：
```js
function grow(o){ // o:{w,h,mask(x,y),seed,count,roots,step,infl,kill,curl}
  const R=rng(o.seed),A=[],N=[];
  while(A.length<o.count){const x=R()*o.w,y=R()*o.h;if(o.mask(x,y))A.push([x,y,1])}
  o.roots.forEach((r,i)=>N.push({x:r[0],y:r[1],p:-1,r:i,s:i%2}));
  for(let it=0;it<900;it++){
    const dir=new Map();
    for(const a of A){if(!a[2])continue;let b=-1,bd=o.infl**2;
      for(let i=0;i<N.length;i++){const d=(a[0]-N[i].x)**2+(a[1]-N[i].y)**2;if(d<bd){bd=d;b=i}} // 實作請用格網加速
      if(b<0)continue;if(bd<o.kill**2){a[2]=0;continue}
      const v=dir.get(b)||[0,0],l=Math.sqrt(bd);v[0]+=(a[0]-N[b].x)/l;v[1]+=(a[1]-N[b].y)/l;dir.set(b,v)}
    if(!dir.size)break;
    for(const [i,v] of dir){const n=N[i],L=Math.hypot(...v),c=o.curl*(n.s?1:-1);
      let ux=v[0]/L,uy=v[1]/L;[ux,uy]=[ux*Math.cos(c)-uy*Math.sin(c),ux*Math.sin(c)+uy*Math.cos(c)];
      const x=n.x+ux*o.step,y=n.y+uy*o.step;if(o.mask(x,y))N.push({x,y,p:i,r:n.r,s:R()<.5?n.s:1-n.s})}}
  return N;}
```

## 十二、技術實作與相容性

本站三項核心技術，皆於 2026-10-08 查證：

### 1. Space colonization 藤框生成（E 資料與生成層）
- 來源：Runions, Lane & Prusinkiewicz〈Modeling Trees with a Space Colonization Algorithm〉Eurographics Workshop on Natural Phenomena 2007。參數約束「影響半徑 > 殺死距離」與步長遠小於場地，依多篇實作文件交叉確認。
- 實作：吸引點以 FNV-1a → mulberry32 決定性撒點；最近節點查詢用邊長 = 影響半徑的格網雜湊（只查 3×3 鄰格）；管模型決定粗細；枝鏈以二次貝茲中點平滑。葉、花用 `<use href>` 引用同一組 `<defs>`，框 SVG 從 115KB 降到約 78KB。
- 承載：特徵 1（框）、特徵 5（飾首字白藤）、印記、ambient 輪刻、input 點朱（每條根 = 一個 `<g data-r>`）、簽名後的框重長。
- Fallback：純 JS、無 API 相依；無 JS 時每頁至少一個框在建置時已烘成靜態 SVG，飾首字以「中央方形避讓」版本烘在 `style` 裡。
- 效能實測（Node 22 aarch64，中位數）：600×860 全框 7 根 29.5ms、12 根 15.5ms；手機橫條 4.7ms；132px 飾首字 4.6ms；輪刻 220px 生長 14.5ms＋每幀重繪 0.5ms。卷首首屏 JS 合計約 50ms（<100ms 預算）。

### 2. CSS `initial-letter` ＋ `text-wrap: pretty` ＋ 兩端對齊（C 版面與樣式層）
- `initial-letter`：caniuse「CSS Initial Letter」——Chrome／Edge 110+、Safari（`-webkit-initial-letter`，9+）為 **partial**；**Firefox 至 152 皆不支援**（Working Draft）。
- `text-wrap: pretty`：caniuse——Chrome／Edge 117+、Safari 26+ 支援；Firefox 不支援。
- Fallback 具體行為：`@supports not (initial-letter:4)` 時 `::first-letter` 改為 `float:left; font-size:5.3em; line-height:1.08`，視覺上同樣沉 4 行；Safari 走 `-webkit-initial-letter` 分支；`text-wrap: pretty` 不支援時只是行尾斷字較不講究，資訊零損失。
- 飾首字的白藤背景在執行期以 canvas `fillText` 畫出字形 → `getImageData` 取 alpha、膨脹 4px 作為避讓遮罩 → 重長白藤 → 以 data URI 寫進 `--ini`；字型載入用 `document.fonts.load()` 等待。

### 3. CompressionStream `deflate-raw` → base64url 的網址狀態（E 資料與生成層）
- 接龍的全部內容（段名＋每一句的名號與內容，最多 24 句）序列化為 JSON → `CompressionStream('deflate-raw')` → base64url → `location.hash`。沒有伺服器、沒有資料庫：**故事就是連結**。
- 查證：MDN〈Compression Streams API〉標示 Baseline Widely available（2023-05 起跨瀏覽器可用）；caniuse `deflate` 格式：Chrome 80+、Firefox 113+、Safari 16.4+。`deflate-raw` 為 MDN 文件列出之合法格式，本站以 try/catch 偵測。
- Fallback：不支援 CompressionStream 時改存 `j` 前綴的未壓縮 UTF-8 base64url；收到 `z` 前綴但無 DecompressionStream 時，明確告知並從預設開頭讀起。
- 實測：4 句的接龍網址 hash 約 450 字元（未壓縮約 600）；jsdom＋Node 22 原生 CompressionStream 往返驗證通過。

### 整體效能
- 單頁大小：index 203KB、colophon 186KB、tale 139KB、programme 135KB（皆 ≤350KB，含 inline 全部 SVG/CSS/JS；外部僅 Google Fonts）。
- 動畫只動 `transform`、`height`（壓板，單一元素）與 CSS 變數；無 layout thrashing。
