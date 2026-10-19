---
name: ghana-mobile-cinema-poster
description: Hand-painted Ghanaian mobile-cinema movie poster style — sign-painter enamel on stitched flour sacks, monsters bigger than houses, muscles on everything, extruded block titles and painted taglines crammed into the gaps.
---

# 迦納流動電影院手繪海報 Ghanaian Mobile Cinema Poster — 風格規格書

> 範例站：`sites/kim-sai/`（金獅病媒防治 KIM-SAI，基隆）。本規格不綁產業：任何「需要把一件小事講成一部大片」的品牌都適用——除蟲、修車、夜市攤、摔角、補習班、跳蚤市場、地方選舉造勢。

## 設計哲學

1985–1995 年前後，錄影帶從特馬（Tema）、塞康第等港口流進迦納內陸，創業者用一台小貨車載電視、錄影機與發電機巡迴村鎮放片，史稱「流動電影院 mobile cinema」。片商不附宣傳品，放映的人就找受過學徒訓練的招牌畫師，在耐日曬雨淋的**空麵粉袋**上手繪海報。畫師常常沒看過電影，照片名自己想；海報是唯一的廣告，越誇張賣越多票——於是怪物比房子大、子彈會轉彎、連衣服都長了肌肉（Poster House 策展人 Angelina Lippert：「The clothing has muscles. Everything has muscles in these posters.」）。代表畫師：D. A. Jasper（阿克拉，健美愛好者，把超級肌肉帶進整個畫派）、Leonardo、Heavy Jay（Teshie）、Death is Wonder、Joe Mensah 等；收藏與研究：Ernie Wolfe《Extreme Canvas》1、2 冊，紐約 Poster House 2019《Baptized by Beefcake》，芝加哥 Deadly Prey Gallery。

這個風格長成這樣，全是製作條件決定的：

- **畫布是麵粉袋**：兩只縫成一張，縫線橫過畫面；袋上印的藍色麵粉商標會從漆底下透出來；沒刷到的地方就是原色麻布。
- **顏料是招牌漆**：不透明、平塗、飽和；暈染太費工，所以天空是三四條硬邊色帶。
- **畫師是招牌師**：片名一定是粗塊字＋立體擠出面＋黑邊，因為招牌就是這樣寫的；最後在右下角簽名留電話接下一單。
- **沒看過電影**：於是構圖是「最吸睛的東西拼在一起」，尺度與透視不統一，怪物、爆炸、尖叫的人各自最大。

**一句話：把一件事畫成它最誇張的那個版本，而且畫得很認真。** 誇張是內容策略，不是畫得很亂——每一塊都有三階明暗、每一個字都有立體面。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「普通的普普插畫」或「B 級片海報 parody」，不再是迦納海報。

### ① 麵粉袋畫布：麻布織紋＋縫線＋透出來的商標鬼印

整頁（與每張海報）底下永遠是麻布；區塊與區塊之間是縫線；藍色袋印以 multiply 疊在漆上。

```css
/* 麻布：SVG-as-image 裡的兩支 feTurbulence（橫紗、直紗）相乘，靜態平鋪 */
body{background:#D8C7A0 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9 .045' numOctaves='2' seed='7' stitchTiles='stitch' result='h'/%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.045 .9' numOctaves='2' seed='3' stitchTiles='stitch' result='v'/%3E%3CfeBlend in='h' in2='v' mode='multiply'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 .25 0 0 0 0 .18 0 0 0 0 .08 -1.6 0 0 0 1.05'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23w)' opacity='.55'/%3E%3C/svg%3E")}
/* 袋與袋之間的縫線：斜針腳＋一條陰影線 */
.sackp{position:relative;background:#D8C7A0}
.sackp.t2{background-color:#CDBB92}.sackp.t3{background-color:#E2D4B2}
.sackp::before{content:"";position:absolute;left:0;right:0;top:-9px;height:18px;
 background:repeating-linear-gradient(118deg,transparent 0 7px,#F1E6CA 7px 10px,transparent 10px 15px),
            linear-gradient(transparent 7px,rgba(80,64,40,.55) 7px 10px,transparent 10px)}
/* 袋印鬼影：藍、multiply、低不透明度、微斜 */
.ghost{position:absolute;color:#2F55A8;opacity:.17;mix-blend-mode:multiply;transform:rotate(-4deg);font:400 40px/1 Bungee,sans-serif}
```

