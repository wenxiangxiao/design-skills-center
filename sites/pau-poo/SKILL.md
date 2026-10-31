---
name: dutch-wax-print-named-cloth
description: Dutch wax print (Real Dutch Wax / Ankara, as named and worn in West Africa) for the web — resin crackle veins with indigo bleed, deliberately misregistered colour blocks and hand-pushed blotches, oversized half-drop motifs with heavy indigo key lines, condensed caps selvedge printing and white paper stickers, and every pattern carrying a proverb-like name.
---

# 荷蘭蠟印布 Dutch Wax Print・西非布名

> 範例站：`sites/pau-poo`（阿瑪包布，臺北永樂市場二樓的蠟印布包禮攤）。型錄「在地與文化視覺」2026-10-31 新增條目，全館第 1 站。本規格書不綁產業：任何「替人說一句話」的品牌都適用——送禮、花店、喜餅、卡片、音樂祭周邊、咖啡豆、童裝、社區市集。

## 1. 設計哲學

蠟印布是工業品冒充手工品、再被另一個大陸改寫成自己語言的布。1846 年 P.F. van Vlissingen & Co.（今 Vlisco）在荷蘭 Helmond 設廠，哈倫的 Prévinaire 等廠用機器仿爪哇蠟染：布兩面以銅滾筒上樹脂（早期是蠟）、進靛缸、樹脂乾了一揉就裂、靛從裂縫滲進去，再用木版或滾筒補上其他顏色——永遠對不準。仿品在印尼賣不動，1893–95 年蘇格蘭商人 Ebenezer Brown Fleming 把它帶進黃金海岸，照當地客人的喜好改圖；布商、市場阿姨和客人開始替每一款取名字（諺語、時事、玩笑話），1960–80 年代洛美大市場的 Nana Benz 靠它發家。

所以這個風格的三個靈魂是：**看得見的工序瑕疵**（裂紋與錯版就是真品證明）、**大聲的平面母題**（遠看也認得出那隻鳥、那串珠）、**名字**（布是一句話）。網站要做的是讓這三件事都被看見、被摸到、被叫出名字。

## 2. 本風格的 5 個不可省略特徵

### ① 樹脂裂紋＋靛滲（裝飾母題）

細而不規則、會分岔、碰到另一條就停的靛色脈，沿脈有小氣泡斑；脈先以 0.5 不透明度出現，再慢慢加粗加深（靛滲進去）。**拿掉它就是普通印花布。** 裂紋要蓋過所有顏色，不只在白地上。

```js
// 一條裂紋：每步 0.0055 布寬、轉角 ±0.275 rad、3.5% 機率分岔，走進別條裂紋佔用的格子就停
function grow(x,y,a){for(let k=0;k<90;k++){a+=(R()-.5)*.55;x+=Math.cos(a)*.0055;y+=Math.sin(a)*.0055;
  const c=cell(x,y);if(occ[c]&&occ[c]!==id&&k>2)break;occ[c]=id;pts.push(x,y);if(R()<.035)grow(x,y,a+1.2);}}
ctx.strokeStyle='#1B2160';ctx.globalAlpha=.5+.4*bleed;ctx.lineWidth=W*.0012*(1+bleed*.9);
```
```svg
<!-- 靜態備援：一組手畫裂紋 -->
<path d="M42 30l20 14 6 22 24 8M100 20l-8 26 18 18 30 4M68 66l-10 30" fill="none" stroke="#1B2160" stroke-width="1.6"/>
<circle cx="92" cy="74" r="3" fill="#1B2160"/>
```

### ② 色不對線＋手推色塊（色彩規則）

靛版先定位，其他每個色版**各自往不同方向錯位**（單元寬的 3%），色塊溢出輪廓、輪廓旁露出白縫；另有一團一團**跟圖案無關**的不規則色塊（blotch）。每個配色只能是 **靛＋兩色＋白地**。對準了就是假貨。

