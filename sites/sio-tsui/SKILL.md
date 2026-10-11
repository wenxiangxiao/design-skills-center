---
name: vaporwave-poolside-slowed
description: Daylight-pastel Vaporwave (2010–2013 net-label aesthetic built on 1980s–90s mall, spa and corporate muzak) as a web style — a horizon split between a sliced sunset and a receding tiled pool floor, pink × aqua pastel pairs with Windows 95 desktop teal, full-width romanised text with katakana and chrome Times italic, information carried in bevelled 95-style windows collaged over the scene, and consumer-relic motifs (marble bust on a fluted column, palms, a leaping dolphin) — where the whole page's clock slows down and echoes together with the music.
---

# 蒸汽波・池畔慢版 Vaporwave, Poolside & Slowed

> 範例站：燒水會館 SIO-TSUÍ（臺中五權五街的 1993 年三溫暖）。本規格書不綁產業——任何「一個停在某個年代、還在營業的地方」都可以用。

## 0. 血緣與定位

- **流派**：蒸汽波 Vaporwave（型錄「數位與螢幕原生」既有條目，全館第 2 站；第 1 站 halcyon-92 為深色 CRT＋混音軟體 OS 隱喻）。
- **年代與地域**：2010–2013 年網路唱片廠牌與 Tumblr／Bandcamp 社群。音樂來源是 1980–90 年代的商場音樂、電梯音樂、企業宣傳片與日本 City Pop；視覺來源是 Windows 95／98 介面、早期 3D 算圖、古典大理石雕像、熱帶度假圖庫照片。
- **代表作與人物**：Daniel Lopatin（Chuck Person）《Chuck Person's Eccojams Vol. 1》2010——把八〇年代流行歌放慢、加殘響、切一段無限循環，奠定「eccojam」做法；James Ferraro《Far Side Virtual》2011——數位消費文化的空洞樂園；Ramona Xavier（Macintosh Plus）《Floral Shoppe》2011——粉紅格子地、海利歐斯大理石胸像與片假名標題，成為本流派最被辨識的封面語彙。延伸支流 mallsoft（商場空間殘響）與 slowed + reverb。降速切段的做法本身借自休士頓 DJ Screw 1990 年代的 chopped & screwed。
- **為什麼長成這樣**：(1) 素材全部是「被丟掉的商業背景」——圖庫照、系統介面、企業音樂——所以畫面是拼貼，元素之間沒有光影統一；(2) 當時的製作工具是免費軟體與網頁，所以出現系統視窗、像素字、預設字體 Times New Roman／Arial 的「鉻字」特效；(3) 音樂做法是放慢與殘響，所以視覺也追求「時間被拉長的空間」：地平線、無限延伸的格子、一顆永遠在沉的太陽。
- **本站差異（相對 halcyon-92）**：白天粉彩池畔、而非夜晚深底；開場是浮窗拼貼在場景上、而非整站 OS；簽名是「全站時鐘跟著音樂一起降速與殘響」，而非色相推桿。

## 1. 設計哲學

1. **蒸汽波是一種時間感，不是一組配色。** 畫面上每一個會動的東西都要能「慢下來」：本站所有動畫共用同一個時鐘，音樂放慢到 0.7×，棕櫚、夕陽、池磚、捲帶盤一起放慢到 0.7×。
2. **拼貼不統一光源。** 雕像、棕櫚、視窗、文字各自是剪下來的東西，硬邊、互相重疊，不做一致的陰影與透視（地板除外）。
3. **資訊放進系統視窗。** 視窗是蒸汽波的「相框」：所有可讀的內容都在帶標題列的斜角視窗裡，視窗可以拖動、可以收起，資訊永不遺失。
4. **懷舊要有一個真實的地方。** 不寫「復古感」這種空話：寫出那一年買的胸像、那一卷卡帶、那十一片補過的磁磚。

## 2. 本風格的 5 個不可省略特徵

