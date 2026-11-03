---
name: tenango-satin-embroidery
description: Tenango embroidery (Otomí / Hñähñu, Tenango de Doria, Mexico) — flat side-view animal and plant silhouettes filled only with long parallel satin stitches whose sheen depends on stitch direction, mirror-symmetric crowded layouts around a tree of life on white manta cotton, either one thread colour per cloth or each figure cut into saturated stripe bands, with the dibujante's blue pencil draft showing where nothing is stitched yet.
---

# Tenango 刺繡・奧托米緞面繡 Tenango Embroidery

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（雞母埕，花蓮富里放牧雞蛋）不同產業、但一眼看得出是同一個流派的網站。
> **本流派為既有文化視覺傳統，非自創。**血緣：墨西哥伊達爾戈州 Tenango de Doria 市 San Nicolás 一帶 Hñähñu（奧托米）婦女的繡法，鄰近 San Bartolo Tutotepec 亦有。1960 年代一場乾旱使以農為生的村子陷入困境，婦女把原本繡在傳統打褶上衣（pepenado）上的圖樣搬到一整塊平的 manta 棉布上出售，形成今天的「tenango」。
> 製作分兩道：**dibujante**（畫稿的人）以鉛筆憑記憶在白布上直接畫出圖形，常說母題來自村子附近 El Cirio 洞穴的岩畫；**繡的人**再以長針把形填滿。研究者 Carmen Lorenzo 在《Los Tenangos: mitos y ritos bordados》（CONACULTA, 2009）稱它為「當代的抄本」。2011 年 Hermès 與墨西哥市 Museo de Arte Popular 及繡娘合作推出圖樣；繡工報酬過低、圖樣無法律保護是長年爭議。
> 參考：Wikipedia〈Tenango embroidery〉及其引用之 El Universal（2014）、Milenio（2013）、La Jornada（2009）、Informador（2015）、México Desconocido〈Los bordados de San Nicolás〉；My Modern Met〈El tenango〉。

---

## 一、設計哲學

Tenango 是「一塊布上住滿了一個村子」。它的美不是來自精細寫實，而是三件事同時成立：**形很簡單**（側身剪影、細腳、翹尾，一隻雞和一棵樹一樣大）、**排得很滿而且左右對稱**（像折著布畫）、**每一個形都是線做的**（長長的緞面針，光從不同方向來，同一罐線就有亮有暗）。

做成網頁時，最容易失敗的是把它當成「彩色扁平插畫」：平塗色塊＋可愛動物，看起來就是兒童繪本或 Memphis。真正讓人一眼認出 tenango 的是**針**——所以本規格要求所有插圖都由平行短線段組成，而且亮暗由針向決定。第二個失敗是只做花不做動物：沒有雞、狗、兔、鳥就是一般墨西哥花繡。

網頁的版面本身則要退讓：布是主角，頁面是放布的桌子。頁面鬆、布上滿；分隔只用平針布邊；字也像繡上去的條紋。

## 二、本風格的 5 個不可省略特徵

### 特徵 1：扁平側身剪影＋布眼（形狀語彙）

動物一律側身、面向畫面中軸；腿是兩根細條、尾巴高高翹起、身體是一個大橢圓或多邊形，眼睛與身上的花紋是**沒繡的小圓洞（布眼）**，露出底布。沒有透視、沒有輪廓線、比例不照真實（兔子可以比雞大）。拿掉它：變成寫實動物刺繡或抽象紋樣。

```js
// 一隻雞＝9 個多邊形部件；a＝針向（度）、h＝布眼洞
hen:[{p:[[20,45],[30,38],[50,36],[66,40],[74,48],[72,62],[60,72],[40,74],[26,68],[18,56]],a:8},   // 身體：近水平針
 {p:[[22,48],[8,22],[13,17],[21,27],[20,9],[28,11],[30,29],[33,13],[39,17],[35,40]],a:72},        // 翹尾：近垂直針
 {p:[[62,42],[66,26],[72,18],[80,17],[85,22],[84,30],[78,34],[74,46]],a:100,h:[E(78,23,2.2,2.2)]}, // 頭＋布眼
 /* 冠、喙、肉垂、翅（a:20＋布眼）、兩條腿（a:90） */]
```

### 特徵 2：緞面長針＋針向分區＋異向光澤（質材／裝飾母題）

