---
name: neubrutalism-slab
description: Neubrutalism (Neo-brutalism) web style — every element is a flat single-colour slab with a thick pure-black frame and a zero-blur hard offset shadow that always falls down-right and whose length equals the slab's height, set in heavy grotesk type on saturated "highlighter" fields, with raw oversized UI parts and rotated stickers as the only ornament.
---

# 新粗獷 Neubrutalism —— 風格規格書

> 範例站：崁仔腳夜市攤商自治會（新北市板橋區，24 攤 3 條巷）。本規格書與產業無關：創作者商店、獨立 app、活動報名、社區組織、餐飲、教育、任何要「直、吵、價錢寫清楚」的品牌都可以照做。

## 設計哲學

**年代與地域。** Neubrutalism 是 2021–2023 年在網頁與 UI 圈成形的流派。名字借自建築的野獸派（Brutalism，béton brut「清水混凝土」：結構露出來、不粉飾），中間隔著一代「網頁野獸派」——2014 年起 Pascal Deville 收集的 Brutalist Websites：系統預設字、沒套樣式的 HTML、故意破的版面，粗魯本身就是目的。

**關鍵作品。** 2021 年 Gumroad（創辦人 Sahil Lavingia）改版：粉紅與黃色整片色場、粗黑框、偏移硬陰影的按鈕、巨大的標題，Lavingia 自稱「故意設計不足 deliberately under-designed」，迅速被整個創作者經濟圈複製。2022-03-29 Michal Malewicz（Hype4）在 UX Collective 發表〈Neubrutalism is taking over the web〉，把它定位成對 Material Design 以來「圓角＋柔和彩色陰影＋細緻漸層」七年週期的反擺。

**它為什麼長這樣。** 這是一個「螢幕原生、沒有印刷限制」的流派——它的限制是**自我施加的**：拒絕模糊（blur）、拒絕漸層、拒絕半透明，因為這三樣正是上一代 UI 的「精緻感」來源。拿掉之後剩下的只有：線、平色、位移。於是**硬陰影從裝飾變成資訊**——它告訴你這塊東西浮起來多高、能不能按。與 2014 網頁野獸派的分界：那個敵視使用者；新粗獷保留態度，但每個按鈕都清楚可按、對比都過關。

**三條紀律：**
1. **一塊一色一框。** 畫面由「slab 板子」組成，每塊只有一個平色、一圈黑框。
2. **影子是高度。** 所有影子同一方向、零模糊；影子長度＝板子離地高度。按下去影子歸零。
3. **字要大、要粗、要說實話。** 最重要的資訊（範例站是價錢）用最大最粗的字。

## 本風格的 5 個不可省略特徵

拿掉任何一項，就不是新粗獷了。

### 1. 粗黑實線框：3px 純黑，包住每一個東西

板子、按鈕、輸入框、圖片、地圖、標籤——全部 3px（2–4px 皆可，但**全站只准一種粗細**）`#111`。不准灰框、不准彩色框、不准 1px 細線。圓角：全站一個值，本站為 0。

```css
:root{ --ink:#111111; --b:3px; }
.slab{ border:var(--b) solid var(--ink); border-radius:0; }
input,select,textarea{ border:var(--b) solid var(--ink); border-radius:0; background:var(--paper); }
```

### 2. 零模糊硬偏移陰影，往右下，長度＝高度

`box-shadow` 的 blur 永遠是 0、顏色永遠是黑、方向永遠右下 45°。用一個型別化自訂屬性 `--z` 同時推「板子往左上抬」與「影子往右下伸」，影子腳印就固定在地上——抬起、懸停、按下、摔落是同一個變數的四個值。

```css
@property --z{ syntax:'<length>'; inherits:false; initial-value:6px; }
.slab{
  transform:translate(calc(var(--z) * -1), calc(var(--z) * -1));
  box-shadow:var(--z) var(--z) 0 0 var(--ink);
  transition:--z 90ms steps(3,end);          /* 一格一格抬，不滑 */
}
.lift:hover,.lift:focus-visible{ --z:10px; }  /* 懸停：抬高 */
.lift:active{ --z:0px; }                       /* 按下：貼地 */
/* 高度階：0 貼地 / 3–4 標籤 / 6 靜止 / 10 懸停 / 22–30 拖曳中 / 48 落下起點 */
```

