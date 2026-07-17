---
name: screening-room-noir
description: A dark single-hall repertory-cinema aesthetic built as a navigable pure-CSS 3D auditorium — near-black aubergine ground, incandescent marquee amber, velvet red and cool projector teal; Noto Serif TC display over Oswald marquee caps and DM Mono ticket numerals; a film-strip side-rail nav, halftone poster art, and a signature CSS transform3d "sightline" that shows the screen from any seat you pick.
---

# 放映廳暗場風・Screening-Room Noir

一套為獨立戲院、修復戲院、影展放映室、黑膠/膠卷、Live House、暗場展演空間設計的視覺語言。它的核心不是「看起來像戲院」，而是「把使用者請進暗場裡坐下」——整個介面是一座可以環視的立體放映廳，燈熄、銀幕亮、絨椅在腳下退向遠方。最重要的一件事：**選座時，畫面會即時轉成你那一席望向銀幕的視線**。

這套風格用 **純 CSS 3D 變換（perspective + transform3d，零函式庫、零外部圖片）** 打造空間感，因此它輕、快、無依賴，任何靜態主機都能跑，也能優雅降級成 2D。

## 設計哲學

1. **請人入座，而非展示海報**：多數網站是海報（平面、正對讀者）。這套風格是劇場（有縱深、有座位、有視線）。首頁不是 hero 大標，而是一座你能拖著轉的放映廳。
2. **暗場是主角，光是稀有品**：底色近黑帶紫（幕黑），大面積留給黑暗；只有銀幕、白熾燈泡、投影光束是亮的。亮度是被「配給」的，不是灑滿整頁——這正是暗場的心理。
3. **絨紅與琥珀是戲院的兩種溫度**：絨紅＝座椅、布幕、觸感；琥珀＝白熾燈泡、marquee、召喚。冷靜的放映青只給光束與 UI 提示，克制使用。
4. **數字是票根的質感**：時刻、座號、片長、訂位編號一律等寬字（DM Mono），像打孔票根與放映表。
5. **破格但仍可用**：可以沒有傳統大標、可以要求你先環視才給資訊、可以每次進站看到不同的座位空位——但票單、地址、時刻永遠找得到，`prefers-reduced-motion` 與非 3D 環境都有降級。

## 色彩系統

| 用途 | Hex | 比例 |
|------|-----|------|
| 幕黑（頁面底色／暗場） | `#100D14` | 40% |
| 廳深紫（面板／卡片底） | `#1F1826` | 16% |
| 分隔線／邊框 | `#2E2436` | 8% |
| 絨紅（座椅／布幕／強調） | `#7C1D2A` | 8% |
| 白熾琥珀（marquee／CTA／重點／已選座） | `#F2B33C` | 12% |
| 銀幕光（主要文字／銀幕面） | `#ECE7DA` | 10% |
| 放映青（光束／UI 提示／次強調，克制用） | `#58B3C2` | 4% |
| 霧灰紫（次要文字） | `#B4A9BF` | 2% |

規則：琥珀與放映青**不同時搶焦**——琥珀是「請你行動」（訂票、選座、燈泡），放映青是「這是光/資訊」（光束、視線讀數）。絨紅只碰與「座位、布幕、實體」有關的東西。底色永遠是幕黑或廳深紫，禁止把大面積染亮。

## 字體系統

- **標題／片名**：Noto Serif TC 900（`letter-spacing:1–3px`）。戲院的莊重感來自襯線與重量，字級大但用量少。
- **英文標籤／marquee／段落眉標**：Oswald 500/700，全大寫，`letter-spacing:3–6px`。窄體大寫＝戲院招牌與場次牌的語彙。
- **數字／時刻／座號／編號**：DM Mono 400/500。所有「可讀成票根的資訊」都用它。
- 字級 scale（桌機）：H1 32–34px / H2 30–32px / 段落 15–18px / 標籤 9–11px / 大數字 26–40px。
- 行高：中文段落 1.7–1.8；標題 1.15–1.25。

## 版面與網格

