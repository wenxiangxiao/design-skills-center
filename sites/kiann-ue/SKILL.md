---
name: hlebine-reverse-glass
description: Hlebine School reverse-glass naive painting — oil on the back of glass painted in reverse order (ink and foreground first, highlights, flat colour, sky last and only the sky graded), every-twig winter trees, flattened stacked-band villages, glossy glass sheen in a dark wooden frame.
---

# Hlebine 學派玻璃背畫 Hlebine School Reverse-Glass Painting

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（北門鏡畫行，新竹玻璃鏡畫店）不同產業、但一眼看得出是同一個流派的網站。
> **本流派為既有設計史／藝術史流派，非自創。**血緣：克羅埃西亞北部 Podravina 地區 Hlebine 村，1930 年夏天美術學生 Krsto Hegedušić（1901–1975）看見 Ivan Generalić（1914–1992）畫在紙袋上的素描，開始教村裡的年輕人畫畫；1931 年作品隨「土地 Zemlja」團體在札格雷布藝術館展出。他們借用村裡原本拿來臨摹聖像的**玻璃背畫**——油彩畫在玻璃背面、前景與細節先畫、背景最後、簽名反著寫——把尺寸放大、改畫農村生活：婚禮、農事、送葬，以及大量的冬天村莊。第一代 Generalić、Franjo Mraz、Mirko Virius；第二代 Josip Generalić、Ivan Večenaj、Dragan Gaži、Ivan Lacković Croata、Mijo Kovačić。代表作 Generalić〈鹿的婚禮 Jelenska svadba〉1959、〈Hlebine 的冬天〉1962。
> 參考：Wikipedia〈Ivan Generalić〉；DailyArt Magazine〈The Idyllic Winters in Croatian Naïve Art〉（Marija Canjuga）；Kallir Research Institute〈Yugoslav Naives〉；Charlotte Zander 編《Die Schule von Hlebine – 75 Jahre》2005。

---

## 一、設計哲學

**這個流派的長相是由「倒過來畫」這條製程限制決定的。**畫在玻璃背面，觀者從正面看到的第一層，就是畫家畫的第一筆。所以：

1. **線先畫，所以線永遠在最上面。**色塊塗在線的後面，邊緣被線收得乾乾淨淨，看不到筆觸——你看到的是顏料貼著玻璃的那一面，平、亮、硬。
2. **細節先畫，所以細節多到誇張。**樹要一根一根枝畫到最末梢，後面的天空才能整片刷過去；畫家沒辦法「最後再點綴」，只能一開始就把所有小東西畫完。
3. **天空最後一刷，所以只有天空能漸層。**它是整面最大、最後、最自由的一層；前景的每一塊都是一罐顏色平塗。
4. **農民畫家不學透視，所以空間是一條條橫帶疊上去的。**遠的樹跟近的樹差不多大，房子永遠正面朝你。
5. **它被裱在木框、蓋在玻璃後面，所以有反光。**整幅畫像一面窗，會映出一道斜斜的光。

三條心法：**先畫的在前面／只有天空能漸層／每一根枝都要畫到。**

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，就不再是 Hlebine 玻璃背畫。

### 特徵 1：畫到最末梢的冬樹（形狀語彙）

每一面至少一棵沒有葉子的大樹，遞迴分岔 8–9 層，每層線寬 ×0.68、長度 ×0.74–0.84，偶爾三岔，末梢 ≤0.8px；冠形對稱扇開、略向上收。樹上停白鳥或積雪。

```js
// xorshift32：同 seed 長同一棵樹
function xs(a){a=(a>>>0)||1;return()=>{a^=a<<13;a>>>=0;a^=a>>>17;a^=a<<5;a>>>=0;return a/4294967296}}
function tree(seed,x,y,len,depth){const r=xs(seed),segs=[];
 (function br(x,y,a,l,w,d){const x2=x+Math.cos(a)*l,y2=y+Math.sin(a)*l;segs.push([x,y,x2,y2,w,d]);if(d>=depth)return;
  const n=r()<.2&&d>1?3:2;for(let i=0;i<n;i++){const sp=(.3+r()*.28)*(n===3?1.15:1),da=n===2?(i?sp:-sp):(i-1)*sp;
   br(x2,y2,a+da+(-Math.PI/2-a)*.12+(r()-.5)*.12,l*(.74+r()*.1),Math.max(.45,w*.68),d+1);}})(x,y,-Math.PI/2,len,len*.16,0);
 return segs.sort((a,b)=>a[5]-b[5]);}   // 依深度排序：生長動畫照這個順序
```

### 特徵 2：背繪層序——墨線在最上、色塊在線後、天空最後（版面手法／合成規則）

