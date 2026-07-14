---
name: scandinavian-calm
description: A quiet Scandinavian-minimal system in paper-grey and slate blue, built on generous whitespace, isometric line-solid illustration and a functional side-rail — calm, transparent and precise.
---

# 北歐簡約 · Scandinavian Calm

> 一套「安靜、透明、慢」的視覺語言。骨架不靠大標 hero，而是讓**功能性內容（時段表／目錄／清單）直接當主角**，用大量留白、克制的板岩藍點綴，與原創等角視圖插畫承擔識別性。適合診所、事務所、預約制服務、生活風格品牌。

## 設計哲學

1. **留白不是空，是呼吸**：版面先給內容留出大片空氣，再放東西。段落最大寬度 42–48ch，絕不讓文字撐滿整行。
2. **功能即開場**：不用「大標＋副標＋兩顆按鈕」開場。把使用者真正要的東西（可預約時段、療程費用）放在第一屏，讓介面本身說明用途（schedule-first）。
3. **透明**：價格、流程、空間都攤開來。設計語言呼應品牌承諾——等角剖面圖就是「把看不見的攤給你看」。
4. **克制的顏色**：低彩度大地色為底，單一板岩藍作為唯一強調色。顏色少，才顯得安靜。

## 色彩系統

| 色票 | Hex | 用途 | 建議比例 |
|---|---|---|---|
| 紙灰 Paper | `#F4F1EC` | 全站背景 | 60% |
| 紙灰深 Paper-2 | `#EDE8DF` | 區塊交錯、hover 底 | 12% |
| 墨 Ink | `#23282B` | 主文字、footer 底 | 12% |
| 墨灰 Ink-2 | `#586067` | 次要文字 | 6% |
| 板岩藍 Slate | `#4A6C8C` | 唯一強調：連結、按鈕、重點插畫 | 5% |
| 鼠尾草綠 Sage | `#8FA98C` | 次要插畫、可用狀態 | 3% |
| 暖沙 Sand | `#D8C3A5` | 木質感插畫、footer 標題 | 2% |
| 線 Line | `#D7D0C4` | 1.5px 分格線、邊框 | — |

**禁止**：純白 `#FFFFFF` 背景（改用紙灰）、飽和原色、任何漸層 hero。

## 字體系統

- **標題／數字／標籤**：`Space Grotesk`（500/700），`letter-spacing:-0.01em`，`line-height:1.05–1.08`。標籤字用 `letter-spacing:1–3px` 大寫。
- **內文**：`Manrope`（400/500/700），`line-height:1.6`。
- 字級 scale：hero `clamp(30px,5vw,54px)`／H2 `clamp(24px,3.4vw,38px)`／H3 `20px`／body `15–17px`／標籤 `11–13px`。
- 數字一律 `font-variant-numeric:tabular-nums`（時段表、價格對齊）。

## 版面與網格

- **側欄 + 內容**：固定左側 `--rail:210px` 垂直導覽，右側 `margin-left:var(--rail)`。手機（≤720px）把 rail 變成 sticky 頂列、橫向排列。
- 區塊之間用 `1.5px solid var(--line)` 實線分隔，**無圓角、無陰影卡**（僅 hover 時的功能性浮起例外）。
- 多欄清單用 `display:grid` + `gap:1.5px` + `background:var(--line)`，靠格線縫隙做出「表格感」。
- 留白：section padding `clamp(28px,5vw,72px)`。內容不對稱——文字欄常偏左，插畫置右。

## 元件配方

- **side-rail nav**：`position:fixed` 左欄；連結 `border-left:2px solid transparent`，`.on` 時左邊框變板岩藍、底色 paper-2；每項右側附 `Space Grotesk` 小編號（01–04）。
- **按鈕**：實心板岩藍 `padding:14px 26px` 無圓角，`1.5px` 同色邊框；hover 加深為 `--slate-d`。ghost 版本透明底、墨色邊框，hover 反色。
- **時段表 cell**：`.free` 綠字＋淡綠底，hover 整格 `translateY(-3px)`、變板岩藍實心＋白字＋柔和陰影；`.full` 用 45° `repeating-linear-gradient` 斜線紋表示已滿。
- **清單列 trow**：`grid-template-columns:56px 1.4fr 1fr auto`，含編號、等角圖標、標題＋標籤、右側價格；hover 換 paper-2 底。
- **footer**：墨底、暖沙色小標題、三欄；底部 `1px` 分隔線放版權與 `mono` 城市標。

## 動效規則

| 動效 | 觸發 | duration / easing |
|---|---|---|
| 時段表格逐格揭示（sweep） | 載入 | 每格延遲 `i*22ms`，`translateY(8px)→0` |
| 時段格 hover 浮起反色 | hover | `.2s` |
| 等角圖層逐層升起 | 進入視窗（IntersectionObserver, threshold .3） | 每層延遲 `d*160ms`，`.7s cubic-bezier(.2,.7,.2,1)` |
| 齒模等角旋轉 | 常駐 | `spin 22s linear infinite`（非常慢） |

全部包在 `@media(prefers-reduced-motion:reduce)`：關閉所有 animation，圖層與時段格直接顯示最終狀態。

## 插畫與圖像風格（isometric 等角視圖）

- 一律 30°/150° 等角投影：頂面、左面、右面三個明度（例：Slate `#4A6C8C` 頂／`#3A5670` 側深／`#6C8AA6` 側亮）。
- 純色塊、**無描邊或極細白色 0.5–1.4px 分面線**；靠三面明度差表現立體，不用陰影。
- 主題取材自品牌真實物件：診間剖面、器械櫃、齒模、家具。避免抽象裝飾。
- 全部手寫 inline SVG，`overflow:visible` 讓升起動畫不被裁切。

## Logo 與 Favicon 設計指南

- **Logo**：等角齒模符號 + `Space Grotesk` 700 字標，字距 `1.5px`。齒模用板岩藍雙明度＋一條白色中線。
- **Favicon**：紙灰底方塊 + 板岩藍單色牙齒剪影，inline SVG data URI 寫在 `<head>`（`%23` 編碼 `#`）。

## Do & Don't

**Do**：留白優先、單一強調色、功能當開場、實線分格、等角原創插畫、tabular 數字對齊、慢而克制的動效。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋三張圓角卡片 ❌ emoji 當 icon ❌ 模糊陰影卡 ❌ 純白背景 ❌ 飽和多色 ❌ Lorem ipsum 或 AI 腔文案 ❌ 每屏都塞滿內容。

## 頁面骨架範例

```html
<aside class="rail">
  <a class="brand" href="index.html"><svg>…等角符號…</svg><b>BRAND</b></a>
  <nav>
    <a class="on">主功能 <span class="n">01</span></a>
    <a>次頁 <span class="n">02</span></a>
  </nav>
  <div class="foot">地址・電話・營業時間</div>
</aside>
<main class="wrap">
  <section class="hero">
    <p class="kick">標籤 · 大寫字距</p>
    <h1>一句安靜的主張，<em>強調色點綴</em>。</h1>
    <!-- 功能性內容直接當第一屏：時段表 / 目錄 / 清單 -->
    <div class="sched"><div class="grid" id="grid"></div></div>
  </section>
  <section class="iso">
    <div><h2>小標</h2><p>≤42ch 說明</p></div>
    <div class="stage"><svg class="isoart">…逐層 .layer…</svg></div>
  </section>
</main>
<footer>…墨底三欄 + 版權…</footer>
```

配色、字體、留白比例照上表即可產出風格一致的全新網站——換產業（事務所、預約制餐廳、生活選物）只需替換文案與等角插畫主題，骨架不動。
