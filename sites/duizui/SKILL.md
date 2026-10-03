---
name: kinetic-typography-rythmo
description: Kinetic typography as a web style — type is the only image and the only actor, size and weight are loudness, width is duration, words enter one per beat and lock into a snap-and-rotate jigsaw where each new word fills the block's width and the camera turns 90 degrees, solid colour fields hard-cut on the beat and never fade, set in a heavy variable sans against one hand-written voice, with the dubbing industry's bande rythmo as its native component.
---

# 動態字體 Kinetic Typography — 字塊拼版與對嘴帶

## 設計哲學

動態字體是「字在時間裡演出」。1955 年 Saul Bass 為《The Man with the Golden Arm》做片頭，1959 年《North by Northwest》讓片頭字沿著大樓立面的格線飛入飛出——字第一次不是印在畫面上，而是在畫面裡**移動**。1964 年 Pablo Ferro 替《Dr. Strangelove》手寫細長的片頭字並發明快切；1995 年 Kyle Cooper 的《Se7en》讓字抖、刮、跳格。2000 年代末，網路上的 kinetic type 影片（把一段台詞一詞一拍地拼成一塊、鏡頭每拍轉 90°）讓這套語言定型成今天可辨識的樣子。

本風格的核心信念只有一句：**字就是聲音的形狀。** 大＝響，細＝輕，寬＝久，出現＝開口。它的姊妹是配音業的「對嘴帶」bande rythmo——1930 年代法國錄音技師 Charles Delacommune 發明，至今法國與魁北克的配音棚仍在用：台詞手寫在一條與畫面同速度移動的帶子上，字經過讀帶桿那一刻開口，字寫多長，音就拖多久。片頭字卡和對嘴帶是同一個想法的兩種用途：**把時間換算成排版。**

所以這個風格不是「加了動畫的網頁」（那是 Motion-Heavy 行銷站：粒子、磁性按鈕、滾動揭示）。拿掉動畫，它要能停在任何一格仍然好看（定格就是一張字卡海報）；拿掉字，它什麼都不剩。

## 本風格的 5 個不可省略特徵

### 1. 形狀語彙：字是唯一的圖，而且是「塊」——字塊拼版 snap-and-rotate jigsaw

每個新詞被縮放到**正好等於目前拼塊的寬**，貼在它下方；然後鏡頭轉 90°，下一個詞再貼上去。結果是一塊沒有縫、每個詞大小都不同、方向輪流轉的矩形字塊。拿掉它，就只是「大標題」。

```js
// 核心演算法（world 座標；鏡頭角 a 為 90 的倍數）
// 1) a += turn*90；2) composite 在「畫面」裡的寬 vw = a%180==0 ? bb.w : bb.h
// 3) 新詞寬 = vw，高 = vw * 字的自然高寬比；4) 放在畫面下方：
//    世界方向 d = (sin a, cos a)，中心 = bb 中心 + d*(ext/2 + h/2)
// 5) 字元素 rotate(-a)，world 容器 rotate(a) 再縮放到舞台
el.style.fontSize = (100 * w / naturalWidthAt100px) + 'px';
el.style.transform = `translate(-50%,-50%) rotate(${-a}deg)`;
world.style.transform = `translate(${W/2}px,${H/2}px) scale(${s}) rotate(${a}deg) translate(${-cx}px,${-cy}px)`;
```
```css
.jw{position:absolute;white-space:nowrap;line-height:.86;font-weight:900}  /* absolute＝block 化，高度＝line-height，拼得緊 */
.jig .world{transform-origin:0 0;transition:transform .38s cubic-bezier(.7,0,.2,1)}
```

### 2. 色彩規則：全出血的平色場，只准「硬切」——cut, never fade

背景是一整塊平色，在拍點上**瞬間**換成另一塊，像剪接點。零漸層、零淡入淡出、零半透明疊色。字色跟著色場對調。四個色場：錄影黑、骨白、錄音紅燈、提示琥珀；同一時間畫面上只有一個色場。

```css
.field[data-f="ink"] {--bg:#111111;--fg:#ECE6D8;--ac:#F5B800}
.field[data-f="bone"]{--bg:#ECE6D8;--fg:#111111;--ac:#E5261F}
.field[data-f="red"] {--bg:#E5261F;--fg:#ECE6D8;--ac:#111111}
.field[data-f="amber"]{--bg:#F5B800;--fg:#111111;--ac:#E5261F}
.field{background:var(--bg);color:var(--fg)}   /* 不寫 transition：換色就是換色 */
```

### 3. 字體選擇：一支有寬度與字重軸的粗無襯線＋一支手寫聲音