```js
// 三層：色版一 (+r,+.6r)、色版二 (-.7r,+r)、靛版 (0,0)；r = u*.03
[['a',cw[0],r,r*.6],['b',cw[1],-r*.7,r],['k','#1B2160',0,0]].forEach(([L,col,dx,dy])=>{
  ctx.fillStyle=ctx.strokeStyle=col; for(cell of cells){ctx.setTransform(1,0,0,1,cx+dx,cy+dy); if(L==='b')blob(); motif(L);} });
```
```css
/* UI 也錯版：按鈕的影子是色版，不是陰影 */
.btn{border:3px solid #1B2160;background:#fff;box-shadow:3px 3px 0 #F07C12}
.sign h1{color:#1B2160;text-shadow:3px 3px 0 #F07C12}
```

### ③ 大母題・粗靛線・half-drop（形狀語彙）

母題是**實心剪影＋粗靛輪廓**（線寬 ≥ 單元 3–5%），一個單元占視窗短邊 40% 左右；下一欄往下錯半格（half-drop）。白地上補靛點、細斜線或波線當地紋，白地不超過 55%。母題語彙：橢圓框裡的鳥、成串腰珠、八瓣花、腳印、扇／電扇、貝殼、唱盤、米粒——都是日常物，畫成「印章能刻出來」的形。

```js
for(let i=-1;i<cols;i++)for(let j=-1;j<rows;j++)
  ctx.setTransform(1,0,0,1, i*u+u/2, j*u+u/2+(i&1?u/2:0));   // half-drop
```

### ④ 布邊印字＋白紙標（字體與版面資訊）

資訊只寫在兩個地方：**布邊**（窄長大寫、字距 .08–.1em、靛色商標格與色版方塊交錯重複）與**白紙標**（白紙、靛 2px 框＋內縮 6px 細框、上排花號與碼數、下面中文花名）。字體：`Archivo` 寬度軸 62、800–900 字重做布邊與數字；`Noto Sans TC` 900 做花名與標題。

```css
.selv{display:flex;height:30px;white-space:nowrap;overflow:hidden;border-top:3px solid #1B2160;border-bottom:1px solid #1B2160;
 font:800 12px/1 "Archivo";font-variation-settings:"wdth" 62;letter-spacing:.1em;text-transform:uppercase}
.selv b{background:#1B2160;color:#FAF6EC;padding:0 10px}       /* 商標格 */
.selv em{width:10px;height:10px;background:#F07C12}              /* 色版試印方塊 */
.stk{background:#fff;border:2px solid #1B2160;outline:1px solid #1B2160;outline-offset:-6px;padding:12px 16px;transform:rotate(-1.4deg)}
```
```html
<div class="selv"><b>AMA PAU-PÒO</b><i>GUARANTEED REAL WAX PRINT</i><em></em><i>NO. 2071-02</i><em class="e"></em><i>6 YARDS</i></div>
```

### ⑤ 有名字的布＋6 碼一摺（版面手法）

每一款圖樣都有一個**名字**，名字與圖一樣大聲（紙標、布邊、標題都寫它）。布以「6 碼一匹、摺成一塊、疊成塔」的形態出現：首頁可以是一座布塔（每塊左端有一層層布厚、右下有被風掀的布角），點一塊就攤成滿版布面。

```css
.fold{height:52px;border:2px solid #1B2160;border-bottom-width:4px;position:relative}
.fold .lip{position:absolute;left:0;top:0;bottom:0;width:16px;background:repeating-linear-gradient(180deg,#1B2160 0 2px,#FAF6EC 2px 5px)}
.tower{display:flex;flex-direction:column-reverse}   /* 由下往上疊 */
.tower li{transform:translateX(var(--x)) rotate(var(--r))}  /* ±1.4° 的歪 */
```

## 3. 色彩系統

