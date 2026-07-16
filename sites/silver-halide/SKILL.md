---
name: bw-photo-editorial
description: A near-black darkroom-gallery editorial style where all photography is reproduced as generative SVG halftone dot-screens, laid out on a film-strip side rail with contact-sheet grids and a single safelight-red accent.
---

# 黑白攝影雜誌風 — BW Photo Editorial

## 設計哲學

這是一座「沒有照片的攝影雜誌」。核心矛盾與趣味在於：零外部圖片，卻要營造暗房與底片的質感。解法是把所有影像改用**生成式半調網點（SVG 圓點屏）**重現——像報紙印刷放大後看到的墨點。整體像走進一間關了大燈、只留安全燈的暗房：近黑底、象牙灰字、極大量留白，資訊冷靜可追溯（機況卡、實測數字），情緒克制。唯一的暖色是暗房安全燈的朱紅，用量極省（≈5%），只點在「顯影中」指示、章節標記、side rail 當前頁。

設計目標：讓畫面「安靜」。密度走極疏，靠黑色留白與少數高反差網點影像撐場，而不是塞滿卡片。

## 色彩系統

| 用途 | Hex | 比例 |
|---|---|---|
| 主底（近黑） | `#0D0D0D` | 60% |
| 面板／區塊底 | `#161616` / `#1E1E1E` | 18% |
| 主字（象牙墨白） | `#EAE8E2` | 12% |
| 次字（暖灰） | `#8E8A82` | 6% |
| 分隔線 | `#33322D` | 3% |
| 安全燈朱紅（強調，極省） | `#B23A2B` | ≤5%，僅指示／標記／selection |

網點只用 `#EAE8E2`（象牙）畫在 `#050505`（比主底更深）的框內，模擬相紙上的銀鹽。

## 字體系統

- 英文標題／內文襯線：**Fraunces**（opsz 光學尺寸，用 600 與 italic 500）。
- 英文技術資料／標籤／導覽：**Archivo**（700–900，大字距，全大寫）。
- 中文標題與長文：**Noto Serif TC**（700–900）。
- 中文介面／規格：**Noto Sans TC**（400–700）。
- Scale：Hero `clamp(38px,6vw,86px)`；區塊標題 `clamp(26px,3.6vw,46px)`；內文 16–16.5px／行高 1.9–2.0；技術標籤 9–11px／字距 1.5–4px 全大寫。
- 首字放大（drop cap）：文章第一段 `::first-letter` 用 Fraunces 4.4em `float:left`。

## 版面與網格

- **側欄導覽（side rail）**：固定左側 78px，內含膠捲齒孔（上下兩排 `i` 小方塊）、直排品牌字、直排導覽（每項附兩位幀號 00/12/24）、底部安全燈圓點。`writing-mode:vertical-rl`。
- **接觸印樣（contact sheet）**：`grid-template-columns:repeat(4,1fr)`，格與格間 2px 線，每格 `aspect-ratio:1/1.06`，含幀號列（`01A`）、網點圖、hover 揭示的標題／規格／價。
- **極疏留白**：section 上下 padding 56–70px；大量黑色負空間；避免把區塊塞滿。
- **不對稱**：Hero 齊左、單欄；editorial 用 1.05fr / .95fr 或 1fr/1fr 但內容錯落。
- RWD：≤900px 接觸印樣轉 2 欄、雙欄轉單欄；≤640px 側欄改為 sticky 頂欄（品牌＋三連結）。

## 元件配方

- **nav（side rail）**：`position:fixed;width:78px;background:#0A0A0A;border-right:1px solid var(--line)`；連結 `writing-mode:vertical-rl`，當前頁左側 2px 朱紅條 `::after`。
- **接觸印樣格 .frame**：底 `#0B0B0B`，內 `.pic` 底 `#050505`＋1px 暗框；`.pic svg` 預設 `filter:contrast(.62) brightness(.62)`，hover/focus 轉 `contrast(1.18) brightness(1.02)` 並 `scale(1.035)`（0.9s cubic-bezier）——此為「顯影」訊號。
- **按鈕**：方形無圓角；線框 `1px solid var(--ink)`，hover 反白（`background:var(--ink);color:#0B0B0B`）；主要行動用實心朱紅 `.solid`。
- **比較表 .rtable**：`border-collapse`，1px 線；表頭列 `#0A0A0A`＋Fraunces/Serif；列首欄 `#111` Archivo 標籤；命中「最佳」的儲存格加 `td.best`，右上以朱紅 8px「最佳」角標。
- **footer**：更深 `#080808`；底列 Archivo 10px 大字距灰字三欄。

