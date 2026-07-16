---
name: watercolour-journal
description: A handmade watercolour-journal style with taped notes, wobbly rotated cards, radar/wash SVG illustration and pastel-soft palette, for small-batch artisanal makers.
---

# 水彩手帳風 Watercolour Journal

## 設計哲學

這是一種「手作者的工作日記」美學。整個網站不像商品目錄，而像翻閱一本被塗塗改改的手帳：紙膠帶貼歪的便利貼、手寫的鍋記、隨手塗的水彩色票。它的可信度來自「不完美」——旋轉一兩度的卡片、手寫字、暈開的邊緣。適合小批次、當令、有人親手在做的品牌（果醬、烘焙、香皂、乾燥花、獨立甜點）。

核心原則：**版面像跨頁而非表格**、**每個元素都像被人手放上去的**（微旋轉、投影偏移）、**顏色是水彩不是印刷色**（半透明、會暈）。避免任何「乾淨、置中、對齊」的企業感。

## 色彩系統

| 色 | Hex | 用途 | 比例 |
|----|-----|------|------|
| 紙白 paper | `#FBF6EC` | 背景（帶橫線紋理） | 60% |
| 墨褐 ink | `#33302A` | 內文、描邊 | 18% |
| 草莓紅 rasp | `#C85A6A` | 主強調、標題底線觸、按鈕 | 8% |
| 杏黃 apri | `#E7A24C` | 次強調、螢光筆底線、罐蓋 | 6% |
| 葉綠 leaf | `#7FA36A` | 手寫拉丁註記、輔助 | 4% |
| 天藍 sky | `#86B8C9` | 少量點綴、alt 按鈕 | 2% |
| 紙膠帶黃 tape | `#EBD9A8` | 便利貼膠帶、nav hover | 2% |

底色鋪 33px 間距的淡橫線（模擬手帳橫格）＋左上角一抹極淡徑向漸層。**禁止**純白背景與紫藍漸層。

## 字體系統

- 標題／內文：`Noto Serif TC`，標題 900、內文 400，行高 1.85–1.9。
- 手寫中日文（章節名、便利貼、標籤）：`Zen Kurenaido`，字級 15–22px。
- 拉丁手寫（英文副題、簽名、kicker）：`Caveat` 500/700，字級 20–26px，常搭 `rotate(-2deg)`。
- 字級 scale：h1 clamp(38,7vw,74) / h2 clamp(26,4.4vw,42) / lead 19 / body 16–18 / 註記 14–15。

## 版面與網格

- 最大寬 1120px（內容頁 980px）。首頁為 `180px 側欄索引 + 1fr 主欄` 的雙欄，行動裝置收合側欄。
- **不對稱跨頁**：開場用 `1.15fr .85fr` 的 spread，左文右便利貼。
- 旋轉規則：卡片 `rotate(-2deg~2deg)`，hover 回正並上浮 4px；便利貼固定 `rotate(-1.4deg)`。
- 留白：章節間 `padding:26px 0 68px`，段落 `max-width:60ch`。

## 元件配方

- **nav（site）**：sticky 頂列，手寫字 tab，`border-radius:14px 14px 3px 14px` 不規則圓角、各自微旋轉；hover 上紙膠帶黃底。
- **anchor-index 側欄**：`position:sticky;top:86px`，`counter` 產生 `01/02…` 前綴（Caveat 杏黃），當前章節左側草莓紅粗邊＋淡黃底。用 IntersectionObserver（rootMargin `-40% 0 -55%`）切換 `.on`。
- **便利貼 .note**：白底、1px 線邊、`box-shadow:3px 4px 0 rgba(140,120,80,.13)`；`::before` 畫一段紙膠帶。
- **卡片 .jar/.card**：白底 1px 邊＋硬投影（無模糊），底部放原創 SVG 罐身。
- **按鈕 .btn**：草莓紅底白字、2px 墨邊、不規則圓角、`box-shadow:2px 3px 0` 墨色；`:active` 位移吃掉陰影（輕巧非「硬陰影按壓」主打）。
- **底線強調 .u**：`linear-gradient(transparent 62%,var(--apri) 62% 92%,transparent 92%)` 模擬螢光筆畫過。

## 動效規則

- 皆為輕量、非炫技。卡片 hover：`transform .3s`；水彩暈染 `.wash` 由 `scale(.2)opacity0` → `scale(1)opacity.85`，`transition:transform .6s cubic-bezier(.2,.9,.3,1.2)`。
- **signature 主互動＝風味測驗**：四支 `<input type=range>` `input` 事件即時重畫 SVG 風味輪（四軸雷達，草莓紅半透明多邊形）；按鈕以歐氏距離配對資料陣列，輸出結果卡。避免把「數字計數」「描邊 dashoffset」當作主打動效。
- 全站包 `@media(prefers-reduced-motion:reduce)`：關閉 transition、水彩維持淡顯。

## 插畫與圖像風格

`watercolor-wash`：所有圖像為原創 inline SVG／CSS——果醬罐（雙層色塊模擬果醬層＋白標籤手寫線）、風味輪雷達、水彩色票（同色相多層半透明圓疊出暈染）、手繪地圖（粗淡雙描線道路＋淚滴圖釘＋郵筒）。**零外部點陣圖**，外部資源僅 Google Fonts。不使用細線幾何線描。

## Logo 與 Favicon

- Logo：一只草莓紅果醬罐（杏黃蓋）＋手寫「手帖」＋Caveat「Handnote」。純 SVG。
- Favicon：inline SVG data URI，32×32 紙底＋簡化罐身，墨褐描邊。

## Do & Don't

**Do**：微旋轉手作感、水彩半透明、手寫字混排、具體可信的鍋記與門市資訊、當令限量敘事。
**Don't**：置中大標＋兩顆按鈕＋三張圓角卡片模板；紫藍漸層；emoji 當 icon；模糊陰影圓角卡；Lorem／AI 腔（「在當今快節奏…」）；純白企業底；系統預設字堆疊。

## 頁面骨架範例

```html
<header class="site"><div class="row">
  <span class="brand"><svg><!--jam jar--></svg>手帖果醬所</span>
  <nav><a href="index.html">手帖</a><a href="jams.html">果醬櫃</a><a href="story.html">關於與拜訪</a></nav>
</div></header>

<div class="layout">
  <aside class="index"><h4>THIS PAGE</h4>
    <ol><li><a href="#kai" class="on">開頁</a></li>…</ol></aside>
  <main>
    <section class="chap" id="kai">
      <span class="kicker">第一帖・開頁</span>
      <div class="spread">
        <div><h1>把當令水果<br>寫進手帖裡。</h1><p class="lead">…</p></div>
        <div class="note">今日鍋記 · 6/14 晴…<div class="swatches"><i></i>…</div></div>
      </div>
    </section>
  </main>
</div>
```

風味測驗骨架：`<input type=range>` × 4 →（input 事件）重畫 `<svg id="radar">` →（按鈕）對資料陣列取最小歐氏距離 → 輸出結果卡（罐身 SVG＋貼合度％＋建議吃法＋價格）。
