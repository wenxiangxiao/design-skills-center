---
name: hanafuda-flower-cards
description: Japanese hanafuda flower-card style — small black-rimmed 2:3.25 cards, twelve months × four cards motif grammar, woodblock sumi keyline with stencil-brushed flat seven-pigment colour slightly off-register, red and blue poem ribbons, scalloped vermilion haze bands and a white full moon, cards laid out, fanned and slapped onto a play mat.
---

# 花札 Hanafuda — 十二月四十八枚の札

> Demo：花月立飲 HUE-GUE̍H（臺北條通的立飲酒場，虛構）。本規格不綁產業：任何「有月令、有分級、有收集」的內容（茶、甜點、花店、年曆、會員等級）都能套。

## 設計哲學

花札是禁令催生出來的紙牌。十六世紀末葡萄牙紙牌傳入後出現的天正かるた（4 花色 × 12 數）屢遭幕府禁止，製牌者把「數字」藏起來，改成「12 個月 × 4 枚」的花鳥圖——看起來是花，其實每一枚都是一個等級。江戶後期成形，明治中期解禁後在京都正面通一帶大量生產（1889 年創業的山內房治郎製牌所是其中之一）。

製作條件決定了它的長相：

- **墨版先印輪廓**（木版），**顏色用合羽摺**（型紙＋刷毛逐色刷上），所以色塊是平的、色與墨線之間常有固定的套印偏移；
- 牌面貼在**黑色厚裏紙**上、四邊折回，正面因此有一圈**黑緣**；
- 一副 48 枚、尺寸約 33×54mm，**永遠以複數出現**：扇在手上、攤在座布團上、疊成山札；
- 唯一的文字是短冊上的和歌片段（あかよろし、みよしの）。

所以這個風格的網頁不是「一張大插畫」，而是**一組可以收集、排列、拍下去的小札**。資訊被分到四個等級（光・種・短・カス），版面被分到十二個月。

## 本風格的 5 個不可省略特徵

### ① 黒縁の小札：2:3.25、直角、3% 黑緣，永遠成組出現

拿掉黑緣就變成普通插畫卡；做成單一大卡就變成海報。角一律直角（零圓角），卡片寬度 28–140px，任何畫面至少同時出現 3 枚以上。

```css
.fuda{width:var(--w,64px);aspect-ratio:64/104;background:#1B1714;border-radius:0}
.fuda svg{display:block;width:100%;height:100%}
```
```svg
<svg viewBox="0 0 64 104"><rect width="64" height="104" fill="#1B1714"/>
<rect x="2.6" y="2.6" width="58.8" height="98.8" fill="#F3EBD8"/><!-- 圖案畫在這裡 --></svg>
```

### ② 十二月四札の文法：植物從下緣長出、天空在上，四級制

每個月一種植物（松 梅 桜 藤 菖蒲 牡丹 萩 芒 菊 紅葉 柳 桐），每月四枚：光 20／種 10／短 5／カス 1。圖面的結構固定：上方是「空」（霞帶或紅天），下方是植物，種札在植物上加一隻鳥獸或器物（鶯、蝶、猪、鹿、盃、燕）。內容的分類就照這套：月＝類別，四級＝價位或重要度。

```js
const MONTHS=['松','梅','桜','藤','菖蒲','牡丹','萩','芒','菊','紅葉','柳','桐'];
const KIND={h:['光',20],t:['種',10],r:['短',5],k:['カス',1]};
// id = (月-1)*4 + i ；每月第 0 枚通常是光或種
```

### ③ 合羽摺の七色平塗り＋墨版ずれ

色票只有七色＋紙＋墨，全部平塗，**零漸層、零陰影、零透明**。色層整體對墨線偏移 `translate(.7 .5)`（約 1% 卡寬），墨線不偏——這是套印誤差，不是錯誤。

```svg
<g transform="translate(.7 .5)"><circle cx="32" cy="32" r="17" fill="#FFFDF6"/></g><!-- 色版 -->
<g><circle cx="32" cy="32" r="17" fill="none" stroke="#1B1714" stroke-width=".7"/></g><!-- 墨版 -->
```

### ④ 短冊と仮名：紅／藍兩種緞帶是唯一的文字容器

牌面上唯一的字是短冊上的假名詩句；網頁上的標籤、月名、規則條目也一律裝進短冊——直書、實色底、零圓角、略為傾斜（±2–7°）。

