---
name: wayfinding-signage
description: A dark transit-signage design language built from color-coded plates, hard-edged arrows, stencil-sprayed graphics and monospaced codes, where information architecture is the layout itself.
---

# 導視系統・場館指標風（Wayfinding Signage）

這套語言來自機場、捷運站與體育場館的指標系統：深色底、色塊指標牌、指向箭頭、色碼帶、編號與代碼。它的核心信念是——**版面不是用來裝飾資訊的，版面就是資訊架構本身**。使用者不需要讀完一段文案才知道自己在哪，看牌子的顏色與方向就知道。

適用於任何「有分區、有等級、有動線」的產業：運動場館、展場、園區、物流、實驗室、醫院、交通、大型活動、資料儀表板。

## 設計哲學

1. **色碼先於文字。** 每一個分類都先被指派一個顏色，顏色一經指派就在全站貫徹：膠囊標籤、色帶、圖表長條、地圖區塊都用同一組。使用者最終會靠顏色導航，而不是靠讀。
2. **牌子是實體，不是卡片。** 標題塊是一面掛在牆上的牌子：實心色塊、零圓角、一側有一道粗封邊（8px）作為方向暗示。它不飄浮、不打模糊陰影。
3. **沒有裝飾性的 hero。** 首屏直接給使用者最有用的東西——地圖、清單、工作台。大標題留給牌子，字級不超過 40px。
4. **編號與代碼是排版元素。** `01` `A` `V3` `GS-260718-142` 這類短代碼以等寬字排在角落與側欄，撐起整體的「系統感」。
5. **線是硬的。** 分隔一律 1px 或 3px 實線，沒有漸層邊界、沒有柔和過渡。

## 色彩系統

**結構色（占 88%）**

| 用途 | 色票 | 比例 |
|------|------|------|
| 頁底 ink | `#101418` | 約 60% |
| 面板 slate | `#1A2128` | 約 20% |
| 面板次層 slate2 | `#232C35` | 約 8% |
| 分隔線 line | `#313C46` | 線條 |
| 主文字 chalk | `#E9E7E0` | 文字 |
| 次文字 grey | `#8A939C` | 說明文、代碼 |

**識別色（占 12%，只在牌子、按鈕、強調處出現）**

| 用途 | 色票 |
|------|------|
| 指標藍 sign（主要牌面、連結、聚焦狀態） | `#2D8CFF` |
| 標線橘 mark（封邊、CTA、動線箭頭、警示） | `#FF6A13` |

**分類色碼（依專案語意指派，本例為難度）**

`#E9E7E0` → `#FFD400` → `#38C46B` → `#2D8CFF` → `#FF3B30` → `#9B5CFF` → `#0B0E11`

七階色碼須全站一致。最深的一階（黑）在深色底上必須補 `inset 0 0 0 1px #5b6670` 的內描邊與淺色文字，否則不可辨識。

**禁止**：紫藍漸層、任何 `linear-gradient` 當背景、半透明毛玻璃、彩色陰影。

## 字體系統

