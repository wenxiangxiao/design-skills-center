---
name: split-fountain-dayglo-showcard
description: American letterpress show-print window cards in the Hatch Show Print / Tribune Showprint / Globe Poster tradition — split-fountain (rainbow-roll) fluorescent ink fields that blend only left-to-right, transparent black type and halftone cuts overprinted on top, condensed gothic wood-type lines each stretched to fill the full measure with size set by billing order, per-act colour clouds, star bursts, and an unprinted card-stock margin, stapled in layers to a pole.
---

# 分色滾筒螢光窗卡 Split-Fountain Day-Glo Show Card

> 範例站：昌記釣蝦場 TSHIONG-KÌ TIÒ-HÊ（新北三重・老闆當過十七年印刷師傅，每週自己印一張螢光窗卡釘在門口那根自己立的木桿上）。風格不綁產業——任何「有檔期、有陣容、要在街上三秒被看見」的東西都適合：演唱會、拳擊／摔角、live house、夜市攤商聯合活動、市集、廟會、球賽、快閃店、二手唱片行、獨立書展、脫口秀、選舉造勢（記得標示）。

## 1. 設計哲學

美國的「演出窗卡」（show card／window card，常見 14×22 吋直式卡紙）是一個十九世紀到今天沒斷過的街頭印刷傳統：

- **Hatch Show Print**（田納西州 Nashville，1879 年 Charles 與 Herbert Hatch 創立，今屬鄉村音樂名人堂）用木活字與木刻版印巡演海報，至今仍用分色墨斗（split fountain）與彩虹滾（rainbow roll）。
- **Globe Poster Printing Corp.**（馬里蘭州 Baltimore，1929–2010；後由 Cicero 兄弟經營）以 Day-Glo 螢光油墨聞名：先用絹印鋪螢光底，再上大型圓壓活版機壓黑字；每個藝人分到一朵自己的「色雲」，最適合一次塞進七八組人的靈魂樂、藍調、go-go 與嘻哈拼盤。2011 年 MICA（馬里蘭藝術學院）買下其大部分木活字、圖版與海報檔案。
- **Tribune Showprint**（印第安那州 Earlville）等同業提供「分色滾筒矩形底」的預印卡，演出資訊直接用黑墨壓在上面。

它長成這樣，全部是**生產限制**：

1. **分色墨斗＝一次上三色的窮人法**。墨斗本來只裝一色；用鐵楔（wedge）把墨槽隔成幾格，每格放不同顏色，一次過機就印出多色。Hatch 的說明是：因為其中一支著墨輥會左右震盪（oscillate），相鄰兩色之間會被揉出一段漸層；楔塊擋住的區段保持純色；不放楔塊的話，紅和藍會吃掉中間的黃，印到後來整片變濁。**所以漸層只會左右走、上下不變**（墨輥是橫的），而且**印越多張，混色帶越寬**。
2. **螢光油墨＝便宜又刺眼**。Day-Glo 螢光顏料在 1950 年代中期進入海報印刷，在街上比任何四色照片都亮；代價是怕曬，幾週就褪成粉筆色——所以窗卡是週拋的。
3. **黑墨是透的**。最後一道才壓黑字與網點照片，黑墨疊在粉上偏紫、疊在黃上偏綠褐，兩道之間總有一兩條線的套印誤差。
4. **木活字只有那幾號**。排字工的工作是「把每一行塞滿版心」——字少就換寬體、字多就換窄體、還塞不滿就換大一號。字級不是設計決定，是**陣容順序（billing）**決定的：頭牌一整行最大，其次小一號，再來擠一朵色雲，最後全部塞在「PLUS」後面。
5. **四邊白邊是卡紙本色**。印刷機咬口與邊規讓四周留下 3/8 吋左右沒印到的卡紙——白不是白墨，是「沒印」。

一句話：**左右漸層的螢光底、透明的黑、每一行都被撐滿。**