畫面由四個階段的「筆」組成，順序不能換：**① 墨線與最前面的東西 → ② 高光（雪白、燈黃） → ③ 平塗 → ④ 天空**。在網頁上用 Canvas 2D 的 `destination-over` 忠實重現：每一筆都落到已經畫好的東西**後面**。

```js
// 正面＝destination-over；背面＝同一串筆 source-over＋左右鏡像
function paint(cv,ops,front){const x=cv.getContext('2d'),k=cv.width/1200;
  x.setTransform(front?k:-k,0,0,k,front?0:cv.width,0);
  x.globalCompositeOperation=front?'destination-over':'source-over';
  ops.forEach(o=>o.go(x));x.globalCompositeOperation='source-over';x.setTransform(1,0,0,1,0,0);}
```

驗收：放大任何一塊色塊，邊緣都被墨線壓住；白點不會被色塊吃掉；從背面看（鏡像、source-over），最後只看得到天空。

### 特徵 3：扁平疊帶空間（構圖）

地平線約在 65% 高度；以下是 4–5 條滿寬橫帶（遠田赭／霜田灰白／河藍／近岸田綠），以上是天空。**不做空氣透視、遠樹不明顯縮小、房子正立面＋屋頂俯視線條混用**（素人畫的混合視點）。物件互不遮擋——重疊處畫家本來就不會畫被擋住的部分，所以排版時讓物件各占一格。

```css
/* 無 canvas 時的帶狀備援 */
.bands{background:linear-gradient(#142039,#2C4466 36%,#8FB0A6 64%,#CF9440 64% 70%,#D6D6CB 70% 81%,#35577A 81% 86%,#4D6A38 86%)}
```

### 特徵 4：玻璃面——深色木框、硬邊、斜向反光（質材）

每一幅畫都是一面裝框的玻璃：深棕木框 `#2A1D14`、內外各一道 2px 墨線、硬邊位移影（零模糊陰影）；畫面上一道**跟著游標走的斜向反光**，用 `mix-blend-mode:screen` 疊在畫上。顏料本身零紋理（觀者看的是顏料貼玻璃那一面）。

```css
.glass{background:#2A1D14;padding:16px;box-shadow:inset 0 0 0 2px #4A3626,0 0 0 2px #14110D,6px 6px 0 #0A0F1C}
.sheen{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;
 background:linear-gradient(112deg,transparent 0 38%,rgba(255,255,255,.05) 41%,rgba(255,255,255,.22) 45%,rgba(255,255,255,.04) 48%,transparent 50% 61%,rgba(255,255,255,.09) 63%,transparent 66%);
 background-size:260% 100%;background-position:calc(var(--sx,.5)*100%) 0}
```

### 特徵 5：冬夜色票與農村母題（色彩規則＋裝飾母題）

夜藍→暮藍→地平線青的天空漸層，配雪白、磚紅、赭、田綠、河藍的平塗；母題固定是農村：正面小屋（亮燈的窗）、草堆、牛、籬笆、月亮、白鳥、扛東西走路的人。字只用**金箔字**：金色平塗＋細墨邊，且金箔是第一筆，壓在畫上面。

```css
:root{--night:#142039;--dusk:#2C4466;--hor:#8FB0A6;--snow:#F3EFE2;--brick:#B5372A;--ochre:#CF9440;--field:#4D6A38;--river:#35577A;--ink:#14110D;--gold:#C9A44C;--frame:#2A1D14}
.gilt{color:var(--gold);-webkit-text-stroke:.6px var(--ink);paint-order:stroke fill;text-shadow:1px 1px 0 var(--ink)}
```

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 夜藍 | `#142039` | 頁面地色、天空頂 | 45% |
| 暮藍 | `#2C4466` | 天空中段 | 天空內 |
| 地平線青 | `#8FB0A6` | 天空底、次級文字 | 8% |
| 雪白 | `#F3EFE2` | 白鳥、霜、月、正文字 | 12% |
| 磚紅 | `#B5372A` | 屋瓦、衣服、主要動作按鈕 | 5% |
| 赭 | `#CF9440` | 遠田、草堆 | 6% |
| 田綠 | `#4D6A38` | 近岸、帶狀分隔 | 6% |
| 河藍 | `#35577A` | 河 | 3% |
| 牆白 | `#E6D9BC` | 牆 | 3% |
| 燈黃 | `#F2C14E` | 窗燈、focus、按下狀態 | ≤3% |
| 金箔 | `#C9A44C` | 標題金字、現用導覽 | ≤4% |
| 墨 | `#14110D` | 所有輪廓、框線、硬影 | 4% |
| 框木 | `#2A1D14` | 畫框、側欄 | 5% |

規則：**顏料只有天空能漸層**（玻璃反光是光、不是顏料，可用透明白）。零模糊陰影、零圓角、零紙紋。

## 四、字體系統

