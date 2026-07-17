---
name: road-marking-signage
description: A high-visibility "road-marking / traffic signage" style for driving schools, logistics, transport, road-safety and motoring brands, built on a signal-amber × asphalt-slate duotone, highway-gothic condensed type and monospaced instrument numerals, hard edges and lane-dash rules, isometric town illustration, a bottom instrument-dock nav, and an optional drive-to-navigate hub where arrow keys steer a car around a top-down road map.
---

# 交通路誌風・標線美學（Road-Marking Signage）

一套為駕訓、物流、運輸、道路安全、汽機車相關品牌設計的視覺語言。它借用馬路本身的語彙——安全號誌黃、瀝青板灰、標線白、斜紋警戒帶、車道虛線、三角錐、方向燈——把整個介面做成一段「路況」。核心體驗可以極大膽：首頁是一座能用方向鍵開車逛的俯視路網，導覽動作就是駕駛動作。

## 設計哲學

1. **介面即路況**：分隔線用車道虛線、警示用斜紋危險帶、狀態用號誌三色（綠可行／黃注意／紅停止）。使用者一眼就懂，因為這是每天在路上讀的語言。
2. **高可視、硬邊、去圓角**：交通標誌為了在高速下可讀，講究高對比、粗體、方正。全站幾乎不用圓角（車體與號誌燈例外）、不用模糊陰影，改用 2–3px 實線硬邊與硬位移陰影。
3. **儀表感的數字**：價格、時速、堂數、編號一律用等寬字，像儀表板與里程表。數字是這個風格的重要質感。
4. **雙色紀律（duotone）**：安全黃與瀝青灰是唯二主色，標線白與警示紅只當輔助與警示，不隨意加彩。底色是中性混凝土灰而非米白或純黑，避免落入紙感文青或深色沉穩的舒適區。
5. **破格但可用**：可以把首頁做成一台車來開，但底部儀表板永遠列著各頁直達鍵、建築本身即連結、手機給 D-pad、關動效時降級為純地圖。破格不等於難用。

## 色彩系統

| 用途 | Hex | 比例 |
|------|-----|------|
| 安全號誌黃（主色／CTA／重點） | `#E9B308` | 22% |
| 黃的深階（hover／副標數字） | `#B9860A` | 4% |
| 瀝青板灰（導覽／深底／文字） | `#2E373E` | 22% |
| 瀝青次階（卡片深底／HUD） | `#3A444C` | 6% |
| 混凝土灰（頁面底色） | `#C8CCCD` | 26% |
| 標線白（紙面／道路標線） | `#F3F1EA` | 14% |
| 警示朱紅（警告／報名／今日） | `#D8452B` | 5% |
| 極黑線（描邊／footer） | `#12181C` | 1% |

號誌狀態色（僅用於時段表等狀態）：可行綠底 `#eaf3ec`／字 `#256b44`；注意黃底 `#fff6df`／字 `#9a6a08`；額滿紅底 `#efe4e2`／字 `#a2564a`。

## 字體系統

- **標題／數字大字**：`Barlow Condensed`（600/700）——壓縮無襯線，接近高速公路標誌體，粗、方、窄，撐大到 clamp(32px,7vw,66px) 當頁面大標。
- **儀表／編號／標籤**：`DM Mono`（400/500）——等寬，用於時速、編號、車牌、時段、路標小字，`letter-spacing` 常設 .05–.14em。
- **內文**：`Noto Sans TC`（400/500/700），行高 1.6。
- 中文標題以 Barlow Condensed 為首選字族、Noto Sans TC 為 fallback，讓中英數字在同一行仍協調。
- 字級 scale：大標 32–66 / 區標 26–40 / 卡標 20–24 / 內文 14–15 / 儀表小字 11–13。

## 版面與網格

- 頁寬上限 1000–1120px 置中，左右 16px 安全邊。
- 頁首「masthead」：瀝青底＋標線白字＋底部 3px 安全黃線，左置車牌式代碼（`FG-2025`）＋品牌名＋右置說明（DM Mono）。
- 頁面最上方一條 12px 斜紋警戒帶 `repeating-linear-gradient(-45deg, asphalt 0 16px, amber 16px 32px)` 作為識別簽名。
- 卡片群用 2–3px 硬線分格（`gap` 用底線色填縫），不用陰影；需要陰影時用硬位移 `box-shadow:3px 3px 0 #12181C`。
- 區塊間用「車道虛線」分隔：`repeating-linear-gradient(90deg, asphalt 0 18px, transparent 18px 34px)` 的 3px 水平線。
- 對照表：thead 瀝青底、tbody th 淺灰、可行項用黃深階字。

