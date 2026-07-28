---
name: chord-steno-score
description: A plum-and-bone duotone identity built from a chord keyboard's key-bed and musical-score notation — brass key-caps, ribbon-red note cursors, ledger-line staves, and glyphs assembled from lit key-cells rather than pictures.
---

# 和弦速錄譜風 Chord-Steno Score

> 這份 SKILL 定義的是「視覺與互動語言」，不綁定產業。它長在速錄所身上，但同樣能穿在打字補習班、音樂教室、電報學校、輸入法工具、任何「以鍵盤／按鍵／記譜」為核心隱喻的品牌上。風格與內容分離：以下規格照抄即可換一個題材重現。

## 設計哲學

三個念頭撐起整個風格：**鍵是實體、字是譜、顏色是稀缺的訊號。**

一、把介面當成一台真的機器。鍵盤不是裝飾，是主體；鍵有厚度、有下沿陰影、按下去會沉。導覽也是鍵——底部一排大拇指鍵，你「在哪一頁」＝哪一枚鍵被壓下。

二、把資訊當成樂譜來排。字落在譜線上、有符頭、有進度游標；讀一句話像讀一小節。這讓密集的教學資訊有了節奏感，而不是一張表。

三、顏色克制到近乎吝嗇。整體只有**深李紫**與**骨白**兩塊大色域（duotone），金屬件用**黃銅**，而**朱紅**只發給「當下、正在發生、要注意」的那一個東西——現用鍵、聲調鍵、游標、警示。畫面因此永遠知道你該看哪裡。

一句話自我檢查：拿掉這層皮，還剩下什麼別人沒有的？——一台你真的能用鍵盤和弦「彈」出字來的機器，以及一套「亮起來的鍵＝一個和弦」的記譜法。若你的新站沒有這台可玩的機器，就只是換了配色的表格。

## 色彩系統

| 角色 | Hex | 用途 | 概略比例 |
|---|---|---|---|
| 李紫底 plum | `#3B1F42` | 頁首／頁尾／機器面／深色大色域 | 34% |
| 李紫深 plum3 | `#2C1633` | 面板凹陷、播放區、dock 底 | 8% |
| 李紫亮 plum2 | `#4E2A54` | logo 底、次深塊 | 4% |
| 骨白 bone | `#EDE4CF` | 頁面大底（亮色域） | 26% |
| 骨白暖 bone2 / card | `#F6F0E0` | 卡片、閱讀面、隔段 | 12% |
| 黃銅 brass | `#C99A3E`（亮 `#E4C069`／暗 `#A87F2C`） | 鍵帽高亮、聲母、分隔線、金屬件 | 8% |
| 朱紅 ribbon-red | `#D4402F`（暗 `#A82C1E`） | 現用態／聲調／符頭／游標／警示（唯一高彩） | ≤6% |
| 墨 ink | `#1E1420` | 內文、2–3px 描邊 | — |
| 作用色（低調） | 介音 `#8FB0D6`／韻母 `#E39A6C`／成功綠 `#5E8A6E` | 只在鍵分類與正確回饋 | <3% |

規則：**朱紅不做大面積**，只當「此刻」的訊號；李紫與骨白是唯二可以鋪滿的顏色；黃銅永遠是線與鍵，不鋪面。避免把李紫壓成近黑，否則退化成一般深色儀器台——它要讀得出是「紫」。

## 字體系統

全部取自 Google Fonts：

- **Noto Serif TC 900**：中文標題、logo 字、譜上的字。厚重、有骨。
- **Bitter 600/800**（襯線 slab，帶打字機／公文氣）：英文標題、按鈕、dock 標籤。
- **Noto Sans TC 400/500/700**：中文內文。
- **Space Mono 400/700**：所有數字、代號、留位號、標籤、eyebrow、鍵位小字——凡是「機器讀值」都用等寬。

字級 scale（桌機）：hero 標題 `clamp(30px,5vw,50px)`、區塊標題 `clamp(24px,3.6vw,36px)`、內文 15–16px、標籤/eyebrow 11px（letter-spacing .24em、大寫）。行高：標題 1.2、內文 1.7–1.75。

eyebrow 一律 Space Mono、大寫、寬字距、配一個角色色（李紫塊上用 brass-hi、骨白塊上用 clay）。

