---
name: sento-penki-e-mural
description: Japanese public-bathhouse (sento) penki-e mural style — Mount Fuji across the partition wall, four-can opaque house paint, roller-blended sky, advertising boards below, white tile grid.
---

# 錢湯ペンキ絵 Sentō Penki-e

## 設計哲學

ペンキ絵是東京一帶錢湯浴場牆上的背景畫。1912 年（大正元年）神田猿樂町的「キカイ湯」主人為了讓客人的孩子高興，請靜岡出身的畫家川越廣四郎（1884–1933）在牆上畫了故鄉看得到的富士；生意變好，關東的錢湯一家學一家。畫師用的是**一般房屋油漆**，只有**白、藍、朱、黃四罐**，所有顏色當場混；錢湯一週只休一天，**一面牆必須一天畫完**，所以天空用滾筒、山和松用寬刷毛，沒有時間畫細節。畫的錢最早由**壁畫下方那排廣告看板**支付——附近商家出錢掛看板，畫是附贈的。畫每隔一兩年**直接畫在舊畫上面**重來一次（塗り替え）。現役代表畫師：丸山清人、中島盛夫、田中みずき。

這些限制就是風格本身：不透明、平塗、大面積、四色混出來的顏色、一天畫得完的筆數、從湯裡往上看的低地平線全景、畫底下一定有字。

**網頁轉譯原則**：首屏就是一面牆，最上面是畫，畫下面是看板（＝營業資訊），再下面是磁磚與湯船。資訊永遠寫在看板上，不寫在畫上。

## 本風格的 5 個不可省略特徵

### ① 名山正面＋跨隔間牆的全景
富士（或在地名山）正面、略凹的三角、平頂；地平線壓低在畫面 60–66%；畫面被一道比畫低的隔間牆（仕切り）切開，構圖跨過它連成一景：一邊是山，另一邊是海與島。

```css
.mural{position:relative;aspect-ratio:12/5;overflow:hidden}
.part{position:absolute;left:47.2%;width:3.4%;bottom:0;height:41%;background:#F2EFE6} /* 隔間牆，比畫低 */
.part .pcap{position:absolute;inset:0 -2px auto;height:9px;background:#B98B57}       /* 檜木壓條 */
```
```js
// 富士輪廓：平頂＋凹弧（d^.66 讓山頂陡、山腳緩）
const fuji=(x,px=310,py=92,hw=300,HZ=330)=>{const d=Math.abs(x-px)/hw;if(d>=1)return HZ;
  return d<.055?py+d*20:py+(HZ-py)*Math.pow((d-.055)/.945,.66)*.97+3;};
```

### ② 四罐油漆、不透明平塗；唯一的漸層是滾筒混出來的天空
只准 藍 `#1F4E9C`、白 `#FBFAF5`、朱 `#D8452B`、黃 `#F1C232` 與它們的混色。零描線、零半透明、零陰影、零發光。天空不用 `linear-gradient`：用一帶一帶的橫向色條（每帶比上一帶多沾白），帶與帶之間有條紋與接縫——那是滾筒。雲是「乾滾筒」：漆不夠時刷出斷斷續續的白條，而不是半透明。

```js
// 天空：12 帶由上往下，每帶 = mix(藍, 白, (k/11)^1.15)，並與上一帶重疊處混 42%（滾筒拾色）
for(let k=0;k<12;k++){const base=mix(top,bottom,Math.pow(k/11,1.15));
  for(let y=y0;y<y0+bandH;y+=3){let c=prev[y]?mix(base,prev[y],.42*(1-(y-y0)/bandH)):base;
    c=c.map(v=>v+streak[row]);                 // 每一列固定 ±4.5 的滾筒條紋
    ctx.fillStyle=rgb(c);ctx.fillRect(0,y,W,3.6);prev[y]=c;}}
```
```svg
<!-- 乾滾筒雲：同一列切成數段、段間留縫 -->
<rect x="640" y="70" width="58" height="2.4" fill="#FBFAF5"/><rect x="704" y="70" width="31" height="2.4" fill="#FBFAF5"/>
```

