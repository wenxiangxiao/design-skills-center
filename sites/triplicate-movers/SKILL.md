---
name: bureaucratic-form
description: A deadpan bureaucratic-form aesthetic — triplicate carbon copies, guilloché security print, official masthead, kraft-and-carbon mono-ink palette — for services whose value is transparent, itemised paperwork.
---

# 官僚表單美學 Bureaucratic Form

## 設計哲學

把「公文／三聯式單據」的視覺語言，正經八百地拿來做品牌網站。它的魅力來自反差：一本正經的機關腔、防偽底紋、登記字號、橡皮圖章，用在一個親切的在地服務上，就有一種台味的冷面幽默。這種風格特別適合「賣的就是透明」的行業——搬家、報稅、代辦、公證、當鋪、二手估價——因為表單本身就是它的產品。

核心原則：**單據即版面**（用聯、欄、格線組織資訊，而非卡片）、**單色墨階＋唯一機關紅**、**等寬字承載數據**、**一切可信到像真的公文**（字號、統編、守則、蓋章）。避免任何柔和圓角、漸層、企業微笑感。

## 色彩系統（mono-ink）

| 色 | Hex | 用途 | 比例 |
|----|-----|------|------|
| 牛皮 kraft | `#E7DCC4` | 頁面背景 | 40% |
| 公文紙 paper | `#F3ECDA` | 表單／區塊底 | 26% |
| 碳墨 ink | `#1E2A38` | 主文字、粗框、標題 | 18% |
| 複寫藍 blue | `#3A5A86` | 第二／三聯謄寫、連結、數據強調 | 9% |
| 中墨 ink2 | `#46586B` | 次要文字、防偽線 | 5% |
| 核准紅 red | `#B32B22` | **唯一警示色**：圓印、必填星號、章 | 2% |

單一藍黑墨階＋一枚紅，是本風格的鐵律。**禁止**多彩、紫藍漸層、米白純紙感當唯一底。

## 字體系統

- 機關標題／刊頭：`Noto Serif TC` 900，字距 `.06em`，端正如公文抬頭。
- 數據／欄位值／單號／防偽帶：`Noto Sans Mono` 400/600——所有數字、地址、編號一律等寬。
- 欄位標籤／內文：`Noto Sans TC` 400/500。
- scale：刊頭 clamp(26,5vw,44) / 區塊標題 20–22 / 內文 14–15 / 註記與 mono 11–13。

## 版面與網格

- 最大寬 1080px。核心是「**表格 grid**」而非留白：`border:2px solid ink` 的框，內部用 `1px solid rule` 分格。
- **masthead 刊頭**：頂列登記字號（mono 11px，兩端對齊）→ guilloché 防偽帶 → logo＋大標＋聯絡三欄 → 等分 tab 刊頭導覽（上下 1px 墨線）。
- **一式三聯版面**：主表單 `1.4fr`（第一聯，可填）＋副本欄 `1fr`（第二／三聯，唯讀複寫），中線 2px 墨框分隔；窄螢幕上下堆疊。
- 密度偏高：欄位緊湊、行高 1.7、表格為主要資訊載體。

## 元件配方

- **導覽 mh-nav**：`display:flex` 等分，每格 `border-right:1px rule`，`hover`/`aria-current` 整格反白（墨底紙字）。
- **輸入框**：`border:1px solid ink`、**直角無圓角**、白底、mono 字；`focus` 用 `outline:2px blue`；錯誤 `outline:2px red` 並顯示 `.errmsg`（mono 紅）。
- **chip 選鈕**：1px 墨框方塊，選中反白（墨底紙字）。
- **步驟列 steps**：等分格，當前格反白、已完成格轉藍並加勾記（純 CSS 邊框繪製）。
- **收費表 table.rate**：`border-collapse`，表頭 mono 小字＋牛皮底；金額欄 `text-align:right` mono。
- **機關圓印**：雙同心圓紅框＋襯線紅字（「誠信報價」「核准」），`rotate(-12deg)` 微歪像真的蓋歪。
- **guilloché 防偽帶**：JS 疊 5 條相位／振幅錯移的正弦 `path`（`Math.sin(x/34+ph)+Math.sin(x/11-ph)*.35`），細線低透明度，程序生成。

## 動效規則（signature）

- **三聯複寫**（主簽名）：第一聯任何 `input` 事件即時把值寫進第二、三聯；值以 `.v`（opacity 0）→ `.v.ink`（opacity .9 + 輕微 text-shadow 模擬複寫滲透）`transition:opacity .5s`；第三聯再更淡（.72），做出一式三聯遞減的複寫感。
- **核准章**：核算完成後圓形紅章 `transform:rotate(-14deg) scale(0)→scale(1)`，`cubic-bezier(.2,1.4,.4,1)` 帶回彈「咚」一下蓋上。
- 明確**避開**：stroke-dashoffset 描繪、數字 count-up、硬陰影按壓位移（這些已在館內過載）。報價金額直接呈現，不做逐位跳動。
- 全站 `@media(prefers-reduced-motion:reduce)` 關閉 transition，章直接定格。

## 插畫與圖像風格

`pattern-motif`：核心是 guilloché 安全印刷紋（防偽帶／證件底紋思路）；輔以紅色機關圓印、三聯堆疊單據、極簡幾何頭像（牛皮方底＋墨色剪影）、雙北服務範圍示意圖（同心虛線圈＋紅圖釘）。全部原創 inline SVG，零外部點陣圖，外部資源僅 Google Fonts。不使用細線幾何線描。

## Logo 與 Favicon

- Logo：三張前後錯位堆疊的單據（前白後藍，模擬正本＋兩聯副本）＋歪一點的紅色「核准」圓印＋襯線「三聯式搬家」＋mono 英文。
- Favicon：inline SVG data URI，牛皮底＋單據＋紅印圈。

## Do & Don't

**Do**：用聯／欄／格線組織資訊、等寬字放數據、可信的登記字號與守則、單色墨階＋一枚紅、正經的公文腔配一點自嘲。
**Don't**：柔和圓角卡片、漸層（尤其紫藍）、emoji 當 icon、置中大標＋兩鈕＋三卡、Lorem／AI 腔、多彩點綴、把數字計數或描邊當主打動效。

## 頁面骨架範例

```html
<header class="masthead">
  <div class="mh-top"><span>登記字號…</span><span>本估價單一式三聯…</span></div>
  <svg class="guilloche" id="gtop" viewBox="0 0 1080 20" preserveAspectRatio="none"></svg>
  <div class="mh-main"><svg><!--logo--></svg><h1 class="title">三聯式搬家<small>TRIPLICATE…</small></h1></div>
  <nav class="mh-nav"><a aria-current="page">線上估價單</a><a>服務與收費</a><a>公司資訊</a></nav>
</header>

<div class="formgrid">
  <form class="pri"><!-- 第一聯：steps + panes + validation --></form>
  <div class="copies"><!-- 第二／三聯：即時複寫 .v.ink --></div>
</div>
```

多步驟表單骨架：`steps`（4 格）＋ `.pane[data-pane]` 顯隱；每步 `validStep(s)` 驗證（必填、手機 `/^09\d{8}$/`、日期不得早於今日）；末步 `computeQuote()` 依 `BASE[屋型]＋才數×費率＋樓層加成＋假日15%＋長途費` 算總價與 ±8% 區間，生成 `TM-YYMMDD-NNN` 單號並蓋章。
