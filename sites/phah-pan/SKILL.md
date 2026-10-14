---
name: gaito-kamishibai-street-paper-theater
description: Japanese street paper theater (gaitō kamishibai, c.1930–1950s) — every view sits inside a thick wooden butai stage with three hinged doors, content changes only by pulling the current card sideways to reveal the next, cards are opaque poster-paint cartoons with heavy black brush outlines and focus lines, all copy lives on kraft "card backs" with a numbered disc and red stage directions, and titles are hand-painted outlined lettering in a serial "episode / to be continued" structure.
---

# 街頭紙芝居・Gaitō Kamishibai

> 範例站：拍板枝仔冰 PHAH-PÁN KI-Á-PING（嘉義朴子，1956 年起敲南管拍板賣冰的枝仔冰店）。本規格書不綁產業——任何「會連載、要人每週回來、在街角面對一群人說話」的品牌都合用：麵包車、市集攤、兒童書店、社區電台、播客、連載漫畫、巡迴劇團、甚至一個每週發一次的電子報。

## 1. 設計哲學

街頭紙芝居（街頭紙芝居 gaitō kamishibai）約 1930 年在東京成形，前身是明治末年的「立ち絵」紙偶戲。說書人（紙芝居屋）騎腳踏車進巷子，後座綁著木製舞台（butai），到了就敲兩根拍子木（拍子木 hyōshigi）——作用像今天的冰淇淋車音樂，小孩聽到就跑出來。他們的收入來自賣糖（水飴、型抜き），**買糖的小孩坐第一排**。卡片是手畫的原件、向「貸元」租來，一套故事分好幾回，每回講到最要緊處就停：「つづく」。1931 年起的《黄金バット》（鈴木一郎 作・永松健夫 畫）是最早的披風英雄之一；1933 年東京約有 2,500 位街頭說書人，戰後高峰時全日本每天約五百萬人看紙芝居。水木しげる、白土三平、小島剛夕都是畫紙芝居出身。1953 年電視開播後迅速沒落，電視一度被叫做「電氣紙芝居」。

它為什麼長成這樣——四個物理限制：

1. **觀眾在五公尺外、站在街上**：所以圖必須大、粗、少，粗墨線＋不透明廣告顏料平塗，一張卡不超過六個主要形狀。
2. **說書人站在舞台側後方**：所以字不能印在正面——**每一張圖的台詞印在「前一張」卡的背面**，抽走一張插到最後，下一段字剛好朝著說書人。
3. **換場只有一個動作：把卡往旁邊抽出來**：所以抽的速度、停在一半，本身就是演技（研究者把紙芝居的形式定義為「抜く／差し込む／演じ手と観客が向かい合う」三個行為）。
4. **舞台是現實與故事的分界**：三扇門一開戲就開始，門一關就散場；沒有門時改用一張空白的「幕紙」代替。

這個風格的三個信念：**圖是用來被遠遠看見的／字是給說的人看的／換頁就是表演。**

## 2. 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 夜藍 dusk | `#2B2C52` | 黃昏天空最上帶、頁面底 | 20% |
| 紫暮 dusk2 | `#4A3560` | 天空第二帶 | 6% |
| 梅 plum | `#7A3B55` | 天空第三帶 | 5% |
| 茜 akane | `#DD6A3A` | 天空第四帶 | 5% |
| 琥珀 amber | `#F2A64A` | 地平線帶 | 3% |
| 巷底 street | `#2A1E26` | 地面、頁尾、內容區底 | 16% |
| 舞台木 wood / 深木 / 淺木 | `#9A6337` `#5E3A1F` `#C08A55` | 舞台框、門、看板、樑 | 14% |
| 牛皮卡背 kraft | `#CFB07D`（淺 `#E2C996`） | 所有正文的底（卡背） | 18% |
| 卡紙 paper | `#F1E4C4` | 卡片底、按鈕 | 4% |
| 墨 ink | `#1C1512` | 所有輪廓線、正文字 | 全站 |
| 朱 vermilion | `#E2452B`（深 `#B02E1C`） | 舞台指示、號碼圓、現用頁、重點 | ≤6% |
| 鉻黃 / 鈷藍 / 葉綠 / 桃 | `#F5C02A` `#2456A6` `#3F9446` `#EF8FA6` | 只在卡片圖裡、招牌字色影 | 卡內 |

