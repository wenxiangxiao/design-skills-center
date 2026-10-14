---
name: pennsylvania-german-fraktur-taufschein
description: Pennsylvania German Fraktur folk-art documents (c.1750–1850 birth & baptism certificates, Vorschriften) — a bilaterally mirrored sheet on laid paper, a central heart that holds the text in lines that shorten with the heart's curve, a fixed motif vocabulary of three-lobed tulips in pots, facing distelfinks, compass-drawn rosettes, crowns and pomegranates, transparent watercolor washes in four pigments that bleed past iron-gall ink outlines and pool at their edges, broken-stroke Fraktur blackletter with a hatched boxed initial, and the structure of a fill-in form that is folded in four.
---

# 賓州德裔 Fraktur 出生書・Pennsylvania German Fraktur

- **era**：1750–1850 賓夕法尼亞東南部（Lancaster、Berks、Lehigh、Northampton 各郡）× 1957 花蓮門諾醫院 × 2026
- **locale**：移民家庭的家用聖經、學校老師與流動書手的桌面、花蓮民權路巷口
- **voice**：證書的公文體＋一句祝福——「生於中華民國一一五年十月十四日卯時，在花蓮市」「願此女如鬱金香之直」
- **texture**：簾紋紙（chain lines＋laid lines）、鐵膽墨線微抖、透明水彩溢線與邊緣積深、圓規針孔、十字摺痕、狐斑
- **density**：中——母題填滿四周，心內是唯一的文字區
- **function**：〈寫一張〉填空＋挑母題＋看書手照顏料順序上彩，得到可分享網址與 SVG 草稿
- **技術**：SVG 濾鏡鏈水彩洗（A）・View Transitions 沿摺痕翻摺（B）・決定性生成＋URL 狀態序列化＋心形版心排字（E）

## 1. 設計哲學

Fraktur 不是「民俗花紋」，是**一張要被填寫、被摺起來收好的文件**。十八世紀賓州德裔移民的學校老師與流動書手（Johann Henrich Otto、Christian Strenge、Friedrich Krebs、無名的 Sussel-Washington Artist……）替人寫出生受洗證書 Geburts- und Taufschein、寫字範本 Vorschrift、書籤 Bücherzeichen；印刷所後來賣只印墨線的空白表格，由書手填名上色。所以它同時有三種身分：

1. **證件**——誰、父母、何時、何地、誰寫的，每一格都要在。
2. **鏡像的花園**——中線扎一個針孔，左半畫好右半照鏡子；所有母題從盆子或藤長出來，不懸空。
3. **手工的痕跡**——圓規針孔不擦、水彩溢出墨線、顏色一罐一罐上、紙摺四摺留下十字痕。

規格書的任務是把這三種身分同時做進網頁：版面必須對稱、圖必須是有限母題的組合、顏色必須是透明的洗而非平塗、而且整件事要「可以被填寫」。

## 2. 色彩系統

| Token | Hex | 用途 | 面積 |
|---|---|---|---|
| `--paper` | `#EFE3C6` | 頁面底：簾紋紙 | 45% |
| `--paper-hi` | `#F6EDD6` | 出生書紙面、按鈕次級底 | 18% |
| `--paper-lo` | `#E2D1AA` | 頁尾、紙背 | 4% |
| `--ink` | `#3B2A1E` | 鐵膽墨：所有輪廓、字、點。**唯一線色，不用純黑** | 8% |
| `--ink-2` | `#6A5038` | 次級文字（褪色墨） | — |
| `--graph` | `#8D8577` | 鉛筆：圓規作圖圓、尺線 | <1% |
| `--v` | `#C9402A` | 銀朱 Zinnober：中瓣、雀帽、首字方框、現用態 | 18–24%（圖內） |
| `--y` | `#E2A42C` | 藤黃 Gummigutt：心的夾層、雀身、側瓣——圖內最大面積 | ~25%（圖內） |
| `--g` | `#4E8A63` | 銅綠 Grünspan：**所有**葉、莖、翅，沒有例外 | ~18%（圖內） |
| `--b` | `#2F4C7C` | 普魯士藍 Preußischblau：盆、雀尾、星；選配第五色 | <8% |