- **側欄膠卷導覽（film-strip side-rail）**：固定左側 92px 直欄，兩側用 `repeating-linear-gradient` 打出 35mm 齒孔，導覽項是一格格「膠片框」（bordered squares），當前頁框亮琥珀左邊條。手機時整條旋轉成頂部橫向膠卷。
- **暗場舞台區（3D stage）**：首頁主區是 `perspective:1000px` 的放映廳，`preserve-3d` 的 world 可 `rotateY` 環視（限 ±32°）。內含銀幕（`translateZ(-460px)`）、光束、兩片側牆（`rotateY(±90deg)`）、地板（`rotateX(90deg)`）、六排絨椅。
- **不對稱刊頭**：左上是打了燈泡的 marquee 招牌（含上下兩排 `radial-gradient` 燈泡），右上是等寬字的戲院資訊塊——刻意左重右輕，不置中。
- **選座頁三欄邏輯**：左為選片→選場次→立體座位圖（`rotateX(33deg)` 斜面看台），右為 sticky 的「視線預覽＋訂單」。
- 留白規則：暗場需要「呼吸的黑」，區塊間距大（section padding 48–64px），資訊成塊、成表，不散落。

## 元件配方

**膠片框導覽項（.frame）**：`64×56px`，`2px` 實線邊，內含中文 14px 粗體 + Oswald 7.5px 英文小標；hover 邊框轉琥珀；當前頁 `background:#241a10` + 左緣 3px 琥珀條。

**Marquee 招牌**：`border:2px solid` 琥珀深階，深色底；`::before/::after` 用 `radial-gradient(circle, 琥珀 0 3px, transparent)` repeat-x 打出上下兩排燈泡。

**按鈕/CTA**：琥珀實底、`#160f06` 深字、Oswald 700 `letter-spacing:3px`；hover 反轉為透明底琥珀字。無圓角、無模糊陰影。

**座位（.st）**：`24×22px`，`border-radius:5px 5px 3px 3px`（椅背弧）。狀態＝可選（廳深紫）／第 7 排最佳位（絨金）／已選（琥珀＋光暈）／已售（更暗＋「×」）。hover 可選座 `translateY(-3px)`。

**銀幕（.screen / .screen-far）**：暖白漸層面 + 粗黑框 + `box-shadow` 青色外光暈；疊 `repeating-linear-gradient` 掃描線（`mix-blend-mode:multiply`）。

**票根（.stub）**：唯一的亮色反轉區塊——銀幕光底、墨字。上半虛線分隔（`2px dashed`），含片名、場次、訂位編號（DM Mono）、座位清單，底部一條 JS 生成的原創 SVG 條碼。

**footer**：幕黑底、`2px` 上邊線、三欄；末行等寬小字放虛構聲明。

## 動效規則

- **環視放映廳（signature）**：拖曳 `pointermove` → 依位移改 `rotateY`（乘 0.16、`clamp ±32°`）；閒置時 `requestAnimationFrame` 內加極輕 `sin` 擺動（±0.14°）；`←/→` 與左右鍵各撥 10–14°。`transition:transform .5s cubic-bezier(.2,.7,.2,1)`。
- **視線傾轉（signature 核心）**：選座 centroid → 計算 `translateZ`（後排更遠）、`scale`（前排更大）、`rotateY`（偏座→銀幕偏擺）、`rotateX`（前排略仰）套到 mini-screen，`transition .45s`。這是本風格的靈魂互動，見「首創技術實作配方」。
- **座位 hover**：`translateY(-3px)`，`.12s`。**已選**：`box-shadow` 琥珀光環，無位移。
- **膠卷盤自轉（about）**：`rotateX(58deg)` 斜置 + `rotateZ` 14s 線性無限旋轉。
- **票根出現**：`pop`（8px 上移 + 淡入）`.4s`。
- **全域**：禁止把「淡入揭示、數字計數、按壓硬陰影、dashoffset 描繪」當主打；本風格的簽名是**空間**與**視線**，不是這些過載語彙。
- `prefers-reduced-motion`：停自轉、停閒置擺動、清 transition，場景維持在預設角度仍完整可讀。

## 插畫與圖像風格

- **主技法：半調網點（halftone）**。海報以 JS 在 `<svg>` 網格上鋪點，點半徑由一個「亮度函式」`motif(x,y)`（0..1）決定——霧港的地平線光暈與光柱、螢火的散點、平快車的收斂鐵軌與車頭燈、紅氣球的圓形高光、明滅的同心環。最亮的點改用琥珀，其餘用該片的中間色。這模擬老電影海報/報紙劇照的印墨質感，且**零外部圖片、每張都不同**。
- **空間插畫用純幾何**：座椅、銀幕、光束、側牆全是 CSS 盒子與漸層，不是圖檔。
- 禁止細線幾何線描（thin-lineart）、禁止把插畫做成千篇一律的線框小物。

## Logo 與 Favicon 設計指南

