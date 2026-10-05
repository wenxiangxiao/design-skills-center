---
name: hard-bop-sleeve
description: Late-1950s/60s New York jazz LP sleeve design in the manner of Reid Miles' Blue Note covers — square format, type as the image and cropped off the edge, a single-ink tinted photograph, black plus one spot colour plus paper, and syncopated typographic rhythm.
---

# 爵士封套風 Hard-Bop Sleeve（Reid Miles／Blue Note 1956–1967）

> 範例站：後拍理髮廳 ĀU-PHIK（臺北中山北路二段的老理髮廳）。本 SKILL 定義風格，不綁產業。

## 1. 設計哲學

1956 年，Reid Miles 從 *Esquire* 美術部被 Francis Wolff 找去當 Blue Note 的美術指導，到 1967 年離開前做了 400–500 張封面。條件很差：一張封面據說只拿五十美元、只能印一到兩色，照片是 Wolff 在錄音現場順手拍的黑白側拍。這些限制就是這個風格的全部來源：

- **一到兩色印刷**——所以照片永遠是「一罐墨印出來的黑白照」，顏色從不寫實。
- **12 吋正方封套**——在唱片行的木箱裡只露出上緣與左緣，所以字要大到撞破邊界，三公尺外就認得出來。
- **字就是圖**——預算買不起插畫，Miles 把字母拆開、堆疊、重複、拉寬壓扁，讓字自己變成構圖；到了 1960 年代中期（Larry Young〈Unity〉1966）乾脆整張只有字。
- **音樂是切分的**——hard bop 的重音不在拍點上。好的封面也一樣：重量不在中心、留白不平均、最大的字一定被裁掉一截。

一句話：**一張正方形、兩罐墨、一個被裁掉的大字、一張單墨照片，加上像切分音一樣不對稱的節奏。**

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--k` 封套黑 | `#121110` | 頁面底、主要字、照片暗部 | 45–55% |
| `--p` 紙白 | `#EEEAE0` | 反白字、封底底色（不用純白：封套紙板是暖的） | 20–30% |
| `--spot` 專色（四選一） | 鈷藍 `#2B5FB4`／信號橘 `#E8661E`／撞球綠 `#2E8A55`／計程車黃 `#EDB91C` | 照片亮部、一行強調字、現用態 | 15–25% |
| `--org` 擊響橘 | `#E8661E` | 只用於「正在發聲」的字與 focus ring | <3% |
| `--mid` 灰 | `#8C8A84` | 小字說明（只出現在頁面，不出現在封面上） | <8% |

規則：**一張封面上只准一個專色**。專色換了，整張的語氣就換了；兩個專色同時出現 = 四色印刷 = 不是這個風格。頁面層級可用 CSS 變數 `--spot` 隨當前封面切換。

```css
:root{--k:#121110;--p:#EEEAE0;--spot:#2B5FB4}
```

## 3. 字體系統

