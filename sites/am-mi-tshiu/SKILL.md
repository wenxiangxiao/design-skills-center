---
name: gond-night-painting
description: Pardhan Gond painting on black silkscreen paper — flat opaque silhouettes filled edge-to-edge with a signature pattern (bharna) of dots, dashes, scales, comb lines, seeds and zigzags that follow each shape's flow, around a metamorphic tree of life.
---

# Gond 黑紙夜畫 SKILL（Pardhan Gond Painting・Jangarh Kalam on black paper）

> 範例站：暗暝樹 夜觀社 ÀM-MÎ-TSHIŪ（南投鹿谷內湖村的夜間生態導覽，虛構）。本規格書不綁定產業。

## 設計哲學

Gond 是中印度中央邦（Madhya Pradesh）的原住民族；Pardhan 是其中世代為 Gond 氏族唱誦族譜與神話的樂師群體。傳統上 Gond 婦女在泥牆與地面上畫 *digna*（幾何紋），用的是土、炭、葉汁與牛糞。1980 年前後，畫家 Jagdish Swaminathan（時任博帕爾 Bharat Bhavan 主持人）在 Dindori 縣 Patangarh 村遇見十七歲的 **Jangarh Singh Shyam**，邀他到博帕爾，他從牆繪轉向紙與畫布，形成後來被稱為「Jangarh Kalam」的當代 Gond 繪畫；之後 Bhajju Shyam、Durga Bai、Ram Singh Urveti 等人延續，2006 年起 Chennai 的 Tara Books 以**手工絹印在黑色紙**上出版〈The Night Life of Trees〉等書，黑紙＋不透明平塗成為國際最熟悉的 Gond 面貌。

它為什麼長成這樣：

1. **牆繪的出身**——泥牆沒有透視、也沒有光源，形是平貼在牆上的剪影，所以畫面從來不是一扇窗，而是一面「貼滿了東西的牆」。
2. **紋即簽名**——每位畫師都有自己的填紋（點、短劃、梳線、魚鱗、種子…），評論者說 Jangarh 的紋來自刺青的點、有「pressure and angle」的變化。紋不是陰影，是身份。
3. **萬物有靈**——樹會長出鳥頭、樹根是蛇、動物肚裡有另一隻動物。畫面的中心幾乎永遠是一棵樹（mahua、生命之樹）。
4. **絹印的限制**——Tara Books 的絹印一色一版、色塊必須不透明才能蓋住黑紙，所以零漸層、零透明、每一塊顏色邊緣清楚；紙本身的黑就是夜。

本規格的一句話：**黑紙上，不透明的剪影被它自己的簽名紋填滿；畫面圍著一棵會變形的樹長出來。**

## 本風格的 5 個不可省略特徵

拿掉任何一項，就不再是 Gond。

### ① 形狀：平貼剪影，零透視、零陰影、零地平線

每個形是一個封閉剪影，外圍 2.5–3px 粉筆白輪廓（`#F1E8D2`）。不畫地面、不畫投影、不做近大遠小；動物漂浮在枝上，側面或正面二選一。

```css
.art .f{stroke:#F1E8D2;stroke-width:2.6;stroke-linejoin:round}   /* 每個剪影一律有輪廓 */
```
```svg
<!-- 中心線＋寬度 → 剪影（樹枝、蛇、尾巴都用同一招，見「頁面骨架」ribbon()） -->
<path class="f" d="M500,585L420,470…Z" fill="#F4B41A" data-b="dots" data-k="#14110D" data-a="-30" data-s="13"/>
```

### ② 裝飾母題：bharna 簽名紋——剪影內部被同一種記號填滿，記號沿形的流向排列

六種紋型，每個剪影只選一種，紋色與底色強烈對比（黃底黑點、藍底白鱗）：