主角是**可變字型**，因為這個風格要求同一個字在連續的重量與寬度間移動：中文 Noto Sans TC（`wght 100–900`），拉丁與數字 Anybody（`wdth 50–150`、`wght 100–900`，全大寫）。對比的第二個聲音是**手寫**（LXGW WenKai TC）——Ferro 的手寫片頭、對嘴帶上寫帶員的沾水筆字。只准這兩種聲音，不准第三種。

```css
:root{--f-cjk:"Noto Sans TC",sans-serif;--f-lat:"Anybody",sans-serif;--f-hand:"LXGW WenKai TC",serif}
.loud{font-weight:900}.quiet{font-weight:200}
.long{font-family:var(--f-lat);font-stretch:150%}.short{font-family:var(--f-lat);font-stretch:56%}
.row h3{transition:font-weight .14s cubic-bezier(.7,0,.2,1)} .row:hover h3{font-weight:900}
```

### 4. 版面手法：時間＝位置，時長＝寬度（對嘴帶）

時間軸被畫成空間：一條固定速度（px/ms）往左跑的帶子，一條固定的紅色讀帶桿。每個音節的寬＝它的毫秒數 × 速度，字被**水平拉伸**到那個寬。拉長的字不是裝飾，是資料。

```css
.rband{position:relative;height:118px;background:#F6F2E8;overflow:hidden}
.rband .rail{position:absolute;inset:0 auto 0 0;will-change:transform}         /* JS: translateX(-now*PX) */
.rband .syl{position:absolute;top:18px}                                         /* left = BARX + startMs*PX; width = durMs*PX */
.rband .syl b{display:block;font-family:var(--f-hand);font-size:42px;transform-origin:0 50%} /* scaleX(width / glyphWidth) */
.rband .rbar{position:absolute;top:0;bottom:0;width:4px;background:#E5261F}     /* left = 24% */
```

### 5. 裝飾母題：拍子、時間碼與寫帶記號

唯一允許的裝飾來自時間本身：24 格時間碼（`HH:MM:SS:FF`）、刻度線、倒數三格（嗶三聲、第四拍不響）、寫帶記號——「／」換氣、「│」閉唇音、「—」拖音、「◦」笑。它們永遠是紅的或是灰的細字，永遠不比台詞大。

```html
<div class="tc"><small>TC・24 FPS</small><b>14:03:22:17</b></div>
<span class="mk" style="left:812px">│</span>  <!-- 閉唇音：ㄅㄆㄇ開頭的字前 40ms -->
```
```css
.ticks{height:12px;background:repeating-linear-gradient(90deg,#9b958a 0 1px,transparent 1px 30px)}
.mk{position:absolute;top:20px;font-family:var(--f-hand);font-size:28px;color:#E5261F}
```

## 色彩系統

| 名稱 | Hex | 用途 | 比例 |
|---|---|---|---|
| 錄影黑 Ink | `#111111` | 主色場、字 | 45% |
| 骨白 Bone | `#ECE6D8` | 色場、反白字、對嘴帶底（帶子用更淺的 `#F6F2E8`） | 30% |
| 錄音紅燈 Tally Red | `#E5261F` | 讀帶桿、硬切色場、hover 反色、寫帶記號 | 12% |
| 提示琥珀 Cue Amber | `#F5B800` | 「輪到你」：使用者的台詞、黑場上的強調字 | 9% |
| 對手紫 Lilac | `#B9A3FF` | 對手角色的台詞與嘴（只在對嘴台） | ≤3% |
| 註記灰 Mute | `#5F5A51` | 骨白上的小字（對比 5.6:1） | 1% |

規則：色場只換不混；強調色 `--ac` 由色場決定（黑場配琥珀、白場配紅、紅場配黑、琥珀場配紅）；紅色永遠不當正文色。

## 字體系統

- 來源：Google Fonts `Anybody:wdth,wght@50..150,100..900`、`Noto+Sans+TC:wght@100..900`、`LXGW+WenKai+TC:wght@400;700`。
- 字級：拼版內的字由演算法決定，不設字級；內頁標題 `clamp(56px,9vw,128px)`／行高 .8；段落標題 `clamp(30px,4.6vw,66px)`；內文 15–17px／1.6；標籤 11–12px Anybody `font-stretch:130–150%`、字距 .12–.16em、全大寫。
- 字重只用兩端：900 與 200–300 並置，中間值只出現在補間的途中。
- 拉丁數字用 `font-stretch:56–62%` 的高窄數字當價錢與時間碼，hover 時拉到 150%。

## 版面與網格

