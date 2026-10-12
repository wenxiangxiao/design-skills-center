---
name: die-bruecke-expressionist-woodcut
description: German Expressionist woodcut in the manner of Die Brücke (Dresden/Berlin 1905–1913) and Munch's jigsaw colour woodcuts — black-heavy key blocks gouged into white tapered knife strokes, plank grain printing through every flat colour, sawn colour-block pieces separated by white kerf lines, angular cut lettering, unnatural acid colours, and elongated figures crammed edge to edge inside a ragged block border.
---

# 表現主義木刻・橋社 Die Brücke Expressionist Woodcut

> 範例站：橋邊製材所 KIÔ-PINN（羅東貯木池邊・前棟鋸木、後棟用自己的邊材印版畫）。風格不綁產業——任何想要「粗、急、手做、帶情緒」的品牌都能用：精釀酒廠、獨立劇團、拳擊館、搖滾 live house、木工房、自然農場、書店、刺青店、登山社。

## 1. 設計哲學

1905 年 6 月 7 日，德勒斯登工業大學的四個建築系學生——Ernst Ludwig Kirchner、Erich Heckel、Karl Schmidt-Rottluff、Fritz Bleyl——成立「橋社」（Künstlergruppe Brücke），之後 Max Pechstein、Otto Mueller 加入，Emil Nolde 短暫參與；1911 年遷柏林，1913 年解散。他們把木刻從十九世紀的「複製版畫」拉回「原創媒材」，靠的是兩個源頭：中世紀德國木刻與非洲、大洋洲雕刻的粗獷刀法，以及孟克（Edvard Munch）1896 年起在巴黎發展的鋸拼套色法——一塊板用線鋸鋸開，每塊各上一色，拼回去一次印，木紋與鋸縫都留在紙上。

它長成這樣是因為**技術與經濟限制**：
- **刀只會走直線**。圓口刀與三角刀推出去的每一刀都是一個「尖頭—鼓腹—細尾」的楔形；曲線是很多短直刀的折線。所以畫面裡沒有平滑的曲線，只有折角。
- **刻掉的才是白**。黑是「沒刻的木面」，白是「刀挖走的木頭」——畫家是在黑裡挖出光，所以畫面以黑為主、白是刀痕。
- **便宜木板、手拓**。橋社用的是廉價松杉板，不是梨木或黃楊木端面；用湯匙或手掌在紙背拓，不用壓印機——所以木紋會印出來、墨色不均。孟克甚至用鋼刷刷板讓紋更明顯。
- **一塊板當多塊用**。鋸拼法省板又省套準：色塊之間永遠隔著一道鋸縫白線，而且色塊一定是可以鋸出來的形狀（大塊、凸、邊緣是折線）。
- **情緒先於寫實**。膚色可以是綠的、天可以是紫的；人物被拉長、被擠進畫框、空間是斜的。這是對學院派與印象派的反動。
- **自己發行**。橋社每年給「被動會員」（passive Mitglieder，付年費的支持者）寄一本原版畫夾（Jahresmappe，1906–1911）；1910 年 Galerie Arnold 展錄裡，Kirchner 把 68 位被動會員的名字直接刻進木版。文字也是刻出來的。

一句話：**黑裡挖出來的光、印得出來的木紋、鋸出來的色塊。**

## 2. 色彩系統

| 角色 | 色 | Hex | 比例 | 用途 |
|---|---|---|---|---|
| 主版墨 | 油墨黑 | `#15110E` | 40–55% | 主版、題頭帶、框、按鈕、表頭、頁尾（永遠不是純黑） |
| 紙 | 未漂白紙 | `#E8DEC5` | 20–30% | 底、刀痕露出的白、鋸縫 |
| 色版 1 | 酸綠 | `#97AD2B` | 6–12% | 山、膚色、次要按鈕 |
| 色版 2 | 朱橙 | `#E0521C` | 6–12% | 太陽、強調、hover、標記 |
| 色版 3 | 堇紫 | `#5B3B8C` | 5–10% | 天、陰影面、副標 |
| 色版 4 | 赭黃 | `#D6A21E` | 3–8% | 屋、題頭副字、年份 |
| 版木 | 柳杉 | `#B98552`（深 `#8A5A30`） | 導覽與「版」的畫面 | 只在表現「這是木頭」時用 |