- **Display**：Archivo（Google Fonts 可變字型，`wdth` 62–125、`wght` 400–900）。封面大字 `wdth 62`、`wght 900`、全大寫；中文用 Noto Sans TC 900。
- **對比用小字**：同一支 Archivo 拉到 `wdth 125`、`wght 500–800`、字距 `.14–.2em`、全大寫。**窄 vs 寬、黑 vs 細同族對撞**就是 Miles 的手法（他常把 Franklin Gothic Condensed 與 Extended 放在同一張）。
- **內文**：Archivo `wdth 92` 16px／1.62；中文 Noto Sans TC 400。
- 字級階梯：11 / 13 / 16 / 22 / 30 / 46 / 76 / 120 / clamp(200px, 39vw, 620px)。最大與最小差 **≥ 12 倍**。

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
```

## 4. 版面與網格

- 封面一律 `aspect-ratio:1`，座標系 `viewBox="0 0 1000 1000"`。
- 四種排法（本站稱 Take 1–4）：**GIANT**（一排巨字撞破右緣，上方 43% 為照片）、**STAIRS**（字由左上往右下一階一階走，照片佔右上 44% 方塊）、**STACK**（同一個字重複 4–5 行、每行寬度不同、左右交替對齊，照片塞進最短那行留下的洞）、**SCATTER**（字落在 16 格節拍網格上，照片裁成圓）。
- 頁面：左側 184px 曲目導覽、主欄不置中；大標題一律貼左或出血裁切（`left:-1.2vw; bottom:-3.4vw`），**不准置中**。
- 留白不平均：一邊塞滿、一邊空。沒有圓角（`border-radius:0`），陰影只用硬邊位移 `14px 14px 0 rgba(0,0,0,.5)`，像疊在桌上的封套。

## 5. 元件配方

- **導覽（side-tracklist）**：封底曲目表——`A1 封套 / A2 曲目 / B1 樂手 / B2 封底`，每列「編號（wdth125 小字）＋標題＋時長（wdth62 粗字）」，上下 1px 分隔線；現用頁左側長出一個專色三角唱針。≤760px 變底部四格，現用格填專色。
- **按鈕**：2px 實線框、直角、wdth112 全大寫字距 .12em；`.solid` 填專色；播放中填擊響橘。
- **選項 chip**：1px 灰框直角，`aria-pressed=true` 時反白（紙白底黑字）。
- **封底（back）**：紙白底黑字，頂部 3px 黑線＋1px 細線夾一條 wdth125 小字資訊帶，正文兩欄＋1px 欄線，底部 credits 表格。
- **Footer**：三欄 liner notes（2.2fr / 1fr / 1fr），第一欄用 wdth62 粗大寫店名。

```css
.btn{border:2px solid var(--p);border-radius:0;padding:9px 14px;font-variation-settings:"wdth" 112;font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:12px}
.btn.solid{background:var(--spot);border-color:var(--spot);color:var(--k)}
```

## 6. 動效規則（四種都必須在）

| 類型 | 本站實作 | 觸發 | 時值／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient | 唱片從封套滑出 1/3、以 33⅓ rpm 自轉（1.8s/圈 linear）；單墨照片的底片顆粒每 125ms 換一次 feTurbulence seed | 無需輸入 | 1.8s linear infinite／8 fps | 停轉、顆粒靜止（照片仍在） |
| input-driven | 打字即時重排封面（每一鍵 <10ms）；hover 封面牆上移 4px | input / hover | 0ms／.18s cubic-bezier(.2,.8,.2,1) | 重排照做，位移取消 |
| transition | 換 Take：每個字以 FLIP 從舊盒子補間到新盒子（420ms，逐字延遲 14ms）；翻到封底：CSS 3D rotateY 180°（.8s cubic-bezier(.6,0,.2,1)）；換頁：主欄以 `clip-path:inset(0 100% 0 0)→0` 像內套從封套抽出（.52s） | 點擊 | 見左 | 直接切換，不補間；封底內容同樣完整 |
| signature | **封面自己演奏**：Web Audio 依字的位置排程音符，唱針（專色直線）掃過封面，每個字在自己的音響起時被擊響（scale 1.16、填擊響橘 240ms） | 按「放這張」 | 由 AudioContext 時鐘驅動 | 只變色不縮放、不顯示掃描線；聲音照常 |

自我限制：本風格**不用淡入**、不用模糊、不用視差——封套是印刷品，東西要嘛在、要嘛不在。

## 7. 插畫與圖像風格：單墨照片（one-ink photograph）

沒有任何外部圖片。所有「照片」都是灰階 SVG 物件（剪刀、剃刀、梳子、刮鬍刷：線性漸層做金屬高光、徑向漸層做攝影棚打光、高斯模糊做影子），然後整組送進一條濾鏡：

1. `feColorMatrix` 轉灰階（.3/.59/.11）
2. `feTurbulence` fractalNoise 0.9 → 灰階化 → `feComposite arithmetic`（k2=1, k3=.34, k4=-.17）疊底片顆粒
3. `feComponentTransfer` table `0 0 .06 .3 .78 1 1` 硬調（暗部壓死、亮部爆掉）
4. `feComponentTransfer` table `黑 專色` —— **暗＝黑墨、亮＝專色**，雙色調印刷

裁切要狠：物件只露一截（剪刀只見刀環與交叉、梳子只見齒），像 Wolff 的照片被 Miles 裁到他不高興。

## 8. Logo 與 Favicon

- Logo：正方黑底，上 40% 一塊專色帶；「ĀU-」與「PHIK」以**描邊路徑畫的窄體大寫**（stroke 15、square cap，字框 50×120），不依賴字型檔；左下一條擊響橘短條＝唱片標籤。
- Favicon：64×64 黑方塊＋上緣專色帶＋紙白「A」＋一根橘色長方條，inline SVG data URI。

## 9. Do & Don't

**Do**：字撞破邊界被裁掉／同族窄寬字對撞／一張封面只一個專色／照片一律單墨／封面正方／重量偏一邊。
**Don't**：四色照片、漸層背景、圓角卡片、陰影模糊、置中大標、emoji icon、紫藍漸層、Lorem ipsum、「EST. 19xx」徽章；**不要**用真實唱片公司的商標或真實專輯封面構圖（本風格是方法，不是仿冒）；不要讓封面上出現第二個專色。

## 10. 頁面骨架範例

```html
<aside class="rail"><nav aria-label="曲目導覽"><ol>
  <li><a href="index.html" aria-current="page"><span class="n">A1</span><span class="t">封套<small>The Sleeve</small></span><span class="d">1:30</span></a></li>
  <li><a href="tracks.html"><span class="n">A2</span><span class="t">曲目<small>Tracks</small></span><span class="d">8 cuts</span></a></li>