本範例站的在地轉譯：台灣的歌廳秀、工地秀、野台戲宣傳單在 1970–80 年代同樣大量使用螢光油墨與活版／照相打字；中文字沒有寬度可選，所以用**照相打字的「長體／平體」鏡頭**（長1＝90%、長2＝80%、長3＝70%；平1＝110%、平2＝120%）來撐滿版心。

## 2. 色彩系統

先寫 sRGB 後備值，再用 `@media (color-gamut:p3)` 覆寫成 Display P3（螢光色在 sRGB 外，P3 螢幕上能更接近油墨的「刺」）。

| 角色 | 名稱 | sRGB | Display P3 | 比例 | 用途 |
|---|---|---|---|---|---|
| 螢光 1 | 極光粉 Aurora Pink | `#FF4FA3` | `color(display-p3 1 .27 .64)` | 15–30% | 主窗卡左段、色雲 |
| 螢光 2 | 火焰橘 Blaze Orange | `#FF7A12` | `color(display-p3 1 .47 .04)` | 15–30% | 主窗卡中段 |
| 螢光 3 | 土星黃 Saturn Yellow | `#F2F01E` | `color(display-p3 .95 .96 .08)` | 15–30% | 主窗卡右段、按鈕 |
| 螢光 4 | 訊號綠 Signal Green | `#4CF55A` | `color(display-p3 .36 1 .32)` | 5–15% | 價目卡、導覽帶 |
| 螢光 5 | 地平藍 Horizon Blue | `#2FC4FF` | `color(display-p3 .18 .77 1)` | 5–15% | 池水、色雲 |
| 螢光 6 | 日冕洋紅 Corona Magenta | `#F01EB4` | `color(display-p3 .93 .08 .72)` | ≤10% | 比賽卡 |
| 螢光 7 | 火箭紅 Rocket Red | `#FF3B3B` | `color(display-p3 1 .22 .2)` | ≤3% | 星芒章 |
| 黑版 | 壓印黑 | `#221C1A` | — | 12–20% | 所有字、網點、線；永遠 `mix-blend-mode:multiply` |
| 卡紙 | 未印卡紙 | `#F3EFE4` | — | 8–12% | 四邊白邊、說明框（白＝沒印） |
| 環境 | 水泥灰／木桿 | `#7A7B73`／`#4B3A2E` | — | 背景 | 卡片之外的世界 |

**規則**：一張卡最多三罐螢光（一道墨斗）＋一罐黑；漸層只出現在相鄰兩罐之間；零白字（要「白」就是挖空露出卡紙）；不用陰影、不用金屬、不用照片色彩。

## 3. 字體系統

| 用途 | 字體 | 來源 | 設定 |
|---|---|---|---|
| 拉丁哥德木字 | **Anybody**（可變：`wdth` 50–150、`wght` 100–900） | Google Fonts | 全大寫、`wght` 800–900、`wdth` 由撐滿演算法決定 |
| 中文 | **Noto Sans TC** 900 | Google Fonts | 以 `scaleX` 的長體／平體階梯撐滿（不准任意比例） |
| 小字（印記、說明） | Anybody `wdth` 55–70、`wght` 600–800 | 同上 | 10–13px，字距 .06–.14em |

字級 scale 不是固定值，是**陣容順序**：

| billing | 行 | 撐滿後高度約為版心寬的 |
|---|---|---|
| 頭牌 HEADLINER | 名字一整行 | 22–30% |
| 第二 WITH | 名字一整行 | 14–18% |
| 三、四 | 各占一朵色雲、置中 | 7–10% |
| 五以下 | 全部擠在 PLUS 後面同一行 | 5–7% |
| 連接詞 | PLUS／AND／WITH／STARRING | 固定 3.4cqi、wdth 70、字距 .3em |

`line-height:.86`（拉丁）／`1`（中文）；行與行之間只用 2px 黑線（`.rule`）或連接詞分隔，不用留白分段。

