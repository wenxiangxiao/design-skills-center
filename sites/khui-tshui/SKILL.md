---
name: polish-poster-school-gouache
description: Polish Poster School, gouache "open-mouth" half — one surreal metaphor per sheet painted with visible bristle strokes, a single coloured ground with three or four paint jars, hand-lettering painted with the same brush, and the poster as a pasted object with a credits line and printer's imprint.
---

# 波蘭海報學派・水粉開喙半身 Polska Szkoła Plakatu — Gouache "Open Mouth"

> 示範站：開喙 KTV（臺南西門路二段・八間包廂・1992 年起，虛構）。
> 本館第 2 個波蘭海報學派站。第 1 站 `amkongtsiau`（暗光鳥馬戲團）是「一筆」半身：胭脂洋紅滿牆、一個手勢就是整張圖。本站是**水粉隱喻半身**：夜青色地、多筆可見的鬃毛水粉、一顆張著嘴的頭當容器。兩站的 mood、主色相、開場原型都不同。

## 一、設計哲學

1950 年代到 1980 年代的波蘭，海報幾乎全由國營機構委託（電影發行 CWF、劇院、歌劇院、Jazz Jamboree、馬戲團），宣傳任務之外沒有商業壓力，設計師反而可以「畫」。Henryk Tomaszewski（1914–2005，長年在華沙美術學院帶海報工作室）、Jan Lenica（〈Wozzeck〉1964）、Roman Cieślewicz（〈Vertigo〉1963 波蘭版）、Waldemar Świerzy（〈Jimi Hendrix〉1974）、Franciszek Starowieyski 這一代把海報當成**畫家對主題的一句評論**：不描述劇情，只給一個隱喻。1966 年華沙國際海報雙年展開辦，1968 年維拉諾夫（Wilanów）海報博物館成立——世界上第一座海報博物館。

它為什麼長成這樣：

- **印刷條件**：國營印刷廠多半是平版彩印，套色數有限，於是一張海報只用一塊色地加三四種顏料；套印不準被接受，甚至被利用。
- **畫家的手**：設計師大多是美術學院畫科出身，海報稿直接以水粉、拼貼、手寫完成，筆觸與手寫字被照原樣印出。
- **審查與隱喻**：直接說的話容易被刪，間接的視覺隱喻反而活得下來，也更耐看。

本站把這套語言接到一間台南 KTV：唱歌的第一件事就是「開喙」（台語：張開嘴），於是全站只有一個隱喻——**頭是一個會出聲的容器，嘴打開，東西就飛出來**。八間包廂的門海報是同一個隱喻的八種變奏。

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「插畫風網站」而不是波蘭海報。

### 特徵 1｜一張只講一件事：一個超現實隱喻統治整張

頭＝鳥籠、嘴＝喇叭花、耳＝海螺、魚＝麥克風、雨傘＝上唇。一張海報只准一個 idea，而且要用**畫的**，不用寫的。人物永遠被畫框裁切（頭頂或下巴出血），比例故意不對（嘴大到可以開出一列火車）。

```js
// 單位框裡的側臉：FACE 是外形、MOUTH 是張開的嘴（楔形缺口），s＝邊長
const MOUTH = [[.85,.54],[.63,.61],[.84,.73]];      // 上唇尖→嘴角→下唇尖
KT.head(ctx, -W*.25, H*.30, W, {seed:41});          // 頭往左下出血，嘴落在畫面中線
// 隱喻物從嘴裡出來：一條三色筆觸＋三隻鳥
B.stroke(ctx, curveFromMouth, {w:W*.11, col:'#E4572E', dry:.28});
```

### 特徵 2｜看得見的水粉筆觸：鬃毛、乾刷、露底

零向量平滑填色、零漸層、零陰影。每一塊顏色都由平行的鬃毛筆觸刷滿：一筆是 4–15 根鬃毛，每根自己的寬度、明度（±8%）、墨量；墨量用完就斷（乾刷），起筆收筆收細，形的邊界抖動。

```js
// 一筆＝n 根鬃毛，各自帶墨、各自乾掉
for (const br of bristles) {
  ink -= dry * (.4 + rnd()*1.2) / L * 2.2;
  if (ink < rnd()*.55 && t > .25) { pen = false; continue; }   // 乾刷斷線
  ctx.lineTo(P.x + N.x*off*taper, P.y + N.y*off*taper);
}
// 填一個形：clip 到抖動過的邊界，沿一個角度來回刷
ctx.clip(jitteredPath(poly, w*.18)); for (s=-R; s<=R; s+=w*.62) stroke(line(s));
```

CSS 無 JS 的退路（字身）：