### 3. 高飽和平色，一塊一色，零漸層零透明

五個「螢光筆色」＋一個紙色＋黑。每塊板子只准一個底色；淺色不准用 opacity 做；字只用黑（只有黑底板上才用紙色字）。大面積底色本身也是一個飽和色（本站：帆布藍）。唯一允許的「漸層」是硬邊條紋（`repeating-linear-gradient` 兩個色標重合），那是圖樣不是漸層。

```css
:root{ --tarp:#3A5CFF; --sign:#FFD400; --hot:#FF5C8A; --mint:#2EE59D; --orange:#FF7A1A; --paper:#FFF8E7; }
.y{background:var(--sign)} .p{background:var(--hot)} .m{background:var(--mint)}
.o{background:var(--orange)} .w{background:var(--paper)} .k{background:var(--ink);color:var(--paper)}
/* 禁止：linear-gradient(柔和)、opacity<1 的色塊、rgba 底色、彩色陰影 */
```

### 4. 粗壯怪誕字，最重要的資訊用最大的字

展示字用最粗的一級（Archivo Black／Noto Sans TC 900），字距收緊、行高 0.85–0.95、靠左；小標籤用等寬大寫。**資訊的層級就是字級的層級**——範例站規定「價錢比菜名大」：數字 > 菜名 > 店名。

```css
.price{ font-family:"Archivo Black",sans-serif; font-weight:900; line-height:.85; letter-spacing:-.03em; font-size:84px; }
.price small{ font-size:.38em; vertical-align:.95em; }       /* NT$ 縮小掛在左上 */
.dish{ font-family:"Noto Sans TC",sans-serif; font-weight:900; font-size:24px; } /* 永遠小於 price */
.mono{ font-family:"Space Mono",monospace; font-weight:700; text-transform:uppercase; font-size:11px; }
```

### 5. 裸露的介面零件＋旋轉貼紙

零件不藏：radio、checkbox、捲軸、加號按鈕、標籤都畫大、畫粗、塗色，當成裝飾。唯一的裝飾母題是**貼紙**——黑框平色小方塊，旋轉 −7° 到 +6°，跨在板子的邊角上（一半在板內一半在板外）。

```css
.sticker{ display:inline-block; border:3px solid var(--ink); background:var(--sign);
  padding:.25em .6em; font:700 13px "Space Mono",monospace; text-transform:uppercase;
  box-shadow:4px 4px 0 var(--ink); rotate:-4deg; }
input[type=radio]{ appearance:none; width:22px; height:22px; border:3px solid var(--ink); background:var(--paper); }
input[type=radio]:checked{ background:var(--ink); box-shadow:inset 0 0 0 4px var(--sign); }
::-webkit-scrollbar-thumb{ background:var(--ink); border:3px solid var(--sign); }
```

## 色彩系統

| Token | Hex | 用途 | 面積比例 |
|---|---|---|---|
| `--tarp` 帆布藍 | `#3A5CFF` | 頁面底色（整片） | 35% |
| `--sign` 招牌黃 | `#FFD400` | 主板、第一分類、貼紙預設 | 20% |
| `--hot` 粉紅 | `#FF5C8A` | 第二分類、區段標題 | 10% |
| `--mint` 薄荷綠 | `#2EE59D` | 第三分類、成功狀態 | 10% |
| `--orange` 警示橘 | `#FF7A1A` | 拒絕、已花費、路線編號 | 5% |
| `--paper` 紙白 | `#FFF8E7` | 內文板、輸入框 | 12% |
| `--ink` 墨黑 | `#111111` | 框、影子、字、反白板 | 8% |