### ③ 畫下方的一排廣告看板
看板是資訊的唯一容器：矩形、3px 墨框、左右上角兩顆釘、底色只有朱／白／黃／藍／墨五種、字是粗黑體看板字＋一行小字電話。hover 時從釘子處擺一下。

```css
.boards{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;padding:16px 18px;background:#8C6338}
.board{position:relative;padding:14px;border:3px solid #1E2430;transform-origin:50% -10px}
.board:before,.board:after{content:"";position:absolute;top:5px;width:6px;height:6px;background:#1E2430}
.board:before{left:6px}.board:after{right:6px}
.board h3{font:400 clamp(20px,1.9vw,28px)/1.1 "Dela Gothic One","Noto Sans TC",sans-serif;margin:0}
.b-shu{background:#D8452B;color:#FBFAF5}.b-ki{background:#F1C232}.b-ai{background:#1F4E9C;color:#FBFAF5}.b-ink{background:#1E2430;color:#F1C232}
.board:hover{animation:swing .7s cubic-bezier(.3,1.4,.5,1)}
@keyframes swing{25%{transform:rotate(2.6deg)}55%{transform:rotate(-1.6deg)}80%{transform:rotate(.6deg)}}
```

### ④ 白磁磚目地格＋檜木湯船緣
畫以外的牆一律是白磁磚：用 SVG `<pattern>` 平鋪（目地 1.5px #CFC9BA、磚 #F2EFE6）；湯船／摺衣台用 14px 檜木邊 `#B98B57` ＋水面 `#2F64A8`。

```html
<svg width="0" height="0" style="position:absolute"><defs>
 <pattern id="tile" width="30" height="30" patternUnits="userSpaceOnUse">
  <rect width="30" height="30" fill="#CFC9BA"/><rect x="1.5" y="1.5" width="27" height="27" fill="#F2EFE6"/></pattern></defs></svg>
<section class="wall"><svg class="tw" aria-hidden="true"><rect width="100%" height="100%" fill="url(#tile)"/></svg>…</section>
```

### ⑤ 定番母題與落款
松原（深綠橢圓層＋淺綠上緣、斜樹幹）、帆掛け船（墨色船身＋白方帆）、白浪（白圓＋偏右下的海色內圓＝浪捲＋三粒飛沫）、富士鋸齒雪線（26px 一齒，偶有長垂）、右下角朱色毛筆落款「畫師名＋年月」。

```js
// 白浪
ctx.fillStyle='#FBFAF5';circle(x,y,r);ctx.fillStyle=sea;circle(x+r*.28,y+r*.18,r*.62);ctx.fillStyle='#FBFAF5';circle(x-r*.9,y-r*.5,r*.14);
// 雪線：三角波 26px、振幅 16px，每五齒一條 22px 長垂
const zig=(x)=>{const ph=((x-px)%26+26)%26/26;return (ph<.5?ph:1-ph)*32+((Math.floor((x-px)/26)*7919)%5===0?22:0);};
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 磁磚白 | `#F2EFE6` | 頁面地（磁磚） | 30% |
| 目地 | `#CFC9BA` | 磁磚縫 | 3% |
| 藍罐 | `#1F4E9C` | 天頂、海、藍看板 | 18% |
| 天邊 | `#DCE8F0` | 天空下緣（滾筒混白） | 10% |
| 富士藍 | `#2E4F8F`／影 `#1F3768` | 山 | 8% |
| 白罐 | `#FBFAF5` | 雪、浪、帆、白看板 | 10% |
| 朱罐 | `#D8452B` | 朱看板、落款、強調 | 6% |
| 黃罐 | `#F1C232` | 黃看板、按鈕 | 4% |
| 檜木 | `#B98B57`／`#8C6338` | 湯船緣、看板牆 | 5% |
| 墨 | `#1E2430` | 字、看板框、船身 | 6% |
| 松綠 | `#2F5A3E`／`#4E7F4A` | 松原（藍＋黃混色） | ≤2% |