```css
.tex .c{background:var(--tx) center/260px auto,var(--fc,currentColor);
  -webkit-background-clip:text;background-clip:text;color:transparent}
```

### 特徵 3｜手寫字就是畫：同一支筆、每個字自己的基線

標題沒有兩個字一樣：每個字各自 ±0.08em 的基線、±4.5° 的角度、0.9–1.12 的字級，字身填的是同一支筆刷出來的紋理。字壓在圖上、跟圖搶空間；印刷體只准出現在 credits 與印刷所行。

```css
.hand{font-family:"LXGW WenKai TC","Noto Serif TC",serif;font-weight:700;line-height:.95}
.hand .c{display:inline-block;transform:translateY(var(--dy)) rotate(var(--r)) scale(var(--s));transform-origin:50% 80%}
.latin{font-family:"Caveat Brush",cursive}
```

### 特徵 4｜一塊色地＋三到四罐顏料＋大片空地

每張海報先決定一塊地色（夜青、群青、檸檬、朱、粉、墨其中之一），上面最多再用三四罐顏料；地色至少佔 35%，不放任何紋樣或圖樣去填空。

```css
:root{--teal:#17393C;--bone:#EDE3CC;--verm:#E4572E;--ultra:#2B3F94;--pink:#EE8FA0;--lemon:#E9C93B;--ink:#15130F}
.art{background:var(--teal)}  /* 地 */
```

### 特徵 5｜海報是一個被貼上去的物件：紙邊、漿糊角、credits、印刷所行

海報有紙白邊、四角被漿糊條壓住、微微歪貼（−1.2°～+1°），下緣一行小字印刷所記號（「畫・林志遠　印・開喙海報社　No. 01／1992」），圖上另有一行全大寫 credits（像 reżyseria／muzyka 那樣列出事實）。

```css
.poster{background:#F4ECD8;padding:14px 14px 34px;transform:rotate(var(--tilt,-.8deg));box-shadow:0 0 0 1px rgba(0,0,0,.25),6px 8px 0 rgba(0,0,0,.35)}
.poster::before,.poster::after{content:"";position:absolute;width:46px;height:20px;background:rgba(237,227,204,.55);top:-8px;transform:rotate(-8deg)}
.imprint{position:absolute;left:16px;right:16px;bottom:8px;display:flex;justify-content:space-between;font:500 10.5px/1.3 "Noto Sans TC";letter-spacing:.06em}
.credits{font:500 12.5px/1.6 "Noto Sans TC";letter-spacing:.08em;text-transform:uppercase}
```

## 三、色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 走廊牆 wall | `#1A1815` | 頁面底（KTV 走廊）、門框外 | ~34% |
| 夜青 teal | `#17393C` | 首屏海報地、01 鳥籠地 | ~20% |
| 骨白 bone | `#EDE3CC` | 臉、正文字、月亮 | ~14% |
| 海報紙 paper | `#F4ECD8` | 海報白邊、價目紙、點歌單 | ~10% |
| 朱 verm | `#E4572E` | 嘴、聲音主筆、主按鈕 | ~7% |
| 群青 ultra | `#2B3F94` | 低音筆觸、02 喇叭花地 | ~5% |
| 粉 pink | `#EE8FA0` | 耳螺、中高音筆觸 | ~3% |
| 檸檬 lemon | `#E9C93B` | 鳥、手寫店名、空房燈、高音 | ~4% |
| 墨 ink | `#15130F` | 頭髮、喉嚨、眼 | ~3% |

規則：每張海報＝1 地色＋≤4 罐顏料；同一罐顏料可有 ±8% 的明度抖動（鬃毛），但**沒有任何一色的淡版或漸層**。聲音的顏色綁音高：低→群青、中→朱、中高→粉、高→檸檬；與地色相同時換成骨白。

## 四、字體系統

- 標題手寫：**LXGW WenKai TC 700**（Google Fonts，霞鶩文楷繁中），每字獨立變形；拉丁字：**Caveat Brush**。
- 正文與 credits：**Noto Sans TC** 400／500／700，credits 一律 0.08em 字距、全大寫。
- 字級：店名 78–150px（clamp 11.6vw）／章節手寫 40–68px／小標 24px kai／正文 16px/1.75／credits 11–12.5px／印刷所行 10.5px。
- 數字（價目）用 Noto Sans TC 700、`font-variant-numeric:tabular-nums`。

## 五、版面與網格

- 首屏不對稱兩欄 1.12fr : .88fr；左欄是一扇門＋門上的海報（5:7），右欄是今晚狀態與價目。
- 海報永遠歪貼：−1.2°～+1°；彼此不對齊。
- 「怎麼唱」三步驟以 0／14％／28% 的左縮排階梯錯開，不做三張卡片。
- 八扇門 4 欄網格，第 2、3、4 欄各下移 70／24／96px，像走廊裡門的透視錯落；≤980px 兩欄、偶數下移 56px。
- 地色區至少 35% 留空。