- **標記概念**：一顆白熾燈泡（描邊圓＋實心點）＋一道向下擴散的青色投影光束（三角）＋底部一條銀幕白。這三件事＝光源、放映、銀幕，就是戲院的全部。
- **Logo**：上述標記 + Noto Serif TC 900 中文字「明滅」 + Oswald 英文「FLICKER HOUSE」 + 三格絨紅齒孔。
- **Favicon**：同標記壓成 32×32 inline SVG data URI 寫在 `<head>`（幕黑底、琥珀燈泡、半透明青光束、銀幕白條），全站共用。

## Do & Don't

**Do**
- 讓暗場佔多數畫面，亮度只給銀幕/燈泡/光束。
- 用純 CSS 3D 建立縱深；務必附 `prefers-reduced-motion` 與 `@supports not (transform-style:preserve-3d)` 降級。
- 時刻/座號/編號一律等寬字。
- 每張海報用不同的 halftone motif 函式，維持原創與變化。

**Don't（含去AI化禁令）**
- 不用紫藍漸層 hero、不用「置中大標＋三卡片」模板。
- 不用 emoji 當 icon（燈泡/光束/座椅一律自繪 SVG 或 CSS）。
- 不用圓角＋模糊陰影卡片；本風格是硬邊 + 硬光暈。
- 不把整頁染亮或鋪滿彩色——暗場一旦全亮就死了。
- 不用「EST. 19xx」年份徽章、不用「老街屋改建」開場敘事、不用「把 X 變成 Y」標題句式。
- 3D 只為體驗服務，不為裝飾；若站點與「空間/座位/視線」無關，別硬套。

## 首創技術實作配方（純 CSS 3D 視線預覽 Sightline）

本風格的招牌互動——**選座即見那一席望向銀幕的視線**——用純 CSS `transform3d` 完成，無任何 3D 函式庫。

**場景**：一個 `perspective:520px` 的容器，內含 `.mini-world`（`preserve-3d`）、一面 `.mini-screen`（絕對置中、預設 `translateZ(-160px)`、`transition:transform .45s`）、一片近景 `.mini-seatback`（`translateZ(60px)` 代表你椅背的前緣）。

**由座位算視線**（選座 change 時）：
```js
// selected: ["G7", ...]；ROWS="ABCDEFGHIJ"；PERROW=14
var rAvg = 平均列索引(0前..9後);
var cAvg = 平均座號(1..14);
var colOff = cAvg - (PERROW+1)/2;          // 負=偏左, 正=偏右
var depth = -110 - rAvg*24;                // 後排 → 銀幕更遠更小
var scale = 1.18 - rAvg*0.055;             // 前排 → 銀幕壓境
var yaw   = -colOff*2.4;                    // 偏座 → 銀幕向你偏擺
var pitch = 6 - rAvg*0.9;                   // 前排略仰視
miniScreen.style.transform =
  "translateZ("+depth+"px) rotateY("+yaw+"deg) rotateX("+pitch+"deg) scale("+scale+")";
```
同步輸出等寬字讀數：`第 G 排一帶・正中・距銀幕約 X m・偏擺 Y°`，第 7 排命中時加註「甜蜜點」。

**環視放映廳**（首頁）用同一套邏輯的反向：固定場景、旋轉 `.world` 的 `rotateY`。座位排以 `translateX/Y/Z` 沿地板 rake 逐排前移放大生成。

**降級**：`@supports not (transform-style:preserve-3d)` 時，`.mini-screen`/`.rake` 取消 transform，座位圖攤平為 2D 表；`prefers-reduced-motion` 時移除 transition 與自轉，仍可點選、仍有讀數。核心資訊（座位、票價、視線文字）在任何情況都在。

## 頁面骨架範例

```html
<aside class="rail"><!-- 膠卷側欄：齒孔背景 + 膠片框導覽 --></aside>

<!-- 首頁：暗場舞台 -->
<div class="stage" id="stage">
  <div class="world" id="world">
    <div class="face beam"></div>
    <div class="face screen">…今晚放映…</div>
    <div class="face wall l"></div><div class="face wall r"></div>
    <div class="face floor"></div>
    <div class="face seats3d" id="seats3d"><!-- JS 生成六排絨椅 --></div>
  </div>
</div>

<!-- 選座頁：斜面看台 + 視線預覽 -->
<div class="house">
  <div class="screen-far">SCREEN · 銀幕</div>
  <div class="rake" id="rake"><!-- JS 生成 A–J 排、每排座位按鈕 --></div>
</div>
<div class="sight"><div class="mini-world"><div class="mini-screen" id="miniScreen">…</div></div></div>
```

驗收：一個沒看過 Demo 的 AI，只讀本檔即可做出「暗場為底、膠卷側欄、halftone 海報、選座即見視線」的同風格全新戲院/展演站。