### ① 切條夕陽＋退向地平線的格子地（形狀語彙）——拿掉就只是粉色網頁

太陽是一顆漸層圓，下半部被水平縫切開，**縫越往下越寬**、而且持續往下流；太陽前方是一片以透視退向地平線的方格地板（本站做成池磚）。兩者永遠同時出現、上下對分畫面。

```css
@property --s{syntax:'<number>';inherits:false;initial-value:0}
.sun{border-radius:50%;background:linear-gradient(180deg,#FFE07A 8%,#FF8FB1 58%,#FF5E8A 100%);
  animation:slit 4.8s linear infinite;
  /* 第 k 條縫：位置 50% + (k+s)×8.333%、寬 (k+s)×1.25%，s 0→1 時每條縫剛好走到下一條的位置 → 無縫循環 */
  mask-image:linear-gradient(180deg,
    #000 calc(50% + var(--s)*8.333%), transparent calc(50% + var(--s)*8.333%) calc(50% + var(--s)*8.333% + var(--s)*1.25%),
    #000 0 calc(50% + (1 + var(--s))*8.333%), transparent 0 calc(50% + (1 + var(--s))*8.333% + (1 + var(--s))*1.25%),
    /* …k = 2..5 同式… */ #000 0)}
@keyframes slit{from{--s:0}to{--s:1}}
.floorwrap{perspective:260px;perspective-origin:50% 0;overflow:hidden;background:#39C6CF}
.floor{position:absolute;inset:auto 0 0 0;height:300%;transform-origin:50% 100%;transform:rotateX(70deg);
  background:linear-gradient(#F3EEF0 3px,transparent 3px) 0 0/64px 64px,linear-gradient(90deg,#F3EEF0 3px,transparent 3px) 0 0/64px 64px,#39C6CF;
  animation:tiles 2.4s linear infinite}
@keyframes tiles{to{background-position:0 64px,0 0}}
```

### ② 粉×青互補對＋桌面青（色彩規則）——拿掉就變成一般粉彩

任何畫面都必須同時有一個粉（#FF8FB1）和一個青（#39C6CF 或 #9FF0D8），兩者面積接近；系統色用 Windows 95 預設桌面青 #008080 做標題列。漸層**只**允許在天空與太陽（橫向色帶），且永遠是 薄荷→粉→蜜桃，**禁止紫藍漸層**。字色用帶紫的墨 #2B2233，不用純黑。

```css
:root{--mint:#9FF0D8;--aqua:#39C6CF;--teal:#008080;--pink:#FF8FB1;--peach:#FFC29E;--sun1:#FFE07A;--sun3:#FF5E8A;--marble:#F3EEF0;--ink:#2B2233}
.sky{background:linear-gradient(180deg,#A9F1E4 0%,#C8F3E3 26%,#FFD6E0 64%,#FFC29E 100%)}
```

### ③ 全形羅馬字＋片假名＋鉻質 Times 斜體（字體選擇）

三種字各司其職：**全形羅馬字**（ＳＩＯ－ＴＳＵＩ　ＳＰＡ）加寬字距當標籤；**片假名／日文**當副標（サウナ・リラクゼーション）；**大標用 Times 系斜體粗體**加上鉻質漸層（中段一條深色地平線）與粉色硬投影。內文才用正常黑體。

```css
.fw{font-family:"DotGothic16",monospace;letter-spacing:.32em}
.chrome{font-family:"Tinos","Times New Roman",serif;font-style:italic;font-weight:700;line-height:.92;
  background:linear-gradient(180deg,#fff 0%,#E4F4F6 30%,#9DB9C6 48%,#4E5F78 50%,#FFD3E2 53%,#FFF6F9 72%,#fff 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(3px 3px 0 #FF8FB1) drop-shadow(-1px -1px 0 #fff)}
```

### ④ 95 風斜角視窗拼貼（版面手法）