| 紋型 `data-b` | 記號 | 典型用途 |
|---|---|---|
| `dots` | 實心圓點 r=0.22s | 月亮、螢火、毛皮 |
| `dash` | 短劃 0.84s，順紋向 | 樹幹、尾巴、雨 |
| `comb` | 梳齒（垂直紋向的短線密排，成帶） | 竹節、樹枝、腿 |
| `scale` | 半圓魚鱗，隔行錯半格 | 羽毛、鳥身 |
| `seed` | 杏仁籽形 | 蛙背、臉、果實 |
| `zig` | 人字鋸齒 | 蛇、根、河 |

規則：記號中心距剪影邊 ≥0.4s（梳齒 0.82s），**永不壓過輪廓**；紋向 `data-a` 跟著形的長軸走（樹枝斜、樹幹直、蛇身順著曲線）。

```html
<!-- 宣告：形狀＋紋型＋紋色＋紋向（度）＋間距 -->
<ellipse class="f" cx="0" cy="18" rx="42" ry="56" fill="#1F7FC4" data-b="scale" data-k="#F1E8D2" data-a="0" data-s="12"/>
```
```js
// 執行期填紋（核心 20 行，見「技術實作」）
const r = BH.points(type, angle, s, el.getBBox(), (x,y)=>el.isPointInFill(pt(x,y)));
r.pts.forEach(p => d += BH.make(type, p[0], p[1], r.ux, r.uy, s));
```

### ③ 色彩：黑紙＋五罐不透明絹印色，零漸層、零透明

| Token | Hex | 用途 | 面積 |
|---|---|---|---|
| `--paper` 黑紙 | `#14110D` | 唯一地色、夜、紋色（亮底上的黑點） | ~55% |
| `--chalk` 粉筆白 | `#F1E8D2` | 全部輪廓、正文、眼白、紋色 | ~12% |
| `--tur` 薑黃 | `#F4B41A` | 標題、主按鈕、樹枝 | ~9% |
| `--ver` 朱 | `#E2452B` | 樹幹、鳥喙、紅光模式 | ~8% |
| `--leaf` 葉綠 | `#2FA05A` | 葉、蛙、蛇 | ~7% |
| `--pea` 孔雀藍 | `#1F7FC4` | 鳥身、根蛇、河 | ~5% |
| `--pink` 桃紅 | `#EC6C9B` | 鼯鼠膜、小枝、強調標號 | ~4% |
| `--dim` 舊紙灰 | `#B9AE96` | 次要文字（不進畫面） | — |

規則：相鄰兩塊同色禁止（相鄰就換色或靠白輪廓隔開）；任何 `opacity`、`linear-gradient` 上色、模糊陰影、發光一律禁止。唯一允許的「漸層語法」是遮罩（手電筒光）與硬邊圖樣，它們不是顏料。

```css
:root{--paper:#14110D;--chalk:#F1E8D2;--tur:#F4B41A;--ver:#E2452B;--leaf:#2FA05A;--pea:#1F7FC4;--pink:#EC6C9B}
body{background:var(--paper);color:var(--chalk)}
```

### ④ 版面：一棵會變形的中軸樹統治畫面

首屏的主角是一棵正面、略不對稱的樹：樹幹在中軸、五條主枝放射、**枝端長成鳥頭、樹根是兩條蛇**、樹幹上有一隻看著你的眼。動物住在枝間、比例照「重要性」不照真實。網頁版面跟著樹走：首頁左 7 欄是樹、右 5 欄是文字；內頁以一根朱紅樹幹當中軸，條目像枝一樣左右交錯掛上。

```css
.hero{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(20px,4vw,56px)}
.trunk{position:absolute;left:50%;width:26px;margin-left:-13px;background:#E2452B;border-inline:3px solid #F1E8D2}
.entry{display:grid;grid-template-columns:1fr 1fr;gap:70px}   /* 左右交錯 = 枝 */
```

### ⑤ 字體：手寫楷體標題＋圓胖拉丁字，放在點線框裡