- 標題：Noto Serif TC 900（Google Fonts），金箔處理 `.gilt`；字級 clamp(36px,5vw,68px)，行高 1.25，字距 .04em。
- 內文：LXGW WenKai TC 400/700（楷體氣質，接近店家手寫價目），17px／1.75。
- 標籤：Noto Serif TC 700 12px、字距 .32em、地平線青。
- 數字價格：Noto Serif TC 900 金色。

## 五、版面與網格

- 桌機：左側 92px 木框側欄（掛畫導覽）＋主欄。首頁首屏 1.55:1 兩欄：左為裝框玻璃畫（3:2），右為標題與四層說明。
- 畫作永遠 3:2 橫幅（賀匾例外可直幅），掛在一根釘子與兩條斜繩下，彼此錯落而非整齊卡片牆：12 欄網格上占 5／7／7／4 欄並上下錯位。
- 分隔用 6px「籬笆帶」（田綠＋每 38px 一根墨線樁），上下 2px 墨線。
- 留白：區塊上下 48–96px；畫框外留至少 18px。
- ≤760px：側欄變底部四格；≤560px：所有多欄改單欄、四層拆解改 2×2 平鋪。

## 六、元件配方

- **導覽（掛畫）**：每一項是 58×62 的小玻璃，`::before` 一枚金色釘、`::after` 兩條繩；現用頁為金底墨字並傾斜 -4°；hover／focus 以 `transform-origin:50% -16px` 做阻尼擺盪。
- **按鈕**：雪白底墨字、2px 墨框＋4px 硬位移影；按下位移 3px；主要動作磚紅、次要金。
- **畫框卡片**：`.glass>.pane>canvas+.sheen`；可點擊翻面（CSS 3D `rotateY(180deg)`、`backface-visibility:hidden`）看背面。
- **表格**：只有 2px 墨線橫線，價格欄金色右對齊。
- **footer**：深一階夜藍 `#0F182C`、三欄。

## 七、動效規則

| 種類 | 本站實作 | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| signature 簽名 | **背繪層序合成**：首頁那面畫照真實筆序畫出來——墨線與樹枝依深度長出 2.8s → 高光 0.9s → 色塊從線後面「滲」進來 1.3s → 天空從上往下倒滿 1.0s；右欄四步同步亮起 | 載入、「再畫一次」 | 線性、每幀 destination-over 增量 | 直接畫完，四步說明照常可讀 |
| input 輸入 | 玻璃反光跟游標走（`--sx`）；四層拆解圖隨游標／拖曳轉動；畫鏡台筆觸即時落在背面與「鏡子裡的正面」 | pointermove／drag | 90ms linear | 反光不動、拆解圖固定角度 |
| transition 轉場 | 整面玻璃 3D 翻到背面；掛畫進場由 -2.5° 擺正 | 按鈕／點畫／進入視窗 | 800ms cubic-bezier(.5,.05,.25,1)；900ms 阻尼 | 無動畫直接切換 |
| ambient 環境 | 游標靜止 2.5 秒後反光自己在玻璃上慢慢飄 | 時間 | 14s ease-in-out alternate | 停止 |

自我限制：不用淡入當主角、不用跑馬燈、不讓任何東西在畫面「前面」飛過（違反層序）。

### motion-library 元件表（motion-library 1.20.0 @e45c261f，`tools/ml-embed.js` 子集 inline 為每頁第一個 `<script>`）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 | 角色 |
|---|---|---|---|---|---|
| TXT-B-17 | Water Reflection | 首頁 | text「鏡畫」, primary #C9A44C, secondary #8FB0A6, bg #142039, 2.4s, loop:false, seed 1956, 16:9 | 店名從一條水平線升起、下方留一道搖晃的倒影——「鏡」的字面意義；夜藍底讓字自動取近白，與雪白同階 | transition（一次性） |
| SHP-33 | Squiggle Draw | 畫鏡台 | primary #14110D, secondary #B5372A, bg #E6D9BC, 2.6s loop, seed 3 | 一條墨線從頭描到尾，示範第一階段「先描線」；單色描線、零發光零圓角，與特徵 2 一致 | ambient |
| TXT-A-02 | Letter Sequence | 鏡匾價目 | text「百年好合」, primary #C9A44C, bg #142039, 1.8s, loop:false, seed 4 | 四個字一個一個由下而上就位，像金箔一片片貼上玻璃；放在裝框玻璃裡當賀匾 | transition（一次性） |
| BG-B-39 | Minimal Wave | 鏡匾價目 | primary #8FB0A6, secondary #35577A, bg #142039, 6s loop, intensity .8 | 價目表上方一條緩慢起伏的河線，對應畫中的河帶；單一平塗筆劃 | ambient |
| BG-A-37 | Dot Swarm | 三代 | primary #F3EFE2, secondary #8FB0A6, bg #142039, 10s loop, density .7, seed 1930 | 頁首一群白點盤旋，是夜裡歸巢的鷺鷥群；白點平塗，延續特徵 5 的白鳥母題 | ambient |

