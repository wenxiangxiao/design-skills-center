---
name: city-pop-airbrush-nagai
description: 1980s Japanese City Pop record-sleeve illustration (Hiroshi Nagai half) — airbrushed gradient skies, razor-edged flat colour with zero outlines, cool blue-violet hard shadows cast by one sun, empty pools, palms and white modernist walls in a square 12-inch frame, with small light tracked-out type in the corners.
---

# City Pop 唱片封面插畫・永井博半身 SKILL

## 設計哲學

City Pop 插畫是 1980 年代日本唱片封套與 FM 雜誌封面的視覺語言。代表人物：**永井博 Hiroshi Nagai**（1947–）——1978 年 CBS/Sony 出版插畫集《A Long Vacation》，其中一幅被大瀧詠一用作 1981 年同名專輯封面；**鈴木英人 Eizin Suzuki**（1948–）——山下達郎《FOR YOU》（1982）封面與《FM STATION》雜誌封面；以及漫畫家わたせせいぞう（《ハートカクテル》1983–89）。源頭是美國西岸：David Hockney 的泳池畫（〈A Bigger Splash〉1967）、Edward Hopper 的空景與照相寫實主義。

它長成這樣是因為製作方式：**噴槍（airbrush）＋遮蓋膜**。噴槍噴出的天空是無筆觸的平滑漸層；遮蓋膜切出的物件邊緣是刀切的直線；壓克力平塗沒有排線與紋理。印刷上它是四色分色的商業插畫，所以顏色乾淨、飽和、沒有紙紋。題材上它是**一個特定時刻的光**：午後、日落、入夜——沒有人在場，只有人剛離開的泳池與躺椅。

本 SKILL 取**永井博半身**：無描邊平塗。鈴木英人半身（細墨線輪廓＋網點陰影）不在此規格內。

一句話：**天空是唯一的漸層，影子是唯一的情緒，畫面裡沒有人。**

## 色彩系統

全部為不透明平色。天空與水面依太陽高度在下列錨點之間插值（每個值都是實色）。

| 角色 | 正午 | 午後 | 日落 | 入夜 | 比例 |
|---|---|---|---|---|---|
| 天頂 skyT | `#0F7ECE` | `#1584D4` | `#3559B4` | `#0A1238` | 天空 30–45% |
| 地平線 skyH | `#BDE7F3` | `#C9ECF2` | `#F59A6A` | `#232A6A` | （同上，漸層） |
| 受光白牆 wall | `#F9F7F1` | `#F8F5EE` | `#F8C9A4`（杏桃） | `#353C78` | 20–30% |
| 影子 shd（牆面） | `#5F70C2` | `#6272C0` | `#6E5EA8`（偏紫） | — | 8–15% |
| 地面影子 gshd | `#8C84C4` | `#8C82C0` | `#7A63A6` | — | |
| 地面 gnd | `#EFE0D2` | `#EEDCCB` | `#EFB79A` | `#2A2D63` | 15–25% |
| 泳池水 water | `#13B8CF` | `#16B3CC` | `#2C8FBE` | `#1C3770` | ≤12% |
| 水中影子 wshd | `#1670AC` | `#1A70AA` | `#2D5A9C` | — | |
| 玻璃 glass | `#22346C` | `#22346C` | `#2B3A78` | `#F4C04E`（亮燈） | |
| 椰葉 leaf / leaf2 | `#10563F` / `#2C8E5E` | | `#14473E` / `#1F6150` | `#0D2A3A` | ≤10% |
| 珊瑚（布、強調） | `#EF5B3C` | | | | ≤6% |
| 墨（文字） | `#1C2A4A` | | | | 只在白牆區塊上 |

規則：**影子永遠是冷藍紫色，絕不是灰或半透明黑**；同一畫面所有影子同一顏色、同一方向。日落時白牆變杏桃、影子轉紫；入夜窗子變成黃色實塊。

## 字體系統

- 英文：**Josefin Sans**（Google Fonts）300／400／600——幾何、細、帶 1930s 復古比例。全大寫、`letter-spacing:.28em`（時刻數字 `.08em`）。
- 中文：**Noto Sans TC** 300／400／500。內文 300，標題也只用 300。**全站不出現 700 以上字重。**
- 字級 scale：封面角落 12px／時刻 22–40px（`clamp(22px,3vw,40px)`）／頁面標題 26–36px／內文 15px／註記 12px。行高 1.75（中）、1.35（標題）。
- 數字不用等寬體，用 Josefin Sans 400 的比例數字。