規則：分類用顏色（本站三條巷＝黃／粉／綠），狀態用黑白反轉（已選＝黑底紙字、影子歸零）。不要再加第六個飽和色。

## 字體系統

- 來源：Google Fonts —— Archivo Black（拉丁展示＋數字）、Noto Sans TC 500／700／900（中文）、Space Mono 700（標籤）。
- 字級 scale（px）：11 標籤／14–15 內文／17–24 菜名、按鈕／26–36 小節標／40–92 區段標／64–150 價錢與站名。
- 字重：中文只用 500（內文）與 900（其他全部）；不用 300、不用斜體。
- 行高：展示 0.85–0.95；內文 1.55。字距：展示 −0.02 到 −0.04em；等寬 +0.02em。

## 版面與網格

- 板子靠網格對齊，但**大小不等**：同一列裡 flex-grow 1 / 1.2 / 1.35 / 0.8 混用；每 5 張卡第 1 張跨兩欄（`grid-auto-flow:dense`）。
- 間距只有 3 個值：16／24／30px，而且必須**大於影子長度**（影子不能碰到隔壁）。
- 板子本身不旋轉，**只有貼紙旋轉**（−7°～+6°）。
- 留白：區段之間 64–70px 純底色；不加分隔線，色場本身就是分隔。
- 手機 ≤560px：兩欄、價錢降到 38–72px、影子不縮。

## 元件配方

- **Nav（tray-dock 托盤底欄）**：固定在底部的一排板子：logo 板（黃）＋頁籤板（紙白，當前頁＝黑底且 `--z:0`）＋狀態板（綠，顯示托盤件數與金額）。
- **按鈕**：`.btn.slab.lift`，主要動作黑底紙字，次要紙白；disabled＝虛線框、影子 0、灰字。
- **卡片**：`.slab`＋單色＋上方等寬列（編號反白方塊＋屬性）＋巨大數字＋900 標題＋3px 黑線分隔的說明＋等寬頁尾。
- **表單**：3px 框、0 圓角、`box-shadow:4px 4px 0`；checkbox/radio 用 `appearance:none` 重畫成方塊。
- **貼紙**：見特徵 5，用 CSS 錨點定位掛在板子角上（見技術章）。
- **Footer**：三塊不等寬的板子（黑／黃／紙白）並排。

## 動效規則

全部動效都操作同一個 `--z`（高度）或 `translate`，沒有淡入、沒有模糊。

| 類型 | 名稱 | 觸發 | 具體值 |
|---|---|---|---|
| ambient | 燈泡串＋晃動貼紙 | 一直在 | 燈泡 `1.8s steps(1)` 三相輪閃；貼紙 `rotate −7°↔5°, 2.6s ease-in-out alternate`，各自錯開 0.37s |
| input | 抬板／貼地／拖曳 | hover・focus・active・pointer | `--z` 6→10px（90ms steps(3)）、active→0（40ms）；拖曳中 `--z:22px`、進入落點區 30px、依水平速度傾斜 ±6° |
| transition | 鐵捲門 | 站內連結 | 黃底黑條紋門板 `translateY(-101%→0)` 420ms `linear(0,…,1 42%,.94 50%,1 58%,…)`；新頁載入時 460ms 捲上去 |
| signature | 落牌 Slam | 進場、加入托盤、篩選、送出 | `@keyframes slam{from{--z:48px}to{--z:6px}}` 620ms，easing `linear(0, .08 8%, .3 16%, .66 25%, 1.14 34%, .93 43%, .9 47%, .95 52%, 1.06 60%, .99 69%, 1.02 79%, 1)`；34% 時刻（≈210ms）板子撞地，隔壁板子 `jolt` 260ms steps(4) 震一下 |

**prefers-reduced-motion**：四種全部關閉（`animation:none`、`transition:none`、不拉鐵門、燈泡改靜態間隔亮），板子直接停在 `--z:6px`；所有資訊、狀態與結果原樣顯示，零損失。

## 插畫與圖像風格