規則：四色只以**透明洗**出現（`opacity .6–.65`＋邊緣積深），網頁 UI 的實色只准用在按鈕（銀朱）與小型菱形標記；不得出現漸層、霓虹、純白、純黑。狐斑（`#C9A46A` 低透明圓點）每屏 ≤3 個。

## 3. 字體系統

| 角色 | 字體（Google Fonts） | 用法 |
|---|---|---|
| 德文標題、年份、副標 | **UnifrakturMaguntia** 400 | 斷筆哥德體。雙橫線 `=` 當連字號（`Geburts= und Namen=Schein`） |
| 中文全部 | **LXGW WenKai TC** 400/700 | 書手的楷——心內正文 400、名字 700 |
| 拉丁數字、價格 | **IM Fell English** | 十八世紀活字感；價格右對齊 |

字級：頁標 `clamp(30px,4vw,46px)`、區塊標 `clamp(24px,3.2vw,34px)` 並配同大小的 Fraktur 德文副標（銀朱色）、正文 17px/1.85、旁註 14px/1.7。中文字距 `.06–.16em`；Fraktur 不加字距。**禁止**用 Fraktur 排長段落或中文。

## 4. 版面與網格

- **出生書版心**：`viewBox 0 0 800 1000`（直式、約 Taufschein 的 4:5）。外框 inset 26/48 兩道墨線之間是菱形帶；四角 118px 處放角花；頂部 y≈70–110 是 Fraktur 標題列，y≈160–300 頂飾＋對雀；中央心形 `cx 400, cy 470`；兩側花盆底在 y=800、高 430；底部 y 830/872/914 三條鉛筆尺線寫日期、書手、德文落款。
- **鏡像**：所有側邊母題以 `transform="translate(W−x, y) scale(-1,1)"` 複製；兩份共用同一個 `data-k`，所以互動與動畫天生成對。
- **頁面**：左側固定 118px 的鬱金香莖導覽；主欄 `grid-template-columns: minmax(0,680px) minmax(220px,300px)`——**出生書本身對稱，頁面不對稱**：右邊是「旁註」欄，像書手在紙邊寫的筆記。
- 分區標題：`中文標題＋Fraktur 德文＋延伸到右邊界的一條墨線`；區塊邊界用「雙線上下框」（2px＋內 1px）。
- 禁止旋轉。Fraktur 的力量來自正、直、對稱；唯一的「斜」是首字方框裡的 45° 斜格與菱形。

## 5. 元件配方

- **鬱金香莖導覽 tulip-stem**：左側固定欄，一根綠洗莖（`stroke:#4E8A63 6px` 疊 `1.6px` 墨線）由底部花盆往上，四朵鬱金香各是一頁；未到訪是「印好未上彩」的墨線花，hover／focus／現用頁時三瓣上色（`.nf{opacity:0→.88}`，90ms）。現用頁的花以花底為軸 ±3° 擺動。≤900px 攤平為底部四格。
- **按鈕**：銀朱實底＋2px 墨框＋內 1px 淺線（`::before inset:3px`）＋3px 硬偏移影；按下位移 2px。次級鈕紙底。
- **表單**：只有底線（1.5px 墨），聚焦時底線轉銀朱、底色藤黃 12%——像在證書的空格上填字。
- **選項卡**：小方格內放已上色的母題樣張；選中＝2px 墨框＋底部 4px 銀朱內影。
- **表格（價目／時間）**：首列上方 2px 墨線，其餘 1px 35% 墨線；價格 IM Fell 右對齊。
- **首字方框 Zierbuchstabe**：`2.3em` 方塊、銀朱底、雙向 45° 細斜格、2px 墨框＋1px 外框 offset 3px，Fraktur 首字紙色。
- **收執聯**：雙框（2px＋outline 1px offset 4px）紙面卡，左側一枚小心形印記。
- **頁尾**：紙背色 `--paper-lo`、2px 墨線上框、四欄地址／時間／頁面／出處。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 內容 | 觸發／參數 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 對雀啄食：兩隻金翅雀以腳為軸低頭兩次；頂花 ±2.4° 擺動；現用導覽花擺動 | SMIL `animateTransform type=rotate`，`dur 5.6s`、`keyTimes 0;.46;.54;.62;.7;.78;1`；頂花 7.8s；注入到每一層的同一個局部座標，所以墨線與洗色同步、鏡像自動對稱 | 不注入 SMIL、CSS 擺動關閉 |
| input 輸入 | 滑過／聚焦任何母題，它和鏡像那一份**同時**上色並留著；旁註 hover 也會點亮對應母題；寫一張頁的每一格輸入即時重排心內字 | `pointerenter`/`focus` → `.lit .f{opacity:1}`，transition 90ms linear | 同樣上色（狀態變化非位移） |
| transition 轉場 | 換頁＝舊頁沿橫向摺痕往後摺走、新頁從摺痕翻開；換母題／換顏料＝同文件 view transition 交叉 | `@view-transition{navigation:auto}`；old `.38s cubic-bezier(.55,0,.8,.3)` rotateX(78°) scaleY(.6)；new `.42s .18s cubic-bezier(.2,.7,.3,1)` | `::view-transition-*{animation:none}`，`vt()` 直接換 |
| signature 簽名 | **逐色上彩**：鉛筆圓規 → 鐵膽墨由上而下逐母題 → 銀朱一遍、藤黃一遍、銅綠一遍、（普魯士藍）——每一遍整張該上這色的區塊依高度依序「暈開」：`scale(.5)→1.07→1`、opacity 0→.92→1、640ms、`cubic-bezier(.2,.7,.3,1)` → 心內字逐行浮現 → 十字摺痕閃現 | Web Animations；每色 span ≤1250ms；狀態列同步說「正在上：銀朱」與色罐 | 直接成品＋文字記錄順序「鉛筆 → 墨 → 銀朱 → 藤黃 → 銅綠 → 字 → 摺」 |