### ② 招牌師立體字：粗塊字＋擠出面（先刷）＋字面（後刷）＋黑邊

片名永遠是「黃字面、紅擠出、黑邊」或「白字面、黑擠出」；擠出朝右下 6–9 層。字略帶手刷抖動。

```html
<!-- SVG 版：原字放 <defs>（不可在原字上寫 fill，否則 <use> 的 fill 會被蓋掉），擠出層由深到淺，最後字面 paint-order:stroke -->
<defs><text id="t1" x="300" y="112" font-family="'Noto Sans TC'" font-weight="900" font-size="96" text-anchor="middle" textLength="548" lengthAdjust="spacingAndGlyphs">白蟻王的復仇</text></defs>
<g filter="url(#f-brush)">
  <use href="#t1" x="8.1" y="9" fill="#D7261E" stroke="#141010" stroke-width="8"/>
  <use href="#t1" x="7.2" y="8" fill="#D7261E"/> … <use href="#t1" x=".9" y="1" fill="#D7261E"/>
  <use href="#t1" fill="#F6C21A" stroke="#141010" stroke-width="5" paint-order="stroke" stroke-linejoin="round"/>
</g>
<filter id="f-brush"><feTurbulence type="fractalNoise" baseFrequency=".035 .06" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter>
```
```css
/* HTML 版：text-shadow 疊擠出＋四向黑邊 */
.sign{font:900 clamp(46px,6.4vw,92px)/1.02 'Noto Sans TC';color:#F6C21A;
 text-shadow:1px 1px 0 #D7261E,2px 2px 0 #D7261E,3px 3px 0 #D7261E,4px 4px 0 #D7261E,5px 5px 0 #D7261E,6px 6px 0 #D7261E,7px 7px 0 #141010,
  -2px -2px 0 #141010,2px -2px 0 #141010,-2px 2px 0 #141010,0 -2px 0 #141010,-2px 0 0 #141010;filter:url(#f-brush-h)}
```

### ③ 招牌漆三階剛邊：每一塊都是「暗底＋中間調＋亮面＋白高光筆觸」，黑粗描邊，邊緣手刷

零漸層、零模糊陰影。明暗靠「同形內縮往左上偏移」的平塗色塊疊出來；光永遠從左上來；肌肉用一顆三階橢圓表示。

```js
// 建置期：橢圓 → 多邊形 → 沿法線以三個正弦疊成的平滑噪聲抖動 ±1.2px（手刷邊）
function B(cx,cy,rx,ry,rot,[dark,mid,light]){
  return path(jitter(ell(cx,cy,rx,ry,rot)), dark, /*描邊*/3)
       + path(jitter(ell(cx-rx*.1,cy-ry*.1,rx*.82,ry*.8,rot)), mid, 0)
       + path(jitter(ell(cx-rx*.34,cy-ry*.36,rx*.36,ry*.26,rot-.3)), light, 0)
       + `<path d="M… Q… …" stroke="#FFF6E0" stroke-width="${rx*.07}" stroke-linecap="round" fill="none"/>`;
}
// 肢體：黑色寬筆（w+5）→ 色筆（w）→ 左上亮線（w*.22）
```
```svg
<!-- 一顆「二頭肌」：三階＋高光 -->
<path d="…" fill="#B8A06C" stroke="#141010" stroke-width="3"/><path d="…" fill="#EADBB0"/><path d="…" fill="#FFF4D6"/>
<path d="M60 270Q64 262 78 258" stroke="#FFF6E0" stroke-width="2.4" stroke-linecap="round" fill="none"/>
```

### ④ 誇張的構圖：主角比房子大、人出框、爆炸在主角背後、硬邊色帶天空

海報內一律是「天空三帶（藍／橘／紅）→ 地平線 → 暗地面 → 黑色資訊帶」；主角正中、尺度最大；爆炸星形墊在主角背後；前景人物比主角小但大到壓出資訊帶。