**slab-sticker 平板貼紙構成**：沒有照片、沒有寫實插畫。所有圖都是黑框平色矩形的組合：地圖是三條黑框色帶＋白框小方塊攤位＋7px 黑色直角折線路線（`stroke-linejoin:miter`），編號是橘色小方塊。若需要圖示，用 3px 黑線＋平色填，不准 emoji、不准細線 icon。

## Logo 與 Favicon 設計指南

Logo＝一塊黃色方板（4px 黑框、右下黑色硬影子 6px），上緣是粉紅色的攤位遮雨棚（被三條黑直線切成四格），中間一個由直線與 45° 斜線組成的粗黑「K」。favicon 同一個 SVG，以 data URI 內嵌：`<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,…">`。

## Do & Don't

**Do**
- 每一塊東西都有黑框、有影子、有一個顏色。
- 讓影子表示高度與可按性：能按的抬高，已選的貼地。
- 把最重要的數字寫成全頁最大的字。
- 讓表單元件、捲軸、加號露出來，畫大。

**Don't**
- 不要 blur、不要柔和陰影、不要彩色陰影、不要漸層、不要 opacity 做淺色。
- 不要圓角大於 0（或你選定的那個唯一值）；不要混用兩種框粗。
- 不要讓板子本身旋轉；旋轉只給貼紙。
- 不要用淡入、視差、滑動輪播當主要動效——新粗獷的動效是「掉下來、撞到、震一下」。
- 去AI化：不要紫藍漸層 hero、不要置中三卡片、不要 emoji icon、不要 Lorem ipsum、不要「EST. 19xx」徽章。

## 頁面骨架範例

```html
<style>
@property --z{syntax:'<length>';inherits:false;initial-value:6px}
:root{--ink:#111;--paper:#FFF8E7;--tarp:#3A5CFF;--sign:#FFD400;--hot:#FF5C8A;--mint:#2EE59D;
  --slam:linear(0,.08 8%,.3 16%,.66 25%,1.14 34%,.93 43%,.9 47%,.95 52%,1.06 60%,.99 69%,1.02 79%,1)}
body{background:var(--tarp);font-family:"Noto Sans TC",sans-serif;margin:0;padding:24px 16px 96px}
.slab{border:3px solid var(--ink);background:var(--paper);transform:translate(calc(var(--z)*-1),calc(var(--z)*-1));
  box-shadow:var(--z) var(--z) 0 var(--ink);transition:--z 90ms steps(3,end)}
.lift:hover{--z:10px}.lift:active{--z:0px}
.slam{animation:slam 620ms var(--slam) both}@keyframes slam{from{--z:48px}to{--z:6px}}
.price{font:900 96px/.85 "Archivo Black",sans-serif;letter-spacing:-.03em}
.sticker{position:absolute;border:3px solid var(--ink);background:var(--sign);padding:.2em .6em;
  font:700 12px "Space Mono",monospace;box-shadow:4px 4px 0 var(--ink);rotate:-5deg;
  top:calc(anchor(top) - 16px);right:calc(anchor(right) - 12px);position-try-fallbacks:flip-inline}
</style>
<header class="slab slam" style="background:var(--sign);padding:16px 20px;position:relative;anchor-name:--h">
  <p class="price"><small style="font-size:.38em;vertical-align:.95em">NT$</small>70</p>
  <h1 style="font-weight:900;margin:0">蚵仔煎</h1>
</header>
<span class="sticker" style="position-anchor:--h">加蛋 +15</span>
<button class="slab lift" style="background:var(--ink);color:var(--paper);font:900 20px sans-serif;padding:12px 16px;margin-top:30px">放進托盤 →</button>
```

## 技術實作與相容性

本站三項核心技術（2026-10 查證）：