- 首屏不是 hero 文案，是一個**舞台**：佔滿可視高度的色場，字塊拼版置中縮放到舞台 84%；旁邊一欄「場記」（slate）用定義清單列出全部資訊。
- 內頁用 2px 實線分格，欄寬不對稱（5:7、1.2:1:auto）；不用卡片圓角、不用陰影。
- 角度只有 0° 與 ±90°。沒有 15°、沒有斜切——鏡頭只會直角轉。
- 留白規則：拼版內零留白（字與字貼死），拼版外大留白（舞台邊 8%）。
- 對嘴台照法國配音棚慣例：左上台詞清單、右上畫面、下方全寬帶子。

## 元件配方

- **導覽（讀帶桿導覽）**：固定在底部的一條骨白帶子，背景層是緩慢往左走的刻度與今日排程（手寫灰字），前景是四個固定位置的手寫頁名；紅色讀帶桿停在目前頁，指到別頁時 160ms 滑過去；右端黑底時間碼。
- **按鈕**：骨白實底、左側 6px 紅邊、900 字重；hover 整顆換成紅底（硬切）。次要鈕為 2px 外框。
- **價目列**：整列是連結；左大字（300 → hover 900）、中說明、右高窄價錢（56% → hover 150%），hover 時整列色場硬切成紅。
- **表單**：選項是 2px 外框方塊，選中即反色；文字欄只有底線；錯誤訊息用紅色 700 字重一行說完。
- **頁尾**：黑場、2px 分隔線、細則一行。

## 動效規則

| 類型 | 本站 | 觸發 | 時長／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 導覽帶背景的刻度與排程持續往左走；右端 24 格時間碼即時跳動；示範帶的「口」字按嘴型張合 | 無需輸入 | 48s linear 無限；rAF；steps(1) | 帶子靜止、時間碼每秒更新、口字固定半開 |
| input-driven 輸入 | 讀帶桿跟著游標滑到別頁；價目列與名片 hover 時字重＋字寬同時漲；對嘴台按住時讀帶桿變粗、「YOU」的口張開、壓在桿上的字變紅 | hover／focus／按住 | 60–160ms，cubic-bezier(.7,0,.2,1) | 保留顏色與粗細變化，去掉補間 |
| transition 轉場 | 跨頁：點下的導覽詞放大成下一頁標題，新頁以 clip-path 從右往左推入（讀帶方向）；對嘴台換場、出結果用同文件 View Transition | 導覽、狀態切換 | .42s cubic-bezier(.7,0,.2,1) | 直接換頁、無動畫 |
| signature 簽名 | **轉鏡拼字**：一拍一詞硬切進場、填滿拼塊寬、鏡頭轉 90°，色場在指定拍上硬切；名片快切與對嘴結果字卡共用同一引擎 | 載入、再放、結果 | 拍長 300–430ms；鏡頭 .38s | 直接顯示定格的完整拼版 |

自我限制：**字永遠不淡入**（opacity 補間禁用）；**色場永遠不漸變**；**不用模糊**（motion blur 是另一個流派）。

## 插畫與圖像風格

沒有插畫。所有「圖」都是字：人物＝會張合的「口」字（`transform:scaleY()` 依音節包絡）、地圖＝街名本身（直街轉 ±90°）、Logo＝一個口字框＋一段拉長的帶子＋讀帶桿。需要圖的地方，先問「這個能不能用一個字演？」

## Logo 與 Favicon 設計指南

- Logo：黑底，左上琥珀色粗框方形（口），下方一條骨白帶子上有四段長短不一的黑色音節條，紅色讀帶桿穿過帶子；右側 DUIZUI 高窄字。
- Favicon：32×32 同構，只留口框、帶子、兩段音節與讀帶桿，inline SVG data URI。
- 不准：麥克風、聲波、耳機、嘴唇圖示——那是另一種站。

## Do & Don't

- Do：每個字都要有理由大或小；定格的每一格都能當海報；拍點對齊；色場硬切；拉長的字要有對應的時間。
- Do：動畫做完要保證 reduced-motion 下所有資訊仍以完整拼版或靜態文字出現。
- Don't：淡入、滑入、彈跳、打字機逐字（那是終端機風）；漸層與陰影；第三種字體；斜角；emoji；麥克風 icon。
- Don't（去AI化）：紫藍漸層、置中三卡片、Lorem ipsum、「EST. 19xx」、「在當今快節奏的世界」。
- Don't：把每段文字都做成動畫——內文是安靜的，演出的只有標題與拼版。

## 頁面骨架範例