## 版面與網格

- **主圖一律正方形**（12 吋唱片封套比例 1:1），`aspect-ratio:1/1`，桌機放左側 sticky、文字欄 380px 在右；手機正方形置頂 sticky、文字從下方捲入。
- 地平線低於畫面中線（天空 ≥40%），建築正面朝觀者、以斜投影（oblique：`X=x+z·0.22`、`Y=−y+z·0.3`）帶出一點頂面與側面——不用透視消失點。
- 頁面底色就是天空（`body::before` fixed 漸層）；文字放在「白牆區塊」上：`#F8F5EE` 實色、零圓角、帶太陽方向的硬影。
- 旋轉角度：0。所有東西都是正的；唯一的斜線是影子與棚的斜度。
- 留白：區塊之間 28–56px，白牆內距 22–30px。

## 元件配方

**白牆區塊（卡片）**
```css
.slab{background:#F8F5EE;box-shadow:var(--sx) var(--sy) 0 var(--shd)} /* --sx/--sy 由太陽算出，0 模糊 */
```
**導覽：帆布垂邊（valance-flap）**——頂部四片布，下緣以 mask 切成扇貝，現用頁垂得最長；整條導覽的影子方向＝此刻太陽。
```css
.valance{position:fixed;top:0;inset-inline:0;display:flex;filter:drop-shadow(var(--sx) var(--sy) 0 var(--shd))}
.valance a{flex:1;height:50px;background:var(--fabric);
 mask:linear-gradient(#000 0 0) top/100% calc(100% - 12px) no-repeat,
      radial-gradient(circle at 50% 0,#000 11.5px,transparent 12px) bottom left/24px 12px repeat-x}
.valance a[aria-current=page]{height:68px}
.valance .tag{background:#F8F5EE;color:#1C2A4A;padding:3px 10px} /* 縫上去的布標 */
```
**按鈕**：`#1C2A4A` 實底、Josefin 400 大寫 12px、hover 變珊瑚 `#EF5B3C`；次按鈕為 1px 內框。零圓角、零模糊陰影。
**表單**：原生 range，`accent-color:#EF5B3C`；數值以 `<output>` Josefin 顯示；錯誤狀態整條變珊瑚底白字。
**封面字**：畫面角落、白色、小：左上品牌（Josefin 300 `.5em` 字距），右上時刻（`PM 3:12` 40px 細體）。字永遠不壓在主體物上。
**頁尾**：一塊白牆，三欄（logo＋地址／營業時間／索引），底列一行「此刻太陽」資訊。

## 動效規則

| 種類 | 內容 | 觸發 | 時長／緩動 |
|---|---|---|---|
| ambient | 天色、牆色與全部影子跟著真實太陽走（每 30 s 更新，`@property` 讓顏色與陰影位移補間）；雲向左漂、椰葉擺、池面光紋左右晃 | 時間 | 色彩 1.8 s linear；雲 150 s linear；椰葉 7–9 s ease-in-out alternate；光紋 5.5 s |
| input | 首頁捲動＝時間（scroll-driven `--hour`）；hover 棚子會被風吹鼓（scaleY 1.06 + skewX）；遮陰挑戰拖棚子前緣 | scroll／pointer | 捲動即時；billow .9 s `cubic-bezier(.3,1.4,.5,1)` |
| transition | 換頁時一片扇貝邊的條紋帆布從上方放下蓋住畫面，新頁再把它捲上去 | 點內部連結 | 下 480 ms `cubic-bezier(.55,0,.3,1)`；上 640 ms `cubic-bezier(.6,0,.25,1)` |
| signature | **透光條紋影**：棚下的影子帶著布的顏色，一條一條隨太陽掃過牆與地；遮陰挑戰把兩小時快轉成 6 秒 | 時間／按鈕 | 6000 ms linear |

`prefers-reduced-motion: reduce`：雲、椰葉、光紋、billow、帆布轉場全部停用；顏色不補間直接到位；快轉直接給 15:00 的結果與完整數字（資訊零損失）。捲動對應時間仍保留（使用者直接操作，不是自動動畫）。

## 插畫與圖像風格

- 技法：`airbrush-flat 噴槍平塗`——物件全部是無描邊的平色多邊形；漸層只允許出現在天空（垂直兩色）。
- 母題清單：白色方盒現代建築、條紋遮陽棚（扇貝垂邊）、長方形泳池＋白色池緣＋兩支不鏽鋼扶梯、椰子樹（梯形樹幹＋鋸齒羽狀葉）、躺椅、玻璃窗上一道斜向反光帶、遠方一條海平線、積雲（橢圓聯集、平白）。
- 影子是畫的主角：用一顆太陽把每個物件的頂點投到地面（y=0）與牆面（z=0）兩個平面，裁切後以單一影子色填滿。
- 不畫人。人只以「剛離開」的痕跡存在：空躺椅、三張空桌。