中文用霞鶩文楷 TC（LXGW WenKai TC，Google Fonts）——筆畫有手感、不是機械黑體，對應手繪的畫面；拉丁字與數字用 Ek Type（孟買）的 **Baloo 2** 800，圓胖、像用筆刷寫的招牌字。標題直接是平塗色字（薑黃），**框一律用圓點線**（Gond 牆繪的點邊），不用實線。

```css
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=LXGW+WenKai+TC:wght@400;700&display=swap');
h1{font:700 clamp(54px,8vw,104px)/1.2 "LXGW WenKai TC",serif;color:#F4B41A}
.lat{font:800 1em "Baloo 2",sans-serif;letter-spacing:.02em}
.cart{border:4px dotted #F1E8D2;border-radius:8px 46px 8px 46px;padding:22px 24px}   /* 杏仁葉形點框 */
```

## 色彩系統

見特徵③。補充：**紋色選擇**——亮底（薑黃、粉筆、桃紅）配黑紙色紋；暗底（孔雀藍、葉綠、朱）配粉筆白紋。紅光模式（夜觀規矩：只用紅光）時，所有剪影變黑紙底＋朱色輪廓，紋全部隱藏——這是同一張畫的第二種讀法。

## 字體系統

| 角色 | 字體 | 字級 | 字重／行高 |
|---|---|---|---|
| 首頁大標 | LXGW WenKai TC | clamp(54px, 8vw, 104px) | 700／1.2 |
| 內頁大標 | LXGW WenKai TC | clamp(44px, 7vw, 90px) | 700／1.2 |
| 段落標 | LXGW WenKai TC | 30–48px | 700／1.2 |
| 正文 | LXGW WenKai TC | 17px（手機 16px） | 400／1.75 |
| 英文副標、kicker | Baloo 2 | 12–18px，letter-spacing .16–.18em，大寫 | 800 |
| 數字（計時、價目） | Baloo 2 | 30–40px | 800／1 |

## 版面與網格

- 最大寬 1320px，左右 `clamp(16px,4vw,48px)`。
- 首頁 7:5 雙欄，樹在左；≤900px 單欄。
- 段落分隔用 **digna 鋸齒帶**（三角黃朱相間，三角內一顆點），不用水平細線。
- 列表交錯縮排（第二、四列右移 6vw），永遠不做置中三卡片。
- 零旋轉；唯一的傾斜是 hover 時的 −1° 到 −4°（鳥起飛、按鈕晃）。

## 元件配方

- **導覽「棲枝」**：右上一條朱色短枝，三隻 Gond 小鳥各是一頁。非現用＝黑紙身＋白輪廓＋眼皮闔上；現用＝薑黃身＋黑點紋＋睜眼；hover 小鳥抬起 6px 轉 −4° 並睜眼。≤560px 攤成三等分。
- **按鈕**：杏仁葉形 `border-radius:6px 30px 6px 30px`，底色平塗，內圈 `outline:3px dotted` 內縮 8px。
```css
.btn{border:0;border-radius:6px 30px 6px 30px;background:#F4B41A;color:#14110D;font:700 18px/1 "LXGW WenKai TC";padding:15px 26px;outline:3px dotted #14110D;outline-offset:-8px}
```
- **狀態膠囊**：3px 點線綠框＋左側一顆實心綠點（今晚是否出隊，依臺北時刻自動改字）。
- **編號**：桃紅「葉滴」形 `border-radius:50% 50% 50% 8px`＋內圈點線。
- **表單**：黑紙底、3px 點線框、聚焦改實線薑黃。
- **票（結果卡）**：薑黃滿版、杏仁葉形、內縮點線，數字用 Baloo 2 800 40px。
- **頁尾**：上方一條 digna 帶，三欄文字。

## 動效規則

四種動效各有本站自製實作，motion-library 元件為額外加入。