```css
.tanzaku{display:inline-flex;writing-mode:vertical-rl;font:900 15px/1 "Noto Serif TC",serif;
 letter-spacing:.16em;background:#D2352B;color:#F3EBD8;padding:.7em .32em}
.tanzaku.ao{background:#24438C}
```

### ⑤ 赤い霞と満月：圓瘤下緣的紅帶＋白色正圓

光札的天空是整片朱紅，霞是一條下緣成串圓瘤的紅帶；芒に月的白色滿月是全套最強的符號。網頁的區段標頭就是霞帶，首屏用紅天＋白月＋黑山。

```css
.kasumi{position:relative;background:#D2352B;color:#F3EBD8}
.kasumi::after{content:"";position:absolute;left:0;right:0;bottom:-15px;height:16px;background:#D2352B;
 mask:radial-gradient(circle 15px at 15px 0,#000 14.5px,transparent 15px) 0 0/30px 16px repeat-x}
.moon{border-radius:50%;background:#FFFDF6;border:2px solid #1B1714}
```
```js
// SVG 霞帶：上緣直、下緣 n 個半橢圓瘤
function hazePath(w,h,bw){const n=Math.round(w/bw),b=w/n;let d=`M0 0H${w}V${h-b/2}`;
 for(let i=0;i<n;i++)d+=`A${b/2} ${b/2.4} 0 0 1 ${w-(i+1)*b} ${h-b/2}`;return d+'Z';}
```

## 色彩系統

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 座布団・灰紫 mat | `#6A5876` | 頁面底（中間調、有 1px 織線） | ~40% |
| 札地 paper | `#F3EBD8` | 卡面、內容卡、表單 | ~22% |
| 墨 sumi | `#1B1714` | 黑緣、墨線、芒山、頁尾 | ~14% |
| 朱 vermilion | `#D2352B` | 紅天、霞帶、赤短、主按鈕 | ~14% |
| 黄 | `#EDB22C` | 菊、月、焦點框、今月標記 | ~4% |
| 藍 bero | `#24438C` | 青短、菖蒲 | ~2% |
| 綠 / 桃 / 紫 / 茶 | `#3F7D3A` `#E9A0B2` `#6C4A93` `#8A5A2B` | 只在卡面內使用 | ~4% |
| 胡粉 white | `#FFFDF6` | 滿月、白鶴、幕 | <1% |

規則：綠桃紫茶四色**只出現在札面上**；頁面 UI 只用 mat／紙／墨／朱／黃／藍。

## 字體系統

- 標題、短冊、月名：**Noto Serif TC 900**（Google Fonts），字距 .02–.24em；短冊直書。
- 內文、按鈕、小標：**Noto Sans TC 500／800**。
- 字級：h1 `clamp(34px,5vw,84px)`、h2 `clamp(26px,3.6vw,40px)`、內文 16px／1.75、標籤 11–13px 字距 .18–.42em。
- 札面上的字只有假名詩句與「寿」，用 SVG `<text>` 900 字重。

## 版面與網格

- 首屏是「場」：左 55% 是手札扇面（8 枚，以卡片下方 40% 處為軸、每枚相差 8.5°），右 45% 是像牌盒標籤的紙卡（紙底＋墨框＋朱框三層 box-shadow）。
- 區段之間用霞帶分隔；內容塊是平放在 mat 上的紙卡或札，彼此 ±2–2.4° 旋轉。
- 十二月頁：每列＝月名短冊｜四枚札｜價目紙卡；今月整列加黃框。
- 留白：區段間距 60–90px；札與札間距 8–18px。≤760px 時導覽落到底部、札寬改 `min(19vw,74px)`。

## 元件配方

- **導覽「札山」**：右上四枚 40px 小札，非現用頁是黑裏（`rotateY(180deg)`），hover 翻到正面露出該頁的札；現用頁正面朝上、下沉 8px、轉 −4°。下方短冊寫頁名。點擊時那枚札翻正、頁面上的札全部被收回那一枚（集札轉場）。
- **按鈕**：朱底紙字、`box-shadow: inset 0 0 0 3px #1B1714`、零圓角；次按鈕墨底、第三按鈕黃底墨字。
- **卡片（內容）**：`.paper{background:#F3EBD8;color:#1B1714;box-shadow:0 0 0 4px #1B1714}`。
- **表單**：白底 inset 2px 墨框、零圓角；送出後產生一張「受付札」（隨機的一枚札＋號碼）。
- **頁尾**：墨底，最後一行黃字。酒類題材必寫「飲酒過量，有礙健康」。