## 六、元件配方

- **導覽（song-queue-nav 點歌單）**：右上一張歪 1.2° 的紙條，三行「歌號＋頁名＋狀態」，現用頁＝「正在唱」＋ steps(4) 等化器＋朱色手繪底線；下一頁＝「下一首」，其餘＝「已點」。≤560px 落到底部三等分。
- **按鈕**：不規則圓角 `border-radius:3px 9px 4px 11px/9px 3px 10px 4px`＋3px 4px 墨色硬影，hover 往左上浮 2px 轉 −1°。
- **門**：深褐門框 `#2E2620`＋內框線＋門牌（`#C9B98F`）＋把手；海報貼在門上；按一下用 Web Animations 開門到 −80°，背後是房間說明。
- **價目表**：海報紙上的表，房型名用 kai，數字 tabular；「正在算的那一欄」依真實時刻上檸檬色。
- **footer**：三欄小字，店、人、規格書下載。

## 七、動效規則

| 種類 | 本站實作 | 觸發／時間 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 首屏海報的鳥不停從嘴裡飛出：三種預先塗好的鳥 sprite 沿三次貝茲曲線飛 4.2–6s、翅膀以 |sin| 拍動；點歌單等化器 steps(4) 0.9s | 自動、離屏停 | 停成三隻固定位置的鳥；等化器停格 |
| input 輸入 | 瞳孔跟著游標（≤0.012s 位移）、游標一動鳥的間隔 1500→420ms；門 hover 轉 −9°、把手轉 −16° | pointermove，同一影格 | 瞳孔仍跟（使用者自己在動），門不轉 |
| transition 轉場 | 換頁＝一張撕邊海報紙由上蓋下（420ms）→ 新頁把它往上撕走並轉 −4°（620ms）；開門 0→−86→−80°（620ms） | 點內部連結、點門 | 直接換頁、門直接開 |
| signature 簽名 | **唱出來的海報**：麥克風音量決定筆寬與速度、自相關音高決定顏色與彎度，一支活的鬃毛筆從海報上的嘴裡出發，每影格接一段 | 使用者唱或按住 | 照常（使用者驅動） |

自我限制：不使用淡入、不使用視差、不使用數字計數。