```svg
<!-- 天空硬邊色帶：矩形各自手刷邊，互相蓋 8px，絕不漸層 -->
<path d="M14 14 L586 14 L586 270 L14 270Z" fill="#1F4FB3"/>   <!-- 抖動後的多邊形 -->
<path d="M14 262 … 360 …Z" fill="#F08A1C"/><path d="M14 352 … 452 …Z" fill="#D7261E"/>
<path d="M14 448 … 772 …Z" fill="#2A2018"/>
<!-- 爆炸：四層星形 紅→橘→黃→乳白 -->
<use href="#sp-boom" x="130" y="170" width="340" height="340"/>
```

### ⑤ 畫在空隙裡的標語、片名英譯、場次與畫師簽名電話

標語用刷字體（Caveat Brush）歪 −6～−8° 擠進空隙；底部黑帶寫票價／電話；右下角畫師簽名＋電話。英文片名用 Bungee（招牌字體）。

```svg
<text font-family="'Caveat Brush',cursive" font-size="30" transform="rotate(-8 26 300)" …>牠吃掉了整個二樓！</text>
<text x="588" y="818" text-anchor="end" font-family="Bungee" font-size="34" fill="#F6C21A">NT$18,000 起</text>
<text font-family="'Caveat Brush',cursive" font-size="13" fill="#F08A1C">畫 阿堯 TEL 0932-118-604</text>
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 麵粉袋原布 | `#D8C7A0` | 頁面地、海報未刷處 | 35% |
| 袋二／袋三 | `#CDBB92` `#E2D4B2` | 相鄰區塊換袋 | 10% |
| 招牌黑 | `#141010` | 描邊、資訊帶、頁尾 | 15% |
| 鈷藍天 | `#1F4FB3`（深 `#0F2C6E`、淺 `#5C86E0`） | 天空上帶、按鈕次色 | 10% |
| 招牌紅 | `#D7261E`（暗 `#8E120E`、亮 `#F2634A`） | 擠出面、天空下帶、價錢 | 10% |
| 鉻黃 | `#F6C21A`（暗 `#B9860A`、亮 `#FFE58A`） | 字面、閃電、現用態 | 8% |
| 夕照橘 | `#F08A1C` | 天空中帶、爆炸、簽名 | 5% |
| 地面夜 | `#2A2018` | 地面、警報底 | 4% |
| 草綠 | `#3DAE3A` | 小面積、片單第三部 | 2% |
| 袋印藍 | `#2F55A8` | 鬼印，只用 opacity .17–.2 multiply | — |
| 乳白高光 | `#FFF6E0` | 高光筆觸、英文片名 | 1% |

規則：每個物件自帶三階（暗／中／亮）；同一塊色絕不漸層；暖色給標題與危險，冷色給天空。

## 字體系統

- **中文標題**：Noto Sans TC 900（Google Fonts），配合 ② 的擠出；SVG 內以 `textLength` 拉滿寬度。字級 clamp(46px, 6.4vw, 92–110px)，行高 1.02。
- **英文片名／標籤**：Bungee 400（招牌設計字體），字距 .02–.12em，全大寫。
- **標語／簽名**：Caveat Brush 400，22–36px，永遠歪。
- **內文**：Noto Sans TC 400／700，16–17.5px，行高 1.75。
- Scale：12（標籤）／14–15（附註）／16–17.5（內文）／18–24（卡片標題）／30–56（區塊標題）／64–110（頁標題）。

## 版面與網格

- **每一個區塊是一只麵粉袋**：`.sackp` 交替三種袋色，上緣是縫線；袋角放一個鬼印。
- **不對稱雙欄**：主海報（或主視覺）占 1.08fr、資訊欄 1fr；海報板歪 −0.8°、資訊卡歪 +0.8°。小物件旋轉 ±0.5–1.8°，不超過 2°（海報上的標語例外，可到 −8°）。
- **海報直式 600×880**（≈ 迦納海報 43×65 in 的比例）。內留 14px 原布邊。
- **硬陰影**：8–10px 實色黑影（或紅影），零模糊。
- 留白：區塊上下 64–72px；海報內不留白——每一個空隙都塞一句標語或一隻小怪。

