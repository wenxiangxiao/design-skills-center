---
name: finnish-printed-cotton
description: The 1950s–70s Finnish screen-printed cotton look (Printex/Marimekko, Maija Isola, Vuokko Nurmesniemi) — enormous brush-painted flat shapes cropped by the cloth edge, one transparent ink per screen with a third colour born where two screens overprint, loose registration, a visible half-drop repeat with printed selvedge, and small lowercase sans type living only in the unprinted cloth.
---

# 芬蘭印花布 Finnish Printed Cotton（Printex／Marimekko 1949–1970s）

> 範例站：tit-tâng 直筒洋裁教室・自家手印棉布（臺南）。本 SKILL 定義風格，不綁產業。
> 本 SKILL 描述的是一種**印花方法與版面態度**，不是任何品牌：不要重製 Unikko（罌粟花）、Jokapoika 條紋或任何既有圖樣與商標，母題必須自己畫。

## 1. 設計哲學

1949 年 Viljo Ratia 在赫爾辛基經營網版印花廠 Printex，妻子 Armi Ratia 找來剛畢業的 Maija Isola；1951 年成立姊妹公司 Marimekko，把印花布做成衣服。Isola 一生畫了五百多張版，從 1957–63 的〈Luonto〉植物壓印系列、1958 的〈Ornamentti〉、1961〈Lokki〉海鷗浪、1963〈Melooni〉、到 1964 年違抗 Ratia「不准畫花」所畫的〈Unikko〉。Vuokko Nurmesniemi 1953 年加入，做出極簡的直筒剪裁——衣服幾乎不剪，讓布自己說話。Lesley Jackson 的評語是：「簡單、大膽、平的圖樣，以戲劇性的尺度印出。」

為什麼長成這樣——全都是製程逼出來的：

- **手拉平網**：一張網一罐墨、刮刀一次拉過整幅布。顏色數＝網數，所以只有兩三色。
- **透明染料**：後上的墨不蓋住先上的墨，兩者相乘，重疊處出現第三色——免費的顏色。
- **長台對版靠定位釘**：幾公釐的套偏是常態，不修。
- **一張網的長度就是一個版距（repeat）**：64 cm 的花樣一路重複，常用半錯接（half-drop）讓接縫藏起來。
- **用畫筆畫在紙上再曬版**（Isola 盤腿坐地、手拿刷子與顏料罐）：所以邊是刷出來的，不是圓規。
- **布要做成窗簾、桌巾、直筒洋裝**：圖案必須在一公尺外就看得見，所以要大——大到一件衣服裝不下一朵。

這個風格在網頁上的本質：**畫面是一匹布。印花是唯一大聲的東西；文字只住在沒印到的地方。**

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--g` 漂白棉 | `#F6F3EC` | 布地＝頁面底、吊牌、布頭、導覽 | 40–55% |
| `--a` A 網墨 | 依配色（例 鴨蛋青 `#7CC6BE`） | 第一張網的巨形 | 15–30% |
| `--b` B 網墨 | 依配色（例 番茄紅 `#E2452E`） | 第二張網 | 10–20% |
| `--o` 疊印色 | **計算而得**（例 `#713623`） | A∩B 的重疊區 | 5–15% |
| `--ink` 墨字 | `#221E1C` | 正文、按鈕、規線（不參加疊印） | ≤6% |
| `--soft` 次字 | `#62594F` | 次級文字（對 `--g` 6.4:1） | ≤3% |

墨架（十罐，皆視為透明染料）：番茄紅 `#E2452E`・桃粉 `#F09AAE`・鴨蛋青 `#7CC6BE`・鈷藍 `#2D5BB0`・芥末 `#E7B01F`・橄欖 `#76802E`・橙 `#F0781C`・紫丁香 `#9B7CC6`・茶褐 `#7B4A2B`・墨 `#221E1C`。
布地：漂白 `#F6F3EC`・生成（未漂）`#E8DCC4`・淡天 `#DCE8EE`。

規則：