規則：**卡片裡**用飽和廣告顏料色（每張卡一個主色場＋兩三個對比色），**卡片外**的世界是暗的黃昏與木頭——讓卡片永遠是畫面上最亮的那一塊，就像傍晚巷口那個發亮的框。天空用硬邊色帶，不做平滑漸層。

## 3. 字體系統

- **招牌字**：Noto Sans TC 900（Google Fonts）＋`-webkit-text-stroke:.12em` 墨邊＋`paint-order:stroke fill`＋兩層偏移影（色→墨）。字級 `clamp(34px,6vw,64px)`，行高 1.08，字距 .04em。
- **卡背腳本（正文）**：LXGW WenKai TC 400/700——像說書人手抄的稿。17px／行高 1.75；手機 16px。
- **標籤、價目、按鈕**：Noto Sans TC 700/900，11–15px，字距 .06–.14em。
- 舞台指示（ト書き）一律朱色粗體、全形括號：`（慢慢抽）（快抽！）（抽一半，停住……再一口氣抽完）`。
- 卡片正面**不寫字**，唯一例外是標題卡與結尾卡（「第一回」「下回待續」）。

## 4. 版面與網格

- 首屏 = 一座舞台：桌機 `grid-template-columns: minmax(0,680px) minmax(280px,360px)`，左舞台右卡背，gap 44px；≤980px 堆疊。
- 舞台窗比例 **380:265（≈1.43，實際紙芝居卡 38×26.5 cm）**，框厚 18px（手機 10px），上方看板寬 62%，下方是冰箱／行李箱／貨架之類的「載具」，再下面露出兩個輪子。
- 舞台前方永遠站著一排**觀眾的後腦勺**（圓頭＋肩膀的剪影），壓在舞台下緣上 `margin-top:-82px`；他們是畫面的前景。
- 內容區是一疊攤在桌上的卡背：12 欄網格，每張 `rotate(±.5–.6deg)`，手機一律 1 欄不旋轉。
- 留白規則：卡片內滿版（色場出血），卡片外大量暗色留白——像傍晚的巷子。

## 5. 元件配方

- **導覽（木札翻面 fuda-flip）**：樑下掛四片木札（46×92px、直排頁名、上端一根 2px 繩），現用頁的札 `rotateY(180deg)` 翻到朱色那面；hover 時以釘子為軸擺盪 `swing .9s`。≤760px 收進樑內成一列橫向小札。
- **按鈕**：卡紙底＋3px 墨框＋`box-shadow:3px 3px 0 var(--ink)`，按下位移 2px；主要按鈕朱底白字。
- **卡背（card back）**：牛皮紙＋斜細紋，頭部一列：朱色號碼圓（漢字數字）／前一張卡的縮圖（92px）／標題＋「印在第○張背面」；底部虛線＋「○／七」。
- **表單**：欄位 3px 墨框、卡紙底；錯誤訊息朱色 900 字，用說書人的口氣（「週一公休，換一天吧。」）。
- **頁尾**：墨底、淺牛皮字，三欄（地址時間／人物／頁面），細字聲明。
- **幕紙**：一整張牛皮紙＋中央店徽，換頁時由右推入、新頁再抽走。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 本站做法 | 參數 | 降級 |
|---|---|---|---|
| ambient 環境 | 冰箱縫冒冷氣（6 條 wisp 循環上飄）、觀眾後腦勺輕微起伏、路燈偶爾閃 | wisp 4.2s linear；bob 2.2–3.1s ease-in-out 錯相；lamp 7s steps(1) | 冷氣靜止 .6 透明、觀眾不動、燈常亮 |
| input 輸入 | 抓住卡片往右拉，卡片位移＝WAAPI currentTime 直接由指標寫入（同一幀）；紙摩擦聲音量隨速度；木札 hover 擺盪 | 拉動距離／(窗寬×1.06)；放手 >55% 或速度 >1.6 窗寬/s 即抽完，否則停在原地 | 拖曳照常（是直接操作）；按鈕改為瞬間換卡 |
| transition 轉場 | 三扇門開關（左右 rotateY ±118°、上門 rotateX 112°）；卡背 rotateY 翻面換字；換頁＝幕紙插入／抽走 | 門 .9s cubic-bezier(.5,0,.25,1.2)，上門延遲 .12s；翻面 .5s；幕紙 380ms 入／520ms 出 | 門直接開、卡背直接換字、換頁不攔截 |
| signature 簽名 | **抜き（抽卡）**：慢抽、快抽、抽一半停住——停在一半時下一張只露出左半（構圖刻意把懸念放在左半），觀眾往前傾、太鼓一聲；抽完觀眾跳起來舉手 | 一半區間 30–70%；停頓 ≥1.2s 才算「停住」 | 「抽一半」直接停在 50%，資訊與判定不變 |