## 元件配方

- **底部導覽 dock（nav 主形）**：`position:fixed;bottom:0`，瀝青底＋頂部 3px 安全黃線；左為方向盤 logo＋「起步」，中為各頁 DM Mono 連結（當前頁 `aria-current` 上安全黃底），右為兩個「儀表」gauge（檔位／時速或速限）。內容區 `padding-bottom:76px` 讓開。
- **按鈕 / CTA**：安全黃底、極黑 2.5px 邊、`box-shadow:3px 3px 0 #12181C`，Barlow Condensed 粗體，右接 `▸▸` 箭號；hover 位移 -1px。
- **號誌卡（course card）**：三欄「徽章｜內容｜價格」，徽章欄瀝青底放大字班別代碼（A/B/C），價格欄安全黃底放等寬價格。
- **表單**：white 底、極黑 2px 邊、5px 圓角（唯一容許的小圓角）；錯誤訊息用 DM Mono 朱紅，保留 min-height 避免跳動。
- **狀態格（時段表）**：號誌三色底，`box-shadow:inset 0 0 0 3px #12181C` 表示已選。
- **footer**：極黑底、標線白小標題、DM Mono 灰色連結，底部一行虛構聲明。

## 動效規則

- **點火開場**（boot-loader）：三顆警示燈依序點亮（每 520ms），文字換行「引擎冷卻檢查 → 油壓電瓶 → 煞車就緒」，點一下或按任意鍵發動並淡出（.6s）。
- **鍵盤駕駛**（signature，詳見下章）：`requestAnimationFrame` 迴圈，車體 `transform:translate()+rotate()`，大燈為 `radial-gradient` 錐形跟隨車頭。
- **方向燈提示**：車駛入建築鄰近圈時，該建築招牌 `@keyframes blink .7s steps(1)` 半透明閃爍，底部浮出「按 Enter 進入」提示（opacity .2s）。
- **hover**：CTA 硬位移；卡片招牌 `translateY(-3px)` 並轉安全黃底。
- **一律提供 `@media (prefers-reduced-motion: reduce)`**：關閉閃爍與點火動畫，駕駛保留（使用者主動操作），建築降級為純連結。

## 插畫與圖像風格

- 技法：**isometric 等角視圖**。以等角／俯視混合畫一座小鎮：瀝青路面（`#333d44`）、標線白虛線、安全黃屋頂的資訊建築、警示紅屋頂的報名建築、三角錐點綴。
- 建築用簡單多邊形堆疊（屋頂平行四邊形＋牆面矩形＋側面深階），窗戶用瀝青／天藍小塊，全部原創 SVG。
- 考驗場關卡（S 彎、倒車入庫、上坡坡道、繞錐）用等角平台＋黃／白線條表現。
- 人物徽章：圓頭＋方肩色塊＋髮型剪影，配安全黃／朱紅底，像證件照般規格化。
- **零外部圖片、零外部音檔**；僅允許 Google Fonts。所有圖像為 inline SVG。

## Logo 與 Favicon 設計指南

- **Logo**：瀝青圓角方塊內一枚安全黃「方向盤」（圓環＋十字＋中心點），十字中疊一組向上的前進雪佛龍（象徵一檔／前進）；右接 Barlow Condensed 中文名與 DM Mono 英文＋地名。
- **Favicon**：同一枚方向盤符號單獨成章，inline SVG data URI 寫在 `<head>`：瀝青圓角底、安全黃圓環十字與中心點。所有頁面共用同一枚。

## Do & Don't

**Do**
- 用號誌三色表達狀態、用車道虛線分隔、用斜紋帶警戒。
- 數字一律等寬字，撐出儀表感。
- 保持雙色紀律：黃＋灰為主，白／紅為輔。
- 破格互動一定配可用備援（dock 連結／建築即連結／D-pad／reduced-motion）。

