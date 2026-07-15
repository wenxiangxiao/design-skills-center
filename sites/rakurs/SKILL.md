---
name: constructivism-agit
description: A Russian-Constructivist board-game-publisher aesthetic — red/black/steel-blue/ochre four-colour system, hard-edged geometric blocks on a strict 31-degree diagonal axis, massive condensed poster type, a full-bleed poster opening that assembles on scroll and a live multi-filter database.
---

# 構成主義 Constructivism（Agit 版）

## 設計哲學

回到 1920 年代羅欽科（Rodchenko）、李西茨基（Lissitzky）、史坦伯格兄弟的俄國構成主義：設計不是裝飾，是**行動的工具**。海報要能召喚人上街，所以它用最少的顏色、最硬的邊、最強的斜軸，把視線推向「下一步該做什麼」。移植到桌上遊戲出版，剛好對味——一盒好遊戲的封面、板塊、卡牌，全都是為了把人拉到桌前做決定。

**關鍵三律**：(1) **斜軸**——一切動態元素都轉在同一個角度（本站 `-31deg`），正的令人安心、斜的令人行動；(2) **四色限制**——紅、黑、鋼藍、赭黃 + 米白紙底，不用第五色、不用漸層；(3) **硬邊幾何**——圓、方、三角、楔形、粗黑條，photomontage 式拼貼，絕無圓角模糊陰影。適合桌遊、出版、劇場、運動、音樂祭、任何要「張揚、召喚、動員」的品牌。

## 色彩系統

| 色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 構成紅 red | `#E23A2E` | 主強調、斜楔、CTA、贏家色 | 22% |
| 墨黑 blk | `#17130F` | 大字、粗條、導覽、footer、邊框 | 26% |
| 米白 cream | `#ECE3CF` / `#E2D6BC` | 紙底、反白字、色塊間隙 | 30% |
| 鋼藍 blue | `#2B4C86` | 次色塊、機制標籤、對照面板 | 12% |
| 赭黃 ochre | `#E0A83A` | 第三色、圓、口號牌、點綴 | 8% |
| 深墨棕 ink2 | `#3B342A` | 內文次要色 | 2% |

**紀律**：不出現這五色以外的顏色；不用漸層（gradient 是構成主義的敵人）；大面積用純色塊，讓米白只當「間隙」而非主場——所以 mood 是 vivid-bold 不是 paper-light。

## 字體系統

- 巨型標題：**Anton**（單一粗黑無襯線，海報體），`line-height:.92`，常配 `text-shadow:5px 5px 0 米白` 或 `-webkit-text-stroke` 做鏤空。
- 次標題／標籤／按鈕：**Oswald** 600/700，`text-transform:uppercase;letter-spacing:.06em`，窄體像宣傳單。
- 資料層／編號／西里爾字樣：**Space Mono** 400/700（№、Издательство、工序名 РАЗРАБОТКА 等）。
- 內文：**Noto Sans TC** 400/500/700。
- 西里爾字母是 locale 香料（遊戲名、區塊編號用俄文大寫），但一定並置繁中，維持可讀。

## 版面與網格

- **fullbleed-art 開場**：首頁不是 hero 大標而是一張**滿版海報**。`.poster` 內 `position:absolute` 疊放：`.blk-red`（`rotate(-31deg)` 紅色斜塊）、`.blk-blue`、`.bar-blk`（橫貫黑條）、`.circ`（赭黃圓）、`.ring`（黑環）、`.tri`（紅三角）。文字層 `z-index:5` 壓在其上。
- **31 度是全站唯一斜角**：所有 `transform:rotate()` 用 `-31deg`（或 `18deg` 的三角例外），角度一致才成系統，不是隨機亂斜。
- **硬分格**：卡片、宣言格、工序皆 `border:3–4px solid 黑`，或 `gap:1px;background:黑` 做出印刷分割線；zero border-radius。
- 頂部 `topbar`（64px，黑底、底 `4px solid 紅`）；置中 `max-width:1120–1180px`。
- 密度偏高：海報資訊層層疊、篩選器條件並排、跑馬帶橫貫——極密（資訊轟炸）。

## 元件配方