## 4. 版面與網格

- **窗卡比例 14:22（直）**，橫式用 22:14；四邊白邊 `clamp(8px,2.6cqi,16px)`。
- **一行一個資訊**，每一行都撐滿版心寬度（見特徵③）；不准左對齊留右邊空。
- **分帶**：頂帶（日期／地點，小）→ 主帶（頭牌，最大）→ 圖帶（網點照片＋星芒）→ 色雲帶（第三、四名）→ PLUS 帶 → 底帶（電話、售票處）→ 印記（印刷所名與張號）。
- **色雲**：每朵是一塊獨立的兩色分色底，邊緣是手刻的微抖直邊（`clip-path` 多邊形，每邊 ≤1.6% 抖動），不得圓角。
- **貼在桿上**：卡片之間互相重疊、旋轉 −3°～+2.5°，以訂書針固定在頂端；舊卡被撕剩下半張、褪色（`saturate(.32)`）。
- 斷點：≤900px 兩欄、≤560px 單欄；卡片比例不變，字仍撐滿。

## 5. 元件配方

**分色底（任何容器）**
```css
@property --osc{syntax:'<percentage>';inherits:true;initial-value:0%}
@property --bl{syntax:'<percentage>';inherits:true;initial-value:4%}
.fount{--a:var(--pink);--b:var(--orange);--c:var(--yellow);--s1:33%;--s2:67%;
  background:linear-gradient(90deg,var(--a) calc(var(--s1) + var(--osc) - var(--bl)),var(--b) calc(var(--s1) + var(--osc) + var(--bl)),var(--b) calc(var(--s2) + var(--osc) - var(--bl)),var(--c) calc(var(--s2) + var(--osc) + var(--bl)));
  background:linear-gradient(90deg in oklab, /* 同上 */);
  animation:osc 3.4s ease-in-out infinite alternate}
.fount.two{--s2:120%}  /* 兩罐 */
@keyframes osc{from{--osc:-1.6%}to{--osc:1.6%}}
```

**窗卡**：`.card`（卡紙＋陰影＋`container-type:inline-size`）→ `.bed.fount`（印到的範圍）→ 內容；頂端 `.staple`（18×5px 金屬條）。

**導覽＝售票處底帶**：固定在頁底、高 58px、三格，現頁黑底挖空露卡紙；左側小標「報名・售票處 TICKETS AT」、右側電話。

**按鈕**：3px 黑框＋4px 硬投影，主按鈕是一塊小分色底；按下位移 3px。

**星芒章**：18–22 角、內徑 .72、每角 ±3% 抖動（固定 seed），火箭紅或土星黃，上面壓黑字並旋轉 −10°。

**表單**：白底 3px 黑框輸入；送出後印出一張橫式小窗卡（預約單）。

**頁尾**：一行印記風小字＋虛構聲明。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 內容 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **串墨輥震盪**：所有分色底的混色帶左右呼吸 | 無需輸入 | `@property --osc` ±1.6%、3.4s、ease-in-out、alternate | 停在 0%，漸層靜止，資訊不變 |
| input 輸入 | **掛在訂書針上的卡**：游標靠近，卡片以頂端為軸朝你翹起、陰影跟著拉長 | pointermove／focus | rAF 內插 0.35、rotateX ≤7°、rotateY ≤6°，延遲 <1 幀 | 不翹 |
| input 輸入 | **捲進視野時被釘上**：卡片從下方 46px、多轉 6° 落到原位；捲出時頂端翻起 | CSS scroll-driven `animation-timeline:view()` | entry 0%→85%、exit 10%→100% | 關閉，卡片在原位 |
| transition 轉場 | **撕下來**：點連結時目前頁面沿一條斜的撕邊被由上往下扯掉，新頁像被拍上桿子 | 連結點擊 | WAAPI `clip-path` 撕邊多邊形 420ms `cubic-bezier(.5,0,.8,.4)`；進場 `scale 1.035→1` 340ms | 直接換頁 |
| signature 簽名 | **兩道過版＋混色帶隨印次變寬**：先一支沾著三色的墨輥由上往下滾出螢光底，停 240ms，黑版「咚」一聲壓上（1.018→1、110ms、帶 1–2px 套印誤差），卡片下沉 3px；每拉一張，全站所有分色底的混色帶寬 `--bl` +0.35%（3%→15%），按「洗墨斗」歸零 | 按鈕「拉一張」、遊戲結束、預約送出 | 滾色 700ms `cubic-bezier(.45,.05,.55,.95)` | 不滾不壓，直接顯示印好的卡；混色帶照樣變寬（資訊零損失） |