**硬規則**：
- 零漸層、零陰影模糊、零透明疊色；唯一的「層次」是木紋（紙色細紋，透明度 0.3–0.6）。
- 一張圖最多黑＋三色版；色彩不寫實（天紫、山綠、人臉朱）。
- 色塊與色塊之間永遠有一道紙色鋸縫（2–3px）；套色故意錯位 1.5–2px（右上）。

## 3. 字體系統

- **拉丁標題**：Grenze Gotisch（Google Fonts，variable 100–900；用 800/900）——羅馬體與哥德體的混血，折角收筆最像刻出來的字。
- **拉丁內文**：Grenze 500/700，斜體 500 給學名。
- **中文**：Noto Serif TC 900（標題）、500/700（內文）。中文標題一律套 `filter:url(#knife)`（feTurbulence＋feDisplacementMap 3–4px）做出刀口抖動。
- 字級：h1 `clamp(44px,8.6vw,128px)`／行高 .98；h2 `clamp(30px,4.4vw,58px)`；h3 24px；內文 17px／1.75；註腳 13–15px。
- 標題字永遠是「挖出來的」——黑底紙色字（題頭帶、名冊）或紙底黑字但經刀口濾鏡；不得用細字重。
- 德文小標（`Holz & Druck`、`Passive Mitglieder`）是這個風格的血緣記號，一頁 2–4 處，不要整句翻譯腔。

## 4. 版面與網格

- **斜**：題頭帶 `rotate(-1.6deg)`；印張交錯 `-0.7deg／+0.8deg`；名冊 `-0.9deg`；小標籤 `-2deg～-3deg`。任何主要區塊都不是水平的。
- **擠**：圖像撐滿框、人物頂天立地；區塊之間用 18px 高的刀痕帶（gouge strip）隔，不用細線。
- **不對稱雙欄**：1.15fr／.85fr，第二欄往下錯 46–70px。
- **框是版的邊**：每張「印張」外框是 14px 黑框，內緣是鋸齒（border-image 9-slice），不是直線。
- **首頁鏡像開場**：版（反）與紙（正）並排；版低一點、往左歪，紙往右歪。
- 留白規則：紙色區不得連續超過一個螢幕高；黑區要在每一屏都出現。
- 手機 ≤760px：側欄轉為頂部木條；雙欄轉單欄；鏡像開場改上紙下版，版縮 78% 靠右。

## 5. 元件配方