- **topbar 導覽**：黑底、Oswald 大寫項目，`a::after` 紅色底線 `transform:scaleX(0)→1` 由左展開；`.on` 轉赭黃。手機收合為紅色漢堡 + 全寬下拉。
- **flat-shape 程序封面**：`cover(g)` 依 tone 產生 SVG——米底 + 對角三角主塊 + 31° 黑條 + 對比圓 + 切角 + 赭黃三角 + 黑點 + Anton 兩字。同一套語言換色即成整組封面。
- **色塊按鈕**：`box-shadow:6px 6px 0 黑`（硬位移陰影），hover `translate(-2px,-2px)` 陰影加大；紅底 / 黑底 / 米底三種。
- **篩選 chip**：`2.5px solid 黑` 方塊，`.on` 依組別轉紅 / 藍 / 赭；單選群組。
- **口號牌**：赭黃底 + 黑框 + `rotate(-1deg)` 的 Oswald 短句，像貼上去的宣傳貼紙。
- **agit 宣傳帶（marquee）**：構成主義本就有橫貫的口號帶，屬風格語彙——可用一條，但不濫用（reduced-motion 停止捲動）。
- **footer**：黑底、頂 `6px solid 紅`、Anton 品名、三欄、mono 版權。

## 動效規則

- **斜軸拼合（signature 之一）**：`.reveal` 元素初始 `translate(var(--tx),24px)`，進入視窗加 `.in` 歸零，色塊像沿 31° 軸滑進拼成海報。`transition .6s cubic-bezier(.2,.7,.3,1)`。`--tx` 給不同元素不同水平位移製造錯落。**這是輔助；真正的 signature 主體是篩選重排。**
- **篩選重排（signature 主體 / func）**：改變任一 chip / 搜尋 / 排序即重算 `GAMES.filter().sort()`，重建網格，每張卡 `pop`（`translateY(18px) rotate(-1.2deg)→0`，`animation-delay` 逐張 30ms）翻入；符合款數即時更新；零結果顯示 НЕТ 空狀態。
- **底線／按鈕**：`scaleX` 與 `translate` 硬位移，皆 120–220ms。
- **reduced-motion**：全域關 animation/transition、marquee 停、`.reveal` 直接顯示、`.pop` 不動畫——篩選結果仍即時更新（資訊性）。

## 插畫與圖像風格（flat-shape）

- **零外部圖片**。所有圖像＝無描邊幾何色塊構成的原創 SVG：遊戲封面、人物肖像、hero 幾何場，全部由圓 / 方 / 三角 / 楔 / 31° 條組合。
- 手法是 photomontage：把具象（工廠、汽笛、機器）抽象成色塊的並置與切割，而非線描或插畫小圖。
- 一切遵守四色律與 31° 斜軸。

## Logo 與 Favicon 設計指南

- **Logo**：黑方內一個紅三角（左上）、鋼藍三角（右下）、米白圓（右下壓角）、一條 31° 黑條切過、一枚赭黃小楔——把「銳角 / 角度」抽象成一次構成。
- **Favicon**：簡化版——黑底、紅三角、米白圓、31° 黑條。inline SVG data URI。
- 品名 Anton 全大寫「RAKURS」+ Space Mono 副標「銳角桌遊社 · TAIPEI」。

## Do & Don't

- **Do**：把所有斜角統一成一個度數、嚴守四色、用硬邊色塊拼貼、讓核心功能（多條件篩選）成為頁面主角、大字壓 `text-shadow` 做海報感。
- **Do**：用西里爾字樣與 № 編號調味 locale，但並置繁中保持可讀。
- **Don't**：不用漸層、不用圓角、不用模糊陰影（只用硬位移陰影）、不用第五色、不用 emoji（icon 一律 SVG）、不用 Lorem、不用「EST. 19xx」徽章、不用「把 X 變成 Y」句式。
- **Don't**：不要每個元素亂斜不同角度——那是混亂不是構成；斜軸必須成系統。

## 頁面骨架範例

```html
<header class="top"><div class="in"><a class="brand">…</a><nav class="nav">…</nav></div></header>
<div class="poster">
  <div class="field">
    <div class="blk-red reveal" style="--tx:-40px"></div>
    <div class="blk-blue reveal" style="--tx:40px"></div>
    <div class="bar-blk"></div><div class="circ"></div><div class="ring"></div><div class="tri"></div>
  </div>
  <div class="wrap pblock">
    <span class="kick">構成主義桌上遊戲出版</span>
    <h1>角度<em>決定</em><span class="st">一切</span></h1>
    <div class="say">口號牌</div>
    <a class="btn">進遊戲庫篩選 →</a>
  </div>
</div>
```

```js
// 多條件篩選核心：AND 組合 chip 群組 + 搜尋 + 排序 → 重建網格 pop 翻入
function matches(g){ /* players/time/weight/cat/mech/q 逐條 return false */ return true; }
function render(){ var list=GAMES.filter(matches).sort(by(state.sort)); grid.innerHTML=''; list.forEach(paint); count.textContent=list.length; }
```