自我限制：**本站禁用淡入淡出與交叉溶解**——紙芝居的卡是實體紙，只能被抽走，不能變透明。

## 7. 插畫與圖像風格（gaito-gouache）

- 每張卡 = 一個主色場（不透明平塗）＋集中線或放射色帶＋一到三個主體。
- 形狀以 SVG `paint-order:stroke` 畫：墨線 6 單位寬、一半壓在色下，看起來像先描後塗、線有厚度。
- 陰影只有**一階**平色，固定落在右下；高光是一條白色短弧。
- 人物大頭、大眼（白眼＋黑瞳＋一點反光）、腮紅圓；動物同理。
- 整張卡套一層 `feTurbulence→feDisplacementMap`（scale 2.4）讓線微抖，再疊一層橫向拉長的雜訊當筆刷痕。
- **構圖要為抽卡設計**：下一張卡的左半是「被先看到的那一半」，懸念放左邊（例：阿黃的大嘴在左、被咬住的冰在中間、笑的小孩在右）。

## 8. Logo 與 Favicon

- Logo：鉻黃圓章＋橘色放射＋五片南管拍板扇開＋一枝酸梅冰，6px 墨框。
- Favicon：木框裡的鉻黃窗，窗中一枝朱色冰——就是一座迷你舞台。inline SVG data URI。
- 原則：紙芝居品牌的識別一定是「框」——把你的主角放進一個木框。

## 9. Do & Don't

**Do**：卡片內滿版飽和色／粗墨線／一張卡一件事／字放在卡背／每一次換內容都是一次「抽」／連載編號與「下回待續」／觀眾在畫面裡。

**Don't**：卡片正面放說明文字／淡入淡出／漸層按鈕／細線插圖／把舞台做成普通的輪播（carousel 是左右滑、紙芝居是**從疊裡抽走露出下一張**，下一張一直在下面）／emoji icon／紫藍漸層／置中三卡片／Lorem ipsum。也不要畫成任何既有紙芝居或漫畫角色。

## 10. 本風格的 5 個不可省略特徵

### ① 木舞台框＋三扇門（拿掉它就只是一張插畫）

主要內容永遠坐在一個有厚度的木框裡，框上有看板、框下有載具，開場是三扇門打開。

```css
.frame{position:relative;padding:18px;border:4px solid #1C1512;border-radius:6px;perspective:1400px;
  background:repeating-linear-gradient(90deg,transparent 0 23px,rgba(0,0,0,.09) 23px 25px,transparent 25px 61px),
             linear-gradient(180deg,#C08A55,#9A6337 12%,#9A6337 88%,#5E3A1F);box-shadow:8px 10px 0 rgba(0,0,0,.4)}
.door{position:absolute;border:4px solid #1C1512;background:#9A6337;transition:transform .9s cubic-bezier(.5,0,.25,1.2)}
.door.l{left:14px;top:14px;bottom:14px;width:calc(50% - 14px);transform-origin:0 50%}
.door.r{right:14px;top:14px;bottom:14px;width:calc(50% - 14px);transform-origin:100% 50%}
.door.t{left:14px;right:14px;top:14px;height:24%;transform-origin:50% 0;transition-delay:.12s}
.open .door.l{transform:rotateY(-118deg)} .open .door.r{transform:rotateY(118deg)} .open .door.t{transform:rotateX(112deg)}
```