每一個形只由**平行的長針**組成：同一部件同一針向，不同部件換針向（身體橫、尾巴直、翅膀斜）。超過約 13px 的長針錯縫切段（相鄰列錯開半段）。針與針之間留 0.15 針寬露出布。亮暗**只**由針向與光向決定：光沿著針的法向來時最亮，沿著針走時暗。零平塗、零漸層、零描邊。拿掉它：就是平塗插畫。

```js
// Kajiya–Kay 式：T＝針向單位向量，L＝光，H＝(L+V)/|L+V|
spec = Math.pow(1 - (T·H)², 14);  diff = Math.sqrt(1 - (T·L)²);
// 每段針畫三道：暗底線（lw）、受光線（lw×.62，亮度 .7+.38·diff）、高光細線（lw×.24，白 α .08+.62·spec，往光的法向偏 .18lw）
```
```css
/* 純 CSS 的緞面填色（色票方塊、長條圖、按鈕底） */
.satin{background:repeating-linear-gradient(70deg,var(--c) 0 2px,color-mix(in srgb,var(--c) 70%,#000) 2px 3px)}
```

### 特徵 3：粗黑字以斜向細針條紋填色（字體選擇）

標題用最粗的黑體（Noto Sans TC 900；拉丁與數字 Rubik 800），字身以 `background-clip:text` 填入「色帶＋118° 細暗線」，像一個字被緞面針繡進布裡；字不描邊、不加陰影。多色標題的色帶依序為洋紅→橘→葉綠→鈷藍（不放玉米黃，對比不足）；單色標題只用一罐線。內文是一般黑體，墨色 #1F1A16。拿掉它：網站變回普通的電商。

```css
.st{font-weight:900;color:#1F1A16}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
 .st{background:repeating-linear-gradient(118deg,transparent 0 2px,rgba(20,10,5,.26) 2px 3px),
   linear-gradient(180deg,#D3245F 0 26%,#EE7A1B 26% 52%,#2B8F47 52% 76%,#2A47A6 76%);
   -webkit-background-clip:text;background-clip:text;color:transparent}
 .st.m{background:repeating-linear-gradient(118deg,transparent 0 2px,rgba(20,10,5,.28) 2px 3px),linear-gradient(var(--c),var(--c));-webkit-background-clip:text;background-clip:text}}
```

### 特徵 4：中軸鏡像對稱的滿布構圖（版面手法）

一塊布永遠有中軸：中軸上放生命樹、大花或蛋；兩側成對、互相面向中軸；空隙以小四瓣花與圓點填滿，不留大空白。只排左半，右半以 `x' = W − x − w`、針向 `a' = 180° − a` 鏡像——鏡像的針向不同，所以同一光下左右一亮一暗，這是 tenango 在真實光線下最迷人的地方。

```js
TN.mirror=function(left,center,W){var r=center.slice();left.forEach(function(it){r.push(it);
 var m=Object.assign({},it);m.f=!it.f;m.x=W-it.x-100*it.s;r.push(m);});return r;};
```

### 特徵 5：白 manta 布＋「單色或條紋」的色彩規則＋鉛筆稿（色彩規則）

底永遠是 manta 白棉布 #F3EEE2，帶 2px 平紋織點。一塊布只能二選一：**整塊單色**（只用一罐線，靠針向分出部位），或**條紋多色**（每個形依高度橫切成 4 段，各段取一罐飽和線，依序輪替；成對的兩隻顏色相同）。顏色從不寫實。還沒繡的地方露出 dibujante 的**藍色鉛筆稿** #4A66B4。拿掉它：變成任意多彩插畫。

```js
key = it.c==='stripe' ? STRIPE[((it.o + band) % 6 + 6) % 6] : it.c;   // band＝floor((y−top)/(高/4))
```
```css
body{background:#F3EEE2;background-image:linear-gradient(90deg,rgba(120,100,70,.05) 1px,transparent 1px),linear-gradient(rgba(120,100,70,.05) 1px,transparent 1px);background-size:3px 3px}
.pencil{color:#4A66B4}
```