**Don't**
- 不用紫藍漸層 hero、不用置中大標＋兩顆按鈕＋三張圓角卡片模板。
- 不用 emoji 當 icon（方向盤、警示、三角錐一律自繪 SVG）。
- 不用圓角卡片＋模糊陰影；改硬邊＋硬位移。
- 不放跑馬燈（本風格不需要捲動橫幅，斜紋帶已承擔識別）。
- 不用「EST. 19xx」年份徽章、不用「把 X 變成 Y」句式、不用 Lorem ipsum 與 AI 腔。

## 首創技術實作配方（鍵盤駕駛導覽 Drive-to-navigate）

讓「導覽＝駕駛」的最小可行做法：

1. **舞台**：一個 `position:relative` 的 `.stage`，內含一張俯視路網 `<svg viewBox>`（道路、車道虛線、建築、三角錐），與絕對定位的 `#car`、`.beam`（大燈）、`.hot`（建築招牌／連結）、`.prompt`（提示）、`.ignition`（點火遮罩）。
2. **車輛狀態**：`{x,y,a,v}`（座標、車頭角度、速度）。每幀：`↑/W` 加速、`↓/S` 倒車、放開則 `v*=0.94` 摩擦；`←→/AD` 轉向且轉幅隨速度縮放（停車不能原地轉）；`x+=cos(a)*v; y+=sin(a)*v`；撞邊界則 `v=0`。
3. **算繪**：`car.style.transform='translate('+(x-半)+'px,'+(y-半)+'px) rotate('+(a*180/PI+90)+'deg)'`（車圖朝上，故 +90°）；大燈同角度置於車頭前方。
4. **抵達判定**：每幀計算車心與各建築錨點（以 stage 寬高百分比定位）距離，小於 `min(w,h)*0.16` 即為 active，招牌閃爍並顯示「按 Enter 進入」；`Enter` → `location.href`。
5. **無障礙與備援**：`.hot` 本身是 `<a href>`（可點可 Tab）；偵測觸控則顯示 D-pad（▲◀▼▶＋Enter，`touchstart` 設旗標）；`prefers-reduced-motion` 時跳過點火動畫、提示改「已就緒」，駕駛仍可用但不強制。
6. **效能**：單一 `requestAnimationFrame` 迴圈、只改 transform（不觸發 reflow）；`resize` 時重算車位。此互動純 DOM/SVG，不需任何函式庫。

> 這套配方可移植到任何「移動即導覽」的破格站：把車換成人／太空船／購物車，把路網換成賣場／園區／星圖即可。核心是「使用者主動操作的連續空間 + 永遠存在的傳統備援」。

## 頁面骨架範例

```html
<div class="hazard"></div>
<header class="masthead">
  <span class="plate">FG-2025</span>
  <span class="cond">起步駕訓中心</span>
  <span class="tag">台中・烏日 ｜ 汽機車考照代訓</span>
</header>

<main>
  <section class="stage-wrap">
    <div class="stage" id="stage" tabindex="0">
      <svg class="map" viewBox="0 0 1000 620"><!-- 路網＋建築 --></svg>
      <a class="hot" href="courses.html" style="left:57.5%;top:14%">
        <span class="sign">課程與費用</span></a>
      <div class="beam" id="beam"></div>
      <div id="car"><svg viewBox="0 0 46 46"><!-- 車 --></svg></div>
      <div class="prompt" id="prompt"></div>
      <div class="ignition" id="ignition">轉動鑰匙 ▸ 按任意鍵</div>
    </div>
  </section>
</main>

<nav class="dock">
  <a class="dock-brand" href="index.html"><svg><!-- 方向盤 --></svg>起步</a>
  <div class="dock-links">
    <a href="index.html" aria-current="page">路網首頁</a>
    <a href="courses.html">課程與費用</a>
    <a href="enroll.html">報名排課</a>
  </div>
  <div class="dock-hud">
    <div class="gauge"><b id="hudSpeed">0</b><span>KM/H</span></div>
  </div>
</nav>
```

CSS 關鍵片段：

```css
:root{--amber:#E9B308;--asphalt:#2E373E;--concrete:#C8CCCD;--paint:#F3F1EA;--red:#D8452B;--line:#12181C}
.hazard{height:12px;background:repeating-linear-gradient(-45deg,var(--asphalt) 0 16px,var(--amber) 16px 32px)}
.cta{background:var(--amber);border:2.5px solid var(--line);box-shadow:3px 3px 0 var(--line);font-family:"Barlow Condensed"}
.dock{position:fixed;bottom:0;left:0;right:0;background:var(--asphalt);border-top:3px solid var(--amber)}
```
