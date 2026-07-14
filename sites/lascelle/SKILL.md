---
name: art-deco-atelier
description: A symmetrical Art Deco aesthetic with gold hairlines, sunburst motifs, and copperplate cross-hatch engraving, tuned for luxury ateliers and event studios.
---

# Art Deco Atelier — 裝飾藝術工坊風格規格書

## 設計哲學

華麗不是堆疊，而是**節制與比例**。本風格取自 1920–30 年代裝飾藝術：嚴格的軸對稱、金屬與深色的對比、扇形與放射的幾何母題。它適合需要「高級但不喧嘩」的產業——婚禮策劃、珠寶、精品旅宿、律師與會計等專業事務所。核心手感是**銅版雕版**（copperplate engraving）：所有插圖都由細密的交叉排線構成，而非填色色塊，帶來紙鈔與請帖般的貴氣。

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 墨綠黑 Noir | `#0E1A15` | 海報底、刊頭、footer、深色區塊 | 35% |
| 紙金 Paper | `#F3ECDD` | 內文區背景、卡片 | 35% |
| 古金 Gold | `#C1962F` | 分隔線、邊框、排線、標籤 | 14% |
| 亮金 Gold-lt | `#DCC079` | 深底上的標題與強調 | 6% |
| 祖母綠 Emerald | `#1C4B3C` | 內文標題、按鈕、引言區塊 | 8% |
| 赭紅 Clay | `#B4472E` | 火漆封蠟等點綴（<2%） | 2% |

規則：金色**只走線**（邊框、髮絲線、排線），絕不大面積填色；深色與紙色各佔約三分之一，形成 Deco 的高對比。

## 字體系統

- 來源：Google Fonts。`Poiret One`（Deco 幾何無襯線）為所有標題與品牌字；`Josefin Sans`（300/400/600）作標籤、導覽、按鈕，一律大寫 `letter-spacing:.28–.5em`；`Cormorant Garamond`（含 italic）為襯線內文與引言。
- 字級 scale：海報主標 `clamp(46px,9vw,86px)`；區塊標題 `clamp(28px,5vw,46px)`；內文 20px（手機 18px）；標籤 11px。
- 標題行高 1.0–1.1、字距 `.06–.16em`；內文行高 1.6。

## 版面與網格

- **軸對稱**是骨幹：海報、刊頭、區塊標題一律置中；成對元素（扇形、邊框角、團隊卡）左右鏡像。
- 最大寬度 1080px，左右留白 28px。
- 分隔用「金色細線＋中央 45° 菱形（◆）」的 `.rule`，而非留白。
- 卡片與區塊用 **1–2px 實線金框**、**零圓角**、**無模糊陰影**（Deco 不用 drop-shadow 柔影，改用實線與位移）。

## 元件配方

- **Masthead 導覽**：深底、上排置中「圓框花押 + 品牌大寫字距 .34em + 小字副標」；下排 flex 置中連結，連結間以 `1px` 金色細線分隔，hover 反白為祖母綠底。
- **滿版海報開場（fullbleed-art）**：`min-height:88vh` 深底，背後 `72` 條放射 sunburst 線（JS 生成、120s 極慢旋轉），中央金色 2px 邊框海報框，四角以 `::before/::after` 畫 L 形金角；框內置自繪花押、主標、italic 副標、扇形律動條、EST 標籤。
- **按鈕**：無圓角，`1.5px` 邊框；標準款祖母綠描線 hover 反白填色；主要款金底墨字 hover 提亮。`transition:.35s`。
- **價格卡（tier）**：實線框、hover `translateY(-4px)` 並金框；特色款反轉為深底亮金字，頂端置中金色 badge。列表項用 `◆` 金色菱形項目符號、虛線分隔。
- **表單**：透明底、單線金框輸入，focus 邊框轉亮金；標籤大寫字距。
- **footer**：深底、頂金線、三欄；品牌以 Poiret One 亮金呈現。

## 動效規則