資訊卡一律是灰色斜角視窗：兩層內外 bevel、純色標題列、右上方塊按鈕、內層凹陷白底。視窗**互相重疊、錯位**擺在場景上（不對齊網格），可拖動標題列、可收起；**不旋轉**（系統視窗從來不歪）。

```css
.win{background:#CFC7CC;padding:3px;box-shadow:inset 1px 1px 0 #fff,inset -1px -1px 0 #5E5660,inset 2px 2px 0 #EEE8EC,inset -2px -2px 0 #8D8490,6px 6px 0 rgba(43,34,51,.18)}
.win>.bar{display:flex;gap:8px;background:#008080;color:#fff;font:15px/1 "DotGothic16";padding:4px 4px 4px 8px}
.win>.body{background:#FBF8FA;margin-top:3px;padding:16px 18px;box-shadow:inset 1px 1px 0 #8D8490,inset -1px -1px 0 #fff,inset 2px 2px 0 #5E5660}
```

### ⑤ 消費遺物母題：大理石胸像＋棕櫚＋海豚（裝飾母題）

畫面上至少要有兩件「九〇年代高級感的遺物」：站在凹槽柱上的大理石胸像（feTurbulence 紋理）、剪影棕櫚、一隻躍出的海豚；可再加棋盤格地條。全部是剪下來貼上的平面剪影，不打光。

```html
<svg viewBox="0 0 200 330"><defs><filter id="marb"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="3" seed="4"/>
<feColorMatrix values="0 0 0 0 .80 0 0 0 0 .70 0 0 0 0 .76 0 0 0 -8 4.2"/><feComposite in2="SourceGraphic" operator="in"/><feBlend in2="SourceGraphic" mode="multiply"/></filter></defs>
<g filter="url(#marb)"><path fill="#F7F1F4" d="M24 236C30 214 52 204 74 198C80 190 82 182 80 172C70 164 64 150 64 132 …Z"/>
<rect x="56" y="254" width="88" height="76" fill="#F7F1F4"/><path d="M66 256v74M78 256v74M90 256v74" stroke="#D9C8D0" stroke-width="3"/></g></svg>
<div class="checker" style="height:28px;background:conic-gradient(#2B2233 25%,#F3EEF0 0 50%,#2B2233 0 75%,#F3EEF0 0) 0 0/28px 28px"></div>
```

## 3. 色彩系統

| 色 | hex | 用途 | 約佔比 |
|---|---|---|---|
| 大理石白 | #F3EEF0（紋 #D9C8D0） | 全站底，帶 feTurbulence 粉灰紋 | 30% |
| 薄荷 | #9FF0D8 | 天空上段、置物櫃門、標籤底 | 16% |
| 池水青 | #39C6CF | 池磚地板、海 | 14% |
| 粉 | #FF8FB1 | 互補主色、按鈕 go、殘影 | 12% |
| 視窗灰 | #CFC7CC | 所有視窗與按鈕 | 12% |
| 桌面青 | #008080 | 標題列、標籤字 | 6% |
| 蜜桃 | #FFC29E | 地平線霧、天空下段 | 4% |
| 夕陽黃→珊瑚 | #FFE07A → #FF5E8A | 只在太陽 | 3% |
| 深青 | #0B5C61 | 棕櫚、海豚剪影 | 2% |
| 墨 | #2B2233 | 文字 | — |

## 4. 字體系統

- Google Fonts：`Tinos`（Times New Roman 同尺寸字族，400/700 含斜體）、`DotGothic16`（像素感日文，UI 與全形字）、`Noto Sans TC`（內文 400/500/700）。
- 字級：大標 chrome clamp(56px, 8vw, 128px)／區塊標 clamp(44px, 7vw, 96px)／視窗標題列 15px／標籤 13–14px 字距 .32em／內文 16px 行高 1.75／導言 18px。
- 數字與價格用 DotGothic16；強調價格用 Tinos 斜體粗體粉色。

## 5. 版面與網格

