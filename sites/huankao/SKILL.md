---
name: punk-xerox-cutpaste
description: British punk photocopy collage (1976-79 Jamie Reid / Sniffin' Glue lineage) - ransom-note lettering, 1-bit toner degradation, scissor-cut scraps, one fluorescent spot colour and marker-pen scrawl.
---

# 龐克剪貼 Punk Xerox — 影印剪貼風格規格書

## 一、設計哲學

這個流派誕生在 1976–1979 年的倫敦，決定它長相的不是美學主張，是**器材**：一台辦公室影印機、一把剪刀、一支膠水、一支粗麥克筆、一疊 A4，還有沒錢排版沒錢製版的現實。Jamie Reid 替 Sex Pistols 做的《God Save the Queen》把報紙標題一個字一個字剪下來重排；Mark Perry 的《Sniffin' Glue》整本手寫加影印，第一期只印了 50 份；Linder Sterling 用雜誌拼貼做 Buzzcocks 的《Orgasm Addict》。共同點是：**製作過程完全沒有被隱藏起來**——你看得到剪刀邊、看得到膠帶、看得到影印機吃掉細節之後留下的一塊一塊死黑。

因此本風格的第一原則是：**不要修好它**。

- 沒有灰階，只有純黑與紙白。影印機做不出灰，中間調會被壓成黑或壓成白。
- 沒有柔邊、沒有模糊陰影、沒有圓角、沒有漸層。所有陰影是實心的位移色塊。
- 沒有對齊。東西是用手貼上去的，一定歪，而且會超出邊界被裁掉。
- 沒有留白的餘裕。紙很貴，影印一張 0.7 元，所以填滿它。
- 每一次翻拷都會更糊一點。**世代衰減不是 bug，是這個流派的時間軸。**

這不是「粗糙風格」，它是一套嚴格的生產限制：只有一塊黑版，加上一種螢光影印紙。所有視覺變化都必須在這兩個條件內解決。

> 適用：獨立出版、地下音樂、小誌通販、活動傳單、二手／修補、社運與倡議、任何「東西比包裝重要」的品牌。
> 不適用：金融、醫療、法律、精品——不是因為醜，是因為這個流派明確地在拒絕「可信賴的機構感」。

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，畫面就會滑回「一般的黑白網站」。

### 特徵 1｜勒索信字體（Ransom-note lettering）

標題不是一個字型設定，是**一堆從不同印刷品剪下來的單字**。每一個字獨立擁有：字體家族、字級、旋轉角度、基線位移、底紙顏色、剪刀邊。判準：**同一個標題裡，找不到兩個字是同一種樣子。**

```css
.ransom{display:inline-block;line-height:1.02}
.rn{display:inline-block;background:#F7F5F0;color:#141210;
    padding:1px var(--pd,3px);margin:0 -1px 3px;clip-path:var(--c);
    transform:rotate(var(--r,0deg)) translateY(var(--dy,0)) scale(var(--s,1))}
.rn-inv {background:#141210;color:#F7F5F0}   /* 反白剪下來的那幾個字 */
.rn-fluo{background:#FF2E88;color:#141210}   /* 螢光影印紙剪的，一條標題最多兩成 */
.rn-p1{background:#F7F5F0} .rn-p2{background:#E4E0D7} .rn-p3{background:#D2CDC3}
.f-s{font-family:'Noto Serif TC',serif;font-weight:900}
.f-g{font-family:'Noto Sans TC',sans-serif;font-weight:900}
.f-m{font-family:'Courier Prime',monospace;font-weight:700}
.f-l{font-family:'Archivo Black',sans-serif;letter-spacing:-.02em}
```

參數範圍（超過就變成裝可愛，不足就變成一般標題）：`rotate ±7.5°`、`scale 0.78–1.28`、`translateY ±6.5px`、`padding-x 1–6px`。字與字之間 `margin:0 -1px` 讓紙塊互相咬住。

生成規則（決定性，同一句話永遠得到同一種剪法）：以 FNV-1a 對 `標題+索引` 取雜湊，再餵 mulberry32；**不要用 `Math.random()`**，重新整理就換一副樣子的標題是螢幕效果，不是印刷品。

### 特徵 2｜1-bit 影印退化（沒有灰，只有肥或不見）

所有圖像與標題都必須經過一組「二值化＋肥瘦」的濾鏡。細節在退化中消失，黑塊會糊在一起，邊緣是鋸齒不是抗鋸齒。

```html
<svg width="0" height="0"><defs>
  <!-- 給黑色透明底的插圖：dilate 肥字 + 全通道二值化 -->
  <filter id="ink3" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
    <feMorphology operator="dilate" radius="0.75"/>
    <feComponentTransfer>
      <feFuncR type="discrete" tableValues="0 0 1"/>
      <feFuncG type="discrete" tableValues="0 0 1"/>
      <feFuncB type="discrete" tableValues="0 0 1"/>
      <feFuncA type="discrete" tableValues="0 0 1"/>
    </feComponentTransfer>
  </filter>
  <!-- 給不透明色塊（勒索信字塊）：erode = 深色往外吃，碳粉擴散 -->
  <filter id="ton3" x="-8%" y="-25%" width="116%" height="150%" color-interpolation-filters="sRGB">
    <feMorphology operator="erode" radius="0.62"/>
  </filter>
</defs></svg>
```

```css
.art{filter:var(--xf)}      /* --xf: url(#ink1..4) */
.ransom{filter:var(--xo)}   /* --xo: url(#ton1..4) */
```

**關鍵觀念（很多人做錯這一步）**：`feMorphology` 同時作用在 RGB 與 alpha 上。
- 內容是「黑色畫在透明底上」→ alpha 主導 → `dilate` 把字變肥，`erode` 把字變細。
- 內容是「不透明色塊」→ alpha 恆為 1，RGB 主導 → `erode` 取各通道最小值，**深色往外擴散**（碳粉暈開），`dilate` 反而會讓淺色吃掉深色。

四個世代的半徑建議：`dilate 0 / 0.35 / 0.75 / 1.2`、`erode 0 / 0.3 / 0.62 / 1.0`。第 4 代之後就真的讀不出來了，不要再往上加。

**內文永遠不進濾鏡。** 標題、插圖、手寫可以糊，本文一律保持銳利可選取——資訊零損失是這個風格的底線，不是可選項。

### 特徵 3｜剪貼構成：每一塊內容都是一張被剪下來貼上去的紙

不要用卡片（card）。用**紙片（scrap）**：鋸齒剪刀邊、實心位移陰影、旋轉、彼此重疊、上面壓著膠帶或釘書針。

```css
.scw{position:relative;transform:rotate(var(--rot,0deg));transition:transform 70ms steps(3)}
.scw::before{content:"";position:absolute;inset:0;background:#141210;
  transform:translate(6px,7px);clip-path:var(--cut);z-index:0}   /* 實心陰影，禁止 blur */
.sc{position:relative;z-index:1;clip-path:var(--cut);background:#F7F5F0;
  padding:22px 24px;box-shadow:inset 0 0 0 2.5px #141210}        /* 影印邊框 */
.scw:hover{transform:rotate(calc(var(--rot,0deg) - 1.1deg)) translate(-2px,-3px)}
.tape{position:absolute;width:118px;height:30px;background:rgba(20,18,16,.13);
  border-top:2px solid rgba(20,18,16,.5);border-bottom:2px solid rgba(20,18,16,.5)}
```

`--cut` 是每一張紙各自算出來的 `polygon()`：沿四邊各取 9–13 個點，每點法向抖動 1–1.5%（大紙片）或 5–6%（小字塊）。同一個 seed 恆得同一條剪痕。

```js
function cutPoly(seed, n = 11, amp = 1.2) {          // 回傳 CSS polygon()
  const rng = mulberry32(fnv1a(seed)); const pts = [];
  const edge = (x0,y0,x1,y1,h) => { for (let i=0;i<n;i++){ const t=i/n;
    const x=x0+(x1-x0)*t, y=y0+(y1-y0)*t, j=(rng()-0.42)*amp*2;
    pts.push(h ? [x, Math.max(0,Math.min(100,y+j))] : [Math.max(0,Math.min(100,x+j)), y]); } };
  edge(0,0,100,0,1); edge(100,0,100,100,0); edge(100,100,0,100,1); edge(0,100,0,0,0);
  return 'polygon(' + pts.map(p=>p[0].toFixed(1)+'% '+p[1].toFixed(1)+'%').join(',') + ')';
}
```

注意：`clip-path` 會裁掉自己的 `box-shadow`，所以陰影必須交給**外層 wrapper 的 `::before`**，不能寫在紙片自己身上。

### 特徵 4｜兩色制：碳粉黑 ≥34%、一色螢光紙 ≤12%、其餘是紙

只有一塊黑版加一種螢光紙。**螢光色只能出現在「紙」上，不能出現在「碳粉」上**——它是紙的顏色，不是墨的顏色。因此：螢光可以當底、當標籤、當被剪下來的字塊；不可以當文字顏色、不可以當線條、不可以做漸層、不可以有第二種螢光色。

```css
:root{
  --paper:#EDEAE3;   /* 影印紙，冷灰不是米白 —— 約 50% */
  --paper2:#F7F5F0;  /* 剛出機器那張比較白的 */
  --toner:#141210;   /* 碳粉黑，≥34%：頁尾、黑帶、反白字塊、插圖實體 */
  --fluo:#FF2E88;    /* 螢光影印紙，≤12%：現用態、警告、被選中、一句要人看的話 */
  --grey:#8E8A82;    /* ≤3%，只給釘書針與停用態，不准拿來做灰階層次 */
}
```

大面積黑一定要有：頁尾整塊黑、跨頁中縫的黑帶、橫貫版面的資訊黑帶。沒有黑塊的punk是灰的，而灰的punk是失敗的punk。

### 特徵 5｜手寫麥克筆介入

每一頁至少有一處是**手拿麥克筆畫上去的**：圈起來、劃掉、箭頭、驚嘆號、打勾。它證明這份東西被人拿在手上處理過。線條要 5–7px 粗、`fill:none`、`stroke-linejoin:miter`，**明文禁用 `stroke-linecap:round`**（圓頭是簽字筆 app，不是奇異筆）。

```js
// 圈起來：橢圓多繞 40° 收不回原點，每點抖動 ±2.5px
function ring(w,h,rng){ const cx=w/2,cy=h/2,rx=w/2-6,ry=h/2-5;
  let d='M'+(cx-rx)+' '+cy;
  for(let a=0;a<=400;a+=22){const t=a*Math.PI/180;
    d+=' L'+(cx-Math.cos(t)*rx+(rng()-.5)*5)+' '+(cy+Math.sin(t)*ry+(rng()-.5)*5);}
  return d; }
```

```css
.mk{stroke-width:5.2;fill:none;stroke:currentColor;stroke-linejoin:miter}
.hand{position:absolute;pointer-events:none;filter:var(--xf)}
```

---

## 三、色彩系統

| 色票 | 用途 | 面積 |
|---|---|---|
| `#EDEAE3` 影印紙 | 全站底色。冷灰偏綠，**不是米白**——米白是文青紙感，這裡要的是辦公室影印紙 | ~48% |
| `#F7F5F0` 出機白 | 紙片本體、剛影印好的那一張 | ~14% |
| `#141210` 碳粉黑 | 頁尾、黑帶、反白字塊、全部插圖的實體、2.5px 邊框與實心陰影 | ~34% |
| `#FF2E88` 螢光粉 | 現用態、警示、被選中、勒索信裡的螢光紙字塊、麥克筆圈選 | ≤12% |
| `#8E8A82` 釘書針灰 | 釘書針的背面、停用態 | ≤3% |
| `#E4E0D7` / `#D2CDC3` | 勒索信字塊的第二、三種紙 | ≤4% |

**禁止**：任何漸層、任何半透明疊色（膠帶除外，且只能是黑的 13% 透明）、任何第二個彩色、任何灰階層次（灰只有一階，而且不是拿來做層次的）。

可替換的螢光色：`#FFE500` 螢光黃、`#39FF6A` 螢光綠、`#FF6B00` 螢光橘。**一次只能挑一個**，換色時整站只換這一個變數。

---

## 四、字體系統

外部資源只允許 Google Fonts：

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Courier+Prime:wght@400;700&family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
```

| 角色 | 字體 | 用法 |
|---|---|---|
| 勒索信標題 | 四種輪流：Noto Serif TC 900／Noto Sans TC 900／Courier Prime 700／Archivo Black | 逐字隨機指派，見特徵 1 |
| 內文 | Noto Sans TC 400，15.5px／1.74，`letter-spacing:.01em` | 一律銳利、可選取、不進濾鏡 |
| 標籤與數據 | Courier Prime 700，12px，`letter-spacing:.14em`，全大寫 | 黑底反白 2px 8px 的小標籤 |
| 價格與編號 | Archivo Black | `font-size:26–30px`，行高 1 |

字級 scale：`clamp(34px,8.4vw,78px)`（封面）／`clamp(24px,4.4vw,42px)`（頁標題）／`clamp(17px,2.6vw,25px)`（段落標題）／17px（品項名）／15.5px（內文）／12–13px（mono 標籤）。

**Don't**：不要用可變字型的中間字重。這個流派沒有 500、600——只有「印得出來的粗」跟「印不出來的細」。

---

## 五、版面與網格

- **沒有置中的英雄區。** 首屏應該是一件**已經印好的實物**（一本釘裝小誌、一張傳單、一面貼滿的牆），所有營業資訊直接印在那個實物上。
- 主要容器 `max-width:1120px`，左右 22px。所有紙片旋轉 `±0.7°–2.4°`；相鄰紙片旋轉方向必須相反。
- 密度：填滿。留白率控制在 25% 以下，允許元素超出容器被裁掉。
- 黑帶：至少一條橫貫版面的黑色資訊帶（`transform:rotate(-.45deg) scaleX(1.03)` 讓它超出兩側）。
- 釘裝跨頁：兩欄 grid，中縫一條 24px 的黑帶（`clip-path` 抖動邊）＋上下各一枚釘書針。

```css
.strip{background:#141210;color:#EDEAE3;font-family:'Courier Prime',monospace;font-size:12.5px;
  padding:9px 0;transform:rotate(-.45deg) scaleX(1.03)}
.spread{position:relative;display:grid;grid-template-columns:1fr 1fr;background:#F7F5F0;
  box-shadow:inset 0 0 0 3px #141210}
.spread::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:24px;
  transform:translateX(-50%);background:#141210;clip-path:polygon(/* 抖動邊 */)}
```

RWD：≤900px 導覽攤成頁首橫列；≤640px 跨頁改單欄、中縫黑帶換成虛線分隔；≤560px 紙片陰影位移縮到 4px、目錄改兩欄。**旋轉角度在手機上不要取消**——那是這個風格的骨架，不是裝飾。

---

## 六、元件配方

**導覽（copy-gen 覆印世代）**：四頁＝同一疊紙的四個世代。現用頁是第 1 代（最銳利、邊框 3.5px、右上角一枚螢光粉折角），其餘三張分別套 `ton2/ton3/ton4` 並降低不透明度到 .94／.86／.76，旋轉各異。**現用態不是被高亮，而是它比別人清楚。**

```css
.nav li.d1 a{box-shadow:inset 0 0 0 3.5px #141210;z-index:9}
.nav li.d1 a::after{content:"";position:absolute;right:-1px;top:-1px;
  border:11px solid #FF2E88;border-left-color:transparent;border-bottom-color:transparent}
.nav li.d2 a{transform:rotate(1.6deg);filter:url(#ton2);opacity:.94}
.nav li.d3 a{transform:rotate(-2.4deg);filter:url(#ton3);opacity:.86}
.nav li.d4 a{transform:rotate(3.1deg);filter:url(#ton4);opacity:.76}
```

**按鈕**：`clip-path` 剪刀邊、`inset 0 0 0 2.5px` 黑框、hover 整顆變螢光粉、`:active` 位移 2px（不是縮放）、`transition:none`。停用態變灰不變淡。

**表單**：`accent-color:#141210`；勾選項打勾後整格變螢光粉；停用項用灰字並保留原因文字（「絕版」不是灰掉就算了，要寫出它為什麼點不下去）。

**表格**：`border:2.5px solid`，表頭黑底反白 mono，hover 整列變螢光粉。

**頁尾**：整塊 `#141210`，三欄，小標用螢光粉 mono，最後一行 12px 灰字放免責聲明。

**焦點樣式**：`outline:4px solid #FF2E88;outline-offset:2px`，不要用陰影當 focus ring。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 內容 | 觸發 | 參數 |
|---|---|---|---|
| ambient 環境 | 影印機燈管掃過首屏紙面；碳粉屑貼磚緩慢漂移 | 不需輸入 | `animation:lamp 7.4s steps(19) infinite`；`drift 9s steps(9) infinite` |
| input 輸入 | 紙片 hover 翹起（多歪 1.1°、位移 −2/−3px）；品項 hover 插圖立刻跳到更高一代 | hover／focus | `transition:transform 70ms steps(3)`，延遲 <100ms |
| transition 轉場 | 「送紙」：內容由上而下逐帶推出 | 換頁載入、切跨頁、篩選 | `@keyframes feed{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0)}} .58s steps(13)` |
| signature 簽名 | 「再影印一次」：掃描條掃過整頁，掃過之處進入下一代，跨頁保存 | 按刊頭的影印鍵 | `.92s steps(21)`，於 420ms 時切換 `data-gen` |

**全部用 `steps()`，不要用 `ease`。** 機器的動作是分格的：滑架、滾筒、掃描燈管都不是平滑加速。這一條比任何顏色設定都更能決定畫面像不像影印機。

`prefers-reduced-motion` 降級：燈管停在中段靜止；漂移停止；送紙直接顯示；「再影印一次」立刻換代不播掃描條。四種降級後資訊零損失。

---

## 八、插畫與圖像風格（xerox-collage 影印二值拼貼）

零外部圖片。所有圖像由三種原語程序生成，再統一送進 `#inkN` 濾鏡：

1. **鋸齒黑塊**：矩形沿邊每 6–22px 取一點、法向抖動 ±1.3–3.6px 後閉合。所有實體（卡帶殼、小誌封面、信封、影印機）都是黑塊疊白塊疊黑塊，**不描外形輪廓線**。
2. **反白條**：白色矩形壓在黑塊上代表「印在上面的字」，寬度隨機、高度固定 4.5–9px。判準是拿掉文字仍讀得出這是一捲帶子還是一本書。
3. **碳粉屑**：value noise 兩層疊加後過門檻，落在門檻上的格子畫成 1–2px 的黑點；低於下門檻的格子以 18% 機率補一顆髒點。輸出成 150px／96px 兩張貼磚，用 `background-repeat` 鋪滿全視窗，不透明度隨世代由 .20 升到 .74。

```js
function valueNoise(seed){ const h=(x,y)=>((fnv1a(seed+':'+x+','+y)>>>8)/16777216);
  const sm=t=>t*t*(3-2*t);
  return (x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=sm(xf),v=sm(yf);
    const a=h(xi,yi),b=h(xi+1,yi),c=h(xi,yi+1),d=h(xi+1,yi+1);
    return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v;};}
```

**禁用**：`feTurbulence`＋`feDisplacementMap` 的手抖邊（那是迷幻海報的語彙，而且會糊掉字緣）、半調網點（那是普普，不是影印）、細線幾何線描、任何寫實描繪、任何 emoji。

---

## 九、Logo 與 Favicon

**Logo**：把品牌名當成勒索信處理——2–3 塊各自旋轉的紙塊，一塊黑底反白、一塊螢光底、一塊白底加黑框，加一條橫貫的黑帶（影印機掃描條）。整組套一層 `feMorphology erode 0.4`。輸出 `assets/logo.svg`，viewBox 約 `0 0 300 96`。

**Favicon**：inline SVG data URI，16px 下只能表達三件事——螢光底、黑色矩形、白色橫條（一張被影印的紙）。不要放文字，中文字在 16px 下是一團黑。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FF2E88'/%3E%3Cpath d='M4 5h24v22H4z' fill='%23141210'/%3E%3Cpath d='M7 9h18v3H7zM7 15h12v3H7zM7 21h15v3H7z' fill='%23EDEAE3'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 每一塊內容都是一張被剪下來的紙，有剪痕、有陰影、有角度。
- 標題逐字剪貼，永遠不要兩個字長一樣。
- 黑要夠多。頁尾整塊黑、至少一條黑帶。
- 動效一律 `steps()`。
- 文案用短句、講數字、講規矩、講缺點（「寄丟了我們不負責」比「用心配送」更像這個流派）。
- 承認製作過程：印了幾份、一張多少錢、誰負責跑郵局。

**Don't**
- ❌ 紫藍漸層、任何漸層
- ❌ 圓角、模糊陰影、玻璃擬態
- ❌ 置中大標＋副標＋兩顆按鈕＋三張卡片
- ❌ emoji 當 icon
- ❌ Lorem ipsum、「在當今快節奏的世界」、「把 X 變成 Y」句式、「EST. 19xx」徽章
- ❌ 灰階層次（只有黑、白、一階灰、一個螢光）
- ❌ 把內文也丟進退化濾鏡（可讀性是底線）
- ❌ `stroke-linecap:round`、`ease-in-out`、`Math.random()`
- ❌ 兩個以上的螢光色

---

## 十一、頁面骨架範例

```html
<body data-gen="1">
  <svg width="0" height="0"><defs><!-- ink1..4 / ton1..4 --></defs></svg>
  <div class="scanbar"></div><div class="grain"></div><div class="grain2"></div>

  <nav class="nav"><ol>
    <li class="d1"><a href="index.html" aria-current="page">
      <span class="g">第 1 代（原稿）</span><span class="t">目錄封面</span></a></li>
    <li class="d2"><a href="catalog.html"><span class="g">第 3 代</span><span class="t">全部品項</span></a></li>
  </ol></nav>

  <div class="wrap">
    <header class="masth">
      <a class="logo" href="index.html"><span class="ransom sml"><!-- 逐字剪貼 --></span></a>
      <div class="copier">
        <span>影印機・<span id="genread">第 1 代</span></span>
        <button class="btn" id="recopy">再影印一次</button>
        <button class="btn" id="orig" disabled>拿原稿</button>
      </div>
    </header>

    <div class="strip"><div class="in">
      <span>第 62 期</span><span>電話　(02) 2306-4417</span><span><b>不找零</b></span>
    </div></div>

    <main id="main">
      <section class="sec">
        <div class="hd">
          <h1><span class="mid ransom"><!-- 勒索信標題 --></span></h1>
          <span class="lbl">CATALOGUE　26 件</span>
        </div>
        <div class="scw" style="--rot:-1.2deg;--cut:polygon(…)">
          <div class="sc">
            <svg class="art" viewBox="0 0 200 150"><!-- 鋸齒黑塊 --></svg>
            <h3>品名</h3><p class="spec">規格</p>
            <div class="row"><span class="pr">120<span> 元</span></span><span class="wt">82g</span></div>
          </div>
        </div>
      </section>
    </main>

    <footer><div class="in"><!-- 三欄，黑底 --></div></footer>
  </div>
</body>
```

世代切換（signature）：

```js
function paintGen(g){ document.body.setAttribute('data-gen', g); }
function bump(){ const g = +document.body.dataset.gen; if (g >= 4) return;
  const bar = document.querySelector('.scanbar');
  if (matchMedia('(prefers-reduced-motion:reduce)').matches){ paintGen(g+1); return; }
  bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run');
  setTimeout(()=>paintGen(g+1), 420);
  setTimeout(()=>bar.classList.remove('run'), 980); }
```

```css
body{--xf:url(#ink1);--xo:url(#ton1);--dust:.20;--skw:0deg}
body[data-gen="2"]{--xf:url(#ink2);--xo:url(#ton2);--dust:.36;--skw:.14deg}
body[data-gen="3"]{--xf:url(#ink3);--xo:url(#ton3);--dust:.54;--skw:.3deg}
body[data-gen="4"]{--xf:url(#ink4);--xo:url(#ton4);--dust:.74;--skw:.48deg}
.wrap{transform:rotate(var(--skw))}
```

---

## 十二、技術實作與相容性

本站三項核心技術，分屬 A 渲染層／B 動效層／E 生成層。全部於 2026-08-27 查證。

### 1. SVG filter：`feMorphology` ＋ `feComponentTransfer type="discrete"`（A 渲染層）

**承載**：特徵 2 的 1-bit 影印退化、特徵 5 的麥克筆肥邊、導覽的世代差、簽名動效的四個代數。拿掉它，這個站只剩下黑白配色。

**支援現況**：MDN《\<feMorphology\>》標示 **Baseline Widely available**，「available across browsers since July 2015」；MDN 該頁另附「Filtering HTML content」範例，明確支援以 `filter:url(#id)` 對 HTML 元素套用。`feComponentTransfer` 的 `SVGComponentTransferFunctionElement` 同為 Baseline Widely available（2015-07 起跨瀏覽器），`type="discrete"` 依 `tableValues` 的項數 n 切成 n 段值域對映（`"0 0 1"` = 門檻落在 2/3）。
來源：<https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feMorphology>、<https://developer.mozilla.org/en-US/docs/Web/API/SVGComponentTransferFunctionElement>。

**兩個實作陷阱**（實測後修正）：
- `feMorphology` 同時作用於 RGB 與 alpha。不透明色塊要用 `erode` 才會「碳粉往外擴」，透明底的黑圖要用 `dilate` 才會「字變肥」。用錯會得到淺色吃掉深色的反效果。
- 濾鏡預設在 linearRGB 色空間運算，二值化門檻會偏掉。**必須加 `color-interpolation-filters="sRGB"`。**
- 空的 `<filter>` 依規格輸出透明黑。第 1 代（radius 0）不能留空，要放一個 `<feOffset dx="0" dy="0"/>` 當恆等運算。

**fallback**：瀏覽器忽略 `filter:url()` 時，插圖仍是純黑塊、標題仍是逐字剪貼的紙片、導覽仍靠旋轉與不透明度區分世代，版面與可讀性完全不變——因為所有內容在濾鏡之前就已經是 1-bit 的黑白圖形。資訊零損失。

### 2. CSS `steps()` 逐格動畫（B 動效與時間軸層）

**承載**：四種動效全部。掃描燈管 `steps(19)`、碳粉漂移 `steps(9)`、送紙轉場 `steps(13)`、簽名掃描條 `steps(21)`、紙片 hover `steps(3)`。

**支援現況**：MDN《steps()》標示 **Baseline Widely available**，2015-07 起跨瀏覽器，可用於 `animation-timing-function` 與 `transition-timing-function`。本站只用 `steps(n)` 經典寫法，未使用 `jump-start`／`jump-none` 等 Level 2 關鍵字（那組支援度較晚），因此沒有支援缺口。
來源：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/steps>。

**fallback**：不支援 `steps()` 的環境會退回 `ease`，動畫仍然發生，只是變平滑；`prefers-reduced-motion` 下四種動效各自停在資訊完整的靜態狀態。

### 3. 自寫 value noise ＋ FNV-1a／mulberry32 決定性偽亂數（E 資料與生成層）

**承載**：碳粉屑與紙纖貼磚、每一張紙的剪刀邊 `polygon()`、勒索信的逐字剪法、插圖的黑塊抖動、訂單編號。純 JavaScript，無瀏覽器 API 依賴，故無相容性問題。

**為什麼不用 `feTurbulence`**：Perlin 湍流生出來的是連續灰階雲，影印機的髒點是離散的、有最小尺寸的、成群的。value noise 過門檻後直接輸出 1–2px 的方點，才是碳粉；而且它在建置階段就算完並輸出成靜態 SVG data URI，執行期零成本。

**為什麼一定要決定性**：這是一份印刷品。同一頁重新整理應該長得一模一樣；`Math.random()` 會讓剪痕每次都變，那是螢幕效果，不是紙。

### 效能實測（Node 22 / 建置期）

| 項目 | 實測 |
|---|---|
| 最大單頁（26 件品項的目錄頁，含全部 inline CSS/JS/SVG） | **140 KB**（預算 350 KB） |
| 首頁 | 67 KB｜訂購頁 60 KB｜社務頁 53 KB |
| 首屏 JS | 只做 `setAttribute` 與四次 `querySelector`，無版面量測、無 `getBoundingClientRect`，遠低於 100ms |
| 動畫 | 全部只動 `transform`／`clip-path`／`opacity`／`top`，不觸發 layout；濾鏡為靜態，不逐幀重算 |
| 濾鏡元素數 | 每頁 30–60 個小元素套用，皆為靜態；世代切換時只換一次 CSS 變數 |
| 外部資源 | 只有 Google Fonts；零外部圖片、零音檔、零函式庫 |

**沒有 JavaScript 時**：三個跨頁全部攤開、篩選鈕隱藏、訂購頁改顯示「抄在紙上寄過來」的通訊訂購說明，四頁全部資訊皆為可選取的一般 HTML 文字。