| 角色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 白地 | `#FAF6EC` | 布地、頁面底 | 40–50% |
| 靛 key | `#1B2160` | 靛版輪廓、裂紋、所有文字、導覽、頁尾 | 25–35% |
| 橘 | `#F07C12` | 色版、按鈕錯版影子 | 8–12% |
| 綠 | `#13A08B` | 色版 | 5–8% |
| 紫褐 | `#7A2350` | 色版、標題副字 | 3–6% |
| 金黃 | `#F4B81C` | 色版 | 3–6% |
| 白紙 | `#FFFFFF` | 紙標、取件單 | 5% |
| 紙板 | `#C9A46A` | 手寫招牌、價目板 | ≤8% |

配色組（靛＋兩色）：A 橘＋金黃、B 綠＋橘、C 紫褐＋綠。一個畫面最多兩組。**禁止**中間調、透明疊色、漸層（唯一的半透明是裂紋生長中）。

## 4. 字體系統

- `Archivo`（Google Fonts，`wdth,wght@62..125,400..900`）：布邊、花號、價格。寬度 62、字重 800，大寫，字距 .08–.16em。
- `Noto Sans TC` 400／700／900：正文 16px/1.75；花名與標題 900，行高 1.15，字距 −.02em。
- 字級：h1 46–110px（clamp）、h2 30–50px、紙標花名 20–22px、布邊 12px、正文 15–17px。
- 數字一律 Archivo 窄體；中文永遠不用窄體。

## 5. 版面與網格

- 首屏 = **左窄（.6fr）布塔＋右寬（1.4fr）攤開的布**，中間 3px 靛線；手機改上下。
- 區塊以 3px 靛線框切，**不留圓角**；內頁交錯（偶數列左右對調、三段步驟上下錯 26px／−14px）。
- 傾斜只給紙製品：紙標 −1.4°～2°、招牌 −1.8°、布塔每塊 ±1.4°；布面與網格永遠是正的。
- 留白規則：布面滿版不留白；文字區左右 clamp(16px,4vw,64px)，段距 72px。

## 6. 元件配方

- **導覽（knot-bundle-nav）**：三個 58×52 的布包 SVG（各自 `<pattern>` 布紋），兩隻布耳＋靛結；現用頁那一包是**解開攤平的菱形布**，標籤反白。hover 布耳往外轉 22°。≤560px 移到底部三等分。
- **按鈕**：白底、3px 靛框、`box-shadow:3px 3px 0 橘`（色版錯位）；按下時位移 3px 影子歸零（對上版）。主要按鈕靛底白字＋金黃錯版。
- **卡片**：不用卡片，用白紙標（`.stk`）或紙板（`.sign`／`.board`）。
- **表單**：2px 靛框、白地底；radio 用 `accent-color:#1B2160`；fieldset 的 legend 用布邊字。
- **頁尾**：一條布邊＋靛底三欄，最後一行標虛構與建置模型。

## 7. 動效規則

| 種類 | 本站實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 布塔每塊右下的布角被電扇吹得掀（rotateX＋skewX）；攤開的布每 2.6 秒自己長出一條細裂紋 | 時間 | 2.6s ease-in-out infinite，延遲每塊 −0.37s | 布角靜止；裂紋一次全長好 |
| input | 布塔 hover 往外滑 10px（回彈 cubic-bezier(.3,1.5,.5,1)）；布包耳朵 hover 外轉；揉布時游標處一圈摺痕 0.5s；收禮人拖曳布結時兩耳即時跟著張開 | 指標／鍵盤 | <100ms 反應 | 位移保留、摺痕不畫 |
| transition | 跨頁 View Transition：舊頁 `clip-path:inset(0 0 0 100%)` 往右摺走 .42s，新頁 `inset(0 100% 0 0)→0` 攤開 .56s；同頁換布：紙標與布面 `startViewTransition`；布名簿換配色 WAAPI 攤布 .52s | 換頁／點選 | cubic-bezier(.6,0,.4,1)／(.2,.7,.2,1) | 全部關閉，直接換 |
| **signature** | **揉布生裂滲靛**：在布上來回揉（指標反折一次＋55 能量、移動距離×0.35），能量過 130 就在那裡爆出 3–6 條裂紋，0.016s／點生長，長完 1.4s 靛滲加粗、氣泡斑長大 | 指標反折 | 線性生長＋線性滲 | 裂紋瞬間長好 |