## 動效規則

| 動畫 | 觸發 | 值 |
|---|---|---|
| 顯影（develop） | 接觸印樣格 hover/focus | `filter` contrast/brightness + `scale(1.035)`，`0.9s cubic-bezier(.2,.7,.2,1)` |
| 標題／規格揭示 | 同上 | `opacity`+`translateY(6px→0)`，0.5s，延遲 0.12s |
| 顯影中閃示 | hover | `.dev` steps(2) 1.2s 一次 |
| 安全燈閃爍 | 常駐 | `blink 3.4s steps(1) infinite`（92% 亮、末段轉 .25） |
| 平滑捲動至結果 | 送出比較 | `scrollIntoView({behavior:'smooth'})` |

`prefers-reduced-motion:reduce` 時：關閉所有 transition/animation、`scroll-behavior:auto`、接觸印樣網點固定在 `contrast(1.05) brightness(.95)`、caption 直接顯示。

## 插畫與圖像風格（核心）

**一切影像＝生成式 SVG 半調網點，零外部圖片。**

引擎：`halftone(svg, fn, cols)`。在 viewBox 內鋪 `cols×rows` 網格，每格中心取亮度場 `v=fn(x,y)`（0=亮、1=暗），畫半徑 `r = r0*sqrt(v)` 的 `<circle fill="#EAE8E2">`；`v` 太小則略過（留白）。`r0 = step*0.62`。

亮度場 `fn(x,y)` 用簡單幾何函式疊 `Math.max` 組成物件：
- 相機：機身矩形塊 + 鏡頭圓（`Math.hypot` 半徑）+ 觀景窗頂塊 + 頂部/受光環境漸變 `amb=0.1*(1-y)`。
- 暗房靜物：顯影盤矩形 + 盤內負反光 + 掛著的底片直條 + 夾子圓點 + 安全燈光暈（用減法讓亮處網點變少）。

要點：物件用「亮度」描述而非描邊；越暗網點越大越密。這讓畫面像新聞照片的粗網屏，服務「黑白攝影／印刷」主題。

## Logo 與 Favicon

- **Logo**：光圈（aperture）葉片——五片以 `path`（`A` 圓弧 + 直線）繞中心排列、不同 opacity 造出金屬葉片重疊感，中心 3.4 半徑挖黑孔，外圈 1px 細環。右側 Archivo 800「SILVER HALIDE」＋Noto 大字距「銀 鹽 相 機 所」。
- **Favicon**：同一光圈葉片，去掉文字，鋪 `#0D0D0D` 底，寫成 inline SVG data URI。

## Do & Don't

**Do**：近黑底＋極疏留白；一切影像用半調網點生成；朱紅極省；技術資料冷靜可追溯（實測數字、機況卡）；側欄膠捲隱喻；drop cap 與 pull quote 撐編輯感。

**Don't**（含去 AI 化禁令）：
- ✗ 不用任何外部圖片／stock photo（違反本風格根本設定）。
- ✗ 不用紫藍漸層、不用置中大標＋兩鈕＋三卡模板。
- ✗ 不用 emoji 當 icon（光圈、齒孔皆自繪 SVG）。
- ✗ 朱紅不可濫用成主色（它只是安全燈）。
- ✗ 不用圓角卡片與模糊陰影；一律方角、1px 實線。
- ✗ 不寫「EST. 19xx」徽章、不寫「把 X 變成 Y」句式、不寫 AI 腔開場。

## 頁面骨架範例

```html
<aside class="rail">
  <span class="sprocket l"><i></i><i></i>…</span>
  <span class="mk">HALIDE</span>
  <nav>
    <a href="index.html" aria-current="page"><span class="fno">00</span>相機所</a>
    <a href="stock.html"><span class="fno">12</span>機身庫存</a>
  </nav>
  <span class="safelight"></span>
</aside>
<div class="shell">
  <div class="sheet">
    <a class="frame">
      <div class="fh"><span class="n">01A</span><span>HP5+ 400</span></div>
      <div class="pic"><svg viewBox="0 0 200 200"></svg></div>
      <span class="price">NT$ 12,800</span>
      <div class="cap"><div class="t">Nikon FM2</div><div class="d">MF SLR · 1984</div></div>
    </a>
  </div>
</div>
<script>
function halftone(svg,fn,cols){/* 網格取樣 fn→circle r=r0*sqrt(v) */}
</script>
```