規則：所有顏色都必須「說得出由哪幾罐混成」。不准出現四罐混不出來的螢光色、紫藍漸層、灰階陰影。

## 字體系統

- 看板字：**Dela Gothic One**（Google Fonts），缺字回退 Noto Sans TC 900。字級 20–46px，行高 1.1，字距 .02em。
- 內文：**Noto Sans TC** 500／700，16px／1.75。看板小字 13.5px 700。
- 落款：**Yuji Syuku**（Google Fonts）毛筆體，只用於畫面右下角落款，朱色。
- Scale：46／30／24／20／16／13.5／12。

## 版面與網格

- 由上到下固定三段：**畫（12:5）→ 看板列（6 欄）→ 磁磚牆**；畫永遠滿版、零邊距、底邊 8px 墨線。
- 畫的地平線 66%；隔間牆在 47% 處、高 41%；山在左 26%、島在右 75%。
- 看板 6 欄 grid、12px 間距，跨 2 欄的放店名與地址；看板牆底色是檜木深色。
- 零旋轉（看板 hover 擺動除外）；留白靠磁磚，不靠空白。
- ≤700px：畫固定高 min(62vh,360px)，內層以 2.4 倍寬裁切、對準富士與隔間牆之間；看板 2 欄；導覽落到底部。

## 元件配方

- **導覽（カラン）**：三支洗身台水龍頭，白琺瑯底 3px 墨框；把手 hover 旋轉 −38°（cubic-bezier(.3,1.6,.5,1) 180ms）；現用頁那支開著，下方有藍白相間的水柱 `steps(3)` 往下流、字底 3px 朱線。
- **按鈕**：`Dela Gothic One` 17px、3px 墨框、黃底；hover 換朱底白字；active 下沉 2px。零圓角。
- **告示（卡片的替代）**：白琺瑯板 `#FBFAF5`＋3px 墨框，像貼在磁磚上的店內告示；排列不對稱（1.35fr／.9fr＋整列黃底）。
- **表單**：3px 墨框白底輸入框，標籤 700。
- **footer**：磁磚牆上三塊告示板；頂邊 6px 檜木。

## 動效規則

| 種類 | 實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| signature 簽名 | **ローラーぼかし上漆**：壁畫照繪師順序在眼前畫完——天空 12 帶滾筒（1.25s）→ 乾滾筒雲 → 遠山 → 寬刷毛富士直刷 → 山影 → 鋸齒雪線 → 基隆嶼 → 海橫刷 → 帆船 → 松 → 白浪 → 落款，共約 4.8s，左下告示即時報「上漆中 — 天空：滾筒由上往下…」 | 載入（等字型）／「再看一次上漆」 | 線性逐片，每片依所屬工序時間分配 | 直接畫完 |
| ambient 環境 | **湯氣**：96×40 低解析霧場，value noise 往上漂、慢慢聚；水面兩道波紋 SVG 9s 平移；水龍頭水柱 steps(3) | 持續 | 30fps；離屏暫停 | 不畫湯氣、波紋停 |
| input 輸入 | 游標擦霧（橢圓半徑 8×6 格，密度 ×.25）；〈畫一面〉滾筒與刷毛上漆（Pointer Events，延遲 <16ms）；看板 hover 擺動 0.7s | pointermove／hover | 即時 | 擦霧停用（霧不出現）；上漆照常（使用者自己在動） |
| transition 轉場 | **磁磚隔間牆推移**：一面 SVG pattern 磁磚牆由右推入蓋住（380ms cubic-bezier(.65,0,.25,1)）→ 換頁 → 新頁由它往左退開（520ms）；〈塗り替え〉sticky 疊層一層蓋過一層 | 站內連結 click／捲動 | 見左 | 直接換頁；sticky 照常（捲動驅動） |

自我限制：本站**不用淡入**、不用 blur、不用陰影；所有動效都是「刷上去」或「推過去」。