```css
/* 導覽：木口烙印側欄（左側固定柳杉條，字是烙上去的；現在頁＝黑墨挖空） */
.rail{position:fixed;left:0;top:0;bottom:0;width:84px;background:#B98552 var(--grain);border-right:5px solid #15110E}
.rail a{writing-mode:vertical-rl;font:900 21px/1 "Noto Serif TC";letter-spacing:.32em;color:#2a1c10;
  text-shadow:0 1px 0 rgba(255,236,200,.45),0 -1px 0 rgba(60,30,10,.5)}
.rail a[aria-current]{background:#15110E;color:#E8DEC5;clip-path:polygon(4% 0,100% 4%,94% 100%,0 96%)}
/* 按鈕：黑墨歪矩形，hover 換朱橙並微轉 */
.btn{background:#15110E;color:#E8DEC5;font:900 18px/1 "Noto Serif TC";letter-spacing:.12em;padding:13px 20px 12px;border:0;
  clip-path:polygon(2% 0,100% 6%,98% 100%,0 92%)}
.btn:hover{background:#E0521C;color:#15110E;transform:translateY(-1px) rotate(-.6deg)}
/* 印張卡片：鋸齒黑框 */
.printed{border:14px solid #15110E;border-image:var(--frame) 30 round;background:#E8DEC5;padding:20px 24px}
/* 表列：滾筒上墨 */
.roll{position:relative;isolation:isolate}
.roll::before{content:"";position:absolute;inset:0;background:#15110E var(--grain);transform:scaleX(0);transform-origin:0 50%;transition:transform .16s cubic-bezier(.3,.7,.2,1);z-index:-1}
.roll:hover::before{transform:scaleX(1)}.roll:hover{color:#E8DEC5}
/* 表單：紙色欄位在黑卡上，focus 是朱橙外框 */
form.card{background:#15110E;color:#E8DEC5;clip-path:polygon(0 1.5%,100% 0,99% 100%,1% 98.5%)}
form.card input{background:#E8DEC5;border:0;clip-path:polygon(0 4%,100% 0,99.5% 100%,.5% 96%)}
/* 頁尾：黑底、上緣斜切 */
footer{background:#15110E;color:#E8DEC5;clip-path:polygon(0 4%,100% 0,100% 100%,0 100%)}
```

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類 | 本站做法 | 觸發 | 時間 | 降級 |
|---|---|---|---|---|
| ambient 環境 | 主版木刻裡的 SMIL：貯木池刀痕水紋以 48 單位週期無縫平移（7s linear）、三根原木各自上下浮 1.6–2.6（3.1–4.5s）、撐竿人輕晃、煙囪的煙三格逐格輪替（1.8s discrete） | 載入即跑 | 見左 | `svg.pauseAnimations()`＋`setCurrentTime(0)`：停在第一格，畫面完整 |
| input 輸入 | 首頁版↔紙鏡像游標：在版上任一點，紙上同一 y、鏡像 x 亮起標記（pointermove 同步，<16ms）；木料卡 hover／點擊＝滾筒把木面換成試拓（clip-path inset 0.18s）；表列滾筒上墨 0.16s | pointer／focus／click | ≤0.18s | 降級移除 transition，狀態仍切換 |
| transition 轉場 | 換頁＝把紙從版上撕起：跨文件 View Transitions，舊頁以左下角為軸 `rotate(-11deg) translate(-6%,-118%)` 揭走（0.58s cubic-bezier(.55,0,.35,1)）；印坊狀態切換（鋪紙）用同文件 VT，壓印台由上往下 clip 展開 0.34s。不支援 VT 的瀏覽器：新頁主體以斜切 clip-path 展開 0.42s | 導覽／狀態 | 見左 | 全部 `animation:none`，直接換頁 |
| signature 簽名 | **湯匙拓透→翻面揭印**：鋪紙後在紙背畫圈拓，只看得見透過紙背的**反像**（34% 墨色，拓到哪顯到哪）；翻面（WAAPI rotateY −180°，中途 translateZ 90px 抬起，0.98s）才看見正像，拓得淡的地方印出來就淡，六塊色版之間的鋸縫白線留在紙上 | 使用者 | 0.98s | 直接切到結果；拓印以「代拓」一次填滿 |

自我限制：本風格**禁用淡入**與任何 ease-in-out 的柔滑感；需要節奏時用逐格（`calcMode="discrete"`／`steps()`）。

## 7. 插畫與圖像風格（jigsaw-woodcut 鋸拼套色木刻）