## 版面與網格

- 內容最大寬 780–1080px 依頁面而定（表單窄、藝廊寬）。
- **不對稱 hero**：`1.1fr / .9fr` 兩欄——左邊標題與訴求，右邊一張「正在運轉」的卡（譜卡／機器）。行動版收單欄。
- 區塊以整片色域交替：李紫 → 骨白 → 骨白暖 → 李紫，靠背景色切段，少用陰影分隔。
- 圓角克制：卡片 10–14px、鍵 8px、鍵帽下沿用 `box-shadow:0 3px 0 <暗色>` 做出厚度而非模糊陰影。
- **無旋轉裝飾**、無隨機歪斜；整齊如鍵盤本身即是風格。留白中等偏密（資訊型）。

## 元件配方

**鍵（.key）**：56×56、圓角 8、`box-shadow:0 3px 0 #b3a488` 當厚度；左上角一個 Space Mono 小字標實體鍵。分類底色：聲母 `#f0e2c4`、介音 `#dfe6ef`、韻母 `#f0dccb`、聲調 `#f4d4ce`。按下 `.on`：`translateY(3px)` ＋ `box-shadow:inset 0 0 0 2px ribbon-red`，底色轉 brass-hi。行動版用 vw 縮放、隱藏鍵位小字。

**拇指鍵 dock 導覽（.dock）**：`position:fixed;bottom:0`，一排 4 枚大鍵帽（骨白面、`box-shadow:0 4px 0 brass-lo`、上圓下方 `border-radius:9px 9px 6px 6px`）。現用頁 `aria-current="page"`：底色 brass、`translateY(3px)`、陰影收平（像被壓進去）。每鍵下方一行 Space Mono 英文小標。`body{padding-bottom:74px}` 讓內容不被遮住。

**按鈕（.btn）**：無圓弧陰影；`.p` 朱紅底白字、`.g` 黃銅底李紫字、`.o` 透明配 1.5px 邊；`:active{translateY(1px)}`。

**卡片（.tile/.entry）**：骨白面、1.5px 墨實線邊、圓角 10–12；標題 Noto Serif TC；角落一個 Space Mono 分類籤（李紫底骨白字小方塊）。

**表單**：欄位 1.5px 邊、focus 轉 brass；錯誤 `.bad` 轉朱紅並在下方 Space Mono 顯示訊息（min-height 保留位避免跳動）。多步驟頂部一條三格進度指示，已完成轉綠、當前轉朱紅。

**譜線／譜卡（.staff/.scorecard）**：李紫深底、上下各一條半透明骨白線當譜線；字（.gl）落在線上，已完成轉 brass 並描下線、當前字 `.cur` 轉骨白＋朱紅底線＋淡朱紅底。學習模式時字下用 Space Mono 顯示其注音。

**footer**：李紫底、3px 黃銅頂線、三欄（品牌／地址／導覽）＋一段 Space Mono 細則。

## 動效規則

克制是原則。避開近期全館過載的四種語彙：**不用**揭示式淡入當招牌、**不用**數字計數、**不用**按壓硬位移陰影當簽名、**不用** stroke-dashoffset 描繪。也不放跑馬燈、不自動輪播、不自動播放。

允許且該有的動：
- 鍵按下 `transform/box-shadow` 轉場 50ms（機械回饋）。
- dock 現用鍵下沉（狀態，非循環動畫）。
- 按鈕 `:active` 位移 1px、hover 換底色 80–150ms。
- 表單錯誤可用 `shake .3s`（選用）。

`prefers-reduced-motion: reduce` 時 `*{transition:none}`；核心互動（和弦擊鍵、篩選、表單）本就由使用者事件驅動，不依賴任何自動動畫，天生友善。

## 插畫與圖像風格

**唯一技法：和弦速錄譜（chord-score）。全站零外部圖片。** 每一張圖都由「在一片 4×N 的鍵格上點亮某幾顆鍵」生成——亮起的鍵＝一個和弦；未亮的鍵是骨白細描邊空格。分類決定亮鍵顏色（黃銅聲母／藍介音／橘韻母／朱紅聲調）。再配上譜線與朱紅符頭，就是本風格的圖像原語。

