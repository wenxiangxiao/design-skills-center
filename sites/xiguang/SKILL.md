---
name: ink-lightbench
description: A monochrome ink optical-bench aesthetic where the whole interface is graded ink and the only colour permitted anywhere is light itself — spectra are born only when a prism splits white. Built for sites whose content is a spatial engine you route, aim, or read.
---

# 墨光檯風 Ink Light-Bench

> 一句話：把整個介面做成一間全暗的光學暗室——牆、檯、器材、文字全是墨色的階調，唯一被允許有顏色的東西是「光」；而顏色不是被畫上去的，是白光被稜鏡拆開的那一刻才誕生。留給「內容本身是一台可操作或可讀的空間引擎」的網站。

## 設計哲學

這個風格服務一種特定內容：**一束需要被看清楚的光、或任何「路徑／場／結構」本身就是主角的介面**。它的核心信念是「暗，是為了看見」——把背景壓到近黑，不是為了時髦的深色主題，而是因為只有夠暗才看得清一條發亮的線。

三條不可退讓的原則：

1. **顏色是稀缺資源，且只發給光。** 整個 UI——按鈕、標籤、現用態、卡片、表格——一律用墨階與象牙白的明度對比來表達，**不准用彩色**。彩色只出現在「光」身上：光束、光譜、被點亮的訊號。這條紀律是本風格的靈魂，破了它就退化成普通的深色科技風。
2. **色彩要「長出來」，不要「塗上去」。** 預設的光是白的（近乎無色的暖白輝光）；真正的顏色只在光被稜鏡色散、被光柵分級的那一刻出現。因此網站裡任何一抹彩虹都應該是「光被拆開」的結果，而非裝飾。
3. **每一條發亮的線都必須有物理意義。** 光路不是抽象生成美術，是逐段算出來的反射與折射。線的走向可以被讀回「它為什麼往這裡去」。

## 色彩系統

墨階為絕對主體（約 88% 版面），象牙白承載資訊（約 10%），光色是唯一的彩色（≤2%，且僅用於光本身）。

| 用途 | HEX | 佔比 | 說明 |
|---|---|---|---|
| 頁面底 ink0 | `#0d0e11` | 40% | 近黑暖墨，全站地色 |
| 面板 ink1 | `#141619` | 20% | 卡片、導覽、檯面外框 |
| 抬升 ink2 | `#1b1e23` | 10% | 按鈕、輸入框、次面板 |
| 邊界 ink3 / line | `#23272e` / `#363b43` | 8% | 1px 分格線（無圓角、無陰影） |
| 次文字 grey | `#787d85` | — | mono 標籤、刻度、註記 |
| 正文 cream | `#e8e2d5` | 10% | 象牙白，主要文字與亮面 |
| 弱化文字 creamsoft | `#c1bbae` | — | lede、說明段 |

**光色（唯一彩色，僅用於光）**：白光 `#F6EFDF`（暖白輝光）。稜鏡色散的七波長固定為紫 `#7A5CFF`／藍 `#3E7BFF`／青 `#21C6D6`／綠 `#46D66A`／黃 `#F2D24A`／橙 `#FF9A3C`／紅 `#FF4D4D`。這組色**只准畫在光束上**，不得挪去當品牌色、按鈕色或圖示色。

## 字體系統

- 標題／品牌：**Noto Serif TC** 900（`h1` 30px、`h2` clamp(30,5vw,52)、章節 `h3` 24–26px）。厚重襯線，給暗底一點份量。
- 內文：**Noto Sans TC** 400/500/700，16px，行高 1.75。
- 數字、刻度、標籤、代號：**Space Mono** 400/700，字距 .06–.22em、常大寫。所有「像儀器讀數」的東西都走 mono——場次時間、票價、留位號、mX 分級、規格列。

字級 scale：11（mono kicker）→ 13–14（正文小）→ 16（正文）→ 17.5（lede）→ 24–30（章節）→ clamp 到 52（hero）。

## 版面與網格