| 類型 | 實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 月亮依真實月相重畫亮面（2000-01-06 18:14 UTC 朔為基準、朔望月 29.530588853 日）＋七朵 mahua 花沿樹冠緩落 | 載入／時間 | 花 15s linear 無限 | 月相照常（靜態）、花停 |
| input | 手電筒：`mask-image` 圓心＝指標位置（觸控時抬高 90 單位避開手指），方向鍵 24／Shift 60 單位 | pointermove／keydown | 即時（同幀寫入 CSS 變數，<16ms） | 照常（使用者自己在動） |
| transition | ① 熄燈：註冊 `@property --tr <length>`，手電筒半徑由 2000px 收到 96 單位 ② 換頁：`clip-path: circle()` 從點擊處長滿畫面，新頁從中央張開 | 開始遊戲／點內部連結 | ① .9s cubic-bezier(.6,0,.3,1) ② 440ms ease-in＋620ms | 無轉場、立即切換 |
| **signature** | **紋醒（bharna wake）**：找到一隻動物（或 hover 住戶頁的牠），牠身上每一顆紋依「離眼睛的距離」延遲 `--d×520ms` 放大到 1.9 倍再回來，像一圈漣漪從眼睛擴散到全身，眼皮同時收起 | 找到／hover／focus | .9s cubic-bezier(.3,1.5,.5,1) | 不放大，只睜眼（資訊相同） |
| 捲動落墨 | 住戶頁每顆紋以 `animation-timeline: --e`（條目的 view timeline）依 `--o` 先後印上；中軸樹幹以 `scroll(root)` 長高 | 捲動 | 依捲動 | 紋全部直接可見 |

自我限制：不用淡入淡出當主要動效；所有出現都是「印上去」（scale 0→1），符合絹印一版一版壓上的邏輯。

### motion-library 元件表

來源：`wenxiangxiao/motion-library` v1.11.0 @22220a4，以 `tools/ml-embed.js` 只抽該頁元件，與 `src/motion-player.js`（`mount()`）一起 inline 為每頁第一個 `<script>`；掛載走 `AM.ml`（等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `once` 進視窗播一次、reduced-motion 背景 `seek(.35)` 文字 `seek(1)`、canvas `aria-hidden`、容器保留 `.ml-fb` 原 HTML 標題）。開發 Prompt 以 `MotionLib.prompt(id)` 取得。

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-37 | Dot Swarm | 首頁 | primary `#F4B41A`／secondary `#2FA05A`／bg `#14110D`，duration 9，density .8，intensity .9，seed 2003，1:1 | ambient | 樹後面的螢火蟲群：元件只畫平塗圓點、零發光零漸層，正好是 Gond 的「點」；熄燈後樹被遮住，只剩它在黑紙上飛，夜才成立 |
| TXT-B-40 | Float Drift | 首頁〈夜單〉 | primary `#F4B41A`／secondary `#EC6C9B`／bg `#14110D`，duration 1.6，loop false，seed 8 | transition | 夜單標題「你的夜單」字一個個像 mahua 花一樣飄落定位；暗底自動得白字 |
| TXT-A-10 | Follow Path | 住戶 | primary `#F4B41A`／secondary `#2FA05A`／bg `#14110D`，duration 1.8，loop false，seed 3 | transition | 「樹上的住戶」沿一條波浪虛線走進來——那條虛線就是 Gond 的短劃紋，也是夜觀的路 |
| BG-B-21 | Ripple Rings | 住戶〈先用耳朵找〉 | primary `#2FA05A`／secondary `#F4B41A`／bg `#14110D`，duration 6，density .9，intensity .8，seed 21 | ambient | 同心圓一圈圈擴散＝蛙鳴與鴞叫；純描邊圓、無發光，和 Gond 的同心點框同語彙 |
| BG-A-11 | Parallel Curves | 走一晚 | primary `#1F7FC4`／secondary `#2FA05A`／bg `#14110D`，duration 8，density 1.1，seed 12 | ambient | 平行波線＝茶園邊的溪溝；放在點線框的杏仁形容器裡，像 Gond 畫裡的河 |