### A. CSS `@property` 型別化自訂屬性 `--z`（C 版面與樣式層）
- 承載特徵 2：一個 `<length>` 同時驅動 `transform` 與 `box-shadow`；因為已註冊型別，`transition:--z` 與 `@keyframes{from{--z:48px}}` 才能補間（未註冊的自訂屬性只會在 50% 瞬間跳值）。
- 支援：Chrome／Edge 85、Safari 16.4、Firefox 128；**2024-07 起 Baseline**。來源：MDN〈@property〉、web.dev〈@property: Next-gen CSS variables now with universal browser support〉。
- Fallback：舊瀏覽器 `--z` 仍是一般自訂屬性，靜止狀態（6px）正確顯示，只是抬起／落牌改為瞬間切換；資訊不受影響。

### B. CSS `linear()` easing 函式（B 動效與時間軸層）
- 承載簽名動效〈落牌〉：一條 `linear()` 用點列寫出「加速下落→撞地（值 1.14，超過 1 代表影子被壓到 0）→回彈→二次輕撞→靜止」；鐵捲門的 `--shut` 也是一條 `linear()`。cubic-bezier 只有兩個控制點，寫不出多次回彈。
- 支援：Chrome／Edge 113、Firefox 112、Safari 17.2；**2023-12 起 Baseline**。來源：MDN〈linear()〉、caniuse〈easing-function linear()〉、Chrome for Developers〈Create complex animation curves in CSS with the linear() easing function〉。
- Fallback：不認得 `linear()` 的瀏覽器會讓整個 `animation` 宣告失效 → 板子直接停在 6px（無動畫但版面正確）。

### C. CSS 錨點定位 Anchor Positioning（C 版面與樣式層）
- 承載特徵 5：貼紙不是板子的子元素，而是放在同一個容器裡、用 `position-anchor` 掛到某塊板子的角上——所以它能跨出板子的邊、能在版面右緣用 `position-try-fallbacks:flip-inline` 自動改貼到左角。用在：首屏六面招牌上晃動的吊牌、名錄頁 12 張加價貼紙與一張共用的黃色資訊貼（滑過哪攤，`anchor-name` 就改給哪攤）、掃街拖曳中跟著板子走的價牌（`position-area:top right` ＋ 三種 flip fallback，貼到視窗邊會自己翻面）。
- 支援：Chrome／Edge 125（2024-05）、Safari 26（2025-09）、Firefox 147（2026-01-13）；**2026-01 起 Baseline Newly available**。來源：web.dev〈New to the web platform in January 2026〉、MDN〈CSS anchor positioning〉。
- 注意：錨點追的是**版面盒**不是 transform 後的位置——所以拖曳中的板子用 `left/top` 移動（不是 transform），貼紙才會跟。
- Fallback：`@supports not (anchor-name:--a)` 時隱藏錨點貼紙，改顯示寫在板子內部、`position:absolute` 掛在右上角的同內容貼紙（`.fb`）；拖曳價牌不顯示，資訊仍在板子上。

### 其他
- 掃街路線：Held-Karp 動態規劃（≤12 攤，2¹²×12 狀態），三條巷＋三條橫向通道的曼哈頓距離；號碼牌為 FNV-1a 雜湊；分享網址 `?p=A1.B4.C8`；跨頁以 sessionStorage 帶到地圖頁。
- 真實時刻：`new Date()` 每分鐘更新「營業中／17:30 開攤／收攤了／週一公休」貼紙。

### 效能預算（建站實測）
- 頁面大小：index 約 57 KB、stalls 約 40 KB、map 約 31 KB（全部 inline，遠低於 350 KB）。
- 首屏 JS：開場只做 6 個 class 切換與 24 個按鈕綁事件；Held-Karp 只在按「開吃」時跑，Node 22 實測 11 攤平均 2.7 ms（12 攤上限約 59 萬次迴圈）。jsdom 整頁「解析＋執行」為 31–161 ms，但那是 jsdom 本身的 DOM 解析成本，非瀏覽器數字；本站未能在建站環境以真瀏覽器量測首屏，這一項列為待線上複測。
- 動畫只動 `transform`／`box-shadow`／`translate`／`rotate`，無 layout thrashing；拖曳時只改一個 fixed 元素的 left/top。
