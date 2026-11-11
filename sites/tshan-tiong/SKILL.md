---
name: mary-blair-color-key-gouache
description: Mary Blair 1950s color-key gouache — flat opaque shapes with no outlines, one drawing repainted in "impossible" color keys per time of day, stacked childlike perspective, dot-flower motifs and hand-jittered lettering on deckled cards.
---

# Mary Blair 色彩概念畫・不透明水彩 color key

> 範例站：〈田中央兒童日營 TSHÂN-TIONG-NG〉（臺東池上）。本規格書不綁定產業：任何「同一個場景要表達不同時辰、不同心情」的品牌（營隊、童書、遊樂設施、甜點、旅宿、劇團）都可以用。

## 設計哲學

Mary Blair（1911–1978）1940–50 年代在迪士尼做 color styling（《仙履奇緣》1950、《愛麗絲夢遊仙境》1951、《小飛俠》1953 皆掛名），工具多半是不透明水彩 gouache。她的 color key 是手掌大的小畫：同一個場景畫很多張，只換顏色，就換了時辰與情緒——Ken Anderson 回憶 Walt 覺得她的 color key 強到「動畫可以少到最低限度」。之後是 Little Golden Books（《I Can Fly》1951）、1964 紐約世博的 It's a Small World、1971 Contemporary Resort 的磁磚壁畫。

所以這個風格的核心不是「可愛」，而是三件事：**形狀平、顏色說話、同一張畫可以換天色**。網頁上把它翻譯成：每個區塊都是一張 color key 小卡；同一張主畫隨捲動或時間換天色；顏色本身就是資訊（本站用顏色代替時鐘）。

## 本風格的 5 個不可省略特徵

拿掉任何一項，就不再是 Blair 式 color key。

### ① 不透明平塗、零輪廓線、邊緣是手剪手刷的
形只由色塊構成，沒有任何描邊；直邊也不准直（每邊中點偏 1–3px），紙面有乾刷露白的小斑點，小卡四邊是毛邊。
```js
// 抖動閉合形：Catmull-Rom → cubic，半徑 ±6%
function blob(cx,cy,rx,ry,seed,amp=.06,n=18){const r=rng(seed),p=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(r()*2-1)*amp;p.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k]);}return closed(p);}
```
```css
/* 乾刷斑：碎形噪聲 R>.715 的地方挖空；毛邊卡：位移過的矩形 ∩ 乾刷斑 */
--speck:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -13 0 0 0 9.3'/></filter><rect width='260' height='260' filter='url(%23f)'/></svg>");
.gouache{mask-image:var(--speck);mask-size:260px}
.card{mask-image:var(--deckle),var(--speck);mask-size:100% 100%,260px;mask-repeat:no-repeat,repeat;mask-composite:intersect}
```

### ② 一張畫、六張 color key：「不可能」的配色由時辰決定
畫只畫一次，所有 fill 都是變數；換時辰＝換一組 9 個變數。互補撞色是常態：粉天配黃綠田、黃天配孔雀藍田、紫天配靛藍田。陰影不是變暗，而是換成另一個色相。
```css
.k0{--sky:#F2A7B8;--far:#8E5FA0;--mid:#3F8E98;--field:#C3CC4E;--tree:#E07B39;--tree2:#2F8C9A;--accent:#F6D77A;--ink:#2A2027;--star:0} /* 晨 */
.k3{--sky:#E58A45;--far:#F2A7B8;--mid:#2F8C9A;--field:#B9C63B;--tree:#27305E;--tree2:#F2DA6E;--accent:#FFE7A8;--ink:#2A2027;--star:0} /* 下午 */
.k5{--sky:#232B58;--far:#3B4687;--mid:#6A3F84;--field:#1F4F55;--tree:#B9C63B;--tree2:#E8698C;--accent:#F2DA6E;--ink:#F4E6CC;--star:1} /* 夜 */
.p-sky{fill:var(--sky)} .p-field2{fill:color-mix(in oklab,var(--field),#000 11%)} /* 同色加深只用 color-mix，不用陰影 */
```

### ③ 平面童稚透視：遠的往上疊、不縮小、帶子不收斂
零消失點。山、田、路是一條條傾斜色帶往上疊；路（伯朗大道）從左下到右上**同寬**；房子歪 4°；樹是棒棒糖、甜筒錐、圓頂，一排同大。
```svg
<!-- 田：傾斜色帶，左右同高差、不收斂 -->
<path class="p-field" d="M-30 420 L1230 386 L1230 432 L-30 466Z"/>
<!-- 路：同寬帶子往上走 -->
<path class="p-road" d="M150 800 L250 800 L790 430 L730 430Z"/>
<g transform="rotate(-4 330 480)"><!-- 歪的小屋 --></g>
```