掛載照 `sites/ka-to` 的包裝（本站 `KU.ml`）：`document.fonts.ready` 後才掛、IntersectionObserver 離屏 `destroy()`、回視窗重掛；一次性文字 `once:true` 只播一次；canvas `aria-hidden`；原 HTML 標題留在 `.ml-fb`，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。各頁同時運轉的元件 ≤2 個。元件不擔任 signature。開發 prompt 出處：`MotionLib.prompt(id)`。

## 八、插畫與圖像風格

全站零圖檔：每一面畫都是一串「筆」（`{ph, go(ctx)}`）由程式畫出，同一串筆可以正面（destination-over）或背面（source-over＋鏡像）合成。母題：亮燈正面小屋＋兩側護龍、草堆、水牛、籬笆、月亮、星（短十字）、停在枝上的白鷺、扛著玻璃走路的人。**重疊規則**：鳥要在樹枝之前畫（否則枝會劃過鳥身）；遠樹只種在沒被房子擋住的地平線上。春天版本在枝梢先點紫花與葉點；黃昏版本把天空換成藍→沙→金。

## 九、Logo 與 Favicon

Logo（`assets/logo.svg`）：木框裡一面小玻璃畫——夜藍天、白月、田綠帶、一棵分岔的黑樹、兩隻白鳥，右上兩邊一道金箔線。Favicon 為同一構圖的 64×64 簡化版（inline SVG data URI）。不放字、不放徽章年份。

## 十、Do & Don't

- Do：線先畫；色塊平塗在線後；天空最後且唯一漸層；每棵樹畫到末梢；畫要裝框、要有反光。
- Do：物件互不遮擋、各占一格；遠近差不多大。
- Don't：任何筆觸紋理、紙紋、水彩暈染、模糊陰影、圓角卡片、紫藍漸層、emoji icon、Lorem ipsum、EST. 徽章。
- Don't：在畫面前面加飛過去的東西、後加的描邊或高光（違反層序）。
- Don't：透視縮小、空氣透視、霧。

## 十一、頁面骨架範例

```html
<header class="rail"><nav aria-label="主要頁面">
  <a class="plq" href="index.html" aria-current="page"><b>鏡</b><small>首頁</small></a>
  <a class="plq" href="work.html"><b>畫</b><small>作品</small></a></nav></header>
<main>
  <div class="hero">
    <div class="glass"><div class="pane"><canvas id="hero" width="1200" height="800" role="img" aria-label="…"></canvas><div class="sheen"></div></div></div>
    <div><h1 class="gilt">標題</h1><ol class="layers"><li>墨線</li><li>高光</li><li>平塗</li><li>天空</li></ol></div>
  </div>
  <div class="band" aria-hidden="true"></div>
</main>
```

---

## 十二、技術實作與相容性

| 技術 | 承載什麼 | 支援現況與查證 | fallback |
|---|---|---|---|
| Canvas 2D `globalCompositeOperation='destination-over'`（A 渲染層） | 特徵 2、signature、畫鏡台正面合成；同一串筆換合成模式＋鏡像就是背面 | MDN〈CanvasRenderingContext2D.globalCompositeOperation〉：`destination-over`「在現有畫布內容的後面繪製新圖形」；Porter-Duff 係數 src 1−αB／dst 1（WHATWG 規格討論）。建置時以 headless Chromium 實測：先紅後藍、取樣得 255,0,0,255（紅在前）。Node 中以預乘 alpha 驗證「增量 destination-over＝反序 source-over」 | 無 JS：首頁 `<noscript>` 放建置期烘好的 WebP（同一演算法）；其餘頁文字完整 |
| 遞迴分岔冬樹＋xorshift32（E 資料與生成層「程序化圖樣生成／決定性偽隨機」） | 特徵 1；同 seed 同一棵樹，畫鏡台「種樹」即時長出 | 純 JS；實測 9 層 1,974 段 4ms（Node） | — |
| `mix-blend-mode:screen` 反光＋CSS 3D `rotateY`／`backface-visibility`（A 渲染層「mix-blend-mode 疊印」） | 特徵 4、input、ambient、transition（翻面） | MDN〈mix-blend-mode〉標示 Baseline Widely available；web-features 記 2022-07-15 達成。headless Chromium `CSS.supports('mix-blend-mode','screen')` 為 true | 不支援時反光層退為一般疊加（仍是淡白斜帶），翻面仍可切換 |

效能實測（headless Chromium，1360px）：整幅場景 160 筆建構＋合成 5–15ms；首頁簽名動畫每幀只畫新增的筆。單頁大小：index 274KB（含 40KB noscript WebP）、hua 242KB、pian 234KB、su 230KB，皆 ≤350KB（motion-library 子集約 200KB）。