</ol></nav></aside>
<main class="enter">
  <header class="mast"><h1 class="cond">Tracks</h1></header>
  <svg viewBox="0 0 1000 1000" role="img" aria-label="封套">
    <rect width="1000" height="1000" fill="#121110"/>
    <g filter="url(#ph)" clip-path="url(#pc)"><!-- 灰階物件 --></g>
    <text x="-18" y="985" font-size="640" textLength="400" lengthAdjust="spacingAndGlyphs" fill="#EEEAE0">K</text>
  </svg>
</main>
```

## 11. 本風格的 5 個不可省略特徵

1. **正方封套＋撞破邊界的巨字**——最大的字一定被裁掉一截，最大／最小字級比 ≥12。

```svg
<svg viewBox="0 0 1000 1000"><rect width="1000" height="1000" fill="#121110"/>
<text x="-18" y="985" font-size="640" textLength="1240" lengthAdjust="spacingAndGlyphs"
 style="font:900 640px Archivo;font-variation-settings:'wdth' 62" fill="#EEEAE0">KAZU</text></svg>
```

2. **單墨照片**——黑白照只用「黑＋一罐專色」印出，暗部黑、亮部專色，帶顆粒與硬調。

```svg
<filter id="ph" color-interpolation-filters="sRGB">
 <feColorMatrix type="matrix" values=".3 .59 .11 0 0 .3 .59 .11 0 0 .3 .59 .11 0 0 0 0 0 1 0" result="g"/>
 <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n"/>
 <feColorMatrix in="n" type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 0 1" result="ng"/>
 <feComposite in="g" in2="ng" operator="arithmetic" k2="1" k3=".34" k4="-.17" result="gr"/>
 <feComponentTransfer in="gr" result="hc"><feFuncR type="table" tableValues="0 0 .06 .3 .78 1 1"/><feFuncG type="table" tableValues="0 0 .06 .3 .78 1 1"/><feFuncB type="table" tableValues="0 0 .06 .3 .78 1 1"/></feComponentTransfer>
 <feComponentTransfer in="hc"><feFuncR type="table" tableValues=".071 .169"/><feFuncG type="table" tableValues=".067 .373"/><feFuncB type="table" tableValues=".063 .706"/></feComponentTransfer>