## 三、色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| manta 白棉布 | `#F3EEE2` | 全站底、布底、吊牌底 | ≈ 72% |
| 線黑 | `#1F1A16` | 內文、吊牌框、按鈕 | ≈ 10% |
| 洋紅 | `#D3245F` | 繡線、主強調、價格 | 3–5% |
| 橘 | `#EE7A1B` | 繡線、布邊 | 2–4% |
| 玉米黃 | `#EDBE2C` | 繡線、按鈕下緣平針（不做字色） | 2–3% |
| 葉綠 | `#2B8F47` | 繡線、營業狀態 | 2–4% |
| 藍綠 | `#169CA0` | 繡線 | 1–3% |
| 鈷藍 | `#2A47A6` | 繡線、單色布、焦點框 | 2–4% |
| 鉛筆藍 | `#4A66B4` | 未繡的稿線、旁註、kicker 前的虛線 | ≤ 2% |
| 次要字 | `#5A5047` | 小字、表頭 | — |

規則：底永遠是淺布色，**不用深底**（黑底 tenango 存在，但本規格的網頁版本固定白布，深底留給布本身的變體）。零漸層（條紋色帶是硬停點）、零模糊陰影、零發光。

## 四、字體系統

- Noto Sans TC 400／700／900（Google Fonts）；Rubik 500／800 給拉丁、價格與數字。
- 字級：h1 `clamp(44px,7vw,92px)`；h2 `clamp(30px,4.6vw,56px)`；h3 20px／900；內文 16px／1.75；大段 17.5–18px；小字 13–14px。
- 標題只用 900，套 `.st`（特徵 3）；kicker 13px、letter-spacing .14em、前面一段 26px 鉛筆藍虛線。
- 價格一律 Rubik 800、千分位、`NT$` 前綴。

## 五、版面與網格

- 左側固定 96px 線束導覽（≤560px 落為底部 74px 橫列）；內容區 `.sec` 左右 `clamp(20px,5vw,72px)`、上下 `clamp(40px,7vw,96px)`。
- 首屏是一整塊布（canvas，比例 1000:600），布標（店名吊牌）以 `margin-top:-36px` 壓在布的右下並旋轉 −0.6°。
- 不對稱：吊牌與價籤交錯 `translateY(34px)` 與 ±1.2° 旋轉；時間線用 6 欄格網錯落；卡片第 2 欄下沉 28px。
- 分隔只用**平針布邊** `.hem`：3px 高、14px 線＋8px 空，顏色每段換一罐線。
- 留白規則：布上滿、布外鬆——布的四周至少一個 `.sec` 的 padding，布內空隙用小花填。

## 六、元件配方

- **導覽（線束）**：每頁一綹 54×76 的線束 SVG（兩個葉形、中間黑色束帶、填 78° 緞紋 pattern），標籤在下。hover 擺動 −9°（`cubic-bezier(.3,1.6,.5,1)`）；現用頁那綹垂下一條線（`stroke-dashoffset` 60→0，1s）＋標籤底線同色。
- **按鈕**：線黑實心、manta 字、底部 6px 內縮一條玉米黃平針；ghost 版為 2px 內框＋洋紅平針。無圓角。
- **吊牌（卡片）**：manta 底、2px 線黑框、內縮 6px 的 2px 虛線（`--c` 一罐線）＝縫在布上的布標。
- **表格**：表頭 3px 線黑底線，列與列之間 2px 虛線。
- **表單**：2px 線黑框輸入框、`accent-color` 用鈷藍；必填只寫一個。
- **長條圖**：每段填緞紋（特徵 2 CSS），段與段之間 2px manta 縫。
- **footer**：四欄 auto-fit，小標 13px 次要字色，頁尾上方一條平針布邊。

## 七、動效規則（四種，缺一不可）

| 類型 | 本站實作（自製） | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 三隻繡出來的雞沿布邊走、每 1.6s 啄一下；無輸入 2.5s 後太陽自己繞布慢走（光向 +0.0045 rad／幀） | 無 | 走 40–52s `steps(92)`、啄 `steps(2)` | 雞停在 18%／52%／78%，太陽不走 |
| input 輸入 | 游標／手指／手機傾角＝光向，所有針即時重算亮暗；線束 hover 擺動 | pointermove、touchmove、deviceorientation | <16ms（光變化 >0.004 rad 才重畫） | 照常（使用者自己在動） |
| transition 轉場 | 換頁一塊 manta 布由上蓋下（底部一條洋紅平針），新頁由下往上掀開；每塊布進場**從藍色鉛筆稿一針一針繡起** | 點站內連結／載入 | 蓋布 420ms、掀布 520ms `cubic-bezier(.6,0,.2,1)`；繡起 1.6–2.6s 線性依針序 | 不蓋布、布直接是繡好的 |
| signature 簽名 | **轉光看布**：同一罐線，左右鏡像的動物因針向相反而一亮一暗，光一動整塊布像緞面一樣流光 | 光向 | 見上 | 停在固定光向 az=−2.3 |