## 7. 插畫與圖像風格（dayglo-showcard：分色底＋黑版網點）

- **網點剪影**：主角（本站是泰國蝦）先以灰階明暗畫在離屏 canvas，再以 45° 網屏取樣，網點半徑 `cell×0.66×√(1−L)`；細線（觸鬚、腳）直接以實線補上——這是「網點照片＋手修黑線」的老製版手法。
- 只用一罐黑；圖片整塊 `mix-blend-mode:multiply` 壓在螢光上。
- 星芒、楔形箭頭、粗框線是唯一的裝飾；不畫寫實背景。
- 地圖也是窗卡：街道是粗黑線、店是一顆黑星。

## 8. Logo 與 Favicon

- Logo：22 角星芒內填三段分色（粉／橘／黃），上壓黑色長體「昌記」、粗黑線、拉丁「TIÒ-HÊ」與「SANCHONG · 1989」，頂端一支浮標。外圍是卡紙色方框（白邊）。
- Favicon：16 角星芒三段色＋黑色菱形浮標與紅帽，inline SVG data URI。

## 9. Do & Don't

**Do**：左右走的漸層／每行撐滿／黑字疊印／陣容決定字級／卡紙白邊／訂書針與重疊／一週一張的時效感（日期、場次、張號）。

**Don't**：
- 上下或斜向的漸層（那是 UI 漸層，不是墨斗）；三罐以上螢光；漸層跨越整張而沒有純色段。
- 白色字、陰影字、描邊字、圓角卡片、玻璃擬態、紫藍漸層 hero。
- 左對齊留白的標題；固定字級的段落式標題。
- 照片保留原色；向量插畫取代網點。
- emoji icon、Lorem ipsum、「EST. 19xx」徽章、置中三卡片模板。
- 與迷幻海報混淆：本風格的字是剛硬的哥德木字，不扭曲、不融化；與 Risograph 混淆：本風格的色是螢光平塗、不是粉彩顆粒。

## 10. 本風格的 5 個不可省略特徵

### ① 分色墨斗色場：只往左右漸變，楔塊之間才混（色彩規則）
拿掉它就只是「有漸層的海報」。純色段＋窄混色帶＋水平方向，三者缺一不可；混色帶寬可隨印次變寬。
```css
.fount{background:linear-gradient(90deg in oklab,
  #FF4FA3 calc(33% - 4%), #FF7A12 calc(33% + 4%),
  #FF7A12 calc(67% - 4%), #F2F01E calc(67% + 4%));}
```

### ② 螢光底＋透明黑版疊印（色彩規則／製程）
黑字、網點、線全部 `multiply`，並允許 1–2px 套印誤差；在 P3 螢幕上用廣色域螢光。
```css
:root{--pink:#FF4FA3}
@media (color-gamut:p3){:root{--pink:color(display-p3 1 .27 .64)}}
.ink{color:#221C1A;mix-blend-mode:multiply}
.inkform{mix-blend-mode:multiply;transform:translate(1px,-1px)} /* 套印誤差 */
```