1. **主版**是一張遮罩：白＝留下的木面（印黑）、黑＝刀挖掉（露出色版或紙）。所有圖都這樣做，不畫描邊。
2. **刀痕詞彙**只有三種：放射（太陽、光、爆炸）、平行斜線（山坡、牆、陰影面，左右兩半方向相反）、斷續橫刀（水、地面）。每一刀都是楔形 sliver，長 10–40、寬 1–3.5。
3. **人物**拉長（頭身比 1:9 以上）、折線輪廓、臉挖空露出色版；人物外圍挖一圈 8–9px 的暈（halo）讓它從黑裡跳出來。
4. **色版**：一張圖切成 4–7 塊大凸塊，接縫是刀口抖動的折線（振幅 4–5px，每 11px 一折），相鄰色塊不同色。
5. **木紋**：色塊與黑墨上都疊一層紙色細紋——扭曲後的等距年輪＋節疤推擠；方向依色塊（天與水橫紋、山斜紋、主版直紋）。
6. 題材：勞動者、自然中的人（湖、山、浴者）、城市街景、舞者、自畫像。避免裸體（若產業不合適）。

## 8. Logo 與 Favicon

- Logo＝一塊黑版挖出圖形：本站是「橋拱跨在原木木口上」，右上一顆朱橙太陽與放射刀痕、左上一個酸綠山形。外框是黑版的鋸齒邊。
- Favicon（64×64）：黑底、挖白的拱＋橋面、朱橙太陽——三個形狀以內，縮到 16px 仍辨識。
- 不得用圓角方塊、漸層、細線條；Logo 一律在紙色底上。

## 9. Do & Don't

**Do**：黑多白少；每一條邊都有刀口；木紋印進色塊；鋸縫白線；顏色不寫實；斜擺的區塊；刻出來的名冊與德文小標；手拓的不均。
**Don't**：平滑曲線與 SVG stroke 描邊插圖；漸層、毛玻璃、模糊陰影；圓角卡片；置中大標＋兩顆按鈕；emoji icon；紫藍漸層 hero；「EST. 19xx」徽章；細字重標題；純黑 `#000`；淡入動畫；把木刻當成「復古濾鏡」貼在照片上。

## 10. 本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是表現主義木刻。

### ① 楔形刀痕：黑裡挖出來的光（形狀語彙）
白不是畫上去的，是一刀一刀挖出來的楔形；曲線只能是短直刀的折線。

```js
// 一道圓口刀痕：入刀尖、腹部最寬偏前、收刀細尾
function sliver(x,y,ang,L,w){const dx=Math.cos(ang),dy=Math.sin(ang);
  return `M${x} ${y}L${x+dx*L*.38-dy*w} ${y+dy*L*.38+dx*w}L${x+dx*L} ${y+dy*L}L${x+dx*L*.46+dy*w*.45} ${y+dy*L*.46-dx*w*.45}Z`;}
// 放射：太陽／光
for(let i=0;i<30;i++){const a=i/30*Math.PI*2;let s=46;while(s<300){const L=14+Math.random()*34;d+=sliver(cx+Math.cos(a)*s,cy+Math.sin(a)*s,a,L,2.4);s+=L+8;}}
```
```html
<mask id="key"><rect width="360" height="480" fill="#000"/><path d="…天空…" fill="#fff"/><path d="…刀痕…" fill="#000"/></mask>
<rect width="360" height="480" fill="#15110E" mask="url(#key)"/>
```

### ② 印得出來的木紋（色彩規則／質材）
每塊平色與黑墨上都有紙色年輪細紋；這是孟克與橋社「便宜松板＋鋼刷＋手拓」的痕跡。

```js
// 平切板山形紋：扭曲後的等距年輪，th 以下的相位畫成紙色細紋
const off=fbm(x/38,y/170)*warp, r=((x+off*per*.9)/per)%1, a=r<.2?(1-r/.2):0;
// 輸出成 dataURL，當 SVG <pattern> 疊在色塊上（opacity .3–.6）
```
```html
<pattern id="gv" patternUnits="userSpaceOnUse" width="240" height="480"><image href="data:image/png;base64,…" width="240" height="480"/></pattern>
<path d="…色塊…" fill="#97AD2B"/><path d="…色塊…" fill="url(#gv)"/>
```

### ③ 鋸拼色版與鋸縫白線（版面手法）
色彩是 4–7 塊大凸塊，接縫是刀口折線，色塊之間永遠隔一道 2–3px 紙色白線，套色錯位 1.5–2px。

