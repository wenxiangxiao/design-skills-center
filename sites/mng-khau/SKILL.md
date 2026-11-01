---
name: tamil-kolam-pulli
description: Tamil kolam threshold style — rice-flour granular lines on a dark wet threshold, a dot grid laid first, one closed line weaving at 45° around every dot with rounded turns and four-fold symmetry, red-ochre double borders only around the kolam, and headings hand-written in flour.
---

# 泰米爾 Kolam・pulli／sikku 一筆點陣（Tamil Kolam — Pulli & Sikku）

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（門口粉，新竹南勢的米粉寮）不同產業、但一眼看得出是 kolam 的網站。
> **本流派為既有文化視覺傳統，非自創。**坦米爾納德邦（及喀拉拉、卡納塔克、安得拉的 muggulu 等近親）的婦女每天清晨在住家門口（vaasal）潑水抹地，用米粉（arisi maavu）從指縫撒出圖樣；米粉同時是給螞蟻與鳥的食物。最常見的形制是 **pulli kolam**（先點點陣）與其中的 **sikku／neli kolam**（一條線繞過每一顆點、不碰點、最後封閉）。
> 研究參照：Gift Siromoney、Rani Siromoney、Kamala Krithivasan〈Array Grammars and Kolam〉(1974)——把 kolam 當成有語法的圖像語言；Paulus Gerdes《Lunda Geometry》(2007) 與 Slavik Jablan〈Mirror generated curves〉(*Symmetry: Culture and Science*, 1995)——鏡線曲線，a×b 點陣無鏡時圈數＝gcd(a,b)；Vijaya Rettakudi Nagarajan《Feeding a Thousand Souls: Women, Ritual, and Ecology in India — An Exploration of the Kolam》(Oxford UP, 2018)；Demaine 等人對 pulli kolam 的描述（封閉曲線把平面分成與點數相同的區域）。

---

## 設計哲學

1. **點先於線。** 頁面上所有的形，都是先有一組點、再有一條繞著點走的線。點不是裝飾，是規則：它決定線能從哪裡穿過。
2. **一筆，回到起點。** 好的 sikku kolam 是一條不斷的封閉線。網站的重點互動也應該是「把斷掉的接起來」或「繞完一圈」，不是「堆更多東西」。
3. **粉，不是墨。** 線是撒出來的顆粒，邊是毛的、厚薄隨手速走；任何像向量描邊、像螢光筆的乾淨線條都不對。
4. **每天一次。** Kolam 不被保存——早上畫、下午被踩、傍晚掃掉。介面可以誠實地「只撒一次」，靜態內容另外保證完整可讀。
5. **敬意而非異國情調。** 不畫神像、不寫祝禱、不用「神秘東方」口吻；它是一種日常的手藝與數學。

## 本風格的 5 個不可省略特徵

### ① 裝飾母題：米粉粒線（拿掉它就變成普通線稿）

線永遠是顆粒：沿路徑等距取樣，每點撒 11–40 顆 0.6–1.8px 的方粒，法向高斯散佈 σ≈線寬×0.24，透明度 .28–.9；轉彎處手慢、粉厚（顆數 × (1＋曲率×2.7)）。靜態環境用 SVG 濾鏡做「粉化」。

```js
// Canvas：一顆顆撒（固定 fillStyle、只換 globalAlpha）
for(var g=0;g<cnt;g++){var nn=gauss(r)*w*.24,tt=(r()-.5)*1.3;
  x.globalAlpha=.28+r()*.62;x.fillRect(px-ty*nn+tx*tt,py+tx*nn+ty*tt,.6+r()*1.15,.6+r()*1.15);}
```
```html
<!-- SVG：任何 stroke 都要過這個濾鏡才算 kolam 線 -->
<filter id="flour" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="5" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" result="d"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -1.05" result="m"/>
  <feComposite in="d" in2="m" operator="in"/>
</filter>
<path d="…" fill="none" stroke="#F2EEE3" stroke-width="7" filter="url(#flour)"/>
```

### ② 形狀語彙：繞點不碰點的一筆封閉線（sikku）

