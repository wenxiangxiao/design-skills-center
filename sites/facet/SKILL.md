---
name: facet-spec-cube
description: A minimal-whitespace style for concept select-shops and product-forward brands, whose signature is a pure-CSS 3D "spec cube" (six faces, one spec each) that the visitor drags to rotate, paired with engineering grids, Space Grotesk/Mono type and a single cobalt accent.
---

# 刻面規格方塊・極簡留白（FACET Spec-Cube）

一套為選品店、設計器物、產品品牌設計的視覺語言。它把「產品規格」立體化：每件物件是一個可旋轉的六面方塊，一面一則規格。核心不是把商品排成網格，而是**讓使用者用手把物件翻過來看**。插畫技法完全是 CSS 3D transform（立體構成），零外部圖片。

## 設計哲學

1. **一面一則**：資訊被拆到立方體六個面（品名／材質／尺寸／產地／設計者／定價）。看得清楚，才買得明白。
2. **可操作的隱喻**：facet＝刻面。方塊可拖曳旋轉，切換物件時翻面——互動本身就是品牌敘事。
3. **留白是主角**：大面積紙白、工程網格底、髮絲線連格。內容疏落，讓每件物件有呼吸。
4. **單一強調色**：只用一種鈷藍，落在一個面、當前狀態、標註線。其餘全是黑白灰。

## 色彩系統

| 用途 | Hex | 比例 |
|------|-----|------|
| 底色・紙白 | `#F5F4EF` | 55% |
| 面板／卡片白 | `#FBFAF6` | 20% |
| 墨黑（文字・框線） | `#16150F` | 15% |
| 鈷藍（強調・當前面・標註） | `#2622E0` | 6% |
| 暖灰（次要文字） | `#8C887E` | 3% |
| 髮絲線 | `#DCD9D0` | 1% |

工程網格底（stage / hero）：兩層 `linear-gradient` 疊出 46px 方格，`var(--hair)` 1px 線。

## 字體系統

- 顯示標題：**Space Grotesk** 700，`letter-spacing:-.01em`，H1 `clamp(2rem,4.4vw,3.4rem)`。
- 標籤／數據／規格：**Space Mono**（400/700），`letter-spacing:.12–.28em`，常大寫。
- 中文本文：**Noto Sans TC** 300，`line-height:1.8–2`。
- 數字（尺寸、價格）一律用 Space Mono，強化「規格感」。

## 版面與網格

- **導覽 topbar**：sticky、`backdrop-filter:blur`、底部 1px 墨線；連結用 Space Mono 小寫大寫感，hover 時底線由左展開（鈷藍）。窄螢幕收為 MENU 展開式。
- **split-screen hero**：左右各半，左欄 sticky 置中放 3D 方塊（工程網格底），右欄捲動放敘事與規格。窄於 900px 改上下堆疊。
- 連格：`border-right/border-bottom` 1px 墨線拼成表格狀區塊，**無圓角、無陰影浮卡**。
- section 間 1px 墨線分隔，`padding-block:clamp(46px,6vw,88px)`。

## 元件配方

- **規格方塊（招牌）**：`.stage{perspective:1000px}` → `.cube{transform-style:preserve-3d}` → 六個 `.face` 各 `translateZ(100px)` 配 `rotateX/Y`。其中一面（如 f-right）填鈷藍反白，作為視覺重心。面內排版：左上 Space Mono 序號、下方標籤 + 值。
- **按鈕**：Space Mono、`border:1.5px solid` 墨黑、無圓角、hover 反色（底墨字紙）；篩選鈕 `aria-pressed` 時填墨底。
- **規格列（meta）**：`grid-template-columns:110–120px 1fr`，左欄 Space Mono 大寫灰標籤，下邊髮絲線。
- **卡片（型錄）**：連格 + 頂部一個自轉的小立方體縮圖（每面半透明材質色 tint），hover 加速旋轉。
- **quote 區**：整段墨黑底、紙白 Space Grotesk 500 大字。
- **footer**：三段式，品牌名 Space Grotesk、連結、Space Mono 虛構聲明。

## 動效規則