```html
<g transform="translate(1.7 -1.3)" style="mix-blend-mode:multiply">
  <path d="M0 0L158 0L… 0 218Z" fill="#5B3B8C" stroke="#E8DEC5" stroke-width="2.4" stroke-linejoin="bevel"/>
  <path d="M158 0L360 0L…Z"     fill="#E0521C" stroke="#E8DEC5" stroke-width="2.4" stroke-linejoin="bevel"/>
</g>
```

### ④ 刻出來的字：折角字體＋刀口濾鏡（字體選擇）
拉丁用 Grenze Gotisch 800/900，中文用 Noto Serif TC 900 加刀口抖動；標題多半是黑底挖紙色字。

```html
<svg width="0" height="0"><filter id="knife"><feTurbulence type="fractalNoise" baseFrequency=".55 .09" numOctaves="1" seed="7"/>
<feDisplacementMap in="SourceGraphic" scale="3.4" xChannelSelector="R" yChannelSelector="G"/></filter></svg>
<header style="background:#15110E;color:#E8DEC5;transform:rotate(-1.6deg);clip-path:polygon(0 6%,100% 0,99.4% 92%,.6% 100%)">
  <h1 style="font:900 clamp(44px,8.6vw,128px)/.98 'Noto Serif TC';filter:url(#knife)">橋邊製材所</h1>
  <div style="font:800 26px/1 'Grenze Gotisch';color:#D6A21E">KIÔ-PINN · Holz &amp; Druck</div></header>
```

### ⑤ 鋸齒版邊＋斜擠的構圖（裝飾母題）
每張圖與每張卡片外圍都是黑版的鋸齒邊；人物拉長、頂天立地，區塊整體斜擺。