自我限制：不用淡入、不用跑馬燈、不用視差。

### motion-library 元件（PLAYBOOK §2.8）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| BG-A-17 | Flow Lines | index | colors {primary #D3245F, secondary #2A47A6, bg #F3EEE2}、duration 9、density .8、intensity .9、seed 1977、16:9 | 〈布的背面〉的背景：沿流場游動的短線像翻過來的布背面那些過線；純線段、無發光、無圓角，色只用兩罐線。ambient |
| TXT-A-10 | Follow Path | index | text「一條線繡到底」、colors {#2A47A6, #EE7A1B, #F3EEE2}、duration 2.4、loop:false、seed 5、16:9（容器裁成 110–180px 高條） | 字沿著一條鈷藍虛線（跑針）滑進來再拉直，正是「一條線」；字色由亮底自動取近黑。transition（一次性） |
| TXT-B-19 | Text Flag | bu | text「今天的蛋，自己的布」、colors {#D3245F, #EE7A1B, #F3EEE2}、duration 2.6、loop:false、seed 12、16:9（裁成 120–200px） | 標題像晾在竹竿上的布巾飄一下再停；只有逐字位移與旋轉，不加任何形狀。transition（一次性） |
| BG-A-07 | Random Pop Dots | bu | colors {#EDBE2C, #D3245F, #F3EEE2}、duration 6、density .7、intensity .8、seed 640、16:9 | 下單區背景：圓點彈出縮回，像撒在埕上的飼料，也是 tenango 空隙裡的填點；平塗圓點、無陰影。ambient |
| TXT-B-43 | Embroidery Stitch Title | lang | text「一針一針」、colors {#2A47A6, #D3245F, #F3EEE2}、duration 4.5、loop:false、seed 7、1:1 | 在繡框裡以緞面針逐字繡出、針向異向光澤——與本流派的針法同源；繡框與框外布影是元件自帶的寫實物件，只放在講「工序」的段落，不放在布上。transition（一次性） |

掛載：`TN.ml(el, opts)`——等 `document.fonts.ready`；IntersectionObserver 離屏 `destroy()`、回到視窗重掛；一次性文字播一次後重掛直接 `seek(1)`；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`；canvas `aria-hidden`，原 HTML 標題留在 `.ml-fb`，掛載成功才視覺隱藏。開發 Prompt 見 `MotionLib.prompt(id)`。同一畫面同時運轉 ≤2 個。

## 八、插畫與圖像風格

- 全站零圖檔。所有插圖＝同一支緞面繡引擎（`TN.build`＋`TN.draw`）的輸出：形庫 10 種（hen 雞、dog 狗、rabbit 兔、bird 鳥、egret 白鷺、lily 金針花、flower 四瓣花、egg 蛋、dot 填點、tree 生命樹），每種 100×100 局部座標、面向右。
- 產針：沿針向的法向每 2.3px 一條掃描線，與多邊形（含布眼洞）求交、偶奇配對、端點各內縮 0.15 針寬；長度超過 13px 切段、奇數列錯開半段。
- 鉛筆稿：每個部件的多邊形以 0.9px 鉛筆藍描一次，繡完後仍以 40% 透明度留在針縫裡。
- 小圖示（導覽線束、logo、色票）用 SVG `<pattern>` 旋轉條紋模擬同一種針。

## 九、Logo 與 Favicon

- Logo：manta 方塊上一隻洋紅緞紋雞（引擎同一組多邊形，每部件依針向填旋轉條紋 pattern），眼睛是布眼；下緣一條鈷藍平針。
- Favicon：inline SVG data URI，manta 底＋實心洋紅雞剪影＋白色布眼。

## 十、Do & Don't

**Do**：每個形都用針；成對面向中軸；空隙填小花；一塊布單色或條紋二選一；讓鉛筆稿露出來；把錢怎麼分給繡的人寫清楚。
**Don't**：平塗色塊、漸層、陰影、描邊；正面或透視的動物；把動物排成網格或隨機散落；一塊布同時有單色與條紋；深色網頁底；紫藍漸層、置中三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章；把 tenango 當成「墨西哥風」大雜燴（papel picado、骷髏、仙人掌一起上）。尊重來源：寫出 Tenango de Doria／San Nicolás／Hñähñu，不要只寫「墨西哥刺繡」。

## 十一、頁面骨架範例

```html
<nav class="rail" aria-label="主要導覽">
 <a class="sk" href="index.html" aria-current="page" style="--c:#D3245F"><svg viewBox="0 0 54 94">…線束…<path class="thr" d="M31 72C42 78 20 84 32 93"/></svg><b>埕前</b></a>
</nav>
<main class="wrap">
 <section class="hero">
  <canvas class="cloth" id="cloth" aria-hidden="true"></canvas>
  <div class="cloth-fb" role="img" aria-label="一塊 tenango 桌布：中軸生命樹，左右成對的雞、狗、兔、鳥">…</div>
  <div class="label"><div class="lab-tag"><h1><span class="st">店名</span></h1><p data-status></p></div></div>
 </section>
 <div class="hem" style="--c:var(--co)"></div>
 <section class="sec">…</section>
</main>
<script>
var items=TN.mirror([{m:'hen',x:180,y:330,s:1.85,c:'stripe',o:1}, …],[{m:'tree',x:330,y:10,s:3.4,c:'stripe',o:0}],1000);
TN.cloth(document.getElementById('cloth'),items,1000,600,{sp:2.3,L:13,dur:2200});
</script>
```

## 十二、技術實作與相容性

### 1. Canvas 2D＋Path2D 緞面針掃描與分桶——承載特徵 1、2、4、5 與 signature（A 渲染層）
- 每個部件依針向做掃描線求交產生線段；同一「線色 × 針向（以 5° 分桶）」的線段合成一個 `Path2D`，每幀只做 `stroke(Path2D)` 三道（暗底／受光／高光），不重建路徑。
- 查證：MDN〈Path2D〉為 Baseline Widely available（2016 起各瀏覽器可用）；`createPattern` 平紋底與 `lineCap:'round'` 皆為 Canvas 2D 基本能力。
- fallback：無 `getContext('2d')` 或無 `Path2D` 時不畫 canvas，`html.noj` 顯示 `.cloth-fb` 文字說明（布上有哪些居民）；`<noscript>` 同。
- 實測（node＋@napi-rs/canvas，1400×840）：全布 4,487 段針、102 桶，建置 13ms、單次重畫約 2ms；只在光向變化 >0.004 rad 時重畫，離屏（IntersectionObserver）停止 rAF。

### 2. DeviceOrientation／Pointer／Touch 光源——承載 input 與 signature（D 輸入與感測層）
- 桌機：`pointermove` 的位置相對視窗中心決定方位角與仰角；手機：在布上滑動即改光向；按「傾斜手機轉光」才請求傾角。
- 查證：MDN〈DeviceOrientationEvent〉為 Baseline Widely available，但僅限安全環境（HTTPS）；`DeviceOrientationEvent.requestPermission()` 為實驗性、非 Baseline（iOS 13+ 需要、必須在使用者手勢內呼叫）；caniuse〈DeviceOrientation & DeviceMotion events〉：Chrome、Firefox 部分支援（缺 `compassneedscalibration`），桌機 Safari 不支援、iOS Safari 部分支援。
- fallback：沒有 `requestPermission` 則直接掛事件；拒絕或不支援時按鈕改寫為「請用手指在布上滑」，觸控照常改光向。

### 3. URLSearchParams＋history.replaceState 狀態序列化——承載 func（E 資料與生成層）
- 〈排一塊布〉的 7 格母題＋模式＋線色序列化成 10 字元 `?c=blhrdtgsco`，每次修改 `replaceState`；「複製這塊布的網址」用 `navigator.clipboard`，失敗則顯示整串讓人手動複製。
- 查證：MDN〈URLSearchParams〉Baseline Widely available（2018-04 起）；`history.replaceState` 為 HTML Living Standard 歷史 API，各瀏覽器長期支援。
- fallback：解析失敗的參數逐格忽略、回到預設布。

### CSS `background-clip:text`（特徵 3）
- MDN〈background-clip〉屬性為 Baseline Widely available（2015-07），但 `text` 值仍有 `-webkit-` 前綴使用；本站兩者並寫並包在 `@supports` 內，不支援時字為線黑實色。

### 效能預算實測
- 單頁：index 約 190KB、bu 約 187KB、lang 約 189KB（含 inline motion-library 子集約 150KB）＜ 350KB。
- 首屏 JS：子集解析＋布建置＜100ms（建置 13ms）；動畫 60fps（重畫約 2ms／幀）；同畫面運轉元件 ≤2。