### motion-library 元件（motion-library 1.25.0 @9b3a7ba8，`MotionLib.prompt(id)` 可查原始 Prompt）

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| TXT-B-17 | Water Reflection | 湯屋 | text「湯船還在」, colors{primary #DCE8F0, secondary #F1C232, bg #2F64A8}, duration 2.4, loop false, seed 1958, 16:9 | 摺衣台（舊湯船）水面上，字從水裡浮起並倒映——ペンキ絵是畫給泡湯的人看的；元件零陰影零發光，暗藍底自動得到白字 |
| BG-A-19 | Bubble Dots | 湯屋 | colors{#1F4E9C, #FBFAF5, bg #DCE8F0}, duration 6, density 1.2, seed 3, 1:1 | 3 號機舷窗裡的肥皂泡；只畫圓與細框，放在圓形舷窗裡不侵入壁畫 |
| TXT-B-31 | Roller Path | 畫一面 | text「滾筒上牆」, colors{#1F4E9C, #D8452B, bg #F2EFE6}, duration 2, loop false, seed 8, 16:9 | 頁標的字沿起伏路線滾進來＝滾筒推上牆；磁磚白底自動得到墨字 |
| BG-B-39 | Minimal Wave | 畫一面 | colors{#FBFAF5, #DCE8F0, bg #2A5FA5}, duration 5, seed 12, 16:9（以容器裁成 120px 帶） | 畫布下的海：兩道白浪線，與壁畫的海同色 |
| BG-A-03 | Tile Rotate | 塗り替え | colors{#1F4E9C, #D8452B, bg #F2EFE6}, duration 8, density 1.4, seed 1962, 16:9 | 頁尾磁磚帶：四分之一圓弧磚一格格轉——錢湯地板的馬賽克磚 |

掛載：`HT.ml()`（同 ka-to 的 `KT.ml`）——等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、回視窗重掛；文字元件 `once`；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`；canvas `aria-hidden`，容器內保留 `.ml-fb` 原 HTML 標題。同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

全站零圖檔。壁畫由同一份場景資料產生：Canvas 逐片繪製（瀏覽器）與 SVG 粗取樣靜態備援（建置期 node）。圖元只有矩形條、多邊形、圓、橢圓與一行落款——**沒有任何描線**。山與松用「直刷條」（6–10px 寬的直條，每條明度 ±3.5 隨機）；天空與海用「橫刷條」；雲用斷續橫條。年份版本只換參數：1962（淡）、1979 赤富士（朱黃天、紅山、無雪）、1999（無船無松）、2017（黃昏）、2026。

## Logo 與 Favicon 設計指南

Logo：120×120，磁磚目地格底，上 2/3 是藍天三帶＋富士（深藍、右側影、白鋸齒雪），下 1/3 是朱色看板寫「福湯」，外框 4px 墨線——一張縮小的「畫＋看板」。Favicon：32×32 藍底、淺藍一帶、墨色富士白頂、朱色底條。

## Do & Don't

- Do：資訊全部寫在看板上；畫只負責風景。
- Do：所有顏色說得出由四罐中的哪幾罐混成；天空要看得到滾筒帶。
- Do：畫面最大的東西是山與天，不是字。
- Don't：`linear-gradient` 天空、半透明雲、陰影、發光、描線插畫。
- Don't：把富士畫成等腰直線三角（要凹弧＋平頂）；把雪畫成平滑弧線（要鋸齒）。
- Don't（去AI化）：紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji icon、Lorem ipsum、EST. 19xx 徽章。
- Don't：把看板做成圓角陰影卡片——看板是釘在木板上的琺瑯板。

## 頁面骨架範例

```html
<header class="hero"><div class="mural"><div class="mural-in">
  <svg>…靜態備援壁畫…</svg><canvas id="mcv" aria-hidden="true"></canvas>
  <div class="part" aria-hidden="true"><svg class="tw"><rect width="100%" height="100%" fill="url(#tile)"/></svg><i class="pcap"></i></div>
 </div><canvas class="steam" aria-hidden="true"></canvas></div></header>
<section class="boards" aria-label="廣告看板：營業資訊">
 <div class="board b-shu w2"><h1>店名</h1><p>一句話</p></div>
 <div class="board b-shiro"><h3>價目</h3><p>…</p></div> …
</section>
<section class="wall"><svg class="tw"><rect width="100%" height="100%" fill="url(#tile)"/></svg>
 <div class="notice"><h2>告示</h2><p>…</p></div></section>
```

## 技術實作與相容性

| 技術 | 承載 | 支援現況與查證 | 不支援時 |
|---|---|---|---|
| **Pointer Events：pressure＋getCoalescedEvents()＋setPointerCapture**（D 輸入層） | 〈畫一面〉的滾筒與刷毛：觸控筆讀 `pressure`（×1.15，限 .2–1）；滑鼠與手指以速度換算筆壓（`1.1 − 速度px/ms × .42`，限 .35–1，慢＝重）；每個 pointermove 取 coalesced 事件補點，每 1.5px 落一次滾筒 | MDN〈PointerEvent〉Baseline Widely available（2020-07 起）；`pressure` Chrome 55／Firefox 59／Safari 13；`getCoalescedEvents()` MDN 標為 Limited availability（Chrome 58、Firefox 59、Safari 18.2） | 無 `getCoalescedEvents` 時只用主事件，筆觸較稀但完整；另有鍵盤操作（方向鍵移動、空白鍵按住上漆、Enter 交卷）與「看晏如示範」 |
| **SVG `<pattern>` 平鋪**（A 渲染層） | 特徵④：全站每一面磁磚牆、隔間牆、換頁用的磁磚推門、〈塗り替え〉每一層下方的馬賽克，都是同一組 `patternUnits="userSpaceOnUse"` 圖樣以 `fill="url(#tile)"` 填滿 | MDN〈&lt;pattern&gt;〉與 SVGPatternElement 皆 Baseline Widely available（2015-07 起） | 不會發生；SVG 停用時為純色 #F2EFE6 |
| **position: sticky 多層堆疊**（C 版面層） | 〈塗り替え〉：五個年份各一個 `height:100vh; position:sticky; top:0` 的 section，後面的捲上來蓋住前面的——塗り替え就是畫在上一層上面；頂邊是同色漆的垂流 SVG | web-features〈Sticky positioning〉Baseline Widely available 2022-03-19（Chrome 56、Firefox 59、Safari 13） | 不支援時退化為一般直排，每層依序出現，資訊不缺 |
| Canvas 2D ImageData（輔助） | 滾筒物理：720×400 RGBA 緩衝，每點 `wall += (roller − wall)·k`（k＝.6×漆量×筆壓×條紋），同時 `roller += (wall − roller)·.0025×筆壓×(1.3−漆量)`；漆量每點 −.0011×筆壓，<.38 時依雜湊跳點＝乾滾筒斷紋；每幀最多一次 putImageData | Baseline Widely available | 無 canvas 時顯示 noscript 告示，營業資訊在湯屋頁看板 |

**效能實測（node 22 / jsdom 模擬）**：motion-library 子集 227KB 解析＋執行 4.7ms；壁畫場景生成 1.0ms（645 片）；首屏 JS < 15ms；上漆動畫每幀最多數十片 fillRect；湯氣 3,840 格／幀（30fps 節流、離屏停）；滾筒一次落點 44×3 像素，示範模式每幀 ≤220 落點。單頁大小：湯屋 298KB、畫一面 275KB、塗り替え 266KB（皆 ≤350KB，含元件子集與靜態備援 SVG）。

**實測順序（可行性）**：滾筒拾色先以 node 40 列原型驗證會自然產生單調遞增的明度（拾色率 .06 時滾筒 100 點內就褪成底漆，故調降為 .0025×(1.3−漆量)）；〈看晏如示範〉以同一支物理跑完三座山皆得 8／8，隨手亂刷得 0–2／8。