自我限制：本風格**不用**淡入滾動揭示、不用視差、不用數字計數——Fraktur 的動作只有「畫」與「摺」。

## 7. 插畫與圖像風格（fraktur-wash 鐵膽墨線＋透明洗）

- 每個母題同時輸出三層：**鉛筆層**（作圖圓、針孔、尺線；opacity .42）、**洗色層**（依顏料分組）、**墨線層**（1.8px、圓頭圓角、輕微 feDisplacementMap 1.6 的手抖）。洗色在墨線**下面**，而且故意對不準。
- 母題詞彙（不可擴充成任意花草）：三瓣鬱金香（中瓣朱、側瓣黃、三道條紋、綠萼）、金翅雀 Distelfink（黃身紅帽綠翅藍尾，腳下一條棲木）、六瓣圓規花（六個以圓周點為圓心的弧＝花瓣）、旋輪、八角星、王冠、石榴（朱皮黃窗點籽）、心（雙線夾黃）、鬱金香盆、石榴藤、星藤。
- 所有變化由種子決定：花瓣捲度、側枝 3 或 5 朵、雀尾長、翅鱗數、藤的擺幅——同一個名字＋生日＋時辰永遠畫出同一張。
- 裝飾點：心的內線是 40 顆墨點；外圈扇貝是交替朱綠的小圓。

## 8. Logo 與 Favicon

Logo：一顆雙線藤黃心，中央立一朵三瓣鬱金香，左右兩隻金翅雀面對面坐在心的下緣，墨線 2.4px。Favicon：簾紋紙方塊上的藤黃心＋朱色中瓣＋兩片綠葉，inline SVG data URI。不得使用任何文字作 favicon。

## 9. Do & Don't

- **Do**：左右對稱到像素；顏色溢線；保留針孔與摺痕；名字寫進心裡；德文標題用 `=` 連字號；文案是公文體＋一句祝福；給一份「心內文字抄本」作可讀版本。
- **Don't**：不要把四色做成實色平塗（那是 Folk-woodblock 或 Matisse 剪紙）；不要漸層、陰影、霓虹、紫藍；不要把母題換成玫瑰、蓮花等詞彙外的花；不要 emoji；不要 Lorem ipsum；不要用 Fraktur 排中文或長段落；不要在證書上放經文（除非業主要求）；不要置中三卡片與 EST. 徽章；不要把頁面整個做成對稱——對稱屬於那張紙，頁面要有旁註的呼吸。