## 動效規則

| 類型 | 本站實作 | 觸發 | 時間／曲線 | 減少動態 |
|---|---|---|---|---|
| ambient | 手札扇面緩慢擺動 ±1.2°；今月（臺北時間 `Intl` 取月）決定首頁手札、今月列與標記 | 持續／真實時刻 | 7s ease-in-out alternate | 停在 0°，月份資訊照常 |
| input | 札 hover 上浮 26px（扇面）／14px（手札）／8px（十二月）；拖曳時札隨游標並依水平速度傾斜 ±14° | hover／pointer | 90ms ease-out，拖曳逐幀 | 上浮保留（瞬間），拖曳無傾斜 |
| transition | 配札：每頁的 `.deal` 區塊從右上山札位置發到原位；集札：換頁時全部飛回被點的那枚導覽札；取札：同文件 View Transitions 把兩枚札移到取り札列；十二月頁點札 3D 翻面 | 載入／換頁／取札／點擊 | 配 520ms `cubic-bezier(.2,.9,.3,1.05)` stagger 55ms；集 300ms；取 420ms；翻 340ms `cubic-bezier(.3,1.35,.5,1)` | 全部直接到位 |
| signature | **札打ち fuda-uchi**：放開時的拋擲速度 v 同時決定 ① 是否被同月場札吸附（70px 內磁吸） ② 拍下去的壓扁 `scale(1.08,.86)` 與回彈長度 180+120v ms ③ 被拍的場札跳起 4+12v px ④ 其他場札的震動角度 ±(1+3v)/2° ⑤ WebAudio 合成拍札聲的音量與帶通頻率 1400+2600v Hz | pointerup | 摩擦 0.86／幀、吸附 0.38／幀 | 不滑行：直接判定最近的同月札（110px 內），無壓扁無震動，聲音可選 |

自我限制：不用淡入當主打、不用跑馬燈、不用視差。

### motion-library 元件表

來源：`wenxiangxiao/motion-library` v1.8.0 @a75f72c，`tools/ml-embed.js` 每頁只抽該頁元件的繪製核心子集＋`src/motion-player.js`，inline 為每頁第一個 `<script>`。開發 Prompt：`MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-24 | Text Fan | 首頁 | text「花月立飲」、primary `#D2352B`、secondary `#1B1714`、bg `#F3EBD8`、duration 1.6、loop false、intensity 1.1、seed 1988、16:9 | transition | 店名四字像一手札一樣由扇形合攏成一列——與左邊扇開的手札同一個動作；只有 fillText，無發光無圓角，紙底得近黑字 |
| TXT-B-32 | Shuffle Letters | 一局 | text「札を切る」、primary `#F3EBD8`、secondary `#EDB22C`、bg `#D2352B`、duration 1.4、seed 8 | transition | 切札：字母互換位置再歸位，每次「重新切札」重播；紅天底得近白字 |
| TXT-A-06 | Stretch Pop | 一局 | text「役」、primary `#D2352B`、secondary `#1B1714`、bg `#F3EBD8`、duration .9、seed 3 | input | 成役那一刻的「役！」彈出，由玩家的出牌觸發；只做 scale，平塗墨字 |
| BG-B-30 | Confetti Fall | 十二月 | primary `#E9A0B2`、secondary `#FFFDF6`、bg `#6A5876`、duration 9、density .7、intensity .8、seed 3 | ambient | 只放在三月「桜」那一列背後的花吹雪；fillRect 平塗小長方塊、零陰影零圓角，顏色取札面的桃與胡粉 |
| TXT-A-26 | Flip | 場所 | text「今晚有開／今晚未開」（依臺北時間）、primary `#D2352B`、secondary `#1B1714`、bg `#F3EBD8`、duration 1.2、seed 6 | transition | 字逐個翻面，翻到背面時是朱色——像一排札從裏翻到表；只做 scaleY |

掛載包裝（照 `sites/ka-to` 的 `KT.ml`）：`document.fonts.ready` 後掛、IntersectionObserver 離屏 `destroy()`、一次性元件 `loop:false` 播一次後重掛 `seek(1)`、canvas `aria-hidden`、容器內保留 `.ml-fb` HTML 標題、減少動態時背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