元件從不擔任 signature；同畫面同時運轉 ≤2 個。已知限制：元件庫文字元件沒有字型參數，會落到系統無襯線體——它只用在短標題，正文標題一律是霞鶩文楷。

## 插畫與圖像風格

- 技法：**bharna 簽名紋填充**。所有圖像先在建置期生成剪影（中心線＋寬度＝ribbon、杏仁葉 Q 曲線、橢圓），再於瀏覽器內以 `isPointInFill()` 取樣填紋。
- 葉子：杏仁形，中肋＋四對斜脈（亮葉用黑脈、暗葉用白脈），沿枝左右交錯、枝端扇形散開。
- 動物：每一隻由 3–8 個基本形組成，至少一隻眼（白眼、黑瞳、可收起的同色眼皮）；每個部位一種紋。
- 樹：枝端＝鳥頭（粉筆白圓頭＋朱喙）、根＝蛇（頭有點紋、朱色分叉舌）、樹幹中央一隻眼。
- 地圖：路是一條蛇（ribbon＋zig 紋），每一站是一叢兩片葉子。
- 禁止：寫實比例、漸層、陰影、外部圖片、照片、細線線描插畫。

## Logo 與 Favicon 設計指南

Logo：黑紙方底上一棵樹——朱色樹幹（根部分叉）、葉綠圓冠滿佈薑黃點、冠中央一隻杏仁形大眼（粉筆白眼白、黑瞳、白色反光點）。白輪廓 3px。Favicon 為同一構圖簡化成 64×64、圓角 14 的黑紙方塊，inline SVG data URI。

## Do & Don't

- Do：每個剪影都要被紋填滿；紋向跟形走；亮底黑紋、暗底白紋。
- Do：中軸樹＋變形（枝成鳥、根成蛇）；動物比例依重要性。
- Do：框用點線；按鈕用杏仁葉形。
- Don't：透視、投影、漸層上色、半透明色塊、發光。
- Don't：把 Gond 紋當背景圖樣平鋪——紋只能活在剪影裡。
- Don't：紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- Don't：杜撰真實 Gond 畫家的作品或言論；引用時只引用公開出版品，人物與店家虛構要標示。

## 頁面骨架範例

```html
<header class="top"><a class="brand" href="index.html"><svg>…</svg><span><b>店名</b><small>LATIN NAME</small></span></a>
 <nav class="perch"><svg class="branch">…</svg><a href="index.html" aria-current="page"><svg class="bird">…</svg><span>頁一<i>PAGE ONE</i></span></a>…</nav></header>
<main class="wrap"><section class="hero">
 <div id="stage"><svg class="art" viewBox="0 0 1000 1000">
   <g class="tree"><path class="f" d="…" fill="#E2452B" data-b="dash" data-k="#F1E8D2" data-a="90" data-s="14"/>…</g>
   <g class="animals"><g class="an" transform="translate(565 325)"><ellipse class="f" … data-b="scale"/>…<g class="eye">…</g></g></g>
 </svg></div>
 <aside><p class="kick">KICKER</p><h1>大標</h1><p>…</p><button class="btn">主要動作</button></aside></section>
 <div class="digna"></div></main>
```
```js
// 中心線＋寬度 → 剪影
function ribbon(P,w0,w1){const S=spline(P,10),L=[],R=[];S.forEach((p,i)=>{const a=S[Math.max(0,i-1)],b=S[Math.min(S.length-1,i+1)];
 let dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const w=(w0+(w1-w0)*i/(S.length-1))/2;
 L.push([p[0]-dy*w,p[1]+dx*w]);R.push([p[0]+dy*w,p[1]-dx*w]);});
 return 'M'+L.join('L')+'A'+w1/2+','+w1/2+' 0 0 0 '+R.reverse().join('L')+'Z';}
```