- 首屏：場景佔滿視窗（天空 62%／地板 38%），太陽中心落在地平線上方，視窗以絕對定位錯置在四角；胸像站在太陽正前方。
- 內頁：場景帶 62vh，標題視窗壓在左上；下方內容用 12 欄網格，視窗跨欄並**刻意上下錯位**（margin-top 40–120px），像桌面上被拖亂的視窗。
- 區塊之間用一條 28px 棋盤格地條分隔。
- 留白：視窗之間 18–22px；視窗內距 16×18px。
- 導覽：左側 92px 置物櫃欄（見元件），內容 padding-left 92px。
- ≤760px：場景縮為 300–360px 高，視窗取消絕對定位、改單欄堆疊並向上蓋住場景 80–90px；導覽落到底部一排四格。

## 6. 元件配方

- **置物櫃導覽**：每頁一格置物櫃門（薄荷／粉交替、上段四條百葉通風縫、號碼牌用全形數字 ０１），hover 門半開 rotateY(-28deg)，現用頁門打開 rotateY(-78deg) 露出櫃內頁名與一條粉色手環。底部顯示「館內時鐘 ×1.00」。
- **按鈕**：`.btn95` 雙層 bevel，按下時反轉 bevel 並位移 1px；主要動作用粉底 `.go`。
- **表單**：欄位凹陷 bevel（inset 陰影反向），標籤用 DotGothic16；checkbox accent-color 桌面青。
- **對話框**：預約完成以 95 視窗彈出，開啟動畫為 `steps(5)` 的縮放（像老電腦一格一格長出來），Esc 關閉、焦點回到原處。
- **卡帶**：深色殼、粉＋大理石雙段標籤、兩顆 conic-gradient 捲帶盤，播放時旋轉。
- **員工名牌**：白底、青色內框、頂上一條粉色手環。
- **Footer**：一個「關於本館.txt」視窗，內含 logo、地址、電話、營業、虛構聲明。

## 7. 動效規則（四種全有，皆有 reduced-motion 降級）

| 類型 | 內容 | 觸發 | 時長／easing |
|---|---|---|---|
| ambient 環境 | 夕陽切縫往下流（@property --s）、池磚往前推、棕櫚擺動、海豚每 7.5 秒躍出 | 載入即持續 | 4.8s linear／2.4s linear／5.2–6.4s ease-in-out alternate／7.5s cubic-bezier(.45,.05,.55,.95) |
| input-driven 輸入 | 視窗拖曳（Pointer Events＋setPointerCapture，逐 pointermove 直接寫 translate）、置物櫃門 hover 半開、泡池時點擊處漣漪 | 游標／觸控／鍵盤 | 拖曳零延遲；門 .32s cubic-bezier(.3,.7,.3,1)；漣漪 .6s ease-out |
| transition 轉場 | 百葉切條：14 條粉青相間的條帶以 WAAPI 依序 scaleY 0→1 蓋住頁面再換頁，新頁反向收起（呼應夕陽切縫） | 點內部連結 | 每條 300ms、錯開 24ms、cubic-bezier(.6,0,.3,1) |
| signature 簽名 | **館內時鐘**：音樂放慢時 `document.getAnimations()` 全部的 playbackRate 跟著音訊的實際速度滑行；蒸氣室越深，棕櫚與海豚拖出越多粉／青殘影；按摩池切住一小節時，每轉一圈全站動畫倒帶回同一位置。慢版存下後，整個網站之後每一頁都以你的速度運行 | 〈慢下來〉三個池子 | 速度以每 1/8 拍 18% 指數滑行（模擬卡帶 wow） |

- reduced-motion：全部 animation 與 transition 關閉；太陽切縫凍結在 --s:.55 的靜態構圖，海豚停在空中；百葉轉場與倒帶不執行；速度與殘響仍以文字標示，資訊零損失。
- 自我限制：不用淡入、不用捲動揭示——蒸汽波的時間感來自「同一個循環被拉長」，不是內容一段段出現。