## 10. 本風格的 5 個不可省略特徵

### ① 中線鏡像對稱（拿掉它就只是一張花草插畫）
左半畫好，右半 `scale(-1,1)` 複製；兩份共用 `data-k`，互動與動畫天生成對。

```svg
<g data-k="pair" transform="translate(250,292)"><g class="a">…bird…</g></g>
<g data-k="pair" transform="translate(550,292) scale(-1,1)"><g class="a">…same bird…</g></g>
```

### ② 有限母題詞彙：三瓣鬱金香、金翅雀、圓規花、心、王冠、石榴（拿掉它就是一般民俗風）
圓規花的花瓣不是畫出來的，是「以圓周點為圓心再畫圓」重疊出的透鏡：

```js
for(let i=0;i<6;i++){const a=i*Math.PI/3-Math.PI/2,px=r*Math.cos(a),py=r*Math.sin(a);
  d+=`M0,0 A${r},${r} 0 0 1 ${px},${py} A${r},${r} 0 0 1 0,0Z`;} // 每瓣交替 銀朱／藤黃
```

### ③ 透明水彩洗：溢線、邊緣積深、四罐顏料（拿掉它就是向量平塗）
```svg
<filter id="wash" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feMorphology in="d" operator="erode" radius="1.8" result="e"/>
  <feComposite in="d" in2="e" operator="out" result="rim"/>          <!-- 邊緣一圈＝積深 -->
  <feTurbulence type="fractalNoise" baseFrequency="0.9" result="gr"/>
  <feColorMatrix in="gr" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -0.9 1.15" result="gm"/>
  <feComposite in="d" in2="gm" operator="in" result="body"/>         <!-- 顏料顆粒 -->
  <feComponentTransfer in="body" result="a"><feFuncA type="linear" slope="0.62"/></feComponentTransfer>
  <feMerge><feMergeNode in="a"/><feMergeNode in="rim"/></feMerge>
</filter>
<g fill="#C9402A" filter="url(#wash)">…所有銀朱區塊…</g>  <!-- 在墨線層「下面」 -->
```

### ④ Fraktur 斷筆標題＋斜格方框首字（拿掉它就沒有德裔文書的聲音）
```css
.cap-ini{float:left;width:2.3em;height:2.3em;display:grid;place-items:center;font:2em/1 "UnifrakturMaguntia";
  color:#F6EDD6;background:#C9402A;border:2px solid #3B2A1E;outline:1px solid #3B2A1E;outline-offset:3px;
  background-image:repeating-linear-gradient(45deg,transparent 0 6px,rgba(59,42,30,.35) 6px 7px),
                   repeating-linear-gradient(-45deg,transparent 0 6px,rgba(59,42,30,.35) 6px 7px)}
h2 + .fk{font-family:"UnifrakturMaguntia";color:#C9402A}  /* 中文標題後面永遠跟一個德文詞 */
```

### ⑤ 一張要填的表格：心形版心、尺線、十字摺痕（拿掉它就是海報）
心內的字行以心形多邊形求每條基線的弦長，一行比一行短；放不下就縮字級重排，不刪字：

```js
function chord(poly,y){const xs=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];
  if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))xs.push(a[0]+(y-a[1])/(b[1]-a[1])*(b[0]-a[0]));}
  xs.sort((m,n)=>m-n);return xs.length>1?[xs[0],xs.at(-1)]:null;}
// 名字拆進兩個心瓣：姓在左瓣、名在右瓣；正文從瓣下最寬處開始
```
```css
.folds path{stroke:#3B2A1E;opacity:.07} /* M400,0 V1000 與 M0,500 H800：摺四摺 */
.rule{stroke:#8D8577} /* 底部三條鉛筆尺線：日期、書手、德文落款 */
```

## 11. 頁面骨架範例