### ④ 小點母題：點花、點葉、四芒星、平塗鳥
裝飾全由小圓點組成：花＝圓心＋五個抖動圓瓣；樹冠上 7 個淡點；星是四芒彎星；鳥是兩道弧合成的一片平塗。不畫寫實細節。
```js
function flower(x,y,s){let o='';for(let i=0;i<5;i++){const a=i/5*Math.PI*2-Math.PI/2;o+=`<path class="p-fl1" d="${blob(x+Math.cos(a)*s,y+Math.sin(a)*s,s*.72,s*.72,i,.1,10)}"/>`;}return o+`<path class="p-sun" d="${blob(x,y,s*.55,s*.55,9,.08,10)}"/>`;}
const star4=(x,y,s)=>`M${x} ${y-s}Q${x+s*.18} ${y-s*.18} ${x+s} ${y}Q${x+s*.18} ${y+s*.18} ${x} ${y+s}Q${x-s*.18} ${y+s*.18} ${x-s} ${y}Q${x-s*.18} ${y-s*.18} ${x} ${y-s}Z`;
```

### ⑤ 手寫歪字＋釘在板上的小卡
標題每個字各自轉 −3°～3°、上下跳 ±3px（以字碼雜湊決定，同字同歪），極粗黑體＋圓潤拉丁字。版面是一張奶色板上釘著一排 color key 小卡，奇偶張各歪 ±2°。
```js
el.innerHTML=[...s].map((c,i)=>{h^=c.charCodeAt(0)+i*31;h=Math.imul(h,16777619)>>>0;return `<i style="--r:${((h%61)-30)/10}deg;--y:${((h>>>8)%7)-3}px">${c}</i>`;}).join('');
```
```css
.hand>i{display:inline-block;font-style:normal;transform:translateY(var(--y)) rotate(var(--r))}
.script li:nth-child(odd) a{transform:rotate(-2.5deg)} .script li:nth-child(even) a{transform:rotate(2deg)}
```

## 色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 色板奶白 board | `#F4E6CC` | 頁面底（gouache 白）、內文小卡 | 35% |
| 色板深 board2 | `#EADAB8` | 導覽欄、表格虛線 | 5% |
| 墨 text | `#2A2027` | 內文、亮天色上的字 | 8% |
| 天粉 | `#F2A7B8` | 〈晨〉天色、清空鈕 | 各天色合計約 50%（隨所在時辰） |
| 黃綠 | `#B9C63B`／`#C3CC4E` | 田、樹 | |
| 孔雀藍 | `#2F8C9A` | 山、田、次要鈕 | |
| 柿橘 | `#E07B39`／`#E58A45` | 主要鈕、〈下午〉天色 | |
| 金黃 | `#E8B93A`／`#F2DA6E` | 太陽、〈中午〉天色、結果板 | |
| 葡萄紫 | `#7A4A8C` | 〈黃昏〉天色 | |
| 夜靛 | `#232B58`／`#27305E` | 〈夜〉天色、footer | |

六張 color key（9 變數）見特徵②；另有 `.kU` 奶色底稿（全部變數為奶色系 #E3D2B0–#F4E9D2）：還沒上色的卡。規則：**任何畫面上的同色加深只用 `color-mix(in oklab, X, #000 ≤12%)`；不用陰影、不用漸層、不用透明度疊色。** 唯一的 opacity 是星星（`--star` 0 / .35 / 1）。

## 字體系統

- 中文：Noto Sans TC（Google Fonts）900 標題、700 標籤、500 內文。
- 拉丁：Grandstander 800（圓潤童書手寫感），只用在英文副標與時刻。
- motion-library 文字元件用 Unbounded 800（元件預設，中文回落 Noto Sans TC）。
- Scale：h1 `clamp(38px,5.4vw,78px)`／h2 26–36px／內文 16px 行高 1.75／小字 13–14px。標題一律套 `.hand`。

## 版面與網格

- 左側固定 112px 導覽欄（≤860px 變成底部 88px 橫條）。
- 首頁：`section.day` 內 sticky 主畫滿版（100vh），左下釘六張 color key（6 欄、gap 12px），右側 300px 章節卡隨捲動經過；整個 section 高約 6 個畫面。
- 卡片旋轉 ±1–2.5°、交替；hover 回正並上抬 3–8px（彈簧 cubic-bezier(.3,1.6,.5,1)）。
- 留白：區塊上下 90px、左右 6vw；手機 60px／18px。
- 零圓角（除了圖釘與規則編號圓點），零陰影。

## 元件配方