### motion-library 元件（1.28.1 @95eb095）

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-A-14 | Torn Text | index | text＝今晚狀態、colors {primary #E4572E, secondary #E9C93B, bg #1A1815}、duration 1.4、loop false、seed 1992、16:9 | transition（一次性） | 「今晚剩 N 間」像被撕開又貼回的海報條——波蘭海報在街上的命運就是被撕；暗底得到近白字 |
| BG-B-31 | Blob Shapes | index | colors {primary #2B3F94, secondary #E4572E, bg #1A1815}、duration 16、density .9、intensity .8、seed 233 | ambient | 交通卡背後緩慢變形的群青與朱色團塊＝水粉筆洗過的色塊；零描邊零發光 |
| TXT-A-38 | Marker | rooms | text＝價目、colors {primary #E4572E, secondary #E9C93B, bg #F4ECD8}、duration 1.2、loop false、seed 8 | transition（一次性） | 檸檬色馬克筆刷過「價目」：手的痕跡，亮底得到近黑字 |
| BG-B-20 | Wave Lines | rooms | colors {primary #17393C, secondary #2B3F94, bg #1A1815}、duration 12、density .8、intensity .9、seed 2、1:1 | ambient | 午夜場背後層層平塗的聲波帶，只用夜青與群青，不搶字 |
| TXT-B-25 | Karaoke Ball | sing | text＝點一首歌，把嘴打開、colors {primary #E9C93B, secondary #E4572E, bg #0F0E0C}、duration 2.6、loop false、seed 51 | transition（待機畫面一次性） | 卡拉 OK 跳球——KTV 自己的語彙；跳過的字轉檸檬 |

開發 Prompt 出處：`MotionLib.prompt('TXT-A-14')` 等。掛載包裝 `KT.ml`：等 `document.fonts.ready`、IntersectionObserver 離屏 `destroy()`、once 元件只播一次、reduced-motion 背景 `seek(.35)`／文字 `seek(1)`、canvas `aria-hidden`、容器內保留 `.ml-fb` HTML 標題。同一畫面同時運轉 ≤2 個。

## 八、插畫與圖像風格（gouache-bristle-metaphor 水粉鬃筆隱喻）

全站零圖檔。所有圖由同一支 Canvas 鬃毛筆畫出：`B.stroke`（一筆）、`B.fill`（沿角度來回刷滿一個抖動邊界的形）、`KT.head`（張嘴側臉：臉、髮、嘴、喉嚨、眼、螺旋耳）、`KT.bird`（實心鳥）。八張門海報各是一個隱喻：鳥籠、喇叭花、耳螺、唱歌的月亮、麥克風魚、上唇雨傘、喉嚨火車、八張嘴合唱。人物一律側臉、往左下出血；嘴永遠是畫面上最飽和的那一塊。

## 九、Logo 與 Favicon

Logo（`assets/logo.svg`）：夜青方塊、骨白側臉、墨髮、朱色張嘴、嘴裡一隻檸檬鳥、粉色螺旋耳。Favicon 是同一張臉的 64px 簡化版（inline SVG data URI）。不使用文字，因為隱喻本身就是名字。

## 十、Do & Don't

- Do：一張一個隱喻；人物被裁切；筆觸看得見；字跟圖用同一支筆；海報有紙邊與印刷所行。
- Don't：向量平滑填色、漸層、柔影、發光；置中大標＋兩顆按鈕＋三張卡片；emoji；一張海報放兩個點子；把字排整齊。
- 去AI化：無紫藍漸層、無 Lorem ipsum、無「EST. 19xx」徽章；品牌敘事從產業長出來（開喙＝唱歌先張嘴）。

## 十一、頁面骨架範例

```html
<nav class="queue" aria-label="點歌單（頁面導覽）"><h2><span>點歌單</span><span>開喙 KTV</span></h2>
 <a href="index.html" aria-current="page"><span class="no">10921</span><span class="t">大廳</span><span class="st"><span class="eq"><i></i><i></i><i></i></span> 正在唱</span></a>
 <a href="rooms.html"><span class="no">10922</span><span class="t">八間包廂</span><span class="st">下一首</span></a></nav>
<section class="hall">
 <div class="door"><div class="plate"><b>01</b> 鳥籠</div>
  <div class="poster" style="--tilt:-1.1deg"><div class="art"><canvas id="hero"></canvas>
   <h1 class="ttl"><span class="hand big">開喙</span><span class="latin en">Khui-tshuì KTV</span></h1>
   <p class="credits pc"><b>八間包廂</b> · 臺南西門路二段 · 1992</p></div>
   <div class="imprint"><span>畫・林志遠　印・開喙海報社　No. 01／1992</span><span>01 號房門</span></div></div></div>
 <div class="info">…今晚狀態、價目表、兩顆按鈕…</div>
</section>
```

## 十二、技術實作與相容性

| 技術 | 層 | 承載 | 支援現況與查證 | fallback |
|---|---|---|---|---|
| `getUserMedia({audio})`＋`AnalyserNode` | D 輸入與感測 | signature 與 func：音量（RMS）＋自相關音高驅動筆觸 | MDN〈MediaDevices.getUserMedia()〉：Baseline Widely available（2017-09 起）；**只在安全環境（HTTPS／localhost）**；沙盒 iframe 未給 allow-same-origin、data:／blob: 文件都會被擋；麥克風受 Permissions Policy `microphone` 控制。Web Audio `AnalyserNode` Baseline Widely available | 無 mediaDevices 或使用者拒絕 → 自動切「按住唱」：鋸齒波＋低通＋5.5Hz 顫音合成人聲，音高量化到歌曲音階，同一支筆 |
| Canvas 2D 鬃毛筆（路徑＋clip＋globalAlpha） | A 渲染 | 特徵②、全站所有圖、手寫字紋理 | Canvas 2D Baseline Widely available；Path2D 用於 clip | 無 canvas：首屏 `<noscript>` 內聯 SVG 平塗版；所有資訊皆為 HTML |
| Web Animations API | B 動效時間軸 | 字幕擦色（`clip-path: inset()` 關鍵影格，`currentTime` 由 `AudioContext.currentTime` 每影格寫入）、開門、換頁撕紙 | MDN〈Element.animate()〉與〈Animation〉：Baseline Widely available（2020-03 起） | 無 `animate` → 直接換頁、門直接開、字幕整行亮 |

效能實測（2026-11-01，node＋假 Canvas 計數）：首屏海報分成 45 個工作、每個 ≤4.7k 個 `lineTo`，`KT.paint` 每影格最多跑 11ms 後讓出；自相關音高 1024 樣本 × 約 500 個延遲在 node 量得 1.1–5ms/次；每頁 279–292KB（含 motion-library 子集約 245KB），低於 350KB 上限。麥克風音訊只在本機分析，不錄音、不上傳。