- **logo／favicon**：迷你鍵格＋三顆被壓下的黃銅鍵組成一個「音」＋一顆落在下譜線的朱紅符頭。
- **詞鑑縮圖**：每個字算出它要按的鍵，畫成一張小和弦譜。
- **印記／徽記**：由資料 `FNV-1a → mulberry32` 決定性點亮鍵格成「和弦星座」，同資料恆得同圖，外框李紫方印＋黃銅邊。

分工不可對調：底恆李紫、鍵面恆骨白、亮鍵按四分類上色、符頭與游標恆朱紅、描邊恆墨。畫成單色即失去意義——顏色在這裡編碼了「這顆鍵是哪一類」。

## Logo 與 Favicon 設計指南

favicon 用 inline SVG data URI 寫在 `<head>`，與 logo 同構、可縮到 16px 仍認得出：一個圓角李紫方，內含兩條譜線、一排骨白空鍵格、三顆黃銅實鍵、一顆朱紅符頭。header 內另放一枚放大版（李紫亮底以區隔頁首）。**不畫具體器物、不描外形**——標誌本身就是一次和弦。

## Do & Don't

**Do**
- 讓核心是一台真的能操作的機器；先有可玩的互動，再談皮膚。
- 顏色吝嗇：朱紅只給「此刻」，李紫骨白鋪面，黃銅只走線。
- 數字與代號一律 Space Mono；標題用 Noto Serif TC 的重量。
- 圖像一律由鍵格和弦生成，不放任何外部圖檔。
- 導覽用底部拇指鍵，現用頁「被壓下」。

**Don't（含去 AI 化禁令）**
- 不用紫藍漸層 hero、不用「置中大標＋兩顆按鈕＋三張圓角卡」模板。
- 不用 emoji 當 icon（icon 一律自繪 SVG）。
- 不用模糊大陰影的 rounded-2xl 卡片；厚度用 `0 Npx 0` 實色下沿。
- 不寫 AI 腔（「在當今快節奏的時代」）、不放 Lorem ipsum、不放「EST. 19xx」徽章。
- 朱紅不鋪大面積；李紫不壓成近黑；黃銅不鋪面。
- 不放跑馬燈、不自動播放。

## 頁面骨架範例

```html
<!-- 拇指鍵 dock 導覽 -->
<nav class="dock" aria-label="主導覽">
  <a href="index.html" aria-current="page">速錄機<small>Machine</small></a>
  <a href="ci.html">詞鑑<small>Lexicon</small></a>
  <a href="fa.html">速錄法<small>Method</small></a>
  <a href="ru.html">報名<small>Enrol</small></a>
</nav>

<!-- 譜卡（hero 右側「正在運轉」的物件） -->
<div class="scorecard">
  <div class="lbl">現正報讀</div>
  <div class="staff">
    <span class="gl done">你<small>ㄋㄧˇ</small></span>
    <span class="gl cur">好<small>ㄏㄠˇ</small></span>
    <span class="gl">台<small>ㄊㄞˊ</small></span>
  </div>
</div>
```

```js
/* 和弦譜圖像原語：把一個注音音節畫成「亮起的鍵」 */
var COL={sm:'#E4C069',jy:'#8FB0D6',ym:'#E39A6C',tn:'#E86A58'};
function chordGlyph(zhuyin){ /* 對每個符號查其實體鍵位 → 在 4×N 鍵格填色，未按者細描邊 */ }
```

```css
.key{width:56px;height:56px;border-radius:8px;background:#efe7d4;
     box-shadow:0 3px 0 #b3a488;} /* 厚度用實色下沿，不用模糊陰影 */
.key.on{transform:translateY(3px);box-shadow:inset 0 0 0 2px #D4402F;background:#E4C069;}
.dock a[aria-current="page"]{background:#C99A3E;transform:translateY(3px);box-shadow:0 1px 0 #A87F2C;}
```

驗收：一個從未看過本 Demo 的 AI，只讀這份 SKILL，應能做出——李紫骨白 duotone、黃銅鍵、朱紅只給此刻、底部拇指鍵導覽、圖像全由鍵格和弦生成、且中心是一台真的能操作的機器——的全新網站。