### ③ 每一行都撐滿版心的壓縮哥德木字（字體選擇）
拉丁靠 `wdth` 軸、中文靠長體／平體階梯，最後用字級補到剛好滿。
```js
// 1) 以 k×寬 試排 2) 拉丁：wdth=clamp(50,100×需要比,150)；中文：選 ≤ 需要比 的最大鏡頭 [.6,.7,.8,.9,1,1.1,1.2]
// 3) 重量測後 font-size *= 版心寬 / 實際寬 —— 讀寫分批，避免 layout thrashing
```
```css
.fit{display:block;white-space:nowrap;font-size:0}
.fit>span{display:inline-block;font:900 var(--fs)/.86 Anybody;text-transform:uppercase;
  font-variation-settings:"wdth" var(--wd),"wght" 900}
.fit.zh>span{font-family:"Noto Sans TC";transform:scaleX(var(--sx));transform-origin:0 50%}
```

### ④ 窗卡分帶＋陣容字級＋色雲（版面手法）
14:22 卡紙、四邊白邊；頭牌最大、WITH 次之、三四名各一朵色雲、其餘塞在 PLUS 後。
```html
<div class="card"><div class="bed fount">
  <span class="fit c"><span>NEXT SATURDAY · 9 PM</span></span>
  <span class="join">HEADLINER</span><span class="fit zh c"><span>林志忠</span></span>
  <div class="clouds"><div class="cloud fount two" style="clip-path:polygon(0 1%,100% .4%,99% 100%,.6% 99%)">…</div></div>
  <span class="join">PLUS</span><span class="fit zh c"><span>小胖 433・陳老師 286</span></span>
  <div class="imprint">昌記自印 · 第 1,912 號</div>
</div></div>
```

### ⑤ 網點剪影＋星芒章＋被釘在桿上的層疊（裝飾母題）
```js
// 45° 網屏：對每個格點取樣灰階 L，畫半徑 cell*0.66*sqrt(1-L) 的黑點
for(u…)for(v…){const x=cx+u*cos-v*sin,y=cy+u*sin+v*cos;const L=lum(x,y);g.arc(x,y,c*.66*Math.sqrt(1-L),0,7)}
```
```css
.staple{position:absolute;top:7px;left:calc(50% - 9px);width:18px;height:5px;
  background:linear-gradient(#EEE 0 35%,#C9C6BE 35% 70%,#8E8B83 70%);rotate:-4deg}
.old{filter:saturate(.32) brightness(1.08);clip-path:polygon(0 0,100% 0,100% 82%,…,0 79%)} /* 褪色、撕剩上半 */
```

## 11. 頁面骨架範例

```html
<main>
  <section class="scene">          <!-- 牆＋桿＋重疊窗卡 -->
    <div class="pole"></div>
    <div class="card tilt sv" style="--r:-1.2deg"><span class="staple t"></span>
      <div class="bed fount" style="--a:var(--pink);--b:var(--orange);--c:var(--yellow)">
        <span class="fit zh ink" data-k=".26"><span>店名</span></span>
        <span class="fit ink" data-k=".14"><span>ROMANIZED NAME</span></span>
        <div class="grow"><canvas class="ht"></canvas></div>
        <span class="fit c ink" data-k=".11"><span>(02) 0000-0000</span></span>
      </div></div>
  </section>
</main>
<div class="outlet fount"><span class="lbl">報名・售票處</span><nav>…</nav></div>
```

## 12. 技術實作與相容性

### 12.1 可變字型軸 `font-variation-settings`（wdth／wght）＋ResizeObserver 撐滿排字（C 層）——承載特徵③④
- **支援**：`font-variation-settings` 為 MDN Baseline 廣泛可用；Anybody 的軸為 `wdth`、`wght`（Fontsource 套件說明列出 axes `[wdth,wght]`、weights 100–900），以 Google Fonts CSS2 `Anybody:wdth,wght@50..150,100..900` 載入。
- **演算法**：每批 `.fit` 三寫兩讀（先全部寫、再全部量），中文改用離散的長平鏡頭；ResizeObserver 在容器寬變動時以 rAF 合批重排。
- **Fallback**：字型沒載到時 `wdth` 無效，但第三步的字級補償仍讓每一行剛好撐滿；無 JS 時 `<noscript>` 改為可換行、7cqi 固定字級。