### ② 抜き——內容只能被「抽走」（拿掉它就是輪播）

下一張卡一直在下面；目前這張往側邊抽出，可以停在一半。位移是暫停的 WAAPI，手勢直接寫 `currentTime`。

```js
const a = card.animate([{transform:'translateX(0)'},{transform:'translateX(108%)'}],{duration:1000,fill:'both'});
a.pause();
win.onpointermove = e => { a.currentTime = clamp((e.clientX - x0) / w) * 1000; };   // 手指在哪，卡就在哪
win.onpointerup  = () => { if (a.currentTime > 550) { a.playbackRate = Math.max(1.6, v*1.4); a.play(); } };
// 抽一半：播到 500 就停；再按一次以 2.6 倍速抽完
```
```css
.win{clip-path:inset(0 -220% 0 0)}  /* 只放開右側，卡片從側邊抽出、壓過外面 */
```

### ③ 街頭膠彩畫法：不透明平塗＋粗墨線＋集中線（拿掉它就是向量插畫）

```svg
<path d="…" fill="#E2452B" stroke="#1C1512" stroke-width="6" stroke-linejoin="round" paint-order="stroke"/>
<!-- 單階影：同形的右側 1/3 用深一階的平色；最後再描一次外框 -->
<filter id="wob"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2"/>
  <feDisplacementMap in="SourceGraphic" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter>
<!-- 集中線：由畫外射入、中心留空的細長三角形，隨機角寬 .018–.048rad -->
```

### ④ 卡背腳本：字都在「前一張」的背面（拿掉它就是一般圖說）

```html
<div class="cardback">
  <div class="hd"><span class="num">三</span><span class="thumb"><svg viewBox="0 0 380 265"><use href="#card-2"/></svg></span>
    <div><h2>拍板</h2><span class="meta">卡背腳本・印在第二張背面</span></div></div>
  <p>別人賣冰是搖鈴，金水不搖鈴……喀！喀！ <em class="dir">（抽一半，停住……再一口氣抽完）</em></p>
  <div class="ft"><span>紙芝居 第一回</span><span>3／7</span></div>
</div>
```
```css
.cardback{background:repeating-linear-gradient(3deg,rgba(0,0,0,.035) 0 2px,transparent 2px 6px),#CFB07D;border:3px solid #1C1512;box-shadow:6px 7px 0 rgba(0,0,0,.4)}
.num{width:46px;height:46px;border-radius:50%;background:#E2452B;color:#FFF8EA;border:3px solid #1C1512;display:grid;place-items:center;font:900 22px 'Noto Sans TC'}
.dir{color:#B02E1C;font-weight:700;font-style:normal}
```

### ⑤ 手繪招牌字＋連載結構（拿掉它就沒有「下回待續」的街頭感）

```css
.sign{font:900 clamp(34px,6vw,64px)/1.08 'Noto Sans TC';color:#F5C02A;
  -webkit-text-stroke:.12em #1C1512;paint-order:stroke fill;
  text-shadow:.07em .07em 0 #E2452B,.1em .1em 0 #1C1512}
```
每組內容都是「第○回」，第一張是標題卡、最後一張必是「下回待續」；說書人的開場聲（拍子木／拍板）是品牌的一部分。

## 11. 頁面骨架範例