```html
<nav class="stem-nav"><svg class="stalk">…綠莖與花盆…</svg>
  <ol><li style="top:9%"><a href="index.html" aria-current="page"><svg class="nt">…鬱金香…</svg><span class="lb">出生書</span><span class="de">Schein</span></a></li>…</ol></nav>
<main class="wrap">
  <div class="topline"><span class="brand">雙雀命名所<span>Zwei Vögel</span></span><span>地址・電話</span></div>
  <div class="lead">
    <div class="sheet-col"><svg class="sheet" viewBox="0 0 800 1000">
      <g class="gr">鉛筆</g><g class="wl">洗色（依顏料分組，各掛 wash 濾鏡）</g>
      <g class="ink">墨線</g><g class="tx">Fraktur 標題／心內字／尺線字</g><g class="folds"/><g class="hits">每個母題一個可聚焦熱區</g></svg>
      <button class="btn">請先生上彩</button><details>心內文字抄本</details></div>
    <aside class="margin"><h2>旁註 <span class="fk">Randnoten</span></h2>…五條 .mn…</aside>
  </div>
  <section><div class="sec-h"><h2>這張紙從哪裡來</h2><span class="fk">Vorschrift</span></div>…</section>
</main>
```

## 12. 技術實作與相容性

| 技術 | 本站承載 | 支援現況與查證 | Fallback |
|---|---|---|---|
| **SVG 濾鏡鏈** feTurbulence → feDisplacementMap → feMorphology(erode) → feComposite(out) → feMerge（A 渲染層） | 特徵③：洗色溢線、邊緣積深、顏料顆粒；墨線手抖 | MDN：`<feTurbulence>`、`<feDisplacementMap>`、`<feMorphology>`、`<feComposite>` 皆 Baseline Widely available | 濾鏡失效時為乾淨的半透明平塗，墨線照常 |
| **View Transitions API**（B 動效與時間軸層） | 跨文件：`@view-transition{navigation:auto}` 舊頁沿摺痕翻走；同文件：`document.startViewTransition()` 換母題／顏料／重畫母題簿樣張 | caniuse〈View Transitions (cross-document)〉：Chrome/Edge 126+、Safari 18.2+；Firefox 143 預設關閉、144+ 標為 partial。同文件 `startViewTransition`：Chrome 111+、Safari 18+、Firefox 144+ | 以 `if(document.startViewTransition)` 偵測；不支援即直接換頁／直接換 DOM，資訊零損失 |
| **決定性生成＋URL 狀態序列化＋心形版心排字**（E 資料與生成層） | FNV-1a(姓＋名＋生日＋時辰) → mulberry32，決定每一筆母題變化；`URLSearchParams` 把 16 個欄位寫進網址，`&p=1` 開啟即為畫好的成品；心形多邊形求弦長逐行排字 | `URLSearchParams`、`history.replaceState`：MDN Baseline Widely available | 建置期以 node 執行同一份 gen.js 產生預設稿，無 JS 也看得到完整出生書 |
| 輔助：SMIL `animateTransform`、Web Animations、`transform-box: fill-box` | ambient 啄食；簽名逐色上彩；每塊洗色從自身中心暈開 | 三者皆為現行瀏覽器廣泛支援的既有標準 | 無 `Element.animate` 時直接成品 |

**效能實測（建置環境 node 22）**：整張出生書產生 8 ms／64 KB SVG；頁面大小 index 123 KB、write 175 KB、muster 120 KB、visit 58 KB（皆含全部 inline CSS/JS/SVG，≤350 KB）。瀏覽器端：首頁出生書為建置期預渲染、首屏 JS 只綁事件與注入 SMIL；寫一張頁載入時重渲染一次（同一函式，node 實測 8 ms）。簽名動畫期間只動 `opacity`/`transform`，四個濾鏡組各自重繪；每色 span ≤1250 ms、總長約 7–9 秒，可隨時「跳到上完」。*註：本次建置沙箱無法下載瀏覽器，上述 60fps 目標未經真機量測，Chrome 需留意大面積濾鏡在低階手機的重繪成本——必要時把 `numOctaves` 降為 1。*

查證來源：caniuse.com/cross-document-view-transitions；developer.chrome.com/docs/web-platform/view-transitions/cross-document；MDN SVG filter primitives 與 URLSearchParams 頁；Free Library of Philadelphia 數位館藏〈Birth and Baptismal Certificate (Geburts und Taufschein) for Maria Elisabetha Müller〉（Henrich Otto 書）；Russell & Corinne Earnest《Papers for Birth Dayes: Guide to the Fraktur Artists and Scriveners》。