- 容器 `max-width:1120px`，左右 padding 24px。**不對稱、留白極疏**：hero 靠左大標，大量墨色負空間，讓後面第一塊發亮的東西（光學檯）自己跳出來。
- 分隔一律 **1px 實線**（`--line`），**無圓角、無模糊陰影**——這是暗室裡的金屬與玻璃邊，不是柔軟的卡片。
- 主角區塊（canvas 光學檯／圖鑑縮圖）用 `border:1px solid line` 框住，內部才是更黑的 `#0c0d10` 檯面，讓光在框內發亮。
- 網格系統：canvas 內部用固定虛擬座標 `1000×600`，元件座標存在此系內，繪圖時 `ctx.scale(W/1000,H/600)`，RWD 免重算。

## 元件配方

- **導覽（光柵分級 diffraction-order rail）**：固定右上角一個 `212px` 面板，內含一張手繪 SVG——白光打上光柵、分出四道 order 光。下方 2×2 四頁連結；現用頁反白（象牙底墨字）。`≤900px` 收成底部四格 sticky dock、隱藏 SVG。**不要用置頂純文字列**。
- **主檯（canvas）**：`<canvas>` 寬滿容器、比例 3:5（`height=width*0.6`）；`devicePixelRatio` 放大。頂列放關卡選擇（mono 方鈕，現用反白），底列放狀態（`aria-live`）與工具鈕（提示／重置）＋旋轉滑桿（觸控用）。
- **按鈕**：`ink2` 底、`ink3` 邊、`creamsoft` 字；hover 邊框轉象牙。主行動鈕（`.btn`）反白：象牙底、墨字。無圓角。
- **卡片**：`ink1` 底、`line` 分隔；縮圖 canvas 在上、mono `tag` 標籤、序號、規格列（`border-top` mono）在下。用 1px 格線拼成網格牆（`gap:1px;background:line`）。
- **表單**：輸入框 `ink0` 底、mono 字；`:focus` 邊框轉象牙；錯誤態邊框與訊息用**橙 `#FF9A3C`**（這是唯一被允許的例外——把「錯誤」視為一種需要被看見的訊號光）。三步 stepper 用等寬格、現用格反白。
- **footer**：`line` 上框、`grey` mono 小字，列出四頁連結＋虛構聲明＋建置模型尾註。

## 動效規則

- **光路即時重算（signature）**：拖動或旋轉任一元件，`requestAnimationFrame` 重跑 `traceAll` 並重繪。光束以**加成混合**繪製：`globalCompositeOperation='lighter'`，三道 pass（寬 7px α.10 輝、3.4px α.32、1.5px α1 芯）。七條同色前疊在一起自然合成白，經稜鏡散開才顯出七色。
- **色散判定**：勝負不只看「光有沒有到屏」，而要看七色在屏上**散開的幅度**（投影到屏方向的極差 ≥ 門檻），否則一束白光直射也會被誤判成七色。
- **duration/easing**：本風格幾乎不用補間動畫；「動」來自使用者即時操作光路。通用淡入僅可用於載入，不得當主打。
- **prefers-reduced-motion**：關掉平滑捲動與任何自走動畫，光路只在互動當下重繪、靜態呈現最後結果；`scroll-behavior:auto`。

## 插畫與圖像風格

**全站沒有一張外部圖片，也沒有一張「畫」出來的插圖**——所有圖像都是同一支**光路引擎**（geometric ray-optics）算出的光路示意（`ray-schematic`）：

- 原語只有三種——鏡（線段，反射）、透鏡（薄透鏡線段，`u' = u − h/f` 偏折）、稜鏡／玻璃（三角面，逐面司乃耳折射、含波長相關折射率 `n(λ)` 產生色散、超臨界角全反射）。
- 追跡器：`ray-segment` 求最近交點 → 依 surface 種類反射／折射／散射 → 續追至多 48 段。白光以七波長取樣同時追，前段疊合成白、後段散成譜。
- logo、favicon、圖鑑每張縮圖、預約印記，都由這支引擎以不同 `elems + source` 算出；印記由報名資料 `FNV-1a → mulberry32` 決定性生成（同輸入恆得同圖）。
- 方法頁（原理）的教學圖解可用**手工烘好的原創 inline SVG**（反射／折射／全反射／色散／透鏡五圖），與引擎渲染分工：引擎畫「被算出的光路」，手工 SVG 畫「帶角度與符號標註的定律圖」。
- 分工不可對調：光束用光色、元件輪廓用象牙、影線與刻度用 grey、底恆近黑。**元件本體永遠不上彩色**。