## 元件配方

- **導覽（釘板木條）**：右上一塊木板（`#6E4220`），上面四根木條各歪一點、兩端各一顆釘子；現用頁那根刷成該頁代表色、字後面畫一個黑色手刷箭頭；hover 以一端釘子為軸擺 −5°（`cubic-bezier(.3,1.8,.5,1)`）。≤900px 落成底部四格。
- **按鈕（漆塊）**：平塗＋3px 黑邊＋`clip-path` 不規則多邊形（刷子收尾的毛邊），hover 歪 −1.5° 放大 1.04、換成橘色，`steps(2)`。
- **卡片（證物卡）**：乳白卡＋上方一張三階小圖＋3px 黑邊＋4px 黑硬影；按下變鉻黃，右上角貼一張紅色「證物」小籤。
- **表單**：白底、2.5px 黑框、零圓角。
- **頁尾**：黑色資訊帶（就是海報底部那條），黃色大電話（Bungee），畫師簽名歪 −3°。

## 動效規則

本站四種動效各有自製實作，另加 motion-library 元件（不擔任 signature）。

| 種類 | 實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 看板上方發電機燈泡串忽明忽暗；三隻飛蛾繞燈 | 自動 | 1.7／2.3／3.1s `steps(1)` 不規則 keyframes；繞行 2.7–4.1s linear，拍翅 .12s steps(2) | 全停，燈泡全亮 |
| input-driven 輸入 | **肌肉凸透鏡**：游標在海報上，一圈 r=74 的凸透把底下的畫鼓起來（feImage 位移圖＋feDisplacementMap scale −62） | pointermove（rAF 節流） | 即時 | 保留（使用者自己在動），強度降為 −38 |
| transition 轉場 | 換頁：舊頁像麵粉袋往上捲起（clip-path inset 由下往上）、新頁從上放下來；木板導覽不動 | 點站內連結（跨文件 View Transitions） | 舊頁 .46s `cubic-bezier(.7,0,.3,1)`；新頁 .62s `cubic-bezier(.2,1.25,.4,1)` 延遲 .12s | 無動畫直接換頁 |
| signature 簽名 | **加料 MORE DRAMA**：同一張海報按五道料逐道加戲——會飛的蟑螂→眼睛放電→房子燒起來＋第二次爆炸→白蟻王長大 13%＋血紅滴字→「看了才相信！」＋老鼠客串；每一道以乾刷鋸齒遮罩（`<mask>` 內 feTurbulence＋feDisplacementMap 的矩形）由左刷到右 | 按鈕 | 每道 .76s `cubic-bezier(.55,0,.25,1)`；長大 .7s `cubic-bezier(.3,1.7,.45,1)` | 直接出現，不刷 |
| （輔助）判決海報 | 認犯人頁開演時，整張判決海報以直向乾刷遮罩 `steps(9)` 由上刷到下 | 按「開演」 | 1.1s | 直接出現 |
| （輔助）無罪章 | 沒被證物指到的嫌犯蓋紅章：scale 1.6→1、`steps(3)` | 翻卡 | .22s | 直接出現 |

自我限制：不用通用淡入、不用滾動揭示、不用跑馬燈；不用 `stroke-dashoffset` 描繪。

### motion-library 元件表