### 12.2 CSS Color 4：`color(display-p3 …)`＋`@media (color-gamut:p3)`＋`linear-gradient(… in oklab …)`＋`mix-blend-mode:multiply`（A 層）——承載特徵①②
- **支援**：`color-gamut` 媒體查詢 MDN 標為 Baseline widely available（自 2023-02）；caniuse：Chrome 58、Firefox 110、Safari 10。Chrome《Migrate to HD CSS color》建議先宣告 sRGB、再覆寫 P3。漸層插值色彩空間（`in oklab`）：caniuse／MDN Firefox 127 起支援（Firefox 127 release notes 明列），Chromium 與 Safari 更早支援（本輪只查證了 Firefox 的起始版本，其餘以 caniuse「linear-gradient() Interpolation color space」頁為準）。
- **Fallback**：非 P3 螢幕用 sRGB 色票；不支援 `in oklab` 的瀏覽器吃前一行同結構的 sRGB 漸層（混色帶中段略灰）。`mix-blend-mode` 為廣泛可用。

### 12.3 CSS scroll-driven animations：`animation-timeline:view()`（B 層）——承載「捲進來被釘上、捲出去翻起」
- **支援**：caniuse `animation-timeline: view()`：Chrome／Edge 115+、Safari 26+；Firefox 仍在旗標後（各頁面版本數據不一致，MDN 標 Limited availability）。
- **Fallback**：整段包在 `@supports (animation-timeline:view())` 內；不支援時卡片直接以最終姿態顯示，無 JS 補洞（刻意不用捲動監聽，避免捲動劫持）。

### 12.4 其他輔助
- `@property` 註冊 `--osc`、`--bl` 讓漸層停點可補間（ambient 與簽名）；Web Animations API 跑撕頁、滾色、壓黑。
- 簽名的印次存在 `localStorage`（try/catch；只是個人便利，清掉就從 0 開始）；遊戲成績可用 `?n=&g=` 分享。

### 12.5 效能預算（本輪實測）
- 檔案：index.html 約 55KB、match.html 約 42KB、pools.html 約 36KB（皆含全部 inline CSS／JS，遠低於 350KB）；零外部圖片、零音檔。
- 執行：三頁在 jsdom 下完整跑過啟動、拉一張、遊戲開局、分享卡、預約送出流程，零錯誤；`node --check` 逐檔通過。
- **未能實測**：本輪排程環境無法下載無頭瀏覽器（網路白名單阻擋），首屏 JS 毫秒數與 fps 未取得實測值。依工作量估計：網點取樣 640×340 一次 `getImageData`＋約 3,000 個圓點、每頁 20–30 行撐滿排字（三寫兩讀），預估 <40ms；常駐動畫只有分色底的 `--osc` 補間（重繪限於少數元素）。後續維護者請以 DevTools Performance 補上實測。

### 12.6 查證來源
- Hatch Show Print〈More Rainbow [Rolls] Than Summer Showers〉2024（分色墨斗、鐵楔、震盪著墨輥造成混色）
- Wikipedia〈Split-fount inking〉；Ephemera Society〈Split Fountain Printing〉
- MICA〈MICA Acquires Historic Globe Poster Collection〉；NPR〈Globe Poster: American Music Illustrated〉2011；Collectors Weekly〈Globe Poster Wood-Type Archive Preserved〉
- caniuse：`color-gamut`、`linear-gradient()` interpolation color space、`animation-timeline: view()`；MDN：`@media/color-gamut`、`<color-interpolation-method>`、`animation-timeline/view()`、Firefox 127 release notes；Chrome Developers〈Migrate to HD CSS color〉