Google Fonts 三支，不多不少：

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&family=Noto+Sans+TC:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
```

- **Archivo 800/900** — 英文標題、牌面字、數字、按鈕。`letter-spacing:-.01em`（標題）／`.16em–.34em`（全大寫標籤）。
- **Noto Sans TC 400/700/900** — 中文全部。標題 900、內文 400、強調 700。
- **Roboto Mono 400/700** — 代碼、編號、metadata、表格註解、狀態列。字級固定在 10.5–12.5px。

字級 scale：`52 / 40 / 34 / 30 / 26 / 20 / 15 / 13.5 / 12.5 / 11`（px）。內文行高 1.7–1.8，標題行高 1.1。**標題不做大跳級**：牌面 34–40px 就是全站最大的文字，其餘一律 30px 以下。

## 版面與網格

- **色碼直帶（spine）**：`position:fixed` 左側 78px 直欄，`background:slate`，右邊界 `3px solid mark`。內含（上）導覽觸發鈕、（中）直排品牌字 `writing-mode:vertical-rl`、（下）七格色碼方塊。主要內容 `margin-left:78px`。
- 手機（≤700px）將 spine 轉為 58px 頂欄：`flex-direction:row`，用 `order` 重排三個元件，`--rail` 設為 `0px`。
- **不對稱**：主標區採 `grid-template-columns:auto 1fr`，牌子靠左、說明文貼底對齊（`align-items:end`）。內容最大寬 1180–1400px，永遠靠左，不置中。
- **面板拼接法**：多個區塊用 `display:grid; gap:2px; background:var(--line); border:3px solid var(--line)`，每個子項自己填 `background:var(--slate)`——縫隙即是分隔線，不需要各自畫 border。這是本風格最主要的版面手法。
- 章節間距 `padding:56px 0; border-top:1px solid var(--line)`。
- **零圓角**，唯一例外是分類色碼膠囊 `border-radius:999px`。

## 元件配方

**牌子 plate（標題）**
```css
.plate{background:var(--sign);color:#fff;padding:14px 22px 16px;border-left:8px solid var(--mark)}
.plate .t1{font-family:var(--f-tc);font-weight:900;font-size:40px;line-height:1}
.plate .t2{font-family:var(--f-sign);font-weight:800;font-size:12.5px;letter-spacing:.32em;margin-top:6px}
```

**全螢幕指標板 nav（hamburger-full）**：`position:fixed;inset:0`，每個目的地一列 `grid-template-columns:64px 1fr auto`：左為指向色塊（`clip-path:polygon(0 0,66% 0,100% 50%,66% 100%,0 100%,34% 50%)` 的雙向箭頭塊）、中為中文 26px＋英文 11px 字距 .24em、右為等寬說明。當前頁用 `aria-current="page"` 把箭頭塊改成橘色。Esc 關閉、開啟時焦點移到關閉鈕。

**按鈕**
```css
.btn{background:var(--mark);color:#101418;font-family:var(--f-sign);font-weight:800;
     letter-spacing:.14em;font-size:14px;padding:15px 26px;border:0}
.btn:hover{background:var(--chalk)}          /* 不位移、不放大，只換色 */
.chip{background:none;border:1px solid var(--line);font-family:var(--f-mono);
      font-size:12px;padding:6px 12px}
.chip[aria-pressed="true"]{background:var(--sign);border-color:var(--sign);color:#fff}
```

**表單**：`background:var(--ink); border:1px solid var(--line)`，聚焦時 `outline:2px solid var(--sign); outline-offset:-1px`。label 用等寬 11px 字距 .1em 灰色。錯誤訊息用等寬 11px `#FF3B30`，預留 `min-height:17px` 避免版面跳動。

**表格**：`border:3px solid var(--line)`，`thead` 用 slate2 + Archivo 11.5px 字距 .16em，價格欄 `class="p"` 用 Archivo 800 19px 標線橘，附屬英文代碼用 `<small>` 灰色等寬。

**footer**：`border-top:3px solid var(--mark)`，`grid-template-columns:1.4fr 1fr 1fr`，欄標題用 Archivo 11px 字距 .24em。頁尾之上再壓一條七格色碼帶（高 9px、`display:flex`、每格 `flex:1`）。

## 動效規則

克制是這個風格的一部分——指標系統不會動個不停。

| 對象 | 觸發 | 值 |
|------|------|-----|
| 分區／卡片 hover | `:hover` `:focus` | `fill/background` `.16s linear`，只換色不位移 |
| 圖表長條 | 資料變更 | `height .25s cubic-bezier(.2,.7,.3,1)` |
| 摺疊箭頭 | `details[open]` | `transform:rotate(90deg) .15s linear` |
| 主體互動動畫（如姿勢內插） | 使用者操作 | `420ms`，`easeInOutQuad`：`k<.5 ? 2k² : 1-(-2k+2)²/2` |

**禁止**：進場 fade-in／揭示、數字滾動計數、按壓硬位移陰影、`stroke-dashoffset` 描繪、跑馬燈。
`@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`，並讓所有以動畫呈現的資訊都有等值的文字或靜態版本。

## 插畫與圖像風格（illust = stencil-spray 噴模鏤空）

一律 SVG，零外部圖片。作法三步：

1. **實心色塊**：物件先畫成單一填色的幾何形，不描邊。
2. **鏤空橋接**：在色塊上疊 `fill:var(--ink)` 的細長矩形或粗筆畫，模擬噴漆模板必須保留的連接橋（例如水槽點中央的一道弧、指扣點上緣的一條缺口）。
3. **噴霧毛邊**：整組套用位移濾鏡。

```html
<filter id="sp" x="-25%" y="-25%" width="150%" height="150%">
  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```
`scale` 建議 1.8–3：小圖用 3，大面積色塊用 2 以內，否則邊緣會爛掉。

**圖標**：24×24 viewBox、`stroke-width:2–2.6`、圓端點、單色（用分類色碼）。三角驚嘆號、圓圈驚嘆號、方框十字這類公共標誌語彙優先。**絕不用 emoji**。

**地圖／平面圖**：底鋪 `<pattern>` 點紋（16×16，兩顆 1px 點）模擬防滑軟墊；分區為不規則多邊形（帶切角或 L 形，不要一排等寬方塊）；動線用虛線＋`<marker>` 箭頭；設施方塊用 slate 填色＋1px 描邊，與可互動分區在視覺上分開。

## Logo 與 Favicon 設計指南

**Logo**：一面指標牌。藍底矩形、左側 12px 橘色封邊、白色符號在左、字標在右（中文 900 大字 + 英文兩行 Archivo 800，第二行壓深藍 `#0E2E56` 做層次），底部壓七格分類色碼帶。符號取產業最單純的幾何原型（本例：向上箭頭＝路線方向，三顆點＝岩點），套噴模濾鏡。

**Favicon**（inline SVG data URI，寫在 `<head>`）：
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23101418'/%3E%3Cpath d='M12 40 L32 18 L52 40 L43 40 L32 28 L21 40 Z' fill='%232D8CFF'/%3E%3Ccircle cx='32' cy='48' r='6' fill='%23FF6A13'/%3E%3C/svg%3E">
```

## Do & Don't

**Do**
- 先定義色碼表，再開始畫任何東西
- 每個頁面第一屏就給可操作／可查詢的實體（地圖、清單、工作台）
- 用 2px 縫隙的 grid 拼接面板，讓分隔線由背景色擔任
- 用等寬字排編號、代碼、狀態、單位
- 資訊列（狀態帶）用 `role="status"` 並讓內容真的隨情境改變
- 互動元素同時支援滑鼠、鍵盤（`tabindex` + Enter/Space）與觸控（`touch-action:none`）

**Don't**
- 不要紫藍漸層 hero、不要置中大標＋副標＋兩顆按鈕＋三張圓角卡
- 不要 emoji 當圖標、不要 Lorem ipsum、不要「在當今快節奏的世界」式文案
- 不要 rounded-2xl＋模糊陰影卡片；本風格只有一種圓角，就是色碼膠囊
- 不要在深色底放純黑分類色而不加內描邊
- 不要用跑馬燈、揭示進場、數字計數當作動效主角
- 不要把品牌故事寫成形容詞堆疊，寫具體的：角度、公尺數、價格、營業時間、人名

## 頁面骨架範例

```html
<body>
<a class="skip" href="#main">跳至內容</a>

<nav class="spine" aria-label="場館指標">
  <button class="sig" id="sigBtn" aria-expanded="false" aria-controls="board">☰ 指標</button>
  <a class="brandv" href="index.html">BRAND ・ 品牌</a>
  <div class="codes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
</nav>

<div class="board" id="board" role="dialog" aria-modal="true" aria-label="指標板">
  <div class="bhead"><b>DIRECTORY</b><button class="bclose" id="bClose">關閉 ✕</button></div>
  <a class="dest" href="index.html" aria-current="page">
    <span class="ar"></span>
    <span><span class="zh">路網圖</span><span class="en">STATION MAP</span></span>
    <span class="no">B1 ／ 全場六區</span>
  </a>
  <!-- 其餘目的地 -->
</div>

<main id="main">
  <div class="status" role="status">
    <div>今日 <b>12:00–23:00</b></div><div>在牆路線 <b>119</b></div>
  </div>

  <div class="namebar">
    <div class="plate"><div class="t1">岩站</div><div class="t2">GRIP STATION ／ 內湖 B1</div></div>
    <p>一句具體的說明，含數字與地點，不含形容詞堆疊。</p>
  </div>

  <div class="mapwrap"><div class="mapbox"><svg viewBox="0 0 900 540">…</svg></div>
    <aside class="panel" aria-live="polite">…即時換內容的側欄…</aside>
  </div>

  <div class="key">
    <div class="kt">分類色碼 CODE</div>
    <div class="kc"><i style="background:var(--g0)"></i>V0 白</div>
    <!-- … -->
  </div>
</main>

<div class="bandline"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
<footer>…三欄＋跨欄註記…</footer>
</body>
```

---

## 第五章・首創技術實作配方：拖曳式路線設定器 ＋ 自動 beta 求解

這一章是本站認領的全館首創。它的通則是：**讓使用者拖曳建立內容，系統再對這份內容做規則演算並用一個人物角色演示結果。** 可移植到任何「配置 → 評估 → 演示」的題目（廚房動線、貨櫃堆疊、球場戰術、電路布線、舞蹈編排）。

### 一、座標與單位

以 SVG viewBox 當工作座標，並與現實單位掛勾，讓演算結果能講人話：

```js
var W=620,H=780,SNAP=20,CM=0.5;   // 1 unit = 0.5 cm → 牆面 3.1m × 3.9m
```
所有座標 `Math.round(v/SNAP)*SNAP` 對齊網格；上下各留一條保護帶（頂部標題帶、底部起攀線）不可放置。

### 二、拖放（pointer events，滑鼠／觸控／筆一套搞定）

```js
function toWall(cx,cy){                    // 螢幕座標 → viewBox 座標
  var r=wall.getBoundingClientRect();
  return {x:(cx-r.left)/r.width*W, y:(cy-r.top)/r.height*H};
}
```
三個進入點，共用同一個 `drag` 狀態：

1. **從工具盤拖出**：`tray` 的 `pointerdown` 立刻在游標處建立一個新物件並進入 `drag`（`fresh:true`）。若 `pointerup` 時仍落在禁區，就撤銷。這比 HTML5 drag-and-drop 可靠，且觸控可用。
2. **拖動既有物件**：`wall` 的 `pointerdown` 命中 `.hd` 時記錄 `dx/dy` 偏移量。
3. **空白處點擊**：直接以「目前選定種類」放置一顆。

`pointermove` / `pointerup` 綁在 `document` 上（不是 SVG），避免游標移出元素就斷線。SVG 與工具盤都要 `touch-action:none`，否則行動裝置會被捲動搶走手勢。每顆物件額外疊一個 `r>=28` 的透明命中圈，確保手指點得到。

### 三、規則演算（把設計知識寫成一條式子）

```js
score = avgHoldDifficulty*1.15          // 材料難度
      + (avgSpan/190)*1.5               // 平均間距
      + (maxSpan/260)*1.3               // 最遠一步
      + footPenalty                     // 支撐點稀疏度：ratio<0.7 時 (0.7-ratio)*1.6
      + ANGLE_ADD[angle];               // 環境係數 {90:0, 75:.3, 55:1.2, 35:2.0}
grade = clamp(Math.round(score)-2, 0, 10);
```
**環境係數要用加法不要用乘法**——乘法會讓高難度輸入被放大到爆表。常數請用三、四組已知答案的範例反推校準（本站以「全大水槽垂直牆＝V0–V1、圓弧點斜板＝V3、指扣點洞穴＝V6」三點定標）。

同時輸出**定性評語**：把幾個判準轉成短句陣列（`手點數 ≥11 → 長線` `maxSpan > 動態門檻 → 含大動態` `avgD ≥2.8 → 指力吃重`），用「・」串起來。數字給專業使用者，短句給新手。

### 四、序列求解（beta solver）

```
1. 物件依高度排序，最低兩個為起始狀態
2. 每一步：選「較低的那隻手」移動到下一個目標（同高則選離目標較近者）
3. 每次移動後重挑支撐點：取重心目標高度 hy+215 附近、且低於雙手 70 以上的候選，
   依 |y-want| 排序取前四，再依 x 分左右；不足兩個則以「摩擦踩點」補位
4. 步距 > 門檻 → 標記為動態；介於中間 → 標記為長手
5. 最終追加一個「雙手上終點」的完成姿勢
```
每一步存成完整姿勢快照 `{LH,RH,LF,RF}`，動畫時只需在快照之間內插——不要在動畫迴圈裡重算邏輯。

### 五、人體：兩節反向運動學（IK）

```js
function ik(ax,ay,bx,by,l1,l2,sgn){          // A=根關節 B=末端 → 回傳中間關節
  var dx=bx-ax,dy=by-ay,d=Math.min(Math.hypot(dx,dy),l1+l2-0.01)||0.001;
  var a=(l1*l1-l2*l2+d*d)/(2*d), h=Math.sqrt(Math.max(0,l1*l1-a*a));
  var ux=dx/Math.hypot(dx,dy), uy=dy/Math.hypot(dx,dy);
  return {x:ax+ux*a-uy*h*sgn, y:ay+uy*a+ux*h*sgn};   // sgn 決定肘/膝往哪邊彎
}
```
軀幹用三次鬆弛求解：肩心先放在雙手中點下方 82，髖心放在雙腳中點上方 118，反覆「夾到四肢可及範圍內 → 把肩髖距離校正回軀幹長度」。骨架建議比例（單位同上）：上臂 62、前臂 62、大腿 78、小腿 78、軀幹 104、肩寬 42、髖寬 32、頭半徑 19。左右手肘 `sgn` 相反，膝亦然，姿勢才會外張而不打結。

### 六、動畫與可及性

```js
var e = k<0.5 ? 2*k*k : 1-Math.pow(-2*k+2,2)/2;   // easeInOutQuad, 420ms/步
pose = lerpPose(from, to, e);
```
`prefers-reduced-motion` 時**跳過內插直接切換姿勢**，並保留完整的文字分解動作清單（每一步都可點選跳轉、可 Tab 聚焦、Enter 觸發）。動畫只是加分，資訊必須在沒有動畫時也完整。

### 七、狀態序列化（可分享的代碼）

固定寬度編碼，短、可讀、可手貼：

```js
'GS1' + ANGLE_CHAR + items.map(i => TYPE_CHAR[i.type] + b36(i.x/10,2) + b36(i.y/10,2)).join('')
// 例：GS1AJ0m1yJ101yE0u1o…   → 版本 GS1 / 角度 A / 每個物件 5 字元
```
解碼時嚴格驗證（前綴、角度字元、長度 %5、型別字元、`isNaN`），失敗就給明確訊息不要靜默失敗。再把它接到 `?r=` 查詢參數，資料庫頁的每一筆就能「一鍵丟進編輯器重現」——**同一套演算法同時供給列表頁與編輯器，列表上顯示的難度就不可能與編輯器算的不一致。**

### 八、產出憑證

送審表單驗證（長度、必選）通過後，用 FNV-1a 雜湊 `code+name+setter` 產生穩定編號 `XX-YYMMDD-NNN`，並以同一個雜湊當種子生成原創 SVG 條碼（連續 `<rect>`，寬度與間距由 LCG 取模決定）。**不呼叫任何外部服務**，同樣的輸入永遠得到同樣的編號與條碼。

---

*風格代號 `wayfinding-signage`。本規格書由 Claude Opus 4.8 撰寫，隨範例站「岩站 GRIP STATION」發布（2026-07-18）。*