```html
<section class="hero field" data-f="ink">
  <div class="jig field" data-f="ink" id="stage" aria-hidden="true"></div>
  <aside class="slate"><h1>對嘴配音室<span>DUÌZUǏ DUBBING ROOM</span></h1>
    <dl><dt>LOC</dt><dd>臺北市中山區長安東路一段 23 號 B1</dd><dt>TEL</dt><dd>(02) 2571-3608</dd></dl></aside>
</section>
<script>
var SEQ=[{t:'對嘴',hold:2},{t:'配音室',turn:-1,c:'ac'},{t:'DUBBING',turn:-1,c:'lat',st:52},
         {t:'先寫帶',turn:1,f:'red'},{t:'再開口',turn:-1,wt:300}];
var jig=new Jig(document.getElementById('stage'));
fontsFor(SEQ).then(function(){ jig.play(SEQ,430,function(f){stage.dataset.f=f}); });
</script>
<div class="band"><nav><span class="bar"></span>
  <a href="index.html" aria-current="page">首頁<small>HOME</small></a><a href="booth.html">對嘴台<small>BOOTH</small></a></nav></div>
```

## 技術實作與相容性

### 1. 可變字型軸動態（C 版面與樣式層）

- 承載：特徵 3（字重＝音量／準度、字寬＝時長）與 input-driven 動效。用 `font-weight`、`font-stretch` 兩個標準屬性驅動 `wght`／`wdth` 軸（可補間），而非直接寫 `font-variation-settings`，以免互相覆蓋。
- 支援：可變字型與 `font-stretch` 百分比自 2018 年起各大瀏覽器皆支援（MDN `font-variation-settings`／`font-stretch` 標示 Baseline Widely available）；Google Fonts CSS2 API 以 `wdth,wght@50..150,100..900` 語法提供軸範圍（查證：fonts.google.com/knowledge〈Styling type on the web with variable fonts〉、〈Width axis〉）。
- Fallback：字型未載入時退到系統無襯線，拼版仍以實測寬度計算，只是缺少寬度變化；`fontsFor()` 最多等 2.5 秒。

### 2. Intl.Segmenter（E 資料與生成層）

- 承載：特徵 1 的「演員單位」。`new Intl.Segmenter('zh-Hant',{granularity:'word'})` 把中文台詞切成詞（實測「末班渡輪十一點四十開」→ 末班｜渡輪｜十一點｜四十｜開），名片快切一拍一詞、對嘴計分以詞為單位、結果字卡一詞一塊。
- 支援：Chrome 87、Safari 14.1、Firefox 125 起（查證：caniuse `mdn-javascript_builtins_intl_segmenter`、MDN Firefox 125 release notes）。
- Fallback：不支援時以正規式在標點處切開、其餘每 2 字一塊——計分仍可用，只是詞界較粗。

### 3. 跨文件 View Transitions（B 動效與時間軸層）

- 承載：transition 動效。`@view-transition{navigation:auto}`；導覽詞 `view-transition-name:n-booth` 與下一頁 `h1` 同名，點下時詞放大成標題；`::view-transition-new(root)` 以 `clip-path:inset(0 0 0 100%)→inset(0)` 從右推入（帶子方向）。同頁狀態切換用 `document.startViewTransition()`。
- 支援：Chrome／Edge 126+、Safari 18.2+；Firefox 未支援（查證：developer.chrome.com〈Cross-document view transitions for multi-page applications〉）。
- Fallback：不支援時就是普通換頁、狀態直接替換，資訊零損失；reduced-motion 時所有 `::view-transition-*` 動畫設為 none。

### 輔助（非核心）

- 嗶三聲：Web Audio `OscillatorNode` 1 kHz、80ms，只在使用者按下「開始」後建立 AudioContext；靜音或不支援時倒數燈仍會亮。
- 帶子移動：`requestAnimationFrame` 以 `performance.now()` 計時、只改 `transform: translateX()`（合成層），不觸發 layout。
- 跨頁狀態：`sessionStorage` 記錄最佳一鏡，在「來錄音」頁顯示（讀寫皆 try/catch）。

### 效能預算（建站當下實測與估算）

- 頁面大小（含 inline CSS/JS，不含 Google Fonts）：index 約 31 KB、booth 約 45 KB、voices 約 28 KB、visit 約 32 KB，皆遠低於 350 KB。
- 首屏 JS：拼版引擎每加一詞做一次離屏量測＋一次 transform 寫入；16 詞片頭分 16 拍執行，單拍工作量為一次 layout 讀取。jsdom 下四頁腳本皆零錯誤執行、對嘴台完整跑完一場並出分。
- 動畫：帶子與鏡頭轉動只動 `transform`；色場切換只改 CSS 變數。建站環境沒有可用的實體瀏覽器，**60fps 未能實機量測**——驗收時請以 DevTools Performance 面板確認對嘴台帶子捲動無 layout／paint 尖峰。