- **導覽（color-key pin nav）**：三張釘著的迷你主畫，各在自己的天色；非現用頁 `filter:saturate(.25) brightness(1.08)`（像還沒上色），hover 恢復；現用頁回正變大。圖釘是 12px 柿橘圓點。
- **按鈕**：平塗色塊、`rotate(-1.5deg)`，hover `rotate(1deg) scale(1.04)`，無邊框無陰影。
- **卡片**：`.card` 毛邊＋乾刷遮罩；內容卡底色 `#F4E6CC`，資訊卡可用天色當底。
- **表單**：步進器＝墨色方鈕＋奶色輸出；勾選框 `accent-color:#7A4A8C`。
- **footer**：夜靛底、奶色字、金黃連結。

## 動效規則

| 種類 | 實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 樹 `rotate(±1.8deg)` 以底部為軸、風箏擺盪、火車沿山腳走 | 持續 | 4.4–6.8s ease-in-out alternate；火車 46s linear | 全停，火車停在畫中 |
| input | 章節卡／色彩腳本卡 hover 上抬；活動卡拖曳 ghost 跟手（每幀）；天色籤按下即刷色 | hover／pointer | .15–.2s cubic-bezier(.3,1.6,.5,1) | 保留位移，取消刷色動畫（直接換色） |
| transition | **捲動換天色**：`animation-timeline: --day`（view timeline）驅動 @property 顏色補間，六段之間各 7% 混色；**潑色換頁**：下一頁天色的乾刷色團以 `clip-path: circle()` 從點擊處潑開 .52s，抵達頁由上往下流掉 .62s | 捲動／點連結 | linear（隨捲動）／cubic-bezier(.6,0,.3,1) | 不支援 scroll-driven 時 IntersectionObserver 換 class＋.9s 過渡；RM 時直接換、無潑色 |
| signature | **刷上天色 brush-wash**：一把 42 根鬃毛長短不一的刷子遮罩（300%×100%，左 1/3 全塗、中 1/3 鬃毛、右 1/3 空）由右刷到左，把底稿刷成 color key；首頁載入時奶色底稿被刷掉、〈排一天〉卡片放進天色時被刷上、〈活動卡〉點天色時整排卡被刷成那個時辰 | 載入／放卡／點天色 | .9s（放卡）／1.4s（首頁）cubic-bezier(.45,.05,.3,1) | 不播，直接是上色後的狀態 |

自我限制：不用淡入當進場、不用數字計數、不用陰影按壓。

### motion-library 元件表

來源：`wenxiangxiao/motion-library` v1.38.0 @e1382805，`tools/ml-embed.js` 逐頁產生子集、terser 壓縮，inline 成每頁第一個 `<script>`；掛載走 `TT.ml`（等字型、離屏 destroy、一次性 `loop:false`、reduced-motion 背景 `seek(.35)`／文字 `seek(1)`）。開發 Prompt 可由 `MotionLib.prompt(id)` 取得。

| 頁 | ID | 名稱 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| index | TXT-B-18 | Letter Bounce | text「一天是六種顏色」、primary #E07B39、secondary #2F8C9A、bg #F4E6CC、duration 2.2、once、16:9、seed 6 | transition | 創辦人段落標題逐字彈落、落地壓扁——童書手寫字的跳動；只畫平塗字，零 glow；奶色亮底→字色自動近黑 |
| index | BG-A-06 | Dizzy Stars | primary #F2DA6E、secondary #E8698C、bg #232B58、duration 9、density 1.4、intensity .9、16:9、seed 19 | ambient | 〈夜營〉夜靛帶裡的五角星繞圈與閃點＝《小飛俠》式深藍星夜；星星平塗；唯一一條 15% 軌道細線視為鉛筆底稿，不構成輪廓 |
| day | TXT-B-09 | Wave Letters | text「十二張活動卡」、primary #E8698C、secondary #2F8C9A、bg #F4E6CC、duration 3.2、loop、intensity .8、16:9、seed 4 | ambient | 頁首標題像稻浪一樣一波波起伏，浪頭字轉粉紅；平塗字、零陰影 |
| day | BG-B-32 | Pinwheels | primary #F2DA6E、secondary #27305E、bg #E58A45、duration 6、density .7、1:1、seed 12 | ambient | 〈下午的風〉橘底上一格格三角風車依序轉——風車就是 Blair 式平塗三角；零漸層零圓角 |
| plan | TXT-A-02 | Letter Sequence | text「一天，六種天色」、primary #7A4A8C、secondary #E07B39、bg #F2DA6E、duration 1.8、once、16:9、seed 3 | transition | 規則卡上方的標題逐字浮上，按「這樣報名」時重播一次；金黃亮底→字近黑 |

同一畫面同時運轉 ≤2 個元件；元件皆不擔任 signature。

## 插畫與圖像風格