## 8. 插畫與圖像風格：vapor-collage 蒸汽波拼貼

- 只用四類原語：漸層圓（太陽，只在這裡用漸層）／透視格地／平面剪影（棕櫚、海豚，深青 #0B5C61）／大理石物件（feTurbulence 紋，粉灰）。
- 物件彼此不統一光影，不畫輪廓線；殘影是同一剪影的粉、青複製，以 multiply 疊在原物件後方、時間錯開 0.18–1.5 秒。
- 圖示：48px 方格內的平塗小圖（熱池波浪蒸氣、冷池雪花、烤箱木板、蒸氣雲、按摩泡泡、躺椅、電視牆、手），無描邊或只有 2px 墨線。

## 9. Logo 與 Favicon

- Logo：薄荷底上一顆切了三條縫的夕陽，下緣一條透視池磚；右側鉻質 Times 斜體「SIO-TSUÍ」，下方 DotGothic16 全形「燒水会館　ＳＰＡ」。
- Favicon：64×64 inline SVG data URI，同一顆切縫夕陽＋池磚，不放字。

## 10. Do & Don't

**Do**
- 讓地平線、太陽、格子地同時出現；讓粉與青同時出現。
- 把所有資訊放進可收起的視窗；收起不等於刪除。
- 讓動畫共用一個時鐘，並給使用者一個把它變慢的理由。
- 寫真實的店史細節：年份、物件、人名、價錢。

**Don't**
- 不用紫藍漸層、不做霓虹深底（那是另一種蒸汽波，且本館禁紫藍漸層）。
- 不用 emoji 當圖示；不用 Lorem ipsum；不放「EST. 19xx」徽章。
- 不旋轉系統視窗、不加模糊陰影（只用 6px 硬投影）、不做圓角卡片。
- 不把雕像、品牌商標或真實專輯封面描出來——胸像是無名的通用古典胸像。
- 不在沒有使用者手勢時發出聲音。

## 11. 頁面骨架範例

```html
<nav class="lockers" aria-label="館內導覽（置物櫃）">
  <a class="lk" href="index.html" aria-current="page"><span class="in" aria-hidden="true"><b>大廳</b><span>LOBBY</span></span>
    <span class="door" aria-hidden="true"><span class="lock"></span><span class="plate">０１</span></span><span class="sr">01 大廳</span></a>
  <!-- …其餘三格… -->
</nav>
<header class="hero">
  <div class="scene" aria-hidden="true"><div class="sky"></div><div class="sun"></div><div class="sea"></div>
    <div class="floorwrap"><div class="floor"></div></div><!-- 棕櫚、海豚、胸像 SVG --></div>
  <div class="collage">
    <section class="win w-title" data-drag aria-labelledby="t1">
      <div class="bar"><span class="t">燒水會館.txt</span><button type="button" data-shut aria-label="收起視窗">_</button></div>
      <div class="body"><p class="fw">ＳＩＯ－ＴＳＵＩ　ＳＰＡ</p><h1 id="t1" class="chrome">燒水會館</h1><p class="jp">サウナ・リラクゼーション</p><p>…</p></div>
    </section>
  </div>
</header>
<div class="checker" aria-hidden="true"></div>
```

```js
// 簽名：全站時鐘
function applyClock(rate){ document.getAnimations().forEach(a => { if(!a.__fixed) a.playbackRate = rate; }); }
document.addEventListener('animationstart', e => e.target.getAnimations().forEach(a => a.playbackRate = SIO.rate), true);
// 切段迴圈時倒帶全站
tape.on('loop', sec => document.getAnimations().forEach(a => { const t = a.currentTime - sec*1000*a.playbackRate; if (t >= 0) a.currentTime = t; }));
```

## 12. 技術實作與相容性

### 12.1 Web Audio 合成＋程序化殘響＋卡帶降速（D 輸入與感測層）