## Logo 與 Favicon 設計指南

- **Logo**：一束白光（象牙白粗線）射入一枚三角稜鏡（象牙描邊、內填 5% 象牙），右側扇出紫藍綠黃橙紅六道色散細線；其後接品牌名（Noto Serif TC 900）與 mono 副標。整個標誌就是本站的論點——「白光進、光譜出」。
- **Favicon**：同一構圖縮到 `32×32`——近黑底、左側白光短線、中間稜鏡三角、右側四道色散線（紫綠黃紅）。用 inline SVG data URI 寫在 `<head>`。
- 不要用發光字、漸層填充或彩色幾何當標誌；顏色只准出現在那幾道色散線上。

## Do & Don't

**Do**：把背景壓到近黑；用 1px 實線與明度對比造版；把彩色嚴格保留給光；讓每條發亮的線都由引擎算出、可被讀回意義；mono 承擔一切「讀數感」；提供 reduced-motion 靜態結果與無 JS 可讀的方法頁。

**Don't**：不用紫藍漸層 hero；不用「置中大標＋兩顆按鈕＋三張圓角卡」模板；不用 emoji 當 icon（一律自繪 SVG／引擎生成）；不用圓角＋模糊陰影卡片；**不准把光譜色挪去當品牌色或按鈕色**（這是本風格最容易犯、也最致命的退化）；不用米白紙感底（那是別的風格）；不寫「EST. 19xx」徽章或「把 X 變成 Y」句式；不放無意義的裝飾光線。

## 頁面骨架範例（可直接使用）

```html
<body>
  <!-- 光柵分級導覽：右上角面板，內含分光 SVG + 2×2 四頁 -->
  <nav class="dnav">
    <svg viewBox="0 0 188 62"><!-- 白光→光柵→四道 order 光 --></svg>
    <ul>
      <li><a href="index.html" aria-current="page">主檯<span class="m">m0</span></a></li>
      <li><a href="cat.html">圖鑑<span class="m">m1</span></a></li>
      <li><a href="fa.html">原理<span class="m">m2</span></a></li>
      <li><a href="book.html">預約<span class="m">m3</span></a></li>
    </ul>
  </nav>

  <header class="mast"><!-- 稜鏡 logo + 品牌 + mono 參觀資訊 --></header>

  <main class="wrap">
    <section class="hero">
      <div class="kicker mono">ONLY LIGHT HAS COLOUR</div>
      <h2>整座劇場是墨色的，唯一有顏色的是光。</h2>
      <p class="lede">…白光是所有顏色疊在一起，稜鏡讓它們現形。</p>
    </section>

    <!-- 主角：發亮的空間引擎，框在近黑檯面裡 -->
    <section class="bench">
      <div class="bench-top mono">主檯 · <b>關卡</b></div>
      <canvas id="stage" width="1000" height="600"></canvas>
      <div class="bench-bot"><span aria-live="polite">狀態…</span><button class="btn">重置</button></div>
    </section>
  </main>

  <footer><!-- line 上框 + mono 虛構聲明 + 建置模型尾註 --></footer>
</body>
```

```css
:root{ --ink0:#0d0e11; --ink1:#141619; --line:#363b43; --grey:#787d85; --cream:#e8e2d5;
  --serif:'Noto Serif TC',serif; --mono:'Space Mono',monospace; }
body{background:var(--ink0);color:var(--cream)}
.bench{border:1px solid var(--line);background:#0c0d10}   /* 檯面比頁面更黑，讓光發亮 */
/* 光束用 lighter 混合疊出白光；只有光可以有顏色 */
```

驗收標準：一個從未看過 Demo 的 AI，只讀本檔就能做出——整體墨色、唯一彩色是光、彩色只在「光被拆開」時出現、且主角是一台由光路引擎驅動、可讀回意義的空間介面——的全新網站。