線只走「兩顆點之間的縫」，以 45° 斜穿；到外框或「擋住」的縫就繞著點圓轉回來；整條線封閉、每一顆點都被圍在一個圈裡；首選四向（90° 旋轉）對稱。實作用鏡線曲線模型（見〈技術實作〉）：每道縫三態——0 交叉直行、1 擋住（線折回）、2 轉彎（線穿過但轉向）。

```js
// 轉折點：擋住→沿法線往點收 0.21 格；轉彎→沿切線往來向收 0.21 格；交叉→就在縫中點
if(state===1){ if(side==='R'||side==='L') px+=dx*2*f*s; else py+=dy*2*f*s; }
else if(state===2){ if(side==='R'||side==='L') py+=dy*2*f*s; else px+=dx*2*f*s; }
// 再以封閉 Catmull-Rom 串起所有轉折點 → 自然得到 kolam 的圓轉與斜穿
```

### ③ 色彩規則：濕門檻地＋米粉白，紅赭只框 kolam

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 濕門檻 | `#1F2628` | 全站地色（潑過水的石板／抹過的地） | ≈60% |
| 乾一點的地 | `#283134` | kolam 底板、袋子、示意圖 | ≈12% |
| 米粉白 | `#F2EEE3` | 所有線、點、正文與標題（唯一的「墨」） | ≈20% |
| 粉塵灰 | `#9DA39C` | 次要文字、底稿痕（對地 6.0:1） | ≈5% |
| 紅赭 kaavi | `#B0503A` | **只**用在 kolam 外框雙邊、現用態、focus、指尖描線 | ≤6% |
| 色粉・洋紅 | `#C7366F` | 年節（Pongal）填花瓣用，只出現在品項色票 | ≤2% |
| 色粉・葉綠 | `#5C7F6A` | 同上 | ≤2% |

零漸層（點陣背景用硬邊 radial 點，不是漸層）、零陰影、零發光、零圓角卡片、零純黑純白。

```css
.kaavi{position:relative;border:3px solid #B0503A;padding:7px}
.kaavi::before{content:"";position:absolute;inset:4px;border:1.5px solid #B0503A;pointer-events:none}
```

### ④ 版面手法：點距即格線（pulli pitch），門檻居中、內容繞著它

全站間距是點距 `--p:28px`（手機 22px）的倍數；kolam 板是正方形、外框雙邊，放在首屏中欄當「門檻」，文字在左、步驟在右，不對稱。背景可以露出點陣本身。

```css
:root{--p:28px}
.pulli-bg{background-image:radial-gradient(circle,rgba(242,238,227,.16) 1.4px,transparent 1.9px);background-size:var(--p) var(--p)}
.sill-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.5fr) minmax(0,.62fr);gap:calc(var(--p)*1.5)}
.board{aspect-ratio:1/1}
```

### ⑤ 字體選擇：粉寫字（手寫體＋米粉顆粒），泰米爾文與中文並列

標題用手寫：中文 **LXGW WenKai TC**（霞鶩文楷）700、泰米爾文 **Kavivanar**；字面以 SVG 雜訊裁字成米粉顆粒。泰米爾數字（௧௨௩，Intl `nu-tamldec`）與阿拉伯數字並列在日期與編號。不用粗黑無襯線、不用等寬數字。

```css
.fl{font-family:"LXGW WenKai TC","Kavivanar",serif;font-weight:700;color:#F2EEE3}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
 .fl{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .949 0 0 0 0 .933 0 0 0 0 .89 3.4 0 0 0 -.95'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}}
```

## 色彩系統

見特徵 ③。補充：米粉白對濕門檻對比 13.3:1，正文一律米粉白；粉塵灰只給 14px 以上的次要文字。紅赭永遠以「雙線」出現（3px＋1.5px，內縮 4px），單線紅赭只用在 focus 與指尖描線。色粉只填在線圍出的空格裡，絕不畫線。

## 字體系統