全站零點陣圖。主畫〈池上縱谷一天〉1200×760 與 12 張 200×140 活動小畫都在建置期由 node 產生 `<symbol>`，每個形都是抖動閉合路徑，fill 一律是 `class` → 變數，所以同一個 `<use href="#scene">` 放在 `.k0`～`.k5` 底下就是六張 color key。母題清單：棒棒糖樹（樹幹＋圓冠＋7 淡點）、甜筒錐樹、四芒星、平塗鳥、菱形風箏＋點尾、點花、三節火車、歪小屋。人物不畫（避免變成任何既有角色）。

## Logo 與 Favicon 設計指南

一張毛邊奶色小卡上六條手刷色帶（＝林老師黑板上的六條色帶＝六張 color key）＋右上一顆抖動太陽＋左上一支小小的柿橘頭畫筆。全部平塗、零描邊；favicon 為同一 SVG 的 data URI。

## Do & Don't

**Do**：一張畫只畫一次、換色不換形；用顏色傳遞時間或情緒；讓遠景往上疊；所有直線帶一點手抖；每張卡毛邊。
**Don't**：描邊或 1px 外框；陰影、漸層、玻璃、發光；寫實透視與消失點；把人物畫成任何現成卡通角色、或使用迪士尼名稱與標誌當品牌；emoji icon；紫藍漸層 hero；置中三卡片；Lorem ipsum；「EST. 19xx」徽章。

## 頁面骨架範例

```html
<nav class="pins"><a href="index.html" aria-current="page"><div class="card k0"><svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice"><use href="#scene"/></svg></div>營</a>…</nav>
<section class="day" style="view-timeline:--day block">
  <div class="stage" style="position:sticky;top:0;height:100vh;animation:dayk linear both;animation-timeline:--day;animation-range:contain 0% contain 100%">
    <div class="paint gouache"><svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice"><use href="#scene"/></svg></div>
    <div class="under kU unwash"><svg …><use href="#scene"/></svg></div>  <!-- 載入時被刷掉的底稿 -->
    <h1 class="hand">田中央兒童日營</h1>
    <ol class="script"><li><a href="#c0"><div class="card k0"><svg …><use href="#scene"/></svg></div><b>晨</b></a></li>…</ol>
  </div>
  <div class="chapters"><article class="chap card" id="c0">…</article>…</div>
</section>
```

## 技術實作與相容性

| 技術 | 本站承載什麼 | 支援現況（查證） | fallback |
|---|---|---|---|
| **CSS scroll-driven animations**（`view-timeline` + `animation-timeline` + `animation-range: contain`）＋ **@property `<color>` 補間** | 首頁主畫隨捲動走過一天的六張 color key（特徵②的本體） | Chrome/Edge 115、Safari 26、Firefox 159 起預設開啟，2026-10 成為 Baseline Newly available（web.dev〈New to the web platform in October〉2026-10-29，相容資料取自 MDN animation-timeline） | `@supports not (animation-timeline:view())`：取消動畫，IntersectionObserver 依所在章節替 `.stage` 換 `.k0`～`.k5`，@property 讓 `transition:--sky .9s…` 仍平滑；不支援 @property 則瞬間換色，資訊不變 |
| **CSS `mask-image` + SVG `feTurbulence` data URI**（多層 `mask-composite: intersect`） | 乾刷露白斑、毛邊小卡、刷子鬃毛遮罩（特徵①與 signature） | MDN 標示 `mask-image` 為 Baseline 2023（2023-12 起各主流瀏覽器）；另加 `-webkit-` 前綴給舊 Safari | 不支援時形狀完整顯示、沒有斑點與毛邊；刷色動畫變成直接換色 |
| **規則引擎＋回溯求解**（`TT.why`／`TT.solve`，決定性 xorshift 順序） | 〈排一天〉判斷卡放不放得進那段天色、說出理由；「幫我排」找出全部合規的一天 | 純 JS，無相容性問題 | 無 JS 時顯示電話請老師代排（noscript）；〈活動卡〉頁為建置期靜態 HTML |

輔助：`Intl.DateTimeFormat(…,{timeZone:'Asia/Taipei'})` 決定「此刻池上是哪一張」；`sessionStorage` 把排好的一天帶回首頁；`color-mix(in oklab)`（Baseline 2023）做同色加深。

**效能實測（node 22，jsdom）**：回溯求解 36 種年齡／早到／夜營組合全部跑完 19.5ms（單次 <1ms）；首屏站內 JS 只做拆字與 IO 註冊。每頁 281–284KB（motion-library 子集 terser 後約 172KB、建置期 SVG symbol 約 76KB）≤350KB。主畫的環境動效只動 `transform`；遮罩只在刷色那 0.9s 內位移。同一畫面運轉元件 ≤2。jsdom 不做繪製：遮罩與 scroll-driven 的視覺效果依規格查證，本次建置環境未能截圖實測。