本站禁用：淡入當主打、跑馬燈、數字計數、視差。

### motion-library 元件表（`wenxiangxiao/motion-library` 1.26.0 @9ba51588）

以 `tools/ml-embed.js` 抽子集 inline 為每頁第一個 `<script>`；掛載包裝 `PP.ml`（字型就緒才掛、離屏 destroy、一次性元件只播一次、canvas `aria-hidden`、原 HTML 標題留在 `.ml-fb`、reduced-motion 背景 `seek(.35)`／文字 `seek(1)`）。出處：`MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-19 | Text Flag | index | text「會講話的布」、primary `#1B2160`、secondary `#F07C12`、bg `#FAF6EC`、duration 3.2、loop false、seed 5 | transition（進場一次） | 字像一塊布被風吹過一次再攤平——布會講話；白地 bg 讓字色自動落在近黑 |
| BG-B-25 | Circle Pop | index | primary `#F07C12`、secondary `#13A08B`、bg `#1B2160`、duration 6、density 1.3、intensity .9、seed 2071 | ambient | 靛地上一顆顆冒出的實心圓＝蠟印布的點地與氣泡；平塗零發光，合特徵② |
| SHP-13 | Fold Unfold | bao | primary `#1B2160`、secondary `#F07C12`、bg `#FAF6EC`、duration 1.5、loop false、1:1、seed 6 | transition | 包起來時四片摺起、收禮人解開時攤開——6 碼一摺的動作本身 |
| TXT-A-03 | Stamp In | mia | text「布名簿」、primary `#7A2350`、bg `#FAF6EC`、duration 1.4、loop false、seed 12 | transition（進場一次） | 布商在布頭蓋章；蓋下的框線與錯位抖動像布邊印字 |
| BG-B-32 | Pinwheels | mia | primary `#13A08B`、secondary `#F07C12`、bg `#FAF6EC`、duration 5、density 1.4、seed 5 | ambient | 掛在〈永樂市場的電扇〉那一匹下面：三角扇葉＝實心剪影母題，零圓角零漸層 |

## 8. 插畫與圖像風格（roller-wax-repeat-kit 滾筒蠟印重複組件）

全站零圖檔。所有布面由同一支 `WAX.base()` 畫：白地 → 色版一（+r）→ 色版二（−r，含 blotch）→ 靛版（粗輪廓、實心剪影、地紋點線），每格 half-drop；再疊裂紋網。母題是一個函式 `f(ctx,u,layer,rng)`，分三層各畫各的，所以錯版是結構性的。新增母題時：先畫靛版（輪廓＋一兩塊實心），色版用**比輪廓略小或略大**的同形，再補一處不跟輪廓的色。

## 9. Logo 與 Favicon

Logo：一個打好兩耳結的布包——橘色身體與黃色布耳各往右下錯 1.5–2px，靛色輪廓與結；布面一個靛橢圓（鳥框）與三道細裂紋；頂上一條靛布邊。Favicon 同形 32px 版，只留身體、兩耳、結。

## 10. Do & Don't

- Do：讓裂紋蓋過所有顏色；讓每個色版都錯位；把名字寫得跟圖一樣大；資訊放在布邊和紙標。
- Do：在文案裡寫出布名的來源與「各地說法不一」，不要假裝一個布名只有一種意思。
- Don't：漸層、柔影、圓角卡片、玻璃擬態；把裂紋做成乾淨的 Voronoi 網（要有分岔與停頓）。
- Don't：用真實品牌的商標或布邊字樣（Vlisco、GTP、ABC Wax 等），布邊寫自己的店名。
- Don't：把「非洲」當成一種花色——母題要有具體名字與來歷；不要放部落面具、草裙等刻板符號。
- 去 AI 化：禁紫藍漸層、禁置中大標＋三卡片、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章。

## 11. 頁面骨架範例