```js
// 9-slice 鋸齒框：外方內鋸齒的 evenodd 路徑 → border-image
function frameURL(seed,t=14){const s=96;const inner=jagPoly([[t,t],[s-t,t],[s-t,s-t],[t,s-t]],seed,2.4,7);
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><path fill='#15110E' fill-rule='evenodd' d='M0 0H96V96H0Z${P(inner.reverse())}'/></svg>`)}")`;}
document.documentElement.style.setProperty("--frame",frameURL(7));
```
```css
.printed{border:14px solid #15110E;border-image:var(--frame) 30 round}
.tilt-l{transform:rotate(-.7deg)}.tilt-r{transform:rotate(.8deg)}
```

## 11. 頁面骨架範例

```html
<body>
<svg width="0" height="0"><filter id="knife">…</filter></svg>
<nav class="rail"><a class="mark" href="index.html">…logo…</a><a class="lb" href="index.html" aria-current="page">橋邊<small>KIÔ-PINN</small></a>…</nav>
<main>
  <header class="titleband"><h1 class="cut">店名</h1><div class="lat">LATIN · <b>Holz &amp; Druck</b></div></header>
  <section class="hero"><figure class="panel blockp">…版（鏡像）…</figure><figure class="panel proofp">…紙（正像）…</figure></section>
  <div class="strip"></div>
  <section class="two"><article class="printed tilt-l">…</article><article class="printed tilt-r">…</article></section>
  <section class="roster"><h2>名冊<span class="got">Passive Mitglieder</span></h2><ol><li>名字</li>…</ol></section>
</main>
<footer class="foot">…</footer>
</body>
```

## 12. 技術實作與相容性

### 12.1 自寫 value noise＋決定性刀痕生成（E 資料與生成層）——承載特徵①②③⑤
- 內容：xorshift32 偽隨機＋1024 格雜湊 value noise＋3 octave fBm，零依賴、node 與瀏覽器共用同一份程式。用途：(a) 刀口折線 `jag()`——每段 9–11px、垂直偏移 ±amp，不平滑；(b) 三種刀痕詞彙 `rays/hatch/waves`；(c) 鋸拼色版接縫以「邊」為 key 快取，相鄰兩塊共用同一條鋸縫；(d) 木紋貼圖（扭曲年輪＋節疤）；(e) 9-slice 鋸齒框與刀痕帶。
- 相容性：純 JS 數學＋Canvas 2D `createImageData/putImageData/toDataURL`（所有現行瀏覽器）。同 seed 同結果，所以首頁靜態備援（build 時以 node 產生的無木紋 SVG）與 JS 版構圖完全相同。
- Fallback：無 JS → 首頁顯示 build-time 靜態印張（無木紋、無動畫）；canvas 不可用 → `grain()` 回傳 null，色塊與黑墨無木紋，其餘照常。
- 效能實測（node 22＋@napi-rs/canvas 模擬，本機 sandbox）：首張渲染含 4 張木紋貼圖 54–69ms；之後每張 <10ms（貼圖快取）；單張木紋貼圖（res .6，144×288）約 15ms。貼圖以 res 0.6 生成、顯示時放大，為達首屏 JS ≤100ms 的妥協。木料頁 12 張貼圖分 6 幀生成，不阻塞首屏。

### 12.2 View Transitions API（B 動效與時間軸層）——承載「把紙從版上撕起」轉場
- 跨文件：`@view-transition{navigation:auto}`＋`::view-transition-old(root)` 自訂 keyframes。查證：caniuse〈CSS at-rule: @view-transition〉——Chrome／Edge 126+、Safari 18.2+、Opera 112+、Samsung 28+；**Firefox 全版本未支援**；MDN 標示 not Baseline。
- 同文件：`document.startViewTransition()`（印坊「鋪紙」「洗版」），`view-transition-name:pressbed`。查證：caniuse〈ViewTransition API〉——Chrome／Edge 111+、Safari 18.0+、**Firefox 144+**。
- 偵測與 fallback：`"onpagereveal" in window` 為假（無跨文件 VT）時加 `.novt`，新頁 `main` 以 clip-path 斜切展開 0.42s；同文件 VT 不存在時直接改 DOM。reduced-motion 時一律不跑 VT。
- 側欄 `view-transition-name:rail`：換頁時木條不動，只有紙被撕走。

### 12.3 拖曳與物理拋擲（D 輸入與感測層）——承載〈拼一塊〉
- Pointer Events＋`setPointerCapture`，SVG 座標以 `getScreenCTM().inverse()` 換算；放手速度＝最後一段位移／時間×16（每幀單位），之後以摩擦 0.88／幀滑行、碰邊反彈 −0.5；進入目標 34 單位內改由彈簧（k=.22、阻尼 .62）吸入並轉正，就位時鋸縫線條閃一下（WAAPI 180ms）。
- 拓印：`getCoalescedEvents()`（Chromium 與 Firefox 已長期支援；Safari 依版本而異，未查到可靠版本號，故以特性偵測使用、不支援時退回單一事件）讓快速畫圈也不斷線。反像用 `Image`＋Blob URL 載入鏡像 SVG，以圓形 clip 逐筆 `drawImage`（每筆一次 clip，O(1)）；覆蓋率在 90×120 canvas 上每 8 筆量一次。最終印張以該 canvas 當 SVG `<mask>`（底值 23%：沒拓到的地方仍有淡墨）。
- 鍵盤替代：Tab 到任一塊、Enter 直接就位；選墨罐後 Enter 上墨；「代拓」一鍵完成拓印。

### 12.4 效能預算
- 檔案：index 112KB／mucai 86KB／yinfang 56KB／lai 90KB（皆含 inline 全部 CSS/JS/SVG，≤350KB）；外部只有 Google Fonts。
- 動畫：環境動效全在 SMIL（合成器外但每幀只動 4 個 transform，360×480 遮罩）；輸入與轉場只動 transform／clip-path，零 layout thrashing。
- 已知限制：sandbox 無瀏覽器可量 fps；以上 ms 為 node 模擬值，實機 Chrome 預期相近或更快。