1. **疊印色永遠由兩墨相乘算出，不得手選**：`over = lin(A)·lin(B)·lin(G) / lin(W)²`（W＝漂白棉，線性光空間）。印在非漂白布地上的單墨亦乘以布地：`A' = lin(A)·lin(G)/lin(W)`。
2. 每頁只有一組配色（2 墨＋1 地＋1 疊印），**零漸層、零陰影、零透明度、零第四色**（正文墨字除外）。
3. **黑墨不參加疊印**——它把另一罐吃成黑。黑只給字。
4. 配色三規（可計算）：兩墨 OKLab ΔE ≥ 0.12；疊印色與較深那罐 ΔE ≥ 0.08 且 L ≥ 0.28；布地 L − 較淺墨 L ≥ 0.06。

## 3. 字體系統

- 拉丁：**Hanken Grotesk** 400／600（Google Fonts），標題一律**小寫**、字距 +0.01～0.06em。吊牌上的店名是全站最大的字：34px。
- 中文：**Noto Sans TC** 400／700。
- 配色本手寫：**LXGW WenKai TC**（Google Fonts），只用於配色本與吊牌上的一句話，模仿 Isola 練習簿上的墨名註記。
- 級數：12 / 13.5 / 15 / 18 / 28 / 34px。正文 15px／1.75。**沒有任何字大於 34px**——大的是花。
- 數字：`font-variant-numeric: tabular-nums`（價格、版距）。

## 4. 版面與網格

- **首屏是一匹布**：印花 `background-size` ≈ 125vw（手機 230vw），讓單一巨形直徑超過視窗寬的三分之一並被邊緣裁掉。
- **布頭（leader）**：印花段落之間插入未印的白段，左右 padding `clamp(18px,6vw,88px)`、文字欄 ≤38em——文字只能出現在這裡、吊牌上或布邊上，**永遠不壓在印花上**。
- 印花段與布頭之間一條 1px 墨線＋兩枚對版十字（registration mark），標示「印花從這裡開始」。
- 布樣用鋸齒剪（pinking shears）邊，錯落排列（第 2、4 張下移 64／32px），零圓角。
- 無中央置中 hero；吊牌固定在印花右下並旋轉 −3°。

## 5. 元件配方

**布邊導覽（selvedge）**：固定在左側 40px 寬、`writing-mode: vertical-rl`，像布邊印字一樣列出：店名／三個色點（A、B、疊印）／頁名＋英文小字／版名・年份・設計者・幅寬・版距。現用頁反白成墨底。≤560px 轉為頂部 38px 橫條。

```css
.selv{position:fixed;left:0;top:0;bottom:0;width:40px;writing-mode:vertical-rl;display:flex;align-items:center;gap:22px;background:var(--g);font-size:12px;letter-spacing:.08em}
.selv-l[aria-current]{background:var(--ink);color:var(--g)}
.reg{width:13px;height:13px;border-radius:50%;background:var(--a)} .rb{background:var(--b)} .ro{background:var(--o)}
```

**吊牌（hang tag）**：布地色、上緣兩角斜切、一個墨色穿孔。

```css
.tag{background:var(--g);padding:34px 26px 22px;transform:rotate(-3deg);clip-path:polygon(18% 0,82% 0,100% 12%,100% 100%,0 100%,0 12%)}
.tag::before{content:"";position:absolute;left:50%;top:12px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--ink)}
```

**按鈕**：墨底布地字、方角、600 字重；`.alt` 為 1.5px 內框。hover 換成 B 網墨。

**表格**：只有 1px 墨色底線、無底色、無斑馬紋。

**墨罐選擇器**：34px 圓（罐蓋）＋下方墨名；選中＝布地色外圈＋墨色 1.5px 外環。

**footer**：1px 墨線上緣，一行一行像布邊印字。

## 6. 動效規則（四種都必須在）

| 類型 | 本站實作 | 觸發 | 時間 | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **送布**：印花層 `translateY` 一個版距循環，像布在印台上前進 | 自動 | 90s／版距，linear，infinite（窄條 140s） | 停住，印花靜止完整呈現 |
| input 輸入 | **分版檢查**：滑過／聚焦／點擊布邊色點，只顯示 A 網或 B 網（疊印消失） | pointerenter／focus／click | 立即（<16ms） | 同（無動畫成分） |
| transition 轉場 | **抽布／放布**：離頁時內容 `clip-path` 由上往下收並下沉 60px；新頁一條印花「布捲」從頂端滾到底、內容隨之展開 | 點內部連結／載入 | 離 420ms `cubic-bezier(.6,0,.8,.4)`；入 620ms `cubic-bezier(.3,.7,.2,1)` | 一般換頁、無布捲 |
| signature 簽名 | **轉一圈**：人台上的直筒洋裝可拖曳旋轉，角速度決定裙擺張角（10°→40°），布背呈現褪淡的透印 | 拖曳／方向鍵／按鈕 | 慣性衰減 e^(−1.15t)，張角以 6/s 追趕 | 每按一次轉 45°，無慣性、張角固定 9° |