- **花押自繪**（簽名動效）：SVG path 用 `stroke-dasharray:1;stroke-dashoffset:1;pathLength:1`，`@keyframes drawin` 於 2.6s 內把 `stroke-dashoffset` 收到 0，各線以 `animation-delay` 錯開逐一描出。
- **sunburst 旋轉**：`@keyframes spin` 120s linear infinite，`opacity:.5`。
- **扇形律動條**：5 根金條 `scaleY` 呼吸，`@keyframes breathe` 5s ease-in-out，`animation-delay` 階梯錯開。
- **RSVP 火漆信封**：點擊切換 `.open`；信封蓋 `border-top` 三角形 `rotateX(180deg)` 掀開（`.7s ease`）、封蠟 `scale(.5)` 縮退淡出、邀請卡 `translateY(-116px)` 滑出。鍵盤 Enter/Space 可觸發。
- **捲動揭示**：`.reveal` 初始 `opacity:0;translateY(18px)`，IntersectionObserver 加 `.in` 後 `.8s` 淡入升起。
- 全部動畫在 `@media (prefers-reduced-motion:reduce)` 下停用（旋轉、呼吸、自繪、揭示改為靜態終態）。

## 插畫與圖像風格（hatching 銅版交叉排線）

- **零外部圖片**，全部原創 inline SVG。
- 建立 `<pattern>` 對角線（`rotate(45)` 與 `rotate(-45)`）作為排線填充：`<line>` 寬 0.5–0.7、間距 3–4px、金色。用它填充建築量體、莊園、人物剪影、花草。
- 亮部留空（深底透出）、暗部用密排線；雙向排線（45° 疊 -45°）作為最深調。
- 母題：莊園/老屋立面、扇形放射、圓框花押、藤蔓與花苞，全部以線與排線構成，不用大色塊。

## Logo 與 Favicon 設計指南

- **Logo**：圓框（雙同心圓）內置 Poiret One 大寫字母花押，四方以排線菱形指向中心；右側品牌大寫字距 .3em 加底部 `WEDDING ATELIER` 小字。
- **Favicon**：inline SVG data URI，深綠黑方底、金色細圓框、serif 單字母；寫在 `<head>`。

## Do & Don't

**Do**：軸對稱置中、金色只走線、實線零圓角、雕版排線插圖、Poiret One + 大寫字距標籤、深綠黑與紙金高對比。

**Don't**：
- ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片模板
- ✗ 模糊 drop-shadow 柔影、rounded-2xl 卡片
- ✗ emoji 當 icon（一律自繪 SVG 排線）
- ✗ 金色大面積填滿（會俗）、破壞左右對稱
- ✗ Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）
- ✗ 跑馬燈反射式套用——本風格以「花押自繪＋火漆信封」承擔動效重點

## 頁面骨架範例

```html
<header class="masthead">
  <div class="mh-top">
    <svg class="mh-mono" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" stroke="#C1962F" stroke-width="1.2"/><text x="22" y="29" text-anchor="middle" font-family="'Poiret One'" font-size="20" fill="#DCC079">L</text></svg>
    <div><div class="mh-name">BRAND</div><div class="mh-sub">副標 · 城市</div></div>
  </div>
  <nav class="mh-nav"><a aria-current="page">序曲</a><a>方案</a><a>關於</a></nav>
</header>

<div class="poster">
  <div class="rays"><svg viewBox="0 0 400 400"><g id="rg"></g></svg></div>
  <div class="poster-frame">
    <svg class="medallion" viewBox="0 0 120 120"><circle class="draw" cx="60" cy="60" r="52" fill="none" stroke="#C1962F"/></svg>
    <h1>BRAND</h1><p class="script">主張標語</p>
  </div>
</div>
```

```css
.rule{display:flex;align-items:center;gap:16px}
.rule::before,.rule::after{content:"";flex:1;height:1px;background:var(--line)}
.rule .dia{width:9px;height:9px;background:var(--gold);transform:rotate(45deg)}
.medallion .draw{stroke-dasharray:1;stroke-dashoffset:1;pathLength:1;animation:drawin 2.6s ease forwards}
@keyframes drawin{to{stroke-dashoffset:0}}
```