元件庫：`wenxiangxiao/motion-library` v1.6.0 @0a806bc，以 `tools/ml-embed.js` 抽子集 inline 為每頁第一個 `<script>`；掛載走 `KS.ml`（等 `document.fonts.ready`、離屏 destroy、一次性文字 `loop:false` 播一次、canvas `aria-hidden`、容器保留原 HTML 標題 `.ml-fb`、reduced-motion 背景 `seek(.35)` 文字 `seek(1)`）。開發 Prompt 見 `MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合這個流派 |
|---|---|---|---|---|---|
| TXT-A-24 | Extrude | index | text「比電影精彩」、colors primary `#D7261E` secondary `#F6C21A` bg `#D8C7A0`、duration 1.6、loop false、intensity 1.2、seed 1979、16:9 | transition（一次性進場） | 故事區標題由平面字長出往右下的紅色擠出面——正是特徵②招牌師立體字的動態版；麻布色底讓字面自動取近黑 |
| BG-B-19 | Line Burst | index | primary `#F6C21A` secondary `#D7261E` bg `#2A2018`、duration 3.2、density 1.2、intensity 1.1、seed 46、16:9 | ambient | 分飛季警報底下從中心一直噴出的黃紅線段＝海報上「爆炸／放電」的動態，放在暗地面色上 |
| BG-A-32 | Shock Lines | lineup | primary `#F08A1C` secondary `#F6C21A` bg `#D7261E`、duration 4、density .9、seed 1989、4:5、開演後才掛 | ambient | 判決海報背後一圈放射楔形，像迦納海報主角背後永遠在爆的那團光；平塗楔形無模糊，符合特徵③ |
| TXT-B-08 | Number Slam | shows | text「85」、primary `#F6C21A` secondary `#D7261E` bg `#141010`、duration 1.4、loop false、seed 85、16:9 | transition（一次性） | 「雙片連映 85 折」的數字從 4 倍大砸下來、揚起灰塵——票價要像片名一樣大聲；黑資訊帶底 |
| BG-A-16 | Zap Marks | crew | primary `#F6C21A` secondary `#FFF6E0` bg `#1F4FB3`、duration 3.6、seed 2011、16:9 | ambient | 畫師引言背後此起彼落的漫畫閃電＝海報上「眼睛放電」的母題；鈷藍天色底 |

同一畫面同時運轉 ≤2 個；每頁至少 1 個；不使用 TEL／TRN。

## 插畫與圖像風格

**招牌漆三階剛邊（sign-enamel-cel）**：全部圖像在建置期由同一支產生器輸出（`jitter` 手刷邊＋`B` 三階橢圓＋`L` 肢體筆觸＋`P` 多邊形）。物件清單：戴王冠的白蟻王（兵蟻頭殼、鐮刀大顎、念珠觸角、二頭肌手臂）、美洲蟑螂、德國蟑螂、屋頂鼠、衣魚、粉蠹蟲、舉藍白拖的阿嬤、尖叫的男人、穿鈷藍工作服的主角、基隆透天厝（鐵窗、鐵皮加蓋、被咬缺一角）、四層爆炸、閃電、血紅滴字、飛蛾。

- 每個形狀：暗底（含 3px 黑邊）→ 中間調內縮 82%、往左上偏 10% → 亮面 36% → 一筆乳白高光。
- 動物一律「瞪人」：昆蟲沒有可怕的眼睛也要畫一雙紅眼（兵蟻其實是瞎的——海報上它一定要有）。
- 人一律張嘴、出汗、有肌肉；地方特色道具（藍白拖）比武器更好笑也更在地。
- 禁止：細線描、漸層、模糊陰影、照片、可愛化（大眼萌系）。

## Logo 與 Favicon 設計指南

- Logo：橘色鋸齒鬃毛星形（16 角）＋三階鉻黃獅臉＋小王冠＋紅眼；右側「金獅」以 ② 的紅擠出黑邊黃字面寫成，下方 Bungee「KIM-SAI」與一行藍色小字。底色麻布。
- Favicon：只留鬃毛星形＋獅臉＋紅眼＋一道笑線，64×64 inline SVG data URI。

## Do & Don't

**Do**
- 每張海報都要有：麻布邊、縫線、鬼印、三帶天空、主角背後爆炸、出框的人、黑資訊帶、簽名電話。
- 把服務寫成片名（《夜半飛行》《屋頂上的腳步聲》），價錢寫成票價。
- 文案具體：地名、坪數、回診天數、通風時間。

**Don't（含去 AI 化禁令）**
- 不要紫藍漸層、不要置中大標＋三卡片、不要 emoji icon、不要圓角＋模糊陰影卡、不要 Lorem ipsum。
- 不要血腥特寫與真實人物肖像——誇張是怪物的尺度，不是傷口。
- 不要把迦納畫師的名字或作品冒用成自己的；引用請寫明出處。
- 不要用網點或 Lichtenstein 式漫畫輪廓（那是普普藝術）；不要用刻意的爛字（那是 Anti-design）。
- 不要做成「B 級片海報 parody」：迦納海報是很認真地畫，每一塊都有三階。