另：布樣 hover 放大 1.18（500ms），人台靜止 1.5 秒後輕微擺動。

## 7. 插畫與圖像風格：筆刷平塗大花版

- 每個形＝圓或橢圓的半徑乘上 2～5 次低頻諧波（振幅 3–8%）＋少量雜訊，再以 Catmull-Rom 轉成三次曲線：**像用排筆一口氣刷出來的，沒有一個是正圓**。
- 直條也要刷：左右兩緣各自緩慢游移（振幅＝條寬 8%）。
- 一個版裡只有 2 張網，每張 1–3 個大形＋1–2 個小點。大形直徑 ≥ 版寬 40%。
- 母題從產業本身長出來並自己命名（本站：菝仔、水窟、竹篙、風颱），不得畫罌粟花。
- 重疊是設計的一部分：至少 30% 的 B 形要壓在 A 形上，才會有疊印色。

## 8. Logo 與 Favicon

Logo：A 形＋B 形＋兩者交集的疊印色（B 套偏 3,−2），右側小寫字標 `tit-tâng`（Hanken Grotesk 600）與一行中文。Favicon：同構圖裁成 32×32、布地色底。兩者都必須用「三色＝兩墨＋疊印」，不得出現第四色或描邊。

## 9. Do & Don't

**Do**
- 讓一個形大到被裁掉；讓疊印色自己出現；保留套偏。
- 文字只放在布頭、吊牌、布邊；小寫、小字。
- 每頁用一組配色，並在布邊上寫出墨名、版名、年份、版距。

**Don't**
- 不要漸層、陰影、玻璃、圓角卡片、紫藍漸層 hero、emoji icon。
- 不要把字壓在印花上，也不要做「置中大標＋兩顆按鈕」。
- 不要描邊、不要幾何正圓、不要對稱。
- 不要用黑墨疊印；不要手選疊印色。
- 不要重製任何既有品牌圖樣（Unikko 等）或字標；不要寫「EST. 19xx」徽章。

## 10. 頁面骨架範例

```html
<nav class="selv" aria-label="布邊導覽">
  <a class="selv-mark" href="index.html"><b>tit-tâng</b> 直筒洋裁</a>
  <span class="regs"><button class="reg ra" data-solo="a"></button><button class="reg rb" data-solo="b"></button><span class="reg ro"></span></span>
  <a class="selv-l" href="index.html" aria-current="page"><span>布</span><i>bolt</i></a>
  <span class="selv-fine">網版〈菝仔〉1971・手印棉 112 cm・版距 64 cm・半錯接</span>
</nav>
<main>
  <section class="run hero"><div class="feed" aria-hidden="true"></div>
    <div class="tag"><div class="nm">tit-tâng</div><p>直筒洋裁教室・自家手印棉布</p></div>
  </section>
  <div class="regline" aria-hidden="true"></div>
  <section class="leader"><h2>布頭 <span class="small">leader</span></h2><p>……</p></section>
</main>
```

```css
.run{position:relative;overflow:hidden}
.feed{position:absolute;left:0;right:0;top:calc(var(--th)*-1);bottom:0;background-image:var(--tile);background-size:var(--tw) auto;animation:feed 90s linear infinite}
@keyframes feed{to{transform:translateY(var(--th))}}
```

## 11. 本風格的 5 個不可省略特徵

拿掉任何一項，就不是芬蘭印花布了。

### ① 放大到被布幅裁掉的巨形
單一母題直徑 ≥ 視窗寬 1/3，首屏內至少一個形出血。

```css
.feed{background-size:125vw auto} /* 手機 230vw */
```