## Logo 與 Favicon 設計指南

- 圖記：64×64 正方形——天空藍 `#1584D4` 上一面紅白條紋棚（六條、下緣半圓扇貝）、墨色安裝橫桿、下方暖白牆 `#F3E7D8` 上一塊藍紫平行四邊形影子 `#6272C0`。
- 字標：`HO-JIT` Josefin Sans 300、字距 9；副標 `CANVAS & AWNING` 400、字距 7.5；珊瑚細線分隔；中文「好日帆布行 · 高雄鼓山」Noto Sans TC 300。
- Favicon 即圖記，inline SVG data URI。

## Do & Don't

**Do**
- 讓天空佔大面積，且是畫面裡唯一的漸層。
- 所有影子同色同向、邊緣銳利；牆面與地面分別投影。
- 主圖用正方形；字小、細、貼角。
- 讓場景有明確時刻（午後、日落、入夜各有色盤）。

**Don't**
- 不描邊、不排線、不加紙紋或顆粒、不用 `filter:blur` 或模糊陰影。
- 影子不用灰色或 `rgba(0,0,0,.x)`；透光效果用預混的不透明色。
- 不放人物、不放照片、不用 emoji 當圖示。
- 不用粗體標題、不用置中大標＋兩顆按鈕＋三張圓角卡片、不用紫藍漸層 hero（天空漸層是藍到淺青／杏桃，且只在畫面裡）。
- 不寫「EST. 19xx」徽章；年份寫進敘事。
- 不重製任何既有唱片封面構圖。

## 頁面骨架範例

```html
<nav class="valance" aria-label="主選單">
  <a href="index.html" aria-current="page"><span class="tag">曬一天<span class="en">A Day</span></span></a>
  <a href="fabrics.html"><span class="tag">布樣簿<span class="en">Swatches</span></span></a>
</nav>
<main class="wrap">
  <div class="stage">
    <div class="frame slab">
      <svg class="scene" viewBox="0 0 1000 1000"><!-- 天空漸層 rect／平色建築／影子群組 --></svg>
      <div class="cov tl"><b>HO-JIT</b>CANVAS &amp; AWNING</div>
      <div class="cov tr"><b>PM 3:12</b><span>太陽 35° · 西南</span></div>
    </div>
  </div>
  <div class="hours">
    <article class="slab"><p class="en">PM 2:00</p><h2>粉紅色的影子</h2><p>…</p></article>
  </div>
</main>
```

## 本風格的 5 個不可省略特徵

**1. 噴槍天空：天空是唯一的漸層**——垂直兩色、無紋理，天頂深、地平線淺；地平線以下零漸層。
```svg
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#1584D4"/><stop offset="1" stop-color="#C9ECF2"/>
</linearGradient>
<rect width="1000" height="446" fill="url(#sky)"/>
```

**2. 平塗硬邊、零描邊**——每個物件只是填色多邊形；面與面之間靠顏色差分開，不靠線。
```svg
<polygon points="226,388 679,388 679,690 226,690" fill="#F8F5EE"/>  <!-- 受光正面 -->
<polygon points="185,370 226,388 226,690 185,672" fill="#6878C4"/>  <!-- 背光側面 -->
```

**3. 刀切藍影：一顆太陽、一種冷藍紫**——影子是不透明的藍紫平色，邊緣銳利，全部平行。投影公式（太陽方向 s，點 P）：
```js
const toGround=(P,s)=>{const t=P[1]/s[1];return [P[0]-s[0]*t,0,P[2]-s[2]*t];};
const toWall  =(P,s)=>{const t=P[2]/s[2];return [P[0]-s[0]*t,P[1]-s[1]*t,0];};
// 投影後以 Sutherland–Hodgman 裁掉 z<0（地面）與 y<0（牆面），填 #6272C0
```
```css
.slab{box-shadow:var(--sx) var(--sy) 0 #6272C0} /* 頁面元件也用同一顆太陽，0 模糊 */
```

**4. 空景＋正方形構圖**——無人物；白牆、泳池、椰子、條紋棚、空躺椅；主圖 1:1，地平線低、天空 ≥40%。
```css
.frame{aspect-ratio:1/1;width:min(calc(100vh - 170px),100%)}
```