- 來源：Google Fonts——LXGW WenKai TC 400/700、Kavivanar 400、Noto Sans TC 400/700（正文）、Catamaran 400/700（泰米爾與拉丁正文）。
- 字級：H1 clamp(44px,6.2vw,84px)／1.08；H2 clamp(30px,3.6vw,48px)／1.15；H3 23–26px；正文 16–18px／1.75；次要 13–14px。
- 字重：標題 700；正文 400。粉寫字只給標題與大數字，正文不加顆粒。
- 泰米爾文不翻譯成羅馬拼音當裝飾；每段泰米爾文旁都有中文意思。

## 版面與網格

- 點距 28px 為唯一節奏；段落間距 3 個點距。
- 首屏三欄 0.9 : 1.5 : 0.62（文字｜kolam 板｜撒法四步），≤980px 兩欄、≤720px 單欄且 kolam 板移到最上面。
- 零旋轉：kolam 本身已是 45° 斜線，版面不再傾斜。
- 不用「置中大標＋三張卡片」；品項是一張長紙條（字名｜說明｜價），用虛線分行。

## 元件配方

- **導覽（pulli-nav）**：三顆點並排，每顆下面是中文＋泰米爾文頁名；hover 時一圈手撒的環（SVG path，`scale(.35) rotate(-40deg)` → `none`，320ms，cubic-bezier(.3,1.4,.5,1)）以紅赭圍住那顆點；現用頁的環常駐、改為米粉白。
- **按鈕**：2px 米粉白框、無圓角；hover 底色 rgba(176,80,58,.18)、框轉紅赭；主要動作反白（米粉白底、地色字）。
- **kolam 板**：`.kaavi` 雙邊包一個 `aspect-ratio:1/1` 的 `#283134` 方塊，裡面兩層 canvas（粉層／指尖層）。
- **表單與勾選**：方形 20px 框，勾選時中心一顆紅赭點加米粉白外圈（像一顆被圈起來的 pulli）。
- **頁尾**：上緣紅赭雙線，三欄；明文標示虛構與文化引用說明。

## 動效規則

| 種類 | 本站自製實作 | 觸發 | 時間／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient | 九降風飄粉：110–140 顆散粉往西南漂（右上→左下），陣風 sin 調變 | 進入視窗；離屏、分頁隱藏即停 rAF | 連續 | 停在一個影格（散粉仍在） |
| input | 首頁：指著線，紅赭粉沿最近的 ±70 個取樣點描出路線＋指尖圈；遊戲：游標所在的縫以紅赭標出會被它接起的線與四向同步的縫 | pointermove／方向鍵 | <16ms（每次 ≤2000 點最近搜尋） | 照常（使用者自己在動） |
| transition | 掃地：點站內連結，一面帶掃帚粉痕的地色幕由右掃到左（440ms），下一頁把幕往左掃走（520ms）；結果區 `clip-path: inset()` 由上推開 700ms | 點擊／完成 | cubic-bezier(.6,0,.4,1) | 直接換頁、直接顯示 |
| signature | **撒粉一筆**：點陣一列列落下（220ms/列），指尖那撮粉以 ease-in-out 的手速沿唯一那條線撒完（首頁 9s、遊戲 7s），頭尾相接時噴一團 150 顆的粉 | 首頁載入（每天只撒一次）、遊戲按「撒這一筆」 | 9000／7000ms | 一次撒滿，資訊不少 |