- **拖曳旋轉方塊**：滑鼠／觸控位移映射到 `rotateY += dx*0.6; rotateX -= dy*0.6`（rotX 夾在 ±80°）；拖曳時 `transition` 設 `.1s linear` 跟手。
- **切換物件翻面**：加 `.flip`（`transition:.7s cubic-bezier(.6,.02,.2,1)`）並 `rotY ± 180`，同時換六面內容；`prefers-reduced-motion` 下即時切換不轉。
- **尺寸標註線描繪**：SVG 標註線用 `getTotalLength` 設 `stroke-dasharray/offset`，逐條 `.15s` 錯開 `.7s ease` 由 offset→0 描出。
- **縮圖自轉**：`@keyframes` 連續 `rotateX/rotateY`，慢轉 14–20s，hover 加速。
- 全部動效在 reduced-motion 下停用。

## 插畫與圖像風格

- **技法：css-3d 立體構成**。所有「圖」都是 CSS 3D transform 疊出的立方體／多面體，半透明面填材質色 tint（黃銅暖黃、陶土磚紅、木作褐、玻璃鈷藍）。
- 尺寸標註以 SVG 線稿（矩形 + 標註線 + Space Mono mm 數字）呈現，鈷藍線、墨黑刻度。
- 零外部圖片、零點陣圖；所有視覺可用程式重繪。

## Logo 與 Favicon 設計指南

- Logo：**刻面立方 glyph**（六邊形外框 + 內部稜線，頂面填鈷藍）+ Space Grotesk 700 字標 + 寬字距中文副標。
- Favicon：同立方縮影，inline SVG data URI（六邊形描邊、鈷藍頂面、底部一條稜線）。

## Do & Don't

**Do**：大量留白＋工程網格；規格立體化為可旋轉方塊；單一鈷藍強調；Space Grotesk/Mono 數據感；1px 髮絲線連格；split-screen 分屏；尺寸標註線描繪。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋三張圓角卡片 ❌ emoji 當 icon ❌ 圓角模糊陰影浮卡 ❌ 塞滿商品的密集網格 ❌ 多彩撞色（本風格單一強調色）❌ 用點陣圖當商品圖 ❌ Lorem ipsum 或 AI 腔文案。

## 頁面骨架範例

```html
<section class="hero"> <!-- split-screen -->
  <div class="stagecol"> <!-- 工程網格底 + sticky -->
    <div class="stage" id="stage">
      <div class="cube" id="cube">
        <div class="face f-front"><span class="fno">01</span>
          <div><span class="flabel">品名 / Object</span><div class="fval zh" data-k="name">…</div></div></div>
        <div class="face f-right">…鈷藍面…</div>
        <!-- back / left / top / bottom -->
      </div>
    </div>
    <div class="stagehint">← 拖曳旋轉方塊・六面即六則規格 →</div>
  </div>
  <div class="infocol">
    <span class="kick">Showcase</span>
    <h1>物件標題 <em>強調</em></h1>
    <dl class="objmeta"><!-- 規格列 --></dl>
    <svg id="dimSvg" viewBox="0 0 360 130"><!-- 尺寸標註線描繪 --></svg>
    <div class="objnav"><button>← Prev</button><button>Next →</button></div>
  </div>
</section>
```

CSS 3D 立方核心：

```css
.stage{perspective:1000px}
.cube{transform-style:preserve-3d;transform:rotateX(-18deg) rotateY(-28deg)}
.face{position:absolute;width:200px;height:200px}
.f-front {transform:translateZ(100px)}
.f-right {transform:rotateY(90deg)  translateZ(100px)}
.f-back  {transform:rotateY(180deg) translateZ(100px)}
.f-left  {transform:rotateY(-90deg) translateZ(100px)}
.f-top   {transform:rotateX(90deg)  translateZ(100px)}
.f-bottom{transform:rotateX(-90deg) translateZ(100px)}
```

```js
// 拖曳旋轉
rotY += dx*0.6; rotX -= dy*0.6;
cube.style.transform = "rotateX("+rotX+"deg) rotateY("+rotY+"deg)";
```