## 頁面骨架範例

```html
<nav class="slats" aria-label="主選單"><a href="index.html" aria-current="page" style="--slat:#F6C21A"><b>今晚上映</b><span>NOW SHOWING</span></a>…</nav>
<main>
 <section class="hero">
  <div class="board"><svg class="bulbs">…</svg><i class="nail"></i>…<svg class="poster" viewBox="0 0 600 880">…</svg></div>
  <div class="more"><button class="btn red">加料！MORE DRAMA</button><span class="meter"><i></i>×5</span><q>阿堯說：海報一定要比電影精彩。</q></div>
  <div class="side"><h1 class="sign painted">品牌名</h1><div class="en">ENGLISH TAGLINE</div><p class="lead">…</p></div>
 </section>
 <section class="sackp t2"><div class="ghost">海港牌 HAI-KANG<small>中筋麵粉・淨重 22 公斤</small></div>…</section>
</main>
<footer class="foot">黑色資訊帶：地址／電話（Bungee 黃）／畫師簽名</footer>
```

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況（查證） | 不支援時 |
|---|---|---|---|---|
| SVG `feTurbulence`＋`feDisplacementMap`（含 `feImage` 位移圖） | A 渲染 | 特徵①麻布織紋、特徵②手刷抖動、signature 乾刷遮罩、input 凸透鏡 | MDN：兩者皆 Baseline Widely available（2015-07 起）。`feImage` 以 data URL PNG 作位移圖 | 濾鏡失效時：麻布退為平色、字不抖、加料直接出現（遮罩移除）、凸透鏡不出現；資訊不損失 |
| SVG `<use>` 疊層擠出＋`paint-order: stroke` | A／C | 特徵②立體字：原字放 `<defs>`，擠出層由深到淺 `<use>`，字面以 paint-order 讓描邊在字下 | SVG `paint-order` 長期支援；CSS `paint-order` 依 caniuse 於 Chrome 123 起完整、MDN Baseline 2024-03（HTML 文字＋`-webkit-text-stroke` 的組合在 Chromium 早期有缺陷，故 HTML 標題改用 text-shadow 疊層，不依賴它） | 字面描邊壓在字上（變細），可讀 |
| 跨文件 View Transitions `@view-transition{navigation:auto}` | B 動效 | transition：舊頁捲起、新頁放下，木板導覽以 `view-transition-name` 留在原地 | caniuse：Chrome／Edge 126+、Safari 18.2+ 完整；Firefox 144–150 僅部分（Level 1、預設關閉於正式版） | 直接換頁，無動畫 |

查證來源：MDN `feDisplacementMap`／`feTurbulence`（Baseline 2015-07）、caniuse `cross-document-view-transitions`、caniuse `mdn-css_properties_paint-order`、Chrome for Developers〈Cross-document view transitions for multi-page applications〉。

**效能實測（建置環境：node 22，無瀏覽器）**：

- 頁重（含 inline 全部資源與 57.3KB 元件子集）：index 230KB、lineup 240KB、shows 243KB、crew 175KB（皆 ≤350KB）。
- 首屏 JS：凸透鏡位移圖為 128×128 一次性計算（16,384 像素，node 實測 4.6ms，且只在 pointer:fine 裝置執行）；判決海報組字＋插入 DOM 在 jsdom 實測 18.8ms（點「開演」才執行，不在首屏）；首屏其餘 JS 只綁事件。
- 主要動畫：燈泡、飛蛾、木條擺動皆為 CSS transform／opacity；凸透鏡以 rAF 節流、濾鏡區域限定在鏡片外框 188×188（filterUnits=userSpaceOnUse）。**未能在建置環境以真實瀏覽器量測 fps**；已知風險是 `<use>` 複製整張海報給凸透鏡，若低階裝置掉幀，可把 `dm.scale` 設 0 或只在 `(pointer:fine)` 且寬螢幕啟用（目前已限定 pointer:fine）。
- 同一畫面同時運轉的 motion-library 元件 ≤2 個（index 的 Extrude 與 Line Burst 不在同一屏）。