```html
<header class="beam"><a class="brand">…</a><nav class="fuda-row"><a class="fuda" aria-current="page"><span class="face front">舞台</span><span class="face back">舞台</span></a>…</nav></header>
<main><section class="scene">
  <div class="stagewrap">
    <div class="butai"><div class="kanban"><span>紙芝居</span></div>
      <div class="frame"><div class="win"><div class="kcard">…卡 1…</div><div class="kcard">…卡 2…</div></div>
        <div class="slot"></div><div class="door l"></div><div class="door r"></div><div class="door t"></div></div>
      <div class="icebox">…載具…</div></div>
    <aside><div class="cardback">…目前這張的台詞…</div><div class="ctrl"><button>慢慢抽</button>…</div></aside>
  </div>
  <svg class="crowd">…觀眾後腦勺…</svg>
</section><div class="deck">…一疊卡背…</div></main>
```

## 12. 技術實作與相容性

| 技術 | 承載什麼 | 支援現況（查證） | 不支援時 |
|---|---|---|---|
| **Web Animations API：手勢 scrub 的時間軸**（`Animation.currentTime` 寫入、`playbackRate` 正負切換、`finished` promise） | 特徵②抽卡：卡片位置＝指標進度；放手後依速度續播或倒播回原位；「抽一半」播到 500ms 停住 | MDN：`Animation.currentTime`、`updatePlaybackRate()` 皆 Baseline Widely available（2020-03 起）；`playbackRate` 可為 0、負值 | 無 `Element.animate` 時（極舊瀏覽器）不載入舞台互動，無 JS 時窗變成 scroll-snap 橫向卷軸，七張卡全部可看、全部台詞列在下方 |
| **Web Audio 即時合成**（`AudioBufferSourceNode`＋高 Q `BiquadFilter` 帶通、`OscillatorNode` 頻率下滑、`setTargetAtTime`） | 拍板：兩聲噪聲激發 2.3k／3.4k Hz 共振（間隔 115ms）；紙摩擦聲：循環噪聲→帶通，音量與中心頻率跟抽卡速度走；太鼓：118→58 Hz 正弦下滑 | MDN：`BaseAudioContext.createBiquadFilter()`、`createBuffer()` Baseline Widely available（2021-04 起）；AudioContext 須使用者手勢後才能出聲 | 第一次點擊／按鍵才建立 AudioContext；無 Web Audio 時全部靜音，所有回饋都另有視覺（觀眾傾身／跳起、朱字評語）；右上可關聲音並記在 sessionStorage |
| **CSS 3D transform**（`perspective`、`transform-style:preserve-3d`、`backface-visibility`） | 特徵①三扇門、木札翻到朱色面、冰箱口味卡翻到背面、卡背翻面換字 | MDN：`backface-visibility` Baseline Widely available（2022-03 起） | 不支援時門仍以 2D 轉場收起；reduced-motion 時門直接開、翻面直接換內容 |

**效能預算（本站實測）**：單頁 index 117KB／ice 122KB／play 99KB／visit 50KB（含全部 inline SVG 卡片、CSS、JS；Google Fonts 外部不計）＜350KB。首屏 JS 只做：建一支暫停的 WAAPI 動畫、綁事件、算一次朴子當地時間（Intl.DateTimeFormat），在 jsdom 模擬環境中整段腳本執行 index 36ms、play 9ms、ice 12ms、visit 3ms（jsdom 比瀏覽器慢，實機應更低）；拖曳時每幀只寫一次 `currentTime`（合成器處理 transform，無 layout），SVG 濾鏡只作用於當前與下一張卡（其餘 `visibility:hidden`）。

查證來源：MDN〈Animation: currentTime property〉〈Animation: updatePlaybackRate() method〉〈BaseAudioContext: createBiquadFilter() method〉〈backface-visibility〉；紙芝居史料：Wikipedia〈Kamishibai〉、Washington and Lee University〈Background on Kamishibai〉、Princeton Cotsen〈Pop Goes the Page: Kamishibai〉（台詞印在前一張背面、舞台側面開口供抽卡）、Eric P. Nash《Manga Kamishibai: The Art of Japanese Paper Theater》（Abrams, 2009）、日本保育研究中對紙芝居形式「抜く／差し込む／向かい合う」的定義。