**5. 字小而輕、貼角**——Josefin Sans 300 大寫寬字距＋Noto Sans TC 300，白色或墨色，永不蓋住主體。
```css
.cov{position:absolute;color:#fff}
.cov.tl{left:22px;top:20px;font:300 12px 'Josefin Sans';letter-spacing:.5em;text-transform:uppercase}
.cov.tr{right:22px;top:20px;font:300 clamp(22px,3vw,40px)/1 'Josefin Sans';letter-spacing:.08em}
```

## 技術實作與相容性

### 1. CSS scroll-driven animations＋`@property`（B 動效與時間軸層）
首頁 `html{animation:hour linear both;animation-timeline:scroll(root block)}` 把 `--hour`（`@property` 註冊為 `<number>`，6.5→19.5）綁在整頁捲動上；時刻尺的紅點 `left:calc((var(--hour) - 6.5)/13*100%)` 純 CSS 跟著走；JS 每幀讀 `getComputedStyle(root).getPropertyValue('--hour')` 交給投影引擎。時刻卡以 `animation-timeline:view()` 做「布從上捲下」的 clip-path 揭示。`@property` 另用於 `--skyT/--skyH/--shd`（`<color>`）與 `--sx/--sy`（`<length>`），讓真實時間每 30 秒更新時能補間。
- 支援現況：caniuse〈animation-timeline: scroll()〉——Chrome／Edge 115+、Safari 26.0+（2025-09）支援；**Firefox 至 154 仍為預設關閉**（`layout.css.scroll-driven-animations.enabled`）。`@property` 為 Baseline 2024（Firefox 128 起）。查證來源：caniuse.com/mdn-css_properties_animation-timeline_scroll、MDN〈Scroll-driven animation timelines〉。
- Fallback：以 `CSS.supports('animation-timeline','scroll()')` 偵測；不支援時 JS 依 `scrollY/(scrollHeight−innerHeight)` 算出 hour 並寫回 inline `--hour`，畫面行為一致；時刻卡直接顯示（無揭示）。無 JS：場景為建置時預先算好的 15:00 靜態 SVG，時刻卡依序排列。

### 2. NOAA 太陽位置演算（E 資料與生成層）
依 NOAA GML〈General Solar Position Calculations〉（gml.noaa.gov/grad/solcalc/solareqns.PDF）：分數年 γ → 均時差與赤緯（三角級數）→ 真太陽時 → 時角 → 天頂角與方位角（atan2 形式）。店址 22.6273°N、120.2734°E、UTC+8、店面朝向 215°。日出日落取天頂 90.833°，以二分法求解；「太陽照到店面」為太陽向量在牆法線上的分量轉正的那一分鐘。實測 2026-10-08：日出 05:52、正午 11:46（高度 61.8°）、日落 17:40（未逐筆比對官方日出日落表，僅作示意）。
- 投影：+x＝方位 125°、+z＝方位 215°（牆法線），`s=[cos e·cos(A−125), sin e, cos e·cos(A−215)]`；物件頂點投到地面與牆面，Sutherland–Hodgman 單平面裁切；盒體影子取地面投影的凸包。
- 透光帆布：每一條紋的影子色＝`mix(影子色, 布色, min(.42, 透光率×3.2))`，輸出不透明 hex。

### 3. CSS mask-image 扇貝幾何（A 渲染層）
導覽垂邊與換頁帆布的扇貝下緣都是兩層 mask：一層矩形＋一層 `radial-gradient` 半圓 `repeat-x`。Baseline 2023（Chrome 120、Firefox 53、Safari 15.4 無前綴；本站同時寫 `-webkit-mask`）。不支援時為直邊布條，功能不變。

### 效能實測
- 單頁大小：index 95.6 KB、fabrics 208.6 KB（八格靜態預渲染 SVG）、shade 82.7 KB、shop 91.6 KB，皆 <350 KB（含 inline CSS/JS/SVG；字型另載）。
- 首頁一幀（太陽位置＋色盤＋約 80 個影子多邊形字串）Node 實測 0.17 ms；加上四個群組 innerHTML 更新，預估 <2 ms，只在 hour 變動 >0.004 h 時重繪。
- 遮陰挑戰師傅解：455 組參數 × 60 個時刻 × 3 桌，Node 實測 24 ms，只在快轉結束時算一次。
- 首屏 JS：建場景字串 0.6 ms＋第一幀，遠低於 100 ms。