## 技術實作與相容性

### 1. `SVGGeometryElement.isPointInFill()`（E 資料與生成層：程序化圖樣生成）
- **承載**：特徵②全部。每個剪影的 bbox 以紋向 `(cos a, sin a)` 建立旋轉網格，候選點本身與四個偏移點（法向 ±mn、切向 ±mu）都在剪影內才落一筆記號；短路求值讓剪影外的點只花一次呼叫。樹的記號合成一條 path（DOM 少）；動物的記號每筆一個 path，帶 `--d`（離眼距離，給紋醒）與 `--o`（落墨順序，給捲動）。
- **查證**：MDN〈SVGGeometryElement: isPointInFill() method〉標示 Baseline「Widely available」（2020-07 起全瀏覽器）；Firefox 69 實作（Bugzilla 1325319）。以 `svg.createSVGPoint()` 傳點以相容較舊 WebKit／Blink，無則用 `new DOMPoint()`。
- **Fallback**：`!SVGGeometryElement.prototype.isPointInFill` 或無 JS → 不填紋，剪影、平塗、白輪廓與葉脈（建置期已烘入）照樣在，畫面仍是 Gond 色塊剪影。
- **效能**：分批執行，每批 ≤7ms（`requestIdleCallback`／`setTimeout(16)`），首屏不阻塞。node 原型以多邊形測試取代 isPointInFill 實測：首頁 1,178 筆記號（jsdom 模擬含批次間隔總計 87ms；每批 ≤7ms），住戶頁 328 筆、走一晚 177 筆。

### 2. CSS `mask-image: radial-gradient()`＋註冊 `@property --tr`（A／C 層：CSS mask-image 幾何）
- **承載**：手電筒（input）與熄燈（transition）。`mask-image:radial-gradient(circle var(--tr) at var(--tx) var(--ty),#000 99%,transparent 100%)`：硬邊光圈＝不是漸層上色；外圍一圈 `stroke-dasharray:0 15` 圓點環＝Gond 點框。紅光模式只換 class，不重繪。
- **查證**：MDN `mask-image` 標示 Baseline 2023（2023-12，無前綴）；同時寫 `-webkit-mask-image` 給較舊 Safari。`@property` 型別化屬性可轉場：Chrome 85、Safari 16.4、Firefox 128。
- **Fallback**：不支援 mask → 畫永遠全亮，遊戲仍可玩（看得見全部，但白光仍會嚇跑、紅光仍要停 0.8 秒）；不支援 `@property` → 熄燈無補間、直接切換。
- **效能**：每次 pointermove 只寫兩個 CSS 變數＋一個 SVG transform；同畫面 ML 元件 1 個。

### 3. CSS scroll-driven animations `animation-timeline: view()／scroll()`（B 動效與時間軸層）
- **承載**：住戶頁每顆紋依 `--o` 在條目的 view timeline 上「印上去」、中軸樹幹 `scroll(root)` 長高——你往下讀，樹就往下長、畫師就一筆一筆填紋。
- **查證**：Chrome／Edge 115（2023-07）起無旗標；Safari 26（2025-09）支援；Firefox 截至 2026 年中仍在 `layout.css.scroll-driven-animations.enabled` 旗標後（Interop 2026 目標）。以 `@supports (animation-timeline: view())` 包住。
- **Fallback**：不支援 → 紋與樹幹直接完整顯示，零資訊損失。

### 頁面預算（實測）
| 頁 | 大小（含 ML 子集＋player） | ML 元件 |
|---|---|---|
| index.html | 約 229 KB | BG-A-37、TXT-B-40 |
| residents.html | 約 169 KB | TXT-A-10、BG-B-21 |
| walks.html | 約 149 KB | BG-A-11 |

全部 ≤350KB；零外部圖片與音檔，只連 Google Fonts。