### motion-library 元件（v1.28.1 @95eb095，`tools/ml-embed.js` 子集 inline 為每頁第一個 `<script>`）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| TXT-B-05 | Disintegrate | 門口 | text「昨天的門口」、colors {primary #F2EEE3, secondary #B0503A, bg #1F2628}、duration 3.2、loop:false、seed 1101、16:9 | 字散成粉再回來＝kolam 每天被掃掉、隔天重來；暗底→字色自動近白＝米粉白；零陰影零發光（transition） |
| BG-B-15 | Truchet Tiles | 門口 | colors {#F2EEE3, #B0503A, bg #283134}、duration 9、density .9、seed 1972、16:9 | 四分之一圓磚每塊只管一角、拼起來線不斷——與 kolam「每道縫只管線往哪走」同構；butt 線端、零圓角卡片（ambient） |
| BG-A-10 | Dot Matrix | 一筆 | colors {#F2EEE3, #B0503A, bg #1F2628}、duration 8、density .8、intensity .8、seed 25、16:9 | 規則點陣隨波呼吸＝「先點點」；只有點，沒有線（ambient） |
| SHP-38 | Spirograph | 一筆 | primary＝secondary＝#F2EEE3（取消它內建的兩色漸層）、bg #1F2628、duration 3.6、loop:false、seed 8、1:1 | 撒完後的「收口」玫瑰線，一筆不斷的封閉曲線，與 sikku 同一個精神（transition） |
| TXT-B-40 | Float Drift | 米粉寮 | text「九降風」、colors {#F2EEE3, #B0503A, bg #1F2628}、duration 2.6、loop:false、seed 9、16:9 | 字被風托起再落定＝九降風；無描邊無陰影（transition） |

掛載一律經 `MK.ml`（照抄 `sites/ka-to` 的 `KT.ml`）：`document.fonts.ready` 後才掛、離屏 `destroy()`、一次性文字 `loop:false` 播一次、canvas `aria-hidden`、容器內保留 `.ml-fb` HTML 標題。reduced-motion：背景 `seek(.35)`、文字 `seek(1)`。元件不擔任 signature。各元件的開發 Prompt 可由 `MotionLib.prompt(id)` 取得。

## 插畫與圖像風格

- 技法 `mirror-curve-flour`：全站沒有一張描出來的插圖——每一張「圖」都是點陣＋鏡線曲線，以米粉粒撒出或經粉化濾鏡的 SVG path。
- 小圖示（撒法四步、圖例）也用同一語彙：點、繞點的線、紅赭雙圈。
- 物件插圖（如曬米粉的竹竿）只用直線與米粉白 stroke，且一樣過粉化濾鏡。
- 不畫人、不畫神像、不畫蓮花油燈等宗教符號。

## Logo 與 Favicon 設計指南

- 標誌：3×3 點的一筆四向對稱 kolam（縫碼 `202202022220`，轉彎 8 處），米粉白線＋九顆點，外面紅赭雙邊方框，地色濕門檻。
- 字標：「門口粉」霞鶩文楷 700＋`MN̂G-KHÁU-HÚN · வாசல் மாவு` Catamaran 14px。
- Favicon：同一個 3×3 kolam，線寬加粗到 4.4、只留外框單線，inline SVG data URI。

## Do & Don't

**Do**
- 先點點、後畫線；讓點在完成圖裡仍然看得見。
- 用一條封閉線；斷了就讓使用者把它接回來。
- 線一律是顆粒；轉彎處粉要厚。
- 紅赭只框 kolam；色粉只填空格。
- 泰米爾文與中文並列、意思對得上。

**Don't**
- 不用向量乾淨描邊、螢光筆掃過、stroke-dashoffset 描線當主視覺（粉是撒的，不是畫的）。
- 不用紫藍漸層、玻璃擬態、圓角卡片、模糊陰影、發光。
- 不用 emoji、不寫「神秘東方」、不放神像與祝禱文。
- 不做「置中大標＋副標＋兩顆按鈕＋三張卡片」。
- 不用 Lorem ipsum；不用 EST. 19xx 徽章。

## 頁面骨架範例

```html
<header class="wrap top">
  <a class="brand" href="index.html"><svg><!-- 3×3 kolam 標誌 --></svg><span><b class="fl">店名</b><small>வாசல் · 副標</small></span></a>
  <nav aria-label="主要"><ul class="pulli">
    <li><a href="index.html" aria-current="page"><svg viewBox="0 0 40 40"><circle class="pd" cx="20" cy="20" r="3.2"/><path class="ring" d="M20 6.5C28.5 6.5 33.5 12.5 33.5 20C33.5 28 27.5 33.5 20 33.5C12 33.5 6.5 27.5 6.5 20C6.5 13 11.5 7.5 21.5 8.6"/></svg>門口<span class="ta">வாசல்</span></a></li>
  </ul></nav>
</header>
<section class="sill"><canvas id="wind" aria-hidden="true"></canvas>
  <div class="wrap sill-grid">
    <div class="day"><h1 class="fl">十一月一日<br>的門口</h1><p class="ta">நவம்பர் ௧</p></div>
    <figure><div class="kaavi"><div class="board"><canvas></canvas><canvas></canvas>
      <noscript><svg><!-- 粉化濾鏡的靜態 kolam --></svg></noscript></div></div></figure>
    <ol class="howto"><li><b>點點</b><span class="ta">புள்ளி</span></li></ol>
  </div>
</section>
```

## 技術實作與相容性

### 1. 鏡線曲線 kolam 引擎（E 資料與生成層：圖論與路徑追蹤）

- 模型：a×b 格、每格中心一顆點；每格四段繞點的弧（TR／RB／BL／LT），每段兩個端點。每道內部縫依狀態把兩側四個端點兩兩配對（交叉：直行；擋住：同側互接；轉彎：跨縫但上下互換），外框一律擋住。從任一弧出發沿配對走，回到原點即為一圈；圈數＝連通分量數。
- 驗證：無鏡時 5×5→5 圈、4×5→1 圈、6×4→2 圈，與 Gerdes 的 gcd(a,b) 定理一致（node 實測）。5×5 最少 4 個鏡即可成一筆；四向對稱的一筆共 14,368 種（3¹⁰ 軌道窮舉），其中轉彎 8–20 處的 4,428 種中以固定種子取 48 種作為「今日門口」輪替。
- 成本：一次圈追蹤＋幾何 0.2ms；整張重撒約 30,000 顆粒。
- 不支援：純 JS，無相容性問題；無 JS 時顯示建置時烘好的 SVG。

### 2. Canvas 2D 粉粒沉積（A 渲染層）

- `fillRect` 撒方粒、固定 `fillStyle` 只改 `globalAlpha`（避免每顆解析色字串）；dpr 上限 2。Canvas 2D 為 Baseline Widely available（MDN）。
- 首屏 JS：載入時只做圈追蹤＋點陣（<5ms），撒粉分散在 9 秒的 rAF；遊戲每次切縫的重撒在桌機約 15–30ms，低於輸入延遲 100ms 預算。
- Fallback：`getContext('2d')` 失敗 → 插入同一條線的 SVG（粉化濾鏡）；reduced-motion → 一次撒滿。

### 3. SVG 濾鏡粉化（A 渲染層：feTurbulence／feDisplacementMap／feColorMatrix／feComposite）

- 用在：noscript 靜態 kolam、門口粉袋印圖、曬米粉的竹竿與米粉簾、標誌、以及標題字的米粉顆粒（data-URI SVG 雜訊 ＋ `background-clip:text`）。
- 查證：MDN `<feTurbulence>` 與其 `baseFrequency`／`seed`／`stitchTiles` 屬性標示 Baseline Widely available（2015-07 起）；MDN `<filter>` 相容表 Safari 6 起支援 `filter` 屬性。WebKit 對「CSS `filter:url()` 套在 HTML 元素」歷來有 bug 回報，所以**本站只把濾鏡套在 SVG 元素上**；標題顆粒改走 `background-clip:text`（包在 `@supports` 內，不支援時就是純米粉白字，資訊零損失）。
- 數字：baseFrequency 1.1（線）／0.9（字），alpha 矩陣 `3.2R−1.05`：約 15% 的面積成為粉間空隙，再小就看不出是粉，再大字會斷。

### 4. 其他

- Intl：`new Intl.DateTimeFormat('ta-IN-u-nu-tamldec',{month:'long',day:'numeric',weekday:'long'})` 輸出「நவம்பர் ௧, ஞாயிறு」（node ICU 實測）；不支援時只留中文日期。
- 每日一張：日期字串經 FNV-1a 取 48 張之一；遊戲網址 `?k=` 為 40 位三進位碼，可分享還原。
- 轉場：Web Animations API（`element.animate`），不支援時直接換頁。
- 單頁大小：index 296KB、kolam 299KB、shop 290KB（含 motion-library 子集約 245KB），皆 ≤350KB。
- 同一畫面同時運轉的 motion-library 元件 ≤2。