- 技法「合羽摺＋墨版」：每個圖形畫兩次——色版（平塗、偏移 .7/.5）＋墨版（同一路徑、`fill:none; stroke:#1B1714; stroke-width:.7`）。墨色實心（芒山、柳の雷底）只畫在墨版。
- 原語：圓（花、月、日）、五瓣圓群（梅櫻）、半圓扇＋放射線（松針）、十角星（紅葉）、橢圓串（藤）、三葉剪影（桐）、二次曲線鳥形（鳥獸一律剪影＋一顆墨點眼）。
- 不寫實、不加光影、不畫人物臉；全部原創簡化圖形，不臨摹任何一家製牌商的版面。

## Logo 與 Favicon 設計指南

Logo 就是一枚簡化的〈芒に月〉：黑緣、朱天、白月、黑山＋三條芒線，64×104。Favicon 用同一 SVG、viewBox 左右加白邊成正方。不得加字、不得加圓角。

## Do & Don't

- Do：札永遠成組；用月份分類內容；用光種短カス分級；讓使用者翻、扇、拍札。
- Do：色層偏移、墨線不偏；短冊直書。
- Don't：漸層、陰影、玻璃、圓角卡；紫藍漸層 hero；置中三卡片；emoji icon；EST. 徽章。
- Don't：把一枚札放大成整頁海報（那是 Sachplakat 或浮世繪）；把札畫成撲克牌數字。
- Don't：臨摹市售牌組的具體圖案；畫賭博金額。本站「只換酒不換錢」。

## 頁面骨架範例

```html
<section class="kasumi"><div class="wrap"><span class="sub">十二月・四十八枚</span><h1>十二月</h1></div></section>
<div class="wrap">
 <section class="tm">
  <span class="tanzaku">十月・紅葉</span>
  <div class="four"><!-- 4 × .fuda --></div>
  <div class="menu"><div class="paper"><b>紅葉 秋上がり</b>一合 NT$340</div></div>
 </section>
</div>
<nav class="yama"><a class="on" href="index.html"><div class="fuda"><!-- 正面 --></div><span class="lb">花月</span></a></nav>
```

## 技術實作與相容性

| 技術 | 用途 | 支援現況（查證） | fallback |
|---|---|---|---|
| Pointer Events 拖曳＋`setPointerCapture`＋速度取樣＋rAF 摩擦／磁吸積分（D 層） | 札打ち的拋擲：最近 6 筆 pointermove 求速度，放開後 x+=v/60、v×=.86，進入同月場札 70px 內改為 0.38 比例吸附 | MDN：`setPointerCapture()` Baseline Widely available（2020-07 起跨瀏覽器） | 點選模式：先點手札、再點場札（鍵盤 Enter／Tab 同樣可玩）；減少動態時不滑行直接判定 |
| Web Audio 合成（`AudioBuffer` 白噪＋`BiquadFilterNode` 帶通＋`OscillatorNode` 低頻）（D 層） | 拍札聲，音量 .25+.65v、頻率 1400+2600v Hz，與壓扁同一幀觸發 | MDN：`createBiquadFilter()` Baseline Widely available（2021-04）；預設關閉，按「拍札音」後才建立 AudioContext（自動播放政策） | 無 AudioContext 時靜音，其他不變 |
| 同文件 View Transitions `document.startViewTransition()`＋動態 `view-transition-name`（B 層） | 取札時兩枚札從場上飛進取り札列 | caniuse／web.dev（2025-10-16）：Chrome／Edge 111、Safari 18、Firefox 144 起支援，Baseline Newly available；Firefox for Android 150 | 不支援時以 WAAPI FLIP（量前後 rect 再 invert）；減少動態時直接移動 |

其他：`Intl.DateTimeFormat({timeZone:'Asia/Taipei'})` 取今月與營業狀態；無 JS 時每頁 `<noscript>` 給出文字版（十二月價目、一局的店內玩法）。

效能（建置時量測）：四頁 99–114KB（含 motion-library 子集約 59KB、48 枚札由 JS 產生不另佔 HTML）；48 枚 SVG 字串生成於 node 量測約 4ms；同一畫面運轉的元件 ≤1；拖曳期間只改單一元素 transform。另以 2,000 組隨機牌局模擬貪婪玩法：71% 的局至少成一個役（カス 28%、タン 22%、三光 10%、花見／月見各 11%）。