```html
<header class="top"><a class="logo" href="index.html"><img src="assets/logo.svg" alt=""><span>店名<small>EN NAME · 地點</small></span></a>
 <nav><ul class="bund"><li><a href="index.html" aria-current="page"><svg>…布包…</svg><span>布攤</span></a></li>…</ul></nav></header>
<section class="stall">
 <div class="tw"><div class="sign"><h1>店名</h1><p>一句話</p></div><ol class="tower">…8 個 .fold…</ol></div>
 <figure class="bolt"><div class="cvw"><canvas id="hero"></canvas>
   <div class="stk"><div class="no"><span>NO. 2071-01</span><span>6 YARDS</span></div><h3>布名</h3><p>意思</p></div></div>
  <div class="selv"><b>STORE</b><i>GUARANTEED REAL WAX PRINT</i><em></em><i>地址・時間</i></div></figure>
</section>
<script id="wax-src">/* WAX 引擎（同一份文字也拿去開 Worker） */</script>
```

## 12. 技術實作與相容性

### 12.1 所用 API 與查證

| 技術 | 層 | 承載 | 支援現況（查證來源） |
|---|---|---|---|
| OffscreenCanvas＋`transferControlToOffscreen()`＋Blob Worker | A 渲染 | 攤開的布（底版快取、乾裂紋層、生長中裂紋）全在 Worker 畫，主執行緒只送揉布座標 | MDN〈OffscreenCanvas〉、〈HTMLCanvasElement.transferControlToOffscreen()〉：Baseline，2023-03 起跨瀏覽器可用；MDN〈OffscreenCanvas.getContext()〉在 Worker 可用 |
| View Transitions：跨文件 `@view-transition{navigation:auto}`＋同文件 `document.startViewTransition()` | B 動效 | 換頁摺走／攤開；同頁換布的紙標與布面 | MDN〈@view-transition〉：Limited availability——Chrome／Edge 126、Safari 18.2 起；Firefox 未支援（MDN browser-compat-data 無 version_added；caniuse 列至 155 未支援） |
| 程序化圖樣生成（half-drop 母題＋三版錯位＋佔用格裂紋網），決定性 xorshift／FNV-1a | E 資料生成 | 八種布、每份禮的裂紋（同座標＝同裂紋），取件碼 | 純 JS，無相容性問題；node 實測 8 種 800×450 各 300 格平均 1.3ms／格 |

### 12.2 Fallback 具體行為

- 沒有 `transferControlToOffscreen` 或 Worker：同一份 `WAX` 在主執行緒以 rAF 跑，畫面與互動完全相同。
- Worker 沒有 `requestAnimationFrame`：改用 `setTimeout(16ms)`。
- 沒有 View Transitions（Firefox）：換頁直接跳；同頁換布以 WAAPI `clip-path` 攤布；都沒有就直接換。
- 沒有 canvas：`.bolt` 以 CSS radial-gradient 畫出橢圓＋靛環＋靛點的靜態蠟印布；布塔顯示白地與紙標；所有布名、價目、地址都是 HTML 文字。
- 無 JS：`<noscript>` 說明；導覽、價目、地址、布名簿以外的八匹布清單需 JS 生成（標題、說明文字仍在）。
- `prefers-reduced-motion`：裂紋一次長好（含使用者揉出的）、View Transitions 關閉、布角不動、motion-library 背景停在 `seek(.35)`、文字停在最後一格。

### 12.3 效能

- 單頁大小：index 約 289KB、bao 約 291KB、mia 約 283KB（含 motion-library 子集約 235KB），皆 ≤350KB。
- 首屏主執行緒：大布在 Worker；布塔八塊小布樣在 `requestIdleCallback` 才畫；motion-library 等 `document.fonts.ready` 才掛。
- 裂紋渲染：長完的裂紋烘進「乾層」不再重畫，每格只畫生長中的；沒有生長中的裂紋就停止 rAF（Worker 也一樣），離開視窗即暫停。
- 同一畫面同時運轉的 motion-library 元件 ≤2。