</filter>
```

3. **兩罐墨＋紙**——黑、紙白、一個專色；封面上沒有第四個顏色。

```css
.sleeve{--k:#121110;--p:#EEEAE0;--spot:#2B5FB4;background:var(--k);color:var(--p)}
.sleeve .accent{color:var(--spot)} /* 每張只有一處 */
```

4. **字即節奏（切分排版）**——同一字重複、階梯、寬窄同族對撞，重量偏離中心。

```css
.cond{font-variation-settings:"wdth" 62;font-weight:900;text-transform:uppercase;line-height:.84}
.ext{font-variation-settings:"wdth" 125;font-weight:500;text-transform:uppercase;letter-spacing:.2em;font-size:11px}
```

5. **廠牌資訊塊與目錄號**——角落一組極小的寬體字：廠牌名／目錄號・Take・排法／一個實色長方塊「STEREO 33⅓」。這是封面上唯一的小字。

```svg
<g><text x="40" y="500" style="font:800 30px Archivo;font-variation-settings:'wdth' 125;letter-spacing:.14em" fill="#EEEAE0">ĀU-PHIK BARBERS</text>
<text x="40" y="534" style="font:600 21px Archivo;letter-spacing:.16em" fill="#2B5FB4">ĀP 4071 · TAKE 1 · GIANT</text>
<rect x="40" y="552" width="150" height="40" fill="#2B5FB4"/><text x="115" y="579" text-anchor="middle" style="font:800 17px Archivo;letter-spacing:.2em" fill="#121110">STEREO 33⅓</text></g>
```

## 12. 技術實作與相容性

| 技術 | 本站用途 | 支援現況與查證 | Fallback |
|---|---|---|---|
| **SVG filter 單墨照片**（feColorMatrix＋feTurbulence＋feComposite arithmetic＋feComponentTransfer table） | 特徵 2：所有照片 | MDN〈feComponentTransfer〉Baseline Widely available（2015-07 起各瀏覽器）；feTurbulence 同為 Baseline。 | 不支援濾鏡時物件以原灰階呈現，構圖不變 |
| **SVG `textLength` + `lengthAdjust="spacingAndGlyphs"`** | 特徵 1、4：每個字被強制壓／拉到指定寬度，字型未載入時構圖也不跑位 | SVG 1.1 屬性，Chrome／Firefox／Safari 皆支援（resvg 亦正確渲染，本站以 resvg 0.4x 光柵化驗證 8 張封面）。 | 字型載入失敗退到 Arial Narrow／系統無襯線，寬度仍由 textLength 保證 |
| **Web Audio 合成＋lookahead 排程** | 簽名動效：25ms setInterval 預排 120ms 內的音符，時間全部以 `AudioContext.currentTime` 為準；swing 2:1（後半拍落在 2/3）；唱針位置依同一時鐘換算 | 方法依 web.dev〈A tale of two clocks〉（Chris Wilson）；AudioContext、OscillatorNode、BiquadFilterNode、DynamicsCompressorNode 皆 Baseline Widely available。必須使用者手勢啟動（按「放這張」）。 | 無 AudioContext：按鈕加 title 說明，封面與全部資訊照常 |
| **FNV-1a → mulberry32 決定性生成** | 同名同 Take 恆得同封面、同樂句、同目錄號；`?n=&t=` 可分享 | 純 JS | — |

**對應規則（版面即樂譜）**：字中心 x → 16 個搖擺八分音符之一（兩小節）；字中心 y → C 小調藍調音階 10 音（越高越高）；字級 → 力度（size/560，下限 .28）；同一格只留最重的字。第 3–4 小節升四度重奏。伴奏固定：三角波 walking bass（Cm7–Cm7–Fm7–Fm7）、高通噪音 ride（拍上＋2、4 拍後半）、腳踏鈸 2、4 拍。三位師傅＝三種領奏音色：鐵琴（正弦＋4×、10× 泛音＋5.6Hz 顫音）、弱音小號（鋸齒波＋共振低通掃頻）、鋼琴（三角波＋微失諧泛音）。

**效能實測**（jsdom 26，非真瀏覽器，僅供上限參考）：`compose()` 2000 次 17ms（每次 ≈0.009ms）；首頁含 11 張封面完整載入 126–132ms（jsdom 為慢速 DOM，真實瀏覽器預期顯著低於此）；換 Take（重排＋FLIP 起始）8ms。頁面大小：index 54KB、tracks 40KB、personnel 41KB、liner 42KB（≤350KB）。顆粒動畫刻意降到 8fps，只重繪單一照片區。

*查證來源：MDN feComponentTransfer（developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComponentTransfer）；web.dev/articles/audio-scheduling；Wikipedia〈Album covers of Blue Note Records〉、〈Reid Miles〉；Graham Marsh & Glyn Callingham《Blue Note: The Album Cover Art》1991。*