- **做什麼**：館內 BGM 四首全部在瀏覽器即時合成——雙算子 FM 電鋼琴（載波:調變 1:1，另加 14 倍頻的瞬間「tine」）、鋸齒波 pad、三角波貝斯、正弦踢鼓與噪聲 rim／hi-hat；旋律由 xorshift 種子從和弦音決定性產生。以 25ms 計時器＋140ms lookahead 排程。**降速**＝節拍長度除以 rate、所有頻率乘以 rate（音高與速度綁在一起，就像卡帶）；**殘響**＝ConvolverNode，脈衝響應由程式產生（雙聲道白噪聲 × (1−t)^2.6 衰減＋四個早期反射），長度 0.4／2.2／3.8／5.6 秒；**切段**＝排程器在 8／4／2 個八分音符內循環並發出 loop 事件。AnalyserNode 留作電平讀取。
- **查證**：MDN ConvolverNode 標示 Baseline Widely available（2015-07 起跨瀏覽器；建構子形式 2021-04）。AudioContext 需使用者手勢後 resume，本站只在按下播放時建立。
- **Fallback**：無 `AudioContext` 時播放鍵停用並說明；三個池子仍可操作，速度與殘響改為只作用在畫面（全站時鐘、殘影、倒帶以 setInterval 模擬迴圈長度），結果卡與包廂預約照常。

### 12.2 Web Animations API 全站時鐘（B 動效與時間軸層）

- **做什麼**：`document.getAnimations()` 取得所有 CSS 動畫與轉場，`playbackRate` 每一影格跟隨音訊實際滑行中的速度；`animationstart`（捕獲階段）讓之後才開始的動畫也加入同一時鐘；切段時把每支動畫的 `currentTime` 往回撥一個迴圈長度。百葉轉場與視窗開啟用 `Element.animate()` 並標記為不受時鐘影響。速度與殘響存在 sessionStorage，換頁後新頁一樣慢。
- **查證**：MDN `Document.getAnimations()` Baseline Widely available（2020-09 起）、`Animation.playbackRate` Baseline Widely available（2020-03 起）；MDN 範例本身就是「把全頁動畫 playbackRate 減半」。
- **Fallback**：不支援 `getAnimations` 時，動畫以原速運行，其餘功能不受影響；不支援 `Element.animate` 時不攔截連結、直接換頁。

### 12.3 CSS mask-image＋@property 程序化切縫（A 渲染層）

- **做什麼**：太陽的六條切縫是一支 `mask-image: linear-gradient()`，每個色標位置是 `calc()` 表達式、讀取註冊為 `<number>` 的 `--s`；`--s` 以 CSS 動畫 0→1，縫就連續往下流並變寬，無縫循環。同一個「切條」語彙延伸為百葉轉場與置物櫃門的通風縫。
- **查證**：MDN mask-image 無前綴 Baseline 2023（2023-12 起跨瀏覽器），本站同時寫 `-webkit-mask-image`；`@property` Chrome 85、Safari 16.4、Firefox 128 起支援。
- **Fallback**：`@property` 不支援時 `--s` 無法補間，切縫停在初始構圖（仍是切條夕陽）；mask 不支援時太陽為完整漸層圓。

### 12.4 效能實測

- 單頁大小（含全部 inline CSS／JS／SVG）：index ≈ 60KB、slow ≈ 70KB、pools ≈ 41KB、visit ≈ 41KB，皆遠低於 350KB 上限；字型由 Google Fonts 載入。
- 首屏 JS：只做 DOM 填字、日期計算與事件綁定；音訊引擎只在按下播放後建立。脈衝響應 5.6 秒（約 25 萬取樣 × 2 聲道）在 Node 實測生成約 13ms，只在切換蒸氣室層級時執行一次。
- 動畫：全部是 transform／background-position／單一元素 mask 重繪，無 layout 讀寫交錯；殘影最多 3 份複製且僅在蒸氣室 >0 時可見。
