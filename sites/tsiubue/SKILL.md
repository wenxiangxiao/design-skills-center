---
name: ink-cadence-feibai
description: Aged-silk ink-wash monochrome with vermillion accents, hand-drawn wobble borders, and a data-driven brush-stroke engine where stroke width and feibai (flying-white) encode rhythm and synchrony.
---

# 墨拍飛白風 Ink-Cadence Feibai

## 設計哲學

墨在絹上，不在紙上。整站只有一種顏色的家族——墨的濃淡——加上一點硃砂，而且硃砂有嚴格的職務：只給鼓、印記、現用態與不可回復之事。最重要的原則是**筆是資料**：本風格的插圖不是描出來的形，而是由節奏資料驅動的運筆——筆寬＝當下的同步／力度，飛白＝失鎖／枯竭，一段資料永遠鑄成同一筆。版面骨架是編輯式的細線分格，但邊框帶手寫顫（不對稱圓角），像用禿筆畫的框。

## 色彩系統

| 色票 | 用途 | 比例 |
|---|---|---|
| `#C6C2B6` 絹灰 | 全站底色（疊 7px 絹纖橫紋 rgba(20,20,15,.045) 與大片淡墨水洗 radial-gradient） | ~45% |
| `#26251F` 濃墨 | 正文、筆畫、實心元素 | ~25% |
| `#3B392F` 墨二階／`#8F8C82` 淡墨 | 次要文字、水紋、退遠的東西 | ~15% |
| `#14140F` 玄 | footer、最深的墨 | ~8% |
| `#AE3B25` 硃砂（輔 `#8C2E1D`） | 鼓、印、現用態、違規刻痕、CTA——**只給不可忽視之事** | <6% |

禁：任何第二個彩色色相；發光、漸層彩虹；純白 `#FFF`（最亮只到絹白 `#ECE8DE`）。

## 字體系統

Google Fonts：`Noto Serif TC`（900 標題／700 小標，letter-spacing .06–.18em）＋ `Noto Sans TC`（400/500/700 正文，16px、line-height 1.75）＋ `IBM Plex Mono`（400/600，一切讀值、編號、公式、英文小標 11–13px）。字級階：34/24/20/17/16/14.5/13/12/11。中文標題配 mono 英文小標是本風格的落款慣例。

## 版面與網格

左緣 96px 固定側欄（槳架導覽），main `max-width:1140px`、左右 40px。分節以 `h2 + 細線延伸`（`h2::after` flex 線）而非色塊。網格允許 1.5fr/1fr 的不對稱雙欄。密度中等：一屏一件主事。手機 ≤900px 側欄收為底部 64px 橫欄，main 退滿版。

## 元件配方

- **導覽（oar-rack rail 槳架）**：垂直排列的槳形 SVG（豎桿＋葉形 path），現用頁槳葉填實、rotate(6deg)、下方兩滴水珠 2.6s 迴圈；label 直書 `writing-mode:vertical-rl`，現用態右緣壓 2px 硃砂。行動版攤為底部四格。
- **按鈕**：`border:2px solid 墨`、手寫顫圓角 `border-radius:255px 12px 225px 12px/12px 225px 12px 255px`、serif 700 加寬字距；hover 反白（墨底絹字）。硃砂版只給關鍵動作。
- **卡片**：1–2px 墨線框＋`rgba(236,232,222,.35)` 微亮絹底，不用陰影、不用圓角。
- **表格**：表頭 2px 墨底線、行 1px 淡墨線；數字欄一律 mono。
- **表單**：無框輸入、2px 墨底線、focus 轉硃砂；選項用「筆框 chips」（checkbox 隱藏，`:has(:checked)` 反白）。錯誤訊息硃砂粗體、口語。
- **印記（seal）**：44px 硃砂方、白字直排二字、rotate(-2~-3deg)，用於回執與完漕單。
- **footer**：玄底、絹字、4 連結＋地址；一行 12px 虛構聲明。

## 動效規則

- **鼓振墨暈（signature）**：擊鼓瞬間自鼓心擴散的墨暈環（半徑 +34px、opacity .55→0、0.42s linear），同時鼓手手臂落下；全站唯一的「爆發」動效，只綁在鼓上。
- 槳架水珠：opacity 0→.85→0、translateY 14px、2.6s infinite。
- hover 位移 ≤3px、transition 0.15s；無視差、無滾動驅動。
- `prefers-reduced-motion`：動畫迴圈整個不啟動（改逐步推進或代打），水珠定格半透明，transition 全關。

## 插畫與圖像風格（墨拍運筆引擎）

一切圖像由 `strokeSVG(pts, color, fb, seed)` 產出：`pts=[{x,y,w}]` 沿路徑的寬度剖面 → 兩側法線偏移成筆帶多邊形；`fb`（0–1）飛白強度 → 以底色細縫 polyline（dasharray 隨機、沿筆向偏移）模擬筆芯分絲。**規則：筆寬與飛白必須編碼資料**（同步度、力度、氣力），純裝飾的筆不畫。人物側影＝肩弧一筆＋頭一點＋槳一線，由姓名 FNV-1a→mulberry32 決定，同名恆同影。曲線圖也用筆畫語言（粗筆身＋淡墨重影），不用等寬線。

## Logo 與 Favicon

Logo：一筆船身（帶飛白縫的墨帶）＋龍頭一鉤＋硃砂鼓圓＋硃砂眼點，配 serif 900 站名與 mono 落款。Favicon：硃砂圓角方＋絹白鼓面＋墨鼓心（inline SVG data URI）。

## Do & Don't

**Do**：筆寬承載資料；硃砂守職務；mono 讀值；不對稱分欄；台味口語文案（具體人名、價錢、班表）。
**Don't**：紫藍漸層、置中大標＋三卡模板、emoji icon、圓角陰影卡、跑馬燈、EST. 徽章、第二彩色、等寬描邊當插圖（畫成 thin-lineart 即退化）、Lorem ipsum。

## 頁面骨架範例

```html
<body>
  <nav class="rail">…槳架：豎桿＋葉形 path，現用頁填實傾斜…</nav>
  <main><!-- margin-left:96px; max-width:1140px -->
    <header class="mast"><span class="h1">站名</span><span class="tag">MONO TAG</span></header>
    <section class="opening"><p class="lede">開場即工作物件，無大標 hero。</p>
      <div class="deck"><canvas></canvas><aside class="sidegauge">讀值</aside></div>
    </section>
    <section class="sec"><h2>節名 <span class="en">EN</span></h2>…</section>
  </main>
  <footer class="ft">玄底、連結、地址、虛構聲明</footer>
</body>
```