### ② 一張網一罐墨，重疊處相乘出第三色
兩罐透明墨＋布地，疊印色用計算而非挑選；黑不參加疊印。

```js
const lin=c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4, W=lin(0xF6/255);
// 每個通道：over = lin(A)*lin(B)*lin(G)/W/W，再轉回 sRGB
```
```svg
<clipPath id="c"><use href="#A"/></clipPath>
<use href="#A" fill="#7CC6BE"/>
<use href="#B" fill="#E2452E" transform="translate(4 -3)"/>
<g clip-path="url(#c)"><use href="#B" fill="#713623" transform="translate(4 -3)"/></g>
```

### ③ 刷出來的邊，不是圓規
```js
function blob(cx,cy,r,seed){/* r·(1+Σ_{k=2..5} a_k·cos(kθ+φ_k)), |a_k|≤.08 → Catmull-Rom 閉合曲線 */}
```

### ④ 看得見的版距：半錯接重複＋套偏＋布邊印字
重複格為 2W×H（晶格 (W, H/2)、(0, H)），形跨邊界時環面複製；B 網固定偏 3–4 mm；布邊印版名、年份、色點。

```svg
<pattern id="p" patternUnits="userSpaceOnUse" width="1040" height="640" patternTransform="scale(.5)">…</pattern>
```

### ⑤ 印花是唯一大聲的東西：字小、小寫、只住在沒印到的白
```css
h1,h2,h3{font-weight:600;text-transform:lowercase} /* 全站最大字 34px */
.leader{padding:64px clamp(18px,6vw,88px)} .leader p{max-width:38em}
```

## 12. 技術實作與相容性

| 技術 | 本站用途 | 支援現況（查證） | 不支援時 |
|---|---|---|---|
| SVG `<pattern>`＋`patternTransform`、`<use>` 於 `<clipPath>` | 布樣、分版圖、疊印交集 | MDN：`patternTransform` 屬性 Baseline Widely available（2020-01；DOM 屬性 2015-07）。MDN 建議仍用 `patternTransform` 屬性而非 CSS transform | — （SVG 1.1 基本能力） |
| SVG data URI 作 `background-image` 平鋪 | 首屏送布、布條、人台布料 | 全瀏覽器 | — |
| CSS 3D `transform-style:preserve-3d`＋`backface-visibility` | 錐台布裙 24 片×正反面 | MDN：`backface-visibility` Baseline Widely available（自 2022-03 全瀏覽器無前綴） | `CSS.supports` 偵測失敗或無 JS → 顯示建置時的平面 SVG 洋裝剪影（同一配色） |
| CSS `mask-image`（含 `-webkit-mask`） | 每片裙片的梯形；鋸齒剪邊 | Baseline 2023（同寫 `-webkit-` 前綴） | 裙片顯示為矩形（略有重疊）；剪邊為直邊 |
| `history.replaceState` ＋ URL `?d=&a=&b=&g=` | 配色可分享 | 全瀏覽器 | — |
| `sessionStorage` | 取件單跨頁 | 全瀏覽器；隱私模式丟例外時以 try/catch 略過 | 到店頁顯示「還沒有」 |

**效能（headless Chromium 1140、軟體繪圖、1366×860 實測）**：
- 單頁大小：index 118 KB、colorway 54 KB、classes 42 KB、visit 38 KB（皆含 inline 引擎與印花），≤350 KB。
- 首屏 JS（CDP `ScriptDuration`）：2–10 ms；換配色重算三張平鋪＋布背 1–3 ms。
- 轉裙動畫：60 fps。重要教訓：裙片原用 `clip-path: polygon()` 做梯形，軟體繪圖下只有 9–11 fps；改為同形狀的 `mask-image`（SVG data URI，張角量化 0.5° 才換一次）後達 60 fps。陰影以每片 `::after` 的 `opacity` 表示，數值量化到 0.02 且只在改變時寫入。
- 送布用 `transform` 而非 `background-position`，只走合成層。

**fallback 具體行為**：無 JS 時全部印花（建置時烘好的平鋪與 `<pattern>`）、吊牌、課表、地圖完整可讀，僅配色本無法互動並顯示平面洋裝；`prefers-reduced-motion` 時送布停止、無轉場布捲、轉裙改為 45° 一步。
